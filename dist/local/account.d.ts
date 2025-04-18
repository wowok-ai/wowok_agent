/**
 * account management and use
 */
import { TransactionBlock, CoinBalance, CoinStruct, TransactionResult, CallResponse } from 'wowok';
export declare class Account {
    private storage;
    constructor();
    location(): string;
    static _instance: any;
    static Instance(): Account;
    set_default(address?: string): Promise<boolean>;
    gen(bDefault?: boolean): Promise<string>;
    default(genNewIfnotExisted?: boolean): Promise<string | undefined>;
    get_pubkey(address?: string): Promise<string | undefined>;
    list(): Promise<string[]>;
    faucet(address?: string): Promise<void>;
    sign_and_commit(txb: TransactionBlock, address?: string): Promise<CallResponse | undefined>;
    balance: (address?: string, token_type?: string) => Promise<CoinBalance | undefined>;
    coin: (address?: string, token_type?: string) => Promise<CoinStruct[] | undefined>;
    get_coin_object: (txb: TransactionBlock, balance_required: string | bigint | number, address?: string, token_type?: string) => Promise<TransactionResult | undefined>;
    coinObject_with_balance: (balance_required: string | bigint | number, address?: string, token_type?: string) => Promise<string | undefined>;
}
//# sourceMappingURL=account.d.ts.map