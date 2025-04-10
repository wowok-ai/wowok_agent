import { Protocol } from "wowok";
export class CacheData {
    constructor(expire) { this.expire = expire; } // 10m default
    expire_time() { return this.expire; }
    ;
}
export var CacheName;
(function (CacheName) {
    CacheName["object"] = "OBJECT";
    CacheName["personal"] = "PERSONAL";
    CacheName["table"] = "TABLE";
})(CacheName || (CacheName = {}));
export const OBJECT_KEY = (object_address, name) => {
    return object_address + Protocol.Instance().package('wowok_origin') + name + '-V2';
};
export class MemeryCache extends CacheData {
    constructor(expire = 10000) {
        super(expire);
        this.data = new Map();
    }
    load(key) {
        return this.data.get(key);
    }
    save(key, data) {
        this.data.set(key, data);
    }
    remove(key) {
        this.data.delete(key);
    }
}
export class LocalStorageCache extends CacheData {
    constructor(expire = 10000) { super(expire); }
    load(key) {
        return localStorage.getItem(key);
    }
    save(key, data) {
        return localStorage.setItem(key, data);
    }
    remove(key) {
        return localStorage.removeItem(key);
    }
}
export class WowokCache {
    constructor() {
        this.cache = new Map();
    }
    static Instance() {
        if (!WowokCache._instance) {
            WowokCache._instance = new WowokCache();
        }
        ;
        return WowokCache._instance;
    }
    set(name, cache) {
        this.cache.set(name, cache);
    }
    get(name) {
        return this.cache.get(name);
    }
}
//# sourceMappingURL=cache.js.map