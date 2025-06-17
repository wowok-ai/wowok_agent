
import { z, ZodAny, ZodUnionDef } from "zod";
import * as WOWOK from 'wowok';
import { local_info_operation, local_mark_operation } from "../local/index.js";
import { AccountOperationSchema, LocalMarkOperationSchema } from "./local.js";
import * as D from './const.js';
import { zodToJsonSchema } from "zod-to-json-schema";

export const GetMarkNameSchema = (object:string='') : z.ZodString=> {
    return z.string().nonempty().describe(D.MarkName_Address_Description(object));
} 

export const AccountNameSchema = z.string().optional().describe(D.AccountName_Address_Description);

//export const AccountOrMarkNameDescription = 'Either a specifically specified address or a name used to look up the address from the local account or mark.';
export const AccountOrMarkNameSchema = z.union([
    z.object({account_or_address: AccountNameSchema}),
    z.object({mark_or_address: GetMarkNameSchema()})
]).describe(`AccountOrMarkNameSchema_Description`);   
/*
const PermissioIndexArray = WOWOK.PermissionInfo.filter(i => i.index !== WOWOK.PermissionIndex.user_defined_start)
    .map(v => z.literal(v.index).describe(`${v.module}.${v.name}`));
*/
const GetPermissionIndexSchema = (type:'built-in' | 'biz' | 'all'='all') : z.ZodTypeAny => {
    if(type === 'built-in'){
        return z.number().int().min(0).max(WOWOK.PermissionIndex.user_defined_start-1).describe(D.PermissionIndexSchema_Buildin_Description);
        //return z.union([PermissioIndexArray[0], PermissioIndexArray[1], ...PermissioIndexArray.slice(2)]).describe(D.PermissionIndexSchema_Buildin_Description);
    }else if(type === 'biz'){
        return z.number().int().min(WOWOK.PermissionIndex.user_defined_start).describe(D.PermissionIndexSchema_Biz_Description);
    } else {
        return z.number().int().min(0).describe(D.PermissionIndexSchema_Description);
        //return z.union([z.literal(WOWOK.PermissionIndex.user_defined_start), z.number().int().min(WOWOK.PermissionIndex.user_defined_start+1), ...PermissioIndexArray]).describe(D.PermissionIndexSchema_Description);
    }
}

const SafeUint8ArraySchema = z.custom<Uint8Array>((val) => 
    Object.prototype.toString.call(val) === "[object Uint8Array]"
);

const NamedObjectSchema = z.object({
    name: z.string().optional(),
    tags: z.array(z.string().nonempty()).optional(),
    useAddressIfNameExist: z.boolean().optional().describe(D.useAddressIfNameExist_Description),
    onChain: z.boolean().optional().describe(D.onChain_Description),
}).describe(D.NamedObjectSchema_Description());

const GetNamedObjectSchema = (object:string='') => {
    return NamedObjectSchema.describe(D.NamedObjectSchema_Description(object))
}

const NamedObjectWithDescriptionSchema = NamedObjectSchema.extend({
    description: z.string().optional().describe(D.OnchainDescription_Description)
});

const ObjectParamSchema =(object:string='') => {
    return z.union([
        GetMarkNameSchema(object), NamedObjectWithDescriptionSchema
    ]).describe(D.ObjectParamSchema_Description(object));    
} 

const NamedObjectWithPermissionSchema = NamedObjectSchema.extend({
    permission: ObjectParamSchema().optional().describe(D.Permission_Description)
}); 

const TypeNamedObjectWithPermissionSchema = NamedObjectWithPermissionSchema.extend({
    type_parameter: z.string().nonempty().describe(D.Type_Description)
});

const ObjectTypedMainSchema = z.union([GetMarkNameSchema(), TypeNamedObjectWithPermissionSchema]);
const ObjectMainSchema = z.union([GetMarkNameSchema(), NamedObjectWithPermissionSchema]);

const ValueTypeSchema = z.nativeEnum(WOWOK.ValueType).describe(D.ValueType_Description);
const GuardIndentifierSchema = z.number().int().min(1).max(255);
const TokenBalanceSchema = z.union([z.string(), z.number().int().min(0)]).describe(D.Balance_Description);


const ObjectsOperationSchema = (object:string='') => {
    return z.union([
        z.object({
            op: z.union([z.literal('set'), z.literal('remove'), z.literal('add')]),
            objects: z.array(GetMarkNameSchema(object)).describe(D.Objects_Description)
        }).describe(D.SetList_Description),
        z.object({
            op: z.literal('removeall')
        }).describe(D.RemoveallList_Description)
    ]) 
};

