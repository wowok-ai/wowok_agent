
/**
 * Provide an operate interface for AI
 * Restrictive prioritization, such as setting a deposit first and setting a deposit guard later (only subsequent deposits are affected).
 */

import { CallArbitration, CallArbitration_Data } from "./arbitration.js";
import { CallDemand, CallDemand_Data } from "./demand.js";
import { CallMachine, CallMachine_Data } from "./machine.js";
import { CallPermission, CallPermission_Data } from "./permission.js";
import { CallPersonal, CallPersonal_Data } from "./personal.js";
import { CallRepository, CallRepository_Data } from "./repository.js";
import { CallService, CallService_Data } from "./service.js";
import { CallTreasury, CallTreasury_Data } from "./treasury.js";
import { CallBase, CallResult, GuardInfo_forCall } from "./base.js";
import { CallGuard, CallGuard_Data } from "./guard.js";
import { CallObjectPermission, CallObjectPermission_Data } from "./object_permission.js";

export interface CallDemandObject {
    data: CallDemand_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    no_cache?: boolean;
}

export interface CallServiceObject {
    data: CallService_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    no_cache?: boolean;
}
export interface CallMachineObject {
    data: CallMachine_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    no_cache?: boolean; // true: no cache to query the machine, false: use cache if exist
}
export interface CallTreasuryObject {
    data: CallTreasury_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    no_cache?: boolean;
}
export interface CallArbitrationObject {
    data: CallArbitration_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    no_cache?: boolean;
}
export interface CallGuardObject {
    data: CallGuard_Data;
    account?: string | null;
}
export interface CallRepositoryObject {
    data: CallRepository_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    no_cache?: boolean;
}
export interface CallPersonalObject {
    data: CallPersonal_Data;
    account?: string | null;
}
export interface CallPermissionObject {
    data: CallPermission_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
}

export interface CallTransferPermissionObject {
    data: CallObjectPermission_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
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
    return await call_object(obj, call.account, call.witness)
}
export const call_service = async (call:CallServiceObject) : Promise<CallResult> => {
    const obj = new CallService(call.data);
    return await call_object(obj, call.account, call.witness)
}
export const call_treasury = async (call:CallTreasuryObject) : Promise<CallResult> => {
    const obj = new CallTreasury(call.data);
    return await call_object(obj, call.account, call.witness)
}
export const call_repository = async (call:CallRepositoryObject) : Promise<CallResult> => {
    const obj = new CallRepository(call.data);
    return await call_object(obj, call.account, call.witness)
}
export const call_guard = async (call:CallGuardObject) : Promise<CallResult> => {
    const obj = new CallGuard(call.data);
    return await call_object(obj, call.account)
}
export const call_machine = async (call:CallMachineObject) : Promise<CallResult> => {
    const obj = new CallMachine(call.data);
    return await call_object(obj, call.account, call.witness)
}
export const call_personal = async (call:CallPersonalObject) : Promise<CallResult> => {
    const obj = new CallPersonal(call.data);
    return await call_object(obj, call.account);
}
export const call_permission = async (call:CallPermissionObject) : Promise<CallResult> => {
    const obj = new CallPermission(call.data);
    return await call_object(obj, call.account, call.witness)
}
export const call_transfer_permission = async (call:CallTransferPermissionObject) : Promise<CallResult> => {
    const obj = new CallObjectPermission(call.data);
    return await call_object(obj, call.account, call.witness)
}
export const call_arbitration = async (call:CallArbitrationObject) : Promise<CallResult> => {
    const obj = new CallArbitration(call.data);
    return await call_object(obj, call.account, call.witness)
}

const call_object = async (object: CallBase, account?: string | null, witness?: GuardInfo_forCall | null) : Promise<CallResult> => {
    if (witness) {
        return await object.call_with_witness(witness, account ?? undefined);
    } else {
        return await object.call(account ?? undefined);
    }
}
