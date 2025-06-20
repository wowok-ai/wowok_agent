/**
 * Persisting the result of the quries.
 */
import { Protocol } from "wowok";
import path from "path";
import os from "os";
import { retry_db, isBrowser } from "../common.js";
export var CacheName;
(function (CacheName) {
    CacheName["object"] = "object";
    CacheName["personal"] = "personal";
    CacheName["table"] = "table";
})(CacheName || (CacheName = {}));
export const CacheLocation = 'wowok-cache';
export class Cache {
    ;
    constructor() {
        this.location = CacheLocation;
        if (!isBrowser()) {
            this.location = path.join(path.join(os.homedir(), '.wowok'), CacheLocation);
        }
    }
    static Instance() {
        if (!Cache._instance) {
            Cache._instance = new Cache();
        }
        ;
        return Cache._instance;
    }
    static setExpireTime(expire_time_ms) {
        Cache._expire_time_ms = expire_time_ms;
    }
    static notExpired(cache) {
        if (!cache?.expire)
            return false;
        if (cache.expire === 'INFINITE')
            return true;
        return cache.expire <= Date.now();
    }
    async put(object, data, prefix) {
        await retry_db(this.location, async (storage) => {
            await storage.put(Cache.Key(object, prefix), JSON.stringify(data));
        });
    }
    async get(object, prefix) {
        return await retry_db(this.location, async (storage) => {
            const r = await storage.get(Cache.Key(object, prefix));
            if (r) {
                return JSON.parse(r);
            }
        });
    }
    async del(object, prefix) {
        await retry_db(this.location, async (storage) => {
            await storage.del(Cache.Key(object, prefix));
        });
    }
    async cache_get(object, prefix, force_cache) {
        const r = await this.get(object, prefix);
        if (r && (force_cache || Cache.notExpired(r))) {
            return r;
        }
    }
}
Cache._expire_time_ms = 60000; // default
Cache.Key = (object, prefix) => {
    return object + '.' + prefix + '#' + Protocol.Instance().package('wowok_origin');
};
Cache.getExpireTime = () => {
    return Cache._expire_time_ms;
};
Cache.ExpireTime = (bInfinite) => {
    if (bInfinite)
        return 'INFINITE';
    return Date.now() + Cache.getExpireTime();
};
//# sourceMappingURL=cache.js.map