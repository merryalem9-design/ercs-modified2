import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  StrategicPriority, StrategicObjective, NationalActivity, Region, Zone, Project, PlanEntry, Quarter, QuarterId, QuarterlyPlan, QuarterlyActual, UomFactorConfig, FilterState, UserRole, ScopeType, MonitoringRecord, RegionActivityLink, StrategicKpi, KpiProgressEntry,
  VaultReportRecord, ToolRecord, LessonLearnedRecord, MediaUpdateRecord, TemplateGuidelineRecord, ResourceCenterRecord,
  StatusThresholdBand, QuarterPeriodConfig, NonProgrammaticActivity, NonProgrammaticDepartment, ApprovalStatus,
} from '../types';
import {
  INITIAL_STRATEGIC_PRIORITIES, INITIAL_STRATEGIC_OBJECTIVES, INITIAL_NATIONAL_ACTIVITIES, INITIAL_REGIONS, INITIAL_ZONES, INITIAL_PROJECTS, INITIAL_PLAN_ENTRIES,
  FISCAL_QUARTERS, INITIAL_QUARTERLY_PLANS, INITIAL_QUARTERLY_ACTUALS, INITIAL_UOM_CONFIGS, INITIAL_MONITORING_RECORDS, INITIAL_REGION_ACTIVITY_LINKS, INITIAL_STRATEGIC_KPIS, INITIAL_KPI_PROGRESS_ENTRIES,
  INITIAL_VAULT_REPORTS, INITIAL_TOOLS, INITIAL_LESSONS_LEARNED, INITIAL_MEDIA_UPDATES, INITIAL_TEMPLATES_GUIDELINES, INITIAL_RESOURCE_CENTER,
  INITIAL_STATUS_THRESHOLDS, INITIAL_QUARTER_PERIOD_CONFIGS, INITIAL_NON_PROGRAMMATIC_ACTIVITIES,
} from '../data/seedData';

type QuarterlyPlanInput = Omit<QuarterlyPlan, 'approval_status' | 'submitted_at' | 'reviewed_at' | 'rejection_reason'>;
type QuarterlyActualInput = Omit<QuarterlyActual, 'approval_status' | 'submitted_at' | 'reviewed_at' | 'rejection_reason'>;
type MonitoringRecordInput = Omit<MonitoringRecord, 'id'> & { id?: string };
type KpiProgressEntryInput = Omit<KpiProgressEntry, 'id'>;

/** Aggregated national AOP plan totals derived from seeded national activity targets. */
export interface AopTotals {
  /** Sum of na.ercs_target across included activities. */
  ercsTarget: number;
  /** Sum of na.ercs_budget across included activities. */
  ercsBudget: number;
  /** Sum of na.hq_target */
  hqTarget: number;
  /** Sum of na.hq_budget */
  hqBudget: number;
  /** Sum of na.rb_target */
  rbTarget: number;
  /** Sum of na.rb_budget */
  rbBudget: number;
  /** Per-region aggregated targets & budgets keyed by region_id. */
  byRegion: Record<string, { target: number; budget: number }>;
  /** Per-project aggregated targets & budgets keyed by project_id. */
  byProject: Record<string, { target: number; budget: number; currency?: 'ETB' | 'EUR' }>;
  /** Per-strategic-priority aggregated ercs target keyed by sp_id. */
  byStrategicPriority: Record<string, { target: number; budget: number }>;
  /** Per-strategic-objective aggregated ercs target keyed by so_id. */
  byStrategicObjective: Record<string, { target: number; budget: number }>;
}

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

  nonProgrammaticActivities: NonProgrammaticActivity[];

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
  submitMonitoringRecordForApproval: (planEntryId: string) => void;
  approveMonitoringRecord: (planEntryId: string) => void;
  rejectMonitoringRecord: (planEntryId: string, reason: string) => void;

  uomConfigs: UomFactorConfig[];
  addUomConfig: (cfg: UomFactorConfig) => void;

  statusThresholds: StatusThresholdBand[];
  setStatusThresholds: React.Dispatch<React.SetStateAction<StatusThresholdBand[]>>;
  addStatusThresholdBand: (band: StatusThresholdBand) => void;
  saveStatusThresholds: (bands: StatusThresholdBand[]) => void;

  quarterPeriodConfigs: QuarterPeriodConfig[];
  setQuarterPeriodConfigs: React.Dispatch<React.SetStateAction<QuarterPeriodConfig[]>>;
  updateQuarterPeriodConfig: (id: QuarterId, date_range: string) => void;

  filters: FilterState; setFilters: React.Dispatch<React.SetStateAction<FilterState>>; resetFilters: () => void;
  getFilteredPlanEntries: () => PlanEntry[];

  strategicKpis: StrategicKpi[];
  kpiProgressEntries: KpiProgressEntry[];
  addKpiProgressEntry: (entry: KpiProgressEntryInput) => void;
  getLatestKpiProgress: (strategicKpiId: string) => KpiProgressEntry | undefined;

  vaultReports: VaultReportRecord[];
  addVaultReport: (record: Omit<VaultReportRecord, 'id' | 'uploaded_by' | 'upload_date'>) => void;

  toolRecords: ToolRecord[];
  addToolRecord: (record: Omit<ToolRecord, 'id' | 'uploaded_by' | 'upload_date'>) => void;

  lessonLearnedRecords: LessonLearnedRecord[];
  addLessonLearnedRecord: (record: Omit<LessonLearnedRecord, 'id' | 'uploaded_by' | 'upload_date'>) => void;

  mediaUpdateRecords: MediaUpdateRecord[];
  addMediaUpdateRecord: (record: Omit<MediaUpdateRecord, 'id' | 'uploaded_by' | 'upload_date'>) => void;
  updateMediaUpdateRecord: (id: string, updates: Partial<MediaUpdateRecord>) => void;

  templateGuidelineRecords: TemplateGuidelineRecord[];
  addTemplateGuidelineRecord: (record: Omit<TemplateGuidelineRecord, 'id' | 'uploaded_by' | 'upload_date'>) => void;

  resourceCenterRecords: ResourceCenterRecord[];
  addResourceCenterRecord: (record: Omit<ResourceCenterRecord, 'id' | 'uploaded_by' | 'upload_date'>) => void;


  /**
   * Compute aggregated AOP plan totals from seeded national activity data.
   * Pass a subset of nationalActivities to scope it (e.g. filtered by SP/SO).
   * Leave undefined to aggregate ALL national activities.
   */
  computeAopTotals: (activities?: NationalActivity[]) => AopTotals;

  /**
   * Return the seeded ercs_target and ercs_budget for one national activity.
   * Falls back to plan-entry aggregation when the seeded value is 0.
   */
  getAopTargetForActivity: (naId: string) => { ercsTarget: number; ercsBudget: number; hqTarget: number; hqBudget: number; rbTarget: number; rbBudget: number };

  /**
   * Return the even share of hq_target and hq_budget for one national activity and project pair.
   */
  getProjectAopShare: (nationalActivityId: string, projectId: string) => { target: number; budget: number };
}

