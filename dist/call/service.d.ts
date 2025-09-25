import { TransactionBlock, PassportObject, BuyRequiredEnum, Service_Guard_Rate, Service_Sale, Service_Discount } from 'wowok';
import { AccountOrMark_Address, CallBase, CallResult, Namedbject, ObjectParam, ObjectTypedMain, ObjectsOp, PayParam, PassportPayload } from "./base.js";
export interface ServiceWithdraw extends PayParam {
    withdraw_guard: string;
}
export interface DicountDispatch {
    receiver: AccountOrMark_Address;
    discount: Service_Discount;
    count?: number;
}
export interface RefundWithGuard {
    order: string;
    refund_guard: string;
}
export interface RefundWithArb {
    order: string;
    arb: string;
}
export type Service_Buy = {
    item: string;
    max_price: string | number | bigint;
    count: string | number | bigint;
};
export interface CallService_Data {
    object: ObjectTypedMain;
    order_new?: {
        buy_items: Service_Buy[];
        discount_object?: string | null;
        customer_info_required?: string;
        namedNewOrder?: Namedbject;
        namedNewProgress?: Namedbject;
    };
    order_receive?: {
        order: string;
    };
    order_agent?: {
        order?: string;
        agents: AccountOrMark_Address[];
    };
    order_required_info?: {
        order: string;
        customer_info_required?: string;
    };
    order_refund?: RefundWithGuard | RefundWithArb;
    order_withdrawl?: {
        order: string;
        data: ServiceWithdraw;
    };
    order_payer?: {
        order?: string;
        payer_new: AccountOrMark_Address;
    };
    description?: string;
    location?: string;
    endpoint?: string | null;
    payee_treasury?: ObjectParam;
    gen_discount?: DicountDispatch[];
    repository?: ObjectsOp;
    extern_withdraw_treasury?: ObjectsOp;
    machine?: string | null;
    arbitration?: ObjectsOp;
    customer_required_info?: {
        pubkey: string;
        required_info: (string | BuyRequiredEnum)[];
    } | null;
    sales?: {
        op: 'add';
        sales: Service_Sale[];
    } | {
        op: 'remove';
        sales_name: string[];
    };
    withdraw_guard?: {
        op: 'add' | 'set';
        guards: Service_Guard_Rate[];
    } | {
        op: 'removeall';
    } | {
        op: 'remove';
        guards: string[];
    };
    refund_guard?: {
        op: 'add' | 'set';
        guards: Service_Guard_Rate[];
    } | {
        op: 'removeall';
    } | {
        op: 'remove';
        guards: string[];
    };
    bPublished?: boolean;
    buy_guard?: string | null;
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
    private checkPublished;
    private checkNotPublished;
    private checkNotPaused;
    protected prepare(): Promise<void>;
    call(account?: string): Promise<CallResult>;
    private order_allowed;
    private order_progress;
    protected operate(txb: TransactionBlock, passport?: PassportObject, payload?: PassportPayload[], account?: string): Promise<void>;
    private info_crypto;
}
//# sourceMappingURL=service.d.ts.map