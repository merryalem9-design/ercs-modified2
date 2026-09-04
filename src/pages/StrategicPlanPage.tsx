// src/pages/StrategicPlanPage.tsx
import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FilterBar } from '../components/common/FilterBar';
import { ChevronDown, ChevronRight, Compass, Maximize2, Minimize2 } from 'lucide-react';
import { NationalActivity, StrategicObjective } from '../types';

export const StrategicPlanPage: React.FC = () => {
  const {
    strategicPriorities,
    strategicObjectives,
    nationalActivities,
    regions,
    planEntries,
    filters,
  } = useApp();

  // Collapsed / expanded state for objectives (collapsed by default)
  const [expandedObjectiveIds, setExpandedObjectiveIds] = useState<Set<string>>(new Set());

  const toggleObjective = (id: string) => {
    setExpandedObjectiveIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    setExpandedObjectiveIds(new Set(strategicObjectives.map(so => so.id)));
  };

  const collapseAll = () => {
    setExpandedObjectiveIds(new Set());
  };

  // Filtered National Activities based on filters
  const filteredActivities = useMemo(() => {
    return nationalActivities.filter(na => {
      // Strategic Priority
      if (filters.strategicPriorityId !== 'ALL' && na.strategic_priority_id !== filters.strategicPriorityId) {
        return false;
      }
      // Strategic Objective
      if (filters.strategicObjectiveId !== 'ALL' && na.strategic_objective_id !== filters.strategicObjectiveId) {
        return false;
      }
      // National Activity
      if (filters.nationalActivityId !== 'ALL' && na.id !== filters.nationalActivityId) {
        return false;
      }
      // Year filter
      if (filters.year && filters.year !== 'ALL' && na.year && String(na.year) !== String(filters.year)) {
        return false;
      }
      // Department filter
      if (filters.department && filters.department !== 'ALL' && na.department !== filters.department) {
        return false;
      }
      // Responsibility filter
      if (filters.responsibility && filters.responsibility !== 'ALL') {
        const respUpper = (na.responsibility || '').toUpperCase();
        if (filters.responsibility === 'HQ') {
          if (!respUpper.includes('HQ') && respUpper !== 'BOTH') return false;
        } else if (filters.responsibility === 'Region') {
          if (!respUpper.includes('RB') && !respUpper.includes('BRANCH') && respUpper !== 'BOTH') return false;
        } else if (filters.responsibility === 'Project') {
          // Check if any project is eligible or linked
          if (na.eligible_project_ids.length === 0) return false;
        }
      }
      return true;
    });
  }, [nationalActivities, filters]);

  // Group filtered activities by objective
  const activeObjectiveIds = useMemo(() => {
    return new Set(filteredActivities.map(na => na.strategic_objective_id));
  }, [filteredActivities]);

  const visibleObjectives = useMemo(() => {
    return strategicObjectives.filter(so => {
      if (filters.strategicPriorityId !== 'ALL' && so.strategic_priority_id !== filters.strategicPriorityId) {
        return false;
      }
      if (filters.strategicObjectiveId !== 'ALL' && so.id !== filters.strategicObjectiveId) {
        return false;
      }
      return activeObjectiveIds.has(so.id);
    });
  }, [strategicObjectives, filters, activeObjectiveIds]);

  // Compute activity target & budget values from user-entered Plan Entries
  const computeActivityTotals = (naId: string) => {
    const entriesForNa = planEntries.filter(pe => pe.national_activity_id === naId);

    // Total ERCS
    const ercsTarget = entriesForNa.reduce((s, pe) => s + (pe.annual_target || 0), 0);
    const ercsBudget = entriesForNa.reduce((s, pe) => s + (pe.annual_budget || 0), 0);

    // HQ (Project scoped or HQ executed)
    const hqEntries = entriesForNa.filter(pe => pe.scope_type === 'Project');
    const hqTarget = hqEntries.reduce((s, pe) => s + (pe.annual_target || 0), 0);
    const hqBudget = hqEntries.reduce((s, pe) => s + (pe.annual_budget || 0), 0);

    // Summary RB (Regional)
    const rbEntries = entriesForNa.filter(pe => pe.scope_type === 'Regional');
    const rbTarget = rbEntries.reduce((s, pe) => s + (pe.annual_target || 0), 0);
    const rbBudget = rbEntries.reduce((s, pe) => s + (pe.annual_budget || 0), 0);

    // Per-region calculations
    const perRegion = regions.map(reg => {
      const regEntries = rbEntries.filter(pe => pe.region_id === reg.id);
      return {
        regionId: reg.id,
        target: regEntries.reduce((s, pe) => s + (pe.annual_target || 0), 0),
        budget: regEntries.reduce((s, pe) => s + (pe.annual_budget || 0), 0),
      };
    });

    return {
      ercsTarget,
      ercsBudget,
      hqTarget,
      hqBudget,
      rbTarget,
      rbBudget,
      perRegion,
    };
  };

  // Compute objective totals
  const computeObjectiveTotals = (soId: string) => {
    const naUnderSo = filteredActivities.filter(na => na.strategic_objective_id === soId);
    let ercsTarget = 0,
      ercsBudget = 0,
      hqTarget = 0,
      hqBudget = 0,
      rbTarget = 0,
      rbBudget = 0;
    const regionTotals: Record<string, { target: number; budget: number }> = {};
    regions.forEach(r => {
      regionTotals[r.id] = { target: 0, budget: 0 };
    });

    naUnderSo.forEach(na => {
      const totals = computeActivityTotals(na.id);
      ercsTarget += totals.ercsTarget;
      ercsBudget += totals.ercsBudget;
      hqTarget += totals.hqTarget;
      hqBudget += totals.hqBudget;
      rbTarget += totals.rbTarget;
      rbBudget += totals.rbBudget;
      totals.perRegion.forEach(pr => {
        if (regionTotals[pr.regionId]) {
          regionTotals[pr.regionId].target += pr.target;
          regionTotals[pr.regionId].budget += pr.budget;
        }
      });
    });

    return { ercsTarget, ercsBudget, hqTarget, hqBudget, rbTarget, rbBudget, regionTotals };
  };

  const formatNum = (val: number) => {
    if (val === 0) return '—';
    return val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <Compass className="w-5 h-5 text-ercs-red" /> Strategic Plan
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Authoritative Comprehensive Implementation Program Framework from ERCS 2019 AOP.
            Click any Strategic Objective row to expand and view child activities and regional allocations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" /> Expand All
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
          >
            <Minimize2 className="w-3.5 h-3.5" /> Collapse All
          </button>
        </div>
      </div>

      {/* FilterBar configured for Strategic Plan: Year filter active, Quarter filter removed */}
      <FilterBar
        hideQuarterFilter={true}
        showYearFilter={true}
        showResponsibilityFilter={true}
        showDepartmentFilter={true}
      />

      {/* Excel Table Layout */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto max-h-[750px] relative">
          <table className="w-full text-left text-xs border-collapse">
            {/* Header Row 1 */}
            <thead className="bg-slate-800 text-white sticky top-0 z-20 text-[11px] font-bold tracking-wider">
              <tr>
                <th className="p-3 border-r border-slate-700 min-w-[140px] sticky left-0 bg-slate-800 z-30" rowSpan={2}>
                  Strategies Code
                </th>
                <th className="p-3 border-r border-slate-700 min-w-[320px] sticky left-[140px] bg-slate-800 z-30" rowSpan={2}>
                  Intervention Logic
                </th>
                <th className="p-3 border-r border-slate-700 min-w-[130px]" rowSpan={2}>
                  Unit measurment
                </th>
                <th className="p-3 border-r border-slate-700 min-w-[110px]" rowSpan={2}>
                  Responsibility
                </th>
                <th className="p-3 border-r border-slate-700 min-w-[110px]" rowSpan={2}>
                  Departments
                </th>
                <th className="p-2 border-r border-slate-700 text-center bg-slate-900" colSpan={2}>
                  ERCS Total
                </th>
                <th className="p-2 border-r border-slate-700 text-center bg-slate-900" colSpan={2}>
                  HQ
                </th>
                <th className="p-2 border-r border-slate-700 text-center bg-slate-900" colSpan={2}>
                  Summary RB
                </th>
                {regions.map(r => (
                  <th key={r.id} className="p-2 border-r border-slate-700 text-center min-w-[180px] bg-slate-900/90" colSpan={2}>
                    {r.name}
                  </th>
                ))}
              </tr>
              <tr className="bg-slate-900/80 text-[10px] text-slate-300">
                {/* ERCS Subheaders */}
                <th className="p-2 border-r border-slate-700 text-right min-w-[85px]">Target</th>
                <th className="p-2 border-r border-slate-700 text-right min-w-[100px]">Budget</th>
                {/* HQ Subheaders */}
                <th className="p-2 border-r border-slate-700 text-right min-w-[85px]">Target</th>
                <th className="p-2 border-r border-slate-700 text-right min-w-[100px]">Budget</th>
                {/* Summary RB Subheaders */}
                <th className="p-2 border-r border-slate-700 text-right min-w-[85px]">Target</th>
                <th className="p-2 border-r border-slate-700 text-right min-w-[100px]">Budget</th>
                {/* Regions Subheaders */}
                {regions.map(r => (
                  <React.Fragment key={`sub-${r.id}`}>
                    <th className="p-2 border-r border-slate-700 text-right min-w-[85px]">Target</th>
                    <th className="p-2 border-r border-slate-700 text-right min-w-[95px]">Budget</th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-slate-700">
              {visibleObjectives.length === 0 ? (
                <tr>
                  <td colSpan={11 + regions.length * 2} className="p-12 text-center text-slate-400">
                    No strategic objectives or activities match the selected filters.
                  </td>
                </tr>
              ) : (
                visibleObjectives.map(so => {
                  const isExpanded = expandedObjectiveIds.has(so.id);
                  const childActivities = filteredActivities.filter(na => na.strategic_objective_id === so.id);
                  const soTotals = computeObjectiveTotals(so.id);
                  const parentSp = strategicPriorities.find(sp => sp.id === so.strategic_priority_id);

                  return (
                    <React.Fragment key={so.id}>
                      {/* Strategic Objective Row (Click to toggle) */}
                      <tr
                        onClick={() => toggleObjective(so.id)}
                        className={`font-bold text-xs cursor-pointer transition-colors ${
                          isExpanded
                            ? 'bg-amber-50/80 hover:bg-amber-100/70 border-y-2 border-amber-300'
                            : 'bg-slate-100 hover:bg-slate-200/80 border-b border-slate-300'
                        }`}
                      >
                        <td className="p-3 sticky left-0 bg-inherit z-10 border-r border-slate-300">
                          <div className="flex items-center gap-1.5 text-slate-900 font-extrabold">
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4 text-ercs-red shrink-0" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                            )}
                            <span>Objective {so.code}</span>
                          </div>
                        </td>
                        <td className="p-3 sticky left-[140px] bg-inherit z-10 border-r border-slate-300">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-900">{so.name}</span>
                            <span className="text-[10px] font-normal px-2 py-0.5 bg-white border border-slate-300 rounded text-slate-600 shrink-0">
                              {childActivities.length} activities
                            </span>
                          </div>
                        </td>
                        <td className="p-3 border-r border-slate-300 text-slate-400">—</td>
                        <td className="p-3 border-r border-slate-300 text-slate-400">—</td>
                        <td className="p-3 border-r border-slate-300 text-slate-500 font-semibold">
                          {parentSp ? parentSp.code : '—'}
                        </td>
                        {/* ERCS Total */}
                        <td className="p-2.5 text-right border-r border-slate-300 font-mono text-slate-900">
                          {formatNum(soTotals.ercsTarget)}
                        </td>
                        <td className="p-2.5 text-right border-r border-slate-300 font-mono text-slate-900 font-bold">
                          {formatNum(soTotals.ercsBudget)}
                        </td>
                        {/* HQ */}
                        <td className="p-2.5 text-right border-r border-slate-300 font-mono text-slate-700">
                          {formatNum(soTotals.hqTarget)}
                        </td>
                        <td className="p-2.5 text-right border-r border-slate-300 font-mono text-slate-700">
                          {formatNum(soTotals.hqBudget)}
                        </td>
                        {/* Summary RB */}
                        <td className="p-2.5 text-right border-r border-slate-300 font-mono text-slate-700">
                          {formatNum(soTotals.rbTarget)}
                        </td>
                        <td className="p-2.5 text-right border-r border-slate-300 font-mono text-slate-700">
                          {formatNum(soTotals.rbBudget)}
                        </td>
                        {/* Per-Region columns */}
                        {regions.map(r => {
                          const rTotals = soTotals.regionTotals[r.id] || { target: 0, budget: 0 };
                          return (
                            <React.Fragment key={`so-reg-${r.id}`}>
                              <td className="p-2.5 text-right border-r border-slate-200 font-mono text-slate-600">
                                {formatNum(rTotals.target)}
                              </td>
                              <td className="p-2.5 text-right border-r border-slate-200 font-mono text-slate-600">
                                {formatNum(rTotals.budget)}
                              </td>
                            </React.Fragment>
                          );
                        })}
                      </tr>

                      {/* Child Activities (Rendered when expanded) */}
                      {isExpanded &&
                        childActivities.map((na: NationalActivity, idx: number) => {
                          const actTotals = computeActivityTotals(na.id);
                          return (
                            <tr
                              key={na.id}
                              className={`text-xs hover:bg-sky-50/50 transition-colors ${
                                idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                              }`}
                            >
                              <td className="p-2.5 pl-6 sticky left-0 bg-inherit z-10 border-r border-slate-200 font-mono font-bold text-slate-700">
                                Activity {na.code}
                              </td>
                              <td className="p-2.5 sticky left-[140px] bg-inherit z-10 border-r border-slate-200 text-slate-800">
                                {na.description}
                              </td>
                              <td className="p-2.5 border-r border-slate-200 text-slate-600 font-medium">
                                {na.uom || '—'}
                              </td>
                              <td className="p-2.5 border-r border-slate-200 font-semibold text-slate-700">
                                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[11px]">
                                  {na.responsibility || 'Both'}
                                </span>
                              </td>
                              <td className="p-2.5 border-r border-slate-200 text-slate-600 font-medium">
                                {na.department || '—'}
                              </td>
                              {/* ERCS Total */}
                              <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-800 font-semibold">
                                {formatNum(actTotals.ercsTarget)}
                              </td>
                              <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-900 font-bold">
                                {formatNum(actTotals.ercsBudget)}
                              </td>
                              {/* HQ */}
                              <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-600">
                                {formatNum(actTotals.hqTarget)}
                              </td>
                              <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-600">
                                {formatNum(actTotals.hqBudget)}
                              </td>
                              {/* Summary RB */}
                              <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-600">
                                {formatNum(actTotals.rbTarget)}
                              </td>
                              <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-600">
                                {formatNum(actTotals.rbBudget)}
                              </td>
                              {/* Per-Region */}
                              {regions.map(r => {
                                const regData = actTotals.perRegion.find(pr => pr.regionId === r.id);
                                return (
                                  <React.Fragment key={`act-${na.id}-${r.id}`}>
                                    <td className="p-2 text-right border-r border-slate-100 font-mono text-slate-600">
                                      {formatNum(regData?.target || 0)}
                                    </td>
                                    <td className="p-2 text-right border-r border-slate-100 font-mono text-slate-600">
                                      {formatNum(regData?.budget || 0)}
                                    </td>
                                  </React.Fragment>
                                );
                              })}
                            </tr>
                          );
                        })}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};