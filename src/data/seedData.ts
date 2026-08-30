import {
  StrategicPriority,
  StrategicObjective,
  NationalActivity,
  Region,
  Zone,
  Project,
  PlanEntry,
  Quarter,
  QuarterlyPlan,
  QuarterlyActual,
  UomFactorConfig,
  MonitoringRecord,
  RegionActivityLink,
  StrategicKpi,
  KpiProgressEntry,
} from '../types';

// ---------------------------------------------------------------------------
// Excel-backed starter data – exactly as provided in the workbook.
// National activities are rolled up from the child Project/Region rows.
// ---------------------------------------------------------------------------

export const INITIAL_STRATEGIC_PRIORITIES: StrategicPriority[] = [
  { id: 'sp-1', code: 'SP1', name: 'Disaster Preparedness and Response', objective: 'Disaster Preparedness and Response' },
  { id: 'sp-2', code: 'SP2', name: 'Disaster Risk Reduction and Community Resilience', objective: 'Disaster Risk Reduction and Community Resilience' },
  { id: 'sp-3', code: 'SP3', name: 'Health and Well-being', objective: 'Health and Well-being' },
  { id: 'sp-4', code: 'SP4', name: 'Members, Volunteer and Youth engagement and management', objective: 'Members, Volunteer and Youth engagement and management' },
  { id: 'sp-5', code: 'SP5', name: 'Humanitarian diplomacy and Communication', objective: 'Humanitarian diplomacy and Communication' },
  { id: 'sp-6', code: 'SP6', name: 'Partnership Development and Management', objective: 'Partnership Development and Management' },
  { id: 'sp-7', code: 'SP7', name: 'Institutional and Leadership Transformation', objective: 'Institutional and Leadership Transformation' },
  { id: 'sp-8', code: 'SP8', name: 'Resource Development, Mobilization & Utilization', objective: 'Resource Development, Mobilization & Utilization' },
];

export const INITIAL_STRATEGIC_OBJECTIVES: StrategicObjective[] = [
  // SP1
  { id: 'so-1-1', strategic_priority_id: 'sp-1', code: '1.1', name: 'Enhance disaster preparedness measures' },
  { id: 'so-1-2', strategic_priority_id: 'sp-1', code: '1.2', name: 'Strengthen anticipatory action initiatives' },
  { id: 'so-1-3', strategic_priority_id: 'sp-1', code: '1.3', name: 'Deliver humanitarian responses to affected communities timely' },
  { id: 'so-1-4', strategic_priority_id: 'sp-1', code: '1.4', name: 'Strengthen early recovery in disaster-affected communities' },
  // SP2
  { id: 'so-2-1', strategic_priority_id: 'sp-2', code: '2.1', name: 'Mitigate climate change impacts and reduce socio-economic risks' },
  { id: 'so-2-2', strategic_priority_id: 'sp-2', code: '2.2', name: 'Enhance livelihoods & economic opportunities for vulnerable communities including youth' },
  { id: 'so-2-3', strategic_priority_id: 'sp-2', code: '2.3', name: 'Strengthen migration services & RFL' },
  { id: 'so-2-4', strategic_priority_id: 'sp-2', code: '2.4', name: 'Promote peace and advance a culture of non-violence' },
  // SP3
  { id: 'so-3-1', strategic_priority_id: 'sp-3', code: '3.1', name: 'Address public health concerns' },
  { id: 'so-3-2', strategic_priority_id: 'sp-3', code: '3.2', name: 'Promote Health and WASH in emergencies' },
  { id: 'so-3-3', strategic_priority_id: 'sp-3', code: '3.3', name: 'Improve access to safe water and sanitation services' },
  { id: 'so-3-4', strategic_priority_id: 'sp-3', code: '3.4', name: 'Strengthen Emergency Medical Services' },
  // SP4
  { id: 'so-4-1', strategic_priority_id: 'sp-4', code: '4.1', name: 'Improve Membership Engagement, and Management' },
  { id: 'so-4-2', strategic_priority_id: 'sp-4', code: '4.2', name: 'Enhance Volunteer Engagement and Management' },
  { id: 'so-4-3', strategic_priority_id: 'sp-4', code: '4.3', name: 'Strengthen the Empowerment and Engagement of Youth' },
  // SP5
  { id: 'so-5-1', strategic_priority_id: 'sp-5', code: '5.1', name: 'Strengthen humanitarian diplomacy within ERCS operations' },
  { id: 'so-5-2', strategic_priority_id: 'sp-5', code: '5.2', name: "Enhance Strategic Communication and Visibility of ERCS's Humanitarian Impact" },
  { id: 'so-5-3', strategic_priority_id: 'sp-5', code: '5.3', name: 'Disseminate and Advocate to Influence Humanitarian Policy and Practice' },
  // SP6
  { id: 'so-6-1', strategic_priority_id: 'sp-6', code: '6.1', name: 'Enhance and expand collaborative and coordinated partnerships to drive mutual growth and innovation' },
  { id: 'so-6-2', strategic_priority_id: 'sp-6', code: '6.2', name: 'Establish a robust framework to effectively engage the private sector and drive strategic partnerships' },
  { id: 'so-6-3', strategic_priority_id: 'sp-6', code: '6.3', name: 'Strengthen support and collaboration with the government to effectively contribute to policy implementation and national development' },
  // SP7
  { id: 'so-7-1', strategic_priority_id: 'sp-7', code: '7.1', name: 'Strengthen governance, management and staff capacity at all levels of the organization' },
  { id: 'so-7-2', strategic_priority_id: 'sp-7', code: '7.2', name: 'Enhance branch capacity and optimize localization through local structures' },
  { id: 'so-7-3', strategic_priority_id: 'sp-7', code: '7.3', name: 'Strengthen Monitoring, Evaluation, Accountability, and Learning (MEAL) Systems' },
  { id: 'so-7-4', strategic_priority_id: 'sp-7', code: '7.4', name: 'Improve risk management capacity' },
  { id: 'so-7-5', strategic_priority_id: 'sp-7', code: '7.5', name: 'Strengthen and Digitalize Operational systems to drive operational efficiency, transparency and accountability' },
  // SP8
  { id: 'so-8-1', strategic_priority_id: 'sp-8', code: '8.1', name: 'Maximize local resource Mobilization' },
  { id: 'so-8-2', strategic_priority_id: 'sp-8', code: '8.2', name: 'Maximize Grant funding Through Strengthening system & Capacity' },
  { id: 'so-8-3', strategic_priority_id: 'sp-8', code: '8.3', name: 'Strengthen Resources Development and Diversifying IGAs schemes' },
  { id: 'so-8-4', strategic_priority_id: 'sp-8', code: '8.4', name: 'Maximize operational efficiency through enhanced resource management' },
];

// National Activities with totals computed from the sheets. `activity_description`
// is sourced verbatim from the "Description" column of the Excel workbook's
// National Aggregated sheet. `eligible_region_ids`/`eligible_project_ids` are
// derived from exactly which Region/Project sheets contained a row for that
// activity — i.e. only those Regions/Projects may add a Plan Entry against it.
export const INITIAL_NATIONAL_ACTIVITIES: NationalActivity[] = [
  { id: 'na-1-1-1', strategic_priority_id: 'sp-1', strategic_objective_id: 'so-1-1', code: '1.1.1', description: 'Distribute NFI Kits to IDP Households', uom: '# of households', responsibility: 'Both', activity_description: "Distribution of NFI kits to internally displaced households under the project's emergency response component.", eligible_region_ids: ['reg-1', 'reg-2', 'reg-3'], eligible_project_ids: ['proj-1', 'proj-3'] },
  { id: 'na-1-1-2', strategic_priority_id: 'sp-1', strategic_objective_id: 'so-1-1', code: '1.1.2', description: 'Update Woreda-Level Emergency Response Plans', uom: '# of MHCP', responsibility: 'Both', activity_description: 'Development/update of woreda-level emergency response and contingency plans.', eligible_region_ids: ['reg-2'], eligible_project_ids: ['proj-4'] },
  { id: 'na-1-2-1', strategic_priority_id: 'sp-1', strategic_objective_id: 'so-1-2', code: '1.2.1', description: 'Rehabilitate Boreholes in Project Woredas', uom: '# of water points', responsibility: 'Both', activity_description: "Rehabilitation of non-functional boreholes in the project's target woredas.", eligible_region_ids: ['reg-1', 'reg-3'], eligible_project_ids: ['proj-2'] },
  { id: 'na-1-2-2', strategic_priority_id: 'sp-1', strategic_objective_id: 'so-1-2', code: '1.2.2', description: 'Provide Emergency Health and First Aid Services', uom: '# of people reached', responsibility: 'Both', activity_description: 'Provision of emergency health services, first aid and referrals to disaster-affected populations.', eligible_region_ids: ['reg-2', 'reg-3'], eligible_project_ids: ['proj-1', 'proj-4'] },
  { id: 'na-2-1-1', strategic_priority_id: 'sp-2', strategic_objective_id: 'so-2-1', code: '2.1.1', description: 'Conduct Community-Based Disaster Risk Reduction (CBDRR) Training', uom: '# of people trained', responsibility: 'Both', activity_description: 'Training of community members and volunteers on disaster risk reduction and preparedness.', eligible_region_ids: ['reg-1'], eligible_project_ids: ['proj-1'] },
  { id: 'na-2-1-2', strategic_priority_id: 'sp-2', strategic_objective_id: 'so-2-1', code: '2.1.2', description: 'Establish Community-Based Early Warning Systems', uom: '# of systems established', responsibility: 'Both', activity_description: 'Establishment/strengthening of early warning systems at community and woreda level.', eligible_region_ids: ['reg-2'], eligible_project_ids: ['proj-3'] },
  { id: 'na-3-1-1', strategic_priority_id: 'sp-3', strategic_objective_id: 'so-3-1', code: '3.1.1', description: 'Provide Nutrition Support to Vulnerable Groups', uom: '# of beneficiaries', responsibility: 'Both', activity_description: 'Provision of nutrition support/supplementary feeding to malnourished and vulnerable groups.', eligible_region_ids: ['reg-1', 'reg-3'], eligible_project_ids: ['proj-2'] },
  { id: 'na-3-2-1', strategic_priority_id: 'sp-3', strategic_objective_id: 'so-3-2', code: '3.2.1', description: 'Conduct Health and Hygiene Awareness Campaigns', uom: '# of campaigns', responsibility: 'Both', activity_description: 'Community-level awareness campaigns on health, hygiene and disease prevention.', eligible_region_ids: ['reg-2'], eligible_project_ids: ['proj-3'] },
  { id: 'na-4-1-1', strategic_priority_id: 'sp-4', strategic_objective_id: 'so-4-1', code: '4.1.1', description: 'Recruit and Train Community Volunteers', uom: '# of volunteers trained', responsibility: 'Both', activity_description: 'Recruitment and training of new RCRC volunteers on core competencies and code of conduct.', eligible_region_ids: ['reg-1', 'reg-2'], eligible_project_ids: ['proj-2'] },
  { id: 'na-5-1-1', strategic_priority_id: 'sp-5', strategic_objective_id: 'so-5-1', code: '5.1.1', description: 'Organize Migration and Protection Advocacy Forums', uom: '# of events', responsibility: 'Both', activity_description: 'Advocacy forums on migration and protection with government and partners.', eligible_region_ids: [], eligible_project_ids: ['proj-4'] },
];

