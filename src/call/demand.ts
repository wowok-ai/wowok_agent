import { TransactionBlock, IsValidArgType, IsValidCoinType, Resource, ResourceObject } from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Permission, PermissionIndex, 
    PermissionIndexType, Demand, } from 'wowok';
import { query_objects, ObjectDemand } from '../objects';
import { CallBase, CallResult, Namedbject } from "./base";
import { Account } from '../account';

export interface CallDemand_Data {
    object?: {address:string} | {namedNew: Namedbject}; // undefined or {named_new...} for creating a new object
    permission?: {address:string} | {namedNew: Namedbject, description?:string}; 

    type_parameter?: string;
    guard?: {address:string; service_id_in_guard?:number};
    description?: string;
    time_expire?: {op: 'duration'; minutes:number} | {op:'set'; time:number};
    bounty?: {op:'add'; object:{address:string}|{balance:string|number}} | {op:'refund'} | {op:'reward'; service:string};
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
        const permission_address = (this.data?.permission as any)?.address;
        const object_address = (this.data?.object as any)?.address;

        if (permission_address && IsValidAddress(permission_address)) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.demand)
            }
            if (this.data?.description !== undefined && object_address) {
                perms.push(PermissionIndex.demand_description)
            }
            if (this.data?.time_expire !== undefined && object_address) {
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
                    if (!object_address) { // new
                        if (this.data?.guard?.address && IsValidAddress(this.data?.guard.address)) {
                            guards.push(this.data.guard.address)
                        }
                    } else {
                        const r = await query_objects({objects:[object_address], showContent:true});
                        if (r?.objects && r?.objects[0]?.type === 'Demand') {
                            const obj = (r?.objects[0] as ObjectDemand);
                            if (obj?.guard) {
                                guards.push(obj?.guard.object);
                            }
                        }
                    }
                }
            }
            return await this.check_permission_and_call(permission_address, perms, guards, checkOwner, undefined, account)
        }
        return await this.exec(account);
    }
    protected async operate(txb:TransactionBlock, passport?:PassportObject, account?:string) {
        let obj : Demand | undefined ; let permission: any;
        const permission_address = (this.data?.permission as any)?.address;
        const object_address = (this.data?.object as any)?.address;

        if (!object_address) {
            if (!permission_address || !IsValidAddress(permission_address)) {
                const d = (this.data?.permission as any)?.description ?? '';
                permission = Permission.New(txb, d);
            }
            
            if (this.data.time_expire !== undefined) {
                obj = Demand.New(txb, this.data.type_parameter!, this.data.time_expire?.op === 'duration' ? true : false, 
                    this.data.time_expire?.op === 'duration' ? this.data.time_expire.minutes : this.data.time_expire?.time,
                    permission ? permission.get_object(): permission_address, this.data?.description??'', permission?undefined:passport)
            } else {
                obj = Demand.New(txb, this.data.type_parameter!, true, 30*24*60, // 30days default
                    permission ? permission.get_object(): permission_address, this.data?.description??'', permission?undefined:passport)       
            }
        } else {
            if (IsValidAddress(object_address) && this.data.type_parameter && this.data.permission && IsValidAddress(permission_address)) {
                obj = Demand.From(txb, this.data.type_parameter, permission_address, object_address)
            }
        }

        if (obj) {
            if (this.data?.description !== undefined && object_address) {
                obj?.set_description(this.data.description, passport);
            }
            if (this.data?.time_expire !== undefined && object_address) {
                obj?.expand_time(this.data.time_expire.op === 'duration' ? true : false, 
                    this.data.time_expire.op === 'duration' ? this.data.time_expire.minutes : this.data.time_expire.time, passport)
            }
            if (this.data?.bounty !== undefined) {
                if (this.data.bounty.op === 'add') {
                    if (IsValidAddress((this.data.bounty.object as any)?.address)) {
                        obj.deposit((this.data.bounty.object as any)?.address)
                    } else if ((this.data.bounty.object as any)?.balance !== undefined){
                        if (!IsValidCoinType(this.data.type_parameter)) {
                            ERROR(Errors.IsValidCoinType, 'demand bounty')
                        }
                        const r = await Account.Instance().get_coin_object(txb, (this.data.bounty.object as any)?.balance, account, this.data.type_parameter);
                        if (r) obj.deposit(r)
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
            if (permission) {
                this.new_with_mark(txb, permission.launch(), (this.data?.permission as any)?.namedNew, account);
            }
            if (!this.data.object) {
                this.new_with_mark(txb, obj.launch(), (this.data?.object as any)?.namedNew, account);
            }
        }
    }
}