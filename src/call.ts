/**
 * Provide a this interface for AI
 * Operation sequence Priority: common operation > Guard change > permission change
 * Recommended: Changes to guard and permission are committed on-chain separately to avoid permission dependencies for other operations.
 */

import { Protocol, TransactionBlock,  } from 'wowok';
import { PassportObject, IsValidAddress, Errors, ERROR, Permission, Permission_Entity, Permission_Index, PermissionIndex, UserDefinedIndex,
    PermissionIndexType, Entity, Entity_Info, Repository, Repository_Policy, Repository_Policy_Data, Repository_Policy_Data2, Repository_Policy_Data_Remove,
    Repository_Policy_Mode, Demand, Machine, Machine_Forward, Machine_Node, BuyRequiredEnum, Customer_RequiredInfo, DicountDispatch, Service, Service_Buy, 
    Service_Guard_Percent, Service_Sale, WithdrawPayee, DepositParam, Treasury, Treasury_WithdrawMode, WithdrawParam, MarkName, Resource,
    Arbitration, Dispute, Feedback, Vote, VotingGuard, WithdrawFee, Deliverable, ParentProgress, Progress, ProgressNext,
    GuardParser, Passport, WitnessFill
} from 'wowok';
import { OBJECT_QUERY, ObjectArbitration, ObjectDemand, ObjectService, ObjectTreasury } from './objects';
import { PERMISSION_QUERY } from './permission';
import { Account } from './account';

export class CallBase {
    object: string | 'new' ;
    permission?: string;
    constructor(object: string | 'new' = 'new') {
        this.object = object;
    }
    // operation implementation for a call
    protected async operate(txb:TransactionBlock, passport?:PassportObject) {};
    
    // return WitnessFill to resolve filling witness, and than 'call_with_witness' to complete the call; 
    // return undefined when the call has completed; 
    // throw an exception when errors.
    async call() : Promise<WitnessFill[] | undefined>  { return undefined };
    async call_with_witness (guards: string[], fill?: WitnessFill[]) {
        if (guards.length > 0) {         // prepare passport
            const p: GuardParser | undefined = await GuardParser.Create([...guards]);

            if (p) {
                const query = await p.done(fill);
                if (query) {
                    const txb = new TransactionBlock();
                    const passport = new Passport(txb, query!);   
                    this.operate(new TransactionBlock(), passport?.get_object())
                    passport.destroy();
                    return;
                }
            } else {
                ERROR(Errors.Fail, 'guard finish_passport')
            }
        } 
    }

    protected async check_permission (permission:string, permIndex: PermissionIndexType[], guards_needed: string[],
        checkOwner?:boolean, checkAdmin?:boolean, account?:string) : Promise<WitnessFill[] | undefined>  {
        var guards : string[] = [];
        const pair = Account.Instance().get_pair(account, true);
        if (!pair) ERROR(Errors.Fail, 'account invalid')

        if (permIndex.length > 0 || checkOwner) {
            const p = await PERMISSION_QUERY.permission({permission_object:permission, address:pair!.toSuiAddress()});
            if (checkOwner && !p.owner) ERROR(Errors.noPermission, 'owner');
            if (checkAdmin && !p.admin) ERROR(Errors.noPermission, 'admin');

            permIndex.forEach(v => {
                const r = Permission.HasPermission(p, v);
                if (!r?.has) ERROR(Errors.noPermission, v);
                if (r?.guard) guards.push(r.guard)
            })       
        }
        if (guards_needed.length > 0) {
            guards = guards.concat(guards_needed);
        }

        if (guards.length > 0) {         // prepare passport
            const p: GuardParser | undefined = await GuardParser.Create([...guards]);
            const futures = p ? p.future_fills() : []; 

            if (!p) ERROR(Errors.Fail, 'guard parse')

            if (p && futures.length === 0) {
                const query = await p.done();
                if (query) {
                    const txb = new TransactionBlock();
                    const passport = new Passport(txb, query!);   
                    this.operate(new TransactionBlock(), passport?.get_object())
                    passport.destroy();

                    const response = await Protocol.Client().signAndExecuteTransaction({
                        transaction: txb, 
                        signer: pair!,
                        options:{showObjectChanges:true},
                    });
                    console.log(response)
                    return;
                }
            } 
            
            return p?.future_fills();
        } else { // no passport needed
            this.operate(new TransactionBlock());
        }
    }
}
export class CallRepository extends CallBase {
    permission_new?: string; // change permission or 'new' object with permission specified.
    description?: string;
    mode?: Repository_Policy_Mode; // default: 'Relax' (POLICY_MODE_FREE) 
    reference?: {op:'set' | 'add' | 'remove' ; addresses:string[]} | {op:'removeall'};
    policy?: {op:'add' | 'set'; data:Repository_Policy[]} | {op:'remove'; data:string[]} | {op:'removeall'} | {op:'rename'; data:{old:string; new:string}[]};
    data?: {op:'add', data: Repository_Policy_Data | Repository_Policy_Data2} | {op:'remove'; data: Repository_Policy_Data_Remove};
    constructor(object: string | 'new' = 'new') { super(object) }
    async call() : Promise<WitnessFill[] | undefined>  {
        var checkOwner = false;
        const perms : PermissionIndexType[] = []; 

        if (this?.permission && IsValidAddress(this.permission)) {
            if (this?.object === 'new') {
                perms.push(PermissionIndex.repository)
            }
            if (this?.permission_new !== undefined) {
                checkOwner = true;
            }
            if (this?.description !== undefined && this?.object !== 'new') {
                perms.push(PermissionIndex.repository_description)
            }
            if (this?.mode !== undefined && this?.object !== 'new') {
                perms.push(PermissionIndex.repository_mode)
            }
            if (this?.reference !== undefined) {
                perms.push(PermissionIndex.repository_reference)
            }
            if (this?.policy !== undefined) {
                perms.push(PermissionIndex.repository_policies)
            }
            return await this.check_permission(this.permission, perms, [], checkOwner)
        }
        this.operate(new TransactionBlock());
    }

