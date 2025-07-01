import { CallResponse, CoinBalance, CoinStruct, Protocol } from "wowok"
import { Account, AccountData, DEFAULT_NAME } from "./account.js"
import { InfoData, LocalInfo, LocalInfoNameDefault, LocalMark, LocalMarkFilter, MarkData } from "./local.js"

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

export const query_local_info = async (name: string = LocalInfoNameDefault) : Promise<InfoData  | undefined> => { 
    return await LocalInfo.Instance().get(name)
}

export interface AccountOperation {
    gen?: {name?:string | DEFAULT_NAME} | null; // generate a new account, if not specified, generate a new default account.
    suspend?: {name_or_address?: string | DEFAULT_NAME, suspend?:boolean} | null; // suspend the account, if not specified, suspend the default account.
    resume?: {address:string, name?: string | DEFAULT_NAME} | null; // resume the account and specify the name. if name not specified, use 'default'.
    name?: {new_name:string | DEFAULT_NAME, name_or_address?:string | DEFAULT_NAME} | null; // name the account, if not specified, name the default account.
    swap_names?: {name1?:string | DEFAULT_NAME, name2?:string | DEFAULT_NAME} | null; // swap the name of two accounts, if not specified, swap the default account.
    transfer?: {name_or_address_from?: string, name_or_address_to?:string, amount:number|string, token_type?: string} | null;   // transfer the token.
}

export interface AccountOperationResult {
    gen?: {address:string, name?: string | DEFAULT_NAME};
    transfer?: CallResponse;
}

export const account_operation = async(op: AccountOperation) : Promise<AccountOperationResult> => {
    var res : AccountOperationResult = {}; 
    if (op.gen != null) {
        const acc = await Account.Instance().gen(op.gen?.name);
        res.gen =  {address: acc?.address, name:acc?.name};
    } 
    if (op.suspend != null) {
        await Account.Instance().suspend(op.suspend.name_or_address);
    }
    if (op.resume != null) {
        await Account.Instance().resume(op.resume.address, op.resume.name);
    }
    if (op.name != null) {
        await Account.Instance().set_name(op.name.new_name, op.name.name_or_address); 
    }
    if (op.swap_names != null) {
        await Account.Instance().swap_names(op.swap_names.name1, op.swap_names.name2);
    }
    if(op.transfer != null) {
        res.transfer = await Account.Instance().transfer(op.transfer.amount, op.transfer.token_type, op.transfer.name_or_address_to, op.transfer.name_or_address_from);
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
                await LocalMark.Instance().put(v.name, {address: v.address, tags: v.tags} as MarkData, v.useAddressIfNameExist);
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