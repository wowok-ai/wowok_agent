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
    QUERY_TREASURY_RECEIVED = "treasury_received_query",
    QUERY_LOCAL = "local_query",
    QUERY_TABLE_ITEM = "table_item_query",
    QUERY_WOWOK_PROTOCOL = "wowok_protocol"
}
//# sourceMappingURL=util.d.ts.map