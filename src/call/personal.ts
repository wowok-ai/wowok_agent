import { TransactionBlock, PassportObject, IsValidAddress, Errors, ERROR, Entity, Entity_Info, Resource} from 'wowok';
import { CallBase, CallResult, Namedbject } from "./base.js";
import { LocalMark } from '../local/local.js';

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallPersonal_Data {
    mark_object?: {address:string} | {namedNew?: Namedbject}; // undefined or {named_new...} for creating a new personal resource object ; // undefined for creating personal resource object
    information?: Entity_Info;
    mark?: {op:'add'; data:{address:string; name?:string; tags?:string[]}[]}
        | {op:'remove'; data:{address:string; tags?:string[]}[]}
        | {op:'removeall'; addresses:string[]}
        | {op:'transfer'; address: string}
        | {op:'replace'; address: string}
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

        if (this.data?.information !== undefined ) {
            entity.update(this.data.information)
        }

        if (this.data?.mark === undefined) {
            return ;
        }
        
        const object_address = await LocalMark.Instance().get_address((this.data?.mark_object as any)?.address);
        if (!object_address) {
            obj = Resource.From(txb, entity.create_resource2());
        } else {
            obj = Resource.From(txb, object_address)
        }

        if (this.data?.mark?.op === 'destroy') {
            entity.destroy_resource(obj)
            return ; //@ return 
        }

        if (obj && obj?.get_object()) {
            switch(this.data.mark.op) {
                case 'add':
                    const add = [];
                    for (let i = 0; i < this.data.mark.data.length; ++i) {
                        const v = this.data.mark.data[i];
                        const addr = await LocalMark.Instance().get_address(v.address);
                        if (addr) {
                            v.address =  addr;
                            add.push(v)
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
                        const addr = await LocalMark.Instance().get_address(v.address);
                        if (addr) {
                            v.address =  addr;
                            remove.push(v)
                        }
                    }
                    remove.forEach(v => {
                        obj?.remove(v.address, v.tags ?? [])
                    })                        
                    break;
                case 'removeall':
                    for (let i = 0; i < this.data.mark.addresses.length; ++i) {
                        const v = this.data.mark.addresses[i];
                        const addr = await LocalMark.Instance().get_address(v);
                        if (addr) {
                            obj?.removeall(v)
                        }
                    }                 
                    break;         
            }

            if (this.data?.mark?.op === 'transfer' && obj) {
                const addr = await LocalMark.Instance().get_address(this.data.mark.address);
                if (addr) entity.transfer_resource(obj, addr);
            }
            if (this.data?.mark?.op === 'replace') {
                const addr = await LocalMark.Instance().get_address(this.data.mark.address);
                if (addr) entity.use_resource(Resource.From(txb, addr));
            }

            if (!object_address) {
                await this.new_with_mark('PersonalMark', txb, obj.launch(), (this.data?.mark_object as any)?.namedNew, account);
            }
        }
    }
}