# 当前 14 条规则及专业复核

所有规则为 AI 辅助资料整理与编码，专业批准数为 **0**。完整字段见 [`data/data_inventory.json`](../../data/data_inventory.json)，逐行填写 [`review.csv`](review.csv)。给药途径、制剂、出处和措辞必须一起审核。

| ID | 成分对 | 证据层级 | 允许途径 | 出处章节 |
|---|---|---|---|---|
| R01 | paracetamol + paracetamol | duplicate_ingredient | oral | [Precautions: final bullet](https://www.drugoffice.gov.hk/eps/do/en/consumer/news_informations/knowledge_on_medicines/paracetamol.html) |
| R02 | warfarin + ibuprofen | increased_bleeding_risk | oral | [7.3 Drugs that Increase Bleeding Risk, Table 3](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8c876dd3-d659-479e-994c-39454c7028cc) |
| R03 | warfarin + aspirin | increased_bleeding_risk | oral | [7.3 Drugs that Increase Bleeding Risk, Table 3](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8c876dd3-d659-479e-994c-39454c7028cc) |
| R04 | warfarin + naproxen | increased_bleeding_risk | oral | [7.3 Drugs that Increase Bleeding Risk, Table 3](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8c876dd3-d659-479e-994c-39454c7028cc) |
| R05 | warfarin + clopidogrel | increased_bleeding_risk | oral | [7.3 Drugs that Increase Bleeding Risk, Table 3](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8c876dd3-d659-479e-994c-39454c7028cc) |
| R06 | clopidogrel + omeprazole | label_recommends_avoid | oral | [7.1 CYP2C19 Inhibitors / Proton Pump Inhibitors](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=98a83879-4e53-41f5-83bc-681b342884dd) |
| R07 | clopidogrel + esomeprazole | label_recommends_avoid | oral | [7.1 CYP2C19 Inhibitors / Proton Pump Inhibitors](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=98a83879-4e53-41f5-83bc-681b342884dd) |
| R08 | simvastatin + clarithromycin | label_contraindication | oral | [4.5 Lomitapide, Lovastatin, and Simvastatin](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d22bd12c-737b-4aab-e053-2995a90aff60) |
| R09 | warfarin + paracetamol | consult_before_use | oral | [Precautions: anticoagulants](https://www.drugoffice.gov.hk/eps/do/en/consumer/news_informations/knowledge_on_medicines/paracetamol.html) |
| R10 | sildenafil + glyceryl trinitrate | nitrate_warning | oral, sublingual | [藥物治療：PDE-5 抑制劑與硝酸藥](https://www.drugoffice.gov.hk/eps/do/tc/consumer/virility.html) |
| R11 | clopidogrel + ibuprofen | increased_bleeding_risk | oral | [7.2 NSAIDs; ingredient class supported by Hong Kong Drug Office oral NSAID guide](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=98a83879-4e53-41f5-83bc-681b342884dd) |
| R12 | clopidogrel + naproxen | increased_bleeding_risk | oral | [7.2 NSAIDs; ingredient class supported by Hong Kong Drug Office oral NSAID guide](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=98a83879-4e53-41f5-83bc-681b342884dd) |
| R13 | clarithromycin + warfarin | increased_bleeding_risk | oral | [5.4 Drug interactions: Oral anticoagulants; 7 Table 8 Warfarin](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d22bd12c-737b-4aab-e053-2995a90aff60) |
| R14 | clopidogrel + aspirin | increased_bleeding_risk | oral | [2.1 ACS; 5.2 bleeding; 5.3 discontinuation; 5.4 recent TIA/stroke; 6.1 CURE](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=98a83879-4e53-41f5-83bc-681b342884dd) |

R11、R12 由所引标签 NSAID 类别警示结合香港口服 NSAID 成分分类进行编码，字段 `derived_from_class=true`；不能隐去推导过程。R14 保留医生可能有意安排双重抗血小板治疗这一事实，避免把风险提示变成自行停药建议。

美国来源不能直接等同香港产品批准标签。规则匹配所需的成分／途径条件可减少误用，但不构成完整临床适用性评价。

## 与团队三层展示框架的对应

“禁忌／慎用／无资料”可作为展示摘要，但代码保留更细的来源强度：说明书禁忌、建议避免、风险增加、先咨询、重复成分。华法林与阿司匹林的风险增加不能自动升级成所有患者都禁用。没有资料属于覆盖状态，不能反推药理安全。

每行必须保留普通人能理解的说明、行动建议、来源章节及日期、途径限制和复核栏。没有专业复核时不填 `verified_by`；旧规划中的示例组合不自动成为已批准规则。[原始规则规划存档](../team-planning/README.md)。
