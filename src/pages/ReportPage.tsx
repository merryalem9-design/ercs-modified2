// src/pages/ReportPage.tsx
import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { FilterBar } from '../components/common/FilterBar';
import {
  sumPlannedTarget,
  sumPlannedBudget,
  sumActual,
  sumExpenditure,
  achievementPct,
  budgetUtilizationPct,
  convertToBeneficiaries,
} from '../utils/calculations';
import {
  PlanEntry,
  QuarterlyPlan,
  QuarterId,
} from '../types';
import { Target, Wallet, Users, TrendingUp, Layers, CheckCircle2, AlertCircle } from 'lucide-react';

/** Beneficiary % = beneficiaries actually reached vs. beneficiaries planned. */
const beneficiaryPct = (actualBen: number, totalBen: number): number =>
  totalBen === 0 ? 0 : (actualBen / totalBen) * 100;

type KpiBadge = { label: string; color: string };
const OVERACHIEVED_BADGE: KpiBadge = { label: 'Overachieved', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
const OVER_BUDGET_BADGE: KpiBadge = { label: 'Over Budget', color: 'bg-rose-100 text-rose-800 border-rose-300' };

const ALL_QUARTER_IDS: QuarterId[] = ['Q1', 'Q2', 'Q3', 'Q4'];

interface QuarterlyBreakdown {
  qId: QuarterId;
  target: number;
  budget: number;
}

const buildQuarterlyData = (es: PlanEntry[], quarterlyPlans: QuarterlyPlan[]): QuarterlyBreakdown[] =>
  ALL_QUARTER_IDS.map(qId => ({
    qId,
    target: es.reduce(
      (s, e) => s + (quarterlyPlans.find(qp => qp.plan_entry_id === e.id && qp.quarter_id === qId)?.target ?? 0),
      0
    ),
    budget: es.reduce(
      (s, e) => s + (quarterlyPlans.find(qp => qp.plan_entry_id === e.id && qp.quarter_id === qId)?.budget ?? 0),
      0
    ),
  }));

export const ReportPage: React.FC = () => {
  const {
    nationalActivities,
    strategicPriorities,
    strategicObjectives,
    regions,
    projects,
    quarterlyPlans,
    quarterlyActuals,
    uomConfigs,
    filters,
    getFilteredPlanEntries,
    activeRoute,
    reportFocusSection,
    setReportFocusSection,
    computeAopTotals,
    currentRole,
    zones,
  } = useApp();

  const isBranchHead = currentRole.startsWith('Branch Head — ');
  const isZoneCoordinator = currentRole.endsWith(' coordinators');
  const isRegionalRole = isBranchHead || isZoneCoordinator;
  const isProjectCoordinator = currentRole.startsWith('Project Coordinator — ');
  const isProgramDirector = currentRole === 'Program Director';
  const isProjectCoordinatorHQ = currentRole === 'Project Coordinator — HQ';
  const isProjectRole = isProjectCoordinator || isProgramDirector || isProjectCoordinatorHQ;

  const currentZone = isZoneCoordinator ? zones.find(z => `${z.name} coordinators` === currentRole) : undefined;
  const assignedRegion = isBranchHead
    ? regions.find(r => `Branch Head — ${r.name}` === currentRole)
    : isZoneCoordinator
    ? regions.find(r => r.id === currentZone?.region_id)
    : undefined;
  const assignedProject = isProjectCoordinator
    ? projects.find(p => p.name === currentRole.slice('Project Coordinator — '.length))
    : undefined;

  const [activeTab, setActiveTab] = useState<'all' | 'contributing' | 'non-contributing'>('all');

  const entries = getFilteredPlanEntries();
  const q = filters.quarterId;

  const visibleQuarters: QuarterId[] =
    q === 'SEMI' ? ['Q1', 'Q2'] :
    q === 'NINE_MONTH' ? ['Q1', 'Q2', 'Q3'] :
    (q === 'Q1' || q === 'Q2' || q === 'Q3' || q === 'Q4') ? [q as QuarterId] :
    ALL_QUARTER_IDS;

  useEffect(() => {
    if (activeRoute !== 'report' || !reportFocusSection) return;
    const id = `report-section-${reportFocusSection}`;
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setReportFocusSection(null);
    }, 80);
    return () => clearTimeout(timer);
  }, [reportFocusSection, activeRoute, setReportFocusSection]);

  const contributingEntries = entries.filter(e => e.is_contributing !== false);
  const nonContributingEntries = entries.filter(e => e.is_contributing === false);

  const uomsFor = (es: PlanEntry[]) =>
    Array.from(
      new Set(
        es
          .map(e => e.uom || nationalActivities.find(na => na.id === e.national_activity_id)?.uom)
          .filter((u): u is string => !!u)
      )
    );

  const uomsInScope = uomsFor(entries);
  const singleUom = uomsInScope.length === 1 ? uomsInScope[0] : null;

  const totalBeneficiariesFor = (es: PlanEntry[]) =>
    es.reduce((sum, e) => {
      const na = nationalActivities.find(n => n.id === e.national_activity_id);
      const t = sumPlannedTarget([e], quarterlyPlans, q);
      return sum + convertToBeneficiaries(t, e.uom || na?.uom || '', uomConfigs);
    }, 0);

  const actualBeneficiariesFor = (es: PlanEntry[]) =>
    es.reduce((sum, e) => {
      const na = nationalActivities.find(n => n.id === e.national_activity_id);
      const a = sumActual([e], quarterlyActuals, q);
      return sum + convertToBeneficiaries(a, e.uom || na?.uom || '', uomConfigs);
    }, 0);

  // -------------------------------------------------------------------
  // AOP plan totals from seeded national activity data — used as the
  // authoritative "planned" side. Scoped to the same filters as plan entries
  // so the KPI cards are consistent.
  // -------------------------------------------------------------------
  const filteredNas = nationalActivities.filter(na => {
    if (filters.strategicPriorityId !== 'ALL' && na.strategic_priority_id !== filters.strategicPriorityId) return false;
    if (filters.strategicObjectiveId !== 'ALL' && na.strategic_objective_id !== filters.strategicObjectiveId) return false;
    if (filters.nationalActivityId !== 'ALL' && na.id !== filters.nationalActivityId) return false;
    if (filters.department && filters.department !== 'ALL' && na.department !== filters.department) return false;
    if (filters.year && filters.year !== 'ALL' && na.year && String(na.year) !== String(filters.year)) return false;
    return true;
  });
  const aopTotals = computeAopTotals(filteredNas);

  // AOP plan target and budget scoped by role / responsibility filter
  const aopTarget = isRegionalRole
    ? (assignedRegion ? (aopTotals.byRegion[assignedRegion.id]?.target ?? 0) : aopTotals.rbTarget)
    : isProjectRole
    ? aopTotals.hqTarget
    : (filters.responsibility === 'Region'
        ? (filters.regionId.length > 0 && !filters.regionId.includes('ALL') && !filters.regionId.includes('NONE')
            ? filters.regionId.reduce((s, rId) => s + (aopTotals.byRegion[rId]?.target ?? 0), 0)
            : aopTotals.rbTarget)
        : (filters.responsibility === 'Project' || filters.responsibility === 'HQ')
        ? aopTotals.hqTarget
        : aopTotals.ercsTarget);

  const aopBudget = isRegionalRole
    ? (assignedRegion ? (aopTotals.byRegion[assignedRegion.id]?.budget ?? 0) : aopTotals.rbBudget)
    : isProjectRole
    ? aopTotals.hqBudget
    : (filters.responsibility === 'Region'
        ? (filters.regionId.length > 0 && !filters.regionId.includes('ALL') && !filters.regionId.includes('NONE')
            ? filters.regionId.reduce((s, rId) => s + (aopTotals.byRegion[rId]?.budget ?? 0), 0)
            : aopTotals.rbBudget)
        : (filters.responsibility === 'Project' || filters.responsibility === 'HQ')
        ? aopTotals.hqBudget
        : aopTotals.ercsBudget);

  const aopActual = sumActual(entries, quarterlyActuals, q);
  const aopSpent = sumExpenditure(entries, quarterlyActuals, q);
  const aopAchievement = achievementPct(aopActual, aopTarget);
  const aopUtilization = budgetUtilizationPct(aopSpent, aopBudget);

  // AOP by region: seeded regional_targets as planned, actuals from plan entries
  // Project roles must NEVER see region data!
  const aopByRegion = isProjectRole ? [] : regions
    .filter(r => {
      if (isRegionalRole && assignedRegion) return r.id === assignedRegion.id;
      if (filters.regionId.length > 0 && !filters.regionId.includes('ALL') && !filters.regionId.includes('NONE')) {
        return filters.regionId.includes(r.id);
      }
      return true;
    })
    .map(r => {
      const planned = aopTotals.byRegion[r.id]?.target ?? 0;
      const plannedBudget = aopTotals.byRegion[r.id]?.budget ?? 0;
      const es = contributingEntries.filter(e => e.region_id === r.id);
      const actual = sumActual(es, quarterlyActuals, q);
      const spent = sumExpenditure(es, quarterlyActuals, q);
      return { name: r.name, planned, plannedBudget, actual, spent, achievement: achievementPct(actual, planned), utilization: budgetUtilizationPct(spent, plannedBudget) };
    }).filter(r => r.planned > 0 || r.actual > 0);

  // AOP by project (visible to project roles or when responsibility is Project/HQ)
  const aopByProject = isRegionalRole ? [] : projects
    .filter(p => {
      if (assignedProject) return p.id === assignedProject.id;
      if (filters.projectId.length > 0 && !filters.projectId.includes('ALL') && !filters.projectId.includes('NONE')) {
        return filters.projectId.includes(p.id);
      }
      return true;
    })
    .map(p => {
      const es = contributingEntries.filter(e => e.project_id === p.id);
      const planned = sumPlannedTarget(es, quarterlyPlans, q);
      const plannedBudget = sumPlannedBudget(es, quarterlyPlans, q);
      const actual = sumActual(es, quarterlyActuals, q);
      const spent = sumExpenditure(es, quarterlyActuals, q);
      return { name: p.name, planned, plannedBudget, actual, spent, achievement: achievementPct(actual, planned), utilization: budgetUtilizationPct(spent, plannedBudget) };
    }).filter(r => r.planned > 0 || r.actual > 0);

  // AOP by strategic priority: planned scoped to role
  const aopBySp = strategicPriorities.map(sp => {
    let planned = aopTotals.byStrategicPriority[sp.id]?.target ?? 0;
    let plannedBudget = aopTotals.byStrategicPriority[sp.id]?.budget ?? 0;
    if (isRegionalRole && assignedRegion) {
      const nasUnderSp = filteredNas.filter(na => na.strategic_priority_id === sp.id);
      planned = nasUnderSp.reduce((s, na) => s + (na.regional_targets?.[assignedRegion.id]?.target || 0), 0);
      plannedBudget = nasUnderSp.reduce((s, na) => s + (na.regional_targets?.[assignedRegion.id]?.budget || 0), 0);
    } else if (isRegionalRole) {
      const nasUnderSp = filteredNas.filter(na => na.strategic_priority_id === sp.id);
      planned = nasUnderSp.reduce((s, na) => s + (na.rb_target || 0), 0);
      plannedBudget = nasUnderSp.reduce((s, na) => s + (na.rb_budget || 0), 0);
    } else if (isProjectRole || filters.responsibility === 'Project' || filters.responsibility === 'HQ') {
      const nasUnderSp = filteredNas.filter(na => na.strategic_priority_id === sp.id);
      planned = nasUnderSp.reduce((s, na) => s + (na.hq_target || 0), 0);
      plannedBudget = nasUnderSp.reduce((s, na) => s + (na.hq_budget || 0), 0);
    }
    const es = contributingEntries.filter(e => nationalActivities.find(n => n.id === e.national_activity_id)?.strategic_priority_id === sp.id);
    const actual = sumActual(es, quarterlyActuals, q);
    const spent = sumExpenditure(es, quarterlyActuals, q);
    return { name: `${sp.code} — ${sp.name}`, planned, plannedBudget, actual, spent, achievement: achievementPct(actual, planned), utilization: budgetUtilizationPct(spent, plannedBudget) };
  }).filter(r => r.planned > 0 || r.actual > 0);

  // AOP by strategic objective
  const aopBySo = strategicObjectives.map(so => {
    let planned = aopTotals.byStrategicObjective[so.id]?.target ?? 0;
    let plannedBudget = aopTotals.byStrategicObjective[so.id]?.budget ?? 0;
    if (isRegionalRole && assignedRegion) {
      const nasUnderSo = filteredNas.filter(na => na.strategic_objective_id === so.id);
      planned = nasUnderSo.reduce((s, na) => s + (na.regional_targets?.[assignedRegion.id]?.target || 0), 0);
      plannedBudget = nasUnderSo.reduce((s, na) => s + (na.regional_targets?.[assignedRegion.id]?.budget || 0), 0);
    } else if (isRegionalRole) {
      const nasUnderSo = filteredNas.filter(na => na.strategic_objective_id === so.id);
      planned = nasUnderSo.reduce((s, na) => s + (na.rb_target || 0), 0);
      plannedBudget = nasUnderSo.reduce((s, na) => s + (na.rb_budget || 0), 0);
    } else if (isProjectRole || filters.responsibility === 'Project' || filters.responsibility === 'HQ') {
      const nasUnderSo = filteredNas.filter(na => na.strategic_objective_id === so.id);
      planned = nasUnderSo.reduce((s, na) => s + (na.hq_target || 0), 0);
      plannedBudget = nasUnderSo.reduce((s, na) => s + (na.hq_budget || 0), 0);
    }
    const es = contributingEntries.filter(e => nationalActivities.find(n => n.id === e.national_activity_id)?.strategic_objective_id === so.id);
    const actual = sumActual(es, quarterlyActuals, q);
    const spent = sumExpenditure(es, quarterlyActuals, q);
    return { name: `${so.code} — ${so.name}`, planned, plannedBudget, actual, spent, achievement: achievementPct(actual, planned), utilization: budgetUtilizationPct(spent, plannedBudget) };
  }).filter(r => r.planned > 0 || r.actual > 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Aggregated Report</h2>
        <p className="text-xs text-slate-500 mt-1">
          Consolidated performance and expenditure report across all contributing national activities and standalone project activities.
        </p>
      </div>

      <FilterBar allowNoneScope />

      {/* KPI CARDS — AOP Plan vs. Actual */}
      <div id="report-section-top" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title={isRegionalRole ? 'AOP Regional Achievement' : isProjectRole ? 'AOP Project Achievement' : 'AOP Achievement'}
          val={`${aopAchievement.toFixed(1)}%`}
          sub={`${aopActual.toLocaleString()} actual / ${aopTarget.toLocaleString()} ${isRegionalRole ? 'regional' : isProjectRole ? 'project' : 'AOP'} target`}
          icon={Target}
          statusBadge={aopAchievement > 100 ? OVERACHIEVED_BADGE : undefined}
        />
        <KPICard
          title={isRegionalRole ? 'Regional Budget Utilization' : isProjectRole ? 'Project Budget Utilization' : 'Budget Utilization'}
          val={`${aopUtilization.toFixed(1)}%`}
          sub={`ETB ${aopSpent.toLocaleString()} spent / ${aopBudget.toLocaleString()} ${isRegionalRole ? 'regional' : isProjectRole ? 'project' : 'AOP'} budget`}
          icon={Wallet}
          statusBadge={aopUtilization > 100 ? OVER_BUDGET_BADGE : undefined}
        />
        <KPICard
          title="Beneficiaries Reached"
          val={actualBeneficiariesFor(entries).toLocaleString()}
          sub={`of ${totalBeneficiariesFor(entries).toLocaleString()} planned`}
          icon={Users}
        />
        <KPICard
          title="Plan Entries in Scope"
          val={String(entries.length)}
          sub={isRegionalRole ? `${contributingEntries.length} Regional Entries` : `${contributingEntries.length} Contributing · ${nonContributingEntries.length} Standalone`}
          icon={TrendingUp}
        />
      </div>

      {/* AOP PLAN OVERVIEW — National targets from seeded data vs. actual delivery */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">AOP Plan Overview</h3>
        <p className="text-[11px] text-slate-500 -mt-2">Planned targets sourced from ERCS 2019 AOP (Excel). Actuals accumulate from user-entered quarterly reporting.</p>

        {/* By Strategic Priority */}
        {aopBySp.length > 0 && (
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="p-3 border-b bg-slate-50 text-xs font-bold text-slate-700 uppercase tracking-wider">By Strategic Priority</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b">
                  <tr>
                    <th className="p-3">Strategic Priority</th>
                    <th className="p-3 text-right">AOP Target</th>
                    <th className="p-3 text-right">Actual</th>
                    <th className="p-3 text-right">Achievement %</th>
                    <th className="p-3 text-right">AOP Budget (ETB)</th>
                    <th className="p-3 text-right">Spent (ETB)</th>
                    <th className="p-3 text-right">Utilization %</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {aopBySp.map(row => (
                    <tr key={row.name} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-800 max-w-xs">{row.name}</td>
                      <td className="p-3 text-right">{row.planned.toLocaleString()}</td>
                      <td className="p-3 text-right font-bold text-blue-700">{row.actual.toLocaleString()}</td>
                      <td className={`p-3 text-right font-black ${row.achievement >= 100 ? 'text-emerald-600' : row.achievement >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                        {row.achievement.toFixed(1)}%
                      </td>
                      <td className="p-3 text-right">{row.plannedBudget.toLocaleString()}</td>
                      <td className="p-3 text-right">{row.spent.toLocaleString()}</td>
                      <td className="p-3 text-right">{row.utilization.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* By Region (Hidden for Project roles) */}
        {!isProjectRole && aopByRegion.length > 0 && (
          <div id="report-section-region" className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="p-3 border-b bg-slate-50 text-xs font-bold text-slate-700 uppercase tracking-wider">
              {isRegionalRole && assignedRegion ? `By Region (${assignedRegion.name})` : 'By Region (AOP Plan)'}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b">
                  <tr>
                    <th className="p-3">Region</th>
                    <th className="p-3 text-right">AOP Target</th>
                    <th className="p-3 text-right">Actual</th>
                    <th className="p-3 text-right">Achievement %</th>
                    <th className="p-3 text-right">AOP Budget (ETB)</th>
                    <th className="p-3 text-right">Spent (ETB)</th>
                    <th className="p-3 text-right">Utilization %</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {aopByRegion.map(row => (
                    <tr key={row.name} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-800">{row.name}</td>
                      <td className="p-3 text-right">{row.planned.toLocaleString()}</td>
                      <td className="p-3 text-right font-bold text-blue-700">{row.actual.toLocaleString()}</td>
                      <td className={`p-3 text-right font-black ${row.achievement >= 100 ? 'text-emerald-600' : row.achievement >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                        {row.achievement.toFixed(1)}%
                      </td>
                      <td className="p-3 text-right">{row.plannedBudget.toLocaleString()}</td>
                      <td className="p-3 text-right">{row.spent.toLocaleString()}</td>
                      <td className="p-3 text-right">{row.utilization.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* By Project (Hidden for Regional roles) */}
        {!isRegionalRole && aopByProject.length > 0 && (
          <div id="report-section-project" className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="p-3 border-b bg-slate-50 text-xs font-bold text-slate-700 uppercase tracking-wider">
              {isProjectRole && assignedProject ? `By Project (${assignedProject.name})` : 'By Project (Execution Plans)'}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b">
                  <tr>
                    <th className="p-3">Project</th>
                    <th className="p-3 text-right">Planned Target</th>
                    <th className="p-3 text-right">Actual</th>
                    <th className="p-3 text-right">Achievement %</th>
                    <th className="p-3 text-right">Planned Budget (ETB)</th>
                    <th className="p-3 text-right">Spent (ETB)</th>
                    <th className="p-3 text-right">Utilization %</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {aopByProject.map(row => (
                    <tr key={row.name} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-800">{row.name}</td>
                      <td className="p-3 text-right">{row.planned.toLocaleString()}</td>
                      <td className="p-3 text-right font-bold text-blue-700">{row.actual.toLocaleString()}</td>
                      <td className={`p-3 text-right font-black ${row.achievement >= 100 ? 'text-emerald-600' : row.achievement >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                        {row.achievement.toFixed(1)}%
                      </td>
                      <td className="p-3 text-right">{row.plannedBudget.toLocaleString()}</td>
                      <td className="p-3 text-right">{row.spent.toLocaleString()}</td>
                      <td className="p-3 text-right">{row.utilization.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* By Strategic Objective */}
        {aopBySo.length > 0 && (
          <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <div className="p-3 border-b bg-slate-50 text-xs font-bold text-slate-700 uppercase tracking-wider">By Strategic Objective</div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b">
                  <tr>
                    <th className="p-3">Strategic Objective</th>
                    <th className="p-3 text-right">AOP Target</th>
                    <th className="p-3 text-right">Actual</th>
                    <th className="p-3 text-right">Achievement %</th>
                    <th className="p-3 text-right">AOP Budget (ETB)</th>
                    <th className="p-3 text-right">Spent (ETB)</th>
                    <th className="p-3 text-right">Utilization %</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {aopBySo.map(row => (
                    <tr key={row.name} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-800 max-w-xs">{row.name}</td>
                      <td className="p-3 text-right">{row.planned.toLocaleString()}</td>
                      <td className="p-3 text-right font-bold text-blue-700">{row.actual.toLocaleString()}</td>
                      <td className={`p-3 text-right font-black ${row.achievement >= 100 ? 'text-emerald-600' : row.achievement >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                        {row.achievement.toFixed(1)}%
                      </td>
                      <td className="p-3 text-right">{row.plannedBudget.toLocaleString()}</td>
                      <td className="p-3 text-right">{row.spent.toLocaleString()}</td>
                      <td className="p-3 text-right">{row.utilization.toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* VIEW TABS */}
      <div className="flex items-center gap-2 border-b pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'all'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" /> All Activities ({entries.length})
        </button>
        <button
          onClick={() => setActiveTab('contributing')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'contributing'
              ? 'bg-ercs-red text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> Contributing Activities ({contributingEntries.length})
        </button>
        {!isRegionalRole && (
          <button
            onClick={() => setActiveTab('non-contributing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'non-contributing'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" /> Non-Contributing Project Activities ({nonContributingEntries.length})
          </button>
        )}
      </div>

      {/* CONSOLIDATED CONTRIBUTING TABLE */}
      {(activeTab === 'all' || activeTab === 'contributing') && (
        <div id="report-section-national" className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-ercs-red" />
              <span>Consolidated Strategic & Execution Report ({contributingEntries.length})</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Includes Strategic Priority & Objective Hierarchy</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b">
                <tr>
                  <th className="p-3 whitespace-nowrap">Strategic Priority</th>
                  <th className="p-3 whitespace-nowrap">Strategic Objective</th>
                  <th className="p-3">Code</th>
                  <th className="p-3 min-w-40">Activity Name</th>
                  <th className="p-3 min-w-56">Description</th>
                  <th className="p-3">UOM</th>
                  <th className="p-3">Executed By</th>
                  <th className="p-3 text-right">Target</th>
                  <th className="p-3 text-right">Actual</th>
                  <th className="p-3 text-right">Achievement %</th>
                  <th className="p-3 text-right">Budget (ETB)</th>
                  <th className="p-3 text-right">Spent (ETB)</th>
                  <th className="p-3 text-right">Utilization %</th>
                  <th className="p-3 text-right">Total Beneficiaries</th>
                  <th className="p-3 text-right">Actual Beneficiaries</th>
                  <th className="p-3 text-right">Beneficiary %</th>
                  {visibleQuarters.map(qId => (
                    <th key={qId} className="p-2 text-center bg-blue-50 border-l whitespace-nowrap" colSpan={2}>
                      {qId} Target / Budget
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {contributingEntries.map(pe => {
                  const na = nationalActivities.find(n => n.id === pe.national_activity_id);
                  const sp = strategicPriorities.find(p => p.id === na?.strategic_priority_id);
                  const so = strategicObjectives.find(o => o.id === na?.strategic_objective_id);
                  const scopeName =
                    pe.scope_type === 'Regional'
                      ? regions.find(r => r.id === pe.region_id)?.name
                      : projects.find(p => p.id === pe.project_id)?.name;

                  const t = sumPlannedTarget([pe], quarterlyPlans, q);
                  const a = sumActual([pe], quarterlyActuals, q);
                  const b = sumPlannedBudget([pe], quarterlyPlans, q);
                  const s = sumExpenditure([pe], quarterlyActuals, q);
                  const ach = achievementPct(a, t);
                  const ut = budgetUtilizationPct(s, b);
                  const tb = convertToBeneficiaries(t, pe.uom || na?.uom || '', uomConfigs);
                  const ab = convertToBeneficiaries(a, pe.uom || na?.uom || '', uomConfigs);
                  const bp = beneficiaryPct(ab, tb);

                  return (
                    <tr key={pe.id} className="hover:bg-slate-50">
                      <td className="p-3 whitespace-nowrap font-medium text-slate-700">
                        {sp ? `${sp.code} — ${sp.name}` : '—'}
                      </td>
                      <td className="p-3 whitespace-nowrap font-medium text-slate-700">
                        {so ? `${so.code} — ${so.name}` : '—'}
                      </td>
                      <td className="p-3 font-bold text-ercs-red whitespace-nowrap">{na?.code || pe.activity_code || '—'}</td>
                      <td className="p-3 font-bold text-slate-800">
                        <div>{pe.activity_name}</div>
                        {na && (
                          <div className="text-[10px] text-slate-400 font-normal truncate max-w-xs mt-0.5">
                            Linked: {na.code} — {na.description}
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-slate-500">{pe.activity_description}</td>
                      <td className="p-3 whitespace-nowrap text-slate-500 font-semibold">{pe.uom || na?.uom || '—'}</td>
                      <td className="p-3 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            pe.scope_type === 'Regional' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                          }`}
                        >
                          {pe.scope_type === 'Regional' ? (regions.find(r => r.id === pe.region_id)?.name || 'Regional') : 'Project'}
                        </span>
                        <span className="ml-2 font-semibold">{scopeName || '—'}</span>
                      </td>
                      <td className="p-3 text-right font-bold whitespace-nowrap">{t.toLocaleString()}</td>
                      <td className="p-3 text-right whitespace-nowrap">{a.toLocaleString()}</td>
                      <td className="p-3 text-right font-bold whitespace-nowrap">{ach.toFixed(1)}%</td>
                      <td className="p-3 text-right whitespace-nowrap">{b.toLocaleString()}</td>
                      <td className="p-3 text-right whitespace-nowrap">{s.toLocaleString()}</td>
                      <td className="p-3 text-right font-bold whitespace-nowrap">{ut.toFixed(1)}%</td>
                      <td className="p-3 text-right whitespace-nowrap">{tb.toLocaleString()}</td>
                      <td className="p-3 text-right whitespace-nowrap">{ab.toLocaleString()}</td>
                      <td className="p-3 text-right whitespace-nowrap">{bp.toFixed(1)}%</td>
                      {visibleQuarters.map(qId => {
                        const qp = quarterlyPlans.find(p => p.plan_entry_id === pe.id && p.quarter_id === qId);
                        return (
                          <React.Fragment key={qId}>
                            <td className="p-2 text-right whitespace-nowrap bg-blue-50 border-l text-[11px]">
                              {(qp?.target ?? 0).toLocaleString()}
                            </td>
                            <td className="p-2 text-right whitespace-nowrap bg-blue-50 text-[11px]">
                              {(qp?.budget ?? 0).toLocaleString()}
                            </td>
                          </React.Fragment>
                        );
                      })}
                    </tr>
                  );
                })}
                {contributingEntries.length === 0 && (
                  <tr>
                    <td colSpan={16 + visibleQuarters.length * 2} className="p-8 text-center text-slate-400">
                      No contributing plan entries match this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DEDICATED NON-CONTRIBUTING PROJECT ACTIVITIES TABLE */}
      {!isRegionalRole && (activeTab === 'all' || activeTab === 'non-contributing') && (
        <div id="report-section-non-contributing" className="bg-white rounded-xl border border-amber-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-amber-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Non-Contributing Project Activities ({nonContributingEntries.length})</span>
            </div>
            <span className="text-[11px] text-amber-800 font-semibold bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
              Standalone · Not Aggregated into National Targets
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-amber-50/60 text-amber-900 font-bold uppercase border-b border-amber-200">
                <tr>
                  <th className="p-3 whitespace-nowrap">Project</th>
                  <th className="p-3">Activity Code</th>
                  <th className="p-3 min-w-40">Activity Name</th>
                  <th className="p-3 min-w-56">Description</th>
                  <th className="p-3">UOM</th>
                  <th className="p-3 text-right">Target</th>
                  <th className="p-3 text-right">Actual</th>
                  <th className="p-3 text-right">Achievement %</th>
                  <th className="p-3 text-right">Budget (ETB)</th>
                  <th className="p-3 text-right">Spent (ETB)</th>
                  <th className="p-3 text-right">Utilization %</th>
                  <th className="p-3 text-right">Total Beneficiaries</th>
                  <th className="p-3 text-right">Actual Beneficiaries</th>
                  <th className="p-3 text-right">Beneficiary %</th>
                  {visibleQuarters.map(qId => (
                    <th key={qId} className="p-2 text-center bg-amber-100/60 border-l border-amber-200 whitespace-nowrap" colSpan={2}>
                      {qId} Target / Budget
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {nonContributingEntries.map(pe => {
                  const proj = projects.find(p => p.id === pe.project_id);
                  const t = sumPlannedTarget([pe], quarterlyPlans, q);
                  const a = sumActual([pe], quarterlyActuals, q);
                  const b = sumPlannedBudget([pe], quarterlyPlans, q);
                  const s = sumExpenditure([pe], quarterlyActuals, q);
                  const ach = achievementPct(a, t);
                  const ut = budgetUtilizationPct(s, b);
                  const tb = convertToBeneficiaries(t, pe.uom || 'Number', uomConfigs);
                  const ab = convertToBeneficiaries(a, pe.uom || 'Number', uomConfigs);
                  const bp = beneficiaryPct(ab, tb);

                  return (
                    <tr key={pe.id} className="hover:bg-amber-50/40">
                      <td className="p-3 font-bold text-slate-800 whitespace-nowrap">{proj?.name || '—'}</td>
                      <td className="p-3 font-bold text-amber-700 whitespace-nowrap">{pe.activity_code || '—'}</td>
                      <td className="p-3 font-bold text-slate-800">{pe.activity_name}</td>
                      <td className="p-3 text-slate-600">{pe.activity_description}</td>
                      <td className="p-3 whitespace-nowrap text-slate-500 font-semibold">{pe.uom || 'Number'}</td>
                      <td className="p-3 text-right font-bold whitespace-nowrap">{t.toLocaleString()}</td>
                      <td className="p-3 text-right whitespace-nowrap">{a.toLocaleString()}</td>
                      <td className="p-3 text-right font-bold whitespace-nowrap">{ach.toFixed(1)}%</td>
                      <td className="p-3 text-right whitespace-nowrap">{b.toLocaleString()}</td>
                      <td className="p-3 text-right whitespace-nowrap">{s.toLocaleString()}</td>
                      <td className="p-3 text-right font-bold whitespace-nowrap">{ut.toFixed(1)}%</td>
                      <td className="p-3 text-right whitespace-nowrap">{tb.toLocaleString()}</td>
                      <td className="p-3 text-right whitespace-nowrap">{ab.toLocaleString()}</td>
                      <td className="p-3 text-right whitespace-nowrap">{bp.toFixed(1)}%</td>
                      {visibleQuarters.map(qId => {
                        const qp = quarterlyPlans.find(p => p.plan_entry_id === pe.id && p.quarter_id === qId);
                        return (
                          <React.Fragment key={qId}>
                            <td className="p-2 text-right whitespace-nowrap bg-amber-50/60 border-l border-amber-200 text-[11px]">
                              {(qp?.target ?? 0).toLocaleString()}
                            </td>
                            <td className="p-2 text-right whitespace-nowrap bg-amber-50/60 text-[11px]">
                              {(qp?.budget ?? 0).toLocaleString()}
                            </td>
                          </React.Fragment>
                        );
                      })}
                    </tr>
                  );
                })}
                {nonContributingEntries.length === 0 && (
                  <tr>
                    <td colSpan={14 + visibleQuarters.length * 2} className="p-8 text-center text-slate-400">
                      No standalone non-contributing project activities found for this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUMMARY BREAKDOWNS — Plan Entry based (project scope) */}
      {!isRegionalRole && contributingEntries.length > 0 && (
        <div className="pt-4 border-t space-y-6">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Plan Entry Breakdowns</h3>
          <p className="text-[11px] text-slate-500 -mt-2">Aggregated from user-entered plan entries and approved quarterly data.</p>
          <div id="report-section-project">
            <AopBreakdownTable
              title="By Project (Plan Entries)"
              rows={projects
                .map(p => {
                  const es = contributingEntries.filter(e => e.project_id === p.id);
                  if (es.length === 0) return null;
                  const t = sumPlannedTarget(es, quarterlyPlans, q);
                  const a = sumActual(es, quarterlyActuals, q);
                  const b = sumPlannedBudget(es, quarterlyPlans, q);
                  const x = sumExpenditure(es, quarterlyActuals, q);
                  return { name: p.name, planned: t, plannedBudget: b, actual: a, spent: x, achievement: achievementPct(a, t), utilization: budgetUtilizationPct(x, b) };
                })
                .filter((r): r is NonNullable<typeof r> => r !== null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ===========================================================================
// KPI CARD
// ===========================================================================
const KPICard: React.FC<{
  title: string;
  val: React.ReactNode;
  sub: React.ReactNode;
  icon: any;
  statusBadge?: KpiBadge;
}> = ({ title, val, sub, icon: Icon, statusBadge }) => (
  <div className="bg-white p-4 rounded-xl border shadow-sm">
    <div className="flex justify-between mb-2 text-xs font-bold text-slate-500">
      <span>{title}</span>
      <Icon className="w-4 h-4" />
    </div>
    <div className="flex items-center gap-2 flex-wrap">
      <div className="text-2xl font-black text-slate-800">{val}</div>
      {statusBadge && (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge.color}`}>
          {statusBadge.label}
        </span>
      )}
    </div>
    <div className="text-[10px] mt-1 text-slate-500">{sub}</div>
  </div>
);

// ===========================================================================
// AOP BREAKDOWN TABLE — simple planned vs actual table for AOP plan overview
// and plan-entry project breakdowns.
// ===========================================================================
interface AopBreakdownRow {
  name: string;
  planned: number;
  plannedBudget: number;
  actual: number;
  spent: number;
  achievement: number;
  utilization: number;
}

const AopBreakdownTable: React.FC<{ title: string; rows: AopBreakdownRow[] }> = ({ title, rows }) => (
  <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
    <div className="p-3 border-b bg-slate-50 text-xs font-bold text-slate-700 uppercase tracking-wider">{title} ({rows.length})</div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3 text-right">Planned Target</th>
            <th className="p-3 text-right">Actual</th>
            <th className="p-3 text-right">Achievement %</th>
            <th className="p-3 text-right">Planned Budget (ETB)</th>
            <th className="p-3 text-right">Spent (ETB)</th>
            <th className="p-3 text-right">Utilization %</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map(row => (
            <tr key={row.name} className="hover:bg-slate-50">
              <td className="p-3 font-semibold text-slate-800 max-w-xs">{row.name}</td>
              <td className="p-3 text-right">{row.planned.toLocaleString()}</td>
              <td className="p-3 text-right font-bold text-blue-700">{row.actual.toLocaleString()}</td>
              <td className={`p-3 text-right font-black ${row.achievement >= 100 ? 'text-emerald-600' : row.achievement >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                {row.achievement.toFixed(1)}%
              </td>
              <td className="p-3 text-right">{row.plannedBudget.toLocaleString()}</td>
              <td className="p-3 text-right">{row.spent.toLocaleString()}</td>
              <td className="p-3 text-right">{row.utilization.toFixed(1)}%</td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td colSpan={7} className="p-6 text-center text-slate-400">No data for this filter yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

// ===========================================================================
// SCOPE REPORT TABLE
// ===========================================================================
interface ScopeRow {
  key: string;
  name: string;
  target: number;
  actual: number;
  achievement: number;
  budget: number;
  spent: number;
  utilization: number;
  totalBeneficiaries: number;
  actualBeneficiaries: number;
  beneficiaryPct: number;
  uoms: string[];
  quarterlyData: QuarterlyBreakdown[];
}

const ScopeReportTable: React.FC<{ title: string; rows: ScopeRow[]; visibleQuarters: QuarterId[] }> = ({ title, rows, visibleQuarters }) => (
  <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
    <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-800 uppercase tracking-wider">
      {title} ({rows.length})
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3 text-right">Target</th>
            <th className="p-3 text-right">Actual</th>
            <th className="p-3 text-right">Achievement %</th>
            <th className="p-3 text-right">Budget (ETB)</th>
            <th className="p-3 text-right">Spent (ETB)</th>
            <th className="p-3 text-right">Utilization %</th>
            <th className="p-3 text-right">Total Beneficiaries</th>
            <th className="p-3 text-right">Actual Beneficiaries</th>
            <th className="p-3 text-right">Beneficiary %</th>
            {visibleQuarters.map(qId => (
              <th key={qId} className="p-2 text-center bg-blue-50 border-l whitespace-nowrap" colSpan={2}>
                {qId} Target / Budget
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map(r => {
            const unitSuffix = r.uoms.length === 1 ? ` ${r.uoms[0]}` : '';
            return (
              <tr key={r.key} className="hover:bg-slate-50">
                <td className="p-3 font-bold text-slate-800">
                  <div>{r.name}</div>
                  {r.uoms.length > 1 && (
                    <div className="mt-1 inline-flex items-center gap-1 text-[9px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
                      ⚠ Mixed Units ({r.uoms.join(', ')})
                    </div>
                  )}
                </td>
                <td className="p-3 text-right">{r.target.toLocaleString()}{unitSuffix}</td>
                <td className="p-3 text-right font-bold">{r.actual.toLocaleString()}{unitSuffix}</td>
                <td className="p-3 text-right font-black">{r.achievement.toFixed(1)}%</td>
                <td className="p-3 text-right">{r.budget.toLocaleString()}</td>
                <td className="p-3 text-right">{r.spent.toLocaleString()}</td>
                <td className="p-3 text-right font-black">{r.utilization.toFixed(1)}%</td>
                <td className="p-3 text-right">{r.totalBeneficiaries.toLocaleString()}</td>
                <td className="p-3 text-right font-black text-blue-600">{r.actualBeneficiaries.toLocaleString()}</td>
                <td className="p-3 text-right">{r.beneficiaryPct.toFixed(1)}%</td>
                {visibleQuarters.map(qId => {
                  const qd = r.quarterlyData.find(d => d.qId === qId);
                  return (
                    <React.Fragment key={qId}>
                      <td className="p-2 text-right whitespace-nowrap bg-blue-50 border-l text-[11px]">
                        {(qd?.target ?? 0).toLocaleString()}
                      </td>
                      <td className="p-2 text-right whitespace-nowrap bg-blue-50 text-[11px]">
                        {(qd?.budget ?? 0).toLocaleString()}
                      </td>
                    </React.Fragment>
                  );
                })}
              </tr>
            );
          })}
          {rows.length === 0 && (
            <tr>
              <td colSpan={10 + visibleQuarters.length * 2} className="p-6 text-center text-slate-500">
                No data for this filter yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);