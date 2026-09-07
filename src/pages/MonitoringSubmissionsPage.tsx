// src/pages/MonitoringSubmissionsPage.tsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { sumActual, sumExpenditure } from '../utils/calculations';
import {
  ShieldCheck, CheckCircle2, AlertOctagon, FileText, Clock, ExternalLink,
  Eye, X, Search, Check, AlertTriangle
} from 'lucide-react';
import { MonitoringRecord, PlanEntry } from '../types';

export const MonitoringSubmissionsPage: React.FC = () => {
  const {
    currentRole,
    monitoringRecords,
    planEntries,
    nationalActivities,
    regions,
    projects,
    quarterlyActuals,
    approveMonitoringRecord,
    rejectMonitoringRecord,
    nonProgrammaticActivities,
  } = useApp();

  const isPmerHead = currentRole === 'PMER Head';

  const [activeTab, setActiveTab] = useState<'Pending' | 'Approved' | 'Rejected' | 'All'>('Pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<{ entry: PlanEntry; record: MonitoringRecord } | null>(null);
  const [rejectingRecord, setRejectingRecord] = useState<{ entry: PlanEntry; record: MonitoringRecord } | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Collect records joined with planEntry
  const submissions = monitoringRecords
    .map(r => {
      const pe = planEntries.find(p => p.id === r.plan_entry_id);
      if (!pe) return null;
      const na = nationalActivities.find(n => n.id === pe.national_activity_id);
      const npa = pe.non_programmatic_activity_id ? nonProgrammaticActivities.find(a => a.id === pe.non_programmatic_activity_id) : undefined;
      const scopeLabel = pe.scope_type === 'Regional'
        ? regions.find(reg => reg.id === pe.region_id)?.name
        : pe.scope_type === 'NonProgrammatic'
          ? `Department: ${npa?.department || 'HQ Department'}`
          : projects.find(proj => proj.id === pe.project_id)?.name;
      return { r, pe, na, scopeLabel };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const pendingCount = submissions.filter(s => s.r.approval_status === 'Pending Approval').length;
  const approvedCount = submissions.filter(s => s.r.approval_status === 'Approved').length;
  const rejectedCount = submissions.filter(s => s.r.approval_status === 'Rejected').length;

  const filteredSubmissions = submissions.filter(s => {
    // Tab filter
    if (activeTab === 'Pending' && s.r.approval_status !== 'Pending Approval') return false;
    if (activeTab === 'Approved' && s.r.approval_status !== 'Approved') return false;
    if (activeTab === 'Rejected' && s.r.approval_status !== 'Rejected') return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const codeMatch = (s.na?.code || s.pe.activity_code || '').toLowerCase().includes(q);
      const nameMatch = s.pe.activity_name.toLowerCase().includes(q);
      const scopeMatch = (s.scopeLabel || '').toLowerCase().includes(q);
      const findingMatch = (s.r.finding || '').toLowerCase().includes(q);
      return codeMatch || nameMatch || scopeMatch || findingMatch;
    }
    return true;
  });

  const handleConfirmReject = () => {
    if (!rejectingRecord) return;
    if (!rejectionReason.trim()) return;
    rejectMonitoringRecord(rejectingRecord.entry.id, rejectionReason.trim());
    setRejectingRecord(null);
    setRejectionReason('');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-ercs-red" /> Monitoring Submissions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Review queue for PMER Head to audit monitoring records, verify achievement and expenditure figures against attached primary evidence, and make approval decisions.
            {!isPmerHead && ' (Viewing in read-only mode — switch to PMER Head role to approve or reject submissions)'}
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setActiveTab('Pending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'Pending' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            Pending Review
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-amber-100 text-amber-800 ml-1">
              {pendingCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('Approved')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'Approved' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Approved
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 ml-1">
              {approvedCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('Rejected')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'Rejected' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <AlertOctagon className="w-3.5 h-3.5 text-rose-500" />
            Rejected
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-rose-100 text-rose-800 ml-1">
              {rejectedCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'All' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All Submissions ({submissions.length})
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-white p-3 rounded-xl border shadow-sm">
        <Search className="w-4 h-4 text-slate-400 ml-1" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search by activity code, name, contributing project/region, or finding notes…"
          className="w-full text-xs outline-none bg-transparent"
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Submissions Table */}
      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
          <span>{activeTab} Monitoring Submissions ({filteredSubmissions.length})</span>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div className="p-12 text-center">
            <ShieldCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <div className="text-xs font-bold text-slate-600">No {activeTab.toLowerCase()} monitoring submissions found.</div>
            <p className="text-[11px] text-slate-400 mt-1">
              {activeTab === 'Pending'
                ? 'All submitted monitoring records have been reviewed.'
                : 'No records match the current status filter or search criteria.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b text-[10px]">
                <tr>
                  <th className="p-3">Activity</th>
                  <th className="p-3">Scope</th>
                  <th className="p-3">Period</th>
                  <th className="p-3">Target Verification</th>
                  <th className="p-3">Budget Verification</th>
                  <th className="p-3">Evidence Document</th>
                  <th className="p-3">Quality &amp; Severity</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-[11px]">
                {filteredSubmissions.map(({ r, pe, na, scopeLabel }) => {
                  const repAch = r.quarter_id === ''
                    ? null
                    : r.quarter_id === 'Annual'
                      ? sumActual([pe], quarterlyActuals)
                      : sumActual([pe], quarterlyActuals, r.quarter_id);
                  const verAchPct = repAch !== null && repAch > 0 && typeof r.verified_achieved === 'number'
                    ? (r.verified_achieved / repAch) * 100
                    : null;

                  const repExp = r.quarter_id === ''
                    ? 0
                    : r.quarter_id === 'Annual'
                      ? sumExpenditure([pe], quarterlyActuals)
                      : sumExpenditure([pe], quarterlyActuals, r.quarter_id);
                  const verExpPct = repExp > 0 && typeof r.verified_expenditure === 'number'
                    ? (r.verified_expenditure / repExp) * 100
                    : null;

                  const isPending = r.approval_status === 'Pending Approval';

                  return (
                    <tr key={r.id || pe.id} className="hover:bg-slate-50 align-top">
                      {/* Activity */}
                      <td className="p-3 min-w-[12rem]">
                        <div className="font-bold text-ercs-red">{na?.code || pe.activity_code || '—'}</div>
                        <div className="font-semibold text-slate-800 text-[11px] mt-0.5">{pe.activity_name}</div>
                        {r.submitted_at && (
                          <div className="text-[9px] text-slate-400 mt-1">
                            Submitted: {new Date(r.submitted_at).toLocaleDateString()}
                          </div>
                        )}
                      </td>

                      {/* Scope */}
                      <td className="p-3 whitespace-nowrap">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold ${
                          pe.scope_type === 'Regional' ? 'bg-blue-100 text-blue-700' :
                          pe.scope_type === 'NonProgrammatic' ? 'bg-amber-100 text-amber-800' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {pe.scope_type === 'NonProgrammatic' ? 'Department' : pe.scope_type}
                        </span>
                        <div className="font-semibold text-slate-700 text-[11px] mt-1">{scopeLabel || '—'}</div>
                      </td>

                      {/* Period */}
                      <td className="p-3 font-black text-slate-800 whitespace-nowrap">
                        {r.quarter_id || '—'}
                      </td>

                      {/* Target Verification */}
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-[10px] text-slate-500">
                          Verified: <span className="font-bold text-slate-800">{r.verified_achieved !== undefined ? r.verified_achieved.toLocaleString() : '—'}</span> / {repAch !== null ? repAch.toLocaleString() : '—'}
                        </div>
                        <div className="text-xs font-black text-indigo-900 mt-0.5">
                          {verAchPct === null ? '—' : `${verAchPct.toFixed(1)}%`}
                        </div>
                      </td>

                      {/* Budget Verification */}
                      <td className="p-3 whitespace-nowrap">
                        <div className="text-[10px] text-slate-500">
                          Verified: <span className="font-bold text-slate-800">{r.verified_expenditure !== undefined ? `ETB ${r.verified_expenditure.toLocaleString()}` : '—'}</span>
                        </div>
                        <div className="text-[10px] text-slate-500">
                          Reported: ETB {repExp.toLocaleString()}
                        </div>
                        <div className={`text-xs font-black mt-0.5 ${
                          verExpPct === null
                            ? 'text-slate-400'
                            : verExpPct >= 90 && verExpPct <= 110
                              ? 'text-emerald-700'
                              : 'text-amber-700'
                        }`}>
                          {repExp === 0 ? 'N/A (0 Exp)' : verExpPct === null ? '—' : `${verExpPct.toFixed(1)}%`}
                        </div>
                      </td>

                      {/* Evidence Document */}
                      <td className="p-3 min-w-[9rem]">
                        {r.evidence_attachment_name ? (
                          <div className="flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                            {r.evidence_attachment_url ? (
                              <a
                                href={r.evidence_attachment_url}
                                download={r.evidence_attachment_name}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-700 hover:text-blue-900 font-bold underline truncate max-w-[8rem] text-xs"
                                title={`Download attached ${r.evidence_attachment_name}`}
                              >
                                {r.evidence_attachment_name}
                              </a>
                            ) : (
                              <span className="font-semibold text-slate-700 truncate max-w-[8rem] text-xs" title={r.evidence_attachment_name}>
                                {r.evidence_attachment_name}
                              </span>
                            )}
                          </div>
                        ) : r.evidence_checked ? (
                          <span className="text-[11px] text-slate-600 italic block" title={r.evidence_checked}>
                            {r.evidence_checked}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">No document</span>
                        )}
                      </td>

                      {/* Quality & Severity */}
                      <td className="p-3 min-w-[8rem]">
                        {r.quality_rating && (
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold mr-1 ${
                            r.quality_rating === 'Good' ? 'bg-emerald-100 text-emerald-800' :
                            r.quality_rating === 'Satisfactory' ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {r.quality_rating}
                          </span>
                        )}
                        {r.severity && (
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold ${
                            r.severity === 'Critical' ? 'bg-rose-100 text-rose-800' :
                            r.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {r.severity}
                          </span>
                        )}
                        {r.finding && (
                          <div className="text-[10px] text-slate-600 truncate max-w-[9rem] mt-1" title={r.finding}>
                            {r.finding}
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="p-3 whitespace-nowrap">
                        {r.approval_status === 'Approved' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black border bg-emerald-100 text-emerald-800 border-emerald-300">
                            <CheckCircle2 className="w-3 h-3" /> Approved
                          </span>
                        )}
                        {r.approval_status === 'Pending Approval' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black border bg-amber-100 text-amber-800 border-amber-300">
                            <Clock className="w-3 h-3" /> Pending Review
                          </span>
                        )}
                        {r.approval_status === 'Rejected' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black border bg-rose-100 text-rose-800 border-rose-300" title={r.rejection_reason}>
                            <AlertOctagon className="w-3 h-3" /> Rejected
                          </span>
                        )}
                        {r.approval_status === 'Draft' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border bg-slate-100 text-slate-700 border-slate-300">
                            Draft
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-3 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedRecord({ entry: pe, record: r })}
                            className="p-1.5 text-slate-600 hover:text-ercs-red hover:bg-slate-100 rounded border border-slate-200"
                            title="Inspect full verification details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {isPmerHead && isPending && (
                            <>
                              <button
                                type="button"
                                onClick={() => approveMonitoringRecord(pe.id)}
                                className="px-2.5 py-1 text-white bg-emerald-600 hover:bg-emerald-700 rounded text-[10px] font-bold flex items-center gap-1 shadow-sm"
                                title="Approve monitoring record"
                              >
                                <Check className="w-3 h-3" /> Approve
                              </button>
                              <button
                                type="button"
                                onClick={() => setRejectingRecord({ entry: pe, record: r })}
                                className="px-2.5 py-1 text-white bg-rose-600 hover:bg-rose-700 rounded text-[10px] font-bold flex items-center gap-1 shadow-sm"
                                title="Reject monitoring record with notes"
                              >
                                <X className="w-3 h-3" /> Reject
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Reject Reason Modal Dialog */}
      {rejectingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-rose-600" /> Reject Monitoring Submission
              </h3>
              <button onClick={() => setRejectingRecord(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Please enter the specific reason for rejecting the monitoring verification for{' '}
              <span className="font-bold text-slate-800">{rejectingRecord.entry.activity_name}</span>.
              The PMER Officer will receive this feedback to revise and resubmit.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Rejection Reason / Revision Instructions <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={rejectionReason}
                onChange={e => setRejectionReason(e.target.value)}
                placeholder="e.g. Please attach beneficiary sign-off sheet for verified expenditure and clarify 15% discrepancy in target…"
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setRejectingRecord(null);
                  setRejectionReason('');
                }}
                className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-100 rounded-lg text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!rejectionReason.trim()}
                onClick={handleConfirmReject}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
              >
                <AlertOctagon className="w-3.5 h-3.5" /> Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Details Inspector Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-xs font-black text-ercs-red font-mono">{selectedRecord.entry.activity_code}</span>
                <h3 className="text-base font-bold text-slate-800">{selectedRecord.entry.activity_name}</h3>
              </div>
              <button onClick={() => setSelectedRecord(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Scope</span>
                <span className="font-bold text-slate-800">{selectedRecord.entry.scope_type}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Period</span>
                <span className="font-bold text-slate-800">{selectedRecord.record.quarter_id || '—'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Verified Achieved</span>
                <span className="font-black text-slate-800">{selectedRecord.record.verified_achieved?.toLocaleString() ?? '—'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Verified Expenditure</span>
                <span className="font-black text-slate-800">
                  {selectedRecord.record.verified_expenditure !== undefined ? `ETB ${selectedRecord.record.verified_expenditure.toLocaleString()}` : '—'}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Methodology</span>
                <span className="font-semibold text-slate-800">{selectedRecord.record.monitoring_method || '—'}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Verified By</span>
                <span className="font-semibold text-slate-800">{selectedRecord.record.verified_by || '—'}</span>
              </div>
            </div>

            {/* Evidence Link */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-1">
              <span className="text-[10px] font-bold text-blue-900 uppercase block">Attached Evidence Document</span>
              {selectedRecord.record.evidence_attachment_name ? (
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                  {selectedRecord.record.evidence_attachment_url ? (
                    <a
                      href={selectedRecord.record.evidence_attachment_url}
                      download={selectedRecord.record.evidence_attachment_name}
                      target="_blank"
                      rel="noreferrer"
                      className="font-bold text-blue-700 hover:text-blue-900 underline text-xs"
                    >
                      {selectedRecord.record.evidence_attachment_name}
                    </a>
                  ) : (
                    <span className="font-bold text-slate-800 text-xs">
                      {selectedRecord.record.evidence_attachment_name}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-slate-500 italic">No document attached.</span>
              )}
              {selectedRecord.record.evidence_checked && (
                <div className="text-[11px] text-slate-600 mt-1">
                  Evidence description: {selectedRecord.record.evidence_checked}
                </div>
              )}
            </div>

            {/* Finding & Recommendation */}
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Finding</span>
                <p className="text-slate-700 mt-0.5">{selectedRecord.record.finding || 'None logged.'}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Recommendation</span>
                <p className="text-slate-700 mt-0.5">{selectedRecord.record.recommendation || 'None logged.'}</p>
              </div>
            </div>

            {selectedRecord.record.rejection_reason && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs">
                <span className="text-[10px] font-bold text-rose-800 uppercase block">Rejection Feedback</span>
                <p className="text-rose-700 font-medium mt-0.5">{selectedRecord.record.rejection_reason}</p>
              </div>
            )}

            <div className="flex justify-end pt-2 border-t">
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
