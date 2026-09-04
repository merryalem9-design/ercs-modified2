// src/pages/NotificationsPage.tsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { getApprovalBadge } from '../utils/calculations';
import { Bell, CalendarClock, CalendarCheck2 } from 'lucide-react';

interface NotificationRow {
  id: string;
  type: 'Quarterly Plan' | 'Quarterly Actual';
  quarter: string;
  activityCode: string;
  activityName: string;
  status: Parameters<typeof getApprovalBadge>[0];
  rejectionReason?: string;
  submittedAt?: string;
  reviewedAt?: string;
  sortDate: string;
}

export const NotificationsPage: React.FC = () => {
  const {
    getFilteredPlanEntries,
    quarterlyPlans,
    quarterlyActuals,
    nationalActivities,
  } = useApp();

  const ownedEntries = getFilteredPlanEntries();
  const ownedEntryIds = new Set(ownedEntries.map(e => e.id));

  const rows: NotificationRow[] = [];

  // Quarterly Plans belonging to owned entries with submitted_at set
  quarterlyPlans.forEach(qp => {
    if (!ownedEntryIds.has(qp.plan_entry_id) || !qp.submitted_at) return;
    const pe = ownedEntries.find(e => e.id === qp.plan_entry_id);
    const na = nationalActivities.find(n => n.id === pe?.national_activity_id);
    rows.push({
      id: `plan-${qp.plan_entry_id}-${qp.quarter_id}`,
      type: 'Quarterly Plan',
      quarter: qp.quarter_id,
      activityCode: na?.code || pe?.activity_code || '',
      activityName: pe?.activity_name || '',
      status: qp.approval_status,
      rejectionReason: qp.rejection_reason,
      submittedAt: qp.submitted_at,
      reviewedAt: qp.reviewed_at,
      sortDate: qp.reviewed_at || qp.submitted_at,
    });
  });

  // Quarterly Actuals belonging to owned entries with submitted_at set
  quarterlyActuals.forEach(qa => {
    if (!ownedEntryIds.has(qa.plan_entry_id) || !qa.submitted_at) return;
    const pe = ownedEntries.find(e => e.id === qa.plan_entry_id);
    const na = nationalActivities.find(n => n.id === pe?.national_activity_id);
    rows.push({
      id: `actual-${qa.plan_entry_id}-${qa.quarter_id}`,
      type: 'Quarterly Actual',
      quarter: qa.quarter_id,
      activityCode: na?.code || pe?.activity_code || '',
      activityName: pe?.activity_name || '',
      status: qa.approval_status,
      rejectionReason: qa.rejection_reason,
      submittedAt: qa.submitted_at,
      reviewedAt: qa.reviewed_at,
      sortDate: qa.reviewed_at || qa.submitted_at,
    });
  });

  // Sort by reviewed_at || submitted_at descending
  rows.sort((a, b) => b.sortDate.localeCompare(a.sortDate));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <Bell className="w-5 h-5 text-ercs-red" /> Notifications
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Submission history and approval results for your assigned activities. Read-only.
        </p>
      </div>

      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Bell className="w-4 h-4 text-ercs-red" /> {rows.length} {rows.length === 1 ? 'Submission Event' : 'Submission Events'}
        </div>

        {rows.length === 0 ? (
          <div className="p-10 text-center">
            <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <div className="text-xs text-slate-500 font-semibold">No submissions recorded yet.</div>
            <div className="text-[10px] text-slate-400 mt-1">
              When you submit Quarterly Plans or Quarterly Actuals for approval, your submission results will appear here.
            </div>
          </div>
        ) : (
          <div className="divide-y">
            {rows.map(row => {
              const badge = getApprovalBadge(row.status);
              return (
                <div key={row.id} className="p-4 hover:bg-slate-50 transition-colors space-y-1.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      {row.type === 'Quarterly Plan' ? (
                        <CalendarClock className="w-4 h-4 text-blue-600 shrink-0" />
                      ) : (
                        <CalendarCheck2 className="w-4 h-4 text-purple-600 shrink-0" />
                      )}
                      <span className="font-bold text-ercs-red text-xs">{row.activityCode}</span>
                      <span className="text-xs font-bold text-slate-800">{row.activityName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {row.type} · {row.quarter}
                      </span>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>
                  </div>

                  {row.status === 'Rejected' && row.rejectionReason && (
                    <div className="text-xs bg-rose-50 border border-rose-200 rounded p-2 text-rose-800">
                      <strong className="font-bold">Rejection Reason:</strong> {row.rejectionReason}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-[10px] text-slate-400 pl-6 flex-wrap">
                    {row.submittedAt && (
                      <span>Submitted: {new Date(row.submittedAt).toLocaleString()}</span>
                    )}
                    {row.reviewedAt && (
                      <span>Reviewed: {new Date(row.reviewedAt).toLocaleString()}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
