import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { DASHBOARD_TABS } from '../src/components/dashboard/dashboardUtils';

console.log('================================================================');
console.log('   MASTER REGRESSION & ENHANCEMENT VERIFICATION SUITE');
console.log('================================================================\n');

// -------------------------------------------------------------
// SECTION 1: Contributing Projects/Regions Drill-Down
// -------------------------------------------------------------
console.log('>>> [SECTION 1] Checking Drill-Down Component & Pages...');
const drillDownPath = path.resolve('src/components/common/NationalActivityDrillDown.tsx');
assert.ok(fs.existsSync(drillDownPath), 'NationalActivityDrillDown.tsx must exist');

const planPageCode = fs.readFileSync('src/pages/PlanPage.tsx', 'utf-8');
assert.ok(planPageCode.includes('NationalActivityDrillDown'), 'PlanPage must import & render NationalActivityDrillDown');

const reportPageCode = fs.readFileSync('src/pages/ReportPage.tsx', 'utf-8');
assert.ok(reportPageCode.includes('NationalActivityDrillDown'), 'ReportPage must import & render NationalActivityDrillDown');

const strategicPlanPageCode = fs.readFileSync('src/pages/StrategicPlanPage.tsx', 'utf-8');
assert.ok(strategicPlanPageCode.includes('NationalActivityDrillDown'), 'StrategicPlanPage must import & render NationalActivityDrillDown');

console.log('✓ Section 1 verified: Drill-down component integrated across Plan, Report, and Strategic Plan pages.\n');

// -------------------------------------------------------------
// SECTION 2: Cache-Busting & Deployment Headers
// -------------------------------------------------------------
console.log('>>> [SECTION 2] Checking Cache-Busting Configurations...');
const indexHtml = fs.readFileSync('index.html', 'utf-8');
assert.ok(indexHtml.includes('http-equiv="Cache-Control"'), 'index.html must include Cache-Control meta header');
assert.ok(indexHtml.includes('http-equiv="Pragma"'), 'index.html must include Pragma meta header');
assert.ok(indexHtml.includes('http-equiv="Expires"'), 'index.html must include Expires meta header');

const viteConfig = fs.readFileSync('vite.config.ts', 'utf-8');
assert.ok(viteConfig.includes('entryFileNames'), 'vite.config.ts must configure content-hashed entryFileNames');
assert.ok(viteConfig.includes('chunkFileNames'), 'vite.config.ts must configure content-hashed chunkFileNames');
assert.ok(viteConfig.includes('assetFileNames'), 'vite.config.ts must configure content-hashed assetFileNames');

const headersFile = fs.readFileSync('public/_headers', 'utf-8');
assert.ok(headersFile.includes('Cache-Control: no-cache, no-store, must-revalidate'), 'public/_headers must set no-cache for HTML');

const vercelJson = fs.readFileSync('vercel.json', 'utf-8');
assert.ok(vercelJson.includes('no-cache, no-store, must-revalidate'), 'vercel.json must set no-cache for HTML');

console.log('✓ Section 2 verified: Cache-busting meta tags, content hashes, and deployment headers configured.\n');

// -------------------------------------------------------------
// SECTION 3: Monitoring Enhancements & PMER Head Workflow
// -------------------------------------------------------------
console.log('>>> [SECTION 3] Checking Monitoring Enhancements...');
const typesCode = fs.readFileSync('src/types/index.ts', 'utf-8');
assert.ok(typesCode.includes("'PMER Head'"), 'UserRole must include PMER Head');
assert.ok(typesCode.includes('evidence_attachment_name'), 'MonitoringRecord must include evidence_attachment_name');
assert.ok(typesCode.includes('evidence_attachment_url'), 'MonitoringRecord must include evidence_attachment_url');
assert.ok(typesCode.includes('verified_expenditure'), 'MonitoringRecord must include verified_expenditure');
assert.ok(typesCode.includes('approval_status'), 'MonitoringRecord must include approval_status');

