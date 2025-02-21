
import { Protocol } from "wowok";

export type CacheExpire = number | 'INFINITE';

export interface CachedData {
    expire: number | 'INFINITE';
    data: string | any; 
}

export abstract class CacheData {
    constructor(expire: number) { this.expire = expire; } // 10m default
    abstract load(key: string) : string | null | undefined;
    abstract save(key: string, data:string) : void;
    abstract remove(key: string) : void;
    expire_time() {return this.expire};
    protected expire;
}

export enum CacheName {
    object = 'OBJECT',
    resource = 'RESOURCE',
}

export const OBJECT_KEY = (object_address: string) : string => {
    return object_address + Protocol.Instance().package('wowok_origin') + CacheName.object + '-V2';
}
export const PERSONAL_RESOURCE_KEY = (person_address: string) : string => {
    return person_address + Protocol.Instance().package('wowok_origin') + CacheName.resource + '-V2';
}

export interface PersonalResouceCache {
    address: string;
    resource: string;
    time_expire?: CacheExpire;
}

export class MemeryCache extends CacheData {
    constructor(expire: number = 10000) {super(expire)}
    protected data = new Map<string, string>();
    load(key: string) : string | null | undefined {
        return this.data.get(key)
    }
    save(key: string, data:string) : void {
        this.data.set(key, data);
    }
    remove(key: string) : void {
        this.data.delete(key)
    }
}

export class LocalStorageCache extends CacheData {
    constructor(expire: number = 10000) {super(expire)}
    load(key: string) : string | null | undefined {
        return localStorage.getItem(key)
    }
    save(key: string, data:string) : void {
        return localStorage.setItem(key, data)
    }
    remove(key: string) : void {
        return localStorage.removeItem(key)
    }
}

export class WowokCache {
    static _instance: any;
    private cache: Map<string, CacheData | undefined> = new Map();
    
    constructor() {}
    static Instance() : WowokCache {
        if (!WowokCache._instance) {
            WowokCache._instance = new WowokCache();
        }; return WowokCache._instance
    }

    set(name:string | CacheName, cache:CacheData | undefined) {
        this.cache.set(name, cache);
    }

    get(name:string | CacheName) : CacheData | undefined {
        return this.cache.get(name);
    }
}