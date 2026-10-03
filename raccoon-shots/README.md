# Development Tool Screenshots

> **Internal working document**, written in English for consistency with the rest of the repository.
> **Owner: Ella.**
> Companion record: [`../docs/raccoon-usage-log.md`](../docs/raccoon-usage-log.md)

---

## Naming convention

```
raccoon-shots/
|-- 01-<short-purpose>.png
|-- 02-<short-purpose>.png
|-- 03-output.png          <- the Raccoon output for a verified-and-rejected case
|-- 04-lookup-failed.png   <- checked against our rule data, not found
`-- 05-our-substitute.png  <- what we used instead
```

**Every filename must be referenced in the matching record in `raccoon-usage-log.md`.**

---

## The set of three that must exist

The complete evidence chain for one verified-and-rejected case:

- [ ] **Output** — what Raccoon produced
- [ ] **Verification failed** — checked against our own rule data or implementation, did not match
- [ ] **Our substitute** — what we used instead

> These three images are the core evidence for the 30 percent *validation of AI-generated outputs* criterion,
> and the physical backing for the line "we held our own tools to the same standard" in the pitch.

---

## Notes

- Screenshots must **not contain API keys, account credentials or personal information**
- `raccoon-shots/` is **part of the public repository** (all materials must be publicly viewable)
- Check every image before submitting
