# What It Gets Wrong

[English](limitations.md) | [中文](limitations.zh-CN.md)

> The problem statement **requires** this: *"State what it costs, **what it gets wrong**, and what leaves the device."*
> **This is not a deduction. It is where the marks are.** Stating your boundary plainly is far more credible than claiming completeness.
> The pitching criterion *Impact, Feasibility & Future Vision* requires **"risk awareness"** for full marks. **This page is those marks.**

**Owner: Lin MA.**

---

## 1. Failure modes

| # | Failure mode | When it happens | Severity | Our handling |
|---|---|---|---|---|
| 1 | **Medicine misidentification** | Blurred photo, poor angle, low light, similar packaging | High | Retake, choose another image, or enter the registration number. **A photo and OCR produce candidates only; the user confirms identity.** |
| 2 | **Ingredient misidentification** | Combination products, supplements, over-the-counter packaging | High | Unmapped ingredients are **listed as gaps**; identity still requires user confirmation |
| 3 | **Insufficient rule coverage** | The pair is not covered by the 14 rules | Medium | Outputs **`no_rule_found`** — states **not covered**, and never "no interaction found" |
| 4 | **Chinese patent medicines, herbal medicines and supplements not covered** | Patent medicine packaging, raw herbs | Medium | Outside current scope, **stated as such** |
| 5 | **Speech recognition error** | Noisy environment, accent | **Not uniformly low** — a misheard name can point at a different drug | Text is shown as well as audio; **never voice-only**, and the user still confirms |
| 6 | **Route of administration unclear** | Route not confirmed, or outside the rule's scope | Medium | Outputs **`route_review_required`**; shows the potential warning but does not extrapolate |
| 7 | **Over-simplification** | Compressing a complex risk into one sentence | Medium | Wording reviewed line by line by Lin MA |
| 8 | **Duplicate entry** | The same product added twice | Low | Outputs **`duplicate_input_requires_review`** |

**No failure-rate number is filled in without real data.** Incidence rates are left blank deliberately.

---

## 2. The single most important rule: how we handle "I don't know"

> **The correct output for L3 (no data found) is "I cannot find information on these two medicines. Please consult a doctor." It is never "no interaction found."**

**Why this is called out separately:** turning "we do not know" into "it is fine" is the one **unforgivable** error in this product. The former is merely unhelpful. The latter causes harm.

**This must be enforced in code**, not left as an optional item in a document.

---

## 3. What our model does not cover

**This mirrors the "outside the model's capability" list in [`decision-logic.md`](decision-logic.md).** Keep the two in step.

| Not covered | Note |
|---|---|
| Dosage and administration | We deliberately give **no** dosage advice |
| Treatment duration and dosing intervals | Not modelled |
| The patient's own circumstances | Age, liver and kidney function, allergies, pregnancy and breastfeeding — **we know none of it** |
| Paediatric regimens | Not covered |
| Higher-order interactions | Three or more medicines interacting together is not assessed; only pairs are |
| Cumulative dose | Not assessed |
| Herbal medicines, Chinese patent medicines, supplements | **Not covered.** Stated as such in the product |
| Food-drug interactions | **Not covered** |
| What the user has already taken today, and when | We do not know it |
| Recall monitoring | Not covered |
| Drug names outside Hong Kong | Brand names differ by region |

> **These gaps cannot be closed by downloading more model weights.** They need reliable data, a defined scope, and professional validation — which is human work.

---

## 4. Four things we deliberately do not do

> **MedSafe is a hackathon prototype. It is not a medical device and it does not provide medical advice.**

- We do not diagnose.
- We do not give dosage advice.
- We do not suggest stopping, switching or adjusting medication.
- We do not replace a pharmacist or a doctor.

**When uncertain, the correct behaviour is to send the user to a professional.**

---

## 5. If an error does occur

| Stage | Safe fallback |
|---|---|
| Low recognition confidence | Retake, choose another image, or enter the registration number; it does not guess |
| Identity not confirmed by the user | Outputs `identity_confirmation_required`; the full check does not proceed |
| An unmapped ingredient, or a missing route | Outputs `incomplete_check`; the gap stays visible |
| Data not matched | Outputs `no_rule_found` and states **not covered** |
| Route not confirmed or outside scope | Outputs `route_review_required`; shown as a prompt to confirm, and not extrapolated |
| The same product added twice | Outputs `duplicate_input_requires_review` |
| Ambiguous wording in the output | Reviewed line by line by Lin MA; must be checked before the demo |
| System entirely unavailable | The interface states plainly: consult a doctor or pharmacist |
| Offline, external citation link | The link does not resolve; the local summary, the date and the section reference remain |

**Two flags are attached to every result, without exception:** `clinicalSafety: not_assessed` and `coverageComplete: false`. **There is no code path that issues a safe conclusion.**

---

## 6. How to report this honestly

**Observational research and engineering testing are reported separately.** The engineering suite passing is evidence that the software behaves as specified. It is **not** evidence of clinical effectiveness, of real user satisfaction, or of any award-level validation.

**No incidence rate is stated without real data.** Where a rate is unknown, the field is left blank rather than estimated.

The team's original framing — error classification, what to do on failure, and what is out of scope — is preserved in the [team planning archive](team-planning/README.md). **This table does not represent a professionally approved medical risk classification.** All 14 rules have been clinician-reviewed, which is a review of wording, sourcing and scope, not a validated clinical risk model.

---

## 7. Checklist

- [x] Failure table reflects the implemented output labels
- [x] **"A missing match never establishes safety" is enforced in code**
- [x] Non-coverage table completed from [`decision-logic.md`](decision-logic.md)
- [ ] The four "do not do" items verified in the interface and in the demo
- [ ] All fallback paths exercised in the rehearsal
- [ ] No incidence rate stated without real data
