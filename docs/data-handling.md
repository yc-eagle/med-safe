# Data and Privacy: What Leaves the Device

[English](data-handling.md) | [中文](data-handling.zh-CN.md)

> The problem statement **requires** this: *"State what it costs, what it gets wrong, and **what leaves the device**."*
> **Owner: Sun.**

---

## 1. By default, nothing leaves the device

| Action | Where it happens | Data leaving the device |
|---|---|---|
| Photographing | On device | **None** |
| Text recognition | On device | **None** |
| Medicine lookup | Local data | **None** |
| Interaction check | Local rules | **None** |
| Speech synthesis | On device | **None** |

<!-- TODO (Sun): confirm each row against the actual implementation and mark honestly anything not yet implemented. -->

**This is a design target, not an add-on.** Two reasons: one of the barriers in the problem statement is having no connection, and a photograph of someone's medicines is **personal health information** that should not be uploaded as a matter of course.

---

## 2. When it does go online

<!-- TODO (Sun): if any part of the MVP requires connectivity, state it plainly -->

| Situation | Online? | What is sent | Why |
|---|---|---|---|
| _TODO_ | | | |

> **If the prototype depends on connectivity anywhere, say so in the pitch before a judge asks.** Stating a boundary yourself earns credit. Having it discovered costs you.

---

## 3. Offline degradation

| Scenario | Behaviour |
|---|---|
| Fully offline | _TODO: which functions remain available_ |
| Unstable connection | _TODO_ |
| Data pack not downloaded | _TODO_ |

---

## 4. Compliance notes

| Item | Note |
|---|---|
| Hong Kong Personal Data (Privacy) Ordinance (PDPO) | Personal health information is not uploaded by default; if it ever is, the purpose and scope are stated |
| Photograph retention | _TODO: retained or not, for how long, stored where_ |
| Can the user delete it | _TODO_ |
| Third-party services | List every third-party call and its data flow |

---

## 5. How to say it in the pitch

One sentence, usable directly:

> **"By default everything runs on the device — the photograph never leaves the phone, because a photograph of medicines is personal health information."**
> "(Where applicable) It only goes online in ___ , it sends ___ , and it does not send ___ ."

---

## 6. Checklist

- [ ] Table above corrected against the actual implementation
- [ ] Photograph retention settled
- [ ] All third-party calls listed
- [ ] Offline path tested (**unplug the network and run it once**)
- [ ] Can state "what leaves the device" in one sentence during the pitch
