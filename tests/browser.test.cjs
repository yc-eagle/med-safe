// Requires Playwright and an installed Chrome. No application npm dependencies.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const ROOT=path.resolve(__dirname,'..'),results=[],errors=[],external=[];
const mark=(name)=>results.push({name,status:'passed'});
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROME_PATH||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 const context=await browser.newContext({viewport:{width:1440,height:1100},acceptDownloads:true});
 await context.route('**/*',route=>{let url=route.request().url();if(url.startsWith('http')&&!url.startsWith('http://127.0.0.1:8765')){external.push(url);return route.abort()}return route.continue()});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765');await page.waitForFunction(()=>document.querySelector('#mode').textContent==='本機服務');
 const shots=path.join(ROOT,'handoff/screenshots');fs.mkdirSync(shots,{recursive:true});
 await page.screenshot({path:path.join(shots,'01-home.png'),fullPage:true});
 async function confirm(){for(const cb of await page.locator('[data-confirm]').all())await cb.check()}
 async function add(id){await page.fill('#search',id);await page.click(`#search-results [data-add="${id}"]`)}
 await page.click('[data-case=duplicate]');assert.equal(await page.isDisabled('#check'),true);mark('Confirmation gate');
 await confirm();await page.click('#check');assert.match(await page.locator('#result').innerText(),/R01/);mark('Duplicate ingredient case');
 await page.screenshot({path:path.join(shots,'02-duplicate-zh.png'),fullPage:true});
 await page.click('[data-source=R01]');assert.match(await page.locator('#dialog').innerText(),/2023-12/);await page.click('#close-dialog');mark('Cached source and version');
 const download=page.waitForEvent('download');await page.click('#download-summary');let dl=await download;await dl.saveAs(path.join(ROOT,'handoff/example-summary.txt'));assert.match(fs.readFileSync(path.join(ROOT,'handoff/example-summary.txt'),'utf8'),/drugoffice.gov.hk/);mark('Export with source citation');
 await page.click('#language');assert.match(await page.locator('#result').innerText(),/Both products contain paracetamol/);mark('English results');
 await page.screenshot({path:path.join(shots,'03-duplicate-en.png'),fullPage:true});
 await page.click('#speak');await page.waitForSelector('audio');await page.waitForFunction(()=>document.querySelector('audio').duration>0);assert.ok(await page.locator('audio').evaluate(a=>a.currentTime>=0));mark('English audio attached and decodable');
 await page.click('[data-case=interaction]');await confirm();await page.click('#check');assert.match(await page.locator('#result').innerText(),/R02/);mark('Interaction case');
 await add('HK-58956');await confirm();await page.click('#check');let result=await page.locator('#result').innerText();assert.match(result,/R02/);assert.match(result,/full check could not be completed/);mark('Known warning retained with out-of-scope item');
 await page.click('[data-case=unknown]');await confirm();await page.click('#check');assert.match(await page.locator('#result').innerText(),/full check could not be completed/);mark('Unknown case');
 await page.screenshot({path:path.join(shots,'04-unknown-en.png'),fullPage:true});
 await page.click('#clear');await add('HK-44354');await add('HK-35198');await confirm();await page.click('#check');assert.match(await page.locator('#result').innerText(),/does not mean/);mark('No-hit state has no safety claim');
 await add('HK-35198');assert.equal(await page.locator('.selected-card').count(),2);mark('Duplicate input rejected');
 await page.locator('[data-confirm]').first().uncheck();assert.equal(await page.locator('.alert-card').count(),0);assert.equal(await page.isDisabled('#check'),true);mark('Changing confirmation invalidates result');
 await page.click('#clear');await page.evaluate(async()=>{const b=await(await fetch('sample-labels.png')).blob();await recognize(new File([b],'synthetic-labels.png',{type:'image/png'}),true);});await page.waitForFunction(()=>document.querySelectorAll('#ocr-candidates [data-add]').length===2);for(const b of await page.locator('#ocr-candidates [data-add]').all())await b.click();assert.equal(await page.isDisabled('#check'),true);await confirm();await page.click('#check');assert.match(await page.locator('#result').innerText(),/R01/);mark('Synthetic image to candidate to confirmation to warning');
 await page.locator('#ocr-details').evaluate(e=>e.open=false);await page.screenshot({path:path.join(shots,'05-ocr-flow-en.png'),fullPage:true});
 await page.click('#clear');await page.locator('#photo').setInputFiles(path.join(ROOT,'tests/blank.png'));await page.waitForFunction(()=>document.querySelector('#ocr-status').textContent.startsWith('No usable'));assert.equal(await page.locator('#ocr-candidates [data-add]').count(),0);mark('Blank image yields no candidates');
 await page.click('[data-case=duplicate]');await confirm();await page.click('#check');await page.click('#language');await page.setViewportSize({width:390,height:844});await page.click('#large-font');await page.evaluate(()=>scrollTo(0,0));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);mark('390px mobile large-text layout has no horizontal overflow');
 await page.screenshot({path:path.join(shots,'06-mobile-large.png'),fullPage:true});
 await page.setViewportSize({width:1440,height:1100});await page.click('#large-font');await page.emulateMedia({media:'print'});await page.pdf({path:path.join(ROOT,'handoff/example-printed-summary.pdf'),format:'A4',printBackground:true});mark('Printable summary');
 await page.emulateMedia({media:'screen'});await page.reload();assert.equal(await page.locator('.selected-card').count(),0);assert.equal(await page.evaluate(()=>localStorage.length),0);mark('No retained selections after reload');
 const fallback=await context.newPage();fallback.on('pageerror',e=>errors.push(e.message));await fallback.goto('file://'+path.join(ROOT,'app/index.html'));await fallback.click('[data-case=duplicate]');for(const cb of await fallback.locator('[data-confirm]').all())await cb.check();await fallback.click('#check');assert.match(await fallback.locator('#result').innerText(),/R01/);assert.match(await fallback.locator('#mode').innerText(),/離線/);mark('Standalone file fallback works without server API');
 assert.equal(external.length,0);mark('No attempted external network requests during flows');assert.equal(errors.length,0);mark('No JavaScript page errors');
 fs.writeFileSync(path.join(ROOT,'qa/browser-results.json'),JSON.stringify({date:new Date().toISOString(),passed:results.length,failed:0,errors,external,results},null,2));console.log(`${results.length} browser checks passed`);await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
