import { Errors, ERROR, Permission, PermissionIndex, Repository, Repository_Policy_Mode, uint2address, IsValidU256, ValueType, RepositoryValueType, Bcs } from 'wowok';
import { CallBase, GetAccountOrMark_Address, GetObjectExisted, GetObjectMain, GetObjectParam } from "./base.js";
import { LocalMark } from '../local/local.js';
export const GetAddressID = async (key) => {
    if (typeof (key) === 'number' || typeof (key) === 'bigint') {
        if (IsValidU256(key)) {
            return uint2address(key);
        }
    }
    else {
        return await GetAccountOrMark_Address(key);
    }
};
export class CallRepository extends CallBase {
    constructor(data) {
        super();
        this.object_address = undefined;
        this.permission_address = undefined;
        this.resolve_by_key = async (d, policy) => {
            for (let i = 0; i < d.data.length; ++i) {
                const data = d.data[i];
                if (policy && data.data.type !== policy.dataType) {
                    ERROR(Errors.InvalidParam, `CallRepository_Data.data.add_by_key ${d.key} data type not match`);
                }
                const addr = await GetAddressID(data.address);
                if (!addr)
                    ERROR(Errors.InvalidParam, `CallRepository_Data.data.add_by_key ${d.key} address not valid`);
                data.address_string = addr;
                await SerRepositoryTypeData(data.data);
            }
        };
        this.data = data;
    }
    async prepare() {
        if (!this.object_address) {
            this.object_address = (await LocalMark.Instance().get(GetObjectExisted(this.data?.object)))?.address;
        }
        if (this.object_address) {
            await this.update_content('Repository', this.object_address);
            if (!this.content)
                ERROR(Errors.InvalidParam, 'CallRepository_Data.data.object:' + this.object_address);
            this.permission_address = this.content.permission;
        }
        else {
            const n = GetObjectMain(this.data?.object);
            this.permission_address = (await LocalMark.Instance().get_address(GetObjectExisted(n?.permission)));
        }
    }
    async call(account) {
        var checkOwner = false;
        const perms = [];
        const add_perm = (index) => {
            if (this.permission_address && !perms.includes(index)) {
                perms.push(index);
            }
        };
        await this.prepare();
        if (!this.object_address) {
            add_perm(PermissionIndex.repository);
        }
        if (this.data?.description != null && this.object_address) {
            add_perm(PermissionIndex.repository_description);
        }
        if (this.data?.mode != null && this.object_address) {
            add_perm(PermissionIndex.repository_mode);
        }
        if (this.data?.reference != null) {
            add_perm(PermissionIndex.repository_reference);
        }
        if (this.data?.policy != null) {
            add_perm(PermissionIndex.repository_policies);
        }
        if (this.data.guard !== undefined) {
            add_perm(PermissionIndex.repository_guard);
        }
        if (this.data?.data != null) {
            // check policy & mode 
            const policy = this.content?.policy;
            const mode = this.content?.policy_mode;
            if (this.data.data?.op === 'add_by_key') {
                const d = this.data.data.data;
                const p = policy?.find((v) => v.key === d.key);
                if (p) {
                    if (p.permissionIndex != null) {
                        add_perm(p.permissionIndex); // permission check
                    }
                    await this.resolve_by_key(d, p);
                }
                else {
                    if (mode === Repository_Policy_Mode.POLICY_MODE_STRICT) {
                        ERROR(Errors.Fail, `CallRepository_Data.data.add_by_key ${d.key} policy not match on the POLICY_MODE_STRICT mode.`);
                    }
                    await this.resolve_by_key(d);
                }
            }
            else if (this.data.data.op === 'add_by_address') {
                const d = this.data.data.data;
                const addr = await GetAddressID(d.address);
                if (!addr)
                    ERROR(Errors.InvalidParam, `CallRepository_Data.data.add_by_address ${d.address} address not valid`);
                d.address_string = addr;
                for (let i = 0; i < d.data.length; ++i) {
                    const value = d.data[i];
                    const p = policy?.find((v) => v.key === value.key);
                    if (p) {
                        if (p.permissionIndex != null) {
                            add_perm(p.permissionIndex); // permission check
                        }
                    }
                    else {
                        if (mode === Repository_Policy_Mode.POLICY_MODE_STRICT) {
                            ERROR(Errors.Fail, `CallRepository_Data.data.add_by_address: ${value.key} policy not match on the POLICY_MODE_STRICT mode.`);
                        }
                    }
                    await SerRepositoryTypeData(value.data);
                }
            }
            else if (this.data.data.op === 'remove') {
                const d = this.data.data.data;
                for (let i = 0; i < d.length; ++i) {
                    const value = d[i];
                    const p = policy.find((v) => v.key === value.key);
                    if (p) {
                        if (p.permissionIndex != null && !perms.includes(p.permissionIndex)) {
                            add_perm(p.permissionIndex); // permission check
                        }
                    }
                    else {
                        if (mode === Repository_Policy_Mode.POLICY_MODE_STRICT) {
                            ERROR(Errors.Fail, `CallRepository_Data.data.remove: ${value.key} policy not match on the POLICY_MODE_STRICT mode.`);
                        }
                    }
                    const addr = await GetAddressID(value.address);
                    if (!addr)
                        ERROR(Errors.InvalidParam, `CallRepository_Data.data.remove ${value.address} address not valid`);
                    value.address_string = addr;
                }
            }
        }
        if (this.permission_address) {
            return await this.check_permission_and_call(this.permission_address, perms, [], checkOwner, undefined, account);
        }
        return await this.exec(account);
    }
    async operate(txb, passport, account) {
        let obj;
        let perm;
        let permission;
        if (this.object_address) {
            obj = Repository.From(txb, this.permission_address, this.object_address);
            permission = this.permission_address;
        }
        else {
            const n = GetObjectMain(this.data?.object);
            permission = await LocalMark.Instance().get_address(GetObjectExisted(n?.permission));
            if (!permission) {
                perm = Permission.New(txb, GetObjectParam(n?.permission)?.description ?? '');
                permission = perm.get_object();
            }
            obj = Repository.New(txb, permission, this.data?.description ?? '', this.data.mode, perm ? undefined : passport);
        }
        if (!obj)
            ERROR(Errors.InvalidParam, 'CallRepository_Data.object:' + this.object_address);
        if (!permission)
            ERROR(Errors.InvalidParam, 'CallRepository_Data.permission:' + this.permission_address);
        const pst = perm ? undefined : passport;
        if (this.data?.data != null) {
            if (this.data.data.op === 'add_by_key') {
                const d = this.data.data.data;
                obj.add_data({ key: d.key, data: d.data.map(v => {
                        return { address: v.address_string, bcsBytes: v.data.bcsBytes };
                    }) }, pst);
            }
            else if (this.data.data.op === 'add_by_address') {
                const d = this.data.data.data;
                obj.add_data2({ address: d.address_string, data: d.data.map(v => {
                        return { key: v.key, bcsBytes: v.data.bcsBytes };
                    }) }, pst);
            }
            else if (this.data.data.op === 'remove') {
                const d = this.data.data.data;
                for (let i = 0; i < d.length; ++i) {
                    const value = d[i];
                    obj?.remove(value.address_string, value.key, pst);
                }
            }
        }
        if (this.data?.description != null && this.object_address) {
            obj?.set_description(this.data.description, pst);
        }
        if (this.data?.reference != null) {
            switch (this.data.reference.op) {
                case 'set':
                case 'add':
                    if (this.data.reference.op === 'set')
                        obj?.remove_reference([], true, pst);
                    obj?.add_reference(await LocalMark.Instance().get_many_address2(this.data.reference.objects), pst);
                    break;
                case 'remove':
                    obj?.remove_reference(await LocalMark.Instance().get_many_address2(this.data.reference.objects), false, pst);
                    break;
                case 'removeall':
                    obj?.remove_reference([], true, pst);
                    break;
            }
        }
        if (this.data?.mode != null && this.object_address) { //@ priority??
            obj?.set_policy_mode(this.data.mode, pst);
        }
        if (this.data?.policy != null) {
            switch (this.data.policy.op) {
                case 'set':
                    obj?.remove_policies([], true, pst);
                    obj?.add_policies(this.data.policy.data, pst);
                    break;
                case 'add':
                    obj?.add_policies(this.data.policy.data, pst);
                    break;
                case 'remove':
                    obj?.remove_policies(this.data.policy.keys, false, pst);
                    break;
                case 'removeall':
                    obj?.remove_policies([], true, pst);
                    break;
                case 'rename':
                    this.data.policy.data.forEach((v) => {
                        obj?.rename_policy(v.old, v.new, pst);
                    });
                    break;
            }
        }
        if (this.data?.guard !== undefined) {
            if (this.data.guard === null) {
                obj?.set_guard(undefined, pst);
            }
            else {
                const guard = await LocalMark.Instance().get_address(this.data.guard);
                if (!guard)
                    ERROR(Errors.InvalidParam, `CallRepository_Data.data.guard: ${this.data.guard} invalid`);
                obj?.set_guard(guard, pst);
            }
        }
        if (perm) {
            const n = GetObjectMain(this.data?.object);
            await this.new_with_mark('Permission', txb, perm.launch(), GetObjectParam(n?.permission), account);
        }
        if (!this.object_address) {
            await this.new_with_mark('Repository', txb, obj.launch(), GetObjectMain(this.data?.object), account);
        }
    }
}
const SerRepositoryTypeData = async (data) => {
    switch (data.type) {
        case RepositoryValueType.Address:
            const addr = await GetAddressID(data.data);
            if (!addr)
                ERROR(Errors.Fail, `SerRepositoryTypeData Address: ${data.data}`);
            data.bcsBytes = new Uint8Array([...Bcs.getInstance().ser(ValueType.TYPE_U8, ValueType.TYPE_ADDRESS),
                ...Bcs.getInstance().ser(ValueType.TYPE_ADDRESS, addr)]);
            break;
        case RepositoryValueType.Address_Vec:
            const addrs = [];
            for (let i = 0; i < data.data.length; ++i) {
                const addr = await GetAddressID(data.data[i]);
                if (!addr)
                    ERROR(Errors.Fail, `SerRepositoryTypeData Address_Vec: ${data.data[i]}`);
                addrs.push(addr);
            }
            data.bcsBytes = new Uint8Array([...Bcs.getInstance().ser(ValueType.TYPE_U8, ValueType.TYPE_VEC_ADDRESS),
                ...Bcs.getInstance().ser(ValueType.TYPE_VEC_ADDRESS, addrs)]);
            break;
        case RepositoryValueType.Bool:
            data.bcsBytes = new Uint8Array([...Bcs.getInstance().ser(ValueType.TYPE_U8, ValueType.TYPE_BOOL),
                ...Bcs.getInstance().ser(ValueType.TYPE_BOOL, data.data)]);
            break;
        case RepositoryValueType.PositiveNumber: {
            const type = Repository.DataType2ValueType(data.data);
            if (!type)
                ERROR(Errors.Fail, `SerRepositoryTypeData PositiveNumber: ${data.data}`);
            data.bcsBytes = new Uint8Array([...Bcs.getInstance().ser(ValueType.TYPE_U8, type),
                ...Bcs.getInstance().ser(type, data.data)]);
            break;
        }
        case RepositoryValueType.PositiveNumber_Vec: {
            let type = ValueType.TYPE_U8;
            for (let i = 0; i < data.data.length; ++i) {
                const t = Repository.DataType2ValueType(data.data[i]);
                if (!t)
                    ERROR(Errors.Fail, `SerRepositoryTypeData PositiveNumber_Vec: ${data.data[i]}`);
                if (t > type)
                    type = t;
            }
            if (type === ValueType.TYPE_U8) {
                type = ValueType.TYPE_VEC_U8;
            }
            else if (type === ValueType.TYPE_U64) {
                type = ValueType.TYPE_VEC_U64;
            }
            else if (type === ValueType.TYPE_U128) {
                type = ValueType.TYPE_VEC_U128;
            }
            else {
                type = ValueType.TYPE_VEC_U256;
            }
            data.bcsBytes = new Uint8Array([...Bcs.getInstance().ser(ValueType.TYPE_U8, type),
                ...Bcs.getInstance().ser(type, data.data)]);
            break;
        }
        case RepositoryValueType.String:
            data.bcsBytes = new Uint8Array([...Bcs.getInstance().ser(ValueType.TYPE_U8, ValueType.TYPE_STRING),
                ...Bcs.getInstance().ser(ValueType.TYPE_STRING, data.data)]);
            break;
        case RepositoryValueType.String_Vec:
            data.bcsBytes = new Uint8Array([...Bcs.getInstance().ser(ValueType.TYPE_U8, ValueType.TYPE_VEC_STRING),
                ...Bcs.getInstance().ser(ValueType.TYPE_VEC_STRING, data.data)]);
            break;
        default:
            ERROR(Errors.Fail, `SerRepositoryTypeData invalid type: ${data}`);
    }
};
//# sourceMappingURL=repository.js.map