# MedSafe — Medication Verification Assistant

[English](README.md) | [中文](README.zh-CN.md)

> **Photograph a medicine box and it reads it out to you. Photograph a second one and it tells you whether the two can be taken together. When it cannot verify something, it says so instead of guessing.**

**HacKU 2026** — DeepTech Track
The University of Hong Kong — 2-4 October 2026
**Group 51 — Bauhinia Spheal (紫荆海豹球)**

**Problem statement:** *The Capability That Hasn't Travelled*

---

## Three Questions

| | |
|---|---|
| **What capability are we moving?** | **Checking whether several medicines can be taken together** — a judgement that today only a pharmacist makes |
| **Into what setting?** | **A Hong Kong home** — a kitchen table, a caregiver, two boxes of pills |
| **What barrier keeps it out?** | **User expertise** — nobody in that room can read or interpret the output. One of the four barriers named in the problem statement. |

---

## Links

| | |
|---|---|
| **Live Demo** | _TODO_ |
| **3-minute demo video** | _TODO_ |
| **Pitch deck** | [`deck/`](deck/) |

<!-- TODO: all materials must be publicly viewable. Fill both links before submitting. -->

---

## The Problem

Community pharmacists in Hong Kong have been pushing medication management for years, and the service genuinely exists. St. James' Settlement's charity community pharmacy, for example, has run a free remote pharmacist consultation service since 2009 — the pharmacist can review the patient's eHealth record, with consent, and reconcile their medicines.

But that service has preconditions: **you have to call, during service hours, with authorisation in place.**

The real situation looks like this:

```
An older adult takes several medicines from several different specialists
        |
The doctor explains it once, face to face - and it is not retained
        |
At home, a foreign domestic helper handles the pills and the reminders
        |
She cannot read the Chinese labels or the instructions
        |
The print on the box is too small, so she makes her own judgement
        |
Duplicated doses / missed doses / self-added medicines
```

**The problem is not that nobody is managing it. The problem is that it cannot be reached at the moment it matters.**

**Root cause:** the knowledge required to check medication safety is **locked inside the pharmacy — in both time and space.** And existing tools only do *lookup* (information retrieval), not *checking* (judgement). The place where a person actually gets stuck is the judgement.

---

## The Solution: A Three-State Machine

The product has **three interaction states**. They are not error handling — **they are the product.**

| State | Trigger | System behaviour |
|---|---|---|
| **1. Translate** | One photo, recognised successfully | Reads out the medicine information, with **voice output** (English / Cantonese) |
| **2. Signal danger** | Multiple photos, **an interaction or contraindication is found** | **States plainly: "These two must not be taken together."** Gives the source. Tells the user to consult a doctor. |
| **3. Decline to answer** | Multiple photos, **the combination is not in our data** | "I cannot find information on these two medicines. Please consult a doctor." |

**Boundary case** (an input-quality issue, not one of the three states): blurred photo or unrecognisable medicine → "I cannot read this photo clearly. Please take another one." (retryable)

### States 2 and 3 must not be conflated

**State 2 actively catches a danger. State 3 actively admits ignorance.**
Collapse them together and the product just looks like "sometimes it doesn't answer" — when in fact those are the two most valuable things it does.

### Why this design matters

Three sentences in the problem statement map directly onto the three states:

| Problem statement | Us |
|---|---|
| *"Reading a printed form, a label, a meter or **a prescription** in bad light or at an angle"* | 1 |
| *"**A first-line response that escalates rather than guesses**"* | 2 |
| *"...and reports **honestly** what it could not do"* | 3 |

**We do not replace the pharmacist. We provide a first-line response** — and the correct behaviour for a first-line response is **to escalate, not to guess.**

---

## What This System Does Not Do

> **MedSafe is a hackathon prototype. It is not a medical device and it does not provide medical advice.**

- It does **not** diagnose.
- It does **not** give dosage advice.
- It does **not** suggest stopping, switching or adjusting medication.
- It does **not** replace a pharmacist or a doctor.

It does two things: **puts medicine information into plain language**, and **tells you to ask a professional before you take several medicines together.**

**In any uncertain case, its correct behaviour is to send you to a pharmacist — not to give you an answer.**

---

## Running It

<!-- TODO: replace once the stack is finalised -->

```bash
# 1. Environment variables
cp .env.example .env

# 2. Install dependencies
# TODO

# 3. Start
# TODO
```

> The product is designed to work **offline**. Photographs of medicines are personal health information and by default never leave the device — see [`docs/data-handling.md`](docs/data-handling.md).

---

## Repository Layout

```
med-safe/
├── README.md                  <- you are here (English)
├── README.zh-CN.md            <- Chinese version
├── CREDITS.md                 <- open-source and data attribution
├── deck/                      <- pitch deck (see deck/pitch-deck.md)
├── docs/
│   ├── problem.md             <- users, failure chain, root cause, alternatives
│   ├── rules/                 <- medication criteria, three tiers
│   ├── demo-script.md         <- the three-card demo plan and event-day checklist
│   ├── competitors.md         <- competitive comparison and spoken script
│   ├── evidence-protocol.md   <- manual-method comparison, cost, error rates
│   ├── limitations.md         <- what it gets wrong
│   ├── data-handling.md       <- what leaves the device
│   └── raccoon-usage-log.md   <- development tool usage log
├── assets/
│   └── interviews/            <- first-hand interview material (Cantonese + English)
├── raccoon-shots/             <- development-time screenshots
└── src/                       <- application code
```

---

## Team

**Group 51 — Bauhinia Spheal (紫荆海豹球)**

| Member | University | GitHub | Responsibility |
|---|---|---|---|
| **Yicheng JIANG** | Beijing Foreign Studies University | [@yc-eagle](https://github.com/yc-eagle) | Overall topic selection and concept (originator of the idea) / core work / project progress management / repository and workflow / pitch deck / presentation and pitching |
| **Shuoyang SUN** | Tsinghua University | _TODO: GitHub username_ | All desktop-web development / Live Demo |
| **Lin MA (Ella)** | Tsinghua University | _TODO: GitHub username_ | Domain expertise and professional support |

<!-- TODO: fill in the two GitHub usernames. -->

---

## Sources and Attribution

Every open-source library, dataset and reference is listed in [`CREDITS.md`](CREDITS.md).

**SenseTime Raccoon Work** was used during development as an assisting tool.
**It is a development tool, not a runtime dependency of the product**: the product is required to work offline, so nothing in the delivered prototype calls Raccoon. Its output was treated as **input to be verified, not as a conclusion to be trusted**. The record is in [`raccoon-shots/`](raccoon-shots/).

---

## Licence

Code, designs and documentation produced during the hackathon remain the property of the participating team.
