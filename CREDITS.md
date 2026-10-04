# Credits and Attribution

[English](CREDITS.md) | [中文](CREDITS.zh-CN.md)

> **Why this file exists:** the HacKU 2026 Code Rules state that open-source libraries and frameworks are permitted *"provided they are **properly credited**."*
> **Start it on day one.** Anything reconstructed afterwards will be incomplete.

---

## 1. Open-source libraries and frameworks

These are the components actually shipped, taken from `app/vendor/` and `tools/asr-requirements.lock.txt`. Licence texts are included in the repository alongside the assets.

| Name | Purpose | Licence | Where it is used |
|---|---|---|---|
| **Tesseract.js** | OCR engine for the browser | Apache-2.0 | `app/vendor/tesseract.min.js`, `worker.min.js` |
| **tesseract.js-core** | Tesseract compiled to WebAssembly | Apache-2.0 | `app/vendor/tesseract-core*.wasm` |
| **tessdata_fast** — `eng`, `chi_tra` | Trained language data for English and Traditional Chinese | Apache-2.0 | `app/vendor/eng.traineddata`, `chi_tra.traineddata` |
| **regenerator-runtime** | Runtime dependency bundled with Tesseract.js | MIT | `app/vendor/tesseract.min.js.LICENSE.txt` |
| **Apple Vision framework** | On-device OCR on macOS | Apple system framework, used as provided | `native/ocr.swift` |
| **MLX** | Local inference runtime for the optional Cantonese speech model | MIT | `tools/asr-requirements.lock.txt` |
| **Qwen3-ASR** (`mlx-community/Qwen3-ASR-0.6B-4bit`) | Cantonese speech recognition, optional Apple Silicon path | Model licence as published by the model authors | Downloaded by `tools/install_voice.py`, revision `313d850181767edf09f00a9c289becca70e58cd0`, about 0.7 GB. **Weights are not redistributed in this repository** |

**Why the licence text files are committed:** the Apache-2.0 and MIT terms require the notice to travel with the distribution. They are in `app/vendor/*LICENSE*.txt`.

**Add a row every time a new component is introduced.** Copyleft licences in particular carry obligations that must be checked before use.

### Components deliberately NOT used

For the record, so the time is not spent twice:

| Name | Status |
|---|---|
| **RxNav / RxNav-in-a-Box** (U.S. NLM) | **Not used as an interaction database.** Its official FAQ states the interaction API has been retired |
| **DrugBank** | **Not used.** Requires an academic licence; the download page showed academic downloads temporarily paused |
| **Ollama, FastAPI and similar** | **Not used.** Earlier planning notes listed them as examples; the shipped prototype does not depend on them |

---

## 2. Datasets actually used

| Name | Provider | Licence / terms | Purpose | In use |
|---|---|---|---|---|
| **Hong Kong registered pharmaceutical products catalogue and schema** | Department of Health, Drug Office, HKSAR Government, via DATA.GOV.HK | DATA.GOV.HK terms and conditions. Attribution and source dates retained; government endorsement is not implied | Registration numbers, product names, certificate holders, active ingredients | **Yes.** Snapshot 2026-09-25 |
| **Drug Office consumer guidance** (paracetamol; PDE-5 inhibitors and nitrates; oral NSAID guide) | Department of Health, Drug Office | Public official web pages, cited | Ingredient-level evidence and local classification | **Yes** |
| **DailyMed labelling** (warfarin, clopidogrel, clarithromycin) | U.S. National Library of Medicine | Public labelling records, cited by section | Ingredient-level citation evidence for rules R02-R14 | **Yes.** **Not equivalent to Hong Kong product approval labelling** |
| **MedlinePlus / ASHP** item records | U.S. National Library of Medicine / ASHP | Public records, cited | Ingredient education material (14 profiles, 13 source records) | **Yes** |
| **Qwen3-ASR** (`mlx-community/Qwen3-ASR-0.6B-4bit`) | Model authors, via `mlx-community` | Model licence as published by the authors | Optional local Cantonese speech recognition | **Yes**, downloaded by the installer at a pinned revision. **Weights are not redistributed here** |

