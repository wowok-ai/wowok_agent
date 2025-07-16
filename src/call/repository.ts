import { TransactionBlock, PassportObject, Errors, ERROR, Permission, PermissionIndex, 
    PermissionIndexType, Repository,  Repository_Policy_Mode, Repository_Value as Wowok_Repository_Value,
    PermissionObject, uint2address, IsValidU256, ValueType, Repository_Policy, Repository_Value2,
} from 'wowok';
import { AccountOrMark_Address, CallBase, CallResult, GetAccountOrMark_Address, GetObjectExisted, GetObjectMain, GetObjectParam, ObjectMain, ObjectsOp, TypeNamedObjectWithPermission} from "./base.js";
import { LocalMark } from '../local/local.js';
import { ObjectRepository } from '../query/objects.js';


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

export interface Repository_Value {
    address: AddressID; // UID: address or objectid
    bcsBytes: Uint8Array; // BCS contents. Notice that: First Byte be the Type by caller, or specify type with 'Repository_Policy_Data.value_type' field.
}
export interface Repository_Policy_Data {
    key: string;
    data: Repository_Value[];  
    value_type?: ValueType; // Specifies a data type prefix; If the data prefix is already included in the data byte stream, there is no need to specify it.
}
export interface Repository_Policy_Data2 {
    address: AddressID;
    data: Repository_Value2[];
    value_type?: ValueType;
}
export interface Repository_Policy_Data_Remove {
    key: string;
    address: AddressID;
}

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallRepository_Data {
    object?: ObjectMain;
    description?: string;
    reference?: ObjectsOp;
    mode?: Repository_Policy_Mode; // default: 'Relax' (POLICY_MODE_FREE) 
    policy?: {op:'add' | 'set'; data:Repository_Policy[]} | {op:'remove'; keys:string[]} | {op:'removeall'} | {op:'rename'; data:{old:string; new:string}[]};
    data?: {op:'add', data: Repository_Policy_Data | Repository_Policy_Data2} | {op:'remove'; data: Repository_Policy_Data_Remove[]};
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
            this.object_address = (await LocalMark.Instance().get(GetObjectExisted(this.data?.object)))?.address;            
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
    async call(account?:string) : Promise<CallResult>   {
        var checkOwner = false;
        const perms : PermissionIndexType[] = []; 

        await this.prepare();
        if (this.permission_address) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.repository)
            }
            if (this.data?.description != null && this.object_address) {
                perms.push(PermissionIndex.repository_description)
            }
            if (this.data?.mode != null && this.object_address) {
                perms.push(PermissionIndex.repository_mode)
            }
            if (this.data?.reference != null) {
                perms.push(PermissionIndex.repository_reference)
            }
            if (this.data?.policy != null) {
                perms.push(PermissionIndex.repository_policies)
            }
            return await this.check_permission_and_call(this.permission_address, perms, [], checkOwner, undefined, account)
        }
        return await this.exec(account);
    }

    protected async operate(txb:TransactionBlock, passport?:PassportObject, account?:string) {
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
            switch(this.data.data.op) {
                case 'add':
                    if ((this.data.data?.data as any)?.key != null) {
                        const d = (this.data.data.data as Repository_Policy_Data).data;
                        const add: Wowok_Repository_Value[] = [];
                        for (let i=0; i<d.length; ++i) {
                            const addr = await GetAddressID(d[i].address);
                            if (addr) {
                                add.push({address:addr, bcsBytes:d[i].bcsBytes});
                            }
                        }
                        obj?.add_data({key:(this.data.data.data as Repository_Policy_Data).key, data:add, value_type:(this.data.data.data as Repository_Policy_Data).value_type});
                    } else if ((this.data.data?.data as any)?.address != null) {
                        const d = this.data.data.data as Repository_Policy_Data2;
                        const addr = await GetAddressID(d.address);
                        if (addr) {
                            obj?.add_data2({address:addr, data:d.data, value_type:d.value_type})
                        }
                    }
                    break;
                case 'remove':
                    for (let i=0; i<this.data.data.data.length; ++i) {
                        const addr = await GetAddressID(this.data.data.data[i].address);
                        if (addr) {
                            obj?.remove(addr, this.data.data.data[i].key);
                        }
                    }
                    break;
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

        if (perm) {
            const n = GetObjectMain(this.data?.object) as TypeNamedObjectWithPermission;
            await this.new_with_mark('Permission', txb, perm.launch(), GetObjectParam(n?.permission), account);
        }
        if (!this.object_address) {
            await this.new_with_mark('Repository', txb, obj.launch(), GetObjectMain(this.data?.object), account);
        }
    }
}
