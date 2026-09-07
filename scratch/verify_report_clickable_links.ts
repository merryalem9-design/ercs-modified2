import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('================================================================');
console.log('   VERIFYING REPORT PAGE CLICKABLE LINKAGE & ACTUALS DETAIL');
console.log('================================================================\n');

// 1. Verify ReportPage.tsx
console.log('>>> Step 1: Checking src/pages/ReportPage.tsx...');
const reportCode = fs.readFileSync(path.resolve('src/pages/ReportPage.tsx'), 'utf-8');

// Check viewActivityDetail helper
assert.ok(reportCode.includes("const viewActivityDetail = (naId: string) => {"), 'ReportPage must define viewActivityDetail helper');
assert.ok(reportCode.includes("sessionStorage.setItem('na_detail_origin', 'report')"), 'ReportPage must record origin as report in sessionStorage');
assert.ok(reportCode.includes("setSelectedNationalActivityId(naId)"), 'ReportPage must set selectedNationalActivityId');
assert.ok(reportCode.includes("setActiveRoute('national-detail')"), 'ReportPage must route to national-detail');

// Check clickable linkages in Table 3
assert.ok(reportCode.includes("onClick={() => viewActivityDetail(na.id)}"), 'ReportPage Table 3 must attach viewActivityDetail to National Activity code/name');
assert.ok(reportCode.includes("ArrowUpRight"), 'ReportPage must render ArrowUpRight icon next to clickable links');
assert.ok(!reportCode.includes("toggleNaExpand"), 'ReportPage should no longer use toggleNaExpand accordion state');
assert.ok(!reportCode.includes("expandedNaIds"), 'ReportPage should no longer use expandedNaIds state');

console.log('✓ ReportPage verified: Clickable linkage cleanly navigates to dedicated detail page without inline accordion.\n');

// 2. Verify NationalActivityDetailPage.tsx
console.log('>>> Step 2: Checking src/pages/NationalActivityDetailPage.tsx...');
const detailCode = fs.readFileSync(path.resolve('src/pages/NationalActivityDetailPage.tsx'), 'utf-8');

assert.ok(detailCode.includes("detailOrigin === 'report'"), 'DetailPage must recognize report origin');
assert.ok(detailCode.includes("'Back to Report'"), 'DetailPage must render Back to Report label');
assert.ok(detailCode.includes("const [quarterId, setQuarterId] = useState<QuarterFilterValue>"), 'DetailPage must maintain quarterId');
assert.ok(detailCode.includes("setQuarterId(filters.quarterId as QuarterFilterValue)"), 'DetailPage must synchronize quarterId with filters.quarterId');
assert.ok(detailCode.includes("hasPeDemographics"), 'DetailPage Linked Plan Entries table must render demographic actuals');
assert.ok(detailCode.includes("peComments"), 'DetailPage Linked Plan Entries table must render coordinator comments');

console.log('✓ NationalActivityDetailPage verified: Back to Report navigation, quarter syncing, and full actuals detail wired.\n');

// 3. Verify NationalActivityDrillDown.tsx
console.log('>>> Step 3: Checking src/components/common/NationalActivityDrillDown.tsx...');
const drillCode = fs.readFileSync(path.resolve('src/components/common/NationalActivityDrillDown.tsx'), 'utf-8');

// Contributing Projects at top, Regions underneath
const projPos = drillCode.indexOf('Contributing Projects');
const regPos = drillCode.indexOf('Contributing Regions');
assert.ok(projPos !== -1 && regPos !== -1 && projPos < regPos, 'Contributing Projects must appear before Contributing Regions');

// Detailed Tabular Breakdown with actuals
assert.ok(drillCode.includes("hasActual ? 'bg-blue-100/50' : 'bg-blue-50/30'"), 'DrillDown must highlight quarters with actuals');
assert.ok(drillCode.includes("qa.expenditure > 0"), 'DrillDown must show quarterly expenditure ETB');
assert.ok(drillCode.includes("qa.actual_female != null"), 'DrillDown must show demographic actuals');
assert.ok(drillCode.includes("qa.comment"), 'DrillDown must show quarterly comments');

console.log('✓ NationalActivityDrillDown verified: Projects top, regions under, and granular actuals in Detailed Tabular Breakdown.\n');

console.log('================================================================');
console.log('   ALL CHECKS PASSED SUCCESSFULLY!');
console.log('================================================================');
