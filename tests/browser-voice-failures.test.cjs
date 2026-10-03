'use strict';
const assert=require('assert/strict'),fs=require('fs');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'}),page=await browser.newPage({viewport:{width:390,height:844}}),checks=[];try{
 await page.addInitScript(()=>{window.PUBLIC_DEMO=true;window.SpeechRecognition=class {};});
 await page.goto(process.env.TEST_URL||'http://127.0.0.1:8882');
 for(const [locale,ended] of [['en',/Listening ended/],['cmn',/收音已结束/],['yue',/收音已經結束/]]){
  await page.selectOption('#language',locale);await page.fill('#question-text','Keep this typed question');
  await page.evaluate(()=>{BrowserRuntime.stopListening=()=>false;BrowserRuntime.listen=async()=>{document.querySelector('#voice-status').textContent='Listening…';return '';};});
  await page.click('#record-question');assert.match(await page.locator('#voice-status').innerText(),ended);assert.equal(await page.inputValue('#question-text'),'Keep this typed question');assert.equal(await page.isVisible('#voice-answer'),false);assert.equal(await page.isDisabled('#record-question'),false);checks.push(locale+': empty transcript ends listening, preserves typed question and offers a retry');
 }
 await page.selectOption('#language','en');
 for(const [code,pattern]of [['no-speech',/Listening ended/],['network',/speech service is unavailable/],['not-allowed',/microphone permission/],['language-not-supported',/does not support the selected language/]]){
  await page.evaluate(code=>{BrowserRuntime.listen=async()=>{throw Error(code)};},code);await page.click('#record-question');assert.match(await page.locator('#voice-status').innerText(),pattern);assert.match(await page.locator('#voice-status').innerText(),/phone keyboard/);checks.push(code+': actionable browser-specific fallback');
 }
 await page.evaluate(()=>{BrowserRuntime.listen=()=>new Promise((resolve,reject)=>window.__rejectOldSpeech=reject);});
 await page.click('#record-question');await page.selectOption('#language','yue');const current=await page.locator('#voice-status').innerText();await page.evaluate(()=>window.__rejectOldSpeech(Error('network')));await page.waitForTimeout(30);assert.equal(await page.locator('#voice-status').innerText(),current);checks.push('An old-language failure cannot overwrite the new-language status');
 await page.evaluate(()=>{BrowserRuntime.listen=async()=>null;});await page.click('#record-question');assert.equal(await page.locator('#voice-status').innerText(),current);checks.push('Declining or cancelling does not display a transcription failure');
 fs.writeFileSync(process.env.TEST_OUTPUT||'qa/browser-voice-failures.json',JSON.stringify({date:new Date().toISOString(),passed:checks.length,checks,scope:'Controlled error and empty-result regression tests; not ASR accuracy or physical-device validation.'},null,2));console.log(checks.length+' browser voice failure checks passed');
 }finally{await browser.close()}})().catch(e=>{console.error(e);process.exit(1)});
