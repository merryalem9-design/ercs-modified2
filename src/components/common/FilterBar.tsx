import React from 'react';
import { useApp } from '../../context/AppContext';
import { Filter, RotateCcw } from 'lucide-react';
import { QuarterFilterValue } from '../../types';

interface FilterBarProps {
  allowNoneScope?: boolean;
  hideQuarterFilter?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({ allowNoneScope = false, hideQuarterFilter = false }) => {
  const {
    filters, setFilters, resetFilters, currentRole, getNationalActivitiesForRole, regions, zones, projects, quarters,
    strategicPriorities, strategicObjectives,
  } = useApp();

  const isBranchHead = currentRole.startsWith('Branch Head — ');
  const isZoneCoordinator = currentRole.endsWith(' coordinators');
  const isRegionScoped = isBranchHead || isZoneCoordinator;
  const isProjectRole = currentRole.startsWith('Project Coordinator — ');

  const assignedRegionName = isBranchHead ? currentRole.slice('Branch Head — '.length) : '';
  const visibleRegions = isBranchHead ? regions.filter(r => r.name === assignedRegionName) : regions;
  const visibleProjects = isProjectRole ? projects.filter(p => p.name === currentRole.slice('Project Coordinator — '.length)) : projects;
  const nationalActivitiesInRoleScope = getNationalActivitiesForRole();

  // Strategic Objective dropdown cascades off the selected Strategic
  // Priority — narrows the child list based on the parent selection.
  const objectivesInScope = filters.strategicPriorityId === 'ALL'
    ? strategicObjectives
    : strategicObjectives.filter(so => so.strategic_priority_id === filters.strategicPriorityId);

  // National Activity dropdown now cascades off EVERY higher-level filter
  // that's currently active — Strategic Priority, Strategic Objective, and
  // whichever of Region/Project is selected — so it only ever lists
  // activities that could actually produce a result under the current
  // filter combination, instead of listing ones filtering would zero out.
  const nationalActivitiesInScope = nationalActivitiesInRoleScope.filter(na => {
    if (filters.strategicPriorityId !== 'ALL' && na.strategic_priority_id !== filters.strategicPriorityId) return false;
    if (filters.strategicObjectiveId !== 'ALL' && na.strategic_objective_id !== filters.strategicObjectiveId) return false;
    if (filters.regionId !== 'ALL' && filters.regionId !== 'NONE' && !na.eligible_region_ids.includes(filters.regionId)) return false;
    if (filters.projectId !== 'ALL' && filters.projectId !== 'NONE' && !na.eligible_project_ids.includes(filters.projectId)) return false;
    return true;
  });

  // Zone filter — available whenever a single Region is in view, whether
  // that's because the role is pinned to one Region (Branch Head) or
  // because Region has been filtered down to one specific Region by anyone
  // else (AOP, PMER Officer).
  const assignedRegion = isBranchHead ? regions.find(r => r.name === assignedRegionName) : undefined;
  const filterSelectedRegion = (!isBranchHead && filters.regionId !== 'ALL' && filters.regionId !== 'NONE')
    ? regions.find(r => r.id === filters.regionId)
    : undefined;
  const zoneFilterRegion = assignedRegion || filterSelectedRegion;
  const zonesInZoneFilterRegion = zoneFilterRegion ? zones.filter(z => z.region_id === zoneFilterRegion.id) : [];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'quarterId') {
      setFilters(prev => ({ ...prev, quarterId: value as QuarterFilterValue }));
      return;
    }

    if (name === 'strategicPriorityId') {
      // Selecting a Strategic Priority resets Strategic Objective and
      // National Activity, since either may no longer belong to it.
      setFilters(prev => ({ ...prev, strategicPriorityId: value, strategicObjectiveId: 'ALL', nationalActivityId: 'ALL' }));
      return;
    }

    if (name === 'strategicObjectiveId') {
      // Keep the Strategic Priority filter aligned to whichever Objective
      // is picked, so the two never silently disagree about scope (this
      // matters because the Objective list itself is not always narrowed
      // to one Priority — it isn't when "All Strategic Priorities" is
      // still selected).
      setFilters(prev => {
        const parentPriorityId = value === 'ALL'
          ? prev.strategicPriorityId
          : (strategicObjectives.find(so => so.id === value)?.strategic_priority_id || prev.strategicPriorityId);
        return { ...prev, strategicObjectiveId: value, strategicPriorityId: parentPriorityId, nationalActivityId: 'ALL' };
      });
      return;
    }

    const isSpecificSelection = value !== 'ALL' && value !== 'NONE';

