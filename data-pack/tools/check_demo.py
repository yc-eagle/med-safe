"""Offline data-integration example, restricted to 13 selected products.

This is a hackathon demonstration. It never returns a clinical "safe" verdict.
Run only after checking the registration numbers against the actual packaging.
"""
from pathlib import Path
import json
import argparse
from itertools import combinations

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS = {p['registration_number']: p for p in json.loads((ROOT/'data/demo_products.json').read_text())}
RULES = json.loads((ROOT/'data/demo_rules.json').read_text())

def check(registration_numbers, confirmed=False):
    result = dict(mode='demo_only', medical_review_status='clinician_reviewed',
                  clinical_safety='not_assessed', coverage_complete=False,
                  alerts=[], unknown_products=[], message='')
    if not confirmed:
        result.update(status='identity_confirmation_required', message='請先對照包裝確認藥名、註冊編號及劑型。')
        return result
    if len(registration_numbers) < 2:
        result.update(status='insufficient_products', message='至少需要兩項已確認的藥品；單一藥品識別不代表安全核對完成。')
        return result
    if len(set(registration_numbers)) != len(registration_numbers):
        result.update(status='duplicate_input_requires_review', message='同一註冊編號輸入了多次，請確認是重複掃描還是實際用了兩份。')
        return result
    result['unknown_products'] = [x for x in registration_numbers if x not in PRODUCTS]
    known = [PRODUCTS[x] for x in registration_numbers if x in PRODUCTS]
    for a,b in combinations(known,2):
        for rule in RULES:
            if a['demo_route'] not in rule['allowed_routes'] or b['demo_route'] not in rule['allowed_routes']:
                continue
            ia,ib = set(a['canonical_ingredients']),set(b['canonical_ingredients'])
            ra,rb = rule['ingredient_a'],rule['ingredient_b']
            match = (ra in ia and rb in ib) or (ra in ib and rb in ia)
            if match:
                result['alerts'].append(dict(rule_id=rule['rule_id'], products=[a['registration_number'],b['registration_number']],
                                             summary=rule['summary_zh'], action=rule['action_zh'],
                                             source_url=rule['source_url'], source_section=rule['source_section']))
    if result['unknown_products']:
        result.update(status='incomplete_check',message='部分藥品不在演示白名單；已知組合的提示仍列出，但核對未完成。請向藥劑師核實。')
    elif result['alerts']:
        result.update(status='alerts_found',message='找到演示規則提示。規則庫不完整且待醫學複核，不能排除其他風險。')
    else:
        result.update(status='no_rule_found',message='目前十條演示規則沒有覆蓋此組合，不能據此判定可以合用。請向藥劑師核實。')
    return result

if __name__ == '__main__':
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument('registration_numbers',nargs='+')
    p.add_argument('--confirmed',action='store_true',help='You have confirmed identities against actual packaging.')
    args=p.parse_args()
    print(json.dumps(check(args.registration_numbers,args.confirmed),ensure_ascii=False,indent=2))
