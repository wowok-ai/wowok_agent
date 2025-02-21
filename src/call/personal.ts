import { TransactionBlock } from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Entity, Entity_Info, GroupName, Resource, WitnessFill} from 'wowok';
import { CallBase, CallResult } from "./base";

export interface CallPersonal_Data {
    object?: string; // undefined for creating a new object
    information?: Entity_Info;
    transfer_to?: string;
    group?: {op:'add group'; data:{group_name:string | GroupName; address:string[]}}
        | {op:'remove group'; data:{group_name:string | GroupName; address:string[]}}
        | {op:'clear group'; group_name:string | GroupName}
        | {op:'add address'; data:{address:string; group_name:(string | GroupName)[]}} 
        | {op:'remove address'; data:{address:string; group_name:(string | GroupName)[]}};
    tag?: {op:'add'; data:{address:string; nick_name:string; tags:string[]}}
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
            if (this.data?.group !== undefined) {
                switch(this.data.group.op) {
                    case 'add address':
                        obj?.add2(this.data.group.data.address, this.data.group.data.group_name)
                        break;
                    case 'add group':
                        if (this.data.group.data.group_name === GroupName.DislikeName || this.data.group.data.group_name === GroupName.LikeName) {
                            const n = this.data.group.data.group_name;
                            this.data.group.data.address.forEach(v => {if (obj) entity.mark(obj, v, n)})
                        } else {
                            obj?.add(this.data.group.data.group_name, this.data.group.data.address)
                        }
                        break;
                    case 'clear group':
                        obj?.remove(this.data.group.group_name, [], true)
                        break;
                    case 'remove address':
                        obj?.remove2(this.data.group.data.address, this.data.group.data.group_name)
                        break;
                    case 'remove group':
                        if (this.data.group.data.group_name === GroupName.DislikeName || this.data.group.data.group_name === GroupName.LikeName) {
                            const n = this.data.group.data.group_name;
                            this.data.group.data.address.forEach(v => {if (obj) entity.mark(obj, v, n)})
                        } else {
                            obj?.remove(this.data.group.data.group_name, this.data.group.data.address)
                        }
                        break;
                }
            }
            if (this.data?.tag !== undefined) {
                switch(this.data.tag.op) {
                    case 'add':
                        obj?.add_tags(this.data.tag.data.address, this.data.tag.data.nick_name, this.data.tag.data.tags)
                        break;
                    case 'remove':
                        obj?.remove_tags(this.data.tag.address)
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