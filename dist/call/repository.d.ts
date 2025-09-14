import { TransactionBlock, PassportObject, Repository_Policy_Mode, Repository_Policy, RepositoryValueType } from 'wowok';
import { AccountOrMark_Address, CallBase, CallResult, ObjectMain, ObjectsOp, PassportPayloadValue } from "./base.js";
export interface RepositoryNumber {
    type: RepositoryValueType.PositiveNumber;
    data: string | number | bigint;
    bcsBytes?: Uint8Array;
}
export interface RepositoryString {
    type: RepositoryValueType.String;
    data: string;
    bcsBytes?: Uint8Array;
}
export interface RepositoryNumberVec {
    type: RepositoryValueType.PositiveNumber_Vec;
    data: (string | number | bigint)[];
    bcsBytes?: Uint8Array;
}
export interface RepositoryStringVec {
    type: RepositoryValueType.String_Vec;
    data: string[];
    bcsBytes?: Uint8Array;
}
export interface RepositoryAddress {
    type: RepositoryValueType.Address;
    data: AddressID;
    bcsBytes?: Uint8Array;
}
export interface RepositoryAddressVec {
    type: RepositoryValueType.Address_Vec;
    data: AddressID[];
    bcsBytes?: Uint8Array;
}
export interface RepositoryBool {
    type: RepositoryValueType.Bool;
    data: boolean;
    bcsBytes?: Uint8Array;
}
export type RepositoryTypeData = RepositoryNumber | RepositoryString | RepositoryNumberVec | RepositoryStringVec | RepositoryAddress | RepositoryAddressVec | RepositoryBool;
export type AddressID = AccountOrMark_Address | number | bigint;
export declare const GetAddressID: (key: AddressID) => Promise<string | undefined>;
export declare const toAddressID: (key: number | string | bigint | undefined | null) => string | undefined;
export interface AddData_byKey_Data {
    address: AddressID;
    address_string?: string;
    data: RepositoryTypeData;
}
export interface AddData_byKey {
    key: string;
    data: AddData_byKey_Data[];
}
export interface AddData_byAddress_Data {
    key: string;
    data: RepositoryTypeData;
}
export interface AddData_byAddress {
    address: AddressID;
    address_string?: string;
    data: AddData_byAddress_Data[];
}
export interface RemoveData {
    key: string;
    address: AddressID;
    address_string?: string;
}
export interface CallRepository_Data {
    object?: ObjectMain;
    data?: {
        op: 'add_by_key';
        data: AddData_byKey;
    } | {
        op: 'add_by_address';
        data: AddData_byAddress;
    } | {
        op: 'remove';
        data: RemoveData[];
    };
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
    guard?: string | null;
}
export declare class CallRepository extends CallBase {
    data: CallRepository_Data;
    object_address: string | undefined;
    permission_address: string | undefined;
    constructor(data: CallRepository_Data);
    protected prepare(): Promise<void>;
    private resolve_by_key;
    private DataAddress2DataKey;
    private AddData;
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, payload?: PassportPayloadValue[], account?: string): Promise<void>;
}
//# sourceMappingURL=repository.d.ts.map