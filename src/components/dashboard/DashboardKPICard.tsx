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
}

export const DashboardKPICard: React.FC<DashboardKPICardProps> = ({
  title,
  val,
  sub,
  icon: Icon,
  badge,
  onClick,
  tooltip,
  accentBorder = false,
}) => {
  return (
    <div
      title={tooltip}
      onClick={onClick}
      className={`bg-white p-4 rounded-xl border border-slate-200 shadow-xs transition-all ${
        accentBorder ? 'border-l-4 border-l-ercs-red' : ''
      } ${
        onClick
          ? 'cursor-pointer hover:border-slate-300 hover:shadow-md hover:ring-1 hover:ring-ercs-red/30 select-none'
          : ''
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider truncate mr-1">
          {title}
        </span>
        {Icon && <Icon className="w-4 h-4 text-slate-400 shrink-0" />}
      </div>

      <div className="flex items-baseline gap-2 flex-wrap">
        <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
          {val}
        </div>
        {badge && (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.color}`}
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
