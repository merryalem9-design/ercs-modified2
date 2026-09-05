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
  CartesianGrid,
  Legend,
} from 'recharts';
import { Target, Wallet, Users, Activity, BarChart3, ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react';

const DIRECT_PRIORITIES = [
  { id: 'sp-1', code: 'SP1', name: 'Disaster Preparedness & Response', color: '#C8102E' },
  { id: 'sp-2', code: 'SP2', name: 'Disaster Risk Reduction & Resilience', color: '#0284C7' },
  { id: 'sp-3', code: 'SP3', name: 'Health & Wellbeing (WASH)', color: '#059669' },
];

export const DirectCommunityDrilldownTab: React.FC = () => {
  const {
    nationalActivities,
    strategicObjectives,
    regions,
    quarterlyPlans,
    quarterlyActuals,
    uomConfigs,
    statusThresholds,
    filters,
    getFilteredPlanEntries,
  } = useApp();

  const [selectedPriorityId, setSelectedPriorityId] = useState<string>('sp-1');
  const [sortField, setSortField] = useState<'achievement' | 'target' | 'budget' | 'spend'>('achievement');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  const q = filters.quarterId;
  const currentPriority = DIRECT_PRIORITIES.find(p => p.id === selectedPriorityId) || DIRECT_PRIORITIES[0];

  // Dynamic list of objectives under selected priority
  const objectivesForPriority = strategicObjectives.filter(
    so => so.strategic_priority_id === selectedPriorityId
  );
  const objectiveIdsSet = new Set(objectivesForPriority.map(so => so.id));

  // Active region filter
  const selectedRegionId = filters.regionId && filters.regionId.length > 0 && !filters.regionId.includes('ALL') && !filters.regionId.includes('NONE')
    ? filters.regionId[0]
    : null;

  // Contributing entries in scope
  const allContributing = getFilteredPlanEntries().filter(e => e.is_contributing !== false);
  const priorityEntries = allContributing.filter(e => {
    const na = nationalActivities.find(n => n.id === e.national_activity_id);
    return na && na.strategic_priority_id === selectedPriorityId;
  });

  // In-scope baseline National Activities for selected priority
  const priorityActivities = useMemo(() => {
    return nationalActivities.filter(na => {
      if (na.strategic_priority_id !== selectedPriorityId) return false;
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
  }, [nationalActivities, selectedPriorityId, selectedRegionId, filters.strategicObjectiveId]);

  // KPI 1: Achievement Rate & Budget Utilization Rate
  const actualVal = sumActual(priorityEntries, quarterlyActuals, q);
  const plannedTargetVal = selectedRegionId
    ? priorityActivities.reduce((s, na) => s + (na.regional_targets?.[selectedRegionId]?.target ?? 0), 0)
    : priorityActivities.reduce((s, na) => s + (na.ercs_target ?? 0), 0);
  const achievementRate = achievementPct(actualVal, plannedTargetVal);
  const achStatus = get3WayStatus(achievementRate, statusThresholds);
  const achBadge = get3WayBadge(achStatus);

  const spentVal = sumExpenditure(priorityEntries, quarterlyActuals, q);
  const plannedBudgetVal = selectedRegionId
    ? priorityActivities.reduce((s, na) => s + (na.regional_targets?.[selectedRegionId]?.budget ?? 0), 0)
    : priorityActivities.reduce((s, na) => s + (na.ercs_budget ?? 0), 0);
  const budgetUtilRate = budgetUtilizationPct(spentVal, plannedBudgetVal);

  // KPI 2: Beneficiaries Reached vs Targeted
  const beneficiariesReached = priorityEntries.reduce((sum, e) => {
    const na = nationalActivities.find(n => n.id === e.national_activity_id);
    const act = sumActual([e], quarterlyActuals, q);
    return sum + convertToBeneficiaries(act, e.uom || na?.uom || '', uomConfigs);
  }, 0);

  const beneficiariesTargeted = priorityActivities.reduce((sum, na) => {
    const t = selectedRegionId
      ? (na.regional_targets?.[selectedRegionId]?.target ?? 0)
      : (na.ercs_target ?? 0);
    return sum + convertToBeneficiaries(t, na.uom, uomConfigs);
  }, 0);

  // KPI 3: Objectives On-track / At-risk / Off-track (count)
  const objStatusCounts = { 'on-track': 0, 'at-risk': 0, 'off-track': 0 };
  const objectiveRows = objectivesForPriority.map(obj => {
    const objActivities = priorityActivities.filter(na => na.strategic_objective_id === obj.id);
    const objActIds = new Set(objActivities.map(na => na.id));
    const objEntries = priorityEntries.filter(e => objActIds.has(e.national_activity_id));

    const objAct = sumActual(objEntries, quarterlyActuals, q);
    const objTgt = selectedRegionId
      ? objActivities.reduce((s, na) => s + (na.regional_targets?.[selectedRegionId]?.target ?? 0), 0)
      : objActivities.reduce((s, na) => s + (na.ercs_target ?? 0), 0);
    const objAch = achievementPct(objAct, objTgt);

    const objSp = sumExpenditure(objEntries, quarterlyActuals, q);
    const objBud = selectedRegionId
      ? objActivities.reduce((s, na) => s + (na.regional_targets?.[selectedRegionId]?.budget ?? 0), 0)
      : objActivities.reduce((s, na) => s + (na.ercs_budget ?? 0), 0);
    const objUtil = budgetUtilizationPct(objSp, objBud);

    const st = get3WayStatus(objAch, statusThresholds);
    objStatusCounts[st] = (objStatusCounts[st] || 0) + 1;

    return {
      id: obj.id,
      code: obj.code,
      name: obj.name,
      target: objTgt,
      actual: objAct,
      achievement: objAch,
      budget: objBud,
      spend: objSp,
      utilization: objUtil,
      status: st,
    };
  });

  // Sort objective rows
  const sortedObjectiveRows = [...objectiveRows].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    return sortAsc ? valA - valB : valB - valA;
  });

  // Chart 1: Bar chart — Achievement % by objective
  const objectiveChartData = objectiveRows.map(o => ({
    code: o.code,
    name: o.name,
    'Achievement %': Number(o.achievement.toFixed(1)),
  }));

  // Chart 2: Stacked bar by branch — Target vs Actual beneficiaries per region
  const branchBeneficiariesData = regions.map(reg => {
    const regEntries = priorityEntries.filter(e => e.region_id === reg.id);
    const reached = regEntries.reduce((sum, e) => {
      const na = nationalActivities.find(n => n.id === e.national_activity_id);
      const act = sumActual([e], quarterlyActuals, q);
      return sum + convertToBeneficiaries(act, e.uom || na?.uom || '', uomConfigs);
    }, 0);

    const targeted = nationalActivities
      .filter(na => na.strategic_priority_id === selectedPriorityId)
      .reduce((sum, na) => {
        const regTgt = na.regional_targets?.[reg.id]?.target ?? 0;
        return sum + convertToBeneficiaries(regTgt, na.uom, uomConfigs);
      }, 0);

    return {
      name: reg.name,
      Targeted: Math.round(targeted),
      Reached: Math.round(reached),
    };
  });

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
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Pillar:</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {DIRECT_PRIORITIES.map(p => {
              const isSelected = selectedPriorityId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPriorityId(p.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                  <span>{p.code}</span>
                  <span className="hidden sm:inline font-normal opacity-90 truncate max-w-[180px]">
                    ({p.name})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="text-xs font-semibold text-slate-500">
          {objectivesForPriority.length} Dynamic Objectives
        </div>
      </div>

      {/* FilterBar: Branch, Objective (scoped to selected priority), Quarter */}
      <FilterBar
        customVisibleFields={['region', 'objective', 'quarter']}
        singleRegionSelect={true}
        title={`${currentPriority.code} Drill-Down Filters`}
      />

      {/* KPI Cards (4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <DashboardKPICard
          icon={Target}
          title={`${currentPriority.code} Achievement`}
          val={`${achievementRate.toFixed(1)}%`}
          sub={`${Math.round(actualVal).toLocaleString()} actual / ${Math.round(plannedTargetVal).toLocaleString()} plan`}
          badge={achBadge}
          accentBorder
        />
        <DashboardKPICard
          icon={Users}
          title="Beneficiaries Reached"
          val={formatCompactNumber(beneficiariesReached)}
          sub={`${Math.round(beneficiariesReached).toLocaleString()} reached / ${Math.round(beneficiariesTargeted).toLocaleString()} targeted`}
          badge={{
            label: beneficiariesTargeted > 0 ? `${((beneficiariesReached / beneficiariesTargeted) * 100).toFixed(0)}%` : '0%',
            color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
          }}
        />
        <DashboardKPICard
          icon={Activity}
          title="Objectives Status"
          val={`${objStatusCounts['on-track']}/${objectivesForPriority.length} On Track`}
          sub={`${objStatusCounts['at-risk']} at risk • ${objStatusCounts['off-track']} off track`}
          badge={{
            label: `${objStatusCounts['on-track']} On / ${objStatusCounts['at-risk']} Risk / ${objStatusCounts['off-track']} Off`,
            color: objStatusCounts['off-track'] > 0 ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-emerald-100 text-emerald-800 border-emerald-300',
          }}
        />
        <DashboardKPICard
          icon={Wallet}
          title="Budget vs Spend"
          val={formatETB(plannedBudgetVal)}
          sub={`Spent: ${formatETB(spentVal)} (${budgetUtilRate.toFixed(1)}% utilization)`}
          badge={{
            label: `${budgetUtilRate.toFixed(0)}% Utilized`,
            color: budgetUtilRate > 100 ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-blue-100 text-blue-800 border-blue-300',
          }}
        />
      </div>

      {/* Row 1: Achievement % by Objective + Stacked Bar by Branch */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Achievement % by Objective ({currentPriority.code})
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Performance rate per strategic objective</p>
            </div>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {objectivesForPriority.length} Objectives
            </span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={objectiveChartData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="code" tick={{ fontSize: 11, fontWeight: 700 }} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `${v}%`} />
              <Tooltip
                formatter={(val: number, _name, item: any) => [`${val}%`, `${item.payload.code}: ${item.payload.name}`]}
                contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #CBD5E1' }}
              />
              <Bar dataKey="Achievement %" fill={currentPriority.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Beneficiaries by Branch ({currentPriority.code})
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">Targeted vs reached beneficiaries across 15 regions</p>
            </div>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              15 Branches
            </span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={branchBeneficiariesData} margin={{ top: 10, right: 10, left: -10, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-35} textAnchor="end" interval={0} height={50} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={v => formatCompactNumber(v)} />
              <Tooltip
                formatter={(val: number, name: string) => [Math.round(val).toLocaleString(), name]}
                contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #CBD5E1' }}
              />
              <Legend verticalAlign="top" wrapperStyle={{ fontSize: 11, paddingBottom: 6 }} />
              <Bar dataKey="Targeted" fill={TARGET_COLOR} radius={[4, 4, 0, 0]} />
              <Bar dataKey="Reached" fill={ACTUAL_BENEFICIARY_COLOR} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Sortable Objective Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {currentPriority.code} Objectives Detailed Performance Table
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Click headers to sort by Achievement %, Target, Budget, or Spend
            </p>
          </div>
          <div className="text-xs text-slate-400 font-medium">
            {objectivesForPriority.length} rows
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
              {sortedObjectiveRows.map(row => {
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
    </div>
  );
};
