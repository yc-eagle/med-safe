# Full Inventory of Data, Sources and Gaps

[中文](data-inventory.md) | [English](data-inventory.en.md)

The machine-readable current facts are in [`data/data_inventory.json`](../data/data_inventory.json), and the detailed interface table is in [`app/data-report.html`](../app/data-report.html). Catalogue snapshot 2026-09-25, audit 2026-10-03.

## Data currently in use

| File | Purpose and boundary |
|---|---|
| `data-pack/raw/DrugList.xml` / `.xsd` | Original files of the Hong Kong government open registration catalogue; original attribution and snapshot date are retained |
| `data-pack/data/hk_products.json` / `.csv` | 14,269 products, registration numbers, ingredients, licence holders and other catalogue fields |
| `data-pack/data/hk_medication.sqlite` | Local query container for the same catalogue plus the current rules and ingredient material |
| `data-pack/data/ingredient_aliases.json` | Explicitly usable ingredient aliases; equivalence relationships that are not listed are not guessed |
| `data-pack/data/demo_products.json` | 13 demonstration formulations and route hints; not called confirmed without physical verification |
| `data-pack/data/demo_rules.json` | The current 14 sourced draft rules |
| `data-pack/data/rule_sources.json` | Links, sections, dates and hashes of the 5 main rule source documents |
| `data/medicine_profiles.json` | Brief educational material for 14 ingredients, 13 source records, 13 formulation material hints |
| `data/seed_lexicon.json` | 22 medicine name / intent / patient expression hints; not a medical judgement model |
| `data/patient_wording.json` | Controlled patient wording and Cantonese hints, pending listening review |
| `app/data.js` | Browser bundle generated from the current data above; contains no patient material |
| `app/vendor/` | Browser OCR engine and English / Traditional Chinese character data; licences and hashes are listed separately |

## Exact counts

| Metric | Value |
|---|---|
| `catalogue_products` | 14269 |
| `unique_registration_numbers` | 14269 |
| `product_ingredient_rows` | 23835 |
| `distinct_ingredient_strings` | 2081 |
| `products_with_prepared_ingredient` | 1431 |
| `products_with_all_ingredients_mapped` | 674 |
| `ingredient_profiles` | 14 |
| `education_sources` | 13 |
| `clinical_rule_drafts` | 14 |
| `clinical_rule_source_documents` | 5 |
| `illustrative_formulations` | 13 |
| `lexicon_entries` | 22 |
| `registered_products_missing_ingredients` | 0 |
| `clinically_approved_rules` | 0 |

The "licence holder" in the product catalogue is not the manufacturer; the strength text in a product name is not a per-unit dose that has been structurally verified. That all ingredients of 674 products are mappable only indicates vocabulary coverage, not medical rule coverage.

## Main rule sources

