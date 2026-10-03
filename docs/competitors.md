# Competition and Existing Alternatives

[English](competitors.md) | [中文](competitors.zh-CN.md)

> **Purpose:** the pitching criterion **Market / Competitive Understanding (5 marks)** — our weakest area.

> **Earlier planning material — corrections applied.** Written before the product was built. Where this file conflicts with [`../README.md`](../README.md), [`../docs/decision-logic.md`](../docs/decision-logic.md) or the program, **the implementation wins**.
>
> - **Cantonese is prioritised** for the primary users; English narration appears in the demo video only.
> - **Risk levels are separate** (labelling contraindication / recommends avoid / increased risk / consult first / duplicate ingredient). Not every warning is "must not be taken together".
> - When a sourced rule matches, **the product does show the warning**. It never outputs a **"safe" conclusion**; a missing rule is a **coverage** status.
> - **Zero of the 14 rules are professionally approved.**
> - Capabilities of third-party products and services must be verified individually, not generalised.
> **What earns marks:** *"Excellent competitive understanding with a highly convincing unique positioning"* (5) / *"Strong comparison showing clear gaps and opportunities"* (4).
> **Full marks do not require "we are better than them". They require "we know where we stand, and why".**

---

## Verification required before use

Entries marked **[verify]** below must be personally checked before the pitch. **Getting a local product's features wrong in front of a judge is worse than not knowing.**

**How to check:** open the app, or open the official site and read the feature list. **Five minutes, not optional.**

---

## 1. Comparison

| Existing option | What it solves | **What gap remains** | Who the gap hurts most |
|---|---|---|---|
| **General-purpose AI assistants** (ChatGPT and similar) | Anything can be asked | 1. **Do not know local Hong Kong drug or brand names**<br>2. **Cannot run offline**<br>3. **Answer confidently and wrongly** — and in a medication context a confident error is far more dangerous than not knowing | All users |
| **The leaflet in the box** | Official, accurate, no device needed | 1. One sheet of small print, lost easily<br>2. **Clinical terminology**<br>3. **It does contain interaction sections** — the gap is that the people who need it **cannot read it**, and it is not tied to what is actually in front of them | Older adults, helpers |
| **Drug information tools** (Drug Office public information, pharmacopoeia apps) | Authoritative drug information | 1. **Give information, not judgement** — the user has to complete the "can these two be taken together" reasoning themselves<br>2. Mostly web-based, **require a connection**<br>3. Assume the reader is literate and can reason from it | Helpers |
| **eHealth / HA Go** **[verify]** (government electronic health records, Hospital Authority app) | The patient's **official medication record**, appointments, bookings | 1. It is a **record**, not a **check**<br>2. **Requires an account and login** — a domestic helper typically does not have one<br>3. Interface is predominantly Chinese | Helpers |
| **Community / remote pharmacist consultation** (for example St. James' Settlement charity community pharmacy, free remote service since 2009) | **Genuine professional judgement**; can review the eHealth record and reconcile medicines | 1. **You have to call**<br>2. **During service hours**<br>3. **With authorisation in place**<br>4. The pharmacist is not in your kitchen | All users |
| **MedSafe** | **Gives a judgement at that moment** (photograph only, no account) **and marks clearly where it is unsure** | We do **not** diagnose, give dosage, or replace a pharmacist — see [`limitations.md`](limitations.md) | — |

---

## 2. Our position, in one sentence

> **Everyone else is doing lookup. We are doing verification.**
>
> The difference: **"this is warfarin" and "these two raise your bleeding risk, from this source" are two different things.**
> The first is a lookup. The second is **a sourced warning attached to what is actually in your hand** — and that is where a person actually gets stuck.

**The second sentence (about the moment):**

> Hong Kong does not lack professional judgement in medication. **What it lacks is that judgement being present at the moment it is needed.**
> The pharmacist is not there at 2 a.m., at the weekend, or at your kitchen table; and the domestic helper has no account, cannot read Chinese, and is outside service hours.

---

## 3. Why existing options have not closed this gap

This is not "nobody thought of it". There are three structural reasons:

| # | Reason | Explanation |
|---|---|---|
| **1** | **Liability boundaries** | Telling someone whether two medicines can be taken together carries responsibility. Large products tend to give information and leave judgement to professionals |
| **2** | **Offline is hard** | Label recognition, interaction data and speech all have to run on the device. Cloud-first architectures cannot do this by default |
| **3** | **The literacy and language divide** | Existing products assume a user who reads Chinese, can log in, and can reason from raw data. Our users fail all three |

**Our choice is deliberate:** accept a product that admits what it does not know, in exchange for **actually being usable at the moment it is needed most**.

---

## 4. Spoken script (45 seconds)

### English

> "Look at what already exists.
>
> **General-purpose AI assistants** can talk about anything — but they do not know Hong Kong's drug names, they need a connection, and **they will answer confidently and wrongly.** In medication, a confident error is more dangerous than not knowing.
>
> **The leaflet in the box** is accurate — but it covers one medicine only. **It never tells you what happens when you take it with something else.**
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
> **药盒里的说明书**是准确的 —— 但它只讲这一种药，**从来不会告诉你它和另一种药一起吃会怎样**。
>
> **药品查询工具与医健通**给的是权威的**纪录与信息** —— 但它们假设你会登入、看得懂中文、并且能自己完成推理。我们的用户三条都不成立。
>
> 最接近的是**社区药剂师的遥距咨询** —— 香港真的有，而且有真正的专业判断。但它需要你主动打电话、要在服务时间内、要完成授权。
>
> **所以香港缺的不是专业判断，缺的是它在场的那一刻。**
>
> 我们不替代药师。我们做的是把药师的第一句话搬到那个时刻 —— 而且在无法确认的时候，我们说出来。」

---

## 5. Questions we may be asked

| Question | Answer |
|---|---|
| **"How are you different from ChatGPT?"** | Not "smarter" — **three things it cannot do**: know local Hong Kong registration numbers and ingredients, run offline, and **state plainly when a pair is not covered instead of implying safety.** The third one is the point. |
| **"Pharmacist services already exist. Why do we need you?"** | We say so ourselves, and it is the better option. **We cover the moments it cannot reach.** We are not replacing it. |
| **"What gives you the right to make a judgement?"** | We do **not** diagnose, and we do not give a verdict. We surface a warning **with its source and its strength**, and we keep the levels apart — an increased risk is not a prohibition. And **when a pair is not covered we say so** — see [`limitations.md`](limitations.md). |
| **"Why would a user trust you?"** | Fair question. Our answer is not "because we are accurate". It is **"because it tells you what it has not covered."** That is the only reason it can be trusted. |

---

## 6. TODO — verify before going on stage

**This whole table is planning material and is not yet fact-checked item by item.** None of it may be presented as a verified claim about another product's capabilities.

- [ ] **Every row**, including the general assistants, must be checked **product by product and service by service**
- [ ] Whether **HA Go / eHealth** genuinely requires account login, and whether it flags drug interactions
- [ ] Existing **drug lookup apps** in Hong Kong (find at least 1-2 specific ones and check them)
- [ ] The current status and scope of the **St. James' Settlement community pharmacy remote pharmacist consultation** service
- [ ] **Do not summarise competitors** as "none of them do this" or "only we do". If a claim cannot be verified, **drop the claim rather than soften it**
- [ ] If any verification contradicts the table above, **correct it immediately** — getting a local product's features wrong is worse than not knowing