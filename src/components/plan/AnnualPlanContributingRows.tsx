// src/components/plan/AnnualPlanContributingRows.tsx
import React, { useState } from 'react';
import { NationalActivity, QuarterFilterValue, QuarterId, UomFactorConfig } from '../../types';
import { MapPin, FolderGit2, ChevronDown, ChevronRight } from 'lucide-react';
import { useContributingBreakdown } from '../../hooks/useContributingBreakdown';
import { convertToBeneficiaries } from '../../utils/calculations';

interface AnnualPlanContributingRowsProps {
  nationalActivity: NationalActivity;
  visibleQuarters: QuarterId[];
  quarterId?: QuarterFilterValue;
  scopeFilter?: 'Regional' | 'Project';
  assignedRegionId?: string;
  assignedProjectId?: string;
  uomConfigs: UomFactorConfig[];
}

export const AnnualPlanContributingRows: React.FC<AnnualPlanContributingRowsProps> = ({
  nationalActivity,
  visibleQuarters,
  quarterId,
  scopeFilter,
  assignedRegionId,
  assignedProjectId,
  uomConfigs,
}) => {
  const { displayedRegions, displayedProjects, getQuarterPlan } = useContributingBreakdown({
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

  const totalCols = 5 + visibleQuarters.length * 2;

  if (displayedRegions.length === 0 && displayedProjects.length === 0) {
    return (
      <tr className="text-xs bg-slate-50/60 italic text-slate-400 border-b border-slate-200">
        <td colSpan={totalCols} className="p-3 pl-8 text-left">
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
        const beneficiaries = convertToBeneficiaries(regData.target, nationalActivity.uom, uomConfigs);

        return (
          <React.Fragment key={`plan-na-${nationalActivity.id}-reg-${reg.id}`}>
            <tr className="text-xs bg-blue-50/20 hover:bg-blue-50/50 transition-colors border-b border-slate-200/70 font-normal">
              {/* Col 1: Code */}
              <td className="p-2.5 pl-8 whitespace-nowrap">
                <div className="flex items-center gap-1.5 text-blue-700 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Region</span>
                </div>
              </td>

              {/* Col 2: Activity Name / Details */}
              <td className="p-2.5 min-w-48">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-slate-800">{reg.name}</span>
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
                      className="ml-auto inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 hover:text-blue-900 cursor-pointer bg-blue-100/60 px-1.5 py-0.5 rounded"
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

              {/* Col 3: Target */}
              <td className="p-2.5 text-right font-medium whitespace-nowrap text-slate-800">
                {regData.target > 0 ? `${regData.target.toLocaleString()} ${nationalActivity.uom}` : '—'}
              </td>

              {/* Col 4: Budget (ETB) */}
              <td className="p-2.5 text-right whitespace-nowrap font-medium text-slate-900">
                {regData.budget > 0 ? regData.budget.toLocaleString() : '—'}
              </td>

              {/* Col 5: Beneficiaries */}
              <td className="p-2.5 text-right whitespace-nowrap text-slate-700">
                {beneficiaries.toLocaleString()}
              </td>

              {/* Per-Quarter Columns */}
              {visibleQuarters.map(qId => {
                const qp = getQuarterPlan(regData.entries, qId);
                return (
                  <React.Fragment key={`plan-reg-q-${reg.id}-${qId}`}>
                    <td className="p-2 text-right whitespace-nowrap bg-blue-50/40 border-l border-slate-200 text-[11px] font-mono text-slate-700">
                      {qp.target > 0 ? qp.target.toLocaleString() : '—'}
                    </td>
                    <td className="p-2 text-right whitespace-nowrap bg-blue-50/40 text-[11px] font-mono text-slate-700">
                      {qp.budget > 0 ? qp.budget.toLocaleString() : '—'}
                    </td>
                  </React.Fragment>
                );
              })}
            </tr>

            {/* Nested Zone Rows */}
            {hasZones && areZonesExpanded && regData.zones.map(z => {
              const zBen = convertToBeneficiaries(z.target, nationalActivity.uom, uomConfigs);
              return (
                <tr key={`plan-na-${nationalActivity.id}-zone-${z.zone.id}`} className="text-xs bg-slate-50/80 hover:bg-sky-50/50 transition-colors border-b border-slate-200/50">
                  <td className="p-2 pl-12 whitespace-nowrap text-slate-600 text-[11px]">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      <span>Zone</span>
                    </div>
                  </td>
                  <td className="p-2 min-w-48 text-slate-700 font-medium">
                    <div className="flex items-center gap-2">
                      <span>{z.zone.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({reg.name})</span>
                    </div>
                  </td>
                  <td className="p-2 text-right text-slate-700 font-mono">
                    {z.target > 0 ? `${z.target.toLocaleString()} ${nationalActivity.uom}` : '—'}
                  </td>
                  <td className="p-2 text-right text-slate-700 font-mono">
                    {z.budget > 0 ? z.budget.toLocaleString() : '—'}
                  </td>
                  <td className="p-2 text-right text-slate-600">
                    {zBen.toLocaleString()}
                  </td>
                  {visibleQuarters.map(qId => {
                    const zQp = getQuarterPlan(z.entries, qId);
                    return (
                      <React.Fragment key={`plan-zone-q-${z.zone.id}-${qId}`}>
                        <td className="p-2 text-right whitespace-nowrap bg-blue-50/30 border-l border-slate-200 text-[11px] font-mono text-slate-600">
                          {zQp.target > 0 ? zQp.target.toLocaleString() : '—'}
                        </td>
                        <td className="p-2 text-right whitespace-nowrap bg-blue-50/30 text-[11px] font-mono text-slate-600">
                          {zQp.budget > 0 ? zQp.budget.toLocaleString() : '—'}
                        </td>
                      </React.Fragment>
                    );
                  })}
                </tr>
              );
            })}
          </React.Fragment>
        );
      })}

      {/* Contributing Projects */}
      {displayedProjects.map(projData => {
        const proj = projData.project;
        const beneficiaries = convertToBeneficiaries(projData.target, nationalActivity.uom, uomConfigs);

        return (
          <tr key={`plan-na-${nationalActivity.id}-proj-${proj.id}`} className="text-xs bg-purple-50/20 hover:bg-purple-50/50 transition-colors border-b border-slate-200/70 font-normal">
            {/* Col 1: Code */}
            <td className="p-2.5 pl-8 whitespace-nowrap">
              <div className="flex items-center gap-1.5 text-purple-700 font-semibold">
                <FolderGit2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Project</span>
              </div>
            </td>

            {/* Col 2: Activity Name / Details */}
            <td className="p-2.5 min-w-48">
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
                </div>
                {proj.donor && (
                  <span className="text-[10px] text-purple-700 font-medium">
                    Donor: {proj.donor}
                  </span>
                )}
              </div>
            </td>

            {/* Col 3: Target */}
            <td className="p-2.5 text-right font-medium whitespace-nowrap text-slate-800">
              {projData.target > 0 ? `${projData.target.toLocaleString()} ${nationalActivity.uom}` : '—'}
            </td>

            {/* Col 4: Budget (ETB) */}
            <td className="p-2.5 text-right whitespace-nowrap font-medium text-slate-900">
              {projData.budget > 0 ? projData.budget.toLocaleString() : '—'}
            </td>

            {/* Col 5: Beneficiaries */}
            <td className="p-2.5 text-right whitespace-nowrap text-slate-700">
              {beneficiaries.toLocaleString()}
            </td>

            {/* Per-Quarter Columns */}
            {visibleQuarters.map(qId => {
              const qp = getQuarterPlan(projData.entries, qId);
              return (
                <React.Fragment key={`plan-proj-q-${proj.id}-${qId}`}>
                  <td className="p-2 text-right whitespace-nowrap bg-blue-50/40 border-l border-slate-200 text-[11px] font-mono text-slate-700">
                    {qp.target > 0 ? qp.target.toLocaleString() : '—'}
                  </td>
                  <td className="p-2 text-right whitespace-nowrap bg-blue-50/40 text-[11px] font-mono text-slate-700">
                    {qp.budget > 0 ? qp.budget.toLocaleString() : '—'}
                  </td>
                </React.Fragment>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};
