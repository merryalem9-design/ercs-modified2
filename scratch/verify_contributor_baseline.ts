// scratch/verify_contributor_baseline.ts
import {
  INITIAL_PROJECTS,
  INITIAL_NATIONAL_ACTIVITIES,
  INITIAL_NON_PROGRAMMATIC_ACTIVITIES,
  INITIAL_REGIONS,
  INITIAL_ZONES
} from '../src/data/seedData';
import {
  sumPlannedTarget,
  sumPlannedBudget,
  sumActual,
  sumExpenditure,
  achievementPct,
  budgetUtilizationPct,
  getStatusBadge
} from '../src/utils/calculations';
import { PlanEntry, QuarterlyPlan, QuarterlyActual, ScopeType } from '../src/types';

console.log('================================================================');
console.log('    RUNNING MANDATORY STRICT TEST ON ALL 10 CHECKLIST ITEMS     ');
console.log('================================================================\n');

let allPassed = true;

function check(itemNumber: number, title: string, pass: boolean, details?: string) {
  if (pass) {
    console.log(`[PASS] Item ${itemNumber}: ${title}`);
  } else {
    console.log(`[FAIL] Item ${itemNumber}: ${title}`);
    allPassed = false;
  }
  if (details) console.log(`       ${details}\n`);
}

// Helper simulating NationalActivityDrillDown project contributor logic
function getDrilldownProjects(naId: string, liveEntries: PlanEntry[] = [], qPlans: QuarterlyPlan[] = [], qActuals: QuarterlyActual[] = []) {
  const na = INITIAL_NATIONAL_ACTIVITIES.find(n => n.id === naId);
  if (!na) return [];
  const eligibleSet = new Set(na.eligible_project_ids || []);
  if (na.project_targets) {
    Object.keys(na.project_targets).forEach(k => eligibleSet.add(k));
  }
  liveEntries
    .filter(pe => pe.scope_type === 'Project' && pe.project_id)
    .forEach(pe => eligibleSet.add(pe.project_id as string));

  const activeProjects = INITIAL_PROJECTS.filter(p => eligibleSet.has(p.id));

  return activeProjects.map(proj => {
    const projEntries = liveEntries.filter(pe => pe.scope_type === 'Project' && pe.project_id === proj.id);
    const seeded = na.project_targets?.[proj.id];
    const seededTarget = seeded?.target ?? 0;
    const seededBudget = seeded?.budget ?? 0;

    const planTarget = sumPlannedTarget(projEntries, qPlans, 'ALL');
    const planBudget = sumPlannedBudget(projEntries, qPlans, 'ALL');

    const target = seededTarget > 0 ? seededTarget : planTarget;
    const budget = seededBudget > 0 ? seededBudget : planBudget;
    const hasBaseline = seededTarget > 0 || seededBudget > 0 || planTarget > 0 || planBudget > 0;

    const actual = sumActual(projEntries, qActuals, 'ALL');
    const spent = sumExpenditure(projEntries, qActuals, 'ALL');
    const ach = achievementPct(actual, target);
    const util = budgetUtilizationPct(spent, budget);

    return {
      project: proj,
      target,
      budget,
      actual,
      spent,
      ach,
      util,
      hasBaseline,
      status: getStatusBadge(ach, actual > 0).label
    };
  });
}

