import { ERROR, Errors, Treasury, ReceivedBalance, ReceivedBalanceObject, GetRecievedBalanceObject,  } from "wowok";
import { query_objects } from "./objects.js";
import { session_resolve, SessionOption } from "../common.js";


export interface QueryReceived {
    /** Name or address of the Treasury/Order object. */
    object: string; 
    /**
     * An optional paging cursor. If provided, the query will start from the next item after the specified
     * cursor. Default to start from the first item if not specified.
     */
    cursor?: string | null | undefined;
    /** Max number of items returned per page, default to [QUERY_MAX_RESULT_LIMIT] if not specified. */
    limit?: number | null | undefined;
    session?: SessionOption;
}

// receive Treasury or Order object Payments
export const query_received = async (query: QueryReceived) : Promise<ReceivedBalance | undefined> => {
    const r1 = await query_objects({objects:[query.object]});
    if (r1?.objects?.length !== 1 || (r1.objects[0].type !== 'Treasury' && r1.objects[0].type !== 'Order')) {
        ERROR(Errors.InvalidParam, 'query_received: Only Treasury or Order object supported.');
    }
    
    var t: string | undefined;
    if (r1.objects[0].type === 'Treasury') {
        t = Treasury.parseObjectType(r1.objects[0].type_raw);
    } 

    return await GetRecievedBalanceObject(r1.objects[0].object, t, await session_resolve(query.session))
}