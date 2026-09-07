import json
import re
import os

seed_path = 'src/data/seedData.ts'
app_context_path = 'src/context/AppContext.tsx'

with open('scratch/parsed_alignment2.json') as f:
    parsed_sheets = json.load(f)

sheet_by_name = {s['sheet_name']: s for s in parsed_sheets}

with open(seed_path) as f:
    seed_content = f.read()

# 1. Parse existing INITIAL_NATIONAL_ACTIVITIES
na_match = re.search(r'export const INITIAL_NATIONAL_ACTIVITIES: NationalActivity\[\] = (\[.*?\]);\n\nexport const INITIAL_REGIONS', seed_content, re.DOTALL)
assert na_match, "Failed to find INITIAL_NATIONAL_ACTIVITIES"
nas = json.loads(na_match.group(1))
na_by_code = {n['code'].strip(): n for n in nas}
print(f"Loaded {len(nas)} National Activities.")

# 2. Parse existing INITIAL_PROJECTS (must have 18 existing projects)
proj_match = re.search(r'export const INITIAL_PROJECTS: Project\[\] = (\[.*?\]);\n\nexport const INITIAL_PLAN_ENTRIES', seed_content, re.DOTALL)
assert proj_match, "Failed to find INITIAL_PROJECTS"
existing_projects = json.loads(proj_match.group(1))
assert len(existing_projects) == 18, f"Expected 18 existing projects, found {len(existing_projects)}"
print(f"Existing 18 projects: {[p['id'] for p in existing_projects]}")

# 3. Define 6 new project configurations
new_proj_configs = [
    {
        'sheet': 'Migration ',
        'id': 'wb-resilience-migration',
        'name': 'Well Being Resilience for Migrants and Vulnerable Communities',
        'description': 'Well Being Resilience for Migrants and Vulnerable Communities',
        'donor': 'Danish Red Cross',
        'location': 'Amhara (Gondar), Tigray (Shire), Addis Ababa, & Oromia (Arsi)',
        'budget': 74738454.58,
        'totalBudget': 'Birr 74,738,454.58',
        'startDate': '2022-01-01',
        'endDate': '2026-12-31',
        'target': '56,768 individuals',
        'totalBeneficiaries': 56768,
        'currency': 'ETB'
    },
    {
        'sheet': 'Sudan Population Movement',
        'id': 'sudan-pop-movement',
        'name': 'Sudan Population Movement',
        'description': 'Sudan Population Movement',
        'donor': 'International Federation of Red Cross and Red Crescent Societies (IFRC)',
        'location': 'Benishangul Gumuz (Asosa Zone) & Amhara (Metema)',
        'budget': 120720502.0,
        'totalBudget': '120,720,502 ETB',
        'startDate': '2023-04-01',
        'endDate': '2026-12-31',
        'target': '150,000',
        'totalBeneficiaries': 150000,
        'currency': 'ETB'
    },
    {
        'sheet': 'Livelihood Improvement Afar pro',
        'id': 'livelihood-afar',
        'name': 'Livelihood Improvement in Afar',
        'description': 'Livelihood Improvement in Afar',
        'donor': 'Netherlands Red Cross (NLRC)',
        'location': 'Afar',
        'budget': 17395476.0,
        'totalBudget': '17,395,476 ETB',
        'startDate': '2026-01-01',
        'endDate': '2026-12-31',
        'target': '1,450 HH',
        'totalBeneficiaries': 1450,
        'currency': 'ETB'
    },
    {
        'sheet': 'RISE Project',
        'id': 'rise-project',
        'name': 'RISE Project',
        'description': 'RISE Project',
        'donor': 'ERCS - IFRC - RISE Project',
        'location': 'South Ethiopia (Wolayta)',
        'budget': 57742697.35,
        'totalBudget': '57,742,697.35 ETB',
        'startDate': '2024-09-01',
        'endDate': '2026-08-31',
        'target': '50,000',
        'totalBeneficiaries': 50000,
        'currency': 'ETB'
    },
    {
        'sheet': 'Social Cohesion',
        'id': 'social-cohesion',
        'name': 'Social Cohesion Project',
        'description': 'Social Cohesion Project',
        'donor': 'Danish Red Cross',
        'location': 'Benishangul Gumuz (Asosa Zone), Tigray (West North) & Amhara (North Wollo)',
        'budget': 214157098.3,
        'totalBudget': '214,157,098.30 ETB',
        'startDate': '2024-05-01',
        'endDate': '2027-05-31',
        'target': '32,119',
        'totalBeneficiaries': 32119,
        'currency': 'ETB'
    },
    {
        'sheet': 'SRC migration project',
        'id': 'src-migration',
        'name': 'Humane, Dignified, Sustainable Migration and Return (SRC)',
        'description': 'Humane, Dignified, Sustainable Migration and Return',
        'donor': 'Swedish Red Cross',
        'location': 'Oromia (Jimma) & Amhara (North Wollo)',
        'budget': 85451455.8,
        'totalBudget': '85,451,455.80 ETB',
        'startDate': '2026-01-01',
        'endDate': '2027-03-31',
        'target': '5,000 individuals',
        'totalBeneficiaries': 5000,
        'currency': 'ETB'
    }
]