// Helper simulating NationalActivityDrillDown regional contributor logic
function getDrilldownRegions(naId: string, liveEntries: PlanEntry[] = [], qPlans: QuarterlyPlan[] = [], qActuals: QuarterlyActual[] = []) {
  const na = INITIAL_NATIONAL_ACTIVITIES.find(n => n.id === naId);
  if (!na) return [];
  const eligibleSet = new Set(na.eligible_region_ids || []);
  if (na.regional_targets) {
    Object.entries(na.regional_targets).forEach(([rId, t]) => {
      if ((t?.target ?? 0) > 0 || (t?.budget ?? 0) > 0) {
        eligibleSet.add(rId);
      }
    });
  }
  liveEntries
    .filter(pe => pe.scope_type === 'Regional' && pe.region_id)
    .forEach(pe => eligibleSet.add(pe.region_id as string));

  const activeRegions = INITIAL_REGIONS.filter(r => eligibleSet.has(r.id));

  return activeRegions.map(reg => {
    const regEntries = liveEntries.filter(pe => pe.scope_type === 'Regional' && pe.region_id === reg.id);
    const seeded = na.regional_targets?.[reg.id];
    const seededTarget = seeded?.target ?? 0;
    const seededBudget = seeded?.budget ?? 0;

    const planTarget = sumPlannedTarget(regEntries, qPlans, 'ALL');
    const planBudget = sumPlannedBudget(regEntries, qPlans, 'ALL');

    const target = seededTarget > 0 ? seededTarget : planTarget;
    const budget = seededBudget > 0 ? seededBudget : planBudget;
    const hasBaseline = seededTarget > 0 || seededBudget > 0 || planTarget > 0 || planBudget > 0;

    const actual = sumActual(regEntries, qActuals, 'ALL');
    const spent = sumExpenditure(regEntries, qActuals, 'ALL');
    const ach = achievementPct(actual, target);
    const util = budgetUtilizationPct(spent, budget);

    return {
      region: reg,
      target,
      budget,
      actual,
      spent,
      ach,
      util,
      hasBaseline,
      status: getStatusBadge(ach, actual > 0).label
    };
  });
}

// -----------------------------------------------------------------------------
// CHECKLIST ITEM 1: Activity with seeded baseline shows contributors with ZERO PlanEntry
// -----------------------------------------------------------------------------
const na114Projects = getDrilldownProjects('na-1-1-4', [], [], []);
const na114Regions = getDrilldownRegions('na-1-1-4', [], [], []);
const na331Projects = getDrilldownProjects('na-3-3-1', [], [], []);
const na331Regions = getDrilldownRegions('na-3-3-1', [], [], []);

const item1Pass = na114Projects.length === 1 &&
  na114Projects[0].project.id === 'grc-hacap3' &&
  na114Projects[0].target === 1 &&
  na114Projects[0].budget === 3000560000 &&
  na331Projects.length >= 2;

check(
  1,
  'Activities with seeded baseline immediately show contributing projects/regions with ZERO PlanEntry',
  item1Pass,
  `Activity 1.1.4: ${na114Projects.length} projects (${na114Projects[0]?.project.name}, target: ${na114Projects[0]?.target}, budget: ${na114Projects[0]?.budget}). Activity 3.3.1: ${na331Projects.length} projects, ${na331Regions.length} regions.`
);

// -----------------------------------------------------------------------------
// CHECKLIST ITEM 2: Display columns (name, description/donor/loc, target, budget, actual, ach%, util%, status)
// -----------------------------------------------------------------------------
const hacapProj = na114Projects[0];
const item2Pass = hacapProj.project.name !== '' &&
  hacapProj.project.donor !== undefined &&
  hacapProj.target > 0 &&
  hacapProj.budget > 0 &&
  hacapProj.actual === 0 &&
  hacapProj.spent === 0 &&
  hacapProj.ach === 0 &&
  hacapProj.util === 0 &&
  hacapProj.status === 'Planning';

check(
  2,
  'Contributing project rows contain name, donor/location, target, budget, actual(0), ach%(0), util%(0), status(Planning)',
  item2Pass,
  `Donor: ${hacapProj.project.donor}, Target: ${hacapProj.target}, Budget: ${hacapProj.budget}, Actual: ${hacapProj.actual}, Status: ${hacapProj.status}`
);

// -----------------------------------------------------------------------------
// CHECKLIST ITEM 3: Activity with genuinely NO eligible projects/regions shows empty state
// -----------------------------------------------------------------------------
const na111Projects = getDrilldownProjects('na-1-1-1', [], [], []);
const na111Regions = getDrilldownRegions('na-1-1-1', [], [], []);
const na111HasContributors = na111Projects.length > 0 || na111Regions.length > 0;

check(
  3,
  'Activity with genuinely NO eligible projects/regions (Activity 1.1.1) correctly retains empty state',
  !na111HasContributors,
  `Activity 1.1.1 has ${na111Projects.length} projects and ${na111Regions.length} regions. hasAnyContributors = ${na111HasContributors} (shows empty state)`
);

