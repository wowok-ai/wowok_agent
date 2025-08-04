/**
 * account management and use
 */

import { Ed25519Keypair, fromHex, toHex, decodeSuiPrivateKey, Protocol, TransactionBlock, 
    FAUCET, CoinBalance, CoinStruct, TransactionArgument, TransactionResult, 
    CallResponse, TransactionObjectArgument, Errors, ERROR, IsValidName,
    ENTRYPOINT} from 'wowok';
import { retry_db, isBrowser, SessionOption, session_resolve } from '../common.js';
import path, { resolve } from 'path';
import os from 'os';
import { Level } from 'level';

export type DEFAULT_NAME = 'default';
export const DEFAULT_ACCOUNT_NAME = 'default';
const AccountLocation = 'wowok-acc';
const AccountKey = 'account';

export interface AccountData {
    address: string;
    secret?: string;
    pubkey?: string;
    name?: string;
    suspended?: boolean;
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
    
    private accountData(data:AccountData | undefined, showSecret:boolean=false) : AccountData | undefined {
        if (!data) return ;
        const r = Ed25519Keypair.fromSecretKey(fromHex(data.secret!));
        data.pubkey = r.getPublicKey().toSuiPublicKey();
        data.secret = showSecret ? r.getSecretKey() : undefined;
        return data;
    }

    async gen(name?:string | DEFAULT_NAME) : Promise<AccountData> {   
        if (!name) {
            name = DEFAULT_ACCOUNT_NAME;
        }

        if (!IsValidName(name)) {
            ERROR(Errors.IsValidName, `Name ${name} is not valid`);
        }   

        var secret = '0x'+toHex(decodeSuiPrivateKey(Ed25519Keypair.generate().getSecretKey()).secretKey);
        var address = Ed25519Keypair.fromSecretKey(fromHex(secret)).getPublicKey().toSuiAddress();

        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r) as AccountData[];
                if (name) {
                    if (s.find(v => v.name === name)) {
                        ERROR(Errors.IsValidName, `Name ${name} already exists`);
                    }
                }

                const ret:AccountData = {address: address, secret:secret, name};
                s.push(ret);
                await Promise.all([ //@ faucet default
                    await storage.put(AccountKey, JSON.stringify(s)),
                    await FAUCET.requestSuiFromFaucetV2({host:  FAUCET.getFaucetHost('testnet'), recipient:address}).catch(e => {})
                ]);
                
