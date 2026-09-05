// src/pages/StrategicKpiPage.tsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StrategicKpi } from '../types';
import { Target, Save, FileCheck, Info } from 'lucide-react';

export const StrategicKpiPage: React.FC = () => {
  const { strategicPriorities, strategicObjectives, strategicKpis, currentRole } = useApp();
  const isMonitor = currentRole === 'PMER Officer';

  const totalKpis = strategicKpis.length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <Target className="w-5 h-5 text-ercs-red" /> Strategic KPI Tracking
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Outcome-level KPIs from the ERCS Five-Year Strategic Plan (2025–2030), organized by Strategic Priority and
          Strategic Objective. These are tracked independently from the Monitoring Register and Plan Entries — there
          is no per-activity mapping to individual KPIs. {isMonitor
            ? 'Log progress below as new figures become available.'
            : 'View only for this role.'}
        </p>
      </div>

      {totalKpis === 0 ? (
        <div className="bg-white rounded-xl border p-8 text-center space-y-2">
          <Info className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">No Strategic KPIs Configured</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            There are currently no strategic KPI definitions loaded. Five-year strategic indicators will appear here once defined.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {strategicPriorities.map(sp => {
            const objectivesForPriority = strategicObjectives.filter(so => so.strategic_priority_id === sp.id);
            if (objectivesForPriority.length === 0) return null;

            const kpisInPriority = strategicKpis.filter(k => k.strategic_priority_id === sp.id);
            if (kpisInPriority.length === 0) return null;

            return (
              <section key={sp.id} className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="bg-ercs-red text-white text-[10px] font-extrabold px-2 py-0.5 rounded">{sp.code}</span>
                  <h3 className="text-sm font-black text-slate-800">{sp.name}</h3>
                </div>

                <div className="space-y-5">
                  {objectivesForPriority.map(so => {
                    const kpisForObjective = strategicKpis.filter(k => k.strategic_objective_id === so.id);
                    if (kpisForObjective.length === 0) return null;

                    return (
                      <div key={so.id} className="space-y-3">
                        <div className="text-xs font-bold text-slate-600">
                          <span className="text-ercs-red mr-1.5">{so.code}</span>{so.name}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          {kpisForObjective.map(kpi => (
                            <KpiCard key={kpi.id} kpi={kpi} isMonitor={isMonitor} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
};

const KpiCard: React.FC<{ kpi: StrategicKpi; isMonitor: boolean }> = ({ kpi, isMonitor }) => {
  const { addKpiProgressEntry, getLatestKpiProgress, kpiProgressEntries } = useApp();

  const latest = getLatestKpiProgress(kpi.id);
  const history = kpiProgressEntries
    .filter(e => e.strategic_kpi_id === kpi.id)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const [period, setPeriod] = useState('');
  const [value, setValue] = useState('');
  const [meansOfVerification, setMeansOfVerification] = useState('');
  const [recordedBy, setRecordedBy] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');

  const canSubmit = !!period.trim() && !!value.trim() && !!recordedBy.trim() && !!date.trim();

  const handleSubmit = () => {
    if (!canSubmit) return;
    addKpiProgressEntry({
      strategic_kpi_id: kpi.id,
      period: period.trim(),
      value: value.trim(),
      means_of_verification: meansOfVerification.trim() || undefined,
      recorded_by: recordedBy.trim(),
      date: date.trim(),
      note: note.trim() || undefined,
    });
    setPeriod('');
    setValue('');
    setMeansOfVerification('');
    setRecordedBy('');
    setDate('');
    setNote('');
  };

  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm space-y-4">
      <div>
        <div className="text-xs font-bold text-slate-900 leading-snug">{kpi.kpi || kpi.description}</div>
        {kpi.description && kpi.kpi && kpi.description !== kpi.kpi && (
          <div className="text-[11px] text-slate-600 mt-1 leading-relaxed">{kpi.description}</div>
        )}
        {kpi.notes && <div className="text-[10px] text-slate-400 mt-1">{kpi.notes}</div>}
      </div>

      <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
        <div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Baseline (2025)</div>
          <div className="text-xs font-bold text-slate-800 mt-0.5">{kpi.baseline || '—'}</div>
        </div>
        <div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Target (2030)</div>
          <div className="text-xs font-bold text-slate-800 mt-0.5">{kpi.target_2030 || '—'}</div>
        </div>
        <div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Means of Verification</div>
          <div className="text-xs font-semibold text-slate-700 mt-0.5">{kpi.means_of_verification || '—'}</div>
        </div>
        <div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Frequency</div>
          <div className="text-xs font-semibold text-slate-700 mt-0.5">{kpi.frequency || '—'}</div>
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 border border-blue-100 px-3.5 py-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-black uppercase tracking-wider text-blue-700">Latest Progress</span>
          {latest && <span className="text-[9px] text-blue-500">{latest.date}</span>}
        </div>
        <div className="text-sm font-black text-blue-900 mt-0.5">
          {latest ? `${latest.value} (${latest.period})` : 'No progress logged yet'}
        </div>
        {latest && (
          <div className="text-[10px] text-blue-700/80 mt-0.5 flex flex-wrap gap-x-2">
            <span>By: {latest.recorded_by}</span>
            {latest.means_of_verification && <span>• Source: {latest.means_of_verification}</span>}
            {latest.note && <span>• &ldquo;{latest.note}&rdquo;</span>}
          </div>
        )}
      </div>

      <div>
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
          <FileCheck className="w-3.5 h-3.5 text-slate-400" /> Progress History ({history.length})
        </div>
        {history.length === 0 ? (
          <div className="text-[10px] text-slate-400 italic">No progress entries logged yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px] border-collapse">
              <thead className="text-slate-500 font-bold uppercase border-b bg-slate-50">
                <tr>
                  <th className="py-1 px-2 whitespace-nowrap">Period</th>
                  <th className="py-1 px-2 whitespace-nowrap">Value</th>
                  <th className="py-1 px-2 whitespace-nowrap">Means of Verification</th>
                  <th className="py-1 px-2 whitespace-nowrap">Recorded By</th>
                  <th className="py-1 px-2 whitespace-nowrap">Date</th>
                  <th className="py-1 px-2">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {history.map(h => (
                  <tr key={h.id} className="hover:bg-slate-50">
                    <td className="py-1 px-2 font-semibold whitespace-nowrap text-slate-800">{h.period}</td>
                    <td className="py-1 px-2 font-bold text-blue-700 whitespace-nowrap">{h.value}</td>
                    <td className="py-1 px-2 text-slate-600 whitespace-nowrap">{h.means_of_verification || '—'}</td>
                    <td className="py-1 px-2 text-slate-700 whitespace-nowrap">{h.recorded_by}</td>
                    <td className="py-1 px-2 text-slate-500 whitespace-nowrap">{h.date}</td>
                    <td className="py-1 px-2 text-slate-500">{h.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isMonitor && (
        <div className="border-t pt-3 space-y-2">
          <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">Log Progress (PMER Officer)</div>
          <div className="grid grid-cols-2 gap-2">
            <input
              value={period}
              onChange={e => setPeriod(e.target.value)}
              placeholder="Period (e.g. FY2026 Annual, Mid-Term 2027)"
              className="text-[10px] p-1.5 border rounded bg-white"
            />
            <input
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Value (e.g. 52% or 200,000 HH)"
              className="text-[10px] p-1.5 border rounded bg-white"
            />
            <input
              value={meansOfVerification}
              onChange={e => setMeansOfVerification(e.target.value)}
              placeholder={`Means of Verification (default: ${kpi.means_of_verification || 'Report'})`}
              className="text-[10px] p-1.5 border rounded bg-white"
            />
            <input
              value={recordedBy}
              onChange={e => setRecordedBy(e.target.value)}
              placeholder="Recorded By (Staff Name)"
              className="text-[10px] p-1.5 border rounded bg-white"
            />
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="text-[10px] p-1.5 border rounded bg-white"
            />
            <input
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Note / Qualitative observations (optional)"
              className="text-[10px] p-1.5 border rounded bg-white"
            />
          </div>
          <button
            disabled={!canSubmit}
            onClick={handleSubmit}
            className="flex items-center gap-1.5 bg-ercs-red text-white px-3.5 py-1.5 rounded-lg text-[10px] font-bold disabled:opacity-40 hover:bg-red-700 transition shadow-sm"
          >
            <Save className="w-3 h-3" /> Log Progress
          </button>
        </div>
      )}
    </div>
  );
};