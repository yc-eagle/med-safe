'use strict';
(()=>{
 const tr=(z,e,y)=>window.MedLocale?.choose(z,e,y)??(lang==='en'?e:(y||z));
 const display=t=>window.MedLocale?.display(String(t??''))??String(t??'');
 const link=p=>window.MedLocale?.link(p)||p;
 function coverageHTML(r){
  const pairLabel=ids=>ids.map(id=>products.get(id)?.product_name||id).join(' + ');
  let html=`<section class="pair-summary"><strong>${tr('逐對核對','Pairs examined')}: ${r.totalPairs} ${tr('對','pairs')}</strong><p>${tr('核對已整理的成分及使用途徑規則。未評估劑量、整體處方或三種以上藥物的共同效應。','Checks prepared ingredient and route rules. Dose, the full prescription and combined effects of three or more medicines are not assessed.')}</p></section>`;
  if(r.potentialAlerts?.length)html+=`<div class="unknown-card"><strong>${tr('先核實使用途徑','First confirm how each medicine is used')}</strong>${r.potentialAlerts.map(a=>`<p><span data-verbatim>${esc(pairLabel(a.products))}</span><br>${esc(display(summary(a)))}<br><small>${a.reason==='confirm_route_before_applying'?tr('尚未提供使用途徑，暫不能套用此警示。','The route is missing; this warning cannot yet be applied.'):tr('填報途徑超出此規則，請藥師核實。','The recorded route is outside this rule. Ask a pharmacist.')}</small> <button class="textbtn" data-source="${esc(a.rule_id)}">${tr('出處','Source')}</button></p>`).join('')}</div>`;
  html+=`<details class="pair-details"><summary>${tr('查看每一對及未涵蓋的資料','See each pair and what is missing')}</summary><ul>${r.pairChecks.map(p=>`<li><strong data-verbatim>${esc(pairLabel(p.products))}</strong><br>${p.matchedRuleIds.length?tr('有來源警示','Sourced warning')+' · '+p.matchedRuleIds.join(', '):p.potentialRuleIds.length?tr('需要核實途徑','Route needs review'):tr('未有規則涵蓋，不能判定安全','Not covered; safety is not established')}${p.gaps.includes('unmapped_ingredients')?'<br>'+tr('部分成分尚未對應規則','Some ingredients have not been matched to rules'):''}${p.gaps.includes('demo_route_assumption')?'<br>'+tr('途徑是演示假設，未對照實物','Demo route assumption; not checked against a real pack'):''}</li>`).join('')}</ul></details>`;
  return html;
 }
 window.ReleaseUI={coverageHTML};
 function progress(){const n=selected.filter(x=>x.confirmed).length;$('#list-progress').textContent=selected.length?tr(`已加入 ${selected.length} 項 · 已核對／知悉 ${n} 項`,`${selected.length} added · ${n} reviewed / acknowledged`):tr('把正在用的藥和準備加用的藥一併加入','Add current medicines and the one you plan to add');}
 function update(){
  progress();const bag=document.querySelector('[name="label-mode"]:checked')?.value==='bag';$('#label-guidance').textContent=bag?tr('一次拍一項標籤，遮住姓名、病人編號和二維碼。沒有 HK 號時輸入完整藥名，不要猜品牌。個人醫囑請與藥師核實。','Capture one label. Cover names, patient IDs and QR codes. Without an HK number, enter the full name; do not guess a brand. Confirm personal instructions with a pharmacist.'):tr('拍清完整藥名、成分及 HK 號；同一品牌可能有不同配方。','Include the full name, ingredients and HK number. One brand may have different formulations.');
  if(api?.runtime==='browser'){
   $('#about').onclick=scope;
   $('#mode').textContent=tr('網頁版 · 裝置內核對','Web · on-device checks');$('#privacy').textContent=tr('照片只在此裝置識字，不上傳。首次使用需要下載識字資源。','Photos stay on this device. Text-recognition resources download on first use.');
   $('#capability-strip').innerHTML=`<span>${tr('裝置內識字','On-device OCR')}</span><span>${tr('語音支援視瀏覽器而定','Voice support varies by browser')}</span><button class="textbtn" id="web-scope">${tr('網頁與離線使用','Web and offline use')}</button><button class="textbtn emergency-link" id="emergency-help">${tr('服藥後感到不適？','Unwell after medicine?')}</button>`;
   if(!window.VoiceUI){const info=tr('語音識別可能使用瀏覽器服務商，開始前會另行詢問。不支援時可直接打字。','Voice recognition may use your browser’s provider. You choose before it starts; typing is always available.');$('#voice-status').textContent=info;document.querySelector('[data-v="privacy"]').textContent=info;}
   document.querySelector('label[for="voice-file"]').hidden=true;$('#voice-file').disabled=true;
   document.querySelector('[data-t="footer2"]').textContent=tr('無帳戶 · 照片不上傳 · 不保留用藥紀錄','No account · no photo upload · no medicine history');
   Z.ocrBusy=display('正在此裝置識別文字…');EN.ocrBusy='Reading the photo on this device…';
  }
  const a=document.getElementById('release-links');if(a){a.setAttribute('aria-label',tr('產品資料','Product resources'));a.innerHTML=`<a href="${esc(link('demo.html'))}">${tr('3 分鐘演示與簡報','3-minute demo and slides')}</a><a href="${esc(link('data-report.html'))}">${tr('資料與核對方法','Data and checking method')}</a><a href="${esc(link('offline.html'))}">${tr('下載／離線使用','Download / offline use')}</a><a href="https://github.com/yc-eagle/med-safe" target="_blank" rel="noopener noreferrer">GitHub</a>`;}
  window.VoiceUI?.update();
 }
 function scope(){showDialog(tr('網頁與離線使用','Web and offline use'),tr('<p><strong>手機：</strong>先聯網完成「準備手機離線」並校驗全部資源，再離線查藥、核對及照片識字。用藥紀錄不會保留。</p><p><strong>語音：</strong>識別可能需要瀏覽器服務商，開始前會另行詢問。朗讀使用裝置已有的本機聲音；語言支援因裝置而異。</p><p><strong>Mac：</strong>預先安裝模型及環境後，可離線識字、粵語識別及朗讀。直接打開下載的 HTML 可查藥及核對，但相機和識字未必可用。</p><p>開啟原始來源需要網絡。核對結果不能代替個人處方或完整臨床評估。</p>','<p><strong>Phone:</strong> Prepare and verify the offline download while connected. You can then search, check pairs and read photos offline. Medicine history is not retained.</p><p><strong>Voice:</strong> Recognition may use your browser’s provider, with a separate choice before listening. Reading uses local device voices; language support varies.</p><p><strong>Mac:</strong> After model and runtime setup, photo OCR, Cantonese recognition and reading work offline. Opening the downloaded HTML directly supports search and checks; camera and OCR may be unavailable.</p><p>Original sources need internet. Results do not replace your prescription or a full clinical assessment.</p>'));}
 document.querySelector('footer').insertAdjacentHTML('beforebegin','<nav id="release-links" class="release-links" aria-label="Project resources"></nav>');
 document.addEventListener('change',e=>{if(e.target.name==='label-mode')update()});document.addEventListener('click',e=>{if(e.target.closest('#web-scope'))scope()});
 new MutationObserver(progress).observe($('#selected'),{childList:true});
 for(const event of ['language-change','local-api-ready'])window.addEventListener(event,()=>queueMicrotask(update));
 if(window.PUBLIC_DEMO||!['localhost','127.0.0.1'].includes(location.hostname)&&location.protocol!=='file:')BrowserRuntime.init();
 update();
})();
