# MedSafe — Hong Kong Medication Verification Assistant

**English** · [简体中文](README.zh-CN.md) · [廣東話](README.yue.md)

**Group 51 — Bauhinia Spheal (紫荆海豹球)**  
HacKU 2026 · DeepTech Track · The University of Hong Kong · 2–4 October 2026  
**Problem statement:** *The Capability That Hasn't Travelled*

**Confirm the medicine. Read the sourced warning. Bring the unresolved question to a pharmacist.**

[Try in English](https://med-care.pages.dev/?lang=en) · [中文体验](https://med-care.pages.dev/?lang=cmn) · [廣東話試用](https://med-care.pages.dev/?lang=yue) · [Three-minute demonstration and slides](https://github.com/yc-eagle/med-safe/blob/main/assets/demo-3min.mp4)

The presentation and default interface are in **English**. Cantonese supports the local conversation between older adults and caregivers; Chinese and Cantonese entry points are available through the language links. Interface language and the availability of a speech voice are separate settings.

## The moment we are designing for

An older adult comes home with medicines from different appointments. A family member or domestic helper helps organise them. Later, they consider adding a cold remedy or painkiller. They need to recognise the exact products, understand the ingredients and identify questions that require professional advice.

Small print, unfamiliar terminology and different languages can make that task difficult. A box also cannot explain the individual's prescription: a medicine bag or clinician's instructions may specify a different regimen. These are the situations MedSafe is designed to support; research with the intended users is still needed to establish their frequency and impact.

Hong Kong gives the prototype a concrete starting point: local registration numbers, English and Chinese medicine information, and Cantonese communication. The capability we aim to bring closer to the home is **the first step of verification and escalation**, in support of pharmacists' professional judgement.

## Three useful responses

| What the person needs | What MedSafe does |
|---|---|
| **Read it clearly** | Photograph or search for a medicine, confirm its identity and route, then inspect its ingredients and sourced information. Text and available speech support understanding. |
| **Find a sourced warning** | Compare selected products pair by pair, preserve compound ingredients, and show applicable rules with their sources. Contraindications, recommendations to avoid, increased risk and advice to consult remain distinct. |
| **Know what is not covered** | Show missing identity, route, ingredient mapping or rule coverage. Create a question card containing the medicine list and unresolved questions for a pharmacist. |

A warning does not tell a person to stop a prescription. A missing match never means that a combination is safe.

## Try the demonstration

Search for `HK-53362` and `HK-53319`, confirm the products against the example material, and inspect their shared ingredient and source. Add another product to see how every pair retains its own result and gaps. Try a clear, non-personal medicine-box image, then check the recognition before confirming it.

Ask a question about a medicine's use or selected side effects, correct any transcription error, and open the pharmacist question card. Large text, editable recognition and manual entry keep the workflow usable when camera or speech input is unavailable.

The mobile website requires no account. After explicitly downloading the offline pack—currently approximately **52.7 MiB across 53 resources**—the cached catalogue, rules and browser OCR can work without a connection. Browser speech recognition may use its provider's servers; this is disclosed before use and is disabled offline. Local Cantonese playback depends on installed voices. The optional Apple Silicon Mac build provides offline Cantonese recognition after its software and model have been installed.

## Evidence and scope

| Layer | Current scope |
|---|---|
| Official Hong Kong catalogue | **14,269 products**, snapshot dated 25 September 2026 |
| Ingredient records | 23,835 rows; 2,081 distinct original ingredient strings |
| Educational information | **14 ingredient profiles**, with source links |
| Curated checking knowledge | **14 sourced rules, all clinician-reviewed on 2026-10-03** |
| Demonstration formulations | 13 selected products, including compound formulations |
| Multiple medicines | Up to **12 products and 66 pair records** |

The catalogue comes from the Hong Kong Department of Health's Drug Office. Rule and education records cite Hong Kong Drug Office information, DailyMed label records and MedlinePlus/ASHP. Each warning retains its evidence level, applicable routes and source details. Overseas labelling is identified as such rather than presented as an approved Hong Kong product label. [Full data inventory](../../data/data_inventory.json) · [Rule records](../rules/README.md) · [Data notes](../data-inventory.en.md).

OCR and speech models assist input; they do not make treatment decisions. Explicit ingredient aliases and deterministic, route-limited rules make the checking process inspectable. [Decision logic](../decision-logic.en.md).

Engineering checks include **41 multiple-medicine checks**, **16 public-browser workflow checks** and **16 mobile-offline checks**, with an additional published-site offline verification. These are software checks using controlled inputs. **Physical-phone testing, observation with older adults and clinical validation have not been completed.** No reduction in medication errors or improvement in patient outcomes is claimed. The planned Cantonese caregiver interview will support only that participant’s experience; it cannot establish findings about foreign domestic helpers or substitute for an older-adult study. [Engineering evidence](../../qa/engineering-validation-summary.json).

The product does not assess personal dose, a complete set of contraindications, kidney or liver adjustments, pregnancy, paediatric treatment, or interactions involving three or more medicines simultaneously. A complete registration catalogue is not a complete clinical interaction database.

## Team and credits

| Member | University | Contribution |
|---|---|---|
| **Yicheng JIANG** · [@yc-eagle](https://github.com/yc-eagle) | Beijing Foreign Studies University | Original concept and topic selection; core project work; progress, repository and workflow; pitch deck and presentation |
| **Shuoyang SUN** · [@lkwet](https://github.com/lkwet) | Tsinghua University | Desktop-web product development and live demonstration |
| **Lin MA** · [@huaxiamalin113](https://github.com/huaxiamalin113) | Tsinghua University | Domain expertise, rule-review work and Raccoon evidence |

The team’s [AI-development evidence ledger](../raccoon-usage-log.md) separates reproducible engineering artifacts—data checks, rule code, offline runtime, validation tools and CI—from platform-use records. A software test does not establish that a Raccoon session occurred or that its output was medically approved.

Data and software attribution, model sources and AI-assisted development are documented in [CREDITS](../../CREDITS.md). [Project repository](https://github.com/yc-eagle/med-safe).
