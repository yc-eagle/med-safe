(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.MedEngine=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const norm=s=>String(s).normalize('NFKC').toUpperCase().replace(/\s+/g,' ').trim();
function search(products,query,limit=12){
 const q=norm(query);if(q.length<2)return [];
 const reg=q.replace(/^HK\s*[- ]?\s*(\d{5})$/,'HK-$1');
 const exact=products.filter(p=>p.registration_number===reg);
 if(exact.length)return exact;
 return products.filter(p=>norm(p.product_name).includes(q)||p.active_ingredients.some(x=>norm(x).includes(q))).slice(0,limit);
}
function suggest(products,rows){
 const text=rows.map(x=>x.text).join('\n');
 const ids=[...new Set([...text.toUpperCase().matchAll(/\bHK\s*[-–—]?\s*(\d{5})\b/g)].map(m=>'HK-'+m[1]))];
 const matches=ids.map(id=>products.find(p=>p.registration_number===id)).filter(Boolean);
 if(matches.length)return {method:'registration_number',candidates:matches,unmatchedIds:ids.filter(id=>!matches.some(p=>p.registration_number===id))};
 // Approximate OCR terms can only produce candidates, never a confirmed identity.
 const candidates=[];
 for(const row of rows){const q=norm(row.text);if(q.length<4)continue;
  for(const p of products){const n=norm(p.product_name);if(n===q||(q.length>=9&&n.includes(q))){if(!candidates.includes(p))candidates.push(p);if(candidates.length>=10)break;}}
  if(candidates.length>=10)break;
 }
 return {method:'name_candidate',candidates,unmatchedIds:ids};
}
function productScope(item,data){
 const p=data.products.find(p=>p.registration_number===item.id),demo=data.demoProducts.find(p=>p.registration_number===item.id);
 if(!p)return {id:item.id,identified:false,canonical:[],unmapped:[],route:null,routeBasis:'missing'};
 const aliases=new Map();for(const profile of Object.values(data.medicineProfiles?.ingredients||{}))for(const a of profile.aliases)aliases.set(norm(a),profile.canonical);
 for(const a of data.aliases||[])for(const x of a.aliases)if(!aliases.has(norm(x)))aliases.set(norm(x),a.canonical);
 const mapped=p.active_ingredients.map(raw=>({raw,canonical:aliases.get(norm(raw))||null}));
 const validRoutes=['oral','sublingual','topical','inhaled','injection','other'];
 const explicit=validRoutes.includes(item.route)?item.route:null;
 // Explicitly choosing unknown must not fall back to a name-derived demo hint.
 const hint=item.route===undefined&&demo?demo.demo_route:null;
 return {id:item.id,identified:true,canonical:[...new Set(mapped.map(x=>x.canonical).filter(Boolean))],mapped,unmapped:mapped.filter(x=>!x.canonical).map(x=>x.raw),route:explicit||hint,routeBasis:explicit?'operator_reported_not_clinically_verified':hint?'demo_name_hint_not_verified_on_pack':'missing'};
}
function check(items,data){
 const result={status:'',alerts:[],potentialAlerts:[],unknown:[],clinicalSafety:'not_assessed',coverageComplete:false,reviewStatus:'clinician_reviewed',uncheckedPairs:[],ingredientOverlaps:[],pairChecks:[],scopeInputs:[],totalPairs:items.length*(items.length-1)/2,highOrderAssessed:false,doseAssessed:false,patientFactorsAssessed:false};
 if(items.length<2){result.status='insufficient_products';return result;}
 if(items.length>12){result.status='too_many_products';return result;}
 if(items.some(x=>!x.confirmed)){result.status='identity_confirmation_required';return result;}
 if(new Set(items.map(x=>x.id)).size!==items.length){result.status='duplicate_input_requires_review';return result;}
 result.scopeInputs=items.map(x=>productScope(x,data));
 result.unknown=result.scopeInputs.filter(x=>!x.identified||!x.route||x.unmapped.length||!x.canonical.length).map(x=>x.id);
 const catalogue=new Map(data.products.map(p=>[p.registration_number,p]));
 for(let i=0;i<items.length;i++)for(let j=i+1;j<items.length;j++){
  const a=result.scopeInputs[i],b=result.scopeInputs[j],ids=[a.id,b.id],ap=catalogue.get(a.id),bp=catalogue.get(b.id);
  const pair={products:ids,matchedRuleIds:[],potentialRuleIds:[],gaps:[],clinicalSafety:'not_assessed'};
  if(!a.identified||!b.identified)pair.gaps.push('unidentified_product');
  if(!a.route||!b.route)pair.gaps.push('route_not_recorded');
  if(a.unmapped.length||b.unmapped.length)pair.gaps.push('unmapped_ingredients');
  if(a.routeBasis==='demo_name_hint_not_verified_on_pack'||b.routeBasis==='demo_name_hint_not_verified_on_pack')pair.gaps.push('demo_route_assumption');
  if(ap&&bp){const shared=[...new Set(ap.active_ingredients.filter(x=>bp.active_ingredients.some(y=>norm(x)===norm(y))))];
   if(shared.length)result.ingredientOverlaps.push({products:ids,listed_ingredients:shared,comparison:'exact_catalogue_ingredient_text',source_id:'hk_xml',clinical_interpretation:'not_assessed'});
  }
  if(a.identified&&b.identified)for(const rule of data.rules){
   if(!((a.canonical.includes(rule.ingredient_a)&&b.canonical.includes(rule.ingredient_b))||(a.canonical.includes(rule.ingredient_b)&&b.canonical.includes(rule.ingredient_a))))continue;
   const inScope=!!a.route&&!!b.route&&rule.allowed_routes.includes(a.route)&&rule.allowed_routes.includes(b.route);
   const entry={...rule,products:ids,applicationBasis:'explicit_ingredient_aliases_and_route_limits',routeBasis:[a.routeBasis,b.routeBasis],sourceDocumentDate:rule.source_document_date||data.sources.find(s=>s.source_id===rule.source_id)?.document_date||null};
   if(inScope){result.alerts.push(entry);pair.matchedRuleIds.push(rule.rule_id);}
   else{result.potentialAlerts.push({...entry,reason:(!a.route||!b.route)?'confirm_route_before_applying':'recorded_route_outside_rule_scope'});pair.potentialRuleIds.push(rule.rule_id);}
  }
  if(!pair.matchedRuleIds.length){result.uncheckedPairs.push(ids);pair.gaps.push('no_applicable_curated_rule');}
  pair.status=pair.matchedRuleIds.length?'sourced_warning':pair.potentialRuleIds.length?'route_review_required':'not_covered';result.pairChecks.push(pair);
 }
 const rank={label_contraindication:0,nitrate_warning:1,duplicate_ingredient:2,increased_bleeding_risk:3,label_recommends_avoid:4,consult_before_use:5};
 result.alerts.sort((a,b)=>(rank[a.evidence_level]??9)-(rank[b.evidence_level]??9));
 result.status=result.unknown.length?'incomplete_check':result.alerts.length?'alerts_found':'no_rule_found';
 return result;
}
return {search,suggest,check,productScope};
});
