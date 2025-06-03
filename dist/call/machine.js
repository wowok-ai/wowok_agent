import { Errors, ERROR, Permission, PermissionIndex, Machine, Progress, } from 'wowok';
import { CallBase, GetObjectExisted, GetObjectMain, GetObjectParam } from "./base.js";
import { LocalMark } from '../local/local.js';
import { Account } from '../local/account.js';
export class CallMachine extends CallBase {
    constructor(data) {
        super();
        this.object_address = undefined;
        this.permission_address = undefined;
        this.data = data;
    }
    async call(account) {
        var checkOwner = false;
        const guards = [];
        const perms = [];
        this.object_address = (await LocalMark.Instance().get_address(GetObjectExisted(this.data?.object)));
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
        if (this.permission_address) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.machine);
            }
            if (this.data?.description !== undefined && this.object_address) {
                perms.push(PermissionIndex.machine_description);
            }
            if (this.data?.endpoint !== undefined && this.object_address) {
                perms.push(PermissionIndex.machine_endpoint);
            }
            if (this.data?.consensus_repository !== undefined) {
                perms.push(PermissionIndex.machine_repository);
            }
            if (this.data?.nodes !== undefined) {
                perms.push(PermissionIndex.machine_node);
            }
            if (this.data?.bPublished) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.machine_publish);
            }
            if (this.data?.progress_new !== undefined) {
                perms.push(PermissionIndex.progress);
            }
            if (this.data?.progress_context_repository !== undefined) {
                perms.push(PermissionIndex.progress_context_repository);
            }
            if (this.data?.progress_namedOperator !== undefined) {
                perms.push(PermissionIndex.progress_namedOperator);
            }
            if (this.data?.progress_parent !== undefined) {
                perms.push(PermissionIndex.progress_parent);
            }
            if (this.data?.progress_task !== undefined) {
                perms.push(PermissionIndex.progress_bind_task);
            }
            if (this.data?.progress_hold !== undefined) {
                if (this.data.progress_hold.adminUnhold) {
                    perms.push(PermissionIndex.progress_unhold);
                }
            }
            if (this.data?.bPaused !== undefined) {
                perms.push(PermissionIndex.machine_pause);
            }
            if (this.data?.clone_new !== undefined) {
                perms.push(PermissionIndex.machine_clone);
            }
            if (this.data?.progress_next !== undefined) {
                if (this.object_address) { // fetch guard
                    const [p, acc] = await Promise.all([
                        LocalMark.Instance().get_address(this.data?.progress_next.progress),
                        Account.Instance().get(account)
                    ]);
                    if (!p)
                        ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_next.progress');
                    if (!acc)
                        ERROR(Errors.InvalidParam, 'CallMachine_Data.account');
                    const guard = await Progress.QueryForwardGuard(p, this.object_address, acc.address, this.data.progress_next.operation.next_node_name, this.data.progress_next.operation.forward);
                    if (guard) {
                        guards.push(guard);
                    }
                }
            }
            return await this.check_permission_and_call(this.permission_address, perms, guards, checkOwner, undefined, account);
        }
        return await this.exec(account);
    }
    async operate(txb, passport, account) {
        let obj;
        let permission;
        if (this.object_address) {
            obj = Machine.From(txb, this.permission_address, this.object_address);
        }
        else {
            const n = GetObjectMain(this.data?.object);
            if (!this.permission_address) {
                permission = Permission.New(txb, GetObjectParam(n?.permission)?.description ?? '');
            }
            obj = Machine.New(txb, permission ? permission.get_object() : this.permission_address, this.data?.description ?? '', this.data?.endpoint, permission ? undefined : passport);
        }
        if (obj) {
            const pst = permission ? undefined : passport;
            const perm = permission ? permission.get_object() : this.permission_address;
            var new_progress;
            if (this.data?.progress_new !== undefined) {
                const task = await LocalMark.Instance().get_address(this.data?.progress_new?.task_address);
                new_progress = Progress?.New(txb, obj?.get_object(), perm, task, pst);
            }
            if (this.data?.progress_context_repository !== undefined) {
                const p = this.data?.progress_context_repository.progress
                    ? await LocalMark.Instance().get_address(this.data?.progress_context_repository.progress)
                    : new_progress?.get_object();
                if (!p)
                    ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_context_repository.progress');
                const rep = await LocalMark.Instance().get_address(this.data?.progress_context_repository.repository);
                Progress.From(txb, obj?.get_object(), perm, p).set_context_repository(rep, pst);
            }
            if (this.data?.progress_namedOperator !== undefined) {
                const p = this.data?.progress_namedOperator.progress
                    ? await LocalMark.Instance().get_address(this.data?.progress_namedOperator.progress)
                    : new_progress?.get_object();
                if (!p)
                    ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_namedOperator.progress');
                let pp = Progress.From(txb, obj?.get_object(), perm, p);
                this.data.progress_namedOperator.data.forEach(v => pp.set_namedOperator(v.name, v.operators, pst));
            }
            if (this.data?.progress_parent !== undefined) {
                const p = this.data?.progress_parent.progress
                    ? await LocalMark.Instance().get_address(this.data?.progress_parent.progress)
                    : new_progress?.get_object();
                if (!p)
                    ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_parent.progress');
                if (this.data.progress_parent.parent) {
                    const parent = await LocalMark.Instance().get_address(this.data.progress_parent.parent.parent_id);
                    if (parent) {
                        this.data.progress_parent.parent.parent_id = parent;
                        Progress.From(txb, obj?.get_object(), perm, p).parent(this.data.progress_parent.parent);
                    }
                }
                else {
                    Progress.From(txb, obj?.get_object(), perm, p).parent_none();
                }
            }
            if (this.data?.progress_hold !== undefined) {
                const p = this.data?.progress_hold.progress
                    ? await LocalMark.Instance().get_address(this.data?.progress_hold.progress)
                    : new_progress?.get_object();
                if (!p)
                    ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_hold.progress');
                if (this.data?.progress_hold.adminUnhold) {
                    Progress.From(txb, obj?.get_object(), perm, p).unhold(this.data.progress_hold.operation, pst);
                }
                else {
                    Progress.From(txb, obj?.get_object(), perm, p).hold(this.data.progress_hold.operation, this.data.progress_hold.bHold);
                }
            }
            if (this.data?.progress_task !== undefined) {
                const [p, task] = await LocalMark.Instance().get_many_address([this.data?.progress_task.progress, this.data?.progress_task.task_address]);
                if (p && task)
                    Progress.From(txb, obj?.get_object(), perm, p).bind_task(task, pst);
            }
            if (this.data?.progress_next !== undefined) {
                const p = await LocalMark.Instance().get_address(this.data?.progress_next.progress);
                if (!p)
                    ERROR(Errors.InvalidParam, 'CallMachine_Data.data.progress_next.progress');
                Progress.From(txb, obj?.get_object(), perm, p).next(this.data.progress_next.operation, this.data.progress_next.deliverable, pst);
            }
            const addr = new_progress?.launch();
            if (addr) {
                await this.new_with_mark('Progress', txb, addr, this.data?.progress_new?.namedNew, account);
            }
            if (this.data?.description !== undefined && this.object_address) {
                obj?.set_description(this.data.description, pst);
            }
            if (this.data?.endpoint !== undefined && this.object_address) {
                obj?.set_endpoint(this.data.endpoint, pst);
            }
            if (this.data?.consensus_repository !== undefined) {
                switch (this.data.consensus_repository.op) {
                    case 'add':
                    case 'set':
                        if (this.data.consensus_repository.op === 'set') {
                            obj?.remove_repository([], true, pst);
                        }
                        var reps = await LocalMark.Instance().get_many_address2(this.data.consensus_repository.repositories);
                        reps.forEach(v => obj?.add_repository(v, pst));
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
                        obj?.add_node(this.data.nodes.data, pst);
                        break;
                    case 'remove':
                        obj?.remove_node(this.data.nodes.names, this.data.nodes?.bTransferMyself, pst);
                        break;
                    case 'rename node':
                        this.data.nodes.data.forEach(v => obj?.rename_node(v.old, v.new, pst));
                        break;
                    case 'add from myself':
                        obj?.add_node2(this.data.nodes.addresses, pst);
                        break;
                    case 'add forward':
                        this.data.nodes.data.forEach(v => obj?.add_forward(v.prior_node_name, v.node_name, v.forward, v.threshold, v.remove_forward, pst));
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
            if (this.data?.bPaused !== undefined) {
                obj?.pause(this.data.bPaused, pst);
            }
            if (this.data?.clone_new !== undefined && this.object_address) {
                await this.new_with_mark('Machine', txb, obj?.clone(true, pst), this.data?.clone_new?.namedNew, account);
            }
            if (permission) {
                const n = GetObjectMain(this.data?.object);
                await this.new_with_mark('Permission', txb, permission.launch(), GetObjectParam(n?.permission), account);
            }
            if (!this.object_address) {
                await this.new_with_mark('Machine', txb, obj.launch(), GetObjectMain(this.data?.object), account);
            }
        }
    }
}
//# sourceMappingURL=machine.js.map