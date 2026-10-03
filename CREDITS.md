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

### Candidate sources (under evaluation; move to the table above once confirmed)

| Name | Description | Note |
|---|---|---|
| **RxNav-in-a-Box** (U.S. NLM) | Downloadable, **locally installable** RxNav suite | Directly supports the offline requirement; evaluate first |
| **TwoSides** dataset | Academic drug-drug interaction dataset, public on GitHub | Fallback |
| **HODDI** dataset | High-order drug-drug interaction dataset (arXiv 2502.06274) | Fallback |
| **Hospital Authority Medication Safety Bulletin** | Public PDF | Used for **local evidence** |
| **Drug Office, Department of Health** consumer guidance | Public web pages | As above |

**DrugBank's full dataset requires an academic licence.** Do not assume it can be obtained on site.

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
