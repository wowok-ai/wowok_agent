import { CallBase, CallResult, Namedbject } from "./base.js";
import { PassportObject, Permission_Entity, Permission_Index, BizPermission, PermissionIndexType, TransactionBlock } from 'wowok';
export interface CallPermission_Data {
    object?: {
        address: string;
    } | {
        namedNew?: Namedbject;
    };
    description?: string;
    admin?: {
        op: 'add' | 'remove' | 'set';
        addresses: string[];
    } | {
        op: 'removeall';
    };
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
        addresses: string[];
    } | {
        op: 'remove permission';
        address: string;
        index: PermissionIndexType[];
    } | {
        op: 'transfer permission';
        from_address: string;
        to_address: string;
    };
    builder?: string;
}
export declare class CallPermission extends CallBase {
    data: CallPermission_Data;
    object_address: string | undefined;
    constructor(data: CallPermission_Data);
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=permission.d.ts.map