    protected async operate(txb:TransactionBlock, passport?:PassportObject) {
        let obj : Repository | undefined ; let permission: any;
        if (this.object === 'new') {
            if (!this?.permission || !IsValidAddress(this?.permission)) {
                permission = Permission.New(txb, '');
            }
            
            obj = Repository.New(txb, permission ?? this?.permission, this?.description??'', this?.mode, permission?undefined:passport)
        } else {
            if (IsValidAddress(this.object) && this.permission && IsValidAddress(this?.permission)) {
                obj = Repository.From(txb, this.permission, this.object)
            }
        }

        if (obj) {
            if (this?.description !== undefined && this.object !== 'new') {
                obj?.set_description(this.description, passport);
            }
            if (this?.mode !== undefined && this.object !== 'new') {
                obj?.set_policy_mode(this.mode, passport)
            }
            if (this?.reference !== undefined) {
                switch (this.reference.op) {
                    case 'set':
                        obj?.remove_reference([], true, passport);
                        obj?.add_reference(this.reference.addresses, passport);
                        break;
                    case 'add':
                        obj?.add_reference(this.reference.addresses, passport);
                        break;
                    case 'remove':
                        obj?.remove_reference(this.reference.addresses, false, passport);
                        break;
                    case 'removeall':
                        obj?.remove_reference([], true, passport);
                        break;
                }
            }
            if (this?.policy !== undefined) {
                switch(this.policy.op) {
                    case 'set':
                        obj?.remove_policies([], true, passport);
                        obj?.add_policies(this.policy.data, passport);
                        break;
                    case 'add':
                        obj?.add_policies(this.policy.data, passport);
                        break;
                    case 'remove':
                        obj?.remove_policies(this.policy.data, false, passport);
                        break;
                    case 'removeall':
                        obj?.remove_policies([], true, passport);
                        break;
                    case 'rename':
                        this.policy.data.forEach((v) => {
                            obj?.rename_policy(v.old, v.new, passport);
                        })
                        break;
                }
            }
            if (this?.data !== undefined) {
                switch(this.data.op) {
                    case 'add':
                        if ((this.data?.data as any)?.key !== undefined) {
                            obj?.add_data(this.data.data as Repository_Policy_Data);
                        } else if ((this.data?.data as any)?.address !== undefined) {
                            obj?.add_data2(this.data.data as Repository_Policy_Data2);
                        }
                        break;
                    case 'remove':
                        obj?.remove(this.data.data.address, this.data.data.key);
                        break;
                }
            }
            if (this?.permission_new !== undefined ) {
                obj?.change_permission(this.permission_new);
            }
            if (permission) {
                permission.launch();
            }
            if (this.object === 'new') {
                obj?.launch();
            }
        }
    };
}

export class CallPermission extends CallBase {
    builder?: string;
    admin?: {op:'add' | 'remove' | 'set', admins:string[]};
    description?: string;
    entity?: {op:'add entity'; entities:Permission_Entity[]} | {op:'add permission'; permissions:Permission_Index[]} 
        | {op:'remove entity'; addresses:string[]} | {op:'remove permission'; address:string; index:PermissionIndexType[]} 
        | {op:'transfer permission', from_address: string; to_address: string};
    biz_permission?: {op:'add'; data: UserDefinedIndex[]} | {op:'remove'; permissions: PermissionIndexType[]};
    constructor(object: string | 'new' = 'new') { super(object) }
    async call() : Promise<WitnessFill[] | undefined>  {
        var checkOwner = false; var checkAdmin = false;
        if (this?.object !== 'new' && IsValidAddress(this?.object)) {
            if (this?.builder !== undefined || this?.admin !== undefined) {
                checkOwner = true;
            }
            if (this?.entity !== undefined || this?.biz_permission !== undefined) {
                checkAdmin = true;
            }
            if (this?.description !== undefined && this?.object !== 'new') {
                checkAdmin = true;
            }
            return await this.check_permission(this.object, [], [], checkOwner, checkAdmin)
        }
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject) {
        let obj : Permission | undefined ; 
        if (this.object === 'new') {
            obj = Permission.New(txb, this?.description??'');
        } else {
            if (IsValidAddress(this.object)) {
                obj = Permission.From(txb, this.object)
            }
        }

        if (obj) {
            if (this?.admin !== undefined) {
                switch(this.admin.op) {
                    case 'add':
                        obj?.add_admin(this.admin.admins);
                        break;
                    case 'remove':
                        obj?.remove_admin(this.admin.admins);
                        break;
                    case 'set':
                        obj?.remove_admin([], true);
                        obj?.add_admin(this.admin.admins);
                        break
                }
            }
            if (this?.description !== undefined && this.object !== 'new') {
                obj?.set_description(this.description)
            }
            if (this?.entity !== undefined) {
                switch (this.entity.op) {
                    case 'add entity':
                        obj?.add_entity(this.entity.entities);
                        break;
                    case 'add permission':
                        obj?.add_entity3(this.entity.permissions);
                        break;
                    case 'remove entity':
                        obj?.remove_entity(this.entity.addresses);
                        break;
                    case 'remove permission':
                        obj?.remove_index(this.entity.address, this.entity.index);
                        break;
                    case 'transfer permission':
                        obj?.transfer_permission(this.entity.from_address, this.entity.to_address);
                        break;
                }
            }
            if (this?.biz_permission !== undefined) {
                switch(this.biz_permission.op) {
                    case 'add':
                        this.biz_permission.data.forEach(v => {
                            obj?.add_userdefine(v.index, v.name);
                        })
                        break;
                    case 'remove':
                        this.biz_permission.permissions.forEach(v => {
                            obj?.remove_userdefine(v);
                        })
                        break;
                }
            }
            if (this?.builder !== undefined ) {
                obj?.change_owner(this.builder);
            }
            if (this.object === 'new') {
                obj?.launch();
            }
        }
    }
}

