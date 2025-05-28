
/**
 * Provide AI with Basic WoWok event queries: 
 * for real-time detail tracking.
 */

import { Protocol } from 'wowok';

export interface EventBase {
    id: {eventSeq: string; txDigest: string};
    sender: string;
    type: string | 'NewArbEvent' | 'NewOrderEvent' | 'NewProgressEvent' | 'PresentServiceEvent';
    type_raw: string;
    time: string;
}

export interface NewArbEvent extends EventBase {
    arb: string,
    arbitration: string,
    order: string,
}

export interface NewOrderEvent extends EventBase {
    order: string,
    service: string,
    progress?: string | null,
    amount: string,
}

export interface NewProgressEvent extends EventBase {
    progress: string,
    machine: string,
    task?: string | null,
}

export interface PresentServiceEvent extends EventBase {
    demand: string,
    service: string,
    recommendation: string,
}

export interface NewEntityEvent extends EventBase {
    resource: string,
    address: string,
}
export interface EventAnswer {
    data: EventBase[];
    hasNextPage: boolean;
    nextCursor?: {eventSeq: string; txDigest: string} | null;
}

export interface EventCursor {
    eventSeq: string; 
    txDigest: string
}
export interface EventQuery {
    type: 'OnNewArb' | 'OnPresentService' | 'OnNewProgress' | 'OnNewOrder' |  string;
    /** optional paging cursor */
    cursor?: EventCursor | null | undefined;
    /** maximum number of items per page, default to [QUERY_MAX_RESULT_LIMIT] if not specified. */
    limit?: number | null | undefined;
    /** query result ordering, default to false (ascending order), oldest record first. */
    order?: 'ascending' | 'descending' | null | undefined;
}

export const query_events_json = async (json:string) : Promise<string> => {
    try {
        const q : EventQuery = JSON.parse(json);
        return JSON.stringify({data:await query_events(q)});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}

export const query_events = (query: EventQuery) : Promise<EventAnswer | undefined> => {
    const type = query.type.toLowerCase();
    if (type.includes('arb') || type.includes('arbitration')) {
        return newArbEvents(query.cursor, query.limit, query.order)
    } else if (type.includes('present') || type.includes('demand')) {
        return newProgressEvents(query.cursor, query.limit, query.order)
    } else if (type.includes('progress') || type.includes('machine')) {
        return presentServiceEvents(query.cursor, query.limit, query.order)
    } else if (type.includes('order') || type.includes('service')) {
        return newOrderEvents(query.cursor, query.limit, query.order)
    } else {
        return Promise.resolve(undefined);
    }
}

const newArbEvents = async(cursor?: EventCursor | null, limit?: number | null, order?: 'ascending' | 'descending' | null) : Promise<EventAnswer> => {
    return await events(Protocol.Instance().package('wowok') + '::arb::NewArbEvent', cursor, limit, order)
}
const presentServiceEvents = async(cursor?: EventCursor | null, limit?: number | null, order?: 'ascending' | 'descending' | null) : Promise<EventAnswer> => {
    return await events(Protocol.Instance().package('wowok') + '::demand::PresentEvent', cursor, limit, order)
}
const newProgressEvents = async(cursor?: EventCursor | null, limit?: number | null, order?: 'ascending' | 'descending' | null) : Promise<EventAnswer> => {
    return await events(Protocol.Instance().package('wowok') + '::progress::NewProgressEvent', cursor, limit, order)
}
const newOrderEvents = async(cursor?: EventCursor | null, limit?: number | null, order?: 'ascending' | 'descending' | null) : Promise<EventAnswer> => {
    return await events(Protocol.Instance().package('wowok') + '::order::NewOrderEvent', cursor, limit, order)
}
const events = async(type:string, cursor?: EventCursor | null, limit?: number | null, order?: 'ascending' | 'descending' | null) : Promise<EventAnswer> => {
    const res = await Protocol.Client().queryEvents({query:{MoveEventType:type}, cursor:cursor, limit:limit, order:order});
    const data = res?.data?.map((v:any) => {
        if (v?.packageId === Protocol.Instance().package('wowok')) {
            if (v?.type?.includes('::order::NewOrderEvent')) {
                return {
                    id: v?.id, time: v?.timestampMs, type_raw:v?.type, sender:v?.sender, type:'NewOrderEvent',
                    order: v?.parsedJson?.object, service: v?.parsedJson?.service, progress: v?.parsedJson?.progress, amount: v?.parsedJson?.amount
                } as NewOrderEvent
            } else if (v?.type?.includes('::demand::PresentEvent')) {
                return {
                    id: v?.id, time: v?.timestampMs, type_raw:v?.type, sender:v?.sender, type:'NewOrderEvent',
                    demand:v?.parsedJson?.object, service: v?.parsedJson?.service, recommendation:v?.parsedJson?.tips
                } as PresentServiceEvent
            } else if (v?.type?.includes('::progress::NewProgressEvent')) {
                return {
                    id: v?.id, time: v?.timestampMs, type_raw:v?.type, sender:v?.sender, type:'NewOrderEvent',
                    progress:v?.parsedJson?.object, machine: v?.parsedJson?.machine, task:v?.parsedJson?.task
                } as NewProgressEvent
            } else if (v?.type?.includes('::arb::NewArbEvent')) {
                return {
                    id: v?.id, time: v?.timestampMs, type_raw:v?.type, sender:v?.sender, type:'NewOrderEvent',
                    arb:v?.parsedJson?.object, arbitration:v?.parsedJson?.arbitration, order:v?.parsedJson?.order
                } as NewArbEvent
            } else if (v?.type?.includes('::entity::NewEntityEvent')) {
                return {
                    id: v?.id, time: v?.timestampMs, type_raw:v?.type, sender:v?.sender, type:'NewOrderEvent',
                    resource:v?.parsedJson?.resource?.some, address:v?.parsedJson?.target, 
                } as NewEntityEvent
            }
        }
        return {id: v?.id, time: v?.timestampMs, type_raw:v?.type, sender:v?.sender, type:'',}
    })
    return {data:data, hasNextPage:res?.hasNextPage, nextCursor:res?.nextCursor}
}
