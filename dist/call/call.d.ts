/**
 * Provide an operate interface for AI
 * Restrictive prioritization, such as setting a deposit first and setting a deposit guard later (only subsequent deposits are affected).
 */
import { CallArbitration_Data } from "./arbitration.js";
import { CallDemand_Data } from "./demand.js";
import { CallMachine_Data } from "./machine.js";
import { CallPermission_Data } from "./permission.js";
import { CallPersonal_Data } from "./personal.js";
import { CallRepository_Data } from "./repository.js";
import { CallService_Data } from "./service.js";
import { CallTreasury_Data } from "./treasury.js";
import { CallResult, GuardInfo_forCall } from "./base.js";
import { CallGuard_Data } from "./guard.js";
import { CallObjectPermission_Data } from "./object_permission.js";
import { SessionOption } from "../common.js";
export interface CallDemandObject {
    data: CallDemand_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    session?: SessionOption;
}
export interface CallServiceObject {
    data: CallService_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    session?: SessionOption;
}
export interface CallMachineObject {
    data: CallMachine_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    session?: SessionOption;
}
export interface CallTreasuryObject {
    data: CallTreasury_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
    session?: SessionOption;
}
export interface CallArbitrationObject {
    data: CallArbitration_Data;
    account?: string | null;
    witness?: GuardInfo_forCall | null;
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
export declare const call_demand_json: (json: string) => Promise<string>;
export declare const call_service_json: (json: string) => Promise<string>;
export declare const call_machine_json: (json: string) => Promise<string>;
export declare const call_repository_json: (json: string) => Promise<string>;
export declare const call_permission_json: (json: string) => Promise<string>;
export declare const call_transferpermission_json: (json: string) => Promise<string>;
export declare const call_treasury_json: (json: string) => Promise<string>;
export declare const call_arbitration_json: (json: string) => Promise<string>;
export declare const call_personal_json: (json: string) => Promise<string>;
export declare const call_guard_json: (json: string) => Promise<string>;
export declare const call_demand: (call: CallDemandObject) => Promise<CallResult>;
export declare const call_service: (call: CallServiceObject) => Promise<CallResult>;
export declare const call_treasury: (call: CallTreasuryObject) => Promise<CallResult>;
export declare const call_repository: (call: CallRepositoryObject) => Promise<CallResult>;
export declare const call_guard: (call: CallGuardObject) => Promise<CallResult>;
export declare const call_machine: (call: CallMachineObject) => Promise<CallResult>;
export declare const call_personal: (call: CallPersonalObject) => Promise<CallResult>;
export declare const call_permission: (call: CallPermissionObject) => Promise<CallResult>;
export declare const call_transfer_permission: (call: CallTransferPermissionObject) => Promise<CallResult>;
export declare const call_arbitration: (call: CallArbitrationObject) => Promise<CallResult>;
//# sourceMappingURL=call.d.ts.map