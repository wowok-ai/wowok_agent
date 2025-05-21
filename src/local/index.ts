import { CallResponse, CoinBalance, CoinStruct, Protocol } from "wowok"
import { Account, AccountData } from "./account.js"
import { LocalInfo, LocalInfoNameDefault, LocalMark, LocalMarkFilter, MarkData } from "./local.js"

export const query_local_mark_list = async (filter?:LocalMarkFilter) : Promise<string> => {
    return JSON.stringify(await LocalMark.Instance().list(filter))
}

export const query_account_list = async (showSuspendedAccount?:boolean) : Promise<AccountData[]> => {
    return await Account.Instance().list(showSuspendedAccount);
}

export const query_local_info_list = async () : Promise<string> => {
    return JSON.stringify(await LocalInfo.Instance().list())
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
    const r = await Account.Instance().get(query.name_or_address);
    if (!r) {
        return {name_or_address: query.name_or_address};
    }

    const res : QueryAccountResult = {address: r.address, name_or_address: r.name};

    if (r) {
        const token_type_ = query.token_type ?? '0x2::sui::SUI';
        if (query?.balance_or_coin === BalanceOrCoin.Balance) {
            res.balance = await Protocol.Client().getBalance({owner: r.address, coinType:token_type_});
        } else if (query?.balance_or_coin === BalanceOrCoin.Coin) {
            res.coin = (await Protocol.Client().getCoins({owner: r.address, coinType:token_type_})).data;
        } 
    } 
    
    return res;
}

export const query_local_info = async (name: string = LocalInfoNameDefault) : Promise<LocalInfo | undefined> => { 
    return await LocalInfo.Instance().get(name)
}

export interface AccountOperation {
    gen?: {name?:string, default?: boolean} | null; // generate a new account, if not specified, generate a new default account.
    default?: {name_or_address: string} | null; // set the default account.
    suspend?: {name_or_address?: string, suspend?:boolean} | null; // suspend the account, if not specified, suspend the default account.
    name?: {name:string, address?:string} | null; // name the account, if not specified, name the default account.
    transfer?: {name_or_address_from?: string, name_or_address_to?:string, amount:number|string, token_type?: string} | null;   // transfer the token.
}

export interface AccountOperationResult {
    gen?: {address:string, default?:boolean, name?: string};
    transfer?: CallResponse;
}

export const account_operation = async(op: AccountOperation) : Promise<AccountOperationResult> => {
    var res : AccountOperationResult = {}; 
    if (op.gen) {
        const acc = await Account.Instance().gen(op.gen?.default, op.gen?.name);
        res.gen =  {address: acc?.address, default: acc?.default, name:acc?.name};
    } 
    if (op.default) {
        await Account.Instance().set_default(op.default.name_or_address); 
    }
    if (op.suspend) {
        await Account.Instance().suspend(op.suspend.name_or_address, op.suspend.suspend);
    }
    if (op.name) {
        await Account.Instance().set_name(op.name.name, op.name.address); 
    }

    if(op.transfer) {
        res.transfer = await Account.Instance().transfer(op.transfer.amount, op.transfer.token_type, op.transfer.name_or_address_from, op.transfer.name_or_address_to);
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