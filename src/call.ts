
/**
 * Provide a this interface for AI
 * Operation sequence Priority: common operation > Guard change > permission change
 * Recommended: Changes to guard and permission are committed on-chain separately to avoid permission dependencies for other operations.
 */

import { CallArbitration, CallArbitration_Data } from "./call/arbitration";
import { CallDemand, CallDemand_Data } from "./call/demand";
import { CallMachine, CallMachine_Data } from "./call/machine";
import { CallPermission, CallPermission_Data } from "./call/permission";
import { CallPersonal, CallPersonal_Data } from "./call/personal";
import { CallRepository, CallRepository_Data } from "./call/repository";
import { CallService, CallService_Data } from "./call/service";
import { CallTreasury, CallTreasury_Data } from "./call/treasury";
import { CallBase, CallResult, CallWithWitnessParam } from "./call/base";
import { CallGuard, CallGuard_Data } from "./call/guard";

 
export interface CallObjectData {
    type: 'Demand' | 'Service' | 'Machine' | 'Treasury' | 'Arbitration' | 'Guard' | 'Repository' | 'Personal' | 'Permission';
    data: CallDemand_Data | CallMachine_Data | CallArbitration_Data | CallPermission_Data | CallPermission_Data
    | CallTreasury_Data | CallService_Data | CallPermission_Data | CallRepository_Data;
    account?: string;
    witness?: CallWithWitnessParam;
}

export const call_object_json = async (json: string) : Promise<string> => {
    try {
        const c : CallObjectData = JSON.parse(json);
        return JSON.stringify({data:await call_object(c)});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}

export const call_object = async (call: CallObjectData) : Promise<CallResult> => {
    var obj = call_object_new(call);

    if (obj) {
        if (call.witness) {
            return obj.call_with_witness(call.witness);
        } else {
            return obj.call(call.account);
        }
    }
}

function call_object_new (call: CallObjectData) : CallBase | undefined {
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
    }
}