export class CallDemand extends CallBase {
    permission_new?: string;
    type_parameter: string;
    guard?: {address:string; service_id_in_guard?:number};
    description?: string;
    time_expire?: {op: 'duration'; minutes:number} | {op:'set'; time:number};
    bounty?: {op:'add'; object?:string; balance:string} | {op:'refund'} | {op:'reward'; service:string};
    present?: {service: string | number; recommend_words:string; service_pay_type:string, guard?:string | 'fetch'}; // guard is the present guard of Demand
    reward?: string; // rerward the service
    refund?: boolean;
    constructor(type_parameter:string, object: string | 'new' = 'new') { 
        super(object)
        this.type_parameter = type_parameter 
    }
    async call() : Promise<WitnessFill[] | undefined>  {
        if (!this.type_parameter) ERROR(Errors.InvalidParam, 'type_parameter')
        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = []; 

        if (this?.permission && IsValidAddress(this.permission)) {
            if (this?.object === 'new') {
                perms.push(PermissionIndex.demand)
            }
            if (this?.permission_new !== undefined) {
                checkOwner = true;
            }
            if (this?.description !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.demand_description)
            }
            if (this?.time_expire !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.demand_expand_time)
            }
            if (this?.guard !== undefined) {
                perms.push(PermissionIndex.demand_guard)
            }
            if (this?.reward !== undefined) {
                perms.push(PermissionIndex.demand_yes)
            }
            if (this?.refund) {
                perms.push(PermissionIndex.demand_refund)
            }
            if (this?.present?.guard !== undefined) {
                if (IsValidAddress(this.present.guard)) {
                    guards.push(this.present.guard)
                } else if (IsValidAddress(this?.object)) {
                    const r = await OBJECT_QUERY.objects({objects:[this.object], showContent:true});
                    if (r?.objects && r?.objects[0]?.type === 'Demand') {
                        const obj = (r?.objects[0] as ObjectDemand);
                        if (obj?.guard) {
                            guards.push(obj?.guard.object);
                        }
                    }
                }
            }
            return await this.check_permission(this.permission, perms, guards, checkOwner)
        }
        this.operate(new TransactionBlock());
    }
    protected async operate(txb:TransactionBlock, passport?:PassportObject) {
        let obj : Demand | undefined ; let permission: any;

        if (this.object === 'new') {
            if (!this?.permission || !IsValidAddress(this?.permission)) {
                permission = Permission.New(txb, '');
            }
            
            if (this.time_expire !== undefined) {
                obj = Demand.New(txb, this.type_parameter, this.time_expire?.op === 'duration' ? true : false, 
                    this.time_expire?.op === 'duration' ? this.time_expire.minutes : this.time_expire?.time,
                    permission ? permission.get_object(): this?.permission, this?.description??'', permission?undefined:passport)
            } else {
                obj = Demand.New(txb, this.type_parameter, true, 30*24*60, // 30days default
                    permission ? permission.get_object(): this?.permission, this?.description??'', permission?undefined:passport)       
            }
        } else {
            if (IsValidAddress(this.object) && this.type_parameter && this.permission && IsValidAddress(this?.permission)) {
                obj = Demand.From(txb, this.type_parameter, this.permission, this.object)
            }
        }

        if (obj) {
            if (this?.description !== undefined && this.object !== 'new') {
                obj?.set_description(this.description, passport);
            }
            if (this?.time_expire !== undefined && this.object !== 'new') {
                obj?.expand_time(this.time_expire.op === 'duration' ? true : false, 
                    this.time_expire.op === 'duration' ? this.time_expire.minutes : this.time_expire.time, passport)
            }
            if (this?.bounty !== undefined) {
                if (this.bounty.op === 'add') {
                    let deposit : any | undefined; let b = BigInt(this.bounty.balance);
                    if (b > BigInt(0)) {
                        if (this.type_parameter === '0x2::sui::SUI' || this.type_parameter === '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI') {
                            deposit = txb.splitCoins(txb.gas, [b])[0];
                        } else if (this?.bounty?.object) {
                            deposit = txb.splitCoins(this.bounty.object, [b])[0];
                        }
                        if (deposit) {
                            obj?.deposit(deposit);                              
                        }
                    }
                } else if (this.bounty.op === 'refund') {
                    obj?.refund(passport);
                } else if (this.bounty.op === 'reward') {
                    obj?.yes(this.bounty.service, passport);
                }
            }
            if (this?.present !== undefined) {
                //@ demand guard and its passport, if set
                obj?.present(this.present.service, this.present.service_pay_type, this.present.recommend_words, passport);
            }
            if (this?.guard !== undefined) {
                obj?.set_guard(this.guard.address, this.guard?.service_id_in_guard ?? undefined, passport)
            }
            if (this?.permission_new !== undefined ) {
                obj?.change_permission(this.permission_new);
            }
            if (permission) {
                permission.launch();
            }
            if (this.object === 'new') {
                obj?.launch();
            }
        }
    }
}

