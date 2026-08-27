// src/pages/MonitoringRegisterPage.tsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FilterBar } from '../components/common/FilterBar';
import { sumActual } from '../utils/calculations';
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
import { ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

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
  quality_rating: undefined,
  finding: '',
  severity: undefined,
  recommendation: '',
  responsible: '',
  due_date: '',
  status: undefined,
  remarks: '',
});

// Shared cell classes so every editable input/select in the table looks
// consistent at this density, matching QuarterlyPlanPage's per-quarter
// column styling (small text, tight padding, disabled-state dimming).
const cellInputCls = 'w-full min-w-[7rem] text-[10px] p-1.5 border rounded bg-white disabled:bg-slate-50 disabled:opacity-60';
const cellSelectCls = 'w-full min-w-[7.5rem] text-[10px] p-1.5 border rounded bg-white disabled:bg-slate-50 disabled:opacity-60';
const cellTextAreaCls = 'w-full min-w-[10rem] text-[10px] p-1.5 border rounded bg-white disabled:bg-slate-50 disabled:opacity-60 resize-y';
const lockedCellCls = 'p-2 bg-blue-50 align-top';

export const MonitoringRegisterPage: React.FC = () => {
  const {
    currentRole,
    nationalActivities,
    regions,
    projects,
    quarterlyActuals,
    getFilteredPlanEntries,
    getMonitoringRecordForPlanEntry,
  } = useApp();

  const isMonitor = currentRole === 'Monitor';
  const entries = getFilteredPlanEntries();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Monitoring Register</h2>
        <p className="text-xs text-slate-500 mt-1">
          One row per Activity × Contributing Project/Region, always linked straight back to that exact Plan
          Entry — pick a Quarter (or Annual) per row to pull that period's Reported Achieved live from Quarterly
          Actual Entry, then log the verification, data-quality and follow-up findings against it.
          {!isMonitor && ' Only the Monitor role can add or edit entries here.'}
        </p>
      </div>

      <FilterBar hideQuarterFilter />

      <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-ercs-red" /> Monitoring Register ({entries.length})
        </div>

        {entries.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No plan entries match this filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b sticky top-0 z-10">
                <tr>
                  <th className="p-2 whitespace-nowrap">Activity Code</th>
                  <th className="p-2 whitespace-nowrap">Activity Name</th>
                  <th className="p-2 whitespace-nowrap">Contributing Project/Region</th>
                  <th className="p-2 whitespace-nowrap">Quarter</th>
                  <th className="p-2 whitespace-nowrap">Reported Achieved (period)</th>
                  <th className="p-2 whitespace-nowrap">Monitoring Date</th>
                  <th className="p-2 whitespace-nowrap">Monitoring Method</th>
                  <th className="p-2 whitespace-nowrap">Verified By</th>
                  <th className="p-2 whitespace-nowrap">Verified Achieved</th>
                  <th className="p-2 whitespace-nowrap">Verification %</th>
                  <th className="p-2 whitespace-nowrap">Verification Result</th>
                  <th className="p-2 whitespace-nowrap">Data Quality Concern</th>
                  <th className="p-2 whitespace-nowrap">Evidence Checked</th>
                  <th className="p-2 whitespace-nowrap">Quality Rating</th>
                  <th className="p-2 whitespace-nowrap">Finding / Reason</th>
                  <th className="p-2 whitespace-nowrap">Severity</th>
                  <th className="p-2 whitespace-nowrap">Recommendation / Corrective Action</th>
                  <th className="p-2 whitespace-nowrap">Responsible</th>
                  <th className="p-2 whitespace-nowrap">Due Date</th>
                  <th className="p-2 whitespace-nowrap">Status</th>
                  <th className="p-2 whitespace-nowrap">Follow-up Required</th>
                  <th className="p-2 whitespace-nowrap">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {entries.map(pe => {
                  const na = nationalActivities.find(n => n.id === pe.national_activity_id);
                  const scopeLabel = pe.scope_type === 'Regional'
                    ? regions.find(r => r.id === pe.region_id)?.name
                    : projects.find(p => p.id === pe.project_id)?.name;
                  const record = getMonitoringRecordForPlanEntry(pe.id);
                  return (
                    <MonitoringRegisterRow
                      key={pe.id}
                      entry={pe}
                      record={record}
                      naCode={na?.code || ''}
                      activityName={pe.activity_name}
                      scopeType={pe.scope_type}
                      scopeLabel={scopeLabel}
                      isMonitor={isMonitor}
                      quarterlyActuals={quarterlyActuals}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

const MonitoringRegisterRow: React.FC<{
  entry: PlanEntry;
  record: MonitoringRecord | undefined;
  naCode: string;
  activityName: string;
  scopeType: PlanEntry['scope_type'];
  scopeLabel?: string;
  isMonitor: boolean;
  quarterlyActuals: ReturnType<typeof useApp>['quarterlyActuals'];
}> = ({ entry, record, naCode, activityName, scopeType, scopeLabel, isMonitor, quarterlyActuals }) => {
  const { upsertMonitoringRecord } = useApp();

  const [form, setForm] = useState<Omit<MonitoringRecord, 'id'>>(() =>
    record ? { ...record } : emptyMonitoringForm(entry.id)
  );

  React.useEffect(() => {
    setForm(record ? { ...record } : emptyMonitoringForm(entry.id));
  }, [entry.id, record]);

  const update = (patch: Partial<Omit<MonitoringRecord, 'id'>>) => {
    const next = { ...form, ...patch };
    setForm(next);
    if (!isMonitor) return;
    upsertMonitoringRecord({ ...next, id: record?.id });
  };

  // "Reported Achieved (period)" — live, never stored. '' means this row
  // hasn't picked a period yet; 'Annual' sums every quarter reported so
  // far for this exact Plan Entry; Q1–Q4 sums just that quarter.
  const reportedAchieved = form.quarter_id === ''
    ? null
    : form.quarter_id === 'Annual'
      ? sumActual([entry], quarterlyActuals)
      : sumActual([entry], quarterlyActuals, form.quarter_id);

  const verificationPct = reportedAchieved !== null && reportedAchieved > 0
    && form.verified_achieved !== undefined && form.verified_achieved !== null
    ? (form.verified_achieved / reportedAchieved) * 100
    : null;

  // Follow-up Required — live, mirrors the Excel formula: set only once a
  // Due Date exists, "No" once Status is Closed, "Yes" otherwise.
  const followUp: 'Yes' | 'No' | '' = !form.due_date ? '' : (form.status === 'Closed' ? 'No' : 'Yes');
  const todayStr = new Date().toISOString().slice(0, 10);
  const overdue = !!form.due_date && form.status !== 'Closed' && form.due_date < todayStr;

  return (
    <tr className="hover:bg-slate-50 align-top">
      <td className={lockedCellCls}>
        <span className="font-bold text-ercs-red whitespace-nowrap">{naCode}</span>
      </td>
      <td className={`${lockedCellCls} min-w-[10rem]`}>
        <span className="font-semibold text-slate-800">{activityName}</span>
      </td>
      <td className={`${lockedCellCls} min-w-[9rem]`}>
        <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold mr-1 ${scopeType === 'Regional' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
          {scopeType}
        </span>
        <div className="font-semibold text-slate-700 mt-0.5">{scopeLabel || '—'}</div>
      </td>
      <td className="p-2">
        <select
          disabled={!isMonitor}
          value={form.quarter_id}
          onChange={e => update({ quarter_id: e.target.value as MonitoringQuarterSelection | '' })}
          className={cellSelectCls}
        >
          <option value="">Not selected</option>
          {QUARTER_OPTIONS.map(q => <option key={q} value={q}>{q}</option>)}
        </select>
      </td>
      <td className="p-2">
        <div className="rounded bg-blue-50 border border-blue-100 px-2 py-1.5 text-center whitespace-nowrap">
          <div className="text-[10px] font-black text-blue-900">{reportedAchieved === null ? '—' : reportedAchieved.toLocaleString()}</div>
        </div>
      </td>
      <td className="p-2">
        <input disabled={!isMonitor} type="date" value={form.monitoring_date || ''} onChange={e => update({ monitoring_date: e.target.value })} className={cellInputCls} />
      </td>
      <td className="p-2">
        <select disabled={!isMonitor} value={form.monitoring_method || ''} onChange={e => update({ monitoring_method: (e.target.value || undefined) as MonitoringMethod | undefined })} className={cellSelectCls}>
          <option value="">Select…</option>
          {MONITORING_METHOD_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
      </td>
      <td className="p-2">
        <input disabled={!isMonitor} value={form.verified_by || ''} onChange={e => update({ verified_by: e.target.value })} className={cellInputCls} />
      </td>
      <td className="p-2">
        <input
          disabled={!isMonitor}
          type="number" min="0"
          value={form.verified_achieved ?? ''}
          onChange={e => update({ verified_achieved: e.target.value === '' ? undefined : Math.max(0, Number(e.target.value)) })}
          className={`${cellInputCls} min-w-[5rem]`}
        />
      </td>
      <td className="p-2">
        <div className="rounded bg-indigo-50 border border-indigo-100 px-2 py-1.5 text-center whitespace-nowrap">
          <div className="text-[10px] font-black text-indigo-900">{verificationPct === null ? '—' : `${verificationPct.toFixed(1)}%`}</div>
        </div>
      </td>
      <td className="p-2">
        <select disabled={!isMonitor} value={form.verification_result || ''} onChange={e => update({ verification_result: (e.target.value || undefined) as VerificationResult | undefined })} className={cellSelectCls}>
          <option value="">Select…</option>
          {VERIFICATION_RESULT_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </td>
      <td className="p-2">
        <select disabled={!isMonitor} value={form.data_quality_concern || ''} onChange={e => update({ data_quality_concern: (e.target.value || undefined) as DataQualityConcern | undefined })} className={cellSelectCls}>
          <option value="">Select…</option>
          {DATA_QUALITY_CONCERN_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </td>
      <td className="p-2">
        <input disabled={!isMonitor} value={form.evidence_checked || ''} onChange={e => update({ evidence_checked: e.target.value })} title={form.evidence_checked || ''} placeholder="e.g. Distribution list, photos" className={cellInputCls} />
      </td>
      <td className="p-2">
        <select disabled={!isMonitor} value={form.quality_rating || ''} onChange={e => update({ quality_rating: (e.target.value || undefined) as QualityRating | undefined })} className={cellSelectCls}>
          <option value="">Select…</option>
          {QUALITY_RATING_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </td>
      <td className="p-2">
        <textarea disabled={!isMonitor} rows={2} value={form.finding || ''} onChange={e => update({ finding: e.target.value })} title={form.finding || ''} className={cellTextAreaCls} />
      </td>
      <td className="p-2">
        <select disabled={!isMonitor} value={form.severity || ''} onChange={e => update({ severity: (e.target.value || undefined) as FindingSeverity | undefined })} className={cellSelectCls}>
          <option value="">Select…</option>
          {SEVERITY_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </td>
      <td className="p-2">
        <textarea disabled={!isMonitor} rows={2} value={form.recommendation || ''} onChange={e => update({ recommendation: e.target.value })} title={form.recommendation || ''} className={cellTextAreaCls} />
      </td>
      <td className="p-2">
        <input disabled={!isMonitor} value={form.responsible || ''} onChange={e => update({ responsible: e.target.value })} className={cellInputCls} />
      </td>
      <td className="p-2">
        <input disabled={!isMonitor} type="date" value={form.due_date || ''} onChange={e => update({ due_date: e.target.value })} className={cellInputCls} />
      </td>
      <td className="p-2">
        <select disabled={!isMonitor} value={form.status || ''} onChange={e => update({ status: (e.target.value || undefined) as MonitoringStatus | undefined })} className={cellSelectCls}>
          <option value="">Select…</option>
          {STATUS_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </td>
      <td className="p-2">
        {followUp === '' && <span className="text-slate-300 text-[10px]">—</span>}
        {followUp === 'Yes' && (
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border whitespace-nowrap ${overdue ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-amber-100 text-amber-800 border-amber-300'}`}>
            <AlertTriangle className="w-3 h-3" /> {overdue ? 'Overdue' : 'Yes'}
          </span>
        )}
        {followUp === 'No' && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border bg-emerald-100 text-emerald-800 border-emerald-300 whitespace-nowrap">
            <CheckCircle2 className="w-3 h-3" /> No
          </span>
        )}
      </td>
      <td className="p-2">
        <textarea disabled={!isMonitor} rows={2} value={form.remarks || ''} onChange={e => update({ remarks: e.target.value })} title={form.remarks || ''} className={cellTextAreaCls} />
      </td>
    </tr>
  );
};