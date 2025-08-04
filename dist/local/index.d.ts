import { CallResponse, CoinBalance, CoinStruct, CoinTypeInfo } from "wowok";
import { AccountData, DEFAULT_NAME } from "./account.js";
import { InfoData, LocalMarkFilter, MarkData } from "./local.js";
import { SessionOption } from "../common.js";
import { CoinDataFilter } from "./coin.js";
export declare const query_local_mark_list: (filter?: LocalMarkFilter) => Promise<string>;
export declare const query_account_list: (showSuspendedAccount?: boolean) => Promise<AccountData[]>;
export declare const query_local_info_list: () => Promise<string>;
export declare const query_local_mark: (name: string) => Promise<MarkData | undefined>;
export declare enum BalanceOrCoin {
    Balance = "balance",
    Coin = "coin"
}
export interface QueryAccount {
    name_or_address?: string;
    balance_or_coin?: BalanceOrCoin;
    token_type?: string;
    session?: SessionOption;
}
export interface QueryAccountResult {
    name_or_address?: string;
    address?: string;
    balance?: CoinBalance;
    coin?: CoinStruct[];
}
export declare const query_account: (query: QueryAccount) => Promise<QueryAccountResult>;
export declare const query_local_info: (name?: string) => Promise<InfoData | undefined>;
export interface AccountOperation {
    gen?: {
        name?: string | DEFAULT_NAME;
    } | null;
    suspend?: {
        name_or_address?: string | DEFAULT_NAME;
        suspend?: boolean;
    } | null;
    resume?: {
        address: string;
        name?: string | DEFAULT_NAME;
    } | null;
    name?: {
        new_name: string | DEFAULT_NAME;
        name_or_address?: string | DEFAULT_NAME;
    } | null;
    swap_names?: {
        name1?: string | DEFAULT_NAME;
        name2?: string | DEFAULT_NAME;
    } | null;
    transfer?: {
        name_or_address_from?: string;
        name_or_address_to?: string;
        amount: number | string;
        token_type?: string;
        session?: SessionOption;
    } | null;
    faucet?: boolean;
}
export interface AccountOperationResult {
    gen?: {
        address: string;
        name?: string | DEFAULT_NAME;
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
export interface CoinInfoOperation {
    coinType: string;
    alias?: string;
    session?: SessionOption;
}
export declare const coin_info_operation: (op: CoinInfoOperation) => Promise<CoinTypeInfo | undefined>;
export interface CoinInfoQuery {
    filter: CoinDataFilter | 'all fetched';
    session?: SessionOption;
}
export declare const coin_info_query: (op: CoinInfoQuery) => Promise<CoinTypeInfo[]>;
export declare const coin_info_list: () => Promise<CoinTypeInfo[]>;
//# sourceMappingURL=index.d.ts.map