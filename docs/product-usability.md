# Product update — 4 October 2026

MedSafe uses a light-blue interface with English as its default language. Mandarin and Cantonese remain selectable. This update concentrates on the interactive product; no new walkthrough video was produced.

## The workflow

1. Search by medicine name, ingredient or HK registration number. **Use a photo** opens camera and saved-image choices. An image produces candidates, never an automatically confirmed medicine.
2. Add current medicines and any proposed addition. Compare the complete name, HK number, form and route with the actual label. The list counter and bottom action take the user to the next required step.
3. Check the confirmed list. Applicable warnings and their sources appear before the coverage details. Unknown medicines, missing routes and unassessed combinations stay explicit.
4. Ask a question by typing or supported browser speech. Review the transcript before receiving an answer. Read, stop playback, or export information to discuss with a pharmacist.

## Changes

- Search appears before the optional photo controls; phone navigation links the search, list and results.
- Added candidates are marked. Remove and clear actions can be undone while the list remains unchanged. Undo invalidates prior results and never restores a stale answer.
- Keyboard focus remains on the route or confirmation control after it updates.
- Starting another image clears the previous candidates. Late results, errors and progress from an older request cannot replace the current image. Changing the interface language does not discard the current recognition result.
- The camera and saved-image controls are separate. Camera denial leaves manual search and image selection available.
- Reading can be stopped, including while system voices load. The browser waits for `voiceschanged` instead of treating a short startup delay as missing language support. Cancelled speech cannot play later when voices arrive.
- Shorter instructions, restrained styling and the same blue palette apply to the main app and resource pages. The homepage no longer promotes the older recording.

## Preserved scope

The catalogue, ingredient mappings, source-linked rules, patient answer templates and decision engine are unchanged. There are 14,269 catalogue products and 14 prepared rules; catalogue size is not interaction coverage. Personal dose, treatment changes and clinical safety are not determined by this update.

Browser recognition remains optional and may use the browser provider after consent. Reading uses installed local voices. No patient selections, photos, recordings or questions are added to the offline cache. An undo snapshot exists only in the current page's memory.

## Verification

- Existing engine, patient, ingredient, validation and language logic checks: 146 passed.
- Three-language interface regression: 35 passed.
- New workflow, keyboard, undo, photo-race, speech-lifecycle and responsive checks: see [product usability results](../qa/product-usability-results.json).
- Controlled speech-failure recovery: [9 checks](../qa/product-blue-voice-failures.json).
- Resource pages: [15 checks](../qa/product-blue-resource-verification.json).
- Offline preparation, disconnected lookup, selected rule and synthetic-label recognition: [offline results](../qa/product-blue-offline-results.json).
- Existing saved copy → updated copy → disconnected reopening: [update test](../qa/product-blue-offline-update.json).
- Unmocked system voice availability and completion events: [Mac reading test](../qa/product-blue-native-reading.json).

The photo fixture is synthetic. Browser layout checks are not physical iPhone or Android tests. Mocked speech tests establish interface behavior, not accent accuracy. The separate native reading test records its own outcome and does not prove phone audio output. No clinical outcome claim is made.

Speech lifecycle implementation references: [utterance events](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance) and [cancelling queued speech](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/cancel).

## Product audit follow-up

The public build now excludes all videos, gallery, subtitles, volunteer material and slides. Device support can test the selected local voice, and editing a question cancels the prior spoken answer. All three languages passed the native-service recognition → confirmation → sourced answer → local reading test with synthesized input tracks. See the [complete capability audit](product-capabilities.md), [published-site native voice report](../qa/product-native-voice-published.json), [current resource checks](../qa/product-only-pages.json) and [current offline update check](../qa/product-audit-offline-update.json). Earlier test records above retain their original dates and scope.
