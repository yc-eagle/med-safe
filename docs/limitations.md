# What It Gets Wrong

[English](limitations.md) | [中文](limitations.zh-CN.md)

> The problem statement **requires** this: *"State what it costs, **what it gets wrong**, and what leaves the device."*
> **This is not a deduction. It is where the marks are.** Stating your boundary plainly is far more credible than claiming completeness.
> The pitching criterion *Impact, Feasibility & Future Vision* requires **"risk awareness"** for full marks. **This page is those marks.**

**Owner: Ella.**

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
| 7 | **Over-simplification** | Compressing a complex risk into one sentence | Medium | Wording reviewed line by line by Ella |
| 8 | **Duplicate entry** | The same product added twice | Low | Outputs **`duplicate_input_requires_review`** |

**No failure-rate number is filled in without real data.** Incidence rates are left blank deliberately.

---

## 2. The single most important rule: how we handle "I don't know"

> **The correct output for L3 (no data found) is "I cannot find information on these two medicines. Please consult a doctor." It is never "no interaction found."**

**Why this is called out separately:** turning "we do not know" into "it is fine" is the one **unforgivable** error in this product. The former is merely unhelpful. The latter causes harm.

**This must be enforced in code**, not left as an optional item in a document.

---

## 3. What our model does not cover

<!-- TODO (Sun and Ella) -->

| Not covered | Note |
|---|---|
| Dosage and administration | We deliberately give **no** dosage advice |
| The patient's own circumstances | Age, liver and kidney function, allergies, pregnancy — **we know none of it** |
| Herbal medicines and supplements | _TODO: actual coverage_ |
| Food-drug interactions | _TODO_ |
| Drug names outside Hong Kong | Brand names differ by region |
| Time | We do not know **what the user has already taken today** |

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
| Data not matched | Outputs `no_rule_found` and states **not covered** |
| Route not confirmed or outside scope | Outputs `route_review_required`; shown as a prompt to confirm |
| Ambiguous wording in the output | Reviewed line by line by Ella; must be checked before the demo |
| System entirely unavailable | The interface states plainly: consult a doctor or pharmacist |

<!-- TODO: document the actual degradation paths in the implementation. -->

---

## 6. Checklist

- [ ] Failure-mode table corrected against the actual implementation
- [ ] **"No data is not the same as no problem" is enforced in code and has been tested**
- [ ] Non-coverage table completed
- [ ] The four "do not do" items are stated in the interface and in the demo
- [ ] Fallback paths tested
