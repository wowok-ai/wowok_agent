import { TransactionBlock, CallResponse, Resource, ResourceObject} from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Permission, PermissionIndex, PermissionIndexType, Repository,
    Repository_Policy, Repository_Policy_Data, Repository_Policy_Data2, Repository_Policy_Data_Remove,
    Repository_Policy_Mode, WitnessFill
} from 'wowok';
import { CallBase, CallResult, Namedbject} from "./base";

export interface CallRepository_Data {
    object?: {address:string} | {namedNew: Namedbject}; // undefined or {named_new...} for creating a new object
    permission?: {address:string} | {namedNew: Namedbject, description?:string}; 
    description?: string;
    mode?: Repository_Policy_Mode; // default: 'Relax' (POLICY_MODE_FREE) 
    reference?: {op:'set' | 'add' | 'remove' ; addresses:string[]} | {op:'removeall'};
    policy?: {op:'add' | 'set'; data:Repository_Policy[]} | {op:'remove'; data:string[]} | {op:'removeall'} | {op:'rename'; data:{old:string; new:string}[]};
    data?: {op:'add', data: Repository_Policy_Data | Repository_Policy_Data2} | {op:'remove'; data: Repository_Policy_Data_Remove};
}
export class CallRepository extends CallBase {
    data: CallRepository_Data;
    constructor(data:CallRepository_Data) {
        super();
        this.data = data;
    }

    async call(account?:string) : Promise<CallResult>   {
        var checkOwner = false;
        const perms : PermissionIndexType[] = []; 
        const permission_address = (this.data?.permission as any)?.address;
        const object_address = (this.data?.object as any)?.address;

        if (permission_address && IsValidAddress(permission_address)) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.repository)
            }
            if (this.data?.description !== undefined && object_address) {
                perms.push(PermissionIndex.repository_description)
            }
            if (this.data?.mode !== undefined && object_address) {
                perms.push(PermissionIndex.repository_mode)
            }
            if (this.data?.reference !== undefined) {
                perms.push(PermissionIndex.repository_reference)
            }
            if (this.data?.policy !== undefined) {
                perms.push(PermissionIndex.repository_policies)
            }
            return await this.check_permission_and_call(permission_address, perms, [], checkOwner, undefined, account)
        }
        return await this.exec(account);
    }

    protected async operate(txb:TransactionBlock, passport?:PassportObject, account?:string) {
        let obj : Repository | undefined ; let permission: any;
        const permission_address = (this.data?.permission as any)?.address;
        const object_address = (this.data?.object as any)?.address;

        if (!object_address) {
            if (!permission_address || !IsValidAddress(permission_address)) {
                const d = (this.data?.permission as any)?.description ?? '';
                permission = Permission.New(txb, d);
            }
            
            obj = Repository.New(txb, permission ? permission.get_object() : permission_address, this.data?.description??'', this.data?.mode, permission?undefined:passport)
        } else {
            if (IsValidAddress(object_address) && this.data.permission && IsValidAddress(permission_address)) {
                obj = Repository.From(txb, permission_address, object_address)
            } else {
                ERROR(Errors.InvalidParam, 'object or permission address invalid.')
            }
        }

        if (obj) {
            if (this.data?.description !== undefined && object_address) {
                obj?.set_description(this.data.description, passport);
            }
            if (this.data?.reference !== undefined) {
                switch (this.data.reference.op) {
                    case 'set':
                        obj?.remove_reference([], true, passport);
                        obj?.add_reference(this.data.reference.addresses, passport);
                        break;
                    case 'add':
                        obj?.add_reference(this.data.reference.addresses, passport);
                        break;
                    case 'remove':
                        obj?.remove_reference(this.data.reference.addresses, false, passport);
                        break;
                    case 'removeall':
                        obj?.remove_reference([], true, passport);
                        break;
                }
            }
            if (this.data?.data !== undefined) {
                switch(this.data.data.op) {
                    case 'add':
                        if ((this.data.data?.data as any)?.key !== undefined) {
                            obj?.add_data(this.data.data.data as Repository_Policy_Data);
                        } else if ((this.data.data?.data as any)?.address !== undefined) {
                            obj?.add_data2(this.data.data.data as Repository_Policy_Data2);
                        }
                        break;
                    case 'remove':
                        obj?.remove(this.data.data.data.address, this.data.data.data.key);
                        break;
                }
            }
            if (this.data?.policy !== undefined) {
                switch(this.data.policy.op) {
                    case 'set':
                        obj?.remove_policies([], true, passport);
                        obj?.add_policies(this.data.policy.data, passport);
                        break;
                    case 'add':
                        obj?.add_policies(this.data.policy.data, passport);
                        break;
                    case 'remove':
                        obj?.remove_policies(this.data.policy.data, false, passport);
                        break;
                    case 'removeall':
                        obj?.remove_policies([], true, passport);
                        break;
                    case 'rename':
                        this.data.policy.data.forEach((v) => {
                            obj?.rename_policy(v.old, v.new, passport);
                        })
                        break;
                }
            }
            if (this.data?.mode !== undefined && object_address) { //@ priority??
                obj?.set_policy_mode(this.data.mode, passport)
            }
            if (permission) {
                await this.new_with_mark(txb, permission.launch(), (this.data?.permission as any)?.namedNew, account);
            }
            if (!this.data.object) {
                await this.new_with_mark(txb, obj.launch(), (this.data?.object as any)?.namedNew, account);
            }
        }
    };
}
