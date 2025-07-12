/**
 * account management and use
 */
import { Ed25519Keypair, fromHex, toHex, decodeSuiPrivateKey, Protocol, TransactionBlock, FAUCET, Errors, ERROR, IsValidName } from 'wowok';
import { retry_db, isBrowser } from '../common.js';
import path from 'path';
import os from 'os';
export const DEFAULT_ACCOUNT_NAME = 'default';
const AccountLocation = 'wowok-acc';
const AccountKey = 'account';
export class Account {
    constructor() {
        // token_type is 0x2::sui::SUI, if not specified.
        this.balance = async (address_or_name, token_type) => {
            const a = await this.get(address_or_name);
            const token_type_ = token_type ?? '0x2::sui::SUI';
            if (a) {
                return await Protocol.Client().getBalance({ owner: a.address, coinType: token_type_ });
            }
        };
        // token_type is 0x2::sui::SUI, if not specified.
        this.coin = async (token_type, address_or_name) => {
            const a = await this.get(address_or_name);
            const token_type_ = token_type ?? '0x2::sui::SUI';
            if (a) {
                return (await Protocol.Client().getCoins({ owner: a.address, coinType: token_type_ })).data;
            }
        };
        this.get_coin_object = async (txb, balance_required, address_or_name, token_type) => {
            const a = await this.get(address_or_name);
            if (a) {
                const b = BigInt(balance_required);
                if (b >= BigInt(0)) {
                    if (!token_type || token_type === '0x2::sui::SUI' || token_type === '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI') {
                        return txb.splitCoins(txb.gas, [b]);
                    }
                    else {
                        const r = await Protocol.Client().getCoins({ owner: a.address, coinType: token_type });
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
            }
        };
        this.coinObject_with_balance = async (balance_required, address_or_name, token_type) => {
            const a = await this.get_imp(address_or_name);
            if (!a)
                return undefined;
            const pair = Ed25519Keypair.fromSecretKey(fromHex(a.secret));
            if (!pair)
                return undefined;
            const txb = new TransactionBlock();
            const res = await this.get_coin_object(txb, balance_required, a.address, token_type);
            if (res) {
                txb.transferObjects([res], a.address);
                const r = await Protocol.Client().signAndExecuteTransaction({
                    transaction: txb,
                    signer: pair,
                    options: { showObjectChanges: true },
                });
                const t = token_type ?? '0x2::sui::SUI';
                return r?.objectChanges.find((v) => v?.type === 'created' && (v?.objectType).includes(t))?.objectId;
            }
        };
        this.location = AccountLocation;
        if (!isBrowser()) {
            this.location = path.join(path.join(os.homedir(), '.wowok'), AccountLocation);
        }
    }
    get_location() { return this.location; }
    static Instance() {
        if (!Account._instance) {
            Account._instance = new Account();
        }
        ;
        return Account._instance;
    }
    accountData(data) {
        if (!data)
            return;
        const r = Ed25519Keypair.fromSecretKey(fromHex(data.secret));
        data.pubkey = r.getPublicKey().toSuiPublicKey();
        data.secret = undefined; //r.getSecretKey();
        return data;
    }
    async gen(name) {
        if (!name) {
            name = DEFAULT_ACCOUNT_NAME;
        }
        if (!IsValidName(name)) {
            ERROR(Errors.IsValidName, `Name ${name} is not valid`);
        }
        var secret = '0x' + toHex(decodeSuiPrivateKey(Ed25519Keypair.generate().getSecretKey()).secretKey);
        var address = Ed25519Keypair.fromSecretKey(fromHex(secret)).getPublicKey().toSuiAddress();
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r);
                if (name) {
                    if (s.find(v => v.name === name)) {
                        ERROR(Errors.IsValidName, `Name ${name} already exists`);
                    }
                }
                const ret = { address: address, secret: secret, name };
                s.push(ret);
                await storage.put(AccountKey, JSON.stringify(s));
                return this.accountData(ret);
            }
            else {
                const ret = { address: address, secret: secret, name: name };
                await storage.put(AccountKey, JSON.stringify([ret]));
                return this.accountData(ret);
            }
        });
    }
    async default() {
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r);
                return this.accountData(s.find(v => v.name === DEFAULT_ACCOUNT_NAME));
            }
        });
    }
    // address: if undefined, the default returned.
    async get(address_or_name) {
        return this.accountData(await this.get_imp(address_or_name));
    }
    async get_address(address_or_name) {
        return (await this.get_imp(address_or_name))?.address;
    }
    async get_imp(address_or_name) {
        if (!address_or_name)
            address_or_name = DEFAULT_ACCOUNT_NAME;
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r);
                return s.find(v => v.address === address_or_name || v.name === address_or_name);
            }
        });
    }
    async get_many(address_or_names) {
        return await this.get_many_imp(address_or_names).then(v => v.map(i => this.accountData(i)));
    }
    async get_many_imp(address_or_names) {
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r);
                return address_or_names.map(i => {
                    if (!i) {
                        return s.find(v => v.name === DEFAULT_ACCOUNT_NAME);
                    }
                    else {
                        return s.find(v => v.address === i || v.name === i);
                    }
                });
            }
            return address_or_names.map(v => undefined);
        });
    }
    async swap_names(name1, name2) {
        if (!name1)
            name1 = DEFAULT_ACCOUNT_NAME;
        if (!name2)
            name2 = DEFAULT_ACCOUNT_NAME;
        if (name1 === name2)
            return false;
        if (!IsValidName(name1)) {
            ERROR(Errors.IsValidName, `Name ${name1} is not valid`);
        }
        if (!IsValidName(name2)) {
            ERROR(Errors.IsValidName, `Name ${name2} is not valid`);
        }
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r);
                const f1 = s.find(v => v.name === name1);
                const f2 = s.find(v => v.name === name2);
                if (f1 && f2) {
                    const t = f1.name;
                    f1.name = f2.name;
                    f2.name = t;
                    await storage.put(AccountKey, JSON.stringify(s));
                    return true;
                }
            }
            return false;
        });
    }
    async set_name(name, address_or_name) {
        if (!address_or_name)
            address_or_name = DEFAULT_ACCOUNT_NAME;
        if (!name)
            name = DEFAULT_ACCOUNT_NAME;
        if (address_or_name === name)
            return true;
        if (!IsValidName(name)) {
            ERROR(Errors.IsValidName, `Name ${name} is not valid`);
        }
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r);
                if (s.find(v => v.name === name)) {
                    ERROR(Errors.IsValidName, `Name ${name} already exists`);
                }
                const f = s.find(v => v.address === address_or_name || v.name === address_or_name);
                if (f) {
                    f.name = name;
                    await storage.put(AccountKey, JSON.stringify(s));
                    return true;
                }
            }
            return false;
        });
    }
    async list(showSuspended) {
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r);
                if (showSuspended) {
                    return s.map(v => this.accountData(v));
                }
                else {
                    return s.filter(v => !v.suspended).map(v => this.accountData(v));
                }
            }
            return [];
        });
    }
    async suspend(address_or_name) {
        if (!address_or_name)
            address_or_name = DEFAULT_ACCOUNT_NAME;
        await retry_db(this.location, async (storage) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r);
                const f = s.find(v => v.address === address_or_name || v.name === address_or_name);
                if (f) {
                    f.suspended = true;
                    f.name = undefined;
                    await storage.put(AccountKey, JSON.stringify(s));
                }
            }
        });
    }
    async resume(address, name) {
        if (!name)
            name = DEFAULT_ACCOUNT_NAME;
        await retry_db(this.location, async (storage) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r);
                if (s.find(v => v.name === name)) {
                    ERROR(Errors.IsValidName, `Name ${name} already exists`);
                }
                const f = s.find(v => v.address === address);
                if (f) {
                    f.suspended = false;
                    f.name = name;
                    await storage.put(AccountKey, JSON.stringify(s));
                }
            }
        });
    }
    async faucet(address_or_name) {
        const a = await this.get(address_or_name);
        if (a) {
            await FAUCET.requestSuiFromFaucetV2({ host: FAUCET.getFaucetHost('testnet'), recipient: a.address }).catch(e => { });
        }
    }
    async sign_and_commit(txb, address_or_name) {
        const a = await this.get_imp(address_or_name);
        if (a) {
            const pair = Ed25519Keypair.fromSecretKey(fromHex(a.secret));
            if (pair) {
                return await Protocol.Client().signAndExecuteTransaction({
                    transaction: txb,
                    signer: pair,
                    options: { showObjectChanges: true },
                });
            }
        }
    }
    async transfer(amount, token_type, to_address_or_name, from_address_or_name) {
        const [from, to] = await this.get_many_imp([from_address_or_name, to_address_or_name]);
        if (!from)
            ERROR(Errors.InvalidParam, `Invalid from address or name ${from_address_or_name}`);
        const to_address = to?.address ?? to_address_or_name;
        if (!to_address)
            ERROR(Errors.InvalidParam, `Invalid to address or name ${to_address_or_name}`);
        const pair = Ed25519Keypair.fromSecretKey(fromHex(from.secret));
        if (pair) {
            const txb = new TransactionBlock();
            const coin = await this.get_coin_object(txb, amount, from.address, token_type);
            if (coin) {
                txb.transferObjects([coin], to_address);
                const r = await Protocol.Client().signAndExecuteTransaction({
                    transaction: txb,
                    signer: pair,
                    options: { showObjectChanges: true },
                });
                return r;
            }
        }
    }
}
//# sourceMappingURL=account.js.map