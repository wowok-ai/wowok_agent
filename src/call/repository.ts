import { TransactionBlock, PassportObject, Errors, ERROR, Permission, PermissionIndex, 
    PermissionIndexType, Repository, Repository_Policy, Repository_Policy_Data, Repository_Policy_Data2, 
    Repository_Policy_Data_Remove, Repository_Policy_Mode, Repository_Value, 
} from 'wowok';
import { CallBase, CallResult, GetObjectExisted, GetObjectMain, GetObjectParam, ObjectMain, TypeNamedObjectWithPermission} from "./base.js";
import { LocalMark } from '../local/local.js';
import { ObjectRepository } from '../query/objects.js';


/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallRepository_Data {
    object?: ObjectMain;
    description?: string;
    reference?: {op:'set' | 'add' | 'remove' ; addresses:string[]} | {op:'removeall'};
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

    async call(account?:string) : Promise<CallResult>   {
        var checkOwner = false;
        const perms : PermissionIndexType[] = []; 
        this.object_address = (await LocalMark.Instance().get(GetObjectExisted(this.data?.object)))?.address;
        if (this.object_address) {
            await this.update_content('Repository', this.object_address);
            if (!this.content) ERROR(Errors.InvalidParam, 'CallRepository_Data.data.object:' + this.object_address);
            this.permission_address = (this.content as ObjectRepository).permission;
        } else {
            const n = GetObjectMain(this.data?.object) as TypeNamedObjectWithPermission; 
            this.permission_address = (await LocalMark.Instance().get_address(GetObjectExisted(n?.permission)));
        }

        if (this.permission_address) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.repository)
            }
            if (this.data?.description !== undefined && this.object_address) {
                perms.push(PermissionIndex.repository_description)
            }
            if (this.data?.mode !== undefined && this.object_address) {
                perms.push(PermissionIndex.repository_mode)
            }
            if (this.data?.reference !== undefined) {
                perms.push(PermissionIndex.repository_reference)
            }
            if (this.data?.policy !== undefined) {
                perms.push(PermissionIndex.repository_policies)
            }
            return await this.check_permission_and_call(this.permission_address, perms, [], checkOwner, undefined, account)
        }
        return await this.exec(account);
    }

    protected async operate(txb:TransactionBlock, passport?:PassportObject, account?:string) {
        let obj : Repository | undefined ; let permission: any;
        if (this.object_address) {
            obj = Repository.From(txb, this.permission_address!, this.object_address);
        } else {
            const n = GetObjectMain(this.data?.object) as TypeNamedObjectWithPermission;
            if (!this.permission_address) {
                permission = Permission.New(txb, GetObjectParam(n?.permission)?.description ?? '');
            }

            obj = Repository.New(txb, permission ? permission.get_object() : this.permission_address, this.data?.description??'', 
                this.data.mode, permission?undefined:passport);
        }

        if (obj) {
            const pst = permission?undefined:passport;
            if (this.data?.description !== undefined && this.object_address) {
                obj?.set_description(this.data.description, pst);
            }
            if (this.data?.reference !== undefined) {
                switch (this.data.reference.op) {
                    case 'set':
                    case 'add':
                        if (this.data.reference.op === 'set') obj?.remove_reference([], true, pst);
                        obj?.add_reference(await LocalMark.Instance().get_many_address2(this.data.reference.addresses), pst);
                        break;
                    case 'remove':
                        obj?.remove_reference(await LocalMark.Instance().get_many_address2(this.data.reference.addresses), false, pst);
                        break;
                    case 'removeall':
                        obj?.remove_reference([], true, pst);
                        break;
                }
            }
            if (this.data?.mode !== undefined && this.object_address) { //@ priority??
                obj?.set_policy_mode(this.data.mode, pst)
            }
            if (this.data?.policy !== undefined) {
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
            if (this.data?.data !== undefined) {
                switch(this.data.data.op) {
                    case 'add':
                        if ((this.data.data?.data as any)?.key !== undefined) {
                            const d = (this.data.data.data as Repository_Policy_Data).data;
                            const add: Repository_Value[] = [];
                            for (let i=0; i<d.length; ++i) {
                                const addr = await LocalMark.Instance().get_address(d[i].address);
                                if (addr) {
                                    add.push({address:addr, bcsBytes:d[i].bcsBytes});
                                }
                            }
                            obj?.add_data({key:(this.data.data.data as Repository_Policy_Data).key, data:add, value_type:(this.data.data.data as Repository_Policy_Data).value_type});
                        } else if ((this.data.data?.data as any)?.address !== undefined) {
                            const d = this.data.data.data as Repository_Policy_Data2;
                            const addr = await LocalMark.Instance().get_address(d.address);
                            if (addr) {
                                obj?.add_data2({address:addr, data:d.data, value_type:d.value_type})
                            }
                        }
                        break;
                    case 'remove':
                        for (let i=0; i<this.data.data.data.length; ++i) {
                            const addr = await LocalMark.Instance().get_address(this.data.data.data[i].address);
                            if (addr) {
                                obj?.remove(addr, this.data.data.data[i].key);
                            }
                        }
                        break;
                }
            }

            if (permission) {
                const n = GetObjectMain(this.data?.object) as TypeNamedObjectWithPermission;
                await this.new_with_mark('Permission', txb, permission.launch(), GetObjectParam(n?.permission), account);
            }
            if (!this.object_address) {
                await this.new_with_mark('Repository', txb, obj.launch(), GetObjectMain(this.data?.object), account);
            }
        }
    };
}
