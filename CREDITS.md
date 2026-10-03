# Credits, data provenance and rights

Prepared for HacKU 2026 on 3 October 2026. The public repository separates original code, open catalogue data, short factual summaries and third-party components. Public availability does not transfer third-party rights or imply medical/government endorsement.

## Hong Kong official product catalogue

**Hong Kong SAR Government, Department of Health, Drug Office** supplies the registered pharmaceutical-products XML/XSD. Snapshot lastUpdate: **2026-09-25**, retrieved **2026-10-03**. Catalogue page: https://data.gov.hk/en-data/dataset/hk-dh-dh_do-hk-dh-do-pharmaceutical-product . Source XML: https://www.drugoffice.gov.hk/eps/psi/DrugList.xml . XSD: https://www.drugoffice.gov.hk/eps/psi/DrugList.xsd . Use is subject to [DATA.GOV.HK terms](https://data.gov.hk/en/terms-and-conditions); retain source attribution, dates, and applicable notices. Data is supplied as-is; no government endorsement of MedSafe is claimed.

Original source SHA-256 values and download metadata are retained in `data-pack/download_manifest.json` and `data-pack/SHA256SUMS.txt`. Cleaned JSON/CSV/SQLite and the browser bundle are derived representations, not a new clinical approval.

## Clinical evidence and educational information

The Hong Kong Drug Office, DailyMed label records, and MedlinePlus / ASHP are attributed item-by-item in `data-pack/data/rule_sources.json`, `data/medicine_profiles.json`, `data/data_inventory.json`, and `docs/data-inventory.md`. Preserve title, jurisdiction, document date, accessed date, exact URL and section where available.

The public repository contains short original factual summaries and structured rule drafts. **Full downloaded clinical HTML and US label XML snapshots are excluded**, while their URLs and SHA-256 provenance remain public. Source metadata `local_file` paths refer to the internal retrieval set, not a promise that each full document is redistributed. ASHP material is not relicensed. US labels are not represented as Hong Kong product-specific approved labels. All 14 rule drafts await professional review.

## OCR, speech and software

- **Tesseract.js / naptha**: browser OCR integration, with bundled license notices in `app/vendor/`. **Tesseract.js-core** and **tessdata_fast** supply WASM and English/Traditional-Chinese trained data. Their original license texts, source URLs and available hashes are retained; see `app/vendor/sources.json` and `*LICENSE*.txt`.
- **Apple Vision** and installed macOS voices are operating-system services. Their model weights or voice assets are not redistributed. `native/ocr.swift` is the prototype's original client code; the platform binary is locally built.
- **Qwen3-ASR-0.6B**: https://huggingface.co/Qwen/Qwen3-ASR-0.6B . Local MLX conversion: https://huggingface.co/mlx-community/Qwen3-ASR-0.6B-4bit , fixed revision `313d850181767edf09f00a9c289becca70e58cd0`. Apache-2.0 model notices must remain with separately downloaded model assets. Model weights are not in this repository.
- **MLX Audio**: https://github.com/Blaizzy/mlx-audio . Exact installation dependency versions are recorded in `tools/asr-requirements.lock.txt`; dependency licenses remain with their respective distributions.
- Python standard library provides the local server. Browser code uses web platform APIs. Optional browser SpeechRecognition is supplied by the browser provider, not a MedSafe offline model.
- Playwright/Chromium support engineering checks. FFmpeg may encode demonstration video. They are development tools, not clinical validators.

## AI, synthetic examples and team evidence

Codex assisted with research, coding, structured summaries, rule encoding, documentation and engineering checks. Model/OCR/ASR outputs are not clinical approval. Synthetic examples are labelled and cannot be attributed to real patients, participants or Raccoon platform outputs.

Ella's two AI share links are recorded in `docs/raccoon-usage-log.md`; their dialogue bodies could not be retrieved automatically. The project makes no source-level or clinical-review claim based solely on the links.

The original challenge statement was reached through team-supplied event materials: https://docs.google.com/document/d/1iCqusHazP_ebXXQaql3C2oY1COa2rJjAbGU0nXCCAbg/edit . The public repo summarizes relevant requirements rather than redistributing private competition files, participant lists or redemption codes.

## Original code licence

No blanket open-source licence has been selected for original team-authored code. Rights not otherwise granted are reserved pending team choice. Third-party components and open catalogue data remain subject to their own terms; a future code licence must not override them. Public repository access and GitHub's platform terms are distinct from granting a broad downstream code licence.

## Team planning and background references

Team planning materials are preserved in `docs/team-planning/` with their source commit. They contain research leads (including Hong Kong medication-management services and polypharmacy discussion) and potential datasets, not a record of data integrated into the runtime. RxNav-in-a-Box, TwoSides, HODDI, and DrugBank are not our clinical checking engine. Unverified publication/service claims remain leads until independently checked.

Raccoon Work is a development aid and is not called by the runtime. Actual usage records must still be provided by Ella; template screenshots or an unfilled log are not evidence of an executed session or rejected result. Team interview consent forms are preparation tools, not proof that interviews occurred.
