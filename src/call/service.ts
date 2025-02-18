import { TransactionBlock, CallResponse} from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Permission, PermissionIndex,
    PermissionIndexType,  BuyRequiredEnum, Customer_RequiredInfo, DicountDispatch, Service, Service_Buy, 
    Service_Guard_Percent, Service_Sale, WithdrawPayee, Treasury, WitnessFill
} from 'wowok';
import { OBJECT_QUERY, ObjectService } from '../objects';
import { CallBase } from "./call";

export class CallService extends CallBase {
    type_parameter: string;
    permission_new?: string;
    bPaused?: boolean;
    bPublished?: boolean;
    description?: string;
    gen_discount?: DicountDispatch[];
    arbitration?: {op:'set' | 'add'; arbitrations:{address:string, token_type:string}[]} 
        | {op:'removeall'} | {op:'remove', addresses:string[]};
    buy_guard?: string;
    endpoint?: string;
    extern_withdraw_treasury?: {op:'set' | 'add'; treasuries:{address:string, token_type:string}[]} 
        | {op:'removeall'} | {op:'remove', addresses:string[]};
    machine?: string;
    payee_treasury?:string;
    clone_new?: {token_type_new?:string};
    repository?: {op:'set' | 'add' | 'remove' ; repositories:string[]} | {op:'removeall'};
    withdraw_guard?: {op:'add' | 'set'; guards:Service_Guard_Percent[]} 
        | {op:'removeall'} | {op:'remove', addresses:string[]};
    refund_guard?: {op:'add' | 'set'; guards:Service_Guard_Percent[]} 
        | {op:'removeall'} | {op:'remove', addresses:string[]};
    customer_required_info?: {pubkey:string; required_info:(string | BuyRequiredEnum)[]};
    sales?: {op:'add', sales:Service_Sale[]} | {op:'remove'; sales_name:string[]}
    order_new?: {buy_items:Service_Buy[], coin_object?:string, discount?:string, machine?:string, customer_info_crypto?: Customer_RequiredInfo, guard?:string | 'fetch'}
    order_required_info?: {order:string; info:Customer_RequiredInfo};
    order_refund?: {order:string; guard?:string;} | {order:string; arb:string; arb_token_type:string}; // guard address
    order_withdrawl?: {order:string; data:WithdrawPayee}; // guard address
    order_payer?: {order:string; payer_new: string}; // transfer the order payer permission to someaddress
    order_agent?: {order:string; agents: string[]; progress?:string};
    constructor(type_parameter:string, object: string | 'new' = 'new') { 
        super(object) 
        this.type_parameter = type_parameter;
    }
    async call(account?:string) : Promise<WitnessFill[] | CallResponse | undefined>   {
        if (!this.type_parameter) ERROR(Errors.InvalidParam, 'type_parameter');

        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = [];  var obj: ObjectService | undefined;

        if (this?.permission && IsValidAddress(this.permission)) {
            if (this?.object === 'new') {
                perms.push(PermissionIndex.service)
            }
            if (this?.permission_new !== undefined) {
                checkOwner = true;
            }
            if (this?.description !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.service_description)
            }
            if (this?.bPaused !== undefined) {
                perms.push(PermissionIndex.service_pause)
            }
            if (this?.bPublished) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.service_publish)
            }
            if (this?.endpoint !== undefined) {
                perms.push(PermissionIndex.service_endpoint)
            }
            if (this?.repository !== undefined) {
                perms.push(PermissionIndex.service_repository)
            }
            if (this?.clone_new !== undefined) {
                perms.push(PermissionIndex.service_clone)
            }
            if (this?.gen_discount !== undefined) {
                perms.push(PermissionIndex.service_discount_transfer)
            }
            if (this?.arbitration !== undefined) {
                perms.push(PermissionIndex.service_arbitration)
            }
            if (this?.buy_guard !== undefined) {
                perms.push(PermissionIndex.service_buyer_guard)
            }
            if (this?.endpoint !== undefined) {
                perms.push(PermissionIndex.service_endpoint)
            }
            if (this?.extern_withdraw_treasury !== undefined) {
                perms.push(PermissionIndex.service_treasury)
            }
            if (this?.machine !== undefined) {
                perms.push(PermissionIndex.service_machine)
            }
            if (this?.payee_treasury !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.service_payee)
            }
            if (this?.withdraw_guard !== undefined) {
                perms.push(PermissionIndex.service_withdraw_guards)
            }
            if (this?.refund_guard !== undefined) {
                perms.push(PermissionIndex.service_refund_guards)
            }
            if (this?.customer_required_info !== undefined) {
                perms.push(PermissionIndex.service_customer_required)
            }
            if (this?.sales !== undefined) {
                perms.push(PermissionIndex.service_sales)
            }
            if (this?.order_new?.guard !== undefined) {
                if (IsValidAddress(this.order_new.guard)) {
                    guards.push(this.order_new.guard)
                } else if (this?.object && IsValidAddress(this.object)) {
                    if (!obj) {
                        const r = await OBJECT_QUERY.objects({objects:[this.object], showContent:true});
                        if (r?.objects && r.objects[0].type === 'Service') {
                            obj = r.objects[0] as ObjectService;
                        }                        
                    }
                    if (obj?.buy_guard) {
                        guards.push(obj?.buy_guard)
                    }
                }
            }
            if (IsValidAddress((this?.order_refund as any)?.guard)) {
                guards.push((this?.order_refund as any)?.guard)
            }
            if (this.order_withdrawl !== undefined) { // permission(may be guard) + withdraw_guard
                perms.push(PermissionIndex.service_withdraw)
            }

            if (typeof(this?.order_withdrawl?.data?.withdraw_guard) === 'string' && IsValidAddress(this?.order_withdrawl?.data?.withdraw_guard)) {
                guards.push(this?.order_withdrawl?.data?.withdraw_guard)
            }

            return await this.check_permission_and_call(this.permission, perms, guards, checkOwner, undefined, account)
        }
        return this.exec(account);
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject) {
        let obj : Service | undefined ; let permission: any;  let payee: any;
        if (this.object === 'new' && this?.type_parameter) {
            if (!this?.permission || !IsValidAddress(this?.permission)) {
                permission = Permission.New(txb, '');
            }
            if (!this?.payee_treasury || !IsValidAddress(this?.payee_treasury)) {
                payee = Treasury.New(txb, this?.type_parameter, permission ?? this?.permission, '', permission?undefined:passport);
            }
            obj = Service.New(txb, this.type_parameter, permission??this?.permission, this?.description??'', payee??this?.payee_treasury, permission?undefined:passport)
        } else {
            if (IsValidAddress(this.object) && this.type_parameter && this.permission && IsValidAddress(this?.permission)) {
                obj = Service.From(txb, this.type_parameter, this.permission, this.object)
            }
        }

        if (obj) {
            if (this?.description !== undefined && this.object !== 'new') {
                obj?.set_description(this.description, passport);
            }
            if (this?.payee_treasury !== undefined && this.object !== 'new') {
                obj?.set_payee(this.payee_treasury, passport);
            }
            if (this?.endpoint !== undefined) {
                obj?.set_endpoint(this.endpoint, passport)
            }
            if (this?.buy_guard !== undefined) {
                obj?.set_buy_guard(this.buy_guard, passport)
            }
            if (this?.bPaused !== undefined) {
                obj?.pause(this.bPaused, passport)
            }
            if (this?.bPublished) {
                obj?.publish(passport)
            }
            if (this?.clone_new !== undefined) {
                obj?.clone(this.clone_new?.token_type_new, true, passport)
            }
            if (this?.machine !== undefined) {
                obj?.set_machine(this.machine, passport)
            }
            if (this?.repository !== undefined) {
                switch (this.repository.op) {
                    case 'add':
                        this.repository.repositories.forEach(v => obj?.add_repository(v, passport))
                        break;
                    case 'remove':
                        obj?.remove_repository(this.repository.repositories, false, passport)
                        break;
                    case 'set':
                        obj?.remove_repository([], true, passport)
                        this.repository.repositories.forEach(v => obj?.add_repository(v, passport))
                        break;
                    case 'removeall':
                        obj?.remove_repository([], true, passport)
                        break;
                }
            }
            if (this?.extern_withdraw_treasury !== undefined) {
                switch(this.extern_withdraw_treasury.op) {
                    case 'add':
                        this.extern_withdraw_treasury.treasuries.forEach(v=>obj?.add_treasury(v.token_type, v.address, passport))
                        break;
                    case 'set':
                        obj?.remove_treasury([], true, passport)
                        this.extern_withdraw_treasury.treasuries.forEach(v=>obj?.add_treasury(v.token_type, v.address, passport))
                        break;
                    case 'remove':
                        obj?.remove_treasury(this.extern_withdraw_treasury.addresses, false, passport)
                        break;
                    case 'removeall':
                        obj?.remove_treasury([], false, passport)
                        break;
                }
            }
            if (this?.arbitration !== undefined) {
                switch(this.arbitration.op) {
                    case 'add':
                        this.arbitration.arbitrations.forEach(v=>obj?.add_arbitration(v.address, v.token_type, passport))
                        break;
                    case 'set':
                        obj?.remove_arbitration([], true, passport)
                        this.arbitration.arbitrations.forEach(v=>obj?.add_arbitration(v.address, v.token_type, passport))
                        break;
                    case 'remove':
                        obj?.remove_arbitration(this.arbitration.addresses, false, passport)
                        break;
                    case 'removeall':
                        obj?.remove_arbitration([], false, passport)
                        break;
                }
            }
            if (this?.customer_required_info !== undefined) {
                if (this.customer_required_info.required_info && this.customer_required_info.pubkey) {
                    obj?.set_customer_required(this.customer_required_info.pubkey, this.customer_required_info.required_info, passport);
                } else if (this.customer_required_info.pubkey) {
                    obj?.change_required_pubkey(this.customer_required_info.pubkey, passport);
                }
            }
            if (this?.refund_guard !== undefined) {
                switch(this.refund_guard.op) {
                    case 'add':
                        obj?.add_refund_guards(this.refund_guard.guards, passport)
                        break;
                    case 'set':
                        obj?.remove_refund_guards([], true, passport)
                        obj?.add_refund_guards(this.refund_guard.guards, passport)
                        break;
                    case 'remove':
                        obj?.remove_refund_guards(this.refund_guard.addresses, false, passport)
                        break;
                    case 'removeall':
                        obj?.remove_refund_guards([], true, passport)
                        break;
                }
            }
            if (this?.gen_discount !== undefined) {
                obj?.discount_transfer(this.gen_discount, passport)
            }
            if (this?.withdraw_guard !== undefined) {
                switch(this.withdraw_guard.op) {
                    case 'add':
                        obj?.add_withdraw_guards(this.withdraw_guard.guards, passport)
                        break;
                    case 'set':
                        obj?.remove_withdraw_guards([], true, passport)
                        obj?.add_withdraw_guards(this.withdraw_guard.guards, passport)
                        break;
                    case 'remove':
                        obj?.remove_withdraw_guards(this.withdraw_guard.addresses, false, passport)
                        break;
                    case 'removeall':
                        obj?.remove_withdraw_guards([], true, passport)
                        break;
                }
            }

            if (this?.sales !== undefined) {
                switch(this.sales.op) {
                    case 'add':
                        obj?.add_sales(this.sales.sales, false, passport)
                        break;
                    case 'remove':
                        obj?.remove_sales(this.sales.sales_name, passport)
                        break;
                }
            }
            if (this?.order_new !== undefined) {
                let b = BigInt(0); let coin : any;
                this.order_new.buy_items.forEach(v => {
                    b += BigInt(v.max_price) * BigInt(v.count)
                })
                if (b > BigInt(0)) {
                    if (this?.type_parameter === '0x2::sui::SUI' || this?.type_parameter === '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI') {
                        coin = txb.splitCoins(txb.gas, [b])[0];
                    } else if (this?.order_new.coin_object) {
                        coin = txb.splitCoins(this.order_new.coin_object, [b])[0];
                    }                    
                }

                if (coin) {
                    //@ crypto tools support
                    obj?.buy(this.order_new.buy_items, coin, this.order_new.discount, this.order_new.machine, this.order_new.customer_info_crypto, passport)                    
                }
            }
            if (this?.order_payer !== undefined && obj) {
                obj?.change_order_payer(this?.order_payer.order, this.order_payer.payer_new)
            }
            if (this?.order_agent !== undefined) {
                obj?.set_order_agent(this.order_agent.order, this.order_agent.agents, this.order_agent.progress)
            }
            if (this?.order_required_info !== undefined) {
                obj?.update_order_required_info(this.order_required_info.order, this.order_required_info.info)
            }
            if (this?.order_refund !== undefined) {
                if ((this?.order_refund as any)?.arb && (this?.order_refund as any)?.arb_token_type) {
                    obj?.refund_withArb(this.order_refund.order, (this?.order_refund as any)?.arb, (this?.order_refund as any)?.arb_token_type)
                } else {
                    obj?.refund(this.order_refund.order, (this?.order_refund as any)?.guard, passport)
                }
            }
            if (this?.order_withdrawl !== undefined && passport) { //@ need withdrawal passport
                obj?.withdraw(this.order_withdrawl.order, this.order_withdrawl.data, passport)
            }
            if (this?.permission_new !== undefined) {
                obj?.change_permission(this.permission_new);
            }
            if (permission) {
                permission.launch();
            }
            if (payee) {
                payee.launch();
            }
            if (this.object === 'new') {
                obj?.launch();
            }
        }
    }
}