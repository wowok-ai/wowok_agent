import { TransactionBlock, PassportObject, Repository_Policy_Mode, ValueType, Repository_Policy, Repository_Value2 } from 'wowok';
import { AccountOrMark_Address, CallBase, CallResult, ObjectMain, ObjectsOp } from "./base.js";
export type AddressID = AccountOrMark_Address | number | bigint;
export declare const GetAddressID: (key: AddressID) => Promise<string | undefined>;
export interface Repository_Value {
    address: AddressID;
    bcsBytes: Uint8Array;
}
export interface Repository_Policy_Data {
    key: string;
    data: Repository_Value[];
    value_type?: ValueType;
}
export interface Repository_Policy_Data2 {
    address: AddressID;
    data: Repository_Value2[];
    value_type?: ValueType;
}
export interface Repository_Policy_Data_Remove {
    key: string;
    address: AddressID;
}
export interface CallRepository_Data {
    object?: ObjectMain;
    description?: string;
    reference?: ObjectsOp;
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
    protected prepare(): Promise<void>;
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=repository.d.ts.map