**Note on public repository scope:** structured rules and short factual summaries cite these sources item by item, and source links, document dates, sections and SHA-256 records are retained. **Full downloaded clinical HTML and U.S. label XML are excluded from the public repository.** Source rights are not transferred to MedSafe. See [`data-pack/CREDITS.md`](data-pack/CREDITS.md).

### Candidate sources

| Name | Description | Status |
|---|---|---|
| **Hong Kong registered pharmaceutical products catalogue** (Department of Health, Drug Office) | Official catalogue and schema, snapshot 2026-09-25 | **In use.** Supplies registration numbers, product names, certificate holders and active ingredients |
| **Drug Office consumer guidance** (paracetamol; PDE-5 inhibitors and nitrates; oral NSAID guide) | Public official pages | **In use.** Ingredient-level evidence and local classification |
| **DailyMed labelling** (warfarin, clopidogrel, clarithromycin) | US labelling full text with section numbers | **In use** as ingredient-level citation evidence. **Not equivalent to Hong Kong product approval labelling** |
| **HODDI** | Research dataset of higher-order drug-drug interactions (arXiv 2502.06274) | Pages reviewed, **full dataset not downloaded**. Repository is MIT-licensed, but upstream sources include DrugBank and UMLS, so the repository licence does not automatically cover all upstream content |
| **RxNav / RxNav-in-a-Box** (U.S. NLM) | RxNav application suite | **Do not invest further effort in treating this as a DDI database.** Its official FAQ states that the interaction application programming interface has been retired. Kept here so the finding is not lost and the time is not spent twice |
| **DrugBank** | Comprehensive drug and interaction database | **Not downloaded.** Requires an academic licence; the download page showed academic data downloads temporarily paused. **Do not work around licensing with a mirror of unknown origin** |

**No database yet supplies a licensed, Hong Kong-specific interaction knowledge base.** That is exactly why the current 14 rules are hand-coded from cited sources and why the coverage boundary is stated explicitly everywhere.

---

## 3. References

| Name | Source | Used for |
|---|---|---|
| *The Blind Spot of Polypharmacy: Bridging Western Medicine and Traditional Chinese Medicine* | Medical Ethics and Humanities Unit, LKS Faculty of Medicine, HKU, August 2026 | Background: local polypharmacy and the Western/Chinese medicine blind spot |
| "Medication management services: community pharmacists safeguarding medication safety" | HKU Faculty of Medicine column | Background: the reach of community pharmacist services and the gap that remains |
| eHealth News issue 24, "Message from the Pharmacist" | eHealth, HKSAR Government | Evidence that remote pharmacist consultation exists, and its preconditions (call, service hours, authorisation) |

<!-- TODO (Lin MA): add the clinical guidelines, interaction sources and references you actually rely on. -->

---

## 4. Development tools

| Tool | Purpose | Nature |
|---|---|---|
| **SenseTime Raccoon Work** | Research lookup, data analysis, documentation, coding assistance | **Development tool, not a runtime dependency** |

### Statement on Raccoon Work

We used Raccoon Work **only as an assisting tool during development**.

**It is not a runtime dependency of this product.** The product is designed to work **offline**, and therefore **nothing in the delivered prototype calls Raccoon Work**.

Its output was treated as **input to be verified, not as a conclusion to be trusted**. The record of its use, how we verified it, and the outputs we **checked and rejected** are in [`raccoon-shots/`](raccoon-shots/) and [`docs/raccoon-usage-log.md`](docs/raccoon-usage-log.md).

> This position is consistent with the product's own: **a medication safety tool should say "I cannot verify this" rather than guess.**

---

## 5. Other material

| Material | Source / permission | Used for |
|---|---|---|
| Interview material under `assets/interviews/` | Informed consent recorded in that directory | Problem validation |

<!-- TODO: record consent status for each interview subject and whether the material may be used publicly. -->

## Demonstration photograph

`app/sample-medicine.jpg` is the team-supplied real medicine-bottle photograph selected for the public OCR example on 4 October 2026. OCR runs on the image pixels; no medicine identity is prefilled. The older synthetic `sample-labels.png` is retained only as a regression-test fixture. Neither image demonstrates general OCR or clinical accuracy.
