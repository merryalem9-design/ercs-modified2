import { StatusThresholdBand } from '../../types';

export type DashboardTabId =
  | 'executive'
  | 'community'
  | 'direct'
  | 'enabling'
  | 'departments';

export interface DashboardTab {
  id: DashboardTabId;
  label: string;
  description: string;
}

export const DASHBOARD_TABS: DashboardTab[] = [
  { id: 'executive', label: 'Executive', description: 'National KPIs, organization-wide overview across all 8 strategic priorities' },
  { id: 'community', label: 'Community Impact', description: 'High-level snapshot of direct community-facing priorities (SP1–SP3)' },
  { id: 'direct', label: 'Direct Community (P1–P3)', description: 'Objective-level drill-down for Disaster Response, Resilience, and Health & WASH' },
  { id: 'enabling', label: 'Enabling Priorities (P4–P8)', description: 'Performance and drill-downs for institutional and support priorities' },
  { id: 'departments', label: 'Department', description: 'Branch rankings, non-programmatic departments, and corporate financial overview' },
];

// Rich, varied categorical palette for 8 priorities (vibrant & distinguishable)
export const PRIORITY_COLORS: Record<string, string> = {
  'sp-1': '#C8102E', // Brand Red (Disaster Preparedness & Response)
  'sp-2': '#0284C7', // Vivid Blue (Disaster Risk Reduction)
  'sp-3': '#059669', // Emerald Green (Health & WASH)
  'sp-4': '#D97706', // Amber (Youth & Volunteers)
  'sp-5': '#7C3AED', // Purple (Humanitarian Diplomacy)
  'sp-6': '#DB2777', // Pink (Partnership Development)
  'sp-7': '#0D9488', // Teal (Institutional Transformation)
  'sp-8': '#475569', // Slate (Resource Mobilization & Operations)
};

export const PRIORITY_PALETTE = [
  '#C8102E', '#0284C7', '#059669', '#D97706',
  '#7C3AED', '#DB2777', '#0D9488', '#475569'
];

export const TARGET_COLOR = '#64748B'; // Slate-500
export const ACTUAL_COLOR = '#0284C7'; // Sky-600
export const ACTUAL_BENEFICIARY_COLOR = '#2563EB'; // Blue-600
export const SPENT_COLOR = '#DC2626'; // Red-600

export type ThreeWayStatus = 'off-track' | 'at-risk' | 'on-track';

/**
 * 3-way collapsing rule:
 * - Off-track = below "Needs improvement" lower_bound (e.g. < 60%)
 * - At-risk = "Needs improvement" band (e.g. 60% <= x < 80%)
 * - On-track = "On track" band and above (e.g. >= 80%, merges On track and Exceeding)
 */
export const get3WayStatus = (achievement: number, thresholds: StatusThresholdBand[]): ThreeWayStatus => {
  const needsImp = thresholds.find(b =>
    b.label.toLowerCase().includes('improvement') || b.label.toLowerCase().includes('risk')
  )?.lower_bound ?? 60;

  const onTrack = thresholds.find(b =>
    b.label.toLowerCase() === 'on track' ||
    (b.label.toLowerCase().includes('track') && !b.label.toLowerCase().includes('off')) ||
    b.id === 'st-on-track'
  )?.lower_bound ?? 80;

  if (achievement < needsImp) return 'off-track';
  if (achievement < onTrack) return 'at-risk';
  return 'on-track';
};

export const get3WayBadge = (status: ThreeWayStatus) => {
  switch (status) {
    case 'on-track':
      return { label: 'On Track', color: 'bg-emerald-100 text-emerald-800 border-emerald-300', dot: 'bg-emerald-500' };
    case 'at-risk':
      return { label: 'At Risk', color: 'bg-amber-100 text-amber-800 border-amber-300', dot: 'bg-amber-500' };
    case 'off-track':
      return { label: 'Off Track', color: 'bg-rose-100 text-rose-800 border-rose-300', dot: 'bg-rose-500' };
  }
};

export const formatETB = (amount: number): string => {
  if (isNaN(amount)) return 'ETB 0';
  if (Math.abs(amount) >= 1_000_000_000) {
    return `ETB ${(amount / 1_000_000_000).toFixed(2)}B`;
  }
  if (Math.abs(amount) >= 1_000_000) {
    return `ETB ${(amount / 1_000_000).toFixed(2)}M`;
  }
  return `ETB ${Math.round(amount).toLocaleString()}`;
};

export const formatCompactNumber = (val: number): string => {
  if (isNaN(val)) return '0';
  if (Math.abs(val) >= 1_000_000) {
    return `${(val / 1_000_000).toFixed(1)}M`;
  }
  if (Math.abs(val) >= 1_000) {
    return `${(val / 1_000).toFixed(1)}k`;
  }
  return Math.round(val).toLocaleString();
};

export const getHeatmapColor = (pct: number): { bg: string; text: string; border: string } => {
  if (pct === 0) return { bg: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-200' };
  if (pct < 50) return { bg: 'bg-rose-100', text: 'text-rose-900', border: 'border-rose-300' };
  if (pct < 70) return { bg: 'bg-amber-100', text: 'text-amber-900', border: 'border-amber-300' };
  if (pct < 95) return { bg: 'bg-emerald-100', text: 'text-emerald-900', border: 'border-emerald-300' };
  if (pct <= 115) return { bg: 'bg-emerald-200', text: 'text-emerald-950', border: 'border-emerald-400' };
  return { bg: 'bg-indigo-100', text: 'text-indigo-900', border: 'border-indigo-300' };
};
