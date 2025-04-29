import { TransactionBlock, PassportObject, Entity_Info } from 'wowok';
import { CallBase, CallResult, Namedbject } from "./base.js";
export interface CallPersonal_Data {
    mark_object?: {
        address: string;
    } | {
        namedNew?: Namedbject;
    };
    information?: Entity_Info;
    mark?: {
        op: 'add';
        data: {
            address: string;
            name?: string;
            tags?: string[];
        }[];
    } | {
        op: 'remove';
        data: {
            address: string;
            tags?: string[];
        }[];
    } | {
        op: 'removeall';
        addresses: string[];
    } | {
        op: 'transfer';
        address: string;
    } | {
        op: 'replace';
        address: string;
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