/**
 * account management and use
 */

import { Ed25519Keypair, fromHEX, toHEX, decodeSuiPrivateKey, Protocol, TransactionBlock, 
    FAUCET, CoinBalance, CoinStruct, TransactionArgument, TransactionResult, 
    CallResponse, TransactionObjectArgument, Errors, ERROR, IsValidName} from 'wowok';
import { retry_db, isBrowser } from '../common.js';
import path from 'path';
import os from 'os';
import { Level } from 'level';


const AccountLocation = 'wowok-acc';
const AccountKey = 'account';

export interface AccountData {
    address: string;
    secret?: string;
    pubkey?: string;
    name?: string;
    suspended?: boolean;
    default?: boolean;
}
export class Account {
    private location:string;

    constructor() {
        this.location = AccountLocation;
        if (!isBrowser()) {
            this.location = path.join(path.join(os.homedir(), '.wowok'), AccountLocation);
        }
    }

    get_location() : string { return this.location; }

    static _instance: any;
    static Instance() : Account {
        if (!Account._instance) {
            Account._instance = new Account();
        }; return Account._instance
    }
    
    private accountData(data:AccountData | undefined) : AccountData | undefined {
        if (!data) return ;

        data.pubkey = Ed25519Keypair.fromSecretKey(fromHEX(data.secret!)).getPublicKey().toSuiPublicKey();
        data.secret = undefined;
        return data;
    }

