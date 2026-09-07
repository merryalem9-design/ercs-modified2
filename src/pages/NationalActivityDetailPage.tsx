// src/pages/NationalActivityDetailPage.tsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  sumActual,
  sumExpenditure,
  sumPlannedTarget,
  sumPlannedBudget,
  achievementPct,
  budgetUtilizationPct,
  convertToBeneficiaries,
} from '../utils/calculations';
import { PlanEntry, ScopeType } from '../types';
import { QuarterFilterValue } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { BudgetStatusBadge } from '../components/common/BudgetStatusBadge';
import { PlanEntryWizardModal, type PeWizardFormState } from './PlanPage';
import { NationalActivityDrillDown } from '../components/common/NationalActivityDrillDown';
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarCheck2,
  CalendarClock,
  FolderGit2,
  Layers,
  MapPin,
  Plus,
  Target,
  Users,
  Wallet,
} from 'lucide-react';

export const NationalActivityDetailPage: React.FC = () => {
  const {
    selectedNationalActivityId,
    setActiveRoute,
    setFilters,
    filters,
    currentRole,
    nationalActivities,
    regions,
    zones,
    projects,
    planEntries,
    quarterlyPlans,
    quarterlyActuals,
    uomConfigs,
    regionActivityLinks,
    getFilteredPlanEntries,
    getProjectAopShare,
  } = useApp();

  const [peWizard, setPeWizard] = useState<null | { initial: PeWizardFormState; startStep: 1 | 2 }>(null);
  const [quarterId, setQuarterId] = useState<QuarterFilterValue>(() => (filters.quarterId as QuarterFilterValue) || 'ALL');

  React.useEffect(() => {
    if (filters.quarterId) {
      setQuarterId(filters.quarterId as QuarterFilterValue);
    }
  }, [filters.quarterId, selectedNationalActivityId]);

  const na = selectedNationalActivityId
    ? nationalActivities.find(n => n.id === selectedNationalActivityId)
    : undefined;

  if (!na) {
    return (
      <div className="bg-white p-8 rounded-xl border text-center text-xs text-slate-500">
        No National Activity selected. Go back to the Plan page and choose one.
      </div>
    );
  }

  // ------------------------------------------------------------------
  // Role resolution
  // ------------------------------------------------------------------
  const isAop = currentRole === 'National Activity AOP';
  const isMonitor = currentRole === 'PMER Officer';
  const isBranchHead = currentRole.startsWith('Branch Head — ');
  const isProjectCoordinatorHQ = currentRole === 'Project Coordinator — HQ';
  const isProjectCoordinator = currentRole.startsWith('Project Coordinator — ') && !isProjectCoordinatorHQ;
  const isProgramDirector = currentRole === 'Program Director';
  const isProjectRole = isProjectCoordinator || isProjectCoordinatorHQ || isProgramDirector;
  const isZoneCoordinator = currentRole.endsWith(' coordinators');
  const isRegionalRole = isBranchHead || isZoneCoordinator;
  const roleIsCoordinator = !isAop && !isMonitor;

  const assignedRegion = isBranchHead ? regions.find(r => `Branch Head — ${r.name}` === currentRole) : undefined;
  const assignedProject = isProjectCoordinator ? projects.find(p => p.name === currentRole.slice('Project Coordinator — '.length)) : undefined;
  const currentZone = isZoneCoordinator ? zones.find(z => `${z.name} coordinators` === currentRole) : undefined;
  const activeRegion = assignedRegion || (isZoneCoordinator && currentZone ? regions.find(r => r.id === currentZone.region_id) : undefined);

  // filterProject: only resolves when exactly one specific project is selected
  // (not ALL/NONE, not 2+ projects).
  const filterProject = (filters.projectId.length === 1 && !filters.projectId.includes('ALL') && !filters.projectId.includes('NONE'))
    ? projects.find(p => p.id === filters.projectId[0])
    : undefined;
  const activeProject = assignedProject || filterProject;
  const projectShare = activeProject ? getProjectAopShare(na.id, activeProject.id) : { target: 0, budget: 0 };

  const baseEntries = planEntries.filter(pe => pe.national_activity_id === na.id && pe.is_contributing !== false);
  const regionalChildren = baseEntries.filter(c => c.scope_type === 'Regional' && (!activeRegion || c.region_id === activeRegion.id));
  const projectChildren = baseEntries.filter(c => c.scope_type === 'Project' && (!activeProject || c.project_id === activeProject.id));
  const allChildren = baseEntries;
  const children = isRegionalRole ? regionalChildren : isProjectRole ? projectChildren : allChildren;

  const target = sumPlannedTarget(children, quarterlyPlans, quarterId);
  const actual = sumActual(children, quarterlyActuals, quarterId);

  // For the annual view, use the seeded AOP target scoped to the user's role:
  // - Regional role: regional_targets for their region
  // - Specific Project resolved: that project's even AOP share
  // - Project role (aggregate): hq_target (HQ means projects)
  // - National: full national ercs_target
  const aopAnnualTarget = isRegionalRole && activeRegion
    ? (na.regional_targets?.[activeRegion.id]?.target ?? 0)
    : activeProject
      ? projectShare.target
      : isProjectRole
        ? (na.hq_target ?? 0)
        : (na.ercs_target ?? 0);

  const aopAnnualBudget = isRegionalRole && activeRegion
    ? (na.regional_targets?.[activeRegion.id]?.budget ?? 0)
    : activeProject
      ? projectShare.budget
      : isProjectRole
        ? (na.hq_budget ?? 0)
        : (na.ercs_budget ?? 0);

  const effectiveTarget = quarterId === 'ALL' ? Math.max(aopAnnualTarget, target) : target;
  const effectiveBudget = quarterId === 'ALL' ? Math.max(aopAnnualBudget, sumPlannedBudget(children, quarterlyPlans, quarterId)) : sumPlannedBudget(children, quarterlyPlans, quarterId);

  const pct = achievementPct(actual, effectiveTarget);
  const budget = effectiveBudget;
  const spent = sumExpenditure(children, quarterlyActuals, quarterId);
  const util = budgetUtilizationPct(spent, budget);
  const factor = uomConfigs.find(c => c.uom.toLowerCase() === na.uom.toLowerCase())?.factor ?? 0;

  const totalBeneficiaries = convertToBeneficiaries(effectiveTarget, na.uom, uomConfigs);
  const actualBeneficiaries = convertToBeneficiaries(actual, na.uom, uomConfigs);

  // Each of these is true only when: (a) this exact National Activity is
  // eligible for that scope, and (b) nothing is linked/entered there yet
  const branchHeadEligible = isBranchHead && !!assignedRegion
    && na.eligible_region_ids.includes(assignedRegion.id)
    && !regionActivityLinks.some(l => l.national_activity_id === na.id && l.region_id === assignedRegion.id);

  const zoneAlreadyHasEntry = isZoneCoordinator && !!currentZone
    && allChildren.some(pe => pe.scope_type === 'Regional' && pe.zone_id === currentZone.id);
  const zoneEligibleLink = (isZoneCoordinator && currentZone && !zoneAlreadyHasEntry)
    ? regionActivityLinks.find(l => l.national_activity_id === na.id && l.region_id === currentZone.region_id && l.eligible_zone_ids.includes(currentZone.id))
    : undefined;

  const projectAlreadyHasEntry = isProjectCoordinator && !!assignedProject
    && allChildren.some(pe => pe.scope_type === 'Project' && pe.project_id === assignedProject.id);
  const projectEligible = isProjectCoordinator && !!assignedProject
    && na.eligible_project_ids.includes(assignedProject.id) && !projectAlreadyHasEntry;

  const hqEligibleProjects = na.eligible_project_ids.filter(pId =>
    !allChildren.some(pe => pe.scope_type === 'Project' && pe.project_id === pId)
  );
  const hqProjectEligible = isProjectCoordinatorHQ && hqEligibleProjects.length > 0;

  const aopAlreadyHasEntry = isAop && !!filterProject
    && allChildren.some(pe => pe.scope_type === 'Project' && pe.project_id === filterProject.id);
  // AOP only adds Plan Entries when drilled into a PROJECT — never a Region.
  const aopEligible = isAop && !!filterProject
    && na.eligible_project_ids.includes(filterProject.id) && !aopAlreadyHasEntry;

  const canAddPlanEntry = branchHeadEligible || !!zoneEligibleLink || projectEligible || hqProjectEligible || aopEligible;

  const setParentFilter = (scopeType: ScopeType | null = null, scopeId?: string) => {
    setFilters(prev => ({
      ...prev,
      strategicPriorityId: 'ALL',
      strategicObjectiveId: 'ALL',
      nationalActivityId: na.id,
      // Collapse to single-element array (or ['ALL'] to reset).
      regionId: scopeType === 'Regional' && scopeId ? [scopeId] : ['ALL'],
      projectId: scopeType === 'Project' && scopeId ? [scopeId] : ['ALL'],
    }));
  };

  const goBackToPlan = () => {
    setParentFilter(null);
    const origin = (typeof window !== 'undefined' && window.sessionStorage?.getItem('na_detail_origin')) || 'plan';
    setActiveRoute(origin);
  };

  const openChild = (pe: PlanEntry) => {
    setParentFilter(pe.scope_type, pe.scope_type === 'Regional' ? pe.region_id : pe.project_id);
    setActiveRoute('national-detail');
  };

  const openAddPlanWizard = () => {
    if (branchHeadEligible && assignedRegion) {
      setPeWizard({
        initial: {
          strategicPriorityId: na.strategic_priority_id,
          national_activity_id: na.id,
          scope_type: 'Regional',
          region_id: assignedRegion.id,
          project_id: '',
          annual_target: '', annual_budget: '', activity_name: '', activity_description: '',
          lockScope: true,
        },
        startStep: 2,
      });
      return;
    }
    if (zoneEligibleLink && currentZone) {
      setPeWizard({
        initial: {
          strategicPriorityId: na.strategic_priority_id,
          national_activity_id: na.id,
          scope_type: 'Regional',
          region_id: currentZone.region_id,
          project_id: '',
          annual_target: '', annual_budget: '', activity_name: '', activity_description: '',
          lockScope: true,
        },
        startStep: 2,
      });
      return;
    }
    if (projectEligible && assignedProject) {
      setPeWizard({
        initial: {
          strategicPriorityId: na.strategic_priority_id,
          national_activity_id: na.id,
          scope_type: 'Project',
          region_id: '',
          project_id: assignedProject.id,
          annual_target: '', annual_budget: '', activity_name: '', activity_description: '',
          lockScope: true,
        },
        startStep: 2,
      });
      return;
    }
    if (hqProjectEligible) {
      const defaultProjId = (filterProject && hqEligibleProjects.includes(filterProject.id))
        ? filterProject.id
        : hqEligibleProjects[0];
      setPeWizard({
        initial: {
          strategicPriorityId: na.strategic_priority_id,
          national_activity_id: na.id,
          scope_type: 'Project',
          region_id: '',
          project_id: defaultProjId,
          annual_target: '', annual_budget: '', activity_name: '', activity_description: '',
          lockScope: false,
        },
        startStep: 2,
      });
      return;
    }
    if (aopEligible && filterProject) {
      setPeWizard({
        initial: {
          strategicPriorityId: na.strategic_priority_id,
          national_activity_id: na.id,
          scope_type: 'Project',
          region_id: '',
          project_id: filterProject.id,
          annual_target: '', annual_budget: '', activity_name: '', activity_description: '',
          lockScope: true,
        },
        startStep: 2,
      });
    }
  };

  const goToQuarterlyPlan = () => {
    setParentFilter(
      children.length === 1 ? children[0].scope_type : null,
      children.length === 1
        ? (children[0].scope_type === 'Regional'
            ? children[0].region_id
            : children[0].project_id)
        : undefined
    );
    setActiveRoute('quarterly-plan');
  };

  const goToQuarterlyActual = () => {
    setParentFilter(
      children.length === 1 ? children[0].scope_type : null,
      children.length === 1
        ? (children[0].scope_type === 'Regional'
            ? children[0].region_id
            : children[0].project_id)
        : undefined
    );
    setActiveRoute('quarterly');
  };

  const detailOrigin = (typeof window !== 'undefined' && window.sessionStorage?.getItem('na_detail_origin')) || 'plan';
  const backLabel = detailOrigin === 'strategic-plan'
    ? 'Back to Strategic Plan'
    : detailOrigin === 'report'
      ? 'Back to Report'
      : 'Back to Plan';

  return (
    <div className="space-y-6">
      <button
        onClick={goBackToPlan}
        className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-ercs-red cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> {backLabel}
      </button>

      <div className="bg-white p-5 rounded-xl border shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-ercs-red text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
                {na.code}
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase">
                {na.uom}
              </span>
              {na.responsibility && (
                <span className="bg-slate-100 text-slate-600 text-[10px] font-extrabold px-2 py-0.5 rounded border border-slate-200">
                  {na.responsibility}
                </span>
              )}
            </div>

            <h2 className="text-lg font-black text-slate-800 mt-1">
              {na.description}
            </h2>

            <p className="text-[11px] text-slate-500 mt-1">
              Target and Budget below are aggregated live from every linked Plan Entry — there's no separate national ceiling to set or reconcile. Switch quarters to see that quarter's figures instead of the annual plan.
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            {roleIsCoordinator && (
              <>
                <button
                  onClick={goToQuarterlyPlan}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs"
                >
                  <CalendarClock className="w-3.5 h-3.5" /> Quarterly Plan
                </button>

                <button
                  onClick={goToQuarterlyActual}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 font-bold text-xs"
                >
                  <CalendarCheck2 className="w-3.5 h-3.5" /> Quarterly Actuals
                </button>
              </>
            )}

            {canAddPlanEntry && (
              <button
                onClick={openAddPlanWizard}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ercs-red text-white font-bold text-xs"
              >
                <Plus className="w-3.5 h-3.5" /> Add Plan Entry
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 bg-white p-1.5 rounded-lg border inline-flex gap-1 flex-wrap">
          {(
            ['ALL', 'Q1', 'Q2', 'Q3', 'Q4', 'SEMI', 'NINE_MONTH'] as QuarterFilterValue[]
          ).map(qv => (
            <button
              key={qv}
              onClick={() => setQuarterId(qv)}
              className={`px-3 py-1 rounded text-[10px] font-bold ${
                quarterId === qv
                  ? 'bg-ercs-red text-white'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {qv === 'ALL'
                ? 'Annual'
                : qv === 'SEMI'
                  ? 'Semi-Annual'
                  : qv === 'NINE_MONTH'
                    ? '9-Month'
                    : qv}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <StatCard
            icon={Target}
            label={quarterId === 'ALL' ? (isRegionalRole ? 'AOP Regional Target' : isProjectRole ? 'AOP Project Target' : 'AOP National Target') : `${quarterId} Target`}
            value={`${effectiveTarget.toLocaleString()} ${na.uom}`}
            sub={quarterId === 'ALL' && target > 0 && target !== effectiveTarget
              ? `${target.toLocaleString()} from plan entries`
              : `${actual.toLocaleString()} achieved so far`}
            status={effectiveTarget > 0 ? (actual / effectiveTarget >= 0.8 ? 'green' : actual / effectiveTarget >= 0.6 ? 'amber' : 'red') : 'green'}
          />

          <StatCard
            icon={Layers}
            label="Achievement"
            value={`${pct.toFixed(1)}%`}
            sub={
              <StatusBadge
                achievementPct={pct}
                hasActuals={actual > 0}
              />
            }
            status={actual > 0 ? (pct >= 80 ? 'green' : pct >= 60 ? 'amber' : 'red') : 'amber'}
          />

          <StatCard
            icon={Wallet}
            label={quarterId === 'ALL' ? (isRegionalRole ? 'AOP Regional Budget' : isProjectRole ? 'AOP Project Budget' : 'AOP National Budget') : `${quarterId} Budget`}
            value={`ETB ${budget.toLocaleString()}`}
            sub={
              <div className="flex items-center gap-1.5 flex-wrap">
                <span>ETB {spent.toLocaleString()} spent</span>
                <BudgetStatusBadge
                  utilizationPct={util}
                  hasSpend={spent > 0}
                />
              </div>
            }
            status={spent > 0 ? (util > 100 ? 'red' : util >= 60 ? 'green' : 'amber') : 'amber'}
          />

          <StatCard
            icon={Users}
            label="Beneficiaries Reached"
            value={actualBeneficiaries.toLocaleString()}
            sub={
              <span className="text-slate-400">
                of {totalBeneficiaries.toLocaleString()} planned · {na.uom} × {factor}
              </span>
            }
            status={totalBeneficiaries > 0 ? ((actualBeneficiaries / totalBeneficiaries) >= 0.8 ? 'green' : (actualBeneficiaries / totalBeneficiaries) >= 0.6 ? 'amber' : 'red') : 'green'}
          />
        </div>
      </div>

      <NationalActivityDrillDown nationalActivityId={na.id} quarterId={quarterId} />

      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-ercs-red" /> Linked Plan Entries ({children.length})
          </div>
        </div>

        {children.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-xs text-slate-500 mb-3">
              No Plan Entries are linked to this National Activity yet in your current scope.
            </p>

            {canAddPlanEntry && (
              <button
                onClick={openAddPlanWizard}
                className="inline-flex items-center gap-1.5 bg-ercs-red text-white px-3 py-1.5 rounded-lg text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" /> Add Plan Entry
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b">
                <tr>
                  <th className="p-3">Executed By</th>
                  <th className="p-3 text-right">Target</th>
                  <th className="p-3 text-right">Actual</th>
                  <th className="p-3 text-right">Budget</th>
                  <th className="p-3 text-right">Spent</th>
                  <th className="p-3 text-right">Total Beneficiaries</th>
                  <th className="p-3 text-right">Actual Beneficiaries</th>
                  <th className="p-3 text-right">% Utilization</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {children.map(pe => {
                  const scopeName =
                    pe.scope_type === 'Regional'
                      ? zones.find(z => z.id === pe.zone_id)?.name
                      : projects.find(p => p.id === pe.project_id)?.name;

                  const peTarget = sumPlannedTarget([pe], quarterlyPlans, quarterId);
                  const peBudget = sumPlannedBudget([pe], quarterlyPlans, quarterId);
                  const peActual = sumActual([pe], quarterlyActuals, quarterId);
                  const peSpent = sumExpenditure([pe], quarterlyActuals, quarterId);
                  const peAchievement = achievementPct(peActual, peTarget);
                  const peUtil = budgetUtilizationPct(peSpent, peBudget);
                  const peTotalBeneficiaries = convertToBeneficiaries(peTarget, na.uom, uomConfigs);
                  const peActualBeneficiaries = convertToBeneficiaries(peActual, na.uom, uomConfigs);

                  const peActuals = quarterlyActuals.filter(a => a.plan_entry_id === pe.id && (quarterId === 'ALL' || a.quarter_id === quarterId));
                  const peActF = peActuals.reduce((sum, a) => sum + (a.actual_female || 0), 0);
                  const peActM = peActuals.reduce((sum, a) => sum + (a.actual_male || 0), 0);
                  const peActY = peActuals.reduce((sum, a) => sum + (a.actual_youth || 0), 0);
                  const hasPeDemographics = peActuals.some(a => a.actual_female != null || a.actual_male != null || a.actual_youth != null);
                  const peComments = peActuals.filter(a => !!a.comment);

                  return (
                    <tr key={pe.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        {pe.scope_type === 'Regional' ? (
                          <MapPin className="w-3 h-3 inline text-blue-400 mr-1" />
                        ) : (
                          <FolderGit2 className="w-3 h-3 inline text-purple-400 mr-1" />
                        )}

                        <span className="font-semibold">
                          {scopeName || '—'}
                        </span>
                        {pe.activity_name && pe.activity_name !== na.description && (
                          <div className="text-[10px] text-slate-500 truncate max-w-xs mt-0.5 font-normal">
                            {pe.activity_name}
                          </div>
                        )}
                      </td>

                      <td className="p-3 text-right font-bold whitespace-nowrap">
                        {peTarget.toLocaleString()} {na.uom}
                      </td>

                      <td className="p-3 text-right whitespace-nowrap">
                        <div className={`font-bold ${peActual > 0 ? 'text-blue-700' : 'text-slate-700'}`}>
                          {peActual.toLocaleString()} {na.uom}
                        </div>
                        {hasPeDemographics && (
                          <div className="text-[10px] text-slate-500 font-normal mt-0.5" title="Demographics: Female / Male / Youth">
                            F: {peActF.toLocaleString()} · M: {peActM.toLocaleString()} · Y: {peActY.toLocaleString()}
                          </div>
                        )}
                        {peComments.length > 0 && (
                          <div className="text-[9px] text-slate-400 italic truncate max-w-[140px] ml-auto mt-0.5" title={peComments.map(c => `${c.quarter_id}: ${c.comment}`).join(' | ')}>
                            💬 {peComments[peComments.length - 1].comment}
                          </div>
                        )}
                      </td>

                      <td className="p-3 text-right whitespace-nowrap">
                        ETB {peBudget.toLocaleString()}
                      </td>

                      <td className="p-3 text-right whitespace-nowrap">
                        ETB {peSpent.toLocaleString()}
                      </td>

                      <td className="p-3 text-right whitespace-nowrap">
                        <div>{peTotalBeneficiaries.toLocaleString()}</div>
                        <div className="text-[9px] text-slate-400">
                          Target × {factor}
                        </div>
                      </td>

                      <td className="p-3 text-right whitespace-nowrap">
                        <div className="font-bold text-blue-600">
                          {peActualBeneficiaries.toLocaleString()}
                        </div>
                        <div className="text-[9px] text-slate-400">
                          Actual × {factor}
                        </div>
                      </td>

                      <td className="p-3 text-right font-bold whitespace-nowrap">
                        {peUtil.toFixed(1)}%
                      </td>

                      <td className="p-3 text-center">
                        <StatusBadge
                          achievementPct={peAchievement}
                          hasActuals={peActual > 0}
                        />
                      </td>

                      <td className="p-3 text-center">
                        <button
                          onClick={() => openChild(pe)}
                          className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-bold flex items-center gap-1 mx-auto"
                        >
                          Focus <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {(regionalChildren.length > 0 || projectChildren.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {regionalChildren.length > 0 && (
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <div className="text-[10px] uppercase font-extrabold text-slate-500 mb-2 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-blue-400" /> Regions
              </div>

              <div className="space-y-1">
                {regionalChildren.map(pe => (
                  <button
                    key={pe.id}
                    onClick={() => openChild(pe)}
                    className="w-full text-left text-xs font-semibold px-2 py-1.5 rounded hover:bg-slate-50 flex items-center justify-between"
                  >
                    {zones.find(z => z.id === pe.zone_id)?.name}
                    <ArrowUpRight className="w-3 h-3 text-slate-300" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {projectChildren.length > 0 && (
            <div className="bg-white p-4 rounded-xl border shadow-sm">
              <div className="text-[10px] uppercase font-extrabold text-slate-500 mb-2 flex items-center gap-1">
                <FolderGit2 className="w-3 h-3 text-purple-400" /> Projects
              </div>

              <div className="space-y-1">
                {projectChildren.map(pe => (
                  <button
                    key={pe.id}
                    onClick={() => openChild(pe)}
                    className="w-full text-left text-xs font-semibold px-2 py-1.5 rounded hover:bg-slate-50 flex items-center justify-between"
                  >
                    {projects.find(p => p.id === pe.project_id)?.name}
                    <ArrowUpRight className="w-3 h-3 text-slate-300" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {peWizard && (
        <PlanEntryWizardModal
          initial={peWizard.initial}
          startStep={peWizard.startStep}
          onClose={() => setPeWizard(null)}
          onSaved={() => setPeWizard(null)}
        />
      )}
    </div>
  );
};

const StatCard: React.FC<{
  icon: any;
  label: string;
  value: React.ReactNode;
  sub?: React.ReactNode;
  status?: 'green' | 'amber' | 'red';
}> = ({ icon: Icon, label, value, sub, status }) => {
  const borderClass = status === 'green' ? 'border-l-4 border-l-emerald-500' : status === 'amber' ? 'border-l-4 border-l-amber-500' : status === 'red' ? 'border-l-4 border-l-rose-500' : '';
  const iconClass = status === 'green' ? 'text-emerald-600' : status === 'amber' ? 'text-amber-600' : status === 'red' ? 'text-rose-600' : 'text-slate-400';
  return (
    <div className={`bg-slate-50 border rounded-lg p-3 ${borderClass}`}>
      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
        <span>{label}</span>
        <Icon className={`w-3.5 h-3.5 ${iconClass}`} />
      </div>

      <div className="text-lg font-black text-slate-800 mt-1">
        {value}
      </div>

      {sub && (
        <div className="text-[10px] text-slate-500 mt-1">
          {sub}
        </div>
      )}
    </div>
  );
};