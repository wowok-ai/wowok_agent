/**
 * Provide a query interface for AI
 * 
 */

import { Protocol, Machine_Node, Machine, Treasury_WithdrawMode, Treasury_Operation,
    Repository_Type, Repository_Policy_Mode, Repository_Policy, Service_Discount_Type, Service_Sale,
    Progress, History, ERROR, Errors, IsValidAddress, Bcs, Entity_Info, Tags } from 'wowok';
import {WowokCache, OBJECT_KEY, CacheExpire, CacheName, CachedData} from './cache'

export type ObjectBaseType = 'Demand' | 'Progress' | 'Service' | 'Machine' | 'Order' | 'Treasury' | 'Arbitration' | 'Arb' | 'Payment' | 'Guard' | 'Discount' |
        'Personal' | 'Permission' | 'PersonalMark' | 'Repository' | 'TableItem_ProgressHistory' | 'TableItem_PermissionEntity' | 
        'TableItem_DemandPresenter' | 'TableItem_MachineNode' | 'TableItem_ServiceSale' | 'TableItem_TreasuryHistory' | 'TableItem_ArbVote' |
        'TableItem_RepositoryData' | 'TableItem_PersonalMark';

export interface ObjectBase {
    object: string;
    type?: ObjectBaseType;
    type_raw?: string;
    owner?: any;
    version?: string;
    cache_expire?: CacheExpire;
}

export interface ObjectPermission extends ObjectBase {
    builder: string;
    admin: string[];
    description: string;
    entity_count: number;
    biz_permission: {id:number; name:string}[];
}

export interface TableItem_PermissionEntity extends ObjectBase {
    entity: string;
    permission: {id:number; guard?:string|null}[];
}

export interface ObjectDemand extends ObjectBase {
    permission: string;
    guard?: {object:string; service_id_in_guard?:number|null} | null;
    description: string;
    time_expire: string;
    yes?: string | null;
    presenter_count: number;
    bounty: {object:string; balance:string; type:string}[];
}

export interface TableItem_DemandPresenter extends ObjectBase {
    service: string;
    presenter: string;
    recommendation: string;
}

export interface ObjectMachine extends ObjectBase {
    permission: string;
    bPaused: boolean;
    bPublished: boolean;
    consensus_repository: string[];
    description: string;
    endpoint?: string | null;
    node_count: number;
}

export interface TableItem_MachineNode extends ObjectBase {
    node: Machine_Node;
}

export interface ObjectProgressHolder {
    forward_name: string;
    holder?: string | null;
    orders: string[];
    msg: string;
    accomplished: boolean;
    time: string;
}

export interface ObjectProgressSession {
    forward: ObjectProgressHolder[];
    weights: number;
    threshold: number;
    next_node: string;
}

export interface ObjectProgress extends ObjectBase {
    machine: string;
    current: string;
    context_repository?: string | null;
    parent?: string | null;
    task?: string | null;
    session: ObjectProgressSession[];
    history_count: number;
    namedOperator: {name:string, operator:string[]}[];
}

export interface TableItem_ProgressHistory extends ObjectBase {
    history: History;
}

export interface ObjectService extends ObjectBase {
    permission: string;
    bPaused: boolean;
    bPublished: boolean;
    description: string;
    arbitration: string[];
    buy_guard?: string | null;
    endpoint?: string | null;
    extern_withdraw_treasury: string[];
    machine?: string | null;
    payee: string;
    repository: string[];
    sales_count: number;
    withdraw_guard: {guard:string, percent:number}[];
    refund_guard: {guard:string, percent:number}[];
    customer_required_info?: {pubkey:string; required_info:string[]};
}

export interface TableItem_ServiceSale extends ObjectBase {
    item: Service_Sale;
}
export interface ObjectOrder extends ObjectBase {
    service: string;
    amount: string;
    balance: string;
    payer: string;
    arb: string[];
    agent: string[];
    progress?: string | null;
    discount?: string | null;
    required_info?: {pubkey:string; msg_encrypted:string};
    item: Service_Sale[];
}

