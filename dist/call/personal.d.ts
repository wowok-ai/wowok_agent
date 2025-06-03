import { TransactionBlock, PassportObject, Entity_Info } from 'wowok';
import { AccountOrMark_Address, CallBase, CallResult } from "./base.js";
export interface CallPersonal_Data {
    information?: Entity_Info;
    mark?: {
        op: 'add';
        data: {
            entity: AccountOrMark_Address;
            name?: string;
            tags?: string[];
        }[];
    } | {
        op: 'remove';
        data: {
            entity: AccountOrMark_Address;
            tags?: string[];
        }[];
    } | {
        op: 'removeall';
        entities: AccountOrMark_Address[];
    } | {
        op: 'transfer';
        to: AccountOrMark_Address;
    } | {
        op: 'replace';
        mark_object: string;
    } | {
        op: 'destroy';
    };
}
export declare class CallPersonal extends CallBase {
    data: CallPersonal_Data;
    constructor(data: CallPersonal_Data);
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=personal.d.ts.map