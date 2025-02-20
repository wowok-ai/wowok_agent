import { TransactionBlock, CallResponse} from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Permission, PermissionIndex, PermissionIndexType, Repository,
    Repository_Policy, Repository_Policy_Data, Repository_Policy_Data2, Repository_Policy_Data_Remove,
    Repository_Policy_Mode, WitnessFill
} from 'wowok';
import { CallBase, CallResult} from "./base";

export interface CallRepository_Data {
    object?: string; // undefined for creating a new object
    permission?: string; 
    permission_new?: string; // change permission 
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

        if (this.data?.permission && IsValidAddress(this.data.permission)) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.repository)
            }
            if (this.data?.permission_new !== undefined) {
                checkOwner = true;
            }
            if (this.data?.description !== undefined && this.data?.object) {
                perms.push(PermissionIndex.repository_description)
            }
            if (this.data?.mode !== undefined && this.data?.object) {
                perms.push(PermissionIndex.repository_mode)
            }
            if (this.data?.reference !== undefined) {
                perms.push(PermissionIndex.repository_reference)
            }
            if (this.data?.policy !== undefined) {
                perms.push(PermissionIndex.repository_policies)
            }
            return await this.check_permission_and_call(this.data.permission, perms, [], checkOwner, undefined, account)
        }
        return this.exec(account);
    }

    protected async operate(txb:TransactionBlock, passport?:PassportObject) {
        let obj : Repository | undefined ; let permission: any;
        if (!this.data.object) {
            if (!this.data?.permission || !IsValidAddress(this.data?.permission)) {
                permission = Permission.New(txb, '');
            }
            
            obj = Repository.New(txb, permission ?? this.data?.permission, this.data?.description??'', this.data?.mode, permission?undefined:passport)
        } else {
            if (IsValidAddress(this.data.object) && this.data.permission && IsValidAddress(this.data?.permission)) {
                obj = Repository.From(txb, this.data.permission, this.data.object)
            }
        }

        if (obj) {
            if (this.data?.description !== undefined && this.data.object) {
                obj?.set_description(this.data.description, passport);
            }
            if (this.data?.mode !== undefined && this.data.object) {
                obj?.set_policy_mode(this.data.mode, passport)
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
            if (this.data?.permission_new !== undefined ) {
                obj?.change_permission(this.data.permission_new);
            }
            if (permission) {
                permission.launch();
            }
            if (!this.data.object) {
                obj?.launch();
            }
        }
    };
}
