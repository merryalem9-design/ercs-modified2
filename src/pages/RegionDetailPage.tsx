// src/pages/RegionDetailPage.tsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { sumActual, sumExpenditure, sumPlannedTarget, sumPlannedBudget, budgetUtilizationPct, convertToBeneficiaries } from '../utils/calculations';
import { getApprovalBadge } from '../utils/calculations';
import { PeWizardFormState, PlanEntryWizardModal } from './PlanPage';
import { ArrowLeft, Layers, MapPin, Plus, ShieldCheck } from 'lucide-react';

export const RegionDetailPage: React.FC = () => {
  const {
    filters, setFilters, setActiveRoute, regions, zones, nationalActivities, regionActivityLinks,
    planEntries, quarterlyPlans, quarterlyActuals, uomConfigs, currentRole,
    approveQuarterlyPlan, rejectQuarterlyPlan,
  } = useApp();

  const [peWizard, setPeWizard] = useState<null | { initial: PeWizardFormState; startStep: 1 | 2 }>(null);
  const [rejecting, setRejecting] = useState<null | { plan_entry_id: string; quarter_id: 'Q1' | 'Q2' | 'Q3' | 'Q4' }>(null);
  const [rejectReason, setRejectReason] = useState('');

  // Requires exactly one specific region id in the filter (not ALL/NONE, not 2+).
  const region = (filters.regionId.length === 1 && !filters.regionId.includes('ALL') && !filters.regionId.includes('NONE'))
    ? regions.find(r => r.id === filters.regionId[0])
    : undefined;
  const isBranchHead = currentRole === `Branch Head — ${region?.name}`;

  const goBackToPlan = () => {
    setFilters(prev => ({ ...prev, strategicPriorityId: 'ALL', nationalActivityId: 'ALL', regionId: ['ALL'], projectId: ['ALL'] }));
    setActiveRoute('plan');
  };

  if (!region) {
    return <div className="bg-white p-8 rounded-xl border text-center text-xs text-slate-500">No Region selected.</div>;
  }

  const links = regionActivityLinks.filter(l => l.region_id === region.id);
  const zoneEntriesForLink = (linkId: string) => planEntries.filter(pe => pe.region_activity_link_id === linkId);
  const allZoneEntries = planEntries.filter(pe => pe.scope_type === 'Regional' && pe.region_id === region.id);

  const target = sumPlannedTarget(allZoneEntries, quarterlyPlans, 'ALL');
  const actual = sumActual(allZoneEntries, quarterlyActuals, 'ALL');
  const budget = sumPlannedBudget(allZoneEntries, quarterlyPlans, 'ALL');
  const spent = sumExpenditure(allZoneEntries, quarterlyActuals, 'ALL');
  const util = budgetUtilizationPct(spent, budget);

  const pendingApprovals = quarterlyPlans.filter(qp => {
    if (qp.approval_status !== 'Pending Approval') return false;
    const pe = planEntries.find(p => p.id === qp.plan_entry_id);
    return !!pe && pe.scope_type === 'Regional' && pe.region_id === region.id;
  });

  const openAddPlanWizard = () => {
    setPeWizard({
      initial: {
        strategicPriorityId: '', national_activity_id: '', scope_type: 'Regional', region_id: region.id, project_id: '',
        annual_target: '', annual_budget: '', activity_name: '', activity_description: '', lockScope: true,
      },
      startStep: 1,
    });
  };

  return (
    <div className="space-y-6">
      <button onClick={goBackToPlan} className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-ercs-red">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Plan
      </button>

      <div className="bg-white p-5 rounded-xl border shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">Region</span>
            <h2 className="text-lg font-black text-slate-800 mt-1 flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-400" /> {region.name}</h2>
            <p className="text-[11px] text-slate-500 mt-1">Aggregated live across every Zone under this Region. Quarterly Plan/Actual entry now happens at the Zone level.</p>
          </div>
          {isBranchHead && (
            <button onClick={openAddPlanWizard} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-ercs-red text-white font-bold text-xs">
              <Plus className="w-3.5 h-3.5" /> Add Plan (Link to National Activity)
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <StatCard label="Aggregated Target" value={target.toLocaleString()} sub={`${actual.toLocaleString()} achieved`} />
          <StatCard label="Aggregated Budget" value={`ETB ${budget.toLocaleString()}`} sub={`ETB ${spent.toLocaleString()} spent`} />
          <StatCard label="Budget Utilization" value={`${util.toFixed(1)}%`} />
          <StatCard label="Zones with Links" value={String(zones.filter(z => z.region_id === region.id).length)} />
        </div>
      </div>

      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-ercs-red" /> Region Activity Links ({links.length})
        </div>
        {links.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">No National Activities linked to this Region yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b">
                <tr>
                  <th className="p-3">Code</th><th className="p-3">Activity</th><th className="p-3">Description</th>
                  <th className="p-3 text-right"># Eligible Zones</th><th className="p-3 text-right">Target</th><th className="p-3 text-right">Budget</th>
                  <th className="p-3 text-right">Actual</th><th className="p-3 text-right">Spent</th><th className="p-3 text-right">% Util</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {links.map(link => {
                  const na = nationalActivities.find(n => n.id === link.national_activity_id);
                  const es = zoneEntriesForLink(link.id);
                  const t = sumPlannedTarget(es, quarterlyPlans, 'ALL');
                  const b = sumPlannedBudget(es, quarterlyPlans, 'ALL');
                  const a = sumActual(es, quarterlyActuals, 'ALL');
                  const s = sumExpenditure(es, quarterlyActuals, 'ALL');
                  return (
                    <tr key={link.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-ercs-red whitespace-nowrap">{na?.code}</td>
                      <td className="p-3 font-bold text-slate-800 min-w-40">{link.activity_name}</td>
                      <td className="p-3 min-w-56 text-slate-500">{link.activity_description}</td>
                      <td className="p-3 text-right">{link.eligible_zone_ids.length}</td>
                      <td className="p-3 text-right font-bold">{t.toLocaleString()} {na?.uom}</td>
                      <td className="p-3 text-right">ETB {b.toLocaleString()}</td>
                      <td className="p-3 text-right">{a.toLocaleString()}</td>
                      <td className="p-3 text-right">ETB {s.toLocaleString()}</td>
                      <td className="p-3 text-right font-bold">{budgetUtilizationPct(s, b).toFixed(1)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-ercs-red" /> Zone Quarterly Plan Approvals ({pendingApprovals.length})
        </div>
        {pendingApprovals.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500">Nothing pending approval.</div>
        ) : (
          <div className="divide-y">
            {pendingApprovals.map(qp => {
              const pe = planEntries.find(p => p.id === qp.plan_entry_id);
              const zone = zones.find(z => z.id === pe?.zone_id);
              const na = nationalActivities.find(n => n.id === pe?.national_activity_id);
              return (
                <div key={`${qp.plan_entry_id}-${qp.quarter_id}`} className="p-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs">
                    <span className="font-bold text-ercs-red mr-2">{na?.code}</span>
                    <span className="font-semibold">{zone?.name}</span> — {qp.quarter_id}: <b>{qp.target.toLocaleString()}</b> target / <b>ETB {qp.budget.toLocaleString()}</b> budget
                  </div>
                  <div className="flex gap-2">
                    {isBranchHead && (
                      <>
                        <button onClick={() => approveQuarterlyPlan({ plan_entry_id: qp.plan_entry_id, quarter_id: qp.quarter_id })} className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">Approve</button>
                        <button onClick={() => { setRejecting({ plan_entry_id: qp.plan_entry_id, quarter_id: qp.quarter_id }); setRejectReason(''); }} className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 font-bold text-[10px]">Reject</button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {rejecting && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-xl shadow-2xl p-5">
            <div className="text-sm font-black text-slate-800">Reject Quarterly Plan — {rejecting.quarter_id}</div>
            <textarea value={rejectReason} onChange={e => setRejectReason(e.target.value)} rows={3} placeholder="Reason for rejection" className="w-full text-xs border rounded p-2 mt-3 bg-slate-50" />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setRejecting(null)} className="px-4 py-2 rounded-lg border text-xs font-bold">Cancel</button>
              <button
                disabled={!rejectReason.trim()}
                onClick={() => { rejectQuarterlyPlan({ ...rejecting, rejection_reason: rejectReason.trim() }); setRejecting(null); }}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-bold disabled:opacity-40"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {peWizard && <PlanEntryWizardModal initial={peWizard.initial} startStep={peWizard.startStep} onClose={() => setPeWizard(null)} onSaved={() => setPeWizard(null)} />}
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: React.ReactNode; sub?: React.ReactNode }> = ({ label, value, sub }) => (
  <div className="bg-slate-50 border rounded-lg p-3">
    <div className="text-[10px] font-bold text-slate-500 uppercase">{label}</div>
    <div className="text-lg font-black text-slate-800 mt-1">{value}</div>
    {sub && <div className="text-[10px] text-slate-500 mt-1">{sub}</div>}
  </div>
);
void getApprovalBadge;