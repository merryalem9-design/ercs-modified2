// src/pages/StrategicPlanPage.tsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { FilterBar } from '../components/common/FilterBar';
import {
  sumPlannedTarget, sumPlannedBudget, sumActual, sumExpenditure, achievementPct, budgetUtilizationPct,
} from '../utils/calculations';
import { PlanEntry } from '../types';
import { ArrowUpRight, Compass, Layers } from 'lucide-react';

interface StratRow {
  key: string;
  code: string;
  name: string;
  extra: number; // # objectives (priority row) or 0 (objective row)
  naCount: number;
  target: number;
  actual: number;
  achievement: number;
  budget: number;
  spent: number;
  utilization: number;
  uoms: string[];
}

const uomsFor = (es: PlanEntry[], nationalActivities: { id: string; uom: string }[]) =>
  Array.from(new Set(
    es
      .map(e => nationalActivities.find(na => na.id === e.national_activity_id)?.uom)
      .filter((u): u is string => !!u)
  ));

export const StrategicPlanPage: React.FC = () => {
  const {
    strategicPriorities, strategicObjectives, nationalActivities,
    quarterlyPlans, quarterlyActuals, filters, setFilters, setActiveRoute,
    getFilteredPlanEntries,
  } = useApp();

  const entries = getFilteredPlanEntries();
  const q = filters.quarterId;

  const priorityRows: StratRow[] = strategicPriorities.map(sp => {
    const naInPriority = nationalActivities.filter(na => na.strategic_priority_id === sp.id);
    const es = entries.filter(pe => {
      const na = nationalActivities.find(n => n.id === pe.national_activity_id);
      return na?.strategic_priority_id === sp.id;
    });
    const target = sumPlannedTarget(es, quarterlyPlans, q);
    const actual = sumActual(es, quarterlyActuals, q);
    const budget = sumPlannedBudget(es, quarterlyPlans, q);
    const spent = sumExpenditure(es, quarterlyActuals, q);
    return {
      key: sp.id,
      code: sp.code,
      name: sp.name,
      extra: strategicObjectives.filter(so => so.strategic_priority_id === sp.id).length,
      naCount: naInPriority.length,
      target, actual,
      achievement: achievementPct(actual, target),
      budget, spent,
      utilization: budgetUtilizationPct(spent, budget),
      uoms: uomsFor(es, nationalActivities),
    };
  });

  const objectivesInScope = filters.strategicPriorityId !== 'ALL'
    ? strategicObjectives.filter(so => so.strategic_priority_id === filters.strategicPriorityId)
    : strategicObjectives;

  const objectiveRows: StratRow[] = objectivesInScope.map(so => {
    const naInObjective = nationalActivities.filter(na => na.strategic_objective_id === so.id);
    const es = entries.filter(pe => {
      const na = nationalActivities.find(n => n.id === pe.national_activity_id);
      return na?.strategic_objective_id === so.id;
    });
    const target = sumPlannedTarget(es, quarterlyPlans, q);
    const actual = sumActual(es, quarterlyActuals, q);
    const budget = sumPlannedBudget(es, quarterlyPlans, q);
    const spent = sumExpenditure(es, quarterlyActuals, q);
    const parentPriority = strategicPriorities.find(sp => sp.id === so.strategic_priority_id);
    return {
      key: so.id,
      code: `${parentPriority?.code || ''} · ${so.code}`,
      name: so.name,
      extra: 0,
      naCount: naInObjective.length,
      target, actual,
      achievement: achievementPct(actual, target),
      budget, spent,
      utilization: budgetUtilizationPct(spent, budget),
      uoms: uomsFor(es, nationalActivities),
    };
  });

  const viewObjective = (strategicObjectiveId: string, strategicPriorityId: string) => {
    setFilters(prev => ({ ...prev, strategicPriorityId, strategicObjectiveId, nationalActivityId: 'ALL' }));
    setActiveRoute('plan');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <Compass className="w-5 h-5 text-ercs-red" /> Strategic Plan
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Every figure below is aggregated live from the same bottom-up Plan Entries as the rest of the app —
          filtered down to each Strategic Priority / Strategic Objective. Click "View" on an Objective to drill
          straight into its linked National Activities on the Plan page.
        </p>
      </div>

      <FilterBar />

      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-ercs-red" /> Strategic Priorities ({priorityRows.length})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Name</th>
                <th className="p-3 text-right"># Objectives</th>
                <th className="p-3 text-right"># National Activities</th>
                <th className="p-3 text-right">Target</th>
                <th className="p-3 text-right">Actual</th>
                <th className="p-3 text-right">Achievement %</th>
                <th className="p-3 text-right">Budget (ETB)</th>
                <th className="p-3 text-right">Spent (ETB)</th>
                <th className="p-3 text-right">Utilization %</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {priorityRows.map(r => (
                <tr key={r.key} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-ercs-red whitespace-nowrap">{r.code}</td>
                  <td className="p-3 font-bold text-slate-800 min-w-56">
                    <div>{r.name}</div>
                    {r.uoms.length > 1 && (
                      <div className="mt-1 inline-flex items-center gap-1 text-[9px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
                        ⚠ Mixed Units ({r.uoms.join(', ')})
                      </div>
                    )}
                  </td>
                  <td className="p-3 text-right">{r.extra}</td>
                  <td className="p-3 text-right">{r.naCount}</td>
                  <td className="p-3 text-right">{r.target.toLocaleString()}</td>
                  <td className="p-3 text-right font-bold">{r.actual.toLocaleString()}</td>
                  <td className="p-3 text-right font-black">{r.achievement.toFixed(1)}%</td>
                  <td className="p-3 text-right">{r.budget.toLocaleString()}</td>
                  <td className="p-3 text-right">{r.spent.toLocaleString()}</td>
                  <td className="p-3 text-right font-black">{r.utilization.toFixed(1)}%</td>
                </tr>
              ))}
              {priorityRows.length === 0 && (
                <tr><td colSpan={10} className="p-6 text-center text-slate-500">No Strategic Priorities found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-ercs-red" /> Strategic Objectives ({objectiveRows.length})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b">
              <tr>
                <th className="p-3">Code</th>
                <th className="p-3">Name</th>
                <th className="p-3 text-right"># National Activities</th>
                <th className="p-3 text-right">Target</th>
                <th className="p-3 text-right">Actual</th>
                <th className="p-3 text-right">Achievement %</th>
                <th className="p-3 text-right">Budget (ETB)</th>
                <th className="p-3 text-right">Spent (ETB)</th>
                <th className="p-3 text-right">Utilization %</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {objectiveRows.map(r => {
                const so = strategicObjectives.find(o => o.id === r.key)!;
                return (
                  <tr key={r.key} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-ercs-red whitespace-nowrap">{r.code}</td>
                    <td className="p-3 font-bold text-slate-800 min-w-56">
                      <div>{r.name}</div>
                      {r.uoms.length > 1 && (
                        <div className="mt-1 inline-flex items-center gap-1 text-[9px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
                          ⚠ Mixed Units ({r.uoms.join(', ')})
                        </div>
                      )}
                    </td>
                    <td className="p-3 text-right">{r.naCount}</td>
                    <td className="p-3 text-right">{r.target.toLocaleString()}</td>
                    <td className="p-3 text-right font-bold">{r.actual.toLocaleString()}</td>
                    <td className="p-3 text-right font-black">{r.achievement.toFixed(1)}%</td>
                    <td className="p-3 text-right">{r.budget.toLocaleString()}</td>
                    <td className="p-3 text-right">{r.spent.toLocaleString()}</td>
                    <td className="p-3 text-right font-black">{r.utilization.toFixed(1)}%</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => viewObjective(so.id, so.strategic_priority_id)}
                        className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-bold flex items-center gap-1 mx-auto"
                      >
                        View <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
              {objectiveRows.length === 0 && (
                <tr><td colSpan={10} className="p-6 text-center text-slate-500">No Strategic Objectives found for this filter.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};