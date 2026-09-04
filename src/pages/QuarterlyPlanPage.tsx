// src/pages/QuarterlyPlanPage.tsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { FilterBar } from '../components/common/FilterBar';
import { convertToBeneficiaries, getApprovalBadge } from '../utils/calculations';
import { PlanEntry, QuarterId } from '../types';
import { NumberInput } from '../components/common/NumberInput';
import { AlertTriangle, CheckCircle2, Wand2 } from 'lucide-react';

const clampNonNegative = (raw: string): number => { const p = Number(raw); return Number.isFinite(p) ? Math.max(0, p) : 0; };
const RECONCILE_EPSILON = 1e-6;

export const QuarterlyPlanPage: React.FC = () => {
  const { quarters, getFilteredPlanEntries } = useApp();
  const entries = getFilteredPlanEntries();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Step 2 — Quarterly Plan Breakdown</h2>
        <p className="text-xs text-slate-500 mt-1">
          Zone-scoped rows go through Draft → Pending Approval → Approved/Rejected with the Branch Head; Project-scoped rows go through approval with the Program Director.
        </p>
      </div>
      <FilterBar />
      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b">
              <tr>
                <th className="p-3">Activity Code</th><th className="p-3">Activity Description</th><th className="p-3">Executed By</th>
                <th className="p-3 text-right">Annual Target</th><th className="p-3 text-right">Annual Budget</th>
                {quarters.map(q => <th key={q.id} className="p-2 text-center bg-slate-100 border-l whitespace-nowrap">{q.id} (Tgt | Bgt | Ben)</th>)}
                <th className="p-3 text-center">Reconciliation</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {entries.map(pe => <QuarterlyPlanRow key={pe.id} entry={pe} />)}
              {entries.length === 0 && <tr><td colSpan={6 + quarters.length} className="p-6 text-center text-slate-500">No plan entries match this filter.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const QuarterlyPlanRow: React.FC<{ entry: PlanEntry }> = ({ entry }) => {
  const { nationalActivities, regions, zones, projects, quarters, quarterlyPlans, upsertQuarterlyPlan, submitQuarterlyPlanForApproval, uomConfigs, currentRole } = useApp();
  const na = nationalActivities.find(n => n.id === entry.national_activity_id);
  const scopeName = entry.scope_type === 'Regional' ? zones.find(z => z.id === entry.zone_id)?.name : projects.find(p => p.id === entry.project_id)?.name;
  const isZoneEntry = entry.scope_type === 'Regional';
  const isProjectEntry = entry.scope_type === 'Project';
  const isApprovalScoped = isZoneEntry || isProjectEntry;
  const isOwningZoneCoordinator = isZoneEntry && currentRole === `${scopeName} coordinators`;
  const isOwningProjectCoordinator = isProjectEntry && currentRole === `Project Coordinator — ${scopeName}`;
  const isOwningCoordinator = isOwningZoneCoordinator || isOwningProjectCoordinator;
  void regions;

  const rowPlans = quarters.map(q => quarterlyPlans.find(qp => qp.plan_entry_id === entry.id && qp.quarter_id === q.id));
  const sumT = rowPlans.reduce((s, qp) => s + (qp?.target || 0), 0);
  const sumB = rowPlans.reduce((s, qp) => s + (qp?.budget || 0), 0);
  const targetMismatch = Math.abs(sumT - entry.annual_target) > RECONCILE_EPSILON;
  const budgetMismatch = Math.abs(sumB - entry.annual_budget) > RECONCILE_EPSILON;

  const setQuarterTarget = (quarterId: QuarterId, value: number) => {
    const existingQp = rowPlans.find(qp => qp?.quarter_id === quarterId);
    const newBudget = value === 0 ? 0 : (existingQp?.budget || 0);
    upsertQuarterlyPlan({
      id: `qp-${entry.id}-${quarterId}`, plan_entry_id: entry.id, quarter_id: quarterId,
      target: value,
      budget: newBudget,
    });
  };

  const setQuarterBudget = (quarterId: QuarterId, rawVal: number) => {
    const othersBudget = rowPlans.reduce((s, qp, idx) => (quarters[idx].id === quarterId ? s : s + (qp?.budget || 0)), 0);
    const value = Math.min(rawVal, Math.max(0, entry.annual_budget - othersBudget));
    const currentTarget = rowPlans.find(qp => qp?.quarter_id === quarterId)?.target || 0;
    upsertQuarterlyPlan({
      id: `qp-${entry.id}-${quarterId}`, plan_entry_id: entry.id, quarter_id: quarterId,
      target: currentTarget,
      budget: value,
    });
  };

  const splitEvenly = () => {
    const evenTarget = entry.annual_target / 4;
    const evenBudget = entry.annual_budget / 4;
    quarters.forEach(q => upsertQuarterlyPlan({ id: `qp-${entry.id}-${q.id}`, plan_entry_id: entry.id, quarter_id: q.id, target: evenTarget, budget: evenBudget }));
  };

  return (
    <tr className="hover:bg-slate-50 align-top">
      <td className="p-3 font-bold text-ercs-red whitespace-nowrap">{na?.code}</td>
      <td className="p-3 min-w-72"><div className="font-bold text-slate-800">{entry.activity_name}</div><div className="text-[10px] text-slate-500 mt-0.5">{entry.activity_description}</div></td>
      <td className="p-3 whitespace-nowrap">
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${entry.scope_type === 'Regional' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>{entry.scope_type}</span>
        <span className="ml-2 font-semibold">{scopeName || '—'}</span>
      </td>
      <td className="p-3 text-right font-bold whitespace-nowrap">{entry.annual_target.toLocaleString()} {na?.uom}</td>
      <td className="p-3 text-right whitespace-nowrap">{entry.annual_budget.toLocaleString()}</td>
      {quarters.map((q, idx) => {
        const qp = rowPlans[idx];
        const qTarget = qp?.target ?? 0;
        const qBeneficiary = na ? convertToBeneficiaries(qTarget, na.uom, uomConfigs) : 0;
        const status = qp?.approval_status || 'Draft';
        const locked = isApprovalScoped && (status === 'Pending Approval' || status === 'Approved');
        const isBudgetDisabled = locked || qTarget === 0 || entry.annual_budget === 0;
        const badge = getApprovalBadge(status);
        return (
          <td key={q.id} className="p-2 border-l">
            <div className="flex flex-col gap-1 items-center">
              <div className="flex gap-1 justify-center items-start">
                <NumberInput
                  min={0}
                  value={qTarget}
                  disabled={locked}
                  onChange={v => setQuarterTarget(q.id, v)}
                  className="w-14 text-center text-[10px] font-bold border border-slate-200 rounded p-1 disabled:opacity-50"
                />
                <NumberInput
                  min={0}
                  value={qp?.budget ?? 0}
                  disabled={isBudgetDisabled}
                  onChange={v => setQuarterBudget(q.id, v)}
                  className="w-20 text-center text-[10px] font-bold border border-slate-200 rounded p-1 disabled:opacity-50"
                />
                <div className="rounded bg-emerald-50 border border-emerald-100 px-1.5 py-1 text-center min-w-16">
                  <div className="text-[8px] font-black uppercase tracking-wide text-emerald-700 whitespace-nowrap">{q.id} Ben</div>
                  <div className="text-[10px] font-black text-emerald-900">{qBeneficiary.toLocaleString()}</div>
                </div>
              </div>
              {isApprovalScoped && (
                <div className="flex flex-col items-center gap-1">
                  <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-bold border ${badge.color}`}>{badge.label}</span>
                  {status === 'Rejected' && qp?.rejection_reason && <div className="text-[8px] text-rose-600 max-w-24 text-center">{qp.rejection_reason}</div>}
                  {isOwningCoordinator && (status === 'Draft' || status === 'Rejected') && (
                    <button onClick={() => submitQuarterlyPlanForApproval({ plan_entry_id: entry.id, quarter_id: q.id })} className="text-[8px] font-bold text-blue-600">Submit for Approval</button>
                  )}
                </div>
              )}
            </div>
          </td>
        );
      })}
      <td className="p-3 text-center">
        <div className="flex flex-col gap-1 items-center">
          {targetMismatch
            ? <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 whitespace-nowrap"><AlertTriangle className="w-3 h-3" /> Tgt {sumT.toLocaleString()}/{entry.annual_target.toLocaleString()}</span>
            : <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 whitespace-nowrap"><CheckCircle2 className="w-3 h-3" /> Target OK</span>}
          {budgetMismatch
            ? <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 whitespace-nowrap"><AlertTriangle className="w-3 h-3" /> Bgt {sumB.toLocaleString()}/{entry.annual_budget.toLocaleString()}</span>
            : <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 whitespace-nowrap"><CheckCircle2 className="w-3 h-3" /> Budget OK</span>}
          <button onClick={splitEvenly} className="mt-1 text-[9px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 whitespace-nowrap"><Wand2 className="w-2.5 h-2.5" /> Split evenly</button>
        </div>
      </td>
    </tr>
  );
};