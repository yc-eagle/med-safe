'use strict';
(()=>{
 const ui={yue:{heading:'用廣東話問清楚',tag:'先確認問句',intro:'在加用新藥前，先確認上面的藥品，再問「呢兩隻藥可唔可以一齊食？」',record:'開始講廣東話',stop:'講完了，開始識別',upload:'選擇錄音',label:'我聽到你問（可以修改，也可以直接打字）',example1:'可唔可以一齊食？',example2:'點解要問藥劑師？',example3:'應該食幾多？',confirm:'問句正確，請回答',privacy:'每段最多 20 秒；錄音只在這台 Mac 轉成文字，處理後刪除暫存。回答只根據已確認藥品與演示規則。',replay:'再聽廣東話回答',handoff:'帶甚麼問藥劑師',ready:'粵語語音已就緒。也可以直接打字。',missing:'此電腦尚未安裝粵語識別，請先打字提問；安裝方法見交付說明。',busy:'正在這台 Mac 上聽取廣東話…',recording:'正在錄音，最多 20 秒。講完後再按一次按鈕。',confirmHeard:'請先閱讀並修改問句；按確認後才回答。',error:'未能聽清楚，請重錄或直接打字。錄音須為 0.3 至 20 秒。',denied:'未取得咪高峰，請在瀏覽器允許，或選擇錄音／打字。',notInstalled:'語音識別尚未安裝，請先打字。',answerContext:'已確認問句：',sources:'對應出處：',noSource:'此回答是資料確認／轉介提示，沒有新增醫學結論。'},en:{heading:'Ask in English',tag:'Confirm what was heard',intro:'Before adding a medicine, confirm the packs above and ask whether there are known warnings.',record:'Speak English',stop:'Finish and transcribe',upload:'Choose an audio clip',label:'What I heard — edit or type your question',example1:'Can these be taken together?',example2:'Why ask a pharmacist?',example3:'How much should I take?',confirm:'This is my question — answer',privacy:'Up to 20 seconds. Audio is transcribed on this Mac and temporary files are deleted. Answers use confirmed medicines and demo rules only.',replay:'Hear the English answer',handoff:'Prepare for a pharmacist',ready:'English browser voice input is available. You can also type.',missing:'Browser speech recognition is unavailable. Type your question.',busy:'Transcribing on this device…',recording:'Recording up to 20 seconds. Press again when finished.',confirmHeard:'Review and edit the transcript. No answer is given until you confirm.',error:'Could not transcribe this clip. Record again or type. Use 0.3–20 seconds.',denied:'Microphone unavailable. Allow it in the browser, upload a clip, or type.',notInstalled:'Voice recognition is not installed. Please type.',answerContext:'Confirmed question: ',sources:'Source rules: ',noSource:'This is an identity or referral prompt; no new clinical conclusion is made.'}};
 ui.cmn={heading:'用普通话问清楚',tag:'先确认问句',intro:'加用新药前，先确认上方药品，再问“这两种药可以一起服用吗？”',record:'开始说普通话',stop:'结束录音',upload:'选择录音',label:'识别到的问句（可以修改，也可直接打字）',example1:'可以一起服用吗？',example2:'为什么要问药师？',example3:'应该服用多少？',confirm:'问句正确，请回答',privacy:'回答仅根据已确认的药品与已整理规则，不提供个人处方。',replay:'听普通话回答',handoff:'准备咨询药师',ready:'普通话网页语音可用，也可以打字。',missing:'语音识别不可用，请直接打字提问。',busy:'正在本机识别…',recording:'正在录音，最多20秒；说完后再按一次。',confirmHeard:'请先阅读并修改问句，确认后才会回答。',error:'未能识别，请重试或打字。',denied:'无法使用麦克风，请检查浏览器权限或打字。',notInstalled:'语音识别尚不可用，请打字。',answerContext:'已确认问句：',sources:'对应规则：',noSource:'这是身份确认或转介提示，没有新增医学结论。'};
 const current=()=>window.MedLocale?.current||(lang==='en'?'en':'yue');
 const say=(en,cmn,yue)=>current()==='en'?en:current()==='cmn'?cmn:yue;
 const v=k=>ui[current()][k];
 const canRecord=()=>!!api?.asr&&(api?.runtime==='browser'?navigator.onLine!==false:current()==='yue');
 const unsupported=()=>say('This Mac’s offline recognizer supports Cantonese only. Type in English, or open the public web app for optional browser voice input.','这台 Mac 的离线识别目前仅支持粤语。请用普通话文字提问，或打开公开网页使用可选的浏览器语音。','粵語識別尚未就緒，請先打字提問。');let recorder=null,stream=null,timer=null,serial=0,answer=null,question='',url=null,busy=false;
 function clearAnswer(){serial++;answer=null;$('#voice-answer').hidden=true;$('#answer-audio audio')?.pause();$('#answer-audio').innerHTML='';if(url)URL.revokeObjectURL(url);url=null;}
 function status(text){$('#voice-status').textContent=text;}
 function update(){
  document.querySelectorAll('[data-v]').forEach(el=>el.textContent=v(el.dataset.v));
  const browser=api?.runtime==='browser';
  $('#record-question').disabled=!canRecord()||busy;
  $('#record-question').textContent=v(recorder?.state==='recording'?'stop':'record');
  $('#voice-file').disabled=browser||current()!=='yue'||!api?.asr;
  document.querySelector('label[for="voice-file"]').hidden=browser||current()!=='yue';
  const examples={en:['Can these medicines be taken together?','Why ask a pharmacist?','How much should I take?'],cmn:['这两种药可以一起服用吗？','为什么要问药师？','我应该服用多少？'],yue:['呢兩隻藥可唔可以一齊食？','點解要問藥劑師？','我應該食幾多粒？']};
  for(let i=0;i<3;i++){const button=document.querySelector('[data-v="example'+(i+1)+'"]');if(button)button.dataset.question=examples[current()][i];}
  $('#question-text').placeholder=examples[current()][0];
  const privacy=browser?say('Browser recognition may send audio to its provider. You choose before each use. Reading uses only installed local voices. Answers use confirmed medicines and prepared rules.','浏览器可能将录音发送给其语音服务商，每次使用前会请你选择。朗读仅使用已有本机声音；回答仅根据已确认药品及已整理规则。','瀏覽器可能把錄音傳到語音服務商，每次使用前會請你選擇。朗讀只用已有本機聲音；回答只根據已確認藥品及已整理規則。'):say('The Mac recognizer supports Cantonese only, up to 20 seconds; temporary audio is deleted. Typed questions and local reading support the selected language.','Mac 离线识别目前仅支持粤语，每段最多20秒，处理后删除临时录音。文字问答和本机朗读使用当前语言。','每段最多20秒；粵語錄音喺呢台 Mac 轉成文字，處理後刪除暫存。文字問答同本機朗讀使用目前語言。');
  document.querySelector('[data-v="privacy"]').textContent=privacy;
  if(!busy&&recorder?.state!=='recording')status(browser?(navigator.onLine===false?say('Offline: type your question. Browser voice recognition is disabled.','当前离线，请打字提问；浏览器语音识别已停用。','目前離線，請打字提問；網頁語音識別已停用。'):api?.asr?privacy:v('missing')):current()!=='yue'?unsupported():v(api?.asr?'ready':'missing'));
 }

 function inputChanged(){clearAnswer();question='';$('#confirm-question').disabled=!$('#question-text').value.trim();}
 async function base64(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result.split(',')[1]);r.onerror=reject;r.readAsDataURL(file);});}
 async function transcribe(blob){
  if(api?.runtime==='browser')return status(say('Browser voice accepts live microphone input, not uploaded recordings. Please type instead.','网页版仅支持即时麦克风，不支持录音文件转写，请打字提问。','網頁版只支援即時咪高峰，不支援錄音檔轉寫，請打字提問。'));if(current()!=='yue')return status(unsupported());if(!api?.asr)return status(v('notInstalled'));
  clearAnswer();const token=serial;busy=true;update();$('#confirm-question').disabled=true;status(v('busy'));
  try{if(blob.size>5*1024*1024)throw Error('too_large');const body=await base64(blob);const r=await fetch('/api/asr',{method:'POST',headers:{'Content-Type':'application/json','X-MedCheck-Token':api.token},body:JSON.stringify({audio:body})});if(!r.ok)throw Error();const data=await r.json();if(token!==serial)return;$('#question-text').value=data.text.slice(0,500);$('#confirm-question').disabled=!data.text.trim();status(v('confirmHeard'));}
  catch{if(token===serial)status(v('error'));}
  finally{busy=false;$('#record-question').disabled=!canRecord();$('#record-question').textContent=v('record');$('#voice-file').value='';if(token!==serial)$('#confirm-question').disabled=!$('#question-text').value.trim();}
 }
 function closeStream(){stream?.getTracks().forEach(t=>t.stop());stream=null;clearTimeout(timer);}
 async function record(){
  if(api?.runtime==='browser'){if(BrowserRuntime.stopListening?.())return;clearAnswer();stopAudio();const requestSerial=serial;try{const text=await BrowserRuntime.listen(current());if(text&&requestSerial===serial){$('#question-text').value=text.slice(0,500);inputChanged();status(v('confirmHeard'));}}catch{status(v('error'));}return;}

  if(recorder?.state==='recording'){recorder.stop();return;}
  if(!canRecord())return status(current()!=='yue'?unsupported():v('missing'));
  clearAnswer();stopAudio();const requestSerial=serial;
  try{stream=await navigator.mediaDevices.getUserMedia({audio:{channelCount:1,echoCancellation:true},video:false});if(requestSerial!==serial){closeStream();return;}
   const mime=['audio/webm;codecs=opus','audio/mp4','audio/ogg;codecs=opus'].find(x=>MediaRecorder.isTypeSupported(x));
   recorder=new MediaRecorder(stream,mime?{mimeType:mime}:{});const chunks=[];
   recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
   recorder.onstop=()=>{closeStream();const type=recorder.mimeType;recorder=null;if(requestSerial===serial)transcribe(new Blob(chunks,{type}));else update();};
   recorder.onerror=()=>{closeStream();status(v('error'));};recorder.start();timer=setTimeout(()=>{if(recorder?.state==='recording')recorder.stop();},19500);$('#record-question').textContent=v('stop');status(v('recording'));
  }catch{closeStream();status(v('denied'));}
 }
 async function speakAnswer(){if(!answer)return;const token=serial,text=answer.text;stopAudio();$('#speak-answer').disabled=true;
  try{if(api?.runtime==='browser'){await BrowserRuntime.speak(text,current());return;}if(!api?.tts)throw Error();const r=await fetch('/api/tts',{method:'POST',headers:{'Content-Type':'application/json','X-MedCheck-Token':api.token},body:JSON.stringify({text,voice:current()})});if(!r.ok)throw Error();const blob=await r.blob();if(token!==serial)return;if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(blob);$('#answer-audio').innerHTML='<audio controls aria-label="'+esc(v('replay'))+'"></audio>';const a=$('#answer-audio audio');a.src=url;try{await a.play();}catch{/* Player remains available if browser blocks autoplay. */}}
  catch{if(token===serial)toast(say('Voice playback unavailable. Read the answer below.','无法播放语音，请阅读画面上的回答。','未能播放語音，請先睇畫面上嘅回答。'));}
  finally{$('#speak-answer').disabled=false;}
 }
 function pharmacist(){
  const r=PatientGuide.referral(currentResult,current());
  const items=selected.map(x=>{const p=products.get(x.id);return `${p?.product_name||x.name||say('Unidentified medicine','尚未识别的药品','未能識別嘅藥品')} · ${x.id} · ${!p?say('Unidentified; acknowledged','未识别；已确认知悉','未識別；已確認知悉'):x.confirmed?say('Details confirmed','资料已确认','資料已確認'):say('Not confirmed','尚未确认','尚未確認')}${x.sample?' · '+say('Synthetic demonstration','合成演示样例','合成演示樣例'):''}`;});
  const warnings=[...new Map((currentResult?.alerts||[]).map(x=>[x.rule_id,x])).values()];
  showDialog(say('Bring these questions to a pharmacist','带着这些问题咨询药师','帶住呢啲問題問藥劑師'),`<p><strong>${esc(r.reason)}</strong></p><h3>${say('Medicine list','药品清单','藥品清單')}</h3><ul>${items.map(x=>'<li>'+esc(x)+'</li>').join('')||'<li>'+say('No medicines selected','尚未添加药品','尚未加入藥品')+'</li>'}</ul><h3>${say('Suggested question','建议问法','可以咁問')}</h3><p>${esc(r.question)}</p><p>${say('Explain your actual dose and schedule, other prescriptions, non-prescription medicines or supplements, allergies and relevant health circumstances. This prototype has not verified these details.','请提供实际剂量与服用时间、其他处方药、非处方药或补充品、过敏及相关身体情况。原型尚未核实这些资料。','請提供實際劑量同服用時間、其他處方藥、成藥或補充品、過敏及相關身體情況。原型尚未核實呢啲資料。')}</p>${question?'<h3>'+say('Your question','本次问句','今次問句')+'</h3><p data-verbatim>'+esc(question)+'</p>':''}<h3>${say('Prepared warnings and sources','已整理警示与来源','已整理警示同出處')}</h3>${warnings.map(x=>'<p>'+esc(x.rule_id+' · '+(current()==='en'?x.summary_en:MedLocale.display(x.summary_zh)))+'<br><a target="_blank" rel="noopener noreferrer" href="'+esc(x.source_url)+'">'+esc(x.source_section)+'</a></p>').join('')||'<p>'+say('There is insufficient coverage; professional review is needed.','资料覆盖不足，请专业人员核实。','資料覆蓋不足，請專業人員核實。')+'</p>'}${window.Consultation?Consultation.cardHTML():''}<p class="boundary-note">${say('Rules and translated wording await clinical review. Bring the actual packs or medicine bags; do not change medicines yourself.','规则及翻译措辞仍待医学复核。请带上实际药盒或药袋，不要自行调整用药。','規則同翻譯字句仍待醫學複核。請帶實際藥盒或藥袋，唔好自行改藥。')}</p>`);
 }

 $('#record-question').onclick=record;$('#voice-file').onchange=e=>{if(e.target.files[0])transcribe(e.target.files[0]);};
 document.querySelector('label[for="voice-file"]').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('#voice-file').click();}};
 $('#question-text').dataset.verbatim='';$('#answer-context').dataset.verbatim='';$('#question-text').oninput=inputChanged;
 document.querySelectorAll('[data-question]').forEach(b=>b.onclick=()=>{$('#question-text').value=b.dataset.question;inputChanged();});
 $('#confirm-question').onclick=()=>{if(busy||!$('#question-text').value.trim())return;clearAnswer();question=$('#question-text').value.trim();answer=PatientGuide.answer(question,selected,currentResult,D,current());$('#answer-context').textContent=v('answerContext')+question;$('#answer-text').textContent=answer.text;$('#answer-sources').innerHTML=answer.sourceProfileIds?.length?answer.sourceProfileIds.map(id=>{const s=D.medicineProfiles?.sources[id];return s?'<a target="_blank" rel="noopener noreferrer" href="'+esc(s.url)+'">'+esc(current()==='en'?'Source: '+id.replace(/_/g,' '):MedLocale.display(s.title))+'</a>':'';}).join(' · '):esc(answer.sourceRuleIds.length?v('sources')+answer.sourceRuleIds.join('、'):v('noSource'));$('#voice-answer').hidden=false;speakAnswer();};
 $('#speak-answer').onclick=speakAnswer;$('#pharmacist-note').onclick=pharmacist;document.addEventListener('click',e=>{if(e.target.closest('#pharmacist-result'))pharmacist();});
 window.addEventListener('local-api-ready',update);window.addEventListener('language-change',()=>{clearAnswer();question='';$('#confirm-question').disabled=!$('#question-text').value.trim();BrowserRuntime.cancel?.();if(recorder?.state==='recording')recorder.stop();closeStream();update();});window.addEventListener('medicine-change',()=>{clearAnswer();question='';if(recorder?.state==='recording')recorder.stop();});
 window.addEventListener('beforeunload',()=>{closeStream();});for(const e of ['online','offline'])window.addEventListener(e,update);window.VoiceUI={update};update();
})();
