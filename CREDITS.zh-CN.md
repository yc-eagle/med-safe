# 来源与署名

[English](CREDITS.md) | [中文](CREDITS.zh-CN.md)

> **为什么要有这个文件**：HacKU 2026 的 Code Rules 规定，开源库与框架可以使用，前提是 *"provided they are **properly credited**"*（必须正确署名）。
> **从第一天就开始记。** 事后补写一定不完整。

---

## 1. 开源库与框架

以下是实际随包交付的组件，取自 `app/vendor/` 与 `tools/asr-requirements.lock.txt`。许可证文本随这些资源一起放在本仓库中。

| 名称 | 用途 | 许可证 | 用在哪 |
|---|---|---|---|
| **Tesseract.js** | 浏览器端 OCR 引擎 | Apache-2.0 | `app/vendor/tesseract.min.js`、`worker.min.js` |
| **tesseract.js-core** | 编译为 WebAssembly 的 Tesseract | Apache-2.0 | `app/vendor/tesseract-core*.wasm` |
| **tessdata_fast** — `eng`、`chi_tra` | 英文与繁体中文的训练语言数据 | Apache-2.0 | `app/vendor/eng.traineddata`、`chi_tra.traineddata` |
| **regenerator-runtime** | 随 Tesseract.js 一起打包的运行时依赖 | MIT | `app/vendor/tesseract.min.js.LICENSE.txt` |
| **Apple Vision framework** | macOS 上的端侧 OCR | Apple 系统框架，按原样使用 | `native/ocr.swift` |
| **MLX** | 可选粤语语音模型的本地推理运行时 | MIT | `tools/asr-requirements.lock.txt` |
| **Qwen3-ASR**（`mlx-community/Qwen3-ASR-0.6B-4bit`） | 粤语语音识别，可选的 Apple Silicon 路径 | 模型作者公布的模型许可证 | 由 `tools/install_voice.py` 下载，revision `313d850181767edf09f00a9c289becca70e58cd0`，约 0.7 GB。**权重不在本仓库中再分发** |

**为什么要把许可证文本文件提交进仓库：** Apache-2.0 与 MIT 的条款要求声明随分发一起传递。它们在 `app/vendor/*LICENSE*.txt`。

**每引入一个新组件就补一行。** 尤其是 copyleft 类许可证带有义务，使用前必须核查。

### 刻意不使用的组件

记录在此，以免这个结论丢失、时间被花第二遍：

| 名称 | 状态 |
|---|---|
| **RxNav / RxNav-in-a-Box**（美国 NLM） | **未用作相互作用数据库。** 其官方 FAQ 说明相互作用 API 已退役 |
| **DrugBank** | **未使用。** 需要学术授权；下载页显示学术数据下载暂时暂停 |
| **Ollama、FastAPI 及同类** | **未使用。** 早期规划笔记曾把它们列为示例；交付的原型并不依赖它们 |

---

## 2. 实际使用的数据集

| 名称 | 提供方 | 许可证 / 条款 | 用途 | 是否在使用 |
|---|---|---|---|---|
| **香港注册药剂制品目录及结构定义** | 香港特区政府卫生署药物办公室，经 DATA.GOV.HK 提供 | DATA.GOV.HK 条款与细则。署名与来源日期保留；不暗示政府认可 | 注册编号、产品名称、持证人、有效成分 | **是。** 快照 2026-09-25 |
| **药物办公室消费者指引**（对乙酰氨基酚；PDE-5 抑制剂与硝酸酯；口服 NSAID 指引） | 卫生署药物办公室 | 公开官方网页，已引用 | 成分级证据与本地分类 | **是** |
| **DailyMed 标签**（华法林、氯吡格雷、克拉霉素） | 美国国家医学图书馆 | 公开标签记录，按章节引用 | 规则 R02-R14 的成分级引用证据 | **是。** **不等同于香港产品批准标签** |
| **MedlinePlus / ASHP** 条目记录 | 美国国家医学图书馆 / ASHP | 公开记录，已引用 | 成分科普材料（14 个成分档案，13 条来源记录） | **是** |
| **Qwen3-ASR**（`mlx-community/Qwen3-ASR-0.6B-4bit`） | 模型作者，经 `mlx-community` 发布 | 作者公布的模型许可证 | 可选的本地粤语语音识别 | **是**，由安装脚本按锁定 revision 下载。**权重不在此处再分发** |