export class CallMachine extends CallBase { //@ todo self-owned node operate
    permission_new?: string;
    bPaused?: boolean;
    bPublished?: boolean;
    consensus_repository?: {op:'set' | 'add' | 'remove' ; repositories:string[]} | {op:'removeall'};
    description?: string;
    endpoint?: string;
    clone_new?: boolean;
    nodes?: {op: 'add'; data: Machine_Node[]} | {op: 'remove'; names: string[], bTransferMyself?:boolean} 
        | {op:'rename node'; data:{old:string; new:string}[]} | {op:'add from myself'; addresses: string[]}
        | {op:'remove pair'; pairs: {prior_node_name:string; node_name:string}[]}
        | {op:'add forward'; data: {prior_node_name:string; node_name:string; forward:Machine_Forward; threshold?:number; old_need_remove?:string}[]}
        | {op:'remove forward'; data:{prior_node_name:string; node_name:string; forward_name:string}[]}
    progress_new?: {task_address?:string; };
    progress_context_repository?: {progress:string; repository:string};
    progress_parent?: {progress:string, parent?:ParentProgress};
    progress_task?: {progress:string; task:string};
    progress_namedOperator?: {progress:string; data:{name:string, operator:string[]}[]};
    progress_hold?: {progress:string; data:ProgressNext; bHold:boolean; adminUnhold?:boolean};
    progress_next?: {progress:string; data:ProgressNext; deliverable:Deliverable; guard?:string | 'fetch'};
    constructor(object: string | 'new' = 'new') { super(object) }
    async call() : Promise<WitnessFill[] | undefined>  {
        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = []; 

        if (this?.permission && IsValidAddress(this.permission)) {
            if (this?.object === 'new') {
                perms.push(PermissionIndex.machine)
            }
            if (this?.permission_new !== undefined) {
                checkOwner = true;
            }
            if (this?.description !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.machine_description)
            }
            if (this?.bPaused !== undefined) {
                perms.push(PermissionIndex.machine_pause)
            }
            if (this?.bPublished) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.machine_publish)
            }
            if (this?.endpoint !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.machine_endpoint)
            }
            if (this?.consensus_repository !== undefined) {
                perms.push(PermissionIndex.machine_repository)
            }
            if (this?.clone_new !== undefined) {
                perms.push(PermissionIndex.machine_clone)
            }
            if (this?.nodes !== undefined) {
                perms.push(PermissionIndex.machine_node)
            }
            if (this?.progress_new !== undefined) {
                perms.push(PermissionIndex.progress)
            }
            if (this?.progress_context_repository !== undefined) {
                perms.push(PermissionIndex.progress_context_repository)
            }
            if (this?.progress_namedOperator !== undefined) {
                perms.push(PermissionIndex.progress_namedOperator)
            }
            if (this?.progress_parent !== undefined) {
                perms.push(PermissionIndex.progress_parent)
            }
            if (this?.progress_task !== undefined) {
                perms.push(PermissionIndex.progress_bind_task)
            }
            if (this?.progress_hold !== undefined) {
                if (this.progress_hold.adminUnhold) {
                    perms.push(PermissionIndex.progress_unhold)
                } 
            }
            if (this?.progress_next?.guard !== undefined) {
                if (IsValidAddress(this?.progress_next?.guard)) {
                    guards.push(this?.progress_next?.guard)
                } else if (this?.object && IsValidAddress(this.object)) { // fetch guard
                    const guard = await Progress.QueryForwardGuard(this?.progress_next.progress, this.object, 
                        Account.Instance().get_address() ?? '0xe386bb9e01b3528b75f3751ad8a1e418b207ad979fea364087deef5250a73d3f', 
                        this.progress_next.data.next_node_name, this.progress_next.data.forward);
                    if (guard) {
                        guards.push(guard)
                    }
                }
            }

            return await this.check_permission(this.permission, perms, guards, checkOwner)
        }
        this.operate(new TransactionBlock());
    }

    protected async operate(txb:TransactionBlock, passport?:PassportObject) {
        let obj : Machine | undefined ; let permission: any;
        if (this.object === 'new') {
            if (!this?.permission || !IsValidAddress(this?.permission)) {
                permission = Permission.New(txb, '');
            }
            obj = Machine.New(txb, permission ?? this?.permission, this?.description??'', this?.endpoint ?? '', permission?undefined:passport);
        } else {
            if (IsValidAddress(this.object) && this.permission && IsValidAddress(this?.permission)) {
                obj = Machine.From(txb, this.permission, this.object)
            }
        }

        if (obj) {
            if (this?.description !== undefined && this.object !== 'new') {
                obj?.set_description(this.description, passport);
            }
            if (this?.endpoint !== undefined && this.object !== 'new') {
                obj?.set_endpoint(this.endpoint, passport)
            }
            if (this?.bPaused !== undefined) {
                obj?.pause(this.bPaused, passport)
            }
            if (this?.bPublished ) {
                obj?.publish(passport)
            }
            if (this?.clone_new) {
                obj?.clone(true, passport)
            }
            if (this?.consensus_repository !== undefined) {
                switch (this.consensus_repository.op) {
                    case 'add': 
                        this.consensus_repository.repositories.forEach(v=>obj?.add_repository(v, passport)) ;
                        break;
                    case 'remove': 
                        obj?.remove_repository(this.consensus_repository.repositories, false, passport);
                        break;
                    case 'removeall': 
                        obj?.remove_repository([], true, passport);
                        break;
                    case 'set':
                        obj?.remove_repository([], true, passport);
                        this.consensus_repository.repositories.forEach(v=>obj?.add_repository(v, passport)) ;
                        break;
                }
            }
            if (this?.nodes !== undefined) {
                switch (this?.nodes?.op) {
                    case 'add':
                        obj?.add_node(this.nodes.data, passport)
                        break;
                    case 'remove':
                        obj?.remove_node(this.nodes.names, this.nodes?.bTransferMyself, passport)
                        break;
                    case 'rename node':
                        this.nodes.data.forEach(v => obj?.rename_node(v.old, v.new, passport));
                        break;
                    case 'add from myself':
                        obj?.add_node2(this.nodes.addresses, passport);
                        break;
                    case 'add forward':
                        this.nodes.data.forEach(v => obj?.add_forward(v.prior_node_name, v.node_name, v.forward, v.threshold, v.old_need_remove, passport))
                        break;
                    case 'remove forward':
                        this.nodes.data.forEach(v => obj?.remove_forward(v.prior_node_name, v.node_name, v.forward_name, passport))
                        break;
                    }
            }
            if (this?.progress_new !== undefined) {
                Progress?.New(txb, this?.object, permission??this?.permission, this?.progress_new.task_address, passport).launch();
            }
            if (this?.progress_context_repository !== undefined) {
                Progress.From(txb, this?.object, permission??this?.permission, this?.progress_context_repository.progress)
                    .set_context_repository(this?.progress_context_repository.repository, passport)
            }
            if (this?.progress_namedOperator !== undefined) {
                const p = Progress.From(txb, this?.object, permission??this?.permission, this?.progress_namedOperator.progress);
                this.progress_namedOperator.data.forEach(v => p.set_namedOperator(v.name, v.operator, passport));
            }
            if (this?.progress_parent !== undefined) {
                if (this.progress_parent.parent) {
                    Progress.From(txb, this?.object, permission??this?.permission, this?.progress_parent.progress).parent(this.progress_parent.parent);
                } else {
                    Progress.From(txb, this?.object, permission??this?.permission, this?.progress_parent.progress).parent_none();
                }
            }
            if (this?.progress_task !== undefined) {
                Progress.From(txb, this?.object, permission??this?.permission, this?.progress_task.progress).bind_task(this.progress_task.task, passport)
            }
            if (this?.progress_hold !== undefined) {
                if (this?.progress_hold.adminUnhold) {
                    Progress.From(txb, this?.object, permission??this?.permission, this?.progress_hold.progress).unhold(this.progress_hold.data, passport)
                } else {
                    Progress.From(txb, this?.object, permission??this?.permission, this?.progress_hold.progress).hold(this.progress_hold.data, this.progress_hold.bHold)
                }
            }
            if (this?.progress_next !== undefined) {
                Progress.From(txb, this?.object, permission??this?.permission, this?.progress_next.progress).next(this.progress_next.data, this.progress_next.deliverable, passport)
            }
            if (this?.permission_new !== undefined ) {
                obj?.change_permission(this.permission_new);
            }
            if (permission) {
                permission.launch();
            }
            if (this.object === 'new') {
                obj?.launch();
            }
        }
    }
}       

