import { TransactionBlock, IsValidArgType, Service, PassportObject, Errors, ERROR, Permission, PermissionIndex, 
    PermissionIndexType, Demand,
    PermissionObject, } from 'wowok';
import { ObjectDemand, query_objects } from '../query/objects.js';
import { CallBase, CallResult, GetObjectExisted, GetObjectMain, GetObjectParam, ObjectTypedMain, TypeNamedObjectWithPermission } from "./base.js";
import { Account } from '../local/account.js';
import { LocalMark } from '../local/local.js';
import { off } from 'process';

/// The execution priority is determined by the order in which the object attributes are arranged
export interface CallDemand_Data {
    object: ObjectTypedMain;
    // service to present.  
    // If Demand.guard.service_id_in_guard is set, the service address must be provided as the service_id_in_guard identifier while Guard verification is performed.
    // Otherwise, the service address is used to present the service to the Demand.
    present?: {service?: string; recommend_words:string;}; 

    description?: string;
    time_expire?: {op: 'duration'; minutes:number} | {op:'time'; time:number};
    bounty?: {op:'add'; object:{address:string}|{balance:string|number}} | {op:'reward'; service:string} | {op:'refund'} ;
    // If service_id_in_guard is set, the service address must be provided as the service_id_in_guard identifier while Guard verification is performed.
    guard?: {address:string; service_id_in_guard?:number};
}

export class CallDemand extends CallBase {
    data: CallDemand_Data; 
    object_address: string | undefined = undefined;
    permission_address: string | undefined = undefined;
    type_parameter: string | undefined = undefined;

    constructor(data: CallDemand_Data) {
        super();
        this.data = data;
    }

