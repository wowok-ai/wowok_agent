import { TxbAddress, PassportObject, PermissionIndexType, WitnessFill, CallResponse, TransactionBlock } from 'wowok';
import { ObjectBase, ObjectBaseType } from '../query/objects.js';
export interface Namedbject {
    name?: string;
    tags?: string[];
    useAddressIfNameExist?: boolean;
    onChain?: boolean;
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
    private resouceObject;
    private traceMarkNew;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
    constructor();
    call(account?: string): Promise<CallResult>;
    call_with_witness(info: GuardInfo_forCall, account?: string): Promise<CallResponse | undefined>;
    protected check_permission_and_call(permission: string, permIndex: PermissionIndexType[], guards_needed: string[], checkOwner?: boolean, checkAdmin?: boolean, account?: string): Promise<CallResult>;
    protected exec(account?: string): Promise<CallResponse>;
    protected new_with_mark(type: ObjectBaseType, txb: TransactionBlock, object: TxbAddress, named_new?: Namedbject, account?: string, innerTags?: string[]): Promise<void>;
    protected sign_and_commit(txb: TransactionBlock, address?: string): Promise<CallResponse>;
}
//# sourceMappingURL=base.d.ts.map