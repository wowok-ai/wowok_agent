/**
 * account management and use
 */
import { TransactionBlock } from 'wowok';
import { CoinBalance, CoinStruct, TransactionResult } from 'wowok';
export declare class Account {
    private storage;
    constructor();
    location(): string;
    static _instance: any;
    static Instance(): Account;
    set_default(address?: string): Promise<boolean>;
    gen(bDefault?: boolean): Promise<string>;
    default(): Promise<string | undefined>;
    get_pubkey(address?: string): Promise<string | undefined>;
    list(): Promise<string[]>;
    faucet(address?: string): Promise<void>;
    balance: (address?: string, token_type?: string) => Promise<CoinBalance | undefined>;
    coin: (address?: string, token_type?: string) => Promise<CoinStruct[] | undefined>;
    get_coin_object: (txb: TransactionBlock, balance_required: string | bigint | number, address?: string, token_type?: string) => Promise<TransactionResult | undefined>;
    coinObject_with_balance: (balance_required: string | bigint | number, address?: string, token_type?: string) => Promise<string | undefined>;
}
//# sourceMappingURL=account.d.ts.map