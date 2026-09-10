// src/components/report/ReportHierarchicalContributingRows.tsx
import React, { useState } from 'react';
import { NationalActivity, Region, QuarterFilterValue, PlanEntry } from '../../types';
import { MapPin, FolderGit2, ChevronDown, ChevronRight, CornerDownRight } from 'lucide-react';
import { useContributingBreakdown } from '../../hooks/useContributingBreakdown';
import {
  sumPlannedTarget,
  sumPlannedBudget,
  sumActual,
  sumExpenditure,
  achievementPct,
} from '../../utils/calculations';

export interface ColumnGroupResult {
  target: number;
  actual: number;
  achievement: number;
  budget: number;
  spent: number;
  utilization: number;
}

interface ReportHierarchicalContributingRowsProps {
  nationalActivity: NationalActivity;
  quarterId?: QuarterFilterValue;
  showHqColumns: boolean;
  showRbColumns: boolean;
  visibleRegionsForTable: Region[];
  renderSubColumns: (res: ColumnGroupResult | null, isSpRow?: boolean) => React.ReactNode;
  scopeFilter?: 'Regional' | 'Project';
  assignedRegionId?: string;
  assignedProjectId?: string;
}

export const ReportHierarchicalContributingRows: React.FC<ReportHierarchicalContributingRowsProps> = ({
  nationalActivity,
  quarterId,
  showHqColumns,
  showRbColumns,
  visibleRegionsForTable,
  renderSubColumns,
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
    quarterlyActuals,
    q,
  } = useContributingBreakdown({
    nationalActivityId: nationalActivity.id,
    quarterId,
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

  const totalCols = 2 + 6 + (showHqColumns ? 6 : 0) + (showRbColumns ? 6 : 0) + visibleRegionsForTable.length * 6;

  const renderEmptySubColumns = () => (
    <>
      <td className="p-2.5 text-right border-r border-slate-200 whitespace-nowrap text-slate-300 font-mono">—</td>
      <td className="p-2.5 text-right border-r border-slate-200 whitespace-nowrap text-slate-300 font-mono">—</td>
      <td className="p-2.5 text-right border-r border-slate-200 whitespace-nowrap text-slate-300 font-mono">—</td>
      <td className="p-2.5 text-right border-r border-slate-200 whitespace-nowrap text-slate-300 font-mono">—</td>
      <td className="p-2.5 text-right border-r border-slate-200 whitespace-nowrap text-slate-300 font-mono">—</td>
      <td className="p-2.5 text-right border-r border-slate-200 whitespace-nowrap text-slate-300 font-mono">—</td>
    </>
  );

  if (displayedRegions.length === 0 && displayedProjects.length === 0) {
    return (
      <tr className="text-xs bg-slate-50/60 italic text-slate-400 border-b border-slate-200">
        <td colSpan={totalCols} className="p-3 pl-12 text-left">
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
    const peActual = sumActual([pe], quarterlyActuals, q);
    const peSpent = sumExpenditure([pe], quarterlyActuals, q);
    const peAch = achievementPct(peActual, peTarget);
    const peUtil = peBudget > 0 ? (peSpent / peBudget) * 100 : 0;

    const peGroupResult: ColumnGroupResult = {
      target: peTarget,
      actual: peActual,
      achievement: peAch,
      budget: peBudget,
      spent: peSpent,
      utilization: peUtil,
    };

    const indentClass = indentLevel === 'zone' ? 'pl-16' : 'pl-12';
    const colorClass =
      indentLevel === 'project'
        ? 'text-purple-700'
        : indentLevel === 'zone'
        ? 'text-sky-700'
        : 'text-blue-700';

    return (
      <tr
        key={`rep-hier-pe-${pe.id}`}
        className="text-xs bg-slate-50/40 hover:bg-slate-100/60 transition-colors border-b border-slate-200/50"
      >
        {/* Col 1: Strategies Code (Sticky left 0) */}
        <td className={`p-2.5 ${indentClass} sticky left-0 bg-slate-50/95 z-10 border-r border-slate-200 font-mono ${colorClass} text-[11px] font-semibold`}>
          <div className="flex items-center gap-1.5">
            <CornerDownRight className="w-3 h-3 shrink-0 opacity-70" />
            <span>{pe.activity_code || '—'}</span>
          </div>
        </td>

        {/* Col 2: Intervention Logic (Sticky left 130px) */}
        <td className="p-2.5 sticky left-[130px] bg-slate-50/95 z-10 border-r border-slate-200 text-slate-800">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-800">{pe.activity_name}</span>
              {pe.approval_status && (
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${
                    pe.approval_status === 'Approved'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : pe.approval_status === 'Pending Approval'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : pe.approval_status === 'Rejected'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}
                >
                  {pe.approval_status}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 font-normal shrink-0">
              {pe.uom || nationalActivity.uom}
            </span>
          </div>
        </td>

        {/* Total Group (6 subcolumns) */}
        {renderSubColumns(peGroupResult)}

        {/* HQ Group: Only for project entries */}
        {showHqColumns && (
          indentLevel === 'project' ? renderSubColumns(peGroupResult) : renderEmptySubColumns()
        )}

        {/* Summary RB Group: For region and zone entries */}
        {showRbColumns && (
          indentLevel !== 'project' ? renderSubColumns(peGroupResult) : renderEmptySubColumns()
        )}

        {/* Visible Regions Columns */}
        {visibleRegionsForTable.map(r => (
          <React.Fragment key={`rep-hier-pe-col-${pe.id}-${r.id}`}>
            {indentLevel !== 'project' && r.id === regionId
              ? renderSubColumns(peGroupResult)
              : renderEmptySubColumns()}
          </React.Fragment>
        ))}
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

        const regGroupResult: ColumnGroupResult = {
          target: regData.target,
          actual: regData.actual,
          achievement: regData.ach,
          budget: regData.budget,
          spent: regData.spent,
          utilization: regData.budget > 0 ? (regData.spent / regData.budget) * 100 : 0,
        };

        return (
          <React.Fragment key={`rep-hier-na-${nationalActivity.id}-reg-${reg.id}`}>
            <tr className="text-xs bg-blue-50/20 hover:bg-blue-50/50 transition-colors border-b border-slate-200/70 font-normal">
              {/* Col 1: Strategies Code (Sticky left 0) */}
              <td className="p-2.5 pl-8 sticky left-0 bg-slate-50/95 z-10 border-r border-slate-200 font-mono text-slate-700">
                <div className="flex items-center gap-1.5 text-blue-700 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Region</span>
                </div>
              </td>

              {/* Col 2: Intervention Logic (Sticky left 130px) */}
              <td className="p-2.5 sticky left-[130px] bg-slate-50/95 z-10 border-r border-slate-200 text-slate-800 font-medium">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{reg.name}</span>
                    <span className="text-[10px] text-blue-700 bg-blue-100/70 border border-blue-200 px-1.5 py-0.5 rounded font-medium">
                      Contributing Region
                    </span>
                    {regData.targetPct > 0 && (
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({regData.targetPct.toFixed(1)}% of act.)
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] text-slate-400 font-normal">
                      {nationalActivity.uom} · Branch
                    </span>
                    {hasZones && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleZoneExpand(reg.id);
                        }}
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 hover:text-blue-900 cursor-pointer bg-blue-100/60 hover:bg-blue-200/70 px-1.5 py-0.5 rounded transition-colors"
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
                </div>
              </td>

              {/* Total Group (6 subcolumns) */}
              {renderSubColumns(regGroupResult)}

              {/* HQ Group (6 subcolumns) */}
              {showHqColumns && renderEmptySubColumns()}

              {/* Summary RB Group (6 subcolumns) */}
              {showRbColumns && renderSubColumns(regGroupResult)}

              {/* Visible Regions Columns (6 subcolumns each) */}
              {visibleRegionsForTable.map(r => (
                <React.Fragment key={`rep-hier-col-${reg.id}-${r.id}`}>
                  {r.id === reg.id ? renderSubColumns(regGroupResult) : renderEmptySubColumns()}
                </React.Fragment>
              ))}
            </tr>

            {/* Regional Plan Entries (submitted by Regional Branch) */}
            {regionalEntries.map(pe => renderPlanEntryRow(pe, 'region', reg.id))}

            {/* Nested Zone Rows */}
            {hasZones && areZonesExpanded && regData.zones.map(z => {
              const zoneGroupResult: ColumnGroupResult = {
                target: z.target,
                actual: z.actual,
                achievement: z.ach,
                budget: z.budget,
                spent: z.spent,
                utilization: z.budget > 0 ? (z.spent / z.budget) * 100 : 0,
              };

              return (
                <React.Fragment key={`rep-hier-na-${nationalActivity.id}-zone-${z.zone.id}`}>
                  <tr className="text-xs bg-slate-50/80 hover:bg-sky-50/50 transition-colors border-b border-slate-200/50">
                    <td className="p-2 pl-12 sticky left-0 bg-slate-100/90 z-10 border-r border-slate-200 font-mono text-slate-600 text-[11px]">
                      <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        <span>Zone</span>
                      </div>
                    </td>
                    <td className="p-2 sticky left-[130px] bg-slate-100/90 z-10 border-r border-slate-200 text-slate-700 font-medium">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span>{z.zone.name}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({reg.name})</span>
                          {z.entries.length > 0 && (
                            <span className="text-[10px] text-sky-700 bg-sky-100/70 border border-sky-200 px-1 py-0.2 rounded font-medium">
                              {z.entries.length} {z.entries.length === 1 ? 'activity' : 'activities'}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal shrink-0">
                          {nationalActivity.uom} · Zone
                        </span>
                      </div>
                    </td>
                    {renderSubColumns(zoneGroupResult)}
                    {showHqColumns && renderEmptySubColumns()}
                    {showRbColumns && renderSubColumns(zoneGroupResult)}
                    {visibleRegionsForTable.map(r => (
                      <React.Fragment key={`rep-hier-zone-col-${z.zone.id}-${r.id}`}>
                        {r.id === reg.id ? renderSubColumns(zoneGroupResult) : renderEmptySubColumns()}
                      </React.Fragment>
                    ))}
                  </tr>

                  {/* Zone Contributing Activities (Plan Entries) */}
                  {z.entries.map(pe => renderPlanEntryRow(pe, 'zone', reg.id))}

                  {/* Zone empty state */}
                  {z.entries.length === 0 && (
                    <tr className="text-xs bg-sky-50/10 border-b border-slate-200/40 italic text-slate-400">
                      <td className="p-2.5 pl-16 sticky left-0 bg-slate-100/90 z-10 border-r border-slate-200 font-mono text-sky-600 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          <CornerDownRight className="w-3 h-3 shrink-0 opacity-70" />
                          <span>Linked</span>
                        </div>
                      </td>
                      <td className="p-2.5 sticky left-[130px] bg-slate-100/90 z-10 border-r border-slate-200 text-slate-400 text-[11px]">
                        Eligible contributing zone · No plan entries submitted yet
                      </td>
                      {renderEmptySubColumns()}
                      {showHqColumns && renderEmptySubColumns()}
                      {showRbColumns && renderEmptySubColumns()}
                      {visibleRegionsForTable.map(r => (
                        <React.Fragment key={`rep-hier-zone-empty-${z.zone.id}-${r.id}`}>
                          {renderEmptySubColumns()}
                        </React.Fragment>
                      ))}
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </React.Fragment>
        );
      })}

      {/* Contributing Projects */}
      {displayedProjects.map(projData => {
        const proj = projData.project;
        const projGroupResult: ColumnGroupResult = {
          target: projData.target,
          actual: projData.actual,
          achievement: projData.ach,
          budget: projData.budget,
          spent: projData.spent,
          utilization: projData.budget > 0 ? (projData.spent / projData.budget) * 100 : 0,
        };

        return (
          <React.Fragment key={`rep-hier-na-${nationalActivity.id}-proj-${proj.id}`}>
            <tr className="text-xs bg-purple-50/20 hover:bg-purple-50/50 transition-colors border-b border-slate-200/70 font-normal">
              {/* Col 1: Strategies Code */}
              <td className="p-2.5 pl-8 sticky left-0 bg-slate-50/95 z-10 border-r border-slate-200 font-mono text-slate-700">
                <div className="flex items-center gap-1.5 text-purple-700 font-semibold">
                  <FolderGit2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Project</span>
                </div>
              </td>

              {/* Col 2: Intervention Logic */}
              <td className="p-2.5 sticky left-[130px] bg-slate-50/95 z-10 border-r border-slate-200 text-slate-800 font-medium">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
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
                  <span className="text-[10px] text-slate-400 font-normal shrink-0">
                    {nationalActivity.uom} · Project
                  </span>
                </div>
              </td>

              {/* Total Group (6 subcolumns) */}
              {renderSubColumns(projGroupResult)}

              {/* HQ Group: Projects coordinated under HQ / National */}
              {showHqColumns && renderSubColumns(projGroupResult)}

              {/* Summary RB Group */}
              {showRbColumns && renderEmptySubColumns()}

              {/* Visible Regions Columns */}
              {visibleRegionsForTable.map(r => (
                <React.Fragment key={`rep-hier-proj-col-${proj.id}-${r.id}`}>
                  {renderEmptySubColumns()}
                </React.Fragment>
              ))}
            </tr>

            {/* Project Contributing Activities (Plan Entries) */}
            {projData.entries.map(pe => renderPlanEntryRow(pe, 'project'))}

            {/* Baseline project allocation when no entries submitted yet */}
            {projData.entries.length === 0 && projData.hasBaseline && (
              <tr className="text-xs bg-purple-50/10 border-b border-slate-200/40 italic text-slate-500">
                <td className="p-2.5 pl-12 sticky left-0 bg-slate-50/95 z-10 border-r border-slate-200 font-mono text-purple-600 text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <CornerDownRight className="w-3 h-3 shrink-0 opacity-70" />
                    <span>Allocation</span>
                  </div>
                </td>
                <td className="p-2.5 sticky left-[130px] bg-slate-50/95 z-10 border-r border-slate-200 text-slate-500 text-[11px]">
                  Baseline project allocation (no detailed plan entries submitted yet)
                </td>
                {renderSubColumns(projGroupResult)}
                {showHqColumns && renderSubColumns(projGroupResult)}
                {showRbColumns && renderEmptySubColumns()}
                {visibleRegionsForTable.map(r => (
                  <React.Fragment key={`rep-hier-proj-base-col-${proj.id}-${r.id}`}>
                    {renderEmptySubColumns()}
                  </React.Fragment>
                ))}
              </tr>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
};
