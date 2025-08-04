/**
 * config
 */

import { Protocol, ENTRYPOINT, CLIENT, ERROR, Errors} from 'wowok';
import { retry_db, isBrowser } from '../common.js';
import path from 'path';
import os from 'os';
import { Level } from 'level';


const ConfigLocation = 'wowok-acc';
const ConfigKey = 'config';

export interface ConfigData {
    network?: ENTRYPOINT;
}

export class Config {
    private location:string;

    constructor() {
        this.location = ConfigLocation;
        if (!isBrowser()) {
            this.location = path.join(path.join(os.homedir(), '.wowok'), ConfigLocation);
        }
    }

    get_location() : string { return this.location; }

    static _instance: any;
    static Instance() : Config {
        if (!Config._instance) {
            Config._instance = new Config();
        }; return Config._instance
    }
    
    private default() : ConfigData {
        return {}
    }

    async network() : Promise<ENTRYPOINT | undefined> {
        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(ConfigKey);
            if (r) {
                const c = (JSON.parse(r) as ConfigData);
                return c.network;
            } 
        })
    }

    // alice - name - symbol - tokenType
    async network_set(network:ENTRYPOINT) : Promise<void> {
        Protocol.Instance().use_network(network);
        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(ConfigKey);
            if (r) {
                const c = (JSON.parse(r) as ConfigData);
                c.network = network;
            } else {
                const n = this.default();
                n.network = network;
                await storage.put(ConfigKey, JSON.stringify(n))
            }
        })
    }

    async list() : Promise<ConfigData | undefined> {   
        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(ConfigKey);
            if (r) {
                return JSON.parse(r) as ConfigData;
            }
        }) 
    }

    async reset() : Promise<ConfigData | undefined> {
        return await retry_db(this.location, async(storage:Level) => {
            const r = await storage.get(ConfigKey);
            if (r) {
                return JSON.parse(r) as ConfigData;
            } else {
                const n = this.default();
                await storage.put(ConfigKey, JSON.stringify(n));
                return n
            }
        }) 
    }
}

