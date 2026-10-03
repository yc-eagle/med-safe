# Credits and Attribution

[English](CREDITS.md) | [中文](CREDITS.zh-CN.md)

> **Why this file exists:** the HacKU 2026 Code Rules state that open-source libraries and frameworks are permitted *"provided they are **properly credited**."*
> **Start it on day one.** Anything reconstructed afterwards will be incomplete.

---

## 1. Open-source libraries and frameworks

| Name | Purpose | Version | Licence | Used for |
|---|---|---|---|---|
| _TODO_ | | | | |

<!--
Example rows:
| Tesseract OCR | Offline text recognition | 5.x | Apache-2.0 | Reading medicine labels |
| Ollama | Local model inference | - | MIT | On-device inference |
| FastAPI | Backend framework | 0.1xx | MIT | API service |
-->

**Add a row every time a new library is introduced.** Pay attention to licence type in particular; copyleft licences carry obligations.

---

## 2. Datasets

| Name | Provider | Licence / terms | Purpose | Cleared for use |
|---|---|---|---|---|
| _TODO_ | | | | |

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

<!-- TODO (Ella): add the clinical guidelines, interaction sources and references you actually rely on. -->

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
