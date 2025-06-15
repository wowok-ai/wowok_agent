import { z } from "zod";
export declare const QueryWowokProtocolSchemaDescription = "Retrieves the Wowok protocol data.";
export declare enum WOWOK_PROTOCOL_INFO {
    BuiltInPermissions = "built_in_permissions",
    GuardQueryCommands = "guard_query_commands"
}
export declare const QueryWowokProtocolSchema: z.ZodObject<{
    name: z.ZodUnion<[z.ZodLiteral<WOWOK_PROTOCOL_INFO.BuiltInPermissions>, z.ZodLiteral<WOWOK_PROTOCOL_INFO.GuardQueryCommands>]>;
}, "strip", z.ZodTypeAny, {
    name: WOWOK_PROTOCOL_INFO;
}, {
    name: WOWOK_PROTOCOL_INFO;
}>;
export declare const QueryWowokProtocolSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const Query_TableItems_List_Description = "Retrieves paginated table data records from a Wowok on-chain object, where the table data represents dynamically extensible structured information specific to the object type. \nThe query automatically identifies the object type (one of Permission, Machine, Treasury, Repository, Service, Progress, Arb, PersonalMark, or Demand) and returns data structured according to that specific type's table schema. This enables flexible data retrieval even when the object type of the provided address/name is unknown, with the query result metadata including the identified object type.\nKey details by object type:\n- **Demand**: Records with timestamps, transaction digests, and associated entity details.\n- **Arb**: Arbitration vote entries containing voter addresses, voting weights, and claim lists.\n- **Machine**: Node entries with names, operation paths from previous nodes, and metadata.\n- **PersonalMark**: Address entries with human-readable names and categorical tags.\n- **Permission**: Entries including entity addresses, permission lists (Wowok-defined + custom), and optional Guard constraints.\n- **Repository**: Stored data entries with type-coded fields, searchable addresses, and policy-defined names.\n- **Progress**: Workflow node entries with previous/next node names, timestamps, and operator session logs.\n- **Service**: Product items with names, optional info endpoints, prices, and stock quantities.\n- **Treasury**: Financial transaction records with operation codes, operators, Payment addresses, amounts, and timestamps.";
export declare const Arb_TableItem_Description = "Retrieves detailed voting information for a specific address within an on-chain Arb object. \nReturns voting details such as voter address, voting weight, and list of voting claims, facilitating transparent tracking of arbitration voting processes.";
export declare const Demand_TableItem_Description = "Retrieves detailed service recommendation data for a specified address within an on-chain Demand object. \nReturns recommendation details such as service name, recommendation rationale, service provider address, and recommendation timestamp, enabling users to review tailored service suggestions for specific demand requirements.";
export declare const Machine_TableItem_Description = "Retrieves detailed node information for a specified node within an on-chain Machine object. \nReturns node details such as node name, list of all operation paths from the previous node to the current node, and associated metadata, enabling comprehensive tracking and analysis of machine workflow nodes.";
export declare const PersonalMark_TableItem_Description = "Retrieves the assigned name and associated tags for a specified address from an on-chain PersonalMark object. \nInput parameters include the parent PersonalMark object's address or name, the target address to query, and a no-cache flag. \nReturns detailed information such as the human-readable name assigned to the address and an array of categorical tags, enabling clear address labeling and efficient organizational management.";
export declare const Permission_TableItem_Description = "Retrieves the permission list for a specified entity address from an on-chain Permission object. \nInput parameters include the parent Permission object's address or name, the target entity address to query, and a no-cache flag. \nReturns detailed permission data such as the entity address, its associated permission list (including both wowok-defined and custom permissions), and optional additional Guard verification constraints.";
export declare const Repository_TableItem_Description = "Retrieves specific stored data entries from an on-chain Repository object. \nReturns detailed data information such as data fields (with Wowok-defined base type codes), searchable data address, and field name (as specified by the Repository's policy, ensuring consistent field interpretation across systems).";
export declare const Progress_TableItem_Description = "Retrieves historical session data for specific workflow nodes within an on-chain Progress object. \nReturns detailed session records such as operation timestamps, operator addresses, and operation behavior logs, enabling comprehensive tracking and analysis of workflow progression across sequential nodes.";
export declare const Service_TableItem_Description = "Retrieves current information for a specific on-sale product within an on-chain Service object. \nReturns detailed product data such as product name, optional info endpoint URL, price, and stock quantity, enabling users to access up-to-date sales information for specific products to support display or transaction decisions.";
export declare const Treasury_TableItem_Description = "Retrieves specific financial transaction records from an on-chain Treasury object by sequential flow number. \nReturns a detailed transaction entry containing: operation code (e.g., 'DEPOSIT' or 'WITHDRAW'), operator address, Payment address (bill details), total amount (in Wowok-defined currency units), and transaction timestamp.";
export declare const Treasury_ReceivedObject_Description = "Retrieves the list of Treasury_ReceivedObject objects received by the Treasury. The query results can be used to deposit the coins within the Treasury_ReceivedObject objects into the Treasury and update the Treasury's payment transaction records.";
export declare const QueryObjectsSchemaDescription = "Retrieves the on-chain content of specified wowok objects. \nReturns detailed on-chain content data(excluding table data) for each queried object, enabling accurate and up-to-date data retrieval.";
export declare const QueryObjectsSchema: z.ZodObject<{
    objects: z.ZodArray<z.ZodString, "many">;
    no_cache: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    objects: string[];
    no_cache?: boolean | undefined;
}, {
    objects: string[];
    no_cache?: boolean | undefined;
}>;
export declare const QueryObjectsSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const QueryPersonalSchemaDescription = "Query the on-chain personal data by its address.\n    The Personal object contains public information such as the user's homepage URL, social media accounts, avatar, likes and favorites, and object naming tags.";
export declare const QueryPersonalSchema: z.ZodObject<{
    address: z.ZodUnion<[z.ZodObject<{
        account_or_address: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        account_or_address?: string | undefined;
    }, {
        account_or_address?: string | undefined;
    }>, z.ZodObject<{
        mark_or_address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        mark_or_address: string;
    }, {
        mark_or_address: string;
    }>]>;
    no_cache: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    address: {
        account_or_address?: string | undefined;
    } | {
        mark_or_address: string;
    };
    no_cache?: boolean | undefined;
}, {
    address: {
        account_or_address?: string | undefined;
    } | {
        mark_or_address: string;
    };
    no_cache?: boolean | undefined;
}>;
export declare const QueryPersonalSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const QueryTableItemsSchema: z.ZodObject<{
    parent: z.ZodString;
    cursor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    limit: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    no_cache: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    parent: string;
    no_cache?: boolean | undefined;
    cursor?: string | null | undefined;
    limit?: number | null | undefined;
}, {
    parent: string;
    no_cache?: boolean | undefined;
    cursor?: string | null | undefined;
    limit?: number | null | undefined;
}>;
export declare const QueryTableItemsSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const TableItemSchema: z.ZodObject<{
    parent: z.ZodString;
    key: z.ZodObject<{
        type: z.ZodString;
        value: z.ZodUnknown;
    }, "strip", z.ZodTypeAny, {
        type: string;
        value?: unknown;
    }, {
        type: string;
        value?: unknown;
    }>;
    no_cache: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    parent: string;
    key: {
        type: string;
        value?: unknown;
    };
    no_cache?: boolean | undefined;
}, {
    parent: string;
    key: {
        type: string;
        value?: unknown;
    };
    no_cache?: boolean | undefined;
}>;
export declare const QueryPermissionSchemaDescription = "Query the permission list corresponding to a specific address from the on-chain Permission object.";
export declare const QueryPermissionSchema: z.ZodObject<{
    permission_object: z.ZodString;
    address: z.ZodUnion<[z.ZodObject<{
        account_or_address: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        account_or_address?: string | undefined;
    }, {
        account_or_address?: string | undefined;
    }>, z.ZodObject<{
        mark_or_address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        mark_or_address: string;
    }, {
        mark_or_address: string;
    }>]>;
}, "strip", z.ZodTypeAny, {
    address: {
        account_or_address?: string | undefined;
    } | {
        mark_or_address: string;
    };
    permission_object: string;
}, {
    address: {
        account_or_address?: string | undefined;
    } | {
        mark_or_address: string;
    };
    permission_object: string;
}>;
export declare const QueryPermissionSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const EventCursorSchema: z.ZodObject<{
    eventSeq: z.ZodString;
    txDigest: z.ZodString;
}, "strip", z.ZodTypeAny, {
    eventSeq: string;
    txDigest: string;
}, {
    eventSeq: string;
    txDigest: string;
}>;
export declare const QueryEventSchemaDescription = "Retrieves paginated on-chain event data using an optional cursor, including event type, timestamp, transaction digest, and associated entity details. Supports no-cache flag for fresh data retrieval. Event type definitions: - OnNewArb: Triggered when a new arbitration request (corresponding to a new Arb object) is created in the Wowok protocol. - OnPresentService: Triggered when a new service is recommended to a Demand object in the Wowok protocol. - OnNewProgress: Triggered when a new task progress record (corresponding to a new Progress object) is created in the Wowok protocol. - OnNewOrder: Triggered when a new order (corresponding to a new Order object) is created in the Wowok protocol. These events are global to the Wowok protocol. For querying events specific to a certain object, directly use the table items list query for that object (refer to the table items list query documentation for details). Event generation and querying do not replace actual operations. For user requests involving operations, always initiate the corresponding operation to the target object first (refer to the operation documentation of relevant objects).";
export declare const QueryEventSchema: z.ZodObject<{
    type: z.ZodEnum<["OnNewArb", "OnPresentService", "OnNewProgress", "OnNewOrder"]>;
    cursor: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        eventSeq: z.ZodString;
        txDigest: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        eventSeq: string;
        txDigest: string;
    }, {
        eventSeq: string;
        txDigest: string;
    }>>>;
    limit: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    order: z.ZodNullable<z.ZodOptional<z.ZodEnum<["ascending", "descending"]>>>;
}, "strip", z.ZodTypeAny, {
    type: "OnNewArb" | "OnPresentService" | "OnNewProgress" | "OnNewOrder";
    order?: "ascending" | "descending" | null | undefined;
    cursor?: {
        eventSeq: string;
        txDigest: string;
    } | null | undefined;
    limit?: number | null | undefined;
}, {
    type: "OnNewArb" | "OnPresentService" | "OnNewProgress" | "OnNewOrder";
    order?: "ascending" | "descending" | null | undefined;
    cursor?: {
        eventSeq: string;
        txDigest: string;
    } | null | undefined;
    limit?: number | null | undefined;
}>;
export declare const QueryEventSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const QueryByAddressSchema: z.ZodObject<{
    parent: z.ZodString;
    address: z.ZodString;
    no_cache: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    address: string;
    parent: string;
    no_cache?: boolean | undefined;
}, {
    address: string;
    parent: string;
    no_cache?: boolean | undefined;
}>;
export declare const QueryByNameSchema: z.ZodObject<{
    parent: z.ZodString;
    name: z.ZodString;
    no_cache: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    parent: string;
    no_cache?: boolean | undefined;
}, {
    name: string;
    parent: string;
    no_cache?: boolean | undefined;
}>;
export declare const QueryByIndexSchema: z.ZodObject<{
    parent: z.ZodString;
    index: z.ZodNumber;
    no_cache: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    parent: string;
    index: number;
    no_cache?: boolean | undefined;
}, {
    parent: string;
    index: number;
    no_cache?: boolean | undefined;
}>;
export declare const QueryByAddressNameSchema: z.ZodObject<{
    parent: z.ZodString;
    address: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    name: z.ZodString;
    no_cache: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name: string;
    address: string | number;
    parent: string;
    no_cache?: boolean | undefined;
}, {
    name: string;
    address: string | number;
    parent: string;
    no_cache?: boolean | undefined;
}>;
export declare const QueryTreasuryReceivedSchema: z.ZodObject<{
    treasury_object: z.ZodString;
    cursor: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    limit: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    treasury_object: string;
    cursor?: string | null | undefined;
    limit?: number | null | undefined;
}, {
    treasury_object: string;
    cursor?: string | null | undefined;
    limit?: number | null | undefined;
}>;
export declare const QueryTreasuryReceivedSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const QueryTableItemSchemaDescription = "Retrieves a specific table data item from a Wowok on-chain object based on query criteria. This schema describes the structured format of individual table items returned by the query, varying according to the object type.\n\nSupported object types and their corresponding item schemas:\n- **Demand**: An item containing timestamp (u64), transaction_digest (string), and associated_entity (address).\n- **Arb**: An item with voter_address (address), voting_weight (u64), and claim_list (array<string>).\n- **Machine**: An item including node_name (string), operation_paths (array<string>), and metadata (string).\n- **PersonalMark**: An item with address (address), name (string), and tags (array<string>).\n- **Permission**: An item containing entity_address (address), permissions (array<string>), and guard_constraints (optional<address>).\n- **Repository**: An item with data_fields (string), searchable_address (address), and field_name (string).\n- **Progress**: An item including prev_node (string), next_node (string), timestamp (u64), and session_logs (array<string>).\n- **Service**: An item with product_name (string), endpoint (optional<string>), price (u64), and stock (u64).\n- **Treasury**: An item containing operation_code (string), operator (address), payment_address (address), amount (u64), and timestamp (u64).";
export declare const QueryTableItemSchema: z.ZodObject<{
    query: z.ZodUnion<[z.ZodObject<{
        name: z.ZodLiteral<"treasury">;
        data: z.ZodObject<{
            parent: z.ZodString;
            index: z.ZodNumber;
            no_cache: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            parent: string;
            index: number;
            no_cache?: boolean | undefined;
        }, {
            parent: string;
            index: number;
            no_cache?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: "treasury";
        data: {
            parent: string;
            index: number;
            no_cache?: boolean | undefined;
        };
    }, {
        name: "treasury";
        data: {
            parent: string;
            index: number;
            no_cache?: boolean | undefined;
        };
    }>, z.ZodObject<{
        name: z.ZodLiteral<"service">;
        data: z.ZodObject<{
            parent: z.ZodString;
            name: z.ZodString;
            no_cache: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            parent: string;
            no_cache?: boolean | undefined;
        }, {
            name: string;
            parent: string;
            no_cache?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: "service";
        data: {
            name: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    }, {
        name: "service";
        data: {
            name: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    }>, z.ZodObject<{
        name: z.ZodLiteral<"arb">;
        data: z.ZodObject<{
            parent: z.ZodString;
            address: z.ZodString;
            no_cache: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        }, {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: "arb";
        data: {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    }, {
        name: "arb";
        data: {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    }>, z.ZodObject<{
        name: z.ZodLiteral<"demand">;
        data: z.ZodObject<{
            parent: z.ZodString;
            address: z.ZodString;
            no_cache: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        }, {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: "demand";
        data: {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    }, {
        name: "demand";
        data: {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    }>, z.ZodObject<{
        name: z.ZodLiteral<"machine">;
        data: z.ZodObject<{
            parent: z.ZodString;
            name: z.ZodString;
            no_cache: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            parent: string;
            no_cache?: boolean | undefined;
        }, {
            name: string;
            parent: string;
            no_cache?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: "machine";
        data: {
            name: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    }, {
        name: "machine";
        data: {
            name: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    }>, z.ZodObject<{
        name: z.ZodLiteral<"personalmark">;
        data: z.ZodObject<{
            parent: z.ZodString;
            address: z.ZodString;
            no_cache: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        }, {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: "personalmark";
        data: {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    }, {
        name: "personalmark";
        data: {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    }>, z.ZodObject<{
        name: z.ZodLiteral<"permission">;
        data: z.ZodObject<{
            parent: z.ZodString;
            address: z.ZodString;
            no_cache: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        }, {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: "permission";
        data: {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    }, {
        name: "permission";
        data: {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    }>, z.ZodObject<{
        name: z.ZodLiteral<"repository">;
        data: z.ZodObject<{
            parent: z.ZodString;
            address: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            name: z.ZodString;
            no_cache: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            address: string | number;
            parent: string;
            no_cache?: boolean | undefined;
        }, {
            name: string;
            address: string | number;
            parent: string;
            no_cache?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: "repository";
        data: {
            name: string;
            address: string | number;
            parent: string;
            no_cache?: boolean | undefined;
        };
    }, {
        name: "repository";
        data: {
            name: string;
            address: string | number;
            parent: string;
            no_cache?: boolean | undefined;
        };
    }>, z.ZodObject<{
        name: z.ZodLiteral<"progress">;
        data: z.ZodObject<{
            parent: z.ZodString;
            index: z.ZodNumber;
            no_cache: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            parent: string;
            index: number;
            no_cache?: boolean | undefined;
        }, {
            parent: string;
            index: number;
            no_cache?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: "progress";
        data: {
            parent: string;
            index: number;
            no_cache?: boolean | undefined;
        };
    }, {
        name: "progress";
        data: {
            parent: string;
            index: number;
            no_cache?: boolean | undefined;
        };
    }>]>;
}, "strip", z.ZodTypeAny, {
    query: {
        name: "treasury";
        data: {
            parent: string;
            index: number;
            no_cache?: boolean | undefined;
        };
    } | {
        name: "service";
        data: {
            name: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    } | {
        name: "arb";
        data: {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    } | {
        name: "demand";
        data: {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    } | {
        name: "machine";
        data: {
            name: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    } | {
        name: "personalmark";
        data: {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    } | {
        name: "permission";
        data: {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    } | {
        name: "repository";
        data: {
            name: string;
            address: string | number;
            parent: string;
            no_cache?: boolean | undefined;
        };
    } | {
        name: "progress";
        data: {
            parent: string;
            index: number;
            no_cache?: boolean | undefined;
        };
    };
}, {
    query: {
        name: "treasury";
        data: {
            parent: string;
            index: number;
            no_cache?: boolean | undefined;
        };
    } | {
        name: "service";
        data: {
            name: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    } | {
        name: "arb";
        data: {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    } | {
        name: "demand";
        data: {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    } | {
        name: "machine";
        data: {
            name: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    } | {
        name: "personalmark";
        data: {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    } | {
        name: "permission";
        data: {
            address: string;
            parent: string;
            no_cache?: boolean | undefined;
        };
    } | {
        name: "repository";
        data: {
            name: string;
            address: string | number;
            parent: string;
            no_cache?: boolean | undefined;
        };
    } | {
        name: "progress";
        data: {
            parent: string;
            index: number;
            no_cache?: boolean | undefined;
        };
    };
}>;
export declare const QueryTableItemSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
//# sourceMappingURL=query.d.ts.map