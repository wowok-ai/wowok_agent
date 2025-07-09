/**
 * Provide an operate interface for AI
 * Restrictive prioritization, such as setting a deposit first and setting a deposit guard later (only subsequent deposits are affected).
 */
import { CallArbitration } from "./arbitration.js";
import { CallDemand } from "./demand.js";
import { CallMachine } from "./machine.js";
import { CallPermission } from "./permission.js";
import { CallPersonal } from "./personal.js";
import { CallRepository } from "./repository.js";
import { CallService } from "./service.js";
import { CallTreasury } from "./treasury.js";
import { CallGuard } from "./guard.js";
import { CallObjectPermission } from "./object_permission.js";
export const call_demand_json = async (json) => {
    const r = await call_demand(JSON.parse(json));
    if (r?.error) {
        return JSON.stringify({ error: r?.error });
    }
    return JSON.stringify({ data: r });
};
export const call_service_json = async (json) => {
    const r = await call_service(JSON.parse(json));
    if (r?.error) {
        return JSON.stringify({ error: r?.error });
    }
    return JSON.stringify({ data: r });
};
export const call_machine_json = async (json) => {
    const r = await call_machine(JSON.parse(json));
    if (r?.error) {
        return JSON.stringify({ error: r?.error });
    }
    return JSON.stringify({ data: r });
};
export const call_repository_json = async (json) => {
    const r = await call_repository(JSON.parse(json));
    if (r?.error) {
        return JSON.stringify({ error: r?.error });
    }
    return JSON.stringify({ data: r });
};
export const call_permission_json = async (json) => {
    const r = await call_permission(JSON.parse(json));
    if (r?.error) {
        return JSON.stringify({ error: r?.error });
    }
    return JSON.stringify({ data: r });
};
export const call_transferpermission_json = async (json) => {
    const r = await call_transfer_permission(JSON.parse(json));
    if (r?.error) {
        return JSON.stringify({ error: r?.error });
    }
    return JSON.stringify({ data: r });
};
export const call_treasury_json = async (json) => {
    const r = await call_treasury(JSON.parse(json));
    if (r?.error) {
        return JSON.stringify({ error: r?.error });
    }
    return JSON.stringify({ data: r });
};
export const call_arbitration_json = async (json) => {
    const r = await call_arbitration(JSON.parse(json));
    if (r?.error) {
        return JSON.stringify({ error: r?.error });
    }
    return JSON.stringify({ data: r });
};
export const call_personal_json = async (json) => {
    const r = await call_personal(JSON.parse(json));
    if (r?.error) {
        return JSON.stringify({ error: r?.error });
    }
    return JSON.stringify({ data: r });
};
export const call_guard_json = async (json) => {
    const r = await call_guard(JSON.parse(json));
    if (r?.error) {
        return JSON.stringify({ error: r?.error });
    }
    return JSON.stringify({ data: r });
};
export const call_demand = async (call) => {
    const obj = new CallDemand(call.data);
    return await call_object(obj, call.account, call.witness);
};
export const call_service = async (call) => {
    const obj = new CallService(call.data);
    return await call_object(obj, call.account, call.witness);
};
export const call_treasury = async (call) => {
    const obj = new CallTreasury(call.data);
    return await call_object(obj, call.account, call.witness);
};
export const call_repository = async (call) => {
    const obj = new CallRepository(call.data);
    return await call_object(obj, call.account, call.witness);
};
export const call_guard = async (call) => {
    const obj = new CallGuard(call.data);
    return await call_object(obj, call.account);
};
export const call_machine = async (call) => {
    const obj = new CallMachine(call.data);
    return await call_object(obj, call.account, call.witness);
};
export const call_personal = async (call) => {
    const obj = new CallPersonal(call.data);
    return await call_object(obj, call.account);
};
export const call_permission = async (call) => {
    const obj = new CallPermission(call.data);
    return await call_object(obj, call.account, call.witness);
};
export const call_transfer_permission = async (call) => {
    const obj = new CallObjectPermission(call.data);
    return await call_object(obj, call.account, call.witness);
};
export const call_arbitration = async (call) => {
    const obj = new CallArbitration(call.data);
    return await call_object(obj, call.account, call.witness);
};
const call_object = async (object, account, witness) => {
    try {
        if (witness) {
            return await object.call_with_witness(witness, account ?? undefined);
        }
        else {
            return await object.call(account ?? undefined);
        }
    }
    catch (e) {
        return { error: e?.toString() };
    }
};
//# sourceMappingURL=call.js.map