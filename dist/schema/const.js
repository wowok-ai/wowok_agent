import * as WOWOK from 'wowok';
export const MarkName_Address_Description = (object = '') => {
    return `The name(address can be retrieved via local Mark by name) or address of the ${object} object`;
};
export const ObjectExisted_Description = (object = '') => {
    return `Perform an operation on an existing ${object} object (by specifying its name or its address)`;
};
export const NamedObjectSchema_Description = (object = '') => {
    return `Names the new on-chain ${object} object address via local mark (device-private) for easier future reference and operations`;
};
export const ObjectNewDescription = (object = '') => {
    return `Creating a new on-chain ${object} object`;
};
export const GetObjectDataDescription = (object = '') => {
    if (object === 'Guard') {
        return `Data definition for creating a new on-chain Guard object. Once the Guard object is successfully created, it cannot be modified again`;
    }
    return `Data definition that operates on the on-chain ${object} object. The operations are performed one after the other in the field order.`;
};
export const ObjectParamSchema_Description = (object = '') => {
    return `On-chain ${object} object for operation: existing (via address or name) or new (named)`;
};
export const AccountName_Address_Description = `Account name(address can be retrieved via local Account) or address`;
export const AccountOrMarkNameSchema_Description = `name or address -> address`;
export const PermissionIndexSchema_Buildin_Description = 'built-in permission index';
export const PermissionIndexSchema_Biz_Description = 'Biz permission index(must >=1000)';
export const PermissionIndexSchema_Description = `${PermissionIndexSchema_Buildin_Description} or ${PermissionIndexSchema_Biz_Description}`;
export const useAddressIfNameExist_Description = `In case of naming conflict: prioritize address as identifier (true); use name and rename original to address (false)`;
export const onChain_Description = `If true, the name and tags of the object will be made visible on-chain`;
export const OnchainDescription_Description = `Description content for newly created on-chain wowok object`;
export const Type_Description = `Generic type for the on-chain object (e.g., specify payment token type '0x2::sui::SUI'); 
    If creating a new Demand object, this parameter must be of the NFT or Coin type, such as '0x2::coin::Coin<0x2::sui::SUI>', and the token type (0x2::sui::SUI) cannot be used. 
    Else, this parameter must be of the Token type, such as '0x2::sui::SUI', and the Coin type cannot be used.`;
export const ValueType_Description = `Data types of the Wowok protocol.
    100: Bool, 101: Address, 102: U8, 103: U64, 104: Vec<U8>, 105: U128,
    106:Vec<Address>, 107: Vec<Bool>, 108: Vec<Vec<U8>>, 
    109:Vec<U64>, 110: Vec<U128>, 111: Option<Address>, 112: Option<Bool>,
    113:Option<U8>, 114: Option<U64>, 115: Option<U128>,
    116:Option<256>, 117: Option<String>, 118:Option<Vec<U8>>,
    119:Vec<U256>, 120: String, 121: Vec<String>, 122: U256`;
