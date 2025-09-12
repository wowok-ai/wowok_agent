import { TransactionBlock, PassportObject, Errors, ERROR, Permission, PermissionIndex, 
    PermissionIndexType, Repository,  Repository_Policy_Mode, Repository_Value as Wowok_Repository_Value,
    PermissionObject, uint2address, IsValidU256, ValueType, Repository_Policy, Repository_Value2,
    RepositoryValueType, Bcs,
    IsValidAddress
} from 'wowok';
import { AccountOrMark_Address, CallBase, CallResult, GetAccountOrMark_Address, GetObjectExisted, GetObjectMain, GetObjectParam, ObjectMain, ObjectsOp, PassportPayloadValue, TypeNamedObjectWithPermission} from "./base.js";
import { LocalMark } from '../local/local.js';
import { ObjectRepository } from '../query/objects.js';

export interface RepositoryNumber {
    type: RepositoryValueType.PositiveNumber,
    data: string | number | bigint;
    bcsBytes?: Uint8Array;
}
export interface RepositoryString {
    type: RepositoryValueType.String,
    data: string ;
    bcsBytes?: Uint8Array;
}
export interface RepositoryNumberVec {
    type: RepositoryValueType.PositiveNumber_Vec,
    data: (string | number | bigint)[];
    bcsBytes?: Uint8Array;
}
export interface RepositoryStringVec {
    type: RepositoryValueType.String_Vec,
    data: string[];
    bcsBytes?: Uint8Array;
}
export interface RepositoryAddress {
    type: RepositoryValueType.Address,
    data: AddressID,
    bcsBytes?: Uint8Array;
}
export interface RepositoryAddressVec {
    type: RepositoryValueType.Address_Vec,
    data: AddressID[];
    bcsBytes?: Uint8Array;
}
export interface RepositoryBool {
    type: RepositoryValueType.Bool,
    data: boolean ;
    bcsBytes?: Uint8Array;
}

export type RepositoryTypeData = RepositoryNumber | RepositoryString | RepositoryNumberVec | RepositoryStringVec | RepositoryAddress | RepositoryAddressVec | RepositoryBool;

// Account name, or local mark name, or address, or u256 number|bigint(eg. time number) that can be converted to address.
export type AddressID = AccountOrMark_Address | number | bigint; 

export const GetAddressID = async(key:AddressID) : Promise<string | undefined> =>{
    if (typeof(key) === 'number' || typeof(key) === 'bigint')  {
        if (IsValidU256(key)) {
            return uint2address(key);
        }
    } else {
        return await GetAccountOrMark_Address(key)
    }
}

export interface AddData_byKey_Data {
    address: AddressID; // UID: address or objectid
    address_string?: string;
    data: RepositoryTypeData;
}

export interface AddData_byKey {
    key: string;
    data: AddData_byKey_Data[];  
}

export interface AddData_byAddress_Data {
    key: string;
    data: RepositoryTypeData;
}

export interface AddData_byAddress {
    address: AddressID;
    address_string?: string;
    data: AddData_byAddress_Data[];
}

export interface RemoveData {
    key: string;
    address: AddressID;
    address_string?: string;
}

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallRepository_Data {
    object?: ObjectMain;
    data?: {op:'add_by_key'; data: AddData_byKey} | {op:'add_by_address', data: AddData_byAddress} | {op:'remove', data: RemoveData[]};

    description?: string;
    reference?: ObjectsOp;
    mode?: Repository_Policy_Mode; // default: 'Relax' (POLICY_MODE_FREE) 
    policy?: {op:'add' | 'set'; data:Repository_Policy[]} | {op:'remove'; keys:string[]} | {op:'removeall'} | {op:'rename'; data:{old:string; new:string}[]};
    guard?:string | null;
}

export class CallRepository extends CallBase {
    data: CallRepository_Data;
    object_address: string | undefined = undefined;
    permission_address: string | undefined = undefined;

