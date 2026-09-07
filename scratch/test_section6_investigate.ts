import { INITIAL_STRATEGIC_OBJECTIVES, INITIAL_NATIONAL_ACTIVITIES, INITIAL_PLAN_ENTRIES, INITIAL_QUARTERLY_ACTUALS } from '../src/data/seedData';
import { sumActual } from '../src/utils/calculations';

console.log('SP4 Objectives:');
const sp4Objs = INITIAL_STRATEGIC_OBJECTIVES.filter(so => so.strategic_priority_id === 'sp-4');
sp4Objs.forEach(so => {
  const nas = INITIAL_NATIONAL_ACTIVITIES.filter(na => na.strategic_objective_id === so.id);
  console.log(`\nObjective: ${so.id} (${so.code}) - ${so.name}`);
  let totalTarget = 0;
  nas.forEach(na => {
    totalTarget += (na.ercs_target || 0);
    console.log(`  NA: ${na.id} [${na.code}] ${na.name} | target: ${na.ercs_target} | uom: ${na.uom}`);
  });
  const naIds = new Set(nas.map(n => n.id));
  const entries = INITIAL_PLAN_ENTRIES.filter(e => naIds.has(e.national_activity_id));
  const totalActual = sumActual(entries, INITIAL_QUARTERLY_ACTUALS, 'ALL');
  console.log(`  Summary: Target = ${totalTarget}, Actual = ${totalActual}`);
});
