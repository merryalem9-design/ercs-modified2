// src/pages/MonitoringDashboardPage.tsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { FilterBar } from '../components/common/FilterBar';
import { sumActual, sumExpenditure } from '../utils/calculations';
import {
  DataQualityConcern, FindingSeverity, MonitoringStatus, QualityRating, VerificationResult, MonitoringMethod,
} from '../types';
import {
  ShieldCheck, AlertTriangle, CheckCircle2, Clock, Layers, Gauge, Award, ListChecks, AlertOctagon, ClipboardList, FileText,
} from 'lucide-react';

const sumOf = (obj: Record<string, number>): number => Object.values(obj).reduce((a, b) => a + b, 0);

export const MonitoringDashboardPage: React.FC = () => {
  const {
    nationalActivities,
    regions,
    projects,
    quarterlyActuals,
    getFilteredPlanEntries,
    getMonitoringRecordForPlanEntry,
    nonProgrammaticActivities,
  } = useApp();

  const entries = getFilteredPlanEntries();
  const todayStr = new Date().toISOString().slice(0, 10);

  // -------------------------------------------------------------------
  // Every number below is read live off the same `monitoringRecords`
  // state the Monitoring Register writes to (via
  // getMonitoringRecordForPlanEntry), scoped by the same
  // getFilteredPlanEntries() the Register uses — so any edit made in the
  // Register is reflected here the moment you switch to this page, with
  // no separate cache to go stale.
  // -------------------------------------------------------------------
  const totalRecords = entries.length;

  const verificationCounts: Record<VerificationResult, number> = {
    'Fully verified': 0, 'Partially verified': 0, 'Not verified': 0, 'Unable to verify': 0,
  };
  const methodCounts: Record<MonitoringMethod, number> = {
    'Desk review': 0, 'Field visit': 0, Remote: 0, Joint: 0,
  };
  const concernCounts: Record<Exclude<DataQualityConcern, 'None'>, number> = {
    Validity: 0, Integrity: 0, Precision: 0, Reliability: 0, Timeliness: 0,
  };
  const ratingCounts: Record<QualityRating, number> = {
    Good: 0, Satisfactory: 0, 'Needs improvement': 0, Poor: 0, 'N/A': 0,
  };
  const statusCounts: Record<MonitoringStatus, number> = { Open: 0, 'In Progress': 0, Closed: 0 };
  const openSeverityCounts: Record<FindingSeverity, number> = { Critical: 0, High: 0, Medium: 0, Low: 0 };

  let monitoredRecords = 0;
  let overdueFindings = 0;
  let verifiedSum = 0;
  let reportedSumForVerified = 0;

  entries.forEach(pe => {
    const rawR = getMonitoringRecordForPlanEntry(pe.id);
    if (!rawR || rawR.approval_status !== 'Approved') return;
    const r = rawR;
    if (r.quarter_id !== '') monitoredRecords += 1;

    if (r.verification_result) verificationCounts[r.verification_result] += 1;
    if (r.monitoring_method) methodCounts[r.monitoring_method] += 1;
    if (r.data_quality_concern && r.data_quality_concern !== 'None') concernCounts[r.data_quality_concern] += 1;
    if (r.quality_rating) ratingCounts[r.quality_rating] += 1;

    if (r.status) {
      statusCounts[r.status] += 1;
      if (r.status !== 'Closed') {
        if (r.severity) openSeverityCounts[r.severity] += 1;
        if (r.due_date && r.due_date < todayStr) overdueFindings += 1;
      }
    }

    // Verification Accuracy — the same reported-vs-verified comparison the
    // Register shows per row as "Verification %", aggregated here as
    // sum(verified) / sum(reported) rather than an average of percentages,
    // so a handful of small entries can't distort the overall figure.
    if (typeof r.verified_achieved === 'number' && r.quarter_id !== '') {
      const reported = r.quarter_id === 'Annual'
        ? sumActual([pe], quarterlyActuals)
        : sumActual([pe], quarterlyActuals, r.quarter_id);
      if (reported > 0) {
        verifiedSum += r.verified_achieved;
        reportedSumForVerified += reported;
      }
    }
  });

  const coveragePct = totalRecords === 0 ? 0 : (monitoredRecords / totalRecords) * 100;
  const verificationTotal = sumOf(verificationCounts);
  const methodTotal = sumOf(methodCounts);
  const dataQualityConcernCount = sumOf(concernCounts);
  const ratingTotal = sumOf(ratingCounts);
  const statusTotal = sumOf(statusCounts);
  const severityTotal = sumOf(openSeverityCounts);
  const openFindings = statusCounts.Open + statusCounts['In Progress'];
  const verificationAccuracyPct = reportedSumForVerified === 0 ? null : (verifiedSum / reportedSumForVerified) * 100;

  // -------------------------------------------------------------------
  // BY CONTRIBUTING PROJECT/REGION — same grouping the Register's
  // "Contributing Project/Region" column uses (Region-level, not Zone —
  // zone-scoped entries roll up into their parent Region here, exactly
  // as the Register labels them).
  // -------------------------------------------------------------------
  interface ScopeStat {
    key: string; name: string; records: number; monitored: number;
    fully: number; partial: number; notVerified: number; unable: number;
    concerns: number; openFindings: number;
  }
  const scopeStats: ScopeStat[] = [
    ...regions.map(r => ({ id: r.id, name: r.name, type: 'Regional' as const })),
    ...projects.map(p => ({ id: p.id, name: p.name, type: 'Project' as const })),
  ]
    .map(scope => {
      const scopeEntries = entries.filter(pe =>
        scope.type === 'Regional' ? pe.region_id === scope.id : pe.project_id === scope.id
      );
      if (scopeEntries.length === 0) return null;
      let monitored = 0, fully = 0, partial = 0, notVerified = 0, unable = 0, concerns = 0, openFindingsCount = 0;
      scopeEntries.forEach(pe => {
        const rawR = getMonitoringRecordForPlanEntry(pe.id);
        const r = (rawR && rawR.approval_status === 'Approved') ? rawR : undefined;
        if (r && r.quarter_id !== '') monitored += 1;
        if (r?.verification_result === 'Fully verified') fully += 1;
        if (r?.verification_result === 'Partially verified') partial += 1;
        if (r?.verification_result === 'Not verified') notVerified += 1;
        if (r?.verification_result === 'Unable to verify') unable += 1;
        if (r?.data_quality_concern && r.data_quality_concern !== 'None') concerns += 1;
        if (r?.status && r.status !== 'Closed') openFindingsCount += 1;
      });
      return { key: scope.id, name: scope.name, records: scopeEntries.length, monitored, fully, partial, notVerified, unable, concerns, openFindings: openFindingsCount };
    })
    .filter((s): s is ScopeStat => s !== null);

  // -------------------------------------------------------------------
  // BY NATIONAL ACTIVITY — new. The Register's first two columns
  // (Activity Code / Activity Name) previously had no rollup anywhere on
  // the Dashboard, so an activity with poor coverage or open findings
  // spread across several Regions/Projects was invisible here.
  // -------------------------------------------------------------------
  interface NaStat { key: string; code: string; name: string; records: number; monitored: number; coveragePct: number; concerns: number; openFindings: number; }
  const naStats: NaStat[] = nationalActivities
    .map(na => {
      const naEntries = entries.filter(pe => pe.national_activity_id === na.id);
      if (naEntries.length === 0) return null;
      let monitored = 0, concerns = 0, openFindingsCount = 0;
      naEntries.forEach(pe => {
        const rawR = getMonitoringRecordForPlanEntry(pe.id);
        const r = (rawR && rawR.approval_status === 'Approved') ? rawR : undefined;
        if (r && r.quarter_id !== '') monitored += 1;
        if (r?.data_quality_concern && r.data_quality_concern !== 'None') concerns += 1;
        if (r?.status && r.status !== 'Closed') openFindingsCount += 1;
      });
      return {
        key: na.id, code: na.code, name: na.description, records: naEntries.length, monitored,
        coveragePct: naEntries.length === 0 ? 0 : (monitored / naEntries.length) * 100,
        concerns, openFindings: openFindingsCount,
      };
    })
    .filter((s): s is NaStat => s !== null);

  const approvedRecords = entries
    .map(pe => {
      const rawR = getMonitoringRecordForPlanEntry(pe.id);
      if (!rawR || rawR.approval_status !== 'Approved') return null;
      const na = nationalActivities.find(n => n.id === pe.national_activity_id);
      const npa = pe.non_programmatic_activity_id ? nonProgrammaticActivities.find(a => a.id === pe.non_programmatic_activity_id) : undefined;
      const scopeLabel = pe.scope_type === 'Regional'
        ? regions.find(reg => reg.id === pe.region_id)?.name
        : pe.scope_type === 'NonProgrammatic'
          ? `Department: ${npa?.department || 'HQ Department'}`
          : projects.find(proj => proj.id === pe.project_id)?.name;
      return { pe, r: rawR, na, scopeLabel };
    })
    .filter((item): item is { pe: typeof entries[0]; r: NonNullable<ReturnType<typeof getMonitoringRecordForPlanEntry>>; na: typeof nationalActivities[0] | undefined; scopeLabel: string | undefined } => item !== null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Monitoring Dashboard</h2>
        <p className="text-xs text-slate-500 mt-1">
          Coverage, verification results, data quality, and findings for the Monitoring Register — computed live
          off the current filter scope, and updated immediately as records are edited in the Register.
        </p>
      </div>

      <FilterBar hideQuarterFilter />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <DashboardCard
          icon={ShieldCheck}
          title="Coverage"
          val={`${coveragePct.toFixed(1)}%`}
          sub={`${monitoredRecords} / ${totalRecords} rows monitored`}
          status={coveragePct >= 80 ? 'green' : coveragePct >= 60 ? 'amber' : 'red'}
        />
        <DashboardCard
          icon={CheckCircle2}
          title="Verification Results"
          val={String(verificationCounts['Fully verified'])}
          sub={`Fully verified · ${verificationCounts['Partially verified']} partial · ${verificationCounts['Not verified']} not verified · ${verificationCounts['Unable to verify']} unable`}
          status={verificationCounts['Fully verified'] > 0 ? 'green' : 'amber'}
        />
        <DashboardCard
          icon={Gauge}
          title="Verification Accuracy"
          val={verificationAccuracyPct === null ? '—' : `${verificationAccuracyPct.toFixed(1)}%`}
          sub={reportedSumForVerified === 0 ? 'No verified-vs-reported comparisons yet' : `${verifiedSum.toLocaleString()} verified / ${reportedSumForVerified.toLocaleString()} reported`}
          status={verificationAccuracyPct === null ? 'amber' : verificationAccuracyPct >= 80 ? 'green' : verificationAccuracyPct >= 60 ? 'amber' : 'red'}
        />
        <DashboardCard
          icon={AlertTriangle}
          title="Data Quality Concerns"
          val={String(dataQualityConcernCount)}
          sub="Validity / Integrity / Precision / Reliability / Timeliness — breakdown below"
          status={dataQualityConcernCount === 0 ? 'green' : dataQualityConcernCount <= 3 ? 'amber' : 'red'}
        />
        <DashboardCard
          icon={Clock}
          title="Findings"
          val={String(openFindings)}
          sub={`${overdueFindings} overdue · ${statusCounts.Closed} closed of ${statusTotal} total`}
          status={overdueFindings > 0 ? 'red' : openFindings > 0 ? 'amber' : 'green'}
          warn={overdueFindings > 0}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <BreakdownCard
          icon={CheckCircle2}
          title="Verification Results"
          total={verificationTotal}
          emptyHint="No verification results logged for this filter."
          rows={[
            { label: 'Fully verified', count: verificationCounts['Fully verified'], barColor: 'bg-emerald-500' },
            { label: 'Partially verified', count: verificationCounts['Partially verified'], barColor: 'bg-blue-500' },
            { label: 'Not verified', count: verificationCounts['Not verified'], barColor: 'bg-amber-500' },
            { label: 'Unable to verify', count: verificationCounts['Unable to verify'], barColor: 'bg-slate-400' },
          ]}
        />
        <BreakdownCard
          icon={ClipboardList}
          title="Monitoring Methods by Type"
          total={methodTotal}
          emptyHint="No monitoring methods logged for this filter."
          rows={[
            { label: 'Desk review', count: methodCounts['Desk review'], barColor: 'bg-blue-500' },
            { label: 'Field visit', count: methodCounts['Field visit'], barColor: 'bg-emerald-500' },
            { label: 'Remote', count: methodCounts.Remote, barColor: 'bg-purple-500' },
            { label: 'Joint', count: methodCounts.Joint, barColor: 'bg-amber-500' },
          ]}
        />
        <BreakdownCard
          icon={AlertTriangle}
          title="Data Quality Concerns by Type"
          total={dataQualityConcernCount}
          emptyHint="No data quality concerns logged for this filter."
          rows={[
            { label: 'Validity', count: concernCounts.Validity, barColor: 'bg-amber-500' },
            { label: 'Integrity', count: concernCounts.Integrity, barColor: 'bg-rose-500' },
            { label: 'Precision', count: concernCounts.Precision, barColor: 'bg-orange-500' },
            { label: 'Reliability', count: concernCounts.Reliability, barColor: 'bg-purple-500' },
            { label: 'Timeliness', count: concernCounts.Timeliness, barColor: 'bg-blue-500' },
          ]}
        />
        <BreakdownCard
          icon={Award}
          title="Quality Ratings"
          total={ratingTotal}
          emptyHint="No quality ratings logged for this filter."
          rows={[
            { label: 'Good', count: ratingCounts.Good, barColor: 'bg-emerald-500' },
            { label: 'Satisfactory', count: ratingCounts.Satisfactory, barColor: 'bg-blue-500' },
            { label: 'Needs improvement', count: ratingCounts['Needs improvement'], barColor: 'bg-amber-500' },
            { label: 'Poor', count: ratingCounts.Poor, barColor: 'bg-rose-500' },
            { label: 'N/A', count: ratingCounts['N/A'], barColor: 'bg-slate-400' },
          ]}
        />
        <BreakdownCard
          icon={ListChecks}
          title="Findings by Status"
          total={statusTotal}
          emptyHint="No findings logged for this filter."
          rows={[
            { label: 'Open', count: statusCounts.Open, barColor: 'bg-amber-500' },
            { label: 'In Progress', count: statusCounts['In Progress'], barColor: 'bg-blue-500' },
            { label: 'Closed', count: statusCounts.Closed, barColor: 'bg-emerald-500' },
          ]}
        />
        <BreakdownCard
          icon={AlertOctagon}
          title="Open Findings by Severity"
          total={severityTotal}
          emptyHint="No open findings with a severity set."
          rows={[
            { label: 'Critical', count: openSeverityCounts.Critical, barColor: 'bg-rose-700' },
            { label: 'High', count: openSeverityCounts.High, barColor: 'bg-rose-500' },
            { label: 'Medium', count: openSeverityCounts.Medium, barColor: 'bg-amber-500' },
            { label: 'Low', count: openSeverityCounts.Low, barColor: 'bg-blue-400' },
          ]}
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
                  <th className="p-3 text-right">Unable to Verify</th>
                  <th className="p-3 text-right">Concerns</th>
                  <th className="p-3 text-right">Open Findings</th>
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
                    <td className="p-3 text-right">{s.unable}</td>
                    <td className="p-3 text-right">
                      {s.concerns > 0
                        ? <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border bg-amber-100 text-amber-800 border-amber-300">{s.concerns}</span>
                        : <span className="text-slate-300">0</span>}
                    </td>
                    <td className="p-3 text-right">
                      {s.openFindings > 0
                        ? <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border bg-rose-100 text-rose-800 border-rose-300">{s.openFindings}</span>
                        : <span className="text-slate-300">0</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {naStats.length > 0 && (
        <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-ercs-red" /> By National Activity
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b">
                <tr>
                  <th className="p-3">Code</th>
                  <th className="p-3">Activity</th>
                  <th className="p-3 text-right">Records</th>
                  <th className="p-3 text-right">Monitored</th>
                  <th className="p-3 text-right">Coverage</th>
                  <th className="p-3 text-right">Concerns</th>
                  <th className="p-3 text-right">Open Findings</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {naStats.map(s => (
                  <tr key={s.key} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-ercs-red whitespace-nowrap">{s.code}</td>
                    <td className="p-3 min-w-56 font-bold text-slate-800">{s.name}</td>
                    <td className="p-3 text-right">{s.records}</td>
                    <td className="p-3 text-right">{s.monitored}</td>
                    <td className="p-3 text-right font-bold">{s.coveragePct.toFixed(1)}%</td>
                    <td className="p-3 text-right">
                      {s.concerns > 0
                        ? <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border bg-amber-100 text-amber-800 border-amber-300">{s.concerns}</span>
                        : <span className="text-slate-300">0</span>}
                    </td>
                    <td className="p-3 text-right">
                      {s.openFindings > 0
                        ? <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border bg-rose-100 text-rose-800 border-rose-300">{s.openFindings}</span>
                        : <span className="text-slate-300">0</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {approvedRecords.length > 0 && (
        <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Approved Monitoring Findings &amp; Evidence ({approvedRecords.length})
            </span>
            <span className="text-[10px] font-normal text-slate-500 lowercase">
              Finalized records approved by PMER Head
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase border-b text-[10px]">
                <tr>
                  <th className="p-3">Activity</th>
                  <th className="p-3">Scope</th>
                  <th className="p-3">Period</th>
                  <th className="p-3">Verification Result</th>
                  <th className="p-3 text-right">Target Verif. %</th>
                  <th className="p-3 text-right">Budget Verif. %</th>
                  <th className="p-3">Evidence Document</th>
                  <th className="p-3">Finding / Recommendation</th>
                  <th className="p-3 text-center">Severity</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y text-[11px]">
                {approvedRecords.map(({ pe, r, na, scopeLabel }) => {
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

                  return (
                    <tr key={pe.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-800 whitespace-nowrap">
                        <span className="text-ercs-red mr-1.5">{na?.code || pe.activity_code || '—'}</span>
                        <div className="text-[10px] text-slate-600 font-normal max-w-[12rem] truncate" title={pe.activity_name}>{pe.activity_name}</div>
                      </td>
                      <td className="p-3 whitespace-nowrap text-slate-700">
                        <span className="font-semibold">{scopeLabel || '—'}</span>
                        <span className="text-[10px] text-slate-400 block">{pe.scope_type}</span>
                      </td>
                      <td className="p-3 font-semibold text-slate-800">{r.quarter_id || '—'}</td>
                      <td className="p-3">
                        {r.verification_result ? (
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            r.verification_result === 'Fully verified' ? 'bg-emerald-100 text-emerald-800' :
                            r.verification_result === 'Partially verified' ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {r.verification_result}
                          </span>
                        ) : <span className="text-slate-300">—</span>}
                      </td>
                      <td className="p-3 text-right font-black">
                        {verAchPct === null ? '—' : `${verAchPct.toFixed(1)}%`}
                      </td>
                      <td className="p-3 text-right font-black">
                        {repExp === 0 ? 'N/A' : verExpPct === null ? '—' : `${verExpPct.toFixed(1)}%`}
                      </td>
                      <td className="p-3">
                        {r.evidence_attachment_name ? (
                          <div className="flex items-center gap-1.5 text-[10px]">
                            <FileText className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                            {r.evidence_attachment_url ? (
                              <a
                                href={r.evidence_attachment_url}
                                download={r.evidence_attachment_name}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 hover:text-blue-800 font-bold underline truncate max-w-[8rem]"
                                title={`Download ${r.evidence_attachment_name}`}
                              >
                                {r.evidence_attachment_name}
                              </a>
                            ) : (
                              <span className="font-semibold text-slate-700 truncate max-w-[8rem]" title={r.evidence_attachment_name}>
                                {r.evidence_attachment_name}
                              </span>
                            )}
                          </div>
                        ) : r.evidence_checked ? (
                          <span className="text-[10px] text-slate-600 italic truncate max-w-[8rem] block" title={r.evidence_checked}>
                            {r.evidence_checked}
                          </span>
                        ) : <span className="text-slate-300">—</span>}
                      </td>
                      <td className="p-3 max-w-[14rem]">
                        {r.finding && <div className="font-medium text-slate-800 text-[11px] truncate" title={r.finding}>{r.finding}</div>}
                        {r.recommendation && <div className="text-[10px] text-slate-500 truncate" title={r.recommendation}>{r.recommendation}</div>}
                        {!r.finding && !r.recommendation && <span className="text-slate-300">—</span>}
                      </td>
                      <td className="p-3 text-center">
                        {r.severity ? (
                          <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold ${
                            r.severity === 'Critical' ? 'bg-rose-100 text-rose-800' :
                            r.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                            r.severity === 'Medium' ? 'bg-amber-100 text-amber-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {r.severity}
                          </span>
                        ) : <span className="text-slate-300">—</span>}
                      </td>
                      <td className="p-3 text-center">
                        {r.status ? (
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            r.status === 'Closed' ? 'bg-emerald-100 text-emerald-800' :
                            r.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {r.status}
                          </span>
                        ) : <span className="text-slate-300">—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {entries.length === 0 && (
        <div className="bg-white p-8 rounded-xl border text-center text-xs text-slate-500">
          No plan entries match this filter.
        </div>
      )}
    </div>
  );
};

const DashboardCard: React.FC<{
  icon: any;
  title: string;
  val: React.ReactNode;
  sub?: React.ReactNode;
  warn?: boolean;
  status?: 'green' | 'amber' | 'red';
}> = ({ icon: Icon, title, val, sub, warn, status }) => {
  const resolvedStatus = status ?? (warn ? 'red' : 'green');
  const borderClass = resolvedStatus === 'green' ? 'border-l-4 border-l-emerald-500' : resolvedStatus === 'amber' ? 'border-l-4 border-l-amber-500' : 'border-l-4 border-l-rose-500';
  const iconColor = resolvedStatus === 'green' ? 'text-emerald-500' : resolvedStatus === 'amber' ? 'text-amber-500' : 'text-rose-500';
  const valColor = resolvedStatus === 'red' ? 'text-rose-700' : 'text-slate-800';
  return (
    <div className={`bg-white p-4 rounded-xl border shadow-sm ${borderClass}`}>
      <div className="flex justify-between mb-2 text-xs font-bold text-slate-500">
        <span>{title}</span>
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </div>
      <div className={`text-2xl font-black ${valColor}`}>{val}</div>
      {sub && <div className="text-[10px] mt-1 text-slate-500">{sub}</div>}
    </div>
  );
};

const BreakdownCard: React.FC<{
  icon: any;
  title: string;
  total: number;
  rows: { label: string; count: number; barColor: string }[];
  emptyHint: string;
}> = ({ icon: Icon, title, total, rows, emptyHint }) => (
  <div className="bg-white p-4 rounded-xl border shadow-sm">
    <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-500">
      <span className="flex items-center gap-1.5"><Icon className="w-3.5 h-3.5" /> {title}</span>
      <span className="text-slate-400 font-semibold">{total} total</span>
    </div>
    {total === 0 ? (
      <div className="text-[10px] text-slate-400 py-2">{emptyHint}</div>
    ) : (
      <div className="space-y-2">
        {rows.filter(r => r.count > 0).map(r => (
          <div key={r.label}>
            <div className="flex justify-between text-[10px] font-semibold text-slate-600 mb-0.5">
              <span>{r.label}</span>
              <span>{r.count}</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className={`h-full rounded-full ${r.barColor}`} style={{ width: `${(r.count / total) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);