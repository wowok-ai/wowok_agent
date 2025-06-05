import { IsValidArgType, Errors, ERROR, Permission, PermissionIndex, Treasury, } from 'wowok';
import { query_objects } from '../query/objects.js';
import { CallBase, GetAccountOrMark_Address, GetObjectExisted, GetObjectMain, GetObjectParam } from "./base.js";
import { Account } from '../local/account.js';
import { LocalMark } from '../local/local.js';
import { get_object_address } from '../common.js';
export class CallTreasury extends CallBase {
    constructor(data) {
        super();
        this.object_address = undefined;
        this.permission_address = undefined;
        this.type_parameter = undefined;
        this.data = data;
    }
    async prepare() {
        if (!this.object_address) {
            this.object_address = (await LocalMark.Instance().get_address(GetObjectExisted(this.data.object)));
            if (this.object_address) {
                await this.update_content('Treasury', this.object_address);
                if (!this.content)
                    ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.object:' + this.object_address);
                this.permission_address = this.content.permission;
                this.type_parameter = Treasury.parseObjectType(this.content.type_raw);
            }
            else {
                const n = GetObjectMain(this.data.object);
                if (!IsValidArgType(n?.type_parameter)) {
                    ERROR(Errors.IsValidArgType, 'CallTreasury_Data.data.object.type_parameter');
                }
                this.permission_address = (await LocalMark.Instance().get_address(GetObjectExisted(n?.permission)));
                this.type_parameter = n.type_parameter;
            }
        }
    }
    async call(account) {
        var checkOwner = false;
        const guards = [];
        const perms = [];
        await this.prepare();
        if (this.permission_address) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.treasury);
            }
            if (this.data?.description !== undefined && this.object_address) {
                perms.push(PermissionIndex.treasury_descritption);
            }
            if (this.data?.withdraw_mode !== undefined) {
                perms.push(PermissionIndex.treasury_withdraw_mode);
            }
            if (this.data?.withdraw_guard == undefined) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.treasury_withdraw_guard);
            }
            if (this.data?.deposit_guard !== undefined) {
                perms.push(PermissionIndex.treasury_deposit_guard);
            }
            if (this.data?.deposit_guard !== undefined) {
                perms.push(PermissionIndex.treasury_deposit_guard);
            }
            if (this.data?.deposit !== undefined) {
                if (this.object_address) {
                    if (this.content?.deposit_guard) {
                        guards.push(this.content.deposit_guard);
                    }
                }
            }
            if (this.data?.receive !== undefined) {
                perms.push(PermissionIndex.treasury_receive);
            }
            if (this.data?.withdraw?.withdraw_guard !== undefined) { // withdraw with guard
                const guard = await get_object_address(this.data.withdraw.withdraw_guard);
                if (guard) {
                    guards.push(guard);
                }
            }
            else { // withdraw with permission
                perms.push(PermissionIndex.treasury_withdraw);
            }
            return await this.check_permission_and_call(this.permission_address, perms, guards, checkOwner, undefined, account);
        }
        return await this.exec(account);
    }
    async operate(txb, passport, account) {
        let obj;
        let perm;
        let permission;
        if (this.object_address) {
            obj = Treasury.From(txb, this.type_parameter, this.permission_address, this.object_address);
            permission = this.permission_address;
        }
        else {
            const n = GetObjectMain(this.data.object);
            permission = await LocalMark.Instance().get_address(GetObjectExisted(n?.permission));
            if (!permission) {
                perm = Permission.New(txb, GetObjectParam(n?.permission)?.description ?? '');
                permission = perm.get_object();
            }
            obj = Treasury.New(txb, this.type_parameter, permission, this.data?.description ?? '', perm ? undefined : passport);
        }
        if (!obj)
            ERROR(Errors.InvalidParam, 'CallTreasury_Data.object:' + this.object_address);
        if (!permission)
            ERROR(Errors.InvalidParam, 'CallTreasury_Data.permission:' + this.permission_address);
        const pst = perm ? undefined : passport;
        if (this.data.deposit !== undefined) {
            const coin = await Account.Instance().get_coin_object(txb, this.data.deposit.balance, account, this.type_parameter);
            if (coin) {
                const index = this.data.deposit?.param?.index ?? 0;
                const [for_guard, for_object] = await LocalMark.Instance().get_many_address([this.data.deposit?.param?.for_guard, this.data.deposit?.param?.for_object]);
                obj?.deposit({ coin: coin, index: BigInt(index), remark: this.data.deposit?.param?.remark ?? '', for_guard, for_object });
            }
        }
        if (this.data?.receive !== undefined && this.object_address) {
            if (this.data.receive === 'recently') {
                const r = await Treasury.GetTreasuryRecievedObject(this.object_address, this.type_parameter);
                if (!r) {
                    ERROR(Errors.InvalidParam, 'CallTreasury_Data.data.receive.received_objects');
                }
                r.received.forEach(v => {
                    obj?.receive(v.payment, v.id, pst);
                });
            }
            else if (this.data.receive?.received_objects?.length > 0) {
                const r = await query_objects({ objects: this.data.receive.received_objects });
                if (r?.objects?.length !== this.data.receive.received_objects.length) {
                    ERROR(Errors.InvalidParam, 'CallTreasury_Data.data.receive.received_objects');
                }
                for (let i = 0; i < r?.objects?.length; ++i) {
                    if (r.objects[i].type !== 'Treasury_ReceivedObject') {
                        ERROR(Errors.InvalidParam, 'CallTreasury_Data.data.receive.received_objects:' + r.objects[i].object);
                    }
                    const v = r.objects[i];
                    obj?.receive(v.payment, v.object, pst);
                }
            }
        }
        if (this.data?.withdraw !== undefined) {
            const [for_guard, for_object] = await LocalMark.Instance().get_many_address([this.data.withdraw?.for_guard, this.data.withdraw?.for_object]);
            const receiver = [];
            for (let i = 0; i < this.data.withdraw.receiver.length; ++i) {
                const v = this.data.withdraw.receiver[i];
                const address = await GetAccountOrMark_Address(v.address);
                if (!address)
                    ERROR(Errors.InvalidParam, 'CallTreasury_Data.data.withdraw.receiver:' + v.address);
                receiver.push({ address: address, amount: BigInt(v.amount) });
            }
            obj?.withdraw({ items: receiver, index: this.data.withdraw.index ?? 0, remark: this.data.withdraw.remark ?? '',
                for_guard, for_object, withdraw_guard: await LocalMark.Instance().get_address(this.data.withdraw.withdraw_guard) }, pst);
        }
        if (this.data?.description !== undefined && this.object_address) {
            obj?.set_description(this.data.description, pst);
        }
        if (this.data?.deposit_guard !== undefined) {
            const guard = await LocalMark.Instance().get_address(this.data?.deposit_guard);
            obj?.set_deposit_guard(guard, pst);
        }
        if (this.data?.withdraw_guard !== undefined) {
            switch (this.data.withdraw_guard.op) {
                case 'add':
                case 'set':
                    if (this.data.withdraw_guard.op === 'set')
                        obj?.remove_withdraw_guard([], true, pst);
                    for (let i = 0; i < this.data.withdraw_guard.data.length; ++i) {
                        let v = this.data.withdraw_guard.data[i];
                        const guard = await LocalMark.Instance().get_address(v.guard);
                        if (guard)
                            obj?.add_withdraw_guard(guard, BigInt(v.amount), pst);
                    }
                    break;
                case 'remove':
                    obj?.remove_withdraw_guard(await LocalMark.Instance().get_many_address2(this.data.withdraw_guard.guards), false, pst);
                    break;
                case 'removeall':
                    obj?.remove_withdraw_guard([], true, pst);
                    break;
            }
        }
        if (this.data?.withdraw_mode !== undefined) {
            obj?.set_withdraw_mode(this.data.withdraw_mode, pst);
        }
        if (perm) {
            const n = GetObjectMain(this.data.object);
            await this.new_with_mark('Permission', txb, perm.launch(), GetObjectParam(n?.permission), account);
        }
        if (!this.object_address) {
            await this.new_with_mark('Treasury', txb, obj.launch(), GetObjectMain(this.data?.object), account);
        }
    }
}
//# sourceMappingURL=treasury.js.map