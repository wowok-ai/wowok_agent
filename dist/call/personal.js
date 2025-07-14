import { Entity, Resource } from 'wowok';
import { CallBase, GetAccountOrMark_Address } from "./base.js";
import { LocalMark } from '../local/local.js';
import { query_personal } from '../query/objects.js';
import { Account } from '../local/account.js';
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
        const entity_data = await query_personal({ address: { name_or_address: account } });
        if (entity_data?.mark_object) {
            obj = Resource.From(txb, entity_data.mark_object);
        }
        else {
            obj = Resource.From(txb, entity.create_resource2());
        }
        if (this.data?.information != null) {
            entity.update(this.data.information);
        }
        if (this.data?.mark === undefined) {
            if (!entity_data?.mark_object) {
                obj.launch();
            }
            return;
        }
        if (this.data?.mark?.op === 'destroy') {
            entity.destroy_resource(obj);
            if (!entity_data?.mark_object) {
                obj.launch();
            }
            return; //@ return 
        }
        if (obj && obj?.get_object()) {
            switch (this.data.mark.op) {
                case 'add':
                    for (let i = 0; i < this.data.mark.data.length; ++i) {
                        const v = this.data.mark.data[i];
                        const addr = await GetAccountOrMark_Address(v.address);
                        if (addr) {
                            obj?.add(addr, v.tags ?? [], v.name);
                            //@ always add to local, for easy using
                            await LocalMark.Instance().put(v.name, { address: addr, tags: v.tags });
                        }
                    }
                    break;
                case 'remove':
                    for (let i = 0; i < this.data.mark.data.length; ++i) {
                        const v = this.data.mark.data[i];
                        const addr = await GetAccountOrMark_Address(v.address);
                        if (addr) {
                            obj?.remove(addr, v.tags ?? []);
                            //@ dont del from local
                        }
                    }
                    break;
                case 'removeall':
                    for (let i = 0; i < this.data.mark.addresses.length; ++i) {
                        const v = this.data.mark.addresses[i];
                        const addr = await GetAccountOrMark_Address(v);
                        if (addr) {
                            obj?.removeall(addr);
                        }
                    }
                    break;
            }
            if (this.data?.mark?.op === 'transfer' && obj) {
                const addr = await GetAccountOrMark_Address(this.data.mark.to);
                if (addr)
                    entity.transfer_resource(obj, addr);
            }
            if (this.data?.mark?.op === 'replace') {
                const addr = await LocalMark.Instance().get_address(this.data.mark.mark_object);
                if (addr)
                    entity.use_resource(Resource.From(txb, addr));
            }
            if (this.data?.faucet) {
                await Account.Instance().faucet(account);
            }
            if (!entity_data?.mark_object) {
                obj.launch();
            }
        }
    }
}
//# sourceMappingURL=personal.js.map