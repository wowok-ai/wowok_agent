
/**
 * Provide an operate interface for AI
 * Restrictive prioritization, such as setting a deposit first and setting a deposit guard later (only subsequent deposits are affected).
 */

import { CallArbitration, CallArbitration_Data } from "./call/arbitration";
import { CallDemand, CallDemand_Data } from "./call/demand";
import { CallMachine, CallMachine_Data } from "./call/machine";
import { CallPermission, CallPermission_Data } from "./call/permission";
import { CallPersonal, CallPersonal_Data } from "./call/personal";
import { CallRepository, CallRepository_Data } from "./call/repository";
import { CallService, CallService_Data } from "./call/service";
import { CallTreasury, CallTreasury_Data } from "./call/treasury";
import { CallBase, CallResult, GuardInfo_forCall } from "./call/base";
import { CallGuard, CallGuard_Data } from "./call/guard";
import { CallObjectPermission, CallObjectPermission_Data } from "./call/object_permission";

export interface CallDemandObject {
    data: CallDemand_Data;
    account?: string;
    witness?: GuardInfo_forCall;
}

export interface CallServiceObject {
    data: CallService_Data;
    account?: string;
    witness?: GuardInfo_forCall;
}
export interface CallMachineObject {
    data: CallMachine_Data;
    account?: string;
    witness?: GuardInfo_forCall;
}
export interface CallTreasuryObject {
    data: CallTreasury_Data;
    account?: string;
    witness?: GuardInfo_forCall;
}
export interface CallArbitrationObject {
    data: CallArbitration_Data;
    account?: string;
    witness?: GuardInfo_forCall;
}
export interface CallGuardObject {
    data: CallGuard_Data;
    account?: string;
    witness?: GuardInfo_forCall;
}
export interface CallRepositoryObject {
    data: CallRepository_Data;
    account?: string;
    witness?: GuardInfo_forCall;
}
export interface CallPersonalObject {
    data: CallPersonal_Data;
    account?: string;
    witness?: GuardInfo_forCall;
}
export interface CallPermissionObject {
    data: CallPermission_Data;
    account?: string;
    witness?: GuardInfo_forCall;
}

export interface CallTransferPermissionObject {
    data: CallObjectPermission_Data;
    account?: string;
    witness?: GuardInfo_forCall;
}

export const call_demand_json = async (json: string) : Promise<string> => {
    try {
        const c : CallDemandObject = JSON.parse(json);
        return JSON.stringify({data:await call_demand(c)});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}

export const call_service_json = async (json: string) : Promise<string> => {
    try {
        const c : CallServiceObject = JSON.parse(json);
        return JSON.stringify({data:await call_service(c)});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}
export const call_machine_json = async (json: string) : Promise<string> => {
    try {
        const c : CallMachineObject = JSON.parse(json);
        return JSON.stringify({data:await call_machine(c)});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}
export const call_repository_json = async (json: string) : Promise<string> => {
    try {
        const c : CallRepositoryObject = JSON.parse(json);
        return JSON.stringify({data:await call_repository(c)});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}
export const call_permission_json = async (json: string) : Promise<string> => {
    try {
        const c : CallPermissionObject = JSON.parse(json);
        return JSON.stringify({data:await call_permission(c)});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}
export const call_transferpermission_json = async (json: string) : Promise<string> => {
    try {
        const c : CallTransferPermissionObject = JSON.parse(json);
        return JSON.stringify({data:await call_transfer_permission(c)});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}
export const call_treasury_json = async (json: string) : Promise<string> => {
    try {
        const c : CallTreasuryObject = JSON.parse(json);
        return JSON.stringify({data:await call_treasury(c)});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}
export const call_arbitration_json = async (json: string) : Promise<string> => {
    try {
        const c : CallArbitrationObject = JSON.parse(json);
        return JSON.stringify({data:await call_arbitration(c)});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}
export const call_personal_json = async (json: string) : Promise<string> => {
    try {
        const c : CallPersonalObject = JSON.parse(json);
        return JSON.stringify({data:await call_personal(c)});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}
export const call_guard_json = async (json: string) : Promise<string> => {
    try {
        const c : CallGuardObject = JSON.parse(json);
        return JSON.stringify({data:await call_guard(c)});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}

export const call_demand = async (call:CallDemandObject) : Promise<CallResult> => {
    const obj = new CallDemand(call.data);
    return call_object(obj, call.account, call.witness)
}
export const call_service = async (call:CallServiceObject) : Promise<CallResult> => {
    const obj = new CallService(call.data);
    return call_object(obj, call.account, call.witness)
}
export const call_treasury = async (call:CallTreasuryObject) : Promise<CallResult> => {
    const obj = new CallTreasury(call.data);
    return call_object(obj, call.account, call.witness)
}
export const call_repository = async (call:CallRepositoryObject) : Promise<CallResult> => {
    const obj = new CallRepository(call.data);
    return call_object(obj, call.account, call.witness)
}
export const call_guard = async (call:CallGuardObject) : Promise<CallResult> => {
    const obj = new CallGuard(call.data);
    return call_object(obj, call.account, call.witness)
}
export const call_machine = async (call:CallMachineObject) : Promise<CallResult> => {
    const obj = new CallMachine(call.data);
    return call_object(obj, call.account, call.witness)
}
export const call_personal = async (call:CallPersonalObject) : Promise<CallResult> => {
    const obj = new CallPersonal(call.data);
    return call_object(obj, call.account, call.witness)
}
export const call_permission = async (call:CallPermissionObject) : Promise<CallResult> => {
    const obj = new CallPermission(call.data);
    return call_object(obj, call.account, call.witness)
}
export const call_transfer_permission = async (call:CallTransferPermissionObject) : Promise<CallResult> => {
    const obj = new CallObjectPermission(call.data);
    return call_object(obj, call.account, call.witness)
}
export const call_arbitration = async (call:CallArbitrationObject) : Promise<CallResult> => {
    const obj = new CallArbitration(call.data);
    return call_object(obj, call.account, call.witness)
}

const call_object = async (object: CallBase, account?: string, witness?: GuardInfo_forCall) : Promise<CallResult> => {
    if (witness) {
        return object.call_with_witness(witness, account);
    } else {
        return object.call(account);
    }
}
