/**
 * Persisting the result of the quries.
 */
import { Protocol } from "wowok";
import path from "path";
import os from "os";
import { Level } from "level";
import { get_level_db, isBrowser } from "../common.js";
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
        const storage = new Level(this.location, { valueEncoding: 'json' });
        try {
            await storage.put(Cache.Key(object, prefix), JSON.stringify(data));
        }
        finally {
            await storage.close();
        }
    }
    async get(object, prefix) {
        const r = await get_level_db(this.location, Cache.Key(object, prefix));
        if (r) {
            return JSON.parse(r);
        }
    }
    async del(object, prefix) {
        const storage = new Level(this.location, { valueEncoding: 'json' });
        try {
            await storage.del(Cache.Key(object, prefix));
        }
        finally {
            await storage.close();
        }
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