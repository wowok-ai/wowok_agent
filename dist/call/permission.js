import { LocalMark } from "../local/local.js";
import { CallBase, GetAccountOrMark_Address, GetManyAccountOrMark_Address, GetObjectExisted, GetObjectMain } from "./base.js";
import { Permission, ERROR, Errors, } from 'wowok';
export class CallPermission extends CallBase {
    constructor(data) {
        super();
        this.object_address = undefined;
        this.data = data;
    }
    async prepare() {
        if (!this.object_address) {
            this.object_address = await LocalMark.Instance().get_address(GetObjectExisted(this.data?.object));
        }
    }
    async call(account) {
        var checkOwner = false;
        var checkAdmin = false;
        await this.prepare();
        if (this.object_address) {
            if (this.data?.builder !== undefined || this.data?.admin !== undefined) {
                checkOwner = true;
            }
            if (this.data?.permission !== undefined || this.data?.biz_permission !== undefined) {
                checkAdmin = true;
            }
            if (this.data?.description !== undefined) {
                checkAdmin = true;
            }
            return await this.check_permission_and_call(this.object_address, [], [], checkOwner, checkAdmin, account);
        }
        return await this.exec(account);
    }
    async operate(txb, passport, account) {
        let obj;
        if (!this.object_address) {
            obj = Permission.New(txb, this.data?.description ?? '');
        }
        else {
            obj = Permission.From(txb, this.object_address);
        }
        if (!obj)
            ERROR(Errors.InvalidParam, 'CallPermission_Data.data.object');
        if (this.data?.description !== undefined && this.data?.object) {
            obj?.set_description(this.data.description);
        }
        if (this.data?.biz_permission !== undefined) { // High priority operate
            switch (this.data.biz_permission.op) {
                case 'add':
                    this.data.biz_permission.data.forEach(v => {
                        obj?.add_bizPermission(v.index, v.name);
                    });
                    break;
                case 'remove':
                    this.data.biz_permission.permissions.forEach(v => {
                        obj?.remove_bizPermission(v);
                    });
                    break;
            }
        }
        if (this.data?.permission !== undefined) {
            switch (this.data.permission.op) {
                case 'add entity':
                    var add_entity = [];
                    for (let i = 0; i < this.data.permission.entities.length; ++i) {
                        const v = this.data.permission.entities[i];
                        const addr = await GetAccountOrMark_Address(v.address);
                        if (addr) {
                            add_entity.push({ address: addr, permissions: v.permissions });
                        }
                    }
                    obj?.add_entity(add_entity);
                    break;
                case 'add permission':
                    var add_permission = [];
                    for (let i = 0; i < this.data.permission.permissions.length; ++i) {
                        const v = this.data.permission.permissions[i];
                        const e = [];
                        for (let j = 0; j < v.entities.length; ++j) {
                            const addr = await GetAccountOrMark_Address(v.entities[j].address);
                            const guard = await LocalMark.Instance().get_address(v.entities[j].guard);
                            if (addr) {
                                e.push({ address: addr, guard: guard });
                            }
                        }
                        add_permission.push({ index: v.index, entities: e });
                    }
                    obj?.add_entity3(add_permission);
                    break;
                case 'remove entity':
                    const entities = (await GetManyAccountOrMark_Address(this.data.permission.addresses)).filter((v) => v !== undefined);
                    obj?.remove_entity(entities);
                    break;
                case 'remove permission':
                    const addr = await GetAccountOrMark_Address(this.data.permission.address);
                    if (addr)
                        obj?.remove_index(addr, this.data.permission.index);
                    break;
                case 'transfer permission':
                    const from = await GetAccountOrMark_Address(this.data.permission.from);
                    const to = await GetAccountOrMark_Address(this.data.permission.to);
                    if (from && to)
                        obj?.transfer_permission(from, to);
                    break;
            }
        }
        if (this.data?.admin !== undefined) {
            switch (this.data.admin?.op) {
                case 'add':
                case 'set':
                    if (this.data.admin?.op === 'set')
                        obj?.remove_admin([], true);
                    const add = await GetManyAccountOrMark_Address(this.data.admin.addresses);
                    obj?.add_admin(add.filter((v) => v !== undefined));
                    break;
                case 'remove':
                    const remove = await GetManyAccountOrMark_Address(this.data.admin.addresses);
                    obj?.remove_admin(remove.filter((v) => typeof (v) === 'string'));
                    break;
                case 'removeall':
                    obj?.remove_admin([], true);
                    break;
            }
        }
        if (this.data?.builder !== undefined) {
            const b = await GetAccountOrMark_Address(this.data.builder);
            if (b)
                obj?.change_owner(b);
        }
        if (!this.object_address) {
            await this.new_with_mark('Permission', txb, obj.launch(), GetObjectMain(this.data?.object), account);
        }
    }
}
//# sourceMappingURL=permission.js.map