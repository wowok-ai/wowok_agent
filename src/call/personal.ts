import { TransactionBlock, CallResponse} from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Entity, Entity_Info, MarkName, Resource, WitnessFill} from 'wowok';
import { CallBase, CallResult } from "./base";

export interface CallPersonal_Data {
    object?: string; // undefined for creating a new object
    information?: Entity_Info;
    transfer_to?: string;
    marks?: {op:'add mark'; data:{mark_name:string; address:string[]}}
        | {op:'add address'; data:{address:string; mark_name:string[]}} 
        | {op:'remove mark'; data:{mark_name:string; address:string[]}}
        | {op:'remove address'; data:{address:string; mark_name:string[]}}
        | {op:'clear mark'; mark_name:string};
    tags?: {op:'add'; data:{address:string; nick_name:string; tags:string[]}}
        | {op:'remove'; address:string};
    close?: boolean; // close a personal resource
}

export class CallPersonal extends CallBase {
    data: CallPersonal_Data;
    constructor(data: CallPersonal_Data) {
        super();
        this.data = data;
    }
    async call(account?:string) : Promise<CallResult> {
        return this.exec(account)
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
            if (this.data?.marks !== undefined) {
                switch(this.data.marks.op) {
                    case 'add address':
                        obj?.add2(this.data.marks.data.address, this.data.marks.data.mark_name)
                        break;
                    case 'add mark':
                        if (this.data.marks.data.mark_name === MarkName.DislikeName || this.data.marks.data.mark_name === MarkName.LikeName) {
                            const n = this.data.marks.data.mark_name;
                            this.data.marks.data.address.forEach(v => {if (obj) entity.mark(obj, v, n)})
                        } else {
                            obj?.add(this.data.marks.data.mark_name, this.data.marks.data.address)
                        }
                        break;
                    case 'clear mark':
                        obj?.remove(this.data.marks.mark_name, [], true)
                        break;
                    case 'remove address':
                        obj?.remove2(this.data.marks.data.address, this.data.marks.data.mark_name)
                        break;
                    case 'remove mark':
                        if (this.data.marks.data.mark_name === MarkName.DislikeName || this.data.marks.data.mark_name === MarkName.LikeName) {
                            const n = this.data.marks.data.mark_name;
                            this.data.marks.data.address.forEach(v => {if (obj) entity.mark(obj, v, n)})
                        } else {
                            obj?.remove(this.data.marks.data.mark_name, this.data.marks.data.address)
                        }
                        break;
                }
            }
            if (this.data?.tags !== undefined) {
                switch(this.data.tags.op) {
                    case 'add':
                        obj?.add_tags(this.data.tags.data.address, this.data.tags.data.nick_name, this.data.tags.data.tags)
                        break;
                    case 'remove':
                        obj?.remove_tags(this.data.tags.address)
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