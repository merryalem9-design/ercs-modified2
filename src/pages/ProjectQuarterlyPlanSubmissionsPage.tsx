// src/pages/ProjectQuarterlyPlanSubmissionsPage.tsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FilterBar } from '../components/common/FilterBar';
import { getApprovalBadge } from '../utils/calculations';
import { PlanEntry, NationalActivity, Project, QuarterlyPlan, QuarterId } from '../types';
import { ShieldCheck, ChevronDown, ChevronRight } from 'lucide-react';

const ALL_QUARTER_IDS: QuarterId[] = ['Q1', 'Q2', 'Q3', 'Q4'];

interface ProjectPlanQuarterGroup {
  pe: PlanEntry;
  na: NationalActivity | undefined;
  project: Project | undefined;
  slots: { qId: QuarterId; qp: QuarterlyPlan | undefined }[];
}

export const ProjectQuarterlyPlanSubmissionsPage: React.FC = () => {
  const {
    projects,
    nationalActivities,
    quarterlyPlans,
    approveQuarterlyPlan,
    rejectQuarterlyPlan,
    getFilteredPlanEntries,
    filters,
  } = useApp();

  const [rejecting, setRejecting] = useState<null | { plan_entry_id: string; quarter_id: QuarterId }>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggle = (peId: string) =>
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(peId)) next.delete(peId); else next.add(peId);
      return next;
    });

  const entries = getFilteredPlanEntries().filter(pe => pe.scope_type === 'Project');

  const singleQuarterFilter: QuarterId | null =
    filters.quarterId === 'Q1' || filters.quarterId === 'Q2' || filters.quarterId === 'Q3' || filters.quarterId === 'Q4'
      ? filters.quarterId
      : null;

  const groups: ProjectPlanQuarterGroup[] = entries
    .map(pe => {
      const na = nationalActivities.find(n => n.id === pe.national_activity_id);
      const project = projects.find(p => p.id === pe.project_id);
      const quartersToShow = singleQuarterFilter ? [singleQuarterFilter] : ALL_QUARTER_IDS;
      const slots = quartersToShow.map(qId => ({
        qId,
        qp: quarterlyPlans.find(qp => qp.plan_entry_id === pe.id && qp.quarter_id === qId),
      }));
      if (!slots.some(s => s.qp !== undefined)) return null;
      return { pe, na, project, slots };
    })
    .filter((g): g is ProjectPlanQuarterGroup => g !== null)
    .sort((a, b) => (a.project?.name || '').localeCompare(b.project?.name || ''));

  const pendingCount = groups.reduce(
    (sum, g) => sum + g.slots.filter(s => s.qp?.approval_status === 'Pending Approval').length,
    0
  );
  const submittedSlotCount = groups.reduce(
    (sum, g) => sum + g.slots.filter(s => s.qp !== undefined).length,
    0
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Project Quarterly Plan Submissions</h2>
        <p className="text-xs text-slate-500 mt-1">
          Every Quarterly Plan submitted by Project Coordinators across all Projects. Approve or reject Pending
          submissions below — a Project can only enter Quarterly Actuals for a quarter once that quarter's Quarterly
          Plan has been Approved here.
        </p>
      </div>

      <FilterBar />

      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-ercs-red" />
          {groups.length} {groups.length === 1 ? 'Activity' : 'Activities'} · {submittedSlotCount} {submittedSlotCount === 1 ? 'Submission' : 'Submissions'} · {pendingCount} Pending Approval
        </div>

        {groups.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">No Project Quarterly Plan submissions match this filter.</div>
        ) : (
          <div>
            {groups.map(({ pe, na, project, slots }) => {
              const isOpen = expandedIds.has(pe.id);
              const groupPendingCount = slots.filter(s => s.qp?.approval_status === 'Pending Approval').length;

              return (
                <div key={pe.id} className="border-b last:border-0">
                  <div
                    className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2 flex-wrap cursor-pointer hover:bg-slate-100 select-none transition-colors"
                    onClick={() => toggle(pe.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(pe.id); } }}
                    aria-expanded={isOpen}
                  >
                    <span className="text-slate-400 shrink-0">
                      {isOpen
                        ? <ChevronDown className="w-3.5 h-3.5" />
                        : <ChevronRight className="w-3.5 h-3.5" />}
                    </span>

                    <span className="font-bold text-slate-700 text-xs">{project?.name || '—'}</span>
                    <span className="text-slate-300 text-xs">·</span>
                    <span className="font-bold text-ercs-red text-xs">{na?.code || pe.activity_code || '—'}</span>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="text-xs text-slate-800 font-bold truncate">{pe.activity_name}</span>
                      {pe.activity_description && (
                        <span className="text-[11px] text-slate-500 truncate hidden md:inline">({pe.activity_description})</span>
                      )}
                      {pe.is_contributing === false && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wider shrink-0">
                          Non-Contributing
                        </span>
                      )}
                    </div>

                    {groupPendingCount > 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border bg-amber-50 text-amber-800 border-amber-300 shrink-0">
                        {groupPendingCount} Pending
                      </span>
                    )}
                  </div>

                  {isOpen && (
                    <table className="w-full text-left text-xs">
                      <tbody>
                        {slots.map(({ qId, qp }) => {
                          if (!qp) {
                            return (
                              <tr key={qId} className="border-t border-slate-50 bg-white">
                                <td className="p-3 pl-8 font-bold text-slate-300 w-16">{qId}</td>
                                <td className="p-3 text-slate-300 italic" colSpan={4}>Not submitted</td>
                              </tr>
                            );
                          }
                          const badge = getApprovalBadge(qp.approval_status);
                          return (
                            <tr key={qId} className="border-t hover:bg-slate-50">
                              <td className="p-3 pl-8 font-black text-slate-700 w-16">{qId}</td>
                              <td className="p-3 text-right whitespace-nowrap min-w-28 font-semibold">
                                {qp.target.toLocaleString()} <span className="text-slate-400 font-normal">{pe.uom || na?.uom || ''}</span>
                              </td>
                              <td className="p-3 text-right whitespace-nowrap min-w-32 text-slate-600">
                                ETB {qp.budget.toLocaleString()}
                              </td>
                              <td className="p-3 text-center min-w-36">
                                <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.color}`}>
                                  {badge.label}
                                </span>
                                {qp.approval_status === 'Rejected' && qp.rejection_reason && (
                                  <div className="text-[9px] text-rose-600 mt-1 max-w-40 mx-auto">{qp.rejection_reason}</div>
                                )}
                              </td>
                              <td className="p-3 text-center min-w-44">
                                {qp.approval_status === 'Pending Approval' ? (
                                  <div className="flex items-center justify-center gap-2">
                                    <button
                                      onClick={e => { e.stopPropagation(); approveQuarterlyPlan({ plan_entry_id: pe.id, quarter_id: qp.quarter_id }); }}
                                      className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-bold hover:bg-emerald-100 text-[11px]"
                                    >
                                      Approve
                                    </button>
                                    <button
                                      onClick={e => { e.stopPropagation(); setRejecting({ plan_entry_id: pe.id, quarter_id: qp.quarter_id }); setRejectReason(''); }}
                                      className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 font-bold hover:bg-rose-100 text-[11px]"
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
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {rejecting && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-xl shadow-2xl p-5">
            <div className="text-sm font-black text-slate-800">Reject Project Quarterly Plan — {rejecting.quarter_id}</div>
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
                onClick={() => { rejectQuarterlyPlan({ ...rejecting, rejection_reason: rejectReason.trim() }); setRejecting(null); }}
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
