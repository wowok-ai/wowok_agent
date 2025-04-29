import { PassportObject, IsValidAddress, Errors, ERROR, Permission, PermissionIndex, TransactionBlock, TxbAddress,
    PermissionIndexType, Machine, Machine_Forward, Machine_Node,  Deliverable, ParentProgress, Progress, ProgressNext,
    ProgressObject,
} from 'wowok';
import { CallBase, CallResult, Namedbject } from "./base.js";
import { Account } from '../local/account.js';
import { ObjectMachine } from 'src/query/objects.js';
import { LocalMark } from 'src/local/local.js';

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallMachine_Data {
    object?: {address:string} | {namedNew?: Namedbject}; // undefined or {named_new...} for creating a new object
    permission?: {address:string} | {namedNew?: Namedbject, description?:string}; 
    description?: string;
    endpoint?: string;
    consensus_repository?: {op:'set' | 'add' | 'remove' ; repositories:string[]} | {op:'removeall'};
    nodes?: {op: 'add'; data: Machine_Node[]} | {op: 'remove'; names: string[], bTransferMyself?:boolean} 
    | {op:'rename node'; data:{old:string; new:string}[]} | {op:'add from myself'; addresses: string[]}
    | {op:'remove pair'; pairs: {prior_node_name:string; node_name:string}[]}
    | {op:'add forward'; data: {prior_node_name:string; node_name:string; forward:Machine_Forward; threshold?:number; remove_forward?:string}[]}
    | {op:'remove forward'; data:{prior_node_name:string; node_name:string; forward_name:string}[]}
    bPublished?: boolean;
    progress_new?: {task_address?:string; namedNew?: Namedbject};
    progress_context_repository?: {progress?:string; repository?:string};
    progress_namedOperator?: {progress?:string; data:{name:string, operators:string[]}[]};
    progress_parent?: {progress?:string, parent?:ParentProgress};
    progress_task?: {progress?:string; task:string};
    progress_hold?: {progress?:string; operation:ProgressNext; bHold:boolean; adminUnhold?:boolean};
    progress_next?: {progress:string; operation:ProgressNext; deliverable:Deliverable; guard?:string};
    bPaused?: boolean;
    clone_new?: {namedNew?: Namedbject/*, description?:string*/};
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
        var [permission_address, object_address] = 
            await LocalMark.Instance().get_many_address(
                [(this.data?.permission as any)?.address, 
                (this.data?.object as any)?.address]);

        if (object_address) {
            if (!permission_address) {
                await this.update_content(object_address, 'Machine');
                if (this.content) {
                    permission_address = (this.content as ObjectMachine).permission;     
                }
            } 
        } 

        if (permission_address) {
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
            if (this.data?.progress_next !== undefined) {
                const guard = await LocalMark.Instance().get_address(this.data?.progress_next?.guard);
                if (guard) {
                    guards.push(guard)
                } else if (object_address) { // fetch guard
                    const p = await LocalMark.Instance().get_address(this.data?.progress_next.progress);
                    if (p) {
                        const guard = await Progress.QueryForwardGuard(this.data?.progress_next.progress, object_address, 
                            await Account.Instance().default() ?? '0xe386bb9e01b3528b75f3751ad8a1e418b207ad979fea364087deef5250a73d3f', 
                            this.data.progress_next.operation.next_node_name, this.data.progress_next.operation.forward);
                        if (guard) {
                            guards.push(guard)
                        }                        
                    }
                }
            }

            return await this.check_permission_and_call(permission_address, perms, guards, checkOwner, undefined, account)
        }
        return await this.exec(account);
    }

    protected async operate(txb:TransactionBlock, passport?:PassportObject, account?:string) {
        let obj : Machine | undefined ; let permission: any;
        var [permission_address, object_address] = this?.content ? 
            [(this.content as ObjectMachine).permission, this.content.object] : 
            await LocalMark.Instance().get_many_address(
                [(this.data?.permission as any)?.address, 
                (this.data?.object as any)?.address]);

        if (!object_address) {
            if (!permission_address) {
                const d = (this.data?.permission as any)?.description ?? '';
                permission = Permission.New(txb, d);
            }
            obj = Machine.New(txb, permission ? permission.get_object() : permission_address, this.data?.description??'', this.data?.endpoint ?? '', permission?undefined:passport);
        } else {
            if (permission_address) {
                obj = Machine.From(txb, permission_address, object_address)
            } else {
                ERROR(Errors.InvalidParam, 'CallMachine_Data.data.permission')
            }
        }

        if (obj) {
            const perm = permission ? permission.get_object() : permission_address;
            const pst = permission?undefined:passport;

            if (this.data?.description !== undefined && object_address) {
                obj?.set_description(this.data.description, pst);
            }
            if (this.data?.endpoint !== undefined && object_address) {
                obj?.set_endpoint(this.data.endpoint, pst)
            }

            if (this.data?.consensus_repository !== undefined) {
                switch (this.data.consensus_repository.op) {
                    case 'add': 
                    case 'set':
                        if (this.data.consensus_repository.op === 'set') {
                            obj?.remove_repository([], true, pst);
                        }
                        var reps = await LocalMark.Instance().get_many_address2(this.data.consensus_repository.repositories);
                        reps.forEach(v=>obj?.add_repository(v, pst)) ;
                        break;
                    case 'remove': 
                        var reps = await LocalMark.Instance().get_many_address2(this.data.consensus_repository.repositories);
                        if (reps.length > 0) {
                            obj?.remove_repository(reps, false, pst);
                        }
                        break;
                    case 'removeall': 
                        obj?.remove_repository([], true, pst);
                        break;
                }
            }
            if (this.data?.nodes !== undefined) {
                switch (this.data?.nodes?.op) {
                    case 'add':
                        obj?.add_node(this.data.nodes.data, pst)
                        break;
                    case 'remove':
                        obj?.remove_node(this.data.nodes.names, this.data.nodes?.bTransferMyself, pst)
                        break;
                    case 'rename node':
                        this.data.nodes.data.forEach(v => obj?.rename_node(v.old, v.new, pst));
                        break;
                    case 'add from myself':
                        obj?.add_node2(this.data.nodes.addresses, pst);
                        break;
                    case 'add forward':
                        this.data.nodes.data.forEach(v => obj?.add_forward(v.prior_node_name, v.node_name, v.forward, v.threshold, v.remove_forward, pst))
                        break;
                    case 'remove forward':
                        this.data.nodes.data.forEach(v => obj?.remove_forward(v.prior_node_name, v.node_name, v.forward_name, pst))
                        break;
                    case 'remove pair':
                        this.data.nodes.pairs.forEach(v => obj?.remove_pair(v.prior_node_name, v.node_name, pst));
                        break;
                    }
            }
            if (this.data?.bPublished ) {
                obj?.publish(passport)
            }
            var new_progress : Progress | undefined;
            if (this.data?.progress_new !== undefined) {
                const task = await LocalMark.Instance().get_address(this.data?.progress_new.task_address);
                new_progress = Progress?.New(txb, obj?.get_object(), perm, task, pst);
            }
            if (this.data?.progress_context_repository !== undefined) {
                const p = this.data?.progress_context_repository.progress 
                    ? await LocalMark.Instance().get_address(this.data?.progress_context_repository.progress)
                    : new_progress?.get_object();
                if (!p) ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_context_repository.progress');
                const rep = await LocalMark.Instance().get_address(this.data?.progress_context_repository.repository);
                Progress.From(txb, obj?.get_object(), perm, p!).set_context_repository(rep, pst)
            }
            if (this.data?.progress_namedOperator !== undefined) {
                const p = this.data?.progress_namedOperator.progress 
                    ? await LocalMark.Instance().get_address(this.data?.progress_namedOperator.progress)
                    : new_progress?.get_object();
                if (!p) ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_namedOperator.progress');

                let pp = Progress.From(txb, obj?.get_object(), perm, p!);
                this.data.progress_namedOperator.data.forEach(v => pp.set_namedOperator(v.name, v.operators, pst));
            }
            if (this.data?.progress_parent !== undefined) {
                const p = this.data?.progress_parent.progress 
                    ? await LocalMark.Instance().get_address(this.data?.progress_parent.progress)
                    : new_progress?.get_object();
                if (!p) ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_parent.progress');

                if (this.data.progress_parent.parent) {
                    const parent = await LocalMark.Instance().get_address(this.data.progress_parent.parent.parent_id);
                    if (parent) {
                        this.data.progress_parent.parent.parent_id = parent;
                        Progress.From(txb, obj?.get_object(), perm, p!).parent(this.data.progress_parent.parent);
                    }
                } else {
                    Progress.From(txb, obj?.get_object(), perm, p!).parent_none();
                }
            }
            if (this.data?.progress_task !== undefined) {
                const p = this.data?.progress_task.progress 
                    ? await LocalMark.Instance().get_address(this.data?.progress_task.progress)
                    : new_progress?.get_object();
                if (!p) ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_task.progress');
                const task = await LocalMark.Instance().get_address(this.data.progress_task.task);
                if (task) Progress.From(txb, obj?.get_object(), perm, p!).bind_task(task, pst);
            }
            if (this.data?.progress_hold !== undefined) {
                const p = this.data?.progress_hold.progress 
                    ? await LocalMark.Instance().get_address(this.data?.progress_hold.progress)
                    : new_progress?.get_object();
                if (!p) ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_hold.progress');

                if (this.data?.progress_hold.adminUnhold) {
                    Progress.From(txb, obj?.get_object(), perm, p!).unhold(this.data.progress_hold.operation, pst)
                } else {
                    Progress.From(txb, obj?.get_object(), perm, p!).hold(this.data.progress_hold.operation, this.data.progress_hold.bHold)
                }
            }
            const addr = new_progress?.launch();
            if (addr) {
                await this.new_with_mark('Progress', txb, addr, this.data?.progress_new?.namedNew, account);
            }

            if (this.data?.progress_next !== undefined) {
                Progress.From(txb, obj?.get_object(), perm, this.data?.progress_next.progress).next(this.data.progress_next.operation, this.data.progress_next.deliverable, pst)
            }
            if (this.data?.bPaused !== undefined) {
                obj?.pause(this.data.bPaused, pst)
            }
            if (this.data?.clone_new !== undefined && object_address) {
                await this.new_with_mark('Machine', txb, obj?.clone(true, pst) as TxbAddress, (this.data?.clone_new as any)?.namedNew, account);
            }
            if (permission) {
                await this.new_with_mark('Permission', txb, permission.launch(), (this.data?.permission as any)?.namedNew, account);
            }
            if (!object_address) {
                await this.new_with_mark('Machine', txb, obj.launch(), (this.data?.object as any)?.namedNew, account);
            }
        }
    }
}       