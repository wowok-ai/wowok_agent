import { Account } from "./account.js";
import { LocalInfo, LocalInfoNameDefault, LocalMark } from "./local.js";
export const query_local_mark_list = async (filter) => {
    return JSON.stringify(await LocalMark.Instance().list(filter));
};
export const query_account_list = async () => {
    const res = {};
    res.addresses = await Account.Instance().list();
    res.default = await Account.Instance().default(false);
    return res;
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
    const r = await LocalMark.Instance().get_account(query.name_or_address);
    const res = { address: r };
    if (query.name_or_address) {
        res.name_or_address = query.name_or_address;
    }
    if (r) {
        if (query?.balance_or_coin === BalanceOrCoin.Balance) {
            res.balance = await Account.Instance().balance(r, query.token_type);
        }
        else if (query?.balance_or_coin === BalanceOrCoin.Coin) {
            res.coin = await Account.Instance().coin(r, query.token_type);
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
        const acc = await Account.Instance().gen(op.gen.default);
        if (await LocalMark.Instance().put(op.gen.name, { object: acc, tags: ['account'] }, op.gen.useAddressIfNameExist)) {
            res.gen = { address: acc };
        }
    }
    else if (op.transfer) {
        const from = await LocalMark.Instance().get_account(op.transfer.name_or_address_from);
        const to = await LocalMark.Instance().get_account(op.transfer.name_or_address_to);
        if (from && to) {
            res.transfer = await Account.Instance().transfer(from, to, op.transfer.amount, op.transfer.token_type);
        }
    }
    return res;
};
export const local_mark_operation = async (op) => {
    if (op.removeall) {
        await LocalMark.Instance().clear();
    }
    else if (op.add_or_set) {
        for (let i = 0; i < op.add_or_set.length; ++i) {
            const v = op.add_or_set[i];
            await LocalMark.Instance().put(v.name, { object: v.address, tags: v.tags }, v.useAddressIfNameExist);
        }
    }
    else if (op.remove) {
        for (let i = 0; i < op.remove.length; ++i) {
            const v = op.remove[i];
            await LocalMark.Instance().del(v);
        }
    }
    return undefined;
};
export const local_info_operation = async (op) => {
    if (op.removeall) {
        await LocalInfo.Instance().clear();
    }
    else if (op.add) {
        for (let i = 0; i < op.add.length; ++i) {
            const v = op.add[i];
            await LocalInfo.Instance().put(v.name, v.content, v.bdefault);
        }
    }
    else if (op.remove) {
        for (let i = 0; i < op.remove.length; ++i) {
            const v = op.remove[i];
            await LocalInfo.Instance().del(v);
        }
    }
};
//# sourceMappingURL=index.js.map