export const INITIAL_REGIONS: Region[] = [
  { id: 'reg-1', name: 'Amhara Region' },
  { id: 'reg-2', name: 'Oromia Region' },
  { id: 'reg-3', name: 'Somali Region' },
];

// ---------------------------------------------------------------------------
// NEW — 31 Zones, per client's exact spellings.
// ---------------------------------------------------------------------------
export const INITIAL_ZONES: Zone[] = [
  // Amhara Region (reg-1) — 10 zones
  { id: 'zn-am-awi', region_id: 'reg-1', name: 'Awi Zone' },
  { id: 'zn-am-egj', region_id: 'reg-1', name: 'East Gojjam Zone' },
  { id: 'zn-am-wgj', region_id: 'reg-1', name: 'West Gojjam Zone' },
  { id: 'zn-am-ngj', region_id: 'reg-1', name: 'North Gojjam Zone' },
  { id: 'zn-am-ngd', region_id: 'reg-1', name: 'North Gondar Zone' },
  { id: 'zn-am-cgd', region_id: 'reg-1', name: 'Central Gondar Zone' },
  { id: 'zn-am-wgd', region_id: 'reg-1', name: 'West Gondar Zone' },
  { id: 'zn-am-sgd', region_id: 'reg-1', name: 'South Gondar Zone' },
  { id: 'zn-am-whm', region_id: 'reg-1', name: 'Wag Hemra Zone' },
  { id: 'zn-am-nwo', region_id: 'reg-1', name: 'North Wollo Zone' },

  // Oromia Region (reg-2) — 10 zones
  { id: 'zn-or-ars', region_id: 'reg-2', name: 'Arsi Zone' },
  { id: 'zn-or-bal', region_id: 'reg-2', name: 'Bale Zone' },
  { id: 'zn-or-bor', region_id: 'reg-2', name: 'Borena Zone' },
  { id: 'zn-or-bbe', region_id: 'reg-2', name: 'Buno Bedele Zone' },
  { id: 'zn-or-ebo', region_id: 'reg-2', name: 'East Borena Zone' },
  { id: 'zn-or-ehr', region_id: 'reg-2', name: 'East Hararghe Zone' },
  { id: 'zn-or-esh', region_id: 'reg-2', name: 'East Shewa Zone' },
  { id: 'zn-or-ewe', region_id: 'reg-2', name: 'East Welega Zone' },
  { id: 'zn-or-guj', region_id: 'reg-2', name: 'Guji Zone' },
  { id: 'zn-or-hgw', region_id: 'reg-2', name: 'Horo Guduru Welega Zone' },

  // Somali Region (reg-3) — 11 zones
  { id: 'zn-so-afd', region_id: 'reg-3', name: 'Afder Zone' },
  { id: 'zn-so-dol', region_id: 'reg-3', name: 'Dollo Zone' },
  { id: 'zn-so-ere', region_id: 'reg-3', name: 'Erer Zone' },
  { id: 'zn-so-faf', region_id: 'reg-3', name: 'Fafan Zone' },
  { id: 'zn-so-jar', region_id: 'reg-3', name: 'Jarar Zone' },
  { id: 'zn-so-kor', region_id: 'reg-3', name: 'Korahe Zone' },
  { id: 'zn-so-lib', region_id: 'reg-3', name: 'Liben Zone' },
  { id: 'zn-so-dha', region_id: 'reg-3', name: 'Dhawa Zone' },
  { id: 'zn-so-nog', region_id: 'reg-3', name: 'Nogob Zone' },
  { id: 'zn-so-sha', region_id: 'reg-3', name: 'Shabelle Zone' },
  { id: 'zn-so-sit', region_id: 'reg-3', name: 'Sitti Zone' },
];

export const INITIAL_PROJECTS: Project[] = [
  { id: 'proj-1', name: 'Project A' },
  { id: 'proj-2', name: 'Project B' },
  { id: 'proj-3', name: 'Project C' },
  { id: 'proj-4', name: 'Project D' },
];

// ---------------------------------------------------------------------------
// NEW — RegionActivityLink for each migrated Region row.
// Each carries the same national_activity_id/region_id/activity_name/
// activity_description as the old regional PlanEntry, while eligible_zone_ids
// defines which zone may create a plan entry for that regional activity.
// ---------------------------------------------------------------------------
export const INITIAL_REGION_ACTIVITY_LINKS: RegionActivityLink[] = [
  { id: 'ral-am-111', national_activity_id: 'na-1-1-1', region_id: 'reg-1', activity_name: 'Provide Non-Food Items (NFI) to Disaster-Affected Households', activity_description: 'Distribution of core relief NFI kits (blankets, jerry cans, kitchen sets, etc.) to households affected by disaster.', eligible_zone_ids: ['zn-am-awi'] },
  { id: 'ral-am-121', national_activity_id: 'na-1-2-1', region_id: 'reg-1', activity_name: 'Construct/Rehabilitate Community Water Points', activity_description: 'Construction or rehabilitation of water points (boreholes, wells, water schemes) for disaster-affected and host communities.', eligible_zone_ids: ['zn-am-egj'] },
  { id: 'ral-am-211', national_activity_id: 'na-2-1-1', region_id: 'reg-1', activity_name: 'Conduct Community-Based Disaster Risk Reduction (CBDRR) Training', activity_description: 'Training of community members and volunteers on disaster risk reduction and preparedness.', eligible_zone_ids: ['zn-am-wgj'] },
  { id: 'ral-am-311', national_activity_id: 'na-3-1-1', region_id: 'reg-1', activity_name: 'Provide Nutrition Support to Vulnerable Groups', activity_description: 'Provision of nutrition support/supplementary feeding to malnourished and vulnerable groups.', eligible_zone_ids: ['zn-am-ngj'] },
  { id: 'ral-am-411', national_activity_id: 'na-4-1-1', region_id: 'reg-1', activity_name: 'Recruit and Train Community Volunteers', activity_description: 'Recruitment and training of new RCRC volunteers on core competencies and code of conduct.', eligible_zone_ids: ['zn-am-ngd'] },

  { id: 'ral-or-111', national_activity_id: 'na-1-1-1', region_id: 'reg-2', activity_name: 'Provide Non-Food Items (NFI) to Disaster-Affected Households', activity_description: 'Distribution of core relief NFI kits (blankets, jerry cans, kitchen sets, etc.) to households affected by disaster.', eligible_zone_ids: ['zn-or-ars'] },
  { id: 'ral-or-112', national_activity_id: 'na-1-1-2', region_id: 'reg-2', activity_name: 'Develop Multi-Hazard Contingency Plan (MHCP)', activity_description: 'Development/update of multi-hazard contingency plans at national and regional level.', eligible_zone_ids: ['zn-or-bal'] },
  { id: 'ral-or-122', national_activity_id: 'na-1-2-2', region_id: 'reg-2', activity_name: 'Provide Emergency Health and First Aid Services', activity_description: 'Provision of emergency health services, first aid and referrals to disaster-affected populations.', eligible_zone_ids: ['zn-or-bor'] },
  { id: 'ral-or-212', national_activity_id: 'na-2-1-2', region_id: 'reg-2', activity_name: 'Establish Community-Based Early Warning Systems', activity_description: 'Establishment/strengthening of early warning systems at community and woreda level.', eligible_zone_ids: ['zn-or-bbe'] },
  { id: 'ral-or-321', national_activity_id: 'na-3-2-1', region_id: 'reg-2', activity_name: 'Conduct Health and Hygiene Awareness Campaigns', activity_description: 'Community-level awareness campaigns on health, hygiene and disease prevention.', eligible_zone_ids: ['zn-or-ebo'] },
  { id: 'ral-or-411', national_activity_id: 'na-4-1-1', region_id: 'reg-2', activity_name: 'Recruit and Train Community Volunteers', activity_description: 'Recruitment and training of new RCRC volunteers on core competencies and code of conduct.', eligible_zone_ids: ['zn-or-ehr'] },

  { id: 'ral-so-111', national_activity_id: 'na-1-1-1', region_id: 'reg-3', activity_name: 'Provide Non-Food Items (NFI) to Disaster-Affected Households', activity_description: 'Distribution of core relief NFI kits (blankets, jerry cans, kitchen sets, etc.) to households affected by disaster.', eligible_zone_ids: ['zn-so-afd'] },
  { id: 'ral-so-121', national_activity_id: 'na-1-2-1', region_id: 'reg-3', activity_name: 'Construct/Rehabilitate Community Water Points', activity_description: 'Construction or rehabilitation of water points (boreholes, wells, water schemes) for disaster-affected and host communities.', eligible_zone_ids: ['zn-so-dol'] },
  { id: 'ral-so-122', national_activity_id: 'na-1-2-2', region_id: 'reg-3', activity_name: 'Provide Emergency Health and First Aid Services', activity_description: 'Provision of emergency health services, first aid and referrals to disaster-affected populations.', eligible_zone_ids: ['zn-so-ere'] },
  { id: 'ral-so-311', national_activity_id: 'na-3-1-1', region_id: 'reg-3', activity_name: 'Provide Nutrition Support to Vulnerable Groups', activity_description: 'Provision of nutrition support/supplementary feeding to malnourished and vulnerable groups.', eligible_zone_ids: ['zn-so-faf'] },
];

