// src/pages/MonitoringPage.tsx
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
import { ShieldCheck, AlertTriangle, CheckCircle2, Clock, Layers } from 'lucide-react';

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

export const MonitoringPage: React.FC = () => {
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

  // -------------------------------------------------------------------
  // DASHBOARD — mirrors the Excel "Monitoring Dashboard" sheet: coverage,
  // verification result breakdown, data-quality-concern count, open/
  // overdue findings, and a by-Project/Region breakdown. All computed
  // live off the current filter scope, exactly like the workbook's
  // formulas update live as the Register is filled in.
  // -------------------------------------------------------------------
  const totalRecords = entries.length;
  const monitoredRecords = entries.filter(pe => {
    const r = getMonitoringRecordForPlanEntry(pe.id);
    return !!r && r.quarter_id !== '';
  }).length;
  const coveragePct = totalRecords === 0 ? 0 : (monitoredRecords / totalRecords) * 100;

  const verificationCounts: Record<VerificationResult, number> = {
    'Fully verified': 0,
    'Partially verified': 0,
    'Not verified': 0,
    'Unable to verify': 0,
  };
  entries.forEach(pe => {
    const r = getMonitoringRecordForPlanEntry(pe.id);
    if (r?.verification_result) verificationCounts[r.verification_result] += 1;
  });

  const dataQualityConcernCount = entries.filter(pe => {
    const r = getMonitoringRecordForPlanEntry(pe.id);
    return !!r?.data_quality_concern && r.data_quality_concern !== 'None';
  }).length;

  const openFindings = entries.filter(pe => {
    const r = getMonitoringRecordForPlanEntry(pe.id);
    return !!r?.status && r.status !== 'Closed';
  }).length;

  const todayStr = new Date().toISOString().slice(0, 10);
  const overdueFindings = entries.filter(pe => {
    const r = getMonitoringRecordForPlanEntry(pe.id);
    return !!r?.due_date && r.status !== 'Closed' && r.due_date < todayStr;
  }).length;

  interface ScopeStat { key: string; name: string; records: number; monitored: number; fully: number; partial: number; notVerified: number; }
  const scopeStats: ScopeStat[] = [
    ...regions.map(r => ({ id: r.id, name: r.name, type: 'Regional' as const })),
    ...projects.map(p => ({ id: p.id, name: p.name, type: 'Project' as const })),
  ]
    .map(scope => {
      const scopeEntries = entries.filter(pe =>
        scope.type === 'Regional' ? pe.region_id === scope.id : pe.project_id === scope.id
      );
      if (scopeEntries.length === 0) return null;
      let monitored = 0, fully = 0, partial = 0, notVerified = 0;
      scopeEntries.forEach(pe => {
        const r = getMonitoringRecordForPlanEntry(pe.id);
        if (r && r.quarter_id !== '') monitored += 1;
        if (r?.verification_result === 'Fully verified') fully += 1;
        if (r?.verification_result === 'Partially verified') partial += 1;
        if (r?.verification_result === 'Not verified') notVerified += 1;
      });
      return { key: scope.id, name: scope.name, records: scopeEntries.length, monitored, fully, partial, notVerified };
    })
    .filter((s): s is ScopeStat => s !== null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Monitoring Register</h2>
        <p className="text-xs text-slate-500 mt-1">
          One row per Activity × Contributing Project/Region, always linked straight back to that exact Plan
          Entry — pick a Quarter (or Annual) per row to pull that period's Reported Achieved live from Quarterly
          Actual Entry, then log the verification, data-quality and follow-up findings against it. The Quarter
          filter in the bar below only narrows which rows are listed here; it doesn't set each row's own Quarter
          selector. {!isMonitor && 'Only the Monitor role can add or edit entries here.'}
        </p>
      </div>

      <FilterBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          icon={ShieldCheck}
          title="Coverage"
          val={`${coveragePct.toFixed(1)}%`}
          sub={`${monitoredRecords} / ${totalRecords} rows monitored`}
        />
        <DashboardCard
          icon={CheckCircle2}
          title="Verification Results"
          val={String(verificationCounts['Fully verified'])}
          sub={`Fully verified · ${verificationCounts['Partially verified']} partial · ${verificationCounts['Not verified']} not verified · ${verificationCounts['Unable to verify']} unable`}
        />
        <DashboardCard
          icon={AlertTriangle}
          title="Data Quality Concerns"
          val={String(dataQualityConcernCount)}
          sub="Validity / Integrity / Precision / Reliability / Timeliness"
        />
        <DashboardCard
          icon={Clock}
          title="Open Findings"
          val={String(openFindings)}
          sub={`${overdueFindings} overdue (past due date, not Closed)`}
          warn={overdueFindings > 0}
        />
      </div>

      {scopeStats.length > 0 && (
        <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-ercs-red" /> By Contributing Project/Region
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b">
                <tr>
                  <th className="p-3">Project/Region</th>
                  <th className="p-3 text-right">Records</th>
                  <th className="p-3 text-right">Monitored</th>
                  <th className="p-3 text-right">Fully Verified</th>
                  <th className="p-3 text-right">Partially Verified</th>
                  <th className="p-3 text-right">Not Verified</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {scopeStats.map(s => (
                  <tr key={s.key} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-800">{s.name}</td>
                    <td className="p-3 text-right">{s.records}</td>
                    <td className="p-3 text-right">{s.monitored}</td>
                    <td className="p-3 text-right">{s.fully}</td>
                    <td className="p-3 text-right">{s.partial}</td>
                    <td className="p-3 text-right">{s.notVerified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <div className="space-y-4">
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
              uom={na?.uom || ''}
              scopeLabel={scopeLabel}
              isMonitor={isMonitor}
              quarterlyActuals={quarterlyActuals}
            />
          );
        })}
        {entries.length === 0 && (
          <div className="bg-white p-8 rounded-xl border text-center text-xs text-slate-500">
            No plan entries match this filter.
          </div>
        )}
      </div>
    </div>
  );
};

const DashboardCard: React.FC<{ icon: any; title: string; val: React.ReactNode; sub?: React.ReactNode; warn?: boolean }> = ({ icon: Icon, title, val, sub, warn }) => (
  <div className="bg-white p-4 rounded-xl border shadow-sm">
    <div className="flex justify-between mb-2 text-xs font-bold text-slate-500">
      <span>{title}</span>
      <Icon className={`w-4 h-4 ${warn ? 'text-rose-500' : ''}`} />
    </div>
    <div className={`text-2xl font-black ${warn ? 'text-rose-700' : 'text-slate-800'}`}>{val}</div>
    {sub && <div className="text-[10px] mt-1 text-slate-500">{sub}</div>}
  </div>
);

const MonitoringRegisterRow: React.FC<{
  entry: PlanEntry;
  record: MonitoringRecord | undefined;
  naCode: string;
  uom: string;
  scopeLabel?: string;
  isMonitor: boolean;
  quarterlyActuals: ReturnType<typeof useApp>['quarterlyActuals'];
}> = ({ entry, record, naCode, uom, scopeLabel, isMonitor, quarterlyActuals }) => {
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
    <div className="bg-white p-5 rounded-xl border shadow-sm space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b pb-3">
        <div>
          <span className="bg-ercs-red text-white text-[10px] font-extrabold px-2 py-0.5 rounded mr-2">{naCode}</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${entry.scope_type === 'Regional' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>{entry.scope_type}</span>
          <span className="ml-2 text-xs font-bold text-slate-800">{scopeLabel}</span>
          <div className="text-[10px] text-slate-500 mt-1 max-w-2xl"><b>{entry.activity_name}</b> — {entry.activity_description}</div>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          {followUp === 'Yes' && (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${overdue ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-amber-100 text-amber-800 border-amber-300'}`}>
              <AlertTriangle className="w-3 h-3" /> {overdue ? 'Overdue Follow-up' : 'Follow-up Required'}
            </span>
          )}
          {followUp === 'No' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border bg-emerald-100 text-emerald-800 border-emerald-300">
              <CheckCircle2 className="w-3 h-3" /> Closed
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Quarter</label>
          <select
            disabled={!isMonitor}
            value={form.quarter_id}
            onChange={e => update({ quarter_id: e.target.value as MonitoringQuarterSelection | '' })}
            className="w-full text-xs p-2 border rounded bg-slate-50 disabled:opacity-60"
          >
            <option value="">Not selected</option>
            {QUARTER_OPTIONS.map(q => <option key={q} value={q}>{q}</option>)}
          </select>
        </div>
        <div className="rounded-lg bg-blue-50 border border-blue-100 px-3 py-2">
          <div className="text-[9px] font-black uppercase tracking-wide text-blue-700">Reported Achieved (period)</div>
          <div className="text-sm font-black text-blue-900">{reportedAchieved === null ? '—' : `${reportedAchieved.toLocaleString()} ${uom}`}</div>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Monitoring Date</label>
          <input disabled={!isMonitor} type="date" value={form.monitoring_date || ''} onChange={e => update({ monitoring_date: e.target.value })} className="w-full text-xs p-2 border rounded bg-slate-50 disabled:opacity-60" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Monitoring Method</label>
          <select disabled={!isMonitor} value={form.monitoring_method || ''} onChange={e => update({ monitoring_method: (e.target.value || undefined) as MonitoringMethod | undefined })} className="w-full text-xs p-2 border rounded bg-slate-50 disabled:opacity-60">
            <option value="">Select…</option>
            {MONITORING_METHOD_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Verified By</label>
          <input disabled={!isMonitor} value={form.verified_by || ''} onChange={e => update({ verified_by: e.target.value })} className="w-full text-xs p-2 border rounded bg-slate-50 disabled:opacity-60" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Verified Achieved</label>
          <input
            disabled={!isMonitor}
            type="number" min="0"
            value={form.verified_achieved ?? ''}
            onChange={e => update({ verified_achieved: e.target.value === '' ? undefined : Math.max(0, Number(e.target.value)) })}
            className="w-full text-xs p-2 border rounded bg-slate-50 disabled:opacity-60"
          />
        </div>
        <div className="rounded-lg bg-indigo-50 border border-indigo-100 px-3 py-2">
          <div className="text-[9px] font-black uppercase tracking-wide text-indigo-700">Verification %</div>
          <div className="text-sm font-black text-indigo-900">{verificationPct === null ? '—' : `${verificationPct.toFixed(1)}%`}</div>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Verification Result</label>
          <select disabled={!isMonitor} value={form.verification_result || ''} onChange={e => update({ verification_result: (e.target.value || undefined) as VerificationResult | undefined })} className="w-full text-xs p-2 border rounded bg-slate-50 disabled:opacity-60">
            <option value="">Select…</option>
            {VERIFICATION_RESULT_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Data Quality Concern</label>
          <select disabled={!isMonitor} value={form.data_quality_concern || ''} onChange={e => update({ data_quality_concern: (e.target.value || undefined) as DataQualityConcern | undefined })} className="w-full text-xs p-2 border rounded bg-slate-50 disabled:opacity-60">
            <option value="">Select…</option>
            {DATA_QUALITY_CONCERN_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Quality Rating</label>
          <select disabled={!isMonitor} value={form.quality_rating || ''} onChange={e => update({ quality_rating: (e.target.value || undefined) as QualityRating | undefined })} className="w-full text-xs p-2 border rounded bg-slate-50 disabled:opacity-60">
            <option value="">Select…</option>
            {QUALITY_RATING_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Evidence Checked</label>
          <input disabled={!isMonitor} value={form.evidence_checked || ''} onChange={e => update({ evidence_checked: e.target.value })} placeholder="e.g. Distribution list, photos, sign-in sheets" className="w-full text-xs p-2 border rounded bg-slate-50 disabled:opacity-60" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="block">
          <span className="block text-[10px] font-bold text-slate-500 mb-1">Finding / Reason</span>
          <textarea disabled={!isMonitor} rows={2} value={form.finding || ''} onChange={e => update({ finding: e.target.value })} className="w-full text-xs p-2 border rounded bg-slate-50 disabled:opacity-60 resize-y" />
        </label>
        <label className="block">
          <span className="block text-[10px] font-bold text-slate-500 mb-1">Recommendation / Corrective Action</span>
          <textarea disabled={!isMonitor} rows={2} value={form.recommendation || ''} onChange={e => update({ recommendation: e.target.value })} className="w-full text-xs p-2 border rounded bg-slate-50 disabled:opacity-60 resize-y" />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Severity</label>
          <select disabled={!isMonitor} value={form.severity || ''} onChange={e => update({ severity: (e.target.value || undefined) as FindingSeverity | undefined })} className="w-full text-xs p-2 border rounded bg-slate-50 disabled:opacity-60">
            <option value="">Select…</option>
            {SEVERITY_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Responsible</label>
          <input disabled={!isMonitor} value={form.responsible || ''} onChange={e => update({ responsible: e.target.value })} className="w-full text-xs p-2 border rounded bg-slate-50 disabled:opacity-60" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Due Date</label>
          <input disabled={!isMonitor} type="date" value={form.due_date || ''} onChange={e => update({ due_date: e.target.value })} className="w-full text-xs p-2 border rounded bg-slate-50 disabled:opacity-60" />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-slate-500 mb-1">Status</label>
          <select disabled={!isMonitor} value={form.status || ''} onChange={e => update({ status: (e.target.value || undefined) as MonitoringStatus | undefined })} className="w-full text-xs p-2 border rounded bg-slate-50 disabled:opacity-60">
            <option value="">Select…</option>
            {STATUS_OPTIONS.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <div className={`rounded-lg border px-3 py-2 ${followUp === 'Yes' ? (overdue ? 'bg-rose-50 border-rose-200' : 'bg-amber-50 border-amber-200') : 'bg-slate-50 border-slate-200'}`}>
          <div className="text-[9px] font-black uppercase tracking-wide text-slate-500">Follow-up Required</div>
          <div className="text-sm font-black text-slate-800">{followUp || '—'}</div>
        </div>
      </div>

      <label className="block">
        <span className="block text-[10px] font-bold text-slate-500 mb-1">Remarks</span>
        <textarea disabled={!isMonitor} rows={2} value={form.remarks || ''} onChange={e => update({ remarks: e.target.value })} className="w-full text-xs p-2 border rounded bg-slate-50 disabled:opacity-60 resize-y" />
      </label>
    </div>
  );
};