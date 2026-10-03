# Current data package

Current counts and limits: [`../data/data_inventory.json`](../data/data_inventory.json); full human-readable explanation: [`../docs/data-inventory.md`](../docs/data-inventory.md).

- `raw/DrugList.xml` and `.xsd`: Hong Kong Department of Health official open catalogue, lastUpdate 2026-09-25.
- `data/hk_products.json`, `.csv` and `hk_medication.sqlite`: 14,269 products / 23,835 ingredient rows derived from that catalogue.
- `data/demo_products.json`: 13 illustrative formulations, not a comprehensive clinical coverage list.
- `data/demo_rules.json`: current 14 sourced rule drafts, all pending professional review.
- `data/ingredient_aliases.json`, `data/rule_sources.json`: explicit aliases and exact source provenance.
- `download_manifest.json`, `SHA256SUMS.txt`: historical source retrieval evidence. Some listed full clinical webpages/labels are intentionally not redistributed; use source URLs for the originals.

The public data package does not include participant records, credentials, private event documents, patient media, complete ASHP articles or downloaded US label XML. Read [`../CREDITS.md`](../CREDITS.md) before reuse. Data cleaning or filename presence never means clinical approval.

`validation/` 保存第一版（10 条规则时）的历史运行记录，不能作为当前 14 条规则的完整验收结果。当前版本工程证据在项目根目录 `qa/`；规则和目录的当前事实见 `data/data_inventory.json`。
