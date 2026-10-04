# Engineering verification and reproducibility

The current release is an engineering prototype. Test evidence does not demonstrate clinical validity, medication safety, target-user effectiveness, or a medically approved interaction database.

## Scope

14,269 catalogue products; 14 ingredient profiles; 13 illustrative formulations; 22 lexicon entries; 14 sourced rules, all clinician-reviewed on 2026-10-03. A check accepts up to 12 distinct confirmed products and emits every pair (up to 66), retaining unmapped ingredients, route gaps, no-match coverage and sources. Counts should be read from `data/data_inventory.json` after each build.

## Reproducible checks

From the project directory, with Node.js available:

```sh
node tests/engine.test.cjs
node tests/patient.test.cjs
node tests/validator.test.cjs
node tests/product-features.test.cjs
```

The browser tests require Playwright and a supported installed browser. API tests require a running Mac local service. ASR service lifecycle tests use controlled fake workers; speech transport tests may use synthetic system-voice recordings. Test output in `qa/` describes its own time and environment; do not aggregate unlike test types into a clinical accuracy number.

## Current release checks

The release additionally passed 16 public-browser workflow checks, 41 multi-product checks and 16 PWA core checks. PWA checks cover a 53-resource / approximately 52.7 MiB cache, reopening while offline, catalogue/rules/OCR availability and disabling browser recognition offline. The static site and PWA upgrade are publicly deployed at the same URL. These are automated browser checks, not physical iPhone/Android or clinical validation.

## What meaningful tests cover

- Incomplete identity blocks a clinical check; vague names give candidates.
- Compound ingredients do not disappear; alias mapping is explicit.
- Matching a rule does not set safety or coverage-complete flags.
- Route constraints and unknown routes remain visible.
- Every selected pair appears even when some warnings match.
- AI field validation is separate from interaction coverage.
- User can correct transcripts before asking; personal dose questions stay outside scope.
- Camera permission failure and manual fallback; capture, retake and track cleanup.
- Drug information sources, mobile layout and download data.
- Local ASR worker startup, timeout, crash recovery and request isolation.

## Evidence limits

Synthetic images and synthesized Cantonese are test fixtures. They are not real packs, real people, real device microphone acoustics or crowd-noise benchmarks. Automated mobile viewports do not replace testing on physical iPhone and Android devices. No fabricated manual-workflow comparison, clinical approval or Raccoon output is included.

The current public publication review retains only authorized catalogue originals, original summaries and source metadata. Full downloaded third-party medical article/label snapshots are excluded. See `qa/publication-audit.json` and `CREDITS.md`.
