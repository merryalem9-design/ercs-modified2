// src/components/plan/PlanEntryWizardModal.tsx
import React, { useRef, useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { NumberInput } from '../common/NumberInput';
import { PlanEntry, ScopeType, Project, NonProgrammaticDepartment } from '../../types';
import { ArrowLeft, Plus, Save, X } from 'lucide-react';
import { sumTarget, sumBudget } from '../../utils/calculations';

export interface PeWizardFormState {
  id?: string;
  strategicPriorityId: string;
  national_activity_id: string;
  non_programmatic_activity_id?: string;
  scope_type: ScopeType;
  region_id: string;
  project_id: string;
  annual_target: string;
  annual_budget: string;
  activity_code?: string;
  activity_name: string;
  activity_description: string;
  is_contributing?: boolean;
  uom?: string;
  lockScope?: boolean;
  target_female?: string;
  target_male?: string;
  target_youth?: string;
  region_activity_link_id?: string;
}

export const StepPill: React.FC<{ num: number; label: string; active: boolean; done: boolean }> = ({ num, label, active, done }) => (
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] font-bold ${active ? 'bg-red-50 text-ercs-red' : done ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-400'}`}>
    <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${active ? 'bg-ercs-red text-white' : done ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-white'}`}>{num}</span>
    {label}
  </div>
);

export const LabeledInput: React.FC<{ label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }> = ({ label, value, onChange, type = 'text', placeholder }) => (
  <label className="block">
    <span className="block text-[10px] font-bold text-slate-500 mb-1">{label}</span>
    <input type={type} min={type === 'number' ? 0 : undefined} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100" />
  </label>
);

export const ModalShell: React.FC<{ title: string; onClose: () => void; children: React.ReactNode }> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b shrink-0">
        <button onClick={onClose} className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-ercs-red shrink-0"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>
        <h3 className="text-sm font-black text-slate-800 text-center flex-1 truncate">{title}</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 shrink-0" aria-label="Close"><X className="w-4 h-4" /></button>
      </div>
      <div className="p-5 overflow-y-auto">{children}</div>
    </div>
  </div>
);

export const PlanEntryWizardModal: React.FC<{
  initial: PeWizardFormState;
  startStep: 1 | 2;
  onClose: () => void;
  onSaved: () => void;
}> = ({ initial, startStep, onClose, onSaved }) => {
  const { nationalActivities, regions, zones, projects, addProject, planEntries, addPlanEntry, updatePlanEntry, currentRole, regionActivityLinks, addRegionActivityLink, uomConfigs, nonProgrammaticActivities } = useApp();
  const [step, setStep] = useState<1 | 2>(startStep);
  const [form, setForm] = useState<PeWizardFormState>(() => {
    // Check if initial has seeded baseline to prefill
    const init = { ...initial };
    if (!init.id && init.scope_type === 'Project' && init.national_activity_id && init.project_id) {
      const na = nationalActivities.find(n => n.id === init.national_activity_id);
      const seeded = na?.project_targets?.[init.project_id];
      if (seeded && (seeded.target > 0 || seeded.budget > 0)) {
        if (!init.annual_target || init.annual_target === '0') init.annual_target = String(seeded.target);
        if (!init.annual_budget || init.annual_budget === '0') init.annual_budget = String(seeded.budget);
      }
      if (!init.activity_name && na) init.activity_name = na.description;
      if (!init.activity_description && na) init.activity_description = na.activity_description || na.description;
    }
    return init;
  });

  const [isContributing, setIsContributing] = useState(form.is_contributing !== false);
  const [addingProject, setAddingProject] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const savingRef = useRef(false);

  const isEditing = !!form.id;
  const isProjectScope = form.scope_type === 'Project';
  const isBranchHead = currentRole.startsWith('Branch Head — ');
  const isZoneCoordinator = currentRole.endsWith(' coordinators');
  const currentZone = isZoneCoordinator ? zones.find(z => `${z.name} coordinators` === currentRole) : undefined;

  // Auto pre-fill annual_target and annual_budget from seeded baseline when activity/project selected
  useEffect(() => {
    if (isEditing || !isContributing || form.scope_type !== 'Project') return;
    if (form.national_activity_id && form.project_id) {
      const selectedNa = nationalActivities.find(na => na.id === form.national_activity_id);
      const seeded = selectedNa?.project_targets?.[form.project_id];
      if (seeded && (seeded.target > 0 || seeded.budget > 0)) {
        setForm(f => {
          // Only update if not explicitly entered or starting fresh
          const needsTarget = !f.annual_target || f.annual_target === '0';
          const needsBudget = !f.annual_budget || f.annual_budget === '0';
          if (needsTarget || needsBudget) {
            return {
              ...f,
              annual_target: needsTarget ? String(seeded.target) : f.annual_target,
              annual_budget: needsBudget ? String(seeded.budget) : f.annual_budget,
              activity_name: f.activity_name || selectedNa?.description || '',
              activity_code: selectedNa?.code || '',
            };
          }
          return f;
        });
      }
    }
  }, [form.national_activity_id, form.project_id, isEditing, isContributing, nationalActivities]);

  // ---------------- NON-PROGRAMMATIC SCOPE: Department Head ----------------
  if (form.scope_type === 'NonProgrammatic') {
    const isDeptHead = currentRole.startsWith('Department Head — ');
    const userDept = isDeptHead ? (currentRole.slice('Department Head — '.length) as NonProgrammaticDepartment) : undefined;
    const deptActivities = userDept
      ? nonProgrammaticActivities.filter(a => a.department === userDept)
      : nonProgrammaticActivities;
    const selectedNpa = nonProgrammaticActivities.find(a => a.id === form.non_programmatic_activity_id);
    const isDuplicate = !isEditing && !!selectedNpa && planEntries.some(
      pe => pe.scope_type === 'NonProgrammatic' && pe.non_programmatic_activity_id === selectedNpa.id
    );
    const canContinue = !!form.non_programmatic_activity_id && !isDuplicate;

    const thisTarget = selectedNpa?.is_admin_budget_line ? 0 : (Number(form.annual_target) || 0);
    const thisBudget = Number(form.annual_budget) || 0;
    const numbersValid = thisBudget >= 0 && (selectedNpa?.is_admin_budget_line || thisTarget >= 0);
    const canSave = canContinue && numbersValid && (selectedNpa?.is_admin_budget_line || thisTarget > 0 || thisBudget > 0);

    const handleSaveDept = () => {
      if (!selectedNpa || !canSave || savingRef.current) return;
      savingRef.current = true;
      const pe: PlanEntry = {
        id: form.id || `pe-dept-${Date.now()}`,
        scope_type: 'NonProgrammatic',
        non_programmatic_activity_id: selectedNpa.id,
        activity_code: form.activity_code || '',
        activity_name: selectedNpa.name,
        activity_description: selectedNpa.name,
        annual_target: thisTarget,
        annual_budget: thisBudget,
        approval_status: 'Approved',
        is_contributing: false,
        uom: selectedNpa.uom,
      };
      if (isEditing) updatePlanEntry(pe); else addPlanEntry(pe);
      onSaved();
    };

    return (
      <ModalShell title={isEditing ? 'Edit Department Plan Entry' : 'Add Department Plan Entry'} onClose={onClose}>
        <div className="flex items-center gap-2 mb-4">
          <StepPill num={1} label="Select Activity" active={step === 1} done={step > 1} />
          <div className="flex-1 h-px bg-slate-200" />
          <StepPill num={2} label="Plan Details" active={step === 2} done={false} />
        </div>
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <span className="block text-[10px] font-bold text-slate-500 mb-1">Department Activity / Budget Line</span>
              <select
                value={form.non_programmatic_activity_id || ''}
                onChange={e => {
                  const actId = e.target.value;
                  const act = nonProgrammaticActivities.find(a => a.id === actId);
                  setForm(f => ({
                    ...f,
                    non_programmatic_activity_id: actId,
                    activity_code: '',
                    activity_name: act?.name || '',
                    activity_description: act?.name || '',
                    uom: act?.uom || '',
                    annual_target: act?.is_admin_budget_line ? '0' : f.annual_target,
                  }));
                }}
                disabled={isEditing}
                className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 disabled:opacity-60"
              >
                <option value="">Select department activity…</option>
                {deptActivities.map(a => (
                  <option key={a.id} value={a.id}>
                    {a.name} ({a.is_admin_budget_line ? 'Admin Budget Line' : (a.uom ? `Target: ${a.uom}` : 'Direct Target')})
                  </option>
                ))}
              </select>
              {isDuplicate && (
                <div className="text-[10px] text-rose-700 mt-1 font-semibold">
                  A plan entry for this activity already exists in your department.
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button
                disabled={!canContinue}
                onClick={() => setStep(2)}
                className="bg-ercs-red text-white px-4 py-2 rounded-lg text-xs font-bold disabled:opacity-40"
              >
                Continue
              </button>
            </div>
          </div>
        )}
        {step === 2 && selectedNpa && (
          <div className="space-y-4">
            <div className="bg-slate-50 border rounded-lg p-3">
              <div className="text-[10px] uppercase font-extrabold text-slate-400">Department</div>
              <div className="text-xs font-bold text-slate-700 mt-0.5">{selectedNpa.department}</div>
              <div className="text-[10px] uppercase font-extrabold text-slate-400 mt-2">Activity Name (read-only)</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">{selectedNpa.name}</div>
              <div className="text-[10px] uppercase font-extrabold text-slate-400 mt-2">Baseline Budget</div>
              <div className="text-xs font-bold text-slate-700 mt-0.5">{selectedNpa.annual_budget.toLocaleString()} ETB</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {!selectedNpa.is_admin_budget_line ? (
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">
                    Annual Target ({selectedNpa.uom})
                  </label>
                  <NumberInput
                    value={Number(form.annual_target) || 0}
                    onChange={v => setForm(f => ({ ...f, annual_target: String(v) }))}
                    className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 mb-1">
                    Annual Target
                  </label>
                  <div className="text-xs text-slate-500 p-2 bg-slate-100 rounded border border-slate-200">
                    N/A (Admin Budget Line)
                  </div>
                </div>
              )}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Annual Budget (ETB)</label>
                <NumberInput
                  value={Number(form.annual_budget) || 0}
                  onChange={v => setForm(f => ({ ...f, annual_budget: String(v) }))}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
            </div>

            {!numbersValid && (
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-[11px] text-rose-700 font-semibold">
                Budget (and target if applicable) must be zero or greater.
              </div>
            )}

            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border text-xs font-bold">
                Back
              </button>
              <button
                disabled={!canSave}
                onClick={handleSaveDept}
                className="bg-ercs-red text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-40"
              >
                <Save className="w-3.5 h-3.5" /> {isEditing ? 'Update' : 'Save'} Department Plan Entry
              </button>
            </div>
          </div>
        )}
      </ModalShell>
    );
  }

  // ---------------- PROJECT SCOPE ----------------
  if (isProjectScope) {
    const selectedNa = nationalActivities.find(na => na.id === form.national_activity_id);
    const eligibleProjects = selectedNa ? projects.filter(p => selectedNa.eligible_project_ids.includes(p.id)) : projects;
    const isEligibleScope = !!selectedNa && !!form.project_id && selectedNa.eligible_project_ids.includes(form.project_id);
    const siblingEntries = selectedNa ? planEntries.filter(pe => pe.national_activity_id === selectedNa.id && pe.id !== form.id) : [];
    const siblingTarget = sumTarget(siblingEntries);
    const siblingBudget = sumBudget(siblingEntries);
    const thisTarget = Number(form.annual_target) || 0;
    const thisBudget = Number(form.annual_budget) || 0;
    const numbersValid = thisTarget >= 0 && thisBudget >= 0;
    const isDuplicateLink = !!selectedNa && planEntries.some(pe => pe.id !== form.id && pe.national_activity_id === selectedNa.id && pe.scope_type === 'Project' && pe.project_id === form.project_id);

    const canContinue = form.lockScope ? !!form.national_activity_id : (!!form.project_id && !!form.national_activity_id);
    const effectiveActivityName = (form.activity_name || selectedNa?.description || '').trim();
    const canSaveContributing = !!form.national_activity_id && isEligibleScope && !!effectiveActivityName && !!form.activity_description.trim() && numbersValid && !isDuplicateLink;
    const canSaveNonContributing = !!form.project_id && !!form.activity_name.trim() && !!form.uom && numbersValid;

    const activityCode = selectedNa?.code || '';

    const handleAddProject = () => {
      const name = newProjectName.trim();
      if (!name) return;
      const project: Project = { id: `proj-${Date.now()}`, name };
      addProject(project);
      setForm(f => ({ ...f, project_id: project.id }));
      setNewProjectName('');
      setAddingProject(false);
    };

    const handleSaveContributing = () => {
      if (!canSaveContributing || savingRef.current) return;
      savingRef.current = true;
      const pe: PlanEntry = {
        id: form.id || `pe-${Date.now()}`, national_activity_id: form.national_activity_id, scope_type: 'Project',
        project_id: form.project_id, annual_target: thisTarget, annual_budget: thisBudget,
        activity_code: selectedNa?.code || '', activity_name: effectiveActivityName, activity_description: form.activity_description.trim(),
        approval_status: 'Approved',
        is_contributing: true,
        uom: selectedNa?.uom,
        target_female: form.target_female ? Number(form.target_female) : undefined,
        target_male: form.target_male ? Number(form.target_male) : undefined,
        target_youth: form.target_youth ? Number(form.target_youth) : undefined,
      };
      if (isEditing) updatePlanEntry(pe); else addPlanEntry(pe);
      onSaved();
    };

    const handleSaveNonContributing = () => {
      if (!canSaveNonContributing || savingRef.current) return;
      savingRef.current = true;
      const pe: PlanEntry = {
        id: form.id || `pe-nc-${Date.now()}`,
        national_activity_id: '',
        scope_type: 'Project',
        project_id: form.project_id,
        annual_target: thisTarget,
        annual_budget: thisBudget,
        activity_code: form.activity_code || `PROJ-${Date.now().toString().slice(-4)}`,
        activity_name: form.activity_name.trim(),
        activity_description: form.activity_description.trim(),
        is_contributing: false,
        uom: form.uom || 'Number',
        approval_status: 'Approved',
      };
      if (isEditing) updatePlanEntry(pe); else addPlanEntry(pe);
      onSaved();
    };

    return (
      <ModalShell title={isEditing ? 'Edit Plan Entry' : 'Add Project Plan Entry'} onClose={onClose}>
        {!isEditing && (
          <div className="flex bg-slate-100 p-1 rounded-xl mb-4 text-xs font-bold">
            <button
              type="button"
              onClick={() => setIsContributing(true)}
              className={`flex-1 py-1.5 rounded-lg transition-all ${isContributing ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Contributing (Links to National Activity)
            </button>
            <button
              type="button"
              onClick={() => setIsContributing(false)}
              className={`flex-1 py-1.5 rounded-lg transition-all ${!isContributing ? 'bg-white text-ercs-red shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              Non-Contributing (Standalone Project Activity)
            </button>
          </div>
        )}

        {isContributing ? (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <StepPill num={1} label="Link to Parent" active={step === 1} done={step > 1} />
              <div className="flex-1 h-px bg-slate-200" />
              <StepPill num={2} label="Execution Details" active={step === 2} done={false} />
            </div>
            {step === 1 && (
              <div className="space-y-4">
                {!form.lockScope && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="block text-[10px] font-bold text-slate-500">Project</span>
                      <button type="button" onClick={() => setAddingProject(a => !a)} className="text-[10px] font-bold text-ercs-red">+ Add Project</button>
                    </div>
                    <select
                      value={form.project_id}
                      onChange={e => {
                        const newPid = e.target.value;
                        setForm(f => {
                          const currentNa = nationalActivities.find(n => n.id === f.national_activity_id);
                          const keepNa = currentNa && currentNa.eligible_project_ids.includes(newPid);
                          return {
                            ...f,
                            project_id: newPid,
                            national_activity_id: keepNa ? f.national_activity_id : '',
                          };
                        });
                      }}
                      className="w-full text-xs border rounded p-2 bg-slate-50"
                    >
                      <option value="">Select project first…</option>
                      {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                    {addingProject && (
                      <div className="mt-2 flex gap-1.5">
                        <input value={newProjectName} onChange={e => setNewProjectName(e.target.value)} placeholder="New project name" className="flex-1 text-xs border border-slate-200 rounded p-1.5 bg-white" />
                        <button type="button" onClick={handleAddProject} className="px-2.5 py-1 rounded bg-ercs-red text-white text-[10px] font-bold">Add</button>
                      </div>
                    )}
                  </div>
                )}
                <div>
                  <span className="block text-[10px] font-bold text-slate-500 mb-1">National Activity (Parent)</span>
                  <select
                    value={form.national_activity_id}
                    onChange={e => setForm(f => ({ ...f, national_activity_id: e.target.value }))}
                    disabled={isEditing || (!form.lockScope && !form.project_id)}
                    className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 disabled:opacity-60"
                  >
                    <option value="">
                      {!form.lockScope && !form.project_id
                        ? 'Select a project first to see linked National Activities…'
                        : 'Select the National Activity this plan entry belongs to…'}
                    </option>
                    {nationalActivities
                      .filter(na => form.project_id ? na.eligible_project_ids.includes(form.project_id) : na.eligible_project_ids.length > 0)
                      .map(na => <option key={na.id} value={na.id}>{na.code} — {na.description}</option>)}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button disabled={!canContinue} onClick={() => setStep(2)} className="bg-ercs-red text-white px-4 py-2 rounded-lg text-xs font-bold disabled:opacity-40">Continue to Execution Details</button>
                </div>
              </div>
            )}
            {step === 2 && selectedNa && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="block text-[10px] font-bold text-slate-500">Project</span>
                    {!form.lockScope && <button type="button" onClick={() => setAddingProject(a => !a)} className="text-[10px] font-bold text-ercs-red">+ Add Project</button>}
                  </div>
                  <select value={form.project_id} onChange={e => setForm(f => ({ ...f, project_id: e.target.value }))} disabled={form.lockScope} className="w-full text-xs border rounded p-2 bg-slate-50 disabled:opacity-60">
                    <option value="">Select project…</option>
                    {eligibleProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                  {addingProject && (
                    <div className="mt-2 flex gap-1.5">
                      <input value={newProjectName} onChange={e => setNewProjectName(e.target.value)} placeholder="New project name" className="flex-1 text-xs border border-slate-200 rounded p-1.5 bg-white" />
                      <button type="button" onClick={handleAddProject} className="px-2.5 py-1 rounded bg-ercs-red text-white text-[10px] font-bold">Add</button>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 bg-slate-50 border rounded-lg p-3">
                    <div className="text-[10px] uppercase font-extrabold text-slate-400">Activity Code (inherited, read-only)</div>
                    <div className="text-sm font-black text-ercs-red mt-1">{activityCode || '—'}</div>
                  </div>
                  <div className="col-span-2 bg-slate-50 border rounded-lg p-3">
                    <div className="text-[10px] uppercase font-extrabold text-slate-400">Activity Name (inherited, read-only)</div>
                    <div className="text-xs font-bold text-slate-800 mt-1">{effectiveActivityName || '—'}</div>
                  </div>
                  <div className="col-span-2">
                    <label className="block">
                      <span className="block text-[10px] font-bold text-slate-500 mb-1">Activity Description</span>
                      <textarea value={form.activity_description} onChange={e => setForm(f => ({ ...f, activity_description: e.target.value }))} rows={3} className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50" />
                    </label>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Annual Target ({selectedNa.uom})</label>
                    <NumberInput
                      value={Number(form.annual_target) || 0}
                      onChange={v => setForm(f => ({ ...f, annual_target: String(v), annual_budget: v <= 0 ? '0' : f.annual_budget }))}
                      className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Annual Budget (ETB)</label>
                    <NumberInput
                      value={Number(form.annual_budget) || 0}
                      onChange={v => setForm(f => ({ ...f, annual_budget: String(v) }))}
                      disabled={Number(form.annual_target) <= 0}
                      className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:opacity-50"
                    />
                  </div>
                  <div className="col-span-2 border-t border-slate-200 pt-3">
                    <div className="text-[10px] uppercase font-extrabold text-slate-500 mb-2">Demographic Target Breakdown (Optional)</div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">Female</label>
                        <input
                          type="number"
                          min="0"
                          placeholder="—"
                          value={form.target_female || ''}
                          onChange={e => setForm(f => ({ ...f, target_female: e.target.value }))}
                          className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:outline-none focus:border-ercs-red"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">Male</label>
                        <input
                          type="number"
                          min="0"
                          placeholder="—"
                          value={form.target_male || ''}
                          onChange={e => setForm(f => ({ ...f, target_male: e.target.value }))}
                          className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:border-ercs-red"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">Youth</label>
                        <input
                          type="number"
                          min="0"
                          placeholder="—"
                          value={form.target_youth || ''}
                          onChange={e => setForm(f => ({ ...f, target_youth: e.target.value }))}
                          className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:bg-white focus:border-ercs-red"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {isDuplicateLink && <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-[11px] text-rose-700 font-semibold">This Project is already linked to {selectedNa.code}.</div>}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 text-[11px] text-blue-800 font-semibold space-y-1">
                  <div>This entry will contribute <b>{thisTarget.toLocaleString()} {selectedNa.uom}</b> / <b>ETB {thisBudget.toLocaleString()}</b>, alongside <b>{siblingTarget.toLocaleString()}</b> / <b>ETB {siblingBudget.toLocaleString()}</b> already committed.</div>
                </div>
                <div className="flex justify-between">
                  <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border text-xs font-bold">Back</button>
                  <button disabled={!canSaveContributing} onClick={handleSaveContributing} className="bg-ercs-red text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-40">
                    <Save className="w-3.5 h-3.5" /> {isEditing ? 'Update Plan Entry' : 'Save & Link'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
              <span className="font-bold">Standalone Project Activity:</span> This activity is not linked to any National Activity and is not aggregated into National/Strategic totals.
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="block text-[10px] font-bold text-slate-500">Project</span>
                {!form.lockScope && <button type="button" onClick={() => setAddingProject(a => !a)} className="text-[10px] font-bold text-ercs-red">+ Add Project</button>}
              </div>
              <select value={form.project_id} onChange={e => setForm(f => ({ ...f, project_id: e.target.value }))} disabled={form.lockScope} className="w-full text-xs border rounded p-2 bg-slate-50 disabled:opacity-60">
                <option value="">Select project…</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>

            <LabeledInput label="Activity Name" value={form.activity_name} onChange={v => setForm(f => ({ ...f, activity_name: v }))} placeholder="e.g. Conduct Community Baseline Survey" />

            <label className="block">
              <span className="block text-[10px] font-bold text-slate-500 mb-1">Activity Description</span>
              <textarea value={form.activity_description} onChange={e => setForm(f => ({ ...f, activity_description: e.target.value }))} rows={3} className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50" placeholder="Detailed activity description..." />
            </label>

            <div>
              <span className="block text-[10px] font-bold text-slate-500 mb-1">Unit of Measurement (UOM)</span>
              <select value={form.uom || ''} onChange={e => setForm(f => ({ ...f, uom: e.target.value }))} className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50">
                <option value="">Select unit of measure…</option>
                {uomConfigs.map(c => <option key={c.uom} value={c.uom}>{c.uom}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Annual Target</label>
                <NumberInput
                  value={Number(form.annual_target) || 0}
                  onChange={v => setForm(f => ({ ...f, annual_target: String(v), annual_budget: v <= 0 ? '0' : f.annual_budget }))}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 mb-1">Annual Budget (ETB)</label>
                <NumberInput
                  value={Number(form.annual_budget) || 0}
                  onChange={v => setForm(f => ({ ...f, annual_budget: String(v) }))}
                  className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t">
              <button disabled={!canSaveNonContributing} onClick={handleSaveNonContributing} className="bg-ercs-red text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-40 shadow-sm">
                <Save className="w-3.5 h-3.5" /> {isEditing ? 'Update Standalone Entry' : 'Save Standalone Entry'}
              </button>
            </div>
          </div>
        )}
      </ModalShell>
    );
  }

  // ---------------- REGIONAL SCOPE: Branch Head (link wizard) ----------------
  if (isBranchHead && !isEditing) {
    const region = regions.find(r => r.id === form.region_id);
    const zonesInRegion = zones.filter(z => z.region_id === form.region_id);
    const [selectedZoneIds, setSelectedZoneIds] = useState<string[]>([]);
    const naOptions = nationalActivities.filter(na => na.eligible_region_ids.includes(form.region_id));
    const selectedNa = nationalActivities.find(na => na.id === form.national_activity_id);
    const isDuplicate = !!selectedNa && regionActivityLinks.some(l => l.national_activity_id === selectedNa.id && l.region_id === form.region_id);
    const canContinue = !!form.national_activity_id && !isDuplicate;
    const canSave = canContinue && selectedZoneIds.length > 0;

    const toggleZone = (id: string) => setSelectedZoneIds(prev => prev.includes(id) ? prev.filter(z => z !== id) : [...prev, id]);

    const handleSave = () => {
      if (!canSave || savingRef.current) return;
      savingRef.current = true;
      addRegionActivityLink({
        id: `ral-${Date.now()}`, national_activity_id: form.national_activity_id, region_id: form.region_id,
        activity_name: selectedNa?.description || '', activity_description: selectedNa?.activity_description || '', eligible_zone_ids: selectedZoneIds,
      });
      onSaved();
    };

    return (
      <ModalShell title="Add Plan — Link to National Activity" onClose={onClose}>
        <div className="flex items-center gap-2 mb-4">
          <StepPill num={1} label="Link to Parent" active={step === 1} done={step > 1} />
          <div className="flex-1 h-px bg-slate-200" />
          <StepPill num={2} label="Zone Details" active={step === 2} done={false} />
        </div>
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <span className="block text-[10px] font-bold text-slate-500 mb-1">National Activity (Parent)</span>
              <select value={form.national_activity_id} onChange={e => setForm(f => ({ ...f, national_activity_id: e.target.value }))} className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50">
                <option value="">Select the National Activity this Region will execute…</option>
                {naOptions.map(na => <option key={na.id} value={na.id}>{na.code} — {na.description}</option>)}
              </select>
              {isDuplicate && <div className="text-[10px] text-rose-700 mt-1 font-semibold">Already linked to {region?.name}.</div>}
            </div>
            <div className="flex justify-end">
              <button disabled={!canContinue} onClick={() => setStep(2)} className="bg-ercs-red text-white px-4 py-2 rounded-lg text-xs font-bold disabled:opacity-40">Continue</button>
            </div>
          </div>
        )}
        {step === 2 && selectedNa && (
          <div className="space-y-4">
            <div className="bg-slate-50 border rounded-lg p-3">
              <div className="text-[10px] uppercase font-extrabold text-slate-400">Activity Name (inherited from National Activity)</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">{selectedNa?.description || '—'}</div>
              <div className="text-[10px] uppercase font-extrabold text-slate-400 mt-2">Activity Description (inherited from National Activity)</div>
              <div className="text-[11px] text-slate-600 mt-0.5">{selectedNa?.activity_description || '—'}</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="block text-[10px] font-bold text-slate-500">Eligible Zones (multi-select) — no Target/Budget here, each Zone enters its own</span>
                <button
                  type="button"
                  onClick={() => {
                    if (selectedZoneIds.length === zonesInRegion.length && zonesInRegion.length > 0) {
                      setSelectedZoneIds([]);
                    } else {
                      setSelectedZoneIds(zonesInRegion.map(z => z.id));
                    }
                  }}
                  className="text-[10px] font-bold text-ercs-red"
                >
                  {selectedZoneIds.length === zonesInRegion.length && zonesInRegion.length > 0 ? 'Deselect all' : 'Select all'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto">
                {zonesInRegion.map(z => (
                  <label key={z.id} className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-50 border rounded px-2 py-1.5 cursor-pointer">
                    <input type="checkbox" checked={selectedZoneIds.includes(z.id)} onChange={() => toggleZone(z.id)} /> {z.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border text-xs font-bold">Back</button>
              <button disabled={!canSave} onClick={handleSave} className="bg-ercs-red text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-40">
                <Save className="w-3.5 h-3.5" /> Save Region Link
              </button>
            </div>
          </div>
        )}
      </ModalShell>
    );
  }

  // ---------------- REGIONAL SCOPE: Zone Coordinator's own PlanEntry ----------------
  const eligibleLinks = currentZone
    ? regionActivityLinks.filter(l => l.region_id === currentZone.region_id && l.eligible_zone_ids.includes(currentZone.id))
    : [];
  const selectedLink = regionActivityLinks.find(l => l.id === form['region_activity_link_id' as keyof PeWizardFormState] as unknown as string)
    || eligibleLinks.find(l => l.national_activity_id === form.national_activity_id);
  const selectedNaZone = nationalActivities.find(na => na.id === form.national_activity_id);
  const thisTarget = Number(form.annual_target) || 0;
  const thisBudget = Number(form.annual_budget) || 0;
  const numbersValid = thisTarget >= 0 && thisBudget >= 0;
  const isDuplicateZoneEntry = !!selectedLink && planEntries.some(pe => pe.id !== form.id && pe.region_activity_link_id === selectedLink.id && pe.zone_id === currentZone?.id);
  const canContinueZ = !!form.national_activity_id;
  const canSaveZ = canContinueZ && !!selectedLink && numbersValid && !isDuplicateZoneEntry;

  const handleSaveZone = () => {
    if (!canSaveZ || !currentZone || !selectedLink || savingRef.current) return;
    savingRef.current = true;
    const pe: PlanEntry = {
      id: form.id || `pe-zn-${Date.now()}`, national_activity_id: selectedLink.national_activity_id, scope_type: 'Regional',
      region_id: currentZone.region_id, zone_id: currentZone.id, region_activity_link_id: selectedLink.id,
      annual_target: thisTarget, annual_budget: thisBudget, activity_code: selectedNaZone?.code || '',
      activity_name: selectedLink.activity_name, activity_description: selectedLink.activity_description, approval_status: 'Approved',
    };
    if (isEditing) updatePlanEntry(pe); else addPlanEntry(pe);
    onSaved();
  };

  return (
    <ModalShell title={isEditing ? 'Edit Plan Entry' : 'Add Plan Entry'} onClose={onClose}>
      <div className="flex items-center gap-2 mb-4">
        <StepPill num={1} label="Link to Parent" active={step === 1} done={step > 1} />
        <div className="flex-1 h-px bg-slate-200" />
        <StepPill num={2} label="Execution Details" active={step === 2} done={false} />
      </div>
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <span className="block text-[10px] font-bold text-slate-500 mb-1">National Activity (Parent)</span>
            <select
              value={form.national_activity_id}
              onChange={e => {
                const newNaId = e.target.value;
                setForm(f => {
                  const na = nationalActivities.find(n => n.id === newNaId);
                  const seededRt = currentZone ? na?.regional_targets?.[currentZone.region_id] : undefined;
                  const prefillTarget = seededRt && (seededRt.target > 0 || seededRt.budget > 0) ? String(seededRt.target) : f.annual_target;
                  const prefillBudget = seededRt && (seededRt.target > 0 || seededRt.budget > 0) ? String(seededRt.budget) : f.annual_budget;
                  return {
                    ...f,
                    national_activity_id: newNaId,
                    annual_target: prefillTarget,
                    annual_budget: prefillBudget,
                  };
                });
              }}
              disabled={isEditing}
              className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 disabled:opacity-60"
            >
              <option value="">Select…</option>
              {eligibleLinks.map(l => {
                const na = nationalActivities.find(n => n.id === l.national_activity_id);
                return <option key={l.id} value={l.national_activity_id}>{na?.code} — {na?.description}</option>;
              })}
            </select>
            {eligibleLinks.length === 0 && <div className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded p-2 mt-1 font-semibold">No National Activity is linked to your Zone yet. Ask your Branch Head.</div>}
          </div>
          <div className="flex justify-end">
            <button disabled={!canContinueZ} onClick={() => setStep(2)} className="bg-ercs-red text-white px-4 py-2 rounded-lg text-xs font-bold disabled:opacity-40">Continue</button>
          </div>
        </div>
      )}
      {step === 2 && selectedLink && selectedNaZone && (
        <div className="space-y-4">
          <div className="bg-slate-50 border rounded-lg p-3">
            <div className="text-[10px] uppercase font-extrabold text-slate-400">Activity Code (inherited, read-only)</div>
            <div className="text-sm font-black text-ercs-red mt-1">{selectedNaZone.code}</div>
            <div className="text-[10px] uppercase font-extrabold text-slate-400 mt-2">Activity Name (inherited, read-only)</div>
            <div className="text-xs font-bold text-slate-800 mt-0.5">{selectedLink.activity_name}</div>
            <div className="text-[10px] uppercase font-extrabold text-slate-400 mt-2">Description (inherited, read-only)</div>
            <div className="text-[11px] text-slate-600 mt-0.5">{selectedLink.activity_description}</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1">Annual Target ({selectedNaZone.uom})</label>
              <NumberInput
                value={Number(form.annual_target) || 0}
                onChange={v => setForm(f => ({ ...f, annual_target: String(v), annual_budget: v <= 0 ? '0' : f.annual_budget }))}
                className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1">Annual Budget (ETB)</label>
              <NumberInput
                value={Number(form.annual_budget) || 0}
                onChange={v => setForm(f => ({ ...f, annual_budget: String(v) }))}
                disabled={Number(form.annual_target) <= 0}
                className="w-full text-xs border border-slate-200 rounded p-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-red-100 disabled:opacity-50"
              />
            </div>
          </div>
          {isDuplicateZoneEntry && <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-[11px] text-rose-700 font-semibold">Your Zone has already entered a plan for this Activity.</div>}
          <div className="flex justify-between">
            <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border text-xs font-bold">Back</button>
            <button disabled={!canSaveZ} onClick={handleSaveZone} className="bg-ercs-red text-white px-5 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 disabled:opacity-40">
              <Save className="w-3.5 h-3.5" /> {isEditing ? 'Update Plan Entry' : 'Save Plan Entry'}
            </button>
          </div>
        </div>
      )}
    </ModalShell>
  );
};
