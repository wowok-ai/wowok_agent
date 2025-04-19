import { CallResponse, CoinBalance, CoinStruct } from "wowok"
import { Account } from "./account.js"
import { LocalInfo, LocalInfoNameDefault, LocalMark, MarkData } from "./local.js"

export const query_local_mark_list = async () : Promise<string> => {
    return await LocalMark.Instance().list()
}

export const query_account_list = async () : Promise<QueryAccountsResult> => {
    const res : QueryAccountsResult = {};
    res.addresses = await Account.Instance().list();
    res.default = await Account.Instance().default(false);
    return res;
}

export const query_local_info_list = async () : Promise<string> => {
    return await LocalInfo.Instance().list()
}

export interface QueryAccountsResult {
    default?: string;
    addresses?: string[];
}


export const query_local_mark = async (name: string) : Promise<MarkData | undefined> => {
    return await LocalMark.Instance().get(name)
}

export enum BalanceOrCoin {
    Balance = 'balance',
    Coin = 'coin'
}

export interface QueryAccount {
    name_or_address?: string; // undifined if query the default account. 
    balance_or_coin?: BalanceOrCoin;
    token_type?:string; // 0x2::sui::SUI, if not specified.
}

export interface QueryAccountResult {
    name_or_address?: string; 
    address?: string;
    balance?: CoinBalance;
    coin?: CoinStruct[];
}

export const query_account = async (query: QueryAccount) : Promise<QueryAccountResult> => {
    const r = await LocalMark.Instance().get_account(query.name_or_address);
    const res : QueryAccountResult = {address: r};
    if (query.name_or_address) { res.name_or_address = query.name_or_address; }

    if (r) {
        if (query?.balance_or_coin === BalanceOrCoin.Balance) {
            res.balance = await Account.Instance().balance(r, query.token_type);
        } else if (query?.balance_or_coin === BalanceOrCoin.Coin) {
            res.coin =  await Account.Instance().coin(r, query.token_type);
        } 
    } 
    
    return res;
}

export const query_local_info = async (name: string = LocalInfoNameDefault) : Promise<LocalInfo | undefined> => { 
    return await LocalInfo.Instance().get(name)
}

export interface AccountOperation {
    gen?: {name?:string, default?: boolean, useAddressIfNameExist?: boolean};
    transfer?: {name_or_address_from?: string, name_or_address_to?:string, amount:number|string, token_type?: string};
}

export interface AccountOperationResult {
    gen?: {address:string};
    transfer?: CallResponse;
}

export const account_operation = async(op: AccountOperation) : Promise<AccountOperationResult> => {
    var res : AccountOperationResult = {};
    if (op.gen) {
        const acc = await Account.Instance().gen(op.gen.default);
        if (await LocalMark.Instance().put(op.gen.name, {object: acc, tags: ['account']}, op.gen.useAddressIfNameExist)) {
            res.gen = {address: acc};
        }
    } else if (op.transfer) {
        const from = await LocalMark.Instance().get_account(op.transfer.name_or_address_from);
        const to = await LocalMark.Instance().get_account(op.transfer.name_or_address_to);
        if (from && to) {
            res.transfer = await Account.Instance().transfer(from, to, op.transfer.amount, op.transfer.token_type);
        }
    } 
    return res;
}

export interface LocalMarkOperation {
    removeall?: boolean;
    add_or_set?: {name:string, address:string, tags?:string[], useAddressIfNameExist?:boolean}[];
    remove?: string[];
}

export const local_mark_operation = async(op: LocalMarkOperation) : Promise<void> => {
    if (op.removeall) {
        await LocalMark.Instance().clear();
    } else if (op.add_or_set) {
        for (let i = 0; i < op.add_or_set.length; ++ i) {
            const v = op.add_or_set[i];
            await LocalMark.Instance().put(v.name, {object: v.address, tags: v.tags}, v.useAddressIfNameExist);
        }
    } else if (op.remove) {
        for (let i = 0; i < op.remove.length; ++ i) {
            const v = op.remove[i];
            await LocalMark.Instance().del(v);
        }
    }
    return undefined;
}   

export interface LocalInfoOperation {
    removeall?: boolean;
    add?: {name:string, content:string, bdefault?: boolean}[];
    remove?: string[];
}

export const local_info_operation = async(op: LocalInfoOperation) : Promise<void> => {
    if (op.removeall) {
        await LocalInfo.Instance().clear();
    }
    else if (op.add) {  
        for (let i = 0; i < op.add.length; ++ i) {
            const v = op.add[i];
            await LocalInfo.Instance().put(v.name, v.content, v.bdefault);
        }
    }
    else if (op.remove) {   
        for (let i = 0; i < op.remove.length; ++ i) {
            const v = op.remove[i];
            await LocalInfo.Instance().del(v);
        }
    }
}