// ---------------------------------------------------------------------------
// Plan Entries – one for every row in every Project/Region sheet.
// activity_code is always the PARENT National Activity's own code — never
// suffixed with the executing Region/Project. The "Executed By" column
// already makes it clear who owns the entry.
//
// Regional entries now also carry zone_id and region_activity_link_id.
// ---------------------------------------------------------------------------
export const INITIAL_PLAN_ENTRIES: PlanEntry[] = [
  // Project A
  { id: 'pe-pa-111', national_activity_id: 'na-1-1-1', scope_type: 'Project', project_id: 'proj-1', annual_target: 1200, annual_budget: 950_000, activity_code: '1.1.1', activity_name: 'Distribute NFI Kits to IDP Households', activity_description: "Distribution of NFI kits to internally displaced households under the project's emergency response component.", approval_status: 'Approved' },
  { id: 'pe-pa-122', national_activity_id: 'na-1-2-2', scope_type: 'Project', project_id: 'proj-1', annual_target: 2500, annual_budget: 1_100_000, activity_code: '1.2.2', activity_name: 'Deliver Mobile Health and First Aid Outreach', activity_description: 'Mobile health/first aid outreach to project-targeted communities.', approval_status: 'Approved' },
  { id: 'pe-pa-211', national_activity_id: 'na-2-1-1', scope_type: 'Project', project_id: 'proj-1', annual_target: 120, annual_budget: 300_000, activity_code: '2.1.1', activity_name: 'Deliver DRR Training of Trainers (ToT) for Community Leaders', activity_description: 'ToT sessions on disaster risk reduction for community leaders under the project.', approval_status: 'Approved' },

  // Project B
  { id: 'pe-pb-121', national_activity_id: 'na-1-2-1', scope_type: 'Project', project_id: 'proj-2', annual_target: 6, annual_budget: 2_800_000, activity_code: '1.2.1', activity_name: 'Rehabilitate Boreholes in Project Woredas', activity_description: "Rehabilitation of non-functional boreholes in the project's target woredas.", approval_status: 'Approved' },
  { id: 'pe-pb-311', national_activity_id: 'na-3-1-1', scope_type: 'Project', project_id: 'proj-2', annual_target: 900, annual_budget: 750_000, activity_code: '3.1.1', activity_name: 'Provide Supplementary Feeding to Malnourished Children', activity_description: 'Supplementary feeding support to malnourished children under 5 and PLW.', approval_status: 'Approved' },
  { id: 'pe-pb-411', national_activity_id: 'na-4-1-1', scope_type: 'Project', project_id: 'proj-2', annual_target: 150, annual_budget: 210_000, activity_code: '4.1.1', activity_name: 'Train and Deploy Community-Based Volunteers', activity_description: 'Recruitment and deployment of community volunteers to support project activities.', approval_status: 'Approved' },

  // Project C
  { id: 'pe-pc-111', national_activity_id: 'na-1-1-1', scope_type: 'Project', project_id: 'proj-3', annual_target: 950, annual_budget: 700_000, activity_code: '1.1.1', activity_name: 'Provide Emergency Shelter and NFI Support', activity_description: 'Emergency shelter and NFI support to disaster-affected households in project areas.', approval_status: 'Approved' },
  { id: 'pe-pc-212', national_activity_id: 'na-2-1-2', scope_type: 'Project', project_id: 'proj-3', annual_target: 4, annual_budget: 900_000, activity_code: '2.1.2', activity_name: 'Install Community Early Warning Alert Systems', activity_description: 'Installation of early warning alert systems in flood/drought-prone project woredas.', approval_status: 'Approved' },
  { id: 'pe-pc-321', national_activity_id: 'na-3-2-1', scope_type: 'Project', project_id: 'proj-3', annual_target: 10, annual_budget: 320_000, activity_code: '3.2.1', activity_name: 'Conduct Hygiene Promotion Sessions', activity_description: "Community hygiene promotion sessions under the project's WASH component.", approval_status: 'Approved' },

  // Project D
  { id: 'pe-pd-112', national_activity_id: 'na-1-1-2', scope_type: 'Project', project_id: 'proj-4', annual_target: 2, annual_budget: 250_000, activity_code: '1.1.2', activity_name: 'Update Woreda-Level Emergency Response Plans', activity_description: 'Development/update of woreda-level emergency response and contingency plans.', approval_status: 'Approved' },
  { id: 'pe-pd-122', national_activity_id: 'na-1-2-2', scope_type: 'Project', project_id: 'proj-4', annual_target: 3000, annual_budget: 1_050_000, activity_code: '1.2.2', activity_name: 'Provide First Aid and Referral Services at Reception Centers', activity_description: 'First aid and referral services for migrants/returnees at reception centers.', approval_status: 'Approved' },
  { id: 'pe-pd-511', national_activity_id: 'na-5-1-1', scope_type: 'Project', project_id: 'proj-4', annual_target: 6, annual_budget: 400_000, activity_code: '5.1.1', activity_name: 'Organize Migration and Protection Advocacy Forums', activity_description: 'Advocacy forums on migration and protection with government and partners.', approval_status: 'Approved' },

  // Amhara Region — now zone-scoped
  { id: 'pe-r-am-111', national_activity_id: 'na-1-1-1', scope_type: 'Regional', region_id: 'reg-1', zone_id: 'zn-am-awi', region_activity_link_id: 'ral-am-111', annual_target: 4500, annual_budget: 3_200_000, activity_code: '1.1.1', activity_name: 'Provide Non-Food Items (NFI) to Disaster-Affected Households', activity_description: 'Distribution of core relief NFI kits (blankets, jerry cans, kitchen sets, etc.) to households affected by disaster.', approval_status: 'Approved' },
  { id: 'pe-r-am-121', national_activity_id: 'na-1-2-1', scope_type: 'Regional', region_id: 'reg-1', zone_id: 'zn-am-egj', region_activity_link_id: 'ral-am-121', annual_target: 12, annual_budget: 5_400_000, activity_code: '1.2.1', activity_name: 'Construct/Rehabilitate Community Water Points', activity_description: 'Construction or rehabilitation of water points (boreholes, wells, water schemes) for disaster-affected and host communities.', approval_status: 'Approved' },
  { id: 'pe-r-am-211', national_activity_id: 'na-2-1-1', scope_type: 'Regional', region_id: 'reg-1', zone_id: 'zn-am-wgj', region_activity_link_id: 'ral-am-211', annual_target: 800, annual_budget: 950_000, activity_code: '2.1.1', activity_name: 'Conduct Community-Based Disaster Risk Reduction (CBDRR) Training', activity_description: 'Training of community members and volunteers on disaster risk reduction and preparedness.', approval_status: 'Approved' },
  { id: 'pe-r-am-311', national_activity_id: 'na-3-1-1', scope_type: 'Regional', region_id: 'reg-1', zone_id: 'zn-am-ngj', region_activity_link_id: 'ral-am-311', annual_target: 2200, annual_budget: 1_800_000, activity_code: '3.1.1', activity_name: 'Provide Nutrition Support to Vulnerable Groups', activity_description: 'Provision of nutrition support/supplementary feeding to malnourished and vulnerable groups.', approval_status: 'Approved' },
  { id: 'pe-r-am-411', national_activity_id: 'na-4-1-1', scope_type: 'Regional', region_id: 'reg-1', zone_id: 'zn-am-ngd', region_activity_link_id: 'ral-am-411', annual_target: 300, annual_budget: 450_000, activity_code: '4.1.1', activity_name: 'Recruit and Train Community Volunteers', activity_description: 'Recruitment and training of new RCRC volunteers on core competencies and code of conduct.', approval_status: 'Approved' },

  // Oromia Region — now zone-scoped
  { id: 'pe-r-or-111', national_activity_id: 'na-1-1-1', scope_type: 'Regional', region_id: 'reg-2', zone_id: 'zn-or-ars', region_activity_link_id: 'ral-or-111', annual_target: 6000, annual_budget: 4_100_000, activity_code: '1.1.1', activity_name: 'Provide Non-Food Items (NFI) to Disaster-Affected Households', activity_description: 'Distribution of core relief NFI kits (blankets, jerry cans, kitchen sets, etc.) to households affected by disaster.', approval_status: 'Approved' },
  { id: 'pe-r-or-112', national_activity_id: 'na-1-1-2', scope_type: 'Regional', region_id: 'reg-2', zone_id: 'zn-or-bal', region_activity_link_id: 'ral-or-112', annual_target: 3, annual_budget: 600_000, activity_code: '1.1.2', activity_name: 'Develop Multi-Hazard Contingency Plan (MHCP)', activity_description: 'Development/update of multi-hazard contingency plans at national and regional level.', approval_status: 'Approved' },
  { id: 'pe-r-or-122', national_activity_id: 'na-1-2-2', scope_type: 'Regional', region_id: 'reg-2', zone_id: 'zn-or-bor', region_activity_link_id: 'ral-or-122', annual_target: 5000, annual_budget: 2_300_000, activity_code: '1.2.2', activity_name: 'Provide Emergency Health and First Aid Services', activity_description: 'Provision of emergency health services, first aid and referrals to disaster-affected populations.', approval_status: 'Approved' },
  { id: 'pe-r-or-212', national_activity_id: 'na-2-1-2', scope_type: 'Regional', region_id: 'reg-2', zone_id: 'zn-or-bbe', region_activity_link_id: 'ral-or-212', annual_target: 8, annual_budget: 1_100_000, activity_code: '2.1.2', activity_name: 'Establish Community-Based Early Warning Systems', activity_description: 'Establishment/strengthening of early warning systems at community and woreda level.', approval_status: 'Approved' },
  { id: 'pe-r-or-321', national_activity_id: 'na-3-2-1', scope_type: 'Regional', region_id: 'reg-2', zone_id: 'zn-or-ebo', region_activity_link_id: 'ral-or-321', annual_target: 15, annual_budget: 700_000, activity_code: '3.2.1', activity_name: 'Conduct Health and Hygiene Awareness Campaigns', activity_description: 'Community-level awareness campaigns on health, hygiene and disease prevention.', approval_status: 'Approved' },
  { id: 'pe-r-or-411', national_activity_id: 'na-4-1-1', scope_type: 'Regional', region_id: 'reg-2', zone_id: 'zn-or-ehr', region_activity_link_id: 'ral-or-411', annual_target: 450, annual_budget: 620_000, activity_code: '4.1.1', activity_name: 'Recruit and Train Community Volunteers', activity_description: 'Recruitment and training of new RCRC volunteers on core competencies and code of conduct.', approval_status: 'Approved' },

  // Somali Region — now zone-scoped
  { id: 'pe-r-so-111', national_activity_id: 'na-1-1-1', scope_type: 'Regional', region_id: 'reg-3', zone_id: 'zn-so-afd', region_activity_link_id: 'ral-so-111', annual_target: 3800, annual_budget: 2_650_000, activity_code: '1.1.1', activity_name: 'Provide Non-Food Items (NFI) to Disaster-Affected Households', activity_description: 'Distribution of core relief NFI kits (blankets, jerry cans, kitchen sets, etc.) to households affected by disaster.', approval_status: 'Approved' },
  { id: 'pe-r-so-121', national_activity_id: 'na-1-2-1', scope_type: 'Regional', region_id: 'reg-3', zone_id: 'zn-so-dol', region_activity_link_id: 'ral-so-121', annual_target: 9, annual_budget: 4_000_000, activity_code: '1.2.1', activity_name: 'Construct/Rehabilitate Community Water Points', activity_description: 'Construction or rehabilitation of water points (boreholes, wells, water schemes) for disaster-affected and host communities.', approval_status: 'Approved' },
  { id: 'pe-r-so-122', national_activity_id: 'na-1-2-2', scope_type: 'Regional', region_id: 'reg-3', zone_id: 'zn-so-ere', region_activity_link_id: 'ral-so-122', annual_target: 4200, annual_budget: 1_950_000, activity_code: '1.2.2', activity_name: 'Provide Emergency Health and First Aid Services', activity_description: 'Provision of emergency health services, first aid and referrals to disaster-affected populations.', approval_status: 'Approved' },
  { id: 'pe-r-so-311', national_activity_id: 'na-3-1-1', scope_type: 'Regional', region_id: 'reg-3', zone_id: 'zn-so-faf', region_activity_link_id: 'ral-so-311', annual_target: 1600, annual_budget: 1_300_000, activity_code: '3.1.1', activity_name: 'Provide Nutrition Support to Vulnerable Groups', activity_description: 'Provision of nutrition support/supplementary feeding to malnourished and vulnerable groups.', approval_status: 'Approved' },
];