**关于公开仓库范围的说明：** 结构化规则与简短的事实性摘要逐条引用这些来源，并保留来源链接、文档日期、章节与 SHA-256 记录。**完整下载的临床 HTML 与美国的标签 XML 不进入公开仓库。** 来源权利不转让给 MedSafe。见 [`data-pack/CREDITS.md`](data-pack/CREDITS.md)。

### 候选数据源

| 名称 | 说明 | 状态 |
|---|---|---|
| **香港注册药剂制品目录**（卫生署药物办公室） | 官方目录与结构定义，快照 2026-09-25 | **已在使用。** 提供注册编号、产品名称、持证人及有效成分 |
| **药物办公室消费者指引**（对乙酰氨基酚；PDE-5 抑制剂与硝酸酯；口服 NSAID 指引） | 公开官方页面 | **已在使用。** 成分级证据与本地分类 |
| **DailyMed 标签**（华法林、氯吡格雷、克拉霉素） | 含章节编号的美国标签全文 | **已在使用**，作为成分级引用证据。**不等同于香港产品批准标签** |
| **HODDI** | 高阶药物相互作用研究数据集（arXiv 2502.06274） | 已查阅页面，**未下载完整数据集**。仓库为 MIT 许可，但上游来源包含 DrugBank 与 UMLS，因此仓库许可证并不自动覆盖全部上游内容 |
| **RxNav / RxNav-in-a-Box**（美国 NLM） | RxNav 应用套件 | **不要再投入精力把它当作 DDI 数据库。** 其官方 FAQ 说明相互作用应用程序接口已退役。保留在此，以免这个结论丢失、时间被花第二遍 |
| **DrugBank** | 综合药物与相互作用数据库 | **未下载。** 需要学术授权；下载页显示学术数据下载暂时暂停。**不要用来源不明的镜像绕过授权** |

**目前还没有任何数据库提供已授权的、香港本地化的相互作用知识库。** 这正是当前 14 条规则依据所引来源手工编码的原因，也是覆盖边界在所有地方都被明确写出的原因。

---

## 3. 参考资料

| 名称 | 来源 | 用途 |
|---|---|---|
| *The Blind Spot of Polypharmacy: Bridging Western Medicine and Traditional Chinese Medicine* | 香港大学李嘉诚医学院医学伦理与人文单元，2026 年 8 月 | 背景：本地多重用药与中西药并用的盲区 |
| "Medication management services: community pharmacists safeguarding medication safety" | 香港大学医学院专栏 | 背景：社区药剂师服务的覆盖范围与仍然存在的缺口 |
| 医健通通讯第 24 期 "Message from the Pharmacist" | 香港特区政府医健通 | 证据：遥距药剂师咨询确实存在，以及它的前提条件（打电话、服务时间、授权） |

<!-- TODO（Ella）：补上你实际依赖的临床指南、相互作用来源与参考文献。 -->

---

## 4. 开发工具

| 工具 | 用途 | 性质 |
|---|---|---|
| **商汤小浣熊（SenseTime Raccoon Work）** | 资料检索、数据分析、文档撰写、编码辅助 | **开发工具，非运行时依赖** |

### 关于 Raccoon Work 的声明

我们在开发过程中**仅将 Raccoon Work 用作辅助工具**。

**它不是本产品的运行时依赖。** 本产品被设计为必须在**离线**条件下工作，因此**交付的原型中没有任何一处调用 Raccoon Work**。

它的输出被**按需要验证的输入对待，而不是可直接采信的结果**。使用记录、验证方式，以及我们**核对后拒绝采纳**的输出，见 [`raccoon-shots/`](raccoon-shots/) 与 [`docs/raccoon-usage-log.md`](docs/raccoon-usage-log.md)。

> 这个立场与产品自身的立场一致：**一个用药安全工具，应该在无法核实时说「我查不到」，而不是猜。**

---

## 5. 其他素材

| 素材 | 来源 / 授权 | 用途 |
|---|---|---|
| `assets/interviews/` 下的访谈素材 | 知情同意，记录在该目录 | 问题验证 |

<!-- TODO：记录每一位受访者的同意情况，以及素材是否可用于公开演示。 -->
