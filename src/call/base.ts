

import { Entity, Resource, TxbAddress, array_unique, TagName, ResourceObject, PassportObject, Errors, ERROR, Permission, 
    PermissionIndexType, GuardParser, Passport, WitnessFill, CallResponse, TransactionBlock, WithdrawFee, TreasuryObject
} from 'wowok';
import { query_permission } from '../query/permission.js';
import { Account } from '../local/account.js';
import { ObjectBase, ObjectBaseType, query_objects, query_personal, raw2type} from '../query/objects.js';
import { LocalMark } from '../local/local.js';

export interface Namedbject {
    name?: string;  // name of the object, if not defined, the object will be created without name      
    tags?: string[]; // tags of the object, if not defined, the object will be created without tags
    // true: use address as the name if the name exist; otherwise, use this name and change the original name to its address
    useAddressIfNameExist?: boolean; 
    onChain?: boolean; // true: onchain mark, false: local mark(default)
}

export interface NamedObjectWithDescription extends Namedbject {
    description?:string; // description of the new object, if not defined, the object will be created with no description.
}

export interface NamedObjectWithPermission extends Namedbject {
    // permission object, undefined or {named_new...} for creating a new object;  if defined, the permission object must exist. 
    permission?: ObjectParam; 
}

export interface TypeNamedObjectWithPermission extends NamedObjectWithPermission {
    // type of the object, e.g. '0x2::coin::Coin<0x2::sui::SUI>'
    type_parameter: string;  
};

/// object address or namedNew for creating a new object
export type ObjectTypedMain = string |  TypeNamedObjectWithPermission ;
export type ObjectMain = string | NamedObjectWithPermission ;
export type ObjectPermissionMain = string | Namedbject;
export type ObjectParam = string | NamedObjectWithDescription;

export const GetObjectExisted = (object: ObjectMain | ObjectTypedMain | ObjectParam | ObjectPermissionMain | undefined) : string | undefined => {
    return (typeof object === 'string' ) ? object : undefined;
}

export const GetObjectMain = (object: ObjectMain | ObjectTypedMain | ObjectPermissionMain | undefined) : NamedObjectWithPermission | TypeNamedObjectWithPermission | Namedbject | undefined => {
   if (typeof object === 'object' && object !== null && 'type_parameter' in object) {
       return (object as TypeNamedObjectWithPermission);
   } else if (typeof object === 'object' && object !== null && 'permission' in object) {
       return (object as NamedObjectWithPermission);
   } else if (typeof object === 'object') {
       return (object as Namedbject);
   }
}

export const GetObjectParam = (object: ObjectParam | undefined) : NamedObjectWithDescription | undefined => {
    return (typeof object === 'object' && object!== null && 'description' in object)? (object as NamedObjectWithDescription) : undefined;
}

export type ObjectsOp = {op:'set' | 'add' | 'remove' ; objects:string[]} | {op:'removeall'};

// address from local Account or local Mark.
export type AccountOrMark_Address = {name_or_address?: string, local_mark_first?: boolean}  ;

export const GetAccountOrMark_Address = async (entity?: AccountOrMark_Address) : Promise<string | undefined> => {
    if (!entity || !entity.name_or_address) {
        return (await Account.Instance().get())?.address
    } 
    if (entity?.local_mark_first) {
        const r =  await LocalMark.Instance().get_address(entity.name_or_address);
        if (!r) {
            return (await Account.Instance().get(entity.name_or_address))?.address;
        }
        return r
    } else {
        const r = (await Account.Instance().get(entity.name_or_address))?.address;
        if (!r) {
            return await LocalMark.Instance().get_address(entity.name_or_address);
        }        
        return r
    }
}

export const GetManyAccountOrMark_Address = async (entities: AccountOrMark_Address[]) : Promise<string[]> => {
    const res = [];
    for (let i = 0; i < entities.length; ++i) {
        const addr = await GetAccountOrMark_Address(entities[i]);
        if (addr) res.push(addr);
    }
    return res;
}

