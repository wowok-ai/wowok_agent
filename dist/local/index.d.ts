import { CallResponse, CoinBalance, CoinStruct } from "wowok";
import { LocalInfo, LocalMarkFilter, MarkData } from "./local.js";
export declare const query_local_mark_list: (filter?: LocalMarkFilter) => Promise<string>;
export declare const query_account_list: () => Promise<QueryAccountsResult>;
export declare const query_local_info_list: () => Promise<string>;
export interface QueryAccountsResult {
    default?: string;
    addresses?: string[];
}
export declare const query_local_mark: (name: string) => Promise<MarkData | undefined>;
export declare enum BalanceOrCoin {
    Balance = "balance",
    Coin = "coin"
}
export interface QueryAccount {
    name_or_address?: string;
    balance_or_coin?: BalanceOrCoin;
    token_type?: string;
}
export interface QueryAccountResult {
    name_or_address?: string;
    address?: string;
    balance?: CoinBalance;
    coin?: CoinStruct[];
}
export declare const query_account: (query: QueryAccount) => Promise<QueryAccountResult>;
export declare const query_local_info: (name?: string) => Promise<LocalInfo | undefined>;
export interface AccountOperation {
    gen?: {
        name?: string;
        default?: boolean;
        useAddressIfNameExist?: boolean;
    } | null;
    transfer?: {
        name_or_address_from?: string;
        name_or_address_to?: string;
        amount: number | string;
        token_type?: string;
    } | null;
}
export interface AccountOperationResult {
    gen?: {
        address: string;
        default: boolean;
        name: string;
    };
    transfer?: CallResponse;
}
export declare const account_operation: (op: AccountOperation) => Promise<AccountOperationResult>;
export interface LocalMarkOperation {
    data: {
        op: 'removeall';
    } | {
        op: 'add';
        data: {
            name: string;
            address: string;
            tags?: string[];
            useAddressIfNameExist?: boolean;
        }[];
    } | {
        op: 'remove';
        data: string[];
    };
}
export declare const local_mark_operation: (op: LocalMarkOperation) => Promise<void>;
export interface LocalInfoOperation {
    data: {
        op: 'removeall';
    } | {
        op: 'add';
        data: {
            name: string;
            content: string;
            bdefault?: boolean;
        }[];
    } | {
        op: 'remove';
        data: string[];
    };
}
export declare const local_info_operation: (op: LocalInfoOperation) => Promise<void>;
//# sourceMappingURL=index.d.ts.map