export const Balance_Description = `The number of tokens`;
export const Objects_Description = `on-chain objects to be operated on`;
export const SetList_Description = 'Set, remove, or add objects to the list';
export const RemoveallList_Description = 'Remove all objects from the list';
export const Permission_Description = `Operation permissions for the new object (managed by Permission Object)`;
export const Identifier_Description = `Data from the Guard table corresponding to the identifier`;
export const ObjectIdentifier_Description = 'Object address corresponding to the identifier in the Guard table';
export const ObjectQuery_Description = 'Object to query';
export const QueryId_Description = `Guard query by the ID specified`;
export const QueryName_Description = 'Guard query by the Module and function Name specified';
export const GuardNodeParams_Description = `Query parameters are sourced from their respective child nodes, with child node return types matching the parameter data types`;
export const GuardQuery_Description = 'Data from querying the on-chain object';
export const GuardLogic_Description = `Logical operators for parameters`;
export const GuardNodeLogicParams_Description = `Array of child nodes used as parameters. Return type requirements: Unsigned Integer ops (>, >=, <, <=, =) require U8/U64/U128/U256; Logic ops (And, Or, Not) require Bool; "Has Sub String" requires String.')`;
export const GuardNodeLogic_Description = `Data from logic operations on data returned by child nodes. Logical operations compute with each child node's result, combining via AND to yield final True/False.`;
export const GuardCalcAdd_Description = `'+':The accumulated sum of values returned by all child nodes, serving as the return value of this node`;
export const GuardCalcDevide_Description = `'/':The value returned by the first child node is successively divided by the values returned by other child nodes, with the result serving as the return value of this node.`;
export const GuardCalcMod_Description = `'%':The value returned by the first child node is successively modulo by the values returned by other child nodes, with the result serving as the return value of this node`;
export const GuardCalcAddress_Description = `Convert the numeric value returned by the child node to an on-chain address`;
export const GuardCalcMultiply_Description = `'*':The value returned by the first child node is successively multiplied by the values returned by other child nodes, with the result serving as the return value of this node`;
export const GuardCalcSubtract_Description = `'-':The value returned by the first child node is successively subtracted by the values returned by other child nodes, with the result serving as the return value of this node`;
export const GuardNodeCalc_Description = `Data from mathematical operations on data returned by child nodes`;
export const GuardNodeValue_Description = `Data from value with its type specified in the value_type field`;
export const GuardContextSigner_Description = `Address of the signer of the current transaction.Type is ${WOWOK.ValueType.TYPE_ADDRESS} `;
export const GuardContextClock_Description = `On-chain time of the current transaction. Type is ${WOWOK.ValueType.TYPE_U64} `;
export const GuardContextGuard_Description = `The Guard address to which the condition belongs is currently being verified.Type is ${WOWOK.ValueType.TYPE_ADDRESS} `;
export const GuardNodeContext_Description = `Data from current transaction context`;
export const GuardNode_Description = `Guard's data node`;
export const TYPE_LOGIC_AS_U256_GREATER_Description = `The return value of the first child node is greater than the return values of other child nodes: True; otherwise, False`;
export const TYPE_LOGIC_AS_U256_GREATER_EQUAL_Description = `The return value of the first child node is greater than or equal to the return values of other child nodes: True; otherwise, False`;
export const TYPE_LOGIC_AS_U256_LESSER_Description = `The return value of the first child node is less than the return values of other child nodes: True; otherwise, False`;
export const TYPE_LOGIC_AS_U256_LESSER_EQUAL_Description = `The return value of the first child node is less than or equal to the return values of other child nodes: True; otherwise, False`;
export const TYPE_LOGIC_AS_U256_EQUAL_Description = `The return value of the first child node is numerically equal to the return values of other child nodes: True; otherwise, False`;
export const TYPE_LOGIC_EQUAL_Description = `The return value of the first child node is exactly equal to (including data type) the return values of other child nodes: True; otherwise, False`;
export const TYPE_LOGIC_HAS_SUBSTRING_Description = `The string returned by the first child node contains the string returned by other child nodes: True; otherwise, False`;
export const TYPE_LOGIC_NOT_Description = `Logically negate the return value of the first child node`;
export const TYPE_LOGIC_AND_Description = `Perform an AND operation on the return values of each child node, and serve as the return value of this node`;
export const TYPE_LOGIC_OR_Description = `Perform an OR operation on the return values of each child node, and serve as the return value of this node`;
export const Forward_Name_Description = 'Uniquely identifies an operation between two ordered and identical nodes';
export const Forward_NamedOperator_Description = `The permission namespace name defined by Machine, used to specify independent address sets within the same workflow permissions of Machine's Progresses`;
export const Forward_Permission_Description = 'Machine allows addresses with this permission number within its Permission object to have operational permissions';
export const Threshold_Weight_Description = `If the sum of the operation weights completed between the two preceding and succeeding nodes exceeds the defined threshold, the Progress workflow will proceed to the subsequent node`;
export const Forward_Weight_Description = `The weight corresponding to completing this operation. ${Threshold_Weight_Description}`;
export const Forward_Guard_Description = `If defined, completing this operation also requires that the Guard verification is passed simultaneously`;
export const Forward_Supply_Object_Description = `The Service object for order procurement for this operation`;
export const Forward_Supply_bRequired_Description = 'If True, the purchase Order for this promised service must be provided';
export const Forward_Supplies_Description = `List of Service objects committed to order procurement. If defined, completing this operation must provide at least one Order for these Service objects`;
export const Forwards_Description = `List of all operation definitions from the previous node to this node`;
export const Pair_PriorNode_Description = 'A prior node name. the initial node name is ""';
export const Pair_Threshold_Description = `Threshold. ${Threshold_Weight_Description}`;
export const Pairs_Description = `List of all prior nodes that can travel to this node`;
export const Node_Name_Description = 'A node name';
export const ProgressOperation_Description = `Progress initiates a specified operation from the current node to the next node`;
export const ProgressOperation_Next_Description = 'The next node name';
export const ProgressOperation_Forward_Description = 'The name of the defined operation between the current node and the next node';
export const GuardPercent_Add_Description = `Add or set the list of Guard objects and their corresponding percent values`;
export const GuardPercent_Description = `Manages a list of Guard objects and their corresponding percent values`;
export const RepositoryValueType_Address = `address`;
export const RepositoryValueType_AddressVec = `address vector`;
export const RepositoryValueType_String = `string`;
export const RepositoryValueType_StringVec = `string vector`;
export const RepositoryValueType_Number = 'Unsigned integer';
export const RepositoryValueType_NumberVec = 'Unsigned integer vector';
export const RepositoryValueType_Bool = 'Boolean';
export const RepositoryValueType_Description = `The data types supported for storage by the Repository object. The first byte of each data entry represents its data type`;
export const ObjectDes_Description = 'Descriptions of the on-chain object, such as their depictions, functions, or purposes, etc';
export const ObjectDes_Location = 'Region, location or coordinates of the on-chain object, such as a physical address';
export const Demand_Present_Description = 'Recommend a Service object and recommendation words to the Demand. If the guard.service_id_in_guard of this Demand is defined, the recommended service address will be provided as a witness for service_id_in_guard during Guard verification';
export const Demand_Description_Description = 'Description of the Demand object';
export const Demand_Time_Expire_Description = 'The validity period for obtaining the recommended service reward. Once this period is successfully set, it can only be extended further and cannot be shortened';
export const Demand_Time_Expire_Op_Duration_Description = `lasts for the number of minutes set by the 'minutes' field from the current on-chain time`;
export const Demand_Time_Expire_Op_Unix_Description = `Lasts from the current on-chain time until the on-chain time set by the 'time' field expires`;
export const Demand_Bounty_Description = `Operations on the recommended service reward pool`;
export const Demand_Bounty_Add_Description = `Add a new reward Object. The Object type of this reward must conform to the generic type of Demand (which can be FT (0x2::coin::Coin<...>) or NFT) and must be owned by the signer's address of the transaction. If the operation is successful, the ownership of this Object will be transferred to the reward pool of Demand`;
export const Demand_Bounty_Add_Address_Description = `The object address owned by the current transaction signer, whose type must conform to the generic type of this Demand`;
export const Demand_Bounty_Add_Balance_Description = `If the generic type of Demand is 'FT', the amount of tokens to pay can be specified`;
export const Demand_Bounty_Reward_Description = `Send all Objects in the reward pool to the recommender of the Service object (specified by the 'service' field). This operation must meet the permission operation requirements of the Demand and be within the validity period of the reward pool`;
export const Demand_Bounty_Refund_Description = `Retrieve all Objects in the reward pool. This operation must meet the permission operation requirements of the Demand and be after exceeding the validity period of the reward pool`;
export const Demand_Guard_Description = `Set or unset the Guard (the 'guard' field specifies). If the operation is successful, anyone recommending a service to the Demand must simultaneously pass the Guard verification. If the 'service_id_in_guard' field is set, the recommended service address must be provided as the witness corresponding to service_id_in_guard during Guard verification`;
export const Guard_Root_Description = `Root data node`;
export const Guard_Table_Description = `Constant and Witness data items table`;
export const Guard_Table_Id = `Unique ID within the guard table`;
export const Guard_Table_bWitenss = `If True, the value of this data item is specified by the future transaction signer; otherwise, the value of this data item must be specified`;
export const Guard_Table_Type = `Data type of the value of this data item`;
export const Guard_Table_Value = `Value of the data item`;
export const OptionProgressObject_Description = `${MarkName_Address_Description('Progress')}.If undefined, reference and operate the newly created Progress object of this Machine object`;
export const OptionOrderObject_Description = `${MarkName_Address_Description('Order')}.If undefined, reference and operate the newly created Order object of this Service object`;
export const Progress_New_Description = `Create a new Progress object for the Machine object.
    If the Machine Object is not published, the creation fails.`;