const GuardNodeSchema: z.ZodType = z.lazy(() => z.union([
    z.object({
        identifier: GuardIndentifierSchema
    }).describe(D.Identifier_Description), 
    z.object({
        query: z.number().int().describe(D.QueryId_Description),
        object: z.union([GetMarkNameSchema(), GuardIndentifierSchema.describe(D.ObjectIdentifier_Description)
        ]).describe(D.ObjectQuery_Description),
        parameters: z.array(GuardNodeSchema).describe(D.GuardNodeParams_Description)
    }).describe(D.GuardQuery_Description), 
    z.object({
        logic: z.union([
            z.literal(WOWOK.OperatorType.TYPE_LOGIC_AS_U256_GREATER).describe(D.TYPE_LOGIC_AS_U256_GREATER_Description), 
            z.literal(WOWOK.OperatorType.TYPE_LOGIC_AS_U256_GREATER_EQUAL).describe(D.TYPE_LOGIC_AS_U256_GREATER_EQUAL_Description),
            z.literal(WOWOK.OperatorType.TYPE_LOGIC_AS_U256_LESSER).describe(D.TYPE_LOGIC_AS_U256_LESSER_Description),
            z.literal(WOWOK.OperatorType.TYPE_LOGIC_AS_U256_LESSER_EQUAL).describe(D.TYPE_LOGIC_AS_U256_LESSER_EQUAL_Description),
            z.literal(WOWOK.OperatorType.TYPE_LOGIC_AS_U256_EQUAL).describe(D.TYPE_LOGIC_AS_U256_EQUAL_Description),
            z.literal(WOWOK.OperatorType.TYPE_LOGIC_EQUAL).describe(D.TYPE_LOGIC_EQUAL_Description),
            z.literal(WOWOK.OperatorType.TYPE_LOGIC_HAS_SUBSTRING).describe(D.TYPE_LOGIC_HAS_SUBSTRING_Description),
            z.literal(WOWOK.OperatorType.TYPE_LOGIC_NOT).describe(D.TYPE_LOGIC_NOT_Description),
            z.literal(WOWOK.OperatorType.TYPE_LOGIC_AND).describe(D.TYPE_LOGIC_AND_Description),
            z.literal(WOWOK.OperatorType.TYPE_LOGIC_OR).describe(D.TYPE_LOGIC_OR_Description),
        ]).describe(D.GuardLogic_Description),
        parameters: z.array(GuardNodeSchema).describe(D.GuardNodeLogicParams_Description)
    }).describe(D.GuardNodeLogic_Description),
    z.object({
        calc: z.union([z.literal(WOWOK.OperatorType.TYPE_NUMBER_ADD).describe(D.GuardCalcAdd_Description), 
            z.literal(WOWOK.OperatorType.TYPE_NUMBER_DEVIDE).describe(D.GuardCalcDevide_Description),
            z.literal(WOWOK.OperatorType.TYPE_NUMBER_MOD).describe(D.GuardCalcMod_Description), 
            z.literal(WOWOK.OperatorType.TYPE_NUMBER_ADDRESS).describe(D.GuardCalcAddress_Description),
            z.literal(WOWOK.OperatorType.TYPE_NUMBER_MULTIPLY).describe(D.GuardCalcMultiply_Description), 
            z.literal(WOWOK.OperatorType.TYPE_NUMBER_SUBTRACT).describe(D.GuardCalcSubtract_Description),
        ]),
        parameters: z.array(GuardNodeSchema).describe(D.GuardNodeParams_Description)
    }).describe(D.GuardNodeCalc_Description),
    z.object({
        value_type: ValueTypeSchema,
        value: z.any()
    }).describe(D.GuardNodeValue_Description),
    z.object({
        context: z.union([z.literal(WOWOK.ContextType.TYPE_SIGNER).describe(D.GuardContextSigner_Description), 
            z.literal(WOWOK.ContextType.TYPE_CLOCK).describe(D.GuardContextClock_Description),
            z.literal(WOWOK.ContextType.TYPE_GUARD).describe(D.GuardContextGuard_Description),
        ]).describe(D.GuardNodeContext_Description)
    })
]).describe(D.GuardNode_Description));

const MachineForwardSupplySchema  = z.object({
    service: GetMarkNameSchema('Service').describe(D.Forward_Supply_Object_Description),
    bRequired:z.boolean().optional().describe(D.Forward_Supply_bRequired_Description)
});

const MachineNode_ForwardSchema = z.object({
    name:z.string().nonempty().describe(D.Forward_Name_Description),
    namedOperator:z.string().nonempty().optional().describe(D.Forward_NamedOperator_Description),
    permission:GetPermissionIndexSchema('biz').optional().describe(D.Forward_Permission_Description),
    weight: z.number().int().min(1).default(1).optional().describe(D.Forward_Weight_Description),
    guard: z.string().optional().describe(D.Forward_Guard_Description),
    suppliers: z.array(MachineForwardSupplySchema).optional().describe(D.Forward_Supplies_Description)
});

const MachineNodeSchema = z.object({
    name: z.string().nonempty().describe(D.Node_Name_Description),
    pairs: z.array(z.object({
        prior_node:z.string().describe(D.Pair_PriorNode_Description),
        threshold: z.number().int().min(0).describe(D.Pair_Threshold_Description),
        forwards: z.array(MachineNode_ForwardSchema).describe(D.Forwards_Description)
    })).describe(D.Pairs_Description)
});

const ProgressOperationSchema = z.object({
    next_node_name: z.string().nonempty().describe(D.ProgressOperation_Next_Description),
    forward: z.string().nonempty().describe(D.ProgressOperation_Forward_Description),
}).describe(D.ProgressOperation_Description);

const GuardPercentSchema = z.union([
    z.object({
        op: z.union([z.literal('add'), z.literal('set')]),
        guards: z.array(z.object({
            guard: GetMarkNameSchema('Guard'),
            percent: z.number().int().min(0).max(100)
        }))
    }).describe(D.GuardPercent_Add_Description), 
    z.object({
        op: z.literal('remove'), 
        guards: z.array(GetMarkNameSchema('Guard'))
    }),
    z.object({
        op: z.literal('removeall'), 
    })
]).describe(D.GuardPercent_Description)

const RepositoryValueTypeSchema = z.union([
    z.literal(WOWOK.RepositoryValueType.Address).describe(D.RepositoryValueType_Address),
    z.literal(WOWOK.RepositoryValueType.Address_Vec).describe(D.RepositoryValueType_AddressVec),
    z.literal(WOWOK.RepositoryValueType.String).describe(D.RepositoryValueType_String),
    z.literal(WOWOK.RepositoryValueType.String_Vec).describe(D.RepositoryValueType_StringVec),
    z.literal(WOWOK.RepositoryValueType.PositiveNumber).describe(D.RepositoryValueType_Number),
    z.literal(WOWOK.RepositoryValueType.PositiveNumber_Vec).describe(D.RepositoryValueType_NumberVec),
    z.literal(WOWOK.RepositoryValueType.Bool).describe(D.RepositoryValueType_Bool),
]).describe(D.RepositoryValueType_Description);

