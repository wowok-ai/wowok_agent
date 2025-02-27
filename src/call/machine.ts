import { PassportObject, IsValidAddress, Errors, ERROR, Permission, PermissionIndex, TransactionBlock, TxbAddress,
    PermissionIndexType, Machine, Machine_Forward, Machine_Node,  Deliverable, ParentProgress, Progress, ProgressNext,
} from 'wowok';
import { CallBase, CallResult, Namedbject } from "./base";
import { Account } from '../account';

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallMachine_Data {
    object?: {address:string} | {namedNew: Namedbject}; // undefined or {named_new...} for creating a new object
    permission?: {address:string} | {namedNew: Namedbject, description?:string}; 
    description?: string;
    endpoint?: string;
    consensus_repository?: {op:'set' | 'add' | 'remove' ; repositories:string[]} | {op:'removeall'};
    nodes?: {op: 'add'; data: Machine_Node[]} | {op: 'remove'; names: string[], bTransferMyself?:boolean} 
    | {op:'rename node'; data:{old:string; new:string}[]} | {op:'add from myself'; addresses: string[]}
    | {op:'remove pair'; pairs: {prior_node_name:string; node_name:string}[]}
    | {op:'add forward'; data: {prior_node_name:string; node_name:string; forward:Machine_Forward; threshold?:number; old_need_remove?:string}[]}
    | {op:'remove forward'; data:{prior_node_name:string; node_name:string; forward_name:string}[]}
    bPublished?: boolean;
    progress_new?: {task_address?:string; namedNew?: Namedbject};
    progress_context_repository?: {progress:string; repository:string};
    progress_namedOperator?: {progress:string; data:{name:string, operator:string[]}[]};
    progress_parent?: {progress:string, parent?:ParentProgress};
    progress_task?: {progress:string; task:string};
    progress_hold?: {progress:string; data:ProgressNext; bHold:boolean; adminUnhold?:boolean};
    progress_next?: {progress:string; data:ProgressNext; deliverable:Deliverable; guard?:string | 'fetch'};
    bPaused?: boolean;
    clone_new?: {namedNew: Namedbject/*, description?:string*/};
}
export class CallMachine extends CallBase { //@ todo self-owned node operate
    data: CallMachine_Data;
    constructor(data:CallMachine_Data) {
        super();
        this.data = data;
    }
    async call(account?:string) : Promise<CallResult>  {
        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = []; 
        const permission_address = (this.data?.permission as any)?.address;
        const object_address = (this.data?.object as any)?.address;

        if (permission_address && IsValidAddress(permission_address)) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.machine)
            }
            if (this.data?.description !== undefined && object_address) {
                perms.push(PermissionIndex.machine_description)
            }
            if (this.data?.endpoint !== undefined && object_address) {
                perms.push(PermissionIndex.machine_endpoint)
            }
            if (this.data?.consensus_repository !== undefined) {
                perms.push(PermissionIndex.machine_repository)
            }
            if (this.data?.nodes !== undefined) {
                perms.push(PermissionIndex.machine_node)
            }
            if (this.data?.bPublished) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.machine_publish)
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
            if (this.data?.bPaused !== undefined) {
                perms.push(PermissionIndex.machine_pause)
            }
            if (this.data?.progress_next?.guard !== undefined) {
                if (IsValidAddress(this.data?.progress_next?.guard)) {
                    guards.push(this.data?.progress_next?.guard)
                } else if (this.data?.object && IsValidAddress(object_address)) { // fetch guard
                    const guard = await Progress.QueryForwardGuard(this.data?.progress_next.progress, object_address, 
                        Account.Instance().get_address() ?? '0xe386bb9e01b3528b75f3751ad8a1e418b207ad979fea364087deef5250a73d3f', 
                        this.data.progress_next.data.next_node_name, this.data.progress_next.data.forward);
                    if (guard) {
                        guards.push(guard)
                    }
                }
            }

            return await this.check_permission_and_call(permission_address, perms, guards, checkOwner, undefined, account)
        }
        return await this.exec(account);
    }

    protected async operate(txb:TransactionBlock, passport?:PassportObject, account?:string) {
        let obj : Machine | undefined ; let permission: any;
        const permission_address = (this.data?.permission as any)?.address;
        const object_address = (this.data?.object as any)?.address;

        if (!object_address) {
            if (!permission_address || !IsValidAddress(permission_address)) {
                const d = (this.data?.permission as any)?.description ?? '';
                permission = Permission.New(txb, d);
            }
            obj = Machine.New(txb, permission ? permission.get_object() : permission_address, this.data?.description??'', this.data?.endpoint ?? '', permission?undefined:passport);
        } else {
            if (IsValidAddress(object_address) &&permission_address && IsValidAddress(permission_address)) {
                obj = Machine.From(txb, permission_address, object_address)
            } else {
                ERROR(Errors.InvalidParam, 'object or permission address invalid.')
            }
        }

        if (obj) {
            if (this.data?.description !== undefined && object_address) {
                obj?.set_description(this.data.description, passport);
            }
            if (this.data?.endpoint !== undefined && object_address) {
                obj?.set_endpoint(this.data.endpoint, passport)
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
            if (this.data?.bPublished ) {
                obj?.publish(passport)
            }
            if (this.data?.progress_new !== undefined) {
                const addr = Progress?.New(txb, obj?.get_object(), permission??this.data?.permission, this.data?.progress_new.task_address, passport).launch();
                if (addr) {
                    await this.new_with_mark(txb, addr, this.data?.progress_new?.namedNew, account);
                }
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
            if (this.data?.bPaused !== undefined) {
                obj?.pause(this.data.bPaused, passport)
            }
            if (this.data?.clone_new !== undefined && obj) {
                await this.new_with_mark(txb, obj?.clone(true, passport) as TxbAddress, (this.data?.clone_new as any)?.namedNew, account);
            }
            if (permission) {
                await this.new_with_mark(txb, permission.launch(), (this.data?.permission as any)?.namedNew, account);
            }
            if (!object_address) {
                await this.new_with_mark(txb, obj.launch(), (this.data?.object as any)?.namedNew, account);
            }
        }
    }
}       