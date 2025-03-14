import { IsValidArgType, TagName, IsValidAddress, Errors, ERROR, Permission, PermissionIndex, Service, Treasury, } from 'wowok';
import { query_objects } from '../objects';
import { CallBase } from "./base";
import { Account } from '../account';
export class CallService extends CallBase {
    data;
    constructor(data) {
        super();
        this.data = data;
    }
    async call(account) {
        if (!this.data.type_parameter || !IsValidArgType(this.data.type_parameter)) {
            ERROR(Errors.IsValidArgType, 'service.type_parameter');
        }
        var checkOwner = false;
        const guards = [];
        const perms = [];
        var obj;
        const permission_address = this.data?.permission?.address;
        const object_address = this.data?.object?.address;
        const treasury_address = this.data?.payee_treasury?.address;
        if (permission_address && IsValidAddress(permission_address)) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.service);
            }
            if (this.data?.description !== undefined && object_address) {
                perms.push(PermissionIndex.service_description);
            }
            if (this.data?.bPaused !== undefined) {
                perms.push(PermissionIndex.service_pause);
            }
            if (this.data?.bPublished) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.service_publish);
            }
            if (this.data?.endpoint !== undefined) {
                perms.push(PermissionIndex.service_endpoint);
            }
            if (this.data?.repository !== undefined) {
                perms.push(PermissionIndex.service_repository);
            }
            if (this.data?.clone_new !== undefined) {
                perms.push(PermissionIndex.service_clone);
            }
            if (this.data?.gen_discount !== undefined) {
                perms.push(PermissionIndex.service_discount_transfer);
            }
            if (this.data?.arbitration !== undefined) {
                perms.push(PermissionIndex.service_arbitration);
            }
            if (this.data?.buy_guard !== undefined) {
                perms.push(PermissionIndex.service_buyer_guard);
            }
            if (this.data?.endpoint !== undefined) {
                perms.push(PermissionIndex.service_endpoint);
            }
            if (this.data?.extern_withdraw_treasury !== undefined) {
                perms.push(PermissionIndex.service_treasury);
            }
            if (this.data?.machine !== undefined) {
                perms.push(PermissionIndex.service_machine);
            }
            if (treasury_address !== undefined && object_address) {
                perms.push(PermissionIndex.service_payee);
            }
            if (this.data?.withdraw_guard !== undefined) {
                perms.push(PermissionIndex.service_withdraw_guards);
            }
            if (this.data?.refund_guard !== undefined) {
                perms.push(PermissionIndex.service_refund_guards);
            }
            if (this.data?.customer_required_info !== undefined) {
                perms.push(PermissionIndex.service_customer_required);
            }
            if (this.data?.sales !== undefined) {
                perms.push(PermissionIndex.service_sales);
            }
            if (this.data?.order_new?.guard !== undefined) {
                if (IsValidAddress(this.data.order_new.guard)) {
                    guards.push(this.data.order_new.guard);
                }
                else {
                    if (!this.data.object) {
                        if (this.data?.buy_guard && IsValidAddress(this.data.buy_guard)) {
                            guards.push(this.data?.buy_guard);
                        }
                    }
                    else {
                        if (!obj) {
                            const r = await query_objects({ objects: [object_address], showContent: true });
                            if (r?.objects && r.objects[0].type === 'Service') {
                                obj = r.objects[0];
                            }
                        }
                        if (obj?.buy_guard) {
                            guards.push(obj?.buy_guard);
                        }
                    }
                }
            }
            if (IsValidAddress(this.data?.order_refund?.guard)) {
                guards.push(this.data?.order_refund?.guard);
            }
            if (this.data.order_withdrawl !== undefined) { // permission(may be guard) + withdraw_guard
                perms.push(PermissionIndex.service_withdraw);
            }
            if (typeof (this.data?.order_withdrawl?.data?.withdraw_guard) === 'string' && IsValidAddress(this.data?.order_withdrawl?.data?.withdraw_guard)) {
                guards.push(this.data?.order_withdrawl?.data?.withdraw_guard);
            }
            return await this.check_permission_and_call(permission_address, perms, guards, checkOwner, undefined, account);
        }
        return await this.exec(account);
    }
    async operate(txb, passport, account) {
        let obj;
        let permission;
        let payee;
        const permission_address = this.data?.permission?.address;
        const object_address = this.data?.object?.address;
        const treasury_address = this.data?.payee_treasury?.address;
        if (!object_address) {
            if (!permission_address || !IsValidAddress(permission_address)) {
                const d = this.data?.permission?.description ?? '';
                permission = Permission.New(txb, d);
            }
            if (!treasury_address || !IsValidAddress(treasury_address)) {
                const d = this.data?.payee_treasury?.description ?? '';
                payee = Treasury.New(txb, this.data?.type_parameter, permission ?? permission_address, d, permission ? undefined : passport);
            }
            obj = Service.New(txb, this.data.type_parameter, permission ? permission.get_object() : permission_address, this.data?.description ?? '', payee ? payee.get_object() : treasury_address, permission ? undefined : passport);
        }
        else {
            if (IsValidAddress(object_address) && this.data.type_parameter && permission_address && IsValidAddress(permission_address)) {
                obj = Service.From(txb, this.data.type_parameter, permission_address, object_address);
            }
            else {
                ERROR(Errors.InvalidParam, 'object or permission address invalid.');
            }
        }
        if (obj) {
            if (this.data?.description !== undefined && object_address) {
                obj?.set_description(this.data.description, passport);
            }
            if (this.data?.endpoint !== undefined) {
                obj?.set_endpoint(this.data.endpoint, passport);
            }
            if (this.data?.payee_treasury !== undefined && object_address) {
                obj?.set_payee(treasury_address, passport);
            }
            if (this.data?.gen_discount !== undefined) {
                obj?.discount_transfer(this.data.gen_discount, passport);
            }
            if (this.data?.repository !== undefined) {
                switch (this.data.repository.op) {
                    case 'add':
                        this.data.repository.repositories.forEach(v => obj?.add_repository(v, passport));
                        break;
                    case 'remove':
                        obj?.remove_repository(this.data.repository.repositories, false, passport);
                        break;
                    case 'set':
                        obj?.remove_repository([], true, passport);
                        this.data.repository.repositories.forEach(v => obj?.add_repository(v, passport));
                        break;
                    case 'removeall':
                        obj?.remove_repository([], true, passport);
                        break;
                }
            }
            if (this.data?.extern_withdraw_treasury !== undefined) {
                switch (this.data.extern_withdraw_treasury.op) {
                    case 'add':
                        this.data.extern_withdraw_treasury.treasuries.forEach(v => obj?.add_treasury(v.token_type, v.address, passport));
                        break;
                    case 'set':
                        obj?.remove_treasury([], true, passport);
                        this.data.extern_withdraw_treasury.treasuries.forEach(v => obj?.add_treasury(v.token_type, v.address, passport));
                        break;
                    case 'remove':
                        obj?.remove_treasury(this.data.extern_withdraw_treasury.addresses, false, passport);
                        break;
                    case 'removeall':
                        obj?.remove_treasury([], false, passport);
                        break;
                }
            }
            if (this.data?.machine !== undefined) {
                obj?.set_machine(this.data.machine, passport);
            }
            if (this.data?.arbitration !== undefined) {
                switch (this.data.arbitration.op) {
                    case 'add':
                        this.data.arbitration.arbitrations.forEach(v => obj?.add_arbitration(v.address, v.type_parameter, passport));
                        break;
                    case 'set':
                        obj?.remove_arbitration([], true, passport);
                        this.data.arbitration.arbitrations.forEach(v => obj?.add_arbitration(v.address, v.type_parameter, passport));
                        break;
                    case 'remove':
                        obj?.remove_arbitration(this.data.arbitration.addresses, false, passport);
                        break;
                    case 'removeall':
                        obj?.remove_arbitration([], false, passport);
                        break;
                }
            }
            if (this.data?.customer_required_info !== undefined) {
                if (this.data.customer_required_info.required_info && this.data.customer_required_info.pubkey) {
                    obj?.set_customer_required(this.data.customer_required_info.pubkey, this.data.customer_required_info.required_info, passport);
                }
                else if (this.data.customer_required_info.pubkey) {
                    obj?.change_required_pubkey(this.data.customer_required_info.pubkey, passport);
                }
            }
            if (this.data?.sales !== undefined) {
                switch (this.data.sales.op) {
                    case 'add':
                        obj?.add_sales(this.data.sales.sales, false, passport);
                        break;
                    case 'remove':
                        obj?.remove_sales(this.data.sales.sales_name, passport);
                        break;
                }
            }
            if (this.data?.withdraw_guard !== undefined) {
                switch (this.data.withdraw_guard.op) {
                    case 'add':
                        obj?.add_withdraw_guards(this.data.withdraw_guard.guards, passport);
                        break;
                    case 'set':
                        obj?.remove_withdraw_guards([], true, passport);
                        obj?.add_withdraw_guards(this.data.withdraw_guard.guards, passport);
                        break;
                    case 'remove':
                        obj?.remove_withdraw_guards(this.data.withdraw_guard.addresses, false, passport);
                        break;
                    case 'removeall':
                        obj?.remove_withdraw_guards([], true, passport);
                        break;
                }
            }
            if (this.data?.refund_guard !== undefined) {
                switch (this.data.refund_guard.op) {
                    case 'add':
                        obj?.add_refund_guards(this.data.refund_guard.guards, passport);
                        break;
                    case 'set':
                        obj?.remove_refund_guards([], true, passport);
                        obj?.add_refund_guards(this.data.refund_guard.guards, passport);
                        break;
                    case 'remove':
                        obj?.remove_refund_guards(this.data.refund_guard.addresses, false, passport);
                        break;
                    case 'removeall':
                        obj?.remove_refund_guards([], true, passport);
                        break;
                }
            }
            if (this.data?.bPublished) {
                obj?.publish(passport);
            }
            if (this.data?.order_new !== undefined) {
                let b = BigInt(0);
                let coin;
                this.data.order_new.buy_items.forEach(v => {
                    b += BigInt(v.max_price) * BigInt(v.count);
                });
                if (b > BigInt(0)) {
                    const coin = await Account.Instance().get_coin_object(txb, b, account, this.data.type_parameter);
                    if (coin) {
                        //@ crypto tools support
                        const addr = obj.buy(this.data.order_new.buy_items, coin, this.data.order_new.discount, this.data.order_new.machine, this.data.order_new.customer_info_crypto, passport);
                        await this.new_with_mark(txb, addr, this.data?.order_new?.namedNew, account, [TagName.Launch, TagName.Order]);
                    }
                }
            }
            if (this.data?.order_agent !== undefined) {
                obj?.set_order_agent(this.data.order_agent.order, this.data.order_agent.agents, this.data.order_agent.progress);
            }
            if (this.data?.order_required_info !== undefined) {
                obj?.update_order_required_info(this.data.order_required_info.order, this.data.order_required_info.info);
            }
            if (this.data?.order_refund !== undefined) {
                if (this.data?.order_refund?.arb && this.data?.order_refund?.arb_token_type) {
                    obj?.refund_withArb(this.data.order_refund.order, this.data?.order_refund?.arb, this.data?.order_refund?.arb_token_type);
                }
                else {
                    obj?.refund(this.data.order_refund.order, this.data?.order_refund?.guard, passport);
                }
            }
            if (this.data?.order_withdrawl !== undefined && passport) { //@ need withdrawal passport
                obj?.withdraw(this.data.order_withdrawl.order, this.data.order_withdrawl.data, passport);
            }
            if (this.data?.order_payer !== undefined && obj) {
                obj?.change_order_payer(this.data?.order_payer.order, this.data.order_payer.payer_new);
            }
            if (this.data?.buy_guard !== undefined) {
                obj?.set_buy_guard(this.data.buy_guard, passport);
            }
            if (this.data?.bPaused !== undefined) {
                obj?.pause(this.data.bPaused, passport);
            }
            if (this.data?.clone_new !== undefined && obj) {
                await this.new_with_mark(txb, obj.clone(this.data.clone_new?.token_type_new, true, passport), this.data?.clone_new?.namedNew, account);
            }
            if (payee) {
                await this.new_with_mark(txb, payee.launch(), this.data?.payee_treasury?.namedNew, account);
            }
            if (permission) {
                await this.new_with_mark(txb, permission.launch(), this.data?.permission?.namedNew, account);
            }
            if (!object_address) {
                await this.new_with_mark(txb, obj.launch(), this.data?.object?.namedNew, account);
            }
        }
    }
}
