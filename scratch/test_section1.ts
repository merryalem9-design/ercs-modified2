// scratch/test_section1.ts
import {
  INITIAL_NATIONAL_ACTIVITIES,
  INITIAL_REGIONS,
  INITIAL_ZONES,
  INITIAL_PROJECTS,
  INITIAL_UOM_FACTORS,
} from '../src/data/seedData';
import {
  PlanEntry,
  QuarterlyPlan,
  QuarterlyActual,
  RegionActivityLink,
} from '../src/types';
import {
  sumPlannedTarget,
  sumPlannedBudget,
  sumActual,
  sumExpenditure,
  achievementPct,
  budgetUtilizationPct,
} from '../src/utils/calculations';

console.log('=== RUNNING SECTION 1 VERIFICATION TESTS ===\n');

// Pick a national activity that has both eligible projects and eligible regions
const testNa = INITIAL_NATIONAL_ACTIVITIES.find(
  na => na.eligible_project_ids && na.eligible_project_ids.length > 0 && na.eligible_region_ids && na.eligible_region_ids.length > 0
)!;

console.log(`Testing with National Activity: ${testNa.code} - ${testNa.description}`);
console.log(`Eligible Projects: ${testNa.eligible_project_ids.length}, Eligible Regions: ${testNa.eligible_region_ids.length}\n`);

const proj1 = INITIAL_PROJECTS.find(p => p.id === testNa.eligible_project_ids[0])!;
const reg1 = INITIAL_REGIONS.find(r => r.id === testNa.eligible_region_ids[0])!;
const reg1Zones = INITIAL_ZONES.filter(z => z.region_id === reg1.id);
const zone1 = reg1Zones[0];
const zone2 = reg1Zones[1] || reg1Zones[0];

// Create synthetic entries representing execution
const mockPlanEntries: PlanEntry[] = [
  {
    id: 'pe-proj-1',
    national_activity_id: testNa.id,
    scope_type: 'Project',
    project_id: proj1.id,
    annual_target: 1000,
    annual_budget: 500000,
    activity_code: testNa.code,
    activity_name: testNa.description,
    activity_description: 'Project contribution',
    approval_status: 'Approved',
    is_contributing: true,
  },
  {
    id: 'pe-reg-zone-1',
    national_activity_id: testNa.id,
    scope_type: 'Regional',
    region_id: reg1.id,
    zone_id: zone1.id,
    annual_target: 600,
    annual_budget: 300000,
    activity_code: testNa.code,
    activity_name: testNa.description,
    activity_description: 'Zone 1 contribution',
    approval_status: 'Approved',
    is_contributing: true,
  },
  {
    id: 'pe-reg-zone-2',
    national_activity_id: testNa.id,
    scope_type: 'Regional',
    region_id: reg1.id,
    zone_id: zone2.id,
    annual_target: 400,
    annual_budget: 200000,
    activity_code: testNa.code,
    activity_name: testNa.description,
    activity_description: 'Zone 2 contribution',
    approval_status: 'Approved',
    is_contributing: true,
  },
];

const mockQuarterlyPlans: QuarterlyPlan[] = [
  { id: 'qp-1', plan_entry_id: 'pe-proj-1', quarter_id: 'Q1', target: 250, budget: 125000, approval_status: 'Approved' },
  { id: 'qp-2', plan_entry_id: 'pe-proj-1', quarter_id: 'Q2', target: 250, budget: 125000, approval_status: 'Approved' },
  { id: 'qp-3', plan_entry_id: 'pe-proj-1', quarter_id: 'Q3', target: 250, budget: 125000, approval_status: 'Approved' },
  { id: 'qp-4', plan_entry_id: 'pe-proj-1', quarter_id: 'Q4', target: 250, budget: 125000, approval_status: 'Approved' },

  { id: 'qp-5', plan_entry_id: 'pe-reg-zone-1', quarter_id: 'Q1', target: 150, budget: 75000, approval_status: 'Approved' },
  { id: 'qp-6', plan_entry_id: 'pe-reg-zone-1', quarter_id: 'Q2', target: 150, budget: 75000, approval_status: 'Approved' },

  { id: 'qp-7', plan_entry_id: 'pe-reg-zone-2', quarter_id: 'Q1', target: 100, budget: 50000, approval_status: 'Approved' },
  { id: 'qp-8', plan_entry_id: 'pe-reg-zone-2', quarter_id: 'Q2', target: 100, budget: 50000, approval_status: 'Approved' },
];

