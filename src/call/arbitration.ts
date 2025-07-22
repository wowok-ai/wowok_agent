import { TransactionBlock, IsValidArgType, PassportObject, Errors, ERROR, Permission, PermissionIndex, 
    PermissionIndexType, Treasury, Arbitration, ArbObject, Service, PermissionObject, VotingGuard,
} from 'wowok';
import { ObjectArbitration, query_objects, } from '../query/objects.js';
import { CallBase, CallResult, GetObjectExisted, GetObjectMain, GetObjectParam, Namedbject, 
    ObjectParam, ObjectTypedMain, SetWithdrawFee, TypeNamedObjectWithPermission, PayParam } from "./base.js";
import { Account } from '../local/account.js';
import { LocalMark } from '../local/local.js';

export interface DisputeData {
    order: string,
    description: string,
    votable_proposition: string[],
    max_fee?: string | number,
}

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallArbitration_Data {
    object: ObjectTypedMain;
    arb_new?: {data: DisputeData; namedNew?: Namedbject}; // dispute an order, and a Arb object will be created.
    arb_withdraw_fee?: {arb:string; data:PayParam};
    arb_vote?: {arb: string; voting_guard?: string; agrees: number[]};
    arb_arbitration?: {arb:string; feedback:string; indemnity?:string|number|null};

    description?: string;
    location?: string; // region, location or coordinates of the on-chain object, such as a physical address
    endpoint?: string | null;
    fee?: string | number;
    fee_treasury?: ObjectParam;
    guard?: string | null;
    voting_guard?: {op:'add' | 'set'; data:VotingGuard[]} | {op:'remove', guards:string[]} | {op:'removeall'};
    bPaused?: boolean;
}

export class CallArbitration extends CallBase {
    data: CallArbitration_Data;
    object_address: string | undefined = undefined;
    permission_address: string | undefined = undefined;
    type_parameter: string | undefined = undefined; // type of the object, e.g. '00x2::sui::SUI'

    constructor (data: CallArbitration_Data) {
        super();
        this.data  = data;
    }
    private checkNotPaused = (op: string)  => {
        if ((this.content as ObjectArbitration).bPaused) {
            ERROR(Errors.Fail, `Arbitration object has been paused and operation (${op}) cannot proceed.`);
        }
    }

    protected async prepare()  {
        if (!this.object_address) {
            this.object_address = (await LocalMark.Instance().get_address(GetObjectExisted(this.data.object)));           
        }

        if (this.object_address) {
            await this.update_content('Arbitration', this.object_address);
            if (!this.content) ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.object:' + this.data.object);
            this.permission_address = (this.content as ObjectArbitration).permission;
            this.type_parameter = Arbitration.parseObjectType((this.content as ObjectArbitration).type_raw);
        } else {
            const n = GetObjectMain(this.data.object) as TypeNamedObjectWithPermission;
            if (!IsValidArgType(n?.type_parameter)) {
                ERROR(Errors.IsValidArgType, 'CallArbitration_Data.data.object.type_parameter');
            }          
            this.permission_address = await LocalMark.Instance().get_address(GetObjectExisted(n?.permission));
            this.type_parameter = (n as any)?.type_parameter;
        }  
    }

