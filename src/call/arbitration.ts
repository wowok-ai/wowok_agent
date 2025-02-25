import { TransactionBlock, IsValidArgType, Resource, ResourceObject, } from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Permission, PermissionIndex, PermissionIndexType, Treasury, 
    Arbitration, Dispute, Feedback, Vote, VotingGuard, WithdrawFee, WitnessFill
} from 'wowok';
import { query_objects, ObjectArbitration, } from '../objects';
import { CallBase, CallResult, AddressMark, Namedbject} from "./base";

export interface CallArbitration_Data {
    object?: {address:string} | {namedNew: Namedbject}; // undefined or {named_new...} for creating a new object
    permission?: {address:string} | {namedNew: Namedbject, description?:string}; 
    mark?:AddressMark;
    type_parameter: string;
    permission_new?: string;
    description?: string;
    bPaused?: boolean;
    endpoint?: string;
    fee?: string;
    fee_treasury?: {address:string} | {namedNew: Namedbject, description?:string}; 
    usage_guard?: string;
    voting_guard?: {op:'add' | 'set'; data:VotingGuard[]} | {op:'remove', guards:string[]} | {op:'removeall'};
    arb_new?: {data: Dispute; guard?:string | 'fetch'; namedNew?: Namedbject}; // dispute an order, and a new Arb launched.
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
        const permission_address = (this.data?.permission as any)?.address;
        const object_address = (this.data?.object as any)?.address;
        const treasury_address = (this.data?.fee_treasury as any)?.address;

        if (permission_address && IsValidAddress(permission_address)) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.arbitration)
            }
            if (this.data?.permission_new !== undefined) {
                checkOwner = true;
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
                    if (!object_address) { // new
                        if (this.data?.usage_guard && IsValidAddress(this.data?.usage_guard)) {
                            guards.push(this.data.usage_guard)
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
        } else if (object_address) {
            if (IsValidAddress(object_address) && this.data.type_parameter && permission_address) {
                obj = Arbitration.From(txb, this.data.type_parameter, permission_address, object_address)
            } else {
                ERROR(Errors.InvalidParam, 'object or permission address invalid.')
            }
        }

        if (obj) {
            if (this.data?.description !== undefined && object_address) {
                obj?.set_description(this.data.description, passport);
            }
            if (this.data?.bPaused !== undefined) {
                obj?.pause(this.data.bPaused, passport);
            }
            if (this.data?.endpoint !== undefined) {
                obj?.set_endpoint(this.data.endpoint, passport)
            }
            if (this.data?.fee !== undefined && object_address) {
                obj?.set_fee(BigInt(this.data.fee), passport)
            }
            if (treasury_address !== undefined && object_address) {
                obj?.set_withdrawTreasury(treasury_address, passport)
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
                await this.new_with_mark(txb, obj?.dispute(this.data.arb_new.data, passport), (this.data?.arb_new as any)?.namedNew, account);
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
                await this.new_with_mark(txb, withdraw_treasury.launch(), (this.data?.fee_treasury as any)?.namedNew, account);
            }
            if (permission) {
                await this.new_with_mark(txb, permission.launch(), (this.data?.permission as any)?.namedNew, account);
            }

            if (!object_address) {
                await this.new_with_mark(txb, obj.launch(), (this.data?.object as any)?.namedNew, account);
            } 
        }
    }
}