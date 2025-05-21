import { Account } from "../local/account.js";
import { LocalMark } from "../local/local.js";
import { CallBase, CallResult, Namedbject } from "./base.js";
import { PassportObject, IsValidAddress, Errors, ERROR, Permission, Permission_Entity, Permission_Index, BizPermission,
    PermissionIndexType, TransactionBlock,
    Permission_Index_Entity
} from 'wowok';

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallPermission_Data {
    object?: {address:string} | {namedNew?: Namedbject}; // undefined or {named_new...} for creating a new object
    description?: string;
    admin?: {op:'add' | 'remove' | 'set', addresses:string[]} | {op:'removeall'};
    biz_permission?: {op:'add'; data: BizPermission[]} | {op:'remove'; permissions: PermissionIndexType[]};
    permission?: {op:'add entity'; entities:Permission_Entity[]} | {op:'add permission'; permissions:Permission_Index[]} 
        | {op:'remove entity'; addresses:string[]} | {op:'remove permission'; address:string; index:PermissionIndexType[]} 
        | {op:'transfer permission', from_address: string; to_address: string};
    builder?: string;
}
export class CallPermission extends CallBase {
    data: CallPermission_Data;
    object_address: string | undefined = undefined;
    constructor(data:CallPermission_Data) {
        super();
        this.data = data;
    }

    async call(account?:string) : Promise<CallResult>   {
        var checkOwner = false; var checkAdmin = false;
        this.object_address = await LocalMark.Instance().get_address((this.data?.object as any)?.address);

        if (this.object_address) {
            if (this.data?.builder !== undefined || this.data?.admin !== undefined) {
                checkOwner = true;
            }
            if (this.data?.permission !== undefined || this.data?.biz_permission !== undefined) {
                checkAdmin = true;
            }
            if (this.data?.description !== undefined) {
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

        if (obj) {
            if (this.data?.description !== undefined && this.data.object) {
                obj?.set_description(this.data.description)
            }
            if (this.data?.admin !== undefined) {
                switch(this.data.admin?.op) {
                    case 'add':
                    case 'set': 
                        if (this.data.admin?.op === 'set') obj?.remove_admin([], true);
                        var addrs = await LocalMark.Instance().get_many_address2(this.data.admin.addresses);
                        obj?.add_admin(addrs);
                        break;
                    case 'remove':
                        var addrs = await LocalMark.Instance().get_many_address2(this.data.admin.addresses);
                        obj?.remove_admin(this.data.admin.addresses);
                        break;
                    case 'removeall':
                        obj?.remove_admin([], true);
                        break;
                }
            }
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
            if (this.data?.permission !== undefined) {
                switch (this.data.permission.op) {
                    case 'add entity':
                        var add = [];
                        for (let i = 0; i < this.data.permission.entities.length; ++i) {
                            const v = this.data.permission.entities[i];
                            const addr = await LocalMark.Instance().get_address(v.address);
                            if (addr) {
                                v.address = addr;
                                add.push(v);
                            }
                        }
                        obj?.add_entity(add);
                        break;
                    case 'add permission':
                        for (let i = 0; i < this.data.permission.permissions.length; ++i) {
                            const v = this.data.permission.permissions[i];
                            const e:Permission_Index_Entity[] = [];
                            for (let j = 0; j < v.entities.length; ++j) {
                                const addr = await LocalMark.Instance().get_address(v.entities[j].address);
                                const guard = (typeof(v.entities[j].guard) === 'string') ?  await LocalMark.Instance().get_address(v.entities[j].guard as string) : undefined;
                                if (addr) {
                                    e.push({address:addr, guard:guard})
                                }
                            }
                            v.entities = e;
                        }
                        obj?.add_entity3(this.data.permission.permissions);
                        break;
                    case 'remove entity':
                        obj?.remove_entity(await LocalMark.Instance().get_many_address2(this.data.permission.addresses));
                        break;
                    case 'remove permission':
                        const addr = await LocalMark.Instance().get_address(this.data.permission.address);
                        if (addr) obj?.remove_index(addr, this.data.permission.index);
                        break;
                    case 'transfer permission':
                        const [from, to] = await LocalMark.Instance().get_many_address([this.data.permission.from_address, this.data.permission.to_address]);
                        if (from && to)  obj?.transfer_permission(from, to);
                        break;
                }
            }
            if (this.data?.builder !== undefined ) {
                const b = await Account.Instance().get(this.data.builder);
                if (b) obj?.change_owner(b.address);
            }
            if (!this.object_address) {
                await this.new_with_mark('Permission', txb, obj.launch(), (this.data?.object as any)?.namedNew, account);
            }
        }
    }
}