import { TransactionBlock, IsValidArgType, TxbAddress, TagName,  PassportObject, Errors, ERROR, Permission, 
    PermissionIndex, PermissionIndexType,  BuyRequiredEnum, Customer_RequiredInfo, Service, Service_Buy, 
    Service_Guard_Percent, Service_Sale, Treasury, OrderResult, DicountDispatch as WowokDiscountDispatch,
    ProgressObject, Arbitration, Service_Discount,
    ServiceObject, 
} from 'wowok';
import { ObjectOrder, ObjectService, query_objects } from '../query/objects.js';
import { AccountOrMark_Address, CallBase, CallResult, GetAccountOrMark_Address, GetManyAccountOrMark_Address, 
    GetObjectExisted, GetObjectMain, GetObjectParam, Namedbject, ObjectParam, ObjectTypedMain, 
    TypeNamedObjectWithPermission, WithdrawParam } from "./base.js";
import { Account } from '../local/account.js';
import { LocalMark } from '../local/local.js';
import { crypto_string } from '../common.js';
import { machine } from 'os';

export interface ServiceWithdraw extends WithdrawParam {
    withdraw_guard: string;
}

export interface DicountDispatch {
    receiver: AccountOrMark_Address;
    discount: Service_Discount;
    count?: number;
}

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallService_Data {
    object: ObjectTypedMain;
    order_new?: {buy_items:Service_Buy[], discount_object?:string, customer_info_required?: string, 
        namedNewOrder?: Namedbject, namedNewProgress?:Namedbject}
    order_agent?: {order?:string; agents: AccountOrMark_Address[];};
    order_required_info?: {order:string; customer_info_required?:string};
    order_refund?: {order:string; } | {order:string; arb:string;}; 
    order_withdrawl?: {order:string; data:ServiceWithdraw}; // guard address
    order_payer?: {order?:string; payer_new:AccountOrMark_Address; }; // transfer the order payer permission to someaddress

    description?: string;
    endpoint?: string;
    payee_treasury?:ObjectParam; 
    gen_discount?: DicountDispatch[];
    repository?: {op:'set' | 'add' | 'remove' ; repositories:string[]} | {op:'removeall'};
    extern_withdraw_treasury?: {op:'set' | 'add' | 'remove'; treasuries:string[]} | {op:'removeall'} ;
    machine?: string;
    arbitration?: {op:'set' | 'add' |  'remove'; arbitrations:string[]} | {op:'removeall'};
    customer_required_info?: {pubkey:string; required_info:(string | BuyRequiredEnum)[]};
    sales?: {op:'add', sales:Service_Sale[]} | {op:'remove'; sales_name:string[]}
    withdraw_guard?: {op:'add' | 'set'; guards:Service_Guard_Percent[]} 
        | {op:'removeall'} | {op:'remove', guards:string[]};
    refund_guard?: {op:'add' | 'set'; guards:Service_Guard_Percent[]} 
        | {op:'removeall'} | {op:'remove', guards:string[]};
    bPublished?: boolean;
    buy_guard?: string;
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
    async call(account?:string) : Promise<CallResult>  {
        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = []; 
        this.object_address = (await LocalMark.Instance().get_address(GetObjectExisted(this.data.object)));
        if (this.object_address) {
            await this.update_content('Service', this.object_address);
            if (!this.content) ERROR(Errors.InvalidParam, 'CallService_Data.data.object:' + this.object_address);
            this.permission_address = (this.content as ObjectService).permission;
            this.type_parameter = Service.parseObjectType(this.content.type_raw);
        } else {
            const n = GetObjectMain(this.data.object) as TypeNamedObjectWithPermission;
            if (!IsValidArgType(n?.type_parameter)) {
                ERROR(Errors.IsValidArgType, 'CallService_Data.data.object.type_parameter');
            }          
            this.permission_address = (await LocalMark.Instance().get_address(GetObjectExisted(n?.permission)));
            this.type_parameter = n.type_parameter;
        } 

        if (this.permission_address) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.service)
            }
            if (this.data?.description !== undefined && this.object_address) {
                perms.push(PermissionIndex.service_description)
            }
            if (this.data?.bPaused !== undefined) {
                perms.push(PermissionIndex.service_pause)
            }
            if (this.data?.bPublished) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.service_publish)
            }
            if (this.data?.endpoint !== undefined) {
                perms.push(PermissionIndex.service_endpoint)
            }
            if (this.data?.repository !== undefined) {
                perms.push(PermissionIndex.service_repository)
            }
            if (this.data?.clone_new !== undefined) {
                perms.push(PermissionIndex.service_clone)
            }
            if (this.data?.gen_discount !== undefined) {
                perms.push(PermissionIndex.service_discount_transfer)
            }
            if (this.data?.arbitration !== undefined) {
                perms.push(PermissionIndex.service_arbitration)
            }
            if (this.data?.buy_guard !== undefined) {
                perms.push(PermissionIndex.service_buyer_guard)
            }
            if (this.data?.endpoint !== undefined) {
                perms.push(PermissionIndex.service_endpoint)
            }
            if (this.data?.extern_withdraw_treasury !== undefined) {
                perms.push(PermissionIndex.service_treasury)
            }
            if (this.data?.machine !== undefined) {
                perms.push(PermissionIndex.service_machine)
            }
            if (this.data?.payee_treasury !== undefined && this.object_address) {
                perms.push(PermissionIndex.service_payee)
            }
            if (this.data?.withdraw_guard !== undefined) {
                perms.push(PermissionIndex.service_withdraw_guards)
            }
            if (this.data?.refund_guard !== undefined) {
                perms.push(PermissionIndex.service_refund_guards)
            }
            if (this.data?.customer_required_info !== undefined) {
                perms.push(PermissionIndex.service_customer_required)
            }
            if (this.data?.sales !== undefined) {
                perms.push(PermissionIndex.service_sales)
            }
            if (this.data?.order_new !== undefined) {
                if (this.object_address) {
                    if ((this.content as ObjectService)?.buy_guard) {
                        guards.push((this.content as ObjectService).buy_guard!)
                    }    
                }
            }
            if (this.data.order_refund !== undefined) {
                const guard = await LocalMark.Instance().get_address((this.data?.order_refund as any)?.guard);
                if (guard) guards.push(guard);
            }

            if (this.data.order_withdrawl !== undefined) { // permission(may be guard) + withdraw_guard
                perms.push(PermissionIndex.service_withdraw)
            }

            if (typeof(this.data?.order_withdrawl?.data?.withdraw_guard) === 'string') {
                const guard = await LocalMark.Instance().get_address(this.data?.order_withdrawl?.data?.withdraw_guard);
                if (guard) guards.push(guard);
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
        let obj : Service | undefined ; 
        let permission: any;  let payee: any;

        if (this.object_address) {
            obj = Service.From(txb, this.type_parameter!, this.permission_address!, this.object_address);
        } else {
            const n = GetObjectMain(this.data.object) as TypeNamedObjectWithPermission;
            if (!this.permission_address) {
                permission = Permission.New(txb, GetObjectParam(n?.permission)?.description ?? '');
            }
            const treasury_address = await LocalMark.Instance().get_address(GetObjectExisted(this.data.payee_treasury));
            if (!treasury_address) {
                payee = Treasury.New(txb, this.type_parameter!, permission ? permission.get_object() : this.permission_address, 
                    GetObjectParam(this.data.payee_treasury)?.description ?? '', permission?undefined:passport);
            }
            const t = payee ? payee.get_object() : treasury_address;
            if (!t) {   
                ERROR(Errors.InvalidParam, 'CallService_Data.payee_treasury:' + (this.data.payee_treasury as any).address);
            }   

            obj = Service.New(txb, this.type_parameter!, permission ? permission.get_object() : this.permission_address, 
                this.data?.description??'', t, permission?undefined:passport);
        }

        if (obj) {
            //const perm = permission ? permission.get_object() : permission_address;
            const pst = permission?undefined:passport;
            var order_new : OrderResult | undefined;
            if (this.data?.order_new !== undefined && this.order_allowed()) {
                let b = BigInt(0); let coin : any;
                this.data.order_new.buy_items.forEach(v => {
                    b += BigInt(v.max_price) * BigInt(v.count)
                });

                coin = await Account.Instance().get_coin_object(txb, b, account, this.type_parameter);
                if (coin) {
                    order_new = obj.order(this.data.order_new.buy_items, coin, 
                        await LocalMark.Instance().get_address(this.data.order_new.discount_object), 
                        (this?.content as ObjectService).machine!,
                        await this.info_crypto(this.data.order_new.customer_info_required), pst);
                }                 
            }
        
            if (this.data?.order_agent !== undefined) {
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
            if (this.data?.order_refund !== undefined) {
                const o = await LocalMark.Instance().get_address(this.data.order_refund.order);
                if (!o) ERROR(Errors.InvalidParam, `CallService_Data.data.order_agent.order:${this.data.order_refund.order}`);

                if ((this.data?.order_refund as any)?.arb) {
                    const r = await query_objects({objects:[(this.data?.order_refund as any)?.arb]});
                    if (r?.objects?.length!== 1 || r?.objects[0]?.type!== 'Arb') {
                        ERROR(Errors.InvalidParam, 'order_refund.arb:' + (this.data?.order_refund as any)?.arb);
                    }
                    obj?.refund_withArb(o!, r?.objects[0].object, Arbitration.parseArbObjectType(r.objects[0].type_raw)!);
                } else {
                    const guard = await LocalMark.Instance().get_address((this.data?.order_refund as any)?.guard);
                    if (guard) obj?.refund(o!, guard, pst)
                }
            }
            if (this.data?.order_withdrawl !== undefined && pst) { //@ need withdrawal pst
                const n = this.data?.order_withdrawl;
                const o = await LocalMark.Instance().get_address(n.order);
                if (!o) ERROR(Errors.InvalidParam, `CallService_Data.data.order_agent.order:${this.data.order_withdrawl.order}`);

                const [for_guard, for_object, withdrawGuard] = await LocalMark.Instance().get_many_address(
                    [n.data.for_guard, n.data.for_object, n.data.withdraw_guard]);
                if (!withdrawGuard) ERROR(Errors.InvalidParam, `CallService_Data.data.order_withdrawl.data.withdraw_guard:${this.data.order_withdrawl.data.withdraw_guard}`);
                
                obj?.withdraw(o!, {withdraw_guard:withdrawGuard, treasury:(this.content as ObjectService).payee_treasury!,
                    index: n.data.index, for_guard:for_guard, for_object:for_object, remark:n.data.remark}, pst);
            }

            if (this.data?.order_payer !== undefined) {
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

            if (this.data?.description !== undefined && this.object_address) {
                obj?.set_description(this.data.description, pst);
            }
            if (this.data?.endpoint !== undefined) {
                obj?.set_endpoint(this.data.endpoint, pst)
            }
            if (this.data?.payee_treasury !== undefined && this.object_address) {
                const treasury_address = await LocalMark.Instance().get_address(GetObjectExisted(this.data.payee_treasury));
                if (!treasury_address) {
                    payee = Treasury.New(txb, this.type_parameter!, permission ? permission.get_object() : this.permission_address, 
                        GetObjectParam(this.data.payee_treasury)?.description ?? '', permission?undefined:passport);
                }
                const t = payee ? payee.get_object() : treasury_address;
                if (!t) {   
                    ERROR(Errors.InvalidParam, 'CallService_Data.payee_treasury:' + (this.data.payee_treasury as any).address);
                }   
                obj?.set_payee(t, pst);
            }
            if (this.data?.gen_discount !== undefined) {
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
            if (this.data?.repository !== undefined) {
                switch (this.data.repository.op) {
                    case 'add':
                    case 'set':
                        if (this.data.repository.op === 'set') obj?.remove_repository([], true, pst);
                        for (let i = 0; i < this.data.repository.repositories.length; ++ i) {
                            let  v = this.data.repository.repositories[i];
                            const addr = await LocalMark.Instance().get_address(v);
                            if (addr) {
                                obj?.add_repository(addr, pst)
                            }
                        }
                        break;
                    case 'remove':
                        obj?.remove_repository(await LocalMark.Instance().get_many_address2(this.data.repository.repositories), false, pst)
                        break;
                    case 'removeall':
                        obj?.remove_repository([], true, pst)
                        break;
                }
            }
            if (this.data?.extern_withdraw_treasury !== undefined) {
                switch(this.data.extern_withdraw_treasury.op) {
                    case 'add':
                    case 'set':
                        if (this.data.extern_withdraw_treasury.op === 'set') obj?.remove_treasury([], true, pst);
                        const r = await query_objects({objects:this.data.extern_withdraw_treasury.treasuries, no_cache:true});
                        r.objects?.forEach(v => {
                            if (v.type ==='Treasury') {
                                obj?.add_treasury(v.object, Treasury.parseObjectType(v.type_raw), pst)
                            }
                        });
                        break;
                    case 'remove':
                        obj?.remove_treasury(await LocalMark.Instance().get_many_address2(this.data.extern_withdraw_treasury.treasuries), false, pst)
                        break;
                    case 'removeall':
                        obj?.remove_treasury([], false, pst)
                        break;
                }
            }
            if (this.data?.machine !== undefined) {
                const machine = await LocalMark.Instance().get_address(this.data.machine);
                obj?.set_machine(machine, pst)
            }
            if (this.data?.arbitration !== undefined) {
                switch(this.data.arbitration.op) {
                    case 'add':
                    case 'set':
                        if (this.data.arbitration.op === 'set') obj?.remove_arbitration([], true, pst);
                        const r = await query_objects({objects:this.data.arbitration.arbitrations, no_cache:true});
                        r.objects?.forEach(v => {
                            if (v.type ==='Arbitration') {
                                obj?.add_arbitration(v.object, Arbitration.parseObjectType(v.type_raw), pst)
                            }
                        });
                        break;
                    case 'remove':
                        obj?.remove_arbitration(await LocalMark.Instance().get_many_address2(this.data.arbitration.arbitrations), false, pst)
                        break;
                    case 'removeall':
                        obj?.remove_arbitration([], false, pst)
                        break;
                }
            }
            if (this.data?.customer_required_info !== undefined) {
                if (this.data.customer_required_info.required_info.length > 0 && this.data.customer_required_info.pubkey) {
                    obj?.set_customer_required(this.data.customer_required_info.pubkey, this.data.customer_required_info.required_info, pst);
                } else if (this.data.customer_required_info.pubkey) {
                    obj?.change_required_pubkey(this.data.customer_required_info.pubkey, pst);
                }
            }
            if (this.data?.sales !== undefined) {
                switch(this.data.sales.op) {
                    case 'add':
                        obj?.add_sales(this.data.sales.sales, false, pst)
                        break;
                    case 'remove':
                        obj?.remove_sales(this.data.sales.sales_name, pst)
                        break;
                }
            }
            if (this.data?.withdraw_guard !== undefined) {
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
            if (this.data?.refund_guard !== undefined) {
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
                obj?.set_buy_guard(this.data.buy_guard, pst)
            }
            if (this.data?.bPaused !== undefined) {
                obj?.pause(this.data.bPaused, pst)
            }
            if (this.data?.clone_new !== undefined) {
                await this.new_with_mark('Service', txb, obj.clone(this.data.clone_new?.token_type_new, true, pst) as TxbAddress, (this.data?.clone_new as any)?.namedNew, account);
            }
            if (payee) {
                await this.new_with_mark('Treasury', txb, payee.launch(), GetObjectParam(this.data?.payee_treasury), account);
            }
            if (permission) {
                const n = GetObjectMain(this.data.object) as TypeNamedObjectWithPermission;
                await this.new_with_mark('Permission', txb, permission.launch(), GetObjectParam(n?.permission), account);
            }
            if (!this.object_address) {
                await this.new_with_mark('Service', txb, obj.launch(), GetObjectMain(this.data?.object), account);
            } 
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