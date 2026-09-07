import re

# Update mermaid_2.mmd
m2_path = "/Users/admin/Desktop/ercs_modified2/scratch/mermaid_2.mmd"
with open(m2_path, "r") as f:
    m2 = f.read()

m2 = m2.replace('string code "SP1..SP5"', 'string code "SP1..SP8"')
m2 = m2.replace('string kpi_title', 'string description\n        string means_of_verification\n        text notes')
m2 = m2.replace('string reported_value', 'string value\n        string recorded_by FK\n        text note')
with open(m2_path, "w") as f:
    f.write(m2)
print("Updated mermaid_2.mmd")

# Update mermaid_3.mmd
m3_path = "/Users/admin/Desktop/ercs_modified2/scratch/mermaid_3.mmd"
with open(m3_path, "r") as f:
    m3 = f.read()

# Remove PROJECT_ONLY_ACTIVITY relation and entity
m3 = re.sub(r'PROJECT\s+\|\|--o\{\s+PROJECT_ONLY_ACTIVITY\s*:\s*"[^"]*"\s*\n?', '', m3)
m3 = re.sub(r'PROJECT_ONLY_ACTIVITY\s*\{[^}]*\}\s*\n?', '', m3)

# Add AOP_PLAN project relation and project_id FK
m3 = m3.replace('AOP_PLAN ||--o{ PLAN_ENTRY : "encompasses"', 'PROJECT ||--o{ AOP_PLAN : "scoped_by"\n    AOP_PLAN ||--o{ PLAN_ENTRY : "encompasses"')
if 'string project_id FK' not in m3 and 'AOP_PLAN {' in m3:
    m3 = m3.replace('AOP_PLAN {', 'AOP_PLAN {\n        string plan_id PK\n        string project_id FK\n        string plan_type "AOP-CORE|AOP-Donor"\n        string scope_level "HQ|Branch|Project"')

with open(m3_path, "w") as f:
    f.write(m3)
print("Updated mermaid_3.mmd")

# Update mermaid_4.mmd
m4_path = "/Users/admin/Desktop/ercs_modified2/scratch/mermaid_4.mmd"
with open(m4_path, "r") as f:
    m4 = f.read()

m4 = m4.replace('FINANCIAL_VERIFICATION_RECORD', 'FINANCIAL_VERIFICATION')
m4 = m4.replace('string woreda\n', 'string woreda_id FK\n')
m4 = m4.replace('"Draft|Pending|Approved"', '"Draft|Pending Approval|Approved|Rejected|Locked"')
with open(m4_path, "w") as f:
    f.write(m4)
print("Updated mermaid_4.mmd")

# Update mermaid_5.mmd
m5_path = "/Users/admin/Desktop/ercs_modified2/scratch/mermaid_5.mmd"
with open(m5_path, "r") as f:
    m5 = f.read()

m5 = re.sub(r'REGION\s+\|\|--o\{\s+RED_CROSS_CLUB\s*:\s*"[^"]*"\s*\n?', '', m5)
m5 = m5.replace('        string region_id FK\n', '')

for entity in ['KM_TOOL_RECORD', 'KM_LESSON_LEARNED', 'KM_MEDIA_UPDATE', 'KM_TEMPLATE_GUIDELINE', 'KM_RESOURCE_CENTER']:
    pattern = f'({entity}\s*\{{[^}}]*?)(string status|string access_level|string video_duration|string source_org)'
    if entity in m5 and 'created_by' not in m5.split(entity)[1].split('}')[0]:
        # add created_by at the end of entity attributes
        m5 = re.sub(rf'({entity}\s*\{{[^}}]*?)(\n\s*\}})', r'\1\n        string created_by FK\2', m5)

with open(m5_path, "w") as f:
    f.write(m5)
print("Updated mermaid_5.mmd")

