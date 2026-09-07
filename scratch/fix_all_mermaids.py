import re

# 1. mermaid_1.mmd
m1_defs = """
    ELIGIBLE_ZONE_ITEM {
        string item_id PK
        string link_id FK
        string zone_id FK
    }
    OUTPUT {
        string output_id PK
        string activity_id FK
        string statement
    }
    OUTPUT_INDICATOR {
        string indicator_id PK
        string output_id FK
        string indicator_code
        decimal target
    }
    REGION {
        string region_id PK
        string code "REG-OR"
        string name "Oromia"
    }
    ZONE {
        string zone_id PK
        string region_id FK
        string code "ZN-BOR"
        string name "Borena"
    }
"""
with open("/Users/admin/Desktop/ercs_modified2/scratch/mermaid_1.mmd", "r") as f:
    m1 = f.read()
if "ELIGIBLE_ZONE_ITEM {" not in m1:
    m1 = m1.strip() + "\n" + m1_defs
with open("/Users/admin/Desktop/ercs_modified2/scratch/mermaid_1.mmd", "w") as f:
    f.write(m1)

# 2. mermaid_2.mmd
m2_defs = """
    STRATEGIC_PLAN {
        string plan_id PK
        string plan_name
        int start_year
        int end_year
        string status
    }
"""
with open("/Users/admin/Desktop/ercs_modified2/scratch/mermaid_2.mmd", "r") as f:
    m2 = f.read()
if "STRATEGIC_PLAN {" not in m2:
    m2 = m2.strip() + "\n" + m2_defs
with open("/Users/admin/Desktop/ercs_modified2/scratch/mermaid_2.mmd", "w") as f:
    f.write(m2)

# 3. mermaid_3.mmd
m3_defs = """
    AOP_PLAN {
        string plan_id PK
        string project_id FK
        string plan_type "AOP-CORE|AOP-Donor"
        string fiscal_year
        string calendar_type "Hamle-Sene|MOU"
        string scope_level "HQ|Branch|Project"
        string region_id FK
        string approval_status "Draft|Approved"
    }
    NATIONAL_ACTIVITY {
        string activity_id PK
        string activity_code "Unique 1.1.1"
        string strategic_objective_id FK
        string department_id FK
        string name
        string uom FK
    }
    QUARTERLY_PLAN {
        string quarterly_plan_id PK
        string plan_entry_id FK
        string quarter_id "Q1..Q4"
        decimal target
        decimal budget
        decimal fx_rate_to_etb
        string approval_status
    }
    WOREDA {
        string woreda_id PK
        string zone_id FK
        string name
    }
"""
with open("/Users/admin/Desktop/ercs_modified2/scratch/mermaid_3.mmd", "r") as f:
    m3 = f.read()
if "AOP_PLAN {" not in m3:
    m3 = m3.strip() + "\n" + m3_defs
with open("/Users/admin/Desktop/ercs_modified2/scratch/mermaid_3.mmd", "w") as f:
    f.write(m3)

# 4. mermaid_4.mmd
m4_defs = """
    OUTPUT_INDICATOR {
        string indicator_id PK
        string indicator_code
        string name
        string frequency "Monthly"
    }
    PLAN_ENTRY {
        string plan_entry_id PK
        string national_activity_id FK
        string zone_id FK
        string project_id FK
        decimal annual_target
        decimal annual_budget
        string approval_status
    }
    PROJECT {
        string project_id PK
        string name
        decimal total_budget
        string currency
    }
    REGION {
        string region_id PK
        string code
        string name
    }
"""
with open("/Users/admin/Desktop/ercs_modified2/scratch/mermaid_4.mmd", "r") as f:
    m4 = f.read()
if "OUTPUT_INDICATOR {" not in m4:
    m4 = m4.strip() + "\n" + m4_defs
with open("/Users/admin/Desktop/ercs_modified2/scratch/mermaid_4.mmd", "w") as f:
    f.write(m4)

# 5. mermaid_5.mmd
m5_defs = """
    EVIDENCE_ATTACHMENT {
        string attachment_id PK
        string parent_doctype
        string parent_id FK
        string file_name
        string file_url
        datetime upload_date
    }
    USER {
        string user_id PK
        string full_name
        string email
        string role_category
    }
    ZONE {
        string zone_id PK
        string code
        string name
    }
"""
with open("/Users/admin/Desktop/ercs_modified2/scratch/mermaid_5.mmd", "r") as f:
    m5 = f.read()
if "EVIDENCE_ATTACHMENT {" not in m5:
    m5 = m5.strip() + "\n" + m5_defs
with open("/Users/admin/Desktop/ercs_modified2/scratch/mermaid_5.mmd", "w") as f:
    f.write(m5)

print("All mermaid files updated with complete entity blocks.")
