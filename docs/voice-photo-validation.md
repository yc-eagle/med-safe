# Voice and photo validation — 3 October 2026

These observations describe the tested build, not a claim of support on every phone or a clinical validation. The clinical rules, medicine catalogue and identity-confirmation requirements were not changed.

| Path | Observed result | Limit |
|---|---|---|
| English synthetic audio → browser recognition → transcript confirmation → spoken answer | Passed. Recognized `can these medicines be taken together`; actual Samantha English speech emitted start and end events. | Audio was injected as a MediaStreamTrack. This bypasses microphone hardware. |
| Cantonese synthetic audio → browser recognition → transcript confirmation → spoken answer | Passed. Recognized `呢兩隻藥可唔可以一齊食`; actual Sinji Cantonese speech emitted start and end events. | The test used a Mac and Chrome, not a physical phone. |
| Browser microphone-capture simulation | No usable transcript in these attempts. English reported `no-speech`; a Cantonese attempt ended without a result. | Do not count this path as passed. No human microphone recording or phone microphone test was completed. |
| Mac offline Cantonese recognizer | Returned `呢两只药可唔可以一齐食？` from a 2.42-second synthetic recording, in about 15.9 seconds including cold startup. | This separate local runtime does not establish public mobile ASR support. |
| Clear synthetic medicine-label image | OCR returned HK-53362 and HK-53319 as candidates. Nothing was automatically selected. | A software fixture, not real packaging or a camera photograph. |
| Three manufacturer packaging images | Both 202 × 192 thumbnails and a 1000 × 1000 Chinese pack image returned no medicine candidates. Nothing was automatically selected. | Chinese packaging OCR remains a known weakness. The successful fixture must not be presented as successful real-pack recognition. |

Browser recognition used the actual speech service, with language tags `en-HK` and `zh-HK`; the recognized text was not mocked. The UI test injected synthesized audio and then exercised the product's explicit transcript-confirmation step. Speech output used actual local OS voices. The physical-phone microphone and installed-voice combinations remain unverified; the user was unavailable for a recording test.

The smaller regression suite uses controlled responses to test error handling. Its nine checks verify that empty recognition results end the listening state, typed text is retained, network/permission/language failures give useful next steps, and a stale recognition callback cannot overwrite a newly selected language. Eight existing language-routing checks also passed. These counts are engineering checks, not recognition-accuracy measurements.

Public browser OCR processes selected images locally. The image tests observed no outgoing non-GET request during image processing. All photo inputs still require the user to confirm the medicine and route before a check; missing matches do not imply safety.

## Team synchronization

The native media observations above were collected before the latest review-status wording update. They are retained as historical observations, not relabeled as new-device tests. This branch is now based on team commit `b91b00c`, which includes the recorded review of the 14 rules and interface copy updates. Of the 45 files changed by the team since `f38b5ee`, 44 remain byte-for-byte identical; the latest `app/voice.js` contains only the previously prepared error-handling patch in addition to the teammate’s content.

[Preservation comparison](../qa/team-sync-preservation.json) and [163 passing engineering regression checks](../qa/team-sync-checks.json) document this integration. Checks ran in an isolated copy so they did not rewrite the team’s existing result files.

## Evidence

- [Native voice UI observations](../qa/native-voice-ui-observations.json)
- [Native recognition service with audio tracks](../qa/native-browser-audio-track-check.json)
- [Microphone-capture attempt](../qa/native-browser-microphone-check.json)
- [Mac Cantonese ASR](../qa/mac-cantonese-asr-check.json)
- [All image observations, including failures](../qa/browser-photo-observations.json)
- [Error handling regression checks](../qa/browser-voice-failures.json)
- [Language regression checks](../qa/voice-language-regression-results.json)

Manufacturer test images came from [Panadol Hong Kong](https://www.panadol.com/zh-hk/products/adult/everyday-pain-relief/panadol-carplets/) and its [product catalogue](https://www.panadol.com/zh-hk/products/adult-product/panadol-tablets-with-optizorb-formulation/). The original pixels were used without alteration. These packaging images are not redistributed in this repository.
