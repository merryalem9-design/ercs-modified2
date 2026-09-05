// src/types/index.ts
export interface StrategicPriority {
  id: string;
  code: string;
  name: string;
  objective: string;
}

export interface StrategicObjective {
  id: string;
  strategic_priority_id: string;
  code: string;   // e.g. "1.1"
  name: string;
}

export type Responsibility = 'HQ' | 'Branch' | 'Both' | 'RB' | string;

export interface Region { id: string; name: string; }

export interface Zone {
  id: string;
  region_id: string;
  name: string;
}

export interface NationalActivity {
  id: string;
  strategic_priority_id: string;
  strategic_objective_id: string;
  code: string;
  description: string;
  uom: string;
  responsibility: Responsibility;
  department?: string;
  year?: number;
  region_id?: string;
  zone_id?: string;
  activity_description: string;
  eligible_region_ids: string[];
  eligible_project_ids: string[];
  ercs_target?: number;
  ercs_budget?: number;
  hq_target?: number;
  hq_budget?: number;
  rb_target?: number;
  rb_budget?: number;
  regional_targets?: Record<string, { target: number; budget: number }>;
  project_targets?: Record<string, { target: number; budget: number }>;
}

/**
 * NEW — the Branch Head's link between a National Activity and their Region.
 * Carries no Target/Budget of its own — those live on the zone-level
 * PlanEntrys created against it. Mirrors NationalActivity.eligible_*_ids in
 * spirit: eligible_zone_ids gates which Zones may create a PlanEntry here.
 */
export interface RegionActivityLink {
  id: string;
  national_activity_id: string;
  region_id: string;
  activity_name: string;
  activity_description: string;
  eligible_zone_ids: string[];
}

export interface ProjectOnlyActivity {
  id: string;
  name: string;
  uom: string;
  target: number;
  budget: number;
  raw_code?: string | null;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  budget?: number;
  donor?: string;
  target?: string | null;
  start_date?: string;
  end_date?: string;
  location?: string;
  totalBudget?: string | number;
  startDate?: string;
  endDate?: string;
  totalBeneficiaries?: number | null;
  currency?: 'ETB' | 'EUR';
  project_only_activities?: ProjectOnlyActivity[];
}

export type ScopeType = 'Regional' | 'Project';

export type UserRole =
  | 'National Activity AOP'
  | `Branch Head — ${string}`
  | `Project Coordinator — ${string}`
  | 'Project Coordinator — HQ'
  | 'PMER Officer'
  | 'System Admin'
  | 'Program Director'
  | `${string} coordinators`;

export type ApprovalStatus = 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected';

export interface PlanEntry {
  id: string;
  national_activity_id: string;
  scope_type: ScopeType;
  region_id?: string;   // set when scope_type === 'Regional' — ALWAYS the zone's parent region
  project_id?: string;  // set when scope_type === 'Project'
  annual_target: number;
  annual_budget: number;
  activity_code: string;
  activity_name: string;
  activity_description: string;
  approval_status: ApprovalStatus;
  submitted_at?: string;
  reviewed_at?: string;
  rejection_reason?: string;
  /** NEW — set when scope_type === 'Regional'. Which zone this entry belongs to. */
  zone_id?: string;
  /** NEW — set when scope_type === 'Regional'. Parent RegionActivityLink. */
  region_activity_link_id?: string;
  /** Non-contributing project activities */
  is_contributing?: boolean;
  uom?: string;
}

export type QuarterId = 'Q1' | 'Q2' | 'Q3' | 'Q4';
export interface Quarter { id: QuarterId; label: string; }

/** NEW — the Quarter filter/tab value used by FilterBar and detail-page tabs. */
export type QuarterFilterValue = 'ALL' | 'SEMI' | 'NINE_MONTH' | QuarterId;

export interface QuarterlyPlan {
  id: string;
  plan_entry_id: string;
  quarter_id: QuarterId;
  target: number;
  budget: number;
  approval_status: ApprovalStatus;
  submitted_at?: string;
  reviewed_at?: string;
  rejection_reason?: string;
}

