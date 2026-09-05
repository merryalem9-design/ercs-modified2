// src/pages/PlanPage.tsx
import React, { useRef, useMemo, useState } from 'react';
import { NumberInput } from '../components/common/NumberInput';
import { useApp } from '../context/AppContext';
import { FilterBar } from '../components/common/FilterBar';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  sumTarget, sumBudget, sumPlannedTarget, sumPlannedBudget, sumActual, sumExpenditure,
  achievementPct, budgetUtilizationPct, convertToBeneficiaries,
} from '../utils/calculations';
import { PlanEntry, ScopeType, Project, NationalActivity, RegionActivityLink } from '../types';
import { ArrowLeft, ArrowUpRight, Layers, Plus, Save, Trash2, X } from 'lucide-react';

export interface PeWizardFormState {
  id?: string;
  strategicPriorityId: string;
  national_activity_id: string;
  scope_type: ScopeType;
  region_id: string;
  project_id: string;
  annual_target: string;
  annual_budget: string;
  activity_code?: string;
  activity_name: string;
  activity_description: string;
  is_contributing?: boolean;
  uom?: string;
  lockScope?: boolean;
}

export const PlanPage: React.FC = () => {
  const {
    nationalActivities, regions, zones, projects, planEntries, regionActivityLinks, deletePlanEntry,
    uomConfigs, quarterlyPlans, quarterlyActuals, filters, getFilteredPlanEntries,
    setSelectedNationalActivityId, setActiveRoute, currentRole,
    deleteNationalActivity, getNationalActivitiesForRole,
  } = useApp();

  const [peWizard, setPeWizard] = useState<null | { initial: PeWizardFormState; startStep: 1 | 2 }>(null);
  const [deleteTarget, setDeleteTarget] = useState<null | { id: string; label: string }>(null);
  const [naFormOpen, setNaFormOpen] = useState(false);
  const [deleteNaTarget, setDeleteNaTarget] = useState<null | { id: string; label: string }>(null);

  const filteredEntries = getFilteredPlanEntries();
  const q = filters.quarterId;

  // Per-quarter column resolution — same logic as ReportPage.tsx.
  type QuarterId = 'Q1' | 'Q2' | 'Q3' | 'Q4';
  const ALL_QS: QuarterId[] = ['Q1', 'Q2', 'Q3', 'Q4'];
  const visibleQuarters: QuarterId[] =
    q === 'SEMI'       ? ['Q1', 'Q2'] :
    q === 'NINE_MONTH' ? ['Q1', 'Q2', 'Q3'] :
    (q === 'Q1' || q === 'Q2' || q === 'Q3' || q === 'Q4') ? [q as QuarterId] :
    ALL_QS;

  // Sum quarterly target/budget across a set of plan entries for the aggregated table.
  const qDataForEntries = (es: PlanEntry[], qId: QuarterId) => ({
    target: es.reduce((s, e) => s + (quarterlyPlans.find(qp => qp.plan_entry_id === e.id && qp.quarter_id === qId)?.target ?? 0), 0),
    budget: es.reduce((s, e) => s + (quarterlyPlans.find(qp => qp.plan_entry_id === e.id && qp.quarter_id === qId)?.budget ?? 0), 0),
  });

  // Single-entry quarterly lookup for the execution entries table.
  const qDataForEntry = (peId: string, qId: QuarterId) => {
    const qp = quarterlyPlans.find(p => p.plan_entry_id === peId && p.quarter_id === qId);
    return { target: qp?.target ?? 0, budget: qp?.budget ?? 0 };
  };

  const isAop = currentRole === 'National Activity AOP';
  const isProjectCoordinatorHQ = currentRole === 'Project Coordinator — HQ';
  const isProjectCoordinator = currentRole.startsWith('Project Coordinator — ') && !isProjectCoordinatorHQ;
  const isBranchHead = currentRole.startsWith('Branch Head — ');
  const isZoneCoordinator = currentRole.endsWith(' coordinators');

  const hasRegionOrProjectFilter =
    (!filters.regionId.includes('ALL') && !filters.regionId.includes('NONE')) ||
    (!filters.projectId.includes('ALL') && !filters.projectId.includes('NONE'));

  // A Project Coordinator has exactly one Project — resolve it directly
  // from their role (like Zone Coordinator resolves their own zone below),
  // rather than depending on the Project *filter* dropdown, which starts
  // on "All Projects" every time the role changes and has no reason to
  // ever be touched since there's only one real option in it. Previously
  // the "Add Plan Entry" button silently did nothing until that filter was
  // manually set.
  const assignedProject = isProjectCoordinator
    ? projects.find(p => p.name === currentRole.slice('Project Coordinator — '.length))
    : undefined;

  // AOP can only add a Plan Entry directly once drilled all the way into a
  // specific Project (Regional entries are the Branch Head's Region
  // Activity Link flow instead) — so this resolves the actual Project
  // object from the filter, not just "some region-or-project filter".
  // Requires exactly one specific project id (not ALL/NONE, not 2+).
  const filterProject = (filters.projectId.length === 1 && !filters.projectId.includes('ALL') && !filters.projectId.includes('NONE'))
    ? projects.find(p => p.id === filters.projectId[0])
    : undefined;

  const showAggregatedView = isAop && !hasRegionOrProjectFilter;
  const canAddPlanEntry = isProjectCoordinator || isProjectCoordinatorHQ || isZoneCoordinator || (isAop && !!filterProject);

  const roleScopedNationalActivities = getNationalActivitiesForRole();

  const viewLinkMap = (naId: string) => {
    setSelectedNationalActivityId(naId);
    setActiveRoute('national-detail');
  };

  // ------------------------------------------------------------------
  // BRANCH HEAD VIEW — one row per RegionActivityLink.
  // ------------------------------------------------------------------
  const currentRegion = isBranchHead ? regions.find(r => `Branch Head — ${r.name}` === currentRole) : undefined;
  const branchHeadLinks = currentRegion ? regionActivityLinks.filter(l => l.region_id === currentRegion.id) : [];

  const openZoneLinkWizard = () => {
    if (!currentRegion) return;
    setPeWizard({
      initial: {
        strategicPriorityId: '', national_activity_id: '', scope_type: 'Regional', region_id: currentRegion.id, project_id: '',
        annual_target: '', annual_budget: '', activity_name: '', activity_description: '', lockScope: true,
      },
      startStep: 1,
    });
  };

  // ------------------------------------------------------------------
  // ZONE COORDINATOR VIEW — flat execution entries scoped to zone.
  // ------------------------------------------------------------------
  const currentZone = isZoneCoordinator ? zones.find(z => `${z.name} coordinators` === currentRole) : undefined;

  const openZoneEntryWizard = () => {
    if (!currentZone) return;
    setPeWizard({
      initial: {
        strategicPriorityId: '', national_activity_id: '', scope_type: 'Regional', region_id: currentZone.region_id, project_id: '',
        annual_target: '', annual_budget: '', activity_name: '', activity_description: '', lockScope: true,
      },
      startStep: 1,
    });
  };

  // PROJECT COORDINATOR / AOP: add a Project-scope Plan Entry.
  const openAddPlanWizard = () => {
    const targetProject = assignedProject || filterProject;
    if (!targetProject && !isProjectCoordinatorHQ) return; // AOP only adds Plan Entries once drilled into a Project

    const naFilterActive = filters.nationalActivityId !== 'ALL';
    const naId = naFilterActive ? filters.nationalActivityId : '';
    const na = naId ? nationalActivities.find(n => n.id === naId) : undefined;

    setPeWizard({
      initial: {
        strategicPriorityId: na?.strategic_priority_id || '',
        national_activity_id: naId,
        scope_type: 'Project',
        region_id: '',
        project_id: targetProject?.id || (projects[0]?.id ?? ''),
        annual_target: '', annual_budget: '', activity_name: '', activity_description: '',
        lockScope: !isProjectCoordinatorHQ,
      },
      startStep: naFilterActive && na ? 2 : 1,
    });
  };

  // Unified "Add Plan Entry" handler for whichever role/scope is currently
  // eligible — used by every empty-state prompt on this page.
  const handleAddExecutionEntry = () => {
    if (isZoneCoordinator) openZoneEntryWizard();
    else openAddPlanWizard();
  };

  const openEditPlanWizard = (pe: PlanEntry) => {
    const na = nationalActivities.find(n => n.id === pe.national_activity_id);
    setPeWizard({
      initial: {
        id: pe.id, strategicPriorityId: na?.strategic_priority_id || '', national_activity_id: pe.national_activity_id || '',
        scope_type: pe.scope_type, region_id: pe.region_id || '', project_id: pe.project_id || '',
        annual_target: String(pe.annual_target), annual_budget: String(pe.annual_budget),
        activity_code: pe.activity_code,
        activity_name: pe.activity_name, activity_description: pe.activity_description,
        is_contributing: pe.is_contributing !== false,
        uom: pe.uom || na?.uom || '',
        lockScope: true,
      },
      startStep: 2,
    });
  };

  const naInScope = roleScopedNationalActivities.filter(na =>
    filters.nationalActivityId === 'ALL' || na.id === filters.nationalActivityId
  );

  const aggregatedRows = naInScope.map(na => {
    const naEntries = filteredEntries.filter(pe => pe.national_activity_id === na.id);
    const totalLinkedEntries = planEntries.filter(pe => pe.national_activity_id === na.id).length;
    const hasLinkedRegionLinks = regionActivityLinks.some(l => l.national_activity_id === na.id);
    const target = sumPlannedTarget(naEntries, quarterlyPlans, q);
    const actual = sumActual(naEntries, quarterlyActuals, q);
    const budget = sumPlannedBudget(naEntries, quarterlyPlans, q);
    const spent = sumExpenditure(naEntries, quarterlyActuals, q);
    const utilization = budgetUtilizationPct(spent, budget);
    const factor = uomConfigs.find(c => c.uom.toLowerCase() === na.uom.toLowerCase())?.factor ?? 0;
    const beneficiaries = convertToBeneficiaries(target, na.uom, uomConfigs);
    const actualBeneficiaries = convertToBeneficiaries(actual, na.uom, uomConfigs);
    return { na, entryCount: naEntries.length, totalLinkedEntries, hasLinkedRegionLinks, target, actual, budget, spent, utilization, beneficiaries, actualBeneficiaries, factor };
  });

  const aggregatedTotalBudget = aggregatedRows.reduce((s, r) => s + r.budget, 0);
  const aggregatedTotalSpent = aggregatedRows.reduce((s, r) => s + r.spent, 0);
  const aggregatedTotalBeneficiaries = aggregatedRows.reduce((s, r) => s + r.beneficiaries, 0);
  const aggregatedTotalActualBeneficiaries = aggregatedRows.reduce((s, r) => s + r.actualBeneficiaries, 0);
  const aggregatedTotalUtilization = budgetUtilizationPct(aggregatedTotalSpent, aggregatedTotalBudget);

  const executionRows = filteredEntries.map(pe => {
    const na = nationalActivities.find(n => n.id === pe.national_activity_id);
    const target = sumPlannedTarget([pe], quarterlyPlans, q);
    const budget = sumPlannedBudget([pe], quarterlyPlans, q);
    const actual = sumActual([pe], quarterlyActuals, q);
    const spent = sumExpenditure([pe], quarterlyActuals, q);
    const achievement = achievementPct(actual, target);
    const utilization = budgetUtilizationPct(spent, budget);
    const factor = na ? (uomConfigs.find(c => c.uom.toLowerCase() === na.uom.toLowerCase())?.factor ?? 0) : 0;
    const beneficiaries = convertToBeneficiaries(target, na?.uom || '', uomConfigs);
    const actualBeneficiaries = convertToBeneficiaries(actual, na?.uom || '', uomConfigs);
    const scopeName = pe.scope_type === 'Regional' ? zones.find(z => z.id === pe.zone_id)?.name : projects.find(p => p.id === pe.project_id)?.name;
    return { pe, na, target, budget, actual, spent, achievement, utilization, beneficiaries, actualBeneficiaries, factor, scopeName };
  });

  const executionTotalBudget = executionRows.reduce((s, r) => s + r.budget, 0);
  const executionTotalSpent = executionRows.reduce((s, r) => s + r.spent, 0);
  const executionTotalUtilization = budgetUtilizationPct(executionTotalSpent, executionTotalBudget);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Annual Plan</h2>
      </div>

      <FilterBar />

      {isBranchHead ? (
        <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-ercs-red" /> Region Activity Links ({branchHeadLinks.length})
            </div>
            <button onClick={openZoneLinkWizard} className="flex items-center gap-1.5 bg-ercs-red text-white px-3 py-1.5 rounded-lg text-xs font-bold">
              <Plus className="w-3.5 h-3.5" /> Add Plan (Link to National Activity)
            </button>
          </div>
          {branchHeadLinks.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-xs text-slate-500 mb-3">No National Activities linked yet.</p>
              <button onClick={openZoneLinkWizard} className="inline-flex items-center gap-1.5 bg-ercs-red text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                <Plus className="w-3.5 h-3.5" /> Add Plan (Link to National Activity)
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b">
                  <tr><th className="p-3">Code</th><th className="p-3">Activity</th><th className="p-3">UOM</th><th className="p-3 text-right">Target</th><th className="p-3 text-right">Budget</th></tr>
                </thead>
                <tbody className="divide-y">
                  {branchHeadLinks.map(link => {
                    const na = nationalActivities.find(n => n.id === link.national_activity_id);
                    const es = planEntries.filter(pe => pe.region_activity_link_id === link.id);
                    const t = sumPlannedTarget(es, quarterlyPlans, q);
                    const b = sumPlannedBudget(es, quarterlyPlans, q);
                    return (
                      <tr key={link.id} className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-ercs-red">{na?.code}</td>
                        <td className="p-3 font-bold">{link.activity_name}</td>
                        <td className="p-3">{na?.uom}</td>
                        <td className="p-3 text-right">{t.toLocaleString()}</td>
                        <td className="p-3 text-right">ETB {b.toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ) : (
        <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
              <Layers className="w-4 h-4 text-ercs-red" />
              <span>{showAggregatedView ? `National Activities (${aggregatedRows.length})` : `Execution Plan Entries (${executionRows.length})`}</span>
            </div>
            <div className="flex items-center gap-2">
              {showAggregatedView && isAop && (
                <button onClick={() => setNaFormOpen(true)} className="flex items-center gap-1.5 bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                  <Plus className="w-3.5 h-3.5" /> Add National Activity
                </button>
              )}
              {isZoneCoordinator && (
                <button onClick={openZoneEntryWizard} className="flex items-center gap-1.5 bg-ercs-red text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                  <Plus className="w-3.5 h-3.5" /> Add Plan Entry
                </button>
              )}
              {(isProjectCoordinator || isProjectCoordinatorHQ || isAop) && canAddPlanEntry && (
                <button onClick={openAddPlanWizard} className="flex items-center gap-1.5 bg-ercs-red text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                  <Plus className="w-3.5 h-3.5" /> Add Plan Entry
                </button>
              )}
            </div>
          </div>

          {showAggregatedView ? (
            aggregatedRows.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-xs text-slate-500 mb-3">No National Activities match this filter.</p>
                {isAop && (
                  <button onClick={() => setNaFormOpen(true)} className="inline-flex items-center gap-1.5 bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                    <Plus className="w-3.5 h-3.5" /> Add National Activity
                  </button>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b">
                    <tr>
                      <th className="p-3">Code</th><th className="p-3">Activity</th><th className="p-3">UOM</th>
                      <th className="p-3 text-right">Target</th><th className="p-3 text-right">Budget (ETB)</th>
                      <th className="p-3 text-right">Total Beneficiaries</th>
                      <th className="p-3 text-center">Actions</th>
                      {visibleQuarters.map(qId => (
                        <th key={qId} className="p-2 text-center bg-blue-50 border-l whitespace-nowrap" colSpan={2}>
                          {qId} Target / Budget
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {aggregatedRows.map(row => {
                      const naEntries = filteredEntries.filter(pe => pe.national_activity_id === row.na.id);
                      return (
                        <tr key={row.na.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-ercs-red whitespace-nowrap">{row.na.code}</td>
                          <td className="p-3 min-w-56 font-bold text-slate-800">{row.na.description}</td>
                          <td className="p-3 whitespace-nowrap text-slate-500 font-semibold">{row.na.uom}</td>
                          <td className="p-3 text-right font-bold whitespace-nowrap">{row.target.toLocaleString()}</td>
                          <td className="p-3 text-right whitespace-nowrap">{row.budget.toLocaleString()}</td>
                          <td className="p-3 text-right whitespace-nowrap">{row.beneficiaries.toLocaleString()}</td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-3">
                              <button onClick={() => viewLinkMap(row.na.id)} className="text-[10px] font-bold text-ercs-red inline-flex items-center gap-0.5">View <ArrowUpRight className="w-3 h-3" /></button>
                              {isAop && row.totalLinkedEntries === 0 && !row.hasLinkedRegionLinks && (
                                <button onClick={() => setDeleteNaTarget({ id: row.na.id, label: `${row.na.code} — ${row.na.description}` })} className="text-[10px] font-bold text-red-600 inline-flex items-center gap-0.5">
                                  <Trash2 className="w-3 h-3" /> Delete
                                </button>
                              )}
                            </div>
                          </td>
                          {/* Per-quarter Target / Budget columns */}
                          {visibleQuarters.map(qId => {
                            const qd = qDataForEntries(naEntries, qId);
                            return (
                              <React.Fragment key={qId}>
                                <td className="p-2 text-right whitespace-nowrap bg-blue-50 border-l text-[11px]">{qd.target.toLocaleString()}</td>
                                <td className="p-2 text-right whitespace-nowrap bg-blue-50 text-[11px]">{qd.budget.toLocaleString()}</td>
                              </React.Fragment>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-50 font-black border-t-2 border-slate-200">
                      <td className="p-3" colSpan={3}>TOTAL</td>
                      <td className="p-3 text-right text-slate-300">—</td>
                      <td className="p-3 text-right">{aggregatedTotalBudget.toLocaleString()}</td>
                      <td className="p-3 text-right">{aggregatedTotalBeneficiaries.toLocaleString()}</td>
                      <td className="p-3"></td>
                      {/* Quarter footer — one empty pair per visible quarter */}
                      {visibleQuarters.map(qId => (
                        <React.Fragment key={qId}>
                          <td className="bg-blue-50 border-l" />
                          <td className="bg-blue-50" />
                        </React.Fragment>
                      ))}
                    </tr>
                  </tfoot>
                </table>
              </div>
            )
          ) : (
            executionRows.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-xs text-slate-500 mb-3">No Plan Entries are linked yet for this selection.</p>
                {canAddPlanEntry ? (
                  <button onClick={handleAddExecutionEntry} className="inline-flex items-center gap-1.5 bg-ercs-red text-white px-3 py-1.5 rounded-lg text-xs font-bold">
                    <Plus className="w-3.5 h-3.5" /> Add Plan Entry
                  </button>
                ) : (
                  isAop && hasRegionOrProjectFilter && (
                    <p className="text-[10px] text-slate-400 max-w-sm mx-auto">
                      Drill into a Project (not just a Region) to add a Plan Entry here — Regional entries are created by that Region's Branch Head instead.
                    </p>
                  )
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b">
                    <tr>
                      <th className="p-3">Code</th><th className="p-3">Activity Name</th><th className="p-3">Executed By</th>
                      <th className="p-3 text-right">Target</th><th className="p-3 text-right">Budget (ETB)</th>
                      <th className="p-3 text-center">Status</th>
                      {(isProjectCoordinator || isProjectCoordinatorHQ || isZoneCoordinator) && <th className="p-3 text-center">Actions</th>}
                      {visibleQuarters.map(qId => (
                        <th key={qId} className="p-2 text-center bg-blue-50 border-l whitespace-nowrap" colSpan={2}>
                          {qId} Target / Budget
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {executionRows.map(row => {
                      const regionObj = regions.find(r => r.id === row.pe.region_id);
                      const executedByLabel = row.pe.scope_type === 'Regional' ? (regionObj?.name || 'Regional') : 'Project';
                      return (
                        <tr key={row.pe.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-ercs-red whitespace-nowrap">{row.na?.code || row.pe.activity_code || '—'}</td>
                          <td className="p-3 min-w-40 font-bold text-slate-800">
                            <div className="flex items-center gap-1.5">
                              <span>{row.pe.activity_name}</span>
                              {row.pe.is_contributing === false && (
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wider">
                                  Non-Contributing
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-3 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${row.pe.scope_type === 'Regional' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>{executedByLabel}</span>
                            <span className="ml-2 font-semibold">{row.scopeName || '—'}</span>
                          </td>
                          <td className="p-3 text-right font-bold whitespace-nowrap">{row.target.toLocaleString()} {row.pe.uom || row.na?.uom || ''}</td>
                          <td className="p-3 text-right whitespace-nowrap">{row.budget.toLocaleString()}</td>
                          <td className="p-3 text-center"><StatusBadge achievementPct={row.achievement} hasActuals={row.actual > 0} /></td>
                          {(isProjectCoordinator || isProjectCoordinatorHQ || isZoneCoordinator) && (
                            <td className="p-3">
                              <div className="flex items-center justify-center gap-2 flex-wrap">
                                <button onClick={() => openEditPlanWizard(row.pe)} className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-bold">Edit</button>
                                <button onClick={() => setDeleteTarget({ id: row.pe.id, label: `${row.na?.code || row.pe.activity_code || ''} / ${row.scopeName || ''}` })} className="px-2.5 py-1 rounded bg-red-50 text-red-700 font-bold"><Trash2 className="w-3 h-3" /></button>
                              </div>
                            </td>
                          )}
                          {/* Per-quarter Target / Budget columns */}
                          {visibleQuarters.map(qId => {
                            const qd = qDataForEntry(row.pe.id, qId);
                            return (
                              <React.Fragment key={qId}>
                                <td className="p-2 text-right whitespace-nowrap bg-blue-50 border-l text-[11px]">{qd.target.toLocaleString()}</td>
                                <td className="p-2 text-right whitespace-nowrap bg-blue-50 text-[11px]">{qd.budget.toLocaleString()}</td>
                              </React.Fragment>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-50 font-black border-t-2 border-slate-200">
                      <td className="p-3" colSpan={3}>TOTAL</td>
                      <td className="p-3 text-right text-slate-300">—</td>
                      <td className="p-3 text-right">{executionTotalBudget.toLocaleString()}</td>
                      <td className="p-3" colSpan={(isProjectCoordinator || isProjectCoordinatorHQ || isZoneCoordinator) ? 2 : 1}></td>
                      {/* Quarter footer — one empty pair per visible quarter */}
                      {visibleQuarters.map(qId => (
                        <React.Fragment key={qId}>
                          <td className="bg-blue-50 border-l" />
                          <td className="bg-blue-50" />
                        </React.Fragment>
                      ))}
                    </tr>
                  </tfoot>
                </table>
              </div>
            )
          )}
        </section>
      )}

      {peWizard && (
        <PlanEntryWizardModal initial={peWizard.initial} startStep={peWizard.startStep} onClose={() => setPeWizard(null)} onSaved={() => setPeWizard(null)} />
      )}
      {deleteTarget && (
        <ConfirmDeleteModal label={deleteTarget.label} onCancel={() => setDeleteTarget(null)} onConfirm={() => { deletePlanEntry(deleteTarget.id); setDeleteTarget(null); }} />
      )}
      {naFormOpen && (
        <NationalActivityFormModal
          initialStrategicPriorityId={filters.strategicPriorityId !== 'ALL' ? filters.strategicPriorityId : undefined}
          initialStrategicObjectiveId={filters.strategicObjectiveId !== 'ALL' ? filters.strategicObjectiveId : undefined}
          initialRegionId={(filters.regionId.length === 1 && !filters.regionId.includes('ALL') && !filters.regionId.includes('NONE')) ? filters.regionId[0] : undefined}
          initialProjectId={(filters.projectId.length === 1 && !filters.projectId.includes('ALL') && !filters.projectId.includes('NONE')) ? filters.projectId[0] : undefined}
          onClose={() => setNaFormOpen(false)}
          onSaved={() => setNaFormOpen(false)}
        />
      )}
      {deleteNaTarget && (
        <ConfirmDeleteNAModal label={deleteNaTarget.label} onCancel={() => setDeleteNaTarget(null)} onConfirm={() => { deleteNationalActivity(deleteNaTarget.id); setDeleteNaTarget(null); }} />
      )}
    </div>
  );
};

// ============================================================
// NationalActivityFormModal — now lets you choose the Strategic Priority
// AND the Strategic Objective it belongs to (Objective cascades off
// Priority, same pattern as the FilterBar). Previously both were
// hardcoded to 'sp-1' — and strategic_objective_id was set to a
// *Priority* id, which matched no real Strategic Objective, silently
// breaking every "by Strategic Objective" grouping for any activity
// created this way. Also accepts optional initial values so it can be
// pre-filled from whatever Priority/Objective/Region/Project you're
// already filtered to when you click "Add National Activity".
// ============================================================
interface NationalActivityFormModalProps {
  onClose: () => void;
  onSaved: () => void;
  initialStrategicPriorityId?: string;
  initialStrategicObjectiveId?: string;
  initialRegionId?: string;
  initialProjectId?: string;
}

const NationalActivityFormModal: React.FC<NationalActivityFormModalProps> = ({
  onClose, onSaved, initialStrategicPriorityId, initialStrategicObjectiveId, initialRegionId, initialProjectId,
}) => {
  const { nationalActivities, strategicPriorities, strategicObjectives, regions, projects, uomConfigs, addNationalActivity } = useApp();
  const [strategicPriorityId, setStrategicPriorityId] = useState(initialStrategicPriorityId || '');
  const [strategicObjectiveId, setStrategicObjectiveId] = useState(initialStrategicObjectiveId || '');
  const [selectedActivityId, setSelectedActivityId] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [uom, setUom] = useState('');
  const [regionIds, setRegionIds] = useState<string[]>(initialRegionId ? [initialRegionId] : []);
  const [projectIds, setProjectIds] = useState<string[]>(initialProjectId ? [initialProjectId] : []);
  const [isHq, setIsHq] = useState(false);
  const savingRef = useRef(false);

  const objectivesForPriority = strategicPriorityId
    ? strategicObjectives.filter(so => so.strategic_priority_id === strategicPriorityId)
    : [];

  const activitiesInObjective = strategicObjectiveId
    ? nationalActivities.filter(na => na.strategic_objective_id === strategicObjectiveId)
    : [];

  const autoCode = useMemo(() => {
    if (!strategicObjectiveId) return '';
    const obj = strategicObjectives.find(o => o.id === strategicObjectiveId);
    if (!obj) return '';
    const siblings = nationalActivities.filter(na => na.strategic_objective_id === strategicObjectiveId);
    let maxSuffix = 0;
    siblings.forEach(na => {
      const parts = na.code.split('.');
      const lastPart = parseInt(parts[parts.length - 1], 10);
      if (!isNaN(lastPart) && lastPart > maxSuffix) maxSuffix = lastPart;
    });
    return `${obj.code}.${maxSuffix + 1}`;
  }, [strategicObjectiveId, strategicObjectives, nationalActivities]);

  const handlePriorityChange = (value: string) => {
    setStrategicPriorityId(value);
    setStrategicObjectiveId('');
    setSelectedActivityId('');
    setName('');
    setDescription('');
    setUom('');
  };

  const handleObjectiveChange = (value: string) => {
    setStrategicObjectiveId(value);
    setSelectedActivityId('');
    setName('');
    setDescription('');
    setUom('');
  };

  const handleActivitySelect = (id: string) => {
    setSelectedActivityId(id);
    if (id === '__CUSTOM__') {
      setIsCustom(true);
      setName('');
      setDescription('');
      setUom(uomConfigs[0]?.uom || 'Number');
    } else {
      setIsCustom(false);
      const found = nationalActivities.find(na => na.id === id);
      if (found) {
        setName(found.description);
        setDescription(found.activity_description || '');
        setUom(found.uom);
        setRegionIds(found.eligible_region_ids || []);
        setProjectIds(found.eligible_project_ids || []);
        setIsHq(found.responsibility === 'HQ' || found.responsibility === 'Both');
      }
    }
  };

  const toggleRegion = (id: string) => setRegionIds(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]);
  const toggleProject = (id: string) => setProjectIds(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);

  const isAllSelected = regionIds.length === regions.length && projectIds.length === projects.length && isHq;
  const toggleSelectAll = () => {
    if (isAllSelected) {
      setRegionIds([]);
      setProjectIds([]);
      setIsHq(false);
    } else {
      setRegionIds(regions.map(r => r.id));
      setProjectIds(projects.map(p => p.id));
      setIsHq(true);
    }
  };

  const activeCode = isCustom ? autoCode : (nationalActivities.find(na => na.id === selectedActivityId)?.code || '');
  const canSave = !!strategicPriorityId && !!strategicObjectiveId && !!activeCode && !!name.trim() && !!uom && (regionIds.length > 0 || projectIds.length > 0 || isHq);

  const handleSave = () => {
    if (!canSave || savingRef.current) return;
    savingRef.current = true;
    const existing = selectedActivityId && selectedActivityId !== '__CUSTOM__' ? nationalActivities.find(na => na.id === selectedActivityId) : null;
    const na: NationalActivity = {
      id: existing ? existing.id : `na-${Date.now()}`,
      strategic_priority_id: strategicPriorityId,
      strategic_objective_id: strategicObjectiveId,
      code: activeCode,
      description: name.trim(),
      uom,
      responsibility: (regionIds.length > 0 || projectIds.length > 0) && isHq ? 'Both' : (isHq ? 'HQ' : 'Region'),
      department: existing?.department || 'Operations',
      year: existing?.year || 2019,
      activity_description: description.trim(),
      eligible_region_ids: regionIds,
      eligible_project_ids: projectIds,
    };
    addNationalActivity(na);
    onSaved();
  };

  return (
    <ModalShell title="Add National Activity" onClose={onClose}>
      <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <span className="block text-[10px] font-bold text-slate-500 mb-1">1. Strategic Priority</span>
            <select value={strategicPriorityId} onChange={e => handlePriorityChange(e.target.value)} className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50">
              <option value="">Select Strategic Priority…</option>
              {strategicPriorities.map(sp => <option key={sp.id} value={sp.id}>{sp.code} — {sp.name}</option>)}
            </select>
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-500 mb-1">2. Strategic Objective</span>
            <select value={strategicObjectiveId} onChange={e => handleObjectiveChange(e.target.value)} disabled={!strategicPriorityId} className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 disabled:opacity-60">
              <option value="">{strategicPriorityId ? 'Select Strategic Objective…' : 'Select Priority first'}</option>
              {objectivesForPriority.map(so => <option key={so.id} value={so.id}>{so.code} — {so.name}</option>)}
            </select>
          </div>
        </div>

        <div>
          <span className="block text-[10px] font-bold text-slate-500 mb-1">3. Select Activity (from master list)</span>
          <select
            value={selectedActivityId}
            onChange={e => handleActivitySelect(e.target.value)}
            disabled={!strategicObjectiveId}
            className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 disabled:opacity-60 font-medium"
          >
            <option value="">{strategicObjectiveId ? 'Select an activity under this objective…' : 'Select Objective first'}</option>
            {activitiesInObjective.map(na => (
              <option key={na.id} value={na.id}>{na.code} — {na.description}</option>
            ))}
            <option value="__CUSTOM__">+ Create New Custom Activity</option>
          </select>
        </div>

        {selectedActivityId && !isCustom ? (
          <div className="space-y-3 bg-slate-50 border border-slate-200 rounded-xl p-3.5">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <span className="text-[10px] uppercase font-extrabold text-slate-400">Activity Code</span>
                <div className="text-sm font-black text-ercs-red">{activeCode}</div>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] uppercase font-extrabold text-slate-400">Unit of Measure (UOM)</span>
                <div className="text-xs font-bold text-slate-700">{uom}</div>
              </div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-extrabold text-slate-400">Activity Name</span>
              <div className="text-xs font-bold text-slate-800 mt-0.5">{name}</div>
            </div>
            {description && (
              <div>
                <span className="text-[10px] uppercase font-extrabold text-slate-400">Description</span>
                <div className="text-[11px] text-slate-600 mt-0.5">{description}</div>
              </div>
            )}
          </div>
        ) : isCustom ? (
          <div className="space-y-3 border border-dashed border-slate-300 rounded-xl p-3.5 bg-white">
            <div>
              <span className="block text-[10px] font-bold text-slate-500 mb-1">Activity Code (auto-generated)</span>
              <div className="bg-slate-50 border border-slate-200 rounded p-2 text-sm font-black text-ercs-red">
                {activeCode}
              </div>
            </div>
            <LabeledInput label="Activity Name" value={name} onChange={setName} placeholder="e.g. Provide Cash Assistance" />
            <label className="block">
              <span className="block text-[10px] font-bold text-slate-500 mb-1">Description</span>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50" />
            </label>
            <div>
              <span className="block text-[10px] font-bold text-slate-500 mb-1">Unit of Measure</span>
              <select value={uom} onChange={e => setUom(e.target.value)} className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50">
                <option value="">Select unit of measure…</option>
                {uomConfigs.map(c => <option key={c.uom} value={c.uom}>{c.uom}</option>)}
              </select>
            </div>
          </div>
        ) : null}

        {selectedActivityId && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="block text-[10px] font-bold text-slate-600 uppercase tracking-wider">Executed By (multi-select)</span>
              <button
                type="button"
                onClick={toggleSelectAll}
                className="text-[10px] font-bold text-ercs-red hover:underline"
              >
                {isAllSelected ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="mb-3 p-2 bg-slate-50 border rounded-lg">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                <input type="checkbox" checked={isHq} onChange={e => setIsHq(e.target.checked)} />
                Headquarters (HQ)
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between text-[9px] uppercase font-extrabold text-slate-400 mb-1.5">
                  <span>Regions ({regionIds.length}/{regions.length})</span>
                  <button
                    type="button"
                    onClick={() => regionIds.length === regions.length ? setRegionIds([]) : setRegionIds(regions.map(r => r.id))}
                    className="text-ercs-red hover:underline"
                  >
                    {regionIds.length === regions.length ? 'None' : 'All'}
                  </button>
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1 pr-1 border rounded p-1.5 bg-slate-50">
                  {regions.map(r => (
                    <label key={r.id} className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border rounded px-2 py-1 cursor-pointer">
                      <input type="checkbox" checked={regionIds.includes(r.id)} onChange={() => toggleRegion(r.id)} /> {r.name}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-[9px] uppercase font-extrabold text-slate-400 mb-1.5">
                  <span>Projects ({projectIds.length}/{projects.length})</span>
                  <button
                    type="button"
                    onClick={() => projectIds.length === projects.length ? setProjectIds([]) : setProjectIds(projects.map(p => p.id))}
                    className="text-ercs-red hover:underline"
                  >
                    {projectIds.length === projects.length ? 'None' : 'All'}
                  </button>
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1 pr-1 border rounded p-1.5 bg-slate-50">
                  {projects.map(p => (
                    <label key={p.id} className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border rounded px-2 py-1 cursor-pointer">
                      <input type="checkbox" checked={projectIds.includes(p.id)} onChange={() => toggleProject(p.id)} /> {p.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2 border-t">
          <button disabled={!canSave} onClick={handleSave} className="bg-ercs-red text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-40 shadow-sm">
            <Save className="w-3.5 h-3.5" /> Save National Activity
          </button>
        </div>
      </div>
    </ModalShell>
  );
};

// ============================================================
// PlanEntryWizardModal
// ============================================================
export const PlanEntryWizardModal: React.FC<{
  initial: PeWizardFormState;
  startStep: 1 | 2;
  onClose: () => void;
  onSaved: () => void;
}> = ({ initial, startStep, onClose, onSaved }) => {
  const { nationalActivities, regions, zones, projects, addProject, planEntries, addPlanEntry, updatePlanEntry, currentRole, regionActivityLinks, addRegionActivityLink, uomConfigs } = useApp();
  const [step, setStep] = useState<1 | 2>(startStep);
  const [form, setForm] = useState<PeWizardFormState>(initial);
  const [isContributing, setIsContributing] = useState(form.is_contributing !== false);
  const [addingProject, setAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const savingRef = useRef(false);

  const isEditing = !!form.id;
  const isProjectScope = form.scope_type === 'Project';
  const isBranchHead = currentRole.startsWith('Branch Head — ');
  const isZoneCoordinator = currentRole.endsWith(' coordinators');
  const currentZone = isZoneCoordinator ? zones.find(z => `${z.name} coordinators` === currentRole) : undefined;

  // ---------------- PROJECT SCOPE ----------------
  if (isProjectScope) {
    const selectedNa = nationalActivities.find(na => na.id === form.national_activity_id);
    const eligibleProjects = selectedNa ? projects.filter(p => selectedNa.eligible_project_ids.includes(p.id)) : projects;
    const isEligibleScope = !!selectedNa && !!form.project_id && selectedNa.eligible_project_ids.includes(form.project_id);
    const siblingEntries = selectedNa ? planEntries.filter(pe => pe.national_activity_id === selectedNa.id && pe.id !== form.id) : [];
    const siblingTarget = sumTarget(siblingEntries);
    const siblingBudget = sumBudget(siblingEntries);
    const thisTarget = Number(form.annual_target) || 0;
    const thisBudget = Number(form.annual_budget) || 0;
    const numbersValid = thisTarget >= 0 && thisBudget >= 0;
    const isDuplicateLink = !!selectedNa && planEntries.some(pe => pe.id !== form.id && pe.national_activity_id === selectedNa.id && pe.scope_type === 'Project' && pe.project_id === form.project_id);

    const canContinue = !!form.national_activity_id;
    const canSaveContributing = !!form.national_activity_id && isEligibleScope && !!form.activity_name.trim() && !!form.activity_description.trim() && numbersValid && !isDuplicateLink;
    const canSaveNonContributing = !!form.project_id && !!form.activity_name.trim() && !!form.uom && numbersValid;

    const activityCode = selectedNa?.code || '';

    React.useEffect(() => {
      if (form.activity_name.trim()) return;
      const label = projects.find(p => p.id === form.project_id)?.name;
      if (label && isContributing) setForm(f => ({ ...f, activity_name: label }));
    }, [form.activity_name, form.project_id, projects, isContributing]);

    const handleAddProject = () => {
      const name = newProjectName.trim();
      if (!name) return;
      const project: Project = { id: `proj-${Date.now()}`, name };
      addProject(project);
      setForm(f => ({ ...f, project_id: project.id }));
      setNewProjectName('');
      setAddingProject(false);
    };

    const handleSaveContributing = () => {
      if (!canSaveContributing || savingRef.current) return;
      savingRef.current = true;
      const pe: PlanEntry = {
        id: form.id || `pe-${Date.now()}`, national_activity_id: form.national_activity_id, scope_type: 'Project',
        project_id: form.project_id, annual_target: thisTarget, annual_budget: thisBudget,
        activity_code: selectedNa?.code || '', activity_name: form.activity_name.trim(), activity_description: form.activity_description.trim(),
        approval_status: 'Approved',
        is_contributing: true,
        uom: selectedNa?.uom,
      };
      if (isEditing) updatePlanEntry(pe); else addPlanEntry(pe);
      onSaved();
    };

    const handleSaveNonContributing = () => {
      if (!canSaveNonContributing || savingRef.current) return;
      savingRef.current = true;
      const pe: PlanEntry = {
        id: form.id || `pe-nc-${Date.now()}`,
        national_activity_id: '',
        scope_type: 'Project',
        project_id: form.project_id,
        annual_target: thisTarget,
        annual_budget: thisBudget,
        activity_code: form.activity_code || `PROJ-${Date.now().toString().slice(-4)}`,
        activity_name: form.activity_name.trim(),
        activity_description: form.activity_description.trim(),
        is_contributing: false,
        uom: form.uom || 'Number',
        approval_status: 'Approved',
      };
      if (isEditing) updatePlanEntry(pe); else addPlanEntry(pe);
      onSaved();
    };

    return (
      <ModalShell title={isEditing ? 'Edit Plan Entry' : 'Add Project Plan Entry'} onClose={onClose}>
        {!isEditing && (
          <div className="flex bg-slate-100 p-1 rounded-xl mb-4 text-xs font-bold">
            <button
              type="button"
              onClick={() => setIsContributing(true)}
              className={`flex-1 py-1.5 rounded-lg transition-all ${isContributing ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Contributing (Links to National Activity)
            </button>
            <button
              type="button"
              onClick={() => setIsContributing(false)}
              className={`flex-1 py-1.5 rounded-lg transition-all ${!isContributing ? 'bg-white text-ercs-red shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Non-Contributing (Standalone Project Activity)
            </button>
          </div>
        )}

        {isContributing ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <StepPill num={1} label="Link to Parent" active={step === 1} done={step > 1} />
              <div className="flex-1 h-px bg-slate-200" />
              <StepPill num={2} label="Execution Details" active={step === 2} done={false} />
            </div>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <span className="block text-[10px] font-bold text-slate-500 mb-1">National Activity (Parent)</span>
                  <select value={form.national_activity_id} onChange={e => setForm(f => ({ ...f, national_activity_id: e.target.value }))} disabled={isEditing} className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 disabled:opacity-60">
                    <option value="">Select the National Activity this plan entry belongs to…</option>
                    {nationalActivities.filter(na => form.project_id ? na.eligible_project_ids.includes(form.project_id) : na.eligible_project_ids.length > 0).map(na => <option key={na.id} value={na.id}>{na.code} — {na.description}</option>)}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button disabled={!canContinue} onClick={() => setStep(2)} className="bg-ercs-red text-white px-4 py-2 rounded-lg text-xs font-bold disabled:opacity-40">Continue to Execution Details</button>
                </div>
              </div>
            )}
            {step === 2 && selectedNa && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="block text-[10px] font-bold text-slate-500">Project</span>
                    {!form.lockScope && <button type="button" onClick={() => setAddingProject(a => !a)} className="text-[10px] font-bold text-ercs-red">+ Add Project</button>}
                  </div>
                  <select value={form.project_id} onChange={e => setForm(f => ({ ...f, project_id: e.target.value }))} disabled={form.lockScope} className="w-full text-xs border rounded p-2 bg-slate-50 disabled:opacity-60">
                    <option value="">Select project…</option>
                    {eligibleProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                  {addingProject && (
                    <div className="mt-2 flex gap-1.5">
                      <input value={newProjectName} onChange={e => setNewProjectName(e.target.value)} placeholder="New project name" className="flex-1 text-xs border border-slate-200 rounded p-1.5 bg-white" />
                      <button type="button" onClick={handleAddProject} className="px-2.5 py-1 rounded bg-ercs-red text-white text-[10px] font-bold">Add</button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 bg-slate-50 border rounded-lg p-3">
                    <div className="text-[10px] uppercase font-extrabold text-slate-400">Activity Code</div>
                    <div className="text-sm font-black text-ercs-red mt-1">{activityCode || '—'}</div>
                  </div>
                  <LabeledInput label="Activity Name" value={form.activity_name} onChange={v => setForm(f => ({ ...f, activity_name: v }))} />
                  <div className="col-span-2">
                    <label className="block">
                      <span className="block text-[10px] font-bold text-slate-500 mb-1">Activity Description</span>
                      <textarea value={form.activity_description} onChange={e => setForm(f => ({ ...f, activity_description: e.target.value }))} rows={3} className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50" />
                    </label>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Annual Target ({selectedNa.uom})</label>
                    <NumberInput
                      value={Number(form.annual_target) || 0}
                      onChange={v => setForm(f => ({ ...f, annual_target: String(v), annual_budget: v <= 0 ? '0' : f.annual_budget }))}
                      className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Annual Budget (ETB)</label>
                    <NumberInput
                      value={Number(form.annual_budget) || 0}
                      onChange={v => setForm(f => ({ ...f, annual_budget: String(v) }))}
                      disabled={Number(form.annual_target) <= 0}
                      className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:opacity-50"
                    />
                  </div>
                </div>
                {isDuplicateLink && <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-[11px] text-rose-700 font-semibold">This Project is already linked to {selectedNa.code}.</div>}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-[11px] text-blue-800 font-semibold space-y-1">
                  <div>This entry will contribute <b>{thisTarget.toLocaleString()} {selectedNa.uom}</b> / <b>ETB {thisBudget.toLocaleString()}</b>, alongside <b>{siblingTarget.toLocaleString()}</b> / <b>ETB {siblingBudget.toLocaleString()}</b> already committed.</div>
                </div>
                <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border text-xs font-bold">Back</button>
                  <button disabled={!canSaveContributing} onClick={handleSaveContributing} className="bg-ercs-red text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-40">
                    <Save className="w-3.5 h-3.5" /> {isEditing ? 'Update Plan Entry' : 'Save & Link'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
              <span className="font-bold">Standalone Project Activity:</span> This activity is not linked to any National Activity and is not aggregated into National/Strategic totals.
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="block text-[10px] font-bold text-slate-500">Project</span>
                {!form.lockScope && <button type="button" onClick={() => setAddingProject(a => !a)} className="text-[10px] font-bold text-ercs-red">+ Add Project</button>}
              </div>
              <select value={form.project_id} onChange={e => setForm(f => ({ ...f, project_id: e.target.value }))} disabled={form.lockScope} className="w-full text-xs border rounded p-2 bg-slate-50 disabled:opacity-60">
                <option value="">Select project…</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>

            <LabeledInput label="Activity Name" value={form.activity_name} onChange={v => setForm(f => ({ ...f, activity_name: v }))} placeholder="e.g. Conduct Community Baseline Survey" />

            <label className="block">
              <span className="block text-[10px] font-bold text-slate-500 mb-1">Activity Description</span>
              <textarea value={form.activity_description} onChange={e => setForm(f => ({ ...f, activity_description: e.target.value }))} rows={3} className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50" placeholder="Detailed activity description..." />
            </label>

            <div>
              <span className="block text-[10px] font-bold text-slate-500 mb-1">Unit of Measurement (UOM)</span>
              <select value={form.uom || ''} onChange={e => setForm(f => ({ ...f, uom: e.target.value }))} className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50">
                <option value="">Select unit of measure…</option>
                {uomConfigs.map(c => <option key={c.uom} value={c.uom}>{c.uom}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Annual Target</label>
                <NumberInput
                  value={Number(form.annual_target) || 0}
                  onChange={v => setForm(f => ({ ...f, annual_target: String(v), annual_budget: v <= 0 ? '0' : f.annual_budget }))}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Annual Budget (ETB)</label>
                <NumberInput
                  value={Number(form.annual_budget) || 0}
                  onChange={v => setForm(f => ({ ...f, annual_budget: String(v) }))}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t">
              <button disabled={!canSaveNonContributing} onClick={handleSaveNonContributing} className="bg-ercs-red text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-40 shadow-sm">
                <Save className="w-3.5 h-3.5" /> {isEditing ? 'Update Standalone Entry' : 'Save Standalone Entry'}
              </button>
            </div>
          </div>
        )}
      </ModalShell>
    );
  }

  // ---------------- REGIONAL SCOPE: Branch Head (link wizard) ----------------
  if (isBranchHead && !isEditing) {
    const region = regions.find(r => r.id === form.region_id);
    const zonesInRegion = zones.filter(z => z.region_id === form.region_id);
    const [selectedZoneIds, setSelectedZoneIds] = useState<string[]>([]);
    const naOptions = nationalActivities.filter(na => na.eligible_region_ids.includes(form.region_id));
    const selectedNa = nationalActivities.find(na => na.id === form.national_activity_id);
    const isDuplicate = !!selectedNa && regionActivityLinks.some(l => l.national_activity_id === selectedNa.id && l.region_id === form.region_id);
    const canContinue = !!form.national_activity_id && !isDuplicate;
    const canSave = canContinue && selectedZoneIds.length > 0;

    const toggleZone = (id: string) => setSelectedZoneIds(prev => prev.includes(id) ? prev.filter(z => z !== id) : [...prev, id]);

    const handleSave = () => {
      if (!canSave || savingRef.current) return;
      savingRef.current = true;
      addRegionActivityLink({
        id: `ral-${Date.now()}`, national_activity_id: form.national_activity_id, region_id: form.region_id,
        activity_name: selectedNa?.description || '', activity_description: selectedNa?.activity_description || '', eligible_zone_ids: selectedZoneIds,
      });
      onSaved();
    };

    return (
      <ModalShell title="Add Plan — Link to National Activity" onClose={onClose}>
        <div className="flex items-center gap-2 mb-4">
          <StepPill num={1} label="Link to Parent" active={step === 1} done={step > 1} />
          <div className="flex-1 h-px bg-slate-200" />
          <StepPill num={2} label="Zone Details" active={step === 2} done={false} />
        </div>
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <span className="block text-[10px] font-bold text-slate-500 mb-1">National Activity (Parent)</span>
              <select value={form.national_activity_id} onChange={e => setForm(f => ({ ...f, national_activity_id: e.target.value }))} className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50">
                <option value="">Select the National Activity this Region will execute…</option>
                {naOptions.map(na => <option key={na.id} value={na.id}>{na.code} — {na.description}</option>)}
              </select>
              {isDuplicate && <div className="text-[10px] text-rose-700 mt-1 font-semibold">Already linked to {region?.name}.</div>}
            </div>
            <div className="flex justify-end">
              <button disabled={!canContinue} onClick={() => setStep(2)} className="bg-ercs-red text-white px-4 py-2 rounded-lg text-xs font-bold disabled:opacity-40">Continue</button>
            </div>
          </div>
        )}
        {step === 2 && selectedNa && (
          <div className="space-y-4">
            {/* Item 1: inherited Name & Description from parent National Activity */}
            <div className="bg-slate-50 border rounded-lg p-3">
              <div className="text-[10px] uppercase font-extrabold text-slate-400">Activity Name (inherited from National Activity)</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">{selectedNa?.description || '—'}</div>
              <div className="text-[10px] uppercase font-extrabold text-slate-400 mt-2">Activity Description (inherited from National Activity)</div>
              <div className="text-[11px] text-slate-600 mt-0.5">{selectedNa?.activity_description || '—'}</div>
            </div>
            <div>
              {/* Item 7: Select All toggle above zones grid */}
              <div className="flex items-center justify-between mb-2">
                <span className="block text-[10px] font-bold text-slate-500">Eligible Zones (multi-select) — no Target/Budget here, each Zone enters its own</span>
                <button
                  type="button"
                  onClick={() => {
                    if (selectedZoneIds.length === zonesInRegion.length && zonesInRegion.length > 0) {
                      setSelectedZoneIds([]);
                    } else {
                      setSelectedZoneIds(zonesInRegion.map(z => z.id));
                    }
                  }}
                  className="text-[10px] font-bold text-ercs-red"
                >
                  {selectedZoneIds.length === zonesInRegion.length && zonesInRegion.length > 0 ? 'Deselect all' : 'Select all'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto">
                {zonesInRegion.map(z => (
                  <label key={z.id} className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 border rounded px-2 py-1.5 cursor-pointer">
                    <input type="checkbox" checked={selectedZoneIds.includes(z.id)} onChange={() => toggleZone(z.id)} /> {z.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border text-xs font-bold">Back</button>
              <button disabled={!canSave} onClick={handleSave} className="bg-ercs-red text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-40">
                <Save className="w-3.5 h-3.5" /> Save Region Link
              </button>
            </div>
          </div>
        )}
      </ModalShell>
    );
  }

  // ---------------- REGIONAL SCOPE: Zone Coordinator's own PlanEntry ----------------
  const eligibleLinks = currentZone
    ? regionActivityLinks.filter(l => l.region_id === currentZone.region_id && l.eligible_zone_ids.includes(currentZone.id))
    : [];
  const selectedLink = regionActivityLinks.find(l => l.id === form['region_activity_link_id' as keyof PeWizardFormState] as unknown as string)
    || eligibleLinks.find(l => l.national_activity_id === form.national_activity_id);
  const selectedNaZone = nationalActivities.find(na => na.id === form.national_activity_id);
  const thisTarget = Number(form.annual_target) || 0;
  const thisBudget = Number(form.annual_budget) || 0;
  const numbersValid = thisTarget >= 0 && thisBudget >= 0;
  const isDuplicateZoneEntry = !!selectedLink && planEntries.some(pe => pe.id !== form.id && pe.region_activity_link_id === selectedLink.id && pe.zone_id === currentZone?.id);
  const canContinueZ = !!form.national_activity_id;
  const canSaveZ = canContinueZ && !!selectedLink && numbersValid && !isDuplicateZoneEntry;

  const handleSaveZone = () => {
    if (!canSaveZ || !currentZone || !selectedLink || savingRef.current) return;
    savingRef.current = true;
    const pe: PlanEntry = {
      id: form.id || `pe-zn-${Date.now()}`, national_activity_id: selectedLink.national_activity_id, scope_type: 'Regional',
      region_id: currentZone.region_id, zone_id: currentZone.id, region_activity_link_id: selectedLink.id,
      annual_target: thisTarget, annual_budget: thisBudget, activity_code: selectedNaZone?.code || '',
      activity_name: selectedLink.activity_name, activity_description: selectedLink.activity_description, approval_status: 'Approved',
    };
    if (isEditing) updatePlanEntry(pe); else addPlanEntry(pe);
    onSaved();
  };

  return (
    <ModalShell title={isEditing ? 'Edit Plan Entry' : 'Add Plan Entry'} onClose={onClose}>
      <div className="flex items-center gap-2 mb-4">
        <StepPill num={1} label="Link to Parent" active={step === 1} done={step > 1} />
        <div className="flex-1 h-px bg-slate-200" />
        <StepPill num={2} label="Execution Details" active={step === 2} done={false} />
      </div>
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <span className="block text-[10px] font-bold text-slate-500 mb-1">National Activity (Parent)</span>
            <select value={form.national_activity_id} onChange={e => setForm(f => ({ ...f, national_activity_id: e.target.value }))} disabled={isEditing} className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 disabled:opacity-60">
              <option value="">Select…</option>
              {eligibleLinks.map(l => {
                const na = nationalActivities.find(n => n.id === l.national_activity_id);
                return <option key={l.id} value={l.national_activity_id}>{na?.code} — {na?.description}</option>;
              })}
            </select>
            {eligibleLinks.length === 0 && <div className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded p-2 mt-1 font-semibold">No National Activity is linked to your Zone yet. Ask your Branch Head.</div>}
          </div>
          <div className="flex justify-end">
            <button disabled={!canContinueZ} onClick={() => setStep(2)} className="bg-ercs-red text-white px-4 py-2 rounded-lg text-xs font-bold disabled:opacity-40">Continue</button>
          </div>
        </div>
      )}
      {step === 2 && selectedLink && selectedNaZone && (
        <div className="space-y-4">
          <div className="bg-slate-50 border rounded-lg p-3">
            <div className="text-[10px] uppercase font-extrabold text-slate-400">Activity Code (inherited, read-only)</div>
            <div className="text-sm font-black text-ercs-red mt-1">{selectedNaZone.code}</div>
            <div className="text-[10px] uppercase font-extrabold text-slate-400 mt-2">Activity Name (inherited, read-only)</div>
            <div className="text-xs font-bold text-slate-800 mt-0.5">{selectedLink.activity_name}</div>
            <div className="text-[10px] uppercase font-extrabold text-slate-400 mt-2">Description (inherited, read-only)</div>
            <div className="text-[11px] text-slate-600 mt-0.5">{selectedLink.activity_description}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1">Annual Target ({selectedNaZone.uom})</label>
              <NumberInput
                value={Number(form.annual_target) || 0}
                onChange={v => setForm(f => ({ ...f, annual_target: String(v), annual_budget: v <= 0 ? '0' : f.annual_budget }))}
                className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1">Annual Budget (ETB)</label>
              <NumberInput
                value={Number(form.annual_budget) || 0}
                onChange={v => setForm(f => ({ ...f, annual_budget: String(v) }))}
                disabled={Number(form.annual_target) <= 0}
                className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:opacity-50"
              />
            </div>
          </div>
          {isDuplicateZoneEntry && <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-[11px] text-rose-700 font-semibold">Your Zone already has a Plan Entry against this National Activity.</div>}
          {!numbersValid && <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-[11px] text-rose-700 font-semibold">Target and Budget must be zero or greater.</div>}
          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border text-xs font-bold">Back</button>
            <button disabled={!canSaveZ} onClick={handleSaveZone} className="bg-ercs-red text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-40">
              <Save className="w-3.5 h-3.5" /> {isEditing ? 'Update' : 'Save'} Plan Entry
            </button>
          </div>
        </div>
      )}
    </ModalShell>
  );
};

const StepPill: React.FC<{ num: number; label: string; active: boolean; done: boolean }> = ({ num, label, active, done }) => (
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold ${active ? 'bg-red-50 text-ercs-red' : done ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-400'}`}>
    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${active ? 'bg-ercs-red text-white' : done ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-white'}`}>{num}</span>
    {label}
  </div>
);

const LabeledInput: React.FC<{ label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }> = ({ label, value, onChange, type = 'text', placeholder }) => (
  <label className="block">
    <span className="block text-[10px] font-bold text-slate-500 mb-1">{label}</span>
    <input type={type} min={type === 'number' ? 0 : undefined} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100" />
  </label>
);

const ModalShell: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b shrink-0">
        <button onClick={onClose} className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-ercs-red shrink-0"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>
        <h3 className="text-sm font-black text-slate-800 text-center flex-1 truncate">{title}</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 shrink-0" aria-label="Close"><X className="w-4 h-4" /></button>
      </div>
      <div className="p-5 overflow-y-auto">{children}</div>
    </div>
  </div>
);

export const ConfirmDeleteModal: React.FC<{ label: string; onCancel: () => void; onConfirm: () => void }> = ({ label, onCancel, onConfirm }) => (
  <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4">
    <div className="bg-white max-w-md w-full rounded-xl shadow-2xl p-5">
      <div className="flex items-center gap-2 text-red-700 font-black text-sm"><Trash2 className="w-5 h-5" /> Delete "{label}"?</div>
      <p className="text-xs text-slate-600 mt-3">This also removes any linked Quarterly Plan and Quarterly Actual records.</p>
      <div className="mt-5 flex justify-end gap-2">
        <button onClick={onCancel} className="px-4 py-2 rounded-lg border text-xs font-bold">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold">Delete</button>
      </div>
    </div>
  </div>
);

const ConfirmDeleteNAModal: React.FC<{ label: string; onCancel: () => void; onConfirm: () => void }> = ({ label, onCancel, onConfirm }) => (
  <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4">
    <div className="bg-white max-w-md w-full rounded-xl shadow-2xl p-5">
      <div className="flex items-center gap-2 text-red-700 font-black text-sm"><Trash2 className="w-5 h-5" /> Delete "{label}"?</div>
      <p className="text-xs text-slate-600 mt-3">This National Activity has no linked Plan Entries or Region links, so it can be safely removed.</p>
      <div className="mt-5 flex justify-end gap-2">
        <button onClick={onCancel} className="px-4 py-2 rounded-lg border text-xs font-bold">Cancel</button>
        <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold">Delete</button>
      </div>
    </div>
  </div>
);
  