export const Progress_Context_Description = `Set or unset the context repository for the Progress object`;
export const Progress_NamedOperator_Op_Description = `Operator addresses`;
export const Progress_NamedOperator_Description = `Set the operators for the permission namespace of the Progress object`;
export const Parent_SessionId = `A number in the parent Progress session list`;
export const Progress_Parent_Description = `Set the parent Progress object for the Progress object to determine its relationship graph`;
export const Progress_Hold_Description = `Set the Hold state of a current operation (only the address that completed the hold can continue to complete the operation) or Unhold state (any authorized address can hold or complete the operation)`;
export const Hold_bHold_Description = `If true, hold this operation; otherwise, unhold this operation`;
export const Hold_adminUnhold_Description = `If true, unhold this operation. This instruction must satisfy that the transaction signer has relevant permissions in the Machine permission object`;
export const Progress_Task_Description = `Set the task of Progress (e.g., order address). Each Progress can only be set once and cannot be canceled`;
export const Progress_Next_Description = `Complete an operation and submit deliverables (e.g., purchase orders)`;
export const Deliverble_Msg = `Operation remarks`;
export const Deliverble_Orders = `Completed purchase Order objects`;
export const Machine_Endpoint_Description = `HTTPS endpoint of the Machine object. It provides a view for the process operations of Progress, such as integrating complex operations like purchasing orders from suppliers`;
export const Machine_Repository_Description = `Set consensus Repository objects. Facilitates data sharing and collaboration`;
export const Machine_AddNode_Description = `Add or update Machine nodes`;
export const Machine_RemoveNode_Name = `Names of the nodes`;
export const Machine_RemoveNode_bTransferMyself = `Whether to send the removed node objects to the transaction signer's address`;
export const Machine_RemoveNode_Description = `Remove Machine nodes`;
export const Machine_RenameNode_Old = `The original name of the node`;
export const Machine_RenameNode_New = `The new name of the node; must be unique among existing nodes`;
export const Machine_RenameNode_Description = `Rename the nodes`;
export const Machine_AddFromSelf_Description = `Adds Node objects owned by the transaction signer to the Machine object`;
export const Pair_Prior = `The name of the previous node`;
export const Pair_Node = `The name of the latter node`;
export const Pair_Threashold = `Migration threshold between previous and latter nodes. 
    When the total weight of completed operations between the two nodes meets or exceeds this threshold, the process migrates from the previous to the next node`;
