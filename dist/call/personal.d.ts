import { TransactionBlock, PassportObject, EntityInfo } from 'wowok';
import { AccountOrMark_Address, CallBase, CallResult, PassportPayload } from "./base.js";
export interface CallPersonal_Data {
    information?: {
        op: 'add';
        data: EntityInfo[];
    } | {
        op: 'remove';
        title: string[];
    } | {
        op: 'removeall';
    };
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
    protected operate(txb: TransactionBlock, passport?: PassportObject, payload?: PassportPayload[], account?: string): Promise<void>;
}
//# sourceMappingURL=personal.d.ts.map