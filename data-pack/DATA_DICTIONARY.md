# Data dictionary and scope

Current inventory is `../data/data_inventory.json`. Its counts are authoritative for the generated browser bundle, subject to rebuilding after edits.

| Entity | Fields / meaning |
|---|---|
| Product | registration_number, product_name, active_ingredients, licence holder and available official catalogue fields; holder is not manufacturer |
| Ingredient row | one original catalogue string belonging to a product; multiple strings may refer to related entities, but equivalence is not assumed |
| Explicit alias | a listed phrase mapped to a prepared canonical ingredient; unlisted values stay unmapped |
| Illustrative formulation | one of 13 selected catalogue products, with name-derived route hints clearly distinct from user-confirmed route |
| Rule | rule_id, kind, ingredient_a/b, evidence_level, wording, source_id/URL/section/date, allowed_routes, review_status; 14 current rules, all clinician-reviewed on 2026-10-03 |
| Source | source_id, exact URL, title, jurisdiction, document date if known, retrieval date, SHA-256; local_file can refer to excluded retrieval archives |
| Ingredient profile | general uses, selected side effects/precautions, source ids, review status; 14 profiles, not personal prescriptions |
| Formulation hint | strength text occurring in name, route hint, missing fields; not verified per-unit dose |
| Lexicon | 22 input-assistance/controlled-language entries, not clinical evidence |

Missing values are unknown, not absent risk. Complete HK labels, structured per-unit strengths, dose/frequency/duration, manufacturer, batch, expiry, complete interactions and individualized contraindication assessment are not supplied. No rule hit cannot become a safe verdict.

SQLite is a local representation of these entities, not a separate licensed clinical source. The current-rule table and JSON must be kept synchronized during releases; legacy table names do not imply distinct clinical evidence. All 14 rules carry a recorded clinician review dated 2026-10-03; the review covers wording, sourcing and scope and is not a validated clinical risk model.

## Review status

The 14 curated clinical rules were clinician-reviewed on 2026-10-03, each with a named reviewer and verdict. Ingredient education profiles, the seed lexicon and patient wording remain pending review.
