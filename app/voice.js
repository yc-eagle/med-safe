'use strict';
(()=>{
 const ui={zh:{heading:'用廣東話問清楚',tag:'先確認問句',intro:'在加用新藥前，先確認上面的藥品，再問「呢兩隻藥可唔可以一齊食？」',record:'開始講廣東話',stop:'講完了，開始識別',upload:'選擇錄音',label:'我聽到你問（可以修改，也可以直接打字）',example1:'可唔可以一齊食？',example2:'點解要問藥劑師？',example3:'應該食幾多？',confirm:'問句正確，請回答',privacy:'每段最多 20 秒；錄音只在這台 Mac 轉成文字，處理後刪除暫存。回答只根據已確認藥品與演示規則。',replay:'再聽廣東話回答',handoff:'帶甚麼問藥劑師',ready:'粵語語音已就緒。也可以直接打字。',missing:'此電腦尚未安裝粵語識別，請先打字提問；安裝方法見交付說明。',busy:'正在這台 Mac 上聽取廣東話…',recording:'正在錄音，最多 20 秒。講完後再按一次按鈕。',confirmHeard:'請先閱讀並修改問句；按確認後才回答。',error:'未能聽清楚，請重錄或直接打字。錄音須為 0.3 至 20 秒。',denied:'未取得咪高峰，請在瀏覽器允許，或選擇錄音／打字。',notInstalled:'語音識別尚未安裝，請先打字。',answerContext:'已確認問句：',sources:'對應出處：',noSource:'此回答是資料確認／轉介提示，沒有新增醫學結論。'},en:{heading:'Ask in Cantonese',tag:'Confirm what was heard',intro:'Before adding a medicine, confirm the packs above and ask whether there are known warnings.',record:'Speak Cantonese',stop:'Finish and transcribe',upload:'Choose an audio clip',label:'What I heard — edit or type your question',example1:'Can these be taken together?',example2:'Why ask a pharmacist?',example3:'How much should I take?',confirm:'This is my question — answer',privacy:'Up to 20 seconds. Audio is transcribed on this Mac and temporary files are deleted. Answers use confirmed medicines and demo rules only.',replay:'Replay Cantonese answer',handoff:'Prepare for a pharmacist',ready:'Cantonese voice input is ready. You can also type.',missing:'Cantonese recognition is not installed on this computer. Type a question or follow the setup instructions.',busy:'Transcribing Cantonese on this Mac…',recording:'Recording up to 20 seconds. Press again when finished.',confirmHeard:'Review and edit the transcript. No answer is given until you confirm.',error:'Could not transcribe this clip. Record again or type. Use 0.3–20 seconds.',denied:'Microphone unavailable. Allow it in the browser, upload a clip, or type.',notInstalled:'Voice recognition is not installed. Please type.',answerContext:'Confirmed question: ',sources:'Source rules: ',noSource:'This is an identity or referral prompt; no new clinical conclusion is made.'}};
 const v=k=>ui[lang][k];let recorder=null,stream=null,timer=null,serial=0,answer=null,question='',url=null,busy=false;
 function clearAnswer(){serial++;answer=null;$('#voice-answer').hidden=true;$('#answer-audio audio')?.pause();$('#answer-audio').innerHTML='';if(url)URL.revokeObjectURL(url);url=null;}
 function status(text){$('#voice-status').textContent=text;}
 function update(){document.querySelectorAll('[data-v]').forEach(el=>el.textContent=v(el.dataset.v));$('#record-question').disabled=!api?.asr||busy;$('#record-question').textContent=v(recorder?.state==='recording'?'stop':'record');if(!busy&&recorder?.state!=='recording')status(v(api?.asr?'ready':'missing'));}
 function inputChanged(){clearAnswer();question='';$('#confirm-question').disabled=!$('#question-text').value.trim();}
 async function base64(file){return new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result.split(',')[1]);r.onerror=reject;r.readAsDataURL(file);});}
 async function transcribe(blob){
  if(api?.runtime==='browser')return status(lang==='en'?'Browser voice accepts live microphone input, not uploaded recordings. Type instead or use the local Mac build.':'網頁版只支援即時咪高峰，不支援錄音檔轉寫。請打字或使用 Mac 本機版。');if(!api?.asr)return status(v('notInstalled'));
  clearAnswer();const token=serial;busy=true;update();$('#confirm-question').disabled=true;status(v('busy'));
  try{if(blob.size>5*1024*1024)throw Error('too_large');const body=await base64(blob);const r=await fetch('/api/asr',{method:'POST',headers:{'Content-Type':'application/json','X-MedCheck-Token':api.token},body:JSON.stringify({audio:body})});if(!r.ok)throw Error();const data=await r.json();if(token!==serial)return;$('#question-text').value=data.text.slice(0,500);$('#confirm-question').disabled=!data.text.trim();status(v('confirmHeard'));}
  catch{if(token===serial)status(v('error'));}
  finally{busy=false;$('#record-question').disabled=!api?.asr;$('#record-question').textContent=v('record');$('#voice-file').value='';if(token!==serial)$('#confirm-question').disabled=!$('#question-text').value.trim();}
 }
 function closeStream(){stream?.getTracks().forEach(t=>t.stop());stream=null;clearTimeout(timer);}
 async function record(){
  if(api?.runtime==='browser'){clearAnswer();stopAudio();try{const text=await BrowserRuntime.listen(lang);if(text){$('#question-text').value=text.slice(0,500);inputChanged();status(v('confirmHeard'));}}catch{status(v('error'));}return;}

  if(recorder?.state==='recording'){recorder.stop();return;}
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
  try{if(api?.runtime==='browser'){await BrowserRuntime.speak(text,'yue');return;}if(!api?.tts)throw Error();const r=await fetch('/api/tts',{method:'POST',headers:{'Content-Type':'application/json','X-MedCheck-Token':api.token},body:JSON.stringify({text,voice:'yue'})});if(!r.ok)throw Error();const blob=await r.blob();if(token!==serial)return;if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(blob);$('#answer-audio').innerHTML='<audio controls aria-label="Cantonese answer"></audio>';const a=$('#answer-audio audio');a.src=url;try{await a.play();}catch{/* Player remains available if browser blocks autoplay. */}}
  catch{if(token===serial)toast(lang==='en'?'Voice playback unavailable. Read the answer below.':'未能播放語音，請先閱讀畫面上的回答。');}
  finally{$('#speak-answer').disabled=false;}
 }
 function pharmacist(){const r=PatientGuide.referral(currentResult);const items=selected.map(x=>{const p=products.get(x.id);return `${p?.product_name||x.name||'未能識別'} · ${x.id} · ${!p?'未能識別（已確認知悉）':x.confirmed?'資料已確認':'未確認'}${x.sample?' · 合成演示樣例':''}`;});
  const warnings=[...new Map((currentResult?.alerts||[]).map(x=>[x.rule_id,x])).values()];
  showDialog(lang==='en'?'Bring these questions to a pharmacist':'帶著這些資料問藥劑師',`<p><strong>${esc(r.reason)}</strong></p><h3>藥品清單 / Medicine list</h3><ul>${items.map(x=>'<li>'+esc(x)+'</li>').join('')||'<li>尚未加入藥品 / No medicines selected</li>'}</ul><h3>可以這樣問 / Suggested question</h3><p>${esc(r.question)}</p><p>請提供：實際劑量與服用時間、其他處方藥／成藥／補充品、過敏及相關身體情況。原型尚未核實這些資料。</p>${question?'<h3>這次問句 / Your question</h3><p>'+esc(question)+'</p>':''}<h3>演示提示及出處 / Demo evidence</h3>${warnings.map(x=>'<p>'+esc(x.rule_id+' · '+x.summary_zh)+'<br><a target="_blank" rel="noopener noreferrer" href="'+esc(x.source_url)+'">'+esc(x.source_section)+'</a></p>').join('')||'<p>沒有足夠規則覆蓋；請專業核實。 / No sufficient coverage.</p>'}${window.Consultation?Consultation.cardHTML():''}<p class="boundary-note">規則及廣東話表述待醫學複核。請帶上實際藥盒或藥袋，不要自行改藥。</p>`);
 }
 $('#record-question').onclick=record;$('#voice-file').onchange=e=>{if(e.target.files[0])transcribe(e.target.files[0]);};
 document.querySelector('label[for="voice-file"]').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('#voice-file').click();}};
 $('#question-text').oninput=inputChanged;
 document.querySelectorAll('[data-question]').forEach(b=>b.onclick=()=>{$('#question-text').value=b.dataset.question;inputChanged();});
 $('#confirm-question').onclick=()=>{if(busy||!$('#question-text').value.trim())return;clearAnswer();question=$('#question-text').value.trim();answer=PatientGuide.answer(question,selected,currentResult,D);$('#answer-context').textContent=v('answerContext')+question;$('#answer-text').textContent=answer.text;$('#answer-sources').innerHTML=answer.sourceProfileIds?.length?answer.sourceProfileIds.map(id=>{const s=D.medicineProfiles?.sources[id];return s?'<a target="_blank" rel="noopener noreferrer" href="'+esc(s.url)+'">'+esc(s.title)+'</a>':'';}).join(' · '):esc(answer.sourceRuleIds.length?v('sources')+answer.sourceRuleIds.join('、'):v('noSource'));$('#voice-answer').hidden=false;speakAnswer();};
 $('#speak-answer').onclick=speakAnswer;$('#pharmacist-note').onclick=pharmacist;document.addEventListener('click',e=>{if(e.target.closest('#pharmacist-result'))pharmacist();});
 window.addEventListener('local-api-ready',update);window.addEventListener('language-change',()=>{clearAnswer();update();});window.addEventListener('medicine-change',()=>{clearAnswer();question='';if(recorder?.state==='recording')recorder.stop();});
 window.addEventListener('beforeunload',()=>{closeStream();});update();
})();
