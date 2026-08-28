// src/types/index.ts
export interface StrategicPriority {
  id: string;
  code: string;
  name: string;
  objective: string;
}

export type Responsibility = 'HQ' | 'Branch' | 'Both';

export interface Region { id: string; name: string; }

export interface Zone {
  id: string;
  region_id: string;
  name: string;
}

export interface NationalActivity {
  id: string;
  strategic_priority_id: string;
  code: string;
  description: string;
  uom: string;
  responsibility: Responsibility;
  region_id?: string;
  zone_id?: string;
  activity_description: string;
  eligible_region_ids: string[];
  eligible_project_ids: string[];
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

export interface Project { id: string; name: string; }

export type ScopeType = 'Regional' | 'Project';

export type UserRole =
  | 'National Activity AOP'
  | `Branch Head — ${string}`
  | `Project Coordinator — ${string}`
  | 'Monitor'
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
  nationalActivityId: string;
  regionId: string;
  projectId: string;
  /** NEW — filters PlanEntries/QuarterlyPlans down to a single Zone. 'ALL' means no zone restriction. */
  zoneId: string;
  quarterId: QuarterFilterValue;
}