export const Machine_RemovePairs = `Remove all operations defined in node pairs.`;
export const Machine_AddForward_Description = `Add operations between the previous node and the latter node`;
export const Machine_RemoveForward_Description = `Remove operations between the previous node and the latter node`;
export const Machine_RemoveForward = `The operation between the previous node and the latter node`;
export const Machine_Publish = `Publish the Machine object. 
    If True, Machine will allow its Progress object to be created, and data such as Machine nodes cannot be changed again. If False, it is ignored`;
export const Machine_Pause = `If Machine is already published, the creation of new Progress is paused if True, and new Progress is allowed if False.
    The generated Progress is not affected.`;
export const Machine_Clone = `Because the promised Settings cannot be changed after the Machine is published, 
    Clone allows it to be retained to copy a new Machine, inherit its Settings, and can be modified and released at any time`;
export const BizPermission_Name = `The name of the permission`;
export const Permission_BizAdd = `Add user-defined permissions`;
export const Permission_BizRemove = `Remove user-defined permissions`;
export const Permission_Biz_Description = `Add or Remove user-defined permissions`;
export const Permission_Guard_Description = ` If the guard field is set, exercising permission operations must also pass the verification of this Guard object`;
export const Entity_Permission = `OpeOperational permissions for the address (including built-in and user-defined ones). ${Permission_Guard_Description}`;
export const Permission_Entity = `The operational address of this permission. ${Permission_Guard_Description}`;
export const Permission_AddEntity = `Add or set new permissions for addresses`;
export const Permission_AddPermission = `Add or set new addresses for permissions`;
export const Permission_RemoveEntity = `Delete addresses and its permissions from the Permission Object. Administrator addresses is not affected`;
export const Permission_RemovePermission = `Remove some permissions for the address`;
export const Permission_Transform = `Transfer all permissions from one address to another; the recipient must be the Permission object's new address`;
export const Permission_Permission_Description = `Personnel address and its permission settings`;
export const Permission_Admin_Description = `Manage the administrator list. only the builder of the Permission object can operate it`;
export const Admin_Add_Remove = `Add, delete, and set an administrator address list`;
export const Admin_Removeall = `Delete all Administrators`;
export const Permission_Builder_Description = `Modify the builder address (Builder is the sole highest owner of the Permission object; default: signer address of the Permission object creation transaction. Important note: Builder can only be changed by the Permission object's original builder. If the user does not explicitly specify this field, the AI should not attempt to set it. Failure of the operation may occur due to insufficient permissions.`;
export const RepositoryAddressID_Description = `Either an address or a positive integer-converted address (e.g., time number) for querying Repository data`;
export const Payment_Description = `Payment information: index (business number), remark (payment note), for_object (payment purpose), for_guard (to fulfill verification requirements of a Guard)`;
export const Repository_Reference_Description = `Declare the list of other objects that use this Repository. `;
export const Mode_Relax = `Allow data names outside the Repository's consensus policy and its data to be added`;
export const Mode_Strict = `Only allow data names within the Repository's consensus policy and its data to be added`;
export const Repository_Mode_Description = `Whether operations on data names strictly follow the requirements of the policy consensus`;
export const Repository_Policy_Description = `The consensus policy defines the meaning of data names, the types of their data, and write permissions. When data is written to the Repository, operational permission checks are performed based on their data names`;
export const Repository_Policy = `A consensus policy: key (data name), description (meaning of the data name), dataType (type of its data), permissionIndex (write permission requirements for its data)`;
export const Policy_Add = 'Add or set consensus policies';
export const Policy_Remove = `Delete the corresponding consensus policies based on the list of data names (keys)`;
export const Policy_Removall = `Remove all consensus policies`;
export const Policy_Rename = `Rename consensus policies`;
export const Policy_Rename_Old = `The original name of the data name`;
export const Policy_Rename_New = `The new name of the data name`;
export const Data_Key = `Data name`;
export const Data_bcsBytes = 'Data in bcs Bytes format';
export const Data_ForAddress = `Add dataset: The same key (data name), but different data under different addresses`;
export const Repository_Data_ForAddress = `Batch add data for different addresses based on the data name`;
export const Repository_Data_ForName = `Batch add data for a specific address based on different data names.`;
export const Data_Name_Address = `Each piece of data is uniquely identified by a data name and an address`;
export const Repository_AddData = `'Add data to the Repository object. ${Data_Name_Address}`;
export const Repository_RemoveData = `'Remove data from the Repository object. ${Data_Name_Address}`;
export const Repository_OpData = `Add or remove data to the Repository object. ${Data_Name_Address}`;
export const Arb_New = `File an arbitration application for disputes regarding an order: 
    order (the disputed order), description (detailed description of the dispute), votable_proposition (list of claims for rights), max_fee (arbitration fee paid, charged according to Arbitration.fee, with excess refunded)`;
