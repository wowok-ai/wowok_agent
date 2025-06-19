/**
 * account management and use
 */
import { TransactionBlock, CoinBalance, CoinStruct, TransactionResult, CallResponse } from 'wowok';
export interface AccountData {
    address: string;
    secret?: string;
    pubkey?: string;
    name?: string;
    suspended?: boolean;
    default?: boolean;
}
export declare class Account {
    private location;
    constructor();
    get_location(): string;
    static _instance: any;
    static Instance(): Account;
    private accountData;
    set_default(address_or_name: string): Promise<boolean>;
    gen(bDefault?: boolean, name?: string): Promise<AccountData>;
    default(): Promise<AccountData | undefined>;
    get(address_or_name?: string): Promise<AccountData | undefined>;
    private get_imp;
    get_many(address_or_names: (string | null | undefined)[]): Promise<(AccountData | undefined)[]>;
    private get_many_imp;
    set_name(name: string, address_or_name?: string): Promise<boolean>;
    list(showSuspended?: boolean): Promise<AccountData[]>;
    suspend(address_or_name?: string, suspend?: boolean): Promise<void>;
    faucet(address_or_name?: string): Promise<void>;
    sign_and_commit(txb: TransactionBlock, address_or_name?: string): Promise<CallResponse | undefined>;
    balance: (address_or_name?: string, token_type?: string) => Promise<CoinBalance | undefined>;
    coin: (token_type?: string, address_or_name?: string) => Promise<CoinStruct[] | undefined>;
    get_coin_object: (txb: TransactionBlock, balance_required: string | bigint | number, address_or_name?: string, token_type?: string) => Promise<TransactionResult | undefined>;
    transfer(amount: number | string, token_type?: string, to_address_or_name?: string, from_address_or_name?: string): Promise<CallResponse | undefined>;
    coinObject_with_balance: (balance_required: string | bigint | number, address_or_name?: string, token_type?: string) => Promise<string | undefined>;
}
//# sourceMappingURL=account.d.ts.map