import { z } from "zod";
import * as WOWOK from 'wowok';
export declare const GetMarkNameSchema: (object?: string) => z.ZodString;
export declare const ObjectExistedSchema: (object?: string) => z.ZodString;
export declare const AccountNameSchema: z.ZodOptional<z.ZodString>;
export declare const AccountOrMarkNameSchema: z.ZodObject<{
    name_or_address: z.ZodOptional<z.ZodString>;
    local_mark_first: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name_or_address?: string | undefined;
    local_mark_first?: boolean | undefined;
}, {
    name_or_address?: string | undefined;
    local_mark_first?: boolean | undefined;
}>;
export declare const ModuleSchema: z.ZodEnum<[string, ...string[]]>;
export declare const CallDemandDataSchema: z.ZodObject<{
    object: z.ZodUnion<[z.ZodString, z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
        onChain: z.ZodOptional<z.ZodBoolean>;
    } & {
        permission: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        } & {
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>]>>;
    } & {
        type_parameter: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type_parameter: string;
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }, {
        type_parameter: string;
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }>]>;
    present: z.ZodOptional<z.ZodObject<{
        service: z.ZodOptional<z.ZodString>;
        recommend_words: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        recommend_words: string;
        service?: string | undefined;
    }, {
        service?: string | undefined;
        recommend_words?: string | undefined;
    }>>;
    description: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    time_expire: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodLiteral<"duration">;
        minutes: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        op: "duration";
        minutes: number;
    }, {
        op: "duration";
        minutes: number;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"time">;
        time: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        op: "time";
        time: number;
    }, {
        op: "time";
        time: number;
    }>]>>;
    bounty: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodLiteral<"add">;
        object: z.ZodUnion<[z.ZodObject<{
            address: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            address: string;
        }, {
            address: string;
        }>, z.ZodObject<{
            balance: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        }, "strip", z.ZodTypeAny, {
            balance: string | number;
        }, {
            balance: string | number;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        object: {
            address: string;
        } | {
            balance: string | number;
        };
        op: "add";
    }, {
        object: {
            address: string;
        } | {
            balance: string | number;
        };
        op: "add";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"reward">;
        service: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        service: string;
        op: "reward";
    }, {
        service: string;
        op: "reward";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"refund">;
    }, "strip", z.ZodTypeAny, {
        op: "refund";
    }, {
        op: "refund";
    }>]>>;
    guard: z.ZodOptional<z.ZodObject<{
        guard: z.ZodNullable<z.ZodString>;
        service_id_in_guard: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        guard: string | null;
        service_id_in_guard?: number | undefined;
    }, {
        guard: string | null;
        service_id_in_guard?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    object: string | {
        type_parameter: string;
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    };
    description?: string | undefined;
    guard?: {
        guard: string | null;
        service_id_in_guard?: number | undefined;
    } | undefined;
    present?: {
        recommend_words: string;
        service?: string | undefined;
    } | undefined;
    location?: string | undefined;
    time_expire?: {
        op: "duration";
        minutes: number;
    } | {
        op: "time";
        time: number;
    } | undefined;
    bounty?: {
        object: {
            address: string;
        } | {
            balance: string | number;
        };
        op: "add";
    } | {
        service: string;
        op: "reward";
    } | {
        op: "refund";
    } | undefined;
}, {
    object: string | {
        type_parameter: string;
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    };
    description?: string | undefined;
    guard?: {
        guard: string | null;
        service_id_in_guard?: number | undefined;
    } | undefined;
    present?: {
        service?: string | undefined;
        recommend_words?: string | undefined;
    } | undefined;
    location?: string | undefined;
    time_expire?: {
        op: "duration";
        minutes: number;
    } | {
        op: "time";
        time: number;
    } | undefined;
    bounty?: {
        object: {
            address: string;
        } | {
            balance: string | number;
        };
        op: "add";
    } | {
        service: string;
        op: "reward";
    } | {
        op: "refund";
    } | undefined;
}>;
export declare const CallGuardDataSchema: z.ZodObject<{
    namedNew: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
        onChain: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        tags?: string[] | undefined;
        name?: string | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }, {
        tags?: string[] | undefined;
        name?: string | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }>>;
    root: z.ZodType<any, z.ZodTypeDef, any>;
    description: z.ZodOptional<z.ZodString>;
    table: z.ZodOptional<z.ZodArray<z.ZodObject<{
        identifier: z.ZodNumber;
        bWitness: z.ZodBoolean;
        value_type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
        value: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        bWitness: boolean;
        value_type: WOWOK.ValueType;
        identifier: number;
        value?: any;
    }, {
        bWitness: boolean;
        value_type: WOWOK.ValueType;
        identifier: number;
        value?: any;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    table?: {
        bWitness: boolean;
        value_type: WOWOK.ValueType;
        identifier: number;
        value?: any;
    }[] | undefined;
    description?: string | undefined;
    namedNew?: {
        tags?: string[] | undefined;
        name?: string | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    } | undefined;
    root?: any;
}, {
    table?: {
        bWitness: boolean;
        value_type: WOWOK.ValueType;
        identifier: number;
        value?: any;
    }[] | undefined;
    description?: string | undefined;
    namedNew?: {
        tags?: string[] | undefined;
        name?: string | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    } | undefined;
    root?: any;
}>;
export declare const CallMachineDataSchema: z.ZodObject<{
    object: z.ZodUnion<[z.ZodString, z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
        onChain: z.ZodOptional<z.ZodBoolean>;
    } & {
        permission: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        } & {
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }, {
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }>]>;
    progress_new: z.ZodOptional<z.ZodObject<{
        task_address: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        namedNew: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        task_address?: string | null | undefined;
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    }, {
        task_address?: string | null | undefined;
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    }>>;
    progress_context_repository: z.ZodOptional<z.ZodObject<{
        progress: z.ZodOptional<z.ZodString>;
        repository: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        repository: string | null;
        progress?: string | undefined;
    }, {
        repository: string | null;
        progress?: string | undefined;
    }>>;
    progress_namedOperator: z.ZodOptional<z.ZodObject<{
        progress: z.ZodOptional<z.ZodString>;
        data: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            operators: z.ZodArray<z.ZodObject<{
                name_or_address: z.ZodOptional<z.ZodString>;
                local_mark_first: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            name: string;
            operators: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        }, {
            name: string;
            operators: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        data: {
            name: string;
            operators: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        }[];
        progress?: string | undefined;
    }, {
        data: {
            name: string;
            operators: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        }[];
        progress?: string | undefined;
    }>>;
    progress_parent: z.ZodOptional<z.ZodObject<{
        progress: z.ZodOptional<z.ZodString>;
        parent: z.ZodNullable<z.ZodObject<{
            parent_id: z.ZodString;
            parent_session_id: z.ZodNumber;
            operation: z.ZodObject<{
                next_node_name: z.ZodString;
                forward: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                next_node_name: string;
                forward: string;
            }, {
                next_node_name: string;
                forward: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            operation: {
                next_node_name: string;
                forward: string;
            };
            parent_id: string;
            parent_session_id: number;
        }, {
            operation: {
                next_node_name: string;
                forward: string;
            };
            parent_id: string;
            parent_session_id: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        parent: {
            operation: {
                next_node_name: string;
                forward: string;
            };
            parent_id: string;
            parent_session_id: number;
        } | null;
        progress?: string | undefined;
    }, {
        parent: {
            operation: {
                next_node_name: string;
                forward: string;
            };
            parent_id: string;
            parent_session_id: number;
        } | null;
        progress?: string | undefined;
    }>>;
    progress_hold: z.ZodOptional<z.ZodObject<{
        progress: z.ZodString;
        operation: z.ZodObject<{
            next_node_name: z.ZodString;
            forward: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            next_node_name: string;
            forward: string;
        }, {
            next_node_name: string;
            forward: string;
        }>;
        bHold: z.ZodBoolean;
        adminUnhold: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        progress: string;
        operation: {
            next_node_name: string;
            forward: string;
        };
        bHold: boolean;
        adminUnhold?: boolean | undefined;
    }, {
        progress: string;
        operation: {
            next_node_name: string;
            forward: string;
        };
        bHold: boolean;
        adminUnhold?: boolean | undefined;
    }>>;
    progress_task: z.ZodOptional<z.ZodObject<{
        progress: z.ZodString;
        task_address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        progress: string;
        task_address: string;
    }, {
        progress: string;
        task_address: string;
    }>>;
    progress_next: z.ZodOptional<z.ZodObject<{
        progress: z.ZodString;
        operation: z.ZodObject<{
            next_node_name: z.ZodString;
            forward: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            next_node_name: string;
            forward: string;
        }, {
            next_node_name: string;
            forward: string;
        }>;
        deliverable: z.ZodObject<{
            msg: z.ZodString;
            orders: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            msg: string;
            orders: string[];
        }, {
            msg: string;
            orders: string[];
        }>;
    }, "strip", z.ZodTypeAny, {
        progress: string;
        operation: {
            next_node_name: string;
            forward: string;
        };
        deliverable: {
            msg: string;
            orders: string[];
        };
    }, {
        progress: string;
        operation: {
            next_node_name: string;
            forward: string;
        };
        deliverable: {
            msg: string;
            orders: string[];
        };
    }>>;
    description: z.ZodOptional<z.ZodString>;
    endpoint: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    consensus_repository: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodUnion<[z.ZodLiteral<"set">, z.ZodLiteral<"remove">, z.ZodLiteral<"add">]>;
        objects: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        objects: string[];
        op: "set" | "add" | "remove";
    }, {
        objects: string[];
        op: "set" | "add" | "remove";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>]>>;
    nodes: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodLiteral<"add">;
        bReplace: z.ZodOptional<z.ZodBoolean>;
        data: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            pairs: z.ZodArray<z.ZodObject<{
                prior_node: z.ZodDefault<z.ZodString>;
                threshold: z.ZodNumber;
                forwards: z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    namedOperator: z.ZodOptional<z.ZodString>;
                    permission: z.ZodOptional<z.ZodTypeAny>;
                    weight: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                    guard: z.ZodOptional<z.ZodString>;
                    suppliers: z.ZodOptional<z.ZodArray<z.ZodObject<{
                        service: z.ZodString;
                        bRequired: z.ZodOptional<z.ZodBoolean>;
                    }, "strip", z.ZodTypeAny, {
                        service: string;
                        bRequired?: boolean | undefined;
                    }, {
                        service: string;
                        bRequired?: boolean | undefined;
                    }>, "many">>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }, {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                prior_node: string;
                threshold: number;
                forwards: {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }[];
            }, {
                threshold: number;
                forwards: {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }[];
                prior_node?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            name: string;
            pairs: {
                prior_node: string;
                threshold: number;
                forwards: {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }[];
            }[];
        }, {
            name: string;
            pairs: {
                threshold: number;
                forwards: {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }[];
                prior_node?: string | undefined;
            }[];
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        data: {
            name: string;
            pairs: {
                prior_node: string;
                threshold: number;
                forwards: {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }[];
            }[];
        }[];
        op: "add";
        bReplace?: boolean | undefined;
    }, {
        data: {
            name: string;
            pairs: {
                threshold: number;
                forwards: {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }[];
                prior_node?: string | undefined;
            }[];
        }[];
        op: "add";
        bReplace?: boolean | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        names: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "remove";
        names: string[];
    }, {
        op: "remove";
        names: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"rename node">;
        data: z.ZodArray<z.ZodObject<{
            old: z.ZodString;
            new: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            new: string;
            old: string;
        }, {
            new: string;
            old: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        data: {
            new: string;
            old: string;
        }[];
        op: "rename node";
    }, {
        data: {
            new: string;
            old: string;
        }[];
        op: "rename node";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove pair">;
        pairs: z.ZodArray<z.ZodObject<{
            prior_node_name: z.ZodString;
            node_name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            prior_node_name: string;
            node_name: string;
        }, {
            prior_node_name: string;
            node_name: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "remove pair";
        pairs: {
            prior_node_name: string;
            node_name: string;
        }[];
    }, {
        op: "remove pair";
        pairs: {
            prior_node_name: string;
            node_name: string;
        }[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"add forward">;
        data: z.ZodArray<z.ZodObject<{
            prior_node_name: z.ZodString;
            node_name: z.ZodString;
            forward: z.ZodObject<{
                name: z.ZodString;
                namedOperator: z.ZodOptional<z.ZodString>;
                permission: z.ZodOptional<z.ZodTypeAny>;
                weight: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                guard: z.ZodOptional<z.ZodString>;
                suppliers: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    service: z.ZodString;
                    bRequired: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    service: string;
                    bRequired?: boolean | undefined;
                }, {
                    service: string;
                    bRequired?: boolean | undefined;
                }>, "many">>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                permission?: any;
                guard?: string | undefined;
                namedOperator?: string | undefined;
                weight?: number | undefined;
                suppliers?: {
                    service: string;
                    bRequired?: boolean | undefined;
                }[] | undefined;
            }, {
                name: string;
                permission?: any;
                guard?: string | undefined;
                namedOperator?: string | undefined;
                weight?: number | undefined;
                suppliers?: {
                    service: string;
                    bRequired?: boolean | undefined;
                }[] | undefined;
            }>;
            threshold: z.ZodOptional<z.ZodNumber>;
            remove_old_forward: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            forward: {
                name: string;
                permission?: any;
                guard?: string | undefined;
                namedOperator?: string | undefined;
                weight?: number | undefined;
                suppliers?: {
                    service: string;
                    bRequired?: boolean | undefined;
                }[] | undefined;
            };
            prior_node_name: string;
            node_name: string;
            threshold?: number | undefined;
            remove_old_forward?: string | undefined;
        }, {
            forward: {
                name: string;
                permission?: any;
                guard?: string | undefined;
                namedOperator?: string | undefined;
                weight?: number | undefined;
                suppliers?: {
                    service: string;
                    bRequired?: boolean | undefined;
                }[] | undefined;
            };
            prior_node_name: string;
            node_name: string;
            threshold?: number | undefined;
            remove_old_forward?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        data: {
            forward: {
                name: string;
                permission?: any;
                guard?: string | undefined;
                namedOperator?: string | undefined;
                weight?: number | undefined;
                suppliers?: {
                    service: string;
                    bRequired?: boolean | undefined;
                }[] | undefined;
            };
            prior_node_name: string;
            node_name: string;
            threshold?: number | undefined;
            remove_old_forward?: string | undefined;
        }[];
        op: "add forward";
    }, {
        data: {
            forward: {
                name: string;
                permission?: any;
                guard?: string | undefined;
                namedOperator?: string | undefined;
                weight?: number | undefined;
                suppliers?: {
                    service: string;
                    bRequired?: boolean | undefined;
                }[] | undefined;
            };
            prior_node_name: string;
            node_name: string;
            threshold?: number | undefined;
            remove_old_forward?: string | undefined;
        }[];
        op: "add forward";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove forward">;
        data: z.ZodArray<z.ZodObject<{
            prior_node_name: z.ZodString;
            node_name: z.ZodString;
            forward_name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            prior_node_name: string;
            node_name: string;
            forward_name: string;
        }, {
            prior_node_name: string;
            node_name: string;
            forward_name: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        data: {
            prior_node_name: string;
            node_name: string;
            forward_name: string;
        }[];
        op: "remove forward";
    }, {
        data: {
            prior_node_name: string;
            node_name: string;
            forward_name: string;
        }[];
        op: "remove forward";
    }>]>>;
    bPublished: z.ZodOptional<z.ZodBoolean>;
    bPaused: z.ZodOptional<z.ZodBoolean>;
    clone_new: z.ZodOptional<z.ZodObject<{
        namedNew: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    }, {
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    object: string | {
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    };
    description?: string | undefined;
    nodes?: {
        data: {
            name: string;
            pairs: {
                prior_node: string;
                threshold: number;
                forwards: {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }[];
            }[];
        }[];
        op: "add";
        bReplace?: boolean | undefined;
    } | {
        op: "remove";
        names: string[];
    } | {
        data: {
            new: string;
            old: string;
        }[];
        op: "rename node";
    } | {
        op: "remove pair";
        pairs: {
            prior_node_name: string;
            node_name: string;
        }[];
    } | {
        data: {
            forward: {
                name: string;
                permission?: any;
                guard?: string | undefined;
                namedOperator?: string | undefined;
                weight?: number | undefined;
                suppliers?: {
                    service: string;
                    bRequired?: boolean | undefined;
                }[] | undefined;
            };
            prior_node_name: string;
            node_name: string;
            threshold?: number | undefined;
            remove_old_forward?: string | undefined;
        }[];
        op: "add forward";
    } | {
        data: {
            prior_node_name: string;
            node_name: string;
            forward_name: string;
        }[];
        op: "remove forward";
    } | undefined;
    progress_new?: {
        task_address?: string | null | undefined;
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    } | undefined;
    progress_context_repository?: {
        repository: string | null;
        progress?: string | undefined;
    } | undefined;
    progress_namedOperator?: {
        data: {
            name: string;
            operators: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        }[];
        progress?: string | undefined;
    } | undefined;
    progress_parent?: {
        parent: {
            operation: {
                next_node_name: string;
                forward: string;
            };
            parent_id: string;
            parent_session_id: number;
        } | null;
        progress?: string | undefined;
    } | undefined;
    progress_task?: {
        progress: string;
        task_address: string;
    } | undefined;
    progress_hold?: {
        progress: string;
        operation: {
            next_node_name: string;
            forward: string;
        };
        bHold: boolean;
        adminUnhold?: boolean | undefined;
    } | undefined;
    progress_next?: {
        progress: string;
        operation: {
            next_node_name: string;
            forward: string;
        };
        deliverable: {
            msg: string;
            orders: string[];
        };
    } | undefined;
    endpoint?: string | null | undefined;
    consensus_repository?: {
        objects: string[];
        op: "set" | "add" | "remove";
    } | {
        op: "removeall";
    } | undefined;
    bPublished?: boolean | undefined;
    bPaused?: boolean | undefined;
    clone_new?: {
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    } | undefined;
}, {
    object: string | {
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    };
    description?: string | undefined;
    nodes?: {
        data: {
            name: string;
            pairs: {
                threshold: number;
                forwards: {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }[];
                prior_node?: string | undefined;
            }[];
        }[];
        op: "add";
        bReplace?: boolean | undefined;
    } | {
        op: "remove";
        names: string[];
    } | {
        data: {
            new: string;
            old: string;
        }[];
        op: "rename node";
    } | {
        op: "remove pair";
        pairs: {
            prior_node_name: string;
            node_name: string;
        }[];
    } | {
        data: {
            forward: {
                name: string;
                permission?: any;
                guard?: string | undefined;
                namedOperator?: string | undefined;
                weight?: number | undefined;
                suppliers?: {
                    service: string;
                    bRequired?: boolean | undefined;
                }[] | undefined;
            };
            prior_node_name: string;
            node_name: string;
            threshold?: number | undefined;
            remove_old_forward?: string | undefined;
        }[];
        op: "add forward";
    } | {
        data: {
            prior_node_name: string;
            node_name: string;
            forward_name: string;
        }[];
        op: "remove forward";
    } | undefined;
    progress_new?: {
        task_address?: string | null | undefined;
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    } | undefined;
    progress_context_repository?: {
        repository: string | null;
        progress?: string | undefined;
    } | undefined;
    progress_namedOperator?: {
        data: {
            name: string;
            operators: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        }[];
        progress?: string | undefined;
    } | undefined;
    progress_parent?: {
        parent: {
            operation: {
                next_node_name: string;
                forward: string;
            };
            parent_id: string;
            parent_session_id: number;
        } | null;
        progress?: string | undefined;
    } | undefined;
    progress_task?: {
        progress: string;
        task_address: string;
    } | undefined;
    progress_hold?: {
        progress: string;
        operation: {
            next_node_name: string;
            forward: string;
        };
        bHold: boolean;
        adminUnhold?: boolean | undefined;
    } | undefined;
    progress_next?: {
        progress: string;
        operation: {
            next_node_name: string;
            forward: string;
        };
        deliverable: {
            msg: string;
            orders: string[];
        };
    } | undefined;
    endpoint?: string | null | undefined;
    consensus_repository?: {
        objects: string[];
        op: "set" | "add" | "remove";
    } | {
        op: "removeall";
    } | undefined;
    bPublished?: boolean | undefined;
    bPaused?: boolean | undefined;
    clone_new?: {
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    } | undefined;
}>;
export declare const CallPermissionDataSchema: z.ZodObject<{
    object: z.ZodUnion<[z.ZodString, z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
        onChain: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        tags?: string[] | undefined;
        name?: string | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }, {
        tags?: string[] | undefined;
        name?: string | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }>]>;
    description: z.ZodOptional<z.ZodString>;
    biz_permission: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodLiteral<"add">;
        data: z.ZodArray<z.ZodObject<{
            index: z.ZodEffects<z.ZodTypeAny, number, any>;
            name: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            index: number;
        }, {
            name: string;
            index?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        data: {
            name: string;
            index: number;
        }[];
        op: "add";
    }, {
        data: {
            name: string;
            index?: any;
        }[];
        op: "add";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        permissions: z.ZodArray<z.ZodEffects<z.ZodTypeAny, number, any>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "remove";
        permissions: number[];
    }, {
        op: "remove";
        permissions: any[];
    }>]>>;
    permission: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodLiteral<"add entity">;
        entities: z.ZodArray<z.ZodObject<{
            address: z.ZodObject<{
                name_or_address: z.ZodOptional<z.ZodString>;
                local_mark_first: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }>;
            permissions: z.ZodArray<z.ZodObject<{
                index: z.ZodEffects<z.ZodTypeAny, number, any>;
                guard: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                index: number;
                guard?: string | undefined;
            }, {
                guard?: string | undefined;
                index?: any;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            permissions: {
                index: number;
                guard?: string | undefined;
            }[];
        }, {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            permissions: {
                guard?: string | undefined;
                index?: any;
            }[];
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "add entity";
        entities: {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            permissions: {
                index: number;
                guard?: string | undefined;
            }[];
        }[];
    }, {
        op: "add entity";
        entities: {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            permissions: {
                guard?: string | undefined;
                index?: any;
            }[];
        }[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"add permission">;
        permissions: z.ZodArray<z.ZodObject<{
            index: z.ZodEffects<z.ZodTypeAny, number, any>;
            entities: z.ZodArray<z.ZodObject<{
                address: z.ZodObject<{
                    name_or_address: z.ZodOptional<z.ZodString>;
                    local_mark_first: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }>;
                guard: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                guard?: string | undefined;
            }, {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                guard?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            index: number;
            entities: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                guard?: string | undefined;
            }[];
        }, {
            entities: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                guard?: string | undefined;
            }[];
            index?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "add permission";
        permissions: {
            index: number;
            entities: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                guard?: string | undefined;
            }[];
        }[];
    }, {
        op: "add permission";
        permissions: {
            entities: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                guard?: string | undefined;
            }[];
            index?: any;
        }[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove entity">;
        addresses: z.ZodArray<z.ZodObject<{
            name_or_address: z.ZodOptional<z.ZodString>;
            local_mark_first: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "remove entity";
        addresses: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }[];
    }, {
        op: "remove entity";
        addresses: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove permission">;
        address: z.ZodObject<{
            name_or_address: z.ZodOptional<z.ZodString>;
            local_mark_first: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }>;
        index: z.ZodArray<z.ZodEffects<z.ZodTypeAny, number, any>, "many">;
    }, "strip", z.ZodTypeAny, {
        address: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        index: number[];
        op: "remove permission";
    }, {
        address: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        index: any[];
        op: "remove permission";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"transfer permission">;
        from: z.ZodObject<{
            name_or_address: z.ZodOptional<z.ZodString>;
            local_mark_first: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }>;
        to: z.ZodObject<{
            name_or_address: z.ZodOptional<z.ZodString>;
            local_mark_first: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        from: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        to: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        op: "transfer permission";
    }, {
        from: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        to: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        op: "transfer permission";
    }>]>>;
    admin: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodUnion<[z.ZodLiteral<"add">, z.ZodLiteral<"remove">, z.ZodLiteral<"set">]>;
        addresses: z.ZodArray<z.ZodObject<{
            name_or_address: z.ZodOptional<z.ZodString>;
            local_mark_first: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "set" | "add" | "remove";
        addresses: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }[];
    }, {
        op: "set" | "add" | "remove";
        addresses: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>]>>;
    builder: z.ZodOptional<z.ZodObject<{
        name_or_address: z.ZodOptional<z.ZodString>;
        local_mark_first: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name_or_address?: string | undefined;
        local_mark_first?: boolean | undefined;
    }, {
        name_or_address?: string | undefined;
        local_mark_first?: boolean | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    object: string | {
        tags?: string[] | undefined;
        name?: string | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    };
    admin?: {
        op: "set" | "add" | "remove";
        addresses: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }[];
    } | {
        op: "removeall";
    } | undefined;
    description?: string | undefined;
    permission?: {
        op: "add entity";
        entities: {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            permissions: {
                index: number;
                guard?: string | undefined;
            }[];
        }[];
    } | {
        op: "add permission";
        permissions: {
            index: number;
            entities: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                guard?: string | undefined;
            }[];
        }[];
    } | {
        op: "remove entity";
        addresses: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }[];
    } | {
        address: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        index: number[];
        op: "remove permission";
    } | {
        from: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        to: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        op: "transfer permission";
    } | undefined;
    biz_permission?: {
        data: {
            name: string;
            index: number;
        }[];
        op: "add";
    } | {
        op: "remove";
        permissions: number[];
    } | undefined;
    builder?: {
        name_or_address?: string | undefined;
        local_mark_first?: boolean | undefined;
    } | undefined;
}, {
    object: string | {
        tags?: string[] | undefined;
        name?: string | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    };
    admin?: {
        op: "set" | "add" | "remove";
        addresses: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }[];
    } | {
        op: "removeall";
    } | undefined;
    description?: string | undefined;
    permission?: {
        op: "add entity";
        entities: {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            permissions: {
                guard?: string | undefined;
                index?: any;
            }[];
        }[];
    } | {
        op: "add permission";
        permissions: {
            entities: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                guard?: string | undefined;
            }[];
            index?: any;
        }[];
    } | {
        op: "remove entity";
        addresses: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }[];
    } | {
        address: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        index: any[];
        op: "remove permission";
    } | {
        from: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        to: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        op: "transfer permission";
    } | undefined;
    biz_permission?: {
        data: {
            name: string;
            index?: any;
        }[];
        op: "add";
    } | {
        op: "remove";
        permissions: any[];
    } | undefined;
    builder?: {
        name_or_address?: string | undefined;
        local_mark_first?: boolean | undefined;
    } | undefined;
}>;
export declare const RepositoryAddressID: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodObject<{
    name_or_address: z.ZodOptional<z.ZodString>;
    local_mark_first: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    name_or_address?: string | undefined;
    local_mark_first?: boolean | undefined;
}, {
    name_or_address?: string | undefined;
    local_mark_first?: boolean | undefined;
}>]>;
export declare const PayParamSchema: z.ZodObject<{
    index: z.ZodUnion<[z.ZodDefault<z.ZodNumber>, z.ZodBigInt, z.ZodString]>;
    remark: z.ZodString;
    for_object: z.ZodOptional<z.ZodString>;
    for_guard: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    remark: string;
    index: string | number | bigint;
    for_object?: string | undefined;
    for_guard?: string | undefined;
}, {
    remark: string;
    for_object?: string | undefined;
    for_guard?: string | undefined;
    index?: string | number | bigint | undefined;
}>;
export declare const RepositoryTypedDataSchema: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<WOWOK.RepositoryValueType.PositiveNumber>;
    data: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
}, "strip", z.ZodTypeAny, {
    type: WOWOK.RepositoryValueType.PositiveNumber;
    data: string | number;
}, {
    type: WOWOK.RepositoryValueType.PositiveNumber;
    data: string | number;
}>, z.ZodObject<{
    type: z.ZodLiteral<WOWOK.RepositoryValueType.String>;
    data: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: WOWOK.RepositoryValueType.String;
    data: string;
}, {
    type: WOWOK.RepositoryValueType.String;
    data: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<WOWOK.RepositoryValueType.PositiveNumber_Vec>;
    data: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
}, "strip", z.ZodTypeAny, {
    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
    data: (string | number)[];
}, {
    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
    data: (string | number)[];
}>, z.ZodObject<{
    type: z.ZodLiteral<WOWOK.RepositoryValueType.String_Vec>;
    data: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    type: WOWOK.RepositoryValueType.String_Vec;
    data: string[];
}, {
    type: WOWOK.RepositoryValueType.String_Vec;
    data: string[];
}>, z.ZodObject<{
    type: z.ZodLiteral<WOWOK.RepositoryValueType.Address>;
    data: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodObject<{
        name_or_address: z.ZodOptional<z.ZodString>;
        local_mark_first: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name_or_address?: string | undefined;
        local_mark_first?: boolean | undefined;
    }, {
        name_or_address?: string | undefined;
        local_mark_first?: boolean | undefined;
    }>]>;
}, "strip", z.ZodTypeAny, {
    type: WOWOK.RepositoryValueType.Address;
    data: number | bigint | {
        name_or_address?: string | undefined;
        local_mark_first?: boolean | undefined;
    };
}, {
    type: WOWOK.RepositoryValueType.Address;
    data: number | bigint | {
        name_or_address?: string | undefined;
        local_mark_first?: boolean | undefined;
    };
}>, z.ZodObject<{
    type: z.ZodLiteral<WOWOK.RepositoryValueType.Address_Vec>;
    data: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodObject<{
        name_or_address: z.ZodOptional<z.ZodString>;
        local_mark_first: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name_or_address?: string | undefined;
        local_mark_first?: boolean | undefined;
    }, {
        name_or_address?: string | undefined;
        local_mark_first?: boolean | undefined;
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    type: WOWOK.RepositoryValueType.Address_Vec;
    data: (number | bigint | {
        name_or_address?: string | undefined;
        local_mark_first?: boolean | undefined;
    })[];
}, {
    type: WOWOK.RepositoryValueType.Address_Vec;
    data: (number | bigint | {
        name_or_address?: string | undefined;
        local_mark_first?: boolean | undefined;
    })[];
}>, z.ZodObject<{
    type: z.ZodLiteral<WOWOK.RepositoryValueType.Bool>;
    data: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    type: WOWOK.RepositoryValueType.Bool;
    data: boolean;
}, {
    type: WOWOK.RepositoryValueType.Bool;
    data: boolean;
}>]>;
export declare const CallRepositoryDataSchema: z.ZodObject<{
    object: z.ZodUnion<[z.ZodString, z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
        onChain: z.ZodOptional<z.ZodBoolean>;
    } & {
        permission: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        } & {
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }, {
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }>]>;
    data: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodLiteral<"add_by_key">;
        data: z.ZodObject<{
            key: z.ZodString;
            data: z.ZodArray<z.ZodObject<{
                address: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodObject<{
                    name_or_address: z.ZodOptional<z.ZodString>;
                    local_mark_first: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }>]>;
                data: z.ZodUnion<[z.ZodObject<{
                    type: z.ZodLiteral<WOWOK.RepositoryValueType.PositiveNumber>;
                    data: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
                }, "strip", z.ZodTypeAny, {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                }, {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                }>, z.ZodObject<{
                    type: z.ZodLiteral<WOWOK.RepositoryValueType.String>;
                    data: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                }, {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                }>, z.ZodObject<{
                    type: z.ZodLiteral<WOWOK.RepositoryValueType.PositiveNumber_Vec>;
                    data: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
                }, "strip", z.ZodTypeAny, {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                }, {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                }>, z.ZodObject<{
                    type: z.ZodLiteral<WOWOK.RepositoryValueType.String_Vec>;
                    data: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                }, {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                }>, z.ZodObject<{
                    type: z.ZodLiteral<WOWOK.RepositoryValueType.Address>;
                    data: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodObject<{
                        name_or_address: z.ZodOptional<z.ZodString>;
                        local_mark_first: z.ZodOptional<z.ZodBoolean>;
                    }, "strip", z.ZodTypeAny, {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    }, {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                }, {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                }>, z.ZodObject<{
                    type: z.ZodLiteral<WOWOK.RepositoryValueType.Address_Vec>;
                    data: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodObject<{
                        name_or_address: z.ZodOptional<z.ZodString>;
                        local_mark_first: z.ZodOptional<z.ZodBoolean>;
                    }, "strip", z.ZodTypeAny, {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    }, {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    }>]>, "many">;
                }, "strip", z.ZodTypeAny, {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                }, {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                }>, z.ZodObject<{
                    type: z.ZodLiteral<WOWOK.RepositoryValueType.Bool>;
                    data: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                }, {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                data: {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                } | {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                } | {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                } | {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                } | {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                } | {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                } | {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                };
            }, {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                data: {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                } | {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                } | {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                } | {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                } | {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                } | {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                } | {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                };
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                data: {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                } | {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                } | {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                } | {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                } | {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                } | {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                } | {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                };
            }[];
            key: string;
        }, {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                data: {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                } | {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                } | {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                } | {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                } | {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                } | {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                } | {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                };
            }[];
            key: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                data: {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                } | {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                } | {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                } | {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                } | {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                } | {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                } | {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                };
            }[];
            key: string;
        };
        op: "add_by_key";
    }, {
        data: {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                data: {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                } | {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                } | {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                } | {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                } | {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                } | {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                } | {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                };
            }[];
            key: string;
        };
        op: "add_by_key";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"add_by_address">;
        data: z.ZodObject<{
            address: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodObject<{
                name_or_address: z.ZodOptional<z.ZodString>;
                local_mark_first: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }>]>;
            data: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                data: z.ZodUnion<[z.ZodObject<{
                    type: z.ZodLiteral<WOWOK.RepositoryValueType.PositiveNumber>;
                    data: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
                }, "strip", z.ZodTypeAny, {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                }, {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                }>, z.ZodObject<{
                    type: z.ZodLiteral<WOWOK.RepositoryValueType.String>;
                    data: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                }, {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                }>, z.ZodObject<{
                    type: z.ZodLiteral<WOWOK.RepositoryValueType.PositiveNumber_Vec>;
                    data: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
                }, "strip", z.ZodTypeAny, {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                }, {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                }>, z.ZodObject<{
                    type: z.ZodLiteral<WOWOK.RepositoryValueType.String_Vec>;
                    data: z.ZodArray<z.ZodString, "many">;
                }, "strip", z.ZodTypeAny, {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                }, {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                }>, z.ZodObject<{
                    type: z.ZodLiteral<WOWOK.RepositoryValueType.Address>;
                    data: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodObject<{
                        name_or_address: z.ZodOptional<z.ZodString>;
                        local_mark_first: z.ZodOptional<z.ZodBoolean>;
                    }, "strip", z.ZodTypeAny, {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    }, {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                }, {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                }>, z.ZodObject<{
                    type: z.ZodLiteral<WOWOK.RepositoryValueType.Address_Vec>;
                    data: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodObject<{
                        name_or_address: z.ZodOptional<z.ZodString>;
                        local_mark_first: z.ZodOptional<z.ZodBoolean>;
                    }, "strip", z.ZodTypeAny, {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    }, {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    }>]>, "many">;
                }, "strip", z.ZodTypeAny, {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                }, {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                }>, z.ZodObject<{
                    type: z.ZodLiteral<WOWOK.RepositoryValueType.Bool>;
                    data: z.ZodBoolean;
                }, "strip", z.ZodTypeAny, {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                }, {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                data: {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                } | {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                } | {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                } | {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                } | {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                } | {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                } | {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                };
                key: string;
            }, {
                data: {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                } | {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                } | {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                } | {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                } | {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                } | {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                } | {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                };
                key: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            address: number | bigint | {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            data: {
                data: {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                } | {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                } | {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                } | {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                } | {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                } | {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                } | {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                };
                key: string;
            }[];
        }, {
            address: number | bigint | {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            data: {
                data: {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                } | {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                } | {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                } | {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                } | {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                } | {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                } | {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                };
                key: string;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        data: {
            address: number | bigint | {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            data: {
                data: {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                } | {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                } | {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                } | {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                } | {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                } | {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                } | {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                };
                key: string;
            }[];
        };
        op: "add_by_address";
    }, {
        data: {
            address: number | bigint | {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            data: {
                data: {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                } | {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                } | {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                } | {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                } | {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                } | {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                } | {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                };
                key: string;
            }[];
        };
        op: "add_by_address";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        data: z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            address: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodObject<{
                name_or_address: z.ZodOptional<z.ZodString>;
                local_mark_first: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            address: number | bigint | {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            key: string;
        }, {
            address: number | bigint | {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            key: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        data: {
            address: number | bigint | {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            key: string;
        }[];
        op: "remove";
    }, {
        data: {
            address: number | bigint | {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            key: string;
        }[];
        op: "remove";
    }>]>>;
    description: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodUnion<[z.ZodLiteral<"set">, z.ZodLiteral<"remove">, z.ZodLiteral<"add">]>;
        objects: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        objects: string[];
        op: "set" | "add" | "remove";
    }, {
        objects: string[];
        op: "set" | "add" | "remove";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>]>>;
    mode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<WOWOK.Repository_Policy_Mode.POLICY_MODE_FREE>, z.ZodLiteral<WOWOK.Repository_Policy_Mode.POLICY_MODE_STRICT>]>>;
    policy: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodUnion<[z.ZodLiteral<"add">, z.ZodLiteral<"set">]>;
        data: z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            description: z.ZodString;
            dataType: z.ZodUnion<[z.ZodLiteral<WOWOK.RepositoryValueType.Address>, z.ZodLiteral<WOWOK.RepositoryValueType.Address_Vec>, z.ZodLiteral<WOWOK.RepositoryValueType.String>, z.ZodLiteral<WOWOK.RepositoryValueType.String_Vec>, z.ZodLiteral<WOWOK.RepositoryValueType.PositiveNumber>, z.ZodLiteral<WOWOK.RepositoryValueType.PositiveNumber_Vec>, z.ZodLiteral<WOWOK.RepositoryValueType.Bool>]>;
            permissionIndex: z.ZodNullable<z.ZodOptional<z.ZodEffects<z.ZodTypeAny, number, any>>>;
            guard: z.ZodOptional<z.ZodObject<{
                object: z.ZodNullable<z.ZodString>;
                id_from_guard: z.ZodOptional<z.ZodNumber>;
            }, "strip", z.ZodTypeAny, {
                object: string | null;
                id_from_guard?: number | undefined;
            }, {
                object: string | null;
                id_from_guard?: number | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            description: string;
            dataType: WOWOK.RepositoryValueType;
            key: string;
            guard?: {
                object: string | null;
                id_from_guard?: number | undefined;
            } | undefined;
            permissionIndex?: number | null | undefined;
        }, {
            description: string;
            dataType: WOWOK.RepositoryValueType;
            key: string;
            guard?: {
                object: string | null;
                id_from_guard?: number | undefined;
            } | undefined;
            permissionIndex?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        data: {
            description: string;
            dataType: WOWOK.RepositoryValueType;
            key: string;
            guard?: {
                object: string | null;
                id_from_guard?: number | undefined;
            } | undefined;
            permissionIndex?: number | null | undefined;
        }[];
        op: "set" | "add";
    }, {
        data: {
            description: string;
            dataType: WOWOK.RepositoryValueType;
            key: string;
            guard?: {
                object: string | null;
                id_from_guard?: number | undefined;
            } | undefined;
            permissionIndex?: any;
        }[];
        op: "set" | "add";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        keys: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        keys: string[];
        op: "remove";
    }, {
        keys: string[];
        op: "remove";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"rename">;
        data: z.ZodArray<z.ZodObject<{
            old: z.ZodString;
            new: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            new: string;
            old: string;
        }, {
            new: string;
            old: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        data: {
            new: string;
            old: string;
        }[];
        op: "rename";
    }, {
        data: {
            new: string;
            old: string;
        }[];
        op: "rename";
    }>]>>;
    guard: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    object: string | {
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    };
    reference?: {
        objects: string[];
        op: "set" | "add" | "remove";
    } | {
        op: "removeall";
    } | undefined;
    description?: string | undefined;
    guard?: string | null | undefined;
    data?: {
        data: {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                data: {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                } | {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                } | {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                } | {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                } | {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                } | {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                } | {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                };
            }[];
            key: string;
        };
        op: "add_by_key";
    } | {
        data: {
            address: number | bigint | {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            data: {
                data: {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                } | {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                } | {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                } | {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                } | {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                } | {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                } | {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                };
                key: string;
            }[];
        };
        op: "add_by_address";
    } | {
        data: {
            address: number | bigint | {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            key: string;
        }[];
        op: "remove";
    } | undefined;
    mode?: WOWOK.Repository_Policy_Mode | undefined;
    policy?: {
        data: {
            description: string;
            dataType: WOWOK.RepositoryValueType;
            key: string;
            guard?: {
                object: string | null;
                id_from_guard?: number | undefined;
            } | undefined;
            permissionIndex?: number | null | undefined;
        }[];
        op: "set" | "add";
    } | {
        keys: string[];
        op: "remove";
    } | {
        op: "removeall";
    } | {
        data: {
            new: string;
            old: string;
        }[];
        op: "rename";
    } | undefined;
}, {
    object: string | {
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    };
    reference?: {
        objects: string[];
        op: "set" | "add" | "remove";
    } | {
        op: "removeall";
    } | undefined;
    description?: string | undefined;
    guard?: string | null | undefined;
    data?: {
        data: {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                data: {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                } | {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                } | {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                } | {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                } | {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                } | {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                } | {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                };
            }[];
            key: string;
        };
        op: "add_by_key";
    } | {
        data: {
            address: number | bigint | {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            data: {
                data: {
                    type: WOWOK.RepositoryValueType.PositiveNumber;
                    data: string | number;
                } | {
                    type: WOWOK.RepositoryValueType.String;
                    data: string;
                } | {
                    type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                    data: (string | number)[];
                } | {
                    type: WOWOK.RepositoryValueType.String_Vec;
                    data: string[];
                } | {
                    type: WOWOK.RepositoryValueType.Address;
                    data: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                } | {
                    type: WOWOK.RepositoryValueType.Address_Vec;
                    data: (number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    })[];
                } | {
                    type: WOWOK.RepositoryValueType.Bool;
                    data: boolean;
                };
                key: string;
            }[];
        };
        op: "add_by_address";
    } | {
        data: {
            address: number | bigint | {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            key: string;
        }[];
        op: "remove";
    } | undefined;
    mode?: WOWOK.Repository_Policy_Mode | undefined;
    policy?: {
        data: {
            description: string;
            dataType: WOWOK.RepositoryValueType;
            key: string;
            guard?: {
                object: string | null;
                id_from_guard?: number | undefined;
            } | undefined;
            permissionIndex?: any;
        }[];
        op: "set" | "add";
    } | {
        keys: string[];
        op: "remove";
    } | {
        op: "removeall";
    } | {
        data: {
            new: string;
            old: string;
        }[];
        op: "rename";
    } | undefined;
}>;
export declare const CallArbitrationDataSchema: z.ZodObject<{
    object: z.ZodUnion<[z.ZodString, z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
        onChain: z.ZodOptional<z.ZodBoolean>;
    } & {
        permission: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        } & {
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>]>>;
    } & {
        type_parameter: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type_parameter: string;
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }, {
        type_parameter: string;
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }>]>;
    arb_new: z.ZodOptional<z.ZodObject<{
        data: z.ZodObject<{
            order: z.ZodString;
            description: z.ZodString;
            votable_proposition: z.ZodArray<z.ZodString, "many">;
            max_fee: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        }, "strip", z.ZodTypeAny, {
            description: string;
            order: string;
            votable_proposition: string[];
            max_fee?: string | number | undefined;
        }, {
            description: string;
            order: string;
            votable_proposition: string[];
            max_fee?: string | number | undefined;
        }>;
        namedNew: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        data: {
            description: string;
            order: string;
            votable_proposition: string[];
            max_fee?: string | number | undefined;
        };
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    }, {
        data: {
            description: string;
            order: string;
            votable_proposition: string[];
            max_fee?: string | number | undefined;
        };
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    }>>;
    arb_withdraw_fee: z.ZodOptional<z.ZodObject<{
        arb: z.ZodString;
        data: z.ZodObject<{
            index: z.ZodUnion<[z.ZodDefault<z.ZodNumber>, z.ZodBigInt, z.ZodString]>;
            remark: z.ZodString;
            for_object: z.ZodOptional<z.ZodString>;
            for_guard: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            remark: string;
            index: string | number | bigint;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        }, {
            remark: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
            index?: string | number | bigint | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        arb: string;
        data: {
            remark: string;
            index: string | number | bigint;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        };
    }, {
        arb: string;
        data: {
            remark: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
            index?: string | number | bigint | undefined;
        };
    }>>;
    arb_vote: z.ZodOptional<z.ZodObject<{
        arb: z.ZodString;
        voting_guard: z.ZodString;
        agrees: z.ZodArray<z.ZodNumber, "many">;
    }, "strip", z.ZodTypeAny, {
        arb: string;
        voting_guard: string;
        agrees: number[];
    }, {
        arb: string;
        voting_guard: string;
        agrees: number[];
    }>>;
    arb_arbitration: z.ZodOptional<z.ZodObject<{
        arb: z.ZodString;
        feedback: z.ZodString;
        indemnity: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    }, "strip", z.ZodTypeAny, {
        arb: string;
        feedback: string;
        indemnity?: string | number | null | undefined;
    }, {
        arb: string;
        feedback: string;
        indemnity?: string | number | null | undefined;
    }>>;
    description: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    endpoint: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    fee: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    fee_treasury: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
        onChain: z.ZodOptional<z.ZodBoolean>;
    } & {
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        tags?: string[] | undefined;
        name?: string | undefined;
        description?: string | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }, {
        tags?: string[] | undefined;
        name?: string | undefined;
        description?: string | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }>]>>;
    guard: z.ZodOptional<z.ZodString>;
    voting_guard: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodUnion<[z.ZodLiteral<"add">, z.ZodLiteral<"set">]>;
        data: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            voting_weight: z.ZodDefault<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        }, "strip", z.ZodTypeAny, {
            guard: string;
            voting_weight: string | number;
        }, {
            guard: string;
            voting_weight?: string | number | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        data: {
            guard: string;
            voting_weight: string | number;
        }[];
        op: "set" | "add";
    }, {
        data: {
            guard: string;
            voting_weight?: string | number | undefined;
        }[];
        op: "set" | "add";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        guards: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        op: "remove";
    }, {
        guards: string[];
        op: "remove";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>]>>;
    bPaused: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    object: string | {
        type_parameter: string;
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    };
    description?: string | undefined;
    guard?: string | undefined;
    arb_new?: {
        data: {
            description: string;
            order: string;
            votable_proposition: string[];
            max_fee?: string | number | undefined;
        };
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    } | undefined;
    location?: string | undefined;
    endpoint?: string | null | undefined;
    bPaused?: boolean | undefined;
    arb_withdraw_fee?: {
        arb: string;
        data: {
            remark: string;
            index: string | number | bigint;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        };
    } | undefined;
    voting_guard?: {
        data: {
            guard: string;
            voting_weight: string | number;
        }[];
        op: "set" | "add";
    } | {
        guards: string[];
        op: "remove";
    } | {
        op: "removeall";
    } | undefined;
    arb_vote?: {
        arb: string;
        voting_guard: string;
        agrees: number[];
    } | undefined;
    arb_arbitration?: {
        arb: string;
        feedback: string;
        indemnity?: string | number | null | undefined;
    } | undefined;
    fee?: string | number | undefined;
    fee_treasury?: string | {
        tags?: string[] | undefined;
        name?: string | undefined;
        description?: string | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    } | undefined;
}, {
    object: string | {
        type_parameter: string;
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    };
    description?: string | undefined;
    guard?: string | undefined;
    arb_new?: {
        data: {
            description: string;
            order: string;
            votable_proposition: string[];
            max_fee?: string | number | undefined;
        };
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    } | undefined;
    location?: string | undefined;
    endpoint?: string | null | undefined;
    bPaused?: boolean | undefined;
    arb_withdraw_fee?: {
        arb: string;
        data: {
            remark: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
            index?: string | number | bigint | undefined;
        };
    } | undefined;
    voting_guard?: {
        data: {
            guard: string;
            voting_weight?: string | number | undefined;
        }[];
        op: "set" | "add";
    } | {
        guards: string[];
        op: "remove";
    } | {
        op: "removeall";
    } | undefined;
    arb_vote?: {
        arb: string;
        voting_guard: string;
        agrees: number[];
    } | undefined;
    arb_arbitration?: {
        arb: string;
        feedback: string;
        indemnity?: string | number | null | undefined;
    } | undefined;
    fee?: string | number | undefined;
    fee_treasury?: string | {
        tags?: string[] | undefined;
        name?: string | undefined;
        description?: string | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    } | undefined;
}>;
export declare const ReceiverParamSchema: z.ZodObject<{
    address: z.ZodObject<{
        name_or_address: z.ZodOptional<z.ZodString>;
        local_mark_first: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name_or_address?: string | undefined;
        local_mark_first?: boolean | undefined;
    }, {
        name_or_address?: string | undefined;
        local_mark_first?: boolean | undefined;
    }>;
    amount: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
}, "strip", z.ZodTypeAny, {
    address: {
        name_or_address?: string | undefined;
        local_mark_first?: boolean | undefined;
    };
    amount: string | number;
}, {
    address: {
        name_or_address?: string | undefined;
        local_mark_first?: boolean | undefined;
    };
    amount: string | number;
}>;
export declare const TreasuryWithdrawParamSchema: z.ZodObject<{
    index: z.ZodUnion<[z.ZodDefault<z.ZodNumber>, z.ZodBigInt, z.ZodString]>;
    remark: z.ZodString;
    for_object: z.ZodOptional<z.ZodString>;
    for_guard: z.ZodOptional<z.ZodString>;
} & {
    receiver: z.ZodArray<z.ZodObject<{
        address: z.ZodObject<{
            name_or_address: z.ZodOptional<z.ZodString>;
            local_mark_first: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }>;
        amount: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    }, "strip", z.ZodTypeAny, {
        address: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        amount: string | number;
    }, {
        address: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        amount: string | number;
    }>, "many">;
    withdraw_guard: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    remark: string;
    index: string | number | bigint;
    receiver: {
        address: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        amount: string | number;
    }[];
    for_object?: string | undefined;
    for_guard?: string | undefined;
    withdraw_guard?: string | undefined;
}, {
    remark: string;
    receiver: {
        address: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        amount: string | number;
    }[];
    for_object?: string | undefined;
    for_guard?: string | undefined;
    index?: string | number | bigint | undefined;
    withdraw_guard?: string | undefined;
}>;
export declare const CallTreasuryDataSchema: z.ZodObject<{
    object: z.ZodUnion<[z.ZodString, z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
        onChain: z.ZodOptional<z.ZodBoolean>;
    } & {
        permission: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        } & {
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>]>>;
    } & {
        type_parameter: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type_parameter: string;
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }, {
        type_parameter: string;
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }>]>;
    deposit: z.ZodOptional<z.ZodObject<{
        balance: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        param: z.ZodOptional<z.ZodObject<{
            index: z.ZodUnion<[z.ZodDefault<z.ZodNumber>, z.ZodBigInt, z.ZodString]>;
            remark: z.ZodString;
            for_object: z.ZodOptional<z.ZodString>;
            for_guard: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            remark: string;
            index: string | number | bigint;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        }, {
            remark: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
            index?: string | number | bigint | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        balance: string | number;
        param?: {
            remark: string;
            index: string | number | bigint;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        } | undefined;
    }, {
        balance: string | number;
        param?: {
            remark: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
            index?: string | number | bigint | undefined;
        } | undefined;
    }>>;
    receive: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        received_objects: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        received_objects: string[];
    }, {
        received_objects: string[];
    }>, z.ZodLiteral<"recently">]>>;
    withdraw: z.ZodOptional<z.ZodObject<{
        index: z.ZodUnion<[z.ZodDefault<z.ZodNumber>, z.ZodBigInt, z.ZodString]>;
        remark: z.ZodString;
        for_object: z.ZodOptional<z.ZodString>;
        for_guard: z.ZodOptional<z.ZodString>;
    } & {
        receiver: z.ZodArray<z.ZodObject<{
            address: z.ZodObject<{
                name_or_address: z.ZodOptional<z.ZodString>;
                local_mark_first: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }>;
            amount: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        }, "strip", z.ZodTypeAny, {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            amount: string | number;
        }, {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            amount: string | number;
        }>, "many">;
        withdraw_guard: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        remark: string;
        index: string | number | bigint;
        receiver: {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            amount: string | number;
        }[];
        for_object?: string | undefined;
        for_guard?: string | undefined;
        withdraw_guard?: string | undefined;
    }, {
        remark: string;
        receiver: {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            amount: string | number;
        }[];
        for_object?: string | undefined;
        for_guard?: string | undefined;
        index?: string | number | bigint | undefined;
        withdraw_guard?: string | undefined;
    }>>;
    description: z.ZodOptional<z.ZodString>;
    deposit_guard: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    withdraw_guard: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodUnion<[z.ZodLiteral<"add">, z.ZodLiteral<"set">]>;
        data: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            max_withdrawal_amount: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        }, "strip", z.ZodTypeAny, {
            guard: string;
            max_withdrawal_amount: string | number;
        }, {
            guard: string;
            max_withdrawal_amount: string | number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        data: {
            guard: string;
            max_withdrawal_amount: string | number;
        }[];
        op: "set" | "add";
    }, {
        data: {
            guard: string;
            max_withdrawal_amount: string | number;
        }[];
        op: "set" | "add";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        guards: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        op: "remove";
    }, {
        guards: string[];
        op: "remove";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>]>>;
    withdraw_mode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<WOWOK.Treasury_WithdrawMode.PERMISSION>, z.ZodLiteral<WOWOK.Treasury_WithdrawMode.GUARD_ONLY_AND_IMMUTABLE>, z.ZodLiteral<WOWOK.Treasury_WithdrawMode.BOTH_PERMISSION_AND_GUARD>]>>;
}, "strip", z.ZodTypeAny, {
    object: string | {
        type_parameter: string;
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    };
    description?: string | undefined;
    withdraw?: {
        remark: string;
        index: string | number | bigint;
        receiver: {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            amount: string | number;
        }[];
        for_object?: string | undefined;
        for_guard?: string | undefined;
        withdraw_guard?: string | undefined;
    } | undefined;
    deposit?: {
        balance: string | number;
        param?: {
            remark: string;
            index: string | number | bigint;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        } | undefined;
    } | undefined;
    withdraw_guard?: {
        data: {
            guard: string;
            max_withdrawal_amount: string | number;
        }[];
        op: "set" | "add";
    } | {
        guards: string[];
        op: "remove";
    } | {
        op: "removeall";
    } | undefined;
    receive?: "recently" | {
        received_objects: string[];
    } | undefined;
    deposit_guard?: string | null | undefined;
    withdraw_mode?: WOWOK.Treasury_WithdrawMode | undefined;
}, {
    object: string | {
        type_parameter: string;
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    };
    description?: string | undefined;
    withdraw?: {
        remark: string;
        receiver: {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            amount: string | number;
        }[];
        for_object?: string | undefined;
        for_guard?: string | undefined;
        index?: string | number | bigint | undefined;
        withdraw_guard?: string | undefined;
    } | undefined;
    deposit?: {
        balance: string | number;
        param?: {
            remark: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
            index?: string | number | bigint | undefined;
        } | undefined;
    } | undefined;
    withdraw_guard?: {
        data: {
            guard: string;
            max_withdrawal_amount: string | number;
        }[];
        op: "set" | "add";
    } | {
        guards: string[];
        op: "remove";
    } | {
        op: "removeall";
    } | undefined;
    receive?: "recently" | {
        received_objects: string[];
    } | undefined;
    deposit_guard?: string | null | undefined;
    withdraw_mode?: WOWOK.Treasury_WithdrawMode | undefined;
}>;
export declare const CallServiceDataSchema: z.ZodObject<{
    object: z.ZodUnion<[z.ZodString, z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
        onChain: z.ZodOptional<z.ZodBoolean>;
    } & {
        permission: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        } & {
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>]>>;
    } & {
        type_parameter: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type_parameter: string;
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }, {
        type_parameter: string;
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }>]>;
    order_new: z.ZodOptional<z.ZodObject<{
        buy_items: z.ZodArray<z.ZodObject<{
            item: z.ZodString;
            max_price: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            count: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        }, "strip", z.ZodTypeAny, {
            item: string;
            max_price: string | number;
            count: string | number;
        }, {
            item: string;
            max_price: string | number;
            count: string | number;
        }>, "many">;
        discount_object: z.ZodOptional<z.ZodString>;
        customer_info_required: z.ZodOptional<z.ZodString>;
        namedNewOrder: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>>;
        namedNewProgress: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        buy_items: {
            item: string;
            max_price: string | number;
            count: string | number;
        }[];
        discount_object?: string | undefined;
        customer_info_required?: string | undefined;
        namedNewOrder?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        namedNewProgress?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    }, {
        buy_items: {
            item: string;
            max_price: string | number;
            count: string | number;
        }[];
        discount_object?: string | undefined;
        customer_info_required?: string | undefined;
        namedNewOrder?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        namedNewProgress?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    }>>;
    order_receive: z.ZodOptional<z.ZodObject<{
        order: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        order: string;
    }, {
        order: string;
    }>>;
    order_agent: z.ZodOptional<z.ZodObject<{
        order: z.ZodOptional<z.ZodString>;
        agents: z.ZodArray<z.ZodObject<{
            name_or_address: z.ZodOptional<z.ZodString>;
            local_mark_first: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        agents: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }[];
        order?: string | undefined;
    }, {
        agents: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }[];
        order?: string | undefined;
    }>>;
    order_required_info: z.ZodOptional<z.ZodObject<{
        order: z.ZodString;
        customer_info_required: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        order: string;
        customer_info_required?: string | undefined;
    }, {
        order: string;
        customer_info_required?: string | undefined;
    }>>;
    order_refund: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        order: z.ZodString;
        arb: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        arb: string;
        order: string;
    }, {
        arb: string;
        order: string;
    }>, z.ZodObject<{
        order: z.ZodString;
        refund_guard: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        order: string;
        refund_guard: string;
    }, {
        order: string;
        refund_guard: string;
    }>]>>;
    order_withdrawl: z.ZodOptional<z.ZodObject<{
        order: z.ZodString;
        data: z.ZodObject<{
            index: z.ZodUnion<[z.ZodDefault<z.ZodNumber>, z.ZodBigInt, z.ZodString]>;
            remark: z.ZodString;
            for_object: z.ZodOptional<z.ZodString>;
            for_guard: z.ZodOptional<z.ZodString>;
        } & {
            withdraw_guard: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            remark: string;
            index: string | number | bigint;
            withdraw_guard: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        }, {
            remark: string;
            withdraw_guard: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
            index?: string | number | bigint | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        order: string;
        data: {
            remark: string;
            index: string | number | bigint;
            withdraw_guard: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        };
    }, {
        order: string;
        data: {
            remark: string;
            withdraw_guard: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
            index?: string | number | bigint | undefined;
        };
    }>>;
    order_payer: z.ZodOptional<z.ZodObject<{
        order: z.ZodOptional<z.ZodString>;
        payer_new: z.ZodObject<{
            name_or_address: z.ZodOptional<z.ZodString>;
            local_mark_first: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        payer_new: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        order?: string | undefined;
    }, {
        payer_new: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        order?: string | undefined;
    }>>;
    description: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    endpoint: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    payee_treasury: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
        onChain: z.ZodOptional<z.ZodBoolean>;
    } & {
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        tags?: string[] | undefined;
        name?: string | undefined;
        description?: string | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }, {
        tags?: string[] | undefined;
        name?: string | undefined;
        description?: string | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    }>]>>;
    gen_discount: z.ZodOptional<z.ZodArray<z.ZodObject<{
        receiver: z.ZodObject<{
            name_or_address: z.ZodOptional<z.ZodString>;
            local_mark_first: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }>;
        count: z.ZodDefault<z.ZodNumber>;
        discount: z.ZodObject<{
            name: z.ZodDefault<z.ZodString>;
            type: z.ZodUnion<[z.ZodLiteral<WOWOK.Service_Discount_Type.ratio>, z.ZodLiteral<WOWOK.Service_Discount_Type.minus>]>;
            off: z.ZodNumber;
            duration_minutes: z.ZodDefault<z.ZodNumber>;
            time_start: z.ZodOptional<z.ZodNumber>;
            price_greater: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            type: WOWOK.Service_Discount_Type;
            off: number;
            duration_minutes: number;
            time_start?: number | undefined;
            price_greater?: string | number | undefined;
        }, {
            type: WOWOK.Service_Discount_Type;
            off: number;
            name?: string | undefined;
            duration_minutes?: number | undefined;
            time_start?: number | undefined;
            price_greater?: string | number | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        receiver: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        count: number;
        discount: {
            name: string;
            type: WOWOK.Service_Discount_Type;
            off: number;
            duration_minutes: number;
            time_start?: number | undefined;
            price_greater?: string | number | undefined;
        };
    }, {
        receiver: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        discount: {
            type: WOWOK.Service_Discount_Type;
            off: number;
            name?: string | undefined;
            duration_minutes?: number | undefined;
            time_start?: number | undefined;
            price_greater?: string | number | undefined;
        };
        count?: number | undefined;
    }>, "many">>;
    repository: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodUnion<[z.ZodLiteral<"set">, z.ZodLiteral<"remove">, z.ZodLiteral<"add">]>;
        objects: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        objects: string[];
        op: "set" | "add" | "remove";
    }, {
        objects: string[];
        op: "set" | "add" | "remove";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>]>>;
    extern_withdraw_treasury: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodUnion<[z.ZodLiteral<"set">, z.ZodLiteral<"remove">, z.ZodLiteral<"add">]>;
        objects: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        objects: string[];
        op: "set" | "add" | "remove";
    }, {
        objects: string[];
        op: "set" | "add" | "remove";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>]>>;
    machine: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    arbitration: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodUnion<[z.ZodLiteral<"set">, z.ZodLiteral<"remove">, z.ZodLiteral<"add">]>;
        objects: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        objects: string[];
        op: "set" | "add" | "remove";
    }, {
        objects: string[];
        op: "set" | "add" | "remove";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>]>>;
    customer_required_info: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        pubkey: z.ZodString;
        required_info: z.ZodArray<z.ZodUnion<[z.ZodLiteral<WOWOK.BuyRequiredEnum.address>, z.ZodLiteral<WOWOK.BuyRequiredEnum.phone>, z.ZodLiteral<WOWOK.BuyRequiredEnum.postcode>, z.ZodLiteral<WOWOK.BuyRequiredEnum.name>, z.ZodString]>, "many">;
    }, "strip", z.ZodTypeAny, {
        pubkey: string;
        required_info: string[];
    }, {
        pubkey: string;
        required_info: string[];
    }>>>;
    sales: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodLiteral<"add">;
        sales: z.ZodArray<z.ZodObject<{
            item: z.ZodString;
            price: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            stock: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            endpoint: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        }, "strip", z.ZodTypeAny, {
            item: string;
            price: string | number;
            stock: string | number;
            endpoint?: string | null | undefined;
        }, {
            item: string;
            price: string | number;
            stock: string | number;
            endpoint?: string | null | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "add";
        sales: {
            item: string;
            price: string | number;
            stock: string | number;
            endpoint?: string | null | undefined;
        }[];
    }, {
        op: "add";
        sales: {
            item: string;
            price: string | number;
            stock: string | number;
            endpoint?: string | null | undefined;
        }[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        sales_name: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "remove";
        sales_name: string[];
    }, {
        op: "remove";
        sales_name: string[];
    }>]>>;
    withdraw_guard: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodUnion<[z.ZodLiteral<"add">, z.ZodLiteral<"set">]>;
        guards: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            percent: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            guard: string;
            percent: number;
        }, {
            guard: string;
            percent: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: {
            guard: string;
            percent: number;
        }[];
        op: "set" | "add";
    }, {
        guards: {
            guard: string;
            percent: number;
        }[];
        op: "set" | "add";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        guards: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        op: "remove";
    }, {
        guards: string[];
        op: "remove";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>]>>;
    refund_guard: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodUnion<[z.ZodLiteral<"add">, z.ZodLiteral<"set">]>;
        guards: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            percent: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            guard: string;
            percent: number;
        }, {
            guard: string;
            percent: number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: {
            guard: string;
            percent: number;
        }[];
        op: "set" | "add";
    }, {
        guards: {
            guard: string;
            percent: number;
        }[];
        op: "set" | "add";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        guards: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        op: "remove";
    }, {
        guards: string[];
        op: "remove";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>]>>;
    bPublished: z.ZodOptional<z.ZodBoolean>;
    buy_guard: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    bPaused: z.ZodOptional<z.ZodBoolean>;
    clone_new: z.ZodOptional<z.ZodObject<{
        token_type_new: z.ZodOptional<z.ZodString>;
        namedNew: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        token_type_new?: string | undefined;
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    }, {
        token_type_new?: string | undefined;
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    object: string | {
        type_parameter: string;
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    };
    description?: string | undefined;
    machine?: string | null | undefined;
    arbitration?: {
        objects: string[];
        op: "set" | "add" | "remove";
    } | {
        op: "removeall";
    } | undefined;
    withdraw_guard?: {
        guards: {
            guard: string;
            percent: number;
        }[];
        op: "set" | "add";
    } | {
        guards: string[];
        op: "remove";
    } | {
        op: "removeall";
    } | undefined;
    repository?: {
        objects: string[];
        op: "set" | "add" | "remove";
    } | {
        op: "removeall";
    } | undefined;
    refund_guard?: {
        guards: {
            guard: string;
            percent: number;
        }[];
        op: "set" | "add";
    } | {
        guards: string[];
        op: "remove";
    } | {
        op: "removeall";
    } | undefined;
    order_new?: {
        buy_items: {
            item: string;
            max_price: string | number;
            count: string | number;
        }[];
        discount_object?: string | undefined;
        customer_info_required?: string | undefined;
        namedNewOrder?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        namedNewProgress?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    } | undefined;
    order_refund?: {
        arb: string;
        order: string;
    } | {
        order: string;
        refund_guard: string;
    } | undefined;
    order_withdrawl?: {
        order: string;
        data: {
            remark: string;
            index: string | number | bigint;
            withdraw_guard: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        };
    } | undefined;
    location?: string | undefined;
    endpoint?: string | null | undefined;
    bPublished?: boolean | undefined;
    bPaused?: boolean | undefined;
    clone_new?: {
        token_type_new?: string | undefined;
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    } | undefined;
    order_receive?: {
        order: string;
    } | undefined;
    order_agent?: {
        agents: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }[];
        order?: string | undefined;
    } | undefined;
    order_required_info?: {
        order: string;
        customer_info_required?: string | undefined;
    } | undefined;
    order_payer?: {
        payer_new: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        order?: string | undefined;
    } | undefined;
    payee_treasury?: string | {
        tags?: string[] | undefined;
        name?: string | undefined;
        description?: string | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    } | undefined;
    gen_discount?: {
        receiver: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        count: number;
        discount: {
            name: string;
            type: WOWOK.Service_Discount_Type;
            off: number;
            duration_minutes: number;
            time_start?: number | undefined;
            price_greater?: string | number | undefined;
        };
    }[] | undefined;
    extern_withdraw_treasury?: {
        objects: string[];
        op: "set" | "add" | "remove";
    } | {
        op: "removeall";
    } | undefined;
    customer_required_info?: {
        pubkey: string;
        required_info: string[];
    } | null | undefined;
    sales?: {
        op: "add";
        sales: {
            item: string;
            price: string | number;
            stock: string | number;
            endpoint?: string | null | undefined;
        }[];
    } | {
        op: "remove";
        sales_name: string[];
    } | undefined;
    buy_guard?: string | null | undefined;
}, {
    object: string | {
        type_parameter: string;
        tags?: string[] | undefined;
        name?: string | undefined;
        permission?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    };
    description?: string | undefined;
    machine?: string | null | undefined;
    arbitration?: {
        objects: string[];
        op: "set" | "add" | "remove";
    } | {
        op: "removeall";
    } | undefined;
    withdraw_guard?: {
        guards: {
            guard: string;
            percent: number;
        }[];
        op: "set" | "add";
    } | {
        guards: string[];
        op: "remove";
    } | {
        op: "removeall";
    } | undefined;
    repository?: {
        objects: string[];
        op: "set" | "add" | "remove";
    } | {
        op: "removeall";
    } | undefined;
    refund_guard?: {
        guards: {
            guard: string;
            percent: number;
        }[];
        op: "set" | "add";
    } | {
        guards: string[];
        op: "remove";
    } | {
        op: "removeall";
    } | undefined;
    order_new?: {
        buy_items: {
            item: string;
            max_price: string | number;
            count: string | number;
        }[];
        discount_object?: string | undefined;
        customer_info_required?: string | undefined;
        namedNewOrder?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        namedNewProgress?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    } | undefined;
    order_refund?: {
        arb: string;
        order: string;
    } | {
        order: string;
        refund_guard: string;
    } | undefined;
    order_withdrawl?: {
        order: string;
        data: {
            remark: string;
            withdraw_guard: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
            index?: string | number | bigint | undefined;
        };
    } | undefined;
    location?: string | undefined;
    endpoint?: string | null | undefined;
    bPublished?: boolean | undefined;
    bPaused?: boolean | undefined;
    clone_new?: {
        token_type_new?: string | undefined;
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    } | undefined;
    order_receive?: {
        order: string;
    } | undefined;
    order_agent?: {
        agents: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }[];
        order?: string | undefined;
    } | undefined;
    order_required_info?: {
        order: string;
        customer_info_required?: string | undefined;
    } | undefined;
    order_payer?: {
        payer_new: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        order?: string | undefined;
    } | undefined;
    payee_treasury?: string | {
        tags?: string[] | undefined;
        name?: string | undefined;
        description?: string | undefined;
        onChain?: boolean | undefined;
        useAddressIfNameExist?: boolean | undefined;
    } | undefined;
    gen_discount?: {
        receiver: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        discount: {
            type: WOWOK.Service_Discount_Type;
            off: number;
            name?: string | undefined;
            duration_minutes?: number | undefined;
            time_start?: number | undefined;
            price_greater?: string | number | undefined;
        };
        count?: number | undefined;
    }[] | undefined;
    extern_withdraw_treasury?: {
        objects: string[];
        op: "set" | "add" | "remove";
    } | {
        op: "removeall";
    } | undefined;
    customer_required_info?: {
        pubkey: string;
        required_info: string[];
    } | null | undefined;
    sales?: {
        op: "add";
        sales: {
            item: string;
            price: string | number;
            stock: string | number;
            endpoint?: string | null | undefined;
        }[];
    } | {
        op: "remove";
        sales_name: string[];
    } | undefined;
    buy_guard?: string | null | undefined;
}>;
export declare const CallPersonalDataSchema: z.ZodObject<{
    information: z.ZodUnion<[z.ZodObject<{
        op: z.ZodLiteral<"add">;
        data: z.ZodArray<z.ZodObject<{
            title: z.ZodString;
            value: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            value: string;
            title: string;
        }, {
            value: string;
            title: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        data: {
            value: string;
            title: string;
        }[];
        op: "add";
    }, {
        data: {
            value: string;
            title: string;
        }[];
        op: "add";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        title: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "remove";
        title: string[];
    }, {
        op: "remove";
        title: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>]>;
    description: z.ZodOptional<z.ZodString>;
    mark: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodLiteral<"add">;
        data: z.ZodArray<z.ZodObject<{
            address: z.ZodObject<{
                name_or_address: z.ZodOptional<z.ZodString>;
                local_mark_first: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }>;
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            tags?: string[] | undefined;
            name?: string | undefined;
        }, {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            tags?: string[] | undefined;
            name?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        data: {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            tags?: string[] | undefined;
            name?: string | undefined;
        }[];
        op: "add";
    }, {
        data: {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            tags?: string[] | undefined;
            name?: string | undefined;
        }[];
        op: "add";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        data: z.ZodArray<z.ZodObject<{
            address: z.ZodObject<{
                name_or_address: z.ZodOptional<z.ZodString>;
                local_mark_first: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            tags?: string[] | undefined;
        }, {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            tags?: string[] | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        data: {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            tags?: string[] | undefined;
        }[];
        op: "remove";
    }, {
        data: {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            tags?: string[] | undefined;
        }[];
        op: "remove";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
        addresses: z.ZodArray<z.ZodObject<{
            name_or_address: z.ZodOptional<z.ZodString>;
            local_mark_first: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
        addresses: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }[];
    }, {
        op: "removeall";
        addresses: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"transfer">;
        to: z.ZodObject<{
            name_or_address: z.ZodOptional<z.ZodString>;
            local_mark_first: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        to: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        op: "transfer";
    }, {
        to: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        op: "transfer";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"replace">;
        mark_object: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        mark_object: string;
        op: "replace";
    }, {
        mark_object: string;
        op: "replace";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"destroy">;
    }, "strip", z.ZodTypeAny, {
        op: "destroy";
    }, {
        op: "destroy";
    }>]>>;
    faucet: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    information: {
        data: {
            value: string;
            title: string;
        }[];
        op: "add";
    } | {
        op: "remove";
        title: string[];
    } | {
        op: "removeall";
    };
    description?: string | undefined;
    mark?: {
        data: {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            tags?: string[] | undefined;
            name?: string | undefined;
        }[];
        op: "add";
    } | {
        data: {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            tags?: string[] | undefined;
        }[];
        op: "remove";
    } | {
        op: "removeall";
        addresses: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }[];
    } | {
        to: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        op: "transfer";
    } | {
        mark_object: string;
        op: "replace";
    } | {
        op: "destroy";
    } | undefined;
    faucet?: boolean | undefined;
}, {
    information: {
        data: {
            value: string;
            title: string;
        }[];
        op: "add";
    } | {
        op: "remove";
        title: string[];
    } | {
        op: "removeall";
    };
    description?: string | undefined;
    mark?: {
        data: {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            tags?: string[] | undefined;
            name?: string | undefined;
        }[];
        op: "add";
    } | {
        data: {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            tags?: string[] | undefined;
        }[];
        op: "remove";
    } | {
        op: "removeall";
        addresses: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }[];
    } | {
        to: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        };
        op: "transfer";
    } | {
        mark_object: string;
        op: "replace";
    } | {
        op: "destroy";
    } | undefined;
    faucet?: boolean | undefined;
}>;
export declare const CallObjectPermissionDataSchema: z.ZodObject<{
    objects: z.ZodArray<z.ZodString, "many">;
    new_permission: z.ZodString;
}, "strip", z.ZodTypeAny, {
    objects: string[];
    new_permission: string;
}, {
    objects: string[];
    new_permission: string;
}>;
export declare const WitnessCmd: z.ZodObject<{
    witness: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>>;
    cmd: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    cmd: number;
    witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
}, {
    cmd: number;
    witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
}>;
export declare const GuardWitness: z.ZodObject<{
    guards: z.ZodArray<z.ZodString, "many">;
    witness: z.ZodArray<z.ZodObject<{
        guard: z.ZodString;
        witness: z.ZodAny;
        cmd: z.ZodArray<z.ZodObject<{
            witness: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>>;
            cmd: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            cmd: number;
            witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
        }, {
            cmd: number;
            witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
        }>, "many">;
        cited: z.ZodNumber;
        type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
        identifier: z.ZodNumber;
        witnessTypes: z.ZodArray<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: WOWOK.ValueType;
        guard: string;
        cmd: {
            cmd: number;
            witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
        }[];
        identifier: number;
        cited: number;
        witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
        witness?: any;
    }, {
        type: WOWOK.ValueType;
        guard: string;
        cmd: {
            cmd: number;
            witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
        }[];
        identifier: number;
        cited: number;
        witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
        witness?: any;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    guards: string[];
    witness: {
        type: WOWOK.ValueType;
        guard: string;
        cmd: {
            cmd: number;
            witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
        }[];
        identifier: number;
        cited: number;
        witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
        witness?: any;
    }[];
}, {
    guards: string[];
    witness: {
        type: WOWOK.ValueType;
        guard: string;
        cmd: {
            cmd: number;
            witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
        }[];
        identifier: number;
        cited: number;
        witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
        witness?: any;
    }[];
}>;
export declare const ObjectChangedSchema: z.ZodArray<z.ZodObject<{
    object: z.ZodString;
    type: z.ZodString;
    change: z.ZodString;
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    object: string;
    type: string;
    change: string;
    url: string;
}, {
    object: string;
    type: string;
    change: string;
    url: string;
}>, "many">;
export declare const ObjectChangedSchemaOutput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const UrlResultMaker: (object: string | undefined) => {
    object: string | undefined;
    url: string | undefined;
};
export declare const ObjectsUrlMaker: (objects: (string | undefined)[]) => {
    object: string | undefined;
    url: string | undefined;
}[];
export declare const UrlResultSchema: z.ZodObject<{
    object: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    object?: string | undefined;
    url?: string | undefined;
}, {
    object?: string | undefined;
    url?: string | undefined;
}>;
export declare const ObjectsUrlSchema: z.ZodArray<z.ZodObject<{
    object: z.ZodOptional<z.ZodString>;
    url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    object?: string | undefined;
    url?: string | undefined;
}, {
    object?: string | undefined;
    url?: string | undefined;
}>, "many">;
export declare const UrlResultSchemaOutput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const ObjectsUrlSchemaOutput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const NetworkSchema: z.ZodNativeEnum<typeof WOWOK.ENTRYPOINT>;
export declare const SessionSchema: z.ZodOptional<z.ZodObject<{
    network: z.ZodNativeEnum<typeof WOWOK.ENTRYPOINT>;
    retentive: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"always">, z.ZodLiteral<"session">]>>;
}, "strip", z.ZodTypeAny, {
    retentive: "always" | "session";
    network: WOWOK.ENTRYPOINT;
}, {
    network: WOWOK.ENTRYPOINT;
    retentive?: "always" | "session" | undefined;
}>>;
export declare const AccountSchema: z.ZodOptional<z.ZodString>;
export declare const WitnessSchema: z.ZodOptional<z.ZodObject<{
    guards: z.ZodArray<z.ZodString, "many">;
    witness: z.ZodArray<z.ZodObject<{
        guard: z.ZodString;
        witness: z.ZodAny;
        cmd: z.ZodArray<z.ZodObject<{
            witness: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>>;
            cmd: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            cmd: number;
            witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
        }, {
            cmd: number;
            witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
        }>, "many">;
        cited: z.ZodNumber;
        type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
        identifier: z.ZodNumber;
        witnessTypes: z.ZodArray<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        type: WOWOK.ValueType;
        guard: string;
        cmd: {
            cmd: number;
            witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
        }[];
        identifier: number;
        cited: number;
        witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
        witness?: any;
    }, {
        type: WOWOK.ValueType;
        guard: string;
        cmd: {
            cmd: number;
            witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
        }[];
        identifier: number;
        cited: number;
        witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
        witness?: any;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    guards: string[];
    witness: {
        type: WOWOK.ValueType;
        guard: string;
        cmd: {
            cmd: number;
            witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
        }[];
        identifier: number;
        cited: number;
        witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
        witness?: any;
    }[];
}, {
    guards: string[];
    witness: {
        type: WOWOK.ValueType;
        guard: string;
        cmd: {
            cmd: number;
            witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
        }[];
        identifier: number;
        cited: number;
        witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
        witness?: any;
    }[];
}>>;
export declare const CallDemandSchemaDescription = "Operations to create or modify an on-chain Demand object using the 'account' field to sign transactions and the 'data' field to define object details. \n    The Demand object enables its manager to publish service-seeking demands, declare, and grant rewards to satisfactory service referrers. \n    It supports transtation models like C2B or C2C, where managers can dynamically update/refine demands, and referrers can adjust Services and their supply chain commitments to better fulfill personalized requirements. \n    Demand administrators control permissions for different operations through a Permission object. and may set up a Guard object to enforce threshold verification requirements for service referrers.";
export declare const CallDemandSchema: z.ZodObject<{
    data: z.ZodObject<{
        object: z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        } & {
            permission: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
                onChain: z.ZodOptional<z.ZodBoolean>;
            } & {
                description: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }, {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }>]>>;
        } & {
            type_parameter: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>]>;
        present: z.ZodOptional<z.ZodObject<{
            service: z.ZodOptional<z.ZodString>;
            recommend_words: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            recommend_words: string;
            service?: string | undefined;
        }, {
            service?: string | undefined;
            recommend_words?: string | undefined;
        }>>;
        description: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodString>;
        time_expire: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodLiteral<"duration">;
            minutes: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            op: "duration";
            minutes: number;
        }, {
            op: "duration";
            minutes: number;
        }>, z.ZodObject<{
            op: z.ZodLiteral<"time">;
            time: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            op: "time";
            time: number;
        }, {
            op: "time";
            time: number;
        }>]>>;
        bounty: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodLiteral<"add">;
            object: z.ZodUnion<[z.ZodObject<{
                address: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                address: string;
            }, {
                address: string;
            }>, z.ZodObject<{
                balance: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                balance: string | number;
            }, {
                balance: string | number;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            object: {
                address: string;
            } | {
                balance: string | number;
            };
            op: "add";
        }, {
            object: {
                address: string;
            } | {
                balance: string | number;
            };
            op: "add";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"reward">;
            service: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            service: string;
            op: "reward";
        }, {
            service: string;
            op: "reward";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"refund">;
        }, "strip", z.ZodTypeAny, {
            op: "refund";
        }, {
            op: "refund";
        }>]>>;
        guard: z.ZodOptional<z.ZodObject<{
            guard: z.ZodNullable<z.ZodString>;
            service_id_in_guard: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            guard: string | null;
            service_id_in_guard?: number | undefined;
        }, {
            guard: string | null;
            service_id_in_guard?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        object: string | {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        guard?: {
            guard: string | null;
            service_id_in_guard?: number | undefined;
        } | undefined;
        present?: {
            recommend_words: string;
            service?: string | undefined;
        } | undefined;
        location?: string | undefined;
        time_expire?: {
            op: "duration";
            minutes: number;
        } | {
            op: "time";
            time: number;
        } | undefined;
        bounty?: {
            object: {
                address: string;
            } | {
                balance: string | number;
            };
            op: "add";
        } | {
            service: string;
            op: "reward";
        } | {
            op: "refund";
        } | undefined;
    }, {
        object: string | {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        guard?: {
            guard: string | null;
            service_id_in_guard?: number | undefined;
        } | undefined;
        present?: {
            service?: string | undefined;
            recommend_words?: string | undefined;
        } | undefined;
        location?: string | undefined;
        time_expire?: {
            op: "duration";
            minutes: number;
        } | {
            op: "time";
            time: number;
        } | undefined;
        bounty?: {
            object: {
                address: string;
            } | {
                balance: string | number;
            };
            op: "add";
        } | {
            service: string;
            op: "reward";
        } | {
            op: "refund";
        } | undefined;
    }>;
    account: z.ZodOptional<z.ZodString>;
    witness: z.ZodOptional<z.ZodObject<{
        guards: z.ZodArray<z.ZodString, "many">;
        witness: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            witness: z.ZodAny;
            cmd: z.ZodArray<z.ZodObject<{
                witness: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>>;
                cmd: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }, {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }>, "many">;
            cited: z.ZodNumber;
            type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            identifier: z.ZodNumber;
            witnessTypes: z.ZodArray<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }, {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    }, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    }>>;
    session: z.ZodOptional<z.ZodObject<{
        network: z.ZodNativeEnum<typeof WOWOK.ENTRYPOINT>;
        retentive: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"always">, z.ZodLiteral<"session">]>>;
    }, "strip", z.ZodTypeAny, {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    }, {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    data: {
        object: string | {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        guard?: {
            guard: string | null;
            service_id_in_guard?: number | undefined;
        } | undefined;
        present?: {
            recommend_words: string;
            service?: string | undefined;
        } | undefined;
        location?: string | undefined;
        time_expire?: {
            op: "duration";
            minutes: number;
        } | {
            op: "time";
            time: number;
        } | undefined;
        bounty?: {
            object: {
                address: string;
            } | {
                balance: string | number;
            };
            op: "add";
        } | {
            service: string;
            op: "reward";
        } | {
            op: "refund";
        } | undefined;
    };
    session?: {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    } | undefined;
    account?: string | undefined;
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    } | undefined;
}, {
    data: {
        object: string | {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        guard?: {
            guard: string | null;
            service_id_in_guard?: number | undefined;
        } | undefined;
        present?: {
            service?: string | undefined;
            recommend_words?: string | undefined;
        } | undefined;
        location?: string | undefined;
        time_expire?: {
            op: "duration";
            minutes: number;
        } | {
            op: "time";
            time: number;
        } | undefined;
        bounty?: {
            object: {
                address: string;
            } | {
                balance: string | number;
            };
            op: "add";
        } | {
            service: string;
            op: "reward";
        } | {
            op: "refund";
        } | undefined;
    };
    session?: {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    } | undefined;
    account?: string | undefined;
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    } | undefined;
}>;
export declare const CallDemandSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallRepositorySchemaDescription = "Operations to create or modify an on-chain Repository object using the 'account' field to sign transactions and the 'data' field to define object details. \nThe Repository object enables its manager to declare and manage an on-chain database through consensus names and their independent permission settings, with data retrieval and management based on both address and consensus name. \nRepositories are widely used for on-chain data maintenance and utilization, such as: a named Repository providing medical data for different patients (addresses) and injury conditions (consensus names) to validate insurance claim conditions; \na named Repository offering hourly(with time converted to addresses) diving recommendations (consensus names) for Maldives city to support travel service providers in force majeure service disclaimers; and various data oracles. \nRepository administrators control permissions for different operations through a Permission object. and may individually set Policies for specific consensus names (including independent write permissions, declarations of consensus content, and data usage rules).";
export declare const CallRepositorySchema: z.ZodObject<{
    data: z.ZodObject<{
        object: z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        } & {
            permission: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
                onChain: z.ZodOptional<z.ZodBoolean>;
            } & {
                description: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }, {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>]>;
        data: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodLiteral<"add_by_key">;
            data: z.ZodObject<{
                key: z.ZodString;
                data: z.ZodArray<z.ZodObject<{
                    address: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodObject<{
                        name_or_address: z.ZodOptional<z.ZodString>;
                        local_mark_first: z.ZodOptional<z.ZodBoolean>;
                    }, "strip", z.ZodTypeAny, {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    }, {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    }>]>;
                    data: z.ZodUnion<[z.ZodObject<{
                        type: z.ZodLiteral<WOWOK.RepositoryValueType.PositiveNumber>;
                        data: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
                    }, "strip", z.ZodTypeAny, {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    }, {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    }>, z.ZodObject<{
                        type: z.ZodLiteral<WOWOK.RepositoryValueType.String>;
                        data: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    }, {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    }>, z.ZodObject<{
                        type: z.ZodLiteral<WOWOK.RepositoryValueType.PositiveNumber_Vec>;
                        data: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
                    }, "strip", z.ZodTypeAny, {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    }, {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    }>, z.ZodObject<{
                        type: z.ZodLiteral<WOWOK.RepositoryValueType.String_Vec>;
                        data: z.ZodArray<z.ZodString, "many">;
                    }, "strip", z.ZodTypeAny, {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    }, {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    }>, z.ZodObject<{
                        type: z.ZodLiteral<WOWOK.RepositoryValueType.Address>;
                        data: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodObject<{
                            name_or_address: z.ZodOptional<z.ZodString>;
                            local_mark_first: z.ZodOptional<z.ZodBoolean>;
                        }, "strip", z.ZodTypeAny, {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        }, {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        }>]>;
                    }, "strip", z.ZodTypeAny, {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    }, {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    }>, z.ZodObject<{
                        type: z.ZodLiteral<WOWOK.RepositoryValueType.Address_Vec>;
                        data: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodObject<{
                            name_or_address: z.ZodOptional<z.ZodString>;
                            local_mark_first: z.ZodOptional<z.ZodBoolean>;
                        }, "strip", z.ZodTypeAny, {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        }, {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        }>]>, "many">;
                    }, "strip", z.ZodTypeAny, {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    }, {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    }>, z.ZodObject<{
                        type: z.ZodLiteral<WOWOK.RepositoryValueType.Bool>;
                        data: z.ZodBoolean;
                    }, "strip", z.ZodTypeAny, {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    }, {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    address: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                }, {
                    address: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                data: {
                    address: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                }[];
                key: string;
            }, {
                data: {
                    address: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                }[];
                key: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            data: {
                data: {
                    address: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                }[];
                key: string;
            };
            op: "add_by_key";
        }, {
            data: {
                data: {
                    address: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                }[];
                key: string;
            };
            op: "add_by_key";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"add_by_address">;
            data: z.ZodObject<{
                address: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodObject<{
                    name_or_address: z.ZodOptional<z.ZodString>;
                    local_mark_first: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }>]>;
                data: z.ZodArray<z.ZodObject<{
                    key: z.ZodString;
                    data: z.ZodUnion<[z.ZodObject<{
                        type: z.ZodLiteral<WOWOK.RepositoryValueType.PositiveNumber>;
                        data: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
                    }, "strip", z.ZodTypeAny, {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    }, {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    }>, z.ZodObject<{
                        type: z.ZodLiteral<WOWOK.RepositoryValueType.String>;
                        data: z.ZodString;
                    }, "strip", z.ZodTypeAny, {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    }, {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    }>, z.ZodObject<{
                        type: z.ZodLiteral<WOWOK.RepositoryValueType.PositiveNumber_Vec>;
                        data: z.ZodArray<z.ZodUnion<[z.ZodString, z.ZodNumber]>, "many">;
                    }, "strip", z.ZodTypeAny, {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    }, {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    }>, z.ZodObject<{
                        type: z.ZodLiteral<WOWOK.RepositoryValueType.String_Vec>;
                        data: z.ZodArray<z.ZodString, "many">;
                    }, "strip", z.ZodTypeAny, {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    }, {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    }>, z.ZodObject<{
                        type: z.ZodLiteral<WOWOK.RepositoryValueType.Address>;
                        data: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodObject<{
                            name_or_address: z.ZodOptional<z.ZodString>;
                            local_mark_first: z.ZodOptional<z.ZodBoolean>;
                        }, "strip", z.ZodTypeAny, {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        }, {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        }>]>;
                    }, "strip", z.ZodTypeAny, {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    }, {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    }>, z.ZodObject<{
                        type: z.ZodLiteral<WOWOK.RepositoryValueType.Address_Vec>;
                        data: z.ZodArray<z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodObject<{
                            name_or_address: z.ZodOptional<z.ZodString>;
                            local_mark_first: z.ZodOptional<z.ZodBoolean>;
                        }, "strip", z.ZodTypeAny, {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        }, {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        }>]>, "many">;
                    }, "strip", z.ZodTypeAny, {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    }, {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    }>, z.ZodObject<{
                        type: z.ZodLiteral<WOWOK.RepositoryValueType.Bool>;
                        data: z.ZodBoolean;
                    }, "strip", z.ZodTypeAny, {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    }, {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    }>]>;
                }, "strip", z.ZodTypeAny, {
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                    key: string;
                }, {
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                    key: string;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                data: {
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                    key: string;
                }[];
            }, {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                data: {
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                    key: string;
                }[];
            }>;
        }, "strip", z.ZodTypeAny, {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                data: {
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                    key: string;
                }[];
            };
            op: "add_by_address";
        }, {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                data: {
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                    key: string;
                }[];
            };
            op: "add_by_address";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            data: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                address: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodObject<{
                    name_or_address: z.ZodOptional<z.ZodString>;
                    local_mark_first: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }>]>;
            }, "strip", z.ZodTypeAny, {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                key: string;
            }, {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                key: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                key: string;
            }[];
            op: "remove";
        }, {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                key: string;
            }[];
            op: "remove";
        }>]>>;
        description: z.ZodOptional<z.ZodString>;
        reference: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodUnion<[z.ZodLiteral<"set">, z.ZodLiteral<"remove">, z.ZodLiteral<"add">]>;
            objects: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            objects: string[];
            op: "set" | "add" | "remove";
        }, {
            objects: string[];
            op: "set" | "add" | "remove";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>]>>;
        mode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<WOWOK.Repository_Policy_Mode.POLICY_MODE_FREE>, z.ZodLiteral<WOWOK.Repository_Policy_Mode.POLICY_MODE_STRICT>]>>;
        policy: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodUnion<[z.ZodLiteral<"add">, z.ZodLiteral<"set">]>;
            data: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                description: z.ZodString;
                dataType: z.ZodUnion<[z.ZodLiteral<WOWOK.RepositoryValueType.Address>, z.ZodLiteral<WOWOK.RepositoryValueType.Address_Vec>, z.ZodLiteral<WOWOK.RepositoryValueType.String>, z.ZodLiteral<WOWOK.RepositoryValueType.String_Vec>, z.ZodLiteral<WOWOK.RepositoryValueType.PositiveNumber>, z.ZodLiteral<WOWOK.RepositoryValueType.PositiveNumber_Vec>, z.ZodLiteral<WOWOK.RepositoryValueType.Bool>]>;
                permissionIndex: z.ZodNullable<z.ZodOptional<z.ZodEffects<z.ZodTypeAny, number, any>>>;
                guard: z.ZodOptional<z.ZodObject<{
                    object: z.ZodNullable<z.ZodString>;
                    id_from_guard: z.ZodOptional<z.ZodNumber>;
                }, "strip", z.ZodTypeAny, {
                    object: string | null;
                    id_from_guard?: number | undefined;
                }, {
                    object: string | null;
                    id_from_guard?: number | undefined;
                }>>;
            }, "strip", z.ZodTypeAny, {
                description: string;
                dataType: WOWOK.RepositoryValueType;
                key: string;
                guard?: {
                    object: string | null;
                    id_from_guard?: number | undefined;
                } | undefined;
                permissionIndex?: number | null | undefined;
            }, {
                description: string;
                dataType: WOWOK.RepositoryValueType;
                key: string;
                guard?: {
                    object: string | null;
                    id_from_guard?: number | undefined;
                } | undefined;
                permissionIndex?: any;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            data: {
                description: string;
                dataType: WOWOK.RepositoryValueType;
                key: string;
                guard?: {
                    object: string | null;
                    id_from_guard?: number | undefined;
                } | undefined;
                permissionIndex?: number | null | undefined;
            }[];
            op: "set" | "add";
        }, {
            data: {
                description: string;
                dataType: WOWOK.RepositoryValueType;
                key: string;
                guard?: {
                    object: string | null;
                    id_from_guard?: number | undefined;
                } | undefined;
                permissionIndex?: any;
            }[];
            op: "set" | "add";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            keys: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            keys: string[];
            op: "remove";
        }, {
            keys: string[];
            op: "remove";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"rename">;
            data: z.ZodArray<z.ZodObject<{
                old: z.ZodString;
                new: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                new: string;
                old: string;
            }, {
                new: string;
                old: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            data: {
                new: string;
                old: string;
            }[];
            op: "rename";
        }, {
            data: {
                new: string;
                old: string;
            }[];
            op: "rename";
        }>]>>;
        guard: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        object: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        reference?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        description?: string | undefined;
        guard?: string | null | undefined;
        data?: {
            data: {
                data: {
                    address: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                }[];
                key: string;
            };
            op: "add_by_key";
        } | {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                data: {
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                    key: string;
                }[];
            };
            op: "add_by_address";
        } | {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                key: string;
            }[];
            op: "remove";
        } | undefined;
        mode?: WOWOK.Repository_Policy_Mode | undefined;
        policy?: {
            data: {
                description: string;
                dataType: WOWOK.RepositoryValueType;
                key: string;
                guard?: {
                    object: string | null;
                    id_from_guard?: number | undefined;
                } | undefined;
                permissionIndex?: number | null | undefined;
            }[];
            op: "set" | "add";
        } | {
            keys: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | {
            data: {
                new: string;
                old: string;
            }[];
            op: "rename";
        } | undefined;
    }, {
        object: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        reference?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        description?: string | undefined;
        guard?: string | null | undefined;
        data?: {
            data: {
                data: {
                    address: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                }[];
                key: string;
            };
            op: "add_by_key";
        } | {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                data: {
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                    key: string;
                }[];
            };
            op: "add_by_address";
        } | {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                key: string;
            }[];
            op: "remove";
        } | undefined;
        mode?: WOWOK.Repository_Policy_Mode | undefined;
        policy?: {
            data: {
                description: string;
                dataType: WOWOK.RepositoryValueType;
                key: string;
                guard?: {
                    object: string | null;
                    id_from_guard?: number | undefined;
                } | undefined;
                permissionIndex?: any;
            }[];
            op: "set" | "add";
        } | {
            keys: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | {
            data: {
                new: string;
                old: string;
            }[];
            op: "rename";
        } | undefined;
    }>;
    account: z.ZodOptional<z.ZodString>;
    witness: z.ZodOptional<z.ZodObject<{
        guards: z.ZodArray<z.ZodString, "many">;
        witness: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            witness: z.ZodAny;
            cmd: z.ZodArray<z.ZodObject<{
                witness: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>>;
                cmd: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }, {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }>, "many">;
            cited: z.ZodNumber;
            type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            identifier: z.ZodNumber;
            witnessTypes: z.ZodArray<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }, {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    }, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    }>>;
    session: z.ZodOptional<z.ZodObject<{
        network: z.ZodNativeEnum<typeof WOWOK.ENTRYPOINT>;
        retentive: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"always">, z.ZodLiteral<"session">]>>;
    }, "strip", z.ZodTypeAny, {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    }, {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    data: {
        object: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        reference?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        description?: string | undefined;
        guard?: string | null | undefined;
        data?: {
            data: {
                data: {
                    address: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                }[];
                key: string;
            };
            op: "add_by_key";
        } | {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                data: {
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                    key: string;
                }[];
            };
            op: "add_by_address";
        } | {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                key: string;
            }[];
            op: "remove";
        } | undefined;
        mode?: WOWOK.Repository_Policy_Mode | undefined;
        policy?: {
            data: {
                description: string;
                dataType: WOWOK.RepositoryValueType;
                key: string;
                guard?: {
                    object: string | null;
                    id_from_guard?: number | undefined;
                } | undefined;
                permissionIndex?: number | null | undefined;
            }[];
            op: "set" | "add";
        } | {
            keys: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | {
            data: {
                new: string;
                old: string;
            }[];
            op: "rename";
        } | undefined;
    };
    session?: {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    } | undefined;
    account?: string | undefined;
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    } | undefined;
}, {
    data: {
        object: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        reference?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        description?: string | undefined;
        guard?: string | null | undefined;
        data?: {
            data: {
                data: {
                    address: number | bigint | {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                }[];
                key: string;
            };
            op: "add_by_key";
        } | {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                data: {
                    data: {
                        type: WOWOK.RepositoryValueType.PositiveNumber;
                        data: string | number;
                    } | {
                        type: WOWOK.RepositoryValueType.String;
                        data: string;
                    } | {
                        type: WOWOK.RepositoryValueType.PositiveNumber_Vec;
                        data: (string | number)[];
                    } | {
                        type: WOWOK.RepositoryValueType.String_Vec;
                        data: string[];
                    } | {
                        type: WOWOK.RepositoryValueType.Address;
                        data: number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        };
                    } | {
                        type: WOWOK.RepositoryValueType.Address_Vec;
                        data: (number | bigint | {
                            name_or_address?: string | undefined;
                            local_mark_first?: boolean | undefined;
                        })[];
                    } | {
                        type: WOWOK.RepositoryValueType.Bool;
                        data: boolean;
                    };
                    key: string;
                }[];
            };
            op: "add_by_address";
        } | {
            data: {
                address: number | bigint | {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                key: string;
            }[];
            op: "remove";
        } | undefined;
        mode?: WOWOK.Repository_Policy_Mode | undefined;
        policy?: {
            data: {
                description: string;
                dataType: WOWOK.RepositoryValueType;
                key: string;
                guard?: {
                    object: string | null;
                    id_from_guard?: number | undefined;
                } | undefined;
                permissionIndex?: any;
            }[];
            op: "set" | "add";
        } | {
            keys: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | {
            data: {
                new: string;
                old: string;
            }[];
            op: "rename";
        } | undefined;
    };
    session?: {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    } | undefined;
    account?: string | undefined;
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    } | undefined;
}>;
export declare const CallRepositorySchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallMachineSchemaDescription = "Operations to create or modify an on-chain Machine object, where the 'account' field is used to sign transactions and the 'data' field defines object details. \nThe Machine object enables its manager to orchestrate collaborative workflows, manage permissions, and validate deliverables on-chain. It achieves reusable workflow execution through the generation of distinct instances (Progress objects), such as service processes for e-commerce orders. Core functionalities include:\n- Workflow Orchestration : Defines multi-stage collaborative workflows (e.g., Requirement Confirmation \u2192 Development \u2192 Testing \u2192 Acceptance) with parallel or sequential execution, specifying step order and trigger conditions to support complex collaboration scenarios.\n- Permission Management : Assigns granular operational permissions to collaborators (e.g., only service providers can execute development steps; only purchasers can approve acceptance steps), and sets namespace-specific permissions for different workflow instances (Progress objects) (e.g., distinct delivery personnel for different Progress objects).\n- Delivery Validation : Implements automatic validation rules via Guard objects (e.g., verifying updates to the latest data in a named Repository or confirming purchase order fulfillment as committed).\nMachine administrators control permissions for different operations through a Permission object and can configure namespaces to provide unified permission operation spaces for different instances (Progress objects). Once published, the workflow orchestration and delivery validation rules of a Machine object become immutable. To enhance a Machine, a new Machine object can be generated and modified via the Clone method.";
export declare const CallMachineSchema: z.ZodObject<{
    data: z.ZodObject<{
        object: z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        } & {
            permission: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
                onChain: z.ZodOptional<z.ZodBoolean>;
            } & {
                description: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }, {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>]>;
        progress_new: z.ZodOptional<z.ZodObject<{
            task_address: z.ZodNullable<z.ZodOptional<z.ZodString>>;
            namedNew: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
                onChain: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }, {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            task_address?: string | null | undefined;
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        }, {
            task_address?: string | null | undefined;
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        }>>;
        progress_context_repository: z.ZodOptional<z.ZodObject<{
            progress: z.ZodOptional<z.ZodString>;
            repository: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            repository: string | null;
            progress?: string | undefined;
        }, {
            repository: string | null;
            progress?: string | undefined;
        }>>;
        progress_namedOperator: z.ZodOptional<z.ZodObject<{
            progress: z.ZodOptional<z.ZodString>;
            data: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                operators: z.ZodArray<z.ZodObject<{
                    name_or_address: z.ZodOptional<z.ZodString>;
                    local_mark_first: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                name: string;
                operators: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }[];
            }, {
                name: string;
                operators: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }[];
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            data: {
                name: string;
                operators: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }[];
            }[];
            progress?: string | undefined;
        }, {
            data: {
                name: string;
                operators: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }[];
            }[];
            progress?: string | undefined;
        }>>;
        progress_parent: z.ZodOptional<z.ZodObject<{
            progress: z.ZodOptional<z.ZodString>;
            parent: z.ZodNullable<z.ZodObject<{
                parent_id: z.ZodString;
                parent_session_id: z.ZodNumber;
                operation: z.ZodObject<{
                    next_node_name: z.ZodString;
                    forward: z.ZodString;
                }, "strip", z.ZodTypeAny, {
                    next_node_name: string;
                    forward: string;
                }, {
                    next_node_name: string;
                    forward: string;
                }>;
            }, "strip", z.ZodTypeAny, {
                operation: {
                    next_node_name: string;
                    forward: string;
                };
                parent_id: string;
                parent_session_id: number;
            }, {
                operation: {
                    next_node_name: string;
                    forward: string;
                };
                parent_id: string;
                parent_session_id: number;
            }>>;
        }, "strip", z.ZodTypeAny, {
            parent: {
                operation: {
                    next_node_name: string;
                    forward: string;
                };
                parent_id: string;
                parent_session_id: number;
            } | null;
            progress?: string | undefined;
        }, {
            parent: {
                operation: {
                    next_node_name: string;
                    forward: string;
                };
                parent_id: string;
                parent_session_id: number;
            } | null;
            progress?: string | undefined;
        }>>;
        progress_hold: z.ZodOptional<z.ZodObject<{
            progress: z.ZodString;
            operation: z.ZodObject<{
                next_node_name: z.ZodString;
                forward: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                next_node_name: string;
                forward: string;
            }, {
                next_node_name: string;
                forward: string;
            }>;
            bHold: z.ZodBoolean;
            adminUnhold: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            progress: string;
            operation: {
                next_node_name: string;
                forward: string;
            };
            bHold: boolean;
            adminUnhold?: boolean | undefined;
        }, {
            progress: string;
            operation: {
                next_node_name: string;
                forward: string;
            };
            bHold: boolean;
            adminUnhold?: boolean | undefined;
        }>>;
        progress_task: z.ZodOptional<z.ZodObject<{
            progress: z.ZodString;
            task_address: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            progress: string;
            task_address: string;
        }, {
            progress: string;
            task_address: string;
        }>>;
        progress_next: z.ZodOptional<z.ZodObject<{
            progress: z.ZodString;
            operation: z.ZodObject<{
                next_node_name: z.ZodString;
                forward: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                next_node_name: string;
                forward: string;
            }, {
                next_node_name: string;
                forward: string;
            }>;
            deliverable: z.ZodObject<{
                msg: z.ZodString;
                orders: z.ZodArray<z.ZodString, "many">;
            }, "strip", z.ZodTypeAny, {
                msg: string;
                orders: string[];
            }, {
                msg: string;
                orders: string[];
            }>;
        }, "strip", z.ZodTypeAny, {
            progress: string;
            operation: {
                next_node_name: string;
                forward: string;
            };
            deliverable: {
                msg: string;
                orders: string[];
            };
        }, {
            progress: string;
            operation: {
                next_node_name: string;
                forward: string;
            };
            deliverable: {
                msg: string;
                orders: string[];
            };
        }>>;
        description: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        consensus_repository: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodUnion<[z.ZodLiteral<"set">, z.ZodLiteral<"remove">, z.ZodLiteral<"add">]>;
            objects: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            objects: string[];
            op: "set" | "add" | "remove";
        }, {
            objects: string[];
            op: "set" | "add" | "remove";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>]>>;
        nodes: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodLiteral<"add">;
            bReplace: z.ZodOptional<z.ZodBoolean>;
            data: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                pairs: z.ZodArray<z.ZodObject<{
                    prior_node: z.ZodDefault<z.ZodString>;
                    threshold: z.ZodNumber;
                    forwards: z.ZodArray<z.ZodObject<{
                        name: z.ZodString;
                        namedOperator: z.ZodOptional<z.ZodString>;
                        permission: z.ZodOptional<z.ZodTypeAny>;
                        weight: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                        guard: z.ZodOptional<z.ZodString>;
                        suppliers: z.ZodOptional<z.ZodArray<z.ZodObject<{
                            service: z.ZodString;
                            bRequired: z.ZodOptional<z.ZodBoolean>;
                        }, "strip", z.ZodTypeAny, {
                            service: string;
                            bRequired?: boolean | undefined;
                        }, {
                            service: string;
                            bRequired?: boolean | undefined;
                        }>, "many">>;
                    }, "strip", z.ZodTypeAny, {
                        name: string;
                        permission?: any;
                        guard?: string | undefined;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }, {
                        name: string;
                        permission?: any;
                        guard?: string | undefined;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    prior_node: string;
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        guard?: string | undefined;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                }, {
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        guard?: string | undefined;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                    prior_node?: string | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                name: string;
                pairs: {
                    prior_node: string;
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        guard?: string | undefined;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                }[];
            }, {
                name: string;
                pairs: {
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        guard?: string | undefined;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                    prior_node?: string | undefined;
                }[];
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            data: {
                name: string;
                pairs: {
                    prior_node: string;
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        guard?: string | undefined;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                }[];
            }[];
            op: "add";
            bReplace?: boolean | undefined;
        }, {
            data: {
                name: string;
                pairs: {
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        guard?: string | undefined;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                    prior_node?: string | undefined;
                }[];
            }[];
            op: "add";
            bReplace?: boolean | undefined;
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            names: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "remove";
            names: string[];
        }, {
            op: "remove";
            names: string[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"rename node">;
            data: z.ZodArray<z.ZodObject<{
                old: z.ZodString;
                new: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                new: string;
                old: string;
            }, {
                new: string;
                old: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            data: {
                new: string;
                old: string;
            }[];
            op: "rename node";
        }, {
            data: {
                new: string;
                old: string;
            }[];
            op: "rename node";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove pair">;
            pairs: z.ZodArray<z.ZodObject<{
                prior_node_name: z.ZodString;
                node_name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                prior_node_name: string;
                node_name: string;
            }, {
                prior_node_name: string;
                node_name: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "remove pair";
            pairs: {
                prior_node_name: string;
                node_name: string;
            }[];
        }, {
            op: "remove pair";
            pairs: {
                prior_node_name: string;
                node_name: string;
            }[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"add forward">;
            data: z.ZodArray<z.ZodObject<{
                prior_node_name: z.ZodString;
                node_name: z.ZodString;
                forward: z.ZodObject<{
                    name: z.ZodString;
                    namedOperator: z.ZodOptional<z.ZodString>;
                    permission: z.ZodOptional<z.ZodTypeAny>;
                    weight: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
                    guard: z.ZodOptional<z.ZodString>;
                    suppliers: z.ZodOptional<z.ZodArray<z.ZodObject<{
                        service: z.ZodString;
                        bRequired: z.ZodOptional<z.ZodBoolean>;
                    }, "strip", z.ZodTypeAny, {
                        service: string;
                        bRequired?: boolean | undefined;
                    }, {
                        service: string;
                        bRequired?: boolean | undefined;
                    }>, "many">>;
                }, "strip", z.ZodTypeAny, {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }, {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }>;
                threshold: z.ZodOptional<z.ZodNumber>;
                remove_old_forward: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                forward: {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                };
                prior_node_name: string;
                node_name: string;
                threshold?: number | undefined;
                remove_old_forward?: string | undefined;
            }, {
                forward: {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                };
                prior_node_name: string;
                node_name: string;
                threshold?: number | undefined;
                remove_old_forward?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            data: {
                forward: {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                };
                prior_node_name: string;
                node_name: string;
                threshold?: number | undefined;
                remove_old_forward?: string | undefined;
            }[];
            op: "add forward";
        }, {
            data: {
                forward: {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                };
                prior_node_name: string;
                node_name: string;
                threshold?: number | undefined;
                remove_old_forward?: string | undefined;
            }[];
            op: "add forward";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove forward">;
            data: z.ZodArray<z.ZodObject<{
                prior_node_name: z.ZodString;
                node_name: z.ZodString;
                forward_name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                prior_node_name: string;
                node_name: string;
                forward_name: string;
            }, {
                prior_node_name: string;
                node_name: string;
                forward_name: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            data: {
                prior_node_name: string;
                node_name: string;
                forward_name: string;
            }[];
            op: "remove forward";
        }, {
            data: {
                prior_node_name: string;
                node_name: string;
                forward_name: string;
            }[];
            op: "remove forward";
        }>]>>;
        bPublished: z.ZodOptional<z.ZodBoolean>;
        bPaused: z.ZodOptional<z.ZodBoolean>;
        clone_new: z.ZodOptional<z.ZodObject<{
            namedNew: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
                onChain: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }, {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        }, {
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        object: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        nodes?: {
            data: {
                name: string;
                pairs: {
                    prior_node: string;
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        guard?: string | undefined;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                }[];
            }[];
            op: "add";
            bReplace?: boolean | undefined;
        } | {
            op: "remove";
            names: string[];
        } | {
            data: {
                new: string;
                old: string;
            }[];
            op: "rename node";
        } | {
            op: "remove pair";
            pairs: {
                prior_node_name: string;
                node_name: string;
            }[];
        } | {
            data: {
                forward: {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                };
                prior_node_name: string;
                node_name: string;
                threshold?: number | undefined;
                remove_old_forward?: string | undefined;
            }[];
            op: "add forward";
        } | {
            data: {
                prior_node_name: string;
                node_name: string;
                forward_name: string;
            }[];
            op: "remove forward";
        } | undefined;
        progress_new?: {
            task_address?: string | null | undefined;
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
        progress_context_repository?: {
            repository: string | null;
            progress?: string | undefined;
        } | undefined;
        progress_namedOperator?: {
            data: {
                name: string;
                operators: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }[];
            }[];
            progress?: string | undefined;
        } | undefined;
        progress_parent?: {
            parent: {
                operation: {
                    next_node_name: string;
                    forward: string;
                };
                parent_id: string;
                parent_session_id: number;
            } | null;
            progress?: string | undefined;
        } | undefined;
        progress_task?: {
            progress: string;
            task_address: string;
        } | undefined;
        progress_hold?: {
            progress: string;
            operation: {
                next_node_name: string;
                forward: string;
            };
            bHold: boolean;
            adminUnhold?: boolean | undefined;
        } | undefined;
        progress_next?: {
            progress: string;
            operation: {
                next_node_name: string;
                forward: string;
            };
            deliverable: {
                msg: string;
                orders: string[];
            };
        } | undefined;
        endpoint?: string | null | undefined;
        consensus_repository?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        bPublished?: boolean | undefined;
        bPaused?: boolean | undefined;
        clone_new?: {
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
    }, {
        object: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        nodes?: {
            data: {
                name: string;
                pairs: {
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        guard?: string | undefined;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                    prior_node?: string | undefined;
                }[];
            }[];
            op: "add";
            bReplace?: boolean | undefined;
        } | {
            op: "remove";
            names: string[];
        } | {
            data: {
                new: string;
                old: string;
            }[];
            op: "rename node";
        } | {
            op: "remove pair";
            pairs: {
                prior_node_name: string;
                node_name: string;
            }[];
        } | {
            data: {
                forward: {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                };
                prior_node_name: string;
                node_name: string;
                threshold?: number | undefined;
                remove_old_forward?: string | undefined;
            }[];
            op: "add forward";
        } | {
            data: {
                prior_node_name: string;
                node_name: string;
                forward_name: string;
            }[];
            op: "remove forward";
        } | undefined;
        progress_new?: {
            task_address?: string | null | undefined;
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
        progress_context_repository?: {
            repository: string | null;
            progress?: string | undefined;
        } | undefined;
        progress_namedOperator?: {
            data: {
                name: string;
                operators: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }[];
            }[];
            progress?: string | undefined;
        } | undefined;
        progress_parent?: {
            parent: {
                operation: {
                    next_node_name: string;
                    forward: string;
                };
                parent_id: string;
                parent_session_id: number;
            } | null;
            progress?: string | undefined;
        } | undefined;
        progress_task?: {
            progress: string;
            task_address: string;
        } | undefined;
        progress_hold?: {
            progress: string;
            operation: {
                next_node_name: string;
                forward: string;
            };
            bHold: boolean;
            adminUnhold?: boolean | undefined;
        } | undefined;
        progress_next?: {
            progress: string;
            operation: {
                next_node_name: string;
                forward: string;
            };
            deliverable: {
                msg: string;
                orders: string[];
            };
        } | undefined;
        endpoint?: string | null | undefined;
        consensus_repository?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        bPublished?: boolean | undefined;
        bPaused?: boolean | undefined;
        clone_new?: {
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
    }>;
    account: z.ZodOptional<z.ZodString>;
    witness: z.ZodOptional<z.ZodObject<{
        guards: z.ZodArray<z.ZodString, "many">;
        witness: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            witness: z.ZodAny;
            cmd: z.ZodArray<z.ZodObject<{
                witness: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>>;
                cmd: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }, {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }>, "many">;
            cited: z.ZodNumber;
            type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            identifier: z.ZodNumber;
            witnessTypes: z.ZodArray<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }, {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    }, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    }>>;
    session: z.ZodOptional<z.ZodObject<{
        network: z.ZodNativeEnum<typeof WOWOK.ENTRYPOINT>;
        retentive: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"always">, z.ZodLiteral<"session">]>>;
    }, "strip", z.ZodTypeAny, {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    }, {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    data: {
        object: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        nodes?: {
            data: {
                name: string;
                pairs: {
                    prior_node: string;
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        guard?: string | undefined;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                }[];
            }[];
            op: "add";
            bReplace?: boolean | undefined;
        } | {
            op: "remove";
            names: string[];
        } | {
            data: {
                new: string;
                old: string;
            }[];
            op: "rename node";
        } | {
            op: "remove pair";
            pairs: {
                prior_node_name: string;
                node_name: string;
            }[];
        } | {
            data: {
                forward: {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                };
                prior_node_name: string;
                node_name: string;
                threshold?: number | undefined;
                remove_old_forward?: string | undefined;
            }[];
            op: "add forward";
        } | {
            data: {
                prior_node_name: string;
                node_name: string;
                forward_name: string;
            }[];
            op: "remove forward";
        } | undefined;
        progress_new?: {
            task_address?: string | null | undefined;
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
        progress_context_repository?: {
            repository: string | null;
            progress?: string | undefined;
        } | undefined;
        progress_namedOperator?: {
            data: {
                name: string;
                operators: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }[];
            }[];
            progress?: string | undefined;
        } | undefined;
        progress_parent?: {
            parent: {
                operation: {
                    next_node_name: string;
                    forward: string;
                };
                parent_id: string;
                parent_session_id: number;
            } | null;
            progress?: string | undefined;
        } | undefined;
        progress_task?: {
            progress: string;
            task_address: string;
        } | undefined;
        progress_hold?: {
            progress: string;
            operation: {
                next_node_name: string;
                forward: string;
            };
            bHold: boolean;
            adminUnhold?: boolean | undefined;
        } | undefined;
        progress_next?: {
            progress: string;
            operation: {
                next_node_name: string;
                forward: string;
            };
            deliverable: {
                msg: string;
                orders: string[];
            };
        } | undefined;
        endpoint?: string | null | undefined;
        consensus_repository?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        bPublished?: boolean | undefined;
        bPaused?: boolean | undefined;
        clone_new?: {
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
    };
    session?: {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    } | undefined;
    account?: string | undefined;
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    } | undefined;
}, {
    data: {
        object: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        nodes?: {
            data: {
                name: string;
                pairs: {
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        guard?: string | undefined;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                    prior_node?: string | undefined;
                }[];
            }[];
            op: "add";
            bReplace?: boolean | undefined;
        } | {
            op: "remove";
            names: string[];
        } | {
            data: {
                new: string;
                old: string;
            }[];
            op: "rename node";
        } | {
            op: "remove pair";
            pairs: {
                prior_node_name: string;
                node_name: string;
            }[];
        } | {
            data: {
                forward: {
                    name: string;
                    permission?: any;
                    guard?: string | undefined;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                };
                prior_node_name: string;
                node_name: string;
                threshold?: number | undefined;
                remove_old_forward?: string | undefined;
            }[];
            op: "add forward";
        } | {
            data: {
                prior_node_name: string;
                node_name: string;
                forward_name: string;
            }[];
            op: "remove forward";
        } | undefined;
        progress_new?: {
            task_address?: string | null | undefined;
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
        progress_context_repository?: {
            repository: string | null;
            progress?: string | undefined;
        } | undefined;
        progress_namedOperator?: {
            data: {
                name: string;
                operators: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }[];
            }[];
            progress?: string | undefined;
        } | undefined;
        progress_parent?: {
            parent: {
                operation: {
                    next_node_name: string;
                    forward: string;
                };
                parent_id: string;
                parent_session_id: number;
            } | null;
            progress?: string | undefined;
        } | undefined;
        progress_task?: {
            progress: string;
            task_address: string;
        } | undefined;
        progress_hold?: {
            progress: string;
            operation: {
                next_node_name: string;
                forward: string;
            };
            bHold: boolean;
            adminUnhold?: boolean | undefined;
        } | undefined;
        progress_next?: {
            progress: string;
            operation: {
                next_node_name: string;
                forward: string;
            };
            deliverable: {
                msg: string;
                orders: string[];
            };
        } | undefined;
        endpoint?: string | null | undefined;
        consensus_repository?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        bPublished?: boolean | undefined;
        bPaused?: boolean | undefined;
        clone_new?: {
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
    };
    session?: {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    } | undefined;
    account?: string | undefined;
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    } | undefined;
}>;
export declare const CallMachineSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallServiceSchemaDescription = "Operations to create or modify an on-chain Service object, where the 'account' field is used to sign transactions and the 'data' field defines object details. \nThe Service object enables its managers to publish purchasable services on-chain, including setting product/service descriptions, prices, inventory, service workflows (Machine object), withdrawal guard rules (Withdraw Guard objects), refund guard rules (Refund Guard objects), dispute commitments (Arbitration objects), the conditions for the purchaser (Buy Guard object), incentives/rewards (Treasury objects), information service endpoints (Endpoint), and encryption of sensitive information.\nUpon successful payment by the purchaser, a new Order object is generated, granting the purchaser all rights committed by the Service to the Order, including:\n- Service Workflow : Full transparency of all service and delivery processes prior to purchase.\n- Breach Arbitration : In case of order disputes, the Order owner can apply for arbitration and compensation claims through these Arbitration objects, with arbitration results and compensation requirements executed automatically.\n- Refund Commitment : Pre-purchase review of refund/withdrawal processes and terms to ensure alignment with purchaser needs.\n- Incentive Rewards : Pre-purchase review of incentives/rewards obtainable when Guard conditions are met.\n- Privacy Protection : On-chain encryption of purchaser's sensitive data or submission via the service provider's Endpoint.\nService administrators control permissions for different operations through a Permission object.\nOnce published, the Service object's service workflows, Guard objects, and other configurations become immutable. To adjust services, a new Service object must be created and configured via the Clone method. A Service can be paused to stop generating new orders, though commitments to existing orders remain unaffected.";
export declare const CallServiceSchema: z.ZodObject<{
    data: z.ZodObject<{
        object: z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        } & {
            permission: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
                onChain: z.ZodOptional<z.ZodBoolean>;
            } & {
                description: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }, {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }>]>>;
        } & {
            type_parameter: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>]>;
        order_new: z.ZodOptional<z.ZodObject<{
            buy_items: z.ZodArray<z.ZodObject<{
                item: z.ZodString;
                max_price: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
                count: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                item: string;
                max_price: string | number;
                count: string | number;
            }, {
                item: string;
                max_price: string | number;
                count: string | number;
            }>, "many">;
            discount_object: z.ZodOptional<z.ZodString>;
            customer_info_required: z.ZodOptional<z.ZodString>;
            namedNewOrder: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
                onChain: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }, {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }>>;
            namedNewProgress: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
                onChain: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }, {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            buy_items: {
                item: string;
                max_price: string | number;
                count: string | number;
            }[];
            discount_object?: string | undefined;
            customer_info_required?: string | undefined;
            namedNewOrder?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            namedNewProgress?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        }, {
            buy_items: {
                item: string;
                max_price: string | number;
                count: string | number;
            }[];
            discount_object?: string | undefined;
            customer_info_required?: string | undefined;
            namedNewOrder?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            namedNewProgress?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        }>>;
        order_receive: z.ZodOptional<z.ZodObject<{
            order: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            order: string;
        }, {
            order: string;
        }>>;
        order_agent: z.ZodOptional<z.ZodObject<{
            order: z.ZodOptional<z.ZodString>;
            agents: z.ZodArray<z.ZodObject<{
                name_or_address: z.ZodOptional<z.ZodString>;
                local_mark_first: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            agents: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
            order?: string | undefined;
        }, {
            agents: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
            order?: string | undefined;
        }>>;
        order_required_info: z.ZodOptional<z.ZodObject<{
            order: z.ZodString;
            customer_info_required: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            order: string;
            customer_info_required?: string | undefined;
        }, {
            order: string;
            customer_info_required?: string | undefined;
        }>>;
        order_refund: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            order: z.ZodString;
            arb: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            arb: string;
            order: string;
        }, {
            arb: string;
            order: string;
        }>, z.ZodObject<{
            order: z.ZodString;
            refund_guard: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            order: string;
            refund_guard: string;
        }, {
            order: string;
            refund_guard: string;
        }>]>>;
        order_withdrawl: z.ZodOptional<z.ZodObject<{
            order: z.ZodString;
            data: z.ZodObject<{
                index: z.ZodUnion<[z.ZodDefault<z.ZodNumber>, z.ZodBigInt, z.ZodString]>;
                remark: z.ZodString;
                for_object: z.ZodOptional<z.ZodString>;
                for_guard: z.ZodOptional<z.ZodString>;
            } & {
                withdraw_guard: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                remark: string;
                index: string | number | bigint;
                withdraw_guard: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            }, {
                remark: string;
                withdraw_guard: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
                index?: string | number | bigint | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            order: string;
            data: {
                remark: string;
                index: string | number | bigint;
                withdraw_guard: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
        }, {
            order: string;
            data: {
                remark: string;
                withdraw_guard: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
                index?: string | number | bigint | undefined;
            };
        }>>;
        order_payer: z.ZodOptional<z.ZodObject<{
            order: z.ZodOptional<z.ZodString>;
            payer_new: z.ZodObject<{
                name_or_address: z.ZodOptional<z.ZodString>;
                local_mark_first: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            payer_new: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            order?: string | undefined;
        }, {
            payer_new: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            order?: string | undefined;
        }>>;
        description: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        payee_treasury: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        } & {
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>]>>;
        gen_discount: z.ZodOptional<z.ZodArray<z.ZodObject<{
            receiver: z.ZodObject<{
                name_or_address: z.ZodOptional<z.ZodString>;
                local_mark_first: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }>;
            count: z.ZodDefault<z.ZodNumber>;
            discount: z.ZodObject<{
                name: z.ZodDefault<z.ZodString>;
                type: z.ZodUnion<[z.ZodLiteral<WOWOK.Service_Discount_Type.ratio>, z.ZodLiteral<WOWOK.Service_Discount_Type.minus>]>;
                off: z.ZodNumber;
                duration_minutes: z.ZodDefault<z.ZodNumber>;
                time_start: z.ZodOptional<z.ZodNumber>;
                price_greater: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
            }, "strip", z.ZodTypeAny, {
                name: string;
                type: WOWOK.Service_Discount_Type;
                off: number;
                duration_minutes: number;
                time_start?: number | undefined;
                price_greater?: string | number | undefined;
            }, {
                type: WOWOK.Service_Discount_Type;
                off: number;
                name?: string | undefined;
                duration_minutes?: number | undefined;
                time_start?: number | undefined;
                price_greater?: string | number | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            receiver: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            count: number;
            discount: {
                name: string;
                type: WOWOK.Service_Discount_Type;
                off: number;
                duration_minutes: number;
                time_start?: number | undefined;
                price_greater?: string | number | undefined;
            };
        }, {
            receiver: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            discount: {
                type: WOWOK.Service_Discount_Type;
                off: number;
                name?: string | undefined;
                duration_minutes?: number | undefined;
                time_start?: number | undefined;
                price_greater?: string | number | undefined;
            };
            count?: number | undefined;
        }>, "many">>;
        repository: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodUnion<[z.ZodLiteral<"set">, z.ZodLiteral<"remove">, z.ZodLiteral<"add">]>;
            objects: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            objects: string[];
            op: "set" | "add" | "remove";
        }, {
            objects: string[];
            op: "set" | "add" | "remove";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>]>>;
        extern_withdraw_treasury: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodUnion<[z.ZodLiteral<"set">, z.ZodLiteral<"remove">, z.ZodLiteral<"add">]>;
            objects: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            objects: string[];
            op: "set" | "add" | "remove";
        }, {
            objects: string[];
            op: "set" | "add" | "remove";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>]>>;
        machine: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        arbitration: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodUnion<[z.ZodLiteral<"set">, z.ZodLiteral<"remove">, z.ZodLiteral<"add">]>;
            objects: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            objects: string[];
            op: "set" | "add" | "remove";
        }, {
            objects: string[];
            op: "set" | "add" | "remove";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>]>>;
        customer_required_info: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            pubkey: z.ZodString;
            required_info: z.ZodArray<z.ZodUnion<[z.ZodLiteral<WOWOK.BuyRequiredEnum.address>, z.ZodLiteral<WOWOK.BuyRequiredEnum.phone>, z.ZodLiteral<WOWOK.BuyRequiredEnum.postcode>, z.ZodLiteral<WOWOK.BuyRequiredEnum.name>, z.ZodString]>, "many">;
        }, "strip", z.ZodTypeAny, {
            pubkey: string;
            required_info: string[];
        }, {
            pubkey: string;
            required_info: string[];
        }>>>;
        sales: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodLiteral<"add">;
            sales: z.ZodArray<z.ZodObject<{
                item: z.ZodString;
                price: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
                stock: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
                endpoint: z.ZodOptional<z.ZodNullable<z.ZodString>>;
            }, "strip", z.ZodTypeAny, {
                item: string;
                price: string | number;
                stock: string | number;
                endpoint?: string | null | undefined;
            }, {
                item: string;
                price: string | number;
                stock: string | number;
                endpoint?: string | null | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "add";
            sales: {
                item: string;
                price: string | number;
                stock: string | number;
                endpoint?: string | null | undefined;
            }[];
        }, {
            op: "add";
            sales: {
                item: string;
                price: string | number;
                stock: string | number;
                endpoint?: string | null | undefined;
            }[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            sales_name: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "remove";
            sales_name: string[];
        }, {
            op: "remove";
            sales_name: string[];
        }>]>>;
        withdraw_guard: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodUnion<[z.ZodLiteral<"add">, z.ZodLiteral<"set">]>;
            guards: z.ZodArray<z.ZodObject<{
                guard: z.ZodString;
                percent: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                guard: string;
                percent: number;
            }, {
                guard: string;
                percent: number;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            guards: {
                guard: string;
                percent: number;
            }[];
            op: "set" | "add";
        }, {
            guards: {
                guard: string;
                percent: number;
            }[];
            op: "set" | "add";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            guards: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            guards: string[];
            op: "remove";
        }, {
            guards: string[];
            op: "remove";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>]>>;
        refund_guard: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodUnion<[z.ZodLiteral<"add">, z.ZodLiteral<"set">]>;
            guards: z.ZodArray<z.ZodObject<{
                guard: z.ZodString;
                percent: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                guard: string;
                percent: number;
            }, {
                guard: string;
                percent: number;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            guards: {
                guard: string;
                percent: number;
            }[];
            op: "set" | "add";
        }, {
            guards: {
                guard: string;
                percent: number;
            }[];
            op: "set" | "add";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            guards: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            guards: string[];
            op: "remove";
        }, {
            guards: string[];
            op: "remove";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>]>>;
        bPublished: z.ZodOptional<z.ZodBoolean>;
        buy_guard: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        bPaused: z.ZodOptional<z.ZodBoolean>;
        clone_new: z.ZodOptional<z.ZodObject<{
            token_type_new: z.ZodOptional<z.ZodString>;
            namedNew: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
                onChain: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }, {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            token_type_new?: string | undefined;
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        }, {
            token_type_new?: string | undefined;
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        object: string | {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        machine?: string | null | undefined;
        arbitration?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        withdraw_guard?: {
            guards: {
                guard: string;
                percent: number;
            }[];
            op: "set" | "add";
        } | {
            guards: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | undefined;
        repository?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        refund_guard?: {
            guards: {
                guard: string;
                percent: number;
            }[];
            op: "set" | "add";
        } | {
            guards: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | undefined;
        order_new?: {
            buy_items: {
                item: string;
                max_price: string | number;
                count: string | number;
            }[];
            discount_object?: string | undefined;
            customer_info_required?: string | undefined;
            namedNewOrder?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            namedNewProgress?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
        order_refund?: {
            arb: string;
            order: string;
        } | {
            order: string;
            refund_guard: string;
        } | undefined;
        order_withdrawl?: {
            order: string;
            data: {
                remark: string;
                index: string | number | bigint;
                withdraw_guard: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
        } | undefined;
        location?: string | undefined;
        endpoint?: string | null | undefined;
        bPublished?: boolean | undefined;
        bPaused?: boolean | undefined;
        clone_new?: {
            token_type_new?: string | undefined;
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
        order_receive?: {
            order: string;
        } | undefined;
        order_agent?: {
            agents: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
            order?: string | undefined;
        } | undefined;
        order_required_info?: {
            order: string;
            customer_info_required?: string | undefined;
        } | undefined;
        order_payer?: {
            payer_new: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            order?: string | undefined;
        } | undefined;
        payee_treasury?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        gen_discount?: {
            receiver: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            count: number;
            discount: {
                name: string;
                type: WOWOK.Service_Discount_Type;
                off: number;
                duration_minutes: number;
                time_start?: number | undefined;
                price_greater?: string | number | undefined;
            };
        }[] | undefined;
        extern_withdraw_treasury?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        customer_required_info?: {
            pubkey: string;
            required_info: string[];
        } | null | undefined;
        sales?: {
            op: "add";
            sales: {
                item: string;
                price: string | number;
                stock: string | number;
                endpoint?: string | null | undefined;
            }[];
        } | {
            op: "remove";
            sales_name: string[];
        } | undefined;
        buy_guard?: string | null | undefined;
    }, {
        object: string | {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        machine?: string | null | undefined;
        arbitration?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        withdraw_guard?: {
            guards: {
                guard: string;
                percent: number;
            }[];
            op: "set" | "add";
        } | {
            guards: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | undefined;
        repository?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        refund_guard?: {
            guards: {
                guard: string;
                percent: number;
            }[];
            op: "set" | "add";
        } | {
            guards: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | undefined;
        order_new?: {
            buy_items: {
                item: string;
                max_price: string | number;
                count: string | number;
            }[];
            discount_object?: string | undefined;
            customer_info_required?: string | undefined;
            namedNewOrder?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            namedNewProgress?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
        order_refund?: {
            arb: string;
            order: string;
        } | {
            order: string;
            refund_guard: string;
        } | undefined;
        order_withdrawl?: {
            order: string;
            data: {
                remark: string;
                withdraw_guard: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
                index?: string | number | bigint | undefined;
            };
        } | undefined;
        location?: string | undefined;
        endpoint?: string | null | undefined;
        bPublished?: boolean | undefined;
        bPaused?: boolean | undefined;
        clone_new?: {
            token_type_new?: string | undefined;
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
        order_receive?: {
            order: string;
        } | undefined;
        order_agent?: {
            agents: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
            order?: string | undefined;
        } | undefined;
        order_required_info?: {
            order: string;
            customer_info_required?: string | undefined;
        } | undefined;
        order_payer?: {
            payer_new: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            order?: string | undefined;
        } | undefined;
        payee_treasury?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        gen_discount?: {
            receiver: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            discount: {
                type: WOWOK.Service_Discount_Type;
                off: number;
                name?: string | undefined;
                duration_minutes?: number | undefined;
                time_start?: number | undefined;
                price_greater?: string | number | undefined;
            };
            count?: number | undefined;
        }[] | undefined;
        extern_withdraw_treasury?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        customer_required_info?: {
            pubkey: string;
            required_info: string[];
        } | null | undefined;
        sales?: {
            op: "add";
            sales: {
                item: string;
                price: string | number;
                stock: string | number;
                endpoint?: string | null | undefined;
            }[];
        } | {
            op: "remove";
            sales_name: string[];
        } | undefined;
        buy_guard?: string | null | undefined;
    }>;
    account: z.ZodOptional<z.ZodString>;
    witness: z.ZodOptional<z.ZodObject<{
        guards: z.ZodArray<z.ZodString, "many">;
        witness: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            witness: z.ZodAny;
            cmd: z.ZodArray<z.ZodObject<{
                witness: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>>;
                cmd: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }, {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }>, "many">;
            cited: z.ZodNumber;
            type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            identifier: z.ZodNumber;
            witnessTypes: z.ZodArray<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }, {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    }, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    }>>;
    session: z.ZodOptional<z.ZodObject<{
        network: z.ZodNativeEnum<typeof WOWOK.ENTRYPOINT>;
        retentive: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"always">, z.ZodLiteral<"session">]>>;
    }, "strip", z.ZodTypeAny, {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    }, {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    data: {
        object: string | {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        machine?: string | null | undefined;
        arbitration?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        withdraw_guard?: {
            guards: {
                guard: string;
                percent: number;
            }[];
            op: "set" | "add";
        } | {
            guards: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | undefined;
        repository?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        refund_guard?: {
            guards: {
                guard: string;
                percent: number;
            }[];
            op: "set" | "add";
        } | {
            guards: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | undefined;
        order_new?: {
            buy_items: {
                item: string;
                max_price: string | number;
                count: string | number;
            }[];
            discount_object?: string | undefined;
            customer_info_required?: string | undefined;
            namedNewOrder?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            namedNewProgress?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
        order_refund?: {
            arb: string;
            order: string;
        } | {
            order: string;
            refund_guard: string;
        } | undefined;
        order_withdrawl?: {
            order: string;
            data: {
                remark: string;
                index: string | number | bigint;
                withdraw_guard: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
        } | undefined;
        location?: string | undefined;
        endpoint?: string | null | undefined;
        bPublished?: boolean | undefined;
        bPaused?: boolean | undefined;
        clone_new?: {
            token_type_new?: string | undefined;
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
        order_receive?: {
            order: string;
        } | undefined;
        order_agent?: {
            agents: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
            order?: string | undefined;
        } | undefined;
        order_required_info?: {
            order: string;
            customer_info_required?: string | undefined;
        } | undefined;
        order_payer?: {
            payer_new: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            order?: string | undefined;
        } | undefined;
        payee_treasury?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        gen_discount?: {
            receiver: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            count: number;
            discount: {
                name: string;
                type: WOWOK.Service_Discount_Type;
                off: number;
                duration_minutes: number;
                time_start?: number | undefined;
                price_greater?: string | number | undefined;
            };
        }[] | undefined;
        extern_withdraw_treasury?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        customer_required_info?: {
            pubkey: string;
            required_info: string[];
        } | null | undefined;
        sales?: {
            op: "add";
            sales: {
                item: string;
                price: string | number;
                stock: string | number;
                endpoint?: string | null | undefined;
            }[];
        } | {
            op: "remove";
            sales_name: string[];
        } | undefined;
        buy_guard?: string | null | undefined;
    };
    session?: {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    } | undefined;
    account?: string | undefined;
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    } | undefined;
}, {
    data: {
        object: string | {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        machine?: string | null | undefined;
        arbitration?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        withdraw_guard?: {
            guards: {
                guard: string;
                percent: number;
            }[];
            op: "set" | "add";
        } | {
            guards: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | undefined;
        repository?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        refund_guard?: {
            guards: {
                guard: string;
                percent: number;
            }[];
            op: "set" | "add";
        } | {
            guards: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | undefined;
        order_new?: {
            buy_items: {
                item: string;
                max_price: string | number;
                count: string | number;
            }[];
            discount_object?: string | undefined;
            customer_info_required?: string | undefined;
            namedNewOrder?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            namedNewProgress?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
        order_refund?: {
            arb: string;
            order: string;
        } | {
            order: string;
            refund_guard: string;
        } | undefined;
        order_withdrawl?: {
            order: string;
            data: {
                remark: string;
                withdraw_guard: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
                index?: string | number | bigint | undefined;
            };
        } | undefined;
        location?: string | undefined;
        endpoint?: string | null | undefined;
        bPublished?: boolean | undefined;
        bPaused?: boolean | undefined;
        clone_new?: {
            token_type_new?: string | undefined;
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
        order_receive?: {
            order: string;
        } | undefined;
        order_agent?: {
            agents: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
            order?: string | undefined;
        } | undefined;
        order_required_info?: {
            order: string;
            customer_info_required?: string | undefined;
        } | undefined;
        order_payer?: {
            payer_new: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            order?: string | undefined;
        } | undefined;
        payee_treasury?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        gen_discount?: {
            receiver: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            discount: {
                type: WOWOK.Service_Discount_Type;
                off: number;
                name?: string | undefined;
                duration_minutes?: number | undefined;
                time_start?: number | undefined;
                price_greater?: string | number | undefined;
            };
            count?: number | undefined;
        }[] | undefined;
        extern_withdraw_treasury?: {
            objects: string[];
            op: "set" | "add" | "remove";
        } | {
            op: "removeall";
        } | undefined;
        customer_required_info?: {
            pubkey: string;
            required_info: string[];
        } | null | undefined;
        sales?: {
            op: "add";
            sales: {
                item: string;
                price: string | number;
                stock: string | number;
                endpoint?: string | null | undefined;
            }[];
        } | {
            op: "remove";
            sales_name: string[];
        } | undefined;
        buy_guard?: string | null | undefined;
    };
    session?: {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    } | undefined;
    account?: string | undefined;
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    } | undefined;
}>;
export declare const CallServiceSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallTreasurySchemaDescription = "Operations to create or modify an on-chain Treasury object, where the 'account' field is used to sign transactions and the 'data' field defines object details. The Treasury object enables its administrators to manage a specific token's funds on-chain, including operations such as depositing, withdrawing, receiving funds, and setting memos/purposes for fund flows (e.g., allocating compensation payments from the treasury as a verification condition for collaborative workflows, such as after a courier loses a package, leveraging Guard objects to seamlessly integrate business processes).\nTreasury administrators control permissions for different operations through a Permission object. For withdrawal operations, distinct verification conditions (Guard objects) can be set to allow withdrawals of varying amounts, providing flexible and rapid withdrawal channels for external operators (e.g., airdrops or order incentives).";
export declare const CallTreasurySchema: z.ZodObject<{
    data: z.ZodObject<{
        object: z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        } & {
            permission: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
                onChain: z.ZodOptional<z.ZodBoolean>;
            } & {
                description: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }, {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }>]>>;
        } & {
            type_parameter: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>]>;
        deposit: z.ZodOptional<z.ZodObject<{
            balance: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            param: z.ZodOptional<z.ZodObject<{
                index: z.ZodUnion<[z.ZodDefault<z.ZodNumber>, z.ZodBigInt, z.ZodString]>;
                remark: z.ZodString;
                for_object: z.ZodOptional<z.ZodString>;
                for_guard: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                remark: string;
                index: string | number | bigint;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            }, {
                remark: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
                index?: string | number | bigint | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            balance: string | number;
            param?: {
                remark: string;
                index: string | number | bigint;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            } | undefined;
        }, {
            balance: string | number;
            param?: {
                remark: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
                index?: string | number | bigint | undefined;
            } | undefined;
        }>>;
        receive: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            received_objects: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            received_objects: string[];
        }, {
            received_objects: string[];
        }>, z.ZodLiteral<"recently">]>>;
        withdraw: z.ZodOptional<z.ZodObject<{
            index: z.ZodUnion<[z.ZodDefault<z.ZodNumber>, z.ZodBigInt, z.ZodString]>;
            remark: z.ZodString;
            for_object: z.ZodOptional<z.ZodString>;
            for_guard: z.ZodOptional<z.ZodString>;
        } & {
            receiver: z.ZodArray<z.ZodObject<{
                address: z.ZodObject<{
                    name_or_address: z.ZodOptional<z.ZodString>;
                    local_mark_first: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }>;
                amount: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                amount: string | number;
            }, {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                amount: string | number;
            }>, "many">;
            withdraw_guard: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            remark: string;
            index: string | number | bigint;
            receiver: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                amount: string | number;
            }[];
            for_object?: string | undefined;
            for_guard?: string | undefined;
            withdraw_guard?: string | undefined;
        }, {
            remark: string;
            receiver: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                amount: string | number;
            }[];
            for_object?: string | undefined;
            for_guard?: string | undefined;
            index?: string | number | bigint | undefined;
            withdraw_guard?: string | undefined;
        }>>;
        description: z.ZodOptional<z.ZodString>;
        deposit_guard: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        withdraw_guard: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodUnion<[z.ZodLiteral<"add">, z.ZodLiteral<"set">]>;
            data: z.ZodArray<z.ZodObject<{
                guard: z.ZodString;
                max_withdrawal_amount: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                guard: string;
                max_withdrawal_amount: string | number;
            }, {
                guard: string;
                max_withdrawal_amount: string | number;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            data: {
                guard: string;
                max_withdrawal_amount: string | number;
            }[];
            op: "set" | "add";
        }, {
            data: {
                guard: string;
                max_withdrawal_amount: string | number;
            }[];
            op: "set" | "add";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            guards: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            guards: string[];
            op: "remove";
        }, {
            guards: string[];
            op: "remove";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>]>>;
        withdraw_mode: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<WOWOK.Treasury_WithdrawMode.PERMISSION>, z.ZodLiteral<WOWOK.Treasury_WithdrawMode.GUARD_ONLY_AND_IMMUTABLE>, z.ZodLiteral<WOWOK.Treasury_WithdrawMode.BOTH_PERMISSION_AND_GUARD>]>>;
    }, "strip", z.ZodTypeAny, {
        object: string | {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        withdraw?: {
            remark: string;
            index: string | number | bigint;
            receiver: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                amount: string | number;
            }[];
            for_object?: string | undefined;
            for_guard?: string | undefined;
            withdraw_guard?: string | undefined;
        } | undefined;
        deposit?: {
            balance: string | number;
            param?: {
                remark: string;
                index: string | number | bigint;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            } | undefined;
        } | undefined;
        withdraw_guard?: {
            data: {
                guard: string;
                max_withdrawal_amount: string | number;
            }[];
            op: "set" | "add";
        } | {
            guards: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | undefined;
        receive?: "recently" | {
            received_objects: string[];
        } | undefined;
        deposit_guard?: string | null | undefined;
        withdraw_mode?: WOWOK.Treasury_WithdrawMode | undefined;
    }, {
        object: string | {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        withdraw?: {
            remark: string;
            receiver: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                amount: string | number;
            }[];
            for_object?: string | undefined;
            for_guard?: string | undefined;
            index?: string | number | bigint | undefined;
            withdraw_guard?: string | undefined;
        } | undefined;
        deposit?: {
            balance: string | number;
            param?: {
                remark: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
                index?: string | number | bigint | undefined;
            } | undefined;
        } | undefined;
        withdraw_guard?: {
            data: {
                guard: string;
                max_withdrawal_amount: string | number;
            }[];
            op: "set" | "add";
        } | {
            guards: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | undefined;
        receive?: "recently" | {
            received_objects: string[];
        } | undefined;
        deposit_guard?: string | null | undefined;
        withdraw_mode?: WOWOK.Treasury_WithdrawMode | undefined;
    }>;
    account: z.ZodOptional<z.ZodString>;
    witness: z.ZodOptional<z.ZodObject<{
        guards: z.ZodArray<z.ZodString, "many">;
        witness: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            witness: z.ZodAny;
            cmd: z.ZodArray<z.ZodObject<{
                witness: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>>;
                cmd: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }, {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }>, "many">;
            cited: z.ZodNumber;
            type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            identifier: z.ZodNumber;
            witnessTypes: z.ZodArray<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }, {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    }, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    }>>;
    session: z.ZodOptional<z.ZodObject<{
        network: z.ZodNativeEnum<typeof WOWOK.ENTRYPOINT>;
        retentive: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"always">, z.ZodLiteral<"session">]>>;
    }, "strip", z.ZodTypeAny, {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    }, {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    data: {
        object: string | {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        withdraw?: {
            remark: string;
            index: string | number | bigint;
            receiver: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                amount: string | number;
            }[];
            for_object?: string | undefined;
            for_guard?: string | undefined;
            withdraw_guard?: string | undefined;
        } | undefined;
        deposit?: {
            balance: string | number;
            param?: {
                remark: string;
                index: string | number | bigint;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            } | undefined;
        } | undefined;
        withdraw_guard?: {
            data: {
                guard: string;
                max_withdrawal_amount: string | number;
            }[];
            op: "set" | "add";
        } | {
            guards: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | undefined;
        receive?: "recently" | {
            received_objects: string[];
        } | undefined;
        deposit_guard?: string | null | undefined;
        withdraw_mode?: WOWOK.Treasury_WithdrawMode | undefined;
    };
    session?: {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    } | undefined;
    account?: string | undefined;
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    } | undefined;
}, {
    data: {
        object: string | {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        withdraw?: {
            remark: string;
            receiver: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                amount: string | number;
            }[];
            for_object?: string | undefined;
            for_guard?: string | undefined;
            index?: string | number | bigint | undefined;
            withdraw_guard?: string | undefined;
        } | undefined;
        deposit?: {
            balance: string | number;
            param?: {
                remark: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
                index?: string | number | bigint | undefined;
            } | undefined;
        } | undefined;
        withdraw_guard?: {
            data: {
                guard: string;
                max_withdrawal_amount: string | number;
            }[];
            op: "set" | "add";
        } | {
            guards: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | undefined;
        receive?: "recently" | {
            received_objects: string[];
        } | undefined;
        deposit_guard?: string | null | undefined;
        withdraw_mode?: WOWOK.Treasury_WithdrawMode | undefined;
    };
    session?: {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    } | undefined;
    account?: string | undefined;
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    } | undefined;
}>;
export declare const CallTreasurySchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallPermissionSchemaDescription = "Operations to create or modify an on-chain Permission object, where the 'account' field is used to sign transactions and the 'data' field defines object details. \nThe Permission object enables its administrators to set distinct operational permissions (including built-in permissions and custom permissions) and additional verification conditions (Guard object) for different addresses on-chain. For example, assigning Permission No. 123 (a built-in permission for cloning Service objects) to address 0x1234 allows that address to initiate clone operations across all Service objects that accept this Permission object.\nIn the Wowok protocol, objects of types such as Demand, Repository, Treasury, Service, Machine, and Arbitration include a 'permission' field that specifies the accepted Permission object. This enables addresses and permissions defined by the linked Permission object to perform operations on these target objects.";
export declare const CallPermissionSchema: z.ZodObject<{
    data: z.ZodObject<{
        object: z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>]>;
        description: z.ZodOptional<z.ZodString>;
        biz_permission: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodLiteral<"add">;
            data: z.ZodArray<z.ZodObject<{
                index: z.ZodEffects<z.ZodTypeAny, number, any>;
                name: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                name: string;
                index: number;
            }, {
                name: string;
                index?: any;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            data: {
                name: string;
                index: number;
            }[];
            op: "add";
        }, {
            data: {
                name: string;
                index?: any;
            }[];
            op: "add";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            permissions: z.ZodArray<z.ZodEffects<z.ZodTypeAny, number, any>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "remove";
            permissions: number[];
        }, {
            op: "remove";
            permissions: any[];
        }>]>>;
        permission: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodLiteral<"add entity">;
            entities: z.ZodArray<z.ZodObject<{
                address: z.ZodObject<{
                    name_or_address: z.ZodOptional<z.ZodString>;
                    local_mark_first: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }>;
                permissions: z.ZodArray<z.ZodObject<{
                    index: z.ZodEffects<z.ZodTypeAny, number, any>;
                    guard: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    index: number;
                    guard?: string | undefined;
                }, {
                    guard?: string | undefined;
                    index?: any;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                permissions: {
                    index: number;
                    guard?: string | undefined;
                }[];
            }, {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                permissions: {
                    guard?: string | undefined;
                    index?: any;
                }[];
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "add entity";
            entities: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                permissions: {
                    index: number;
                    guard?: string | undefined;
                }[];
            }[];
        }, {
            op: "add entity";
            entities: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                permissions: {
                    guard?: string | undefined;
                    index?: any;
                }[];
            }[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"add permission">;
            permissions: z.ZodArray<z.ZodObject<{
                index: z.ZodEffects<z.ZodTypeAny, number, any>;
                entities: z.ZodArray<z.ZodObject<{
                    address: z.ZodObject<{
                        name_or_address: z.ZodOptional<z.ZodString>;
                        local_mark_first: z.ZodOptional<z.ZodBoolean>;
                    }, "strip", z.ZodTypeAny, {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    }, {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    }>;
                    guard: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    address: {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    guard?: string | undefined;
                }, {
                    address: {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    guard?: string | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                index: number;
                entities: {
                    address: {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    guard?: string | undefined;
                }[];
            }, {
                entities: {
                    address: {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    guard?: string | undefined;
                }[];
                index?: any;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "add permission";
            permissions: {
                index: number;
                entities: {
                    address: {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    guard?: string | undefined;
                }[];
            }[];
        }, {
            op: "add permission";
            permissions: {
                entities: {
                    address: {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    guard?: string | undefined;
                }[];
                index?: any;
            }[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove entity">;
            addresses: z.ZodArray<z.ZodObject<{
                name_or_address: z.ZodOptional<z.ZodString>;
                local_mark_first: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "remove entity";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        }, {
            op: "remove entity";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove permission">;
            address: z.ZodObject<{
                name_or_address: z.ZodOptional<z.ZodString>;
                local_mark_first: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }>;
            index: z.ZodArray<z.ZodEffects<z.ZodTypeAny, number, any>, "many">;
        }, "strip", z.ZodTypeAny, {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            index: number[];
            op: "remove permission";
        }, {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            index: any[];
            op: "remove permission";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"transfer permission">;
            from: z.ZodObject<{
                name_or_address: z.ZodOptional<z.ZodString>;
                local_mark_first: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }>;
            to: z.ZodObject<{
                name_or_address: z.ZodOptional<z.ZodString>;
                local_mark_first: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            from: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            to: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            op: "transfer permission";
        }, {
            from: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            to: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            op: "transfer permission";
        }>]>>;
        admin: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodUnion<[z.ZodLiteral<"add">, z.ZodLiteral<"remove">, z.ZodLiteral<"set">]>;
            addresses: z.ZodArray<z.ZodObject<{
                name_or_address: z.ZodOptional<z.ZodString>;
                local_mark_first: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "set" | "add" | "remove";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        }, {
            op: "set" | "add" | "remove";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>]>>;
        builder: z.ZodOptional<z.ZodObject<{
            name_or_address: z.ZodOptional<z.ZodString>;
            local_mark_first: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }, {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        object: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        admin?: {
            op: "set" | "add" | "remove";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        } | {
            op: "removeall";
        } | undefined;
        description?: string | undefined;
        permission?: {
            op: "add entity";
            entities: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                permissions: {
                    index: number;
                    guard?: string | undefined;
                }[];
            }[];
        } | {
            op: "add permission";
            permissions: {
                index: number;
                entities: {
                    address: {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    guard?: string | undefined;
                }[];
            }[];
        } | {
            op: "remove entity";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        } | {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            index: number[];
            op: "remove permission";
        } | {
            from: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            to: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            op: "transfer permission";
        } | undefined;
        biz_permission?: {
            data: {
                name: string;
                index: number;
            }[];
            op: "add";
        } | {
            op: "remove";
            permissions: number[];
        } | undefined;
        builder?: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        } | undefined;
    }, {
        object: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        admin?: {
            op: "set" | "add" | "remove";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        } | {
            op: "removeall";
        } | undefined;
        description?: string | undefined;
        permission?: {
            op: "add entity";
            entities: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                permissions: {
                    guard?: string | undefined;
                    index?: any;
                }[];
            }[];
        } | {
            op: "add permission";
            permissions: {
                entities: {
                    address: {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    guard?: string | undefined;
                }[];
                index?: any;
            }[];
        } | {
            op: "remove entity";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        } | {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            index: any[];
            op: "remove permission";
        } | {
            from: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            to: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            op: "transfer permission";
        } | undefined;
        biz_permission?: {
            data: {
                name: string;
                index?: any;
            }[];
            op: "add";
        } | {
            op: "remove";
            permissions: any[];
        } | undefined;
        builder?: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        } | undefined;
    }>;
    account: z.ZodOptional<z.ZodString>;
    witness: z.ZodOptional<z.ZodObject<{
        guards: z.ZodArray<z.ZodString, "many">;
        witness: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            witness: z.ZodAny;
            cmd: z.ZodArray<z.ZodObject<{
                witness: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>>;
                cmd: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }, {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }>, "many">;
            cited: z.ZodNumber;
            type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            identifier: z.ZodNumber;
            witnessTypes: z.ZodArray<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }, {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    }, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    }>>;
    session: z.ZodOptional<z.ZodObject<{
        network: z.ZodNativeEnum<typeof WOWOK.ENTRYPOINT>;
        retentive: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"always">, z.ZodLiteral<"session">]>>;
    }, "strip", z.ZodTypeAny, {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    }, {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    data: {
        object: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        admin?: {
            op: "set" | "add" | "remove";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        } | {
            op: "removeall";
        } | undefined;
        description?: string | undefined;
        permission?: {
            op: "add entity";
            entities: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                permissions: {
                    index: number;
                    guard?: string | undefined;
                }[];
            }[];
        } | {
            op: "add permission";
            permissions: {
                index: number;
                entities: {
                    address: {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    guard?: string | undefined;
                }[];
            }[];
        } | {
            op: "remove entity";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        } | {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            index: number[];
            op: "remove permission";
        } | {
            from: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            to: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            op: "transfer permission";
        } | undefined;
        biz_permission?: {
            data: {
                name: string;
                index: number;
            }[];
            op: "add";
        } | {
            op: "remove";
            permissions: number[];
        } | undefined;
        builder?: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        } | undefined;
    };
    session?: {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    } | undefined;
    account?: string | undefined;
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    } | undefined;
}, {
    data: {
        object: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        admin?: {
            op: "set" | "add" | "remove";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        } | {
            op: "removeall";
        } | undefined;
        description?: string | undefined;
        permission?: {
            op: "add entity";
            entities: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                permissions: {
                    guard?: string | undefined;
                    index?: any;
                }[];
            }[];
        } | {
            op: "add permission";
            permissions: {
                entities: {
                    address: {
                        name_or_address?: string | undefined;
                        local_mark_first?: boolean | undefined;
                    };
                    guard?: string | undefined;
                }[];
                index?: any;
            }[];
        } | {
            op: "remove entity";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        } | {
            address: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            index: any[];
            op: "remove permission";
        } | {
            from: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            to: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            op: "transfer permission";
        } | undefined;
        biz_permission?: {
            data: {
                name: string;
                index?: any;
            }[];
            op: "add";
        } | {
            op: "remove";
            permissions: any[];
        } | undefined;
        builder?: {
            name_or_address?: string | undefined;
            local_mark_first?: boolean | undefined;
        } | undefined;
    };
    session?: {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    } | undefined;
    account?: string | undefined;
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    } | undefined;
}>;
export declare const CallPermissionSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallArbitrationSchemaDescription = "Operations to create or modify an on-chain Arbitration object, where the 'account' field is used to sign transactions and the 'data' field defines object details. \nThe Arbitration object enables its managers to provide dispute arbitration for orders on-chain. It facilitates named voting based on descriptions and claims of the dispute object (Arb object) to determine the compensation amount for the order owner. If a Service object declares and accepts this Arbitration object, its arbitration results and compensation requirements will be automatically executed.\nWhen an order owner encounters a dispute with an order, they can initiate arbitration by selecting the Arbitration objects accepted by their Service object, resulting in the generation of a new Arb object.\nArbitration administrators control permissions for different operations through a Permission object.";
export declare const CallArbitrationSchema: z.ZodObject<{
    data: z.ZodObject<{
        object: z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        } & {
            permission: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
                onChain: z.ZodOptional<z.ZodBoolean>;
            } & {
                description: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }, {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }>]>>;
        } & {
            type_parameter: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>]>;
        arb_new: z.ZodOptional<z.ZodObject<{
            data: z.ZodObject<{
                order: z.ZodString;
                description: z.ZodString;
                votable_proposition: z.ZodArray<z.ZodString, "many">;
                max_fee: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
            }, "strip", z.ZodTypeAny, {
                description: string;
                order: string;
                votable_proposition: string[];
                max_fee?: string | number | undefined;
            }, {
                description: string;
                order: string;
                votable_proposition: string[];
                max_fee?: string | number | undefined;
            }>;
            namedNew: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
                onChain: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }, {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            data: {
                description: string;
                order: string;
                votable_proposition: string[];
                max_fee?: string | number | undefined;
            };
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        }, {
            data: {
                description: string;
                order: string;
                votable_proposition: string[];
                max_fee?: string | number | undefined;
            };
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        }>>;
        arb_withdraw_fee: z.ZodOptional<z.ZodObject<{
            arb: z.ZodString;
            data: z.ZodObject<{
                index: z.ZodUnion<[z.ZodDefault<z.ZodNumber>, z.ZodBigInt, z.ZodString]>;
                remark: z.ZodString;
                for_object: z.ZodOptional<z.ZodString>;
                for_guard: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                remark: string;
                index: string | number | bigint;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            }, {
                remark: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
                index?: string | number | bigint | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            arb: string;
            data: {
                remark: string;
                index: string | number | bigint;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
        }, {
            arb: string;
            data: {
                remark: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
                index?: string | number | bigint | undefined;
            };
        }>>;
        arb_vote: z.ZodOptional<z.ZodObject<{
            arb: z.ZodString;
            voting_guard: z.ZodString;
            agrees: z.ZodArray<z.ZodNumber, "many">;
        }, "strip", z.ZodTypeAny, {
            arb: string;
            voting_guard: string;
            agrees: number[];
        }, {
            arb: string;
            voting_guard: string;
            agrees: number[];
        }>>;
        arb_arbitration: z.ZodOptional<z.ZodObject<{
            arb: z.ZodString;
            feedback: z.ZodString;
            indemnity: z.ZodNullable<z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
        }, "strip", z.ZodTypeAny, {
            arb: string;
            feedback: string;
            indemnity?: string | number | null | undefined;
        }, {
            arb: string;
            feedback: string;
            indemnity?: string | number | null | undefined;
        }>>;
        description: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        fee: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        fee_treasury: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        } & {
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>]>>;
        guard: z.ZodOptional<z.ZodString>;
        voting_guard: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodUnion<[z.ZodLiteral<"add">, z.ZodLiteral<"set">]>;
            data: z.ZodArray<z.ZodObject<{
                guard: z.ZodString;
                voting_weight: z.ZodDefault<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
            }, "strip", z.ZodTypeAny, {
                guard: string;
                voting_weight: string | number;
            }, {
                guard: string;
                voting_weight?: string | number | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            data: {
                guard: string;
                voting_weight: string | number;
            }[];
            op: "set" | "add";
        }, {
            data: {
                guard: string;
                voting_weight?: string | number | undefined;
            }[];
            op: "set" | "add";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            guards: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            guards: string[];
            op: "remove";
        }, {
            guards: string[];
            op: "remove";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>]>>;
        bPaused: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        object: string | {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        guard?: string | undefined;
        arb_new?: {
            data: {
                description: string;
                order: string;
                votable_proposition: string[];
                max_fee?: string | number | undefined;
            };
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
        location?: string | undefined;
        endpoint?: string | null | undefined;
        bPaused?: boolean | undefined;
        arb_withdraw_fee?: {
            arb: string;
            data: {
                remark: string;
                index: string | number | bigint;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
        } | undefined;
        voting_guard?: {
            data: {
                guard: string;
                voting_weight: string | number;
            }[];
            op: "set" | "add";
        } | {
            guards: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | undefined;
        arb_vote?: {
            arb: string;
            voting_guard: string;
            agrees: number[];
        } | undefined;
        arb_arbitration?: {
            arb: string;
            feedback: string;
            indemnity?: string | number | null | undefined;
        } | undefined;
        fee?: string | number | undefined;
        fee_treasury?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    }, {
        object: string | {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        guard?: string | undefined;
        arb_new?: {
            data: {
                description: string;
                order: string;
                votable_proposition: string[];
                max_fee?: string | number | undefined;
            };
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
        location?: string | undefined;
        endpoint?: string | null | undefined;
        bPaused?: boolean | undefined;
        arb_withdraw_fee?: {
            arb: string;
            data: {
                remark: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
                index?: string | number | bigint | undefined;
            };
        } | undefined;
        voting_guard?: {
            data: {
                guard: string;
                voting_weight?: string | number | undefined;
            }[];
            op: "set" | "add";
        } | {
            guards: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | undefined;
        arb_vote?: {
            arb: string;
            voting_guard: string;
            agrees: number[];
        } | undefined;
        arb_arbitration?: {
            arb: string;
            feedback: string;
            indemnity?: string | number | null | undefined;
        } | undefined;
        fee?: string | number | undefined;
        fee_treasury?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    }>;
    account: z.ZodOptional<z.ZodString>;
    witness: z.ZodOptional<z.ZodObject<{
        guards: z.ZodArray<z.ZodString, "many">;
        witness: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            witness: z.ZodAny;
            cmd: z.ZodArray<z.ZodObject<{
                witness: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>>;
                cmd: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }, {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }>, "many">;
            cited: z.ZodNumber;
            type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            identifier: z.ZodNumber;
            witnessTypes: z.ZodArray<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }, {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    }, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    }>>;
    session: z.ZodOptional<z.ZodObject<{
        network: z.ZodNativeEnum<typeof WOWOK.ENTRYPOINT>;
        retentive: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"always">, z.ZodLiteral<"session">]>>;
    }, "strip", z.ZodTypeAny, {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    }, {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    data: {
        object: string | {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        guard?: string | undefined;
        arb_new?: {
            data: {
                description: string;
                order: string;
                votable_proposition: string[];
                max_fee?: string | number | undefined;
            };
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
        location?: string | undefined;
        endpoint?: string | null | undefined;
        bPaused?: boolean | undefined;
        arb_withdraw_fee?: {
            arb: string;
            data: {
                remark: string;
                index: string | number | bigint;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
        } | undefined;
        voting_guard?: {
            data: {
                guard: string;
                voting_weight: string | number;
            }[];
            op: "set" | "add";
        } | {
            guards: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | undefined;
        arb_vote?: {
            arb: string;
            voting_guard: string;
            agrees: number[];
        } | undefined;
        arb_arbitration?: {
            arb: string;
            feedback: string;
            indemnity?: string | number | null | undefined;
        } | undefined;
        fee?: string | number | undefined;
        fee_treasury?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    };
    session?: {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    } | undefined;
    account?: string | undefined;
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    } | undefined;
}, {
    data: {
        object: string | {
            type_parameter: string;
            tags?: string[] | undefined;
            name?: string | undefined;
            permission?: string | {
                tags?: string[] | undefined;
                name?: string | undefined;
                description?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        };
        description?: string | undefined;
        guard?: string | undefined;
        arb_new?: {
            data: {
                description: string;
                order: string;
                votable_proposition: string[];
                max_fee?: string | number | undefined;
            };
            namedNew?: {
                tags?: string[] | undefined;
                name?: string | undefined;
                onChain?: boolean | undefined;
                useAddressIfNameExist?: boolean | undefined;
            } | undefined;
        } | undefined;
        location?: string | undefined;
        endpoint?: string | null | undefined;
        bPaused?: boolean | undefined;
        arb_withdraw_fee?: {
            arb: string;
            data: {
                remark: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
                index?: string | number | bigint | undefined;
            };
        } | undefined;
        voting_guard?: {
            data: {
                guard: string;
                voting_weight?: string | number | undefined;
            }[];
            op: "set" | "add";
        } | {
            guards: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | undefined;
        arb_vote?: {
            arb: string;
            voting_guard: string;
            agrees: number[];
        } | undefined;
        arb_arbitration?: {
            arb: string;
            feedback: string;
            indemnity?: string | number | null | undefined;
        } | undefined;
        fee?: string | number | undefined;
        fee_treasury?: string | {
            tags?: string[] | undefined;
            name?: string | undefined;
            description?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
    };
    session?: {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    } | undefined;
    account?: string | undefined;
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    } | undefined;
}>;
export declare const CallArbitrationSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallPersonalSchemaDescription = "Operations to create or modify on-chain personal information(including name, avatar, website, social media accounts, etc.) , and on-chain address favorites (such as naming, tagging, and favoriting addresses to facilitate easier management of these addresses and objects), where the 'account' field is used to sign transactions and the 'data' field defines object details.";
export declare const CallPersonalSchema: z.ZodObject<{
    data: z.ZodObject<{
        information: z.ZodUnion<[z.ZodObject<{
            op: z.ZodLiteral<"add">;
            data: z.ZodArray<z.ZodObject<{
                title: z.ZodString;
                value: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                value: string;
                title: string;
            }, {
                value: string;
                title: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            data: {
                value: string;
                title: string;
            }[];
            op: "add";
        }, {
            data: {
                value: string;
                title: string;
            }[];
            op: "add";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            title: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "remove";
            title: string[];
        }, {
            op: "remove";
            title: string[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>]>;
        description: z.ZodOptional<z.ZodString>;
        mark: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodLiteral<"add">;
            data: z.ZodArray<z.ZodObject<{
                address: z.ZodObject<{
                    name_or_address: z.ZodOptional<z.ZodString>;
                    local_mark_first: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }>;
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                tags?: string[] | undefined;
                name?: string | undefined;
            }, {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                tags?: string[] | undefined;
                name?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            data: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                tags?: string[] | undefined;
                name?: string | undefined;
            }[];
            op: "add";
        }, {
            data: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                tags?: string[] | undefined;
                name?: string | undefined;
            }[];
            op: "add";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            data: z.ZodArray<z.ZodObject<{
                address: z.ZodObject<{
                    name_or_address: z.ZodOptional<z.ZodString>;
                    local_mark_first: z.ZodOptional<z.ZodBoolean>;
                }, "strip", z.ZodTypeAny, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }, {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                }>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                tags?: string[] | undefined;
            }, {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                tags?: string[] | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            data: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                tags?: string[] | undefined;
            }[];
            op: "remove";
        }, {
            data: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                tags?: string[] | undefined;
            }[];
            op: "remove";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
            addresses: z.ZodArray<z.ZodObject<{
                name_or_address: z.ZodOptional<z.ZodString>;
                local_mark_first: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        }, {
            op: "removeall";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"transfer">;
            to: z.ZodObject<{
                name_or_address: z.ZodOptional<z.ZodString>;
                local_mark_first: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }, {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            to: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            op: "transfer";
        }, {
            to: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            op: "transfer";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"replace">;
            mark_object: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            mark_object: string;
            op: "replace";
        }, {
            mark_object: string;
            op: "replace";
        }>, z.ZodObject<{
            op: z.ZodLiteral<"destroy">;
        }, "strip", z.ZodTypeAny, {
            op: "destroy";
        }, {
            op: "destroy";
        }>]>>;
        faucet: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        information: {
            data: {
                value: string;
                title: string;
            }[];
            op: "add";
        } | {
            op: "remove";
            title: string[];
        } | {
            op: "removeall";
        };
        description?: string | undefined;
        mark?: {
            data: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                tags?: string[] | undefined;
                name?: string | undefined;
            }[];
            op: "add";
        } | {
            data: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                tags?: string[] | undefined;
            }[];
            op: "remove";
        } | {
            op: "removeall";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        } | {
            to: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            op: "transfer";
        } | {
            mark_object: string;
            op: "replace";
        } | {
            op: "destroy";
        } | undefined;
        faucet?: boolean | undefined;
    }, {
        information: {
            data: {
                value: string;
                title: string;
            }[];
            op: "add";
        } | {
            op: "remove";
            title: string[];
        } | {
            op: "removeall";
        };
        description?: string | undefined;
        mark?: {
            data: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                tags?: string[] | undefined;
                name?: string | undefined;
            }[];
            op: "add";
        } | {
            data: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                tags?: string[] | undefined;
            }[];
            op: "remove";
        } | {
            op: "removeall";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        } | {
            to: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            op: "transfer";
        } | {
            mark_object: string;
            op: "replace";
        } | {
            op: "destroy";
        } | undefined;
        faucet?: boolean | undefined;
    }>;
    account: z.ZodOptional<z.ZodString>;
    session: z.ZodOptional<z.ZodObject<{
        network: z.ZodNativeEnum<typeof WOWOK.ENTRYPOINT>;
        retentive: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"always">, z.ZodLiteral<"session">]>>;
    }, "strip", z.ZodTypeAny, {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    }, {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    data: {
        information: {
            data: {
                value: string;
                title: string;
            }[];
            op: "add";
        } | {
            op: "remove";
            title: string[];
        } | {
            op: "removeall";
        };
        description?: string | undefined;
        mark?: {
            data: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                tags?: string[] | undefined;
                name?: string | undefined;
            }[];
            op: "add";
        } | {
            data: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                tags?: string[] | undefined;
            }[];
            op: "remove";
        } | {
            op: "removeall";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        } | {
            to: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            op: "transfer";
        } | {
            mark_object: string;
            op: "replace";
        } | {
            op: "destroy";
        } | undefined;
        faucet?: boolean | undefined;
    };
    session?: {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    } | undefined;
    account?: string | undefined;
}, {
    data: {
        information: {
            data: {
                value: string;
                title: string;
            }[];
            op: "add";
        } | {
            op: "remove";
            title: string[];
        } | {
            op: "removeall";
        };
        description?: string | undefined;
        mark?: {
            data: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                tags?: string[] | undefined;
                name?: string | undefined;
            }[];
            op: "add";
        } | {
            data: {
                address: {
                    name_or_address?: string | undefined;
                    local_mark_first?: boolean | undefined;
                };
                tags?: string[] | undefined;
            }[];
            op: "remove";
        } | {
            op: "removeall";
            addresses: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            }[];
        } | {
            to: {
                name_or_address?: string | undefined;
                local_mark_first?: boolean | undefined;
            };
            op: "transfer";
        } | {
            mark_object: string;
            op: "replace";
        } | {
            op: "destroy";
        } | undefined;
        faucet?: boolean | undefined;
    };
    session?: {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    } | undefined;
    account?: string | undefined;
}>;
export declare const CallPersonalSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallGuardSchemaDescription = "Operations to create or modify an on-chain Arbitration object, where the 'account' field is used to sign transactions and the 'data' field defines object details. \nGuard object is immutable once created. A Guard object is designed to define a set of verification conditions that yield a final boolean result (True or False). \nThese conditions include querying on-chain object data (e.g., verifying if an order owner is 0x1234, or if 100 SUI tokens were paid from a specific Treasury object to 0x1234 and an order(owned by 0x1234) of a Service object  has reached the 'express loss verification' process node), validating Witness data provided by the signer (e.g., the provided order address must belong to a certain Service object, and the order owner must be the actual transaction signer), and performing mathematical/logical operations on numerical values. \nDue to its immutability, the Guard object is widely used as a pre-validation requirement for critical operations (e.g., placing an order for a Service object or withdrawing funds from a Treasury object). Additionally, Guard objects can be integrated with Permission object's operation validation: an operation is only executed if both the permission requirements and the Guard verification are satisfied.";
export declare const CallGuardSchema: z.ZodObject<{
    data: z.ZodObject<{
        namedNew: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }, {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        }>>;
        root: z.ZodType<any, z.ZodTypeDef, any>;
        description: z.ZodOptional<z.ZodString>;
        table: z.ZodOptional<z.ZodArray<z.ZodObject<{
            identifier: z.ZodNumber;
            bWitness: z.ZodBoolean;
            value_type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            value: z.ZodOptional<z.ZodAny>;
        }, "strip", z.ZodTypeAny, {
            bWitness: boolean;
            value_type: WOWOK.ValueType;
            identifier: number;
            value?: any;
        }, {
            bWitness: boolean;
            value_type: WOWOK.ValueType;
            identifier: number;
            value?: any;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        table?: {
            bWitness: boolean;
            value_type: WOWOK.ValueType;
            identifier: number;
            value?: any;
        }[] | undefined;
        description?: string | undefined;
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        root?: any;
    }, {
        table?: {
            bWitness: boolean;
            value_type: WOWOK.ValueType;
            identifier: number;
            value?: any;
        }[] | undefined;
        description?: string | undefined;
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        root?: any;
    }>;
    account: z.ZodOptional<z.ZodString>;
    session: z.ZodOptional<z.ZodObject<{
        network: z.ZodNativeEnum<typeof WOWOK.ENTRYPOINT>;
        retentive: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"always">, z.ZodLiteral<"session">]>>;
    }, "strip", z.ZodTypeAny, {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    }, {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    data: {
        table?: {
            bWitness: boolean;
            value_type: WOWOK.ValueType;
            identifier: number;
            value?: any;
        }[] | undefined;
        description?: string | undefined;
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        root?: any;
    };
    session?: {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    } | undefined;
    account?: string | undefined;
}, {
    data: {
        table?: {
            bWitness: boolean;
            value_type: WOWOK.ValueType;
            identifier: number;
            value?: any;
        }[] | undefined;
        description?: string | undefined;
        namedNew?: {
            tags?: string[] | undefined;
            name?: string | undefined;
            onChain?: boolean | undefined;
            useAddressIfNameExist?: boolean | undefined;
        } | undefined;
        root?: any;
    };
    session?: {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    } | undefined;
    account?: string | undefined;
}>;
export declare const CallGuardSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallObejctPermissionSchemaDescription = "Enables the use of the account field to sign transactions and leverages the data field to batch replace the permission management objects for objects of types including Machine, Service, Repository, Treasury, Arbitration, and Demand on-chain. \nThis operation facilitates centralized access control by managing the assignment of operation permissions (both built-in and custom) for these objects through the Permission object. \nFor the operation to succeed, the transaction signer must be the owner of the original Permission objects associated with these target objects.";
export declare const CallObejctPermissionSchema: z.ZodObject<{
    data: z.ZodObject<{
        objects: z.ZodArray<z.ZodString, "many">;
        new_permission: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        objects: string[];
        new_permission: string;
    }, {
        objects: string[];
        new_permission: string;
    }>;
    account: z.ZodOptional<z.ZodString>;
    witness: z.ZodOptional<z.ZodObject<{
        guards: z.ZodArray<z.ZodString, "many">;
        witness: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            witness: z.ZodAny;
            cmd: z.ZodArray<z.ZodObject<{
                witness: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>>;
                cmd: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }, {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }>, "many">;
            cited: z.ZodNumber;
            type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            identifier: z.ZodNumber;
            witnessTypes: z.ZodArray<z.ZodUnion<[z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ARBITRATION>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_ORDER>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ARB_SERVICE>, z.ZodLiteral<WOWOK.ContextType.TYPE_PROGRESS_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_MACHINE>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_PROGRESS>, z.ZodLiteral<WOWOK.ContextType.TYPE_ORDER_SERVICE>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }, {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    }, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    }>>;
    session: z.ZodOptional<z.ZodObject<{
        network: z.ZodNativeEnum<typeof WOWOK.ENTRYPOINT>;
        retentive: z.ZodDefault<z.ZodUnion<[z.ZodLiteral<"always">, z.ZodLiteral<"session">]>>;
    }, "strip", z.ZodTypeAny, {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    }, {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    data: {
        objects: string[];
        new_permission: string;
    };
    session?: {
        retentive: "always" | "session";
        network: WOWOK.ENTRYPOINT;
    } | undefined;
    account?: string | undefined;
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    } | undefined;
}, {
    data: {
        objects: string[];
        new_permission: string;
    };
    session?: {
        network: WOWOK.ENTRYPOINT;
        retentive?: "always" | "session" | undefined;
    } | undefined;
    account?: string | undefined;
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            guard: string;
            cmd: {
                cmd: number;
                witness?: WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE | undefined;
            }[];
            identifier: number;
            cited: number;
            witnessTypes: (WOWOK.ContextType.TYPE_ORDER_PROGRESS | WOWOK.ContextType.TYPE_ORDER_MACHINE | WOWOK.ContextType.TYPE_ORDER_SERVICE | WOWOK.ContextType.TYPE_PROGRESS_MACHINE | WOWOK.ContextType.TYPE_ARB_ORDER | WOWOK.ContextType.TYPE_ARB_ARBITRATION | WOWOK.ContextType.TYPE_ARB_PROGRESS | WOWOK.ContextType.TYPE_ARB_MACHINE | WOWOK.ContextType.TYPE_ARB_SERVICE)[];
            witness?: any;
        }[];
    } | undefined;
}>;
export declare const CallObejctPermissionSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
//# sourceMappingURL=call.d.ts.map