# Demo Script: The Three Cards

> **Internal working document**, written in English for consistency with the rest of the repository. A Chinese reference version can be added on request. A Chinese spoken script for the judges' questions is available at the end of this file.

> **Earlier planning material — corrections applied.** Written before the product was built. Where this file conflicts with [`../README.md`](../README.md), [`../docs/decision-logic.md`](../docs/decision-logic.md) or the program, **the implementation wins**.
>
> - **Cantonese is prioritised** for the primary users; English narration appears in the demo video only.
> - **Risk levels are separate** (labelling contraindication / recommends avoid / increased risk / consult first / duplicate ingredient). Not every warning is "must not be taken together".
> - When a sourced rule matches, **the product does show the warning**. It never outputs a **"safe" conclusion**; a missing rule is a **coverage** status.
> - **Zero of the 14 rules are professionally approved.**
> - Capabilities of third-party products and services must be verified individually, not generalised.

> **Owner: Yicheng JIANG.** Used for the **4 Oct exhibition hour** (technical judges score the Exhibition, 30 marks, which decides who reaches the Top 8) and for the **4 Oct 16:20 pitching round**.
> The 3-minute demo video recorded tonight (3 Oct) follows the same script.

---

## Core principle

**Demonstrate four actions and nothing else:**

```
1. Photograph
2. Read out
3. Verify
4. Give the source
```

**Do not demo these:** account registration, history, dose reminders, dosage calculation, language switching, charts.
**Each feature added costs one rehearsal.**

---

## 1. The three cards

| Card | Material | What it shows | Time | Proves |
|---|---|---|---|---|
| **1. Read it clearly** | One **common medicine** | Photograph it, **let the user confirm the product**, read out the information | about 40 s | It **works** |
| **2. Show the sourced warning** | **Two** medicines with a rule | Photograph them, show the warning **at its real strength** (increased risk or contraindication), plus the source, plus consult a doctor | about 60 s | It is **useful** (the high point) |
| **3. State what is not covered** | **A pair the 14 rules do not cover** | Photograph them, **"not covered — please consult a doctor"** | about 30 s | It is **honest about its coverage** |

### Three rehearsal rules

1. **Card 3 must appear once in the first 30 seconds.** Establish early that uncovered pairs are stated as uncovered, so everything after it is credible.
2. **Never present cards 2 and 3 back to back as one idea.** Card 2 shows a **sourced warning**; card 3 states a **coverage boundary**. **Presented together, both are lost.**
3. **Demonstrate offline once.** Unplug the network and run it. It is the only way to turn "no signal" from a claim into a fact.

### What must NOT be said on stage

- Do **not** say "it refuses to answer when it finds a danger." **When a rule matches, it does warn.** What it never outputs is a **safe** conclusion.
- Do **not** say "these two must not be taken together" for an **increased-risk** rule. Warfarin plus aspirin is a raised bleeding risk, **not a ban**, and aspirin plus clopidogrel may be a **doctor's deliberate regimen** — the product does not advise stopping it.
- Do **not** say the leaflet "never mentions" interactions. It does; the problem is readability.
- Do **not** claim any rule is clinically approved. **Zero of the 14 are.**

---

## 2. Props

- [ ] **3 real medicine boxes** (physical packaging, not images)
  - [ ] One common medicine (card 1)
  - [ ] A pair with a sourced rule (card 2) — **Lin MA must confirm which evidence level it is**, and the wording must match that level
  - [ ] A pair the rules do **not** cover (card 3) — confirm it is genuinely **not** in the 14 rules
- [ ] Phone or laptop for the demo, **fully charged**
- [ ] Power bank
- [ ] **A second device** ready to take over immediately
- [ ] Phone hotspot (do not rely on venue Wi-Fi)
- [ ] A printed copy of "what we do not model" (`limitations.md`)

---

## 3. At the exhibition (4 Oct 14:40-15:40)

**The DeepTech track has many teams and only 60 minutes. Judges spend under a minute at an average booth.**

### Booth text (do not skip this)

One line a judge can read in three seconds:

> ### Photograph a medicine box and it tells you whether it can be taken with another.
> ### When it cannot verify something, it says so.

### Let the judges drive it

**Do not demonstrate at them. Hand over the phone.**

> "Try photographing any box."

**That one action beats three minutes of explanation.** And "can a stranger use it in 60 seconds" is itself a live test of the *Solution & Human-Centered Design* criterion.

---

## 4. Pitching round (4 Oct 16:20, Top 8, about 6-7 minutes including Q&A)

The full slide-by-slide structure, timing and scripts are in [`../deck/pitch-deck.md`](../deck/pitch-deck.md). Roles:

- **Main speaker: Yicheng JIANG.** Wins on structure, not on accent.
- **Lin MA:** answers medical and user questions; **plays the caregiver in the slide 7 demo.**
- **Shuoyang SUN:** answers technical questions.

Everyone answers their own area. Nobody talks over anybody.

---

## 5. The three questions judges will ask

| Question | Who answers | Key points |
|---|---|---|
| "Where does the data come from?" | Shuoyang SUN | Specific sources, licence, coverage ([`../CREDITS.md`](../CREDITS.md)) |
| "How much does it cover? What if you cannot find it?" | Lin MA / Shuoyang SUN | Point to state 3: **if it cannot find it, it says so**, and state the boundary ([`rules/README.md`](rules/README.md), section 6) |
| "What if it is wrong?" | Lin MA | Point to [`limitations.md`](limitations.md) |

---

## 6. Rehearsal check (4 Oct morning)

- [ ] All three cards run in sequence, timed
- [ ] **Network unplugged and run once** (offline path)
- [ ] Someone who did not build it tries it — can they use it in 60 seconds
- [ ] Full 6-minute pitch walked through, timed
- [ ] Demo device at 100 percent, power bank packed
- [ ] Second device ready to take over
- [ ] Booth text printed

---

## 7. Chinese reference for the three answers

**「数据从哪来？」** 具体数据源名称、许可证类型、覆盖范围。答不上来源的数据源不要用。

**「库覆盖多少？查不到怎么办？」** 直接引到状态 3：**查不到就说查不到**，并主动说明覆盖边界（哪些情况一定查不到）。这一问是送分的，不要答成"我们还在补"。

**「它错了怎么办？」** 分三类答：识别错 -> 降级为请重拍；数据没命中 -> 走状态 3；措辞歧义 -> 由 Lin MA 逐条审查过。然后补一句"我们不做诊断，也不给剂量建议"。