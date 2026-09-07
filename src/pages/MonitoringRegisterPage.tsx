// src/pages/MonitoringRegisterPage.tsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FilterBar } from '../components/common/FilterBar';
import { sumActual, sumExpenditure } from '../utils/calculations';
import { NumberInput } from '../components/common/NumberInput';
import {
  PlanEntry,
  MonitoringRecord,
  MonitoringQuarterSelection,
  MonitoringMethod,
  VerificationResult,
  DataQualityConcern,
  QualityRating,
  FindingSeverity,
  MonitoringStatus,
} from '../types';
import {
  ShieldCheck, AlertTriangle, CheckCircle2, FileText, Upload, Send, Lock,
  ExternalLink, Eye, Edit3, X, AlertOctagon, HelpCircle
} from 'lucide-react';

const QUARTER_OPTIONS: MonitoringQuarterSelection[] = ['Q1', 'Q2', 'Q3', 'Q4', 'Annual'];
const MONITORING_METHOD_OPTIONS: MonitoringMethod[] = ['Field visit', 'Desk review', 'Remote', 'Joint'];
const VERIFICATION_RESULT_OPTIONS: VerificationResult[] = ['Fully verified', 'Partially verified', 'Not verified', 'Unable to verify'];
const DATA_QUALITY_CONCERN_OPTIONS: DataQualityConcern[] = ['None', 'Validity', 'Integrity', 'Precision', 'Reliability', 'Timeliness'];
const QUALITY_RATING_OPTIONS: QualityRating[] = ['Good', 'Satisfactory', 'Needs improvement', 'Poor', 'N/A'];
const SEVERITY_OPTIONS: FindingSeverity[] = ['Critical', 'High', 'Medium', 'Low'];
const STATUS_OPTIONS: MonitoringStatus[] = ['Open', 'In Progress', 'Closed'];

const emptyMonitoringForm = (planEntryId: string): Omit<MonitoringRecord, 'id'> => ({
  plan_entry_id: planEntryId,
  quarter_id: '',
  monitoring_date: '',
  monitoring_method: undefined,
  verified_by: '',
  verified_achieved: undefined,
  verification_result: undefined,
  data_quality_concern: undefined,
  evidence_checked: '',
  evidence_attachment_name: undefined,
  evidence_attachment_url: undefined,
  quality_rating: undefined,
  finding: '',
  finding_reason: '',
  severity: undefined,
  recommendation: '',
  recommendation_corrective_action: '',
  responsible: '',
  due_date: '',
  status: undefined,
  remarks: '',
  reported_expenditure: undefined,
  verified_expenditure: undefined,
  approval_status: 'Draft',
  rejection_reason: undefined,
});

const cellInputCls = 'w-full min-w-[6.5rem] text-[10px] p-1.5 border rounded bg-white disabled:bg-slate-50 disabled:opacity-60';
const cellSelectCls = 'w-full min-w-[7rem] text-[10px] p-1.5 border rounded bg-white disabled:bg-slate-50 disabled:opacity-60';
const lockedCellCls = 'p-2 bg-blue-50 align-top';

