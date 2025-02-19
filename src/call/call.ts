/**
 * Provide a this interface for AI
 * Operation sequence Priority: common operation > Guard change > permission change
 * Recommended: Changes to guard and permission are committed on-chain separately to avoid permission dependencies for other operations.
 */

import { Protocol, TransactionBlock, CallResponse} from 'wowok';
import { PassportObject, Errors, ERROR, Permission, 
    PermissionIndexType, GuardParser, Passport, WitnessFill
} from 'wowok';
import { PERMISSION_QUERY } from '../permission';
import { Account } from '../account';
import { ObjectBase } from '../objects';


export interface ResponseData extends ObjectBase {
    change:'created' | 'mutated' | string;
} 

export function ResponseData(response: CallResponse | undefined ) : ResponseData[] {
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
export class CallBase {
    object: string | 'new' ;
    permission?: string;
    constructor(object: string | 'new' = 'new') {
        this.object = object;
    }
    // operation implementation for a call
    protected async operate(txb:TransactionBlock, passport?:PassportObject) {};
    
    // return WitnessFill to resolve filling witness, and than 'call_with_witness' to complete the call; 
    // return ResponseData when the call has completed; 
    // throw an exception when errors.
    async call(account?:string) : Promise<WitnessFill[] | CallResponse | undefined>  { return undefined };
    async call_with_witness (guards: string[], fill?: WitnessFill[], account?:string) : Promise<CallResponse | undefined> {
        if (guards.length > 0) {         // prepare passport
            const p: GuardParser | undefined = await GuardParser.Create([...guards]);
            const pair = Account.Instance().get_pair(account, true);
            if (!pair) ERROR(Errors.Fail, 'account invalid')

            if (p) {
                const query = await p.done(fill);
                if (query) {
                    const txb = new TransactionBlock();
                    const passport = new Passport(txb, query!);   
                    this.operate(new TransactionBlock(), passport?.get_object())
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
        checkOwner?:boolean, checkAdmin?:boolean, account?:string) : Promise<WitnessFill[] | CallResponse>  {
        var guards : string[] = [];
        const pair = Account.Instance().get_pair(account, true);
        if (!pair) ERROR(Errors.Fail, 'account invalid')

        if (permIndex.length > 0 || checkOwner) {
            const p = await PERMISSION_QUERY.permission({permission_object:permission, address:pair!.toSuiAddress()});
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
                    this.operate(new TransactionBlock(), passport?.get_object())
                    passport.destroy();

                    return await Protocol.Client().signAndExecuteTransaction({
                        transaction: txb, 
                        signer: pair!,
                        options:{showObjectChanges:true},
                    });
                }
            } 
            
            return p!.future_fills();
        } else { // no passport needed
            return this.exec()
        }
    }
    protected async exec (account?:string) : Promise<CallResponse> {
        const pair = Account.Instance().get_pair(account, true);
        if (!pair) ERROR(Errors.Fail, 'account invalid')

        const txb = new TransactionBlock();
        this.operate(txb);
        return await Protocol.Client().signAndExecuteTransaction({
            transaction: txb, 
            signer: pair!,
            options:{showObjectChanges:true},
        });
    }
}
