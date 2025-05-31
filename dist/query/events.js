/**
 * Provide AI with Basic WoWok event queries:
 * for real-time detail tracking.
 */
import { Protocol } from 'wowok';
export const query_events_json = async (json) => {
    try {
        const q = JSON.parse(json);
        return JSON.stringify({ data: await query_events(q) });
    }
    catch (e) {
        return JSON.stringify({ error: e?.toString() });
    }
};
export const query_events = (query) => {
    const type = query.type.toLowerCase();
    if (type.includes('arb') || type.includes('arbitration')) {
        return newArbEvents(query.cursor, query.limit, query.order);
    }
    else if (type.includes('present') || type.includes('demand')) {
        return newProgressEvents(query.cursor, query.limit, query.order);
    }
    else if (type.includes('progress') || type.includes('machine')) {
        return presentServiceEvents(query.cursor, query.limit, query.order);
    }
    else if (type.includes('order') || type.includes('service')) {
        return newOrderEvents(query.cursor, query.limit, query.order);
    }
    else {
        return Promise.resolve(undefined);
    }
};
const newArbEvents = async (cursor, limit, order) => {
    return await events(Protocol.Instance().package('wowok') + '::arb::NewArbEvent', cursor, limit, order);
};
const presentServiceEvents = async (cursor, limit, order) => {
    return await events(Protocol.Instance().package('wowok') + '::demand::PresentEvent', cursor, limit, order);
};
const newProgressEvents = async (cursor, limit, order) => {
    return await events(Protocol.Instance().package('wowok') + '::progress::NewProgressEvent', cursor, limit, order);
};
const newOrderEvents = async (cursor, limit, order) => {
    return await events(Protocol.Instance().package('wowok') + '::order::NewOrderEvent', cursor, limit, order);
};
const events = async (type, cursor, limit, order) => {
    const res = await Protocol.Client().queryEvents({ query: { MoveEventType: type }, cursor: cursor, limit: limit, order: order });
    const data = res?.data?.map((v) => {
        if (v?.packageId === Protocol.Instance().package('wowok')) {
            if (v?.type?.includes('::order::NewOrderEvent')) {
                return {
                    id: v?.id, time: v?.timestampMs, type_raw: v?.type, sender: v?.sender, type: 'NewOrderEvent',
                    order: v?.parsedJson?.object, service: v?.parsedJson?.service, progress: v?.parsedJson?.progress, amount: v?.parsedJson?.amount
                };
            }
            else if (v?.type?.includes('::demand::PresentEvent')) {
                return {
                    id: v?.id, time: v?.timestampMs, type_raw: v?.type, sender: v?.sender, type: 'NewOrderEvent',
                    demand: v?.parsedJson?.object, service: v?.parsedJson?.service, recommendation: v?.parsedJson?.tips
                };
            }
            else if (v?.type?.includes('::progress::NewProgressEvent')) {
                return {
                    id: v?.id, time: v?.timestampMs, type_raw: v?.type, sender: v?.sender, type: 'NewOrderEvent',
                    progress: v?.parsedJson?.object, machine: v?.parsedJson?.machine, task: v?.parsedJson?.task
                };
            }
            else if (v?.type?.includes('::arb::NewArbEvent')) {
                return {
                    id: v?.id, time: v?.timestampMs, type_raw: v?.type, sender: v?.sender, type: 'NewOrderEvent',
                    arb: v?.parsedJson?.object, arbitration: v?.parsedJson?.arbitration, order: v?.parsedJson?.order
                };
            }
            else if (v?.type?.includes('::entity::NewEntityEvent')) {
                return {
                    id: v?.id, time: v?.timestampMs, type_raw: v?.type, sender: v?.sender, type: 'NewOrderEvent',
                    resource: v?.parsedJson?.resource?.some, address: v?.parsedJson?.target,
                };
            }
        }
        return { id: v?.id, time: v?.timestampMs, type_raw: v?.type, sender: v?.sender, type: '', };
    });
    return { data: data, hasNextPage: res?.hasNextPage, nextCursor: res?.nextCursor };
};
//# sourceMappingURL=events.js.map