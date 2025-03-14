import { IsValidAddress, Entity, Resource } from 'wowok';
import { CallBase } from "./base";
export class CallPersonal extends CallBase {
    data;
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
        const object_address = this.data?.object?.address;
        if (!object_address || !IsValidAddress(object_address)) {
            obj = Resource.From(txb, entity.create_resource2());
        }
        else {
            obj = Resource.From(txb, object_address);
        }
        if (this.data?.mark?.op === 'destroy') {
            entity.destroy_resource(obj);
            return; //@ return 
        }
        if (this.data?.information !== undefined) {
            entity.update(this.data.information);
        }
        if (obj && obj?.get_object()) {
            if (this.data?.mark !== undefined) {
                switch (this.data.mark.op) {
                    case 'add':
                        this.data.mark.data.forEach(v => {
                            obj?.add(v.address, v.tags, v.name);
                        });
                        break;
                    case 'remove':
                        this.data.mark.data.forEach(v => {
                            obj?.remove(v.address, v.tags);
                        });
                        break;
                    case 'removeall':
                        this.data.mark.address.forEach(v => {
                            obj?.removeall(v);
                        });
                        break;
                }
            }
            if (this.data?.mark?.op === 'transfer' && obj && IsValidAddress(this.data.mark.address)) {
                entity.transfer_resource(obj, this.data.mark.address);
            }
            if (this.data?.mark?.op === 'replace' && IsValidAddress(this.data.mark.address)) {
                entity.use_resource(Resource.From(txb, this.data.mark.address));
            }
            if (!object_address && obj) {
                await this.new_with_mark(txb, obj.launch(), this.data?.object?.namedNew, account);
            }
        }
    }
}
