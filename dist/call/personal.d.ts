import { TransactionBlock, PassportObject } from 'wowok';
import { AccountOrMark_Address, CallBase, CallResult } from "./base.js";
export interface CallPersonal_Data {
    information?: Map<string, string>;
    description?: string;
    mark?: {
        op: 'add';
        data: {
            address: AccountOrMark_Address;
            name?: string;
            tags?: string[];
        }[];
    } | {
        op: 'remove';
        data: {
            address: AccountOrMark_Address;
            tags?: string[];
        }[];
    } | {
        op: 'removeall';
        addresses: AccountOrMark_Address[];
    } | {
        op: 'transfer';
        to: AccountOrMark_Address;
    } | {
        op: 'replace';
        mark_object: string;
    } | {
        op: 'destroy';
    };
    faucet?: boolean;
}
export declare class CallPersonal extends CallBase {
    data: CallPersonal_Data;
    constructor(data: CallPersonal_Data);
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=personal.d.ts.map