export const Arbitration_ArbNew = `File an arbitration application for a disputed order and generate a new Arb object`;
export const Arbitration_Withdraw = `Extract fees from the Arb object to the designated treasury (Arbitration.fee_treasury) of the Arbitration object`;
export const Vote_Agrees = `Supported claim (number)`;
export const Arbitration_Vote = `Vote on the claims of the Arb object. If Arbitration.voting_guard has been set, the 'voting_guard' must be one of them`;
export const Arbitration_Feedback = `feedback of the arbitration result`;
export const Arbitration_Arbitratation = `Determine arbitration feedback and conclusions for the Arb object. If 'indemnity' is set, the order owner can extract the corresponding token amount from the order object`;
export const Arbitration_Endpoint = `HTTPS endpoint of the Arbitration object.
    Used to exchange non-public information or large-capacity information in some special scenarios`;
export const Arbitration_Fee = `The cost of initiating the arbitration. 0 or undefined means the arbitration is free of charge.`;
export const VotingGuard_Description = `Voting settings: guard (permission verification), voting_weight (voting weight)`;
export const Arbitration_VotingGuard_Add = `Add or set voting permission verification and voting weight`;
export const Arbitration_VotingGuard_Remove = `Remove some voting permission verifications`;
export const Arbitration_VotingGuard_RemoveAll = `Remove all voting permission verifications`;
export const Arbitration_VotingGuard_Description = `Manage voting permissions and weights. If a voting operation passes the verification of the Guard object, the set voting weight will be accumulated to the equity vote`;
export const Arbitration_bPause = `If true, temporarily cannot accept arbitration applications; otherwise, accept`;
export const Arbitration_Guard = `If set, the Guard verification must be passed when submitting an arbitration application`;
export const ReceiverParam_Description = `The recipient's address and payment amount`;
export const TreasuryWithdrawParam_Description = `Withdrawal. receiver (payment account and amount), withdraw_guard (withdraw based on the amount verified by the Guard; if undefined, use withdrawal permissions to withdraw)`;
export const Treasury_Deposit = `Deposit. param (deposit description)`;
export const Treasury_Receive_Recently = `Lists of the Treasury_ReceivedObject objects that received by the Treasury object in the last 50 transactions`;
export const Treasury_Receive = `Deposit the received payment objects into the Treasury`;
export const Treasury_WithdrawGuard = `guard (verification), amount (maximum withdrawal amount per transaction)`;
export const Treasury_WithdrawGuard_Add = `Adds or sets the withdraw Guard and its maximum withdrawal amount`;
export const Treasury_WithdrawGuard_Remove = `Remove withdraw guards`;
export const Treasury_WithdrawGuard_Removeall = `Remove all withdraw guards`;
export const Treasury_WithdrawGuard_Description = `Manage withdrawal settings via Guard verification`;
export const WithdrawMode_Permission = `Withdrawals can only be made if the corresponding operation Permission requirements in the Permission object are met`;
export const WithdrawMode_Guard = `The corresponding money can be withdrawn only when the Guard object is authenticated. This setting is not reversible. Guards are set in the withdraw_guard field of the Treasury object`;
export const WithdrawMode_Both = `All withdrawal methods are supported`;
export const Treasury_WithdrawMode = `Withdrawal mode settings.
    ${WOWOK.Treasury_WithdrawMode.PERMISSION}:${WithdrawMode_Permission}
    ${WOWOK.Treasury_WithdrawMode.GUARD_ONLY_AND_IMMUTABLE}:${WithdrawMode_Guard}
    ${WOWOK.Treasury_WithdrawMode.BOTH_PERMISSION_AND_GUARD}:${WithdrawMode_Both}`;
