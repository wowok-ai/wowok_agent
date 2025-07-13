import { z } from "zod";
import { GetMarkNameSchema, AccountOrMarkNameSchema } from "./call.js";
import { zodToJsonSchema } from "zod-to-json-schema";
import { GuardQueryModules, PermissionModules } from "./util.js";
export const QueryWowokProtocolSchemaDescription = `Retrieves the Wowok protocol data`;
export const BuiltInPermissionSchema = z.object({
    module: z.union([z.array(z.enum(PermissionModules())).describe("Modules of the built-in permissions"), z.literal('all').describe('All modules')]),
}).describe("Built-in permissions within the modules of the Wowok protocol");
export const BuiltInPermissionSchemaInput = () => {
    return zodToJsonSchema(BuiltInPermissionSchema);
};
export const QueriesForGuardSchema = z.object({
    module: z.union([z.array(z.enum(GuardQueryModules())).describe("Modules of the Guard queries"), z.literal('all').describe('All modules')]),
}).describe("Guard queries within the modules of the Wowok protocol");
export const QueryWowokProtocolSchema = z.object({
    built_in_permissions: BuiltInPermissionSchema.optional(),
    queries_for_guard: QueriesForGuardSchema.optional(),
});
export const ValueTypeSchema = z.object({
    name: z.string().describe("Name of the value type"),
    type: z.number().int().describe("Value type of the Wowok protocol"),
    description: z.string().optional().describe("Description of the value type"),
});
export const PermissionItemSchema = z.object({
    index: z.number().int().describe("Index of the built-in permission"),
    name: z.string().describe("Name of the built-in permission"),
    description: z.string().describe("Description of the built-in permission"),
    module: z.string().describe("Module of the built-in permission"),
    guard: z.string().optional().describe("Additional Guard verification"),
});
export const QueryWowokProtocolResultSchema = z.object({
    built_in_permissions: z.array(PermissionItemSchema).describe("Built-in permissions of the Wowok protocol"),
    queries_for_guard: z.array(z.object({
        module: z.string().describe("Module of the Guard query"),
        query_name: z.string().describe("Name of the Guard query"),
        query_id: z.number().int().describe("ID of the Guard query"),
        parameters: z.array(ValueTypeSchema).describe("Parameters of the Guard query"),
        return: ValueTypeSchema.describe("Return type of the Guard query"),
        description: z.string().describe("Description of the Guard query"),
    }))
});
export const QueryWowokProtocolSchemaInput = () => {
    return zodToJsonSchema(QueryWowokProtocolSchema);
};
export const QueryWowokProtocolResultSchemaOutput = () => {
    return zodToJsonSchema(QueryWowokProtocolResultSchema);
};
export const Query_TableItems_List_Description = `Retrieves paginated table data records from a Wowok on-chain object, where the table data represents dynamically extensible structured information specific to the object type. 
The query automatically identifies the object type (one of Permission, Machine, Treasury, Repository, Service, Progress, Arb, PersonalMark, or Demand) and returns data structured according to that specific type's table schema. This enables flexible data retrieval even when the object type of the provided address/name is unknown, with the query result metadata including the identified object type.
Key details by object type:
- **Demand**: Records with timestamps, transaction digests, and associated entity details.
- **Arb**: Arbitration vote entries containing voter addresses, voting weights, and claim lists.
- **Machine**: Node entries with names, operation paths from previous nodes, and metadata.
- **PersonalMark**: Address entries with human-readable names and categorical tags.
- **Permission**: Entries including entity addresses, permission lists (Wowok-defined + custom), and optional Guard constraints.
- **Repository**: Stored data entries with type-coded fields, searchable addresses, and policy-defined names.
- **Progress**: Workflow node entries with previous/next node names, timestamps, and operator session logs.
- **Service**: Product items with names, optional info endpoints, prices, and stock quantities.
- **Treasury**: Financial transaction records with operation codes, operators, Payment addresses, amounts, and timestamps.`;
export const Arb_TableItem_Description = `Retrieves detailed voting information for a specific address within an on-chain Arb object. 
Returns voting details such as voter address, voting weight, and list of voting claims, facilitating transparent tracking of arbitration voting processes.`;
export const Demand_TableItem_Description = `Retrieves detailed service recommendation data for a specified address within an on-chain Demand object. 
Returns recommendation details such as service name, recommendation rationale, service provider address, and recommendation timestamp, enabling users to review tailored service suggestions for specific demand requirements.`;
export const Machine_TableItem_Description = `Retrieves detailed node information for a specified node within an on-chain Machine object. 
Returns node details such as node name, list of all operation paths from the previous node to the current node, and associated metadata, enabling comprehensive tracking and analysis of machine workflow nodes.`;
export const PersonalMark_TableItem_Description = `Retrieves the assigned name and associated tags for a specified address from an on-chain PersonalMark object. 
Input parameters include the parent PersonalMark object's address or name, the target address to query, and a no-cache flag. 
Returns detailed information such as the human-readable name assigned to the address and an array of categorical tags, enabling clear address labeling and efficient organizational management.`;
export const Permission_TableItem_Description = `Retrieves the permission list for a specified entity address from an on-chain Permission object. 
Input parameters include the parent Permission object's address or name, the target entity address to query, and a no-cache flag. 
Returns detailed permission data such as the entity address, its associated permission list (including both wowok-defined and custom permissions), and optional additional Guard verification constraints.`;
export const Repository_TableItem_Description = `Retrieves specific stored data entries from an on-chain Repository object. 
Returns detailed data information such as data fields (with Wowok-defined base type codes), searchable data address, and field name (as specified by the Repository's policy, ensuring consistent field interpretation across systems).`;
export const Progress_TableItem_Description = `Retrieves historical session data for specific workflow nodes within an on-chain Progress object. 
Returns detailed session records such as operation timestamps, operator addresses, and operation behavior logs, enabling comprehensive tracking and analysis of workflow progression across sequential nodes.`;
export const Service_TableItem_Description = `Retrieves current information for a specific on-sale product within an on-chain Service object. 
Returns detailed product data such as product name, optional info endpoint URL, price, and stock quantity, enabling users to access up-to-date sales information for specific products to support display or transaction decisions.`;
export const Treasury_TableItem_Description = `Retrieves specific financial transaction records from an on-chain Treasury object by sequential flow number. 
Returns a detailed transaction entry containing: operation code (e.g., 'DEPOSIT' or 'WITHDRAW'), operator address, Payment address (bill details), total amount (in Wowok-defined currency units), and transaction timestamp.`;
export const ReceivedObject_Description = `Retrieves the list of ReceivedObject objects received by the Treasury or Order. The query results can be used to deposit the coins within the ReceivedObject objects into the Treasury or Order.`;
export const QueryObjectsSchemaDescription = `Retrieves the on-chain content of specified wowok objects. 
Returns detailed on-chain content data(excluding table data) for each queried object, enabling accurate and up-to-date data retrieval.`;
export const QueryObjectsSchema = z.object({
    objects: z.array(GetMarkNameSchema()).describe("Wowok object addresses."),
    no_cache: z.boolean().optional().describe("Whether to not use local cache data."),
});
export const QueryObjectsSchemaInput = () => {
    return zodToJsonSchema(QueryObjectsSchema);
};
export const QueryPersonalSchemaDescription = `Query the on-chain personal data by its name, account or address.
    The Personal object contains public information such as the user's homepage URL, social media accounts, avatar, likes and favorites, and object naming tags.`;
