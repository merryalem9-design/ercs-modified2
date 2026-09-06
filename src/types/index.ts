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

export type NonProgrammaticDepartment =
  | 'Legal & Contract Administrator Department'
  | 'Humanitarian Supply Chain Department'
  | 'SG Office';

export interface NonProgrammaticActivity {
  id: string;
  department: NonProgrammaticDepartment;
  name: string;              // e.g. "Defend the Society from any legal claims"
  uom?: string;               // e.g. "Percentage", "No. of procurements" — some rows have no UOM (admin budget lines)
  annual_target?: number;     // OPTIONAL — several rows have no target, only budget.
  annual_budget: number;
  is_admin_budget_line?: boolean; // true for rows like "Administrative budget" that have no measurable target
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
  uom?: string;
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

export type ScopeType = 'Regional' | 'Project' | 'NonProgrammatic';

export type UserRole =
  | 'National Activity AOP'
  | `Branch Head — ${string}`
  | `Project Coordinator — ${string}`
  | 'Project Coordinator — HQ'
  | 'PMER Officer'
  | 'System Admin'
  | 'Program Director'
  | `${string} coordinators`
  | 'Department Head — Legal & Contract Administrator Department'
  | 'Department Head — Humanitarian Supply Chain Department'
  | 'Department Head — SG Office';

export type ApprovalStatus = 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected';

export interface PlanEntry {
  id: string;
  national_activity_id?: string;
  non_programmatic_activity_id?: string;
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
  /** Optional beneficiary demographics breakdown (Project scope) */
  target_female?: number;
  target_male?: number;
  target_youth?: number;
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
  /** Optional beneficiary demographics breakdown (Project scope) */
  actual_female?: number;
  actual_male?: number;
  actual_youth?: number;
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
  finding_reason?: string;
  severity?: FindingSeverity;
  recommendation?: string;
  recommendation_corrective_action?: string;
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
  responsibility?: 'ALL' | 'Region' | 'Project' | 'HQ' | 'Both';
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
  /** Key Performance Indicator (KPI) title / name from Column 2 */
  kpi: string;
  /** Narrative description / indicator definition from Column 3 */
  description: string;
  /** Free text, not a number — source values mix numbers, "TBD", "NA", and descriptive strings. */
  baseline: string;
  /** Free text — same reasoning as baseline. */
  target_2030: string;
  means_of_verification: string;
  frequency: string;
  notes?: string;
}

export interface KpiProgressEntry {
  id: string;
  strategic_kpi_id: string;
  /** Free text, e.g. "FY2026 Annual", "Mid-Term 2027" — not the fiscal QuarterId type. */
  period: string;
  /** Free text — may include units/commentary. */
  value: string;
  means_of_verification?: string;
  recorded_by: string;
  /** ISO format YYYY-MM-DD. */
  date: string;
  note?: string;
}

// ---------------------------------------------------------------------------
// KNOWLEDGE MANAGEMENT — PMER-MIS 6-Branch Module
// ---------------------------------------------------------------------------

export interface VaultReportRecord {
  id: string;
  title: string;                    // Mandatory
  report_category: 'Assessments' | 'Monitoring reports' | 'Evaluation reports' | 'PDM reports' | string; // Mandatory, dropdown+Other
  file_format: 'PDF' | 'Word' | 'Excel' | 'PowerPoint' | string; // Mandatory, dropdown+Other
  file: { name: string; dataUrl: string; sizeBytes: number }; // Mandatory
  description: string;              // Mandatory, 50-150 words guidance in UI helper text
  program_project_name: string;     // Mandatory
  sector_cluster: string[];         // Mandatory, multi-select dropdown+Other
  region_location: string;          // Mandatory, cascading dropdown (reuse existing Region/Zone data for the cascade)
  reporting_period: string;         // Mandatory, date or range
  author: string;                   // Mandatory
  uploaded_by: string;              // Mandatory, SYSTEM-CAPTURED — never a manual input, populate from current role/session
  upload_date: string;              // Mandatory, SYSTEM-CAPTURED — populate with today's date on save
  language: 'English' | 'Amharic' | string; // Mandatory, dropdown+Other
  keywords: string[];               // Mandatory
  access_level: 'Public' | 'Internal' | 'Restricted'; // Mandatory, dropdown
  donor?: string;                   // Optional
  version?: string;                 // Optional
  review_status?: 'Draft' | 'Under review' | 'Approved'; // Optional, dropdown
  related_indicators?: string;      // Optional
  expiry_review_date?: string;      // Optional
}

export interface ToolRecord {
  id: string;
  tool_name: string;                // Mandatory
  tool_sub_category: 'PDM tool' | 'Needs assessment tool' | 'Beneficiary registration tool' | string; // Mandatory, dropdown+Other
  kobo_form_link: string;           // Mandatory, URL
  xlsform_version: string;          // Mandatory
  associated_program: string;       // Mandatory
  target_sector: string;            // Mandatory, dropdown
  data_collection_mode: 'Mobile (KoboCollect)' | 'Web form' | string; // Mandatory, dropdown
  has_enumerator_guidance?: boolean; // helper flag for conditional
  enumerator_guidance?: { name: string; dataUrl: string; sizeBytes: number }; // CONDITIONAL — required only if the user indicates a guide exists
  languages: string[];              // Mandatory, multi-select
  region_coverage: string;          // Mandatory, cascading dropdown
  status: 'Active' | 'Inactive' | 'Retired'; // Mandatory, dropdown
  owner: string;                    // Mandatory
  uploaded_by: string;              // Mandatory, system-captured
  upload_date: string;              // Mandatory, system-captured
  keywords: string[];               // Mandatory
  access_level: 'Public' | 'Internal' | 'Restricted'; // Mandatory
  last_updated_date?: string;       // Optional
  related_indicators?: string;      // Optional
}

export interface LessonLearnedRecord {
  id: string;
  title: string;                    // Mandatory
  sub_category: 'Video link' | 'Document' | 'Other' | string; // Mandatory, dropdown+Other
  resource: { type: 'url'; value: string } | { type: 'file'; name: string; dataUrl: string; sizeBytes: number }; // Mandatory — URL if Video link, file if Document
  thematic_area: string;            // Mandatory, dropdown
  key_takeaway: string;             // Mandatory
  related_project: string;          // Mandatory
  region_location: string;          // Mandatory, dropdown
  event_date: string;               // Mandatory
  submitted_by: string;             // Mandatory
  video_duration?: string;          // CONDITIONAL — required only when sub_category === 'Video link'
  language: string;                 // Mandatory, dropdown
  keywords: string[];               // Mandatory
  access_level: 'Public (all staff)' | 'Internal' | 'Restricted'; // Mandatory
  uploaded_by: string;              // Mandatory, system-captured
  upload_date: string;              // Mandatory, system-captured
}

export interface MediaUpdateRecord {
  id: string;
  headline: string;                 // Mandatory — card headline in the feed
  category: 'PMER update' | 'Field story' | 'Announcement' | string; // Mandatory — drives the card's left accent color
  publish_date: string;             // Mandatory — controls sort order
  author: string;                   // Mandatory
  summary: string;                  // Mandatory, short (1-2 sentences shown on card)
  body: string;                     // Mandatory, rich text — full write-up shown on "Read more"
  cover_image?: { name: string; dataUrl: string }; // Optional
  related_link?: string;            // Optional
  status: 'Draft' | 'Published';    // Mandatory
  pin_to_top?: boolean;             // Optional, default false
  pin_until?: string;               // Optional, date string for pin expiry
  access_level: 'Public' | 'Internal' | 'Restricted'; // Mandatory
  uploaded_by: string;              // Mandatory, system-captured
  upload_date: string;              // Mandatory, system-captured
}

export interface TemplateGuidelineRecord {
  id: string;
  template_name: string;            // Mandatory
  template_type: 'ToR template' | 'Logframe template' | 'Report template' | 'Checklist' | string; // Mandatory, dropdown+Other
  file: { name: string; dataUrl: string; sizeBytes: number }; // Mandatory
  description: string;              // Mandatory — when to use
  applicable_module: 'Planning' | 'Reporting' | 'M&E' | 'Knowledge management'; // Mandatory, dropdown
  owner: string;                    // Mandatory
  language: string;                 // Mandatory, dropdown
  uploaded_by: string;              // Mandatory, system-captured
  upload_date: string;              // Mandatory, system-captured
  access_level: 'Public' | 'Internal' | 'Restricted'; // Mandatory
  version?: string;                 // Optional
}

export interface ResourceCenterRecord {
  id: string;
  resource_title: string;           // Mandatory
  resource_type: 'External link' | 'Glossary term' | 'Donor guideline' | 'FAQ' | string; // Mandatory, dropdown+Other
  link_or_definition: string;       // Mandatory — URL if External link/Donor guideline, definition text if Glossary term/FAQ
  source_organization: string;      // Mandatory
  relevant_sector: string;          // Mandatory, dropdown
  description: string;              // Mandatory
  keywords: string[];               // Mandatory
  access_level: 'Public' | 'Internal' | 'Restricted'; // Mandatory
  uploaded_by: string;              // Mandatory, system-captured
  upload_date: string;              // Mandatory, system-captured
}