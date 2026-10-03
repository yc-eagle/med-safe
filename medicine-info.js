(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.MedicineInfo=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const norm=x=>String(x||'').normalize('NFKC').trim().toLowerCase();
function profiles(product,data){const all=Object.values(data.medicineProfiles?.ingredients||{});return product.active_ingredients.map(raw=>({raw,profile:all.find(p=>p.aliases.some(a=>norm(a)===norm(raw)))||null}));}
function facts(product,data){return {registration_number:product.registration_number,product_name:product.product_name,active_ingredients:product.active_ingredients,certificate_holder:product.certificate_holder,source_updated:product.source_updated,formulation:data.medicineProfiles?.formulations[product.registration_number]||null,ingredients:profiles(product,data),personal_dose:null,expiry_date:null,manufacturer:null,complete_product_label:null,clinical_safety:'not_assessed'};}
const contexts=[
 {id:'allergy',zh:'有藥物過敏／曾出現不良反應',en:'Drug allergy or previous reaction'},
 {id:'special',zh:'涉及兒童、懷孕或餵哺母乳',en:'Child, pregnancy or breastfeeding'},
 {id:'organ',zh:'有肝腎或其他需特別留意的情況',en:'Liver, kidney or other relevant condition'},
 {id:'other',zh:'還有其他藥、草藥或保健品未列出',en:'Other medicines, herbs or supplements not listed'},
 {id:'instructions',zh:'藥袋、處方與藥盒指示不同',en:'Prescription, medicine bag and pack instructions differ'}
];
function contextLines(context={},language='zh'){const key=language==='en'?'en':'zh';return contexts.filter(c=>context[c.id]===true).map(c=>c[key]);}
let Locale=globalThis.MedLocale;
if(typeof module==='object'&&module.exports){try{Locale=require('./locale.js');}catch{/* Standalone legacy callers remain supported. */}}
const simple=text=>Locale?.simplify?Locale.simplify(text):text;
function knowledge(question,items,data,locale='yue'){
 const q=norm(question),en=locale==='en',cmn=locale==='cmn';
 const say=(english,mandarin,cantonese)=>en?english:cmn?simple(mandarin):cantonese;
 let field=null;
 if(/(副作用|不良反應|不良反应|side effect)/i.test(q))field='side_effects';
 else if(/(用途|作用|做咩|醫乜|医乜|治療|治疗|used for|what.*for)/i.test(q))field='use';
 else if(/(存放|保存|儲存|储存|貯存|贮存|雪櫃|冰箱|storage|store|refrigerat)/i.test(q))field='storage';
 if(!field)return null;
 if(field==='storage')return {intent:'storage_information',text:(en?data.medicineProfiles.storage.en:cmn?simple(data.medicineProfiles.storage.zh):data.medicineProfiles.storage.zh)+say(' Confirm any special temperature or after-opening expiry with the actual label and a pharmacist.',' 如有开封后期限或特殊温度要求，请以实际标签为准，并向药师核实。',' 如有開封後期限或特別溫度，請以該款標籤和藥劑師核實。'),sourceProfileIds:['general']};
 const list=items.map(i=>data.products.find(p=>p.registration_number===i.id)).filter(Boolean),sourceIds=new Set(),parts=[];
 if(list.length!==items.length)parts.push(say('Some medicines are unidentified, so their uses or side effects cannot be provided. Bring the actual pack to a pharmacist.','有药品尚未识别，无法提供其用途或副作用。请带实物咨询药师。','有藥品未能識別，未能提供佢嘅用途或副作用；請帶實物問藥劑師。'));
 for(const p of list){const cards=profiles(p,data);parts.push(p.product_name+': '+cards.map(c=>{
  if(!c.profile)return c.raw+say(': this information is not available.', '：暂时没有这项资料。',' 暫未有這項資料。');
  c.profile.source_ids.forEach(s=>sourceIds.add(s));
  const name=en?c.profile.canonical:cmn?simple(c.profile.zh_hant):c.profile.zh_hant;
  const detail=en?c.profile[field+'_en']:cmn?simple(c.profile[field+'_zh']):c.profile[field+'_zh'];
  return name+': '+detail;
 }).join(' '));}
 return {intent:field+'_information',text:parts.join('\n')+say('\nThis is general ingredient information, not the complete Hong Kong product label or an assessment of your suitability. It awaits professional review. Ask a professional before changing medicines.','\n以上是成分层面的一般资料，并非这款香港产品的完整说明书，也不代表适合你使用。内容仍待专业复核；调整用药前请先咨询医护。','\n以上係成分層面嘅一般資料，唔係呢款香港產品嘅完整說明書，亦唔代表啱你用。內容待專業複核；想改藥請先問醫護。'),sourceProfileIds:[...sourceIds]};
}

return {facts,profiles,contexts,contextLines,knowledge};
});
