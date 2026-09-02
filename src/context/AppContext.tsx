// src/context/AppContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  StrategicPriority, StrategicObjective, NationalActivity, Region, Zone, Project, PlanEntry, Quarter, QuarterId, QuarterlyPlan, QuarterlyActual, UomFactorConfig, FilterState, UserRole, ScopeType, MonitoringRecord, RegionActivityLink, StrategicKpi, KpiProgressEntry,
} from '../types';
import {
  INITIAL_STRATEGIC_PRIORITIES, INITIAL_STRATEGIC_OBJECTIVES, INITIAL_NATIONAL_ACTIVITIES, INITIAL_REGIONS, INITIAL_ZONES, INITIAL_PROJECTS, INITIAL_PLAN_ENTRIES,
  FISCAL_QUARTERS, INITIAL_QUARTERLY_PLANS, INITIAL_QUARTERLY_ACTUALS, INITIAL_UOM_CONFIGS, INITIAL_MONITORING_RECORDS, INITIAL_REGION_ACTIVITY_LINKS, INITIAL_STRATEGIC_KPIS, INITIAL_KPI_PROGRESS_ENTRIES,
} from '../data/seedData';

type QuarterlyPlanInput = Omit<QuarterlyPlan, 'approval_status' | 'submitted_at' | 'reviewed_at' | 'rejection_reason'>;
type QuarterlyActualInput = Omit<QuarterlyActual, 'approval_status' | 'submitted_at' | 'reviewed_at' | 'rejection_reason'>;
type MonitoringRecordInput = Omit<MonitoringRecord, 'id'> & { id?: string };
type KpiProgressEntryInput = Omit<KpiProgressEntry, 'id'>;

interface AppContextType {
  activeRoute: string; setActiveRoute: (r: string) => void;
  currentRole: UserRole; setCurrentRole: (role: UserRole) => void;
  toastMessage: string | null; showToast: (msg: string) => void;

  /** Signals which Report-page section to scroll to after navigation. null = no auto-scroll. */
  reportFocusSection: 'national' | 'region' | 'project' | 'top' | null;
  setReportFocusSection: (s: 'national' | 'region' | 'project' | 'top' | null) => void;

  selectedNationalActivityId: string | null; setSelectedNationalActivityId: (id: string | null) => void;

  strategicPriorities: StrategicPriority[];
  strategicObjectives: StrategicObjective[];

  nationalActivities: NationalActivity[];
  addNationalActivity: (na: NationalActivity) => void;
  deleteNationalActivity: (id: string) => void;
  addEligibleScope: (nationalActivityId: string, scopeType: ScopeType, scopeId: string) => void;
  getNationalActivitiesForRole: () => NationalActivity[];

  regions: Region[];
  addRegion: (r: Region) => void;

  zones: Zone[];
  addZone: (z: Zone) => void;

  projects: Project[];
  addProject: (p: Project) => void;
  quarters: Quarter[];

  regionActivityLinks: RegionActivityLink[];
  addRegionActivityLink: (link: RegionActivityLink) => void;
  deleteRegionActivityLink: (id: string) => void;

  planEntries: PlanEntry[];
  addPlanEntry: (pe: PlanEntry) => void;
  updatePlanEntry: (pe: PlanEntry) => void;
  deletePlanEntry: (id: string) => void;

  quarterlyPlans: QuarterlyPlan[];
  upsertQuarterlyPlan: (qp: QuarterlyPlanInput) => void;
  submitQuarterlyPlanForApproval: (args: { plan_entry_id: string; quarter_id: QuarterId }) => void;
  approveQuarterlyPlan: (args: { plan_entry_id: string; quarter_id: QuarterId }) => void;
  rejectQuarterlyPlan: (args: { plan_entry_id: string; quarter_id: QuarterId; rejection_reason: string }) => void;

  quarterlyActuals: QuarterlyActual[];
  upsertQuarterlyActual: (qa: QuarterlyActualInput) => void;
  submitQuarterlyActualForApproval: (args: { plan_entry_id: string; quarter_id: QuarterId }) => void;
  approveQuarterlyActual: (args: { plan_entry_id: string; quarter_id: QuarterId }) => void;
  rejectQuarterlyActual: (args: { plan_entry_id: string; quarter_id: QuarterId; rejection_reason: string }) => void;

