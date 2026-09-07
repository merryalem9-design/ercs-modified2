// src/components/common/NationalActivityDrillDown.tsx
import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from './StatusBadge';
import { BudgetStatusBadge } from './BudgetStatusBadge';
import {
  sumPlannedTarget,
  sumPlannedBudget,
  sumActual,
  sumExpenditure,
  achievementPct,
  budgetUtilizationPct,
  convertToBeneficiaries,
} from '../../utils/calculations';
import { PlanEntry, Project, Region, Zone, QuarterFilterValue, QuarterId } from '../../types';
import {
  Building2,
  MapPin,
  FolderGit2,
  Layers,
  Filter,
  CheckCircle2,
  Calendar,
  Users,
  ChevronRight,
  TrendingUp,
  Target,
  Wallet,
  PlusCircle,
} from 'lucide-react';
import { PlanEntryWizardModal, type PeWizardFormState } from '../plan/PlanEntryWizardModal';

interface NationalActivityDrillDownProps {
  nationalActivityId: string;
  quarterId?: QuarterFilterValue;
  isBranchHead?: boolean;
  assignedRegionId?: string;
}

export const NationalActivityDrillDown: React.FC<NationalActivityDrillDownProps> = ({
  nationalActivityId,
  quarterId: propQuarterId,
  isBranchHead: propIsBranchHead,
  assignedRegionId: propAssignedRegionId,
}) => {
  const {
    nationalActivities,
    projects,
    regions,
    zones,
    planEntries,
    quarterlyPlans,
    quarterlyActuals,
    regionActivityLinks,
    uomConfigs,
    filters,
    currentRole,
  } = useApp();

  const q = propQuarterId || filters.quarterId || 'ALL';

  const isBranchHead = propIsBranchHead !== undefined
    ? propIsBranchHead
    : currentRole.startsWith('Branch Head — ');

  const assignedRegion = propAssignedRegionId
    ? regions.find(r => r.id === propAssignedRegionId)
    : isBranchHead
    ? regions.find(r => `Branch Head — ${r.name}` === currentRole)
    : undefined;

  const na = nationalActivities.find(n => n.id === nationalActivityId);

  // Scoped filters inside this drill-down
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>(assignedRegion ? assignedRegion.id : 'ALL');
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>('ALL');

  // Currently selected contributor for detailed tabular breakdown
  const [selectedContributor, setSelectedContributor] = useState<{
    type: 'project' | 'region' | 'zone';
    id: string;
    name: string;
  } | null>(null);

  // Modal wizard state for "+ Enter target/budget" prompt
  const [modalWizard, setModalWizard] = useState<null | { initial: PeWizardFormState; startStep: 1 | 2 }>(null);

  // In-scope plan entries for this national activity
  const naEntries = useMemo(() => {
    return planEntries.filter(pe => pe.national_activity_id === nationalActivityId && pe.is_contributing !== false);
  }, [planEntries, nationalActivityId]);

  // Contributing Projects: linked via eligible_project_ids OR project_targets OR existing PlanEntries
  const contributingProjects = useMemo(() => {
    if (!na) return [];
    const eligibleSet = new Set(na.eligible_project_ids || []);
    if (na.project_targets) {
      Object.keys(na.project_targets).forEach(k => eligibleSet.add(k));
    }
    naEntries
      .filter(pe => pe.scope_type === 'Project' && pe.project_id)
      .forEach(pe => eligibleSet.add(pe.project_id as string));

    const activeProjects = projects.filter(p => eligibleSet.has(p.id));

    return activeProjects.map(proj => {
      const projEntries = naEntries.filter(pe => pe.scope_type === 'Project' && pe.project_id === proj.id);
      
      const seeded = na.project_targets?.[proj.id];
      const seededTarget = seeded?.target ?? 0;
      const seededBudget = seeded?.budget ?? 0;

      const planTarget = sumPlannedTarget(projEntries, quarterlyPlans, q);
      const planBudget = sumPlannedBudget(projEntries, quarterlyPlans, q);

      // Annual or quarter target/budget from baseline or plan
      const target = q === 'ALL'
        ? (seededTarget > 0 ? seededTarget : planTarget)
        : (planTarget > 0 ? planTarget : seededTarget);

      const budget = q === 'ALL'
        ? (seededBudget > 0 ? seededBudget : planBudget)
        : (planBudget > 0 ? planBudget : seededBudget);

      const hasBaseline = seededTarget > 0 || seededBudget > 0 || planTarget > 0 || planBudget > 0;

      const actual = sumActual(projEntries, quarterlyActuals, q);
      const spent = sumExpenditure(projEntries, quarterlyActuals, q);
      const ach = achievementPct(actual, target);
      const util = budgetUtilizationPct(spent, budget);
      const beneficiaries = convertToBeneficiaries(target, na.uom, uomConfigs);
      const actualBeneficiaries = convertToBeneficiaries(actual, na.uom, uomConfigs);

      return {
        project: proj,
        entries: projEntries,
        target,
        budget,
        actual,
        spent,
        ach,
        util,
        beneficiaries,
        actualBeneficiaries,
        hasBaseline,
        seededTarget,
        seededBudget,
      };
    });
  }, [na, naEntries, projects, quarterlyPlans, quarterlyActuals, q, uomConfigs]);

  // Contributing Regions: linked via eligible_region_ids OR regional_targets OR RegionActivityLinks OR PlanEntries
  const contributingRegions = useMemo(() => {
    if (!na) return [];
    const eligibleSet = new Set(na.eligible_region_ids || []);
    if (na.regional_targets) {
      Object.entries(na.regional_targets).forEach(([rId, t]) => {
        if ((t?.target ?? 0) > 0 || (t?.budget ?? 0) > 0) {
          eligibleSet.add(rId);
        }
      });
    }
    naEntries
      .filter(pe => pe.scope_type === 'Regional' && pe.region_id)
      .forEach(pe => eligibleSet.add(pe.region_id as string));
    regionActivityLinks
      .filter(l => l.national_activity_id === na.id)
      .forEach(l => eligibleSet.add(l.region_id));

    const activeRegions = regions.filter(r => eligibleSet.has(r.id));

    return activeRegions.map(reg => {
      const regEntries = naEntries.filter(pe => pe.scope_type === 'Regional' && pe.region_id === reg.id);
      
      const seeded = na.regional_targets?.[reg.id];
      const seededTarget = seeded?.target ?? 0;
      const seededBudget = seeded?.budget ?? 0;

      const planTarget = sumPlannedTarget(regEntries, quarterlyPlans, q);
      const planBudget = sumPlannedBudget(regEntries, quarterlyPlans, q);

      const target = q === 'ALL'
        ? (seededTarget > 0 ? seededTarget : planTarget)
        : (planTarget > 0 ? planTarget : seededTarget);

      const budget = q === 'ALL'
        ? (seededBudget > 0 ? seededBudget : planBudget)
        : (planBudget > 0 ? planBudget : seededBudget);

      const hasBaseline = seededTarget > 0 || seededBudget > 0 || planTarget > 0 || planBudget > 0;

      const actual = sumActual(regEntries, quarterlyActuals, q);
      const spent = sumExpenditure(regEntries, quarterlyActuals, q);
      const ach = achievementPct(actual, target);
      const util = budgetUtilizationPct(spent, budget);
      const beneficiaries = convertToBeneficiaries(target, na.uom, uomConfigs);
      const actualBeneficiaries = convertToBeneficiaries(actual, na.uom, uomConfigs);

      // Zone-level breakdown for this region
      const regionZones = zones.filter(z => z.region_id === reg.id);
      const contributingZones = regionZones
        .map(z => {
          const zEntries = regEntries.filter(pe => pe.zone_id === z.id);
          const zTarget = sumPlannedTarget(zEntries, quarterlyPlans, q);
          const zBudget = sumPlannedBudget(zEntries, quarterlyPlans, q);
          const zActual = sumActual(zEntries, quarterlyActuals, q);
          const zSpent = sumExpenditure(zEntries, quarterlyActuals, q);
          const zAch = achievementPct(zActual, zTarget);
          const zUtil = budgetUtilizationPct(zSpent, zBudget);
          return {
            zone: z,
            entries: zEntries,
            target: zTarget,
            budget: zBudget,
            actual: zActual,
            spent: zSpent,
            ach: zAch,
            util: zUtil,
          };
        })
        .filter((item): item is NonNullable<typeof item> => item.entries.length > 0);

      return {
        region: reg,
        entries: regEntries,
        target,
        budget,
        actual,
        spent,
        ach,
        util,
        beneficiaries,
        actualBeneficiaries,
        hasBaseline,
        seededTarget,
        seededBudget,
        zones: contributingZones,
      };
    });
  }, [na, naEntries, regionActivityLinks, regions, zones, quarterlyPlans, quarterlyActuals, q, uomConfigs]);

  // Scoped filtering logic
  const filteredProjects = useMemo(() => {
    if (selectedProjectFilter !== 'ALL') {
      return contributingProjects.filter(cp => cp.project.id === selectedProjectFilter);
    }
    return contributingProjects;
  }, [contributingProjects, selectedProjectFilter]);

  const filteredRegions = useMemo(() => {
    let result = contributingRegions;
    if (isBranchHead && assignedRegion) {
      result = result.filter(cr => cr.region.id === assignedRegion.id);
    } else if (selectedRegionFilter !== 'ALL') {
      result = result.filter(cr => cr.region.id === selectedRegionFilter);
    }
    return result;
  }, [contributingRegions, selectedRegionFilter, isBranchHead, assignedRegion]);

  // Aggregate Regional Performance
  const regionalTotalTarget = filteredRegions.reduce((s, r) => s + r.target, 0);
  const regionalTotalBudget = filteredRegions.reduce((s, r) => s + r.budget, 0);
  const regionalTotalActual = filteredRegions.reduce((s, r) => s + r.actual, 0);
  const regionalTotalSpent = filteredRegions.reduce((s, r) => s + r.spent, 0);
  const regionalAch = achievementPct(regionalTotalActual, regionalTotalTarget);
  const regionalUtil = budgetUtilizationPct(regionalTotalSpent, regionalTotalBudget);

  // Aggregate Project Performance
  const projectTotalTarget = filteredProjects.reduce((s, p) => s + p.target, 0);
  const projectTotalBudget = filteredProjects.reduce((s, p) => s + p.budget, 0);
  const projectTotalActual = filteredProjects.reduce((s, p) => s + p.actual, 0);
  const projectTotalSpent = filteredProjects.reduce((s, p) => s + p.spent, 0);
  const projectAch = achievementPct(projectTotalActual, projectTotalTarget);
  const projectUtil = budgetUtilizationPct(projectTotalSpent, projectTotalBudget);

  const hasAnyContributors = contributingProjects.length > 0 || contributingRegions.length > 0;

  if (!na) {
    return (
      <div className="p-4 bg-slate-50 text-slate-500 text-xs rounded-lg text-center">
        Activity not found.
      </div>
    );
  }

  if (!hasAnyContributors) {
    return (
      <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-center space-y-2">
        <div className="text-xs font-bold text-slate-600">No Contributing Projects or Regions Linked Yet</div>
        <p className="text-[11px] text-slate-400 max-w-md mx-auto">
          Activity <span className="font-semibold text-slate-700">{na.code}</span> does not currently have any active Project or Regional Plan Entries linked to it.
        </p>
      </div>
    );
  }

  // Quarters to display in detailed breakdown
  const quarterCols: QuarterId[] = ['Q1', 'Q2', 'Q3', 'Q4'];

  // Resolve entries for the currently selected contributor (for tabular breakdown)
  const activeDetailEntries = useMemo(() => {
    if (!selectedContributor) return [];
    if (selectedContributor.type === 'project') {
      return naEntries.filter(pe => pe.scope_type === 'Project' && pe.project_id === selectedContributor.id);
    }
    if (selectedContributor.type === 'region') {
      return naEntries.filter(pe => pe.scope_type === 'Regional' && pe.region_id === selectedContributor.id);
    }
    if (selectedContributor.type === 'zone') {
      return naEntries.filter(pe => pe.scope_type === 'Regional' && pe.zone_id === selectedContributor.id);
    }
    return [];
  }, [selectedContributor, naEntries]);

  return (
    <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 my-2 space-y-4 text-xs text-left">
      {/* Header & Scoped Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-ercs-red text-white text-[10px] font-extrabold px-2 py-0.5 rounded">
              {na.code}
            </span>
            <span className="font-bold text-slate-900 text-sm">
              Contributor Drill-Down: {na.description}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Unit of Measure: <span className="font-semibold text-slate-700">{na.uom}</span> · Period: <span className="font-semibold text-slate-700">{q}</span>
          </p>
        </div>

        {/* Scoped Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filter Contributors:</span>
          </div>

          {!isBranchHead && (
            <select
              value={selectedRegionFilter}
              onChange={e => {
                setSelectedRegionFilter(e.target.value);
                setSelectedContributor(null);
              }}
              className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 font-medium text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-ercs-red"
            >
              <option value="ALL">All Regions ({contributingRegions.length})</option>
              {contributingRegions.map(cr => (
                <option key={cr.region.id} value={cr.region.id}>
                  Region: {cr.region.name}
                </option>
              ))}
            </select>
          )}

          <select
            value={selectedProjectFilter}
            onChange={e => {
              setSelectedProjectFilter(e.target.value);
              setSelectedContributor(null);
            }}
            className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2 py-1 font-medium text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-ercs-red"
          >
            <option value="ALL">All Projects ({contributingProjects.length})</option>
            {contributingProjects.map(cp => (
              <option key={cp.project.id} value={cp.project.id}>
                Project: {cp.project.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Two KPI Card Groups: Project & Regional Aggregates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Project KPI Card */}
        <div className="bg-gradient-to-br from-purple-50/80 to-fuchsia-50/50 border border-purple-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-purple-100 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-purple-600 text-white">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Project Aggregated Performance
                </span>
                <div className="text-[10px] text-slate-500 font-medium">
                  {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'} Contributing
                </div>
              </div>
            </div>
            <StatusBadge achievementPct={projectAch} hasActuals={projectTotalActual > 0} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/80 p-2.5 rounded-lg border border-purple-100">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Target & Achieved</div>
              <div className="text-sm font-black text-slate-900 mt-0.5">
                {projectTotalActual.toLocaleString()} <span className="text-[10px] font-normal text-slate-500">/ {projectTotalTarget.toLocaleString()} {na.uom}</span>
              </div>
              <div className="text-[10px] font-bold text-purple-700 mt-0.5">
                {projectAch.toFixed(1)}% achieved
              </div>
            </div>

            <div className="bg-white/80 p-2.5 rounded-lg border border-purple-100">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Budget & Spent</div>
              <div className="text-sm font-black text-slate-900 mt-0.5">
                ETB {projectTotalSpent.toLocaleString()}
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-[10px] text-slate-500">Plan: ETB {projectTotalBudget.toLocaleString()}</span>
                <BudgetStatusBadge utilizationPct={projectUtil} hasSpend={projectTotalSpent > 0} />
              </div>
            </div>
          </div>
        </div>

        {/* Regional KPI Card */}
        <div className="bg-gradient-to-br from-blue-50/80 to-sky-50/50 border border-blue-200 rounded-xl p-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-blue-100 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-600 text-white">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Regional Aggregated Performance
                </span>
                <div className="text-[10px] text-slate-500 font-medium">
                  {filteredRegions.length} {filteredRegions.length === 1 ? 'Region' : 'Regions'} Contributing
                </div>
              </div>
            </div>
            <StatusBadge achievementPct={regionalAch} hasActuals={regionalTotalActual > 0} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/80 p-2.5 rounded-lg border border-blue-100">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Target & Achieved</div>
              <div className="text-sm font-black text-slate-900 mt-0.5">
                {regionalTotalActual.toLocaleString()} <span className="text-[10px] font-normal text-slate-500">/ {regionalTotalTarget.toLocaleString()} {na.uom}</span>
              </div>
              <div className="text-[10px] font-bold text-blue-700 mt-0.5">
                {regionalAch.toFixed(1)}% achieved
              </div>
            </div>

            <div className="bg-white/80 p-2.5 rounded-lg border border-blue-100">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Budget & Spent</div>
              <div className="text-sm font-black text-slate-900 mt-0.5">
                ETB {regionalTotalSpent.toLocaleString()}
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-[10px] text-slate-500">Plan: ETB {regionalTotalBudget.toLocaleString()}</span>
                <BudgetStatusBadge utilizationPct={regionalUtil} hasSpend={regionalTotalSpent > 0} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grouped Sub-sections: Contributing Projects (Top) & Contributing Regions/Zones (Underneath) */}
      <div className="flex flex-col gap-6">
        {/* Sub-section 1: Contributing Projects */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs flex flex-col">
          <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-xs">
              <FolderGit2 className="w-4 h-4 text-purple-600" />
              <span>Contributing Projects ({filteredProjects.length})</span>
            </div>
            <span className="text-[10px] text-slate-400">Click a project to view detailed breakdown</span>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="p-6 text-center text-slate-400 text-xs italic">
              No projects match current selection.
            </div>
          ) : (
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                  <tr>
                    <th className="p-2.5">Project Details</th>
                    <th className="p-2.5 text-right">Target ({na.uom})</th>
                    <th className="p-2.5 text-right">Actual</th>
                    <th className="p-2.5 text-center">Ach. %</th>
                    <th className="p-2.5 text-right">Budget</th>
                    <th className="p-2.5 text-right">Spent</th>
                    <th className="p-2.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProjects.map(cp => {
                    const isSelected = selectedContributor?.type === 'project' && selectedContributor.id === cp.project.id;
                    return (
                      <tr
                        key={cp.project.id}
                        onClick={() =>
                          setSelectedContributor(isSelected ? null : { type: 'project', id: cp.project.id, name: cp.project.name })
                        }
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-purple-100/70 font-semibold' : 'hover:bg-purple-50/50'
                        }`}
                      >
                        <td className="p-2.5 text-slate-800">
                          <div className="flex items-center gap-1.5 font-bold">
                            <FolderGit2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                            <span>{cp.project.name}</span>
                          </div>
                          {cp.project.description && (
                            <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 font-normal">
                              {cp.project.description}
                            </div>
                          )}
                          <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[10px] text-slate-500 font-medium">
                            {cp.project.donor && (
                              <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200 font-semibold">
                                Donor: {cp.project.donor}
                              </span>
                            )}
                            {cp.project.location && (
                              <span
                                className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 max-w-2xl truncate"
                                title={cp.project.location}
                              >
                                Loc: {cp.project.location}
                              </span>
                            )}
                            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                              {cp.project.currency || 'ETB'}
                            </span>
                          </div>
                        </td>
                        <td className="p-2.5 text-right whitespace-nowrap">
                          {cp.hasBaseline ? (
                            <span className="font-semibold text-slate-800">{cp.target.toLocaleString()}</span>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setModalWizard({
                                  initial: {
                                    strategicPriorityId: na.strategic_priority_id || '',
                                    national_activity_id: na.id,
                                    scope_type: 'Project',
                                    region_id: '',
                                    project_id: cp.project.id,
                                    annual_target: '',
                                    annual_budget: '',
                                    activity_name: na.description || '',
                                    activity_description: na.activity_description || na.description || '',
                                    lockScope: true,
                                  },
                                  startStep: 2,
                                });
                              }}
                              className="inline-flex items-center gap-1 text-[10px] font-bold text-ercs-red bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2 py-0.5 rounded transition-colors"
                            >
                              + Enter target/budget
                            </button>
                          )}
                        </td>
                        <td className="p-2.5 text-right whitespace-nowrap font-bold text-blue-700">
                          {cp.actual.toLocaleString()}
                        </td>
                        <td className="p-2.5 text-center whitespace-nowrap font-semibold">
                          {cp.ach.toFixed(1)}%
                        </td>
                        <td className="p-2.5 text-right whitespace-nowrap text-slate-600">
                          {cp.hasBaseline ? (
                            <span>{cp.project.currency || 'ETB'} {cp.budget.toLocaleString()}</span>
                          ) : (
                            <span className="text-slate-400 italic text-[11px]">—</span>
                          )}
                        </td>
                        <td className="p-2.5 text-right whitespace-nowrap text-slate-900 font-semibold">
                          {cp.project.currency || 'ETB'} {cp.spent.toLocaleString()}
                        </td>
                        <td className="p-2.5 text-center whitespace-nowrap">
                          <StatusBadge achievementPct={cp.ach} hasActuals={cp.actual > 0} />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Sub-section 2: Contributing Regions & Zones */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs flex flex-col">
          <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-slate-800 text-xs">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span>Contributing Regions / Zones ({filteredRegions.length})</span>
            </div>
            <span className="text-[10px] text-slate-400">Click a region/zone to view detailed breakdown</span>
          </div>

          {filteredRegions.length === 0 ? (
            <div className="p-6 text-center text-slate-400 text-xs italic">
              No regions match current selection.
            </div>
          ) : (
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200 text-[11px]">
                  <tr>
                    <th className="p-2.5">Region / Zone</th>
                    <th className="p-2.5 text-right">Target ({na.uom})</th>
                    <th className="p-2.5 text-right">Actual</th>
                    <th className="p-2.5 text-center">Ach. %</th>
                    <th className="p-2.5 text-right">Budget (ETB)</th>
                    <th className="p-2.5 text-right">Spent (ETB)</th>
                    <th className="p-2.5 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRegions.map(cr => {
                    const isSelected = selectedContributor?.type === 'region' && selectedContributor.id === cr.region.id;
                    const showZoneRows = isBranchHead || cr.zones.length > 0;

                    return (
                      <React.Fragment key={cr.region.id}>
                        <tr
                          onClick={() =>
                            setSelectedContributor(isSelected ? null : { type: 'region', id: cr.region.id, name: `Region: ${cr.region.name}` })
                          }
                          className={`cursor-pointer transition-colors font-bold ${
                            isSelected ? 'bg-blue-100/70' : 'hover:bg-blue-50/50 bg-slate-50/40'
                          }`}
                        >
                          <td className="p-2.5 text-slate-900 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            <span>{cr.region.name}</span>
                            {cr.zones.length > 0 && (
                              <span className="text-[9px] font-normal px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800">
                                {cr.zones.length} {cr.zones.length === 1 ? 'Zone' : 'Zones'}
                              </span>
                            )}
                          </td>
                          <td className="p-2.5 text-right whitespace-nowrap">
                            {cr.hasBaseline ? (
                              cr.target.toLocaleString()
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setModalWizard({
                                    initial: {
                                      strategicPriorityId: na.strategic_priority_id || '',
                                      national_activity_id: na.id,
                                      scope_type: 'Regional',
                                      region_id: cr.region.id,
                                      project_id: '',
                                      annual_target: '',
                                      annual_budget: '',
                                      activity_name: na.description || '',
                                      activity_description: na.activity_description || na.description || '',
                                      lockScope: true,
                                    },
                                    startStep: 2,
                                  });
                                }}
                                className="inline-flex items-center gap-1 text-[10px] font-bold text-ercs-red bg-rose-50 hover:bg-rose-100 border border-rose-200 px-2 py-0.5 rounded transition-colors"
                              >
                                + Enter target/budget
                              </button>
                            )}
                          </td>
                          <td className="p-2.5 text-right whitespace-nowrap text-blue-700">{cr.actual.toLocaleString()}</td>
                          <td className="p-2.5 text-center whitespace-nowrap">{cr.ach.toFixed(1)}%</td>
                          <td className="p-2.5 text-right whitespace-nowrap text-slate-600">
                            {cr.hasBaseline ? cr.budget.toLocaleString() : '—'}
                          </td>
                          <td className="p-2.5 text-right whitespace-nowrap text-slate-900">{cr.spent.toLocaleString()}</td>
                          <td className="p-2.5 text-center whitespace-nowrap">
                            <StatusBadge achievementPct={cr.ach} hasActuals={cr.actual > 0} />
                          </td>
                        </tr>

                        {/* Zone-level rows if present */}
                        {showZoneRows && cr.zones.map(cz => {
                          const isZoneSelected = selectedContributor?.type === 'zone' && selectedContributor.id === cz.zone.id;
                          return (
                            <tr
                              key={cz.zone.id}
                              onClick={() =>
                                setSelectedContributor(
                                  isZoneSelected ? null : { type: 'zone', id: cz.zone.id, name: `Zone: ${cz.zone.name} (${cr.region.name})` }
                                )
                              }
                              className={`cursor-pointer transition-colors text-[11px] ${
                                isZoneSelected ? 'bg-blue-50 font-semibold' : 'hover:bg-slate-50/80 bg-white'
                              }`}
                            >
                              <td className="p-2 pl-7 text-slate-700 flex items-center gap-1">
                                <span className="text-slate-300">↳</span>
                                <span className="font-medium text-slate-700">{cz.zone.name}</span>
                              </td>
                              <td className="p-2 text-right whitespace-nowrap text-slate-600">{cz.target.toLocaleString()}</td>
                              <td className="p-2 text-right whitespace-nowrap font-medium text-blue-600">{cz.actual.toLocaleString()}</td>
                              <td className="p-2 text-center whitespace-nowrap text-slate-600">{cz.ach.toFixed(1)}%</td>
                              <td className="p-2 text-right whitespace-nowrap text-slate-500">{cz.budget.toLocaleString()}</td>
                              <td className="p-2 text-right whitespace-nowrap text-slate-700">{cz.spent.toLocaleString()}</td>
                              <td className="p-2 text-center whitespace-nowrap">
                                <StatusBadge achievementPct={cz.ach} hasActuals={cz.actual > 0} />
                              </td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Selected Contributor Detailed Tabular Breakdown */}
      {selectedContributor && (
        <div className="bg-white border-2 border-indigo-200 rounded-xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs">
                {selectedContributor.type.toUpperCase()}
              </span>
              <div>
                <span className="font-extrabold text-slate-900 text-sm">
                  Detailed Tabular Breakdown: {selectedContributor.name}
                </span>
                <div className="text-[11px] text-slate-500">
                  Target, Budget, Actual & Expenditure across quarters for Activity {na.code}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedContributor(null)}
              className="text-xs text-slate-400 hover:text-slate-600 font-medium px-2 py-1 rounded bg-slate-100"
            >
              Close Breakdown
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg">
              <thead className="bg-indigo-50/70 text-indigo-950 font-bold border-b border-indigo-200">
                <tr>
                  <th className="p-2.5">Scope / Entry</th>
                  <th className="p-2.5 text-right">Annual Target</th>
                  <th className="p-2.5 text-right">Annual Actual</th>
                  <th className="p-2.5 text-right">Achievement %</th>
                  <th className="p-2.5 text-right">Annual Budget (ETB)</th>
                  <th className="p-2.5 text-right">Annual Spent (ETB)</th>
                  <th className="p-2.5 text-right">Utilization %</th>
                  {quarterCols.map(qid => (
                    <th key={qid} className="p-2 text-center bg-blue-50/60 border-l border-indigo-100 whitespace-nowrap">
                      {qid} Target / Actual
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeDetailEntries.length === 0 ? (
                  <tr className="hover:bg-indigo-50/30">
                    <td className="p-2.5 font-semibold text-slate-800">
                      <div>{na.description}</div>
                      <div className="text-[10px] text-amber-700 font-normal mt-0.5">
                        Seeded AOP Baseline (Quarterly split not yet submitted in Step 2)
                      </div>
                    </td>
                    <td className="p-2.5 text-right font-bold whitespace-nowrap">
                      {((selectedContributor.type === 'project'
                        ? na.project_targets?.[selectedContributor.id]?.target
                        : na.regional_targets?.[selectedContributor.id]?.target) ?? 0).toLocaleString()} {na.uom}
                    </td>
                    <td className="p-2.5 text-right font-bold text-slate-400 whitespace-nowrap">
                      0
                    </td>
                    <td className="p-2.5 text-right whitespace-nowrap font-black text-slate-400">
                      0.0%
                    </td>
                    <td className="p-2.5 text-right whitespace-nowrap">
                      {((selectedContributor.type === 'project'
                        ? na.project_targets?.[selectedContributor.id]?.budget
                        : na.regional_targets?.[selectedContributor.id]?.budget) ?? 0).toLocaleString()}
                    </td>
                    <td className="p-2.5 text-right whitespace-nowrap font-semibold text-slate-400">
                      0
                    </td>
                    <td className="p-2.5 text-right whitespace-nowrap font-bold text-slate-400">
                      0.0%
                    </td>
                    {quarterCols.map(qid => (
                      <td key={qid} className="p-2 text-center bg-blue-50/30 border-l border-indigo-100 whitespace-nowrap text-[11px] text-slate-400">
                        — / —
                      </td>
                    ))}
                  </tr>
                ) : (
                  activeDetailEntries.map(entry => {
                    const entryTarget = sumPlannedTarget([entry], quarterlyPlans, q);
                    const entryActual = sumActual([entry], quarterlyActuals, q);
                    const entryBudget = sumPlannedBudget([entry], quarterlyPlans, q);
                    const entrySpent = sumExpenditure([entry], quarterlyActuals, q);
                    const entryAch = achievementPct(entryActual, entryTarget);
                    const entryUtil = budgetUtilizationPct(entrySpent, entryBudget);

                    return (
                      <tr key={entry.id} className="hover:bg-indigo-50/30">
                        <td className="p-2.5 font-semibold text-slate-800">
                          {entry.activity_name || na.description}
                        </td>
                        <td className="p-2.5 text-right font-bold whitespace-nowrap">
                          {entryTarget.toLocaleString()} {na.uom}
                        </td>
                        <td className="p-2.5 text-right font-bold text-blue-700 whitespace-nowrap">
                          {entryActual.toLocaleString()}
                        </td>
                        <td className="p-2.5 text-right whitespace-nowrap font-black">
                          <span className={entryAch >= 100 ? 'text-emerald-700' : entryAch >= 60 ? 'text-amber-700' : 'text-rose-700'}>
                            {entryAch.toFixed(1)}%
                          </span>
                        </td>
                        <td className="p-2.5 text-right whitespace-nowrap">
                          {entryBudget.toLocaleString()}
                        </td>
                        <td className="p-2.5 text-right whitespace-nowrap font-semibold">
                          {entrySpent.toLocaleString()}
                        </td>
                        <td className="p-2.5 text-right whitespace-nowrap font-bold text-slate-700">
                          {entryUtil.toFixed(1)}%
                        </td>
                        {quarterCols.map(qid => {
                          const qp = quarterlyPlans.find(p => p.plan_entry_id === entry.id && p.quarter_id === qid);
                          const qa = quarterlyActuals.find(a => a.plan_entry_id === entry.id && a.quarter_id === qid);
                          const hasActual = qa && (qa.actual > 0 || qa.expenditure > 0);
                          return (
                            <td key={qid} className={`p-2 text-right border-l border-indigo-100 whitespace-nowrap text-[11px] ${hasActual ? 'bg-blue-100/50' : 'bg-blue-50/30'}`}>
                              <div>
                                <span className="font-semibold text-slate-700" title="Quarterly Target">{qp?.target ?? 0}</span>
                                <span className="text-slate-400"> / </span>
                                <span className={`font-bold ${hasActual ? 'text-blue-700' : 'text-slate-400'}`} title="Quarterly Actual Achieved">
                                  {qa?.actual ?? 0}
                                </span>
                              </div>
                              {qa && qa.expenditure > 0 && (
                                <div className="text-[9px] text-slate-500 font-medium mt-0.5" title="Quarterly Expenditure">
                                  ETB {qa.expenditure.toLocaleString()}
                                </div>
                              )}
                              {qa && (qa.actual_female != null || qa.actual_male != null || qa.actual_youth != null) && (
                                <div className="text-[8px] text-slate-400 mt-0.5" title="Demographics: Female / Male / Youth">
                                  F:{qa.actual_female ?? '—'} M:{qa.actual_male ?? '—'} Y:{qa.actual_youth ?? '—'}
                                </div>
                              )}
                              {qa?.comment && (
                                <div className="text-[9px] text-slate-500 italic truncate max-w-[110px] ml-auto mt-0.5" title={qa.comment}>
                                  💬 {qa.comment}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PlanEntry modal wizard launched via "+ Enter target/budget" */}
      {modalWizard && (
        <PlanEntryWizardModal
          initial={modalWizard.initial}
          startStep={modalWizard.startStep}
          onClose={() => setModalWizard(null)}
          onSaved={() => setModalWizard(null)}
        />
      )}
    </div>
  );
};