    protected async prepare(): Promise<void> {
        if (!this.object_address) {
            this.object_address = (await LocalMark.Instance().get_address(GetObjectExisted(this.data.object)));           
        }
        if (this.object_address) {
            await this.update_content('Demand', this.object_address);
            if (!this.content) ERROR(Errors.InvalidParam, 'CallDemand_Data.data.object:' + this.object_address);
            this.permission_address = (this.content as ObjectDemand).permission;
            this.type_parameter = Demand.parseObjectType((this.content as ObjectDemand).type_raw);
        } else {
            const n = GetObjectMain(this.data.object) as TypeNamedObjectWithPermission;
            if (!IsValidArgType(n?.type_parameter)) {
                ERROR(Errors.IsValidArgType, 'CallDemand_Data.data.object.type_parameter');
            }          
            this.permission_address = (await LocalMark.Instance().get_address(GetObjectExisted(n?.permission)));
            this.type_parameter = Demand.parseObjectType(n.type_parameter);
        }  
    }
    async call(account?:string) : Promise<CallResult> {
        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = []; 

        await this.prepare();
        if (this.permission_address) {
            if (!this.data?.object) {
                perms.push(PermissionIndex.demand)
            }
            if (this.data?.description != null && this.object_address) {
                perms.push(PermissionIndex.demand_description)
            }
            if (this.data?.time_expire != null && this.object_address) {
                perms.push(PermissionIndex.demand_expand_time)
            }
            if (this.data?.bounty?.op === 'reward') {
                perms.push(PermissionIndex.demand_yes)
            }
            if (this.data?.bounty?.op === 'refund') {
                perms.push(PermissionIndex.demand_refund)
            }
            if (this.data?.guard != null) {
                perms.push(PermissionIndex.demand_guard)
            }
            if (this.data?.present != null) {
                if (this.object_address) {
                    if ((this.content as ObjectDemand)?.guard?.object) {
                        guards.push((this.content as ObjectDemand).guard?.object!);
                    }
                } 
            }
            return await this.check_permission_and_call(this.permission_address, perms, guards, checkOwner, undefined, account)
        }
        return await this.exec(account);
    }
    protected async operate(txb:TransactionBlock, passport?:PassportObject, account?:string) {
        let obj : Demand | undefined ; let perm: Permission | undefined;
        let permission : PermissionObject | undefined;

        if (this.object_address) {
            obj = Demand.From(txb, this.type_parameter!, this.permission_address!, this.object_address);
            permission = this.permission_address;
        } else {
            const n = GetObjectMain(this.data.object) as TypeNamedObjectWithPermission;
            permission = await LocalMark.Instance().get_address(GetObjectExisted(n?.permission));
            if (!permission) {
                perm = Permission.New(txb, GetObjectParam(n?.permission)?.description ?? '');
                permission =  perm.get_object();
            }
            
            if (this.data.time_expire != null) {
                obj = Demand.New(txb, this.type_parameter!, this.data.time_expire?.op === 'duration' ? true : false, 
                    this.data.time_expire?.op === 'duration' ? this.data.time_expire.minutes : this.data.time_expire?.time,
                    permission, this.data?.description??'', perm?undefined:passport)
            } else {
                obj = Demand.New(txb, this.type_parameter!, true, 30*24*60, // 30days default
                    permission, this.data?.description??'', perm?undefined:passport)       
            }
        }

        if (!obj)   ERROR(Errors.InvalidParam, 'CallDemand_Data.data.object');
        if (!permission)   ERROR(Errors.InvalidParam, 'CallDemand_Data.data.object.permission');

        const pst = perm?undefined:passport;
        if (this.data?.present != null) {
            if ((this.content as ObjectDemand)?.guard?.service_id_in_guard != null && (this.content as ObjectDemand)?.guard?.service_id_in_guard !== null) {
                obj?.present((this.content as ObjectDemand)!.guard!.service_id_in_guard!, undefined, this.data.present.recommend_words, pst);
            } else {
                const service_address = await LocalMark.Instance().get_address(this.data.present.service);
                if (!service_address) ERROR(Errors.InvalidParam, 'CallDemand_Data.data.present.service');
                const r = await query_objects({objects:[service_address]});
                if (r?.objects?.length !== 1 || r?.objects[0]?.type !== 'Service') {
                    ERROR(Errors.InvalidParam, 'CallDemand_Data.data.present.service: ' + service_address);
                }
                const service_type = Service.parseOrderObjectType(r.objects[0].type_raw);
                if (!service_type) {
                    ERROR(Errors.InvalidParam, 'CallDemand_Data.data.present.service: ' + service_address);
                }

                obj?.present(service_address, service_type, this.data.present.recommend_words, pst);
            }
        }

        if (this.data?.description != null && this.object_address) {
            obj?.set_description(this.data.description, pst);
        }
        if (this.data?.time_expire != null && this.object_address) {
            obj?.expand_time(this.data.time_expire.op === 'duration' ? true : false, 
                this.data.time_expire.op === 'duration' ? this.data.time_expire.minutes : this.data.time_expire.time, pst)
        }
        if (this.data?.bounty != null) {
            if (this.data.bounty.op === 'add') {
                const bounty = await LocalMark.Instance().get_address((this.data.bounty.object as any)?.address)
                if (bounty) {
                    obj.deposit(bounty)
                } else if ((this.data.bounty.object as any)?.balance != null){
                    const r = await Account.Instance().get_coin_object(txb, (this.data.bounty.object as any)?.balance, account, this.type_parameter);
                    if (r) obj.deposit(r)
                }
            } else if (this.data.bounty.op === 'reward') {
                const service = await localStorage.Instance().get_address(this.data.bounty.service);
                if (!service) ERROR(Errors.InvalidParam, 'CallDemand_Data.data.bounty.service');
                obj?.yes(service, pst);
            } else if (this.data.bounty.op === 'refund') {
                obj?.refund(pst);
            } 
        }
        
        if (this.data?.guard != null) {
            const guard = await LocalMark.Instance().get_address(this.data?.guard.address);
            if (!guard) { 
                ERROR(Errors.InvalidParam, 'CallDemand_Data.data.guard.address')
            }
            obj?.set_guard(guard, this.data.guard?.service_id_in_guard ?? undefined, pst);
        }
        if (perm) {
            const n = GetObjectMain(this.data.object) as TypeNamedObjectWithPermission;
            await this.new_with_mark('Permission', txb, perm.launch(), GetObjectParam(n?.permission), account);
        }
        if (!this.data.object) {
            await this.new_with_mark('Demand', txb, obj.launch(), GetObjectMain(this.data?.object), account);
        }
    }
}