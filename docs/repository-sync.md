# Website and repository versions

[Use MedSafe](https://med-care.pages.dev/) · [Current product source](https://github.com/yc-eagle/med-safe/tree/main) · [Review PR #3](https://github.com/yc-eagle/med-safe/pull/3)

The deployed product is maintained in the **team repository**. PR #3 brings the tested product into `main` together with the latest team presentation files. Use `main` for the accepted team version. Cloudflare Pages uses a separately uploaded build, not automatic deployment from `main`.

On 4 October, team commit `2586515` added the HTML pitch deck and its images, updated the public links, and refreshed the team's deployment evidence. Those 28 files were brought into the product branch with the original attribution and checked byte for byte against the team commit. Before merging PR #3, team main advanced to `8677c71`: the team replaced presentation photos and corrected the animation resource path. The complete latest `pitch-ppt` directory was preserved exactly, including its renamed and removed files. Product files remain unchanged.

Rebuilding the current product branch reproduces all 58 files in the deployed product package exactly. The deployed application revision is `d543006`; later commits add documentation, test evidence and the team's presentation assets without changing those public product files. [Preservation and build comparison](../qa/repository-sync-20261004.json).

## Get the accepted team version

For browsing, use the **Current product source** link above. For a fresh download, use [the main-branch ZIP](https://github.com/yc-eagle/med-safe/archive/refs/heads/main.zip). It includes the latest product and the team presentation materials.

For an existing clean checkout:

```sh
git fetch origin
git switch main
git pull --ff-only origin main
```

If you have local edits, save your work before switching branches. Do not reset or force-pull over someone else's work.

## Repository updates and website updates

PR #3 records the product integration and its checks. Future changes to the product need both a repository commit and a new Cloudflare deployment. Publishing to Cloudflare alone does not update GitHub; pushing GitHub alone does not update the live website. See [the hosting instructions](cloudflare-pages.md).
