/* Run with PREVIOUS_BUILD and CURRENT_BUILD pointing at two public builds. */
'use strict';
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'/Users/ssy/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 assert.ok(process.env.PREVIOUS_BUILD&&process.env.CURRENT_BUILD,'Supply two prepared public builds');
 let directory=path.resolve(process.env.PREVIOUS_BUILD);
 const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webmanifest':'application/manifest+json','.wasm':'application/wasm','.svg':'image/svg+xml','.png':'image/png'};
 const server=http.createServer((req,res)=>{
  const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/+/, '')||'index.html';
  const file=path.resolve(directory,name);
  if(!file.startsWith(directory+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
  res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});fs.createReadStream(file).pipe(res);
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const base='http://127.0.0.1:'+server.address().port;
 const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
 try{
  const ctx=await browser.newContext(),p=await ctx.newPage();await p.goto(base);
  await p.click('#prepare-offline');await p.waitForFunction(()=>OfflineRuntime.getState().current,null,{timeout:120000});
  const before=await p.evaluate(()=>OfflineRuntime.getState());directory=path.resolve(process.env.CURRENT_BUILD);
  await p.click('#prepare-offline');await p.waitForFunction(v=>{const s=OfflineRuntime.getState();return s.current&&s.cachedVersion!==v;},before.cachedVersion,{timeout:120000});
  await ctx.setOffline(true);await p.reload();await p.waitForFunction(()=>window.ProductExperience);
  await p.fill('#search','HK-53362');await p.waitForSelector('[data-add="HK-53362"]');
  const after=await p.evaluate(()=>OfflineRuntime.getState());assert.equal(after.current,true);assert.equal(after.files,56);assert.notEqual(after.version,before.version);
  assert.equal(await p.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(243, 248, 253)');
  const result={tested_at:new Date().toISOString(),passed:3,checks:['Prepared the prior published build','Updated all assets from the existing saved page','Reopened the blue product and searched with the network disabled'],before,after,scope:'Desktop Chrome; no physical phone tested.'};
  fs.writeFileSync(path.resolve(__dirname,'../qa/product-blue-offline-update.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({passed:3,before:before.version,after:after.version}));
 }finally{await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exit(1);});
