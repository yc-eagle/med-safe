# Demo Script: The Three Cards

> **Internal working document**, written in English for consistency with the rest of the repository. A Chinese reference version can be added on request. A Chinese spoken script for the judges' questions is available at the end of this file.

> **Owner: YC.** Used for the **4 Oct exhibition hour** (technical judges score the Exhibition, 30 marks, which decides who reaches the Top 8) and for the **4 Oct 16:20 pitching round**.
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
| **1. Translate** | One **common medicine** | Photograph it, read out the information, English voice output | about 40 s | It **works** |
| **2. Signal danger** | **Two** medicines with an interaction | Photograph them, **"these two must not be taken together"**, plus source, plus consult a doctor | about 60 s | It is **useful** (the high point) |
| **3. Decline** | **One medicine that cannot be found**, or a blurred photo | Photograph it, **"I cannot find it. Please consult a doctor."** | about 30 s | It is **trustworthy** |

### Three rehearsal rules

1. **Card 3 must appear once in the first 30 seconds.** Establish early that it declines to answer, so everything after it is credible.
2. **Never present cards 2 and 3 back to back as one idea.** Card 2 actively catches a danger; card 3 actively admits ignorance. **Presented together, both are lost.**
3. **Demonstrate offline once.** Unplug the network and run it. It is the only way to turn "no signal" from a claim into a fact.

---

## 2. Props

- [ ] **3 real medicine boxes** (physical packaging, not images)
  - [ ] One common medicine (card 1)
  - [ ] A pair with an interaction (card 2) — Ella must confirm the pair is in L1
  - [ ] One that cannot be found (card 3) — confirm it is genuinely **not** in the data
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

- **Main speaker: YC.** Wins on structure, not on accent.
- **Ella:** answers medical and user questions; **plays the caregiver in the slide 7 demo.**
- **Sun:** answers technical questions.

Everyone answers their own area. Nobody talks over anybody.

---

## 5. The three questions judges will ask

| Question | Who answers | Key points |
|---|---|---|
| "Where does the data come from?" | Sun | Specific sources, licence, coverage ([`../CREDITS.md`](../CREDITS.md)) |
| "How much does it cover? What if you cannot find it?" | Ella / Sun | Point to state 3: **if it cannot find it, it says so**, and state the boundary ([`rules/README.md`](rules/README.md), section 6) |
| "What if it is wrong?" | Ella | Point to [`limitations.md`](limitations.md) |

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

**「它错了怎么办？」** 分三类答：识别错 → 降级为请重拍；数据没命中 → 走状态 3；措辞歧义 → 由 Ella 逐条审查过。然后补一句"我们不做诊断，也不给剂量建议"。
