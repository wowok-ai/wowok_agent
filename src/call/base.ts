

import { Entity, Resource, TxbAddress, array_unique, TagName, ResourceObject, PassportObject, Errors, ERROR, Permission, 
    PermissionIndexType, GuardParser, Passport, WitnessFill, CallResponse, TransactionBlock
} from 'wowok';
import { query_permission } from '../query/permission.js';
import { Account } from '../local/account.js';
import { ObjectArbitration, ObjectBase, ObjectBaseType, query_objects, query_personal, raw2type} from '../query/objects.js';
import { LocalMark } from '../local/local.js';

export interface Namedbject {
    name?: string; 
    tags?: string[];
    // true: use address as the name if the name exist; otherwise, use this name and change the original name to its address
    useAddressIfNameExist?: boolean; 
    onChain?: boolean; // true: onchain, false: local(default)
}

export interface AddressMark {
    address: TxbAddress;
    name?: string; 
    tags: string[]; 
}
export interface ResponseData extends ObjectBase {
    change:'created' | 'mutated' | string;
} 
export interface GuardInfo_forCall {
    guard: string[];
    witness: WitnessFill[];
}

export type CallResult = GuardInfo_forCall | CallResponse | undefined;


export function ResponseData(response: CallResponse | undefined) : ResponseData[] {
    const res : ResponseData[] = [];
    response?.objectChanges?.forEach(v => {
        const type_raw: string | undefined = (v as any)?.objectType;
        const type = raw2type(type_raw);
        if (type) {
            res.push({type:type, type_raw:type_raw, object:(v as any)?.objectId, version:(v as any)?.version,
                owner:(v as any)?.owner, change:v.type
            })
        }
    })
    return res;
}

export class CallBase {
    // operation implementation for a call
    private resouceObject:ResourceObject | undefined;
    private traceMarkNew = new Map<ObjectBaseType, Namedbject>();
    content: ObjectBase | undefined = undefined;

    protected async operate(txb:TransactionBlock, passport?:PassportObject, account?:string) {};
    constructor () {}
    // return WitnessFill to resolve filling witness, and than 'call_with_witness' to complete the call; 
    // return ResponseData when the call has completed; 
    // throw an exception when errors.
    async call(account?:string) : Promise<CallResult>  { return undefined };
    async call_with_witness (info: GuardInfo_forCall, account?:string) : Promise<CallResponse | undefined> {
        if (info.guard.length > 0) {         // prepare passport
            const p: GuardParser | undefined = await GuardParser.Create([...info.guard]);

            if (p) {
                const query = await p.done(info.witness);
                if (query) {
                    const txb = new TransactionBlock();
                    const passport = new Passport(txb, query!);   
                    await this.operate(txb, passport?.get_object(), account)
                    passport.destroy();
                    
                    return await this.sign_and_commit(txb, account);
                }
            } else {
                ERROR(Errors.Fail, 'guard verify')
            }
        } 
    }

    protected async check_permission_and_call (permission:string, permIndex: PermissionIndexType[], guards_needed: string[],
        checkOwner?:boolean, checkAdmin?:boolean, account?:string) : Promise<CallResult>  {
        var guards : string[] = [];

        if (permIndex.length > 0 || checkOwner) {
            const addr = await LocalMark.Instance().get_account(account);
            if (!addr) ERROR(Errors.InvalidParam, 'check_permission_and_call: account invalid');

            const p = await query_permission({permission_object:permission, address:addr!});
            if (checkOwner && !p.owner) ERROR(Errors.noPermission, 'owner');
            if (checkAdmin && !p.admin) ERROR(Errors.noPermission, 'admin');

            permIndex.forEach(v => {
                const r = Permission.HasPermission(p, v);
                if (!r?.has) ERROR(Errors.noPermission, v);
                if (r?.guard) guards.push(r.guard)
            })       
        }
        if (guards_needed.length > 0) {
            guards = guards.concat(guards_needed);
        }

        if (guards.length > 0) {         // prepare passport
            const p: GuardParser | undefined = await GuardParser.Create([...guards]);
            const futures = p ? p.future_fills() : []; 

            if (!p) ERROR(Errors.Fail, 'guard parse')

            if (p && futures.length === 0) {
                const query = await p.done();
                if (query) {
                    const txb = new TransactionBlock();
                    const passport = new Passport(txb, query!);   
                    await this.operate(txb, passport?.get_object(), account)
                    passport.destroy();
                    return await this.sign_and_commit(txb, account);
                }
            } 
            return {guard:[...guards], witness:p!.future_fills()};
        } else { // no passport needed
            return await this.exec()
        }
    }
    protected async exec (account?:string) : Promise<CallResponse> {
        const txb = new TransactionBlock();
        await this.operate(txb, undefined, account);
        return await this.sign_and_commit(txb, account);
    }

    protected async new_with_mark(type:ObjectBaseType, txb:TransactionBlock, object:TxbAddress, named_new?:Namedbject, account?:string, innerTags:string[]=[TagName.Launch]) {
        const tags = named_new?.tags ? array_unique([...named_new.tags, ...innerTags]) : array_unique([...innerTags]);
        if (named_new) {
            named_new.tags = tags; 
            this.traceMarkNew.set(type, named_new)
        }

        if (!named_new?.onChain) return ;

        // onchain mark
        if (!this.resouceObject) {
            const addr = await LocalMark.Instance().get_account(account);

            if (addr) {
                const r = await query_personal({address:addr}); //@ use cache
                if (!r?.mark_object) {
                    this.resouceObject = Entity.From(txb).create_resource2(); // new 
                    Resource.From(txb, this.resouceObject).add(object, tags, named_new?.name);
                } else {
                    Resource.From(txb, r.mark_object).add(object, tags, named_new?.name);
                }
            } else {
                ERROR(Errors.InvalidParam, 'account - ' + account)
            }
        } else {
            Resource.From(txb, this.resouceObject).add(object, tags, named_new?.name);
        }
    }

    protected async update_content(object:string, type:ObjectBaseType)  {
        if (this.content)   return ;

        const r = await query_objects({objects:[object]});
        if (r?.objects?.length !== 1 || r?.objects[0]?.type !== type) {
            ERROR(Errors.Fail, `Fetch ${type} object ${object} failed`)
        }

        this.content = r?.objects[0];
    }

    protected async sign_and_commit(txb: TransactionBlock, address?: string) : Promise<CallResponse> {
        if (this.resouceObject) {
            Resource.From(txb, this.resouceObject).launch(); //@ resource launch, if created.
            this.resouceObject = undefined;
        }
        const addr = address !== undefined ? await LocalMark.Instance().get_address(address) : undefined;
        const r = await Account.Instance().sign_and_commit(txb, addr);
        if (!r) {
            ERROR(Errors.Fail, 'sign and commit failed');
        }
        
        // save the mark locally, anyway
        const res = ResponseData(r);
        res.forEach(v => {
            if (v.type && v.change === 'created') {
                const namedNew = this.traceMarkNew.get(v.type);
                if (namedNew) {
                    LocalMark.Instance().put(namedNew.name, 
                        {object:v.object, tags:namedNew?.tags ? [...namedNew?.tags, v.type] : [v.type]}, 
                        namedNew?.useAddressIfNameExist);
                }
            }
        })
        return r
    }
}
