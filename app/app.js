'use strict';
const $=s=>document.querySelector(s),D=window.MED_DATA,E=window.MedEngine;
const products=new Map(D.products.map(p=>[p.registration_number,p]));
const demos=new Set(D.demoProducts.map(p=>p.registration_number));
let lang=MedLocale.current==='en'?'en':'zh',selected=[],currentResult=null,api=null,generation=0,audioURL=null,previewURL=null,ocrSequence=0;
const Z={
  "productDetails": "藥品資料與注意事項",
  "verifyAI": "核對 AI 回答",
  "prescriptionBoundary": "請依照個人處方。藥盒與藥袋的指示不同時，先問藥師，不要自行調整劑量。",
  "brand": "MedSafe",
  "brandSub": "",
  "docTitle": "MedSafe",
  "brandCredit": "",
  "notice": "試用版本 · 只涵蓋部分相互作用。更改用藥前，請先問藥師。",
  "eyebrow": "香港藥品資料",
  "title": "核對你的藥品",
  "subtitle": "加入正在用和準備加用的藥品，再逐項對照標籤確認。",
  "addTitle": "加入藥品",
  "addNote": "拍照或搜尋",
  "photoTitle": "拍下藥品標籤",
  "photoHint": "拍清完整藥名和 HK 編號，保持光線充足，遮住個人資料。",
  "upload": "選擇圖片",
  "ocrSample": "試用示例照片",
  "privacy": "圖片只交給這台 Mac 識字，處理後刪除暫存檔。",
  "ocrDetails": "查看識別到的文字",
  "or": "或手動查找",
  "searchLabel": "藥名、成分或 HK 編號",
  "find": "查找",
  "samples": "試試這些例子",
  "caseDuplicate": "重複成分",
  "caseInteraction": "相互作用",
  "caseContra": "禁忌例子",
  "caseUnknown": "查不到",
  "confirmTitle": "你的藥品清單",
  "clear": "清空",
  "confirmHint": "請對照藥盒或藥袋，確認完整藥名、HK 編號及劑型。名稱相似也可能是不同藥品。",
  "check": "確認資料並核對",
  "resultTitle": "核對結果",
  "coverageTitle": "資料來源與範圍",
  "catalog": "官方目錄藥品",
  "demoProducts": "示例藥品",
  "demoRules": "已複核規則",
  "coverageNote": "14 條規則記錄了 2026 年 10 月 3 日的臨床複核，但未涵蓋全部相互作用。",
  "about": "資料來源與限制",
  "footer": "資料快照：香港衞生署 · 2026-09-25",
  "footer2": "毋須登入，不保存用藥清單。",
  "emptySelected": "從上方加入至少兩項藥品",
  "emptyTitle": "尚未核對藥品",
  "emptyNote": "加入至少兩項藥品，確認資料後，按「確認資料並核對」。",
  "add": "加入",
  "remove": "移除",
  "ingredients": "有效成分",
  "confirmed": "藥名、HK 編號及劑型與我的標籤相符",
  "sampleConfirm": "我已核對上方示例資料",
  "sampleTag": "練習例子，尚未核對實物。",
  "outOfScope": "請選擇使用途徑。部分成分或相互作用可能未收錄。",
  "notFound": "未找到精確匹配。請查 HK-xxxxx 註冊號，或用英文藥名／成分重試。",
  "unknownAdd": "保留為「未能識別」的藥品",
  "unknownName": "未能識別的藥品",
  "unknownText": "未能確認成分，請帶給藥師辨認。",
  "already": "這項產品已加入。若實際服用了兩份，請另外告知藥劑師。",
  "maxItems": "最多加入 12 項；超出時請帶完整清單問藥劑師。",
  "confirmRemaining": "請先確認所有藥品資料。",
  "alertsTitle": "這些提示需要向藥師查詢",
  "unknownTitle": "部分藥品未能完成核對",
  "noRuleTitle": "這個組合需要藥劑師核實",
  "noRule": "目前收錄的規則沒有找到警示。這不代表可以一起使用，請先問藥師。",
  "unknown": "以下藥品有資料未填寫或未確認：",
  "boundary": "其他風險可能未涵蓋。請依照個人處方，更改用藥前先問藥師。",
  "source": "查看出處",
  "pending": "待醫學複核",
  "speak": "朗讀提示",
  "speaking": "正在生成…",
  "copy": "儲存核對摘要",
  "print": "列印／另存 PDF",
  "elapsed": "本地規則核對耗時",
  "ocrBusy": "正在這台 Mac 上識別文字…",
  "ocrDone": "找到可能相符的藥品。加入後，請對照標籤確認。",
  "ocrNone": "未讀到可用的註冊號或完整藥名。請重新拍清楚，或手動查找。",
  "ocrFail": "未能識別圖片，請用清晰 JPEG／PNG 或手動查找。",
  "ocrOffline": "備用頁面支援查找、確認和規則演示。拍照識字需啟動 Mac 本地服務。",
  "ttsFail": "這個語音未能播放。可以閱讀畫面，或改用其他語音。",
  "ttsFallback": "此瀏覽器沒有可用的本地語音；請啟動 Mac 版本。",
  "modeLocal": "本機服務",
  "modeFile": "離線備用頁",
  "filePrivacy": "備用頁面不讀取或上傳圖片。請手動查找或選擇演示樣例。",
  "inputHint": "例如 HK-53362、PANADOL、paracetamol",
  "sourceExternal": "開啟原始網站（需要網絡）",
  "sourceDate": "資料版本",
  "sourceSection": "對應章節",
  "sourceUS": "此為美國標籤資料，並非香港產品的完整說明書。需由專業人員確認本地適用性。",
  "cached": "以下來源摘錄已隨程式儲存。",
  "restart": "資料已清空",
  "invalid": "請先加入並確認至少兩項藥品。",
  "limitPhoto": "圖片過大，請選擇小於 10 MB 的圖片。",
  "pairGap": "另有組合未命中規則，仍需要專業核實。",
  "skip": "跳到藥品查找",
  "labelKind": "你手上的是甚麼？",
  "pack": "藥盒",
  "bag": "藥袋標籤"
};
const EN={
  "productDetails": "Medicine details and precautions",
  "verifyAI": "Check an AI answer",
  "prescriptionBoundary": "Follow the instructions on your prescription. If the pack and pharmacy label differ, ask your pharmacist before changing a dose.",
  "brand": "MedSafe",
  "brandSub": "",
  "docTitle": "MedSafe",
  "brandCredit": "",
  "notice": "Prototype · Covers selected interactions. Ask a pharmacist before changing medicines.",
  "eyebrow": "Medicine information for Hong Kong",
  "title": "Check your medicines",
  "subtitle": "Add the medicines you take, and any you plan to add. Check each one against its label.",
  "addTitle": "Add medicines",
  "addNote": "Take a photo or search",
  "photoTitle": "Photograph the medicine label",
  "photoHint": "Include the full medicine name and HK number. Use a clear, well-lit photo and cover any personal details.",
  "upload": "Choose a photo",
  "ocrSample": "Try a sample photo",
  "privacy": "Only this Mac reads the image. Temporary image files are deleted after processing.",
  "ocrDetails": "Read the detected text",
  "or": "or search manually",
  "searchLabel": "Medicine name, ingredient or HK number",
  "find": "Find",
  "samples": "Try an example",
  "caseDuplicate": "Duplicate ingredient",
  "caseInteraction": "Interaction",
  "caseContra": "Contraindication",
  "caseUnknown": "Unknown medicine",
  "confirmTitle": "Your medicines",
  "clear": "Clear",
  "confirmHint": "Compare the full name, HK number and form with your pack or pharmacy label. A similar name may be a different medicine.",
  "check": "Check these medicines",
  "resultTitle": "Check results",
  "coverageTitle": "Sources and coverage",
  "catalog": "catalogue products",
  "demoProducts": "example medicines",
  "demoRules": "reviewed rules",
  "coverageNote": "14 rules have a recorded clinical review dated 3 October 2026. This is not a complete interaction check.",
  "about": "Sources and limits",
  "footer": "Data snapshot: Hong Kong Department of Health · 25 Sep 2026",
  "footer2": "No sign-in needed. Your medicine list is not saved.",
  "emptySelected": "Add at least two medicines above",
  "emptyTitle": "No medicines checked yet",
  "emptyNote": "Add at least two medicines, confirm their details, then select Check these medicines.",
  "add": "Add",
  "remove": "Remove",
  "ingredients": "Active ingredients",
  "confirmed": "The name, HK number and form match my label",
  "sampleConfirm": "I have checked the example details above",
  "sampleTag": "Practice example. No real pack has been checked.",
  "outOfScope": "Select how this medicine is used. Some ingredients or interactions may not be covered.",
  "notFound": "No exact match. Check the HK-xxxxx number, or try an English name or ingredient.",
  "unknownAdd": "Keep this medicine as unidentified",
  "unknownName": "Unidentified medicine",
  "unknownText": "The ingredients are unknown. Ask a pharmacist to identify this medicine.",
  "already": "Already added. If two quantities were actually used, tell the pharmacist separately.",
  "maxItems": "Add up to 12 medicines; bring any additional items to a pharmacist.",
  "confirmRemaining": "Confirm every medicine first.",
  "alertsTitle": "Ask your pharmacist about these warnings",
  "unknownTitle": "Some medicines could not be checked",
  "noRuleTitle": "A pharmacist needs to check this combination",
  "noRule": "No warning was found in the rules available here. This does not mean the medicines are safe together. Ask a pharmacist.",
  "unknown": "These medicines have missing or unconfirmed details:",
  "boundary": "Other risks may not be covered. Follow your prescription and check with a pharmacist before changing medicines.",
  "source": "View source",
  "pending": "Clinical review pending",
  "speak": "Read aloud",
  "speaking": "Preparing audio…",
  "copy": "Save check summary",
  "print": "Print / save PDF",
  "elapsed": "Local rule check",
  "ocrBusy": "Reading the image on this Mac…",
  "ocrDone": "Possible matches found. Add a medicine, then check its details against your label.",
  "ocrNone": "No usable registration number or full name found. Take a clearer photo or search manually.",
  "ocrFail": "Image could not be read. Try a clear JPEG / PNG or search manually.",
  "ocrOffline": "This fallback page supports search, confirmation and rule demos. Photo recognition needs the local Mac server.",
  "ttsFail": "Audio could not be played. Read the text or choose another voice.",
  "ttsFallback": "No local browser voice is available. Please launch the Mac version.",
  "modeLocal": "Local service",
  "modeFile": "Offline fallback",
  "filePrivacy": "This fallback page does not read or upload photos. Search manually or choose a demo case.",
  "inputHint": "e.g. HK-53362, PANADOL, paracetamol",
  "sourceExternal": "Open original website (internet required)",
  "sourceDate": "Source version",
  "sourceSection": "Source section",
  "sourceUS": "This is a US label, not the complete Hong Kong product label. A professional must check local applicability.",
  "cached": "This source extract is included with the app.",
  "restart": "All entries cleared",
  "invalid": "Add and confirm at least two medicines first.",
  "limitPhoto": "Choose an image smaller than 10 MB.",
  "pairGap": "Other pairs have no matching rule and still need professional review.",
  "skip": "Skip to medicine search",
  "labelKind": "What do you have?",
  "pack": "Medicine pack",
  "bag": "Pharmacy label",
  "subtitleShort": "Medicine information and questions for your pharmacist."
};
const YUE={
  "brand": "MedSafe",
  "brandSub": "",
  "brandCredit": "",
  "docTitle": "MedSafe",
  "labelKind": "你手上係藥盒定藥袋？",
  "title": "核對你手上嘅藥",
  "subtitle": "加入用緊同準備加用嘅藥，再對住標籤逐隻確認。",
  "addTitle": "加入藥品",
  "confirmTitle": "你嘅藥品清單",
  "check": "資料啱，開始核對",
  "find": "查藥",
  "emptyTitle": "未核對藥品",
  "emptyNote": "先加入最少兩隻藥，對清楚資料，再按「資料啱，開始核對」。",
  "noRuleTitle": "呢個組合要問藥劑師",
  "unknownAdd": "保留做「未能識別」藥品",
  "notice": "試用版本 · 只涵蓋部分相互作用。改藥之前，請先問藥劑師。",
  "eyebrow": "香港藥品資料",
  "alertsTitle": "呢啲提示要問藥劑師",
  "unknownTitle": "有啲藥未能完成核對",
  "noRule": "暫時喺已收錄嘅規則搵唔到警示，唔代表可以一齊用。請先問藥劑師。",
  "boundary": "其他風險可能未涵蓋。請跟個人處方用藥，改藥之前先問藥劑師。"
};
const t=k=>MedLocale.current==='en'?(EN[k]||k):MedLocale.current==='yue'?(YUE[k]||Z[k]||k):MedLocale.simplify(Z[k]||k);
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(message,action=null){
 const node=$('#toast');node.textContent='';const label=document.createElement('span');label.textContent=message;node.append(label);
 if(action){const b=document.createElement('button');b.textContent=action.label;b.onclick=()=>{node.textContent='';action.run();};node.append(b);}
 clearTimeout(toast.timer);toast.timer=setTimeout(()=>node.textContent='',action?12000:4500);
}
function stopAudio(){document.querySelectorAll('audio').forEach(a=>a.pause());if(audioURL){URL.revokeObjectURL(audioURL);audioURL=null;}window.BrowserRuntime?.stopSpeaking?.();window.speechSynthesis?.cancel();window.dispatchEvent(new CustomEvent('reading-change',{detail:{active:false}}));}
function invalidate(){window.dispatchEvent(new Event('medicine-change'));currentResult=null;generation++;stopAudio();renderResult();}
function setLanguage(){
 lang=MedLocale.current==='en'?'en':'zh';
 const os=$('#ocr-status').dataset.state;if(os)$('#ocr-status').textContent=t(os);
 document.documentElement.lang={en:'en',cmn:'zh-Hans',yue:'yue-Hant'}[MedLocale.current];
 document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t(el.dataset.t));
 $('#language').value=MedLocale.current;$('#large-font').textContent=MedLocale.choose('大字','Larger text');
 $('#search').placeholder=t('inputHint');$('#mode').textContent=t(api?'modeLocal':'modeFile');$('#privacy').textContent=t(api?'privacy':'filePrivacy');
 document.title=t('docTitle');
 renderSelected();renderResult();if($('#search').value)doSearch();
 if($('#dialog').open)$('#dialog').close();
 window.dispatchEvent(new Event('language-change'));
 MedLocale.formatDOM(document.querySelector('main'));
}
function emptyResult(){return `<div class="result-empty"><div class="shield"><svg viewBox="0 0 36 36" fill="none" aria-hidden="true"><path d="M9 5h18v26H9V5Z" stroke="currentColor" stroke-width="1.8"/><path d="M13 12h10M13 18h10M13 24h7" stroke="currentColor" stroke-width="1.8"/></svg></div><h3>${t('emptyTitle')}</h3><p>${t('emptyNote')}</p></div>`;}
function renderSelected(){
 const focused=document.activeElement;const focusKind=focused?.hasAttribute('data-confirm')?'confirm':focused?.hasAttribute('data-route')?'route':null;const focusId=focusKind?focused.dataset[focusKind]:null;
 $('#selected').innerHTML=selected.length?selected.map(item=>{const p=products.get(item.id);return `<article class="selected-card"><div class="product-top"><div><strong data-verbatim>${esc(p?.product_name||item.name||t('unknownName'))}</strong><span class="product-id">${esc(p?.registration_number||'UNKNOWN')}</span></div><button class="remove" data-remove="${esc(item.id)}" aria-label="${t('remove')}">×</button></div><p class="ingredient-line">${p?`${t('ingredients')}：${esc(lang==='en'?p.active_ingredients.join(' / '):PatientGuide.ingredients(p,D))}`:t('unknownText')}</p>${p?`<button class="textbtn detail-link" data-product="${esc(item.id)}">${t('productDetails')} ↗</button>`:''}${p?`<label class="route-label">${lang==='en'?'How is it used? Check the label':'怎樣使用？請對照標籤'}<select data-route="${esc(item.id)}" aria-label="${lang==='en'?'Route for ':'使用途徑：'}${esc(p.product_name)}">${[['unknown','未確定','Not sure'],['oral','吞服／口服','Swallowed / oral'],['sublingual','舌下','Under the tongue'],['topical','外用','On the skin'],['inhaled','吸入','Inhaled'],['injection','注射','Injected'],['other','其他','Other']].map(([v,z,e])=>`<option value="${v}" ${(item.route||'unknown')===v?'selected':''}>${lang==='en'?e:z}</option>`).join('')}</select></label>`:''}${item.sample?`<p class="sample-tag">${t('sampleTag')}</p>`:''}${p&&!demos.has(item.id)?`<p class="error-note">${t('outOfScope')}</p>`:''}<label class="confirm-box"><input type="checkbox" data-confirm="${esc(item.id)}" ${item.confirmed?'checked':''}><span>${!p?(lang==='en'?'I understand this medicine could not be identified':'我知道此藥品仍未能識別'):item.sample?t('sampleConfirm'):t('confirmed')}</span></label></article>`;}).join(''):`<div class="empty-selection">${t('emptySelected')}</div>`;
 $('#check').disabled=selected.length<2||selected.some(x=>!x.confirmed);
 $('#confirmation-status').textContent=selected.length>=2&&selected.some(x=>!x.confirmed)?t('confirmRemaining'):'';
 $('#confirmation-status').className='micro';
 if(focusKind)document.querySelector(`[data-${focusKind}="${CSS.escape(focusId)}"]`)?.focus({preventScroll:true});
}
function add(id,sample=false,name=null){if(selected.some(x=>x.id===id))return toast(t('already'));if(selected.length>=12)return toast(t('maxItems'));selected.push({id,confirmed:false,sample,name,route:sample?(D.demoProducts.find(p=>p.registration_number===id)?.demo_route||'unknown'):'unknown'});invalidate();renderSelected();toast(MedLocale.choose('已加入清單','Added to your list','已加入清單'),{label:MedLocale.choose('查看','Review','睇清單'),run:()=>window.ProductExperience?.jump('#your-medicines')});}
function candidatesHTML(rows){return rows.map(p=>`<div class="candidate"><div><strong data-verbatim>${esc(p.product_name)}</strong><small>${esc(p.registration_number)} · ${esc(p.active_ingredients.join(' / '))}</small></div><div class="candidate-actions"><button data-add="${esc(p.registration_number)}">${t('add')}</button><button data-product="${esc(p.registration_number)}">${lang==='en'?'Details':'資料'}</button></div></div>`).join('');}
function doSearch(){let q=$('#search').value.trim();if(q.length<2){$('#search-results').innerHTML='';return;}const mapped=PatientGuide.search(q,D);if(mapped.clarification){$('#search-results').innerHTML=`<p class="error-note">${esc(lang==='en'?mapped.clarification.clarification_en:mapped.clarification.clarification_zh)}</p>`;return;}q=mapped.query;const rows=E.search(D.products,q);$('#search-results').innerHTML=rows.length?candidatesHTML(rows):`<p class="search-empty">${t('notFound')}</p><button class="textbtn" id="add-unknown">${t('unknownAdd')}</button>`;}
function summary(rule){return MedLocale.choose(rule.summary_zh,rule.summary_en);}
function level(rule){const levels={duplicate_ingredient:['重複成分','Duplicate ingredient'],increased_bleeding_risk:['出血風險增加','Increased bleeding risk'],label_recommends_avoid:['標籤建議避免合用','Label recommends avoidance'],label_contraindication:['標籤列為禁忌','Labelled contraindication'],consult_before_use:['使用前需先諮詢','Consult before use'],nitrate_warning:['低血壓風險','Low blood pressure risk']};return levels[rule.evidence_level]?.[lang==='en'?1:0]||rule.evidence_level;}
function renderResult(){
 if(!currentResult){$('#result').innerHTML=emptyResult();$('#print-report').textContent='';return;}
 const r=currentResult;
 $('#print-report').textContent='HacKU 2026 · Medication check · '+new Date().toLocaleDateString()+'\n\n'+reportText()+'\n\n'+[...new Map(r.alerts.map(x=>[x.rule_id,x])).values()].map(x=>x.rule_id+' · '+x.source_section+'\n'+x.source_url).join('\n\n');
 let html=`<h3 class="result-head">${t(r.status==='incomplete_check'?'unknownTitle':r.alerts.length?'alertsTitle':'noRuleTitle')}</h3>`;

 if(r.unknown.length)html+=`<div class="unknown-card"><strong>${t('unknown')}</strong><p>${r.unknown.map(id=>esc(products.get(id)?.product_name||selected.find(x=>x.id===id)?.name||t('unknownName'))).join('<br>')}</p><p>${lang==='en'?'This prototype cannot assess all selected medicines.':'本原型無法核對所有已選藥品。'}</p></div>`;
 if(r.ingredientOverlaps?.length)html+=`<details class="ingredient-comparison" ${r.alerts.length?'':'open'}><summary>${lang==='en'?'Catalogue ingredient comparison':'查看目錄成分對照'}</summary>${r.ingredientOverlaps.map(x=>`<p><strong>${esc(x.listed_ingredients.join(' / '))}</strong><br>${esc(x.products.join(' + '))}</p>`).join('')}<p>${lang==='en'?'The catalogue lists the same ingredient text. Route, formulation, dose and personal risk still require review; this is not an additional clinical interaction rule.':'目錄列出相同的成分原文。途徑、製劑、劑量與個人風險仍需核實；這是資料比對，不是新增臨床相互作用規則。'}</p></details>`;
 for(const rule of r.alerts){html+=`<article class="alert-card ${rule.evidence_level==='label_contraindication'?'high':''}"><div class="alert-level">${esc(level(rule))}</div><h3>${esc(rule.ingredient_a)} + ${esc(rule.ingredient_b)}</h3><p>${esc(summary(rule))}</p>${MedLocale.current==='yue'&&D.patientWording[rule.rule_id]?`<p class="spoken-note"><strong>廣東話解釋</strong><br>${esc(D.patientWording[rule.rule_id].spoken_yue)}</p>`:''}<div class="alert-source"><span>${esc(rule.rule_id)} · ${esc(reviewLabel(rule))}</span><button data-source="${esc(rule.rule_id)}">${t('source')}</button></div></article>`;}
 if(window.ReleaseUI)html+=ReleaseUI.coverageHTML(r);if(window.Consultation)html+=Consultation.resultHTML();
 if(!r.alerts.length)html+=`<p class="result-note">${t('noRule')}</p>`;
 if(r.alerts.length&&r.uncheckedPairs.length)html+=`<p class="result-note">${t('pairGap')}</p>`;
 const refer=PatientGuide.referral(r,MedLocale.current);html+=`<div class="pharmacist-card"><strong>${lang==='en'?'Prepare for a pharmacist':'下一步：問藥劑師'}</strong><p>${esc(lang==='en'?'Take the full medicine list and source warnings to a pharmacist before adding a medicine. Ask them to verify the exact formulations and your personal situation.':refer.reason)}</p><button class="textbtn" id="pharmacist-result">${lang==='en'?'Show questions to bring':'帶甚麼、問甚麼 ↗'}</button></div><p class="boundary-note">${t('boundary')}</p><div class="audio-row"><select id="voice" aria-label="Speech language"><option value="en" ${MedLocale.current==='en'?'selected':''}>English</option><option value="cmn" ${MedLocale.current==='cmn'?'selected':''}>普通话</option><option value="yue" ${MedLocale.current==='yue'?'selected':''}>粵語</option></select><button class="button primary" id="speak">${t('speak')}</button></div><div id="audio-output"></div><div class="secondary-actions"><button class="textbtn" id="download-summary">${t('copy')}</button><button class="textbtn" id="print">${t('print')}</button></div>`;
 $('#result').innerHTML=html;
}
function showDialog(title,body){$('#dialog-title').textContent=title;$('#dialog-body').innerHTML=body;$('#dialog').showModal();}
function reviewLabel(rule){return rule.review_status==='clinician_reviewed'?MedLocale.choose('已記錄臨床複核','Clinical review recorded'):t('pending');}
function showSource(id){const rule=D.rules.find(x=>x.rule_id===id),s=D.sources.find(x=>x.source_id===rule.source_id);showDialog(t('source'),`<p>${t('cached')}</p><h3>${esc(s.title)}</h3><p>${t('sourceDate')}：${esc(s.document_date||'未標明 / not stated')}<br>${t('sourceSection')}：${esc(rule.source_section)}</p><blockquote>${esc(D.excerpts[s.source_id])}</blockquote><p>${esc(summary(rule))}</p>${s.jurisdiction==='US'?`<p class="error-note">${t('sourceUS')}</p>`:''}<p>${esc(reviewLabel(rule))} · ${esc(s.source_id)}</p><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${t('sourceExternal')} ↗</a>`);}
function about(){showDialog(t('about').replace(' ↗',''),lang==='en'?`<h3>Catalogue and rules are separate</h3><p>14,269 products come from the Hong Kong Drug Office XML snapshot dated 25 September 2026. There are 13 illustrated formulations and 14 clinician-reviewed rules (reviewed 3 October 2026). Other products can yield ingredient-matched warnings when routes are recorded; missing mappings remain explicit. All 14 rules were clinician-reviewed on 3 October 2026; uncovered risks remain.</p><h3>What stays on this computer</h3><p>Search, matching, rule checks and cached evidence run locally. In the Mac app, pictures go only to the server on this same computer. Temporary image and speech files are deleted after processing. Selections stay in memory and are cleared on reload. There is no cloud model, account or analytics.</p><h3>Fallback mode</h3><p>Open this page directly from disk to search and test the cases without a server. Photo OCR needs the Mac app. Browser speech is offered only when a local voice is available. Opening an original source website requires internet.</p><a href="https://data.gov.hk/en-data/dataset/hk-dh-dh_do-hk-dh-do-pharmaceutical-product" target="_blank" rel="noopener noreferrer">Hong Kong official data source ↗</a>`:`<h3>藥品目錄與核對規則是兩回事</h3><p>14,269 個產品來自香港衞生署藥物辦公室，資料快照日期為 2026-09-25。本版本有 13 款示例製劑及 14 條規則，均記錄了 2026 年 10 月 3 日的臨床複核。其他產品在成分和途徑明確時也可核對，但未涵蓋全部風險。</p><h3>甚麼留在這台電腦</h3><p>查找、匹配、規則核對及出處摘要均在本機執行。Mac 版本只把照片送到同一台電腦上的服務，處理後刪除圖片與語音暫存檔。選項僅保存在記憶體，重新載入即清空。沒有雲端模型、帳戶或分析追蹤。</p><h3>備用頁面的範圍</h3><p>直接從磁碟打開本頁，可無服務查找與演示。拍照識字需要 Mac 版本。瀏覽器語音只使用可用的本機聲音。開啟原始來源網站需要網絡。</p><a href="https://data.gov.hk/en-data/dataset/hk-dh-dh_do-hk-dh-do-pharmaceutical-product" target="_blank" rel="noopener noreferrer">香港官方資料來源 ↗</a>`);}
function reportText(voice=null){
 if(!currentResult)return '';
 const language=voice||MedLocale.current,english=language==='en',r=currentResult;
 const format=text=>language==='cmn'?MedLocale.simplify(text):text;
 const rows=[english?'Medicine check summary — review with a pharmacist.':format('藥品核對摘要，請帶給藥劑師核實。'),
 ...selected.map(x=>`${products.get(x.id)?.product_name||x.name||t('unknownName')} (${x.id})`),
 ...(r.alerts.length?[...new Map(r.alerts.map(x=>[x.rule_id,x])).values()].map(x=>english?x.summary_en:format(language==='yue'?(D.patientWording[x.rule_id]?.spoken_yue||x.summary_zh):x.summary_zh)):[english?EN.noRule:format(Z.noRule)]),
 ...(r.unknown.length?[english?'Some medicines remain unidentified or outside this check.':format('部分藥品仍未能識別或未能完成核對。')]:[]),
 ...(window.Consultation?Consultation.summaryLines(language):[]),english?EN.boundary:format(Z.boundary)];
 return rows.join('\n\n');
}
async function speak(){const voice=$('#voice').value,text=reportText(voice),g=generation;const button=$('#speak');stopAudio();button.disabled=true;button.textContent=t('speaking');try{
 if(api?.runtime==='browser'){await BrowserRuntime.speak(text,voice);}else if(api?.tts){const res=await fetch('/api/tts',{method:'POST',headers:{'Content-Type':'application/json','X-MedCheck-Token':api.token},body:JSON.stringify({text,voice})});if(!res.ok)throw Error();const blob=await res.blob();if(g!==generation)return;audioURL=URL.createObjectURL(blob);$('#audio-output').innerHTML='<audio controls></audio>';const a=$('#audio-output audio');a.src=audioURL;await a.play();}
 else {const target={yue:['zh-HK','yue'],cmn:['zh-CN','cmn'],en:['en-US','en-GB']}[voice];const found=window.speechSynthesis?.getVoices().find(v=>v.localService&&target.some(l=>v.lang.toLowerCase().startsWith(l.toLowerCase())));if(!found)return toast(t('ttsFallback'));const u=new SpeechSynthesisUtterance(text);u.voice=found;u.lang=found.lang;window.speechSynthesis.speak(u);}
 }catch{toast(t('ttsFail'));}finally{if(g===generation&&$('#speak')){$('#speak').disabled=false;$('#speak').textContent=t('speak');}}}
