import React from 'react';
import { LucideIcon } from 'lucide-react';

interface DashboardKPICardProps {
  title: string;
  val: React.ReactNode;
  sub?: React.ReactNode;
  icon?: LucideIcon;
  badge?: { label: string; color: string };
  onClick?: () => void;
  tooltip?: string;
  accentBorder?: boolean;
  status?: 'green' | 'amber' | 'red' | 'on-track' | 'at-risk' | 'off-track';
}

const normalizeRagBadgeColor = (colorStr?: string): string => {
  if (!colorStr) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
  const c = colorStr.toLowerCase();
  if (c.includes('rose') || c.includes('red')) {
    return 'bg-rose-100 text-rose-800 border-rose-300';
  }
  if (c.includes('amber') || c.includes('yellow') || c.includes('orange')) {
    return 'bg-amber-100 text-amber-800 border-amber-300';
  }
  return 'bg-emerald-100 text-emerald-800 border-emerald-300';
};

export const DashboardKPICard: React.FC<DashboardKPICardProps> = ({
  title,
  val,
  sub,
  icon: Icon,
  badge,
  onClick,
  tooltip,
  accentBorder = false,
  status,
}) => {
  const resolvedStatus = (() => {
    if (status) {
      if (status === 'green' || status === 'on-track') return 'green';
      if (status === 'amber' || status === 'at-risk') return 'amber';
      if (status === 'red' || status === 'off-track') return 'red';
    }
    if (badge) {
      const c = badge.color.toLowerCase();
      if (c.includes('rose') || c.includes('red')) return 'red';
      if (c.includes('amber') || c.includes('yellow') || c.includes('orange')) return 'amber';
      return 'green';
    }
    return null;
  })();

  const borderClass = accentBorder
    ? resolvedStatus === 'red'
      ? 'border-l-4 border-l-rose-500'
      : resolvedStatus === 'amber'
      ? 'border-l-4 border-l-amber-500'
      : 'border-l-4 border-l-emerald-500'
    : '';

  const iconClass =
    resolvedStatus === 'red'
      ? 'text-rose-500'
      : resolvedStatus === 'amber'
      ? 'text-amber-500'
      : resolvedStatus === 'green'
      ? 'text-emerald-600'
      : 'text-slate-400';

  return (
    <div
      title={tooltip}
      onClick={onClick}
      className={`bg-white p-4 rounded-xl border border-slate-200 shadow-xs transition-all ${borderClass} ${
        onClick
          ? 'cursor-pointer hover:border-slate-300 hover:shadow-md hover:ring-1 hover:ring-emerald-500/30 select-none'
          : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate mr-1">
          {title}
        </span>
        {Icon && <Icon className={`w-4 h-4 shrink-0 ${iconClass}`} />}
      </div>

      <div className="flex items-baseline gap-2 flex-wrap">
        <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
          {val}
        </div>
        {badge && (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${normalizeRagBadgeColor(badge.color)}`}
          >
            {badge.label}
          </span>
        )}
      </div>

      {sub && <div className="text-[11px] mt-1.5 text-slate-500 line-clamp-2">{sub}</div>}
      {onClick && (
        <div className="text-[10px] mt-2 text-ercs-red font-semibold hover:underline">
          View details →
        </div>
      )}
    </div>
  );
};
