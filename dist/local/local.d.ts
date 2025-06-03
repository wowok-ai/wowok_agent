/**
 * manage address name and tags locally
 */
export interface MarkData {
    address: string;
    tags?: string[];
}
export interface InfoData {
    default: string;
    others?: string[];
}
export interface LocalMarkFilter {
    name?: string;
    tags?: string[];
    address?: string;
}
export declare const LocalMarkLocation = "wowok-mark";
export declare const LocalInfoLocation = "wowok-info";
export declare const LocalMarkNameMaxLength = 32;
export declare const LocalInfoNameDefault = "Address of delivery";
export declare class LocalMark {
    static _instance: any;
    private storage;
    constructor();
    static Instance(): LocalMark;
    put(name: string | undefined | null, mark: MarkData, useAddressIfNameExist?: boolean): Promise<string>;
    get(name?: string): Promise<MarkData | undefined>;
    get_address(name_or_address?: string | null): Promise<string | undefined>;
    get_many_address(name_or_addresses: (string | null | undefined)[]): Promise<(string | undefined)[]>;
    get_many_address2(name_or_addresses: (string | null | undefined)[]): Promise<string[]>;
    del(name: string): Promise<void>;
    clear(): Promise<void>;
    rename(name: string, new_name: string): Promise<boolean>;
    swap_name(name1: string, name2: string): Promise<boolean>;
    set_tags(name: string, tags: string[] | undefined): Promise<boolean>;
    list(filter?: LocalMarkFilter): Promise<QueryNameData[]>;
}
export interface QueryNameData {
    name: string;
    data: any;
}
export declare class LocalInfo {
    static _instance: any;
    private storage;
    constructor();
    static Instance(): LocalInfo;
    put(name: string | undefined, content: string, bDefault?: boolean): Promise<void>;
    get(name?: string): Promise<LocalInfo | undefined>;
    get_default(name?: string): Promise<string | undefined>;
    del(name?: string): Promise<void>;
    del_content(name: string | undefined, index: number): Promise<boolean>;
    clear(): Promise<void>;
    list(): Promise<QueryNameData[]>;
}
//# sourceMappingURL=local.d.ts.map