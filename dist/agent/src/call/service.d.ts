import { TransactionBlock, PassportObject, BuyRequiredEnum, Customer_RequiredInfo, DicountDispatch, Service_Buy, Service_Guard_Percent, Service_Sale, WithdrawPayee } from 'wowok';
import { CallBase, CallResult, Namedbject } from "./base";
export interface CallService_Data {
    type_parameter: string;
    object?: {
        address: string;
    } | {
        namedNew: Namedbject;
    };
    permission?: {
        address: string;
    } | {
        namedNew: Namedbject;
        description?: string;
    };
    description?: string;
    endpoint?: string;
    payee_treasury?: {
        address: string;
    } | {
        namedNew: Namedbject;
        description?: string;
    };
    gen_discount?: DicountDispatch[];
    repository?: {
        op: 'set' | 'add' | 'remove';
        repositories: string[];
    } | {
        op: 'removeall';
    };
    extern_withdraw_treasury?: {
        op: 'set' | 'add';
        treasuries: {
            address: string;
            token_type: string;
        }[];
    } | {
        op: 'removeall';
    } | {
        op: 'remove';
        addresses: string[];
    };
    machine?: string;
    arbitration?: {
        op: 'set' | 'add';
        arbitrations: {
            address: string;
            type_parameter: string;
        }[];
    } | {
        op: 'removeall';
    } | {
        op: 'remove';
        addresses: string[];
    };
    customer_required_info?: {
        pubkey: string;
        required_info: (string | BuyRequiredEnum)[];
    };
    sales?: {
        op: 'add';
        sales: Service_Sale[];
    } | {
        op: 'remove';
        sales_name: string[];
    };
    withdraw_guard?: {
        op: 'add' | 'set';
        guards: Service_Guard_Percent[];
    } | {
        op: 'removeall';
    } | {
        op: 'remove';
        addresses: string[];
    };
    refund_guard?: {
        op: 'add' | 'set';
        guards: Service_Guard_Percent[];
    } | {
        op: 'removeall';
    } | {
        op: 'remove';
        addresses: string[];
    };
    bPublished?: boolean;
    order_new?: {
        buy_items: Service_Buy[];
        discount?: string;
        machine?: string;
        customer_info_crypto?: Customer_RequiredInfo;
        guard?: string | 'fetch';
        namedNewOrder?: Namedbject;
        namedNewProgress?: Namedbject;
    };
    order_agent?: {
        order?: string;
        agents: string[];
        progress?: string;
    };
    order_required_info?: {
        order?: string;
        info: Customer_RequiredInfo;
    };
    order_refund?: {
        order?: string;
        guard?: string;
    } | {
        order?: string;
        arb: string;
        arb_token_type: string;
    };
    order_withdrawl?: {
        order?: string;
        data: WithdrawPayee;
    };
    order_payer?: {
        order?: string;
        payer_new: string;
        progress?: string;
    };
    buy_guard?: string;
    bPaused?: boolean;
    clone_new?: {
        token_type_new?: string;
        namedNew?: Namedbject;
    };
}
export declare class CallService extends CallBase {
    data: CallService_Data;
    constructor(data: CallService_Data);
    call(account?: string): Promise<CallResult>;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
}
//# sourceMappingURL=service.d.ts.map