export const CallDemandDataSchema = z.object({
    object: ObjectTypedMainSchema,
    present:z.object({
        service:GetMarkNameSchema('Service').optional(),
        recommend_words:z.string().default(''),
    }).optional().describe(D.Demand_Present_Description),
    description: z.string().optional().describe(D.ObjectDes_Description),
    time_expire: z.union([z.object({
            op:z.literal('duration'),
            minutes:z.number().int().min(1)
        }).describe(D.Demand_Time_Expire_Op_Duration_Description), 
        z.object({
            op:z.literal('time'),
            time:z.number().int().min(1)
        }).describe(D.Demand_Time_Expire_Op_Unix_Description)
    ]).optional().describe(D.Demand_Time_Expire_Description),
    bounty:z.union([
        z.object({
            op:z.literal('add'),
            object:z.union([
                z.object({address:z.string().nonempty()}), 
                z.object({balance:TokenBalanceSchema}).describe('The token quantity owned by the transaction signer. This parameter is valid only if the Demand generic type is FT (0x2::coin::Coin<...>); if the Demand generic type is not FT, using this parameter will fail.')
            ]).describe('Specify the address of an existing object or generate a new object address (which includes the specified quantity of tokens).'),  
        }).describe('Add the object owned by the transaction signer to the bounty pool of the Demand'), 
        z.object({
            op:z.literal('reward'),
            service:GetMarkNameSchema('Service')
        }).describe(D.Demand_Bounty_Reward_Description), 
        z.object({
            op:z.literal('refund')
        }).describe(D.Demand_Bounty_Refund_Description)
    ]).optional().describe(D.Demand_Bounty_Description),
    guard:z.object({
        guard: GetMarkNameSchema('Guard').nullable(),
        service_id_in_guard:GuardIndentifierSchema.optional()
    }).optional().describe(D.Demand_Guard_Description)
}).describe(D.GetObjectDataDescription('Demand')); 

export const CallGuardDataSchema = z.object({
    root:GuardNodeSchema.describe(D.Guard_Root_Description),
    namedNew: GetNamedObjectSchema('Guard').optional(),
    description: z.string().optional().describe(D.ObjectDes_Description),
    table:z.array(z.object({
        identifier:GuardIndentifierSchema.describe(D.Guard_Table_Id),
        bWitness:z.boolean().describe(D.Guard_Table_bWitenss),
        value_type: ValueTypeSchema.describe(D.Guard_Table_Type),
        value: z.any().optional().describe(D.Guard_Table_Value)
    })).optional().describe(D.Guard_Table_Description),
}).describe(D.GetObjectDataDescription('Guard'));

const OptionProgressObjectSchema = GetMarkNameSchema('Progress').optional().describe(D.OptionProgressObject_Description);
const OptionOrderObjectSchema = GetMarkNameSchema('Order').optional().describe(D.OptionOrderObject_Description);

export const CallMachineDataSchema = z.object({
    object: ObjectMainSchema,
    progress_new: z.object({
        task_address:GetMarkNameSchema().optional(),
        namedNew: GetNamedObjectSchema('Progress').optional(),
        }).optional().describe(D.Progress_New_Description),
    progress_context_repository: z.object({
        progress:OptionProgressObjectSchema,
        repository:GetMarkNameSchema('Repository').nullable(),
    }).optional().describe(D.Progress_Context_Description),
    progress_namedOperator: z.object({
        progress:OptionProgressObjectSchema,
        data:z.array(z.object({
            name:z.string().nonempty().describe(D.Forward_NamedOperator_Description),
            operators:z.array(AccountOrMarkNameSchema).describe(D.Progress_NamedOperator_Op_Description)
        }))
    }).optional().describe(D.Progress_NamedOperator_Description),
    progress_parent: z.object({
        progress:OptionProgressObjectSchema,
        parent:z.object({
            parent_id: GetMarkNameSchema('Progress'),
            parent_session_id: z.number().int().min(0).describe(D.Parent_SessionId),
            operation: ProgressOperationSchema
        }).nullable()
    }).optional().describe(D.Progress_Parent_Description),
    progress_hold: z.object({
        progress:OptionProgressObjectSchema,
        operation:ProgressOperationSchema,
        bHold: z.boolean().describe(D.Hold_bHold_Description),
        adminUnhold: z.boolean().optional().describe(D.Hold_adminUnhold_Description),
    }).optional().describe(D.Progress_Hold_Description), 
    progress_task: z.object({
        progress:GetMarkNameSchema('Progress'),
        task_address:GetMarkNameSchema()
    }).optional().describe(D.Progress_Task_Description),   
    progress_next: z.object({
        progress: GetMarkNameSchema('Progress'),
        operation:ProgressOperationSchema,
        deliverable: z.object({
            msg: z.string().describe(D.Deliverble_Msg),
            orders: z.array(GetMarkNameSchema('Order')).describe(D.Deliverble_Orders)
        })
    }).optional().describe(D.Progress_Next_Description),    
    description: z.string().optional().describe(D.ObjectDes_Description),
    endpoint: z.string().optional().describe(D.Machine_Endpoint_Description),
    consensus_repository: ObjectsOperationSchema().optional().describe(D.Machine_Repository_Description),
    nodes: z.union([
        z.object({
            op:z.literal('add'),
            data: z.array(MachineNodeSchema),
        }).describe(D.Machine_AddNode_Description),
        z.object({
            op:z.literal('remove'),
            names: z.array(z.string().nonempty()).describe(D.Machine_RemoveNode_Name),
            bTransferMyself: z.boolean().optional().describe(D.Machine_RemoveNode_bTransferMyself)
        }).describe(D.Machine_RemoveNode_Description),
        z.object({
            op:z.literal('rename node'),
            data: z.array(z.object({
                old:z.string().nonempty().describe(D.Machine_RenameNode_Old),
                new:z.string().nonempty().describe(D.Machine_RenameNode_New),
            })).describe('Rename the nodes.')
        }),
        z.object({
            op:z.literal('add from myself'),
            addresses:z.array(GetMarkNameSchema('Node'))
        }).describe(D.Machine_AddFromSelf_Description),
        z.object({
            op:z.literal('remove pair'),
            pairs:z.array(z.object({
                prior_node_name: z.string().describe(D.Pair_Prior),
                node_name: z.string().nonempty().describe(D.Pair_Node),
            }))
        }).describe(D.Machine_RemovePairs),
        z.object({
            op:z.literal('add forward'),
            data: z.array(z.object({
                prior_node_name: z.string().describe(D.Pair_Prior),
                node_name: z.string().nonempty().describe(D.Pair_Node),
                forward: MachineNode_ForwardSchema,
                threshold: z.number().int().min(0).optional().describe(D.Pair_Threashold),        
                remove_old_forward: z.string().nonempty().optional().describe('The name of the foward to remove.'),
            }))
        }).describe(D.Machine_AddForward_Description),
        z.object({
            op:z.literal('remove forward'),
            data: z.array(z.object({
                prior_node_name: z.string().describe(D.Pair_Prior),
                node_name: z.string().nonempty().describe(D.Pair_Node),
                forward_name: z.string().nonempty().describe(D.Forward_Name_Description),
            }).describe(D.Machine_RemoveForward))
        }).describe(D.Machine_RemoveForward_Description)
    ]).optional().describe('Nodes and their operations.'),
    bPublished:z.boolean().optional().describe(D.Machine_Publish),
    bPaused: z.boolean().optional().describe(D.Machine_Pause),
    clone_new: z.object({
        namedNew: GetNamedObjectSchema('Machine').optional(),
    }).optional().describe(D.Machine_Clone),
}).describe(D.GetObjectDataDescription('Machine')); 

