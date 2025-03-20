/**
 *  generate and launch a guard
 */
import { ContextType, OperatorType, ValueType, TransactionBlock, PassportObject } from "wowok";
import { CallBase, CallResult, Namedbject } from "./base";
export interface GuardConst {
    identifier: number;
    bWitness: boolean;
    value_type: ValueType;
    value?: any;
}
export type GuardNode = {
    identifier: number;
} | {
    query: number | string;
    object: string | number;
    parameters: GuardNode[];
} | {
    logic: OperatorType.TYPE_LOGIC_AS_U256_GREATER | OperatorType.TYPE_LOGIC_AS_U256_GREATER_EQUAL | OperatorType.TYPE_LOGIC_AS_U256_LESSER | OperatorType.TYPE_LOGIC_AS_U256_LESSER_EQUAL | OperatorType.TYPE_LOGIC_AS_U256_EQUAL | OperatorType.TYPE_LOGIC_EQUAL | OperatorType.TYPE_LOGIC_HAS_SUBSTRING | OperatorType.TYPE_LOGIC_NOT | OperatorType.TYPE_LOGIC_AND | OperatorType.TYPE_LOGIC_OR;
    parameters: GuardNode[];
} | {
    calc: OperatorType.TYPE_NUMBER_ADD | OperatorType.TYPE_NUMBER_DEVIDE | OperatorType.TYPE_NUMBER_MOD | OperatorType.TYPE_NUMBER_MULTIPLY | OperatorType.TYPE_NUMBER_SUBTRACT;
    parameters: GuardNode[];
} | {
    value_type: ValueType;
    value: any;
} | {
    identifier: number;
} | {
    context: ContextType.TYPE_CLOCK | ContextType.TYPE_GUARD | ContextType.TYPE_SIGNER;
};
export interface CallGuard_Data {
    namedNew?: Namedbject;
    description: string;
    table?: GuardConst[];
    root: GuardNode;
}
export declare class CallGuard extends CallBase {
    data: CallGuard_Data;
    constructor(data: CallGuard_Data);
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=guard.d.ts.map