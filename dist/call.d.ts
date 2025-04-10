/**
 * Provide an operate interface for AI
 * Restrictive prioritization, such as setting a deposit first and setting a deposit guard later (only subsequent deposits are affected).
 */
import { CallArbitration_Data } from "./call/arbitration.js";
import { CallDemand_Data } from "./call/demand.js";
import { CallMachine_Data } from "./call/machine.js";
import { CallPermission_Data } from "./call/permission.js";
import { CallPersonal_Data } from "./call/personal.js";
import { CallRepository_Data } from "./call/repository.js";
import { CallService_Data } from "./call/service.js";
import { CallTreasury_Data } from "./call/treasury.js";
import { CallResult, GuardInfo_forCall } from "./call/base.js";
import { CallGuard_Data } from "./call/guard.js";
import { CallObjectPermission_Data } from "./call/object_permission.js";
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