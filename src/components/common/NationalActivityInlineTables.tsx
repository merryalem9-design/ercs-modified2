// src/components/common/NationalActivityInlineTables.tsx
import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from './StatusBadge';
import {
  sumPlannedTarget,
  sumPlannedBudget,
  sumActual,
  sumExpenditure,
  achievementPct,
} from '../../utils/calculations';
import { QuarterFilterValue, QuarterId, PlanEntry } from '../../types';
import { MapPin, FolderGit2 } from 'lucide-react';
import { PlanEntryWizardModal, type PeWizardFormState } from '../plan/PlanEntryWizardModal';

const ALL_QUARTERS: QuarterId[] = ['Q1', 'Q2', 'Q3', 'Q4'];

export interface NationalActivityInlineTablesProps {
  nationalActivityId: string;
  quarterId?: QuarterFilterValue;
  mode: 'report' | 'plan';
  isBranchHead?: boolean;
  assignedRegionId?: string;
  scopeFilter?: 'Regional' | 'Project';
  assignedProjectId?: string;
}

export const NationalActivityInlineTables: React.FC<NationalActivityInlineTablesProps> = ({
  nationalActivityId,
  quarterId: propQuarterId,
  mode,
  isBranchHead: propIsBranchHead,
  assignedRegionId: propAssignedRegionId,
  scopeFilter: propScopeFilter,
  assignedProjectId: propAssignedProjectId,
}) => {
  const {
    nationalActivities,
    projects,
    regions,
    zones,
    planEntries,
    quarterlyPlans,
    quarterlyActuals,
    regionActivityLinks,
    filters,
    currentRole,
  } = useApp();

  const q = propQuarterId || filters.quarterId || 'ALL';
  const na = nationalActivities.find(n => n.id === nationalActivityId);

  // Helper to sum quarterly target/budget across entries for a given quarter
  const getQuarterPlan = (entries: PlanEntry[], qId: QuarterId) => ({
    target: entries.reduce((s, e) => s + (quarterlyPlans.find(qp => qp.plan_entry_id === e.id && qp.quarter_id === qId)?.target ?? 0), 0),
    budget: entries.reduce((s, e) => s + (quarterlyPlans.find(qp => qp.plan_entry_id === e.id && qp.quarter_id === qId)?.budget ?? 0), 0),
  });

  // Modal wizard state for "+ Enter target/budget" prompt if needed
  const [modalWizard, setModalWizard] = useState<null | { initial: PeWizardFormState; startStep: 1 | 2 }>(null);

  // In-scope plan entries for this national activity
  const naEntries = useMemo(() => {
    return planEntries.filter(pe => pe.national_activity_id === nationalActivityId && pe.is_contributing !== false);
  }, [planEntries, nationalActivityId]);

  // Contributing Projects: linked via eligible_project_ids OR project_targets OR existing PlanEntries
  const contributingProjects = useMemo(() => {
    if (!na) return [];
    const eligibleSet = new Set(na.eligible_project_ids || []);
    if (na.project_targets) {
      Object.keys(na.project_targets).forEach(k => eligibleSet.add(k));
    }
    naEntries
      .filter(pe => pe.scope_type === 'Project' && pe.project_id)
      .forEach(pe => eligibleSet.add(pe.project_id as string));

    const activeProjects = projects.filter(p => eligibleSet.has(p.id));

    return activeProjects.map(proj => {
      const projEntries = naEntries.filter(pe => pe.scope_type === 'Project' && pe.project_id === proj.id);

      const seeded = na.project_targets?.[proj.id];
      const seededTarget = seeded?.target ?? 0;
      const seededBudget = seeded?.budget ?? 0;

      const planTarget = sumPlannedTarget(projEntries, quarterlyPlans, q);
      const planBudget = sumPlannedBudget(projEntries, quarterlyPlans, q);

      // Annual or quarter target/budget from baseline or plan
      const target = q === 'ALL'
        ? (seededTarget > 0 ? seededTarget : planTarget)
        : (planTarget > 0 ? planTarget : seededTarget);

      const budget = q === 'ALL'
        ? (seededBudget > 0 ? seededBudget : planBudget)
        : (planBudget > 0 ? planBudget : seededBudget);

      const hasBaseline = seededTarget > 0 || seededBudget > 0 || planTarget > 0 || planBudget > 0;

      const actual = sumActual(projEntries, quarterlyActuals, q);
      const spent = sumExpenditure(projEntries, quarterlyActuals, q);
      const ach = achievementPct(actual, target);

      return {
        project: proj,
        entries: projEntries,
        target,
        budget,
        actual,
        spent,
        ach,
        hasBaseline,
      };
    });
  }, [na, naEntries, projects, quarterlyPlans, quarterlyActuals, q]);

  // Contributing Regions: linked via eligible_region_ids OR regional_targets OR RegionActivityLinks OR PlanEntries
  const contributingRegions = useMemo(() => {
    if (!na) return [];
    const eligibleSet = new Set(na.eligible_region_ids || []);
    if (na.regional_targets) {
      Object.entries(na.regional_targets).forEach(([rId, t]) => {
        if ((t?.target ?? 0) > 0 || (t?.budget ?? 0) > 0) {
          eligibleSet.add(rId);
        }
      });
    }
    naEntries
      .filter(pe => pe.scope_type === 'Regional' && pe.region_id)
      .forEach(pe => eligibleSet.add(pe.region_id as string));
    regionActivityLinks
      .filter(l => l.national_activity_id === na.id)
      .forEach(l => eligibleSet.add(l.region_id));

    const activeRegions = regions.filter(r => eligibleSet.has(r.id));

    return activeRegions.map(reg => {
      const regEntries = naEntries.filter(pe => pe.scope_type === 'Regional' && pe.region_id === reg.id);

      const seeded = na.regional_targets?.[reg.id];
      const seededTarget = seeded?.target ?? 0;
      const seededBudget = seeded?.budget ?? 0;

      const planTarget = sumPlannedTarget(regEntries, quarterlyPlans, q);
      const planBudget = sumPlannedBudget(regEntries, quarterlyPlans, q);

      const target = q === 'ALL'
        ? (seededTarget > 0 ? seededTarget : planTarget)
        : (planTarget > 0 ? planTarget : seededTarget);

      const budget = q === 'ALL'
        ? (seededBudget > 0 ? seededBudget : planBudget)
        : (planBudget > 0 ? planBudget : seededBudget);

      const hasBaseline = seededTarget > 0 || seededBudget > 0 || planTarget > 0 || planBudget > 0;

      const actual = sumActual(regEntries, quarterlyActuals, q);
      const spent = sumExpenditure(regEntries, quarterlyActuals, q);
      const ach = achievementPct(actual, target);

      // Zone-level breakdown for this region
      const regionZones = zones.filter(z => z.region_id === reg.id);
      const contributingZones = regionZones
        .map(z => {
          const zEntries = regEntries.filter(pe => pe.zone_id === z.id);
          const zTarget = sumPlannedTarget(zEntries, quarterlyPlans, q);
          const zBudget = sumPlannedBudget(zEntries, quarterlyPlans, q);
          const zActual = sumActual(zEntries, quarterlyActuals, q);
          const zSpent = sumExpenditure(zEntries, quarterlyActuals, q);
          const zAch = achievementPct(zActual, zTarget);
          return {
            zone: z,
            entries: zEntries,
            target: zTarget,
            budget: zBudget,
            actual: zActual,
            spent: zSpent,
            ach: zAch,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item.entries.length > 0);

      return {
        region: reg,
        entries: regEntries,
        target,
        budget,
        actual,
        spent,
        ach,
        hasBaseline,
        zones: contributingZones,
      };
    });
  }, [na, naEntries, regionActivityLinks, regions, zones, quarterlyPlans, quarterlyActuals, q]);

  // Total Activity Target & Budget across all contributors (denominator for percentages)
  const totalActivityTarget = useMemo(() => {
    const regSum = contributingRegions.reduce((sum, r) => sum + (r.target || 0), 0);
    const projSum = contributingProjects.reduce((sum, p) => sum + (p.target || 0), 0);
    return regSum + projSum;
  }, [contributingRegions, contributingProjects]);

  const totalActivityBudget = useMemo(() => {
    const regSum = contributingRegions.reduce((sum, r) => sum + (r.budget || 0), 0);
    const projSum = contributingProjects.reduce((sum, p) => sum + (p.budget || 0), 0);
    return regSum + projSum;
  }, [contributingRegions, contributingProjects]);

  const isRegionalRole = Boolean(
    propIsBranchHead ||
    currentRole.startsWith('Branch Head — ') ||
    currentRole.endsWith(' coordinators')
  );
  const isProjectRole = currentRole.startsWith('Project Coordinator');
  const effectiveScopeFilter = propScopeFilter || (isRegionalRole ? 'Regional' : isProjectRole ? 'Project' : undefined);

  const effectiveRegionId = propAssignedRegionId || (
    currentRole.startsWith('Branch Head — ')
      ? regions.find(r => `Branch Head — ${r.name}` === currentRole)?.id
      : currentRole.endsWith(' coordinators')
        ? zones.find(z => `${z.name} coordinators` === currentRole)?.region_id
        : undefined
  );

  const effectiveProjectId = propAssignedProjectId || (
    currentRole.startsWith('Project Coordinator — ') && currentRole !== 'Project Coordinator — HQ'
      ? projects.find(p => `Project Coordinator — ${p.name}` === currentRole)?.id
      : undefined
  );

  const displayedRegions = useMemo(() => {
    if (effectiveScopeFilter === 'Project') return [];
    if (effectiveRegionId) {
      return contributingRegions.filter(r => r.region.id === effectiveRegionId);
    }
    return contributingRegions;
  }, [contributingRegions, effectiveScopeFilter, effectiveRegionId]);

  const displayedProjects = useMemo(() => {
    if (effectiveScopeFilter === 'Regional') return [];
    if (effectiveProjectId) {
      return contributingProjects.filter(p => p.project.id === effectiveProjectId);
    }
    return contributingProjects;
  }, [contributingProjects, effectiveScopeFilter, effectiveProjectId]);

  // Aggregate Regional Performance
  const regionalTotalTarget = displayedRegions.reduce((s, r) => s + r.target, 0);
  const regionalTotalBudget = displayedRegions.reduce((s, r) => s + r.budget, 0);
  const regionalTotalActual = displayedRegions.reduce((s, r) => s + r.actual, 0);
  const regionalTotalSpent = displayedRegions.reduce((s, r) => s + r.spent, 0);
  const regionalAch = achievementPct(regionalTotalActual, regionalTotalTarget);
  const regionalTargetPct = totalActivityTarget > 0 ? (regionalTotalTarget / totalActivityTarget) * 100 : 0;
  const regionalBudgetPct = totalActivityBudget > 0 ? (regionalTotalBudget / totalActivityBudget) * 100 : 0;
  const regionalAchievedPct = totalActivityTarget > 0 ? (regionalTotalActual / totalActivityTarget) * 100 : 0;

  // Aggregate Project Performance
  const projectTotalTarget = displayedProjects.reduce((s, p) => s + p.target, 0);
  const projectTotalBudget = displayedProjects.reduce((s, p) => s + p.budget, 0);
  const projectTotalActual = displayedProjects.reduce((s, p) => s + p.actual, 0);
  const projectTotalSpent = displayedProjects.reduce((s, p) => s + p.spent, 0);
  const projectAch = achievementPct(projectTotalActual, projectTotalTarget);
  const projectTargetPct = totalActivityTarget > 0 ? (projectTotalTarget / totalActivityTarget) * 100 : 0;
  const projectBudgetPct = totalActivityBudget > 0 ? (projectTotalBudget / totalActivityBudget) * 100 : 0;
  const projectAchievedPct = totalActivityTarget > 0 ? (projectTotalActual / totalActivityTarget) * 100 : 0;

  if (!na) {
    return (
      <div className="p-4 bg-slate-50 text-slate-500 text-xs rounded-lg text-center">
        Activity not found.
      </div>
    );
  }

  const isPlanMode = mode === 'plan';

  return (
    <div className="border-l-4 border-ercs-red/80 bg-slate-50/70 rounded-xl p-3 my-2 space-y-4 text-xs text-left shadow-2xs">
      {/* 1. Contributing Regions / Zones (N) Table */}
      {effectiveScopeFilter !== 'Project' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs flex flex-col">
          <div className="p-2.5 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-xs">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Contributing Regions / Zones ({displayedRegions.length})</span>
            </div>
            <span className="text-[10px] text-slate-400">
              {isPlanMode ? 'Target & Budget Breakdown' : 'Execution & Budget Breakdown'}
            </span>
          </div>

          {displayedRegions.length === 0 ? (
            <div className="p-4 text-center text-slate-400 text-xs italic">
              No contributing regions or zones linked to this activity.
            </div>
          ) : (
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                <tr>
                  <th className="p-2.5">Region / Zone</th>
                  <th className="p-2.5 text-right">Target ({na.uom})</th>
                  <th className="p-2.5 text-right">% of Activity Target</th>
                  {!isPlanMode && <th className="p-2.5 text-right">Actual</th>}
                  {!isPlanMode && <th className="p-2.5 text-center">Ach. %</th>}
                  {!isPlanMode && (
                    <th
                      className="p-2.5 text-right text-blue-800"
                      title="This contributor's actual as a percentage of the parent National Activity total target"
                    >
                      % of Activity Achieved
                    </th>
                  )}
                  <th className="p-2.5 text-right">Budget (ETB)</th>
                  <th className="p-2.5 text-right">% of Activity Budget</th>
                  {!isPlanMode && <th className="p-2.5 text-right">Spent (ETB)</th>}
                  {isPlanMode && ALL_QUARTERS.map(qId => (
                    <React.Fragment key={qId}>
                      <th className="p-2 text-right bg-blue-50/80 border-l border-slate-200 whitespace-nowrap text-[10px] font-bold text-blue-900">
                        {qId} Target
                      </th>
                      <th className="p-2 text-right bg-blue-50/80 whitespace-nowrap text-[10px] font-bold text-blue-900">
                        {qId} Budget
                      </th>
                    </React.Fragment>
                  ))}
                  <th className="p-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedRegions.map(cr => {
                  const targetPct = totalActivityTarget > 0 ? (cr.target / totalActivityTarget) * 100 : 0;
                  const budgetPct = totalActivityBudget > 0 ? (cr.budget / totalActivityBudget) * 100 : 0;
                  const achievedPct = totalActivityTarget > 0 ? (cr.actual / totalActivityTarget) * 100 : 0;

                  return (
                    <React.Fragment key={cr.region.id}>
                      <tr className="hover:bg-blue-50/40 transition-colors font-medium">
                        <td className="p-2.5 text-slate-900 flex items-center gap-1.5 font-bold">
                          <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{cr.region.name}</span>
                          {cr.zones.length > 0 && (
                            <span className="text-[9px] font-normal px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800">
                              {cr.zones.length} {cr.zones.length === 1 ? 'Zone' : 'Zones'}
                            </span>
                          )}
                        </td>
                        <td className="p-2.5 text-right whitespace-nowrap">
                          {cr.hasBaseline ? (
                            <span className="font-bold text-slate-800">{cr.target.toLocaleString()}</span>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setModalWizard({
                                  initial: {
                                    strategicPriorityId: na.strategic_priority_id || '',
                                    national_activity_id: na.id,
                                    scope_type: 'Regional',
                                    region_id: cr.region.id,
                                    project_id: '',
                                    annual_target: '',
                                    annual_budget: '',
                                    activity_name: na.description || '',
                                    activity_description: na.activity_description || na.description || '',
                                    lockScope: true,
                                  },
                                  startStep: 2,
                                });
                              }}
                              className="inline-flex items-center gap-1 text-[10px] font-bold text-ercs-red bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2 py-0.5 rounded transition-colors"
                            >
                              + Enter target/budget
                            </button>
                          )}
                        </td>
                        <td className="p-2.5 text-right whitespace-nowrap font-semibold text-slate-700">
                          {totalActivityTarget > 0 ? `${targetPct.toFixed(1)}%` : '0.0%'}
                        </td>
                        {!isPlanMode && (
                          <td className="p-2.5 text-right whitespace-nowrap font-bold text-blue-700">
                            {cr.actual.toLocaleString()}
                          </td>
                        )}
                        {!isPlanMode && (
                          <td className="p-2.5 text-center whitespace-nowrap font-semibold">
                            {cr.ach.toFixed(1)}%
                          </td>
                        )}
                        {!isPlanMode && (
                          <td
                            className="p-2.5 text-right whitespace-nowrap font-semibold text-blue-800"
                            title={`${cr.actual.toLocaleString()} achieved of total activity target ${totalActivityTarget.toLocaleString()}`}
                          >
                            {totalActivityTarget > 0 ? `${achievedPct.toFixed(1)}%` : '0.0%'}
                          </td>
                        )}
                        <td className="p-2.5 text-right whitespace-nowrap text-slate-700">
                          {cr.hasBaseline ? cr.budget.toLocaleString() : '—'}
                        </td>
                        <td className="p-2.5 text-right whitespace-nowrap font-semibold text-slate-700">
                          {totalActivityBudget > 0 ? `${budgetPct.toFixed(1)}%` : '0.0%'}
                        </td>
                        {!isPlanMode && (
                          <td className="p-2.5 text-right whitespace-nowrap font-semibold text-slate-900">
                            {cr.spent.toLocaleString()}
                          </td>
                        )}
                        {isPlanMode && ALL_QUARTERS.map(qId => {
                          const qd = getQuarterPlan(cr.entries, qId);
                          return (
                            <React.Fragment key={qId}>
                              <td className="p-2 text-right whitespace-nowrap bg-blue-50/40 border-l border-slate-200 text-slate-700 font-mono text-[11px]">
                                {qd.target > 0 ? qd.target.toLocaleString() : cr.entries.length > 0 ? '0' : '—'}
                              </td>
                              <td className="p-2 text-right whitespace-nowrap bg-blue-50/40 text-slate-700 font-mono text-[11px]">
                                {qd.budget > 0 ? qd.budget.toLocaleString() : cr.entries.length > 0 ? '0' : '—'}
                              </td>
                            </React.Fragment>
                          );
                        })}
                        <td className="p-2.5 text-center whitespace-nowrap">
                          <StatusBadge
                            achievementPct={isPlanMode ? 0 : cr.ach}
                            hasActuals={!isPlanMode && cr.actual > 0}
                          />
                        </td>
                      </tr>

                      {/* Zone-level rows if present */}
                      {cr.zones.map(cz => {
                        const zTargetPct = totalActivityTarget > 0 ? (cz.target / totalActivityTarget) * 100 : 0;
                        const zBudgetPct = totalActivityBudget > 0 ? (cz.budget / totalActivityBudget) * 100 : 0;
                        const zAchievedPct = totalActivityTarget > 0 ? (cz.actual / totalActivityTarget) * 100 : 0;

                        return (
                          <tr key={cz.zone.id} className="hover:bg-slate-50/80 bg-slate-50/20 text-[11px]">
                            <td className="p-2 pl-7 text-slate-700 flex items-center gap-1">
                              <span className="text-slate-300">↳</span>
                              <span className="font-medium text-slate-700">{cz.zone.name}</span>
                            </td>
                            <td className="p-2 text-right whitespace-nowrap text-slate-600">{cz.target.toLocaleString()}</td>
                            <td className="p-2 text-right whitespace-nowrap text-slate-500 font-medium">
                              {totalActivityTarget > 0 ? `${zTargetPct.toFixed(1)}%` : '0.0%'}
                            </td>
                            {!isPlanMode && (
                              <td className="p-2 text-right whitespace-nowrap font-medium text-blue-600">
                                {cz.actual.toLocaleString()}
                              </td>
                            )}
                            {!isPlanMode && (
                              <td className="p-2 text-center whitespace-nowrap text-slate-600">
                                {cz.ach.toFixed(1)}%
                              </td>
                            )}
                            {!isPlanMode && (
                              <td className="p-2 text-right whitespace-nowrap text-blue-700 font-medium">
                                {totalActivityTarget > 0 ? `${zAchievedPct.toFixed(1)}%` : '0.0%'}
                              </td>
                            )}
                            <td className="p-2 text-right whitespace-nowrap text-slate-600">{cz.budget.toLocaleString()}</td>
                            <td className="p-2 text-right whitespace-nowrap text-slate-500 font-medium">
                              {totalActivityBudget > 0 ? `${zBudgetPct.toFixed(1)}%` : '0.0%'}
                            </td>
                            {!isPlanMode && (
                              <td className="p-2 text-right whitespace-nowrap text-slate-700">
                                {cz.spent.toLocaleString()}
                              </td>
                            )}
                            {isPlanMode && ALL_QUARTERS.map(qId => {
                              const qd = getQuarterPlan(cz.entries, qId);
                              return (
                                <React.Fragment key={qId}>
                                  <td className="p-2 text-right whitespace-nowrap bg-blue-50/20 border-l border-slate-100 text-slate-600 font-mono text-[10px]">
                                    {qd.target > 0 ? qd.target.toLocaleString() : cz.entries.length > 0 ? '0' : '—'}
                                  </td>
                                  <td className="p-2 text-right whitespace-nowrap bg-blue-50/20 text-slate-600 font-mono text-[10px]">
                                    {qd.budget > 0 ? qd.budget.toLocaleString() : cz.entries.length > 0 ? '0' : '—'}
                                  </td>
                                </React.Fragment>
                              );
                            })}
                            <td className="p-2 text-center whitespace-nowrap">
                              <StatusBadge
                                achievementPct={isPlanMode ? 0 : cz.ach}
                                hasActuals={!isPlanMode && cz.actual > 0}
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-100/90 font-bold border-t-2 border-slate-200 text-[11px]">
                <tr>
                  <td className="p-2.5 text-slate-800">Regional Total</td>
                  <td className="p-2.5 text-right whitespace-nowrap">{regionalTotalTarget.toLocaleString()}</td>
                  <td className="p-2.5 text-right whitespace-nowrap text-slate-700">
                    {totalActivityTarget > 0 ? `${regionalTargetPct.toFixed(1)}%` : '0.0%'}
                  </td>
                  {!isPlanMode && (
                    <td className="p-2.5 text-right whitespace-nowrap font-bold text-blue-700">
                      {regionalTotalActual.toLocaleString()}
                    </td>
                  )}
                  {!isPlanMode && (
                    <td className="p-2.5 text-center whitespace-nowrap">
                      {regionalAch.toFixed(1)}%
                    </td>
                  )}
                  {!isPlanMode && (
                    <td className="p-2.5 text-right whitespace-nowrap font-bold text-blue-800">
                      {totalActivityTarget > 0 ? `${regionalAchievedPct.toFixed(1)}%` : '0.0%'}
                    </td>
                  )}
                  <td className="p-2.5 text-right whitespace-nowrap">{regionalTotalBudget.toLocaleString()}</td>
                  <td className="p-2.5 text-right whitespace-nowrap text-slate-700">
                    {totalActivityBudget > 0 ? `${regionalBudgetPct.toFixed(1)}%` : '0.0%'}
                  </td>
                  {!isPlanMode && (
                    <td className="p-2.5 text-right whitespace-nowrap text-slate-900">
                      {regionalTotalSpent.toLocaleString()}
                    </td>
                  )}
                  {isPlanMode && ALL_QUARTERS.map(qId => {
                    const qSum = contributingRegions.reduce((sum, r) => {
                      const qd = getQuarterPlan(r.entries, qId);
                      return {
                        target: sum.target + qd.target,
                        budget: sum.budget + qd.budget,
                      };
                    }, { target: 0, budget: 0 });
                    return (
                      <React.Fragment key={qId}>
                        <td className="p-2 text-right whitespace-nowrap bg-blue-100/60 border-l border-slate-200 text-slate-900 font-mono text-[11px]">
                          {qSum.target > 0 ? qSum.target.toLocaleString() : '0'}
                        </td>
                        <td className="p-2 text-right whitespace-nowrap bg-blue-100/60 text-slate-900 font-mono text-[11px]">
                          {qSum.budget > 0 ? qSum.budget.toLocaleString() : '0'}
                        </td>
                      </React.Fragment>
                    );
                  })}
                  <td className="p-2.5 text-center whitespace-nowrap">
                    <StatusBadge
                      achievementPct={isPlanMode ? 0 : regionalAch}
                      hasActuals={!isPlanMode && regionalTotalActual > 0}
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    )}

      {/* 2. Contributing Projects (N) Table */}
      {effectiveScopeFilter !== 'Regional' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs flex flex-col">
          <div className="p-2.5 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-xs">
              <FolderGit2 className="w-4 h-4 text-purple-600" />
              <span>Contributing Projects ({displayedProjects.length})</span>
            </div>
            <span className="text-[10px] text-slate-400">
              {isPlanMode ? 'Target & Budget Breakdown' : 'Execution & Budget Breakdown'}
            </span>
          </div>

          {displayedProjects.length === 0 ? (
            <div className="p-4 text-center text-slate-400 text-xs italic">
              No contributing projects linked to this activity.
            </div>
          ) : (
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                  <tr>
                    <th className="p-2.5">Project Details</th>
                  <th className="p-2.5 text-right">Target ({na.uom})</th>
                  <th className="p-2.5 text-right">% of Activity Target</th>
                  {!isPlanMode && <th className="p-2.5 text-right">Actual</th>}
                  {!isPlanMode && <th className="p-2.5 text-center">Ach. %</th>}
                  {!isPlanMode && (
                    <th
                      className="p-2.5 text-right text-purple-800"
                      title="This contributor's actual as a percentage of the parent National Activity total target"
                    >
                      % of Activity Achieved
                    </th>
                  )}
                  <th className="p-2.5 text-right">Budget</th>
                  <th className="p-2.5 text-right">% of Activity Budget</th>
                  {!isPlanMode && <th className="p-2.5 text-right">Spent</th>}
                  {isPlanMode && ALL_QUARTERS.map(qId => (
                    <React.Fragment key={qId}>
                      <th className="p-2 text-right bg-purple-50/80 border-l border-slate-200 whitespace-nowrap text-[10px] font-bold text-purple-900">
                        {qId} Target
                      </th>
                      <th className="p-2 text-right bg-purple-50/80 whitespace-nowrap text-[10px] font-bold text-purple-900">
                        {qId} Budget
                      </th>
                    </React.Fragment>
                  ))}
                  <th className="p-2.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedProjects.map(cp => {
                  const targetPct = totalActivityTarget > 0 ? (cp.target / totalActivityTarget) * 100 : 0;
                  const budgetPct = totalActivityBudget > 0 ? (cp.budget / totalActivityBudget) * 100 : 0;
                  const achievedPct = totalActivityTarget > 0 ? (cp.actual / totalActivityTarget) * 100 : 0;

                  return (
                    <tr key={cp.project.id} className="hover:bg-purple-50/40 transition-colors">
                      <td className="p-2.5 text-slate-800">
                        <div className="flex items-center gap-1.5 font-bold">
                          <FolderGit2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                          <span>{cp.project.name}</span>
                        </div>
                        {cp.project.description && (
                          <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                            {cp.project.description}
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px] text-slate-500 font-medium">
                          {cp.project.donor && (
                            <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200 font-semibold">
                              Donor: {cp.project.donor}
                            </span>
                          )}
                          {cp.project.location && (
                            <span
                              className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 max-w-2xl truncate"
                              title={cp.project.location}
                            >
                              Loc: {cp.project.location}
                            </span>
                          )}
                          <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                            {cp.project.currency || 'ETB'}
                          </span>
                        </div>
                      </td>
                      <td className="p-2.5 text-right whitespace-nowrap">
                        {cp.hasBaseline ? (
                          <span className="font-bold text-slate-800">{cp.target.toLocaleString()}</span>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalWizard({
                                initial: {
                                  strategicPriorityId: na.strategic_priority_id || '',
                                  national_activity_id: na.id,
                                  scope_type: 'Project',
                                  region_id: '',
                                  project_id: cp.project.id,
                                  annual_target: '',
                                  annual_budget: '',
                                  activity_name: na.description || '',
                                  activity_description: na.activity_description || na.description || '',
                                  lockScope: true,
                                },
                                startStep: 2,
                              });
                            }}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-ercs-red bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2 py-0.5 rounded transition-colors"
                          >
                            + Enter target/budget
                          </button>
                        )}
                      </td>
                      <td className="p-2.5 text-right whitespace-nowrap font-semibold text-slate-700">
                        {totalActivityTarget > 0 ? `${targetPct.toFixed(1)}%` : '0.0%'}
                      </td>
                      {!isPlanMode && (
                        <td className="p-2.5 text-right whitespace-nowrap font-bold text-blue-700">
                          {cp.actual.toLocaleString()}
                        </td>
                      )}
                      {!isPlanMode && (
                        <td className="p-2.5 text-center whitespace-nowrap font-semibold">
                          {cp.ach.toFixed(1)}%
                        </td>
                      )}
                      {!isPlanMode && (
                        <td
                          className="p-2.5 text-right whitespace-nowrap font-semibold text-purple-800"
                          title={`${cp.actual.toLocaleString()} achieved of total activity target ${totalActivityTarget.toLocaleString()}`}
                        >
                          {totalActivityTarget > 0 ? `${achievedPct.toFixed(1)}%` : '0.0%'}
                        </td>
                      )}
                      <td className="p-2.5 text-right whitespace-nowrap text-slate-700">
                        {cp.hasBaseline ? (
                          <span>{cp.project.currency || 'ETB'} {cp.budget.toLocaleString()}</span>
                        ) : (
                          <span className="text-slate-400 italic text-[11px]">—</span>
                        )}
                      </td>
                      <td className="p-2.5 text-right whitespace-nowrap font-semibold text-slate-700">
                        {totalActivityBudget > 0 ? `${budgetPct.toFixed(1)}%` : '0.0%'}
                      </td>
                      {!isPlanMode && (
                        <td className="p-2.5 text-right whitespace-nowrap font-semibold text-slate-900">
                          {cp.project.currency || 'ETB'} {cp.spent.toLocaleString()}
                        </td>
                      )}
                      {isPlanMode && ALL_QUARTERS.map(qId => {
                        const qd = getQuarterPlan(cp.entries, qId);
                        return (
                          <React.Fragment key={qId}>
                            <td className="p-2 text-right whitespace-nowrap bg-purple-50/40 border-l border-slate-200 text-slate-700 font-mono text-[11px]">
                              {qd.target > 0 ? qd.target.toLocaleString() : cp.entries.length > 0 ? '0' : '—'}
                            </td>
                            <td className="p-2 text-right whitespace-nowrap bg-purple-50/40 text-slate-700 font-mono text-[11px]">
                              {qd.budget > 0 ? qd.budget.toLocaleString() : cp.entries.length > 0 ? '0' : '—'}
                            </td>
                          </React.Fragment>
                        );
                      })}
                      <td className="p-2.5 text-center whitespace-nowrap">
                        <StatusBadge
                          achievementPct={isPlanMode ? 0 : cp.ach}
                          hasActuals={!isPlanMode && cp.actual > 0}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-100/90 font-bold border-t-2 border-slate-200 text-[11px]">
                <tr>
                  <td className="p-2.5 text-slate-800">Project Total</td>
                  <td className="p-2.5 text-right whitespace-nowrap">{projectTotalTarget.toLocaleString()}</td>
                  <td className="p-2.5 text-right whitespace-nowrap text-slate-700">
                    {totalActivityTarget > 0 ? `${projectTargetPct.toFixed(1)}%` : '0.0%'}
                  </td>
                  {!isPlanMode && (
                    <td className="p-2.5 text-right whitespace-nowrap font-bold text-blue-700">
                      {projectTotalActual.toLocaleString()}
                    </td>
                  )}
                  {!isPlanMode && (
                    <td className="p-2.5 text-center whitespace-nowrap">
                      {projectAch.toFixed(1)}%
                    </td>
                  )}
                  {!isPlanMode && (
                    <td className="p-2.5 text-right whitespace-nowrap font-bold text-purple-800">
                      {totalActivityTarget > 0 ? `${projectAchievedPct.toFixed(1)}%` : '0.0%'}
                    </td>
                  )}
                  <td className="p-2.5 text-right whitespace-nowrap">ETB {projectTotalBudget.toLocaleString()}</td>
                  <td className="p-2.5 text-right whitespace-nowrap text-slate-700">
                    {totalActivityBudget > 0 ? `${projectBudgetPct.toFixed(1)}%` : '0.0%'}
                  </td>
                  {!isPlanMode && (
                    <td className="p-2.5 text-right whitespace-nowrap text-slate-900">
                      ETB {projectTotalSpent.toLocaleString()}
                    </td>
                  )}
                  {isPlanMode && ALL_QUARTERS.map(qId => {
                    const qSum = contributingProjects.reduce((sum, p) => {
                      const qd = getQuarterPlan(p.entries, qId);
                      return {
                        target: sum.target + qd.target,
                        budget: sum.budget + qd.budget,
                      };
                    }, { target: 0, budget: 0 });
                    return (
                      <React.Fragment key={qId}>
                        <td className="p-2.5 text-right whitespace-nowrap bg-purple-100/60 border-l border-slate-200 text-slate-900 font-mono text-[11px]">
                          {qSum.target > 0 ? qSum.target.toLocaleString() : '0'}
                        </td>
                        <td className="p-2.5 text-right whitespace-nowrap bg-purple-100/60 text-slate-900 font-mono text-[11px]">
                          {qSum.budget > 0 ? qSum.budget.toLocaleString() : '0'}
                        </td>
                      </React.Fragment>
                    );
                  })}
                  <td className="p-2.5 text-center whitespace-nowrap">
                    <StatusBadge
                      achievementPct={isPlanMode ? 0 : projectAch}
                      hasActuals={!isPlanMode && projectTotalActual > 0}
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    )}

      {modalWizard && (
        <PlanEntryWizardModal
          initial={modalWizard.initial}
          startStep={modalWizard.startStep}
          onClose={() => setModalWizard(null)}
          onSaved={() => setModalWizard(null)}
        />
      )}
    </div>
  );
};
