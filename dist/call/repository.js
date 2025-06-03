import { Errors, ERROR, Permission, PermissionIndex, Repository, } from 'wowok';
import { CallBase, GetObjectExisted, GetObjectMain, GetObjectParam } from "./base.js";
import { LocalMark } from '../local/local.js';
export class CallRepository extends CallBase {
    constructor(data) {
        super();
        this.object_address = undefined;
        this.permission_address = undefined;
        this.data = data;
    }
    async prepare() {
        if (!this.object_address) {
            this.object_address = (await LocalMark.Instance().get(GetObjectExisted(this.data?.object)))?.address;
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
    }
    async call(account) {
        var checkOwner = false;
        const perms = [];
        await this.prepare();
        if (this.permission_address) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.repository);
            }
            if (this.data?.description !== undefined && this.object_address) {
                perms.push(PermissionIndex.repository_description);
            }
            if (this.data?.mode !== undefined && this.object_address) {
                perms.push(PermissionIndex.repository_mode);
            }
            if (this.data?.reference !== undefined) {
                perms.push(PermissionIndex.repository_reference);
            }
            if (this.data?.policy !== undefined) {
                perms.push(PermissionIndex.repository_policies);
            }
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
        if (this.data?.description !== undefined && this.object_address) {
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
        if (this.data?.mode !== undefined && this.object_address) { //@ priority??
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
                        const d = this.data.data.data.data;
                        const add = [];
                        for (let i = 0; i < d.length; ++i) {
                            const addr = await LocalMark.Instance().get_address(d[i].address);
                            if (addr) {
                                add.push({ address: addr, bcsBytes: d[i].bcsBytes });
                            }
                        }
                        obj?.add_data({ key: this.data.data.data.key, data: add, value_type: this.data.data.data.value_type });
                    }
                    else if (this.data.data?.data?.address !== undefined) {
                        const d = this.data.data.data;
                        const addr = await LocalMark.Instance().get_address(d.address);
                        if (addr) {
                            obj?.add_data2({ address: addr, data: d.data, value_type: d.value_type });
                        }
                    }
                    break;
                case 'remove':
                    for (let i = 0; i < this.data.data.data.length; ++i) {
                        const addr = await LocalMark.Instance().get_address(this.data.data.data[i].address);
                        if (addr) {
                            obj?.remove(addr, this.data.data.data[i].key);
                        }
                    }
                    break;
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
//# sourceMappingURL=repository.js.map