export const BuyItem_Name = `Goods name`;
export const BuyItem_MaxPrice = `Maximum price willing to pay (the transaction will be based on the actual price, and any excess amount will be refunded`;
export const BuyItem_Count = `Quantity of goods`;
export const Order_BuyItem = `Goods to be purchased`;
export const Order_Customer = `Customer information required for the order`;
export const Service_Order_New = `Goods purchase and payment, generate new order object and Progress object`;
export const Service_Order_Agent = `Set up agents for the order. The agent may exercise the power on behalf of the order owner`;
export const Service_Order_Customer = `Set ${Order_Customer}`;
export const Service_Order_Receive = `Extract the tokens from the Payments sent to Order and transfer them to the address of the Order owner`;
export const Order_Refund_Arb = `Refund through the Arb object`;
export const Order_Refund_Guard = `Refund through the refund Guard object`;
export const Service_Order_Refund = `Refund order`;
export const Service_Order_Withdraw = `Withdraw order funds`;
export const Service_Order_Payer = `Change the order owner`;
export const Service_Endpoint = `Https endpoint.Provide a view for browsing detailed product information`;
export const Service_Payee = `Change the order owner`;
export const Service_Discount = `Send discount coupons to the receivers`;
export const Discount_Name = `The coupon name`;
export const Discount_Count = `The number of discount coupons`;
export const Discount_Off = `Discount value. If Percentage-off coupon, -off%; If Flat-rate coupon, -off`;
export const Discount_Duration = `The duration of the coupon validity period, in minutes`;
export const Discount_TimeStart = `Discount coupon effective time(ms). undefined if the current time`;
export const Discount_PriceGreater = `Discount effective condition: the amount is greater than or equal to this value`;
export const Discount_Type = `Discount type. 
    ${WOWOK.Service_Discount_Type.ratio}:Percentage-off coupon
    ${WOWOK.Service_Discount_Type.minus}:Flat-rate coupon`;
