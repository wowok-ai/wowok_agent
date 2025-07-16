import { TransactionBlock, PassportObject, VotingGuard } from 'wowok';
import { CallBase, CallResult, Namedbject, ObjectParam, ObjectTypedMain, PayParam } from "./base.js";
export interface DisputeData {
    order: string;
    description: string;
    votable_proposition: string[];
    max_fee?: string | number;
}
export interface CallArbitration_Data {
    object: ObjectTypedMain;
    arb_new?: {
        data: DisputeData;
        namedNew?: Namedbject;
    };
    arb_withdraw_fee?: {
        arb: string;
        data: PayParam;
    };
    arb_vote?: {
        arb: string;
        voting_guard?: string;
        agrees: number[];
    };
    arb_arbitration?: {
        arb: string;
        feedback: string;
        indemnity?: string | number | null;
    };
    description?: string;
    location?: string;
    endpoint?: string | null;
    fee?: string | number;
    fee_treasury?: ObjectParam;
    guard?: string | null;
    voting_guard?: {
        op: 'add' | 'set';
        data: VotingGuard[];
    } | {
        op: 'remove';
        guards: string[];
    } | {
        op: 'removeall';
    };
    bPaused?: boolean;
}
export declare class CallArbitration extends CallBase {
    data: CallArbitration_Data;
    object_address: string | undefined;
    permission_address: string | undefined;
    type_parameter: string | undefined;
    constructor(data: CallArbitration_Data);
    private checkNotPaused;
    protected prepare(): Promise<void>;
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=arbitration.d.ts.map