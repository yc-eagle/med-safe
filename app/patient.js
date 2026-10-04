(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PatientGuide=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const Info=typeof module==='object'&&module.exports?require('./medicine-info.js'):globalThis.MedicineInfo;
const norm=s=>String(s||'').normalize('NFKC').toLowerCase().trim();
function contains(text,alias){const a=norm(alias);if(/^[a-z0-9 ().-]+$/.test(a)){const escaped=a.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');return new RegExp('(^|[^a-z])'+escaped+'($|[^a-z])','i').test(text);}return text.includes(a);}
function terms(query,data){const q=norm(query);return data.lexicon.entries.filter(e=>e.aliases.some(a=>contains(q,a)));}
function search(query,data){const q=norm(query);const e=data.lexicon.entries.find(e=>e.aliases.some(a=>norm(a)===q));return {query:e?.search_query||query,clarification:e?.kind==='ambiguous_class'?e:null,entry:e||null};}
function ingredients(product,data){return product.active_ingredients.map(x=>{const match=data.lexicon.entries.find(e=>e.kind==='ingredient'&&e.aliases.some(a=>norm(a)===norm(x)));return match?match.zh_hant+' ('+x+')':x;}).join(' / ');}
function warningTextYue(result,data){
 const rules=[...new Map((result?.alerts||[]).map(r=>[r.rule_id,r])).values()];
 const lines=rules.map(r=>data.patientWording[r.rule_id]?.spoken_yue||r.summary_zh);if(result?.potentialAlerts?.length)lines.push('另外有成分涉及已整理警示，但途徑未能對應，請藥劑師核實，唔可以忽略。');
 if(result?.unknown?.length)lines.push('有藥品未能識別，或者唔喺演示範圍，今次核對未完成。');
 if(!rules.length)lines.push('呢個組合暫時查唔到足夠依據，唔代表可以一齊食。');
 else if(result.uncheckedPairs?.length)lines.push('另外有組合未有規則覆蓋，需要藥劑師再核實。');
 return lines;
}
function referralYue(result){
 if(!result)return {reason:'未完成藥品資料確認。',question:'請先幫我核實完整藥名、註冊號、成分同劑型。'};

 if(result.alerts.some(r=>r.evidence_level==='label_contraindication'))return {reason:'有來源把這個組合列為禁忌，需盡快由專業人員核實。',question:'說明書有禁忌提示，請幫我核實本地製劑是否適用，同埋現有處方應該點處理。'};
 if(result.unknown?.length)return {reason:'有藥品未能識別或超出演示範圍，無法完成核對。',question:'請幫我確認未識別嘅藥，並核對成份、其他用藥同個人情況。'};
 if(result.alerts.length)return {reason:'有重複成分或已知合用警示；加用新藥前需要核實。',question:'我想加用呢款藥，會唔會食重咗成分或者影響現有處方？有咩需要留意？'};
 return {reason:'未找到規則；這不代表已排除風險。',question:'原型未查到足夠依據，請幫我核對呢個組合同我嘅個人情況。'};
}
function answerYue(question,items,result,data){
 const q=norm(question),found=terms(q,data),base={clinicalSafety:'not_assessed',autoSelect:[],sourceRuleIds:[],needsPharmacist:true,reviewStatus:'not_reviewed'};
 const out=(intent,text,extra={})=>({...base,intent,text,...extra});
 if(!q)return out('empty','請先講或者輸入你想問嘅問題。');
 if(/(呼吸困難|呼吸困难|喘唔到氣|喘唔到气|昏迷|叫唔醒|抽搐|trouble breathing|unconscious|seizure)/i.test(q))return out('urgent_help','如果你講嘅呼吸困難、叫唔醒、抽搐等情況正喺發生，請立即打香港 999 求助，唔好等藥品核對或者語音結果。原型唔可以判斷嚴重程度。如果你只係問一般副作用，可以講「呢隻藥有咩副作用？」。',{sourceProfileIds:['emergency'],urgency:'conditional_emergency'});
 if(/(藥袋|药袋|處方.*藥盒|处方.*药盒|醫生.*(唔同|不同)|医生.*(唔同|不同)|指示.*(唔同|不同)|prescription.*(pack|label)|label.*prescription)/i.test(q))return out('prescription_reconciliation','藥盒只係產品資料，唔可以由佢推斷你今次嘅個人食法。如果藥袋、處方同藥盒指示唔同，請帶齊最新處方同藥袋，向藥劑師或者開藥醫生核實。原型唔會判斷邊份指示啱，亦唔會叫你自行加量、減量或者停藥。');
 if(/(幾粒|几粒|幾多|几多|劑量|剂量|停藥|停药|加量|減量|减量|改藥|改药|漏服|漏食|懷孕|怀孕|孕婦|孕妇|餵奶|喂奶|小朋友|兒童|儿童|腎|肾|肝病|過敏|过敏|多少|dose|dosage|how much|how many|pregnan|stop taking|missed dose|allerg)/i.test(q))return out('personal_review','呢個問題需要知道你嘅處方同個人情況，原型答唔到應該食幾多、停唔停藥或者點樣改藥。請帶齊藥盒同藥袋問藥劑師或者開藥醫生，唔好自行改劑量或處方。');
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
  residual=residual.replace(/hk\s*[- ]?\s*\d{5}/g,'').replace(/(這些藥物|这些药物|這些藥|这些药|這幾種藥|这几种药|呢兩隻藥|呢两只药|呢兩種藥|呢两种药|呢啲藥|呢啲药|兩隻藥|两只药|兩種藥|两种药|這兩種藥|这两种药|上面|清單|清单|已確認|已确认|可唔可以|可以|會唔會|会唔会|可否|有冇|一齊|一齐|一起|合用|安全|風險|风险|重複|重复|食重|禁忌|注意|提示|警示|呢個組合|呢个组合|呢兩款|呢两款|這個組合|这个组合|唔該|请问|請問|係咪|系咪|一樣|一样|同埋|需要)/g,'').replace(/[同與与加食吃服用藥药我想嗎吗呢呀啊有咩乜嘅是否能和]/g,'').replace(/\b(can|these|this|the|two|medicines|medicine|drugs|drug|be|taken|take|together|with|and|is|it|safe|to|i|warnings|risk|risks)\b/g,'').replace(/[\s\p{P}\d]/gu,'');
  if(residual)return out('unresolved_question','問句入面有內容未能同已確認清單可靠對應。請先確認完整藥名，再問「呢兩隻藥可唔可以一齊食？」。你亦可以直接把問題交畀藥劑師，原型唔會估你指邊隻藥。');
 }
 if(found.some(e=>e.kind==='brand_family')&&/(一樣|一样|分別|分别|same)/i.test(q))return out('brand_explanation','必理痛係品牌名稱，唔同款式可以有唔同成分。撲熱息痛係成分名稱，英文可以寫 paracetamol 或 acetaminophen。請用完整產品名同註冊號核對，唔好只憑品牌當成同一隻藥。');
 if(/(成分|成份|乜藥|乜药|咩藥|咩药|什麼藥|什么药|ingredient|what.*medicine)/i.test(q)&&!/(used for|what.*for|side effect|stor|refrigerat)/i.test(q))return out('ingredients',selectedProducts.map(p=>p.product_name+'，'+p.registration_number+'。成分：'+ingredients(p,data)+'。').join('\n')+'\n呢度只係資料核對，唔代表已判斷啱唔啱你用。');
 if(data.medicineProfiles&&Info){const facts=Info.knowledge(question,items,data);if(facts)return out(facts.intent,facts.text,{sourceProfileIds:facts.sourceProfileIds});}
 if(!result)return out('check_required','藥品清單已確認。請先按「確認資料並核對」，再問呢個組合嘅提示。');
 if(/(藥師|药师|藥劑師|药剂师|pharmacist)/i.test(q)){const r=referral(result);return out('pharmacist',r.reason+'\n你可以咁問：'+r.question+'\n請同時提供實際食法、其他藥同身體情況。', {sourceRuleIds:[...new Set(result.alerts.map(r=>r.rule_id))]});}
 if(/(一齊|一齐|一起|同食|合用|重複|重复|食重|禁忌|風險|风险|注意|安全|提示|警示|得唔得|可唔可以|can.*take|together|risk|safe|warning|contraindication)/i.test(q))return out('check_summary','以下只講上面已確認清單嘅演示提示。\n'+warningText(result,data).join('\n')+'\n相關規則已完成臨床複核，粵語字句仍待複核。資料亦未齊，唔可以當成可以合用嘅結論。請藥劑師核實。',{sourceRuleIds:[...new Set(result.alerts.map(r=>r.rule_id))]});
 return out('out_of_scope','我而家只可以解釋已確認藥品嘅成分、演示警示，同埋整理要問藥劑師嘅問題。你呢個問題暫時答唔到，請帶齊藥品資料問藥劑師。');
}

let Locale=globalThis.MedLocale;
if(typeof module==='object'&&module.exports){try{Locale=require('./locale.js');}catch{/* Legacy Node callers may not load the UI locale module. */}}
const simple=text=>Locale?.simplify?Locale.simplify(text):text;
const choose=(locale,en,cmn,yue)=>locale==='en'?en:locale==='cmn'?simple(cmn):yue;
function warningText(result,data,locale='yue'){
 if(locale==='yue')return warningTextYue(result,data);
 const english=locale==='en',rules=[...new Map((result?.alerts||[]).map(r=>[r.rule_id,r])).values()];
 const lines=rules.map(r=>english?(r.summary_en||'A sourced warning needs professional review.') : simple(r.summary_zh));
 if(result?.potentialAlerts?.length)lines.push(choose(locale,'Other ingredients involve a prepared warning, but the administration route has not been matched. Ask a pharmacist to review it; do not disregard it.','另外有成分涉及已整理的警示，但使用途径尚未核实，请药师确认，不可忽略。'));
 if(result?.unknown?.length)lines.push(choose(locale,'Some medicines are unidentified or outside the prepared scope. The check is incomplete.','有药品尚未识别或超出当前核对范围，因此本次核对不完整。'));
 if(!rules.length)lines.push(choose(locale,'This combination is not sufficiently covered. That does not mean the medicines can be taken together.','这个组合暂时没有足够依据，不代表可以一起服用。'));
 else if(result.uncheckedPairs?.length)lines.push(choose(locale,'Other pairs are not covered by the rules and still require a pharmacist to review.','另外有组合尚未被规则覆盖，需要药师继续核实。'));
 return lines;
}
function referral(result,locale='yue'){
 if(locale==='yue')return referralYue(result);
 let key=!result?'identity':result.alerts?.some(r=>r.evidence_level==='label_contraindication')?'contra':result.unknown?.length?'unknown':result.alerts?.length?'warning':'missing';
 const texts={
 identity:['Medicine identities have not been confirmed.','Please help me verify the full names, registration numbers, ingredients and dosage forms.','药品身份信息尚未确认。','请先帮我核实完整药名、注册号、成分和剂型。'],
 contra:['A source lists this combination as contraindicated. Prompt professional review is needed.','The source flags a contraindication. Does it apply to these Hong Kong formulations, and how should my current prescription be reconciled?','有来源把这个组合列为禁忌，需要尽快由专业人员核实。','来源提示存在禁忌，请帮我核实是否适用于这些香港制剂，以及现有处方应该如何处理。'],
 unknown:['Some medicines are unidentified or outside the prepared scope, so the check is incomplete.','Please identify the unresolved medicine and review all ingredients, other medicines and my circumstances.','有药品尚未识别或超出核对范围，无法完成核对。','请帮我确认尚未识别的药品，并核对成分、其他用药和个人情况。'],
 warning:['A duplicate ingredient or combination warning needs review before adding a medicine.','Could this new medicine duplicate an ingredient or affect my current prescription? What should I look out for?','有重复成分或合用警示，加用新药前需要核实。','我准备加用这款药，会不会重复服用某个成分或影响现有处方？有什么需要注意？'],
 missing:['No matching rule was found. Risks have not been ruled out.','The prototype has insufficient evidence. Please review this combination and my individual circumstances.','未找到匹配规则，不代表已经排除风险。','原型没有查到足够依据，请帮我核对这个组合和个人情况。']};
 const row=texts[key];return {reason:locale==='en'?row[0]:row[2],question:locale==='en'?row[1]:row[3]};
}
function answer(question,items,result,data,locale='yue'){
 const answer=answerYue(question,items,result,data);
 if(locale==='yue')return answer;
 const en=locale==='en',say=(english,mandarin)=>choose(locale,english,mandarin);
 const copy={
 empty:['Speak or type your question first.','请先说出或输入你的问题。'],
 urgent_help:['If breathing difficulty, unconsciousness or seizures are happening now, call 999 in Hong Kong immediately. Do not wait for this medicine check or a voice answer. This prototype cannot assess severity. For a general question, ask about possible side effects.','如果呼吸困难、叫不醒或抽搐等情况正在发生，请立即拨打香港 999 求助，不要等待药品核对或语音结果。原型无法判断严重程度。如果只是一般疑问，可以问“这款药有哪些副作用？”'],
 prescription_reconciliation:['A medicine pack describes the product, not your personal prescription. If the medicine bag, prescription and pack instructions differ, bring the latest prescription and bag to a pharmacist or prescriber. This prototype cannot decide which instruction is correct or tell you to increase, reduce or stop treatment.','药盒说明的是产品信息，不能据此推断个人服用方法。如果药袋、处方和药盒指示不同，请带齐最新处方和药袋，向药师或开药医生核实。原型不会判断哪份指示正确，也不会要求你自行加量、减量或停药。'],
 personal_review:['This needs your prescription and individual circumstances. The prototype cannot tell you what dose to take or whether to stop or change treatment. Bring the medicine packs and bags to a pharmacist or prescriber; do not change the dose or prescription yourself.','这个问题需要结合处方和个人情况。原型不能判断应该服用多少、是否停药或如何调整用药。请带齐药盒和药袋咨询药师或开药医生，不要自行调整剂量或处方。'],
 identity_correction:['You may be correcting the medicine list. Update it above and confirm each item first. Speech input never automatically adds, removes or identifies your medicines.','你可能是在更正用药信息。请先更新上面的药品清单，再逐项确认。语音不会自动添加、删除或确认你正在使用的药品。'],
 identity_required:['First confirm each full name, registration number and dosage form against the medicine pack or bag. Confirming a question does not confirm the medicines. If a label is unclear, take it to a pharmacist.','请先对照药盒或药袋，逐项确认完整名称、注册号和剂型。确认问句不等于确认药品。无法辨认时，请带实物咨询药师。'],
 unconfirmed_mention:['A medicine name or registration number in the question does not match the confirmed list. Add the exact product and confirm it against the pack first. Speech input cannot establish the formulation.','问句中的药名或注册号未能与已确认清单全部对应。请先用完整药名或注册号添加，再对照药盒确认。不能根据语音猜测具体制剂。'],
 unresolved_question:['Some wording cannot be reliably matched to the confirmed list. Confirm the exact medicines first, then ask “Can these medicines be taken together?” You can also take the question directly to a pharmacist.','问句中有内容尚未能与已确认清单可靠对应。请先确认完整药名，再问“这两种药可以一起服用吗？”也可以直接把问题交给药师，原型不会猜测药品。'],
 brand_explanation:['Panadol is a brand family; different variants may contain different ingredients. Paracetamol, also called acetaminophen, is an ingredient. Check the full product name and registration number instead of assuming all products under one brand are the same.','必理痛是品牌名称，不同款式可能含不同成分。扑热息痛是成分名称，英文为 paracetamol 或 acetaminophen。请核对完整产品名称和注册号，不要仅凭品牌判断是同一种药。'],
 check_required:['The medicine list is confirmed. Run the medicine check above before asking about combination warnings.','药品清单已确认。请先运行上方的药品核对，再询问这个组合的警示。'],
 out_of_scope:['I can explain the confirmed ingredients and prepared warnings, and help prepare questions for a pharmacist. This question is outside the current scope. Bring the medicine information to a pharmacist.','目前可以解释已确认药品的成分和已整理警示，并帮助准备咨询药师的问题。这个问题暂时超出范围，请带齐药品信息咨询药师。']};
 if(copy[answer.intent])answer.text=say(...copy[answer.intent]);
 else if(answer.intent==='ambiguous_name'){
  const entry=terms(question,data).find(e=>e.kind==='ambiguous_class');answer.text=(en?entry?.clarification_en:simple(entry?.clarification_zh||''))+say(' Confirm the exact medicine first; I will not guess its identity.',' 请先确认完整药名，不能猜测具体药品。');
 }else if(answer.intent==='ingredients'){
  answer.text=items.map(i=>data.products.find(p=>p.registration_number===i.id)).filter(Boolean).map(p=>p.product_name+' ('+p.registration_number+'). '+say('Ingredients: ','成分：')+(en?p.active_ingredients.join(' / '):simple(ingredients(p,data)))).join('\n')+say('\nThis confirms product facts only; it does not establish personal suitability.','\n以上只核对产品信息，不代表已经判断是否适合你使用。');
 }else if(['use_information','side_effects_information','storage_information'].includes(answer.intent)){
  const facts=Info.knowledge(question,items,data,locale);if(facts){answer.text=facts.text;answer.sourceProfileIds=facts.sourceProfileIds;}
 }else if(answer.intent==='pharmacist'){
  const r=referral(result,locale);answer.text=r.reason+'\n'+say('You can ask: ','可以这样问：')+r.question+say('\nAlso explain your actual dose and schedule, other medicines and relevant health circumstances.','\n同时提供实际服用方法、其他药物和相关身体情况。');
 }else if(answer.intent==='check_summary'){
  answer.text=say('These warnings concern only the confirmed list above.\n','以下警示仅针对上方已确认的药品清单。\n')+warningText(result,data,locale).join('\n')+say('\nThe 14 rules behind these warnings were clinician-reviewed on 3 October 2026; they still do not provide a complete assessment or approval to combine medicines. Ask a pharmacist to review.','\n这些警示依据的 14 条规则已于 2026 年 10 月 3 日经临床复核；它们仍不能提供完整评估，也不能据此认定可以合用。请药师核实。');
 }
 return answer;
}

return {terms,search,ingredients,warningText,referral,answer};
});
