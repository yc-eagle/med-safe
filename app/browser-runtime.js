/* Public mode: OCR runs in this browser; optional Web Speech requires disclosure. */
'use strict';
window.BrowserRuntime=(()=>{
 let scriptPromise=null,recognizer=null,consentPending=false,cancelConsent=null,listenEpoch=0,speechEpoch=0,speechJob=null,pendingVoiceWait=null;
 const root=new URL('.',document.baseURI),url=p=>new URL(p,root).href;
 const locale=value=>['en','cmn','yue'].includes(value)?value:value==='zh'?'yue':window.MedLocale?.current||'en';
 const pick=(language,en,cmn,yue)=>locale(language)==='en'?en:locale(language)==='cmn'?cmn:yue;
 const load=()=>scriptPromise||(scriptPromise=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=url('vendor/tesseract.min.js');s.onload=resolve;s.onerror=()=>{scriptPromise=null;reject(Error('OCR library unavailable'))};document.head.append(s)}));
 async function ocr(file,{onProgress}={}){await load();let worker;try{worker=await Tesseract.createWorker(['eng','chi_tra'],1,{workerPath:url('vendor/worker.min.js'),corePath:url('vendor/'),langPath:url('vendor').replace(/\/$/,''),gzip:false,cacheMethod:'none',logger:m=>{if(m.status==='recognizing text')onProgress?.(m.progress);}});await worker.setParameters({tessedit_pageseg_mode:'11',preserve_interword_spaces:'1'});const {data}=await worker.recognize(file);return {rows:data.text.split(/\r?\n/).map(text=>({text:text.trim(),confidence:data.confidence/100})).filter(x=>x.text),engine:'tesseract-browser',photo_uploaded:false};}finally{if(worker)await worker.terminate();}}
 function voices(){return window.speechSynthesis?.getVoices().filter(v=>v.localService)||[];}
 function reading(active,phase='speaking'){window.dispatchEvent(new CustomEvent('reading-change',{detail:{active,phase}}));}
 function stopSpeaking(){
  speechEpoch++;
  const job=speechJob;speechJob=null;
  pendingVoiceWait?.();window.speechSynthesis?.cancel();job?.finish();reading(false);
 }
 function waitForVoice(pattern){
  const available=()=>voices().find(v=>pattern.test(v.lang));
  if(available())return Promise.resolve(available());
  return new Promise(resolve=>{
   let done=false;const finish=()=>{if(done)return;done=true;clearTimeout(timer);speechSynthesis.removeEventListener('voiceschanged',changed);pendingVoiceWait=null;resolve(available());};
   const changed=()=>{if(available())finish();};
   const timer=setTimeout(finish,6000);pendingVoiceWait=finish;speechSynthesis.addEventListener('voiceschanged',changed);changed();
  });
 }
 async function speak(text,language){
  if(!window.speechSynthesis)throw Error('No speech synthesis');
  stopSpeaking();const epoch=speechEpoch;
  const selected=locale(language);reading(true,'preparing');
  const pattern=selected==='en'?/^en/i:selected==='cmn'?/^(zh[-_]CN|cmn)/i:/^(zh[-_]HK|yue)/i;
  const voice=await waitForVoice(pattern);if(epoch!==speechEpoch)return;
  if(!voice){reading(false);throw Error('No local voice for this language');}
  return new Promise((resolve,reject)=>{
   const u=new SpeechSynthesisUtterance(text);u.voice=voice;u.lang=voice.lang;u.rate=.9;let done=false;
   const finish=error=>{if(done)return;done=true;if(speechJob?.utterance===u){speechJob=null;reading(false);}error?reject(error):resolve();};
   speechJob={utterance:u,finish};u.onend=()=>finish();u.onerror=e=>finish(epoch!==speechEpoch||['canceled','interrupted'].includes(e.error)?null:Error(e.error||'Speech failed'));
   reading(true);try{speechSynthesis.speak(u);}catch(error){finish(error);}
  });
 }
 async function consent(language){return new Promise(resolve=>{const dialog=document.getElementById('dialog');
  const copy=pick(language,
   ['Before using browser voice','This browser may send audio to its speech-recognition provider. MedSafe does not receive or store the recording and cannot guarantee offline processing.','Only ask a medicine question; omit names and personal information. Recognition support depends on the selected language and browser. The Mac offline recognizer currently supports Cantonese only.','Use browser voice this time','Type instead'],
   ['使用网页语音前','浏览器可能将录音发送给其语音识别服务商。MedSafe 不接收或储存录音，也不能保证离线处理。','请仅询问药品问题，避免姓名等个人信息。识别支持取决于所选语言和浏览器。Mac 离线识别目前仅支持粤语。','本次使用浏览器语音','改用打字'],
   ['使用網頁語音前','瀏覽器可能把錄音傳到語音識別服務商。MedSafe 唔接收或儲存錄音，亦唔可以保證離線處理。','只問藥品問題，避免姓名等個人資料。識別支援視乎所選語言同瀏覽器；Mac 離線識別目前只支援粵語。','今次使用瀏覽器語音','改用打字']);
  showDialog(copy[0],'<p>'+copy[1]+'</p><p>'+copy[2]+'</p><button class="button primary" id="voice-consent">'+copy[3]+'</button><button class="button secondary" id="voice-decline">'+copy[4]+'</button>');
  let done=false;const finish=value=>{if(done)return;done=true;consentPending=false;cancelConsent=null;dialog.removeEventListener('close',closed);dialog.close();resolve(value)};const closed=()=>finish(false);cancelConsent=()=>finish(false);dialog.addEventListener('close',closed,{once:true});document.getElementById('voice-consent').onclick=()=>finish(true);document.getElementById('voice-decline').onclick=()=>finish(false);
 });}
 async function listen(language){
  if(navigator.onLine===false)throw Error('Browser recognition disabled offline');
  if(recognizer){recognizer.stop();return null;}
  if(consentPending)return null;
  const selected=locale(language),epoch=++listenEpoch;
  const Constructor=window.SpeechRecognition||window.webkitSpeechRecognition;if(!Constructor)throw Error('Browser voice unavailable');
  consentPending=true;const approved=await consent(selected);
  if(!approved||epoch!==listenEpoch||navigator.onLine===false)return null;
  return new Promise((resolve,reject)=>{const r=new Constructor();recognizer=r;r.lang={en:'en-HK',cmn:'zh-CN',yue:'zh-HK'}[selected];r.continuous=false;r.interimResults=false;r.maxAlternatives=1;let value='',error=null;
   const status=document.getElementById('voice-status');status.textContent=pick(selected,'Listening for up to 20 seconds; press again to finish.','正在聆听，最多20秒；再按一次结束。','正在聆聽，最多20秒；再按一次結束。');
   window.dispatchEvent(new CustomEvent('listening-change',{detail:{active:true}}));
   const timer=setTimeout(()=>r.stop(),19500);const hidden=()=>{if(document.hidden)r.abort()};document.addEventListener('visibilitychange',hidden);
   r.onresult=e=>{value=Array.from(e.results).map(x=>x[0].transcript).join(' ')};r.onerror=e=>{error=e.error};r.onend=()=>{clearTimeout(timer);document.removeEventListener('visibilitychange',hidden);recognizer=null;window.dispatchEvent(new CustomEvent('listening-change',{detail:{active:false}}));epoch!==listenEpoch?resolve(null):error?reject(Error(error)):resolve(value)};
   try{r.start()}catch(e){clearTimeout(timer);document.removeEventListener('visibilitychange',hidden);recognizer=null;window.dispatchEvent(new CustomEvent('listening-change',{detail:{active:false}}));reject(e)};
  });
 }
 function stopListening(){if(!recognizer)return false;recognizer.stop();return true;}
 function cancel(){listenEpoch++;cancelConsent?.();recognizer?.abort();stopSpeaking();}
 function init(){api={runtime:'browser',ocr:location.protocol!=='file:',asr:!!(window.SpeechRecognition||window.webkitSpeechRecognition),tts:!!window.speechSynthesis,token:null};voices();setLanguage();window.dispatchEvent(new Event('local-api-ready'));}
 window.addEventListener('offline',cancel);window.addEventListener('language-change',cancel);window.addEventListener('beforeunload',cancel);
 return {ocr,speak,listen,init,voices,cancel,stopListening,stopSpeaking};
})();
