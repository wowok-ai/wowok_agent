import { LocalMark } from "../local/local.js";
import { AccountOrMark_Address, CallBase, CallResult, GetAccountOrMark_Address, GetManyAccountOrMark_Address, 
    GetObjectExisted, GetObjectMain, ObjectPermissionMain} from "./base.js";
import { PassportObject, Permission,  BizPermission,
    PermissionIndexType, TransactionBlock, Permission_Entity as Wowok_Permission_Entity, ERROR, Errors, 
    Permission_Index as Wowok_Permission_Index, Permission_Index_Entity as Wowok_Permission_Index_Entity,
} from 'wowok';

export interface Entity_Permission {
    index: PermissionIndexType;
    guard?: string;
}

export interface Permission_Entity {
    address: AccountOrMark_Address;
    permissions:Entity_Permission[];
}

export interface Permission_Index_Entity {
    address: AccountOrMark_Address;
    guard?: string;
}

export interface Permission_Index {
    index: PermissionIndexType;
    entities: Permission_Index_Entity[];
}
/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallPermission_Data {
    object?: ObjectPermissionMain;
    description?: string;
    biz_permission?: {op:'add'; data: BizPermission[]} | {op:'remove'; permissions: PermissionIndexType[]};
    permission?: {op:'add entity'; entities:Permission_Entity[]} | {op:'add permission'; permissions:Permission_Index[]} 
        | {op:'remove entity'; addresses:AccountOrMark_Address[]} | {op:'remove permission'; address:AccountOrMark_Address; index:PermissionIndexType[]} 
        | {op:'transfer permission', from: AccountOrMark_Address, to: AccountOrMark_Address};
    admin?: {op:'add' | 'remove' | 'set', addresses:AccountOrMark_Address[]} | {op:'removeall'};
    builder?: AccountOrMark_Address;
}
export class CallPermission extends CallBase {
    data: CallPermission_Data;
    object_address: string | undefined = undefined;
    constructor(data:CallPermission_Data) {
        super();
        this.data = data;
    }

    protected async prepare(): Promise<void> {
        if (!this.object_address) {
            this.object_address = await LocalMark.Instance().get_address(GetObjectExisted(this.data?.object));
        }
    }
    async call(account?:string) : Promise<CallResult>   {
        var checkOwner = false; var checkAdmin = false;
        
        await this.prepare();

        if (this.object_address) {
            if (this.data?.builder != null || this.data?.admin != null) {
                checkOwner = true;
            }
            if (this.data?.permission != null || this.data?.biz_permission != null) {
                checkAdmin = true;
            }
            if (this.data?.description != null) {
                checkAdmin = true;
            }
            return await this.check_permission_and_call(this.object_address, [], [], checkOwner, checkAdmin, account)
        }
        return await this.exec(account)
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject, account?:string) {
        let obj : Permission | undefined ; 

        if (!this.object_address) {
            obj = Permission.New(txb, this.data?.description??'');
        } else {
            obj = Permission.From(txb, this.object_address)
        }

        if (!obj)  ERROR(Errors.InvalidParam, 'CallPermission_Data.data.object');

        if (this.data?.description != null && this.object_address) {
            obj?.set_description(this.data.description)
        }
        
        if (this.data?.biz_permission != null) { // High priority operate
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
        if (this.data?.permission != null) {
            switch (this.data.permission.op) {
                case 'add entity':
                    var add_entity:Wowok_Permission_Entity[] = [];
                    for (let i = 0; i < this.data.permission.entities.length; ++i) {
                        const v = this.data.permission.entities[i];
                        const addr = await GetAccountOrMark_Address(v.address);
                        
                        if (addr) {
                            add_entity.push({address:addr, permissions:v.permissions});
                        } else {
                            ERROR(Errors.InvalidParam, `CallPermission_Data.data.permission.entities.address ${i}: ${v.address.name_or_address} NOT found `);
                        }
                    }
                    obj?.add_entity(add_entity);
                    break;
                case 'add permission':
                    var add_permission: Wowok_Permission_Index[] = [];
                    for (let i = 0; i < this.data.permission.permissions.length; ++i) {
                        const v = this.data.permission.permissions[i];
                        const e:Wowok_Permission_Index_Entity[] = [];
                        for (let j = 0; j < v.entities.length; ++j) {
                            const addr = await GetAccountOrMark_Address(v.entities[j].address);
                            const guard = await LocalMark.Instance().get_address(v.entities[j].guard as string) ;
                            if (addr) {
                                e.push({address:addr, guard:guard})
                            }
                        }
                        add_permission.push({index:v.index, entities:e});
                    }
                    obj?.add_entity3(add_permission);
                    break;
                case 'remove entity':
                    const entities:string[] = (await GetManyAccountOrMark_Address(this.data.permission.addresses)).filter((v): v is string => v!== undefined);
                    obj?.remove_entity(entities);
                    break;
                case 'remove permission':
                    const addr = await GetAccountOrMark_Address(this.data.permission.address);
                    if (addr) obj?.remove_index(addr, this.data.permission.index);
                    break;
                case 'transfer permission':
                    const from = await GetAccountOrMark_Address(this.data.permission.from);
                    const to = await GetAccountOrMark_Address(this.data.permission.to);
                    if (from && to)  obj?.transfer_permission(from, to);
                    break;
            }
        }
        if (this.data?.admin != null) {
            switch(this.data.admin?.op) {
                case 'add':
                case 'set': 
                    if (this.data.admin?.op === 'set') obj?.remove_admin([], true);
                    const add = await GetManyAccountOrMark_Address(this.data.admin.addresses);
                    obj?.add_admin(add.filter((v): v is string => v!== undefined));
                    break;
                case 'remove':
                    const remove = await GetManyAccountOrMark_Address(this.data.admin.addresses);
                    obj?.remove_admin(remove.filter((v): v is string => typeof(v) === 'string'));
                    break;
                case 'removeall':
                    obj?.remove_admin([], true);
                    break;
            }
        }
        if (this.data?.builder != null ) {
            const b = await GetAccountOrMark_Address(this.data.builder);
            if (b) obj?.change_owner(b);
        }
        if (!this.object_address) {
            await this.new_with_mark('Permission', txb, obj.launch(), GetObjectMain(this.data?.object), account);
        }
    }
}