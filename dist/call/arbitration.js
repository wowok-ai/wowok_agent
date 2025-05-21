import { IsValidArgType, Errors, ERROR, Permission, PermissionIndex, Treasury, Arbitration, } from 'wowok';
import { CallBase } from "./base.js";
import { Account } from '../local/account.js';
import { LocalMark } from '../local/local.js';
export class CallArbitration extends CallBase {
    constructor(data) {
        super();
        this.data = data;
    }
    async call(account) {
        var checkOwner = false;
        const guards = [];
        const perms = [];
        var [permission_address, object_address, treasury_address] = await LocalMark.Instance().get_many_address([this.data?.permission?.address,
            this.data?.object?.address,
            this.data?.fee_treasury?.address]);
        if (object_address) {
            if (!this.data.type_parameter || !permission_address) {
                await this.update_content(object_address, 'Arbitration');
                if (this.content) {
                    permission_address = this.content.permission;
                    this.data.type_parameter = this.content.type_raw;
                }
            }
        }
        else {
            if (!this.data?.type_parameter || !IsValidArgType(this.data.type_parameter)) {
                ERROR(Errors.IsValidArgType, 'CallArbitration_Data.data.type_parameter');
            }
        }
        if (permission_address) {
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
            if (this.data?.guard !== undefined) {
                perms.push(PermissionIndex.arbitration_guard);
            }
            if (this.data?.voting_guard !== undefined) {
                perms.push(PermissionIndex.arbitration_voting_guard);
            }
            if (this.data?.arb_arbitration !== undefined) {
                perms.push(PermissionIndex.arbitration_arbitration);
            }
            if (this.data?.arb_new?.guard !== undefined) {
                if (this.data?.arb_new?.guard) {
                    const guard = await LocalMark.Instance().get_address(this.data?.arb_new?.guard);
                    if (guard) {
                        guards.push(guard);
                    }
                }
                else {
                    if (!object_address) { // new
                        const guard = await LocalMark.Instance().get_address(this.data.guard);
                        if (guard) {
                            guards.push(guard);
                        }
                    }
                    else {
                        await this.update_content(object_address, 'Arbitration');
                        if (this.content?.usage_guard) {
                            guards.push(this.content.usage_guard);
                        }
                    }
                }
            }
            if (this.data?.arb_vote !== undefined) {
                perms.push(PermissionIndex.arbitration_vote);
                const voting_guard = await LocalMark.Instance().get_address(this.data?.arb_vote?.voting_guard);
                if (voting_guard) {
                    guards.push(voting_guard);
                }
            }
            return await this.check_permission_and_call(permission_address, perms, guards, checkOwner, undefined, account);
        }
        return await this.exec(account);
    }
    async operate(txb, passport, account) {
        let obj;
        let permission;
        let withdraw_treasury;
        var [permission_address, object_address] = this?.content ?
            [this.content.permission, this.content.object] :
            await LocalMark.Instance().get_many_address([this.data?.permission?.address,
                this.data?.object?.address]);
        const treasury_address = await LocalMark.Instance().get_address(this.data?.fee_treasury?.address);
        if (!object_address) {
            if (!permission_address) {
                const d = this.data?.permission?.description ?? '';
                permission = Permission.New(txb, d);
            }
            if (!treasury_address) {
                const d = this.data?.fee_treasury?.description ?? '';
                withdraw_treasury = Treasury.New(txb, this.data?.type_parameter, permission ? permission.get_object() : permission_address, d, permission ? undefined : passport);
            }
            obj = Arbitration.New(txb, this.data.type_parameter, permission ? permission.get_object() : permission_address, this.data?.description ?? '', BigInt(this.data?.fee ?? 0), withdraw_treasury ? withdraw_treasury.get_object() : treasury_address, permission ? undefined : passport);
        }
        else {
            if (this.data.type_parameter && permission_address) {
                obj = Arbitration.From(txb, this.data.type_parameter, permission_address, object_address);
            }
            else {
                ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.type_parameter or permission');
            }
        }
        if (obj) {
            const pst = permission ? undefined : passport;
            if (this.data?.description !== undefined && object_address) {
                obj?.set_description(this.data.description, pst);
            }
            if (this.data?.endpoint !== undefined) {
                obj?.set_endpoint(this.data.endpoint, pst);
            }
            if (this.data?.fee !== undefined && object_address) {
                obj?.set_fee(BigInt(this.data.fee), pst);
            }
            if (treasury_address !== undefined && object_address) {
                obj?.set_withdrawTreasury(treasury_address, pst);
            }
            var arb_new;
            if (this.data?.arb_new !== undefined) {
                const d = this.data?.arb_new.data;
                const order = await LocalMark.Instance().get_address(d.order);
                if (order) {
                    const b = BigInt(d.fee);
                    arb_new = obj?.arb({ order: d.order, order_token_type: d.order_token_type, description: d.description, votable_proposition: d.votable_proposition,
                        fee: b > BigInt(0) ? await Account.Instance().get_coin_object(txb, b, account, this.data.type_parameter) : undefined
                    }, pst);
                }
            }
            if (this.data?.arb_arbitration !== undefined) {
                const a = await LocalMark.Instance().get_address(this.data.arb_arbitration.arb) ?? arb_new;
                if (!a)
                    ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.arb_arbitration.arb');
                obj?.arbitration({ arb: a, feedback: this.data.arb_arbitration.feedback, indemnity: this.data.arb_arbitration.indemnity }, pst);
            }
            if (this.data?.arb_vote !== undefined) {
                const a = await LocalMark.Instance().get_address(this.data.arb_vote.arb) ?? arb_new;
                if (!a)
                    ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.arb_vote.arb');
                obj?.vote({ arb: a, voting_guard: this.data.arb_vote.voting_guard, agrees: this.data.arb_vote.agrees }, pst);
            }
            if (this.data?.arb_withdraw_fee !== undefined) {
                const a = await LocalMark.Instance().get_address(this.data.arb_withdraw_fee.arb) ?? arb_new;
                if (!a)
                    ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.arb_withdraw_fee.arb');
                obj?.withdraw_fee(a, this.data.arb_withdraw_fee.data, pst);
            }
            if (arb_new) {
                await this.new_with_mark('Arb', txb, obj?.arb_launch(arb_new), this.data?.arb_new?.namedNew, account);
            }
            if (this.data?.voting_guard !== undefined) {
                switch (this.data.voting_guard.op) {
                    case 'add':
                    case 'set':
                        for (let i = 0; i < this.data.voting_guard.data.length; ++i) {
                            const v = this.data.voting_guard.data[i];
                            if (typeof (v.guard) === 'string') {
                                const g = await LocalMark.Instance().get_address(v.guard);
                                if (!g) {
                                    ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.voting_guard');
                                }
                                v.guard = g;
                            }
                        }
                        if (this.data.voting_guard.op === 'set') {
                            obj?.remove_voting_guard([], true, pst);
                        }
                        obj?.add_voting_guard(this.data.voting_guard.data, pst);
                        break;
                    case 'remove':
                        obj?.remove_voting_guard(await LocalMark.Instance().get_many_address2(this.data.voting_guard.guards), false, pst);
                        break;
                    case 'removeall':
                        obj?.remove_voting_guard([], true, pst);
                        break;
                }
            }
            const guard = await LocalMark.Instance().get_address(this.data.guard);
            if (guard) {
                obj?.set_guard(guard, pst);
            }
            if (this.data?.bPaused !== undefined) {
                obj?.pause(this.data.bPaused, pst);
            }
            if (withdraw_treasury) {
                await this.new_with_mark('Treasury', txb, withdraw_treasury.launch(), this.data?.fee_treasury?.namedNew, account);
            }
            if (permission) {
                await this.new_with_mark('Permission', txb, permission.launch(), this.data?.permission?.namedNew, account);
            }
            if (!object_address) {
                await this.new_with_mark('Arbitration', txb, obj.launch(), this.data?.object?.namedNew, account);
            }
        }
    }
}
//# sourceMappingURL=arbitration.js.map