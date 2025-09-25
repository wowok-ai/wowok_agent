import { PassportObject, TransactionBlock, Machine_Forward, Machine_Node, ParentProgress, ProgressNext } from 'wowok';
import { AccountOrMark_Address, CallBase, CallResult, Namedbject, ObjectMain, ObjectsOp, PassportPayload } from "./base.js";
export interface CallMachine_Data {
    object?: ObjectMain;
    progress_new?: {
        task_address?: string | null;
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
        progress: string;
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
        deliverable: string;
    };
    description?: string;
    endpoint?: string | null;
    consensus_repository?: ObjectsOp;
    nodes?: {
        op: 'add';
        bReplace?: boolean;
        data: Machine_Node[];
    } | {
        op: 'remove';
        names: string[];
    } | {
        op: 'rename node';
        data: {
            old: string;
            new: string;
        }[];
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
    protected prepare(): Promise<void>;
    private checkPublished;
    private checkNotPublished;
    private checkNotPaused;
    private forwardPermission;
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, payload?: PassportPayload[], account?: string): Promise<void>;
}
//# sourceMappingURL=machine.d.ts.map