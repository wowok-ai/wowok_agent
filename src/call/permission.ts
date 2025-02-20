import { CallBase, CallResult } from "./base";
import { TransactionBlock, CallResponse} from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Permission, Permission_Entity, Permission_Index, UserDefinedIndex,
    PermissionIndexType, WitnessFill
} from 'wowok';

export interface CallPermission_Data {
    object?: string; // undefined for creating a new object
    builder?: string;
    admin?: {op:'add' | 'remove' | 'set', admins:string[]};
    description?: string;
    entity?: {op:'add entity'; entities:Permission_Entity[]} | {op:'add permission'; permissions:Permission_Index[]} 
        | {op:'remove entity'; addresses:string[]} | {op:'remove permission'; address:string; index:PermissionIndexType[]} 
        | {op:'transfer permission', from_address: string; to_address: string};
    biz_permission?: {op:'add'; data: UserDefinedIndex[]} | {op:'remove'; permissions: PermissionIndexType[]};
}
export class CallPermission extends CallBase {
    data: CallPermission_Data;
    constructor(data:CallPermission_Data) {
        super();
        this.data = data;
    }

    async call(account?:string) : Promise<CallResult>   {
        var checkOwner = false; var checkAdmin = false;
        if (this.data?.object && IsValidAddress(this.data?.object)) {
            if (this.data?.builder !== undefined || this.data?.admin !== undefined) {
                checkOwner = true;
            }
            if (this.data?.entity !== undefined || this.data?.biz_permission !== undefined) {
                checkAdmin = true;
            }
            if (this.data?.description !== undefined) {
                checkAdmin = true;
            }
            return await this.check_permission_and_call(this.data.object, [], [], checkOwner, checkAdmin, account)
        }
        return this.exec(account)
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject) {
        let obj : Permission | undefined ; 
        if (!this.data.object) {
            obj = Permission.New(txb, this.data?.description??'');
        } else {
            if (IsValidAddress(this.data.object)) {
                obj = Permission.From(txb, this.data.object)
            }
        }

        if (obj) {
            if (this.data?.admin !== undefined) {
                switch(this.data.admin.op) {
                    case 'add':
                        obj?.add_admin(this.data.admin.admins);
                        break;
                    case 'remove':
                        obj?.remove_admin(this.data.admin.admins);
                        break;
                    case 'set':
                        obj?.remove_admin([], true);
                        obj?.add_admin(this.data.admin.admins);
                        break
                }
            }
            if (this.data?.description !== undefined && this.data.object) {
                obj?.set_description(this.data.description)
            }
            if (this.data?.entity !== undefined) {
                switch (this.data.entity.op) {
                    case 'add entity':
                        obj?.add_entity(this.data.entity.entities);
                        break;
                    case 'add permission':
                        obj?.add_entity3(this.data.entity.permissions);
                        break;
                    case 'remove entity':
                        obj?.remove_entity(this.data.entity.addresses);
                        break;
                    case 'remove permission':
                        obj?.remove_index(this.data.entity.address, this.data.entity.index);
                        break;
                    case 'transfer permission':
                        obj?.transfer_permission(this.data.entity.from_address, this.data.entity.to_address);
                        break;
                }
            }
            if (this.data?.biz_permission !== undefined) {
                switch(this.data.biz_permission.op) {
                    case 'add':
                        this.data.biz_permission.data.forEach(v => {
                            obj?.add_userdefine(v.index, v.name);
                        })
                        break;
                    case 'remove':
                        this.data.biz_permission.permissions.forEach(v => {
                            obj?.remove_userdefine(v);
                        })
                        break;
                }
            }
            if (this.data?.builder !== undefined ) {
                obj?.change_owner(this.data.builder);
            }
            if (!this.data.object) {
                obj?.launch();
            }
        }
    }
}