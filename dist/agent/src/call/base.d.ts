import { TxbAddress, ResourceObject, PassportObject, PermissionIndexType, WitnessFill } from 'wowok';
import { ObjectBase } from '../objects';
import { Transaction as TransactionBlock } from '@mysten/sui/transactions';
import { type SuiTransactionBlockResponse as CallResponse } from '@mysten/sui/client';
export interface Namedbject {
    name?: string;
    tags?: string[];
}
export interface AddressMark {
    address: TxbAddress;
    name?: string;
    tags: string[];
}
export interface ResponseData extends ObjectBase {
    change: 'created' | 'mutated' | string;
}
export interface GuardInfo_forCall {
    guard: string[];
    witness: WitnessFill[];
}
export type CallResult = GuardInfo_forCall | CallResponse | undefined;
export declare function ResponseData(response: CallResponse | undefined): ResponseData[];
export declare class CallBase {
    resouceObject: ResourceObject | undefined;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
    constructor();
    call(account?: string): Promise<CallResult>;
    call_with_witness(info: GuardInfo_forCall, account?: string): Promise<CallResponse | undefined>;
    protected check_permission_and_call(permission: string, permIndex: PermissionIndexType[], guards_needed: string[], checkOwner?: boolean, checkAdmin?: boolean, account?: string): Promise<CallResult>;
    protected exec(account?: string): Promise<CallResponse>;
    protected new_with_mark(txb: TransactionBlock, object: TxbAddress, named_new?: Namedbject, account?: string, innerTags?: string[]): Promise<void>;
    protected sign_and_commit(txb: TransactionBlock, account?: string): Promise<CallResponse>;
}
//# sourceMappingURL=base.d.ts.map