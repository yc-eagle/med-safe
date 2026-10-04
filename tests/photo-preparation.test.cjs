/* Local browser photo editor and OCR. No microphone, cloud OCR or patient data. */
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/ssy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert=require('node:assert/strict'),path=require('node:path');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});try{
 const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[],writes=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(r.method()!=='GET')writes.push(r.url());});
 await page.goto(process.env.TEST_URL||'http://127.0.0.1:8895');await page.waitForFunction(()=>api?.runtime==='browser');
 const sample=path.resolve(__dirname,'../app/sample-labels.png');
 await page.setInputFiles('#photo',sample);await page.waitForSelector('#photo-editor[open]');assert.equal(await page.locator('#photo-script').inputValue(),'mixed');
 await page.click('#photo-rotate');await page.click('#photo-rotate');await page.click('#photo-rotate');await page.click('#photo-rotate');await page.click('#photo-read');
 await page.waitForSelector('#ocr-candidates [data-add="HK-53362"]',{timeout:90000});assert.equal(await page.locator('#ocr-candidates [data-add="HK-53319"]').count(),1);assert.equal(await page.locator('.selected-card').count(),0);
 await page.setInputFiles('#photo',sample);await page.waitForSelector('#photo-editor[open]');await page.selectOption('#photo-script','chi_tra');await page.click('#photo-cancel');assert.equal(await page.locator('#photo-editor').count(),0);assert.equal(await page.locator('#ocr-candidates [data-add]').count(),0);
 for(const lang of ['en','cmn','yue']){await page.selectOption('#language',lang);await page.setInputFiles('#photo',sample);await page.waitForSelector('#photo-editor[open]');assert.ok(await page.evaluate(()=>document.querySelector('#photo-editor').getBoundingClientRect().right<=innerWidth));await page.evaluate(()=>reset());assert.equal(await page.locator('#photo-editor').count(),0);}
 assert.deepEqual(errors,[]);assert.deepEqual(writes,[]);console.log('PASS photo preview, rotation, mixed OCR, both IDs, no automatic selection, cancel/reset, 3 locales, no image upload');
 }finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