export const CallPermissionDataSchema = z.object({
    object: z.union([GetMarkNameSchema('Permission'), NamedObjectSchema]),
    description: z.string().optional().describe(D.ObjectDes_Description),
    biz_permission: z.union([
        z.object({
            op: z.literal('add'),
            data: z.array(z.object({
                index: GetPermissionIndexSchema('biz').transform(val => Number(val)),
                name: z.string().nonempty().describe(D.BizPermission_Name)
            }))
        }).describe(D.Permission_BizAdd), 
        z.object({
            op: z.literal('remove'),
            permissions: z.array(GetPermissionIndexSchema('biz').transform(val => Number(val)))
        }).describe(D.Permission_BizRemove)
    ]).optional().describe(D.Permission_Biz_Description),
    permission:z.union([
        z.object({
            op:z.literal('add entity'),
            entities:z.array(z.object({
                address: AccountOrMarkNameSchema,
                permissions: z.array(z.object({
                    index: GetPermissionIndexSchema().transform(val => Number(val)),
                    guard: GetMarkNameSchema('Guard').optional()
                }).describe(D.Entity_Permission))
            }))
        }).describe(D.Permission_AddEntity),
        z.object({
            op:z.literal('add permission'),
            permissions:z.array(z.object({
                index: GetPermissionIndexSchema().transform(val => Number(val)),
                entities: z.array(z.object({
                    address: AccountOrMarkNameSchema,
                    guard: GetMarkNameSchema('Guard').optional()
                }).describe(D.Permission_Entity))
            }))
        }).describe(D.Permission_AddPermission),
        z.object({
            op:z.literal('remove entity'),
            addresses:z.array(AccountOrMarkNameSchema)
        }).describe(D.Permission_RemoveEntity),
        z.object({
            op:z.literal('remove permission'),
            address:AccountOrMarkNameSchema,
            index: z.array(GetPermissionIndexSchema().transform(val => Number(val))),
        }).describe(D.Permission_RemovePermission),
        z.object({
            op:z.literal('transfer permission'),
            from: AccountOrMarkNameSchema,
            to: AccountOrMarkNameSchema,
        }).describe(D.Permission_Transform),
    ]).optional().describe(D.Permission_Permission_Description),
    admin: z.union([
        z.object({
            op: z.union([z.literal('add'), z.literal('remove'), z.literal('set')]),
            addresses:z.array(AccountOrMarkNameSchema)
        }).describe(D.Admin_Add_Remove),
        z.object({
            op:z.literal('removeall')
        }).describe(D.Admin_Removeall)
    ]).optional().describe(D.Permission_Admin_Description),
    builder: AccountOrMarkNameSchema.describe(D.Permission_Builder_Description)
}).describe(D.GetObjectDataDescription('Permission'));

export const RepositoryAddressID = z.union([
    z.number().int().min(0),
    z.bigint(),
    AccountOrMarkNameSchema
]).describe(D.RepositoryAddressID_Description);

export const PayParamSchema = z.object({
    index: z.union([
        z.number().int().min(0).default(0),
        z.bigint(),
        z.string().nonempty(),
    ]),
    remark: z.string(),
    for_object: GetMarkNameSchema().optional(),
    for_guard: GetMarkNameSchema('Guard').optional(),
}).describe(D.Payment_Description);

export const CallRepositoryDataSchema = z.object({
    object: ObjectMainSchema,
    description: z.string().optional().describe(D.ObjectDes_Description),
    reference: ObjectsOperationSchema().optional().describe(D.Repository_Reference_Description),
    mode:z.union([
        z.literal(WOWOK.Repository_Policy_Mode.POLICY_MODE_FREE).describe(D.Mode_Relax),
        z.literal(WOWOK.Repository_Policy_Mode.POLICY_MODE_STRICT).describe(D.Mode_Strict),
    ]).optional().describe(D.Repository_Mode_Description), 
    policy: z.union([
        z.object({
            op: z.union([z.literal('add'), z.literal('set')]),
            data: z.array(z.object({
                key: z.string().nonempty(),
                description: z.string(),
                dataType: RepositoryValueTypeSchema,
                permissionIndex: GetPermissionIndexSchema('biz').transform(val => Number(val)).optional().nullable(),
            }).describe(D.Repository_Policy))
        }).describe(D.Policy_Add), 
        z.object({
            op: z.literal('remove'),
            keys: z.array(z.string().nonempty())
        }).describe(D.Policy_Remove),
        z.object({
            op: z.literal('removeall'),
        }).describe(D.Policy_Removall),
        z.object({
            op: z.literal('rename'),
            data: z.array(z.object({
                old: z.string().nonempty().describe(D.Policy_Rename_Old),
                new: z.string().nonempty().describe(D.Policy_Rename_New)
            }))
        }).describe(D.Policy_Rename),
    ]).optional().describe(D.Repository_Policy_Description),
    data: z.union([
        z.object({
            op:z.literal('add'),
            data: z.union([
                z.object({
                    key: z.string().nonempty().describe(D.Data_Key),
                    data: z.array(z.object({
                        address: RepositoryAddressID,
                        bcsBytes: SafeUint8ArraySchema.describe(D.Data_bcsBytes),
                        value_type: ValueTypeSchema.optional()
                    }).describe(D.Data_ForAddress))
                }).describe('Under the data field, different data(including wowok data type:ValueTypeSchema) corresponding to different addresses.'),
                z.object({
                    address: RepositoryAddressID,
                    data: z.array(z.object({
                        key:z.string().nonempty().describe(D.Data_Key),
                        bcsBytes: SafeUint8ArraySchema.describe(D.Data_bcsBytes),
                    })),
                    value_type: ValueTypeSchema.optional()
                }).describe(D.Repository_Data_ForName)
            ])
        }).describe(D.Repository_AddData),
        z.object({
            op:z.literal('remove'),
            data: z.array(z.object({
                key: z.string().nonempty().describe(D.Data_Key),
                address: RepositoryAddressID
            }))
        }).describe(D.Repository_RemoveData)
    ]).optional().describe(D.Repository_OpData)
}).describe(D.GetObjectDataDescription('Repository'));