export class CallService extends CallBase {
    type_parameter: string;
    permission_new?: string;
    bPaused?: boolean;
    bPublished?: boolean;
    description?: string;
    gen_discount?: DicountDispatch[];
    arbitration?: {op:'set' | 'add'; arbitrations:{address:string, token_type:string}[]} 
        | {op:'removeall'} | {op:'remove', addresses:string[]};
    buy_guard?: string;
    endpoint?: string;
    extern_withdraw_treasury?: {op:'set' | 'add'; treasuries:{address:string, token_type:string}[]} 
        | {op:'removeall'} | {op:'remove', addresses:string[]};
    machine?: string;
    payee_treasury?:string;
    clone_new?: {token_type_new?:string};
    repository?: {op:'set' | 'add' | 'remove' ; repositories:string[]} | {op:'removeall'};
    withdraw_guard?: {op:'add' | 'set'; guards:Service_Guard_Percent[]} 
        | {op:'removeall'} | {op:'remove', addresses:string[]};
    refund_guard?: {op:'add' | 'set'; guards:Service_Guard_Percent[]} 
        | {op:'removeall'} | {op:'remove', addresses:string[]};
    customer_required_info?: {pubkey:string; required_info:(string | BuyRequiredEnum)[]};
    sales?: {op:'add', sales:Service_Sale[]} | {op:'remove'; sales_name:string[]}
    order_new?: {buy_items:Service_Buy[], coin_object?:string, discount?:string, machine?:string, customer_info_crypto?: Customer_RequiredInfo, guard?:string | 'fetch'}
    order_required_info?: {order:string; info:Customer_RequiredInfo};
    order_refund?: {order:string; guard?:string;} | {order:string; arb:string; arb_token_type:string}; // guard address
    order_withdrawl?: {order:string; data:WithdrawPayee}; // guard address
    order_payer?: {order:string; payer_new: string}; // transfer the order payer permission to someaddress
    order_agent?: {order:string; agents: string[]; progress?:string};
    constructor(type_parameter:string, object: string | 'new' = 'new') { 
        super(object) 
        this.type_parameter = type_parameter;
    }
    async call() : Promise<WitnessFill[] | undefined>  {
        if (!this.type_parameter) ERROR(Errors.InvalidParam, 'type_parameter');

        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = [];  var obj: ObjectService | undefined;

        if (this?.permission && IsValidAddress(this.permission)) {
            if (this?.object === 'new') {
                perms.push(PermissionIndex.service)
            }
            if (this?.permission_new !== undefined) {
                checkOwner = true;
            }
            if (this?.description !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.service_description)
            }
            if (this?.bPaused !== undefined) {
                perms.push(PermissionIndex.service_pause)
            }
            if (this?.bPublished) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.service_publish)
            }
            if (this?.endpoint !== undefined) {
                perms.push(PermissionIndex.service_endpoint)
            }
            if (this?.repository !== undefined) {
                perms.push(PermissionIndex.service_repository)
            }
            if (this?.clone_new !== undefined) {
                perms.push(PermissionIndex.service_clone)
            }
            if (this?.gen_discount !== undefined) {
                perms.push(PermissionIndex.service_discount_transfer)
            }
            if (this?.arbitration !== undefined) {
                perms.push(PermissionIndex.service_arbitration)
            }
            if (this?.buy_guard !== undefined) {
                perms.push(PermissionIndex.service_buyer_guard)
            }
            if (this?.endpoint !== undefined) {
                perms.push(PermissionIndex.service_endpoint)
            }
            if (this?.extern_withdraw_treasury !== undefined) {
                perms.push(PermissionIndex.service_treasury)
            }
            if (this?.machine !== undefined) {
                perms.push(PermissionIndex.service_machine)
            }
            if (this?.payee_treasury !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.service_payee)
            }
            if (this?.withdraw_guard !== undefined) {
                perms.push(PermissionIndex.service_withdraw_guards)
            }
            if (this?.refund_guard !== undefined) {
                perms.push(PermissionIndex.service_refund_guards)
            }
            if (this?.customer_required_info !== undefined) {
                perms.push(PermissionIndex.service_customer_required)
            }
            if (this?.sales !== undefined) {
                perms.push(PermissionIndex.service_sales)
            }
            if (this?.order_new?.guard !== undefined) {
                if (IsValidAddress(this.order_new.guard)) {
                    guards.push(this.order_new.guard)
                } else if (this?.object && IsValidAddress(this.object)) {
                    if (!obj) {
                        const r = await OBJECT_QUERY.objects({objects:[this.object], showContent:true});
                        if (r?.objects && r.objects[0].type === 'Service') {
                            obj = r.objects[0] as ObjectService;
                        }                        
                    }
                    if (obj?.buy_guard) {
                        guards.push(obj?.buy_guard)
                    }
                }
            }
            if (IsValidAddress((this?.order_refund as any)?.guard)) {
                guards.push((this?.order_refund as any)?.guard)
            }
            if (this.order_withdrawl !== undefined) { // permission(may be guard) + withdraw_guard
                perms.push(PermissionIndex.service_withdraw)
            }

            if (typeof(this?.order_withdrawl?.data?.withdraw_guard) === 'string' && IsValidAddress(this?.order_withdrawl?.data?.withdraw_guard)) {
                guards.push(this?.order_withdrawl?.data?.withdraw_guard)
            }

            return await this.check_permission(this.permission, perms, guards, checkOwner)
        }
        this.operate(new TransactionBlock());
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject) {
        let obj : Service | undefined ; let permission: any;  let payee: any;
        if (this.object === 'new' && this?.type_parameter) {
            if (!this?.permission || !IsValidAddress(this?.permission)) {
                permission = Permission.New(txb, '');
            }
            if (!this?.payee_treasury || !IsValidAddress(this?.payee_treasury)) {
                payee = Treasury.New(txb, this?.type_parameter, permission ?? this?.permission, '', permission?undefined:passport);
            }
            obj = Service.New(txb, this.type_parameter, permission??this?.permission, this?.description??'', payee??this?.payee_treasury, permission?undefined:passport)
        } else {
            if (IsValidAddress(this.object) && this.type_parameter && this.permission && IsValidAddress(this?.permission)) {
                obj = Service.From(txb, this.type_parameter, this.permission, this.object)
            }
        }

        if (obj) {
            if (this?.description !== undefined && this.object !== 'new') {
                obj?.set_description(this.description, passport);
            }
            if (this?.payee_treasury !== undefined && this.object !== 'new') {
                obj?.set_payee(this.payee_treasury, passport);
            }
            if (this?.endpoint !== undefined) {
                obj?.set_endpoint(this.endpoint, passport)
            }
            if (this?.buy_guard !== undefined) {
                obj?.set_buy_guard(this.buy_guard, passport)
            }
            if (this?.bPaused !== undefined) {
                obj?.pause(this.bPaused, passport)
            }
            if (this?.bPublished) {
                obj?.publish(passport)
            }
            if (this?.clone_new !== undefined) {
                obj?.clone(this.clone_new?.token_type_new, true, passport)
            }
            if (this?.machine !== undefined) {
                obj?.set_machine(this.machine, passport)
            }
            if (this?.repository !== undefined) {
                switch (this.repository.op) {
                    case 'add':
                        this.repository.repositories.forEach(v => obj?.add_repository(v, passport))
                        break;
                    case 'remove':
                        obj?.remove_repository(this.repository.repositories, false, passport)
                        break;
                    case 'set':
                        obj?.remove_repository([], true, passport)
                        this.repository.repositories.forEach(v => obj?.add_repository(v, passport))
                        break;
                    case 'removeall':
                        obj?.remove_repository([], true, passport)
                        break;
                }
            }
            if (this?.extern_withdraw_treasury !== undefined) {
                switch(this.extern_withdraw_treasury.op) {
                    case 'add':
                        this.extern_withdraw_treasury.treasuries.forEach(v=>obj?.add_treasury(v.token_type, v.address, passport))
                        break;
                    case 'set':
                        obj?.remove_treasury([], true, passport)
                        this.extern_withdraw_treasury.treasuries.forEach(v=>obj?.add_treasury(v.token_type, v.address, passport))
                        break;
                    case 'remove':
                        obj?.remove_treasury(this.extern_withdraw_treasury.addresses, false, passport)
                        break;
                    case 'removeall':
                        obj?.remove_treasury([], false, passport)
                        break;
                }
            }
            if (this?.arbitration !== undefined) {
                switch(this.arbitration.op) {
                    case 'add':
                        this.arbitration.arbitrations.forEach(v=>obj?.add_arbitration(v.address, v.token_type, passport))
                        break;
                    case 'set':
                        obj?.remove_arbitration([], true, passport)
                        this.arbitration.arbitrations.forEach(v=>obj?.add_arbitration(v.address, v.token_type, passport))
                        break;
                    case 'remove':
                        obj?.remove_arbitration(this.arbitration.addresses, false, passport)
                        break;
                    case 'removeall':
                        obj?.remove_arbitration([], false, passport)
                        break;
                }
            }
            if (this?.customer_required_info !== undefined) {
                if (this.customer_required_info.required_info && this.customer_required_info.pubkey) {
                    obj?.set_customer_required(this.customer_required_info.pubkey, this.customer_required_info.required_info, passport);
                } else if (this.customer_required_info.pubkey) {
                    obj?.change_required_pubkey(this.customer_required_info.pubkey, passport);
                }
            }
            if (this?.refund_guard !== undefined) {
                switch(this.refund_guard.op) {
                    case 'add':
                        obj?.add_refund_guards(this.refund_guard.guards, passport)
                        break;
                    case 'set':
                        obj?.remove_refund_guards([], true, passport)
                        obj?.add_refund_guards(this.refund_guard.guards, passport)
                        break;
                    case 'remove':
                        obj?.remove_refund_guards(this.refund_guard.addresses, false, passport)
                        break;
                    case 'removeall':
                        obj?.remove_refund_guards([], true, passport)
                        break;
                }
            }
            if (this?.gen_discount !== undefined) {
                obj?.discount_transfer(this.gen_discount, passport)
            }
            if (this?.withdraw_guard !== undefined) {
                switch(this.withdraw_guard.op) {
                    case 'add':
                        obj?.add_withdraw_guards(this.withdraw_guard.guards, passport)
                        break;
                    case 'set':
                        obj?.remove_withdraw_guards([], true, passport)
                        obj?.add_withdraw_guards(this.withdraw_guard.guards, passport)
                        break;
                    case 'remove':
                        obj?.remove_withdraw_guards(this.withdraw_guard.addresses, false, passport)
                        break;
                    case 'removeall':
                        obj?.remove_withdraw_guards([], true, passport)
                        break;
                }
            }

            if (this?.sales !== undefined) {
                switch(this.sales.op) {
                    case 'add':
                        obj?.add_sales(this.sales.sales, false, passport)
                        break;
                    case 'remove':
                        obj?.remove_sales(this.sales.sales_name, passport)
                        break;
                }
            }
            if (this?.order_new !== undefined) {
                let b = BigInt(0); let coin : any;
                this.order_new.buy_items.forEach(v => {
                    b += BigInt(v.max_price) * BigInt(v.count)
                })
                if (b > BigInt(0)) {
                    if (this?.type_parameter === '0x2::sui::SUI' || this?.type_parameter === '0x0000000000000000000000000000000000000000000000000000000000000002::sui::SUI') {
                        coin = txb.splitCoins(txb.gas, [b])[0];
                    } else if (this?.order_new.coin_object) {
                        coin = txb.splitCoins(this.order_new.coin_object, [b])[0];
                    }                    
                }

                if (coin) {
                    //@ crypto tools support
                    obj?.buy(this.order_new.buy_items, coin, this.order_new.discount, this.order_new.machine, this.order_new.customer_info_crypto, passport)                    
                }
            }
            if (this?.order_payer !== undefined && obj) {
                obj?.change_order_payer(this?.order_payer.order, this.order_payer.payer_new)
            }
            if (this?.order_agent !== undefined) {
                obj?.set_order_agent(this.order_agent.order, this.order_agent.agents, this.order_agent.progress)
            }
            if (this?.order_required_info !== undefined) {
                obj?.update_order_required_info(this.order_required_info.order, this.order_required_info.info)
            }
            if (this?.order_refund !== undefined) {
                if ((this?.order_refund as any)?.arb && (this?.order_refund as any)?.arb_token_type) {
                    obj?.refund_withArb(this.order_refund.order, (this?.order_refund as any)?.arb, (this?.order_refund as any)?.arb_token_type)
                } else {
                    obj?.refund(this.order_refund.order, (this?.order_refund as any)?.guard, passport)
                }
            }
            if (this?.order_withdrawl !== undefined && passport) { //@ need withdrawal passport
                obj?.withdraw(this.order_withdrawl.order, this.order_withdrawl.data, passport)
            }
            if (this?.permission_new !== undefined) {
                obj?.change_permission(this.permission_new);
            }
            if (permission) {
                permission.launch();
            }
            if (payee) {
                payee.launch();
            }
            if (this.object === 'new') {
                obj?.launch();
            }
        }
    }
}

