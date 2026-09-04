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
  } = useApp();

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

  const target = sumPlannedTarget(entries, quarterlyPlans, q);
  const actual = sumActual(entries, quarterlyActuals, q);
  const achievement = achievementPct(actual, target);
  const budget = sumPlannedBudget(entries, quarterlyPlans, q);
  const spent = sumExpenditure(entries, quarterlyActuals, q);
  const utilization = budgetUtilizationPct(spent, budget);
  const totalBeneficiaries = totalBeneficiariesFor(entries);
  const actualBeneficiaries = actualBeneficiariesFor(entries);

  // Summary breakdown helpers
  const buildScopeRows = (
    scopes: { id: string; name: string }[],
    matches: (e: PlanEntry, scopeId: string) => boolean
  ) =>
    scopes
      .map(scope => {
        const es = contributingEntries.filter(e => matches(e, scope.id));
        if (es.length === 0) return null;

        const t = sumPlannedTarget(es, quarterlyPlans, q);
        const a = sumActual(es, quarterlyActuals, q);
        const b = sumPlannedBudget(es, quarterlyPlans, q);
        const x = sumExpenditure(es, quarterlyActuals, q);
        const tb = totalBeneficiariesFor(es);
        const ab = actualBeneficiariesFor(es);

        return {
          key: scope.id,
          name: scope.name,
          target: t,
          actual: a,
          achievement: achievementPct(a, t),
          budget: b,
          spent: x,
          utilization: budgetUtilizationPct(x, b),
          totalBeneficiaries: tb,
          actualBeneficiaries: ab,
          beneficiaryPct: beneficiaryPct(ab, tb),
          uoms: uomsFor(es),
          quarterlyData: buildQuarterlyData(es, quarterlyPlans),
        };
      })
      .filter((r): r is NonNullable<typeof r> => r !== null);

  const byRegion = buildScopeRows(regions, (e, id) => e.region_id === id);
  const byProject = buildScopeRows(projects, (e, id) => e.project_id === id);
  const byStrategicPriority = buildScopeRows(
    strategicPriorities.map(sp => ({ id: sp.id, name: `${sp.code} — ${sp.name}` })),
    (e, id) => {
      const na = nationalActivities.find(n => n.id === e.national_activity_id);
      return na?.strategic_priority_id === id;
    }
  );
  const byStrategicObjective = buildScopeRows(
    strategicObjectives.map(so => ({ id: so.id, name: `${so.code} — ${so.name}` })),
    (e, id) => {
      const na = nationalActivities.find(n => n.id === e.national_activity_id);
      return na?.strategic_objective_id === id;
    }
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Aggregated Report</h2>
        <p className="text-xs text-slate-500 mt-1">
          Consolidated performance and expenditure report across all contributing national activities and standalone project activities.
        </p>
      </div>

      <FilterBar allowNoneScope />

      {/* KPI CARDS */}
      <div id="report-section-top" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Achievement"
          val={`${achievement.toFixed(1)}%`}
          sub={`${actual.toLocaleString()} / ${target.toLocaleString()}${singleUom ? ` ${singleUom}` : ''}`}
          icon={Target}
          statusBadge={achievement > 100 ? OVERACHIEVED_BADGE : undefined}
        />
        <KPICard
          title="Budget Utilization"
          val={`${utilization.toFixed(1)}%`}
          sub={`ETB ${spent.toLocaleString()} / ${budget.toLocaleString()}`}
          icon={Wallet}
          statusBadge={utilization > 100 ? OVER_BUDGET_BADGE : undefined}
        />
        <KPICard
          title="Beneficiaries Reached"
          val={actualBeneficiaries.toLocaleString()}
          sub={`of ${totalBeneficiaries.toLocaleString()} planned`}
          icon={Users}
        />
        <KPICard
          title="Plan Entries in Scope"
          val={String(entries.length)}
          sub={`${contributingEntries.length} Contributing · ${nonContributingEntries.length} Standalone`}
          icon={TrendingUp}
        />
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
                      <td className="p-3 font-bold text-slate-800">{pe.activity_name}</td>
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
      {(activeTab === 'all' || activeTab === 'non-contributing') && (
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

      {/* SUMMARY BREAKDOWNS SECTION */}
      <div className="pt-4 border-t space-y-6">
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Summary Breakdowns</h3>
        <ScopeReportTable title="By Strategic Priority" rows={byStrategicPriority} visibleQuarters={visibleQuarters} />
        <ScopeReportTable title="By Strategic Objective" rows={byStrategicObjective} visibleQuarters={visibleQuarters} />
        <div id="report-section-region">
          <ScopeReportTable title="By Region" rows={byRegion} visibleQuarters={visibleQuarters} />
        </div>
        <div id="report-section-project">
          <ScopeReportTable title="By Project" rows={byProject} visibleQuarters={visibleQuarters} />
        </div>
      </div>
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