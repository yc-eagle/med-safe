# Fixed website address

The team repository remains [yc-eagle/med-safe](https://github.com/yc-eagle/med-safe). Hosting the public app on Cloudflare Pages does not move the repository or merge a branch.

**Live product:** https://med-care.pages.dev/

**Recorded examples:** https://med-care.pages.dev/showcase/

Published on 4 October 2026 (Hong Kong time). Cloudflare confirmed the project name `med-care` and production deployment `44a57a70-4369-480c-95dd-7c59d5ad20f9`, built from application revision `84accc0` with the light-blue interface and updated product workflow. See the [deployment receipt](../qa/cloudflare-package-status.json), [live asset comparison](../qa/product-blue-published.json), [browser checks](../qa/product-blue-published.json) and [offline checks](../qa/product-blue-offline-results.json).

This free Pages address does not require the development computer or a temporary tunnel to stay online. The Cloudflare project is hosted in the publishing account; source code and deliverables remain in the team repository.

## Download or redeploy

[Download the prepared website ZIP](https://github.com/yc-eagle/med-safe/releases/download/rehearsal-20261003/MedSafe-Cloudflare-Pages.zip).

This archive contains the public website, bundled data and recognition files, and recorded examples. It excludes the Mac API server, credentials and personal health records. Extracting the ZIP shows `index.html` at its root.

The existing `med-care` project uses Direct Upload. Repository pushes do not automatically publish it. To update the website, rebuild the approved source revision and upload to this existing project. Direct Upload projects cannot later be switched to Git integration; a separate project is needed if the team chooses that workflow.

A command-line deployment uses the same website files. Authenticate locally with `wrangler login --scopes account:read user:read pages:write`, then run `wrangler pages deploy /path/to/public-build --project-name med-care --branch codex/voice-photo-checks --commit-hash <source-commit>`. This branch is the project's current production branch; it does not merge the team's GitHub main branch. Never commit credentials or send them in chat.

## Rebuild from source

Run `python3 tools/build_data.py` when source data or rule reviews change. Run `python3 tools/build_public.py --out /path/to/public-build` to generate the static app and its verified offline asset manifest. The optional recorded-example gallery is supplied in the rehearsal release and is not part of the offline cache.

Keep deployment changes on the team's review branch until the maintainer accepts them. Do not force-push, replace team documents, or merge into `main` as part of publishing.

## Check after publishing

Open the fixed HTTPS address on a phone. Check search, a confirmed example, photo input, all three interface languages and offline preparation. The published origin passed desktop Chrome checks at a 390px viewport and verified 56 offline assets (55,300,370 bytes), followed by disconnected reopening, medicine lookup, duplicate checking and synthetic-label OCR. These are engineering checks, not clinical or physical-phone validation. Browser speech still depends on the phone, permissions and network. An offline copy saved under the previous hostname does not transfer: prepare offline again at the new address.

Sources: [Cloudflare Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/), [Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/).
