import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { NonProgrammaticDepartment } from '../../types';
import { FilterBar } from '../common/FilterBar';
import { DashboardKPICard } from './DashboardKPICard';
import { EthiopiaGeoHeatmap, GeoBranchData } from './EthiopiaGeoHeatmap';
import {
  sumActual,
  sumExpenditure,
  sumPlannedTarget,
  sumPlannedBudget,
  achievementPct,
  budgetUtilizationPct,
} from '../../utils/calculations';
import {
  PRIORITY_COLORS,
  PRIORITY_PALETTE,
  formatCompactNumber,
  formatETB,
  get3WayStatus,
  get3WayBadge,
} from './dashboardUtils';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
  ScatterChart,
  Scatter,
  ZAxis,
  Treemap,
  LineChart,
  Line,
} from 'recharts';
import {
  Building2,
  Wallet,
  Activity,
  Layers,
  DollarSign,
  PieChart as PieIcon,
  TrendingUp,
} from 'lucide-react';

const CustomizedTreemapContent: React.FC<any> = ({ x, y, width, height, name, size, fill }) => {
  if (width < 35 || height < 25) return null;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: fill || '#0284C7',
          stroke: '#fff',
          strokeWidth: 2,
        }}
        rx={4}
      />
      <text
        x={x + 6}
        y={y + 16}
        fill="#fff"
        fontSize={10}
        fontWeight="bold"
      >
        {String(name).slice(0, 16)}
      </text>
      <text
        x={x + 6}
        y={y + 30}
        fill="#fff"
        fontSize={9}
        opacity={0.9}
      >
        {formatETB(size || 0)}
      </text>
    </g>
  );
};

// TODO: Non-programmatic department names from original spec (Legal & Contract Admin, Humanitarian Supply Chain, SG Office, Humanitarian Academy)
// do not exist in the seeded `department` field on any NationalActivity.
// We mapped to the closest real semantic matches present in seeded data:
// - Legal & Contract Admin -> 'Internal Audit' (covers compliance, legal audit, risk)
// - Humanitarian Supply Chain -> 'Finance' (covers financial resource utilization & logistics support under SP8)
// - SG Office -> 'DSG Program' (Office of the Deputy Secretary General)
// - Humanitarian Academy -> 'Human Resource' (covers human capacity building, organizational training)
// Other administrative support departments included: 'ICT' and 'PMER'.
const NON_PROGRAMMATIC_DEPTS = [
  'Internal Audit',
  'Finance',
  'Human Resource',
  'DSG Program',
  'ICT',
  'PMER',
];

const DEPT_COLORS = ['#475569', '#0D9488', '#D97706', '#7C3AED', '#2563EB', '#DB2777'];