export const FISCAL_QUARTERS: Quarter[] = [
  { id: 'Q1', label: 'Q1 (Jul-Sep)' },
  { id: 'Q2', label: 'Q2 (Oct-Dec)' },
  { id: 'Q3', label: 'Q3 (Jan-Mar)' },
  { id: 'Q4', label: 'Q4 (Apr-Jun)' },
];

// ---------------------------------------------------------------------------
// Quarterly Plans – seeded from the Excel quarterly columns for each entry.
// ---------------------------------------------------------------------------
export const INITIAL_QUARTERLY_PLANS: QuarterlyPlan[] = [
  // Project A
  { id: 'qp-pa-111-q1', plan_entry_id: 'pe-pa-111', quarter_id: 'Q1', target: 300, budget: 237500, approval_status: 'Approved' },
  { id: 'qp-pa-111-q2', plan_entry_id: 'pe-pa-111', quarter_id: 'Q2', target: 300, budget: 237500, approval_status: 'Approved' },
  { id: 'qp-pa-111-q3', plan_entry_id: 'pe-pa-111', quarter_id: 'Q3', target: 300, budget: 237500, approval_status: 'Approved' },
  { id: 'qp-pa-111-q4', plan_entry_id: 'pe-pa-111', quarter_id: 'Q4', target: 300, budget: 237500, approval_status: 'Approved' },
  { id: 'qp-pa-122-q1', plan_entry_id: 'pe-pa-122', quarter_id: 'Q1', target: 625, budget: 275000, approval_status: 'Approved' },
  { id: 'qp-pa-122-q2', plan_entry_id: 'pe-pa-122', quarter_id: 'Q2', target: 625, budget: 275000, approval_status: 'Approved' },
  { id: 'qp-pa-122-q3', plan_entry_id: 'pe-pa-122', quarter_id: 'Q3', target: 625, budget: 275000, approval_status: 'Approved' },
  { id: 'qp-pa-122-q4', plan_entry_id: 'pe-pa-122', quarter_id: 'Q4', target: 625, budget: 275000, approval_status: 'Approved' },
  { id: 'qp-pa-211-q1', plan_entry_id: 'pe-pa-211', quarter_id: 'Q1', target: 30, budget: 75000, approval_status: 'Approved' },
  { id: 'qp-pa-211-q2', plan_entry_id: 'pe-pa-211', quarter_id: 'Q2', target: 30, budget: 75000, approval_status: 'Approved' },
  { id: 'qp-pa-211-q3', plan_entry_id: 'pe-pa-211', quarter_id: 'Q3', target: 30, budget: 75000, approval_status: 'Approved' },
  { id: 'qp-pa-211-q4', plan_entry_id: 'pe-pa-211', quarter_id: 'Q4', target: 30, budget: 75000, approval_status: 'Approved' },

  // Project B
  { id: 'qp-pb-121-q1', plan_entry_id: 'pe-pb-121', quarter_id: 'Q1', target: 1.5, budget: 700000, approval_status: 'Approved' },
  { id: 'qp-pb-121-q2', plan_entry_id: 'pe-pb-121', quarter_id: 'Q2', target: 1.5, budget: 700000, approval_status: 'Approved' },
  { id: 'qp-pb-121-q3', plan_entry_id: 'pe-pb-121', quarter_id: 'Q3', target: 1.5, budget: 700000, approval_status: 'Approved' },
  { id: 'qp-pb-121-q4', plan_entry_id: 'pe-pb-121', quarter_id: 'Q4', target: 1.5, budget: 700000, approval_status: 'Approved' },
  { id: 'qp-pb-311-q1', plan_entry_id: 'pe-pb-311', quarter_id: 'Q1', target: 225, budget: 187500, approval_status: 'Approved' },
  { id: 'qp-pb-311-q2', plan_entry_id: 'pe-pb-311', quarter_id: 'Q2', target: 225, budget: 187500, approval_status: 'Approved' },
  { id: 'qp-pb-311-q3', plan_entry_id: 'pe-pb-311', quarter_id: 'Q3', target: 225, budget: 187500, approval_status: 'Approved' },
  { id: 'qp-pb-311-q4', plan_entry_id: 'pe-pb-311', quarter_id: 'Q4', target: 225, budget: 187500, approval_status: 'Approved' },
  { id: 'qp-pb-411-q1', plan_entry_id: 'pe-pb-411', quarter_id: 'Q1', target: 37.5, budget: 52500, approval_status: 'Approved' },
  { id: 'qp-pb-411-q2', plan_entry_id: 'pe-pb-411', quarter_id: 'Q2', target: 37.5, budget: 52500, approval_status: 'Approved' },
  { id: 'qp-pb-411-q3', plan_entry_id: 'pe-pb-411', quarter_id: 'Q3', target: 37.5, budget: 52500, approval_status: 'Approved' },
  { id: 'qp-pb-411-q4', plan_entry_id: 'pe-pb-411', quarter_id: 'Q4', target: 37.5, budget: 52500, approval_status: 'Approved' },

  // Project C
  { id: 'qp-pc-111-q1', plan_entry_id: 'pe-pc-111', quarter_id: 'Q1', target: 237.5, budget: 175000, approval_status: 'Approved' },
  { id: 'qp-pc-111-q2', plan_entry_id: 'pe-pc-111', quarter_id: 'Q2', target: 237.5, budget: 175000, approval_status: 'Approved' },
  { id: 'qp-pc-111-q3', plan_entry_id: 'pe-pc-111', quarter_id: 'Q3', target: 237.5, budget: 175000, approval_status: 'Approved' },
  { id: 'qp-pc-111-q4', plan_entry_id: 'pe-pc-111', quarter_id: 'Q4', target: 237.5, budget: 175000, approval_status: 'Approved' },
  { id: 'qp-pc-212-q1', plan_entry_id: 'pe-pc-212', quarter_id: 'Q1', target: 1, budget: 225000, approval_status: 'Approved' },
  { id: 'qp-pc-212-q2', plan_entry_id: 'pe-pc-212', quarter_id: 'Q2', target: 1, budget: 225000, approval_status: 'Approved' },
  { id: 'qp-pc-212-q3', plan_entry_id: 'pe-pc-212', quarter_id: 'Q3', target: 1, budget: 225000, approval_status: 'Approved' },
  { id: 'qp-pc-212-q4', plan_entry_id: 'pe-pc-212', quarter_id: 'Q4', target: 1, budget: 225000, approval_status: 'Approved' },
  { id: 'qp-pc-321-q1', plan_entry_id: 'pe-pc-321', quarter_id: 'Q1', target: 2.5, budget: 80000, approval_status: 'Approved' },
  { id: 'qp-pc-321-q2', plan_entry_id: 'pe-pc-321', quarter_id: 'Q2', target: 2.5, budget: 80000, approval_status: 'Approved' },
  { id: 'qp-pc-321-q3', plan_entry_id: 'pe-pc-321', quarter_id: 'Q3', target: 2.5, budget: 80000, approval_status: 'Approved' },
  { id: 'qp-pc-321-q4', plan_entry_id: 'pe-pc-321', quarter_id: 'Q4', target: 2.5, budget: 80000, approval_status: 'Approved' },

  // Project D
  { id: 'qp-pd-112-q1', plan_entry_id: 'pe-pd-112', quarter_id: 'Q1', target: 0.5, budget: 62500, approval_status: 'Approved' },
  { id: 'qp-pd-112-q2', plan_entry_id: 'pe-pd-112', quarter_id: 'Q2', target: 0.5, budget: 62500, approval_status: 'Approved' },
  { id: 'qp-pd-112-q3', plan_entry_id: 'pe-pd-112', quarter_id: 'Q3', target: 0.5, budget: 62500, approval_status: 'Approved' },
  { id: 'qp-pd-112-q4', plan_entry_id: 'pe-pd-112', quarter_id: 'Q4', target: 0.5, budget: 62500, approval_status: 'Approved' },
  { id: 'qp-pd-122-q1', plan_entry_id: 'pe-pd-122', quarter_id: 'Q1', target: 750, budget: 262500, approval_status: 'Approved' },
  { id: 'qp-pd-122-q2', plan_entry_id: 'pe-pd-122', quarter_id: 'Q2', target: 750, budget: 262500, approval_status: 'Approved' },
  { id: 'qp-pd-122-q3', plan_entry_id: 'pe-pd-122', quarter_id: 'Q3', target: 750, budget: 262500, approval_status: 'Approved' },
  { id: 'qp-pd-122-q4', plan_entry_id: 'pe-pd-122', quarter_id: 'Q4', target: 750, budget: 262500, approval_status: 'Approved' },
  { id: 'qp-pd-511-q1', plan_entry_id: 'pe-pd-511', quarter_id: 'Q1', target: 1.5, budget: 100000, approval_status: 'Approved' },
  { id: 'qp-pd-511-q2', plan_entry_id: 'pe-pd-511', quarter_id: 'Q2', target: 1.5, budget: 100000, approval_status: 'Approved' },
  { id: 'qp-pd-511-q3', plan_entry_id: 'pe-pd-511', quarter_id: 'Q3', target: 1.5, budget: 100000, approval_status: 'Approved' },
  { id: 'qp-pd-511-q4', plan_entry_id: 'pe-pd-511', quarter_id: 'Q4', target: 1.5, budget: 100000, approval_status: 'Approved' },

  // Amhara Region
  { id: 'qp-r-am-111-q1', plan_entry_id: 'pe-r-am-111', quarter_id: 'Q1', target: 1125, budget: 800000, approval_status: 'Approved' },
  { id: 'qp-r-am-111-q2', plan_entry_id: 'pe-r-am-111', quarter_id: 'Q2', target: 1125, budget: 800000, approval_status: 'Approved' },
  { id: 'qp-r-am-111-q3', plan_entry_id: 'pe-r-am-111', quarter_id: 'Q3', target: 1125, budget: 800000, approval_status: 'Approved' },
  { id: 'qp-r-am-111-q4', plan_entry_id: 'pe-r-am-111', quarter_id: 'Q4', target: 1125, budget: 800000, approval_status: 'Approved' },
  { id: 'qp-r-am-121-q1', plan_entry_id: 'pe-r-am-121', quarter_id: 'Q1', target: 3, budget: 1350000, approval_status: 'Approved' },
  { id: 'qp-r-am-121-q2', plan_entry_id: 'pe-r-am-121', quarter_id: 'Q2', target: 3, budget: 1350000, approval_status: 'Approved' },
  { id: 'qp-r-am-121-q3', plan_entry_id: 'pe-r-am-121', quarter_id: 'Q3', target: 3, budget: 1350000, approval_status: 'Approved' },
  { id: 'qp-r-am-121-q4', plan_entry_id: 'pe-r-am-121', quarter_id: 'Q4', target: 3, budget: 1350000, approval_status: 'Approved' },
  { id: 'qp-r-am-211-q1', plan_entry_id: 'pe-r-am-211', quarter_id: 'Q1', target: 200, budget: 237500, approval_status: 'Approved' },
  { id: 'qp-r-am-211-q2', plan_entry_id: 'pe-r-am-211', quarter_id: 'Q2', target: 200, budget: 237500, approval_status: 'Approved' },
  { id: 'qp-r-am-211-q3', plan_entry_id: 'pe-r-am-211', quarter_id: 'Q3', target: 200, budget: 237500, approval_status: 'Approved' },
  { id: 'qp-r-am-211-q4', plan_entry_id: 'pe-r-am-211', quarter_id: 'Q4', target: 200, budget: 237500, approval_status: 'Approved' },
  { id: 'qp-r-am-311-q1', plan_entry_id: 'pe-r-am-311', quarter_id: 'Q1', target: 550, budget: 450000, approval_status: 'Approved' },
  { id: 'qp-r-am-311-q2', plan_entry_id: 'pe-r-am-311', quarter_id: 'Q2', target: 550, budget: 450000, approval_status: 'Approved' },
  { id: 'qp-r-am-311-q3', plan_entry_id: 'pe-r-am-311', quarter_id: 'Q3', target: 550, budget: 450000, approval_status: 'Approved' },
  { id: 'qp-r-am-311-q4', plan_entry_id: 'pe-r-am-311', quarter_id: 'Q4', target: 550, budget: 450000, approval_status: 'Approved' },
  { id: 'qp-r-am-411-q1', plan_entry_id: 'pe-r-am-411', quarter_id: 'Q1', target: 75, budget: 112500, approval_status: 'Approved' },
  { id: 'qp-r-am-411-q2', plan_entry_id: 'pe-r-am-411', quarter_id: 'Q2', target: 75, budget: 112500, approval_status: 'Approved' },
  { id: 'qp-r-am-411-q3', plan_entry_id: 'pe-r-am-411', quarter_id: 'Q3', target: 75, budget: 112500, approval_status: 'Approved' },
  { id: 'qp-r-am-411-q4', plan_entry_id: 'pe-r-am-411', quarter_id: 'Q4', target: 75, budget: 112500, approval_status: 'Approved' },

  // Oromia Region
  { id: 'qp-r-or-111-q1', plan_entry_id: 'pe-r-or-111', quarter_id: 'Q1', target: 1500, budget: 1025000, approval_status: 'Approved' },
  { id: 'qp-r-or-111-q2', plan_entry_id: 'pe-r-or-111', quarter_id: 'Q2', target: 1500, budget: 1025000, approval_status: 'Approved' },
  { id: 'qp-r-or-111-q3', plan_entry_id: 'pe-r-or-111', quarter_id: 'Q3', target: 1500, budget: 1025000, approval_status: 'Approved' },
  { id: 'qp-r-or-111-q4', plan_entry_id: 'pe-r-or-111', quarter_id: 'Q4', target: 1500, budget: 1025000, approval_status: 'Approved' },
  { id: 'qp-r-or-112-q1', plan_entry_id: 'pe-r-or-112', quarter_id: 'Q1', target: 0.75, budget: 150000, approval_status: 'Approved' },
  { id: 'qp-r-or-112-q2', plan_entry_id: 'pe-r-or-112', quarter_id: 'Q2', target: 0.75, budget: 150000, approval_status: 'Approved' },
  { id: 'qp-r-or-112-q3', plan_entry_id: 'pe-r-or-112', quarter_id: 'Q3', target: 0.75, budget: 150000, approval_status: 'Approved' },
  { id: 'qp-r-or-112-q4', plan_entry_id: 'pe-r-or-112', quarter_id: 'Q4', target: 0.75, budget: 150000, approval_status: 'Approved' },
  { id: 'qp-r-or-122-q1', plan_entry_id: 'pe-r-or-122', quarter_id: 'Q1', target: 1250, budget: 575000, approval_status: 'Approved' },
  { id: 'qp-r-or-122-q2', plan_entry_id: 'pe-r-or-122', quarter_id: 'Q2', target: 1250, budget: 575000, approval_status: 'Approved' },
  { id: 'qp-r-or-122-q3', plan_entry_id: 'pe-r-or-122', quarter_id: 'Q3', target: 1250, budget: 575000, approval_status: 'Approved' },
  { id: 'qp-r-or-122-q4', plan_entry_id: 'pe-r-or-122', quarter_id: 'Q4', target: 1250, budget: 575000, approval_status: 'Approved' },
  { id: 'qp-r-or-212-q1', plan_entry_id: 'pe-r-or-212', quarter_id: 'Q1', target: 2, budget: 275000, approval_status: 'Approved' },
  { id: 'qp-r-or-212-q2', plan_entry_id: 'pe-r-or-212', quarter_id: 'Q2', target: 2, budget: 275000, approval_status: 'Approved' },
  { id: 'qp-r-or-212-q3', plan_entry_id: 'pe-r-or-212', quarter_id: 'Q3', target: 2, budget: 275000, approval_status: 'Approved' },
  { id: 'qp-r-or-212-q4', plan_entry_id: 'pe-r-or-212', quarter_id: 'Q4', target: 2, budget: 275000, approval_status: 'Approved' },
  { id: 'qp-r-or-321-q1', plan_entry_id: 'pe-r-or-321', quarter_id: 'Q1', target: 3.75, budget: 175000, approval_status: 'Approved' },
  { id: 'qp-r-or-321-q2', plan_entry_id: 'pe-r-or-321', quarter_id: 'Q2', target: 3.75, budget: 175000, approval_status: 'Approved' },
  { id: 'qp-r-or-321-q3', plan_entry_id: 'pe-r-or-321', quarter_id: 'Q3', target: 3.75, budget: 175000, approval_status: 'Approved' },
  { id: 'qp-r-or-321-q4', plan_entry_id: 'pe-r-or-321', quarter_id: 'Q4', target: 3.75, budget: 175000, approval_status: 'Approved' },
  { id: 'qp-r-or-411-q1', plan_entry_id: 'pe-r-or-411', quarter_id: 'Q1', target: 112.5, budget: 155000, approval_status: 'Approved' },
  { id: 'qp-r-or-411-q2', plan_entry_id: 'pe-r-or-411', quarter_id: 'Q2', target: 112.5, budget: 155000, approval_status: 'Approved' },
  { id: 'qp-r-or-411-q3', plan_entry_id: 'pe-r-or-411', quarter_id: 'Q3', target: 112.5, budget: 155000, approval_status: 'Approved' },
  { id: 'qp-r-or-411-q4', plan_entry_id: 'pe-r-or-411', quarter_id: 'Q4', target: 112.5, budget: 155000, approval_status: 'Approved' },

  // Somali Region
  { id: 'qp-r-so-111-q1', plan_entry_id: 'pe-r-so-111', quarter_id: 'Q1', target: 950, budget: 662500, approval_status: 'Approved' },
  { id: 'qp-r-so-111-q2', plan_entry_id: 'pe-r-so-111', quarter_id: 'Q2', target: 950, budget: 662500, approval_status: 'Approved' },
  { id: 'qp-r-so-111-q3', plan_entry_id: 'pe-r-so-111', quarter_id: 'Q3', target: 950, budget: 662500, approval_status: 'Approved' },
  { id: 'qp-r-so-111-q4', plan_entry_id: 'pe-r-so-111', quarter_id: 'Q4', target: 950, budget: 662500, approval_status: 'Approved' },
  { id: 'qp-r-so-121-q1', plan_entry_id: 'pe-r-so-121', quarter_id: 'Q1', target: 2.25, budget: 1000000, approval_status: 'Approved' },
  { id: 'qp-r-so-121-q2', plan_entry_id: 'pe-r-so-121', quarter_id: 'Q2', target: 2.25, budget: 1000000, approval_status: 'Approved' },
  { id: 'qp-r-so-121-q3', plan_entry_id: 'pe-r-so-121', quarter_id: 'Q3', target: 2.25, budget: 1000000, approval_status: 'Approved' },
  { id: 'qp-r-so-121-q4', plan_entry_id: 'pe-r-so-121', quarter_id: 'Q4', target: 2.25, budget: 1000000, approval_status: 'Approved' },
  { id: 'qp-r-so-122-q1', plan_entry_id: 'pe-r-so-122', quarter_id: 'Q1', target: 1050, budget: 487500, approval_status: 'Approved' },
  { id: 'qp-r-so-122-q2', plan_entry_id: 'pe-r-so-122', quarter_id: 'Q2', target: 1050, budget: 487500, approval_status: 'Approved' },
  { id: 'qp-r-so-122-q3', plan_entry_id: 'pe-r-so-122', quarter_id: 'Q3', target: 1050, budget: 487500, approval_status: 'Approved' },
  { id: 'qp-r-so-122-q4', plan_entry_id: 'pe-r-so-122', quarter_id: 'Q4', target: 1050, budget: 487500, approval_status: 'Approved' },
  { id: 'qp-r-so-311-q1', plan_entry_id: 'pe-r-so-311', quarter_id: 'Q1', target: 400, budget: 325000, approval_status: 'Approved' },
  { id: 'qp-r-so-311-q2', plan_entry_id: 'pe-r-so-311', quarter_id: 'Q2', target: 400, budget: 325000, approval_status: 'Approved' },
  { id: 'qp-r-so-311-q3', plan_entry_id: 'pe-r-so-311', quarter_id: 'Q3', target: 400, budget: 325000, approval_status: 'Approved' },
  { id: 'qp-r-so-311-q4', plan_entry_id: 'pe-r-so-311', quarter_id: 'Q4', target: 400, budget: 325000, approval_status: 'Approved' },
];

