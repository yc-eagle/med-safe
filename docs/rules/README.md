# Medication Criteria: Three Tiers

[English](README.md) | [中文](README.zh-CN.md)

> **This directory is the product's decision core.** Whether the state machine can play the "signal danger" and "decline to answer" cards **depends entirely on whether there is anything in here.**
> **Owner: Ella.** Target: **a rough but complete first version this afternoon** (10-15 entries is enough). Everything tonight builds on something that runs.

---

## 1. Why three tiers

The three-state machine is driven directly by these tiers. **One tier maps to one state.**

| Tier | Meaning | System behaviour | State |
|---|---|---|---|
| **L1 - Contraindicated / severe interaction** | There is clear evidence that they **should not be used together** | **Explicit warning**: "These two must not be taken together." Plus source. Plus consult a doctor | 2 - signal danger |
| **L2 - Caution / requires doctor confirmation** | A risk exists but it is **not necessarily an absolute prohibition**; it needs professional judgement | **Flags the risk** plus consult a doctor | 2, softer form |
| **L3 - No data** | The combination **cannot be found** in our data | "I cannot find information on these two medicines. Please consult a doctor." | 3 - decline to answer |

**One further case belongs to none of these tiers** (it is an input-quality issue, not a medical judgement):

| Situation | Behaviour |
|---|---|
| Blurred photo / medicine not recognised | "I cannot read this photo clearly. Please take another one." (retryable) |

> **L3 is not "safe". L3 is "we do not know".** The wording must never allow anyone to read "cannot find" as "no problem". This is the single most easily misunderstood point in the whole product, and the most dangerous.

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
