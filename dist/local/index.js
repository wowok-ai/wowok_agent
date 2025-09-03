import { Protocol } from "wowok";
import { Account } from "./account.js";
import { LocalInfo, LocalInfoNameDefault, LocalMark } from "./local.js";
import { session_resolve } from "../common.js";
import { CoinInfo } from "./coin.js";
export const query_local_mark_list = async (filter) => {
    return JSON.stringify(await LocalMark.Instance().list(filter));
};
export const query_account_list = async (showSuspendedAccount) => {
    return await Account.Instance().list(showSuspendedAccount);
};
export const query_local_info_list = async () => {
    return JSON.stringify(await LocalInfo.Instance().list());
};
export const query_local_mark = async (name) => {
    return await LocalMark.Instance().get(name);
};
export var BalanceOrCoin;
(function (BalanceOrCoin) {
    BalanceOrCoin["Balance"] = "balance";
    BalanceOrCoin["Coin"] = "coin";
})(BalanceOrCoin || (BalanceOrCoin = {}));
export const query_account = async (query) => {
    const r = await Account.Instance().get(query.name_or_address);
    if (!r) {
        return { name_or_address: query.name_or_address };
    }
    const res = { address: r.address, name_or_address: r.name };
    if (r) {
        const token_type_ = query.token_type ?? Protocol.Instance().platformToken(query.session?.network);
        if (query?.balance_or_coin === BalanceOrCoin.Balance) {
            res.balance = await Protocol.Client(await session_resolve(query.session))
                .getBalance({ owner: r.address, coinType: token_type_ });
        }
        else if (query?.balance_or_coin === BalanceOrCoin.Coin) {
            res.coin = (await Protocol.Client(await session_resolve(query.session))
                .getCoins({ owner: r.address, coinType: token_type_ })).data;
        }
    }
    return res;
};
export const query_local_info = async (name = LocalInfoNameDefault) => {
    return await LocalInfo.Instance().get(name);
};
export const account_operation = async (op) => {
    var res = {};
    if (op.gen != null) {
        const acc = await Account.Instance().gen(op.gen?.name);
        res.gen = { address: acc?.address, name: acc?.name };
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
    if (op.transfer != null) {
        res.transfer = await Account.Instance().transfer(op.transfer.amount, op.transfer.token_type, op.transfer.name_or_address_to, op.transfer.name_or_address_from, op.transfer?.session);
    }
    return res;
};
;
export const local_mark_operation = async (op) => {
    switch (op.data?.op) {
        case 'removeall':
            return await LocalMark.Instance().clear();
        case 'add':
            for (let i = 0; i < op.data.data.length; ++i) {
                const v = op.data.data[i];
                await LocalMark.Instance().put(v.name, { address: v.address, tags: v.tags }, v.useAddressIfNameExist);
            }
            ;
            return;
        case 'remove':
            for (let i = 0; i < op.data.data.length; ++i) {
                const v = op.data.data[i];
                await LocalMark.Instance().del(v);
            }
            return;
    }
};
;
export const local_info_operation = async (op) => {
    switch (op.data?.op) {
        case 'removeall':
            await LocalInfo.Instance().clear();
            break;
        case 'add':
            for (let i = 0; i < op.data?.data.length; ++i) {
                const v = op.data.data[i];
                await LocalInfo.Instance().put(v.name, v.content, v?.bdefault);
            }
            break;
        case 'remove':
            for (let i = 0; i < op.data?.data.length; ++i) {
                const v = op.data.data[i];
                await LocalInfo.Instance().del(v);
            }
            break;
    }
};
export const coin_info_operation = async (op) => {
    return await CoinInfo.Instance().fetch(op.coinType, op?.alias, await session_resolve(op?.session));
};
export const coin_info_query = async (op) => {
    if (op.filter === 'all fetched') {
        return await CoinInfo.Instance().list();
    }
    else {
        return await CoinInfo.Instance().query(op.filter, await session_resolve(op?.session));
    }
};
export const coin_info_list = async () => {
    return await CoinInfo.Instance().list();
};
//# sourceMappingURL=index.js.map