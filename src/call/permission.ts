import { CallBase, CallResult, Namedbject } from "./base";
import { PassportObject, IsValidAddress, Errors, ERROR, Permission, Permission_Entity, Permission_Index, BizPermission,
    PermissionIndexType, TransactionBlock
} from 'wowok';

export interface CallPermission_Data {
    object?: {address:string} | {namedNew: Namedbject}; // undefined or {named_new...} for creating a new object
    builder?: string;
    admin?: {op:'add' | 'remove' | 'set', address:string[]};
    description?: string;
    permission?: {op:'add entity'; entities:Permission_Entity[]} | {op:'add permission'; permissions:Permission_Index[]} 
        | {op:'remove entity'; addresses:string[]} | {op:'remove permission'; address:string; index:PermissionIndexType[]} 
        | {op:'transfer permission', from_address: string; to_address: string};
    biz_permission?: {op:'add'; data: BizPermission[]} | {op:'remove'; permissions: PermissionIndexType[]};
}
export class CallPermission extends CallBase {
    data: CallPermission_Data;
    constructor(data:CallPermission_Data) {
        super();
        this.data = data;
    }

    async call(account?:string) : Promise<CallResult>   {
        var checkOwner = false; var checkAdmin = false;
        const object_address = (this.data?.object as any)?.address;

        if (object_address && IsValidAddress(object_address)) {
            if (this.data?.builder !== undefined || this.data?.admin !== undefined) {
                checkOwner = true;
            }
            if (this.data?.permission !== undefined || this.data?.biz_permission !== undefined) {
                checkAdmin = true;
            }
            if (this.data?.description !== undefined) {
                checkAdmin = true;
            }
            return await this.check_permission_and_call(object_address, [], [], checkOwner, checkAdmin, account)
        }
        return await this.exec(account)
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject, account?:string) {
        let obj : Permission | undefined ; 
        const object_address = (this.data?.object as any)?.address;

        if (!object_address || !IsValidAddress(object_address)) {
            obj = Permission.New(txb, this.data?.description??'');
        } else {
            obj = Permission.From(txb, object_address)
        }

        if (obj) {
            if (this.data?.biz_permission !== undefined) { // High priority operate
                switch(this.data.biz_permission.op) {
                    case 'add':
                        this.data.biz_permission.data.forEach(v => {
                            obj?.add_bizPermission(v.index, v.name);
                        })
                        break;
                    case 'remove':
                        this.data.biz_permission.permissions.forEach(v => {
                            obj?.remove_bizPermission(v);
                        })
                        break;
                }
            }
            if (this.data?.description !== undefined && this.data.object) {
                obj?.set_description(this.data.description)
            }
            if (this.data?.permission !== undefined) {
                switch (this.data.permission.op) {
                    case 'add entity':
                        obj?.add_entity(this.data.permission.entities);
                        break;
                    case 'add permission':
                        obj?.add_entity3(this.data.permission.permissions);
                        break;
                    case 'remove entity':
                        obj?.remove_entity(this.data.permission.addresses);
                        break;
                    case 'remove permission':
                        obj?.remove_index(this.data.permission.address, this.data.permission.index);
                        break;
                    case 'transfer permission':
                        obj?.transfer_permission(this.data.permission.from_address, this.data.permission.to_address);
                        break;
                }
            }
            if (this.data?.admin !== undefined) {
                switch(this.data.admin.op) {
                    case 'add':
                        obj?.add_admin(this.data.admin.address);
                        break;
                    case 'remove':
                        obj?.remove_admin(this.data.admin.address);
                        break;
                    case 'set':
                        obj?.remove_admin([], true);
                        obj?.add_admin(this.data.admin.address);
                        break
                }
            }
            if (this.data?.builder !== undefined ) {
                obj?.change_owner(this.data.builder);
            }
            if (!object_address) {
                await this.new_with_mark(txb, obj.launch(), (this.data?.object as any)?.namedNew, account);
            }
        }
    }
}