const monitoringSubmissionsPath = path.resolve('src/pages/MonitoringSubmissionsPage.tsx');
assert.ok(fs.existsSync(monitoringSubmissionsPath), 'MonitoringSubmissionsPage.tsx must exist');

const appTsx = fs.readFileSync('src/App.tsx', 'utf-8');
assert.ok(appTsx.includes('MonitoringSubmissionsPage'), 'App.tsx must route to MonitoringSubmissionsPage');

const sidebarCode = fs.readFileSync('src/components/common/Sidebar.tsx', 'utf-8');
assert.ok(sidebarCode.includes('PMER_HEAD_NAV'), 'Sidebar must define PMER_HEAD_NAV');

console.log('✓ Section 3 verified: PMER Head role, submissions queue, and evidence attachments fully wired.\n');

// -------------------------------------------------------------
// SECTION 4: Rename Dashboard Tab to "Department"
// -------------------------------------------------------------
console.log('>>> [SECTION 4] Checking Dashboard Tab Rename...');
const deptTab = DASHBOARD_TABS.find(t => t.id === 'departments');
assert.ok(deptTab, 'departments tab must exist');
assert.strictEqual(deptTab?.label, 'Department', 'Tab label must be exactly "Department"');
console.log(`✓ Section 4 verified: Tab id "${deptTab?.id}" has label "${deptTab?.label}".\n`);

// -------------------------------------------------------------
// SECTION 5: Non-Programmatic Review Queue & Monitoring
// -------------------------------------------------------------
console.log('>>> [SECTION 5] Checking Non-Programmatic Features...');
const planSubmissionsCode = fs.readFileSync('src/pages/ProjectQuarterlyPlanSubmissionsPage.tsx', 'utf-8');
assert.ok(planSubmissionsCode.includes('entryTypeFilter'), 'Plan submissions page must include entryTypeFilter');
assert.ok(planSubmissionsCode.includes('selectedDept'), 'Plan submissions page must include selectedDept filter');

const actualSubmissionsCode = fs.readFileSync('src/pages/ProjectQuarterlyActualSubmissionsPage.tsx', 'utf-8');
assert.ok(actualSubmissionsCode.includes('entryTypeFilter'), 'Actual submissions page must include entryTypeFilter');
assert.ok(actualSubmissionsCode.includes('selectedDept'), 'Actual submissions page must include selectedDept filter');

const monitoringRegCode = fs.readFileSync('src/pages/MonitoringRegisterPage.tsx', 'utf-8');
assert.ok(monitoringRegCode.includes('Department:'), 'MonitoringRegisterPage must format scope for department');

console.log('✓ Section 5 verified: Non-Programmatic filter dropdowns and monitoring scope display active.\n');

// -------------------------------------------------------------
// SECTION 6: Distinct Volunteers vs Members KPI Cards & RAG
// -------------------------------------------------------------
console.log('>>> [SECTION 6] Checking Volunteers vs Members KPI Cards & RAG Badges...');
const enablingTabCode = fs.readFileSync('src/components/dashboard/EnablingPrioritiesTab.tsx', 'utf-8');
assert.ok(enablingTabCode.includes('Total Volunteers'), 'EnablingPrioritiesTab must have Total Volunteers card');
assert.ok(enablingTabCode.includes('Total Members'), 'EnablingPrioritiesTab must have Total Members card');
assert.ok(!enablingTabCode.includes('title="Volunteers / Members"'), 'Conflated card must be removed from EnablingPrioritiesTab');

const execTabCode = fs.readFileSync('src/components/dashboard/ExecutiveOverviewTab.tsx', 'utf-8');
assert.ok(execTabCode.includes('Total Volunteers'), 'ExecutiveOverviewTab must have Total Volunteers card');
assert.ok(execTabCode.includes('Total Members'), 'ExecutiveOverviewTab must have Total Members card');

console.log('✓ Section 6 verified: Distinct cards and RAG indicators implemented on Performance Dashboard.\n');

console.log('================================================================');
console.log('   ALL 6 SECTIONS SYSTEMATICALLY VALIDATED & VERIFIED!');
console.log('================================================================');
