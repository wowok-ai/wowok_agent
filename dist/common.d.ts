import { Level } from 'level';
export declare const isBrowser: () => boolean;
export declare const get_object_address: (object: any) => Promise<any>;
export declare const crypto_string: (str: string, pubkey: string) => string;
export declare const retry_db: (name_or_db: string | Level, command: (db: Level) => Promise<any>) => Promise<any>;
//# sourceMappingURL=common.d.ts.map