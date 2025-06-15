import { z } from "zod";
import { BalanceOrCoin } from "../local/index.js";
export declare const QueryAccountSchemaDescription = "Query local account information, including on-chain address, token balance, and list of token object addresses.";
export declare const QueryAccountSchema: z.ZodObject<{
    name_or_address: z.ZodOptional<z.ZodString>;
    balance_or_coin: z.ZodOptional<z.ZodNativeEnum<typeof BalanceOrCoin>>;
    token_type: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name_or_address?: string | undefined;
    balance_or_coin?: BalanceOrCoin | undefined;
    token_type?: string | undefined;
}, {
    name_or_address?: string | undefined;
    balance_or_coin?: BalanceOrCoin | undefined;
    token_type?: string | undefined;
}>;
export declare const AccountOperationSchemaDescription = "Account operations, including generating new accounts, setting default accounts, suspending/reactivating accounts, naming accounts, and transferring tokens between accounts.";
export declare const AccountOperationSchema: z.ZodObject<{
    gen: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        default: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        default?: boolean | undefined;
    }, {
        name?: string | undefined;
        default?: boolean | undefined;
    }>>;
    default: z.ZodOptional<z.ZodObject<{
        name_or_address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name_or_address: string;
    }, {
        name_or_address: string;
    }>>;
    suspend: z.ZodOptional<z.ZodObject<{
        name_or_address: z.ZodOptional<z.ZodString>;
        suspend: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name_or_address?: string | undefined;
        suspend?: boolean | undefined;
    }, {
        name_or_address?: string | undefined;
        suspend?: boolean | undefined;
    }>>;
    name: z.ZodOptional<z.ZodObject<{
        new_name: z.ZodString;
        name_or_address: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        new_name: string;
        name_or_address?: string | undefined;
    }, {
        new_name: string;
        name_or_address?: string | undefined;
    }>>;
    transfer: z.ZodOptional<z.ZodObject<{
        name_or_address_from: z.ZodOptional<z.ZodString>;
        name_or_address_to: z.ZodOptional<z.ZodString>;
        amount: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        token_type: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        amount: string | number;
        token_type?: string | undefined;
        name_or_address_from?: string | undefined;
        name_or_address_to?: string | undefined;
    }, {
        amount: string | number;
        token_type?: string | undefined;
        name_or_address_from?: string | undefined;
        name_or_address_to?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    name?: {
        new_name: string;
        name_or_address?: string | undefined;
    } | undefined;
    default?: {
        name_or_address: string;
    } | undefined;
    gen?: {
        name?: string | undefined;
        default?: boolean | undefined;
    } | undefined;
    suspend?: {
        name_or_address?: string | undefined;
        suspend?: boolean | undefined;
    } | undefined;
    transfer?: {
        amount: string | number;
        token_type?: string | undefined;
        name_or_address_from?: string | undefined;
        name_or_address_to?: string | undefined;
    } | undefined;
}, {
    name?: {
        new_name: string;
        name_or_address?: string | undefined;
    } | undefined;
    default?: {
        name_or_address: string;
    } | undefined;
    gen?: {
        name?: string | undefined;
        default?: boolean | undefined;
    } | undefined;
    suspend?: {
        name_or_address?: string | undefined;
        suspend?: boolean | undefined;
    } | undefined;
    transfer?: {
        amount: string | number;
        token_type?: string | undefined;
        name_or_address_from?: string | undefined;
        name_or_address_to?: string | undefined;
    } | undefined;
}>;
export declare const LocalMarkOperationSchemaDescription = "Local mark operations facilitate efficient object address management by assigning names and tags to addresses, enabling faster querying and organization. \nSupported operations include adding/setting marks (with optional names and tags), removing specific tags, and removing all marks for addresses.";
export declare const LocalMarkOperationSchema: z.ZodObject<{
    data: z.ZodUnion<[z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"add">;
        data: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            address: z.ZodString;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            address: string;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            name: string;
            address: string;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        data: {
            name: string;
            address: string;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }[];
        op: "add";
    }, {
        data: {
            name: string;
            address: string;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }[];
        op: "add";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        data: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        data: string[];
        op: "remove";
    }, {
        data: string[];
        op: "remove";
    }>]>;
}, "strip", z.ZodTypeAny, {
    data: {
        op: "removeall";
    } | {
        data: {
            name: string;
            address: string;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }[];
        op: "add";
    } | {
        data: string[];
        op: "remove";
    };
}, {
    data: {
        op: "removeall";
    } | {
        data: {
            name: string;
            address: string;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }[];
        op: "add";
    } | {
        data: string[];
        op: "remove";
    };
}>;
export declare const LocalInfoOperationSchemaDescription = "Local info operations manage on-device storage of personal information (e.g., delivery addresses, phone numbers) for cryptographic processing and secure sharing with service providers. Supported operations include: adding info (requires name and content parameters), removing specific info entries by name, and updating existing entries with new content.";
export declare const LocalInfoOperationSchema: z.ZodObject<{
    data: z.ZodUnion<[z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"add">;
        data: z.ZodArray<z.ZodObject<{
            name: z.ZodDefault<z.ZodString>;
            content: z.ZodString;
            bdefault: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            content: string;
            bdefault?: boolean | undefined;
        }, {
            content: string;
            name?: string | undefined;
            bdefault?: boolean | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        data: {
            name: string;
            content: string;
            bdefault?: boolean | undefined;
        }[];
        op: "add";
    }, {
        data: {
            content: string;
            name?: string | undefined;
            bdefault?: boolean | undefined;
        }[];
        op: "add";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        data: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        data: string[];
        op: "remove";
    }, {
        data: string[];
        op: "remove";
    }>]>;
}, "strip", z.ZodTypeAny, {
    data: {
        op: "removeall";
    } | {
        data: {
            name: string;
            content: string;
            bdefault?: boolean | undefined;
        }[];
        op: "add";
    } | {
        data: string[];
        op: "remove";
    };
}, {
    data: {
        op: "removeall";
    } | {
        data: {
            content: string;
            name?: string | undefined;
            bdefault?: boolean | undefined;
        }[];
        op: "add";
    } | {
        data: string[];
        op: "remove";
    };
}>;
export declare const QueryLocalMarkSchemaDescription = "Query local mark by name. Accepts a local mark name (string) as input, and returns an object containing: address (on-chain object address), name (assigned human-readable name), and tags (array of string tags). Local marks enable faster address management by mapping addresses to memorable names and categorized tags for efficient querying.";
export declare const QueryLocalMarkSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export declare const QueryLocalInfoSchemaDescription = "Query local info by name. Local info allows storing personal information (e.g. addresses, phone numbers) on-device, which can be cryptographically processed and shared with service providers.";
export declare const QueryLocalInfoSchema: z.ZodObject<{
    name: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name?: string | undefined;
}>;
export declare const localMarkListDescription = "List local marks. Local marks facilitate efficient object address management by assigning names and tags to addresses, enabling faster querying and organization.";
export declare const LocalMarkFilterSchemaDescription = "Filter local marks by optional criteria: name (string), tags (array of strings), or object address (string). Parameters can be used individually or in combination for precise queries. Returns an array of local mark objects, each containing: address (on-chain object address), name (human-readable name), and tags (categorical tags). Local marks enhance address management efficiency through flexible multi-condition filtering.";
export declare const LocalMarkFilterSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    address: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    address?: string | undefined;
    tags?: string[] | undefined;
}, {
    name?: string | undefined;
    address?: string | undefined;
    tags?: string[] | undefined;
}>;
export declare const LocalInfoListSchemaDescription = "List local information entries. Local info enables on-device storage of personal data (e.g., addresses, phone numbers) structured as name-content pairs, supporting cryptographic processing and secure sharing with service providers.";
export declare const LocalInfoListSchema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
export declare const AccountListSchemaDescription = "List local accounts stored on the device. Accounts provide cryptographic signatures for on-chain operations and support management/operation of their owned on-chain objects and funds. If showSuspendedAccount is set to true (default: false), suspended accounts will be included in the result.";
export declare const AccountListSchema: z.ZodObject<{
    showSuspendedAccount: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    showSuspendedAccount: boolean;
}, {
    showSuspendedAccount?: boolean | undefined;
}>;
export declare const LocalSchemaDescription = "Local schema for querying accounts, address names/tags, and personal information stored on the device. \n- **Accounts**: Manages local accounts used for signing on-chain transactions.\n- **Address Marks**: Supports naming and tagging of addresses to enable object address retrieval by name.\n- **Personal Information**: Stores private data (e.g., addresses, phone numbers) for on-chain usage.\nSupports both collection-level queries (retrieving multiple entries) and individual item queries (fetching specific records).";
export declare const LocalSchema: z.ZodObject<{
    query: z.ZodUnion<[z.ZodObject<{
        name: z.ZodLiteral<"account_list">;
        data: z.ZodObject<{
            showSuspendedAccount: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
        }, "strip", z.ZodTypeAny, {
            showSuspendedAccount: boolean;
        }, {
            showSuspendedAccount?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: "account_list";
        data: {
            showSuspendedAccount: boolean;
        };
    }, {
        name: "account_list";
        data: {
            showSuspendedAccount?: boolean | undefined;
        };
    }>, z.ZodObject<{
        name: z.ZodLiteral<"info_list">;
        data: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    }, "strip", z.ZodTypeAny, {
        name: "info_list";
        data: {};
    }, {
        name: "info_list";
        data: {};
    }>, z.ZodObject<{
        name: z.ZodLiteral<"mark_list">;
        data: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            address: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            address?: string | undefined;
            tags?: string[] | undefined;
        }, {
            name?: string | undefined;
            address?: string | undefined;
            tags?: string[] | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: "mark_list";
        data: {
            name?: string | undefined;
            address?: string | undefined;
            tags?: string[] | undefined;
        };
    }, {
        name: "mark_list";
        data: {
            name?: string | undefined;
            address?: string | undefined;
            tags?: string[] | undefined;
        };
    }>, z.ZodObject<{
        name: z.ZodLiteral<"account">;
        data: z.ZodObject<{
            name_or_address: z.ZodOptional<z.ZodString>;
            balance_or_coin: z.ZodOptional<z.ZodNativeEnum<typeof BalanceOrCoin>>;
            token_type: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name_or_address?: string | undefined;
            balance_or_coin?: BalanceOrCoin | undefined;
            token_type?: string | undefined;
        }, {
            name_or_address?: string | undefined;
            balance_or_coin?: BalanceOrCoin | undefined;
            token_type?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: "account";
        data: {
            name_or_address?: string | undefined;
            balance_or_coin?: BalanceOrCoin | undefined;
            token_type?: string | undefined;
        };
    }, {
        name: "account";
        data: {
            name_or_address?: string | undefined;
            balance_or_coin?: BalanceOrCoin | undefined;
            token_type?: string | undefined;
        };
    }>, z.ZodObject<{
        name: z.ZodLiteral<"mark">;
        data: z.ZodObject<{
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
        }, {
            name: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: "mark";
        data: {
            name: string;
        };
    }, {
        name: "mark";
        data: {
            name: string;
        };
    }>, z.ZodObject<{
        name: z.ZodLiteral<"info">;
        data: z.ZodObject<{
            name: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
        }, {
            name?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        name: "info";
        data: {
            name: string;
        };
    }, {
        name: "info";
        data: {
            name?: string | undefined;
        };
    }>]>;
}, "strip", z.ZodTypeAny, {
    query: {
        name: "account_list";
        data: {
            showSuspendedAccount: boolean;
        };
    } | {
        name: "info_list";
        data: {};
    } | {
        name: "mark_list";
        data: {
            name?: string | undefined;
            address?: string | undefined;
            tags?: string[] | undefined;
        };
    } | {
        name: "account";
        data: {
            name_or_address?: string | undefined;
            balance_or_coin?: BalanceOrCoin | undefined;
            token_type?: string | undefined;
        };
    } | {
        name: "mark";
        data: {
            name: string;
        };
    } | {
        name: "info";
        data: {
            name: string;
        };
    };
}, {
    query: {
        name: "account_list";
        data: {
            showSuspendedAccount?: boolean | undefined;
        };
    } | {
        name: "info_list";
        data: {};
    } | {
        name: "mark_list";
        data: {
            name?: string | undefined;
            address?: string | undefined;
            tags?: string[] | undefined;
        };
    } | {
        name: "account";
        data: {
            name_or_address?: string | undefined;
            balance_or_coin?: BalanceOrCoin | undefined;
            token_type?: string | undefined;
        };
    } | {
        name: "mark";
        data: {
            name: string;
        };
    } | {
        name: "info";
        data: {
            name?: string | undefined;
        };
    };
}>;
export declare const LocalSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
//# sourceMappingURL=local.d.ts.map