/**
 * Provides permission lookup for an address: 
 * not only the permission table, but also the administrator or Builder identity.
 */

import { session_resolve, SessionOption } from '../common.js';
import { AccountOrMark_Address, GetAccountOrMark_Address } from '../call/base.js';
import { LocalMark } from '../local/local.js';
import { TransactionBlock, Protocol, Bcs, Errors, ERROR, Permission, PermissionAnswer, BCS} from 'wowok';

export interface PermissionQuery {
    permission_object: string;
    address: AccountOrMark_Address;
    session?: SessionOption;    
}

/*json: PermissionQuery; return PermissionAnswer */
export const query_permission_json = async (json:string) : Promise<string> => {
    try {
        const q : PermissionQuery = JSON.parse(json);
        return JSON.stringify({data:await query_permission(q)});
    } catch (e) {
        return JSON.stringify({error:e});
    }
}

export const query_permission = async (query:PermissionQuery) : Promise<PermissionAnswer> => {
    const [object_address, entity_address] = await Promise.all([
        await LocalMark.Instance().get_address(query.permission_object),
        await GetAccountOrMark_Address(query.address),
    ]);

    if (!object_address || !entity_address) {
        ERROR(Errors.InvalidParam, 'permission.query_permission');
    }
    
    const txb = new TransactionBlock();
    const object = Permission.From(txb, object_address);
    
    object.query_permissions_all(entity_address);

    const res = await Protocol.Client(await session_resolve(query.session)).devInspectTransactionBlock({sender:entity_address, transactionBlock:txb});
    if (res.results && res.results[0].returnValues && res.results[0].returnValues.length !== 2 )  {
        ERROR(Errors.Fail, 'permission.retValues')
    }
    const perm = BCS.bcs.u8().parse(Uint8Array.from((res.results as any)[0].returnValues[0][0]));
    if (perm === Permission.PERMISSION_ADMIN || perm === Permission.PERMISSION_OWNER_AND_ADMIN) {
        return {who:entity_address, admin:true, owner:perm%2===1, items:[], object:object_address}
    } else {
        const perms = Bcs.getInstance().de_perms(Uint8Array.from((res.results as any)[0].returnValues[1][0]));
        return {who:entity_address, admin:false, owner:perm%2===1, items:perms.map((v:any)=>{
            return {query:v?.index, permission:true, guard:v?.guard}
        }), object:object_address};  
    }
}

