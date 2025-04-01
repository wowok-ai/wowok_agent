"use strict";(this.webpackChunkwowok_agent=this.webpackChunkwowok_agent||[]).push([[181],{159:(e,a,s)=>{s.d(a,{g:()=>o});var t=s(7495),r=s(6401),i=s(9766);class o extends r.s{data;constructor(e){super(),this.data=e}async call(e){const a=[],s=[],r=this.data?.permission?.address,o=this.data?.object?.address;if(r&&(0,t.IsValidAddress)(r)){if(this.data?.object||s.push(t.PermissionIndex.machine),void 0!==this.data?.description&&o&&s.push(t.PermissionIndex.machine_description),void 0!==this.data?.endpoint&&o&&s.push(t.PermissionIndex.machine_endpoint),void 0!==this.data?.consensus_repository&&s.push(t.PermissionIndex.machine_repository),void 0!==this.data?.nodes&&s.push(t.PermissionIndex.machine_node),this.data?.bPublished&&s.push(t.PermissionIndex.machine_publish),void 0!==this.data?.progress_new&&s.push(t.PermissionIndex.progress),void 0!==this.data?.progress_context_repository&&s.push(t.PermissionIndex.progress_context_repository),void 0!==this.data?.progress_namedOperator&&s.push(t.PermissionIndex.progress_namedOperator),void 0!==this.data?.progress_parent&&s.push(t.PermissionIndex.progress_parent),void 0!==this.data?.progress_task&&s.push(t.PermissionIndex.progress_bind_task),void 0!==this.data?.progress_hold&&this.data.progress_hold.adminUnhold&&s.push(t.PermissionIndex.progress_unhold),void 0!==this.data?.bPaused&&s.push(t.PermissionIndex.machine_pause),void 0!==this.data?.progress_next?.guard)if((0,t.IsValidAddress)(this.data?.progress_next?.guard))a.push(this.data?.progress_next?.guard);else if(this.data?.object&&(0,t.IsValidAddress)(o)){const e=await t.Progress.QueryForwardGuard(this.data?.progress_next.progress,o,await i.g.Instance().get_address()??"0xe386bb9e01b3528b75f3751ad8a1e418b207ad979fea364087deef5250a73d3f",this.data.progress_next.operation.next_node_name,this.data.progress_next.operation.forward);e&&a.push(e)}return await this.check_permission_and_call(r,s,a,!1,void 0,e)}return await this.exec(e)}async operate(e,a,s){let r,i;const o=this.data?.permission?.address,n=this.data?.object?.address;if(n)(0,t.IsValidAddress)(n)&&o&&(0,t.IsValidAddress)(o)?r=t.Machine.From(e,o,n):(0,t.ERROR)(t.Errors.InvalidParam,"object or permission address invalid.");else{if(!o||!(0,t.IsValidAddress)(o)){const a=this.data?.permission?.description??"";i=t.Permission.New(e,a)}r=t.Machine.New(e,i?i.get_object():o,this.data?.description??"",this.data?.endpoint??"",i?void 0:a)}if(r){const p=i?i.get_object():o,c=i?void 0:a;if(void 0!==this.data?.description&&n&&r?.set_description(this.data.description,c),void 0!==this.data?.endpoint&&n&&r?.set_endpoint(this.data.endpoint,c),void 0!==this.data?.consensus_repository)switch(this.data.consensus_repository.op){case"add":this.data.consensus_repository.repositories.forEach((e=>r?.add_repository(e,c)));break;case"remove":r?.remove_repository(this.data.consensus_repository.repositories,!1,c);break;case"removeall":r?.remove_repository([],!0,c);break;case"set":r?.remove_repository([],!0,c),this.data.consensus_repository.repositories.forEach((e=>r?.add_repository(e,c)))}if(void 0!==this.data?.nodes)switch(this.data?.nodes?.op){case"add":r?.add_node(this.data.nodes.data,c);break;case"remove":r?.remove_node(this.data.nodes.names,this.data.nodes?.bTransferMyself,c);break;case"rename node":this.data.nodes.data.forEach((e=>r?.rename_node(e.old,e.new,c)));break;case"add from myself":r?.add_node2(this.data.nodes.addresses,c);break;case"add forward":this.data.nodes.data.forEach((e=>r?.add_forward(e.prior_node_name,e.node_name,e.forward,e.threshold,e.remove_forward,c)));break;case"remove forward":this.data.nodes.data.forEach((e=>r?.remove_forward(e.prior_node_name,e.node_name,e.forward_name,c)));break;case"remove pair":this.data.nodes.pairs.forEach((e=>r?.remove_pair(e.prior_node_name,e.node_name,c)))}var d;if(this.data?.bPublished&&r?.publish(a),void 0!==this.data?.progress_new&&(d=t.Progress?.New(e,r?.get_object(),p,this.data?.progress_new.task_address,c)),void 0!==this.data?.progress_context_repository){const a=this.data?.progress_context_repository.progress??d?.get_object();a||(0,t.ERROR)(t.Errors.Fail,"progress invalid: progress_context_repository"),t.Progress.From(e,r?.get_object(),p,a).set_context_repository(this.data?.progress_context_repository.repository,c)}if(void 0!==this.data?.progress_namedOperator){const a=this.data?.progress_namedOperator.progress??d?.get_object();a||(0,t.ERROR)(t.Errors.Fail,"progress invalid: progress_namedOperator");let s=t.Progress.From(e,r?.get_object(),p,a);this.data.progress_namedOperator.data.forEach((e=>s.set_namedOperator(e.name,e.operators,c)))}if(void 0!==this.data?.progress_parent){const a=this.data?.progress_parent.progress??d?.get_object();a||(0,t.ERROR)(t.Errors.Fail,"progress invalid: progress_parent"),this.data.progress_parent.parent?t.Progress.From(e,r?.get_object(),p,a).parent(this.data.progress_parent.parent):t.Progress.From(e,r?.get_object(),p,a).parent_none()}if(void 0!==this.data?.progress_task){const a=this.data?.progress_task.progress??d?.get_object();a||(0,t.ERROR)(t.Errors.Fail,"progress invalid: progress_task"),t.Progress.From(e,r?.get_object(),p,a).bind_task(this.data.progress_task.task,c)}if(void 0!==this.data?.progress_hold){const a=this.data?.progress_hold.progress??d?.get_object();a||(0,t.ERROR)(t.Errors.Fail,"progress invalid: progress_hold"),this.data?.progress_hold.adminUnhold?t.Progress.From(e,r?.get_object(),p,a).unhold(this.data.progress_hold.operation,c):t.Progress.From(e,r?.get_object(),p,a).hold(this.data.progress_hold.operation,this.data.progress_hold.bHold)}const h=d?.launch();h&&await this.new_with_mark(e,h,this.data?.progress_new?.namedNew,s),void 0!==this.data?.progress_next&&t.Progress.From(e,r?.get_object(),p,this.data?.progress_next.progress).next(this.data.progress_next.operation,this.data.progress_next.deliverable,c),void 0!==this.data?.bPaused&&r?.pause(this.data.bPaused,c),void 0!==this.data?.clone_new&&r&&await this.new_with_mark(e,r?.clone(!0,c),this.data?.clone_new?.namedNew,s),i&&await this.new_with_mark(e,i.launch(),this.data?.permission?.namedNew,s),n||await this.new_with_mark(e,r.launch(),this.data?.object?.namedNew,s)}}}},3503:(e,a,s)=>{s.d(a,{g:()=>i});var t=s(7495),r=s(6401);class i extends r.s{data;constructor(e){super(),this.data=e}async call(e){return await this.exec(e)}async operate(e,a,s){this.data?.root||(0,t.ERROR)(t.Errors.InvalidParam,"guard root node invalid"),(0,t.IsValidDesription)(this.data?.description)||(0,t.ERROR)(t.Errors.IsValidDesription,"build_guard - "+this.data.description),this.data?.table?.forEach((e=>{(!(0,t.IsValidU8)(e.identifier)||e.identifier<1)&&(0,t.ERROR)(t.Errors.InvalidParam,"table.identifer invalid"),e.bWitness||void 0!==e.value||(0,t.ERROR)(t.Errors.InvalidParam,"table.value")})),this.data?.table&&(0,t.hasDuplicates)(this.data?.table?.map((e=>e.identifier)))&&(0,t.ERROR)(t.Errors.InvalidParam,"table.identifer duplicates");var r=[];o(this.data.root,t.ValueType.TYPE_BOOL,this.data?.table??[],r);const i=(0,t.concatenate)(Uint8Array,...r),n=e.moveCall({target:t.Protocol.Instance().guardFn("new"),arguments:[e.pure.string(this.data.description),e.pure.vector("u8",[].slice.call(i.reverse()))]});this.data?.table?.forEach((a=>{if(a.bWitness){const s=new Uint8Array(1);s.set([a.value_type],0),e.moveCall({target:t.Protocol.Instance().guardFn("constant_add"),arguments:[e.object(n),e.pure.u8(a.identifier),e.pure.bool(!0),e.pure.vector("u8",[].slice.call(s)),e.pure.bool(!1)]})}else{const s=Uint8Array.from(t.Bcs.getInstance().ser(a.value_type,a.value)),r=(0,t.insertAtHead)(s,a.value_type);e.moveCall({target:t.Protocol.Instance().guardFn("constant_add"),arguments:[e.object(n),e.pure.u8(a.identifier),e.pure.bool(!1),e.pure.vector("u8",[].slice.call(r)),e.pure.bool(!1)]})}}));const d=e.moveCall({target:t.Protocol.Instance().guardFn("create"),arguments:[e.object(n)]});await this.new_with_mark(e,d,this.data?.namedNew,s)}}const o=(e,a,s,r)=>{const i=e;if(void 0!==i?.identifier){const e=s.find((e=>e.identifier===i.identifier));e?(n(e.value_type,a,i),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,t.ContextType.TYPE_CONSTANT)),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,i.identifier))):(0,t.ERROR)(t.Errors.InvalidParam,"node identifier - "+JSON.stringify(i))}else if(void 0!==i?.query){var d;if("string"==typeof i.query?d=t.GUARD_QUERIES.find((e=>e.query_name===i.query)):"number"==typeof i.query&&(d=t.GUARD_QUERIES.find((e=>e.query_id===i.query))),d||(0,t.ERROR)(t.Errors.InvalidParam,"query invalid - "+i?.query),n(d.return,a,i),d.parameters.length===i.parameters.length)for(let e=i.parameters.length-1;e>=0;--e)o(i.parameters[e],d.parameters[e],s,r);else(0,t.ERROR)(t.Errors.InvalidParam,"node query parameters length not match - "+JSON.stringify(i));if(r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,t.OperatorType.TYPE_QUERY)),"string"==typeof i.object)(0,t.IsValidAddress)(i.object)||(0,t.ERROR)(t.Errors.InvalidParam,"node object from address string - "+JSON.stringify(i)),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,t.ValueType.TYPE_ADDRESS)),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_ADDRESS,i.object));else{const e=s.find((e=>e.identifier===i.object));e?(n(e.value_type,t.ValueType.TYPE_ADDRESS,i),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,t.ContextType.TYPE_CONSTANT)),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,i.object))):(0,t.ERROR)(t.Errors.InvalidParam,"node object from identifier - "+JSON.stringify(i))}r.push(t.Bcs.getInstance().ser("u16",d.query_id))}else if(void 0!==i?.logic)switch(n(t.ValueType.TYPE_BOOL,a,i),i?.logic){case t.OperatorType.TYPE_LOGIC_AND:case t.OperatorType.TYPE_LOGIC_OR:i.parameters.length<2&&(0,t.ERROR)(t.Errors.InvalidParam,"node logic parameters length must >= 2"+JSON.stringify(i)),i.parameters.reverse().forEach((e=>o(e,t.ValueType.TYPE_BOOL,s,r))),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,i.logic)),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,i.parameters.length));break;case t.OperatorType.TYPE_LOGIC_NOT:1!==i.parameters.length&&(0,t.ERROR)(t.Errors.InvalidParam,"node logic parameters length must be 1"+JSON.stringify(i)),i.parameters.reverse().forEach((e=>o(e,t.ValueType.TYPE_BOOL,s,r))),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,i.logic));break;case t.OperatorType.TYPE_LOGIC_AS_U256_GREATER:case t.OperatorType.TYPE_LOGIC_AS_U256_GREATER_EQUAL:case t.OperatorType.TYPE_LOGIC_AS_U256_LESSER:case t.OperatorType.TYPE_LOGIC_AS_U256_LESSER_EQUAL:case t.OperatorType.TYPE_LOGIC_AS_U256_EQUAL:i.parameters.length<2&&(0,t.ERROR)(t.Errors.InvalidParam,"node logic parameters length must >= 2"+JSON.stringify(i)),i.parameters.reverse().forEach((e=>o(e,"number",s,r))),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,i.logic)),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,i.parameters.length));break;case t.OperatorType.TYPE_LOGIC_EQUAL:i.parameters.length<2&&(0,t.ERROR)(t.Errors.InvalidParam,"node logic parameters length must >= 2"+JSON.stringify(i)),i.parameters.reverse().forEach((e=>o(e,"variable",s,r))),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,i.logic)),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,i.parameters.length));break;case t.OperatorType.TYPE_LOGIC_HAS_SUBSTRING:i.parameters.length<2&&(0,t.ERROR)(t.Errors.InvalidParam,"node logic parameters length must >= 2"+JSON.stringify(i)),i.parameters.reverse().forEach((e=>o(e,t.ValueType.TYPE_STRING,s,r))),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,i.logic)),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,i.parameters.length))}else if(void 0!==i?.calc)i?.calc===t.OperatorType.TYPE_NUMBER_ADDRESS?(n(t.ValueType.TYPE_ADDRESS,a,i),1!==i.parameters.length&&(0,t.ERROR)(t.Errors.InvalidParam,"node TYPE_NUMBER_ADDRESS parameters length must == 1"+JSON.stringify(i)),i.parameters.reverse().forEach((e=>o(e,"number",s,r))),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,i.calc))):(n(t.ValueType.TYPE_U256,a,i),i.parameters.length<2&&(0,t.ERROR)(t.Errors.InvalidParam,"node calc parameters length must >= 2"+JSON.stringify(i)),i.parameters.reverse().forEach((e=>o(e,"number",s,r))),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,i.calc)),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,i.parameters.length)));else if(void 0!==i?.value_type)n(i?.value_type,a,i),void 0===i?.value&&(0,t.ERROR)(t.Errors.InvalidParam,"node value undefined - "+JSON.stringify(i)),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,i.value_type)),i.value_type==t.ValueType.TYPE_STRING||i.value_type===t.ValueType.TYPE_VEC_U8?"string"==typeof i.value?r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_STRING,i.value)):r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_VEC_U8,i.value)):r.push(t.Bcs.getInstance().ser(i?.value_type,i.value));else if(void 0!==i?.context)switch(r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,i.context)),i.context){case t.ContextType.TYPE_CLOCK:n(t.ValueType.TYPE_U64,a,i);break;case t.ContextType.TYPE_GUARD:case t.ContextType.TYPE_SIGNER:n(t.ValueType.TYPE_ADDRESS,a,i)}else if(void 0!==i?.identifier){(0,t.IsValidGuardIdentifier)(i.identifier)||(0,t.ERROR)(t.Errors.IsValidGuardIdentifier,"node - "+JSON.stringify(i));const e=s.find((e=>e.identifier===i.identifier));e||(0,t.ERROR)(t.Errors.InvalidParam,"identifier not found. node - "+JSON.stringify(i)),n(e.value_type,a,i),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,t.ContextType.TYPE_CONSTANT)),r.push(t.Bcs.getInstance().ser(t.ValueType.TYPE_U8,i.identifier))}else(0,t.ERROR)(t.Errors.InvalidParam,"node - "+JSON.stringify(i))},n=(e,a,s)=>{if("variable"===a)a=e;else if("number"===a){if(e===t.ValueType.TYPE_U128||e===t.ValueType.TYPE_U256||e===t.ValueType.TYPE_U8||e===t.ValueType.TYPE_U64||e===t.ContextType.TYPE_CLOCK)return}else if(a===t.ValueType.TYPE_ADDRESS&&(e===t.ContextType.TYPE_SIGNER||e===t.ContextType.TYPE_GUARD))return;if(e!==a){var r="";s&&(r=" - "+JSON.stringify(s)),(0,t.ERROR)(t.Errors.InvalidParam,"checkType: "+e+" require type: "+a+r)}}},6401:(e,a,s)=>{s.d(a,{$:()=>n,s:()=>d});var t=s(7495),r=s(1294),i=s(9766),o=s(3245);function n(e){const a=[];return e?.objectChanges?.forEach((e=>{const s=e?.objectType,t=(0,o.lS)(s);t&&a.push({type:t,type_raw:s,object:e?.objectId,version:e?.version,owner:e?.owner,change:e.type})})),a}class d{resouceObject;async operate(e,a,s){}constructor(){}async call(e){}async call_with_witness(e,a){if(e.guard.length>0){const s=await t.GuardParser.Create([...e.guard]);if(s){const r=await s.done(e.witness);if(r){const e=new t.TransactionBlock,s=new t.Passport(e,r);return await this.operate(e,s?.get_object(),a),s.destroy(),await this.sign_and_commit(e,a)}}else(0,t.ERROR)(t.Errors.Fail,"guard verify")}}async check_permission_and_call(e,a,s,o,n,d){var p=[];if(a.length>0||o){const s=await i.g.Instance().get_address(d);s||(0,t.ERROR)(t.Errors.InvalidParam,"check_permission_and_call: account invalid");const c=await(0,r.l)({permission_object:e,address:s});o&&!c.owner&&(0,t.ERROR)(t.Errors.noPermission,"owner"),n&&!c.admin&&(0,t.ERROR)(t.Errors.noPermission,"admin"),a.forEach((e=>{const a=t.Permission.HasPermission(c,e);a?.has||(0,t.ERROR)(t.Errors.noPermission,e),a?.guard&&p.push(a.guard)}))}if(s.length>0&&(p=p.concat(s)),p.length>0){const e=await t.GuardParser.Create([...p]),a=e?e.future_fills():[];if(e||(0,t.ERROR)(t.Errors.Fail,"guard parse"),e&&0===a.length){const a=await e.done();if(a){const e=new t.TransactionBlock,s=new t.Passport(e,a);return await this.operate(e,s?.get_object(),d),s.destroy(),await this.sign_and_commit(e,d)}}return{guard:[...p],witness:e.future_fills()}}return await this.exec()}async exec(e){const a=new t.TransactionBlock;return await this.operate(a,void 0,e),await this.sign_and_commit(a,e)}async new_with_mark(e,a,s,r,n=[t.TagName.Launch]){const d=s?.tags?(0,t.array_unique)([...s.tags,...n]):(0,t.array_unique)([...n]);if(this.resouceObject)t.Resource.From(e,this.resouceObject).add(a,d,s?.name);else{const n=await i.g.Instance().get_address(r);if(n){const r=await(0,o.h$)({address:n});r?.mark_object?t.Resource.From(e,r.mark_object).add(a,d,s?.name):(this.resouceObject=t.Entity.From(e).create_resource2(),t.Resource.From(e,this.resouceObject).add(a,d,s?.name))}else(0,t.ERROR)(t.Errors.InvalidParam,"account - "+r)}}async sign_and_commit(e,a){const s=await i.g.Instance().get_pair(a,!0);return s||(0,t.ERROR)(t.Errors.Fail,"account invalid"),this.resouceObject&&(t.Resource.From(e,this.resouceObject).launch(),this.resouceObject=void 0),await t.Protocol.Client().signAndExecuteTransaction({transaction:e,signer:s,options:{showObjectChanges:!0}})}}},7439:(e,a,s)=>{s.d(a,{W:()=>n});var t=s(7495),r=s(3245),i=s(6401),o=s(9766);class n extends i.s{data;constructor(e){super(),this.data=e}async call(e){this.data?.type_parameter&&(0,t.IsValidArgType)(this.data.type_parameter)||(0,t.ERROR)(t.Errors.IsValidArgType,"demand.type_parameter");const a=[],s=[],i=this.data?.permission?.address,o=this.data?.object?.address;if(i&&(0,t.IsValidAddress)(i)){if(this.data?.object||s.push(t.PermissionIndex.demand),void 0!==this.data?.description&&o&&s.push(t.PermissionIndex.demand_description),void 0!==this.data?.time_expire&&o&&s.push(t.PermissionIndex.demand_expand_time),void 0!==this.data?.guard&&s.push(t.PermissionIndex.demand_guard),"reward"===this.data?.bounty?.op&&s.push(t.PermissionIndex.demand_yes),"refund"===this.data?.bounty?.op&&s.push(t.PermissionIndex.demand_refund),void 0!==this.data?.present?.guard)if((0,t.IsValidAddress)(this.data.present.guard))a.push(this.data.present.guard);else if(o){const e=await(0,r.w$)({objects:[o],showContent:!0});if(e?.objects&&"Demand"===e?.objects[0]?.type){const s=e?.objects[0];s?.guard&&a.push(s?.guard.object)}}else this.data?.guard?.address&&(0,t.IsValidAddress)(this.data?.guard.address)&&a.push(this.data.guard.address);return await this.check_permission_and_call(i,s,a,!1,void 0,e)}return await this.exec(e)}async operate(e,a,s){let r,i;const n=this.data?.permission?.address,d=this.data?.object?.address;if(d)(0,t.IsValidAddress)(d)&&this.data.type_parameter&&this.data.permission&&(0,t.IsValidAddress)(n)?r=t.Demand.From(e,this.data.type_parameter,n,d):(0,t.ERROR)(t.Errors.InvalidParam,"object or permission address invalid.");else{if(!n||!(0,t.IsValidAddress)(n)){const a=this.data?.permission?.description??"";i=t.Permission.New(e,a)}r=void 0!==this.data.time_expire?t.Demand.New(e,this.data.type_parameter,"duration"===this.data.time_expire?.op,"duration"===this.data.time_expire?.op?this.data.time_expire.minutes:this.data.time_expire?.time,i?i.get_object():n,this.data?.description??"",i?void 0:a):t.Demand.New(e,this.data.type_parameter,!0,43200,i?i.get_object():n,this.data?.description??"",i?void 0:a)}if(r){const n=i?void 0:a;if(void 0!==this.data?.description&&d&&r?.set_description(this.data.description,n),void 0!==this.data?.time_expire&&d&&r?.expand_time("duration"===this.data.time_expire.op,"duration"===this.data.time_expire.op?this.data.time_expire.minutes:this.data.time_expire.time,n),void 0!==this.data?.bounty)if("add"===this.data.bounty.op){if((0,t.IsValidAddress)(this.data.bounty.object?.address))r.deposit(this.data.bounty.object?.address);else if(void 0!==this.data.bounty.object?.balance){(0,t.IsValidCoinType)(this.data.type_parameter)||(0,t.ERROR)(t.Errors.IsValidCoinType,"demand bounty");const a=await o.g.Instance().get_coin_object(e,this.data.bounty.object?.balance,s,this.data.type_parameter);a&&r.deposit(a)}}else"reward"===this.data.bounty.op?r?.yes(this.data.bounty.service,n):"refund"===this.data.bounty.op&&r?.refund(n);void 0!==this.data?.present&&r?.present(this.data.present.service,this.data.present.service_pay_type,this.data.present.recommend_words,n),void 0!==this.data?.guard&&r?.set_guard(this.data.guard.address,this.data.guard?.service_id_in_guard??void 0,n),i&&await this.new_with_mark(e,i.launch(),this.data?.permission?.namedNew,s),this.data.object||await this.new_with_mark(e,r.launch(),this.data?.object?.namedNew,s)}}}}}]);