    constructor(data:CallRepository_Data) {
        super();
        this.data = data;
    }

    protected async prepare(): Promise<void> {
        if (!this.object_address) {
            this.object_address = (await LocalMark.Instance().get_address(GetObjectExisted(this.data.object)));           
        }
        if (this.object_address) {
            await this.update_content('Repository', this.object_address);
            if (!this.content) ERROR(Errors.InvalidParam, 'CallRepository_Data.data.object:' + this.object_address);
            this.permission_address = (this.content as ObjectRepository).permission;
        } else {
            const n = GetObjectMain(this.data?.object) as TypeNamedObjectWithPermission; 
            this.permission_address = (await LocalMark.Instance().get_address(GetObjectExisted(n?.permission)));
        }
    }
    
    private resolve_by_key = async (d:AddData_byKey, policy?:Repository_Policy) => {
        for (let i=0; i<d.data.length; ++i) {
            const data = d.data[i];
            if (policy && data.data.type !== policy.dataType) {
                ERROR(Errors.InvalidParam, `CallRepository_Data.data.add_by_key ${d.key} data type not match`)
            }
            const addr = await GetAddressID(data.address);
            if (!addr) ERROR(Errors.InvalidParam,  `CallRepository_Data.data.add_by_key ${d.key} address not valid`)
            data.address_string = addr;
            await SerRepositoryTypeData(data.data);
        }
    }

    async call(account?:string) : Promise<CallResult>   {
        const perms : PermissionIndexType[] = []; 
        const guards: string[] = []; 
        const add_perm = (index:PermissionIndex) => {
            if (this.permission_address && !perms.includes(index)) {
                perms.push(index);
            }
        }

        await this.prepare(); 
        if (!this.object_address) {
            add_perm(PermissionIndex.repository)
        }
        if (this.data?.description != null && this.object_address) {
            add_perm(PermissionIndex.repository_description)
        }
        if (this.data?.mode != null && this.object_address) {
            add_perm(PermissionIndex.repository_mode)
        }
        if (this.data?.reference != null) {
            add_perm(PermissionIndex.repository_reference)
        }
        if (this.data?.policy != null) {
            add_perm(PermissionIndex.repository_policies)
        }
        if (this.data.guard !== undefined) {
            add_perm(PermissionIndex.repository_guard);
        }

        if (this.data?.data != null) {
            // check policy & mode 
            const policy = (this.content as ObjectRepository)?.policy;
            const mode = (this.content as ObjectRepository)?.policy_mode;
            if ((this.data.data as any)?.op === 'add_by_key') {
                const d = this.data.data.data as AddData_byKey;
                const p = policy?.find((v)=>v.key === d.key);
                if (p) {
                    if (p.permissionIndex != null) {
                        add_perm(p.permissionIndex); // permission check
                    } 
                    if (p?.guard) {
                        if (!IsValidAddress(p?.guard)) ERROR(Errors.IsValidAddress, `guard ${p}`)
                        guards.push(p.guard);
                    }
                    await this.resolve_by_key(d, p);
                } else {
                    if (mode === Repository_Policy_Mode.POLICY_MODE_STRICT) {
                        ERROR(Errors.Fail, `CallRepository_Data.data.add_by_key ${d.key} policy not match on the POLICY_MODE_STRICT mode.`)
                    }
                    await this.resolve_by_key(d);
                }
            } else if (this.data.data.op === 'add_by_address') {
                const d = this.data.data.data as AddData_byAddress;
                const addr = await GetAddressID(d.address);
                if (!addr) ERROR(Errors.InvalidParam,  `CallRepository_Data.data.add_by_address ${d.address} address not valid`);
                d.address_string = addr;

                for (let i=0; i<d.data.length; ++i) {
                    const value = d.data[i];
                    const p = policy?.find((v)=>v.key === value.key);
                    if (p) {
                        if (p.permissionIndex != null) {
                            add_perm(p.permissionIndex); // permission check
                        } 
                        if (p?.guard) {
                            if (!IsValidAddress(p?.guard)) ERROR(Errors.IsValidAddress, `guard ${p}`)
                            guards.push(p.guard);
                        }
                    } else {
                        if (mode === Repository_Policy_Mode.POLICY_MODE_STRICT) {
                            ERROR(Errors.Fail, `CallRepository_Data.data.add_by_address: ${value.key} policy not match on the POLICY_MODE_STRICT mode.`)
                        }
                    }
                    await SerRepositoryTypeData(value.data);
                }
            } else if (this.data.data.op === 'remove') {
                const d = this.data.data.data as RemoveData[];
                for (let i=0; i<d.length; ++i) {
                    const value = d[i];
                    const p = policy.find((v)=>v.key === value.key);
                    if (p) {
                        if (p.permissionIndex != null && !perms.includes(p.permissionIndex)) {
                            add_perm(p.permissionIndex); // permission check
                        } 
                        if (p?.guard) {
                            if (!IsValidAddress(p?.guard)) ERROR(Errors.IsValidAddress, `guard ${p}`)
                            guards.push(p.guard);
                        }
                    } else {
                        if (mode === Repository_Policy_Mode.POLICY_MODE_STRICT) {
                            ERROR(Errors.Fail, `CallRepository_Data.data.remove: ${value.key} policy not match on the POLICY_MODE_STRICT mode.`)
                        }
                    }
                    const addr = await GetAddressID(value.address);
                    if (!addr) ERROR(Errors.InvalidParam,  `CallRepository_Data.data.remove ${value.address} address not valid`);
                    value.address_string = addr;
                }
            } 
        }

        if (this.permission_address || guards.length > 0) {
            return await this.check_permission_and_call(this.permission_address, perms, [...guards], undefined, undefined, undefined, account)
        }
        return await this.exec(account);
    }

