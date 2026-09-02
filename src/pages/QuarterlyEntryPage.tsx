// src/pages/QuarterlyEntryPage.tsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FilterBar } from '../components/common/FilterBar';
import { achievementPct, budgetUtilizationPct, convertToBeneficiaries, sumActual, getApprovalBadge } from '../utils/calculations';
import { PlanEntry, QuarterId } from '../types';
import { AlertTriangle, ArrowRight } from 'lucide-react';

export const QuarterlyEntryPage: React.FC = () => {
  const { nationalActivities, zones, projects, quarters, getFilteredPlanEntries } = useApp();
  const [quarter, setQuarter] = useState<QuarterId>('Q1');
  const entries = getFilteredPlanEntries();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Step 3 — Quarterly Actual Entry</h2>
        <p className="text-xs text-slate-500 mt-1">Zone rows require an Approved Quarterly Plan for that quarter before Actuals can be entered, and now go through their own Draft → Pending Approval → Approved/Rejected cycle with the Branch Head. Project rows are unchanged.</p>
      </div>
      <FilterBar />
      <div className="bg-white p-1.5 rounded-lg border inline-flex gap-1">
        {quarters.map(q => (
          <button key={q.id} onClick={() => setQuarter(q.id)} className={`px-4 py-1.5 rounded text-xs font-bold ${quarter === q.id ? 'bg-ercs-red text-white' : 'text-slate-600 hover:bg-slate-50'}`}>{q.label}</button>
        ))}
      </div>
      <div className="space-y-4">
        {entries.map(pe => (
          <EntryRow key={pe.id} entry={pe} quarter={quarter}
            nationalActivityCode={nationalActivities.find(n => n.id === pe.national_activity_id)?.code || ''}
            uom={nationalActivities.find(n => n.id === pe.national_activity_id)?.uom || ''}
            scopeLabel={pe.scope_type === 'Regional' ? zones.find(z => z.id === pe.zone_id)?.name : projects.find(p => p.id === pe.project_id)?.name}
          />
        ))}
        {entries.length === 0 && <div className="bg-white p-8 rounded-xl border text-center text-xs text-slate-500">No plan entries match this filter.</div>}
      </div>
    </div>
  );
};

const clampNonNegative = (raw: string): number => { const p = Number(raw); return Number.isFinite(p) ? Math.max(0, p) : 0; };

