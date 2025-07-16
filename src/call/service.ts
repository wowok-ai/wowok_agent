import { TransactionBlock, IsValidArgType, TxbAddress, TagName,  PassportObject, Errors, ERROR, Permission, 
    PermissionIndex, PermissionIndexType,  BuyRequiredEnum, Customer_RequiredInfo, Service, 
    Service_Guard_Percent, Service_Sale, Treasury, OrderResult, DicountDispatch as WowokDiscountDispatch,
    ProgressObject, Arbitration, Service_Discount, PermissionObject, ParseType,
    IsValidAddress
} from 'wowok';
import { ObjectOrder, ObjectService, query_objects } from '../query/objects.js';
import { AccountOrMark_Address, CallBase, CallResult, GetAccountOrMark_Address, GetManyAccountOrMark_Address, 
    GetObjectExisted, GetObjectMain, GetObjectParam, Namedbject, ObjectParam, ObjectTypedMain, ObjectsOp,
    TypeNamedObjectWithPermission, PayParam } from "./base.js";
import { Account } from '../local/account.js';
import { LocalMark } from '../local/local.js';
import { crypto_string } from '../common.js';
import { query_received } from '../query/received.js';

export interface ServiceWithdraw extends PayParam {
    withdraw_guard: string;
}

export interface DicountDispatch {
    receiver: AccountOrMark_Address;
    discount: Service_Discount;
    count?: number;
}

export interface RefundWithGuard {
    order:string; 
    refund_guard:string;
}

export interface RefundWithArb {
    order:string;
    arb:string;
}

export type Service_Buy = {
    item: string; // 
    max_price: string | number | bigint; 
    count: string | number | bigint;
}

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallService_Data {
    object: ObjectTypedMain;
    order_new?: {buy_items:Service_Buy[], discount_object?:string|null, customer_info_required?: string, 
        namedNewOrder?: Namedbject, namedNewProgress?:Namedbject};
    order_receive?: {order:string}; 
    order_agent?: {order?:string; agents: AccountOrMark_Address[];};
    order_required_info?: {order:string; customer_info_required?:string};
    order_refund?: RefundWithGuard | RefundWithArb;
    order_withdrawl?: {order:string; data:ServiceWithdraw}; // guard address
    order_payer?: {order?:string; payer_new:AccountOrMark_Address; }; // transfer the order payer permission to someaddress

    description?: string;
    location?: string; // region, location or coordinates of the on-chain object, such as a physical address
    endpoint?: string | null;
    payee_treasury?:ObjectParam; 
    gen_discount?: DicountDispatch[];
    repository?: ObjectsOp;
    extern_withdraw_treasury?: ObjectsOp;
    machine?: string | null;
    arbitration?: ObjectsOp;
    customer_required_info?: {pubkey:string; required_info:(string | BuyRequiredEnum)[]} | null;
    sales?: {op:'add', sales:Service_Sale[]} | {op:'remove'; sales_name:string[]}
    withdraw_guard?: {op:'add' | 'set'; guards:Service_Guard_Percent[]} 
        | {op:'removeall'} | {op:'remove', guards:string[]};
    refund_guard?: {op:'add' | 'set'; guards:Service_Guard_Percent[]} 
        | {op:'removeall'} | {op:'remove', guards:string[]};
    bPublished?: boolean;
    buy_guard?: string | null;
    bPaused?: boolean;
    clone_new?: {token_type_new?:string; namedNew?: Namedbject};
}

export class CallService extends CallBase {
    data: CallService_Data;
    object_address: string | undefined = undefined;
    permission_address: string | undefined = undefined;
    type_parameter: string | undefined = undefined;

    constructor(data: CallService_Data) {
        super();
        this.data = data;
    }

    private checkPublished = (op: string)  => {
        if (!(this.content as ObjectService).bPublished) {
            ERROR(Errors.Fail, `Service object has not been published yet, so the operation (${op}) cannot proceed.`);
        }
    }

    private checkNotPublished = (op: string)  => {
        if ((this.content as ObjectService).bPublished) {
            ERROR(Errors.Fail, `Service object has been published and operation (${op}) cannot proceed. 
                If further modifications are needed, you can 'clone' a new Service and then proceed with the operation.`);
        }
    }

    private checkNotPaused = (op: string)  => {
        if ((this.content as ObjectService).bPaused) {
            ERROR(Errors.Fail, `Service object has been paused and operation (${op}) cannot proceed.`);
        }
    }