export class CallTreasury extends CallBase {
    type_parameter: string;
    permission_new?: string;
    description?: string;
    withdraw_mode?: Treasury_WithdrawMode;
    withdraw_guard?: {op:'add' | 'set'; data:{guard:string, amount:string}[]} | {op:'remove', guards:string[]} | {op:'removeall'};
    deposit_guard?: string;
    deposit?: {data:DepositParam, guard?:string | 'fetch'};
    receive?: {payment:string; received_object:string};
    withdraw?:WithdrawParam;
    constructor(type_parameter:string, object: string | 'new' = 'new') { 
        super(object) 
        this.type_parameter = type_parameter;
    }
    async call() : Promise<WitnessFill[] | undefined>  {
        if (!this.type_parameter) ERROR(Errors.InvalidParam, 'type_parameter');
        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = [];  var obj: ObjectTreasury | undefined ;

        if (this?.permission && IsValidAddress(this.permission)) {
            if (this?.object === 'new') {
                perms.push(PermissionIndex.treasury)
            }
            if (this?.permission_new !== undefined) {
                checkOwner = true;
            }
            if (this?.description !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.treasury_descritption)
            }
            if (this?.withdraw_mode !== undefined) {
                perms.push(PermissionIndex.treasury_withdraw_mode)
            }
            if (this?.withdraw_guard == undefined) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.treasury_withdraw_guard)
            }
            if (this?.deposit_guard !== undefined) {
                perms.push(PermissionIndex.treasury_deposit_guard)
            }
            if (this?.deposit_guard !== undefined) {
                perms.push(PermissionIndex.treasury_deposit_guard)
            }
            if (this?.deposit?.guard !== undefined) {
                if (IsValidAddress(this.deposit.guard)) {
                    guards.push(this.deposit.guard)
                } else {
                    if (!obj) {
                        const r = await OBJECT_QUERY.objects({objects:[this.object], showContent:true});
                        if (r?.objects && r.objects[0].type === 'Treasury') {
                            obj = r.objects[0] as ObjectTreasury;
                        }
                    }
                    if (obj?.deposit_guard) {
                        guards.push(obj?.deposit_guard)
                    }
                }
            }
            if (this?.receive !== undefined) {
                perms.push(PermissionIndex.treasury_receive)
            }
            if (this?.withdraw?.withdraw_guard !== undefined) {
                if (typeof(this.withdraw.withdraw_guard) === 'string' && IsValidAddress(this.withdraw.withdraw_guard)) {
                    guards.push(this.withdraw.withdraw_guard)
                } else {
                    if (!obj) {
                        const r = await OBJECT_QUERY.objects({objects:[this.object], showContent:true});
                        if (r?.objects && r.objects[0].type === 'Treasury') {
                            obj = r.objects[0] as ObjectTreasury;
                        }
                    }
                    if (typeof(obj?.withdraw_guard) === 'string') {
                        guards.push(obj?.withdraw_guard)
                    }
                }
            } else {
                perms.push(PermissionIndex.treasury_withdraw)
            }

            return await this.check_permission(this.permission, perms, guards, checkOwner)
        }
        this.operate(new TransactionBlock());
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject) {
        let obj : Treasury | undefined ; let permission: any; 
        if (this.object === 'new' && this?.type_parameter) {
            if (!this?.permission || !IsValidAddress(this?.permission)) {
                permission = Permission.New(txb, '');
            }
            obj = Treasury.New(txb, this.type_parameter, permission ?? this?.permission, this?.description??'', permission?undefined:passport)
        } else {
            if (IsValidAddress(this.object) && this.type_parameter && this.permission && IsValidAddress(this?.permission)) {
                obj = Treasury.From(txb, this.type_parameter, this.permission, this.object)
            }
        }

        if (obj) {
            if (this?.description !== undefined && this.object !== 'new') {
                obj?.set_description(this.description, passport);
            }
            if (this?.deposit_guard !== undefined) {
                obj?.set_deposit_guard(this.deposit_guard, passport);
            }
            if (this?.withdraw_mode !== undefined) {
                obj?.set_withdraw_mode(this.withdraw_mode, passport)
            }
            if (this?.withdraw_guard !== undefined) {
                switch (this.withdraw_guard.op) {
                    case 'add':
                        this.withdraw_guard.data.forEach(v => obj?.add_withdraw_guard(v.guard, BigInt(v.amount), passport))
                        break;
                    case 'remove':
                        obj?.remove_withdraw_guard(this.withdraw_guard.guards, false, passport)
                        break;
                    case 'set':
                        obj?.remove_withdraw_guard([], true, passport)
                        this.withdraw_guard.data.forEach(v => obj?.add_withdraw_guard(v.guard, BigInt(v.amount), passport))
                        break;
                    case 'removeall':
                        obj?.remove_withdraw_guard([], true, passport)
                        break;
                }
            }
            if (this?.withdraw !== undefined) {
                obj?.withdraw(this.withdraw, passport)
            }
            if (this?.receive !== undefined) {
                obj?.receive(this.receive.payment, this.receive.received_object, passport); 
            }
            if (this.deposit !== undefined) {
                obj?.deposit(this.deposit.data, passport)
            }
            if (this?.permission_new !== undefined) {
                obj?.change_permission(this.permission_new);
            }
            if (permission) {
                permission.launch();
            }
            if (this.object === 'new') {
                obj?.launch();
            }
        }
    }
}

