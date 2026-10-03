# 竞品与现有替代方案

[English](competitors.md) | [中文](competitors.zh-CN.md)

> **目的：** 路演评分项 **Market / Competitive Understanding（市场与竞争理解，5 分）** —— 我们最弱的一块。

> **早期规划材料 —— 更正已应用。** 写在产品做出来之前。当本文件与 [`../README.zh-CN.md`](../README.zh-CN.md)、[`../docs/decision-logic.md`](../docs/decision-logic.md) 或程序冲突时，**以实现为准**。
>
> - **粤语是优先语言**，面向主要用户；英语旁白只出现在演示视频里。
> - **风险等级是分开的**（标签禁忌 / 建议避免 / 风险升高 / 需先咨询 / 成分重复）。不是每一条警告都是「不能一起吃」。
> - 当有来源的规则匹配上时，**产品确实会显示警告**。它从不输出**「安全」结论**；没有匹配到规则是一种**覆盖**状态。
> - **14 条规则中 0 条经专业批准。**
> - 第三方产品与服务的能力必须逐项核实，不得概括。
> **拿分点：** *"Excellent competitive understanding with a highly convincing unique positioning"*（5 分） / *"Strong comparison showing clear gaps and opportunities"*（4 分）。
> **满分不要求「我们比别人强」，要求的是「我们知道自己站在哪里，以及为什么」。**

---

## 使用前必须核实

下面标了 **[verify]** 的条目，路演前必须亲自查过。**在评委面前把一个本地产品的功能说错，比不知道更糟。**

**怎么查：** 打开那个 App，或者打开官网读一遍功能列表。**五分钟，不许省。**

---

## 1. 横向对照

| 现有方案 | 它解决了什么 | **还剩下什么缺口** | 缺口最伤谁 |
|---|---|---|---|
| **通用 AI 助手**（ChatGPT 之类） | 什么都能问 | 1. **不认识香港本地的药品名或商品名**<br>2. **不能离线运行**<br>3. **会非常自信地答错** —— 而在用药场景里，一个自信的错误比不知道危险得多 | 所有用户 |
| **药盒里的说明书** | 官方、准确、不需要设备 | 1. 就一张印满小字的纸，很容易丢<br>2. **全是临床术语**<br>3. **它是有相互作用章节的** —— 真正的缺口是**需要看它的人看不懂它**，而且它和你手上实际拿着的东西对不上 | 长者、佣工 |
| **药品信息工具**（卫生署药物办公室公开信息、药典类 App） | 权威的药品信息 | 1. **给的是信息，不是判断** —— 「这两种能不能一起吃」这一层推理要用户自己走完<br>2. 大多是网页，**需要联网**<br>3. 默认读者识字、而且能自己推理 | 佣工 |
| **eHealth / HA Go** **[verify]**（政府电子健康纪录、医院管理局 App） | 患者**官方的用药纪录**、预约、挂号 | 1. 它是**纪录**，不是**核对**<br>2. **需要账号和登录** —— 外籍家庭佣工通常没有<br>3. 界面以中文为主 | 佣工 |
| **社区 / 遥距药剂师咨询**（例如圣雅各福群会慈善社区药房，自 2009 年起提供免费遥距服务） | **真正的专业判断**；可以查阅医健通纪录并做药物整合 | 1. **你要主动打电话**<br>2. **要在服务时间内**<br>3. **要完成授权**<br>4. 药师不在你家的厨房里 | 所有用户 |
| **MedSafe** | **在那一刻给出判断**（只拍照，不用账号），**并清楚标出它不确定的地方** | 我们**不**做诊断、不给剂量、不替代药师 —— 见 [`limitations.zh-CN.md`](limitations.zh-CN.md) | — |

---

## 2. 我们的定位，一句话

> **别人在做查询。我们在做核对。**
>
> 区别在于：**"this is warfarin"（这是华法林）和 "these two raise your bleeding risk, from this source"（这两种药会升高你的出血风险，来源在这里）是两件不同的事。**
> 前者是查询。后者是**附着在你手上实际拿着的东西上、带来源的警告** —— 而人真正卡住的，恰恰是那里。

**第二句话（关于那一刻）：**

> 香港不缺用药方面的专业判断。**缺的是这份判断在该出现的那一刻在场。**
> 凌晨两点、周末、你家的餐桌上，药师都不在；而外籍家庭佣工没有账号、看不懂中文、也不在服务时间内。

---

## 3. 为什么现有方案没有补上这个缺口

这不是「没人想到」。有三个结构性原因：

