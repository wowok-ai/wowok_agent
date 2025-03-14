import { TransactionBlock, PassportObject, Treasury_WithdrawMode, WithdrawParam } from 'wowok';
import { CallBase, CallResult, Namedbject } from "./base";
export interface CallTreasury_Data {
    type_parameter: string;
    object?: {
        address: string;
    } | {
        namedNew: Namedbject;
    };
    permission?: {
        address: string;
    } | {
        namedNew: Namedbject;
        description?: string;
    };
    description?: string;
    deposit?: {
        data: {
            balance: string | number;
            index?: number;
            remark?: string;
            for_object?: string;
            for_guard?: string;
        };
        guard?: string | 'fetch';
    };
    receive?: {
        payment: string;
        received_object: string;
    };
    withdraw?: WithdrawParam;
    deposit_guard?: string;
    withdraw_guard?: {
        op: 'add' | 'set';
        data: {
            guard: string;
            amount: string | number;
        }[];
    } | {
        op: 'remove';
        guards: string[];
    } | {
        op: 'removeall';
    };
    withdraw_mode?: Treasury_WithdrawMode;
}
export declare class CallTreasury extends CallBase {
    data: CallTreasury_Data;
    constructor(data: CallTreasury_Data);
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=treasury.d.ts.map