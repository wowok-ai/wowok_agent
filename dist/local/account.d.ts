/**
 * account management and use
 */
import { TransactionBlock, CoinBalance, CoinStruct, TransactionResult, CallResponse } from 'wowok';
import { SessionOption } from '../common.js';
export type DEFAULT_NAME = 'default';
export declare const DEFAULT_ACCOUNT_NAME = "default";
export interface AccountData {
    address: string;
    secret?: string;
    pubkey?: string;
    name?: string;
    suspended?: boolean;
}
export declare class Account {
    private location;
    constructor();
    get_location(): string;
    static _instance: any;
    static Instance(): Account;
    private accountData;
    gen(name?: string | DEFAULT_NAME): Promise<AccountData>;
    default(): Promise<AccountData | undefined>;
    get(address_or_name?: string): Promise<AccountData | undefined>;
    get_address(address_or_name?: string): Promise<string | undefined>;
    private get_imp;
    get_many(address_or_names: (string | null | undefined)[]): Promise<(AccountData | undefined)[]>;
    private get_many_imp;
    swap_names(name1?: string | DEFAULT_NAME, name2?: string | DEFAULT_NAME): Promise<boolean>;
    set_name(name?: string | DEFAULT_NAME, address_or_name?: string): Promise<boolean>;
    list(showSuspended?: boolean, showSecret?: boolean): Promise<AccountData[]>;
    suspend(address_or_name?: string): Promise<void>;
    resume(address: string, name?: string | DEFAULT_NAME): Promise<void>;
    faucet(address_or_name?: string | DEFAULT_NAME): Promise<void>;
    sign_and_commit(txb: TransactionBlock, address_or_name?: string, session?: SessionOption): Promise<CallResponse | undefined>;
    balance: (address_or_name?: string, token_type?: string, session?: SessionOption) => Promise<CoinBalance | undefined>;
    coin: (token_type?: string, address_or_name?: string, session?: SessionOption) => Promise<CoinStruct[] | undefined>;
    get_coin_object: (txb: TransactionBlock, balance_required: string | bigint | number, address_or_name?: string, token_type?: string, session?: SessionOption) => Promise<TransactionResult | undefined>;
    transfer(amount: number | string, token_type?: string, to_address_or_name?: string, from_address_or_name?: string, session?: SessionOption): Promise<CallResponse | undefined>;
    coinObject_with_balance: (balance_required: string | bigint | number, address_or_name?: string, token_type?: string, session?: SessionOption) => Promise<string | undefined>;
}
//# sourceMappingURL=account.d.ts.map