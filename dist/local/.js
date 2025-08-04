/**
 * config management and use
 */
import { Protocol, ENTRYPOINT } from 'wowok';
import { retry_db, isBrowser } from '../common.js';
import path from 'path';
import os from 'os';
const ConfigLocation = 'wowok-acc';
const ConfigKey = 'config';
export class Config {
    constructor() {
        this.location = ConfigLocation;
        if (!isBrowser()) {
            this.location = path.join(path.join(os.homedir(), '.wowok'), ConfigLocation);
        }
    }
    get_location() { return this.location; }
    static Instance() {
        if (!Config._instance) {
            Config._instance = new Config();
        }
        ;
        return Config._instance;
    }
    default() {
        return { network: ENTRYPOINT.testnet };
    }
    async network(bInit = true) {
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(ConfigKey);
            if (r) {
                return JSON.parse(r).network;
            }
            else {
                if (bInit) {
                    const n = this.default();
                    await storage.put(ConfigKey, JSON.stringify(n));
                    Protocol.Instance().use_network(n.network);
                    return n.network;
                }
            }
        });
    }
    async network_set(network) {
        await retry_db(this.location, async (storage) => {
            const r = await storage.get(ConfigKey);
            if (r) {
                const s = JSON.parse(r);
                s.network = network;
                await storage.put(ConfigKey, JSON.stringify(s));
            }
            else {
                const n = this.default();
                n.network = network;
                await storage.put(ConfigKey, JSON.stringify(n));
            }
        });
        Protocol.Instance().use_network(network);
    }
    async list() {
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(ConfigKey);
            if (r) {
                return JSON.parse(r);
            }
        });
    }
    async reset() {
        return await retry_db(this.location, async (storage) => {
            const n = this.default();
            await storage.put(ConfigKey, JSON.stringify(n));
            Protocol.Instance().use_network(n.network);
        });
    }
}
//# sourceMappingURL=.js.map