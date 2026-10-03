# Fixed website address

The team repository remains [yc-eagle/med-safe](https://github.com/yc-eagle/med-safe). Hosting the public app on Cloudflare Pages does not move the repository or merge a branch.

The requested name is `med-care.pages.dev`. Alternatives are `medcare-hk.pages.dev` and `med-safe-hk.pages.dev`. No DNS records were observed for these names when checked on 3 October 2026. That is not a reservation or an availability guarantee: the final hostname must be confirmed when an authenticated Pages project is created.

## Ready to upload

[Download the prepared website ZIP](https://github.com/yc-eagle/med-safe/releases/download/rehearsal-20261003/MedSafe-Cloudflare-Pages.zip).

This archive contains the public website, bundled data and recognition files, and recorded examples. It excludes the Mac API server, credentials and personal health records. Extracting the ZIP shows `index.html` at its root.

In the team's Cloudflare account, open **Workers & Pages**, choose **Create application → Pages → Drag and drop**, enter the project name, and upload the ZIP. Confirm the hostname returned after deployment before updating links or QR codes. This is a free Pages deployment; no independent domain purchase is required. Direct Upload projects cannot later be switched to Git integration; create a Git-integrated project from the outset if that is preferred.

A command-line deployment uses the same website files. Authenticate locally with `wrangler login --scopes account:read user:read pages:write`, create the Pages project, and deploy the prepared directory. Never commit credentials or send them in chat.

## Rebuild from source

Run `python3 tools/build_data.py` when source data or rule reviews change. Run `python3 tools/build_public.py --out /path/to/public-build` to generate the static app and its verified offline asset manifest. The optional recorded-example gallery is supplied in the rehearsal release and is not part of the offline cache.

Keep deployment changes on the team's review branch until the maintainer accepts them. Do not force-push, replace team documents, or merge into `main` as part of publishing.

## Check after publishing

Open the actual returned HTTPS address on a phone. Check search, a confirmed example, photo input, all three interface languages and offline preparation. Browser speech still depends on the phone, permissions and network; desktop checks do not prove physical-phone voice support. The Pages site will not need the Mac to remain online.

Sources: [Cloudflare Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/), [Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/).
