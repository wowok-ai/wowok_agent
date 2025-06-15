import { z } from "zod";
import * as WOWOK from 'wowok';
export declare const GetMarkNameSchema: (object?: string) => z.ZodString;
export declare const AccountNameSchema: z.ZodOptional<z.ZodString>;
export declare const AccountOrMarkNameSchema: z.ZodUnion<[z.ZodObject<{
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
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        }>]>>;
    } & {
        type_parameter: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type_parameter: string;
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    }, {
        type_parameter: string;
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
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
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
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
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
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
    root: z.ZodType<any, z.ZodTypeDef, any>;
    namedNew: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
        onChain: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
    }, {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
    }>>;
    description: z.ZodOptional<z.ZodString>;
    table: z.ZodOptional<z.ZodArray<z.ZodObject<{
        identifier: z.ZodNumber;
        bWitness: z.ZodBoolean;
        value_type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
        value: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        identifier: number;
        value_type: WOWOK.ValueType;
        bWitness: boolean;
        value?: any;
    }, {
        identifier: number;
        value_type: WOWOK.ValueType;
        bWitness: boolean;
        value?: any;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    root?: any;
    namedNew?: {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
    } | undefined;
    table?: {
        identifier: number;
        value_type: WOWOK.ValueType;
        bWitness: boolean;
        value?: any;
    }[] | undefined;
}, {
    description?: string | undefined;
    root?: any;
    namedNew?: {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
    } | undefined;
    table?: {
        identifier: number;
        value_type: WOWOK.ValueType;
        bWitness: boolean;
        value?: any;
    }[] | undefined;
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
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    }>]>;
    progress_new: z.ZodOptional<z.ZodObject<{
        task_address: z.ZodOptional<z.ZodString>;
        namedNew: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
        task_address?: string | undefined;
    }, {
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
        task_address?: string | undefined;
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
            operators: z.ZodArray<z.ZodUnion<[z.ZodObject<{
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
            }>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            name: string;
            operators: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        }, {
            name: string;
            operators: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        data: {
            name: string;
            operators: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        }[];
        progress?: string | undefined;
    }, {
        data: {
            name: string;
            operators: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
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
            parent_id: string;
            parent_session_id: number;
            operation: {
                next_node_name: string;
                forward: string;
            };
        }, {
            parent_id: string;
            parent_session_id: number;
            operation: {
                next_node_name: string;
                forward: string;
            };
        }>>;
    }, "strip", z.ZodTypeAny, {
        parent: {
            parent_id: string;
            parent_session_id: number;
            operation: {
                next_node_name: string;
                forward: string;
            };
        } | null;
        progress?: string | undefined;
    }, {
        parent: {
            parent_id: string;
            parent_session_id: number;
            operation: {
                next_node_name: string;
                forward: string;
            };
        } | null;
        progress?: string | undefined;
    }>>;
    progress_hold: z.ZodOptional<z.ZodObject<{
        progress: z.ZodOptional<z.ZodString>;
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
        operation: {
            next_node_name: string;
            forward: string;
        };
        bHold: boolean;
        progress?: string | undefined;
        adminUnhold?: boolean | undefined;
    }, {
        operation: {
            next_node_name: string;
            forward: string;
        };
        bHold: boolean;
        progress?: string | undefined;
        adminUnhold?: boolean | undefined;
    }>>;
    progress_task: z.ZodOptional<z.ZodObject<{
        progress: z.ZodString;
        task_address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        task_address: string;
        progress: string;
    }, {
        task_address: string;
        progress: string;
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
    endpoint: z.ZodOptional<z.ZodString>;
    consensus_repository: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodUnion<[z.ZodLiteral<"set">, z.ZodLiteral<"remove">, z.ZodLiteral<"add">]>;
        objects: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "set" | "add" | "remove";
        objects: string[];
    }, {
        op: "set" | "add" | "remove";
        objects: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>]>>;
    nodes: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodLiteral<"add">;
        data: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            pairs: z.ZodArray<z.ZodObject<{
                prior_node: z.ZodString;
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
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }, {
                    name: string;
                    permission?: any;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
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
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }[];
            }, {
                prior_node: string;
                threshold: number;
                forwards: {
                    name: string;
                    permission?: any;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }[];
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            name: string;
            pairs: {
                prior_node: string;
                threshold: number;
                forwards: {
                    name: string;
                    permission?: any;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }[];
            }[];
        }, {
            name: string;
            pairs: {
                prior_node: string;
                threshold: number;
                forwards: {
                    name: string;
                    permission?: any;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }[];
            }[];
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "add";
        data: {
            name: string;
            pairs: {
                prior_node: string;
                threshold: number;
                forwards: {
                    name: string;
                    permission?: any;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }[];
            }[];
        }[];
    }, {
        op: "add";
        data: {
            name: string;
            pairs: {
                prior_node: string;
                threshold: number;
                forwards: {
                    name: string;
                    permission?: any;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }[];
            }[];
        }[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        names: z.ZodArray<z.ZodString, "many">;
        bTransferMyself: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        op: "remove";
        names: string[];
        bTransferMyself?: boolean | undefined;
    }, {
        op: "remove";
        names: string[];
        bTransferMyself?: boolean | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"rename node">;
        data: z.ZodArray<z.ZodObject<{
            old: z.ZodString;
            new: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            old: string;
            new: string;
        }, {
            old: string;
            new: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "rename node";
        data: {
            old: string;
            new: string;
        }[];
    }, {
        op: "rename node";
        data: {
            old: string;
            new: string;
        }[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"add from myself">;
        addresses: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "add from myself";
        addresses: string[];
    }, {
        op: "add from myself";
        addresses: string[];
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
        pairs: {
            prior_node_name: string;
            node_name: string;
        }[];
        op: "remove pair";
    }, {
        pairs: {
            prior_node_name: string;
            node_name: string;
        }[];
        op: "remove pair";
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
                namedOperator?: string | undefined;
                weight?: number | undefined;
                guard?: string | undefined;
                suppliers?: {
                    service: string;
                    bRequired?: boolean | undefined;
                }[] | undefined;
            }, {
                name: string;
                permission?: any;
                namedOperator?: string | undefined;
                weight?: number | undefined;
                guard?: string | undefined;
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
                namedOperator?: string | undefined;
                weight?: number | undefined;
                guard?: string | undefined;
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
                namedOperator?: string | undefined;
                weight?: number | undefined;
                guard?: string | undefined;
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
        op: "add forward";
        data: {
            forward: {
                name: string;
                permission?: any;
                namedOperator?: string | undefined;
                weight?: number | undefined;
                guard?: string | undefined;
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
    }, {
        op: "add forward";
        data: {
            forward: {
                name: string;
                permission?: any;
                namedOperator?: string | undefined;
                weight?: number | undefined;
                guard?: string | undefined;
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
        op: "remove forward";
        data: {
            prior_node_name: string;
            node_name: string;
            forward_name: string;
        }[];
    }, {
        op: "remove forward";
        data: {
            prior_node_name: string;
            node_name: string;
            forward_name: string;
        }[];
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
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
    }, {
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    object: string | {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    };
    description?: string | undefined;
    progress_new?: {
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
        task_address?: string | undefined;
    } | undefined;
    progress_context_repository?: {
        repository: string | null;
        progress?: string | undefined;
    } | undefined;
    progress_namedOperator?: {
        data: {
            name: string;
            operators: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        }[];
        progress?: string | undefined;
    } | undefined;
    progress_parent?: {
        parent: {
            parent_id: string;
            parent_session_id: number;
            operation: {
                next_node_name: string;
                forward: string;
            };
        } | null;
        progress?: string | undefined;
    } | undefined;
    progress_hold?: {
        operation: {
            next_node_name: string;
            forward: string;
        };
        bHold: boolean;
        progress?: string | undefined;
        adminUnhold?: boolean | undefined;
    } | undefined;
    progress_task?: {
        task_address: string;
        progress: string;
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
    endpoint?: string | undefined;
    consensus_repository?: {
        op: "set" | "add" | "remove";
        objects: string[];
    } | {
        op: "removeall";
    } | undefined;
    nodes?: {
        op: "add";
        data: {
            name: string;
            pairs: {
                prior_node: string;
                threshold: number;
                forwards: {
                    name: string;
                    permission?: any;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }[];
            }[];
        }[];
    } | {
        op: "remove";
        names: string[];
        bTransferMyself?: boolean | undefined;
    } | {
        op: "rename node";
        data: {
            old: string;
            new: string;
        }[];
    } | {
        op: "add from myself";
        addresses: string[];
    } | {
        pairs: {
            prior_node_name: string;
            node_name: string;
        }[];
        op: "remove pair";
    } | {
        op: "add forward";
        data: {
            forward: {
                name: string;
                permission?: any;
                namedOperator?: string | undefined;
                weight?: number | undefined;
                guard?: string | undefined;
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
    } | {
        op: "remove forward";
        data: {
            prior_node_name: string;
            node_name: string;
            forward_name: string;
        }[];
    } | undefined;
    bPublished?: boolean | undefined;
    bPaused?: boolean | undefined;
    clone_new?: {
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
    } | undefined;
}, {
    object: string | {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    };
    description?: string | undefined;
    progress_new?: {
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
        task_address?: string | undefined;
    } | undefined;
    progress_context_repository?: {
        repository: string | null;
        progress?: string | undefined;
    } | undefined;
    progress_namedOperator?: {
        data: {
            name: string;
            operators: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        }[];
        progress?: string | undefined;
    } | undefined;
    progress_parent?: {
        parent: {
            parent_id: string;
            parent_session_id: number;
            operation: {
                next_node_name: string;
                forward: string;
            };
        } | null;
        progress?: string | undefined;
    } | undefined;
    progress_hold?: {
        operation: {
            next_node_name: string;
            forward: string;
        };
        bHold: boolean;
        progress?: string | undefined;
        adminUnhold?: boolean | undefined;
    } | undefined;
    progress_task?: {
        task_address: string;
        progress: string;
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
    endpoint?: string | undefined;
    consensus_repository?: {
        op: "set" | "add" | "remove";
        objects: string[];
    } | {
        op: "removeall";
    } | undefined;
    nodes?: {
        op: "add";
        data: {
            name: string;
            pairs: {
                prior_node: string;
                threshold: number;
                forwards: {
                    name: string;
                    permission?: any;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }[];
            }[];
        }[];
    } | {
        op: "remove";
        names: string[];
        bTransferMyself?: boolean | undefined;
    } | {
        op: "rename node";
        data: {
            old: string;
            new: string;
        }[];
    } | {
        op: "add from myself";
        addresses: string[];
    } | {
        pairs: {
            prior_node_name: string;
            node_name: string;
        }[];
        op: "remove pair";
    } | {
        op: "add forward";
        data: {
            forward: {
                name: string;
                permission?: any;
                namedOperator?: string | undefined;
                weight?: number | undefined;
                guard?: string | undefined;
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
    } | {
        op: "remove forward";
        data: {
            prior_node_name: string;
            node_name: string;
            forward_name: string;
        }[];
    } | undefined;
    bPublished?: boolean | undefined;
    bPaused?: boolean | undefined;
    clone_new?: {
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
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
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
    }, {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
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
        op: "add";
        data: {
            name: string;
            index: number;
        }[];
    }, {
        op: "add";
        data: {
            name: string;
            index?: any;
        }[];
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
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            permissions: {
                index: number;
                guard?: string | undefined;
            }[];
        }, {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
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
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
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
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
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
                guard: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                guard?: string | undefined;
            }, {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                guard?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            index: number;
            entities: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                guard?: string | undefined;
            }[];
        }, {
            entities: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
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
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                guard?: string | undefined;
            }[];
        }[];
    }, {
        op: "add permission";
        permissions: {
            entities: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                guard?: string | undefined;
            }[];
            index?: any;
        }[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove entity">;
        addresses: z.ZodArray<z.ZodUnion<[z.ZodObject<{
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
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "remove entity";
        addresses: ({
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        })[];
    }, {
        op: "remove entity";
        addresses: ({
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        })[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove permission">;
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
        index: z.ZodArray<z.ZodEffects<z.ZodTypeAny, number, any>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "remove permission";
        address: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        index: number[];
    }, {
        op: "remove permission";
        address: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        index: any[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"transfer permission">;
        from: z.ZodUnion<[z.ZodObject<{
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
        to: z.ZodUnion<[z.ZodObject<{
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
        op: "transfer permission";
        from: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        to: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
    }, {
        op: "transfer permission";
        from: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        to: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
    }>]>>;
    admin: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodUnion<[z.ZodLiteral<"add">, z.ZodLiteral<"remove">, z.ZodLiteral<"set">]>;
        addresses: z.ZodArray<z.ZodUnion<[z.ZodObject<{
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
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "set" | "add" | "remove";
        addresses: ({
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        })[];
    }, {
        op: "set" | "add" | "remove";
        addresses: ({
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        })[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>]>>;
    builder: z.ZodUnion<[z.ZodObject<{
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
    object: string | {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
    };
    builder: {
        account_or_address?: string | undefined;
    } | {
        mark_or_address: string;
    };
    description?: string | undefined;
    permission?: {
        op: "add entity";
        entities: {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
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
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                guard?: string | undefined;
            }[];
        }[];
    } | {
        op: "remove entity";
        addresses: ({
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        })[];
    } | {
        op: "remove permission";
        address: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        index: number[];
    } | {
        op: "transfer permission";
        from: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        to: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
    } | undefined;
    biz_permission?: {
        op: "add";
        data: {
            name: string;
            index: number;
        }[];
    } | {
        op: "remove";
        permissions: number[];
    } | undefined;
    admin?: {
        op: "set" | "add" | "remove";
        addresses: ({
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        })[];
    } | {
        op: "removeall";
    } | undefined;
}, {
    object: string | {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
    };
    builder: {
        account_or_address?: string | undefined;
    } | {
        mark_or_address: string;
    };
    description?: string | undefined;
    permission?: {
        op: "add entity";
        entities: {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
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
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                guard?: string | undefined;
            }[];
            index?: any;
        }[];
    } | {
        op: "remove entity";
        addresses: ({
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        })[];
    } | {
        op: "remove permission";
        address: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        index: any[];
    } | {
        op: "transfer permission";
        from: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        to: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
    } | undefined;
    biz_permission?: {
        op: "add";
        data: {
            name: string;
            index?: any;
        }[];
    } | {
        op: "remove";
        permissions: any[];
    } | undefined;
    admin?: {
        op: "set" | "add" | "remove";
        addresses: ({
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        })[];
    } | {
        op: "removeall";
    } | undefined;
}>;
export declare const RepositoryAddressID: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodUnion<[z.ZodObject<{
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
}>]>]>;
export declare const PayParamSchema: z.ZodObject<{
    index: z.ZodUnion<[z.ZodDefault<z.ZodNumber>, z.ZodBigInt, z.ZodString]>;
    remark: z.ZodString;
    for_object: z.ZodOptional<z.ZodString>;
    for_guard: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    index: string | number | bigint;
    remark: string;
    for_object?: string | undefined;
    for_guard?: string | undefined;
}, {
    remark: string;
    index?: string | number | bigint | undefined;
    for_object?: string | undefined;
    for_guard?: string | undefined;
}>;
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
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    }, {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    }>]>;
    description: z.ZodOptional<z.ZodString>;
    reference: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodUnion<[z.ZodLiteral<"set">, z.ZodLiteral<"remove">, z.ZodLiteral<"add">]>;
        objects: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "set" | "add" | "remove";
        objects: string[];
    }, {
        op: "set" | "add" | "remove";
        objects: string[];
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
        }, "strip", z.ZodTypeAny, {
            description: string;
            key: string;
            dataType: WOWOK.RepositoryValueType;
            permissionIndex?: number | null | undefined;
        }, {
            description: string;
            key: string;
            dataType: WOWOK.RepositoryValueType;
            permissionIndex?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "set" | "add";
        data: {
            description: string;
            key: string;
            dataType: WOWOK.RepositoryValueType;
            permissionIndex?: number | null | undefined;
        }[];
    }, {
        op: "set" | "add";
        data: {
            description: string;
            key: string;
            dataType: WOWOK.RepositoryValueType;
            permissionIndex?: any;
        }[];
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
            old: string;
            new: string;
        }, {
            old: string;
            new: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "rename";
        data: {
            old: string;
            new: string;
        }[];
    }, {
        op: "rename";
        data: {
            old: string;
            new: string;
        }[];
    }>]>>;
    data: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodLiteral<"add">;
        data: z.ZodUnion<[z.ZodObject<{
            key: z.ZodString;
            data: z.ZodArray<z.ZodObject<{
                address: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodUnion<[z.ZodObject<{
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
                }>]>]>;
                bcsBytes: z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>;
                value_type: z.ZodOptional<z.ZodNativeEnum<typeof WOWOK.ValueType>>;
            }, "strip", z.ZodTypeAny, {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                bcsBytes: Uint8Array;
                value_type?: WOWOK.ValueType | undefined;
            }, {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                bcsBytes: Uint8Array;
                value_type?: WOWOK.ValueType | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            data: {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                bcsBytes: Uint8Array;
                value_type?: WOWOK.ValueType | undefined;
            }[];
            key: string;
        }, {
            data: {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                bcsBytes: Uint8Array;
                value_type?: WOWOK.ValueType | undefined;
            }[];
            key: string;
        }>, z.ZodObject<{
            address: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodUnion<[z.ZodObject<{
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
            }>]>]>;
            data: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                bcsBytes: z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>;
            }, "strip", z.ZodTypeAny, {
                key: string;
                bcsBytes: Uint8Array;
            }, {
                key: string;
                bcsBytes: Uint8Array;
            }>, "many">;
            value_type: z.ZodOptional<z.ZodNativeEnum<typeof WOWOK.ValueType>>;
        }, "strip", z.ZodTypeAny, {
            address: number | bigint | {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            data: {
                key: string;
                bcsBytes: Uint8Array;
            }[];
            value_type?: WOWOK.ValueType | undefined;
        }, {
            address: number | bigint | {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            data: {
                key: string;
                bcsBytes: Uint8Array;
            }[];
            value_type?: WOWOK.ValueType | undefined;
        }>]>;
    }, "strip", z.ZodTypeAny, {
        op: "add";
        data: {
            data: {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                bcsBytes: Uint8Array;
                value_type?: WOWOK.ValueType | undefined;
            }[];
            key: string;
        } | {
            address: number | bigint | {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            data: {
                key: string;
                bcsBytes: Uint8Array;
            }[];
            value_type?: WOWOK.ValueType | undefined;
        };
    }, {
        op: "add";
        data: {
            data: {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                bcsBytes: Uint8Array;
                value_type?: WOWOK.ValueType | undefined;
            }[];
            key: string;
        } | {
            address: number | bigint | {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            data: {
                key: string;
                bcsBytes: Uint8Array;
            }[];
            value_type?: WOWOK.ValueType | undefined;
        };
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        data: z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            address: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodUnion<[z.ZodObject<{
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
            }>]>]>;
        }, "strip", z.ZodTypeAny, {
            address: number | bigint | {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            key: string;
        }, {
            address: number | bigint | {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            key: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "remove";
        data: {
            address: number | bigint | {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            key: string;
        }[];
    }, {
        op: "remove";
        data: {
            address: number | bigint | {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            key: string;
        }[];
    }>]>>;
}, "strip", z.ZodTypeAny, {
    object: string | {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    };
    description?: string | undefined;
    data?: {
        op: "add";
        data: {
            data: {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                bcsBytes: Uint8Array;
                value_type?: WOWOK.ValueType | undefined;
            }[];
            key: string;
        } | {
            address: number | bigint | {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            data: {
                key: string;
                bcsBytes: Uint8Array;
            }[];
            value_type?: WOWOK.ValueType | undefined;
        };
    } | {
        op: "remove";
        data: {
            address: number | bigint | {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            key: string;
        }[];
    } | undefined;
    reference?: {
        op: "set" | "add" | "remove";
        objects: string[];
    } | {
        op: "removeall";
    } | undefined;
    mode?: WOWOK.Repository_Policy_Mode | undefined;
    policy?: {
        op: "set" | "add";
        data: {
            description: string;
            key: string;
            dataType: WOWOK.RepositoryValueType;
            permissionIndex?: number | null | undefined;
        }[];
    } | {
        keys: string[];
        op: "remove";
    } | {
        op: "removeall";
    } | {
        op: "rename";
        data: {
            old: string;
            new: string;
        }[];
    } | undefined;
}, {
    object: string | {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    };
    description?: string | undefined;
    data?: {
        op: "add";
        data: {
            data: {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                bcsBytes: Uint8Array;
                value_type?: WOWOK.ValueType | undefined;
            }[];
            key: string;
        } | {
            address: number | bigint | {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            data: {
                key: string;
                bcsBytes: Uint8Array;
            }[];
            value_type?: WOWOK.ValueType | undefined;
        };
    } | {
        op: "remove";
        data: {
            address: number | bigint | {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            key: string;
        }[];
    } | undefined;
    reference?: {
        op: "set" | "add" | "remove";
        objects: string[];
    } | {
        op: "removeall";
    } | undefined;
    mode?: WOWOK.Repository_Policy_Mode | undefined;
    policy?: {
        op: "set" | "add";
        data: {
            description: string;
            key: string;
            dataType: WOWOK.RepositoryValueType;
            permissionIndex?: any;
        }[];
    } | {
        keys: string[];
        op: "remove";
    } | {
        op: "removeall";
    } | {
        op: "rename";
        data: {
            old: string;
            new: string;
        }[];
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
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        }>]>>;
    } & {
        type_parameter: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type_parameter: string;
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    }, {
        type_parameter: string;
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
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
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        data: {
            description: string;
            order: string;
            votable_proposition: string[];
            max_fee?: string | number | undefined;
        };
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
    }, {
        data: {
            description: string;
            order: string;
            votable_proposition: string[];
            max_fee?: string | number | undefined;
        };
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
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
            index: string | number | bigint;
            remark: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        }, {
            remark: string;
            index?: string | number | bigint | undefined;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: {
            index: string | number | bigint;
            remark: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        };
        arb: string;
    }, {
        data: {
            remark: string;
            index?: string | number | bigint | undefined;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        };
        arb: string;
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
        indemnity: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    }, "strip", z.ZodTypeAny, {
        arb: string;
        feedback: string;
        indemnity?: string | number | undefined;
    }, {
        arb: string;
        feedback: string;
        indemnity?: string | number | undefined;
    }>>;
    description: z.ZodOptional<z.ZodString>;
    endpoint: z.ZodOptional<z.ZodString>;
    fee: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
    fee_treasury: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
        onChain: z.ZodOptional<z.ZodBoolean>;
    } & {
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        description?: string | undefined;
    }, {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        description?: string | undefined;
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
        op: "set" | "add";
        data: {
            guard: string;
            voting_weight: string | number;
        }[];
    }, {
        op: "set" | "add";
        data: {
            guard: string;
            voting_weight?: string | number | undefined;
        }[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        guards: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "remove";
        guards: string[];
    }, {
        op: "remove";
        guards: string[];
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
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    };
    description?: string | undefined;
    guard?: string | undefined;
    endpoint?: string | undefined;
    bPaused?: boolean | undefined;
    arb_new?: {
        data: {
            description: string;
            order: string;
            votable_proposition: string[];
            max_fee?: string | number | undefined;
        };
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
    } | undefined;
    arb_withdraw_fee?: {
        data: {
            index: string | number | bigint;
            remark: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        };
        arb: string;
    } | undefined;
    voting_guard?: {
        op: "set" | "add";
        data: {
            guard: string;
            voting_weight: string | number;
        }[];
    } | {
        op: "remove";
        guards: string[];
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
        indemnity?: string | number | undefined;
    } | undefined;
    fee?: string | number | undefined;
    fee_treasury?: string | {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        description?: string | undefined;
    } | undefined;
}, {
    object: string | {
        type_parameter: string;
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    };
    description?: string | undefined;
    guard?: string | undefined;
    endpoint?: string | undefined;
    bPaused?: boolean | undefined;
    arb_new?: {
        data: {
            description: string;
            order: string;
            votable_proposition: string[];
            max_fee?: string | number | undefined;
        };
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
    } | undefined;
    arb_withdraw_fee?: {
        data: {
            remark: string;
            index?: string | number | bigint | undefined;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        };
        arb: string;
    } | undefined;
    voting_guard?: {
        op: "set" | "add";
        data: {
            guard: string;
            voting_weight?: string | number | undefined;
        }[];
    } | {
        op: "remove";
        guards: string[];
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
        indemnity?: string | number | undefined;
    } | undefined;
    fee?: string | number | undefined;
    fee_treasury?: string | {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        description?: string | undefined;
    } | undefined;
}>;
export declare const ReceiverParamSchema: z.ZodObject<{
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
    amount: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
}, "strip", z.ZodTypeAny, {
    address: {
        account_or_address?: string | undefined;
    } | {
        mark_or_address: string;
    };
    amount: string | number;
}, {
    address: {
        account_or_address?: string | undefined;
    } | {
        mark_or_address: string;
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
        amount: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
    }, "strip", z.ZodTypeAny, {
        address: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        amount: string | number;
    }, {
        address: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        amount: string | number;
    }>, "many">;
    withdraw_guard: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    index: string | number | bigint;
    remark: string;
    receiver: {
        address: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
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
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        amount: string | number;
    }[];
    index?: string | number | bigint | undefined;
    for_object?: string | undefined;
    for_guard?: string | undefined;
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
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        }>]>>;
    } & {
        type_parameter: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type_parameter: string;
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    }, {
        type_parameter: string;
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    }>]>;
    deposit: z.ZodOptional<z.ZodObject<{
        balance: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        param: z.ZodOptional<z.ZodObject<{
            index: z.ZodUnion<[z.ZodDefault<z.ZodNumber>, z.ZodBigInt, z.ZodString]>;
            remark: z.ZodString;
            for_object: z.ZodOptional<z.ZodString>;
            for_guard: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            index: string | number | bigint;
            remark: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        }, {
            remark: string;
            index?: string | number | bigint | undefined;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        balance: string | number;
        param?: {
            index: string | number | bigint;
            remark: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        } | undefined;
    }, {
        balance: string | number;
        param?: {
            remark: string;
            index?: string | number | bigint | undefined;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        } | undefined;
    }>>;
    receive: z.ZodUnion<[z.ZodObject<{
        received_objects: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        received_objects: string[];
    }, {
        received_objects: string[];
    }>, z.ZodLiteral<"recently">]>;
    withdraw: z.ZodObject<{
        index: z.ZodUnion<[z.ZodDefault<z.ZodNumber>, z.ZodBigInt, z.ZodString]>;
        remark: z.ZodString;
        for_object: z.ZodOptional<z.ZodString>;
        for_guard: z.ZodOptional<z.ZodString>;
    } & {
        receiver: z.ZodArray<z.ZodObject<{
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
            amount: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        }, "strip", z.ZodTypeAny, {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            amount: string | number;
        }, {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            amount: string | number;
        }>, "many">;
        withdraw_guard: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        index: string | number | bigint;
        remark: string;
        receiver: {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
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
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            amount: string | number;
        }[];
        index?: string | number | bigint | undefined;
        for_object?: string | undefined;
        for_guard?: string | undefined;
        withdraw_guard?: string | undefined;
    }>;
    description: z.ZodOptional<z.ZodString>;
    deposit_guard: z.ZodOptional<z.ZodString>;
    withdraw_guard: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodUnion<[z.ZodLiteral<"add">, z.ZodLiteral<"set">]>;
        data: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            amount: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        }, "strip", z.ZodTypeAny, {
            guard: string;
            amount: string | number;
        }, {
            guard: string;
            amount: string | number;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "set" | "add";
        data: {
            guard: string;
            amount: string | number;
        }[];
    }, {
        op: "set" | "add";
        data: {
            guard: string;
            amount: string | number;
        }[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        guards: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "remove";
        guards: string[];
    }, {
        op: "remove";
        guards: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>]>>;
    withdraw_mode: z.ZodUnion<[z.ZodLiteral<WOWOK.Treasury_WithdrawMode.PERMISSION>, z.ZodLiteral<WOWOK.Treasury_WithdrawMode.GUARD_ONLY_AND_IMMUTABLE>, z.ZodLiteral<WOWOK.Treasury_WithdrawMode.BOTH_PERMISSION_AND_GUARD>]>;
}, "strip", z.ZodTypeAny, {
    object: string | {
        type_parameter: string;
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    };
    receive: {
        received_objects: string[];
    } | "recently";
    withdraw: {
        index: string | number | bigint;
        remark: string;
        receiver: {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            amount: string | number;
        }[];
        for_object?: string | undefined;
        for_guard?: string | undefined;
        withdraw_guard?: string | undefined;
    };
    withdraw_mode: WOWOK.Treasury_WithdrawMode;
    description?: string | undefined;
    withdraw_guard?: {
        op: "set" | "add";
        data: {
            guard: string;
            amount: string | number;
        }[];
    } | {
        op: "remove";
        guards: string[];
    } | {
        op: "removeall";
    } | undefined;
    deposit?: {
        balance: string | number;
        param?: {
            index: string | number | bigint;
            remark: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        } | undefined;
    } | undefined;
    deposit_guard?: string | undefined;
}, {
    object: string | {
        type_parameter: string;
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    };
    receive: {
        received_objects: string[];
    } | "recently";
    withdraw: {
        remark: string;
        receiver: {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            amount: string | number;
        }[];
        index?: string | number | bigint | undefined;
        for_object?: string | undefined;
        for_guard?: string | undefined;
        withdraw_guard?: string | undefined;
    };
    withdraw_mode: WOWOK.Treasury_WithdrawMode;
    description?: string | undefined;
    withdraw_guard?: {
        op: "set" | "add";
        data: {
            guard: string;
            amount: string | number;
        }[];
    } | {
        op: "remove";
        guards: string[];
    } | {
        op: "removeall";
    } | undefined;
    deposit?: {
        balance: string | number;
        param?: {
            remark: string;
            index?: string | number | bigint | undefined;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        } | undefined;
    } | undefined;
    deposit_guard?: string | undefined;
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
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        }>]>>;
    } & {
        type_parameter: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type_parameter: string;
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    }, {
        type_parameter: string;
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
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
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        }>>;
        namedNewProgress: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
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
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
        namedNewProgress?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
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
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
        namedNewProgress?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
    }>>;
    order_agent: z.ZodOptional<z.ZodObject<{
        order: z.ZodOptional<z.ZodString>;
        agents: z.ZodArray<z.ZodUnion<[z.ZodObject<{
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
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        agents: ({
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        })[];
        order?: string | undefined;
    }, {
        agents: ({
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        })[];
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
        order: string;
        arb: string;
    }, {
        order: string;
        arb: string;
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
            index: string | number | bigint;
            remark: string;
            withdraw_guard: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        }, {
            remark: string;
            withdraw_guard: string;
            index?: string | number | bigint | undefined;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        data: {
            index: string | number | bigint;
            remark: string;
            withdraw_guard: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        };
        order: string;
    }, {
        data: {
            remark: string;
            withdraw_guard: string;
            index?: string | number | bigint | undefined;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        };
        order: string;
    }>>;
    order_payer: z.ZodOptional<z.ZodObject<{
        order: z.ZodOptional<z.ZodString>;
        payer_new: z.ZodUnion<[z.ZodObject<{
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
        payer_new: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        order?: string | undefined;
    }, {
        payer_new: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        order?: string | undefined;
    }>>;
    description: z.ZodOptional<z.ZodString>;
    endpoint: z.ZodOptional<z.ZodString>;
    payee_treasury: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
        onChain: z.ZodOptional<z.ZodBoolean>;
    } & {
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        description?: string | undefined;
    }, {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        description?: string | undefined;
    }>]>>;
    gen_discount: z.ZodOptional<z.ZodArray<z.ZodObject<{
        receiver: z.ZodUnion<[z.ZodObject<{
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
        count: z.ZodDefault<z.ZodNumber>;
        discount: z.ZodObject<{
            name: z.ZodDefault<z.ZodString>;
            type: z.ZodUnion<[z.ZodLiteral<WOWOK.Service_Discount_Type.ratio>, z.ZodLiteral<WOWOK.Service_Discount_Type.minus>]>;
            off: z.ZodNumber;
            duration_minutes: z.ZodDefault<z.ZodNumber>;
            time_start: z.ZodOptional<z.ZodNumber>;
            price_greater: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
        }, "strip", z.ZodTypeAny, {
            type: WOWOK.Service_Discount_Type;
            name: string;
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
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        count: number;
        discount: {
            type: WOWOK.Service_Discount_Type;
            name: string;
            off: number;
            duration_minutes: number;
            time_start?: number | undefined;
            price_greater?: string | number | undefined;
        };
    }, {
        receiver: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
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
        op: "set" | "add" | "remove";
        objects: string[];
    }, {
        op: "set" | "add" | "remove";
        objects: string[];
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
        op: "set" | "add" | "remove";
        objects: string[];
    }, {
        op: "set" | "add" | "remove";
        objects: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>]>>;
    machine: z.ZodOptional<z.ZodString>;
    arbitration: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodUnion<[z.ZodLiteral<"set">, z.ZodLiteral<"remove">, z.ZodLiteral<"add">]>;
        objects: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "set" | "add" | "remove";
        objects: string[];
    }, {
        op: "set" | "add" | "remove";
        objects: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>]>>;
    customer_required_info: z.ZodOptional<z.ZodObject<{
        pubkey: z.ZodString;
        required_info: z.ZodArray<z.ZodUnion<[z.ZodLiteral<WOWOK.BuyRequiredEnum.address>, z.ZodLiteral<WOWOK.BuyRequiredEnum.phone>, z.ZodLiteral<WOWOK.BuyRequiredEnum.postcode>, z.ZodLiteral<WOWOK.BuyRequiredEnum.name>, z.ZodString]>, "many">;
    }, "strip", z.ZodTypeAny, {
        pubkey: string;
        required_info: string[];
    }, {
        pubkey: string;
        required_info: string[];
    }>>;
    sales: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodLiteral<"add">;
        sales: z.ZodArray<z.ZodObject<{
            item: z.ZodString;
            price: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            stock: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            endpoint: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            item: string;
            price: string | number;
            stock: string | number;
            endpoint?: string | undefined;
        }, {
            item: string;
            price: string | number;
            stock: string | number;
            endpoint?: string | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "add";
        sales: {
            item: string;
            price: string | number;
            stock: string | number;
            endpoint?: string | undefined;
        }[];
    }, {
        op: "add";
        sales: {
            item: string;
            price: string | number;
            stock: string | number;
            endpoint?: string | undefined;
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
        op: "set" | "add";
        guards: {
            guard: string;
            percent: number;
        }[];
    }, {
        op: "set" | "add";
        guards: {
            guard: string;
            percent: number;
        }[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        guards: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "remove";
        guards: string[];
    }, {
        op: "remove";
        guards: string[];
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
        op: "set" | "add";
        guards: {
            guard: string;
            percent: number;
        }[];
    }, {
        op: "set" | "add";
        guards: {
            guard: string;
            percent: number;
        }[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        guards: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "remove";
        guards: string[];
    }, {
        op: "remove";
        guards: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
    }, {
        op: "removeall";
    }>]>>;
    bPublished: z.ZodOptional<z.ZodBoolean>;
    buy_guard: z.ZodOptional<z.ZodString>;
    bPaused: z.ZodOptional<z.ZodBoolean>;
    clone_new: z.ZodOptional<z.ZodObject<{
        token_type_new: z.ZodOptional<z.ZodString>;
        namedNew: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
        token_type_new?: string | undefined;
    }, {
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
        token_type_new?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    object: string | {
        type_parameter: string;
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    };
    description?: string | undefined;
    repository?: {
        op: "set" | "add" | "remove";
        objects: string[];
    } | {
        op: "removeall";
    } | undefined;
    endpoint?: string | undefined;
    bPublished?: boolean | undefined;
    bPaused?: boolean | undefined;
    clone_new?: {
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
        token_type_new?: string | undefined;
    } | undefined;
    withdraw_guard?: {
        op: "set" | "add";
        guards: {
            guard: string;
            percent: number;
        }[];
    } | {
        op: "remove";
        guards: string[];
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
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
        namedNewProgress?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
    } | undefined;
    order_agent?: {
        agents: ({
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        })[];
        order?: string | undefined;
    } | undefined;
    order_required_info?: {
        order: string;
        customer_info_required?: string | undefined;
    } | undefined;
    refund_guard?: {
        op: "set" | "add";
        guards: {
            guard: string;
            percent: number;
        }[];
    } | {
        op: "remove";
        guards: string[];
    } | {
        op: "removeall";
    } | undefined;
    order_refund?: {
        order: string;
        arb: string;
    } | {
        order: string;
        refund_guard: string;
    } | undefined;
    order_withdrawl?: {
        data: {
            index: string | number | bigint;
            remark: string;
            withdraw_guard: string;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        };
        order: string;
    } | undefined;
    order_payer?: {
        payer_new: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        order?: string | undefined;
    } | undefined;
    payee_treasury?: string | {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        description?: string | undefined;
    } | undefined;
    gen_discount?: {
        receiver: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        count: number;
        discount: {
            type: WOWOK.Service_Discount_Type;
            name: string;
            off: number;
            duration_minutes: number;
            time_start?: number | undefined;
            price_greater?: string | number | undefined;
        };
    }[] | undefined;
    extern_withdraw_treasury?: {
        op: "set" | "add" | "remove";
        objects: string[];
    } | {
        op: "removeall";
    } | undefined;
    machine?: string | undefined;
    arbitration?: {
        op: "set" | "add" | "remove";
        objects: string[];
    } | {
        op: "removeall";
    } | undefined;
    customer_required_info?: {
        pubkey: string;
        required_info: string[];
    } | undefined;
    sales?: {
        op: "add";
        sales: {
            item: string;
            price: string | number;
            stock: string | number;
            endpoint?: string | undefined;
        }[];
    } | {
        op: "remove";
        sales_name: string[];
    } | undefined;
    buy_guard?: string | undefined;
}, {
    object: string | {
        type_parameter: string;
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        permission?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    };
    description?: string | undefined;
    repository?: {
        op: "set" | "add" | "remove";
        objects: string[];
    } | {
        op: "removeall";
    } | undefined;
    endpoint?: string | undefined;
    bPublished?: boolean | undefined;
    bPaused?: boolean | undefined;
    clone_new?: {
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
        token_type_new?: string | undefined;
    } | undefined;
    withdraw_guard?: {
        op: "set" | "add";
        guards: {
            guard: string;
            percent: number;
        }[];
    } | {
        op: "remove";
        guards: string[];
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
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
        namedNewProgress?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
    } | undefined;
    order_agent?: {
        agents: ({
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        })[];
        order?: string | undefined;
    } | undefined;
    order_required_info?: {
        order: string;
        customer_info_required?: string | undefined;
    } | undefined;
    refund_guard?: {
        op: "set" | "add";
        guards: {
            guard: string;
            percent: number;
        }[];
    } | {
        op: "remove";
        guards: string[];
    } | {
        op: "removeall";
    } | undefined;
    order_refund?: {
        order: string;
        arb: string;
    } | {
        order: string;
        refund_guard: string;
    } | undefined;
    order_withdrawl?: {
        data: {
            remark: string;
            withdraw_guard: string;
            index?: string | number | bigint | undefined;
            for_object?: string | undefined;
            for_guard?: string | undefined;
        };
        order: string;
    } | undefined;
    order_payer?: {
        payer_new: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        order?: string | undefined;
    } | undefined;
    payee_treasury?: string | {
        name?: string | undefined;
        tags?: string[] | undefined;
        useAddressIfNameExist?: boolean | undefined;
        onChain?: boolean | undefined;
        description?: string | undefined;
    } | undefined;
    gen_discount?: {
        receiver: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
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
        op: "set" | "add" | "remove";
        objects: string[];
    } | {
        op: "removeall";
    } | undefined;
    machine?: string | undefined;
    arbitration?: {
        op: "set" | "add" | "remove";
        objects: string[];
    } | {
        op: "removeall";
    } | undefined;
    customer_required_info?: {
        pubkey: string;
        required_info: string[];
    } | undefined;
    sales?: {
        op: "add";
        sales: {
            item: string;
            price: string | number;
            stock: string | number;
            endpoint?: string | undefined;
        }[];
    } | {
        op: "remove";
        sales_name: string[];
    } | undefined;
    buy_guard?: string | undefined;
}>;
export declare const CallPersonalDataSchema: z.ZodObject<{
    information: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        avatar: z.ZodOptional<z.ZodString>;
        twitter: z.ZodOptional<z.ZodString>;
        discord: z.ZodOptional<z.ZodString>;
        homepage: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        description?: string | undefined;
        avatar?: string | undefined;
        twitter?: string | undefined;
        discord?: string | undefined;
        homepage?: string | undefined;
    }, {
        name: string;
        description?: string | undefined;
        avatar?: string | undefined;
        twitter?: string | undefined;
        discord?: string | undefined;
        homepage?: string | undefined;
    }>>;
    mark: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
        op: z.ZodLiteral<"add">;
        data: z.ZodArray<z.ZodObject<{
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
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            name?: string | undefined;
            tags?: string[] | undefined;
        }, {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            name?: string | undefined;
            tags?: string[] | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "add";
        data: {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            name?: string | undefined;
            tags?: string[] | undefined;
        }[];
    }, {
        op: "add";
        data: {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            name?: string | undefined;
            tags?: string[] | undefined;
        }[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove">;
        data: z.ZodArray<z.ZodObject<{
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
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            tags?: string[] | undefined;
        }, {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            tags?: string[] | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "remove";
        data: {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            tags?: string[] | undefined;
        }[];
    }, {
        op: "remove";
        data: {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            tags?: string[] | undefined;
        }[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"removeall">;
        addresses: z.ZodArray<z.ZodUnion<[z.ZodObject<{
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
        }>]>, "many">;
    }, "strip", z.ZodTypeAny, {
        op: "removeall";
        addresses: ({
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        })[];
    }, {
        op: "removeall";
        addresses: ({
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        })[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"transfer">;
        to: z.ZodUnion<[z.ZodObject<{
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
        op: "transfer";
        to: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
    }, {
        op: "transfer";
        to: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
    }>, z.ZodObject<{
        op: z.ZodLiteral<"replace">;
        mark_object: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        op: "replace";
        mark_object: string;
    }, {
        op: "replace";
        mark_object: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"destroy">;
    }, "strip", z.ZodTypeAny, {
        op: "destroy";
    }, {
        op: "destroy";
    }>]>>;
}, "strip", z.ZodTypeAny, {
    information?: {
        name: string;
        description?: string | undefined;
        avatar?: string | undefined;
        twitter?: string | undefined;
        discord?: string | undefined;
        homepage?: string | undefined;
    } | undefined;
    mark?: {
        op: "add";
        data: {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            name?: string | undefined;
            tags?: string[] | undefined;
        }[];
    } | {
        op: "remove";
        data: {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            tags?: string[] | undefined;
        }[];
    } | {
        op: "removeall";
        addresses: ({
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        })[];
    } | {
        op: "transfer";
        to: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
    } | {
        op: "replace";
        mark_object: string;
    } | {
        op: "destroy";
    } | undefined;
}, {
    information?: {
        name: string;
        description?: string | undefined;
        avatar?: string | undefined;
        twitter?: string | undefined;
        discord?: string | undefined;
        homepage?: string | undefined;
    } | undefined;
    mark?: {
        op: "add";
        data: {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            name?: string | undefined;
            tags?: string[] | undefined;
        }[];
    } | {
        op: "remove";
        data: {
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            tags?: string[] | undefined;
        }[];
    } | {
        op: "removeall";
        addresses: ({
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        })[];
    } | {
        op: "transfer";
        to: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
    } | {
        op: "replace";
        mark_object: string;
    } | {
        op: "destroy";
    } | undefined;
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
export declare const GuardWitness: z.ZodObject<{
    guards: z.ZodArray<z.ZodString, "many">;
    witness: z.ZodArray<z.ZodObject<{
        guard: z.ZodString;
        witness: z.ZodAny;
        cmd: z.ZodArray<z.ZodNumber, "many">;
        cited: z.ZodNumber;
        type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
        identifier: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: WOWOK.ValueType;
        identifier: number;
        guard: string;
        cmd: number[];
        cited: number;
        witness?: any;
    }, {
        type: WOWOK.ValueType;
        identifier: number;
        guard: string;
        cmd: number[];
        cited: number;
        witness?: any;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    guards: string[];
    witness: {
        type: WOWOK.ValueType;
        identifier: number;
        guard: string;
        cmd: number[];
        cited: number;
        witness?: any;
    }[];
}, {
    guards: string[];
    witness: {
        type: WOWOK.ValueType;
        identifier: number;
        guard: string;
        cmd: number[];
        cited: number;
        witness?: any;
    }[];
}>;
export declare const AccountSchema: z.ZodNullable<z.ZodOptional<z.ZodString>>;
export declare const WitnessSchema: z.ZodNullable<z.ZodOptional<z.ZodObject<{
    guards: z.ZodArray<z.ZodString, "many">;
    witness: z.ZodArray<z.ZodObject<{
        guard: z.ZodString;
        witness: z.ZodAny;
        cmd: z.ZodArray<z.ZodNumber, "many">;
        cited: z.ZodNumber;
        type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
        identifier: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: WOWOK.ValueType;
        identifier: number;
        guard: string;
        cmd: number[];
        cited: number;
        witness?: any;
    }, {
        type: WOWOK.ValueType;
        identifier: number;
        guard: string;
        cmd: number[];
        cited: number;
        witness?: any;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    guards: string[];
    witness: {
        type: WOWOK.ValueType;
        identifier: number;
        guard: string;
        cmd: number[];
        cited: number;
        witness?: any;
    }[];
}, {
    guards: string[];
    witness: {
        type: WOWOK.ValueType;
        identifier: number;
        guard: string;
        cmd: number[];
        cited: number;
        witness?: any;
    }[];
}>>>;
export declare const CallDemandSchemaDescription = "Operate the on-chain Demand object using the local account signatures.\nThe Demand object is an on-chain service requirement manager, enabling users to publish, modify, or cancel service demands via local account signatures. Core functions include defining demand types (e.g., logistics, medical consultation), setting parameters (e.g., location, symptom details), specifying execution conditions, tracking status, and assigning rewards to preferred service referrers.\nScenarios :\n- Logistics : A user publishes a logistics demand with pickup/dropoff details, and sets a reward for referrers who recommend qualified delivery companies.\n- Medical Consultation : A patient creates a demand for specialist consultation, including rewards for referrers who suggest verified clinics.\nKey Details :\n- Operated via local account signatures to ensure ownership.\n- Structured fields (type, parameters, deadline, status) enable automated service matching.\n- Supports lifecycle management (update, fulfill) and reward assignment to incentivize quality referrals.";
export declare const CallDemandSchema: z.ZodObject<{
    name: z.ZodLiteral<"demand">;
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
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            }, {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            }>]>>;
        } & {
            type_parameter: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        }, {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
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
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
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
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
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
    account: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    witness: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        guards: z.ZodArray<z.ZodString, "many">;
        witness: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            witness: z.ZodAny;
            cmd: z.ZodArray<z.ZodNumber, "many">;
            cited: z.ZodNumber;
            type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            identifier: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }, {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    }, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    }>>>;
}, "strip", z.ZodTypeAny, {
    name: "demand";
    data: {
        object: string | {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
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
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    } | null | undefined;
    account?: string | null | undefined;
}, {
    name: "demand";
    data: {
        object: string | {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
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
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    } | null | undefined;
    account?: string | null | undefined;
}>;
export declare const CallDemandSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallRepositorySchemaDescription = "Operate the on-chain Repository object using the local account signatures.\nThe Repository serves as an on-chain data warehouse, storing and managing consensus data items retrievable and maintained via a dual identifier system: an address (physical locator) and a policy (semantic name defined by multi-party consensus). It can be referenced by Guards for data validation\u2014e.g., verifying an address's medical data in a named medical Repository to release insurance payouts from a Treasury, or using daily weather data from a named weather Repository to adjust service workflows (e.g., sport recommendations). Permissions can be flexibly configured per policy to enhance data comprehension, adoption, and maintenance.";
export declare const CallRepositorySchema: z.ZodObject<{
    name: z.ZodLiteral<"repository">;
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
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            }, {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        }>]>;
        description: z.ZodOptional<z.ZodString>;
        reference: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodUnion<[z.ZodLiteral<"set">, z.ZodLiteral<"remove">, z.ZodLiteral<"add">]>;
            objects: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "set" | "add" | "remove";
            objects: string[];
        }, {
            op: "set" | "add" | "remove";
            objects: string[];
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
            }, "strip", z.ZodTypeAny, {
                description: string;
                key: string;
                dataType: WOWOK.RepositoryValueType;
                permissionIndex?: number | null | undefined;
            }, {
                description: string;
                key: string;
                dataType: WOWOK.RepositoryValueType;
                permissionIndex?: any;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "set" | "add";
            data: {
                description: string;
                key: string;
                dataType: WOWOK.RepositoryValueType;
                permissionIndex?: number | null | undefined;
            }[];
        }, {
            op: "set" | "add";
            data: {
                description: string;
                key: string;
                dataType: WOWOK.RepositoryValueType;
                permissionIndex?: any;
            }[];
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
                old: string;
                new: string;
            }, {
                old: string;
                new: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "rename";
            data: {
                old: string;
                new: string;
            }[];
        }, {
            op: "rename";
            data: {
                old: string;
                new: string;
            }[];
        }>]>>;
        data: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodLiteral<"add">;
            data: z.ZodUnion<[z.ZodObject<{
                key: z.ZodString;
                data: z.ZodArray<z.ZodObject<{
                    address: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodUnion<[z.ZodObject<{
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
                    }>]>]>;
                    bcsBytes: z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>;
                    value_type: z.ZodOptional<z.ZodNativeEnum<typeof WOWOK.ValueType>>;
                }, "strip", z.ZodTypeAny, {
                    address: number | bigint | {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    bcsBytes: Uint8Array;
                    value_type?: WOWOK.ValueType | undefined;
                }, {
                    address: number | bigint | {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    bcsBytes: Uint8Array;
                    value_type?: WOWOK.ValueType | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                data: {
                    address: number | bigint | {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    bcsBytes: Uint8Array;
                    value_type?: WOWOK.ValueType | undefined;
                }[];
                key: string;
            }, {
                data: {
                    address: number | bigint | {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    bcsBytes: Uint8Array;
                    value_type?: WOWOK.ValueType | undefined;
                }[];
                key: string;
            }>, z.ZodObject<{
                address: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodUnion<[z.ZodObject<{
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
                }>]>]>;
                data: z.ZodArray<z.ZodObject<{
                    key: z.ZodString;
                    bcsBytes: z.ZodType<Uint8Array, z.ZodTypeDef, Uint8Array>;
                }, "strip", z.ZodTypeAny, {
                    key: string;
                    bcsBytes: Uint8Array;
                }, {
                    key: string;
                    bcsBytes: Uint8Array;
                }>, "many">;
                value_type: z.ZodOptional<z.ZodNativeEnum<typeof WOWOK.ValueType>>;
            }, "strip", z.ZodTypeAny, {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                data: {
                    key: string;
                    bcsBytes: Uint8Array;
                }[];
                value_type?: WOWOK.ValueType | undefined;
            }, {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                data: {
                    key: string;
                    bcsBytes: Uint8Array;
                }[];
                value_type?: WOWOK.ValueType | undefined;
            }>]>;
        }, "strip", z.ZodTypeAny, {
            op: "add";
            data: {
                data: {
                    address: number | bigint | {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    bcsBytes: Uint8Array;
                    value_type?: WOWOK.ValueType | undefined;
                }[];
                key: string;
            } | {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                data: {
                    key: string;
                    bcsBytes: Uint8Array;
                }[];
                value_type?: WOWOK.ValueType | undefined;
            };
        }, {
            op: "add";
            data: {
                data: {
                    address: number | bigint | {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    bcsBytes: Uint8Array;
                    value_type?: WOWOK.ValueType | undefined;
                }[];
                key: string;
            } | {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                data: {
                    key: string;
                    bcsBytes: Uint8Array;
                }[];
                value_type?: WOWOK.ValueType | undefined;
            };
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            data: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                address: z.ZodUnion<[z.ZodNumber, z.ZodBigInt, z.ZodUnion<[z.ZodObject<{
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
                }>]>]>;
            }, "strip", z.ZodTypeAny, {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                key: string;
            }, {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                key: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "remove";
            data: {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                key: string;
            }[];
        }, {
            op: "remove";
            data: {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                key: string;
            }[];
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        object: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        description?: string | undefined;
        data?: {
            op: "add";
            data: {
                data: {
                    address: number | bigint | {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    bcsBytes: Uint8Array;
                    value_type?: WOWOK.ValueType | undefined;
                }[];
                key: string;
            } | {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                data: {
                    key: string;
                    bcsBytes: Uint8Array;
                }[];
                value_type?: WOWOK.ValueType | undefined;
            };
        } | {
            op: "remove";
            data: {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                key: string;
            }[];
        } | undefined;
        reference?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        mode?: WOWOK.Repository_Policy_Mode | undefined;
        policy?: {
            op: "set" | "add";
            data: {
                description: string;
                key: string;
                dataType: WOWOK.RepositoryValueType;
                permissionIndex?: number | null | undefined;
            }[];
        } | {
            keys: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | {
            op: "rename";
            data: {
                old: string;
                new: string;
            }[];
        } | undefined;
    }, {
        object: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        description?: string | undefined;
        data?: {
            op: "add";
            data: {
                data: {
                    address: number | bigint | {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    bcsBytes: Uint8Array;
                    value_type?: WOWOK.ValueType | undefined;
                }[];
                key: string;
            } | {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                data: {
                    key: string;
                    bcsBytes: Uint8Array;
                }[];
                value_type?: WOWOK.ValueType | undefined;
            };
        } | {
            op: "remove";
            data: {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                key: string;
            }[];
        } | undefined;
        reference?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        mode?: WOWOK.Repository_Policy_Mode | undefined;
        policy?: {
            op: "set" | "add";
            data: {
                description: string;
                key: string;
                dataType: WOWOK.RepositoryValueType;
                permissionIndex?: any;
            }[];
        } | {
            keys: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | {
            op: "rename";
            data: {
                old: string;
                new: string;
            }[];
        } | undefined;
    }>;
    account: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    witness: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        guards: z.ZodArray<z.ZodString, "many">;
        witness: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            witness: z.ZodAny;
            cmd: z.ZodArray<z.ZodNumber, "many">;
            cited: z.ZodNumber;
            type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            identifier: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }, {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    }, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    }>>>;
}, "strip", z.ZodTypeAny, {
    name: "repository";
    data: {
        object: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        description?: string | undefined;
        data?: {
            op: "add";
            data: {
                data: {
                    address: number | bigint | {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    bcsBytes: Uint8Array;
                    value_type?: WOWOK.ValueType | undefined;
                }[];
                key: string;
            } | {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                data: {
                    key: string;
                    bcsBytes: Uint8Array;
                }[];
                value_type?: WOWOK.ValueType | undefined;
            };
        } | {
            op: "remove";
            data: {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                key: string;
            }[];
        } | undefined;
        reference?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        mode?: WOWOK.Repository_Policy_Mode | undefined;
        policy?: {
            op: "set" | "add";
            data: {
                description: string;
                key: string;
                dataType: WOWOK.RepositoryValueType;
                permissionIndex?: number | null | undefined;
            }[];
        } | {
            keys: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | {
            op: "rename";
            data: {
                old: string;
                new: string;
            }[];
        } | undefined;
    };
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    } | null | undefined;
    account?: string | null | undefined;
}, {
    name: "repository";
    data: {
        object: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        description?: string | undefined;
        data?: {
            op: "add";
            data: {
                data: {
                    address: number | bigint | {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    bcsBytes: Uint8Array;
                    value_type?: WOWOK.ValueType | undefined;
                }[];
                key: string;
            } | {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                data: {
                    key: string;
                    bcsBytes: Uint8Array;
                }[];
                value_type?: WOWOK.ValueType | undefined;
            };
        } | {
            op: "remove";
            data: {
                address: number | bigint | {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                key: string;
            }[];
        } | undefined;
        reference?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        mode?: WOWOK.Repository_Policy_Mode | undefined;
        policy?: {
            op: "set" | "add";
            data: {
                description: string;
                key: string;
                dataType: WOWOK.RepositoryValueType;
                permissionIndex?: any;
            }[];
        } | {
            keys: string[];
            op: "remove";
        } | {
            op: "removeall";
        } | {
            op: "rename";
            data: {
                old: string;
                new: string;
            }[];
        } | undefined;
    };
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    } | null | undefined;
    account?: string | null | undefined;
}>;
export declare const CallRepositorySchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallMachineSchemaDescription = "Operate the on-chain Machine object using the local account signatures. \n    The Machine object is a core workflow management entity in the wowok protocol, designed to enable multi-user collaboration by providing three key capabilities: \n    1. **Process Orchestration**: Define multi-stage service execution flows (e.g., requirement confirmation \u2192 development \u2192 testing \u2192 acceptance) with clear step sequences and triggers, ensuring collaborative tasks proceed in a structured manner. \n    2. **Permission Governance**: Assign granular operation permissions to participating roles (e.g., only service providers can execute development steps; only purchasers can approve acceptance steps), preventing unauthorized modifications to the workflow. \n    3. **Delivery Verification**: Configure automatic validation rules via Guard conditions (e.g., verifying that deliverable hashes match predefined values or that timestamps meet deadlines), ensuring objective assessment of task completion. \n    When integrated with Service objects, Machine enforces binding constraints on service providers and payers: service providers define the collaborative process, permissions, and verification rules in the Machine when publishing services. Once a purchaser places an order, these rules are immutably recorded on-chain, ensuring both parties' commitments are enforced programmatically without arbitrary changes, thereby maintaining trust in service execution.";
export declare const CallMachineSchema: z.ZodObject<{
    name: z.ZodLiteral<"machine">;
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
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            }, {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            }>]>>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        }>]>;
        progress_new: z.ZodOptional<z.ZodObject<{
            task_address: z.ZodOptional<z.ZodString>;
            namedNew: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
                onChain: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            }, {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            task_address?: string | undefined;
        }, {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            task_address?: string | undefined;
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
                operators: z.ZodArray<z.ZodUnion<[z.ZodObject<{
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
                }>]>, "many">;
            }, "strip", z.ZodTypeAny, {
                name: string;
                operators: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            }, {
                name: string;
                operators: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            data: {
                name: string;
                operators: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            }[];
            progress?: string | undefined;
        }, {
            data: {
                name: string;
                operators: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
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
                parent_id: string;
                parent_session_id: number;
                operation: {
                    next_node_name: string;
                    forward: string;
                };
            }, {
                parent_id: string;
                parent_session_id: number;
                operation: {
                    next_node_name: string;
                    forward: string;
                };
            }>>;
        }, "strip", z.ZodTypeAny, {
            parent: {
                parent_id: string;
                parent_session_id: number;
                operation: {
                    next_node_name: string;
                    forward: string;
                };
            } | null;
            progress?: string | undefined;
        }, {
            parent: {
                parent_id: string;
                parent_session_id: number;
                operation: {
                    next_node_name: string;
                    forward: string;
                };
            } | null;
            progress?: string | undefined;
        }>>;
        progress_hold: z.ZodOptional<z.ZodObject<{
            progress: z.ZodOptional<z.ZodString>;
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
            operation: {
                next_node_name: string;
                forward: string;
            };
            bHold: boolean;
            progress?: string | undefined;
            adminUnhold?: boolean | undefined;
        }, {
            operation: {
                next_node_name: string;
                forward: string;
            };
            bHold: boolean;
            progress?: string | undefined;
            adminUnhold?: boolean | undefined;
        }>>;
        progress_task: z.ZodOptional<z.ZodObject<{
            progress: z.ZodString;
            task_address: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            task_address: string;
            progress: string;
        }, {
            task_address: string;
            progress: string;
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
        endpoint: z.ZodOptional<z.ZodString>;
        consensus_repository: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodUnion<[z.ZodLiteral<"set">, z.ZodLiteral<"remove">, z.ZodLiteral<"add">]>;
            objects: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "set" | "add" | "remove";
            objects: string[];
        }, {
            op: "set" | "add" | "remove";
            objects: string[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>]>>;
        nodes: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodLiteral<"add">;
            data: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                pairs: z.ZodArray<z.ZodObject<{
                    prior_node: z.ZodString;
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
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        guard?: string | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }, {
                        name: string;
                        permission?: any;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        guard?: string | undefined;
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
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        guard?: string | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                }, {
                    prior_node: string;
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        guard?: string | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                name: string;
                pairs: {
                    prior_node: string;
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        guard?: string | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                }[];
            }, {
                name: string;
                pairs: {
                    prior_node: string;
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        guard?: string | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                }[];
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "add";
            data: {
                name: string;
                pairs: {
                    prior_node: string;
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        guard?: string | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                }[];
            }[];
        }, {
            op: "add";
            data: {
                name: string;
                pairs: {
                    prior_node: string;
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        guard?: string | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                }[];
            }[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            names: z.ZodArray<z.ZodString, "many">;
            bTransferMyself: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            op: "remove";
            names: string[];
            bTransferMyself?: boolean | undefined;
        }, {
            op: "remove";
            names: string[];
            bTransferMyself?: boolean | undefined;
        }>, z.ZodObject<{
            op: z.ZodLiteral<"rename node">;
            data: z.ZodArray<z.ZodObject<{
                old: z.ZodString;
                new: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                old: string;
                new: string;
            }, {
                old: string;
                new: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "rename node";
            data: {
                old: string;
                new: string;
            }[];
        }, {
            op: "rename node";
            data: {
                old: string;
                new: string;
            }[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"add from myself">;
            addresses: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "add from myself";
            addresses: string[];
        }, {
            op: "add from myself";
            addresses: string[];
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
            pairs: {
                prior_node_name: string;
                node_name: string;
            }[];
            op: "remove pair";
        }, {
            pairs: {
                prior_node_name: string;
                node_name: string;
            }[];
            op: "remove pair";
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
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
                    suppliers?: {
                        service: string;
                        bRequired?: boolean | undefined;
                    }[] | undefined;
                }, {
                    name: string;
                    permission?: any;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
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
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
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
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
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
            op: "add forward";
            data: {
                forward: {
                    name: string;
                    permission?: any;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
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
        }, {
            op: "add forward";
            data: {
                forward: {
                    name: string;
                    permission?: any;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
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
            op: "remove forward";
            data: {
                prior_node_name: string;
                node_name: string;
                forward_name: string;
            }[];
        }, {
            op: "remove forward";
            data: {
                prior_node_name: string;
                node_name: string;
                forward_name: string;
            }[];
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
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            }, {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
        }, {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        object: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        description?: string | undefined;
        progress_new?: {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            task_address?: string | undefined;
        } | undefined;
        progress_context_repository?: {
            repository: string | null;
            progress?: string | undefined;
        } | undefined;
        progress_namedOperator?: {
            data: {
                name: string;
                operators: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            }[];
            progress?: string | undefined;
        } | undefined;
        progress_parent?: {
            parent: {
                parent_id: string;
                parent_session_id: number;
                operation: {
                    next_node_name: string;
                    forward: string;
                };
            } | null;
            progress?: string | undefined;
        } | undefined;
        progress_hold?: {
            operation: {
                next_node_name: string;
                forward: string;
            };
            bHold: boolean;
            progress?: string | undefined;
            adminUnhold?: boolean | undefined;
        } | undefined;
        progress_task?: {
            task_address: string;
            progress: string;
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
        endpoint?: string | undefined;
        consensus_repository?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        nodes?: {
            op: "add";
            data: {
                name: string;
                pairs: {
                    prior_node: string;
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        guard?: string | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                }[];
            }[];
        } | {
            op: "remove";
            names: string[];
            bTransferMyself?: boolean | undefined;
        } | {
            op: "rename node";
            data: {
                old: string;
                new: string;
            }[];
        } | {
            op: "add from myself";
            addresses: string[];
        } | {
            pairs: {
                prior_node_name: string;
                node_name: string;
            }[];
            op: "remove pair";
        } | {
            op: "add forward";
            data: {
                forward: {
                    name: string;
                    permission?: any;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
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
        } | {
            op: "remove forward";
            data: {
                prior_node_name: string;
                node_name: string;
                forward_name: string;
            }[];
        } | undefined;
        bPublished?: boolean | undefined;
        bPaused?: boolean | undefined;
        clone_new?: {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
        } | undefined;
    }, {
        object: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        description?: string | undefined;
        progress_new?: {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            task_address?: string | undefined;
        } | undefined;
        progress_context_repository?: {
            repository: string | null;
            progress?: string | undefined;
        } | undefined;
        progress_namedOperator?: {
            data: {
                name: string;
                operators: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            }[];
            progress?: string | undefined;
        } | undefined;
        progress_parent?: {
            parent: {
                parent_id: string;
                parent_session_id: number;
                operation: {
                    next_node_name: string;
                    forward: string;
                };
            } | null;
            progress?: string | undefined;
        } | undefined;
        progress_hold?: {
            operation: {
                next_node_name: string;
                forward: string;
            };
            bHold: boolean;
            progress?: string | undefined;
            adminUnhold?: boolean | undefined;
        } | undefined;
        progress_task?: {
            task_address: string;
            progress: string;
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
        endpoint?: string | undefined;
        consensus_repository?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        nodes?: {
            op: "add";
            data: {
                name: string;
                pairs: {
                    prior_node: string;
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        guard?: string | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                }[];
            }[];
        } | {
            op: "remove";
            names: string[];
            bTransferMyself?: boolean | undefined;
        } | {
            op: "rename node";
            data: {
                old: string;
                new: string;
            }[];
        } | {
            op: "add from myself";
            addresses: string[];
        } | {
            pairs: {
                prior_node_name: string;
                node_name: string;
            }[];
            op: "remove pair";
        } | {
            op: "add forward";
            data: {
                forward: {
                    name: string;
                    permission?: any;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
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
        } | {
            op: "remove forward";
            data: {
                prior_node_name: string;
                node_name: string;
                forward_name: string;
            }[];
        } | undefined;
        bPublished?: boolean | undefined;
        bPaused?: boolean | undefined;
        clone_new?: {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
        } | undefined;
    }>;
    account: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    witness: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        guards: z.ZodArray<z.ZodString, "many">;
        witness: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            witness: z.ZodAny;
            cmd: z.ZodArray<z.ZodNumber, "many">;
            cited: z.ZodNumber;
            type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            identifier: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }, {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    }, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    }>>>;
}, "strip", z.ZodTypeAny, {
    name: "machine";
    data: {
        object: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        description?: string | undefined;
        progress_new?: {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            task_address?: string | undefined;
        } | undefined;
        progress_context_repository?: {
            repository: string | null;
            progress?: string | undefined;
        } | undefined;
        progress_namedOperator?: {
            data: {
                name: string;
                operators: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            }[];
            progress?: string | undefined;
        } | undefined;
        progress_parent?: {
            parent: {
                parent_id: string;
                parent_session_id: number;
                operation: {
                    next_node_name: string;
                    forward: string;
                };
            } | null;
            progress?: string | undefined;
        } | undefined;
        progress_hold?: {
            operation: {
                next_node_name: string;
                forward: string;
            };
            bHold: boolean;
            progress?: string | undefined;
            adminUnhold?: boolean | undefined;
        } | undefined;
        progress_task?: {
            task_address: string;
            progress: string;
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
        endpoint?: string | undefined;
        consensus_repository?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        nodes?: {
            op: "add";
            data: {
                name: string;
                pairs: {
                    prior_node: string;
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        guard?: string | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                }[];
            }[];
        } | {
            op: "remove";
            names: string[];
            bTransferMyself?: boolean | undefined;
        } | {
            op: "rename node";
            data: {
                old: string;
                new: string;
            }[];
        } | {
            op: "add from myself";
            addresses: string[];
        } | {
            pairs: {
                prior_node_name: string;
                node_name: string;
            }[];
            op: "remove pair";
        } | {
            op: "add forward";
            data: {
                forward: {
                    name: string;
                    permission?: any;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
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
        } | {
            op: "remove forward";
            data: {
                prior_node_name: string;
                node_name: string;
                forward_name: string;
            }[];
        } | undefined;
        bPublished?: boolean | undefined;
        bPaused?: boolean | undefined;
        clone_new?: {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
        } | undefined;
    };
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    } | null | undefined;
    account?: string | null | undefined;
}, {
    name: "machine";
    data: {
        object: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        description?: string | undefined;
        progress_new?: {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            task_address?: string | undefined;
        } | undefined;
        progress_context_repository?: {
            repository: string | null;
            progress?: string | undefined;
        } | undefined;
        progress_namedOperator?: {
            data: {
                name: string;
                operators: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            }[];
            progress?: string | undefined;
        } | undefined;
        progress_parent?: {
            parent: {
                parent_id: string;
                parent_session_id: number;
                operation: {
                    next_node_name: string;
                    forward: string;
                };
            } | null;
            progress?: string | undefined;
        } | undefined;
        progress_hold?: {
            operation: {
                next_node_name: string;
                forward: string;
            };
            bHold: boolean;
            progress?: string | undefined;
            adminUnhold?: boolean | undefined;
        } | undefined;
        progress_task?: {
            task_address: string;
            progress: string;
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
        endpoint?: string | undefined;
        consensus_repository?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        nodes?: {
            op: "add";
            data: {
                name: string;
                pairs: {
                    prior_node: string;
                    threshold: number;
                    forwards: {
                        name: string;
                        permission?: any;
                        namedOperator?: string | undefined;
                        weight?: number | undefined;
                        guard?: string | undefined;
                        suppliers?: {
                            service: string;
                            bRequired?: boolean | undefined;
                        }[] | undefined;
                    }[];
                }[];
            }[];
        } | {
            op: "remove";
            names: string[];
            bTransferMyself?: boolean | undefined;
        } | {
            op: "rename node";
            data: {
                old: string;
                new: string;
            }[];
        } | {
            op: "add from myself";
            addresses: string[];
        } | {
            pairs: {
                prior_node_name: string;
                node_name: string;
            }[];
            op: "remove pair";
        } | {
            op: "add forward";
            data: {
                forward: {
                    name: string;
                    permission?: any;
                    namedOperator?: string | undefined;
                    weight?: number | undefined;
                    guard?: string | undefined;
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
        } | {
            op: "remove forward";
            data: {
                prior_node_name: string;
                node_name: string;
                forward_name: string;
            }[];
        } | undefined;
        bPublished?: boolean | undefined;
        bPaused?: boolean | undefined;
        clone_new?: {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
        } | undefined;
    };
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    } | null | undefined;
    account?: string | null | undefined;
}>;
export declare const CallMachineSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallServiceSchemaDescription = "Operate the on-chain Service object using the local account signatures.\n    Service Object enables service providers to:\n        Provide products/services (including descriptions, interfaces, pricing, inventory, etc.),\n        Define service processes,\n        Specify arbitration commitments,\n        Establish payment collection and refund commitments,\n        Configure order incentives/rewards,\n        Set purchaser requirements, etc..\n        And the Process and delivery commitments cannot be arbitrarily modified post-purchase. \n        Through the Service Object, a purchaser's procurement and payment for services triggers the creation of a new Order instance, where the Order entity is contractually vested with the corresponding service entitlements.";
export declare const CallServiceSchema: z.ZodObject<{
    name: z.ZodLiteral<"service">;
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
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            }, {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            }>]>>;
        } & {
            type_parameter: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        }, {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
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
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            }, {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            }>>;
            namedNewProgress: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
                onChain: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            }, {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
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
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            namedNewProgress?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
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
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            namedNewProgress?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
        }>>;
        order_agent: z.ZodOptional<z.ZodObject<{
            order: z.ZodOptional<z.ZodString>;
            agents: z.ZodArray<z.ZodUnion<[z.ZodObject<{
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
            }>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            agents: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
            order?: string | undefined;
        }, {
            agents: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
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
            order: string;
            arb: string;
        }, {
            order: string;
            arb: string;
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
                index: string | number | bigint;
                remark: string;
                withdraw_guard: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            }, {
                remark: string;
                withdraw_guard: string;
                index?: string | number | bigint | undefined;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            data: {
                index: string | number | bigint;
                remark: string;
                withdraw_guard: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
            order: string;
        }, {
            data: {
                remark: string;
                withdraw_guard: string;
                index?: string | number | bigint | undefined;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
            order: string;
        }>>;
        order_payer: z.ZodOptional<z.ZodObject<{
            order: z.ZodOptional<z.ZodString>;
            payer_new: z.ZodUnion<[z.ZodObject<{
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
            payer_new: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            order?: string | undefined;
        }, {
            payer_new: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            order?: string | undefined;
        }>>;
        description: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
        payee_treasury: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        } & {
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        }>]>>;
        gen_discount: z.ZodOptional<z.ZodArray<z.ZodObject<{
            receiver: z.ZodUnion<[z.ZodObject<{
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
            count: z.ZodDefault<z.ZodNumber>;
            discount: z.ZodObject<{
                name: z.ZodDefault<z.ZodString>;
                type: z.ZodUnion<[z.ZodLiteral<WOWOK.Service_Discount_Type.ratio>, z.ZodLiteral<WOWOK.Service_Discount_Type.minus>]>;
                off: z.ZodNumber;
                duration_minutes: z.ZodDefault<z.ZodNumber>;
                time_start: z.ZodOptional<z.ZodNumber>;
                price_greater: z.ZodOptional<z.ZodUnion<[z.ZodNumber, z.ZodString]>>;
            }, "strip", z.ZodTypeAny, {
                type: WOWOK.Service_Discount_Type;
                name: string;
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
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            count: number;
            discount: {
                type: WOWOK.Service_Discount_Type;
                name: string;
                off: number;
                duration_minutes: number;
                time_start?: number | undefined;
                price_greater?: string | number | undefined;
            };
        }, {
            receiver: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
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
            op: "set" | "add" | "remove";
            objects: string[];
        }, {
            op: "set" | "add" | "remove";
            objects: string[];
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
            op: "set" | "add" | "remove";
            objects: string[];
        }, {
            op: "set" | "add" | "remove";
            objects: string[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>]>>;
        machine: z.ZodOptional<z.ZodString>;
        arbitration: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodUnion<[z.ZodLiteral<"set">, z.ZodLiteral<"remove">, z.ZodLiteral<"add">]>;
            objects: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "set" | "add" | "remove";
            objects: string[];
        }, {
            op: "set" | "add" | "remove";
            objects: string[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>]>>;
        customer_required_info: z.ZodOptional<z.ZodObject<{
            pubkey: z.ZodString;
            required_info: z.ZodArray<z.ZodUnion<[z.ZodLiteral<WOWOK.BuyRequiredEnum.address>, z.ZodLiteral<WOWOK.BuyRequiredEnum.phone>, z.ZodLiteral<WOWOK.BuyRequiredEnum.postcode>, z.ZodLiteral<WOWOK.BuyRequiredEnum.name>, z.ZodString]>, "many">;
        }, "strip", z.ZodTypeAny, {
            pubkey: string;
            required_info: string[];
        }, {
            pubkey: string;
            required_info: string[];
        }>>;
        sales: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodLiteral<"add">;
            sales: z.ZodArray<z.ZodObject<{
                item: z.ZodString;
                price: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
                stock: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
                endpoint: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                item: string;
                price: string | number;
                stock: string | number;
                endpoint?: string | undefined;
            }, {
                item: string;
                price: string | number;
                stock: string | number;
                endpoint?: string | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "add";
            sales: {
                item: string;
                price: string | number;
                stock: string | number;
                endpoint?: string | undefined;
            }[];
        }, {
            op: "add";
            sales: {
                item: string;
                price: string | number;
                stock: string | number;
                endpoint?: string | undefined;
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
            op: "set" | "add";
            guards: {
                guard: string;
                percent: number;
            }[];
        }, {
            op: "set" | "add";
            guards: {
                guard: string;
                percent: number;
            }[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            guards: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "remove";
            guards: string[];
        }, {
            op: "remove";
            guards: string[];
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
            op: "set" | "add";
            guards: {
                guard: string;
                percent: number;
            }[];
        }, {
            op: "set" | "add";
            guards: {
                guard: string;
                percent: number;
            }[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            guards: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "remove";
            guards: string[];
        }, {
            op: "remove";
            guards: string[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>]>>;
        bPublished: z.ZodOptional<z.ZodBoolean>;
        buy_guard: z.ZodOptional<z.ZodString>;
        bPaused: z.ZodOptional<z.ZodBoolean>;
        clone_new: z.ZodOptional<z.ZodObject<{
            token_type_new: z.ZodOptional<z.ZodString>;
            namedNew: z.ZodOptional<z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
                onChain: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            }, {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            token_type_new?: string | undefined;
        }, {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            token_type_new?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        object: string | {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        description?: string | undefined;
        repository?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        endpoint?: string | undefined;
        bPublished?: boolean | undefined;
        bPaused?: boolean | undefined;
        clone_new?: {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            token_type_new?: string | undefined;
        } | undefined;
        withdraw_guard?: {
            op: "set" | "add";
            guards: {
                guard: string;
                percent: number;
            }[];
        } | {
            op: "remove";
            guards: string[];
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
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            namedNewProgress?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
        } | undefined;
        order_agent?: {
            agents: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
            order?: string | undefined;
        } | undefined;
        order_required_info?: {
            order: string;
            customer_info_required?: string | undefined;
        } | undefined;
        refund_guard?: {
            op: "set" | "add";
            guards: {
                guard: string;
                percent: number;
            }[];
        } | {
            op: "remove";
            guards: string[];
        } | {
            op: "removeall";
        } | undefined;
        order_refund?: {
            order: string;
            arb: string;
        } | {
            order: string;
            refund_guard: string;
        } | undefined;
        order_withdrawl?: {
            data: {
                index: string | number | bigint;
                remark: string;
                withdraw_guard: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
            order: string;
        } | undefined;
        order_payer?: {
            payer_new: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            order?: string | undefined;
        } | undefined;
        payee_treasury?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
        gen_discount?: {
            receiver: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            count: number;
            discount: {
                type: WOWOK.Service_Discount_Type;
                name: string;
                off: number;
                duration_minutes: number;
                time_start?: number | undefined;
                price_greater?: string | number | undefined;
            };
        }[] | undefined;
        extern_withdraw_treasury?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        machine?: string | undefined;
        arbitration?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        customer_required_info?: {
            pubkey: string;
            required_info: string[];
        } | undefined;
        sales?: {
            op: "add";
            sales: {
                item: string;
                price: string | number;
                stock: string | number;
                endpoint?: string | undefined;
            }[];
        } | {
            op: "remove";
            sales_name: string[];
        } | undefined;
        buy_guard?: string | undefined;
    }, {
        object: string | {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        description?: string | undefined;
        repository?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        endpoint?: string | undefined;
        bPublished?: boolean | undefined;
        bPaused?: boolean | undefined;
        clone_new?: {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            token_type_new?: string | undefined;
        } | undefined;
        withdraw_guard?: {
            op: "set" | "add";
            guards: {
                guard: string;
                percent: number;
            }[];
        } | {
            op: "remove";
            guards: string[];
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
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            namedNewProgress?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
        } | undefined;
        order_agent?: {
            agents: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
            order?: string | undefined;
        } | undefined;
        order_required_info?: {
            order: string;
            customer_info_required?: string | undefined;
        } | undefined;
        refund_guard?: {
            op: "set" | "add";
            guards: {
                guard: string;
                percent: number;
            }[];
        } | {
            op: "remove";
            guards: string[];
        } | {
            op: "removeall";
        } | undefined;
        order_refund?: {
            order: string;
            arb: string;
        } | {
            order: string;
            refund_guard: string;
        } | undefined;
        order_withdrawl?: {
            data: {
                remark: string;
                withdraw_guard: string;
                index?: string | number | bigint | undefined;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
            order: string;
        } | undefined;
        order_payer?: {
            payer_new: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            order?: string | undefined;
        } | undefined;
        payee_treasury?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
        gen_discount?: {
            receiver: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
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
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        machine?: string | undefined;
        arbitration?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        customer_required_info?: {
            pubkey: string;
            required_info: string[];
        } | undefined;
        sales?: {
            op: "add";
            sales: {
                item: string;
                price: string | number;
                stock: string | number;
                endpoint?: string | undefined;
            }[];
        } | {
            op: "remove";
            sales_name: string[];
        } | undefined;
        buy_guard?: string | undefined;
    }>;
    account: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    witness: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        guards: z.ZodArray<z.ZodString, "many">;
        witness: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            witness: z.ZodAny;
            cmd: z.ZodArray<z.ZodNumber, "many">;
            cited: z.ZodNumber;
            type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            identifier: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }, {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    }, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    }>>>;
}, "strip", z.ZodTypeAny, {
    name: "service";
    data: {
        object: string | {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        description?: string | undefined;
        repository?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        endpoint?: string | undefined;
        bPublished?: boolean | undefined;
        bPaused?: boolean | undefined;
        clone_new?: {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            token_type_new?: string | undefined;
        } | undefined;
        withdraw_guard?: {
            op: "set" | "add";
            guards: {
                guard: string;
                percent: number;
            }[];
        } | {
            op: "remove";
            guards: string[];
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
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            namedNewProgress?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
        } | undefined;
        order_agent?: {
            agents: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
            order?: string | undefined;
        } | undefined;
        order_required_info?: {
            order: string;
            customer_info_required?: string | undefined;
        } | undefined;
        refund_guard?: {
            op: "set" | "add";
            guards: {
                guard: string;
                percent: number;
            }[];
        } | {
            op: "remove";
            guards: string[];
        } | {
            op: "removeall";
        } | undefined;
        order_refund?: {
            order: string;
            arb: string;
        } | {
            order: string;
            refund_guard: string;
        } | undefined;
        order_withdrawl?: {
            data: {
                index: string | number | bigint;
                remark: string;
                withdraw_guard: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
            order: string;
        } | undefined;
        order_payer?: {
            payer_new: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            order?: string | undefined;
        } | undefined;
        payee_treasury?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
        gen_discount?: {
            receiver: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            count: number;
            discount: {
                type: WOWOK.Service_Discount_Type;
                name: string;
                off: number;
                duration_minutes: number;
                time_start?: number | undefined;
                price_greater?: string | number | undefined;
            };
        }[] | undefined;
        extern_withdraw_treasury?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        machine?: string | undefined;
        arbitration?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        customer_required_info?: {
            pubkey: string;
            required_info: string[];
        } | undefined;
        sales?: {
            op: "add";
            sales: {
                item: string;
                price: string | number;
                stock: string | number;
                endpoint?: string | undefined;
            }[];
        } | {
            op: "remove";
            sales_name: string[];
        } | undefined;
        buy_guard?: string | undefined;
    };
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    } | null | undefined;
    account?: string | null | undefined;
}, {
    name: "service";
    data: {
        object: string | {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        description?: string | undefined;
        repository?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        endpoint?: string | undefined;
        bPublished?: boolean | undefined;
        bPaused?: boolean | undefined;
        clone_new?: {
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            token_type_new?: string | undefined;
        } | undefined;
        withdraw_guard?: {
            op: "set" | "add";
            guards: {
                guard: string;
                percent: number;
            }[];
        } | {
            op: "remove";
            guards: string[];
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
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
            namedNewProgress?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
        } | undefined;
        order_agent?: {
            agents: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
            order?: string | undefined;
        } | undefined;
        order_required_info?: {
            order: string;
            customer_info_required?: string | undefined;
        } | undefined;
        refund_guard?: {
            op: "set" | "add";
            guards: {
                guard: string;
                percent: number;
            }[];
        } | {
            op: "remove";
            guards: string[];
        } | {
            op: "removeall";
        } | undefined;
        order_refund?: {
            order: string;
            arb: string;
        } | {
            order: string;
            refund_guard: string;
        } | undefined;
        order_withdrawl?: {
            data: {
                remark: string;
                withdraw_guard: string;
                index?: string | number | bigint | undefined;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
            order: string;
        } | undefined;
        order_payer?: {
            payer_new: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            order?: string | undefined;
        } | undefined;
        payee_treasury?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
        gen_discount?: {
            receiver: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
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
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        machine?: string | undefined;
        arbitration?: {
            op: "set" | "add" | "remove";
            objects: string[];
        } | {
            op: "removeall";
        } | undefined;
        customer_required_info?: {
            pubkey: string;
            required_info: string[];
        } | undefined;
        sales?: {
            op: "add";
            sales: {
                item: string;
                price: string | number;
                stock: string | number;
                endpoint?: string | undefined;
            }[];
        } | {
            op: "remove";
            sales_name: string[];
        } | undefined;
        buy_guard?: string | undefined;
    };
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    } | null | undefined;
    account?: string | null | undefined;
}>;
export declare const CallServiceSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallTreasurySchemaDescription = "Operate the on-chain Treasury object using the local account signatures. The Treasury object serves as a centralized fund management hub for wowok protocol, supporting multi-scenario financial operations including service incentives distribution, dispute compensation execution, and operational reward disbursement.\n- **Service Reward Mode**: Automatically disburses predefined incentives to service providers via smart contract triggers upon successful completion of service orders (e.g., e-commerce transaction fulfillment, travel service delivery).\n- **Dispute Compensation Mode**: Executes compensation payments to order payers based on valid Arbitration results, ensuring timely fund transfer as ruled by the arbitration panel within 24 hours of result confirmation.\n- **Operational Reward Mode**: Provides Guard-based fund withdrawal mechanisms for different operational personnel, with predefined withdrawal limits. For example, after completing a computational task, if the submitted result data meets the on-chain verification requirements (via Guard conditions), the operator can withdraw a designated reward amount up to the set limit.\n\nAll operations (deposit, withdrawal, transfer) are governed by the associated Permission object, ensuring authorized access and compliant fund flows. All transaction records are permanently stored on-chain for full transparency.";
export declare const CallTreasurySchema: z.ZodObject<{
    name: z.ZodLiteral<"treasury">;
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
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            }, {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            }>]>>;
        } & {
            type_parameter: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        }, {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        }>]>;
        deposit: z.ZodOptional<z.ZodObject<{
            balance: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            param: z.ZodOptional<z.ZodObject<{
                index: z.ZodUnion<[z.ZodDefault<z.ZodNumber>, z.ZodBigInt, z.ZodString]>;
                remark: z.ZodString;
                for_object: z.ZodOptional<z.ZodString>;
                for_guard: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                index: string | number | bigint;
                remark: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            }, {
                remark: string;
                index?: string | number | bigint | undefined;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            balance: string | number;
            param?: {
                index: string | number | bigint;
                remark: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            } | undefined;
        }, {
            balance: string | number;
            param?: {
                remark: string;
                index?: string | number | bigint | undefined;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            } | undefined;
        }>>;
        receive: z.ZodUnion<[z.ZodObject<{
            received_objects: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            received_objects: string[];
        }, {
            received_objects: string[];
        }>, z.ZodLiteral<"recently">]>;
        withdraw: z.ZodObject<{
            index: z.ZodUnion<[z.ZodDefault<z.ZodNumber>, z.ZodBigInt, z.ZodString]>;
            remark: z.ZodString;
            for_object: z.ZodOptional<z.ZodString>;
            for_guard: z.ZodOptional<z.ZodString>;
        } & {
            receiver: z.ZodArray<z.ZodObject<{
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
                amount: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                amount: string | number;
            }, {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                amount: string | number;
            }>, "many">;
            withdraw_guard: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            index: string | number | bigint;
            remark: string;
            receiver: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
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
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                amount: string | number;
            }[];
            index?: string | number | bigint | undefined;
            for_object?: string | undefined;
            for_guard?: string | undefined;
            withdraw_guard?: string | undefined;
        }>;
        description: z.ZodOptional<z.ZodString>;
        deposit_guard: z.ZodOptional<z.ZodString>;
        withdraw_guard: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodUnion<[z.ZodLiteral<"add">, z.ZodLiteral<"set">]>;
            data: z.ZodArray<z.ZodObject<{
                guard: z.ZodString;
                amount: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
            }, "strip", z.ZodTypeAny, {
                guard: string;
                amount: string | number;
            }, {
                guard: string;
                amount: string | number;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "set" | "add";
            data: {
                guard: string;
                amount: string | number;
            }[];
        }, {
            op: "set" | "add";
            data: {
                guard: string;
                amount: string | number;
            }[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            guards: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "remove";
            guards: string[];
        }, {
            op: "remove";
            guards: string[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>]>>;
        withdraw_mode: z.ZodUnion<[z.ZodLiteral<WOWOK.Treasury_WithdrawMode.PERMISSION>, z.ZodLiteral<WOWOK.Treasury_WithdrawMode.GUARD_ONLY_AND_IMMUTABLE>, z.ZodLiteral<WOWOK.Treasury_WithdrawMode.BOTH_PERMISSION_AND_GUARD>]>;
    }, "strip", z.ZodTypeAny, {
        object: string | {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        receive: {
            received_objects: string[];
        } | "recently";
        withdraw: {
            index: string | number | bigint;
            remark: string;
            receiver: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                amount: string | number;
            }[];
            for_object?: string | undefined;
            for_guard?: string | undefined;
            withdraw_guard?: string | undefined;
        };
        withdraw_mode: WOWOK.Treasury_WithdrawMode;
        description?: string | undefined;
        withdraw_guard?: {
            op: "set" | "add";
            data: {
                guard: string;
                amount: string | number;
            }[];
        } | {
            op: "remove";
            guards: string[];
        } | {
            op: "removeall";
        } | undefined;
        deposit?: {
            balance: string | number;
            param?: {
                index: string | number | bigint;
                remark: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            } | undefined;
        } | undefined;
        deposit_guard?: string | undefined;
    }, {
        object: string | {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        receive: {
            received_objects: string[];
        } | "recently";
        withdraw: {
            remark: string;
            receiver: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                amount: string | number;
            }[];
            index?: string | number | bigint | undefined;
            for_object?: string | undefined;
            for_guard?: string | undefined;
            withdraw_guard?: string | undefined;
        };
        withdraw_mode: WOWOK.Treasury_WithdrawMode;
        description?: string | undefined;
        withdraw_guard?: {
            op: "set" | "add";
            data: {
                guard: string;
                amount: string | number;
            }[];
        } | {
            op: "remove";
            guards: string[];
        } | {
            op: "removeall";
        } | undefined;
        deposit?: {
            balance: string | number;
            param?: {
                remark: string;
                index?: string | number | bigint | undefined;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            } | undefined;
        } | undefined;
        deposit_guard?: string | undefined;
    }>;
    account: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    witness: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        guards: z.ZodArray<z.ZodString, "many">;
        witness: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            witness: z.ZodAny;
            cmd: z.ZodArray<z.ZodNumber, "many">;
            cited: z.ZodNumber;
            type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            identifier: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }, {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    }, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    }>>>;
}, "strip", z.ZodTypeAny, {
    name: "treasury";
    data: {
        object: string | {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        receive: {
            received_objects: string[];
        } | "recently";
        withdraw: {
            index: string | number | bigint;
            remark: string;
            receiver: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                amount: string | number;
            }[];
            for_object?: string | undefined;
            for_guard?: string | undefined;
            withdraw_guard?: string | undefined;
        };
        withdraw_mode: WOWOK.Treasury_WithdrawMode;
        description?: string | undefined;
        withdraw_guard?: {
            op: "set" | "add";
            data: {
                guard: string;
                amount: string | number;
            }[];
        } | {
            op: "remove";
            guards: string[];
        } | {
            op: "removeall";
        } | undefined;
        deposit?: {
            balance: string | number;
            param?: {
                index: string | number | bigint;
                remark: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            } | undefined;
        } | undefined;
        deposit_guard?: string | undefined;
    };
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    } | null | undefined;
    account?: string | null | undefined;
}, {
    name: "treasury";
    data: {
        object: string | {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        receive: {
            received_objects: string[];
        } | "recently";
        withdraw: {
            remark: string;
            receiver: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                amount: string | number;
            }[];
            index?: string | number | bigint | undefined;
            for_object?: string | undefined;
            for_guard?: string | undefined;
            withdraw_guard?: string | undefined;
        };
        withdraw_mode: WOWOK.Treasury_WithdrawMode;
        description?: string | undefined;
        withdraw_guard?: {
            op: "set" | "add";
            data: {
                guard: string;
                amount: string | number;
            }[];
        } | {
            op: "remove";
            guards: string[];
        } | {
            op: "removeall";
        } | undefined;
        deposit?: {
            balance: string | number;
            param?: {
                remark: string;
                index?: string | number | bigint | undefined;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            } | undefined;
        } | undefined;
        deposit_guard?: string | undefined;
    };
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    } | null | undefined;
    account?: string | null | undefined;
}>;
export declare const CallTreasurySchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallPermissionSchemaDescription = "Operate the on-chain Permission object using the local account signatures. The Permission object is designed to manage access control for core wowok protocol entities (e.g., Machine, Service, Repository, Treasury). It defines granular operation permissions (e.g., read, write, management) for specific entities or addresses, ensuring only authorized subjects can perform designated actions on the associated on-chain objects (such as data modification, fund transfer, or configuration updates). This mechanism safeguards the security and compliance of protocol resource operations.";
export declare const CallPermissionSchema: z.ZodObject<{
    name: z.ZodLiteral<"permission">;
    data: z.ZodObject<{
        object: z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
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
            op: "add";
            data: {
                name: string;
                index: number;
            }[];
        }, {
            op: "add";
            data: {
                name: string;
                index?: any;
            }[];
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
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                permissions: {
                    index: number;
                    guard?: string | undefined;
                }[];
            }, {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
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
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
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
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
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
                    guard: z.ZodOptional<z.ZodString>;
                }, "strip", z.ZodTypeAny, {
                    address: {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    guard?: string | undefined;
                }, {
                    address: {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    guard?: string | undefined;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                index: number;
                entities: {
                    address: {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    guard?: string | undefined;
                }[];
            }, {
                entities: {
                    address: {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
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
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    guard?: string | undefined;
                }[];
            }[];
        }, {
            op: "add permission";
            permissions: {
                entities: {
                    address: {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    guard?: string | undefined;
                }[];
                index?: any;
            }[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove entity">;
            addresses: z.ZodArray<z.ZodUnion<[z.ZodObject<{
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
            }>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "remove entity";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        }, {
            op: "remove entity";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove permission">;
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
            index: z.ZodArray<z.ZodEffects<z.ZodTypeAny, number, any>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "remove permission";
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            index: number[];
        }, {
            op: "remove permission";
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            index: any[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"transfer permission">;
            from: z.ZodUnion<[z.ZodObject<{
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
            to: z.ZodUnion<[z.ZodObject<{
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
            op: "transfer permission";
            from: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            to: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
        }, {
            op: "transfer permission";
            from: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            to: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
        }>]>>;
        admin: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodUnion<[z.ZodLiteral<"add">, z.ZodLiteral<"remove">, z.ZodLiteral<"set">]>;
            addresses: z.ZodArray<z.ZodUnion<[z.ZodObject<{
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
            }>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "set" | "add" | "remove";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        }, {
            op: "set" | "add" | "remove";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
        }, {
            op: "removeall";
        }>]>>;
        builder: z.ZodUnion<[z.ZodObject<{
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
        object: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        };
        builder: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        description?: string | undefined;
        permission?: {
            op: "add entity";
            entities: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
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
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    guard?: string | undefined;
                }[];
            }[];
        } | {
            op: "remove entity";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        } | {
            op: "remove permission";
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            index: number[];
        } | {
            op: "transfer permission";
            from: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            to: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
        } | undefined;
        biz_permission?: {
            op: "add";
            data: {
                name: string;
                index: number;
            }[];
        } | {
            op: "remove";
            permissions: number[];
        } | undefined;
        admin?: {
            op: "set" | "add" | "remove";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        } | {
            op: "removeall";
        } | undefined;
    }, {
        object: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        };
        builder: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        description?: string | undefined;
        permission?: {
            op: "add entity";
            entities: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
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
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    guard?: string | undefined;
                }[];
                index?: any;
            }[];
        } | {
            op: "remove entity";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        } | {
            op: "remove permission";
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            index: any[];
        } | {
            op: "transfer permission";
            from: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            to: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
        } | undefined;
        biz_permission?: {
            op: "add";
            data: {
                name: string;
                index?: any;
            }[];
        } | {
            op: "remove";
            permissions: any[];
        } | undefined;
        admin?: {
            op: "set" | "add" | "remove";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        } | {
            op: "removeall";
        } | undefined;
    }>;
    account: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    witness: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        guards: z.ZodArray<z.ZodString, "many">;
        witness: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            witness: z.ZodAny;
            cmd: z.ZodArray<z.ZodNumber, "many">;
            cited: z.ZodNumber;
            type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            identifier: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }, {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    }, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    }>>>;
}, "strip", z.ZodTypeAny, {
    name: "permission";
    data: {
        object: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        };
        builder: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        description?: string | undefined;
        permission?: {
            op: "add entity";
            entities: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
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
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    guard?: string | undefined;
                }[];
            }[];
        } | {
            op: "remove entity";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        } | {
            op: "remove permission";
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            index: number[];
        } | {
            op: "transfer permission";
            from: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            to: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
        } | undefined;
        biz_permission?: {
            op: "add";
            data: {
                name: string;
                index: number;
            }[];
        } | {
            op: "remove";
            permissions: number[];
        } | undefined;
        admin?: {
            op: "set" | "add" | "remove";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        } | {
            op: "removeall";
        } | undefined;
    };
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    } | null | undefined;
    account?: string | null | undefined;
}, {
    name: "permission";
    data: {
        object: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        };
        builder: {
            account_or_address?: string | undefined;
        } | {
            mark_or_address: string;
        };
        description?: string | undefined;
        permission?: {
            op: "add entity";
            entities: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
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
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    guard?: string | undefined;
                }[];
                index?: any;
            }[];
        } | {
            op: "remove entity";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        } | {
            op: "remove permission";
            address: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            index: any[];
        } | {
            op: "transfer permission";
            from: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            to: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
        } | undefined;
        biz_permission?: {
            op: "add";
            data: {
                name: string;
                index?: any;
            }[];
        } | {
            op: "remove";
            permissions: any[];
        } | undefined;
        admin?: {
            op: "set" | "add" | "remove";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        } | {
            op: "removeall";
        } | undefined;
    };
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    } | null | undefined;
    account?: string | null | undefined;
}>;
export declare const CallPermissionSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallArbitrationSchemaDescription = "Operate the on-chain Arbitration object using the local account signatures. \nThe Arbitration object is designed to handle order disputes, particularly those involving off-chain data, evidence, and proofs. A public arbitration panel reviews the dispute, votes, and determines the compensation amount. If the order's Service object declares support for this Arbitration, the determined compensation amount allows the order payer to immediately withdraw funds from the order.\nThe arbitration process and results are stored as on-chain data, which may be referenced as Guard conditions to grant the order payer additional rights, such as obtaining additional incentives or compensation commitments from the Treasury for the Service.";
export declare const CallArbitrationSchema: z.ZodObject<{
    name: z.ZodLiteral<"arbitration">;
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
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            }, {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            }>]>>;
        } & {
            type_parameter: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        }, {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
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
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            }, {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            data: {
                description: string;
                order: string;
                votable_proposition: string[];
                max_fee?: string | number | undefined;
            };
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
        }, {
            data: {
                description: string;
                order: string;
                votable_proposition: string[];
                max_fee?: string | number | undefined;
            };
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
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
                index: string | number | bigint;
                remark: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            }, {
                remark: string;
                index?: string | number | bigint | undefined;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            data: {
                index: string | number | bigint;
                remark: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
            arb: string;
        }, {
            data: {
                remark: string;
                index?: string | number | bigint | undefined;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
            arb: string;
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
            indemnity: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        }, "strip", z.ZodTypeAny, {
            arb: string;
            feedback: string;
            indemnity?: string | number | undefined;
        }, {
            arb: string;
            feedback: string;
            indemnity?: string | number | undefined;
        }>>;
        description: z.ZodOptional<z.ZodString>;
        endpoint: z.ZodOptional<z.ZodString>;
        fee: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodNumber]>>;
        fee_treasury: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        } & {
            description: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
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
            op: "set" | "add";
            data: {
                guard: string;
                voting_weight: string | number;
            }[];
        }, {
            op: "set" | "add";
            data: {
                guard: string;
                voting_weight?: string | number | undefined;
            }[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            guards: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "remove";
            guards: string[];
        }, {
            op: "remove";
            guards: string[];
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
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        description?: string | undefined;
        guard?: string | undefined;
        endpoint?: string | undefined;
        bPaused?: boolean | undefined;
        arb_new?: {
            data: {
                description: string;
                order: string;
                votable_proposition: string[];
                max_fee?: string | number | undefined;
            };
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
        } | undefined;
        arb_withdraw_fee?: {
            data: {
                index: string | number | bigint;
                remark: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
            arb: string;
        } | undefined;
        voting_guard?: {
            op: "set" | "add";
            data: {
                guard: string;
                voting_weight: string | number;
            }[];
        } | {
            op: "remove";
            guards: string[];
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
            indemnity?: string | number | undefined;
        } | undefined;
        fee?: string | number | undefined;
        fee_treasury?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    }, {
        object: string | {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        description?: string | undefined;
        guard?: string | undefined;
        endpoint?: string | undefined;
        bPaused?: boolean | undefined;
        arb_new?: {
            data: {
                description: string;
                order: string;
                votable_proposition: string[];
                max_fee?: string | number | undefined;
            };
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
        } | undefined;
        arb_withdraw_fee?: {
            data: {
                remark: string;
                index?: string | number | bigint | undefined;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
            arb: string;
        } | undefined;
        voting_guard?: {
            op: "set" | "add";
            data: {
                guard: string;
                voting_weight?: string | number | undefined;
            }[];
        } | {
            op: "remove";
            guards: string[];
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
            indemnity?: string | number | undefined;
        } | undefined;
        fee?: string | number | undefined;
        fee_treasury?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    }>;
    account: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    witness: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        guards: z.ZodArray<z.ZodString, "many">;
        witness: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            witness: z.ZodAny;
            cmd: z.ZodArray<z.ZodNumber, "many">;
            cited: z.ZodNumber;
            type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            identifier: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }, {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    }, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    }>>>;
}, "strip", z.ZodTypeAny, {
    name: "arbitration";
    data: {
        object: string | {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        description?: string | undefined;
        guard?: string | undefined;
        endpoint?: string | undefined;
        bPaused?: boolean | undefined;
        arb_new?: {
            data: {
                description: string;
                order: string;
                votable_proposition: string[];
                max_fee?: string | number | undefined;
            };
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
        } | undefined;
        arb_withdraw_fee?: {
            data: {
                index: string | number | bigint;
                remark: string;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
            arb: string;
        } | undefined;
        voting_guard?: {
            op: "set" | "add";
            data: {
                guard: string;
                voting_weight: string | number;
            }[];
        } | {
            op: "remove";
            guards: string[];
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
            indemnity?: string | number | undefined;
        } | undefined;
        fee?: string | number | undefined;
        fee_treasury?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    };
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    } | null | undefined;
    account?: string | null | undefined;
}, {
    name: "arbitration";
    data: {
        object: string | {
            type_parameter: string;
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            permission?: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
                description?: string | undefined;
            } | undefined;
        };
        description?: string | undefined;
        guard?: string | undefined;
        endpoint?: string | undefined;
        bPaused?: boolean | undefined;
        arb_new?: {
            data: {
                description: string;
                order: string;
                votable_proposition: string[];
                max_fee?: string | number | undefined;
            };
            namedNew?: {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            } | undefined;
        } | undefined;
        arb_withdraw_fee?: {
            data: {
                remark: string;
                index?: string | number | bigint | undefined;
                for_object?: string | undefined;
                for_guard?: string | undefined;
            };
            arb: string;
        } | undefined;
        voting_guard?: {
            op: "set" | "add";
            data: {
                guard: string;
                voting_weight?: string | number | undefined;
            }[];
        } | {
            op: "remove";
            guards: string[];
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
            indemnity?: string | number | undefined;
        } | undefined;
        fee?: string | number | undefined;
        fee_treasury?: string | {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
            description?: string | undefined;
        } | undefined;
    };
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    } | null | undefined;
    account?: string | null | undefined;
}>;
export declare const CallArbitrationSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallPersonalSchemaDescription = "Operate the on-chain Personal object using local account signatures, including managing public personal information (e.g., avatar URL, personal homepage address, social media accounts like Twitter/Discord, personal introduction) and named tags for addresses/wowok entity objects. The tag management facilitates self/others to understand and manage these addresses/entities, and supports operations such as liking (favoriting) or disliking specific addresses/entity objects.";
export declare const CallPersonalSchema: z.ZodObject<{
    name: z.ZodLiteral<"personal">;
    data: z.ZodObject<{
        information: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            avatar: z.ZodOptional<z.ZodString>;
            twitter: z.ZodOptional<z.ZodString>;
            discord: z.ZodOptional<z.ZodString>;
            homepage: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            description?: string | undefined;
            avatar?: string | undefined;
            twitter?: string | undefined;
            discord?: string | undefined;
            homepage?: string | undefined;
        }, {
            name: string;
            description?: string | undefined;
            avatar?: string | undefined;
            twitter?: string | undefined;
            discord?: string | undefined;
            homepage?: string | undefined;
        }>>;
        mark: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
            op: z.ZodLiteral<"add">;
            data: z.ZodArray<z.ZodObject<{
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
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                name?: string | undefined;
                tags?: string[] | undefined;
            }, {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                name?: string | undefined;
                tags?: string[] | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "add";
            data: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
        }, {
            op: "add";
            data: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            data: z.ZodArray<z.ZodObject<{
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
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            }, "strip", z.ZodTypeAny, {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                tags?: string[] | undefined;
            }, {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                tags?: string[] | undefined;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "remove";
            data: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                tags?: string[] | undefined;
            }[];
        }, {
            op: "remove";
            data: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                tags?: string[] | undefined;
            }[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"removeall">;
            addresses: z.ZodArray<z.ZodUnion<[z.ZodObject<{
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
            }>]>, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "removeall";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        }, {
            op: "removeall";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"transfer">;
            to: z.ZodUnion<[z.ZodObject<{
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
            op: "transfer";
            to: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
        }, {
            op: "transfer";
            to: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
        }>, z.ZodObject<{
            op: z.ZodLiteral<"replace">;
            mark_object: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            op: "replace";
            mark_object: string;
        }, {
            op: "replace";
            mark_object: string;
        }>, z.ZodObject<{
            op: z.ZodLiteral<"destroy">;
        }, "strip", z.ZodTypeAny, {
            op: "destroy";
        }, {
            op: "destroy";
        }>]>>;
    }, "strip", z.ZodTypeAny, {
        information?: {
            name: string;
            description?: string | undefined;
            avatar?: string | undefined;
            twitter?: string | undefined;
            discord?: string | undefined;
            homepage?: string | undefined;
        } | undefined;
        mark?: {
            op: "add";
            data: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
        } | {
            op: "remove";
            data: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                tags?: string[] | undefined;
            }[];
        } | {
            op: "removeall";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        } | {
            op: "transfer";
            to: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
        } | {
            op: "replace";
            mark_object: string;
        } | {
            op: "destroy";
        } | undefined;
    }, {
        information?: {
            name: string;
            description?: string | undefined;
            avatar?: string | undefined;
            twitter?: string | undefined;
            discord?: string | undefined;
            homepage?: string | undefined;
        } | undefined;
        mark?: {
            op: "add";
            data: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
        } | {
            op: "remove";
            data: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                tags?: string[] | undefined;
            }[];
        } | {
            op: "removeall";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        } | {
            op: "transfer";
            to: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
        } | {
            op: "replace";
            mark_object: string;
        } | {
            op: "destroy";
        } | undefined;
    }>;
    account: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: "personal";
    data: {
        information?: {
            name: string;
            description?: string | undefined;
            avatar?: string | undefined;
            twitter?: string | undefined;
            discord?: string | undefined;
            homepage?: string | undefined;
        } | undefined;
        mark?: {
            op: "add";
            data: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
        } | {
            op: "remove";
            data: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                tags?: string[] | undefined;
            }[];
        } | {
            op: "removeall";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        } | {
            op: "transfer";
            to: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
        } | {
            op: "replace";
            mark_object: string;
        } | {
            op: "destroy";
        } | undefined;
    };
    account?: string | null | undefined;
}, {
    name: "personal";
    data: {
        information?: {
            name: string;
            description?: string | undefined;
            avatar?: string | undefined;
            twitter?: string | undefined;
            discord?: string | undefined;
            homepage?: string | undefined;
        } | undefined;
        mark?: {
            op: "add";
            data: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                name?: string | undefined;
                tags?: string[] | undefined;
            }[];
        } | {
            op: "remove";
            data: {
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                tags?: string[] | undefined;
            }[];
        } | {
            op: "removeall";
            addresses: ({
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            })[];
        } | {
            op: "transfer";
            to: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
        } | {
            op: "replace";
            mark_object: string;
        } | {
            op: "destroy";
        } | undefined;
    };
    account?: string | null | undefined;
}>;
export declare const CallPersonalSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallGuardSchemaDescription = "Generate the on-chain Guard object using local account signatures. Guard is designed for conditional verification before critical on-chain operations (e.g., time-based triggers or process completion checks), leveraging Wowok's tools for querying/verifying on-chain data (including entity object content, table data, and oracle inputs).\nDistinct from Permission, Guard provides finer-grained and more flexible permission validation. Once generated, its verification logic is immutable and publicly auditable, enabling reuse across various Wowok object operations.\nDuring transaction submission requiring Guard verification, validation executes directly within the transaction using on-chain data or prover-provided evidence. Failed verification aborts the transaction; success allows execution.";
export declare const CallGuardSchema: z.ZodObject<{
    name: z.ZodLiteral<"guard">;
    data: z.ZodObject<{
        root: z.ZodType<any, z.ZodTypeDef, any>;
        namedNew: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
            useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
            onChain: z.ZodOptional<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        }, {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        }>>;
        description: z.ZodOptional<z.ZodString>;
        table: z.ZodOptional<z.ZodArray<z.ZodObject<{
            identifier: z.ZodNumber;
            bWitness: z.ZodBoolean;
            value_type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            value: z.ZodOptional<z.ZodAny>;
        }, "strip", z.ZodTypeAny, {
            identifier: number;
            value_type: WOWOK.ValueType;
            bWitness: boolean;
            value?: any;
        }, {
            identifier: number;
            value_type: WOWOK.ValueType;
            bWitness: boolean;
            value?: any;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        description?: string | undefined;
        root?: any;
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
        table?: {
            identifier: number;
            value_type: WOWOK.ValueType;
            bWitness: boolean;
            value?: any;
        }[] | undefined;
    }, {
        description?: string | undefined;
        root?: any;
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
        table?: {
            identifier: number;
            value_type: WOWOK.ValueType;
            bWitness: boolean;
            value?: any;
        }[] | undefined;
    }>;
    account: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    name: "guard";
    data: {
        description?: string | undefined;
        root?: any;
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
        table?: {
            identifier: number;
            value_type: WOWOK.ValueType;
            bWitness: boolean;
            value?: any;
        }[] | undefined;
    };
    account?: string | null | undefined;
}, {
    name: "guard";
    data: {
        description?: string | undefined;
        root?: any;
        namedNew?: {
            name?: string | undefined;
            tags?: string[] | undefined;
            useAddressIfNameExist?: boolean | undefined;
            onChain?: boolean | undefined;
        } | undefined;
        table?: {
            identifier: number;
            value_type: WOWOK.ValueType;
            bWitness: boolean;
            value?: any;
        }[] | undefined;
    };
    account?: string | null | undefined;
}>;
export declare const CallGuardSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const CallObejctPermissionSchemaDescription = "Batch replace on-chain Permission objects for core wowok protocol entities (Machine, Service, Repository, Treasury, Arbitration, Demand) using local account cryptographic signatures. This operation facilitates centralized access control management by replacing existing Permission objects with new ones, which define granular access rules (e.g., read/write permissions, operation authorizations) for these entity types. Transaction validity requires signers to be the original owners of the target Permission objects, ensuring alignment with wowok protocol's ownership verification mechanism.";
export declare const CallObejctPermissionSchema: z.ZodObject<{
    name: z.ZodLiteral<"object_permission">;
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
    account: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    witness: z.ZodNullable<z.ZodOptional<z.ZodObject<{
        guards: z.ZodArray<z.ZodString, "many">;
        witness: z.ZodArray<z.ZodObject<{
            guard: z.ZodString;
            witness: z.ZodAny;
            cmd: z.ZodArray<z.ZodNumber, "many">;
            cited: z.ZodNumber;
            type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
            identifier: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }, {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    }, {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    }>>>;
}, "strip", z.ZodTypeAny, {
    name: "object_permission";
    data: {
        objects: string[];
        new_permission: string;
    };
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    } | null | undefined;
    account?: string | null | undefined;
}, {
    name: "object_permission";
    data: {
        objects: string[];
        new_permission: string;
    };
    witness?: {
        guards: string[];
        witness: {
            type: WOWOK.ValueType;
            identifier: number;
            guard: string;
            cmd: number[];
            cited: number;
            witness?: any;
        }[];
    } | null | undefined;
    account?: string | null | undefined;
}>;
export declare const CallObejctPermissionSchemaInput: () => import("zod-to-json-schema").JsonSchema7Type & {
    $schema?: string | undefined;
    definitions?: {
        [key: string]: import("zod-to-json-schema").JsonSchema7Type;
    } | undefined;
};
export declare const OperateSchemaDescription = "Operations on wowok protocol include two categories: \n\n### Local operations (do not require local account signatures) and management of:\n1. local private information (e.g., addresses, phone numbers); \n2. local names and tags for addresses.\n3. local accounts.\n\n### On-chain operations (require local account cryptographic signatures)\n1. Supported entities include: Demand, Repository, Machine, Service, Treasury, Arbitration, Personal, Guard, and Permission. Each entity has its own specific operation schema, allowing for granular control over various aspects of the protocol's functionality.\n2. Permission management (including replacement and transfer) for on-chain entity objects (Demand, Machine, Repository, Service, Arbitration, Treasury) by setting their `permission` attribute (which specifies the associated Permission object).";
export declare const OperateSchema: z.ZodObject<{
    call: z.ZodUnion<[z.ZodObject<{
        name: z.ZodLiteral<"permission">;
        data: z.ZodObject<{
            object: z.ZodUnion<[z.ZodString, z.ZodObject<{
                name: z.ZodOptional<z.ZodString>;
                tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
                useAddressIfNameExist: z.ZodOptional<z.ZodBoolean>;
                onChain: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            }, {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
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
                op: "add";
                data: {
                    name: string;
                    index: number;
                }[];
            }, {
                op: "add";
                data: {
                    name: string;
                    index?: any;
                }[];
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
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
                    };
                    permissions: {
                        index: number;
                        guard?: string | undefined;
                    }[];
                }, {
                    address: {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
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
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
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
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
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
                        guard: z.ZodOptional<z.ZodString>;
                    }, "strip", z.ZodTypeAny, {
                        address: {
                            account_or_address?: string | undefined;
                        } | {
                            mark_or_address: string;
                        };
                        guard?: string | undefined;
                    }, {
                        address: {
                            account_or_address?: string | undefined;
                        } | {
                            mark_or_address: string;
                        };
                        guard?: string | undefined;
                    }>, "many">;
                }, "strip", z.ZodTypeAny, {
                    index: number;
                    entities: {
                        address: {
                            account_or_address?: string | undefined;
                        } | {
                            mark_or_address: string;
                        };
                        guard?: string | undefined;
                    }[];
                }, {
                    entities: {
                        address: {
                            account_or_address?: string | undefined;
                        } | {
                            mark_or_address: string;
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
                            account_or_address?: string | undefined;
                        } | {
                            mark_or_address: string;
                        };
                        guard?: string | undefined;
                    }[];
                }[];
            }, {
                op: "add permission";
                permissions: {
                    entities: {
                        address: {
                            account_or_address?: string | undefined;
                        } | {
                            mark_or_address: string;
                        };
                        guard?: string | undefined;
                    }[];
                    index?: any;
                }[];
            }>, z.ZodObject<{
                op: z.ZodLiteral<"remove entity">;
                addresses: z.ZodArray<z.ZodUnion<[z.ZodObject<{
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
                }>]>, "many">;
            }, "strip", z.ZodTypeAny, {
                op: "remove entity";
                addresses: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            }, {
                op: "remove entity";
                addresses: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            }>, z.ZodObject<{
                op: z.ZodLiteral<"remove permission">;
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
                index: z.ZodArray<z.ZodEffects<z.ZodTypeAny, number, any>, "many">;
            }, "strip", z.ZodTypeAny, {
                op: "remove permission";
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                index: number[];
            }, {
                op: "remove permission";
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                index: any[];
            }>, z.ZodObject<{
                op: z.ZodLiteral<"transfer permission">;
                from: z.ZodUnion<[z.ZodObject<{
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
                to: z.ZodUnion<[z.ZodObject<{
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
                op: "transfer permission";
                from: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                to: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
            }, {
                op: "transfer permission";
                from: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                to: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
            }>]>>;
            admin: z.ZodOptional<z.ZodUnion<[z.ZodObject<{
                op: z.ZodUnion<[z.ZodLiteral<"add">, z.ZodLiteral<"remove">, z.ZodLiteral<"set">]>;
                addresses: z.ZodArray<z.ZodUnion<[z.ZodObject<{
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
                }>]>, "many">;
            }, "strip", z.ZodTypeAny, {
                op: "set" | "add" | "remove";
                addresses: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            }, {
                op: "set" | "add" | "remove";
                addresses: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            }>, z.ZodObject<{
                op: z.ZodLiteral<"removeall">;
            }, "strip", z.ZodTypeAny, {
                op: "removeall";
            }, {
                op: "removeall";
            }>]>>;
            builder: z.ZodUnion<[z.ZodObject<{
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
            object: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            };
            builder: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            description?: string | undefined;
            permission?: {
                op: "add entity";
                entities: {
                    address: {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
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
                            account_or_address?: string | undefined;
                        } | {
                            mark_or_address: string;
                        };
                        guard?: string | undefined;
                    }[];
                }[];
            } | {
                op: "remove entity";
                addresses: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            } | {
                op: "remove permission";
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                index: number[];
            } | {
                op: "transfer permission";
                from: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                to: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
            } | undefined;
            biz_permission?: {
                op: "add";
                data: {
                    name: string;
                    index: number;
                }[];
            } | {
                op: "remove";
                permissions: number[];
            } | undefined;
            admin?: {
                op: "set" | "add" | "remove";
                addresses: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            } | {
                op: "removeall";
            } | undefined;
        }, {
            object: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            };
            builder: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            description?: string | undefined;
            permission?: {
                op: "add entity";
                entities: {
                    address: {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
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
                            account_or_address?: string | undefined;
                        } | {
                            mark_or_address: string;
                        };
                        guard?: string | undefined;
                    }[];
                    index?: any;
                }[];
            } | {
                op: "remove entity";
                addresses: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            } | {
                op: "remove permission";
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                index: any[];
            } | {
                op: "transfer permission";
                from: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                to: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
            } | undefined;
            biz_permission?: {
                op: "add";
                data: {
                    name: string;
                    index?: any;
                }[];
            } | {
                op: "remove";
                permissions: any[];
            } | undefined;
            admin?: {
                op: "set" | "add" | "remove";
                addresses: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            } | {
                op: "removeall";
            } | undefined;
        }>;
        account: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        witness: z.ZodNullable<z.ZodOptional<z.ZodObject<{
            guards: z.ZodArray<z.ZodString, "many">;
            witness: z.ZodArray<z.ZodObject<{
                guard: z.ZodString;
                witness: z.ZodAny;
                cmd: z.ZodArray<z.ZodNumber, "many">;
                cited: z.ZodNumber;
                type: z.ZodNativeEnum<typeof WOWOK.ValueType>;
                identifier: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                type: WOWOK.ValueType;
                identifier: number;
                guard: string;
                cmd: number[];
                cited: number;
                witness?: any;
            }, {
                type: WOWOK.ValueType;
                identifier: number;
                guard: string;
                cmd: number[];
                cited: number;
                witness?: any;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            guards: string[];
            witness: {
                type: WOWOK.ValueType;
                identifier: number;
                guard: string;
                cmd: number[];
                cited: number;
                witness?: any;
            }[];
        }, {
            guards: string[];
            witness: {
                type: WOWOK.ValueType;
                identifier: number;
                guard: string;
                cmd: number[];
                cited: number;
                witness?: any;
            }[];
        }>>>;
    }, "strip", z.ZodTypeAny, {
        name: "permission";
        data: {
            object: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            };
            builder: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            description?: string | undefined;
            permission?: {
                op: "add entity";
                entities: {
                    address: {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
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
                            account_or_address?: string | undefined;
                        } | {
                            mark_or_address: string;
                        };
                        guard?: string | undefined;
                    }[];
                }[];
            } | {
                op: "remove entity";
                addresses: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            } | {
                op: "remove permission";
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                index: number[];
            } | {
                op: "transfer permission";
                from: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                to: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
            } | undefined;
            biz_permission?: {
                op: "add";
                data: {
                    name: string;
                    index: number;
                }[];
            } | {
                op: "remove";
                permissions: number[];
            } | undefined;
            admin?: {
                op: "set" | "add" | "remove";
                addresses: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            } | {
                op: "removeall";
            } | undefined;
        };
        witness?: {
            guards: string[];
            witness: {
                type: WOWOK.ValueType;
                identifier: number;
                guard: string;
                cmd: number[];
                cited: number;
                witness?: any;
            }[];
        } | null | undefined;
        account?: string | null | undefined;
    }, {
        name: "permission";
        data: {
            object: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            };
            builder: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            description?: string | undefined;
            permission?: {
                op: "add entity";
                entities: {
                    address: {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
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
                            account_or_address?: string | undefined;
                        } | {
                            mark_or_address: string;
                        };
                        guard?: string | undefined;
                    }[];
                    index?: any;
                }[];
            } | {
                op: "remove entity";
                addresses: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            } | {
                op: "remove permission";
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                index: any[];
            } | {
                op: "transfer permission";
                from: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                to: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
            } | undefined;
            biz_permission?: {
                op: "add";
                data: {
                    name: string;
                    index?: any;
                }[];
            } | {
                op: "remove";
                permissions: any[];
            } | undefined;
            admin?: {
                op: "set" | "add" | "remove";
                addresses: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            } | {
                op: "removeall";
            } | undefined;
        };
        witness?: {
            guards: string[];
            witness: {
                type: WOWOK.ValueType;
                identifier: number;
                guard: string;
                cmd: number[];
                cited: number;
                witness?: any;
            }[];
        } | null | undefined;
        account?: string | null | undefined;
    }>, z.ZodObject<{
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
            op: "add";
            data: {
                name: string;
                address: string;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }[];
        }, {
            op: "add";
            data: {
                name: string;
                address: string;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }[];
        }>, z.ZodObject<{
            op: z.ZodLiteral<"remove">;
            data: z.ZodArray<z.ZodString, "many">;
        }, "strip", z.ZodTypeAny, {
            op: "remove";
            data: string[];
        }, {
            op: "remove";
            data: string[];
        }>]>;
    }, "strip", z.ZodTypeAny, {
        data: {
            op: "removeall";
        } | {
            op: "add";
            data: {
                name: string;
                address: string;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }[];
        } | {
            op: "remove";
            data: string[];
        };
    }, {
        data: {
            op: "removeall";
        } | {
            op: "add";
            data: {
                name: string;
                address: string;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }[];
        } | {
            op: "remove";
            data: string[];
        };
    }>]>;
}, "strip", z.ZodTypeAny, {
    call: {
        name: "permission";
        data: {
            object: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            };
            builder: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            description?: string | undefined;
            permission?: {
                op: "add entity";
                entities: {
                    address: {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
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
                            account_or_address?: string | undefined;
                        } | {
                            mark_or_address: string;
                        };
                        guard?: string | undefined;
                    }[];
                }[];
            } | {
                op: "remove entity";
                addresses: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            } | {
                op: "remove permission";
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                index: number[];
            } | {
                op: "transfer permission";
                from: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                to: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
            } | undefined;
            biz_permission?: {
                op: "add";
                data: {
                    name: string;
                    index: number;
                }[];
            } | {
                op: "remove";
                permissions: number[];
            } | undefined;
            admin?: {
                op: "set" | "add" | "remove";
                addresses: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            } | {
                op: "removeall";
            } | undefined;
        };
        witness?: {
            guards: string[];
            witness: {
                type: WOWOK.ValueType;
                identifier: number;
                guard: string;
                cmd: number[];
                cited: number;
                witness?: any;
            }[];
        } | null | undefined;
        account?: string | null | undefined;
    } | {
        data: {
            op: "removeall";
        } | {
            op: "add";
            data: {
                name: string;
                address: string;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }[];
        } | {
            op: "remove";
            data: string[];
        };
    };
}, {
    call: {
        name: "permission";
        data: {
            object: string | {
                name?: string | undefined;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
                onChain?: boolean | undefined;
            };
            builder: {
                account_or_address?: string | undefined;
            } | {
                mark_or_address: string;
            };
            description?: string | undefined;
            permission?: {
                op: "add entity";
                entities: {
                    address: {
                        account_or_address?: string | undefined;
                    } | {
                        mark_or_address: string;
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
                            account_or_address?: string | undefined;
                        } | {
                            mark_or_address: string;
                        };
                        guard?: string | undefined;
                    }[];
                    index?: any;
                }[];
            } | {
                op: "remove entity";
                addresses: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            } | {
                op: "remove permission";
                address: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                index: any[];
            } | {
                op: "transfer permission";
                from: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
                to: {
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                };
            } | undefined;
            biz_permission?: {
                op: "add";
                data: {
                    name: string;
                    index?: any;
                }[];
            } | {
                op: "remove";
                permissions: any[];
            } | undefined;
            admin?: {
                op: "set" | "add" | "remove";
                addresses: ({
                    account_or_address?: string | undefined;
                } | {
                    mark_or_address: string;
                })[];
            } | {
                op: "removeall";
            } | undefined;
        };
        witness?: {
            guards: string[];
            witness: {
                type: WOWOK.ValueType;
                identifier: number;
                guard: string;
                cmd: number[];
                cited: number;
                witness?: any;
            }[];
        } | null | undefined;
        account?: string | null | undefined;
    } | {
        data: {
            op: "removeall";
        } | {
            op: "add";
            data: {
                name: string;
                address: string;
                tags?: string[] | undefined;
                useAddressIfNameExist?: boolean | undefined;
            }[];
        } | {
            op: "remove";
            data: string[];
        };
    };
}>;
//# sourceMappingURL=call.d.ts.map