- [Hong Kong Department of Health, Drug Office: Precautions for using medicines containing paracetamol](https://www.drugoffice.gov.hk/eps/do/en/consumer/news_informations/knowledge_on_medicines/paracetamol.html); region HK; document date 2023-12; retrieval date 2026-10-03; SHA-256 `7e048f2f48d8b783440b553bae763de952c5e59f9327dded8c944741bb93231f`. The original snapshot path `evidence/hk_paracetamol.html` is an internal source index; the complete article / label is not distributed in the public repository.
- [Hong Kong Department of Health, Drug Office: Use virility products with caution](https://www.drugoffice.gov.hk/eps/do/tc/consumer/virility.html); region HK; document date not stated in the source; retrieval date 2026-10-03; SHA-256 `bc8fbac3cea56391ca170d8f55da225d2f325a75acde3a4900a63caa6f914060`. The original snapshot path `evidence/hk_sildenafil.html` is an internal source index; the complete article / label is not distributed in the public repository.
- [DailyMed: WARFARIN SODIUM, Bryant Ranch Prepack](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8c876dd3-d659-479e-994c-39454c7028cc); region US; document date 2025-01-28; retrieval date 2026-10-03; SHA-256 `ab535cfa7977d8d7749d219dca2aa21a148780b88a5312720fc9783029ef0c7c`. The original snapshot path `raw/warfarin_label.xml` is an internal source index; the complete article / label is not distributed in the public repository.
- [DailyMed: CLOPIDOGREL](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=98a83879-4e53-41f5-83bc-681b342884dd); region US; document date 2023-03-29; retrieval date 2026-10-03; SHA-256 `8b2ec478cce8b957610ecf4568c0b8e3b48bbe9fd72a0aae3045f28c8c3461d7`. The original snapshot path `raw/clopidogrel_label.xml` is an internal source index; the complete article / label is not distributed in the public repository.
- [DailyMed: CLARITHROMYCIN tablet](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d22bd12c-737b-4aab-e053-2995a90aff60); region US; document date 2025-01-20; retrieval date 2026-10-03; SHA-256 `7d449a2ae748c67cdee029c866bc14cc7e09b368b014fd7cb2550cfb91134a12`. The original snapshot path `raw/clarithromycin_label.xml` is an internal source index; the complete article / label is not distributed in the public repository.

## Ingredient education sources

- `paracetamol`: [ Hong Kong Drug Office: Paracetamol ](https://www.drugoffice.gov.hk/eps/do/en/consumer/news_informations/knowledge_on_medicines/paracetamol.html); HK; source date 2023-12; checked 2026-10-03.
- `nsaids`: [ Hong Kong Drug Office: Oral non-steroidal anti-inflammatory drugs ](https://www.drugoffice.gov.hk/eps/do/en/consumer/news_informations/dm_03.html); HK; source date 2025-08; checked 2026-10-03.
- `blood`: [ Hong Kong Drug Office: Anticoagulant and antiplatelet medicines ](https://www.drugoffice.gov.hk/eps/do/en/consumer/news_informations/dm_25.html); HK; source date not stated; checked 2026-10-03.
- `general`: [ Hong Kong Drug Office: General knowledge on using medicines ](https://www.drugoffice.gov.hk/eps/do/en/consumer/news_informations/knowledge_on_medicines/general_use_on_medicine.html); HK; source date 2024-08; checked 2026-10-03.
- `omeprazole`: [ MedlinePlus / ASHP: Omeprazole ](https://medlineplus.gov/druginfo/meds/a693050.html); US; source date not stated; checked 2026-10-03.
- `esomeprazole`: [ MedlinePlus / ASHP: Esomeprazole ](https://medlineplus.gov/druginfo/meds/a699054.html); US; source date not stated; checked 2026-10-03.
- `simvastatin`: [ MedlinePlus / ASHP: Simvastatin ](https://medlineplus.gov/druginfo/meds/a692030.html); US; source date 2026-02-15; checked 2026-10-03.
- `clarithromycin`: [ MedlinePlus / ASHP: Clarithromycin ](https://medlineplus.gov/druginfo/meds/a692005.html); US; source date 2026-05-15; checked 2026-10-03.
- `nitrates`: [ MedlinePlus / ASHP: Nitroglycerin Sublingual ](https://medlineplus.gov/druginfo/meds/a601086.html); US; source date not stated; checked 2026-10-03.
- `sildenafil`: [ Hong Kong Drug Office: Use virility products with caution ](https://www.drugoffice.gov.hk/eps/do/tc/consumer/virility.html); HK; source date not stated; checked 2026-10-03.
- `guaifenesin`: [ MedlinePlus / ASHP: Guaifenesin ](https://medlineplus.gov/druginfo/meds/a682494.html); US; source date not stated; checked 2026-10-03.
- `phenylephrine`: [ MedlinePlus / ASHP: Phenylephrine ](https://medlineplus.gov/druginfo/meds/a606008.html); US; source date not stated; checked 2026-10-03.
- `emergency`: [ Hong Kong Fire Services Department: Calling an ambulance ](https://www.hkfsd.gov.hk/eng/source/safety/uambu.htm); HK; source date not stated; checked 2026-10-03.

The number of source records is not the number of unique URLs; some sources are used for several items. Only short summaries and sources are published; complete ASHP articles are not distributed.

## Incomplete fields

- complete HK product label
- structured per-unit strengths
- dose
- frequency
- duration
- manufacturer
- batch
- expiry
- allergy contraindication assessment
- kidney/liver adjustment
- pregnancy/pediatric assessment
- complete interactions
- herbal medicine database
- recall monitoring

## Data / models not used for medical judgement

- DrugBank: not licensed/downloaded
- RxNav DDI: discontinued; not a DDI engine
- TwoSides/FAERS/HODDI: not clinical decision data here
- optional Qwen3-0.6B language-model experiment: not in decision path

## Updates and review

Before a new snapshot replaces the old one, record the download date, the official snapshot date and the SHA-256, and re-check the unique registration numbers and ingredient counts. Rule expansion must be sourced and scoped item by item; professional review is written into `docs/rules/review.csv`, and an AI share link must not be treated as approval. `data-pack/SHA256SUMS.txt` and the download manifest preserve source evidence; some excluded complete web pages still have hashes, so not every item is expected to exist in the public ZIP.
