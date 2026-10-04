/* Explicit public-asset download. No medicine list, photo, recording or question is persisted. */
'use strict';
window.OfflineRuntime=(()=>{
  const base=new URL('./',document.baseURI);
  let registration=null,installPrompt=null,state={ready:false,current:false,bytes:0},phase='checking',download=null;
  const tr=(z,e)=>window.MedLocale?MedLocale.choose(z,e):document.documentElement.lang==='en'?e:z;
  const web=()=>typeof api!=='undefined' && api ? api.runtime==='browser' : !!window.PUBLIC_DEMO;
  const mb=n=>(n/1048576).toFixed(1);
  const style=document.createElement('style');
  style.textContent='#offline-panel{border:1px solid #b6c6d3;background:#edf1f5;border-radius:12px;padding:14px 16px;margin:12px 0 18px;font-size:14px;line-height:1.65}#offline-panel p{margin:5px 0}#offline-panel .offline-row{display:flex;gap:12px;align-items:center;flex-wrap:wrap}#offline-panel strong{font-size:15px}#offline-panel button{min-height:44px}#offline-panel progress{width:100%;height:16px;accent-color:#244c6d}#offline-panel small{display:block;color:#3c5163}#offline-panel summary{font-size:14px;min-height:44px;padding-top:8px}#offline-panel li{margin:6px 0}#offline-panel[hidden]{display:none!important}@media print{#offline-panel{display:none!important}}';
  document.head.append(style);
  if(!document.querySelector('link[rel="manifest"]')){const l=document.createElement('link');l.rel='manifest';l.href=new URL('manifest.webmanifest',base).href;document.head.append(l);}
  if(!document.querySelector('meta[name="theme-color"]')){const m=document.createElement('meta');m.name='theme-color';m.content='#244c6d';document.head.append(m);}
  const panel=document.createElement('section');panel.id='offline-panel';panel.hidden=!web();panel.setAttribute('aria-labelledby','offline-title');
  panel.innerHTML='<div class="offline-row"><strong id="offline-title"></strong><button type="button" class="button secondary" id="prepare-offline"></button><button type="button" class="button secondary" id="install-offline" hidden></button></div><p id="offline-state" role="status" aria-live="polite"></p><progress id="offline-progress" max="100" value="0" hidden aria-label="Offline download progress"></progress><small id="offline-boundary"></small><details><summary id="offline-how-title"></summary><div id="offline-how"></div></details>';
  const anchor=document.getElementById('release-links');
  if(anchor)anchor.insertAdjacentElement('beforebegin',panel);else(document.querySelector('main')||document.body).prepend(panel);
  const el=id=>document.getElementById(id);
  function voiceOffline(){
    if(!web())return;
    const button=el('record-question');
    if(navigator.onLine===false){
      if(button){button.disabled=true;button.title=tr('離線時請打字；網頁語音需要網絡。','Type while offline; browser recognition needs a network.');}
      const line=el('voice-status');if(line)line.textContent=tr('目前離線：請打字提問。網頁語音不會在離線時啟動；已有的本機聲音仍可嘗試朗讀。','Offline: type your question. Browser recognition is disabled; an installed local voice may still read answers.');
    }else if(button){if(window.VoiceUI)VoiceUI.update();else button.disabled=!(typeof api!=='undefined' && api?.asr);button.removeAttribute('title');}
  }
  function render(){
    panel.hidden=!web();if(panel.hidden)return;
    el('offline-title').textContent=tr('離線使用','Use offline');
    const button=el('prepare-offline');button.textContent=phase==='downloading'?tr('正在下載…','Downloading…'):state.ready&&!state.current?tr('更新離線資料','Update offline copy'):state.current?tr('檢查更新','Check for updates'):tr('準備離線使用','Prepare for offline use');
    button.disabled=['checking','downloading','unsupported'].includes(phase)||navigator.onLine===false;
    const progress=el('offline-progress');progress.hidden=phase!=='downloading';
    let message='';
    if(phase==='unsupported')message=tr('這個瀏覽器或開啟方式不支援離線安裝。請在 Safari／Chrome 用 HTTPS 網址打開；仍可在目前頁面查藥。','Offline storage is unavailable here. Open the HTTPS link in Safari or Chrome; you can still search on this page.');
    else if(phase==='checking')message=tr('正在檢查這部裝置的離線資料…','Checking saved files on this device…');
    else if(phase==='downloading'){
      const loaded=download?.loaded||0,total=download?.total||state.bytes;
      progress.value=total?Math.round(loaded/total*100):0;
      message=tr(`正在下載離線檔案：${mb(loaded)} / ${mb(total)} MB。請保持頁面開啟，完成前不要斷網。`,`Downloading offline files: ${mb(loaded)} / ${mb(total)} MB. Keep this page open and stay online until complete.`);
    }else if(phase==='failed'){
      const why=state.code==='storage_full'?tr('儲存空間不足。','Storage is full.'):state.code==='release_changed'?tr('網站版本已更新，請重新整理後重試。','The site version changed. Reload and try again.'):tr('有檔案未下載或核對成功，請連網重試。','Some files could not be downloaded or verified. Reconnect and retry.');
      message=tr('今次準備未完成。','Preparation did not complete. ')+why+(state.ready?tr(' 上一次完整離線版本仍可使用。',' The previous complete offline version remains available.'):'');
    }else if(state.current)message=navigator.onLine===false?tr('已離線 · 查藥、逐對核對、照片識字和問題卡可用。','Offline · search, pair checks, photo OCR and question cards are available.'):tr(`離線資料已核對並儲存（${mb(state.bytes)} MB）。現在可以斷網重開測試。`,`Offline files verified and saved (${mb(state.bytes)} MB). You can now disconnect and reopen to test.`);
    else if(state.ready)message=tr('已有完整離線版本；網站有更新。連網時按「更新離線資料」。','A complete offline copy is available; a newer site version exists. Update while online.');
    else message=navigator.onLine===false?tr('目前離線，但未有完整下載。這頁可能仍可查藥；重新開啟及照片識字未獲保證。連網後先準備離線。','Offline, with no complete saved copy. This open page may work, but reopening and photo OCR are not assured. Prepare while online.'):tr(`先連網下載約 ${mb(state.bytes)} MB，完成後才可離線重開。`,`First download about ${mb(state.bytes)} MB while online. Reopening offline works only after completion.`);
    el('offline-state').textContent=message;
    el('offline-boundary').textContent=tr('只儲存公開藥品資料、程式及識字模型；不儲存你選的藥、照片、錄音或問句。來源外鏈與網頁語音需聯網。本機朗讀視乎所選語言及已安裝聲音。','Only public medicine data, app files and OCR models are saved. Your selections, photos, recordings and questions are not saved. Source links and browser voice need internet; local reading depends on the selected language and installed voices.');
    el('offline-how-title').textContent=tr('如何放到手機主畫面？','How do I add it to my home screen?');
    el('offline-how').innerHTML=tr('<ol><li><strong>iPhone／iPad：</strong>用 Safari 打開網址 → 分享 →「加入主畫面」。</li><li><strong>Android：</strong>用 Chrome 打開網址 → 選單 →「安裝應用程式」或「加入主畫面」。如瀏覽器提供安裝提示，也可按下方安裝。</li><li>從新圖示開啟，再按「準備離線使用」，等到顯示「已核對並儲存」，才開飛行模式重開。</li></ol><p>加入主畫面不等於已下載模型。不同瀏覽器／主畫面模式的儲存可能分開，請在實際要用的入口準備。私人瀏覽、清理瀏覽資料或系統釋放空間可能移除離線檔案，出門前請再測試。重新載入會清空當次用藥資料。</p>','<ol><li><strong>iPhone / iPad:</strong> Open in Safari → Share → Add to Home Screen.</li><li><strong>Android:</strong> Open in Chrome → menu → Install app or Add to Home screen. If the browser offers installation, an install button may also appear here.</li><li>Open the new icon, press Prepare for offline use, and wait for verified completion. Then test by reopening in airplane mode.</li></ol><p>Adding an icon does not download the OCR models. Browser and home-screen storage may differ: prepare in the entry you will actually use. Private browsing, clearing data or system storage eviction can remove files. Test again before relying on offline access. Reloading clears the current medicine session.</p>');
    el('install-offline').hidden=!installPrompt;el('install-offline').textContent=tr('安裝到這部裝置','Install on this device');
    voiceOffline();
  }
  async function rpc(type){
    if(!registration?.active)throw Error('worker_not_ready');
    return new Promise((resolve,reject)=>{const c=new MessageChannel();const timeout=setTimeout(()=>{c.port1.close();reject(Error('worker_timeout'));},15000);c.port1.onmessage=e=>{clearTimeout(timeout);c.port1.close();resolve(e.data)};registration.active.postMessage({type},[c.port2]);});
  }
  async function refresh(){state={...state,...await rpc('STATUS')};phase=state.preparing?'downloading':'idle';render();return state;}
  async function activated(worker){
    if(!worker||worker.state==='activated')return;
    await new Promise((resolve,reject)=>{
      const timer=setTimeout(()=>{worker.removeEventListener('statechange',changed);reject(Error('worker_timeout'));},20000);
      const changed=()=>{if(!['activated','redundant'].includes(worker.state))return;clearTimeout(timer);worker.removeEventListener('statechange',changed);worker.state==='activated'?resolve():reject(Error('worker_failed'));};
      worker.addEventListener('statechange',changed);changed();
    });
  }
  async function prepare(){
    if(navigator.onLine===false){render();return;}
    phase='checking';render();
    try{
      await registration.update();
      // If an update is installing, use its manifest only after it activates.
      await activated(registration.installing||registration.waiting);
      await refresh();
      if(state.current)return;
      phase='downloading';download={loaded:0,total:state.bytes};render();
      if(navigator.storage?.persist)navigator.storage.persist().catch(()=>{});
      await rpc('PREPARE');
    }catch(error){state.code=error.message;phase='failed';render();}
  }
  async function init(){
    if(!web())return;
    if(!window.isSecureContext||!('serviceWorker' in navigator)||location.protocol==='file:'){phase='unsupported';render();return;}
    try{
      registration=await navigator.serviceWorker.register(new URL('sw.js',base),{scope:base.href,updateViaCache:'none'});
      if(!registration.active){const w=registration.installing||registration.waiting;if(!w)throw Error('worker_unavailable');await activated(w);}
      await refresh();
    }catch(error){state.code=error.message;phase='failed';render();}
  }
  el('prepare-offline').onclick=prepare;
  el('install-offline').onclick=async()=>{if(!installPrompt)return;const prompt=installPrompt;installPrompt=null;render();await prompt.prompt();};
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;render();});
  window.addEventListener('appinstalled',()=>{installPrompt=null;render();});
  if('serviceWorker' in navigator)navigator.serviceWorker.addEventListener('message',event=>{
    if(!['PROGRESS','READY','FAILED','CLEARED'].includes(event.data?.type))return;
    if(event.source?.scriptURL!==new URL('sw.js',base).href)return;
    const data=event.data;
    if(data.type==='PROGRESS'){phase='downloading';download=data;}
    else{state={...state,...data};phase=data.type==='FAILED'?'failed':'idle';}
    render();
  });
  if('serviceWorker' in navigator)navigator.serviceWorker.addEventListener('controllerchange',()=>{if(registration?.active)refresh().catch(()=>{});});
  // The Mac local model remains usable offline. Only public browser recognition is guarded.
  if(window.BrowserRuntime){const listen=BrowserRuntime.listen.bind(BrowserRuntime);BrowserRuntime.listen=async(...args)=>{if(web()&&navigator.onLine===false)throw Error('browser_voice_requires_network');return listen(...args);};}
  for(const event of ['online','offline','language-change','local-api-ready'])window.addEventListener(event,()=>{queueMicrotask(render);});
  render();init();
  return {prepare,refresh,getState:()=>({...state,phase}),clear:()=>rpc('CLEAR')};
})();
