# Current architecture

Current factual inventory: `data/data_inventory.json`. The product has a static browser mode plus an optional Apple Silicon local service; medicine risk logic is the same explicit rule engine, not a generative clinical model.

```text
Input text / photo / voice
  -> OCR or ASR (input aid only)
  -> User confirms product identity + route / corrected question
  -> HK catalogue (14,269 products)
  -> Explicit ingredient aliases, preserving unmapped ingredients
  -> Pairwise enumeration (2–12 products; up to 66 pairs)
  -> 14 sourced rule drafts + route constraints
  -> Warnings + unknown coverage + source provenance
  -> Controlled education answer / pharmacist question card
```

`app/engine.js` owns pairwise logic, `app/patient.js` and `medicine-info.js` own controlled answers, `app/validator.js` checks AI-generated product fields independently of clinical rule coverage. `app/product-features.js` implements camera/profile/context/handoff flows; `browser-runtime.js` supplies in-browser OCR and disclosed browser voice. `app/data.js` is generated, not patient storage.

Public/static mode runs Tesseract in the browser with bundled WASM and trained data. Mac mode uses `server.py` on `127.0.0.1`, Apple Vision via `native/ocr.swift`, and optional resident Qwen3-ASR via `native/asr_service.py` and `asr_worker.py`. Audio requests are independent; model weights can remain loaded but there is no conversation history. Browser ASR is a different mode and may use provider networking.

Source data is in `data-pack/data/` and `data/`. `tools/build_data.py` generates the browser bundle. XML/XSD open catalogue is retained; full third-party clinical snapshots are excluded from publication. Source URLs, section names, dates and hashes remain available.

No route can return comprehensive clinical safety: the engine retains `coverageComplete=false`, `clinicalSafety=not_assessed`, `patientFactorsAssessed=false`, `doseAssessed=false` and `highOrderAssessed=false`. See `docs/decision-logic.md` for exact gates. PWA release status and cache policy must match the actually verified files described in `docs/offline.md`.
