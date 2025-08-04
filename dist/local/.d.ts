/**
 * config management and use
 */
import { ENTRYPOINT } from 'wowok';
export interface ConfigData {
    network: ENTRYPOINT;
}
export declare class Config {
    private location;
    constructor();
    get_location(): string;
    static _instance: any;
    static Instance(): Config;
    private default;
    network(bInit?: boolean): Promise<string | undefined>;
    network_set(network: ENTRYPOINT): Promise<void>;
    list(): Promise<ConfigData | undefined>;
    reset(): Promise<any>;
}
//# sourceMappingURL=.d.ts.map