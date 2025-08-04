/**
 * Provide AI with Basic WoWok event queries:
 * for real-time detail tracking.
 */
import { SessionOption } from '../common.js';
export interface EventBase {
    id: {
        eventSeq: string;
        txDigest: string;
    };
    sender: string;
    type: string | 'NewArbEvent' | 'NewOrderEvent' | 'NewProgressEvent' | 'PresentServiceEvent';
    type_raw: string;
    time: string;
}
export interface NewArbEvent extends EventBase {
    arb: string;
    arbitration: string;
    order: string;
}
export interface NewOrderEvent extends EventBase {
    order: string;
    service: string;
    progress?: string | null;
    amount: string;
}
export interface NewProgressEvent extends EventBase {
    progress: string;
    machine: string;
    task?: string | null;
}
export interface PresentServiceEvent extends EventBase {
    demand: string;
    service: string;
    recommendation: string;
}
export interface NewEntityEvent extends EventBase {
    resource: string;
    address: string;
}
export interface EventAnswer {
    data: EventBase[];
    hasNextPage: boolean;
    nextCursor?: {
        eventSeq: string;
        txDigest: string;
    } | null;
}
export interface EventCursor {
    eventSeq: string;
    txDigest: string;
}
export interface EventQuery {
    type: 'OnNewArb' | 'OnPresentService' | 'OnNewProgress' | 'OnNewOrder' | string;
    /** optional paging cursor */
    cursor?: EventCursor | null | undefined;
    /** maximum number of items per page, default to [QUERY_MAX_RESULT_LIMIT] if not specified. */
    limit?: number | null | undefined;
    /** query result ordering, default to false (ascending order), oldest record first. */
    order?: 'ascending' | 'descending' | null | undefined;
    session?: SessionOption;
}
export declare const query_events_json: (json: string) => Promise<string>;
export declare const query_events: (query: EventQuery) => Promise<EventAnswer | undefined>;
//# sourceMappingURL=events.d.ts.map