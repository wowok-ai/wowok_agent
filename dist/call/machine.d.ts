import { PassportObject, TransactionBlock, PermissionIndexType, ParentProgress, ProgressNext } from 'wowok';
import { AccountOrMark_Address, CallBase, CallResult, Namedbject, ObjectMain, ObjectsOp } from "./base.js";
export interface Supply {
    service: string;
    bRequired?: boolean;
}
export interface Machine_Forward {
    name: string;
    namedOperator?: string;
    permission?: PermissionIndexType;
    weight?: number;
    guard?: string;
    suppliers?: Supply[];
}
export interface Machine_Node_Pair {
    prior_node: string;
    forwards: Machine_Forward[];
    threshold?: number;
}
export interface Machine_Node {
    name: string;
    pairs: Machine_Node_Pair[];
}
export interface ProgressDeliverable {
    msg: string;
    orders: string[];
}
export interface CallMachine_Data {
    object?: ObjectMain;
    progress_new?: {
        task_address?: string;
        namedNew?: Namedbject;
    };
    progress_context_repository?: {
        progress?: string;
        repository: string | null;
    };
    progress_namedOperator?: {
        progress?: string;
        data: {
            name: string;
            operators: AccountOrMark_Address[];
        }[];
    };
    progress_parent?: {
        progress?: string;
        parent: ParentProgress | null;
    };
    progress_hold?: {
        progress?: string;
        operation: ProgressNext;
        bHold: boolean;
        adminUnhold?: boolean;
    };
    progress_task?: {
        progress: string;
        task_address: string;
    };
    progress_next?: {
        progress: string;
        operation: ProgressNext;
        deliverable: ProgressDeliverable;
    };
    description?: string;
    endpoint?: string;
    consensus_repository?: ObjectsOp;
    nodes?: {
        op: 'add';
        data: Machine_Node[];
    } | {
        op: 'remove';
        names: string[];
        bTransferMyself?: boolean;
    } | {
        op: 'rename node';
        data: {
            old: string;
            new: string;
        }[];
    } | {
        op: 'add from myself';
        addresses: string[];
    } | {
        op: 'remove pair';
        pairs: {
            prior_node_name: string;
            node_name: string;
        }[];
    } | {
        op: 'add forward';
        data: {
            prior_node_name: string;
            node_name: string;
            forward: Machine_Forward;
            threshold?: number;
            remove_forward?: string;
        }[];
    } | {
        op: 'remove forward';
        data: {
            prior_node_name: string;
            node_name: string;
            forward_name: string;
        }[];
    };
    bPublished?: boolean;
    bPaused?: boolean;
    clone_new?: {
        namedNew?: Namedbject;
    };
}
export declare class CallMachine extends CallBase {
    data: CallMachine_Data;
    object_address: string | undefined;
    permission_address: string | undefined;
    constructor(data: CallMachine_Data);
    private resolveForward;
    protected prepare(): Promise<void>;
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=machine.d.ts.map