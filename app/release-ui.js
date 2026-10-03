'use strict';
(()=>{
 const tr=(z,e)=>lang==='en'?e:z;
 function coverageHTML(r){
  const pairLabel=ids=>ids.map(id=>products.get(id)?.product_name||id).join(' + ');
  let html=`<section class="pair-summary"><strong>${tr('今次逐對核對','Pairs examined')}: ${r.totalPairs} ${tr('對','pairs')}</strong><p>${tr('只核對已整理的成分及途徑規則，不評估劑量、整體處方或三種以上藥物共同造成的效應。','Prepared ingredient and route rules only. Dose, the overall prescription and higher-order effects of three or more medicines are not assessed.')}</p></section>`;
  if(r.potentialAlerts?.length)html+=`<div class="unknown-card"><strong>${tr('成分涉及警示，先核實使用途徑','Ingredient warning: first verify the route')}</strong>${r.potentialAlerts.map(a=>`<p>${esc(pairLabel(a.products))}<br>${esc(summary(a))}<br><small>${a.reason==='confirm_route_before_applying'?tr('使用途徑未提供，不能直接套用規則。','Route is missing, so the rule cannot yet be applied.'):tr('填報的途徑超出這條規則，需專業核實。','The reported route is outside this rule’s scope.')}</small> <button class="textbtn" data-source="${esc(a.rule_id)}">${tr('出處','Source')}</button></p>`).join('')}</div>`;
  html+=`<details class="pair-details"><summary>${tr('查看每一對藥品及資料缺口','See every medicine pair and evidence gaps')}</summary><ul>${r.pairChecks.map(p=>`<li><strong>${esc(pairLabel(p.products))}</strong><br>${p.matchedRuleIds.length?tr('有來源提示','Sourced warning')+' · '+p.matchedRuleIds.join(', '):p.potentialRuleIds.length?tr('需核實途徑','Route needs review'):tr('未有規則覆蓋；不是安全結論','No rule coverage; not a safety conclusion')}${p.gaps.includes('unmapped_ingredients')?'<br>'+tr('另有成分尚未映射','Some ingredients remain unmapped'):''}${p.gaps.includes('demo_route_assumption')?'<br>'+tr('途徑是演示假設，未核實實物','Route is a demonstration assumption; no physical pack verified'):''}</li>`).join('')}</ul></details>`;
  return html;
 }
 window.ReleaseUI={coverageHTML};
 function progress(){const n=selected.filter(x=>x.confirmed).length;$('#list-progress').textContent=selected.length?tr(`已加入 ${selected.length} 項 · 已核對／知悉 ${n} 項`,`${selected.length} added · ${n} reviewed / acknowledged`):tr('把正在用的藥和準備加用的藥一併加入','Add current medicines and the one you plan to add');}
 function update(){
  progress();const bag=document.querySelector('[name="label-mode"]:checked')?.value==='bag';$('#label-guidance').textContent=bag?tr('一次拍一項藥袋標籤；先遮住姓名、病人編號及二維碼。沒有 HK 號時可輸入完整藥名，但不可猜成某個品牌；個人醫囑只供你與藥師核對。','Capture one medicine label. Cover names, patient IDs and QR codes. Without an HK number, enter the full name; never infer a brand. Personal instructions are for you and the pharmacist to reconcile.'):tr('對準完整藥名、成分及 HK 號；一個品牌可有多款不同成分。','Include the full name, ingredients and HK number; one brand can have different formulations.');
  if(api?.runtime==='browser'){
   $('#about').onclick=scope;
   $('#mode').textContent=tr('網頁版 · 本機核對','Web · local checks');$('#privacy').textContent=tr('照片在這部裝置的瀏覽器內識字，不上傳。首次使用需下載識字資源。','Photos are read in this browser, without upload. OCR resources download on first use.');
   $('#capability-strip').innerHTML=`<span>${tr('裝置內識字','On-device OCR')}</span><span>${tr('粵語輸入視瀏覽器而定','Cantonese input varies by browser')}</span><button class="textbtn" id="web-scope">${tr('網頁與離線版有何分別','Web and offline modes')}</button><button class="textbtn emergency-link" id="emergency-help">${tr('已服藥而感到不適？','Unwell after medicine?')}</button>`;
   const info=tr('網頁語音可能使用瀏覽器服務商，開始前另行確認。未支援粵語時請打字；Mac 版可離線。','Browser voice may use its provider; a separate choice appears before listening. Type if unsupported; the Mac build works offline.');$('#voice-status').textContent=info;document.querySelector('[data-v="privacy"]').textContent=info;
   document.querySelector('label[for="voice-file"]').hidden=true;$('#voice-file').disabled=true;
   document.querySelector('[data-t="footer2"]').textContent=tr('無帳戶 · 照片不上传 · 用藥資料不儲存','No account · no photo upload · no medicine history');
   Z.ocrBusy='正在這部裝置的瀏覽器識別文字…';EN.ocrBusy='Reading the photo in this browser…';
  }
  const a=document.getElementById('release-links');if(a)a.innerHTML=`<a href="demo.html">${tr('3 分鐘演示與簡報','3-minute demo and slides')}</a><a href="data-report.html">${tr('完整資料與判定方法','Data and decision method')}</a><a href="offline.html">${tr('下載／離線使用','Download / offline use')}</a><a href="https://github.com/yc-eagle/med-safe" target="_blank" rel="noopener noreferrer">GitHub</a>`;
 }
 function scope(){showDialog(tr('網頁與離線模式','Web and offline modes'),tr('<p>網頁：查藥、逐對核對及照片識字在瀏覽器內運行。第一次需聯網，按「準備手機離線」下載並校驗全部資源後，才可離線查藥及識字；無網站帳戶，不保存用藥歷史。</p><p>語音：瀏覽器可能聯網識別，會先取得你的選擇；朗讀僅嘗試裝置已有的本機聲音。無法保證所有手機有粵語。</p><p>完整離線版：Apple Silicon Mac 預先安裝語音模型及環境後，可用本機拍照识字、粵語識別和朗讀。離線 HTML 亦可查藥及核對，但不保證 file:// 模式的相機及識字。</p><p>來源連結需上網；所有模式都不是個人處方或完整臨床評估。</p>','<p>Web: catalogue search, pair checks and photo OCR run inside the browser. Prepare and verify the offline download while connected before using search and OCR offline; medicine history is not retained.</p><p>Browser speech recognition may be online and requires a separate choice. Reading uses only available local voices. Cantonese is not guaranteed on every phone.</p><p>Fully offline: an Apple Silicon Mac with the voice model and runtime installed supports local OCR, Cantonese recognition and speech. The HTML file supports search and checks; camera and OCR under file:// are not guaranteed.</p><p>Source links need internet. Neither mode provides individual prescribing or a complete clinical assessment.</p>'));}
 document.querySelector('footer').insertAdjacentHTML('beforebegin','<nav id="release-links" class="release-links" aria-label="Project resources"></nav>');
 document.addEventListener('change',e=>{if(e.target.name==='label-mode')update()});document.addEventListener('click',e=>{if(e.target.closest('#web-scope'))scope()});
 new MutationObserver(progress).observe($('#selected'),{childList:true});
 for(const event of ['language-change','local-api-ready'])window.addEventListener(event,()=>queueMicrotask(update));
 if(window.PUBLIC_DEMO||!['localhost','127.0.0.1'].includes(location.hostname)&&location.protocol!=='file:')BrowserRuntime.init();
 update();
})();
