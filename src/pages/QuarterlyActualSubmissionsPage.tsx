// src/pages/QuarterlyActualSubmissionsPage.tsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FilterBar } from '../components/common/FilterBar';
import { getApprovalBadge } from '../utils/calculations';
import { QuarterId } from '../types';
import { ShieldCheck } from 'lucide-react';

export const QuarterlyActualSubmissionsPage: React.FC = () => {
  const {
    currentRole,
    regions,
    zones,
    nationalActivities,
    quarterlyActuals,
    approveQuarterlyActual,
    rejectQuarterlyActual,
    getFilteredPlanEntries,
    filters,
  } = useApp();

  const [rejecting, setRejecting] = useState<null | { plan_entry_id: string; quarter_id: QuarterId }>(null);
  const [rejectReason, setRejectReason] = useState('');

  const currentRegion = regions.find(r => `Branch Head — ${r.name}` === currentRole);
  const entries = getFilteredPlanEntries().filter(pe => pe.scope_type === 'Regional');

  // filters.quarterId can be 'ALL' | 'SEMI' | 'NINE_MONTH' | a single quarter.
  // Only a single quarter (Q1–Q4) narrows which submissions are listed here —
  // the multi-quarter "Period" options just mean "show every quarter".
  const singleQuarterFilter: QuarterId | null =
    filters.quarterId === 'Q1' || filters.quarterId === 'Q2' || filters.quarterId === 'Q3' || filters.quarterId === 'Q4'
      ? filters.quarterId
      : null;

  const rows = entries
    .flatMap(pe => {
      const na = nationalActivities.find(n => n.id === pe.national_activity_id);
      const zone = zones.find(z => z.id === pe.zone_id);
      const actualsForEntry = quarterlyActuals.filter(
        qa => qa.plan_entry_id === pe.id && (!singleQuarterFilter || qa.quarter_id === singleQuarterFilter)
      );
      return actualsForEntry.map(qa => ({ pe, na, zone, qa }));
    })
    .sort((a, b) => (a.zone?.name || '').localeCompare(b.zone?.name || '') || a.qa.quarter_id.localeCompare(b.qa.quarter_id));

  const pendingCount = rows.filter(r => r.qa.approval_status === 'Pending Approval').length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Quarterly Actual Submissions</h2>
        <p className="text-xs text-slate-500 mt-1">
          Every Quarterly Actual submitted by the Zones under {currentRegion?.name || 'your Region'}. Approve or
          reject Pending submissions below.
        </p>
      </div>

      <FilterBar />

      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-ercs-red" /> Submissions ({rows.length}) — {pendingCount} pending approval
        </div>

        {rows.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">No Quarterly Actual submissions match this filter.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b">
                <tr>
                  <th className="p-3">Zone</th>
                  <th className="p-3">Activity</th>
                  <th className="p-3">Quarter</th>
                  <th className="p-3 text-right">Actual</th>
                  <th className="p-3 text-right">Expenditure</th>
                  <th className="p-3">Comment</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map(({ pe, na, zone, qa }) => {
                  const badge = getApprovalBadge(qa.approval_status);
                  return (
                    <tr key={`${qa.plan_entry_id}-${qa.quarter_id}`} className="hover:bg-slate-50">
                      <td className="p-3 font-semibold whitespace-nowrap">{zone?.name || '—'}</td>
                      <td className="p-3 min-w-56">
                        <span className="font-bold text-ercs-red mr-1">{na?.code}</span>
                        {pe.activity_name}
                      </td>
                      <td className="p-3 font-bold">{qa.quarter_id}</td>
                      <td className="p-3 text-right whitespace-nowrap">{qa.actual.toLocaleString()} {na?.uom}</td>
                      <td className="p-3 text-right whitespace-nowrap">ETB {qa.expenditure.toLocaleString()}</td>
                      <td className="p-3 min-w-40 text-slate-600">{qa.comment || '—'}</td>
                      <td className="p-3 text-center">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.color}`}>{badge.label}</span>
                        {qa.approval_status === 'Rejected' && qa.rejection_reason && (
                          <div className="text-[9px] text-rose-600 mt-1 max-w-40">{qa.rejection_reason}</div>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        {qa.approval_status === 'Pending Approval' ? (
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => approveQuarterlyActual({ plan_entry_id: pe.id, quarter_id: qa.quarter_id })}
                              className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-bold"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => { setRejecting({ plan_entry_id: pe.id, quarter_id: qa.quarter_id }); setRejectReason(''); }}
                              className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 font-bold"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {rejecting && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-xl shadow-2xl p-5">
            <div className="text-sm font-black text-slate-800">Reject Quarterly Actual — {rejecting.quarter_id}</div>
            <textarea
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              rows={3}
              placeholder="Reason for rejection"
              className="w-full text-xs border rounded p-2 mt-3 bg-slate-50"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setRejecting(null)} className="px-4 py-2 rounded-lg border text-xs font-bold">Cancel</button>
              <button
                disabled={!rejectReason.trim()}
                onClick={() => { rejectQuarterlyActual({ ...rejecting, rejection_reason: rejectReason.trim() }); setRejecting(null); }}
                className="px-4 py-2 rounded-lg bg-rose-600 text-white text-xs font-bold disabled:opacity-40"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};