/**
 * Persisting the result of the quries.
 */
export interface CachedData {
    expire: number | 'INFINITE';
    data: string | any;
}
export declare enum CacheName {
    object = "object",
    personal = "personal",
    table = "table"
}
export type CacheExpireType = number | 'INFINITE';
export type CacheNameType = CacheName | string;
export declare const CacheLocation = "wowok-cache";
export declare class Cache {
    static _instance: any;
    private location;
    static _expire_time_ms: number;
    constructor();
    static Instance(): Cache;
    static Key: (object: string, prefix: CacheName | string) => string;
    static getExpireTime: () => number;
    static setExpireTime(expire_time_ms: number): void;
    static notExpired(cache: CachedData): boolean;
    static ExpireTime: (bInfinite?: boolean) => CacheExpireType;
    put(object: string, data: CachedData, prefix: CacheNameType): Promise<void>;
    get(object: string, prefix: CacheNameType): Promise<CachedData | undefined>;
    del(object: string, prefix: CacheNameType): Promise<void>;
    cache_get(object: string, prefix: CacheNameType, force_cache?: boolean): Promise<CachedData | undefined>;
}
//# sourceMappingURL=cache.d.ts.map