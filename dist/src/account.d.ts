import { Ed25519Keypair, CoinBalance, CoinStruct, TransactionResult, TransactionBlock } from 'wowok';
export interface AccountData {
    name: string;
    default?: boolean;
    key: string;
}
export interface AccountData_Show {
    name: string;
    default?: boolean;
    address: string;
}
export declare class Account {
    constructor(storage?: 'File' | 'Explorer');
    static _instance: any;
    static Instance(): Account;
    private storage;
    private _add;
    private _default;
    private _get;
    private _rename;
    set_storage(storage?: 'File' | 'Explorer'): void;
    gen(name: string, bDefault?: boolean): void;
    default(): AccountData | undefined;
    get(name?: string, bNotFoundReturnDefault?: boolean): AccountData | undefined;
    rename(oldName: string, newName: string, bSwapIfExisted?: boolean): boolean;
    get_address(name?: string, bNotFoundReturnDefault?: boolean): string | undefined;
    get_pubkey(name?: string, bNotFoundReturnDefault?: boolean): string | undefined;
    get_pair(name?: string, bNotFoundReturnDefault?: boolean): Ed25519Keypair | undefined;
    list(): AccountData_Show[];
    faucet(name?: string): Promise<void>;
    balance: (name?: string, token_type?: string) => Promise<CoinBalance | undefined>;
    coin: (name?: string, token_type?: string) => Promise<CoinStruct[] | undefined>;
    get_coin_object: (txb: TransactionBlock, balance_required: string | bigint | number, name?: string, token_type?: string) => Promise<TransactionResult | undefined>;
    coin_with_balance: (balance_required: string | bigint | number, account?: string, token_type?: string) => Promise<string | undefined>;
}
//# sourceMappingURL=account.d.ts.map