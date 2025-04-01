import { TransactionBlock } from 'wowok';
import { PassportObject, Repository_Policy, Repository_Policy_Data, Repository_Policy_Data2, Repository_Policy_Data_Remove, Repository_Policy_Mode } from 'wowok';
import { CallBase, CallResult, Namedbject } from "./base";
export interface CallRepository_Data {
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
    reference?: {
        op: 'set' | 'add' | 'remove';
        addresses: string[];
    } | {
        op: 'removeall';
    };
    mode?: Repository_Policy_Mode;
    policy?: {
        op: 'add' | 'set';
        data: Repository_Policy[];
    } | {
        op: 'remove';
        keys: string[];
    } | {
        op: 'removeall';
    } | {
        op: 'rename';
        data: {
            old: string;
            new: string;
        }[];
    };
    data?: {
        op: 'add';
        data: Repository_Policy_Data | Repository_Policy_Data2;
    } | {
        op: 'remove';
        data: Repository_Policy_Data_Remove[];
    };
}
export declare class CallRepository extends CallBase {
    data: CallRepository_Data;
    constructor(data: CallRepository_Data);
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=repository.d.ts.map