// src/types/index.ts
// ---------------------------------------------------------------------------
// SIMPLIFIED DATA MODEL
// The goal at this stage is to make one pipeline crystal clear:
//
//   Strategic Priority (grouping)
//     -> National Activity (code/description/uom + which Regions/Projects
//                            are allowed to execute it; its Target and
//                            Budget are never stored, they are always the
//                            live sum of its linked Plan Entries)
//       -> Plan Entry (data entry — the annual target/budget for a
//                       Region/Project executing against a National Activity)
//         -> Quarterly Plan (data entry — Q1-Q4 breakdown of that Plan
//                             Entry; does NOT overwrite the Plan Entry, just
//                             reconciles against it. EACH QUARTER has its own
//                             Draft -> Pending Approval -> Approved/Rejected
//                             cycle, submitted by the Coordinator and
//                             approved by the National Activity AOP. Once
//                             Approved, that quarter is locked from editing.)
//           -> Quarterly Actual (data entry — reported per quarter, measured
//                                 against that quarter's Quarterly Plan. Goes
//                                 through the SAME per-quarter approval cycle
//                                 as Quarterly Plan, independently.)
//             -> Monitoring Record (M&E data entry — verifies a Plan Entry's
//                                    Reported Achieved figure for a chosen
//                                    Quarter/Annual period against evidence.
//                                    One record per Plan Entry, always linked
//                                    back to that exact National-Activity-
//                                    linked execution entry. Only the
//                                    'Monitor' role may create/edit these.)
//             -> Beneficiaries = Actual x UoM Conversion Factor   (conversion)
//               -> Summed by Strategic Priority / National Activity / Region / Project (aggregation)
//                 -> Report Page — the "Approved" view only counts Plan
//                    Entries AND Quarterly Plan/Actual rows that are
//                    themselves Approved; the "Draft" view shows everything
//                    not yet Approved.                            (reporting)
// ---------------------------------------------------------------------------

/** Top-level grouping — a Strategic Priority that National Activities roll up into. */
export interface StrategicPriority {
  id: string;
  code: string;      // e.g. "SP1"
  name: string;       // e.g. "Disaster Preparedness and Response (DPR)"
  objective: string;  // e.g. "Strategy Objective 1.1: Enhance disaster preparedness measures..."
}

/** Who owns delivery of a National Activity. */
export type Responsibility = 'HQ' | 'Branch' | 'Both';

export interface Region { id: string; name: string; }

/** A Zone is a sub-division of a Region (Ethiopian admin structure: Region > Zone). */
export interface Zone {
  id: string;
  region_id: string; // which Region this Zone belongs to
  name: string;
}

/**
 * The top-level "what" — a National Activity. No annual_target/annual_budget
 * is stored here — its aggregate Target and Budget are always computed live
 * as the sum of the Plan Entries linked to it (see sumTarget/sumBudget in
 * utils/calculations). There is nothing to set and nothing that can ever get
 * out of sync.
 *
 * The National Activity AOP can create new National Activities (see
 * `eligible_region_ids`/`eligible_project_ids` below) and delete ones that
 * have zero linked Plan Entries. A National Activity that already has one or
 * more linked Plan Entries (Regional or Project) can never be deleted.
 */
export interface NationalActivity {
  id: string;
  strategic_priority_id: string; // links up to a StrategicPriority
  code: string;          // e.g. "Activity 1.1.8"
  description: string;
  uom: string;            // Unit of Measure, e.g. "Person", "House Hold (HH)"
  responsibility: Responsibility; // HQ, Branch, or Both
  region_id?: string;     // optional — set when this activity is scoped to a specific Region
  zone_id?: string;       // optional — set when this activity is scoped to a specific Zone within that Region
  /**
   * Full narrative description of this National Activity, sourced from the
   * "Description" column of the Excel workbook's National Aggregated sheet.
   * Distinct from `description` above (which is really the Activity
   * Name/title) — this is the longer explanatory text.
   */
  activity_description: string;
  /**
   * Which Regions/Projects are allowed to submit a Plan Entry against this
   * National Activity. For the 10 original Excel-sourced activities this is
   * derived from which Region/Project sheets actually contained a row for
   * that activity. For a National Activity created through the "Add
   * National Activity" flow, this is exactly whatever the AOP selected at
   * creation time (plus anything added later via "+ Add Project" inside the
   * Plan Entry wizard).
   *
   * This is what makes the Annual Plan / sidebar navigation, and the "Add
   * Plan Entry" wizard, show only the National Activities that are actually
   * relevant to a given Region/Project Coordinator — a Project/Region that
   * was never linked to an activity in the source data can't spontaneously
   * add a Plan Entry under it.
   */
  eligible_region_ids: string[];
  eligible_project_ids: string[];
}

export interface Project { id: string; name: string; }

export type ScopeType = 'Regional' | 'Project';

export type UserRole =
  | 'National Activity AOP'
  | `Regional Coordinator — ${string}`
  | `Project Coordinator — ${string}`
  | 'Monitor';

/**
 * Shared approval lifecycle, reused by Plan Entry, Quarterly Plan and
 * Quarterly Actual. Draft/Rejected are freely editable by the Coordinator
 * who owns the record; Pending Approval is awaiting the National Activity
 * AOP's decision; Approved is locked — the Coordinator can no longer edit it
 * (enforced both in the UI and defensively in AppContext).
 */