export interface PayParam {
    index: bigint | string | number,
    remark: string,
    for_object?: string,
    for_guard?: string,
}

export const SetWithdrawFee = async (param: PayParam, treasury?:TreasuryObject) : Promise<WithdrawFee> => {
    if (!treasury) {
        ERROR(Errors.InvalidParam, 'WithdrawFee: treasury_address invalid');
    }
    const [object, guard] = await LocalMark.Instance().get_many_address([param.for_object, param.for_guard]);
    return {index:BigInt(param.index), remark:param.remark, for_object:object, for_guard:guard, treasury:treasury};
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
    guards: string[];
    witness: WitnessFill[];
}

export interface CallResponseError {
    error: string;
}

export type CallResult = GuardInfo_forCall | CallResponse | CallResponseError | undefined;

export function ResponseData(response: CallResult | undefined) : ResponseData[]  {
    if ((response as any)?.digest) {
        const res : ResponseData[] = [];
        (response as CallResponse)?.objectChanges?.forEach(v => {
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
    return []
}

export class CallBase {
    // operation implementation for a call
    private resouceObject:ResourceObject | undefined;
    private traceMarkNew = new Map<ObjectBaseType, Namedbject>();
    content: ObjectBase | undefined = undefined;

    protected async operate(txb:TransactionBlock, passport?:PassportObject, account?:string) {};
    protected async prepare() {};
    constructor () {}
    // return WitnessFill to resolve filling witness, and than 'call_with_witness' to complete the call; 
    // return ResponseData when the call has completed; 
    // throw an exception when errors.
    async call(account?:string) : Promise<CallResult>  { return undefined };
    async call_with_witness (info: GuardInfo_forCall, account?:string) : Promise<CallResponse | undefined> {
        if (info.guards.length > 0) {         // prepare passport
            const p: GuardParser | undefined = await GuardParser.Create([...info.guards]);

            if (p) {
                const query = await p.done(info.witness);
                if (query) {
                    const txb = new TransactionBlock();
                    const passport = new Passport(txb, query!);   
                    await this.prepare();
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
            const p = await query_permission({permission_object:permission, address:{name_or_address:account}});
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
        console.log(2)
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
            return {guards:[...guards], witness:p!.future_fills()};
        } else { // no passport needed
            console.log(3)
            return await this.exec(account)
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
            const r = await query_personal({address:{name_or_address:account}}); 
            if (!r?.mark_object) {
                this.resouceObject = Entity.From(txb).create_resource2(); // new 
                Resource.From(txb, this.resouceObject).add(object, tags, named_new?.name);
            } else {
                Resource.From(txb, r.mark_object).add(object, tags, named_new?.name);
            }
        } else {
            Resource.From(txb, this.resouceObject).add(object, tags, named_new?.name);
        }
    }

    protected async update_content(type:ObjectBaseType, object?:string)  {
        if (this.content || !object)   return ;

        const r = await query_objects({objects:[object], no_cache:true});
        if (r?.objects?.length !== 1 || r?.objects[0]?.type !== type) {
            ERROR(Errors.Fail, `Fetch ${type} object ${object} failed`)
        }

        this.content = r?.objects[0];
    }

    protected async sign_and_commit(txb: TransactionBlock, account?: string) : Promise<CallResponse> {
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
        for (let i = 0; i < res.length; ++i) {
            const v = res[i];
            if (v.type && v.change === 'created') {
                const namedNew = this.traceMarkNew.get(v.type);
                if (namedNew) {
                    await LocalMark.Instance().put(namedNew.name, 
                        {address:v.object, tags:namedNew?.tags ? [...namedNew?.tags, v.type] : [v.type]}, 
                        namedNew?.useAddressIfNameExist);
                }
            }
        }
        return r
    }
}
