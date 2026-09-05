import React, { useState } from 'react';
import { Region, StrategicPriority } from '../../types';

export interface BranchAchievementData {
  region: Region;
  achievement: number;
  actual: number;
  target: number;
  byPriority?: Record<string, { achievement: number; actual: number; target: number }>;
}

interface BranchHeatmapProps {
  data: BranchAchievementData[];
  mode?: 'single' | 'matrix';
  priorities?: StrategicPriority[];
  title?: string;
  onRegionClick?: (regionId: string) => void;
}

const getColorClasses = (pct: number) => {
  if (pct === 0) return 'bg-slate-100 text-slate-500 border-slate-200';
  if (pct < 50) return 'bg-rose-100 hover:bg-rose-200 text-rose-900 border-rose-300';
  if (pct < 70) return 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300';
  if (pct < 85) return 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-emerald-300';
  if (pct <= 100) return 'bg-emerald-200 hover:bg-emerald-300 text-emerald-950 border-emerald-400';
  return 'bg-indigo-100 hover:bg-indigo-200 text-indigo-900 border-indigo-300';
};

export const BranchHeatmap: React.FC<BranchHeatmapProps> = ({
  data,
  mode = 'single',
  priorities = [],
  title,
  onRegionClick,
}) => {
  const [hoveredInfo, setHoveredInfo] = useState<{
    title: string;
    subtitle?: string;
    achievement: number;
    actual: number;
    target: number;
    x: number;
    y: number;
  } | null>(null);

  const handleMouseEnter = (
    e: React.MouseEvent,
    info: { title: string; subtitle?: string; achievement: number; actual: number; target: number }
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredInfo({
      ...info,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
  };

  const handleMouseLeave = () => setHoveredInfo(null);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-4 relative">
      <div className="flex items-center justify-between mb-3">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
          {title || (mode === 'single' ? 'Branch Achievement Heatmap' : 'Branch × Priority Achievement Matrix')}
        </div>
        <div className="text-[11px] text-slate-400 font-medium">
          {data.length} Branches • Color-scaled by Achievement %
        </div>
      </div>

      {mode === 'single' ? (
        /* Single grid mode: 15 branches as cards/cells with names and percentages */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {data.map(item => {
            const colorClass = getColorClasses(item.achievement);
            return (
              <div
                key={item.region.id}
                onClick={() => onRegionClick?.(item.region.id)}
                onMouseEnter={e =>
                  handleMouseEnter(e, {
                    title: item.region.name,
                    achievement: item.achievement,
                    actual: item.actual,
                    target: item.target,
                  })
                }
                onMouseLeave={handleMouseLeave}
                className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer shadow-xs ${colorClass} ${
                  onRegionClick ? 'hover:scale-[1.02] hover:shadow-md' : ''
                }`}
              >
                <div className="text-[11px] font-bold truncate" title={item.region.name}>
                  {item.region.name}
                </div>
                <div className="text-lg font-black tracking-tight mt-0.5">
                  {item.achievement.toFixed(1)}%
                </div>
                <div className="text-[9px] opacity-75 mt-0.5">
                  {Math.round(item.actual).toLocaleString()} / {Math.round(item.target).toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Matrix mode: 15 Region rows × SP1-SP8 columns */
        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full border-collapse text-[11px]">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2 px-2 text-left font-bold text-slate-600 bg-slate-50 sticky left-0 z-10 w-36">
                  Branch
                </th>
                {priorities.map(p => (
                  <th key={p.id} className="py-2 px-1 text-center font-bold text-slate-600 min-w-[58px]" title={`${p.code}: ${p.name}`}>
                    {p.code}
                  </th>
                ))}
                <th className="py-2 px-2 text-center font-bold text-slate-800 bg-slate-50 min-w-[65px]">
                  Overall
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.region.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td
                    className="py-1.5 px-2 font-semibold text-slate-700 bg-white sticky left-0 z-10 truncate cursor-pointer hover:text-ercs-red"
                    onClick={() => onRegionClick?.(row.region.id)}
                    title={row.region.name}
                  >
                    {row.region.name}
                  </td>
                  {priorities.map(p => {
                    const cell = row.byPriority?.[p.id] || { achievement: 0, actual: 0, target: 0 };
                    const cellColor = getColorClasses(cell.achievement);
                    return (
                      <td key={p.id} className="py-1 px-1 text-center">
                        <div
                          onMouseEnter={e =>
                            handleMouseEnter(e, {
                              title: row.region.name,
                              subtitle: `${p.code} — ${p.name}`,
                              achievement: cell.achievement,
                              actual: cell.actual,
                              target: cell.target,
                            })
                          }
                          onMouseLeave={handleMouseLeave}
                          className={`rounded px-1 py-1 font-bold text-[10px] border transition-transform hover:scale-110 cursor-pointer ${cellColor}`}
                        >
                          {cell.achievement.toFixed(0)}%
                        </div>
                      </td>
                    );
                  })}
                  <td className="py-1 px-1 text-center bg-slate-50">
                    <div
                      onMouseEnter={e =>
                        handleMouseEnter(e, {
                          title: row.region.name,
                          subtitle: 'Overall Branch Achievement',
                          achievement: row.achievement,
                          actual: row.actual,
                          target: row.target,
                        })
                      }
                      onMouseLeave={handleMouseLeave}
                      className={`rounded px-1.5 py-1 font-black text-[11px] border cursor-pointer ${getColorClasses(row.achievement)}`}
                    >
                      {row.achievement.toFixed(1)}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Color Scale Legend */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2 text-[10px] text-slate-500">
        <span className="font-bold text-slate-600">Achievement Scale:</span>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-rose-100 border border-rose-300 inline-block" /> &lt;50% Critical
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300 inline-block" /> 50–69% Needs Imp.
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300 inline-block" /> 70–84% Progressing
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-emerald-200 border border-emerald-400 inline-block" /> 85–100% Target Met
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-indigo-100 border border-indigo-300 inline-block" /> &gt;100% Exceeded
          </span>
        </div>
      </div>

      {/* Floating Tooltip */}
      {hoveredInfo && (
        <div
          className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full bg-slate-900 text-white text-xs rounded-lg shadow-xl px-3 py-2 w-56 border border-slate-700"
          style={{ left: hoveredInfo.x, top: hoveredInfo.y }}
        >
          <div className="font-bold text-white truncate">{hoveredInfo.title}</div>
          {hoveredInfo.subtitle && (
            <div className="text-[10px] text-slate-300 truncate mt-0.5">{hoveredInfo.subtitle}</div>
          )}
          <div className="mt-2 pt-1.5 border-t border-slate-700 flex justify-between items-center text-[11px]">
            <span className="text-slate-400">Achievement:</span>
            <span className="font-extrabold text-emerald-400">
              {hoveredInfo.achievement.toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-300 mt-0.5">
            <span>Actual:</span>
            <span className="font-medium">{Math.round(hoveredInfo.actual).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-300 mt-0.5">
            <span>Target:</span>
            <span className="font-medium">{Math.round(hoveredInfo.target).toLocaleString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};
