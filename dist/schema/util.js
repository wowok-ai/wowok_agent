import * as WOWOK from "wowok";
/**
 * Parses URL parameters and converts them to specified types (supports automatic conversion of strings, numbers, arrays, etc.)
 * @param url - The full URL or query parameter string
 * @returns Parsed parameter objects (generic T)
 */
export function parseUrlParams(url) {
    const searchParams = new URLSearchParams(url.includes("?") ? url.split("?")[1] : url);
    const result = {};
    searchParams.forEach((value, key) => {
        if (value.toLowerCase() === "true" || value.toLowerCase() === "false") {
            result[key] = value.toLowerCase() === "true";
        }
        else if (value.includes(",")) {
            result[key] = value.split(",").map(item => decodeURIComponent(item));
        }
        else {
            if (WOWOK.IsValidAddress(value)) { //'0x...' address converts to string
                result[key] = decodeURIComponent(value);
            }
            else if (value === '' || value === null || value === undefined) {
                result[key] = "false";
            }
            else if (!isNaN(Number(value))) {
                result[key] = Number(value);
            }
            else {
                result[key] = decodeURIComponent(value);
            }
        }
    });
    return result;
}
export var ToolName;
(function (ToolName) {
    ToolName["QUERY_OBJECTS"] = "objects_query";
    ToolName["QUERY_EVENTS"] = "events_query";
    ToolName["QUERY_PERMISSIONS"] = "permissions_query";
    ToolName["QUERY_PERSONAL"] = "presonal_information_query";
    ToolName["QUERY_LOCAL_MARK_LIST"] = "local_marks_list";
    ToolName["QUERY_LOCAL_INFO_LIST"] = "local_information_list";
    ToolName["QUERY_ACCOUNT_LIST"] = "local_accounts_list";
    ToolName["QUERY_LOCAL_MARK_FILTER"] = "local_mark_filter";
    ToolName["QUERY_LOCAL_MARK"] = "local_mark_query";
    ToolName["QUERY_LOCAL_INFO"] = "local_info_query";
    ToolName["QUERY_ACCOUNT"] = "local_account_query";
    ToolName["OP_PERSONAL"] = "personal_operations";
    ToolName["OP_MACHINE"] = "machine_operations";
    ToolName["OP_SERVICE"] = "service_operations";
    ToolName["OP_PERMISSION"] = "permission_operations";
    ToolName["OP_TREASURY"] = "treasury_operations";
    ToolName["OP_ARBITRATION"] = "arbitration_operations";
    ToolName["OP_REPOSITORY"] = "repository_operations";
    ToolName["OP_GUARD"] = "guard_operations";
    ToolName["OP_DEMAND"] = "demand_operations";
    ToolName["OP_REPLACE_PERMISSION_OBJECT"] = "replace_permission_object";
    ToolName["OP_ACCOUNT"] = "local_account_operations";
    ToolName["OP_LOCAL_MARK"] = "local_mark_operations";
    ToolName["OP_LOCAL_INFO"] = "local_info_operations";
    ToolName["QUERY_TABLE_ITEMS_LIST"] = "table_items_list";
    ToolName["QUERY_ARB_VOTING"] = "arb_table_item_query";
    ToolName["QUERY_DEMAND_SERVICE"] = "demand_table_item_query";
    ToolName["QUERY_PERMISSION_ENTITY"] = "permission_table_item_query";
    ToolName["QUERY_MACHINE_NODE"] = "machine_table_item_query";
    ToolName["QUERY_SERVICE_SALE"] = "service_table_item_query";
    ToolName["QUERY_PROGRESS_HISTORY"] = "progress_table_item_query";
    ToolName["QUERY_TREASURY_HISTORY"] = "treasury_table_item_query";
    ToolName["QUERY_REPOSITORY_DATA"] = "repository_table_item_query";
    ToolName["QUERY_PERSONAL_MARK"] = "personalmark_table_item_query";
    ToolName["QUERY_TREASURY_RECEIVED"] = "treasury_received_query";
    ToolName["QUERY_LOCAL"] = "local_query";
    ToolName["QUERY_TABLE_ITEM"] = "table_item_query";
    ToolName["QUERY_WOWOK_PROTOCOL"] = "wowok_protocol";
})(ToolName || (ToolName = {}));
//# sourceMappingURL=util.js.map