// src/pages/AdminSettingsPage.tsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Project } from '../types';
import { Settings, Plus, Globe, MapPin, FolderKanban, Ruler, Check } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const {
    currentRole,
    regions,
    zones,
    projects,
    nationalActivities,
    uomConfigs,
    addRegion,
    addZone,
    addProject,
    addEligibleScope,
    addUomConfig,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'regions' | 'projects' | 'uoms'>('regions');

  // Region & Zone Form State
  const [newRegionName, setNewRegionName] = useState('');
  const [newZoneRegionId, setNewZoneRegionId] = useState('');
  const [newZoneName, setNewZoneName] = useState('');

  // Project Form State
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectBudget, setProjectBudget] = useState('');
  const [projectDonor, setProjectDonor] = useState('');
  const [projectTarget, setProjectTarget] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [projectEndDate, setProjectEndDate] = useState('');
  const [contributesToNa, setContributesToNa] = useState(false);
  const [selectedNaId, setSelectedNaId] = useState('');

  // UOM Form State
  const [newUomName, setNewUomName] = useState('');
  const [newUomFactor, setNewUomFactor] = useState('');

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
      id: `region-${Date.now()}`,
      name: newRegionName.trim(),
    });
    setNewRegionName('');
  };

  const handleAddZone = () => {
    if (!newZoneName.trim() || !newZoneRegionId) return;
    addZone({
      id: `zone-${Date.now()}`,
      name: newZoneName.trim(),
      region_id: newZoneRegionId,
    });
    setNewZoneName('');
    setNewZoneRegionId('');
  };

  const handleAddProject = () => {
    if (!projectTitle.trim()) return;
    if (contributesToNa && !selectedNaId) return;

    const newProjId = `proj-${Date.now()}`;
    const parsedBudget = parseFloat(projectBudget);
    const newProj: Project = {
      id: newProjId,
      name: projectTitle.trim(),
      description: projectDescription.trim() || undefined,
      budget: Number.isFinite(parsedBudget) ? parsedBudget : undefined,
      donor: projectDonor.trim() || undefined,
      target: projectTarget.trim() || undefined,
      start_date: projectStartDate || undefined,
      end_date: projectEndDate || undefined,
    };

    addProject(newProj);
    if (contributesToNa && selectedNaId) {
      addEligibleScope(selectedNaId, 'Project', newProjId);
    }

    // Reset form
    setProjectTitle('');
    setProjectDescription('');
    setProjectBudget('');
    setProjectDonor('');
    setProjectTarget('');
    setProjectStartDate('');
    setProjectEndDate('');
    setContributesToNa(false);
    setSelectedNaId('');
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <Settings className="w-5 h-5 text-ercs-red" /> Admin Settings
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage master geographic structures, project entities, and unit of measure conversion configurations.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('regions')}
          className={`px-4 py-2 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-colors ${
            activeTab === 'regions'
              ? 'border-ercs-red text-ercs-red'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Globe className="w-4 h-4" /> Regions & Zones
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-colors ${
            activeTab === 'projects'
              ? 'border-ercs-red text-ercs-red'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <FolderKanban className="w-4 h-4" /> Projects
        </button>
        <button
          onClick={() => setActiveTab('uoms')}
          className={`px-4 py-2 text-xs font-bold flex items-center gap-1.5 border-b-2 transition-colors ${
            activeTab === 'uoms'
              ? 'border-ercs-red text-ercs-red'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Ruler className="w-4 h-4" /> UOM & Conversion Factors
        </button>
      </div>

      {/* 1. Regions & Zones */}
      {activeTab === 'regions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Add Region Card */}
            <div className="bg-white border rounded-xl shadow-sm p-4 space-y-4">
              <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-ercs-red" /> Add New Region
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-500">Region Name</label>
                <input
                  value={newRegionName}
                  onChange={e => setNewRegionName(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                  placeholder="e.g. Sidama Region"
                />
              </div>
              <div className="flex justify-end">
                <button
                  disabled={!newRegionName.trim()}
                  onClick={handleAddRegion}
                  className="bg-ercs-red text-white px-4 py-2 rounded-lg text-xs font-bold disabled:opacity-40"
                >
                  Add Region
                </button>
              </div>
            </div>

            {/* Add Zone Card */}
            <div className="bg-white border rounded-xl shadow-sm p-4 space-y-4">
              <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-ercs-red" /> Add New Zone
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-500">Parent Region</label>
                <select
                  value={newZoneRegionId}
                  onChange={e => setNewZoneRegionId(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <option value="">Select Region…</option>
                  {regions.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-500">Zone Name</label>
                <input
                  value={newZoneName}
                  onChange={e => setNewZoneName(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                  placeholder="e.g. Hawassa Zone"
                />
              </div>
              <div className="flex justify-end">
                <button
                  disabled={!newZoneName.trim() || !newZoneRegionId}
                  onClick={handleAddZone}
                  className="bg-ercs-red text-white px-4 py-2 rounded-lg text-xs font-bold disabled:opacity-40"
                >
                  Add Zone
                </button>
              </div>
            </div>
          </div>

          {/* Current Geographic Structure List */}
          <section className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-ercs-red" /> Current Regions & Assigned Zones ({regions.length} Regions)
            </div>
            <div className="divide-y">
              {regions.map(r => {
                const assignedZones = zones.filter(z => z.region_id === r.id);
                return (
                  <div key={r.id} className="p-4 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-slate-800 text-xs">
                      <Globe className="w-3.5 h-3.5 text-slate-400" />
                      <span>{r.name}</span>
                      <span className="text-[10px] font-normal text-slate-400">({assignedZones.length} Zones)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pl-5">
                      {assignedZones.map(z => (
                        <span key={z.id} className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-medium">
                          <MapPin className="w-2.5 h-2.5 text-slate-400" />
                          {z.name}
                        </span>
                      ))}
                      {assignedZones.length === 0 && (
                        <span className="text-[10px] text-slate-400 italic">No zones yet.</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* 2. Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          {/* Add Project Form */}
          <div className="bg-white border rounded-xl shadow-sm p-5 space-y-4">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b pb-3">
              <Plus className="w-4 h-4 text-ercs-red" /> Add New Project
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Project Title *</label>
                <input
                  value={projectTitle}
                  onChange={e => setProjectTitle(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                  placeholder="e.g. Emergency Food Security & Livelihoods"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Donor</label>
                <input
                  value={projectDonor}
                  onChange={e => setProjectDonor(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                  placeholder="e.g. Swiss Red Cross / ECHO"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Description</label>
                <textarea
                  value={projectDescription}
                  onChange={e => setProjectDescription(e.target.value)}
                  rows={2}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                  placeholder="How the project is executed, primary objectives, implementation modalities…"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Project Overall Budget (ETB)</label>
                <input
                  type="number"
                  min={0}
                  value={projectBudget}
                  onChange={e => setProjectBudget(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Overall Project Target / Reach Description</label>
                <input
                  value={projectTarget}
                  onChange={e => setProjectTarget(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                  placeholder="e.g. 50,000 households across drought-affected districts"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Start Date</label>
                <input
                  type="date"
                  value={projectStartDate}
                  onChange={e => setProjectStartDate(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">End Date</label>
                <input
                  type="date"
                  value={projectEndDate}
                  onChange={e => setProjectEndDate(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
            </div>

            {/* National Activity Link Toggle */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800">
                    Does this project contribute to a National Activity?
                  </div>
                  <div className="text-[10px] text-slate-500">
                    If Yes, choose a National Activity to immediately authorize this project to execute under it.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setContributesToNa(false)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                      !contributesToNa
                        ? 'bg-slate-700 text-white'
                        : 'bg-white border text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => setContributesToNa(true)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                      contributesToNa
                        ? 'bg-ercs-red text-white'
                        : 'bg-white border text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Yes
                  </button>
                </div>
              </div>

              {contributesToNa && (
                <div className="pt-2 border-t border-slate-200">
                  <label className="block text-[10px] font-bold text-slate-700 mb-1">
                    Select National Activity to Link *
                  </label>
                  <select
                    value={selectedNaId}
                    onChange={e => setSelectedNaId(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded p-2 bg-white focus:outline-none focus:ring-2 focus:ring-red-100"
                  >
                    <option value="">Select a National Activity…</option>
                    {nationalActivities.map(na => (
                      <option key={na.id} value={na.id}>
                        {na.code} — {na.description}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                disabled={!projectTitle.trim() || (contributesToNa && !selectedNaId)}
                onClick={handleAddProject}
                className="bg-ercs-red text-white px-5 py-2 rounded-lg text-xs font-bold disabled:opacity-40 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Save Project
              </button>
            </div>
          </div>

          {/* Existing Projects List */}
          <section className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <FolderKanban className="w-4 h-4 text-ercs-red" /> Projects Directory ({projects.length})
            </div>
            <div className="divide-y">
              {projects.map(p => (
                <div key={p.id} className="p-4 space-y-1.5 hover:bg-slate-50">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="font-bold text-slate-800 text-xs flex items-center gap-2">
                      <FolderKanban className="w-3.5 h-3.5 text-ercs-red shrink-0" />
                      <span>{p.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {p.donor && (
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">
                          Donor: {p.donor}
                        </span>
                      )}
                      {p.budget != null && (
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                          Budget: {p.budget.toLocaleString()} ETB
                        </span>
                      )}
                    </div>
                  </div>
                  {p.description && (
                    <div className="text-[11px] text-slate-600 pl-5">{p.description}</div>
                  )}
                  <div className="flex items-center gap-4 text-[10px] text-slate-400 pl-5 flex-wrap">
                    {p.target && <span>Target / Reach: <strong className="text-slate-600 font-semibold">{p.target}</strong></span>}
                    {(p.start_date || p.end_date) && (
                      <span>
                        Timeline: {p.start_date || '—'} to {p.end_date || '—'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <div className="p-6 text-center text-xs text-slate-400">No projects registered yet.</div>
              )}
            </div>
          </section>
        </div>
      )}

      {/* 3. UOM & Conversion Factors */}
      {activeTab === 'uoms' && (
        <div className="space-y-6">
          <section className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-slate-50 text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <Ruler className="w-4 h-4 text-ercs-red" /> Configured Units of Measure ({uomConfigs.length})
            </div>
            <table className="w-full text-xs">
              <thead className="bg-slate-50 border-b text-[10px] font-bold text-slate-500 uppercase">
                <tr>
                  <th className="p-3 text-left">Unit of Measure (UOM)</th>
                  <th className="p-3 text-right">Beneficiary Conversion Factor</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {uomConfigs.map(cfg => (
                  <tr key={cfg.uom} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-800">{cfg.uom}</td>
                    <td className="p-3 text-right font-semibold text-slate-600">
                      1 {cfg.uom} = {cfg.factor.toLocaleString()} {cfg.factor === 1 ? 'Beneficiary' : 'Beneficiaries'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {uomConfigs.length === 0 && (
              <div className="p-6 text-center text-xs text-slate-400">No UOM configurations found.</div>
            )}
          </section>

          <div className="bg-white border rounded-xl shadow-sm p-4 space-y-3">
            <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-ercs-red" /> Add New Unit of Measure
            </div>
            <div className="flex gap-3 items-end flex-wrap">
              <div className="flex-1 min-w-48">
                <label className="block text-[10px] font-bold text-slate-500 mb-1">
                  Unit Name (e.g. "Household", "Kit", "Patient")
                </label>
                <input
                  value={newUomName}
                  onChange={e => setNewUomName(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                  placeholder="e.g. Kit"
                />
              </div>
              <div className="w-48">
                <label className="block text-[10px] font-bold text-slate-500 mb-1">
                  Beneficiary Factor
                </label>
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={newUomFactor}
                  onChange={e => setNewUomFactor(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                  placeholder="e.g. 5"
                />
              </div>
              <button
                disabled={!newUomName.trim() || !newUomFactor || isNaN(parseFloat(newUomFactor))}
                onClick={handleAddUom}
                className="bg-ercs-red text-white px-5 py-2 rounded-lg text-xs font-bold disabled:opacity-40 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add UOM
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
