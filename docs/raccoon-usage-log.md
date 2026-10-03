# Development Tool Usage Log: SenseTime Raccoon Work

> **Internal working document**, written in English for consistency with the rest of the repository.

> **Earlier planning material — corrections applied.** Written before the product was built. Where this file conflicts with [`../README.md`](../README.md), [`../docs/decision-logic.md`](../docs/decision-logic.md) or the program, **the implementation wins**.
>
> - **The interface opens in English**, with Mandarin and Cantonese selectors (`?lang=en|cmn|yue`). Language and voice availability are separate settings. Changing language converts display text only; catalogue values, source records and clinical rules are unchanged.
> - **Risk levels are separate** (labelling contraindication / recommends avoid / increased risk / consult first / duplicate ingredient). Not every warning is "must not be taken together".
> - When a sourced rule matches, **the product does show the warning**. It never outputs a **"safe" conclusion**; a missing rule is a **coverage** status.
> - **All 14 rules were clinician-reviewed on 2026-10-03, with a named reviewer per rule.** The review covers wording, sourcing and scope, not a validated clinical risk model.
> - Capabilities of third-party products and services must be verified individually, not generalised.
> **Owner: Lin MA.**
> **Why keep it:** the HacKU 2026 *Raccoon Work Technical Sponsor Award* requires a short declaration in the submission form explaining how it was used.
> **Append a row every time it is used.** Screenshots in particular cannot be reconstructed afterwards.

---

## Record format

```
## YYYY-MM-DD HH:MM | Purpose: <research / data analysis / writing / coding assistance>
- Input:
- Raccoon output: (summary + screenshot filename)
- How we verified it:
- Verdict: ADOPTED / PARTIALLY ADOPTED / REJECTED
- Screenshot: `raccoon-shots/0X-<name>.png`
```

---

## Records

**Do not invent records. Only write down what actually happened.**

Lin MA has provided Doubao and Raccoon share links, but **the conversation bodies could not be retrieved by automated tooling**, so they currently count only as *links received*. That is not evidence of tool use, and it must not be presented as completed validation of AI output. See [`submission.md`](submission.md).

---

## A. Verifiable engineering evidence already in the repository

These artifacts exist and can be checked by anyone. **They are candidates for the "three concrete uses" below — but only claim a use if it actually happened.**

| Artifact | What it shows | Where to check |
|---|---|---|
| Data pipeline and cleaned catalogue | **14,269 products**, 23,835 product-ingredient rows, 2,081 distinct ingredient strings, plus XSD validation, zero duplicate registration numbers, SQLite integrity check | [`data-pack/validation/data_checks.json`](../data-pack/validation/data_checks.json), [`tools/build_data.py`](../tools/build_data.py) |
| Deterministic rule engine | Pairwise enumeration up to 66 pairs, five separate evidence levels, output labels including `no_rule_found` and `route_review_required` | [`app/engine.js`](../app/engine.js), [`decision-logic.md`](decision-logic.md) |
| Offline runtime | 53 cached resources, about 52.7 MiB, offline reopen, lookup, rules and OCR | [`app/sw.js`](../app/sw.js), [`app/offline-runtime.js`](../app/offline-runtime.js) |
| Test suite | 11 test files covering engine, patient wording, validator, multi-medicine, product features, voice, browser and public release | [`tests/`](../tests) |
| QA and verification harness | 16 core engineering checks, 9 redirect checks, published mobile offline check | [`qa/`](../qa) |
| AI output validation page | Compares raw AI output against independently confirmed catalogue fields, then checks rules separately | [`app/verify.html`](../app/verify.html) |
| CI | Automated checks on push | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) |

---

## B. What Lin MA still needs to write

**Target: at least 5 records, of which at least 1 is REJECTED.** Each record must be a real event with a screenshot.

| # | Candidate use | Suggested verification method | Status |
|---|---|---|---|
| 1 | Research on the offline inference stack | Check the claim against the shipped `app/offline-runtime.js` behaviour | to confirm |
| 2 | Data preparation for the interaction lookup | Check the output against [`data-pack/validation/data_checks.json`](../data-pack/validation/data_checks.json) counts | to confirm |
| 3 | Drafting the validation rules document | Check against [`rules/review.csv`](rules/review.csv) | to confirm |
| 4 | Coding assistance | Check against the test suite passing | to confirm |
| 5 | **Normalising a drug name to its generic form** | ⭐ **Look it up in `ingredient_aliases.json`.** If it does not match, that is the REJECTED case | to confirm |

### The REJECTED case is the one that matters most

The award criterion is *Implementation & Completeness*, **one component of which** is validation of AI-generated outputs. **Writing "we verified it" is not enough; there must be a specific event.** (Note: this must not be described as "AI validation is worth 30 percent".)

**The cheapest way to produce one — and it is not extra work:**

```
1. Ask Raccoon to normalise a drug name to its generic form   -> screenshot the output
2. Look it up in data-pack/data/ingredient_aliases.json        -> if absent, screenshot the miss
3. Record what we used instead
4. Verdict: REJECTED
```

**Do not manufacture a failure.** If every output happened to be correct, record that honestly and say so. The point is that we checked, not that something broke.

---

## C. Draft text for the submission form

**Fill in the bracketed slots only with events that are real and screenshot-backed.** Delete any slot you cannot support rather than softening it.

```markdown
## Use of SenseTime Raccoon Work

We used Raccoon Work as a working tool during development - for research
lookup, data preparation, documentation, and coding assistance. It is a
development aid, not a runtime dependency of our product: our system is
designed to work offline, so nothing in the delivered prototype calls
Raccoon.

Three concrete uses:
1. <use one - must be a real event with a screenshot>
2. <use two>
3. <use three>

We treated Raccoon's output as input to be verified, not as a conclusion to
be shipped. One example: we asked it to normalise a <drug name> to its
generic form; the output did not match our lookup in
data-pack/data/ingredient_aliases.json, so we did not adopt it and used
<our own normalisation> instead. Screenshots of the request, the output, the
failed lookup, and our substitute are in `raccoon-shots/`.

This is consistent with our project's position: an AI tool for medication
safety should say "I cannot verify this" rather than guess.
```

---

## Completion check

- [ ] At least **5** records
- [ ] At least **1 REJECTED**, with **3 screenshots** (output, failed lookup, our substitute)
- [ ] All screenshots in `raccoon-shots/`, filenames matching the records
- [ ] Submission form text written, and the event it cites matches the screenshots