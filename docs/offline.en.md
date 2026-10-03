# Download and Offline Mode

[中文](offline.md) | [English](offline.en.md)

| Mode | Implemented capability | Conditions |
|---|---|---|
| Download the ZIP and open `app/index.html` | Catalogue, ingredient material, rule checks, manual Q&A and pharmacist question card | Download the complete package first; camera / recognition under `file://` is restricted |
| Local static service on an ordinary computer | The functions above plus browser Tesseract recognition | Python 3; run the 8080 command in the README; resources ship with the package |
| Local service on an Apple Silicon Mac | Apple Vision recognition, optional Qwen3-ASR Cantonese recognition, system read-aloud | Python, compiled OCR / developer tools, a pre-installed speech environment and model |
| Installable offline web page on a phone | Passed 16 core engineering checks and published to the public site | 53 assets, about 52.7 MiB; after the download completes it can reopen, look up, run rules and OCR with the network disconnected; a real phone has not been tested yet, teammate real-device feedback pending |

## Mac Cantonese installation

Run `python3 tools/install_voice.py` once with a network connection. Exact dependency versions are in `tools/asr-requirements.lock.txt`; the model is `mlx-community/Qwen3-ASR-0.6B-4bit`, revision `313d850181767edf09f00a9c289becca70e58cd0`, weights about 0.7 GB, not inside the repository. The installer creates `.voice-runtime` inside the project and an adjacent `HacKU-Sunsy-VoiceModel/model`.

Start `python3 server.py` and open `http://127.0.0.1:8765`. The project can specify local paths through the `ASR_PYTHON` and `ASR_MODEL` environment variables; `.env.example` only provides an example and is not loaded automatically. Typing still works while the model is not installed. The server does not listen on the local network, so this address cannot be sent to a teammate's phone.

Before disconnecting, actually confirm that the catalogue can be looked up, a selected medicine can be checked, an image can be read, the model can transcribe and the system has a Cantonese voice. After disconnecting, the original web pages cannot be opened; what is kept locally is the summary and the provenance metadata. The service may keep the model in memory to reduce repeated loading time, and releases it when the service is closed.

## The difference between phone speech and offline

Browser SpeechRecognition may use the provider's network, and there is no way to promise offline operation on the strength of it being a "browser API". It starts only after the web page states this explicitly; when the network is disconnected, typing should be used. Local read-aloud selects only voices the browser reports as `localService=true`, and whether Cantonese is available depends on the voices pre-installed on the device.

The phone offline cache can also be cleared by the operating system. The first download, the cache-complete prompt, reopening in flight mode, camera OCR and the failure prompt for missing resources must all be verified before any external claim is made. Personal medicine selections, questions, audio and images must not be added to the application cache.