export class CallArbitration extends CallBase {
    type_parameter: string;
    permission_new?: string;
    description?: string;
    bPaused?: boolean;
    endpoint?: string;
    fee?: string;
    fee_treasury?: string;
    usage_guard?: string;
    voting_guard?: {op:'add' | 'set'; data:VotingGuard[]} | {op:'remove', guards:string[]} | {op:'removeall'};
    arb_new?: {data: Dispute; guard?:string | 'fetch'}; // dispute an order, and a new Arb launched.
    arb_withdraw_fee?: {arb:string; data:WithdrawFee};
    arb_vote?: Vote;
    arb_arbitration?: Feedback;
    constructor(type_parameter:string, object: string | 'new' = 'new') { 
        super(object) 
        this.type_parameter = type_parameter;
    }
    async call() : Promise<WitnessFill[] | undefined>  {
        if (!this.type_parameter) ERROR(Errors.InvalidParam, 'type_parameter')

        var checkOwner = false; const guards : string[] = [];
        const perms : PermissionIndexType[] = [];  var obj: ObjectArbitration | undefined ;

        if (this?.permission && IsValidAddress(this.permission)) {
            if (this?.object === 'new') {
                perms.push(PermissionIndex.arbitration)
            }
            if (this?.permission_new !== undefined) {
                checkOwner = true;
            }
            if (this?.description !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.arbitration_description)
            }
            if (this?.bPaused !== undefined) {
                perms.push(PermissionIndex.arbitration_pause)
            }
            if (this?.endpoint == undefined) { // publish is an irreversible one-time operation 
                perms.push(PermissionIndex.arbitration_endpoint)
            }
            if (this?.fee !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.arbitration_fee)
            }
            if (this?.fee_treasury !== undefined && this.object !== 'new') {
                perms.push(PermissionIndex.arbitration_treasury)
            }
            if (this?.usage_guard !== undefined) {
                perms.push(PermissionIndex.arbitration_guard)
            }
            if (this?.voting_guard !== undefined) {
                perms.push(PermissionIndex.arbitration_voting_guard)
            }
            if (this?.arb_arbitration !== undefined) {
                perms.push(PermissionIndex.arbitration_arbitration)
            }
            if (this?.arb_new?.guard !== undefined) {
                if (IsValidAddress(this.arb_new.guard)) {
                    guards.push(this.arb_new.guard)
                } else {
                    if (!obj) {
                        const r = await OBJECT_QUERY.objects({objects:[this.object], showContent:true});
                        if (r?.objects && r.objects[0].type === 'Treasury') {
                            obj = r.objects[0] as ObjectArbitration;
                        }
                    }
                    if (obj?.usage_guard) {
                        guards.push(obj?.usage_guard)
                    }
                }
            }
            if (this?.arb_vote !== undefined) {
                perms.push(PermissionIndex.treasury_receive)
            }
            if (typeof(this?.arb_vote?.voting_guard) === 'string' && IsValidAddress(this?.arb_vote?.voting_guard)) {
                guards.push(this?.arb_vote?.voting_guard)
            }