export const CallArbitrationDataSchema = z.object({
    object: ObjectTypedMainSchema,
    arb_new: z.object({
        data: z.object({
            order: GetMarkNameSchema('Order'),
            description:  z.string(),
            votable_proposition: z.array(z.string()),
            max_fee: TokenBalanceSchema.optional(),
        }).describe(D.Arb_New),
        namedNew: GetNamedObjectSchema('Arb').optional(),
    }).optional().describe(D.Arbitration_ArbNew),
    arb_withdraw_fee:z.object({
        arb:GetMarkNameSchema('Arb'),
        data: PayParamSchema,
    }).optional().describe(D.Arbitration_Withdraw),
    arb_vote:z.object({
        arb:GetMarkNameSchema('Arb'),
        voting_guard: GetMarkNameSchema('Guard'),
        agrees: z.array(z.number().int().min(0).max(255)).describe(D.Vote_Agrees),
    }).optional().describe(D.Arbitration_Vote),
    arb_arbitration:z.object({
        arb:GetMarkNameSchema('Arb'),
        feedback: z.string().describe(D.Arbitration_Feedback),
        indemnity: TokenBalanceSchema.optional()
    }).optional().describe(D.Arbitration_Arbitratation),
    
    description: z.string().optional().describe(D.ObjectDes_Description),
    endpoint: z.string().optional().describe(D.Arbitration_Endpoint),
    fee: TokenBalanceSchema.optional().describe(D.Arbitration_Fee),
    fee_treasury: ObjectParamSchema('Treasury').optional(),
    guard: GetMarkNameSchema('Guard').optional().describe(D.Arbitration_Guard),
    voting_guard: z.union([
        z.object({
            op:z.union([z.literal('add'), z.literal('set')]),
            data: z.array(z.object({
                guard: GetMarkNameSchema('Guard'),
                voting_weight: z.union([z.number().int().min(1), z.string().nonempty()]).default(1)
            }).describe(D.VotingGuard_Description))
        }).describe(D.Arbitration_VotingGuard_Add),
        z.object({
            op:z.literal('remove'),
            guards: z.array(GetMarkNameSchema('Guard'))
        }).describe(D.Arbitration_VotingGuard_Remove),
        z.object({
            op:z.literal('removeall'),
        }).describe(D.Arbitration_VotingGuard_RemoveAll)
    ]).optional().describe(D.Arbitration_VotingGuard_Description),
    bPaused:z.boolean().optional().describe(D.Arbitration_bPause),
}).describe(D.GetObjectDataDescription('Arbitration')); 

export const ReceiverParamSchema = z.object({
    address: AccountOrMarkNameSchema,
    amount: TokenBalanceSchema,
}).describe(D.ReceiverParam_Description);

export const TreasuryWithdrawParamSchema = PayParamSchema.extend({
    receiver: z.array(ReceiverParamSchema),
    withdraw_guard: GetMarkNameSchema('Guard').optional()
}).describe(D.TreasuryWithdrawParam_Description);

export const CallTreasuryDataSchema = z.object({
    object: ObjectTypedMainSchema,
    deposit: z.object({
        balance:TokenBalanceSchema,
        param: PayParamSchema.optional(),
    }).optional().describe(D.Treasury_Deposit),
    receive: z.union([
        z.object({
            received_objects: z.array(GetMarkNameSchema('Treasury_ReceivedObject')),
        }),
        z.literal('recently').describe(D.Treasury_Receive_Recently)
    ]).describe(D.Treasury_Receive),
    withdraw: TreasuryWithdrawParamSchema,
    
    description: z.string().optional().describe(D.ObjectDes_Description),
    deposit_guard: GetMarkNameSchema('Guard').optional(),
    withdraw_guard: z.union([
        z.object({
            op:z.union([z.literal('add'), z.literal('set')]),
            data: z.array(z.object({
                guard: GetMarkNameSchema('Guard'),
                amount: TokenBalanceSchema
            }).describe(D.Treasury_WithdrawGuard))
        }).describe(D.Treasury_WithdrawGuard_Add),
        z.object({
            op:z.literal('remove'),
            guards: z.array(GetMarkNameSchema('Guard'))
        }).describe(D.Treasury_WithdrawGuard_Remove),
        z.object({
            op:z.literal('removeall'),
        }).describe(D.Treasury_WithdrawGuard_Removeall)
    ]).optional().describe(D.Treasury_WithdrawGuard_Description),
    withdraw_mode:z.union([
        z.literal(WOWOK.Treasury_WithdrawMode.PERMISSION),
        z.literal(WOWOK.Treasury_WithdrawMode.GUARD_ONLY_AND_IMMUTABLE),
        z.literal(WOWOK.Treasury_WithdrawMode.BOTH_PERMISSION_AND_GUARD)
    ]).describe(D.Treasury_WithdrawMode),
}).describe(D.GetObjectDataDescription('Treasury')); 

const ServiceWithdrawSchema = PayParamSchema.extend({
    withdraw_guard: GetMarkNameSchema('Guard')
});

