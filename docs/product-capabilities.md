# MedSafe product capabilities

Checked on 4 October 2026. [Open the product](https://med-care.pages.dev/) · [Source and limits](https://med-care.pages.dev/data-report?lang=en).

MedSafe helps a person in Hong Kong identify the medicines they have, find the warnings covered by this small rule set, and prepare questions for a pharmacist before adding a medicine. Its normal flow is **find → confirm → check → ask**. A prescribing decision is outside that flow.

## Available in the product

| Function | Current behavior | Verification and limits |
|---|---|---|
| Find a medicine | Search full product names, ingredients, HK numbers and explicit Chinese/Cantonese aliases. | 14,269 catalogue records. A brand alone does not identify a formulation. |
| Medicine details | Full catalogue name, HK number, all listed ingredients and registration holder; strength text where available. | The holder is not necessarily the manufacturer. Complete labels, verified per-unit strengths, expiry and batch are unavailable. |
| Ingredient information | General uses, selected adverse effects, precautions and storage guidance, with source links. | 14 ingredient profiles and 13 education sources. These summaries and translations still need professional review. |
| Camera | Open camera, capture, preview, retake, confirm the image and stop the camera. | Permission-denied fallback checked. Actual physical-phone camera handling remains unverified. |
| Photo recognition | Choose an image or captured photo; on-device OCR gives medicine candidates. Correct a misread HK number or search manually. | Real Tesseract succeeds on the synthetic label fixture. Earlier real packaging images failed; pack accuracy is not established. |
| Confirm the list | Add up to 12 medicines, compare each full identity with the label, record its route, or retain an unidentified item. | Recognition never confirms a medicine automatically. Remove/clear can be undone in the current session. |
| Pair checks | Enumerate all distinct pairs, expand ingredients and match explicit aliases, source rules and route conditions. | 14 prepared rules; three medicines produce three pair records, twelve produce 66. Uncovered pairs and unknown ingredients stay visible. |
| Sources | Warnings identify the source and relevant section. A source/coverage page explains the method. | Review recorded for the 14 rules on 3 October; no clinical-outcome validation or comprehensive interaction coverage. |
| English, Mandarin, Cantonese | English default; change the interface and patient answer language. | Three-language layouts and logic checked. Translated medical wording still needs review. |
| Typed questions | Ask about the selected medicines, warnings, general uses, possible effects, storage or why to ask a pharmacist. | Sourced, bounded answer templates; not unrestricted medical chat. Dose questions do not produce a personal dose. |
| Voice questions | Optional browser speech input after consent, then an editable transcript and explicit confirmation. | Actual native-service test details below. Browser/provider, network, permissions and language support can prevent recognition. |
| Spoken answers | Automatically read a confirmed answer; replay or stop it. Read result or ingredient key points. | Uses installed local voices in the selected language. Changing the question now stops its previous spoken answer. |
| Device support | Show recognition conditions and installed English/Mandarin/Cantonese voices; test and stop a short reading sample. | A listed voice or exposed browser feature is not a guarantee of successful recording or audible playback. Test reading never opens the microphone. |
| Pharmacist handoff | Prepare a medicine list, warnings, sources, optional circumstances and questions; download the card. | Not a prescription, appointment, message to a pharmacist or completed consultation. |
| Export and print | Download product facts, a check summary or a pharmacist card; use print output. | Exports are user-triggered. Medical history and individual risks are not assessed. |
| Unwell after medicine | Direct access to existing emergency guidance and source links. | Does not assess symptom severity or replace emergency care. |
| Phone usability | Large-text option, clear next actions, list counts, keyboard focus, manual fallbacks and three language options. | Tested at 320/390/1365px. These tests do not establish usability for older adults. |
| Offline use | Explicit download and integrity verification, update control, then local lookup, details, checks, typed answers, OCR and handoff. | About 53 MiB. Browser voice input is disabled offline; reading needs an installed local voice. Original sources need internet. Browser storage can be cleared or evicted. |
| Privacy | No sign-in; medicine selections, photos, questions and notes remain in the current page. | They are not written into the offline cache. Reload clears the medicine session. Optional recognition may send audio to the browser provider after consent. |
| Evidence review | Separate source-review page compares supplied AI output with confirmed fields and rule evidence. | Not part of the ordinary patient task sequence and not approval of a clinical conclusion. |

## Data and decision boundaries

The current generated product bundle has **14,269 catalogue products, 23,835 product–ingredient rows, 2,081 distinct ingredient strings, 13 example formulations, 22 controlled lexicon entries, 14 rules from five rule sources, and 14 ingredient profiles with 13 education sources**. The catalogue snapshot is dated 25 September 2026. These layers have different coverage; adding a catalogue record does not add a reviewed interaction rule.

The decision engine requires identity confirmation, retains the raw ingredient names, maps only explicit aliases, enumerates pairs and applies each rule's route constraints. Ingredient-text overlap is shown separately from a clinical warning. A missing rule never produces a safe-to-combine conclusion. Personal dose, whole-prescription assessment, three-or-more-drug effects, allergy matching, kidney/liver adjustment, pregnancy/paediatric suitability, herbs, food interactions and live recalls are not implemented. [Detailed method](decision-logic.en.md).

The decision engine, catalogue, clinical rules and answer templates were kept unchanged during this audit; the product edits concern packaging and speech controls. On-device OCR uses Tesseract.js/WebAssembly; browser input uses Web Speech; reading uses local system voices. The separately installed Mac version has Apple Vision and a local Qwen Cantonese recognizer. That Mac model is **not downloaded to the phone website**.

## Speech verification

See the timestamped [native full-flow probe](../qa/product-native-voice-workflow.json). It sends synthesized English, Cantonese and Mandarin audio tracks to Chrome's actual recognition service, checks the returned words, requires the product's confirmation action, verifies source rule R01 and observes the actual local voice's completion event. All three language attempts passed: English → Samantha (en-US), Cantonese → Sinji (yue-HK), and Mandarin → Eddy (Chinese (China mainland), zh-CN). It does not mock recognized text or medical answers and does not create recordings. The JSON records each language's actual pass/failure and the tested application hashes.

This is a controlled desktop test, **not** a live microphone, human accent, noisy venue, physical phone or independently recorded speaker-audibility test. A successful English/Cantonese result establishes that the implemented end-to-end path works on that tested setup. It cannot guarantee it on every phone. Voice currently asks questions about an already selected medicine list; it does not add medicines by spoken name. The product provides typing when input fails and on-screen answers when playback fails.

[24 workflow checks](../qa/product-usability-results.json) cover transcript confirmation, stopping playback, missing/delayed voices, editing a question, current-language device checks, undo, keyboard focus, photo races and narrow layouts. [Controlled voice failure checks](../qa/product-audit-voice-failures.json) cover network, permission, language, empty-result and stale-callback behavior. These are separate from recognition-accuracy measurements.

## Product-only publishing

The deployable website now contains the interactive app and its supporting data, recognition resources, source information and offline help. It excludes recordings, a video gallery, volunteer scripts, decks, subtitles and rehearsal evidence. The build uses an explicit allowlist and refuses an occupied destination, preventing old media from reappearing. Former public media routes return a 404 page with a link to the app.

Historical team presentation materials remain in the repository/release for the team to manage; they are not normal product features. No new recording was made. [Build-boundary test](../tests/public-build.test.py).

## Remaining professional and device work

- Review education summaries, translations and terminology mappings; evaluate rule coverage before widening any claim.
- Try physical iPhone/Android microphones and local voices, including the exhibition network and natural Cantonese speech.
- Test real medicine boxes and hospital labels under glare, low contrast and blur; retain manual confirmation and search.
- Observe actual users performing the task. A synthetic scenario is not evidence that patients understand or benefit from the tool.

These gaps should be reported separately from completed software functions, rather than addressed by adding presentation assets or promising broader clinical safety.
