(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PatientGuide=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const Info=typeof module==='object'&&module.exports?require('./medicine-info.js'):globalThis.MedicineInfo;
const norm=s=>String(s||'').normalize('NFKC').toLowerCase().trim();
function contains(text,alias){const a=norm(alias);if(/^[a-z0-9 ().-]+$/.test(a)){const escaped=a.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return new RegExp('(^|[^a-z])'+escaped+'($|[^a-z])','i').test(text);}return text.includes(a);}
function terms(query,data){const q=norm(query);return data.lexicon.entries.filter(e=>e.aliases.some(a=>contains(q,a)));}
function search(query,data){const q=norm(query);const e=data.lexicon.entries.find(e=>e.aliases.some(a=>norm(a)===q));return {query:e?.search_query||query,clarification:e?.kind==='ambiguous_class'?e:null,entry:e||null};}
function ingredients(product,data){return product.active_ingredients.map(x=>{const match=data.lexicon.entries.find(e=>e.kind==='ingredient'&&e.aliases.some(a=>norm(a)===norm(x)));return match?match.zh_hant+' ('+x+')':x;}).join(' / ');}
function warningText(result,data){
 const rules=[...new Map((result?.alerts||[]).map(r=>[r.rule_id,r])).values()];
 const lines=rules.map(r=>data.patientWording[r.rule_id]?.spoken_yue||r.summary_zh);if(result?.potentialAlerts?.length)lines.push('另外有成分涉及已整理警示，但途徑未能對應，請藥劑師核實，唔可以忽略。');
 if(result?.unknown?.length)lines.push('有藥品未能識別，或者唔喺演示範圍，今次核對未完成。');
 if(!rules.length)lines.push('呢個組合暫時查唔到足夠依據，唔代表可以一齊食。');
 else if(result.uncheckedPairs?.length)lines.push('另外有組合未有規則覆蓋，需要藥劑師再核實。');
 return lines;
}
function referral(result){
 if(!result)return {reason:'未完成藥品資料確認。',question:'請先幫我核實完整藥名、註冊號、成分同劑型。'};

 if(result.alerts.some(r=>r.evidence_level==='label_contraindication'))return {reason:'有來源把這個組合列為禁忌，需盡快由專業人員核實。',question:'說明書有禁忌提示，請幫我核實本地製劑是否適用，同埋現有處方應該點處理。'};
 if(result.unknown?.length)return {reason:'有藥品未能識別或超出演示範圍，無法完成核對。',question:'請幫我確認未識別嘅藥，並核對成份、其他用藥同個人情況。'};
 if(result.alerts.length)return {reason:'有重複成分或已知合用警示；加用新藥前需要核實。',question:'我想加用呢款藥，會唔會食重咗成分或者影響現有處方？有咩需要留意？'};
 return {reason:'未找到規則；這不代表已排除風險。',question:'原型未查到足夠依據，請幫我核對呢個組合同我嘅個人情況。'};
}
function answer(question,items,result,data){
 const q=norm(question),found=terms(q,data),base={clinicalSafety:'not_assessed',autoSelect:[],sourceRuleIds:[],needsPharmacist:true,reviewStatus:'pending_ella_review'};
 const out=(intent,text,extra={})=>({...base,intent,text,...extra});
 if(!q)return out('empty','請先講或者輸入你想問嘅問題。');
 if(/(呼吸困難|呼吸困难|喘唔到氣|喘唔到气|昏迷|叫唔醒|抽搐|trouble breathing|unconscious|seizure)/i.test(q))return out('urgent_help','如果你講嘅呼吸困難、叫唔醒、抽搐等情況正喺發生，請立即打香港 999 求助，唔好等藥品核對或者語音結果。原型唔可以判斷嚴重程度。如果你只係問一般副作用，可以講「呢隻藥有咩副作用？」。',{sourceProfileIds:['emergency'],urgency:'conditional_emergency'});
 if(/(藥袋|药袋|處方.*藥盒|处方.*药盒|醫生.*(唔同|不同)|医生.*(唔同|不同)|指示.*(唔同|不同)|prescription.*(pack|label)|label.*prescription)/i.test(q))return out('prescription_reconciliation','藥盒只係產品資料，唔可以由佢推斷你今次嘅個人食法。如果藥袋、處方同藥盒指示唔同，請帶齊最新處方同藥袋，向藥劑師或者開藥醫生核實。原型唔會判斷邊份指示啱，亦唔會叫你自行加量、減量或者停藥。');
 if(/(幾粒|几粒|幾多|几多|劑量|剂量|停藥|停药|加量|減量|减量|改藥|改药|漏服|漏食|懷孕|怀孕|孕婦|孕妇|餵奶|喂奶|小朋友|兒童|儿童|腎|肾|肝病|過敏|过敏|dose|dosage|pregnan|stop taking|missed dose|allerg)/i.test(q))return out('personal_review','呢個問題需要知道你嘅處方同個人情況，原型答唔到應該食幾多、停唔停藥或者點樣改藥。請帶齊藥盒同藥袋問藥劑師或者開藥醫生，唔好自行改劑量或處方。');
 if(/(冇食|無食|没吃|沒吃|沒有服用|没有服用|冇用|不是|唔係|not taking|don.t take|no longer taking)/i.test(q))return out('identity_correction','你嘅問題可能係更正用藥資料。請先更新上面嘅藥品清單，再逐項確認。我唔會根據語音自行加藥、刪藥或者判斷用緊邊隻藥。');
 const ambiguous=found.find(e=>e.kind==='ambiguous_class');
 if(ambiguous)return out('ambiguous_name',ambiguous.clarification_zh+' 請先確認完整藥名，我唔會估係邊隻藥。');
 if(!items.length||items.some(x=>!x.confirmed))return out('identity_required','請先對照藥盒或藥袋，確認上面每一項嘅完整名稱、註冊號同劑型。確認咗問句，唔等於確認咗藥品。認唔清楚就帶實物問藥劑師。');
 const selectedProducts=items.map(x=>data.products.find(p=>p.registration_number===x.id)).filter(Boolean);
 const selectedDemo=items.map(x=>data.demoProducts.find(p=>p.registration_number===x.id)).filter(Boolean);
 const selectedIngredients=selectedProducts.flatMap(p=>p.active_ingredients.map(raw=>{const a=data.aliases.find(a=>a.aliases.some(x=>norm(x)===norm(raw)));return norm(a?.canonical||raw);}));
 const ids=[...q.matchAll(/hk\s*[- ]?\s*(\d{5})/g)].map(m=>'HK-'+m[1]);
 const unmatched=found.filter(e=>e.kind==='ingredient'&&!selectedIngredients.includes(norm(e.canonical))||e.kind==='brand_family'&&!selectedProducts.some(p=>p.product_name.includes(e.canonical)));
 if(unmatched.length||ids.some(id=>!items.some(x=>x.id===id)))return out('unconfirmed_mention','你問到嘅藥名或者註冊號，同今次已確認清單未能全部對應。請先用完整藥名或者註冊號加入，再對照藥盒確認。我唔會根據語音估製劑。');
 // Free text cannot silently introduce a different medicine into the confirmed list.
 if(/(同|與|与|加|一齊|一齐|一起|合用|together|with)/i.test(q)){
  let residual=q;for(const e of found)for(const a of [...e.aliases].sort((a,b)=>b.length-a.length))residual=residual.split(norm(a)).join('');
  residual=residual.replace(/hk\s*[- ]?\s*\d{5}/g,'').replace(/(呢兩隻藥|呢两只药|呢兩種藥|呢两种药|呢啲藥|呢啲药|兩隻藥|两只药|兩種藥|两种药|這兩種藥|这两种药|上面|清單|清单|已確認|已确认|可唔可以|可以|會唔會|会唔会|可否|有冇|一齊|一齐|一起|合用|安全|風險|风险|重複|重复|食重|禁忌|注意|提示|警示|呢個組合|呢个组合|呢兩款|呢两款|這個組合|这个组合|唔該|请问|請問|係咪|系咪|一樣|一样|同埋|需要)/g,'').replace(/[同與与加食服用藥药我想嗎吗呢呀啊有咩乜嘅是否能和]/g,'').replace(/\b(can|these|this|the|two|medicines|medicine|drugs|drug|be|taken|take|together|with|and|is|it|safe|to|i|warnings|risk|risks)\b/g,'').replace(/[\s\p{P}\d]/gu,'');
  if(residual)return out('unresolved_question','問句入面有內容未能同已確認清單可靠對應。請先確認完整藥名，再問「呢兩隻藥可唔可以一齊食？」。你亦可以直接把問題交畀藥劑師，原型唔會估你指邊隻藥。');
 }
 if(found.some(e=>e.kind==='brand_family')&&/(一樣|一样|分別|分别|same)/i.test(q))return out('brand_explanation','必理痛係品牌名稱，唔同款式可以有唔同成分。撲熱息痛係成分名稱，英文可以寫 paracetamol 或 acetaminophen。請用完整產品名同註冊號核對，唔好只憑品牌當成同一隻藥。');
 if(/(成分|成份|乜藥|乜药|咩藥|咩药|什麼藥|什么药|ingredient|what.*medicine)/i.test(q))return out('ingredients',selectedProducts.map(p=>p.product_name+'，'+p.registration_number+'。成分：'+ingredients(p,data)+'。').join('\n')+'\n呢度只係資料核對，唔代表已判斷啱唔啱你用。');
 if(data.medicineProfiles&&Info){const facts=Info.knowledge(question,items,data);if(facts)return out(facts.intent,facts.text,{sourceProfileIds:facts.sourceProfileIds});}
 if(!result)return out('check_required','藥品清單已確認。請先按「確認資料並核對」，再問呢個組合嘅提示。');
 if(/(藥師|药师|藥劑師|药剂师|pharmacist)/i.test(q)){const r=referral(result);return out('pharmacist',r.reason+'\n你可以咁問：'+r.question+'\n請同時提供實際食法、其他藥同身體情況。', {sourceRuleIds:[...new Set(result.alerts.map(r=>r.rule_id))]});}
 if(/(一齊|一齐|一起|同食|合用|重複|重复|食重|禁忌|風險|风险|注意|安全|提示|警示|得唔得|可唔可以|can.*take|together|risk|safe|warning|contraindication)/i.test(q))return out('check_summary','以下只講上面已確認清單嘅演示提示。\n'+warningText(result,data).join('\n')+'\n呢啲係未經醫學複核嘅演示提示，資料亦未齊，唔可以當成可以合用嘅結論。請藥劑師核實。',{sourceRuleIds:[...new Set(result.alerts.map(r=>r.rule_id))]});
 return out('out_of_scope','我而家只可以解釋已確認藥品嘅成分、演示警示，同埋整理要問藥劑師嘅問題。你呢個問題暫時答唔到，請帶齊藥品資料問藥劑師。');
}
return {terms,search,ingredients,warningText,referral,answer};
});
