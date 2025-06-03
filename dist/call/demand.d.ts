import { TransactionBlock, PassportObject } from 'wowok';
import { CallBase, CallResult, ObjectTypedMain } from "./base.js";
export interface CallDemand_Data {
    object: ObjectTypedMain;
    present?: {
        service?: string;
        recommend_words: string;
    };
    description?: string;
    time_expire?: {
        op: 'duration';
        minutes: number;
    } | {
        op: 'time';
        time: number;
    };
    bounty?: {
        op: 'add';
        object: {
            address: string;
        } | {
            balance: string | number;
        };
    } | {
        op: 'reward';
        service: string;
    } | {
        op: 'refund';
    };
    guard?: {
        address: string;
        service_id_in_guard?: number;
    };
}
export declare class CallDemand extends CallBase {
    data: CallDemand_Data;
    object_address: string | undefined;
    permission_address: string | undefined;
    type_parameter: string | undefined;
    constructor(data: CallDemand_Data);
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=demand.d.ts.map