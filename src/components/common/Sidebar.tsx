import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ClipboardList, CalendarClock, CalendarCheck2, BarChart3, ShieldCheck, LayoutDashboard, TrendingUp, Compass, Target,
} from 'lucide-react';

const BASE_NAV = [
  { id: 'plan', label: 'Annual Plan', sub: 'National → Zone / Project', icon: ClipboardList },
  { id: 'quarterly-plan', label: 'Quarterly Plan', sub: 'Split targets into Q1–Q4', icon: CalendarClock },
  { id: 'quarterly', label: 'Quarterly Actual Entry', sub: 'Actuals vs quarterly plan', icon: CalendarCheck2 },
  { id: 'report', label: 'Report', sub: 'Aggregated results', icon: BarChart3 },
  { id: 'submissions', label: 'Submissions', sub: 'View all submitted entries', icon: BarChart3 },
];

const MONITOR_NAV = [
  { id: 'monitoring-dashboard', label: 'Monitoring Dashboard', sub: 'Coverage & findings overview', icon: LayoutDashboard },
  { id: 'monitoring', label: 'Monitoring Register', sub: 'Verify reported achievements', icon: ShieldCheck },
  { id: 'strategic-kpi', label: 'Strategic KPI Tracking', sub: 'Baseline, target & progress vs the Five-Year Plan', icon: Target },
];

// "Dashboard" (route id 'performance') is now the FIRST item, followed by
// "Strategic Plan", then the rest of the base plan/report flow, then the
// existing (unchanged) Monitoring Dashboard read-only entry.
const AOP_NAV = [
  { id: 'performance', label: 'Dashboard', sub: 'National KPIs & trends', icon: TrendingUp },
  { id: 'strategic-plan', label: 'Strategic Plan', sub: 'Priorities & Objectives overview', icon: Compass },
  ...BASE_NAV,
  { id: 'monitoring-dashboard', label: 'Monitoring Dashboard', sub: 'Coverage & findings overview (view only)', icon: LayoutDashboard },
  { id: 'strategic-kpi', label: 'Strategic KPI Tracking', sub: 'Five-Year Plan indicators (view only)', icon: Target },
];

// Branch Head no longer plans/enters quarterly figures directly — they link
// National Activities to their Region, review/approve what the Zones
// submit, and read the aggregated Report. Quarterly Actual Entry and
// Submissions have no use for this role.
const BRANCH_HEAD_NAV = [
  { id: 'plan', label: 'Annual Plan', sub: 'Link National Activities to your Region', icon: ClipboardList },
  { id: 'quarterly-plan-submissions', label: 'Quarterly Plan Submissions', sub: 'Review & approve Zone submissions', icon: CalendarCheck2 },
  { id: 'report', label: 'Report', sub: 'Zone performance & aggregation', icon: BarChart3 },
];

const RESTRICTED_FOR_AOP = new Set(['quarterly-plan', 'quarterly']);

export const Sidebar: React.FC = () => {
  const { activeRoute, setActiveRoute, currentRole } = useApp();

  const isNationalAop = currentRole === 'National Activity AOP';
  const isMonitor = currentRole === 'PMER Officer';
  const isBranchHead = currentRole.startsWith('Branch Head — ');
  const isZoneCoordinator = currentRole.endsWith(' coordinators');

  const nav = isMonitor
    ? MONITOR_NAV
    : isNationalAop
      ? AOP_NAV.filter(item => !RESTRICTED_FOR_AOP.has(item.id))
      : isBranchHead
        ? BRANCH_HEAD_NAV
        : BASE_NAV;

  const roleHint = isNationalAop
    ? 'Create National Activities, view Performance, and review submissions.'
    : isMonitor
      ? 'Verify reported achievements against evidence, log data-quality findings, and track corrective actions.'
      : isBranchHead
        ? 'Link National Activities to your Region, and review/approve Zone Quarterly Plan submissions.'
        : isZoneCoordinator
          ? 'Enter and manage the plan, quarterly plan, and actuals for your assigned zone.'
          : 'Enter and manage the plan, quarterly plan, and actuals for the assigned project.';

  return (
    <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col h-screen sticky top-0 shrink-0">
      <div className="p-4 border-b border-slate-800 flex items-center gap-3">
        <img
          src="/ercs-logo.png"
          alt="Ethiopian Red Cross Society"
          className="w-11 h-11 rounded-full object-contain bg-white shrink-0 shadow-md p-0.5"
        />
        <div>
          <div className="font-extrabold text-white text-sm tracking-wider uppercase">ERCS AoP</div>
          <div className="text-[10px] text-slate-400 font-medium">Prototype Stage</div>
        </div>
      </div>

      <div className="mx-3 my-3 p-2.5 rounded bg-slate-800/80 border border-slate-700/50 text-[10px] text-slate-400 leading-relaxed">
        <b className="text-white">{currentRole}</b><br />
        {roleHint}
      </div>

      <nav className="flex-1 px-2 py-2 space-y-1 text-xs font-medium overflow-y-auto">
        {nav.map(({ id, label, sub, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveRoute(id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all text-left ${
              activeRoute === id || (id === 'plan' && (activeRoute === 'national-detail' || activeRoute === 'scope-detail' || activeRoute === 'region-detail'))
                ? 'bg-ercs-red text-white font-bold'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <div>
              <div>{label}</div>
              <div className={`text-[10px] font-normal ${activeRoute === id ? 'text-red-100' : 'text-slate-500'}`}>{sub}</div>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
};