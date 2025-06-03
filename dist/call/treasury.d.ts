import { TransactionBlock, PassportObject, Treasury_WithdrawMode, WithdrawParam } from 'wowok';
import { AccountOrMark_Address, CallBase, CallResult, ObjectTypedMain } from "./base.js";
export interface ReceiverParam {
    address: AccountOrMark_Address;
    amount: string | number;
}
export interface TreasuryWithdrawParam extends WithdrawParam {
    receiver: ReceiverParam[];
    withdraw_guard?: string;
}
export interface CallTreasury_Data {
    object: ObjectTypedMain;
    deposit?: {
        balance: string | number;
        index?: number | string;
        remark?: string;
        for_object?: string;
        for_guard?: string;
    };
    receive?: {
        received_objects: string[];
    } | 'recently';
    withdraw?: TreasuryWithdrawParam;
    description?: string;
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
    object_address: string | undefined;
    permission_address: string | undefined;
    type_parameter: string | undefined;
    constructor(data: CallTreasury_Data);
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=treasury.d.ts.map