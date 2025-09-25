import { PassportObject, Errors, ERROR, Permission, PermissionIndex, TransactionBlock, TxbAddress,
    PermissionIndexType, Machine, Machine_Forward, Machine_Node_Pair,
    Machine_Node, ParentProgress, Progress, ProgressNext, PermissionObject, Service,
    SupplierGuard,
} from 'wowok';
import { AccountOrMark_Address, CallBase, CallResult, GetManyAccountOrMark_Address, GetObjectExisted, GetObjectMain, 
    GetObjectParam, Namedbject, ObjectMain, ObjectsOp, PassportPayload, TypeNamedObjectWithPermission } from "./base.js";
import { ObjectMachine, ObjectProgress, query_objects, queryTableItem_MachineNode, TableItem_MachineNode } from '../query/objects.js';
import { LocalMark } from '../local/local.js';

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallMachine_Data {
    object?: ObjectMain;
    progress_new?: {task_address?:string|null, namedNew?: Namedbject};
    progress_context_repository?: {progress?:string; repository:string | null};
    progress_namedOperator?: {progress?:string; data:{name:string, operators:AccountOrMark_Address[]}[]};
    progress_parent?: {progress?:string, parent:ParentProgress | null};
    progress_hold?: {progress:string; operation:ProgressNext; bHold:boolean; adminUnhold?:boolean};
    progress_task?: {progress:string; task_address:string};
    progress_next?: {progress:string; operation:ProgressNext; deliverable:string};

    description?: string;
    endpoint?: string | null;
    consensus_repository?: ObjectsOp;
    nodes?: {op: 'add'; bReplace?: boolean, data: Machine_Node[]} | {op: 'remove'; names: string[]} 
    | {op:'rename node'; data:{old:string; new:string}[]} 
    | {op:'remove pair'; pairs: {prior_node_name:string; node_name:string}[]}
    | {op:'add forward'; data: {prior_node_name:string; node_name:string; forward:Machine_Forward; threshold?:number; remove_forward?:string}[]}
    | {op:'remove forward'; data:{prior_node_name:string; node_name:string; forward_name:string}[]}
    bPublished?: boolean;
    bPaused?: boolean;
    clone_new?: {namedNew?: Namedbject/*, description?:string*/};
}
export class CallMachine extends CallBase { //@ todo self-owned node operate
    data: CallMachine_Data;
    object_address: string | undefined = undefined;
    permission_address: string | undefined = undefined;

    constructor(data:CallMachine_Data) {
        super();
        this.data = data;
    }

    protected async prepare()  {
        if (!this.object_address) {
            this.object_address = (await LocalMark.Instance().get_address(GetObjectExisted(this.data?.object)));
        }

        if (this.object_address) {
            await this.update_content('Machine', this.object_address);
            if (!this.content) ERROR(Errors.InvalidParam, 'CallMachine_Data.data.object:' + this.object_address);
            this.permission_address = (this.content as ObjectMachine).permission;
        } else {
            const n = GetObjectMain(this.data?.object) as TypeNamedObjectWithPermission; 
            this.permission_address = (await LocalMark.Instance().get_address(GetObjectExisted(n?.permission)));
        } 
    }

    private checkPublished = (op: string)  => {
        if (this.content && !(this.content as ObjectMachine).bPublished) {
            ERROR(Errors.Fail, `Machine object has not been published yet, so the operation (${op}) cannot proceed.`);
        }
    }

    private checkNotPublished = (op: string)  => {
        if (this.content && (this.content as ObjectMachine)?.bPublished) {
            ERROR(Errors.Fail, `Machine object has been published and operation (${op}) cannot proceed. 
                If further modifications are needed, you can 'clone' a new Machine and then proceed with the operation.`);
        }
    }

    private checkNotPaused = (op: string)  => {
        if (this.content && (this.content as ObjectMachine).bPaused) {
            ERROR(Errors.Fail, `Machine object has been paused and operation (${op}) cannot proceed.`);
        }
    }

