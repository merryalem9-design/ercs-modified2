// src/pages/StrategicKpiPage.tsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StrategicKpi } from '../types';
import { Target, Save } from 'lucide-react';

export const StrategicKpiPage: React.FC = () => {
  const { strategicPriorities, strategicObjectives, strategicKpis, currentRole } = useApp();
  const isMonitor = currentRole === 'PMER Officer';

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

      <div className="space-y-8">
        {strategicPriorities.map(sp => {
          const objectivesForPriority = strategicObjectives.filter(so => so.strategic_priority_id === sp.id);
          if (objectivesForPriority.length === 0) return null;

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
      recorded_by: recordedBy.trim(),
      date: date.trim(),
      note: note.trim() || undefined,
    });
    setPeriod('');
    setValue('');
    setRecordedBy('');
    setDate('');
    setNote('');
  };

  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm space-y-3">
      <div className="text-xs font-bold text-slate-800">{kpi.description}</div>
      {kpi.notes && <div className="text-[10px] text-slate-500">{kpi.notes}</div>}

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase">Baseline</div>
          <div className="text-xs font-semibold text-slate-800 mt-0.5">{kpi.baseline || '—'}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase">Target (2030)</div>
          <div className="text-xs font-semibold text-slate-800 mt-0.5">{kpi.target_2030 || '—'}</div>
        </div>

        <div className="col-span-2 rounded-lg bg-blue-50 border border-blue-100 px-3 py-2">
          <div className="text-[9px] font-black uppercase tracking-wide text-blue-700">Latest Progress</div>
          <div className="text-sm font-black text-blue-900">
            {latest ? `${latest.value} (${latest.period})` : '—'}
          </div>
        </div>

        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase">Frequency</div>
          <div className="text-xs font-semibold text-slate-800 mt-0.5">{kpi.frequency || '—'}</div>
        </div>
        <div>
          <div className="text-[10px] font-bold text-slate-500 uppercase">Means of Verification</div>
          <div className="text-xs font-semibold text-slate-800 mt-0.5">{kpi.means_of_verification || '—'}</div>
        </div>
      </div>

      <div>
        <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Progress History</div>
        {history.length === 0 ? (
          <div className="text-[10px] text-slate-400">No progress logged yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px]">
              <thead className="text-slate-500 font-bold uppercase border-b">
                <tr>
                  <th className="py-1 pr-2">Period</th>
                  <th className="py-1 pr-2">Value</th>
                  <th className="py-1 pr-2">Recorded By</th>
                  <th className="py-1 pr-2">Date</th>
                  <th className="py-1 pr-2">Note</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {history.map(h => (
                  <tr key={h.id}>
                    <td className="py-1 pr-2 font-semibold whitespace-nowrap">{h.period}</td>
                    <td className="py-1 pr-2">{h.value}</td>
                    <td className="py-1 pr-2">{h.recorded_by}</td>
                    <td className="py-1 pr-2 whitespace-nowrap">{h.date}</td>
                    <td className="py-1 pr-2 text-slate-500">{h.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isMonitor && (
        <div className="border-t pt-3 space-y-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Log Progress</div>
          <div className="grid grid-cols-2 gap-2">
            <input
              value={period}
              onChange={e => setPeriod(e.target.value)}
              placeholder="Period (e.g. FY2026 Annual)"
              className="text-[10px] p-1.5 border rounded bg-slate-50"
            />
            <input
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Value"
              className="text-[10px] p-1.5 border rounded bg-slate-50"
            />
            <input
              value={recordedBy}
              onChange={e => setRecordedBy(e.target.value)}
              placeholder="Recorded By"
              className="text-[10px] p-1.5 border rounded bg-slate-50"
            />
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="text-[10px] p-1.5 border rounded bg-slate-50"
            />
            <input
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Note (optional)"
              className="col-span-2 text-[10px] p-1.5 border rounded bg-slate-50"
            />
          </div>
          <button
            disabled={!canSubmit}
            onClick={handleSubmit}
            className="flex items-center gap-1.5 bg-ercs-red text-white px-3 py-1.5 rounded-lg text-[10px] font-bold disabled:opacity-40"
          >
            <Save className="w-3 h-3" /> Log Progress
          </button>
        </div>
      )}
    </div>
  );
};