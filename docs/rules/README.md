# Medication Criteria

[English](README.md) | [中文](README.zh-CN.md)

> **This directory is the product's decision core.**
> **Owner: Ella.** All 14 rules are drafts. **The number of professionally approved rules is currently zero.** Line-by-line review table: [`review.csv`](review.csv).

---

## 0. Correction: the tiers are a display summary, not the code

The three tiers below were the original team plan. **The implemented engine keeps a finer set of source strengths, and collapsing them is a factual error that must not be repeated on stage.**

| Implemented evidence level | Meaning | Must NOT be presented as |
|---|---|---|
| `label_contraindication` | The labelling contraindicates the combination | — |
| `label_recommends_avoid` | The labelling advises avoiding it | "banned" |
| `increased_bleeding_risk` and other increased-risk levels | A risk is increased | **"must not be taken together"** |
| `consult_before_use` | Consult first | a prohibition |
| `duplicate_ingredient` | The same ingredient appears twice | an interaction |

> **An increased-risk warning is not a prohibition.** Warfarin with aspirin carries an increased bleeding risk and must not be escalated into "contraindicated for every patient". Aspirin with clopidogrel may be a **deliberate regimen prescribed by a doctor**, so the product does not advise stopping it.
>
> **A missing rule is a coverage status, never a pharmacological conclusion.** It can never be read back as safety.

Where this document and [`../decision-logic.md`](../decision-logic.md) or the program differ, **the implementation is authoritative.**

---

## 1. Why three tiers

The three tiers are a **presentation summary** used to explain the product. They are useful for a demo slide; they are not the data model.

| Tier | Meaning | System behaviour | Presentation state |
|---|---|---|---|
| **L1 - Labelling contraindication** | The labelling contraindicates the combination | Explicit warning, with source, plus consult a doctor | shows a warning |
| **L2 - Recommends avoid / increased risk / consult first** | A risk exists but it is **not an absolute prohibition** | Flags the risk at its correct strength, plus consult a doctor | shows a warning |
| **L3 - No data** | The combination **is not covered** by the current rules | "I cannot find information on these two medicines. Please consult a doctor." | states **not covered** |

**One further case belongs to none of these tiers** (it is an input-quality issue, not a medical judgement):

| Situation | Behaviour |
|---|---|
| Blurred photo / medicine not recognised | Retake, choose another image, or enter the registration number; **human confirmation** |

> **L3 is not "safe". L3 is "not covered".** The wording must never allow anyone to read "cannot find" as "no problem". This is the single most easily misunderstood point in the whole product, and the most dangerous.
>
> **A photograph cannot confirm identity.** Neither can OCR. Both produce candidates only, and the user confirms the product item by item.

---

## 1b. The 14 current rules

Each rule carries an ingredient pair, an evidence level, a permitted route and a source section. Route, formulation, source and wording must be reviewed together.

| ID | Ingredient pair | Evidence level | Permitted route |
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

R11 and R12 are coded from the cited labelling's NSAID class warning together with the Hong Kong Drug Office oral NSAID ingredient classification, with `derived_from_class=true`. **The derivation must not be hidden.** R14 preserves the fact that a doctor may deliberately prescribe dual antiplatelet therapy, so that a risk prompt does not become advice to stop medication unaided.

**US sources are not equivalent to Hong Kong product approval labelling.** The ingredient and route conditions that gate a match reduce misuse but do **not** constitute a complete clinical applicability assessment.

---

## 2. Entry format

Every tier uses the same table so it can be fed straight into code:

| Field | Description | Required |
|---|---|---|
| `id` | Unique identifier, e.g. `L1-001` | Yes |
| `drug_a` / `drug_b` | Medicines (**generic names**, one English, one Chinese) | Yes |
| `severity` | `contraindicated` / `major` / `moderate` | Yes |
| `statement` | **The one sentence shown to the user** (plain language, no jargon) | Yes |
| `action` | What the user should do | Yes |
| `source` | Basis (guideline / database / literature) | Yes |
| `verified_by` | Who checked it | Must be filled before the demo |

**Rules for writing `statement`** (this decides whether the "signal danger" card lands):

- Good: **"Taking these two together may increase the risk of bleeding. Do not take them together; speak to a doctor first."**
- Bad: "CYP2C9 inhibition reduces warfarin metabolism" — **the user cannot read it, so it says nothing**

> **The criteria are written for users, not for peers.** Terminology belongs in `source`, not in `statement`.

---

## 3. L1 - Contraindicated / severe interaction

| id | Drug A | Drug B | statement (plain language) | action | source | verified_by |
|---|---|---|---|---|---|---|
| _TODO_ | | | | | | |

<!-- Example row (requires Ella's verification before it moves into the table above):
| L1-001 | warfarin | aspirin | Taking these two together may significantly increase the risk of bleeding. Do not take them together without advice. | Speak to a doctor or pharmacist immediately | TODO | TO VERIFY |
-->

---

## 4. L2 - Caution / requires doctor confirmation

| id | Drug A | Drug B | statement (plain language) | action | source | verified_by |
|---|---|---|---|---|---|---|
| _TODO_ | | | | | | |

---

## 5. L3 - No data (not a list; this is the default behaviour)

**L3 is not a table of entries. It is what happens when neither tier above matches.**

What it needs is **explicit wording**, not rows:

- Correct: "I cannot find information on these two medicines. **Please consult a doctor or pharmacist.**"
- **Never**: "No interaction found." — **this sentence must not exist anywhere in the product.** It turns "we do not know" into "there is no problem".

> **Enforce this in code. Do not leave it as an optional item in a document.** It is the product's safety floor.

---

## 6. Data sources and coverage

<!-- TODO (Ella and Sun): confirm the sources actually used and state the coverage boundary -->

| Question | Answer |
|---|---|
| What data source do we use? | _TODO_ |
| How many medicines does it cover? | _TODO_ |
| How many interaction pairs? | _TODO_ |
| **What will definitely not be found?** | _TODO_ - this row matters most; it *is* L3 |
| Are Chinese patent and herbal medicines covered? | _TODO_ |
| How current is it? | _TODO_ |

> **The "what will definitely not be found" row must be written down and stated proactively in the pitch.**
> The problem statement requires *"State what it costs, **what it gets wrong**, and what leaves the device."* Drawing your own coverage boundary is far more credible than claiming completeness.

---

## 7. Pre-demo check (Ella)

- [ ] At least **3** L1 entries, all of them **demo-able with common medicines**
- [ ] At least **3** L2 entries
- [ ] L3 wording is live in code (**construct a combination that cannot be found and verify it**)
- [ ] Every entry has a `source` (the pitch will be asked "on what basis?")
- [ ] Every `statement` is in **plain language**, free of clinical terminology
- [ ] **Nothing anywhere turns "cannot find" into "no problem"**
- [ ] The **3 real boxes** used in the demo hit each of the three tiers at least once