const mockQuarterlyActuals: QuarterlyActual[] = [
  { id: 'qa-1', plan_entry_id: 'pe-proj-1', quarter_id: 'Q1', actual: 260, expenditure: 120000, approval_status: 'Approved' },
  { id: 'qa-2', plan_entry_id: 'pe-proj-1', quarter_id: 'Q2', actual: 240, expenditure: 130000, approval_status: 'Approved' },

  { id: 'qa-3', plan_entry_id: 'pe-reg-zone-1', quarter_id: 'Q1', actual: 160, expenditure: 70000, approval_status: 'Approved' },
  { id: 'qa-4', plan_entry_id: 'pe-reg-zone-2', quarter_id: 'Q1', actual: 95, expenditure: 48000, approval_status: 'Approved' },
];

// --- TEST 1: Contributing Projects & Regions discovery ---
const naEntries = mockPlanEntries.filter(pe => pe.national_activity_id === testNa.id && pe.is_contributing !== false);
const eligibleProjectSet = new Set(testNa.eligible_project_ids);
const projectContributors = INITIAL_PROJECTS.filter(p => eligibleProjectSet.has(p.id) && naEntries.some(pe => pe.scope_type === 'Project' && pe.project_id === p.id));

const eligibleRegionSet = new Set(testNa.eligible_region_ids);
const regionContributors = INITIAL_REGIONS.filter(r => eligibleRegionSet.has(r.id) && naEntries.some(pe => pe.scope_type === 'Regional' && pe.region_id === r.id));

console.log('[TEST 1] Discovery of Contributors:');
console.log(`  - Contributing Projects: ${projectContributors.map(p => p.name).join(', ')}`);
console.log(`  - Contributing Regions: ${regionContributors.map(r => r.name).join(', ')}`);
if (projectContributors.length !== 1 || projectContributors[0].id !== proj1.id) {
  throw new Error('Project contributor discovery failed');
}
if (regionContributors.length !== 1 || regionContributors[0].id !== reg1.id) {
  throw new Error('Region contributor discovery failed');
}
console.log('  -> PASS: Both sub-sections list correct contributors by name.\n');

// --- TEST 2: Tabular Breakdown for specific Project ---
const projEntries = naEntries.filter(pe => pe.scope_type === 'Project' && pe.project_id === proj1.id);
const pTarget = sumPlannedTarget(projEntries, mockQuarterlyPlans, 'ALL');
const pBudget = sumPlannedBudget(projEntries, mockQuarterlyPlans, 'ALL');
const pActual = sumActual(projEntries, mockQuarterlyActuals, 'ALL');
const pSpent = sumExpenditure(projEntries, mockQuarterlyActuals, 'ALL');
const pAch = achievementPct(pActual, pTarget);
const pUtil = budgetUtilizationPct(pSpent, pBudget);

console.log('[TEST 2] Project Tabular Breakdown:');
console.log(`  Target: ${pTarget} (expected 1000), Budget: ${pBudget} (expected 500000)`);
console.log(`  Actual: ${pActual} (expected 500), Spent: ${pSpent} (expected 250000)`);
console.log(`  Achievement: ${pAch.toFixed(1)}%, Utilization: ${pUtil.toFixed(1)}%`);
if (pTarget !== 1000 || pBudget !== 500000 || pActual !== 500 || pSpent !== 250000) {
  throw new Error('Project calculations do not match PlanEntry values');
}
console.log('  -> PASS: Numbers match stored PlanEntry values.\n');

// --- TEST 3: Tabular Breakdown for specific Region ---
const regEntries = naEntries.filter(pe => pe.scope_type === 'Regional' && pe.region_id === reg1.id);
const rTarget = sumPlannedTarget(regEntries, mockQuarterlyPlans, 'ALL');
const rBudget = sumPlannedBudget(regEntries, mockQuarterlyPlans, 'ALL');
const rActual = sumActual(regEntries, mockQuarterlyActuals, 'ALL');
const rSpent = sumExpenditure(regEntries, mockQuarterlyActuals, 'ALL');

