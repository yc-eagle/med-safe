# MedSafe — Hong Kong Medication Verification Assistant

[English](README.md) | [中文](README.zh-CN.md)

> **Confirm what is in your hand, read the sourced warnings, and take the unresolved questions to a pharmacist.**

**MedSafe** helps users review sourced medicine information. The name is not a claim of safety: the product never concludes that a combination is safe, and the interface says so on every result.

> A HacKU 2026 prototype for older adults and caregivers in Hong Kong: photograph a medicine box, confirm the product manually, look up ingredients, check selected medicines pair by pair, ask questions by voice, and leave with a question card for the pharmacist.

**HacKU 2026** — DeepTech Track | The University of Hong Kong | 2-4 October 2026
**Group 51 — Bauhinia Spheal (紫荆海豹球)**

**Problem statement:** *The Capability That Hasn't Travelled*

---

## Corrections to earlier planning material

Earlier planning documents in this repository described the product in ways that **do not match what was implemented**. Where they conflict with this README, [`docs/decision-logic.md`](docs/decision-logic.md) or the program itself, **the implementation is authoritative**.

| Earlier planning said | Actually implemented |
|---|---|
| "English voice output first, Cantonese next" | **The interface opens in English**, with Mandarin and Cantonese selectors (`?lang=en|cmn|yue`). All three are available now. Language choice and voice availability are separate settings, and switching language converts display text only — catalogue values, source records and clinical rules are unchanged. |
| "Contraindication means these must not be taken together" | **Risk levels are kept separate**: labelling contraindication, label recommends avoid, increased bleeding risk, consult first, duplicate ingredient. **An increased-risk warning is not a prohibition.** Warfarin plus aspirin must not be escalated into "banned for every patient". |
| "The system declines to answer when it finds a risk" | The opposite: **when a sourced rule matches, it shows the warning**, at its correct strength. What it never outputs is a **"safe" conclusion**. A missing match is a **coverage** status and can never be read back as pharmacological safety. |
| "The leaflet never mentions taking it with another medicine" | **Leaflets do contain interaction sections.** The real gap is that the people who need it cannot read it. Do not claim "never mentions". |
| Generalisations about other products | The specific capabilities of general assistants, drug tools and pharmacist services must be **verified product by product and service by service**. They must not be summarised as "none of them do this" or "only we do". |

**Also note:** the Raccoon Work award criterion is *Implementation & Completeness*, **one component of which** is validation of AI-generated outputs. It must not be restated as "AI validation is worth 30 percent".

---

## Status — stated precisely

| Item | State |
|---|---|
| Public site | **Live and public** |
| Mobile offline upgrade | Published; passed 16 engineering checks. **Real-device phone testing still pending.** |
| Engineering test suite | Passing — **software verification only**. Not clinical validation, not real-user satisfaction, not award-level validation. |
| Professional / clinical review | **The 14 rules were clinician-reviewed on 2026-10-03 and the reviewer agrees with each one** (see [`docs/rules/review.csv`](docs/rules/review.csv)). Education profiles, lexicon and patient wording remain pending review. |
| Observation with real older adults | **Not completed.** |
| Competition submission form | **Not yet submitted.** Files being ready is not the same as submitted. |

Every result the program produces carries two standing flags: `clinicalSafety: not_assessed` and `coverageComplete: false`. **There is no branch that issues a safe or green-light conclusion.**

> This is a research and demonstration prototype. All 14 rules were clinician-reviewed on 2026-10-03, each with a named reviewer and date; that review covers wording, sourcing and scope, not a validated clinical risk model. A complete product catalogue is not the same as complete clinical knowledge, and **a missing match never means a medicine is safe.** It will not generate a personal dosage from a box, and it will not tell anyone to stop a prescribed medicine.

---

## What is deployed

