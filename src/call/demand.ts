import { TransactionBlock, CallResponse, IsValidArgType} from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Permission, Permission_Entity, Permission_Index, PermissionIndex, UserDefinedIndex,
    PermissionIndexType, Demand,  WitnessFill
} from 'wowok';
import { query_objects, ObjectDemand } from '../objects';
import { CallBase, CallResult } from "./base";

export interface CallDemand_Data {
    object?: string; // undefined for creating a new object
    permission?: string; 
    permission_new?: string;
    type_parameter?: string;
    guard?: {address:string; service_id_in_guard?:number};
    description?: string;
    time_expire?: {op: 'duration'; minutes:number} | {op:'set'; time:number};
    bounty?: {op:'add'; object?:string; balance:string} | {op:'refund'} | {op:'reward'; service:string};
    present?: {service: string | number; recommend_words:string; service_pay_type:string, guard?:string | 'fetch'}; // guard is the present guard of Demand
    reward?: string; // rerward the service
    refund?: boolean;
}
export class CallDemand extends CallBase {
    data: CallDemand_Data;
    constructor(data: CallDemand_Data) {
        super();
        this.data = data;
    }
    async call(account?:string) : Promise<CallResult> {
        if (!this.data?.type_parameter || !IsValidArgType(this.data.type_parameter)) {
            ERROR(Errors.IsValidArgType, 'demand.type_parameter')
        }

        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = []; 

        if (this.data?.permission && IsValidAddress(this.data.permission)) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.demand)
            }
            if (this.data?.permission_new !== undefined) {
                checkOwner = true;
            }
            if (this.data?.description !== undefined && this.data.object) {
                perms.push(PermissionIndex.demand_description)
            }
            if (this.data?.time_expire !== undefined && this.data.object) {
                perms.push(PermissionIndex.demand_expand_time)
            }
            if (this.data?.guard !== undefined) {
                perms.push(PermissionIndex.demand_guard)
            }
            if (this.data?.reward !== undefined) {
                perms.push(PermissionIndex.demand_yes)
            }
            if (this.data?.refund) {
                perms.push(PermissionIndex.demand_refund)
            }
            if (this.data?.present?.guard !== undefined) {
                if (IsValidAddress(this.data.present.guard)) {
                    guards.push(this.data.present.guard)
                } else {
                    if (!this.data.object) { // new
                        if (this.data?.guard?.address && IsValidAddress(this.data?.guard.address)) {
                            guards.push(this.data.guard.address)
                        }
                    } else {
                        const r = await query_objects({objects:[this.data.object], showContent:true});
                        if (r?.objects && r?.objects[0]?.type === 'Demand') {
                            const obj = (r?.objects[0] as ObjectDemand);
                            if (obj?.guard) {
                                guards.push(obj?.guard.object);
                            }
                        }
                    }
                }
            }
            return await this.check_permission_and_call(this.data.permission, perms, guards, checkOwner, undefined, account)
        }
        return this.exec(account);
    }
    protected async operate(txb:TransactionBlock, passport?:PassportObject) {
        let obj : Demand | undefined ; let permission: any;

        if (!this.data.object) {
            if (!this.data?.permission || !IsValidAddress(this.data?.permission)) {
                permission = Permission.New(txb, '');
            }
            
            if (this.data.time_expire !== undefined) {
                obj = Demand.New(txb, this.data.type_parameter!, this.data.time_expire?.op === 'duration' ? true : false, 
                    this.data.time_expire?.op === 'duration' ? this.data.time_expire.minutes : this.data.time_expire?.time,
                    permission ? permission.get_object(): this.data?.permission, this.data?.description??'', permission?undefined:passport)
            } else {
                obj = Demand.New(txb, this.data.type_parameter!, true, 30*24*60, // 30days default
                    permission ? permission.get_object(): this.data?.permission, this.data?.description??'', permission?undefined:passport)       
            }
        } else {
            if (IsValidAddress(this.data.object) && this.data.type_parameter && this.data.permission && IsValidAddress(this.data?.permission)) {
                obj = Demand.From(txb, this.data.type_parameter, this.data.permission, this.data.object)
            }
        }

        if (obj) {
            if (this.data?.description !== undefined && this.data.object) {
                obj?.set_description(this.data.description, passport);
            }
            if (this.data?.time_expire !== undefined && this.data.object) {
                obj?.expand_time(this.data.time_expire.op === 'duration' ? true : false, 
                    this.data.time_expire.op === 'duration' ? this.data.time_expire.minutes : this.data.time_expire.time, passport)
            }
            if (this.data?.bounty !== undefined) {
                if (this.data.bounty.op === 'add') {
                    let deposit : any | undefined; let b = BigInt(this.data.bounty.balance);
                    if (b > BigInt(0)) {
                        if (this.data.type_parameter === '0x2::sui::SUI' || this.data.type_parameter === '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI') {
                            deposit = txb.splitCoins(txb.gas, [b])[0];
                        } else if (this.data?.bounty?.object) {
                            deposit = txb.splitCoins(this.data.bounty.object, [b])[0];
                        }
                        if (deposit) {
                            obj?.deposit(deposit);                              
                        }
                    }
                } else if (this.data.bounty.op === 'refund') {
                    obj?.refund(passport);
                } else if (this.data.bounty.op === 'reward') {
                    obj?.yes(this.data.bounty.service, passport);
                }
            }
            if (this.data?.present !== undefined) {
                //@ demand guard and its passport, if set
                obj?.present(this.data.present.service, this.data.present.service_pay_type, this.data.present.recommend_words, passport);
            }
            if (this.data?.guard !== undefined) {
                obj?.set_guard(this.data.guard.address, this.data.guard?.service_id_in_guard ?? undefined, passport)
            }
            if (this.data?.permission_new !== undefined ) {
                obj?.change_permission(this.data.permission_new);
            }
            if (permission) {
                permission.launch();
            }
            if (!this.data.object) {
                obj?.launch();
            }
        }
    }
}