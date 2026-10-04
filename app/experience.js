'use strict';
(() => {
  const text = (en, cmn, yue) => ({en, cmn, yue})[MedLocale.current];
  const copy = {
    photoEntry: ['Use a photo', '拍照找药', '影相搵藥'],
    photoEntryHint: ['Camera or saved image', '拍摄或选择照片', '影相或者揀相'],
    navAdd: ['Find a medicine', '查找药品', '搵藥'],
    navList: ['Your list', '药品清单', '藥品清單'],
    navResults: ['Results', '核对结果', '核對結果'],
    reading: ['Reading aloud', '正在朗读', '讀緊出嚟'],
    stopReading: ['Stop', '停止', '停止']
  };
  const setText = (el, value) => { if (el && el.textContent !== value) el.textContent = value; };
  function jump(selector) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start'});
    if (el.matches('input,textarea,button')) el.focus({preventScroll:true});
  }
  function update() {
    document.querySelectorAll('[data-x]').forEach(el => setText(el, text(...copy[el.dataset.x])));
    setText($('#nav-count'), String(selected.length));
    const remaining = selected.filter(x => !x.confirmed).length;
    $('#next-step').hidden = !selected.length;
    setText($('#next-step-note'), text(`${selected.length} medicine${selected.length === 1 ? '' : 's'} in your list`, `已加入 ${selected.length} 项药品`, `清單有 ${selected.length} 隻藥`));
    setText($('#next-step-button'), currentResult ? text('Ask a question', '继续提问', '再問清楚') : selected.length < 2 ? text('Add another medicine', '再加入一项', '再加一隻藥') : remaining ? text(`Review ${remaining} medicine${remaining === 1 ? '' : 's'}`, `确认 ${remaining} 项药品`, `核對 ${remaining} 隻藥`) : text('Check medicines', '开始核对', '開始核對'));
    const resultCount = $('#search-results').querySelectorAll('.candidate').length;
    setText($('#search-feedback'), resultCount ? text(`${resultCount} match${resultCount === 1 ? '' : 'es'} shown. Check the full name and HK number.`, `显示 ${resultCount} 个结果，请核对完整药名和 HK 编号。`, `顯示 ${resultCount} 個結果，請對清楚全名同 HK 編號。`) : '');
    document.querySelectorAll('[data-add]').forEach(button => {
      const added = selected.some(x => x.id === button.dataset.add);
      button.disabled = added;
      if (!button.dataset.originalLabel) button.dataset.originalLabel = button.textContent;
      const normal = products.has(button.dataset.add) ? t('add') : t('unknownAdd');
      setText(button, added ? text('Added', '已加入', '已加入') : normal);
    });
  }
  $('#next-step-button').onclick = () => {
    if (currentResult) return jump('#question-text');
    if (selected.length < 2) return jump('#search');
    const missing = document.querySelector('[data-confirm]:not(:checked)');
    if (missing) { missing.closest('.selected-card').scrollIntoView({block:'center',behavior:'smooth'}); missing.focus({preventScroll:true}); return; }
    $('#check').click();
  };
  $('#stop-reading').onclick = stopAudio;
  window.addEventListener('reading-change', e => {
    $('#reading-controls').hidden = !e.detail.active;
    setText(document.querySelector('[data-x=reading]'), e.detail.phase === 'preparing' ? text('Preparing audio','正在准备语音','準備緊語音') : text(...copy.reading));
  });
  document.addEventListener('play', e => { if (e.target.tagName === 'AUDIO') $('#reading-controls').hidden = false; }, true);
  for (const name of ['pause','ended','error']) document.addEventListener(name, e => {
    if (e.target.tagName === 'AUDIO' && ![...document.querySelectorAll('audio')].some(a => !a.paused && !a.ended)) $('#reading-controls').hidden = true;
  }, true);
  document.addEventListener('click', e => {
    const nav = e.target.closest('.journey-nav a');
    if (nav) { e.preventDefault(); jump(nav.getAttribute('href')); }
    if (e.target.closest('#product-help')) showDialog(text('Using MedSafe','怎么使用','點樣用'), `<ol><li>${text('Search by full medicine name or HK number, or open “Use a photo”.','输入完整药名或 HK 编号，也可以展开“拍照找药”。','輸入全名或者 HK 編號，亦可以用「影相搵藥」。')}</li><li>${text('Add current medicines and the medicine you plan to add. Compare each entry with its actual label, including how it is used.','加入正在用和准备加用的药，逐项对照实物标签，确认使用途径。','加入用緊同準備加用嘅藥，逐項對住實物標籤，確認點樣用。')}</li><li>${text('Check the list, read the source and save questions for your pharmacist. A missing warning does not mean a combination is safe.','核对清单，查看出处，保存给药师的问题。没有警示不代表可以安全合用。','核對清單，睇出處，儲存想問藥劑師嘅問題。冇警示唔代表可以安全一齊用。')}</li><li>${text('Speak or type a question. Check the transcript before asking. Use Stop to end spoken playback.','可以语音或打字提问。先确认识别文字；朗读时可按停止。','可以講嘢或者打字。先對清楚識別文字；朗讀時可以按停止。')}</li></ol>`);
  });
  let queued = false;
  const schedule = () => { if (!queued) { queued = true; queueMicrotask(() => { queued = false; update(); }); } };
  for (const id of ['selected','result','search-results','ocr-candidates']) new MutationObserver(schedule).observe($('#'+id),{childList:true,subtree:true});
  for (const name of ['language-change','local-api-ready']) window.addEventListener(name,schedule);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const entry = entries.find(e => e.isIntersecting);
      if (entry) document.querySelectorAll('.journey-nav a').forEach(a => {
        if (a.hash === '#'+entry.target.id) a.setAttribute('aria-current','step'); else a.removeAttribute('aria-current');
      });
    },{rootMargin:'-10% 0px -60% 0px'});
    for (const id of ['add-medicines','your-medicines','check-results']) observer.observe($('#'+id));
  }
  window.ProductExperience = {update,jump};
  update();
})();