  monitoringRecords: MonitoringRecord[];
  upsertMonitoringRecord: (mr: MonitoringRecordInput) => void;
  getMonitoringRecordForPlanEntry: (planEntryId: string) => MonitoringRecord | undefined;

  uomConfigs: UomFactorConfig[];

  filters: FilterState; setFilters: React.Dispatch<React.SetStateAction<FilterState>>; resetFilters: () => void;
  getFilteredPlanEntries: () => PlanEntry[];

  strategicKpis: StrategicKpi[];
  kpiProgressEntries: KpiProgressEntry[];
  addKpiProgressEntry: (entry: KpiProgressEntryInput) => void;
  getLatestKpiProgress: (strategicKpiId: string) => KpiProgressEntry | undefined;
}

const DEFAULT_FILTERS: FilterState = { strategicPriorityId: 'ALL', strategicObjectiveId: 'ALL', nationalActivityId: 'ALL', regionId: ['ALL'], projectId: ['ALL'], zoneId: 'ALL', quarterId: 'ALL' };

type RoleScope =
  | { kind: 'National' }
  | { kind: 'Regional'; regionId: string }
  | { kind: 'Zone'; zoneId: string; regionId: string }
  | { kind: 'Project'; projectId: string };

const BRANCH_HEAD_PREFIX = 'Branch Head — ';
const PROJECT_PREFIX = 'Project Coordinator — ';
const ZONE_SUFFIX = ' coordinators';

const parseRoleScope = (role: UserRole, regions: Region[], projects: Project[], zones: Zone[]): RoleScope => {
  if (role === 'National Activity AOP') return { kind: 'National' };
  if (role === 'PMER Officer') return { kind: 'National' };
  if (role.startsWith(BRANCH_HEAD_PREFIX)) {
    const name = role.slice(BRANCH_HEAD_PREFIX.length);
    const region = regions.find(r => r.name === name);
    return region ? { kind: 'Regional', regionId: region.id } : { kind: 'National' };
  }
  if (role.startsWith(PROJECT_PREFIX)) {
    const name = role.slice(PROJECT_PREFIX.length);
    const project = projects.find(p => p.name === name);
    return project ? { kind: 'Project', projectId: project.id } : { kind: 'National' };
  }
  if (role.endsWith(ZONE_SUFFIX)) {
    const zoneName = role.slice(0, -ZONE_SUFFIX.length);
    const zone = zones.find(z => z.name === zoneName);
    return zone ? { kind: 'Zone', zoneId: zone.id, regionId: zone.region_id } : { kind: 'National' };
  }
  return { kind: 'National' };
};

// READ scope: National sees all; Regional (Branch Head) sees every zone
// under their region (needed for aggregation/approvals); Zone sees only its
// own zone; Project sees only its own project.
const roleOwnsPlanEntry = (role: UserRole, pe: PlanEntry, regions: Region[], projects: Project[], zones: Zone[]): boolean => {
  const scope = parseRoleScope(role, regions, projects, zones);
  if (scope.kind === 'National') return true;
  if (scope.kind === 'Regional') return pe.scope_type === 'Regional' && pe.region_id === scope.regionId;
  if (scope.kind === 'Zone') return pe.scope_type === 'Regional' && pe.zone_id === scope.zoneId;
  return pe.scope_type === 'Project' && pe.project_id === scope.projectId;
};

// WRITE scope: only Zone (own zone) or Project (own project) may write a
// PlanEntry/QuarterlyPlan/QuarterlyActual. Branch Head/AOP/PMER Officer never can.
const roleCanWritePlanEntry = (role: UserRole, pe: PlanEntry, regions: Region[], projects: Project[], zones: Zone[]): boolean => {
  const scope = parseRoleScope(role, regions, projects, zones);
  if (scope.kind === 'Zone') return pe.scope_type === 'Regional' && pe.zone_id === scope.zoneId;
  if (scope.kind === 'Project') return pe.scope_type === 'Project' && pe.project_id === scope.projectId;
  return false;
};

