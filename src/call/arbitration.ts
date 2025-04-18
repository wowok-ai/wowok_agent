import { TransactionBlock, IsValidArgType, PassportObject, IsValidAddress, Errors, ERROR, Permission, PermissionIndex, 
    PermissionIndexType, Treasury, Arbitration, VotingGuard, WithdrawFee, ArbObject, 
} from 'wowok';
import { query_objects, ObjectArbitration, } from '../query/objects.js';
import { CallBase, CallResult, Namedbject} from "./base.js";
import { Account } from '../local/account.js';
export interface DisputeData {
    order: string,
    order_token_type: string,
    description: string,
    votable_proposition: string[],
    fee: string | number,
}

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallArbitration_Data {
    type_parameter: string;
    object?: {address:string} | {namedNew?: Namedbject}; // undefined or {named_new...} for creating a new object
    permission?: {address:string} | {namedNew?: Namedbject, description?:string}; 
    description?: string;
    endpoint?: string;
    fee?: string | number;
    fee_treasury?: {address:string} | {namedNew?: Namedbject, description?:string}; 
    arb_new?: {data: DisputeData; guard?:string | 'fetch'; namedNew?: Namedbject}; // dispute an order, and a new Arb launched.
    arb_withdraw_fee?: {arb?:string; data:WithdrawFee};
    arb_vote?: {arb?: string; voting_guard?: string; agrees: number[]};
    arb_arbitration?: {arb?:string; feedback:string; indemnity?:string|number};
    guard?: string;
    voting_guard?: {op:'add' | 'set'; data:VotingGuard[]} | {op:'remove', guards:string[]} | {op:'removeall'};
    bPaused?: boolean;
}

export class CallArbitration extends CallBase {
    data: CallArbitration_Data;
    constructor (data: CallArbitration_Data) {
        super();
        this.data  = data;
    }

