import openpyxl
import json
import re

excel_path = '/Users/admin/Desktop/Project allignment/DPR-Revised project Alignment.xlsx'
wb = openpyxl.load_workbook(excel_path, data_only=True)

print("=== DETAILED ANALYSIS OF DPR-Revised project Alignment.xlsx ===")

for sname in wb.sheetnames:
    sheet = wb[sname]
    print(f"\n=======================================================")
    print(f"SHEET: '{sname}' (max_row={sheet.max_row}, max_col={sheet.max_column})")
    print(f"=======================================================")
    
    # Extract metadata from header rows (rows 1-8)
    meta = {}
    header_row_idx = None
    for r in range(1, min(15, sheet.max_row + 1)):
        row_vals = [sheet.cell(r, c).value for c in range(1, sheet.max_column + 1)]
        first_val = str(row_vals[0]).strip() if row_vals[0] is not None else ""
        
        # Check for header row of table
        lower_vals = [str(v).lower() for v in row_vals if v is not None]
        if any('project activities' in v or 'project activity' in v or 'activity' in v for v in lower_vals) and any('budget' in v or 'target' in v for v in lower_vals):
            header_row_idx = r
            headers = [str(v).strip() if v is not None else f"col_{i+1}" for i, v in enumerate(row_vals)]
            print(f"  -> Found Table Header at Row {r}: {headers}")
            break
        else:
            # Metadata row
            for cell_val in row_vals:
                if cell_val is not None:
                    print(f"  Meta R{r}: {cell_val}")

    if not header_row_idx:
        print("  WARNING: No table header row found!")
        continue

    # Now read data rows
    data_rows = []
    for r in range(header_row_idx + 1, sheet.max_row + 1):
        row_vals = [sheet.cell(r, c).value for c in range(1, len(headers) + 1)]
        # If all cells are None, skip
        if not any(v is not None for v in row_vals):
            continue
        # Check if first cell is 'Total' or similar
        first_str = str(row_vals[0]).strip().lower() if row_vals[0] is not None else ""
        if 'total' in first_str:
            print(f"  -> Total row at R{r}: {row_vals}")
            continue
        data_rows.append(row_vals)

    print(f"  Total data rows: {len(data_rows)}")
    if data_rows:
        print("  Sample first data row:", data_rows[0])
        print("  Sample last data row:", data_rows[-1])
