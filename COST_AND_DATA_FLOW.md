# Cost, resources and data flow

Core catalogue search and deterministic rules run in the browser with no per-question paid API. Static hosting has its own provider limits and terms; this prototype does not promise free hosting forever or a production service-level agreement.

Browser OCR downloads bundled Tesseract code/WASM and English/Traditional-Chinese data, then processes the selected image on-device. Initial download, decompression, memory and latency vary by mobile device. Offline installation size and cache completion must be read from the shipped interface and verified on the device.

The Apple Silicon local speech option downloads around 0.7 GB of Qwen3-ASR weights plus Python/MLX dependencies once. The fixed model revision and lockfile are in README. Resident execution saves repeated load time but uses memory; observed development-device timings are not a minimum-hardware or latency guarantee. OCR needs Apple Vision and a locally built executable; TTS depends on installed system voices.

No patient information is required during installation. Normal browser catalogue/rule use has no application backend patient store. Photo/audio paths and browser ASR caveats are documented in `docs/data-handling.md`. External citations require an Internet connection. The public site request itself may expose normal access metadata to its hosting provider.

The project has no DrugBank commercial licence, no full clinical interaction subscription, and no clinician-approved comprehensive rule collection; the 14 rules have been clinician-reviewed individually, which is not the same as a comprehensive validated rule set. These are missing resources, not zero-cost resources already obtained. Machine-downloadable catalogue/model work is complete for the current scope; professional product/rule review and real-world evaluation remain human work.
