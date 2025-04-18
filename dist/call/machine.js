import { IsValidAddress, Errors, ERROR, Permission, PermissionIndex, Machine, Progress, } from 'wowok';
import { CallBase } from "./base.js";
import { Account } from '../local/account.js';
export class CallMachine extends CallBase {
    constructor(data) {
        super();
        this.data = data;
    }
    async call(account) {
        var checkOwner = false;
        const guards = [];
        const perms = [];
        const permission_address = this.data?.permission?.address;
        const object_address = this.data?.object?.address;
        if (permission_address && IsValidAddress(permission_address)) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.machine);
            }
            if (this.data?.description !== undefined && object_address) {
                perms.push(PermissionIndex.machine_description);
            }
            if (this.data?.endpoint !== undefined && object_address) {
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
            if (this.data?.progress_next?.guard !== undefined) {
                if (IsValidAddress(this.data?.progress_next?.guard)) {
                    guards.push(this.data?.progress_next?.guard);
                }
                else if (this.data?.object && IsValidAddress(object_address)) { // fetch guard
                    const guard = await Progress.QueryForwardGuard(this.data?.progress_next.progress, object_address, await Account.Instance().default() ?? '0xe386bb9e01b3528b75f3751ad8a1e418b207ad979fea364087deef5250a73d3f', this.data.progress_next.operation.next_node_name, this.data.progress_next.operation.forward);
                    if (guard) {
                        guards.push(guard);
                    }
                }
            }
            return await this.check_permission_and_call(permission_address, perms, guards, checkOwner, undefined, account);
        }
        return await this.exec(account);
    }
    async operate(txb, passport, account) {
        let obj;
        let permission;
        const permission_address = this.data?.permission?.address;
        const object_address = this.data?.object?.address;
        if (!object_address) {
            if (!permission_address || !IsValidAddress(permission_address)) {
                const d = this.data?.permission?.description ?? '';
                permission = Permission.New(txb, d);
            }
            obj = Machine.New(txb, permission ? permission.get_object() : permission_address, this.data?.description ?? '', this.data?.endpoint ?? '', permission ? undefined : passport);
        }
        else {
            if (IsValidAddress(object_address) && permission_address && IsValidAddress(permission_address)) {
                obj = Machine.From(txb, permission_address, object_address);
            }
            else {
                ERROR(Errors.InvalidParam, 'object or permission address invalid.');
            }
        }
        if (obj) {
            const perm = permission ? permission.get_object() : permission_address;
            const pst = permission ? undefined : passport;
            if (this.data?.description !== undefined && object_address) {
                obj?.set_description(this.data.description, pst);
            }
            if (this.data?.endpoint !== undefined && object_address) {
                obj?.set_endpoint(this.data.endpoint, pst);
            }
            if (this.data?.consensus_repository !== undefined) {
                switch (this.data.consensus_repository.op) {
                    case 'add':
                        this.data.consensus_repository.repositories.forEach(v => obj?.add_repository(v, pst));
                        break;
                    case 'remove':
                        obj?.remove_repository(this.data.consensus_repository.repositories, false, pst);
                        break;
                    case 'removeall':
                        obj?.remove_repository([], true, pst);
                        break;
                    case 'set':
                        obj?.remove_repository([], true, pst);
                        this.data.consensus_repository.repositories.forEach(v => obj?.add_repository(v, pst));
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
            var new_progress;
            if (this.data?.progress_new !== undefined) {
                new_progress = Progress?.New(txb, obj?.get_object(), perm, this.data?.progress_new.task_address, pst);
            }
            if (this.data?.progress_context_repository !== undefined) {
                const p = this.data?.progress_context_repository.progress ?? new_progress?.get_object();
                if (!p)
                    ERROR(Errors.Fail, 'progress invalid: progress_context_repository');
                Progress.From(txb, obj?.get_object(), perm, p).set_context_repository(this.data?.progress_context_repository.repository, pst);
            }
            if (this.data?.progress_namedOperator !== undefined) {
                const p = this.data?.progress_namedOperator.progress ?? new_progress?.get_object();
                if (!p)
                    ERROR(Errors.Fail, 'progress invalid: progress_namedOperator');
                let pp = Progress.From(txb, obj?.get_object(), perm, p);
                this.data.progress_namedOperator.data.forEach(v => pp.set_namedOperator(v.name, v.operators, pst));
            }
            if (this.data?.progress_parent !== undefined) {
                const p = this.data?.progress_parent.progress ?? new_progress?.get_object();
                if (!p)
                    ERROR(Errors.Fail, 'progress invalid: progress_parent');
                if (this.data.progress_parent.parent) {
                    Progress.From(txb, obj?.get_object(), perm, p).parent(this.data.progress_parent.parent);
                }
                else {
                    Progress.From(txb, obj?.get_object(), perm, p).parent_none();
                }
            }
            if (this.data?.progress_task !== undefined) {
                const p = this.data?.progress_task.progress ?? new_progress?.get_object();
                if (!p)
                    ERROR(Errors.Fail, 'progress invalid: progress_task');
                Progress.From(txb, obj?.get_object(), perm, p).bind_task(this.data.progress_task.task, pst);
            }
            if (this.data?.progress_hold !== undefined) {
                const p = this.data?.progress_hold.progress ?? new_progress?.get_object();
                if (!p)
                    ERROR(Errors.Fail, 'progress invalid: progress_hold');
                if (this.data?.progress_hold.adminUnhold) {
                    Progress.From(txb, obj?.get_object(), perm, p).unhold(this.data.progress_hold.operation, pst);
                }
                else {
                    Progress.From(txb, obj?.get_object(), perm, p).hold(this.data.progress_hold.operation, this.data.progress_hold.bHold);
                }
            }
            const addr = new_progress?.launch();
            if (addr) {
                await this.new_with_mark('Progress', txb, addr, this.data?.progress_new?.namedNew, account);
            }
            if (this.data?.progress_next !== undefined) {
                Progress.From(txb, obj?.get_object(), perm, this.data?.progress_next.progress).next(this.data.progress_next.operation, this.data.progress_next.deliverable, pst);
            }
            if (this.data?.bPaused !== undefined) {
                obj?.pause(this.data.bPaused, pst);
            }
            if (this.data?.clone_new !== undefined && object_address) {
                await this.new_with_mark('Machine', txb, obj?.clone(true, pst), this.data?.clone_new?.namedNew, account);
            }
            if (permission) {
                await this.new_with_mark('Permission', txb, permission.launch(), this.data?.permission?.namedNew, account);
            }
            if (!object_address) {
                await this.new_with_mark('Machine', txb, obj.launch(), this.data?.object?.namedNew, account);
            }
        }
    }
}
//# sourceMappingURL=machine.js.map