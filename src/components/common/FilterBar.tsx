import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Filter, RotateCcw, ChevronDown } from 'lucide-react';
import { FilterState, QuarterFilterValue } from '../../types';

interface FilterBarProps {
  allowNoneScope?: boolean;
  hideQuarterFilter?: boolean;
}

// ---------------------------------------------------------------------------
// Helper: derive a single-item array element only when exactly one specific
// (non-sentinel) id is selected — used to resolve single-target contexts.
// ---------------------------------------------------------------------------

export const FilterBar: React.FC<FilterBarProps> = ({ allowNoneScope = false, hideQuarterFilter = false }) => {
  const {
    filters, setFilters, resetFilters, currentRole, getNationalActivitiesForRole, regions, zones, projects, quarters,
    strategicPriorities, strategicObjectives,
  } = useApp();

  // Dropdown open/close state for the multi-select checkbox panels.
  const [regionOpen, setRegionOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click.
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (regionRef.current && !regionRef.current.contains(e.target as Node)) setRegionOpen(false);
      if (projectRef.current && !projectRef.current.contains(e.target as Node)) setProjectOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isBranchHead = currentRole.startsWith('Branch Head — ');
  const isZoneCoordinator = currentRole.endsWith(' coordinators');
  const isRegionScoped = isBranchHead || isZoneCoordinator;
  const isProjectRole = currentRole.startsWith('Project Coordinator — ');

  const assignedRegionName = isBranchHead ? currentRole.slice('Branch Head — '.length) : '';
  const visibleRegions = isBranchHead ? regions.filter(r => r.name === assignedRegionName) : regions;
  const visibleProjects = isProjectRole ? projects.filter(p => p.name === currentRole.slice('Project Coordinator — '.length)) : projects;
  const nationalActivitiesInRoleScope = getNationalActivitiesForRole();

  // Strategic Objective dropdown cascades off the selected Strategic Priority.
  const objectivesInScope = filters.strategicPriorityId === 'ALL'
    ? strategicObjectives
    : strategicObjectives.filter(so => so.strategic_priority_id === filters.strategicPriorityId);

  // National Activity dropdown cascades off EVERY higher-level filter — uses
  // array overlap for region/project (OR across selected ids).
  const nationalActivitiesInScope = nationalActivitiesInRoleScope.filter(na => {
    if (filters.strategicPriorityId !== 'ALL' && na.strategic_priority_id !== filters.strategicPriorityId) return false;
    if (filters.strategicObjectiveId !== 'ALL' && na.strategic_objective_id !== filters.strategicObjectiveId) return false;
    const rIds = filters.regionId;
    if (!rIds.includes('ALL') && !rIds.includes('NONE') && !rIds.some(id => na.eligible_region_ids.includes(id))) return false;
    const pIds = filters.projectId;
    if (!pIds.includes('ALL') && !pIds.includes('NONE') && !pIds.some(id => na.eligible_project_ids.includes(id))) return false;
    return true;
  });

  // Zone filter — available when Branch Head (pinned region) or when exactly
  // ONE specific region is selected in the multi-select. Hidden for 0 or 2+.
  const assignedRegion = isBranchHead ? regions.find(r => r.name === assignedRegionName) : undefined;
  const singleFilteredRegionId =
    !isBranchHead &&
    filters.regionId.length === 1 &&
    !filters.regionId.includes('ALL') &&
    !filters.regionId.includes('NONE')
      ? filters.regionId[0]
      : undefined;
  const filterSelectedRegion = singleFilteredRegionId ? regions.find(r => r.id === singleFilteredRegionId) : undefined;
  const zoneFilterRegion = assignedRegion || filterSelectedRegion;
  const zonesInZoneFilterRegion = zoneFilterRegion ? zones.filter(z => z.region_id === zoneFilterRegion.id) : [];

  // ---------------------------------------------------------------------------
  // Simple select change handler (unchanged filters — SP, SO, NA, Zone, Quarter)
  // ---------------------------------------------------------------------------
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'quarterId') {
      setFilters(prev => ({ ...prev, quarterId: value as QuarterFilterValue }));
      return;
    }

    if (name === 'strategicPriorityId') {
      setFilters(prev => ({ ...prev, strategicPriorityId: value, strategicObjectiveId: 'ALL', nationalActivityId: 'ALL' }));
      return;
    }

    if (name === 'strategicObjectiveId') {
      setFilters(prev => {
        const parentPriorityId = value === 'ALL'
          ? prev.strategicPriorityId
          : (strategicObjectives.find(so => so.id === value)?.strategic_priority_id || prev.strategicPriorityId);
        return { ...prev, strategicObjectiveId: value, strategicPriorityId: parentPriorityId, nationalActivityId: 'ALL' };
      });
      return;
    }

    // zoneId or nationalActivityId — plain single-value update.
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // ---------------------------------------------------------------------------
  // Multi-select checkbox handlers for Region and Project.
  // Sentinel rules:
  //   • Selecting 'ALL' → clears all other ids, sets ['ALL'].
  //   • Selecting 'NONE' → clears all other ids, sets ['NONE'].
  //   • Selecting a specific id → removes 'ALL'/'NONE', adds the id.
  //   • Deselecting the last specific id → falls back to ['ALL'].
  //   • Selecting Region ids resets projectId → ['ALL'] (and vice-versa).
  // ---------------------------------------------------------------------------
  const handleRegionChange = (value: string, checked: boolean) => {
    setFilters(prev => {
      let newRegionId: string[];
      if (value === 'ALL') {
        newRegionId = ['ALL'];
      } else if (value === 'NONE') {
        newRegionId = ['NONE'];
      } else if (checked) {
        newRegionId = [...prev.regionId.filter(v => v !== 'ALL' && v !== 'NONE'), value];
      } else {
        newRegionId = prev.regionId.filter(v => v !== value);
        if (newRegionId.length === 0) newRegionId = ['ALL'];
      }

      const next: FilterState = { ...prev, regionId: newRegionId, zoneId: 'ALL' };
      // Selecting specific regions: reset project + national activity.
      if (!newRegionId.includes('ALL') && !newRegionId.includes('NONE')) {
        next.projectId = ['ALL'];
        next.nationalActivityId = 'ALL';
      } else if (newRegionId.includes('NONE') && !prev.projectId.includes('ALL') && !prev.projectId.includes('NONE')) {
        next.projectId = ['ALL'];
      }
      return next;
    });
  };

  const handleProjectChange = (value: string, checked: boolean) => {
    setFilters(prev => {
      let newProjectId: string[];
      if (value === 'ALL') {
        newProjectId = ['ALL'];
      } else if (value === 'NONE') {
        newProjectId = ['NONE'];
      } else if (checked) {
        newProjectId = [...prev.projectId.filter(v => v !== 'ALL' && v !== 'NONE'), value];
      } else {
        newProjectId = prev.projectId.filter(v => v !== value);
        if (newProjectId.length === 0) newProjectId = ['ALL'];
      }

      const next: FilterState = { ...prev, projectId: newProjectId };
      // Selecting specific projects: reset region + national activity.
      if (!newProjectId.includes('ALL') && !newProjectId.includes('NONE')) {
        next.regionId = ['ALL'];
        next.nationalActivityId = 'ALL';
        next.zoneId = 'ALL';
      } else if (newProjectId.includes('NONE') && !prev.regionId.includes('ALL') && !prev.regionId.includes('NONE')) {
        next.regionId = ['ALL'];
        next.zoneId = 'ALL';
      }
      return next;
    });
  };

  // Display summaries for the dropdown buttons.
  const regionSummary = filters.regionId.includes('ALL')
    ? 'All Regions'
    : filters.regionId.includes('NONE')
    ? 'None (National Activity Only)'
    : filters.regionId.length === 1
    ? (regions.find(r => r.id === filters.regionId[0])?.name ?? filters.regionId[0])
    : `${filters.regionId.length} Regions selected`;

  const projectSummary = filters.projectId.includes('ALL')
    ? 'All Projects'
    : filters.projectId.includes('NONE')
    ? 'None (National Activity Only)'
    : filters.projectId.length === 1
    ? (projects.find(p => p.id === filters.projectId[0])?.name ?? filters.projectId[0])
    : `${filters.projectId.length} Projects selected`;

  // Period vs. single-quarter controls (both drive filters.quarterId).
  const periodSelectValue: QuarterFilterValue = (['ALL', 'SEMI', 'NINE_MONTH'] as QuarterFilterValue[]).includes(filters.quarterId)
    ? filters.quarterId
    : 'ALL';
  const singleQuarterSelectValue = quarters.some(q => q.id === filters.quarterId) ? filters.quarterId : '';

  const handleQuarterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (!value) return;
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

        {/* ----------------------------------------------------------------
            Region — multi-select checkbox dropdown (hidden for Project roles)
        ---------------------------------------------------------------- */}
        {(!isProjectRole) && (
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">Region</label>
            <div ref={regionRef} className="relative">
              <button
                type="button"
                disabled={isRegionScoped}
                onClick={() => !isRegionScoped && setRegionOpen(v => !v)}
                className="w-full text-xs font-medium border border-slate-200 rounded-lg bg-slate-50 py-1.5 px-2 text-left flex items-center justify-between disabled:opacity-60 hover:border-slate-300 transition-colors"
              >
                <span className="truncate">{regionSummary}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 shrink-0 ml-1 transition-transform ${regionOpen ? 'rotate-180' : ''}`} />
              </button>
              {regionOpen && !isRegionScoped && (
                <div className="absolute z-20 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg w-full min-w-max max-h-52 overflow-y-auto">
                  <label className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 cursor-pointer text-xs font-medium border-b border-slate-100">
                    <input
                      type="checkbox"
                      className="accent-ercs-red"
                      checked={filters.regionId.includes('ALL')}
                      onChange={e => handleRegionChange('ALL', e.target.checked)}
                    />
                    All Regions
                  </label>
                  {allowNoneScope && (
                    <label className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 cursor-pointer text-xs font-medium border-b border-slate-100">
                      <input
                        type="checkbox"
                        className="accent-ercs-red"
                        checked={filters.regionId.includes('NONE')}
                        onChange={e => handleRegionChange('NONE', e.target.checked)}
                      />
                      None (National Activity Only)
                    </label>
                  )}
                  {visibleRegions.map(r => (
                    <label key={r.id} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        className="accent-ercs-red"
                        checked={filters.regionId.includes(r.id)}
                        onChange={e => handleRegionChange(r.id, e.target.checked)}
                      />
                      {r.name}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------
            Project — multi-select checkbox dropdown (hidden for region-scoped roles)
        ---------------------------------------------------------------- */}
        {(!isRegionScoped) && (
          <div>
            <label className="block text-[10px] font-bold text-slate-500 mb-1">Project</label>
            <div ref={projectRef} className="relative">
              <button
                type="button"
                onClick={() => setProjectOpen(v => !v)}
                className="w-full text-xs font-medium border border-slate-200 rounded-lg bg-slate-50 py-1.5 px-2 text-left flex items-center justify-between hover:border-slate-300 transition-colors"
              >
                <span className="truncate">{projectSummary}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 shrink-0 ml-1 transition-transform ${projectOpen ? 'rotate-180' : ''}`} />
              </button>
              {projectOpen && (
                <div className="absolute z-20 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg w-full min-w-max max-h-52 overflow-y-auto">
                  <label className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 cursor-pointer text-xs font-medium border-b border-slate-100">
                    <input
                      type="checkbox"
                      className="accent-ercs-red"
                      checked={filters.projectId.includes('ALL')}
                      onChange={e => handleProjectChange('ALL', e.target.checked)}
                    />
                    All Projects
                  </label>
                  {allowNoneScope && (
                    <label className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 cursor-pointer text-xs font-medium border-b border-slate-100">
                      <input
                        type="checkbox"
                        className="accent-ercs-red"
                        checked={filters.projectId.includes('NONE')}
                        onChange={e => handleProjectChange('NONE', e.target.checked)}
                      />
                      None (National Activity Only)
                    </label>
                  )}
                  {visibleProjects.map(p => (
                    <label key={p.id} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 cursor-pointer text-xs">
                      <input
                        type="checkbox"
                        className="accent-ercs-red"
                        checked={filters.projectId.includes(p.id)}
                        onChange={e => handleProjectChange(p.id, e.target.checked)}
                      />
                      {p.name}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Zone — appears only when a single region is in view. */}
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