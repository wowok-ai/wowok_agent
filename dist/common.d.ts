import { Level } from 'level';
import { ENTRYPOINT } from "wowok";
export declare const isBrowser: () => boolean;
export declare const get_object_address: (object: any) => Promise<any>;
export declare const crypto_string: (str: string, pubkey: string) => string;
export declare const retry_db: (name_or_db: string | Level, command: (db: Level) => Promise<any>) => Promise<any>;
export interface SessionOption {
    network: ENTRYPOINT;
    retentive: 'always' | 'session';
}
export declare const session_resolve: (option?: SessionOption) => Promise<ENTRYPOINT>;
//# sourceMappingURL=common.d.ts.map