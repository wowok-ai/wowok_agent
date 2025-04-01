"use strict";(this.webpackChunkwowok_agent=this.webpackChunkwowok_agent||[]).push([[873],{5873:(e,i,r)=>{r.d(i,{_$:()=>d,aX:()=>c,w6:()=>s});var s,t=r(9554),n=r(1609),a=r(5337),o=r(9876);!function(e){e[e.repository=100]="repository",e[e.repository_description=101]="repository_description",e[e.repository_mode=102]="repository_mode",e[e.repository_policies=103]="repository_policies",e[e.repository_reference=104]="repository_reference",e[e.service=200]="service",e[e.service_description=201]="service_description",e[e.service_sales=202]="service_sales",e[e.service_payee=203]="service_payee",e[e.service_repository=204]="service_repository",e[e.service_withdraw_guards=205]="service_withdraw_guards",e[e.service_refund_guards=206]="service_refund_guards",e[e.service_discount_transfer=207]="service_discount_transfer",e[e.service_withdraw=208]="service_withdraw",e[e.service_buyer_guard=209]="service_buyer_guard",e[e.service_machine=210]="service_machine",e[e.service_endpoint=211]="service_endpoint",e[e.service_publish=212]="service_publish",e[e.service_clone=213]="service_clone",e[e.service_customer_required=214]="service_customer_required",e[e.service_pause=215]="service_pause",e[e.service_treasury=216]="service_treasury",e[e.service_arbitration=217]="service_arbitration",e[e.demand=260]="demand",e[e.demand_refund=261]="demand_refund",e[e.demand_expand_time=262]="demand_expand_time",e[e.demand_guard=263]="demand_guard",e[e.demand_description=264]="demand_description",e[e.demand_yes=265]="demand_yes",e[e.machine=600]="machine",e[e.machine_description=601]="machine_description",e[e.machine_repository=602]="machine_repository",e[e.machine_clone=604]="machine_clone",e[e.machine_node=606]="machine_node",e[e.machine_endpoint=608]="machine_endpoint",e[e.machine_pause=609]="machine_pause",e[e.machine_publish=610]="machine_publish",e[e.progress=650]="progress",e[e.progress_namedOperator=651]="progress_namedOperator",e[e.progress_bind_task=652]="progress_bind_task",e[e.progress_context_repository=653]="progress_context_repository",e[e.progress_unhold=654]="progress_unhold",e[e.progress_parent=655]="progress_parent",e[e.treasury=700]="treasury",e[e.treasury_receive=701]="treasury_receive",e[e.treasury_deposit=702]="treasury_deposit",e[e.treasury_withdraw=703]="treasury_withdraw",e[e.treasury_descritption=704]="treasury_descritption",e[e.treasury_deposit_guard=705]="treasury_deposit_guard",e[e.treasury_withdraw_mode=706]="treasury_withdraw_mode",e[e.treasury_withdraw_guard=707]="treasury_withdraw_guard",e[e.arbitration=800]="arbitration",e[e.arbitration_description=801]="arbitration_description",e[e.arbitration_fee=802]="arbitration_fee",e[e.arbitration_voting_guard=803]="arbitration_voting_guard",e[e.arbitration_endpoint=804]="arbitration_endpoint",e[e.arbitration_guard=805]="arbitration_guard",e[e.arbitration_pause=806]="arbitration_pause",e[e.arbitration_vote=807]="arbitration_vote",e[e.arbitration_arbitration=808]="arbitration_arbitration",e[e.arbitration_withdraw=809]="arbitration_withdraw",e[e.arbitration_treasury=810]="arbitration_treasury",e[e.user_defined_start=1e3]="user_defined_start"}(s||(s={}));const d=[{index:s.repository,name:"Repository",description:"Launch new Repository",module:t.e$.repository},{index:s.repository_description,name:"Description",description:"Set Repository description",module:t.e$.repository},{index:s.repository_mode,name:"Policy mode",description:"Set Repository mode",module:t.e$.repository},{index:s.repository_policies,name:"Policy",description:"Set Repository policies",module:t.e$.repository},{index:s.repository_reference,name:"Reference",description:"Set Repository reference",module:t.e$.repository},{index:s.service,name:"Service",description:"Launch new Service",module:t.e$.service},{index:s.service_description,name:"Description",description:"Set Service description",module:t.e$.service},{index:s.service_sales,name:"Sales",description:"Set Service sales items",module:t.e$.service},{index:s.service_payee,name:"Payee",description:"Set Service payee",module:t.e$.service},{index:s.service_repository,name:"Repository",description:"Set Service repositories",module:t.e$.service},{index:s.service_withdraw_guards,name:"Withdraw Guard",description:"Set Service withdraw guards",module:t.e$.service},{index:s.service_refund_guards,name:"Refund Guard",description:"Set Service refund guards",module:t.e$.service},{index:s.service_discount_transfer,name:"Discount",description:"Launch discounts for Service",module:t.e$.service},{index:s.service_buyer_guard,name:"Buyer Guard",description:"Set Guard of buying for Service",module:t.e$.service},{index:s.service_machine,name:"Machine",description:"Set Machine for Service",module:t.e$.service},{index:s.service_endpoint,name:"Endpoint",description:"Set Service endpoint",module:t.e$.service},{index:s.service_publish,name:"Publish",description:"Allowing the creation of Order",module:t.e$.service},{index:s.service_clone,name:"Clone",description:"Clone Service",module:t.e$.service},{index:s.service_customer_required,name:"Buyer info",description:"Set Service buyer info required",module:t.e$.service},{index:s.service_pause,name:"Pause",description:"Pause/Unpause Service",module:t.e$.service},{index:s.service_treasury,name:"Treasury",description:"Externally withdrawable treasury for compensation or rewards",module:t.e$.service},{index:s.service_arbitration,name:"Arbitration",description:"Add/Remove arbitration that allows refunds from orders at any time based on arbitration results",module:t.e$.service},{index:s.demand,name:"Demand",description:"Launch new Demand",module:t.e$.demand},{index:s.demand_refund,name:"Refund",description:"Refund from Demand",module:t.e$.demand},{index:s.demand_expand_time,name:"Expand deadline",description:"Expand Demand deadline",module:t.e$.demand},{index:s.demand_guard,name:"Guard",description:"Set Demand guard",module:t.e$.demand},{index:s.demand_description,name:"Description",description:"Set Demand description",module:t.e$.demand},{index:s.demand_yes,name:"Yes",description:"Pick the Deamand serice",module:t.e$.demand},{index:s.machine,name:"Machine",description:"Launch new Machine",module:t.e$.machine},{index:s.machine_description,name:"Description",description:"Set Machine description",module:t.e$.machine},{index:s.machine_repository,name:"Repository",description:"Set Machine repository",module:t.e$.machine},{index:s.machine_clone,name:"Clone",description:"Clone Machine",module:t.e$.machine},{index:s.machine_node,name:"Node",description:"Set Machine nodes",module:t.e$.machine},{index:s.machine_endpoint,name:"Endpoint",description:"Set Machine endpoint",module:t.e$.machine},{index:s.machine_pause,name:"Pause",description:"Pause/Unpause Machine",module:t.e$.machine},{index:s.machine_publish,name:"Publish",description:"Allowing the creation of Progress",module:t.e$.machine},{index:s.progress,name:"Progress",description:"Launch new Progress",module:t.e$.progress},{index:s.progress_namedOperator,name:"Operator",description:"Set Progress operators",module:t.e$.progress},{index:s.progress_bind_task,name:"Bind",description:"Set Progress task",module:t.e$.progress},{index:s.progress_context_repository,name:"Repository",description:"Set Progress repository",module:t.e$.progress},{index:s.progress_unhold,name:"Unhold",description:"Release Progress holdings",module:t.e$.progress},{index:s.progress_parent,name:"Parent",description:"Set Progress parent",module:t.e$.progress},{index:s.treasury,name:"Treasury",description:"Launch new Treasury",module:t.e$.treasury},{index:s.treasury_deposit,name:"Deposit",description:"Deposit coins",module:t.e$.treasury},{index:s.treasury_receive,name:"Receive",description:"Receive coins from some address sent",module:t.e$.treasury},{index:s.treasury_withdraw,name:"Withdraw",description:"Withdraw coins",module:t.e$.treasury},{index:s.treasury_withdraw_guard,name:"Withdraw Guard",description:"Add/Remove Treasury withdraw guard",module:t.e$.treasury},{index:s.treasury_withdraw_mode,name:"Withdraw mode",description:"Set Treasury withdraw mode",module:t.e$.treasury},{index:s.treasury_deposit_guard,name:"Deposit Guard",description:"Set Treasury deposit guard",module:t.e$.treasury},{index:s.treasury_descritption,name:"Description",description:"Set Treasury description",module:t.e$.treasury},{index:s.arbitration,name:"Arbitration",description:"Launch new Arbitration",module:t.e$.arbitration},{index:s.arbitration_description,name:"Description",description:"Set Arbitration description",module:t.e$.arbitration},{index:s.arbitration_endpoint,name:"Endpoint",description:"Set Arbitration endpoint",module:t.e$.arbitration},{index:s.arbitration_fee,name:"Fee",description:"Set Arbitration fee",module:t.e$.arbitration},{index:s.arbitration_guard,name:"Guard",description:"Set Guard to apply for arbitration",module:t.e$.arbitration},{index:s.arbitration_arbitration,name:"Arbitrate",description:"Determine the outcome of arbitration",module:t.e$.arbitration},{index:s.arbitration_pause,name:"Pause",description:"Allowing/forbidding the creation of Arb",module:t.e$.arbitration},{index:s.arbitration_voting_guard,name:"Voting Guard",description:"Add/Remove voting Guard",module:t.e$.arbitration},{index:s.arbitration_vote,name:"Vote",description:"Vote on the application for arbitration",module:t.e$.arbitration},{index:s.arbitration_withdraw,name:"Withdraw",description:"Withdraw the arbitration fee",module:t.e$.arbitration},{index:s.arbitration_treasury,name:"Withdraw",description:"Set Treasury that fees was collected at the time of withdrawal",module:t.e$.arbitration}];class c{txb;object;get_object(){return this.object}constructor(e){this.txb=e,this.object=""}static From(e,i){let r=new c(e);return r.object=t.Zs.TXB_OBJECT(e,i),r}static New(e,i){(0,n.yW)(i)||(0,a.f)(a.I.IsValidDesription);let r=new c(e);return r.object=e.moveCall({target:t.Zs.Instance().permissionFn("new"),arguments:[e.pure.string(i)]}),r}launch(){return this.txb.moveCall({target:t.Zs.Instance().permissionFn("create"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object)]})}add_bizPermission(e,i){c.IsValidBizPermissionIndex(e)||(0,a.f)(a.I.IsValidBizPermissionIndex,"add_bizPermission"),(0,n.S7)(i)||(0,a.f)(a.I.IsValidName,"add_bizPermission"),this.txb.moveCall({target:t.Zs.Instance().permissionFn("user_define_add"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object),this.txb.pure.u64(e),this.txb.pure.string(i)]})}remove_bizPermission(e){c.IsValidBizPermissionIndex(e)||(0,a.f)(a.I.IsValidBizPermissionIndex,"remove_bizPermission"),this.txb.moveCall({target:t.Zs.Instance().permissionFn("user_define_remove"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object),this.txb.pure.u64(e)]})}transfer_permission(e,i){(0,n.jE)(e)&&(0,n.jE)(i)||(0,a.f)(a.I.IsValidAddress,"transfer_permission"),this.txb.moveCall({target:t.Zs.Instance().permissionFn("change_entity"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object),this.txb.pure.address(e),this.txb.pure.address(i)]})}add_entity2(e,i){0!==e.length&&((0,n.ij)(e,n.jE)||(0,a.f)(a.I.IsValidArray,"add_entity2"),void 0!==i?this.txb.moveCall({target:t.Zs.Instance().permissionFn("add_with_index"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object),this.txb.pure.u64(i),this.txb.pure.vector("address",(0,n.SI)(e))]}):this.txb.moveCall({target:t.Zs.Instance().permissionFn("add"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object),this.txb.pure.vector("address",(0,n.SI)(e))]}))}add_entity3(e){if(0===e.length)return;const i=[];e.forEach((e=>{e.entities.forEach((r=>{const s=i.find((e=>e.address===r.address));if(s){const i=s.permissions.find((i=>i.index===e.index));i?i.guard=r.guard:s.permissions.push({guard:r.guard,index:e.index})}else i.push({address:r.address,permissions:[{guard:r.guard,index:e.index}]})}))})),this.add_entity(i)}add_entity(e){if(0===e.length)return;let i=!0;e.forEach((e=>{(0,n.jE)(e.address)||(i=!1),e.permissions.forEach((e=>{c.IsValidPermissionIndex(e.index)||(i=!1),e?.guard&&!t.Zs.IsValidObjects([e.guard])&&(i=!1)}))})),i||(0,a.f)(a.I.InvalidParam,"add_entity.entities");let r=[];for(let i=0;i<e.length;i++){let s=e[i],n=[];for(let e=0;e<s.permissions.length;e++){let i=s.permissions[e];c.IsValidPermissionIndex(i.index)&&(n.includes(i.index)||(n.push(i.index),i?.guard&&r.push({address:s.address,index:i.index,guard:i.guard})))}n.length>0&&this.txb.moveCall({target:t.Zs.Instance().permissionFn("add_batch"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object),this.txb.pure.address(s.address),this.txb.pure.vector("u64",n)]})}r.forEach((({address:e,index:i,guard:r})=>{this.txb.moveCall({target:t.Zs.Instance().permissionFn("guard_set"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object),this.txb.pure.address(e),this.txb.pure.u64(i),t.Zs.TXB_OBJECT(this.txb,r)]})}))}set_guard(e,i,r){(0,n.jE)(e)||(0,a.f)(a.I.IsValidAddress,"address"),c.IsValidPermissionIndex(i)||c.IsValidBizPermissionIndex(i)||(0,a.f)(a.I.IsValidPermissionIndex,"index"),r?this.txb.moveCall({target:t.Zs.Instance().permissionFn("guard_set"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object),this.txb.pure.address(e),this.txb.pure.u64(i),t.Zs.TXB_OBJECT(this.txb,r)]}):this.txb.moveCall({target:t.Zs.Instance().permissionFn("guard_none"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object),this.txb.pure.address(e),this.txb.pure.u64(i)]})}remove_index(e,i){(0,n.jE)(e)||(0,a.f)(a.I.IsValidAddress),0!==i.length&&((0,n.ij)(i,c.IsValidPermissionIndex)||(0,a.f)(a.I.InvalidParam,"index"),this.txb.moveCall({target:t.Zs.Instance().permissionFn("remove_index"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object),this.txb.pure.address(e),this.txb.pure.vector("u64",(0,n.SI)(i))]}))}remove_entity(e){0!==e.length&&((0,n.ij)(e,n.jE)||(0,a.f)(a.I.IsValidArray),this.txb.moveCall({target:t.Zs.Instance().permissionFn("remove"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object),this.txb.pure.vector("address",(0,n.SI)(e))]}))}set_description(e){(0,n.yW)(e)||(0,a.f)(a.I.IsValidDesription),this.txb.moveCall({target:t.Zs.Instance().permissionFn("description_set"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object),this.txb.pure.string(e)]})}add_admin(e){0!==e.length&&((0,n.ij)(e,n.jE)||(0,a.f)(a.I.IsValidArray),this.txb.moveCall({target:t.Zs.Instance().permissionFn("admin_add_batch"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object),this.txb.pure.vector("address",(0,n.SI)(e))]}))}remove_admin(e,i){(i||0!==e.length)&&((0,n.ij)(e,n.jE)||(0,a.f)(a.I.IsValidArray,"admin"),i?this.txb.moveCall({target:t.Zs.Instance().permissionFn("admins_clear"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object)]}):e&&this.txb.moveCall({target:t.Zs.Instance().permissionFn("admin_remove_batch"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object),this.txb.pure.vector("address",(0,n.SI)(e))]}))}change_owner(e){(0,n.jE)(e)||(0,a.f)(a.I.IsValidAddress),this.txb.moveCall({target:t.Zs.Instance().permissionFn("builder_set"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object),this.txb.pure.address(e)]})}query_permissions_all(e){(0,n.jE)(e)||(0,a.f)(a.I.InvalidParam,"query_permissions"),this.txb.moveCall({target:t.Zs.Instance().permissionFn("query_permissions_all"),arguments:[t.Zs.TXB_OBJECT(this.txb,this.object),this.txb.pure.address(e)]})}QueryPermissions(e,i,r,s){this.query_permissions_all(i),t.Zs.Client().devInspectTransactionBlock({sender:s??i,transactionBlock:this.txb}).then((s=>{if(s.results&&s.results[0].returnValues&&2!==s.results[0].returnValues.length)return void r({who:i,object:e});const t=n.ji.getInstance().de(o.r8.U8,Uint8Array.from(s.results[0].returnValues[0][0]));if(t===c.PERMISSION_ADMIN||t===c.PERMISSION_OWNER_AND_ADMIN)r({who:i,admin:!0,owner:t%2==1,items:[],object:e});else{const a=n.ji.getInstance().de_perms(Uint8Array.from(s.results[0].returnValues[1][0]));r({who:i,admin:!1,owner:t%2==1,items:a.map((e=>({query:e?.index,permission:!0,guard:e?.guard}))),object:e})}})).catch((s=>{console.log(s),r({who:i,object:e})}))}static HasPermission(e,i,r=!1){if(e){if(e.admin)return{has:!0,owner:e.owner};let r=e.items?.find((e=>e.query==i));return r?{has:r.permission,guard:r.guard,owner:e.owner}:{has:!1,guard:void 0,owner:e?.owner}}if(r)return{has:!1,guard:void 0,owner:!1}}static MAX_ADMIN_COUNT=64;static MAX_ENTITY_COUNT=2e3;static MAX_PERMISSION_INDEX_COUNT=200;static MAX_PERSONAL_PERMISSION_COUNT=200;static PERMISSION_NORMAL=0;static PERMISSION_OWNER=1;static PERMISSION_ADMIN=2;static PERMISSION_OWNER_AND_ADMIN=3;static BUSINESS_PERMISSIONS_START=s.user_defined_start;static IsValidBizPermissionIndex=e=>e>=c.BUSINESS_PERMISSIONS_START&&(0,n.Ec)(e);static IsValidPermissionIndex=e=>!!Object.values(s).includes(e)||c.IsValidBizPermissionIndex(e)}}}]);