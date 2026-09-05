import React, { useState } from 'react';
import { Region } from '../../types';

export interface BranchBeneficiaryData {
  region: Region;
  target: number;
  actual: number;
  pct: number;
}

interface BranchBeneficiaryChoroplethProps {
  data: BranchBeneficiaryData[];
  title?: string;
  onRegionClick?: (regionId: string) => void;
}

// Geographic clusters for the 15 regions of Ethiopia
const REGION_CLUSTERS: { name: string; regionIds: string[] }[] = [
  { name: 'Northern', regionIds: ['reg-tigray', 'reg-amhara', 'reg-afar'] },
  { name: 'Central & Capital', regionIds: ['reg-addis-ababa', 'reg-oromia', 'reg-central-ethiopia'] },
  { name: 'Western', regionIds: ['reg-benishangul-gumuz', 'reg-gambella', 'reg-south-west-ethiopia'] },
  { name: 'Southern & Cross-Border', regionIds: ['reg-sidama', 'reg-south-ethiopia', 'reg-moyale'] },
  { name: 'Eastern', regionIds: ['reg-dire-dawa', 'reg-harar', 'reg-somali'] },
];

export const BranchBeneficiaryChoropleth: React.FC<BranchBeneficiaryChoroplethProps> = ({
  data,
  title = 'Direct Community Beneficiaries by Branch (P1–P3)',
  onRegionClick,
}) => {
  const [hoveredBranch, setHoveredBranch] = useState<{
    name: string;
    actual: number;
    target: number;
    pct: number;
    x: number;
    y: number;
  } | null>(null);

  const maxActual = Math.max(...data.map(d => d.actual), 1);

  const getIntensityColor = (actual: number) => {
    if (actual === 0) return 'bg-slate-50 border-slate-200 text-slate-500';
    const ratio = actual / maxActual;
    if (ratio < 0.15) return 'bg-sky-50 border-sky-200 text-sky-900';
    if (ratio < 0.35) return 'bg-sky-100 border-sky-300 text-sky-950';
    if (ratio < 0.6) return 'bg-blue-200 border-blue-400 text-blue-950 font-bold';
    if (ratio < 0.85) return 'bg-blue-400 border-blue-500 text-white font-bold';
    return 'bg-blue-600 border-blue-700 text-white font-bold';
  };

  const handleMouseEnter = (e: React.MouseEvent, item: BranchBeneficiaryData) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredBranch({
      name: item.region.name,
      actual: item.actual,
      target: item.target,
      pct: item.pct,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 relative">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div>
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            {title}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Regional distribution across all 15 branches grouped by geographic zone • Labeled choropleth grid
          </p>
        </div>
        <div className="text-xs font-black text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
          Max: {Math.round(maxActual).toLocaleString()} reached
        </div>
      </div>

      <div className="space-y-4">
        {REGION_CLUSTERS.map(cluster => {
          const clusterItems = cluster.regionIds
            .map(id => data.find(d => d.region.id === id))
            .filter((d): d is BranchBeneficiaryData => Boolean(d));

          return (
            <div key={cluster.name}>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                <span>{cluster.name} Zone</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {clusterItems.map(item => {
                  const colorClass = getIntensityColor(item.actual);
                  return (
                    <div
                      key={item.region.id}
                      onClick={() => onRegionClick?.(item.region.id)}
                      onMouseEnter={e => handleMouseEnter(e, item)}
                      onMouseLeave={() => setHoveredBranch(null)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer shadow-xs ${colorClass} ${
                        onRegionClick ? 'hover:scale-[1.02] hover:shadow-md' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold truncate" title={item.region.name}>
                          {item.region.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/10">
                          {item.pct.toFixed(0)}%
                        </span>
                      </div>
                      <div className="text-base font-black mt-1">
                        {Math.round(item.actual).toLocaleString()}
                      </div>
                      <div className="text-[9px] opacity-80 mt-0.5">
                        Target: {Math.round(item.target).toLocaleString()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Intensity Legend */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-[10px] text-slate-500">
        <span className="font-bold text-slate-600">Beneficiaries Reached Intensity:</span>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300 inline-block" /> 0 Reached
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-sky-100 border border-sky-300 inline-block" /> Low
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-blue-200 border border-blue-400 inline-block" /> Moderate
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-blue-400 border border-blue-500 inline-block" /> High
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-blue-600 border border-blue-700 inline-block" /> Peak
          </span>
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredBranch && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full bg-slate-900 text-white text-xs rounded-lg shadow-xl px-3 py-2 w-60 border border-slate-700"
          style={{ left: hoveredBranch.x, top: hoveredBranch.y }}
        >
          <div className="font-bold text-white truncate">{hoveredBranch.name}</div>
          <div className="mt-2 pt-1.5 border-t border-slate-700 space-y-1">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-400">Reached:</span>
              <span className="font-extrabold text-sky-400">
                {Math.round(hoveredBranch.actual).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-300">
              <span>Target:</span>
              <span className="font-medium">
                {Math.round(hoveredBranch.target).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center text-[10px] text-slate-300">
              <span>Achievement:</span>
              <span className="font-bold text-emerald-400">{hoveredBranch.pct.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
