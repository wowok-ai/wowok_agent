import { CallBase } from "./call";
import { TransactionBlock, CallResponse} from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Permission, Permission_Entity, Permission_Index, UserDefinedIndex,
    PermissionIndexType, WitnessFill
} from 'wowok';

export class CallPermission extends CallBase {
    builder?: string;
    admin?: {op:'add' | 'remove' | 'set', admins:string[]};
    description?: string;
    entity?: {op:'add entity'; entities:Permission_Entity[]} | {op:'add permission'; permissions:Permission_Index[]} 
        | {op:'remove entity'; addresses:string[]} | {op:'remove permission'; address:string; index:PermissionIndexType[]} 
        | {op:'transfer permission', from_address: string; to_address: string};
    biz_permission?: {op:'add'; data: UserDefinedIndex[]} | {op:'remove'; permissions: PermissionIndexType[]};
    constructor(object: string | 'new' = 'new') { super(object) }
    async call(account?:string) : Promise<WitnessFill[] | CallResponse | undefined>   {
        var checkOwner = false; var checkAdmin = false;
        if (this?.object !== 'new' && IsValidAddress(this?.object)) {
            if (this?.builder !== undefined || this?.admin !== undefined) {
                checkOwner = true;
            }
            if (this?.entity !== undefined || this?.biz_permission !== undefined) {
                checkAdmin = true;
            }
            if (this?.description !== undefined && this?.object !== 'new') {
                checkAdmin = true;
            }
            return await this.check_permission_and_call(this.object, [], [], checkOwner, checkAdmin, account)
        }
        return this.exec(account)
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject) {
        let obj : Permission | undefined ; 
        if (this.object === 'new') {
            obj = Permission.New(txb, this?.description??'');
        } else {
            if (IsValidAddress(this.object)) {
                obj = Permission.From(txb, this.object)
            }
        }

        if (obj) {
            if (this?.admin !== undefined) {
                switch(this.admin.op) {
                    case 'add':
                        obj?.add_admin(this.admin.admins);
                        break;
                    case 'remove':
                        obj?.remove_admin(this.admin.admins);
                        break;
                    case 'set':
                        obj?.remove_admin([], true);
                        obj?.add_admin(this.admin.admins);
                        break
                }
            }
            if (this?.description !== undefined && this.object !== 'new') {
                obj?.set_description(this.description)
            }
            if (this?.entity !== undefined) {
                switch (this.entity.op) {
                    case 'add entity':
                        obj?.add_entity(this.entity.entities);
                        break;
                    case 'add permission':
                        obj?.add_entity3(this.entity.permissions);
                        break;
                    case 'remove entity':
                        obj?.remove_entity(this.entity.addresses);
                        break;
                    case 'remove permission':
                        obj?.remove_index(this.entity.address, this.entity.index);
                        break;
                    case 'transfer permission':
                        obj?.transfer_permission(this.entity.from_address, this.entity.to_address);
                        break;
                }
            }
            if (this?.biz_permission !== undefined) {
                switch(this.biz_permission.op) {
                    case 'add':
                        this.biz_permission.data.forEach(v => {
                            obj?.add_userdefine(v.index, v.name);
                        })
                        break;
                    case 'remove':
                        this.biz_permission.permissions.forEach(v => {
                            obj?.remove_userdefine(v);
                        })
                        break;
                }
            }
            if (this?.builder !== undefined ) {
                obj?.change_owner(this.builder);
            }
            if (this.object === 'new') {
                obj?.launch();
            }
        }
    }
}