export interface ObjectTreasury extends ObjectBase {
    permission: string;
    description: string;
    inflow: string;
    outflow: string;
    withdraw_mode: Treasury_WithdrawMode;
    withdraw_guard: {guard:string, percent:number}[];
    deposit_guard?: string | null;
    balance: string;
    history_count: number;
}
export interface TableItem_TreasuryHistory extends ObjectBase {
    id: number,
    operation: Treasury_Operation,
    signer: string,
    payment: string,
    amount: string,
    time: string,
}
export interface ObjectArbitration extends ObjectBase {
    permission: string;
    description: string;
    bPaused: boolean;
    endpoint?: string | null;
    fee: string;
    fee_treasury: string;
    usage_guard?: string | null;
    voting_guard: {guard:string, weights:number}[];
}

export interface ObjectArb extends ObjectBase {
    arbitration: string;
    order: string;
    description: string;
    bWithdrawn: boolean;
    fee: string;
    feedback: string;
    indemnity?: string | null;
    proposition: {proposition:string, votes:string};
    voted_count: number;
}
export interface TableItem_ArbVote extends ObjectBase {
    singer: string;
    vote: number[];
    weight: string;
    time: string;
}
export interface ObjectRepository extends ObjectBase {
    permission: string;
    description: string;
    policy_mode: Repository_Policy_Mode;
    rep_type: Repository_Type;
    reference: string[];
    policy: Repository_Policy[];
    data_count: number;
}
export interface TableItem_RepositoryData extends ObjectBase {
    address: string;
    key: string;
    data: Uint8Array;
}
export interface ObjectPayment extends ObjectBase {
    amount: string;
    for_guard?: string | null;
    for_object?: string | null;
    from ?: string | null;
    biz_id: string;
    remark: string;
    signer: string;
    time: string;
    record: {recipient:string; amount:string}[];
}
export interface ObjectDiscount extends ObjectBase {
    service: string;
    name: string;
    off_type: Service_Discount_Type;
    price_greater?: string | null;
    off: string;
    time_start: string;
    time_end: string;
}

export interface ObjectGuard extends ObjectBase {
    description: string;
    input: Uint8Array;
    identifier: {id:number; bWitness:boolean; value:Uint8Array}[];
}
export interface ObjectPersonal extends ObjectBase {
    address: string; 
    like: number;
    dislike: number;
    info: Entity_Info;
    mark_object?: string | null; // ObjectMark & TableItem_MarkTag
    lastActive_digest?: string; 
}

export interface ObjectMark extends ObjectBase {
    tag_count: number;
}

export interface TableItem_PersonalMark extends ObjectBase, Tags {
}

export enum CacheType {
    localStorage = 'localStorage', // for explorer
    memoryStorage = 'memoryStorage', // for console
}

const MEMORY_STORAGE = new Map<string, string>();
export interface ObjectsQuery {
    objects: string[];
    showType?: boolean;
    showContent?: boolean;
    showOwner?: boolean;
    no_cache?: boolean;
}

export interface PersonalQuery {
    address: string;
    no_cache?: boolean;
}
export interface ObjectsAnswer {
    objects?: ObjectBase[];
    error?: string;
}

export interface TableQuery {
    parent: string;
    cursor?: string | null | undefined;
    limit?: number | null | undefined;
}
export interface TableAnswerItem {
    key: {type:string; value:unknown};
    object: string;
    version: string;
}
export interface TableAnswer {
    items: TableAnswerItem[];
    nextCursor: string | null;
    hasNextPage: boolean;
}

interface TableItemQuery {
    parent: string;
    key: {type:string, value:unknown};
}