    private forwardPermission = async (progress:string, next_node_name:string, forward:string, 
        account?:string) : Promise<Machine_Forward | undefined> => {
        if (this.object_address) { // fetch guard
            const p = await query_objects({objects:[progress], no_cache:true});
            if (!p || !p.objects || p.objects.length !== 1 || p.objects[0].type !== 'Progress') {
                ERROR(Errors.InvalidParam, `CallMachine.forwardPermission.progress: ${progress}`);
            }
            const node = await queryTableItem_MachineNode({parent:this.object_address, name:next_node_name});
            if (node && node.type === 'TableItem_MachineNode') {
                const r = (node as TableItem_MachineNode).node.pairs.find(v => v.prior_node === (p!.objects![0] as ObjectProgress).current)?.forwards.find(v => v.name === forward);
                if (r) {
                    return {name:r.name, namedOperator:r.namedOperator, permission:r.permission,   
                        weight:r.weight, guard:r.guard };
                }
            }
        }
    }

    async call(account?:string) : Promise<CallResult>  {
        const guards : string[] = [];
        const perms : PermissionIndexType[] = []; 
        const add_perm = (index:PermissionIndex) => {
            if (this.permission_address && !perms.includes(index)) {
                perms.push(index);
            }
        }
        await this.prepare();
        
        if (!this.object_address) {
            add_perm(PermissionIndex.machine)
        }
        if (this.data?.description != null && this.object_address) {
            add_perm(PermissionIndex.machine_description)
        }
        if (this.data?.endpoint !== undefined && this.object_address) {
            add_perm(PermissionIndex.machine_endpoint)
        }
        if (this.data?.consensus_repository != null) {
            add_perm(PermissionIndex.machine_repository)
        }
        if (this.data?.nodes != null) {
            this.checkNotPublished(`nodes`);
            add_perm(PermissionIndex.machine_node)
        }
        if (this.data?.bPublished) { // publish is an irreversible one-time operation 
            add_perm(PermissionIndex.machine_publish)
        }
        if (this.data?.progress_new != null) {
            this.checkPublished(`progress_new`);
            this.checkNotPaused(`progress_new`);
            add_perm(PermissionIndex.progress)
        }
        if (this.data?.progress_context_repository != null) {
            this.checkPublished(`progress_context_repository`);
            add_perm(PermissionIndex.progress_context_repository)
        }
        if (this.data?.progress_namedOperator != null) {
            this.checkPublished(`progress_namedOperator`);
            add_perm(PermissionIndex.progress_namedOperator)
        }
        if (this.data?.progress_parent != null) {
            this.checkPublished(`progress_parent`);
            add_perm(PermissionIndex.progress_parent)
        }
        if (this.data?.progress_task != null) {
            this.checkPublished(`progress_task`);
            add_perm(PermissionIndex.progress_bind_task)
        }
        if (this.data?.progress_hold != null) {
            this.checkPublished(`progress_hold`);
            if (this.data.progress_hold.adminUnhold) {
                add_perm(PermissionIndex.progress_unhold)
            } else {
                const r = await this.forwardPermission(this.data.progress_hold?.progress, 
                    this.data.progress_hold?.operation?.next_node_name,
                    this.data.progress_hold?.operation?.forward,
                    account
                );
                /**if (r?.guard?.guard) { // Hold 无需supplier guard验证
                    guards.push(r.guard.guard as string)
                }*/
                if (r?.permission != null) {
                    add_perm(r.permission)
                }
                //@ todo check account in namedOperator?
            }
        }
        if (this.data?.bPaused != null) {
            add_perm(PermissionIndex.machine_pause)
        }
        if (this.data?.clone_new!= null) {
            add_perm(PermissionIndex.machine_clone)
        }

        if (this.data?.progress_next != null) {
            this.checkPublished(`progress_next`);

            const r = await this.forwardPermission(this.data.progress_next.progress, 
                this.data.progress_next?.operation?.next_node_name,
                this.data.progress_next?.operation?.forward,
                account
            );
            if (r?.guard?.guard) {
                guards.push(r.guard?.guard as string);
            }
            if (r?.permission != null) {
                add_perm(r.permission)
            }
        }
        if (this.permission_address || guards.length > 0) {
            return await this.check_permission_and_call(this.permission_address, perms, guards, undefined, undefined, undefined, account)
        }
        return await this.exec(account);
    }