export interface QuarterlyActual {
  id: string;
  plan_entry_id: string;
  quarter_id: QuarterId;
  actual: number;
  expenditure: number;
  comment?: string;
  approval_status: ApprovalStatus;
  submitted_at?: string;
  reviewed_at?: string;
  rejection_reason?: string;
}

export interface UomFactorConfig {
  uom: string;
  factor: number;
}

export type MonitoringQuarterSelection = 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Annual';
export type MonitoringMethod = 'Field visit' | 'Desk review' | 'Remote' | 'Joint';
export type VerificationResult = 'Fully verified' | 'Partially verified' | 'Not verified' | 'Unable to verify';
export type DataQualityConcern = 'None' | 'Validity' | 'Integrity' | 'Precision' | 'Reliability' | 'Timeliness';
export type QualityRating = 'Good' | 'Satisfactory' | 'Needs improvement' | 'Poor' | 'N/A';
export type FindingSeverity = 'Critical' | 'High' | 'Medium' | 'Low';
export type MonitoringStatus = 'Open' | 'In Progress' | 'Closed';

export interface MonitoringRecord {
  id: string;
  plan_entry_id: string;
  quarter_id: MonitoringQuarterSelection | '';
  monitoring_date?: string;
  monitoring_method?: MonitoringMethod;
  verified_by?: string;
  verified_achieved?: number;
  verification_result?: VerificationResult;
  data_quality_concern?: DataQualityConcern;
  evidence_checked?: string;
  quality_rating?: QualityRating;
  finding?: string;
  severity?: FindingSeverity;
  recommendation?: string;
  responsible?: string;
  due_date?: string;
  status?: MonitoringStatus;
  remarks?: string;
}

export interface FilterState {
  strategicPriorityId: string;
  strategicObjectiveId: string;
  nationalActivityId: string;
  /** Multi-select: 'ALL' and 'NONE' live in a single-element array; real IDs are combined with OR. */
  regionId: string[];
  /** Multi-select: 'ALL' and 'NONE' live in a single-element array; real IDs are combined with OR. */
  projectId: string[];
  /** NEW — filters PlanEntries/QuarterlyPlans down to a single Zone. 'ALL' means no zone restriction. */
  zoneId: string;
  quarterId: QuarterFilterValue;
  responsibility?: 'ALL' | 'Region' | 'Project' | 'HQ';
  department?: string;
  year?: string;
  contributionType?: 'ALL' | 'Contributing' | 'Non-Contributing';
}

export interface StatusThresholdBand {
  id: string;
  label: string;
  lower_bound: number;
  requires_narrative: boolean;
  color?: string;
}

export interface QuarterPeriodConfig {
  id: QuarterId;
  label: string;
  date_range: string;
}

// ---------------------------------------------------------------------------
// STRATEGIC KPI TRACKING — additive, independent feature. Tracks outcome-
// level KPIs against the ERCS Five-Year Strategic Plan (2025–2030), keyed to
// the existing StrategicObjective hierarchy above. Deliberately NOT linked
// to PlanEntry/MonitoringRecord — there is no reliable per-activity mapping
// to individual KPIs in the source data.
// ---------------------------------------------------------------------------
export interface StrategicKpi {
  id: string;
  strategic_priority_id: string;
  strategic_objective_id: string;
  description: string;
  notes: string;
  /** Free text, not a number — source values mix numbers, "TBD", "NA", and descriptive strings. */
  baseline: string;
  /** Free text — same reasoning as baseline. */
  target_2030: string;
  means_of_verification: string;
  frequency: string;
}

export interface KpiProgressEntry {
  id: string;
  strategic_kpi_id: string;
  /** Free text, e.g. "FY2026 Annual", "Mid-Term 2027" — not the fiscal QuarterId type. */
  period: string;
  /** Free text — may include units/commentary. */
  value: string;
  recorded_by: string;
  /** ISO format YYYY-MM-DD. */
  date: string;
  note?: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: string;       // e.g. 'Strategic Planning', 'Disaster Management', 'Health', 'Institutional', 'PMER'
  summary: string;
  version: string;        // e.g. 'v1.0'
  published_date: string; // display string, e.g. '15 Jan 2025'
}