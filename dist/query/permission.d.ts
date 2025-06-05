/**
 * Provides permission lookup for an address:
 * not only the permission table, but also the administrator or Builder identity.
 */
import { AccountOrMark_Address } from '../call/base.js';
import { PermissionAnswer } from 'wowok';
export interface PermissionQuery {
    permission_object: string;
    address: AccountOrMark_Address;
}
export declare const query_permission_json: (json: string) => Promise<string>;
export declare const query_permission: (query: PermissionQuery) => Promise<PermissionAnswer>;
//# sourceMappingURL=permission.d.ts.map