/**
 * config
 */
import { ENTRYPOINT } from 'wowok';
export interface ConfigData {
    network?: ENTRYPOINT;
}
export declare class Config {
    private location;
    constructor();
    get_location(): string;
    static _instance: any;
    static Instance(): Config;
    private default;
    network(): Promise<ENTRYPOINT | undefined>;
    network_set(network: ENTRYPOINT): Promise<void>;
    list(): Promise<ConfigData | undefined>;
    reset(): Promise<ConfigData | undefined>;
}
//# sourceMappingURL=config.d.ts.map