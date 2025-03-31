import { IsValidAddress, Errors, ERROR, Permission, PermissionIndex, Repository, } from 'wowok';
import { CallBase } from "./base";
export class CallRepository extends CallBase {
    data;
    constructor(data) {
        super();
        this.data = data;
    }
    async call(account) {
        var checkOwner = false;
        const perms = [];
        const permission_address = this.data?.permission?.address;
        const object_address = this.data?.object?.address;
        if (permission_address && IsValidAddress(permission_address)) {
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
        const permission_address = this.data?.permission?.address;
        const object_address = this.data?.object?.address;
        if (!object_address) {
            if (!permission_address || !IsValidAddress(permission_address)) {
                const d = this.data?.permission?.description ?? '';
                permission = Permission.New(txb, d);
            }
            obj = Repository.New(txb, permission ? permission.get_object() : permission_address, this.data?.description ?? '', this.data?.mode, permission ? undefined : passport);
        }
        else {
            if (IsValidAddress(object_address) && this.data.permission && IsValidAddress(permission_address)) {
                obj = Repository.From(txb, permission_address, object_address);
            }
            else {
                ERROR(Errors.InvalidParam, 'object or permission address invalid.');
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
                        obj?.remove_reference([], true, pst);
                        obj?.add_reference(this.data.reference.addresses, pst);
                        break;
                    case 'add':
                        obj?.add_reference(this.data.reference.addresses, pst);
                        break;
                    case 'remove':
                        obj?.remove_reference(this.data.reference.addresses, false, pst);
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
                        obj?.remove_policies(this.data.policy.data, false, pst);
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
                        obj?.remove(this.data.data.data.address, this.data.data.data.key);
                        break;
                }
            }
            if (permission) {
                await this.new_with_mark(txb, permission.launch(), this.data?.permission?.namedNew, account);
            }
            if (!this.data.object) {
                await this.new_with_mark(txb, obj.launch(), this.data?.object?.namedNew, account);
            }
        }
    }
    ;
}
