import { Protocol } from "wowok";
import { Account } from "./account.js";
import { LocalInfo, LocalInfoNameDefault, LocalMark } from "./local.js";
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
        const token_type_ = query.token_type ?? '0x2::sui::SUI';
        if (query?.balance_or_coin === BalanceOrCoin.Balance) {
            res.balance = await Protocol.Client().getBalance({ owner: r.address, coinType: token_type_ });
        }
        else if (query?.balance_or_coin === BalanceOrCoin.Coin) {
            res.coin = (await Protocol.Client().getCoins({ owner: r.address, coinType: token_type_ })).data;
        }
    }
    return res;
};
export const query_local_info = async (name = LocalInfoNameDefault) => {
    return await LocalInfo.Instance().get(name);
};
export const account_operation = async (op) => {
    var res = {};
    if (op.gen) {
        const acc = await Account.Instance().gen(op.gen?.default, op.gen?.name);
        res.gen = { address: acc?.address, default: acc?.default, name: acc?.name };
    }
    if (op.default) {
        await Account.Instance().set_default(op.default.name_or_address);
    }
    if (op.suspend) {
        await Account.Instance().suspend(op.suspend.name_or_address, op.suspend.suspend);
    }
    if (op.name) {
        await Account.Instance().set_name(op.name.new_name, op.name.name_or_address);
    }
    if (op.transfer) {
        res.transfer = await Account.Instance().transfer(op.transfer.amount, op.transfer.token_type, op.transfer.name_or_address_to, op.transfer.name_or_address_from);
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
                await LocalMark.Instance().put(v.name, { object: v.address, tags: v.tags }, v.useAddressIfNameExist);
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
//# sourceMappingURL=index.js.map