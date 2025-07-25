import { CallResult } from "../call/base.js";
import { ObjectBaseType } from "../query/objects.js";
/**
 * Parses URL parameters and converts them to specified types (supports automatic conversion of strings, numbers, arrays, etc.)
 * @param url - The full URL or query parameter string
 * @returns Parsed parameter objects (generic T)
 */
export declare function parseUrlParams<T extends Record<string, any>>(url: string): T;
export declare enum ToolName {
    QUERY_OBJECTS = "objects_query",
    QUERY_EVENTS = "events_query",
    QUERY_PERMISSIONS = "permissions_query",
    QUERY_PERSONAL = "presonal_information_query",
    QUERY_LOCAL_MARK_LIST = "local_marks_list",
    QUERY_LOCAL_INFO_LIST = "local_information_list",
    QUERY_ACCOUNT_LIST = "local_accounts_list",
    QUERY_LOCAL_MARK_FILTER = "local_mark_filter",
    QUERY_LOCAL_MARK = "local_mark_query",
    QUERY_LOCAL_INFO = "local_info_query",
    QUERY_ACCOUNT = "local_account_query",
    OP_PERSONAL = "personal_operations",
    OP_MACHINE = "machine_operations",
    OP_SERVICE = "service_operations",
    OP_PERMISSION = "permission_operations",
    OP_TREASURY = "treasury_operations",
    OP_ARBITRATION = "arbitration_operations",
    OP_REPOSITORY = "repository_operations",
    OP_GUARD = "guard_operations",
    OP_DEMAND = "demand_operations",
    OP_REPLACE_PERMISSION_OBJECT = "replace_permission_object",
    OP_ACCOUNT = "local_account_operations",
    OP_LOCAL_MARK = "local_mark_operations",
    OP_LOCAL_INFO = "local_info_operations",
    QUERY_TABLE_ITEMS_LIST = "table_items_list",
    QUERY_ARB_VOTING = "arb_table_item_query",
    QUERY_DEMAND_SERVICE = "demand_table_item_query",
    QUERY_PERMISSION_ENTITY = "permission_table_item_query",
    QUERY_MACHINE_NODE = "machine_table_item_query",
    QUERY_SERVICE_SALE = "service_table_item_query",
    QUERY_PROGRESS_HISTORY = "progress_table_item_query",
    QUERY_TREASURY_HISTORY = "treasury_table_item_query",
    QUERY_REPOSITORY_DATA = "repository_table_item_query",
    QUERY_PERSONAL_MARK = "personalmark_table_item_query",
    QUERY_RECEIVED = "received_query",
    QUERY_LOCAL = "local_query",
    QUERY_TABLE_ITEM = "table_item_query",
    QUERY_WOWOK_PROTOCOL = "wowok_protocol"
}
export declare enum PromptName {
    ARBITRATION_NEW = "Create a new Arbitration object",
    ARBITRATION_OP = "Operate an existing Arbitration object"
}
export declare const ObjectUrl: (id: string | undefined) => string | undefined;
export declare const BaseTypeFilter: (type?: ObjectBaseType) => boolean;
export declare const ObjectOperationResult: (r: CallResult) => string;
export declare const PermissionModules: () => string[];
export declare const GuardQueryModules: () => string[];
export declare const NoticeFieldsOrder = "Notice:The fields within each tool's parameters are independent and are executed in the order defined by the schema. \n    If the requirements of this tool's invocation have a field sequence relationship, but it does not conform to the sequence of fields in the parameter schema (for example, the requirement is to set up Guard for purchase first, and then make the purchase; but the sequence of fields in the schema is purchase first, and setting Guard for purchase second), then it needs to be decomposed into multiple sub-tool invocations (for example, setting up Guard for purchase is the first tool invocation, and the purchase is the second tool invocation).";
export declare const schemaToPromptArguments: (schema: any) => Array<{
    name: string;
    description: string;
    type: string;
    required: boolean;
    properties?: any;
}>;
//# sourceMappingURL=util.d.ts.map