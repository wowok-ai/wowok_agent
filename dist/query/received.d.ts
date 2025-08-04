import { ReceivedBalance } from "wowok";
import { SessionOption } from "../common.js";
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
export declare const query_received: (query: QueryReceived) => Promise<ReceivedBalance | undefined>;
//# sourceMappingURL=received.d.ts.map