export type ApprovalStatus = 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected';

/** The "how" — who is executing against a National Activity: a Region or a Project. */
export interface PlanEntry {
  id: string;
  national_activity_id: string;
  scope_type: ScopeType;
  region_id?: string;   // set when scope_type === 'Regional'
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
}

export type QuarterId = 'Q1' | 'Q2' | 'Q3' | 'Q4';
export interface Quarter { id: QuarterId; label: string; }

/**
 * The quarterly breakdown of a Plan Entry's annual target/budget. Entered on
 * the Quarterly Plan page (Step 2) — BEFORE Quarterly Actuals are reported
 * for that quarter. Deliberately does NOT drive/overwrite the Plan Entry's
 * own annual_target/annual_budget; the Quarterly Plan page instead shows a
 * reconciliation badge if the quarters don't sum to the annual figure, so a
 * mismatch is visible rather than silently resolved by shrinking the annual
 * commitment.
 *
 * Each quarter's row has its OWN approval_status — a Coordinator submits it,
 * the National Activity AOP approves or rejects it. Only Approved rows are
 * counted in the Report page's "Approved" view; editing is blocked entirely
 * once Approved.
 */
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

/**
 * Actual performance reported against a Plan Entry, for one quarter. Same
 * per-quarter approval cycle as QuarterlyPlan, tracked independently of it —
 * a quarter's Plan can be Approved while its Actual is still Draft, and vice
 * versa.
 */
export interface QuarterlyActual {
  id: string;
  plan_entry_id: string;
  quarter_id: QuarterId;
  actual: number;
  expenditure: number; // ETB spent
  comment?: string;
  approval_status: ApprovalStatus;
  submitted_at?: string;
  reviewed_at?: string;
  rejection_reason?: string;
}

/** Global conversion table: Actual (in UoM units) x factor = Beneficiaries reached. */
export interface UomFactorConfig {
  uom: string;
  factor: number;
}

// ---------------------------------------------------------------------------
// MONITORING REGISTER — mirrors the Excel "Monitoring Register" sheet.
// One record per Plan Entry (Activity Code × Contributing Project/Region is
// exactly what a Plan Entry already is), so a MonitoringRecord never repeats
// the Activity Code/Name/Contributing Project/Region as its own stored
// fields — those are always read live off the linked Plan Entry (plan_entry_id)
// and, through it, its parent National Activity. This is what makes "Reported
// Achieved (period)" a live figure pulled from Quarterly Actual Entry for
// whichever Quarter (or 'Annual') this record's row is currently checking,
// instead of a value that could silently drift out of sync with the source.
// ---------------------------------------------------------------------------

/** The Register's per-row period selector — Q1–Q4 for a single quarter's check, or 'Annual' for a cumulative check. */
export type MonitoringQuarterSelection = 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'Annual';

export type MonitoringMethod = 'Field visit' | 'Desk review' | 'Remote' | 'Joint';

export type VerificationResult = 'Fully verified' | 'Partially verified' | 'Not verified' | 'Unable to verify';

/**
 * The standard 5-part data-quality framework used by IFRC/USAID monitoring
 * guidance — one dropdown instead of a 5-column checklist on every row.
 */
export type DataQualityConcern = 'None' | 'Validity' | 'Integrity' | 'Precision' | 'Reliability' | 'Timeliness';

export type QualityRating = 'Good' | 'Satisfactory' | 'Needs improvement' | 'Poor' | 'N/A';

export type FindingSeverity = 'Critical' | 'High' | 'Medium' | 'Low';

export type MonitoringStatus = 'Open' | 'In Progress' | 'Closed';

/**
 * One Monitoring Register row, always tied to exactly one Plan Entry via
 * plan_entry_id — which is itself already "a specific National Activity ×
 * Region/Project" execution entry, so the link back to the National
 * Activity is automatic and can never drift.
 *
 * "Reported Achieved (period)", "Verification %" and "Follow-up Required"
 * are deliberately NOT stored here — exactly like a National Activity's
 * Target/Budget elsewhere in this app, they are always computed live
 * (see MonitoringPage): Reported Achieved from Quarterly Actuals for
 * quarter_id, Verification % from verified_achieved ÷ that figure, and
 * Follow-up Required from due_date/status.
 *
 * Only the 'Monitor' role may create/edit these records — enforced in
 * AppContext's upsertMonitoringRecord, and every other role's UI never
 * routes to the Monitoring Register page at all.
 */
export interface MonitoringRecord {
  id: string;
  plan_entry_id: string;
  /** '' = this row hasn't been picked up for monitoring yet (blank template row). */
  quarter_id: MonitoringQuarterSelection | '';
  monitoring_date?: string;   // ISO date string (yyyy-mm-dd)
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
  due_date?: string;          // ISO date string (yyyy-mm-dd)
  status?: MonitoringStatus;
  remarks?: string;
}

export interface FilterState {
  strategicPriorityId: string; // 'ALL' or a StrategicPriority id
  nationalActivityId: string;  // 'ALL' or a NationalActivity id
  regionId: string;            // 'ALL' or a Region id
  projectId: string;           // 'ALL' or a Project id
  quarterId: string;           // 'ALL' or a QuarterId
}