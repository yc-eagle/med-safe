# Naming record — Ngon Sam · 藥安心

Decided on 4 October 2026, during the HacKU 2026 build weekend.

## The name

| Layer | Form | Where it is used |
|---|---|---|
| Name | **Ngon Sam** | Slides, app header (large), documentation titles |
| Wordmark | **藥安心** | Slides under the name, app header (next to the name), Cantonese/Mandarin materials |
| Meaning line | **peace of mind about medicine** | Spoken by the presenter; README and API surfaces |
| Internal codename | **MedSafe** | Repository path, package name, engineering records, the pitch deck's small print |

Pronunciation for an English-speaking audience: **"ng-on sum"** — the *ng* is a velar nasal, the same sound that ends *sing*. The full Jyutping is `ngon1 sam1`.

## Why this name, and what it costs

The word 安心 means *peace of mind*, not *safety*. That distinction is the whole reason it fits: the product refuses to conclude that a combination is safe — `clinicalSafety` is permanently `not_assessed` and `coverageComplete` is permanently `false`. A name meaning *safety* would contradict the product; a name meaning *peace of mind* describes what the product actually leaves the user with.

**What it costs.** `Ngon Sam` is harder for a non-Cantonese speaker to say than an English name would be. This matters less than it first appears: judges do not deduct marks for a non-English product name, and the romanisation is the official Hong Kong Government convention. The real risk is different — after the pitch, when judges discuss the ranking without the slides in front of them, they refer to projects by name. A name they cannot pronounce is a name they may not repeat.

**The mitigation, and it is deliberate.** Three things travel together: the pronounceable spelling `Ngon Sam`, the Chinese wordmark `藥安心`, and the meaning. On the deck cover the third line is `MedSafe`, and the meaning is carried by the presenter and by the [`README`](../README.md) — the cover states the name, the defence states the meaning. A judge who cannot manage the *ng* can still describe the project as *the peace of mind one*, which is enough to survive the discussion room. The cover carries an explicit pronunciation cue (`say it "ng-on sum"`) so the presenter never has to correct anyone out loud.

**Because the cover no longer carries the meaning line, the presenter must say it.** If the meaning is never spoken, the only handle a judge retains is a Cantonese word they cannot pronounce, and the mitigation is lost. The line to say is in the opening note of the speaker notes: *Ngon Sam is Cantonese for 藥安心 — peace of mind about medicine. Not safety; the product never claims safety.*

## Names considered and rejected

| Candidate | Why not |
|---|---|
| `MedSafe` (original) | A description, not a name. Also reverses the product's position: the product will not say *safe*. Kept as the internal codename, where it is accurate and useful. |
| `Three Bottles` | Strongest instant memory hook — it is the photograph on slide 07. But it carries no feeling, and it says nothing about what the product leaves the user with. Kept as the opening story of the pitch, not as the name. |
| `安心` alone | Meaning is right, distinctiveness is not. A common word; registered many times over in the region, and used by a Hong Kong Government app (安心出行). |
| `On Sam` | Pronounceable, and the romanisation stays Cantonese. Rejected because dropping the *ng* makes the word unrecognisable to the Cantonese speakers the product is for. |
| `藥安` | Clearer brand territory, but a Taiwan medical startup already uses it, and 藥 alone reads cold. |
| `定心` | Better wordplay (定心丸, "a reassurance"), but the trademark is taken and a Taiwanese pharmaceutical firm uses it on supplements. |
| `Second Look` / `One Look` / `Watcher` | All pronounceable and all describe the checking action, but none carries the reassurance. |

## Known collisions

`藥安心` is already registered as a trademark in Taiwan for a drug packaging product, and `药安心` is registered in mainland China. This does not affect a 48-hour prototype that sells nothing and enters no pharmacy channel, but a real product would need a new mark. Recorded here so the tradeoff is a decision rather than a surprise.

## What was renamed, and what was frozen

**Renamed:** app header, page titles, the PWA manifest name, README titles, the deck cover and its metadata, the spoken voice-test line, and the documentation.

**Frozen on purpose — do not change:**

- Repository path `med-safe` and package name `med-safe-hacku-2026`
- Live host `med-care.pages.dev`
- `assets/MedSafe-QR.png` and the release zip names

These are referenced by the printed QR code, by links already sent to organisers, and by release URLs. Renaming them would break material that is already in other people's hands, and a visible brand does not require a renamed file.

**Removed on 2026-10-04, so no longer part of this list:** `deck/Med-Safe-HacKU2026.pptx`, `deck/Med-Safe-HacKU2026.pdf`, `assets/demo-3min.mp4`, its subtitles and its narration script. The deck files were superseded by [`../pitch-ppt/index.html`](../pitch-ppt/index.html); the recording was withdrawn because its narration stated that the clinical review was pending, which stopped being true on 2026-10-03. Files obtainable from the rehearsal release keep the old name and cannot be renamed — the release is immutable, so it is left as history.
