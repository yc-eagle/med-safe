# 数据、来源与缺口全清单

机器可读的当前事实在 [`data/data_inventory.json`](../data/data_inventory.json)，界面详表在 [`app/data-report.html`](../app/data-report.html)。目录快照 2026-09-25，审计 2026-10-03。

## 当前使用的数据

| 文件 | 用途与边界 |
|---|---|
| `data-pack/raw/DrugList.xml` / `.xsd` | 香港政府开放注册目录原文件；保留原始归属与快照日期 |
| `data-pack/data/hk_products.json` / `.csv` | 14,269 产品、注册号、成分及持证商等目录字段 |
| `data-pack/data/hk_medication.sqlite` | 同目录及当前规则、成分资料的本地查询容器 |
| `data-pack/data/ingredient_aliases.json` | 明示可用的成分别名；不猜未列明等价关系 |
| `data-pack/data/demo_products.json` | 13 款演示制剂与途径提示；未经实物核对不称确认 |
| `data-pack/data/demo_rules.json` | 当前 14 条有出处的规则草案 |
| `data-pack/data/rule_sources.json` | 5 份规则主来源的链接、章节、日期、哈希 |
| `data/medicine_profiles.json` | 14 个成分简要教育资料、13 条来源记录、13 个制剂资料提示 |
| `data/seed_lexicon.json` | 22 条药名／意图／患者表达提示；不是医学判断模型 |
| `data/patient_wording.json` | 受控患者表述及粤语提示，待听审 |
| `app/data.js` | 上述当前数据生成的浏览器包；不含患者资料 |
| `app/vendor/` | 浏览器 OCR 引擎和英／繁体中文字库；许可与哈希另列 |

## 精确计数

| 指标 | 数值 |
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

产品目录中的“持证商”不是制造商；产品名称中的强度文字不是已经结构化验证的每单位剂量。674 产品全部成分可映射，仅表示词表覆盖，不表示医学规则覆盖。

## 规则主来源

