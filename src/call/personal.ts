import { TransactionBlock, PassportObject, IsValidAddress, Errors, ERROR, Entity, Entity_Info, Resource} from 'wowok';
import { CallBase, CallResult, Namedbject } from "./base.js";

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallPersonal_Data {
    object?: {address:string} | {namedNew?: Namedbject}; // undefined or {named_new...} for creating a new object
    information?: Entity_Info;
    mark?: {op:'add or set'; data:{address:string; name?:string; tags:string[]}[]}
        | {op:'remove'; data:{address:string; tags:string[]}[]}
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
        const object_address = (this.data?.object as any)?.address;

        if (!object_address || !IsValidAddress(object_address)) {
            obj = Resource.From(txb, entity.create_resource2());
        } else {
            obj = Resource.From(txb, object_address)
        }

        if (this.data?.mark?.op === 'destroy') {
            entity.destroy_resource(obj)
            return ; //@ return 
        }

        if (this.data?.information !== undefined ) {
            entity.update(this.data.information)
        }

        if (obj && obj?.get_object()) {
            if (this.data?.mark !== undefined) {
                switch(this.data.mark.op) {
                    case 'add or set':
                        this.data.mark.data.forEach(v => {
                            obj?.add(v.address, v.tags, v.name)
                        })
                        break;
                    case 'remove':
                        this.data.mark.data.forEach(v => {
                            obj?.remove(v.address, v.tags)
                        })                        
                        break;
                    case 'removeall':
                        this.data.mark.addresses.forEach(v => {
                            obj?.removeall(v)
                        })                        
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
                await this.new_with_mark(txb, obj.launch(), (this.data?.object as any)?.namedNew, account);
            }
        }
    }
}