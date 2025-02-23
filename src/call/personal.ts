import { TransactionBlock } from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Entity, Entity_Info, TagName, Resource, WitnessFill} from 'wowok';
import { CallBase, CallResult } from "./base";

export interface CallPersonal_Data {
    object?: string; // undefined for creating a new object
    information?: Entity_Info;
    transfer_to?: string;
    tag?: {op:'add'; data:{address:string; name?:string; tags:string[]}[]}
        | {op:'remove'; data:{address:string; tags:string[]}[]}
        | {op:'removeall'; address:string[]};
    close?: boolean; // close a personal resource
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
    protected async operate (txb:TransactionBlock, passport?:PassportObject) {
        let obj : Resource | undefined ; let entity: Entity = Entity.From(txb);
        if (!this.data.object) {
            obj = Resource.From(txb, entity.create_resource2());
        } else {
            if (IsValidAddress(this.data.object)) {
                obj = Resource.From(txb, this.data.object)
                if (this.data?.close) {
                    entity.destroy_resource(obj)
                    return ; //@ return 
                }
            }
        }

        if (this.data?.information !== undefined ) {
            entity.update(this.data.information)
        }

        if (obj && obj?.get_object()) {
            if (this.data?.tag !== undefined) {
                switch(this.data.tag.op) {
                    case 'add':
                        this.data.tag.data.forEach(v => {
                            obj?.add(v.address, v.tags, v.name)
                        })
                        break;
                    case 'remove':
                        this.data.tag.data.forEach(v => {
                            obj?.remove(v.address, v.tags)
                        })                        
                        break;
                    case 'removeall':
                        this.data.tag.address.forEach(v => {
                            obj?.removeall(v)
                        })                        
                        break;         
                }
            }
            if (this.data?.transfer_to !== undefined && obj) {
                entity.transfer_resource(obj, this.data.transfer_to);
            }

            if (!this.data.object) {
                obj?.launch();
            }
        }
    }
}