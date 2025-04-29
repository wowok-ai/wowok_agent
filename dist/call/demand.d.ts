import { TransactionBlock } from 'wowok';
import { PassportObject } from 'wowok';
import { ObjectDemand } from '../query/objects.js';
import { CallBase, CallResult, Namedbject } from "./base.js";
export interface CallDemand_Data {
    type_parameter: string;
    object?: {
        address: string;
    } | {
        namedNew?: Namedbject;
    };
    permission?: {
        address: string;
    } | {
        namedNew?: Namedbject;
        description?: string;
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
    present?: {
        service: string | number;
        recommend_words: string;
        service_pay_type: string;
        guard?: string;
    };
    guard?: {
        address: string;
        service_id_in_guard?: number;
    };
}
export declare class CallDemand extends CallBase {
    data: CallDemand_Data;
    content: ObjectDemand | undefined;
    constructor(data: CallDemand_Data);
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=demand.d.ts.map