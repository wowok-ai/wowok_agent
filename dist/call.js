/**
 * Provide an operate interface for AI
 * Restrictive prioritization, such as setting a deposit first and setting a deposit guard later (only subsequent deposits are affected).
 */
import { CallArbitration } from "./call/arbitration.js";
import { CallDemand } from "./call/demand.js";
import { CallMachine } from "./call/machine.js";
import { CallPermission } from "./call/permission.js";
import { CallPersonal } from "./call/personal.js";
import { CallRepository } from "./call/repository.js";
import { CallService } from "./call/service.js";
import { CallTreasury } from "./call/treasury.js";
import { CallGuard } from "./call/guard.js";
import { CallObjectPermission } from "./call/object_permission.js";
export const call_demand_json = async (json) => {
    try {
        const c = JSON.parse(json);
        return JSON.stringify({ data: await call_demand(c) });
    }
    catch (e) {
        return JSON.stringify({ error: e?.toString() });
    }
};
export const call_service_json = async (json) => {
    try {
        const c = JSON.parse(json);
        return JSON.stringify({ data: await call_service(c) });
    }
    catch (e) {
        return JSON.stringify({ error: e?.toString() });
    }
};
export const call_machine_json = async (json) => {
    try {
        const c = JSON.parse(json);
        return JSON.stringify({ data: await call_machine(c) });
    }
    catch (e) {
        return JSON.stringify({ error: e?.toString() });
    }
};
export const call_repository_json = async (json) => {
    try {
        const c = JSON.parse(json);
        return JSON.stringify({ data: await call_repository(c) });
    }
    catch (e) {
        return JSON.stringify({ error: e?.toString() });
    }
};
export const call_permission_json = async (json) => {
    try {
        const c = JSON.parse(json);
        return JSON.stringify({ data: await call_permission(c) });
    }
    catch (e) {
        return JSON.stringify({ error: e?.toString() });
    }
};
export const call_transferpermission_json = async (json) => {
    try {
        const c = JSON.parse(json);
        return JSON.stringify({ data: await call_transfer_permission(c) });
    }
    catch (e) {
        return JSON.stringify({ error: e?.toString() });
    }
};
export const call_treasury_json = async (json) => {
    try {
        const c = JSON.parse(json);
        return JSON.stringify({ data: await call_treasury(c) });
    }
    catch (e) {
        return JSON.stringify({ error: e?.toString() });
    }
};
export const call_arbitration_json = async (json) => {
    try {
        const c = JSON.parse(json);
        return JSON.stringify({ data: await call_arbitration(c) });
    }
    catch (e) {
        return JSON.stringify({ error: e?.toString() });
    }
};
export const call_personal_json = async (json) => {
    try {
        const c = JSON.parse(json);
        return JSON.stringify({ data: await call_personal(c) });
    }
    catch (e) {
        return JSON.stringify({ error: e?.toString() });
    }
};
export const call_guard_json = async (json) => {
    try {
        const c = JSON.parse(json);
        return JSON.stringify({ data: await call_guard(c) });
    }
    catch (e) {
        return JSON.stringify({ error: e?.toString() });
    }
};
export const call_demand = async (call) => {
    const obj = new CallDemand(call.data);
    return call_object(obj, call.account, call.witness);
};
export const call_service = async (call) => {
    const obj = new CallService(call.data);
    return call_object(obj, call.account, call.witness);
};
export const call_treasury = async (call) => {
    const obj = new CallTreasury(call.data);
    return call_object(obj, call.account, call.witness);
};
export const call_repository = async (call) => {
    const obj = new CallRepository(call.data);
    return call_object(obj, call.account, call.witness);
};
export const call_guard = async (call) => {
    const obj = new CallGuard(call.data);
    return call_object(obj, call.account, call.witness);
};
export const call_machine = async (call) => {
    const obj = new CallMachine(call.data);
    return call_object(obj, call.account, call.witness);
};
export const call_personal = async (call) => {
    const obj = new CallPersonal(call.data);
    return call_object(obj, call.account);
};
export const call_permission = async (call) => {
    const obj = new CallPermission(call.data);
    return call_object(obj, call.account, call.witness);
};
export const call_transfer_permission = async (call) => {
    const obj = new CallObjectPermission(call.data);
    return call_object(obj, call.account, call.witness);
};
export const call_arbitration = async (call) => {
    const obj = new CallArbitration(call.data);
    return call_object(obj, call.account, call.witness);
};
const call_object = async (object, account, witness) => {
    if (witness) {
        return object.call_with_witness(witness, account);
    }
    else {
        return object.call(account);
    }
};
//# sourceMappingURL=call.js.map