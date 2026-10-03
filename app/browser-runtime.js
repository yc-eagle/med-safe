/* Public mode: OCR runs in this browser; optional Web Speech requires disclosure. */
'use strict';
window.BrowserRuntime=(()=>{
 let scriptPromise=null,recognizer=null;
 const root=new URL('.',document.baseURI),url=p=>new URL(p,root).href;
 const load=()=>scriptPromise||(scriptPromise=new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=url('vendor/tesseract.min.js');s.onload=resolve;s.onerror=()=>{scriptPromise=null;reject(Error('OCR library unavailable'))};document.head.append(s)}));
 async function ocr(file){await load();let worker;try{worker=await Tesseract.createWorker(['eng','chi_tra'],1,{workerPath:url('vendor/worker.min.js'),corePath:url('vendor/'),langPath:url('vendor').replace(/\/$/,''),gzip:false,cacheMethod:'none',logger:m=>{const el=document.getElementById('ocr-status');if(el&&m.status==='recognizing text')el.textContent=(document.documentElement.lang==='en'?'Reading on this device: ':'正在這部裝置識字：')+Math.round(m.progress*100)+'%';}});await worker.setParameters({tessedit_pageseg_mode:'11',preserve_interword_spaces:'1'});const {data}=await worker.recognize(file);return {rows:data.text.split(/\r?\n/).map(text=>({text:text.trim(),confidence:data.confidence/100})).filter(x=>x.text),engine:'tesseract-browser',photo_uploaded:false};}finally{if(worker)await worker.terminate();}}
 function voices(){return window.speechSynthesis?.getVoices().filter(v=>v.localService)||[];}
 async function speak(text,language='yue'){
  if(!window.speechSynthesis)throw Error('No speech synthesis');
  let list=voices();if(!list.length){await new Promise(r=>setTimeout(r,350));list=voices();}
  const pattern=language==='en'?/^en/i:language==='cmn'?/^(zh[-_]CN|cmn)/i:/^(zh[-_]HK|yue)/i;
  const voice=list.find(v=>pattern.test(v.lang));if(!voice)throw Error('No local voice for this language');
  speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.voice=voice;u.lang=voice.lang;u.rate=.9;speechSynthesis.speak(u);
 }
 async function consent(language){return new Promise(resolve=>{const dialog=document.getElementById('dialog');
  showDialog(language==='en'?'Before using browser voice':'使用網頁語音前',language==='en'?'<p>This browser may send audio to its speech-recognition provider. MedSafe does not receive or store the recording, but cannot guarantee provider processing is offline.</p><p>Only say a medicine question; omit names and personal information. Cantonese support varies by browser. The Mac build offers offline recognition instead.</p><button class="button primary" id="voice-consent">Use browser voice this time</button><button class="button secondary" id="voice-decline">Type instead</button>':'<p>瀏覽器可能把錄音傳送到它的語音服務商。MedSafe 不接收或儲存錄音，但不能保證服務商離線處理。</p><p>只講藥品問題，避免姓名等私隱。不同瀏覽器的粵語支援有差異；Mac 本機版可離線識別。</p><button class="button primary" id="voice-consent">這次使用瀏覽器語音</button><button class="button secondary" id="voice-decline">改用打字</button>');
  let done=false;const finish=value=>{if(done)return;done=true;dialog.removeEventListener('close',closed);dialog.close();resolve(value)};const closed=()=>finish(false);dialog.addEventListener('close',closed,{once:true});document.getElementById('voice-consent').onclick=()=>finish(true);document.getElementById('voice-decline').onclick=()=>finish(false);
 });}
 async function listen(language){
  if(navigator.onLine===false)throw Error('Browser recognition disabled offline');
  if(recognizer){recognizer.stop();return null;}
  const Constructor=window.SpeechRecognition||window.webkitSpeechRecognition;if(!Constructor)throw Error('Browser voice unavailable');if(!await consent(language))return null;
  return new Promise((resolve,reject)=>{const r=new Constructor();recognizer=r;r.lang='zh-HK';r.continuous=false;r.interimResults=false;r.maxAlternatives=1;let value='',error=null;
   const status=document.getElementById('voice-status');status.textContent=language==='en'?'Listening for up to 20 seconds; press again to finish.':'正在聆聽，最多 20 秒；再按一次可結束。';
   const timer=setTimeout(()=>r.stop(),19500);const hidden=()=>{if(document.hidden)r.abort()};document.addEventListener('visibilitychange',hidden);
   r.onresult=e=>{value=Array.from(e.results).map(x=>x[0].transcript).join(' ')};r.onerror=e=>{error=e.error};r.onend=()=>{clearTimeout(timer);document.removeEventListener('visibilitychange',hidden);recognizer=null;error?reject(Error(error)):resolve(value)};
   try{r.start()}catch(e){clearTimeout(timer);document.removeEventListener('visibilitychange',hidden);recognizer=null;reject(e)};
  });
 }
 function init(){
  api={runtime:'browser',ocr:location.protocol!=='file:',asr:!!(window.SpeechRecognition||window.webkitSpeechRecognition),tts:!!window.speechSynthesis,token:null};setLanguage();window.dispatchEvent(new Event('local-api-ready'));
 }
 window.addEventListener('offline',()=>recognizer?.abort());
 window.addEventListener('beforeunload',()=>{recognizer?.abort();speechSynthesis?.cancel()});
 return {ocr,speak,listen,init,voices};
})();
