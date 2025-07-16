import { TransactionBlock, PassportObject, Treasury_WithdrawMode } from 'wowok';
import { GuardWithAmount } from '../query/objects.js';
import { AccountOrMark_Address, CallBase, CallResult, ObjectTypedMain, PayParam } from "./base.js";
export interface ReceiverParam {
    address: AccountOrMark_Address;
    amount: string | number;
}
export interface TreasuryWithdrawParam extends PayParam {
    receiver: ReceiverParam[];
    withdraw_guard?: string;
}
export interface CallTreasury_Data {
    object: ObjectTypedMain;
    deposit?: {
        balance: string | number;
        param?: PayParam;
    };
    receive?: {
        received_objects: string[];
    } | 'recently';
    withdraw?: TreasuryWithdrawParam;
    description?: string;
    deposit_guard?: string | null;
    withdraw_guard?: {
        op: 'add' | 'set';
        data: GuardWithAmount[];
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
    withdraw_guards: GuardWithAmount[];
    constructor(data: CallTreasury_Data);
    protected prepare(): Promise<void>;
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=treasury.d.ts.map