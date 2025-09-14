import { IsValidArgType, Service, Errors, ERROR, Permission, PermissionIndex, Demand, ParseType, ValueType } from 'wowok';
import { query_objects, queryTableItem_DemandService } from '../query/objects.js';
import { CallBase, GetObjectExisted, GetObjectMain, GetObjectParam } from "./base.js";
import { Account } from '../local/account.js';
import { LocalMark } from '../local/local.js';
export class CallDemand extends CallBase {
    constructor(data) {
        super();
        this.object_address = undefined;
        this.permission_address = undefined;
        this.type_parameter = undefined;
        this.data = data;
    }
    async prepare() {
        if (!this.object_address) {
            this.object_address = (await LocalMark.Instance().get_address(GetObjectExisted(this.data.object)));
        }
        if (this.object_address) {
            await this.update_content('Demand', this.object_address);
            if (!this.content)
                ERROR(Errors.InvalidParam, 'CallDemand_Data.data.object:' + this.object_address);
            this.permission_address = this.content.permission;
            this.type_parameter = Demand.parseObjectType(this.content.type_raw);
        }
        else {
            const n = GetObjectMain(this.data.object);
            if (!IsValidArgType(n?.type_parameter)) {
                ERROR(Errors.IsValidArgType, 'CallDemand_Data.data.object.type_parameter');
            }
            this.permission_address = (await LocalMark.Instance().get_address(GetObjectExisted(n?.permission)));
            this.type_parameter = n?.type_parameter;
        }
    }
    async call(account) {
        const guards = [];
        const perms = [];
        let payload = [];
        const add_perm = (index) => {
            if (this.permission_address && !perms.includes(index)) {
                perms.push(index);
            }
        };
        await this.prepare();
        if (!this.object_address) {
            add_perm(PermissionIndex.demand);
        }
        if (this.data?.description != null && this.object_address) {
            add_perm(PermissionIndex.demand_description);
        }
        if (this.data?.location != null) {
            add_perm(PermissionIndex.demand_location);
        }
        if (this.data?.time_expire != null && this.object_address) {
            add_perm(PermissionIndex.demand_expand_time);
        }
        if (this.data?.bounty?.op === 'reward') {
            if (!this.object_address)
                ERROR(Errors.InvalidParam, `CallDemand_Data.data.bounty.op ${this.data?.bounty?.op}. Only the created Demand object can be used to distribute the reward`);
            const service = await LocalMark.Instance().get_address(this.data.bounty?.service);
            if (!service)
                ERROR(Errors.InvalidParam, `CallDemand_Data.data.bounty.service ${this.data?.bounty?.service}`);
            const n = await queryTableItem_DemandService({ parent: this.object_address, address: service, no_cache: true });
            if (n?.type !== 'TableItem_DemandPresenter')
                ERROR(Errors.InvalidParam, `CallDemand_Data.data.bounty.service. This service ${this.data?.bounty?.service} has not yet been recommended to the Demand object.`);
            this.data.bounty.service = service;
            add_perm(PermissionIndex.demand_yes);
        }
        if (this.data?.bounty?.op === 'refund') {
            add_perm(PermissionIndex.demand_refund);
        }
        if (this.data?.guard != null) {
            add_perm(PermissionIndex.demand_guard);
        }
        if (this.data?.present != null) {
            if (this.object_address) {
                if (this.content?.guard?.object) {
                    guards.push(this.content.guard?.object);
                    if (this.content?.guard?.service_id_in_guard != null) {
                        payload.push({ guard: this.content.guard?.object, identifier: this.content.guard?.service_id_in_guard });
                    }
                }
            }
        }
        if (this.permission_address || guards.length > 0) {
            return await this.check_permission_and_call(this.permission_address, perms, guards, undefined, undefined, payload, account);
        }
        return await this.exec(account);
    }
    async operate(txb, passport, payload, account) {
        let obj;
        let perm;
        let permission;
        if (this.object_address) {
            obj = Demand.From(txb, this.type_parameter, this.permission_address, this.object_address);
            permission = this.permission_address;
        }
        else {
            const n = GetObjectMain(this.data.object);
            permission = await LocalMark.Instance().get_address(GetObjectExisted(n?.permission));
            if (!permission) {
                perm = Permission.New(txb, GetObjectParam(n?.permission)?.description ?? '');
                permission = perm.get_object();
            }
            if (this.data.time_expire != null) {
                obj = Demand.New(txb, this.type_parameter, this.data.time_expire?.op === 'duration' ? true : false, this.data.time_expire?.op === 'duration' ? this.data.time_expire.minutes : this.data.time_expire?.time, permission, this.data?.description ?? '', perm ? undefined : passport);
            }
            else {
                obj = Demand.New(txb, this.type_parameter, true, 30 * 24 * 60, // 30days default
                permission, this.data?.description ?? '', perm ? undefined : passport);
            }
        }
        if (!obj)
            ERROR(Errors.InvalidParam, 'CallDemand_Data.data.object');
        if (!permission)
            ERROR(Errors.InvalidParam, 'CallDemand_Data.data.object.permission');
        const pst = perm ? undefined : passport;
        let service_address;
        if (this.data?.present != null) {
            if (this.content?.guard?.object != null && this.content?.guard?.service_id_in_guard != null) {
                service_address = payload?.find(v => v.guard === this.content?.guard?.object &&
                    v.identifier === this.content?.guard?.service_id_in_guard)?.value ?? '';
            }
            else {
                service_address = await LocalMark.Instance().get_address(this.data.present.service);
            }
            if (!service_address)
                ERROR(Errors.InvalidParam, 'CallDemand_Data.data.present.service');
            const r = await query_objects({ objects: [service_address] });
            if (r?.objects?.length !== 1 || r?.objects[0]?.type !== 'Service') {
                ERROR(Errors.InvalidParam, 'CallDemand_Data.data.present.service is NOT a Service object: ' + service_address);
            }
            const service_type = Service.parseObjectType(r.objects[0].type_raw);
            if (!service_type) {
                ERROR(Errors.IsValidTokenType, 'CallDemand_Data.data.present.service : ' + service_address);
            }
            obj?.present(service_address, service_type, this.data.present.recommend_words, pst);
        }
        if (this.data?.description != null && this.object_address) {
            obj?.set_description(this.data.description, pst);
        }
        if (this.data?.location != null) {
            obj?.set_location(this.data.location, pst);
        }
        if (this.data?.time_expire != null && this.object_address) {
            obj?.expand_time(this.data.time_expire.op === 'duration' ? true : false, this.data.time_expire.op === 'duration' ? this.data.time_expire.minutes : this.data.time_expire.time, pst);
        }
        if (this.data?.bounty != null) {
            if (this.data.bounty.op === 'add') {
                const bounty = await LocalMark.Instance().get_address(this.data.bounty.object?.address);
                if (bounty) {
                    obj.deposit(bounty);
                }
                else if (this.data.bounty.object?.balance != null) {
                    const c = ParseType(this.type_parameter);
                    if (!c.isCoin)
                        ERROR(Errors.Fail, `Deamnd type_parameter is NOT Coin ${this.type_parameter}`);
                    const r = await Account.Instance().get_coin_object(txb, this.data.bounty.object?.balance, account, c.coin);
                    if (r)
                        obj.deposit(r);
                }
            }
            else if (this.data.bounty.op === 'reward') {
                obj?.yes(this.data.bounty?.service, pst);
            }
            else if (this.data.bounty.op === 'refund') {
                obj?.refund(pst);
            }
        }
        if (this.data?.guard != null) {
            if (!this.data?.guard.guard) {
                obj?.set_guard(null, undefined, pst);
            }
            else {
                const guard = await LocalMark.Instance().get_address(this.data?.guard.guard);
                if (!guard) {
                    ERROR(Errors.InvalidParam, `CallDemand_Data.data.guard.guard: ${guard}`);
                }
                const r = await query_objects({ objects: [guard] });
                if (r?.objects?.length !== 1 || r?.objects[0]?.type !== 'Guard') {
                    ERROR(Errors.InvalidParam, `CallDemand_Data.data.guard.guard is NOT a Guard object:${guard}`);
                }
                if (this.data?.guard?.service_id_in_guard != null) {
                    if (!r?.objects[0]?.identifier?.find(v => v.id === this.data?.guard?.service_id_in_guard && v.value_type === ValueType.TYPE_ADDRESS)) {
                        ERROR(Errors.InvalidParam, `CallDemand_Data.data.guard.service_id_in_guard(${this.data?.guard?.service_id_in_guard}) NOT exist in Guard identifiers or type invalid`);
                    }
                }
                obj?.set_guard(guard, this.data.guard?.service_id_in_guard ?? undefined, pst);
            }
        }
        if (perm) {
            const n = GetObjectMain(this.data.object);
            await this.new_with_mark('Permission', txb, perm.launch(), GetObjectParam(n?.permission), account);
        }
        if (!this.object_address) {
            await this.new_with_mark('Demand', txb, obj.launch(), GetObjectMain(this.data?.object), account);
        }
    }
}
//# sourceMappingURL=demand.js.map