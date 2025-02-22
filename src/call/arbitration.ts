import { TransactionBlock, CallResponse, IsValidArgType, TransactionResult} from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Permission, PermissionIndex, PermissionIndexType, Treasury, 
    Arbitration, Dispute, Feedback, Vote, VotingGuard, WithdrawFee, WitnessFill
} from 'wowok';
import { query_objects, ObjectArbitration, } from '../objects';
import { CallBase, CallResult, AddressMark } from "./base";

export interface CallArbitration_Data {
    object?: string; // undefined for creating a new object
    permission?: string; 
    mark?:AddressMark;
    type_parameter?: string;
    permission_new?: string;
    description?: string;
    bPaused?: boolean;
    endpoint?: string;
    fee?: string;
    fee_treasury?: string;
    usage_guard?: string;
    voting_guard?: {op:'add' | 'set'; data:VotingGuard[]} | {op:'remove', guards:string[]} | {op:'removeall'};
    arb_new?: {data: Dispute; guard?:string | 'fetch'}; // dispute an order, and a new Arb launched.
    arb_withdraw_fee?: {arb:string; data:WithdrawFee};
    arb_vote?: Vote;
    arb_arbitration?: Feedback;
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

        if (this.data?.permission && IsValidAddress(this.data.permission)) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.arbitration)
            }
            if (this.data?.permission_new !== undefined) {
                checkOwner = true;
            }
            if (this.data?.description !== undefined && this.data.object) {
                perms.push(PermissionIndex.arbitration_description)
            }
            if (this.data?.bPaused !== undefined) {
                perms.push(PermissionIndex.arbitration_pause)
            }
            if (this.data?.endpoint == undefined) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.arbitration_endpoint)
            }
            if (this.data?.fee !== undefined && this.data.object) {
                perms.push(PermissionIndex.arbitration_fee)
            }
            if (this.data?.fee_treasury !== undefined && this.data.object) {
                perms.push(PermissionIndex.arbitration_treasury)
            }
            if (this.data?.usage_guard !== undefined) {
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
                    if (!this.data.object) { // new
                        if (this.data?.usage_guard && IsValidAddress(this.data?.usage_guard)) {
                            guards.push(this.data.usage_guard)
                        }
                    } else {
                        if (!obj) {
                            const r = await query_objects({objects:[this.data.object!], showContent:true});
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

            return await this.check_permission_and_call(this.data.permission, perms, guards, checkOwner, undefined, account)
        }
        return await this.exec(account);
    }
    protected async operate(txb:TransactionBlock, passport?:PassportObject, account?:string) {
        let obj : Arbitration | undefined ; let permission: any; let withdraw_treasury:any;
        if (!this.data.object) {
            if (!this.data?.permission || !IsValidAddress(this.data?.permission)) {
                permission = Permission.New(txb, '');
            }
            if (!this.data?.fee_treasury || !IsValidAddress(this.data?.fee_treasury)) {
                withdraw_treasury = Treasury.New(txb, this.data?.type_parameter!, permission ?? this.data?.permission, '', permission?undefined:passport);
            }
            obj = Arbitration.New(txb, this.data.type_parameter!, permission ?? this.data?.permission, this.data?.description??'', 
                BigInt(this.data?.fee ?? 0), withdraw_treasury??this.data.fee_treasury, permission?undefined:passport);
        } else if (this.data.object) {
            if (IsValidAddress(this.data.object) && this.data.type_parameter && this.data.permission && IsValidAddress(this.data?.permission)) {
                obj = Arbitration.From(txb, this.data.type_parameter, this.data.permission, this.data.object)
            }
        }

        if (obj) {
            if (this.data?.description !== undefined && this.data.object) {
                obj?.set_description(this.data.description, passport);
            }
            if (this.data?.bPaused !== undefined) {
                obj?.pause(this.data.bPaused, passport);
            }
            if (this.data?.endpoint !== undefined) {
                obj?.set_endpoint(this.data.endpoint, passport)
            }
            if (this.data?.fee !== undefined && this.data.object) {
                obj?.set_fee(BigInt(this.data.fee), passport)
            }
            if (this.data.fee_treasury !== undefined && this.data.object) {
                obj?.set_withdrawTreasury(this.data.fee_treasury, passport)
            }
            if (this.data.usage_guard !== undefined) {
                obj?.set_guard(this.data.usage_guard, passport)
            }
            if (this.data?.voting_guard !== undefined) {
                switch (this.data.voting_guard.op) {
                    case 'add':
                        obj?.add_voting_guard(this.data.voting_guard.data, passport)
                        break;
                    case 'remove':
                        obj?.remove_voting_guard(this.data.voting_guard.guards, false, passport)
                        break;
                    case 'set':
                        obj?.remove_voting_guard([], true, passport)
                        obj?.add_voting_guard(this.data.voting_guard.data, passport)
                        break;
                    case 'removeall':
                        obj?.remove_voting_guard([], true, passport)
                        break;
                }
            }
            
            if (this.data?.arb_new !== undefined) {
                obj?.dispute(this.data.arb_new.data, passport)
            }
            if (this.data?.arb_arbitration !== undefined) {
                obj?.arbitration(this.data.arb_arbitration, passport)
            }
            if (this.data?.arb_vote !== undefined) {
                obj?.vote(this.data.arb_vote, passport)
            }
            if (this.data?.arb_withdraw_fee !== undefined) {
                obj?.withdraw_fee(this.data.arb_withdraw_fee.arb, this.data.arb_withdraw_fee.data, passport)
            }
            if (this.data?.permission_new !== undefined) {
                obj?.change_permission(this.data.permission_new);
            }
            if (withdraw_treasury) {
                withdraw_treasury.launch();
            }
            if (permission) {
                permission.launch();
            }
            var mark : TransactionResult | string | undefined ;
            if (!this.data.object) {
                mark = obj?.launch();
            } else {
                mark = this.data.object;
            }

            if (this.data?.mark !== undefined) {
                this.mark(txb, mark, this.data?.mark, account)
            }
        }
    }
}