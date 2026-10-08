# Product name — MedSafe, and the Ngon Sam Hong Kong edition

Two names are in use, at two different levels. They are not alternatives and neither supersedes the other.

| Level | Name | What it covers |
|---|---|---|
| **Project** | **MedSafe** | The whole engineering effort: repository `med-safe`, package `med-safe-hacku-2026`, the public host `https://med-safe.pages.dev/`, page titles, the app header, the installable app name and the engineering records. This is what the product is called as a piece of software. |
| **Submitted build** | **Ngon Sam · 藥安心** | The Hong Kong edition of that project, and the name this submission is presented under: the pitch deck cover and its title, the spoken name in the room, and the Cantonese/Mandarin materials. |

**How they relate.** MedSafe is the project; Ngon Sam is MedSafe built for the people who actually handle the medicines in Hong Kong. The interfaces were built English-first because that is the order things get built in, not because English was the right first language for the user. The localised build — where the medicine bag is in Chinese, the caregiver speaks Cantonese, and the person taking the tablets is an older adult — is the product's real destination. The deck cover states both levels on one line: `MedSafe · Hong Kong edition`, with `Ngon Sam` as the name of that edition.

The wordmark for the Hong Kong edition is **藥安心**, and its meaning is **peace of mind about medicine**.

## The pieces of the submitted build

| Layer | Form | Where it is used |
|---|---|---|
| Edition name | **Ngon Sam** | Deck cover and title, spoken name, Cantonese/Mandarin materials |
| Wordmark | **藥安心** | Deck cover under the name, Chinese-language materials |
| Meaning line | **peace of mind about medicine** | Deck cover, README, API surfaces |
| Project name | **MedSafe** | Repository path, package name, public host, app header, installable app name, engineering records |

Pronunciation for an English-speaking audience: **"ng-on sum"** — the *ng* is a velar nasal, the same sound that ends *sing*. The full Jyutping is `ngon1 sam1`.

## Why this name, and what it costs

The word 安心 means *peace of mind*, not *safety*. That distinction is the whole reason it fits: the product refuses to conclude that a combination is safe — `clinicalSafety` is permanently `not_assessed` and `coverageComplete` is permanently `false`. A name meaning *safety* would contradict the product; a name meaning *peace of mind* describes what the product actually leaves the user with.

**What it costs.** `Ngon Sam` is harder for a non-Cantonese speaker to say than an English name would be. This matters less than it first appears: judges do not deduct marks for a non-English product name, and the romanisation is the official Hong Kong Government convention. The real risk is different — after the pitch, when judges discuss the ranking without the slides in front of them, they refer to projects by name. A name they cannot pronounce is a name they may not repeat.

**The mitigation, and it is deliberate.** Four things travel together: the project name `MedSafe`, the pronounceable spelling `Ngon Sam`, the Chinese wordmark `藥安心`, and the meaning line `peace of mind about medicine`. The cover now carries all four, so a judge who cannot manage the *ng* still has `MedSafe` to write down and *the peace of mind one* to say. The cover also carries an explicit pronunciation cue (`say it "ng-on sum"`), so the presenter never has to correct anyone out loud.

## Names considered for the Hong Kong edition, and rejected

| Candidate | Why not |
|---|---|
| `Three Bottles` | Considered for the edition name. Strongest instant memory hook — it is the photograph on slide 07 — but it carries no feeling and says nothing about what the product leaves the user with. Kept as the opening story of the pitch, not as a name. |
| `安心` alone | Meaning is right, distinctiveness is not. A common word; registered many times over in the region, and used by a Hong Kong Government app (安心出行). |
| `On Sam` | Pronounceable, and the romanisation stays Cantonese. Rejected because dropping the *ng* makes the word unrecognisable to the Cantonese speakers the product is for. |
| `藥安` | Clearer brand territory, but a Taiwan medical startup already uses it, and 藥 alone reads cold. |
| `定心` | Better wordplay (定心丸, "a reassurance"), but the trademark is taken and a Taiwanese pharmaceutical firm uses it on supplements. |
| `Second Look` / `One Look` / `Watcher` | All pronounceable and all describe the checking action, but none carries the reassurance. |

## Known collisions

`藥安心` is already registered as a trademark in Taiwan for a drug packaging product, and `药安心` is registered in mainland China. This does not affect a 48-hour prototype that sells nothing and enters no pharmacy channel, but a real product would need a new mark. Recorded here so the tradeoff is a decision rather than a surprise.

## What was renamed, and what was frozen

**Renamed:** app header, page titles, the PWA manifest name, README titles, the deck cover and its metadata, the spoken voice-test line, and the documentation. The project-level name is **MedSafe** throughout those surfaces; the deck carries the Hong Kong edition name, **Ngon Sam · 藥安心**, at the cover and in its title.

**Frozen on purpose — do not change:**

- Repository path `med-safe` and package name `med-safe-hacku-2026`
- Live host `med-safe.pages.dev` (the earlier `med-care.pages.dev` entry is maintained so previously shared links keep working)
- `assets/MedSafe-QR.png` and the release zip names

These are referenced by the printed QR code, by links already sent to organisers, and by release URLs. Renaming them would break material that is already in other people's hands, and a visible brand does not require a renamed file.

**Removed on 2026-10-04, so no longer part of this list:** `deck/Med-Safe-HacKU2026.pptx`, `deck/Med-Safe-HacKU2026.pdf`, `assets/demo-3min.mp4`, its subtitles and its narration script. The deck files were superseded by [`../pitch-ppt/index.html`](../pitch-ppt/index.html); the recording was withdrawn because its narration stated that the clinical review was pending, which stopped being true on 2026-10-03. Files obtainable from the rehearsal release keep the old name and cannot be renamed — the release is immutable, so it is left as history.

## Deck changes recorded after the competition

Applied on 5 October 2026, once the judging round had finished and the submission was no longer frozen:

- **The two-level naming became visible on the cover.** The cover's top-right slot, previously a `Vol.01` placeholder, now reads `MedSafe` with `Hong Kong edition` beneath it, so the relationship between the project name and the edition name is legible without the presenter explaining it. The subtitle changed from `藥安心 · MedSafe`, which read as two competing names on one line, to `藥安心 · peace of mind about medicine`.
- **The page counter was corrected.** Every slide chrome read `NN / 13` on a fourteen-page deck; all thirteen counters now read `NN / 14`.
- **The document title carries both levels:** `Ngon Sam · 藥安心 · MedSafe Hong Kong edition · HacKU 2026 DeepTech · Group 51 Bauhinia Spheal`.
- **The opening speaker note now states the hierarchy first**, before the meaning of the name, and points at the cover's top-right slot as the visual evidence for it.
