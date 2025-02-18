import { TransactionBlock, CallResponse} from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Permission, PermissionIndex, WitnessFill,
    PermissionIndexType, Machine, Machine_Forward, Machine_Node,  Deliverable, ParentProgress, Progress, ProgressNext,
} from 'wowok';
import { CallBase } from "./call";
import { Account } from '../account';

export class CallMachine extends CallBase { //@ todo self-owned node operate
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
    constructor(object: string | 'new' = 'new') { super(object) }
    async call(account?:string) : Promise<WitnessFill[] | CallResponse | undefined>   {
        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = []; 

        if (this?.permission && IsValidAddress(this.permission)) {
            if (this?.object === 'new') {
                perms.push(PermissionIndex.machine)
            }
            if (this?.permission_new !== undefined) {
                checkOwner = true;
            }
            if (this?.description !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.machine_description)
            }
            if (this?.bPaused !== undefined) {
                perms.push(PermissionIndex.machine_pause)
            }
            if (this?.bPublished) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.machine_publish)
            }
            if (this?.endpoint !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.machine_endpoint)
            }
            if (this?.consensus_repository !== undefined) {
                perms.push(PermissionIndex.machine_repository)
            }
            if (this?.clone_new !== undefined) {
                perms.push(PermissionIndex.machine_clone)
            }
            if (this?.nodes !== undefined) {
                perms.push(PermissionIndex.machine_node)
            }
            if (this?.progress_new !== undefined) {
                perms.push(PermissionIndex.progress)
            }
            if (this?.progress_context_repository !== undefined) {
                perms.push(PermissionIndex.progress_context_repository)
            }
            if (this?.progress_namedOperator !== undefined) {
                perms.push(PermissionIndex.progress_namedOperator)
            }
            if (this?.progress_parent !== undefined) {
                perms.push(PermissionIndex.progress_parent)
            }
            if (this?.progress_task !== undefined) {
                perms.push(PermissionIndex.progress_bind_task)
            }
            if (this?.progress_hold !== undefined) {
                if (this.progress_hold.adminUnhold) {
                    perms.push(PermissionIndex.progress_unhold)
                } 
            }
            if (this?.progress_next?.guard !== undefined) {
                if (IsValidAddress(this?.progress_next?.guard)) {
                    guards.push(this?.progress_next?.guard)
                } else if (this?.object && IsValidAddress(this.object)) { // fetch guard
                    const guard = await Progress.QueryForwardGuard(this?.progress_next.progress, this.object, 
                        Account.Instance().get_address() ?? '0xe386bb9e01b3528b75f3751ad8a1e418b207ad979fea364087deef5250a73d3f', 
                        this.progress_next.data.next_node_name, this.progress_next.data.forward);
                    if (guard) {
                        guards.push(guard)
                    }
                }
            }

            return await this.check_permission_and_call(this.permission, perms, guards, checkOwner, undefined, account)
        }
        return this.exec(account);
    }

    protected async operate(txb:TransactionBlock, passport?:PassportObject) {
        let obj : Machine | undefined ; let permission: any;
        if (this.object === 'new') {
            if (!this?.permission || !IsValidAddress(this?.permission)) {
                permission = Permission.New(txb, '');
            }
            obj = Machine.New(txb, permission ?? this?.permission, this?.description??'', this?.endpoint ?? '', permission?undefined:passport);
        } else {
            if (IsValidAddress(this.object) && this.permission && IsValidAddress(this?.permission)) {
                obj = Machine.From(txb, this.permission, this.object)
            }
        }

        if (obj) {
            if (this?.description !== undefined && this.object !== 'new') {
                obj?.set_description(this.description, passport);
            }
            if (this?.endpoint !== undefined && this.object !== 'new') {
                obj?.set_endpoint(this.endpoint, passport)
            }
            if (this?.bPaused !== undefined) {
                obj?.pause(this.bPaused, passport)
            }
            if (this?.bPublished ) {
                obj?.publish(passport)
            }
            if (this?.clone_new) {
                obj?.clone(true, passport)
            }
            if (this?.consensus_repository !== undefined) {
                switch (this.consensus_repository.op) {
                    case 'add': 
                        this.consensus_repository.repositories.forEach(v=>obj?.add_repository(v, passport)) ;
                        break;
                    case 'remove': 
                        obj?.remove_repository(this.consensus_repository.repositories, false, passport);
                        break;
                    case 'removeall': 
                        obj?.remove_repository([], true, passport);
                        break;
                    case 'set':
                        obj?.remove_repository([], true, passport);
                        this.consensus_repository.repositories.forEach(v=>obj?.add_repository(v, passport)) ;
                        break;
                }
            }
            if (this?.nodes !== undefined) {
                switch (this?.nodes?.op) {
                    case 'add':
                        obj?.add_node(this.nodes.data, passport)
                        break;
                    case 'remove':
                        obj?.remove_node(this.nodes.names, this.nodes?.bTransferMyself, passport)
                        break;
                    case 'rename node':
                        this.nodes.data.forEach(v => obj?.rename_node(v.old, v.new, passport));
                        break;
                    case 'add from myself':
                        obj?.add_node2(this.nodes.addresses, passport);
                        break;
                    case 'add forward':
                        this.nodes.data.forEach(v => obj?.add_forward(v.prior_node_name, v.node_name, v.forward, v.threshold, v.old_need_remove, passport))
                        break;
                    case 'remove forward':
                        this.nodes.data.forEach(v => obj?.remove_forward(v.prior_node_name, v.node_name, v.forward_name, passport))
                        break;
                    }
            }
            if (this?.progress_new !== undefined) {
                Progress?.New(txb, this?.object, permission??this?.permission, this?.progress_new.task_address, passport).launch();
            }
            if (this?.progress_context_repository !== undefined) {
                Progress.From(txb, this?.object, permission??this?.permission, this?.progress_context_repository.progress)
                    .set_context_repository(this?.progress_context_repository.repository, passport)
            }
            if (this?.progress_namedOperator !== undefined) {
                const p = Progress.From(txb, this?.object, permission??this?.permission, this?.progress_namedOperator.progress);
                this.progress_namedOperator.data.forEach(v => p.set_namedOperator(v.name, v.operator, passport));
            }
            if (this?.progress_parent !== undefined) {
                if (this.progress_parent.parent) {
                    Progress.From(txb, this?.object, permission??this?.permission, this?.progress_parent.progress).parent(this.progress_parent.parent);
                } else {
                    Progress.From(txb, this?.object, permission??this?.permission, this?.progress_parent.progress).parent_none();
                }
            }
            if (this?.progress_task !== undefined) {
                Progress.From(txb, this?.object, permission??this?.permission, this?.progress_task.progress).bind_task(this.progress_task.task, passport)
            }
            if (this?.progress_hold !== undefined) {
                if (this?.progress_hold.adminUnhold) {
                    Progress.From(txb, this?.object, permission??this?.permission, this?.progress_hold.progress).unhold(this.progress_hold.data, passport)
                } else {
                    Progress.From(txb, this?.object, permission??this?.permission, this?.progress_hold.progress).hold(this.progress_hold.data, this.progress_hold.bHold)
                }
            }
            if (this?.progress_next !== undefined) {
                Progress.From(txb, this?.object, permission??this?.permission, this?.progress_next.progress).next(this.progress_next.data, this.progress_next.deliverable, passport)
            }
            if (this?.permission_new !== undefined ) {
                obj?.change_permission(this.permission_new);
            }
            if (permission) {
                permission.launch();
            }
            if (this.object === 'new') {
                obj?.launch();
            }
        }
    }
}       