// src/components/plan/StrategicPlanContributingRows.tsx
import React, { useState } from 'react';
import { NationalActivity, Region, PlanEntry } from '../../types';
import { MapPin, FolderGit2, ChevronDown, ChevronRight, CornerDownRight } from 'lucide-react';
import { useContributingBreakdown } from '../../hooks/useContributingBreakdown';
import { sumPlannedTarget, sumPlannedBudget } from '../../utils/calculations';

interface StrategicPlanContributingRowsProps {
  nationalActivity: NationalActivity;
  totalColSpan: number;
  showHqColumns: boolean;
  showRbColumns: boolean;
  visibleRegions: Region[];
  formatNum: (v: number) => string;
  scopeFilter?: 'Regional' | 'Project';
  assignedRegionId?: string;
  assignedProjectId?: string;
}

export const StrategicPlanContributingRows: React.FC<StrategicPlanContributingRowsProps> = ({
  nationalActivity,
  totalColSpan,
  showHqColumns,
  showRbColumns,
  visibleRegions,
  formatNum,
  scopeFilter,
  assignedRegionId,
  assignedProjectId,
}) => {
  const {
    displayedRegions,
    displayedProjects,
    isRegionalRole,
    effectiveRegionId,
    quarterlyPlans,
    q,
  } = useContributingBreakdown({
    nationalActivityId: nationalActivity.id,
    scopeFilter,
    assignedRegionId,
    assignedProjectId,
  });

  // Default zones to expanded for Regional roles or when assignedRegionId is present so Branch Heads see their breakdown immediately
  const [expandedZoneRegionIds, setExpandedZoneRegionIds] = useState<Set<string>>(() => {
    if (isRegionalRole || effectiveRegionId || assignedRegionId) {
      return new Set(displayedRegions.map(r => r.region.id));
    }
    return new Set(displayedRegions.map(r => r.region.id));
  });

  const toggleZoneExpand = (regionId: string) => {
    setExpandedZoneRegionIds(prev => {
      const next = new Set(prev);
      if (next.has(regionId)) next.delete(regionId);
      else next.add(regionId);
      return next;
    });
  };

  if (displayedRegions.length === 0 && displayedProjects.length === 0) {
    return (
      <tr className="text-xs bg-slate-50/60 italic text-slate-400 border-b border-slate-200">
        <td colSpan={totalColSpan} className="p-3 pl-12 text-left">
          No contributing regions or projects linked to this activity.
        </td>
      </tr>
    );
  }

  // Render a contributing plan entry row with exact table columns
  const renderPlanEntryRow = (
    pe: PlanEntry,
    indentLevel: 'region' | 'zone' | 'project',
    regionId?: string
  ) => {
    const peTarget = sumPlannedTarget([pe], quarterlyPlans, q);
    const peBudget = sumPlannedBudget([pe], quarterlyPlans, q);

    const indentClass = indentLevel === 'zone' ? 'pl-16' : 'pl-12';
    const colorClass =
      indentLevel === 'project'
        ? 'text-purple-700'
        : indentLevel === 'zone'
        ? 'text-sky-700'
        : 'text-blue-700';

    return (
      <tr
        key={`sp-pe-${pe.id}`}
        className="text-xs bg-slate-50/40 hover:bg-slate-100/60 transition-colors border-b border-slate-200/50"
      >
        {/* Col 1: Code */}
        <td className={`p-2.5 ${indentClass} sticky left-0 bg-slate-50/95 z-10 border-r border-slate-200 font-mono ${colorClass} text-[11px] font-semibold`}>
          <div className="flex items-center gap-1.5">
            <CornerDownRight className="w-3 h-3 shrink-0 opacity-70" />
            <span>{pe.activity_code || '—'}</span>
          </div>
        </td>

        {/* Col 2: Intervention Logic */}
        <td className="p-2.5 sticky left-[140px] bg-slate-50/95 z-10 border-r border-slate-200 text-slate-800">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-medium text-slate-800">{pe.activity_name}</span>
            {pe.approval_status && (
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                  pe.approval_status === 'Approved'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : pe.approval_status === 'Pending Approval'
                    ? 'bg-amber-50 text-amber-700 border border-amber-200'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {pe.approval_status}
              </span>
            )}
          </div>
        </td>

        {/* Col 3: Unit */}
        <td className="p-2.5 border-r border-slate-200 text-slate-500 font-medium">
          {pe.uom || nationalActivity.uom || '—'}
        </td>

        {/* Col 4: Responsibility */}
        <td className="p-2.5 border-r border-slate-200">
          <span
            className={`px-1.5 py-0.5 rounded text-[11px] font-semibold ${
              indentLevel === 'project'
                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                : indentLevel === 'zone'
                ? 'bg-sky-50 text-sky-700 border border-sky-200'
                : 'bg-blue-50 text-blue-700 border border-blue-200'
            }`}
          >
            {indentLevel === 'project' ? 'Project' : indentLevel === 'zone' ? 'Zone' : 'Branch'}
          </span>
        </td>

        {/* Col 5: Departments */}
        <td className="p-2.5 border-r border-slate-200 text-slate-400 font-medium text-[11px]">
          —
        </td>

        {/* Col 6: Total Target */}
        <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-700">
          {formatNum(peTarget)}
        </td>

        {/* Col 7: Total Budget */}
        <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-800">
          {formatNum(peBudget)}
        </td>

        {/* HQ Columns */}
        {showHqColumns && (
          indentLevel === 'project' ? (
            <>
              <td className="p-2 text-right border-r border-slate-200 font-mono text-purple-900 font-semibold bg-purple-50/30">
                {formatNum(peTarget)}
              </td>
              <td className="p-2 text-right border-r border-slate-200 font-mono text-purple-900 font-bold bg-purple-50/30">
                {formatNum(peBudget)}
              </td>
            </>
          ) : (
            <>
              <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-400">—</td>
              <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-400">—</td>
            </>
          )
        )}

        {/* Summary RB Columns */}
        {showRbColumns && (
          indentLevel !== 'project' ? (
            <>
              <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-600">
                {formatNum(peTarget)}
              </td>
              <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-600">
                {formatNum(peBudget)}
              </td>
            </>
          ) : (
            <>
              <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-400">—</td>
              <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-400">—</td>
            </>
          )
        )}

        {/* Visible Regions Columns */}
        {visibleRegions.map(r => {
          const isThisRegion = indentLevel !== 'project' && r.id === regionId;
          return (
            <React.Fragment key={`sp-pe-col-${pe.id}-${r.id}`}>
              <td className={`p-2 text-right border-r border-slate-100 font-mono ${isThisRegion ? 'text-slate-700' : 'text-slate-400'}`}>
                {isThisRegion ? formatNum(peTarget) : '—'}
              </td>
              <td className={`p-2 text-right border-r border-slate-100 font-mono ${isThisRegion ? 'text-slate-700' : 'text-slate-400'}`}>
                {isThisRegion ? formatNum(peBudget) : '—'}
              </td>
            </React.Fragment>
          );
        })}
      </tr>
    );
  };

  return (
    <>
      {/* Contributing Regions */}
      {displayedRegions.map(regData => {
        const reg = regData.region;
        const hasZones = regData.zones && regData.zones.length > 0;
        const areZonesExpanded = expandedZoneRegionIds.has(reg.id);
        const regionalEntries = regData.entries.filter(pe => !pe.zone_id);

        return (
          <React.Fragment key={`sp-na-${nationalActivity.id}-reg-${reg.id}`}>
            <tr className="text-xs bg-blue-50/20 hover:bg-blue-50/50 transition-colors border-b border-slate-200/70 font-normal">
              {/* Col 1: Code (Indented) */}
              <td className="p-2.5 pl-8 sticky left-0 bg-slate-50/95 z-10 border-r border-slate-200 font-mono text-slate-700">
                <div className="flex items-center gap-1.5 text-blue-700 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Region</span>
                </div>
              </td>

              {/* Col 2: Intervention Logic */}
              <td className="p-2.5 sticky left-[140px] bg-slate-50/95 z-10 border-r border-slate-200 text-slate-800 font-medium">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-900">{reg.name}</span>
                  <span className="text-[10px] text-blue-700 bg-blue-100/70 border border-blue-200 px-1.5 py-0.5 rounded font-medium">
                    Contributing Region
                  </span>
                  {regData.targetPct > 0 && (
                    <span className="text-[10px] text-slate-400 font-normal">
                      ({regData.targetPct.toFixed(1)}% of act.)
                    </span>
                  )}
                  {hasZones && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleZoneExpand(reg.id);
                      }}
                      className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 hover:text-blue-900 cursor-pointer bg-blue-100/60 hover:bg-blue-200/70 px-1.5 py-0.5 rounded transition-colors"
                      title="Toggle zone breakdown"
                    >
                      {areZonesExpanded ? (
                        <ChevronDown className="w-3 h-3 text-blue-700" />
                      ) : (
                        <ChevronRight className="w-3 h-3 text-blue-700" />
                      )}
                      <span>{regData.zones.length} Zones</span>
                    </button>
                  )}
                </div>
              </td>

              {/* Col 3: Unit */}
              <td className="p-2.5 border-r border-slate-200 text-slate-500 font-medium">
                {nationalActivity.uom || '—'}
              </td>

              {/* Col 4: Responsibility */}
              <td className="p-2.5 border-r border-slate-200">
                <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-semibold">
                  Branch
                </span>
              </td>

              {/* Col 5: Departments */}
              <td className="p-2.5 border-r border-slate-200 text-slate-400 font-medium">
                —
              </td>

              {/* Col 6: Total Target */}
              <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-800 font-semibold">
                {formatNum(regData.target)}
              </td>

              {/* Col 7: Total Budget */}
              <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-900 font-bold">
                {formatNum(regData.budget)}
              </td>

              {/* HQ Columns */}
              {showHqColumns && (
                <>
                  <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-400">—</td>
                  <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-400">—</td>
                </>
              )}

              {/* Summary RB Columns */}
              {showRbColumns && (
                <>
                  <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-700">
                    {formatNum(regData.target)}
                  </td>
                  <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-700">
                    {formatNum(regData.budget)}
                  </td>
                </>
              )}

              {/* Visible Regions Columns */}
              {visibleRegions.map(r => {
                const isThisRegion = r.id === reg.id;
                return (
                  <React.Fragment key={`sp-reg-col-${reg.id}-${r.id}`}>
                    <td className={`p-2 text-right border-r border-slate-100 font-mono ${isThisRegion ? 'text-blue-900 font-semibold bg-blue-50/40' : 'text-slate-400'}`}>
                      {isThisRegion ? formatNum(regData.target) : '—'}
                    </td>
                    <td className={`p-2 text-right border-r border-slate-100 font-mono ${isThisRegion ? 'text-blue-900 font-bold bg-blue-50/40' : 'text-slate-400'}`}>
                      {isThisRegion ? formatNum(regData.budget) : '—'}
                    </td>
                  </React.Fragment>
                );
              })}
            </tr>

            {/* Regional Plan Entries */}
            {regionalEntries.map(pe => renderPlanEntryRow(pe, 'region', reg.id))}

            {/* Nested Zone Rows */}
            {hasZones && areZonesExpanded && regData.zones.map(z => (
              <React.Fragment key={`sp-na-${nationalActivity.id}-zone-${z.zone.id}`}>
                <tr className="text-xs bg-slate-50/80 hover:bg-sky-50/50 transition-colors border-b border-slate-200/50">
                  <td className="p-2 pl-12 sticky left-0 bg-slate-100/90 z-10 border-r border-slate-200 font-mono text-slate-600 text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      <span>Zone</span>
                    </div>
                  </td>
                  <td className="p-2 sticky left-[140px] bg-slate-100/90 z-10 border-r border-slate-200 text-slate-700 font-medium">
                    <div className="flex items-center gap-2">
                      <span>{z.zone.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({reg.name})</span>
                      {z.entries.length > 0 && (
                        <span className="text-[10px] text-sky-700 bg-sky-100/70 border border-sky-200 px-1 py-0.2 rounded font-medium">
                          {z.entries.length} {z.entries.length === 1 ? 'activity' : 'activities'}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-2 border-r border-slate-200 text-slate-400">{nationalActivity.uom || '—'}</td>
                  <td className="p-2 border-r border-slate-200 text-slate-500 text-[11px]">Zone</td>
                  <td className="p-2 border-r border-slate-200 text-slate-400">—</td>
                  <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-700">{formatNum(z.target)}</td>
                  <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-800">{formatNum(z.budget)}</td>
                  {showHqColumns && (
                    <>
                      <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-400">—</td>
                      <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-400">—</td>
                    </>
                  )}
                  {showRbColumns && (
                    <>
                      <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-600">{formatNum(z.target)}</td>
                      <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-600">{formatNum(z.budget)}</td>
                    </>
                  )}
                  {visibleRegions.map(r => {
                    const isThisRegion = r.id === reg.id;
                    return (
                      <React.Fragment key={`sp-zone-col-${z.zone.id}-${r.id}`}>
                        <td className={`p-2 text-right border-r border-slate-100 font-mono ${isThisRegion ? 'text-slate-700' : 'text-slate-400'}`}>
                          {isThisRegion ? formatNum(z.target) : '—'}
                        </td>
                        <td className={`p-2 text-right border-r border-slate-100 font-mono ${isThisRegion ? 'text-slate-700' : 'text-slate-400'}`}>
                          {isThisRegion ? formatNum(z.budget) : '—'}
                        </td>
                      </React.Fragment>
                    );
                  })}
                </tr>

                {/* Zone Plan Entries */}
                {z.entries.map(pe => renderPlanEntryRow(pe, 'zone', reg.id))}
              </React.Fragment>
            ))}
          </React.Fragment>
        );
      })}

      {/* Contributing Projects */}
      {displayedProjects.map(projData => {
        const proj = projData.project;
        return (
          <React.Fragment key={`sp-na-${nationalActivity.id}-proj-${proj.id}`}>
            <tr className="text-xs bg-purple-50/20 hover:bg-purple-50/50 transition-colors border-b border-slate-200/70 font-normal">
              {/* Col 1: Code */}
              <td className="p-2.5 pl-8 sticky left-0 bg-slate-50/95 z-10 border-r border-slate-200 font-mono text-slate-700">
                <div className="flex items-center gap-1.5 text-purple-700 font-semibold">
                  <FolderGit2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Project</span>
                </div>
              </td>

              {/* Col 2: Intervention Logic */}
              <td className="p-2.5 sticky left-[140px] bg-slate-50/95 z-10 border-r border-slate-200 text-slate-800 font-medium">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-slate-900">{proj.name}</span>
                    <span className="text-[10px] text-purple-700 bg-purple-100/70 border border-purple-200 px-1.5 py-0.5 rounded font-medium">
                      Contributing Project
                    </span>
                    {projData.targetPct > 0 && (
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({projData.targetPct.toFixed(1)}% of act.)
                      </span>
                    )}
                    {projData.entries.length > 0 && (
                      <span className="text-[10px] text-purple-700 bg-purple-100/70 border border-purple-200 px-1 py-0.2 rounded font-medium">
                        {projData.entries.length} {projData.entries.length === 1 ? 'activity' : 'activities'}
                      </span>
                    )}
                  </div>
                  {proj.donor && (
                    <span className="text-[10px] text-purple-700 font-medium">
                      Donor: {proj.donor}
                    </span>
                  )}
                </div>
              </td>

              {/* Col 3: Unit */}
              <td className="p-2.5 border-r border-slate-200 text-slate-500 font-medium">
                {nationalActivity.uom || '—'}
              </td>

              {/* Col 4: Responsibility */}
              <td className="p-2.5 border-r border-slate-200">
                <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 text-[11px] font-semibold">
                  Project
                </span>
              </td>

              {/* Col 5: Departments */}
              <td className="p-2.5 border-r border-slate-200 text-slate-500 font-medium text-[11px]">
                {proj.donor || '—'}
              </td>

              {/* Col 6: Total Target */}
              <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-800 font-semibold">
                {formatNum(projData.target)}
              </td>

              {/* Col 7: Total Budget */}
              <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-900 font-bold">
                {formatNum(projData.budget)}
              </td>

              {/* HQ Columns: Projects count under HQ/National */}
              {showHqColumns && (
                <>
                  <td className="p-2 text-right border-r border-slate-200 font-mono text-purple-900 font-semibold bg-purple-50/30">
                    {formatNum(projData.target)}
                  </td>
                  <td className="p-2 text-right border-r border-slate-200 font-mono text-purple-900 font-bold bg-purple-50/30">
                    {formatNum(projData.budget)}
                  </td>
                </>
              )}

              {/* Summary RB Columns */}
              {showRbColumns && (
                <>
                  <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-400">—</td>
                  <td className="p-2 text-right border-r border-slate-200 font-mono text-slate-400">—</td>
                </>
              )}

              {/* Visible Regions Columns */}
              {visibleRegions.map(r => (
                <React.Fragment key={`sp-proj-col-${proj.id}-${r.id}`}>
                  <td className="p-2 text-right border-r border-slate-100 font-mono text-slate-400">—</td>
                  <td className="p-2 text-right border-r border-slate-100 font-mono text-slate-400">—</td>
                </React.Fragment>
              ))}
            </tr>

            {/* Project Plan Entries */}
            {projData.entries.map(pe => renderPlanEntryRow(pe, 'project'))}
          </React.Fragment>
        );
      })}
    </>
  );
};
