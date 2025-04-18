/**
 * manage object's name and tags locally
 */
export interface MarkData {
    object: string;
    tags: string[];
}
export interface InfoData {
    default: string;
    others?: string[];
}
export declare const LocalMarkLocation = "wowok-mark";
export declare const LocalInfoLocation = "wowok-info";
export declare class LocalMark {
    static _instance: any;
    private storage;
    constructor();
    static Instance(): LocalMark;
    put(name: string, mark: MarkData, replaceIfExist?: boolean): Promise<boolean>;
    get(name: string): Promise<MarkData | undefined>;
    del(name: string): Promise<void>;
    clear(): Promise<void>;
    rename(name: string, new_name: string): Promise<boolean>;
    swap_name(name1: string, name2: string): Promise<boolean>;
    set_tags(name: string, tags: string[]): Promise<boolean>;
}
export declare class LocalInfo {
    static _instance: any;
    private storage;
    constructor();
    static Instance(): LocalInfo;
    put(name: string, content: string, bDefault?: boolean): Promise<void>;
    get(name: string): Promise<LocalInfo | undefined>;
    get_default(name: string): Promise<string | undefined>;
    del(name: string): Promise<void>;
    del_content(name: string, index: number): Promise<boolean>;
    clear(): Promise<void>;
}
//# sourceMappingURL=local.d.ts.map