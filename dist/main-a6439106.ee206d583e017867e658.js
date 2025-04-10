"use strict";(this.webpackChunkwowok_agent=this.webpackChunkwowok_agent||[]).push([[63],{3605:(e,a,s)=>{s.d(a,{U:()=>o});var t=s(7838),r=s(9605),i=s(9869),d=s(5882);class o extends i.s{constructor(e){super(),this.data=e}async call(e){this.data.type_parameter&&(0,t.IsValidArgType)(this.data.type_parameter)||(0,t.ERROR)(t.Errors.IsValidArgType,"service.type_parameter");const a=[],s=[];var i;const d=this.data?.permission?.address,o=this.data?.object?.address,n=this.data?.payee_treasury?.address;if(d&&(0,t.IsValidAddress)(d)){if(this.data?.object||s.push(t.PermissionIndex.service),void 0!==this.data?.description&&o&&s.push(t.PermissionIndex.service_description),void 0!==this.data?.bPaused&&s.push(t.PermissionIndex.service_pause),this.data?.bPublished&&s.push(t.PermissionIndex.service_publish),void 0!==this.data?.endpoint&&s.push(t.PermissionIndex.service_endpoint),void 0!==this.data?.repository&&s.push(t.PermissionIndex.service_repository),void 0!==this.data?.clone_new&&s.push(t.PermissionIndex.service_clone),void 0!==this.data?.gen_discount&&s.push(t.PermissionIndex.service_discount_transfer),void 0!==this.data?.arbitration&&s.push(t.PermissionIndex.service_arbitration),void 0!==this.data?.buy_guard&&s.push(t.PermissionIndex.service_buyer_guard),void 0!==this.data?.endpoint&&s.push(t.PermissionIndex.service_endpoint),void 0!==this.data?.extern_withdraw_treasury&&s.push(t.PermissionIndex.service_treasury),void 0!==this.data?.machine&&s.push(t.PermissionIndex.service_machine),void 0!==n&&o&&s.push(t.PermissionIndex.service_payee),void 0!==this.data?.withdraw_guard&&s.push(t.PermissionIndex.service_withdraw_guards),void 0!==this.data?.refund_guard&&s.push(t.PermissionIndex.service_refund_guards),void 0!==this.data?.customer_required_info&&s.push(t.PermissionIndex.service_customer_required),void 0!==this.data?.sales&&s.push(t.PermissionIndex.service_sales),void 0!==this.data?.order_new?.guard)if((0,t.IsValidAddress)(this.data.order_new.guard))a.push(this.data.order_new.guard);else if(this.data.object){if(!i){const e=await(0,r.w$)({objects:[o],showContent:!0});e?.objects&&"Service"===e.objects[0].type&&(i=e.objects[0])}i?.buy_guard&&a.push(i?.buy_guard)}else this.data?.buy_guard&&(0,t.IsValidAddress)(this.data.buy_guard)&&a.push(this.data?.buy_guard);return(0,t.IsValidAddress)(this.data?.order_refund?.guard)&&a.push(this.data?.order_refund?.guard),void 0!==this.data.order_withdrawl&&s.push(t.PermissionIndex.service_withdraw),"string"==typeof this.data?.order_withdrawl?.data?.withdraw_guard&&(0,t.IsValidAddress)(this.data?.order_withdrawl?.data?.withdraw_guard)&&a.push(this.data?.order_withdrawl?.data?.withdraw_guard),await this.check_permission_and_call(d,s,a,!1,void 0,e)}return await this.exec(e)}async operate(e,a,s){let r,i,o;const n=this.data?.permission?.address,h=this.data?.object?.address,c=this.data?.payee_treasury?.address;if(h)(0,t.IsValidAddress)(h)&&this.data.type_parameter&&n&&(0,t.IsValidAddress)(n)?r=t.Service.From(e,this.data.type_parameter,n,h):(0,t.ERROR)(t.Errors.InvalidParam,"object or permission address invalid.");else{if(!n||!(0,t.IsValidAddress)(n)){const a=this.data?.permission?.description??"";i=t.Permission.New(e,a)}if(!c||!(0,t.IsValidAddress)(c)){const s=this.data?.payee_treasury?.description??"";o=t.Treasury.New(e,this.data?.type_parameter,i??n,s,i?void 0:a)}r=t.Service.New(e,this.data.type_parameter,i?i.get_object():n,this.data?.description??"",o?o.get_object():c,i?void 0:a)}if(r){const n=i?void 0:a;if(void 0!==this.data?.description&&h&&r?.set_description(this.data.description,n),void 0!==this.data?.endpoint&&r?.set_endpoint(this.data.endpoint,n),void 0!==this.data?.payee_treasury&&h&&r?.set_payee(c,n),void 0!==this.data?.gen_discount&&r?.discount_transfer(this.data.gen_discount,n),void 0!==this.data?.repository)switch(this.data.repository.op){case"add":this.data.repository.repositories.forEach((e=>r?.add_repository(e,n)));break;case"remove":r?.remove_repository(this.data.repository.repositories,!1,n);break;case"set":r?.remove_repository([],!0,n),this.data.repository.repositories.forEach((e=>r?.add_repository(e,n)));break;case"removeall":r?.remove_repository([],!0,n)}if(void 0!==this.data?.extern_withdraw_treasury)switch(this.data.extern_withdraw_treasury.op){case"add":this.data.extern_withdraw_treasury.treasuries.forEach((e=>r?.add_treasury(e.token_type,e.address,n)));break;case"set":r?.remove_treasury([],!0,n),this.data.extern_withdraw_treasury.treasuries.forEach((e=>r?.add_treasury(e.token_type,e.address,n)));break;case"remove":r?.remove_treasury(this.data.extern_withdraw_treasury.addresses,!1,n);break;case"removeall":r?.remove_treasury([],!1,n)}if(void 0!==this.data?.machine&&r?.set_machine(this.data.machine,n),void 0!==this.data?.arbitration)switch(this.data.arbitration.op){case"add":this.data.arbitration.arbitrations.forEach((e=>r?.add_arbitration(e.address,e.token_type,n)));break;case"set":r?.remove_arbitration([],!0,n),this.data.arbitration.arbitrations.forEach((e=>r?.add_arbitration(e.address,e.token_type,n)));break;case"remove":r?.remove_arbitration(this.data.arbitration.addresses,!1,n);break;case"removeall":r?.remove_arbitration([],!1,n)}if(void 0!==this.data?.customer_required_info&&(this.data.customer_required_info.required_info&&this.data.customer_required_info.pubkey?r?.set_customer_required(this.data.customer_required_info.pubkey,this.data.customer_required_info.required_info,n):this.data.customer_required_info.pubkey&&r?.change_required_pubkey(this.data.customer_required_info.pubkey,n)),void 0!==this.data?.sales)switch(this.data.sales.op){case"add":r?.add_sales(this.data.sales.sales,!1,n);break;case"remove":r?.remove_sales(this.data.sales.sales_name,n)}if(void 0!==this.data?.withdraw_guard)switch(this.data.withdraw_guard.op){case"add":r?.add_withdraw_guards(this.data.withdraw_guard.guards,n);break;case"set":r?.remove_withdraw_guards([],!0,n),r?.add_withdraw_guards(this.data.withdraw_guard.guards,n);break;case"remove":r?.remove_withdraw_guards(this.data.withdraw_guard.addresses,!1,n);break;case"removeall":r?.remove_withdraw_guards([],!0,n)}if(void 0!==this.data?.refund_guard)switch(this.data.refund_guard.op){case"add":r?.add_refund_guards(this.data.refund_guard.guards,n);break;case"set":r?.remove_refund_guards([],!0,n),r?.add_refund_guards(this.data.refund_guard.guards,n);break;case"remove":r?.remove_refund_guards(this.data.refund_guard.addresses,!1,n);break;case"removeall":r?.remove_refund_guards([],!0,n)}var p;if(this.data?.bPublished&&r?.publish(n),void 0!==this.data?.order_new){let a,t=BigInt(0);this.data.order_new.buy_items.forEach((e=>{t+=BigInt(e.max_price)*BigInt(e.count)})),t>BigInt(0)&&(a=await d.g.Instance().get_coin_object(e,t,s,this.data.type_parameter),a&&(p=r.order(this.data.order_new.buy_items,a,this.data.order_new.discount,this.data.order_new.machine,this.data.order_new.customer_info_crypto,n)))}if(void 0!==this.data?.order_agent){const e=this.data.order_agent.order??p?.order;e||(0,t.ERROR)(t.Errors.Fail,"order invalid: order_agent"),r?.set_order_agent(e,this.data.order_agent.agents,this.data.order_agent.progress)}if(void 0!==this.data?.order_required_info&&void 0!==this.data.order_required_info.info){const e=this.data.order_required_info.order??p?.order;e||(0,t.ERROR)(t.Errors.Fail,"order invalid: order_required_info"),r?.update_order_required_info(e,this.data.order_required_info.info)}if(void 0!==this.data?.order_refund){const e=this.data.order_refund.order??p?.order;e||(0,t.ERROR)(t.Errors.Fail,"order invalid: order_refund"),this.data?.order_refund?.arb&&this.data?.order_refund?.arb_token_type?r?.refund_withArb(e,this.data?.order_refund?.arb,this.data?.order_refund?.arb_token_type):r?.refund(e,this.data?.order_refund?.guard,n)}if(void 0!==this.data?.order_withdrawl&&n){const e=this.data.order_withdrawl.order??p?.order;e||(0,t.ERROR)(t.Errors.Fail,"order invalid: order_withdrawl"),r?.withdraw(e,this.data.order_withdrawl.data,n)}if(void 0!==this.data?.order_payer&&r){const e=this.data.order_payer.order??p?.order;e||(0,t.ERROR)(t.Errors.Fail,"order invalid: order_payer"),r?.change_order_payer(e,this.data.order_payer.payer_new,this.data.order_payer.progress)}if(p&&this?.data?.order_new){const a=r.order_launch(p);await this.new_with_mark(e,a.order,this.data?.order_new?.namedNewOrder,s,[t.TagName.Launch,t.TagName.Order]),a?.progress&&await this.new_with_mark(e,a.progress,this.data?.order_new?.namedNewProgress,s,[t.TagName.Launch])}void 0!==this.data?.buy_guard&&r?.set_buy_guard(this.data.buy_guard,n),void 0!==this.data?.bPaused&&r?.pause(this.data.bPaused,n),void 0!==this.data?.clone_new&&r&&await this.new_with_mark(e,r.clone(this.data.clone_new?.token_type_new,!0,n),this.data?.clone_new?.namedNew,s),o&&await this.new_with_mark(e,o.launch(),this.data?.payee_treasury?.namedNew,s),i&&await this.new_with_mark(e,i.launch(),this.data?.permission?.namedNew,s),h||await this.new_with_mark(e,r.launch(),this.data?.object?.namedNew,s)}}}},4192:(e,a,s)=>{s.d(a,{N:()=>i,Y:()=>r});var t=s(7838);const r=async e=>{try{const a=JSON.parse(e);return JSON.stringify({data:await i(a)})}catch(e){return JSON.stringify({error:e?.toString()})}},i=e=>{switch(e.type){case"OnNewArb":return d(e.cursor,e.limit,e.order);case"OnNewProgress":return n(e.cursor,e.limit,e.order);case"OnPresentService":return o(e.cursor,e.limit,e.order);case"OnNewOrder":return h(e.cursor,e.limit,e.order)}},d=async(e,a,s)=>await c(t.Protocol.Instance().package("wowok")+"::arb::NewArbEvent",e,a,s),o=async(e,a,s)=>await c(t.Protocol.Instance().package("wowok")+"::demand::PresentEvent",e,a,s),n=async(e,a,s)=>await c(t.Protocol.Instance().package("wowok")+"::progress::NewProgressEvent",e,a,s),h=async(e,a,s)=>await c(t.Protocol.Instance().package("wowok")+"::order::NewOrderEvent",e,a,s),c=async(e,a,s,r)=>{const i=await t.Protocol.Client().queryEvents({query:{MoveEventType:e},cursor:a,limit:s,order:r}),d=i?.data?.map((e=>{if(e?.packageId===t.Protocol.Instance().package("wowok")){if(e?.type?.includes("::order::NewOrderEvent"))return{id:e?.id,time:e?.timestampMs,type_raw:e?.type,sender:e?.sender,type:"NewOrderEvent",order:e?.parsedJson?.object,service:e?.parsedJson?.service,progress:e?.parsedJson?.progress,amount:e?.parsedJson?.amount};if(e?.type?.includes("::demand::PresentEvent"))return{id:e?.id,time:e?.timestampMs,type_raw:e?.type,sender:e?.sender,type:"NewOrderEvent",demand:e?.parsedJson?.object,service:e?.parsedJson?.service,recommendation:e?.parsedJson?.tips};if(e?.type?.includes("::progress::NewProgressEvent"))return{id:e?.id,time:e?.timestampMs,type_raw:e?.type,sender:e?.sender,type:"NewOrderEvent",progress:e?.parsedJson?.object,machine:e?.parsedJson?.machine,task:e?.parsedJson?.task};if(e?.type?.includes("::arb::NewArbEvent"))return{id:e?.id,time:e?.timestampMs,type_raw:e?.type,sender:e?.sender,type:"NewOrderEvent",arb:e?.parsedJson?.object,arbitration:e?.parsedJson?.arbitration,order:e?.parsedJson?.order};if(e?.type?.includes("::entity::NewEntityEvent"))return{id:e?.id,time:e?.timestampMs,type_raw:e?.type,sender:e?.sender,type:"NewOrderEvent",resource:e?.parsedJson?.resource?.some,address:e?.parsedJson?.target}}return{id:e?.id,time:e?.timestampMs,type_raw:e?.type,sender:e?.sender,type:""}}));return{data:d,hasNextPage:i?.hasNextPage,nextCursor:i?.nextCursor}}},4745:(e,a,s)=>{s.d(a,{H:()=>d});var t=s(9869),r=s(7838),i=s(9605);class d extends t.s{constructor(e){super(),this.data=e}async call(e){if((0,r.IsValidAddress)(this.data.new_permission)||(0,r.ERROR)(r.Errors.InvalidParam,"CallObjectPermission_Data.new_permission"+this.data.new_permission),this.data?.objects.length>0)return await this.exec(e)}async operate(e,a){const s=await(0,i.w$)({objects:this.data.objects,showContent:!0});s.objects?.forEach((a=>{switch(a.type){case"Demand":const s=a;r.Demand.From(e,r.Demand.parseObjectType(s.type_raw),s.permission,s.object).change_permission(this.data.new_permission);break;case"Machine":const t=a;r.Machine.From(e,t.permission,t.object).change_permission(this.data.new_permission);break;case"Service":const i=a;r.Service.From(e,r.Service.parseObjectType(i.type_raw),i.permission,i.object).change_permission(this.data.new_permission);break;case"Treasury":const d=a;r.Treasury.From(e,r.Treasury.parseObjectType(d.type_raw),d.permission,d.object).change_permission(this.data.new_permission);break;case"Arbitration":const o=a;r.Arbitration.From(e,r.Arbitration.parseObjectType(o.type_raw),o.permission,o.object).change_permission(this.data.new_permission);break;case"Repository":const n=a;r.Repository.From(e,n.permission,n.object).change_permission(this.data.new_permission)}}))}}},7340:(e,a,s)=>{s.d(a,{R:()=>i});var t=s(7838),r=s(9869);class i extends r.s{constructor(e){super(),this.data=e}async call(e){return await this.exec(e)}async operate(e,a,s){let r,i=t.Entity.From(e);const d=this.data?.object?.address;if(r=d&&(0,t.IsValidAddress)(d)?t.Resource.From(e,d):t.Resource.From(e,i.create_resource2()),"destroy"!==this.data?.mark?.op){if(void 0!==this.data?.information&&i.update(this.data.information),r&&r?.get_object()){if(void 0!==this.data?.mark)switch(this.data.mark.op){case"add or set":this.data.mark.data.forEach((e=>{r?.add(e.address,e.tags,e.name)}));break;case"remove":this.data.mark.data.forEach((e=>{r?.remove(e.address,e.tags)}));break;case"removeall":this.data.mark.addresses.forEach((e=>{r?.removeall(e)}))}"transfer"===this.data?.mark?.op&&r&&(0,t.IsValidAddress)(this.data.mark.address)&&i.transfer_resource(r,this.data.mark.address),"replace"===this.data?.mark?.op&&(0,t.IsValidAddress)(this.data.mark.address)&&i.use_resource(t.Resource.From(e,this.data.mark.address)),!d&&r&&await this.new_with_mark(e,r.launch(),this.data?.object?.namedNew,s)}}else i.destroy_resource(r)}}},7647:(e,a,s)=>{s.d(a,{Q:()=>i});var t=s(9869),r=s(7838);class i extends t.s{constructor(e){super(),this.data=e}async call(e){var a=!1,s=!1;const t=this.data?.object?.address;return t&&(0,r.IsValidAddress)(t)?(void 0===this.data?.builder&&void 0===this.data?.admin||(a=!0),void 0===this.data?.permission&&void 0===this.data?.biz_permission||(s=!0),void 0!==this.data?.description&&(s=!0),await this.check_permission_and_call(t,[],[],a,s,e)):await this.exec(e)}async operate(e,a,s){let t;const i=this.data?.object?.address;if(t=i&&(0,r.IsValidAddress)(i)?r.Permission.From(e,i):r.Permission.New(e,this.data?.description??""),t){if(void 0!==this.data?.description&&this.data.object&&t?.set_description(this.data.description),void 0!==this.data?.admin)switch(this.data.admin?.op){case"add":t?.add_admin(this.data.admin.addresses);break;case"remove":t?.remove_admin(this.data.admin.addresses);break;case"set":t?.remove_admin([],!0),t?.add_admin(this.data.admin.addresses);break;case"removeall":t?.remove_admin([],!0)}if(void 0!==this.data?.biz_permission)switch(this.data.biz_permission.op){case"add":this.data.biz_permission.data.forEach((e=>{t?.add_bizPermission(e.index,e.name)}));break;case"remove":this.data.biz_permission.permissions.forEach((e=>{t?.remove_bizPermission(e)}))}if(void 0!==this.data?.permission)switch(this.data.permission.op){case"add entity":t?.add_entity(this.data.permission.entities);break;case"add permission":t?.add_entity3(this.data.permission.permissions);break;case"remove entity":t?.remove_entity(this.data.permission.addresses);break;case"remove permission":t?.remove_index(this.data.permission.address,this.data.permission.index);break;case"transfer permission":t?.transfer_permission(this.data.permission.from_address,this.data.permission.to_address)}void 0!==this.data?.builder&&t?.change_owner(this.data.builder),i||await this.new_with_mark(e,t.launch(),this.data?.object?.namedNew,s)}}}},7832:(e,a,s)=>{s.d(a,{t:()=>i});var t=s(7838),r=s(9869);class i extends r.s{constructor(e){super(),this.data=e}async call(e){const a=[],s=this.data?.permission?.address,r=this.data?.object?.address;return s&&(0,t.IsValidAddress)(s)?(this.data?.object||a.push(t.PermissionIndex.repository),void 0!==this.data?.description&&r&&a.push(t.PermissionIndex.repository_description),void 0!==this.data?.mode&&r&&a.push(t.PermissionIndex.repository_mode),void 0!==this.data?.reference&&a.push(t.PermissionIndex.repository_reference),void 0!==this.data?.policy&&a.push(t.PermissionIndex.repository_policies),await this.check_permission_and_call(s,a,[],!1,void 0,e)):await this.exec(e)}async operate(e,a,s){let r,i;const d=this.data?.permission?.address,o=this.data?.object?.address;if(o)(0,t.IsValidAddress)(o)&&this.data.permission&&(0,t.IsValidAddress)(d)?r=t.Repository.From(e,d,o):(0,t.ERROR)(t.Errors.InvalidParam,"object or permission address invalid.");else{if(!d||!(0,t.IsValidAddress)(d)){const a=this.data?.permission?.description??"";i=t.Permission.New(e,a)}r=t.Repository.New(e,i?i.get_object():d,this.data?.description??"",this.data?.mode,i?void 0:a)}if(r){const t=i?void 0:a;if(void 0!==this.data?.description&&o&&r?.set_description(this.data.description,t),void 0!==this.data?.reference)switch(this.data.reference.op){case"set":r?.remove_reference([],!0,t),r?.add_reference(this.data.reference.addresses,t);break;case"add":r?.add_reference(this.data.reference.addresses,t);break;case"remove":r?.remove_reference(this.data.reference.addresses,!1,t);break;case"removeall":r?.remove_reference([],!0,t)}if(void 0!==this.data?.mode&&o&&r?.set_policy_mode(this.data.mode,t),void 0!==this.data?.policy)switch(this.data.policy.op){case"set":r?.remove_policies([],!0,t),r?.add_policies(this.data.policy.data,t);break;case"add":r?.add_policies(this.data.policy.data,t);break;case"remove":r?.remove_policies(this.data.policy.keys,!1,t);break;case"removeall":r?.remove_policies([],!0,t);break;case"rename":this.data.policy.data.forEach((e=>{r?.rename_policy(e.old,e.new,t)}))}if(void 0!==this.data?.data)switch(this.data.data.op){case"add":void 0!==this.data.data?.data?.key?r?.add_data(this.data.data.data):void 0!==this.data.data?.data?.address&&r?.add_data2(this.data.data.data);break;case"remove":this.data.data.data.forEach((e=>r?.remove(e.address,e.key)))}i&&await this.new_with_mark(e,i.launch(),this.data?.permission?.namedNew,s),this.data.object||await this.new_with_mark(e,r.launch(),this.data?.object?.namedNew,s)}}}},8947:(e,a,s)=>{s.d(a,{g:()=>d});var t=s(7838),r=s(9869),i=s(5882);class d extends r.s{constructor(e){super(),this.data=e}async call(e){const a=[],s=[],r=this.data?.permission?.address,d=this.data?.object?.address;if(r&&(0,t.IsValidAddress)(r)){if(this.data?.object||s.push(t.PermissionIndex.machine),void 0!==this.data?.description&&d&&s.push(t.PermissionIndex.machine_description),void 0!==this.data?.endpoint&&d&&s.push(t.PermissionIndex.machine_endpoint),void 0!==this.data?.consensus_repository&&s.push(t.PermissionIndex.machine_repository),void 0!==this.data?.nodes&&s.push(t.PermissionIndex.machine_node),this.data?.bPublished&&s.push(t.PermissionIndex.machine_publish),void 0!==this.data?.progress_new&&s.push(t.PermissionIndex.progress),void 0!==this.data?.progress_context_repository&&s.push(t.PermissionIndex.progress_context_repository),void 0!==this.data?.progress_namedOperator&&s.push(t.PermissionIndex.progress_namedOperator),void 0!==this.data?.progress_parent&&s.push(t.PermissionIndex.progress_parent),void 0!==this.data?.progress_task&&s.push(t.PermissionIndex.progress_bind_task),void 0!==this.data?.progress_hold&&this.data.progress_hold.adminUnhold&&s.push(t.PermissionIndex.progress_unhold),void 0!==this.data?.bPaused&&s.push(t.PermissionIndex.machine_pause),void 0!==this.data?.progress_next?.guard)if((0,t.IsValidAddress)(this.data?.progress_next?.guard))a.push(this.data?.progress_next?.guard);else if(this.data?.object&&(0,t.IsValidAddress)(d)){const e=await t.Progress.QueryForwardGuard(this.data?.progress_next.progress,d,await i.g.Instance().get_address()??"0xe386bb9e01b3528b75f3751ad8a1e418b207ad979fea364087deef5250a73d3f",this.data.progress_next.operation.next_node_name,this.data.progress_next.operation.forward);e&&a.push(e)}return await this.check_permission_and_call(r,s,a,!1,void 0,e)}return await this.exec(e)}async operate(e,a,s){let r,i;const d=this.data?.permission?.address,o=this.data?.object?.address;if(o)(0,t.IsValidAddress)(o)&&d&&(0,t.IsValidAddress)(d)?r=t.Machine.From(e,d,o):(0,t.ERROR)(t.Errors.InvalidParam,"object or permission address invalid.");else{if(!d||!(0,t.IsValidAddress)(d)){const a=this.data?.permission?.description??"";i=t.Permission.New(e,a)}r=t.Machine.New(e,i?i.get_object():d,this.data?.description??"",this.data?.endpoint??"",i?void 0:a)}if(r){const h=i?i.get_object():d,c=i?void 0:a;if(void 0!==this.data?.description&&o&&r?.set_description(this.data.description,c),void 0!==this.data?.endpoint&&o&&r?.set_endpoint(this.data.endpoint,c),void 0!==this.data?.consensus_repository)switch(this.data.consensus_repository.op){case"add":this.data.consensus_repository.repositories.forEach((e=>r?.add_repository(e,c)));break;case"remove":r?.remove_repository(this.data.consensus_repository.repositories,!1,c);break;case"removeall":r?.remove_repository([],!0,c);break;case"set":r?.remove_repository([],!0,c),this.data.consensus_repository.repositories.forEach((e=>r?.add_repository(e,c)))}if(void 0!==this.data?.nodes)switch(this.data?.nodes?.op){case"add":r?.add_node(this.data.nodes.data,c);break;case"remove":r?.remove_node(this.data.nodes.names,this.data.nodes?.bTransferMyself,c);break;case"rename node":this.data.nodes.data.forEach((e=>r?.rename_node(e.old,e.new,c)));break;case"add from myself":r?.add_node2(this.data.nodes.addresses,c);break;case"add forward":this.data.nodes.data.forEach((e=>r?.add_forward(e.prior_node_name,e.node_name,e.forward,e.threshold,e.remove_forward,c)));break;case"remove forward":this.data.nodes.data.forEach((e=>r?.remove_forward(e.prior_node_name,e.node_name,e.forward_name,c)));break;case"remove pair":this.data.nodes.pairs.forEach((e=>r?.remove_pair(e.prior_node_name,e.node_name,c)))}var n;if(this.data?.bPublished&&r?.publish(a),void 0!==this.data?.progress_new&&(n=t.Progress?.New(e,r?.get_object(),h,this.data?.progress_new.task_address,c)),void 0!==this.data?.progress_context_repository){const a=this.data?.progress_context_repository.progress??n?.get_object();a||(0,t.ERROR)(t.Errors.Fail,"progress invalid: progress_context_repository"),t.Progress.From(e,r?.get_object(),h,a).set_context_repository(this.data?.progress_context_repository.repository,c)}if(void 0!==this.data?.progress_namedOperator){const a=this.data?.progress_namedOperator.progress??n?.get_object();a||(0,t.ERROR)(t.Errors.Fail,"progress invalid: progress_namedOperator");let s=t.Progress.From(e,r?.get_object(),h,a);this.data.progress_namedOperator.data.forEach((e=>s.set_namedOperator(e.name,e.operators,c)))}if(void 0!==this.data?.progress_parent){const a=this.data?.progress_parent.progress??n?.get_object();a||(0,t.ERROR)(t.Errors.Fail,"progress invalid: progress_parent"),this.data.progress_parent.parent?t.Progress.From(e,r?.get_object(),h,a).parent(this.data.progress_parent.parent):t.Progress.From(e,r?.get_object(),h,a).parent_none()}if(void 0!==this.data?.progress_task){const a=this.data?.progress_task.progress??n?.get_object();a||(0,t.ERROR)(t.Errors.Fail,"progress invalid: progress_task"),t.Progress.From(e,r?.get_object(),h,a).bind_task(this.data.progress_task.task,c)}if(void 0!==this.data?.progress_hold){const a=this.data?.progress_hold.progress??n?.get_object();a||(0,t.ERROR)(t.Errors.Fail,"progress invalid: progress_hold"),this.data?.progress_hold.adminUnhold?t.Progress.From(e,r?.get_object(),h,a).unhold(this.data.progress_hold.operation,c):t.Progress.From(e,r?.get_object(),h,a).hold(this.data.progress_hold.operation,this.data.progress_hold.bHold)}const p=n?.launch();p&&await this.new_with_mark(e,p,this.data?.progress_new?.namedNew,s),void 0!==this.data?.progress_next&&t.Progress.From(e,r?.get_object(),h,this.data?.progress_next.progress).next(this.data.progress_next.operation,this.data.progress_next.deliverable,c),void 0!==this.data?.bPaused&&r?.pause(this.data.bPaused,c),void 0!==this.data?.clone_new&&r&&await this.new_with_mark(e,r?.clone(!0,c),this.data?.clone_new?.namedNew,s),i&&await this.new_with_mark(e,i.launch(),this.data?.permission?.namedNew,s),o||await this.new_with_mark(e,r.launch(),this.data?.object?.namedNew,s)}}}},9201:(e,a,s)=>{s.d(a,{c:()=>o});var t=s(7838),r=s(9605),i=s(9869),d=s(5882);class o extends i.s{constructor(e){super(),this.data=e}async call(e){this.data.type_parameter&&(0,t.IsValidArgType)(this.data.type_parameter)||(0,t.ERROR)(t.Errors.IsValidArgType,"treasury.type_parameter");const a=[],s=[];var i;const d=this.data?.permission?.address,o=this.data?.object?.address;if(d&&(0,t.IsValidAddress)(d)){if(this.data?.object||s.push(t.PermissionIndex.treasury),void 0!==this.data?.description&&o&&s.push(t.PermissionIndex.treasury_descritption),void 0!==this.data?.withdraw_mode&&s.push(t.PermissionIndex.treasury_withdraw_mode),null==this.data?.withdraw_guard&&s.push(t.PermissionIndex.treasury_withdraw_guard),void 0!==this.data?.deposit_guard&&s.push(t.PermissionIndex.treasury_deposit_guard),void 0!==this.data?.deposit_guard&&s.push(t.PermissionIndex.treasury_deposit_guard),void 0!==this.data?.deposit?.guard)if((0,t.IsValidAddress)(this.data.deposit.guard))a.push(this.data.deposit.guard);else if(this.data.object){if(!i){const e=await(0,r.w$)({objects:[o],showContent:!0});e?.objects&&"Treasury"===e.objects[0].type&&(i=e.objects[0])}i?.deposit_guard&&a.push(i?.deposit_guard)}else this.data?.deposit_guard&&(0,t.IsValidAddress)(this.data?.deposit_guard)&&a.push(this.data.deposit_guard);if(void 0!==this.data?.receive&&s.push(t.PermissionIndex.treasury_receive),void 0!==this.data?.withdraw?.withdraw_guard){if("string"==typeof this.data.withdraw.withdraw_guard&&(0,t.IsValidAddress)(this.data.withdraw.withdraw_guard))a.push(this.data.withdraw.withdraw_guard);else if(this.data.object){if(!i){const e=await(0,r.w$)({objects:[o],showContent:!0});e?.objects&&"Treasury"===e.objects[0].type&&(i=e.objects[0])}"string"==typeof i?.withdraw_guard&&a.push(i?.withdraw_guard)}}else s.push(t.PermissionIndex.treasury_withdraw);return await this.check_permission_and_call(d,s,a,!1,void 0,e)}return await this.exec(e)}async operate(e,a,s){let r,i;const o=this.data?.permission?.address,n=this.data?.object?.address;if(n)(0,t.IsValidAddress)(n)&&this.data.type_parameter&&o&&(0,t.IsValidAddress)(o)?r=t.Treasury.From(e,this.data.type_parameter,o,n):(0,t.ERROR)(t.Errors.InvalidParam,"object or permission address invalid.");else{if(!o||!(0,t.IsValidAddress)(o)){const a=this.data?.permission?.description??"";i=t.Permission.New(e,a)}r=t.Treasury.New(e,this.data.type_parameter,i?i.get_object():o,this.data?.description??"",i?void 0:a)}if(r){const t=i?void 0:a;if(void 0!==this.data?.description&&n&&r?.set_description(this.data.description,t),void 0!==this.data.deposit){const a=await d.g.Instance().get_coin_object(e,this.data.deposit.data.balance,s,this.data.type_parameter);if(a){const e=this.data.deposit.data?.index??0;r?.deposit({coin:a,index:BigInt(e),remark:this.data.deposit.data.remark??"",for_guard:this.data.deposit.data?.for_guard,for_object:this.data.deposit.data?.for_object})}}if(void 0!==this.data?.receive&&r?.receive(this.data.receive.payment,this.data.receive.received_object,t),void 0!==this.data?.withdraw&&r?.withdraw(this.data.withdraw,t),void 0!==this.data?.deposit_guard&&r?.set_deposit_guard(this.data.deposit_guard,t),void 0!==this.data?.withdraw_guard)switch(this.data.withdraw_guard.op){case"add":this.data.withdraw_guard.data.forEach((e=>r?.add_withdraw_guard(e.guard,BigInt(e.amount),t)));break;case"remove":r?.remove_withdraw_guard(this.data.withdraw_guard.guards,!1,t);break;case"set":r?.remove_withdraw_guard([],!0,t),this.data.withdraw_guard.data.forEach((e=>r?.add_withdraw_guard(e.guard,BigInt(e.amount),t)));break;case"removeall":r?.remove_withdraw_guard([],!0,t)}void 0!==this.data?.withdraw_mode&&r?.set_withdraw_mode(this.data.withdraw_mode,t),i&&await this.new_with_mark(e,i.launch(),this.data?.permission?.namedNew,s),n||await this.new_with_mark(e,r.launch(),this.data?.object?.namedNew,s)}}}}}]);