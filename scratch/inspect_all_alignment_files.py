import zipfile
import xml.etree.ElementTree as ET
import os
import json

base_dir = '/Users/admin/Desktop/Project allignment'
files = [f for f in os.listdir(base_dir) if f.endswith('.xlsx') and not f.startswith('~$')]

print("Found files:", files)

def get_sheet_names(filepath):
    with zipfile.ZipFile(filepath) as z:
        wb_root = ET.fromstring(z.read('xl/workbook.xml'))
        main_ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
        return [s.attrib['name'] for s in wb_root.findall('.//ns:sheet', main_ns)]

for f in files:
    fp = os.path.join(base_dir, f)
    sheets = get_sheet_names(fp)
    print(f"\n--- File: {f} ---")
    print(f"Sheets ({len(sheets)}): {sheets}")
