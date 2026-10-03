# The Problem

[English](problem.md) | [中文](problem.zh-CN.md)

> This expands on [`../README.md`](../README.md). It supports two scored items: **Problem Framing & Relevance** in the pitching round, and **Problem & User Needs** in the exhibition.

> **Earlier planning material — corrections applied.** Written before the product was built. Where this file conflicts with [`../README.md`](../README.md), [`../docs/decision-logic.md`](../docs/decision-logic.md) or the program, **the implementation wins**.
>
> - **The interface opens in English**, with Mandarin and Cantonese selectors (`?lang=en|cmn|yue`). Language and voice availability are separate settings. Changing language converts display text only; catalogue values, source records and clinical rules are unchanged.
> - **Risk levels are separate** (labelling contraindication / recommends avoid / increased risk / consult first / duplicate ingredient). Not every warning is "must not be taken together".
> - When a sourced rule matches, **the product does show the warning**. It never outputs a **"safe" conclusion**; a missing rule is a **coverage** status.
> - **Zero of the 14 rules are professionally approved.**
> - Capabilities of third-party products and services must be verified individually, not generalised.

---

## 1. Who the users are

### User A: older adults living alone in Hong Kong

- Often take **several medicines at once** (polypharmacy), prescribed by different specialists in different clinics
- The print on the box is **small and full of terminology**, or the leaflet has been lost
- The doctor explains once; **nothing is retained after leaving the room**
- Typical failure outcomes: **duplicated ingredients, missed doses, medicines from different specialties mixed up**

### User B: foreign domestic helpers (mainly from the Philippines)

- They carry out the **actual care work**: sorting pills, prompting doses, attending appointments
- **They cannot read Chinese** — labels, leaflets and appointment slips are blank to them
- The language gap runs both ways: **the older adult speaks Cantonese, the helper understands English or Tagalog, and there is nothing in between**
- What she needs is **verification**, not **diagnosis** — and she has no tool for it

> **The product's voice output is in English by default**, for User B.
> **Cantonese (User A) is the next step.** If asked, state this priority honestly; do not present it as already delivered.

---

## 2. The real failure chain

```
Doctor explains -> the older adult does not retain it -> the helper cannot read the Chinese leaflet
   -> the print on the box is too small -> she makes her own judgement -> added / missed / duplicated doses
```

**This is not an efficiency problem. It is a hospital admission problem.**

---

## 3. Root cause

> **Checking whether several medicines can be taken together is something only a pharmacist does today — and the knowledge it requires is locked inside the pharmacy, in both time and space.**

Three separate facts sit underneath that:

| # | Fact | Consequence |
|---|---|---|
| **1** | Checking medication safety requires **professional judgement**, not just lookup | Older adults and helpers **do not have it** |
| **2** | A pharmacist's **hours and location** are limited | **2 a.m., weekends, at home** are all out of reach |
| **3** | Existing tools do **information retrieval**, not **verification** | The place a person actually gets stuck is **never answered** |

**So: the problem is not that nobody is managing it. It is that it cannot be reached at the moment it matters.**

---

## 4. Our position

**We do not replace the pharmacist. We provide a first-line response.**

And the correct behaviour for a first-line response is to **escalate, not to guess.**

That sentence maps directly onto the problem statement:

> *"**A first-line response that escalates rather than guesses.**"*

---

## 5. Existing alternatives and where they fall short

| Existing option | What it achieves | What it does not |
|---|---|---|
| **General-purpose AI assistants** | Anything you ask | Do not know local Hong Kong drug names; cannot run offline; **and answer confidently and wrongly** |
| **The leaflet in the box** | Official and accurate | One sheet of small print, in clinical terminology; **older adults and helpers cannot read it** |
| **Drug lookup apps and pharmacopoeias** | You can find the drug | **Give information, not judgement**; require a connection; assume literacy |
| **Community pharmacist services** | Real professional judgement | **Require attendance and service hours; cannot reach "right now, at home"** |
| **Our position** | **Gives a judgement at that moment, and marks clearly where it is unsure** | — |

---

## 6. Evidence status

| Evidence type | Status |
|---|---|
| Research background on local polypharmacy and Western/Chinese medicine | Available: public literature from HKU's medical faculty (see [`../CREDITS.md`](../CREDITS.md)) |
| The reach of community pharmacist services and the remaining gap | Available: public HKU Faculty of Medicine material and eHealth documentation |
| **First-hand interviews (Cantonese + English)** | _TODO: see [`../assets/interviews/`](../assets/interviews/) and [`evidence-protocol.md`](evidence-protocol.md)_ |
| Manual method versus tool: steps and time | _TODO: see [`evidence-protocol.md`](evidence-protocol.md)_ |

> **Do not describe "there is literature on this" as "we did research".** Keep the two separate when speaking.