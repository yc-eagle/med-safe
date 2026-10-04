# Website and repository versions

[Use MedSafe](https://med-care.pages.dev/) · [Current product source](https://github.com/yc-eagle/med-safe/tree/codex/voice-photo-checks) · [Review PR #3](https://github.com/yc-eagle/med-safe/pull/3)

The deployed product is already in the **team repository**. It is on `codex/voice-photo-checks`; opening or pulling only `main` does not yet obtain that product update. Cloudflare Pages uses a separately uploaded build, not automatic deployment from `main`.

On 4 October, team commit `2586515` added the HTML pitch deck and its images, updated the public links, and refreshed the team's deployment evidence. Those 28 files were brought into the product branch with the original attribution and checked byte for byte against the team commit. Before merging PR #3, team main advanced to `8677c71`: the team replaced presentation photos and corrected the animation resource path. The complete latest `pitch-ppt` directory was preserved exactly, including its renamed and removed files. Product files remain unchanged.

Rebuilding the current product branch reproduces all 58 files in the deployed product package exactly. The deployed application revision is `d543006`; later commits add documentation, test evidence and the team's presentation assets without changing those public product files. [Preservation and build comparison](../qa/repository-sync-20261004.json).

## Get the latest product without changing main

For browsing, use the **Current product source** link above. For a fresh download, use [this branch's ZIP](https://github.com/yc-eagle/med-safe/archive/refs/heads/codex/voice-photo-checks.zip). It includes the latest product and the team presentation materials.

For an existing clean checkout:

```sh
git fetch origin
git switch codex/voice-photo-checks
git pull --ff-only origin codex/voice-photo-checks
```

If you have local edits, save your work before switching branches. Do not reset or force-pull over someone else's work.

## Adopt the product on main

PR #3 is the reviewable update into `main`. It includes the latest product while preserving the team deck, documents and medical data. Until that PR is accepted, ordinary pulls of `main` correctly continue to show the older application. Publishing to Cloudflare alone does not update the default GitHub branch.
