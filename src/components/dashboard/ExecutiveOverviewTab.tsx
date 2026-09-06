import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { FilterBar } from '../common/FilterBar';
import { DashboardKPICard } from './DashboardKPICard';
import { EthiopiaGeoHeatmap, GeoBranchData } from './EthiopiaGeoHeatmap';
import {
  sumActual,
  sumExpenditure,
  achievementPct,
  budgetUtilizationPct,
  convertToBeneficiaries,
} from '../../utils/calculations';
import {
  PRIORITY_COLORS,
  formatETB,
  formatCompactNumber,
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
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from 'recharts';
import { Target, Wallet, Users, BarChart3, Activity } from 'lucide-react';
import { PlanEntry } from '../../types';

export const ExecutiveOverviewTab: React.FC = () => {
  const {
    nationalActivities,
    strategicPriorities,
    regions,
    quarterlyPlans,
    quarterlyActuals,
    uomConfigs,
    statusThresholds,
    filters,
    setFilters,
    getFilteredPlanEntries,
    computeAopTotals,
    setActiveRoute,
    setReportFocusSection,
  } = useApp();

  const q = filters.quarterId;
  const entries = getFilteredPlanEntries().filter((e): e is PlanEntry & { national_activity_id: string } => e.is_contributing !== false && !!e.national_activity_id);

  // In-scope National Activities based on active priority and region filters
  const inScopeNas = useMemo(() => {
    return nationalActivities.filter(na => {
      if (filters.strategicPriorityId !== 'ALL' && na.strategic_priority_id !== filters.strategicPriorityId) {
        return false;
      }
      if (filters.strategicObjectiveId !== 'ALL' && na.strategic_objective_id !== filters.strategicObjectiveId) {
        return false;
      }
      if (filters.regionId && filters.regionId.length > 0 && !filters.regionId.includes('ALL') && !filters.regionId.includes('NONE')) {
        const hasRegTarget = filters.regionId.some(
          rId => (na.regional_targets?.[rId]?.target || 0) > 0 || (na.regional_targets?.[rId]?.budget || 0) > 0
        );
        const isEligible = filters.regionId.some(rId => na.eligible_region_ids?.includes(rId));
        if (!hasRegTarget && !isEligible) return false;
      }
      return true;
    });
  }, [nationalActivities, filters.strategicPriorityId, filters.strategicObjectiveId, filters.regionId]);

  const aopTotals = useMemo(() => computeAopTotals(inScopeNas), [computeAopTotals, inScopeNas]);

  const selectedRegionId = filters.regionId && filters.regionId.length > 0 && !filters.regionId.includes('ALL') && !filters.regionId.includes('NONE')
    ? filters.regionId[0]
    : null;

  // 1. Overall Achievement Rate: AOP baseline target as denominator
  const totalActual = sumActual(entries, quarterlyActuals, q);
  const totalPlannedTarget = selectedRegionId
    ? (aopTotals.byRegion[selectedRegionId]?.target ?? 0)
    : aopTotals.ercsTarget;
  const overallAchievement = achievementPct(totalActual, totalPlannedTarget);
  const overallStatus = get3WayStatus(overallAchievement, statusThresholds);
  const overallBadge = get3WayBadge(overallStatus);

  // 2. Overall Budget Utilization Rate: AOP baseline budget as planned denominator
  const totalSpent = sumExpenditure(entries, quarterlyActuals, q);
  const totalPlannedBudget = selectedRegionId
    ? (aopTotals.byRegion[selectedRegionId]?.budget ?? 0)
    : aopTotals.ercsBudget;
  const overallBudgetUtilization = budgetUtilizationPct(totalSpent, totalPlannedBudget);

  // 3. Total Beneficiaries Reached vs Targeted: AOP baseline converted via convertToBeneficiaries
  const totalBeneficiariesReached = entries.reduce((sum, e) => {
    const na = nationalActivities.find(n => n.id === e.national_activity_id);
    const a = sumActual([e], quarterlyActuals, q);
    return sum + convertToBeneficiaries(a, e.uom || na?.uom || '', uomConfigs);
  }, 0);

  const totalBeneficiariesTargeted = useMemo(() => {
    return inScopeNas.reduce((sum, na) => {
      const t = selectedRegionId
        ? (na.regional_targets?.[selectedRegionId]?.target ?? 0)
        : (na.ercs_target ?? 0);
      return sum + convertToBeneficiaries(t, na.uom, uomConfigs);
    }, 0);
  }, [inScopeNas, selectedRegionId, uomConfigs]);

  // 4. Priorities On-track / At-risk / Off-track (counts out of 8)
  const priorityStatusCounts = { 'on-track': 0, 'at-risk': 0, 'off-track': 0 };
  const priorityAchievements = strategicPriorities.map(sp => {
    const spActivities = inScopeNas.filter(na => na.strategic_priority_id === sp.id);
    const spActIds = new Set(spActivities.map(na => na.id));
    const spEntries = entries.filter(e => spActIds.has(e.national_activity_id));
    const act = sumActual(spEntries, quarterlyActuals, q);

    const tgt = selectedRegionId
      ? spActivities.reduce((s, na) => s + (na.regional_targets?.[selectedRegionId]?.target ?? 0), 0)
      : (aopTotals.byStrategicPriority[sp.id]?.target ?? 0);
    const bud = selectedRegionId
      ? spActivities.reduce((s, na) => s + (na.regional_targets?.[selectedRegionId]?.budget ?? 0), 0)
      : (aopTotals.byStrategicPriority[sp.id]?.budget ?? 0);

    const ach = achievementPct(act, tgt);
    const st = get3WayStatus(ach, statusThresholds);
    priorityStatusCounts[st] = (priorityStatusCounts[st] || 0) + 1;
    return {
      id: sp.id,
      code: sp.code,
      name: sp.name,
      achievement: Number(ach.toFixed(1)),
      target: tgt,
      actual: act,
      budget: bud,
      color: PRIORITY_COLORS[sp.id] || '#C8102E',
    };
  });

  // 5. Budget share by Priority (donut)
  const totalBudgetAcrossPriorities = priorityAchievements.reduce((s, p) => s + p.budget, 0);
  const budgetShareData = priorityAchievements.map(p => ({
    name: p.code,
    fullName: p.name,
    value: p.budget,
    pct: totalBudgetAcrossPriorities > 0 ? (p.budget / totalBudgetAcrossPriorities) * 100 : 0,
    color: p.color,
  }));

  // 6. Branch Geo Spatial Heatmap Data (15 seeded branches)
  const branchGeoData: GeoBranchData[] = regions.map(reg => {
    const regEntries = entries.filter(e => e.region_id === reg.id);
    const act = sumActual(regEntries, quarterlyActuals, q);
    const sp = sumExpenditure(regEntries, quarterlyActuals, q);

    // Baseline target & budget for this region from seeded regional_targets
    const tgt = inScopeNas.reduce((s, na) => s + (na.regional_targets?.[reg.id]?.target ?? 0), 0);
    const bud = inScopeNas.reduce((s, na) => s + (na.regional_targets?.[reg.id]?.budget ?? 0), 0);

    const ach = achievementPct(act, tgt);
    const util = budgetUtilizationPct(sp, bud);
    const st = get3WayStatus(ach, statusThresholds);
    return {
      region: reg,
      achievement: Number(ach.toFixed(1)),
      actual: act,
      target: tgt,
      spend: sp,
      budget: bud,
      status: st,
    };
  });

  // 7. Quarterly Trend Data (Q1–Q4)
  const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4'] as const;
  const quarterlyTrendData = QUARTERS.map(qId => {
    const act = sumActual(entries, quarterlyActuals, qId);
    const sp = sumExpenditure(entries, quarterlyActuals, qId);
    const tgt = totalPlannedTarget / 4;
    const bud = totalPlannedBudget / 4;
    return {
      quarter: qId,
      'Achievement %': Number(achievementPct(act, tgt).toFixed(1)),
      'Budget Utilization %': Number(budgetUtilizationPct(sp, bud).toFixed(1)),
    };
  });

  return (
    <div className="space-y-6 pt-4">
      {/* Tab-scoped FilterBar: Quarter, Region, Priority */}
      <FilterBar
        customVisibleFields={['quarter', 'region', 'priority']}
        singleRegionSelect={true}
        title="Executive Filters"
      />

      {/* KPI Cards (5) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <DashboardKPICard
          icon={Target}
          title="Overall Achievement"
          val={`${overallAchievement.toFixed(1)}%`}
          sub={`${Math.round(totalActual).toLocaleString()} actual / ${Math.round(totalPlannedTarget).toLocaleString()} plan`}
          badge={overallBadge}
          onClick={() => {
            setReportFocusSection('national');
            setActiveRoute('report');
          }}
          accentBorder
        />
        <DashboardKPICard
          icon={Wallet}
          title="Budget Utilization"
          val={`${overallBudgetUtilization.toFixed(1)}%`}
          sub={`${formatETB(totalSpent)} spent / ${formatETB(totalPlannedBudget)} plan`}
          badge={{
            label: overallBudgetUtilization > 100 ? 'Over Budget' : `${overallBudgetUtilization.toFixed(0)}% Utilized`,
            color: overallBudgetUtilization > 100 ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-blue-100 text-blue-800 border-blue-300',
          }}
          onClick={() => {
            setReportFocusSection('top');
            setActiveRoute('report');
          }}
        />
        <DashboardKPICard
          icon={Users}
          title="Total People Reached"
          val={formatCompactNumber(totalBeneficiariesReached)}
          sub={`${Math.round(totalBeneficiariesReached).toLocaleString()} reached / ${Math.round(totalBeneficiariesTargeted).toLocaleString()} targeted`}
          badge={{
            label: totalBeneficiariesTargeted > 0 ? `${((totalBeneficiariesReached / totalBeneficiariesTargeted) * 100).toFixed(0)}%` : '0%',
            color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
          }}
        />
        <DashboardKPICard
          icon={BarChart3}
          title="Total Budget (ETB)"
          val={formatETB(totalPlannedBudget)}
          sub={`Spent: ${formatETB(totalSpent)} (${totalPlannedBudget - totalSpent >= 0 ? formatETB(totalPlannedBudget - totalSpent) + ' rem.' : 'over'})`}
        />
        <DashboardKPICard
          icon={Activity}
          title="Priorities Status"
          val={`${priorityStatusCounts['on-track']}/8 On Track`}
          sub={`${priorityStatusCounts['at-risk']} at risk • ${priorityStatusCounts['off-track']} off track`}
          badge={{
            label: `${priorityStatusCounts['on-track']} On / ${priorityStatusCounts['at-risk']} Risk / ${priorityStatusCounts['off-track']} Off`,
            color: priorityStatusCounts['off-track'] > 0 ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300',
          }}
        />
      </div>

      {/* Row 1: Achievement % by Priority Bar + Budget Share Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Achievement % by Strategic Priority
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">SP1 through SP8 performance with distinct categorical hues</p>
            </div>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              8 Priorities
            </span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={priorityAchievements} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="code" tick={{ fontSize: 11, fontWeight: 600 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} />
              <Tooltip
                formatter={(val: number, _n, item: any) => [
                  `${val}%`,
                  `${item.payload.code}: ${item.payload.name}`,
                ]}
                contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #E2E8F0' }}
              />
              <Bar dataKey="achievement" radius={[6, 6, 0, 0]}>
                {priorityAchievements.map(entry => (
                  <Cell key={entry.id} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Budget Share by Priority (SP1–SP8)
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Planned budget distribution across 8 priorities</p>
            </div>
            <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              Total: {formatETB(totalBudgetAcrossPriorities)}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={budgetShareData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={2}
              >
                {budgetShareData.map(entry => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string, item: any) => [
                  `${formatETB(value)} (${item.payload.pct.toFixed(1)}%)`,
                  `${name}: ${item.payload.fullName}`,
                ]}
                contentStyle={{ borderRadius: 8, fontSize: 11, border: '1px solid #E2E8F0' }}
              />
              <Legend
                wrapperStyle={{ fontSize: 10, paddingTop: 6 }}
                formatter={(val, entry: any) => `${val} (${entry.payload.pct.toFixed(0)}%)`}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Ethiopia Geographic Branch Achievement Heatmap (All 15 Seeded Branches) */}
      <EthiopiaGeoHeatmap
        data={branchGeoData}
        mode="achievement"
        title="Ethiopia Branch Achievement Heatmap (All 15 Branches)"
        subtitle="Tactical geographic spatial heatmap showing real branch achievement % and operational targets"
        selectedRegionId={filters.regionId}
        onRegionClick={regId =>
          setFilters(prev => ({
            ...prev,
            regionId: prev.regionId.includes(regId) ? ['ALL'] : [regId],
            zoneId: 'ALL',
          }))
        }
      />

      {/* Row 3: Quarterly Trend Line Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Quarterly Trend — Achievement % & Budget Utilization %
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Two-line trend progression across fiscal quarters Q1–Q4</p>
          </div>
          <div className="text-xs text-slate-500 font-medium">Annual Fiscal Progression</div>
        </div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={quarterlyTrendData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis dataKey="quarter" tick={{ fontSize: 11, fontWeight: 700 }} />
            <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} />
            <Tooltip
              formatter={(v: number, name: string) => [`${v}%`, name]}
              contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #E2E8F0' }}
            />
            <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            <Line
              type="monotone"
              dataKey="Achievement %"
              stroke="#0284C7"
              strokeWidth={3}
              dot={{ r: 4, fill: '#0284C7' }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="Budget Utilization %"
              stroke="#DC2626"
              strokeWidth={2}
              strokeDasharray="4 4"
              dot={{ r: 4, fill: '#DC2626' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
