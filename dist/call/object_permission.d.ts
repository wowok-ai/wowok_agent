import { CallBase, CallResult } from "./base.js";
import { TransactionBlock, PassportObject } from 'wowok';
export interface CallObjectPermission_Data {
    objects: string[];
    new_permission: string;
}
export declare class CallObjectPermission extends CallBase {
    data: CallObjectPermission_Data;
    new_perm: string | undefined;
    constructor(data: CallObjectPermission_Data);
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject): Promise<void>;
}
//# sourceMappingURL=object_permission.d.ts.map