import { TransactionBlock, PassportObject, Dispute, VotingGuard, WithdrawFee } from 'wowok';
import { CallBase, CallResult, Namedbject } from "./base";
export { BCS, getSuiMoveConfig, } from '@mysten/bcs';
export interface CallArbitration_Data {
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
    endpoint?: string;
    fee?: string;
    fee_treasury?: {
        address: string;
    } | {
        namedNew: Namedbject;
        description?: string;
    };
    arb_new?: {
        data: Dispute;
        guard?: string | 'fetch';
        namedNew?: Namedbject;
    };
    arb_withdraw_fee?: {
        arb?: string;
        data: WithdrawFee;
    };
    arb_vote?: {
        arb?: string;
        voting_guard?: string;
        agrees: number[];
    };
    arb_arbitration?: {
        arb?: string;
        feedback: string;
        indemnity?: string;
    };
    usage_guard?: string;
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
    constructor(data: CallArbitration_Data);
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=arbitration.d.ts.map