const EntryRow: React.FC<{ entry: PlanEntry; quarter: QuarterId; nationalActivityCode: string; uom: string; scopeLabel?: string; }> = ({ entry, quarter, nationalActivityCode, uom, scopeLabel }) => {
  const { quarterlyActuals, upsertQuarterlyActual, submitQuarterlyActualForApproval, quarterlyPlans, uomConfigs, setFilters, setActiveRoute, currentRole } = useApp();
  const existing = quarterlyActuals.find(a => a.plan_entry_id === entry.id && a.quarter_id === quarter);
  const [actualVal, setActualVal] = useState<number>(existing?.actual ?? 0);
  const [expVal, setExpVal] = useState<number>(existing?.expenditure ?? 0);
  const [commentVal, setCommentVal] = useState<string>(existing?.comment ?? '');

  React.useEffect(() => {
    setActualVal(existing?.actual ?? 0); setExpVal(existing?.expenditure ?? 0); setCommentVal(existing?.comment ?? '');
  }, [entry.id, quarter, existing]);

  const planForQuarter = quarterlyPlans.find(qp => qp.plan_entry_id === entry.id && qp.quarter_id === quarter);
  const plannedTarget = planForQuarter?.target ?? 0;
  const plannedBudget = planForQuarter?.budget ?? 0;
  const isZoneEntry = entry.scope_type === 'Regional';
  const planStatus = planForQuarter?.approval_status;
  const zoneBlocked = isZoneEntry && planStatus !== 'Approved';

  const zoneBlockMessage = !isZoneEntry ? '' :
    planStatus === 'Pending Approval' ? 'Awaiting Branch Head approval.' :
    planStatus === 'Rejected' ? 'This Quarterly Plan was rejected — resubmit it.' :
    'No Quarterly Plan submitted yet for this quarter.';

  // Zone Actuals now go through their own Draft → Pending Approval →
  // Approved/Rejected cycle with the Branch Head, same as the Quarterly
  // Plan. Locked once Pending/Approved; Rejected re-opens editing so the
  // zone can revise and resubmit.
  const actualStatus = existing?.approval_status || 'Draft';
  const actualLocked = isZoneEntry && (actualStatus === 'Pending Approval' || actualStatus === 'Approved');
  const inputsDisabled = zoneBlocked || actualLocked;
  const isOwningZoneCoordinator = isZoneEntry && currentRole === `${scopeLabel} coordinators`;
  const actualBadge = getApprovalBadge(actualStatus);

  const sync = (nextActual: number, nextExp: number, nextComment = commentVal) => {
    if (inputsDisabled) return;
    upsertQuarterlyActual({ id: existing?.id || `qa-${entry.id}-${quarter}`, plan_entry_id: entry.id, quarter_id: quarter, actual: nextActual, expenditure: nextExp, comment: nextComment });
  };
  const handleActualChange = (raw: string) => { const v = clampNonNegative(raw); setActualVal(v); sync(v, expVal); };
  const handleExpChange = (raw: string) => { const v = clampNonNegative(raw); setExpVal(v); sync(actualVal, v); };

  const hasQuarterlyPlanForThisQuarter = !!planForQuarter;
  const quarterlyAchievement = achievementPct(actualVal, plannedTarget);
  const quarterlyBudgetUtil = budgetUtilizationPct(expVal, plannedBudget);
  const isOverBudget = quarterlyBudgetUtil > 100 || (plannedBudget === 0 && expVal > 0);
  const cumulativeActual = sumActual([entry], quarterlyActuals);
  const cumulativeAchievement = achievementPct(cumulativeActual, entry.annual_target);
  const beneficiariesThisQuarter = convertToBeneficiaries(actualVal, uom, uomConfigs);

  const goToQuarterlyPlan = () => {
    setFilters(prev => ({ ...prev, nationalActivityId: entry.national_activity_id, regionId: entry.scope_type === 'Regional' ? (entry.region_id ? [entry.region_id] : ['ALL']) : ['ALL'], projectId: entry.scope_type === 'Project' ? (entry.project_id ? [entry.project_id] : ['ALL']) : ['ALL'] }));
    setActiveRoute('quarterly-plan');
  };

  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
        <div>
          <span className="bg-ercs-red text-white text-[10px] font-extrabold px-2 py-0.5 rounded mr-2">{nationalActivityCode}</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${entry.scope_type === 'Regional' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>{entry.scope_type}</span>
          <span className="ml-2 text-xs font-bold text-slate-800">{scopeLabel}</span>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {isZoneEntry && !zoneBlocked && (
            <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${actualBadge.color}`}>{actualBadge.label}</span>
          )}
          <div className="text-[10px] bg-slate-100 px-2 py-1 rounded font-semibold whitespace-nowrap">Annual Target: {entry.annual_target.toLocaleString()} {uom}</div>
          <div className="text-[10px] bg-blue-50 text-blue-700 px-2 py-1 rounded font-semibold whitespace-nowrap">Planned {quarter}: {plannedTarget.toLocaleString()} {uom} · ETB {plannedBudget.toLocaleString()}</div>
        </div>
      </div>

      {isZoneEntry && zoneBlocked && (
        <div className="flex items-center justify-between gap-3 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2 text-[11px] text-rose-800 font-semibold">
          <span className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 shrink-0" /> {zoneBlockMessage}</span>
          <button onClick={goToQuarterlyPlan} className="shrink-0 bg-rose-600 text-white px-2.5 py-1 rounded text-[10px] font-bold whitespace-nowrap">Go to Quarterly Plan</button>
        </div>
      )}
      {isZoneEntry && !zoneBlocked && actualStatus === 'Pending Approval' && (
        <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-[11px] text-amber-800 font-semibold">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> Awaiting Branch Head approval for this quarter's Actual.
        </div>
      )}
      {isZoneEntry && !zoneBlocked && actualStatus === 'Rejected' && (
        <div className="bg-rose-50 border border-rose-200 rounded-lg px-3 py-2 text-[11px] text-rose-800 font-semibold space-y-0.5">
          <div className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 shrink-0" /> This Quarterly Actual was rejected — revise and resubmit.</div>
          {existing?.rejection_reason && <div className="text-rose-700 font-normal">{existing.rejection_reason}</div>}
        </div>
      )}
      {!isZoneEntry && !hasQuarterlyPlanForThisQuarter && (
        <div className="flex items-center justify-between gap-3 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-[11px] text-amber-800 font-semibold">
          <span className="flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5 shrink-0" /> No Quarterly Plan set for {quarter} yet.</span>
          <button onClick={goToQuarterlyPlan} className="shrink-0 bg-amber-600 text-white px-2.5 py-1 rounded text-[10px] font-bold whitespace-nowrap">Go to Quarterly Plan</button>
        </div>
      )}
      {isOverBudget && !zoneBlocked && (
        <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2 text-[11px] text-rose-800 font-semibold">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> Over budget for {quarter}.
        </div>
      )}

      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Actual this quarter ({uom})</label>
          <input type="number" min="0" disabled={inputsDisabled} value={actualVal} onChange={e => handleActualChange(e.target.value)} className="w-32 text-xs p-2 border rounded disabled:opacity-50 disabled:bg-slate-50" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Expenditure this quarter (ETB)</label>
          <input type="number" min="0" disabled={inputsDisabled} value={expVal} onChange={e => handleExpChange(e.target.value)} className={`w-36 text-xs p-2 border rounded disabled:opacity-50 disabled:bg-slate-50 ${isOverBudget ? 'border-rose-300 bg-rose-50' : ''}`} />
        </div>
        <div className="min-w-64 flex-1">
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Comment</label>
          <textarea rows={2} disabled={inputsDisabled} value={commentVal} onChange={e => { setCommentVal(e.target.value); sync(actualVal, expVal, e.target.value); }} className="w-full text-xs p-2 border rounded resize-y bg-white disabled:opacity-50 disabled:bg-slate-50" />
        </div>
        <div className="flex items-center gap-2 ml-auto flex-wrap">
          <div className="rounded-lg bg-blue-50 border border-blue-100 px-3 py-2 text-center"><div className="text-[9px] font-black uppercase text-blue-700">Conversion</div><div className="text-xs font-bold text-blue-900">{actualVal} {uom} × factor</div></div>
          <ArrowRight className="w-4 h-4 text-slate-300" />
          <div className="rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2 text-center min-w-24"><div className="text-[9px] font-black uppercase text-emerald-700">Beneficiaries (Q)</div><div className="text-sm font-black text-emerald-900">{beneficiariesThisQuarter.toLocaleString()}</div></div>
          <div className="rounded-lg bg-indigo-50 border border-indigo-100 px-3 py-2 text-center min-w-24"><div className="text-[9px] font-black uppercase text-indigo-700">{quarter} Achievement</div><div className="text-sm font-black text-indigo-900">{quarterlyAchievement.toFixed(1)}%</div></div>
          <div className="rounded-lg bg-slate-50 border px-3 py-2 text-center min-w-24"><div className="text-[9px] font-black uppercase text-slate-500">Cumulative Ach.</div><div className="text-sm font-black text-slate-800">{cumulativeAchievement.toFixed(1)}%</div></div>
        </div>
      </div>

      {isZoneEntry && !zoneBlocked && isOwningZoneCoordinator && (actualStatus === 'Draft' || actualStatus === 'Rejected') && (
        <div className="flex justify-end">
          <button onClick={() => submitQuarterlyActualForApproval({ plan_entry_id: entry.id, quarter_id: quarter })} className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold">Submit for Approval</button>
        </div>
      )}
    </div>
  );
};