// ---------------------------------------------------------------------------
// Quarterly Actuals — seeded with the workbook's Q1 "Achieved" figures for
// the 3 Plan Entries the Monitoring Register's worked examples check
// (Project A / 1.2.2, Project A / 1.1.1, Project C / 3.2.1). This is what
// makes those 3 rows' "Reported Achieved (period)" show a real, live number
// pulled straight from Quarterly Actual Entry the moment the Monitoring
// Register loads — exactly the dependency the Excel formulas describe
// (E-column pulls each source sheet's Q1 Achieved column).
// ---------------------------------------------------------------------------
export const INITIAL_QUARTERLY_ACTUALS: QuarterlyActual[] = [
  { id: 'qa-pa-122-q1', plan_entry_id: 'pe-pa-122', quarter_id: 'Q1', actual: 625, expenditure: 275000, comment: '', approval_status: 'Approved' },
  { id: 'qa-pa-111-q1', plan_entry_id: 'pe-pa-111', quarter_id: 'Q1', actual: 300, expenditure: 237500, comment: '', approval_status: 'Approved' },
  { id: 'qa-pc-321-q1', plan_entry_id: 'pe-pc-321', quarter_id: 'Q1', actual: 2.5, expenditure: 80000, comment: '', approval_status: 'Approved' },
];

