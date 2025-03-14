import { CallBase } from "./base";
import { IsValidAddress, Errors, ERROR, Demand, Machine, Service, Treasury, Arbitration, Repository } from 'wowok';
import { query_objects } from "../objects";
export class CallObjectPermission extends CallBase {
    data;
    constructor(data) {
        super();
        this.data = data;
    }
    async call(account) {
        if (!IsValidAddress(this.data.new_permission)) {
            ERROR(Errors.InvalidParam, 'CallObjectPermission_Data.new_permission' + this.data.new_permission);
        }
        if (this.data?.objects.length > 0) {
            return await this.exec(account);
        }
    }
    async operate(txb, passport) {
        const r = await query_objects({ objects: this.data.objects, showContent: true });
        r.objects?.forEach(v => {
            switch (v.type) {
                case 'Demand':
                    const demand = v;
                    Demand.From(txb, Demand.parseObjectType(demand.type_raw), demand.permission, demand.object).change_permission(this.data.new_permission);
                    break;
                case 'Machine':
                    const machine = v;
                    Machine.From(txb, machine.permission, machine.object).change_permission(this.data.new_permission);
                    break;
                case 'Service':
                    const service = v;
                    Service.From(txb, Service.parseObjectType(service.type_raw), service.permission, service.object).change_permission(this.data.new_permission);
                    break;
                case 'Treasury':
                    const treasury = v;
                    Treasury.From(txb, Treasury.parseObjectType(treasury.type_raw), treasury.permission, treasury.object).change_permission(this.data.new_permission);
                    break;
                case 'Arbitration':
                    const arbitraion = v;
                    Arbitration.From(txb, Arbitration.parseObjectType(arbitraion.type_raw), arbitraion.permission, arbitraion.object).change_permission(this.data.new_permission);
                    break;
                case 'Repository':
                    const repository = v;
                    Repository.From(txb, repository.permission, repository.object).change_permission(this.data.new_permission);
                    break;
            }
        });
    }
}
