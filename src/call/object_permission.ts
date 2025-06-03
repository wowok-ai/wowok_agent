import { CallBase, CallResult } from "./base.js";
import { TransactionBlock, PassportObject, Errors, ERROR,  Demand, Machine, Service, Treasury, Arbitration, Repository} from 'wowok';
import { ObjectArbitration, ObjectDemand, ObjectMachine, ObjectRepository, ObjectService, ObjectTreasury, query_objects } from "../query/objects.js";
import { LocalMark } from "../local/local.js";

export interface CallObjectPermission_Data {
    objects: string[];
    new_permission: string;
}

export class CallObjectPermission extends CallBase {
    data: CallObjectPermission_Data;
    new_perm: string | undefined = undefined;

    constructor(data:CallObjectPermission_Data) {
        super();
        this.data = data;
    }

    async call(account?:string) : Promise<CallResult>   {
        this.new_perm = await LocalMark.Instance().get_address(this.data.new_permission);
        if (!this.new_perm) {
            ERROR(Errors.InvalidParam, 'CallObjectPermission_Data.new_permission:' + this.data.new_permission)
        }

        if (this.data?.objects.length > 0) {
            for(let i=0; i < this.data.objects.length; i++) {
                const obj = await LocalMark.Instance().get_address(this.data.objects[i]);

                if (!obj) {
                    ERROR(Errors.InvalidParam, 'CallObjectPermission_Data.objects[' + i + ']:' + this.data.objects[i])
                }

                this.data.objects[i] = obj;
            }
            return await this.exec(account)
        }
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject) {
        const r = await query_objects({objects:this.data.objects});
        r.objects?.forEach(v => {
            switch(v.type) {
            case 'Demand':
                const demand = v as ObjectDemand;
                Demand.From(txb, Demand.parseObjectType(demand.type_raw), demand.permission, demand.object).change_permission(this.new_perm!);
                break;
            case 'Machine':
                const machine = v as ObjectMachine;
                Machine.From(txb, machine.permission, machine.object).change_permission(this.new_perm!);
                break;
            case 'Service':
                const service = v as ObjectService;
                Service.From(txb, Service.parseObjectType(service.type_raw), service.permission, service.object).change_permission(this.new_perm!);
                break;
            case 'Treasury':
                const treasury = v as ObjectTreasury;
                Treasury.From(txb, Treasury.parseObjectType(treasury.type_raw), treasury.permission, treasury.object).change_permission(this.new_perm!);
                break;
            case 'Arbitration':
                const arbitraion = v as ObjectArbitration;
                Arbitration.From(txb, Arbitration.parseObjectType(arbitraion.type_raw), arbitraion.permission, arbitraion.object).change_permission(this.new_perm!);
                break;
            case 'Repository':
                const repository = v as ObjectRepository;
                Repository.From(txb, repository.permission, repository.object).change_permission(this.new_perm!);
                break;
            }
        })
    }
}