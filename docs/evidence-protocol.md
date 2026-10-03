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
> **Owner: Lin MA (items 1 and 2), Shuoyang SUN (items 3 and 5).**

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

Source: [`../COST_AND_DATA_FLOW.md`](../COST_AND_DATA_FLOW.md). The honest headline is that **the recurring cost is low and the missing resources are the real cost.**

| Item | Cost | Note |
|---|---|---|
| Per-question API cost | **None** | Catalogue search and the deterministic rules run in the browser with **no per-question paid API** |
| Offline data pack | **47 resources, about 52.6 MiB** | The mobile offline cache. Initial download, decompression, memory and latency vary by device |
| On-device inference requirement | **No GPU or model needed for the core path.** Browser OCR uses bundled Tesseract WASM and the English / Traditional Chinese data | Runs on an ordinary laptop; performance on low-end phones is untested |
| Optional local speech model | **About 0.7 GB**, downloaded once on an Apple Silicon Mac only | `mlx-community/Qwen3-ASR-0.6B-4bit`, fixed revision, installed into a separate runtime. **First installation is not an offline operation** |
| Static hosting | Provider limits and terms apply | The prototype **does not promise free hosting indefinitely, nor a production service-level agreement** |
| **DrugBank commercial licence** | **Not held** | A missing resource, not a zero-cost resource already obtained |
| **Full clinical interaction subscription** | **Not held** | As above |
| **Clinician-approved comprehensive rule set** | **Not held** | As above. This is human work, not a download |
| Development and maintenance | Not a stable figure | Do not quote one |

> **Say this plainly if asked:** machine-downloadable catalogue and model work is complete for the current scope; **professional product review, rule review and real-world evaluation remain human work and are not done.**

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
| Interview 1 | **Cantonese** | The medication difficulties of family caregivers in a Cantonese-speaking household | **Scheduled for tonight.** One Cantonese-speaking interviewee (Macau Cantonese). Not yet filmed |
| Interview 2 | **English or Tagalog** | The difficulties of foreign domestic helpers, in their own words | **Not scheduled.** Cannot be inferred from Interview 1 |

> **If only Interview 1 is filmed, narrow the conclusion in the pitch.**
> Using Cantonese-only evidence to make a claim about foreign domestic helpers is over-claiming, and one question from a judge exposes it.
> **See [`../assets/interviews/README.md`](../assets/interviews/README.md) section 2 for three honest alternatives.**
>
> **Also note the variety of Cantonese:** Macau Cantonese is a Cantonese variety but not identical to Hong Kong Cantonese. Present the interviewee as "a Cantonese-speaking family caregiver", not as "a Hong Kong local".

---

## 7. Completion check

- [ ] Manual method versus tool: **steps and time** recorded, including the "still uncertain" rate
- [ ] "What the manual method cannot do" written as **verifiable statements**, not adjectives
- [ ] Costs stated
- [ ] `limitations.md` (what it gets wrong) completed
- [ ] `data-handling.md` (what leaves the device) completed
- [ ] Both interviews filmed, or the conclusion narrowed in the pitch