export const CallServiceDataSchema = z.object({
    object: ObjectTypedMainSchema,
    order_new:z.object({
        buy_items: z.array(z.object({
            item: z.string().nonempty().describe(D.BuyItem_Name),
            max_price: TokenBalanceSchema.describe(D.BuyItem_MaxPrice),
            count: z.union([z.string(), z.number().int().min(0)]).describe(D.BuyItem_Count),
        })).describe(D.Order_BuyItem),
        discount_object: GetMarkNameSchema('Discount').optional(),
        customer_info_required: z.string().nonempty().optional().describe(D.Order_Customer),
        namedNewOrder:GetNamedObjectSchema('Order').optional(),
        namedNewProgress: GetNamedObjectSchema('Progress').optional()
    }).optional().describe(D.Service_Order_New),
    order_agent: z.object({
        order: OptionOrderObjectSchema,
        agents: z.array(AccountOrMarkNameSchema),
    }).optional().describe(D.Service_Order_Agent),
    order_required_info: z.object({
        order: GetMarkNameSchema('Order'),
        customer_info_required: z.string().nonempty().optional(),
    }).optional().describe(D.Service_Order_Customer),
    order_refund: z.union([
        z.object({
                order: GetMarkNameSchema('Order'),
                arb: GetMarkNameSchema('Arb')
            }).describe(D.Order_Refund_Arb), 
        z.object({
            order: GetMarkNameSchema('Order'),
            refund_guard: GetMarkNameSchema('Guard'),
        }).describe(D.Order_Refund_Guard), 
    ]).optional().describe(D.Service_Order_Refund),
    order_withdrawl: z.object({
        order: GetMarkNameSchema('Order'),
        data: ServiceWithdrawSchema,
    }).optional().describe(D.Service_Order_Withdraw),
    order_payer: z.object({
        order: OptionOrderObjectSchema,
        payer_new: AccountOrMarkNameSchema,
    }).optional().describe(D.Service_Order_Payer),

    description: z.string().optional().describe(D.ObjectDes_Description),
    endpoint: z.string().optional().describe(D.Service_Endpoint),
    payee_treasury: ObjectParamSchema('Treasury').optional(),
    gen_discount: z.array(z.object({
        receiver: AccountOrMarkNameSchema,
        count: z.number().int().min(1).default(1).describe(D.Discount_Count),
        discount: z.object({
            name: z.string().default('').describe(D.Discount_Name),
            type: z.union([
                z.literal(WOWOK.Service_Discount_Type.ratio),
                z.literal(WOWOK.Service_Discount_Type.minus),
            ]).describe(D.Discount_Type),
            off: z.number().int().min(0).describe(D.Discount_Off),
            duration_minutes: z.number().int().min(1).default(30*24*60).describe(D.Discount_Duration),
            time_start: z.number().int().optional().describe(D.Discount_TimeStart),
            price_greater: z.union([z.number().int().min(0), z.string()]).optional().describe(D.Discount_PriceGreater)
        })
    })).optional().describe(D.Service_Discount),
    repository: ObjectsOperationSchema('Repository').optional().describe(D.Service_Repository),
    extern_withdraw_treasury: ObjectsOperationSchema('Treasury').optional().describe(D.Service_ExternTreasury),
    machine: GetMarkNameSchema('Machine').optional(),
    arbitration: ObjectsOperationSchema('Arbitration').optional().describe(D.Service_Arbitration),
    customer_required_info: z.object({
        pubkey: z.string().nonempty().describe('The public key for encrypting the order information.'),
        required_info: z.array(z.union([
            z.literal(WOWOK.BuyRequiredEnum.address).describe('User address'),
            z.literal(WOWOK.BuyRequiredEnum.phone).describe('The phone number of the user'),
            z.literal(WOWOK.BuyRequiredEnum.postcode).describe("The postcode of the user's address"),
            z.literal(WOWOK.BuyRequiredEnum.name).describe('User name'),
            z.string().nonempty().describe('Other user information'),
        ])).describe('The type of user information to be encrypted')
    }).optional().describe(''),
    sales: z.union([
        z.object({
            op:z.literal('add'),
            sales: z.array(z.object({
                item: z.string().nonempty().describe('Goods name'),
                price: z.union([z.string(), z.number().int().min(0)]).describe('Goods price'),
                stock: z.union([z.string(), z.number().int().min(0)]).describe('Goods stock'),
                endpoint: z.string().nonempty().optional().describe('Goods endpoint')
            }).describe('Goods infomation'))
        }).describe('Shelf goods to sell'),
        z.object({
            op:z.literal('remove'),
            sales_name: z.array(z.string().nonempty().describe('Goods name'))
        }).describe('Remove goods')
    ]).optional().describe('Manage the sale of goods'),
    withdraw_guard:GuardPercentSchema.optional().describe('Management withdraw guards.'),
    refund_guard: GuardPercentSchema.optional().describe('Management refund guards.'),
    bPublished:z.boolean().optional().describe('Publish the Service object. ' + 
        'If True, The Service object will allow its Order object to be created, and data such as the Machine, Withdraw guards, Refund guards, etc. cannot be changed again. If False, it is ignored.'),
    buy_guard: GetMarkNameSchema('Guard').optional().describe(D.Buy_Guard),
    bPaused:z.boolean().optional().describe(D.Service_bPaused),
    clone_new: z.object({
        token_type_new: z.string().optional().describe(D.Clone_Type),
        namedNew:GetNamedObjectSchema('Service').optional()
    }).optional().describe(D.Service_Clone),
}).describe(D.GetObjectDataDescription('Service')); 

export const CallPersonalDataSchema = z.object({
    information: z.object({
        name: z.string().describe('name'),
        description: z.string().optional().describe('introductions'),
        avatar: z.string().optional().describe('avatar URL'),
        twitter: z.string().optional().describe('twitter'),
        discord: z.string().optional().describe('discord'),
        homepage: z.string().optional().describe('homepage URL'),
    }).optional().describe(D.Personal_Info),
    mark: z.union([
        z.object({
            op: z.literal('add'),
            data: z.array(z.object({
                address: AccountOrMarkNameSchema,
                name: z.string().optional().describe(D.Mark_Name),
                tags: z.array(z.string().nonempty()).optional().describe(D.Mark_Tags)
            }))
        }).describe(D.Mark_Add),
        z.object({
            op: z.literal('remove'),
            data: z.array(z.object({
                address: AccountOrMarkNameSchema,
                tags: z.array(z.string().nonempty()).optional().describe(D.Mark_Tags)
            }))
        }).describe(D.Mark_Remove),
        z.object({
            op: z.literal('removeall'),
            addresses: z.array(AccountOrMarkNameSchema)
        }).describe(D.Mark_Removeall),
        z.object({
            op: z.literal('transfer'),
            to: AccountOrMarkNameSchema
        }).describe(D.Mark_Transfer),
        z.object({
            op: z.literal('replace'),
            mark_object: GetMarkNameSchema('PersonalMark')
        }).describe(D.Mark_Replace),
        z.object({
            op: z.literal('destroy'),
        }).describe(D.Mark_Destroy),
    ]).optional().describe(D.Personal_Mark),
}).describe(D.GetObjectDataDescription('on-chain Personal')); 