export const MonitoringRegisterPage: React.FC = () => {
  const {
    currentRole,
    nationalActivities,
    regions,
    projects,
    quarterlyPlans,
    quarterlyActuals,
    getFilteredPlanEntries,
    getMonitoringRecordForPlanEntry,
    nonProgrammaticActivities,
  } = useApp();

  const isMonitor = currentRole === 'PMER Officer';
  const isPmerHead = currentRole === 'PMER Head';
  const entries = getFilteredPlanEntries();

  const [activeModalEntry, setActiveModalEntry] = useState<PlanEntry | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-ercs-red" /> Monitoring Register
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Verify reported achievements and expenditures against primary evidence. Select a period to automatically pull reported figures, log verified expenditures, attach documentation, and submit to the PMER Head for approval.
            {!isMonitor && ' Only the PMER Officer role can create or edit entries.'}
          </p>
        </div>
      </div>

      <FilterBar hideQuarterFilter />

      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-ercs-red" /> Register Entries ({entries.length})
          </span>
          <span className="text-[10px] font-normal text-slate-500 lowercase">
            Click 'Verify &amp; Details' on any row for full verification dialog
          </span>
        </div>

        {entries.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No plan entries match this filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b sticky top-0 z-10 text-[10px]">
                <tr>
                  <th className="p-2 whitespace-nowrap">Activity</th>
                  <th className="p-2 whitespace-nowrap">Scope</th>
                  <th className="p-2 whitespace-nowrap">Period</th>
                  <th className="p-2 whitespace-nowrap">Reported Achieved</th>
                  <th className="p-2 whitespace-nowrap">Verified Achieved</th>
                  <th className="p-2 whitespace-nowrap">Target Verif. %</th>
                  <th className="p-2 whitespace-nowrap">Reported Exp.</th>
                  <th className="p-2 whitespace-nowrap">Verified Exp.</th>
                  <th className="p-2 whitespace-nowrap">Budget Verif. %</th>
                  <th className="p-2 whitespace-nowrap">Evidence Document</th>
                  <th className="p-2 whitespace-nowrap">Quality</th>
                  <th className="p-2 whitespace-nowrap">Approval Status</th>
                  <th className="p-2 whitespace-nowrap text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-[11px]">
                {entries.map(pe => {
                  const na = nationalActivities.find(n => n.id === pe.national_activity_id);
                  const npa = pe.non_programmatic_activity_id ? nonProgrammaticActivities.find(a => a.id === pe.non_programmatic_activity_id) : undefined;
                  const scopeLabel = pe.scope_type === 'Regional'
                    ? regions.find(r => r.id === pe.region_id)?.name
                    : pe.scope_type === 'NonProgrammatic'
                      ? `Department: ${npa?.department || 'HQ Department'}`
                      : projects.find(p => p.id === pe.project_id)?.name;
                  const record = getMonitoringRecordForPlanEntry(pe.id);
                  return (
                    <MonitoringRegisterTableRow
                      key={pe.id}
                      entry={pe}
                      record={record}
                      naCode={na?.code || pe.activity_code || '—'}
                      activityName={pe.activity_name}
                      scopeType={pe.scope_type}
                      scopeLabel={scopeLabel}
                      isMonitor={isMonitor}
                      quarterlyPlans={quarterlyPlans}
                      quarterlyActuals={quarterlyActuals}
                      onOpenModal={() => setActiveModalEntry(pe)}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Verification Modal Dialog */}
      {activeModalEntry && (
        <MonitoringDetailModal
          entry={activeModalEntry}
          record={getMonitoringRecordForPlanEntry(activeModalEntry.id)}
          naCode={nationalActivities.find(n => n.id === activeModalEntry.national_activity_id)?.code || activeModalEntry.activity_code || '—'}
          activityName={activeModalEntry.activity_name}
          scopeLabel={activeModalEntry.scope_type === 'Regional'
            ? regions.find(r => r.id === activeModalEntry.region_id)?.name
            : activeModalEntry.scope_type === 'NonProgrammatic'
              ? `Department: ${nonProgrammaticActivities.find(a => a.id === activeModalEntry.non_programmatic_activity_id)?.department || 'HQ Department'}`
              : projects.find(p => p.id === activeModalEntry.project_id)?.name}
          isMonitor={isMonitor}
          isPmerHead={isPmerHead}
          quarterlyPlans={quarterlyPlans}
          quarterlyActuals={quarterlyActuals}
          onClose={() => setActiveModalEntry(null)}
        />
      )}
    </div>
  );
};

const MonitoringRegisterTableRow: React.FC<{
  entry: PlanEntry;
  record: MonitoringRecord | undefined;
  naCode: string;
  activityName: string;
  scopeType: PlanEntry['scope_type'];
  scopeLabel?: string;
  isMonitor: boolean;
  quarterlyPlans: ReturnType<typeof useApp>['quarterlyPlans'];
  quarterlyActuals: ReturnType<typeof useApp>['quarterlyActuals'];
  onOpenModal: () => void;
}> = ({
  entry,
  record,
  naCode,
  activityName,
  scopeType,
  scopeLabel,
  isMonitor,
  quarterlyPlans,
  quarterlyActuals,
  onOpenModal,
}) => {
  const { upsertMonitoringRecord, submitMonitoringRecordForApproval } = useApp();

  const [form, setForm] = useState<Omit<MonitoringRecord, 'id'>>(() =>
    record ? { ...record } : emptyMonitoringForm(entry.id)
  );

  React.useEffect(() => {
    setForm(record ? { ...record } : emptyMonitoringForm(entry.id));
  }, [entry.id, record]);

  const isLocked = form.approval_status === 'Pending Approval' || !isMonitor;

  const update = (patch: Partial<Omit<MonitoringRecord, 'id'>>) => {
    if (isLocked) return;
    const next = { ...form, ...patch };
    if (patch.finding !== undefined) next.finding_reason = patch.finding;
    if (patch.finding_reason !== undefined) next.finding = patch.finding_reason;
    if (patch.recommendation !== undefined) next.recommendation_corrective_action = patch.recommendation;
    if (patch.recommendation_corrective_action !== undefined) next.recommendation = patch.recommendation_corrective_action;
    setForm(next);
    upsertMonitoringRecord({ ...next, id: record?.id });
  };

  const reportedAchieved = form.quarter_id === ''
    ? null
    : form.quarter_id === 'Annual'
      ? sumActual([entry], quarterlyActuals)
      : sumActual([entry], quarterlyActuals, form.quarter_id);

  const verificationPct = reportedAchieved !== null && reportedAchieved > 0
    && form.verified_achieved !== undefined && form.verified_achieved !== null
    ? (form.verified_achieved / reportedAchieved) * 100
    : null;

  const reportedExpenditure = form.quarter_id === ''
    ? 0
    : form.quarter_id === 'Annual'
      ? sumExpenditure([entry], quarterlyActuals)
      : sumExpenditure([entry], quarterlyActuals, form.quarter_id);

  const budgetVerificationPct = reportedExpenditure > 0 && form.verified_expenditure !== undefined && form.verified_expenditure !== null
    ? (form.verified_expenditure / reportedExpenditure) * 100
    : null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || isLocked) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      update({
        evidence_attachment_name: file.name,
        evidence_attachment_url: dataUrl,
      });
    };
    reader.readAsDataURL(file);
  };

  const status = form.approval_status || 'Draft';

  return (
    <tr className="hover:bg-slate-50 align-top">
      {/* Activity */}
      <td className={lockedCellCls}>
        <div className="font-bold text-ercs-red whitespace-nowrap">{naCode}</div>
        <div className="font-semibold text-slate-800 text-[10px] max-w-[12rem] truncate" title={activityName}>{activityName}</div>
      </td>

      {/* Scope */}
      <td className={`${lockedCellCls} min-w-[7rem]`}>
        <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold ${
          scopeType === 'Regional' ? 'bg-blue-100 text-blue-700' :
          scopeType === 'NonProgrammatic' ? 'bg-amber-100 text-amber-800' :
          'bg-purple-100 text-purple-700'
        }`}>
          {scopeType === 'NonProgrammatic' ? 'Department' : scopeType}
        </span>
        <div className="font-medium text-slate-700 text-[10px] truncate max-w-[8rem] mt-0.5" title={scopeLabel}>{scopeLabel || '—'}</div>
      </td>

      {/* Quarter */}
      <td className="p-2">
        <select
          disabled={isLocked}
          value={form.quarter_id}
          onChange={e => update({ quarter_id: e.target.value as MonitoringQuarterSelection | '' })}
          className={cellSelectCls}
        >
          <option value="">Select period</option>
          {QUARTER_OPTIONS.map(q => <option key={q} value={q}>{q}</option>)}
        </select>
      </td>

      {/* Reported Achieved */}
      <td className="p-2 text-center whitespace-nowrap">
        <div className="rounded bg-blue-50 border border-blue-100 px-2 py-1">
          <div className="text-[10px] font-black text-blue-900">{reportedAchieved === null ? '—' : reportedAchieved.toLocaleString()}</div>
        </div>
      </td>

      {/* Verified Achieved */}
      <td className="p-2">
        <NumberInput
          disabled={isLocked}
          min={0}
          value={form.verified_achieved ?? 0}
          onChange={v => update({ verified_achieved: v })}
          className={`${cellInputCls} min-w-[4.5rem]`}
        />
      </td>

      {/* Target Verification % */}
      <td className="p-2 text-center whitespace-nowrap">
        <div className="rounded bg-indigo-50 border border-indigo-100 px-2 py-1">
          <div className="text-[10px] font-black text-indigo-900">
            {verificationPct === null ? '—' : `${verificationPct.toFixed(1)}%`}
          </div>
        </div>
      </td>

      {/* Reported Expenditure */}
      <td className="p-2 text-center whitespace-nowrap">
        <div className="rounded bg-slate-100 border border-slate-200 px-2 py-1">
          <div className="text-[10px] font-black text-slate-800">
            ETB {reportedExpenditure.toLocaleString()}
          </div>
        </div>
      </td>

      {/* Verified Expenditure */}
      <td className="p-2">
        <NumberInput
          disabled={isLocked}
          min={0}
          value={form.verified_expenditure ?? 0}
          onChange={v => update({ verified_expenditure: v })}
          className={`${cellInputCls} min-w-[5rem]`}
        />
      </td>

      {/* Budget Verification % */}
      <td className="p-2 text-center whitespace-nowrap">
        <div className={`rounded px-2 py-1 border font-black text-[10px] ${
          budgetVerificationPct === null
            ? 'bg-slate-50 text-slate-400 border-slate-200'
            : budgetVerificationPct >= 90 && budgetVerificationPct <= 110
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-amber-50 text-amber-800 border-amber-200'
        }`}>
          {reportedExpenditure === 0 ? 'N/A (0 ETB)' : budgetVerificationPct === null ? '—' : `${budgetVerificationPct.toFixed(1)}%`}
        </div>
      </td>

      {/* Evidence Document */}
      <td className="p-2 min-w-[8rem]">
        {form.evidence_attachment_name ? (
          <div className="flex items-center gap-1 text-[10px]">
            <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            {form.evidence_attachment_url ? (
              <a
                href={form.evidence_attachment_url}
                download={form.evidence_attachment_name}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:text-blue-800 font-bold underline truncate max-w-[6.5rem]"
                title={`Download ${form.evidence_attachment_name}`}
              >
                {form.evidence_attachment_name}
              </a>
            ) : (
              <span className="font-semibold text-slate-700 truncate max-w-[6.5rem]" title={form.evidence_attachment_name}>
                {form.evidence_attachment_name}
              </span>
            )}
            {!isLocked && (
              <button
                type="button"
                onClick={() => update({ evidence_attachment_name: undefined, evidence_attachment_url: undefined })}
                className="text-slate-400 hover:text-rose-600 ml-1"
                title="Remove attachment"
              >
                ×
              </button>
            )}
          </div>
        ) : !isLocked ? (
          <label className="cursor-pointer inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-ercs-red border border-dashed border-slate-300 rounded px-1.5 py-1 bg-slate-50 hover:bg-white">
            <Upload className="w-3 h-3" /> Attach
            <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
          </label>
        ) : (
          <span className="text-slate-400 text-[10px]">None</span>
        )}
      </td>

      {/* Quality */}
      <td className="p-2">
        <select
          disabled={isLocked}
          value={form.quality_rating || ''}
          onChange={e => update({ quality_rating: (e.target.value || undefined) as QualityRating | undefined })}
          className={cellSelectCls}
        >
          <option value="">Select…</option>
          {QUALITY_RATING_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </td>

      {/* Approval Status */}
      <td className="p-2 whitespace-nowrap">
        {status === 'Approved' && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black border bg-emerald-100 text-emerald-800 border-emerald-300">
            <CheckCircle2 className="w-3 h-3" /> Approved
          </span>
        )}
        {status === 'Pending Approval' && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black border bg-amber-100 text-amber-800 border-amber-300" title="Locked while under review by PMER Head">
            <Lock className="w-3 h-3" /> Pending Review
          </span>
        )}
        {status === 'Rejected' && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black border bg-rose-100 text-rose-800 border-rose-300" title={form.rejection_reason || 'Rejected by PMER Head'}>
            <AlertOctagon className="w-3 h-3" /> Rejected
          </span>
        )}
        {status === 'Draft' && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border bg-slate-100 text-slate-700 border-slate-300">
            Draft
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="p-2 whitespace-nowrap text-center">
        <div className="flex items-center justify-center gap-1">
          <button
            type="button"
            onClick={onOpenModal}
            className="p-1 text-slate-600 hover:text-ercs-red hover:bg-slate-100 rounded border border-slate-200"
            title="Open detailed verification dialog"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          {isMonitor && status !== 'Pending Approval' && status !== 'Approved' && (
            <button
              type="button"
              onClick={() => {
                if (!record) {
                  upsertMonitoringRecord({ ...form });
                }
                submitMonitoringRecordForApproval(entry.id);
              }}
              className="p-1 text-white bg-ercs-red hover:bg-red-700 rounded text-[10px] font-bold flex items-center gap-0.5"
              title="Submit record to PMER Head for approval"
            >
              <Send className="w-3 h-3" /> Submit
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

interface MonitoringDetailModalProps {
  entry: PlanEntry;
  record: MonitoringRecord | undefined;
  naCode: string;
  activityName: string;
  scopeLabel?: string;
  isMonitor: boolean;
  isPmerHead: boolean;
  quarterlyPlans: ReturnType<typeof useApp>['quarterlyPlans'];
  quarterlyActuals: ReturnType<typeof useApp>['quarterlyActuals'];
  onClose: () => void;
}

const MonitoringDetailModal: React.FC<MonitoringDetailModalProps> = ({
  entry,
  record,
  naCode,
  activityName,
  scopeLabel,
  isMonitor,
  isPmerHead,
  quarterlyPlans,
  quarterlyActuals,
  onClose,
}) => {
  const { upsertMonitoringRecord, submitMonitoringRecordForApproval, approveMonitoringRecord, rejectMonitoringRecord } = useApp();

  const [form, setForm] = useState<Omit<MonitoringRecord, 'id'>>(() =>
    record ? { ...record } : emptyMonitoringForm(entry.id)
  );

  const [rejectReason, setRejectReason] = useState('');
  const [showRejectBox, setShowRejectBox] = useState(false);

  React.useEffect(() => {
    setForm(record ? { ...record } : emptyMonitoringForm(entry.id));
  }, [entry.id, record]);

  const isLocked = form.approval_status === 'Pending Approval' || !isMonitor;

  const update = (patch: Partial<Omit<MonitoringRecord, 'id'>>) => {
    if (isLocked) return;
    const next = { ...form, ...patch };
    if (patch.finding !== undefined) next.finding_reason = patch.finding;
    if (patch.finding_reason !== undefined) next.finding = patch.finding_reason;
    if (patch.recommendation !== undefined) next.recommendation_corrective_action = patch.recommendation;
    if (patch.recommendation_corrective_action !== undefined) next.recommendation = patch.recommendation_corrective_action;
    setForm(next);
  };

  const handleSave = () => {
    if (isLocked) return;
    upsertMonitoringRecord({ ...form, id: record?.id });
  };

  const handleSubmit = () => {
    if (isLocked) return;
    upsertMonitoringRecord({ ...form, id: record?.id });
    submitMonitoringRecordForApproval(entry.id);
    onClose();
  };

  // Computations
  const reportedAchieved = form.quarter_id === ''
    ? 0
    : form.quarter_id === 'Annual'
      ? sumActual([entry], quarterlyActuals)
      : sumActual([entry], quarterlyActuals, form.quarter_id);

  const verificationPct = reportedAchieved > 0 && form.verified_achieved !== undefined && form.verified_achieved !== null
    ? (form.verified_achieved / reportedAchieved) * 100
    : null;

  const reportedExpenditure = form.quarter_id === ''
    ? 0
    : form.quarter_id === 'Annual'
      ? sumExpenditure([entry], quarterlyActuals)
      : sumExpenditure([entry], quarterlyActuals, form.quarter_id);

  const periodBudget = form.quarter_id === '' || form.quarter_id === 'Annual'
    ? (entry.annual_budget || 0)
    : (quarterlyPlans.find(qp => qp.plan_entry_id === entry.id && qp.quarter_id === form.quarter_id)?.budget || (entry.annual_budget ? entry.annual_budget / 4 : 0));

  const budgetUtilizationPct = periodBudget > 0 ? (reportedExpenditure / periodBudget) * 100 : null;

  const budgetVerificationPct = reportedExpenditure > 0 && form.verified_expenditure !== undefined && form.verified_expenditure !== null
    ? (form.verified_expenditure / reportedExpenditure) * 100
    : null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || isLocked) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      update({
        evidence_attachment_name: file.name,
        evidence_attachment_url: dataUrl,
      });
    };
    reader.readAsDataURL(file);
  };

  const status = form.approval_status || 'Draft';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b bg-slate-50 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-ercs-red text-sm">{naCode}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-800">{entry.scope_type}: {scopeLabel || '—'}</span>
            </div>
            <h3 className="text-base font-bold text-slate-800 mt-1">{activityName}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          {/* Status Alert Banner */}
          {status === 'Pending Approval' && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 text-amber-900">
              <Lock className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <div className="font-bold">Pending Approval by PMER Head</div>
                <div className="text-[11px] text-amber-700 mt-0.5">This record has been submitted and is currently locked from further editing.</div>
              </div>
            </div>
          )}

          {status === 'Rejected' && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-3 text-rose-900">
              <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0" />
              <div>
                <div className="font-bold">Record Rejected by PMER Head</div>
                <div className="text-[11px] text-rose-700 mt-0.5 font-semibold">Reason: {form.rejection_reason || 'No specific notes provided.'}</div>
                <div className="text-[10px] text-rose-600 mt-0.5">Please update the verified details and resubmit for approval.</div>
              </div>
            </div>
          )}

          {status === 'Approved' && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold">Record Approved &amp; Finalized</div>
                <div className="text-[11px] text-emerald-700 mt-0.5">Approved on {form.reviewed_at ? new Date(form.reviewed_at).toLocaleDateString() : 'recent'}. Data is verified and included in the Monitoring Dashboard.</div>
              </div>
            </div>
          )}

          {/* Section 1: Monitoring Period Selection */}
          <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
            <h4 className="font-black text-slate-700 uppercase tracking-wider text-[11px]">1. Monitoring Period &amp; Methodology</h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Period / Quarter</label>
                <select
                  disabled={isLocked}
                  value={form.quarter_id}
                  onChange={e => update({ quarter_id: e.target.value as MonitoringQuarterSelection | '' })}
                  className="w-full text-xs p-2 border rounded-lg bg-white"
                >
                  <option value="">Select period…</option>
                  {QUARTER_OPTIONS.map(q => <option key={q} value={q}>{q}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Monitoring Date</label>
                <input
                  disabled={isLocked}
                  type="date"
                  value={form.monitoring_date || ''}
                  onChange={e => update({ monitoring_date: e.target.value })}
                  className="w-full text-xs p-2 border rounded-lg bg-white"
                >
                </input>
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Methodology</label>
                <select
                  disabled={isLocked}
                  value={form.monitoring_method || ''}
                  onChange={e => update({ monitoring_method: (e.target.value || undefined) as MonitoringMethod | undefined })}
                  className="w-full text-xs p-2 border rounded-lg bg-white"
                >
                  <option value="">Select method…</option>
                  {MONITORING_METHOD_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Verified By</label>
                <input
                  disabled={isLocked}
                  value={form.verified_by || ''}
                  onChange={e => update({ verified_by: e.target.value })}
                  placeholder="Officer name"
                  className="w-full text-xs p-2 border rounded-lg bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Achievement Verification */}
          <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
            <h4 className="font-black text-slate-700 uppercase tracking-wider text-[11px]">2. Output &amp; Target Verification</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded-lg border">
                <div className="text-[10px] uppercase font-bold text-slate-400">Reported Achieved (Live)</div>
                <div className="text-xl font-black text-blue-900 mt-1">{reportedAchieved.toLocaleString()}</div>
                <div className="text-[10px] text-slate-500 mt-1">Pulled directly from quarterly actuals</div>
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Verified Achieved (Field/Desk)</label>
                <NumberInput
                  disabled={isLocked}
                  min={0}
                  value={form.verified_achieved ?? 0}
                  onChange={v => update({ verified_achieved: v })}
                  className="w-full text-sm font-bold p-2 border rounded-lg bg-white"
                />
              </div>
              <div className="bg-white p-3 rounded-lg border">
                <div className="text-[10px] uppercase font-bold text-slate-400">Achievement Verification %</div>
                <div className="text-xl font-black text-indigo-900 mt-1">
                  {verificationPct === null ? '—' : `${verificationPct.toFixed(1)}%`}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">(Verified / Reported) × 100</div>
              </div>
            </div>
          </div>

          {/* Section 3: Budget & Financial Verification */}
          <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
            <h4 className="font-black text-slate-700 uppercase tracking-wider text-[11px]">3. Budget &amp; Financial Verification</h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded-lg border">
                <div className="text-[10px] uppercase font-bold text-slate-400">Planned Budget (period)</div>
                <div className="text-base font-black text-slate-800 mt-1">ETB {periodBudget.toLocaleString()}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  Utilization: <span className="font-bold">{budgetUtilizationPct === null ? '0%' : `${budgetUtilizationPct.toFixed(1)}%`}</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border">
                <div className="text-[10px] uppercase font-bold text-slate-400">Reported Expenditure (Live)</div>
                <div className="text-base font-black text-blue-900 mt-1">ETB {reportedExpenditure.toLocaleString()}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">From submitted actual reports</div>
              </div>

              <div>
                <label className="block text-slate-500 font-bold mb-1">Verified Expenditure (ETB)</label>
                <NumberInput
                  disabled={isLocked}
                  min={0}
                  value={form.verified_expenditure ?? 0}
                  onChange={v => update({ verified_expenditure: v })}
                  className="w-full text-sm font-bold p-2 border rounded-lg bg-white"
                />
              </div>

              <div className="bg-white p-3 rounded-lg border">
                <div className="text-[10px] uppercase font-bold text-slate-400">Budget Verification %</div>
                <div className={`text-base font-black mt-1 ${
                  budgetVerificationPct === null
                    ? 'text-slate-400'
                    : budgetVerificationPct >= 90 && budgetVerificationPct <= 110
                      ? 'text-emerald-700'
                      : 'text-amber-700'
                }`}>
                  {reportedExpenditure === 0 ? 'N/A (0 Reported)' : budgetVerificationPct === null ? '—' : `${budgetVerificationPct.toFixed(1)}%`}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">(Verified Exp / Reported Exp) × 100</div>
              </div>
            </div>
          </div>

          {/* Section 4: Evidence Documentation Attachment */}
          <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
            <h4 className="font-black text-slate-700 uppercase tracking-wider text-[11px] flex items-center justify-between">
              <span>4. Evidence Document Attachment</span>
              <span className="text-[10px] font-normal text-slate-500 lowercase">Proof of verification (PDF, image, doc)</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Evidence Checked (Description)</label>
                <input
                  disabled={isLocked}
                  value={form.evidence_checked || ''}
                  onChange={e => update({ evidence_checked: e.target.value })}
                  placeholder="e.g. Beneficiary sign-off sheets, photos, payment vouchers"
                  className="w-full text-xs p-2 border rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold mb-1">Attached Document File</label>
                {form.evidence_attachment_name ? (
                  <div className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      {form.evidence_attachment_url ? (
                        <a
                          href={form.evidence_attachment_url}
                          download={form.evidence_attachment_name}
                          target="_blank"
                          rel="noreferrer"
                          className="font-bold text-blue-700 hover:text-blue-900 underline truncate text-xs"
                          title={`Download ${form.evidence_attachment_name}`}
                        >
                          {form.evidence_attachment_name}
                        </a>
                      ) : (
                        <span className="font-bold text-slate-700 truncate text-xs">
                          {form.evidence_attachment_name}
                        </span>
                      )}
                    </div>
                    {!isLocked && (
                      <button
                        type="button"
                        onClick={() => update({ evidence_attachment_name: undefined, evidence_attachment_url: undefined })}
                        className="text-slate-400 hover:text-rose-600 font-bold px-2 py-0.5 rounded text-xs"
                        title="Remove attachment"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ) : !isLocked ? (
                  <label className="cursor-pointer flex items-center justify-center gap-2 p-2 border-2 border-dashed border-slate-300 rounded-lg bg-white hover:border-ercs-red text-slate-600 hover:text-ercs-red transition-colors">
                    <Upload className="w-4 h-4" />
                    <span className="font-bold text-xs">Upload Document / Photo / PDF</span>
                    <input type="file" onChange={handleFileUpload} className="hidden" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
                  </label>
                ) : (
                  <div className="p-2 border rounded-lg bg-white text-slate-400 text-xs italic">
                    No document attached.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 5: Data Quality, Findings & Corrective Action */}
          <div className="bg-slate-50 p-4 rounded-xl border space-y-3">
            <h4 className="font-black text-slate-700 uppercase tracking-wider text-[11px]">5. Quality Assessment &amp; Findings</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Verification Result</label>
                <select
                  disabled={isLocked}
                  value={form.verification_result || ''}
                  onChange={e => update({ verification_result: (e.target.value || undefined) as VerificationResult | undefined })}
                  className="w-full text-xs p-2 border rounded-lg bg-white"
                >
                  <option value="">Select result…</option>
                  {VERIFICATION_RESULT_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Data Quality Concern</label>
                <select
                  disabled={isLocked}
                  value={form.data_quality_concern || ''}
                  onChange={e => update({ data_quality_concern: (e.target.value || undefined) as DataQualityConcern | undefined })}
                  className="w-full text-xs p-2 border rounded-lg bg-white"
                >
                  <option value="">Select concern…</option>
                  {DATA_QUALITY_CONCERN_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Quality Rating</label>
                <select
                  disabled={isLocked}
                  value={form.quality_rating || ''}
                  onChange={e => update({ quality_rating: (e.target.value || undefined) as QualityRating | undefined })}
                  className="w-full text-xs p-2 border rounded-lg bg-white"
                >
                  <option value="">Select rating…</option>
                  {QUALITY_RATING_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Finding / Observation</label>
                <textarea
                  disabled={isLocked}
                  rows={2}
                  value={form.finding || ''}
                  onChange={e => update({ finding: e.target.value })}
                  placeholder="Details of discrepancies or positive observations…"
                  className="w-full text-xs p-2 border rounded-lg bg-white resize-y"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Recommendation / Corrective Action</label>
                <textarea
                  disabled={isLocked}
                  rows={2}
                  value={form.recommendation || ''}
                  onChange={e => update({ recommendation: e.target.value })}
                  placeholder="Required remedial action or guidance…"
                  className="w-full text-xs p-2 border rounded-lg bg-white resize-y"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              <div>
                <label className="block text-slate-500 font-bold mb-1">Severity</label>
                <select
                  disabled={isLocked}
                  value={form.severity || ''}
                  onChange={e => update({ severity: (e.target.value || undefined) as FindingSeverity | undefined })}
                  className="w-full text-xs p-2 border rounded-lg bg-white"
                >
                  <option value="">Select…</option>
                  {SEVERITY_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Action Responsible</label>
                <input
                  disabled={isLocked}
                  value={form.responsible || ''}
                  onChange={e => update({ responsible: e.target.value })}
                  placeholder="Person or team"
                  className="w-full text-xs p-2 border rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Due Date</label>
                <input
                  disabled={isLocked}
                  type="date"
                  value={form.due_date || ''}
                  onChange={e => update({ due_date: e.target.value })}
                  className="w-full text-xs p-2 border rounded-lg bg-white"
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold mb-1">Tracking Status</label>
                <select
                  disabled={isLocked}
                  value={form.status || ''}
                  onChange={e => update({ status: (e.target.value || undefined) as MonitoringStatus | undefined })}
                  className="w-full text-xs p-2 border rounded-lg bg-white"
                >
                  <option value="">Select…</option>
                  {STATUS_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* PMER Head Review Action Box (if opened by PMER Head) */}
          {isPmerHead && status === 'Pending Approval' && (
            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-xl space-y-3">
              <h4 className="font-black text-indigo-900 uppercase tracking-wider text-[11px] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-700" /> PMER Head Review Decision
              </h4>
              <p className="text-slate-600 text-[11px]">
                Review the verification details, evidence attachment, and expenditure audit above. Choose to approve or reject this monitoring record.
              </p>

              {showRejectBox ? (
                <div className="space-y-2 pt-2">
                  <label className="block font-bold text-rose-800 text-[11px]">Required Rejection Reason</label>
                  <textarea
                    rows={2}
                    value={rejectReason}
                    onChange={e => setRejectReason(e.target.value)}
                    placeholder="Provide specific notes on what needs revision…"
                    className="w-full text-xs p-2 border border-rose-300 rounded-lg bg-white"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowRejectBox(false)}
                      className="px-3 py-1 text-slate-600 font-bold hover:bg-slate-200 rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        rejectMonitoringRecord(entry.id, rejectReason);
                        onClose();
                      }}
                      className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded"
                    >
                      Confirm Rejection
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      approveMonitoringRecord(entry.id);
                      onClose();
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-lg flex items-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve Record
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowRejectBox(true)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-lg flex items-center gap-1.5 shadow-sm"
                  >
                    <AlertOctagon className="w-4 h-4" /> Reject Record…
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t bg-slate-50 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 font-medium">
            Status: <span className="font-bold text-slate-800">{status}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 font-bold hover:bg-slate-200 rounded-lg text-xs"
            >
              Close
            </button>
            {isMonitor && status !== 'Pending Approval' && status !== 'Approved' && (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 border border-slate-300 font-bold hover:bg-white bg-slate-100 text-slate-700 rounded-lg text-xs"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-ercs-red hover:bg-red-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" /> Submit for Approval
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};