                return this.accountData(ret)!;
            } else {
                const ret:AccountData = {address: address, secret:secret, name: name};
                await Promise.all([
                    await storage.put(AccountKey, JSON.stringify([ret])),
                    await FAUCET.requestSuiFromFaucetV2({host:  FAUCET.getFaucetHost('testnet'), recipient:address}).catch(e => {})
                ]);
                
                return this.accountData(ret)!;
            }    
        }) 
    }

    async default() : Promise<AccountData | undefined> {
        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r) as AccountData[];
                return this.accountData(s.find(v => v.name === DEFAULT_ACCOUNT_NAME));
            }                  
        })
    }

    // address: if undefined, the default returned.
    async get(address_or_name?: string) : Promise<AccountData | undefined> {
        return this.accountData(await this.get_imp(address_or_name));
    }
    async get_address(address_or_name?: string) : Promise<string | undefined> {
        return (await this.get_imp(address_or_name))?.address;
    }

    private async get_imp(address_or_name?: string) : Promise<AccountData | undefined> {
        if (!address_or_name) address_or_name = DEFAULT_ACCOUNT_NAME;
        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r) as AccountData[]; 
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
                        return s.find(v => v.name === DEFAULT_ACCOUNT_NAME);
                    } else {
                        return s.find(v => v.address === i || v.name === i);
                    }
                })
            }
            return address_or_names.map(v => undefined);
        })
    }
    
    async swap_names(name1?:string | DEFAULT_NAME, name2?:string | DEFAULT_NAME) : Promise<boolean> {
        if (!name1) name1 = DEFAULT_ACCOUNT_NAME;
        if (!name2) name2 = DEFAULT_ACCOUNT_NAME;
        if (name1 === name2) return false;

        if (!IsValidName(name1)) {
            ERROR(Errors.IsValidName, `Name ${name1} is not valid`);
        }
        if (!IsValidName(name2)) {
            ERROR(Errors.IsValidName, `Name ${name2} is not valid`);
        }

        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r) as AccountData[];
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
        })
    }

    async set_name(name?:string | DEFAULT_NAME, address_or_name?:string) : Promise<boolean> {
        if (!address_or_name) address_or_name = DEFAULT_ACCOUNT_NAME;
        if (!name) name = DEFAULT_ACCOUNT_NAME;
        if (address_or_name === name) return true;

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

                const f = s.find(v => v.address === address_or_name || v.name === address_or_name);
                if (f) {
                    f.name = name;
                    await storage.put(AccountKey, JSON.stringify(s));
                    return true;
                } 
            }
            return false;
        })
    }

    async list(showSuspended?:boolean, showSecret:boolean=false) : Promise<AccountData[]> {      
        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r) as AccountData[];
                if (showSuspended) {
                    return s.map(v => this.accountData(v, showSecret)!);
                } else {
                    return s.filter(v => !v.suspended).map(v => this.accountData(v, showSecret)!);
                }
            }
            return [];
        }) 
    }
    
    async suspend(address_or_name?:string) : Promise<void> {
        if (!address_or_name) address_or_name = DEFAULT_ACCOUNT_NAME;
        await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r) as AccountData[];

                const f = s.find(v => v.address === address_or_name || v.name === address_or_name);
                if (f) {
                    f.suspended = true;
                    f.name = undefined;
                    await storage.put(AccountKey, JSON.stringify(s));
                } 
            }
        })
    }

    async resume(address:string, name?:string | DEFAULT_NAME) : Promise<void> {
        if (!name) name = DEFAULT_ACCOUNT_NAME;

        await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(AccountKey);
            if (r) {
                const s = JSON.parse(r) as AccountData[];
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
        })
    }

    async faucet(address_or_name?:string|DEFAULT_NAME) {
        const a = await this.get(address_or_name);

        if (a) {
            await FAUCET.requestSuiFromFaucetV2({host:  FAUCET.getFaucetHost('testnet'), recipient:a.address}).catch(e => {})
        }
    }

    async sign_and_commit(txb: TransactionBlock, address_or_name?:string, session?:SessionOption) : Promise<CallResponse | undefined> {
        const a = await this.get_imp(address_or_name);
        if (a) {
            const pair = Ed25519Keypair.fromSecretKey(fromHex(a.secret!));
            if (pair) {
                return await Protocol.Client(await session_resolve(session)).signAndExecuteTransaction({
                    transaction: txb, 
                    signer: pair,
                    options:{showObjectChanges:true},
                });
            } 
        }
    }

    // token_type is 0x2::sui::SUI, if not specified.
    balance = async (address_or_name?:string, token_type?:string, session?:SessionOption) : Promise<CoinBalance | undefined> => {
        const a = await this.get(address_or_name);
        const token_type_ = token_type ?? '0x2::sui::SUI';
        if (a) {
            return await Protocol.Client(await session_resolve(session)).getBalance({owner: a.address, coinType:token_type_});
        }
    }

    // token_type is 0x2::sui::SUI, if not specified.
    coin = async (token_type?:string, address_or_name?:string, session?:SessionOption) : Promise<CoinStruct[] | undefined> => {
        const a = await this.get(address_or_name);
        const token_type_ = token_type ?? '0x2::sui::SUI';
        if (a) {
            return (await Protocol.Client(await session_resolve(session)).getCoins({owner: a.address, coinType:token_type_})).data;
        }
    }

    get_coin_object = async (txb: TransactionBlock, balance_required:string | bigint | number, address_or_name?:string, token_type?:string, session?:SessionOption) : Promise<TransactionResult | undefined> => {
        const a = await this.get(address_or_name);
        
        if (a) {
            const b = BigInt(balance_required);

            if (b >= BigInt(0)) {
                if (!token_type || token_type === '0x2::sui::SUI' || token_type === '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI') {
                    return txb.splitCoins(txb.gas, [b]);
                } else {
                    const r = await Protocol.Client(await session_resolve(session)).getCoins({owner: a.address , coinType:token_type});
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
    async transfer(amount:number|string, token_type?:string, to_address_or_name?:string, from_address_or_name?:string, session?:SessionOption) : Promise<CallResponse | undefined> {
        const [from, to]= await this.get_many_imp([from_address_or_name, to_address_or_name]);
        if (!from) ERROR(Errors.InvalidParam, `Invalid from address or name ${from_address_or_name}`);
        const to_address = to?.address ?? to_address_or_name;
        if (!to_address) ERROR(Errors.InvalidParam, `Invalid to address or name ${to_address_or_name}`);

        const pair = Ed25519Keypair.fromSecretKey(fromHex(from.secret!))
        if (pair) {
            const txb = new TransactionBlock();
            const coin = await this.get_coin_object(txb, amount, from.address, token_type);
            if (coin) {
                txb.transferObjects([coin as TransactionObjectArgument], to_address)
                const r = await Protocol.Client(await session_resolve(session)).signAndExecuteTransaction({
                    transaction: txb, 
                    signer: pair,
                    options:{showObjectChanges:true},
                });
                return r;
            }
        }
    }

    coinObject_with_balance = async(balance_required:string | bigint | number, address_or_name?:string, token_type?:string, session?:SessionOption) : Promise<string | undefined> => {
        const a = await this.get_imp(address_or_name);
        if (!a) return undefined;

        const pair = Ed25519Keypair.fromSecretKey(fromHex(a.secret!))
        if (!pair) return undefined;
    
        const txb = new TransactionBlock();
        const res = await this.get_coin_object(txb, balance_required, a.address, token_type);
        if (res) {
            txb.transferObjects([res as TransactionObjectArgument], a.address)
            const r = await Protocol.Client(await session_resolve(session)).signAndExecuteTransaction({
                transaction: txb, 
                signer: pair,
                options:{showObjectChanges:true},
            });
            const t = token_type ?? '0x2::sui::SUI';
            return ((r as any)?.objectChanges.find((v:any) => v?.type === 'created' && (v?.objectType as string).includes(t)) as any)?.objectId;
        }
    }
}

