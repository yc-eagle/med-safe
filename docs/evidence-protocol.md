# Evidence Protocol

> **Internal working document**, written in English for consistency with the rest of the repository.

> **Earlier planning material — corrections applied.** Written before the product was built. Where this file conflicts with [`../README.md`](../README.md), [`../docs/decision-logic.md`](../docs/decision-logic.md) or the program, **the implementation wins**.
>
> - **Cantonese is prioritised** for the primary users; English narration appears in the demo video only.
> - **Risk levels are separate** (labelling contraindication / recommends avoid / increased risk / consult first / duplicate ingredient). Not every warning is "must not be taken together".
> - When a sourced rule matches, **the product does show the warning**. It never outputs a **"safe" conclusion**; a missing rule is a **coverage** status.
> - **Zero of the 14 rules are professionally approved.**
> - Capabilities of third-party products and services must be verified individually, not generalised.

> The problem statement's EVIDENCE requirement is scored item by item:
>
> *"Compare against the setting's current **manual method**, or a simple substitute — **the steps and the time** — and show what the capability contributes that the manual method cannot. State **what it costs**, **what it gets wrong**, and **what leaves the device**."*
>
> **Owner: Ella (items 1 and 2), Sun (items 3 and 5).**

---

## 1. The comparison: the existing manual method

**The problem statement asks for a comparison, not a single data point.**

| # | Step | Time | Note |
|---|---|---|---|
| 1 | Pick up the box, read the label | | |
| 2 | Cannot understand it, find the leaflet | | |
| 3 | Cannot remember, phone a family member | | |
| 4 | They are unsure too, wait for the next appointment | | |
| 5 | **Still uncertain at the end** | | This is the key one: the manual method often ends in "I still do not know" |

**Total time for the manual method: ______**

**Our method:**

| # | Step | Time |
|---|---|---|
| 1 | Photograph | |
| 2 | Read the result | |
| | **Total** | |

### The three numbers that must be recorded

1. **Steps and total time for the manual method**
2. **Steps and total time for our method**
3. **The manual method's "still uncertain" rate** — after going through the whole chain, what proportion of people **still do not have an answer**

> **Number 3 matters more than 1 and 2.** The real gap is not the seconds saved. It is that
> **the manual method often ends in "I still do not know", while ours ends in either a definite judgement or an honest "I cannot find it".**
> That is what the manual method cannot contribute.

---

## 2. What the manual method cannot do

State this explicitly, and make it **verifiable**:

- [ ] The manual method **cannot verify interactions across three or more medicines in under a minute**
- [ ] The manual method **cannot know** what is inside a box that looks like a supplement
- [ ] The manual method has **no consistent source** — it runs on memory and impression — whereas **every judgement we produce carries a source**
- [ ] **The manual method never tells you it does not know** — people tend to give a confident but wrong answer

---

## 3. What it costs

<!-- TODO (Sun) -->

| Item | Cost | Note |
|---|---|---|
| On-device inference hardware requirement | _TODO_ | Can it run on an ordinary phone or laptop |
| Size of the offline data pack | _TODO_ | Determines whether offline is realistic |
| Cost per call when online | _TODO_ | Estimated |
| Development and maintenance | _TODO_ | State it honestly |

---

## 4. What it gets wrong

See [`limitations.md`](limitations.md).

---

## 5. What leaves the device

See [`data-handling.md`](data-handling.md).

---

## 6. First-hand interviews

See [`../assets/interviews/`](../assets/interviews/).

**Both are required** (see the explanation in that directory):

| Material | Language | What it establishes | Status |
|---|---|---|---|
| Interview 1 | **Cantonese** | The medication difficulties of older adults | _TODO_ |
| Interview 2 | **English** | The difficulties of foreign domestic helpers | _TODO_ |

> **If only one was filmed, narrow the conclusion in the pitch.**
> Using Cantonese-only evidence to make a claim about foreign domestic helpers is over-claiming, and one question from a judge exposes it.

---

## 7. Completion check

- [ ] Manual method versus tool: **steps and time** recorded, including the "still uncertain" rate
- [ ] "What the manual method cannot do" written as **verifiable statements**, not adjectives
- [ ] Costs stated
- [ ] `limitations.md` (what it gets wrong) completed
- [ ] `data-handling.md` (what leaves the device) completed
- [ ] Both interviews filmed, or the conclusion narrowed in the pitch