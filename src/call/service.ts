import { TransactionBlock, IsValidArgType, TxbAddress, TagName,  PassportObject, IsValidAddress, Errors, ERROR, Permission, 
    PermissionIndex, PermissionIndexType,  BuyRequiredEnum, Customer_RequiredInfo, DicountDispatch, Service, Service_Buy, 
    Service_Guard_Percent, Service_Sale, WithdrawPayee, Treasury, OrderResult, 
} from 'wowok';
import { query_objects, ObjectService } from '../query/objects.js';
import { CallBase, CallResult, Namedbject } from "./base.js";
import { Account } from '../local/account.js';

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallService_Data {
    type_parameter: string;
    object?: {address:string} | {namedNew?: Namedbject}; // undefined or {named_new...} for creating a new object
    permission?: {address:string} | {namedNew?: Namedbject, description?:string}; 
    description?: string;
    endpoint?: string;
    payee_treasury?:{address:string} | {namedNew?: Namedbject, description?:string}; 
    gen_discount?: DicountDispatch[];
    repository?: {op:'set' | 'add' | 'remove' ; repositories:string[]} | {op:'removeall'};
    extern_withdraw_treasury?: {op:'set' | 'add'; treasuries:{address:string, token_type:string}[]} 
        | {op:'removeall'} | {op:'remove', addresses:string[]};
    machine?: string;
    arbitration?: {op:'set' | 'add'; arbitrations:{address:string, token_type:string}[]} 
        | {op:'removeall'} | {op:'remove', addresses:string[]};
    customer_required_info?: {pubkey:string; required_info:(string | BuyRequiredEnum)[]};
    sales?: {op:'add', sales:Service_Sale[]} | {op:'remove'; sales_name:string[]}
    withdraw_guard?: {op:'add' | 'set'; guards:Service_Guard_Percent[]} 
        | {op:'removeall'} | {op:'remove', addresses:string[]};
    refund_guard?: {op:'add' | 'set'; guards:Service_Guard_Percent[]} 
        | {op:'removeall'} | {op:'remove', addresses:string[]};
    bPublished?: boolean;
    order_new?: {buy_items:Service_Buy[], discount?:string, machine?:string, customer_info_crypto?: Customer_RequiredInfo, guard?:string | 'fetch', 
        namedNewOrder?: Namedbject, namedNewProgress?:Namedbject}
    order_agent?: {order?:string; agents: string[]; progress?:string};
    order_required_info?: {order?:string; info?:Customer_RequiredInfo};
    order_refund?: {order?:string; guard?:string;} | {order?:string; arb:string; arb_token_type:string}; // guard address
    order_withdrawl?: {order?:string; data:WithdrawPayee}; // guard address
    order_payer?: {order?:string; payer_new:string; progress?:string}; // transfer the order payer permission to someaddress
    buy_guard?: string;
    bPaused?: boolean;
    clone_new?: {token_type_new?:string; namedNew?: Namedbject};
}

