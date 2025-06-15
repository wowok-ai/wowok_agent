
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

const PermissioIndexArray = WOWOK.PermissionInfo.filter(i => i.index !== WOWOK.PermissionIndex.user_defined_start)
    .map(v => z.literal(v.index).describe(`${v.module}.${v.name}`));

const GetPermissionIndexSchema = (type:'built-in' | 'biz' | 'all'='all') : z.ZodTypeAny => {
    if(type === 'built-in'){
        return z.union([PermissioIndexArray[0], PermissioIndexArray[1], ...PermissioIndexArray.slice(2)]).describe(D.PermissionIndexSchema_Buildin_Description);
    }else if(type === 'biz'){
        return z.number().int().min(WOWOK.PermissionIndex.user_defined_start).describe(D.PermissionIndexSchema_Biz_Description);
    } else {
        return z.union([z.literal(WOWOK.PermissionIndex.user_defined_start), z.number().int().min(WOWOK.PermissionIndex.user_defined_start+1), ...PermissioIndexArray]).describe(D.PermissionIndexSchema_Description);
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

export const CallDemandSchemaDescription = `Operate the on-chain Demand object using the local account signatures.
The Demand object is an on-chain service requirement manager, enabling users to publish, modify, or cancel service demands via local account signatures. Core functions include defining demand types (e.g., logistics, medical consultation), setting parameters (e.g., location, symptom details), specifying execution conditions, tracking status, and assigning rewards to preferred service referrers.
Scenarios :
- Logistics : A user publishes a logistics demand with pickup/dropoff details, and sets a reward for referrers who recommend qualified delivery companies.
- Medical Consultation : A patient creates a demand for specialist consultation, including rewards for referrers who suggest verified clinics.
Key Details :
- Operated via local account signatures to ensure ownership.
- Structured fields (type, parameters, deadline, status) enable automated service matching.
- Supports lifecycle management (update, fulfill) and reward assignment to incentivize quality referrals.`; 
export const CallDemandSchema = z.object({
    name: z.literal('demand'),
    data:CallDemandDataSchema,
    account: AccountSchema,
    witness: WitnessSchema,
});
export const CallDemandSchemaInput = () => {
    return zodToJsonSchema(CallDemandSchema);
}

export const CallRepositorySchemaDescription = `Operate the on-chain Repository object using the local account signatures.
The Repository serves as an on-chain data warehouse, storing and managing consensus data items retrievable and maintained via a dual identifier system: an address (physical locator) and a policy (semantic name defined by multi-party consensus). It can be referenced by Guards for data validation—e.g., verifying an address's medical data in a named medical Repository to release insurance payouts from a Treasury, or using daily weather data from a named weather Repository to adjust service workflows (e.g., sport recommendations). Permissions can be flexibly configured per policy to enhance data comprehension, adoption, and maintenance.`;
export const CallRepositorySchema = z.object({
    name: z.literal('repository'),
    data:CallRepositoryDataSchema,
    account: AccountSchema,
    witness: WitnessSchema,
});
export const CallRepositorySchemaInput = () => {
    return zodToJsonSchema(CallRepositorySchema);
}

export const CallMachineSchemaDescription = `Operate the on-chain Machine object using the local account signatures. 
    The Machine object is a core workflow management entity in the wowok protocol, designed to enable multi-user collaboration by providing three key capabilities: 
    1. **Process Orchestration**: Define multi-stage service execution flows (e.g., requirement confirmation → development → testing → acceptance) with clear step sequences and triggers, ensuring collaborative tasks proceed in a structured manner. 
    2. **Permission Governance**: Assign granular operation permissions to participating roles (e.g., only service providers can execute development steps; only purchasers can approve acceptance steps), preventing unauthorized modifications to the workflow. 
    3. **Delivery Verification**: Configure automatic validation rules via Guard conditions (e.g., verifying that deliverable hashes match predefined values or that timestamps meet deadlines), ensuring objective assessment of task completion. 
    When integrated with Service objects, Machine enforces binding constraints on service providers and payers: service providers define the collaborative process, permissions, and verification rules in the Machine when publishing services. Once a purchaser places an order, these rules are immutably recorded on-chain, ensuring both parties' commitments are enforced programmatically without arbitrary changes, thereby maintaining trust in service execution.`;
export const CallMachineSchema = z.object({
    name: z.literal('machine'),
    data:CallMachineDataSchema,
    account: AccountSchema,
    witness: WitnessSchema,
});
export const CallMachineSchemaInput = () => {
    return zodToJsonSchema(CallMachineSchema);
}

export const CallServiceSchemaDescription = `Operate the on-chain Service object using the local account signatures.
    Service Object enables service providers to:
        Provide products/services (including descriptions, interfaces, pricing, inventory, etc.),
        Define service processes,
        Specify arbitration commitments,
        Establish payment collection and refund commitments,
        Configure order incentives/rewards,
        Set purchaser requirements, etc..
        And the Process and delivery commitments cannot be arbitrarily modified post-purchase. 
        Through the Service Object, a purchaser's procurement and payment for services triggers the creation of a new Order instance, where the Order entity is contractually vested with the corresponding service entitlements.`;
export const CallServiceSchema = z.object({
    name: z.literal('service'),
    data:CallServiceDataSchema,
    account: AccountSchema,
    witness: WitnessSchema,
});
export const CallServiceSchemaInput = () => {
    return zodToJsonSchema(CallServiceSchema);
}

export const CallTreasurySchemaDescription = `Operate the on-chain Treasury object using the local account signatures. The Treasury object serves as a centralized fund management hub for wowok protocol, supporting multi-scenario financial operations including service incentives distribution, dispute compensation execution, and operational reward disbursement.
- **Service Reward Mode**: Automatically disburses predefined incentives to service providers via smart contract triggers upon successful completion of service orders (e.g., e-commerce transaction fulfillment, travel service delivery).
- **Dispute Compensation Mode**: Executes compensation payments to order payers based on valid Arbitration results, ensuring timely fund transfer as ruled by the arbitration panel within 24 hours of result confirmation.
- **Operational Reward Mode**: Provides Guard-based fund withdrawal mechanisms for different operational personnel, with predefined withdrawal limits. For example, after completing a computational task, if the submitted result data meets the on-chain verification requirements (via Guard conditions), the operator can withdraw a designated reward amount up to the set limit.

All operations (deposit, withdrawal, transfer) are governed by the associated Permission object, ensuring authorized access and compliant fund flows. All transaction records are permanently stored on-chain for full transparency.`
export const CallTreasurySchema = z.object({
    name: z.literal('treasury'),
    data:CallTreasuryDataSchema,
    account: AccountSchema,
    witness: WitnessSchema,
});

export const CallTreasurySchemaInput = () => {
    return zodToJsonSchema(CallTreasurySchema);
}

export const CallPermissionSchemaDescription = `Operate the on-chain Permission object using the local account signatures. The Permission object is designed to manage access control for core wowok protocol entities (e.g., Machine, Service, Repository, Treasury). It defines granular operation permissions (e.g., read, write, management) for specific entities or addresses, ensuring only authorized subjects can perform designated actions on the associated on-chain objects (such as data modification, fund transfer, or configuration updates). This mechanism safeguards the security and compliance of protocol resource operations.`
export const CallPermissionSchema = z.object({
    name: z.literal('permission'),
    data:CallPermissionDataSchema,
    account: AccountSchema,
    witness: WitnessSchema,
});
export const CallPermissionSchemaInput = () => {
    return zodToJsonSchema(CallPermissionSchema);
}

export const CallArbitrationSchemaDescription = `Operate the on-chain Arbitration object using the local account signatures. 
The Arbitration object is designed to handle order disputes, particularly those involving off-chain data, evidence, and proofs. A public arbitration panel reviews the dispute, votes, and determines the compensation amount. If the order's Service object declares support for this Arbitration, the determined compensation amount allows the order payer to immediately withdraw funds from the order.
The arbitration process and results are stored as on-chain data, which may be referenced as Guard conditions to grant the order payer additional rights, such as obtaining additional incentives or compensation commitments from the Treasury for the Service.`;
export const CallArbitrationSchema = z.object({
    name: z.literal('arbitration'),
    data:CallArbitrationDataSchema,
    account: AccountSchema,
    witness: WitnessSchema,
});
export const CallArbitrationSchemaInput = () => {
    return zodToJsonSchema(CallArbitrationSchema);
}

export const CallPersonalSchemaDescription = `Operate the on-chain Personal object using local account signatures, including managing public personal information (e.g., avatar URL, personal homepage address, social media accounts like Twitter/Discord, personal introduction) and named tags for addresses/wowok entity objects. The tag management facilitates self/others to understand and manage these addresses/entities, and supports operations such as liking (favoriting) or disliking specific addresses/entity objects.`;
export const CallPersonalSchema = z.object({
    name: z.literal('personal'),
    data:CallPersonalDataSchema,
    account: AccountSchema,
});
export const CallPersonalSchemaInput = () => {
    return zodToJsonSchema(CallPersonalSchema);
}

export const CallGuardSchemaDescription = `Generate the on-chain Guard object using local account signatures. Guard is designed for conditional verification before critical on-chain operations (e.g., time-based triggers or process completion checks), leveraging Wowok's tools for querying/verifying on-chain data (including entity object content, table data, and oracle inputs).
Distinct from Permission, Guard provides finer-grained and more flexible permission validation. Once generated, its verification logic is immutable and publicly auditable, enabling reuse across various Wowok object operations.
During transaction submission requiring Guard verification, validation executes directly within the transaction using on-chain data or prover-provided evidence. Failed verification aborts the transaction; success allows execution.`;
export const CallGuardSchema = z.object({
    name: z.literal('guard'),
    data:CallGuardDataSchema,
    account: AccountSchema,
});
export const CallGuardSchemaInput = () => {
    return zodToJsonSchema(CallGuardSchema);
}

export const CallObejctPermissionSchemaDescription = `Batch replace on-chain Permission objects for core wowok protocol entities (Machine, Service, Repository, Treasury, Arbitration, Demand) using local account cryptographic signatures. This operation facilitates centralized access control management by replacing existing Permission objects with new ones, which define granular access rules (e.g., read/write permissions, operation authorizations) for these entity types. Transaction validity requires signers to be the original owners of the target Permission objects, ensuring alignment with wowok protocol's ownership verification mechanism.`; 
export const CallObejctPermissionSchema = z.object({
    name: z.literal('object_permission'),
    data:CallObjectPermissionDataSchema,
    account: AccountSchema,
    witness: WitnessSchema,
});

export const CallObejctPermissionSchemaInput = () => {
    return zodToJsonSchema(CallObejctPermissionSchema);
}

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
})