    protected async prepare(): Promise<void> {
        if (!this.object_address) {
            this.object_address = (await LocalMark.Instance().get_address(GetObjectExisted(this.data.object)));
        }

        if (this.object_address) {
            await this.update_content('Service', this.object_address); 
            if (!this.content) ERROR(Errors.InvalidParam, 'CallService_Data.data.object:' + this.object_address);
            
            this.permission_address = (this.content as ObjectService).permission;
            this.type_parameter = Service.parseObjectType((this.content as ObjectService).type_raw);
        } else {
            const n = GetObjectMain(this.data.object) as TypeNamedObjectWithPermission;
            if (!IsValidArgType(n?.type_parameter)) {
                ERROR(Errors.IsValidArgType, 'CallService_Data.data.object.type_parameter');
            }          
            this.permission_address = (await LocalMark.Instance().get_address(GetObjectExisted(n?.permission)));
            this.type_parameter = (n as any)?.type_parameter;
        } 
    }
    async call(account?:string) : Promise<CallResult>  {
        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = []; 

        await this.prepare();  
        if (this.permission_address) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.service)
            }
            if (this.data?.description != null && this.object_address) {
                perms.push(PermissionIndex.service_description)
            }
            if (this.data?.location != null) {
                perms.push(PermissionIndex.service_location)
            }

            if (this.data?.bPaused != null) {
                perms.push(PermissionIndex.service_pause)
            }
            if (this.data?.bPublished) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.service_publish)
            }
            if (this.data?.endpoint !== undefined) {
                perms.push(PermissionIndex.service_endpoint)
            }
            if (this.data?.repository != null) {
                perms.push(PermissionIndex.service_repository)
            }
            if (this.data?.clone_new != null) {
                perms.push(PermissionIndex.service_clone)
            }
            if (this.data?.gen_discount != null) {
                perms.push(PermissionIndex.service_discount_transfer)
            }
            if (this.data?.arbitration != null) {
                this.checkNotPublished('arbitration');
                perms.push(PermissionIndex.service_arbitration)
            }
            if (this.data?.buy_guard !== undefined) {
                perms.push(PermissionIndex.service_buyer_guard)
            }
            if (this.data?.extern_withdraw_treasury != null) {
                perms.push(PermissionIndex.service_treasury)
            }
            if (this.data?.machine !== undefined) {
                this.checkNotPublished('machine');
                perms.push(PermissionIndex.service_machine)
            }
            if (this.data?.payee_treasury != null && this.object_address) {
                perms.push(PermissionIndex.service_payee)
            }
            if (this.data?.withdraw_guard != null) {
                this.checkNotPublished('withdraw_guard');
                perms.push(PermissionIndex.service_withdraw_guards)
            }
            if (this.data?.refund_guard != null) {
                this.checkNotPublished('refund_guard');
                perms.push(PermissionIndex.service_refund_guards)
            }
            if (this.data?.customer_required_info !== undefined) {
                perms.push(PermissionIndex.service_customer_required)
            }
            if (this.data?.sales != null) {
                perms.push(PermissionIndex.service_sales)
            }
            if (this.data?.order_new != null) {
                this.checkPublished('order_new');
                this.checkNotPaused('order_new');

                if (this.object_address) {
                    if ((this.content as ObjectService)?.buy_guard) {
                        guards.push((this.content as ObjectService).buy_guard!)
                    }    
                }
            }
            if ((this.data?.order_refund as RefundWithGuard)?.refund_guard != null) {
                this.checkPublished('order_refund');
                const guard = await LocalMark.Instance().get_address((this.data?.order_refund as RefundWithGuard)?.refund_guard);
                if (guard) guards.push(guard);
            }

            if (this.data.order_withdrawl != null) { // permission(may be guard) + withdraw_guard
                this.checkPublished('order_withdrawl');
                perms.push(PermissionIndex.service_withdraw)

                if (this.data.order_withdrawl?.data?.withdraw_guard) {
                    const guard = await LocalMark.Instance().get_address(this.data.order_withdrawl?.data?.withdraw_guard);
                    if (guard) guards.push(guard);
                }
            }

            return await this.check_permission_and_call(this.permission_address, perms, guards, checkOwner, undefined, account)
        }
        return await this.exec(account);
    }

    private order_allowed() : boolean {
        if ((this.content as ObjectService)?.bPaused) {
            ERROR(Errors.InvalidParam, 'Service is paused');
            return false;
        }
        if (((this.content as ObjectService)?.bPublished !== true)) {
            ERROR(Errors.InvalidParam, 'Service is not published');
            return false;
        }
        return true
    }

    private order_progress = async (order?: string, order_new?:OrderResult) : Promise<ProgressObject> => {
        if (order) {
            const r = await query_objects({objects:[order]});
            if (r?.objects?.length !== 1 || r?.objects[0]?.type !== 'Order') {
                ERROR(Errors.InvalidParam, 'order_progress:' + order);
            }
            return (r.objects[0] as ObjectOrder).progress! as ProgressObject;
        } else if (order_new) {
            return order_new.progress as ProgressObject;
        } else {
            ERROR(Errors.InvalidParam, 'order_progress');
        }
    }

    protected async operate (txb:TransactionBlock, passport?:PassportObject, account?:string) {
        let obj : Service | undefined ; let perm: Permission | undefined;
        let permission : PermissionObject | undefined;
        let payee: Treasury | undefined;

        if (this.object_address) {
            obj = Service.From(txb, this.type_parameter!, this.permission_address!, this.object_address);
            permission = this.permission_address;
        } else {
            const n = GetObjectMain(this.data.object) as TypeNamedObjectWithPermission;
            permission = await LocalMark.Instance().get_address(GetObjectExisted(n?.permission));
            if (!permission) {
                perm = Permission.New(txb, GetObjectParam(n?.permission)?.description ?? '');
                permission =  perm.get_object();
            }
            const treasury_address = await LocalMark.Instance().get_address(GetObjectExisted(this.data.payee_treasury));
            if (!treasury_address) {
                payee = Treasury.New(txb, this.type_parameter!, permission,
                    GetObjectParam(this.data.payee_treasury)?.description ?? '', perm?undefined:passport);
            }
            const t = payee ? payee.get_object() : treasury_address;
            if (!t) {   
                ERROR(Errors.InvalidParam, 'CallService_Data.payee_treasury:' + (this.data.payee_treasury as any).address);
            }   
            obj = Service.New(txb, this.type_parameter!, permission, 
                this.data?.description??'', t, perm?undefined:passport);
        }

        if (!obj) ERROR(Errors.InvalidParam, 'CallService_Data.object:' + this.object_address);
        if (!permission) ERROR(Errors.InvalidParam, 'CallService_Data.permission:' + this.permission_address);

        const pst = perm?undefined:passport;
        var order_new : OrderResult | undefined;
        if (this.data?.order_new != null && this.order_allowed()) {
            let b = BigInt(0); let coin : any;
            this.data.order_new.buy_items.forEach(v => {
                b += BigInt(v.max_price) * BigInt(v.count)
            });
            coin = await Account.Instance().get_coin_object(txb, b, account, this.type_parameter);
            if (coin) {
                if (this.data.order_new.discount_object !== null) {
                    order_new = obj.order(this.data.order_new.buy_items, coin, 
                        null, 
                        (this?.content as ObjectService).machine!,
                        await this.info_crypto(this.data.order_new.customer_info_required), pst);        
                } else {
                    const addr = await LocalMark.Instance().get_address(this.data.order_new.discount_object);
                    if (!IsValidAddress(addr)) {
                        ERROR(Errors.InvalidParam, `CallService_Data.data.order_new.discount_object: ${this.data.order_new.discount_object}`);
                    }

                    order_new = obj.order(this.data.order_new.buy_items, coin, 
                        addr,
                        (this?.content as ObjectService).machine!,
                        await this.info_crypto(this.data.order_new.customer_info_required), pst);                    
                }
            }                 
        }
        if (this.data?.order_receive != null) {
           const o = await LocalMark.Instance().get_address(this.data.order_receive.order);
            if (!o) ERROR(Errors.InvalidParam, `CallService_Data.data.order_receive.order:${this.data.order_receive.order}`);
            const r = await query_received({object:o});
            if (!r) {
                ERROR(Errors.InvalidParam, 'CallService_Data.data.order_receive.received_objects');
            }

            r.received.forEach(v => {
                Service.OrderReceive(txb, this.type_parameter!, o, v.payment, v.id, ParseType(v.type).coin);
            })
        }

        if (this.data?.order_agent != null) {
            const o = this.data.order_agent.order ? await LocalMark.Instance().get_address(this.data.order_agent.order) : order_new?.order;
            if (!o) ERROR(Errors.InvalidParam, `CallService_Data.data.order_agent.order:${this.data.order_agent.order}`);
            
            const p = await this.order_progress(this.data.order_agent.order, order_new);
            const agents = await GetManyAccountOrMark_Address(this.data.order_agent.agents);
            obj?.set_order_agent(o, agents.filter((v):v is string =>v!==undefined), p);
        }
        if (this.data?.order_required_info?.customer_info_required) {
            const o = await LocalMark.Instance().get_address(this.data.order_required_info.order);
            if (!o) ERROR(Errors.InvalidParam, `CallService_Data.data.order_required_info.order:${this.data.order_required_info.order}`);
            const crypto =  await this.info_crypto(this.object_address, this.data.order_required_info.customer_info_required);
            if (crypto) {
                obj?.update_order_required_info(o, crypto);
            }
        }
        if (this.data?.order_refund != null) {
            const o = await LocalMark.Instance().get_address(this.data.order_refund.order);
            if (!o) ERROR(Errors.InvalidParam, `CallService_Data.data.order_agent.order:${this.data.order_refund.order}`);

            if ((this.data?.order_refund as any)?.arb) {
                const r = await query_objects({objects:[(this.data?.order_refund as any)?.arb]});
                if (r?.objects?.length!== 1 || r?.objects[0]?.type!== 'Arb') {
                    ERROR(Errors.InvalidParam, 'order_refund.arb:' + (this.data?.order_refund as any)?.arb);
                }
                obj?.refund_withArb(o!, r?.objects[0].object, Arbitration.parseArbObjectType(r.objects[0].type_raw)!);
            } else {
                const guard = await LocalMark.Instance().get_address((this.data?.order_refund as RefundWithGuard)?.refund_guard);
                if (guard) obj?.refund(o!, guard, pst)
            }
        }
        if (this.data?.order_withdrawl != null && pst) { //@ need withdrawal pst
            const n = this.data?.order_withdrawl;
            const o = await LocalMark.Instance().get_address(n.order);
            if (!o) ERROR(Errors.InvalidParam, `CallService_Data.data.order_agent.order:${this.data.order_withdrawl.order}`);

            const [for_guard, for_object, withdrawGuard] = await LocalMark.Instance().get_many_address(
                [n.data.for_guard, n.data.for_object, n.data.withdraw_guard]);
            if (!withdrawGuard) ERROR(Errors.InvalidParam, `CallService_Data.data.order_withdrawl.data.withdraw_guard:${this.data.order_withdrawl.data.withdraw_guard}`);
            
            obj?.withdraw(o!, {withdraw_guard:withdrawGuard, treasury:(this.content as ObjectService).payee_treasury!,
                index: n.data.index, for_guard:for_guard, for_object:for_object, remark:n.data.remark}, pst);
        }

        if (this.data?.order_payer != null) {
            const o = this.data.order_payer.order ? await LocalMark.Instance().get_address(this.data.order_payer.order) : order_new?.order;
            if (!o) ERROR(Errors.InvalidParam, `CallService_Data.data.order_agent.order:${this.data.order_payer.order}`);
            
            const p = await this.order_progress(this.data.order_payer.order, order_new);
            const payer = await GetAccountOrMark_Address(this.data.order_payer.payer_new);
            if (payer)  obj?.change_order_payer(o, payer, p)
        }

        if (order_new && this?.data?.order_new) {
            const buy = obj.order_launch(order_new);
            await this.new_with_mark('Order', txb, buy.order, (this.data?.order_new as any)?.namedNewOrder, account, [TagName.Launch, TagName.Order]); 
            if (buy?.progress) { 
                await this.new_with_mark('Progress', txb, buy.progress, (this.data?.order_new as any)?.namedNewProgress, account, [TagName.Launch, 'progress']);                  
            }
        }

        if (this.data?.description != null && this.object_address) {
            obj?.set_description(this.data.description, pst);
        }
        if (this.data?.location != null) {
            obj?.set_location(this.data.location, pst);
        }
        if (this.data?.endpoint !== undefined) {
            obj?.set_endpoint(this.data.endpoint, pst)
        }
        if (this.data?.payee_treasury != null && this.object_address) {
            const treasury_address = await LocalMark.Instance().get_address(GetObjectExisted(this.data.payee_treasury));
            if (!treasury_address) {
                payee = Treasury.New(txb, this.type_parameter!, permission, 
                    GetObjectParam(this.data.payee_treasury)?.description ?? '', permission?undefined:passport);
            }
            const t = payee ? payee.get_object() : treasury_address;
            if (!t) {   
                ERROR(Errors.InvalidParam, 'CallService_Data.payee_treasury:' + (this.data.payee_treasury as any).address);
            }   
            obj?.set_payee(t, pst);
        }
        if (this.data?.gen_discount != null) {
            const add: WowokDiscountDispatch[] = [];
            for (let i = 0; i < this.data.gen_discount.length; ++ i) {
                let  v = this.data.gen_discount[i];
                const addr = await GetAccountOrMark_Address(v.receiver);
                if (addr) {
                    add.push({receiver:addr, count:v.count ?? 1, discount:v.discount})
                }
            }
            obj?.discount_transfer(add, pst)
        }
        if (this.data?.repository != null) {
            switch (this.data.repository.op) {
                case 'add':
                case 'set':
                    if (this.data.repository.op === 'set') obj?.remove_repository([], true, pst);
                    for (let i = 0; i < this.data.repository.objects.length; ++ i) {
                        let  v = this.data.repository.objects[i];
                        const addr = await LocalMark.Instance().get_address(v);
                        if (addr) {
                            obj?.add_repository(addr, pst)
                        }
                    }
                    break;
                case 'remove':
                    obj?.remove_repository(await LocalMark.Instance().get_many_address2(this.data.repository.objects), false, pst)
                    break;
                case 'removeall':
                    obj?.remove_repository([], true, pst)
                    break;
            }
        }
        if (this.data?.extern_withdraw_treasury != null) {
            switch(this.data.extern_withdraw_treasury.op) {
                case 'add':
                case 'set':
                    if (this.data.extern_withdraw_treasury.op === 'set') obj?.remove_treasury([], true, pst);
                    const r = await query_objects({objects:this.data.extern_withdraw_treasury.objects, no_cache:true});
                    r.objects?.forEach(v => {
                        if (v.type ==='Treasury') {
                            obj?.add_treasury(v.object, Treasury.parseObjectType(v.type_raw), pst)
                        }
                    });
                    break;
                case 'remove':
                    obj?.remove_treasury(await LocalMark.Instance().get_many_address2(this.data.extern_withdraw_treasury.objects), false, pst)
                    break;
                case 'removeall':
                    obj?.remove_treasury([], false, pst)
                    break;
            }
        }
        if (this.data?.machine !== undefined) {
            if (!this.data.machine) {
                obj?.set_machine(undefined, pst);
            } else {
                const machine = await LocalMark.Instance().get_address(this.data.machine);
                if (!IsValidAddress(machine)) {
                    ERROR(Errors.IsValidAddress, `CallService_Data.data.machine: ${this.data.machine} `);
                }
                obj?.set_machine(machine, pst)
            }
        }
        if (this.data?.arbitration != null) {
            switch(this.data.arbitration.op) {
                case 'add':
                case 'set':
                    if (this.data.arbitration.op === 'set') obj?.remove_arbitration([], true, pst);
                    const r = await query_objects({objects:this.data.arbitration.objects, no_cache:true});
                    r.objects?.forEach(v => {
                        if (v.type ==='Arbitration') {
                            obj?.add_arbitration(v.object, Arbitration.parseObjectType(v.type_raw), pst)
                        }
                    });
                    break;
                case 'remove':
                    obj?.remove_arbitration(await LocalMark.Instance().get_many_address2(this.data.arbitration.objects), false, pst)
                    break;
                case 'removeall':
                    obj?.remove_arbitration([], false, pst)
                    break;
            }
        }
        if (this.data?.customer_required_info !== undefined) {
            if (this.data.customer_required_info === null) {
                obj?.remove_customer_required(pst);
            } else {
                if (this.data.customer_required_info.required_info.length > 0 && this.data.customer_required_info.pubkey) {
                    obj?.set_customer_required(this.data.customer_required_info.pubkey, this.data.customer_required_info.required_info, pst);
                } else if (this.data.customer_required_info.pubkey) {
                    obj?.change_required_pubkey(this.data.customer_required_info.pubkey, pst);
                }                
            }
        }
        if (this.data?.sales != null) {
            switch(this.data.sales.op) {
                case 'add':
                    obj?.add_sales(this.data.sales.sales, false, pst)
                    break;
                case 'remove':
                    obj?.remove_sales(this.data.sales.sales_name, pst)
                    break;
            }
        }
        if (this.data?.withdraw_guard != null) {
            switch(this.data.withdraw_guard.op) {
                case 'add':
                case 'set':
                    if (this.data.withdraw_guard.op === 'set')  obj?.remove_withdraw_guards([], true, pst);

                    const add = []
                    for (let i = 0; i < this.data.withdraw_guard.guards.length; ++ i) {
                        let  v = this.data.withdraw_guard.guards[i];
                        const addr = typeof(v.guard) === 'string' ? await LocalMark.Instance().get_address(v.guard as string) : v.guard;
                        if (addr) {
                            v.guard = addr;
                            add.push(v)
                        }
                    }
                    obj?.add_withdraw_guards(add, pst)
                    break;
                case 'remove':
                    obj?.remove_withdraw_guards(await LocalMark.Instance().get_many_address2(this.data.withdraw_guard.guards), false, pst)
                    break;
                case 'removeall':
                    obj?.remove_withdraw_guards([], true, pst)
                    break;
            }
        }
        if (this.data?.refund_guard != null) {
            switch(this.data.refund_guard.op) {
                case 'add':
                case 'set':
                    if (this.data.refund_guard.op ===  'set') obj?.remove_refund_guards([], true, pst);
                    const add = []
                    for (let i = 0; i < this.data.refund_guard.guards.length; ++ i) {
                        let  v = this.data.refund_guard.guards[i];
                        const addr = typeof(v.guard) === 'string' ? await LocalMark.Instance().get_address(v.guard as string) : v.guard;
                        if (addr) {
                            v.guard = addr;
                            add.push(v)
                        }
                    }
                    obj?.add_refund_guards(add, pst)
                    break;
                
                case 'remove':
                    obj?.remove_refund_guards(await LocalMark.Instance().get_many_address2(this.data.refund_guard.guards), false, pst)
                    break;
                case 'removeall':
                    obj?.remove_refund_guards([], true, pst)
                    break;
            }
        }
        if (this.data?.bPublished) {
            obj?.publish(pst)
        }

        if (this.data?.buy_guard !== undefined) {
            if (!this.data.buy_guard) {
                obj?.set_buy_guard(undefined, pst);
            } else {
                const guard = await LocalMark.Instance().get_address(this.data.buy_guard);
                if (!IsValidAddress(guard)) {
                    ERROR(Errors.IsValidGuardIdentifier, `CallService_Data.data.buy_guard: ${this.data.buy_guard} `);
                }
                obj?.set_buy_guard(this.data.buy_guard, pst)
            }
        }
        if (this.data?.bPaused != null) {
            obj?.pause(this.data.bPaused, pst)
        }
        if (this.data?.clone_new != null) {
            await this.new_with_mark('Service', txb, obj.clone(this.data.clone_new?.token_type_new, true, pst) as TxbAddress, (this.data?.clone_new as any)?.namedNew, account);
        }
        if (payee) {
            await this.new_with_mark('Treasury', txb, payee.launch(), GetObjectParam(this.data?.payee_treasury), account);
        }
        if (perm) {
            const n = GetObjectMain(this.data.object) as TypeNamedObjectWithPermission;
            await this.new_with_mark('Permission', txb, perm.launch(), GetObjectParam(n?.permission), account);
        }
        if (!this.object_address) {
            await this.new_with_mark('Service', txb, obj.launch(), GetObjectMain(this.data?.object), account);
        } 
    }

    private info_crypto = async (object?:string, info?: string) : Promise<Customer_RequiredInfo | undefined>=> {
        if (!this.content && info && object) {
            await this.update_content('Service', object);
        }
        const pubkey = (this.content as ObjectService).customer_required_info?.pubkey ?? '';
        var info_crypto: Customer_RequiredInfo | undefined ;
        if (pubkey && info) {
            info_crypto = {
                customer_pubkey: pubkey,
                customer_info_crypt: crypto_string(info, pubkey)
            }
        }
        return info_crypto
    }
}