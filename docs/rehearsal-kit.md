# Recorded examples and Cantonese rehearsal

These supplementary recordings follow the team's existing three-card demonstration. They are rehearsal assets, not a submitted competition video or a clinical validation study.

**Download:** [Team rehearsal release](https://github.com/yc-eagle/med-safe/releases/tag/rehearsal-20261003). Open `index.html` from the extracted package to play the recordings without an internet connection. The gallery opens in English and offers Mandarin and Cantonese text.

## A useful first example

Choose **Duplicate ingredient**, confirm the prepared examples, run the check, then open the source:

- PANADOL CAPLET 500MG — **HK-53362**.
- PANADOL COLD & COUGH TAB — **HK-53319**.

Both selected catalogue formulations contain paracetamol. Rule **R01** warns about duplicate exposure. [Hong Kong Drug Office guidance](https://www.drugoffice.gov.hk/eps/do/en/consumer/news_informations/knowledge_on_medicines/paracetamol.html) advises against combining paracetamol-containing products unless advised by healthcare professionals. Do not substitute another brand variant without confirming its full identity. This example does not calculate an individual's dose.

The other recorded cards show **increased bleeding risk** (R02; warfarin + ibuprofen) and an **unidentified medicine**. The latter leaves the check incomplete. A separate text check also exercises an uncovered pair; no result is interpreted as approval to combine medicines.

## Available media

| File | Content |
|---|---|
| `en-voice-demo.mp4` | English audio question, actual recognition, explicit confirmation and spoken product response |
| `yue-voice-demo.mp4` | Cantonese audio question and response; English subtitle file included |
| `en-answer-recorded.m4a` | Audio captured while the product speaks its English answer |
| `yue-answer-recorded.m4a` | Audio captured while the product speaks its Cantonese answer |
| `text-three-cases.mp4` | Silent screen recording of the three examples |
| `MedSafe-QR.png` | The same temporary team demo entry; not a different project |
| `给澳门同学-台词与任务.txt` | Cantonese role-play, English voice-over and a human language-test protocol |

## What was actually tested

Ten browser text cases cover five outcomes in English and Cantonese: duplicate ingredient, increased risk, labelled contraindication, unidentified medicine, and no matching rule. The engine and UI were not mocked. Speech was suppressed in the text-only tests.

For the voice recordings, a synthesized WAV was supplied as an audio track to the **native Chrome speech recognizer**. The recognizer produced the transcript; the UI required confirmation; the unchanged answer path called native speech synthesis. ScreenCaptureKit captured audio from the dedicated test browser process. The answer recordings are not a separately voiced expected answer.

This bypasses the physical microphone. It does **not** establish recognition accuracy for a human speaker, a Macau accent, a noisy venue, or a physical phone. Native browser recognition needs a network and may send audio to its provider. Reading uses an installed local voice. The Cantonese volunteer can fill the remaining human language and usability evidence gap; the role-play must be recorded separately from that test.

The recordings run desktop Chrome against locally served files from the team revision and the isolated PR changes. English was recorded before the subsequent Cantonese-only wording correction; its answer path is unchanged. The final Cantonese run includes that correction. Test records and media hashes are included in the download.

## Findings and small fixes

- Re-running `tools/build_data.py` reproduced the same `app/data.js` hash as the public demo: `78621430ce6e623354fd234f8e7f647cf2cebe49f5c6aa0c5b820f12c312d85c`. The public drug data was already current.
- The Cantonese combination answer still contained a hard-coded “not medically reviewed” sentence. It now distinguishes the completed rule review from the pending Cantonese wording review. The evidence strength, advice, matching logic and rule data are unchanged.
- The browser title and installed app name are shortened to **MedSafe**. The temporary hostname is assigned by the hosting service; changing a title does not rename a hostname.
- The offline asset manifest was regenerated after these UI changes. Supplementary videos are downloaded separately and are not added to the core offline cache.

## Refreshing the public app

The sequence is: pull the team revision → build browser data → build the public folder and integrity manifest → serve that folder → update saved browser copies. A static-file server reads replaced files without restarting. A backend-code or directory change may require a restart.

On a phone with saved offline files, use **Check for updates / 檢查更新**, wait for completion and reopen the app. Reopening clears the current medicine session. The temporary address still depends on the host computer remaining online; downloaded recordings do not.

## Suggested volunteer contribution

For a direct handoff, send the [20-minute execution card](volunteer-quickstart.zh-CN.txt). It includes the exact buttons, four short voice attempts, three filming shots, the English narration and the files to return.

Prioritise one unaided Cantonese usability attempt, then a roughly 55-second caregiver role-play and a clean English voice-over. The script is in the download. Record raw attempts and recognition corrections, including failures. Report this as a Cantonese-speaking student's experience, not older-adult or clinical evidence. Language feedback can be reviewed by the volunteer; changes to medical meaning remain with the team's medical reviewer.