    setFilters(prev => {
      if (name === 'regionId') {
        // Any change to Region invalidates whatever Zone was selected
        // under the old Region.
        const next = { ...prev, regionId: value, zoneId: 'ALL' };
        if (isSpecificSelection) { next.projectId = 'ALL'; next.nationalActivityId = 'ALL'; }
        else if (value === 'NONE' && prev.projectId !== 'ALL' && prev.projectId !== 'NONE') { next.projectId = 'ALL'; }
        return next;
      }
      if (name === 'projectId') {
        const next = { ...prev, projectId: value };
        if (isSpecificSelection) { next.regionId = 'ALL'; next.nationalActivityId = 'ALL'; next.zoneId = 'ALL'; }
        else if (value === 'NONE' && prev.regionId !== 'ALL' && prev.regionId !== 'NONE') { next.regionId = 'ALL'; next.zoneId = 'ALL'; }
        return next;
      }
      return { ...prev, [name]: value };
    });
  };

  const regionSelectValue = filters.regionId === 'NONE' && !allowNoneScope ? 'ALL' : filters.regionId;
  const projectSelectValue = filters.projectId === 'NONE' && !allowNoneScope ? 'ALL' : filters.projectId;

  // Period (multi-quarter view) vs. a single Quarter are two separate
  // controls, both driving the same underlying filters.quarterId value.
  const periodSelectValue: QuarterFilterValue = (['ALL', 'SEMI', 'NINE_MONTH'] as QuarterFilterValue[]).includes(filters.quarterId)
    ? filters.quarterId
    : 'ALL';
  const singleQuarterSelectValue = quarters.some(q => q.id === filters.quarterId) ? filters.quarterId : '';

  const handleQuarterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (!value) return; // "Select Quarter…" placeholder — don't clear the active period selection
    setFilters(prev => ({ ...prev, quarterId: value as QuarterFilterValue }));
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Filter className="w-3.5 h-3.5 text-ercs-red" />
          <span>Filters</span>
        </div>
        <button onClick={resetFilters} className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-ercs-red">
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Strategic Priority</label>
          <select name="strategicPriorityId" value={filters.strategicPriorityId} onChange={handleChange} className="w-full text-xs font-medium border-slate-200 rounded-lg bg-slate-50 py-1.5">
            <option value="ALL">All Strategic Priorities</option>
            {strategicPriorities.map(sp => <option key={sp.id} value={sp.id}>{sp.code} — {sp.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Strategic Objective</label>
          <select name="strategicObjectiveId" value={filters.strategicObjectiveId} onChange={handleChange} className="w-full text-xs font-medium border-slate-200 rounded-lg bg-slate-50 py-1.5">
            <option value="ALL">All Strategic Objectives</option>
            {objectivesInScope.map(so => <option key={so.id} value={so.id}>{so.code} — {so.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">National Activity</label>
          <select name="nationalActivityId" value={filters.nationalActivityId} onChange={handleChange} className="w-full text-xs font-medium border-slate-200 rounded-lg bg-slate-50 py-1.5">
            <option value="ALL">All National Activities</option>
            {nationalActivitiesInScope.map(na => <option key={na.id} value={na.id}>{na.code}</option>)}
          </select>
        </div>
        {(!isProjectRole) && (
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">Region</label>
            <select name="regionId" value={regionSelectValue} onChange={handleChange} disabled={isRegionScoped} className="w-full text-xs font-medium border-slate-200 rounded-lg bg-slate-50 py-1.5 disabled:opacity-60">
              <option value="ALL">All Regions</option>
              {allowNoneScope && <option value="NONE">None (National Activity Only)</option>}
              {visibleRegions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>
        )}
        {(!isRegionScoped) && (
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">Project</label>
            <select name="projectId" value={projectSelectValue} onChange={handleChange} className="w-full text-xs font-medium border-slate-200 rounded-lg bg-slate-50 py-1.5">
              <option value="ALL">All Projects</option>
              {allowNoneScope && <option value="NONE">None (National Activity Only)</option>}
              {visibleProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
        )}
        {zoneFilterRegion && (
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">Zone</label>
            <select name="zoneId" value={filters.zoneId} onChange={handleChange} className="w-full text-xs font-medium border-slate-200 rounded-lg bg-slate-50 py-1.5">
              <option value="ALL">All Zones</option>
              {zonesInZoneFilterRegion.map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
            </select>
          </div>
        )}
        {!hideQuarterFilter && (
          <>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1">Period</label>
              <select name="quarterId" value={periodSelectValue} onChange={handleChange} className="w-full text-xs font-medium border-slate-200 rounded-lg bg-slate-50 py-1.5">
                <option value="ALL">All Quarters (Annual)</option>
                <option value="SEMI">Semi-Annual (Q1+Q2)</option>
                <option value="NINE_MONTH">9-Month (Q1–Q3)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1">Quarter</label>
              <select name="quarterId" value={singleQuarterSelectValue} onChange={handleQuarterSelect} className="w-full text-xs font-medium border-slate-200 rounded-lg bg-slate-50 py-1.5">
                <option value="">Select Quarter…</option>
                {quarters.map(q => <option key={q.id} value={q.id}>{q.id}</option>)}
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );
};