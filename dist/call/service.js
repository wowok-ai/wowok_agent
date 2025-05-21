import { IsValidArgType, TagName, IsValidAddress, Errors, ERROR, Permission, PermissionIndex, Service, Treasury, } from 'wowok';
import { CallBase } from "./base.js";
import { Account } from '../local/account.js';
import { LocalMark } from '../local/local.js';
import { get_object_address } from '../common.js';
export class CallService extends CallBase {
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
        var [permission_address, object_address, treasury_address] = await LocalMark.Instance().get_many_address([this.data?.permission?.address,
            this.data?.object?.address,
            this.data?.payee_treasury?.address]);
        if (object_address) {
            if (!this.data.type_parameter || !permission_address) {
                await this.update_content(object_address, 'Service');
                if (this.content) {
                    permission_address = this.content.permission;
                    this.data.type_parameter = this.content.type_raw;
                }
            }
        }
        else {
            if (!this.data?.type_parameter || !IsValidArgType(this.data.type_parameter)) {
                ERROR(Errors.IsValidArgType, 'CallService_Data.data.type_parameter');
            }
        }
        if (permission_address) {
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
            if (this.data?.order_new !== undefined) {
                if (this.data.order_new.guard) {
                    const guard = await LocalMark.Instance().get_address(this.data.order_new.guard);
                    if (guard) {
                        guards.push(guard);
                    }
                }
                else {
                    if (!object_address) {
                        const buy_guard = await LocalMark.Instance().get_address(this.data?.buy_guard);
                        if (buy_guard) {
                            guards.push(buy_guard);
                        }
                    }
                    else {
                        await this.update_content(object_address, 'Service');
                        if (this.content?.buy_guard) {
                            guards.push(this.content.buy_guard);
                        }
                    }
                }
            }
            if (this.data.order_refund !== undefined) {
                const guard = await LocalMark.Instance().get_address(this.data?.order_refund?.guard);
                if (guard)
                    guards.push(guard);
            }
            if (this.data.order_withdrawl !== undefined) { // permission(may be guard) + withdraw_guard
                perms.push(PermissionIndex.service_withdraw);
            }
            if (typeof (this.data?.order_withdrawl?.data?.withdraw_guard) === 'string') {
                const guard = await LocalMark.Instance().get_address(this.data?.order_withdrawl?.data?.withdraw_guard);
                if (guard)
                    guards.push(guard);
            }
            return await this.check_permission_and_call(permission_address, perms, guards, checkOwner, undefined, account);
        }
        return await this.exec(account);
    }
    async operate(txb, passport, account) {
        let obj;
        let permission;
        let payee;
        var [permission_address, object_address] = this?.content ?
            [this.content.permission, this.content.object] :
            await LocalMark.Instance().get_many_address([this.data?.permission?.address,
                this.data?.object?.address]);
        const treasury_address = await LocalMark.Instance().get_address(this.data?.payee_treasury?.address);
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
            if (this.data.type_parameter && permission_address) {
                obj = Service.From(txb, this.data.type_parameter, permission_address, object_address);
            }
            else {
                ERROR(Errors.InvalidParam, 'CallService_Data.data.type_parameter or permission');
            }
        }
        if (obj) {
            //const perm = permission ? permission.get_object() : permission_address;
            const pst = permission ? undefined : passport;
            if (this.data?.description !== undefined && object_address) {
                obj?.set_description(this.data.description, pst);
            }
            if (this.data?.endpoint !== undefined) {
                obj?.set_endpoint(this.data.endpoint, pst);
            }
            if (treasury_address !== undefined && object_address) {
                obj?.set_payee(treasury_address, pst);
            }
            if (this.data?.gen_discount !== undefined) {
                const add = [];
                for (let i = 0; i < this.data.gen_discount.length; ++i) {
                    let v = this.data.gen_discount[i];
                    const addr = await LocalMark.Instance().get_address(v.receiver);
                    if (addr) {
                        v.receiver = addr;
                        add.push(v);
                    }
                }
                obj?.discount_transfer(add, pst);
            }
            if (this.data?.repository !== undefined) {
                switch (this.data.repository.op) {
                    case 'add':
                    case 'set':
                        if (this.data.repository.op === 'set')
                            obj?.remove_repository([], true, pst);
                        for (let i = 0; i < this.data.repository.repositories.length; ++i) {
                            let v = this.data.repository.repositories[i];
                            const addr = await LocalMark.Instance().get_address(v);
                            if (addr) {
                                obj?.add_repository(v, pst);
                            }
                        }
                        break;
                    case 'remove':
                        obj?.remove_repository(await LocalMark.Instance().get_many_address2(this.data.repository.repositories), false, pst);
                        break;
                    case 'removeall':
                        obj?.remove_repository([], true, pst);
                        break;
                }
            }
            if (this.data?.extern_withdraw_treasury !== undefined) {
                switch (this.data.extern_withdraw_treasury.op) {
                    case 'add':
                    case 'set':
                        if (this.data.extern_withdraw_treasury.op === 'set')
                            obj?.remove_treasury([], true, pst);
                        for (let i = 0; i < this.data.extern_withdraw_treasury.treasuries.length; ++i) {
                            let v = this.data.extern_withdraw_treasury.treasuries[i];
                            const addr = await LocalMark.Instance().get_address(v.address);
                            if (addr && v.token_type) {
                                obj?.add_treasury(v.token_type, v.address, pst);
                            }
                        }
                        break;
                    case 'remove':
                        obj?.remove_treasury(await LocalMark.Instance().get_many_address2(this.data.extern_withdraw_treasury.addresses), false, pst);
                        break;
                    case 'removeall':
                        obj?.remove_treasury([], false, pst);
                        break;
                }
            }
            if (this.data?.machine !== undefined) {
                const machine = await LocalMark.Instance().get_address(this.data.machine);
                obj?.set_machine(machine, pst);
            }
            if (this.data?.arbitration !== undefined) {
                switch (this.data.arbitration.op) {
                    case 'add':
                    case 'set':
                        if (this.data.arbitration.op === 'set')
                            obj?.remove_arbitration([], true, pst);
                        for (let i = 0; i < this.data.arbitration.arbitrations.length; ++i) {
                            let v = this.data.arbitration.arbitrations[i];
                            const addr = await LocalMark.Instance().get_address(v.address);
                            if (addr && v.token_type) {
                                obj?.add_arbitration(v.address, v.token_type, pst);
                            }
                        }
                        break;
                    case 'remove':
                        obj?.remove_arbitration(await LocalMark.Instance().get_many_address2(this.data.arbitration.addresses), false, pst);
                        break;
                    case 'removeall':
                        obj?.remove_arbitration([], false, pst);
                        break;
                }
            }
            if (this.data?.customer_required_info !== undefined) {
                if (this.data.customer_required_info.required_info && this.data.customer_required_info.pubkey) {
                    obj?.set_customer_required(this.data.customer_required_info.pubkey, this.data.customer_required_info.required_info, pst);
                }
                else if (this.data.customer_required_info.pubkey) {
                    obj?.change_required_pubkey(this.data.customer_required_info.pubkey, pst);
                }
            }
            if (this.data?.sales !== undefined) {
                switch (this.data.sales.op) {
                    case 'add':
                        obj?.add_sales(this.data.sales.sales, false, pst);
                        break;
                    case 'remove':
                        obj?.remove_sales(this.data.sales.sales_name, pst);
                        break;
                }
            }
            if (this.data?.withdraw_guard !== undefined) {
                switch (this.data.withdraw_guard.op) {
                    case 'add':
                    case 'set':
                        if (this.data.withdraw_guard.op === 'set')
                            obj?.remove_withdraw_guards([], true, pst);
                        const add = [];
                        for (let i = 0; i < this.data.withdraw_guard.guards.length; ++i) {
                            let v = this.data.withdraw_guard.guards[i];
                            const addr = typeof (v.guard) === 'string' ? await LocalMark.Instance().get_address(v.guard) : v.guard;
                            if (addr) {
                                v.guard = addr;
                                add.push(v);
                            }
                        }
                        obj?.add_withdraw_guards(add, pst);
                        break;
                    case 'remove':
                        obj?.remove_withdraw_guards(await LocalMark.Instance().get_many_address2(this.data.withdraw_guard.addresses), false, pst);
                        break;
                    case 'removeall':
                        obj?.remove_withdraw_guards([], true, pst);
                        break;
                }
            }
            if (this.data?.refund_guard !== undefined) {
                switch (this.data.refund_guard.op) {
                    case 'add':
                    case 'set':
                        if (this.data.refund_guard.op === 'set')
                            obj?.remove_refund_guards([], true, pst);
                        const add = [];
                        for (let i = 0; i < this.data.refund_guard.guards.length; ++i) {
                            let v = this.data.refund_guard.guards[i];
                            const addr = typeof (v.guard) === 'string' ? await LocalMark.Instance().get_address(v.guard) : v.guard;
                            if (addr) {
                                v.guard = addr;
                                add.push(v);
                            }
                        }
                        obj?.add_refund_guards(add, pst);
                        break;
                    case 'remove':
                        obj?.remove_refund_guards(await LocalMark.Instance().get_many_address2(this.data.refund_guard.addresses), false, pst);
                        break;
                    case 'removeall':
                        obj?.remove_refund_guards([], true, pst);
                        break;
                }
            }
            if (this.data?.bPublished) {
                obj?.publish(pst);
            }
            var order_new;
            if (this.data?.order_new !== undefined) {
                let b = BigInt(0);
                let coin;
                this.data.order_new.buy_items.forEach(v => {
                    b += BigInt(v.max_price) * BigInt(v.count);
                });
                if (b > BigInt(0)) {
                    coin = await Account.Instance().get_coin_object(txb, b, account, this.data.type_parameter);
                    if (coin) {
                        //@ crypto tools support
                        order_new = obj.order(this.data.order_new.buy_items, coin, this.data.order_new.discount, this.data.order_new.machine, this.data.order_new.customer_info_crypto, pst);
                    }
                }
            }
            if (this.data?.order_agent !== undefined) {
                const o = this.data.order_agent.order ? await LocalMark.Instance().get_address(this.data.order_agent.order) : order_new?.order;
                if (!o)
                    ERROR(Errors.InvalidParam, `CallService_Data.data.order_agent.order:${this.data.order_agent.order}`);
                const p = this.data.order_agent.progress ? await LocalMark.Instance().get_address(this.data.order_agent.progress) : order_new?.progress;
                if (!p)
                    ERROR(Errors.InvalidParam, `CallService_Data.data.order_agent.progress:${this.data.order_agent.progress}`);
                obj?.set_order_agent(o, await LocalMark.Instance().get_many_address2(this.data.order_agent.agents), p);
            }
            if (this.data?.order_required_info !== undefined && this.data.order_required_info.info !== undefined) {
                const o = this.data.order_required_info.order ? await LocalMark.Instance().get_address(this.data.order_required_info.order) : order_new?.order;
                if (!o)
                    ERROR(Errors.InvalidParam, `CallService_Data.data.order_agent.order:${this.data.order_required_info.order}`);
                obj?.update_order_required_info(o, this.data.order_required_info.info);
            }
            if (this.data?.order_refund !== undefined) {
                const o = this.data.order_refund.order ? await LocalMark.Instance().get_address(this.data.order_refund.order) : order_new?.order;
                if (!o)
                    ERROR(Errors.InvalidParam, `CallService_Data.data.order_agent.order:${this.data.order_refund.order}`);
                if (this.data?.order_refund?.arb && this.data?.order_refund?.arb_token_type) {
                    const arb = await LocalMark.Instance().get_address(this.data?.order_refund?.arb);
                    if (arb) {
                        obj?.refund_withArb(o, arb, this.data?.order_refund?.arb_token_type);
                    }
                }
                else {
                    const guard = await LocalMark.Instance().get_address(this.data?.order_refund?.guard);
                    if (guard)
                        obj?.refund(o, guard, pst);
                }
            }
            if (this.data?.order_withdrawl !== undefined && pst) { //@ need withdrawal pst
                const o = this.data.order_withdrawl.order ? await LocalMark.Instance().get_address(this.data.order_withdrawl.order) : order_new?.order;
                if (!o)
                    ERROR(Errors.InvalidParam, `CallService_Data.data.order_agent.order:${this.data.order_withdrawl.order}`);
                this.data.order_withdrawl.data.for_guard = await get_object_address(this.data.order_withdrawl.data.for_guard);
                this.data.order_withdrawl.data.for_object = await get_object_address(this.data.order_withdrawl.data.for_object);
                this.data.order_withdrawl.data.treasury = await get_object_address(this.data.order_withdrawl.data.treasury);
                this.data.order_withdrawl.data.withdraw_guard = await get_object_address(this.data.order_withdrawl.data.withdraw_guard);
                obj?.withdraw(o, this.data.order_withdrawl.data, pst);
            }
            if (this.data?.order_payer !== undefined && obj) {
                const o = this.data.order_payer.order ? await LocalMark.Instance().get_address(this.data.order_payer.order) : order_new?.order;
                if (!o)
                    ERROR(Errors.InvalidParam, `CallService_Data.data.order_agent.order:${this.data.order_payer.order}`);
                const p = this.data.order_payer.progress ? await LocalMark.Instance().get_address(this.data.order_payer.progress) : order_new?.progress;
                if (!p)
                    ERROR(Errors.InvalidParam, `CallService_Data.data.order_agent.progress:${this.data.order_payer.progress}`);
                const payer = await LocalMark.Instance().get_address(this.data.order_payer.payer_new);
                if (payer)
                    obj?.change_order_payer(o, payer, p);
            }
            if (order_new && this?.data?.order_new) {
                const buy = obj.order_launch(order_new);
                await this.new_with_mark('Order', txb, buy.order, this.data?.order_new?.namedNewOrder, account, [TagName.Launch, TagName.Order]);
                if (buy?.progress) {
                    await this.new_with_mark('Progress', txb, buy.progress, this.data?.order_new?.namedNewProgress, account, [TagName.Launch]);
                }
            }
            if (this.data?.buy_guard !== undefined) {
                obj?.set_buy_guard(this.data.buy_guard, pst);
            }
            if (this.data?.bPaused !== undefined) {
                obj?.pause(this.data.bPaused, pst);
            }
            if (this.data?.clone_new !== undefined && object_address) {
                await this.new_with_mark('Service', txb, obj.clone(this.data.clone_new?.token_type_new, true, pst), this.data?.clone_new?.namedNew, account);
            }
            if (payee) {
                await this.new_with_mark('Treasury', txb, payee.launch(), this.data?.payee_treasury?.namedNew, account);
            }
            if (permission) {
                await this.new_with_mark('Permission', txb, permission.launch(), this.data?.permission?.namedNew, account);
            }
            if (!object_address) {
                await this.new_with_mark('Service', txb, obj.launch(), this.data?.object?.namedNew, account);
            }
        }
    }
}
//# sourceMappingURL=service.js.map