const normalizePersistedRole = (raw: UserRole, regions: Region[], projects: Project[], zones: Zone[]): UserRole => {
  if (raw === 'National Activity AOP' || raw === 'PMER Officer') return raw;
  if (parseRoleScope(raw, regions, projects, zones).kind !== 'National') return raw;
  return 'National Activity AOP';
};

// Bumped to v9: FilterState.regionId/projectId became string[] for multi-select
// (v8 had regionId: string, projectId: string).
const PERSISTENCE_KEY = 'ercs-aop-bottom-up-v9';

const readPersisted = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(PERSISTENCE_KEY);
    if (!raw) return fallback;
    const data = JSON.parse(raw) as Record<string, unknown>;
    return Object.prototype.hasOwnProperty.call(data, key) ? (data[key] as T) : fallback;
  } catch {
    return fallback;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRoute, setActiveRoute] = useState<string>(() => readPersisted('activeRoute', 'plan'));
  const [zones, setZones] = useState<Zone[]>(() => readPersisted('zones', INITIAL_ZONES));
  const [regions, setRegions] = useState<Region[]>(() => readPersisted('regions', INITIAL_REGIONS));
  const [projects, setProjects] = useState<Project[]>(() => readPersisted('projects', INITIAL_PROJECTS));
  const [currentRole, setCurrentRole] = useState<UserRole>(() => normalizePersistedRole(readPersisted('currentRole', 'National Activity AOP' as UserRole), INITIAL_REGIONS, INITIAL_PROJECTS, INITIAL_ZONES));
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedNationalActivityId, setSelectedNationalActivityId] = useState<string | null>(() => readPersisted('selectedNationalActivityId', null));
  const [reportFocusSection, setReportFocusSection] = useState<'national' | 'region' | 'project' | 'top' | null>(null);

  const [strategicPriorities] = useState<StrategicPriority[]>(INITIAL_STRATEGIC_PRIORITIES);
  const [strategicObjectives] = useState<StrategicObjective[]>(INITIAL_STRATEGIC_OBJECTIVES);
  const [strategicKpis] = useState<StrategicKpi[]>(INITIAL_STRATEGIC_KPIS);
  const [nationalActivities, setNationalActivities] = useState<NationalActivity[]>(() => readPersisted('nationalActivities', INITIAL_NATIONAL_ACTIVITIES));
  const [regionActivityLinks, setRegionActivityLinks] = useState<RegionActivityLink[]>(() => readPersisted('regionActivityLinks', INITIAL_REGION_ACTIVITY_LINKS));
  const [quarters] = useState<Quarter[]>(FISCAL_QUARTERS);
  const [planEntries, setPlanEntries] = useState<PlanEntry[]>(() => readPersisted('planEntries', INITIAL_PLAN_ENTRIES));
  const [quarterlyPlans, setQuarterlyPlans] = useState<QuarterlyPlan[]>(() => readPersisted('quarterlyPlans', INITIAL_QUARTERLY_PLANS));
  const [quarterlyActuals, setQuarterlyActuals] = useState<QuarterlyActual[]>(() => readPersisted('quarterlyActuals', INITIAL_QUARTERLY_ACTUALS));
  const [monitoringRecords, setMonitoringRecords] = useState<MonitoringRecord[]>(() => readPersisted('monitoringRecords', INITIAL_MONITORING_RECORDS));
  const [kpiProgressEntries, setKpiProgressEntries] = useState<KpiProgressEntry[]>(() => readPersisted('kpiProgressEntries', INITIAL_KPI_PROGRESS_ENTRIES));
  const [uomConfigs] = useState<UomFactorConfig[]>(() => readPersisted('uomConfigs', INITIAL_UOM_CONFIGS));
  const [filters, setFilters] = useState<FilterState>(() => ({ ...DEFAULT_FILTERS, ...readPersisted('filters', DEFAULT_FILTERS) }));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(PERSISTENCE_KEY, JSON.stringify({
        activeRoute, currentRole, selectedNationalActivityId, nationalActivities, regions, zones, projects,
        regionActivityLinks, planEntries, quarterlyPlans, quarterlyActuals, monitoringRecords, uomConfigs, filters, kpiProgressEntries,
      }));
    } catch {
      // localStorage may be unavailable; in-memory state still works for the session.
    }
  }, [activeRoute, currentRole, selectedNationalActivityId, nationalActivities, regions, zones, projects, regionActivityLinks, planEntries, quarterlyPlans, quarterlyActuals, monitoringRecords, uomConfigs, filters, kpiProgressEntries]);

  const showToast = (msg: string) => { setToastMessage(msg); setTimeout(() => setToastMessage(null), 3000); };
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const getFilteredPlanEntries = () => planEntries.filter(pe => {
    if (!roleOwnsPlanEntry(currentRole, pe, regions, projects, zones)) return false;
    if (filters.strategicPriorityId !== 'ALL') {
      const na = nationalActivities.find(n => n.id === pe.national_activity_id);
      if (!na || na.strategic_priority_id !== filters.strategicPriorityId) return false;
    }
    if (filters.strategicObjectiveId !== 'ALL') {
      const na = nationalActivities.find(n => n.id === pe.national_activity_id);
      if (!na || na.strategic_objective_id !== filters.strategicObjectiveId) return false;
    }
    if (filters.nationalActivityId !== 'ALL' && pe.national_activity_id !== filters.nationalActivityId) return false;
    // Region: pass if ALL selected, or pe.region_id is in the selected array (OR across selected ids).
    // NONE is treated the same as ALL for filtering — the hideDetailBreakdown flag handles the UI.
    const rIds = filters.regionId;
    if (!rIds.includes('ALL') && !rIds.includes('NONE') && (!pe.region_id || !rIds.includes(pe.region_id))) return false;
    const pIds = filters.projectId;
    if (!pIds.includes('ALL') && !pIds.includes('NONE') && (!pe.project_id || !pIds.includes(pe.project_id))) return false;
    if (filters.zoneId && filters.zoneId !== 'ALL' && pe.zone_id !== filters.zoneId) return false;
    return true;
  });

  const getNationalActivitiesForRole = (): NationalActivity[] => {
    const scope = parseRoleScope(currentRole, regions, projects, zones);
    if (scope.kind === 'National') return nationalActivities;
    if (scope.kind === 'Regional') return nationalActivities.filter(na => na.eligible_region_ids.includes(scope.regionId));
    if (scope.kind === 'Zone') {
      const linkedActivityIds = new Set(
        regionActivityLinks.filter(l => l.region_id === scope.regionId && l.eligible_zone_ids.includes(scope.zoneId)).map(l => l.national_activity_id)
      );
      return nationalActivities.filter(na => linkedActivityIds.has(na.id));
    }
    return nationalActivities.filter(na => na.eligible_project_ids.includes(scope.projectId));
  };

  const addNationalActivity = (na: NationalActivity) => {
    if (currentRole !== 'National Activity AOP') { showToast('Only National Activity AOP can create National Activities.'); return; }
    setNationalActivities(prev => [...prev, na]);
    showToast(`National Activity ${na.code} created.`);
  };

  const deleteNationalActivity = (id: string) => {
    if (currentRole !== 'National Activity AOP') { showToast('Only National Activity AOP can delete National Activities.'); return; }
    const hasLinkedEntries = planEntries.some(pe => pe.national_activity_id === id);
    const hasLinkedRegionLinks = regionActivityLinks.some(l => l.national_activity_id === id);
    if (hasLinkedEntries || hasLinkedRegionLinks) {
      showToast('This National Activity has linked Plan Entries or Region links and cannot be deleted.');
      return;
    }
    const na = nationalActivities.find(n => n.id === id);
    setNationalActivities(prev => prev.filter(n => n.id !== id));
    showToast(na ? `National Activity ${na.code} deleted.` : 'National Activity deleted.');
  };

  const addEligibleScope = (nationalActivityId: string, scopeType: ScopeType, scopeId: string) => {
    setNationalActivities(prev => prev.map(na => {
      if (na.id !== nationalActivityId) return na;
      if (scopeType === 'Regional') {
        return na.eligible_region_ids.includes(scopeId) ? na : { ...na, eligible_region_ids: [...na.eligible_region_ids, scopeId] };
      }
      return na.eligible_project_ids.includes(scopeId) ? na : { ...na, eligible_project_ids: [...na.eligible_project_ids, scopeId] };
    }));
  };

  const addRegion = (r: Region) => { setRegions(prev => [...prev, r]); showToast(`Region ${r.name} added.`); };
  const addZone = (z: Zone) => { setZones(prev => [...prev, z]); showToast(`Zone ${z.name} added.`); };
  const addProject = (p: Project) => { setProjects(prev => [...prev, p]); showToast(`Project ${p.name} added.`); };

  // -----------------------------------------------------------------------
  // REGION ACTIVITY LINK — Branch Head only.
  // -----------------------------------------------------------------------
  const addRegionActivityLink = (link: RegionActivityLink) => {
    const scope = parseRoleScope(currentRole, regions, projects, zones);
    if (scope.kind !== 'Regional' || scope.regionId !== link.region_id) { showToast('Only this region\'s Branch Head can add a Region Activity Link here.'); return; }
    const na = nationalActivities.find(n => n.id === link.national_activity_id);
    if (!na || !na.eligible_region_ids.includes(link.region_id)) { showToast('This Region is not an eligible executor of that National Activity.'); return; }
    const isDuplicate = regionActivityLinks.some(l => l.national_activity_id === link.national_activity_id && l.region_id === link.region_id);
    if (isDuplicate) { showToast('This National Activity is already linked to this Region.'); return; }
    setRegionActivityLinks(prev => [...prev, link]);
    showToast(`${na.code} linked to this Region. Eligible Zones can now add their Plan Entries.`);
  };

  const deleteRegionActivityLink = (id: string) => {
    const link = regionActivityLinks.find(l => l.id === id);
    if (!link) return;
    const scope = parseRoleScope(currentRole, regions, projects, zones);
    if (scope.kind !== 'Regional' || scope.regionId !== link.region_id) { showToast('Only this region\'s Branch Head can delete this Region Activity Link.'); return; }
    const hasLinkedZoneEntries = planEntries.some(pe => pe.region_activity_link_id === id);
    if (hasLinkedZoneEntries) { showToast('This link has zone Plan Entries and cannot be deleted.'); return; }
    setRegionActivityLinks(prev => prev.filter(l => l.id !== id));
    showToast('Region Activity Link deleted.');
  };

  // -----------------------------------------------------------------------
  // PLAN ENTRY
  // -----------------------------------------------------------------------
  const addPlanEntry = (pe: PlanEntry) => {
    if (!roleCanWritePlanEntry(currentRole, pe, regions, projects, zones)) { showToast('This coordinator can only manage entries for their assigned project or zone.'); return; }

    const na = nationalActivities.find(n => n.id === pe.national_activity_id);
    if (!na) { showToast('National Activity not found.'); return; }

    if (pe.scope_type === 'Project') {
      const isEligible = !!pe.project_id && na.eligible_project_ids.includes(pe.project_id);
      if (!isEligible) { showToast(`${na.code} is not executed by this Project.`); return; }
    } else {
      const link = regionActivityLinks.find(l => l.id === pe.region_activity_link_id);
      const isEligible = !!link && link.national_activity_id === na.id && !!pe.zone_id && link.eligible_zone_ids.includes(pe.zone_id);
      if (!isEligible) { showToast(`${na.code} is not linked to this Zone by its Branch Head.`); return; }
    }

    setPlanEntries(prev => [...prev, pe]);
    showToast(`Plan entry added and linked to ${na.code}.`);
  };

  const updatePlanEntry = (pe: PlanEntry) => {
    if (!roleCanWritePlanEntry(currentRole, pe, regions, projects, zones)) { showToast('This coordinator can only edit entries for their assigned project or zone.'); return; }
    setPlanEntries(prev => prev.map(x => (x.id === pe.id ? pe : x)));
    const na = nationalActivities.find(n => n.id === pe.national_activity_id);
    showToast(`Plan entry updated. ${na?.code || ''}'s aggregated Target/Budget recalculates automatically.`);
  };

  const deletePlanEntry = (id: string) => {
    const old = planEntries.find(x => x.id === id);
    if (!old) return;
    if (!roleCanWritePlanEntry(currentRole, old, regions, projects, zones)) { showToast('This coordinator can only delete entries for their assigned project or zone.'); return; }
    setPlanEntries(prev => prev.filter(x => x.id !== id));
    setQuarterlyPlans(prev => prev.filter(qp => qp.plan_entry_id !== id));
    setQuarterlyActuals(prev => prev.filter(a => a.plan_entry_id !== id));
    setMonitoringRecords(prev => prev.filter(m => m.plan_entry_id !== id));
    showToast("Plan entry and its linked records deleted.");
  };

  // -----------------------------------------------------------------------
  // QUARTERLY PLAN — Project rows stay auto-Approved. Zone rows: live edits
  // keep it Draft; blocked once Pending/Approved (Rejected re-opens editing).
  // -----------------------------------------------------------------------
  const upsertQuarterlyPlan = (qp: QuarterlyPlanInput) => {
    const parentEntry = planEntries.find(x => x.id === qp.plan_entry_id);
    if (!parentEntry || !roleCanWritePlanEntry(currentRole, parentEntry, regions, projects, zones)) {
      showToast('You can only enter Quarterly Plan values for your assigned project or zone.');
      return;
    }

    setQuarterlyPlans(prev => {
      const idx = prev.findIndex(x => x.plan_entry_id === qp.plan_entry_id && x.quarter_id === qp.quarter_id);
      const existing = idx >= 0 ? prev[idx] : undefined;

      if (parentEntry.scope_type === 'Project') {
        const merged: QuarterlyPlan = { ...qp, approval_status: 'Approved' };
        if (idx >= 0) { const copy = [...prev]; copy[idx] = merged; return copy; }
        return [...prev, merged];
      }

      // Zone-scoped: block edits once Pending/Approved.
      if (existing && (existing.approval_status === 'Pending Approval' || existing.approval_status === 'Approved')) {
        showToast('This Quarterly Plan is locked while Pending Approval or Approved.');
        return prev;
      }
      const merged: QuarterlyPlan = { ...qp, approval_status: 'Draft' };
      if (idx >= 0) { const copy = [...prev]; copy[idx] = merged; return copy; }
      return [...prev, merged];
    });
  };

  const submitQuarterlyPlanForApproval = ({ plan_entry_id, quarter_id }: { plan_entry_id: string; quarter_id: QuarterId }) => {
    const scope = parseRoleScope(currentRole, regions, projects, zones);
    const parentEntry = planEntries.find(x => x.id === plan_entry_id);
    if (scope.kind !== 'Zone' || !parentEntry || parentEntry.zone_id !== scope.zoneId) { showToast('Only the owning Zone Coordinator can submit this for approval.'); return; }
    setQuarterlyPlans(prev => prev.map(qp => qp.plan_entry_id === plan_entry_id && qp.quarter_id === quarter_id
      ? { ...qp, approval_status: 'Pending Approval', submitted_at: new Date().toISOString(), rejection_reason: undefined }
      : qp));
    showToast(`${quarter_id} Quarterly Plan submitted for Branch Head approval.`);
  };

  const approveQuarterlyPlan = ({ plan_entry_id, quarter_id }: { plan_entry_id: string; quarter_id: QuarterId }) => {
    const scope = parseRoleScope(currentRole, regions, projects, zones);
    const parentEntry = planEntries.find(x => x.id === plan_entry_id);
    if (scope.kind !== 'Regional' || !parentEntry || parentEntry.region_id !== scope.regionId) { showToast('Only this region\'s Branch Head can approve this.'); return; }
    setQuarterlyPlans(prev => prev.map(qp => qp.plan_entry_id === plan_entry_id && qp.quarter_id === quarter_id
      ? { ...qp, approval_status: 'Approved', reviewed_at: new Date().toISOString() }
      : qp));
    showToast(`${quarter_id} Quarterly Plan approved.`);
  };

  const rejectQuarterlyPlan = ({ plan_entry_id, quarter_id, rejection_reason }: { plan_entry_id: string; quarter_id: QuarterId; rejection_reason: string }) => {
    const scope = parseRoleScope(currentRole, regions, projects, zones);
    const parentEntry = planEntries.find(x => x.id === plan_entry_id);
    if (scope.kind !== 'Regional' || !parentEntry || parentEntry.region_id !== scope.regionId) { showToast('Only this region\'s Branch Head can reject this.'); return; }
    setQuarterlyPlans(prev => prev.map(qp => qp.plan_entry_id === plan_entry_id && qp.quarter_id === quarter_id
      ? { ...qp, approval_status: 'Rejected', reviewed_at: new Date().toISOString(), rejection_reason }
      : qp));
    showToast(`${quarter_id} Quarterly Plan rejected — zone can revise and resubmit.`);
  };

  // -----------------------------------------------------------------------
  // QUARTERLY ACTUAL — Project rows unchanged (always auto-Approved, soft
  // budget warning only, in the UI). Zone rows: hard-blocked unless the
  // matching Quarterly Plan is Approved, and now go through their own
  // Draft → Pending Approval → Approved/Rejected cycle with the Branch
  // Head, exactly like the Quarterly Plan does — live edits keep it Draft;
  // blocked once Pending/Approved (Rejected re-opens editing).
  // -----------------------------------------------------------------------
  const upsertQuarterlyActual = (qa: QuarterlyActualInput) => {
    const parentEntry = planEntries.find(x => x.id === qa.plan_entry_id);
    if (!parentEntry || !roleCanWritePlanEntry(currentRole, parentEntry, regions, projects, zones)) {
      showToast('You can only enter Quarterly Actual values for your assigned project or zone.');
      return;
    }
    if (parentEntry.scope_type === 'Regional') {
      const plan = quarterlyPlans.find(qp => qp.plan_entry_id === qa.plan_entry_id && qp.quarter_id === qa.quarter_id);
      if (!plan || plan.approval_status !== 'Approved') {
        showToast('The Quarterly Plan for this quarter must be Approved by the Branch Head before entering Actuals.');
        return;
      }
    }

    setQuarterlyActuals(prev => {
      const idx = prev.findIndex(a => a.plan_entry_id === qa.plan_entry_id && a.quarter_id === qa.quarter_id);
      const existing = idx >= 0 ? prev[idx] : undefined;

      if (parentEntry.scope_type === 'Project') {
        const merged: QuarterlyActual = { ...qa, approval_status: 'Approved' };
        if (idx >= 0) { const copy = [...prev]; copy[idx] = merged; return copy; }
        return [...prev, merged];
      }

      // Zone-scoped: block edits once Pending/Approved.
      if (existing && (existing.approval_status === 'Pending Approval' || existing.approval_status === 'Approved')) {
        showToast('This Quarterly Actual is locked while Pending Approval or Approved.');
        return prev;
      }
      const merged: QuarterlyActual = { ...qa, approval_status: 'Draft' };
      if (idx >= 0) { const copy = [...prev]; copy[idx] = merged; return copy; }
      return [...prev, merged];
    });
  };

  const submitQuarterlyActualForApproval = ({ plan_entry_id, quarter_id }: { plan_entry_id: string; quarter_id: QuarterId }) => {
    const scope = parseRoleScope(currentRole, regions, projects, zones);
    const parentEntry = planEntries.find(x => x.id === plan_entry_id);
    if (scope.kind !== 'Zone' || !parentEntry || parentEntry.zone_id !== scope.zoneId) { showToast('Only the owning Zone Coordinator can submit this for approval.'); return; }
    setQuarterlyActuals(prev => prev.map(qa => qa.plan_entry_id === plan_entry_id && qa.quarter_id === quarter_id
      ? { ...qa, approval_status: 'Pending Approval', submitted_at: new Date().toISOString(), rejection_reason: undefined }
      : qa));
    showToast(`${quarter_id} Quarterly Actual submitted for Branch Head approval.`);
  };

  const approveQuarterlyActual = ({ plan_entry_id, quarter_id }: { plan_entry_id: string; quarter_id: QuarterId }) => {
    const scope = parseRoleScope(currentRole, regions, projects, zones);
    const parentEntry = planEntries.find(x => x.id === plan_entry_id);
    if (scope.kind !== 'Regional' || !parentEntry || parentEntry.region_id !== scope.regionId) { showToast('Only this region\'s Branch Head can approve this.'); return; }
    setQuarterlyActuals(prev => prev.map(qa => qa.plan_entry_id === plan_entry_id && qa.quarter_id === quarter_id
      ? { ...qa, approval_status: 'Approved', reviewed_at: new Date().toISOString() }
      : qa));
    showToast(`${quarter_id} Quarterly Actual approved.`);
  };

  const rejectQuarterlyActual = ({ plan_entry_id, quarter_id, rejection_reason }: { plan_entry_id: string; quarter_id: QuarterId; rejection_reason: string }) => {
    const scope = parseRoleScope(currentRole, regions, projects, zones);
    const parentEntry = planEntries.find(x => x.id === plan_entry_id);
    if (scope.kind !== 'Regional' || !parentEntry || parentEntry.region_id !== scope.regionId) { showToast('Only this region\'s Branch Head can reject this.'); return; }
    setQuarterlyActuals(prev => prev.map(qa => qa.plan_entry_id === plan_entry_id && qa.quarter_id === quarter_id
      ? { ...qa, approval_status: 'Rejected', reviewed_at: new Date().toISOString(), rejection_reason }
      : qa));
    showToast(`${quarter_id} Quarterly Actual rejected — zone can revise and resubmit.`);
  };

  const getMonitoringRecordForPlanEntry = (planEntryId: string) =>
    monitoringRecords.find(m => m.plan_entry_id === planEntryId);

  const upsertMonitoringRecord = (input: MonitoringRecordInput) => {
    if (currentRole !== 'PMER Officer') { showToast('Only the PMER Officer role can add or edit Monitoring Register entries.'); return; }
    const parentEntry = planEntries.find(x => x.id === input.plan_entry_id);
    if (!parentEntry) { showToast('Plan entry not found for this monitoring record.'); return; }
    setMonitoringRecords(prev => {
      const idx = prev.findIndex(m => m.plan_entry_id === input.plan_entry_id);
      const merged: MonitoringRecord = { ...input, id: input.id || prev[idx]?.id || `mr-${input.plan_entry_id}` };
      if (idx >= 0) { const copy = [...prev]; copy[idx] = merged; return copy; }
      return [...prev, merged];
    });
  };

  // -----------------------------------------------------------------------
  // STRATEGIC KPI TRACKING — additive, independent feature. Reads only from
  // strategicKpis (static) and kpiProgressEntries (manually logged); never
  // computed from monitoringRecords or planEntries.
  // -----------------------------------------------------------------------
  const addKpiProgressEntry = (entry: KpiProgressEntryInput) => {
    if (currentRole !== 'PMER Officer') { showToast('Only the PMER Officer role can log Strategic KPI progress.'); return; }
    const newEntry: KpiProgressEntry = { ...entry, id: `kpi-progress-${Date.now()}` };
    setKpiProgressEntries(prev => [...prev, newEntry]);
  };

  const getLatestKpiProgress = (strategicKpiId: string): KpiProgressEntry | undefined => {
    const entriesForKpi = kpiProgressEntries.filter(e => e.strategic_kpi_id === strategicKpiId);
    if (entriesForKpi.length === 0) return undefined;
    return entriesForKpi.reduce((latest, e) => (e.date > latest.date ? e : latest), entriesForKpi[0]);
  };

  return (
    <AppContext.Provider value={{
      activeRoute, setActiveRoute, currentRole, setCurrentRole, toastMessage, showToast,
      reportFocusSection, setReportFocusSection,
      selectedNationalActivityId, setSelectedNationalActivityId,
      strategicPriorities, strategicObjectives,
      nationalActivities, addNationalActivity, deleteNationalActivity, addEligibleScope, getNationalActivitiesForRole,
      regions, addRegion,
      zones, addZone,
      projects, addProject, quarters,
      regionActivityLinks, addRegionActivityLink, deleteRegionActivityLink,
      planEntries, addPlanEntry, updatePlanEntry, deletePlanEntry,
      quarterlyPlans, upsertQuarterlyPlan, submitQuarterlyPlanForApproval, approveQuarterlyPlan, rejectQuarterlyPlan,
      quarterlyActuals, upsertQuarterlyActual, submitQuarterlyActualForApproval, approveQuarterlyActual, rejectQuarterlyActual,
      monitoringRecords, upsertMonitoringRecord, getMonitoringRecordForPlanEntry,
      uomConfigs,
      filters, setFilters, resetFilters, getFilteredPlanEntries,
      strategicKpis, kpiProgressEntries, addKpiProgressEntry, getLatestKpiProgress,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
};