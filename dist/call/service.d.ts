import { TransactionBlock, PassportObject, BuyRequiredEnum, Service_Buy, Service_Guard_Percent, Service_Sale, Service_Discount } from 'wowok';
import { AccountOrMark_Address, CallBase, CallResult, Namedbject, ObjectParam, ObjectTypedMain, WithdrawParam } from "./base.js";
export interface ServiceWithdraw extends WithdrawParam {
    withdraw_guard: string;
}
export interface DicountDispatch {
    receiver: AccountOrMark_Address;
    discount: Service_Discount;
    count?: number;
}
export interface CallService_Data {
    object: ObjectTypedMain;
    order_new?: {
        buy_items: Service_Buy[];
        discount_object?: string;
        customer_info_required?: string;
        namedNewOrder?: Namedbject;
        namedNewProgress?: Namedbject;
    };
    order_agent?: {
        order?: string;
        agents: AccountOrMark_Address[];
    };
    order_required_info?: {
        order: string;
        customer_info_required?: string;
    };
    order_refund?: {
        order: string;
    } | {
        order: string;
        arb: string;
    };
    order_withdrawl?: {
        order: string;
        data: ServiceWithdraw;
    };
    order_payer?: {
        order?: string;
        payer_new: AccountOrMark_Address;
    };
    description?: string;
    endpoint?: string;
    payee_treasury?: ObjectParam;
    gen_discount?: DicountDispatch[];
    repository?: {
        op: 'set' | 'add' | 'remove';
        repositories: string[];
    } | {
        op: 'removeall';
    };
    extern_withdraw_treasury?: {
        op: 'set' | 'add' | 'remove';
        treasuries: string[];
    } | {
        op: 'removeall';
    };
    machine?: string;
    arbitration?: {
        op: 'set' | 'add' | 'remove';
        arbitrations: string[];
    } | {
        op: 'removeall';
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
        guards: string[];
    };
    refund_guard?: {
        op: 'add' | 'set';
        guards: Service_Guard_Percent[];
    } | {
        op: 'removeall';
    } | {
        op: 'remove';
        guards: string[];
    };
    bPublished?: boolean;
    buy_guard?: string;
    bPaused?: boolean;
    clone_new?: {
        token_type_new?: string;
        namedNew?: Namedbject;
    };
}
export declare class CallService extends CallBase {
    data: CallService_Data;
    object_address: string | undefined;
    permission_address: string | undefined;
    type_parameter: string | undefined;
    constructor(data: CallService_Data);
    call(account?: string): Promise<CallResult>;
    private order_allowed;
    private order_progress;
    protected operate(txb: TransactionBlock, passport?: PassportObject, account?: string): Promise<void>;
    private info_crypto;
}
//# sourceMappingURL=service.d.ts.map