/**
 * Provide a query interface for AI
 *
 */
import { Protocol, Machine, Progress, ERROR, Errors, Bcs, uint2address, } from 'wowok';
import { CacheName, Cache } from '../local/cache.js';
import { LocalMark } from '../local/local.js';
import { GetAccountOrMark_Address } from '../call/base.js';
/* json: ObjectsQuery string; return ObjectsAnswer */
export const query_objects_json = async (json) => {
    try {
        const q = JSON.parse(json);
        return JSON.stringify({ data: await query_objects(q) });
    }
    catch (e) {
        return JSON.stringify({ error: e?.toString() });
    }
};
/* json: TableQuery string; return TableAnswer */
export const query_table_json = async (json) => {
    try {
        const q = JSON.parse(json);
        return JSON.stringify({ data: await query_table(q) });
    }
    catch (e) {
        return JSON.stringify({ error: e?.toString() });
    }
};
// query personal information; json: ObjectsAnswer; return ObjectPersonal | undefined .
export const query_personal_json = async (json) => {
    try {
        const q = JSON.parse(json);
        return JSON.stringify({ data: (await query_personal(q) ?? '') });
    }
    catch (e) {
        return JSON.stringify({ error: e?.toString() });
    }
};
export const query_objects = async (query) => {
    var ret = [];
    var pending = [];
    query.objects = await LocalMark.Instance().get_many_address2(query.objects);
    if (!query.no_cache) { // showType only, use cache
        for (let i = 0; i < query.objects.length; ++i) {
            try {
                const cache = await Cache.Instance().cache_get(query.objects[i], CacheName.object);
                if (cache) {
                    const d = data2object(JSON.parse(cache.data));
                    d.cache_expire = cache.expire;
                    ret.push(d);
                }
                else {
                    pending.push(query.objects[i]);
                }
                continue;
            }
            catch (e) { /*console.log(e)*/ }
            pending.push(query.objects[i]);
        }
    }
    else {
        pending = [...query.objects];
    }
    if (pending.length > 0) {
        const res = await Protocol.Client().multiGetObjects({ ids: [...pending],
            options: { showContent: true, showOwner: true } });
        for (let i = 0; i < res.length; ++i) {
            const d = res[i]?.data;
            if (d) {
                const type_raw = d?.type ?? (d?.content?.type ?? undefined);
                const type = type_raw ? Protocol.Instance().object_name_from_type_repr(type_raw) : undefined;
                const expire = Cache.ExpireTime(type === 'Guard' || type === 'Payment'); // guard & payment immutable
                await Cache.Instance().put(d.objectId, { expire: expire, data: JSON.stringify(d) }, CacheName.object); // save cache
            }
        }
        ret = ret.concat(res.map(v => data2object(v?.data)));
    }
    return { objects: ret };
};
export const query_personal = async (query) => {
    const addr = await GetAccountOrMark_Address(query?.address);
    if (!addr) {
        ERROR(Errors.InvalidParam, 'query_personal.address');
    }
    if (!query.no_cache) {
        try {
            const cache = await Cache.Instance().cache_get(addr, CacheName.personal);
            if (cache) {
                const d = JSON.parse(cache.data);
                d.cache_expire = cache.expire;
                return d;
            }
        }
        catch (e) { /*console.log(e)*/ }
    }
    const res = await tableItemQuery_byAddress({ parent: Protocol.Instance().objectEntity(), address: addr });
    if (res.type === 'Personal') {
        await Cache.Instance().put(addr, { expire: Cache.ExpireTime(), data: JSON.stringify(res) }, CacheName.personal);
        return res;
    }
};
export const query_table = async (query) => {
    const addr = await LocalMark.Instance().get_address(query.parent);
    if (!addr) {
        ERROR(Errors.InvalidParam, 'query_table.query.parent');
    }
    query.parent = addr;
    if (!query.no_cache) {
        try {
            const cache = await Cache.Instance().cache_get(query.parent, CacheName.table);
            if (cache) {
                const d = JSON.parse(cache.data);
                d.cache_expire = cache.expire;
                return d;
            }
        }
        catch (e) { /*console.log(e)*/ }
    }
    const res = await Protocol.Client().getDynamicFields({ parentId: query.parent, cursor: query.cursor, limit: query.limit });
    const r = { items: res?.data?.map(v => {
            return { object: v.objectId, type: v.type, version: v.version, key: {
                    type: v.name.type, value: v.name.value
                } };
        }), nextCursor: res.nextCursor, hasNextPage: res.hasNextPage };
    await Cache.Instance().put(query.parent, { expire: Cache.ExpireTime(), data: JSON.stringify(r) }, CacheName.table);
    return r;
};
const tableItem = async (query) => {
    const addr = await LocalMark.Instance().get_address(query.parent);
    if (!addr) {
        ERROR(Errors.InvalidParam, 'tableItem.query.parent');
    }
    query.parent = addr;
    if (!query.no_cache) {
        try {
            const cache = await Cache.Instance().cache_get(query.parent, CacheName.table);
            if (cache) {
                const d = JSON.parse(cache.data);
                d.cache_expire = cache.expire;
                return d;
            }
        }
        catch (e) { /*console.log(e)*/ }
    }
    const res = await Protocol.Client().getDynamicFieldObject({ parentId: query.parent, name: { type: query.key.type, value: query.key.value } });
    return data2object(res?.data);
};
export const queryTableItem_RepositoryData = async (query) => {
    const parent = typeof (query.parent) === 'string' ? query.parent : query.parent.object;
    if (typeof (query.address) !== 'string') {
        query.address = uint2address(query.address); // convert int to address
    }
    return await tableItem({ parent: parent, key: { type: Protocol.Instance().package('wowok') + '::repository::DataKey', value: { id: query.address, key: query.name } } });
};
export const queryTableItem_DemandService = async (query) => {
    return await tableItemQuery_byAddress(query);
};
export const queryTableItem_PermissionEntity = async (query) => {
    return await tableItemQuery_byAddress(query);
};
export const queryTableItem_ArbVoting = async (query) => {
    return await tableItemQuery_byAddress(query);
};
export const queryTableItem_MachineNode = async (query) => {
    return await tableItemQuery_byName(query);
};
export const queryTableItem_ServiceSale = async (query) => {
    return await tableItemQuery_byName(query);
};
export const queryTableItem_ProgressHistory = async (query) => {
    return await tableItemQuery_byIndex(query);
};
export const queryTableItem_TreasuryHistory = async (query) => {
    return await tableItemQuery_byIndex(query);
};
export const queryTableItem_MarkTag = async (query) => {
    return await tableItemQuery_byAddress(query);
};
const tableItemQuery_byAddress = async (query) => {
    const parent = typeof (query.parent) === 'string' ? query.parent : query.parent.object;
    return await tableItem({ parent: parent, key: { type: 'address', value: query.address }, no_cache: query.no_cache });
};
const tableItemQuery_byName = async (query) => {
    const parent = typeof (query.parent) === 'string' ? query.parent : query.parent.object;
    return await tableItem({ parent: parent, key: { type: '0x1::string::String', value: query.name }, no_cache: query.no_cache });
};
const tableItemQuery_byIndex = async (query) => {
    const parent = typeof (query.parent) === 'string' ? query.parent : query.parent.object;
    return await tableItem({ parent: parent, key: { type: 'u64', value: query.index }, no_cache: query.no_cache });
};
export function raw2type(type_raw) {
    if (!type_raw)
        return undefined;
    const t = Protocol.Instance().object_name_from_type_repr(type_raw);
    if (t === 'Permission' || t === 'Demand' || t === 'Machine' || t === 'Progress' || t === 'Order' || t === 'Service' ||
        t === 'Treasury' || t === 'Arb' || t === 'Repository' || t === 'Payment' || t === 'Discount' || t === 'Guard' || t === 'Arbitration') {
        return t;
    }
    else if (t === 'Resource') {
        return 'PersonalMark';
    }
    else if (t === 'CoinWrapper') {
        return 'Treasury_ReceivedObject';
    }
    const start = type_raw?.indexOf('0x2::dynamic_field::Field<');
    if (start === 0) {
        const end = type_raw?.substring('0x2::dynamic_field::Field<'.length);
        if (end && Protocol.Instance().hasPackage(end)) {
            if (end.includes('::demand::Tips>')) {
                return 'TableItem_DemandPresenter';
            }
            else if (end.includes('::machine::NodePair>>>')) {
                return 'TableItem_MachineNode';
            }
            else if (end.includes('::progress::History>')) {
                return 'TableItem_ProgressHistory';
            }
            else if (end.includes('::service::Sale>')) {
                return 'TableItem_ServiceSale';
            }
            else if (end.includes('::treasury::Record>')) {
                return 'TableItem_TreasuryHistory';
            }
            else if (end.includes('::arb::Voted>')) {
                return 'TableItem_ArbVote';
            }
            else if (end.includes('::permission::Perm>>')) {
                return 'TableItem_PermissionEntity';
            }
            else if (end.includes('::repository::DataKey')) {
                return 'TableItem_RepositoryData';
            }
            else if (end.includes('::entity::Ent>')) {
                return 'Personal';
            }
            else if (end.includes('::resource::Tags>')) {
                return 'TableItem_PersonalMark';
            }
        }
    }
    return undefined;
}
export function data2object(data) {
    const content = data?.content?.fields;
    const id = data?.objectId ?? (content?.id?.id ?? undefined);
    const type_raw = data?.type ?? (data?.content?.type ?? undefined);
    const version = data?.version ?? undefined;
    const owner = data?.owner ?? undefined;
    const type = raw2type(type_raw);
    if (type) {
        switch (type) {
            case 'Permission':
                return { object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    builder: content?.builder ?? '', admin: content?.admin, description: content?.description ?? '',
                    entity_count: parseInt(content?.table?.fields?.size),
                    biz_permission: content?.user_define?.fields?.contents?.map((v) => {
                        return { id: parseInt(v?.fields?.key), name: v?.fields?.value };
                    })
                };
            case 'Demand':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    permission: content?.permission, description: content?.description,
                    guard: content?.guard ? { object: content?.guard, service_id_in_guard: content?.service_identifier } : undefined,
                    time_expire: content?.time_expire, yes: content?.yes,
                    presenter_count: parseInt(content?.presenters?.fields?.size),
                    bounty: content?.bounty?.map((v) => {
                        return { type: v?.fields?.type, object: v?.fields?.id?.id, balance: v?.fields?.balance };
                    })
                };
            case 'Machine':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    permission: content?.permission ?? '', description: content?.description ?? '',
                    bPaused: content?.bPaused, bPublished: content?.bPublished, endpoint: content?.endpoint,
                    consensus_repository: content?.consensus_repositories, node_count: parseInt(content?.nodes?.fields?.size),
                };
            case 'Progress':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    machine: content?.machine, current: content?.current, task: content?.task,
                    parent: content?.parent, history_count: parseInt(content?.history?.fields?.contents?.fields?.size),
                    namedOperator: content?.namedOperator?.fields?.contents?.map((v) => {
                        return { name: v?.fields?.key, operator: v?.fields?.value };
                    }),
                    session: content?.session?.fields?.contents?.map((v) => {
                        return { weights: v?.fields?.value?.fields?.weight, threshold: v?.fields?.value?.fields?.threshold,
                            next_node: v?.fields?.key, forward: v?.fields?.value?.fields?.forwards?.fields?.contents?.map((i) => {
                                return { forward_name: i?.fields?.key, accomplished: i?.fields?.value?.fields?.accomplished,
                                    msg: i?.fields?.value?.fields?.msg, orders: i?.fields?.value?.fields?.orders,
                                    time: i?.fields?.value?.fields?.time, holder: i?.fields?.value?.fields?.who
                                };
                            })
                        };
                    })
                };
            case 'Order':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    service: content?.service, amount: content?.amount, agent: content?.agent, arb: content?.dispute,
                    payer: content?.payer, progress: content?.progress, discount: content?.discount, balance: content?.payed,
                    required_info: content?.required_info ?
                        { pubkey: content?.required_info?.fields?.customer_pub, msg_encrypted: content?.required_info?.fields?.info }
                        : undefined,
                    item: content?.items?.map((v) => {
                        return { name: v?.fields?.name, price: v?.fields?.price, stock: v?.fields?.stock, endpoint: v?.fields?.endpoint };
                    }),
                };
            case 'Service':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    machine: content?.machine, permission: content?.permission, description: content?.description,
                    arbitration: content?.arbitrations, bPaused: content?.bPaused, bPublished: content?.bPublished,
                    buy_guard: content?.buy_guard, endpoint: content?.endpoint, payee_treasury: content?.payee, repository: content?.repositories,
                    withdraw_guard: content?.withdraw_guard?.fields?.contents?.map((v) => {
                        return { object: v?.fields?.key, percent: v?.fields?.value };
                    }),
                    refund_guard: content?.refund_guard?.fields?.contents?.map((v) => {
                        return { object: v?.fields?.key, percent: v?.fields?.value };
                    }),
                    sales_count: parseInt(content?.sales?.fields?.size), extern_withdraw_treasury: content?.extern_withdraw_treasuries,
                    customer_required_info: content?.customer_required ?
                        { pubkey: content?.customer_required?.fields?.service_pubkey, required_info: content?.customer_required?.fields?.customer_required_info }
                        : undefined,
                };
            case 'Treasury':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    permission: content?.permission, description: content?.description, withdraw_mode: content?.withdraw_mode,
                    history_count: parseInt(content?.history?.fields?.contents?.fields?.size), balance: content?.balance,
                    deposit_guard: content?.deposit_guard, withdraw_guard: content?.withdraw_guard?.fields?.contents?.map((v) => {
                        return { object: v?.fields?.key, percent: v?.fields?.value };
                    })
                };
            case 'Arbitration':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    permission: content?.permission, description: content?.description, fee: content?.fee,
                    fee_treasury: content?.fee_treasury, usage_guard: content?.usage_guard,
                    endpoint: content?.endpoint, bPaused: content?.bPaused, voting_guard: content?.voting_guard?.fields?.contents?.map((v) => {
                        return { object: v?.fields?.key, weights: v?.fields?.value };
                    })
                };
            case 'Arb':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    arbitration: content?.arbitration, description: content?.description, fee: content?.fee,
                    feedback: content?.feedback, indemnity: content?.indemnity, order: content?.order,
                    voted_count: parseInt(content?.voted?.fields?.size),
                    proposition: content?.proposition?.fields?.contents?.map((v) => {
                        return { proposition: v?.fields?.key, votes: v?.fields?.value };
                    })
                };
            case 'Repository':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    permission: content?.permission, description: content?.description, policy_mode: content?.policy_mode,
                    data_count: parseInt(content?.data?.fields?.size), reference: content?.reference, rep_type: content?.type,
                    policy: content?.policies?.fields?.contents?.map((v) => {
                        return { key: v?.fields?.key, description: v?.fields?.value?.fields?.description,
                            permissionIndex: v?.fields?.value?.fields?.permission_index, dataType: v?.fields?.value?.fields?.value_type };
                    })
                };
            case 'Payment':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    signer: content?.signer, time: content?.time, remark: content?.remark, from: content?.from,
                    biz_id: content?.index, for_guard: content?.for_guard, for_object: content?.for_object,
                    amount: content?.amount, record: content?.record?.map((v) => {
                        return { recipient: v?.fields?.recipient, amount: v?.fields?.amount };
                    })
                };
            case 'Discount':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    service: content?.service, time_start: content?.time_start, time_end: content?.time_end,
                    price_greater: content?.price_greater, off_type: content?.type, off: content?.off,
                    name: content?.name
                };
            case 'Guard':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    description: content?.description, input: Uint8Array.from(content?.input?.fields?.bytes),
                    identifier: content?.constants?.map((v) => {
                        return { id: v?.fields?.identifier, bWitness: v?.fields?.bWitness, value: Uint8Array.from(v?.fields?.value) };
                    })
                };
            case 'PersonalMark':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    tag_count: parseInt(content?.tags?.fields?.size)
                };
            case 'TableItem_DemandPresenter':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    service: content?.name, presenter: content?.value?.fields?.who, recommendation: content?.value?.fields?.tips
                };
            case 'TableItem_ProgressHistory':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    history: Progress.DeHistory(content)
                };
            case 'TableItem_ServiceSale':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    item: { item: content?.name, stock: content?.value?.fields?.stock, price: content?.value?.fields?.price,
                        endpoint: content?.value?.fields?.endpoint
                    }
                };
            case 'TableItem_TreasuryHistory':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    id: content?.name, payment: content?.value?.fields?.payment, signer: content?.value?.fields?.signer,
                    operation: content?.value?.fields?.op, amount: content?.value?.fields?.amount, time: content?.value?.fields?.time
                };
            case 'TableItem_ArbVote':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    singer: content?.name, vote: content?.value?.fields?.agrees, time: content?.value?.fields?.time,
                    weight: content?.value?.fields?.weight
                };
            case 'TableItem_PermissionEntity':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    entity: content?.name, permission: content?.value?.map((v) => {
                        return { id: v?.fields.index, guard: v?.fields.guard };
                    })
                };
            case 'TableItem_RepositoryData':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    address: content?.name?.fields?.id, key: content?.name?.fields?.key, data: Uint8Array.from(content?.value)
                };
            case 'TableItem_MachineNode':
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    node: { name: content?.name, pairs: Machine.rpc_de_pair(content?.value) }
                };
            case 'Personal':
                const info = Bcs.getInstance().de_entInfo(Uint8Array.from(content?.value?.fields?.avatar));
                return {
                    object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    address: content?.name, like: content?.value?.fields?.like, dislike: content?.value?.fields?.dislike,
                    mark_object: content?.value?.fields?.resource, lastActive_digest: data?.previousTransaction,
                    info: { homepage: info?.homepage, name: info?.name, avatar: info?.avatar, twitter: info?.twitter, discord: info?.discord,
                        description: info?.description }
                };
            case 'TableItem_PersonalMark':
                return { object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    address: content?.name, name: content?.value?.fields?.nick, tags: content?.value?.fields?.tags
                };
            case 'Treasury_ReceivedObject':
                return { object: id, type: type, type_raw: type_raw, owner: owner, version: version,
                    balance: content.coin?.fields?.balance, payment: content?.payment
                };
        }
    }
    return { object: id, type: undefined, type_raw: type_raw, owner: owner, version: version };
}
//# sourceMappingURL=objects.js.map