const DEFAULT_FILTERS: FilterState = {
  strategicPriorityId: 'ALL',
  strategicObjectiveId: 'ALL',
  nationalActivityId: 'ALL',
  regionId: ['ALL'],
  projectId: ['ALL'],
  zoneId: 'ALL',
  quarterId: 'ALL',
  responsibility: 'ALL',
  department: 'ALL',
  year: 'ALL',
  contributionType: 'ALL',
};

type RoleScope =
  | { kind: 'National' }
  | { kind: 'Regional'; regionId: string }
  | { kind: 'Zone'; zoneId: string; regionId: string }
  | { kind: 'Project'; projectId: string }
  | { kind: 'NonProgrammaticDepartment'; department: NonProgrammaticDepartment }
  | { kind: 'ProgramDirector' }
  | { kind: 'ProjectCoordinatorHQ' }
  | { kind: 'SystemAdmin' };

const BRANCH_HEAD_PREFIX = 'Branch Head — ';
const PROJECT_PREFIX = 'Project Coordinator — ';
const ZONE_SUFFIX = ' coordinators';
const DEPT_HEAD_PREFIX = 'Department Head — ';

const parseRoleScope = (role: UserRole, regions: Region[], projects: Project[], zones: Zone[]): RoleScope => {
  if (role === 'National Activity AOP') return { kind: 'National' };
  if (role === 'PMER Officer') return { kind: 'National' };
  if (role === 'PMER Head') return { kind: 'National' };
  if (role === 'Program Director') return { kind: 'ProgramDirector' };
  if (role === 'Project Coordinator — HQ') return { kind: 'ProjectCoordinatorHQ' };
  if (role === 'System Admin') return { kind: 'SystemAdmin' };
  if (role.startsWith(DEPT_HEAD_PREFIX)) {
    const department = role.slice(DEPT_HEAD_PREFIX.length) as NonProgrammaticDepartment;
    return { kind: 'NonProgrammaticDepartment', department };
  }
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

// READ scope: National/ProgramDirector sees all; Regional (Branch Head) sees every zone
// under their region (needed for aggregation/approvals); Zone sees only its
// own zone; Project sees only its own project; NonProgrammaticDepartment sees only its own department.
const roleOwnsPlanEntry = (
  role: UserRole,
  pe: PlanEntry,
  regions: Region[],
  projects: Project[],
  zones: Zone[],
  nonProgrammaticActivities: NonProgrammaticActivity[] = INITIAL_NON_PROGRAMMATIC_ACTIVITIES
): boolean => {
  const scope = parseRoleScope(role, regions, projects, zones);
  if (scope.kind === 'NonProgrammaticDepartment') {
    const npa = nonProgrammaticActivities.find(a => a.id === pe.non_programmatic_activity_id);
    return pe.scope_type === 'NonProgrammatic' && npa?.department === scope.department;
  }
  if (pe.scope_type === 'NonProgrammatic') {
    return scope.kind === 'ProgramDirector' || scope.kind === 'National';
  }
  if (scope.kind === 'National') return true;
  if (scope.kind === 'ProgramDirector' || scope.kind === 'ProjectCoordinatorHQ') return pe.scope_type === 'Project';
  if (scope.kind === 'SystemAdmin') return false;
  if (scope.kind === 'Regional') return pe.scope_type === 'Regional' && pe.region_id === scope.regionId;
  if (scope.kind === 'Zone') return pe.scope_type === 'Regional' && pe.zone_id === scope.zoneId;
  return pe.scope_type === 'Project' && pe.project_id === scope.projectId;
};

// WRITE scope: only Zone (own zone), Project (own project), or Department Head (own department) may write a
// PlanEntry/QuarterlyPlan/QuarterlyActual.
const roleCanWritePlanEntry = (
  role: UserRole,
  pe: PlanEntry,
  regions: Region[],
  projects: Project[],
  zones: Zone[],
  nonProgrammaticActivities: NonProgrammaticActivity[] = INITIAL_NON_PROGRAMMATIC_ACTIVITIES
): boolean => {
  const scope = parseRoleScope(role, regions, projects, zones);
  if (scope.kind === 'NonProgrammaticDepartment') {
    const npa = nonProgrammaticActivities.find(a => a.id === pe.non_programmatic_activity_id);
    return pe.scope_type === 'NonProgrammatic' && npa?.department === scope.department;
  }
  if (pe.scope_type === 'NonProgrammatic') return false;
  if (scope.kind === 'National') return true;
  if (scope.kind === 'Zone') return pe.scope_type === 'Regional' && pe.zone_id === scope.zoneId;
  if (scope.kind === 'ProjectCoordinatorHQ') return pe.scope_type === 'Project';
  if (scope.kind === 'Project') return pe.scope_type === 'Project' && pe.project_id === scope.projectId;
  return false;
};

const normalizePersistedRole = (raw: UserRole, regions: Region[], projects: Project[], zones: Zone[]): UserRole => {
  if (raw === 'National Activity AOP' || raw === 'PMER Officer' || raw === 'PMER Head' || raw === 'Program Director' || raw === 'Project Coordinator — HQ' || raw === 'System Admin') return raw;
  if (raw.startsWith(DEPT_HEAD_PREFIX)) return raw;
  if (parseRoleScope(raw, regions, projects, zones).kind !== 'National') return raw;
  return 'National Activity AOP';
};

const PERSISTENCE_KEY = 'ercs-aop-bottom-up-v16';

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
  const [nonProgrammaticActivities] = useState<NonProgrammaticActivity[]>(INITIAL_NON_PROGRAMMATIC_ACTIVITIES);
  const [nationalActivities, setNationalActivities] = useState<NationalActivity[]>(() => readPersisted('nationalActivities', INITIAL_NATIONAL_ACTIVITIES));
  const [regionActivityLinks, setRegionActivityLinks] = useState<RegionActivityLink[]>(() => readPersisted('regionActivityLinks', INITIAL_REGION_ACTIVITY_LINKS));
  const [quarters] = useState<Quarter[]>(FISCAL_QUARTERS);
  const [planEntries, setPlanEntries] = useState<PlanEntry[]>(() => readPersisted('planEntries', INITIAL_PLAN_ENTRIES));
  const [quarterlyPlans, setQuarterlyPlans] = useState<QuarterlyPlan[]>(() => readPersisted('quarterlyPlans', INITIAL_QUARTERLY_PLANS));
  const [quarterlyActuals, setQuarterlyActuals] = useState<QuarterlyActual[]>(() => readPersisted('quarterlyActuals', INITIAL_QUARTERLY_ACTUALS));
  const [monitoringRecords, setMonitoringRecords] = useState<MonitoringRecord[]>(() => {
    const loaded = readPersisted<MonitoringRecord[]>('monitoringRecords', INITIAL_MONITORING_RECORDS);
    return loaded.map(m => ({
      ...m,
      approval_status: m.approval_status || 'Approved',
    }));
  });
  const [kpiProgressEntries, setKpiProgressEntries] = useState<KpiProgressEntry[]>(() => readPersisted('kpiProgressEntries', INITIAL_KPI_PROGRESS_ENTRIES));
  const [vaultReports, setVaultReports] = useState<VaultReportRecord[]>(INITIAL_VAULT_REPORTS);
  const [toolRecords, setToolRecords] = useState<ToolRecord[]>(INITIAL_TOOLS);
  const [lessonLearnedRecords, setLessonLearnedRecords] = useState<LessonLearnedRecord[]>(INITIAL_LESSONS_LEARNED);
  const [mediaUpdateRecords, setMediaUpdateRecords] = useState<MediaUpdateRecord[]>(INITIAL_MEDIA_UPDATES);
  const [templateGuidelineRecords, setTemplateGuidelineRecords] = useState<TemplateGuidelineRecord[]>(INITIAL_TEMPLATES_GUIDELINES);
  const [resourceCenterRecords, setResourceCenterRecords] = useState<ResourceCenterRecord[]>(INITIAL_RESOURCE_CENTER);
  const [uomConfigs, setUomConfigs] = useState<UomFactorConfig[]>(() => readPersisted('uomConfigs', INITIAL_UOM_CONFIGS));
  const [statusThresholds, setStatusThresholds] = useState<StatusThresholdBand[]>(() => readPersisted('statusThresholds', INITIAL_STATUS_THRESHOLDS));
  const [quarterPeriodConfigs, setQuarterPeriodConfigs] = useState<QuarterPeriodConfig[]>(() => readPersisted('quarterPeriodConfigs', INITIAL_QUARTER_PERIOD_CONFIGS));
  const [filters, setFilters] = useState<FilterState>(() => ({ ...DEFAULT_FILTERS, ...readPersisted('filters', DEFAULT_FILTERS) }));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(PERSISTENCE_KEY, JSON.stringify({
        activeRoute, currentRole, selectedNationalActivityId, nationalActivities, regions, zones, projects,
        regionActivityLinks, planEntries, quarterlyPlans, quarterlyActuals, monitoringRecords, uomConfigs, filters, kpiProgressEntries,
        statusThresholds, quarterPeriodConfigs,
      }));
    } catch {
      // localStorage may be unavailable; in-memory state still works for the session.
    }
  }, [activeRoute, currentRole, selectedNationalActivityId, nationalActivities, regions, zones, projects, regionActivityLinks, planEntries, quarterlyPlans, quarterlyActuals, monitoringRecords, uomConfigs, filters, kpiProgressEntries, statusThresholds, quarterPeriodConfigs]);

  const showToast = (msg: string) => { setToastMessage(msg); setTimeout(() => setToastMessage(null), 3000); };
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  const getFilteredPlanEntries = () => planEntries.filter(pe => {
    if (!roleOwnsPlanEntry(currentRole, pe, regions, projects, zones, nonProgrammaticActivities)) return false;

    if (pe.scope_type === 'NonProgrammatic') {
      if (filters.department && filters.department !== 'ALL') {
        const npa = nonProgrammaticActivities.find(a => a.id === pe.non_programmatic_activity_id);
        if (!npa || npa.department !== filters.department) return false;
      }
      return true;
    }

    // Non-contributing filter
    if (filters.contributionType === 'Contributing' && pe.is_contributing === false) return false;
    if (filters.contributionType === 'Non-Contributing' && pe.is_contributing !== false) return false;

    const na = nationalActivities.find(n => n.id === pe.national_activity_id);

    // Responsibility filter (Region / Project / HQ / Both)
    if (filters.responsibility && filters.responsibility !== 'ALL') {
      const resp = filters.responsibility.toLowerCase();
      if (resp === 'region' && pe.scope_type !== 'Regional') return false;
      if (resp === 'project' && pe.scope_type !== 'Project') return false;
      if (resp === 'hq') {
        if (pe.scope_type !== 'Project') return false;
        if (!na || (na.hq_target === 0 && na.hq_budget === 0 && !na.responsibility.toUpperCase().includes('HQ') && na.responsibility.toLowerCase() !== 'both')) return false;
      }
      if (resp === 'both') {
        if (!na || na.responsibility.trim().toLowerCase() !== 'both') return false;
      }
    }

    // Department filter
    if (filters.department && filters.department !== 'ALL') {
      if (!na || na.department !== filters.department) return false;
    }

    // Year filter
    if (filters.year && filters.year !== 'ALL') {
      if (na && na.year && String(na.year) !== String(filters.year)) return false;
    }

    if (filters.strategicPriorityId !== 'ALL') {
      if (!na || na.strategic_priority_id !== filters.strategicPriorityId) return false;
    }
    if (filters.strategicObjectiveId !== 'ALL') {
      if (!na || na.strategic_objective_id !== filters.strategicObjectiveId) return false;
    }
    if (filters.nationalActivityId !== 'ALL' && pe.national_activity_id !== filters.nationalActivityId) return false;
    const rIds = filters.regionId;
    if (!rIds.includes('ALL') && !rIds.includes('NONE') && (!pe.region_id || !rIds.includes(pe.region_id))) return false;
    const pIds = filters.projectId;
    if (!pIds.includes('ALL') && !pIds.includes('NONE') && (!pe.project_id || !pIds.includes(pe.project_id))) return false;
    if (filters.zoneId && filters.zoneId !== 'ALL' && pe.zone_id !== filters.zoneId) return false;
    return true;
  });

  const getNationalActivitiesForRole = (): NationalActivity[] => {
    const scope = parseRoleScope(currentRole, regions, projects, zones);
    if (scope.kind === 'National' || scope.kind === 'SystemAdmin') return nationalActivities;
    if (scope.kind === 'ProgramDirector' || scope.kind === 'ProjectCoordinatorHQ') {
      return nationalActivities.filter(na =>
        (na.eligible_project_ids && na.eligible_project_ids.length > 0) ||
        (na.project_targets && Object.values(na.project_targets).some(t => ((t?.target ?? 0) > 0 || (t?.budget ?? 0) > 0))) ||
        planEntries.some(pe => pe.national_activity_id === na.id && pe.scope_type === 'Project')
      );
    }
    if (scope.kind === 'Regional') {
      return nationalActivities.filter(na =>
        (na.eligible_region_ids && na.eligible_region_ids.includes(scope.regionId)) ||
        Boolean(na.regional_targets?.[scope.regionId] && ((na.regional_targets[scope.regionId]?.target ?? 0) > 0 || (na.regional_targets[scope.regionId]?.budget ?? 0) > 0)) ||
        regionActivityLinks.some(l => l.national_activity_id === na.id && l.region_id === scope.regionId) ||
        planEntries.some(pe => pe.national_activity_id === na.id && pe.scope_type === 'Regional' && pe.region_id === scope.regionId)
      );
    }
    if (scope.kind === 'Zone') {
      const linkedActivityIds = new Set(
        regionActivityLinks.filter(l => l.region_id === scope.regionId && l.eligible_zone_ids?.includes(scope.zoneId)).map(l => l.national_activity_id)
      );
      return nationalActivities.filter(na =>
        linkedActivityIds.has(na.id) ||
        planEntries.some(pe => pe.national_activity_id === na.id && pe.zone_id === scope.zoneId) ||
        (na.eligible_region_ids && na.eligible_region_ids.includes(scope.regionId)) ||
        Boolean(na.regional_targets?.[scope.regionId] && ((na.regional_targets[scope.regionId]?.target ?? 0) > 0 || (na.regional_targets[scope.regionId]?.budget ?? 0) > 0))
      );
    }
    if (scope.kind === 'Project') {
      return nationalActivities.filter(na =>
        (na.eligible_project_ids && na.eligible_project_ids.includes(scope.projectId)) ||
        Boolean(na.project_targets?.[scope.projectId] && ((na.project_targets[scope.projectId]?.target ?? 0) > 0 || (na.project_targets[scope.projectId]?.budget ?? 0) > 0)) ||
        planEntries.some(pe => pe.national_activity_id === na.id && pe.scope_type === 'Project' && pe.project_id === scope.projectId)
      );
    }
    return nationalActivities;
  };

  const addNationalActivity = (na: NationalActivity) => {
    if (currentRole !== 'National Activity AOP') { showToast('Only National Activity AOP can create National Activities.'); return; }
    setNationalActivities(prev => {
      const idx = prev.findIndex(n => n.id === na.id || (na.code && n.code === na.code));
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], ...na };
        return next;
      }
      return [...prev, na];
    });
    showToast(`National Activity ${na.code} saved.`);
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
    if (!roleCanWritePlanEntry(currentRole, pe, regions, projects, zones, nonProgrammaticActivities)) { showToast('This user can only manage entries for their assigned scope.'); return; }

    if (pe.scope_type === 'NonProgrammatic') {
      const npa = nonProgrammaticActivities.find(n => n.id === pe.non_programmatic_activity_id);
      if (!npa) { showToast('Non-Programmatic Activity not found.'); return; }
      setPlanEntries(prev => [...prev, pe]);
      showToast(`Plan entry added for ${npa.name}.`);
      return;
    }

    if (pe.is_contributing === false) {
      setPlanEntries(prev => [...prev, pe]);
      showToast('Standalone non-contributing plan entry added.');
      return;
    }

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
    if (!roleCanWritePlanEntry(currentRole, pe, regions, projects, zones, nonProgrammaticActivities)) { showToast('This user can only edit entries for their assigned scope.'); return; }
    setPlanEntries(prev => prev.map(x => (x.id === pe.id ? pe : x)));
    if (pe.scope_type === 'NonProgrammatic') {
      showToast('Plan entry updated.');
      return;
    }
    if (pe.is_contributing === false) {
      showToast('Standalone non-contributing plan entry updated.');
      return;
    }
    const na = nationalActivities.find(n => n.id === pe.national_activity_id);
    showToast(`Plan entry updated. ${na?.code || ''}'s aggregated Target/Budget recalculates automatically.`);
  };

  const deletePlanEntry = (id: string) => {
    const old = planEntries.find(x => x.id === id);
    if (!old) return;
    if (!roleCanWritePlanEntry(currentRole, old, regions, projects, zones, nonProgrammaticActivities)) { showToast('This user can only delete entries for their assigned scope.'); return; }
    setPlanEntries(prev => prev.filter(x => x.id !== id));
    setQuarterlyPlans(prev => prev.filter(qp => qp.plan_entry_id !== id));
    setQuarterlyActuals(prev => prev.filter(a => a.plan_entry_id !== id));
    setMonitoringRecords(prev => prev.filter(m => m.plan_entry_id !== id));
    showToast("Plan entry and its linked records deleted.");
  };

  // -----------------------------------------------------------------------
  // QUARTERLY PLAN — Both Zone, Project, and Department Head rows now go through
  // Draft → Pending Approval → Approved/Rejected.
  // Zone rows: approved by Branch Head. Project & Dept rows: approved by Program Director.
  // -----------------------------------------------------------------------
  const upsertQuarterlyPlan = (qp: QuarterlyPlanInput) => {
    const parentEntry = planEntries.find(x => x.id === qp.plan_entry_id);
    if (!parentEntry || !roleCanWritePlanEntry(currentRole, parentEntry, regions, projects, zones, nonProgrammaticActivities)) {
      showToast('You can only enter Quarterly Plan values for your assigned scope.');
      return;
    }

    setQuarterlyPlans(prev => {
      const idx = prev.findIndex(x => x.plan_entry_id === qp.plan_entry_id && x.quarter_id === qp.quarter_id);
      const existing = idx >= 0 ? prev[idx] : undefined;

      // Block edits once Pending/Approved.
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
    const isOwningZone = scope.kind === 'Zone' && parentEntry?.zone_id === scope.zoneId;
    const isOwningProject = (scope.kind === 'Project' && parentEntry?.project_id === scope.projectId) || (scope.kind === 'ProjectCoordinatorHQ' && parentEntry?.scope_type === 'Project');
    const npa = nonProgrammaticActivities.find(a => a.id === parentEntry?.non_programmatic_activity_id);
    const isOwningDept = scope.kind === 'NonProgrammaticDepartment' && parentEntry?.scope_type === 'NonProgrammatic' && npa?.department === scope.department;
    if (!parentEntry || (!isOwningZone && !isOwningProject && !isOwningDept)) {
      showToast('Only the owning Zone Coordinator, Project Coordinator, or Department Head can submit this for approval.');
      return;
    }
    setQuarterlyPlans(prev => prev.map(qp => qp.plan_entry_id === plan_entry_id && qp.quarter_id === quarter_id
      ? { ...qp, approval_status: 'Pending Approval', submitted_at: new Date().toISOString(), rejection_reason: undefined }
      : qp));
    const approverLabel = (parentEntry.scope_type === 'Project' || parentEntry.scope_type === 'NonProgrammatic') ? 'Program Director' : 'Branch Head';
    showToast(`${quarter_id} Quarterly Plan submitted for ${approverLabel} approval.`);
  };

  const approveQuarterlyPlan = ({ plan_entry_id, quarter_id }: { plan_entry_id: string; quarter_id: QuarterId }) => {
    const scope = parseRoleScope(currentRole, regions, projects, zones);
    const parentEntry = planEntries.find(x => x.id === plan_entry_id);
    const isBranchHeadForEntry = scope.kind === 'Regional' && parentEntry?.region_id === scope.regionId;
    const isPMForEntry = (scope.kind === 'ProgramDirector' || scope.kind === 'ProjectCoordinatorHQ') && parentEntry?.scope_type === 'Project';
    const isPDForNonProg = scope.kind === 'ProgramDirector' && parentEntry?.scope_type === 'NonProgrammatic';
    if (!parentEntry || (!isBranchHeadForEntry && !isPMForEntry && !isPDForNonProg)) {
      showToast('Only the authorized approver (Branch Head or Program Director) can approve this.');
      return;
    }
    setQuarterlyPlans(prev => prev.map(qp => qp.plan_entry_id === plan_entry_id && qp.quarter_id === quarter_id
      ? { ...qp, approval_status: 'Approved', reviewed_at: new Date().toISOString() }
      : qp));
    showToast(`${quarter_id} Quarterly Plan approved.`);
  };

  const rejectQuarterlyPlan = ({ plan_entry_id, quarter_id, rejection_reason }: { plan_entry_id: string; quarter_id: QuarterId; rejection_reason: string }) => {
    if (!rejection_reason || !rejection_reason.trim()) { showToast('A rejection reason is required.'); return; }
    const scope = parseRoleScope(currentRole, regions, projects, zones);
    const parentEntry = planEntries.find(x => x.id === plan_entry_id);
    const isBranchHeadForEntry = scope.kind === 'Regional' && parentEntry?.region_id === scope.regionId;
    const isPMForEntry = (scope.kind === 'ProgramDirector' || scope.kind === 'ProjectCoordinatorHQ') && parentEntry?.scope_type === 'Project';
    const isPDForNonProg = scope.kind === 'ProgramDirector' && parentEntry?.scope_type === 'NonProgrammatic';
    if (!parentEntry || (!isBranchHeadForEntry && !isPMForEntry && !isPDForNonProg)) {
      showToast('Only the authorized approver (Branch Head or Program Director) can reject this.');
      return;
    }
    setQuarterlyPlans(prev => prev.map(qp => qp.plan_entry_id === plan_entry_id && qp.quarter_id === quarter_id
      ? { ...qp, approval_status: 'Rejected', reviewed_at: new Date().toISOString(), rejection_reason }
      : qp));
    const label = parentEntry.scope_type === 'Project'
      ? 'project can revise and resubmit'
      : parentEntry.scope_type === 'NonProgrammatic'
        ? 'department can revise and resubmit'
        : 'zone can revise and resubmit';
    showToast(`${quarter_id} Quarterly Plan rejected — ${label}.`);
  };

  // -----------------------------------------------------------------------
  // QUARTERLY ACTUAL — Both Zone, Project, and Department Head rows now go through
  // Draft → Pending Approval → Approved/Rejected.
  // Zone rows require an Approved Plan first (Branch Head approves actuals).
  // Project & Dept rows require an Approved Plan first (Program Director approves actuals).
  // -----------------------------------------------------------------------
  const upsertQuarterlyActual = (qa: QuarterlyActualInput) => {
    const parentEntry = planEntries.find(x => x.id === qa.plan_entry_id);
    if (!parentEntry || !roleCanWritePlanEntry(currentRole, parentEntry, regions, projects, zones, nonProgrammaticActivities)) {
      showToast('You can only enter Quarterly Actual values for your assigned scope.');
      return;
    }
    // Plan entries require an Approved Quarterly Plan first.
    const plan = quarterlyPlans.find(qp => qp.plan_entry_id === qa.plan_entry_id && qp.quarter_id === qa.quarter_id);
    if (!plan || plan.approval_status !== 'Approved') {
      showToast('The Quarterly Plan for this quarter must be Approved before entering Actuals.');
      return;
    }

    setQuarterlyActuals(prev => {
      const idx = prev.findIndex(a => a.plan_entry_id === qa.plan_entry_id && a.quarter_id === qa.quarter_id);
      const existing = idx >= 0 ? prev[idx] : undefined;

      // Block edits once Pending/Approved.
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
    const isOwningZone = scope.kind === 'Zone' && parentEntry?.zone_id === scope.zoneId;
    const isOwningProject = (scope.kind === 'Project' && parentEntry?.project_id === scope.projectId) || (scope.kind === 'ProjectCoordinatorHQ' && parentEntry?.scope_type === 'Project');
    const npa = nonProgrammaticActivities.find(a => a.id === parentEntry?.non_programmatic_activity_id);
    const isOwningDept = scope.kind === 'NonProgrammaticDepartment' && parentEntry?.scope_type === 'NonProgrammatic' && npa?.department === scope.department;
    if (!parentEntry || (!isOwningZone && !isOwningProject && !isOwningDept)) {
      showToast('Only the owning Zone Coordinator, Project Coordinator, or Department Head can submit this for approval.');
      return;
    }
    setQuarterlyActuals(prev => prev.map(qa => qa.plan_entry_id === plan_entry_id && qa.quarter_id === quarter_id
      ? { ...qa, approval_status: 'Pending Approval', submitted_at: new Date().toISOString(), rejection_reason: undefined }
      : qa));
    const approverLabel = (parentEntry.scope_type === 'Project' || parentEntry.scope_type === 'NonProgrammatic') ? 'Program Director' : 'Branch Head';
    showToast(`${quarter_id} Quarterly Actual submitted for ${approverLabel} approval.`);
  };

  const approveQuarterlyActual = ({ plan_entry_id, quarter_id }: { plan_entry_id: string; quarter_id: QuarterId }) => {
    const scope = parseRoleScope(currentRole, regions, projects, zones);
    const parentEntry = planEntries.find(x => x.id === plan_entry_id);
    const isBranchHeadForEntry = scope.kind === 'Regional' && parentEntry?.region_id === scope.regionId;
    const isPMForEntry = (scope.kind === 'ProgramDirector' || scope.kind === 'ProjectCoordinatorHQ') && parentEntry?.scope_type === 'Project';
    const isPDForNonProg = scope.kind === 'ProgramDirector' && parentEntry?.scope_type === 'NonProgrammatic';
    if (!parentEntry || (!isBranchHeadForEntry && !isPMForEntry && !isPDForNonProg)) {
      showToast('Only the Branch Head or Program Director can approve this.');
      return;
    }
    setQuarterlyActuals(prev => prev.map(qa => qa.plan_entry_id === plan_entry_id && qa.quarter_id === quarter_id
      ? { ...qa, approval_status: 'Approved', reviewed_at: new Date().toISOString() }
      : qa));
    showToast(`${quarter_id} Quarterly Actual approved.`);
  };

  const rejectQuarterlyActual = ({ plan_entry_id, quarter_id, rejection_reason }: { plan_entry_id: string; quarter_id: QuarterId; rejection_reason: string }) => {
    if (!rejection_reason || !rejection_reason.trim()) { showToast('A rejection reason is required.'); return; }
    const scope = parseRoleScope(currentRole, regions, projects, zones);
    const parentEntry = planEntries.find(x => x.id === plan_entry_id);
    const isBranchHeadForEntry = scope.kind === 'Regional' && parentEntry?.region_id === scope.regionId;
    const isPMForEntry = (scope.kind === 'ProgramDirector' || scope.kind === 'ProjectCoordinatorHQ') && parentEntry?.scope_type === 'Project';
    const isPDForNonProg = scope.kind === 'ProgramDirector' && parentEntry?.scope_type === 'NonProgrammatic';
    if (!parentEntry || (!isBranchHeadForEntry && !isPMForEntry && !isPDForNonProg)) {
      showToast('Only the Branch Head or Program Director can reject this.');
      return;
    }
    setQuarterlyActuals(prev => prev.map(qa => qa.plan_entry_id === plan_entry_id && qa.quarter_id === quarter_id
      ? { ...qa, approval_status: 'Rejected', reviewed_at: new Date().toISOString(), rejection_reason }
      : qa));
    const label = parentEntry.scope_type === 'Project'
      ? 'project can revise and resubmit'
      : parentEntry.scope_type === 'NonProgrammatic'
        ? 'department can revise and resubmit'
        : 'zone can revise and resubmit';
    showToast(`${quarter_id} Quarterly Actual rejected — ${label}.`);
  };

  const getMonitoringRecordForPlanEntry = (planEntryId: string) =>
    monitoringRecords.find(m => m.plan_entry_id === planEntryId);

  const upsertMonitoringRecord = (input: MonitoringRecordInput) => {
    if (currentRole !== 'PMER Officer') { showToast('Only the PMER Officer role can add or edit Monitoring Register entries.'); return; }
    const parentEntry = planEntries.find(x => x.id === input.plan_entry_id);
    if (!parentEntry) { showToast('Plan entry not found for this monitoring record.'); return; }
    const existing = monitoringRecords.find(m => m.plan_entry_id === input.plan_entry_id);
    if (existing && existing.approval_status === 'Pending Approval') {
      showToast('This monitoring record is currently pending approval and cannot be modified.');
      return;
    }
    setMonitoringRecords(prev => {
      const idx = prev.findIndex(m => m.plan_entry_id === input.plan_entry_id);
      const findingVal = input.finding_reason ?? input.finding;
      const recVal = input.recommendation_corrective_action ?? input.recommendation;
      const currentStatus: ApprovalStatus = existing?.approval_status === 'Rejected'
        ? 'Draft'
        : (input.approval_status || existing?.approval_status || 'Draft');
      const normalized: MonitoringRecord = {
        ...input,
        id: input.id || prev[idx]?.id || `mr-${input.plan_entry_id}`,
        finding: findingVal,
        finding_reason: findingVal,
        recommendation: recVal,
        recommendation_corrective_action: recVal,
        approval_status: currentStatus,
      };
      if (idx >= 0) { const copy = [...prev]; copy[idx] = normalized; return copy; }
      return [...prev, normalized];
    });
  };

  const submitMonitoringRecordForApproval = (planEntryId: string) => {
    if (currentRole !== 'PMER Officer') { showToast('Only the PMER Officer can submit monitoring records for approval.'); return; }
    const existing = monitoringRecords.find(m => m.plan_entry_id === planEntryId);
    if (!existing) { showToast('Monitoring record not found. Please save first.'); return; }
    if (existing.approval_status === 'Pending Approval') { showToast('Record is already pending approval.'); return; }
    if (existing.approval_status === 'Approved') { showToast('Record is already approved.'); return; }
    setMonitoringRecords(prev => prev.map(m => m.plan_entry_id === planEntryId ? {
      ...m,
      approval_status: 'Pending Approval',
      submitted_at: new Date().toISOString(),
      rejection_reason: undefined,
    } : m));
    showToast('Monitoring record submitted to PMER Head for approval.');
  };

  const approveMonitoringRecord = (planEntryId: string) => {
    if (currentRole !== 'PMER Head') { showToast('Only the PMER Head can approve monitoring records.'); return; }
    const existing = monitoringRecords.find(m => m.plan_entry_id === planEntryId);
    if (!existing) { showToast('Monitoring record not found.'); return; }
    setMonitoringRecords(prev => prev.map(m => m.plan_entry_id === planEntryId ? {
      ...m,
      approval_status: 'Approved',
      reviewed_at: new Date().toISOString(),
      rejection_reason: undefined,
    } : m));
    showToast('Monitoring record approved.');
  };

  const rejectMonitoringRecord = (planEntryId: string, reason: string) => {
    if (currentRole !== 'PMER Head') { showToast('Only the PMER Head can reject monitoring records.'); return; }
    if (!reason || !reason.trim()) { showToast('Rejection reason is required.'); return; }
    const existing = monitoringRecords.find(m => m.plan_entry_id === planEntryId);
    if (!existing) { showToast('Monitoring record not found.'); return; }
    setMonitoringRecords(prev => prev.map(m => m.plan_entry_id === planEntryId ? {
      ...m,
      approval_status: 'Rejected',
      reviewed_at: new Date().toISOString(),
      rejection_reason: reason.trim(),
    } : m));
    showToast('Monitoring record rejected.');
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

  const addUomConfig = (config: UomFactorConfig) => {
    if (currentRole !== 'System Admin') { showToast('Only System Admin can add UOM configurations.'); return; }
    if (uomConfigs.some(c => c.uom.toLowerCase() === config.uom.toLowerCase())) { showToast('This UOM already exists.'); return; }
    setUomConfigs(prev => [...prev, config]);
  };

  const addStatusThresholdBand = (band: StatusThresholdBand) => {
    setStatusThresholds(prev => [...prev, band]);
    showToast(`Threshold band "${band.label}" added.`);
  };

  const saveStatusThresholds = (bands: StatusThresholdBand[]) => {
    setStatusThresholds(bands);
    showToast('Status threshold bands saved successfully.');
  };

  const updateQuarterPeriodConfig = (id: QuarterId, date_range: string) => {
    setQuarterPeriodConfigs(prev => prev.map(c => c.id === id ? { ...c, date_range } : c));
    showToast(`Period ${id} range updated to ${date_range}.`);
  };

  const addVaultReport = (record: Omit<VaultReportRecord, 'id' | 'uploaded_by' | 'upload_date'>) => {
    const newRecord: VaultReportRecord = {
      ...record,
      id: `vr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      uploaded_by: currentRole,
      upload_date: new Date().toISOString().slice(0, 10),
    };
    setVaultReports(prev => [newRecord, ...prev]);
    showToast(`Report "${newRecord.title}" added to Repository Vault.`);
  };

  const addToolRecord = (record: Omit<ToolRecord, 'id' | 'uploaded_by' | 'upload_date'>) => {
    const newRecord: ToolRecord = {
      ...record,
      id: `tool-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      uploaded_by: currentRole,
      upload_date: new Date().toISOString().slice(0, 10),
    };
    setToolRecords(prev => [newRecord, ...prev]);
    showToast(`Tool "${newRecord.tool_name}" added to Tools repository.`);
  };

  const addLessonLearnedRecord = (record: Omit<LessonLearnedRecord, 'id' | 'uploaded_by' | 'upload_date'>) => {
    const newRecord: LessonLearnedRecord = {
      ...record,
      id: `ll-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      uploaded_by: currentRole,
      upload_date: new Date().toISOString().slice(0, 10),
    };
    setLessonLearnedRecords(prev => [newRecord, ...prev]);
    showToast(`Lesson "${newRecord.title}" recorded.`);
  };

  const addMediaUpdateRecord = (record: Omit<MediaUpdateRecord, 'id' | 'uploaded_by' | 'upload_date'>) => {
    const newRecord: MediaUpdateRecord = {
      ...record,
      id: `mu-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      uploaded_by: currentRole,
      upload_date: new Date().toISOString().slice(0, 10),
    };
    setMediaUpdateRecords(prev => [newRecord, ...prev]);
    showToast(`Media item "${newRecord.headline}" ${newRecord.status === 'Draft' ? 'saved as Draft' : 'published'}.`);
  };

  const updateMediaUpdateRecord = (id: string, updates: Partial<MediaUpdateRecord>) => {
    setMediaUpdateRecords(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    showToast(`Media item updated.`);
  };

  const addTemplateGuidelineRecord = (record: Omit<TemplateGuidelineRecord, 'id' | 'uploaded_by' | 'upload_date'>) => {
    const newRecord: TemplateGuidelineRecord = {
      ...record,
      id: `tg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      uploaded_by: currentRole,
      upload_date: new Date().toISOString().slice(0, 10),
    };
    setTemplateGuidelineRecords(prev => [newRecord, ...prev]);
    showToast(`Template/Guideline "${newRecord.template_name}" added.`);
  };

  const addResourceCenterRecord = (record: Omit<ResourceCenterRecord, 'id' | 'uploaded_by' | 'upload_date'>) => {
    const newRecord: ResourceCenterRecord = {
      ...record,
      id: `rc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      uploaded_by: currentRole,
      upload_date: new Date().toISOString().slice(0, 10),
    };
    setResourceCenterRecords(prev => [newRecord, ...prev]);
    showToast(`Resource item "${newRecord.resource_title}" added.`);
  };

  // -----------------------------------------------------------------------
  // NATIONAL AOP PLAN TOTALS — aggregate the seeded targets from national
  // activities. This is the authoritative planned-target data set, sourced
  // directly from the ERCS 2019 AOP Excel file. Pages use these to compute
  // achievement against the plan even before any user-entered plan entries
  // exist, keeping the dashboard meaningful from day one.
  // -----------------------------------------------------------------------
  const computeAopTotals = (activities?: NationalActivity[]): AopTotals => {
    const src = activities ?? nationalActivities;
    const byRegion: Record<string, { target: number; budget: number }> = {};
    const byProject: Record<string, { target: number; budget: number; currency?: 'ETB' | 'EUR' }> = {};
    const byStrategicPriority: Record<string, { target: number; budget: number }> = {};
    const byStrategicObjective: Record<string, { target: number; budget: number }> = {};
    regions.forEach(r => { byRegion[r.id] = { target: 0, budget: 0 }; });
    projects.forEach(p => { byProject[p.id] = { target: 0, budget: 0, currency: p.currency || 'ETB' }; });

    let ercsTarget = 0, ercsBudget = 0, hqTarget = 0, hqBudget = 0, rbTarget = 0, rbBudget = 0;

    src.forEach(na => {
      ercsTarget += na.ercs_target ?? 0;
      ercsBudget += na.ercs_budget ?? 0;
      hqTarget += na.hq_target ?? 0;
      hqBudget += na.hq_budget ?? 0;
      rbTarget += na.rb_target ?? 0;
      rbBudget += na.rb_budget ?? 0;

      // Per-region
      if (na.regional_targets) {
        Object.entries(na.regional_targets).forEach(([regId, vals]) => {
          if (!byRegion[regId]) byRegion[regId] = { target: 0, budget: 0 };
          byRegion[regId].target += vals.target ?? 0;
          byRegion[regId].budget += vals.budget ?? 0;
        });
      }

      // Per-project: direct accumulation from na.project_targets (from AOP_alignment.xlsx)
      // Note: Non-contributing project activities are intentionally stored on project.project_only_activities
      // and are NOT in nationalActivities, ensuring they are excluded from AOP aggregations.
      if (na.project_targets) {
        Object.entries(na.project_targets).forEach(([projId, vals]) => {
          if (!byProject[projId]) {
            const p = projects.find(proj => proj.id === projId);
            byProject[projId] = { target: 0, budget: 0, currency: p?.currency || 'ETB' };
          }
          byProject[projId].target += vals.target ?? 0;
          byProject[projId].budget += vals.budget ?? 0;
        });
      }

      // Per-strategic-priority
      const spId = na.strategic_priority_id;
      if (spId) {
        if (!byStrategicPriority[spId]) byStrategicPriority[spId] = { target: 0, budget: 0 };
        byStrategicPriority[spId].target += na.ercs_target ?? 0;
        byStrategicPriority[spId].budget += na.ercs_budget ?? 0;
      }

      // Per-strategic-objective
      const soId = na.strategic_objective_id;
      if (soId) {
        if (!byStrategicObjective[soId]) byStrategicObjective[soId] = { target: 0, budget: 0 };
        byStrategicObjective[soId].target += na.ercs_target ?? 0;
        byStrategicObjective[soId].budget += na.ercs_budget ?? 0;
      }
    });

    return { ercsTarget, ercsBudget, hqTarget, hqBudget, rbTarget, rbBudget, byRegion, byProject, byStrategicPriority, byStrategicObjective };
  };

  const getAopTargetForActivity = (naId: string) => {
    const na = nationalActivities.find(n => n.id === naId);
    if (!na) return { ercsTarget: 0, ercsBudget: 0, hqTarget: 0, hqBudget: 0, rbTarget: 0, rbBudget: 0 };
    // Prefer seeded values; only fall back to 0 if truly absent
    return {
      ercsTarget: na.ercs_target ?? 0,
      ercsBudget: na.ercs_budget ?? 0,
      hqTarget: na.hq_target ?? 0,
      hqBudget: na.hq_budget ?? 0,
      rbTarget: na.rb_target ?? 0,
      rbBudget: na.rb_budget ?? 0,
    };
  };

  const getProjectAopShare = (nationalActivityId: string, projectId: string): { target: number; budget: number } => {
    const na = nationalActivities.find(n => n.id === nationalActivityId);
    if (!na || !na.project_targets || !na.project_targets[projectId]) {
      return { target: 0, budget: 0 };
    }
    return {
      target: na.project_targets[projectId].target ?? 0,
      budget: na.project_targets[projectId].budget ?? 0,
    };
  };

  return (
    <AppContext.Provider value={{
      activeRoute, setActiveRoute, currentRole, setCurrentRole, toastMessage, showToast,
      reportFocusSection, setReportFocusSection,
      selectedNationalActivityId, setSelectedNationalActivityId,
      strategicPriorities, strategicObjectives,
      nonProgrammaticActivities,
      nationalActivities, addNationalActivity, deleteNationalActivity, addEligibleScope, getNationalActivitiesForRole,
      regions, addRegion,
      zones, addZone,
      projects, addProject, quarters,
      regionActivityLinks, addRegionActivityLink, deleteRegionActivityLink,
      planEntries, addPlanEntry, updatePlanEntry, deletePlanEntry,
      quarterlyPlans, upsertQuarterlyPlan, submitQuarterlyPlanForApproval, approveQuarterlyPlan, rejectQuarterlyPlan,
      quarterlyActuals, upsertQuarterlyActual, submitQuarterlyActualForApproval, approveQuarterlyActual, rejectQuarterlyActual,
      monitoringRecords, upsertMonitoringRecord, getMonitoringRecordForPlanEntry,
      submitMonitoringRecordForApproval, approveMonitoringRecord, rejectMonitoringRecord,
      uomConfigs, addUomConfig,
      statusThresholds, setStatusThresholds, addStatusThresholdBand, saveStatusThresholds,
      quarterPeriodConfigs, setQuarterPeriodConfigs, updateQuarterPeriodConfig,
      filters, setFilters, resetFilters, getFilteredPlanEntries,
      computeAopTotals, getAopTargetForActivity, getProjectAopShare,
      strategicKpis, kpiProgressEntries, addKpiProgressEntry, getLatestKpiProgress,
      vaultReports, addVaultReport,
      toolRecords, addToolRecord,
      lessonLearnedRecords, addLessonLearnedRecord,
      mediaUpdateRecords, addMediaUpdateRecord, updateMediaUpdateRecord,
      templateGuidelineRecords, addTemplateGuidelineRecord,
      resourceCenterRecords, addResourceCenterRecord,
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