| # | 原因 | 解释 |
|---|---|---|
| **1** | **责任边界** | 告诉别人两种药能不能一起吃是要担责任的。大产品倾向于只给信息，把判断留给专业人士 |
| **2** | **离线很难** | 标签识别、相互作用数据和语音都得在设备上跑。云优先的架构默认做不到 |
| **3** | **识字与语言的分隔** | 现有产品假设用户看得懂中文、能登录、并且能从原始数据里自己推理。我们的用户三条都不成立 |

**我们的选择是刻意的：** 接受一个承认自己不知道的产品，换来的是**在它最被需要的那一刻真的能用**。

---

## 4. 口头稿（45 秒）

### 英文

> "Look at what already exists.
>
> **General-purpose AI assistants** can talk about anything — but they do not know Hong Kong's drug names, they need a connection, and **they will answer confidently and wrongly.** In medication, a confident error is more dangerous than not knowing.
>
> **The leaflet in the box** is accurate — but it covers one medicine only. **It does contain interaction sections; the gap is that the people who need it cannot read it.**
>
> **Drug information tools and eHealth** give you authoritative **records and information** — but they assume you can log in, read Chinese, and do the reasoning yourself. Our users fail all three.
>
> The closest thing is **community pharmacist teleconsultation** — it exists in Hong Kong, and it carries real professional judgement. But it requires you to call, during service hours, with authorisation.
>
> **So Hong Kong does not lack expertise. It lacks expertise at the moment it is needed.**
>
> We are not replacing the pharmacist. We are moving their first sentence to that moment — and when we cannot verify something, we say so."

### 中文

> 「先看这个领域里已经有什么。
>
> **通用 AI 助手**什么都能聊 —— 但它不认识香港的药名，不能离线，而且**会非常自信地说错**。在用药这件事上，一个自信的错误比『不知道』危险得多。
>
> **药盒里的说明书**是准确的 —— 但它只讲这一种药。**它是有相互作用章节的，真正的缺口是需要看它的人看不懂它。**
>
> **药品查询工具与医健通**给的是权威的**纪录与信息** —— 但它们假设你会登入、看得懂中文、并且能自己完成推理。我们的用户三条都不成立。
>
> 最接近的是**社区药剂师的遥距咨询** —— 香港真的有，而且有真正的专业判断。但它需要你主动打电话、要在服务时间内、要完成授权。
>
> **所以香港缺的不是专业判断，缺的是它在场的那一刻。**
>
> 我们不替代药师。我们做的是把药师的第一句话搬到那个时刻 —— 而且在无法确认的时候，我们说出来。」

---

## 5. 我们可能会被问到的问题

| 问题 | 回答 |
|---|---|
| **"How are you different from ChatGPT?"** | 不是「更聪明」—— 而是**三件它做不到的事**：认识香港本地的注册编号与成分、离线运行、以及在某个配对未被覆盖时**直说未覆盖，而不是暗示安全**。第三件才是重点。 |
| **"Pharmacist services already exist. Why do we need you?"** | 这一点我们自己就讲，而且那是更好的选择。**我们覆盖它够不到的那些时刻。** 我们不是在替代它。 |
| **"What gives you the right to make a judgement?"** | 我们**不**做诊断，也不下判决。我们呈现的是**带来源、带强度**的警告，并且把等级分开 —— 风险升高不是禁令。而且**当某个配对未被覆盖时我们会直说** —— 见 [`limitations.zh-CN.md`](limitations.zh-CN.md)。 |
| **"Why would a user trust you?"** | 这个问题问得对。我们的答案不是「因为我们准确」，而是**「因为它会告诉你它没有覆盖什么。」** 这是它能被信任的唯一理由。 |

---

## 6. TODO —— 上台前必须核实

**整张表都是规划材料，尚未逐条核实。** 其中任何一条都不得作为对他人产品能力的已核实主张来呈现。

- [ ] **每一行**，包括通用助手，都必须**逐个产品、逐项服务**核实
- [ ] **HA Go / eHealth** 是否真的需要账号登录，以及它是否标出药物相互作用
- [ ] 香港现有的**查药 App**（至少找到 1-2 个具体的并核查）
- [ ] **圣雅各福群会社区药房遥距药剂师咨询**服务的当前状态与范围
- [ ] **不要把竞品概括为**「它们都不做这个」或「只有我们做」。如果一条主张无法核实，**删掉它，而不是把它说软**
- [ ] 如果核实结果与上表不符，**立刻改** —— 把一个本地产品的功能说错，比不知道更糟
