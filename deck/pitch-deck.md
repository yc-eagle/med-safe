# Pitch Deck — Slide-by-Slide Structure

[English](pitch-deck.md) | [中文](pitch-deck.zh-CN.md)

> **Earlier planning material — corrections applied.** This structure was written before the product was built. Where it conflicts with [`../README.md`](../README.md), [`../docs/decision-logic.md`](../docs/decision-logic.md) or the program, **the implementation wins**.
>
> **Must be corrected on stage:**
> - **Cantonese is prioritised**, not "English first, Cantonese next". English narration appears in the demo video only.
> - **Risk levels are separate**: labelling contraindication / recommends avoid / increased risk / consult first / duplicate ingredient. **Not every warning is "must not be taken together".**
> - When a sourced rule matches, **the product does show the warning**. What it never outputs is a **"safe" conclusion**. A missing rule is a **coverage** status.
> - **Leaflets do contain interaction sections.** Do not say "never mentions".
> - **Zero of the 14 rules are professionally approved.** The product grants no complete permission to combine.
> - The capabilities of general assistants, drug tools and pharmacist services must be **verified one by one**, not summarised as "none of them do" or "only we do".
>
> **Deliverables already produced:** [8-slide editable deck](Med-Safe-HacKU2026.pptx) | [PDF](Med-Safe-HacKU2026.pdf) | [3-minute recording](../assets/demo-3min.mp4) | [public product](https://med-safe-hacku-2026.stashes-primers-4n.chatgpt.site)

> **Owner: Yicheng JIANG** | **Top 8 pitching round, 4 Oct 16:20**
> Running time: **about 6 minutes including Q&A** (8 teams in 80 minutes)
> Companion docs: [`../docs/competitors.md`](../docs/competitors.md) (slide 11) / [`../docs/demo-script.md`](../docs/demo-script.md) (slides 7, 10) / [`../docs/limitations.md`](../docs/limitations.md) and [`../docs/data-handling.md`](../docs/data-handling.md) (slide 13)

---

## Timing budget (read this first)

| Slides | Seconds | Cumulative |
|---|---|---|
| 1-4 Opening and problem | 105 | 1:45 |
| 5 Root cause | 30 | 2:15 |
| 6-7 Solution and live demo | 60 | 3:15 |
| 8-9 Evidence | 90 | 4:45 |
| 10 Offline demo | 15 | 5:00 |
| 11 Competition | 45 | 5:45 |
| 12-13 Impact and risk | 45 | 6:30 |
| 14-15 Next steps and close | 30 | 7:00 |

**Total 7:00 — that is over budget.** If time is tight, cut slides 12 and 14 first (impact and next steps).
**Never cut slides 5, 8, 9, 11 or 13** — those five carry the most marks. Target 5:50 plus Q&A.

---

## Slide 1 — Title

**On the slide**

> # MedSafe
> ### Photograph a medicine box and it tells you whether it can be taken with another.
> ### When it cannot verify something, it says so.
>
> HacKU 2026 — DeepTech Track
> Group 51 — Bauhinia Spheal

**Script (15 s)**
> "One sentence: photograph a medicine box and it tells you whether the two can be taken together. **When it cannot verify something, it says so.**"

**Note:** do not read the title aloud. Say the one sentence and move on immediately.

---

## Slide 2 — Hook

**On the slide**

> ## The pharmacist is not there at 2 a.m.
> ## And not at your kitchen table.

**Script (30 s)**
> "Community pharmacists in Hong Kong have been working on medication management for years. This problem genuinely has people on it.
>
> **But they are not there at two in the morning, and they are not at your kitchen table.**
>
> And when the person looking after an older adult is a **foreign domestic helper who cannot read Chinese**, the leaflet in that box might as well not exist."

**Play the "not covered" card immediately after this slide** (see slide 10) —
establish early that when the rules do not cover a pair, the product says so instead of implying safety. Everything after that becomes credible.

---

## Slide 3 — Who the users are

**On the slide** (two columns)

| **Older adults living alone** | **Foreign domestic helpers** |
|---|---|
| Take several medicines from several different specialists | Handle the pills, the reminders and the clinic visits |
| The doctor explains it once; it is not retained after leaving the room | **Cannot read Chinese** — labels, instructions and appointment slips are blank to her |
| Print on the box is too small; the leaflet is usually lost | What she needs is **verification**, not **diagnosis** |

> **The language gap runs both ways**: the older adult speaks Cantonese, the helper understands English or Tagalog, and there is nothing in between.

**Script (30 s)**

---

## Slide 4 — The real failure chain

**On the slide** (flow)

```
Older adult takes several medicines from several specialists
   |
Doctor explains once, face to face - not retained
   |
At home, a foreign domestic helper handles the pills
   |
She cannot read the Chinese label
   |
Small print, so she makes her own judgement
   |
Duplicated doses / missed doses / self-added medicines
```

> **This is not an efficiency problem. This is a hospital admission problem.**

**Script (30 s)**
> "This is not about efficiency. **Duplicated doses and self-added medicines are how people end up in hospital.**"

---

## Slide 5 — Root cause (this is where the marks are)

> **Scoring:** *Problem Framing* needs *"insight into **root causes**"* for full marks.
> **Describing the symptom earns 3. Naming the root cause earns 5.**

**On the slide**

> ## The knowledge that makes medication safe is locked inside the pharmacy.

Three parts:

| # | Fact | Consequence |
|---|---|---|
| **1** | Checking medication safety requires **professional judgement**, not just lookup | Older adults and helpers **do not have it** |
| **2** | A pharmacist's **hours and location** are limited | **2 a.m., weekends, at home** are all out of reach |
| **3** | Existing tools do **information retrieval**, not **verification** | The place a person actually gets stuck is **never answered** |

> **The problem is not that nobody is managing it. It is that it cannot be reached at the moment it matters.**

**Script (30 s)**
> "So the real problem is not that nobody is managing this. **It is that it cannot be reached at the moment it matters.**
>
> And every existing tool does lookup — you can find the drug, but **nobody answers 'can these two be taken together?'** **The place people get stuck is the judgement.**"

---

## Slide 6 — Solution: confirm, warn, and state what is not covered

**On the slide** (three columns, visually equal — this matters)

| **1. Read it clearly** | **2. Show the sourced warning** | **3. State what is not covered** |
|---|---|---|
| One photo, then **the user confirms the product** | A sourced rule matches, **and the route is in scope** | The rules do not cover this pair |
| Reads out the medicine, with **voice output** (Cantonese first, English available) | **The warning, at its real strength** — labelling contraindication, recommends avoid, or increased risk are different things — plus the source, plus consult a doctor | **"I cannot find information on these two medicines. Please consult a doctor."** |
| It **works** | It is **useful** | It is **honest about its coverage** |

(Boundary case: blurred photo -> retake, choose another image, or enter the registration number. **A photo never confirms identity on its own.**)

**Script (30 s)**
> "Three things happen, and only three.
>
> If it can read the box, it reads it to you — and you confirm it, because **a photograph cannot confirm which medicine this is.**
>
> If a sourced rule matches, it shows you the warning **at the strength the source actually supports.** An increased risk is not the same as a prohibition — warfarin with aspirin is a raised bleeding risk, not a ban.
>
> And if our rules do not cover the pair, **it says so.** It never says 'safe'. **There is no branch in this program that outputs a safe conclusion.**"

**Visual discipline:** the three columns must be **equal in width and weight**. Column 3 is not an exception branch — **it is a coverage statement, and it is the honest half of the product.**

**Do not say** "it refuses to answer when it finds a danger." That is factually wrong: when a rule matches, it warns. What it refuses to produce is a **clean bill of health**.

---

## Slide 7 — Live demo, states 1 and 2

**On the slide:** live demo, or a 20-second looping recording

**What to do:** photograph two boxes on stage -> produce **the warning, at the strength the source supports** (a contraindication and an increased risk are not the same sentence) plus the source

**Script (30 s)**
> "Let me photograph two boxes."
> *Run the demo. Let the result speak. Do not narrate while operating.*

**Discipline**
- Do not talk and click at the same time. Let the judges watch the result.
- It must run first time. Rehearse it three times beforehand.
- If the device fails on stage, **switch to the recording immediately** (keep it on a second device, already open).

---

## Slide 8 — Evidence: real interviews

**On the slide:** **interview clip(s), 20-25 seconds each**

| Clip | Language | What it establishes |
|---|---|---|
| Clip 1 | **Cantonese** | The medication difficulties of a **family caregiver** in a Cantonese-speaking household |
| Clip 2 | **English or Tagalog** | The difficulties of **foreign domestic helpers**, in their own words |

**Script (45 s)**
> "We did not invent this in a room. **We asked a real family caregiver, in Cantonese.**"

### Scope discipline — this is the easiest place to get caught

**Confirmed plan for tonight is one Cantonese-speaking interviewee.** That is one user, not two. A single Cantonese interview **cannot** support a conclusion about foreign domestic helpers, who speak English or Tagalog.

- **If only the Cantonese clip is filmed** (do not extend the claim): say only that this shows **the information is lost at the moment it is handed over**, and support the helper's situation **separately, from documented facts** — she handles the pills, she cannot read Chinese labels, and the product's speech output exists because of her. **Do not attribute the Cantonese speaker's words to a helper.**
- **If a second English or Tagalog clip is filmed:** the two-clip slide works as written, and you can speak to both users.

**Also: the Cantonese speaker's background is Macau Cantonese**, which differs from Hong Kong Cantonese in vocabulary and usage. Introduce the clip accurately:

> Say: **"a Cantonese-speaking family caregiver."**
> Do **not** say: **"a Hong Kong local."**

> Using one piece of evidence to support two conclusions is **over-claiming**. One question from a judge exposes it.
>
> **Three honest alternatives if the English clip does not happen are set out in [`../assets/interviews/README.md`](../assets/interviews/README.md) section 2**, including bringing Lin MA in on camera as expert framing — clearly labelled as expert opinion, **not** as user evidence.

---

## Slide 9 — Evidence: manual method versus the tool

**On the slide** (side by side)

| **Today: the manual method** | **MedSafe** |
|---|---|
| Read the box -> cannot understand -> find the leaflet -> cannot remember -> phone a family member -> they are unsure too -> wait for the next appointment | Photograph -> read the result |
| **Steps: __** / **Time: __** | **Steps: __** / **Time: __** |
| **The end point is often still "I don't know"** | The end point is a definite answer, or an honest "I cannot find it" |

**Script (45 s)**
> "The problem statement asks us to compare against the manual method.
>
> You work through the whole chain — read the box, find the leaflet, phone someone, wait for the appointment — and **very often you still end up not knowing.**
>
> **The real difference is not the __ seconds saved. It is where you end up**: either a warning with a source, or an honest 'not covered'. **The manual method never tells you that it does not know.**"

**The blank numbers must be filled in before the rehearsal** (see [`../docs/evidence-protocol.md`](../docs/evidence-protocol.md)). An empty field on a slide is far worse than an unimpressive number.

### Verified numbers you can state with confidence

These come from the repository, not from a slide. **Use them — precise numbers are far more convincing than adjectives**, and every one of them is checkable by a judge in [`../data/data_inventory.json`](../data/data_inventory.json).

| Number | What it is |
|---|---|
| **14,269** | Hong Kong registered products in the catalogue (snapshot 2026-09-25) |
| **23,835** / **2,081** | raw ingredient records / distinct ingredient strings |
| **14** | sourced rules — **all drafts** |
| **0** | professionally approved rules |
| **12** / **66** | maximum products per check / pairs enumerated per check |
| **101.8 million** | approximate product pairs in the catalogue — **why 14 rules cannot claim to cover it** |
| **47** / **52.6 MiB** | offline cached resources / total size |
| **16** | offline engineering checks passed |

**Two things about how to use these:**

1. **State the "0" yourself.** Saying "zero of our 14 rules are professionally approved, and here is the review table" is much stronger than being caught out by it. It is also the honest thing to do.
2. **Do not say "the most complete".** Saying "14,269 products but roughly 101.8 million possible pairs, so we make no claim of completeness" demonstrates that you understand your own data. That is a maturity signal judges reward.

---

## Slide 10 — Offline demo

**On the slide**

> ## No signal. It still works.

**What to do:** **disconnect the network on stage** (unplug the cable, turn off Wi-Fi) and run slide 7's demo again.

**Script (15 s)**
> "One of the barriers in the problem statement is having no connection. So **I am going to disconnect the network and run it again.**"

**Why this slide is worth the 15 seconds**
- It turns the barrier from a **claim** into a **fact**.
- It demonstrates two things judges care about at once: **that we actually solved the barrier**, and **that we know where our own boundaries are**.
- **Highest return of any 15 seconds in the pitch.**

**Rehearse it.** If any capability degrades when offline, **say so yourself** rather than letting a judge find it.

---

## Slide 11 — Competition (our weakest area; must be prepared)

> **Scoring:** *"Excellent competitive understanding with a highly convincing unique positioning."*
> **Full text in [`../docs/competitors.md`](../docs/competitors.md); the spoken script is in section 4 of that file.**

**On the slide** (five rows)

| | What it does | **The gap** |
|---|---|---|
| General-purpose AI assistants | Anything you ask | 1. Do not know local drug names<br>2. Need a connection<br>3. **Answer confidently and wrongly** |
| The leaflet in the box | Official and accurate | 1. Covers that medicine in clinical language<br>2. **The people who need it cannot read it** |
| Drug information tools / eHealth | Authoritative information and records | 1. **Give information, not judgement**<br>2. Require login<br>3. Assume literacy |
| Community and remote pharmacist services | **Real professional judgement** | **Requires a phone call, service hours, and authorisation** |
| **MedSafe** | **Gives a judgement at that moment, and marks where it is unsure** | We do **not** replace the pharmacist |

**Script (45 s)**
> Use the spoken script in section 4 of [`../docs/competitors.md`](../docs/competitors.md).

**The closing line is the best sentence in the whole pitch:**

> **"Hong Kong does not lack expertise. It lacks expertise at the moment it is needed."**

---

## Slide 12 — Impact and scale

**On the slide**
- How common polypharmacy is among older adults in Hong Kong
- The share of foreign domestic helpers in household care in Hong Kong
- **This is a decision that happens every day, not a one-off event**

**Script (30 s)**

**If time is short, this is the first slide to cut.**

---

## Slide 13 — Risk awareness (explicitly scored)

> **Scoring:** *Impact, Feasibility & Future Vision* requires **"risk awareness"** for full marks.
> **This slide is those marks.**

**On the slide**

**What it gets wrong:**
- Blurred photo, similar packaging -> misidentification -> **retake, choose another image, or enter the registration number; the user confirms**
- Combination products, supplements -> uncertain ingredient recognition -> **listed as a gap; identity still requires user confirmation**
- The rules do not cover the pair -> **states "not covered"; it never states "no interaction found"**
- Chinese patent medicines, herbal medicines, supplements, food, and what was already taken today -> **outside current scope, stated as such**
- **No number filled in without real data** — including error rates

**What leaves the device:**
- In the browser, photographs are recognised **on the device**
- In the Mac version, photographs and recordings go only to a **local service on the same machine**, and temporary files are deleted with the request
- **Browser speech may send recordings to the browser vendor** — disclosed separately, consent requested each time

**Script (30 s)**
> "We also say clearly what we cannot do.
>
> **Its most dangerous moment is not getting an answer wrong. It is turning 'we don't know' into 'it's fine.'** So **every result carries two flags: clinical safety not assessed, and coverage not complete. There is no code path that issues a safe conclusion.**
>
> Two more things. **Zero of our 14 rules are professionally approved** — that column is still empty, and here is the review table. And **the photograph does not leave the device.** A photograph of medicines is personal health information."

**This slide and the core product design are the same thing.** Connect them when speaking:
**we acknowledge our boundaries in the product, so we acknowledge our boundaries in the pitch.**

---

## Slide 14 — Next steps

**On the slide**
- **Cantonese is already prioritised**; English is available for foreign domestic helpers
- Wider coverage: Chinese patent medicines, herbal medicines, supplements
- **Getting the 14 rules professionally reviewed** — the approval column is currently empty
- Real-device phone testing and observation with real older adults
- Channels: community pharmacies, elderly centres, domestic helper agencies

**Script (15 s)**

**Cut together with slide 12 if time is short.**

---

## Slide 15 — Close

**On the slide**

> # Its most important feature
> # is that it says "I don't know."

**Script (15 s)**
> "Every AI today is very good at talking. **We built one that says when it doesn't know.**"

**Then stop.** Do not add anything, do not apologise, do not explain further. **Let it sit.**

---

## Roles

| Person | Role |
|---|---|
| **Yicheng JIANG** | **Main speaker** — wins on structure, not on accent |
| **Lin MA** | Answers medical and user questions; **plays the caregiver in the slide 7 demo** |
| **Shuoyang SUN** | Answers technical questions |

Everyone answers their own area. Nobody talks over anybody.

---

## The three questions judges will ask

| Question | Who answers | Key points |
|---|---|---|
| **"Where does the data come from?"** | Shuoyang SUN | Specific sources, licence, coverage ([`../CREDITS.md`](../CREDITS.md)) |
| **"How much does the database cover? What if you cannot find it?"** | Lin MA / Shuoyang SUN | Point to state 3: **if it cannot find it, it says so**, and state the coverage boundary ([`../docs/rules/README.md`](../docs/rules/README.md), section 6) |
| **"What if it is wrong?"** | Lin MA | Point to [`../docs/limitations.md`](../docs/limitations.md) |

---

## Final check and rehearsal (4 Oct morning)

- [ ] 15 slides, **PDF exported** into this directory
- [ ] The two numbers on slide 9 **are filled in** (steps and time)
- [ ] Slide 5 states a **root cause**, not a symptom
- [ ] Slide 8 clips **are edited**, and the conclusion's scope matches the language of the footage
- [ ] Slide 11 comparison **has been verified** (see the TODO list in [`../docs/competitors.md`](../docs/competitors.md), section 6)
- [ ] Slide 13 covers "what it gets wrong" and "what leaves the device"
- [ ] **Timed run-through, under 5:50**
- [ ] Offline demo **has been rehearsed**
- [ ] Second device ready to take over immediately
