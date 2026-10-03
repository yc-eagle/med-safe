# Interview Material

> **Internal working document**, written in English for consistency with the rest of the repository.
> **Owner: YC (filming), Ella (question content).**
> **Purpose:** to establish that the problem and the need are real. The pitching criterion *Problem Framing & Relevance* requires *"supported by convincing evidence or examples"* for full marks — **this directory is that evidence.**

> **Status: filming is scheduled. This directory is currently empty of media.** Only this README and `consent.md` exist. Do not describe the interviews as evidence until the media is here.

---

## 1. Read this before filming: one interview covers one user, not two

The product has two users. **They do not speak the same language**, so a single interview cannot carry both conclusions.

| User | Language | Evidence needed |
|---|---|---|
| Older adults in Hong Kong | **Cantonese** | Interview 1 |
| Foreign domestic helpers (mainly Filipina) | **English or Tagalog** — **not Cantonese** | Interview 2 |

**Tonight's confirmed plan is one Cantonese-speaking interviewee** (a Tsinghua student from Macau, with Cantonese-speaking family background).

**Therefore, unless a second English- or Tagalog-speaking interviewee is also filmed, the pitch must not present evidence about foreign domestic helpers.** Doing so is over-claiming, and one question from a judge exposes it.

### A note on the variety of Cantonese

The interviewee's background is **Macau Cantonese**, which is a Cantonese variety but not identical to Hong Kong Cantonese in vocabulary and usage. This is fine for the purpose — it demonstrates the **family caregiver** experience in a Cantonese-speaking household — but do not present the interviewee as "a Hong Kong local", and do not claim the clip is evidence about Hong Kong specifically beyond what they actually describe.

**Say it accurately:** "We interviewed a Cantonese-speaking family caregiver." Not: "We interviewed a Hong Kong local."

---

## 2. What to do if the English interview does not happen

**Do not fake it, and do not stretch the Cantonese clip.** Choose one of these instead:

**Option A — narrow the claim (recommended, zero extra work)**

Change the slide from "evidence about both users" to "evidence about the family caregiver", and support the foreign domestic helper user **separately, from documented sources** rather than from an interview:

- The helper is the person who physically handles the pills and prompts the doses
- She cannot read Chinese labels
- The product's speech output exists because of her

This is honest, it still lands, and it requires no new footage.

**Option B — add a second clip.** If an English- or Tagalog-speaking interviewee becomes available, record the same questions. This is the stronger version and restores the two-clip slide.

**Option C — bring Ella in on camera.** Ella is a clinician. A 30-second segment where she explains why "the caregiver cannot read the label" is a real medication-safety problem is a **different kind of evidence** (expert framing, not user evidence) — useful, but label it as that. Do not present expert opinion as user evidence.

---

## 3. Questions for the Cantonese interview

Ask these; do not add a survey. The value is in the unguarded answer, not in coverage.

| # | Question (ask in Cantonese) | What it is after |
|---|---|---|
| 1 | 你或者你屋企嘅長輩，一日大概要食幾種藥？ | Establishes polypharmacy |
| 2 | 啲藥你係點記住嘅？有無試過漏食或者食重複咗？ | A real failure scenario |
| 3 | 醫生講完之後，你仲記唔記得要問咩？ | Information is lost at handover |
| 4 | 藥盒入面張紙，你平時會唔會睇？睇得明嗎？ | Whether the leaflet is actually used |
| 5 | 如果要同時食兩種藥，你會唔會去查吓佢哋可唔可以一齊食？點查？ | The core question: nobody performs this check |
| 6 | 屋企有無請人幫手照顧？佢係點知邊盒藥係咩？ | Leads to the helper user — **note this is testimony about a helper, not the helper's own account** |
| 7 | 如果有樣嘢，影一影就話你知「呢兩盒唔可以一齊食」，你會唔會用？ | Validates the need |

**If a second interviewee speaking English or Tagalog is available**, ask questions 1-5 in English, and replace 5 and 6 with:

- "How do you know which pill is which, when the label is in Chinese?"
- "If you are not sure whether two medicines can be taken together, who do you ask?"

**Question 4 is not a setup for "the leaflet never mentions interactions."** Leaflets do contain interaction sections. The point of this question is whether the person **reads and understands** it.

---

## 4. Filming discipline

- [ ] Film in **landscape**
- [ ] **Separate audio capture** (a second phone close to the subject)
- [ ] Shoot **3-5 minutes**, edit down to **60-90 seconds**
- [ ] **Keep the moments where the subject says "I don't know" or "I never thought about it"** — real is more credible than fluent
- [ ] Back up the audio **immediately** (phone plus cloud)
- [ ] **Complete `consent.md` before leaving** — consent cannot be collected afterwards
- [ ] **Ask permission explicitly for public use.** The clip will be shown on stage and published in a public repository

---

## 5. Storage

```
assets/interviews/
|-- README.md            <- you are here
|-- consent.md           <- subject consent record (required)
|-- cantonese/           <- Cantonese material
`-- english/             <- English / Tagalog material, if filmed
```

**Large files must not be committed to git** (`.gitignore` excludes `*.mp4`, `*.mov`, `*.wav`, `*.m4a`).
**Upload video to cloud storage or YouTube (public or unlisted) and record the link below.**

| Material | File / link | Duration | Language | Date filmed | Cleared for public demo |
|---|---|---|---|---|---|
| Interview 1 | _to be filmed_ | | Cantonese | | |
| Interview 2 | _not scheduled_ | | English / Tagalog | | |

---

## 6. After filming

- [ ] `consent.md` completed and signed off
- [ ] Media backed up in two places
- [ ] Links recorded in the table above
- [ ] Clips edited to 60-90 seconds
- [ ] **The claim on the pitch slide matches the language actually filmed** (see section 1)
- [ ] `docs/evidence-protocol.md` section 6 updated from _TODO_ to the actual status
