import { Errors, ERROR, Permission, PermissionIndex, Repository, } from 'wowok';
import { CallBase } from "./base.js";
import { LocalMark } from '../local/local.js';
export class CallRepository extends CallBase {
    constructor(data) {
        super();
        this.data = data;
    }
    async call(account) {
        var checkOwner = false;
        const perms = [];
        var [permission_address, object_address] = await LocalMark.Instance().get_many_address([this.data?.permission?.address,
            this.data?.object?.address]);
        if (object_address) {
            if (!permission_address) {
                await this.update_content(object_address, 'Repository');
                if (this.content) {
                    permission_address = this.content.permission;
                }
            }
        }
        if (permission_address) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.repository);
            }
            if (this.data?.description !== undefined && object_address) {
                perms.push(PermissionIndex.repository_description);
            }
            if (this.data?.mode !== undefined && object_address) {
                perms.push(PermissionIndex.repository_mode);
            }
            if (this.data?.reference !== undefined) {
                perms.push(PermissionIndex.repository_reference);
            }
            if (this.data?.policy !== undefined) {
                perms.push(PermissionIndex.repository_policies);
            }
            return await this.check_permission_and_call(permission_address, perms, [], checkOwner, undefined, account);
        }
        return await this.exec(account);
    }
    async operate(txb, passport, account) {
        let obj;
        let permission;
        var [permission_address, object_address] = this?.content ?
            [this.content.permission, this.content.object] :
            await LocalMark.Instance().get_many_address([this.data?.permission?.address,
                this.data?.object?.address]);
        if (!object_address) {
            if (!permission_address) {
                const d = this.data?.permission?.description ?? '';
                permission = Permission.New(txb, d);
            }
            obj = Repository.New(txb, permission ? permission.get_object() : permission_address, this.data?.description ?? '', this.data?.mode, permission ? undefined : passport);
        }
        else {
            if (permission_address) {
                obj = Repository.From(txb, permission_address, object_address);
            }
            else {
                ERROR(Errors.InvalidParam, 'CallRepository_Data.data.permission');
            }
        }
        if (obj) {
            const pst = permission ? undefined : passport;
            if (this.data?.description !== undefined && object_address) {
                obj?.set_description(this.data.description, pst);
            }
            if (this.data?.reference !== undefined) {
                switch (this.data.reference.op) {
                    case 'set':
                    case 'add':
                        if (this.data.reference.op === 'set')
                            obj?.remove_reference([], true, pst);
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
            if (this.data?.mode !== undefined && object_address) { //@ priority??
                obj?.set_policy_mode(this.data.mode, pst);
            }
            if (this.data?.policy !== undefined) {
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
            if (this.data?.data !== undefined) {
                switch (this.data.data.op) {
                    case 'add':
                        if (this.data.data?.data?.key !== undefined) {
                            obj?.add_data(this.data.data.data);
                        }
                        else if (this.data.data?.data?.address !== undefined) {
                            obj?.add_data2(this.data.data.data);
                        }
                        break;
                    case 'remove':
                        this.data.data.data.forEach(v => obj?.remove(v.address, v.key));
                        break;
                }
            }
            if (permission) {
                await this.new_with_mark('Permission', txb, permission.launch(), this.data?.permission?.namedNew, account);
            }
            if (!this.data.object) {
                await this.new_with_mark('Repository', txb, obj.launch(), this.data?.object?.namedNew, account);
            }
        }
    }
    ;
}
//# sourceMappingURL=repository.js.map