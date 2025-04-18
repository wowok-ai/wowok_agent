/**
 * Persisting the result of the quries.
 */
import { Protocol } from "wowok";
import path from "path";
import os from "os";
import { Level } from "level";
import { isBrowser } from "../common.js";
export var CacheName;
(function (CacheName) {
    CacheName["object"] = "object";
    CacheName["personal"] = "personal";
    CacheName["table"] = "table";
})(CacheName || (CacheName = {}));
export const CacheLocation = 'wowok-cache';
export class Cache {
    constructor() {
        var location = CacheLocation;
        if (!isBrowser()) {
            location = path.join(path.join(os.homedir(), '.wowok'), CacheLocation);
        }
        this.storage = new Level(location, { valueEncoding: 'json' });
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
        return await this.storage.put(Cache.Key(object, prefix), JSON.stringify(data));
    }
    async get(object, prefix) {
        const r = await this.storage.get(prefix + object);
        if (r)
            return JSON.parse(r);
    }
    async del(object, prefix) {
        return await this.storage.del(prefix + object);
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