function clearPhotoResults(){
 $('#photo').disabled=false;$('#ocr-sample').disabled=false;
 if(previewURL)URL.revokeObjectURL(previewURL);previewURL=null;
 $('#ocr-details').hidden=true;$('#ocr-preview').textContent='';$('#ocr-text').textContent='';$('#ocr-candidates').textContent='';
 $('#ocr-status').textContent='';$('#ocr-status').dataset.state='';
}
async function preparePhoto(file){
 const request=++ocrSequence;clearPhotoResults();
 if(file.size>10*1024*1024)return toast(t("limitPhoto"));
 try{const prepared=await PhotoTools.edit(file);if(prepared&&request===ocrSequence)await recognize(prepared.file,false,{script:prepared.script,prepared:true});}catch{toast(t("ocrFail"));}finally{$("#photo").value="";}
}
async function recognize(file,isSample=false,options={}){
 const request=++ocrSequence;clearPhotoResults();
 if(!api?.ocr)return toast(t('ocrOffline'));
 if(!options.prepared&&file.size>10*1024*1024)return toast(t('limitPhoto'));
 $('#ocr-status').className='success-note';$('#ocr-status').dataset.state='ocrBusy';$('#ocr-status').textContent=t('ocrBusy');
 $('#photo').disabled=true;$('#ocr-sample').disabled=true;
 try{
  let data;
  if(api.runtime==='browser')data=await BrowserRuntime.ocr(file,{script:options.script,onProgress:progress=>{if(request===ocrSequence)$('#ocr-status').textContent=t('ocrBusy')+' '+Math.round(progress*100)+'%';}});
  else {
   const base64=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result.split(',')[1]);reader.onerror=reject;reader.readAsDataURL(file);});
   const response=await fetch('/api/ocr',{method:'POST',headers:{'Content-Type':'application/json','X-MedCheck-Token':api.token},body:JSON.stringify({image:base64})});
   if(!response.ok)throw Error();data=await response.json();
  }
  if(request!==ocrSequence)return;
  previewURL=URL.createObjectURL(file);$('#ocr-preview').innerHTML='<img>';$('#ocr-preview img').alt=MedLocale.choose(isSample?'示例藥品標籤':'已選藥品照片',isSample?'Sample medicine label':'Selected medicine photo');$('#ocr-preview img').src=previewURL;
  $('#ocr-text').textContent=data.rows.map(x=>x.text).join('\n');
  const found=E.suggest(D.products,data.rows);
  $('#ocr-candidates').innerHTML=candidatesHTML(found.candidates)+found.unmatchedIds.map(id=>`<p class="error-note">${esc(id)}：${t('unknownText')}</p><button data-add="${esc(id)}">${t('unknownAdd')}</button>`).join('');
  $('#ocr-candidates').dataset.sample=String(isSample);$('#ocr-details').hidden=false;$('#ocr-details').open=true;
  $('#ocr-status').dataset.state=found.candidates.length?'ocrDone':'ocrNone';$('#ocr-status').textContent=t($('#ocr-status').dataset.state);
 }catch{
  if(request===ocrSequence){$('#ocr-status').className='error-note';$('#ocr-status').dataset.state='ocrFail';$('#ocr-status').textContent=t('ocrFail');}
 }finally{if(request===ocrSequence){$('#photo').disabled=false;$('#ocr-sample').disabled=false;$('#photo').value='';}}
}
function reset(){window.PhotoTools?.cancel();ocrSequence++;$('#photo').disabled=false;$('#ocr-sample').disabled=false;window.Consultation?.reset();window.dispatchEvent(new Event('medicine-change'));generation++;selected=[];currentResult=null;stopAudio();if(previewURL)URL.revokeObjectURL(previewURL);previewURL=null;$('#ocr-details').hidden=true;$('#ocr-preview').innerHTML='';$('#ocr-text').textContent='';$('#ocr-candidates').innerHTML='';$('#ocr-status').textContent='';$('#ocr-status').dataset.state='';$('#search').value='';$('#search-results').innerHTML='';renderSelected();renderResult();}
document.addEventListener('click',event=>{const el=event.target.closest('button');if(!el)return;
 if(el.dataset.add)add(el.dataset.add,el.closest('#ocr-candidates')?.dataset.sample==='true');
 if(el.dataset.remove){
  const previous=selected.map(x=>({...x}));selected=selected.filter(x=>x.id!==el.dataset.remove);invalidate();renderSelected();const revision=generation;
  toast(MedLocale.choose('已移除藥品','Medicine removed'),{label:MedLocale.choose('復原','Undo'),run:()=>{if(generation!==revision)return;selected=previous;invalidate();renderSelected();toast(MedLocale.choose('已復原','Restored'));}});
 }
 if(el.dataset.source)showSource(el.dataset.source);
 if(el.dataset.case){reset();const preset={duplicate:['HK-53362','HK-53319'],interaction:['HK-41421','HK-35198'],contra:['HK-34337','HK-43890'],unknown:['HK-53362','DEMO-UNKNOWN']}[el.dataset.case];preset.forEach(id=>add(id,true,id==='DEMO-UNKNOWN'?t('unknownName'):null));}
 if(el.id==='add-unknown')add('UNKNOWN-'+Date.now(),false,$('#search').value.slice(0,120));
 if(el.id==='speak')speak();
 if(el.id==='print')window.print();
 if(el.id==='download-summary'){const citations=currentResult.alerts.map(r=>`${r.rule_id} ${r.source_section}\n${r.source_url}`).join('\n\n');const blob=new Blob([reportText()+'\n\n'+citations],{type:'text/plain;charset=utf-8'});const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download='medsafe-check-summary.txt';a.click();setTimeout(()=>URL.revokeObjectURL(u),500);}
});
document.addEventListener('change',event=>{if(event.target.dataset.route){const item=selected.find(x=>x.id===event.target.dataset.route);item.route=event.target.value;invalidate();renderSelected();}if(event.target.dataset.confirm){const item=selected.find(x=>x.id===event.target.dataset.confirm);item.confirmed=event.target.checked;invalidate();renderSelected();}});
$('#large-font').onclick=()=>{const active=document.documentElement.dataset.large!=='true';document.documentElement.dataset.large=String(active);$('#large-font').setAttribute('aria-pressed',String(active));};
$('#language').onchange=event=>MedLocale.set(event.target.value);
window.addEventListener('locale-change',()=>{generation++;$('#toast').textContent='';stopAudio();setLanguage();});
$('#check').onclick=()=>{const start=performance.now();const r=E.check(selected,D);if(['identity_confirmation_required','insufficient_products','duplicate_input_requires_review'].includes(r.status))return toast(t('invalid'));currentResult={...r,elapsedMs:performance.now()-start};renderResult();if(innerWidth<761)$('#result-heading').scrollIntoView({behavior:'smooth',block:'start'});};
$('#search-btn').onclick=doSearch;$('#search').addEventListener('input',doSearch);$('#search').addEventListener('keydown',e=>{if(e.key==='Enter')doSearch();});
$('#clear').onclick=()=>{
 const previous=selected.map(x=>({...x})),notes=window.Consultation?.get();reset();const revision=generation;
 toast(t('restart'),previous.length?{label:MedLocale.choose('復原','Undo'),run:()=>{if(generation!==revision)return;selected=previous;window.Consultation?.restore(notes);invalidate();renderSelected();toast(MedLocale.choose('已復原','Restored'));}}:null);
};$('#about').onclick=about;$('#close-dialog').onclick=()=>$('#dialog').close();$('#dialog').addEventListener('click',e=>{if(e.target===$('#dialog')){const r=$('#dialog').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('#dialog').close();}});
$('#photo').onchange=e=>{if(e.target.files[0])preparePhoto(e.target.files[0]);};$('#upload-label').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('#photo').click();}});
$('#ocr-sample').onclick=async()=>{if(!api?.ocr)return toast(t('ocrOffline'));try{const b=await(await fetch('sample-labels.png')).blob();recognize(new File([b],'synthetic-labels.png',{type:'image/png'}),true);}catch{toast(t('ocrFail'));}};
setLanguage();
if(location.protocol==='http:'&&['127.0.0.1','localhost'].includes(location.hostname))fetch('/api/status').then(r=>r.json()).then(s=>{api=s;setLanguage();window.dispatchEvent(new Event('local-api-ready'));}).catch(()=>{});
window.addEventListener('beforeunload',stopAudio);

// Format translated display text after asynchronous OCR, results and dialogs.
new MutationObserver(records=>{for(const r of records){if(r.type==='characterData')MedLocale.formatDOM(r.target);else for(const n of r.addedNodes)MedLocale.formatDOM(n);}}).observe(document.body,{childList:true,subtree:true,characterData:true});
