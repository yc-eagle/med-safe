# 竞品与现有替代方案

> **用途**：路演评分表 **Market / Competitive Understanding（5 分）** —— 我们唯一明显偏弱的一格。
> **拿分要求**：*"Excellent competitive understanding with a highly convincing unique positioning"*（5 分）/ *"Strong comparison showing clear gaps and opportunities"*（4 分）。
> **不是 5 分要"我们比他们好"，是要"我们知道自己站在哪、为什么站在那"。**

---

## ⚠️ 使用前必须做的核实

下表里标了 🔍 的条目，**路演前请务必亲自确认一遍功能范围**。在评委面前说错本地产品的功能，比不知道更糟。

**核实方法**：下载 App 看一眼、或打开官网看功能列表。**五分钟就能做完，不要跳过。**

---

## 一、对照表

| 现有方案 | 解决了什么 | **留下了什么缺口** | 缺口对谁最致命 |
|---|---|---|---|
| **通用 AI 对话助手**<br>（ChatGPT 等通用大模型） | 什么都能问 | ① **不认识香港本地药名与商品名**<br>② **不能离线**<br>③ ⭐ **会非常自信地说错** —— 而用药场景里，一个自信的错误比"不知道"危险得多 | 全部用户 |
| **药盒上印的说明书 / 仿单** | 官方、准确、无需设备 | ① 一小张纸，丢了就没了<br>② **专业术语**<br>③ **只描述这一种药，绝不提"和别的药一起吃会怎样"** | 长者、外佣 |
| **药品查询工具**<br>（卫生署药物办公室公开资讯、药典类 App） | 查得到药品资料，来源权威 | ① **只给信息，不给判断** —— 用户要自己完成"这两个能不能一起"的推理<br>② 多为网页，**要联网**<br>③ 假设读者看得懂并会推理 | 外佣 |
| **医健通 eHealth / HA Go** 🔍<br>（政府电子健康纪录、医管局 App） | 病人的**官方用药纪录**、覆诊、预约 | ① 它是**纪录**，不是**核对**<br>② ⭐ **需要账号与登入** —— 家庭佣工通常没有<br>③ 界面以中文为主 | 外佣 |
| **社区药剂师 / 遥距药剂师咨询**<br>（如圣雅各福群会惠泽社区药房自 2009 年起的免费遥距咨询服务） | ⭐ **有真正的专业判断**，能查阅医健通做药物整合 | ① **要主动打电话**<br>② **要在服务时间内**<br>③ **要完成授权**<br>④ 药剂师本人不在你家的厨房里 | 全部用户 |
| **➜ MedSafe** | **在那个时刻给出判断**（拍照即可，无需账号），**并且明确标出哪里它不确定** | 我们**不做诊断、不给剂量、不替代药师** —— 见 [`../docs/limitations.md`](../docs/limitations.md) | — |

---

## 二、⭐ 我们的位置（一句话）

> **别人在做"查药"，我们在做"核对"。**
>
> 差别在于：**「这是华法林」和「这两盒不能一起吃」是两件不同的事。**
> 前者是信息，后者是判断 —— 而人真正卡住的地方，是判断。

**第二句话（关于那一刻）：**

> 香港的用药服务不缺专业判断 —— **缺的是它在场的那一刻。**
> 药剂师不在凌晨、不在周末、不在你家的厨房里；而外籍佣工没有账号、看不懂中文、也不在服务时间内。

---

## 三、为什么现有方案没有填上这个缺口

这不是"别人没想到"，而是**三个结构性原因**：

| # | 原因 | 说明 |
|---|---|---|
| **1** | **责任边界** | 给"能不能一起吃"下判断是有责任的。大厂产品倾向于只给信息，把判断留给专业人士 |
| **2** | **离线很难** | 药名识别 + 相互作用数据 + 语音，全都要在设备上跑 —— 云优先的产品架构天然做不到 |
| **3** | **语言与识字断层** | 现有产品的默认用户是"会中文、会登入、会推理"的人；而我们的用户恰好三条都不成立 |

**➜ 我们的选择是正面的：** 接受一个"会承认不知道"的产品形态，换取**在最需要它的那一刻真的能用**。

---

## 四、路演口播版（45 秒，直接背）

### 中文

> 「看一下这个领域里已经有什么。
>
> **通用大模型**什么都能聊 —— 但它不认识香港的药，不能离线，而且**会非常自信地说错**。在用药这件事上，一个自信的错误比"不知道"危险得多。
>
> **药盒说明书**是准确的 —— 但它只讲这一种药，**从来不会告诉你它和另一种药一起吃会怎样**。
>
> **药品查询工具和医健通**给的是权威的**纪录与信息** —— 但它们**假设你会登入、看得懂、并且能自己完成推理**。而我们的用户恰好三条都不成立。
>
> 最接近的是**社区药剂师的遥距咨询** —— 香港真的有人在推，而且有真正的专业判断。但他们**需要你主动打电话、要在服务时间内、要完成授权**。
>
> **所以：香港缺的不是专业判断，缺的是它在场的那一刻。**
>
> 我们不替代药师。我们做的是**把药师的第一句话，搬到那个时刻** —— 并且在不确定的时候，明确说我不能确认。」

### English

> "Look at what already exists.
>
> **General-purpose AI assistants** can talk about anything — but they don't know Hong Kong's drug names, they need a connection, and **they will answer confidently and wrongly.** In medication, a confident error is more dangerous than not knowing.
>
> **The leaflet in the box** is accurate — but it only describes that one medicine. **It never tells you what happens when you take it with something else.**
>
> **Drug information tools and eHealth** give you authoritative **records and information** — but they assume you can log in, read Chinese, and do the reasoning yourself. Our users fail all three.
>
> The closest thing is **community pharmacist teleconsultation** — it exists in Hong Kong, and it carries real professional judgement. But it requires you to call, during service hours, with authorisation.
>
> **So Hong Kong doesn't lack expertise. It lacks expertise at the moment it's needed.**
>
> We're not replacing the pharmacist. We're moving their first sentence to that moment — and when we can't verify something, we say so."

---

## 五、可能被追问的问题

| 评委可能问 | 怎么答 |
|---|---|
| **「那你们和 ChatGPT 有什么区别？」** | 不是"更聪明"，是**三件它做不到的事**：认识本地药名、能离线跑、**以及在无法核实时拒绝回答**。第三件才是关键。 |
| **「已经有药剂师服务了，为什么还需要你们？」** | 我们自己就说它存在、而且是更好的方案。**我们要覆盖的是它够不到的时刻**，不是取代它。 |
| **「你们凭什么敢下判断？」** | 我们**不下诊断**，只做核对并给出来源。而且**查不到的时候我们不猜** —— 见 [`../docs/limitations.md`](../docs/limitations.md)。 |
| **「用户凭什么信你们？」** | 这个问题问得对。我们的答案不是"因为我们准"，而是"**因为我们会说自己不知道**"。这是它可以被信任的唯一理由。 |

---

## 六、待办

- [ ] 🔍 核实 **HA Go / 医健通** 是否真的需要账号登入、是否有药物相互作用提示功能
- [ ] 🔍 核实香港市面上现有的**药品查询 App**（至少找 1–2 个具体的）
- [ ] 确认**圣雅各福群会惠泽社区药房遥距药剂师咨询**服务的现行状态与范围
- [ ] 若某项核实结果与上表不符，**立刻改表** —— 说错本地产品功能比不知道更糟
