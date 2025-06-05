import { AccountOrMark_Address, CallBase, CallResult, ObjectPermissionMain } from "./base.js";
import { PassportObject, BizPermission, PermissionIndexType, TransactionBlock } from 'wowok';
export interface Entity_Permission {
    index: PermissionIndexType;
    guard?: string;
}
export interface Permission_Entity {
    address: AccountOrMark_Address;
    permissions: Entity_Permission[];
}
export interface Permission_Index_Entity {
    address: AccountOrMark_Address;
    guard?: string;
}
export interface Permission_Index {
    index: PermissionIndexType;
    entities: Permission_Index_Entity[];
}
export interface CallPermission_Data {
    object?: ObjectPermissionMain;
    description?: string;
    biz_permission?: {
        op: 'add';
        data: BizPermission[];
    } | {
        op: 'remove';
        permissions: PermissionIndexType[];
    };
    permission?: {
        op: 'add entity';
        entities: Permission_Entity[];
    } | {
        op: 'add permission';
        permissions: Permission_Index[];
    } | {
        op: 'remove entity';
        addresses: AccountOrMark_Address[];
    } | {
        op: 'remove permission';
        address: AccountOrMark_Address;
        index: PermissionIndexType[];
    } | {
        op: 'transfer permission';
        from: AccountOrMark_Address;
        to: AccountOrMark_Address;
    };
    admin?: {
        op: 'add' | 'remove' | 'set';
        addresses: AccountOrMark_Address[];
    } | {
        op: 'removeall';
    };
    builder?: AccountOrMark_Address;
}
export declare class CallPermission extends CallBase {
    data: CallPermission_Data;
    object_address: string | undefined;
    constructor(data: CallPermission_Data);
    protected prepare(): Promise<void>;
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=permission.d.ts.map