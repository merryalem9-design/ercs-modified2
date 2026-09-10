// src/components/report/ReportFlatContributingRows.tsx
import React from 'react';
import { NationalActivity, QuarterFilterValue, QuarterId, UomFactorConfig } from '../../types';
import { MapPin, FolderGit2 } from 'lucide-react';
import { useContributingBreakdown } from '../../hooks/useContributingBreakdown';
import { convertToBeneficiaries } from '../../utils/calculations';

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
  const { displayedRegions, displayedProjects, getQuarterPlan } = useContributingBreakdown({
    nationalActivityId: nationalActivity.id,
    quarterId,
    scopeFilter,
    assignedRegionId,
    assignedProjectId,
  });

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

  return (
    <>
      {/* Contributing Regions */}
      {displayedRegions.map(regData => {
        const reg = regData.region;
        const totalBen = convertToBeneficiaries(regData.target, nationalActivity.uom, uomConfigs);
        const actualBen = convertToBeneficiaries(regData.actual, nationalActivity.uom, uomConfigs);
        const benPct = totalBen > 0 ? (actualBen / totalBen) * 100 : 0;
        const utilPct = regData.budget > 0 ? (regData.spent / regData.budget) * 100 : 0;

        return (
          <tr key={`rep-flat-na-${nationalActivity.id}-reg-${reg.id}`} className="text-xs bg-blue-50/20 hover:bg-blue-50/50 transition-colors border-b border-slate-200/70">
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
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-slate-800">{reg.name}</span>
                <span className="text-[10px] text-blue-700 bg-blue-100/70 border border-blue-200 px-1.5 py-0.5 rounded font-medium">
                  Contributing Region
                </span>
                {regData.targetPct > 0 && (
                  <span className="text-[10px] text-slate-400 font-normal">
                    ({regData.targetPct.toFixed(1)}% of act.)
                  </span>
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
            <td className="p-3 text-right font-bold whitespace-nowrap text-slate-800">
              {Math.round(regData.target).toLocaleString()}
            </td>
            <td className="p-3 text-right text-slate-300">—</td>
            <td className="p-3 text-right text-slate-300">—</td>
            <td className="p-3 text-right text-slate-300">—</td>

            {/* Actual & Disaggregation */}
            <td className="p-3 text-right font-bold whitespace-nowrap text-slate-900">
              {Math.round(regData.actual).toLocaleString()}
            </td>
            <td className="p-3 text-right text-slate-300">—</td>
            <td className="p-3 text-right text-slate-300">—</td>
            <td className="p-3 text-right text-slate-300">—</td>

            {/* Achievement % */}
            <td className="p-3 text-right font-bold whitespace-nowrap">
              {regData.ach.toFixed(1)}%
            </td>

            {/* Budget, Spent, Util */}
            <td className="p-3 text-right whitespace-nowrap text-slate-800 font-medium">
              {Math.round(regData.budget).toLocaleString()}
            </td>
            <td className="p-3 text-right whitespace-nowrap text-slate-800 font-medium">
              {Math.round(regData.spent).toLocaleString()}
            </td>
            <td className="p-3 text-right font-bold whitespace-nowrap">
              {utilPct.toFixed(1)}%
            </td>

            {/* Beneficiaries */}
            <td className="p-3 text-right whitespace-nowrap">{Math.round(totalBen).toLocaleString()}</td>
            <td className="p-3 text-right whitespace-nowrap">{Math.round(actualBen).toLocaleString()}</td>
            <td className="p-3 text-right whitespace-nowrap">{benPct.toFixed(1)}%</td>

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
          <tr key={`rep-flat-na-${nationalActivity.id}-proj-${proj.id}`} className="text-xs bg-purple-50/20 hover:bg-purple-50/50 transition-colors border-b border-slate-200/70">
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

            <td className="p-3 text-right font-bold whitespace-nowrap text-slate-800">
              {Math.round(projData.target).toLocaleString()}
            </td>
            <td className="p-3 text-right text-slate-300">—</td>
            <td className="p-3 text-right text-slate-300">—</td>
            <td className="p-3 text-right text-slate-300">—</td>

            <td className="p-3 text-right font-bold whitespace-nowrap text-slate-900">
              {Math.round(projData.actual).toLocaleString()}
            </td>
            <td className="p-3 text-right text-slate-300">—</td>
            <td className="p-3 text-right text-slate-300">—</td>
            <td className="p-3 text-right text-slate-300">—</td>

            <td className="p-3 text-right font-bold whitespace-nowrap">
              {projData.ach.toFixed(1)}%
            </td>

            <td className="p-3 text-right whitespace-nowrap text-slate-800 font-medium">
              {Math.round(projData.budget).toLocaleString()}
            </td>
            <td className="p-3 text-right whitespace-nowrap text-slate-800 font-medium">
              {Math.round(projData.spent).toLocaleString()}
            </td>
            <td className="p-3 text-right font-bold whitespace-nowrap">
              {utilPct.toFixed(1)}%
            </td>

            <td className="p-3 text-right whitespace-nowrap">{Math.round(totalBen).toLocaleString()}</td>
            <td className="p-3 text-right whitespace-nowrap">{Math.round(actualBen).toLocaleString()}</td>
            <td className="p-3 text-right whitespace-nowrap">{benPct.toFixed(1)}%</td>

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
        );
      })}
    </>
  );
};