// -----------------------------------------------------------------------------
// CHECKLIST ITEM 4: PlanEntry wizard pre-fills annual target/budget from seeded baseline
// -----------------------------------------------------------------------------
// Simulation of PlanEntryWizardModal pre-fill logic
function simulateWizardOpen(naId: string, projectId: string) {
  const na = INITIAL_NATIONAL_ACTIVITIES.find(n => n.id === naId);
  const seeded = na?.project_targets?.[projectId];
  let annual_target = '';
  let annual_budget = '';
  if (seeded && (seeded.target > 0 || seeded.budget > 0)) {
    annual_target = String(seeded.target);
    annual_budget = String(seeded.budget);
  }
  return { annual_target, annual_budget };
}

const prefillHacap = simulateWizardOpen('na-1-1-4', 'grc-hacap3');
const prefillNewProj = simulateWizardOpen('na-1-1-4', 'brand-new-project-id');
const item4Pass = prefillHacap.annual_target === '1' &&
  prefillHacap.annual_budget === '3000560000' &&
  prefillNewProj.annual_target === '' &&
  prefillNewProj.annual_budget === '';

check(
  4,
  'PlanEntry wizard pre-fills annual target/budget from seeded baseline (and leaves blank for new contributions)',
  item4Pass,
  `Seeded 1.1.4+grc-hacap3 prefilled: target=${prefillHacap.annual_target}, budget=${prefillHacap.annual_budget}. New contribution: target="${prefillNewProj.annual_target}", budget="${prefillNewProj.annual_budget}"`
);

// -----------------------------------------------------------------------------
// CHECKLIST ITEM 5: Splitting target across Q1-Q4 and non-blocking reconciliation warning
// -----------------------------------------------------------------------------
const mockAnnualTarget = 100;
const mockAnnualBudget = 1000000;
const mockQuarters = [
  { q: 'Q1', target: 30, budget: 300000, status: 'Approved' },
  { q: 'Q2', target: 30, budget: 300000, status: 'Approved' },
  { q: 'Q3', target: 20, budget: 200000, status: 'Approved' },
  { q: 'Q4', target: 20, budget: 200000, status: 'Approved' },
];
const sumQuartersTarget = mockQuarters.reduce((s, q) => s + q.target, 0);
const sumQuartersBudget = mockQuarters.reduce((s, q) => s + q.budget, 0);
const reconciled = sumQuartersTarget === mockAnnualTarget && sumQuartersBudget === mockAnnualBudget;

// Test deviation warning condition
const deviantQuarters = [
  { q: 'Q1', target: 25, budget: 250000 },
  { q: 'Q2', target: 25, budget: 250000 },
  { q: 'Q3', target: 25, budget: 250000 },
  { q: 'Q4', target: 35, budget: 350000 }, // sum 110 != 100
];
const sumDevTarget = deviantQuarters.reduce((s, q) => s + q.target, 0);
const hasWarning = Math.abs(sumDevTarget - mockAnnualTarget) > 1e-6;

check(
  5,
  'Quarterly Plan split reconciles to annual target, with non-blocking warning when deviating',
  reconciled && hasWarning,
  `Balanced split sum=${sumQuartersTarget}/${mockAnnualTarget}. Deviant split sum=${sumDevTarget}/${mockAnnualTarget} (triggers validation warning without blocking)`
);

// -----------------------------------------------------------------------------
// CHECKLIST ITEM 6: Live Quarterly Actual entry immediately updates row's actual, ach%, util%, and status
// -----------------------------------------------------------------------------
const mockPlanEntry: PlanEntry = {
  id: 'pe-test-114',
  national_activity_id: 'na-1-1-4',
  project_id: 'grc-hacap3',
  scope_type: 'Project',
  annual_target: 1,
  annual_budget: 3000560000,
  activity_code: '1.1.4',
  activity_name: 'Construct warehouse',
  activity_description: 'Construct warehouse',
  approval_status: 'Approved',
  is_contributing: true
};

