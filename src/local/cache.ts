
/**
 * Persisting the result of the quries.
 */

import { Protocol } from "wowok";
import path from "path";
import os from "os";
import { Level } from "level";
import { isBrowser } from "../common.js";
export interface CachedData {
    expire: number | 'INFINITE';
    data: string | any; 
}

export enum CacheName {
    object = 'object',
    personal = 'personal',
    table = 'table',
}

export type CacheExpireType = number | 'INFINITE';
export type CacheNameType = CacheName | string; // string for table item KEY

export const CacheLocation = 'wowok-cache';

export class Cache {
    static _instance: any;
    private storage;
    static _expire_time_ms = 60000; // default

    constructor() {
        var location = CacheLocation;
        if (!isBrowser()) {
            location = path.join(path.join(os.homedir(), '.wowok'), CacheLocation);
        }
        this.storage = new Level(location, { valueEncoding: 'json' });
    }

    static Instance() : Cache {
        if (!Cache._instance) {
            Cache._instance = new Cache();
        }; return Cache._instance
    }
    static Key = (object: string, prefix:CacheName|string) : string => {
        return object + '.' + prefix + '#' + Protocol.Instance().package('wowok_origin');
    }

    static getExpireTime = () : number => {
        return Cache._expire_time_ms;    
    }
    static setExpireTime(expire_time_ms: number) {
        Cache._expire_time_ms = expire_time_ms;
    }

    static notExpired(cache:CachedData) : boolean {
        if (!cache?.expire) return false;
        if (cache.expire === 'INFINITE') return true;
        return cache.expire <= Date.now();
    }
    static ExpireTime = (bInfinite?:boolean) : CacheExpireType => {
        if (bInfinite) return 'INFINITE';
        return Date.now() + Cache.getExpireTime();
    }

    async put(object:string, data:CachedData, prefix:CacheNameType) {
        return await this.storage.put(Cache.Key(object, prefix), JSON.stringify(data))
    }

    async get(object:string, prefix:CacheNameType) : Promise<CachedData | undefined> {
        const r = await this.storage.get(prefix+object);
        if (r) return JSON.parse(r) as CachedData;
    }

    async del(object:string, prefix:CacheNameType)  {
        return await this.storage.del(prefix+object)
    }

    async cache_get(object:string, prefix:CacheNameType, force_cache?:boolean) : Promise<CachedData | undefined> {
        const r = await this.get(object, prefix);
        if (r && (force_cache || Cache.notExpired(r))) {
            return r;
        }
    }
}