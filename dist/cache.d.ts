export type CacheExpire = number | 'INFINITE';
export interface CachedData {
    expire: number | 'INFINITE';
    data: string | any;
}
export declare abstract class CacheData {
    constructor(expire: number);
    abstract load(key: string): string | null | undefined;
    abstract save(key: string, data: string): void;
    abstract remove(key: string): void;
    expire_time(): number;
    protected expire: number;
}
export declare enum CacheName {
    object = "OBJECT",
    personal = "PERSONAL",
    table = "TABLE"
}
export declare const OBJECT_KEY: (object_address: string, name: CacheName) => string;
export interface PersonalResouceCache {
    address: string;
    resource: string;
    time_expire?: CacheExpire;
}
export declare class MemeryCache extends CacheData {
    constructor(expire?: number);
    protected data: Map<string, string>;
    load(key: string): string | null | undefined;
    save(key: string, data: string): void;
    remove(key: string): void;
}
export declare class LocalStorageCache extends CacheData {
    constructor(expire?: number);
    load(key: string): string | null | undefined;
    save(key: string, data: string): void;
    remove(key: string): void;
}
export declare class WowokCache {
    static _instance: any;
    private cache;
    constructor();
    static Instance(): WowokCache;
    set(name: string | CacheName, cache: CacheData | undefined): void;
    get(name: string | CacheName): CacheData | undefined;
}
//# sourceMappingURL=cache.d.ts.map