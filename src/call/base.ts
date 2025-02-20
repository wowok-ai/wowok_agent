

import { Protocol, TransactionBlock, CallResponse, Guard} from 'wowok';
import { PassportObject, Errors, ERROR, Permission, 
    PermissionIndexType, GuardParser, Passport, WitnessFill
} from 'wowok';
import { query_permission } from '../permission';
import { Account } from '../account';
import { ObjectBase } from '../objects';


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
    // operation implementation for a call
    protected async operate(txb:TransactionBlock, passport?:PassportObject) {};
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
                    this.operate(new TransactionBlock(), passport?.get_object())
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