- [香港衞生署藥物辦公室：使用含撲熱息痛藥物的注意事項](https://www.drugoffice.gov.hk/eps/do/en/consumer/news_informations/knowledge_on_medicines/paracetamol.html)；地区 HK；文件日期 2023-12；读取日期 2026-10-03；SHA-256 `7e048f2f48d8b783440b553bae763de952c5e59f9327dded8c944741bb93231f`。原快照路径 `evidence/hk_paracetamol.html` 是内部来源索引，完整文章／标签不在公开库内分发。
- [香港衞生署藥物辦公室：慎用壯陽產品](https://www.drugoffice.gov.hk/eps/do/tc/consumer/virility.html)；地区 HK；文件日期 来源未标明；读取日期 2026-10-03；SHA-256 `bc8fbac3cea56391ca170d8f55da225d2f325a75acde3a4900a63caa6f914060`。原快照路径 `evidence/hk_sildenafil.html` 是内部来源索引，完整文章／标签不在公开库内分发。
- [DailyMed: WARFARIN SODIUM, Bryant Ranch Prepack](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8c876dd3-d659-479e-994c-39454c7028cc)；地区 US；文件日期 2025-01-28；读取日期 2026-10-03；SHA-256 `ab535cfa7977d8d7749d219dca2aa21a148780b88a5312720fc9783029ef0c7c`。原快照路径 `raw/warfarin_label.xml` 是内部来源索引，完整文章／标签不在公开库内分发。
- [DailyMed: CLOPIDOGREL](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=98a83879-4e53-41f5-83bc-681b342884dd)；地区 US；文件日期 2023-03-29；读取日期 2026-10-03；SHA-256 `8b2ec478cce8b957610ecf4568c0b8e3b48bbe9fd72a0aae3045f28c8c3461d7`。原快照路径 `raw/clopidogrel_label.xml` 是内部来源索引，完整文章／标签不在公开库内分发。
- [DailyMed: CLARITHROMYCIN tablet](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d22bd12c-737b-4aab-e053-2995a90aff60)；地区 US；文件日期 2025-01-20；读取日期 2026-10-03；SHA-256 `7d449a2ae748c67cdee029c866bc14cc7e09b368b014fd7cb2550cfb91134a12`。原快照路径 `raw/clarithromycin_label.xml` 是内部来源索引，完整文章／标签不在公开库内分发。

## 成分教育来源

- `paracetamol`：[ 香港藥物辦公室：撲熱息痛 ](https://www.drugoffice.gov.hk/eps/do/en/consumer/news_informations/knowledge_on_medicines/paracetamol.html)；HK；来源日期 2023-12；核查 2026-10-03。
- `nsaids`：[ 香港藥物辦公室：口服非類固醇消炎藥 ](https://www.drugoffice.gov.hk/eps/do/en/consumer/news_informations/dm_03.html)；HK；来源日期 2025-08；核查 2026-10-03。
- `blood`：[ 香港藥物辦公室：抗凝血及抗血小板藥 ](https://www.drugoffice.gov.hk/eps/do/en/consumer/news_informations/dm_25.html)；HK；来源日期 未标明；核查 2026-10-03。
- `general`：[ 香港藥物辦公室：一般用藥知識 ](https://www.drugoffice.gov.hk/eps/do/en/consumer/news_informations/knowledge_on_medicines/general_use_on_medicine.html)；HK；来源日期 2024-08；核查 2026-10-03。
- `omeprazole`：[ MedlinePlus / ASHP：Omeprazole ](https://medlineplus.gov/druginfo/meds/a693050.html)；US；来源日期 未标明；核查 2026-10-03。
- `esomeprazole`：[ MedlinePlus / ASHP：Esomeprazole ](https://medlineplus.gov/druginfo/meds/a699054.html)；US；来源日期 未标明；核查 2026-10-03。
- `simvastatin`：[ MedlinePlus / ASHP：Simvastatin ](https://medlineplus.gov/druginfo/meds/a692030.html)；US；来源日期 2026-02-15；核查 2026-10-03。
- `clarithromycin`：[ MedlinePlus / ASHP：Clarithromycin ](https://medlineplus.gov/druginfo/meds/a692005.html)；US；来源日期 2026-05-15；核查 2026-10-03。
- `nitrates`：[ MedlinePlus / ASHP：Nitroglycerin Sublingual ](https://medlineplus.gov/druginfo/meds/a601086.html)；US；来源日期 未标明；核查 2026-10-03。
- `sildenafil`：[ 香港藥物辦公室：慎用壯陽產品 ](https://www.drugoffice.gov.hk/eps/do/tc/consumer/virility.html)；HK；来源日期 未标明；核查 2026-10-03。
- `guaifenesin`：[ MedlinePlus / ASHP：Guaifenesin ](https://medlineplus.gov/druginfo/meds/a682494.html)；US；来源日期 未标明；核查 2026-10-03。
- `phenylephrine`：[ MedlinePlus / ASHP：Phenylephrine ](https://medlineplus.gov/druginfo/meds/a606008.html)；US；来源日期 未标明；核查 2026-10-03。
- `emergency`：[ 香港消防處：召喚救護車 ](https://www.hkfsd.gov.hk/eng/source/safety/uambu.htm)；HK；来源日期 未标明；核查 2026-10-03。

来源记录数不等于不重复 URL 数；部分来源用于多项资料。只发布短摘要及来源，不分发完整 ASHP 文章。

## 未完成字段

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

## 没有用于医学判断的数据／模型

- DrugBank: not licensed/downloaded
- RxNav DDI: discontinued; not a DDI engine
- TwoSides/FAERS/HODDI: not clinical decision data here
- optional Qwen3-0.6B language-model experiment: not in decision path

## 更新与复核

新快照替换前记录下载日期、官方快照日期与 SHA-256，重新核对唯一注册号及成分数。规则扩充必须逐条有来源和适用范围；专业审核写入 `docs/rules/review.csv`，不能把 AI 分享链接当批准。`data-pack/SHA256SUMS.txt` 与下载清单保存来源证据，部分被排除的完整网页仍有哈希，因此不是公开 ZIP 中每一项都应该存在。
