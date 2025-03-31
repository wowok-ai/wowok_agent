import { Protocol, Entity, Resource, array_unique, TagName, Errors, ERROR, Permission, GuardParser, Passport } from 'wowok';
import { query_permission } from '../permission';
import { Account } from '../account';
import { queryTableItem_Personal, raw2type } from '../objects';
import { Transaction as TransactionBlock } from '@mysten/sui/transactions';
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
    // operation implementation for a call
    resouceObject;
    async operate(txb, passport, account) { }
    ;
    constructor() { }
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
                    await this.operate(new TransactionBlock(), passport?.get_object(), account);
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
            const addr = await Account.Instance().get_address(account);
            if (!addr)
                ERROR(Errors.InvalidParam, 'check_permission_and_call: account invalid');
            const p = await query_permission({ permission_object: permission, address: addr });
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
                    await this.operate(new TransactionBlock(), passport?.get_object(), account);
                    passport.destroy();
                    return await this.sign_and_commit(txb, account);
                }
            }
            return { guard: [...guards], witness: p.future_fills() };
        }
        else { // no passport needed
            return await this.exec();
        }
    }
    async exec(account) {
        const txb = new TransactionBlock();
        await this.operate(txb, undefined, account);
        return await this.sign_and_commit(txb, account);
    }
    async new_with_mark(txb, object, named_new, account, innerTags = [TagName.Launch]) {
        const tags = named_new?.tags ? array_unique([...named_new.tags, ...innerTags]) : array_unique([...innerTags]);
        if (!this.resouceObject) {
            const addr = await Account.Instance().get_address(account);
            if (addr) {
                const r = await queryTableItem_Personal({ address: addr }); //@ use cache
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
    async sign_and_commit(txb, account) {
        const pair = await Account.Instance().get_pair(account, true);
        if (!pair)
            ERROR(Errors.Fail, 'account invalid');
        if (this.resouceObject) {
            Resource.From(txb, this.resouceObject).launch(); //@ resource launch, if created.
            this.resouceObject = undefined;
        }
        return await Protocol.Client().signAndExecuteTransaction({
            transaction: txb,
            signer: pair,
            options: { showObjectChanges: true },
        });
    }
}
