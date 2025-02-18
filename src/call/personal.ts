import { TransactionBlock, CallResponse} from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Entity, Entity_Info, MarkName, Resource, WitnessFill} from 'wowok';
import { CallBase } from "./call";

export class CallPersonal extends CallBase {
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
    constructor(object: string | 'new' = 'new') { super(object) }
    async call(account?:string) : Promise<WitnessFill[] | CallResponse | undefined>   {
        return this.exec(account)
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject) {
        let obj : Resource | undefined ; let entity: Entity = Entity.From(txb);
        if (this.object === 'new') {
            obj = Resource.From(txb, entity.create_resource2());
        } else {
            if (IsValidAddress(this.object)) {
                obj = Resource.From(txb, this.object)
                if (this?.close) {
                    entity.destroy_resource(obj)
                    return ; //@ return 
                }
            }
        }

        if (this?.information !== undefined ) {
            entity.update(this.information)
        }

        if (obj && obj?.get_object()) {
            if (this?.marks !== undefined) {
                switch(this.marks.op) {
                    case 'add address':
                        obj?.add2(this.marks.data.address, this.marks.data.mark_name)
                        break;
                    case 'add mark':
                        if (this.marks.data.mark_name === MarkName.DislikeName || this.marks.data.mark_name === MarkName.LikeName) {
                            const n = this.marks.data.mark_name;
                            this.marks.data.address.forEach(v => {if (obj) entity.mark(obj, v, n)})
                        } else {
                            obj?.add(this.marks.data.mark_name, this.marks.data.address)
                        }
                        break;
                    case 'clear mark':
                        obj?.remove(this.marks.mark_name, [], true)
                        break;
                    case 'remove address':
                        obj?.remove2(this.marks.data.address, this.marks.data.mark_name)
                        break;
                    case 'remove mark':
                        if (this.marks.data.mark_name === MarkName.DislikeName || this.marks.data.mark_name === MarkName.LikeName) {
                            const n = this.marks.data.mark_name;
                            this.marks.data.address.forEach(v => {if (obj) entity.mark(obj, v, n)})
                        } else {
                            obj?.remove(this.marks.data.mark_name, this.marks.data.address)
                        }
                        break;
                }
            }
            if (this?.tags !== undefined) {
                switch(this.tags.op) {
                    case 'add':
                        obj?.add_tags(this.tags.data.address, this.tags.data.nick_name, this.tags.data.tags)
                        break;
                    case 'remove':
                        obj?.remove_tags(this.tags.address)
                        break;
                }
            }
            if (this?.transfer_to !== undefined && obj) {
                entity.transfer_resource(obj, this.transfer_to);
            }

            if (this.object === 'new') {
                obj?.launch();
            }
        }
    }
}