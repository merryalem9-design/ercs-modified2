// src/pages/MonitoringDashboardPage.tsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { FilterBar } from '../components/common/FilterBar';
import { VerificationResult } from '../types';
import { ShieldCheck, AlertTriangle, CheckCircle2, Clock, Layers } from 'lucide-react';

export const MonitoringDashboardPage: React.FC = () => {
  const {
    nationalActivities,
    regions,
    projects,
    getFilteredPlanEntries,
    getMonitoringRecordForPlanEntry,
  } = useApp();

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

  // nationalActivities is read here to keep this page self-sufficient if a
  // future breakdown-by-activity view is added — currently unused beyond
  // that; kept out of scopeStats since the Excel's rollup table is scoped
  // to Project/Region only.
  void nationalActivities;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Monitoring Dashboard</h2>
        <p className="text-xs text-slate-500 mt-1">
          Coverage, verification results and open findings for the Monitoring Register, computed live off the
          current filter scope.
        </p>
      </div>

      <FilterBar hideQuarterFilter />

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

      {scopeStats.length === 0 && (
        <div className="bg-white p-8 rounded-xl border text-center text-xs text-slate-500">
          No plan entries match this filter.
        </div>
      )}
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