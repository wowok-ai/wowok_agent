import { TransactionBlock, PassportObject, Errors, ERROR, Entity, Entity_Info, Resource} from 'wowok';
import { AccountOrMark_Address, CallBase, CallResult, GetAccountOrMark_Address } from "./base.js";
import { LocalMark } from '../local/local.js';
import { query_personal } from '../query/objects.js';
import { Account } from '../local/account.js';

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallPersonal_Data {
    information?: Entity_Info;
    mark?: {op:'add'; data:{address:AccountOrMark_Address; name?:string; tags?:string[]}[]}
        | {op:'remove'; data:{address:AccountOrMark_Address; tags?:string[]}[]}
        | {op:'removeall'; addresses:AccountOrMark_Address[]}
        | {op:'transfer'; to: AccountOrMark_Address}
        | {op:'replace'; mark_object: string}
        | {op:'destroy'}
}

export class CallPersonal extends CallBase {
    data: CallPersonal_Data;
    constructor(data: CallPersonal_Data) {
        super();
        this.data = data;
    }
    async call(account?:string) : Promise<CallResult> {
        return await this.exec(account)
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject, account?: string) {
        let obj : Resource | undefined ; let entity: Entity = Entity.From(txb);
        const entity_data = await query_personal({address:{account_or_address:account}});
        if (entity_data?.mark_object) {
            obj = Resource.From(txb, entity_data.mark_object);
        } else {
            obj = Resource.From(txb, entity.create_resource2());
        }

        if (this.data?.information != null ) {
            entity.update(this.data.information)
        }

        if (this.data?.mark === undefined) {
            return ;
        }

        if (this.data?.mark?.op === 'destroy') {
            entity.destroy_resource(obj)
            return ; //@ return 
        }

        if (obj && obj?.get_object()) {
            switch(this.data.mark.op) {
                case 'add':
                    const add  = [];
                    for (let i = 0; i < this.data.mark.data.length; ++i) {
                        const v = this.data.mark.data[i];
                        const addr = await GetAccountOrMark_Address(v.address);
                        if (addr) {
                            add.push({address:addr, tags:v.tags, name:v.name})
                        }
                    }

                    add.forEach(v => {
                        obj?.add(v.address, v.tags ?? [], v.name)
                    })
                    break;
                case 'remove':
                    const remove = [];
                    for (let i = 0; i < this.data.mark.data.length; ++i) {
                        const v = this.data.mark.data[i];
                        const addr = await GetAccountOrMark_Address(v.address);
                        if (addr) {
                            remove.push({address:addr, tags:v.tags})
                        }
                    }
                    remove.forEach(v => {
                        obj?.remove(v.address, v.tags ?? [])
                    })                        
                    break;
                case 'removeall':
                    for (let i = 0; i < this.data.mark.addresses.length; ++i) {
                        const v = this.data.mark.addresses[i];
                        const addr = await GetAccountOrMark_Address(v);
                        if (addr) {
                            obj?.removeall(addr)
                        }
                    }                 
                    break;         
            }

            if (this.data?.mark?.op === 'transfer' && obj) {
                const addr = await GetAccountOrMark_Address(this.data.mark.to);
                if (addr) entity.transfer_resource(obj, addr);
            }
            if (this.data?.mark?.op === 'replace') {
                const addr = await LocalMark.Instance().get_address(this.data.mark.mark_object);
                if (addr) entity.use_resource(Resource.From(txb, addr));
            }

            if (!entity_data?.mark_object) {
                obj.launch();
            }
        }
    }
}