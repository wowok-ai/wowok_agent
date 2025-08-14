import { TxbAddress, PassportObject, PermissionIndexType, WitnessFill, CallResponse, TransactionBlock, WithdrawFee, TreasuryObject } from 'wowok';
import { ObjectBase, ObjectBaseType } from '../query/objects.js';
import { SessionOption } from '../common.js';
export interface Namedbject {
    name?: string;
    tags?: string[];
    useAddressIfNameExist?: boolean;
    onChain?: boolean;
}
export interface NamedObjectWithDescription extends Namedbject {
    description?: string;
}
export interface NamedObjectWithPermission extends Namedbject {
    permission?: ObjectParam;
}
export interface TypeNamedObjectWithPermission extends NamedObjectWithPermission {
    type_parameter: string;
}
export type ObjectTypedMain = string | TypeNamedObjectWithPermission;
export type ObjectMain = string | NamedObjectWithPermission;
export type ObjectPermissionMain = string | Namedbject;
export type ObjectParam = string | NamedObjectWithDescription;
export declare const GetObjectExisted: (object: ObjectMain | ObjectTypedMain | ObjectParam | ObjectPermissionMain | undefined) => string | undefined;
export declare const GetObjectMain: (object: ObjectMain | ObjectTypedMain | ObjectPermissionMain | undefined) => NamedObjectWithPermission | TypeNamedObjectWithPermission | Namedbject | undefined;
export declare const GetObjectParam: (object: ObjectParam | undefined) => NamedObjectWithDescription | undefined;
export type ObjectsOp = {
    op: 'set' | 'add' | 'remove';
    objects: string[];
} | {
    op: 'removeall';
};
export type AccountOrMark_Address = {
    name_or_address?: string;
    local_mark_first?: boolean;
};
export declare const GetAccountOrMark_Address: (entity?: AccountOrMark_Address) => Promise<string | undefined>;
export declare const GetManyAccountOrMark_Address: (entities: AccountOrMark_Address[]) => Promise<string[]>;
export interface PayParam {
    index: bigint | string | number;
    remark: string;
    for_object?: string;
    for_guard?: string;
}
export declare const SetWithdrawFee: (param: PayParam, treasury?: TreasuryObject) => Promise<WithdrawFee>;
export interface AddressMark {
    address: TxbAddress;
    name?: string;
    tags: string[];
}
export interface ResponseData extends ObjectBase {
    change: 'created' | 'mutated' | string;
}
export interface GuardInfo_forCall {
    guards: string[];
    witness: WitnessFill[];
}
export interface CallResponseError {
    error: string;
}
export type CallResult = GuardInfo_forCall | CallResponse | CallResponseError | undefined;
export declare function ResponseData(response: CallResult | undefined): ResponseData[];
export declare class CallBase {
    private resouceObject;
    private traceMarkNew;
    content: ObjectBase | undefined;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
    protected prepare(session?: SessionOption): Promise<void>;
    constructor();
    call(account?: string): Promise<CallResult>;
    call_with_witness(info: GuardInfo_forCall, account?: string): Promise<CallResponse | undefined>;
    protected check_permission_and_call(permission: string, permIndex: PermissionIndexType[], guards_needed: string[], checkOwner?: boolean, checkAdmin?: boolean, account?: string): Promise<CallResult>;
    protected exec(account?: string): Promise<CallResponse>;
    protected new_with_mark(type: ObjectBaseType, txb: TransactionBlock, object: TxbAddress, named_new?: Namedbject, account?: string, innerTags?: string[]): Promise<void>;
    protected update_content(type: ObjectBaseType, object?: string): Promise<void>;
    protected sign_and_commit(txb: TransactionBlock, account?: string): Promise<CallResponse>;
}
//# sourceMappingURL=base.d.ts.map