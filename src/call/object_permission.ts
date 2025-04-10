import { CallBase, CallResult } from "./base.js";
import { TransactionBlock, PassportObject, IsValidAddress, Errors, ERROR,  Demand, Machine, Service, Treasury, Arbitration, Repository} from 'wowok';
import { ObjectArbitration, ObjectDemand, ObjectMachine, ObjectRepository, ObjectService, ObjectTreasury, query_objects } from "../objects.js";

export interface CallObjectPermission_Data {
    objects: string[];
    new_permission: string;
}

export class CallObjectPermission extends CallBase {
    data: CallObjectPermission_Data;
    constructor(data:CallObjectPermission_Data) {
        super();
        this.data = data;
    }

    async call(account?:string) : Promise<CallResult>   {
        if (!IsValidAddress(this.data.new_permission)) {
            ERROR(Errors.InvalidParam, 'CallObjectPermission_Data.new_permission' + this.data.new_permission)
        }

        if (this.data?.objects.length > 0) {
            return await this.exec(account)
        }
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject) {
        const r = await query_objects({objects:this.data.objects, showContent:true});
        r.objects?.forEach(v => {
            switch(v.type) {
            case 'Demand':
                const demand = v as ObjectDemand;
                Demand.From(txb, Demand.parseObjectType(demand.type_raw), demand.permission, demand.object).change_permission(this.data.new_permission);
                break;
            case 'Machine':
                const machine = v as ObjectMachine;
                Machine.From(txb, machine.permission, machine.object).change_permission(this.data.new_permission);
                break;
            case 'Service':
                const service = v as ObjectService;
                Service.From(txb, Service.parseObjectType(service.type_raw), service.permission, service.object).change_permission(this.data.new_permission);
                break;
            case 'Treasury':
                const treasury = v as ObjectTreasury;
                Treasury.From(txb, Treasury.parseObjectType(treasury.type_raw), treasury.permission, treasury.object).change_permission(this.data.new_permission);
                break;
            case 'Arbitration':
                const arbitraion = v as ObjectArbitration;
                Arbitration.From(txb, Arbitration.parseObjectType(arbitraion.type_raw), arbitraion.permission, arbitraion.object).change_permission(this.data.new_permission);
                break;
            case 'Repository':
                const repository = v as ObjectRepository;
                Repository.From(txb, repository.permission, repository.object).change_permission(this.data.new_permission);
                break;
            }
        })
    }
}