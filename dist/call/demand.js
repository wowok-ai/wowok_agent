import { IsValidArgType, IsValidCoinType } from 'wowok';
import { Errors, ERROR, Permission, PermissionIndex, Demand, } from 'wowok';
import { CallBase } from "./base.js";
import { Account } from '../local/account.js';
import { LocalMark } from '../local/local.js';
export class CallDemand extends CallBase {
    constructor(data) {
        super();
        this.content = undefined;
        this.data = data;
    }
    async call(account) {
        var checkOwner = false;
        const guards = [];
        const perms = [];
        var [permission_address, object_address] = await LocalMark.Instance().get_many_address([this.data?.permission?.address,
            this.data?.object?.address]);
        if (object_address) {
            if (!this.data.type_parameter || !permission_address) {
                await this.update_content(object_address, 'Demand');
                if (this.content) {
                    permission_address = this.content.permission;
                    this.data.type_parameter = this.content.type_raw;
                }
            }
        }
        else {
            if (!this.data?.type_parameter || !IsValidArgType(this.data.type_parameter)) {
                ERROR(Errors.IsValidArgType, 'CallDemand_Data.data.type_parameter');
            }
        }
        if (permission_address) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.demand);
            }
            if (this.data?.description !== undefined && object_address) {
                perms.push(PermissionIndex.demand_description);
            }
            if (this.data?.time_expire !== undefined && object_address) {
                perms.push(PermissionIndex.demand_expand_time);
            }
            if (this.data?.guard !== undefined) {
                perms.push(PermissionIndex.demand_guard);
            }
            if (this.data?.bounty?.op === 'reward') {
                perms.push(PermissionIndex.demand_yes);
            }
            if (this.data?.bounty?.op === 'refund') {
                perms.push(PermissionIndex.demand_refund);
            }
            if (this.data?.present?.guard !== undefined) {
                if (this.data.present.guard) {
                    const guard = await LocalMark.Instance().get_address(this.data.present.guard);
                    if (guard) {
                        guards.push(guard);
                    }
                }
                else {
                    if (!object_address) { // new
                        const guard = await LocalMark.Instance().get_address(this.data?.guard?.address);
                        if (guard) {
                            guards.push(guard);
                        }
                    }
                    else {
                        await this.update_content(object_address, 'Demand');
                        if (this.content?.guard?.object) {
                            guards.push(this.content.guard?.object);
                        }
                    }
                }
            }
            return await this.check_permission_and_call(permission_address, perms, guards, checkOwner, undefined, account);
        }
        return await this.exec(account);
    }
    async operate(txb, passport, account) {
        let obj;
        let permission;
        var [permission_address, object_address] = this?.content ?
            [this.content.permission, this.content.object] :
            await LocalMark.Instance().get_many_address([this.data?.permission?.address,
                this.data?.object?.address]);
        if (!object_address) {
            if (!permission_address) {
                const d = this.data?.permission?.description ?? '';
                permission = Permission.New(txb, d);
            }
            if (this.data.time_expire !== undefined) {
                obj = Demand.New(txb, this.data.type_parameter, this.data.time_expire?.op === 'duration' ? true : false, this.data.time_expire?.op === 'duration' ? this.data.time_expire.minutes : this.data.time_expire?.time, permission ? permission.get_object() : permission_address, this.data?.description ?? '', permission ? undefined : passport);
            }
            else {
                obj = Demand.New(txb, this.data.type_parameter, true, 30 * 24 * 60, // 30days default
                permission ? permission.get_object() : permission_address, this.data?.description ?? '', permission ? undefined : passport);
            }
        }
        else {
            if (this.data.type_parameter && permission_address) {
                obj = Demand.From(txb, this.data.type_parameter, permission_address, object_address);
            }
            else {
                ERROR(Errors.InvalidParam, 'CallDemand_Data.data.type_parameter or permission');
            }
        }
        if (obj) {
            const pst = permission ? undefined : passport;
            if (this.data?.description !== undefined && object_address) {
                obj?.set_description(this.data.description, pst);
            }
            if (this.data?.time_expire !== undefined && object_address) {
                obj?.expand_time(this.data.time_expire.op === 'duration' ? true : false, this.data.time_expire.op === 'duration' ? this.data.time_expire.minutes : this.data.time_expire.time, pst);
            }
            if (this.data?.bounty !== undefined) {
                if (this.data.bounty.op === 'add') {
                    const bounty = await LocalMark.Instance().get_address(this.data.bounty.object?.address);
                    if (bounty) {
                        obj.deposit(this.data.bounty.object?.address);
                    }
                    else if (this.data.bounty.object?.balance !== undefined) {
                        if (!IsValidCoinType(this.data.type_parameter)) {
                            ERROR(Errors.IsValidCoinType, 'CallDemand_Data.data.type_parameter');
                        }
                        const r = await Account.Instance().get_coin_object(txb, this.data.bounty.object?.balance, account, this.data.type_parameter);
                        if (r)
                            obj.deposit(r);
                    }
                }
                else if (this.data.bounty.op === 'reward') {
                    const service = await localStorage.Instance().get_address(this.data.bounty.service);
                    if (!service)
                        ERROR(Errors.InvalidParam, 'CallDemand_Data.data.bounty.service');
                    obj?.yes(service, pst);
                }
                else if (this.data.bounty.op === 'refund') {
                    obj?.refund(pst);
                }
            }
            if (this.data?.present !== undefined) {
                //@ demand guard and its pst, if set
                const service = typeof (this.data.present.service) === 'string' ? (await LocalMark.Instance().get_address(this.data.present.service)) : this.data.present.service;
                if (service === undefined) {
                    ERROR(Errors.InvalidParam, 'CallDemand_Data.data.present.service');
                }
                obj?.present(typeof (this.data.present.service) === 'string' ? service : this.data.present.service, this.data.present.service_pay_type, this.data.present.recommend_words, pst);
            }
            if (this.data?.guard !== undefined) {
                const guard = await LocalMark.Instance().get_address(this.data?.guard.address);
                if (!guard) {
                    ERROR(Errors.InvalidParam, 'CallDemand_Data.data.guard.address');
                }
                obj?.set_guard(guard, this.data.guard?.service_id_in_guard ?? undefined, pst);
            }
            if (permission) {
                await this.new_with_mark('Permission', txb, permission.launch(), this.data?.permission?.namedNew, account);
            }
            if (!this.data.object) {
                await this.new_with_mark('Demand', txb, obj.launch(), this.data?.object?.namedNew, account);
            }
        }
    }
}
//# sourceMappingURL=demand.js.map