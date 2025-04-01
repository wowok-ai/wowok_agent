import { PassportObject, TransactionBlock, Machine_Forward, Machine_Node, Deliverable, ParentProgress, ProgressNext } from 'wowok';
import { CallBase, CallResult, Namedbject } from "./base";
export interface CallMachine_Data {
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
    endpoint?: string;
    consensus_repository?: {
        op: 'set' | 'add' | 'remove';
        repositories: string[];
    } | {
        op: 'removeall';
    };
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
    progress_new?: {
        task_address?: string;
        namedNew?: Namedbject;
    };
    progress_context_repository?: {
        progress?: string;
        repository?: string;
    };
    progress_namedOperator?: {
        progress?: string;
        data: {
            name: string;
            operators: string[];
        }[];
    };
    progress_parent?: {
        progress?: string;
        parent?: ParentProgress;
    };
    progress_task?: {
        progress?: string;
        task: string;
    };
    progress_hold?: {
        progress?: string;
        operation: ProgressNext;
        bHold: boolean;
        adminUnhold?: boolean;
    };
    progress_next?: {
        progress: string;
        operation: ProgressNext;
        deliverable: Deliverable;
        guard?: string | 'fetch';
    };
    bPaused?: boolean;
    clone_new?: {
        namedNew: Namedbject;
    };
}
export declare class CallMachine extends CallBase {
    data: CallMachine_Data;
    constructor(data: CallMachine_Data);
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=machine.d.ts.map