export const Service_Repository = `Set consensus Repository objects for data sharing`;
export const Service_ExternTreasury = `Incentive Treasury. Provides withdrawal rewards under conditions such as incentives and compensation`;
export const Service_Arbitration = `Set Arbitration objects. Commit to that when a dispute occurs in an order, the order owner's arbitration rulings and compensation applied to these objects will be fully supported`;
export const Service_bPaused = `The creation of new Order is paused if True, and new Order is allowed if False`;
export const Service_Clone = `Clone a new Service object. Inheriting the original Settings (but not published yet), and could change the type of payment token`;
export const Clone_Type = `The new token type for the Service object.`;
export const Buy_Guard = `If set, the Guard verification must be passed during purchase`;
export const Personal_Info = `Personal social information`;
export const Mark_Name = `The name for the address`;
export const Mark_Tags = `Tags for the address`;
export const Mark_Add = `Add or set a name and tags for addresses`;
export const Mark_Remove = `Remove tags for addresses`;
export const Mark_Removeall = `These addresses are no longer marked`;
export const Mark_Transfer = `Transfer the marked data of the signer's on-chain address to another address`;
export const Mark_Replace = `Replace the signer's on-chain address marking information with a new object`;
export const Mark_Destroy = `Delete all marked addresses information`;
export const Personal_Mark = `Manage the signer's on-chain address marking information`;
export const ObjectPermissionChange = `Batch change the Permission object of Demand, Service, Machine, Repository, Treasury, and Arbitration objects. The transaction signer must be the owner of their original Permission object`;
export const Witness_Value = `Value of this witness`;
export const Witness_Cmd = `The query command for this Witness object address`;
export const Witness_Cited = `Number of times the witness is cited`;
export const Faucet = `Receive SUI tokens from the faucet (valid only on the testnet). Receive it once every certain period of time (usually 24 hours)`;
//# sourceMappingURL=const.js.map