# Traceable Logic for Multi-Medicine Checking

[中文](decision-logic.md) | [English](decision-logic.en.md)

Core code: `app/engine.js`. The input is 2 to 12 distinct products together with the user's confirmation state and the actual route of administration. Single-medicine lookup is an independent function and does not need to go through the pairwise rules.

1. **Identity**: The full HK registration number must exist in the catalogue and be confirmed by the user item by item. OCR matching on the registration number or the name produces candidates only. A fuzzy brand cannot uniquely determine the formulation; if confirmation is declined, the full check does not proceed.
2. **Ingredients**: All ingredients are expanded from the catalogue. After NFKC / whitespace / case normalisation, only explicit aliases are matched. String containment and language-model guessing of salt-form equivalence are not relied on. Both raw values and unmapped values are kept.
3. **Route**: The user selects oral, sublingual, topical and so on; an unconfirmed route counts as a gap. Routes derived from demonstration formulation names are hints with their source noted and must not be described as verified against the physical product.
4. **Pairwise**: For n products, all n(n-1)/2 pairs are enumerated, up to 66. Each pair lists together the original catalogue same-ingredient text, the matched rules, the potential rules, the gaps and the status.
5. **Evidence**: An applicable warning is output only when the ingredients on both sides correspond to a rule and the routes on both sides are inside the permitted range. If the ingredients match but the route is unconfirmed or does not match, it is listed as a prompt to be confirmed and must not be extrapolated.
6. **Strength**: Labelling contraindication, recommends avoid, increased risk, consult first, duplicate ingredient and other different levels are kept. A risk warning is not the same as a blanket prohibition. For example, aspirin with clopidogrel may be a regimen deliberately arranged by a doctor, and users are not advised to stop it themselves.
7. **Completeness**: Every pair is given a record; where there is no rule, it is marked as not covered. Even when one pair matches, the other gaps in a multi-medicine list do not disappear.

Every result currently always contains `clinicalSafety: not_assessed`, `coverageComplete: false` and `reviewStatus: clinician_reviewed`; there is no branch that outputs a safe / green-light conclusion.

## What the output can mean

| Output | Meaning |
|---|---|
| identity_confirmation_required | At least one product has not been confirmed by the user |
| incomplete_check | Unrecognised, missing route, or has an unmapped ingredient |
| alerts_found | At least one rule with a source inside the selected range matched |
| no_rule_found | The current rule library has no match; this does not mean the combination can be used together |
| route_review_required | An ingredient prompt exists, but the applicable route is not satisfied |
| duplicate_input_requires_review | The same product was added repeatedly; first verify whether it really is a duplicate record |

`ingredientOverlaps` is only the fact that catalogue ingredient text is identical; it must not be passed off as the risk of every medicine of the same class. Two products with different ingredients can still interact, and identical ingredients also have to be judged together with the actual dose and the prescription.

## Outside the model's capability

Dosage, treatment duration, dosing intervals, higher-order effects at three or more medicines, hepatic and renal adjustment, allergy matching, pregnancy / breastfeeding / paediatric regimens, comprehensive risk of multi-herb formulations, food interactions and recall monitoring are all not completed. These gaps cannot be removed automatically by downloading more model weights; they require reliable data, a scope of applicability and professional validation.

## Validating AI output

`app/verify.html` first compares the raw AI output against independently confirmed catalogue fields, and then checks the rules separately. Alias normalisation, field conflicts and insufficient evidence are recorded separately. A rule not being found does not mean the AI field is necessarily wrong, and all fields being correct does not mean the medical judgement has been validated. The raw output and the verification process are retained; failure cases are not manufactured and platform records are not fabricated.
