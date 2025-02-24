

import { Protocol, TransactionBlock, CallResponse, Guard, TransactionArgument, Entity, IsValidAddress, Resource, TxbObject, TransactionResult, TxbAddress, array_unique, TagName} from 'wowok';
import { PassportObject, Errors, ERROR, Permission, 
    PermissionIndexType, GuardParser, Passport, WitnessFill
} from 'wowok';
import { query_permission } from '../permission';
import { Account } from '../account';
import { ObjectBase, queryTableItem_Personal} from '../objects';

export interface Namedbject {
    name: string;
    tags?: string[];
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

export interface CallWithWitnessParam {
    info: GuardInfo_forCall;
    account?:string;
}
export type CallResult = GuardInfo_forCall | CallResponse | undefined;

export function ResponseData(response: CallResponse | undefined) : ResponseData[] {
    const res : ResponseData[] = [];
    response?.objectChanges?.forEach(v => {
        const type_raw: string | undefined = (v as any)?.objectType;
        const type:string | undefined = type_raw ? Protocol.Instance().object_name_from_type_repr(type_raw) : undefined;
        if (type) {
            res.push({type:type, type_raw:type_raw, object:(v as any)?.objectId, version:(v as any)?.version,
                owner:(v as any)?.owner, change:v.type
            })
        }
    })
    return res;
}

export const mark_address = async (txb:TransactionBlock, mark:AddressMark, account?:string) => {
    const addr = Account.Instance().get_address(account);
    if (addr) {
        const r = await queryTableItem_Personal({address:addr}); //@ use cache
        const resource = r?.mark_object ? Resource.From(txb, r.mark_object) : Resource.From(txb, Entity.From(txb).create_resource2());
        resource.add(mark.address, mark.tags, mark.name);
        if (!r?.mark_object) {
            resource.launch(); // launch new
        }
    } else {
        ERROR(Errors.InvalidParam, 'account - ' + account)
    }
}
export class CallBase {
    // operation implementation for a call
    protected async operate(txb:TransactionBlock, passport?:PassportObject, account?:string) {};
    constructor () {}
    // return WitnessFill to resolve filling witness, and than 'call_with_witness' to complete the call; 
    // return ResponseData when the call has completed; 
    // throw an exception when errors.
    async call(account?:string) : Promise<CallResult>  { return undefined };
    async call_with_witness (param: CallWithWitnessParam) : Promise<CallResponse | undefined> {
        if (param.info.guard.length > 0) {         // prepare passport
            const p: GuardParser | undefined = await GuardParser.Create([...param.info.guard]);
            const pair = Account.Instance().get_pair(param.account, true);
            if (!pair) ERROR(Errors.Fail, 'account invalid')

            if (p) {
                const query = await p.done(param.info.witness);
                if (query) {
                    const txb = new TransactionBlock();
                    const passport = new Passport(txb, query!);   
                    this.operate(new TransactionBlock(), passport?.get_object(), param?.account)
                    passport.destroy();

                    return await Protocol.Client().signAndExecuteTransaction({
                        transaction: txb, 
                        signer: pair!,
                        options:{showObjectChanges:true},
                    });
                }
            } else {
                ERROR(Errors.Fail, 'guard finish_passport')
            }
        } 
    }

    protected async check_permission_and_call (permission:string, permIndex: PermissionIndexType[], guards_needed: string[],
        checkOwner?:boolean, checkAdmin?:boolean, account?:string) : Promise<CallResult>  {
        var guards : string[] = [];
        const pair = Account.Instance().get_pair(account, true);
        if (!pair) ERROR(Errors.Fail, 'account invalid')

        if (permIndex.length > 0 || checkOwner) {
            const p = await query_permission({permission_object:permission, address:pair!.toSuiAddress()});
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
                    this.operate(new TransactionBlock(), passport?.get_object(), account)
                    passport.destroy();

                    return await Protocol.Client().signAndExecuteTransaction({
                        transaction: txb, 
                        signer: pair!,
                        options:{showObjectChanges:true},
                    });
                }
            } 
            
            return {guard:[...guards], witness:p!.future_fills()};
        } else { // no passport needed
            return await this.exec()
        }
    }
    protected async exec (account?:string) : Promise<CallResponse> {
        const pair = Account.Instance().get_pair(account, true);
        if (!pair) ERROR(Errors.Fail, 'account invalid')

        const txb = new TransactionBlock();
        this.operate(txb, undefined, account);
        return await Protocol.Client().signAndExecuteTransaction({
            transaction: txb, 
            signer: pair!,
            options:{showObjectChanges:true},
        });
    }

    protected new_with_mark(txb:TransactionBlock, object:TxbAddress, named_new?:Namedbject, account?:string, innerTags:string[]=[TagName.Launch]) {
        const tags = named_new?.tags ? array_unique([...named_new.tags, ...innerTags]) : array_unique([...innerTags]);
        mark_address(txb, {address:object, name:named_new?.name, tags:tags}, account)
    }
}
