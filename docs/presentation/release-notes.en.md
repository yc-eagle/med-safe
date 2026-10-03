# Presentation and language update

This product update starts from the team's `62c5aa2` revision. It retains the existing project name, original concept, target setting, team roles, pitch structure and evidence ledger. Existing team documents are unchanged; the three presentation introductions are additional files.

The interface opens in English. English, Mandarin and Cantonese selectors update the interface, example questions, prepared answers and voice-language request. Changing language preserves selected products and the original question. Source records and clinical rule data are unchanged. Browser recognition requests `en-HK`, `zh-CN` or `zh-HK`; actual availability depends on the browser. The Mac recognizer remains Cantonese-only. Tests of voice routing use controlled substitutes, not measured recognition accuracy.

The mobile download contains 53 public assets (about 52.7 MiB). Language controls, search, pair checks and photo OCR work after a completed offline download. Browser recognition requires a connection. Existing installations should update their offline copy and reopen before trying the new language controls.

The existing three-minute video and slide files are retained; the recording shows the earlier interface. Current functionality is demonstrated at the live product. These changes add no clinical approvals or real-user study results.

## Additional component

OpenCC JavaScript 1.0.5 converts Traditional Chinese display text to Simplified Chinese. It does not infer medicine identity, translate a clinical rule into a new recommendation, or alter underlying source records. It is bundled locally for offline use; no translation service receives the text. [Source and checksums](../../app/vendor/opencc-source.json) · [MIT licence](../../app/vendor/OPENCC-LICENSE.txt) · [upstream project](https://github.com/nk2028/opencc-js).

## Review evidence

- [Preserved team documents](../../qa/team-file-preservation.json)
- [Language interface checks](../../qa/language-ui-results.json)
- [Three-language intent and source checks](../../qa/patient-languages-results.json)
- [Controlled voice-routing checks](../../qa/voice-languages-browser-results.json)
- [Offline language and OCR checks](../../qa/offline-languages-results.json)
- [Companion page checks](../../qa/resource-pages-languages-results.json)

All 14 rules were clinician-reviewed on 2026-10-03, with a named reviewer and verdict for each. Education profiles, lexicon and patient wording remain pending review.
