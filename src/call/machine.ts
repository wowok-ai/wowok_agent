import { PassportObject, Errors, ERROR, Permission, PermissionIndex, TransactionBlock, TxbAddress,
    PermissionIndexType, Machine, Machine_Forward as Wowok_Machine_Forward, Machine_Node_Pair as Wowok_Machine_Node_Pair,
    Machine_Node as Wowok_Machine_Node, ParentProgress, Progress, ProgressNext, PermissionObject, OrderWrap, Service, ServiceWrap,
} from 'wowok';
import { AccountOrMark_Address, CallBase, CallResult, GetManyAccountOrMark_Address, GetObjectExisted, GetObjectMain, 
    GetObjectParam, Namedbject, ObjectMain, ObjectsOp, TypeNamedObjectWithPermission } from "./base.js";
import { ObjectMachine, query_objects } from '../query/objects.js';
import { LocalMark } from '../local/local.js';
import { Account } from '../local/account.js';

export interface Supply {
    service: string;
    bRequired?: boolean; // If true, An order at least must be placed from this service provider
}
export interface Machine_Forward {
    name: string; // foward name
    namedOperator?: string; // dynamic operator
    permission?: PermissionIndexType; // this.permission-index or named-operator MUST one defined.
    weight?: number;
    guard?: string;
    suppliers?: Supply[]; // List of service providers
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

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallMachine_Data {
    object?: ObjectMain;
    progress_new?: {task_address?:string, namedNew?: Namedbject};
    progress_context_repository?: {progress?:string; repository:string | null};
    progress_namedOperator?: {progress?:string; data:{name:string, operators:AccountOrMark_Address[]}[]};
    progress_parent?: {progress?:string, parent:ParentProgress | null};
    progress_hold?: {progress?:string; operation:ProgressNext; bHold:boolean; adminUnhold?:boolean};
    progress_task?: {progress:string; task_address:string};
    progress_next?: {progress:string; operation:ProgressNext; deliverable:ProgressDeliverable};

    description?: string;
    endpoint?: string;
    consensus_repository?: ObjectsOp;
    nodes?: {op: 'add'; data: Machine_Node[]} | {op: 'remove'; names: string[], bTransferMyself?:boolean} 
    | {op:'rename node'; data:{old:string; new:string}[]} | {op:'add from myself'; addresses: string[]}
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

    private async resolveForward(forward:Machine_Forward) : Promise<Wowok_Machine_Forward> {
        const res:ServiceWrap[] = [];
        if (forward?.suppliers && forward.suppliers?.length > 0) {
            const r = await query_objects({objects:forward.suppliers.map(v=>v.service)});
            for (let i=0; r.objects && i<r.objects?.length; ++ i) {
                if (r.objects[i]?.type === 'Service') {
                    res.push({object:r.objects[i].object, bRequired:forward.suppliers[i].bRequired, 
                        pay_token_type:Service.parseObjectType(r.objects[i].type_raw)});
                }
            }
        }
        return {name:forward.name, namedOperator:forward.namedOperator, permission:forward.permission, 
            weight:forward.weight, guard:forward.guard, suppliers:res.length > 0 ? res: undefined};
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

    async call(account?:string) : Promise<CallResult>  {
        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = []; 
        
        await this.prepare();
        if (this.permission_address) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.machine)
            }
            if (this.data?.description != null && this.object_address) {
                perms.push(PermissionIndex.machine_description)
            }
            if (this.data?.endpoint != null && this.object_address) {
                perms.push(PermissionIndex.machine_endpoint)
            }
            if (this.data?.consensus_repository != null) {
                perms.push(PermissionIndex.machine_repository)
            }
            if (this.data?.nodes != null) {
                perms.push(PermissionIndex.machine_node)
            }
            if (this.data?.bPublished) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.machine_publish)
            }
            if (this.data?.progress_new != null) {
                perms.push(PermissionIndex.progress)
            }
            if (this.data?.progress_context_repository != null) {
                perms.push(PermissionIndex.progress_context_repository)
            }
            if (this.data?.progress_namedOperator != null) {
                perms.push(PermissionIndex.progress_namedOperator)
            }
            if (this.data?.progress_parent != null) {
                perms.push(PermissionIndex.progress_parent)
            }
            if (this.data?.progress_task != null) {
                perms.push(PermissionIndex.progress_bind_task)
            }
            if (this.data?.progress_hold != null) {
                if (this.data.progress_hold.adminUnhold) {
                    perms.push(PermissionIndex.progress_unhold)
                } 
            }
            if (this.data?.bPaused != null) {
                perms.push(PermissionIndex.machine_pause)
            }
            if (this.data?.clone_new!= null) {
                perms.push(PermissionIndex.machine_clone)
            }

            if (this.data?.progress_next != null) {
                if (this.object_address) { // fetch guard
                    const [p, acc] = await Promise.all([
                        LocalMark.Instance().get_address(this.data?.progress_next.progress), 
                        Account.Instance().get(account)]);

                    if (!p) ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_next.progress');
                    if (!acc) ERROR(Errors.InvalidParam, 'CallMachine_Data.account');
  
                    const guard = await Progress.QueryForwardGuard(p, this.object_address, acc.address, 
                        this.data.progress_next.operation.next_node_name, this.data.progress_next.operation.forward);
                    if (guard) {
                        guards.push(guard);
                    }                        
                }
            }

            return await this.check_permission_and_call(this.permission_address, perms, guards, checkOwner, undefined, account)
        }
        return await this.exec(account);
    }

    protected async operate(txb:TransactionBlock, passport?:PassportObject, account?:string) {
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
            const task = await LocalMark.Instance().get_address(this.data?.progress_new?.task_address);
            new_progress = Progress?.New(txb, obj?.get_object(), permission, task, pst);
        }
        if (this.data?.progress_context_repository != null) {
            const p = this.data?.progress_context_repository.progress 
                ? await LocalMark.Instance().get_address(this.data?.progress_context_repository.progress)
                : new_progress?.get_object();
            if (!p) ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_context_repository.progress');
            const rep = await LocalMark.Instance().get_address(this.data?.progress_context_repository.repository);
            Progress.From(txb, obj?.get_object(), permission, p!).set_context_repository(rep, pst)
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
            const p = this.data?.progress_hold.progress 
                ? await LocalMark.Instance().get_address(this.data?.progress_hold.progress)
                : new_progress?.get_object();
            if (!p) ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_hold.progress');

            if (this.data?.progress_hold.adminUnhold) {
                Progress.From(txb, obj?.get_object(), permission, p!).unhold(this.data.progress_hold.operation, pst)
            } else {
                Progress.From(txb, obj?.get_object(), permission, p!).hold(this.data.progress_hold.operation, this.data.progress_hold.bHold)
            }
        }            
        if (this.data?.progress_task != null) {
            const [p, task] = await LocalMark.Instance().get_many_address([this.data?.progress_task.progress, this.data?.progress_task.task_address]);
            if (p && task) Progress.From(txb, obj?.get_object(), permission, p).bind_task(task, pst);
        }
        if (this.data?.progress_next != null) {
            const p = await LocalMark.Instance().get_address(this.data?.progress_next.progress);
            if (!p) ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_next.progress');
            var t: OrderWrap[] = [];

            if (this.data.progress_next.deliverable.orders.length > 0) {
                const o = await query_objects({objects:this.data.progress_next.deliverable.orders});
                if (o?.objects?.length !== this.data.progress_next.deliverable.orders.length) {
                    ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_next.deliverable.orders');
                }                
                t = o.objects.map(v => {
                    if (v.type !== 'Order') {
                        ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_next.deliverable.orders');
                    }
                    return {object:v.object, pay_token_type:Service.parseOrderObjectType(v.type_raw)}
                })
            }
            Progress.From(txb, obj?.get_object(), permission, p!).next(this.data.progress_next.operation, 
                {msg:this.data.progress_next.deliverable.msg, orders:t}, pst);
        }

        const addr = new_progress?.launch();
        if (addr) {
            await this.new_with_mark('Progress', txb, addr, this.data?.progress_new?.namedNew, account);
        }

        if (this.data?.description != null && this.object_address) {
            obj?.set_description(this.data.description, pst);
        }
        if (this.data?.endpoint != null && this.object_address) {
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
                    const nodes:Wowok_Machine_Node[] = [];
                    for (let i = 0; i < this.data.nodes.data.length; ++ i) {
                        const v = this.data.nodes.data[i];
                        const pairs : Wowok_Machine_Node_Pair[] = []; 
                        for (let j = 0; j < v.pairs.length; ++ j) {
                            const f : Wowok_Machine_Forward[] = [];

                            for(let k = 0; k < v.pairs[j].forwards.length; ++ k) {
                                f.push(await this.resolveForward(v.pairs[j].forwards[k]));                                
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
                    obj?.add_node(nodes, pst);
                    break;                    
                }
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
                    for (let i = 0; i < this.data.nodes.data.length; ++ i) {
                        const v = this.data.nodes.data[i];
                        obj?.add_forward(v.prior_node_name, v.node_name, 
                            await this.resolveForward(v.forward), v.threshold, v.remove_forward, pst);
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