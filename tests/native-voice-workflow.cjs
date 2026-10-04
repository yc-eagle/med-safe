/* Opt-in real browser-service probe. No recordings or patient data are created.
 * Synthetic WAV files are provided separately; this is not a physical microphone test.
 * TEST_URL, VOICE_FIXTURES, PLAYWRIGHT_MODULE and TEST_OUTPUT are required/optional below. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base=process.env.TEST_URL,fixtures=process.env.VOICE_FIXTURES,output=process.env.TEST_OUTPUT||'qa/product-native-voice-workflow.json';
if(!base||!fixtures)throw Error('Supply TEST_URL and VOICE_FIXTURES containing question-en.wav, question-yue.wav and question-cmn.wav.');
(async()=>{
 const report={tested_at:new Date().toISOString(),url:base,scope:'Native Chrome recognition service receives a synthesized audio track, not a physical microphone. Actual product confirmation, sourced answer and native local speech start/end events. No recordings, human-accent, acoustic-audibility or physical-phone validation.',languages:[]};
 for(const locale of (process.env.LOCALES||'en,yue,cmn').split(',')){
  const browser=await chromium.launch({headless:false,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  const page=await browser.newPage({viewport:{width:390,height:844}}),row={locale};
  try{
   await page.addInitScript(()=>{
    window.__observed={recognition:[],speaking:[]};
    const Native=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(Native){class Observed extends Native{
     start(){const f=window.__fixture;f.context.resume().then(()=>{super.start(f.destination.stream.getAudioTracks()[0]);f.source.start();});}
     constructor(){super();for(const event of ['start','result','error','end'])this.addEventListener(event,e=>__observed.recognition.push({event,lang:this.lang,error:e.error||null,text:e.results?Array.from(e.results).map(x=>x[0].transcript).join(' '):null}));}
    }if(window.SpeechRecognition)window.SpeechRecognition=Observed;else window.webkitSpeechRecognition=Observed;}
    const speak=speechSynthesis.speak.bind(speechSynthesis);
    speechSynthesis.speak=u=>{for(const event of ['start','end','error'])u.addEventListener(event,e=>__observed.speaking.push({event,lang:u.lang,voice:u.voice?.name,local:u.voice?.localService,text:u.text,error:e.error||null}));return speak(u);};
   });
   await page.goto(base+'/?lang='+locale);await page.waitForFunction(()=>window.ProductExperience&&api?.runtime==='browser');
   row.assetHashes=await page.evaluate(async()=>Object.fromEntries(await Promise.all(['browser-runtime.js','voice.js','patient.js','engine.js','data.js'].map(async name=>{const a=await(await fetch(name)).arrayBuffer();return[name,Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',a)),x=>x.toString(16).padStart(2,'0')).join('')]}))));
   await page.click('[data-case=duplicate]');for(const c of await page.locator('[data-confirm]').all())await c.check();await page.click('#check');
   const wav=fs.readFileSync(path.join(fixtures,'question-'+locale+'.wav'));row.syntheticInputSha256=crypto.createHash('sha256').update(wav).digest('hex');
   await page.evaluate(async b64=>{const context=new AudioContext(),source=context.createBufferSource(),destination=context.createMediaStreamDestination();source.buffer=await context.decodeAudioData(Uint8Array.from(atob(b64),c=>c.charCodeAt(0)).buffer);source.connect(destination);window.__fixture={context,source,destination};},wav.toString('base64'));
   await page.click('#record-question');await page.click('#voice-consent');await page.waitForFunction(()=>__observed.recognition.some(x=>x.event==='end'),null,{timeout:35000});
   row.transcript=await page.inputValue('#question-text');row.recognition=await page.evaluate(()=>__observed.recognition);
   assert.ok(row.transcript.trim(),'No transcript returned');assert.match(row.transcript,locale==='en'?/medicines.*together/i:locale==='yue'?/藥.*齊食/:/药.*服用/);
   assert.equal(await page.isVisible('#voice-answer'),false);row.confirmationRequired=true;
   await page.click('#confirm-question');await page.waitForFunction(()=>__observed.speaking.some(x=>x.event==='end'||x.event==='error'),null,{timeout:90000});
   row.speaking=await page.evaluate(()=>__observed.speaking);row.answer=await page.locator('#answer-text').innerText();row.sources=await page.locator('#answer-sources').innerText();
   assert.match(row.sources,/R01/);const spoken=row.speaking.find(x=>x.event==='end');assert.ok(spoken,'Native reading did not complete');assert.equal(spoken.text,row.answer);assert.equal(spoken.local,true);assert.match(spoken.lang,locale==='en'?/^en/:locale==='yue'?/^(yue|zh-HK)/:/^(cmn|zh-CN)/);row.success=true;
  }catch(error){row.success=false;row.error=error.message;row.events=await page.evaluate(()=>window.__observed).catch(()=>null);}
  finally{await browser.close();report.languages.push(row);fs.writeFileSync(output,JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({locale,success:row.success,transcript:row.transcript,error:row.error}));}
 }
 if(report.languages.some(x=>!x.success))process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
