
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

export type CallObjectType = 'Demand' | 'Service' | 'Machine' | 'Treasury' | 'Arbitration' | 'Guard' | 'Repository' | 'Personal' | 'Permission' | 'ObjectPermission';
export type CallObjectData = CallDemand_Data | CallMachine_Data | CallArbitration_Data | CallPermission_Data | CallObjectPermission_Data
| CallTreasury_Data | CallService_Data  | CallRepository_Data;
export interface CallObject {
    type: CallObjectType;
    data: CallObjectData;
    account?: string;
    witness?: GuardInfo_forCall;
}

export const call_object_json = async (json: string) : Promise<string> => {
    try {
        const c : CallObject = JSON.parse(json);
        return JSON.stringify({data:await call_object(c)});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}

export const call_object = async (call: CallObject) : Promise<CallResult> => {
    var obj = call_object_new(call);

    if (obj) {
        if (call.witness) {
            return obj.call_with_witness(call.witness, call.account);
        } else {
            return obj.call(call.account);
        }
    }
}

function call_object_new (call: CallObject) : CallBase | undefined {
    switch (call.type) {
        case 'Demand':
            return new CallDemand(call.data as CallDemand_Data);
        case 'Service':
            return new CallService(call.data as CallService_Data);
        case 'Machine':
            return new CallMachine(call.data as CallMachine_Data);
        case 'Treasury':
            return new CallTreasury(call.data as CallTreasury_Data);
        case 'Arbitration':
            return new CallArbitration(call.data as CallArbitration_Data);
        case 'Guard':
            return new CallGuard(call.data as CallGuard_Data);
        case 'Repository':
            return new CallRepository(call.data as CallRepository_Data);
        case 'Personal':
            return new CallPersonal(call.data as CallPersonal_Data);
        case 'Permission':
            return new CallPermission(call.data as CallPermission_Data);
        case 'ObjectPermission':
            return new CallObjectPermission(call.data as CallObjectPermission_Data);
    }
}