(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.AIOutputValidator=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const norm=x=>String(x??'').normalize('NFKC').toLowerCase().replace(/\s+/g,' ').trim();
function ingredient(value,data){const v=norm(value);const entry=data.aliases.find(x=>x.aliases.some(a=>norm(a)===v));return entry?norm(entry.canonical):v;}
function parse(raw){let s=String(raw).trim();if(s.startsWith('```')&&s.endsWith('```'))s=s.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'');return JSON.parse(s);}
function validate(truth,output,data){
 const result={schema_version:'1.0',status:'unverified',identity_accepted:false,clinical_safety:'not_assessed',patient_dose:'not_assessed',rule_coverage:'not_assessed',rows:[],limitations:['Only compares selected catalogue fields against a dated snapshot.','Does not establish the truth of the photograph or an individual prescription.','The 14 rules were clinician-reviewed on 3 October 2026; ingredient alias mappings have not been reviewed.']};
 if(!Array.isArray(truth)||!truth.length||truth.length>4||truth.some(x=>!x.confirmed)){result.reason='reference_confirmation_required';return result;}
 if(new Set(truth.map(x=>x.id)).size!==truth.length){result.reason='duplicate_reference';return result;}
 if(!output||typeof output!=='object'||Array.isArray(output)||!Array.isArray(output.products)||output.products.length!==truth.length){result.reason='output_schema_or_count_invalid';return result;}
 const seen=new Set();
 for(const claim of output.products){
  if(!claim||typeof claim!=='object'||!Number.isInteger(claim.input_index)||claim.input_index<1||claim.input_index>truth.length||seen.has(claim.input_index)){result.reason='input_index_invalid';return result;}
  seen.add(claim.input_index);
 }
 for(let i=0;i<truth.length;i++){
  const ref=truth[i],product=data.products.find(p=>p.registration_number===ref.id),claim=output.products.find(p=>p.input_index===i+1);
  const row={input_index:i+1,reference_id:ref.id,checks:[],normalizations:[],status:'unverified'};
  const check=(field,status,observed,expected,reason)=>row.checks.push({field,status,observed:observed??null,expected:expected??null,reason});
  if(!product){check('reference','unverified',ref.id,null,'reference_not_in_catalogue');result.rows.push(row);continue;}
  if(typeof claim.registration_number!=='string'||!claim.registration_number.trim())check('registration_number','unverified',claim.registration_number,product.registration_number,'missing_registration_number');
  else check('registration_number',claim.registration_number.trim().toUpperCase()===product.registration_number?'matched':'conflict',claim.registration_number,product.registration_number,'exact_HK_identity');
  if(typeof claim.product_name!=='string'||!claim.product_name.trim())check('product_name','unverified',claim.product_name,product.product_name,'missing_full_product_name');
  else check('product_name',norm(claim.product_name)===norm(product.product_name)?'matched':'unverified',claim.product_name,product.product_name,'full_product_name_required_no_fuzzy_identity');
  if(!Array.isArray(claim.ingredients)||!claim.ingredients.length||claim.ingredients.some(x=>typeof x!=='string'||!x.trim()))check('ingredients','unverified',claim.ingredients,product.active_ingredients,'complete_ingredient_array_required');
  else{
   const expected=[...new Set(product.active_ingredients.map(x=>ingredient(x,data)))].sort(),observed=[...new Set(claim.ingredients.map(x=>ingredient(x,data)))].sort();
   const same=JSON.stringify(expected)===JSON.stringify(observed);
   check('ingredients',same?'matched':'conflict',claim.ingredients,product.active_ingredients,same?'complete_ingredient_set_matches':'missing_or_extra_ingredient');
   for(const raw of claim.ingredients){const canonical=ingredient(raw,data);if(norm(raw)!==canonical)row.normalizations.push({observed:raw,canonical,method:'explicit_alias_table',review_status:'not_reviewed'});}
  }
  for(const key of ['dose','frequency','patient_instructions','recommended_dose','administration'])if(claim[key]!=null&&claim[key]!=='')check(key,'unverified',claim[key],null,'patient_instruction_not_verifiable_from_product_catalogue');
  const known=new Set(['input_index','registration_number','product_name','ingredients','dose','frequency','patient_instructions','recommended_dose','administration']);
  for(const key of Object.keys(claim))if(!known.has(key))check(key,'unverified',claim[key],null,'extra_field_not_validated');
  row.status=row.checks.some(c=>c.status==='conflict')?'conflict':row.checks.some(c=>c.status==='unverified')?'unverified':row.normalizations.length?'normalized_match':'catalogue_match';result.rows.push(row);
 }
 const extras=Object.keys(output).filter(k=>k!=='products');
 result.extra_output_fields=extras;
 result.status=result.rows.some(r=>r.status==='conflict')?'conflict':result.rows.some(r=>r.status==='unverified')||extras.length?'unverified':result.rows.some(r=>r.status==='normalized_match')?'normalized_match':'catalogue_match';
 result.identity_accepted=['catalogue_match','normalized_match'].includes(result.status);
 result.reason=result.identity_accepted?'selected_catalogue_fields_match_only':result.status==='conflict'?'source_disagreement_requires_review':'insufficient_evidence_or_unvalidated_claim';
 return result;
}
return {norm,ingredient,parse,validate};
});
