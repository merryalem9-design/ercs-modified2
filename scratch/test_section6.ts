import assert from 'assert';
import {
  INITIAL_STRATEGIC_OBJECTIVES,
  INITIAL_NATIONAL_ACTIVITIES,
  INITIAL_PLAN_ENTRIES,
  INITIAL_QUARTERLY_ACTUALS,
  INITIAL_STATUS_THRESHOLDS,
  INITIAL_REGIONS,
} from '../src/data/seedData';
import { sumActual, achievementPct } from '../src/utils/calculations';
import { get3WayStatus, get3WayBadge, formatCompactNumber } from '../src/components/dashboard/dashboardUtils';
import { PlanEntry, StatusThresholdBand, QuarterlyActual } from '../src/types';

console.log('--- Starting Section 6 Tests: Distinct Volunteers vs Members KPI Cards & RAG Indicators ---');

// 1. Verify SP4 Objectives definition
const sp4Objectives = INITIAL_STRATEGIC_OBJECTIVES.filter(so => so.strategic_priority_id === 'sp-4');
assert.strictEqual(sp4Objectives.length, 3, 'SP4 must have 3 strategic objectives: 4.1, 4.2, 4.3');

const memObj = sp4Objectives.find(so => so.id === 'so-4-1');
assert.ok(memObj, 'Objective so-4-1 must exist');
assert.strictEqual(memObj?.code, '4.1');

const volObj1 = sp4Objectives.find(so => so.id === 'so-4-2');
assert.ok(volObj1, 'Objective so-4-2 must exist');
assert.strictEqual(volObj1?.code, '4.2');

const volObj2 = sp4Objectives.find(so => so.id === 'so-4-3');
assert.ok(volObj2, 'Objective so-4-3 must exist');
assert.strictEqual(volObj2?.code, '4.3');

console.log('✓ Test 1 Passed: SP4 Objectives (4.1 Members, 4.2 Volunteers, 4.3 Youth Volunteers) correctly identified');

// 2. Verify National Activities mapping
const memNas = INITIAL_NATIONAL_ACTIVITIES.filter(na => na.strategic_objective_id === 'so-4-1');
const volNas = INITIAL_NATIONAL_ACTIVITIES.filter(
  na => na.strategic_objective_id === 'so-4-2' || na.strategic_objective_id === 'so-4-3'
);

assert.ok(memNas.length > 0, 'Must have national activities under so-4-1');
assert.ok(volNas.length > 0, 'Must have national activities under so-4-2 and so-4-3');

const memTotalNationalTarget = memNas.reduce((sum, na) => sum + (na.ercs_target || 0), 0);
const volTotalNationalTarget = volNas.reduce((sum, na) => sum + (na.ercs_target || 0), 0);

console.log(`  National Target - Members (4.1): ${memTotalNationalTarget.toLocaleString()}`);
console.log(`  National Target - Volunteers (4.2 + 4.3): ${volTotalNationalTarget.toLocaleString()}`);

assert.strictEqual(memTotalNationalTarget, 24946823, 'Members target should match seed 24,946,823');
assert.strictEqual(volTotalNationalTarget, 170671, 'Volunteers target should match seed 170,671 (167,924 + 2,747)');
assert.notStrictEqual(memTotalNationalTarget, volTotalNationalTarget, 'Members and Volunteers targets must be distinct');

console.log('✓ Test 2 Passed: National targets are distinct and accurately mapped');

// 3. Test Regional Drilldown calculation
const oromia = INITIAL_REGIONS.find(r => r.code === 'OR' || r.name.includes('Oromia'));
assert.ok(oromia, 'Oromia region must exist');

const oromiaMemTarget = memNas.reduce((s, na) => s + (na.regional_targets?.[oromia!.id]?.target || 0), 0);
const oromiaVolTarget = volNas.reduce((s, na) => s + (na.regional_targets?.[oromia!.id]?.target || 0), 0);

console.log(`  Oromia Target - Members: ${oromiaMemTarget.toLocaleString()}, Volunteers: ${oromiaVolTarget.toLocaleString()}`);
assert.ok(oromiaMemTarget > 0, 'Oromia should have members target');
assert.ok(oromiaVolTarget > 0, 'Oromia should have volunteers target');
assert.notStrictEqual(oromiaMemTarget, oromiaVolTarget, 'Regional members and volunteers targets must be distinct');

console.log('✓ Test 3 Passed: Regional (branch) targets compute distinctly for Volunteers and Members');

// 4. Test RAG Indicator derivation from statusThresholds
// Default thresholds:
// >= 80%: on-track (Green)
// 60% - 79.9%: at-risk (Amber)
// < 60%: off-track (Red)
const thresholds: StatusThresholdBand[] = INITIAL_STATUS_THRESHOLDS;

const status0 = get3WayStatus(0, thresholds);
const badge0 = get3WayBadge(status0);
assert.strictEqual(status0, 'off-track');
assert.strictEqual(badge0.label, 'Off Track');
assert.ok(badge0.color.includes('rose'), 'Off Track badge color should be red/rose');

const status65 = get3WayStatus(65, thresholds);
const badge65 = get3WayBadge(status65);
assert.strictEqual(status65, 'at-risk');
assert.strictEqual(badge65.label, 'At Risk');
assert.ok(badge65.color.includes('amber'), 'At Risk badge color should be amber');