export const CallObjectPermissionDataSchema = z.object({
    objects: z.array(GetMarkNameSchema()),
    new_permission: GetMarkNameSchema('Permission')
}).describe(D.ObjectPermissionChange);

export const GuardWitness = z.object({
    guards: z.array(GetMarkNameSchema('Guard')),
    witness: z.array(z.object({
        guard: GetMarkNameSchema('Guard'),
        witness: z.any().describe(D.Witness_Value),
        cmd: z.array(z.number().int().min(1)).describe(D.Witness_Cmd),
        cited: z.number().describe(D.Witness_Cited),
        type: ValueTypeSchema,
        identifier: GuardIndentifierSchema.describe(D.Guard_Table_Id),
    })).describe('All the witnesses.')
})

export const AccountSchema = z.string().optional().nullable().describe('The account name or address that initiated the operation.');
export const WitnessSchema = GuardWitness.optional().nullable().describe('If Guard sets witness data, it needs to be provided immediately by the transaction signer when Guard is verified.');

export const CallDemandSchemaDescription = `Describes operations to create or modify an on-chain Demand object using the 'account' field to sign transactions and the 'data' field to define object details. 
The Demand object enables its manager to publish service-seeking demands, declare, and grant rewards to satisfactory service referrers. 
It supports transaction models like C2B or C2C, where managers can dynamically update/refine demands, and referrers can adjust Services and their supply chain commitments to better fulfill personalized requirements. 
Demand administrators control permissions for different operations through a Permission object. and may set up a Guard object to enforce threshold verification requirements for service referrers.`; 
export const CallDemandSchema = z.object({
    data:CallDemandDataSchema,
    account: AccountSchema,
    witness: WitnessSchema,
});
export const CallDemandSchemaInput = () => {
    return zodToJsonSchema(CallDemandSchema);
}

export const CallRepositorySchemaDescription = `Describes operations to create or modify an on-chain Repository object using the 'account' field to sign transactions and the 'data' field to define object details. 
The Repository object enables its manager to declare and manage an on-chain database through consensus names and their independent permission settings, with data retrieval and management based on both address and consensus name. 
Repositories are widely used for on-chain data maintenance and utilization, such as: a named Repository providing medical data for different patients (addresses) and injury conditions (consensus names) to validate insurance claim conditions; 
a named Repository offering hourly(with time converted to addresses) diving recommendations (consensus names) for Maldives city to support travel service providers in force majeure service disclaimers; and various data oracles. 
Repository administrators control permissions for different operations through a Permission object. and may individually set Policies for specific consensus names (including independent write permissions, declarations of consensus content, and data usage rules).`;
export const CallRepositorySchema = z.object({
    data:CallRepositoryDataSchema,
    account: AccountSchema,
    witness: WitnessSchema,
});
export const CallRepositorySchemaInput = () => {
    return zodToJsonSchema(CallRepositorySchema);
}

export const CallMachineSchemaDescription = `Describes operations to create or modify an on-chain Machine object, where the 'account' field is used to sign transactions and the 'data' field defines object details. 
The Machine object enables its manager to orchestrate collaborative workflows, manage permissions, and validate deliverables on-chain. It achieves reusable workflow execution through the generation of distinct instances (Progress objects), such as service processes for e-commerce orders. Core functionalities include:
- Workflow Orchestration : Defines multi-stage collaborative workflows (e.g., Requirement Confirmation → Development → Testing → Acceptance) with parallel or sequential execution, specifying step order and trigger conditions to support complex collaboration scenarios.
- Permission Management : Assigns granular operational permissions to collaborators (e.g., only service providers can execute development steps; only purchasers can approve acceptance steps), and sets namespace-specific permissions for different workflow instances (Progress objects) (e.g., distinct delivery personnel for different Progress objects).
- Delivery Validation : Implements automatic validation rules via Guard objects (e.g., verifying updates to the latest data in a named Repository or confirming purchase order fulfillment as committed).
Machine administrators control permissions for different operations through Permission objects and can configure namespaces to provide unified permission operation spaces for different instances (Progress objects). Once published, the workflow orchestration and delivery validation rules of a Machine object become immutable. To enhance a Machine, a new Machine object can be generated and modified via the Clone method.`;
export const CallMachineSchema = z.object({
    data:CallMachineDataSchema,
    account: AccountSchema,
    witness: WitnessSchema,
});
export const CallMachineSchemaInput = () => {
    return zodToJsonSchema(CallMachineSchema);
}

export const CallServiceSchemaDescription = `Describes operations to create or modify an on-chain Service object, where the 'account' field is used to sign transactions and the 'data' field defines object details. 
The Service object enables its managers to publish purchasable services on-chain, including setting product/service descriptions, prices, inventory, service workflows (Machine object), withdrawal guard rules (Withdraw Guard objects), refund guard rules (Refund Guard objects), dispute commitments (Arbitration objects), the conditions for the purchaser (Buy Guard object), incentives/rewards (Treasury objects), information service endpoints (Endpoint), and encryption of sensitive information.
Upon successful payment by the purchaser, a new Order object is generated, granting the purchaser all rights committed by the Service to the Order, including:
- Service Workflow : Full transparency of all service and delivery processes prior to purchase.
- Breach Arbitration : In case of order disputes, the Order owner can apply for arbitration and compensation claims through these Arbitration objects, with arbitration results and compensation requirements executed automatically.
- Refund Commitment : Pre-purchase review of refund/withdrawal processes and terms to ensure alignment with purchaser needs.
- Incentive Rewards : Pre-purchase review of incentives/rewards obtainable when Guard conditions are met.
- Privacy Protection : On-chain encryption of purchaser's sensitive data or submission via the service provider's Endpoint.
Service administrators control permissions for different operations through a Permission object.
Once published, the Service object's service workflows, Guard objects, and other configurations become immutable. To adjust services, a new Service object must be created and configured via the Clone method. A Service can be paused to stop generating new orders, though commitments to existing orders remain unaffected.`;
export const CallServiceSchema = z.object({
    data:CallServiceDataSchema,
    account: AccountSchema,
    witness: WitnessSchema,
});
export const CallServiceSchemaInput = () => {
    return zodToJsonSchema(CallServiceSchema);
}