export const QueryPersonalSchema = z.object({
    address: AccountOrMarkNameSchema.describe("Personal address to query."),
    no_cache: z.boolean().optional().describe("Whether to not use local cache data."),
});
export const QueryPersonalSchemaInput = () => {
    return zodToJsonSchema(QueryPersonalSchema);
};
export const QueryTableItemsSchema = z.object({
    parent: z.string().describe("The address or name of the on-chain object that owns the table."),
    cursor: z.string().optional().nullable().describe("An optional paging cursor. " +
        "If provided, the query will start from the next item after the specified cursor. " +
        "Default to start from the first item if not specified."),
    limit: z.number().optional().nullable().describe("Maximum item returned per page, default to 50 if not specified."),
    no_cache: z.boolean().optional().describe("Whether to not use local cache data."),
});
export const QueryTableItemsSchemaInput = () => {
    return zodToJsonSchema(QueryTableItemsSchema);
};
export const TableItemSchema = z.object({
    parent: z.string().describe("The address or name of the on-chain object that owns the table."),
    key: z.object({
        type: z.string().describe("Type of the value."),
        value: z.unknown().describe('Value.')
    }).describe('The query key'),
    no_cache: z.boolean().optional().describe("Whether to not use local cache data."),
}).describe("Query the table item by key from the on-chain object.");
export const QueryPermissionSchemaDescription = `Query the permission list corresponding to a specific address from the on-chain Permission object.`;
export const QueryPermissionSchema = z.object({
    permission_object: GetMarkNameSchema('Permission'),
    address: AccountOrMarkNameSchema,
});
export const QueryPermissionResultSchema = z.object({
    who: z.string().describe('Address to query permissions'),
    owner: z.boolean().optional().describe('Is the owner? Note:The owner has the permission to set the admin'),
    admin: z.boolean().optional().describe('Is an admin? Note:Admin has all the permissions.'),
    items: z.array(PermissionItemSchema).optional().describe('Permissions of the address'),
    object: z.string().describe('permission object'),
});
export const QueryPermissionSchemaInput = () => {
    return zodToJsonSchema(QueryPermissionSchema);
};
export const QueryPermissionResultSchemaOutput = () => {
    return zodToJsonSchema(QueryPermissionResultSchema);
};
export const EventCursorSchema = z.object({
    eventSeq: z.string().describe('Event sequence.'),
    txDigest: z.string().describe('Transaction Digest.'),
}).describe('Event retrieval cursor');
export const QueryEventSchemaDescription = `Retrieves paginated on-chain event data using an optional cursor, including event type, timestamp, transaction digest, and associated entity details. Supports no-cache flag for fresh data retrieval. Event type definitions: - OnNewArb: Triggered when a new arbitration request (corresponding to a new Arb object) is created in the Wowok protocol. - OnPresentService: Triggered when a new service is recommended to a Demand object in the Wowok protocol. - OnNewProgress: Triggered when a new task progress record (corresponding to a new Progress object) is created in the Wowok protocol. - OnNewOrder: Triggered when a new order (corresponding to a new Order object) is created in the Wowok protocol. These events are global to the Wowok protocol. For querying events specific to a certain object, directly use the table items list query for that object (refer to the table items list query documentation for details). Event generation and querying do not replace actual operations. For user requests involving operations, always initiate the corresponding operation to the target object first (refer to the operation documentation of relevant objects).`;
export const QueryEventSchema = z.object({
    type: z.enum(['OnNewArb', 'OnPresentService', 'OnNewProgress', 'OnNewOrder']).describe("Type of Events: OnNewArb, OnPresentService, OnNewProgress, OnNewOrder"),
    cursor: EventCursorSchema.optional().nullable().describe('Paging cursor.'),
    limit: z.number().optional().nullable().describe('Mmaximum number of items per page, default to 50 if not specified.'),
    order: z.enum(['ascending', 'descending']).optional().nullable().describe('Query result ordering, default to "ascending order", oldest record first.')
});
export const QueryEventSchemaInput = () => {
    return zodToJsonSchema(QueryEventSchema);
};
export const QueryByAddressSchema = z.object({
    parent: z.string().describe("The address or name of the on-chain object that owns the table."),
    address: z.string().nonempty().describe('The query key(address) of the table item.'),
    no_cache: z.boolean().optional().describe("Whether to not use local cache data."),
}).describe("Query the table item by address from the on-chain object.");
export const QueryByNameSchema = z.object({
    parent: z.string().describe("The address or name of the on-chain object that owns the table."),
    name: z.string().nonempty().describe('The query key(name) of the table item.'),
    no_cache: z.boolean().optional().describe("Whether to not use local cache data."),
}).describe('Query the table item by name from the on-chain object.');
export const QueryByIndexSchema = z.object({
    parent: z.string().nonempty().describe("The address of the on-chain object that owns the table."),
    index: z.number().int().min(0).describe('The query key(index) of the table item. Auto-incrementing index starting at 0.'),
    no_cache: z.boolean().optional().describe("Whether to not use local cache data."),
}).describe("Query the table item by index from the on-chain object.");
export const QueryByAddressNameSchema = z.object({
    parent: z.string().describe("The address or name of the on-chain object that owns the table."),
    address: z.union([
        z.string().nonempty().describe('The address that own the data. '),
        z.number().int().min(0).describe('number converted to address, such as time.')
    ]),
    name: z.string().nonempty().describe('Data field name.'),
    no_cache: z.boolean().optional().describe("Whether to not use local cache data."),
}).describe('Query the data by the address and the name from the on-chain Repository object.');
export const QueryReceivedSchema = z.object({
    object: GetMarkNameSchema('Treasury or Order'),
    cursor: z.string().optional().nullable().describe('Paging cursor.'),
    limit: z.number().optional().nullable().describe('Mmaximum number of items per page, default to 50 if not specified.'),
});
export const QueryReceivedSchemaInput = () => {
    return zodToJsonSchema(QueryReceivedSchema);
};
export const QueryTableItemSchemaDescription = `Retrieves a specific table data item from a Wowok on-chain object based on query criteria. This schema describes the structured format of individual table items returned by the query, varying according to the object type.

Supported object types and their corresponding item schemas:
- **Demand**: An item containing timestamp (u64), transaction_digest (string), and associated_entity (address).
- **Arb**: An item with voter_address (address), voting_weight (u64), and claim_list (array<string>).
- **Machine**: An item including node_name (string), operation_paths (array<string>), and metadata (string).
- **PersonalMark**: An item with address (address), name (string), and tags (array<string>).
- **Permission**: An item containing entity_address (address), permissions (array<string>), and guard_constraints (optional<address>).
- **Repository**: An item with data_fields (string), searchable_address (address), and field_name (string).
- **Progress**: An item including prev_node (string), next_node (string), timestamp (u64), and session_logs (array<string>).
- **Service**: An item with product_name (string), endpoint (optional<string>), price (u64), and stock (u64).
- **Treasury**: An item containing operation_code (string), operator (address), payment_address (address), amount (u64), and timestamp (u64).`;
export const QueryTableItemSchema = z.object({
    query: z.union([
        z.object({ name: z.literal('treasury'), data: QueryByIndexSchema }).describe(Treasury_TableItem_Description),
        z.object({ name: z.literal('service'), data: QueryByNameSchema }).describe(Service_TableItem_Description),
        z.object({ name: z.literal('arb'), data: QueryByAddressSchema }).describe(Arb_TableItem_Description),
        z.object({ name: z.literal('demand'), data: QueryByAddressSchema }).describe(Demand_TableItem_Description),
        z.object({ name: z.literal('machine'), data: QueryByNameSchema }).describe(Machine_TableItem_Description),
        z.object({ name: z.literal('personalmark'), data: QueryByAddressSchema }).describe(PersonalMark_TableItem_Description),
        z.object({ name: z.literal('permission'), data: QueryByAddressSchema }).describe(Permission_TableItem_Description),
        z.object({ name: z.literal('repository'), data: QueryByAddressNameSchema }).describe(Repository_TableItem_Description),
        z.object({ name: z.literal('progress'), data: QueryByIndexSchema }).describe(Progress_TableItem_Description)
    ])
});
export const QueryTableItemSchemaInput = () => {
    return zodToJsonSchema(QueryTableItemSchema);
};
//# sourceMappingURL=query.js.map