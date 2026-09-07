import zipfile
import xml.etree.ElementTree as ET
import os

base_dir = '/Users/admin/Desktop/Project allignment'

def dump_sheet_rows(filename, sheet_name, max_rows=30):
    fp = os.path.join(base_dir, filename)
    with zipfile.ZipFile(fp) as z:
        shared_strings = []
        if 'xl/sharedStrings.xml' in z.namelist():
            ss_root = ET.fromstring(z.read('xl/sharedStrings.xml'))
            ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
            for si in ss_root.findall('.//ns:si', ns):
                text_parts = [t.text or '' for t in si.findall('.//ns:t', ns)]
                shared_strings.append(''.join(text_parts))

        wb_root = ET.fromstring(z.read('xl/workbook.xml'))
        rels_root = ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
        rel_map = {rel.attrib['Id']: rel.attrib['Target'] for rel in rels_root}
        main_ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}

        sheets = {}
        for s in wb_root.findall('.//ns:sheet', main_ns):
            s_name = s.attrib['name']
            r_id = s.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id']
            target = rel_map[r_id]
            if not target.startswith('xl/'):
                target = 'xl/' + target
            sheets[s_name] = target

        if sheet_name not in sheets:
            print(f"Sheet {sheet_name} not found in {filename}. Available: {list(sheets.keys())}")
            return

        sheet_xml = z.read(sheets[sheet_name])
        s_root = ET.fromstring(sheet_xml)
        print(f"\n--- {filename} -> [{sheet_name}] ---")
        rows = []
        for row in s_root.findall('.//ns:row', main_ns):
            r_idx = row.attrib.get('r', '')
            cells = {}
            for c in row.findall('./ns:c', main_ns):
                r_ref = c.attrib.get('r', '')
                col_letters = ''.join([ch for ch in r_ref if ch.isalpha()])
                col_idx = 0
                for ch in col_letters:
                    col_idx = col_idx * 26 + (ord(ch.upper()) - ord('A') + 1)
                col_idx -= 1
                c_type = c.attrib.get('t')
                v_el = c.find('./ns:v', main_ns)
                val = v_el.text if v_el is not None else ''
                if c_type == 's' and val:
                    val = shared_strings[int(val)]
                cells[col_idx] = val
            if cells:
                max_c = max(cells.keys())
                row_arr = [cells.get(i, '') for i in range(max_c + 1)]
                rows.append((r_idx, row_arr))
        for r_idx, r in rows[:max_rows]:
            print(f"R{r_idx}: {r}")

dump_sheet_rows('AOP alignment Health and WASH projects.xlsx', 'DHIS2', 15)
dump_sheet_rows('AOP alignment Health and WASH projects.xlsx', 'SKY Bird II', 15)
dump_sheet_rows('AOP alignment2.xlsx', 'RISE Project', 15)
