# Interview Material

> **Internal working document**, written in English for consistency with the rest of the repository.
> **Owner: YC (filming), Ella (question content).**
> **Purpose:** to establish that the problem and the need are real. The pitching criterion *Problem Framing & Relevance* requires *"supported by convincing evidence or examples"* for full marks — **this directory is that evidence.**

---

## Both are required, because there are two users

| Material | Language | Who | What it establishes |
|---|---|---|---|
| **Interview 1** | **Cantonese** | A Hong Kong friend or family caregiver | The medication difficulties of **older adults** |
| **Interview 2** | **English** | A Filipina domestic helper | The difficulties of **foreign domestic helpers** |

**Why the English one matters:** foreign domestic helpers speak Tagalog or English, **not Cantonese**. And "English voice output" exists in the product precisely for them.
**If only the Cantonese clip was filmed, do not extend the conclusion to foreign domestic helpers in the pitch** — say only that "this shows the information is lost at the moment it is handed over."

---

## Interview questions

| # | Question | What it is after |
|---|---|---|
| 1 | How many medicines do you, or an older person in your family, take each day? | Establishes polypharmacy |
| 2 | How do you keep track of them? Have you ever missed one or taken one twice? | A real failure scenario |
| 3 | After the doctor finishes explaining, do you still remember what to ask? | Information is lost at handover |
| 4 | Do you read the leaflet in the box? Can you understand it? | "The leaflet might as well not exist" |
| 5 | If you take two medicines at once, do you check whether they can be taken together? How? | The core question, leading to "nobody does this check" |
| 6 | Does anyone help care for the older person at home? How do they know which box is which? | Leads to the foreign domestic helper user |
| 7 | If something could tell you by photograph that "these two must not be taken together", would you use it? | Validates the need |

**English version of questions 5 and 6:**
- "How do you know which pill is which, when the label is in Chinese?"
- "If you are not sure whether two medicines can be taken together, who do you ask?"

---

## Directory convention

```
assets/interviews/
├── README.md            <- you are here
├── consent.md           <- subject consent record (required)
├── cantonese/           <- Cantonese material
└── english/             <- English material
```

**Large files must not be committed to git** (`.gitignore` already excludes `*.mp4`, `*.mov`, `*.wav`).
**Upload video to cloud storage or YouTube (public or unlisted) and record the link in the table below.**

---

## Material register

| Material | File / link | Duration | Language | Date filmed | Cleared for public demo |
|---|---|---|---|---|---|
| Interview 1 | _TODO_ | | Cantonese | | |
| Interview 2 | _TODO_ | | English | | |

---

## Filming discipline

- [ ] Film in **landscape**
- [ ] **Separate audio capture** (a second phone close to the subject)
- [ ] Shoot **3-5 minutes** per interview, edit down to **60-90 seconds**
- [ ] **Keep the moments where the subject says "I don't know" or "I never thought about it"** — real is more credible than fluent
- [ ] Back up the audio **immediately** (phone plus cloud)
- [ ] **Record whether the subject consents to public use** (see `consent.md`)
