# 用药判据

[English](README.md) | [中文](README.zh-CN.md)

> **这个目录是产品的决策核心。**
> **负责人：Ella。** 14 条规则全部是草稿。**经专业批准的规则数目前是零。** 逐条审阅表：[`review.csv`](review.csv)。

---

## 0. 更正：这些层级是展示用的摘要，不是代码

下面这三层是团队最初的计划。**已实现的引擎保留了一套更细的来源强度，把它们合并是一个事实错误，不得在台上重复。**

| 已实现的证据等级 | 含义 | 不得被呈现为 |
|---|---|---|
| `label_contraindication` | 标签禁忌该组合 | — |
| `label_recommends_avoid` | 标签建议避免 | 「禁用」 |
| `increased_bleeding_risk` 及其他风险升高等级 | 某种风险升高 | **「不能一起吃」** |
| `consult_before_use` | 先咨询 | 一条禁令 |
| `duplicate_ingredient` | 同一成分出现两次 | 一种相互作用 |

> **风险升高的警告不是禁令。** 华法林加阿司匹林是出血风险升高，不得被升级为「对所有病人都是禁忌」。阿司匹林加氯吡格雷可能是**医生刻意开具的方案**，因此产品不会建议停用。
>
> **没有匹配到规则是一种覆盖状态，绝不是药理结论。** 它永远不能被读回为安全。

当本文档与 [`../decision-logic.md`](../decision-logic.md) 或程序不一致时，**以实现为准。**

---

## 1. 为什么是三层

这三层是用来解释产品的**展示摘要**。它们对一张演示幻灯片有用；它们不是数据模型。

| 层级 | 含义 | 系统行为 | 呈现状态 |
|---|---|---|---|
| **L1 - 标签禁忌** | 标签禁忌该组合 | 明确警告，带来源，并请咨询医生 | 显示警告 |
| **L2 - 建议避免 / 风险升高 / 需先咨询** | 存在风险，但**不是绝对禁止** | 按正确强度标出风险，并请咨询医生 | 显示警告 |
| **L3 - 无数据** | 该组合**没有被**当前规则**覆盖** | 「我查不到这两种药的资料。请咨询医生。」 | 说明**未覆盖** |

**还有一种情况不属于以上任何一层**（它是输入质量问题，不是医学判断）：

| 情况 | 行为 |
|---|---|
| 照片模糊 / 药品识别不出 | 重拍、换一张图，或输入注册编号；**由人工确认** |

> **L3 不是「安全」。L3 是「未覆盖」。** 措辞绝不能让人把「查不到」读成「没问题」。这是整个产品里最容易被误读、也最危险的一点。
>
> **照片不能确认身份。** OCR 也不能。两者只产生候选，由用户逐项确认产品。

---

## 1b. 当前的 14 条规则

每条规则带一个成分对、一个证据等级、一个许可途径与一个来源章节。途径、制剂、来源与措辞必须一起审。

| ID | 成分对 | 证据等级 | 许可途径 |
|---|---|---|---|
| R01 | paracetamol + paracetamol | duplicate ingredient | oral |
| R02 | warfarin + ibuprofen | increased bleeding risk | oral |
| R03 | warfarin + aspirin | increased bleeding risk | oral |
| R04 | warfarin + naproxen | increased bleeding risk | oral |
| R05 | warfarin + clopidogrel | increased bleeding risk | oral |
| R06 | clopidogrel + omeprazole | label recommends avoid | oral |
| R07 | clopidogrel + esomeprazole | label recommends avoid | oral |
| R08 | simvastatin + clarithromycin | label contraindication | oral |
| R09 | warfarin + paracetamol | consult before use | oral |
| R10 | sildenafil + glyceryl trinitrate | nitrate warning | oral, sublingual |
| R11 | clopidogrel + ibuprofen | increased bleeding risk | oral |
| R12 | clopidogrel + naproxen | increased bleeding risk | oral |
| R13 | clarithromycin + warfarin | increased bleeding risk | oral |
| R14 | clopidogrel + aspirin | increased bleeding risk | oral |

R11 与 R12 依据所引标签中的 NSAID 类别警告，以及香港药物办公室的口服 NSAID 成分分类编写，并带有 `derived_from_class=true`。**这个推导过程不得被隐藏。** R14 保留了「医生可能刻意开具双联抗血小板治疗」这一事实，使风险提示不会变成自行停药的劝告。

**美国来源不等同于香港产品批准标签。** 用来限制匹配的成分与途径条件能减少误用，但**不**构成完整的临床适用性评估。

---

## 2. 条目格式

每一层都用同一张表，这样可以原样喂进代码：

| 字段 | 说明 | 必填 |
|---|---|---|
| `id` | 唯一标识，例如 `L1-001` | 是 |
| `drug_a` / `drug_b` | 药品（**通用名**，一个英文、一个中文） | 是 |
| `severity` | `contraindicated` / `major` / `moderate` | 是 |
| `statement` | **展示给用户的那一句话**（大白话，不带术语） | 是 |
| `action` | 用户应该做什么 | 是 |
| `source` | 依据（指南 / 数据库 / 文献） | 是 |
| `verified_by` | 谁核过 | 演示前必须填 |

