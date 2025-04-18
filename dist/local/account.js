/**
 * account management and use
 */
import { Ed25519Keypair, fromHEX, toHEX, decodeSuiPrivateKey, Protocol, TransactionBlock, getFaucetHost, requestSuiFromFaucetV0 } from 'wowok';
import { isBrowser } from '../common.js';
import path from 'path';
import os from 'os';
import { Level } from 'level';
const AccountLocation = 'wowok-acc';
const SettingDefault = 'default';
export class Account {
    constructor() {
        // token_type is 0x2::sui::SUI, if not specified.
        this.balance = async (address, token_type) => {
            if (!address) {
                address = await this.default();
            }
            if (address) {
                return await Protocol.Client().getBalance({ owner: address, coinType: token_type });
            }
        };
        // token_type is 0x2::sui::SUI, if not specified.
        this.coin = async (address, token_type) => {
            if (!address) {
                address = await this.default();
            }
            if (address) {
                return (await Protocol.Client().getCoins({ owner: address, coinType: token_type })).data;
            }
        };
        this.get_coin_object = async (txb, balance_required, address, token_type) => {
            if (!address) {
                address = await this.default();
            }
            if (address) {
                const b = BigInt(balance_required);
                if (b >= BigInt(0)) {
                    if (!token_type || token_type === '0x2::sui::SUI' || token_type === '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI') {
                        return txb.splitCoins(txb.gas, [b]);
                    }
                    else {
                        const r = await Protocol.Client().getCoins({ owner: address, coinType: token_type });
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
        this.coinObject_with_balance = async (balance_required, address, token_type) => {
            if (!address) {
                address = await this.default();
            }
            if (!address)
                return undefined;
            const secret = await this.storage.get(address);
            if (!secret)
                return undefined;
            const pair = Ed25519Keypair.fromSecretKey(fromHEX(secret));
            if (!pair)
                return undefined;
            const txb = new TransactionBlock();
            const res = await this.get_coin_object(txb, balance_required, address, token_type);
            if (res) {
                txb.transferObjects([res], address);
                const r = await Protocol.Client().signAndExecuteTransaction({
                    transaction: txb,
                    signer: pair,
                    options: { showObjectChanges: true },
                });
                const t = token_type ?? '0x2::sui::SUI';
                return r?.objectChanges.find((v) => v?.type === 'created' && (v?.objectType).includes(t))?.objectId;
            }
        };
        var location = AccountLocation;
        if (!isBrowser()) {
            location = path.join(path.join(os.homedir(), '.wowok'), AccountLocation);
        }
        this.storage = new Level(location, { valueEncoding: 'json' });
    }
    location() { return this.storage.location; }
    static Instance() {
        if (!Account._instance) {
            Account._instance = new Account();
        }
        ;
        return Account._instance;
    }
    async set_default(address) {
        if (address) {
            if (!await this.storage.get(address)) {
                return false;
            }
            await this.storage.put(SettingDefault, address);
        }
        else {
            await this.storage.del(SettingDefault);
        }
        return true;
    }
    async gen(bDefault) {
        var secret = '0x' + toHEX(decodeSuiPrivateKey(Ed25519Keypair.generate().getSecretKey()).secretKey);
        var address = Ed25519Keypair.fromSecretKey(fromHEX(secret)).getPublicKey().toSuiAddress();
        await this.storage.put(address, secret);
        if (bDefault) {
            await this.storage.put(SettingDefault, address);
        }
        ;
        return address;
    }
    async default() {
        return await this.storage.get(SettingDefault);
    }
    // address: if undefined, the default returned.
    async get_pubkey(address) {
        const secret = address ?
            await this.storage.get(address) :
            await this.default();
        if (secret) {
            return Ed25519Keypair.fromSecretKey(fromHEX(secret)).getPublicKey().toSuiPublicKey();
        }
    }
    async list() {
        return await this.storage.keys().all();
    }
    async faucet(address) {
        if (!address) {
            address = await this.default();
        }
        if (address) {
            await requestSuiFromFaucetV0({ host: getFaucetHost('testnet'), recipient: address }).catch(e => { });
        }
    }
    async sign_and_commit(txb, address) {
        const secret = address ?
            await this.storage.get(address) :
            await this.default();
        if (secret) {
            return await Protocol.Client().signAndExecuteTransaction({
                transaction: txb,
                signer: Ed25519Keypair.fromSecretKey(fromHEX(secret)),
                options: { showObjectChanges: true },
            });
        }
    }
}
//# sourceMappingURL=account.js.map