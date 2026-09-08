import openpyxl

file_path = '/Users/admin/Desktop/Project allignment/DPR-Revised project Alignment.xlsx'
wb = openpyxl.load_workbook(file_path, data_only=True)

print("=== ALL SHEETS IN DPR-Revised project Alignment.xlsx ===")
for sheet_name in wb.sheetnames:
    sheet = wb[sheet_name]
    print(f"\n--- Sheet: '{sheet_name}' (max_row={sheet.max_row}, max_col={sheet.max_column}) ---")
    
    # Print the first 8 rows to see header structure
    for r in range(1, min(10, sheet.max_row + 1)):
        row_vals = [sheet.cell(r, c).value for c in range(1, min(15, sheet.max_column + 1))]
        if any(v is not None for v in row_vals):
            print(f"Row {r}: {row_vals}")