**写 `statement` 的规则**（这一条决定「报危险」这张牌打不打得响）：

- 好：**"Taking these two together may increase the risk of bleeding. Do not take them together; speak to a doctor first."**
- 差："CYP2C9 inhibition reduces warfarin metabolism" —— **用户读不懂，所以它等于什么都没说**

> **判据是写给用户看的，不是写给同行看的。** 术语属于 `source`，不属于 `statement`。

---

## 3. 这些层级实际包含什么

引擎并不把 L1/L2/L3 当作标签使用。它使用的是第 0 节列出的五个证据等级。**对应关系是：**

| 展示层级 | 对应的已实现等级 | 示例规则 |
|---|---|---|
| **L1** | `label_contraindication` | R08 simvastatin + clarithromycin |
| **L2** | `label_recommends_avoid`、`increased_bleeding_risk` 及其他风险升高等级、`consult_before_use`、`nitrate_warning` | R03 warfarin + aspirin；R06 clopidogrel + omeprazole；R09 warfarin + paracetamol |
| **L3** | 没有规则匹配 —— 输出 `no_rule_found` | 14 条规则之外的任何配对 |

**R01（paracetamol + paracetamol）属于 `duplicate_ingredient`。** 它不是一种相互作用，也不得被当作相互作用呈现。

**14 条规则的完整权威清单 —— 成分对、证据等级、许可途径与来源章节 —— 见上文第 1b 节，以及机器可读形式的 [`../../data/data_inventory.json`](../../data/data_inventory.json) 与 [`review.csv`](review.csv)。**

**没有具名的专业审阅人填写批准列，任何规则都不得从「草稿」移入「已批准」。** 在那之前 `verified_by` 字段保持为空。

---

## 5. L3 - 无数据（不是列表；这是默认行为）

**L3 不是一张条目表。它是上面两层都没有匹配上时会发生的事。**

它需要的是**明确的措辞**，不是行：

- 正确："I cannot find information on these two medicines. **Please consult a doctor or pharmacist.**"
- **绝不**："No interaction found." —— **这句话在产品里任何地方都不允许存在。** 它把「我们不知道」变成了「没有问题」。

> **在代码里强制它。不要把它留成文档里的一个可选项。** 这是产品的安全底线。

---

## 6. 数据来源与覆盖范围

**这些是从仓库里取出的真实数字，不是估计。** 事实来源：[`../../data-pack/validation/data_checks.json`](../../data-pack/validation/data_checks.json) 与 [`../../data/data_inventory.json`](../../data/data_inventory.json)。

| 问题 | 答案 |
|---|---|
| 我们用什么数据源？ | **香港注册药剂制品目录**（卫生署药物办公室），加上药物办公室消费者指引与 DailyMed 标签作为规则来源。完整署名：[`../../data-pack/SOURCES.md`](../../data-pack/SOURCES.md) |
| 覆盖多少种药？ | **14,269 个注册产品**，14,269 个唯一注册编号，**23,835** 条产品成分行，**2,081** 个不同原始成分字符串 |
| 多少对相互作用？ | **14 条规则。** 它们**不是**一个相互作用数据库 —— 见下面的诚实框定 |
| **什么东西肯定查不到？** | 14 条规则之外的一切：**所有高阶相互作用（三种及以上药品）、累积剂量、中成药与中药、保健品、食物相互作用、用户今天已经吃过什么、给药间隔、肝肾功能调整、过敏匹配、妊娠、哺乳与儿科方案，以及召回监测** |
| 中成药与中药覆盖了吗？ | **没有。** 在当前范围之外，并在产品中如实说明 |
| 数据有多新？ | 目录快照 **2026-09-25**；清单核对 **2026-10-03** |

### 引用这些数字时必须使用的框定

- **「14,269 个产品」是一个目录，不是一个知识库。** 其中大约有 **1.018 亿**个产品配对。**14 条规则无法声称覆盖它**，产品也不做「最完整」的声称。
- **规则没有匹配是一种覆盖声明，绝不是安全声明。**
- **`derived_from_class` 规则（R11、R12）必须展示其推导过程**，不得隐藏。
- **美国来源不等同于香港产品批准标签。**
- **14 条规则中 0 条经专业批准**（[`review.csv`](review.csv)，批准列为空）。

> **「什么东西肯定查不到」这一行必须在路演时主动讲出来。**
> 题目原文要求 *"State what it costs, **what it gets wrong**, and what leaves the device."* 自己划出覆盖边界，远比声称完整可信。

---

## 7. 演示前检查（Ella）

- [ ] 至少有 **3** 条 L1，而且都能**用常见药演示**
- [ ] 至少有 **3** 条 L2
- [ ] L3 的措辞已在代码里生效（**构造一个查不到的组合并验证**）
- [ ] 每一条都有 `source`（路演一定会被问「依据是什么」）
- [ ] 每一条 `statement` 都是**大白话**，不含临床术语
- [ ] **没有任何一处把「查不到」变成「没问题」**
- [ ] 演示用的 **3 个真实药盒**至少各命中一层
