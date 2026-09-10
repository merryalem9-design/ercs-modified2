// src/components/plan/AnnualPlanContributingRows.tsx
import React, { useState } from 'react';
import { NationalActivity, QuarterFilterValue, QuarterId, UomFactorConfig, PlanEntry } from '../../types';
import { MapPin, FolderGit2, ChevronDown, ChevronRight, CornerDownRight } from 'lucide-react';
import { useContributingBreakdown } from '../../hooks/useContributingBreakdown';
import { convertToBeneficiaries, sumPlannedTarget, sumPlannedBudget } from '../../utils/calculations';

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
  const {
    displayedRegions,
    displayedProjects,
    getQuarterPlan,
    isRegionalRole,
    effectiveRegionId,
    quarterlyPlans,
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

  // Render an individual contributing plan entry row with exact table columns
  const renderPlanEntryRow = (
    pe: PlanEntry,
    indentLevel: 'region' | 'zone' | 'project',
    parentLabel?: string
  ) => {
    const peTarget = sumPlannedTarget([pe], quarterlyPlans, q);
    const peBudget = sumPlannedBudget([pe], quarterlyPlans, q);
    const peBen = convertToBeneficiaries(peTarget, pe.uom || nationalActivity.uom, uomConfigs);

    const indentClass = indentLevel === 'zone' ? 'pl-16' : 'pl-12';
    const colorClass =
      indentLevel === 'project'
        ? 'text-purple-700'
        : indentLevel === 'zone'
        ? 'text-sky-700'
        : 'text-blue-700';
    const bgClass =
      indentLevel === 'project'
        ? 'bg-purple-50/15 hover:bg-purple-50/40'
        : indentLevel === 'zone'
        ? 'bg-sky-50/25 hover:bg-sky-50/50'
        : 'bg-blue-50/15 hover:bg-blue-50/40';

    return (
      <tr
        key={`plan-entry-${pe.id}`}
        className={`text-xs ${bgClass} transition-colors border-b border-slate-200/50 font-normal`}
      >
        {/* Col 1: Code */}
        <td className={`p-2 ${indentClass} whitespace-nowrap`}>
          <div className={`flex items-center gap-1.5 font-mono text-[11px] font-semibold ${colorClass}`}>
            <CornerDownRight className="w-3 h-3 shrink-0 opacity-70" />
            <span>{pe.activity_code || '—'}</span>
          </div>
        </td>

        {/* Col 2: Activity Name & Status */}
        <td className="p-2 min-w-48 text-slate-800">
          <div className="flex items-center gap-2 flex-wrap">
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
            {parentLabel && (
              <span className="text-[10px] text-slate-400 font-normal">
                ({parentLabel})
              </span>
            )}
          </div>
        </td>

        {/* Col 3: Target */}
        <td className="p-2 text-right font-medium whitespace-nowrap text-slate-700 font-mono text-[11px]">
          {peTarget > 0 ? `${peTarget.toLocaleString()} ${pe.uom || nationalActivity.uom}` : '—'}
        </td>

        {/* Col 4: Budget */}
        <td className="p-2 text-right whitespace-nowrap font-medium text-slate-800 font-mono text-[11px]">
          {peBudget > 0 ? peBudget.toLocaleString() : '—'}
        </td>

        {/* Col 5: Beneficiaries */}
        <td className="p-2 text-right whitespace-nowrap text-slate-600 font-mono text-[11px]">
          {peBen > 0 ? peBen.toLocaleString() : '—'}
        </td>

        {/* Per-Quarter Columns */}
        {visibleQuarters.map(qId => {
          const qp = getQuarterPlan([pe], qId);
          return (
            <React.Fragment key={`plan-entry-q-${pe.id}-${qId}`}>
              <td className="p-2 text-right whitespace-nowrap border-l border-slate-200 text-[11px] font-mono text-slate-600 bg-slate-50/40">
                {qp.target > 0 ? qp.target.toLocaleString() : '—'}
              </td>
              <td className="p-2 text-right whitespace-nowrap text-[11px] font-mono text-slate-600 bg-slate-50/40">
                {qp.budget > 0 ? qp.budget.toLocaleString() : '—'}
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
        const beneficiaries = convertToBeneficiaries(regData.target, nationalActivity.uom, uomConfigs);
        const regionalEntries = regData.entries.filter(pe => !pe.zone_id);

        return (
          <React.Fragment key={`plan-na-${nationalActivity.id}-reg-${reg.id}`}>
            <tr className="text-xs bg-blue-50/25 hover:bg-blue-50/55 transition-colors border-b border-slate-200/70 font-normal">
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

              {/* Col 3: Target */}
              <td className="p-2.5 text-right font-medium whitespace-nowrap text-slate-800 font-mono">
                {regData.target > 0 ? `${regData.target.toLocaleString()} ${nationalActivity.uom}` : '—'}
              </td>

              {/* Col 4: Budget (ETB) */}
              <td className="p-2.5 text-right whitespace-nowrap font-medium text-slate-900 font-mono">
                {regData.budget > 0 ? regData.budget.toLocaleString() : '—'}
              </td>

              {/* Col 5: Beneficiaries */}
              <td className="p-2.5 text-right whitespace-nowrap text-slate-700 font-mono">
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

            {/* Regional-level Plan Entries (if any submitted directly by Regional Branch) */}
            {regionalEntries.map(pe => renderPlanEntryRow(pe, 'region', reg.name))}

            {/* Nested Zone Rows */}
            {hasZones && areZonesExpanded && regData.zones.map(z => {
              const zBen = convertToBeneficiaries(z.target, nationalActivity.uom, uomConfigs);
              return (
                <React.Fragment key={`plan-na-${nationalActivity.id}-zone-${z.zone.id}`}>
                  <tr className="text-xs bg-slate-50/80 hover:bg-sky-50/50 transition-colors border-b border-slate-200/50">
                    <td className="p-2 pl-12 whitespace-nowrap text-slate-600 text-[11px]">
                      <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        <span>Zone</span>
                      </div>
                    </td>
                    <td className="p-2 min-w-48 text-slate-700 font-medium">
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
                    <td className="p-2 text-right text-slate-700 font-mono">
                      {z.target > 0 ? `${z.target.toLocaleString()} ${nationalActivity.uom}` : '—'}
                    </td>
                    <td className="p-2 text-right text-slate-700 font-mono">
                      {z.budget > 0 ? z.budget.toLocaleString() : '—'}
                    </td>
                    <td className="p-2 text-right text-slate-600 font-mono">
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

                  {/* Zone Contributing Activities (Plan Entries) */}
                  {z.entries.map(pe => renderPlanEntryRow(pe, 'zone', z.zone.name))}

                  {/* If zone is linked but has no submitted entries yet */}
                  {z.entries.length === 0 && (
                    <tr className="text-xs bg-sky-50/10 border-b border-slate-200/40 italic text-slate-400">
                      <td className="p-2 pl-16 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-sky-600">
                          <CornerDownRight className="w-3 h-3 shrink-0 opacity-70" />
                          <span>Linked</span>
                        </div>
                      </td>
                      <td className="p-2 text-slate-400 text-[11px]">
                        Eligible contributing zone · No plan entries submitted yet
                      </td>
                      <td className="p-2 text-right text-slate-300 font-mono text-[11px]">—</td>
                      <td className="p-2 text-right text-slate-300 font-mono text-[11px]">—</td>
                      <td className="p-2 text-right text-slate-300 font-mono text-[11px]">—</td>
                      {visibleQuarters.map(qId => (
                        <React.Fragment key={`plan-zone-empty-q-${z.zone.id}-${qId}`}>
                          <td className="p-2 text-right whitespace-nowrap border-l border-slate-200 text-[11px] font-mono text-slate-300 bg-slate-50/20">—</td>
                          <td className="p-2 text-right whitespace-nowrap text-[11px] font-mono text-slate-300 bg-slate-50/20">—</td>
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
        const beneficiaries = convertToBeneficiaries(projData.target, nationalActivity.uom, uomConfigs);

        return (
          <React.Fragment key={`plan-na-${nationalActivity.id}-proj-${proj.id}`}>
            <tr className="text-xs bg-purple-50/25 hover:bg-purple-50/55 transition-colors border-b border-slate-200/70 font-normal">
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

              {/* Col 3: Target */}
              <td className="p-2.5 text-right font-medium whitespace-nowrap text-slate-800 font-mono">
                {projData.target > 0 ? `${projData.target.toLocaleString()} ${nationalActivity.uom}` : '—'}
              </td>

              {/* Col 4: Budget (ETB) */}
              <td className="p-2.5 text-right whitespace-nowrap font-medium text-slate-900 font-mono">
                {projData.budget > 0 ? projData.budget.toLocaleString() : '—'}
              </td>

              {/* Col 5: Beneficiaries */}
              <td className="p-2.5 text-right whitespace-nowrap text-slate-700 font-mono">
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

            {/* Project Contributing Activities (Plan Entries) */}
            {projData.entries.map(pe => renderPlanEntryRow(pe, 'project', proj.name))}

            {/* If project has baseline allocation but no submitted plan entries yet */}
            {projData.entries.length === 0 && projData.hasBaseline && (
              <tr className="text-xs bg-purple-50/10 border-b border-slate-200/40 italic text-slate-500">
                <td className="p-2 pl-12 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] text-purple-600">
                    <CornerDownRight className="w-3 h-3 shrink-0 opacity-70" />
                    <span>Allocation</span>
                  </div>
                </td>
                <td className="p-2 text-slate-500 text-[11px]">
                  Baseline project allocation (no detailed plan entries submitted yet)
                </td>
                <td className="p-2 text-right font-medium text-slate-600 font-mono text-[11px]">
                  {projData.target > 0 ? `${projData.target.toLocaleString()} ${nationalActivity.uom}` : '—'}
                </td>
                <td className="p-2 text-right font-medium text-slate-600 font-mono text-[11px]">
                  {projData.budget > 0 ? projData.budget.toLocaleString() : '—'}
                </td>
                <td className="p-2 text-right text-slate-500 font-mono text-[11px]">
                  {beneficiaries > 0 ? beneficiaries.toLocaleString() : '—'}
                </td>
                {visibleQuarters.map(qId => (
                  <React.Fragment key={`plan-proj-empty-q-${proj.id}-${qId}`}>
                    <td className="p-2 text-right whitespace-nowrap border-l border-slate-200 text-[11px] font-mono text-slate-300 bg-slate-50/20">—</td>
                    <td className="p-2 text-right whitespace-nowrap text-[11px] font-mono text-slate-300 bg-slate-50/20">—</td>
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
