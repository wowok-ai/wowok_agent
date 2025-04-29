import { CallResponse, CoinBalance, CoinStruct } from "wowok"
import { Account } from "./account.js"
import { LocalInfo, LocalInfoNameDefault, LocalMark, LocalMarkFilter, MarkData } from "./local.js"

export const query_local_mark_list = async (filter?:LocalMarkFilter) : Promise<string> => {
    return JSON.stringify(await LocalMark.Instance().list(filter))
}

export const query_account_list = async () : Promise<QueryAccountsResult> => {
    const res : QueryAccountsResult = {};
    res.addresses = await Account.Instance().list();
    res.default = await Account.Instance().default(false);
    return res;
}

export const query_local_info_list = async () : Promise<string> => {
    return JSON.stringify(await LocalInfo.Instance().list())
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
    gen?: {name?:string, default?: boolean, useAddressIfNameExist?: boolean} | null;
    transfer?: {name_or_address_from?: string, name_or_address_to?:string, amount:number|string, token_type?: string} | null; 
}

export interface AccountOperationResult {
    gen?: {address:string, default:boolean, name: string};
    transfer?: CallResponse;
}

export const account_operation = async(op: AccountOperation) : Promise<AccountOperationResult> => {
    var res : AccountOperationResult = {}; 
    if (op.gen) {
        const acc = await Account.Instance().gen(op.gen?.default);
        const name = await LocalMark.Instance().put(op.gen.name, {object: acc, tags: ['account']}, op.gen.useAddressIfNameExist);
        res.gen =  {address: acc, default: op.gen.default ?? false, name:name};
    } 
    
    if(op.transfer) {
        const from = await LocalMark.Instance().get_account(op.transfer?.name_or_address_from, false);
        const to = await LocalMark.Instance().get_account(op.transfer.name_or_address_to, false);
        if (from && to) {
            res.transfer = await Account.Instance().transfer(from, to, op.transfer?.amount, op.transfer?.token_type);
        }
    }
    return res;
}

export interface LocalMarkOperation { data: {op: 'removeall' } 
    | {op:'add', data:{name:string, address:string, tags?:string[], useAddressIfNameExist?:boolean}[]}
    | {op:'remove', data: string[]} 
};

export const local_mark_operation = async(op: LocalMarkOperation) : Promise<void> => {
    switch(op.data?.op) {
        case 'removeall':
            return await LocalMark.Instance().clear();
        case 'add':
            for (let i = 0; i < op.data.data.length; ++ i) {
                const v = op.data.data[i];
                await LocalMark.Instance().put(v.name, {object: v.address, tags: v.tags}, v.useAddressIfNameExist);
            };
            return ;
        case 'remove':
            for (let i = 0; i < op.data.data.length; ++ i) {
                const v = op.data.data[i];
                await LocalMark.Instance().del(v);
            }
            return     
    }
}   

export interface LocalInfoOperation { 
    data: {op: 'removeall' } 
    | {op:'add', data:{name:string, content:string, bdefault?: boolean}[]}
    | {op:'remove', data: string[]} 
};

export const local_info_operation = async(op: LocalInfoOperation) : Promise<void> => {
    switch (op.data?.op) {
        case 'removeall':
            await LocalInfo.Instance().clear();
            break;
        case 'add' :
            for (let i = 0; i < op.data?.data.length; ++ i) {
                const v = op.data.data[i];
                await LocalInfo.Instance().put(v.name, v.content, v?.bdefault);
            }
            break;
        case 'remove' :   
            for (let i = 0; i < op.data?.data.length; ++ i) {
                const v = op.data.data[i];
                await LocalInfo.Instance().del(v);
            }
            break;
    }
}