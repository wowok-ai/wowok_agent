import { TreasuryReceived } from "wowok";
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
export declare const query_treasury_received: (query: QueryTreasuryReceived) => Promise<TreasuryReceived>;
//# sourceMappingURL=treasury_received.d.ts.map