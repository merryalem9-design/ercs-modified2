// src/pages/ReportPage.tsx
import React, { useEffect } from 'react';
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
  NationalActivity,
  Region,
  Project,
  QuarterlyPlan,
  QuarterlyActual,
  UomFactorConfig,
  QuarterId,
} from '../types';
import { Target, Wallet, Users, TrendingUp, Layers } from 'lucide-react';

/** Beneficiary % = beneficiaries actually reached vs. beneficiaries planned. */
const beneficiaryPct = (actualBen: number, totalBen: number): number =>
  totalBen === 0 ? 0 : (actualBen / totalBen) * 100;

// KPI card status badges — shown only when a percentage exceeds 100%.
// Values themselves are never capped; this is purely a visual flag.
type KpiBadge = { label: string; color: string };
const OVERACHIEVED_BADGE: KpiBadge = { label: 'Overachieved', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
const OVER_BUDGET_BADGE: KpiBadge = { label: 'Over Budget', color: 'bg-rose-100 text-rose-800 border-rose-300' };

/** All fiscal quarter ids in order — used for visibleQuarters resolution. */
const ALL_QUARTER_IDS: QuarterId[] = ['Q1', 'Q2', 'Q3', 'Q4'];

/** Per-quarter Target + Budget pair stored on each aggregated row. */
interface QuarterlyBreakdown {
  qId: QuarterId;
  target: number;
  budget: number;
}

/** Compute quarterly target/budget sums across a set of plan entries. */
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

  const entries = getFilteredPlanEntries();
  const q = filters.quarterId;

  // Resolve which quarter columns to render based on the Period/Quarter filter.
  const visibleQuarters: QuarterId[] =
    q === 'SEMI' ? ['Q1', 'Q2'] :
    q === 'NINE_MONTH' ? ['Q1', 'Q2', 'Q3'] :
    (q === 'Q1' || q === 'Q2' || q === 'Q3' || q === 'Q4') ? [q as QuarterId] :
    ALL_QUARTER_IDS; // 'ALL'

  // ---------------------------------------------------------------------------
  // Item 1 — Scroll to the focused section when navigated from the Dashboard.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (activeRoute !== 'report' || !reportFocusSection) return;
    const id = `report-section-${reportFocusSection}`;
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setReportFocusSection(null);
    }, 80);
    return () => clearTimeout(timer);
  }, [reportFocusSection, activeRoute, setReportFocusSection]);

  // 'NONE' on either select means "skip the Region/Project-level detail,
  // just show me the National Activity summary" — see FilterBar's
  // allowNoneScope. It never restricts `entries` itself (AppContext treats
  // it the same as 'ALL'), so the KPI cards and the National Activity table
  // below are always the full totals for whatever else is filtered.
  const hideDetailBreakdown = filters.regionId.includes('NONE') || filters.projectId.includes('NONE');

  const uomsFor = (es: PlanEntry[]) =>
    Array.from(
      new Set(
        es
          .map(e => nationalActivities.find(na => na.id === e.national_activity_id)?.uom)
          .filter((u): u is string => !!u)
      )
    );

  const uomsInScope = uomsFor(entries);
  const singleUom = uomsInScope.length === 1 ? uomsInScope[0] : null;

  // Total Beneficiaries — planned reach (quarter-aware Target × conversion factor).
  const totalBeneficiariesFor = (es: PlanEntry[]) =>
    es.reduce((sum, e) => {
      const na = nationalActivities.find(n => n.id === e.national_activity_id);
      const t = sumPlannedTarget([e], quarterlyPlans, q);
      return sum + convertToBeneficiaries(t, na?.uom || '', uomConfigs);
    }, 0);

  // Actual Beneficiaries — beneficiaries actually reached (quarter-aware Actual × factor).
  const actualBeneficiariesFor = (es: PlanEntry[]) =>
    es.reduce((sum, e) => {
      const na = nationalActivities.find(n => n.id === e.national_activity_id);
      const a = sumActual([e], quarterlyActuals, q);
      return sum + convertToBeneficiaries(a, na?.uom || '', uomConfigs);
    }, 0);

  const target = sumPlannedTarget(entries, quarterlyPlans, q);
  const actual = sumActual(entries, quarterlyActuals, q);
  const achievement = achievementPct(actual, target);
  const budget = sumPlannedBudget(entries, quarterlyPlans, q);
  const spent = sumExpenditure(entries, quarterlyActuals, q);
  const utilization = budgetUtilizationPct(spent, budget);
  const totalBeneficiaries = totalBeneficiariesFor(entries);
  const actualBeneficiaries = actualBeneficiariesFor(entries);

  const missingQuarterlyPlanCount =
    q && q !== 'ALL'
      ? entries.filter(
          e => !quarterlyPlans.some(qp => qp.plan_entry_id === e.id && qp.quarter_id === q)
        ).length
      : 0;

  const achievementWarning =
    uomsInScope.length > 1
      ? `Mixed units in scope (${uomsInScope.join(', ')}) — this % sums raw counts across different UOMs and is not a real unit. Filter to one National Activity for a precise reading.`
      : missingQuarterlyPlanCount > 0
        ? `${missingQuarterlyPlanCount} plan ${missingQuarterlyPlanCount === 1 ? 'entry has' : 'entries have'} no ${q} Quarterly Plan — counted as 0 planned in this comparison.`
        : undefined;

  // ---------------------------------------------------------------------------
  // BREAKDOWN BY NATIONAL ACTIVITY — mirrors the Excel "Report" sheet columns.
  // Item 2: each row now carries per-quarter target/budget for the column display.
  // ---------------------------------------------------------------------------
  const byNational: NationalActivityRow[] = nationalActivities
    .map(na => {
      const es = entries.filter(e => e.national_activity_id === na.id);
      if (es.length === 0) return null;

      const t = sumPlannedTarget(es, quarterlyPlans, q);
      const a = sumActual(es, quarterlyActuals, q);
      const b = sumPlannedBudget(es, quarterlyPlans, q);
      const x = sumExpenditure(es, quarterlyActuals, q);
      const tb = totalBeneficiariesFor(es);
      const ab = actualBeneficiariesFor(es);

      return {
        key: na.id,
        code: na.code,
        name: na.description,
        uom: na.uom,
        target: t,
        actual: a,
        achievement: achievementPct(a, t),
        budget: b,
        spent: x,
        utilization: budgetUtilizationPct(x, b),
        totalBeneficiaries: tb,
        actualBeneficiaries: ab,
        beneficiaryPct: beneficiaryPct(ab, tb),
        // Item 2: pre-computed per-quarter sums
        quarterlyData: buildQuarterlyData(es, quarterlyPlans),
      };
    })
    .filter((r): r is NationalActivityRow => r !== null);

  // ---------------------------------------------------------------------------
  // BREAKDOWN BY REGION / BY PROJECT / BY STRATEGIC PRIORITY / BY STRATEGIC
  // OBJECTIVE — all built the same way via buildScopeRows.
  // Item 2: each row now carries per-quarter target/budget.
  // ---------------------------------------------------------------------------
  const buildScopeRows = (
    scopes: { id: string; name: string }[],
    matches: (e: PlanEntry, scopeId: string) => boolean
  ): ScopeRow[] =>
    scopes
      .map(scope => {
        const es = entries.filter(e => matches(e, scope.id));
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
          // Item 2: pre-computed per-quarter sums
          quarterlyData: buildQuarterlyData(es, quarterlyPlans),
        };
      })
      .filter((r): r is ScopeRow => r !== null);

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
        <h2 className="text-xl font-black text-slate-800">Step 4 — Aggregated Report</h2>
        <p className="text-xs text-slate-500 mt-1">
          Everything below is derived live from the Plan, Quarterly Plan and Quarterly Actual Entry
          pages — every figure is a bottom-up sum, there's no nationally assigned ceiling behind it.
          When a specific quarter is selected, Target/Budget compare against that quarter's Quarterly
          Plan instead of the full annual figure. Total Beneficiaries is the planned reach (Target ×
          conversion factor); Actual Beneficiaries is what's actually been reached so far. Set Region
          or Project to "None" below to hide the detailed breakdown tables and see just the National
          Activity summary.
        </p>
      </div>

      <FilterBar allowNoneScope />

      {/* KPI CARDS — Item 1: wrapped with id="report-section-top" for scroll targeting. */}
      <div id="report-section-top" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Achievement"
          val={`${achievement.toFixed(1)}%`}
          sub={`${actual.toLocaleString()} / ${target.toLocaleString()}${singleUom ? ` ${singleUom}` : ''}`}
          icon={Target}
          warning={achievementWarning}
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
          sub={`of ${totalBeneficiaries.toLocaleString()} planned · Actual × Conversion Factor`}
          icon={Users}
        />
        <KPICard
          title="Plan Entries in Scope"
          val={String(entries.length)}
          sub="Matching current filters"
          icon={TrendingUp}
        />
      </div>

      {/* BREAKDOWN BY NATIONAL ACTIVITY — Item 1: id for scroll. Item 2: visibleQuarters. */}
      <div id="report-section-national">
        <NationalActivityReportTable rows={byNational} visibleQuarters={visibleQuarters} />
      </div>

      {hideDetailBreakdown ? (
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-2.5 text-xs text-blue-800 font-semibold">
          <Layers className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            Showing the National Activity summary only. Set Region and Project back to "All" in the
            filters above to see the full Execution Plan Entries, By Strategic Priority/Objective,
            By Region and By Project breakdowns again.
          </span>
        </div>
      ) : (
        <>
          {/* EXECUTION ENTRIES TABLE */}
          <ExecutionEntriesTable
            entries={entries}
            nationalActivities={nationalActivities}
            regions={regions}
            projects={projects}
            quarterlyPlans={quarterlyPlans}
            quarterlyActuals={quarterlyActuals}
            uomConfigs={uomConfigs}
            quarterId={q}
            visibleQuarters={visibleQuarters}
          />

          <ScopeReportTable title="By Strategic Priority" rows={byStrategicPriority} visibleQuarters={visibleQuarters} />
          <ScopeReportTable title="By Strategic Objective" rows={byStrategicObjective} visibleQuarters={visibleQuarters} />
          {/* Item 1: ids for scroll-to targeting. */}
          <div id="report-section-region">
            <ScopeReportTable title="By Region" rows={byRegion} visibleQuarters={visibleQuarters} />
          </div>
          <div id="report-section-project">
            <ScopeReportTable title="By Project" rows={byProject} visibleQuarters={visibleQuarters} />
          </div>
        </>
      )}
    </div>
  );
};

