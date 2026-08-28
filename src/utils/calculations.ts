// src/utils/calculations.ts
import { PlanEntry, QuarterlyActual, QuarterlyPlan, UomFactorConfig } from '../types';

export const sumTarget = (entries: PlanEntry[]): number =>
  entries.reduce((sum, e) => sum + e.annual_target, 0);

export const sumBudget = (entries: PlanEntry[]): number =>
  entries.reduce((sum, e) => sum + e.annual_budget, 0);

const MULTI_QUARTERS: Record<string, string[]> = {
  SEMI: ['Q1', 'Q2'],
  NINE_MONTH: ['Q1', 'Q2', 'Q3'],
};

export const sumActual = (
  entries: PlanEntry[],
  actuals: QuarterlyActual[],
  quarterId?: string
): number => {
  const ids = new Set(entries.map(e => e.id));
  const multi = quarterId ? MULTI_QUARTERS[quarterId] : undefined;
  return actuals
    .filter(a => ids.has(a.plan_entry_id))
    .filter(a => {
      if (!quarterId || quarterId === 'ALL') return true;
      if (multi) return multi.includes(a.quarter_id);
      return a.quarter_id === quarterId;
    })
    .reduce((sum, a) => sum + a.actual, 0);
};

export const sumExpenditure = (
  entries: PlanEntry[],
  actuals: QuarterlyActual[],
  quarterId?: string
): number => {
  const ids = new Set(entries.map(e => e.id));
  const multi = quarterId ? MULTI_QUARTERS[quarterId] : undefined;
  return actuals
    .filter(a => ids.has(a.plan_entry_id))
    .filter(a => {
      if (!quarterId || quarterId === 'ALL') return true;
      if (multi) return multi.includes(a.quarter_id);
      return a.quarter_id === quarterId;
    })
    .reduce((sum, a) => sum + a.expenditure, 0);
};

export const sumPlannedTarget = (
  entries: PlanEntry[],
  quarterlyPlans: QuarterlyPlan[],
  quarterId?: string
): number => {
  if (!quarterId || quarterId === 'ALL') return sumTarget(entries);
  const ids = new Set(entries.map(e => e.id));
  const multi = MULTI_QUARTERS[quarterId];
  return quarterlyPlans
    .filter(qp => ids.has(qp.plan_entry_id) && (multi ? multi.includes(qp.quarter_id) : qp.quarter_id === quarterId))
    .reduce((sum, qp) => sum + qp.target, 0);
};

export const sumPlannedBudget = (
  entries: PlanEntry[],
  quarterlyPlans: QuarterlyPlan[],
  quarterId?: string
): number => {
  if (!quarterId || quarterId === 'ALL') return sumBudget(entries);
  const ids = new Set(entries.map(e => e.id));
  const multi = MULTI_QUARTERS[quarterId];
  return quarterlyPlans
    .filter(qp => ids.has(qp.plan_entry_id) && (multi ? multi.includes(qp.quarter_id) : qp.quarter_id === quarterId))
    .reduce((sum, qp) => sum + qp.budget, 0);
};

export const achievementPct = (actual: number, target: number): number =>
  target === 0 ? 0 : (actual / target) * 100;

export const budgetUtilizationPct = (spent: number, budget: number): number =>
  budget === 0 ? 0 : (spent / budget) * 100;

export const convertToBeneficiaries = (
  value: number,
  uom: string,
  uomConfigs: UomFactorConfig[]
): number => {
  const config = uomConfigs.find(c => c.uom.toLowerCase() === uom.toLowerCase());
  return value * (config ? config.factor : 0);
};

export const getStatusBadge = (achievement: number, hasActuals: boolean) => {
  if (!hasActuals) return { label: 'Planning', color: 'bg-slate-100 text-slate-700 border-slate-300' };
  if (achievement > 100) return { label: 'Overachieved', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
  if (achievement >= 100) return { label: 'Completed', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  if (achievement >= 85) return { label: 'On Track', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  if (achievement >= 60) return { label: 'At Risk', color: 'bg-amber-100 text-amber-800 border-amber-300' };
  return { label: 'Behind', color: 'bg-rose-100 text-rose-800 border-rose-300' };
};

export const getBudgetStatusBadge = (utilizationPct: number, hasSpend: boolean) => {
  if (!hasSpend) return { label: 'Planning', color: 'bg-slate-100 text-slate-700 border-slate-300' };
  if (utilizationPct > 100) return { label: 'Over Budget', color: 'bg-rose-100 text-rose-800 border-rose-300' };
  if (utilizationPct >= 90) return { label: 'Near Limit', color: 'bg-amber-100 text-amber-800 border-amber-300' };
  return { label: 'On Budget', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
};

export const getApprovalBadge = (status: ApprovalStatusLike) => {
  switch (status) {
    case 'Approved': return { label: 'Approved', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    case 'Pending Approval': return { label: 'Pending Approval', color: 'bg-amber-100 text-amber-800 border-amber-300' };
    case 'Rejected': return { label: 'Rejected', color: 'bg-rose-100 text-rose-800 border-rose-300' };
    default: return { label: 'Draft', color: 'bg-slate-100 text-slate-700 border-slate-300' };
  }
};
type ApprovalStatusLike = 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected';