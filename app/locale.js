/* Presentation language only: no medicine list or patient input is persisted. */
(function (root, factory) {
  const api = factory(typeof module === 'object' && module.exports ? require('./vendor/opencc-t2cn.js') : root.OpenCC);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.MedLocale = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (OpenCC) {
  'use strict';
  const options = ['en', 'cmn', 'yue'];
  const converter = OpenCC.Converter({ from: 'hk', to: 'cn' });
  const simplify = text => converter(String(text ?? ''));
  let current = 'en';
  if (typeof location !== 'undefined') {
    const requested = new URLSearchParams(location.search).get('lang');
    if (options.includes(requested)) current = requested;
  }
  const display = text => current === 'cmn' ? simplify(text) : String(text ?? '');
  const choose = (zh, en, yue = zh) => current === 'en' ? en : current === 'cmn' ? simplify(zh) : yue;
  function updateDocument() {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = { en: 'en', cmn: 'zh-Hans', yue: 'yue-Hant' }[current];
    document.documentElement.dataset.locale = current;
  }
  function set(value) {
    if (!options.includes(value)) return;
    current = value;
    updateDocument();
    if (typeof location !== 'undefined') {
      const url = new URL(location.href); url.searchParams.set('lang', current);
      try { history.replaceState(null, '', url); } catch { /* file:// still switches in memory. */ }
    }
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('locale-change'));
  }
  function link(path) {
    const url = new URL(path, typeof document !== 'undefined' ? document.baseURI : 'https://example.invalid/');
    url.searchParams.set('lang', current); return url.href;
  }
  // Convert display text only. Original catalogue values, questions, OCR output
  // and source excerpts are retained unchanged in their underlying records.
  function formatDOM(node) {
    if (current !== 'cmn' || typeof document === 'undefined' || !node) return;
    const skip = 'script,style,textarea,input,pre,code,blockquote,[data-verbatim],.product-id';
    const convert = text => {
      if (text.parentElement?.closest(skip)) return;
      const converted = simplify(text.nodeValue); if (converted !== text.nodeValue) text.nodeValue = converted;
    };
    if (node.nodeType === 3) { convert(node); return; }
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    let text; while ((text = walker.nextNode())) convert(text);
  }
  updateDocument();
  return { get current() { return current; }, get voice() { return current; },
    get speechTag() { return { en: 'en-HK', cmn: 'zh-CN', yue: 'zh-HK' }[current]; },
    choose, display, simplify, set, link, formatDOM };
});
