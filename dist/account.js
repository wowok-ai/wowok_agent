import { Ed25519Keypair, fromHEX, toHEX, decodeSuiPrivateKey, Protocol, TransactionBlock, ERROR, Errors, } from 'wowok';
import { getFaucetHost, requestSuiFromFaucetV0 } from 'wowok';
const Account_FileName = 'wowok.acc.dat';
const Account_Key = 'wowok-acc-v1';
export class Account {
    constructor(storage = 'File') {
        this.storage = storage;
    }
    static _instance;
    static Instance() {
        if (!Account._instance) {
            Account._instance = new Account();
        }
        ;
        return Account._instance;
    }
    storage = 'File';
    _add(buffer, name, bDefault) {
        var data;
        var key = '0x' + toHEX(decodeSuiPrivateKey(Ed25519Keypair.generate().getSecretKey()).secretKey);
        try {
            if (buffer) {
                data = JSON.parse(buffer);
                if (data) {
                    const f = data.find(v => v.name === name);
                    if (f) {
                        f.default = bDefault;
                    }
                    else {
                        if (bDefault) {
                            data.forEach(v => v.default = false);
                        }
                        data.push({ name: name, key: key, default: bDefault });
                    }
                    return data;
                }
            }
        }
        catch (e) { /*console.log(e)*/ }
        return [{ name: name, key: key, default: bDefault }];
    }
    _default(buffer) {
        var data;
        try {
            if (buffer) {
                data = JSON.parse(buffer);
                if (data) {
                    const f = data.find(v => v.default);
                    if (f) {
                        return f;
                    }
                }
            }
        }
        catch (e) { /*console.log(e)*/ }
    }
    _get(buffer, name, bNotFoundReturnDefault) {
        var data;
        try {
            if (buffer) {
                data = JSON.parse(buffer);
                if (data) {
                    const f = data.find(v => v.name === name);
                    if (f) {
                        return f;
                    }
                    if (bNotFoundReturnDefault) {
                        return data.find(v => v.default);
                    }
                }
            }
        }
        catch (e) { /*console.log(e)*/ }
    }
    _rename(buffer, oldName, newName, bSwapIfExisted = true) {
        var data;
        try {
            if (buffer) {
                data = JSON.parse(buffer);
            }
            if (data) {
                const f1 = data.find(v => v.name === oldName);
                if (!f1)
                    return undefined;
                const f2 = data.find(v => v.name === newName);
                if (f2) {
                    if (bSwapIfExisted) {
                        f1.name = newName;
                        f2.name = oldName;
                        return data;
                    }
                }
                else {
                    f1.name = newName;
                    return data;
                }
            }
        }
        catch (e) { /*console.log(e)*/ }
    }
    set_storage(storage = 'File') {
        this.storage = storage;
    }
    async gen(name, bDefault) {
        try {
            if (this.storage === 'File') {
                const [fs, os, path] = await Promise.all([import('fs'), import('os'), import('path')]);
                const filePath = path.join(os.homedir(), Account_FileName);
                fs.readFile(filePath, 'utf-8', (err, d) => {
                    const data = this._add(d, name, bDefault);
                    fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
                });
            }
            else if (this.storage === 'Explorer') {
                const data = this._add(localStorage.getItem(Account_Key), name, bDefault);
                localStorage.setItem(Account_Key, JSON.stringify(data));
            }
        }
        catch (e) { /*console.log(e)*/ }
    }
    async default() {
        try {
            if (this.storage === 'File') {
                const [fs, os, path] = await Promise.all([import('fs'), import('os'), import('path')]);
                const filePath = path.join(os.homedir(), Account_FileName);
                return this._default(fs.readFileSync(filePath, 'utf-8'));
            }
            else if (this.storage === 'Explorer') {
                return this._default(localStorage.getItem(Account_Key));
            }
        }
        catch (e) { /*console.log(e)*/ }
    }
    async get(name, bNotFoundReturnDefault = true) {
        try {
            if (this.storage === 'File') {
                const [fs, os, path] = await Promise.all([import('fs'), import('os'), import('path')]);
                const filePath = path.join(os.homedir(), Account_FileName);
                return this._get(fs.readFileSync(filePath, 'utf-8'), name, bNotFoundReturnDefault);
            }
            else if (this.storage === 'Explorer') {
                return this._get(localStorage.getItem(Account_Key), name, bNotFoundReturnDefault);
            }
        }
        catch (e) { /*console.log(e)*/ }
    }
    async rename(oldName, newName, bSwapIfExisted = true) {
        var res;
        try {
            if (this.storage === 'File') {
                const [fs, os, path] = await Promise.all([import('fs'), import('os'), import('path')]);
                const filePath = path.join(os.homedir(), Account_FileName);
                res = this._rename(fs.readFileSync(filePath, 'utf-8'), oldName, newName, bSwapIfExisted);
                if (res) {
                    fs.writeFileSync(filePath, JSON.stringify(res), 'utf-8');
                }
            }
            else if (this.storage === 'Explorer') {
                res = this._rename(localStorage.getItem(Account_Key), oldName, newName, bSwapIfExisted);
                if (res)
                    localStorage.setItem(Account_Key, JSON.stringify(res));
            }
        }
        catch (e) { /*console.log(e)*/ }
        return res ? true : false;
    }
    async get_address(name, bNotFoundReturnDefault = true) {
        const a = await this.get(name, bNotFoundReturnDefault);
        if (a) {
            return Ed25519Keypair.fromSecretKey(fromHEX(a.key)).getPublicKey().toSuiAddress();
        }
    }
    async get_pubkey(name, bNotFoundReturnDefault = true) {
        const a = await this.get(name, bNotFoundReturnDefault);
        if (a) {
            return Ed25519Keypair.fromSecretKey(fromHEX(a.key)).getPublicKey().toSuiPublicKey();
        }
    }
    async get_pair(name, bNotFoundReturnDefault = true) {
        const a = await this.get(name, bNotFoundReturnDefault);
        if (a) {
            return Ed25519Keypair.fromSecretKey(fromHEX(a.key));
        }
    }
    async list() {
        try {
            if (this.storage === 'File') {
                const [fs, os, path] = await Promise.all([import('fs'), import('os'), import('path')]);
                const filePath = path.join(os.homedir(), Account_FileName);
                const a = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
                return a.map(v => {
                    return { name: v.name, default: v?.default, address: Ed25519Keypair.fromSecretKey(fromHEX(v.key)).getPublicKey().toSuiAddress() };
                });
            }
            else if (this.storage === 'Explorer') {
                const a = JSON.parse(localStorage.getItem(Account_Key) ?? '');
                return a.map(v => {
                    return { name: v.name, default: v?.default, address: Ed25519Keypair.fromSecretKey(fromHEX(v.key)).getPublicKey().toSuiAddress() };
                });
            }
        }
        catch (e) { /*console.log(e)*/ }
        return [];
    }
    async faucet(name) {
        const address = await this.get_address(name, true);
        if (address) {
            await requestSuiFromFaucetV0({ host: getFaucetHost('testnet'), recipient: address }).catch(e => {
                //console.log(e)
            });
        }
    }
    // token_type is 0x2::sui::SUI, if not specified.
    balance = async (name, token_type) => {
        const addr = await this.get_address(name);
        if (addr) {
            return await Protocol.Client().getBalance({ owner: addr, coinType: token_type });
        }
    };
    // token_type is 0x2::sui::SUI, if not specified.
    coin = async (name, token_type) => {
        const addr = await this.get_address(name);
        if (addr) {
            return (await Protocol.Client().getCoins({ owner: addr, coinType: token_type })).data;
        }
    };
    get_coin_object = async (txb, balance_required, name, token_type) => {
        const addr = await this.get_address(name);
        const b = BigInt(balance_required);
        if (addr && b > BigInt(0)) {
            if (!token_type || token_type === '0x2::sui::SUI' || token_type === '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI') {
                return txb.splitCoins(txb.gas, [balance_required]);
            }
            else {
                const r = await Protocol.Client().getCoins({ owner: addr, coinType: token_type });
                const objects = [];
                var current = BigInt(0);
                for (let i = 0; i < r.data.length; ++i) {
                    current += BigInt(r.data[i].balance);
                    objects.push(r.data[i].coinObjectId);
                    if (current >= b) {
                        break;
                    }
                }
                if (objects.length === 1) {
                    return txb.splitCoins(objects[0], [b]);
                }
                else {
                    const ret = objects.pop();
                    txb.mergeCoins(ret, objects);
                    return txb.splitCoins(ret, [b]);
                }
            }
        }
    };
    coin_with_balance = async (balance_required, account, token_type) => {
        const pair = await this.get_pair(account, true);
        if (!pair)
            ERROR(Errors.Fail, 'account invalid');
        const txb = new TransactionBlock();
        const res = await Account.Instance().get_coin_object(txb, balance_required, account, token_type);
        if (res) {
            txb.transferObjects([res], pair?.toSuiAddress());
            const r = await Protocol.Client().signAndExecuteTransaction({
                transaction: txb,
                signer: pair,
                options: { showObjectChanges: true },
            });
            const t = token_type ?? '0x2::sui::SUI';
            return r?.objectChanges.find((v) => v?.type === 'created' && (v?.objectType).includes(t))?.objectId;
        }
    };
}
