import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { FilterBar } from '../common/FilterBar';
import { DashboardKPICard } from './DashboardKPICard';
import {
  sumActual,
  sumExpenditure,
  achievementPct,
  budgetUtilizationPct,
  convertToBeneficiaries,
} from '../../utils/calculations';
import {
  PRIORITY_COLORS,
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
} from 'recharts';
import { Target, Wallet, Users, UserCheck, Activity, BarChart3, ArrowUpDown, ChevronDown, ChevronUp, DollarSign } from 'lucide-react';
import { PlanEntry } from '../../types';

const ENABLING_PRIORITY_IDS = ['sp-4', 'sp-5', 'sp-6', 'sp-7', 'sp-8'];

export const EnablingPrioritiesTab: React.FC = () => {
  const {
    nationalActivities,
    strategicPriorities,
    strategicObjectives,
    quarterlyPlans,
    quarterlyActuals,
    uomConfigs,
    statusThresholds,
    filters,
    getFilteredPlanEntries,
  } = useApp();

  const [activeDrillPriorityId, setActiveDrillPriorityId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<'achievement' | 'target' | 'budget' | 'spend'>('achievement');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const q = filters.quarterId;
  const enablingPriorities = strategicPriorities.filter(sp => ENABLING_PRIORITY_IDS.includes(sp.id));

  // Check if priority filter from FilterBar selected a single priority P4-P8
  const selectedPriId = filters.strategicPriorityId !== 'ALL' && ENABLING_PRIORITY_IDS.includes(filters.strategicPriorityId)
    ? filters.strategicPriorityId
    : activeDrillPriorityId;

  // Active region filter (e.g. for P4 / P7 drill-downs)
  const selectedRegionId = filters.regionId && filters.regionId.length > 0 && !filters.regionId.includes('ALL') && !filters.regionId.includes('NONE')
    ? filters.regionId[0]
    : null;

  const allContributing = getFilteredPlanEntries().filter((e): e is PlanEntry & { national_activity_id: string } => e.is_contributing !== false && !!e.national_activity_id);

  // -------------------------------------------------------------
  // Mode A: Default Enabling Overview (when no single priority)
  // -------------------------------------------------------------
  const enablingSummaryRows = enablingPriorities.map(sp => {
    const spActivities = nationalActivities.filter(na => na.strategic_priority_id === sp.id);
    const spActIds = new Set(spActivities.map(na => na.id));
    const spEntries = allContributing.filter(e => spActIds.has(e.national_activity_id));

    const act = sumActual(spEntries, quarterlyActuals, q);
    const tgt = spActivities.reduce((s, na) => s + (na.ercs_target ?? 0), 0);
    const ach = achievementPct(act, tgt);

    const spSpent = sumExpenditure(spEntries, quarterlyActuals, q);
    const spBudget = spActivities.reduce((s, na) => s + (na.ercs_budget ?? 0), 0);
    const util = budgetUtilizationPct(spSpent, spBudget);

    const st = get3WayStatus(ach, statusThresholds);

    return {
      id: sp.id,
      code: sp.code,
      name: sp.name,
      achievement: Number(ach.toFixed(1)),
      utilization: Number(util.toFixed(1)),
      actual: act,
      target: tgt,
      spend: spSpent,
      budget: spBudget,
      status: st,
      color: PRIORITY_COLORS[sp.id] || '#475569',
    };
  });

  const totalEnablingBudget = enablingSummaryRows.reduce((s, r) => s + r.budget, 0);
  const enablingDonutData = enablingSummaryRows.map(r => ({
    name: r.code,
    fullName: r.name,
    value: r.budget,
    pct: totalEnablingBudget > 0 ? (r.budget / totalEnablingBudget) * 100 : 0,
    color: r.color,
  }));

  // -------------------------------------------------------------
  // Mode B: Single Priority Drill-Down Layout
  // -------------------------------------------------------------
  const drillPriority = enablingPriorities.find(sp => sp.id === selectedPriId);
  const objectivesForDrill = drillPriority
    ? strategicObjectives.filter(so => so.strategic_priority_id === drillPriority.id)
    : [];

  const drillEntries = drillPriority
    ? allContributing.filter(e => {
        const na = nationalActivities.find(n => n.id === e.national_activity_id);
        return na && na.strategic_priority_id === drillPriority.id;
      })
    : [];

  // In-scope activities for single priority drill-down
  const drillActivities = useMemo(() => {
    if (!drillPriority) return [];
    return nationalActivities.filter(na => {
      if (na.strategic_priority_id !== drillPriority.id) return false;
      if (selectedRegionId) {
        const hasRegTarget = (na.regional_targets?.[selectedRegionId]?.target || 0) > 0 || (na.regional_targets?.[selectedRegionId]?.budget || 0) > 0;
        const isEligible = na.eligible_region_ids?.includes(selectedRegionId);
        if (!hasRegTarget && !isEligible) return false;
      }
      if (filters.strategicObjectiveId && filters.strategicObjectiveId !== 'ALL') {
        if (na.strategic_objective_id !== filters.strategicObjectiveId) return false;
      }
      return true;
    });
  }, [nationalActivities, drillPriority, selectedRegionId, filters.strategicObjectiveId]);

  const drillAct = sumActual(drillEntries, quarterlyActuals, q);
  const drillTgt = selectedRegionId
    ? drillActivities.reduce((s, na) => s + (na.regional_targets?.[selectedRegionId]?.target ?? 0), 0)
    : drillActivities.reduce((s, na) => s + (na.ercs_target ?? 0), 0);
  const drillAch = achievementPct(drillAct, drillTgt);
  const drillAchStatus = get3WayStatus(drillAch, statusThresholds);
  const drillAchBadge = get3WayBadge(drillAchStatus);

  const drillSpent = sumExpenditure(drillEntries, quarterlyActuals, q);
  const drillBudget = selectedRegionId
    ? drillActivities.reduce((s, na) => s + (na.regional_targets?.[selectedRegionId]?.budget ?? 0), 0)
    : drillActivities.reduce((s, na) => s + (na.ercs_budget ?? 0), 0);
  const drillUtil = budgetUtilizationPct(drillSpent, drillBudget);

  // SP4 Distinct Volunteers (so-4-2: Recruitment & Management, so-4-3: Youth Volunteers)
  const volunteerActivities = useMemo(() => {
    return nationalActivities.filter(na => {
      if (na.strategic_objective_id !== 'so-4-2' && na.strategic_objective_id !== 'so-4-3') return false;
      if (selectedRegionId) {
        const hasRegTarget = (na.regional_targets?.[selectedRegionId]?.target || 0) > 0 || (na.regional_targets?.[selectedRegionId]?.budget || 0) > 0;
        const isEligible = na.eligible_region_ids?.includes(selectedRegionId);
        if (!hasRegTarget && !isEligible) return false;
      }
      if (filters.strategicObjectiveId && filters.strategicObjectiveId !== 'ALL') {
        if (na.strategic_objective_id !== filters.strategicObjectiveId) return false;
      }
      return true;
    });
  }, [nationalActivities, selectedRegionId, filters.strategicObjectiveId]);

  const volunteerActIds = useMemo(() => new Set(volunteerActivities.map(na => na.id)), [volunteerActivities]);
  const volunteerEntries = useMemo(() => allContributing.filter(e => volunteerActIds.has(e.national_activity_id)), [allContributing, volunteerActIds]);
  const volunteerAct = sumActual(volunteerEntries, quarterlyActuals, q);
  const volunteerTgt = selectedRegionId
    ? volunteerActivities.reduce((s, na) => s + (na.regional_targets?.[selectedRegionId]?.target ?? 0), 0)
    : volunteerActivities.reduce((s, na) => s + (na.ercs_target ?? 0), 0);
  const volunteerAch = achievementPct(volunteerAct, volunteerTgt);
  const volunteerStatus = get3WayStatus(volunteerAch, statusThresholds);
  const volunteerBadge = get3WayBadge(volunteerStatus);

  // SP4 Distinct Members (so-4-1: Membership Recruitment, Retention & Engagement)
  const memberActivities = useMemo(() => {
    return nationalActivities.filter(na => {
      if (na.strategic_objective_id !== 'so-4-1') return false;
      if (selectedRegionId) {
        const hasRegTarget = (na.regional_targets?.[selectedRegionId]?.target || 0) > 0 || (na.regional_targets?.[selectedRegionId]?.budget || 0) > 0;
        const isEligible = na.eligible_region_ids?.includes(selectedRegionId);
        if (!hasRegTarget && !isEligible) return false;
      }
      if (filters.strategicObjectiveId && filters.strategicObjectiveId !== 'ALL') {
        if (na.strategic_objective_id !== filters.strategicObjectiveId) return false;
      }
      return true;
    });
  }, [nationalActivities, selectedRegionId, filters.strategicObjectiveId]);

  const memberActIds = useMemo(() => new Set(memberActivities.map(na => na.id)), [memberActivities]);
  const memberEntries = useMemo(() => allContributing.filter(e => memberActIds.has(e.national_activity_id)), [allContributing, memberActIds]);
  const memberAct = sumActual(memberEntries, quarterlyActuals, q);
  const memberTgt = selectedRegionId
    ? memberActivities.reduce((s, na) => s + (na.regional_targets?.[selectedRegionId]?.target ?? 0), 0)
    : memberActivities.reduce((s, na) => s + (na.ercs_target ?? 0), 0);
  const memberAch = achievementPct(memberAct, memberTgt);
  const memberStatus = get3WayStatus(memberAch, statusThresholds);
  const memberBadge = get3WayBadge(memberStatus);

  // SP8 Income Proxy:
  // Derived from SP8 (Resource Development, Mobilization & Utilization) activities
  // Target = planned target/budget of SP8 resource mobilization activities
  // Actual = actual/expenditure of SP8 resource mobilization activities
  const sp8IncomeTarget = drillPriority?.id === 'sp-8' ? drillBudget : 0;
  const sp8IncomeSecured = drillPriority?.id === 'sp-8' ? drillSpent : 0;
  const sp8IncomePct = sp8IncomeTarget > 0 ? (sp8IncomeSecured / sp8IncomeTarget) * 100 : 0;

  // Objectives status and table data for drill-down
  const drillObjStatusCounts = { 'on-track': 0, 'at-risk': 0, 'off-track': 0 };
  const drillObjectiveRows = objectivesForDrill.map(obj => {
    const objActivities = drillActivities.filter(na => na.strategic_objective_id === obj.id);
    const objActIds = new Set(objActivities.map(na => na.id));
    const objEntries = drillEntries.filter(e => objActIds.has(e.national_activity_id));

    const oAct = sumActual(objEntries, quarterlyActuals, q);
    const oTgt = selectedRegionId
      ? objActivities.reduce((s, na) => s + (na.regional_targets?.[selectedRegionId]?.target ?? 0), 0)
      : objActivities.reduce((s, na) => s + (na.ercs_target ?? 0), 0);
    const oAch = achievementPct(oAct, oTgt);

    const oSp = sumExpenditure(objEntries, quarterlyActuals, q);
    const oBud = selectedRegionId
      ? objActivities.reduce((s, na) => s + (na.regional_targets?.[selectedRegionId]?.budget ?? 0), 0)
      : objActivities.reduce((s, na) => s + (na.ercs_budget ?? 0), 0);
    const oUtil = budgetUtilizationPct(oSp, oBud);

    const st = get3WayStatus(oAch, statusThresholds);
    drillObjStatusCounts[st] = (drillObjStatusCounts[st] || 0) + 1;

    return {
      id: obj.id,
      code: obj.code,
      name: obj.name,
      target: oTgt,
      actual: oAct,
      achievement: oAch,
      budget: oBud,
      spend: oSp,
      utilization: oUtil,
      status: st,
    };
  });

  const sortedDrillObjectiveRows = [...drillObjectiveRows].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortAsc ? valA - valB : valB - valA;
  });

  const drillChartData = drillObjectiveRows.map(o => ({
    code: o.code,
    name: o.name,
    'Achievement %': Number(o.achievement.toFixed(1)),
  }));

  const handleSort = (field: 'achievement' | 'target' | 'budget' | 'spend') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-6 pt-4">
      {/* Priority Selector Pills */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Priority:</span>
          <button
            onClick={() => setActiveDrillPriorityId(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              !selectedPriId ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Supporting (P4–P8)
          </button>
          {enablingPriorities.map(sp => {
            const isSelected = selectedPriId === sp.id;
            return (
              <button
                key={sp.id}
                onClick={() => setActiveDrillPriorityId(sp.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PRIORITY_COLORS[sp.id] }} />
                <span>{sp.code}</span>
              </button>
            );
          })}
        </div>
        {selectedPriId && (
          <button
            onClick={() => setActiveDrillPriorityId(null)}
            className="text-xs text-ercs-red font-semibold hover:underline cursor-pointer"
          >
            ← Back to P4–P8 Overview
          </button>
        )}
      </div>

      {/* RENDER MODE A: Overview of P4-P8 */}
      {!selectedPriId ? (
        <>
          {/* FilterBar: Quarter, Priority (P4-P8) */}
          <FilterBar
            customVisibleFields={['quarter', 'priority']}
            allowedPriorityIds={ENABLING_PRIORITY_IDS}
            title="Enabling Priorities Filters (P4–P8)"
          />

          {/* Supporting Priorities Institutional Indicators (Volunteers, Members, Budget & Spend) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            <DashboardKPICard
              icon={Users}
              title="Total Volunteers"
              val={formatCompactNumber(volunteerAct)}
              sub={`${Math.round(volunteerAct).toLocaleString()} actual / ${Math.round(volunteerTgt).toLocaleString()} plan (SP4 4.2 & 4.3)`}
              badge={{
                label: `${volunteerBadge.label} (${volunteerAch.toFixed(0)}%)`,
                color: volunteerBadge.color,
              }}
              tooltip="Total volunteers mobilized and youth volunteers engaged"
            />
            <DashboardKPICard
              icon={UserCheck}
              title="Total Members"
              val={formatCompactNumber(memberAct)}
              sub={`${Math.round(memberAct).toLocaleString()} actual / ${Math.round(memberTgt).toLocaleString()} plan (SP4 4.1)`}
              badge={{
                label: `${memberBadge.label} (${memberAch.toFixed(0)}%)`,
                color: memberBadge.color,
              }}
              tooltip="Total members recruited and registered"
            />
            <DashboardKPICard
              icon={Wallet}
              title="Supporting Priorities Budget"
              val={formatETB(totalEnablingBudget)}
              sub="P4–P8 total allocated corporate budget"
            />
            <DashboardKPICard
              icon={Activity}
              title="Supporting Priorities Spend"
              val={formatETB(enablingSummaryRows.reduce((s, r) => s + r.spend, 0))}
              sub={`${((enablingSummaryRows.reduce((s, r) => s + r.spend, 0) / (totalEnablingBudget || 1)) * 100).toFixed(1)}% corporate budget utilization`}
            />
          </div>

          {/* Compact 5-row Metric Matrix Table showing all 10 numbers */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Supporting Priorities (P4–P8) Performance Scorecard
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  10 Core Performance Indicators: Achievement Rate (%) and Budget Utilization (%) across P4 through P8
                </p>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                5 Priorities
              </span>
            </div>

            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600">
                    <th className="py-2.5 px-3 text-left w-16">Pillar</th>
                    <th className="py-2.5 px-3 text-left">Strategic Priority Name</th>
                    <th className="py-2.5 px-3 text-right">Achievement %</th>
                    <th className="py-2.5 px-3 text-right">Target vs Actual</th>
                    <th className="py-2.5 px-3 text-right">Budget Utilization %</th>
                    <th className="py-2.5 px-3 text-right">Budget vs Spent (ETB)</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3 text-center">Drill-Down</th>
                  </tr>
                </thead>
                <tbody>
                  {enablingSummaryRows.map(row => {
                    const badge = get3WayBadge(row.status);
                    return (
                      <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50/70">
                        <td className="py-2.5 px-3">
                          <span
                            className="inline-block px-2 py-0.5 rounded text-[11px] font-bold text-white"
                            style={{ backgroundColor: row.color }}
                          >
                            {row.code}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{row.name}</td>
                        <td className="py-2.5 px-3 text-right font-black text-sm">
                          <span className={row.achievement >= 80 ? 'text-emerald-700' : row.achievement >= 60 ? 'text-amber-700' : 'text-rose-700'}>
                            {row.achievement.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-500">
                          {Math.round(row.actual).toLocaleString()} / {Math.round(row.target).toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-800">
                          {row.utilization.toFixed(1)}%
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-500">
                          {formatETB(row.spend)} / {formatETB(row.budget)}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.color}`}>
                            {badge.label}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          <button
                            onClick={() => setActiveDrillPriorityId(row.id)}
                            className="text-xs text-ercs-red font-semibold hover:underline cursor-pointer"
                          >
                            Explore →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Row 1: Bar chart (P4-P8) + Donut chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Achievement % across Enabling Priorities (P4–P8)
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">Comparative achievement rate for institutional pillars</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={enablingSummaryRows} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="code" tick={{ fontSize: 11, fontWeight: 700 }} />
                  <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} />
                  <Tooltip
                    formatter={(val: number, _name, item: any) => [`${val}%`, `${item.payload.code}: ${item.payload.name}`]}
                    contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #CBD5E1' }}
                  />
                  <Bar dataKey="achievement" radius={[6, 6, 0, 0]}>
                    {enablingSummaryRows.map(r => (
                      <Cell key={r.id} fill={r.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Budget Share of Enabling Priorities (P4–P8)
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">Relative budget allocation among P4 through P8</p>
                </div>
                <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  {formatETB(totalEnablingBudget)}
                </span>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={enablingDonutData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                  >
                    {enablingDonutData.map(entry => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: number, name: string, item: any) => [
                      `${formatETB(val)} (${item.payload.pct.toFixed(1)}%)`,
                      `${name}: ${item.payload.fullName}`,
                    ]}
                    contentStyle={{ borderRadius: 8, fontSize: 11, border: '1px solid #CBD5E1' }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: 10 }}
                    formatter={(val, entry: any) => `${val} (${entry.payload.pct.toFixed(0)}%)`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      ) : (
        /* RENDER MODE B: Drill-Down for Specific Priority (P4, P5, P6, P7, or P8) */
        <>
          {/* Dynamic FilterBar scoped specifically to this priority's filter rules */}
          {/* P4: Branch, Objective, Quarter */}
          {selectedPriId === 'sp-4' && (
            <FilterBar
              customVisibleFields={['region', 'objective', 'quarter']}
              singleRegionSelect={true}
              title="P4 Filters (Branch, Objective, Quarter)"
            />
          )}

          {/* P5: Objective, Quarter only (no Branch) */}
          {selectedPriId === 'sp-5' && (
            <FilterBar
              customVisibleFields={['objective', 'quarter']}
              title="P5 Filters (Objective, Quarter)"
            />
          )}

          {/* P6: Objective, Quarter only (no Branch) */}
          {selectedPriId === 'sp-6' && (
            <FilterBar
              customVisibleFields={['objective', 'quarter']}
              title="P6 Filters (Objective, Quarter)"
            />
          )}

          {/* P7: Branch, Objective, Quarter */}
          {selectedPriId === 'sp-7' && (
            <FilterBar
              customVisibleFields={['region', 'objective', 'quarter']}
              singleRegionSelect={true}
              title="P7 Filters (Branch, Objective, Quarter)"
            />
          )}

          {/* P8: Objective, Quarter only (no Branch) */}
          {selectedPriId === 'sp-8' && (
            <FilterBar
              customVisibleFields={['objective', 'quarter']}
              title="P8 Filters (Objective, Quarter)"
            />
          )}

          {/* KPI Cards for the selected priority */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${selectedPriId === 'sp-4' ? 'lg:grid-cols-5' : 'lg:grid-cols-4'} gap-3.5`}>
            <DashboardKPICard
              icon={Target}
              title={`${drillPriority?.code} Achievement`}
              val={`${drillAch.toFixed(1)}%`}
              sub={`${Math.round(drillAct).toLocaleString()} actual / ${Math.round(drillTgt).toLocaleString()} plan`}
              badge={drillAchBadge}
              accentBorder
            />
            <DashboardKPICard
              icon={Wallet}
              title="Budget Utilization"
              val={`${drillUtil.toFixed(1)}%`}
              sub={`${formatETB(drillSpent)} spent / ${formatETB(drillBudget)} budget`}
              badge={{
                label: drillUtil > 100 ? 'Over Budget' : `${drillUtil.toFixed(0)}% Utilized`,
                color: drillUtil > 100
                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                  : drillUtil >= 60
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border-amber-300',
              }}
            />
            <DashboardKPICard
              icon={Activity}
              title="Objectives Status"
              val={`${drillObjStatusCounts['on-track']}/${objectivesForDrill.length} On Track`}
              sub={`${drillObjStatusCounts['at-risk']} at risk • ${drillObjStatusCounts['off-track']} off track`}
              badge={{
                label: `${drillObjStatusCounts['on-track']} On / ${drillObjStatusCounts['at-risk']} Risk / ${drillObjStatusCounts['off-track']} Off`,
                color: drillObjStatusCounts['off-track'] > 0
                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                  : drillObjStatusCounts['at-risk'] > 0
                  ? 'bg-amber-100 text-amber-800 border-amber-300'
                  : 'bg-emerald-100 text-emerald-800 border-emerald-300',
              }}
            />

            {/* Per-Priority Cards: Distinct Volunteers (4.2/4.3) and Members (4.1) for SP-4 */}
            {selectedPriId === 'sp-4' && (
              <>
                <DashboardKPICard
                  icon={Users}
                  title="Total Volunteers"
                  val={formatCompactNumber(volunteerAct)}
                  sub={`${Math.round(volunteerAct).toLocaleString()} actual / ${Math.round(volunteerTgt).toLocaleString()} plan`}
                  badge={{
                    label: `${volunteerBadge.label} (${volunteerAch.toFixed(0)}%)`,
                    color: volunteerBadge.color,
                  }}
                  tooltip="SP4 4.2 (Recruitment & Management) & 4.3 (Youth Volunteers)"
                />
                <DashboardKPICard
                  icon={UserCheck}
                  title="Total Members"
                  val={formatCompactNumber(memberAct)}
                  sub={`${Math.round(memberAct).toLocaleString()} actual / ${Math.round(memberTgt).toLocaleString()} plan`}
                  badge={{
                    label: `${memberBadge.label} (${memberAch.toFixed(0)}%)`,
                    color: memberBadge.color,
                  }}
                  tooltip="SP4 4.1 (Membership Recruitment, Retention & Engagement)"
                />
              </>
            )}

            {(selectedPriId === 'sp-5' || selectedPriId === 'sp-6' || selectedPriId === 'sp-7') && (
              <DashboardKPICard
                icon={BarChart3}
                title="Budget Planned vs Spent"
                val={formatETB(drillBudget)}
                sub={`Spent: ${formatETB(drillSpent)} (${drillBudget - drillSpent >= 0 ? formatETB(drillBudget - drillSpent) + ' rem.' : 'over'})`}
              />
            )}

            {selectedPriId === 'sp-8' && (
              <DashboardKPICard
                icon={DollarSign}
                title="Income Secured (AOP Proxy)"
                val={formatETB(sp8IncomeSecured)}
                sub={`Target: ${formatETB(sp8IncomeTarget)} (${sp8IncomePct.toFixed(1)}% secured) • Derived from SP8 Mobilization`}
                badge={{
                  label: `${sp8IncomePct.toFixed(0)}% Secured`,
                  color: sp8IncomePct >= 80
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    : sp8IncomePct >= 60
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-rose-100 text-rose-800 border-rose-300',
                }}
              />
            )}
          </div>

          {/* Drill-down Chart: Achievement % by Objective */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Achievement % by Objective ({drillPriority?.code}: {drillPriority?.name})
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">Objective level achievement breakdown</p>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {objectivesForDrill.length} Objectives
              </span>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={drillChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="code" tick={{ fontSize: 11, fontWeight: 700 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} />
                <Tooltip
                  formatter={(val: number, _name, item: any) => [`${val}%`, `${item.payload.code}: ${item.payload.name}`]}
                  contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #CBD5E1' }}
                />
                <Bar
                  dataKey="Achievement %"
                  fill={PRIORITY_COLORS[drillPriority?.id || ''] || '#475569'}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Objective Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {drillPriority?.code} Objectives Performance Table
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Click headers to sort by Achievement, Target, Budget, or Spend
                </p>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                {objectivesForDrill.length} Objectives
              </div>
            </div>

            <div className="overflow-x-auto scrollbar-thin">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600">
                    <th className="py-2.5 px-3 text-left w-20">Code</th>
                    <th className="py-2.5 px-3 text-left">Strategic Objective</th>
                    <th
                      onClick={() => handleSort('target')}
                      className="py-2.5 px-3 text-right cursor-pointer hover:text-slate-900 select-none"
                    >
                      <span className="inline-flex items-center gap-1">
                        Target
                        {sortField === 'target' ? (sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 opacity-30" />}
                      </span>
                    </th>
                    <th className="py-2.5 px-3 text-right">Actual</th>
                    <th
                      onClick={() => handleSort('achievement')}
                      className="py-2.5 px-3 text-right cursor-pointer hover:text-slate-900 select-none"
                    >
                      <span className="inline-flex items-center gap-1">
                        Achievement %
                        {sortField === 'achievement' ? (sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 opacity-30" />}
                      </span>
                    </th>
                    <th
                      onClick={() => handleSort('budget')}
                      className="py-2.5 px-3 text-right cursor-pointer hover:text-slate-900 select-none"
                    >
                      <span className="inline-flex items-center gap-1">
                        Budget (ETB)
                        {sortField === 'budget' ? (sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 opacity-30" />}
                      </span>
                    </th>
                    <th
                      onClick={() => handleSort('spend')}
                      className="py-2.5 px-3 text-right cursor-pointer hover:text-slate-900 select-none"
                    >
                      <span className="inline-flex items-center gap-1">
                        Spend (ETB)
                        {sortField === 'spend' ? (sortAsc ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />) : <ArrowUpDown className="w-3 h-3 opacity-30" />}
                      </span>
                    </th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedDrillObjectiveRows.map(row => {
                    const badge = get3WayBadge(row.status);
                    return (
                      <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50/70">
                        <td className="py-2.5 px-3 font-bold text-slate-800">{row.code}</td>
                        <td className="py-2.5 px-3 font-medium text-slate-700 max-w-sm truncate" title={row.name}>
                          {row.name}
                        </td>
                        <td className="py-2.5 px-3 text-right font-semibold text-slate-600">
                          {Math.round(row.target).toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-right font-bold text-slate-800">
                          {Math.round(row.actual).toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-right font-black">
                          <span className={row.achievement >= 80 ? 'text-emerald-700' : row.achievement >= 60 ? 'text-amber-700' : 'text-rose-700'}>
                            {row.achievement.toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-600">{formatETB(row.budget)}</td>
                        <td className="py-2.5 px-3 text-right font-semibold text-slate-800">{formatETB(row.spend)}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.color}`}>
                            {badge.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