    async set_default(address_or_name: string) : Promise<boolean> {
        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(AccountKey);
            var found = false;
            if (r) {
                const s = JSON.parse(r) as AccountData[];
                for (let i = 0; i < s.length; i++) {
                    if (s[i].address === address_or_name || s[i].name === address_or_name && !found) {
                        s[i].default = true;
                        found = true;
                    } else {
                        s[i].default = false;
                    }
                }
                await storage.put(AccountKey, JSON.stringify(s));
            }
            return found;    
        })
    }

    async gen(bDefault?: boolean, name?:string) : Promise<AccountData> {   
        if (name && !IsValidName(name)) {
            ERROR(Errors.IsValidName, `Name ${name} is not valid`);
        }   

        var secret = '0x'+toHEX(decodeSuiPrivateKey(Ed25519Keypair.generate().getSecretKey()).secretKey);
        var address = Ed25519Keypair.fromSecretKey(fromHEX(secret)).getPublicKey().toSuiAddress();

        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r) as AccountData[];
                if (name) {
                    if (s.find(v => v.name === name)) {
                        ERROR(Errors.IsValidName, `Name ${name} already exists`);
                    }
                }
                
                if (bDefault) {
                    s.forEach(v => {
                        if (v.default) {
                            v.default = false;
                        }
                    })
                }

                const ret:AccountData = {address: address, secret:secret, name: name ? name:undefined, default: bDefault};
                s.push(ret);

                await storage.put(AccountKey, JSON.stringify(s));
                return this.accountData(ret)!;
            } else {
                const ret:AccountData = {address: address, secret:secret, name: name ? name:undefined, default: bDefault};
                await storage.put(AccountKey, JSON.stringify([ret]));
                return this.accountData(ret)!;
            }    
        }) 
    }

    async default() : Promise<AccountData | undefined> {
        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r) as AccountData[];
                return this.accountData(s.find(v => v.default));
            }                  
        })
    }

    // address: if undefined, the default returned.
    async get(address_or_name?: string) : Promise<AccountData | undefined> {
        return this.accountData(await this.get_imp(address_or_name));
    }

    private async get_imp(address_or_name?: string) : Promise<AccountData | undefined> {
        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r) as AccountData[];
                if (!address_or_name) {
                    return s.find(v => v.default);
                }
    
                return s.find(v => v.address === address_or_name || v.name === address_or_name);
            }
        })
    }
    
    async get_many(address_or_names: (string | null | undefined)[]) : Promise<(AccountData | undefined)[]> {
        return await this.get_many_imp(address_or_names).then(v => v.map(i => this.accountData(i)));
    }
    private async get_many_imp(address_or_names: (string | null | undefined)[]) : Promise<(AccountData | undefined)[]> {
        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r) as AccountData[];
                return address_or_names.map(i => {
                    if (!i) {
                        return s.find(v => v.default);
                    } else {
                        return s.find(v => v.address === i || v.name === i);
                    }
                })
            }
            return address_or_names.map(v => undefined);
        })
    }
    
    async set_name(name:string, address_or_name?:string) : Promise<boolean> {
        if (!IsValidName(name)) {
            ERROR(Errors.IsValidName, `Name ${name} is not valid`);
        }

        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r) as AccountData[];
                if (s.find(v => v.name === name)) {
                    ERROR(Errors.IsValidName, `Name ${name} already exists`); 
                }

                if (!address_or_name) {
                    const f = s.find(v => v.default);
                    if (f) {
                        f.name = name;
                        await storage.put(AccountKey, JSON.stringify(s));
                        return true;
                    } 
                } else {
                    const f = s.find(v => v.address === address_or_name || v.name === address_or_name);
                    if (f) {
                        f.name = name;
                        await storage.put(AccountKey, JSON.stringify(s));
                        return true;
                    } 
                }
            }
            return false;
        })
    }

    async list(showSuspended?:boolean) : Promise<AccountData[]> {      
        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r) as AccountData[];
                if (showSuspended) {
                    return s.map(v => this.accountData(v)!);
                } else {
                    return s.filter(v => !v.suspended).map(v => this.accountData(v)!);
                }
            }
            return [];
        }) 
    }
    
    async suspend(address_or_name?:string, suspend:boolean=true) : Promise<void> {
        await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r) as AccountData[];
                if (!address_or_name) {
                    const f = s.find(v => v.default);
                    if (f) {
                        f.suspended = suspend;
                        f.name = undefined;
                        await storage.put(AccountKey, JSON.stringify(s));
                    } 
                } else {
                    const f = s.find(v => v.address === address_or_name || v.name === address_or_name);
                    if (f) {
                        f.suspended = suspend;
                        f.name = undefined;
                        await storage.put(AccountKey, JSON.stringify(s));
                    } 
                }
            }
        })
    }

    async faucet(address_or_name?:string) {
        const a = await this.get(address_or_name);

        if (a) {
            await FAUCET.requestSuiFromFaucetV2({host:  FAUCET.getFaucetHost('testnet'), recipient:a.address}).catch(e => {})
        }
    }

    async sign_and_commit(txb: TransactionBlock, address_or_name?:string) : Promise<CallResponse | undefined> {
        const a = await this.get_imp(address_or_name);
        if (a) {
            const pair = Ed25519Keypair.fromSecretKey(fromHEX(a.secret!));
            if (pair) {
                return await Protocol.Client().signAndExecuteTransaction({
                    transaction: txb, 
                    signer: pair,
                    options:{showObjectChanges:true},
                });
            } 
        }
    }

    // token_type is 0x2::sui::SUI, if not specified.
    balance = async (address_or_name?:string, token_type?:string) : Promise<CoinBalance | undefined> => {
        const a = await this.get(address_or_name);
        const token_type_ = token_type ?? '0x2::sui::SUI';
        if (a) {
            return await Protocol.Client().getBalance({owner: a.address, coinType:token_type_});
        }
    }

    // token_type is 0x2::sui::SUI, if not specified.
    coin = async (token_type?:string, address_or_name?:string) : Promise<CoinStruct[] | undefined> => {
        const a = await this.get(address_or_name);
        const token_type_ = token_type ?? '0x2::sui::SUI';
        if (a) {
            return (await Protocol.Client().getCoins({owner: a.address, coinType:token_type_})).data;
        }
    }

    get_coin_object = async (txb: TransactionBlock, balance_required:string | bigint | number, address_or_name?:string, token_type?:string) : Promise<TransactionResult | undefined> => {
        const a = await this.get(address_or_name);
        
        if (a) {
            const b = BigInt(balance_required);

            if (b >= BigInt(0)) {
                if (!token_type || token_type === '0x2::sui::SUI' || token_type === '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI') {
                    return txb.splitCoins(txb.gas, [b]);
                } else {
                    const r = await Protocol.Client().getCoins({owner: a.address , coinType:token_type});
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
    async transfer(amount:number|string, token_type?:string, to_address_or_name?:string, from_address_or_name?:string) : Promise<CallResponse | undefined> {
        const [from, to]= await this.get_many_imp([from_address_or_name, to_address_or_name]);
        if (!from) ERROR(Errors.InvalidParam, `Invalid from address or name ${from_address_or_name}`);
        const to_address = to?.address ?? to_address_or_name;
        if (!to_address) ERROR(Errors.InvalidParam, `Invalid to address or name ${to_address_or_name}`);

        const pair = Ed25519Keypair.fromSecretKey(fromHEX(from.secret!))
        if (pair) {
            const txb = new TransactionBlock();
            const coin = await this.get_coin_object(txb, amount, from.address, token_type);
            if (coin) {
                txb.transferObjects([coin as TransactionObjectArgument], to_address)
                const r = await Protocol.Client().signAndExecuteTransaction({
                    transaction: txb, 
                    signer: pair,
                    options:{showObjectChanges:true},
                });
                return r;
            }
        }
    }

    coinObject_with_balance = async(balance_required:string | bigint | number, address_or_name?:string, token_type?:string) : Promise<string | undefined> => {
        const a = await this.get_imp(address_or_name);
        if (!a) return undefined;

        const pair = Ed25519Keypair.fromSecretKey(fromHEX(a.secret!))
        if (!pair) return undefined;
    
        const txb = new TransactionBlock();
        const res = await this.get_coin_object(txb, balance_required, a.address, token_type);
        if (res) {
            txb.transferObjects([res as TransactionObjectArgument], a.address)
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