new_projects = []
new_targets_by_na_id = {}

for pdef in new_proj_configs:
    sheet_data = sheet_by_name[pdef['sheet']]
    
    # Non-contributing activities
    non_contributing = []
    for idx, unlinked in enumerate(sheet_data['unlinked_activities']):
        nc_item = {
            'id': f"{pdef['id']}-nc-{idx+1}",
            'name': unlinked['project_activity'],
            'target': unlinked['target'],
            'budget': unlinked['budget'],
            'raw_code': unlinked['raw_code'] if unlinked['raw_code'] else 'Not linked with AOP'
        }
        if unlinked.get('uom'):
            nc_item['uom'] = unlinked['uom']
        non_contributing.append(nc_item)

    # Linked activities
    for linked in sheet_data['linked_activities']:
        code = linked['clean_code']
        na = na_by_code.get(code)
        if not na:
            raise ValueError(f"Could not find NA for code '{code}' in sheet {pdef['sheet']}")
        na_id = na['id']
        if na_id not in new_targets_by_na_id:
            new_targets_by_na_id[na_id] = {}
        if pdef['id'] not in new_targets_by_na_id[na_id]:
            new_targets_by_na_id[na_id][pdef['id']] = {'target': 0.0, 'budget': 0.0}
        new_targets_by_na_id[na_id][pdef['id']]['target'] += linked['target']
        new_targets_by_na_id[na_id][pdef['id']]['budget'] += linked['budget']

    proj_obj = {
        'id': pdef['id'],
        'name': pdef['name'],
        'description': pdef['description'],
        'budget': pdef['budget'],
        'donor': pdef['donor'],
        'target': pdef['target'],
        'start_date': pdef['startDate'],
        'end_date': pdef['endDate'],
        'location': pdef['location'],
        'totalBudget': pdef['totalBudget'],
        'startDate': pdef['startDate'],
        'endDate': pdef['endDate'],
        'totalBeneficiaries': pdef['totalBeneficiaries'],
        'currency': pdef['currency'],
        'project_only_activities': non_contributing
    }
    new_projects.append(proj_obj)
    print(f"Prepared project '{pdef['id']}': {len(non_contributing)} unlinked activities, {len(sheet_data['linked_activities'])} linked entries")

all_projects = existing_projects + new_projects
assert len(all_projects) == 24, f"Expected 24 total projects, got {len(all_projects)}"

# Update NationalActivities
updated_nas = []
for na in nas:
    na_copy = dict(na)
    na_id = na['id']
    if na_id in new_targets_by_na_id:
        pt = dict(na_copy.get('project_targets', {}))
        ep = list(na_copy.get('eligible_project_ids', []))
        for p_id, vals in new_targets_by_na_id[na_id].items():
            pt[p_id] = vals
            if p_id not in ep:
                ep.append(p_id)
        na_copy['project_targets'] = pt
        na_copy['eligible_project_ids'] = ep
    updated_nas.append(na_copy)

print(f"Total National Activities: {len(updated_nas)}")
print(f"New targets added across {len(new_targets_by_na_id)} National Activities:")
for na_id, p_targets in new_targets_by_na_id.items():
    code = next(n['code'] for n in updated_nas if n['id'] == na_id)
    print(f"   {na_id} ({code}): {p_targets}")

# Write to seedData.ts
na_start_marker = 'export const INITIAL_NATIONAL_ACTIVITIES: NationalActivity[] ='
na_idx = seed_content.find(na_start_marker)
prefix = seed_content[:na_idx]

reg_start_marker = '\nexport const INITIAL_REGIONS: Region[] ='
reg_idx = seed_content.find(reg_start_marker)
mid_section = seed_content[reg_idx:seed_content.find('\nexport const INITIAL_PROJECTS: Project[] =')]

plan_start_marker = '\nexport const INITIAL_PLAN_ENTRIES: PlanEntry[] ='
plan_idx = seed_content.find(plan_start_marker)
suffix = seed_content[plan_idx:]

nas_json_str = json.dumps(updated_nas, indent=2)
projects_json_str = json.dumps(all_projects, indent=2)

new_seed_content = (
    prefix +
    na_start_marker + " " + nas_json_str + ";\n" +
    mid_section +
    "\nexport const INITIAL_PROJECTS: Project[] = " + projects_json_str + ";\n" +
    suffix
)

with open(seed_path, 'w') as f:
    f.write(new_seed_content)

print(f"Updated {seed_path} successfully with 24 projects!")

# Bump PERSISTENCE_KEY in AppContext.tsx to ercs-aop-bottom-up-v15
with open(app_context_path) as f:
    app_ctx = f.read()

if 'ercs-aop-bottom-up-v14' in app_ctx:
    app_ctx = app_ctx.replace("const PERSISTENCE_KEY = 'ercs-aop-bottom-up-v14';", "const PERSISTENCE_KEY = 'ercs-aop-bottom-up-v15';")
    with open(app_context_path, 'w') as f:
        f.write(app_ctx)
    print("Bumped PERSISTENCE_KEY to ercs-aop-bottom-up-v15 in AppContext.tsx!")
else:
    print("WARNING: Could not find ercs-aop-bottom-up-v14 in AppContext.tsx")