// ===========================================================================
// KPI CARD — plain numbers, with an optional status badge (e.g. "Over
// Budget" / "Overachieved") shown next to the value when a percentage
// exceeds 100%. Values are never capped — the badge is purely a visual flag.
// ===========================================================================
const KPICard: React.FC<{
  title: string;
  val: React.ReactNode;
  sub: React.ReactNode;
  icon: any;
  warning?: string;
  statusBadge?: KpiBadge;
}> = ({ title, val, sub, icon: Icon, warning, statusBadge }) => (
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
    {warning && (
      <div className="mt-2 text-[9px] leading-snug text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-1 font-semibold">
        ⚠ {warning}
      </div>
    )}
  </div>
);

// ===========================================================================
// EXECUTION ENTRIES TABLE — one row per Plan Entry, full Excel "Report" column set.
// Item 2: visibleQuarters prop adds per-quarter Target/Budget columns.
// ===========================================================================
const ExecutionEntriesTable: React.FC<{
  entries: PlanEntry[];
  nationalActivities: NationalActivity[];
  regions: Region[];
  projects: Project[];
  quarterlyPlans: QuarterlyPlan[];
  quarterlyActuals: QuarterlyActual[];
  uomConfigs: UomFactorConfig[];
  quarterId: string;
  visibleQuarters: QuarterId[];
}> = ({ entries, nationalActivities, regions, projects, quarterlyPlans, quarterlyActuals, uomConfigs, quarterId, visibleQuarters }) => (
  <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
    <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-800 uppercase tracking-wider">
      Execution Plan Entries ({entries.length})
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b">
          <tr>
            <th className="p-3">Code</th>
            <th className="p-3">Activity Name</th>
            <th className="p-3">Description</th>
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
            {/* Item 2: per-quarter columns */}
            {visibleQuarters.map(qId => (
              <th key={qId} className="p-2 text-center bg-blue-50 border-l whitespace-nowrap" colSpan={2}>
                {qId} Target / Budget
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {entries.map(pe => {
            const na = nationalActivities.find(n => n.id === pe.national_activity_id);
            const scopeName =
              pe.scope_type === 'Regional'
                ? regions.find(r => r.id === pe.region_id)?.name
                : projects.find(p => p.id === pe.project_id)?.name;

            const target = sumPlannedTarget([pe], quarterlyPlans, quarterId);
            const actual = sumActual([pe], quarterlyActuals, quarterId);
            const budget = sumPlannedBudget([pe], quarterlyPlans, quarterId);
            const spent = sumExpenditure([pe], quarterlyActuals, quarterId);
            const achievement = achievementPct(actual, target);
            const utilization = budgetUtilizationPct(spent, budget);
            const totalBen = convertToBeneficiaries(target, na?.uom || '', uomConfigs);
            const actualBen = convertToBeneficiaries(actual, na?.uom || '', uomConfigs);
            const benPct = beneficiaryPct(actualBen, totalBen);

            return (
              <tr key={pe.id} className="hover:bg-slate-50">
                {/* Always the parent National Activity's own code — never a
                    Region/Project-suffixed variant, regardless of what may be
                    stored on the entry itself. */}
                <td className="p-3 font-bold text-ercs-red whitespace-nowrap">{na?.code}</td>
                <td className="p-3 min-w-40 font-bold text-slate-800">{pe.activity_name}</td>
                <td className="p-3 min-w-56 text-slate-500">{pe.activity_description}</td>
                <td className="p-3 whitespace-nowrap text-slate-500 font-semibold">{na?.uom}</td>
                <td className="p-3 whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      pe.scope_type === 'Regional' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                    }`}
                  >
                    {pe.scope_type}
                  </span>
                  <span className="ml-2 font-semibold">{scopeName || '—'}</span>
                </td>
                <td className="p-3 text-right font-bold whitespace-nowrap">{target.toLocaleString()}</td>
                <td className="p-3 text-right whitespace-nowrap">{actual.toLocaleString()}</td>
                <td className="p-3 text-right font-bold whitespace-nowrap">{achievement.toFixed(1)}%</td>
                <td className="p-3 text-right whitespace-nowrap">{budget.toLocaleString()}</td>
                <td className="p-3 text-right whitespace-nowrap">{spent.toLocaleString()}</td>
                <td className="p-3 text-right font-bold whitespace-nowrap">{utilization.toFixed(1)}%</td>
                <td className="p-3 text-right whitespace-nowrap">{totalBen.toLocaleString()}</td>
                <td className="p-3 text-right whitespace-nowrap">{actualBen.toLocaleString()}</td>
                <td className="p-3 text-right whitespace-nowrap">{benPct.toFixed(1)}%</td>
                {/* Item 2: per-quarter Target / Budget cells */}
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
          {entries.length === 0 && (
            <tr>
              <td colSpan={14 + visibleQuarters.length * 2} className="p-6 text-center text-slate-500">
                No execution entries are available for this filter.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

// ===========================================================================
// BY NATIONAL ACTIVITY TABLE
// Item 2: quarterlyData + visibleQuarters render per-quarter Target/Budget cols.
// ===========================================================================
interface NationalActivityRow {
  key: string;
  code: string;
  name: string;
  uom: string;
  target: number;
  actual: number;
  achievement: number;
  budget: number;
  spent: number;
  utilization: number;
  totalBeneficiaries: number;
  actualBeneficiaries: number;
  beneficiaryPct: number;
  quarterlyData: QuarterlyBreakdown[];
}

const NationalActivityReportTable: React.FC<{ rows: NationalActivityRow[]; visibleQuarters: QuarterId[] }> = ({ rows, visibleQuarters }) => (
  <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
    <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-800 uppercase tracking-wider">
      By National Activity ({rows.length})
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b">
          <tr>
            <th className="p-3">Code</th>
            <th className="p-3">Activity</th>
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
            {/* Item 2: per-quarter column headers */}
            {visibleQuarters.map(qId => (
              <th key={qId} className="p-2 text-center bg-blue-50 border-l whitespace-nowrap" colSpan={2}>
                {qId} Target / Budget
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {rows.map(r => (
            <tr key={r.key} className="hover:bg-slate-50">
              <td className="p-3 font-bold text-ercs-red whitespace-nowrap">{r.code}</td>
              <td className="p-3 font-bold text-slate-800 min-w-56">{r.name}</td>
              <td className="p-3 whitespace-nowrap text-slate-500 font-semibold">{r.uom}</td>
              <td className="p-3 text-right">{r.target.toLocaleString()}</td>
              <td className="p-3 text-right font-bold">{r.actual.toLocaleString()}</td>
              <td className="p-3 text-right font-black">{r.achievement.toFixed(1)}%</td>
              <td className="p-3 text-right">{r.budget.toLocaleString()}</td>
              <td className="p-3 text-right">{r.spent.toLocaleString()}</td>
              <td className="p-3 text-right font-black">{r.utilization.toFixed(1)}%</td>
              <td className="p-3 text-right">{r.totalBeneficiaries.toLocaleString()}</td>
              <td className="p-3 text-right font-black text-blue-600">{r.actualBeneficiaries.toLocaleString()}</td>
              <td className="p-3 text-right">{r.beneficiaryPct.toFixed(1)}%</td>
              {/* Item 2: per-quarter data cells */}
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
          ))}
          {rows.length === 0 && (
            <tr>
              <td colSpan={12 + visibleQuarters.length * 2} className="p-6 text-center text-slate-500">
                No data for this filter yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

// ===========================================================================
// BY REGION / BY PROJECT / BY STRATEGIC PRIORITY / BY STRATEGIC OBJECTIVE TABLE
// Item 2: quarterlyData + visibleQuarters render per-quarter Target/Budget cols.
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
            {/* Item 2: per-quarter column headers */}
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
                {/* Item 2: per-quarter data cells */}
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