/**
 * Provide an operate interface for AI
 * Restrictive prioritization, such as setting a deposit first and setting a deposit guard later (only subsequent deposits are affected).
 */
import { CallArbitration } from "./call/arbitration";
import { CallDemand } from "./call/demand";
import { CallMachine } from "./call/machine";
import { CallPermission } from "./call/permission";
import { CallPersonal } from "./call/personal";
import { CallRepository } from "./call/repository";
import { CallService } from "./call/service";
import { CallTreasury } from "./call/treasury";
import { CallGuard } from "./call/guard";
import { CallObjectPermission } from "./call/object_permission";
export const call_object_json = async (json) => {
    try {
        const c = JSON.parse(json);
        return JSON.stringify({ data: await call_object(c) });
    }
    catch (e) {
        return JSON.stringify({ error: e?.toString() });
    }
};
export const call_object = async (call) => {
    var obj = call_object_new(call);
    if (obj) {
        if (call.witness) {
            return obj.call_with_witness(call.witness);
        }
        else {
            return obj.call(call.account);
        }
    }
};
function call_object_new(call) {
    switch (call.type) {
        case 'Demand':
            return new CallDemand(call.data);
        case 'Service':
            return new CallService(call.data);
        case 'Machine':
            return new CallMachine(call.data);
        case 'Treasury':
            return new CallTreasury(call.data);
        case 'Arbitration':
            return new CallArbitration(call.data);
        case 'Guard':
            return new CallGuard(call.data);
        case 'Repository':
            return new CallRepository(call.data);
        case 'Personal':
            return new CallPersonal(call.data);
        case 'Permission':
            return new CallPermission(call.data);
        case 'ObjectPermission':
            return new CallObjectPermission(call.data);
    }
}
