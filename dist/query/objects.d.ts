/**
 * Provide a query interface for AI
 *
 */
import { Machine_Node, Treasury_WithdrawMode, Treasury_Operation, Repository_Type, Repository_Policy_Mode, Repository_Policy, Service_Discount_Type, Service_Sale, History, Tags, DeGuardData, DeGuardConstant } from 'wowok';
import { CacheExpireType } from '../local/cache.js';
import { AccountOrMark_Address } from '../call/base.js';
import { SessionOption } from '../common.js';
export type ObjectBaseType = 'Demand' | 'Progress' | 'Service' | 'Machine' | 'Order' | 'Treasury' | 'Arbitration' | 'Arb' | 'Payment' | 'Guard' | 'Discount' | 'Personal' | 'Permission' | 'PersonalMark' | 'Repository' | 'TableItem_ProgressHistory' | 'TableItem_PermissionEntity' | 'TableItem_DemandPresenter' | 'TableItem_MachineNode' | 'TableItem_ServiceSale' | 'TableItem_TreasuryHistory' | 'TableItem_ArbVote' | 'TableItem_RepositoryData' | 'TableItem_PersonalMark' | 'Treasury_ReceivedObject';
export interface ObjectBase {
    object: string;
    type?: ObjectBaseType;
    type_raw?: string;
    owner?: any;
    version?: string;
    cache_expire?: CacheExpireType;
}
export interface Treasury_ReceivedObject extends ObjectBase {
    balance: string;
    payment: string;
}
export interface ObjectPermission extends ObjectBase {
    builder: string;
    admin: string[];
    description: string;
    entity_count: number;
    biz_permission: {
        id: number;
        name: string;
    }[];
}
export interface TableItem_PermissionEntity extends ObjectBase {
    entity: string;
    permission: {
        id: number;
        guard?: string | null;
    }[];
}
export interface ObjectDemand extends ObjectBase {
    permission: string;
    guard?: {
        object: string;
        service_id_in_guard?: number | null;
    } | null;
    description: string;
    time_expire: string;
    yes?: string | null;
    presenter_count: number;
    location: string;
    bounty: {
        object: string;
        balance: string;
        type: string;
    }[];
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
    namedOperator: {
        name: string;
        operator: string[];
    }[];
}
export interface TableItem_ProgressHistory extends ObjectBase {
    history: History;
}
export interface GuardWithPercent {
    guard: string;
    percent: number;
}
export interface ObjectService extends ObjectBase {
    permission: string;
    bPaused: boolean;
    bPublished: boolean;
    description: string;
    location: string;
    arbitration: string[];
    buy_guard?: string | null;
    endpoint?: string | null;
    extern_withdraw_treasury: string[];
    machine?: string | null;
    payee_treasury: string;
    repository: string[];
    sales_count: number;
    withdraw_guard: GuardWithPercent[];
    refund_guard: GuardWithPercent[];
    customer_required_info?: {
        pubkey: string;
        required_info: string[];
    };
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
    required_info?: {
        pubkey: string;
        msg_encrypted: string;
    };
    item: Service_Sale[];
    time: string;
}
export interface GuardWithAmount {
    guard: string;
    max_withdrawal_amount: number | string | bigint;
}
export interface ObjectTreasury extends ObjectBase {
    permission: string;
    description: string;
    inflow: string;
    outflow: string;
    withdraw_mode: Treasury_WithdrawMode;
    withdraw_guard: GuardWithAmount[];
    deposit_guard?: string | null;
    balance: string;
    history_count: number;
}
export interface TableItem_TreasuryHistory extends ObjectBase {
    id: number;
    operation: Treasury_Operation;
    signer: string;
    payment: string;
    amount: string;
    time: string;
}
export interface GuardWithWeight {
    guard: string;
    weights: number;
}
export interface ObjectArbitration extends ObjectBase {
    permission: string;
    description: string;
    location: string;
    bPaused: boolean;
    endpoint?: string | null;
    fee: string;
    fee_treasury: string;
    usage_guard?: string | null;
    voting_guard: GuardWithWeight[];
}
export interface ObjectArb extends ObjectBase {
    arbitration: string;
    order: string;
    description: string;
    bWithdrawn: boolean;
    fee: string;
    feedback: string;
    indemnity?: string | null;
    proposition: {
        proposition: string;
        votes: string;
    };
    voted_count: number;
    time: string;
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
    guard: string | null;
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
    from?: string | null;
    biz_id: string;
    remark: string;
    signer: string;
    time: string;
    record: {
        recipient: string;
        amount: string;
    }[];
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
export interface GuardGraphData {
    root: DeGuardData;
    constants: DeGuardConstant[];
}
export interface ObjectGuard extends ObjectBase {
    description: string;
    input: Uint8Array;
    identifier: {
        id: number;
        bWitness: boolean;
        value: Uint8Array;
    }[];
    graph: GuardGraphData;
}
export interface ObjectPersonal extends ObjectBase {
    address: string;
    like: number;
    dislike: number;
    info: Map<string, string>;
    description: string;
    mark_object?: string | null;
    lastActive_digest?: string;
    time: string;
}
export interface ObjectMark extends ObjectBase {
    tag_count: number;
}
export interface TableItem_PersonalMark extends ObjectBase, Tags {
}
export interface ObjectsQuery {
    objects: string[];
    no_cache?: boolean;
    session?: SessionOption;
}
export interface PersonalQuery {
    address: AccountOrMark_Address;
    no_cache?: boolean;
    session?: SessionOption;
}
export interface ObjectsAnswer {
    objects?: ObjectBase[];
}
export interface TableQuery {
    parent: string;
    cursor?: string | null | undefined;
    limit?: number | null | undefined;
    no_cache?: boolean;
    session?: SessionOption;
}
export interface TableAnswerItem {
    key: {
        type: string;
        value: unknown;
    };
    object: string;
    version: string;
}
export interface TableAnswer {
    items: TableAnswerItem[];
    nextCursor: string | null;
    hasNextPage: boolean;
    cache_expire?: CacheExpireType;
}
export declare const query_objects_json: (json: string) => Promise<string>;
export declare const query_table_json: (json: string) => Promise<string>;
export declare const query_personal_json: (json: string) => Promise<string>;
export declare const query_objects: (query: ObjectsQuery) => Promise<ObjectsAnswer>;
export declare const query_personal: (query: PersonalQuery) => Promise<ObjectPersonal | undefined>;
export declare const query_table: (query: TableQuery) => Promise<TableAnswer>;
export interface QueryTableItem_Name {
    parent: string | ObjectService;
    name: string;
    no_cache?: boolean;
    session?: SessionOption;
}
export interface QueryTableItem_Index {
    parent: string | ObjectTreasury;
    index: string | number | bigint;
    no_cache?: boolean;
    session?: SessionOption;
}
export interface QueryTableItem_AddressName {
    parent: string | ObjectRepository;
    address: string | number | bigint;
    name: string;
    no_cache?: boolean;
    session?: SessionOption;
}
export interface QueryTableItem_Address {
    parent: string | ObjectDemand | ObjectPermission | ObjectArb | ObjectMark;
    address: string;
    no_cache?: boolean;
    session?: SessionOption;
}
export declare const queryTableItem_RepositoryData: (query: QueryTableItem_AddressName) => Promise<ObjectBase>;
export declare const queryTableItem_DemandService: (query: QueryTableItem_Address) => Promise<ObjectBase>;
export declare const queryTableItem_PermissionEntity: (query: QueryTableItem_Address) => Promise<ObjectBase>;
export declare const queryTableItem_ArbVoting: (query: QueryTableItem_Address) => Promise<ObjectBase>;
export declare const queryTableItem_MachineNode: (query: QueryTableItem_Name) => Promise<ObjectBase>;
export declare const queryTableItem_ServiceSale: (query: QueryTableItem_Name) => Promise<ObjectBase>;
export declare const queryTableItem_ProgressHistory: (query: QueryTableItem_Index) => Promise<ObjectBase>;
export declare const queryTableItem_TreasuryHistory: (query: QueryTableItem_Index) => Promise<ObjectBase>;
export declare const queryTableItem_MarkTag: (query: QueryTableItem_Address) => Promise<ObjectBase>;
export declare function raw2type(type_raw: string | undefined): ObjectBaseType | undefined;
export declare function data2object(data?: any): ObjectBase;
//# sourceMappingURL=objects.d.ts.map