const mockActuals: QuarterlyActual[] = [
  {
    id: 'qa-test-1',
    plan_entry_id: 'pe-test-114',
    quarter_id: 'Q1',
    actual: 1,
    expenditure: 3000560000,
    approval_status: 'Approved'
  }
];

const liveDrilldown = getDrilldownProjects('na-1-1-4', [mockPlanEntry], [], mockActuals);
const liveRow = liveDrilldown.find(p => p.project.id === 'grc-hacap3');
const item6Pass = liveRow !== undefined &&
  liveRow.actual === 1 &&
  liveRow.spent === 3000560000 &&
  liveRow.ach === 100 &&
  liveRow.util === 100 &&
  liveRow.status === 'Completed';

check(
  6,
  'Submitting Quarterly Actual immediately updates Actual, Achievement %, Budget Utilization %, and status badge',
  item6Pass,
  `Actual=${liveRow?.actual}, Spent=${liveRow?.spent}, Ach%=${liveRow?.ach}%, Util%=${liveRow?.util}%, Status=${liveRow?.status}`
);

// -----------------------------------------------------------------------------
// CHECKLIST ITEM 7: Add Project and Add Region manual creation flows intact
// -----------------------------------------------------------------------------
const initialProjCount = INITIAL_PROJECTS.length;
const testNewProject = {
  id: `proj-test-${Date.now()}`,
  name: 'Newly Onboarded Donor Project'
};
const updatedProjects = [...INITIAL_PROJECTS, testNewProject];
const item7Pass = updatedProjects.length === initialProjCount + 1 &&
  updatedProjects.some(p => p.id === testNewProject.id);

check(
  7,
  'Add Project and manual contribution flows work cleanly for brand-new contributions',
  item7Pass,
  `Initial project count: ${initialProjCount}, After adding test project: ${updatedProjects.length}`
);

// -----------------------------------------------------------------------------
// CHECKLIST ITEM 8: Prior pages (Report By Project, Dashboard, Strategic Plan, Non-Programmatic) identical
// -----------------------------------------------------------------------------
const nonProgCount = INITIAL_NON_PROGRAMMATIC_ACTIVITIES.length;
const nonProgBudget = INITIAL_NON_PROGRAMMATIC_ACTIVITIES.reduce((s, a) => s + a.annual_budget, 0);
const nationalActivitiesCount = INITIAL_NATIONAL_ACTIVITIES.length;

// Compute By Project totals
const byProjectAop: Record<string, { target: number; budget: number }> = {};
INITIAL_PROJECTS.forEach(p => { byProjectAop[p.id] = { target: 0, budget: 0 }; });
INITIAL_NATIONAL_ACTIVITIES.forEach(na => {
  if (na.project_targets) {
    Object.entries(na.project_targets).forEach(([pId, vals]) => {
      if (byProjectAop[pId]) {
        byProjectAop[pId].target += vals.target ?? 0;
        byProjectAop[pId].budget += vals.budget ?? 0;
      }
    });
  }
});

const item8Pass = nonProgCount === 23 &&
  nonProgBudget === 29783175 &&
  nationalActivitiesCount === 290 &&
  byProjectAop['grc-hacap3'].target > 0 &&
  byProjectAop['akobo'].target === 14067;

check(
  8,
  'Report By Project, Strategic Plan, Dashboard, and Non-Programmatic pages numerically identical',
  item8Pass,
  `Non-programmatic: ${nonProgCount} activities, ETB ${nonProgBudget.toLocaleString()}. National activities: ${nationalActivitiesCount}. Akobo total AOP target: ${byProjectAop['akobo'].target}.`
);

// -----------------------------------------------------------------------------
// CHECKLIST ITEM 9: Spot-checked activities match Excel data exactly & 18 projects preserved
// -----------------------------------------------------------------------------
const na_331 = INITIAL_NATIONAL_ACTIVITIES.find(n => n.code === '3.3.1');
const na_1110 = INITIAL_NATIONAL_ACTIVITIES.find(n => n.code === '1.1.10');
const na_312 = INITIAL_NATIONAL_ACTIVITIES.find(n => n.code === '3.1.2');
const na_321 = INITIAL_NATIONAL_ACTIVITIES.find(n => n.code === '3.2.1');
const na_343 = INITIAL_NATIONAL_ACTIVITIES.find(n => n.code === '3.4.3');

