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
| 1 | **Medicine misidentification** | Blurred photo, poor angle, low light, similar packaging | High | Degrades to "I cannot read this photo clearly. Please take another one." |
| 2 | **Ingredient misidentification** | Combination products, supplements, over-the-counter packaging | High | Recognition uncertain -> goes to state 3 |
| 3 | **Insufficient data coverage** | The combination is not in our data | Medium | **Goes to state 3** — never "no interaction found" |
| 4 | **Chinese patent and herbal medicines not covered** | Patent medicine packaging, raw herbs | Medium | Coverage stated honestly |
| 5 | **Speech recognition or synthesis error** | Noisy environment, accent | Low | Text is shown on screen as well; never voice-only |
| 6 | **Over-simplification** | Compressing a complex risk into one sentence | Medium | Wording reviewed line by line by Ella |

<!-- TODO (Ella and Sun): correct this table against the actual implementation and add a frequency column. -->

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
| Low recognition confidence | Goes straight to "please retake"; it does not guess |
| Data not matched | Goes to state 3 |
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
