import { IsValidArgType, IsValidCoinType } from 'wowok';
import { IsValidAddress, Errors, ERROR, Permission, PermissionIndex, Demand, } from 'wowok';
import { query_objects } from '../objects';
import { CallBase } from "./base";
import { Account } from '../account';
export class CallDemand extends CallBase {
    data;
    constructor(data) {
        super();
        this.data = data;
    }
    async call(account) {
        if (!this.data?.type_parameter || !IsValidArgType(this.data.type_parameter)) {
            ERROR(Errors.IsValidArgType, 'demand.type_parameter');
        }
        var checkOwner = false;
        const guards = [];
        const perms = [];
        const permission_address = this.data?.permission?.address;
        const object_address = this.data?.object?.address;
        if (permission_address && IsValidAddress(permission_address)) {
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
                if (IsValidAddress(this.data.present.guard)) {
                    guards.push(this.data.present.guard);
                }
                else {
                    if (!object_address) { // new
                        if (this.data?.guard?.address && IsValidAddress(this.data?.guard.address)) {
                            guards.push(this.data.guard.address);
                        }
                    }
                    else {
                        const r = await query_objects({ objects: [object_address], showContent: true });
                        if (r?.objects && r?.objects[0]?.type === 'Demand') {
                            const obj = r?.objects[0];
                            if (obj?.guard) {
                                guards.push(obj?.guard.object);
                            }
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
        const permission_address = this.data?.permission?.address;
        const object_address = this.data?.object?.address;
        if (!object_address) {
            if (!permission_address || !IsValidAddress(permission_address)) {
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
            if (IsValidAddress(object_address) && this.data.type_parameter && this.data.permission && IsValidAddress(permission_address)) {
                obj = Demand.From(txb, this.data.type_parameter, permission_address, object_address);
            }
            else {
                ERROR(Errors.InvalidParam, 'object or permission address invalid.');
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
                    if (IsValidAddress(this.data.bounty.object?.address)) {
                        obj.deposit(this.data.bounty.object?.address);
                    }
                    else if (this.data.bounty.object?.balance !== undefined) {
                        if (!IsValidCoinType(this.data.type_parameter)) {
                            ERROR(Errors.IsValidCoinType, 'demand bounty');
                        }
                        const r = await Account.Instance().get_coin_object(txb, this.data.bounty.object?.balance, account, this.data.type_parameter);
                        if (r)
                            obj.deposit(r);
                    }
                }
                else if (this.data.bounty.op === 'reward') {
                    obj?.yes(this.data.bounty.service, pst);
                }
                else if (this.data.bounty.op === 'refund') {
                    obj?.refund(pst);
                }
            }
            if (this.data?.present !== undefined) {
                //@ demand guard and its pst, if set
                obj?.present(this.data.present.service, this.data.present.service_pay_type, this.data.present.recommend_words, pst);
            }
            if (this.data?.guard !== undefined) {
                obj?.set_guard(this.data.guard.address, this.data.guard?.service_id_in_guard ?? undefined, pst);
            }
            if (permission) {
                await this.new_with_mark(txb, permission.launch(), this.data?.permission?.namedNew, account);
            }
            if (!this.data.object) {
                await this.new_with_mark(txb, obj.launch(), this.data?.object?.namedNew, account);
            }
        }
    }
}