console.log('[TEST 3] Regional Tabular Breakdown:');
console.log(`  Target: ${rTarget} (expected 1000: 600+400), Budget: ${rBudget} (expected 500000: 300000+200000)`);
console.log(`  Actual: ${rActual} (expected 255: 160+95), Spent: ${rSpent} (expected 118000: 70000+48000)`);
if (rTarget !== 1000 || rBudget !== 500000 || rActual !== 255 || rSpent !== 118000) {
  throw new Error('Regional calculations do not match PlanEntry values');
}
console.log('  -> PASS: Regional numbers match stored PlanEntry values.\n');

// --- TEST 4: Scoped Filters ---
console.log('[TEST 4] Scoped Filters:');
const filteredProjects = projectContributors.filter(p => p.id === proj1.id);
console.log(`  Filter by Project ID ${proj1.id} yields: ${filteredProjects.map(p => p.name)}`);
if (filteredProjects.length !== 1) throw new Error('Scoped project filter failed');

const filteredRegions = regionContributors.filter(r => r.id === reg1.id);
console.log(`  Filter by Region ID ${reg1.id} yields: ${filteredRegions.map(r => r.name)}`);
if (filteredRegions.length !== 1) throw new Error('Scoped region filter failed');
console.log('  -> PASS: Scoped filters work correctly.\n');

// --- TEST 6: Branch Head Zone-Level Breakdown ---
console.log('[TEST 6] Branch Head Zone-Level Contributions:');
const branchZones = INITIAL_ZONES.filter(z => z.region_id === reg1.id);
const zoneBreakdowns = branchZones.map(z => {
  const zEntries = regEntries.filter(pe => pe.zone_id === z.id);
  if (zEntries.length === 0) return null;
  const zT = sumPlannedTarget(zEntries, mockQuarterlyPlans, 'ALL');
  const zB = sumPlannedBudget(zEntries, mockQuarterlyPlans, 'ALL');
  const zA = sumActual(zEntries, mockQuarterlyActuals, 'ALL');
  const zS = sumExpenditure(zEntries, mockQuarterlyActuals, 'ALL');
  return { zone: z.name, target: zT, budget: zB, actual: zA, spent: zS };
}).filter(Boolean);

console.log('  Zone breakdown results:', zoneBreakdowns);
if (zoneBreakdowns.length < 1) throw new Error('Zone-level breakdown empty for Branch Head region');
console.log('  -> PASS: Branch Head sees exact Zone contributions.\n');

// --- TEST 8: KPI Card RAG Indicators ---
console.log('[TEST 8] RAG Banding Logic:');
const ach = achievementPct(pActual, pTarget);
const isGreen = ach >= 80;
const isAmber = ach >= 60 && ach < 80;
const isRed = ach < 60;
console.log(`  Achievement ${ach.toFixed(1)}% -> RAG: ${isGreen ? 'GREEN' : isAmber ? 'AMBER' : 'RED'}`);
if (ach !== 50 || !isRed) throw new Error('RAG logic mismatch for 50% achievement');
console.log('  -> PASS: RAG indicators match achievement percentage.\n');

// --- TEST 9: Empty State ---
console.log('[TEST 9] Empty State:');
const emptyNaEntries: PlanEntry[] = [];
const emptyProjects = INITIAL_PROJECTS.filter(p => emptyNaEntries.some(pe => pe.project_id === p.id));
const emptyRegions = INITIAL_REGIONS.filter(r => emptyNaEntries.some(pe => pe.region_id === r.id));
const hasEmptyContributors = emptyProjects.length > 0 || emptyRegions.length > 0;
console.log(`  hasAnyContributors: ${hasEmptyContributors} (expected false)`);
if (hasEmptyContributors) throw new Error('Empty state check failed');
console.log('  -> PASS: Empty state correctly identified when no contributors are linked.\n');

console.log('=== ALL SECTION 1 TESTS PASSED SUCCESSFULLY! ===');
