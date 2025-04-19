/**
 * account management and use
 */

import { Ed25519Keypair, fromHEX, toHEX, decodeSuiPrivateKey, Protocol, TransactionBlock, IsValidAddress,  
    getFaucetHost, requestSuiFromFaucetV0, requestSuiFromFaucetV1, CoinBalance, CoinStruct, TransactionArgument, TransactionResult, 
    CallResponse} from 'wowok';
import { isBrowser } from '../common.js';
import path from 'path';
import os from 'os';
import { Level } from 'level';


const AccountLocation = 'wowok-acc';
const SettingDefault = 'default';

export class Account {
    private storage;

    constructor() {
        var location = AccountLocation;
        if (!isBrowser()) {
            location = path.join(path.join(os.homedir(), '.wowok'), AccountLocation);
        }
        this.storage = new Level(location, { valueEncoding: 'json' });
    }

    location() : string { return this.storage.location; }

    static _instance: any;
    static Instance() : Account {
        if (!Account._instance) {
            Account._instance = new Account();
        }; return Account._instance
    }
    
    async set_default(address?: string) : Promise<boolean> {
        if (address) {
            if (!await this.storage.get(address)) {
                return false
            }
            await this.storage.put(SettingDefault, address);
        } else {
            await this.storage.del(SettingDefault);
        }
        return true
    }

    async gen(bDefault?: boolean) : Promise<string> {       
        var secret = '0x'+toHEX(decodeSuiPrivateKey(Ed25519Keypair.generate().getSecretKey()).secretKey);
        var address = Ed25519Keypair.fromSecretKey(fromHEX(secret)).getPublicKey().toSuiAddress();
        await this.storage.put(address, secret);
        if (bDefault) {
            await this.storage.put(SettingDefault, address);
        };
        return address;
    }

    async default(genNewIfnotExisted:boolean=true) : Promise<string | undefined> {
        const r = await this.storage.get(SettingDefault);
        if (r) {
            return r;
        } else if (genNewIfnotExisted) {
            return await this.gen(true);
        } 
    }

    // address: if undefined, the default returned.
    async get_pubkey(address?:string) : Promise<string | undefined> {
        const secret: string | undefined = address? 
            await this.storage.get(address) :
            await this.default();
        if (secret) {
            return Ed25519Keypair.fromSecretKey(fromHEX(secret)).getPublicKey().toSuiPublicKey()
        } 
    }
    
    async list() : Promise<string[]> {
        return (await this.storage.keys().all()).filter(v => v !== SettingDefault);
    }
    
    async faucet(address?:string) {
        if (!address) {
            address = await this.default();
        }

        if (address) {
            await requestSuiFromFaucetV0({host:getFaucetHost('testnet'), recipient:address}).catch(e => {})
        }
    }

    async sign_and_commit(txb: TransactionBlock, address?:string) : Promise<CallResponse | undefined> {
        const addr = address ? address : await this.default();
        if (!addr) {
            return undefined;
        }

        const secret: string | undefined = await this.storage.get(addr);

        if (secret) {
            return await Protocol.Client().signAndExecuteTransaction({
                transaction: txb, 
                signer: Ed25519Keypair.fromSecretKey(fromHEX(secret)),
                options:{showObjectChanges:true},
            });
        }
    }

    // token_type is 0x2::sui::SUI, if not specified.
    balance = async (address?:string, token_type?:string) : Promise<CoinBalance | undefined> => {
        if (!address) {
            address = await this.default();
        }

        if (address) {
            return await Protocol.Client().getBalance({owner: address, coinType:token_type});
        }
    }

    // token_type is 0x2::sui::SUI, if not specified.
    coin = async (address?:string, token_type?:string) : Promise<CoinStruct[] | undefined> => {
        if (!address) {
            address = await this.default();
        }
        if (address) {
            return (await Protocol.Client().getCoins({owner: address, coinType:token_type})).data;
        }
    }

    get_coin_object = async (txb: TransactionBlock, balance_required:string | bigint | number, address?:string, token_type?:string) : Promise<TransactionResult | undefined> => {
        if (!address) {
            address = await this.default();
        }

        if (address) {
            const b = BigInt(balance_required);

            if (b >= BigInt(0)) {
                if (!token_type || token_type === '0x2::sui::SUI' || token_type === '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI') {
                    return txb.splitCoins(txb.gas, [b]);
                } else {
                    const r = await Protocol.Client().getCoins({owner: address, coinType:token_type});
                    const objects : string[] = []; var current = BigInt(0);
                    for (let i = 0; i < r.data.length; ++ i) {
                        current += BigInt(r.data[i].balance);
                        objects.push(r.data[i].coinObjectId);
                        if (current >= b) {
                            break;
                        }
                    }

                    if (objects.length === 1) {
                        return txb.splitCoins(objects[0], [b]);
                    } else {
                        const ret = objects.pop()!;
                        txb.mergeCoins(ret, objects);
                        return txb.splitCoins(ret, [b])
                    }
                }
            }
        }
    }
    async transfer(from:string, to:string, amount:number|string, token_type?:string) : Promise<CallResponse | undefined> {
        const secret: string | undefined = await this.storage.get(from);    
        if (!secret)    return undefined;
        const pair = Ed25519Keypair.fromSecretKey(fromHEX(secret))
        if (!pair) return undefined;

        const txb = new TransactionBlock();
        const coin = await this.get_coin_object(txb, amount, from, token_type);
        if (coin) {
            txb.transferObjects([(coin as unknown) as TransactionArgument], to)
            const r = await Protocol.Client().signAndExecuteTransaction({
                transaction: txb, 
                signer: pair,
                options:{showObjectChanges:true},
            });
            return r;
        }
    }

    coinObject_with_balance = async(balance_required:string | bigint | number, address?:string, token_type?:string) : Promise<string | undefined> => {
        if (!address) {
            address = await this.default();
        }

        if (!address) return undefined;
        const secret = await this.storage.get(address);
        if (!secret) return undefined;

        const pair = Ed25519Keypair.fromSecretKey(fromHEX(secret))
        if (!pair) return undefined;
    
        const txb = new TransactionBlock();
        const res = await this.get_coin_object(txb, balance_required, address, token_type);
        if (res) {
            txb.transferObjects([(res as unknown) as TransactionArgument], address)
            const r = await Protocol.Client().signAndExecuteTransaction({
                transaction: txb, 
                signer: pair,
                options:{showObjectChanges:true},
            });
            const t = token_type ?? '0x2::sui::SUI';
            return ((r as any)?.objectChanges.find((v:any) => v?.type === 'created' && (v?.objectType as string).includes(t)) as any)?.objectId;
        }
    }
}

