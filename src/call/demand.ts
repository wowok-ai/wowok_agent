import { TransactionBlock, CallResponse} from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Permission, Permission_Entity, Permission_Index, PermissionIndex, UserDefinedIndex,
    PermissionIndexType, Demand,  WitnessFill
} from 'wowok';
import { OBJECT_QUERY, ObjectDemand } from '../objects';
import { CallBase } from "./call";

export class CallDemand extends CallBase {
    permission_new?: string;
    type_parameter: string;
    guard?: {address:string; service_id_in_guard?:number};
    description?: string;
    time_expire?: {op: 'duration'; minutes:number} | {op:'set'; time:number};
    bounty?: {op:'add'; object?:string; balance:string} | {op:'refund'} | {op:'reward'; service:string};
    present?: {service: string | number; recommend_words:string; service_pay_type:string, guard?:string | 'fetch'}; // guard is the present guard of Demand
    reward?: string; // rerward the service
    refund?: boolean;
    constructor(type_parameter:string, object: string | 'new' = 'new') { 
        super(object)
        this.type_parameter = type_parameter 
    }
    async call(account?:string) : Promise<WitnessFill[] | CallResponse | undefined>   {
        if (!this.type_parameter) ERROR(Errors.InvalidParam, 'type_parameter')
        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = []; 

        if (this?.permission && IsValidAddress(this.permission)) {
            if (this?.object === 'new') {
                perms.push(PermissionIndex.demand)
            }
            if (this?.permission_new !== undefined) {
                checkOwner = true;
            }
            if (this?.description !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.demand_description)
            }
            if (this?.time_expire !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.demand_expand_time)
            }
            if (this?.guard !== undefined) {
                perms.push(PermissionIndex.demand_guard)
            }
            if (this?.reward !== undefined) {
                perms.push(PermissionIndex.demand_yes)
            }
            if (this?.refund) {
                perms.push(PermissionIndex.demand_refund)
            }
            if (this?.present?.guard !== undefined) {
                if (IsValidAddress(this.present.guard)) {
                    guards.push(this.present.guard)
                } else if (IsValidAddress(this?.object)) {
                    const r = await OBJECT_QUERY.objects({objects:[this.object], showContent:true});
                    if (r?.objects && r?.objects[0]?.type === 'Demand') {
                        const obj = (r?.objects[0] as ObjectDemand);
                        if (obj?.guard) {
                            guards.push(obj?.guard.object);
                        }
                    }
                }
            }
            return await this.check_permission_and_call(this.permission, perms, guards, checkOwner, undefined, account)
        }
        return this.exec(account);
    }
    protected async operate(txb:TransactionBlock, passport?:PassportObject) {
        let obj : Demand | undefined ; let permission: any;

        if (this.object === 'new') {
            if (!this?.permission || !IsValidAddress(this?.permission)) {
                permission = Permission.New(txb, '');
            }
            
            if (this.time_expire !== undefined) {
                obj = Demand.New(txb, this.type_parameter, this.time_expire?.op === 'duration' ? true : false, 
                    this.time_expire?.op === 'duration' ? this.time_expire.minutes : this.time_expire?.time,
                    permission ? permission.get_object(): this?.permission, this?.description??'', permission?undefined:passport)
            } else {
                obj = Demand.New(txb, this.type_parameter, true, 30*24*60, // 30days default
                    permission ? permission.get_object(): this?.permission, this?.description??'', permission?undefined:passport)       
            }
        } else {
            if (IsValidAddress(this.object) && this.type_parameter && this.permission && IsValidAddress(this?.permission)) {
                obj = Demand.From(txb, this.type_parameter, this.permission, this.object)
            }
        }

        if (obj) {
            if (this?.description !== undefined && this.object !== 'new') {
                obj?.set_description(this.description, passport);
            }
            if (this?.time_expire !== undefined && this.object !== 'new') {
                obj?.expand_time(this.time_expire.op === 'duration' ? true : false, 
                    this.time_expire.op === 'duration' ? this.time_expire.minutes : this.time_expire.time, passport)
            }
            if (this?.bounty !== undefined) {
                if (this.bounty.op === 'add') {
                    let deposit : any | undefined; let b = BigInt(this.bounty.balance);
                    if (b > BigInt(0)) {
                        if (this.type_parameter === '0x2::sui::SUI' || this.type_parameter === '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI') {
                            deposit = txb.splitCoins(txb.gas, [b])[0];
                        } else if (this?.bounty?.object) {
                            deposit = txb.splitCoins(this.bounty.object, [b])[0];
                        }
                        if (deposit) {
                            obj?.deposit(deposit);                              
                        }
                    }
                } else if (this.bounty.op === 'refund') {
                    obj?.refund(passport);
                } else if (this.bounty.op === 'reward') {
                    obj?.yes(this.bounty.service, passport);
                }
            }
            if (this?.present !== undefined) {
                //@ demand guard and its passport, if set
                obj?.present(this.present.service, this.present.service_pay_type, this.present.recommend_words, passport);
            }
            if (this?.guard !== undefined) {
                obj?.set_guard(this.guard.address, this.guard?.service_id_in_guard ?? undefined, passport)
            }
            if (this?.permission_new !== undefined ) {
                obj?.change_permission(this.permission_new);
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