export const INITIAL_UOM_CONFIGS: UomFactorConfig[] = [
  { uom: '# of households', factor: 5 },
  { uom: '# of people reached', factor: 1 },
  { uom: '# of people trained', factor: 1 },
  { uom: '# of systems established', factor: 1 },
  { uom: '# of beneficiaries', factor: 1 },
  { uom: '# of campaigns', factor: 1 },
  { uom: '# of volunteers trained', factor: 1 },
  { uom: '# of events', factor: 1 },
  { uom: '# of water points', factor: 1 },
  { uom: '# of MHCP', factor: 1 },
];

// ---------------------------------------------------------------------------
// Monitoring Register — the Excel workbook's 3 worked examples (fully
// verified / partially verified / not verified) plus the 3 blank template
// rows for each activity's second contributor, exactly as the sheet ships:
// one row per Plan Entry (Activity Code × Contributing Project/Region).
// plan_entry_id is what links each row straight back to its exact
// National-Activity-linked execution entry — never a separately typed code.
// ---------------------------------------------------------------------------
export const INITIAL_MONITORING_RECORDS: MonitoringRecord[] = [
  // 1.2.2 — Project A: fully verified, 100% match.
  {
    id: 'mr-pe-pa-122',
    plan_entry_id: 'pe-pa-122',
    quarter_id: 'Q1',
    monitoring_date: '2026-01-18',
    monitoring_method: 'Desk review',
    verified_by: 'T. Alemu',
    verified_achieved: 625,
    verification_result: 'Fully verified',
    data_quality_concern: 'None',
    evidence_checked: 'Service register, attendance sheet, photos',
    quality_rating: 'Good',
    remarks: 'Service register matched site tally exactly.',
  },

  // 1.2.2 — Oromia Region: blank, ready to use.
  {
    id: 'mr-pe-r-or-122',
    plan_entry_id: 'pe-r-or-122',
    quarter_id: '',
  },

  // 1.1.1 — Project A: partially verified, 95% match, one open Integrity finding.
  {
    id: 'mr-pe-pa-111',
    plan_entry_id: 'pe-pa-111',
    quarter_id: 'Q1',
    monitoring_date: '2026-01-20',
    monitoring_method: 'Field visit',
    verified_by: 'R. Bekele',
    verified_achieved: 285,
    verification_result: 'Partially verified',
    data_quality_concern: 'Integrity',
    evidence_checked: 'Distribution list, beneficiary ID cards, photos',
    quality_rating: 'Satisfactory',
    finding: '15 of reported 300 households for Q1 could not be matched to beneficiary ID records at 1 of 3 distribution sites',
    severity: 'Medium',
    recommendation: 'Reconcile beneficiary list with woreda ID registry',
    responsible: 'Project A M&E Focal Point',
    due_date: '2026-02-15',
    status: 'Open',
    remarks: 'Re-check scheduled for Q2 visit.',
  },

  // 1.1.1 — Amhara Region: blank, ready to use.
  {
    id: 'mr-pe-r-am-111',
    plan_entry_id: 'pe-r-am-111',
    quarter_id: '',
  },

  // 3.2.1 — Project C: not verified yet, flagged as a Validity concern, overdue action.
  {
    id: 'mr-pe-pc-321',
    plan_entry_id: 'pe-pc-321',
    quarter_id: 'Q1',
    monitoring_date: '2026-01-22',
    monitoring_method: 'Desk review',
    verified_by: 'National M&E Unit',
    verification_result: 'Not verified',
    data_quality_concern: 'Validity',
    evidence_checked: 'None received',
    quality_rating: 'Needs improvement',
    finding: '3 of 6 reported campaigns have no sign-in sheets or photos on file',
    severity: 'High',
    recommendation: 'Submit missing evidence within 10 working days or campaigns will be excluded from national total',
    responsible: 'Project C Coordinator',
    due_date: '2026-02-01',
    status: 'Open',
    remarks: 'Escalated to Project C management.',
  },

  // 3.2.1 — Oromia Region: blank, ready to use.
  {
    id: 'mr-pe-r-or-321',
    plan_entry_id: 'pe-r-or-321',
    quarter_id: '',
  },
];

