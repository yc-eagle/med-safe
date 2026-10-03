# 数据源与下载链接

核对日期：2026-10-03。下载日志与 SHA-256 见 `download_manifest.json`。链接状态指本次核对，不保证以后持续可访问。

| 数据源 | 链接 | 本次处理／适用性 |
|---|---|---|
| 香港注册药剂制品名录 | [官方目录页](https://data.gov.hk/en-data/dataset/hk-dh-dh_do-hk-dh-do-pharmaceutical-product) | [XML 下载](https://www.drugoffice.gov.hk/eps/psi/DrugList.xml) | [字段定义 XSD](https://www.drugoffice.gov.hk/eps/psi/DrugList.xsd) | 已下载。用作注册号、产品名、证书持有人、有效成分检索。源文件 lastUpdate=2026-09-25。 |
| 香港药物办公室：扑热息痛 | [官方原文](https://www.drugoffice.gov.hk/eps/do/en/consumer/news_informations/knowledge_on_medicines/paracetamol.html) | [繁体中文](https://drugoffice.gov.hk/eps/do/tc/consumer/news_informations/knowledge_on_medicines/paracetamol.html) | 英文页已保存。支持重复成分提醒、华法林服用者先咨询。 |
| 香港药物办公室：慎用壮阳产品 | [官方原文](https://www.drugoffice.gov.hk/eps/do/tc/consumer/virility.html) | 已保存。支持 PDE-5 抑制剂与硝酸药合用的低血压风险。 |
| 香港药物办公室：抗凝血及抗血小板药物 | [官方原文](https://www.drugoffice.gov.hk/eps/do/en/consumer/news_informations/dm_25.html) | 已保存。辅助背景，有草药与华法林提醒；未从本文自动生成中成药规则。 |
| DailyMed 华法林标签 | [阅读标签](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8c876dd3-d659-479e-994c-39454c7028cc) | [下载 XML](https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/8c876dd3-d659-479e-994c-39454c7028cc.xml) | 已下载。第 7.3 节表 3；源版本日期 2025-01-28。 |
| DailyMed 氯吡格雷标签 | [阅读标签](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=98a83879-4e53-41f5-83bc-681b342884dd) | [下载 XML](https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/98a83879-4e53-41f5-83bc-681b342884dd.xml) | 已下载。第 7.1 节 PPI；源版本日期 2023-03-29。 |
| DailyMed 克拉霉素标签 | [阅读标签](https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=d22bd12c-737b-4aab-e053-2995a90aff60) | [下载 XML](https://dailymed.nlm.nih.gov/dailymed/services/v2/spls/d22bd12c-737b-4aab-e053-2995a90aff60.xml) | 已下载。第 4.5 节；源版本日期 2025-01-20。 |
| RxNav | [停用相互作用的官方说明](https://www.lhncbc.nlm.nih.gov/RxNav/information/FAQs.html) | [盒装套件及许可要求](https://www.lhncbc.nlm.nih.gov/RxNav/applications/RxNav-in-a-Box.html) | FAQ 已保存。不要继续投入时间把它当 DDI 库装起来。 |
| DrugBank | [学术访问](https://go.drugbank.com/academic_research/) | [下载状态示例页](https://portal.drugbank.com/releases/5-1-3) | 未下载。需要许可，下载页本次显示学术数据下载暂时暂停。不要使用不明来源镜像绕过授权。 |
| TwoSides 研究数据 | [队友引用的仓库](https://github.com/jcsun-00/Twosides) | 已核对页面，未下载。该仓库是论文加工版本，不是完整临床警示库；未确认数据再分发许可。 |
| HODDI 研究数据 | [作者仓库](https://github.com/TIML-Group/HODDI) | [论文](https://arxiv.org/html/2502.06274v1) | 已核对页面，未下载全库。仓库含 MIT LICENSE；另有 DrugBank／UMLS 等上游数据来源，不能把仓库许可自动理解为所有上游内容均可任意使用。实际数据使用 Git LFS，网页上的百余字节 CSV 可能只是指针。 |
| FAERS 数据解释 | [FDA 官方解释](https://www.fda.gov/drugs/cder-conversations/understanding-cders-postmarket-safety-surveillance-programs-and-public-data) | 报告发生的关联不自动证明药物致因，不能直接据此判定临床安全或禁忌。 |
| Apple Vision OCR | [官方文字识别说明](https://developer.apple.com/documentation/vision/recognizing-text-in-images) | 本机已测试。适用于 Apple 平台，不能据此承诺 Android 或普通浏览器可直接运行。 |
| PaddleOCR | [官方项目](https://github.com/PaddlePaddle/PaddleOCR) | 备选跨平台路线，代码为 Apache-2.0；本轮未安装、未测试，不把文档宣称当成本机结果。 |

DailyMed 是美国标签来源。下载不等于内容获得新的医学审批；[DailyMed 自身说明](https://dailymed.nlm.nih.gov/dailymed/about-dailymed.cfm)也提示在用标签与最新 FDA 批准标签可能有差异。映射到香港产品前，需确认成分、途径和本地包装。这里保留了版本及章节，供医学同学核对。

本次检查的比赛资料包括两份队友 Markdown、官方手册、开幕式 PDF、演讲译稿、HKT 工作坊、分组表和小浣熊兑换指南。数据包不包含分组表中的他人个人资料。
