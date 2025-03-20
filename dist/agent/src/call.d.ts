/**
 * Provide an operate interface for AI
 * Restrictive prioritization, such as setting a deposit first and setting a deposit guard later (only subsequent deposits are affected).
 */
import { CallArbitration_Data } from "./call/arbitration";
import { CallDemand_Data } from "./call/demand";
import { CallMachine_Data } from "./call/machine";
import { CallPermission_Data } from "./call/permission";
import { CallRepository_Data } from "./call/repository";
import { CallService_Data } from "./call/service";
import { CallTreasury_Data } from "./call/treasury";
import { CallResult, GuardInfo_forCall } from "./call/base";
import { CallObjectPermission_Data } from "./call/object_permission";
export type CallObjectType = 'Demand' | 'Service' | 'Machine' | 'Treasury' | 'Arbitration' | 'Guard' | 'Repository' | 'Personal' | 'Permission' | 'ObjectPermission';
export type CallObjectData = CallDemand_Data | CallMachine_Data | CallArbitration_Data | CallPermission_Data | CallObjectPermission_Data | CallTreasury_Data | CallService_Data | CallRepository_Data;
export interface CallObject {
    type: CallObjectType;
    data: CallObjectData;
    account?: string;
    witness?: GuardInfo_forCall;
}
export declare const call_object_json: (json: string) => Promise<string>;
export declare const call_object: (call: CallObject) => Promise<CallResult>;
//# sourceMappingURL=call.d.ts.map