
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
import { CallBase, CallResponseError, CallResult, GuardInfo_forCall } from "./base.js";
import { CallGuard, CallGuard_Data } from "./guard.js";
import { CallObjectPermission, CallObjectPermission_Data } from "./object_permission.js";
import { session_resolve, SessionOption } from "../common.js";
import { ENTRYPOINT } from "wowok";

export interface CallDemandObject {
    data: CallDemand_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    //no_cache?: boolean;
    session?: SessionOption;
}

export interface CallServiceObject {
    data: CallService_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    //no_cache?: boolean;
    session?: SessionOption;
}
export interface CallMachineObject {
    data: CallMachine_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    //no_cache?: boolean; // true: no cache to query the machine, false: use cache if exist
    session?: SessionOption;
}
export interface CallTreasuryObject {
    data: CallTreasury_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    //no_cache?: boolean;
    session?: SessionOption;
}
export interface CallArbitrationObject {
    data: CallArbitration_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    //no_cache?: boolean;
    session?: SessionOption;
}
export interface CallGuardObject {
    data: CallGuard_Data;
    account?: string | null;
    session?: SessionOption;
}
export interface CallRepositoryObject {
    data: CallRepository_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    session?: SessionOption;
    //no_cache?: boolean;
}
export interface CallPersonalObject {
    data: CallPersonal_Data;
    account?: string | null;
    session?: SessionOption;
}
export interface CallPermissionObject {
    data: CallPermission_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    session?: SessionOption;
}

export interface CallTransferPermissionObject {
    data: CallObjectPermission_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    session?: SessionOption;
}

export const call_demand_json = async (json: string) : Promise<string> => {
    const r = await call_demand(JSON.parse(json));
    if ((r as any)?.error) {
        return JSON.stringify({error:(r as any)?.error});
    }
    return JSON.stringify({data:r});
}

export const call_service_json = async (json: string) : Promise<string> => {
    const r = await call_service(JSON.parse(json));
    if ((r as any)?.error) {
        return JSON.stringify({error:(r as any)?.error});
    }
    return JSON.stringify({data:r});
}
export const call_machine_json = async (json: string) : Promise<string> => {
    const r = await call_machine(JSON.parse(json));
    if ((r as any)?.error) {
        return JSON.stringify({error:(r as any)?.error});
    }
    return JSON.stringify({data:r});
}

export const call_repository_json = async (json: string) : Promise<string> => {
    const r = await call_repository(JSON.parse(json));
    if ((r as any)?.error) {
        return JSON.stringify({error:(r as any)?.error});
    }
    return JSON.stringify({data:r});
}

export const call_permission_json = async (json: string) : Promise<string> => {
    const r = await call_permission(JSON.parse(json));
    if ((r as any)?.error) {
        return JSON.stringify({error:(r as any)?.error});
    }
    return JSON.stringify({data:r});
}

export const call_transferpermission_json = async (json: string) : Promise<string> => {
    const r = await call_transfer_permission(JSON.parse(json));
    if ((r as any)?.error) {
        return JSON.stringify({error:(r as any)?.error});
    }
    return JSON.stringify({data:r});
}

export const call_treasury_json = async (json: string) : Promise<string> => {
    const r = await call_treasury(JSON.parse(json));
    if ((r as any)?.error) {
        return JSON.stringify({error:(r as any)?.error});
    }
    return JSON.stringify({data:r});
}
export const call_arbitration_json = async (json: string) : Promise<string> => {
    const r = await call_arbitration(JSON.parse(json));
    if ((r as any)?.error) {
        return JSON.stringify({error:(r as any)?.error});
    }
    return JSON.stringify({data:r});
}

export const call_personal_json = async (json: string) : Promise<string> => {
    const r = await call_personal(JSON.parse(json));
    if ((r as any)?.error) {
        return JSON.stringify({error:(r as any)?.error});
    }
    return JSON.stringify({data:r});
}

export const call_guard_json = async (json: string) : Promise<string> => {
    const r = await call_guard(JSON.parse(json));
    if ((r as any)?.error) {
        return JSON.stringify({error:(r as any)?.error});
    }
    return JSON.stringify({data:r});
}

export const call_demand = async (call:CallDemandObject) : Promise<CallResult> => {
    await session_resolve(call?.session);
    const obj = new CallDemand(call.data);
    return await call_object(obj, call.account, call.witness)
}
export const call_service = async (call:CallServiceObject) : Promise<CallResult> => {
    await session_resolve(call?.session);
    const obj = new CallService(call.data);
    return await call_object(obj, call.account, call.witness)
}
export const call_treasury = async (call:CallTreasuryObject) : Promise<CallResult> => {
    await session_resolve(call?.session);
    const obj = new CallTreasury(call.data);
    return await call_object(obj, call.account, call.witness)
}
export const call_repository = async (call:CallRepositoryObject) : Promise<CallResult> => {
    await session_resolve(call?.session);
    const obj = new CallRepository(call.data);
    return await call_object(obj, call.account, call.witness)
}
export const call_guard = async (call:CallGuardObject) : Promise<CallResult> => {
    await session_resolve(call?.session);
    const obj = new CallGuard(call.data);
    return await call_object(obj, call.account, undefined)
}
export const call_machine = async (call:CallMachineObject) : Promise<CallResult> => {
    await session_resolve(call?.session);
    const obj = new CallMachine(call.data);
    return await call_object(obj, call.account, call.witness)
}
export const call_personal = async (call:CallPersonalObject) : Promise<CallResult> => {
    await session_resolve(call?.session);
    const obj = new CallPersonal(call.data);
    return await call_object(obj, call.account, undefined);
}
export const call_permission = async (call:CallPermissionObject) : Promise<CallResult> => {
    await session_resolve(call?.session);
    const obj = new CallPermission(call.data);
    return await call_object(obj, call.account, call.witness)
}
export const call_transfer_permission = async (call:CallTransferPermissionObject) : Promise<CallResult> => {
    await session_resolve(call?.session);
    const obj = new CallObjectPermission(call.data);
    return await call_object(obj, call.account, call.witness)
}
export const call_arbitration = async (call:CallArbitrationObject) : Promise<CallResult> => {
    await session_resolve(call?.session);
    const obj = new CallArbitration(call.data);
    return await call_object(obj, call.account, call.witness)
}

const call_object = async (object: CallBase, account?: string | null, witness?: GuardInfo_forCall | null) : Promise<CallResult> => {
    try {
        if (witness) {
            return await object.call_with_witness(witness, account ?? undefined);
        } else {
            return await object.call(account ?? undefined);
        }        
    } catch (e) {
        return {error:e?.toString()} as CallResponseError;
    }
}
