/**
 * coin type cache
 */
import { ENTRYPOINT, CoinTypeInfo } from 'wowok';
export interface CoinDataFilter {
    alias_or_name?: string;
    symbol?: string;
    coinType?: string;
}
export declare class CoinInfo {
    private location;
    constructor();
    get_location(): string;
    static _instance: any;
    static Instance(): CoinInfo;
    private default;
    private fetch_imp;
    fetch(coinType: string, alias?: string, network?: ENTRYPOINT): Promise<CoinTypeInfo | undefined>;
    query(filter: CoinDataFilter, network?: ENTRYPOINT): Promise<CoinTypeInfo[]>;
    list(network?: ENTRYPOINT): Promise<CoinTypeInfo[]>;
}
//# sourceMappingURL=coin.d.ts.map