- **Public mobile entry point:** [MedSafe](https://med-safe.pages.dev)
- **All data and rules:** [visual inventory](app/data-report.html) | [machine-readable inventory](data/data_inventory.json) | [data notes](docs/data-inventory.md)
- **How decisions are made:** [decision logic and evidence boundaries](docs/decision-logic.md) | [the 14 rules](docs/rules/README.md)
- **Pitch deck:** [14-page web deck](pitch-ppt/index.html) — open it in a browser and press `P` for presenter mode. **This is the submission deck.**
- **Earlier material (superseded, kept for history):** [8-slide PPTX and PDF](deck/) and the [3-minute recording in the rehearsal release](https://github.com/yc-eagle/med-safe/releases/tag/rehearsal-20261003). The three-minute recording is not a submission artifact: its narration predates the recorded clinical review, so it is no longer shown or linked as current evidence.
- **For teammates trying it:** [five-minute feedback steps](docs/tryout.md) | [detailed walkthrough](docs/try-it.md)
- **Submission tracking:** [submission checklist](docs/submission.md)

---

## Running it

### Phone or desktop, in a browser

Open the public entry point; no GitHub account needed. Search by full HK registration number or product name, confirm the box, choose the actual route of administration, add a second or further medicine, and read the pair-by-pair results with their sources. A photograph only helps find candidates; **it does not confirm identity for the user**. A single medicine can be looked up on its own, without going through the pairwise rules.

The public site has also passed anonymous Chromium testing of all offline downloads, an offline reload, and catalogue search, with 9 additional canonical-URL redirect regression checks. Physical phone testing remains pending.

The public URL has been verified by an **anonymous Chromium session** doing a full offline download, an offline reopen, and a drug lookup while offline; **9 additional site-redirect regression checks** were added at the same time. The mobile offline upgrade passed 16 core engineering checks (53 cached resources, about 52.7 MiB, covering offline reopen, lookup, rules, OCR and disabling speech when offline). **Official release status is determined by the offline download entry point on the page. Testing on a physical phone has not been completed.** Browser speech may be processed by the browser vendor's servers; this is disclosed and consent is requested each time. **Web Cantonese recognition is not fully offline and must not be described as such.** Manual input remains available offline. A local voice is used only when the device has one.

### Desktop, offline, with no model

1. On GitHub, choose **Code -> Download ZIP** and extract it.
2. Open `app/index.html`. The downloaded catalogue, materials, rule checks and question card work locally.
3. For full web features such as browser OCR, run:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory app
```

Then open `http://127.0.0.1:8080`. Recognition resources ship with the package and the original image is processed by the browser; the first load of large resources can be slow. Camera permission depends on the browser and on a secure context. **The `file://` fallback does not promise camera or OCR.** External source links do not resolve offline; local summaries, dates and sections still do.

### Apple Silicon Mac: local OCR and Cantonese recognition

Install Python 3, then double-click `启动演示.command` or run `python3 server.py`, and open `http://127.0.0.1:8765`. The server listens on the local machine only; **it is not an address for teammates' phones to connect to**. If compiled recognition components are missing, the program tries to compile `native/ocr.swift` with an installed `swiftc`; without developer tools, manual lookup still works.

For local Cantonese speech input, run once with a connection:

```sh
python3 tools/install_voice.py
python3 server.py
```

The installer supports Apple Silicon macOS only. It creates a separate `.voice-runtime`, pins dependencies, and downloads a fixed Qwen3-ASR model (about 0.7 GB). **The first installation is not an offline operation**; once the environment and model are present it runs without a connection. There is no cloud API key. This MLX Cantonese model is **not** shipped for Windows or phones. Full steps: [offline and resources](docs/offline.md).

---

## How far the data actually goes

Catalogue snapshot date **2026-09-25**; inventory check date **2026-10-03**.

| Layer | Actual scope | What cannot be inferred from it |
|---|---:|---|
| HK registered products | 14,269 products, 14,269 unique registration numbers | Not every medicine in use in Hong Kong, and not complete approved labelling |
| Raw ingredient records | 23,835 records, 2,081 distinct ingredient strings | A string is not a standardised active entity |
| Prepared ingredient aliases | 1,431 products with at least one mappable ingredient; 674 with all ingredients mappable | Complete mapping does not mean complete interaction coverage |
| Ingredient education material | 14 ingredients, 13 source records | Not individual dosage, and not all adverse reactions |
| Rules | 14 sourced rules, **all clinician-reviewed on 2026-10-03** | Not a comprehensive interaction database |
| Demonstration formulations | 13, including combination products | Not every catalogue entry verified against physical packaging |
| Lexicon | 22 entries | No guaranteed accuracy for spoken or noisy drug-name recognition |
| Multi-medicine check | Up to 12 products, 66 pair records | Does not assess higher-order interactions or cumulative dose |

Full detail is in [`data/data_inventory.json`](data/data_inventory.json): the raw catalogue, cleaned JSON/CSV/SQLite, rules, sources, dates, missing fields and unused sources are all inspectable.

**No claim of "the most complete".** Roughly 101.8 million product pairs exist in the catalogue; 14 rules cannot comprehensively cover them.

---

## How a decision is made

Core code: [`app/engine.js`](app/engine.js). Input is 2 to 12 distinct products with the user's confirmation state and the actual route of administration.

1. **Identity.** The full HK registration number must exist in the catalogue and be confirmed by the user item by item. OCR matches on number or name produce **candidates only**. A fuzzy brand cannot uniquely determine a formulation; if the user declines to confirm, the full check does not proceed.
2. **Ingredients.** All ingredients are expanded from the catalogue. After NFKC, whitespace and case normalisation, **only explicit aliases are matched** — no string containment and no language-model guessing of salt-form equivalence. Both raw and unmapped values are kept.
3. **Route.** The user selects oral, sublingual, topical and so on; an unconfirmed route is treated as a gap. Routes derived from demonstration formulation names are **sourced hints only**, not verified against physical packaging.
4. **Pairwise.** For *n* products, all *n(n−1)/2* pairs are enumerated, up to 66. Each pair lists the original catalogue ingredients, matched rules, potential rules, gaps and status together.
5. **Evidence.** A warning applies only when ingredients on both sides correspond to a rule **and** both routes fall inside the permitted scope. If ingredients match but the route is unconfirmed or outside scope, it is listed as a prompt to confirm, and must not be extrapolated.
6. **Strength.** Labelling contraindication, label recommends avoid, increased risk, consult first and duplicate ingredient are kept at **different levels**. **A risk warning is not a blanket prohibition.** For example, aspirin with clopidogrel may be a deliberate regimen; users are not advised to stop it themselves.
7. **Completeness.** Every pair gets a record; if no rule applies, it is marked as not covered. Even when one pair matches, the other gaps in a multi-medicine list do not disappear.

### What the output can mean

| Output | Meaning |
|---|---|
| `identity_confirmation_required` | At least one product has not been confirmed by the user |
| `incomplete_check` | Unrecognised product, missing route, or unmapped ingredient |
| `alerts_found` | At least one sourced rule matched within the selected scope |
| `no_rule_found` | The current rule library has no match — **this does not mean the combination is safe** |
| `route_review_required` | An ingredient prompt exists but the applicable route is not satisfied |
| `duplicate_input_requires_review` | The same product was added twice; check first whether it really is a duplicate |

`ingredientOverlaps` records only that catalogue ingredient text is identical. It must not be presented as the risk of an entire drug class. **Two products with different ingredients can still interact, and identical ingredients still require judgement against the actual dose and the prescription.**

### Outside the model's capability

Dosage, treatment duration, dosing intervals, higher-order interactions at three or more medicines, hepatic and renal adjustment, allergy matching, pregnancy, breastfeeding and paediatric regimens, comprehensive risk of multi-herb formulations, food interactions, and recall monitoring are **not** covered. These gaps cannot be closed by downloading more model weights; they need reliable data, defined scope, and professional validation.

### Validating AI output

[`app/verify.html`](app/verify.html) compares raw AI output against independently confirmed catalogue fields first, then checks rules separately. Alias normalisation, field conflicts and insufficient evidence are recorded separately. **A rule not being found does not mean the AI field is necessarily wrong; all fields being correct does not mean the medical judgement has been validated.** Raw output and the verification process are retained; failure cases are not manufactured and platform records are not fabricated.

---

## Usability and privacy

Traditional Chinese and English, a large-text mode, camera retake and file selection, correction after recognition, explicit gaps, a pharmacist question card, and a prompt when the user's own prescription conflicts with the packaging are all aimed at reducing misreading and error. Declining camera or microphone permission still allows typing. **A photograph or recording is never required.**

In the browser version, photographs are recognised on the device. In the Mac version, photographs and recordings go only to the local service on the same computer, and temporary files are deleted with the request. **Browser speech may send recordings to the browser vendor**, which is disclosed separately. See [what leaves the device](docs/data-handling.md).

**Engineering usability testing is not the same as research with real older adults; real-world observation has not been completed.**

---

## Layout

```text
app/                   browser product, recognition resources, AI field verification page
native/                macOS Vision and local speech worker processes
server.py              local machine only
data/                  current full inventory, ingredient material, patient wording, lexicon
data-pack/data/        registration catalogue, rules, aliases, SQLite, source metadata
data-pack/raw/         licensed open catalogue XML / XSD
docs/                  scenario, decision, data handling, verification and submission notes
docs/rules/review.csv  medical review table; the approval column cannot be filled automatically
tests/, qa/            engineering checks and results; these do not stand in for clinical validation
```

New code lives in `app/`, `native/` and `server.py` — **not** in the planned `src/`.

When rules change, update the source, applicable route, evidence level, date and the professional review table together, then run `python3 tools/build_data.py`. Current fact is determined by this README, `docs/`, `data/data_inventory.json` and the actual program. **Earlier handover material does not represent current completion status.**

Core rule tests: `node tests/engine.test.cjs`, `node tests/patient.test.cjs`, `node tests/validator.test.cjs`, `node tests/product-features.test.cjs`. Browser and local API tests need their respective environments; see [technical report](TECHNICAL_REPORT.md).

---

## Submission and evidence

The official deadline, verified by the team from the handbook, is **2026-10-04 13:00 HKT**. The team's own requirement is stricter, so **both** an online demonstration and a 3-minute recording are being prepared, rather than treating them as alternatives.

**Do not write "files ready" as "submitted".**

Lin MA provided Doubao and Raccoon share links; automated tooling could not retrieve the conversation bodies. They count only as links received, and **must not be treated as medical approval or as completed validation of AI output.** Record: [Raccoon log](docs/raccoon-usage-log.md).

---

## Team

**Group 51 — Bauhinia Spheal (紫荆海豹球)**

| Member | University | GitHub | Responsibility |
|---|---|---|---|
| **Yicheng JIANG** | Beijing Foreign Studies University | [@yc-eagle](https://github.com/yc-eagle) | Overall topic selection and concept (originator of the idea) / core work / project progress management / repository and workflow / pitch deck / presentation and pitching |
| **Shuoyang SUN** | Tsinghua University | [@lkwet](https://github.com/lkwet) | All desktop-web development / Live Demo |
| **Lin MA** | Tsinghua University · medical doctoral researcher | [@huaxiamalin113](https://github.com/huaxiamalin113) | Domain expertise, rule review, and Raccoon evidence |

The presentation keeps the team's structure: **read it clearly / find a sourced warning / admit what is not covered.** Do not present every risk as an absolute prohibition. The [competition discussion](docs/competitors.md) and the [pitch planning](deck/pitch-deck.md) are retained as material still to be verified; unevidenced generalisations or outdated feature descriptions must be corrected against the current implementation and sources before use on stage. The pitch planning document describes the earlier 8-slide structure; **the deck actually used is [`pitch-ppt/index.html`](pitch-ppt/index.html)**. The original conflicting documents are preserved in the [team planning archive](docs/team-planning/README.md).

---

## Credits and rights

Hong Kong government open catalogue data, clinical source links and open-source components are attributed separately in [CREDITS.md](CREDITS.md). Full clinical web and US labelling snapshots, competition redemption codes, the private handbook, real patient imagery and model weights are **not** uploaded to the public repository. **A public repository is not the same as a chosen open-source licence**; the licence for original code awaits the team's decision, and rights not otherwise granted are reserved. Third-party licences remain unchanged.