    protected async operate(txb:TransactionBlock, passport?:PassportObject, payload?:PassportPayloadValue[], account?:string) {
        let obj : Repository | undefined ; let perm: Permission | undefined;
        let permission : PermissionObject | undefined;

        if (this.object_address) {
            obj = Repository.From(txb, this.permission_address!, this.object_address);
            permission = this.permission_address;
        } else {
            const n = GetObjectMain(this.data?.object) as TypeNamedObjectWithPermission;
            permission = await LocalMark.Instance().get_address(GetObjectExisted(n?.permission));
            if (!permission) {
                perm = Permission.New(txb, GetObjectParam(n?.permission)?.description ?? '');
                permission =  perm.get_object();
            }

            obj = Repository.New(txb, permission, this.data?.description??'', 
                this.data.mode, perm?undefined:passport);
        }

        if (!obj) ERROR(Errors.InvalidParam, 'CallRepository_Data.object:' + this.object_address);
        if (!permission) ERROR(Errors.InvalidParam, 'CallRepository_Data.permission:' + this.permission_address);

        const pst = perm?undefined:passport;
        if (this.data?.data != null) {
            if (this.data.data.op === 'add_by_key') {
                const d = this.data.data.data as AddData_byKey;
                obj.add_data({key:d.key, data:d.data.map(v => {
                    return {address:v.address_string!, bcsBytes:v.data.bcsBytes!}
                })}, pst);
            } else if (this.data.data.op === 'add_by_address') {
                const d = this.data.data.data as AddData_byAddress;
                obj.add_data2({address:d.address_string!, data:d.data.map(v => {
                    return {key:v.key, bcsBytes:v.data.bcsBytes!}
                })}, pst);
            } else if (this.data.data.op === 'remove') {
                const d = this.data.data.data as RemoveData[];
                for (let i=0; i<d.length; ++i) {
                    const value = d[i];
                    obj?.remove(value.address_string!, value.key, pst);
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
                    if (this.data.reference.op === 'set') obj?.remove_reference([], true, pst);
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
            obj?.set_policy_mode(this.data.mode, pst)
        }
        if (this.data?.policy != null) {
            switch(this.data.policy.op) {
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
                    })
                    break;
            }
        }

        if (this.data?.guard !== undefined) {
            if (this.data.guard === null) {
                obj?.set_guard(undefined, pst);
            } else {
                const guard = await LocalMark.Instance().get_address(this.data.guard);
                if (!guard) ERROR(Errors.InvalidParam, `CallRepository_Data.data.guard: ${this.data.guard} invalid`);
                obj?.set_guard(guard, pst);
            }
        }

        if (perm) {
            const n = GetObjectMain(this.data?.object) as TypeNamedObjectWithPermission;
            await this.new_with_mark('Permission', txb, perm.launch(), GetObjectParam(n?.permission), account);
        }
        if (!this.object_address) {
            await this.new_with_mark('Repository', txb, obj.launch(), GetObjectMain(this.data?.object), account);
        }
    }
}

