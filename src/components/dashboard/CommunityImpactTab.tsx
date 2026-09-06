import React, { useState, useMemo } from 'react';
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
  TARGET_COLOR,
  ACTUAL_BENEFICIARY_COLOR,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  CartesianGrid,
} from 'recharts';
import { Users, PieChart as PieIcon, Target, Wallet } from 'lucide-react';
import { PlanEntry } from '../../types';

const P1_P3_IDS = ['sp-1', 'sp-2', 'sp-3'];

export const CommunityImpactTab: React.FC = () => {
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
  } = useApp();

  const [breakdownMode, setBreakdownMode] = useState<'total' | 'demographics'>('total');

  const q = filters.quarterId;

  // All contributing entries in scope
  const allContributingEntries = getFilteredPlanEntries().filter((e): e is PlanEntry & { national_activity_id: string } => e.is_contributing !== false && !!e.national_activity_id);

  // Map each NA to its priority
  const naPriorityMap = new Map(nationalActivities.map(na => [na.id, na.strategic_priority_id]));

  // Scope: P1-P3 entries only
  const p1To3Entries = allContributingEntries.filter(e => {
    const spId = naPriorityMap.get(e.national_activity_id);
    return spId && P1_P3_IDS.includes(spId);
  });

  // In-scope P1-P3 National Activities based on active region filter
  const p1To3Nas = useMemo(() => {
    return nationalActivities.filter(na => {
      if (!P1_P3_IDS.includes(na.strategic_priority_id)) return false;
      if (filters.regionId && filters.regionId.length > 0 && !filters.regionId.includes('ALL') && !filters.regionId.includes('NONE')) {
        const hasRegTarget = filters.regionId.some(
          rId => (na.regional_targets?.[rId]?.target || 0) > 0 || (na.regional_targets?.[rId]?.budget || 0) > 0
        );
        const isEligible = filters.regionId.some(rId => na.eligible_region_ids?.includes(rId));
        if (!hasRegTarget && !isEligible) return false;
      }
      return true;
    });
  }, [nationalActivities, filters.regionId]);

  const selectedRegionId = filters.regionId && filters.regionId.length > 0 && !filters.regionId.includes('ALL') && !filters.regionId.includes('NONE')
    ? filters.regionId[0]
    : null;

  // KPI 1: Total People Reached (P1+P2+P3)
  const totalBeneficiariesReachedP1to3 = p1To3Entries.reduce((sum, e) => {
    const na = nationalActivities.find(n => n.id === e.national_activity_id);
    const act = sumActual([e], quarterlyActuals, q);
    return sum + convertToBeneficiaries(act, e.uom || na?.uom || '', uomConfigs);
  }, 0);

  const totalBeneficiariesTargetedP1to3 = useMemo(() => {
    return p1To3Nas.reduce((sum, na) => {
      const t = selectedRegionId
        ? (na.regional_targets?.[selectedRegionId]?.target ?? 0)
        : (na.ercs_target ?? 0);
      return sum + convertToBeneficiaries(t, na.uom, uomConfigs);
    }, 0);
  }, [p1To3Nas, selectedRegionId, uomConfigs]);

  // KPI 2: % of Total Budget spent on direct community priorities
  const totalSpendAllEntries = sumExpenditure(allContributingEntries, quarterlyActuals, q);
  const spendP1to3 = sumExpenditure(p1To3Entries, quarterlyActuals, q);
  const communitySpendPctOfTotal =
    totalSpendAllEntries > 0 ? (spendP1to3 / totalSpendAllEntries) * 100 : 0;

  // KPI 3: Combined Achievement Rate (%)
  const actualP1to3 = sumActual(p1To3Entries, quarterlyActuals, q);
  const plannedTargetP1to3 = selectedRegionId
    ? p1To3Nas.reduce((s, na) => s + (na.regional_targets?.[selectedRegionId]?.target ?? 0), 0)
    : p1To3Nas.reduce((s, na) => s + (na.ercs_target ?? 0), 0);
  const combinedAchievement = achievementPct(actualP1to3, plannedTargetP1to3);
  const combinedStatus = get3WayStatus(combinedAchievement, statusThresholds);
  const combinedBadge = get3WayBadge(combinedStatus);

  // KPI 4: Combined Budget Utilization Rate (%)
  const plannedBudgetP1to3 = selectedRegionId
    ? p1To3Nas.reduce((s, na) => s + (na.regional_targets?.[selectedRegionId]?.budget ?? 0), 0)
    : p1To3Nas.reduce((s, na) => s + (na.ercs_budget ?? 0), 0);
  const combinedUtilization = budgetUtilizationPct(spendP1to3, plannedBudgetP1to3);

  // Chart 1: Radar chart — 3 axes (P1, P2, P3) showing achievement %
  const prioritiesP1to3 = strategicPriorities.filter(sp => P1_P3_IDS.includes(sp.id));
  const radarData = prioritiesP1to3.map(sp => {
    const spActivities = p1To3Nas.filter(na => na.strategic_priority_id === sp.id);
    const spActIds = new Set(spActivities.map(na => na.id));
    const spEntries = p1To3Entries.filter(e => spActIds.has(e.national_activity_id));
    const act = sumActual(spEntries, quarterlyActuals, q);
    const tgt = selectedRegionId
      ? spActivities.reduce((s, na) => s + (na.regional_targets?.[selectedRegionId]?.target ?? 0), 0)
      : spActivities.reduce((s, na) => s + (na.ercs_target ?? 0), 0);
    const ach = achievementPct(act, tgt);
    return {
      priority: sp.code,
      fullName: sp.name,
      achievement: Number(ach.toFixed(1)),
      fullMark: 100,
    };
  });

  // Chart 2: Grouped bar chart — Beneficiaries Reached vs Targeted by priority (P1/P2/P3)
  const beneficiaryComparisonData = prioritiesP1to3.map(sp => {
    const spActivities = p1To3Nas.filter(na => na.strategic_priority_id === sp.id);
    const spActIds = new Set(spActivities.map(na => na.id));
    const spEntries = p1To3Entries.filter(e => spActIds.has(e.national_activity_id));

    const targeted = spActivities.reduce((sum, na) => {
      const t = selectedRegionId
        ? (na.regional_targets?.[selectedRegionId]?.target ?? 0)
        : (na.ercs_target ?? 0);
      return sum + convertToBeneficiaries(t, na.uom, uomConfigs);
    }, 0);

    const reached = spEntries.reduce((sum, e) => {
      const na = nationalActivities.find(n => n.id === e.national_activity_id);
      const act = sumActual([e], quarterlyActuals, q);
      return sum + convertToBeneficiaries(act, e.uom || na?.uom || '', uomConfigs);
    }, 0);

    let targetFemale = 0;
    let targetMale = 0;
    let targetYouth = 0;
    let actualFemale = 0;
    let actualMale = 0;
    let actualYouth = 0;

    spEntries.forEach(e => {
      targetFemale += e.target_female || 0;
      targetMale += e.target_male || 0;
      targetYouth += e.target_youth || 0;

      const qActuals = quarterlyActuals.filter(a => a.plan_entry_id === e.id && (q === 'ALL' || a.quarter_id === q));
      qActuals.forEach(a => {
        actualFemale += a.actual_female || 0;
        actualMale += a.actual_male || 0;
        actualYouth += a.actual_youth || 0;
      });
    });

    return {
      priority: sp.code,
      name: sp.name,
      Target: Math.round(targeted),
      Actual: Math.round(reached),
      targetFemale,
      targetMale,
      targetYouth,
      actualFemale,
      actualMale,
      actualYouth,
    };
  });

  // Chart 3: Geo Beneficiaries by branch (15 regions)
  const branchBeneficiaryGeoData: GeoBranchData[] = regions.map(reg => {
    const regEntries = p1To3Entries.filter(e => e.region_id === reg.id);
    const reached = regEntries.reduce((sum, e) => {
      const na = nationalActivities.find(n => n.id === e.national_activity_id);
      const act = sumActual([e], quarterlyActuals, q);
      return sum + convertToBeneficiaries(act, e.uom || na?.uom || '', uomConfigs);
    }, 0);

    const targeted = p1To3Nas.reduce((sum, na) => {
      const t = na.regional_targets?.[reg.id]?.target ?? 0;
      return sum + convertToBeneficiaries(t, na.uom, uomConfigs);
    }, 0);

    const ach = targeted > 0 ? (reached / targeted) * 100 : 0;
    const sp = sumExpenditure(regEntries, quarterlyActuals, q);
    const bud = p1To3Nas.reduce((s, na) => s + (na.regional_targets?.[reg.id]?.budget ?? 0), 0);
    const st = get3WayStatus(ach, statusThresholds);

    return {
      region: reg,
      actual: reached,
      target: targeted,
      achievement: Number(ach.toFixed(1)),
      spend: sp,
      budget: bud,
      status: st,
    };
  });

  return (
    <div className="space-y-6 pt-4">
      {/* Filters: Region, Quarter, Priority (limited to P1-P3 only) */}
      <FilterBar
        customVisibleFields={['region', 'quarter', 'priority']}
        allowedPriorityIds={P1_P3_IDS}
        singleRegionSelect={true}
        title="Community Impact Filters (P1–P3)"
      />

      {/* KPI Cards (4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <DashboardKPICard
          icon={Users}
          title="Total People Reached"
          val={formatCompactNumber(totalBeneficiariesReachedP1to3)}
          sub={`${Math.round(totalBeneficiariesReachedP1to3).toLocaleString()} reached / ${Math.round(totalBeneficiariesTargetedP1to3).toLocaleString()} targeted across SP1–SP3`}
          badge={{
            label: totalBeneficiariesTargetedP1to3 > 0
              ? `${((totalBeneficiariesReachedP1to3 / totalBeneficiariesTargetedP1to3) * 100).toFixed(0)}% reached`
              : '0%',
            color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
          }}
          accentBorder
        />
        <DashboardKPICard
          icon={PieIcon}
          title="Direct Community Spend %"
          val={`${communitySpendPctOfTotal.toFixed(1)}%`}
          sub={`${formatETB(spendP1to3)} direct community / ${formatETB(totalSpendAllEntries)} org total spend`}
          badge={{
            label: `${communitySpendPctOfTotal.toFixed(0)}% of Org Spend`,
            color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          }}
        />
        <DashboardKPICard
          icon={Target}
          title="Combined Achievement"
          val={`${combinedAchievement.toFixed(1)}%`}
          sub={`${Math.round(actualP1to3).toLocaleString()} actual / ${Math.round(plannedTargetP1to3).toLocaleString()} plan target`}
          badge={combinedBadge}
        />
        <DashboardKPICard
          icon={Wallet}
          title="Combined Budget Utilization"
          val={`${combinedUtilization.toFixed(1)}%`}
          sub={`${formatETB(spendP1to3)} spent / ${formatETB(plannedBudgetP1to3)} planned budget`}
          badge={{
            label: combinedUtilization > 100 ? 'Over Budget' : `${combinedUtilization.toFixed(0)}% Utilized`,
            color: combinedUtilization > 100 ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-blue-100 text-blue-800 border-blue-300',
          }}
        />
      </div>

      {/* Row 1: Radar Chart (P1, P2, P3) + Beneficiaries Reached vs Targeted Grouped Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Community Priorities Achievement Radar
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Multi-axis achievement % across SP1 (Disaster Response), SP2 (Resilience), and SP3 (Health & WASH)
              </p>
            </div>
            <span className="text-[10px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
              3 Direct Pillars
            </span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis dataKey="priority" tick={{ fontSize: 11, fontWeight: 700, fill: '#334155' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
              <Radar
                name="Achievement %"
                dataKey="achievement"
                stroke="#0D9488"
                fill="#0D9488"
                fillOpacity={0.4}
              />
              <Tooltip
                formatter={(val: number, _name, item: any) => [`${val}%`, `${item.payload.priority} — ${item.payload.fullName}`]}
                contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #CBD5E1' }}
              />
              <Legend wrapperStyle={{ fontSize: 11 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Beneficiaries: Targeted vs Reached by Priority
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {breakdownMode === 'total'
                  ? 'Direct community members reached vs plan (Target = slate, Actual = blue)'
                  : 'Demographic reach breakdown: Female, Male, and Youth across P1–P3'}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold">
                <button
                  type="button"
                  onClick={() => setBreakdownMode('total')}
                  className={`px-2 py-0.5 rounded transition-all ${breakdownMode === 'total' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Total
                </button>
                <button
                  type="button"
                  onClick={() => setBreakdownMode('demographics')}
                  className={`px-2 py-0.5 rounded transition-all ${breakdownMode === 'demographics' ? 'bg-white text-ercs-red shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  F / M / Y
                </button>
              </div>
              <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                P1–P3
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={beneficiaryComparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="priority" tick={{ fontSize: 11, fontWeight: 700 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => formatCompactNumber(v)} />
              <Tooltip
                formatter={(val: number, name: string) => [Math.round(val).toLocaleString(), name]}
                contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #E2E8F0' }}
              />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 4 }} />
              {breakdownMode === 'total' ? (
                <>
                  <Bar dataKey="Target" fill={TARGET_COLOR} name="Targeted" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Actual" fill={ACTUAL_BENEFICIARY_COLOR} name="Reached" radius={[4, 4, 0, 0]} />
                </>
              ) : (
                <>
                  <Bar dataKey="actualFemale" fill="#EC4899" name="Female Reached" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actualMale" fill="#3B82F6" name="Male Reached" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actualYouth" fill="#8B5CF6" name="Youth Reached" radius={[4, 4, 0, 0]} />
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Ethiopia Geographic Community Beneficiaries Map */}
      <EthiopiaGeoHeatmap
        data={branchBeneficiaryGeoData}
        mode="beneficiaries"
        title="Direct Community Beneficiaries Map (SP1–SP3 Reached vs Targeted)"
        subtitle="Tactical spatial reach across all 15 Ethiopian branches for disaster response, resilience, and health/WASH"
        selectedRegionId={filters.regionId}
        onRegionClick={regId =>
          setFilters(prev => ({
            ...prev,
            regionId: prev.regionId.includes(regId) ? ['ALL'] : [regId],
            zoneId: 'ALL',
          }))
        }
      />
    </div>
  );
};
