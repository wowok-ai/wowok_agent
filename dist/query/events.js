/**
 * Provide AI with Basic WoWok event queries:
 * for real-time detail tracking.
 */
import { session_resolve } from '../common.js';
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
export const query_events = async (query) => {
    const type = query.type.toLowerCase();
    let e = '';
    if (type.includes('arb') || type.includes('arbitration')) {
        e = Protocol.Instance().package('base_origin') + '::arb::NewArbEvent';
    }
    else if (type.includes('present') || type.includes('demand')) {
        e = Protocol.Instance().package('base_origin') + '::demand::PresentEvent';
    }
    else if (type.includes('progress') || type.includes('machine')) {
        e = Protocol.Instance().package('base_origin') + '::progress::NewProgressEvent';
    }
    else if (type.includes('order') || type.includes('service')) {
        e = Protocol.Instance().package('base_origin') + '::order::NewOrderEvent';
    }
    if (e) {
        return await events(e, query);
    }
};
const events = async (type, query) => {
    const res = await Protocol.Client(await session_resolve(query.session))
        .queryEvents({ query: { MoveEventType: type }, cursor: query.cursor, limit: query.limit, order: query.order });
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
            else if (v?.type?.includes('::entity::NewEntityEvent')) { //@ .some
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