/* json: ObjectsQuery string; return ObjectsAnswer */
export const query_objects_json = async (json:string) : Promise<string> => {
    try {
        const q : ObjectsQuery = JSON.parse(json);
        return JSON.stringify({data:await query_objects(q)});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}

/* json: TableQuery string; return TableAnswer */
export const query_table_json = async (json:string) : Promise<string> => {
    try {
        const q : TableQuery = JSON.parse(json);
        return JSON.stringify({data:await query_table(q)});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}

// query personal information; json: ObjectsAnswer; return ObjectPersonal | undefined .
export const query_personal_json = async (json:string) : Promise<string> => {
    try {
        const q : PersonalQuery = JSON.parse(json);
        return JSON.stringify({data:(await queryTableItem_Personal(q) ?? '')});
    } catch (e) {
        return JSON.stringify({error:e?.toString()})
    }
}

export const query_objects = async (query: ObjectsQuery) : Promise<ObjectsAnswer> => {
    var ret:ObjectBase[] = []; const pending : string[] = [];
    const time = new Date().getTime();
    const cache = WowokCache.Instance().get(CacheName.object);
    if (cache) {
        for (let i = 0; i < query.objects.length; ++i) {
            try {
                let data = cache.load(OBJECT_KEY(query.objects[i], CacheName.object))
                
                if (data) {
                    const r:CachedData = JSON.parse(data);

                    if (r?.expire !== 'INFINITE' && (query?.no_cache || r.expire <= time) && (query.showOwner || query.showContent)) { //@ type immutable
                        pending.push(query.objects[i]);
                    } else {
                        const d = data2object(JSON.parse(r.data));
                        d.cache_expire = r.expire;
                        ret.push(d);                              
                    }
                }                 
            } catch (e) {
                console.log(e)
            }
            pending.push(query.objects[i]);
        }
    } 

    if (pending.length > 0) {
        const res = await Protocol.Client().multiGetObjects({ids:[...pending], 
            options:{showContent:query.showContent, showType:query.showType, showOwner:query.showOwner}});
        const cache = WowokCache.Instance().get(CacheName.object);
        
        if (cache) {
            const now = new Date().getTime(); 
            res.forEach((i) => { // save
                try {
                    if (i?.data) {
                        const type_raw:string | undefined = i.data?.type ?? ((i.data?.content as any)?.type ?? undefined);
                        const type:string | undefined = type_raw ? Protocol.Instance().object_name_from_type_repr(type_raw) : undefined;
                        const expire = (type === 'Guard' || type === 'Payment') ? 'INFINITE' : (cache.expire_time()+now); // guard & payment immutable
                        const r:CachedData = {expire:expire, data:JSON.stringify(i.data)}
                        cache.save(OBJECT_KEY(i.data.objectId, CacheName.object), JSON.stringify(r));
                    }                            
                } catch(e) { console.log(e) }
            })                
        }
        ret = ret.concat(res.map(v=>data2object(v?.data)));
    } 
    return {objects:ret}
}

export const queryTableItem_Personal = async (query:PersonalQuery) : Promise<ObjectPersonal | undefined> => {
    if (!IsValidAddress(query.address))  ERROR(Errors.IsValidAddress, 'entity.address')
    const time = new Date().getTime();
    const cache = WowokCache.Instance().get(CacheName.personal);

    if (cache && !query.no_cache) {
        try {
            let data = cache.load(OBJECT_KEY(query.address, CacheName.personal))
            
            if (data) {
                const r:CachedData = JSON.parse(data);
                if (r?.expire === 'INFINITE' || r.expire <= time) { 
                    const d = JSON.parse(r.data) as ObjectPersonal;
                    d.cache_expire = r.expire;  
                    return d;                         
                }
            }                 
        } catch (e) {
            console.log(e)
        }
    } 
    const res = await tableItem(tableItemQuery_byAddress(Protocol.Instance().objectEntity(), query.address));
    if (res.type === 'Personal') {
        if (cache) {
            try {
                const expire = cache.expire_time()+((new Date()).getTime()); // guard & payment immutable
                const r:CachedData = {expire:expire, data:JSON.stringify(res)}
                cache.save(OBJECT_KEY(query.address, CacheName.personal), JSON.stringify(r));
                res.cache_expire = expire;
            } catch(e) { console.log(e)}               
        }
        return res as ObjectPersonal;
    }
}

export const query_table = async (query:TableQuery) : Promise<TableAnswer> => {
    const res = await Protocol.Client().getDynamicFields({parentId:query.parent, cursor:query.cursor, limit:query.limit});
    return {items:res?.data?.map(v=>{
        return {object:v.objectId, type:v.type, version:v.version, key:{
            type:v.name.type, value:v.name.value
        }} 
    }), nextCursor:res.nextCursor, hasNextPage:res.hasNextPage}
}

export const queryTableItem_DemandPresenter = async (demand_object:string | ObjectDemand, address:string) : Promise<ObjectBase> => {
    return await tableItem(tableItemQuery_byAddress(demand_object, address))
}
export const queryTableItem_PermissionEntity = async (permission_object:string | ObjectDemand, address:string) : Promise<ObjectBase> => {
    return await tableItem(tableItemQuery_byAddress(permission_object, address))
}
export const queryTableItem_ArbVote = async (arb_object:string | ObjectDemand, address:string) : Promise<ObjectBase> => {
    return await tableItem(tableItemQuery_byAddress(arb_object, address))
}
export const tableItemQuery_MachineNode = async (machine_object:string | ObjectMachine, name:string) : Promise<ObjectBase> => {
    return await tableItem(tableItemQuery_byString(machine_object, name))
}
export const tableItemQuery_ServiceSale = async (service_object:string | ObjectService, name:string) : Promise<ObjectBase> => {
    return await tableItem(tableItemQuery_byString(service_object, name))
}
export const tableItemQuery_ProgressHistory = async (progress_object:string | ObjectProgress, index:BigInt) : Promise<ObjectBase> => {
    return await tableItem(tableItemQuery_byU64(progress_object, index))
}
export const tableItemQuery_TreasuryHistory = async (treasury_object:string | ObjectTreasury, index:BigInt) : Promise<ObjectBase> => {
    return await tableItem(tableItemQuery_byU64(treasury_object, index))
}
export const tableItemQuery_RepositoryData = async (repository_object:string | ObjectRepository, address:string, name:string) : Promise<ObjectBase> => {
    if (typeof(repository_object) !== 'string') {
        repository_object = repository_object.object;
    }
    return await tableItem({parent:repository_object, key:{type:Protocol.Instance().package('wowok')+'::repository::DataKey', value:{id:address, key:name}}})
}
export const tableItemQuery_MarkTag = async (resource_object:string | ObjectMark, address:string) : Promise<ObjectBase> => {
    return await tableItem(tableItemQuery_byAddress(resource_object, address))
}

function tableItemQuery_byAddress(parent:string | ObjectDemand | ObjectPermission | ObjectArb | ObjectMark, address:string) : TableItemQuery {
    if (typeof(parent) !== 'string') {
        parent = parent.object;
    }
    return {parent:parent, key:{type:'address', value:address}};
}
function tableItemQuery_byString(parent:string | ObjectMachine | ObjectService, name:string) : TableItemQuery  {
    if (typeof(parent) !== 'string') {
        parent = parent.object;
    }
    return {parent:parent, key:{type:'0x1::string::String', value:name}};
}
function tableItemQuery_byU64 (parent:string | ObjectProgress | ObjectTreasury, index:BigInt) : TableItemQuery {
    if (typeof(parent) !== 'string') {
        parent = parent.object;
    }
    return {parent:parent, key:{type:'u64', value:index}};
}
const tableItem = async (query:TableItemQuery) : Promise<ObjectBase> => {
    const res = await Protocol.Client().getDynamicFieldObject({parentId:query.parent, name:{type:query.key.type, value:query.key.value}});
    return data2object(res?.data)
}

export function raw2type(type_raw:string | undefined) : ObjectBaseType | undefined {
    if (!type_raw) return undefined;

    const t = Protocol.Instance().object_name_from_type_repr(type_raw);
    if (t === 'Permission' || t === 'Demand' || t === 'Machine' || t === 'Progress' || t === 'Order' || t === 'Service' || 
        t === 'Treasury' || t === 'Arb' || t === 'Repository' || t === 'Payment' || t === 'Discount' || t === 'Guard') {
        return t
    } else if (t === 'Resource') {
        return 'PersonalMark';
    }
    const start = type_raw?.indexOf('0x2::dynamic_field::Field<');
    if (start === 0) {
        const end = type_raw?.substring('0x2::dynamic_field::Field<'.length);
        if(end && Protocol.Instance().hasPackage(end)) {
            if (end.includes('::demand::Tips>')) {
                return 'TableItem_DemandPresenter';
            } else if (end.includes('::machine::NodePair>>>')) {
                return 'TableItem_MachineNode';
            } else if (end.includes('::progress::History>')) {
                return 'TableItem_ProgressHistory';
            } else if (end.includes('::service::Sale>')) {
                return 'TableItem_ServiceSale';
            } else if (end.includes('::treasury::Record>')) {
                return 'TableItem_TreasuryHistory';
            } else if (end.includes('::arb::Voted>')) {
                return 'TableItem_ArbVote';
            } else if (end.includes('::permission::Perm>>')) {
                return 'TableItem_PermissionEntity';
            } else if (end.includes('::repository::DataKey')) {
                return 'TableItem_RepositoryData';
            } else if (end.includes('::entity::Ent>')) {
                return 'Personal';
            } else if (end.includes('::resource::Tags>')) {
                return 'TableItem_PersonalMark';
            }
        }
    }
    return undefined;
}

export function data2object(data?:any) : ObjectBase {
    const content = (data?.content as any)?.fields;
    const id = data?.objectId ?? (content?.id?.id ?? undefined);
    const type_raw:string | undefined = data?.type ?? (data?.content?.type ?? undefined);
    const version = data?.version ?? undefined;
    const owner = data?.owner ?? undefined;
    const type:string | undefined = raw2type(type_raw);

    if (type) {
        switch(type) {
        case 'Permission':
            return {object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                builder: content?.builder ??'', admin:content?.admin, description:content?.description??'',
                entity_count: parseInt(content?.table?.fields?.size), 
                biz_permission:content?.user_define?.fields?.contents?.map((v:any) => {
                    return {id:parseInt(v?.fields?.key), name:v?.fields?.value}
                })
            } as ObjectPermission;
        case 'Demand':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                permission: content?.permission, description:content?.description,
                guard:content?.guard ? {object:content?.guard, service_id_in_guard:content?.service_identifier}:undefined,
                time_expire:content?.time_expire, yes:content?.yes, 
                presenter_count:parseInt(content?.presenters?.fields?.size),
                bounty: content?.bounty?.map((v:any) => {
                    return {type:v?.fields?.type, object:v?.fields?.id?.id, balance:v?.fields?.balance}
                })
            } as ObjectDemand;
        case 'Machine':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                permission: content?.permission ?? '', description:content?.description??'',
                bPaused: content?.bPaused, bPublished:content?.bPublished, endpoint:content?.endpoint,
                consensus_repository:content?.consensus_repositories, node_count:parseInt(content?.nodes?.fields?.size),
            } as ObjectMachine;
        case 'Progress':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                machine: content?.machine, current: content?.current, task:content?.task,
                parent:content?.parent,  history_count:parseInt(content?.history?.fields?.contents?.fields?.size),
                namedOperator:content?.namedOperator?.fields?.contents?.map((v:any) => {
                    return {name:v?.fields?.key, operator:v?.fields?.value}
                }),
                session:content?.session?.fields?.contents?.map((v:any) => {
                    return {weights:v?.fields?.value?.fields?.weight, threshold:v?.fields?.value?.fields?.threshold,
                        next_node:v?.fields?.key, forward: v?.fields?.value?.fields?.forwards?.fields?.contents?.map((i:any) => {
                            return {forward_name:i?.fields?.key, accomplished:i?.fields?.value?.fields?.accomplished,
                                msg:i?.fields?.value?.fields?.msg, orders:i?.fields?.value?.fields?.orders, 
                                time:i?.fields?.value?.fields?.time, holder:i?.fields?.value?.fields?.who
                            }
                        })
                    }
                })
            } as ObjectProgress;
        case 'Order':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                service:content?.service, amount: content?.amount, agent:content?.agent, arb:content?.dispute, 
                payer:content?.payer, progress:content?.progress, discount:content?.discount, balance:content?.payed,
                required_info: content?.required_info ? 
                    {pubkey:content?.required_info?.fields?.customer_pub, msg_encrypted:content?.required_info?.fields?.info} 
                    : undefined,
                item : content?.items?.map((v:any) => {
                    return {name:v?.fields?.name, price:v?.fields?.price, stock:v?.fields?.stock, endpoint:v?.fields?.endpoint}
                }),
            } as ObjectOrder;
        case 'Service':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                machine:content?.machine, permission:content?.permission, description:content?.description,
                arbitration:content?.arbitrations, bPaused:content?.bPaused, bPublished:content?.bPublished,
                buy_guard:content?.buy_guard, endpoint:content?.endpoint, payee:content?.payee, repository:content?.repositories, 
                withdraw_guard:content?.withdraw_guard?.fields?.contents?.map((v:any) => {
                    return {object:v?.fields?.key, percent:v?.fields?.value}
                }),
                refund_guard:content?.refund_guard?.fields?.contents?.map((v:any) => {
                    return {object:v?.fields?.key, percent:v?.fields?.value}
                }),
                sales_count:parseInt(content?.sales?.fields?.size), extern_withdraw_treasury:content?.extern_withdraw_treasuries,
                customer_required_info:content?.customer_required ? 
                    {pubkey:content?.customer_required?.fields?.service_pubkey, required_info:content?.customer_required?.fields?.customer_required_info}
                    :undefined,
            } as ObjectService;
        case 'Treasury':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                permission:content?.permission, description:content?.description, withdraw_mode:content?.withdraw_mode,
                history_count:parseInt(content?.history?.fields?.contents?.fields?.size), balance: content?.balance, 
                deposit_guard:content?.deposit_guard, withdraw_guard:content?.withdraw_guard?.fields?.contents?.map((v:any) => {
                    return {object:v?.fields?.key, percent:v?.fields?.value}
                })
            } as ObjectTreasury;
        case 'Arbitration':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                permission:content?.permission, description:content?.description, fee:content?.fee,
                fee_treasury:content?.fee_treasury, usage_guard:content?.usage_guard,
                endpoint:content?.endpoint, bPaused:content?.bPaused, voting_guard:content?.voting_guard?.fields?.contents?.map((v:any) => {
                    return {object:v?.fields?.key, weights:v?.fields?.value}
                }) 
            } as ObjectArbitration;  
        case 'Arb':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                arbitration:content?.arbitration, description:content?.description, fee:content?.fee,
                feedback:content?.feedback, indemnity:content?.indemnity, order:content?.order,
                voted_count:parseInt(content?.voted?.fields?.size), 
                proposition:content?.proposition?.fields?.contents?.map((v:any) => {
                    return {proposition:v?.fields?.key, votes:v?.fields?.value}
                }) 
            } as ObjectArb;  
        case 'Repository':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                permission:content?.permission, description:content?.description, policy_mode:content?.policy_mode,
                data_count:parseInt(content?.data?.fields?.size), reference:content?.reference, rep_type:content?.type, 
                policy:content?.policies?.fields?.contents?.map((v:any) => {
                    return {key:v?.fields?.key, description:v?.fields?.value?.fields?.description, 
                        permissionIndex:v?.fields?.value?.fields?.permission_index, dataType:v?.fields?.value?.fields?.value_type}
                    })
            } as ObjectRepository;  
        case 'Payment':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                signer:content?.signer, time:content?.time, remark:content?.remark, from: content?.from,
                biz_id:content?.index, for_guard:content?.for_guard, for_object:content?.for_object,
                amount:content?.amount, record:content?.record?.map((v:any) => {
                    return {recipient:v?.fields?.recipient, amount:v?.fields?.amount}
                })
            } as ObjectPayment;  
        case 'Discount':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                service:content?.service, time_start:content?.time_start, time_end:content?.time_end, 
                price_greater:content?.price_greater, off_type:content?.type, off:content?.off,
                name:content?.name
            } as ObjectDiscount;   
        case 'Guard':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                description:content?.description, input:Uint8Array.from(content?.input?.fields?.bytes),
                identifier:content?.constants?.map((v:any) => {
                    return {id:v?.fields?.identifier, bWitness:v?.fields?.bWitness, value:Uint8Array.from(v?.fields?.value)}
                })
            } as ObjectGuard;  
        case 'PersonalMark' :
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                tag_count:parseInt(content?.tags?.fields?.size)
            } as ObjectMark;   
        case 'TableItem_DemandPresenter':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                service:content?.name, presenter:content?.value?.fields?.who, recommendation:content?.value?.fields?.tips
            } as TableItem_DemandPresenter;
        case 'TableItem_ProgressHistory':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                history:Progress.DeHistory(content)
            } as TableItem_ProgressHistory;
        case 'TableItem_ServiceSale':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                item:{item:content?.name, stock:content?.value?.fields?.stock, price:content?.value?.fields?.price,
                    endpoint:content?.value?.fields?.endpoint
                }
            } as TableItem_ServiceSale;
        case 'TableItem_TreasuryHistory':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                id: content?.name, payment:content?.value?.fields?.payment, signer:content?.value?.fields?.signer,
                operation: content?.value?.fields?.op, amount: content?.value?.fields?.amount, time:content?.value?.fields?.time
            } as TableItem_TreasuryHistory;
        case 'TableItem_ArbVote':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                singer:content?.name, vote:content?.value?.fields?.agrees, time: content?.value?.fields?.time,
                weight:content?.value?.fields?.weight
            } as TableItem_ArbVote;
        case 'TableItem_PermissionEntity':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                entity:content?.name, permission:content?.value?.map((v:any) => {
                    return {id:v?.fields.index, guard:v?.fields.guard}
                })
            } as TableItem_PermissionEntity;
        case 'TableItem_RepositoryData':
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                address:content?.name?.fields?.id, key:content?.name?.fields?.key, data:Uint8Array.from(content?.value)
            } as TableItem_RepositoryData;
        case 'Personal':
            const info = Bcs.getInstance().de_entInfo(Uint8Array.from(content?.value?.fields?.avatar));
            return {
                object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                address:content?.name, like:content?.value?.fields?.like, dislike:content?.value?.fields?.dislike, 
                mark_object: content?.value?.fields?.resource, lastActive_digest: data?.previousTransaction, 
                info : {homepage:info?.homepage, name:info?.name, avatar:info?.avatar, twitter:info?.twitter, discord:info?.discord, 
                description:info?.description}
            } as ObjectPersonal;
        case 'TableItem_PersonalMark':
            return {object:id, type:type, type_raw:type_raw, owner:owner, version:version,
                address:content?.name, name:content?.value?.fields?.nick, tags:content?.value?.fields?.tags
            } as TableItem_PersonalMark;
        }
    } 

    return {object:id, type:undefined, type_raw:type_raw, owner:owner, version:version}
}

