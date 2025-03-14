import { IsValidArgType, IsValidAddress, Errors, ERROR, Permission, PermissionIndex, Treasury, Arbitration, } from 'wowok';
import { query_objects, } from '../objects';
import { CallBase } from "./base";
export class CallArbitration extends CallBase {
    data;
    constructor(data) {
        super();
        this.data = data;
    }
    async call(account) {
        if (!this.data?.type_parameter || !IsValidArgType(this.data.type_parameter)) {
            ERROR(Errors.IsValidArgType, 'arbitration.type_parameter');
        }
        var checkOwner = false;
        const guards = [];
        const perms = [];
        var obj;
        const permission_address = this.data?.permission?.address;
        const object_address = this.data?.object?.address;
        const treasury_address = this.data?.fee_treasury?.address;
        if (permission_address && IsValidAddress(permission_address)) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.arbitration);
            }
            if (this.data?.description !== undefined && object_address) {
                perms.push(PermissionIndex.arbitration_description);
            }
            if (this.data?.bPaused !== undefined) {
                perms.push(PermissionIndex.arbitration_pause);
            }
            if (this.data?.endpoint == undefined) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.arbitration_endpoint);
            }
            if (this.data?.fee !== undefined && object_address) {
                perms.push(PermissionIndex.arbitration_fee);
            }
            if (treasury_address !== undefined && object_address) {
                perms.push(PermissionIndex.arbitration_treasury);
            }
            if (this.data?.usage_guard !== undefined) {
                perms.push(PermissionIndex.arbitration_guard);
            }
            if (this.data?.voting_guard !== undefined) {
                perms.push(PermissionIndex.arbitration_voting_guard);
            }
            if (this.data?.arb_arbitration !== undefined) {
                perms.push(PermissionIndex.arbitration_arbitration);
            }
            if (this.data?.arb_new?.guard !== undefined) {
                if (IsValidAddress(this.data.arb_new.guard)) {
                    guards.push(this.data.arb_new.guard);
                }
                else {
                    if (!object_address) { // new
                        if (this.data?.usage_guard && IsValidAddress(this.data?.usage_guard)) {
                            guards.push(this.data.usage_guard);
                        }
                    }
                    else {
                        if (!obj) {
                            const r = await query_objects({ objects: [object_address], showContent: true });
                            if (r?.objects && r.objects[0].type === 'Arbitration') {
                                obj = r.objects[0];
                            }
                        }
                        if (obj?.usage_guard) {
                            guards.push(obj.usage_guard);
                        }
                    }
                }
            }
            if (this.data?.arb_vote !== undefined) {
                perms.push(PermissionIndex.treasury_receive);
            }
            if (typeof (this.data?.arb_vote?.voting_guard) === 'string' && IsValidAddress(this.data?.arb_vote?.voting_guard)) {
                guards.push(this.data?.arb_vote?.voting_guard);
            }
            return await this.check_permission_and_call(permission_address, perms, guards, checkOwner, undefined, account);
        }
        return await this.exec(account);
    }
    async operate(txb, passport, account) {
        let obj;
        let permission;
        let withdraw_treasury;
        const permission_address = this.data?.permission?.address;
        const object_address = this.data?.object?.address;
        const treasury_address = this.data?.fee_treasury?.address;
        if (!object_address) {
            if (!permission_address || !IsValidAddress(permission_address)) {
                const d = this.data?.permission?.description ?? '';
                permission = Permission.New(txb, d);
            }
            if (!treasury_address || !IsValidAddress(treasury_address)) {
                const d = this.data?.fee_treasury?.description ?? '';
                withdraw_treasury = Treasury.New(txb, this.data?.type_parameter, permission ? permission.get_object() : permission_address, d, permission ? undefined : passport);
            }
            obj = Arbitration.New(txb, this.data.type_parameter, permission ? permission.get_object() : permission_address, this.data?.description ?? '', BigInt(this.data?.fee ?? 0), withdraw_treasury ? withdraw_treasury.get_object() : treasury_address, permission ? undefined : passport);
        }
        else {
            if (IsValidAddress(object_address) && this.data.type_parameter && permission_address) {
                obj = Arbitration.From(txb, this.data.type_parameter, permission_address, object_address);
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
            if (this.data?.fee !== undefined && object_address) {
                obj?.set_fee(BigInt(this.data.fee), passport);
            }
            if (treasury_address !== undefined && object_address) {
                obj?.set_withdrawTreasury(treasury_address, passport);
            }
            if (this.data?.arb_new !== undefined) {
                await this.new_with_mark(txb, obj?.dispute(this.data.arb_new.data, passport), this.data?.arb_new?.namedNew, account);
            }
            if (this.data?.arb_arbitration !== undefined) {
                obj?.arbitration(this.data.arb_arbitration, passport);
            }
            if (this.data?.arb_vote !== undefined) {
                obj?.vote(this.data.arb_vote, passport);
            }
            if (this.data?.arb_withdraw_fee !== undefined) {
                obj?.withdraw_fee(this.data.arb_withdraw_fee.arb, this.data.arb_withdraw_fee.data, passport);
            }
            if (this.data?.voting_guard !== undefined) {
                switch (this.data.voting_guard.op) {
                    case 'add':
                        obj?.add_voting_guard(this.data.voting_guard.data, passport);
                        break;
                    case 'remove':
                        obj?.remove_voting_guard(this.data.voting_guard.guards, false, passport);
                        break;
                    case 'set':
                        obj?.remove_voting_guard([], true, passport);
                        obj?.add_voting_guard(this.data.voting_guard.data, passport);
                        break;
                    case 'removeall':
                        obj?.remove_voting_guard([], true, passport);
                        break;
                }
            }
            if (this.data.usage_guard !== undefined) {
                obj?.set_guard(this.data.usage_guard, passport);
            }
            if (this.data?.bPaused !== undefined) {
                obj?.pause(this.data.bPaused, passport);
            }
            if (withdraw_treasury) {
                await this.new_with_mark(txb, withdraw_treasury.launch(), this.data?.fee_treasury?.namedNew, account);
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