    async call(account?:string) : Promise<CallResult> {
        if (!this.data?.type_parameter || !IsValidArgType(this.data.type_parameter)) {
            ERROR(Errors.IsValidArgType, 'arbitration.type_parameter')
        }

        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = [];  var obj: ObjectArbitration | undefined ;
        const permission_address = (this.data?.permission as any)?.address;
        const object_address = (this.data?.object as any)?.address;
        const treasury_address = (this.data?.fee_treasury as any)?.address;

        if (permission_address && IsValidAddress(permission_address)) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.arbitration)
            }
            if (this.data?.description !== undefined && object_address) {
                perms.push(PermissionIndex.arbitration_description)
            }
            if (this.data?.bPaused !== undefined) {
                perms.push(PermissionIndex.arbitration_pause)
            }
            if (this.data?.endpoint == undefined) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.arbitration_endpoint)
            }
            if (this.data?.fee !== undefined && object_address) {
                perms.push(PermissionIndex.arbitration_fee)
            }
            if (treasury_address !== undefined && object_address) {
                perms.push(PermissionIndex.arbitration_treasury)
            }
            if (this.data?.guard !== undefined) {
                perms.push(PermissionIndex.arbitration_guard)
            }
            if (this.data?.voting_guard !== undefined) {
                perms.push(PermissionIndex.arbitration_voting_guard)
            }
            if (this.data?.arb_arbitration !== undefined) {
                perms.push(PermissionIndex.arbitration_arbitration)
            }
            if (this.data?.arb_new?.guard !== undefined) {
                if (IsValidAddress(this.data.arb_new.guard)) {
                    guards.push(this.data.arb_new.guard)
                } else {
                    if (!object_address) { // new
                        if (this.data?.guard && IsValidAddress(this.data?.guard)) {
                            guards.push(this.data.guard)
                        }
                    } else {
                        if (!obj) {
                            const r = await query_objects({objects:[object_address], showContent:true});
                            if (r?.objects && r.objects[0].type === 'Arbitration') {
                                obj = r.objects[0] as ObjectArbitration;
                            }                                
                        }
 
                        if (obj?.usage_guard) {
                            guards.push(obj.usage_guard)
                        }                   
                    }
                }
            }
            if (this.data?.arb_vote !== undefined) {
                perms.push(PermissionIndex.treasury_receive)
            }
            if (typeof(this.data?.arb_vote?.voting_guard) === 'string' && IsValidAddress(this.data?.arb_vote?.voting_guard)) {
                guards.push(this.data?.arb_vote?.voting_guard)
            }

            return await this.check_permission_and_call(permission_address, perms, guards, checkOwner, undefined, account)
        }
        return await this.exec(account);
    }
    protected async operate(txb:TransactionBlock, passport?:PassportObject, account?:string) {
        let obj : Arbitration | undefined ; let permission: any; let withdraw_treasury:any;
        const permission_address = (this.data?.permission as any)?.address;
        const object_address = (this.data?.object as any)?.address;
        const treasury_address = (this.data?.fee_treasury as any)?.address;

        if (!object_address) {
            if (!permission_address || !IsValidAddress(permission_address)) {
                const d = (this.data?.permission as any)?.description ?? '';
                permission = Permission.New(txb, d);
            }
            if (!treasury_address || !IsValidAddress(treasury_address)) {
                const d = (this.data?.fee_treasury as any)?.description ?? '';
                withdraw_treasury = Treasury.New(txb, this.data?.type_parameter!, permission ? permission.get_object() : permission_address, 
                    d, permission?undefined:passport);
            }
            obj = Arbitration.New(txb, this.data.type_parameter!, permission ? permission.get_object() : permission_address, this.data?.description??'', 
                BigInt(this.data?.fee ?? 0), withdraw_treasury? withdraw_treasury.get_object() : treasury_address, permission?undefined:passport);
        } else {
            if (IsValidAddress(object_address) && this.data.type_parameter && permission_address) {
                obj = Arbitration.From(txb, this.data.type_parameter, permission_address, object_address)
            } else {
                ERROR(Errors.InvalidParam, 'object or permission address invalid.')
            }
        }

        if (obj) {
            const pst = permission?undefined:passport;
            if (this.data?.description !== undefined && object_address) {
                obj?.set_description(this.data.description, pst);
            }
            if (this.data?.endpoint !== undefined) {
                obj?.set_endpoint(this.data.endpoint, pst)
            }
            if (this.data?.fee !== undefined && object_address) {
                obj?.set_fee(BigInt(this.data.fee), pst)
            }
            if (treasury_address !== undefined && object_address) {
                obj?.set_withdrawTreasury(treasury_address, pst)
            }
            var arb_new : ArbObject | undefined;
            if (this.data?.arb_new !== undefined) {
                const b = BigInt(this.data.arb_new.data.fee); 
                const d = this.data?.arb_new.data; 
                arb_new = obj?.arb({order:d.order, order_token_type:d.order_token_type, description:d.description, votable_proposition:d.votable_proposition, 
                    fee: b>BigInt(0) ? await Account.Instance().get_coin_object(txb, b, account, this.data.type_parameter) : undefined
                }, pst);
            }

            if (this.data?.arb_arbitration !== undefined) {
                const a = this.data.arb_arbitration.arb ?? arb_new;
                if (!a) ERROR(Errors.Fail, 'arb invalid: arb_arbitration');

                obj?.arbitration({arb:a!, feedback:this.data.arb_arbitration.feedback, indemnity:this.data.arb_arbitration.indemnity}, pst)
            }

            if (this.data?.arb_vote !== undefined) {
                const a = this.data.arb_vote.arb ?? arb_new;
                if (!a) ERROR(Errors.Fail, 'arb invalid: arb_vote');

                obj?.vote({arb:a!, voting_guard:this.data.arb_vote.voting_guard, agrees:this.data.arb_vote.agrees}, pst)
            }

            if (this.data?.arb_withdraw_fee !== undefined) {
                const a = this.data.arb_withdraw_fee.arb ?? arb_new;
                if (!a) ERROR(Errors.Fail, 'arb invalid: arb_withdraw_fee');

                obj?.withdraw_fee(a!, this.data.arb_withdraw_fee.data, pst)
            }

            if (arb_new) {
                await this.new_with_mark('Arb', txb, obj?.arb_launch(arb_new), (this.data?.arb_new as any)?.namedNew, account);
            }
            
            if (this.data?.voting_guard !== undefined) {
                switch (this.data.voting_guard.op) {
                    case 'add':
                        obj?.add_voting_guard(this.data.voting_guard.data, pst)
                        break;
                    case 'remove':
                        obj?.remove_voting_guard(this.data.voting_guard.guards, false, pst)
                        break;
                    case 'set':
                        obj?.remove_voting_guard([], true, pst)
                        obj?.add_voting_guard(this.data.voting_guard.data, pst)
                        break;
                    case 'removeall':
                        obj?.remove_voting_guard([], true, pst)
                        break;
                }
            }
            if (this.data.guard !== undefined) {
                obj?.set_guard(this.data.guard, pst)
            }
            if (this.data?.bPaused !== undefined) {
                obj?.pause(this.data.bPaused, pst);
            }
            if (withdraw_treasury) {
                await this.new_with_mark('Treasury', txb, withdraw_treasury.launch(), (this.data?.fee_treasury as any)?.namedNew, account);
            }
            if (permission) {
                await this.new_with_mark('Permission', txb, permission.launch(), (this.data?.permission as any)?.namedNew, account);
            }

            if (!object_address) {
                await this.new_with_mark('Arbitration', txb, obj.launch(), (this.data?.object as any)?.namedNew, account);
            } 
        }
    }
}