export const CallTreasurySchemaDescription = `Describes operations to create or modify an on-chain Treasury object, where the 'account' field is used to sign transactions and the 'data' field defines object details. The Treasury object enables its administrators to manage a specific token's funds on-chain, including operations such as depositing, withdrawing, receiving funds, and setting memos/purposes for fund flows (e.g., allocating compensation payments from the treasury as a verification condition for collaborative workflows, such as after a courier loses a package, leveraging Guard objects to seamlessly integrate business processes).
Treasury administrators control permissions for different operations through a Permission object. For withdrawal operations, distinct verification conditions (Guard objects) can be set to allow withdrawals of varying amounts, providing flexible and rapid withdrawal channels for external operators (e.g., airdrops or order incentives).`
export const CallTreasurySchema = z.object({
    data:CallTreasuryDataSchema,
    account: AccountSchema,
    witness: WitnessSchema,
});

export const CallTreasurySchemaInput = () => {
    return zodToJsonSchema(CallTreasurySchema);
}

export const CallPermissionSchemaDescription = `Describes operations to create or modify an on-chain Permission object, where the 'account' field is used to sign transactions and the 'data' field defines object details. 
The Permission object enables its administrators to set distinct operational permissions (including built-in permissions and custom permissions) and additional verification conditions (Guard object) for different addresses on-chain. For example, assigning Permission No. 123 (a built-in permission for cloning Service objects) to address 0x1234 allows that address to initiate clone operations across all Service objects that accept this Permission object.
In the Wowok protocol, objects of types such as Demand, Repository, Treasury, Service, Machine, and Arbitration include a 'permission' field that specifies the accepted Permission object. This enables addresses and permissions defined by the linked Permission object to perform operations on these target objects.`; 
export const CallPermissionSchema = z.object({
    data:CallPermissionDataSchema,
    account: AccountSchema,
    witness: WitnessSchema,
});
export const CallPermissionSchemaInput = () => {
    return zodToJsonSchema(CallPermissionSchema);
}

export const CallArbitrationSchemaDescription = `Describes operations to create or modify an on-chain Arbitration object, where the 'account' field is used to sign transactions and the 'data' field defines object details. 
The Arbitration object enables its managers to provide dispute arbitration for orders on-chain. It facilitates named voting based on descriptions and claims of the dispute object (Arb object) to determine the compensation amount for the order owner. If a Service object declares and accepts this Arbitration object, its arbitration results and compensation requirements will be automatically executed.
When an order owner encounters a dispute with an order, they can initiate arbitration by selecting the Arbitration objects accepted by their Service object, resulting in the generation of a new Arb object.
Arbitration administrators control permissions for different operations through a Permission object.`;
export const CallArbitrationSchema = z.object({
    data:CallArbitrationDataSchema,
    account: AccountSchema,
    witness: WitnessSchema,
});
export const CallArbitrationSchemaInput = () => {
    return zodToJsonSchema(CallArbitrationSchema);
}

export const CallPersonalSchemaDescription = `Describes operations to create or modify on-chain personal information(including name, avatar, website, social media accounts, etc.) , and on-chain address favorites (such as naming, tagging, and favoriting addresses to facilitate easier management of these addresses and objects), where the 'account' field is used to sign transactions and the 'data' field defines object details.`;
export const CallPersonalSchema = z.object({
    data:CallPersonalDataSchema,
    account: AccountSchema,
});
export const CallPersonalSchemaInput = () => {
    return zodToJsonSchema(CallPersonalSchema);
}

export const CallGuardSchemaDescription = `Describes operations to create or modify an on-chain Arbitration object, where the 'account' field is used to sign transactions and the 'data' field defines object details. 
Guard object is immutable once created. A Guard object is designed to define a set of verification conditions that yield a final boolean result (True or False). 
These conditions include querying on-chain object data (e.g., verifying if an order owner is 0x1234, or if 100 SUI tokens were paid from a specific Treasury object to 0x1234 and an order(owned by 0x1234) of a Service object  has reached the 'express loss verification' process node), validating Witness data provided by the signer (e.g., the provided order address must belong to a certain Service object, and the order owner must be the actual transaction signer), and performing mathematical/logical operations on numerical values. 
Due to its immutability, the Guard object is widely used as a pre-validation requirement for critical operations (e.g., placing an order for a Service object or withdrawing funds from a Treasury object). Additionally, Guard objects can be integrated with Permission object's operation validation: an operation is only executed if both the permission requirements and the Guard verification are satisfied.`;
export const CallGuardSchema = z.object({
    data:CallGuardDataSchema,
    account: AccountSchema,
});
export const CallGuardSchemaInput = () => {
    return zodToJsonSchema(CallGuardSchema);
}

export const CallObejctPermissionSchemaDescription = `Enables the use of the account field to sign transactions and leverages the data field to batch replace the permission management objects for objects of types including Machine, Service, Repository, Treasury, Arbitration, and Demand on-chain. 
This operation facilitates centralized access control by managing the assignment of operation permissions (both built-in and custom) for these objects through the Permission object. 
For the operation to succeed, the transaction signer must be the owner of the original Permission objects associated with these target objects.`; 
export const CallObejctPermissionSchema = z.object({
    data:CallObjectPermissionDataSchema,
    account: AccountSchema,
    witness: WitnessSchema,
});

export const CallObejctPermissionSchemaInput = () => {
    return zodToJsonSchema(CallObejctPermissionSchema);
}
/*
export const OperateSchemaDescription = `Operations on wowok protocol include two categories: 
### Local operations (do not require local account signatures) and management of:
1. local private information (e.g., addresses, phone numbers); 
2. local names and tags for addresses.
3. local accounts.

### On-chain operations (require local account cryptographic signatures)
1. Supported entities include: Demand, Repository, Machine, Service, Treasury, Arbitration, Personal, Guard, and Permission. Each entity has its own specific operation schema, allowing for granular control over various aspects of the protocol's functionality.
2. Permission management (including replacement and transfer) for on-chain entity objects (Demand, Machine, Repository, Service, Arbitration, Treasury) by setting their \`permission\` attribute (which specifies the associated Permission object).`
export const OperateSchema = z.object({
    call: z.union([
        CallPermissionSchema,
        LocalMarkOperationSchema
    ])
})*/