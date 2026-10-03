/* Public mode: OCR runs in this browser; optional Web Speech requires disclosure. */
'use strict';
window.BrowserRuntime=(()=>{
 let scriptPromise=null,recognizer=null,consentPending=false,cancelConsent=null,listenEpoch=0;
 const root=new URL('.',document.baseURI),url=p=>new URL(p,root).href;
 const locale=value=>['en','cmn','yue'].includes(value)?value:value==='zh'?'yue':window.MedLocale?.current||'en';
 const pick=(language,en,cmn,yue)=>locale(language)==='en'?en:locale(language)==='cmn'?cmn:yue;
 const load=()=>scriptPromise||(scriptPromise=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=url('vendor/tesseract.min.js');s.onload=resolve;s.onerror=()=>{scriptPromise=null;reject(Error('OCR library unavailable'))};document.head.append(s)}));
 async function ocr(file){await load();let worker;try{worker=await Tesseract.createWorker(['eng','chi_tra'],1,{workerPath:url('vendor/worker.min.js'),corePath:url('vendor/'),langPath:url('vendor').replace(/\/$/,''),gzip:false,cacheMethod:'none',logger:m=>{const el=document.getElementById('ocr-status');if(el&&m.status==='recognizing text')el.textContent=pick(undefined,'Reading on this device: ','正在这部设备识字：','正在呢部裝置識字：')+Math.round(m.progress*100)+'%';}});await worker.setParameters({tessedit_pageseg_mode:'11',preserve_interword_spaces:'1'});const {data}=await worker.recognize(file);return {rows:data.text.split(/\r?\n/).map(text=>({text:text.trim(),confidence:data.confidence/100})).filter(x=>x.text),engine:'tesseract-browser',photo_uploaded:false};}finally{if(worker)await worker.terminate();}}
 function voices(){return window.speechSynthesis?.getVoices().filter(v=>v.localService)||[];}
 async function speak(text,language){
  if(!window.speechSynthesis)throw Error('No speech synthesis');
  const selected=locale(language);let list=voices();if(!list.length){await new Promise(r=>setTimeout(r,350));list=voices();}
  const pattern=selected==='en'?/^en/i:selected==='cmn'?/^(zh[-_]CN|cmn)/i:/^(zh[-_]HK|yue)/i;
  const voice=list.find(v=>pattern.test(v.lang));if(!voice)throw Error('No local voice for this language');
  speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.voice=voice;u.lang=voice.lang;u.rate=.9;speechSynthesis.speak(u);
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
   const timer=setTimeout(()=>r.stop(),19500);const hidden=()=>{if(document.hidden)r.abort()};document.addEventListener('visibilitychange',hidden);
   r.onresult=e=>{value=Array.from(e.results).map(x=>x[0].transcript).join(' ')};r.onerror=e=>{error=e.error};r.onend=()=>{clearTimeout(timer);document.removeEventListener('visibilitychange',hidden);recognizer=null;epoch!==listenEpoch?resolve(null):error?reject(Error(error)):resolve(value)};
   try{r.start()}catch(e){clearTimeout(timer);document.removeEventListener('visibilitychange',hidden);recognizer=null;reject(e)};
  });
 }
 function stopListening(){if(!recognizer)return false;recognizer.stop();return true;}
 function cancel(){listenEpoch++;cancelConsent?.();recognizer?.abort();speechSynthesis?.cancel();}
 function init(){api={runtime:'browser',ocr:location.protocol!=='file:',asr:!!(window.SpeechRecognition||window.webkitSpeechRecognition),tts:!!window.speechSynthesis,token:null};setLanguage();window.dispatchEvent(new Event('local-api-ready'));}
 window.addEventListener('offline',cancel);window.addEventListener('language-change',cancel);window.addEventListener('beforeunload',cancel);
 return {ocr,speak,listen,init,voices,cancel,stopListening};
})();
