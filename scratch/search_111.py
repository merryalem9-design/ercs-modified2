import zipfile
import xml.etree.ElementTree as ET
import os

base_dir = '/Users/admin/Desktop/Project allignment'
files = [f for f in os.listdir(base_dir) if f.endswith('.xlsx') and not f.startswith('~$')]

def search_in_xlsx(filepath, search_str):
    with zipfile.ZipFile(filepath) as z:
        # shared strings
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

        sheets = []
        for s in wb_root.findall('.//ns:sheet', main_ns):
            name = s.attrib['name']
            r_id = s.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id']
            target = rel_map[r_id]
            if not target.startswith('xl/'):
                target = 'xl/' + target
            sheets.append((name, target))

        matches = []
        for s_name, s_target in sheets:
            sheet_xml = z.read(s_target)
            s_root = ET.fromstring(sheet_xml)
            for row in s_root.findall('.//ns:row', main_ns):
                r_idx = row.attrib.get('r', '')
                cells = []
                found = False
                for c in row.findall('./ns:c', main_ns):
                    c_type = c.attrib.get('t')
                    v_el = c.find('./ns:v', main_ns)
                    val = v_el.text if v_el is not None else ''
                    if c_type == 's' and val:
                        val = shared_strings[int(val)]
                    cells.append(str(val))
                    if search_str.lower() in str(val).lower():
                        found = True
                if found:
                    matches.append((s_name, r_idx, cells[:10]))
        return matches

for f in files:
    fp = os.path.join(base_dir, f)
    m = search_in_xlsx(fp, '1.1.1')
    print(f"\nFile: {f} -> {len(m)} matches for '1.1.1'")
    for sheet, r_idx, row in m[:5]:
        print(f"  [{sheet}] row {r_idx}: {row}")
