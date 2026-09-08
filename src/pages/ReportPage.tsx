// src/pages/ReportPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
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
  QuarterId,
  NationalActivity,
} from '../types';
import { Target, Wallet, Users, TrendingUp, Layers, CheckCircle2, AlertCircle, Info, ChevronDown, ChevronRight, ArrowUpRight, Maximize2, Minimize2 } from 'lucide-react';
import { NationalActivityDrillDown } from '../components/common/NationalActivityDrillDown';
import { NationalActivityInlineTables } from '../components/common/NationalActivityInlineTables';

/** Beneficiary % = beneficiaries actually reached vs. beneficiaries planned. */
const beneficiaryPct = (actualBen: number, totalBen: number): number =>
  totalBen === 0 ? 0 : (actualBen / totalBen) * 100;

type KpiBadge = { label: string; color: string };
const OVERACHIEVED_BADGE: KpiBadge = { label: 'Overachieved', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
const OVER_BUDGET_BADGE: KpiBadge = { label: 'Over Budget', color: 'bg-rose-100 text-rose-800 border-rose-300' };

const ALL_QUARTER_IDS: QuarterId[] = ['Q1', 'Q2', 'Q3', 'Q4'];

interface ColumnGroupResult {
  target: number;
  actual: number;
  achievement: number;
  budget: number;
  spent: number;
  utilization: number;
}

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
    setSelectedNationalActivityId,
    setActiveRoute,
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
  const [expandedObjectiveIds, setExpandedObjectiveIds] = useState<Set<string>>(
    () => new Set(strategicObjectives.map(so => so.id))
  );
  const [expandedActivityIds, setExpandedActivityIds] = useState<Set<string>>(new Set());

  const toggleActivity = (id: string) => {
    setExpandedActivityIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Keep all expanded on initial load when objectives are loaded
  useEffect(() => {
    if (strategicObjectives.length > 0 && expandedObjectiveIds.size === 0) {
      setExpandedObjectiveIds(new Set(strategicObjectives.map(so => so.id)));
    }
  }, [strategicObjectives]);

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

  const viewActivityDetail = (naId: string) => {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      window.sessionStorage.setItem('na_detail_origin', 'report');
    }
    setSelectedNationalActivityId(naId);
    setActiveRoute('national-detail');
  };

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

  const contributingEntries = entries.filter(e => e.is_contributing !== false && e.scope_type !== 'NonProgrammatic' && !!e.national_activity_id);
  const nonContributingEntries = entries.filter(e => e.is_contributing === false);

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
  // AOP Plan Filtering & Consistency Fix (Section 4)
  // Scopes national activities against region & project filters regardless
  // of responsibility value.
  // -------------------------------------------------------------------
  const isRegionFilterActive = filters.regionId.length > 0 && !filters.regionId.includes('ALL') && !filters.regionId.includes('NONE');
  const isProjectFilterActive = filters.projectId.length > 0 && !filters.projectId.includes('ALL') && !filters.projectId.includes('NONE');

  const filteredNas = useMemo(() => {
    return nationalActivities.filter(na => {
      if (filters.strategicPriorityId !== 'ALL' && na.strategic_priority_id !== filters.strategicPriorityId) return false;
      if (filters.strategicObjectiveId !== 'ALL' && na.strategic_objective_id !== filters.strategicObjectiveId) return false;
      if (filters.nationalActivityId !== 'ALL' && na.id !== filters.nationalActivityId) return false;
      if (filters.department && filters.department !== 'ALL' && na.department !== filters.department) return false;
      if (filters.year && filters.year !== 'ALL' && na.year && String(na.year) !== String(filters.year)) return false;
      if (filters.responsibility && filters.responsibility !== 'ALL') {
        const resp = filters.responsibility.toLowerCase();
        const naResp = (na.responsibility || '').toLowerCase();
        if (resp === 'region' && na.eligible_region_ids.length === 0) return false;
        if (resp === 'project' && na.eligible_project_ids.length === 0) return false;
        if (resp === 'hq' && (na.eligible_project_ids.length === 0 || (na.hq_target === 0 && na.hq_budget === 0 && !na.responsibility.toUpperCase().includes('HQ') && na.responsibility.toLowerCase() !== 'both'))) return false;
        if (resp === 'both' && naResp !== 'both') return false;
      }

      // NEW — must hold regardless of the Responsibility dropdown's value
      if (isRegionFilterActive) {
        const matches = filters.regionId.some(rId =>
          na.eligible_region_ids.includes(rId) ||
          (na.regional_targets?.[rId]?.target ?? 0) > 0 ||
          (na.regional_targets?.[rId]?.budget ?? 0) > 0
        );
        if (!matches) return false;
      }

      // NEW — must hold regardless of the Responsibility dropdown's value
      if (isProjectFilterActive) {
        const matches = filters.projectId.some(pId =>
          na.eligible_project_ids.includes(pId) ||
          (na.project_targets?.[pId]?.target ?? 0) > 0 ||
          (na.project_targets?.[pId]?.budget ?? 0) > 0
        );
        if (!matches) return false;
      }

      return true;
    });
  }, [
    nationalActivities,
    filters.strategicPriorityId,
    filters.strategicObjectiveId,
    filters.nationalActivityId,
    filters.department,
    filters.year,
    filters.responsibility,
    isRegionFilterActive,
    isProjectFilterActive,
    filters.regionId,
    filters.projectId,
  ]);

  const aopTotals = useMemo(() => computeAopTotals(filteredNas), [computeAopTotals, filteredNas]);

  function resolveAopTargetBudget(): { target: number; budget: number; label: string } {
    if (isRegionalRole && assignedRegion) {
      return {
        target: aopTotals.byRegion[assignedRegion.id]?.target ?? 0,
        budget: aopTotals.byRegion[assignedRegion.id]?.budget ?? 0,
        label: `AOP Regional Target (${assignedRegion.name})`,
      };
    }
    if (isProjectCoordinator && assignedProject) {
      return {
        target: aopTotals.byProject[assignedProject.id]?.target ?? 0,
        budget: aopTotals.byProject[assignedProject.id]?.budget ?? 0,
        label: `AOP Project Target (${assignedProject.name})`,
      };
    }
    if (isProjectRole) { // Program Director / Project Coordinator — HQ (oversee all projects)
      if (isProjectFilterActive) {
        const ids = filters.projectId;
        return {
          target: ids.reduce((s, id) => s + (aopTotals.byProject[id]?.target ?? 0), 0),
          budget: ids.reduce((s, id) => s + (aopTotals.byProject[id]?.budget ?? 0), 0),
          label: ids.length === 1
            ? `AOP Project Target (${projects.find(p => p.id === ids[0])?.name ?? ''})`
            : 'AOP Project Target (Selected Projects)',
        };
      }
      return { target: aopTotals.hqTarget, budget: aopTotals.hqBudget, label: 'AOP HQ Target (All Projects)' };
    }
    // National-level roles: National Activity AOP, PMER Officer, System Admin
    if (isRegionFilterActive) {
      const ids = filters.regionId;
      return {
        target: ids.reduce((s, id) => s + (aopTotals.byRegion[id]?.target ?? 0), 0),
        budget: ids.reduce((s, id) => s + (aopTotals.byRegion[id]?.budget ?? 0), 0),
        label: ids.length === 1
          ? `AOP Regional Target (${regions.find(r => r.id === ids[0])?.name ?? ''})`
          : 'AOP Regional Target (Selected Regions)',
      };
    }
    if (isProjectFilterActive) {
      const ids = filters.projectId;
      return {
        target: ids.reduce((s, id) => s + (aopTotals.byProject[id]?.target ?? 0), 0),
        budget: ids.reduce((s, id) => s + (aopTotals.byProject[id]?.budget ?? 0), 0),
        label: ids.length === 1
          ? `AOP Project Target (${projects.find(p => p.id === ids[0])?.name ?? ''})`
          : 'AOP Project Target (Selected Projects)',
      };
    }
    if (filters.responsibility === 'Region') {
      return { target: aopTotals.rbTarget, budget: aopTotals.rbBudget, label: 'AOP RB Target (All Regions)' };
    }
    if (filters.responsibility === 'Project' || filters.responsibility === 'HQ') {
      return { target: aopTotals.hqTarget, budget: aopTotals.hqBudget, label: 'AOP HQ Target (All Projects)' };
    }
    return { target: aopTotals.ercsTarget, budget: aopTotals.ercsBudget, label: 'AOP National Target' };
  }

  const resolvedAop = resolveAopTargetBudget();
  const aopTarget = resolvedAop.target;
  const aopBudget = resolvedAop.budget;
  const aopActual = sumActual(contributingEntries, quarterlyActuals, q);
  const aopSpent = sumExpenditure(contributingEntries, quarterlyActuals, q);
  const aopAchievement = achievementPct(aopActual, aopTarget);
  const aopUtilization = budgetUtilizationPct(aopSpent, aopBudget);

  // -------------------------------------------------------------------
  // Section 3.3 — The Big Consolidated Table ("AOP Plan Overview")
  // -------------------------------------------------------------------
  const respFilter = filters.responsibility || 'ALL';
  const showHqColumns = !isRegionalRole && respFilter !== 'Region' && !isRegionFilterActive;
  const showRbColumns = !isProjectRole && respFilter !== 'HQ' && respFilter !== 'Project' && !isProjectFilterActive;

  const visibleRegionsForTable = !showRbColumns
    ? []
    : (isRegionalRole && assignedRegion)
      ? [assignedRegion]
      : isRegionFilterActive
        ? regions.filter(r => filters.regionId.includes(r.id))
        : regions; // default: show every region, exactly like StrategicPlanPage

  const totalColHeader = isRegionalRole ? 'Regional Total' : isProjectRole ? 'Project Total' : 'ERCS Total';

  function computeGroupForActivities(
    activitiesInGroup: NationalActivity[],
    scopeKind: 'total' | 'hq' | 'rb' | 'region',
    regionId?: string,
  ): ColumnGroupResult {
    let target = 0, budget = 0;

    activitiesInGroup.forEach(na => {
      if (scopeKind === 'hq') {
        target += na.hq_target ?? 0;
        budget += na.hq_budget ?? 0;
      } else if (scopeKind === 'rb') {
        target += na.rb_target ?? 0;
        budget += na.rb_budget ?? 0;
      } else if (scopeKind === 'region' && regionId) {
        target += na.regional_targets?.[regionId]?.target ?? 0;
        budget += na.regional_targets?.[regionId]?.budget ?? 0;
      } else if (scopeKind === 'total') {
        if (isRegionalRole && assignedRegion) {
          target += na.regional_targets?.[assignedRegion.id]?.target ?? 0;
          budget += na.regional_targets?.[assignedRegion.id]?.budget ?? 0;
        } else if (isProjectCoordinator && assignedProject) {
          target += na.project_targets?.[assignedProject.id]?.target ?? 0;
          budget += na.project_targets?.[assignedProject.id]?.budget ?? 0;
        } else if (isProjectRole) {
          if (isProjectFilterActive) {
            filters.projectId.forEach(pId => {
              target += na.project_targets?.[pId]?.target ?? 0;
              budget += na.project_targets?.[pId]?.budget ?? 0;
            });
          } else {
            target += na.hq_target ?? 0;
            budget += na.hq_budget ?? 0;
          }
        } else if (isRegionFilterActive) {
          filters.regionId.forEach(rId => {
            target += na.regional_targets?.[rId]?.target ?? 0;
            budget += na.regional_targets?.[rId]?.budget ?? 0;
          });
        } else if (isProjectFilterActive) {
          filters.projectId.forEach(pId => {
            target += na.project_targets?.[pId]?.target ?? 0;
            budget += na.project_targets?.[pId]?.budget ?? 0;
          });
        } else if (respFilter === 'Region') {
          target += na.rb_target ?? 0;
          budget += na.rb_budget ?? 0;
        } else if (respFilter === 'Project' || respFilter === 'HQ') {
          target += na.hq_target ?? 0;
          budget += na.hq_budget ?? 0;
        } else {
          target += na.ercs_target ?? 0;
          budget += na.ercs_budget ?? 0;
        }
      }
    });

    const activityIds = new Set(activitiesInGroup.map(na => na.id));
    const relevantEntries = contributingEntries.filter(e => {
      if (!e.national_activity_id || !activityIds.has(e.national_activity_id)) return false;
      if (scopeKind === 'hq') return e.scope_type === 'Project';
      if (scopeKind === 'rb') return e.scope_type === 'Regional';
      if (scopeKind === 'region') return e.scope_type === 'Regional' && e.region_id === regionId;
      // scopeKind === 'total'
      if (isRegionalRole && assignedRegion) return e.scope_type === 'Regional' && e.region_id === assignedRegion.id;
      if (isProjectCoordinator && assignedProject) return e.scope_type === 'Project' && e.project_id === assignedProject.id;
      if (isProjectRole) {
        if (isProjectFilterActive) return e.scope_type === 'Project' && !!e.project_id && filters.projectId.includes(e.project_id);
        return e.scope_type === 'Project';
      }
      if (isRegionFilterActive) return e.scope_type === 'Regional' && !!e.region_id && filters.regionId.includes(e.region_id);
      if (isProjectFilterActive) return e.scope_type === 'Project' && !!e.project_id && filters.projectId.includes(e.project_id);
      if (respFilter === 'Region') return e.scope_type === 'Regional';
      if (respFilter === 'Project' || respFilter === 'HQ') return e.scope_type === 'Project';
      return true; // national-level roles: every contributing entry under this NA set counts
    });

    const actual = sumActual(relevantEntries, quarterlyActuals, q);
    const spent = sumExpenditure(relevantEntries, quarterlyActuals, q);
    return {
      target,
      budget,
      actual,
      spent,
      achievement: achievementPct(actual, target),
      utilization: budgetUtilizationPct(spent, budget),
    };
  }

  const bigTableData = useMemo(() => {
    const visibleObjectivesInScope = strategicObjectives.filter(so =>
      filteredNas.some(na => na.strategic_objective_id === so.id)
    );
    const visiblePrioritiesInScope = strategicPriorities.filter(sp =>
      visibleObjectivesInScope.some(so => so.strategic_priority_id === sp.id)
    );

    const priorities = visiblePrioritiesInScope.map(sp => {
      const nasForSp = filteredNas.filter(na => na.strategic_priority_id === sp.id);
      const spTotal = computeGroupForActivities(nasForSp, 'total');
      const spHq = showHqColumns ? computeGroupForActivities(nasForSp, 'hq') : null;
      const spRb = showRbColumns ? computeGroupForActivities(nasForSp, 'rb') : null;
      const spByRegion = visibleRegionsForTable.map(r => ({
        region: r,
        ...computeGroupForActivities(nasForSp, 'region', r.id),
      }));

      const objectives = visibleObjectivesInScope
        .filter(so => so.strategic_priority_id === sp.id)
        .map(so => {
          const nasForSo = filteredNas.filter(na => na.strategic_objective_id === so.id);
          const soTotal = computeGroupForActivities(nasForSo, 'total');
          const soHq = showHqColumns ? computeGroupForActivities(nasForSo, 'hq') : null;
          const soRb = showRbColumns ? computeGroupForActivities(nasForSo, 'rb') : null;
          const soByRegion = visibleRegionsForTable.map(r => ({
            region: r,
            ...computeGroupForActivities(nasForSo, 'region', r.id),
          }));
          return {
            objective: so,
            total: soTotal,
            hq: soHq,
            rb: soRb,
            byRegion: soByRegion,
            activities: nasForSo,
          };
        });

      return {
        priority: sp,
        total: spTotal,
        hq: spHq,
        rb: spRb,
        byRegion: spByRegion,
        objectives,
      };
    });

    const grandTotal = computeGroupForActivities(filteredNas, 'total');
    const grandHq = showHqColumns ? computeGroupForActivities(filteredNas, 'hq') : null;
    const grandRb = showRbColumns ? computeGroupForActivities(filteredNas, 'rb') : null;
    const grandByRegion = visibleRegionsForTable.map(r => ({
      region: r,
      ...computeGroupForActivities(filteredNas, 'region', r.id),
    }));

    return {
      priorities,
      grandTotal,
      grandHq,
      grandRb,
      grandByRegion,
    };
  }, [
    entries,
    contributingEntries,
    filteredNas,
    filters,
    quarterlyActuals,
    regions,
    strategicPriorities,
    strategicObjectives,
    showHqColumns,
    showRbColumns,
    visibleRegionsForTable,
    isRegionalRole,
    assignedRegion,
    isProjectCoordinator,
    assignedProject,
    isProjectRole,
    isRegionFilterActive,
    isProjectFilterActive,
    respFilter,
    q,
  ]);

  // -------------------------------------------------------------------
  // Section 3.4 — "By Project (AOP Plan)" Table
  // Sourced strictly from aopTotals.byProject with filteredNas
  // -------------------------------------------------------------------
  const aopByProject = useMemo(() => {
    if (isRegionalRole) return [];
    return projects
      .filter(p => {
        if (assignedProject) return p.id === assignedProject.id;
        if (isProjectFilterActive) return filters.projectId.includes(p.id);
        return true;
      })
      .map(p => {
        const planned = aopTotals.byProject[p.id]?.target ?? 0;
        const plannedBudget = aopTotals.byProject[p.id]?.budget ?? 0;
        const es = contributingEntries.filter(e => e.project_id === p.id);
        const actual = sumActual(es, quarterlyActuals, q);
        const spent = sumExpenditure(es, quarterlyActuals, q);
        return {
          id: p.id,
          name: p.name,
          currency: p.currency || 'ETB',
          planned,
          plannedBudget,
          actual,
          spent,
          achievement: achievementPct(actual, planned),
          utilization: budgetUtilizationPct(spent, plannedBudget),
        };
      })
      .filter(r => r.planned > 0 || r.actual > 0 || r.plannedBudget > 0 || r.spent > 0);
  }, [
    isRegionalRole,
    projects,
    assignedProject,
    isProjectFilterActive,
    filters.projectId,
    aopTotals,
    contributingEntries,
    quarterlyActuals,
    q,
  ]);

  // -------------------------------------------------------------------
  // Sub-column table cells renderer
  // -------------------------------------------------------------------
  const renderSubColumns = (res: ColumnGroupResult | null, isSpRow = false) => {
    if (!res) return null;
    const achColor = res.achievement >= 100 ? 'text-emerald-700' : res.achievement >= 50 ? 'text-amber-700' : 'text-rose-700';
    const utilColor = res.utilization > 100 ? 'text-rose-700' : res.utilization >= 50 ? 'text-emerald-700' : 'text-slate-700';
    const fontClass = isSpRow ? 'font-bold' : '';

    return (
      <>
        <td className={`p-2.5 text-right border-r border-slate-200 whitespace-nowrap ${fontClass}`}>
          {Math.round(res.target).toLocaleString()}
        </td>
        <td className={`p-2.5 text-right border-r border-slate-200 whitespace-nowrap ${fontClass} text-slate-900`}>
          {Math.round(res.actual).toLocaleString()}
        </td>
        <td className={`p-2.5 text-right border-r border-slate-200 whitespace-nowrap font-black ${achColor}`}>
          {res.achievement.toFixed(1)}%
        </td>
        <td className={`p-2.5 text-right border-r border-slate-200 whitespace-nowrap ${fontClass}`}>
          {Math.round(res.budget).toLocaleString()}
        </td>
        <td className={`p-2.5 text-right border-r border-slate-200 whitespace-nowrap ${fontClass} text-slate-900`}>
          {Math.round(res.spent).toLocaleString()}
        </td>
        <td className={`p-2.5 text-right border-r border-slate-200 whitespace-nowrap font-black ${utilColor}`}>
          {res.utilization.toFixed(1)}%
        </td>
      </>
    );
  };

  const renderFooterSubColumns = (res: ColumnGroupResult | null) => {
    if (!res) return null;
    const achColor = res.achievement >= 100 ? 'text-emerald-400' : res.achievement >= 50 ? 'text-amber-400' : 'text-rose-400';
    const utilColor = res.utilization > 100 ? 'text-rose-400' : res.utilization >= 50 ? 'text-emerald-400' : 'text-slate-300';

    return (
      <>
        <td className="p-2.5 text-right border-r border-slate-700 whitespace-nowrap font-bold text-slate-100">
          {Math.round(res.target).toLocaleString()}
        </td>
        <td className="p-2.5 text-right border-r border-slate-700 whitespace-nowrap font-bold text-white">
          {Math.round(res.actual).toLocaleString()}
        </td>
        <td className={`p-2.5 text-right border-r border-slate-700 whitespace-nowrap font-black ${achColor}`}>
          {res.achievement.toFixed(1)}%
        </td>
        <td className="p-2.5 text-right border-r border-slate-700 whitespace-nowrap font-bold text-slate-100">
          {Math.round(res.budget).toLocaleString()}
        </td>
        <td className="p-2.5 text-right border-r border-slate-700 whitespace-nowrap font-bold text-white">
          {Math.round(res.spent).toLocaleString()}
        </td>
        <td className={`p-2.5 text-right border-r border-slate-700 whitespace-nowrap font-black ${utilColor}`}>
          {res.utilization.toFixed(1)}%
        </td>
      </>
    );
  };

  return (
    <div className="space-y-6">
      {/* 1. Page Heading */}
      <div>
        <h2 className="text-xl font-black text-slate-800">Aggregated Report</h2>
        <p className="text-xs text-slate-500 mt-1">
          Consolidated performance and expenditure report across all contributing national activities and standalone project activities.
        </p>
      </div>

      {/* 2. FilterBar */}
      <FilterBar allowNoneScope />

      {/* 3. KPI Cards */}
      <div id="report-section-top" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title={isRegionalRole ? 'AOP Regional Achievement' : isProjectRole ? 'AOP Project Achievement' : 'AOP Achievement'}
          val={`${aopAchievement.toFixed(1)}%`}
          sub={`${Math.round(aopActual).toLocaleString()} actual / ${Math.round(aopTarget).toLocaleString()} (${resolvedAop.label})`}
          icon={Target}
          accent={aopAchievement >= 80 ? 'emerald' : aopAchievement >= 60 ? 'amber' : 'red'}
          statusBadge={aopAchievement > 100 ? OVERACHIEVED_BADGE : undefined}
        />
        <KPICard
          title={isRegionalRole ? 'Regional Budget Utilization' : isProjectRole ? 'Project Budget Utilization' : 'Budget Utilization'}
          val={`${aopUtilization.toFixed(1)}%`}
          sub={`ETB ${Math.round(aopSpent).toLocaleString()} spent / ${Math.round(aopBudget).toLocaleString()} (${resolvedAop.label.replace('Target', 'Budget')})`}
          icon={Wallet}
          accent={aopUtilization > 100 ? 'red' : aopUtilization >= 60 ? 'emerald' : 'amber'}
          statusBadge={aopUtilization > 100 ? OVER_BUDGET_BADGE : undefined}
        />
        <KPICard
          title="Beneficiaries Reached"
          val={Math.round(actualBeneficiariesFor(contributingEntries)).toLocaleString()}
          sub={`of ${Math.round(totalBeneficiariesFor(contributingEntries)).toLocaleString()} planned`}
          icon={Users}
          accent={(() => {
            const tot = totalBeneficiariesFor(contributingEntries);
            const act = actualBeneficiariesFor(contributingEntries);
            if (tot <= 0) return 'emerald';
            const r = (act / tot) * 100;
            return r >= 80 ? 'emerald' : r >= 60 ? 'amber' : 'red';
          })()}
        />
        <KPICard
          title="Plan Entries in Scope"
          val={String(entries.length)}
          sub={isRegionalRole ? `${contributingEntries.length} Regional Entries` : `${contributingEntries.length} Contributing · ${nonContributingEntries.length} Standalone`}
          icon={TrendingUp}
          accent={entries.length > 0 ? 'emerald' : 'amber'}
        />
      </div>

      {/* 4. One Consolidated Excel-Style Table: AOP Plan Overview */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              AOP Plan Overview — by Strategic Priority & Objective
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Consolidated authoritative baseline targets and budgets from ERCS 2019 AOP vs actual delivery and utilization. Click any Strategic Objective row to expand and view child activities.
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
            <span className="text-xs font-semibold text-slate-400 ml-2 hidden sm:inline">
              {bigTableData.priorities.length} Priorities · {bigTableData.priorities.reduce((s, p) => s + p.objectives.length, 0)} Objectives
            </span>
          </div>
        </div>

        {filters.zoneId && filters.zoneId !== 'ALL' && (
          <div className="flex items-center gap-2 p-2.5 px-3 rounded-lg bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900">
            <Info className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Target/Budget reflect the full Region. Actual/Spent reflect only the selected Zone.</span>
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto max-h-[750px] relative">
            <table className="w-full text-left text-xs border-collapse">
              {/* Header Row 1 */}
              <thead className="bg-slate-800 text-white sticky top-0 z-20 text-[11px] font-bold tracking-wider">
                <tr>
                  <th className="p-3 border-r border-slate-700 min-w-[130px] sticky left-0 bg-slate-800 z-30" rowSpan={2}>
                    Strategies Code
                  </th>
                  <th className="p-3 border-r border-slate-700 min-w-[300px] sticky left-[130px] bg-slate-800 z-30" rowSpan={2}>
                    Intervention Logic
                  </th>
                  <th className="p-2 border-r border-slate-700 text-center bg-slate-900" colSpan={6}>
                    {totalColHeader}
                  </th>
                  {showHqColumns && (
                    <th className="p-2 border-r border-slate-700 text-center bg-slate-900" colSpan={6}>
                      HQ
                    </th>
                  )}
                  {showRbColumns && (
                    <th className="p-2 border-r border-slate-700 text-center bg-slate-900" colSpan={6}>
                      Summary RB
                    </th>
                  )}
                  {visibleRegionsForTable.map(reg => (
                    <th key={reg.id} className="p-2 border-r border-slate-700 text-center bg-slate-900" colSpan={6}>
                      {reg.name}
                    </th>
                  ))}
                </tr>

                {/* Sub-header Row 2 */}
                <tr className="border-t border-slate-700 text-[10px] text-slate-300">
                  {/* Total subheaders */}
                  <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Target</th>
                  <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Actual</th>
                  <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Achv %</th>
                  <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Budget</th>
                  <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Spent</th>
                  <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Util %</th>

                  {/* HQ subheaders */}
                  {showHqColumns && (
                    <>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Target</th>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Actual</th>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Achv %</th>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Budget</th>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Spent</th>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Util %</th>
                    </>
                  )}

                  {/* RB subheaders */}
                  {showRbColumns && (
                    <>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Target</th>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Actual</th>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Achv %</th>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Budget</th>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Spent</th>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Util %</th>
                    </>
                  )}

                  {/* Per-Region subheaders */}
                  {visibleRegionsForTable.map(reg => (
                    <React.Fragment key={reg.id}>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Target</th>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Actual</th>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Achv %</th>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Budget</th>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Spent</th>
                      <th className="p-2 text-right border-r border-slate-700 bg-slate-800">Util %</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-200">
                {bigTableData.priorities.map(item => (
                  <React.Fragment key={item.priority.id}>
                    {/* Level 1: Strategic Priority Row */}
                    <tr className="bg-slate-100/90 font-bold text-slate-900 border-t-2 border-slate-300">
                      <td className="p-2.5 border-r border-slate-300 sticky left-0 bg-slate-100 z-10 whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold text-white bg-slate-800">
                          {item.priority.code}
                        </span>
                      </td>
                      <td className="p-2.5 border-r border-slate-300 sticky left-[130px] bg-slate-100 z-10">
                        <div className="font-bold text-slate-900">{item.priority.name}</div>
                      </td>
                      {renderSubColumns(item.total, true)}
                      {showHqColumns && renderSubColumns(item.hq, true)}
                      {showRbColumns && renderSubColumns(item.rb, true)}
                      {item.byRegion.map(regRes => (
                        <React.Fragment key={regRes.region.id}>
                          {renderSubColumns(regRes, true)}
                        </React.Fragment>
                      ))}
                    </tr>

                    {/* Level 2: Strategic Objective Rows (nested under parent SP) */}
                    {item.objectives.map(objRow => {
                      const isExpanded = expandedObjectiveIds.has(objRow.objective.id);
                      return (
                        <React.Fragment key={objRow.objective.id}>
                          <tr
                            onClick={() => toggleObjective(objRow.objective.id)}
                            className={`cursor-pointer transition-colors font-bold text-xs ${
                              isExpanded
                                ? 'bg-amber-50/80 hover:bg-amber-100/70 border-y-2 border-amber-300'
                                : 'bg-slate-100 hover:bg-slate-200/80 border-b border-slate-300'
                            }`}
                          >
                            <td className="p-3 border-r border-slate-300 sticky left-0 bg-inherit z-10 whitespace-nowrap pl-4">
                              <div className="flex items-center gap-1.5 text-slate-900 font-extrabold">
                                {isExpanded ? (
                                  <ChevronDown className="w-4 h-4 text-ercs-red shrink-0" />
                                ) : (
                                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                                )}
                                <span>Objective {objRow.objective.code}</span>
                              </div>
                            </td>
                            <td className="p-3 border-r border-slate-300 sticky left-[130px] bg-inherit z-10 pl-6">
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-bold text-slate-900 text-xs">{objRow.objective.name}</span>
                                <span className="text-[10px] font-normal px-2 py-0.5 bg-white border border-slate-300 rounded text-slate-600 shrink-0">
                                  {objRow.activities.length} activities
                                </span>
                              </div>
                            </td>
                            {renderSubColumns(objRow.total)}
                            {showHqColumns && renderSubColumns(objRow.hq)}
                            {showRbColumns && renderSubColumns(objRow.rb)}
                            {objRow.byRegion.map(regRes => (
                              <React.Fragment key={regRes.region.id}>
                                {renderSubColumns(regRes)}
                              </React.Fragment>
                            ))}
                          </tr>

                          {/* Level 3: Child Activities (Rendered when expanded) */}
                          {isExpanded &&
                            objRow.activities.map((na: NationalActivity, idx: number) => {
                              const naTotal = computeGroupForActivities([na], 'total');
                              const naHq = showHqColumns ? computeGroupForActivities([na], 'hq') : null;
                              const naRb = showRbColumns ? computeGroupForActivities([na], 'rb') : null;
                              const isActivityExpanded = expandedActivityIds.has(na.id);

                              return (
                                <React.Fragment key={na.id}>
                                  <tr
                                    onClick={() => toggleActivity(na.id)}
                                    className={`text-xs hover:bg-sky-50 transition-colors group cursor-pointer ${
                                      isActivityExpanded ? 'bg-amber-50/40 font-medium' : (idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60')
                                    }`}
                                  >
                                    <td
                                      className={`p-2.5 pl-8 sticky left-0 z-10 border-r border-slate-200 font-mono font-bold text-slate-700 group-hover:bg-sky-50 ${
                                        isActivityExpanded ? 'bg-amber-50/40' : (idx % 2 === 0 ? 'bg-white' : 'bg-slate-50')
                                      }`}
                                      title="Click to toggle contributing projects and regions breakdown"
                                    >
                                      <button
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleActivity(na.id);
                                        }}
                                        className="inline-flex items-center gap-1.5 text-ercs-red hover:text-red-700 cursor-pointer font-bold text-left"
                                        title="Click to toggle contributing projects and regions breakdown"
                                      >
                                        {isActivityExpanded ? (
                                          <ChevronDown className="w-3.5 h-3.5 text-ercs-red shrink-0" />
                                        ) : (
                                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-ercs-red shrink-0" />
                                        )}
                                        <span>Activity {na.code}</span>
                                      </button>
                                    </td>
                                    <td
                                      className={`p-2.5 sticky left-[130px] z-10 border-r border-slate-200 text-slate-800 font-medium group-hover:bg-sky-50 ${
                                        isActivityExpanded ? 'bg-amber-50/40' : (idx % 2 === 0 ? 'bg-white' : 'bg-slate-50')
                                      }`}
                                      title="Click to toggle contributing projects and regions breakdown"
                                    >
                                      <div className="flex items-center justify-between gap-2">
                                        <span className="group-hover:text-ercs-red">{na.description}</span>
                                        <span className="text-[10px] text-slate-400 font-normal shrink-0">
                                          {na.uom} · {na.responsibility || 'Both'}
                                        </span>
                                      </div>
                                    </td>
                                    {renderSubColumns(naTotal)}
                                    {showHqColumns && naHq && renderSubColumns(naHq)}
                                    {showRbColumns && naRb && renderSubColumns(naRb)}
                                    {visibleRegionsForTable.map(reg => (
                                      <React.Fragment key={reg.id}>
                                        {renderSubColumns(computeGroupForActivities([na], 'region', reg.id))}
                                      </React.Fragment>
                                    ))}
                                  </tr>
                                  {isActivityExpanded && (
                                    <tr className="bg-slate-100/70 border-b-2 border-slate-300">
                                      <td
                                        colSpan={2 + 6 + (showHqColumns ? 6 : 0) + (showRbColumns ? 6 : 0) + (visibleRegionsForTable.length * 6)}
                                        className="p-3 pl-10 sticky left-0 max-w-[calc(100vw-3rem)] bg-slate-50/95 z-10 border-b-2 border-slate-300"
                                      >
                                        <div className="max-w-6xl w-full">
                                          <NationalActivityInlineTables
                                            nationalActivityId={na.id}
                                            quarterId={q}
                                            mode="report"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                  )}
                                </React.Fragment>
                              );
                            })}
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                ))}

                {bigTableData.priorities.length === 0 && (
                  <tr>
                    <td
                      colSpan={2 + 6 + (showHqColumns ? 6 : 0) + (showRbColumns ? 6 : 0) + visibleRegionsForTable.length * 6}
                      className="p-8 text-center text-slate-400 font-medium"
                    >
                      No strategic objectives or priorities match this filter.
                    </td>
                  </tr>
                )}
              </tbody>

              {/* Grand Total Footer Row */}
              {bigTableData.priorities.length > 0 && (
                <tfoot className="sticky bottom-0 z-20">
                  <tr className="bg-slate-900 text-white font-bold border-t-2 border-slate-700 text-[11px]">
                    <td className="p-3 border-r border-slate-800 sticky left-0 bg-slate-900 z-30 uppercase tracking-wider">
                      Grand Total
                    </td>
                    <td className="p-3 border-r border-slate-800 sticky left-[130px] bg-slate-900 z-30 text-slate-400 font-normal">
                      All in-scope priorities & objectives
                    </td>
                    {renderFooterSubColumns(bigTableData.grandTotal)}
                    {showHqColumns && renderFooterSubColumns(bigTableData.grandHq)}
                    {showRbColumns && renderFooterSubColumns(bigTableData.grandRb)}
                    {bigTableData.grandByRegion.map(regRes => (
                      <React.Fragment key={regRes.region.id}>
                        {renderFooterSubColumns(regRes)}
                      </React.Fragment>
                    ))}
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>

      {/* 5. "By Project (AOP Plan)" Table */}
      {!isRegionalRole && aopByProject.length > 0 && (
        <div className="space-y-3">
          {filters.zoneId && filters.zoneId !== 'ALL' && (
            <div className="flex items-center gap-2 p-2.5 px-3 rounded-lg bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Target/Budget reflect the full Region. Actual/Spent reflect only the selected Zone.</span>
            </div>
          )}
          <div id="report-section-project" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-3 border-b bg-slate-50 flex items-center justify-between">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {isProjectRole && assignedProject ? `By Project (${assignedProject.name})` : 'By Project (AOP Plan)'} ({aopByProject.length})
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Planned targets & budgets from AOP seed</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b border-slate-200">
                  <tr>
                    <th className="p-3">Project</th>
                    <th className="p-3 text-right">AOP Target</th>
                    <th className="p-3 text-right">Actual</th>
                    <th className="p-3 text-right">Achievement %</th>
                    <th className="p-3 text-right">AOP Budget</th>
                    <th className="p-3 text-right">Spent</th>
                    <th className="p-3 text-right">Utilization %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {aopByProject.map(row => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold text-slate-800">
                        <div className="flex items-center gap-2">
                          <span>{row.name}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold border ${
                            row.currency === 'EUR' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}>
                            {row.currency}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-right font-semibold text-slate-700">{Math.round(row.planned).toLocaleString()}</td>
                      <td className="p-3 text-right font-bold text-blue-700">{Math.round(row.actual).toLocaleString()}</td>
                      <td className={`p-3 text-right font-black ${
                        row.achievement >= 100 ? 'text-emerald-700' : row.achievement >= 50 ? 'text-amber-700' : 'text-rose-700'
                      }`}>
                        {row.achievement.toFixed(1)}%
                      </td>
                      <td className="p-3 text-right font-medium text-slate-700">
                        {row.currency === 'EUR' ? `€${Math.round(row.plannedBudget).toLocaleString()}` : `${Math.round(row.plannedBudget).toLocaleString()} ETB`}
                      </td>
                      <td className="p-3 text-right text-slate-900 font-semibold">
                        {row.currency === 'EUR' ? `€${Math.round(row.spent).toLocaleString()}` : `${Math.round(row.spent).toLocaleString()} ETB`}
                      </td>
                      <td className={`p-3 text-right font-black ${
                        row.utilization > 100 ? 'text-rose-700' : row.utilization >= 50 ? 'text-emerald-700' : 'text-slate-700'
                      }`}>
                        {row.utilization.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 6. View Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'all'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" /> All Activities ({entries.length})
        </button>
        <button
          onClick={() => setActiveTab('contributing')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
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
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'non-contributing'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" /> Non-Contributing Project Activities ({nonContributingEntries.length})
          </button>
        )}
      </div>

      {/* 7. Consolidated Contributing Table */}
      {(activeTab === 'all' || activeTab === 'contributing') && (
        <div id="report-section-national" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-ercs-red" />
              <span>Consolidated Strategic & Execution Report ({contributingEntries.length})</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Includes Strategic Priority & Objective Hierarchy</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b border-slate-200">
                <tr>
                  <th className="p-3 whitespace-nowrap">Strategic Priority</th>
                  <th className="p-3 whitespace-nowrap">Strategic Objective</th>
                  <th className="p-3">Code</th>
                  <th className="p-3 min-w-40">Activity Name</th>
                  <th className="p-3 min-w-56">Description</th>
                  <th className="p-3 text-center">Map</th>
                  <th className="p-3">UOM</th>
                  <th className="p-3">Executed By</th>
                  <th className="p-3 text-right">Target</th>
                  <th className="p-3 text-right whitespace-nowrap">Target F</th>
                  <th className="p-3 text-right whitespace-nowrap">Target M</th>
                  <th className="p-3 text-right whitespace-nowrap">Target Y</th>
                  <th className="p-3 text-right">Actual</th>
                  <th className="p-3 text-right whitespace-nowrap">Actual F</th>
                  <th className="p-3 text-right whitespace-nowrap">Actual M</th>
                  <th className="p-3 text-right whitespace-nowrap">Actual Y</th>
                  <th className="p-3 text-right">Achievement %</th>
                  <th className="p-3 text-right">Budget (ETB)</th>
                  <th className="p-3 text-right">Spent (ETB)</th>
                  <th className="p-3 text-right">Utilization %</th>
                  <th className="p-3 text-right">Total Beneficiaries</th>
                  <th className="p-3 text-right">Actual Beneficiaries</th>
                  <th className="p-3 text-right">Beneficiary %</th>
                  {visibleQuarters.map(qId => (
                    <th key={qId} className="p-2 text-center bg-blue-50 border-l border-slate-200 whitespace-nowrap" colSpan={2}>
                      {qId} Target / Budget
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
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
                  const actF = quarterlyActuals
                        .filter(actItem => actItem.plan_entry_id === pe.id && (q === 'ALL' || actItem.quarter_id === q))
                        .reduce((sum, actItem) => sum + (actItem.actual_female || 0), 0);
                  const actM = quarterlyActuals
                        .filter(actItem => actItem.plan_entry_id === pe.id && (q === 'ALL' || actItem.quarter_id === q))
                        .reduce((sum, actItem) => sum + (actItem.actual_male || 0), 0);
                  const actY = quarterlyActuals
                        .filter(actItem => actItem.plan_entry_id === pe.id && (q === 'ALL' || actItem.quarter_id === q))
                        .reduce((sum, actItem) => sum + (actItem.actual_youth || 0), 0);
                  const hasActDemographics = quarterlyActuals
                        .some(actItem => actItem.plan_entry_id === pe.id && (q === 'ALL' || actItem.quarter_id === q) && (actItem.actual_female != null || actItem.actual_male != null || actItem.actual_youth != null));

                  return (
                    <React.Fragment key={pe.id}>
                      <tr className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 whitespace-nowrap font-medium text-slate-700">
                          {sp ? `${sp.code} — ${sp.name}` : '—'}
                        </td>
                        <td className="p-3 whitespace-nowrap font-medium text-slate-700">
                          {so ? `${so.code} — ${so.name}` : '—'}
                        </td>
                        <td
                          onClick={() => na && toggleActivity(na.id)}
                          className={`p-3 font-bold text-ercs-red whitespace-nowrap ${na ? 'cursor-pointer' : ''}`}
                          title={na ? "Click to toggle contributing projects and regions breakdown" : undefined}
                        >
                          {na ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleActivity(na.id);
                              }}
                              className="inline-flex items-center gap-1.5 text-ercs-red hover:text-red-700 cursor-pointer text-left font-bold"
                              title="Click to toggle contributing projects and regions breakdown"
                            >
                              {expandedActivityIds.has(na.id) ? (
                                <ChevronDown className="w-3.5 h-3.5 text-ercs-red shrink-0" />
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5 text-slate-400 hover:text-ercs-red shrink-0" />
                              )}
                              <span>{na.code}</span>
                            </button>
                          ) : (
                            pe.activity_code || '—'
                          )}
                        </td>
                        <td
                          onClick={() => na && toggleActivity(na.id)}
                          className={`p-3 font-bold text-slate-800 ${na ? 'cursor-pointer hover:text-ercs-red' : ''}`}
                          title={na ? "Click to toggle contributing projects and regions breakdown" : undefined}
                        >
                          <div className={na ? "inline-flex items-center gap-1 hover:underline" : ""}>
                            <span>{pe.activity_name}</span>
                          </div>
                          {na && (
                            <div
                              className="text-[10px] text-slate-400 hover:text-ercs-red cursor-pointer font-normal truncate max-w-xs mt-0.5"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleActivity(na.id);
                              }}
                              title="Click to toggle contributing projects and regions breakdown"
                            >
                              Linked: {na.code} — {na.description}
                            </div>
                          )}
                        </td>
                        <td
                          onClick={() => na && toggleActivity(na.id)}
                          className={`p-3 text-slate-500 ${na ? 'cursor-pointer hover:text-slate-800' : ''}`}
                          title={na ? "Click to toggle contributing projects and regions breakdown" : undefined}
                        >
                          {pe.activity_description}
                        </td>
                        <td className="p-3 text-center">
                          {na ? (
                            <button
                              type="button"
                              onClick={() => toggleActivity(na.id)}
                              className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-ercs-red cursor-pointer"
                              title="Toggle contributing projects and regions breakdown"
                            >
                              {expandedActivityIds.has(na.id) ? (
                                <ChevronDown className="w-4 h-4 text-ercs-red" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </button>
                          ) : (
                            <span className="text-slate-300">—</span>
                          )}
                        </td>
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
                        <td className="p-3 text-right font-bold whitespace-nowrap">{Math.round(t).toLocaleString()}</td>
                        <td className="p-3 text-right whitespace-nowrap text-slate-600">{pe.target_female != null ? Math.round(pe.target_female).toLocaleString() : '—'}</td>
                        <td className="p-3 text-right whitespace-nowrap text-slate-600">{pe.target_male != null ? Math.round(pe.target_male).toLocaleString() : '—'}</td>
                        <td className="p-3 text-right whitespace-nowrap text-slate-600">{pe.target_youth != null ? Math.round(pe.target_youth).toLocaleString() : '—'}</td>
                        <td className="p-3 text-right whitespace-nowrap">{Math.round(a).toLocaleString()}</td>
                        <td className="p-3 text-right whitespace-nowrap text-slate-600">{hasActDemographics ? Math.round(actF).toLocaleString() : '—'}</td>
                        <td className="p-3 text-right whitespace-nowrap text-slate-600">{hasActDemographics ? Math.round(actM).toLocaleString() : '—'}</td>
                        <td className="p-3 text-right whitespace-nowrap text-slate-600">{hasActDemographics ? Math.round(actY).toLocaleString() : '—'}</td>
                        <td className="p-3 text-right font-bold whitespace-nowrap">{ach.toFixed(1)}%</td>
                        <td className="p-3 text-right whitespace-nowrap">{Math.round(b).toLocaleString()}</td>
                        <td className="p-3 text-right whitespace-nowrap">{Math.round(s).toLocaleString()}</td>
                        <td className="p-3 text-right font-bold whitespace-nowrap">{ut.toFixed(1)}%</td>
                        <td className="p-3 text-right whitespace-nowrap">{Math.round(tb).toLocaleString()}</td>
                        <td className="p-3 text-right whitespace-nowrap">{Math.round(ab).toLocaleString()}</td>
                        <td className="p-3 text-right whitespace-nowrap">{bp.toFixed(1)}%</td>
                        {visibleQuarters.map(qId => {
                          const qp = quarterlyPlans.find(p => p.plan_entry_id === pe.id && p.quarter_id === qId);
                          return (
                            <React.Fragment key={qId}>
                              <td className="p-2 text-right whitespace-nowrap bg-blue-50 border-l border-slate-200 text-[11px]">
                                {Math.round(qp?.target ?? 0).toLocaleString()}
                              </td>
                              <td className="p-2 text-right whitespace-nowrap bg-blue-50 text-[11px]">
                                {Math.round(qp?.budget ?? 0).toLocaleString()}
                              </td>
                            </React.Fragment>
                          );
                        })}
                      </tr>
                      {na && expandedActivityIds.has(na.id) && (
                        <tr className="bg-slate-100/70 border-b-2 border-slate-300">
                          <td colSpan={20 + (visibleQuarters.length * 2)} className="p-3 pl-8 sticky left-0 max-w-[calc(100vw-3rem)] bg-slate-50/95 z-10 border-b-2 border-slate-300">
                            <div className="max-w-6xl w-full">
                              <NationalActivityInlineTables
                                nationalActivityId={na.id}
                                quarterId={q}
                                mode="report"
                              />
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
                {contributingEntries.length === 0 && (
                  <tr>
                    <td colSpan={23 + visibleQuarters.length * 2} className="p-8 text-center text-slate-400">
                      No contributing plan entries match this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. Dedicated Non-Contributing Activities Table */}
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
                      <td className="p-3 text-right font-bold whitespace-nowrap">{Math.round(t).toLocaleString()}</td>
                      <td className="p-3 text-right whitespace-nowrap">{Math.round(a).toLocaleString()}</td>
                      <td className="p-3 text-right font-bold whitespace-nowrap">{ach.toFixed(1)}%</td>
                      <td className="p-3 text-right whitespace-nowrap">{Math.round(b).toLocaleString()}</td>
                      <td className="p-3 text-right whitespace-nowrap">{Math.round(s).toLocaleString()}</td>
                      <td className="p-3 text-right font-bold whitespace-nowrap">{ut.toFixed(1)}%</td>
                      <td className="p-3 text-right whitespace-nowrap">{Math.round(tb).toLocaleString()}</td>
                      <td className="p-3 text-right whitespace-nowrap">{Math.round(ab).toLocaleString()}</td>
                      <td className="p-3 text-right whitespace-nowrap">{bp.toFixed(1)}%</td>
                      {visibleQuarters.map(qId => {
                        const qp = quarterlyPlans.find(p => p.plan_entry_id === pe.id && p.quarter_id === qId);
                        return (
                          <React.Fragment key={qId}>
                            <td className="p-2 text-right whitespace-nowrap bg-amber-50/60 border-l border-amber-200 text-[11px]">
                              {Math.round(qp?.target ?? 0).toLocaleString()}
                            </td>
                            <td className="p-2 text-right whitespace-nowrap bg-amber-50/60 text-[11px]">
                              {Math.round(qp?.budget ?? 0).toLocaleString()}
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
    </div>
  );
};

// ===========================================================================
// KPI CARD
// ===========================================================================
const ACCENT_STYLES = {
  emerald: {
    border: 'border-l-4 border-l-emerald-500',
    chip: 'bg-emerald-50 text-emerald-700',
  },
  amber: {
    border: 'border-l-4 border-l-amber-500',
    chip: 'bg-amber-50 text-amber-700',
  },
  red: {
    border: 'border-l-4 border-l-rose-500',
    chip: 'bg-rose-50 text-rose-600',
  },
};

const KPICard: React.FC<{
  title: string;
  val: React.ReactNode;
  sub: React.ReactNode;
  icon: any;
  accent?: 'emerald' | 'amber' | 'red';
  statusBadge?: KpiBadge;
}> = ({ title, val, sub, icon: Icon, accent = 'emerald', statusBadge }) => {
  const styles = ACCENT_STYLES[accent];
  return (
    <div className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm ${styles.border}`}>
      <div className="flex justify-between items-center mb-2 text-xs font-bold text-slate-500">
        <span>{title}</span>
        <div className={`p-1.5 rounded-lg ${styles.chip}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <div className="text-2xl font-black text-slate-800">{val}</div>
        {statusBadge && (
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusBadge.color}`}>
            {statusBadge.label}
          </span>
        )}
      </div>
      <div className="text-[10px] mt-1 text-slate-500 font-medium">{sub}</div>
    </div>
  );
};