# Pitch Deck — Slide-by-Slide Structure

[English](pitch-deck.md) | [中文](pitch-deck.zh-CN.md)

> **Owner: Yicheng (YC)** | Target: **final by tonight (3 Oct)** | **Top 8 pitching round, 4 Oct 16:20**
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

**Play the "decline" card immediately after this slide** (see slide 10) —
establish early that the system refuses to answer when it cannot verify. Everything after that becomes credible.

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

## Slide 6 — Solution: a three-state machine

**On the slide** (three columns, visually equal — this matters)

| **1. Translate** | **2. Signal danger** | **3. Decline to answer** |
|---|---|---|
| One photo, recognised | Multiple photos, **interaction found** | Multiple photos, **combination not in our data** |
| Reads out the medicine, with **voice output** (English / Cantonese) | **"These two must not be taken together."** Plus source, plus consult a doctor | **"I cannot find information on these two medicines. Please consult a doctor."** |
| It **works** | It is **useful** | It is **trustworthy** |

(Boundary case: blurred photo → "I cannot read this photo clearly. Please take another one.")

**Script (30 s)**
> "The interaction has three states.
>
> If it can read the box, it reads it to you. **If it finds a danger, it tells you plainly not to take them together. If it cannot find anything, it says it cannot find anything.**
>
> **These three are not error handling — they are the product.**"

**Visual discipline:** the three columns must be **equal in width and weight**. Do not let state 3 look like an exception branch. It is a design decision, not a fallback.

---

## Slide 7 — Live demo, states 1 and 2

**On the slide:** live demo, or a 20-second looping recording

**What to do:** photograph two boxes on stage → produce **"these two must not be taken together"** plus the source

**Script (30 s)**
> "Let me photograph two boxes."
> *Run the demo. Let the result speak. Do not narrate while operating.*

**Discipline**
- Do not talk and click at the same time. Let the judges watch the result.
- It must run first time. Rehearse it three times beforehand.
- If the device fails on stage, **switch to the recording immediately** (keep it on a second device, already open).

---

## Slide 8 — Evidence: real interviews

**On the slide:** **two interview clips, 20-25 seconds each**

| Clip | Language | What it establishes |
|---|---|---|
| Clip 1 | **Cantonese** | The medication difficulties of older adults and family caregivers |
| Clip 2 | **English** | The difficulties of foreign domestic helpers |

**Script (45 s)**
> "We did not invent this in a room. **We asked real people in Hong Kong.**"

**Scope discipline — this is the easiest place to get caught**

- If you **only filmed the Cantonese clip**: do **not** extend the conclusion to foreign domestic helpers. Say only that "this shows the information is lost at the moment it is handed over."
- If you **filmed both**: the evidence chain is complete and you can speak to both users confidently.

> Using one piece of evidence to support two conclusions is **over-claiming**. One question from a judge exposes it.

---

## Slide 9 — Evidence: manual method versus the tool

**On the slide** (side by side)

| **Today: the manual method** | **MedSafe** |
|---|---|
| Read the box → cannot understand → find the leaflet → cannot remember → phone a family member → they are unsure too → wait for the next appointment | Photograph → read the result |
| **Steps: __** / **Time: __** | **Steps: __** / **Time: __** |
| **The end point is often still "I don't know"** | The end point is a definite answer, or an honest "I cannot find it" |

**Script (45 s)**
> "The problem statement asks us to compare against the manual method.
>
> You work through the whole chain — read the box, find the leaflet, phone someone, wait for the appointment — and **very often you still end up not knowing.**
>
> **The real difference is not the __ seconds saved. It is where you end up**: either a judgement, or an honest 'I cannot find it'. **The manual method never tells you that it does not know.**"

**The blank numbers must be filled in before the rehearsal** (see [`../docs/evidence-protocol.md`](../docs/evidence-protocol.md)). An empty field on a slide is far worse than an unimpressive number.

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
| The leaflet in the box | Official and accurate | 1. Covers one medicine only<br>2. **Never mentions taking it with something else** |
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
- Blurred photo, similar packaging → misidentification → **degrades to "please retake"**
- Combination products, supplements → uncertain ingredient recognition → **goes to state 3**
- Insufficient data coverage → **goes to state 3; never states "no interaction found"**
- Chinese patent medicines and herbal medicines → limited coverage, **stated as such**

**What leaves the device:**
- By default **everything runs on the device** — photographs do not leave the phone
- Photographs of medicines are personal health information and should not be uploaded without need

**Script (30 s)**
> "We also say clearly what we cannot do.
>
> **Its most dangerous moment is not getting an answer wrong. It is turning 'I don't know' into 'it's fine.'** So when it cannot find anything, it has exactly one behaviour: **send you to a pharmacist.**
>
> And one more thing: **the photograph never leaves the phone.** A photograph of medicines is personal health information."

**This slide and the core product design are the same thing.** Connect them when speaking:
**we acknowledge our boundaries in the product, so we acknowledge our boundaries in the pitch.**

---

## Slide 14 — Next steps

**On the slide**
- Cantonese version (English is prioritised now, for domestic helpers)
- Wider coverage of Chinese patent medicines and herbal medicines
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
| **YC** | **Main speaker** — wins on structure, not on accent |
| **Ella** | Answers medical and user questions; **plays the caregiver in the slide 7 demo** |
| **Sun** | Answers technical questions |

Everyone answers their own area. Nobody talks over anybody.

---

## The three questions judges will ask

| Question | Who answers | Key points |
|---|---|---|
| **"Where does the data come from?"** | Sun | Specific sources, licence, coverage ([`../CREDITS.md`](../CREDITS.md)) |
| **"How much does the database cover? What if you cannot find it?"** | Ella / Sun | Point to state 3: **if it cannot find it, it says so**, and state the coverage boundary ([`../docs/rules/README.md`](../docs/rules/README.md), section 6) |
| **"What if it is wrong?"** | Ella | Point to [`../docs/limitations.md`](../docs/limitations.md) |

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
