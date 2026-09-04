// src/pages/AdminSettingsPage.tsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StatusThresholdBand, QuarterId } from '../types';
import { Settings, Plus, Globe, MapPin, Ruler, Calendar, Sliders, Info, Check, Trash2 } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const {
    currentRole,
    regions,
    zones,
    uomConfigs,
    addRegion,
    addZone,
    addUomConfig,
    statusThresholds,
    saveStatusThresholds,
    quarterPeriodConfigs,
    updateQuarterPeriodConfig,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'regions' | 'periods' | 'thresholds' | 'uoms'>('regions');

  // Region & Zone Form State
  const [newRegionName, setNewRegionName] = useState('');
  const [newZoneRegionId, setNewZoneRegionId] = useState('');
  const [newZoneName, setNewZoneName] = useState('');

  // UOM Form State
  const [newUomName, setNewUomName] = useState('');
  const [newUomFactor, setNewUomFactor] = useState('');

  // Thresholds editable state
  const [bands, setBands] = useState<StatusThresholdBand[]>(statusThresholds);
  const [previewValue, setPreviewValue] = useState<number>(85);

  // Periods editable state
  const [periods, setPeriods] = useState(quarterPeriodConfigs);

  // Sync state if context changes
  React.useEffect(() => {
    setBands(statusThresholds);
  }, [statusThresholds]);

  React.useEffect(() => {
    setPeriods(quarterPeriodConfigs);
  }, [quarterPeriodConfigs]);

  if (currentRole !== 'System Admin') {
    return (
      <div className="p-8 text-center text-xs text-slate-500">
        Access restricted to System Admin.
      </div>
    );
  }

  const handleAddRegion = () => {
    if (!newRegionName.trim()) return;
    addRegion({
      id: `reg-${Date.now()}`,
      name: newRegionName.trim(),
    });
    setNewRegionName('');
  };

  const handleAddZone = () => {
    if (!newZoneName.trim() || !newZoneRegionId) return;
    addZone({
      id: `zn-${Date.now()}`,
      name: newZoneName.trim(),
      region_id: newZoneRegionId,
    });
    setNewZoneName('');
    setNewZoneRegionId('');
  };

  const handleAddUom = () => {
    if (!newUomName.trim() || !newUomFactor) return;
    const factorNum = parseFloat(newUomFactor);
    if (isNaN(factorNum)) return;
    addUomConfig({
      uom: newUomName.trim(),
      factor: factorNum,
    });
    setNewUomName('');
    setNewUomFactor('');
  };

  // Threshold helpers
  const handleAddBand = () => {
    const newBand: StatusThresholdBand = {
      id: `st-${Date.now()}`,
      label: 'New Band',
      lower_bound: 0,
      requires_narrative: false,
    };
    setBands(prev => [...prev, newBand]);
  };

  const handleRemoveBand = (id: string) => {
    setBands(prev => prev.filter(b => b.id !== id));
  };

  const handleUpdateBand = (id: string, updates: Partial<StatusThresholdBand>) => {
    setBands(prev => prev.map(b => (b.id === id ? { ...b, ...updates } : b)));
  };

  const handleSaveThresholds = () => {
    // Sort by lower bound
    const sorted = [...bands].sort((a, b) => a.lower_bound - b.lower_bound);
    saveStatusThresholds(sorted);
  };

  // Evaluation for live preview
  const evaluateHigherIsBetter = (pct: number): string => {
    const sorted = [...bands].sort((a, b) => b.lower_bound - a.lower_bound);
    for (const b of sorted) {
      if (pct >= b.lower_bound) return b.label;
    }
    return sorted[sorted.length - 1]?.label || 'Off track';
  };

  const evaluateLowerIsBetter = (pct: number): string => {
    // For lower is better: overshooting (e.g. 130%) is bad, lower (e.g. 70%) is exceeding
    // Effective achievement = 200 - pct (clamped >= 0)
    const effectivePct = Math.max(0, 200 - pct);
    return evaluateHigherIsBetter(effectivePct);
  };

  const handleSavePeriods = () => {
    periods.forEach(p => updateQuarterPeriodConfig(p.id, p.date_range));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <Settings className="w-5 h-5 text-ercs-red" /> Admin Settings
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage master geographic structures, reporting periods, status thresholds, and unit of measure conversion configurations.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('regions')}
          className={`px-4 py-2 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'regions'
              ? 'border-ercs-red text-ercs-red'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Globe className="w-4 h-4" /> Regions & Zones
        </button>
        <button
          onClick={() => setActiveTab('periods')}
          className={`px-4 py-2 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'periods'
              ? 'border-ercs-red text-ercs-red'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Calendar className="w-4 h-4" /> Periods Configuration
        </button>
        <button
          onClick={() => setActiveTab('thresholds')}
          className={`px-4 py-2 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'thresholds'
              ? 'border-ercs-red text-ercs-red'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Sliders className="w-4 h-4" /> Status Thresholds
        </button>
        <button
          onClick={() => setActiveTab('uoms')}
          className={`px-4 py-2 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-colors cursor-pointer ${
            activeTab === 'uoms'
              ? 'border-ercs-red text-ercs-red'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Ruler className="w-4 h-4" /> Units of Measure
        </button>
      </div>

      {/* TAB 1: REGIONS & ZONES */}
      {activeTab === 'regions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add Region */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Globe className="w-4 h-4 text-ercs-red" /> Add New Region
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Region Name
                </label>
                <input
                  type="text"
                  value={newRegionName}
                  onChange={e => setNewRegionName(e.target.value)}
                  placeholder="e.g. Gambella Region"
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:outline-none"
                />
              </div>
              <button
                onClick={handleAddRegion}
                disabled={!newRegionName.trim()}
                className="bg-ercs-red text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-red-700 disabled:opacity-40 transition-colors cursor-pointer"
              >
                Add Region
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 mb-2">Existing Regions ({regions.length})</h4>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                {regions.map(r => (
                  <div key={r.id} className="text-xs p-2 bg-slate-50 rounded border border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-slate-700">{r.name}</span>
                    <span className="text-[10px] text-slate-400">
                      {zones.filter(z => z.region_id === r.id).length} zones
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Add Zone */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-ercs-red" /> Add New Zone
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Parent Region
                </label>
                <select
                  value={newZoneRegionId}
                  onChange={e => setNewZoneRegionId(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:outline-none"
                >
                  <option value="">Select Region…</option>
                  {regions.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                  Zone Name
                </label>
                <input
                  type="text"
                  value={newZoneName}
                  onChange={e => setNewZoneName(e.target.value)}
                  placeholder="e.g. West Shewa Zone"
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:outline-none"
                />
              </div>
              <button
                onClick={handleAddZone}
                disabled={!newZoneName.trim() || !newZoneRegionId}
                className="bg-ercs-red text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-red-700 disabled:opacity-40 transition-colors cursor-pointer"
              >
                Add Zone
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 mb-2">Existing Zones ({zones.length})</h4>
              <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                {zones.map(z => {
                  const reg = regions.find(r => r.id === z.region_id);
                  return (
                    <div key={z.id} className="text-xs p-2 bg-slate-50 rounded border border-slate-100 flex items-center justify-between">
                      <span className="font-semibold text-slate-700">{z.name}</span>
                      <span className="text-[10px] text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {reg?.name || 'Unknown'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PERIODS CONFIGURATION */}
      {activeTab === 'periods' && (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm max-w-3xl space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-ercs-red" /> Quarterly Periods Configuration
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Customize the active month ranges for standard planning & reporting quarters (e.g. Ethiopian fiscal year Q1 = Jul–Sep).
            </p>
          </div>

          <div className="space-y-3">
            {periods.map(period => (
              <div key={period.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="w-16">
                  <span className="text-xs font-bold text-slate-800 px-2.5 py-1 bg-white border border-slate-200 rounded">
                    {period.label}
                  </span>
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                    Month Range Description
                  </label>
                  <input
                    type="text"
                    value={period.date_range}
                    onChange={e => {
                      const val = e.target.value;
                      setPeriods(prev => prev.map(p => p.id === period.id ? { ...p, date_range: val } : p));
                    }}
                    placeholder="e.g. Jul – Sep"
                    className="w-full text-xs border border-slate-200 rounded p-2 bg-white focus:outline-none focus:border-ercs-red font-medium text-slate-700"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSavePeriods}
              className="bg-ercs-red text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-red-700 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" /> Save Periods
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: STATUS THRESHOLDS */}
      {activeTab === 'thresholds' && (
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-ercs-red" /> Performance Status Thresholds
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Configure classification bands and requirements for indicator achievement ratings.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddBand}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add band
                </button>
                <button
                  onClick={handleSaveThresholds}
                  className="bg-ercs-red text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-red-700 transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" /> Save thresholds
                </button>
              </div>
            </div>

            {/* Threshold Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase">
                  <tr>
                    <th className="p-3">Label</th>
                    <th className="p-3 w-40">Lower bound (%)</th>
                    <th className="p-3 w-48 text-center">Requires narrative</th>
                    <th className="p-3 w-16 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bands.map(band => (
                    <tr key={band.id} className="hover:bg-slate-50/50">
                      <td className="p-2.5">
                        <input
                          type="text"
                          value={band.label}
                          onChange={e => handleUpdateBand(band.id, { label: e.target.value })}
                          className="w-full text-xs border border-slate-200 rounded p-1.5 bg-white focus:outline-none focus:border-ercs-red font-medium text-slate-800"
                        />
                      </td>
                      <td className="p-2.5">
                        <input
                          type="number"
                          value={band.lower_bound}
                          onChange={e => handleUpdateBand(band.id, { lower_bound: parseFloat(e.target.value) || 0 })}
                          step="1"
                          min="0"
                          max="500"
                          className="w-full text-xs border border-slate-200 rounded p-1.5 bg-white focus:outline-none focus:border-ercs-red font-medium text-slate-800"
                        />
                      </td>
                      <td className="p-2.5 text-center">
                        <input
                          type="checkbox"
                          checked={band.requires_narrative}
                          onChange={e => handleUpdateBand(band.id, { requires_narrative: e.target.checked })}
                          className="rounded text-ercs-red focus:ring-ercs-red cursor-pointer"
                        />
                      </td>
                      <td className="p-2.5 text-center">
                        <button
                          onClick={() => handleRemoveBand(band.id)}
                          className="text-slate-400 hover:text-red-500 p-1 rounded cursor-pointer"
                          title="Delete band"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {bands.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-xs text-slate-400">
                        No threshold bands configured. Click "Add band" above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Explanatory Note */}
            <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-2.5 text-blue-800 text-xs leading-relaxed">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Presentation rules only:</span> bands change how a result reads, never the value itself. They are compared against the indicator's improvement direction, so a lower-is-better indicator that overshoots reads as off track rather than as exceeding.
              </div>
            </div>

            {/* Live Preview Control */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Live Preview Control</span>
                <span className="text-xs text-slate-500 font-medium">Test band classifications</span>
              </div>

              <div className="flex items-center gap-4">
                <label className="text-xs font-bold text-slate-600 shrink-0">
                  Preview at [{previewValue}]% of target:
                </label>
                <input
                  type="range"
                  min="0"
                  max="150"
                  step="5"
                  value={previewValue}
                  onChange={e => setPreviewValue(parseInt(e.target.value, 10))}
                  className="flex-1 accent-ercs-red cursor-pointer"
                />
                <input
                  type="number"
                  value={previewValue}
                  onChange={e => setPreviewValue(parseInt(e.target.value, 10) || 0)}
                  className="w-16 text-xs border border-slate-300 rounded p-1 text-center font-bold bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Higher is better direction</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-bold text-slate-800">{previewValue}%</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {evaluateHigherIsBetter(previewValue)}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-white border border-slate-200 rounded-lg">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Lower is better direction</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-bold text-slate-800">{previewValue}%</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {evaluateLowerIsBetter(previewValue)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: UOMS */}
      {activeTab === 'uoms' && (
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm max-w-2xl space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <Ruler className="w-4 h-4 text-ercs-red" /> Unit of Measure & Beneficiary Factors
          </h3>
          <p className="text-[11px] text-slate-500">
            Define conversion factors to calculate estimated beneficiaries from physical output targets.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                UOM Label
              </label>
              <input
                type="text"
                value={newUomName}
                onChange={e => setNewUomName(e.target.value)}
                placeholder="e.g. # of schools"
                className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Beneficiary Factor
              </label>
              <input
                type="number"
                value={newUomFactor}
                onChange={e => setNewUomFactor(e.target.value)}
                placeholder="e.g. 500"
                className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleAddUom}
            disabled={!newUomName.trim() || !newUomFactor}
            className="bg-ercs-red text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-red-700 disabled:opacity-40 transition-colors cursor-pointer"
          >
            Add UOM Configuration
          </button>

          <div className="pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 mb-2">Configured Factors ({uomConfigs.length})</h4>
            <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
              {uomConfigs.map(u => (
                <div key={u.uom} className="text-xs p-2 bg-slate-50 rounded border border-slate-100 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">{u.uom}</span>
                  <span className="text-[10px] text-slate-500 font-mono bg-white px-2 py-0.5 rounded border border-slate-200">
                    × {u.factor} beneficiaries
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
