/* Browser interaction checks. Synthetic images and mocked device APIs only. */
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/ssy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),base=process.env.TEST_URL||'http://127.0.0.1:8891';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const context=await browser.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 await context.addInitScript(()=>{
  window.__spoken=[];window.__cancels=0;
  window.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};
  speechSynthesis.getVoices=()=>[{name:'Test English',lang:'en-HK',localService:true},{name:'Test Cantonese',lang:'zh-HK',localService:true},{name:'Test Mandarin',lang:'zh-CN',localService:true}];
  speechSynthesis.speak=u=>window.__spoken.push(u);speechSynthesis.cancel=()=>window.__cancels++;
  class Recognition{start(){window.__recognizer=this;}stop(){this.onend?.();}abort(){this.onend?.();}}
  window.SpeechRecognition=Recognition;
  navigator.mediaDevices.getUserMedia=()=>Promise.reject(new DOMException('Test denied','NotAllowedError'));
 });
 const page=await context.newPage(),errors=[],checks=[];page.on('pageerror',e=>errors.push(e.message));
 const fresh=async()=>{await page.goto(base+'/?lang=en');await page.waitForFunction(()=>window.ProductExperience&&api?.runtime==='browser');};
 const demo=async()=>{await page.click('[data-case=duplicate]');for(const c of await page.locator('[data-confirm]').all())await c.check();await page.click('#check');};
 const test=async(name,fn)=>{await fn();checks.push(name);console.log('PASS '+name);};
 try{
 await fresh();
 await test('Search is first, photo entry is optional, and file selection is distinct from camera capture',async()=>{
  assert.equal(await page.locator('#photo-entry').getAttribute('open'),null);
  assert.equal(await page.locator('#photo').getAttribute('capture'),null);
  assert.ok((await page.locator('#search').boundingBox()).y<(await page.locator('#photo-entry').boundingBox()).y);
  assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(243, 248, 253)');
  await page.screenshot({path:root+'/qa/product-blue-en-home.png',fullPage:true});
 });
 await test('Added medicine is marked and the next action leads to the next required step',async()=>{
  await page.fill('#search','HK-53362');await page.click('[data-add="HK-53362"]');
  await page.waitForFunction(()=>document.querySelector('[data-add="HK-53362"]').disabled);
  assert.equal(await page.locator('[data-add="HK-53362"]').innerText(),'Added');
  await page.click('#next-step-button');assert.equal(await page.evaluate(()=>document.activeElement.id),'search');
  await page.fill('#search','HK-53319');await page.click('[data-add="HK-53319"]');
  assert.equal(await page.locator('[data-confirm]:checked').count(),0);
  await page.click('#next-step-button');assert.equal(await page.evaluate(()=>document.activeElement.dataset.confirm),'HK-53362');
 });
 await test('Keyboard focus stays on a rebuilt route or identity control',async()=>{
  for(const id of ['HK-53362','HK-53319']){
   await page.focus(`[data-route="${id}"]`);await page.selectOption(`[data-route="${id}"]`,'oral');
   assert.equal(await page.evaluate(()=>document.activeElement.dataset.route),id);
   await page.focus(`[data-confirm="${id}"]`);await page.keyboard.press('Space');
   assert.equal(await page.evaluate(()=>document.activeElement.dataset.confirm),id);
  }
  await page.click('#next-step-button');assert.ok(await page.evaluate(()=>currentResult.alerts.some(x=>x.rule_id==='R01')));
  await page.click('#next-step-button');assert.equal(await page.evaluate(()=>document.activeElement.id),'question-text');
 });
 await test('A sourced result can be read and explicitly stopped',async()=>{
  await page.click('[data-source=R01]');assert.ok(await page.locator('#dialog-body a').getAttribute('href'));await page.click('#close-dialog');
  await page.click('#speak');await page.waitForSelector('#reading-controls:not([hidden])');
  const before=await page.evaluate(()=>window.__cancels);await page.click('#stop-reading');
  assert.equal(await page.locator('#reading-controls').isVisible(),false);assert.ok(await page.evaluate(()=>window.__cancels)>before);
  await page.waitForFunction(()=>!document.querySelector('#speak').disabled);
 });
 await test('A cold voice list waits for voiceschanged instead of falsely reporting unsupported audio',async()=>{
  const count=await page.evaluate(()=>{window.__normalVoices=speechSynthesis.getVoices;speechSynthesis.getVoices=()=>[];setTimeout(()=>{speechSynthesis.getVoices=window.__normalVoices;speechSynthesis.dispatchEvent(new Event('voiceschanged'));},800);return __spoken.length;});
  await page.click('#speak');await page.waitForFunction(n=>__spoken.length>n,count);await page.click('#stop-reading');
  assert.equal(await page.locator('#reading-controls').isVisible(),false);
 });
 await test('Stopping while voices load prevents delayed surprise playback',async()=>{
  const count=await page.evaluate(()=>{speechSynthesis.getVoices=()=>[];return __spoken.length;});
  await page.click('#speak');await page.waitForSelector('#reading-controls:not([hidden])');await page.click('#stop-reading');
  await page.evaluate(()=>{speechSynthesis.getVoices=window.__normalVoices;speechSynthesis.dispatchEvent(new Event('voiceschanged'));});await page.waitForTimeout(80);
  assert.equal(await page.evaluate(()=>__spoken.length),count);assert.equal(await page.locator('#reading-controls').isVisible(),false);
 });
 await test('Speech has a finish state and still requires a confirmed transcript',async()=>{
  await page.click('#record-question');await page.click('#voice-consent');
  await page.waitForFunction(()=>document.querySelector('#record-question').textContent==='Finish speaking');
  assert.equal(await page.locator('#voice-answer').isVisible(),false);
  await page.evaluate(()=>{__recognizer.onresult({results:[[{transcript:'Can these medicines be taken together?'}]]});__recognizer.onend();});
  await page.waitForFunction(()=>document.querySelector('#question-text').value.startsWith('Can these'));
  assert.equal(await page.locator('#voice-answer').isVisible(),false);await page.click('#confirm-question');
  assert.equal(await page.locator('#voice-answer').isVisible(),true);await page.click('#stop-reading');
 });
 await test('Editing a question cancels the previous spoken answer and requires confirmation again',async()=>{
  await page.click('#speak-answer');await page.waitForSelector('#reading-controls:not([hidden])');
  const before=await page.evaluate(()=>__cancels);await page.fill('#question-text','How should I store these medicines?');
  assert.equal(await page.locator('#voice-answer').isVisible(),false);assert.equal(await page.locator('#reading-controls').isVisible(),false);assert.ok(await page.evaluate(()=>__cancels)>before);
 });
 await test('Device support checks local language voices without promising successful recognition',async()=>{
  await page.click('#device-readiness');assert.match(await page.locator('#dialog-body').innerText(),/microphone permission and speech service required/);
  assert.equal(await page.locator('#local-voice-status .readiness-row').count(),3);assert.match(await page.locator('#local-voice-status').innerText(),/Local voice found/);
  await page.click('#test-local-voice');await page.waitForFunction(()=>__spoken.at(-1).text==='請核對藥品標籤。');
  await page.click('#stop-test-voice');assert.equal(await page.locator('#voice-test-status').innerText(),'Stopped.');
  await page.evaluate(()=>{window.__deviceVoices=speechSynthesis.getVoices;speechSynthesis.getVoices=()=>[{lang:'zh-HK',localService:false}];speechSynthesis.dispatchEvent(new Event('voiceschanged'));});
  assert.equal(await page.locator('#local-voice-status strong').allTextContents().then(a=>a.every(x=>x==='No local voice listed yet')),true);
  await page.evaluate(()=>{speechSynthesis.getVoices=window.__deviceVoices;speechSynthesis.dispatchEvent(new Event('voiceschanged'));});
  await page.click('#close-dialog');
 });
 await test('Removal can be undone without restoring a stale check result',async()=>{
  await page.click('[data-remove="HK-53362"]');assert.equal(await page.locator('.selected-card').count(),1);
  await page.locator('#toast button').click();assert.equal(await page.locator('.selected-card').count(),2);
  assert.equal(await page.evaluate(()=>currentResult),null);assert.equal(await page.locator('#voice-answer').isVisible(),false);
 });
 await test('Undo clear restores the medicine list and pharmacist notes in memory only',async()=>{
  await page.locator('#consultation-fields summary').click();await page.check('[data-context=allergy]');await page.fill('#context-question','Please check this label.');
  await page.click('#clear');assert.equal(await page.locator('.selected-card').count(),0);await page.locator('#toast button').click();
  assert.equal(await page.locator('.selected-card').count(),2);assert.equal(await page.inputValue('#context-question'),'Please check this label.');assert.equal(await page.isChecked('[data-context=allergy]'),true);
  const storage=await page.evaluate(()=>JSON.stringify({...localStorage,...sessionStorage}));assert.doesNotMatch(storage,/Please check this label|HK-53362/);
 });
 await test('Camera denial leaves file and manual entry available',async()=>{
  await page.locator('#photo-entry>summary').click();await page.click('#open-camera');
  await page.waitForFunction(()=>document.querySelector('#camera-state').textContent.includes('permission denied'));
  assert.equal(await page.locator('#camera-file').isEnabled(),true);await page.click('#close-dialog');assert.equal(await page.locator('#search').isEnabled(),true);
 });
 await test('Real local OCR of the synthetic label produces candidates without selecting medicines',async()=>{
  await page.click('#clear');await page.click('#ocr-sample');await page.waitForSelector('#ocr-candidates [data-add="HK-53362"]',{timeout:90000});
  assert.equal(await page.locator('#ocr-candidates [data-add="HK-53319"]').count(),1);assert.equal(await page.locator('.selected-card').count(),0);
 });
 await test('Starting a new photo clears old candidates and a failure cannot leave stale matches',async()=>{
  await page.evaluate(()=>{window.__ocrJobs=[];BrowserRuntime.ocr=(file,options)=>new Promise((resolve,reject)=>__ocrJobs.push({resolve,reject,options}));recognize(new File(['test'],'new.png',{type:'image/png'}));});
  assert.equal(await page.locator('#ocr-candidates [data-add]').count(),0);assert.equal(await page.locator('#ocr-details').isVisible(),false);
  await page.evaluate(()=>__ocrJobs[0].reject(Error('Test unreadable')));await page.waitForFunction(()=>document.querySelector('#ocr-status').dataset.state==='ocrFail');
  assert.equal(await page.locator('#ocr-candidates [data-add]').count(),0);assert.equal(await page.locator('#photo').isEnabled(),true);
 });
 await test('Late photo results and progress cannot replace a newer photo or unlock its controls',async()=>{
  await page.evaluate(()=>{__ocrJobs=[];recognize(new File(['one'],'one.png'));recognize(new File(['two'],'two.png'));__ocrJobs[0].resolve({rows:[{text:'HK-53362',confidence:1}]});});
  await page.waitForTimeout(30);assert.equal(await page.locator('#ocr-candidates [data-add]').count(),0);assert.equal(await page.locator('#photo').isEnabled(),false);
  await page.selectOption('#language','yue');await page.evaluate(()=>{__ocrJobs[0].options.onProgress(.99);__ocrJobs[1].resolve({rows:[{text:'HK-53319',confidence:1}]});});
  await page.waitForSelector('#ocr-candidates [data-add="HK-53319"]');assert.equal(await page.locator('#ocr-candidates [data-add="HK-53362"]').count(),0);
  await page.evaluate(()=>{__ocrJobs=[];recognize(new File(['reset'],'reset.png'));reset();__ocrJobs[0].resolve({rows:[{text:'HK-53362',confidence:1}]});});await page.waitForTimeout(30);
  assert.equal(await page.locator('#ocr-details').isVisible(),false);assert.equal(await page.locator('#photo').isEnabled(),true);
 });
 for(const lang of ['en','cmn','yue'])for(const width of [320,390,1365])await test(`${lang} ${width}px navigation, enlarged text and result fit the viewport`,async()=>{
  await page.setViewportSize({width,height:900});await page.goto(base+'/?lang='+lang);await page.waitForFunction(()=>window.ProductExperience);await page.click('#large-font');await demo();
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  const overflow=await page.evaluate(()=>[...document.querySelectorAll('button,input,select,textarea')].filter(x=>x.getBoundingClientRect().width&&x.getBoundingClientRect().right>innerWidth+1).map(x=>x.id||x.textContent));assert.deepEqual(overflow,[]);
  if(width===390)await page.screenshot({path:root+'/qa/product-blue-'+lang+'-result.png',fullPage:true});
 });
 assert.deepEqual(errors,[]);const result={tested_at:new Date().toISOString(),url:base,passed:checks.length,checks,errors,scope:'Desktop Chrome at phone and desktop widths; real Tesseract on a synthetic label. Speech, microphone and camera APIs mocked. No physical-phone, human-accent, real-pack OCR accuracy or clinical validation.'};
 fs.writeFileSync(root+'/qa/product-usability-results.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({passed:checks.length,errors}));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
