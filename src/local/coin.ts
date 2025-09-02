/**
 * coin type cache
 */

import { Protocol, ENTRYPOINT, CLIENT, ERROR, Errors, IsValidTokenType, CoinTypeInfo} from 'wowok';
import { retry_db, isBrowser } from '../common.js';
import path from 'path';
import os from 'os';
import { Level } from 'level';


const CoinLocation = 'wowok-coin';

export interface CoinDataFilter {
    alias_or_name?: string;
    symbol?: string;
    coinType?: string;
}

export class CoinInfo {
    private location:string;

    constructor() {
        this.location = CoinLocation;
        if (!isBrowser()) {
            this.location = path.join(path.join(os.homedir(), '.wowok'), CoinLocation);
        }
    }

    get_location() : string { return this.location; }

    static _instance: any;
    static Instance() : CoinInfo {
        if (!CoinInfo._instance) {
            CoinInfo._instance = new CoinInfo();
        }; return CoinInfo._instance
    }
    
    private default(network?:ENTRYPOINT) : CoinTypeInfo[] {
        switch (Protocol.Instance().networkUrl(network).network) {
            case ENTRYPOINT.suitest:
                return Protocol.Instance().CoinTypes_Testnet;
            case ENTRYPOINT.suimain:
                return Protocol.Instance().CoinTypes_Mainnet;
            case ENTRYPOINT.wowoktest:
                return [];
            case ENTRYPOINT.wowokmain:
                return [];
        }
        return [];
    }

    private async fetch_imp(coinType: string, alias?:string, network?:ENTRYPOINT) : Promise<CoinTypeInfo | undefined> {
        const r = await Protocol.Client(network).getCoinMetadata({coinType:coinType});
        if (r) {
            return {alias:alias, type:coinType, ...r};
        }
    }

    async fetch(coinType: string, alias?:string, network?:ENTRYPOINT) : Promise<CoinTypeInfo | undefined> {
        if (!coinType) ERROR(Errors.IsValidTokenType, `${coinType}`);
        const net = Protocol.Instance().networkUrl(network);

        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(net.network);
            if (r) {
                const c = (JSON.parse(r) as CoinTypeInfo[]);
                const f = c.find(v => v.type.toLowerCase() === coinType.toLowerCase());
                if (f) {
                    if (alias !== undefined) f.alias = alias;
                    return f;
                }

                const n = await this.fetch_imp(coinType, alias, network);
                if (n) {
                    c.push(n);
                    await storage.put(net.network, JSON.stringify(c));
                    return n;
                }
            } else {
                const def = this.default(network);
                const ret = def.find(v => v.type.toLowerCase() === coinType.toLowerCase());
                if (!ret) {
                    const n = await this.fetch_imp(coinType, alias);
                    if (n) {
                        await storage.put(net.network, JSON.stringify([...def, n]));
                        return n
                    } 
                }
                await storage.put(net.network, JSON.stringify([...def]));
                return ret;
            }
        })
    }

    // alice - name - symbol - tokenType
    async query(filter:CoinDataFilter, network?:ENTRYPOINT) : Promise<CoinTypeInfo[]> {
        const net = Protocol.Instance().networkUrl(network);

        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(net.network);
            if (r) {
                const c = (JSON.parse(r) as CoinTypeInfo[]);
                return c.filter(v => {
                    let r1 = false ; let r2 = false; let r3 = false;
                    if (filter.alias_or_name !== undefined && (
                        v.alias === filter.alias_or_name || v.name === filter.alias_or_name)) {
                        r1 = true;
                    };
                    if (filter.symbol !== undefined && filter.symbol === v.symbol) {
                        r2 = true;
                    };
                    if (filter.coinType !== undefined && filter.coinType.toLowerCase() === v.type.toLowerCase()) {
                        r3 = true;
                    };
                    return r1 && r2 && r3;
                });
            }
        })
    }

    async list(network?:ENTRYPOINT) : Promise<CoinTypeInfo[]> {   
        const net = Protocol.Instance().networkUrl(network);

        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(net.network);
            if (r) {
                return JSON.parse(r) as CoinTypeInfo[];
            }
        }) 
    }
}