// ---------------------------------------------------------------------------
// STRATEGIC KPI TRACKING — additive, independent seed data. One entry per
// outcome-level KPI from the ERCS Five-Year Strategic Plan (2025–2030) KPI
// workbook, linked to the existing Strategic Priority / Strategic Objective
// hierarchy above. NOT auto-computed from Plan Entries or the Monitoring
// Register — there is no reliable per-activity mapping to individual KPIs
// in the source data.
// ---------------------------------------------------------------------------
export const INITIAL_STRATEGIC_KPIS: StrategicKpi[] = [
  // SP1 — Disaster Preparedness and Response
  { id: 'kpi-1-1-a', strategic_priority_id: 'sp-1', strategic_objective_id: 'so-1-1', description: '% of high-risk zones with pre-positioned emergency supplies', notes: 'Assesses the geographic coverage and logistical readiness of ERCS to deliver timely emergency aid in identified high-risk regions.', baseline: 'TBD', target_2030: '50% of high-risk zones covered', means_of_verification: 'ERCS logistics and inventory reports', frequency: 'Mid-term and end of the strategic period' },
  { id: 'kpi-1-1-b', strategic_priority_id: 'sp-1', strategic_objective_id: 'so-1-1', description: '% of ERCS branches trained and equipped with updated Disaster Risk Management (DRM) policies, SOPs, and cash preparedness tools', notes: 'Evaluates institutional preparedness at the branch level, including SOP dissemination, staff/volunteer training, and readiness for cash-based responses.', baseline: 'TBD', target_2030: '80% of ERCS branches nationwide', means_of_verification: 'Training report', frequency: 'Mid-term and end of the strategic period' },
  { id: 'kpi-1-2-a', strategic_priority_id: 'sp-1', strategic_objective_id: 'so-1-2', description: '% of pilot communities implementing anticipatory actions based on early warning systems (EWS)', notes: 'Tracks the number of communities where early warning triggers activate pre-defined actions — cash for work, pre-positioned aid, evacuation drills, or infrastructure reinforcement.', baseline: 'TBD', target_2030: '60% of pilot communities', means_of_verification: 'Anticipatory action performance monitoring and evaluation reports', frequency: 'Mid-term and end of the strategic period' },
  { id: 'kpi-1-2-b', strategic_priority_id: 'sp-1', strategic_objective_id: 'so-1-2', description: '# of people reached through anticipatory actions before hazard impact', notes: 'Tracks early action outreach and preventive support', baseline: 'NA', target_2030: '220,000 HH', means_of_verification: 'Report', frequency: 'Annually' },
  { id: 'kpi-1-3-a', strategic_priority_id: 'sp-1', strategic_objective_id: 'so-1-3', description: '# of affected individuals receiving multi-sectoral humanitarian assistance (cash, food, NFIs, shelter, WASH)', notes: 'Measures the scale and comprehensiveness of humanitarian service delivery to crisis-affected populations. Includes both immediate and short-term assistance.', baseline: '375,878', target_2030: '3 million beneficiaries cumulatively', means_of_verification: 'Beneficiary registration databases', frequency: 'Annually' },
  { id: 'kpi-1-3-b', strategic_priority_id: 'sp-1', strategic_objective_id: 'so-1-3', description: '% of beneficiaries satisfied with the timeliness and relevance of humanitarian assistance', notes: 'Captures community perception and accountability', baseline: 'NA', target_2030: '90% satisfied', means_of_verification: 'Satisfaction survey', frequency: 'Mid-term and end of the strategic period' },
  { id: 'kpi-1-4-a', strategic_priority_id: 'sp-1', strategic_objective_id: 'so-1-4', description: '# of households supported with early recovery assistance (e.g., livelihood restoring, farm inputs, cash for work)', notes: "Captures the scale of ERCS's recovery outreach — especially livelihood restoration, basic services, and household stability in the post-crisis phase.", baseline: 'NA', target_2030: '133,011 households', means_of_verification: 'Beneficiary databases', frequency: 'Annually' },
  { id: 'kpi-1-4-b', strategic_priority_id: 'sp-1', strategic_objective_id: 'so-1-4', description: '% of targeted communities demonstrating improved resilience to future shocks', notes: 'Captures longer-term outcome of early recovery efforts', baseline: 'NA', target_2030: '60%', means_of_verification: 'Survey', frequency: 'Mid-term and end of the strategic period' },

  // SP2 — Disaster Risk Reduction and Community Resilience
  { id: 'kpi-2-1-a', strategic_priority_id: 'sp-2', strategic_objective_id: 'so-2-1', description: '# of hectares of degraded land rehabilitated through ERCS-supported environmental protection and land restoration initiatives', notes: 'Tracks the scale of environmental restoration (reforestation, soil conservation, watershed management) directly supported or facilitated by ERCS interventions.', baseline: 'TBD', target_2030: '1,172 hectares', means_of_verification: 'Field visit report', frequency: 'Annually' },
  { id: 'kpi-2-1-b', strategic_priority_id: 'sp-2', strategic_objective_id: 'so-2-1', description: '# of smallholder farmers adopting climate-resilient and nutrition-sensitive farming practices', notes: 'Assesses adoption of improved practices such as agroforestry, drought-resistant seeds, and integrated farming systems among targeted smallholder farmers.', baseline: '2,260 HH', target_2030: '133,312 HH', means_of_verification: 'Beneficiary database', frequency: 'Annually' },
  { id: 'kpi-2-2-a', strategic_priority_id: 'sp-2', strategic_objective_id: 'so-2-2', description: '# of vulnerable individuals (including youth) supported to start sustainable income-generating activities', notes: 'Measures direct support (financial and skills) provided to individuals for starting or expanding small businesses or livelihood ventures.', baseline: '635', target_2030: '22,500', means_of_verification: 'Beneficiary database', frequency: 'Annually' },
  { id: 'kpi-2-2-b', strategic_priority_id: 'sp-2', strategic_objective_id: 'so-2-2', description: '% of households with increased income as a result of ERCS livelihood interventions', notes: 'Tracks income improvement of beneficiaries through IGA support.', baseline: 'NA', target_2030: '50%', means_of_verification: 'Survey assessment on IGA-supported beneficiaries', frequency: 'Mid-term and end of the strategic period' },
  { id: 'kpi-2-3-a', strategic_priority_id: 'sp-2', strategic_objective_id: 'so-2-3', description: '# of migrants, returnees, and displaced individuals provided with essential humanitarian services', notes: 'Captures the total number of beneficiaries receiving direct assistance — food, shelter, health services, psychosocial support, and legal aid — through ERCS migration programs.', baseline: '53,771', target_2030: '1,016,465', means_of_verification: 'Beneficiary database', frequency: 'Annually' },
  { id: 'kpi-2-3-b', strategic_priority_id: 'sp-2', strategic_objective_id: 'so-2-3', description: '# of successful family reunifications and tracing cases resolved through the RFL program', notes: 'Measures the effectiveness of the Restoring Family Links service in locating and reconnecting family members separated due to conflict, disaster, or migration.', baseline: '525,454', target_2030: '5,601,700', means_of_verification: 'RFL database, case management reports', frequency: 'Annually' },
  { id: 'kpi-2-4-a', strategic_priority_id: 'sp-2', strategic_objective_id: 'so-2-4', description: '# of individuals (youth, women, community leaders) engaged in peacebuilding and non-violence initiatives', notes: 'Tracks participation in peace clubs on conflict resolution, non-violent communication, and community dialogue sessions supported by ERCS.', baseline: 'TBD', target_2030: '5,937,159', means_of_verification: 'Community engagement reports', frequency: 'Annually' },
  { id: 'kpi-2-4-b', strategic_priority_id: 'sp-2', strategic_objective_id: 'so-2-4', description: '% of communities with improved knowledge on the importance of peace and non-violence', notes: 'Communities whose members demonstrate increased understanding and awareness of peace, non-violence, and peaceful coexistence.', baseline: 'NA', target_2030: '40% improvement in perception metrics', means_of_verification: 'Community cohesion surveys', frequency: 'End of the strategic period' },

  // SP3 — Health and Well-being
  { id: 'kpi-3-1-a', strategic_priority_id: 'sp-3', strategic_objective_id: 'so-3-1', description: '# of people reached with community-based health interventions (communicable diseases, NCDs, immunization, nutrition, MNCH)', notes: 'Measures the total number of beneficiaries reached through ERCS-led or -supported health programs, including awareness, services, referrals, and direct health interventions.', baseline: '93,358', target_2030: '1,035,723', means_of_verification: 'Health campaign reports, beneficiary records, volunteer outreach logs', frequency: 'Annually' },
  { id: 'kpi-3-1-b', strategic_priority_id: 'sp-3', strategic_objective_id: 'so-3-1', description: '# of ERCS-supported health facilities', notes: 'Measures the total number of government health facilities supported through repair and equipment delivery.', baseline: '8', target_2030: '102', means_of_verification: 'Field visit report', frequency: 'Annually' },
  { id: 'kpi-3-1-c', strategic_priority_id: 'sp-3', strategic_objective_id: 'so-3-1', description: '# of health workers and ERCS volunteers trained in disease prevention, outbreak response, and essential health services', notes: 'Tracks capacity-building to ensure a skilled workforce for epidemic control, maternal and child health, immunization, and NCDs.', baseline: '390', target_2030: '3,500', means_of_verification: 'Training attendance sheets', frequency: 'Annually' },
  { id: 'kpi-3-2-a', strategic_priority_id: 'sp-3', strategic_objective_id: 'so-3-2', description: '# of emergency-affected people provided with access to safe water, sanitation, and hygiene services', notes: 'Measures individuals benefiting from WASH interventions during emergencies — water trucking, latrine construction, hygiene kits, behavior change campaigns.', baseline: 'NA', target_2030: '6,760,349', means_of_verification: 'Emergency WASH distribution reports', frequency: 'Annually' },
  { id: 'kpi-3-2-b', strategic_priority_id: 'sp-3', strategic_objective_id: 'so-3-2', description: '# of health and community facilities supported with integrated emergency health, WASH, and MHPSS interventions', notes: 'Tracks how many health posts, mobile clinics, or community facilities were supported during emergencies with water, sanitation, hygiene promotion, and mental health/psychosocial support.', baseline: 'NA', target_2030: '412', means_of_verification: 'Facility monitoring checklists, service delivery logs, post-intervention evaluations', frequency: 'Annually' },
  { id: 'kpi-3-3-a', strategic_priority_id: 'sp-3', strategic_objective_id: 'so-3-3', description: '# of people provided with sustained access to safe drinking water', notes: 'Tracks beneficiaries reached through new or rehabilitated water systems, including solar-powered and gravity-fed systems, with regular maintenance support.', baseline: '100,000', target_2030: '680,000', means_of_verification: 'Project completion reports, WASH beneficiary surveys, water system functionality audits', frequency: 'Annually' },
  { id: 'kpi-3-3-b', strategic_priority_id: 'sp-3', strategic_objective_id: 'so-3-3', description: '# of schools and health facilities with improved, gender-sensitive sanitation and hygiene infrastructure and services', notes: "Measures ERCS's impact on institutional WASH, aligned with national WASH-in-institutions (WinS) standards.", baseline: '14', target_2030: '118', means_of_verification: 'Facility WASH assessments, WASH in Schools (WinS) reports', frequency: 'Annually' },
  { id: 'kpi-3-4-a', strategic_priority_id: 'sp-3', strategic_objective_id: 'so-3-4', description: '# of emergency cases responded to by ERCS EMS within the national target response time (≤30 min urban, ≤60 min rural)', notes: 'Tracks the number and timeliness of EMS responses, reflecting operational coverage and system efficiency.', baseline: '308,968', target_2030: '3,118,834', means_of_verification: 'EMS dispatch logs', frequency: 'Annually' },
  { id: 'kpi-3-4-b', strategic_priority_id: 'sp-3', strategic_objective_id: 'so-3-4', description: '% of fully equipped ambulance services', notes: "Measures ERCS's logistical and technical readiness to deliver EMS services, particularly in conflict zones, disaster-prone, and rural regions.", baseline: '3%', target_2030: '80%', means_of_verification: 'EMS readiness reports', frequency: 'Annually' },

  // SP4 — Members, Volunteer and Youth engagement and management
  { id: 'kpi-4-1-a', strategic_priority_id: 'sp-4', strategic_objective_id: 'so-4-1', description: '% increase in the number of members recruited', notes: "Measures the reach and penetration of ERCS membership nationwide relative to Ethiopia's population.", baseline: '6%', target_2030: '10%', means_of_verification: 'Membership registration database, national population data, annual reports', frequency: 'Annually' },
  { id: 'kpi-4-1-b', strategic_priority_id: 'sp-4', strategic_objective_id: 'so-4-1', description: '% of members receiving regular updates on ERCS activities and services through digital or offline platforms', notes: 'Measures the level of transparency and participation of ERCS members.', baseline: 'NA', target_2030: '30%', means_of_verification: 'Communication report on messages shared with members', frequency: 'Mid-term and end of the strategic period' },
  { id: 'kpi-4-2-a', strategic_priority_id: 'sp-4', strategic_objective_id: 'so-4-2', description: '# of active volunteers with complete digital profiles and engaged in humanitarian actions', notes: 'Measures volunteers actively participating in ERCS missions, tracked through digital systems.', baseline: '45,727', target_2030: '692,085', means_of_verification: 'Volunteer management system, deployment records', frequency: 'Annually' },
  { id: 'kpi-4-2-b', strategic_priority_id: 'sp-4', strategic_objective_id: 'so-4-2', description: 'Volunteer retention rate', notes: 'Measures continuity and effectiveness of volunteer management systems.', baseline: 'NA', target_2030: '85%', means_of_verification: 'Assessment report / seasonal report', frequency: 'Mid-term and end of the strategic period' },
  { id: 'kpi-4-3-a', strategic_priority_id: 'sp-4', strategic_objective_id: 'so-4-3', description: '# of youth council structures established and strengthened across branches', notes: 'Measures the youth council established and strengthened across branches.', baseline: 'NA', target_2030: '67', means_of_verification: 'Monitoring reports', frequency: 'Annually' },
  { id: 'kpi-4-3-b', strategic_priority_id: 'sp-4', strategic_objective_id: 'so-4-3', description: '# of Red Cross clubs established in and out of school that are fully functional', notes: 'Measures the total number of functional Red Cross Clubs promoting ERCS services and core values.', baseline: 'NA', target_2030: '2,050', means_of_verification: 'Monitoring reports', frequency: 'Annually' },

  // SP5 — Humanitarian diplomacy and Communication
  { id: 'kpi-5-1-a', strategic_priority_id: 'sp-5', strategic_objective_id: 'so-5-1', description: '% decrease in casualties among ERCS staff, volunteers, and damage to properties', notes: 'Measures the reduction in casualties and property damage/loss affecting ERCS staff, volunteers, and properties.', baseline: 'NA', target_2030: '2%', means_of_verification: 'Accident report', frequency: 'Mid-term and end of the strategic period' },
  { id: 'kpi-5-1-b', strategic_priority_id: 'sp-5', strategic_objective_id: 'so-5-1', description: '% of ERCS programs and operations that integrate humanitarian diplomacy components', notes: 'Measures the extent to which HD is mainstreamed across ERCS interventions.', baseline: 'NA', target_2030: '70%', means_of_verification: 'Assessment report', frequency: 'End of the strategic period' },
  { id: 'kpi-5-2-a', strategic_priority_id: 'sp-5', strategic_objective_id: 'so-5-2', description: 'Growth rate of ERCS digital engagement metrics (website visits, social media followers, shares, interactions)', notes: 'Tracks increase in online visibility and public engagement through digital platforms.', baseline: 'NA', target_2030: '20%', means_of_verification: 'Communication report', frequency: 'Mid-term and end of the strategic period' },
  { id: 'kpi-5-2-b', strategic_priority_id: 'sp-5', strategic_objective_id: 'so-5-2', description: '# of active media partnerships promoting ERCS humanitarian impact', notes: 'Quantifies collaboration with media outlets and influencers to amplify ERCS stories.', baseline: 'NA', target_2030: '15 active media partnerships', means_of_verification: 'Partnership agreements, media coverage reports', frequency: 'Mid-term and end of the strategic period' },
  { id: 'kpi-5-3-a', strategic_priority_id: 'sp-5', strategic_objective_id: 'so-5-3', description: '# of ERCS advocacy recommendations reflected in national humanitarian policies and strategies', notes: 'Measures the extent to which ERCS advocacy efforts influence national-level humanitarian policies, strategies, and frameworks.', baseline: 'NA', target_2030: '5', means_of_verification: 'Assessment', frequency: 'Mid-term and end of the strategic period' },
  { id: 'kpi-5-3-b', strategic_priority_id: 'sp-5', strategic_objective_id: 'so-5-3', description: '# of primary stakeholders reached through dissemination and advocacy activities on humanitarian principles, IHL, and ERCS priorities', notes: 'Measures key stakeholders directly reached through ERCS dissemination and advocacy activities.', baseline: 'NA', target_2030: '11,700', means_of_verification: 'Attendance records', frequency: 'Mid-term and end of the strategic period' },

  // SP6 — Partnership Development and Management
  { id: 'kpi-6-1-a', strategic_priority_id: 'sp-6', strategic_objective_id: 'so-6-1', description: '# of formal partnerships (Movement and non-Movement) established or renewed', notes: 'Measures formal partnerships established or renewed through signed MoUs with Movement and non-Movement partners.', baseline: 'NA', target_2030: '225', means_of_verification: 'Partnership agreements, MoUs, collaboration reports', frequency: 'Annually' },
  { id: 'kpi-6-1-b', strategic_priority_id: 'sp-6', strategic_objective_id: 'so-6-1', description: '% of partners reporting satisfaction with collaboration and coordination with ERCS', notes: 'Measures partnership quality based on partner feedback on communication, coordination, and mutual benefit.', baseline: 'NA', target_2030: '75%', means_of_verification: 'Satisfaction survey', frequency: 'End of the strategic period' },
  { id: 'kpi-6-2-a', strategic_priority_id: 'sp-6', strategic_objective_id: 'so-6-2', description: '# of active private sector partnerships established and contributed to ERCS humanitarian services', notes: 'Tracks the number and growth of structured partnerships with private sector entities aligned to ERCS goals.', baseline: 'NA', target_2030: '40', means_of_verification: 'Partnership agreements, MoUs, collaboration reports', frequency: 'End of the strategic period' },
  { id: 'kpi-6-2-b', strategic_priority_id: 'sp-6', strategic_objective_id: 'so-6-2', description: '# of Corporate Social Responsibility (CSR) initiatives utilized', notes: 'Measures the total number of CSR initiatives, contributions, or partnerships from private sector entities.', baseline: 'NA', target_2030: '20', means_of_verification: 'Partnership reports, financial/in-kind contribution records, impact evaluations', frequency: 'End of the strategic period' },
  { id: 'kpi-6-3-a', strategic_priority_id: 'sp-6', strategic_objective_id: 'so-6-3', description: '# of formal partnership agreements (MoUs) signed and implemented with key government institutions', notes: 'Tracks the number and implementation status of MoUs or cooperation frameworks signed with federal/regional government entities.', baseline: 'NA', target_2030: '15', means_of_verification: 'Signed agreements, implementation progress reports, joint action plans', frequency: 'End of the strategic period' },
  { id: 'kpi-6-3-b', strategic_priority_id: 'sp-6', strategic_objective_id: 'so-6-3', description: '% of national policy and strategic frameworks influenced or supported by ERCS contributions', notes: 'Measures ERCS participation in national policy forums, working groups, or strategic planning processes.', baseline: 'NA', target_2030: '60% of relevant frameworks influenced by 2030', means_of_verification: 'Policy meeting records, consultation reports, official government acknowledgments', frequency: 'End of the strategic period' },

  // SP7 — Institutional and Leadership Transformation
  { id: 'kpi-7-1-a', strategic_priority_id: 'sp-7', strategic_objective_id: 'so-7-1', description: '% of staff receiving at least one capacity-building or technical training per year', notes: 'Measures the proportion of ERCS staff receiving at least one structured training during the reporting year.', baseline: '65%', target_2030: '85%', means_of_verification: 'HR records', frequency: 'Mid-term of the strategic period' },
  { id: 'kpi-7-1-b', strategic_priority_id: 'sp-7', strategic_objective_id: 'so-7-1', description: 'Post-training performance improvement score (pre- and post-test or supervisor assessment)', notes: 'Measures the average improvement in staff knowledge, skills, or job performance following training.', baseline: 'NA', target_2030: '60%', means_of_verification: 'Pre- and post-training report', frequency: 'Mid-term of the strategic period' },
  { id: 'kpi-7-2-a', strategic_priority_id: 'sp-7', strategic_objective_id: 'so-7-2', description: '# of branches meeting satisfactory (>70%) and above performance threshold', notes: "Measures the number of branches achieving a 'satisfactory' or higher performance rating.", baseline: 'NA', target_2030: '15', means_of_verification: 'Branch reports', frequency: 'Mid-term of the strategic period' },
  { id: 'kpi-7-2-b', strategic_priority_id: 'sp-7', strategic_objective_id: 'so-7-2', description: '# of branches with fully in-place manpower as per the organizational structure', notes: 'Measures branches with all required staff positions filled per the approved organizational structure.', baseline: 'NA', target_2030: '15', means_of_verification: 'Assessment report', frequency: 'End of the strategic period' },
  { id: 'kpi-7-3-a', strategic_priority_id: 'sp-7', strategic_objective_id: 'so-7-3', description: '# of best practices documented and validated for scaling up', notes: 'Measures best practices identified, documented, and validated through MEAL processes with potential to be replicated or scaled up.', baseline: 'NA', target_2030: '5', means_of_verification: 'Best practice report', frequency: 'Annually' },
  { id: 'kpi-7-3-b', strategic_priority_id: 'sp-7', strategic_objective_id: 'so-7-3', description: '% of monitoring findings and recommendations utilized for management decision-making', notes: 'Measures the proportion of monitoring findings and recommendations actively applied by ERCS management.', baseline: 'NA', target_2030: '85%', means_of_verification: 'Monitoring report', frequency: 'Annually' },
  { id: 'kpi-7-4-a', strategic_priority_id: 'sp-7', strategic_objective_id: 'so-7-4', description: '% of Risk Assessment Coverage', notes: 'Departments and branches conducting formal risk assessments annually, covering internal and external risk factors.', baseline: 'NA', target_2030: '95%', means_of_verification: 'Risk assessment reports, audit records', frequency: 'Annually' },
  { id: 'kpi-7-4-b', strategic_priority_id: 'sp-7', strategic_objective_id: 'so-7-4', description: '% of Risk Mitigation Plan Implementation', notes: 'Identified risks with documented mitigation and monitoring plans actively implemented and tracked.', baseline: 'NA', target_2030: '90%', means_of_verification: 'Risk registers, progress reports', frequency: 'Annually' },
  { id: 'kpi-7-5-a', strategic_priority_id: 'sp-7', strategic_objective_id: 'so-7-5', description: '% of Operational Processes Fully Digitalized', notes: '% of key operational workflows (procurement, payroll, data collection, reporting) transitioned to fully digital platforms.', baseline: '35%', target_2030: '90%', means_of_verification: 'Departmental operations audit, digital workflow logs', frequency: 'Mid-term of the strategic period' },
  { id: 'kpi-7-5-b', strategic_priority_id: 'sp-7', strategic_objective_id: 'so-7-5', description: 'Digital Literacy Coverage among Staff and Volunteers', notes: "% of staff and volunteers trained and certified in basic digital literacy and ERCS's core digital tools.", baseline: '30%', target_2030: '85%', means_of_verification: 'Training records, LMS, digital literacy assessments', frequency: 'Mid-term of the strategic period' },

  // SP8 — Resource Development, Mobilization & Utilization
  { id: 'kpi-8-1-a', strategic_priority_id: 'sp-8', strategic_objective_id: 'so-8-1', description: 'Amount of revenue generated from IGAs', notes: 'Tracks financial viability of existing and new Income-Generating Activities.', baseline: 'TBD', target_2030: 'ETB 8,313,670,440 (approx.)', means_of_verification: 'Financial reports', frequency: 'Annually' },
  { id: 'kpi-8-1-b', strategic_priority_id: 'sp-8', strategic_objective_id: 'so-8-1', description: 'Amount of income secured from membership', notes: 'Measures total revenue generated from membership fees collected by ERCS.', baseline: 'TBD', target_2030: 'ETB 8,811,330,006 (approx.)', means_of_verification: 'Financial reports', frequency: 'Annually' },
  { id: 'kpi-8-1-c', strategic_priority_id: 'sp-8', strategic_objective_id: 'so-8-1', description: 'Amount of resources mobilized through fundraising events', notes: 'Measures the total monetary value of resources mobilized through organized fundraising events.', baseline: 'ETB 39,235,968 (approx.)', target_2030: 'ETB 2,138,566,246 (approx.)', means_of_verification: 'Financial reports', frequency: 'Annually' },
  { id: 'kpi-8-2-a', strategic_priority_id: 'sp-8', strategic_objective_id: 'so-8-2', description: 'Amount of fund mobilized from partners', notes: 'Measures the total value of financial or in-kind resources secured by ERCS from partners.', baseline: 'ETB 3,077,975,799', target_2030: 'ETB 15,129,770,177 (approx.)', means_of_verification: 'Financial reports', frequency: 'Annually' },
  { id: 'kpi-8-2-b', strategic_priority_id: 'sp-8', strategic_objective_id: 'so-8-2', description: 'Number of ready-to-pitch concept notes/proposals maintained on dashboard', notes: 'Total number of updated, high-quality proposals and concept notes available for submission on short notice.', baseline: 'NA', target_2030: '300', means_of_verification: 'Proposal dashboard, MEAL & Program pipeline', frequency: 'Annually' },
  { id: 'kpi-8-3-a', strategic_priority_id: 'sp-8', strategic_objective_id: 'so-8-3', description: 'Number of new IGAs developed and completed', notes: 'Measures the total number of new Income-Generating Activities developed and completed.', baseline: 'NA', target_2030: '11', means_of_verification: 'RM report', frequency: 'Mid-term of the strategic period' },
  { id: 'kpi-8-3-b', strategic_priority_id: 'sp-8', strategic_objective_id: 'so-8-3', description: 'Number of existing IGAs diversified', notes: 'Measures existing IGAs modified or expanded to include additional income streams, products, or services.', baseline: 'NA', target_2030: '28', means_of_verification: 'RM report', frequency: 'Mid-term of the strategic period' },
  { id: 'kpi-8-3-c', strategic_priority_id: 'sp-8', strategic_objective_id: 'so-8-3', description: 'Number of profitable IGAs expanded', notes: 'Measures the total number of IGAs that have been both profitable and successfully expanded.', baseline: 'NA', target_2030: '124', means_of_verification: 'RM report', frequency: 'Mid-term of the strategic period' },
  { id: 'kpi-8-4-a', strategic_priority_id: 'sp-8', strategic_objective_id: 'so-8-4', description: '% of Resource Utilization Efficiency', notes: 'Resources used efficiently while meeting the expected target.', baseline: 'NA', target_2030: '85%', means_of_verification: 'Evaluation report', frequency: 'Mid-term of the strategic period' },
  { id: 'kpi-8-4-b', strategic_priority_id: 'sp-8', strategic_objective_id: 'so-8-4', description: '% of Resource Management Systems Fully Digitalized', notes: '% of key resource management systems (inventory, procurement, logistics, IGAs) digitalized and integrated.', baseline: 'NA', target_2030: '90%', means_of_verification: 'ICT report', frequency: 'Mid-term of the strategic period' },
];

// No progress logged yet — exactly like the Monitoring Register's blank
// template rows start empty. Grows only via addKpiProgressEntry.
export const INITIAL_KPI_PROGRESS_ENTRIES: KpiProgressEntry[] = [];