import { TransactionBlock, CallResponse} from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Permission, PermissionIndex, PermissionIndexType, Treasury, 
    Arbitration, Dispute, Feedback, Vote, VotingGuard, WithdrawFee, WitnessFill
} from 'wowok';
import { OBJECT_QUERY, ObjectArbitration, } from '../objects';
import { CallBase } from "./call";

export class CallArbitration extends CallBase {
    type_parameter: string;
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
    constructor(type_parameter:string, object: string | 'new' = 'new') { 
        super(object) 
        this.type_parameter = type_parameter;
    }
    async call(account?:string) : Promise<WitnessFill[] | CallResponse | undefined>   {
        if (!this.type_parameter) ERROR(Errors.InvalidParam, 'type_parameter')

        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = [];  var obj: ObjectArbitration | undefined ;

        if (this?.permission && IsValidAddress(this.permission)) {
            if (this?.object === 'new') {
                perms.push(PermissionIndex.arbitration)
            }
            if (this?.permission_new !== undefined) {
                checkOwner = true;
            }
            if (this?.description !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.arbitration_description)
            }
            if (this?.bPaused !== undefined) {
                perms.push(PermissionIndex.arbitration_pause)
            }
            if (this?.endpoint == undefined) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.arbitration_endpoint)
            }
            if (this?.fee !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.arbitration_fee)
            }
            if (this?.fee_treasury !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.arbitration_treasury)
            }
            if (this?.usage_guard !== undefined) {
                perms.push(PermissionIndex.arbitration_guard)
            }
            if (this?.voting_guard !== undefined) {
                perms.push(PermissionIndex.arbitration_voting_guard)
            }
            if (this?.arb_arbitration !== undefined) {
                perms.push(PermissionIndex.arbitration_arbitration)
            }
            if (this?.arb_new?.guard !== undefined) {
                if (IsValidAddress(this.arb_new.guard)) {
                    guards.push(this.arb_new.guard)
                } else {
                    if (!obj) {
                        const r = await OBJECT_QUERY.objects({objects:[this.object], showContent:true});
                        if (r?.objects && r.objects[0].type === 'Treasury') {
                            obj = r.objects[0] as ObjectArbitration;
                        }
                    }
                    if (obj?.usage_guard) {
                        guards.push(obj?.usage_guard)
                    }
                }
            }
            if (this?.arb_vote !== undefined) {
                perms.push(PermissionIndex.treasury_receive)
            }
            if (typeof(this?.arb_vote?.voting_guard) === 'string' && IsValidAddress(this?.arb_vote?.voting_guard)) {
                guards.push(this?.arb_vote?.voting_guard)
            }

            return await this.check_permission_and_call(this.permission, perms, guards, checkOwner, undefined, account)
        }
        return this.exec(account);
    }
    protected async operate(txb:TransactionBlock, passport?:PassportObject) {
        let obj : Arbitration | undefined ; let permission: any; let withdraw_treasury:any;
        if (this.object === 'new' && this?.type_parameter) {
            if (!this?.permission || !IsValidAddress(this?.permission)) {
                permission = Permission.New(txb, '');
            }
            if (!this?.fee_treasury || !IsValidAddress(this?.fee_treasury)) {
                withdraw_treasury = Treasury.New(txb, this?.type_parameter, permission ?? this?.permission, '', permission?undefined:passport);
            }
            obj = Arbitration.New(txb, this.type_parameter, permission ?? this?.permission, this?.description??'', 
                BigInt(this?.fee ?? 0), withdraw_treasury??this.fee_treasury, permission?undefined:passport);
        } else {
            if (IsValidAddress(this.object) && this.type_parameter && this.permission && IsValidAddress(this?.permission)) {
                obj = Arbitration.From(txb, this.type_parameter, this.permission, this.object)
            }
        }

        if (obj) {
            if (this?.description !== undefined && this.object !== 'new') {
                obj?.set_description(this.description, passport);
            }
            if (this?.bPaused !== undefined) {
                obj?.pause(this.bPaused, passport);
            }
            if (this?.endpoint !== undefined) {
                obj?.set_endpoint(this.endpoint, passport)
            }
            if (this?.fee !== undefined && this.object !== 'new') {
                obj?.set_fee(BigInt(this.fee), passport)
            }
            if (this.fee_treasury !== undefined && this.object !== 'new') {
                obj?.set_withdrawTreasury(this.fee_treasury, passport)
            }
            if (this.usage_guard !== undefined) {
                obj?.set_guard(this.usage_guard, passport)
            }
            if (this?.voting_guard !== undefined) {
                switch (this.voting_guard.op) {
                    case 'add':
                        obj?.add_voting_guard(this.voting_guard.data, passport)
                        break;
                    case 'remove':
                        obj?.remove_voting_guard(this.voting_guard.guards, false, passport)
                        break;
                    case 'set':
                        obj?.remove_voting_guard([], true, passport)
                        obj?.add_voting_guard(this.voting_guard.data, passport)
                        break;
                    case 'removeall':
                        obj?.remove_voting_guard([], true, passport)
                        break;
                }
            }
            
            if (this?.arb_new !== undefined) {
                obj?.dispute(this.arb_new.data, passport)
            }
            if (this?.arb_arbitration !== undefined) {
                obj?.arbitration(this.arb_arbitration, passport)
            }
            if (this?.arb_vote !== undefined) {
                obj?.vote(this.arb_vote, passport)
            }
            if (this?.arb_withdraw_fee !== undefined) {
                obj?.withdraw_fee(this.arb_withdraw_fee.arb, this.arb_withdraw_fee.data, passport)
            }
            if (this?.permission_new !== undefined) {
                obj?.change_permission(this.permission_new);
            }
            if (withdraw_treasury) {
                withdraw_treasury.launch();
            }
            if (permission) {
                permission.launch();
            }
            if (this.object === 'new') {
                obj?.launch();
            }
        }
    }
}