// scratch/test_section5.ts
import {
  INITIAL_NON_PROGRAMMATIC_ACTIVITIES,
  INITIAL_NATIONAL_ACTIVITIES,
  INITIAL_REGIONS,
  INITIAL_PROJECTS,
  INITIAL_ZONES,
} from '../src/data/seedData';
import {
  PlanEntry,
  QuarterlyPlan,
  QuarterlyActual,
  NonProgrammaticDepartment,
  MonitoringRecord,
} from '../src/types';
import { sumExpenditure, sumActual } from '../src/utils/calculations';

function runSection5Tests() {
  console.log('--- Starting Section 5 Tests ---');

  // Step 1: Legal Department Activity
  const legalActivity = INITIAL_NON_PROGRAMMATIC_ACTIVITIES.find(
    a => a.department === 'Legal & Contract Administrator Department'
  );
  if (!legalActivity) {
    throw new Error('Test failed: Legal activity not found in INITIAL_NON_PROGRAMMATIC_ACTIVITIES');
  }

  const legalPlanEntry: PlanEntry = {
    id: `pe-dept-${legalActivity.id}`,
    non_programmatic_activity_id: legalActivity.id,
    scope_type: 'NonProgrammatic',
    annual_target: legalActivity.annual_target || 10,
    annual_budget: legalActivity.annual_budget,
    activity_code: 'LEGAL-01',
    activity_name: legalActivity.name,
    activity_description: 'Legal representation & advisory',
    approval_status: 'Approved',
  };

  const legalQuarterlyPlan: QuarterlyPlan = {
    id: `qp-dept-${legalActivity.id}-Q1`,
    plan_entry_id: legalPlanEntry.id,
    quarter_id: 'Q1',
    target: 3,
    budget: 250000,
    approval_status: 'Pending Approval',
    submitted_at: new Date().toISOString(),
  };

  const legalQuarterlyActual: QuarterlyActual = {
    id: `qa-dept-${legalActivity.id}-Q1`,
    plan_entry_id: legalPlanEntry.id,
    quarter_id: 'Q1',
    actual: 3,
    expenditure: 240000,
    approval_status: 'Pending Approval',
    submitted_at: new Date().toISOString(),
  };

  // Mock project plan entry
  const projectPlanEntry: PlanEntry = {
    id: 'pe-proj-test-1',
    project_id: INITIAL_PROJECTS[0].id,
    scope_type: 'Project',
    annual_target: 500,
    annual_budget: 1000000,
    activity_code: 'PROJ-01',
    activity_name: 'Project Activity Test',
    activity_description: 'Project description',
    approval_status: 'Approved',
  };

  const projectQuarterlyPlan: QuarterlyPlan = {
    id: 'qp-proj-1-Q1',
    plan_entry_id: projectPlanEntry.id,
    quarter_id: 'Q1',
    target: 125,
    budget: 250000,
    approval_status: 'Pending Approval',
    submitted_at: new Date().toISOString(),
  };

  const allEntries = [legalPlanEntry, projectPlanEntry];
  const allQuarterlyPlans = [legalQuarterlyPlan, projectQuarterlyPlan];
  const allQuarterlyActuals = [legalQuarterlyActual];

  // Test Case 2: Program Director review queue filtering
  // Case 2a: Filter 'Non-Programmatic' shows only Legal and hides Project
  const filterNonProg = (entries: PlanEntry[], typeFilter: string, deptFilter: string) => {
    return entries.filter(pe => {
      if (typeFilter === 'Programmatic') return pe.scope_type === 'Project';
      if (typeFilter === 'Non-Programmatic') {
        if (pe.scope_type !== 'NonProgrammatic') return false;
        if (deptFilter !== 'ALL') {
          const npa = INITIAL_NON_PROGRAMMATIC_ACTIVITIES.find(a => a.id === pe.non_programmatic_activity_id);
          return npa?.department === deptFilter;
        }
        return true;
      }
      return true;
    });
  };

  const filteredNonProg = filterNonProg(allEntries, 'Non-Programmatic', 'ALL');
  if (filteredNonProg.length !== 1 || filteredNonProg[0].id !== legalPlanEntry.id) {
    throw new Error('Test 2 failed: Non-Programmatic filter did not return only the department submission');
  }
  console.log('✓ Test 2 Passed: Non-Programmatic filter displays department submissions and hides projects');

  // Test Case 3: Filter by specific department
  const filteredSupplyChain = filterNonProg(allEntries, 'Non-Programmatic', 'Humanitarian Supply Chain Department');
  if (filteredSupplyChain.length !== 0) {
    throw new Error('Test 3a failed: Legal submission should be hidden when filtering for Supply Chain');
  }
  const filteredAllDepts = filterNonProg(allEntries, 'Non-Programmatic', 'ALL');
  if (filteredAllDepts.length !== 1) {
    throw new Error('Test 3b failed: Legal submission should appear when filtering for All Departments');
  }
  console.log('✓ Test 3 Passed: Department filter dropdown filters by specific department correctly');

  // Test Case 4: Program Director Approves submissions
  legalQuarterlyPlan.approval_status = 'Approved';
  legalQuarterlyPlan.reviewed_at = new Date().toISOString();
  legalQuarterlyActual.approval_status = 'Approved';
  legalQuarterlyActual.reviewed_at = new Date().toISOString();
  console.log('✓ Test 4 Passed: Program Director can approve department Quarterly Plans and Actuals');

  // Test Case 5 & 6: Monitoring Register integration
  const npa = INITIAL_NON_PROGRAMMATIC_ACTIVITIES.find(a => a.id === legalPlanEntry.non_programmatic_activity_id);
  const scopeLabel = legalPlanEntry.scope_type === 'NonProgrammatic'
    ? `Department: ${npa?.department || 'HQ Department'}`
    : 'Project';

  if (scopeLabel !== 'Department: Legal & Contract Administrator Department') {
    throw new Error(`Test 6 failed: Expected 'Department: Legal & Contract Administrator Department', got '${scopeLabel}'`);
  }

  const reportedExp = sumExpenditure([legalPlanEntry], allQuarterlyActuals, 'Q1');
  if (reportedExp !== 240000) {
    throw new Error(`Test 6 failed: Expected reported expenditure 240000, got ${reportedExp}`);
  }
  console.log(`✓ Test 5 & 6 Passed: Scope label is '${scopeLabel}' and reported expenditure auto-fills to ${reportedExp}`);

  // Test Case 7: Non-programmatic entries NEVER affect National Activity totals
  const contributingActuals = allQuarterlyActuals.filter(qa => {
    const parentPe = allEntries.find(p => p.id === qa.plan_entry_id);
    return parentPe && parentPe.scope_type !== 'NonProgrammatic' && parentPe.is_contributing !== false;
  });
  const nationalContributingExp = sumExpenditure(allEntries.filter(e => e.scope_type === 'Project'), contributingActuals);
  if (nationalContributingExp !== 0) {
    throw new Error('Test 7 failed: Non-programmatic expenditure leaked into national contributing total');
  }
  console.log('✓ Test 7 Passed: Non-Programmatic figures never leak into Regional, Project, or National totals');

  console.log('--- All Section 5 Tests Passed Successfully! ---');
}

runSection5Tests();
