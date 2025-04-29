import { Entity, Resource } from 'wowok';
import { CallBase } from "./base.js";
import { LocalMark } from 'src/local/local.js';
export class CallPersonal extends CallBase {
    constructor(data) {
        super();
        this.data = data;
    }
    async call(account) {
        return await this.exec(account);
    }
    async operate(txb, passport, account) {
        let obj;
        let entity = Entity.From(txb);
        if (this.data?.information !== undefined) {
            entity.update(this.data.information);
        }
        if (this.data?.mark === undefined) {
            return;
        }
        const object_address = await LocalMark.Instance().get_address(this.data?.mark_object?.address);
        if (!object_address) {
            obj = Resource.From(txb, entity.create_resource2());
        }
        else {
            obj = Resource.From(txb, object_address);
        }
        if (this.data?.mark?.op === 'destroy') {
            entity.destroy_resource(obj);
            return; //@ return 
        }
        if (obj && obj?.get_object()) {
            switch (this.data.mark.op) {
                case 'add':
                    const add = [];
                    for (let i = 0; i < this.data.mark.data.length; ++i) {
                        const v = this.data.mark.data[i];
                        const addr = await LocalMark.Instance().get_address(v.address);
                        if (addr) {
                            v.address = addr;
                            add.push(v);
                        }
                    }
                    add.forEach(v => {
                        obj?.add(v.address, v.tags ?? [], v.name);
                    });
                    break;
                case 'remove':
                    const remove = [];
                    for (let i = 0; i < this.data.mark.data.length; ++i) {
                        const v = this.data.mark.data[i];
                        const addr = await LocalMark.Instance().get_address(v.address);
                        if (addr) {
                            v.address = addr;
                            remove.push(v);
                        }
                    }
                    remove.forEach(v => {
                        obj?.remove(v.address, v.tags ?? []);
                    });
                    break;
                case 'removeall':
                    for (let i = 0; i < this.data.mark.addresses.length; ++i) {
                        const v = this.data.mark.addresses[i];
                        const addr = await LocalMark.Instance().get_address(v);
                        if (addr) {
                            obj?.removeall(v);
                        }
                    }
                    break;
            }
            if (this.data?.mark?.op === 'transfer' && obj) {
                const addr = await LocalMark.Instance().get_address(this.data.mark.address);
                if (addr)
                    entity.transfer_resource(obj, addr);
            }
            if (this.data?.mark?.op === 'replace') {
                const addr = await LocalMark.Instance().get_address(this.data.mark.address);
                if (addr)
                    entity.use_resource(Resource.From(txb, addr));
            }
            if (!object_address) {
                await this.new_with_mark('PersonalMark', txb, obj.launch(), this.data?.mark_object?.namedNew, account);
            }
        }
    }
}
//# sourceMappingURL=personal.js.map