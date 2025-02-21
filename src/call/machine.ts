import { PassportObject, IsValidAddress, Errors, ERROR, Permission, PermissionIndex, TransactionBlock,
    PermissionIndexType, Machine, Machine_Forward, Machine_Node,  Deliverable, ParentProgress, Progress, ProgressNext,
} from 'wowok';
import { CallBase, CallResult } from "./base";
import { Account } from '../account';

export interface CallMachine_Data {
    object?: string; // undefined for creating a new object
    permission?: string; 
    permission_new?: string;
    bPaused?: boolean;
    bPublished?: boolean;
    consensus_repository?: {op:'set' | 'add' | 'remove' ; repositories:string[]} | {op:'removeall'};
    description?: string;
    endpoint?: string;
    clone_new?: boolean;
    nodes?: {op: 'add'; data: Machine_Node[]} | {op: 'remove'; names: string[], bTransferMyself?:boolean} 
        | {op:'rename node'; data:{old:string; new:string}[]} | {op:'add from myself'; addresses: string[]}
        | {op:'remove pair'; pairs: {prior_node_name:string; node_name:string}[]}
        | {op:'add forward'; data: {prior_node_name:string; node_name:string; forward:Machine_Forward; threshold?:number; old_need_remove?:string}[]}
        | {op:'remove forward'; data:{prior_node_name:string; node_name:string; forward_name:string}[]}
    progress_new?: {task_address?:string; };
    progress_context_repository?: {progress:string; repository:string};
    progress_parent?: {progress:string, parent?:ParentProgress};
    progress_task?: {progress:string; task:string};
    progress_namedOperator?: {progress:string; data:{name:string, operator:string[]}[]};
    progress_hold?: {progress:string; data:ProgressNext; bHold:boolean; adminUnhold?:boolean};
    progress_next?: {progress:string; data:ProgressNext; deliverable:Deliverable; guard?:string | 'fetch'};
}
export class CallMachine extends CallBase { //@ todo self-owned node operate
    data: CallMachine_Data
    constructor(data:CallMachine_Data) {
        super();
        this.data = data;
    }
    async call(account?:string) : Promise<CallResult>  {
        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = []; 

        if (this.data?.permission && IsValidAddress(this.data.permission)) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.machine)
            }
            if (this.data?.permission_new !== undefined) {
                checkOwner = true;
            }
            if (this.data?.description !== undefined && this.data.object) {
                perms.push(PermissionIndex.machine_description)
            }
            if (this.data?.bPaused !== undefined) {
                perms.push(PermissionIndex.machine_pause)
            }
            if (this.data?.bPublished) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.machine_publish)
            }
            if (this.data?.endpoint !== undefined && this.data.object) {
                perms.push(PermissionIndex.machine_endpoint)
            }
            if (this.data?.consensus_repository !== undefined) {
                perms.push(PermissionIndex.machine_repository)
            }
            if (this.data?.clone_new !== undefined) {
                perms.push(PermissionIndex.machine_clone)
            }
            if (this.data?.nodes !== undefined) {
                perms.push(PermissionIndex.machine_node)
            }
            if (this.data?.progress_new !== undefined) {
                perms.push(PermissionIndex.progress)
            }
            if (this.data?.progress_context_repository !== undefined) {
                perms.push(PermissionIndex.progress_context_repository)
            }
            if (this.data?.progress_namedOperator !== undefined) {
                perms.push(PermissionIndex.progress_namedOperator)
            }
            if (this.data?.progress_parent !== undefined) {
                perms.push(PermissionIndex.progress_parent)
            }
            if (this.data?.progress_task !== undefined) {
                perms.push(PermissionIndex.progress_bind_task)
            }
            if (this.data?.progress_hold !== undefined) {
                if (this.data.progress_hold.adminUnhold) {
                    perms.push(PermissionIndex.progress_unhold)
                } 
            }
            if (this.data?.progress_next?.guard !== undefined) {
                if (IsValidAddress(this.data?.progress_next?.guard)) {
                    guards.push(this.data?.progress_next?.guard)
                } else if (this.data?.object && IsValidAddress(this.data.object)) { // fetch guard
                    const guard = await Progress.QueryForwardGuard(this.data?.progress_next.progress, this.data.object, 
                        Account.Instance().get_address() ?? '0xe386bb9e01b3528b75f3751ad8a1e418b207ad979fea364087deef5250a73d3f', 
                        this.data.progress_next.data.next_node_name, this.data.progress_next.data.forward);
                    if (guard) {
                        guards.push(guard)
                    }
                }
            }

            return await this.check_permission_and_call(this.data.permission, perms, guards, checkOwner, undefined, account)
        }
        return this.exec(account);
    }

    protected async operate(txb:TransactionBlock, passport?:PassportObject) {
        let obj : Machine | undefined ; let permission: any;
        if (!this.data.object) {
            if (!this.data?.permission || !IsValidAddress(this.data?.permission)) {
                permission = Permission.New(txb, '');
            }
            obj = Machine.New(txb, permission ?? this.data?.permission, this.data?.description??'', this.data?.endpoint ?? '', permission?undefined:passport);
        } else {
            if (IsValidAddress(this.data.object) && this.data.permission && IsValidAddress(this.data?.permission)) {
                obj = Machine.From(txb, this.data.permission, this.data.object)
            }
        }

        if (obj) {
            if (this.data?.description !== undefined && this.data.object) {
                obj?.set_description(this.data.description, passport);
            }
            if (this.data?.endpoint !== undefined && this.data.object) {
                obj?.set_endpoint(this.data.endpoint, passport)
            }
            if (this.data?.bPaused !== undefined) {
                obj?.pause(this.data.bPaused, passport)
            }
            if (this.data?.bPublished ) {
                obj?.publish(passport)
            }
            if (this.data?.clone_new) {
                obj?.clone(true, passport)
            }
            if (this.data?.consensus_repository !== undefined) {
                switch (this.data.consensus_repository.op) {
                    case 'add': 
                        this.data.consensus_repository.repositories.forEach(v=>obj?.add_repository(v, passport)) ;
                        break;
                    case 'remove': 
                        obj?.remove_repository(this.data.consensus_repository.repositories, false, passport);
                        break;
                    case 'removeall': 
                        obj?.remove_repository([], true, passport);
                        break;
                    case 'set':
                        obj?.remove_repository([], true, passport);
                        this.data.consensus_repository.repositories.forEach(v=>obj?.add_repository(v, passport)) ;
                        break;
                }
            }
            if (this.data?.nodes !== undefined) {
                switch (this.data?.nodes?.op) {
                    case 'add':
                        obj?.add_node(this.data.nodes.data, passport)
                        break;
                    case 'remove':
                        obj?.remove_node(this.data.nodes.names, this.data.nodes?.bTransferMyself, passport)
                        break;
                    case 'rename node':
                        this.data.nodes.data.forEach(v => obj?.rename_node(v.old, v.new, passport));
                        break;
                    case 'add from myself':
                        obj?.add_node2(this.data.nodes.addresses, passport);
                        break;
                    case 'add forward':
                        this.data.nodes.data.forEach(v => obj?.add_forward(v.prior_node_name, v.node_name, v.forward, v.threshold, v.old_need_remove, passport))
                        break;
                    case 'remove forward':
                        this.data.nodes.data.forEach(v => obj?.remove_forward(v.prior_node_name, v.node_name, v.forward_name, passport))
                        break;
                    }
            }
            if (this.data?.progress_new !== undefined) {
                Progress?.New(txb, obj?.get_object(), permission??this.data?.permission, this.data?.progress_new.task_address, passport).launch();
            }
            if (this.data?.progress_context_repository !== undefined) {
                Progress.From(txb, obj?.get_object(), permission??this.data?.permission, this.data?.progress_context_repository.progress)
                    .set_context_repository(this.data?.progress_context_repository.repository, passport)
            }
            if (this.data?.progress_namedOperator !== undefined) {
                const p = Progress.From(txb, obj?.get_object(), permission??this.data?.permission, this.data?.progress_namedOperator.progress);
                this.data.progress_namedOperator.data.forEach(v => p.set_namedOperator(v.name, v.operator, passport));
            }
            if (this.data?.progress_parent !== undefined) {
                if (this.data.progress_parent.parent) {
                    Progress.From(txb, obj?.get_object(), permission??this.data?.permission, this.data?.progress_parent.progress).parent(this.data.progress_parent.parent);
                } else {
                    Progress.From(txb, obj?.get_object(), permission??this.data?.permission, this.data?.progress_parent.progress).parent_none();
                }
            }
            if (this.data?.progress_task !== undefined) {
                Progress.From(txb, obj?.get_object(), permission??this.data?.permission, this.data?.progress_task.progress).bind_task(this.data.progress_task.task, passport)
            }
            if (this.data?.progress_hold !== undefined) {
                if (this.data?.progress_hold.adminUnhold) {
                    Progress.From(txb, obj?.get_object(), permission??this.data?.permission, this.data?.progress_hold.progress).unhold(this.data.progress_hold.data, passport)
                } else {
                    Progress.From(txb, obj?.get_object(), permission??this.data?.permission, this.data?.progress_hold.progress).hold(this.data.progress_hold.data, this.data.progress_hold.bHold)
                }
            }
            if (this.data?.progress_next !== undefined) {
                Progress.From(txb, obj?.get_object(), permission??this.data?.permission, this.data?.progress_next.progress).next(this.data.progress_next.data, this.data.progress_next.deliverable, passport)
            }
            if (this.data?.permission_new !== undefined ) {
                obj?.change_permission(this.data.permission_new);
            }
            if (permission) {
                permission.launch();
            }
            if (!this.data.object) {
                obj?.launch();
            }
        }
    }
}       