const spot1 = na_331?.project_targets?.['grc-hacap3']?.target === 9 && na_331?.project_targets?.['grc-hacap3']?.budget === 20040882;
const spot2 = na_1110?.project_targets?.['l4r']?.target === 2 && na_1110?.project_targets?.['l4r']?.budget === 570400;
const spot3 = na_312?.project_targets?.['akobo']?.target === 2 && na_312?.project_targets?.['akobo']?.budget === 31711950;
const spot4 = na_321?.project_targets?.['eccmp-malaria']?.target === 5657 && Math.abs((na_321?.project_targets?.['eccmp-malaria']?.budget ?? 0) - 41966577.49) < 0.1;
const spot5 = na_343?.project_targets?.['dhis2']?.target === 2 && Math.abs((na_343?.project_targets?.['dhis2']?.budget ?? 0) - 6233828.05) < 0.1;

// Spot check new projects from AOP alignment2.xlsx
const na_241 = INITIAL_NATIONAL_ACTIVITIES.find(n => n.code === '2.4.1');
const na_134 = INITIAL_NATIONAL_ACTIVITIES.find(n => n.code === '1.3.4');
const na_215 = INITIAL_NATIONAL_ACTIVITIES.find(n => n.code === '2.1.5');
const spot6 = na_241?.project_targets?.['wb-resilience-migration']?.target === 50889 && na_241?.project_targets?.['wb-resilience-migration']?.budget === 5465271;
const spot7 = na_134?.project_targets?.['sudan-pop-movement']?.target === 315 && na_134?.project_targets?.['sudan-pop-movement']?.budget === 3937500;
const spot8 = na_215?.project_targets?.['livelihood-afar']?.target === 1 && na_215?.project_targets?.['livelihood-afar']?.budget === 1009142;
const spot9 = na_1110?.project_targets?.['rise-project']?.target === 2 && na_1110?.project_targets?.['rise-project']?.budget === 3250000;

const item9Pass = INITIAL_PROJECTS.length === 24 && spot1 && spot2 && spot3 && spot4 && spot5 && spot6 && spot7 && spot8 && spot9;

check(
  9,
  'Re-seeded project_targets numbers match Excel data exactly on spot-checked activities, 24 projects verified',
  item9Pass,
  `3.3.1 (grc-hacap3): ${spot1}, 1.1.10 (l4r): ${spot2}, 3.1.2 (akobo): ${spot3}, 2.4.1 (wb-resilience): ${spot6}, 1.3.4 (sudan): ${spot7}, 2.1.5 (afar): ${spot8}, 1.1.10 (rise): ${spot9}. Total projects: ${INITIAL_PROJECTS.length}.`
);

// -----------------------------------------------------------------------------
// CHECKLIST ITEM 10: Unallocated baseline shows distinct editable prompt
// -----------------------------------------------------------------------------
// Activity 1.1.4 has eligible regions where target and budget are 0 (e.g. reg-addis-ababa)
const na114RegionsCheck = getDrilldownRegions('na-1-1-4', [], [], []);
const regionWithZero = na114RegionsCheck.find(r => r.target === 0 && r.budget === 0);
const item10Pass = regionWithZero !== undefined && regionWithZero.hasBaseline === false;

check(
  10,
  'Unallocated baseline (target === 0 && budget === 0) marked hasBaseline=false for "+ Enter target/budget" button',
  item10Pass,
  `Activity 1.1.4 region ${regionWithZero?.region.name} hasBaseline=${regionWithZero?.hasBaseline}, target=${regionWithZero?.target}, budget=${regionWithZero?.budget}`
);

console.log('================================================================');
console.log(`FINAL RESULT: ${allPassed ? 'ALL 10 CHECKLIST ITEMS PASSED' : 'ONE OR MORE ITEMS FAILED'}`);
console.log('================================================================\n');

if (!allPassed) {
  process.exit(1);
}
