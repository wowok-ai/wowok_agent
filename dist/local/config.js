/**
 * config
 */
import { Protocol } from 'wowok';
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
        return {};
    }
    async network() {
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(ConfigKey);
            if (r) {
                const c = JSON.parse(r);
                return c.network;
            }
        });
    }
    // alice - name - symbol - tokenType
    async network_set(network) {
        Protocol.Instance().use_network(network);
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(ConfigKey);
            if (r) {
                const c = JSON.parse(r);
                c.network = network;
            }
            else {
                const n = this.default();
                n.network = network;
                await storage.put(ConfigKey, JSON.stringify(n));
            }
        });
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
            const r = await storage.get(ConfigKey);
            if (r) {
                return JSON.parse(r);
            }
            else {
                const n = this.default();
                await storage.put(ConfigKey, JSON.stringify(n));
                return n;
            }
        });
    }
}
//# sourceMappingURL=config.js.map