import { Errors, ERROR, Permission, PermissionIndex, Machine, Progress, Service, } from 'wowok';
import { CallBase, GetManyAccountOrMark_Address, GetObjectExisted, GetObjectMain, GetObjectParam } from "./base.js";
import { query_objects, queryTableItem_MachineNode } from '../query/objects.js';
import { LocalMark } from '../local/local.js';
export class CallMachine extends CallBase {
    constructor(data) {
        super();
        this.object_address = undefined;
        this.permission_address = undefined;
        this.checkPublished = (op) => {
            if (this.content && !this.content.bPublished) {
                ERROR(Errors.Fail, `Machine object has not been published yet, so the operation (${op}) cannot proceed.`);
            }
        };
        this.checkNotPublished = (op) => {
            if (this.content && this.content?.bPublished) {
                ERROR(Errors.Fail, `Machine object has been published and operation (${op}) cannot proceed. 
                If further modifications are needed, you can 'clone' a new Machine and then proceed with the operation.`);
            }
        };
        this.checkNotPaused = (op) => {
            if (this.content && this.content.bPaused) {
                ERROR(Errors.Fail, `Machine object has been paused and operation (${op}) cannot proceed.`);
            }
        };
        this.forwardPermission = async (progress, next_node_name, forward, account) => {
            if (this.object_address) { // fetch guard
                const p = await query_objects({ objects: [progress], no_cache: true });
                if (!p || !p.objects || p.objects.length !== 1 || p.objects[0].type !== 'Progress') {
                    ERROR(Errors.InvalidParam, `CallMachine.forwardPermission.progress: ${progress}`);
                }
                const node = await queryTableItem_MachineNode({ parent: this.object_address, name: next_node_name });
                if (node && node.type === 'TableItem_MachineNode') {
                    const r = node.node.pairs.find(v => v.prior_node === p.objects[0].current)?.forwards.find(v => v.name === forward);
                    if (r) {
                        return { name: r.name, namedOperator: r.namedOperator, permission: r.permission,
                            weight: r.weight, guard: r.guard, suppliers: r.suppliers?.map(v => {
                                return { service: v.object, bRequired: v.bRequired };
                            }) };
                    }
                }
            }
        };
        this.data = data;
    }
    async resolveForward(forward) {
        const res = [];
        if (forward?.suppliers && forward.suppliers?.length > 0) {
            const r = await query_objects({ objects: forward.suppliers.map(v => v.service) });
            for (let i = 0; r.objects && i < r.objects?.length; ++i) {
                if (r.objects[i]?.type === 'Service') {
                    res.push({ object: r.objects[i].object, bRequired: forward.suppliers[i].bRequired,
                        pay_token_type: Service.parseObjectType(r.objects[i].type_raw) });
                }
            }
        }
        return { name: forward.name, namedOperator: forward.namedOperator, permission: forward.permission,
            weight: forward.weight, guard: forward.guard, suppliers: res.length > 0 ? res : undefined };
    }
    async prepare() {
        if (!this.object_address) {
            this.object_address = (await LocalMark.Instance().get_address(GetObjectExisted(this.data?.object)));
        }
        if (this.object_address) {
            await this.update_content('Machine', this.object_address);
            if (!this.content)
                ERROR(Errors.InvalidParam, 'CallMachine_Data.data.object:' + this.object_address);
            this.permission_address = this.content.permission;
        }
        else {
            const n = GetObjectMain(this.data?.object);
            this.permission_address = (await LocalMark.Instance().get_address(GetObjectExisted(n?.permission)));
        }
    }
    async call(account) {
        var checkOwner = false;
        const guards = [];
        const perms = [];
        const add_perm = (index) => {
            if (this.permission_address && !perms.includes(index)) {
                perms.push(index);
            }
        };
        await this.prepare();
        if (!this.object_address) {
            add_perm(PermissionIndex.machine);
        }
        if (this.data?.description != null && this.object_address) {
            add_perm(PermissionIndex.machine_description);
        }
        if (this.data?.endpoint !== undefined && this.object_address) {
            add_perm(PermissionIndex.machine_endpoint);
        }
        if (this.data?.consensus_repository != null) {
            add_perm(PermissionIndex.machine_repository);
        }
        if (this.data?.nodes != null) {
            this.checkNotPublished(`nodes`);
            add_perm(PermissionIndex.machine_node);
        }
        if (this.data?.bPublished) { // publish is an irreversible one-time operation 
            add_perm(PermissionIndex.machine_publish);
        }
        if (this.data?.progress_new != null) {
            this.checkPublished(`progress_new`);
            this.checkNotPaused(`progress_new`);
            add_perm(PermissionIndex.progress);
        }
        if (this.data?.progress_context_repository != null) {
            this.checkPublished(`progress_context_repository`);
            add_perm(PermissionIndex.progress_context_repository);
        }
        if (this.data?.progress_namedOperator != null) {
            this.checkPublished(`progress_namedOperator`);
            add_perm(PermissionIndex.progress_namedOperator);
        }
        if (this.data?.progress_parent != null) {
            this.checkPublished(`progress_parent`);
            add_perm(PermissionIndex.progress_parent);
        }
        if (this.data?.progress_task != null) {
            this.checkPublished(`progress_task`);
            add_perm(PermissionIndex.progress_bind_task);
        }
        if (this.data?.progress_hold != null) {
            this.checkPublished(`progress_hold`);
            if (this.data.progress_hold.adminUnhold) {
                add_perm(PermissionIndex.progress_unhold);
            }
            else {
                const r = await this.forwardPermission(this.data.progress_hold?.progress, this.data.progress_hold?.operation?.next_node_name, this.data.progress_hold?.operation?.forward, account);
                if (r?.guard) {
                    guards.push(r.guard);
                }
                if (r?.permission != null) {
                    add_perm(r.permission);
                }
            }
        }
        if (this.data?.bPaused != null) {
            add_perm(PermissionIndex.machine_pause);
        }
        if (this.data?.clone_new != null) {
            add_perm(PermissionIndex.machine_clone);
        }
        if (this.data?.progress_next != null) {
            this.checkPublished(`progress_next`);
            const r = await this.forwardPermission(this.data.progress_next.progress, this.data.progress_next?.operation?.next_node_name, this.data.progress_next?.operation?.forward, account);
            if (r?.guard) {
                guards.push(r.guard);
            }
            if (r?.permission != null) {
                add_perm(r.permission);
            }
        }
        if (this.permission_address) {
            return await this.check_permission_and_call(this.permission_address, perms, guards, checkOwner, undefined, account);
        }
        return await this.exec(account);
    }
    async operate(txb, passport, account) {
        let obj;
        let perm;
        let permission;
        if (this.object_address) {
            obj = Machine.From(txb, this.permission_address, this.object_address);
            permission = this.permission_address;
        }
        else {
            const n = GetObjectMain(this.data?.object);
            permission = await LocalMark.Instance().get_address(GetObjectExisted(n?.permission));
            if (!permission) {
                perm = Permission.New(txb, GetObjectParam(n?.permission)?.description ?? '');
                permission = perm.get_object();
            }
            obj = Machine.New(txb, permission, this.data?.description ?? '', this.data?.endpoint, permission ? undefined : passport);
        }
        if (!obj)
            ERROR(Errors.InvalidParam, 'CallMachine_Data.data.object');
        if (!permission)
            ERROR(Errors.InvalidParam, 'CallMachine_Data.data.object.permission');
        const pst = perm ? undefined : passport;
        var new_progress;
        if (this.data?.progress_new != null) {
            if (!this.data.progress_new.task_address) {
                new_progress = Progress?.New(txb, obj?.get_object(), permission, undefined, pst);
            }
            else {
                const task = await LocalMark.Instance().get_address(this.data?.progress_new?.task_address);
                if (!task)
                    ERROR(Errors.InvalidParam, `CallMachine_Data.data.progress_new.task_address: ${this.data?.progress_new?.task_address}`);
                new_progress = Progress?.New(txb, obj?.get_object(), permission, task, pst);
            }
        }
        if (this.data?.progress_context_repository != null) {
            const p = this.data?.progress_context_repository.progress
                ? await LocalMark.Instance().get_address(this.data?.progress_context_repository.progress)
                : new_progress?.get_object();
            if (!p)
                ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_context_repository.progress');
            if (!this.data.progress_context_repository.repository) {
                Progress.From(txb, obj?.get_object(), permission, p).set_context_repository(undefined, pst);
            }
            else {
                const rep = await LocalMark.Instance().get_address(this.data?.progress_context_repository.repository);
                if (!rep)
                    ERROR(Errors.InvalidParam, `CallMachine_Data.data.progress_context_repository.repository ${this.data?.progress_context_repository.repository}`);
                Progress.From(txb, obj?.get_object(), permission, p).set_context_repository(rep, pst);
            }
        }
        if (this.data?.progress_namedOperator != null) {
            const p = this.data?.progress_namedOperator.progress
                ? await LocalMark.Instance().get_address(this.data?.progress_namedOperator.progress)
                : new_progress?.get_object();
            if (!p)
                ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_namedOperator.progress');
            let pp = Progress.From(txb, obj?.get_object(), permission, p);
            for (let i = 0; i < this.data.progress_namedOperator.data.length; i++) {
                const v = this.data.progress_namedOperator.data[i];
                const addrs = await GetManyAccountOrMark_Address(v.operators);
                pp.set_namedOperator(v.name, addrs, pst);
            }
        }
        if (this.data?.progress_parent != null) {
            const p = this.data?.progress_parent.progress
                ? await LocalMark.Instance().get_address(this.data?.progress_parent.progress)
                : new_progress?.get_object();
            if (!p)
                ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_parent.progress');
            if (this.data.progress_parent.parent) {
                const parent = await LocalMark.Instance().get_address(this.data.progress_parent.parent?.parent_id);
                if (parent) {
                    this.data.progress_parent.parent.parent_id = parent;
                    Progress.From(txb, obj?.get_object(), permission, p).parent(this.data.progress_parent.parent);
                }
            }
            else {
                Progress.From(txb, obj?.get_object(), permission, p).parent_none();
            }
        }
        if (this.data?.progress_hold != null) {
            const p = await LocalMark.Instance().get_address(this.data?.progress_hold.progress);
            if (!p)
                ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_hold.progress');
            if (this.data?.progress_hold.adminUnhold) {
                Progress.From(txb, obj?.get_object(), permission, p).unhold(this.data.progress_hold.operation, pst);
            }
            else {
                Progress.From(txb, obj?.get_object(), permission, p).hold(this.data.progress_hold.operation, this.data.progress_hold.bHold, pst);
            }
        }
        if (this.data?.progress_task != null) {
            const [p, task] = await LocalMark.Instance().get_many_address([this.data?.progress_task.progress, this.data?.progress_task.task_address]);
            if (p && task)
                Progress.From(txb, obj?.get_object(), permission, p).bind_task(task, pst);
        }
        if (this.data?.progress_next != null) {
            const p = await LocalMark.Instance().get_address(this.data?.progress_next.progress);
            if (!p)
                ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_next.progress');
            var t = [];
            if (this.data.progress_next.deliverable.orders.length > 0) {
                const o = await query_objects({ objects: this.data.progress_next.deliverable.orders });
                if (o?.objects?.length !== this.data.progress_next.deliverable.orders.length) {
                    ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_next.deliverable.orders');
                }
                t = o.objects.map(v => {
                    if (v.type !== 'Order') {
                        ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_next.deliverable.orders');
                    }
                    return { object: v.object, pay_token_type: Service.parseOrderObjectType(v.type_raw) };
                });
            }
            Progress.From(txb, obj?.get_object(), permission, p).next(this.data.progress_next.operation, { msg: this.data.progress_next.deliverable.msg, orders: t }, pst);
        }
        const addr = new_progress?.launch();
        if (addr) {
            await this.new_with_mark('Progress', txb, addr, this.data?.progress_new?.namedNew, account);
        }
        if (this.data?.description != null && this.object_address) {
            obj?.set_description(this.data.description, pst);
        }
        if (this.data?.endpoint !== undefined && this.object_address) {
            obj?.set_endpoint(this.data.endpoint, pst);
        }
        if (this.data?.consensus_repository != null) {
            switch (this.data.consensus_repository.op) {
                case 'add':
                case 'set':
                    if (this.data.consensus_repository.op === 'set') {
                        obj?.remove_repository([], true, pst);
                    }
                    var reps = await LocalMark.Instance().get_many_address2(this.data.consensus_repository.objects);
                    reps.forEach(v => obj?.add_repository(v, pst));
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
                    const nodes = [];
                    for (let i = 0; i < this.data.nodes.data.length; ++i) {
                        const v = this.data.nodes.data[i];
                        const pairs = [];
                        for (let j = 0; j < v.pairs.length; ++j) {
                            const f = [];
                            for (let k = 0; k < v.pairs[j].forwards.length; ++k) {
                                f.push(await this.resolveForward(v.pairs[j].forwards[k]));
                            }
                            pairs.push({
                                prior_node: v.pairs[j].prior_node,
                                threshold: v.pairs[j].threshold,
                                forwards: f,
                            });
                        }
                        nodes.push({
                            name: v.name,
                            pairs: pairs,
                        });
                    }
                    obj?.add_node(nodes, this.data.nodes?.bReplace, pst);
                    break;
                }
                case 'remove':
                    obj?.remove_node(this.data.nodes.names, pst);
                    break;
                case 'rename node':
                    this.data.nodes.data.forEach(v => obj?.rename_node(v.old, v.new, pst));
                    break;
                case 'add forward':
                    for (let i = 0; i < this.data.nodes.data.length; ++i) {
                        const v = this.data.nodes.data[i];
                        obj?.add_forward(v.prior_node_name, v.node_name, await this.resolveForward(v.forward), v.threshold, v.remove_forward, pst);
                    }
                    break;
                case 'remove forward':
                    this.data.nodes.data.forEach(v => obj?.remove_forward(v.prior_node_name, v.node_name, v.forward_name, pst));
                    break;
                case 'remove pair':
                    this.data.nodes.pairs.forEach(v => obj?.remove_pair(v.prior_node_name, v.node_name, pst));
                    break;
            }
        }
        if (this.data?.bPublished) {
            obj?.publish(passport);
        }
        if (this.data?.bPaused != null) {
            obj?.pause(this.data.bPaused, pst);
        }
        if (this.data?.clone_new != null && this.object_address) {
            await this.new_with_mark('Machine', txb, obj?.clone(true, pst), this.data?.clone_new?.namedNew, account);
        }
        if (perm) {
            const n = GetObjectMain(this.data?.object);
            await this.new_with_mark('Permission', txb, perm.launch(), GetObjectParam(n?.permission), account);
        }
        if (!this.object_address) {
            await this.new_with_mark('Machine', txb, obj.launch(), GetObjectMain(this.data?.object), account);
        }
    }
}
//# sourceMappingURL=machine.js.map