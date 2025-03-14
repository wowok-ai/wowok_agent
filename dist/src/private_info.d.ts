import { BuyRequiredEnum } from 'wowok';
export interface PrivateInfo_Data {
    name: string;
    default?: boolean;
    info: Map<BuyRequiredEnum | string, string>;
}
export declare class PrivateInfo {
    constructor(storage?: 'File' | 'Explorer');
    static _instance: any;
    static Instance(): PrivateInfo;
    private storage;
    private _add;
    private _remove;
    private _default;
    private _get;
    private _rename;
    set_storage(storage?: 'File' | 'Explorer'): void;
    default(): PrivateInfo_Data | undefined;
    get(name?: string, bNotFoundReturnDefault?: boolean): PrivateInfo_Data | undefined;
    rename(oldName: string, newName: string, bSwapIfExisted?: boolean): boolean;
    list(): PrivateInfo_Data[];
    add(name: string, info: Map<BuyRequiredEnum | string, string>, bDefault?: boolean): void;
    remove(name: string): void;
    removeall(): void;
}
//# sourceMappingURL=private_info.d.ts.map