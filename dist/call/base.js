import { Entity, Resource, array_unique, TagName, Errors, ERROR, Permission, GuardParser, Passport, TransactionBlock } from 'wowok';
import { query_permission } from '../query/permission.js';
import { Account } from '../local/account.js';
import { query_objects, query_personal, raw2type } from '../query/objects.js';
import { LocalMark } from '../local/local.js';
export function ResponseData(response) {
    const res = [];
    response?.objectChanges?.forEach(v => {
        const type_raw = v?.objectType;
        const type = raw2type(type_raw);
        if (type) {
            res.push({ type: type, type_raw: type_raw, object: v?.objectId, version: v?.version,
                owner: v?.owner, change: v.type });
        }
    });
    return res;
}
export class CallBase {
    async operate(txb, passport, account) { }
    ;
    constructor() {
        this.traceMarkNew = new Map();
        this.content = undefined;
    }
    // return WitnessFill to resolve filling witness, and than 'call_with_witness' to complete the call; 
    // return ResponseData when the call has completed; 
    // throw an exception when errors.
    async call(account) { return undefined; }
    ;
    async call_with_witness(info, account) {
        if (info.guard.length > 0) { // prepare passport
            const p = await GuardParser.Create([...info.guard]);
            if (p) {
                const query = await p.done(info.witness);
                if (query) {
                    const txb = new TransactionBlock();
                    const passport = new Passport(txb, query);
                    await this.operate(txb, passport?.get_object(), account);
                    passport.destroy();
                    return await this.sign_and_commit(txb, account);
                }
            }
            else {
                ERROR(Errors.Fail, 'guard verify');
            }
        }
    }
    async check_permission_and_call(permission, permIndex, guards_needed, checkOwner, checkAdmin, account) {
        var guards = [];
        if (permIndex.length > 0 || checkOwner) {
            const addr = await Account.Instance().get(account);
            if (!addr)
                ERROR(Errors.InvalidParam, 'check_permission_and_call: account invalid');
            const p = await query_permission({ object_address_or_name: permission, entity_address_or_name: addr.address });
            if (checkOwner && !p.owner)
                ERROR(Errors.noPermission, 'owner');
            if (checkAdmin && !p.admin)
                ERROR(Errors.noPermission, 'admin');
            permIndex.forEach(v => {
                const r = Permission.HasPermission(p, v);
                if (!r?.has)
                    ERROR(Errors.noPermission, v);
                if (r?.guard)
                    guards.push(r.guard);
            });
        }
        if (guards_needed.length > 0) {
            guards = guards.concat(guards_needed);
        }
        if (guards.length > 0) { // prepare passport
            const p = await GuardParser.Create([...guards]);
            const futures = p ? p.future_fills() : [];
            if (!p)
                ERROR(Errors.Fail, 'guard parse');
            if (p && futures.length === 0) {
                const query = await p.done();
                if (query) {
                    const txb = new TransactionBlock();
                    const passport = new Passport(txb, query);
                    await this.operate(txb, passport?.get_object(), account);
                    passport.destroy();
                    return await this.sign_and_commit(txb, account);
                }
            }
            return { guard: [...guards], witness: p.future_fills() };
        }
        else { // no passport needed
            return await this.exec(account);
        }
    }
    async exec(account) {
        const txb = new TransactionBlock();
        await this.operate(txb, undefined, account);
        return await this.sign_and_commit(txb, account);
    }
    async new_with_mark(type, txb, object, named_new, account, innerTags = [TagName.Launch]) {
        const tags = named_new?.tags ? array_unique([...named_new.tags, ...innerTags]) : array_unique([...innerTags]);
        if (named_new) {
            named_new.tags = tags;
            this.traceMarkNew.set(type, named_new);
        }
        if (!named_new?.onChain)
            return;
        // onchain mark
        if (!this.resouceObject) {
            const addr = await Account.Instance().get(account);
            if (addr) {
                const r = await query_personal({ address: addr.address }); //@ use cache
                if (!r?.mark_object) {
                    this.resouceObject = Entity.From(txb).create_resource2(); // new 
                    Resource.From(txb, this.resouceObject).add(object, tags, named_new?.name);
                }
                else {
                    Resource.From(txb, r.mark_object).add(object, tags, named_new?.name);
                }
            }
            else {
                ERROR(Errors.InvalidParam, 'account - ' + account);
            }
        }
        else {
            Resource.From(txb, this.resouceObject).add(object, tags, named_new?.name);
        }
    }
    async update_content(object, type) {
        if (this.content)
            return;
        const r = await query_objects({ objects: [object] });
        if (r?.objects?.length !== 1 || r?.objects[0]?.type !== type) {
            ERROR(Errors.Fail, `Fetch ${type} object ${object} failed`);
        }
        this.content = r?.objects[0];
    }
    async sign_and_commit(txb, account) {
        if (this.resouceObject) {
            Resource.From(txb, this.resouceObject).launch(); //@ resource launch, if created.
            this.resouceObject = undefined;
        }
        const r = await Account.Instance().sign_and_commit(txb, account);
        if (!r) {
            ERROR(Errors.Fail, 'sign and commit failed');
        }
        // save the mark locally, anyway
        const res = ResponseData(r);
        res.forEach(v => {
            if (v.type && v.change === 'created') {
                const namedNew = this.traceMarkNew.get(v.type);
                if (namedNew) {
                    LocalMark.Instance().put(namedNew.name, { object: v.object, tags: namedNew?.tags ? [...namedNew?.tags, v.type] : [v.type] }, namedNew?.useAddressIfNameExist);
                }
            }
        });
        return r;
    }
}
//# sourceMappingURL=base.js.map