export class CallService extends CallBase {
    data: CallService_Data;
    constructor(data: CallService_Data) {
        super();
        this.data = data;
    }
    async call(account?:string) : Promise<CallResult>  {
        if (!this.data.type_parameter || !IsValidArgType(this.data.type_parameter)) {
            ERROR(Errors.IsValidArgType, 'service.type_parameter');
        }

        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = [];  var obj: ObjectService | undefined;
        const permission_address = (this.data?.permission as any)?.address;
        const object_address = (this.data?.object as any)?.address;
        const treasury_address = (this.data?.payee_treasury as any)?.address;

        if (permission_address && IsValidAddress(permission_address)) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.service)
            }
            if (this.data?.description !== undefined && object_address) {
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
            if (treasury_address !== undefined && object_address) {
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
            if (this.data?.order_new?.guard !== undefined) {
                if (IsValidAddress(this.data.order_new.guard)) {
                    guards.push(this.data.order_new.guard)
                } else {
                    if (!this.data.object) {
                        if (this.data?.buy_guard && IsValidAddress(this.data.buy_guard)) {
                            guards.push(this.data?.buy_guard)
                        }
                    } else {
                        if (!obj) {
                            const r = await query_objects({objects:[object_address], showContent:true});
                            if (r?.objects && r.objects[0].type === 'Service') {
                                obj = r.objects[0] as ObjectService;
                            }                        
                        }
                        if (obj?.buy_guard) {
                            guards.push(obj?.buy_guard)
                        }                        
                    }
                }
            }
            if (IsValidAddress((this.data?.order_refund as any)?.guard)) {
                guards.push((this.data?.order_refund as any)?.guard)
            }
            if (this.data.order_withdrawl !== undefined) { // permission(may be guard) + withdraw_guard
                perms.push(PermissionIndex.service_withdraw)
            }

            if (typeof(this.data?.order_withdrawl?.data?.withdraw_guard) === 'string' && IsValidAddress(this.data?.order_withdrawl?.data?.withdraw_guard)) {
                guards.push(this.data?.order_withdrawl?.data?.withdraw_guard)
            }

            return await this.check_permission_and_call(permission_address, perms, guards, checkOwner, undefined, account)
        }
        return await this.exec(account);
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject, account?:string) {
        let obj : Service | undefined ; let permission: any;  let payee: any;
        const permission_address = (this.data?.permission as any)?.address;
        const object_address = (this.data?.object as any)?.address;
        const treasury_address = (this.data?.payee_treasury as any)?.address;

        if (!object_address) {
            if (!permission_address || !IsValidAddress(permission_address)) {
                const d = (this.data?.permission as any)?.description ?? '';
                permission = Permission.New(txb, d);
            }
            if (!treasury_address || !IsValidAddress(treasury_address)) {
                const d = (this.data?.payee_treasury as any)?.description ?? '';
                payee = Treasury.New(txb, this.data?.type_parameter!, permission ?? permission_address, d, permission?undefined:passport);
            }
            obj = Service.New(txb, this.data.type_parameter!, permission?permission.get_object():permission_address, 
                this.data?.description??'', payee?payee.get_object():treasury_address, permission?undefined:passport)
        } else {
            if (IsValidAddress(object_address) && this.data.type_parameter && permission_address && IsValidAddress(permission_address)) {
                obj = Service.From(txb, this.data.type_parameter, permission_address, object_address)
            } else {
                ERROR(Errors.InvalidParam, 'object or permission address invalid.')
            }
        }

        if (obj) {
            //const perm = permission ? permission.get_object() : permission_address;
            const pst = permission?undefined:passport;

            if (this.data?.description !== undefined && object_address) {
                obj?.set_description(this.data.description, pst);
            }
            if (this.data?.endpoint !== undefined) {
                obj?.set_endpoint(this.data.endpoint, pst)
            }
            if (this.data?.payee_treasury !== undefined && object_address) {
                obj?.set_payee(treasury_address, pst);
            }
            if (this.data?.gen_discount !== undefined) {
                obj?.discount_transfer(this.data.gen_discount, pst)
            }
            if (this.data?.repository !== undefined) {
                switch (this.data.repository.op) {
                    case 'add':
                        this.data.repository.repositories.forEach(v => obj?.add_repository(v, pst))
                        break;
                    case 'remove':
                        obj?.remove_repository(this.data.repository.repositories, false, pst)
                        break;
                    case 'set':
                        obj?.remove_repository([], true, pst)
                        this.data.repository.repositories.forEach(v => obj?.add_repository(v, pst))
                        break;
                    case 'removeall':
                        obj?.remove_repository([], true, pst)
                        break;
                }
            }
            if (this.data?.extern_withdraw_treasury !== undefined) {
                switch(this.data.extern_withdraw_treasury.op) {
                    case 'add':
                        this.data.extern_withdraw_treasury.treasuries.forEach(v=>obj?.add_treasury(v.token_type, v.address, pst))
                        break;
                    case 'set':
                        obj?.remove_treasury([], true, pst)
                        this.data.extern_withdraw_treasury.treasuries.forEach(v=>obj?.add_treasury(v.token_type, v.address, pst))
                        break;
                    case 'remove':
                        obj?.remove_treasury(this.data.extern_withdraw_treasury.addresses, false, pst)
                        break;
                    case 'removeall':
                        obj?.remove_treasury([], false, pst)
                        break;
                }
            }
            if (this.data?.machine !== undefined) {
                obj?.set_machine(this.data.machine, pst)
            }
            if (this.data?.arbitration !== undefined) {
                switch(this.data.arbitration.op) {
                    case 'add':
                        this.data.arbitration.arbitrations.forEach(v=>obj?.add_arbitration(v.address, v.token_type, pst))
                        break;
                    case 'set':
                        obj?.remove_arbitration([], true, pst)
                        this.data.arbitration.arbitrations.forEach(v=>obj?.add_arbitration(v.address, v.token_type, pst))
                        break;
                    case 'remove':
                        obj?.remove_arbitration(this.data.arbitration.addresses, false, pst)
                        break;
                    case 'removeall':
                        obj?.remove_arbitration([], false, pst)
                        break;
                }
            }
            if (this.data?.customer_required_info !== undefined) {
                if (this.data.customer_required_info.required_info && this.data.customer_required_info.pubkey) {
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
                        obj?.add_withdraw_guards(this.data.withdraw_guard.guards, pst)
                        break;
                    case 'set':
                        obj?.remove_withdraw_guards([], true, pst)
                        obj?.add_withdraw_guards(this.data.withdraw_guard.guards, pst)
                        break;
                    case 'remove':
                        obj?.remove_withdraw_guards(this.data.withdraw_guard.addresses, false, pst)
                        break;
                    case 'removeall':
                        obj?.remove_withdraw_guards([], true, pst)
                        break;
                }
            }
            if (this.data?.refund_guard !== undefined) {
                switch(this.data.refund_guard.op) {
                    case 'add':
                        obj?.add_refund_guards(this.data.refund_guard.guards, pst)
                        break;
                    case 'set':
                        obj?.remove_refund_guards([], true, pst)
                        obj?.add_refund_guards(this.data.refund_guard.guards, pst)
                        break;
                    case 'remove':
                        obj?.remove_refund_guards(this.data.refund_guard.addresses, false, pst)
                        break;
                    case 'removeall':
                        obj?.remove_refund_guards([], true, pst)
                        break;
                }
            }
            if (this.data?.bPublished) {
                obj?.publish(pst)
            }
            var order_new : OrderResult | undefined;
            if (this.data?.order_new !== undefined) {
                let b = BigInt(0); let coin : any;
                this.data.order_new.buy_items.forEach(v => {
                    b += BigInt(v.max_price) * BigInt(v.count)
                })
                if (b > BigInt(0)) {
                    coin = await Account.Instance().get_coin_object(txb, b, account, this.data.type_parameter);
                    if (coin) {
                        //@ crypto tools support
                        order_new = obj.order(this.data.order_new.buy_items, coin, this.data.order_new.discount, this.data.order_new.machine,
                            this.data.order_new.customer_info_crypto, pst);
                    }                 
                }
            }
        
            if (this.data?.order_agent !== undefined) {
                const o = this.data.order_agent.order ?? order_new?.order;
                if (!o) ERROR(Errors.Fail, 'order invalid: order_agent');

                obj?.set_order_agent(o!, this.data.order_agent.agents, this.data.order_agent.progress)
            }
            if (this.data?.order_required_info !== undefined && this.data.order_required_info.info !== undefined) {
                const o = this.data.order_required_info.order ?? order_new?.order;
                if (!o) ERROR(Errors.Fail, 'order invalid: order_required_info');
                
                obj?.update_order_required_info(o!, this.data.order_required_info.info)
            }
            if (this.data?.order_refund !== undefined) {
                const o = this.data.order_refund.order ?? order_new?.order;
                if (!o) ERROR(Errors.Fail, 'order invalid: order_refund');

                if ((this.data?.order_refund as any)?.arb && (this.data?.order_refund as any)?.arb_token_type) {
                    obj?.refund_withArb(o!, (this.data?.order_refund as any)?.arb, (this.data?.order_refund as any)?.arb_token_type)
                } else {
                    obj?.refund(o!, (this.data?.order_refund as any)?.guard, pst)
                }
            }
            if (this.data?.order_withdrawl !== undefined && pst) { //@ need withdrawal pst
                const o = this.data.order_withdrawl.order ?? order_new?.order;
                if (!o) ERROR(Errors.Fail, 'order invalid: order_withdrawl');

                obj?.withdraw(o!, this.data.order_withdrawl.data, pst)
            }

            if (this.data?.order_payer !== undefined && obj) {
                const o = this.data.order_payer.order ?? order_new?.order;
                if (!o) ERROR(Errors.Fail, 'order invalid: order_payer');

                obj?.change_order_payer(o!, this.data.order_payer.payer_new, this.data.order_payer.progress)
            }

            if (order_new && this?.data?.order_new) {
                const buy = obj.order_launch(order_new);
                await this.new_with_mark('Order', txb, buy.order, (this.data?.order_new as any)?.namedNewOrder, account, [TagName.Launch, TagName.Order]); 
                if (buy?.progress) { 
                    await this.new_with_mark('Progress', txb, buy.progress, (this.data?.order_new as any)?.namedNewProgress, account, [TagName.Launch]);                  
                }
            }

            if (this.data?.buy_guard !== undefined) {
                obj?.set_buy_guard(this.data.buy_guard, pst)
            }
            if (this.data?.bPaused !== undefined) {
                obj?.pause(this.data.bPaused, pst)
            }
            if (this.data?.clone_new !== undefined && object_address) {
                await this.new_with_mark('Service', txb, obj.clone(this.data.clone_new?.token_type_new, true, pst) as TxbAddress, (this.data?.clone_new as any)?.namedNew, account);
            }
            if (payee) {
                await this.new_with_mark('Treasury', txb, payee.launch(), (this.data?.payee_treasury as any)?.namedNew, account);
            }
            if (permission) {
                await this.new_with_mark('Permission', txb, permission.launch(), (this.data?.permission as any)?.namedNew, account);
            }
            if (!object_address) {
                await this.new_with_mark('Service', txb, obj.launch(), (this.data?.object as any)?.namedNew, account);
            } 
        }
    }
}