# Development Tool Usage Log: SenseTime Raccoon Work

> **Internal working document**, written in English for consistency with the rest of the repository.

> **Earlier planning material — corrections applied.** Written before the product was built. Where this file conflicts with [`../README.md`](../README.md), [`../docs/decision-logic.md`](../docs/decision-logic.md) or the program, **the implementation wins**.
>
> - **Cantonese is prioritised** for the primary users; English narration appears in the demo video only.
> - **Risk levels are separate** (labelling contraindication / recommends avoid / increased risk / consult first / duplicate ingredient). Not every warning is "must not be taken together".
> - When a sourced rule matches, **the product does show the warning**. It never outputs a **"safe" conclusion**; a missing rule is a **coverage** status.
> - **Zero of the 14 rules are professionally approved.**
> - Capabilities of third-party products and services must be verified individually, not generalised.
> **Owner: Ella.**
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

<!-- TODO (Ella): append below. Target: at least 5 records, of which at least 1 is REJECTED. -->

## 2026-10-03 __:__ | Purpose: ___ (example row, replace it)
- Input:
- Raccoon output:
- How we verified it:
- Verdict:
- Screenshot:

---

## Target: at least one verified-and-rejected case

The award criteria are **30 percent *validation of AI-generated outputs*** — **writing "we verified it" is not enough; there must be a specific event.**

### The cheapest way to produce one

```
1. Ask Raccoon to normalise a drug name to its generic form   -> screenshot the output
2. Look it up in our own rule data                            -> not found, screenshot
3. Record: we used our own normalisation instead
4. Verdict: REJECTED
```

**This is the highest-return 20 minutes of the whole project**, because it is not extra work — it is **the verification we have to do anyway, with a screenshot taken at the same time.**

### Draft text for the submission form

```markdown
## Use of SenseTime Raccoon Work

We used Raccoon Work as a working tool during development - for research
lookup, data preparation, documentation, and coding assistance. It is a
development aid, not a runtime dependency of our product: our system is
designed to work offline, so nothing in the delivered prototype calls
Raccoon.

Three concrete uses:
1. <use one>
2. <use two>
3. <use three>

We treated Raccoon's output as input to be verified, not as a conclusion to
be shipped. One example: we asked it to normalise a <drug name> to its
generic form; the output did not match our rule lookup, so we did not adopt
it and used <our own normalisation> instead. Screenshots of the request, the
output, the failed lookup, and our substitute are in `raccoon-shots/`.

This is consistent with our project's position: an AI tool for medication
safety should say "I cannot verify this" rather than guess.
```

---

## Completion check

- [ ] At least **5** records
- [ ] At least **1 REJECTED**, with **3 screenshots** (output, failed lookup, our substitute)
- [ ] All screenshots in `raccoon-shots/`, filenames matching the records
- [ ] Submission form text written, and the event it cites matches the screenshots