    async call(account?:string) : Promise<CallResult> {
        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = []; 
        const add_perm = (index:PermissionIndex) => {
            if (this.permission_address && !perms.includes(index)) {
                perms.push(index);
            }
        }
        await this.prepare();
        if (!this.object_address) {
            add_perm(PermissionIndex.arbitration)
        }
        if (this.data?.description != null && this.object_address) {
            add_perm(PermissionIndex.arbitration_description)
        }
        if (this.data?.location != null) {
            add_perm(PermissionIndex.arbitration_location)
        }
        if (this.data?.bPaused != null) {
            add_perm(PermissionIndex.arbitration_pause)
        }
        if (this.data?.endpoint !== undefined) { // publish is an irreversible one-time operation 
            add_perm(PermissionIndex.arbitration_endpoint)
        }
        if (this.data?.fee != null && this.object_address) {
            add_perm(PermissionIndex.arbitration_fee)
        }
        if (this.data.fee_treasury != null && this.object_address) {
            add_perm(PermissionIndex.arbitration_treasury)
        }
        if (this.data?.guard !== undefined) {
            add_perm(PermissionIndex.arbitration_guard)
        }
        if (this.data?.voting_guard != null) {
            add_perm(PermissionIndex.arbitration_voting_guard)
        }
        if (this.data?.arb_arbitration != null) {
            add_perm(PermissionIndex.arbitration_arbitration)
        }

        if (this.data?.arb_new != null) { // new arb with guard and permission
            if (this.object_address) { 
                if ((this.content as ObjectArbitration)?.usage_guard) {
                    guards.push((this.content as ObjectArbitration).usage_guard!)
                }   
            }
        }

        if (this.data?.arb_vote != null) {
            add_perm(PermissionIndex.arbitration_vote);

            const voting_guard = await LocalMark.Instance().get_address(this.data?.arb_vote?.voting_guard);
            if (voting_guard) {
                guards.push(voting_guard)
            } 
        }
        if (this.permission_address) {
            return await this.check_permission_and_call(this.permission_address, perms, guards, checkOwner, undefined, account)
        }
        return await this.exec(account);
    }
    protected async operate(txb:TransactionBlock, passport?:PassportObject, account?:string) {
        let obj : Arbitration | undefined ; let perm: Permission | undefined;
        let permission : PermissionObject | undefined;
        let withdraw_treasury:Treasury | undefined;

        if (this.object_address) {
            obj = Arbitration.From(txb, this.type_parameter!, this.permission_address!, this.object_address);
            permission = this.permission_address;
        } else {
            const n = GetObjectMain(this.data?.object) as TypeNamedObjectWithPermission;
            permission = await LocalMark.Instance().get_address(GetObjectExisted(n?.permission));
            if (!permission) {
                perm = Permission.New(txb, GetObjectParam(n?.permission)?.description ?? '');
                permission =  perm.get_object();
            }
            const treasury_address = await LocalMark.Instance().get_address(GetObjectExisted(this.data.fee_treasury));
            if (!treasury_address) {
                withdraw_treasury = Treasury.New(txb, this.type_parameter!, permission, 
                    GetObjectParam(this.data.fee_treasury)?.description ?? '', perm?undefined:passport);
            }
            const t = withdraw_treasury ? withdraw_treasury.get_object() : treasury_address;
            if (!t) {   
                ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.fee_treasury')
            }   
            obj = Arbitration.New(txb, this.type_parameter!, permission, this.data?.description??'', 
                BigInt(this.data?.fee ?? 0), t, perm?undefined:passport);
        }

        if (!obj) ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.object');
        if (!permission) ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.object.permission');
            
        const pst = perm?undefined:passport;
        var arb_new : ArbObject | undefined;
        if (this.data?.arb_new != null) {
            this.checkNotPaused('arb_new');

            const d = this.data?.arb_new.data; 
            const fee = BigInt((this.object_address ? (this.content as ObjectArbitration)?.fee : this.data?.fee) ?? 0);
            const max_fee = BigInt(d.max_fee ?? fee);
            if (fee > max_fee) ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.arb_new.fee > max_fee');
            
            const r = await query_objects({objects:[d.order]});
            if (r?.objects?.length !== 1 || r?.objects[0]?.type !== 'Order') {
                ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.arb_new.order is not an Order object');
            }
            const order_type = Service.parseOrderObjectType(r.objects[0].type_raw);
            if (!order_type) {
                ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.arb_new.order type invalid');
            }

            arb_new = obj?.arb({order:d.order, order_token_type:order_type, description:d.description, votable_proposition:d.votable_proposition, 
                fee: fee>BigInt(0) ? await Account.Instance().get_coin_object(txb, fee, account, this.type_parameter) : undefined
            }, pst);                    
            
        }

        if (this.data?.arb_arbitration != null) {
            const a = await LocalMark.Instance().get_address(this.data.arb_arbitration.arb) ?? arb_new;
            if (!a) ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.arb_arbitration.arb');

            obj?.arbitration({arb:a!, feedback:this.data.arb_arbitration.feedback, indemnity:this.data.arb_arbitration.indemnity}, pst)
        }

        if (this.data?.arb_vote != null) {
            const a = await LocalMark.Instance().get_address(this.data.arb_vote.arb) ?? arb_new;
            if (!a) ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.arb_vote.arb');

            obj?.vote({arb:a!, voting_guard:this.data.arb_vote.voting_guard, agrees:this.data.arb_vote.agrees}, pst)
        }

        if (this.data?.arb_withdraw_fee != null) {
            const a = await LocalMark.Instance().get_address(this.data.arb_withdraw_fee.arb);
            if (!a) ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.arb_withdraw_fee.arb');
    
            obj?.withdraw_fee(a!, await SetWithdrawFee(this.data.arb_withdraw_fee.data, (this.content as ObjectArbitration).fee_treasury), pst);
        }

        if (arb_new) {
            await this.new_with_mark('Arb', txb, obj?.arb_launch(arb_new), (this.data?.arb_new as any)?.namedNew, account);
        }

        if (this.data?.description != null && this.object_address) {
            obj?.set_description(this.data.description, pst);
        }
        if (this.data?.location != null) {
            obj?.set_location(this.data.location, pst);
        }

        if (this.data?.endpoint !== undefined) {
            obj?.set_endpoint(this.data.endpoint)
        }
        if (this.data?.fee != null && this.object_address) {
            obj?.set_fee(BigInt(this.data.fee), pst)
        }
        if (this.data?.fee_treasury != null && this.object_address) {
            const treasury_address = await LocalMark.Instance().get_address(GetObjectExisted(this.data.fee_treasury));
            if (!treasury_address) {
                withdraw_treasury = Treasury.New(txb, this.type_parameter!, permission, 
                    GetObjectParam(this.data.fee_treasury)?.description ?? '', pst);
            }
            const t = withdraw_treasury ? withdraw_treasury.get_object() : treasury_address;
            if (!t) {   
                ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.fee_treasury')
            }   
            obj?.set_withdrawTreasury(t, pst)
        }
        
        if (this.data?.guard !== undefined) {
            if (!this.data.guard) {
                obj?.set_guard(undefined, pst);
            } else {
                const guard = await LocalMark.Instance().get_address(this.data.guard);
                if (!guard) ERROR(Errors.InvalidParam, `CallArbitration_Data.data.guard: ${this.data.guard}`);
                obj?.set_guard(guard, pst)
            }
        }


        if (this.data?.voting_guard != null) {
            switch (this.data.voting_guard.op) {
                case 'add':
                case 'set':
                    for (let i = 0; i < this.data.voting_guard.data.length; ++ i) {
                        const v = this.data.voting_guard.data[i];
                        if (typeof(v.guard) === 'string') {
                            const g = await LocalMark.Instance().get_address(v.guard);
                            if (!g) {
                                ERROR(Errors.InvalidParam, 'CallArbitration_Data.data.voting_guard')
                            } 
                            v.guard = g;
                        } 
                    }
                    if (this.data.voting_guard.op === 'set') {
                        obj?.remove_voting_guard([], true, pst)
                    }
                    obj?.add_voting_guard(this.data.voting_guard.data, pst);
                    break;
                case 'remove':
                    obj?.remove_voting_guard(await LocalMark.Instance().get_many_address2(this.data.voting_guard.guards), false, pst)
                    break;
                case 'removeall':
                    obj?.remove_voting_guard([], true, pst)
                    break;
            }
        }

        if (this.data?.bPaused != null) {
            obj?.pause(this.data.bPaused, pst);
        }
        if (withdraw_treasury) {
            await this.new_with_mark('Treasury', txb, withdraw_treasury.launch(), GetObjectParam(this.data?.fee_treasury), account);
        }
        if (perm) {
            const n = GetObjectMain(this.data.object) as TypeNamedObjectWithPermission;
            await this.new_with_mark('Permission', txb, perm.launch(), GetObjectParam(n?.permission), account);
        }

        if (!this.object_address) {
            await this.new_with_mark('Arbitration', txb, obj.launch(), GetObjectMain(this.data?.object), account);
        } 
    }
}