            return await this.check_permission(this.permission, perms, guards, checkOwner)
        }
        this.operate(new TransactionBlock());
    }
    protected async operate(txb:TransactionBlock, passport?:PassportObject) {
        let obj : Arbitration | undefined ; let permission: any; let withdraw_treasury:any;
        if (this.object === 'new' && this?.type_parameter) {
            if (!this?.permission || !IsValidAddress(this?.permission)) {
                permission = Permission.New(txb, '');
            }
            if (!this?.fee_treasury || !IsValidAddress(this?.fee_treasury)) {
                withdraw_treasury = Treasury.New(txb, this?.type_parameter, permission ?? this?.permission, '', permission?undefined:passport);
            }
            obj = Arbitration.New(txb, this.type_parameter, permission ?? this?.permission, this?.description??'', 
                BigInt(this?.fee ?? 0), withdraw_treasury??this.fee_treasury, permission?undefined:passport);
        } else {
            if (IsValidAddress(this.object) && this.type_parameter && this.permission && IsValidAddress(this?.permission)) {
                obj = Arbitration.From(txb, this.type_parameter, this.permission, this.object)
            }
        }

        if (obj) {
            if (this?.description !== undefined && this.object !== 'new') {
                obj?.set_description(this.description, passport);
            }
            if (this?.bPaused !== undefined) {
                obj?.pause(this.bPaused, passport);
            }
            if (this?.endpoint !== undefined) {
                obj?.set_endpoint(this.endpoint, passport)
            }
            if (this?.fee !== undefined && this.object !== 'new') {
                obj?.set_fee(BigInt(this.fee), passport)
            }
            if (this.fee_treasury !== undefined && this.object !== 'new') {
                obj?.set_withdrawTreasury(this.fee_treasury, passport)
            }
            if (this.usage_guard !== undefined) {
                obj?.set_guard(this.usage_guard, passport)
            }
            if (this?.voting_guard !== undefined) {
                switch (this.voting_guard.op) {
                    case 'add':
                        obj?.add_voting_guard(this.voting_guard.data, passport)
                        break;
                    case 'remove':
                        obj?.remove_voting_guard(this.voting_guard.guards, false, passport)
                        break;
                    case 'set':
                        obj?.remove_voting_guard([], true, passport)
                        obj?.add_voting_guard(this.voting_guard.data, passport)
                        break;
                    case 'removeall':
                        obj?.remove_voting_guard([], true, passport)
                        break;
                }
            }
            
            if (this?.arb_new !== undefined) {
                obj?.dispute(this.arb_new.data, passport)
            }
            if (this?.arb_arbitration !== undefined) {
                obj?.arbitration(this.arb_arbitration, passport)
            }
            if (this?.arb_vote !== undefined) {
                obj?.vote(this.arb_vote, passport)
            }
            if (this?.arb_withdraw_fee !== undefined) {
                obj?.withdraw_fee(this.arb_withdraw_fee.arb, this.arb_withdraw_fee.data, passport)
            }
            if (this?.permission_new !== undefined) {
                obj?.change_permission(this.permission_new);
            }
            if (withdraw_treasury) {
                withdraw_treasury.launch();
            }
            if (permission) {
                permission.launch();
            }
            if (this.object === 'new') {
                obj?.launch();
            }
        }
    }
}

export class CallPersonal extends CallBase {
    information?: Entity_Info;
    transfer_to?: string;
    marks?: {op:'add mark'; data:{mark_name:string; address:string[]}}
        | {op:'add address'; data:{address:string; mark_name:string[]}} 
        | {op:'remove mark'; data:{mark_name:string; address:string[]}}
        | {op:'remove address'; data:{address:string; mark_name:string[]}}
        | {op:'clear mark'; mark_name:string};
    tags?: {op:'add'; data:{address:string; nick_name:string; tags:string[]}}
        | {op:'remove'; address:string};
    close?: boolean; // close a personal resource
    constructor(object: string | 'new' = 'new') { super(object) }
    async call() : Promise<WitnessFill[] | undefined>  {
        this.operate(new TransactionBlock());
        return
    }
    protected async operate (txb:TransactionBlock, passport?:PassportObject) {
        let obj : Resource | undefined ; let entity: Entity = Entity.From(txb);
        if (this.object === 'new') {
            obj = Resource.From(txb, entity.create_resource2());
        } else {
            if (IsValidAddress(this.object)) {
                obj = Resource.From(txb, this.object)
                if (this?.close) {
                    entity.destroy_resource(obj)
                    return ; //@ return 
                }
            }
        }

        if (this?.information !== undefined ) {
            entity.update(this.information)
        }

        if (obj && obj?.get_object()) {
            if (this?.marks !== undefined) {
                switch(this.marks.op) {
                    case 'add address':
                        obj?.add2(this.marks.data.address, this.marks.data.mark_name)
                        break;
                    case 'add mark':
                        if (this.marks.data.mark_name === MarkName.DislikeName || this.marks.data.mark_name === MarkName.LikeName) {
                            const n = this.marks.data.mark_name;
                            this.marks.data.address.forEach(v => {if (obj) entity.mark(obj, v, n)})
                        } else {
                            obj?.add(this.marks.data.mark_name, this.marks.data.address)
                        }
                        break;
                    case 'clear mark':
                        obj?.remove(this.marks.mark_name, [], true)
                        break;
                    case 'remove address':
                        obj?.remove2(this.marks.data.address, this.marks.data.mark_name)
                        break;
                    case 'remove mark':
                        if (this.marks.data.mark_name === MarkName.DislikeName || this.marks.data.mark_name === MarkName.LikeName) {
                            const n = this.marks.data.mark_name;
                            this.marks.data.address.forEach(v => {if (obj) entity.mark(obj, v, n)})
                        } else {
                            obj?.remove(this.marks.data.mark_name, this.marks.data.address)
                        }
                        break;
                }
            }
            if (this?.tags !== undefined) {
                switch(this.tags.op) {
                    case 'add':
                        obj?.add_tags(this.tags.data.address, this.tags.data.nick_name, this.tags.data.tags)
                        break;
                    case 'remove':
                        obj?.remove_tags(this.tags.address)
                        break;
                }
            }
            if (this?.transfer_to !== undefined && obj) {
                entity.transfer_resource(obj, this.transfer_to);
            }

            if (this.object === 'new') {
                obj?.launch();
            }
        }
    }
}