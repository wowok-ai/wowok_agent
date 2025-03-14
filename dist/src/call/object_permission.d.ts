import { CallBase, CallResult } from "./base";
import { TransactionBlock, PassportObject } from 'wowok';
export interface CallObjectPermission_Data {
    objects: string[];
    new_permission: string;
}
export declare class CallObjectPermission extends CallBase {
    data: CallObjectPermission_Data;
    constructor(data: CallObjectPermission_Data);
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject): Promise<void>;
}
//# sourceMappingURL=object_permission.d.ts.map