const status90 = get3WayStatus(90, thresholds);
const badge90 = get3WayBadge(status90);
assert.strictEqual(status90, 'on-track');
assert.strictEqual(badge90.label, 'On Track');
assert.ok(badge90.color.includes('emerald'), 'On Track badge color should be emerald/green');

console.log('✓ Test 4 Passed: RAG status and badges correctly derived from statusThresholds');

// 5. Test Dynamic threshold adjustment
const customThresholds: StatusThresholdBand[] = [
  { id: 'st-exceeding', label: 'Exceeding', lower_bound: 95, color: '#047857' },
  { id: 'st-on-track', label: 'On Track', lower_bound: 90, color: '#059669' },
  { id: 'st-needs-improvement', label: 'Needs improvement', lower_bound: 75, color: '#D97706' },
  { id: 'st-off-track', label: 'Off track', lower_bound: 0, color: '#DC2626' },
];

// At 80%, under default thresholds it's 'on-track', but under custom (needs 90%) it becomes 'at-risk'!
assert.strictEqual(get3WayStatus(80, thresholds), 'on-track');
assert.strictEqual(get3WayStatus(80, customThresholds), 'at-risk');

// At 70%, under default it's 'at-risk', but under custom (needs 75%) it becomes 'off-track'!
assert.strictEqual(get3WayStatus(70, thresholds), 'at-risk');
assert.strictEqual(get3WayStatus(70, customThresholds), 'off-track');

console.log('✓ Test 5 Passed: Threshold changes dynamically update RAG status for Volunteers and Members');

// 6. Test Actual Entry Integration and Separate Achievement
// Create mock plan entries for Volunteers and Members with actuals
const mockEntries: PlanEntry[] = [
  {
    id: 'mock-vol-1',
    user_id: 'test-user',
    national_activity_id: volNas[0].id,
    scope_type: 'National',
    annual_target: 1000,
    annual_budget: 100000,
    quarters: {
      Q1: { target: 250, ercs_budget: 25000, pns_budget: 0 },
      Q2: { target: 250, ercs_budget: 25000, pns_budget: 0 },
      Q3: { target: 250, ercs_budget: 25000, pns_budget: 0 },
      Q4: { target: 250, ercs_budget: 25000, pns_budget: 0 },
    },
    created_at: '2026-01-01',
    updated_at: '2026-01-01',
  },
  {
    id: 'mock-mem-1',
    user_id: 'test-user',
    national_activity_id: memNas[0].id,
    scope_type: 'National',
    annual_target: 5000,
    annual_budget: 500000,
    quarters: {
      Q1: { target: 1250, ercs_budget: 125000, pns_budget: 0 },
      Q2: { target: 1250, ercs_budget: 125000, pns_budget: 0 },
      Q3: { target: 1250, ercs_budget: 125000, pns_budget: 0 },
      Q4: { target: 1250, ercs_budget: 125000, pns_budget: 0 },
    },
    created_at: '2026-01-01',
    updated_at: '2026-01-01',
  },
];

const mockActuals: QuarterlyActual[] = [
  {
    id: 'act-1',
    plan_entry_id: 'mock-vol-1',
    quarter_id: 'Q1',
    actual: 230,
    expenditure: 24000,
    challenges: '',
    remedies: '',
    created_at: '2026-04-01',
    updated_at: '2026-04-01',
  },
  {
    id: 'act-2',
    plan_entry_id: 'mock-mem-1',
    quarter_id: 'Q1',
    actual: 800,
    expenditure: 80000,
    challenges: '',
    remedies: '',
    created_at: '2026-04-01',
    updated_at: '2026-04-01',
  },
];

const volQ1Act = sumActual([mockEntries[0]], mockActuals, 'Q1');
const volQ1Tgt = 250;
const volQ1Ach = achievementPct(volQ1Act, volQ1Tgt);
const volQ1Status = get3WayStatus(volQ1Ach, thresholds);
const volQ1Badge = get3WayBadge(volQ1Status);

const memQ1Act = sumActual([mockEntries[1]], mockActuals, 'Q1');
const memQ1Tgt = 1250;
const memQ1Ach = achievementPct(memQ1Act, memQ1Tgt);
const memQ1Status = get3WayStatus(memQ1Ach, thresholds);
const memQ1Badge = get3WayBadge(memQ1Status);

assert.strictEqual(volQ1Act, 230);
assert.strictEqual(volQ1Ach, 92);
assert.strictEqual(volQ1Status, 'on-track');
assert.strictEqual(volQ1Badge.label, 'On Track');

assert.strictEqual(memQ1Act, 800);
assert.strictEqual(memQ1Ach, 64);
assert.strictEqual(memQ1Status, 'at-risk');
assert.strictEqual(memQ1Badge.label, 'At Risk');

console.log(`  Volunteers Q1: Act=${volQ1Act}, Ach=${volQ1Ach}%, Status=${volQ1Status}`);
console.log(`  Members Q1: Act=${memQ1Act}, Ach=${memQ1Ach}%, Status=${memQ1Status}`);

console.log('✓ Test 6 Passed: Actuals and achievement percentages calculated separately with distinct RAG statuses');

// 7. Verify number formatting
assert.strictEqual(formatCompactNumber(170671), '170.7k');
assert.strictEqual(formatCompactNumber(24946823), '24.9M');
console.log('✓ Test 7 Passed: formatCompactNumber accurately formats large Volunteer and Member counts');

console.log('\n--- All Section 6 Tests Passed Successfully! ---');
