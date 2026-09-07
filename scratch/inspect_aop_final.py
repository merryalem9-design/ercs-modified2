import zipfile
import xml.etree.ElementTree as ET
import os

base_dir = '/Users/admin/Desktop/Project allignment'
fp = os.path.join(base_dir, 'ERCS 2019 AOP final for PMER MIS settings (1).xlsx')

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

    sheets = []
    for s in wb_root.findall('.//ns:sheet', main_ns):
        name = s.attrib['name']
        r_id = s.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id']
        target = rel_map[r_id]
        if not target.startswith('xl/'):
            target = 'xl/' + target
        sheets.append((name, target))

    for s_name, s_target in sheets:
        sheet_xml = z.read(s_target)
        s_root = ET.fromstring(sheet_xml)
        print(f"\n================ SHEET: {s_name} ================")
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
        print(f"Total rows: {len(rows)}")
        for r_idx, row_arr in rows[:15]:
            print(f"Row {r_idx} (len {len(row_arr)}): {row_arr[:15]}")
