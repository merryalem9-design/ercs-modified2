import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Project } from '../types';
import { FolderPlus, Layers, CheckCircle2 } from 'lucide-react';

export const ProjectConfigurationPage: React.FC = () => {
  const { projects, addProject, nationalActivities, addEligibleScope } = useApp();

  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectBudget, setProjectBudget] = useState('');
  const [projectDonor, setProjectDonor] = useState('');
  const [projectTarget, setProjectTarget] = useState('');
  const [projectStartDate, setProjectStartDate] = useState('');
  const [projectEndDate, setProjectEndDate] = useState('');
  const [contributesToNa, setContributesToNa] = useState(false);
  const [selectedNaId, setSelectedNaId] = useState('');

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
          <FolderPlus className="w-5 h-5 text-ercs-red" /> Project Configuration
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Create and configure projects, define budget allocations, donors, timelines, and link to National Activities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Creation Form */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <FolderPlus className="w-4 h-4 text-ercs-red" /> Create New Project
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Configured by Project Coordinator — HQ. Newly created projects immediately appear across planning & execution scopes.
            </p>
          </div>

          <form onSubmit={handleAddProject} className="space-y-3.5">
            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={e => setProjectTitle(e.target.value)}
                placeholder="e.g. Community Resilience & Food Security"
                className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:border-ercs-red focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                Description
              </label>
              <textarea
                value={projectDescription}
                onChange={e => setProjectDescription(e.target.value)}
                placeholder="Brief summary of project objectives, geographic target areas, and deliverables..."
                rows={2}
                className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:border-ercs-red focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                  Budget (ETB)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={projectBudget}
                    onChange={e => setProjectBudget(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="any"
                    className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:border-ercs-red focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                  Donor / Partner
                </label>
                <input
                  type="text"
                  value={projectDonor}
                  onChange={e => setProjectDonor(e.target.value)}
                  placeholder="e.g. IFRC, ICRC, USAID"
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:border-ercs-red focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                Target Beneficiaries / Reach
              </label>
              <input
                type="text"
                value={projectTarget}
                onChange={e => setProjectTarget(e.target.value)}
                placeholder="e.g. 25,000 households"
                className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:border-ercs-red focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={projectStartDate}
                  onChange={e => setProjectStartDate(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:border-ercs-red focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={projectEndDate}
                  onChange={e => setProjectEndDate(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:border-ercs-red focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={contributesToNa}
                  onChange={e => setContributesToNa(e.target.checked)}
                  className="rounded text-ercs-red focus:ring-ercs-red"
                />
                <span className="text-xs font-bold text-slate-700">Link directly to National Activity</span>
              </label>
              {contributesToNa && (
                <div className="pt-1">
                  <select
                    value={selectedNaId}
                    onChange={e => setSelectedNaId(e.target.value)}
                    className="w-full text-xs border border-slate-200 rounded p-2 bg-white"
                    required={contributesToNa}
                  >
                    <option value="">Select National Activity…</option>
                    {nationalActivities.filter(na => na.eligible_project_ids.length > 0).map(na => (
                      <option key={na.id} value={na.id}>
                        {na.code} — {na.description}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!projectTitle.trim() || (contributesToNa && !selectedNaId)}
              className="w-full bg-ercs-red text-white py-2.5 rounded-lg text-xs font-bold hover:bg-red-700 disabled:opacity-40 transition-colors shadow-sm cursor-pointer"
            >
              Create Project
            </button>
          </form>
        </div>

        {/* Existing Projects List */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-600" /> Configured Projects ({projects.length})
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Active projects accessible in planning forms and execution allocations.
              </p>
            </div>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {projects.map(p => (
              <div
                key={p.id}
                className="p-4 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors bg-white shadow-xs space-y-2.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{p.name}</h4>
                    {p.description && (
                      <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">{p.description}</p>
                    )}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full shrink-0 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Active
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Budget</span>
                    <span className="font-semibold text-slate-700">
                      {p.budget ? `${p.budget.toLocaleString()} ETB` : '—'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Donor</span>
                    <span className="font-semibold text-slate-700">{p.donor || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Target</span>
                    <span className="font-semibold text-slate-700">{p.target || '—'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Timeline</span>
                    <span className="font-semibold text-slate-700">
                      {p.start_date || p.end_date
                        ? `${p.start_date || '—'} to ${p.end_date || '—'}`
                        : '—'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
