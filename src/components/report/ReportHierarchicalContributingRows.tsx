// src/components/report/ReportHierarchicalContributingRows.tsx
import React, { useState } from 'react';
import { NationalActivity, Region, QuarterFilterValue } from '../../types';
import { MapPin, FolderGit2, ChevronDown, ChevronRight } from 'lucide-react';
import { useContributingBreakdown } from '../../hooks/useContributingBreakdown';

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
  const { displayedRegions, displayedProjects } = useContributingBreakdown({
    nationalActivityId: nationalActivity.id,
    quarterId,
    scopeFilter,
    assignedRegionId,
    assignedProjectId,
  });

  const [expandedZoneRegionIds, setExpandedZoneRegionIds] = useState<Set<string>>(new Set());

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

  return (
    <>
      {/* Contributing Regions */}
      {displayedRegions.map(regData => {
        const reg = regData.region;
        const hasZones = regData.zones && regData.zones.length > 0;
        const areZonesExpanded = expandedZoneRegionIds.has(reg.id);

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
              <td className="p-2.5 pl-10 sticky left-0 bg-slate-50/95 z-10 border-r border-slate-200 font-mono text-slate-700">
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
                        className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 hover:text-blue-900 cursor-pointer bg-blue-100/60 px-1.5 py-0.5 rounded"
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
                <tr key={`rep-hier-na-${nationalActivity.id}-zone-${z.zone.id}`} className="text-xs bg-slate-50/80 hover:bg-sky-50/50 transition-colors border-b border-slate-200/50">
                  <td className="p-2 pl-14 sticky left-0 bg-slate-100/90 z-10 border-r border-slate-200 font-mono text-slate-600 text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      <span>Zone</span>
                    </div>
                  </td>
                  <td className="p-2 sticky left-[130px] bg-slate-100/90 z-10 border-r border-slate-200 text-slate-700 font-medium">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span>{z.zone.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({reg.name})</span>
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
          <tr key={`rep-hier-na-${nationalActivity.id}-proj-${proj.id}`} className="text-xs bg-purple-50/20 hover:bg-purple-50/50 transition-colors border-b border-slate-200/70 font-normal">
            {/* Col 1: Strategies Code */}
            <td className="p-2.5 pl-10 sticky left-0 bg-slate-50/95 z-10 border-r border-slate-200 font-mono text-slate-700">
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
        );
      })}
    </>
  );
};
