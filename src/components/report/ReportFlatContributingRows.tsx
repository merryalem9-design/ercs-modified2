// src/components/report/ReportFlatContributingRows.tsx
import React, { useState } from 'react';
import { NationalActivity, QuarterFilterValue, QuarterId, UomFactorConfig, PlanEntry } from '../../types';
import { MapPin, FolderGit2, ChevronDown, ChevronRight, CornerDownRight } from 'lucide-react';
import { useContributingBreakdown } from '../../hooks/useContributingBreakdown';
import {
  convertToBeneficiaries,
  sumPlannedTarget,
  sumPlannedBudget,
  sumActual,
  sumExpenditure,
  achievementPct,
} from '../../utils/calculations';

interface ReportFlatContributingRowsProps {
  nationalActivity: NationalActivity;
  quarterId?: QuarterFilterValue;
  visibleQuarters: QuarterId[];
  uomConfigs: UomFactorConfig[];
  scopeFilter?: 'Regional' | 'Project';
  assignedRegionId?: string;
  assignedProjectId?: string;
}

export const ReportFlatContributingRows: React.FC<ReportFlatContributingRowsProps> = ({
  nationalActivity,
  quarterId,
  visibleQuarters,
  uomConfigs,
  scopeFilter,
  assignedRegionId,
  assignedProjectId,
}) => {
  const {
    displayedRegions,
    displayedProjects,
    getQuarterPlan,
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

  const totalCols = 23 + visibleQuarters.length * 2;

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
    parentName?: string
  ) => {
    const peTarget = sumPlannedTarget([pe], quarterlyPlans, q);
    const peBudget = sumPlannedBudget([pe], quarterlyPlans, q);
    const peActual = sumActual([pe], quarterlyActuals, q);
    const peSpent = sumExpenditure([pe], quarterlyActuals, q);
    const peAch = achievementPct(peActual, peTarget);
    const peUtil = peBudget > 0 ? (peSpent / peBudget) * 100 : 0;
    const peTotalBen = convertToBeneficiaries(peTarget, pe.uom || nationalActivity.uom, uomConfigs);
    const peActualBen = convertToBeneficiaries(peActual, pe.uom || nationalActivity.uom, uomConfigs);
    const peBenPct = peTotalBen > 0 ? (peActualBen / peTotalBen) * 100 : 0;

    const indentClass = indentLevel === 'zone' ? 'pl-10' : 'pl-6';
    const colorClass =
      indentLevel === 'project'
        ? 'text-purple-700'
        : indentLevel === 'zone'
        ? 'text-sky-700'
        : 'text-blue-700';

    return (
      <tr
        key={`rep-flat-pe-${pe.id}`}
        className="text-xs bg-slate-50/40 hover:bg-slate-100/60 transition-colors border-b border-slate-200/50"
      >
        <td className="p-3 text-slate-400">—</td>
        <td className="p-3 text-slate-400">—</td>

        {/* Code */}
        <td className="p-3 whitespace-nowrap">
          <div className={`flex items-center gap-1.5 font-mono ${colorClass} ${indentClass} font-semibold`}>
            <CornerDownRight className="w-3 h-3 shrink-0 opacity-70" />
            <span>{pe.activity_code || '—'}</span>
          </div>
        </td>

        {/* Activity Name */}
        <td className="p-3 min-w-40">
          <div className="flex items-center gap-1.5 flex-wrap">
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
            {parentName && (
              <span className="text-[10px] text-slate-400 font-normal">({parentName})</span>
            )}
          </div>
        </td>

        {/* Description */}
        <td className="p-3 text-slate-500 min-w-56 text-[11px]">{pe.activity_description || '—'}</td>

        {/* Map */}
        <td className="p-3 text-center text-slate-300">—</td>

        {/* UOM */}
        <td className="p-3 text-slate-500">{pe.uom || nationalActivity.uom || '—'}</td>

        {/* Executed By */}
        <td className="p-3">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              indentLevel === 'project'
                ? 'bg-purple-50 text-purple-700'
                : indentLevel === 'zone'
                ? 'bg-sky-50 text-sky-700'
                : 'bg-blue-50 text-blue-700'
            }`}
          >
            {indentLevel === 'project' ? 'Project' : indentLevel === 'zone' ? 'Zone' : 'Regional'}
          </span>
        </td>

        {/* Target & Disaggregation */}
        <td className="p-3 text-right font-bold whitespace-nowrap text-slate-800 font-mono">
          {Math.round(peTarget).toLocaleString()}
        </td>
        <td className="p-3 text-right text-slate-600 font-mono text-[11px]">
          {pe.target_female != null ? pe.target_female.toLocaleString() : '—'}
        </td>
        <td className="p-3 text-right text-slate-600 font-mono text-[11px]">
          {pe.target_male != null ? pe.target_male.toLocaleString() : '—'}
        </td>
        <td className="p-3 text-right text-slate-600 font-mono text-[11px]">
          {pe.target_youth != null ? pe.target_youth.toLocaleString() : '—'}
        </td>

        {/* Actual & Disaggregation */}
        <td className="p-3 text-right font-bold whitespace-nowrap text-slate-900 font-mono">
          {Math.round(peActual).toLocaleString()}
        </td>
        <td className="p-3 text-right text-slate-300">—</td>
        <td className="p-3 text-right text-slate-300">—</td>
        <td className="p-3 text-right text-slate-300">—</td>

        {/* Achievement % */}
        <td className="p-3 text-right font-bold whitespace-nowrap font-mono">
          {peAch.toFixed(1)}%
        </td>

        {/* Budget, Spent, Util */}
        <td className="p-3 text-right whitespace-nowrap text-slate-800 font-medium font-mono">
          {Math.round(peBudget).toLocaleString()}
        </td>
        <td className="p-3 text-right whitespace-nowrap text-slate-800 font-medium font-mono">
          {Math.round(peSpent).toLocaleString()}
        </td>
        <td className="p-3 text-right font-bold whitespace-nowrap font-mono">
          {peUtil.toFixed(1)}%
        </td>

        {/* Beneficiaries */}
        <td className="p-3 text-right whitespace-nowrap font-mono">{Math.round(peTotalBen).toLocaleString()}</td>
        <td className="p-3 text-right whitespace-nowrap font-mono">{Math.round(peActualBen).toLocaleString()}</td>
        <td className="p-3 text-right whitespace-nowrap font-mono">{peBenPct.toFixed(1)}%</td>

        {/* Quarterly */}
        {visibleQuarters.map(qId => {
          const qp = getQuarterPlan([pe], qId);
          return (
            <React.Fragment key={`rep-flat-pe-q-${pe.id}-${qId}`}>
              <td className="p-2 text-right whitespace-nowrap bg-blue-50/40 border-l border-slate-200 text-[11px] font-mono text-slate-700">
                {Math.round(qp.target).toLocaleString()}
              </td>
              <td className="p-2 text-right whitespace-nowrap bg-blue-50/40 text-[11px] font-mono text-slate-700">
                {Math.round(qp.budget).toLocaleString()}
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
        const totalBen = convertToBeneficiaries(regData.target, nationalActivity.uom, uomConfigs);
        const actualBen = convertToBeneficiaries(regData.actual, nationalActivity.uom, uomConfigs);
        const benPct = totalBen > 0 ? (actualBen / totalBen) * 100 : 0;
        const utilPct = regData.budget > 0 ? (regData.spent / regData.budget) * 100 : 0;
        const hasZones = regData.zones && regData.zones.length > 0;
        const areZonesExpanded = expandedZoneRegionIds.has(reg.id);
        const regionalEntries = regData.entries.filter(pe => !pe.zone_id);

        return (
          <React.Fragment key={`rep-flat-na-${nationalActivity.id}-reg-${reg.id}`}>
            <tr className="text-xs bg-blue-50/20 hover:bg-blue-50/50 transition-colors border-b border-slate-200/70">
              {/* Priority & Objective: blank / dash */}
              <td className="p-3 text-slate-400">—</td>
              <td className="p-3 text-slate-400">—</td>

              {/* Code */}
              <td className="p-3 whitespace-nowrap">
                <div className="flex items-center gap-1.5 text-blue-700 font-semibold pl-4">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Region</span>
                </div>
              </td>

              {/* Activity Name */}
              <td className="p-3 min-w-40">
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

              {/* Description */}
              <td className="p-3 text-slate-400 min-w-56">—</td>

              {/* Map */}
              <td className="p-3 text-center text-slate-300">—</td>

              {/* UOM */}
              <td className="p-3 text-slate-500">{nationalActivity.uom || '—'}</td>

              {/* Executed By */}
              <td className="p-3">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">
                  Regional
                </span>
              </td>

              {/* Target & Disaggregation */}
              <td className="p-3 text-right font-bold whitespace-nowrap text-slate-800 font-mono">
                {Math.round(regData.target).toLocaleString()}
              </td>
              <td className="p-3 text-right text-slate-300">—</td>
              <td className="p-3 text-right text-slate-300">—</td>
              <td className="p-3 text-right text-slate-300">—</td>

              {/* Actual & Disaggregation */}
              <td className="p-3 text-right font-bold whitespace-nowrap text-slate-900 font-mono">
                {Math.round(regData.actual).toLocaleString()}
              </td>
              <td className="p-3 text-right text-slate-300">—</td>
              <td className="p-3 text-right text-slate-300">—</td>
              <td className="p-3 text-right text-slate-300">—</td>

              {/* Achievement % */}
              <td className="p-3 text-right font-bold whitespace-nowrap font-mono">
                {regData.ach.toFixed(1)}%
              </td>

              {/* Budget, Spent, Util */}
              <td className="p-3 text-right whitespace-nowrap text-slate-800 font-medium font-mono">
                {Math.round(regData.budget).toLocaleString()}
              </td>
              <td className="p-3 text-right whitespace-nowrap text-slate-800 font-medium font-mono">
                {Math.round(regData.spent).toLocaleString()}
              </td>
              <td className="p-3 text-right font-bold whitespace-nowrap font-mono">
                {utilPct.toFixed(1)}%
              </td>

              {/* Beneficiaries */}
              <td className="p-3 text-right whitespace-nowrap font-mono">{Math.round(totalBen).toLocaleString()}</td>
              <td className="p-3 text-right whitespace-nowrap font-mono">{Math.round(actualBen).toLocaleString()}</td>
              <td className="p-3 text-right whitespace-nowrap font-mono">{benPct.toFixed(1)}%</td>

              {/* Quarterly */}
              {visibleQuarters.map(qId => {
                const qp = getQuarterPlan(regData.entries, qId);
                return (
                  <React.Fragment key={`rep-flat-reg-q-${reg.id}-${qId}`}>
                    <td className="p-2 text-right whitespace-nowrap bg-blue-50 border-l border-slate-200 text-[11px] font-mono text-slate-700">
                      {Math.round(qp.target).toLocaleString()}
                    </td>
                    <td className="p-2 text-right whitespace-nowrap bg-blue-50 text-[11px] font-mono text-slate-700">
                      {Math.round(qp.budget).toLocaleString()}
                    </td>
                  </React.Fragment>
                );
              })}
            </tr>

            {/* Regional Plan Entries */}
            {regionalEntries.map(pe => renderPlanEntryRow(pe, 'region', reg.name))}

            {/* Nested Zone Rows */}
            {hasZones && areZonesExpanded && regData.zones.map(z => {
              const zTotalBen = convertToBeneficiaries(z.target, nationalActivity.uom, uomConfigs);
              const zActualBen = convertToBeneficiaries(z.actual, nationalActivity.uom, uomConfigs);
              const zBenPct = zTotalBen > 0 ? (zActualBen / zTotalBen) * 100 : 0;
              const zUtilPct = z.budget > 0 ? (z.spent / z.budget) * 100 : 0;

              return (
                <React.Fragment key={`rep-flat-na-${nationalActivity.id}-zone-${z.zone.id}`}>
                  <tr className="text-xs bg-slate-50/80 hover:bg-sky-50/50 transition-colors border-b border-slate-200/50">
                    <td className="p-3 text-slate-400">—</td>
                    <td className="p-3 text-slate-400">—</td>

                    {/* Code */}
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-600 font-semibold pl-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        <span>Zone</span>
                      </div>
                    </td>

                    {/* Activity Name */}
                    <td className="p-3 min-w-40">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-slate-800">{z.zone.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({reg.name})</span>
                        {z.entries.length > 0 && (
                          <span className="text-[10px] text-sky-700 bg-sky-100/70 border border-sky-200 px-1 py-0.2 rounded font-medium">
                            {z.entries.length} {z.entries.length === 1 ? 'activity' : 'activities'}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="p-3 text-slate-400 min-w-56">—</td>
                    <td className="p-3 text-center text-slate-300">—</td>
                    <td className="p-3 text-slate-500">{nationalActivity.uom || '—'}</td>

                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700">
                        Zone
                      </span>
                    </td>

                    {/* Target & Disaggregation */}
                    <td className="p-3 text-right font-bold whitespace-nowrap text-slate-800 font-mono">
                      {Math.round(z.target).toLocaleString()}
                    </td>
                    <td className="p-3 text-right text-slate-300">—</td>
                    <td className="p-3 text-right text-slate-300">—</td>
                    <td className="p-3 text-right text-slate-300">—</td>

                    {/* Actual & Disaggregation */}
                    <td className="p-3 text-right font-bold whitespace-nowrap text-slate-900 font-mono">
                      {Math.round(z.actual).toLocaleString()}
                    </td>
                    <td className="p-3 text-right text-slate-300">—</td>
                    <td className="p-3 text-right text-slate-300">—</td>
                    <td className="p-3 text-right text-slate-300">—</td>

                    {/* Achievement % */}
                    <td className="p-3 text-right font-bold whitespace-nowrap font-mono">
                      {z.ach.toFixed(1)}%
                    </td>

                    {/* Budget, Spent, Util */}
                    <td className="p-3 text-right whitespace-nowrap text-slate-800 font-medium font-mono">
                      {Math.round(z.budget).toLocaleString()}
                    </td>
                    <td className="p-3 text-right whitespace-nowrap text-slate-800 font-medium font-mono">
                      {Math.round(z.spent).toLocaleString()}
                    </td>
                    <td className="p-3 text-right font-bold whitespace-nowrap font-mono">
                      {zUtilPct.toFixed(1)}%
                    </td>

                    {/* Beneficiaries */}
                    <td className="p-3 text-right whitespace-nowrap font-mono">{Math.round(zTotalBen).toLocaleString()}</td>
                    <td className="p-3 text-right whitespace-nowrap font-mono">{Math.round(zActualBen).toLocaleString()}</td>
                    <td className="p-3 text-right whitespace-nowrap font-mono">{zBenPct.toFixed(1)}%</td>

                    {/* Quarterly */}
                    {visibleQuarters.map(qId => {
                      const zQp = getQuarterPlan(z.entries, qId);
                      return (
                        <React.Fragment key={`rep-flat-zone-q-${z.zone.id}-${qId}`}>
                          <td className="p-2 text-right whitespace-nowrap bg-blue-50/40 border-l border-slate-200 text-[11px] font-mono text-slate-700">
                            {Math.round(zQp.target).toLocaleString()}
                          </td>
                          <td className="p-2 text-right whitespace-nowrap bg-blue-50/40 text-[11px] font-mono text-slate-700">
                            {Math.round(zQp.budget).toLocaleString()}
                          </td>
                        </React.Fragment>
                      );
                    })}
                  </tr>

                  {/* Zone Contributing Activities */}
                  {z.entries.map(pe => renderPlanEntryRow(pe, 'zone', z.zone.name))}

                  {/* Zone empty state */}
                  {z.entries.length === 0 && (
                    <tr className="text-xs bg-sky-50/10 border-b border-slate-200/40 italic text-slate-400">
                      <td className="p-3 text-slate-400">—</td>
                      <td className="p-3 text-slate-400">—</td>
                      <td className="p-3 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-mono text-sky-600 pl-10">
                          <CornerDownRight className="w-3 h-3 shrink-0 opacity-70" />
                          <span>Linked</span>
                        </div>
                      </td>
                      <td className="p-3 text-slate-400 text-[11px]">
                        Eligible contributing zone · No plan entries submitted yet
                      </td>
                      <td className="p-3 text-slate-400">—</td>
                      <td className="p-3 text-center text-slate-300">—</td>
                      <td className="p-3 text-slate-400">{nationalActivity.uom || '—'}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-600">
                          Zone
                        </span>
                      </td>
                      <td className="p-3 text-right text-slate-300 font-mono">—</td>
                      <td className="p-3 text-right text-slate-300 font-mono">—</td>
                      <td className="p-3 text-right text-slate-300 font-mono">—</td>
                      <td className="p-3 text-right text-slate-300 font-mono">—</td>
                      <td className="p-3 text-right text-slate-300 font-mono">—</td>
                      <td className="p-3 text-right text-slate-300 font-mono">—</td>
                      <td className="p-3 text-right text-slate-300 font-mono">—</td>
                      <td className="p-3 text-right text-slate-300 font-mono">—</td>
                      <td className="p-3 text-right text-slate-300 font-mono">—</td>
                      <td className="p-3 text-right text-slate-300 font-mono">—</td>
                      <td className="p-3 text-right text-slate-300 font-mono">—</td>
                      <td className="p-3 text-right text-slate-300 font-mono">—</td>
                      <td className="p-3 text-right text-slate-300 font-mono">—</td>
                      <td className="p-3 text-right text-slate-300 font-mono">—</td>
                      <td className="p-3 text-right text-slate-300 font-mono">—</td>
                      {visibleQuarters.map(qId => (
                        <React.Fragment key={`rep-flat-zone-empty-q-${z.zone.id}-${qId}`}>
                          <td className="p-2 text-right whitespace-nowrap bg-blue-50/20 border-l border-slate-200 text-[11px] font-mono text-slate-300">—</td>
                          <td className="p-2 text-right whitespace-nowrap bg-blue-50/20 text-[11px] font-mono text-slate-300">—</td>
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
        const totalBen = convertToBeneficiaries(projData.target, nationalActivity.uom, uomConfigs);
        const actualBen = convertToBeneficiaries(projData.actual, nationalActivity.uom, uomConfigs);
        const benPct = totalBen > 0 ? (actualBen / totalBen) * 100 : 0;
        const utilPct = projData.budget > 0 ? (projData.spent / projData.budget) * 100 : 0;

        return (
          <React.Fragment key={`rep-flat-na-${nationalActivity.id}-proj-${proj.id}`}>
            <tr className="text-xs bg-purple-50/20 hover:bg-purple-50/50 transition-colors border-b border-slate-200/70">
              <td className="p-3 text-slate-400">—</td>
              <td className="p-3 text-slate-400">—</td>

              <td className="p-3 whitespace-nowrap">
                <div className="flex items-center gap-1.5 text-purple-700 font-semibold pl-4">
                  <FolderGit2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span>Project</span>
                </div>
              </td>

              <td className="p-3 min-w-40">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
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

              <td className="p-3 text-slate-400 min-w-56">—</td>
              <td className="p-3 text-center text-slate-300">—</td>
              <td className="p-3 text-slate-500">{nationalActivity.uom || '—'}</td>

              <td className="p-3">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700">
                  Project
                </span>
              </td>

              <td className="p-3 text-right font-bold whitespace-nowrap text-slate-800 font-mono">
                {Math.round(projData.target).toLocaleString()}
              </td>
              <td className="p-3 text-right text-slate-300">—</td>
              <td className="p-3 text-right text-slate-300">—</td>
              <td className="p-3 text-right text-slate-300">—</td>

              <td className="p-3 text-right font-bold whitespace-nowrap text-slate-900 font-mono">
                {Math.round(projData.actual).toLocaleString()}
              </td>
              <td className="p-3 text-right text-slate-300">—</td>
              <td className="p-3 text-right text-slate-300">—</td>
              <td className="p-3 text-right text-slate-300">—</td>

              <td className="p-3 text-right font-bold whitespace-nowrap font-mono">
                {projData.ach.toFixed(1)}%
              </td>

              <td className="p-3 text-right whitespace-nowrap text-slate-800 font-medium font-mono">
                {Math.round(projData.budget).toLocaleString()}
              </td>
              <td className="p-3 text-right whitespace-nowrap text-slate-800 font-medium font-mono">
                {Math.round(projData.spent).toLocaleString()}
              </td>
              <td className="p-3 text-right font-bold whitespace-nowrap font-mono">
                {utilPct.toFixed(1)}%
              </td>

              <td className="p-3 text-right whitespace-nowrap font-mono">{Math.round(totalBen).toLocaleString()}</td>
              <td className="p-3 text-right whitespace-nowrap font-mono">{Math.round(actualBen).toLocaleString()}</td>
              <td className="p-3 text-right whitespace-nowrap font-mono">{benPct.toFixed(1)}%</td>

              {visibleQuarters.map(qId => {
                const qp = getQuarterPlan(projData.entries, qId);
                return (
                  <React.Fragment key={`rep-flat-proj-q-${proj.id}-${qId}`}>
                    <td className="p-2 text-right whitespace-nowrap bg-blue-50 border-l border-slate-200 text-[11px] font-mono text-slate-700">
                      {Math.round(qp.target).toLocaleString()}
                    </td>
                    <td className="p-2 text-right whitespace-nowrap bg-blue-50 text-[11px] font-mono text-slate-700">
                      {Math.round(qp.budget).toLocaleString()}
                    </td>
                  </React.Fragment>
                );
              })}
            </tr>

            {/* Project Contributing Activities */}
            {projData.entries.map(pe => renderPlanEntryRow(pe, 'project', proj.name))}

            {/* Baseline project allocation when no entries submitted yet */}
            {projData.entries.length === 0 && projData.hasBaseline && (
              <tr className="text-xs bg-purple-50/10 border-b border-slate-200/40 italic text-slate-500">
                <td className="p-3 text-slate-400">—</td>
                <td className="p-3 text-slate-400">—</td>
                <td className="p-3 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 font-mono text-purple-600 pl-6">
                    <CornerDownRight className="w-3 h-3 shrink-0 opacity-70" />
                    <span>Allocation</span>
                  </div>
                </td>
                <td className="p-3 text-slate-500 text-[11px]">
                  Baseline project allocation (no detailed plan entries submitted yet)
                </td>
                <td className="p-3 text-slate-400 min-w-56">—</td>
                <td className="p-3 text-center text-slate-300">—</td>
                <td className="p-3 text-slate-500">{nationalActivity.uom || '—'}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700">
                    Project
                  </span>
                </td>
                <td className="p-3 text-right font-medium whitespace-nowrap text-slate-600 font-mono">
                  {Math.round(projData.target).toLocaleString()}
                </td>
                <td className="p-3 text-right text-slate-300">—</td>
                <td className="p-3 text-right text-slate-300">—</td>
                <td className="p-3 text-right text-slate-300">—</td>
                <td className="p-3 text-right font-medium whitespace-nowrap text-slate-600 font-mono">
                  {Math.round(projData.actual).toLocaleString()}
                </td>
                <td className="p-3 text-right text-slate-300">—</td>
                <td className="p-3 text-right text-slate-300">—</td>
                <td className="p-3 text-right text-slate-300">—</td>
                <td className="p-3 text-right font-medium whitespace-nowrap font-mono">
                  {projData.ach.toFixed(1)}%
                </td>
                <td className="p-3 text-right whitespace-nowrap text-slate-600 font-medium font-mono">
                  {Math.round(projData.budget).toLocaleString()}
                </td>
                <td className="p-3 text-right whitespace-nowrap text-slate-600 font-medium font-mono">
                  {Math.round(projData.spent).toLocaleString()}
                </td>
                <td className="p-3 text-right font-medium whitespace-nowrap font-mono">
                  {utilPct.toFixed(1)}%
                </td>
                <td className="p-3 text-right whitespace-nowrap font-mono">{Math.round(totalBen).toLocaleString()}</td>
                <td className="p-3 text-right whitespace-nowrap font-mono">{Math.round(actualBen).toLocaleString()}</td>
                <td className="p-3 text-right whitespace-nowrap font-mono">{benPct.toFixed(1)}%</td>
                {visibleQuarters.map(qId => (
                  <React.Fragment key={`rep-flat-proj-empty-q-${proj.id}-${qId}`}>
                    <td className="p-2 text-right whitespace-nowrap bg-blue-50/20 border-l border-slate-200 text-[11px] font-mono text-slate-300">—</td>
                    <td className="p-2 text-right whitespace-nowrap bg-blue-50/20 text-[11px] font-mono text-slate-300">—</td>
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
