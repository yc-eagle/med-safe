# 用药判据：三层

[English](README.md) | [中文](README.zh-CN.md)

> **这个目录是产品的决策核心。** 状态机到底能不能打出「报危险」和「拒绝回答」这两张牌，**完全取决于这里面有没有东西。**
> **负责人：Ella。** 目标：**今天下午出一版粗糙但完整的初版**（10-15 条就够）。今晚所有东西都建立在「能跑起来」之上。

---

## 1. 为什么是三层

三值状态机由这几层直接驱动。**一层对应一个状态。**

| 层级 | 含义 | 系统行为 | 状态 |
|---|---|---|---|
| **L1 - 禁忌 / 严重相互作用** | 有明确证据表明它们**不应该一起使用** | **明确警告**："These two must not be taken together."（这两盒不能一起吃。）再加来源。再加请咨询医生 | 2 - 报危险 |
| **L2 - 谨慎 / 需医生确认** | 存在风险，但**不一定是绝对禁止**；需要专业判断 | **标出风险**，并请咨询医生 | 2，较软的形态 |
| **L3 - 无数据** | 这个组合在我们的数据里**查不到** | "I cannot find information on these two medicines. Please consult a doctor."（我查不到这两种药的资料，请咨询医生。） | 3 - 拒绝回答 |

**还有一种情况不属于以上任何一层**（它是输入质量问题，不是医学判断）：

| 情况 | 行为 |
|---|---|
| 照片模糊 / 药品识别不出 | "I cannot read this photo clearly. Please take another one."（我看不清这张照片，请重拍一张。）（可重试） |

> **L3 不是「安全」。L3 是「我们不知道」。** 措辞绝不能让人把「查不到」读成「没问题」。这是整个产品里最容易被误读、也最危险的一点。

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

- 好：**"Taking these two together may increase the risk of bleeding. Do not take them together; speak to a doctor first."**（这两种药一起吃可能增加出血风险。不要一起服用；先咨询医生。）
- 差："CYP2C9 inhibition reduces warfarin metabolism" —— **用户读不懂，所以它等于什么都没说**

> **判据是写给用户看的，不是写给同行看的。** 术语属于 `source`，不属于 `statement`。

---

## 3. L1 - 禁忌 / 严重相互作用

| id | Drug A | Drug B | statement（大白话） | action | source | verified_by |
|---|---|---|---|---|---|---|
| _TODO_ | | | | | | |

<!-- 示例行（需要 Ella 核实后才能移入上面的表）：
| L1-001 | warfarin | aspirin | Taking these two together may significantly increase the risk of bleeding. Do not take them together without advice.（这两种药一起吃可能显著增加出血风险。未经医嘱不要一起服用。） | Speak to a doctor or pharmacist immediately（立即咨询医生或药师） | TODO | TO VERIFY |
-->

---

## 4. L2 - 谨慎 / 需医生确认

| id | Drug A | Drug B | statement（大白话） | action | source | verified_by |
|---|---|---|---|---|---|---|
| _TODO_ | | | | | | |

---

## 5. L3 - 无数据（不是列表，是默认行为）

**L3 不是一张条目表。它是上面两层都没有匹配上时会发生的事。**

它需要的是**明确的措辞**，不是行：

- 正确："I cannot find information on these two medicines. **Please consult a doctor or pharmacist.**"（我查不到这两种药的资料。**请咨询医生或药师。**）
- **绝不**："No interaction found."（未发现相互作用。）—— **这句话在产品里任何地方都不允许存在。** 它把「我们不知道」变成了「没有问题」。

> **在代码里强制它。不要把它留成文档里的一个可选项。** 这是产品的安全底线。

---

## 6. 数据来源与覆盖范围

<!-- TODO（Ella 和 Sun）：确认实际使用的数据源，并写清覆盖边界 -->

| 问题 | 答案 |
|---|---|
| 我们用什么数据源？ | _TODO_ |
| 覆盖多少种药？ | _TODO_ |
| 多少对相互作用？ | _TODO_ |
| **什么东西肯定查不到？** | _TODO_ - 这一行最重要；它*就是* L3 |
| 中成药与中药材覆盖了吗？ | _TODO_ |
| 数据有多新？ | _TODO_ |

> **「什么东西肯定查不到」这一行必须写下来，并在路演时主动讲出来。**
> 题目原文要求 *"State what it costs, **what it gets wrong**, and what leaves the device."*
>
> 中文：*"说清楚它的代价、**它会错在哪**，以及什么会离开设备。"*
> 自己划出覆盖边界，比声称自己完整可信得多。

---

## 7. 演示前检查（Ella）

- [ ] 至少有 **3** 条 L1，而且都能**用常见药演示**
- [ ] 至少有 **3** 条 L2
- [ ] L3 的措辞已在代码里生效（**构造一个查不到的组合并验证**）
- [ ] 每一条都有 `source`（路演一定会被问「依据是什么」）
- [ ] 每一条 `statement` 都是**大白话**，不含临床术语
- [ ] **没有任何一处把「查不到」变成「没问题」**
- [ ] 演示用的 **3 个真实药盒**至少各命中一层
