import { TransactionBlock, PassportObject, Repository_Policy, Repository_Policy_Data, Repository_Policy_Data2, Repository_Policy_Data_Remove, Repository_Policy_Mode } from 'wowok';
import { CallBase, CallResult, ObjectMain } from "./base.js";
export interface CallRepository_Data {
    object?: ObjectMain;
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
    object_address: string | undefined;
    permission_address: string | undefined;
    constructor(data: CallRepository_Data);
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=repository.d.ts.map