    protected async operate(txb:TransactionBlock, passport?:PassportObject, payload?:PassportPayload[], account?:string) {
        let obj : Machine | undefined ; let perm: Permission | undefined;
        let permission : PermissionObject | undefined;
        
        if (this.object_address) {
            obj = Machine.From(txb, this.permission_address!, this.object_address);
            permission = this.permission_address;
        } else {
            const n = GetObjectMain(this.data?.object) as TypeNamedObjectWithPermission;
            permission = await LocalMark.Instance().get_address(GetObjectExisted(n?.permission));
            if (!permission) {
                perm = Permission.New(txb, GetObjectParam(n?.permission)?.description ?? '');
                permission =  perm.get_object();
            }
            
            obj = Machine.New(txb, permission, this.data?.description??'', 
                this.data?.endpoint, permission?undefined:passport);
        }

        if (!obj) ERROR(Errors.InvalidParam, 'CallMachine_Data.data.object');
        if (!permission) ERROR(Errors.InvalidParam, 'CallMachine_Data.data.object.permission');

        const pst = perm?undefined:passport;
        var new_progress : Progress | undefined;
        if (this.data?.progress_new != null) {
            if (!this.data.progress_new.task_address) {
                new_progress = Progress?.New(txb, obj?.get_object(), permission, undefined, pst);
            } else {
                const task = await LocalMark.Instance().get_address(this.data?.progress_new?.task_address);
                if (!task) ERROR(Errors.InvalidParam, `CallMachine_Data.data.progress_new.task_address: ${this.data?.progress_new?.task_address}`);
                new_progress = Progress?.New(txb, obj?.get_object(), permission, task, pst);
            }
        }
        if (this.data?.progress_context_repository != null) {
            const p = this.data?.progress_context_repository.progress 
                ? await LocalMark.Instance().get_address(this.data?.progress_context_repository.progress)
                : new_progress?.get_object();
            if (!p) ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_context_repository.progress');
            if (!this.data.progress_context_repository.repository) {

                Progress.From(txb, obj?.get_object(), permission, p!).set_context_repository(undefined, pst);
            } else {
                const rep = await LocalMark.Instance().get_address(this.data?.progress_context_repository.repository);
                if (!rep) ERROR(Errors.InvalidParam, `CallMachine_Data.data.progress_context_repository.repository ${this.data?.progress_context_repository.repository}`);
                Progress.From(txb, obj?.get_object(), permission, p!).set_context_repository(rep, pst)
            }
        }
        if (this.data?.progress_namedOperator != null) {
            const p = this.data?.progress_namedOperator.progress 
                ? await LocalMark.Instance().get_address(this.data?.progress_namedOperator.progress)
                : new_progress?.get_object();
            if (!p) ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_namedOperator.progress');

            let pp = Progress.From(txb, obj?.get_object(), permission, p!);
            for(let i=0; i<this.data.progress_namedOperator.data.length; i++) {
                const v = this.data.progress_namedOperator.data[i];
                const addrs = await GetManyAccountOrMark_Address(v.operators);
                pp.set_namedOperator(v.name, addrs, pst);
            }
        }
        if (this.data?.progress_parent != null) {
            const p = this.data?.progress_parent.progress 
                ? await LocalMark.Instance().get_address(this.data?.progress_parent.progress)
                : new_progress?.get_object();
            if (!p) ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_parent.progress');

            if (this.data.progress_parent.parent) {
                const parent = await LocalMark.Instance().get_address(this.data.progress_parent.parent?.parent_id);
                if (parent) {
                    this.data.progress_parent.parent.parent_id = parent;
                    Progress.From(txb, obj?.get_object(), permission, p!).parent(this.data.progress_parent.parent);
                }
            } else {
                Progress.From(txb, obj?.get_object(), permission, p!).parent_none();
            }
        }
        if (this.data?.progress_hold != null) {
            const p = await LocalMark.Instance().get_address(this.data?.progress_hold.progress);
            if (!p) ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_hold.progress');

            if (this.data?.progress_hold.adminUnhold) {
                Progress.From(txb, obj?.get_object(), permission, p!).unhold(this.data.progress_hold.operation, pst)
            } else {
                Progress.From(txb, obj?.get_object(), permission, p!).hold(this.data.progress_hold.operation, this.data.progress_hold.bHold, pst)
            }
        }            
        if (this.data?.progress_task != null) {
            const [p, task] = await LocalMark.Instance().get_many_address([this.data?.progress_task.progress, this.data?.progress_task.task_address]);
            if (p && task) Progress.From(txb, obj?.get_object(), permission, p).bind_task(task, pst);
        }
        if (this.data?.progress_next != null) {
            const p = await LocalMark.Instance().get_address(this.data?.progress_next.progress);
            if (!p) ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_next.progress');

            Progress.From(txb, obj?.get_object(), permission, p!).next(this.data.progress_next.operation, 
                this.data.progress_next.deliverable, pst);
        }

        const addr = new_progress?.launch();
        if (addr) {
            await this.new_with_mark('Progress', txb, addr, this.data?.progress_new?.namedNew, account);
        }

        if (this.data?.description != null && this.object_address) {
            obj?.set_description(this.data.description, pst);
        }
        if (this.data?.endpoint !== undefined && this.object_address) {
            obj?.set_endpoint(this.data.endpoint, pst)
        }

        if (this.data?.consensus_repository != null) {
            switch (this.data.consensus_repository.op) {
                case 'add': 
                case 'set':
                    if (this.data.consensus_repository.op === 'set') {
                        obj?.remove_repository([], true, pst);
                    }
                    var reps = await LocalMark.Instance().get_many_address2(this.data.consensus_repository.objects);
                    reps.forEach(v=>obj?.add_repository(v, pst)) ;
                    break;
                case 'remove': 
                    var reps = await LocalMark.Instance().get_many_address2(this.data.consensus_repository.objects);
                    if (reps.length > 0) {
                        obj?.remove_repository(reps, false, pst);
                    }
                    break;
                case 'removeall': 
                    obj?.remove_repository([], true, pst);
                    break;
            }
        }
        if (this.data?.nodes != null) {
            switch (this.data?.nodes?.op) {
                case 'add': {
                    const nodes:Machine_Node[] = [];
                    for (let i = 0; i < this.data.nodes.data.length; ++ i) {
                        const v = this.data.nodes.data[i];
                        const pairs : Machine_Node_Pair[] = []; 
                        for (let j = 0; j < v.pairs.length; ++ j) {
                            const f : Machine_Forward[] = [];

                            for(let k = 0; k < v.pairs[j].forwards.length; ++ k) {
                                f.push(v.pairs[j].forwards[k]);                                
                            }

                            pairs.push({
                                prior_node: v.pairs[j].prior_node,
                                threshold: v.pairs[j].threshold,
                                forwards: f,
                            })
                        }
                        nodes.push({
                            name: v.name,
                            pairs: pairs,
                        })
                    }
                    obj?.add_node(nodes, this.data.nodes?.bReplace, pst);
                    break;                    
                }
                case 'remove':
                    obj?.remove_node(this.data.nodes.names, pst)
                    break;
                case 'rename node':
                    this.data.nodes.data.forEach(v => obj?.rename_node(v.old, v.new, pst));
                    break;
                case 'add forward':
                    for (let i = 0; i < this.data.nodes.data.length; ++ i) {
                        const v = this.data.nodes.data[i];
                        obj?.add_forward(v.prior_node_name, v.node_name, 
                            v.forward, v.threshold, v.remove_forward, pst);
                    }
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

        if (this.data?.bPaused != null) {
            obj?.pause(this.data.bPaused, pst)
        }
        if (this.data?.clone_new != null && this.object_address) {
            await this.new_with_mark('Machine', txb, obj?.clone(true, pst) as TxbAddress, (this.data?.clone_new as any)?.namedNew, account);
        }
        if (perm) {
            const n = GetObjectMain(this.data?.object) as TypeNamedObjectWithPermission;
            await this.new_with_mark('Permission', txb, perm.launch(), GetObjectParam(n?.permission), account);
        }
        if (!this.object_address) {
            await this.new_with_mark('Machine', txb, obj.launch(), GetObjectMain(this.data?.object), account);
        }
    }
}       