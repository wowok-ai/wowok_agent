import { TransactionBlock, CallResponse} from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Permission, PermissionIndex, PermissionIndexType, Repository,
    Repository_Policy, Repository_Policy_Data, Repository_Policy_Data2, Repository_Policy_Data_Remove,
    Repository_Policy_Mode, WitnessFill
} from 'wowok';
import { CallBase } from "./call";

export class CallRepository extends CallBase {
    permission_new?: string; // change permission or 'new' object with permission specified.
    description?: string;
    mode?: Repository_Policy_Mode; // default: 'Relax' (POLICY_MODE_FREE) 
    reference?: {op:'set' | 'add' | 'remove' ; addresses:string[]} | {op:'removeall'};
    policy?: {op:'add' | 'set'; data:Repository_Policy[]} | {op:'remove'; data:string[]} | {op:'removeall'} | {op:'rename'; data:{old:string; new:string}[]};
    data?: {op:'add', data: Repository_Policy_Data | Repository_Policy_Data2} | {op:'remove'; data: Repository_Policy_Data_Remove};
    constructor(object: string | 'new' = 'new') { super(object) }
    async call(account?:string) : Promise<WitnessFill[] | CallResponse | undefined>   {
        var checkOwner = false;
        const perms : PermissionIndexType[] = []; 

        if (this?.permission && IsValidAddress(this.permission)) {
            if (this?.object === 'new') {
                perms.push(PermissionIndex.repository)
            }
            if (this?.permission_new !== undefined) {
                checkOwner = true;
            }
            if (this?.description !== undefined && this?.object !== 'new') {
                perms.push(PermissionIndex.repository_description)
            }
            if (this?.mode !== undefined && this?.object !== 'new') {
                perms.push(PermissionIndex.repository_mode)
            }
            if (this?.reference !== undefined) {
                perms.push(PermissionIndex.repository_reference)
            }
            if (this?.policy !== undefined) {
                perms.push(PermissionIndex.repository_policies)
            }
            return await this.check_permission_and_call(this.permission, perms, [], checkOwner, undefined, account)
        }
        return this.exec(account);
    }

    protected async operate(txb:TransactionBlock, passport?:PassportObject) {
        let obj : Repository | undefined ; let permission: any;
        if (this.object === 'new') {
            if (!this?.permission || !IsValidAddress(this?.permission)) {
                permission = Permission.New(txb, '');
            }
            
            obj = Repository.New(txb, permission ?? this?.permission, this?.description??'', this?.mode, permission?undefined:passport)
        } else {
            if (IsValidAddress(this.object) && this.permission && IsValidAddress(this?.permission)) {
                obj = Repository.From(txb, this.permission, this.object)
            }
        }

        if (obj) {
            if (this?.description !== undefined && this.object !== 'new') {
                obj?.set_description(this.description, passport);
            }
            if (this?.mode !== undefined && this.object !== 'new') {
                obj?.set_policy_mode(this.mode, passport)
            }
            if (this?.reference !== undefined) {
                switch (this.reference.op) {
                    case 'set':
                        obj?.remove_reference([], true, passport);
                        obj?.add_reference(this.reference.addresses, passport);
                        break;
                    case 'add':
                        obj?.add_reference(this.reference.addresses, passport);
                        break;
                    case 'remove':
                        obj?.remove_reference(this.reference.addresses, false, passport);
                        break;
                    case 'removeall':
                        obj?.remove_reference([], true, passport);
                        break;
                }
            }
            if (this?.policy !== undefined) {
                switch(this.policy.op) {
                    case 'set':
                        obj?.remove_policies([], true, passport);
                        obj?.add_policies(this.policy.data, passport);
                        break;
                    case 'add':
                        obj?.add_policies(this.policy.data, passport);
                        break;
                    case 'remove':
                        obj?.remove_policies(this.policy.data, false, passport);
                        break;
                    case 'removeall':
                        obj?.remove_policies([], true, passport);
                        break;
                    case 'rename':
                        this.policy.data.forEach((v) => {
                            obj?.rename_policy(v.old, v.new, passport);
                        })
                        break;
                }
            }
            if (this?.data !== undefined) {
                switch(this.data.op) {
                    case 'add':
                        if ((this.data?.data as any)?.key !== undefined) {
                            obj?.add_data(this.data.data as Repository_Policy_Data);
                        } else if ((this.data?.data as any)?.address !== undefined) {
                            obj?.add_data2(this.data.data as Repository_Policy_Data2);
                        }
                        break;
                    case 'remove':
                        obj?.remove(this.data.data.address, this.data.data.key);
                        break;
                }
            }
            if (this?.permission_new !== undefined ) {
                obj?.change_permission(this.permission_new);
            }
            if (permission) {
                permission.launch();
            }
            if (this.object === 'new') {
                obj?.launch();
            }
        }
    };
}
