# Ngon Sam · 藥安心 — current demo and deliverables

Updated 4 October 2026 (Hong Kong time). This index collects the team's project and the supplementary work in PR #3. The codebase remains **yc-eagle/med-safe**. The team main branch is preserved; the supplementary branch has not been merged automatically.

## Open the product

- **Interactive product for exhibition and testing:** https://med-safe.pages.dev/
- **Phone QR code:** [MedSafe-QR.png](../assets/MedSafe-QR.png) — updated to the med-safe.pages.dev entry; previously printed codes still reach the maintained old entry

The current product update uses a light-blue interface and a shorter search → confirm → check → ask workflow. It adds guided next actions, undo, stable keyboard focus, stale-photo protection and cancellable reading while system voices load. See [product changes and verification](product-usability.md). The deployed product excludes videos, gallery and volunteer material. See [all functions and verification limits](product-capabilities.md).

The product URL opens the interactive medicine checker. The fixed Cloudflare Pages host does not depend on the development computer staying online. On a phone, first open the new address while connected, choose **Prepare offline** and wait for download verification; then add it to the home screen if supported. The old hostname's saved cache does not transfer. An installed, verified offline copy supports its documented local features; browser speech recognition still requires a network and installed voices determine local reading support.

## GitHub links

| Deliverable | GitHub location |
|---|---|
| Product capabilities and verification | [Current function audit](product-capabilities.md) |
| Team main repository | [yc-eagle/med-safe](https://github.com/yc-eagle/med-safe) |
| Latest supplementary implementation and handoff | [codex/voice-photo-checks](https://github.com/yc-eagle/med-safe/tree/codex/voice-photo-checks) · [PR #3](https://github.com/yc-eagle/med-safe/pull/3) |
| Download the whole rehearsal package | [MedSafe-rehearsal-kit-20261003.zip](https://github.com/yc-eagle/med-safe/releases/download/rehearsal-20261003/MedSafe-rehearsal-kit-20261003.zip) |
| All published rehearsal media and QR | [Rehearsal release](https://github.com/yc-eagle/med-safe/releases/tag/rehearsal-20261003) |
| Complete deployable website | [MedSafe-Cloudflare-Pages.zip](https://github.com/yc-eagle/med-safe/releases/download/rehearsal-20261003/MedSafe-Cloudflare-Pages.zip) |
| Fixed-host deployment and verification | [Deployment receipt](../qa/cloudflare-package-status.json) · [browser checks](../qa/product-only-published.json) · [offline checks](../qa/product-audit-offline-results.json) |
| English voice video | [MP4](https://github.com/yc-eagle/med-safe/releases/download/rehearsal-20261003/en-voice-demo.mp4) — **historical rehearsal clip, not a submission artifact** |
| Cantonese voice video | [MP4](https://github.com/yc-eagle/med-safe/releases/download/rehearsal-20261003/yue-voice-demo.mp4) — **historical rehearsal clip, not a submission artifact** |
| Three text scenarios | [MP4](https://github.com/yc-eagle/med-safe/releases/download/rehearsal-20261003/text-three-cases.mp4) — **historical rehearsal clip, not a submission artifact** |
| Captured product answer audio | [English M4A](https://github.com/yc-eagle/med-safe/releases/download/rehearsal-20261003/en-answer-recorded.m4a) · [Cantonese M4A](https://github.com/yc-eagle/med-safe/releases/download/rehearsal-20261003/yue-answer-recorded.m4a) |
| Catalogue, rules, ingredient aliases and SQLite | [Data pack](../data-pack/) · [data files](../data-pack/data/) · [source attribution](../data-pack/SOURCES.md) |
| Current inventory, ingredient profiles, lexicon and patient wording | [Structured data](../data/) |
| Source-linked rule review record | [Review CSV](rules/review.csv) · [rule scope](rules/README.md) |
| Checking logic and implementation | [Decision logic](decision-logic.en.md) · [Chinese explanation](decision-logic.md) · [engine](../app/engine.js) |
| Models, dependencies and licences | [Credits](../CREDITS.md) · [offline scope and installation](offline.en.md) |
| Tests and validation evidence | [QA records](../qa/) · [test code](../tests/) · [media method and limitations](rehearsal-kit.md) |
| Actual build-data execution receipt | [build-data-verification.json](../qa/build-data-verification.json) |
| Volunteer handoff | [20-minute execution card](volunteer-quickstart.zh-CN.txt) · [longer Cantonese script](rehearsal-cantonese.txt) |
| Team pitch deck — **the submission deck** | [`pitch-ppt/index.html`](../pitch-ppt/index.html) — 14 pages, press `P` for presenter mode · [deck project record](../pitch-ppt/项目记录.md) |
| Superseded pitch planning (history only) | [Deck directory](../deck/) · [team pitch script](../deck/pitch-deck.md) — describes the earlier 8-slide version |
| Raccoon evidence log | [Raccoon usage log](raccoon-usage-log.md) |

Relative links resolve inside the branch from which this index is opened. A link to an older draft is not a claim that it is the latest submission-ready artifact. **There is no three-minute recording in this repository.** It was removed because its narration and subtitles stated that the clinical review was pending, which stopped being true on 2026-10-03; the historical file remains only in the rehearsal release and is not linked as current evidence. The short rehearsal clips are historical clips, not submission artifacts. No competition submission form has been sent by this handoff.

## Was `build_data` run?

**Yes.** It was first run in an isolated validation copy, then run again in the current feature checkout on **3 October 2026 at 17:49 HKT**, against team main `b91b00c` and feature revision `9a0e074`.

Command: `python3 tools/build_data.py`.

Actual output:

```text
Built 14269 catalogue records, 13 demo formulations, 14 rules
Updated SQLite education profiles and provenance; the 14 rules are clinician-reviewed, education profiles still pending
```

The rebuilt browser data, its pre-build copy and the public website's `data.js` have the same SHA-256:

```text
78621430ce6e623354fd234f8e7f647cf2cebe49f5c6aa0c5b820f12c312d85c
```

The SQLite table contents also remained identical. A successful rebuild can therefore produce **no data-content Git diff**. The receipt records the execution, exit code, counts, database comparison and live data hash; it is the direct evidence of the build.

This does not mean the catalogue provides 14,269 fully assessed medicines or exhaustive interaction coverage. The catalogue, the 13 prepared formulations and the 14 reviewed rules have different scopes. Review status follows the team's review record; it is not clinical outcome validation.

The published data matches this build. Cloudflare serves a deployed snapshot: after source changes, rebuild and deploy the website files; restarting a development server does not update this fixed address. A phone using an older saved offline copy should use **Check for updates / 檢查更新** and reopen the app; reopening clears the current medicine session.


## Fixed website address and presentation update

The patient-facing pages now use shorter English, Mandarin and Cantonese instructions. Review labels follow the team-recorded rule status; source links, coverage limits and speech-service consent remain visible. See [Cloudflare Pages setup](cloudflare-pages.md) and [presentation checks](../qa/public-copy-verification.json). The fixed address **https://med-safe.pages.dev/** is published. Application files were compared against the deployed origin, and the new origin passed phone-width browser and offline checks. Physical-phone speech and clinical validation remain separate tasks.