export const DepartmentsAndFinanceTab: React.FC = () => {
  const {
    nationalActivities,
    strategicPriorities,
    regions,
    quarterlyPlans,
    quarterlyActuals,
    statusThresholds,
    filters,
    setFilters,
    getFilteredPlanEntries,
    nonProgrammaticActivities,
  } = useApp();

  const [deptScopeMode, setDeptScopeMode] = useState<'programmatic' | 'non-programmatic'>('programmatic');

  const q = filters.quarterId;
  const contributingEntries = getFilteredPlanEntries().filter(e => e.is_contributing !== false);

  // =========================================================================
  // SECTION A: Regional / Branch Performance
  // Scope: All 15 seeded Regions across all 8 priorities
  // =========================================================================
  const branchStatusCounts = { 'on-track': 0, 'at-risk': 0, 'off-track': 0 };

  const sectionANas = useMemo(() => {
    return nationalActivities.filter(na => {
      if (filters.strategicPriorityId && filters.strategicPriorityId !== 'ALL') {
        if (na.strategic_priority_id !== filters.strategicPriorityId) return false;
      }
      if (filters.strategicObjectiveId && filters.strategicObjectiveId !== 'ALL') {
        if (na.strategic_objective_id !== filters.strategicObjectiveId) return false;
      }
      return true;
    });
  }, [nationalActivities, filters.strategicPriorityId, filters.strategicObjectiveId]);

  const branchRankedData = regions.map(reg => {
    const regEntries = contributingEntries.filter(e => e.region_id === reg.id);
    const act = sumActual(regEntries, quarterlyActuals, q);
    const tgt = sectionANas.reduce((s, na) => s + (na.regional_targets?.[reg.id]?.target ?? 0), 0);
    const ach = achievementPct(act, tgt);

    const sp = sumExpenditure(regEntries, quarterlyActuals, q);
    const bud = sectionANas.reduce((s, na) => s + (na.regional_targets?.[reg.id]?.budget ?? 0), 0);
    const util = budgetUtilizationPct(sp, bud);

    const st = get3WayStatus(ach, statusThresholds);
    branchStatusCounts[st] = (branchStatusCounts[st] || 0) + 1;

    // Per-priority achievement map for the 15x8 heat map
    const byPriority: Record<string, { achievement: number; actual: number; target: number }> = {};
    strategicPriorities.forEach(p => {
      const pActivities = nationalActivities.filter(na => na.strategic_priority_id === p.id);
      const pActIds = new Set(pActivities.map(na => na.id));
      const pRegEntries = regEntries.filter(e => pActIds.has(e.national_activity_id));
      const pAct = sumActual(pRegEntries, quarterlyActuals, q);
      const pTgt = pActivities.reduce((s, na) => s + (na.regional_targets?.[reg.id]?.target ?? 0), 0);
      byPriority[p.id] = {
        achievement: Number(achievementPct(pAct, pTgt).toFixed(1)),
        actual: pAct,
        target: pTgt,
      };
    });

    return {
      region: reg,
      name: reg.name,
      achievement: Number(ach.toFixed(1)),
      utilization: Number(util.toFixed(1)),
      actual: act,
      target: tgt,
      spend: sp,
      budget: bud,
      status: st,
      byPriority,
    };
  }).sort((a, b) => b.achievement - a.achievement || b.budget - a.budget || b.target - a.target);

  const scatterData = branchRankedData.map(b => ({
    name: b.name,
    achievement: b.achievement,
    utilization: b.utilization,
    spend: b.spend,
    budget: b.budget,
  }));


  // =========================================================================
  // SECTION B: Non-Programmatic Departments
  // =========================================================================
  const deptStatusCounts = { 'on-track': 0, 'at-risk': 0, 'off-track': 0 };

  const departmentData = NON_PROGRAMMATIC_DEPTS.map((deptName, idx) => {
    const deptActivities = nationalActivities.filter(na => na.department === deptName);
    const deptActIds = new Set(deptActivities.map(na => na.id));
    const deptEntries = contributingEntries.filter(e => deptActIds.has(e.national_activity_id));

    const dAct = sumActual(deptEntries, quarterlyActuals, q);
    const dTgt = sumPlannedTarget(deptEntries, quarterlyPlans, q);
    const dAch = achievementPct(dAct, dTgt);

    const dSpent = sumExpenditure(deptEntries, quarterlyActuals, q);
    const dBud = sumPlannedBudget(deptEntries, quarterlyPlans, q);
    const dUtil = budgetUtilizationPct(dSpent, dBud);

    const st = get3WayStatus(dAch, statusThresholds);
    deptStatusCounts[st] = (deptStatusCounts[st] || 0) + 1;

    return {
      department: deptName,
      achievement: Number(dAch.toFixed(1)),
      utilization: Number(dUtil.toFixed(1)),
      actual: dAct,
      target: dTgt,
      spend: dSpent,
      budget: dBud,
      status: st,
      color: DEPT_COLORS[idx % DEPT_COLORS.length],
    };
  });

  const totalAdminBudget = departmentData.reduce((s, d) => s + d.budget, 0);
  const deptDonutData = departmentData.map(d => ({
    name: d.department,
    value: d.budget,
    pct: totalAdminBudget > 0 ? (d.budget / totalAdminBudget) * 100 : 0,
    color: d.color,
  }));

  // Non-Programmatic Entities Computation (outside SP1-SP8 hierarchy)
  const NON_PROG_DEPTS: { name: NonProgrammaticDepartment; shortName: string; color: string }[] = [
    { name: 'Legal & Contract Administrator Department', shortName: 'Legal & Contract Admin', color: '#0D9488' },
    { name: 'Humanitarian Supply Chain Department', shortName: 'Humanitarian Supply Chain', color: '#2563EB' },
    { name: 'SG Office', shortName: 'SG Office & Academy', color: '#D97706' },
  ];

  const nonProgDeptData = NON_PROG_DEPTS.map(dept => {
    const acts = nonProgrammaticActivities.filter(a => a.department === dept.name);
    const bud = acts.reduce((s, a) => s + a.annual_budget, 0);
    return {
      department: dept.shortName,
      fullName: dept.name,
      activitiesCount: acts.length,
      budget: bud,
      color: dept.color,
    };
  });

  const totalNonProgBudget = nonProgDeptData.reduce((s, d) => s + d.budget, 0);
  const nonProgDonutData = nonProgDeptData.map(d => ({
    name: d.department,
    value: d.budget,
    pct: totalNonProgBudget > 0 ? (d.budget / totalNonProgBudget) * 100 : 0,
    color: d.color,
  }));

  // =========================================================================
  // SECTION C: Financial & Resource Overview
  // Scope: Grand Total Budget across whole organization
  // =========================================================================
  const selectedRegionIdC = filters.regionId && filters.regionId.length > 0 && !filters.regionId.includes('ALL') && !filters.regionId.includes('NONE')
    ? filters.regionId[0]
    : null;

  const hasPriorityFilterC = filters.strategicPriorityId && filters.strategicPriorityId !== 'ALL';

  const sectionCNas = useMemo(() => {
    return nationalActivities.filter(na => {
      if (hasPriorityFilterC && na.strategic_priority_id !== filters.strategicPriorityId) return false;
      if (selectedRegionIdC) {
        const hasReg = (na.regional_targets?.[selectedRegionIdC]?.target || 0) > 0 || (na.regional_targets?.[selectedRegionIdC]?.budget || 0) > 0;
        const isElig = na.eligible_region_ids?.includes(selectedRegionIdC);
        if (!hasReg && !isElig) return false;
      }
      return true;
    });
  }, [nationalActivities, hasPriorityFilterC, filters.strategicPriorityId, selectedRegionIdC]);

  const progBaselineBudget = useMemo(() => {
    if (selectedRegionIdC) {
      return sectionCNas.reduce((s, na) => s + (na.regional_targets?.[selectedRegionIdC]?.budget ?? 0), 0);
    }
    return sectionCNas.reduce((s, na) => s + (na.ercs_budget ?? 0), 0);
  }, [sectionCNas, selectedRegionIdC]);

  const grandTotalBudget = (!hasPriorityFilterC && !selectedRegionIdC)
    ? progBaselineBudget + totalNonProgBudget
    : progBaselineBudget;

  const grandTotalSpend = sumExpenditure(contributingEntries, quarterlyActuals, q);
  const grandUtilization = budgetUtilizationPct(grandTotalSpend, grandTotalBudget);

  // Program vs Admin Cost & Budget Ratio
  // Program = SP1-SP3 (Direct Community) + community/program-facing priorities (SP4-SP6)
  // Admin = Administrative departments (Internal Audit, Finance, HR, ICT, PMER) or SP7/SP8 operations
  const adminDeptSet = new Set(NON_PROGRAMMATIC_DEPTS);
  const adminActivities = nationalActivities.filter(
    na => (na.department && adminDeptSet.has(na.department)) || na.strategic_priority_id === 'sp-7'
  );
  const adminBaselineBudget = adminActivities.reduce((s, na) => s + (na.ercs_budget ?? 0), 0) + totalNonProgBudget;
  const programBaselineBudget = Math.max(0, grandTotalBudget - adminBaselineBudget);

  const adminEntries = contributingEntries.filter(e => {
    const na = nationalActivities.find(n => n.id === e.national_activity_id);
    return na && ((na.department && adminDeptSet.has(na.department)) || na.strategic_priority_id === 'sp-7');
  });
  const adminCost = sumExpenditure(adminEntries, quarterlyActuals, q);
  const programCost = Math.max(0, grandTotalSpend - adminCost);

  const isSpendZero = grandTotalSpend === 0;
  const costRatioData = [
    {
      name: 'Program Operations',
      value: isSpendZero ? programBaselineBudget : programCost,
      color: '#0284C7',
    },
    {
      name: 'Administration & Governance',
      value: isSpendZero ? adminBaselineBudget : adminCost,
      color: '#475569',
    },
  ];

  // SP8 Income Proxy:
  const sp8Activities = nationalActivities.filter(na => na.strategic_priority_id === 'sp-8');
  const sp8BaselineBudget = sp8Activities.reduce((s, na) => s + (na.ercs_budget ?? 0), 0);
  const sp8ActIds = new Set(sp8Activities.map(na => na.id));
  const sp8Entries = contributingEntries.filter(e => sp8ActIds.has(e.national_activity_id));
  const incomeTarget = sp8BaselineBudget;
  const incomeSecured = sumExpenditure(sp8Entries, quarterlyActuals, q);
  const fundingGap = Math.max(0, incomeTarget - incomeSecured);
  const incomePct = incomeTarget > 0 ? (incomeSecured / incomeTarget) * 100 : 0;

  // Treemap Data: Budget by Priority and Non-Programmatic Entities
  const treemapData = [
    ...strategicPriorities.map((sp, idx) => {
      const pActivities = nationalActivities.filter(na => na.strategic_priority_id === sp.id);
      const pBud = pActivities.reduce((s, na) => s + (na.ercs_budget ?? 0), 0);
      return {
        name: `${sp.code}: ${sp.name}`,
        size: Math.max(pBud, 1),
        fill: PRIORITY_PALETTE[idx % PRIORITY_PALETTE.length],
      };
    }),
    {
      name: 'Non-Prog: Institutional Depts',
      size: totalNonProgBudget,
      fill: '#D97706',
    },
  ];

  // Quarterly Line Chart: Income Secured vs Expenditure Trend (Q1–Q4)
  const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'] as const;
  const sp8QuarterlyTarget = sp8BaselineBudget / 4;
  const financialTrendData = QUARTERS.map(qId => {
    const incSecured = sumExpenditure(sp8Entries, quarterlyActuals, qId);
    const incTarget = sp8QuarterlyTarget;
    const orgSpend = sumExpenditure(contributingEntries, quarterlyActuals, qId);
    return {
      quarter: qId,
      'Income Secured (SP8)': incSecured,
      'Income Target (SP8)': incTarget,
      'Total Org Expenditure': orgSpend,
    };
  });

  return (
    <div className="space-y-10 pt-4">
      {/* ========================================================================= */}
      {/* SECTION A: REGIONAL / BRANCH PERFORMANCE */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-ercs-red" />
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              Section A: Regional & Branch Performance
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Scope: All 15 seeded ERCS branches across all 8 strategic priorities
          </p>
        </div>

        {/* Section A Filters: Priority, Objective, Quarter */}
        <FilterBar
          customVisibleFields={['priority', 'objective', 'quarter']}
          title="Section A Filters (Priority, Objective, Quarter)"
        />

        {/* Section A KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <DashboardKPICard
            icon={Building2}
            title="Branches Performance"
            val={`${branchRankedData.length} Branches`}
            sub={`Top: ${branchRankedData[0]?.name || 'N/A'} (${branchRankedData[0]?.achievement.toFixed(1)}%)`}
            accentBorder
          />
          <DashboardKPICard
            icon={Activity}
            title="Branches Status (3-Way)"
            val={`${branchStatusCounts['on-track']}/15 On Track`}
            sub={`${branchStatusCounts['at-risk']} at risk • ${branchStatusCounts['off-track']} off track`}
            badge={{
              label: `${branchStatusCounts['on-track']} On / ${branchStatusCounts['at-risk']} Risk / ${branchStatusCounts['off-track']} Off`,
              color: branchStatusCounts['off-track'] > 0 ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300',
            }}
          />
          <DashboardKPICard
            icon={Wallet}
            title="Regional Budget Spend"
            val={formatETB(branchRankedData.reduce((s, b) => s + b.spend, 0))}
            sub={`Budget: ${formatETB(branchRankedData.reduce((s, b) => s + b.budget, 0))}`}
          />
        </div>

        {/* Ranked Bar Chart + Scatter Plot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Ranked Bar Chart (Sorted Descending) */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Ranked Branch Achievement % (Sorted Descending)
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">Top-performing to lowest-performing branches</p>
              </div>
              <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                15 Branches
              </span>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={branchRankedData} layout="vertical" margin={{ top: 5, right: 20, left: 35, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} domain={[0, 'dataMax + 10']} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={90} />
                <Tooltip
                  formatter={(val: number) => [`${val}%`, 'Achievement Rate']}
                  contentStyle={{ borderRadius: 8, fontSize: 11, border: '1px solid #CBD5E1' }}
                />
                <Bar dataKey="achievement" fill="#C8102E" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Scatter Plot: Budget Utilization % vs Achievement % */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Efficiency Quadrant: Utilization vs Achievement
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  X-axis: Budget Utilization % • Y-axis: Achievement % (one point per branch)
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis type="number" dataKey="utilization" name="Utilization" unit="%" tick={{ fontSize: 10 }} />
                <YAxis type="number" dataKey="achievement" name="Achievement" unit="%" tick={{ fontSize: 10 }} />
                <ZAxis range={[70, 70]} />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (!payload || payload.length === 0) return null;
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-2.5 rounded-lg text-xs border border-slate-700 shadow-md">
                        <div className="font-bold text-white mb-1">{data.name}</div>
                        <div className="text-emerald-400 font-semibold">Achievement: {data.achievement}%</div>
                        <div className="text-sky-300">Budget Utilization: {data.utilization}%</div>
                        <div className="text-slate-400 text-[10px] mt-1">
                          Spend: {formatETB(data.spend)} / Budget: {formatETB(data.budget)}
                        </div>
                      </div>
                    );
                  }}
                />
                <Scatter name="Branches" data={scatterData} fill="#C8102E" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Branch Performance Tactical Map & Matrix (15 Branches × SP1–SP8) */}
        <EthiopiaGeoHeatmap
          data={branchRankedData}
          mode="achievement"
          showMatrixOption={true}
          priorities={strategicPriorities}
          title="Branch Performance Tactical Map & Matrix (15 Branches × SP1–SP8)"
          subtitle="Tactical geographic spatial heatmap and matrix showing real branch achievement % and budget utilization"
          selectedRegionId={filters.regionId}
          onRegionClick={regId =>
            setFilters(prev => ({
              ...prev,
              regionId: prev.regionId.includes(regId) ? ['ALL'] : [regId],
              zoneId: 'ALL',
            }))
          }
        />
      </section>

      {/* ========================================================================= */}
      {/* SECTION B: DEPARTMENTS & INSTITUTIONAL DIVISIONS */}
      {/* ========================================================================= */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
              <h3 className="text-base font-black text-slate-800 tracking-tight">
                Section B: {deptScopeMode === 'programmatic' ? 'Programmatic Support Departments' : 'Non-Programmatic Departments'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {deptScopeMode === 'programmatic'
                ? 'Administrative, governance, finance, and technical support divisions under AOP'
                : 'Institutional, legal, supply chain, and executive entities outside SP1–SP8 hierarchy'}
            </p>
          </div>

          {/* Programmatic vs Non-Programmatic Toggle */}
          <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-semibold self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setDeptScopeMode('programmatic')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                deptScopeMode === 'programmatic'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Programmatic Support
            </button>
            <button
              type="button"
              onClick={() => setDeptScopeMode('non-programmatic')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                deptScopeMode === 'non-programmatic'
                  ? 'bg-amber-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Non-Programmatic (3 Depts)
            </button>
          </div>
        </div>

        {deptScopeMode === 'programmatic' ? (
          <>
            {/* Section B Filters: Department, Quarter */}
            <FilterBar
              customVisibleFields={['department', 'quarter']}
              title="Section B Filters (Department, Quarter)"
            />

            {/* Section B KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <DashboardKPICard
                icon={Building2}
                title="Support Depts"
                val={`${departmentData.length} Departments`}
                sub="Internal Audit, Finance, HR, DSG Program, ICT, PMER"
                accentBorder
              />
              <DashboardKPICard
                icon={Activity}
                title="Departments Status"
                val={`${deptStatusCounts['on-track']}/${departmentData.length} On Track`}
                sub={`${deptStatusCounts['at-risk']} at risk • ${deptStatusCounts['off-track']} off track`}
                badge={{
                  label: `${deptStatusCounts['on-track']} On / ${deptStatusCounts['at-risk']} Risk / ${deptStatusCounts['off-track']} Off`,
                  color: deptStatusCounts['off-track'] > 0 ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300',
                }}
              />
              <DashboardKPICard
                icon={Wallet}
                title="Admin Budget Utilization"
                val={
                  totalAdminBudget > 0
                    ? `${((departmentData.reduce((s, d) => s + d.spend, 0) / totalAdminBudget) * 100).toFixed(1)}%`
                    : '0.0%'
                }
                sub={`${formatETB(departmentData.reduce((s, d) => s + d.spend, 0))} spent / ${formatETB(totalAdminBudget)} budget`}
              />
            </div>

            {/* Section B Charts: Bar Chart Completion + Donut Admin Budget */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Achievement Rate (%) by Department
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Milestone achievement across administrative divisions
                    </p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={departmentData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="department" tick={{ fontSize: 9, fontWeight: 600 }} angle={-25} textAnchor="end" interval={0} height={40} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} />
                    <Tooltip
                      formatter={(val: number) => [`${val}%`, 'Achievement']}
                      contentStyle={{ borderRadius: 8, fontSize: 11, border: '1px solid #CBD5E1' }}
                    />
                    <Bar dataKey="achievement" fill="#475569" radius={[4, 4, 0, 0]}>
                      {departmentData.map(d => (
                        <Cell key={d.department} fill={d.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Admin Budget Share by Department
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Budget allocation among administrative entities</p>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    Total: {formatETB(totalAdminBudget)}
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={deptDonutData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={2}
                    >
                      {deptDonutData.map(entry => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: number, name: string, item: any) => [
                        `${formatETB(val)} (${item.payload.pct.toFixed(1)}%)`,
                        name,
                      ]}
                      contentStyle={{ borderRadius: 8, fontSize: 11, border: '1px solid #CBD5E1' }}
                    />
                    <Legend wrapperStyle={{ fontSize: 10 }} formatter={(val, entry: any) => `${val} (${entry.payload.pct.toFixed(0)}%)`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Non-Programmatic KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <DashboardKPICard
                icon={Building2}
                title="Non-Programmatic Depts"
                val="3 Departments"
                sub="Legal, Supply Chain, SG Office & Academy"
                accentBorder
              />
              <DashboardKPICard
                icon={Activity}
                title="Total Activities / Lines"
                val={`${nonProgrammaticActivities.length} Activities & Lines`}
                sub="5 Legal • 6 Supply Chain • 12 SG & Academy"
                badge={{
                  label: "Seeded Entity",
                  color: "bg-amber-100 text-amber-800 border-amber-300",
                }}
              />
              <DashboardKPICard
                icon={Wallet}
                title="Total Non-Prog Budget"
                val={formatETB(totalNonProgBudget)}
                sub="1.80M Legal • 8.91M SC • 19.08M SG"
              />
            </div>

            {/* Non-Programmatic Charts: Bar Chart Budgets + Donut Budget Share */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Budget Allocation (ETB) by Department
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Annual budget distribution across non-programmatic divisions
                    </p>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={nonProgDeptData} margin={{ top: 10, right: 10, left: 0, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis dataKey="department" tick={{ fontSize: 9, fontWeight: 600 }} angle={-15} textAnchor="end" interval={0} height={40} />
                    <YAxis tick={{ fontSize: 10 }} tickFormatter={v => formatCompactNumber(v)} />
                    <Tooltip
                      formatter={(val: number) => [formatETB(val), 'Annual Budget']}
                      contentStyle={{ borderRadius: 8, fontSize: 11, border: '1px solid #CBD5E1' }}
                    />
                    <Bar dataKey="budget" fill="#D97706" radius={[4, 4, 0, 0]}>
                      {nonProgDeptData.map(d => (
                        <Cell key={d.department} fill={d.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Non-Programmatic Budget Share
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">Share of 29,783,175 ETB total allocation</p>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                    Total: {formatETB(totalNonProgBudget)}
                  </span>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={nonProgDonutData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={2}
                    >
                      {nonProgDonutData.map(entry => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: number, name: string, item: any) => [
                        `${formatETB(val)} (${item.payload.pct.toFixed(1)}%)`,
                        name,
                      ]}
                      contentStyle={{ borderRadius: 8, fontSize: 11, border: '1px solid #CBD5E1' }}
                    />
                    <Legend wrapperStyle={{ fontSize: 10 }} formatter={(val, entry: any) => `${val} (${entry.payload.pct.toFixed(0)}%)`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </section>

      {/* ========================================================================= */}
      {/* SECTION C: FINANCIAL & RESOURCE OVERVIEW */}
      {/* ========================================================================= */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <div className="border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <h3 className="text-base font-black text-slate-800 tracking-tight">
              Section C: Financial & Resource Overview
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Comprehensive corporate budget, funding mobilization, and expenditure trends
          </p>
        </div>

        {/* Section C Filters: Priority, Branch, Quarter */}
        <FilterBar
          customVisibleFields={['priority', 'region', 'quarter']}
          singleRegionSelect={true}
          title="Section C Filters (Priority, Branch, Quarter)"
        />

        {/* Section C KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <DashboardKPICard
            icon={Wallet}
            title="Grand Total Budget vs Spend"
            val={formatETB(grandTotalBudget)}
            sub={`Spent: ${formatETB(grandTotalSpend)} (${grandUtilization.toFixed(1)}% utilization)`}
            badge={{
              label: `${grandUtilization.toFixed(0)}% Spent`,
              color: grandUtilization > 100 ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300',
            }}
            accentBorder
          />
          <DashboardKPICard
            icon={PieIcon}
            title="Program vs Admin Ratio"
            val={
              grandTotalSpend > 0
                ? `${((programCost / grandTotalSpend) * 100).toFixed(0)}% Program`
                : `${grandTotalBudget > 0 ? ((programBaselineBudget / grandTotalBudget) * 100).toFixed(0) : 0}% Program Budget`
            }
            sub={
              grandTotalSpend > 0
                ? `Program: ${formatETB(programCost)} • Admin: ${formatETB(adminCost)}`
                : `Program: ${formatETB(programBaselineBudget)} • Admin: ${formatETB(adminBaselineBudget)}`
            }
            badge={{
              label:
                grandTotalSpend > 0
                  ? `${((adminCost / grandTotalSpend) * 100).toFixed(0)}% Admin`
                  : `${grandTotalBudget > 0 ? ((adminBaselineBudget / grandTotalBudget) * 100).toFixed(0) : 0}% Admin`,
              color: 'bg-slate-100 text-slate-800 border-slate-300',
            }}
          />
          <DashboardKPICard
            icon={DollarSign}
            title="Income Secured (AOP Proxy)"
            val={formatETB(incomeSecured)}
            sub={`Target: ${formatETB(incomeTarget)} • Funding Gap: ${formatETB(fundingGap)} (${incomePct.toFixed(1)}% secured)`}
            badge={{
              label: `${incomePct.toFixed(0)}% Secured`,
              color: incomePct >= 80 ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300',
            }}
          />
        </div>

        {/* Section C Charts: Donut Cost Ratio + Treemap + Quarterly Line Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Donut: Program vs Admin Cost */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {isSpendZero ? 'Program vs Administrative Budget Allocation' : 'Program vs Administrative Expenditure Split'}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {isSpendZero ? 'Direct operations vs support budget distribution' : 'Direct operations vs support overheads'}
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={costRatioData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                >
                  {costRatioData.map(entry => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number, name: string) => [
                    `${formatETB(val)} (${(isSpendZero ? grandTotalBudget : grandTotalSpend) > 0 ? ((val / (isSpendZero ? grandTotalBudget : grandTotalSpend)) * 100).toFixed(1) : 0}%)`,
                    name,
                  ]}
                  contentStyle={{ borderRadius: 8, fontSize: 11, border: '1px solid #CBD5E1' }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Treemap: Budget by Priority */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Corporate Budget Treemap (by Priority)
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">Sized by planned budget, colored by priority</p>
              </div>
              <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                Treemap Visual
              </span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <Treemap
                data={treemapData}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#FFFFFF"
                content={<CustomizedTreemapContent />}
              />
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quarterly Line Chart: Income Secured vs Expenditure Trend */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Quarterly Trend: Resource Mobilization vs Organization Expenditure
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                SP8 Income proxy targets & actuals compared against total quarterly spend
              </p>
            </div>
            <div className="text-xs text-slate-400 font-medium">Fiscal Year Trend</div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={financialTrendData} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="quarter" tick={{ fontSize: 11, fontWeight: 700 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => formatCompactNumber(v)} />
              <Tooltip
                formatter={(v: number, name: string) => [formatETB(v), name]}
                contentStyle={{ borderRadius: 8, fontSize: 11, border: '1px solid #CBD5E1' }}
              />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 6 }} />
              <Line
                type="monotone"
                dataKey="Total Org Expenditure"
                stroke="#DC2626"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Income Secured (SP8)"
                stroke="#059669"
                strokeWidth={2.5}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="Income Target (SP8)"
                stroke="#64748B"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
};