const SerRepositoryTypeData = async (data: RepositoryTypeData) => {
    switch(data.type) {
        case RepositoryValueType.Address:
            const addr = await GetAddressID(data.data);
            if (!addr) ERROR(Errors.Fail, `SerRepositoryTypeData Address: ${data.data}`)
            data.bcsBytes = new Uint8Array([...Bcs.getInstance().ser(ValueType.TYPE_U8, ValueType.TYPE_ADDRESS),
                    ...Bcs.getInstance().ser(ValueType.TYPE_ADDRESS, addr)]);
            break;
        case RepositoryValueType.Address_Vec:
            const addrs = [];
            for (let i=0; i<data.data.length; ++i) {
                const addr = await GetAddressID(data.data[i]);
                if (!addr) ERROR(Errors.Fail, `SerRepositoryTypeData Address_Vec: ${data.data[i]}`)
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
            if (!type) ERROR(Errors.Fail, `SerRepositoryTypeData PositiveNumber: ${data.data}`)
            data.bcsBytes = new Uint8Array([...Bcs.getInstance().ser(ValueType.TYPE_U8, type),
                    ...Bcs.getInstance().ser(type, data.data)]);
            break;
        } case RepositoryValueType.PositiveNumber_Vec: {
            let type = ValueType.TYPE_U8;
            for (let i=0; i<data.data.length; ++i) {
                const t = Repository.DataType2ValueType(data.data[i]);
                if (!t) ERROR(Errors.Fail, `SerRepositoryTypeData PositiveNumber_Vec: ${data.data[i]}`)
                if (t! > type) type = t!;
            }

            if (type === ValueType.TYPE_U8) { 
                type  = ValueType.TYPE_VEC_U8;
            } else if (type === ValueType.TYPE_U64) {
                type = ValueType.TYPE_VEC_U64;
            } else if (type === ValueType.TYPE_U128) {
                type = ValueType.TYPE_VEC_U128;
            } else {
                type = ValueType.TYPE_VEC_U256;
            }
            data.bcsBytes = new Uint8Array([...Bcs.getInstance().ser(ValueType.TYPE_U8, type),
                    ...Bcs.getInstance().ser(type, data.data)]);
            break;
        } case RepositoryValueType.String:
            data.bcsBytes = new Uint8Array([...Bcs.getInstance().ser(ValueType.TYPE_U8, ValueType.TYPE_STRING),
                    ...Bcs.getInstance().ser(ValueType.TYPE_STRING, data.data)]);
            break;
        case RepositoryValueType.String_Vec:
            data.bcsBytes = new Uint8Array([...Bcs.getInstance().ser(ValueType.TYPE_U8, ValueType.TYPE_VEC_STRING),
                    ...Bcs.getInstance().ser(ValueType.TYPE_VEC_STRING, data.data)]);
            break;
        default:
            ERROR(Errors.Fail, `SerRepositoryTypeData invalid type: ${data}`)
    }
}
