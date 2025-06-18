import { ERROR, Errors, Protocol, Treasury, TreasuryReceived, TreasuryReceivedObject } from "wowok";
import { query_objects } from "./objects.js";


export interface QueryTreasuryReceived {
    /** Name or address of the Treasury object. */
    treasury_object: string;
    /**
     * An optional paging cursor. If provided, the query will start from the next item after the specified
     * cursor. Default to start from the first item if not specified.
     */
    cursor?: string | null | undefined;
    /** Max number of items returned per page, default to [QUERY_MAX_RESULT_LIMIT] if not specified. */
    limit?: number | null | undefined;
}

export const query_treasury_received = async (query: QueryTreasuryReceived) : Promise<TreasuryReceived> => {
    const r1 = await query_objects({objects:[query.treasury_object]});
    if (r1?.objects?.length !== 1 || r1.objects[0].type !== 'Treasury') {
        ERROR(Errors.InvalidParam, 'query_treasury_received: invalid treasury_object');
    }

    const type = Protocol.Instance().package('wowok')+'::payment::CoinWrapper<'+Treasury.parseObjectType(r1.objects[0].type_raw)+'>';
    const r2 = await Protocol.Client().getOwnedObjects({owner:r1.objects[0].object, filter:{StructType: type}, 
        options:{showContent:true, showType:true}, cursor:query.cursor, limit:query.limit});

    let receive = BigInt(0);
    const res: TreasuryReceivedObject[] = r2.data.map((v:any) => {
    const i = v?.data?.content?.fields;
    receive += BigInt(i?.coin?.fields?.balance);
    return {payment:i?.payment, balance:i?.coin?.fields?.balance, id:v?.data?.objectId} 
    });

    return {balance:receive.toString(), received:res};    
}