/**
 * coin type cache
 */
import { Protocol, ENTRYPOINT, ERROR, Errors } from 'wowok';
import { retry_db, isBrowser } from '../common.js';
import path from 'path';
import os from 'os';
const CoinLocation = 'wowok-coin';
export class CoinInfo {
    constructor() {
        this.location = CoinLocation;
        if (!isBrowser()) {
            this.location = path.join(path.join(os.homedir(), '.wowok'), CoinLocation);
        }
    }
    get_location() { return this.location; }
    static Instance() {
        if (!CoinInfo._instance) {
            CoinInfo._instance = new CoinInfo();
        }
        ;
        return CoinInfo._instance;
    }
    default(network) {
        switch (Protocol.Instance().networkUrl(network).network) {
            case ENTRYPOINT.testnet:
                return Protocol.Instance().CoinTypes_Testnet;
            case ENTRYPOINT.mainnet:
                return Protocol.Instance().CoinTypes_Mainnet;
            case ENTRYPOINT.localnet:
                return [];
            case ENTRYPOINT.wowoknet:
                return [];
        }
        return [];
    }
    async fetch_imp(coinType, alias, network) {
        const r = await Protocol.Client(network).getCoinMetadata({ coinType: coinType });
        if (r) {
            return { alias: alias, type: coinType, ...r };
        }
    }
    async fetch(coinType, alias, network) {
        if (!coinType)
            ERROR(Errors.IsValidTokenType, `${coinType}`);
        const net = Protocol.Instance().networkUrl(network);
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(net.network);
            if (r) {
                const c = JSON.parse(r);
                const f = c.find(v => v.type.toLowerCase() === coinType.toLowerCase());
                if (f) {
                    if (alias !== undefined)
                        f.alias = alias;
                    return f;
                }
                const n = await this.fetch_imp(coinType, alias, network);
                if (n) {
                    c.push(n);
                    await storage.put(net.network, JSON.stringify(c));
                    return n;
                }
            }
            else {
                const def = this.default(network);
                const ret = def.find(v => v.type.toLowerCase() === coinType.toLowerCase());
                if (!ret) {
                    const n = await this.fetch_imp(coinType, alias);
                    if (n) {
                        await storage.put(net.network, JSON.stringify([...def, n]));
                        return n;
                    }
                }
                await storage.put(net.network, JSON.stringify([...def]));
                return ret;
            }
        });
    }
    // alice - name - symbol - tokenType
    async query(filter, network) {
        const net = Protocol.Instance().networkUrl(network);
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(net.network);
            if (r) {
                const c = JSON.parse(r);
                return c.filter(v => {
                    let r1 = false;
                    let r2 = false;
                    let r3 = false;
                    if (filter.alias_or_name !== undefined && (v.alias === filter.alias_or_name || v.name === filter.alias_or_name)) {
                        r1 = true;
                    }
                    ;
                    if (filter.symbol !== undefined && filter.symbol === v.symbol) {
                        r2 = true;
                    }
                    ;
                    if (filter.coinType !== undefined && filter.coinType.toLowerCase() === v.type.toLowerCase()) {
                        r3 = true;
                    }
                    ;
                    return r1 && r2 && r3;
                });
            }
        });
    }
    async list(network) {
        const net = Protocol.Instance().networkUrl(network);
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(net.network);
            if (r) {
                return JSON.parse(r);
            }
        });
    }
}
//# sourceMappingURL=coin.js.map