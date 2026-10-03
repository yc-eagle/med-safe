# Data and Privacy: What Leaves the Device

[English](data-handling.md) | [中文](data-handling.zh-CN.md)

> The problem statement **requires** this: *"State what it costs, what it gets wrong, and **what leaves the device**."*
> **Owner: Shuoyang SUN.**

> **Earlier planning material — corrections applied.** Written before the product was built. Where this file conflicts with [`../README.md`](../README.md), [`decision-logic.md`](decision-logic.md) or the program, **the implementation wins**.
>
> - **The interface opens in English**, with Mandarin and Cantonese selectors (`?lang=en|cmn|yue`). Language and voice availability are separate settings. Changing language converts display text only; catalogue values, source records and clinical rules are unchanged.
> - **Risk levels are separate** (labelling contraindication / recommends avoid / increased risk / consult first / duplicate ingredient). Not every warning is "must not be taken together".
> - When a sourced rule matches, **the product does show the warning**. It never outputs a **"safe" conclusion**; a missing rule is a **coverage** status.
> - **Zero of the 14 rules are professionally approved.**
> - Capabilities of third-party products and services must be verified individually, not generalised.

---

## 1. What actually leaves the device

| Action | Where it happens | What leaves the device |
|---|---|---|
| Catalogue lookup and rule checking | In the browser, using downloaded data | **Nothing** |
| Photographing and text recognition (browser) | On the device, by bundled Tesseract | **Nothing.** The original image is processed by the browser |
| Photographing and text recognition (Apple Silicon Mac) | Local service on the same machine | Only to `localhost` on that machine. **Temporary files are deleted with the request** |
| Speech input in the browser | **Browser `SpeechRecognition` may be handled by the vendor's servers** | **A recording may reach the browser vendor.** Disclosed in the interface, with consent requested each time |
| Speech input (Apple Silicon Mac, local model) | Local Qwen3-ASR | **Nothing** once the model is installed |
| Speech output | The device's own voices | **Nothing** |
| Opening an external citation link | The source website | A normal web request to that site |

**There is no application backend storing patient data.** Normal catalogue and rule use has no server-side patient store.

**One thing that does always leave:** requesting the public site exposes normal access metadata, such as an IP address, to the static hosting provider. That is unavoidable for any hosted page and should be stated plainly if asked.

---

## 2. The distinction that must not be blurred

> **Web speech recognition is not fully offline.**

Browser `SpeechRecognition` can be processed by the browser vendor's servers. It is started only after the interface states this, and consent is requested for that use. **When offline, the user should type instead.** The product must never describe web Cantonese recognition as fully offline.

Local speech (the Apple Silicon option) is different: once the model is installed it runs on the machine. A local voice is used for output only when the device reports one.

---

## 3. Offline behaviour

| Scenario | Behaviour |
|---|---|
| Fully offline, after the data pack has downloaded | Catalogue lookup, rule checking, manual entry and the pharmacist question card all work. Browser OCR works from the bundled resources. **External citation links do not resolve**; local summaries, dates and section references remain |
| Unstable connection | Downloaded-data functions behave as offline; external links may fail |
| Data pack not downloaded | Only what is already cached is available. The offline download entry point on the page is the authoritative status indicator |
| Offline installation size and cache completion | **Read from the shipped interface and verify on the device.** Do not quote a figure that has not been observed on that device |

**Testing status, stated precisely:** the public URL has been verified in an **anonymous Chromium session** performing a full offline download, an offline reopen and a drug lookup while offline; **9 site-redirect regression checks** were added at the same time. The mobile offline upgrade passed **16 core engineering checks** across **53 cached resources, about 52.7 MiB**. **Testing on a physical phone has not been completed.** The declared scope of that suite is: Chromium desktop emulating 320/390px, real OCR of a synthetic fixture, simulated speech recognition, service workers blocked for that suite. **It is not physical iOS, Safari or Android device testing, not patient testing, and not clinical validation.**

---

## 4. What must not be put in the cache

Personal medicine selections, user questions, audio recordings and images **should not be added to the application cache**. The cache is for the catalogue, ingredient material, rules and recognition resources — not for the user's own circumstances.

---

## 5. Compliance notes

| Item | Note |
|---|---|
| Hong Kong Personal Data (Privacy) Ordinance (PDPO) | Personal health information is not uploaded by default. The product is designed so that a patient data store is unnecessary |
| Photograph retention | Browser: processed on the device, not uploaded. Mac: a temporary file deleted with the request |
| Can the user delete it | There is no server-side patient record to delete. Clearing browser or app cache removes cached resources. **Per-browser cache retention and eviction behaviour still needs verification** |
| Third-party services | The static hosting provider of the public site; the browser vendor, only if browser speech recognition is used; and the external citation sites the user chooses to open |
| Installed model weights | The optional local speech model (about 0.7 GB) is installed on the user's own machine. **No patient information is required during installation** |

---

## 6. How to say it in the pitch

One sentence, usable directly:

> **"There is no backend holding patient data. In the browser, the photograph is recognised on the device and does not leave it — because a photograph of medicines is personal health information."**

If asked about speech, say it without hedging:

> **"Web speech recognition may be processed by the browser vendor, so we disclose that and ask for consent each time. When offline, you type. The local Mac option keeps audio on the machine."**

Do not claim the web speech path is offline. That is the one claim here that would not survive a question.

---

## 7. Checklist

- [x] Table above reflects the implementation
- [x] The "web speech is not fully offline" distinction is stated in the interface and in this document
- [x] All third-party calls identified
- [ ] Offline path tested (**unplug the network and run it once**) — verified in anonymous Chromium; **physical device still pending**
- [ ] Per-browser cache retention and eviction behaviour verified
- [ ] Can state "what leaves the device" in one sentence during the pitch
