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
  VaultReportRecord,
  ToolRecord,
  LessonLearnedRecord,
  MediaUpdateRecord,
  TemplateGuidelineRecord,
  ResourceCenterRecord,
  StatusThresholdBand,
  QuarterPeriodConfig,
  NonProgrammaticActivity,
} from '../types';

// ---------------------------------------------------------------------------
// Authoritative ERCS 2019 AOP Seed Data
// Sourced from ERCS_2019_AOP_final_for_PMER_MIS_settings.xlsx
// Numeric target & budget fields are intentionally left empty (0) as per spec.
// ---------------------------------------------------------------------------

export const INITIAL_STRATEGIC_PRIORITIES: StrategicPriority[] = [
  {
    "id": "sp-1",
    "code": "SP1",
    "name": "Disaster Preparedness and Response",
    "objective": "Disaster Preparedness and Response"
  },
  {
    "id": "sp-2",
    "code": "SP2",
    "name": "Disaster Risk Reduction and Community Resilience",
    "objective": "Disaster Risk Reduction and Community Resilience"
  },
  {
    "id": "sp-3",
    "code": "SP3",
    "name": "Health and wellbeing",
    "objective": "Health and wellbeing"
  },
  {
    "id": "sp-4",
    "code": "SP4",
    "name": "Members, Volunteer and Youth engagement and management",
    "objective": "Members, Volunteer and Youth engagement and management"
  },
  {
    "id": "sp-5",
    "code": "SP5",
    "name": "Humanitarian Diplomacy and Communication",
    "objective": "Humanitarian Diplomacy and Communication"
  },
  {
    "id": "sp-6",
    "code": "SP6",
    "name": "Partnership Development and Management",
    "objective": "Partnership Development and Management"
  },
  {
    "id": "sp-7",
    "code": "SP7",
    "name": "Institutional and leadership transformation",
    "objective": "Institutional and leadership transformation"
  },
  {
    "id": "sp-8",
    "code": "SP8",
    "name": "Resource Development, Mobilization & Utilization",
    "objective": "Resource Development, Mobilization & Utilization"
  }
];

export const INITIAL_STRATEGIC_OBJECTIVES: StrategicObjective[] = [
  {
    "id": "so-1-1",
    "strategic_priority_id": "sp-1",
    "code": "1.1",
    "name": "Enhance disaster preparedness measures"
  },
  {
    "id": "so-1-2",
    "strategic_priority_id": "sp-1",
    "code": "1.2",
    "name": "Strengthen anticipatory action initiatives"
  },
  {
    "id": "so-1-3",
    "strategic_priority_id": "sp-1",
    "code": "1.3",
    "name": "Deliver dignified and timely humanitarian responses to affected communities"
  },
  {
    "id": "so-1-4",
    "strategic_priority_id": "sp-1",
    "code": "1.4",
    "name": "Strengthen early recovery in disaster-affected communities"
  },
  {
    "id": "so-2-1",
    "strategic_priority_id": "sp-2",
    "code": "2.1",
    "name": "Mitigate climate change Impacts and reduce socio-economic risks"
  },
  {
    "id": "so-2-2",
    "strategic_priority_id": "sp-2",
    "code": "2.2",
    "name": "Enhance livelihoods and economic opportunities for vulnerable communities and youths"
  },
  {
    "id": "so-2-3",
    "strategic_priority_id": "sp-2",
    "code": "2.3",
    "name": "Promote peace and advance a culture of non-violence"
  },
  {
    "id": "so-2-4",
    "strategic_priority_id": "sp-2",
    "code": "2.4",
    "name": "Strengthen migration services and Restoring Family Links (RFL)"
  },
  {
    "id": "so-3-1",
    "strategic_priority_id": "sp-3",
    "code": "3.1",
    "name": "Address public health concerns"
  },
  {
    "id": "so-3-2",
    "strategic_priority_id": "sp-3",
    "code": "3.2",
    "name": "Strengthen Health & WASH  in Emergencies"
  },
  {
    "id": "so-3-3",
    "strategic_priority_id": "sp-3",
    "code": "3.3",
    "name": "Improved access to safe water and sanitation services"
  },
  {
    "id": "so-3-4",
    "strategic_priority_id": "sp-3",
    "code": "3.4",
    "name": "Strengthen Emergency Medical Services"
  },
  {
    "id": "so-4-1",
    "strategic_priority_id": "sp-4",
    "code": "4.1",
    "name": "Improve Membership Recruitment, Retantion and Engagement"
  },
  {
    "id": "so-4-2",
    "strategic_priority_id": "sp-4",
    "code": "4.2",
    "name": "Enhance Volunteer Recruitment, Engagement and Management"
  },
  {
    "id": "so-4-3",
    "strategic_priority_id": "sp-4",
    "code": "4.3",
    "name": "Strengthen the Empowerment and Engagement of Youth Volunteers"
  },
  {
    "id": "so-5-1",
    "strategic_priority_id": "sp-5",
    "code": "5.1",
    "name": "Strengthen Humanitarian Diplomacy within ERCS Operations"
  },
  {
    "id": "so-5-2",
    "strategic_priority_id": "sp-5",
    "code": "5.2",
    "name": "Enhance Strategic Communication and Visibility of ERCS\u2019s Humanitarian Impact"
  },
  {
    "id": "so-5-3",
    "strategic_priority_id": "sp-5",
    "code": "5.3",
    "name": "Disseminate and advocate to Influence Humanitarian Policy and Practice"
  },
  {
    "id": "so-6-1",
    "strategic_priority_id": "sp-6",
    "code": "6.1",
    "name": "Enhance and expand collaborative and coordinated partnership to drive mutual growth and innovation"
  },
  {
    "id": "so-6-2",
    "strategic_priority_id": "sp-6",
    "code": "6.2",
    "name": "Establish a robust framework to effectively engage the private sector and drive strategic partnership"
  },
  {
    "id": "so-6-3",
    "strategic_priority_id": "sp-6",
    "code": "6.3",
    "name": "Strengthen support and collaboration with the government to effectivily contribute to policy implementation and national development"
  },
  {
    "id": "so-7-1",
    "strategic_priority_id": "sp-7",
    "code": "7.1",
    "name": "Strengthen governance(leadership),management and staff   capacity at all levels of the organization"
  },
  {
    "id": "so-7-2",
    "strategic_priority_id": "sp-7",
    "code": "7.2",
    "name": "Enhance branch capacity and optimize localization (Branch Affairs)"
  },
  {
    "id": "so-7-3",
    "strategic_priority_id": "sp-7",
    "code": "7.3",
    "name": "Strengthen compliance and risk management capacity to ensure sustained organizational stability"
  },
  {
    "id": "so-7-4",
    "strategic_priority_id": "sp-7",
    "code": "7.4",
    "name": "Strengthen and digitize organizational systems to drive operational efficiency, transparency, and  accountability."
  },
  {
    "id": "so-7-5",
    "strategic_priority_id": "sp-7",
    "code": "7.5",
    "name": "Strengthen Planning, Monitoring, Evaluation, Accountability, and Learning (PMEAL) Systems"
  },
  {
    "id": "so-8-1",
    "strategic_priority_id": "sp-8",
    "code": "8.1",
    "name": "Maximize local  resources mobilization"
  },
  {
    "id": "so-8-2",
    "strategic_priority_id": "sp-8",
    "code": "8.2",
    "name": "Maximize Grant Funding through strenghthening systems and capacity"
  },
  {
    "id": "so-8-3",
    "strategic_priority_id": "sp-8",
    "code": "8.3",
    "name": "Strengthen Resources Development and Diversify IGAs schemes"
  },
  {
    "id": "so-8-4",
    "strategic_priority_id": "sp-8",
    "code": "8.4",
    "name": "Optimize operational efficiency through enhanced resource utilization & management"
  }
];

export const INITIAL_NATIONAL_ACTIVITIES: NationalActivity[] = [
  {
    "id": "na-1-1-1",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-1",
    "code": "1.1.1",
    "description": "Develop National level Multi hazard contingency plan",
    "uom": "# of MHCP",
    "responsibility": "HQ",
    "department": "DPR",
    "activity_description": "Develop National level Multi hazard contingency plan",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 2.0,
    "ercs_budget": 1000000.0,
    "hq_target": 2.0,
    "hq_budget": 1000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-1-1-2",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-1",
    "code": "1.1.2",
    "description": "Develop context specific Multi hazard contingency plan at Regional level",
    "uom": "# of MHCP",
    "responsibility": "RB",
    "department": "",
    "activity_description": "Develop context specific Multi hazard contingency plan at Regional level",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 22.0,
    "ercs_budget": 1775000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 22.0,
    "rb_budget": 1775000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 2.0,
        "budget": 10000.0
      },
      "reg-addis-ababa": {
        "target": 2.0,
        "budget": 200000.0
      },
      "reg-amhara": {
        "target": 2.0,
        "budget": 200000.0
      },
      "reg-central-ethiopia": {
        "target": 2.0,
        "budget": 200000.0
      },
      "reg-south-ethiopia": {
        "target": 1.0,
        "budget": 75000.0
      },
      "reg-south-west-ethiopia": {
        "target": 1.0,
        "budget": 200000.0
      },
      "reg-sidama": {
        "target": 2.0,
        "budget": 20000.0
      },
      "reg-tigray": {
        "target": 2.0,
        "budget": 200000.0
      },
      "reg-gambella": {
        "target": 1.0,
        "budget": 120000.0
      },
      "reg-benishangul-gumuz": {
        "target": 2.0,
        "budget": 100000.0
      },
      "reg-harar": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-dire-dawa": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-somali": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-afar": {
        "target": 1.0,
        "budget": 130000.0
      },
      "reg-moyale": {
        "target": 1.0,
        "budget": 70000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-1-1-3",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-1",
    "code": "1.1.3",
    "description": "Update SoPs and Guidelines (ECVA, and EOC)",
    "uom": "# of Policy, guidelines & SOP",
    "responsibility": "HQ",
    "department": "DPR",
    "activity_description": "Update SoPs and Guidelines (ECVA, and EOC)",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 2.0,
    "ercs_budget": 500000.0,
    "hq_target": 2.0,
    "hq_budget": 500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-1-1-4",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-1",
    "code": "1.1.4",
    "description": "Renovate branch warehouses",
    "uom": "# renovated warehouse",
    "responsibility": "RB",
    "department": "",
    "activity_description": "Renovate branch warehouses",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "grc-hacap3"
    ],
    "ercs_target": 10.0,
    "ercs_budget": 7331000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 10.0,
    "rb_budget": 7331000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 3.0,
        "budget": 2100000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 1.0,
        "budget": 600000.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 2.0,
        "budget": 1400000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 200000.0
      },
      "reg-tigray": {
        "target": 1.0,
        "budget": 600000.0
      },
      "reg-gambella": {
        "target": 1.0,
        "budget": 2231000.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 200000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 1.0,
        "budget": 3000560000.0
      }
    }
  },
  {
    "id": "na-1-1-5",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-1",
    "code": "1.1.5",
    "description": "Construct new strategic warehouses",
    "uom": "# of warehouse",
    "responsibility": "HQ",
    "department": "DPR",
    "activity_description": "Construct new strategic warehouses",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 20000000.0,
    "hq_target": 1.0,
    "hq_budget": 20000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-1-1-6",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-1",
    "code": "1.1.6",
    "description": "Construct new warehouses at branches",
    "uom": "#  new warehouse",
    "responsibility": "RB",
    "department": "",
    "activity_description": "Construct new warehouses at branches",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 5.0,
    "ercs_budget": 18000000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 5.0,
    "rb_budget": 18000000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 4.0,
        "budget": 15000000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 1.0,
        "budget": 3000000.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-1-1-7",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-1",
    "code": "1.1.7",
    "description": "Estabilish and provide training to multidisciplinary search and rescue team",
    "uom": "# of people trained",
    "responsibility": "HQ",
    "department": "DPR",
    "activity_description": "Estabilish and provide training to multidisciplinary search and rescue team",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 42.0,
    "ercs_budget": 3000000.0,
    "hq_target": 42.0,
    "hq_budget": 3000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-1-1-8",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-1",
    "code": "1.1.8",
    "description": "Provide BDRT training and estabilish the team at branches",
    "uom": "# of people trained",
    "responsibility": "both",
    "department": "DPR (minus Branch)",
    "activity_description": "Provide BDRT training and estabilish the team at branches",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 819.0,
    "ercs_budget": 20607900.0,
    "hq_target": 378.0,
    "hq_budget": 14145600.0,
    "rb_target": 441.0,
    "rb_budget": 6462300.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 105.0,
        "budget": 1822500.0
      },
      "reg-addis-ababa": {
        "target": 50.0,
        "budget": 200000.0
      },
      "reg-amhara": {
        "target": 30.0,
        "budget": 800000.0
      },
      "reg-central-ethiopia": {
        "target": 23.0,
        "budget": 174000.0
      },
      "reg-south-ethiopia": {
        "target": 42.0,
        "budget": 1000000.0
      },
      "reg-south-west-ethiopia": {
        "target": 30.0,
        "budget": 940800.0
      },
      "reg-sidama": {
        "target": 35.0,
        "budget": 250000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 14.0,
        "budget": 175000.0
      },
      "reg-benishangul-gumuz": {
        "target": 30.0,
        "budget": 200000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 17.0,
        "budget": 200000.0
      },
      "reg-somali": {
        "target": 15.0,
        "budget": 400000.0
      },
      "reg-afar": {
        "target": 25.0,
        "budget": 200000.0
      },
      "reg-moyale": {
        "target": 25.0,
        "budget": 100000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-1-1-9",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-1",
    "code": "1.1.9",
    "description": "Pre-position emergency supplies at high-risk areas",
    "uom": "#HHs",
    "responsibility": "both",
    "department": "DPR (minus Branch)",
    "activity_description": "Pre-position emergency supplies at high-risk areas",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "grc-hacap3",
      "ehppr"
    ],
    "ercs_target": 14752.0,
    "ercs_budget": 135140920.0,
    "hq_target": 8575.0,
    "hq_budget": 85270920.0,
    "rb_target": 6177.0,
    "rb_budget": 49870000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 2731.0,
        "budget": 25510000.0
      },
      "reg-addis-ababa": {
        "target": 100.0,
        "budget": 1000000.0
      },
      "reg-amhara": {
        "target": 900.0,
        "budget": 10800000.0
      },
      "reg-central-ethiopia": {
        "target": 296.0,
        "budget": 2960000.0
      },
      "reg-south-ethiopia": {
        "target": 1200.0,
        "budget": 3000000.0
      },
      "reg-south-west-ethiopia": {
        "target": 150.0,
        "budget": 400000.0
      },
      "reg-sidama": {
        "target": 200.0,
        "budget": 1000000.0
      },
      "reg-tigray": {
        "target": 100.0,
        "budget": 1000000.0
      },
      "reg-gambella": {
        "target": 50.0,
        "budget": 500000.0
      },
      "reg-benishangul-gumuz": {
        "target": 100.0,
        "budget": 200000.0
      },
      "reg-harar": {
        "target": 100.0,
        "budget": 1000000.0
      },
      "reg-dire-dawa": {
        "target": 100.0,
        "budget": 1000000.0
      },
      "reg-somali": {
        "target": 100.0,
        "budget": 1000000.0
      },
      "reg-afar": {
        "target": 50.0,
        "budget": 500000.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 600.0,
        "budget": 1780000.0
      },
      "ehppr": {
        "target": 1.0,
        "budget": 4243962.0
      }
    }
  },
  {
    "id": "na-1-1-10",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-1",
    "code": "1.1.10",
    "description": "Improve functionality of EOC",
    "uom": "# of functional EOCs",
    "responsibility": "both",
    "department": "DPR (minus Branch)",
    "activity_description": "Improve functionality of EOC",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "grc-hacap3",
      "l4r"
    ],
    "ercs_target": 9.0,
    "ercs_budget": 10953357.66,
    "hq_target": 9.0,
    "hq_budget": 7530000.0,
    "rb_target": 5.0,
    "rb_budget": 3423357.66,
    "regional_targets": {
      "reg-oromia": {
        "target": 1.0,
        "budget": 1100000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 1.0,
        "budget": 250000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 500000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 30000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 1.0,
        "budget": 1543357.66
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 1.0,
        "budget": 1780000.0
      },
      "l4r": {
        "target": 2.0,
        "budget": 570400.0
      }
    }
  },
  {
    "id": "na-1-2-1",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-2",
    "code": "1.2.1",
    "description": "Revise ERCS\u2019s national anticipatory action framework/Early Action Protocol(EAP)",
    "uom": "# of Framework (EAP)",
    "responsibility": "HQ",
    "department": "DPR",
    "activity_description": "Revise ERCS\u2019s national anticipatory action framework/Early Action Protocol(EAP)",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [
      "ethiopia-mfa-dev-2026"
    ],
    "ercs_target": 1.0,
    "ercs_budget": 400000.0,
    "hq_target": 1.0,
    "hq_budget": 400000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "ethiopia-mfa-dev-2026": {
        "target": 1.0,
        "budget": 8333.333333333334
      }
    }
  },
  {
    "id": "na-1-2-2",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-2",
    "code": "1.2.2",
    "description": "Formalize data sharing through signing agreement with national and international partners (EDRMC and UN Agencies)",
    "uom": "# of Agreements",
    "responsibility": "HQ",
    "department": "DPR",
    "activity_description": "Formalize data sharing through signing agreement with national and international partners (EDRMC and UN Agencies)",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 2.0,
    "ercs_budget": 400000.0,
    "hq_target": 2.0,
    "hq_budget": 400000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-1-2-3",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-2",
    "code": "1.2.3",
    "description": "Develop and update reliable communication channels for disseminating early warning information.",
    "uom": "# of channel develop",
    "responsibility": "both",
    "department": "DPR (minus Branch)",
    "activity_description": "Develop and update reliable communication channels for disseminating early warning information.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "l4r"
    ],
    "ercs_target": 22.0,
    "ercs_budget": 1522000.0,
    "hq_target": 3.0,
    "hq_budget": 1000000.0,
    "rb_target": 19.0,
    "rb_budget": 522000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 1.0,
        "budget": 110000.0
      },
      "reg-central-ethiopia": {
        "target": 2.0,
        "budget": 20000.0
      },
      "reg-south-ethiopia": {
        "target": 3.0,
        "budget": 110000.0
      },
      "reg-south-west-ethiopia": {
        "target": 2.0,
        "budget": 20000.0
      },
      "reg-sidama": {
        "target": 4.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 1.0,
        "budget": 10000.0
      },
      "reg-gambella": {
        "target": 1.0,
        "budget": 60000.0
      },
      "reg-benishangul-gumuz": {
        "target": 3.0,
        "budget": 2000.0
      },
      "reg-harar": {
        "target": 1.0,
        "budget": 10000.0
      },
      "reg-dire-dawa": {
        "target": 1.0,
        "budget": 130000.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "l4r": {
        "target": 1.0,
        "budget": 184000.0
      }
    }
  },
  {
    "id": "na-1-2-4",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-2",
    "code": "1.2.4",
    "description": "Organize workshop to support local early warning committees to track climate risk indicators, communicate alerts, and lead local early action.",
    "uom": "# of committee memebers",
    "responsibility": "both",
    "department": "DPR (minus Branch)",
    "activity_description": "Organize workshop to support local early warning committees to track climate risk indicators, communicate alerts, and lead local early action.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "ethiopia-mfa-dev-2026"
    ],
    "ercs_target": 643.0,
    "ercs_budget": 3778400.0,
    "hq_target": 45.0,
    "hq_budget": 1500000.0,
    "rb_target": 598.0,
    "rb_budget": 2278400.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 35.0,
        "budget": 250000.0
      },
      "reg-amhara": {
        "target": 70.0,
        "budget": 200000.0
      },
      "reg-central-ethiopia": {
        "target": 50.0,
        "budget": 100000.0
      },
      "reg-south-ethiopia": {
        "target": 83.0,
        "budget": 750000.0
      },
      "reg-south-west-ethiopia": {
        "target": 30.0,
        "budget": 100000.0
      },
      "reg-sidama": {
        "target": 42.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 70.0,
        "budget": 200000.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 35.0,
        "budget": 10000.0
      },
      "reg-harar": {
        "target": 14.0,
        "budget": 50000.0
      },
      "reg-dire-dawa": {
        "target": 78.0,
        "budget": 188400.0
      },
      "reg-somali": {
        "target": 35.0,
        "budget": 100000.0
      },
      "reg-afar": {
        "target": 35.0,
        "budget": 200000.0
      },
      "reg-moyale": {
        "target": 21.0,
        "budget": 80000.0
      }
    },
    "project_targets": {
      "ethiopia-mfa-dev-2026": {
        "target": 3.0,
        "budget": 11111.111166666667
      }
    }
  },
  {
    "id": "na-1-2-5",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-2",
    "code": "1.2.5",
    "description": "Estabilish community-based early warning systems for multiple hazards (establish context specifc mechanizems of that can communicate EWI).",
    "uom": "# of CEW system",
    "responsibility": "both",
    "department": "DPR (minus Branch)",
    "activity_description": "Estabilish community-based early warning systems for multiple hazards (establish context specifc mechanizems of that can communicate EWI).",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "ethiopia-mfa-dev-2026"
    ],
    "ercs_target": 19.0,
    "ercs_budget": 2527000.0,
    "hq_target": 1.0,
    "hq_budget": 700000.0,
    "rb_target": 18.0,
    "rb_budget": 1827000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 1.0,
        "budget": 200000.0
      },
      "reg-central-ethiopia": {
        "target": 1.0,
        "budget": 200000.0
      },
      "reg-south-ethiopia": {
        "target": 4.0,
        "budget": 70000.0
      },
      "reg-south-west-ethiopia": {
        "target": 1.0,
        "budget": 200000.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 200000.0
      },
      "reg-tigray": {
        "target": 1.0,
        "budget": 200000.0
      },
      "reg-gambella": {
        "target": 2.0,
        "budget": 235000.0
      },
      "reg-benishangul-gumuz": {
        "target": 3.0,
        "budget": 2000.0
      },
      "reg-harar": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-dire-dawa": {
        "target": 1.0,
        "budget": 200000.0
      },
      "reg-somali": {
        "target": 1.0,
        "budget": 200000.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 1.0,
        "budget": 20000.0
      }
    },
    "project_targets": {
      "ethiopia-mfa-dev-2026": {
        "target": 1.0,
        "budget": 8888.888888888889
      }
    }
  },
  {
    "id": "na-1-2-6",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-2",
    "code": "1.2.6",
    "description": "Strenghthen AA team to lead on AA planning and execution.",
    "uom": "# staff capacitated",
    "responsibility": "HQ",
    "department": "DPR",
    "activity_description": "Strenghthen AA team to lead on AA planning and execution.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 4.0,
    "ercs_budget": 4800000.0,
    "hq_target": 4.0,
    "hq_budget": 4800000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-1-2-7",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-2",
    "code": "1.2.7",
    "description": "Design and Execute AA projects in high-risk areas.",
    "uom": "# of people",
    "responsibility": "HQ",
    "department": "DPR",
    "activity_description": "Design and Execute AA projects in high-risk areas.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 40000.0,
    "ercs_budget": 20000000.0,
    "hq_target": 40000.0,
    "hq_budget": 20000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-1-2-8",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-2",
    "code": "1.2.8",
    "description": "Support partners (local authorities experts) through provision of training on anticipatory action methodologies and best practices.",
    "uom": "#of people participated",
    "responsibility": "both",
    "department": "DPR (minus Branch)",
    "activity_description": "Support partners (local authorities experts) through provision of training on anticipatory action methodologies and best practices.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "ethiopia-mfa-dev-2026",
      "l4r"
    ],
    "ercs_target": 314.0,
    "ercs_budget": 2633000.0,
    "hq_target": 150.0,
    "hq_budget": 1500000.0,
    "rb_target": 164.0,
    "rb_budget": 1133000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 20.0,
        "budget": 123000.0
      },
      "reg-south-ethiopia": {
        "target": 24.0,
        "budget": 500000.0
      },
      "reg-south-west-ethiopia": {
        "target": 30.0,
        "budget": 150000.0
      },
      "reg-sidama": {
        "target": 30.0,
        "budget": 200000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 30.0,
        "budget": 60000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 30.0,
        "budget": 100000.0
      }
    },
    "project_targets": {
      "ethiopia-mfa-dev-2026": {
        "target": 2.0,
        "budget": 8333.333333333334
      },
      "l4r": {
        "target": 1.0,
        "budget": 452640.0
      }
    }
  },
  {
    "id": "na-1-2-9",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-2",
    "code": "1.2.9",
    "description": "Engage community representatives in continous discussions about anticipatory actions and their roles in enhancing resilience.",
    "uom": "# of People",
    "responsibility": "RB",
    "department": "",
    "activity_description": "Engage community representatives in continous discussions about anticipatory actions and their roles in enhancing resilience.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 597.0,
    "ercs_budget": 2115000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 597.0,
    "rb_budget": 2115000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 100.0,
        "budget": 500000.0
      },
      "reg-central-ethiopia": {
        "target": 50.0,
        "budget": 95000.0
      },
      "reg-south-ethiopia": {
        "target": 120.0,
        "budget": 120000.0
      },
      "reg-south-west-ethiopia": {
        "target": 30.0,
        "budget": 150000.0
      },
      "reg-sidama": {
        "target": 2.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 100.0,
        "budget": 500000.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 50.0,
        "budget": 100000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 100.0,
        "budget": 500000.0
      },
      "reg-afar": {
        "target": 45.0,
        "budget": 150000.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-1-3-1",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-3",
    "code": "1.3.1",
    "description": "Conduct Rapid and Emergency need assessments",
    "uom": "# of need assessment",
    "responsibility": "both",
    "department": "DPR (minus Branch)",
    "activity_description": "Conduct Rapid and Emergency need assessments",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 91.0,
    "ercs_budget": 6831900.0,
    "hq_target": 25.0,
    "hq_budget": 4300000.0,
    "rb_target": 66.0,
    "rb_budget": 2531900.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 15.0,
        "budget": 500000.0
      },
      "reg-addis-ababa": {
        "target": 1.0,
        "budget": 25000.0
      },
      "reg-amhara": {
        "target": 6.0,
        "budget": 240000.0
      },
      "reg-central-ethiopia": {
        "target": 3.0,
        "budget": 174000.0
      },
      "reg-south-ethiopia": {
        "target": 16.0,
        "budget": 420000.0
      },
      "reg-south-west-ethiopia": {
        "target": 2.0,
        "budget": 67900.0
      },
      "reg-sidama": {
        "target": 6.0,
        "budget": 100000.0
      },
      "reg-tigray": {
        "target": 5.0,
        "budget": 200000.0
      },
      "reg-gambella": {
        "target": 1.0,
        "budget": 275000.0
      },
      "reg-benishangul-gumuz": {
        "target": 2.0,
        "budget": 100000.0
      },
      "reg-harar": {
        "target": 1.0,
        "budget": 30000.0
      },
      "reg-dire-dawa": {
        "target": 2.0,
        "budget": 90000.0
      },
      "reg-somali": {
        "target": 2.0,
        "budget": 100000.0
      },
      "reg-afar": {
        "target": 3.0,
        "budget": 140000.0
      },
      "reg-moyale": {
        "target": 1.0,
        "budget": 70000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-1-3-2",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-3",
    "code": "1.3.2",
    "description": "Support hhs through Cash asssistance",
    "uom": "# of HHs",
    "responsibility": "both",
    "department": "DPR",
    "activity_description": "Support hhs through Cash asssistance",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "grc-hacap3",
      "stream-ercs",
      "tesfa",
      "ec2r-cash"
    ],
    "ercs_target": 75000.0,
    "ercs_budget": 2205900000.0,
    "hq_target": 75000.0,
    "hq_budget": 2205900000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 100.0,
        "budget": 1157000.0
      },
      "stream-ercs": {
        "target": 200.0,
        "budget": 49451.48
      },
      "tesfa": {
        "target": 1020.0,
        "budget": 32895000.0
      },
      "ec2r-cash": {
        "target": 18233.0,
        "budget": 800883100.0
      }
    }
  },
  {
    "id": "na-1-3-3",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-3",
    "code": "1.3.3",
    "description": "Provision of General Food and/or Supplementary Food Distribution",
    "uom": "# of HHs",
    "responsibility": "both",
    "department": "DPR",
    "activity_description": "Provision of General Food and/or Supplementary Food Distribution",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "akobo"
    ],
    "ercs_target": 12294.0,
    "ercs_budget": 141762230.0,
    "hq_target": 8164.0,
    "hq_budget": 107428230.0,
    "rb_target": 4130.0,
    "rb_budget": 34334000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 2820.0,
        "budget": 22479000.0
      },
      "reg-addis-ababa": {
        "target": 100.0,
        "budget": 1150000.0
      },
      "reg-amhara": {
        "target": 700.0,
        "budget": 8400000.0
      },
      "reg-central-ethiopia": {
        "target": 75.0,
        "budget": 460000.0
      },
      "reg-south-ethiopia": {
        "target": 90.0,
        "budget": 135000.0
      },
      "reg-south-west-ethiopia": {
        "target": 150.0,
        "budget": 200000.0
      },
      "reg-sidama": {
        "target": 125.0,
        "budget": 1300000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 70.0,
        "budget": 210000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "akobo": {
        "target": 1350.0,
        "budget": 48237895.774647884
      }
    }
  },
  {
    "id": "na-1-3-4",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-3",
    "code": "1.3.4",
    "description": "Support households through ESNFIs provision",
    "uom": "# of HHs",
    "responsibility": "both",
    "department": "DPR",
    "activity_description": "Support households through ESNFIs provision",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "grc-hacap3",
      "akobo"
    ],
    "ercs_target": 22650.0,
    "ercs_budget": 123570000.0,
    "hq_target": 18000.0,
    "hq_budget": 120600000.0,
    "rb_target": 4650.0,
    "rb_budget": 2970000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 2000.0,
        "budget": 1000000.0
      },
      "reg-addis-ababa": {
        "target": 300.0,
        "budget": 100000.0
      },
      "reg-amhara": {
        "target": 900.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 150.0,
        "budget": 100000.0
      },
      "reg-south-ethiopia": {
        "target": 600.0,
        "budget": 500000.0
      },
      "reg-south-west-ethiopia": {
        "target": 150.0,
        "budget": 250000.0
      },
      "reg-sidama": {
        "target": 100.0,
        "budget": 300000.0
      },
      "reg-tigray": {
        "target": 100.0,
        "budget": 100000.0
      },
      "reg-gambella": {
        "target": 50.0,
        "budget": 50000.0
      },
      "reg-benishangul-gumuz": {
        "target": 50.0,
        "budget": 170000.0
      },
      "reg-harar": {
        "target": 50.0,
        "budget": 50000.0
      },
      "reg-dire-dawa": {
        "target": 100.0,
        "budget": 100000.0
      },
      "reg-somali": {
        "target": 50.0,
        "budget": 150000.0
      },
      "reg-afar": {
        "target": 50.0,
        "budget": 100000.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 500.0,
        "budget": 2670000.0
      },
      "akobo": {
        "target": 6750.0,
        "budget": 9989264.25
      }
    }
  },
  {
    "id": "na-1-3-5",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-3",
    "code": "1.3.5",
    "description": "Support IDPs and host communities through shelter construction/renovation",
    "uom": "# of HHs",
    "responsibility": "both",
    "department": "DPR",
    "activity_description": "Support IDPs and host communities through shelter construction/renovation",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "grc-hacap3",
      "akobo"
    ],
    "ercs_target": 2453.0,
    "ercs_budget": 208986000.0,
    "hq_target": 2351.0,
    "hq_budget": 202186000.0,
    "rb_target": 102.0,
    "rb_budget": 6800000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 70.0,
        "budget": 4400000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 6.0,
        "budget": 1400000.0
      },
      "reg-south-ethiopia": {
        "target": 16.0,
        "budget": 800000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 10.0,
        "budget": 200000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 100.0,
        "budget": 15753000.0
      },
      "akobo": {
        "target": 4500.0,
        "budget": 44713849.5
      }
    }
  },
  {
    "id": "na-1-3-6",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-3",
    "code": "1.3.6",
    "description": "Provision animal fodder to drought prone areas",
    "uom": "# of houeholds",
    "responsibility": "both",
    "department": "DPR",
    "activity_description": "Provision animal fodder to drought prone areas",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 10000.0,
    "ercs_budget": 51440000.0,
    "hq_target": 10000.0,
    "hq_budget": 51440000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-1-3-7",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-3",
    "code": "1.3.7",
    "description": "Support for animal vaccination",
    "uom": "# of livestock",
    "responsibility": "both",
    "department": "DPR",
    "activity_description": "Support for animal vaccination",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "sraps"
    ],
    "ercs_target": 151500.0,
    "ercs_budget": 15150000.0,
    "hq_target": 151500.0,
    "hq_budget": 15150000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "sraps": {
        "target": 3.0,
        "budget": 7500.0
      }
    }
  },
  {
    "id": "na-1-4-1",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-4",
    "code": "1.4.1",
    "description": "Restore livelihoods of the affected communities ( Re-stocking small ruminants and etc)",
    "uom": "# of HHs",
    "responsibility": "both",
    "department": "DPR",
    "activity_description": "Restore livelihoods of the affected communities ( Re-stocking small ruminants and etc)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 10045.0,
    "ercs_budget": 231450080.0,
    "hq_target": 10000.0,
    "hq_budget": 231034080.0,
    "rb_target": 45.0,
    "rb_budget": 416000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 10.0,
        "budget": 166000.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 30.0,
        "budget": 200000.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 5.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-1-4-2",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-4",
    "code": "1.4.2",
    "description": "Provide vocatonal and skills training to enhance job opportunity",
    "uom": "# People",
    "responsibility": "both",
    "department": "DPR",
    "activity_description": "Provide vocatonal and skills training to enhance job opportunity",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 86.0,
    "ercs_budget": 1370000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 86.0,
    "rb_budget": 1370000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 20.0,
        "budget": 110000.0
      },
      "reg-south-ethiopia": {
        "target": 60.0,
        "budget": 1200000.0
      },
      "reg-south-west-ethiopia": {
        "target": 6.0,
        "budget": 60000.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-1-4-3",
    "strategic_priority_id": "sp-1",
    "strategic_objective_id": "so-1-4",
    "code": "1.4.3",
    "description": "Provide scholalstic or educational support to students affected by disasters.",
    "uom": "# of Students Supported",
    "responsibility": "both",
    "department": "DPR",
    "activity_description": "Provide scholalstic or educational support to students affected by disasters.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 8177.0,
    "ercs_budget": 17046800.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 8177.0,
    "rb_budget": 17046800.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 4177.0,
        "budget": 7241800.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 1000.0,
        "budget": 3000000.0
      },
      "reg-central-ethiopia": {
        "target": 500.0,
        "budget": 1000000.0
      },
      "reg-south-ethiopia": {
        "target": 1000.0,
        "budget": 2500000.0
      },
      "reg-south-west-ethiopia": {
        "target": 150.0,
        "budget": 180000.0
      },
      "reg-sidama": {
        "target": 100.0,
        "budget": 300000.0
      },
      "reg-tigray": {
        "target": 500.0,
        "budget": 1500000.0
      },
      "reg-gambella": {
        "target": 50.0,
        "budget": 100000.0
      },
      "reg-benishangul-gumuz": {
        "target": 100.0,
        "budget": 200000.0
      },
      "reg-harar": {
        "target": 50.0,
        "budget": 150000.0
      },
      "reg-dire-dawa": {
        "target": 200.0,
        "budget": 300000.0
      },
      "reg-somali": {
        "target": 100.0,
        "budget": 300000.0
      },
      "reg-afar": {
        "target": 150.0,
        "budget": 230000.0
      },
      "reg-moyale": {
        "target": 100.0,
        "budget": 45000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-2-1-1",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-1",
    "code": "2.1.1",
    "description": "Create climate awareness for communities vulnerable to climate change",
    "uom": "#HH",
    "responsibility": "Both",
    "department": "DRR",
    "activity_description": "Create climate awareness for communities vulnerable to climate change",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "l4r"
    ],
    "ercs_target": 60750.0,
    "ercs_budget": 7018000.0,
    "hq_target": 16000.0,
    "hq_budget": 5000000.0,
    "rb_target": 44750.0,
    "rb_budget": 2018000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 2000.0,
        "budget": 973000.0
      },
      "reg-addis-ababa": {
        "target": 50.0,
        "budget": 120000.0
      },
      "reg-amhara": {
        "target": 1800.0,
        "budget": 225000.0
      },
      "reg-central-ethiopia": {
        "target": 25800.0,
        "budget": 50000.0
      },
      "reg-south-ethiopia": {
        "target": 3000.0,
        "budget": 150000.0
      },
      "reg-south-west-ethiopia": {
        "target": 200.0,
        "budget": 100000.0
      },
      "reg-sidama": {
        "target": 1000.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 3000.0,
        "budget": 70000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 200.0,
        "budget": 100000.0
      },
      "reg-somali": {
        "target": 500.0,
        "budget": 100000.0
      },
      "reg-afar": {
        "target": 200.0,
        "budget": 20000.0
      },
      "reg-moyale": {
        "target": 7000.0,
        "budget": 60000.0
      }
    },
    "project_targets": {
      "l4r": {
        "target": 1.0,
        "budget": 736000.0
      }
    }
  },
  {
    "id": "na-2-1-2",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-1",
    "code": "2.1.2",
    "description": "EVCA assessment and proposal development",
    "uom": "# of proposal developed",
    "responsibility": "Both",
    "department": "DRR",
    "activity_description": "EVCA assessment and proposal development",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "l4r"
    ],
    "ercs_target": 88.0,
    "ercs_budget": 7370000.0,
    "hq_target": 40.0,
    "hq_budget": 6000000.0,
    "rb_target": 48.0,
    "rb_budget": 1370000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 15.0,
        "budget": 300000.0
      },
      "reg-addis-ababa": {
        "target": 2.0,
        "budget": 40000.0
      },
      "reg-amhara": {
        "target": 7.0,
        "budget": 350000.0
      },
      "reg-central-ethiopia": {
        "target": 2.0,
        "budget": 60000.0
      },
      "reg-south-ethiopia": {
        "target": 4.0,
        "budget": 200000.0
      },
      "reg-south-west-ethiopia": {
        "target": 5.0,
        "budget": 100000.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 5.0,
        "budget": 80000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 5.0,
        "budget": 200000.0
      },
      "reg-afar": {
        "target": 2.0,
        "budget": 40000.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "l4r": {
        "target": 6.0,
        "budget": 1288000.0
      }
    }
  },
  {
    "id": "na-2-1-3",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-1",
    "code": "2.1.3",
    "description": "Support the dissemination of climate-smart agricultural practices in farming and pastoral communities.",
    "uom": "# HH",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "Support the dissemination of climate-smart agricultural practices in farming and pastoral communities.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "l4r",
      "tesfa"
    ],
    "ercs_target": 14330.0,
    "ercs_budget": 18775000.0,
    "hq_target": 12000.0,
    "hq_budget": 18000000.0,
    "rb_target": 2330.0,
    "rb_budget": 775000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 1800.0,
        "budget": 225000.0
      },
      "reg-central-ethiopia": {
        "target": 200.0,
        "budget": 50000.0
      },
      "reg-south-ethiopia": {
        "target": 300.0,
        "budget": 200000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 30.0,
        "budget": 300000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "l4r": {
        "target": 50.0,
        "budget": 1298488.0
      },
      "tesfa": {
        "target": 180.0,
        "budget": 1959768.0
      }
    }
  },
  {
    "id": "na-2-1-4",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-1",
    "code": "2.1.4",
    "description": "Establish/strengthen community based disaster risk management committees /CBDRMC/ (DA, Volunteers)  on climate-smart agriculture and sustainable water management.",
    "uom": "# CBDRMC established /capacitated",
    "responsibility": "Branch",
    "department": "DRR",
    "activity_description": "Establish/strengthen community based disaster risk management committees /CBDRMC/ (DA, Volunteers)  on climate-smart agriculture and sustainable water management.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "sraps"
    ],
    "ercs_target": 663.0,
    "ercs_budget": 5810000.0,
    "hq_target": 40.0,
    "hq_budget": 2400000.0,
    "rb_target": 623.0,
    "rb_budget": 3410000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 10.0,
        "budget": 1730000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 18.0,
        "budget": 360000.0
      },
      "reg-central-ethiopia": {
        "target": 10.0,
        "budget": 50000.0
      },
      "reg-south-ethiopia": {
        "target": 500.0,
        "budget": 600000.0
      },
      "reg-south-west-ethiopia": {
        "target": 50.0,
        "budget": 150000.0
      },
      "reg-sidama": {
        "target": 20.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 5.0,
        "budget": 100000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 2.0,
        "budget": 100000.0
      },
      "reg-afar": {
        "target": 2.0,
        "budget": 170000.0
      },
      "reg-moyale": {
        "target": 6.0,
        "budget": 100000.0
      }
    },
    "project_targets": {
      "sraps": {
        "target": 95.0,
        "budget": 18550.0
      }
    }
  },
  {
    "id": "na-2-1-5",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-1",
    "code": "2.1.5",
    "description": "Implement land restoration and environmental protection initiatives (construction of soil and water conservation measures, tree plantation, area closure, range land protection\u2026)",
    "uom": "hactares of land restored",
    "responsibility": "RB",
    "department": "DRR",
    "activity_description": "Implement land restoration and environmental protection initiatives (construction of soil and water conservation measures, tree plantation, area closure, range land protection\u2026)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "l4r",
      "stream-ercs"
    ],
    "ercs_target": 301.0,
    "ercs_budget": 14802500.0,
    "hq_target": 230.0,
    "hq_budget": 12100000.0,
    "rb_target": 71.0,
    "rb_budget": 2702500.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 28.0,
        "budget": 567500.0
      },
      "reg-addis-ababa": {
        "target": 1.0,
        "budget": 140000.0
      },
      "reg-amhara": {
        "target": 8.0,
        "budget": 800000.0
      },
      "reg-central-ethiopia": {
        "target": 5.0,
        "budget": 130000.0
      },
      "reg-south-ethiopia": {
        "target": 12.0,
        "budget": 700000.0
      },
      "reg-south-west-ethiopia": {
        "target": 2.0,
        "budget": 20000.0
      },
      "reg-sidama": {
        "target": 8.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 3.0,
        "budget": 25000.0
      },
      "reg-benishangul-gumuz": {
        "target": 3.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 1.0,
        "budget": 220000.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "stream-ercs": {
        "target": 200.0,
        "budget": 12709.88
      },
      "l4r": {
        "target": 3.0,
        "budget": 552000.0
      }
    }
  },
  {
    "id": "na-2-1-6",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-1",
    "code": "2.1.6",
    "description": "Diversify livelihoods for volnerable households",
    "uom": "# HH",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "Diversify livelihoods for volnerable households",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "sraps",
      "tesfa"
    ],
    "ercs_target": 12065.0,
    "ercs_budget": 243350000.0,
    "hq_target": 12000.0,
    "hq_budget": 240000000.0,
    "rb_target": 65.0,
    "rb_budget": 3350000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 50.0,
        "budget": 2500000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 5.0,
        "budget": 250000.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 5.0,
        "budget": 300000.0
      },
      "reg-afar": {
        "target": 5.0,
        "budget": 300000.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "sraps": {
        "target": 250.0,
        "budget": 40000.0
      },
      "tesfa": {
        "target": 120.0,
        "budget": 4592400.0
      }
    }
  },
  {
    "id": "na-2-1-7",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-1",
    "code": "2.1.7",
    "description": "Provide agroforestry support to households",
    "uom": "# HHs",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "Provide agroforestry support to households",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "l4r",
      "sraps"
    ],
    "ercs_target": 1320.0,
    "ercs_budget": 29840000.0,
    "hq_target": 810.0,
    "hq_budget": 29160000.0,
    "rb_target": 510.0,
    "rb_budget": 680000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 400.0,
        "budget": 450000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 100.0,
        "budget": 30000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 10.0,
        "budget": 200000.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "sraps": {
        "target": 400.0,
        "budget": 12000.0
      },
      "l4r": {
        "target": 51.0,
        "budget": 828000.0
      }
    }
  },
  {
    "id": "na-2-1-8",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-1",
    "code": "2.1.8",
    "description": "supply climate-resilient crop varieties and animal fodder",
    "uom": "# of HH",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "supply climate-resilient crop varieties and animal fodder",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "grc-hacap3",
      "l4r",
      "sraps"
    ],
    "ercs_target": 702.0,
    "ercs_budget": 24255304.0,
    "hq_target": 652.0,
    "hq_budget": 22755304.0,
    "rb_target": 50.0,
    "rb_budget": 1500000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 50.0,
        "budget": 1500000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 50.0,
        "budget": 4450000.0
      },
      "sraps": {
        "target": 600.0,
        "budget": 59500.002
      },
      "l4r": {
        "target": 550.0,
        "budget": 14361200.0
      }
    }
  },
  {
    "id": "na-2-1-9",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-1",
    "code": "2.1.9",
    "description": "supply drought-resistant livestock",
    "uom": "# of HH",
    "responsibility": "Both",
    "department": "DRR",
    "activity_description": "supply drought-resistant livestock",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "l4r"
    ],
    "ercs_target": 163.0,
    "ercs_budget": 5688826.2,
    "hq_target": 163.0,
    "hq_budget": 5688826.2,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "l4r": {
        "target": 200.0,
        "budget": 11776000.0
      }
    }
  },
  {
    "id": "na-2-2-1",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-2",
    "code": "2.2.1",
    "description": "Facilitate Training on basic business skills to vulnerable communites",
    "uom": "#beneficairies",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "Facilitate Training on basic business skills to vulnerable communites",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "grc-hacap3",
      "l4r",
      "tesfa"
    ],
    "ercs_target": 2352.0,
    "ercs_budget": 7025000.0,
    "hq_target": 2200.0,
    "hq_budget": 6600000.0,
    "rb_target": 152.0,
    "rb_budget": 425000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 12.0,
        "budget": 120000.0
      },
      "reg-amhara": {
        "target": 15.0,
        "budget": 75000.0
      },
      "reg-central-ethiopia": {
        "target": 20.0,
        "budget": 50000.0
      },
      "reg-south-ethiopia": {
        "target": 100.0,
        "budget": 160000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 5.0,
        "budget": 20000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 50.0,
        "budget": 1335000.0
      },
      "l4r": {
        "target": 250.0,
        "budget": 2876858.0
      },
      "tesfa": {
        "target": 120.0,
        "budget": 3048528.0000000005
      }
    }
  },
  {
    "id": "na-2-2-2",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-2",
    "code": "2.2.2",
    "description": "Provide finacial support for vulnerable communites trained on BBS to start business.",
    "uom": "# beneficiaries",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "Provide finacial support for vulnerable communites trained on BBS to start business.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "grc-hacap3",
      "l4r",
      "tesfa"
    ],
    "ercs_target": 2258.0,
    "ercs_budget": 111595000.0,
    "hq_target": 2200.0,
    "hq_budget": 110000000.0,
    "rb_target": 58.0,
    "rb_budget": 1595000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 8.0,
        "budget": 400000.0
      },
      "reg-amhara": {
        "target": 15.0,
        "budget": 375000.0
      },
      "reg-central-ethiopia": {
        "target": 10.0,
        "budget": 120000.0
      },
      "reg-south-ethiopia": {
        "target": 20.0,
        "budget": 600000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 5.0,
        "budget": 100000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 50.0,
        "budget": 3275200.0
      },
      "l4r": {
        "target": 306.0,
        "budget": 8137885.0
      },
      "tesfa": {
        "target": 120.0,
        "budget": 8256000.0
      }
    }
  },
  {
    "id": "na-2-2-3",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-2",
    "code": "2.2.3",
    "description": "Facilitate access to youth vocational skills training and employment opportunities.",
    "uom": "#youths",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "Facilitate access to youth vocational skills training and employment opportunities.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 640.0,
    "ercs_budget": 30880000.0,
    "hq_target": 600.0,
    "hq_budget": 30000000.0,
    "rb_target": 40.0,
    "rb_budget": 880000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 10.0,
        "budget": 60000.0
      },
      "reg-amhara": {
        "target": 5.0,
        "budget": 500000.0
      },
      "reg-central-ethiopia": {
        "target": 10.0,
        "budget": 20000.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 5.0,
        "budget": 100000.0
      },
      "reg-somali": {
        "target": 10.0,
        "budget": 200000.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-2-3-1",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-3",
    "code": "2.3.1",
    "description": "Support community based peace promotion, conflict prevention and peacefull coexistence through organizing community dialogues",
    "uom": "# of participants",
    "responsibility": "branches",
    "department": "DRR",
    "activity_description": "Support community based peace promotion, conflict prevention and peacefull coexistence through organizing community dialogues",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 13200.0,
    "ercs_budget": 7342800.0,
    "hq_target": 12000.0,
    "hq_budget": 4852800.0,
    "rb_target": 1200.0,
    "rb_budget": 2490000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 200.0,
        "budget": 1480000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 200.0,
        "budget": 100000.0
      },
      "reg-south-ethiopia": {
        "target": 120.0,
        "budget": 240000.0
      },
      "reg-south-west-ethiopia": {
        "target": 360.0,
        "budget": 200000.0
      },
      "reg-sidama": {
        "target": 200.0,
        "budget": 100000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 50.0,
        "budget": 225000.0
      },
      "reg-benishangul-gumuz": {
        "target": 50.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 20.0,
        "budget": 95000.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-2-3-2",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-3",
    "code": "2.3.2",
    "description": "Train volunteers and community members in conflict prevention facilitation skills.",
    "uom": "# of trained participants",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "Train volunteers and community members in conflict prevention facilitation skills.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 1655.0,
    "ercs_budget": 6975246.0,
    "hq_target": 750.0,
    "hq_budget": 2929996.0,
    "rb_target": 905.0,
    "rb_budget": 4045250.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 100.0,
        "budget": 1703250.0
      },
      "reg-addis-ababa": {
        "target": 30.0,
        "budget": 100000.0
      },
      "reg-amhara": {
        "target": 135.0,
        "budget": 1350000.0
      },
      "reg-central-ethiopia": {
        "target": 90.0,
        "budget": 182000.0
      },
      "reg-south-ethiopia": {
        "target": 280.0,
        "budget": 360000.0
      },
      "reg-south-west-ethiopia": {
        "target": 150.0,
        "budget": 100000.0
      },
      "reg-sidama": {
        "target": 50.0,
        "budget": 150000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 70.0,
        "budget": 100000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-2-3-3",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-3",
    "code": "2.3.3",
    "description": "Engage youth school clubs in developing culture of non-violence",
    "uom": "# of school clubs engaged",
    "responsibility": "branches",
    "department": "DRR",
    "activity_description": "Engage youth school clubs in developing culture of non-violence",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 504.0,
    "ercs_budget": 4779498.0,
    "hq_target": 175.0,
    "hq_budget": 2091998.0,
    "rb_target": 329.0,
    "rb_budget": 2687500.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 50.0,
        "budget": 1615000.0
      },
      "reg-addis-ababa": {
        "target": 12.0,
        "budget": 120000.0
      },
      "reg-amhara": {
        "target": 9.0,
        "budget": 225000.0
      },
      "reg-central-ethiopia": {
        "target": 41.0,
        "budget": 127500.0
      },
      "reg-south-ethiopia": {
        "target": 20.0,
        "budget": 60000.0
      },
      "reg-south-west-ethiopia": {
        "target": 100.0,
        "budget": 50000.0
      },
      "reg-sidama": {
        "target": 10.0,
        "budget": 100000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 12.0,
        "budget": 90000.0
      },
      "reg-benishangul-gumuz": {
        "target": 50.0,
        "budget": 120000.0
      },
      "reg-harar": {
        "target": 5.0,
        "budget": 20000.0
      },
      "reg-dire-dawa": {
        "target": 10.0,
        "budget": 30000.0
      },
      "reg-somali": {
        "target": 5.0,
        "budget": 100000.0
      },
      "reg-afar": {
        "target": 5.0,
        "budget": 30000.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-2-3-4",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-3",
    "code": "2.3.4",
    "description": "facilitate community representatives meeting on use of indigenous knowledges to promote peace and culture of non voilence ( Clan leaders, religion leaders\u2026)",
    "uom": "# of oriented Community representatives",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "facilitate community representatives meeting on use of indigenous knowledges to promote peace and culture of non voilence ( Clan leaders, religion leaders\u2026)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 1755.0,
    "ercs_budget": 3936754.0,
    "hq_target": 1345.0,
    "hq_budget": 2106754.0,
    "rb_target": 410.0,
    "rb_budget": 1830000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 50.0,
        "budget": 1370000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 40.0,
        "budget": 50000.0
      },
      "reg-south-ethiopia": {
        "target": 200.0,
        "budget": 250000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 120.0,
        "budget": 160000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-2-3-5",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-3",
    "code": "2.3.5",
    "description": "Raise awareness on cullture of peaceful and coexistance through media",
    "uom": "# of people",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "Raise awareness on cullture of peaceful and coexistance through media",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 1240000.0,
    "ercs_budget": 3277600.0,
    "hq_target": 1150000.0,
    "hq_budget": 2850000.0,
    "rb_target": 90000.0,
    "rb_budget": 427600.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 30000.0,
        "budget": 27600.0
      },
      "reg-south-ethiopia": {
        "target": 30000.0,
        "budget": 350000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 30000.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-2-4-1",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-4",
    "code": "2.4.1",
    "description": "Provide humanitarian assistance and protection to migrants, including returnees, refugees, internally displaced persons (IDPs), and cross-border migrants.",
    "uom": "Person",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "Provide humanitarian assistance and protection to migrants, including returnees, refugees, internally displaced persons (IDPs), and cross-border migrants.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "tesfa"
    ],
    "ercs_target": 203360.0,
    "ercs_budget": 102999000.0,
    "hq_target": 202810.0,
    "hq_budget": 102329000.0,
    "rb_target": 550.0,
    "rb_budget": 670000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 20.0,
        "budget": 100000.0
      },
      "reg-south-ethiopia": {
        "target": 200.0,
        "budget": 500000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 30.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 200.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 100.0,
        "budget": 20000.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "tesfa": {
        "target": 10.0,
        "budget": 516000.0
      }
    }
  },
  {
    "id": "na-2-4-2",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-4",
    "code": "2.4.2",
    "description": "Disseminate timely and accurate information to potential migrants/ individuals prior to  departure to ensure informed and voluntary migration decisions.",
    "uom": "person",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "Disseminate timely and accurate information to potential migrants/ individuals prior to  departure to ensure informed and voluntary migration decisions.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "tesfa"
    ],
    "ercs_target": 7600.0,
    "ercs_budget": 1069000.0,
    "hq_target": 5000.0,
    "hq_budget": 905000.0,
    "rb_target": 2600.0,
    "rb_budget": 164000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 200.0,
        "budget": 100000.0
      },
      "reg-central-ethiopia": {
        "target": 1200.0,
        "budget": 44000.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 1000.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 100.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 100.0,
        "budget": 20000.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "tesfa": {
        "target": 1.0,
        "budget": 412800.0
      }
    }
  },
  {
    "id": "na-2-4-3",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-4",
    "code": "2.4.3",
    "description": "Provide Mental and psychosocial support for migrants and vulnerable communities through community based MHPSS services and degnified reference",
    "uom": "person",
    "responsibility": "branches",
    "department": "DRR",
    "activity_description": "Provide Mental and psychosocial support for migrants and vulnerable communities through community based MHPSS services and degnified reference",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "tesfa"
    ],
    "ercs_target": 29247.0,
    "ercs_budget": 2802000.0,
    "hq_target": 28500.0,
    "hq_budget": 2280000.0,
    "rb_target": 747.0,
    "rb_budget": 522000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 200.0,
        "budget": 200000.0
      },
      "reg-central-ethiopia": {
        "target": 72.0,
        "budget": 52000.0
      },
      "reg-south-ethiopia": {
        "target": 200.0,
        "budget": 100000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 100.0,
        "budget": 40000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 60.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 50.0,
        "budget": 50000.0
      },
      "reg-afar": {
        "target": 35.0,
        "budget": 70000.0
      },
      "reg-moyale": {
        "target": 30.0,
        "budget": 10000.0
      }
    },
    "project_targets": {
      "tesfa": {
        "target": 24.0,
        "budget": 1238400.0
      }
    }
  },
  {
    "id": "na-2-4-4",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-4",
    "code": "2.4.4",
    "description": "Provide the socio-economic integration of migrants and vulnerable communities by offering basic business & life skills training  as well as business start up capital,",
    "uom": "Persons",
    "responsibility": "HQ",
    "department": "DRR",
    "activity_description": "Provide the socio-economic integration of migrants and vulnerable communities by offering basic business & life skills training  as well as business start up capital,",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 2200.0,
    "ercs_budget": 110277200.0,
    "hq_target": 2200.0,
    "hq_budget": 110277200.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-2-4-5",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-4",
    "code": "2.4.5",
    "description": "Organize/ participate in National and international partners collaboration workshops to address cross-border challenges.",
    "uom": "# of coordination meeting conducted",
    "responsibility": "HQ",
    "department": "DRR",
    "activity_description": "Organize/ participate in National and international partners collaboration workshops to address cross-border challenges.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 12.0,
    "ercs_budget": 1300000.0,
    "hq_target": 4.0,
    "hq_budget": 1200000.0,
    "rb_target": 8.0,
    "rb_budget": 100000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 4.0,
        "budget": 100000.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-2-4-6",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-4",
    "code": "2.4.6",
    "description": "Coordinate with local partners government officials to promote the dignity, safety, and legal protection of migrants and displaced populations.",
    "uom": "# of coordination meeting conducted",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "Coordinate with local partners government officials to promote the dignity, safety, and legal protection of migrants and displaced populations.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "tesfa"
    ],
    "ercs_target": 36.0,
    "ercs_budget": 832000.0,
    "hq_target": 4.0,
    "hq_budget": 500000.0,
    "rb_target": 32.0,
    "rb_budget": 332000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 4.0,
        "budget": 82000.0
      },
      "reg-south-ethiopia": {
        "target": 2.0,
        "budget": 200000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 12.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 12.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 2.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "tesfa": {
        "target": 8.0,
        "budget": 584800.0
      }
    }
  },
  {
    "id": "na-2-4-7",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-4",
    "code": "2.4.7",
    "description": "Capacitate through training of volunteers, stakeholders and community members on Magration, Protection, Reintegration and MHPSS issues",
    "uom": "# of trainees",
    "responsibility": "HQ",
    "department": "DRR",
    "activity_description": "Capacitate through training of volunteers, stakeholders and community members on Magration, Protection, Reintegration and MHPSS issues",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [
      "tesfa"
    ],
    "ercs_target": 550.0,
    "ercs_budget": 5500000.0,
    "hq_target": 550.0,
    "hq_budget": 5500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "tesfa": {
        "target": 164.0,
        "budget": 2107997.6
      }
    }
  },
  {
    "id": "na-2-4-8",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-4",
    "code": "2.4.8",
    "description": "Provision of maintaining family contacts (on connectivity services).",
    "uom": "# of Beneficiaries",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "Provision of maintaining family contacts (on connectivity services).",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 250000.0,
    "ercs_budget": 10600000.0,
    "hq_target": 250000.0,
    "hq_budget": 10600000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-2-4-9",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-4",
    "code": "2.4.9",
    "description": "Provision of restoring family contacts (on connectivity services) for those who get the service for the 1st time.",
    "uom": "# of Beneficiaries",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "Provision of restoring family contacts (on connectivity services) for those who get the service for the 1st time.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 60000.0,
    "ercs_budget": 0.0,
    "hq_target": 60000.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-2-4-10",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-4",
    "code": "2.4.10",
    "description": "Provide RFL dissemination /awareness creation to prevent the family separtion for  the affected communities (Returnees, Migrants, IDPs & Refugees)",
    "uom": "persons",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "Provide RFL dissemination /awareness creation to prevent the family separtion for  the affected communities (Returnees, Migrants, IDPs & Refugees)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 692300.0,
    "ercs_budget": 905000.0,
    "hq_target": 630300.0,
    "hq_budget": 100000.0,
    "rb_target": 62000.0,
    "rb_budget": 805000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 5000.0,
        "budget": 301000.0
      },
      "reg-addis-ababa": {
        "target": 8000.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 5000.0,
        "budget": 250000.0
      },
      "reg-central-ethiopia": {
        "target": 5000.0,
        "budget": 4000.0
      },
      "reg-south-ethiopia": {
        "target": 1000.0,
        "budget": 250000.0
      },
      "reg-south-west-ethiopia": {
        "target": 5000.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 5000.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 5000.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 5000.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 5000.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 1000.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 5000.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 5000.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 1000.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 1000.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-2-4-11",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-4",
    "code": "2.4.11",
    "description": "Registration and follow up of tracing case (RCM & tracing request) to restore the missing family members",
    "uom": "# of tracing cases registered & traced",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "Registration and follow up of tracing case (RCM & tracing request) to restore the missing family members",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 1049.0,
    "ercs_budget": 534000.0,
    "hq_target": 800.0,
    "hq_budget": 0.0,
    "rb_target": 249.0,
    "rb_budget": 534000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 50.0,
        "budget": 100000.0
      },
      "reg-addis-ababa": {
        "target": 50.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 50.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 20.0,
        "budget": 40000.0
      },
      "reg-south-ethiopia": {
        "target": 15.0,
        "budget": 24000.0
      },
      "reg-south-west-ethiopia": {
        "target": 5.0,
        "budget": 50000.0
      },
      "reg-sidama": {
        "target": 5.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 10.0,
        "budget": 50000.0
      },
      "reg-gambella": {
        "target": 4.0,
        "budget": 40000.0
      },
      "reg-benishangul-gumuz": {
        "target": 15.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 5.0,
        "budget": 10000.0
      },
      "reg-dire-dawa": {
        "target": 5.0,
        "budget": 10000.0
      },
      "reg-somali": {
        "target": 5.0,
        "budget": 50000.0
      },
      "reg-afar": {
        "target": 5.0,
        "budget": 50000.0
      },
      "reg-moyale": {
        "target": 5.0,
        "budget": 10000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-2-4-12",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-4",
    "code": "2.4.12",
    "description": "Enhance the capacity of the RFL staff, focal points & volunteers  through trainings",
    "uom": "# of trainees",
    "responsibility": "both",
    "department": "DRR",
    "activity_description": "Enhance the capacity of the RFL staff, focal points & volunteers  through trainings",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 600.0,
    "ercs_budget": 5138800.0,
    "hq_target": 600.0,
    "hq_budget": 5138800.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-2-4-13",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-4",
    "code": "2.4.13",
    "description": "Participate in cluster meeting with humanitarian actors working on protection",
    "uom": "# of cluster meeting",
    "responsibility": "branch",
    "department": "DRR",
    "activity_description": "Participate in cluster meeting with humanitarian actors working on protection",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 245.0,
    "ercs_budget": 599000.0,
    "hq_target": 132.0,
    "hq_budget": 0.0,
    "rb_target": 113.0,
    "rb_budget": 599000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 24.0,
        "budget": 483000.0
      },
      "reg-addis-ababa": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 12.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 4.0,
        "budget": 20000.0
      },
      "reg-south-ethiopia": {
        "target": 3.0,
        "budget": 96000.0
      },
      "reg-south-west-ethiopia": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 12.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 6.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 12.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 12.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 4.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-2-4-14",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-4",
    "code": "2.4.14",
    "description": "Installation of charging solar power  and provision of charging services for the refugees",
    "uom": "# of Beneficiaries",
    "responsibility": "HQ",
    "department": "DRR",
    "activity_description": "Installation of charging solar power  and provision of charging services for the refugees",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 150000.0,
    "ercs_budget": 1000000.0,
    "hq_target": 150000.0,
    "hq_budget": 1000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-2-4-15",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-4",
    "code": "2.4.15",
    "description": "Maitainance of Tukul stracture /conistruction of Kiosk/Tents in the refugee camps",
    "uom": "# Tukul/Kiosk",
    "responsibility": "HQ",
    "department": "DRR",
    "activity_description": "Maitainance of Tukul stracture /conistruction of Kiosk/Tents in the refugee camps",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 5.0,
    "ercs_budget": 2000000.0,
    "hq_target": 5.0,
    "hq_budget": 2000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-2-4-16",
    "strategic_priority_id": "sp-2",
    "strategic_objective_id": "so-2-4",
    "code": "2.4.16",
    "description": "Provision of RFL Promotional and Visibility materials (Bill board, Leafleats, Vest, Umbrella)",
    "uom": "# of people",
    "responsibility": "HQ",
    "department": "DRR",
    "activity_description": "Provision of RFL Promotional and Visibility materials (Bill board, Leafleats, Vest, Umbrella)",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 2000.0,
    "ercs_budget": 3000000.0,
    "hq_target": 2000.0,
    "hq_budget": 3000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-3-1-1",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-1",
    "code": "3.1.1",
    "description": "Promote NCD prevention through behaviour change communication, support health facilities, and  early detection/ screenings and referrals.",
    "uom": "# of individuals reached",
    "responsibility": "Both",
    "department": "Health & WASH",
    "activity_description": "Promote NCD prevention through behaviour change communication, support health facilities, and  early detection/ screenings and referrals.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 42700.0,
    "ercs_budget": 10909496.0,
    "hq_target": 9500.0,
    "hq_budget": 8733104.0,
    "rb_target": 33200.0,
    "rb_budget": 2176392.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 2000.0,
        "budget": 1000000.0
      },
      "reg-addis-ababa": {
        "target": 1100.0,
        "budget": 250000.0
      },
      "reg-amhara": {
        "target": 500.0,
        "budget": 250000.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 2000.0,
        "budget": 100000.0
      },
      "reg-south-west-ethiopia": {
        "target": 300.0,
        "budget": 80000.0
      },
      "reg-sidama": {
        "target": 300.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 10000.0,
        "budget": 20000.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 5000.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 1000.0,
        "budget": 15000.0
      },
      "reg-dire-dawa": {
        "target": 10000.0,
        "budget": 211392.0
      },
      "reg-somali": {
        "target": 1000.0,
        "budget": 150000.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-3-1-2",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-1",
    "code": "3.1.2",
    "description": "Enhance prevention of major diseases like malaria and cholera (eg. ITN distribution, environmental sanitation, drugs)",
    "uom": "# of persons reached",
    "responsibility": "Both",
    "department": "Health & WASH",
    "activity_description": "Enhance prevention of major diseases like malaria and cholera (eg. ITN distribution, environmental sanitation, drugs)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "sraps",
      "cidca",
      "ec2r-health",
      "akobo",
      "eccmp-malaria"
    ],
    "ercs_target": 125630.0,
    "ercs_budget": 35410000.0,
    "hq_target": 37400.0,
    "hq_budget": 31500000.0,
    "rb_target": 88230.0,
    "rb_budget": 3910000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 12500.0,
        "budget": 250000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 5400.0,
        "budget": 1620000.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 40000.0,
        "budget": 400000.0
      },
      "reg-south-west-ethiopia": {
        "target": 15000.0,
        "budget": 1200000.0
      },
      "reg-sidama": {
        "target": 150.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 15000.0,
        "budget": 30000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 180.0,
        "budget": 360000.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "sraps": {
        "target": 600.0,
        "budget": 5400.0
      },
      "cidca": {
        "target": 250000.0,
        "budget": 111354515.0
      },
      "ec2r-health": {
        "target": 0.0,
        "budget": 115900920.69818176
      },
      "akobo": {
        "target": 2.0,
        "budget": 31711950.0
      },
      "eccmp-malaria": {
        "target": 250051.0,
        "budget": 117500000.0
      }
    }
  },
  {
    "id": "na-3-1-3",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-1",
    "code": "3.1.3",
    "description": "Promote Mothers, Neonates and Children's health (MNCH) interventions, including immunizations (eg. measles, RI)",
    "uom": "# of persons reached",
    "responsibility": "Both",
    "department": "Health & WASH",
    "activity_description": "Promote Mothers, Neonates and Children's health (MNCH) interventions, including immunizations (eg. measles, RI)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "sraps",
      "ec2r-health"
    ],
    "ercs_target": 69800.0,
    "ercs_budget": 16580000.0,
    "hq_target": 60000.0,
    "hq_budget": 15000000.0,
    "rb_target": 9800.0,
    "rb_budget": 1580000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 2700.0,
        "budget": 1350000.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 2000.0,
        "budget": 80000.0
      },
      "reg-harar": {
        "target": 100.0,
        "budget": 50000.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 5000.0,
        "budget": 100000.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "sraps": {
        "target": 8.0,
        "budget": 3200.0
      },
      "ec2r-health": {
        "target": 0.0,
        "budget": 3600000.0
      }
    }
  },
  {
    "id": "na-3-1-4",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-1",
    "code": "3.1.4",
    "description": "strengethen government primary health care systems through provision of appropriate equipment , and systems such as DHMIS, based on their need (1 health facility will serve av. 18% of 25, 000 population)",
    "uom": "# of health facilities supported",
    "responsibility": "HQ",
    "department": "Health & WASH",
    "activity_description": "strengethen government primary health care systems through provision of appropriate equipment , and systems such as DHMIS, based on their need (1 health facility will serve av. 18% of 25, 000 population)",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [
      "grc-hacap3",
      "sraps",
      "cidca"
    ],
    "ercs_target": 30.0,
    "ercs_budget": 14210526.0,
    "hq_target": 30.0,
    "hq_budget": 14210526.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 3.0,
        "budget": 890000.0
      },
      "sraps": {
        "target": 2.0,
        "budget": 10000.0
      },
      "cidca": {
        "target": 500.0,
        "budget": 24937951.0
      }
    }
  },
  {
    "id": "na-3-1-5",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-1",
    "code": "3.1.5",
    "description": "Improve readiness through training of ERCS volunteers, and health extension workers on disease prevention and control (e.g., CBHFA).",
    "uom": "# of trained persons",
    "responsibility": "Both",
    "department": "Health & WASH",
    "activity_description": "Improve readiness through training of ERCS volunteers, and health extension workers on disease prevention and control (e.g., CBHFA).",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "sraps",
      "cidca",
      "eccmp-malaria"
    ],
    "ercs_target": 1185.0,
    "ercs_budget": 10685000.0,
    "hq_target": 675.0,
    "hq_budget": 7500000.0,
    "rb_target": 510.0,
    "rb_budget": 3185000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 150.0,
        "budget": 1500000.0
      },
      "reg-central-ethiopia": {
        "target": 70.0,
        "budget": 175000.0
      },
      "reg-south-ethiopia": {
        "target": 100.0,
        "budget": 600000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 50.0,
        "budget": 140000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 50.0,
        "budget": 450000.0
      },
      "reg-benishangul-gumuz": {
        "target": 60.0,
        "budget": 70000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 30.0,
        "budget": 250000.0
      }
    },
    "project_targets": {
      "sraps": {
        "target": 72.0,
        "budget": 11700.0
      },
      "cidca": {
        "target": 0.0,
        "budget": 47455609.0
      },
      "eccmp-malaria": {
        "target": 107.0,
        "budget": 67665698.79471229
      }
    }
  },
  {
    "id": "na-3-2-1",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-2",
    "code": "3.2.1",
    "description": "Strengthening community-based disease Surveillance and Monitoring for early outbreak detection and reporting.",
    "uom": "# of person reached",
    "responsibility": "Both",
    "department": "Health & WASH",
    "activity_description": "Strengthening community-based disease Surveillance and Monitoring for early outbreak detection and reporting.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "sraps",
      "ehppr",
      "eccmp-malaria"
    ],
    "ercs_target": 8324.0,
    "ercs_budget": 4910000.0,
    "hq_target": 7600.0,
    "hq_budget": 4640000.0,
    "rb_target": 724.0,
    "rb_budget": 270000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 24.0,
        "budget": 120000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 500.0,
        "budget": 60000.0
      },
      "reg-benishangul-gumuz": {
        "target": 200.0,
        "budget": 90000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "sraps": {
        "target": 2.0,
        "budget": 5000.0
      },
      "ehppr": {
        "target": 1.0,
        "budget": 5339179.0
      },
      "eccmp-malaria": {
        "target": 5657.0,
        "budget": 41966577.48833592
      }
    }
  },
  {
    "id": "na-3-2-2",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-2",
    "code": "3.2.2",
    "description": "strengethen Healthcare Infrastructure: upgrade health facilities for outbreak readiness (e.g., WASH FIT standards) (1 health facility maintenance will serve 4,500 persons on average)",
    "uom": "# of health facilities reinnovated",
    "responsibility": "both",
    "department": "Health & WASH",
    "activity_description": "strengethen Healthcare Infrastructure: upgrade health facilities for outbreak readiness (e.g., WASH FIT standards) (1 health facility maintenance will serve 4,500 persons on average)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "ec2r-health"
    ],
    "ercs_target": 11.0,
    "ercs_budget": 81000000.0,
    "hq_target": 10.0,
    "hq_budget": 80000000.0,
    "rb_target": 1.0,
    "rb_budget": 1000000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 1.0,
        "budget": 1000000.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "ec2r-health": {
        "target": 250000.0,
        "budget": 117000000.0
      }
    }
  },
  {
    "id": "na-3-2-3",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-2",
    "code": "3.2.3",
    "description": "Provide MHPSS support ,   SGBV service and adolescent health service",
    "uom": "# of persons supported",
    "responsibility": "branch",
    "department": "Health & WASH",
    "activity_description": "Provide MHPSS support ,   SGBV service and adolescent health service",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "sraps",
      "tesfa"
    ],
    "ercs_target": 2720.0,
    "ercs_budget": 9225000.0,
    "hq_target": 2500.0,
    "hq_budget": 9000000.0,
    "rb_target": 220.0,
    "rb_budget": 225000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 20.0,
        "budget": 65000.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 100.0,
        "budget": 100000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 100.0,
        "budget": 60000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "sraps": {
        "target": 1.0,
        "budget": 10000.0
      },
      "tesfa": {
        "target": 800.0,
        "budget": 2064000.0
      }
    }
  },
  {
    "id": "na-3-2-4",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-2",
    "code": "3.2.4",
    "description": "Establish Cross Boarder Collaboration platform to reduce the effects of communicable disease (signed MoU)",
    "uom": "# of established collaborations",
    "responsibility": "HQ",
    "department": "Health & WASH",
    "activity_description": "Establish Cross Boarder Collaboration platform to reduce the effects of communicable disease (signed MoU)",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 6.0,
    "ercs_budget": 5000000.0,
    "hq_target": 6.0,
    "hq_budget": 5000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-3-2-5",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-2",
    "code": "3.2.5",
    "description": "Provision of emergency water supply through water trucking and provision of water purifications during disasters",
    "uom": "# of persons reached",
    "responsibility": "Both",
    "department": "Health & WASH",
    "activity_description": "Provision of emergency water supply through water trucking and provision of water purifications during disasters",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "akobo"
    ],
    "ercs_target": 10200.0,
    "ercs_budget": 4125000.0,
    "hq_target": 8000.0,
    "hq_budget": 3000000.0,
    "rb_target": 2200.0,
    "rb_budget": 1125000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 1200.0,
        "budget": 600000.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 250.0,
        "budget": 100000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 100.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 500.0,
        "budget": 25000.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 150.0,
        "budget": 350000.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "akobo": {
        "target": 1350.0,
        "budget": 3995705.7
      }
    }
  },
  {
    "id": "na-3-2-6",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-2",
    "code": "3.2.6",
    "description": "Construct/ rehabilitate emergency latrines (communal/household level), with handwashing stations (50 person/Sanitation facilities)",
    "uom": "# of sanitation facility",
    "responsibility": "Both",
    "department": "Health & WASH",
    "activity_description": "Construct/ rehabilitate emergency latrines (communal/household level), with handwashing stations (50 person/Sanitation facilities)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "grc-hacap3"
    ],
    "ercs_target": 58.0,
    "ercs_budget": 16859090.0,
    "hq_target": 35.0,
    "hq_budget": 5409090.0,
    "rb_target": 23.0,
    "rb_budget": 11450000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 4.0,
        "budget": 8000000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 3.0,
        "budget": 1500000.0
      },
      "reg-central-ethiopia": {
        "target": 1.0,
        "budget": 250000.0
      },
      "reg-south-ethiopia": {
        "target": 12.0,
        "budget": 200000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 1000000.0
      },
      "reg-tigray": {
        "target": 2.0,
        "budget": 500000.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 100.0,
        "budget": 1780000.0
      }
    }
  },
  {
    "id": "na-3-2-7",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-2",
    "code": "3.2.7",
    "description": "Preposition health & WASH emergency supplies",
    "uom": "# of HH",
    "responsibility": "Both",
    "department": "Health & WASH",
    "activity_description": "Preposition health & WASH emergency supplies",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "seap"
    ],
    "ercs_target": 6020.0,
    "ercs_budget": 9299558.0,
    "hq_target": 5000.0,
    "hq_budget": 7499558.0,
    "rb_target": 1020.0,
    "rb_budget": 1800000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 450.0,
        "budget": 900000.0
      },
      "reg-central-ethiopia": {
        "target": 100.0,
        "budget": 100000.0
      },
      "reg-south-ethiopia": {
        "target": 200.0,
        "budget": 400000.0
      },
      "reg-south-west-ethiopia": {
        "target": 150.0,
        "budget": 200000.0
      },
      "reg-sidama": {
        "target": 40.0,
        "budget": 100000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 80.0,
        "budget": 100000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "seap": {
        "target": 500.0,
        "budget": 774579.0
      }
    }
  },
  {
    "id": "na-3-2-8",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-2",
    "code": "3.2.8",
    "description": "conduct Community Education and Awareness (RCCE) for diseases during epidemics/ pandemics and during campaigns",
    "uom": "# of persons reached",
    "responsibility": "Both",
    "department": "Health & WASH",
    "activity_description": "conduct Community Education and Awareness (RCCE) for diseases during epidemics/ pandemics and during campaigns",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "cidca",
      "seap",
      "ec2r-health",
      "akobo"
    ],
    "ercs_target": 977900.0,
    "ercs_budget": 13877100.0,
    "hq_target": 900000.0,
    "hq_budget": 12900000.0,
    "rb_target": 77900.0,
    "rb_budget": 977100.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 32500.0,
        "budget": 390000.0
      },
      "reg-central-ethiopia": {
        "target": 10000.0,
        "budget": 100000.0
      },
      "reg-south-ethiopia": {
        "target": 4900.0,
        "budget": 97100.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 20000.0,
        "budget": 100000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 4000.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 5000.0,
        "budget": 150000.0
      },
      "reg-afar": {
        "target": 1500.0,
        "budget": 90000.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "cidca": {
        "target": 1.0,
        "budget": 61363110.0
      },
      "seap": {
        "target": 2002.0,
        "budget": 1704073.8000000003
      },
      "ec2r-health": {
        "target": 400.0,
        "budget": 4000000.0
      },
      "akobo": {
        "target": 55.0,
        "budget": 3382608.0
      }
    }
  },
  {
    "id": "na-3-2-9",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-2",
    "code": "3.2.9",
    "description": "Promote hygiene practices through education and  distribution of hygiene kits during emergencies. HQ distributes kits but RB provide education on hygiene",
    "uom": "# of persons reached",
    "responsibility": "Both",
    "department": "Health & WASH",
    "activity_description": "Promote hygiene practices through education and  distribution of hygiene kits during emergencies. HQ distributes kits but RB provide education on hygiene",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "grc-hacap3",
      "sraps",
      "tesfa",
      "seap",
      "ec2r-health",
      "akobo"
    ],
    "ercs_target": 85300.0,
    "ercs_budget": 7290000.0,
    "hq_target": 3000.0,
    "hq_budget": 6000000.0,
    "rb_target": 82300.0,
    "rb_budget": 1290000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 5000.0,
        "budget": 250000.0
      },
      "reg-central-ethiopia": {
        "target": 2000.0,
        "budget": 150000.0
      },
      "reg-south-ethiopia": {
        "target": 20000.0,
        "budget": 600000.0
      },
      "reg-south-west-ethiopia": {
        "target": 300.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 28000.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 12000.0,
        "budget": 40000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 10000.0,
        "budget": 150000.0
      },
      "reg-somali": {
        "target": 5000.0,
        "budget": 100000.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 8250.0,
        "budget": 1780000.0
      },
      "sraps": {
        "target": 14.0,
        "budget": 25200.0
      },
      "tesfa": {
        "target": 32.0,
        "budget": 1651200.0
      },
      "seap": {
        "target": 20.0,
        "budget": 201390.54000000004
      },
      "ec2r-health": {
        "target": 410.0,
        "budget": 8000000.0
      },
      "akobo": {
        "target": 50.0,
        "budget": 14798910.0
      }
    }
  },
  {
    "id": "na-3-2-10",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-2",
    "code": "3.2.10",
    "description": "Establish mobile health clinic (vehicle with full equipment, and feasibility study)",
    "uom": "# of established mobile clinic",
    "responsibility": "HQ",
    "department": "Health & WASH",
    "activity_description": "Establish mobile health clinic (vehicle with full equipment, and feasibility study)",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [
      "seap"
    ],
    "ercs_target": 1.0,
    "ercs_budget": 26200000.0,
    "hq_target": 1.0,
    "hq_budget": 26200000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "seap": {
        "target": 16.0,
        "budget": 223078.75200000004
      }
    }
  },
  {
    "id": "na-3-2-11",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-2",
    "code": "3.2.11",
    "description": "Deploy mobile health team in hard-to-reach areas/ areas with no access to health service during emergency",
    "uom": "frequency of deployment",
    "responsibility": "Both",
    "department": "Health & WASH",
    "activity_description": "Deploy mobile health team in hard-to-reach areas/ areas with no access to health service during emergency",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "seap"
    ],
    "ercs_target": 1.0,
    "ercs_budget": 300000.0,
    "hq_target": 1.0,
    "hq_budget": 300000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "seap": {
        "target": 1500.0,
        "budget": 3485605.5000000005
      }
    }
  },
  {
    "id": "na-3-3-1",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-3",
    "code": "3.3.1",
    "description": "Develop new/ rehablitate existing Water supply infrastructure - water sources (e.g., wells, boreholes, springs, rain water harvesting, piped water systems).  1000 individual/ water scheme)",
    "uom": "# of developed/ maintained water schems",
    "responsibility": "Both",
    "department": "Health & WASH",
    "activity_description": "Develop new/ rehablitate existing Water supply infrastructure - water sources (e.g., wells, boreholes, springs, rain water harvesting, piped water systems).  1000 individual/ water scheme)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "grc-hacap3",
      "l4r",
      "sraps",
      "stream-ercs",
      "tesfa",
      "ec2r-wash"
    ],
    "ercs_target": 139.0,
    "ercs_budget": 288508560.0,
    "hq_target": 120.0,
    "hq_budget": 274998560.0,
    "rb_target": 19.0,
    "rb_budget": 13510000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 8.0,
        "budget": 8000000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 3.0,
        "budget": 3000000.0
      },
      "reg-central-ethiopia": {
        "target": 1.0,
        "budget": 1000000.0
      },
      "reg-south-ethiopia": {
        "target": 4.0,
        "budget": 960000.0
      },
      "reg-south-west-ethiopia": {
        "target": 2.0,
        "budget": 500000.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 9.0,
        "budget": 20040882.0
      },
      "sraps": {
        "target": 16.0,
        "budget": 494700.0
      },
      "stream-ercs": {
        "target": 0.0,
        "budget": 7416.42
      },
      "l4r": {
        "target": 4.0,
        "budget": 8832000.0
      },
      "tesfa": {
        "target": 6.0,
        "budget": 24020907.6456
      },
      "ec2r-wash": {
        "target": 14.0,
        "budget": 306416500.0
      }
    }
  },
  {
    "id": "na-3-3-2",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-3",
    "code": "3.3.2",
    "description": "Train  WASHCO (with 5-7 memebrs) technicians and equip with necessary tools/ equipments to manage and maintain water points",
    "uom": "# of WASHCos tained",
    "responsibility": "Both",
    "department": "Health & WASH",
    "activity_description": "Train  WASHCO (with 5-7 memebrs) technicians and equip with necessary tools/ equipments to manage and maintain water points",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "grc-hacap3",
      "l4r",
      "sraps",
      "tesfa",
      "ec2r-wash"
    ],
    "ercs_target": 139.0,
    "ercs_budget": 9030000.0,
    "hq_target": 120.0,
    "hq_budget": 8000000.0,
    "rb_target": 19.0,
    "rb_budget": 1030000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 8.0,
        "budget": 800000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 3.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-south-ethiopia": {
        "target": 4.0,
        "budget": 100000.0
      },
      "reg-south-west-ethiopia": {
        "target": 2.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 30000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 7.0,
        "budget": 178000.0
      },
      "sraps": {
        "target": 18.0,
        "budget": 5400.0
      },
      "l4r": {
        "target": 4.0,
        "budget": 397440.0
      },
      "tesfa": {
        "target": 42.0,
        "budget": 762132.0
      },
      "ec2r-wash": {
        "target": 71.0,
        "budget": 6700000.0
      }
    }
  },
  {
    "id": "na-3-3-3",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-3",
    "code": "3.3.3",
    "description": "Construct /maintain gender segregated and disable friendly public/ communal latrine with handwashing facilities in the community (eg. Market placea, slum areas, etc) (targeting = average 1500 individuals/ latrine) (6 RB)",
    "uom": "# of latrines constructed/ maintained in the community",
    "responsibility": "Both",
    "department": "Health & WASH",
    "activity_description": "Construct /maintain gender segregated and disable friendly public/ communal latrine with handwashing facilities in the community (eg. Market placea, slum areas, etc) (targeting = average 1500 individuals/ latrine) (6 RB)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "ec2r-wash"
    ],
    "ercs_target": 7.0,
    "ercs_budget": 16976000.0,
    "hq_target": 2.0,
    "hq_budget": 4476000.0,
    "rb_target": 5.0,
    "rb_budget": 12500000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 4.0,
        "budget": 10500000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 1.0,
        "budget": 2000000.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "ec2r-wash": {
        "target": 20.0,
        "budget": 63692690.88453093
      }
    }
  },
  {
    "id": "na-3-3-4",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-3",
    "code": "3.3.4",
    "description": "Construct/maintain institutional (Schools, Health facilities) sanitation facilities including  MHM rooms for schools,  latrines, waste management, placenta pits in health centers) (targeting = av. 1500/facility)",
    "uom": "# of latrines/MHM room/ hand washing facility  constructed/ maintained in institutions",
    "responsibility": "Both",
    "department": "Health & WASH",
    "activity_description": "Construct/maintain institutional (Schools, Health facilities) sanitation facilities including  MHM rooms for schools,  latrines, waste management, placenta pits in health centers) (targeting = av. 1500/facility)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "l4r",
      "sraps",
      "ec2r-wash",
      "akobo"
    ],
    "ercs_target": 24.0,
    "ercs_budget": 42800000.0,
    "hq_target": 20.0,
    "hq_budget": 40000000.0,
    "rb_target": 4.0,
    "rb_budget": 2800000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 3.0,
        "budget": 800000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 1.0,
        "budget": 2000000.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "sraps": {
        "target": 8.0,
        "budget": 48000.0
      },
      "l4r": {
        "target": 6.0,
        "budget": 2373600.0
      },
      "ec2r-wash": {
        "target": 10.0,
        "budget": 25000000.0
      },
      "akobo": {
        "target": 10.0,
        "budget": 4016847.0
      }
    }
  },
  {
    "id": "na-3-3-5",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-3",
    "code": "3.3.5",
    "description": "Support government initiative to create open defecation free (ODF) community/ kebeles by promoting hygiene practices  (one kebele has 1000HHs on average, or 5000 population)",
    "uom": "# of ODF free kebeles",
    "responsibility": "branches",
    "department": "Health & WASH",
    "activity_description": "Support government initiative to create open defecation free (ODF) community/ kebeles by promoting hygiene practices  (one kebele has 1000HHs on average, or 5000 population)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 8.0,
    "ercs_budget": 450000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 8.0,
    "rb_budget": 450000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 2.0,
        "budget": 200000.0
      },
      "reg-central-ethiopia": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 4.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-3-4-1",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-4",
    "code": "3.4.1",
    "description": "Equip existing ambulance with standard equipment",
    "uom": "# of Amb.equipped",
    "responsibility": "HQ",
    "department": "Health & WASH",
    "activity_description": "Equip existing ambulance with standard equipment",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [
      "tesfa"
    ],
    "ercs_target": 59.0,
    "ercs_budget": 106200000.0,
    "hq_target": 59.0,
    "hq_budget": 106200000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "tesfa": {
        "target": 6.0,
        "budget": 3913000.0
      }
    }
  },
  {
    "id": "na-3-4-2",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-4",
    "code": "3.4.2",
    "description": "Procurement of fully equiped new ambulance vehicle",
    "uom": "# of new Amb. procured",
    "responsibility": "HQ",
    "department": "Health & WASH",
    "activity_description": "Procurement of fully equiped new ambulance vehicle",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [
      "cidca",
      "eccmp-malaria"
    ],
    "ercs_target": 27.0,
    "ercs_budget": 135000000.0,
    "hq_target": 27.0,
    "hq_budget": 135000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "cidca": {
        "target": 2.0,
        "budget": 19950361.0
      },
      "eccmp-malaria": {
        "target": 2.0,
        "budget": 19000000.0
      }
    }
  },
  {
    "id": "na-3-4-3",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-4",
    "code": "3.4.3",
    "description": "Establish  ambulance call and dispatch center at each  regional branch level and integrate with MoH",
    "uom": "# of established Amb.call/ dispatch center",
    "responsibility": "HQ",
    "department": "Health & WASH",
    "activity_description": "Establish  ambulance call and dispatch center at each  regional branch level and integrate with MoH",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [
      "dhis2"
    ],
    "ercs_target": 15.0,
    "ercs_budget": 2400000.0,
    "hq_target": 15.0,
    "hq_budget": 2400000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "dhis2": {
        "target": 2.0,
        "budget": 6233828.0547
      }
    }
  },
  {
    "id": "na-3-4-4",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-4",
    "code": "3.4.4",
    "description": "Establish  and renovate Ambulance stataion at branch level",
    "uom": "# of Amb. Station",
    "responsibility": "Branch",
    "department": "Health & WASH",
    "activity_description": "Establish  and renovate Ambulance stataion at branch level",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 33.0,
    "ercs_budget": 22010000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 33.0,
    "rb_budget": 22010000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 20.0,
        "budget": 20250000.0
      },
      "reg-addis-ababa": {
        "target": 1.0,
        "budget": 500000.0
      },
      "reg-amhara": {
        "target": 4.0,
        "budget": 400000.0
      },
      "reg-central-ethiopia": {
        "target": 2.0,
        "budget": 200000.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 2.0,
        "budget": 100000.0
      },
      "reg-tigray": {
        "target": 1.0,
        "budget": 200000.0
      },
      "reg-gambella": {
        "target": 1.0,
        "budget": 200000.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 60000.0
      },
      "reg-harar": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-3-4-5",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-4",
    "code": "3.4.5",
    "description": "Allocate  income  from referral services(100%),  first aid kit sales, and FA training(10%)  for  ambulance  operations",
    "uom": "% of ambulance running cost covered",
    "responsibility": "branch",
    "department": "Health & WASH",
    "activity_description": "Allocate  income  from referral services(100%),  first aid kit sales, and FA training(10%)  for  ambulance  operations",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "ec2r-health"
    ],
    "ercs_target": 0.0,
    "ercs_budget": 0.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 2.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 20.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 2.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 2.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 5.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 2.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "ec2r-health": {
        "target": 0.0,
        "budget": 10000000.0
      }
    }
  },
  {
    "id": "na-3-4-6",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-4",
    "code": "3.4.6",
    "description": "Establish an Ambulance Service station at the ERCS Headquarters with equipped Ambulance service creating an efficient system.",
    "uom": "# of station",
    "responsibility": "HQ",
    "department": "Health & WASH",
    "activity_description": "Establish an Ambulance Service station at the ERCS Headquarters with equipped Ambulance service creating an efficient system.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 24261865.0,
    "hq_target": 1.0,
    "hq_budget": 24261865.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-3-4-7",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-4",
    "code": "3.4.7",
    "description": "Set up Basic first-aid (BFA) training infrastructure at all region",
    "uom": "# of branches",
    "responsibility": "branch",
    "department": "Health & WASH",
    "activity_description": "Set up Basic first-aid (BFA) training infrastructure at all region",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 9.0,
    "ercs_budget": 3480000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 9.0,
    "rb_budget": 3480000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 1.0,
        "budget": 250000.0
      },
      "reg-amhara": {
        "target": 1.0,
        "budget": 1300000.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 1.0,
        "budget": 300000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-tigray": {
        "target": 1.0,
        "budget": 1300000.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 30000.0
      },
      "reg-harar": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 1.0,
        "budget": 200000.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-3-4-8",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-4",
    "code": "3.4.8",
    "description": "Provide ToT first aid training",
    "uom": "# of participants",
    "responsibility": "HQ",
    "department": "Health & WASH",
    "activity_description": "Provide ToT first aid training",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 30.0,
    "ercs_budget": 1500000.0,
    "hq_target": 30.0,
    "hq_budget": 1500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-3-4-9",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-4",
    "code": "3.4.9",
    "description": "Provide first aid training at branch level (both commercial and community first aid)",
    "uom": "# of participants",
    "responsibility": "branch",
    "department": "Health & WASH",
    "activity_description": "Provide first aid training at branch level (both commercial and community first aid)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "ec2r-health"
    ],
    "ercs_target": 11482.0,
    "ercs_budget": 12583250.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 11482.0,
    "rb_budget": 12583250.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 6892.0,
        "budget": 7663250.0
      },
      "reg-addis-ababa": {
        "target": 1100.0,
        "budget": 300000.0
      },
      "reg-amhara": {
        "target": 500.0,
        "budget": 1100000.0
      },
      "reg-central-ethiopia": {
        "target": 50.0,
        "budget": 150000.0
      },
      "reg-south-ethiopia": {
        "target": 600.0,
        "budget": 1200000.0
      },
      "reg-south-west-ethiopia": {
        "target": 120.0,
        "budget": 240000.0
      },
      "reg-sidama": {
        "target": 500.0,
        "budget": 150000.0
      },
      "reg-tigray": {
        "target": 1000.0,
        "budget": 600000.0
      },
      "reg-gambella": {
        "target": 30.0,
        "budget": 400000.0
      },
      "reg-benishangul-gumuz": {
        "target": 200.0,
        "budget": 60000.0
      },
      "reg-harar": {
        "target": 30.0,
        "budget": 50000.0
      },
      "reg-dire-dawa": {
        "target": 300.0,
        "budget": 100000.0
      },
      "reg-somali": {
        "target": 50.0,
        "budget": 300000.0
      },
      "reg-afar": {
        "target": 80.0,
        "budget": 170000.0
      },
      "reg-moyale": {
        "target": 30.0,
        "budget": 100000.0
      }
    },
    "project_targets": {
      "ec2r-health": {
        "target": 400.0,
        "budget": 6000000.0
      }
    }
  },
  {
    "id": "na-3-4-10",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-4",
    "code": "3.4.10",
    "description": "Provide SAF and HciD training for ambulance attendant and  Volunteer",
    "uom": "# of trained persons",
    "responsibility": "Both",
    "department": "Health & WASH",
    "activity_description": "Provide SAF and HciD training for ambulance attendant and  Volunteer",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "ehppr",
      "tesfa",
      "ec2r-health"
    ],
    "ercs_target": 954.0,
    "ercs_budget": 4657000.0,
    "hq_target": 30.0,
    "hq_budget": 226500.0,
    "rb_target": 924.0,
    "rb_budget": 4430500.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 584.0,
        "budget": 2222000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 120.0,
        "budget": 906000.0
      },
      "reg-central-ethiopia": {
        "target": 30.0,
        "budget": 226500.0
      },
      "reg-south-ethiopia": {
        "target": 30.0,
        "budget": 226500.0
      },
      "reg-south-west-ethiopia": {
        "target": 30.0,
        "budget": 90000.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 60.0,
        "budget": 453000.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 40.0,
        "budget": 80000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 30.0,
        "budget": 226500.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "ehppr": {
        "target": 1.0,
        "budget": 9758006.0
      },
      "tesfa": {
        "target": 60.0,
        "budget": 2198160.0
      },
      "ec2r-health": {
        "target": 0.0,
        "budget": 3500000.0
      }
    }
  },
  {
    "id": "na-3-4-11",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-4",
    "code": "3.4.11",
    "description": "Provide first-aid services at emergency sites through trained ERCS volunteers and staff.",
    "uom": "# of beneficiaries",
    "responsibility": "branch",
    "department": "Health & WASH",
    "activity_description": "Provide first-aid services at emergency sites through trained ERCS volunteers and staff.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 189115.0,
    "ercs_budget": 7730472.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 189115.0,
    "rb_budget": 7730472.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 82198.0,
        "budget": 3790000.0
      },
      "reg-addis-ababa": {
        "target": 2506.0,
        "budget": 601440.0
      },
      "reg-amhara": {
        "target": 40568.0,
        "budget": 1217040.0
      },
      "reg-central-ethiopia": {
        "target": 12732.0,
        "budget": 370000.0
      },
      "reg-south-ethiopia": {
        "target": 17531.0,
        "budget": 700000.0
      },
      "reg-south-west-ethiopia": {
        "target": 1260.0,
        "budget": 300000.0
      },
      "reg-sidama": {
        "target": 11391.0,
        "budget": 30000.0
      },
      "reg-tigray": {
        "target": 4846.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 4800.0,
        "budget": 160000.0
      },
      "reg-benishangul-gumuz": {
        "target": 9325.0,
        "budget": 10000.0
      },
      "reg-harar": {
        "target": 528.0,
        "budget": 100000.0
      },
      "reg-dire-dawa": {
        "target": 437.0,
        "budget": 145992.0
      },
      "reg-somali": {
        "target": 238.0,
        "budget": 50000.0
      },
      "reg-afar": {
        "target": 605.0,
        "budget": 240000.0
      },
      "reg-moyale": {
        "target": 150.0,
        "budget": 16000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-3-4-12",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-4",
    "code": "3.4.12",
    "description": "Provide ambulance service for the community with quality and access during crisis, and Emergency",
    "uom": "# of people",
    "responsibility": "branch",
    "department": "Health & WASH",
    "activity_description": "Provide ambulance service for the community with quality and access during crisis, and Emergency",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "ehppr",
      "eccmp-malaria"
    ],
    "ercs_target": 449802.0,
    "ercs_budget": 249900716.9,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 449802.0,
    "rb_budget": 249900716.9,
    "regional_targets": {
      "reg-oromia": {
        "target": 114603.0,
        "budget": 99752305.0
      },
      "reg-addis-ababa": {
        "target": 5200.0,
        "budget": 11652939.9
      },
      "reg-amhara": {
        "target": 85610.0,
        "budget": 51366000.0
      },
      "reg-central-ethiopia": {
        "target": 7901.0,
        "budget": 3000000.0
      },
      "reg-south-ethiopia": {
        "target": 24978.0,
        "budget": 3000000.0
      },
      "reg-south-west-ethiopia": {
        "target": 3474.0,
        "budget": 300000.0
      },
      "reg-sidama": {
        "target": 12940.0,
        "budget": 1500000.0
      },
      "reg-tigray": {
        "target": 162705.0,
        "budget": 64000000.0
      },
      "reg-gambella": {
        "target": 6000.0,
        "budget": 840000.0
      },
      "reg-benishangul-gumuz": {
        "target": 8590.0,
        "budget": 2500000.0
      },
      "reg-harar": {
        "target": 2041.0,
        "budget": 800000.0
      },
      "reg-dire-dawa": {
        "target": 1500.0,
        "budget": 2889472.0
      },
      "reg-somali": {
        "target": 4713.0,
        "budget": 2000000.0
      },
      "reg-afar": {
        "target": 9547.0,
        "budget": 6300000.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "ehppr": {
        "target": 20.0,
        "budget": 15828631.0
      },
      "eccmp-malaria": {
        "target": 57.0,
        "budget": 24720000.0
      }
    }
  },
  {
    "id": "na-3-4-13",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-4",
    "code": "3.4.13",
    "description": "Install GPS on the new and existing ambulances",
    "uom": "#of ambulances",
    "responsibility": "HQ",
    "department": "Health & WASH",
    "activity_description": "Install GPS on the new and existing ambulances",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 100.0,
    "ercs_budget": 118000.0,
    "hq_target": 100.0,
    "hq_budget": 118000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-3-4-14",
    "strategic_priority_id": "sp-3",
    "strategic_objective_id": "so-3-4",
    "code": "3.4.14",
    "description": "Recruit and deploy emergency medical technicians (nurses) for ambulance",
    "uom": "#of of deployed EMT",
    "responsibility": "Branches",
    "department": "Health & WASH",
    "activity_description": "Recruit and deploy emergency medical technicians (nurses) for ambulance",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "ehppr"
    ],
    "ercs_target": 34.0,
    "ercs_budget": 6510000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 34.0,
    "rb_budget": 6510000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 17.0,
        "budget": 1720000.0
      },
      "reg-addis-ababa": {
        "target": 2.0,
        "budget": 420000.0
      },
      "reg-amhara": {
        "target": 6.0,
        "budget": 2160000.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 6.0,
        "budget": 2160000.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 2.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "ehppr": {
        "target": 2.0,
        "budget": 4760552.0
      }
    }
  },
  {
    "id": "na-4-1-1",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-1",
    "code": "4.1.1",
    "description": "Provide training on the digital members' data management system to ERCS staff & volunteers",
    "uom": "# of participants",
    "responsibility": "HQ",
    "department": "Volunteers & Members",
    "activity_description": "Provide training on the digital members' data management system to ERCS staff & volunteers",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 130.0,
    "ercs_budget": 2400000.0,
    "hq_target": 130.0,
    "hq_budget": 2400000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-1-2",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-1",
    "code": "4.1.2",
    "description": "Register existing  and new members on the digital database system",
    "uom": "# of members registered",
    "responsibility": "branches",
    "department": "Volunteers & Members",
    "activity_description": "Register existing  and new members on the digital database system",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 2512981.0,
    "ercs_budget": 5805100.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 2512981.0,
    "rb_budget": 5805100.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 715843.0,
        "budget": 4729100.0
      },
      "reg-addis-ababa": {
        "target": 418953.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 500000.0,
        "budget": 650000.0
      },
      "reg-central-ethiopia": {
        "target": 86000.0,
        "budget": 26000.0
      },
      "reg-south-ethiopia": {
        "target": 292000.0,
        "budget": 292000.0
      },
      "reg-south-west-ethiopia": {
        "target": 60000.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 273000.0,
        "budget": 100000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 12000.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 10000.0,
        "budget": 8000.0
      },
      "reg-harar": {
        "target": 8000.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 20000.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 89185.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 28000.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-1-3",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-1",
    "code": "4.1.3",
    "description": "Total Recruitment of members (New + (Old)",
    "uom": "# of members",
    "responsibility": "branches",
    "department": "Volunteers & Members",
    "activity_description": "Total Recruitment of members (New + (Old)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 9973574.0,
    "ercs_budget": 0.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 9973574.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 4504403.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 418953.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 2334183.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 718659.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 757503.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 250335.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 368948.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 389160.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 14755.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 51000.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 16100.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 20000.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 30660.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 73815.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 25100.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-1-4",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-1",
    "code": "4.1.4",
    "description": "Recruitment of individual members (Old)",
    "uom": "# of members recruited",
    "responsibility": "branches",
    "department": "Volunteers & Members",
    "activity_description": "Recruitment of individual members (Old)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 7444458.0,
    "ercs_budget": 32180177.35,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 7444458.0,
    "rb_budget": 32180177.35,
    "regional_targets": {
      "reg-oromia": {
        "target": 3649139.0,
        "budget": 16007080.0
      },
      "reg-addis-ababa": {
        "target": 309079.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 1609766.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 532787.0,
        "budget": 5327870.0
      },
      "reg-south-ethiopia": {
        "target": 544362.0,
        "budget": 6243620.0
      },
      "reg-south-west-ethiopia": {
        "target": 155104.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 236779.0,
        "budget": 2236607.35
      },
      "reg-tigray": {
        "target": 298500.0,
        "budget": 1990000.0
      },
      "reg-gambella": {
        "target": 1980.0,
        "budget": 40000.0
      },
      "reg-benishangul-gumuz": {
        "target": 25245.0,
        "budget": 150000.0
      },
      "reg-harar": {
        "target": 7719.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 8297.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 15701.0,
        "budget": 150000.0
      },
      "reg-afar": {
        "target": 40000.0,
        "budget": 25000.0
      },
      "reg-moyale": {
        "target": 10000.0,
        "budget": 10000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-1-5",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-1",
    "code": "4.1.5",
    "description": "Recruitment of Corporate members  (Old)",
    "uom": "# of members recruited",
    "responsibility": "branches",
    "department": "Volunteers & Members",
    "activity_description": "Recruitment of Corporate members  (Old)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 18980.0,
    "ercs_budget": 144833.33,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 18980.0,
    "rb_budget": 144833.33,
    "regional_targets": {
      "reg-oromia": {
        "target": 15059.0,
        "budget": 68000.0
      },
      "reg-addis-ababa": {
        "target": 442.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 1334.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 698.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 175.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 90.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 100.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 500.0,
        "budget": 3333.33
      },
      "reg-gambella": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 450.0,
        "budget": 20000.0
      },
      "reg-harar": {
        "target": 56.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 25.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 3.0,
        "budget": 3500.0
      },
      "reg-afar": {
        "target": 15.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 29.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-1-6",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-1",
    "code": "4.1.6",
    "description": "Recruitment of Lifetime members  (Old)",
    "uom": "# of members recruited",
    "responsibility": "branches",
    "department": "Volunteers & Members",
    "activity_description": "Recruitment of Lifetime members  (Old)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 19210.0,
    "ercs_budget": 652833.34,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 19210.0,
    "rb_budget": 652833.34,
    "regional_targets": {
      "reg-oromia": {
        "target": 13619.0,
        "budget": 602000.0
      },
      "reg-addis-ababa": {
        "target": 366.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 2440.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 89.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 555.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 150.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 32.0,
        "budget": 25000.0
      },
      "reg-tigray": {
        "target": 500.0,
        "budget": 3333.34
      },
      "reg-gambella": {
        "target": 10.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 350.0,
        "budget": 20000.0
      },
      "reg-harar": {
        "target": 150.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 49.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 50.0,
        "budget": 2500.0
      },
      "reg-afar": {
        "target": 500.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 350.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-1-7",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-1",
    "code": "4.1.7",
    "description": "Recruitment of Family members  (Old)",
    "uom": "# of members recruited",
    "responsibility": "branches",
    "department": "Volunteers & Members",
    "activity_description": "Recruitment of Family members  (Old)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 4425.0,
    "ercs_budget": 92433.33,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 4425.0,
    "rb_budget": 92433.33,
    "regional_targets": {
      "reg-oromia": {
        "target": 2075.0,
        "budget": 31600.0
      },
      "reg-addis-ababa": {
        "target": 259.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 460.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 85.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 188.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 150.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 37.0,
        "budget": 35000.0
      },
      "reg-tigray": {
        "target": 500.0,
        "budget": 3333.33
      },
      "reg-gambella": {
        "target": 6.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 200.0,
        "budget": 20000.0
      },
      "reg-harar": {
        "target": 75.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 19.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 50.0,
        "budget": 2500.0
      },
      "reg-afar": {
        "target": 300.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 21.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-1-8",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-1",
    "code": "4.1.8",
    "description": "Total recruitment of new members",
    "uom": "# of members new recruited",
    "responsibility": "branches",
    "department": "Volunteers & Members",
    "activity_description": "Total recruitment of new members",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 2486501.0,
    "ercs_budget": 0.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 2486501.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 824511.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 108807.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 720183.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 185000.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 212223.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 94841.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 132000.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 89160.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 12755.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 24755.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 8100.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 11610.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 14856.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 33000.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 14700.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-1-9",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-1",
    "code": "4.1.9",
    "description": "Digital Recruitment Platform",
    "uom": "# of members new recruited",
    "responsibility": "branches",
    "department": "Volunteers & Members",
    "activity_description": "Digital Recruitment Platform",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 45490.0,
    "ercs_budget": 100000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 45490.0,
    "rb_budget": 100000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 32011.0,
        "budget": 100000.0
      },
      "reg-addis-ababa": {
        "target": 5506.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 5000.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 223.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 2000.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 750.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-1-10",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-1",
    "code": "4.1.10",
    "description": "Community-Based Recruitment Approach",
    "uom": "# of members new recruited",
    "responsibility": "branches",
    "department": "Volunteers & Members",
    "activity_description": "Community-Based Recruitment Approach",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 1196989.0,
    "ercs_budget": 1045000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 1196989.0,
    "rb_budget": 1045000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 295000.0,
        "budget": 600000.0
      },
      "reg-addis-ababa": {
        "target": 30000.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 410183.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 100000.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 65000.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 94841.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 75000.0,
        "budget": 80000.0
      },
      "reg-tigray": {
        "target": 89160.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 600.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 16255.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 4500.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 4450.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 4500.0,
        "budget": 350000.0
      },
      "reg-afar": {
        "target": 5000.0,
        "budget": 15000.0
      },
      "reg-moyale": {
        "target": 2500.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-1-11",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-1",
    "code": "4.1.11",
    "description": "Referral-Based Recruitment",
    "uom": "# of members new recruited",
    "responsibility": "branches",
    "department": "Volunteers & Members",
    "activity_description": "Referral-Based Recruitment",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 344200.0,
    "ercs_budget": 120000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 344200.0,
    "rb_budget": 120000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 150000.0,
        "budget": 100000.0
      },
      "reg-addis-ababa": {
        "target": 30000.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 125000.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 10000.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 15000.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 10000.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 400.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 100.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 1000.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 500.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 1000.0,
        "budget": 20000.0
      },
      "reg-moyale": {
        "target": 1200.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-1-12",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-1",
    "code": "4.1.12",
    "description": "Event-Based Recruitment",
    "uom": "# of members new recruited",
    "responsibility": "branches",
    "department": "Volunteers & Members",
    "activity_description": "Event-Based Recruitment",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 163461.0,
    "ercs_budget": 830000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 163461.0,
    "rb_budget": 830000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 75000.0,
        "budget": 750000.0
      },
      "reg-addis-ababa": {
        "target": 3761.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 50000.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 10000.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 10000.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 5000.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 600.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 3500.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 100.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 1000.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 1500.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 1500.0,
        "budget": 80000.0
      },
      "reg-moyale": {
        "target": 1500.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-1-13",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-1",
    "code": "4.1.13",
    "description": "Mobile Recruitment Teams",
    "uom": "# of members new recruited",
    "responsibility": "branches",
    "department": "Volunteers & Members",
    "activity_description": "Mobile Recruitment Teams",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 323295.0,
    "ercs_budget": 580000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 323295.0,
    "rb_budget": 580000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 145000.0,
        "budget": 100000.0
      },
      "reg-addis-ababa": {
        "target": 4540.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 15000.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 45000.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 55000.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 25000.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 9755.0,
        "budget": 180000.0
      },
      "reg-benishangul-gumuz": {
        "target": 2500.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 1000.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 6500.0,
        "budget": 250000.0
      },
      "reg-afar": {
        "target": 6000.0,
        "budget": 50000.0
      },
      "reg-moyale": {
        "target": 8000.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-1-14",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-1",
    "code": "4.1.14",
    "description": "Partnership-Based Recruitment",
    "uom": "# of members new recruited",
    "responsibility": "branches",
    "department": "Volunteers & Members",
    "activity_description": "Partnership-Based Recruitment",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 183066.0,
    "ercs_budget": 370000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 183066.0,
    "rb_budget": 370000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 42500.0,
        "budget": 298000.0
      },
      "reg-addis-ababa": {
        "target": 20000.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 80000.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 5000.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 12000.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 10000.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 400.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 400.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 500.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 1160.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 606.0,
        "budget": 2000.0
      },
      "reg-afar": {
        "target": 9500.0,
        "budget": 70000.0
      },
      "reg-moyale": {
        "target": 1000.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-1-15",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-1",
    "code": "4.1.15",
    "description": "School and University Engagement System",
    "uom": "# of members new recruited",
    "responsibility": "branches",
    "department": "Volunteers & Members",
    "activity_description": "School and University Engagement System",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 230000.0,
    "ercs_budget": 731500.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 230000.0,
    "rb_budget": 731500.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 85000.0,
        "budget": 455000.0
      },
      "reg-addis-ababa": {
        "target": 15000.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 40000.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 10000.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 55000.0,
        "budget": 113000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 5000.0,
        "budget": 25000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 1000.0,
        "budget": 10000.0
      },
      "reg-benishangul-gumuz": {
        "target": 2000.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 1000.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 5000.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 500.0,
        "budget": 3500.0
      },
      "reg-afar": {
        "target": 10000.0,
        "budget": 75000.0
      },
      "reg-moyale": {
        "target": 500.0,
        "budget": 50000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-1-16",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-1",
    "code": "4.1.16",
    "description": "Organize Annual Members' Day forum (at least at zonal & regional branches)",
    "uom": "# of events organized",
    "responsibility": "branches",
    "department": "Volunteers & Members",
    "activity_description": "Organize Annual Members' Day forum (at least at zonal & regional branches)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 62.0,
    "ercs_budget": 6332000.0,
    "hq_target": 1.0,
    "hq_budget": 0.0,
    "rb_target": 61.0,
    "rb_budget": 6332000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 21.0,
        "budget": 2922000.0
      },
      "reg-addis-ababa": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-amhara": {
        "target": 13.0,
        "budget": 1300000.0
      },
      "reg-central-ethiopia": {
        "target": 4.0,
        "budget": 400000.0
      },
      "reg-south-ethiopia": {
        "target": 6.0,
        "budget": 155000.0
      },
      "reg-south-west-ethiopia": {
        "target": 3.0,
        "budget": 300000.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-tigray": {
        "target": 5.0,
        "budget": 500000.0
      },
      "reg-gambella": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-harar": {
        "target": 1.0,
        "budget": 40000.0
      },
      "reg-dire-dawa": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-somali": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-afar": {
        "target": 1.0,
        "budget": 65000.0
      },
      "reg-moyale": {
        "target": 1.0,
        "budget": 50000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-1-17",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-1",
    "code": "4.1.17",
    "description": "Develop ERCS members' recognition guideline",
    "uom": "# of startegic doc.",
    "responsibility": "HQ",
    "department": "Volunteers & Members",
    "activity_description": "Develop ERCS members' recognition guideline",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 1500000.0,
    "hq_target": 1.0,
    "hq_budget": 1500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-2-1",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-2",
    "code": "4.2.1",
    "description": "Organize workshop on Volunteerism  concept and practices to stakeholders",
    "uom": "# of participants",
    "responsibility": "HQ",
    "department": "Volunteers & Members",
    "activity_description": "Organize workshop on Volunteerism  concept and practices to stakeholders",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 50.0,
    "ercs_budget": 1000000.0,
    "hq_target": 50.0,
    "hq_budget": 1000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-2-2",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-2",
    "code": "4.2.2",
    "description": "Policy advocacy on volunteerism",
    "uom": "# of advocacy forum",
    "responsibility": "HQ",
    "department": "Volunteers & Members",
    "activity_description": "Policy advocacy on volunteerism",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 250000.0,
    "hq_target": 1.0,
    "hq_budget": 250000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-2-3",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-2",
    "code": "4.2.3",
    "description": "Organize volunteers recognition (5 in each region and HQ)",
    "uom": "# of recognized volunteers",
    "responsibility": "Both",
    "department": "Volunteers & Members",
    "activity_description": "Organize volunteers recognition (5 in each region and HQ)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 75.0,
    "ercs_budget": 1960000.0,
    "hq_target": 5.0,
    "hq_budget": 1200000.0,
    "rb_target": 70.0,
    "rb_budget": 760000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 5.0,
        "budget": 50000.0
      },
      "reg-amhara": {
        "target": 10.0,
        "budget": 200000.0
      },
      "reg-central-ethiopia": {
        "target": 5.0,
        "budget": 100000.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 5.0,
        "budget": 100000.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 5.0,
        "budget": 30000.0
      },
      "reg-harar": {
        "target": 5.0,
        "budget": 50000.0
      },
      "reg-dire-dawa": {
        "target": 20.0,
        "budget": 100000.0
      },
      "reg-somali": {
        "target": 5.0,
        "budget": 100000.0
      },
      "reg-afar": {
        "target": 5.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 5.0,
        "budget": 30000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-2-4",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-2",
    "code": "4.2.4",
    "description": "Develop a national recreational and skills sharing Centre for volunteers.",
    "uom": "# of centers developed",
    "responsibility": "HQ",
    "department": "Volunteers & Members",
    "activity_description": "Develop a national recreational and skills sharing Centre for volunteers.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 6900000.0,
    "hq_target": 1.0,
    "hq_budget": 5000000.0,
    "rb_target": 0.0,
    "rb_budget": 1900000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 3.0,
        "budget": 1750000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-2-5",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-2",
    "code": "4.2.5",
    "description": "Recruit new ERCS volunteers",
    "uom": "# of Volunteers recruited",
    "responsibility": "Branches",
    "department": "Volunteers & Members",
    "activity_description": "Recruit new ERCS volunteers",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 31170.0,
    "ercs_budget": 3068000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 31170.0,
    "rb_budget": 3068000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 15000.0,
        "budget": 1274000.0
      },
      "reg-addis-ababa": {
        "target": 1200.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 6000.0,
        "budget": 600000.0
      },
      "reg-central-ethiopia": {
        "target": 600.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 2100.0,
        "budget": 720000.0
      },
      "reg-south-west-ethiopia": {
        "target": 550.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 1550.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 2600.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 220.0,
        "budget": 394000.0
      },
      "reg-benishangul-gumuz": {
        "target": 250.0,
        "budget": 40000.0
      },
      "reg-harar": {
        "target": 150.0,
        "budget": 40000.0
      },
      "reg-dire-dawa": {
        "target": 300.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 250.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 250.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 150.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-2-6",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-2",
    "code": "4.2.6",
    "description": "Deploy/engage newly recruited and existing volunteers",
    "uom": "# of Volunteers deployed",
    "responsibility": "Branches",
    "department": "Volunteers & Members",
    "activity_description": "Deploy/engage newly recruited and existing volunteers",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 93708.0,
    "ercs_budget": 4969700.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 93708.0,
    "rb_budget": 4969700.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 50000.0,
        "budget": 1494200.0
      },
      "reg-addis-ababa": {
        "target": 2797.0,
        "budget": 565000.0
      },
      "reg-amhara": {
        "target": 16573.0,
        "budget": 1657300.0
      },
      "reg-central-ethiopia": {
        "target": 2844.0,
        "budget": 853200.0
      },
      "reg-south-ethiopia": {
        "target": 5539.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 2478.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 3146.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 6572.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 538.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 593.0,
        "budget": 160000.0
      },
      "reg-harar": {
        "target": 443.0,
        "budget": 60000.0
      },
      "reg-dire-dawa": {
        "target": 564.0,
        "budget": 180000.0
      },
      "reg-somali": {
        "target": 530.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 671.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 420.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-2-7",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-2",
    "code": "4.2.7",
    "description": "Recruit new professional volunteers",
    "uom": "# of volunteers recruited",
    "responsibility": "Both",
    "department": "Volunteers & Members",
    "activity_description": "Recruit new professional volunteers",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 11250.0,
    "ercs_budget": 888000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 11250.0,
    "rb_budget": 888000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 8000.0,
        "budget": 740000.0
      },
      "reg-addis-ababa": {
        "target": 400.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 700.0,
        "budget": 70000.0
      },
      "reg-central-ethiopia": {
        "target": 250.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 530.0,
        "budget": 53000.0
      },
      "reg-south-west-ethiopia": {
        "target": 150.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 50.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 400.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 50.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 200.0,
        "budget": 25000.0
      },
      "reg-harar": {
        "target": 40.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 110.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 240.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 110.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 20.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-2-8",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-2",
    "code": "4.2.8",
    "description": "Deploy/engage existing and newly recruited professional volunteers in ERCS activities",
    "uom": "# of Professional Volunteers deployed",
    "responsibility": "Branches",
    "department": "Volunteers & Members",
    "activity_description": "Deploy/engage existing and newly recruited professional volunteers in ERCS activities",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 27477.0,
    "ercs_budget": 4878540.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 27477.0,
    "rb_budget": 4878540.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 19984.0,
        "budget": 2777840.0
      },
      "reg-addis-ababa": {
        "target": 942.0,
        "budget": 300000.0
      },
      "reg-amhara": {
        "target": 1961.0,
        "budget": 196100.0
      },
      "reg-central-ethiopia": {
        "target": 593.0,
        "budget": 593000.0
      },
      "reg-south-ethiopia": {
        "target": 1036.0,
        "budget": 621600.0
      },
      "reg-south-west-ethiopia": {
        "target": 335.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 87.0,
        "budget": 100000.0
      },
      "reg-tigray": {
        "target": 887.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 103.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 494.0,
        "budget": 70000.0
      },
      "reg-harar": {
        "target": 84.0,
        "budget": 50000.0
      },
      "reg-dire-dawa": {
        "target": 216.0,
        "budget": 100000.0
      },
      "reg-somali": {
        "target": 478.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 236.0,
        "budget": 70000.0
      },
      "reg-moyale": {
        "target": 41.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-2-9",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-2",
    "code": "4.2.9",
    "description": "Organize International Volunteers' Day (IVD) programs (at zonal and regional branches)",
    "uom": "# of IVD days organized",
    "responsibility": "Both",
    "department": "Volunteers & Members",
    "activity_description": "Organize International Volunteers' Day (IVD) programs (at zonal and regional branches)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 60.0,
    "ercs_budget": 3816000.0,
    "hq_target": 1.0,
    "hq_budget": 1000000.0,
    "rb_target": 59.0,
    "rb_budget": 2816000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 19.0,
        "budget": 1356000.0
      },
      "reg-addis-ababa": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-amhara": {
        "target": 13.0,
        "budget": 390000.0
      },
      "reg-central-ethiopia": {
        "target": 5.0,
        "budget": 150000.0
      },
      "reg-south-ethiopia": {
        "target": 5.0,
        "budget": 150000.0
      },
      "reg-south-west-ethiopia": {
        "target": 3.0,
        "budget": 100000.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 5.0,
        "budget": 150000.0
      },
      "reg-gambella": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-dire-dawa": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-somali": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-afar": {
        "target": 1.0,
        "budget": 40000.0
      },
      "reg-moyale": {
        "target": 1.0,
        "budget": 30000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-2-10",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-2",
    "code": "4.2.10",
    "description": "Organize experience sharing program to volunteers and DVM officers",
    "uom": "# of experience sharing organized",
    "responsibility": "both",
    "department": "Volunteers & Members",
    "activity_description": "Organize experience sharing program to volunteers and DVM officers",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 51.0,
    "ercs_budget": 7490000.0,
    "hq_target": 2.0,
    "hq_budget": 1600000.0,
    "rb_target": 49.0,
    "rb_budget": 5890000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 21.0,
        "budget": 2890000.0
      },
      "reg-addis-ababa": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-amhara": {
        "target": 2.0,
        "budget": 600000.0
      },
      "reg-central-ethiopia": {
        "target": 1.0,
        "budget": 300000.0
      },
      "reg-south-ethiopia": {
        "target": 5.0,
        "budget": 270000.0
      },
      "reg-south-west-ethiopia": {
        "target": 1.0,
        "budget": 300000.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 1.0,
        "budget": 300000.0
      },
      "reg-gambella": {
        "target": 12.0,
        "budget": 300000.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 1.0,
        "budget": 150000.0
      },
      "reg-somali": {
        "target": 1.0,
        "budget": 300000.0
      },
      "reg-afar": {
        "target": 1.0,
        "budget": 230000.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-2-11",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-2",
    "code": "4.2.11",
    "description": "Organize trainings on volunteer management strategies to branch staff (DVM officers & branch heads",
    "uom": "# of trained DVM officers",
    "responsibility": "HQ",
    "department": "Volunteers & Members",
    "activity_description": "Organize trainings on volunteer management strategies to branch staff (DVM officers & branch heads",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 192.0,
    "ercs_budget": 2565000.0,
    "hq_target": 30.0,
    "hq_budget": 1000000.0,
    "rb_target": 162.0,
    "rb_budget": 1565000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 96.0,
        "budget": 1180000.0
      },
      "reg-addis-ababa": {
        "target": 15.0,
        "budget": 40000.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 12.0,
        "budget": 150000.0
      },
      "reg-south-west-ethiopia": {
        "target": 8.0,
        "budget": 80000.0
      },
      "reg-sidama": {
        "target": 30.0,
        "budget": 35000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 80000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-2-12",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-2",
    "code": "4.2.12",
    "description": "Develop national volunteer programs (based on community needs)  to be cascaded at branch level",
    "uom": "# of national program developed",
    "responsibility": "HQ",
    "department": "Volunteers & Members",
    "activity_description": "Develop national volunteer programs (based on community needs)  to be cascaded at branch level",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 14.0,
    "ercs_budget": 2925000.0,
    "hq_target": 1.0,
    "hq_budget": 200000.0,
    "rb_target": 13.0,
    "rb_budget": 2725000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 12.0,
        "budget": 2675000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-2-13",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-2",
    "code": "4.2.13",
    "description": "Organize volunteers' capacity building training on volunteerism SAF and communication",
    "uom": "# of trained volunteers",
    "responsibility": "HQ",
    "department": "Volunteers & Members",
    "activity_description": "Organize volunteers' capacity building training on volunteerism SAF and communication",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 200.0,
    "ercs_budget": 2400000.0,
    "hq_target": 200.0,
    "hq_budget": 2400000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-2-14",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-2",
    "code": "4.2.14",
    "description": "Provide comprehnsive volunteers  safety and well being program",
    "uom": "# of volunteers trained & equipped",
    "responsibility": "both",
    "department": "Volunteers & Members",
    "activity_description": "Provide comprehnsive volunteers  safety and well being program",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 3375.0,
    "ercs_budget": 1500000.0,
    "hq_target": 3375.0,
    "hq_budget": 1500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-2-15",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-2",
    "code": "4.2.15",
    "description": "provide MHPSS TOT training for volunteers and cascading",
    "uom": "# of volunteers trained",
    "responsibility": "Both",
    "department": "Volunteers & Members",
    "activity_description": "provide MHPSS TOT training for volunteers and cascading",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 300.0,
    "ercs_budget": 1500000.0,
    "hq_target": 300.0,
    "hq_budget": 1500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-3-1",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-3",
    "code": "4.3.1",
    "description": "Organize training on youth policy and youth engement strategy",
    "uom": "# of youth engagement strategy",
    "responsibility": "Both",
    "department": "Volunteers & Members",
    "activity_description": "Organize training on youth policy and youth engement strategy",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 397.0,
    "ercs_budget": 3180000.0,
    "hq_target": 70.0,
    "hq_budget": 1500000.0,
    "rb_target": 327.0,
    "rb_budget": 1680000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 300.0,
        "budget": 1490000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 1.0,
        "budget": 60000.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 30000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 25.0,
        "budget": 100000.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-3-2",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-3",
    "code": "4.3.2",
    "description": "Establish RC Clubs in schools (sign formal agreemnt with schools)",
    "uom": "# of RC Clubs established",
    "responsibility": "branch",
    "department": "Volunteers & Members",
    "activity_description": "Establish RC Clubs in schools (sign formal agreemnt with schools)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 1058.0,
    "ercs_budget": 2505000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 1058.0,
    "rb_budget": 2505000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 560.0,
        "budget": 1420000.0
      },
      "reg-addis-ababa": {
        "target": 80.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 170.0,
        "budget": 200000.0
      },
      "reg-central-ethiopia": {
        "target": 25.0,
        "budget": 160000.0
      },
      "reg-south-ethiopia": {
        "target": 80.0,
        "budget": 180000.0
      },
      "reg-south-west-ethiopia": {
        "target": 15.0,
        "budget": 100000.0
      },
      "reg-sidama": {
        "target": 11.0,
        "budget": 100000.0
      },
      "reg-tigray": {
        "target": 20.0,
        "budget": 100000.0
      },
      "reg-gambella": {
        "target": 10.0,
        "budget": 50000.0
      },
      "reg-benishangul-gumuz": {
        "target": 50.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 5.0,
        "budget": 35000.0
      },
      "reg-dire-dawa": {
        "target": 15.0,
        "budget": 35000.0
      },
      "reg-somali": {
        "target": 5.0,
        "budget": 35000.0
      },
      "reg-afar": {
        "target": 7.0,
        "budget": 25000.0
      },
      "reg-moyale": {
        "target": 5.0,
        "budget": 15000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-3-3",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-3",
    "code": "4.3.3",
    "description": "Establish and strenghening RC Clubs out of schools based at branch office level",
    "uom": "# of RC Clubs established",
    "responsibility": "branch",
    "department": "Volunteers & Members",
    "activity_description": "Establish and strenghening RC Clubs out of schools based at branch office level",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 336.0,
    "ercs_budget": 2565000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 336.0,
    "rb_budget": 2565000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 240.0,
        "budget": 1900000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 50.0,
        "budget": 130000.0
      },
      "reg-central-ethiopia": {
        "target": 5.0,
        "budget": 50000.0
      },
      "reg-south-ethiopia": {
        "target": 6.0,
        "budget": 90000.0
      },
      "reg-south-west-ethiopia": {
        "target": 3.0,
        "budget": 30000.0
      },
      "reg-sidama": {
        "target": 4.0,
        "budget": 200000.0
      },
      "reg-tigray": {
        "target": 4.0,
        "budget": 40000.0
      },
      "reg-gambella": {
        "target": 5.0,
        "budget": 10000.0
      },
      "reg-benishangul-gumuz": {
        "target": 7.0,
        "budget": 60000.0
      },
      "reg-harar": {
        "target": 1.0,
        "budget": 10000.0
      },
      "reg-dire-dawa": {
        "target": 5.0,
        "budget": 20000.0
      },
      "reg-somali": {
        "target": 1.0,
        "budget": 10000.0
      },
      "reg-afar": {
        "target": 3.0,
        "budget": 5000.0
      },
      "reg-moyale": {
        "target": 2.0,
        "budget": 10000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-3-4",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-3",
    "code": "4.3.4",
    "description": "Srengthen in school RC Clubs through material support, capacity-building trainings, etc",
    "uom": "# of RC Clubs  strengthenrd",
    "responsibility": "branch",
    "department": "Volunteers & Members",
    "activity_description": "Srengthen in school RC Clubs through material support, capacity-building trainings, etc",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 766.0,
    "ercs_budget": 5780000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 766.0,
    "rb_budget": 5780000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 460.0,
        "budget": 2585000.0
      },
      "reg-addis-ababa": {
        "target": 60.0,
        "budget": 120000.0
      },
      "reg-amhara": {
        "target": 170.0,
        "budget": 700000.0
      },
      "reg-central-ethiopia": {
        "target": 8.0,
        "budget": 400000.0
      },
      "reg-south-ethiopia": {
        "target": 8.0,
        "budget": 400000.0
      },
      "reg-south-west-ethiopia": {
        "target": 5.0,
        "budget": 300000.0
      },
      "reg-sidama": {
        "target": 8.0,
        "budget": 200000.0
      },
      "reg-tigray": {
        "target": 6.0,
        "budget": 300000.0
      },
      "reg-gambella": {
        "target": 3.0,
        "budget": 25000.0
      },
      "reg-benishangul-gumuz": {
        "target": 7.0,
        "budget": 200000.0
      },
      "reg-harar": {
        "target": 2.0,
        "budget": 100000.0
      },
      "reg-dire-dawa": {
        "target": 10.0,
        "budget": 200000.0
      },
      "reg-somali": {
        "target": 2.0,
        "budget": 100000.0
      },
      "reg-afar": {
        "target": 5.0,
        "budget": 100000.0
      },
      "reg-moyale": {
        "target": 12.0,
        "budget": 50000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-3-5",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-3",
    "code": "4.3.5",
    "description": "Develop and implement life skill and personal development training manual for youth",
    "uom": "# of training manuals",
    "responsibility": "HQ",
    "department": "Volunteers & Members",
    "activity_description": "Develop and implement life skill and personal development training manual for youth",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 0.0,
    "hq_target": 1.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-3-6",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-3",
    "code": "4.3.6",
    "description": "Establish National and regional Youth Centers (to ensure engagement and youth skill development )",
    "uom": "# of youth centers established",
    "responsibility": "Both",
    "department": "Volunteers & Members",
    "activity_description": "Establish National and regional Youth Centers (to ensure engagement and youth skill development )",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 3.0,
    "ercs_budget": 3650000.0,
    "hq_target": 1.0,
    "hq_budget": 3500000.0,
    "rb_target": 2.0,
    "rb_budget": 150000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-3-7",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-3",
    "code": "4.3.7",
    "description": "Organize National Youth Camp programs (to identify new ways of volunteering and promote solidarity)",
    "uom": "# of youth camps organized",
    "responsibility": "both",
    "department": "Volunteers & Members",
    "activity_description": "Organize National Youth Camp programs (to identify new ways of volunteering and promote solidarity)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 9.0,
    "ercs_budget": 3540000.0,
    "hq_target": 1.0,
    "hq_budget": 2000000.0,
    "rb_target": 8.0,
    "rb_budget": 1540000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 5.0,
        "budget": 810000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 1.0,
        "budget": 500000.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 1.0,
        "budget": 200000.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 30000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-3-8",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-3",
    "code": "4.3.8",
    "description": "Organizing workshops with branch heads on youth council structures",
    "uom": "# of workshops",
    "responsibility": "Both",
    "department": "Volunteers & Members",
    "activity_description": "Organizing workshops with branch heads on youth council structures",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 21.0,
    "ercs_budget": 1457000.0,
    "hq_target": 1.0,
    "hq_budget": 600000.0,
    "rb_target": 20.0,
    "rb_budget": 857000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 12.0,
        "budget": 600000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 5.0,
        "budget": 57000.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-3-9",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-3",
    "code": "4.3.9",
    "description": "Establish  and strengthen youth cooncils across regional and zonal branches",
    "uom": "# of youth Councils established",
    "responsibility": "Both",
    "department": "Volunteers & Members",
    "activity_description": "Establish  and strengthen youth cooncils across regional and zonal branches",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 60.0,
    "ercs_budget": 3220000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 60.0,
    "rb_budget": 3220000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 22.0,
        "budget": 1075000.0
      },
      "reg-addis-ababa": {
        "target": 5.0,
        "budget": 40000.0
      },
      "reg-amhara": {
        "target": 8.0,
        "budget": 600000.0
      },
      "reg-central-ethiopia": {
        "target": 5.0,
        "budget": 400000.0
      },
      "reg-south-ethiopia": {
        "target": 5.0,
        "budget": 100000.0
      },
      "reg-south-west-ethiopia": {
        "target": 3.0,
        "budget": 350000.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 5.0,
        "budget": 400000.0
      },
      "reg-gambella": {
        "target": 1.0,
        "budget": 60000.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 40000.0
      },
      "reg-harar": {
        "target": 1.0,
        "budget": 40000.0
      },
      "reg-dire-dawa": {
        "target": 1.0,
        "budget": 40000.0
      },
      "reg-somali": {
        "target": 1.0,
        "budget": 40000.0
      },
      "reg-afar": {
        "target": 1.0,
        "budget": 30000.0
      },
      "reg-moyale": {
        "target": 1.0,
        "budget": 5000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-3-10",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-3",
    "code": "4.3.10",
    "description": "Develop Youth Leadership Training Manual",
    "uom": "# of manuals developed",
    "responsibility": "HQ",
    "department": "Volunteers & Members",
    "activity_description": "Develop Youth Leadership Training Manual",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 450000.0,
    "hq_target": 1.0,
    "hq_budget": 450000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-3-11",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-3",
    "code": "4.3.11",
    "description": "Organize youth leadership training",
    "uom": "# of participants",
    "responsibility": "HQ",
    "department": "Volunteers & Members",
    "activity_description": "Organize youth leadership training",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 92.0,
    "ercs_budget": 1200000.0,
    "hq_target": 92.0,
    "hq_budget": 1200000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-4-3-12",
    "strategic_priority_id": "sp-4",
    "strategic_objective_id": "so-4-3",
    "code": "4.3.12",
    "description": "Provide support to youth participation/engagement in regional and global RC youth networks",
    "uom": "# of youth participated in youth networks",
    "responsibility": "HQ",
    "department": "Volunteers & Members",
    "activity_description": "Provide support to youth participation/engagement in regional and global RC youth networks",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 3.0,
    "ercs_budget": 2500000.0,
    "hq_target": 3.0,
    "hq_budget": 2500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-1-1",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-1",
    "code": "5.1.1",
    "description": "Develop and implement a national Humanitarian Diplomacy (HD) Framework aligned with IFRC HD guidelines.",
    "uom": "Framework developed and implemented",
    "responsibility": "HQ",
    "department": "Communication",
    "activity_description": "Develop and implement a national Humanitarian Diplomacy (HD) Framework aligned with IFRC HD guidelines.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 500000.0,
    "hq_target": 1.0,
    "hq_budget": 500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-1-2",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-1",
    "code": "5.1.2",
    "description": "Facilitate dialogues on SAF and funding opportunities with government authorities,diplomatic communities, parliamentarians, law enforcement agencies, and donors.",
    "uom": "# of dialogue sessions",
    "responsibility": "Both",
    "department": "Communication",
    "activity_description": "Facilitate dialogues on SAF and funding opportunities with government authorities,diplomatic communities, parliamentarians, law enforcement agencies, and donors.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 17.0,
    "ercs_budget": 3079000.0,
    "hq_target": 4.0,
    "hq_budget": 2000000.0,
    "rb_target": 13.0,
    "rb_budget": 1079000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 2.0,
        "budget": 500000.0
      },
      "reg-addis-ababa": {
        "target": 1.0,
        "budget": 150000.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 2.0,
        "budget": 24000.0
      },
      "reg-south-ethiopia": {
        "target": 6.0,
        "budget": 275000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 30000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-1-3",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-1",
    "code": "5.1.3",
    "description": "Provide training on HD tools, negotiation, messaging, and digital communication to leadership, governance, staff, and volunteers.",
    "uom": "# of participants",
    "responsibility": "Both",
    "department": "Communication",
    "activity_description": "Provide training on HD tools, negotiation, messaging, and digital communication to leadership, governance, staff, and volunteers.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 330.0,
    "ercs_budget": 2720000.0,
    "hq_target": 180.0,
    "hq_budget": 2000000.0,
    "rb_target": 150.0,
    "rb_budget": 720000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 50.0,
        "budget": 450000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 20.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 50.0,
        "budget": 20000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 30.0,
        "budget": 200000.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-1-4",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-1",
    "code": "5.1.4",
    "description": "Organize roundtable discussions to influence humanitarian focused national policies",
    "uom": "# of discussions",
    "responsibility": "HQ",
    "department": "Communication",
    "activity_description": "Organize roundtable discussions to influence humanitarian focused national policies",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 2.0,
    "ercs_budget": 500000.0,
    "hq_target": 2.0,
    "hq_budget": 500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-2-1",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-2",
    "code": "5.2.1",
    "description": "Develop centralized information hub",
    "uom": "# ofsystem",
    "responsibility": "HQ",
    "department": "Communication",
    "activity_description": "Develop centralized information hub",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 500000.0,
    "hq_target": 1.0,
    "hq_budget": 500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-2-3",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-2",
    "code": "5.2.3",
    "description": "Crafting and distributing awarness raising messages to branches for school clubs",
    "uom": "# of school clubs provided with messages",
    "responsibility": "branches",
    "department": "Communication",
    "activity_description": "Crafting and distributing awarness raising messages to branches for school clubs",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 1454.0,
    "ercs_budget": 3746500.0,
    "hq_target": 850.0,
    "hq_budget": 2000000.0,
    "rb_target": 604.0,
    "rb_budget": 1746500.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 42.0,
        "budget": 1114000.0
      },
      "reg-addis-ababa": {
        "target": 154.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 150.0,
        "budget": 400000.0
      },
      "reg-central-ethiopia": {
        "target": 40.0,
        "budget": 10000.0
      },
      "reg-south-ethiopia": {
        "target": 80.0,
        "budget": 12500.0
      },
      "reg-south-west-ethiopia": {
        "target": 15.0,
        "budget": 10000.0
      },
      "reg-sidama": {
        "target": 11.0,
        "budget": 60000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 12.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 50.0,
        "budget": 30000.0
      },
      "reg-harar": {
        "target": 9.0,
        "budget": 20000.0
      },
      "reg-dire-dawa": {
        "target": 4.0,
        "budget": 50000.0
      },
      "reg-somali": {
        "target": 10.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 15.0,
        "budget": 30000.0
      },
      "reg-moyale": {
        "target": 12.0,
        "budget": 10000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-2-4",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-2",
    "code": "5.2.4",
    "description": "Produce and broadcast weekly TV and radio programs",
    "uom": "# of broadcasted programs",
    "responsibility": "Both",
    "department": "Communication",
    "activity_description": "Produce and broadcast weekly TV and radio programs",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 125.0,
    "ercs_budget": 9342183.0,
    "hq_target": 95.0,
    "hq_budget": 8584483.0,
    "rb_target": 30.0,
    "rb_budget": 757700.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 2.0,
        "budget": 450000.0
      },
      "reg-addis-ababa": {
        "target": 2.0,
        "budget": 50000.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 6.0,
        "budget": 47700.0
      },
      "reg-south-ethiopia": {
        "target": 4.0,
        "budget": 100000.0
      },
      "reg-south-west-ethiopia": {
        "target": 4.0,
        "budget": 50000.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 12.0,
        "budget": 60000.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-2-5",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-2",
    "code": "5.2.5",
    "description": "Produce and transmit TV and Radio spots focusing on proper use of the Red Cross emblem, safer access, resource mobilization, membership and volunteers recruitment, peace promotion and etc.",
    "uom": "# of Spots",
    "responsibility": "Both",
    "department": "Communication",
    "activity_description": "Produce and transmit TV and Radio spots focusing on proper use of the Red Cross emblem, safer access, resource mobilization, membership and volunteers recruitment, peace promotion and etc.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 386.0,
    "ercs_budget": 6129930.0,
    "hq_target": 275.0,
    "hq_budget": 3468930.0,
    "rb_target": 111.0,
    "rb_budget": 2661000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 21.0,
        "budget": 1010000.0
      },
      "reg-addis-ababa": {
        "target": 8.0,
        "budget": 100000.0
      },
      "reg-amhara": {
        "target": 7.0,
        "budget": 700000.0
      },
      "reg-central-ethiopia": {
        "target": 20.0,
        "budget": 140000.0
      },
      "reg-south-ethiopia": {
        "target": 29.0,
        "budget": 261000.0
      },
      "reg-south-west-ethiopia": {
        "target": 14.0,
        "budget": 100000.0
      },
      "reg-sidama": {
        "target": 4.0,
        "budget": 100000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 4.0,
        "budget": 30000.0
      },
      "reg-somali": {
        "target": 2.0,
        "budget": 150000.0
      },
      "reg-afar": {
        "target": 2.0,
        "budget": 70000.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-2-6",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-2",
    "code": "5.2.6",
    "description": "Develop and disseminate content (News articles, blogs, case stories, events, etc.) on ERCS activities through mass and digital media.",
    "uom": "# of contents disseminated",
    "responsibility": "HQ",
    "department": "Communication",
    "activity_description": "Develop and disseminate content (News articles, blogs, case stories, events, etc.) on ERCS activities through mass and digital media.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 361.0,
    "ercs_budget": 120000.0,
    "hq_target": 360.0,
    "hq_budget": 100000.0,
    "rb_target": 1.0,
    "rb_budget": 20000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 1.0,
        "budget": 20000.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-2-7",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-2",
    "code": "5.2.7",
    "description": "Install electronic billboards/LED screens in selected areas of Addis Ababa to showcase Red Cross messages.",
    "uom": "# of Billboards",
    "responsibility": "HQ",
    "department": "Communication",
    "activity_description": "Install electronic billboards/LED screens in selected areas of Addis Ababa to showcase Red Cross messages.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 1500000.0,
    "hq_target": 1.0,
    "hq_budget": 1500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-2-8",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-2",
    "code": "5.2.8",
    "description": "Strengthen partnerships with national and international media outlets to promote ERCS's achievements and humanitarian efforts.",
    "uom": "# of partners strengthened",
    "responsibility": "HQ",
    "department": "Communication",
    "activity_description": "Strengthen partnerships with national and international media outlets to promote ERCS's achievements and humanitarian efforts.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 4.0,
    "ercs_budget": 2000000.0,
    "hq_target": 4.0,
    "hq_budget": 2000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-2-9",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-2",
    "code": "5.2.9",
    "description": "Produce documentary films and impact stories to support fundraising and public engagement.",
    "uom": "# of documentary films produced",
    "responsibility": "HQ",
    "department": "Communication",
    "activity_description": "Produce documentary films and impact stories to support fundraising and public engagement.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [
      "stream-ercs"
    ],
    "ercs_target": 52.0,
    "ercs_budget": 0.0,
    "hq_target": 52.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "stream-ercs": {
        "target": 1.0,
        "budget": 3089.0
      }
    }
  },
  {
    "id": "na-5-2-10",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-2",
    "code": "5.2.10",
    "description": "Printing and production of promotional tools and visibility materials (e.g., pins, jackets, umbrellas, T-shirts, hats, flags, magazines, brochures, calendars, agendas, mugs, etc).",
    "uom": "# of materials printed",
    "responsibility": "Both",
    "department": "Communication",
    "activity_description": "Printing and production of promotional tools and visibility materials (e.g., pins, jackets, umbrellas, T-shirts, hats, flags, magazines, brochures, calendars, agendas, mugs, etc).",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "ethiopia-mfa-dev-2026",
      "grc-hacap3",
      "l4r",
      "sraps"
    ],
    "ercs_target": 6667.0,
    "ercs_budget": 14892672.0,
    "hq_target": 3466.0,
    "hq_budget": 9191672.0,
    "rb_target": 3201.0,
    "rb_budget": 5701000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 1000.0,
        "budget": 4230000.0
      },
      "reg-addis-ababa": {
        "target": 500.0,
        "budget": 400000.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 400.0,
        "budget": 216000.0
      },
      "reg-south-ethiopia": {
        "target": 400.0,
        "budget": 200000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 300.0,
        "budget": 150000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 200.0,
        "budget": 150000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 300.0,
        "budget": 90000.0
      },
      "reg-somali": {
        "target": 100.0,
        "budget": 100000.0
      },
      "reg-afar": {
        "target": 1.0,
        "budget": 165000.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 1.0,
        "budget": 267000.0
      },
      "sraps": {
        "target": 1.0,
        "budget": 3000.0
      },
      "ethiopia-mfa-dev-2026": {
        "target": 1.0,
        "budget": 3888.8888888888887
      },
      "l4r": {
        "target": 1.0,
        "budget": 184000.0
      }
    }
  },
  {
    "id": "na-5-2-11",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-2",
    "code": "5.2.11",
    "description": "Organize RCRC Day celebrations to promote community engagement.",
    "uom": "# of event organized",
    "responsibility": "Both",
    "department": "Communication",
    "activity_description": "Organize RCRC Day celebrations to promote community engagement.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 458.0,
    "ercs_budget": 7161464.0,
    "hq_target": 54.0,
    "hq_budget": 3211464.0,
    "rb_target": 404.0,
    "rb_budget": 3950000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 21.0,
        "budget": 2005000.0
      },
      "reg-addis-ababa": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-amhara": {
        "target": 13.0,
        "budget": 325000.0
      },
      "reg-central-ethiopia": {
        "target": 5.0,
        "budget": 215000.0
      },
      "reg-south-ethiopia": {
        "target": 4.0,
        "budget": 280000.0
      },
      "reg-south-west-ethiopia": {
        "target": 3.0,
        "budget": 50000.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 500000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 50.0,
        "budget": 60000.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 1.0,
        "budget": 30000.0
      },
      "reg-somali": {
        "target": 1.0,
        "budget": 110000.0
      },
      "reg-afar": {
        "target": 2.0,
        "budget": 85000.0
      },
      "reg-moyale": {
        "target": 1.0,
        "budget": 80000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-2-12",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-2",
    "code": "5.2.12",
    "description": "Conduct media monitoring and respond to public complaints and feedbacks via digital and in-person channels to improve services and accountability.",
    "uom": "# of Feedback provided",
    "responsibility": "HQ",
    "department": "Communication",
    "activity_description": "Conduct media monitoring and respond to public complaints and feedbacks via digital and in-person channels to improve services and accountability.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 53.0,
    "ercs_budget": 270000.0,
    "hq_target": 50.0,
    "hq_budget": 100000.0,
    "rb_target": 3.0,
    "rb_budget": 170000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 1.0,
        "budget": 40000.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-3-1",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-3",
    "code": "5.3.1",
    "description": "Commission research, assessments, and policy briefs on key humanitarian issues.",
    "uom": "# of survey report",
    "responsibility": "HQ",
    "department": "Communication",
    "activity_description": "Commission research, assessments, and policy briefs on key humanitarian issues.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 200000.0,
    "hq_target": 1.0,
    "hq_budget": 200000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-3-2",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-3",
    "code": "5.3.2",
    "description": "Organize dissemination sessions for CBOs, government officials, and community representatives on Fundamental Principles, Emblem, IHL, Movement history, and role.",
    "uom": "# of Sessions",
    "responsibility": "Both",
    "department": "Communication",
    "activity_description": "Organize dissemination sessions for CBOs, government officials, and community representatives on Fundamental Principles, Emblem, IHL, Movement history, and role.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 198.0,
    "ercs_budget": 16404847.0,
    "hq_target": 78.0,
    "hq_budget": 9457958.0,
    "rb_target": 120.0,
    "rb_budget": 6946889.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 21.0,
        "budget": 2100000.0
      },
      "reg-addis-ababa": {
        "target": 8.0,
        "budget": 300000.0
      },
      "reg-amhara": {
        "target": 9.0,
        "budget": 900000.0
      },
      "reg-central-ethiopia": {
        "target": 4.0,
        "budget": 56889.0
      },
      "reg-south-ethiopia": {
        "target": 60.0,
        "budget": 2000000.0
      },
      "reg-south-west-ethiopia": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-sidama": {
        "target": 4.0,
        "budget": 100000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 2.0,
        "budget": 500000.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-harar": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-dire-dawa": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-somali": {
        "target": 2.0,
        "budget": 200000.0
      },
      "reg-afar": {
        "target": 5.0,
        "budget": 430000.0
      },
      "reg-moyale": {
        "target": 1.0,
        "budget": 60000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-3-3",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-3",
    "code": "5.3.3",
    "description": "Organize mass sensitization campaigns to raise awareness about ERCS's services and humanitarian principles.",
    "uom": "# of Campaigns",
    "responsibility": "both",
    "department": "Communication",
    "activity_description": "Organize mass sensitization campaigns to raise awareness about ERCS's services and humanitarian principles.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 130.0,
    "ercs_budget": 8341440.0,
    "hq_target": 58.0,
    "hq_budget": 3841440.0,
    "rb_target": 72.0,
    "rb_budget": 4500000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 40.0,
        "budget": 3650000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 9.0,
        "budget": 180000.0
      },
      "reg-central-ethiopia": {
        "target": 2.0,
        "budget": 150000.0
      },
      "reg-south-ethiopia": {
        "target": 4.0,
        "budget": 100000.0
      },
      "reg-south-west-ethiopia": {
        "target": 1.0,
        "budget": 10000.0
      },
      "reg-sidama": {
        "target": 2.0,
        "budget": 100000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 2.0,
        "budget": 50000.0
      },
      "reg-benishangul-gumuz": {
        "target": 3.0,
        "budget": 60000.0
      },
      "reg-harar": {
        "target": 2.0,
        "budget": 20000.0
      },
      "reg-dire-dawa": {
        "target": 2.0,
        "budget": 30000.0
      },
      "reg-somali": {
        "target": 2.0,
        "budget": 40000.0
      },
      "reg-afar": {
        "target": 2.0,
        "budget": 90000.0
      },
      "reg-moyale": {
        "target": 1.0,
        "budget": 20000.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-3-4",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-3",
    "code": "5.3.4",
    "description": "Organize Training of Trainers (TOT) and refresher training for DVM and communication personnel on Movement principles, emblem, IHL, Movement history, and Safer Access Framework.",
    "uom": "# of participants",
    "responsibility": "Both",
    "department": "Communication",
    "activity_description": "Organize Training of Trainers (TOT) and refresher training for DVM and communication personnel on Movement principles, emblem, IHL, Movement history, and Safer Access Framework.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 134.0,
    "ercs_budget": 1700000.0,
    "hq_target": 60.0,
    "hq_budget": 800000.0,
    "rb_target": 74.0,
    "rb_budget": 900000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 50.0,
        "budget": 500000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 12.0,
        "budget": 300000.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 12.0,
        "budget": 100000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-5-3-5",
    "strategic_priority_id": "sp-5",
    "strategic_objective_id": "so-5-3",
    "code": "5.3.5",
    "description": "Build staff and volunteer capacity in humanitarian diplomacy, Safer Access Framework, and dissemination through tailored training and mentorship.",
    "uom": "# of participants",
    "responsibility": "HQ",
    "department": "Communication",
    "activity_description": "Build staff and volunteer capacity in humanitarian diplomacy, Safer Access Framework, and dissemination through tailored training and mentorship.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 60.0,
    "ercs_budget": 400000.0,
    "hq_target": 60.0,
    "hq_budget": 400000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-1-1",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-1",
    "code": "6.1.1",
    "description": "Conduct partnership mapping and analysis",
    "uom": "# assessment",
    "responsibility": "HQ",
    "department": "DSG Program",
    "activity_description": "Conduct partnership mapping and analysis",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 2.0,
    "ercs_budget": 1530000.0,
    "hq_target": 1.0,
    "hq_budget": 1500000.0,
    "rb_target": 1.0,
    "rb_budget": 30000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 1.0,
        "budget": 30000.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-1-2",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-1",
    "code": "6.1.2",
    "description": "Identify Key Partners for Collaboration and establish strategic Partnership Agreements",
    "uom": "# partnerships established",
    "responsibility": "HQ",
    "department": "DSG Program",
    "activity_description": "Identify Key Partners for Collaboration and establish strategic Partnership Agreements",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 8.0,
    "ercs_budget": 830000.0,
    "hq_target": 5.0,
    "hq_budget": 800000.0,
    "rb_target": 3.0,
    "rb_budget": 30000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 3.0,
        "budget": 30000.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-1-3",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-1",
    "code": "6.1.3",
    "description": "Develop partnership development and management guideline",
    "uom": "#Guideline",
    "responsibility": "HQ",
    "department": "DSG Program",
    "activity_description": "Develop partnership development and management guideline",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 4000000.0,
    "hq_target": 1.0,
    "hq_budget": 4000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-1-4",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-1",
    "code": "6.1.4",
    "description": "Organize partnership forums and networking events",
    "uom": "# of events",
    "responsibility": "HQ",
    "department": "DSG Program",
    "activity_description": "Organize partnership forums and networking events",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 2.0,
    "ercs_budget": 1500000.0,
    "hq_target": 2.0,
    "hq_budget": 1500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-1-5",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-1",
    "code": "6.1.5",
    "description": "Conduct coordination meeting to strengthen coordination with Movement partners",
    "uom": "# of session",
    "responsibility": "HQ",
    "department": "DSG Program",
    "activity_description": "Conduct coordination meeting to strengthen coordination with Movement partners",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 12.0,
    "ercs_budget": 120000.0,
    "hq_target": 12.0,
    "hq_budget": 120000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-1-6",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-1",
    "code": "6.1.6",
    "description": "Collaborate with Non-Movement partners in humanitarian services",
    "uom": "# non movment partneres",
    "responsibility": "Both",
    "department": "DSG Program",
    "activity_description": "Collaborate with Non-Movement partners in humanitarian services",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 45.0,
    "ercs_budget": 1400000.0,
    "hq_target": 23.0,
    "hq_budget": 800000.0,
    "rb_target": 22.0,
    "rb_budget": 600000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 5.0,
        "budget": 500000.0
      },
      "reg-addis-ababa": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 2.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 2.0,
        "budget": 50000.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 3.0,
        "budget": 40000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 2.0,
        "budget": 10000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-1-7",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-1",
    "code": "6.1.7",
    "description": "Register and document partnerships in centralized database",
    "uom": "Partners registration doc",
    "responsibility": "HQ",
    "department": "DSG Program",
    "activity_description": "Register and document partnerships in centralized database",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 5.0,
    "ercs_budget": 600000.0,
    "hq_target": 1.0,
    "hq_budget": 600000.0,
    "rb_target": 4.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-1-8",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-1",
    "code": "6.1.8",
    "description": "Monitor partnership activities and deliverables",
    "uom": "#Monitoring  visit",
    "responsibility": "both",
    "department": "DSG Program",
    "activity_description": "Monitor partnership activities and deliverables",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 183.0,
    "ercs_budget": 4984000.0,
    "hq_target": 145.0,
    "hq_budget": 4000000.0,
    "rb_target": 38.0,
    "rb_budget": 984000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 16.0,
        "budget": 364000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 4.0,
        "budget": 200000.0
      },
      "reg-south-ethiopia": {
        "target": 4.0,
        "budget": 320000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 4.0,
        "budget": 100000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 10.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-1-9",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-1",
    "code": "6.1.9",
    "description": "Conduct annual partnership performance evaluation",
    "uom": "# workshops",
    "responsibility": "HQ",
    "department": "DSG Program",
    "activity_description": "Conduct annual partnership performance evaluation",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 2.0,
    "ercs_budget": 4000000.0,
    "hq_target": 2.0,
    "hq_budget": 4000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-1-10",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-1",
    "code": "6.1.10",
    "description": "Organize partnership recognition events",
    "uom": "# Events",
    "responsibility": "HQ",
    "department": "DSG Program",
    "activity_description": "Organize partnership recognition events",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 10.0,
    "ercs_budget": 5000000.0,
    "hq_target": 5.0,
    "hq_budget": 5000000.0,
    "rb_target": 5.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 5.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-1-11",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-1",
    "code": "6.1.11",
    "description": "Establishing partnership with member based organizations (CBOs, Clubs, associations\u2026) at HQ and branch level",
    "uom": "# of MoUs with organizations",
    "responsibility": "Branches",
    "department": "DSG Program",
    "activity_description": "Establishing partnership with member based organizations (CBOs, Clubs, associations\u2026) at HQ and branch level",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 91.0,
    "ercs_budget": 1835000.0,
    "hq_target": 69.0,
    "hq_budget": 1540000.0,
    "rb_target": 22.0,
    "rb_budget": 295000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 6.0,
        "budget": 100000.0
      },
      "reg-addis-ababa": {
        "target": 3.0,
        "budget": 30000.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 4.0,
        "budget": 50000.0
      },
      "reg-south-ethiopia": {
        "target": 4.0,
        "budget": 40000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 5.0,
        "budget": 75000.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-2-1",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-2",
    "code": "6.2.1",
    "description": "Conduct training for staff on partnership development and management",
    "uom": "# of trainees",
    "responsibility": "HQ",
    "department": "Resource Mobilization",
    "activity_description": "Conduct training for staff on partnership development and management",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 30.0,
    "ercs_budget": 1500000.0,
    "hq_target": 30.0,
    "hq_budget": 1500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-2-2",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-2",
    "code": "6.2.2",
    "description": "Conduct mapping of potential private partners and stakeholders to identify key players, partners, and opportunities in the private sector.",
    "uom": "# of Assessment",
    "responsibility": "both",
    "department": "Resource Mobilization",
    "activity_description": "Conduct mapping of potential private partners and stakeholders to identify key players, partners, and opportunities in the private sector.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 36.0,
    "ercs_budget": 400000.0,
    "hq_target": 1.0,
    "hq_budget": 50000.0,
    "rb_target": 35.0,
    "rb_budget": 350000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 10.0,
        "budget": 30000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 8.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 5.0,
        "budget": 100000.0
      },
      "reg-south-ethiopia": {
        "target": 5.0,
        "budget": 30000.0
      },
      "reg-south-west-ethiopia": {
        "target": 3.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 1.0,
        "budget": 140000.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-2-3",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-2",
    "code": "6.2.3",
    "description": "Develop partnership models such as public-private partnerships or co-investments, that benefit both parties.",
    "uom": "# of Joint venture",
    "responsibility": "HQ",
    "department": "Resource Mobilization",
    "activity_description": "Develop partnership models such as public-private partnerships or co-investments, that benefit both parties.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 0.0,
    "ercs_budget": 0.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-2-4",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-2",
    "code": "6.2.4",
    "description": "Design a private sector engagement strategy aligned with the organization\u2019s long-term goals.",
    "uom": "Strategy document",
    "responsibility": "HQ",
    "department": "Resource Mobilization",
    "activity_description": "Design a private sector engagement strategy aligned with the organization\u2019s long-term goals.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 0.0,
    "ercs_budget": 0.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-2-5",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-2",
    "code": "6.2.5",
    "description": "Organize peer learning sessions and experience sharing",
    "uom": "experience sharing",
    "responsibility": "both",
    "department": "Resource Mobilization",
    "activity_description": "Organize peer learning sessions and experience sharing",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 17.0,
    "ercs_budget": 1732000.0,
    "hq_target": 1.0,
    "hq_budget": 375000.0,
    "rb_target": 16.0,
    "rb_budget": 1357000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 10.0,
        "budget": 867000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-south-ethiopia": {
        "target": 4.0,
        "budget": 320000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 70000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-2-6",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-2",
    "code": "6.2.6",
    "description": "Promote strategic level partnership agreements",
    "uom": "# strategic partners",
    "responsibility": "HQ",
    "department": "Resource Mobilization",
    "activity_description": "Promote strategic level partnership agreements",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 3.0,
    "ercs_budget": 150000.0,
    "hq_target": 3.0,
    "hq_budget": 150000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-2-7",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-2",
    "code": "6.2.7",
    "description": "Maximize utilization of corporate social Responsibility (CSR).",
    "uom": "# CSR partners",
    "responsibility": "both",
    "department": "Resource Mobilization",
    "activity_description": "Maximize utilization of corporate social Responsibility (CSR).",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 27.0,
    "ercs_budget": 430000.0,
    "hq_target": 2.0,
    "hq_budget": 125000.0,
    "rb_target": 25.0,
    "rb_budget": 305000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 2.0,
        "budget": 25000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 4.0,
        "budget": 100000.0
      },
      "reg-south-ethiopia": {
        "target": 4.0,
        "budget": 100000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 7.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 3.0,
        "budget": 30000.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-3-1",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-3",
    "code": "6.3.1",
    "description": "Conduct Dialogue with High level Government Authorities.",
    "uom": "# of dialogue",
    "responsibility": "both",
    "department": "Partnership Coordination",
    "activity_description": "Conduct Dialogue with High level Government Authorities.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 19.0,
    "ercs_budget": 1270000.0,
    "hq_target": 1.0,
    "hq_budget": 500000.0,
    "rb_target": 18.0,
    "rb_budget": 770000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 5.0,
        "budget": 200000.0
      },
      "reg-south-ethiopia": {
        "target": 7.0,
        "budget": 370000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-benishangul-gumuz": {
        "target": 2.0,
        "budget": 150000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 2.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-3-2",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-3",
    "code": "6.3.2",
    "description": "Conduct  Workshop on IDRL to build the Capacity of staff and to advocate the incorporation of IDRL Guidelines in the domestic system",
    "uom": "# of workshop",
    "responsibility": "HQ",
    "department": "Partnership Coordination",
    "activity_description": "Conduct  Workshop on IDRL to build the Capacity of staff and to advocate the incorporation of IDRL Guidelines in the domestic system",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 500000.0,
    "hq_target": 1.0,
    "hq_budget": 500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-3-3",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-3",
    "code": "6.3.3",
    "description": "Organize workshop on the adoption and protection of Emblem  law with Government Authorities.",
    "uom": "# of workshop",
    "responsibility": "HQ",
    "department": "Partnership Coordination",
    "activity_description": "Organize workshop on the adoption and protection of Emblem  law with Government Authorities.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 0.0,
    "hq_target": 1.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-3-4",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-3",
    "code": "6.3.4",
    "description": "organize Seminars on the Key Humanitarian issues with the relevant stakeholders.",
    "uom": "# of seminars",
    "responsibility": "HQ",
    "department": "Partnership Coordination",
    "activity_description": "organize Seminars on the Key Humanitarian issues with the relevant stakeholders.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 400000.0,
    "hq_target": 1.0,
    "hq_budget": 400000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-3-5",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-3",
    "code": "6.3.5",
    "description": "Participate in Humanitarian coordination forums that aligns with ERCS interventions",
    "uom": "# of  coordination forums",
    "responsibility": "both",
    "department": "Partnership Coordination",
    "activity_description": "Participate in Humanitarian coordination forums that aligns with ERCS interventions",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 113.0,
    "ercs_budget": 402000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 113.0,
    "rb_budget": 402000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 21.0,
        "budget": 320000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 6.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 2.0,
        "budget": 30000.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 2.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 36.0,
        "budget": 2000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 2.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 36.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 4.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-6-3-6",
    "strategic_priority_id": "sp-6",
    "strategic_objective_id": "so-6-3",
    "code": "6.3.6",
    "description": "Facilitate workshops with different organization",
    "uom": "# of workshops",
    "responsibility": "HQ",
    "department": "Partnership Coordination",
    "activity_description": "Facilitate workshops with different organization",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 0.0,
    "ercs_budget": 0.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-1-1",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-1",
    "code": "7.1.1",
    "description": "Design and implement needs-based, continuous capacity-building programs",
    "uom": "#of capacity building programmes developed",
    "responsibility": "HR",
    "department": "Human Resource",
    "activity_description": "Design and implement needs-based, continuous capacity-building programs",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 1500000.0,
    "hq_target": 1.0,
    "hq_budget": 1500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-1-2",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-1",
    "code": "7.1.2",
    "description": "Implement and improve Employee engagement and retantion mechanism ( Benefits)",
    "uom": "percentage decrease turn over rate",
    "responsibility": "HR",
    "department": "Human Resource",
    "activity_description": "Implement and improve Employee engagement and retantion mechanism ( Benefits)",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 9.0,
    "ercs_budget": 1745460.0,
    "hq_target": 9.0,
    "hq_budget": 1745460.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-1-3",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-1",
    "code": "7.1.3",
    "description": "Implement human resource administration (Salary, PF, compensation payment)",
    "uom": "# of staff",
    "responsibility": "HR",
    "department": "Human Resource",
    "activity_description": "Implement human resource administration (Salary, PF, compensation payment)",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 219.0,
    "ercs_budget": 80283329.0,
    "hq_target": 153.0,
    "hq_budget": 80283329.0,
    "rb_target": 66.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 66.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-1-4",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-1",
    "code": "7.1.4",
    "description": "Design and implement modern Talent acquisition methodologies(jobfairs, online advertisement, employee rostersheet, professional volunteers engagements,etc)",
    "uom": "# of new talenet acquision methods employed",
    "responsibility": "HR",
    "department": "Human Resource",
    "activity_description": "Design and implement modern Talent acquisition methodologies(jobfairs, online advertisement, employee rostersheet, professional volunteers engagements,etc)",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 759000.0,
    "hq_target": 1.0,
    "hq_budget": 759000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-1-5",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-1",
    "code": "7.1.5",
    "description": "Train staff on policies and Manuals (procurement,warehouse and asset amangment and fleet management)",
    "uom": "# of staff trained",
    "responsibility": "Supply Chain",
    "department": "Human Resource",
    "activity_description": "Train staff on policies and Manuals (procurement,warehouse and asset amangment and fleet management)",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 61.0,
    "ercs_budget": 1200000.0,
    "hq_target": 2.0,
    "hq_budget": 1000000.0,
    "rb_target": 59.0,
    "rb_budget": 200000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 35.0,
        "budget": 150000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 24.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-1-6",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-1",
    "code": "7.1.6",
    "description": "Develop and Implement leadership development program",
    "uom": "# of participants",
    "responsibility": "HR",
    "department": "Human Resource",
    "activity_description": "Develop and Implement leadership development program",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 76.0,
    "ercs_budget": 2175000.0,
    "hq_target": 31.0,
    "hq_budget": 1705000.0,
    "rb_target": 45.0,
    "rb_budget": 470000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 45.0,
        "budget": 470000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-1-7",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-1",
    "code": "7.1.7",
    "description": "Improve and impliment integrted comprehensive facility management service",
    "uom": "percentage decrease in facility management service cost",
    "responsibility": "HQ",
    "department": "Human Resource",
    "activity_description": "Improve and impliment integrted comprehensive facility management service",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 38.0,
    "ercs_budget": 6500000.0,
    "hq_target": 38.0,
    "hq_budget": 6500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-2-1",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-2",
    "code": "7.2.1",
    "description": "Facilitate the localization agenda and branch development workshop for branch management and board members.",
    "uom": "# of workshop",
    "responsibility": "HQ",
    "department": "Branch Affairs & Localization",
    "activity_description": "Facilitate the localization agenda and branch development workshop for branch management and board members.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 2.0,
    "ercs_budget": 2000000.0,
    "hq_target": 2.0,
    "hq_budget": 2000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-2-2",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-2",
    "code": "7.2.2",
    "description": "Conduct branch capacity Assessment",
    "uom": "Number of Branches  assessed",
    "responsibility": "HQ",
    "department": "Branch Affairs & Localization",
    "activity_description": "Conduct branch capacity Assessment",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 4.0,
    "ercs_budget": 800000.0,
    "hq_target": 4.0,
    "hq_budget": 800000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-2-3",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-2",
    "code": "7.2.3",
    "description": "Develop a comprehensive & context-specific Branch Development Plan for Level II & III branches based on BOCA findings.",
    "uom": "# of Branch Development plan",
    "responsibility": "HQ",
    "department": "Branch Affairs & Localization",
    "activity_description": "Develop a comprehensive & context-specific Branch Development Plan for Level II & III branches based on BOCA findings.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 4.0,
    "ercs_budget": 405000.0,
    "hq_target": 4.0,
    "hq_budget": 405000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-2-4",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-2",
    "code": "7.2.4",
    "description": "Perform capacity building programs for level  III branches identifide during BCA",
    "uom": "# of branches supported",
    "responsibility": "HQ",
    "department": "Branch Affairs & Localization",
    "activity_description": "Perform capacity building programs for level  III branches identifide during BCA",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [
      "grc-hacap3"
    ],
    "ercs_target": 4.0,
    "ercs_budget": 20000000.0,
    "hq_target": 4.0,
    "hq_budget": 20000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 1.0,
        "budget": 890000.0
      }
    }
  },
  {
    "id": "na-7-2-5",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-2",
    "code": "7.2.5",
    "description": "Review  Board Electionn guideline",
    "uom": "#of guideline",
    "responsibility": "HQ",
    "department": "Branch Affairs & Localization",
    "activity_description": "Review  Board Electionn guideline",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 5.0,
    "ercs_budget": 3300000.0,
    "hq_target": 1.0,
    "hq_budget": 500000.0,
    "rb_target": 4.0,
    "rb_budget": 2800000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 1.0,
        "budget": 1000000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 2.0,
        "budget": 1500000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 1.0,
        "budget": 300000.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-2-6",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-2",
    "code": "7.2.6",
    "description": "Organize National General Assemblies and board election sessions as per the schedule",
    "uom": "# of General assembly",
    "responsibility": "Both",
    "department": "Branch Affairs & Localization",
    "activity_description": "Organize National General Assemblies and board election sessions as per the schedule",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 10.0,
    "ercs_budget": 8165000.0,
    "hq_target": 1.0,
    "hq_budget": 5600000.0,
    "rb_target": 9.0,
    "rb_budget": 2565000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 1.0,
        "budget": 1505000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 4.0,
        "budget": 510000.0
      },
      "reg-south-west-ethiopia": {
        "target": 1.0,
        "budget": 300000.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-2-7",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-2",
    "code": "7.2.7",
    "description": "organize board induction and training sessions to newly elected board members",
    "uom": "# trainings",
    "responsibility": "Both",
    "department": "Branch Affairs & Localization",
    "activity_description": "organize board induction and training sessions to newly elected board members",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 2.0,
    "ercs_budget": 3000000.0,
    "hq_target": 2.0,
    "hq_budget": 3000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-2-8",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-2",
    "code": "7.2.8",
    "description": "organize  familarization workshop on ERCS branch development framework",
    "uom": "# Workshop",
    "responsibility": "HQ",
    "department": "Branch Affairs & Localization",
    "activity_description": "organize  familarization workshop on ERCS branch development framework",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 6.0,
    "ercs_budget": 2650000.0,
    "hq_target": 1.0,
    "hq_budget": 1200000.0,
    "rb_target": 5.0,
    "rb_budget": 1450000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 3.0,
        "budget": 1450000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-2-9",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-2",
    "code": "7.2.9",
    "description": "Facilitate inter- and intra-branch peer-to-peer learning and experience-sharing events.",
    "uom": "# event",
    "responsibility": "both",
    "department": "Branch Affairs & Localization",
    "activity_description": "Facilitate inter- and intra-branch peer-to-peer learning and experience-sharing events.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 3.0,
    "ercs_budget": 7838000.0,
    "hq_target": 1.0,
    "hq_budget": 2000000.0,
    "rb_target": 2.0,
    "rb_budget": 5838000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 8.0,
        "budget": 4700000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 7.0,
        "budget": 700000.0
      },
      "reg-central-ethiopia": {
        "target": 2.0,
        "budget": 78000.0
      },
      "reg-south-ethiopia": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 1.0,
        "budget": 210000.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-2-10",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-2",
    "code": "7.2.10",
    "description": "Establish new branches (zonal or Woredas) based on fulfillment of requirements",
    "uom": "# of new branches",
    "responsibility": "Branches",
    "department": "Branch Affairs & Localization",
    "activity_description": "Establish new branches (zonal or Woredas) based on fulfillment of requirements",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 4.0,
    "ercs_budget": 1750000.0,
    "hq_target": 2.0,
    "hq_budget": 150000.0,
    "rb_target": 2.0,
    "rb_budget": 1600000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 2.0,
        "budget": 300000.0
      },
      "reg-south-ethiopia": {
        "target": 2.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 3.0,
        "budget": 600000.0
      },
      "reg-sidama": {
        "target": 2.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 1.0,
        "budget": 500000.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 150000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-2-11",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-2",
    "code": "7.2.11",
    "description": "Develop a standard ERCS Branch Maturity Leveling (Grading) framework.",
    "uom": "# framework",
    "responsibility": "HQ",
    "department": "Branch Affairs & Localization",
    "activity_description": "Develop a standard ERCS Branch Maturity Leveling (Grading) framework.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 0.0,
    "ercs_budget": 0.0,
    "hq_target": 1.0,
    "hq_budget": 750000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-3-1",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-3",
    "code": "7.3.1",
    "description": "Conduct  Institutional risk assessment",
    "uom": "#assessment report",
    "responsibility": "HQ and branches jointly",
    "department": "Internal Audit",
    "activity_description": "Conduct  Institutional risk assessment",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 8.0,
    "ercs_budget": 590000.0,
    "hq_target": 1.0,
    "hq_budget": 300000.0,
    "rb_target": 7.0,
    "rb_budget": 290000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 1.0,
        "budget": 40000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 2.0,
        "budget": 60000.0
      },
      "reg-south-ethiopia": {
        "target": 3.0,
        "budget": 150000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 40000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-3-2",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-3",
    "code": "7.3.2",
    "description": "Develop risk management mitigation mechanisms",
    "uom": "#mitigation plan",
    "responsibility": "HQ and branches jointly",
    "department": "Internal Audit",
    "activity_description": "Develop risk management mitigation mechanisms",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 8.0,
    "ercs_budget": 230000.0,
    "hq_target": 1.0,
    "hq_budget": 0.0,
    "rb_target": 7.0,
    "rb_budget": 230000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 1.0,
        "budget": 40000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 2.0,
        "budget": 100000.0
      },
      "reg-south-ethiopia": {
        "target": 3.0,
        "budget": 60000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 30000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-3-3",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-3",
    "code": "7.3.3",
    "description": "Execute risk based Internal Audits",
    "uom": "#of audit report",
    "responsibility": "HQ & tier 1 Branches",
    "department": "Internal Audit",
    "activity_description": "Execute risk based Internal Audits",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 71.0,
    "ercs_budget": 2160000.0,
    "hq_target": 60.0,
    "hq_budget": 1750000.0,
    "rb_target": 11.0,
    "rb_budget": 410000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 1.0,
        "budget": 10000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 10.0,
        "budget": 400000.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-3-4",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-3",
    "code": "7.3.4",
    "description": "Strengthining internal control based on identified risks",
    "uom": "# of measures taken",
    "responsibility": "Both",
    "department": "Internal Audit",
    "activity_description": "Strengthining internal control based on identified risks",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 11.0,
    "ercs_budget": 10000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 11.0,
    "rb_budget": 10000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 1.0,
        "budget": 10000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 10.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-3-5",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-3",
    "code": "7.3.5",
    "description": "Develop , implement, and update Risk Management and Internal  Audit policy, Frameworks, and guideline(manual)",
    "uom": "#approved documents",
    "responsibility": "HQ(RM &IA)",
    "department": "Internal Audit",
    "activity_description": "Develop , implement, and update Risk Management and Internal  Audit policy, Frameworks, and guideline(manual)",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 100000.0,
    "hq_target": 1.0,
    "hq_budget": 100000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-1",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.1",
    "description": "Digitilize and integrate risk management and audit function across the organization",
    "uom": "# of systems/tools",
    "responsibility": "IA and ICT",
    "department": "ICT",
    "activity_description": "Digitilize and integrate risk management and audit function across the organization",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 200000.0,
    "hq_target": 1.0,
    "hq_budget": 200000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-2",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.2",
    "description": "finalize  members   & volunteers' hub (digital member & volunteers registration including Mobile App)",
    "uom": "# of systems developed",
    "responsibility": "ICT and VMBA",
    "department": "ICT",
    "activity_description": "finalize  members   & volunteers' hub (digital member & volunteers registration including Mobile App)",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 4000000.0,
    "hq_target": 1.0,
    "hq_budget": 4000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-3",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.3",
    "description": "roll out the member & Volunteers system to all regional  branches",
    "uom": "# of RB",
    "responsibility": "MVBA & ICT",
    "department": "ICT",
    "activity_description": "roll out the member & Volunteers system to all regional  branches",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 14.0,
    "ercs_budget": 2000000.0,
    "hq_target": 14.0,
    "hq_budget": 2000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-4",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.4",
    "description": "Degitalize the ERCS supply chain system end to end",
    "uom": "# of system developed",
    "responsibility": "HS Supply chain",
    "department": "ICT",
    "activity_description": "Degitalize the ERCS supply chain system end to end",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 0.0,
    "ercs_budget": 0.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-5",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.5",
    "description": "Establish and maintain essential digital infrastructure, Disaster Reovery site",
    "uom": "# of sites",
    "responsibility": "HQ ICT",
    "department": "ICT",
    "activity_description": "Establish and maintain essential digital infrastructure, Disaster Reovery site",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 2.0,
    "ercs_budget": 20000000.0,
    "hq_target": 2.0,
    "hq_budget": 20000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-6",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.6",
    "description": "Roll out HR and Project Management system for  regional branches",
    "uom": "# of RB",
    "responsibility": "HQ ICT",
    "department": "ICT",
    "activity_description": "Roll out HR and Project Management system for  regional branches",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 14.0,
    "ercs_budget": 1600000.0,
    "hq_target": 14.0,
    "hq_budget": 1600000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-7",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.7",
    "description": "Roll out Pharmacy Management system",
    "uom": "# of RB",
    "responsibility": "HQ EDP",
    "department": "ICT",
    "activity_description": "Roll out Pharmacy Management system",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 0.0,
    "ercs_budget": 0.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-8",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.8",
    "description": "Develop & implement Hotel Management system",
    "uom": "# of system",
    "responsibility": "HQ CCDHS",
    "department": "ICT",
    "activity_description": "Develop & implement Hotel Management system",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 3000000.0,
    "hq_target": 1.0,
    "hq_budget": 3000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-9",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.9",
    "description": "License payment for office 365 ,Power BI , SAP",
    "uom": "# of licenses",
    "responsibility": "HQ ICT",
    "department": "ICT",
    "activity_description": "License payment for office 365 ,Power BI , SAP",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1600.0,
    "ercs_budget": 5500000.0,
    "hq_target": 1600.0,
    "hq_budget": 5500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-10",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.10",
    "description": "Install GPS devices on regional  ERCS vehicles to ensure harmonized service delivery.",
    "uom": "# of vehicles with GPS",
    "responsibility": "EMS & ICT",
    "department": "ICT",
    "activity_description": "Install GPS devices on regional  ERCS vehicles to ensure harmonized service delivery.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 50.0,
    "ercs_budget": 1600000.0,
    "hq_target": 50.0,
    "hq_budget": 1600000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-11",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.11",
    "description": "provide training on ambulance dispatch ,  data collection tools",
    "uom": "# of RB",
    "responsibility": "EMS & ICT",
    "department": "ICT",
    "activity_description": "provide training on ambulance dispatch ,  data collection tools",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 4.0,
    "ercs_budget": 2000000.0,
    "hq_target": 4.0,
    "hq_budget": 2000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-12",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.12",
    "description": "develop Cloud Services protocol",
    "uom": "# of document developed",
    "responsibility": "ICT",
    "department": "ICT",
    "activity_description": "develop Cloud Services protocol",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 0.0,
    "hq_target": 1.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-13",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.13",
    "description": "upgrade Data protection protocol",
    "uom": "# of document developed",
    "responsibility": "ICT",
    "department": "ICT",
    "activity_description": "upgrade Data protection protocol",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 0.0,
    "hq_target": 1.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-14",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.14",
    "description": "Developing E-Learning management system",
    "uom": "# of system developed",
    "responsibility": "HR & ICT",
    "department": "ICT",
    "activity_description": "Developing E-Learning management system",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 2000000.0,
    "hq_target": 1.0,
    "hq_budget": 2000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-15",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.15",
    "description": "Digitalize Monitoring, Evaluation, and Reporting (PMER) tools including training",
    "uom": "# of system developed",
    "responsibility": "PMER & ICT",
    "department": "ICT",
    "activity_description": "Digitalize Monitoring, Evaluation, and Reporting (PMER) tools including training",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 4000000.0,
    "hq_target": 1.0,
    "hq_budget": 4000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-16",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.16",
    "description": "roll out  centralized contact center to regional branches",
    "uom": "# of RB rolled out",
    "responsibility": "CEA & ICT",
    "department": "ICT",
    "activity_description": "roll out  centralized contact center to regional branches",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 7.0,
    "ercs_budget": 800000.0,
    "hq_target": 7.0,
    "hq_budget": 800000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-17",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.17",
    "description": "Follow up, support of all avialable systems such as SAP, office 365, ERP systems ,EOC systems  implement simple solutions  per the ERCS needs",
    "uom": "# of systems followed up",
    "responsibility": "ICT & EOC",
    "department": "ICT",
    "activity_description": "Follow up, support of all avialable systems such as SAP, office 365, ERP systems ,EOC systems  implement simple solutions  per the ERCS needs",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 20.0,
    "ercs_budget": 0.0,
    "hq_target": 20.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-18",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.18",
    "description": "support Network and internet at HQ and regional branches",
    "uom": "% of netwrok and internet supported",
    "responsibility": "ICT",
    "department": "ICT",
    "activity_description": "support Network and internet at HQ and regional branches",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 20.0,
    "ercs_budget": 0.0,
    "hq_target": 20.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-19",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.19",
    "description": "Administration of Office 365 system(Creating and Blocking account, Reset Password, Creating Group Account, Creating Microsoft Team, Creating and updating  Signature, Antivirus installation and updates, support Virtual Meeting )",
    "uom": "% of office 365 supported",
    "responsibility": "ICT",
    "department": "ICT",
    "activity_description": "Administration of Office 365 system(Creating and Blocking account, Reset Password, Creating Group Account, Creating Microsoft Team, Creating and updating  Signature, Antivirus installation and updates, support Virtual Meeting )",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 10.0,
    "ercs_budget": 0.0,
    "hq_target": 10.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-20",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.20",
    "description": "Support and follow up voice over IP phone",
    "uom": "% of VOIP  supported",
    "responsibility": "ICT",
    "department": "ICT",
    "activity_description": "Support and follow up voice over IP phone",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 0.0,
    "ercs_budget": 0.0,
    "hq_target": 100.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-21",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.21",
    "description": "IT Support and Maintenance for Desktops, laptops, cables, wireless problems, Network",
    "uom": "% of maintenance uprovieded",
    "responsibility": "ICT",
    "department": "ICT",
    "activity_description": "IT Support and Maintenance for Desktops, laptops, cables, wireless problems, Network",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 0.0,
    "ercs_budget": 0.0,
    "hq_target": 100.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-22",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.22",
    "description": "Check the status of Switches, Routers and Wireless APs, Server and Camera",
    "uom": "% of core devices checked",
    "responsibility": "ICT",
    "department": "ICT",
    "activity_description": "Check the status of Switches, Routers and Wireless APs, Server and Camera",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 40.0,
    "ercs_budget": 0.0,
    "hq_target": 40.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-23",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.23",
    "description": "Update ICT equipment Specification",
    "uom": "# of document updated",
    "responsibility": "ICT",
    "department": "ICT",
    "activity_description": "Update ICT equipment Specification",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 0.0,
    "hq_target": 1.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-24",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.24",
    "description": "Technical evaluation to procure ICT devices",
    "uom": "% of evaluations  provieded",
    "responsibility": "ICT",
    "department": "ICT",
    "activity_description": "Technical evaluation to procure ICT devices",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 0.0,
    "ercs_budget": 0.0,
    "hq_target": 100.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-25",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.25",
    "description": "System and Database backup  for all ERP solutions",
    "uom": "# of back ups taken",
    "responsibility": "ICT",
    "department": "ICT",
    "activity_description": "System and Database backup  for all ERP solutions",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 20.0,
    "ercs_budget": 0.0,
    "hq_target": 20.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-26",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.26",
    "description": "support  and roll out  ERP SAP",
    "uom": "% of rollout taken",
    "responsibility": "ICT",
    "department": "ICT",
    "activity_description": "support  and roll out  ERP SAP",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 20.0,
    "ercs_budget": 0.0,
    "hq_target": 20.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-27",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.27",
    "description": "Settle out the annual rental fee of website hosting services",
    "uom": "amount of services paid",
    "responsibility": "ICT",
    "department": "ICT",
    "activity_description": "Settle out the annual rental fee of website hosting services",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 20000.0,
    "hq_target": 1.0,
    "hq_budget": 20000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-4-28",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-4",
    "code": "7.4.28",
    "description": "Prepare annual leave schedule for staffs",
    "uom": "# of schedule prepared",
    "responsibility": "ICT",
    "department": "ICT",
    "activity_description": "Prepare annual leave schedule for staffs",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 4.0,
    "ercs_budget": 0.0,
    "hq_target": 4.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-5-1",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-5",
    "code": "7.5.1",
    "description": "Provide orientation to the concerned staff on PMER guideline",
    "uom": "# of participants",
    "responsibility": "HQ",
    "department": "PMER",
    "activity_description": "Provide orientation to the concerned staff on PMER guideline",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 40.0,
    "ercs_budget": 800000.0,
    "hq_target": 40.0,
    "hq_budget": 800000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-5-2",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-5",
    "code": "7.5.2",
    "description": "Ensure Functional Complaint and Feedback Mechanisms are established at regional and zonal level and performance progress of Strategic Priorities through monitoring",
    "uom": "# branches Monitored",
    "responsibility": "Both",
    "department": "PMER",
    "activity_description": "Ensure Functional Complaint and Feedback Mechanisms are established at regional and zonal level and performance progress of Strategic Priorities through monitoring",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "ec2r-health"
    ],
    "ercs_target": 6.0,
    "ercs_budget": 1000000.0,
    "hq_target": 6.0,
    "hq_budget": 1000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "ec2r-health": {
        "target": 20.0,
        "budget": 1000000.0
      }
    }
  },
  {
    "id": "na-7-5-3",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-5",
    "code": "7.5.3",
    "description": "Conduct assessments (needs assessments, baseline assessments, evaluations, distribution monitoring, Post Distribution Monitoring (PDM) & outcome monitoring)",
    "uom": "# assessment report",
    "responsibility": "Both",
    "department": "PMER",
    "activity_description": "Conduct assessments (needs assessments, baseline assessments, evaluations, distribution monitoring, Post Distribution Monitoring (PDM) & outcome monitoring)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [
      "grc-hacap3",
      "l4r",
      "sraps",
      "ec2r-health"
    ],
    "ercs_target": 20.0,
    "ercs_budget": 0.0,
    "hq_target": 20.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 9.0,
        "budget": 1068000.0
      },
      "sraps": {
        "target": 1.0,
        "budget": 10000.0
      },
      "l4r": {
        "target": 2.0,
        "budget": 552000.0
      },
      "ec2r-health": {
        "target": 0.0,
        "budget": 3000000.0
      }
    }
  },
  {
    "id": "na-7-5-4",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-5",
    "code": "7.5.4",
    "description": "Implement a Centralized PMER MIS In collaboration with IT Team",
    "uom": "# of system implemented",
    "responsibility": "HQ",
    "department": "PMER",
    "activity_description": "Implement a Centralized PMER MIS In collaboration with IT Team",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 0.0,
    "hq_target": 1.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-5-5",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-5",
    "code": "7.5.5",
    "description": "Organise workshops to strengthen Knowledge Management and Learning",
    "uom": "# of workshops",
    "responsibility": "HQ",
    "department": "PMER",
    "activity_description": "Organise workshops to strengthen Knowledge Management and Learning",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [
      "grc-hacap3",
      "l4r"
    ],
    "ercs_target": 18.0,
    "ercs_budget": 6473700.0,
    "hq_target": 2.0,
    "hq_budget": 3000000.0,
    "rb_target": 16.0,
    "rb_budget": 3473700.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 2.0,
        "budget": 2253200.0
      },
      "reg-addis-ababa": {
        "target": 4.0,
        "budget": 360000.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 2.0,
        "budget": 165500.0
      },
      "reg-south-ethiopia": {
        "target": 2.0,
        "budget": 300000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 2.0,
        "budget": 100000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 30000.0
      },
      "reg-somali": {
        "target": 2.0,
        "budget": 200000.0
      },
      "reg-afar": {
        "target": 2.0,
        "budget": 65000.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {
      "grc-hacap3": {
        "target": 1.0,
        "budget": 267001.0
      },
      "l4r": {
        "target": 120.0,
        "budget": 1545600.0
      }
    }
  },
  {
    "id": "na-7-5-6",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-5",
    "code": "7.5.6",
    "description": "Capture and share best practices to enhance learning culture and knowledge-management practices from projects implementation.",
    "uom": "# of learning shared",
    "responsibility": "both",
    "department": "PMER",
    "activity_description": "Capture and share best practices to enhance learning culture and knowledge-management practices from projects implementation.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 0.0,
    "hq_target": 1.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-5-7",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-5",
    "code": "7.5.7",
    "description": "Standardize Organizational PMER Tools and Formats for the National Society",
    "uom": "# of tools developed",
    "responsibility": "HQ",
    "department": "PMER",
    "activity_description": "Standardize Organizational PMER Tools and Formats for the National Society",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 0.0,
    "hq_target": 1.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-5-8",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-5",
    "code": "7.5.8",
    "description": "Prepare annual operational plan and seasonal performance review report",
    "uom": "# of documents",
    "responsibility": "both",
    "department": "PMER",
    "activity_description": "Prepare annual operational plan and seasonal performance review report",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 87.0,
    "ercs_budget": 0.0,
    "hq_target": 5.0,
    "hq_budget": 0.0,
    "rb_target": 82.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 42.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-7-5-9",
    "strategic_priority_id": "sp-7",
    "strategic_objective_id": "so-7-5",
    "code": "7.5.9",
    "description": "Prepare comprehensive plan and report for General Assembly meeting",
    "uom": "# of plan & report prepared",
    "responsibility": "both",
    "department": "PMER",
    "activity_description": "Prepare comprehensive plan and report for General Assembly meeting",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 5.0,
    "ercs_budget": 15000.0,
    "hq_target": 1.0,
    "hq_budget": 0.0,
    "rb_target": 4.0,
    "rb_budget": 15000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 2.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 15000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-1-1",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-1",
    "code": "8.1.1",
    "description": "Increase local funds and donations",
    "uom": "ETB",
    "responsibility": "both",
    "department": "Resource Mobilization",
    "activity_description": "Increase local funds and donations",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 72516949.6,
    "ercs_budget": 9017000.0,
    "hq_target": 35000000.0,
    "hq_budget": 5500000.0,
    "rb_target": 37516949.6,
    "rb_budget": 3517000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 20037149.0,
        "budget": 2737000.0
      },
      "reg-addis-ababa": {
        "target": 6679800.6,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 500000.0,
        "budget": 30000.0
      },
      "reg-central-ethiopia": {
        "target": 650000.0,
        "budget": 30000.0
      },
      "reg-south-ethiopia": {
        "target": 3000000.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 150000.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 3000000.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 500000.0,
        "budget": 75000.0
      },
      "reg-harar": {
        "target": 300000.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 100000.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 1600000.0,
        "budget": 220000.0
      },
      "reg-moyale": {
        "target": 1000000.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-1-2",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-1",
    "code": "8.1.2",
    "description": "Expand and strengthen digital fundraising platforms.",
    "uom": "# of platforms",
    "responsibility": "HQ",
    "department": "Resource Mobilization",
    "activity_description": "Expand and strengthen digital fundraising platforms.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 50000.0,
    "hq_target": 1.0,
    "hq_budget": 50000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-1-3",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-1",
    "code": "8.1.3",
    "description": "Leverage private sector companies\u2014promote corporate social responsibility initiatives, in-kind donations, and expertise support.",
    "uom": "# of Social responsibility intiatives",
    "responsibility": "both",
    "department": "Resource Mobilization",
    "activity_description": "Leverage private sector companies\u2014promote corporate social responsibility initiatives, in-kind donations, and expertise support.",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 27.0,
    "ercs_budget": 1150000.0,
    "hq_target": 5.0,
    "hq_budget": 1000000.0,
    "rb_target": 22.0,
    "rb_budget": 150000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 8.0,
        "budget": 100000.0
      },
      "reg-south-ethiopia": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 2.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 3.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-1-4",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-1",
    "code": "8.1.4",
    "description": "Increase membership fee",
    "uom": "ETB",
    "responsibility": "Branch",
    "department": "Resource Mobilization",
    "activity_description": "Increase membership fee",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 1601916170.0,
    "ercs_budget": 120432214.9,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 1601916170.0,
    "rb_budget": 120432214.9,
    "regional_targets": {
      "reg-oromia": {
        "target": 894467373.0,
        "budget": 54577430.0
      },
      "reg-addis-ababa": {
        "target": 50521689.0,
        "budget": 3678628.9
      },
      "reg-amhara": {
        "target": 381188800.0,
        "budget": 53210976.0
      },
      "reg-central-ethiopia": {
        "target": 82543258.0,
        "budget": 7715180.0
      },
      "reg-south-ethiopia": {
        "target": 78154500.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 8497250.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 20715350.0,
        "budget": 1000000.0
      },
      "reg-tigray": {
        "target": 63700000.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 782750.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 3000000.0,
        "budget": 250000.0
      },
      "reg-harar": {
        "target": 1365950.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 4320000.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 4500000.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 3659250.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 4500000.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-1-5",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-1",
    "code": "8.1.5",
    "description": "Increase Income from IGAs",
    "uom": "ETB",
    "responsibility": "both",
    "department": "Resource Mobilization",
    "activity_description": "Increase Income from IGAs",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 179277360.67,
    "ercs_budget": 2584400.0,
    "hq_target": 23000000.0,
    "hq_budget": 0.0,
    "rb_target": 156277360.67,
    "rb_budget": 2584400.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 62359547.0,
        "budget": 2184400.0
      },
      "reg-addis-ababa": {
        "target": 1236000.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 20858728.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 5120000.0,
        "budget": 100000.0
      },
      "reg-south-ethiopia": {
        "target": 6000000.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 5000000.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 4077066.67,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 5000000.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 5274019.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 8400000.0,
        "budget": 300000.0
      },
      "reg-harar": {
        "target": 3072000.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 9100000.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 20000000.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 700000.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 80000.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-1-6",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-1",
    "code": "8.1.6",
    "description": "Increase support from government sources, including subsidies;",
    "uom": "ETB",
    "responsibility": "both",
    "department": "Resource Mobilization",
    "activity_description": "Increase support from government sources, including subsidies;",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 409855305.0,
    "ercs_budget": 380000.0,
    "hq_target": 10000000.0,
    "hq_budget": 100000.0,
    "rb_target": 399855305.0,
    "rb_budget": 280000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 99752305.0,
        "budget": 50000.0
      },
      "reg-addis-ababa": {
        "target": 12500000.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 9570000.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 11200000.0,
        "budget": 30000.0
      },
      "reg-south-ethiopia": {
        "target": 10000000.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 5000000.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 11333000.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 200000000.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 6000000.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 5500000.0,
        "budget": 200000.0
      },
      "reg-harar": {
        "target": 1000000.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 10000000.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 4000000.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 14000000.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-1-7",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-1",
    "code": "8.1.7",
    "description": "Increase Mobilization of Resources from Other Sources (Dividend, interst,mileages \u2026)",
    "uom": "ETB",
    "responsibility": "both",
    "department": "Resource Mobilization",
    "activity_description": "Increase Mobilization of Resources from Other Sources (Dividend, interst,mileages \u2026)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 105981616.6,
    "ercs_budget": 43000.0,
    "hq_target": 32000000.0,
    "hq_budget": 0.0,
    "rb_target": 73981616.6,
    "rb_budget": 43000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 16348779.0,
        "budget": 5000.0
      },
      "reg-addis-ababa": {
        "target": 3000000.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 26760100.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 970000.0,
        "budget": 3000.0
      },
      "reg-south-ethiopia": {
        "target": 870000.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 1500000.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 2000000.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 10000000.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1014109.73,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 10458627.87,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 700000.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 100000.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 200000.0,
        "budget": 35000.0
      },
      "reg-moyale": {
        "target": 60000.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-1-8",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-1",
    "code": "8.1.8",
    "description": "increase income from project admin support",
    "uom": "ETB",
    "responsibility": "HQ",
    "department": "Resource Mobilization",
    "activity_description": "increase income from project admin support",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 304000000.0,
    "ercs_budget": 0.0,
    "hq_target": 298000000.0,
    "hq_budget": 0.0,
    "rb_target": 6000000.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 6000000.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-1-9",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-1",
    "code": "8.1.9",
    "description": "increase income from partner support service",
    "uom": "ETB",
    "responsibility": "HQ",
    "department": "Resource Mobilization",
    "activity_description": "increase income from partner support service",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 40732000.0,
    "ercs_budget": 432000.0,
    "hq_target": 38000000.0,
    "hq_budget": 0.0,
    "rb_target": 2732000.0,
    "rb_budget": 432000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 2000000.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 432000.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 300000.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-1-10",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-1",
    "code": "8.1.10",
    "description": "CCDH",
    "uom": "ETB",
    "responsibility": "HQ",
    "department": "Resource Mobilization",
    "activity_description": "CCDH",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 120000000.0,
    "ercs_budget": 79703089.29,
    "hq_target": 120000000.0,
    "hq_budget": 79703089.29,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-1-11",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-1",
    "code": "8.1.11",
    "description": "EDP",
    "uom": "ETB",
    "responsibility": "HQ",
    "department": "Resource Mobilization",
    "activity_description": "EDP",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 189279396.72,
    "ercs_budget": 164693606.36,
    "hq_target": 187279396.72,
    "hq_budget": 162693606.36,
    "rb_target": 2000000.0,
    "rb_budget": 2000000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 2000000.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-1-12",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-1",
    "code": "8.1.12",
    "description": "Income from fright transport",
    "uom": "ETB",
    "responsibility": "HQ",
    "department": "Resource Mobilization",
    "activity_description": "Income from fright transport",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 48000000.0,
    "ercs_budget": 29000000.0,
    "hq_target": 48000000.0,
    "hq_budget": 29000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-1-13",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-1",
    "code": "8.1.13",
    "description": "Income from water drilling service",
    "uom": "ETB",
    "responsibility": "HQ",
    "department": "Resource Mobilization",
    "activity_description": "Income from water drilling service",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 12000000.0,
    "ercs_budget": 7000000.0,
    "hq_target": 12000000.0,
    "hq_budget": 7000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-1-14",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-1",
    "code": "8.1.14",
    "description": "Organize Nation wide Fund Raising campaigns",
    "uom": "# of Campaigns",
    "responsibility": "Both",
    "department": "",
    "activity_description": "Organize Nation wide Fund Raising campaigns",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 1000000.0,
    "hq_target": 1.0,
    "hq_budget": 1000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-1-15",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-1",
    "code": "8.1.15",
    "description": "Allocate disaster fund from the collected total income",
    "uom": "10%",
    "responsibility": "Both",
    "department": "",
    "activity_description": "Allocate disaster fund from the collected total income",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 71642956.34,
    "ercs_budget": 10084610.97,
    "hq_target": 0.0,
    "hq_budget": 8000000.0,
    "rb_target": 71642956.34,
    "rb_budget": 2084610.97,
    "regional_targets": {
      "reg-oromia": {
        "target": 5575076.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 35118880.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 9761735.8,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 9602450.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 3412541.67,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 2065676.9,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 2084610.97,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 4021985.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-2-1",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-2",
    "code": "8.2.1",
    "description": "Increase mobilization of Resources from Donor Funding",
    "uom": "ETB",
    "responsibility": "both",
    "department": "Resource Mobilization",
    "activity_description": "Increase mobilization of Resources from Donor Funding",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 4681453711.2,
    "ercs_budget": 30000000.0,
    "hq_target": 4681453711.2,
    "hq_budget": 30000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-2-2",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-2",
    "code": "8.2.2",
    "description": "Diversify the international donor base through proactive and compelling approaches",
    "uom": "# of new donor",
    "responsibility": "HQ",
    "department": "Resource Mobilization",
    "activity_description": "Diversify the international donor base through proactive and compelling approaches",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 2.0,
    "ercs_budget": 0.0,
    "hq_target": 2.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-2-3",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-2",
    "code": "8.2.3",
    "description": "Develop ready-to-pitch concept notes and proposals",
    "uom": "# of proposals developed",
    "responsibility": "both",
    "department": "Resource Mobilization",
    "activity_description": "Develop ready-to-pitch concept notes and proposals",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 44.0,
    "ercs_budget": 826345.0,
    "hq_target": 10.0,
    "hq_budget": 511345.0,
    "rb_target": 34.0,
    "rb_budget": 315000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 5.0,
        "budget": 125000.0
      },
      "reg-amhara": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 4.0,
        "budget": 50000.0
      },
      "reg-south-ethiopia": {
        "target": 4.0,
        "budget": 40000.0
      },
      "reg-south-west-ethiopia": {
        "target": 3.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 6.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 2.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 1.0,
        "budget": 100000.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-2-4",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-2",
    "code": "8.2.4",
    "description": "Track and manage funding opportunities systematically",
    "uom": "# of new funding opportunities identified",
    "responsibility": "HQ",
    "department": "Resource Mobilization",
    "activity_description": "Track and manage funding opportunities systematically",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 2.0,
    "ercs_budget": 100000.0,
    "hq_target": 2.0,
    "hq_budget": 100000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-2-5",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-2",
    "code": "8.2.5",
    "description": "Estabilish, Maintain an updated donor database and relationship map",
    "uom": "# of donor database up dated",
    "responsibility": "HQ",
    "department": "Resource Mobilization",
    "activity_description": "Estabilish, Maintain an updated donor database and relationship map",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 2000000.0,
    "hq_target": 1.0,
    "hq_budget": 2000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-2-6",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-2",
    "code": "8.2.6",
    "description": "Organize donor visits, roundtables, and presentations",
    "uom": "# of sessions",
    "responsibility": "both",
    "department": "Resource Mobilization",
    "activity_description": "Organize donor visits, roundtables, and presentations",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 8.0,
    "ercs_budget": 452000.0,
    "hq_target": 1.0,
    "hq_budget": 252000.0,
    "rb_target": 7.0,
    "rb_budget": 200000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 2.0,
        "budget": 100000.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 2.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 2.0,
        "budget": 100000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-3-1",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-3",
    "code": "8.3.1",
    "description": "Develop physical assets with public private sectors",
    "uom": "# of phys. Assets developed",
    "responsibility": "both",
    "department": "Resource Mobilization",
    "activity_description": "Develop physical assets with public private sectors",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 5.0,
    "ercs_budget": 8030000.0,
    "hq_target": 1.0,
    "hq_budget": 4000000.0,
    "rb_target": 4.0,
    "rb_budget": 4030000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 1.0,
        "budget": 30000.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 2.0,
        "budget": 2000000.0
      },
      "reg-south-ethiopia": {
        "target": 1.0,
        "budget": 2000000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-3-2",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-3",
    "code": "8.3.2",
    "description": "Construction of Multi- Porpuse Buildings",
    "uom": "# of MPB",
    "responsibility": "both",
    "department": "Resource Mobilization",
    "activity_description": "Construction of Multi- Porpuse Buildings",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 13.0,
    "ercs_budget": 374500000.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 13.0,
    "rb_budget": 374500000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 10.0,
        "budget": 330000000.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 1.0,
        "budget": 40000000.0
      },
      "reg-central-ethiopia": {
        "target": 1.0,
        "budget": 500000.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 4000000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-3-3",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-3",
    "code": "8.3.3",
    "description": "Conduct feasibility study and facilitate new business investment aligned with the Society\u2019s values and mandate",
    "uom": "# of new buisness doc",
    "responsibility": "both",
    "department": "Resource Mobilization",
    "activity_description": "Conduct feasibility study and facilitate new business investment aligned with the Society\u2019s values and mandate",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 13.0,
    "ercs_budget": 6285000.0,
    "hq_target": 2.0,
    "hq_budget": 5000000.0,
    "rb_target": 11.0,
    "rb_budget": 1285000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 1.0,
        "budget": 320000.0
      },
      "reg-addis-ababa": {
        "target": 1.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 4.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 1.0,
        "budget": 40000.0
      },
      "reg-south-ethiopia": {
        "target": 1.0,
        "budget": 700000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 1.0,
        "budget": 50000.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 1.0,
        "budget": 145000.0
      },
      "reg-benishangul-gumuz": {
        "target": 1.0,
        "budget": 30000.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-3-4",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-3",
    "code": "8.3.4",
    "description": "Develop business model for successful management of IGAs;",
    "uom": "# of bus. Model",
    "responsibility": "HQ",
    "department": "Resource Mobilization",
    "activity_description": "Develop business model for successful management of IGAs;",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 2500000.0,
    "hq_target": 1.0,
    "hq_budget": 2500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-3-5",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-3",
    "code": "8.3.5",
    "description": "Expand profitable IGA schemes for sustainable income generation (Pharmacy outlests, Clinics, Eye glass manufacturing\u2026 etc)",
    "uom": "# of expanded IGA",
    "responsibility": "both",
    "department": "Resource Mobilization",
    "activity_description": "Expand profitable IGA schemes for sustainable income generation (Pharmacy outlests, Clinics, Eye glass manufacturing\u2026 etc)",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 8.0,
    "ercs_budget": 64000000.0,
    "hq_target": 1.0,
    "hq_budget": 40000000.0,
    "rb_target": 7.0,
    "rb_budget": 24000000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 4.0,
        "budget": 10000000.0
      },
      "reg-central-ethiopia": {
        "target": 1.0,
        "budget": 5000000.0
      },
      "reg-south-ethiopia": {
        "target": 2.0,
        "budget": 9000000.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-3-6",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-3",
    "code": "8.3.6",
    "description": "Develop & Implment new IGAs schemes (sludge and bore holl (Rig) truk",
    "uom": "# of new IGA scheme",
    "responsibility": "HQ",
    "department": "Resource Mobilization",
    "activity_description": "Develop & Implment new IGAs schemes (sludge and bore holl (Rig) truk",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 2.0,
    "ercs_budget": 30000000.0,
    "hq_target": 2.0,
    "hq_budget": 30000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-3-7",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-3",
    "code": "8.3.7",
    "description": "Diversify Product/service lines of Key IGAs (Clinics & CCDHS) ;",
    "uom": "# of product line",
    "responsibility": "both",
    "department": "Resource Mobilization",
    "activity_description": "Diversify Product/service lines of Key IGAs (Clinics & CCDHS) ;",
    "year": 2019,
    "eligible_region_ids": [
      "reg-oromia",
      "reg-addis-ababa",
      "reg-amhara",
      "reg-central-ethiopia",
      "reg-south-ethiopia",
      "reg-south-west-ethiopia",
      "reg-sidama",
      "reg-tigray",
      "reg-gambella",
      "reg-benishangul-gumuz",
      "reg-harar",
      "reg-dire-dawa",
      "reg-somali",
      "reg-afar",
      "reg-moyale"
    ],
    "eligible_project_ids": [],
    "ercs_target": 6.0,
    "ercs_budget": 3100000.0,
    "hq_target": 5.0,
    "hq_budget": 100000.0,
    "rb_target": 1.0,
    "rb_budget": 3000000.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 1.0,
        "budget": 3000000.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-4-1",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-4",
    "code": "8.4.1",
    "description": "Develop & update important systems and documents including policy, strategy, guidelines and SoPs;",
    "uom": "# of SOP & policy",
    "responsibility": "HQ RM",
    "department": "Resource Mobilization",
    "activity_description": "Develop & update important systems and documents including policy, strategy, guidelines and SoPs;",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 3.0,
    "ercs_budget": 3000000.0,
    "hq_target": 3.0,
    "hq_budget": 3000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-4-2",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-4",
    "code": "8.4.2",
    "description": "Establish an objective accountability framework to be aligned with performance management and continued monitoring.",
    "uom": "# of framework",
    "responsibility": "HQ RM",
    "department": "Resource Mobilization",
    "activity_description": "Establish an objective accountability framework to be aligned with performance management and continued monitoring.",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 0.0,
    "ercs_budget": 0.0,
    "hq_target": 0.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-4-3",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-4",
    "code": "8.4.3",
    "description": "Develop and implement asset usage plan consistent with the internal resource mobilization strategy;",
    "uom": "# of asset usage plan",
    "responsibility": "HQ RM",
    "department": "Resource Mobilization",
    "activity_description": "Develop and implement asset usage plan consistent with the internal resource mobilization strategy;",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 2500000.0,
    "hq_target": 1.0,
    "hq_budget": 2500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-4-4",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-4",
    "code": "8.4.4",
    "description": "Revise, translate, and disseminate Finance Manual",
    "uom": "# of participants",
    "responsibility": "HQ Finance",
    "department": "Finance",
    "activity_description": "Revise, translate, and disseminate Finance Manual",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 54.0,
    "ercs_budget": 1575800.0,
    "hq_target": 54.0,
    "hq_budget": 1575800.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-4-5",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-4",
    "code": "8.4.5",
    "description": "Develop & disseminate Grants Management Manual, and Foreign Exchange",
    "uom": "# of Workshop participants",
    "responsibility": "HQ Finance",
    "department": "Finance",
    "activity_description": "Develop & disseminate Grants Management Manual, and Foreign Exchange",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 54.0,
    "ercs_budget": 765800.0,
    "hq_target": 54.0,
    "hq_budget": 765800.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-4-6",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-4",
    "code": "8.4.6",
    "description": "Conducting  workshop    with  programs to harmonize\n financial and Narrative report",
    "uom": "# of Workshops",
    "responsibility": "HQ Finance",
    "department": "Finance",
    "activity_description": "Conducting  workshop    with  programs to harmonize\n financial and Narrative report",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 134800.0,
    "hq_target": 1.0,
    "hq_budget": 134800.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-4-7",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-4",
    "code": "8.4.7",
    "description": "Conducting    workshop    with Branch Heads  and   \nFinance Admin on 18 external Audit report  findings and  Financial managemnet",
    "uom": "# of Workshops",
    "responsibility": "HQ Finance",
    "department": "Finance",
    "activity_description": "Conducting    workshop    with Branch Heads  and   \nFinance Admin on 18 external Audit report  findings and  Financial managemnet",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 2082200.0,
    "hq_target": 1.0,
    "hq_budget": 2082200.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-4-8",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-4",
    "code": "8.4.8",
    "description": "2018 Regular Accounts  External Audit  Report",
    "uom": "#of audited FR",
    "responsibility": "HQ Finance",
    "department": "Finance",
    "activity_description": "2018 Regular Accounts  External Audit  Report",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 1200000.0,
    "hq_target": 1.0,
    "hq_budget": 1200000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-4-9",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-4",
    "code": "8.4.9",
    "description": "Follow up the branches taking corrective measurement on the external Audit report findings",
    "uom": "#  of Follwed branch",
    "responsibility": "HQ Finance",
    "department": "Finance",
    "activity_description": "Follow up the branches taking corrective measurement on the external Audit report findings",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 56.0,
    "ercs_budget": 0.0,
    "hq_target": 56.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-4-10",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-4",
    "code": "8.4.10",
    "description": "Financial Audit  for 2026 project  Accounts  by the external Audit",
    "uom": "# of Audited FR",
    "responsibility": "HQ Finance",
    "department": "Finance",
    "activity_description": "Financial Audit  for 2026 project  Accounts  by the external Audit",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 30.0,
    "ercs_budget": 1800000.0,
    "hq_target": 30.0,
    "hq_budget": 1800000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-4-11",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-4",
    "code": "8.4.11",
    "description": "Preparing Financial report of projects  Accounts and regular income & expenditure  by Monthly and  quarterly based on MOU",
    "uom": "# of months  report",
    "responsibility": "HQ Finance",
    "department": "Finance",
    "activity_description": "Preparing Financial report of projects  Accounts and regular income & expenditure  by Monthly and  quarterly based on MOU",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 11.0,
    "ercs_budget": 0.0,
    "hq_target": 11.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-4-12",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-4",
    "code": "8.4.12",
    "description": "Sending Debit note to each respective branches  for reconciliation and recording  purpose",
    "uom": "# Debit Note",
    "responsibility": "HQ Finance",
    "department": "Finance",
    "activity_description": "Sending Debit note to each respective branches  for reconciliation and recording  purpose",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 56.0,
    "ercs_budget": 0.0,
    "hq_target": 56.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-4-13",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-4",
    "code": "8.4.13",
    "description": "Record  Approved  budget of  regular accounts of 2019 and inform to each respective departments",
    "uom": "Number",
    "responsibility": "HQ Finance",
    "department": "Finance",
    "activity_description": "Record  Approved  budget of  regular accounts of 2019 and inform to each respective departments",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 0.0,
    "hq_target": 1.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-4-14",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-4",
    "code": "8.4.14",
    "description": "Record  Approved  budget of  Projects  accounts of 2026",
    "uom": "percentage",
    "responsibility": "HQ Finance",
    "department": "Finance",
    "activity_description": "Record  Approved  budget of  Projects  accounts of 2026",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 0.0,
    "hq_target": 100.0,
    "hq_budget": 0.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-4-15",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-4",
    "code": "8.4.15",
    "description": "Roll out SAP to branches and Subscription fee",
    "uom": "# of Branches",
    "responsibility": "HQ Finance",
    "department": "Finance",
    "activity_description": "Roll out SAP to branches and Subscription fee",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 15.0,
    "ercs_budget": 3697500.0,
    "hq_target": 15.0,
    "hq_budget": 3697500.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-4-16",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-4",
    "code": "8.4.16",
    "description": "Additional SAP customization (Asset module, consolidation)",
    "uom": "# of modules implemented",
    "responsibility": "HQ Finance",
    "department": "Finance",
    "activity_description": "Additional SAP customization (Asset module, consolidation)",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 2.0,
    "ercs_budget": 3000000.0,
    "hq_target": 2.0,
    "hq_budget": 3000000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  },
  {
    "id": "na-8-4-17",
    "strategic_priority_id": "sp-8",
    "strategic_objective_id": "so-8-4",
    "code": "8.4.17",
    "description": "Improve documentation system (labelling and filing)",
    "uom": "# labed  equipped",
    "responsibility": "HQ Finance",
    "department": "Finance",
    "activity_description": "Improve documentation system (labelling and filing)",
    "year": 2019,
    "eligible_region_ids": [],
    "eligible_project_ids": [],
    "ercs_target": 1.0,
    "ercs_budget": 1500000.0,
    "hq_target": 1.0,
    "hq_budget": 1500000.0,
    "rb_target": 0.0,
    "rb_budget": 0.0,
    "regional_targets": {
      "reg-oromia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-addis-ababa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-amhara": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-central-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-south-west-ethiopia": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-sidama": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-tigray": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-gambella": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-benishangul-gumuz": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-harar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-dire-dawa": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-somali": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-afar": {
        "target": 0.0,
        "budget": 0.0
      },
      "reg-moyale": {
        "target": 0.0,
        "budget": 0.0
      }
    },
    "project_targets": {}
  }
];

export const INITIAL_REGIONS: Region[] = [
  {
    "id": "reg-oromia",
    "name": "Oromia"
  },
  {
    "id": "reg-addis-ababa",
    "name": "Addis Ababa"
  },
  {
    "id": "reg-amhara",
    "name": "Amhara"
  },
  {
    "id": "reg-central-ethiopia",
    "name": "Central Ethiopia"
  },
  {
    "id": "reg-south-ethiopia",
    "name": "South Ethiopia"
  },
  {
    "id": "reg-south-west-ethiopia",
    "name": "South West Ethiopia"
  },
  {
    "id": "reg-sidama",
    "name": "Sidama"
  },
  {
    "id": "reg-tigray",
    "name": "Tigray"
  },
  {
    "id": "reg-gambella",
    "name": "Gambella"
  },
  {
    "id": "reg-benishangul-gumuz",
    "name": "Benishangul Gumuz"
  },
  {
    "id": "reg-harar",
    "name": "Harar"
  },
  {
    "id": "reg-dire-dawa",
    "name": "Dire Dawa"
  },
  {
    "id": "reg-somali",
    "name": "Somali"
  },
  {
    "id": "reg-afar",
    "name": "Afar"
  },
  {
    "id": "reg-moyale",
    "name": "Moyale Coordination Office"
  }
];

export const INITIAL_ZONES: Zone[] = [
  {
    "id": "zn-or-ars",
    "region_id": "reg-oromia",
    "name": "Arsi Zone"
  },
  {
    "id": "zn-or-bal",
    "region_id": "reg-oromia",
    "name": "Bale Zone"
  },
  {
    "id": "zn-or-bor",
    "region_id": "reg-oromia",
    "name": "Borena Zone"
  },
  {
    "id": "zn-or-bbe",
    "region_id": "reg-oromia",
    "name": "Buno Bedele Zone"
  },
  {
    "id": "zn-or-ebo",
    "region_id": "reg-oromia",
    "name": "East Borena Zone"
  },
  {
    "id": "zn-or-ehr",
    "region_id": "reg-oromia",
    "name": "East Hararghe Zone"
  },
  {
    "id": "zn-or-esh",
    "region_id": "reg-oromia",
    "name": "East Shewa Zone"
  },
  {
    "id": "zn-or-ewe",
    "region_id": "reg-oromia",
    "name": "East Welega Zone"
  },
  {
    "id": "zn-or-guj",
    "region_id": "reg-oromia",
    "name": "Guji Zone"
  },
  {
    "id": "zn-or-hgw",
    "region_id": "reg-oromia",
    "name": "Horo Guduru Welega Zone"
  },
  {
    "id": "zn-aa-bol",
    "region_id": "reg-addis-ababa",
    "name": "Bole Sub-City"
  },
  {
    "id": "zn-aa-kir",
    "region_id": "reg-addis-ababa",
    "name": "Kirkos Sub-City"
  },
  {
    "id": "zn-aa-yek",
    "region_id": "reg-addis-ababa",
    "name": "Yeka Sub-City"
  },
  {
    "id": "zn-aa-ara",
    "region_id": "reg-addis-ababa",
    "name": "Arada Sub-City"
  },
  {
    "id": "zn-aa-lid",
    "region_id": "reg-addis-ababa",
    "name": "Lideta Sub-City"
  },
  {
    "id": "zn-aa-nsl",
    "region_id": "reg-addis-ababa",
    "name": "Nifas Silk-Lafto Sub-City"
  },
  {
    "id": "zn-am-awi",
    "region_id": "reg-amhara",
    "name": "Awi Zone"
  },
  {
    "id": "zn-am-egj",
    "region_id": "reg-amhara",
    "name": "East Gojjam Zone"
  },
  {
    "id": "zn-am-wgj",
    "region_id": "reg-amhara",
    "name": "West Gojjam Zone"
  },
  {
    "id": "zn-am-ngj",
    "region_id": "reg-amhara",
    "name": "North Gojjam Zone"
  },
  {
    "id": "zn-am-ngd",
    "region_id": "reg-amhara",
    "name": "North Gondar Zone"
  },
  {
    "id": "zn-am-cgd",
    "region_id": "reg-amhara",
    "name": "Central Gondar Zone"
  },
  {
    "id": "zn-am-wgd",
    "region_id": "reg-amhara",
    "name": "West Gondar Zone"
  },
  {
    "id": "zn-am-sgd",
    "region_id": "reg-amhara",
    "name": "South Gondar Zone"
  },
  {
    "id": "zn-am-whm",
    "region_id": "reg-amhara",
    "name": "Wag Hemra Zone"
  },
  {
    "id": "zn-am-nwo",
    "region_id": "reg-amhara",
    "name": "North Wollo Zone"
  },
  {
    "id": "zn-ce-gur",
    "region_id": "reg-central-ethiopia",
    "name": "Gurage Zone"
  },
  {
    "id": "zn-ce-slt",
    "region_id": "reg-central-ethiopia",
    "name": "Silte Zone"
  },
  {
    "id": "zn-ce-had",
    "region_id": "reg-central-ethiopia",
    "name": "Hadiya Zone"
  },
  {
    "id": "zn-ce-hal",
    "region_id": "reg-central-ethiopia",
    "name": "Halaba Zone"
  },
  {
    "id": "zn-ce-kem",
    "region_id": "reg-central-ethiopia",
    "name": "Kembata Zone"
  },
  {
    "id": "zn-se-wol",
    "region_id": "reg-south-ethiopia",
    "name": "Wolayita Zone"
  },
  {
    "id": "zn-se-gam",
    "region_id": "reg-south-ethiopia",
    "name": "Gamo Zone"
  },
  {
    "id": "zn-se-gof",
    "region_id": "reg-south-ethiopia",
    "name": "Gofa Zone"
  },
  {
    "id": "zn-se-som",
    "region_id": "reg-south-ethiopia",
    "name": "South Omo Zone"
  },
  {
    "id": "zn-se-kon",
    "region_id": "reg-south-ethiopia",
    "name": "Konso Zone"
  },
  {
    "id": "zn-sw-kef",
    "region_id": "reg-south-west-ethiopia",
    "name": "Keffa Zone"
  },
  {
    "id": "zn-sw-she",
    "region_id": "reg-south-west-ethiopia",
    "name": "Sheka Zone"
  },
  {
    "id": "zn-sw-ben",
    "region_id": "reg-south-west-ethiopia",
    "name": "Bench Sheko Zone"
  },
  {
    "id": "zn-sw-wom",
    "region_id": "reg-south-west-ethiopia",
    "name": "West Omo Zone"
  },
  {
    "id": "zn-sw-daw",
    "region_id": "reg-south-west-ethiopia",
    "name": "Dawro Zone"
  },
  {
    "id": "zn-si-haw",
    "region_id": "reg-sidama",
    "name": "Hawassa City Zone"
  },
  {
    "id": "zn-si-ale",
    "region_id": "reg-sidama",
    "name": "Aleta Chuko Zone"
  },
  {
    "id": "zn-si-dal",
    "region_id": "reg-sidama",
    "name": "Dale Zone"
  },
  {
    "id": "zn-si-won",
    "region_id": "reg-sidama",
    "name": "Wondo Genet Zone"
  },
  {
    "id": "zn-ti-cen",
    "region_id": "reg-tigray",
    "name": "Central Tigray Zone"
  },
  {
    "id": "zn-ti-eas",
    "region_id": "reg-tigray",
    "name": "Eastern Tigray Zone"
  },
  {
    "id": "zn-ti-nwt",
    "region_id": "reg-tigray",
    "name": "Northwestern Tigray Zone"
  },
  {
    "id": "zn-ti-sou",
    "region_id": "reg-tigray",
    "name": "Southern Tigray Zone"
  },
  {
    "id": "zn-ti-wes",
    "region_id": "reg-tigray",
    "name": "Western Tigray Zone"
  },
  {
    "id": "zn-ga-anu",
    "region_id": "reg-gambella",
    "name": "Anuak Zone"
  },
  {
    "id": "zn-ga-nue",
    "region_id": "reg-gambella",
    "name": "Nuer Zone"
  },
  {
    "id": "zn-ga-maj",
    "region_id": "reg-gambella",
    "name": "Majang Zone"
  },
  {
    "id": "zn-ga-ita",
    "region_id": "reg-gambella",
    "name": "Itang Special Woreda"
  },
  {
    "id": "zn-bg-aso",
    "region_id": "reg-benishangul-gumuz",
    "name": "Asosa Zone"
  },
  {
    "id": "zn-bg-kam",
    "region_id": "reg-benishangul-gumuz",
    "name": "Kamashi Zone"
  },
  {
    "id": "zn-bg-met",
    "region_id": "reg-benishangul-gumuz",
    "name": "Metekel Zone"
  },
  {
    "id": "zn-hr-urb",
    "region_id": "reg-harar",
    "name": "Harari Urban Zone"
  },
  {
    "id": "zn-hr-rur",
    "region_id": "reg-harar",
    "name": "Harari Rural Zone"
  },
  {
    "id": "zn-dd-urb",
    "region_id": "reg-dire-dawa",
    "name": "Dire Dawa Urban Administration"
  },
  {
    "id": "zn-dd-rur",
    "region_id": "reg-dire-dawa",
    "name": "Dire Dawa Rural Administration"
  },
  {
    "id": "zn-so-afd",
    "region_id": "reg-somali",
    "name": "Afder Zone"
  },
  {
    "id": "zn-so-dol",
    "region_id": "reg-somali",
    "name": "Dollo Zone"
  },
  {
    "id": "zn-so-ere",
    "region_id": "reg-somali",
    "name": "Erer Zone"
  },
  {
    "id": "zn-so-faf",
    "region_id": "reg-somali",
    "name": "Fafan Zone"
  },
  {
    "id": "zn-so-jar",
    "region_id": "reg-somali",
    "name": "Jarar Zone"
  },
  {
    "id": "zn-so-kor",
    "region_id": "reg-somali",
    "name": "Korahe Zone"
  },
  {
    "id": "zn-so-lib",
    "region_id": "reg-somali",
    "name": "Liben Zone"
  },
  {
    "id": "zn-so-dha",
    "region_id": "reg-somali",
    "name": "Dhawa Zone"
  },
  {
    "id": "zn-so-nog",
    "region_id": "reg-somali",
    "name": "Nogob Zone"
  },
  {
    "id": "zn-so-sha",
    "region_id": "reg-somali",
    "name": "Shabelle Zone"
  },
  {
    "id": "zn-so-sit",
    "region_id": "reg-somali",
    "name": "Sitti Zone"
  },
  {
    "id": "zn-af-awsi",
    "region_id": "reg-afar",
    "name": "Awsi Rasu (Zone 1)"
  },
  {
    "id": "zn-af-kilbet",
    "region_id": "reg-afar",
    "name": "Kilbet Rasu (Zone 2)"
  },
  {
    "id": "zn-af-gabi",
    "region_id": "reg-afar",
    "name": "Gabi Rasu (Zone 3)"
  },
  {
    "id": "zn-af-fanti",
    "region_id": "reg-afar",
    "name": "Fanti Rasu (Zone 4)"
  },
  {
    "id": "zn-af-hari",
    "region_id": "reg-afar",
    "name": "Hari Rasu (Zone 5)"
  },
  {
    "id": "zn-my-cen",
    "region_id": "reg-moyale",
    "name": "Moyale Central Zone"
  },
  {
    "id": "zn-my-bor",
    "region_id": "reg-moyale",
    "name": "Moyale Border Zone"
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    "id": "grc-hacap3",
    "name": "GRC HACAP3 project",
    "description": "GRC HACAP3 project",
    "budget": 386400000,
    "donor": "German Red Cross",
    "target": "48,000 individuals",
    "start_date": "2026-01-01",
    "end_date": "2028-12-31",
    "location": "Benishangul Gumuz (Asosa & Kamashi Zones)",
    "totalBudget": "386,400,000 ETB",
    "startDate": "2026-01-01",
    "endDate": "2028-12-31",
    "currency": "ETB",
    "project_only_activities": [
      {
        "id": "grc-hacap3-nc-4",
        "name": "IEC materials",
        "uom": "Number",
        "target": 750.0,
        "budget": 89000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-5",
        "name": "Hygiene promotion materials",
        "uom": "Number",
        "target": 750.0,
        "budget": 356000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-13",
        "name": "Yearly Volunteers allowances",
        "uom": "# of individuals",
        "target": 7.0,
        "budget": 534000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-15",
        "name": "Training staff / volunteers WASH, shelter, livelihoods",
        "uom": "Individuals",
        "target": 24.0,
        "budget": 267000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-19",
        "name": "ERCS Supply Chain Digitalization and Capacity Strengthening",
        "uom": "System",
        "target": 1.0,
        "budget": 3347468.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-22",
        "name": "Truck hire - Addis / Asosa",
        "uom": "lampsam",
        "target": 1.0,
        "budget": 445000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-23",
        "name": "Transportation - Asosa / field",
        "uom": "lampsam",
        "target": 1.0,
        "budget": 178000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-24",
        "name": "Loading and off loading of materials",
        "uom": "lampsam",
        "target": 1.0,
        "budget": 44500.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-25",
        "name": "Distribution costs - volunteer allowances",
        "uom": "Number",
        "target": 7.0,
        "budget": 89000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-26",
        "name": "Cash Transfer fees - FSPs",
        "uom": "lampsam",
        "target": 1.0,
        "budget": 445000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-27",
        "name": "Project manager Addis",
        "uom": "Number",
        "target": 1.0,
        "budget": 3269860.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-28",
        "name": "Project coordinator Asosa 50%",
        "uom": "Number",
        "target": 1.0,
        "budget": 765934.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-29",
        "name": "Project engineer Asosa",
        "uom": "Number",
        "target": 1.0,
        "budget": 1092386.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-30",
        "name": "Community mobiliser / WASH officer Asosa",
        "uom": "Number",
        "target": 1.0,
        "budget": 875938.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-31",
        "name": "Livelihoods and cash officer Asosa",
        "uom": "Number",
        "target": 1.0,
        "budget": 875938.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-32",
        "name": "CVA officer Addis",
        "uom": "Number",
        "target": 1.0,
        "budget": 2014248.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-33",
        "name": "Finance and admin Coordinator- Addis 50%",
        "uom": "Number",
        "target": 1.0,
        "budget": 1058032.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-34",
        "name": "ERCS Project accountant Addis (50%)",
        "uom": "Number",
        "target": 1.0,
        "budget": 812748.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-35",
        "name": "ERCS Procurement officer Addis",
        "uom": "Number",
        "target": 1.0,
        "budget": 1385730.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-36",
        "name": "Project accountant Asosa 50%",
        "uom": "Number",
        "target": 1.0,
        "budget": 427200.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-37",
        "name": "Field drivers x 2 Asosa",
        "uom": "Number",
        "target": 2.0,
        "budget": 911360.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-38",
        "name": "Log and finance assistant",
        "uom": "Number",
        "target": 1.0,
        "budget": 617838.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-39",
        "name": "PMER officer Addis",
        "uom": "Number",
        "target": 1.0,
        "budget": 2014248.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-40",
        "name": "Local flights",
        "uom": "lampsam",
        "target": 0.0,
        "budget": 534000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-41",
        "name": "Accommodation (delegate and local staff)",
        "uom": "lampsam",
        "target": 0.0,
        "budget": 712000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-42",
        "name": "Per diem - local staff",
        "uom": "lampsam",
        "target": 0.0,
        "budget": 1424000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-43",
        "name": "Kick off workshop",
        "uom": "Number",
        "target": 1.0,
        "budget": 356000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-44",
        "name": "CEA training and cabacity building",
        "uom": "participants",
        "target": 24.0,
        "budget": 89000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-45",
        "name": "Project review workshops",
        "uom": "lampsam",
        "target": 2.0,
        "budget": 1068000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-47",
        "name": "Monitoring",
        "uom": "",
        "target": 0.0,
        "budget": 0.0,
        "raw_code": null
      },
      {
        "id": "grc-hacap3-nc-50",
        "name": "Translation of project documents",
        "uom": "lampsam",
        "target": 1.0,
        "budget": 124600.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-52",
        "name": "Office running costs Asosa",
        "uom": "Branch",
        "target": 1.0,
        "budget": 1886800.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-53",
        "name": "Communication incl. internet Asosa",
        "uom": "Branch",
        "target": 1.0,
        "budget": 267000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-54",
        "name": "Office furniture",
        "uom": "lampsam",
        "target": 1.0,
        "budget": 890000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-55",
        "name": "Postal fees and DHL services",
        "uom": "lampsam",
        "target": 1.0,
        "budget": 17800.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-56",
        "name": "Vehicle insurance Asosa",
        "uom": "lampsam",
        "target": 1.0,
        "budget": 186900.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-57",
        "name": "Fuel and maintenance Asosa",
        "uom": "lampsam",
        "target": 1.0,
        "budget": 2136000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "grc-hacap3-nc-58",
        "name": "Fuel and maintenance Addis",
        "uom": "lampsam",
        "target": 1.0,
        "budget": 213600.0,
        "raw_code": "Not linked with AOP"
      }
    ],
    "totalBeneficiaries": 48000
  },
  {
    "id": "sraps",
    "name": "Strengthening Resilience for Agro-pastoralists (SRAPS)",
    "description": "Strengthening Resilience for Agro-pastoralists (SRAPS)",
    "budget": 1114938,
    "donor": "NLRC",
    "target": "50,000 individuals",
    "start_date": "2025-01-01",
    "end_date": "2026-12-31",
    "location": "Somali (Fafan & Shebelle zones)",
    "totalBudget": "\u20ac1,114,938",
    "startDate": "2025-01-01",
    "endDate": "2026-12-31",
    "currency": "EUR",
    "project_only_activities": [
      {
        "id": "sraps-nc-1",
        "name": "Activity 1.1.1. Undertake reconnaissance and survey for WASH facilities in the target area",
        "uom": "survey",
        "target": 1.0,
        "budget": 5000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-9",
        "name": "Activity 1.1.9. Conduct follow up and support missions",
        "uom": "mission",
        "target": 12.0,
        "budget": 4680.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-16",
        "name": "Activity 2.2.6.Conduct follow up and support",
        "uom": "mission",
        "target": 8.0,
        "budget": 3120.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-19",
        "name": "Activity 3.1.3.Train community  animal health workers (CAHWS) and woreda  livestock experts",
        "uom": "training",
        "target": 50.0,
        "budget": 4000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-24",
        "name": "Activity3.1.8.Support the veterinary services at community leveel through provision veterinary drug(oxytetra, albermexine, albndazole,multi vitamine,sulphadrug,accaricide) and other",
        "uom": "pcs",
        "target": 3.0,
        "budget": 12000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-25",
        "name": "Activity 3.1.9. Follow up and support missions",
        "uom": "mission",
        "target": 12.0,
        "budget": 2400.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-27",
        "name": "Activity 3.2.2.Construction,rehabliatation and management of Waterspreader Weir",
        "uom": "pcs",
        "target": 2.0,
        "budget": 24000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-28",
        "name": "Activity 3.2.3 Conduct follow up and support",
        "uom": "mission",
        "target": 8.0,
        "budget": 2400.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-29",
        "name": "Training in PGI, CEA in WASH, Livelihood and Health  at branch and community levels ((2 Zones , 3 Woredas and 10 commubities)",
        "uom": "training",
        "target": 6.0,
        "budget": 9000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-30",
        "name": "Renovation of Branch Office of ERCS in the region",
        "uom": "pcs",
        "target": 1.0,
        "budget": 18000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-31",
        "name": "Consultation on WASH/Health livelihood  with women, PWD and other vulnerable groups",
        "uom": "Mission s",
        "target": 6.0,
        "budget": 9000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-32",
        "name": "Strenthening PMER systems at Regional, Zonal and Woreda level",
        "uom": "pcs",
        "target": 5.0,
        "budget": 12500.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-33",
        "name": "HQ DRM Unit Manager 50%",
        "uom": "months",
        "target": 12.0,
        "budget": 6000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-34",
        "name": "HQ Project Coordinator 100%",
        "uom": "months",
        "target": 12.0,
        "budget": 9600.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-35",
        "name": "HQ Wash Engineer 50%",
        "uom": "months",
        "target": 12.0,
        "budget": 4800.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-36",
        "name": "HQ PMER Officer 50%",
        "uom": "months",
        "target": 12.0,
        "budget": 4200.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-37",
        "name": "Branch Head 25%",
        "uom": "months",
        "target": 6.0,
        "budget": 1200.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-38",
        "name": "Regional Project Coordinator (25%)",
        "uom": "months",
        "target": 6.0,
        "budget": 1200.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-39",
        "name": "Regional Livelihood and NRM officer (100%)",
        "uom": "months",
        "target": 24.0,
        "budget": 12000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-40",
        "name": "Regional Project accountant 50%",
        "uom": "months",
        "target": 12.0,
        "budget": 3000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-41",
        "name": "Branch Driver 50%",
        "uom": "months",
        "target": 12.0,
        "budget": 1500.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-42",
        "name": "Zonal Branch Head 50%",
        "uom": "months",
        "target": 12.0,
        "budget": 3600.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-43",
        "name": "Field officer (WASH & Health ) (100%)",
        "uom": "months",
        "target": 24.0,
        "budget": 12000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-44",
        "name": "Field officer (Livelihood and NRM) (100%)",
        "uom": "months",
        "target": 24.0,
        "budget": 12000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-45",
        "name": "Project accountant 100%",
        "uom": "months",
        "target": 24.0,
        "budget": 9600.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-46",
        "name": "Branch Driver 100%",
        "uom": "months",
        "target": 24.0,
        "budget": 4800.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-47",
        "name": "Stationary/Comms/ Office costs",
        "uom": "Lump sum",
        "target": 1.0,
        "budget": 4000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-48",
        "name": "Inception Workshop",
        "uom": "Lump sum",
        "target": 1.0,
        "budget": 4300.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-51",
        "name": "Learning and documentation, media engagement, publication, human interest story",
        "uom": "Lump sum",
        "target": 1.0,
        "budget": 4000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-52",
        "name": "ERCS Vehicle(Fuel cost, lubricant and maintenance)",
        "uom": "Months",
        "target": 24.0,
        "budget": 31200.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-53",
        "name": "Project specific Audit",
        "uom": "Lump sum",
        "target": 1.0,
        "budget": 2500.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-54",
        "name": "Furniture for the Shebele Zonal branch office  (table, chairs, printer, photocopie)",
        "uom": "pcs",
        "target": 1.0,
        "budget": 16000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "sraps-nc-55",
        "name": "Laptops",
        "uom": "pcs",
        "target": 8.0,
        "budget": 9600.0,
        "raw_code": "Not linked with AOP"
      }
    ],
    "totalBeneficiaries": 50000
  },
  {
    "id": "stream-ercs",
    "name": "STREAM (ERCS)",
    "description": "STREAM (ERCS)",
    "budget": 210888.59,
    "donor": "NLRC",
    "target": null,
    "start_date": "2025-01-01",
    "end_date": "2026-12-31",
    "location": "South Ethiopia (Wolayta zone)",
    "totalBudget": "\u20ac210,888.59",
    "startDate": "2025-01-01",
    "endDate": "2026-12-31",
    "currency": "EUR",
    "project_only_activities": [
      {
        "id": "stream-ercs-nc-1",
        "name": "Participate in identifying potential NBS funding and implementing organizations at the national and regional levels",
        "uom": "Meetings",
        "target": 2.0,
        "budget": 802.18,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-2",
        "name": "Conduct key infrmant interviews and desk review",
        "uom": "#asessement",
        "target": 2.0,
        "budget": 802.18,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-3",
        "name": "Developing the NbS resource mobilization strategy.",
        "uom": "",
        "target": 0.0,
        "budget": 866.95,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-4",
        "name": "Participating in the process of developing resource mobilization strategies",
        "uom": "Meetings",
        "target": 1.0,
        "budget": 866.95,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-5",
        "name": "Engaging NbS stakeholders to gather inputs on existing funds and funding\u00a0strategy/mechanisms.",
        "uom": "",
        "target": 0.0,
        "budget": 2407.47,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-6",
        "name": "Organise an experience- knowledge sharing meeting with stakeholders",
        "uom": "Meetings",
        "target": 1.0,
        "budget": 2407.47,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-7",
        "name": "Activity 1.2.3. Developing NbS proposals for potential scaling.",
        "uom": "",
        "target": 0.0,
        "budget": 1444.3,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-8",
        "name": "Participate in NBS proposal development",
        "uom": "#assessement",
        "target": 1.0,
        "budget": 1444.3,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-9",
        "name": "Desk Review/ mapping and documentation of existing good NbS practices",
        "uom": "",
        "target": 0.0,
        "budget": 155738.42592,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-10",
        "name": "Conduct desk reviews at national,regional and community level",
        "uom": "#assessement",
        "target": 2.0,
        "budget": 819.76,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-11",
        "name": "Conduct field assessment to identify potentially suitable NbS",
        "uom": "#assessement",
        "target": 2.0,
        "budget": 819.76,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-12",
        "name": "Workshop with identified stakeholders",
        "uom": "workshop",
        "target": 0.0,
        "budget": 1091.78,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-13",
        "name": "Conduct assessments of  Socio-economic system analysis at the Rift Valley River Basin level",
        "uom": "assessment",
        "target": 4.0,
        "budget": 4911.172,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-14",
        "name": "Participate in  Workshop for validation of the findings and selection of the target (micro-)watersheds and communities",
        "uom": "workshop",
        "target": 2.0,
        "budget": 2183.5664,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-15",
        "name": "Co-design NbS project activities with identified communities in (sub-)watersheds",
        "uom": "Meetings",
        "target": 4.0,
        "budget": 2727.60752,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-16",
        "name": "Nursery site development and multi purpose seedling production for two nursery sites",
        "uom": "",
        "target": 0.0,
        "budget": 18363.42,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-17",
        "name": "Seed purchase (forest, forage and fruit trees)",
        "uom": "kg",
        "target": 400.0,
        "budget": 2825.16,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-18",
        "name": "Nursery materials ( polytube tube, sand, compost)",
        "uom": "Lamp sum",
        "target": 0.0,
        "budget": 1765.36,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-20",
        "name": "Daily laborers(30 person*10months*150ETB",
        "uom": "Person day",
        "target": 4800.0,
        "budget": 6356.48,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-22",
        "name": "Training for  project beneficiaries on NBS and livestock management (160 ppl for minmum of 3 training days at each kebele by the agriculture experts from the woreda and DAs-crop,livestock and NARM. Faclitators 10*ppl5days*3800+145ppl*1000+50,000etb fuel and related=400000",
        "uom": "session",
        "target": 2.0,
        "budget": 7416.42,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-23",
        "name": "Purchase Gabion",
        "uom": "Cubic Meter",
        "target": 1100.0,
        "budget": 1941.95,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-24",
        "name": "Purchase stone",
        "uom": "Cubic Meter",
        "target": 1600.0,
        "budget": 2825.16,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-25",
        "name": "Purchase of wood",
        "uom": "Cubic Meter",
        "target": 60.0,
        "budget": 794.64,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-26",
        "name": "Hill side terrace= 5000pd/250pd/km=20km",
        "uom": "km",
        "target": 20.0,
        "budget": 6622.82,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-27",
        "name": "Trenches= One trench/one pd=1000tranch",
        "uom": "no",
        "target": 1000.0,
        "budget": 0.0,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-28",
        "name": "Eyebrow basine -Each should allocate 2 labour construction days to produce 10 eyebrow basins. Where-5 eyebrow*2pd*500hh/kebele*2Kebeles",
        "uom": "",
        "target": 10000.0,
        "budget": 0.0,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-29",
        "name": "Micro basine- Each should allocate 2 labour construction days to produce 10 Micro Basine. Where-5 eyebrow*2pd*500hh/kebele*2Kebeles",
        "uom": "",
        "target": 10000.0,
        "budget": 0.0,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-31",
        "name": "Monitoring and evaluation of activities in identified communities",
        "uom": "per qaurter",
        "target": 8.0,
        "budget": 19985.0,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-32",
        "name": "DIRECT PROGRAMME COSTS",
        "uom": "",
        "target": 0.0,
        "budget": 936451.07592,
        "raw_code": null
      },
      {
        "id": "stream-ercs-nc-34",
        "name": "Participate in review of existing policies related to (Ethiopian) NbS policies and strategies",
        "uom": "meetings",
        "target": 2.0,
        "budget": 1156.56,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-35",
        "name": "Organize training for the NBS technical working groups at district level",
        "uom": "training",
        "target": 1.0,
        "budget": 4621.18,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-36",
        "name": "Workshop with stakeholders to review existing policies",
        "uom": "workshop",
        "target": 1.0,
        "budget": 1091.78,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-37",
        "name": "Staff Costs - Management & Support staff  pro-rated to their contribution to the programme (representation, planning, coordination, logistics, drivers,IT, admin, finance)",
        "uom": "",
        "target": 0.0,
        "budget": 34840.84,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-38",
        "name": "Staff Costs - Management & Support staff  pro-rated to their contribution to the programme (representation, planning, coordination, logistics, drivers,IT, admin, finance)",
        "uom": "",
        "target": 0.0,
        "budget": 36624.213333333326,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-39",
        "name": "Interim project coordinator (ERCS project design coordinator)",
        "uom": "",
        "target": 0.0,
        "budget": 7730.23,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-40",
        "name": "Project Coordinator at HQs(50%)",
        "uom": "months",
        "target": 16.0,
        "budget": 8193.93,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-41",
        "name": "Project Accounatnt at HQ(20%)",
        "uom": "months",
        "target": 16.0,
        "budget": 3108.81,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-42",
        "name": "Project Coordinator at branch+ Zonal Branch Field Officer (50%)",
        "uom": "months",
        "target": 18.0,
        "budget": 8882.3,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-43",
        "name": "Project accountant at branch + Zonal branch cash officer ((50%)",
        "uom": "months",
        "target": 18.0,
        "budget": 6661.73,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-44",
        "name": "DRR Unit Manager(20%)",
        "uom": "",
        "target": 0.0,
        "budget": 4441.15,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-45",
        "name": "Zonal branch Head(20%)",
        "uom": "",
        "target": 0.0,
        "budget": 3552.92,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-46",
        "name": "Zonal branch field officer (50%)",
        "uom": "months",
        "target": 18.0,
        "budget": 4666.666666666666,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-47",
        "name": "Zonal branch cash officer (50%)",
        "uom": "months",
        "target": 18.0,
        "budget": 4666.666666666666,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-48",
        "name": "Zonal branch driver (50%)",
        "uom": "months",
        "target": 18.0,
        "budget": 3552.92,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-49",
        "name": "Operational costs pro-rated to their contribution to the programme (office space, equipment, office supplies, maintenance)",
        "uom": "",
        "target": 0.0,
        "budget": 7394.52,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-50",
        "name": "Office running costs  including laptops stationery , electricity, internet fees, office rent",
        "uom": "lumpsum",
        "target": 1.0,
        "budget": 293116.0,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-51",
        "name": "Fuel, car maintinance/servicies/Mileage",
        "uom": "Description Unit",
        "target": 1.0,
        "budget": 766320.9,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-52",
        "name": "Communication",
        "uom": "Description Unit",
        "target": 1.0,
        "budget": 4078.941679996542,
        "raw_code": "Not liked with AOP"
      },
      {
        "id": "stream-ercs-nc-53",
        "name": "Indirect Programme Support Costs (10%)",
        "uom": "",
        "target": 0.0,
        "budget": 19707.189592,
        "raw_code": "Not liked with AOP"
      }
    ]
  },
  {
    "id": "ethiopia-mfa-dev-2026",
    "name": "Ethiopia Programme MFA DEV 2026",
    "description": "Ethiopia Programme MFA DEV 2026",
    "budget": 2100000,
    "donor": "Finnish Red Cross",
    "target": null,
    "start_date": "2026-01-01",
    "end_date": "2026-12-31",
    "location": "Afar & HQ",
    "totalBudget": "2,100,000 ETB",
    "startDate": "2026-01-01",
    "endDate": "2026-12-31",
    "currency": "ETB",
    "project_only_activities": [
      {
        "id": "ethiopia-mfa-dev-2026-nc-1",
        "name": "Develop Branch Development and Localization Policy",
        "uom": "Documents",
        "target": 1.0,
        "budget": 3055.5555555555557,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-2",
        "name": "Prepare Standard Operating Procedures (SOPs) for Branch Development and Localization",
        "uom": "Documents",
        "target": 1.0,
        "budget": 3000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-3",
        "name": "Finalize and validate Branch Development Framework (2 sessions)",
        "uom": "Session",
        "target": 2.0,
        "budget": 6666.666666666667,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-4",
        "name": "Provide technical support for the development of the Performance Management System through consultancy services",
        "uom": "Documents",
        "target": 1.0,
        "budget": 2777.777777777778,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-5",
        "name": "Conducting feasibility study to assess the viability of salt production as an IGA, initial work",
        "uom": "Assessments",
        "target": 1.0,
        "budget": 19444.444444444445,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-6",
        "name": "Develop detailed business plans and project proposals for two other selected IGA",
        "uom": "Workshops",
        "target": 1.0,
        "budget": 2222.222222222222,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-7",
        "name": "Expand/strengthen the branch IGA scheme",
        "uom": "Lumpsum",
        "target": 1.0,
        "budget": 31111.11111111111,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-8",
        "name": "Conduct BOCA & readiness Check",
        "uom": "Lumpsum",
        "target": 1.0,
        "budget": 2111.1111111111113,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-9",
        "name": "Strengthening local partnership (conduct consultation sessions with CBOs, local government, community members)",
        "uom": "Lumpsum",
        "target": 1.0,
        "budget": 5277.777777777777,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-10",
        "name": "Establish technical collaboration with EMI and MoWE at regional and zonal levels to develop tailored, localized forecasts for three hotspot woredas, including drought, flood, and landslide risk forecasting where relevant.",
        "uom": "Workschop",
        "target": 3.0,
        "budget": 3611.111,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-14",
        "name": "Adapt and strengthen existing monitoring, evaluation, and learning tools for anticipatory action programming, including hazard-specific indicators for landslide early action.",
        "uom": "Lumpsum",
        "target": 1.0,
        "budget": 9166.666666666666,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-16",
        "name": "Support implementation of selected TRC final evaluation recommendations on maintenance and sustainability of community water points in Afar Region",
        "uom": "Lumpsum",
        "target": 1.0,
        "budget": 5510.751277777777,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-17",
        "name": "Assessment, Analysis and Report by an external experst/consultant",
        "uom": "Assessment",
        "target": 1.0,
        "budget": 6835.355555555556,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-18",
        "name": "Validation workshop with PNSs, NS staff and Local Partners",
        "uom": "Workshop",
        "target": 1.0,
        "budget": 3124.733333333333,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-19",
        "name": "National Level workshop with Organisation of People with Disabilities",
        "uom": "Workshop",
        "target": 1.0,
        "budget": 2929.438888888889,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-20",
        "name": "Training on PGI mainstreaming, across sectors, for Regional program staff, Volunteers and partners",
        "uom": "Training Session",
        "target": 1.0,
        "budget": 2441.2,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-21",
        "name": "Review, amend, and validate the ERCS's HR Manual to embed PGI",
        "uom": "Manual",
        "target": 1.0,
        "budget": 2441.2,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-22",
        "name": "Transmission of standard Radio & TV messages/spots on IHL, Fundamental principles, Emblems, Ambulance services and ERCS mandates",
        "uom": "Frequency",
        "target": 40.0,
        "budget": 6666.666666666667,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-23",
        "name": "Celebrating RCRC day out of Addis Ababa",
        "uom": "Event",
        "target": 1.0,
        "budget": 4166.666666666667,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-24",
        "name": "To organize awareness raising and consensus building sessions for potential partners nominated from Federal and Regional Government offices including the house of peoples representatives,",
        "uom": "Session",
        "target": 4.0,
        "budget": 6666.666666666667,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-25",
        "name": "Arrange a two days\u2019 special workshops for board members, ERCS executives, senior management members, i.e. representing NHQ, Regions and zonal branch offices about HDCS (trainers from IFRC and ICRC, \u2026.)",
        "uom": "Session",
        "target": 1.0,
        "budget": 3333.3333333333335,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-26",
        "name": "To conduct special disseminations/awareness raising for community influencers (mainstream media workers, social media managers/You Tubers/, religious leaders, famous individuals/elites/, political party leaders, merchants, \u2026   (professionals \u2013 experts)",
        "uom": "No sessions",
        "target": 1.0,
        "budget": 2777.777777777778,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-27",
        "name": "Organizing SAF trainings for staff and volunteers \u2013  complete package",
        "uom": "No sessions",
        "target": 10.0,
        "budget": 11111.111111111111,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-29",
        "name": "Conducting perception survey in the conflict affected regions of the country",
        "uom": "Survey conducted",
        "target": 1.0,
        "budget": 43333.333333333336,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-30",
        "name": "Conduct follow up, monitoring and supervision",
        "uom": "Monitoring conducted",
        "target": 4.0,
        "budget": 2222.222222222222,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-31",
        "name": "HQ Project Coordinator-100%",
        "uom": "Months",
        "target": 9.0,
        "budget": 4600.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-32",
        "name": "HQ Senior PMER Officer",
        "uom": "Months",
        "target": 9.0,
        "budget": 4600.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-33",
        "name": "HQ Project Senior Accountant",
        "uom": "Months",
        "target": 9.0,
        "budget": 0.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-34",
        "name": "Manager, Localization and NSD Devision",
        "uom": "Months",
        "target": 8.0,
        "budget": 3568.366666666667,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-35",
        "name": "HQ SAF Expert Salary",
        "uom": "Months",
        "target": 7.0,
        "budget": 3577.777777777778,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-36",
        "name": "Branch Project Coordinater",
        "uom": "Months",
        "target": 9.0,
        "budget": 4350.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-37",
        "name": "Branch Field Officer",
        "uom": "Months",
        "target": 9.0,
        "budget": 3283.5974999999994,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-38",
        "name": "Branch Health and Gender Officer",
        "uom": "Months",
        "target": 9.0,
        "budget": 3283.5974999999994,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-39",
        "name": "Branch Project Accountant",
        "uom": "Months",
        "target": 9.0,
        "budget": 3283.5974999999994,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-40",
        "name": "Branch Senior Resource Mobilization Officer",
        "uom": "Months",
        "target": 9.0,
        "budget": 3283.5974999999994,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-41",
        "name": "Branch Project Vehicle Driver",
        "uom": "Months",
        "target": 9.0,
        "budget": 1185.5925,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-42",
        "name": "Salary for Afar Branch Guard",
        "uom": "Months",
        "target": 9.0,
        "budget": 632.1637499999999,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-43",
        "name": "Salary Support for Regional Branch Head of Program and Disaster Risk Management (75%)",
        "uom": "Months",
        "target": 9.0,
        "budget": 3098.1890812499996,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-44",
        "name": "Salary support for Branch Cleaner (75%",
        "uom": "Months",
        "target": 9.0,
        "budget": 423.331125,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-45",
        "name": "Monitoring and follow up from ERCS HQ",
        "uom": "Lumpsum",
        "target": 1.0,
        "budget": 4444.444444444444,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-46",
        "name": "Monitoring from ERCS regional offices",
        "uom": "Lumpsum",
        "target": 1.0,
        "budget": 3333.3333333333335,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-47",
        "name": "Project kick off",
        "uom": "Session",
        "target": 1.0,
        "budget": 4444.444444444444,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-48",
        "name": "Lesons learned Workshop",
        "uom": "Session",
        "target": 1.0,
        "budget": 4444.45,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-49",
        "name": "Audit fees for the year 2026",
        "uom": "Lumpsum",
        "target": 1.0,
        "budget": 666.6666666666666,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-50",
        "name": "Vehicle maintenance, insurance and other running costs in branch for one vehicle (excluding fuel)",
        "uom": "Vehicle",
        "target": 1.0,
        "budget": 4444.444444444444,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-51",
        "name": "Communication for HQ",
        "uom": "Lumpsum",
        "target": 1.0,
        "budget": 373.3333333333333,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-52",
        "name": "Communication for Afar branch office (Mobile card & Land line and internet in Afar)",
        "uom": "Lumpsum",
        "target": 1.0,
        "budget": 680.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-53",
        "name": "Branch office support costs and equipments",
        "uom": "Lumpsum",
        "target": 1.0,
        "budget": 2222.222222222222,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-54",
        "name": "Fuel for branch",
        "uom": "lumpsum",
        "target": 1.0,
        "budget": 2777.777777777778,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-55",
        "name": "Office supplies at HQ",
        "uom": "Lumpsum",
        "target": 1.0,
        "budget": 555.5555555555555,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-56",
        "name": "Bank service fee",
        "uom": "Lumpsum",
        "target": 1.0,
        "budget": 333.3333333333333,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-57",
        "name": "Stationary for regional branch",
        "uom": "Lumpsum",
        "target": 1.0,
        "budget": 2222.222222222222,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-58",
        "name": "Training and workshop for the national society",
        "uom": "Lumpsum",
        "target": 1.0,
        "budget": 18164.769444444446,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "ethiopia-mfa-dev-2026-nc-59",
        "name": "Crisis Modifier for NS",
        "uom": "Lumpsum",
        "target": 1.0,
        "budget": 11111.111111111111,
        "raw_code": "Not linked with AOP"
      }
    ]
  },
  {
    "id": "l4r",
    "name": "Livelihood for Resilience (L4R)",
    "description": "Livelihood for Resilience (L4R)",
    "budget": 549921,
    "donor": "Austrian Red Cross",
    "target": "16,899",
    "start_date": "2026-01-01",
    "end_date": "2027-12-31",
    "location": "Sidama",
    "totalBudget": "\u20ac549,921",
    "startDate": "2026-01-01",
    "endDate": "2027-12-31",
    "currency": "EUR",
    "project_only_activities": [
      {
        "id": "l4r-nc-1",
        "name": "ERCS branch project coordinator  (100%)",
        "uom": "Month",
        "target": 12.0,
        "budget": 3223680.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-2",
        "name": "ERCS Project officers Field based (2 persons, 100%)",
        "uom": "Month",
        "target": 12.0,
        "budget": 4003840.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-3",
        "name": "ERCS branch accountants (75%)",
        "uom": "Month",
        "target": 12.0,
        "budget": 1569888.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-4",
        "name": "ERCS HQ project focal person  (1 person, 100%)",
        "uom": "Month",
        "target": 0.0,
        "budget": 3845600.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-5",
        "name": "ERCS HQ Accountant (50%)",
        "uom": "Month",
        "target": 12.0,
        "budget": 1192320.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-6",
        "name": "ERCS branch operation vehicle driver  (100%)",
        "uom": "Month",
        "target": 12.0,
        "budget": 809600.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-7",
        "name": "ERCS HQ Livelihood and Resilience coordinator r(50%)",
        "uom": "Month",
        "target": 12.0,
        "budget": 2097600.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-8",
        "name": "In-country travel ERCS project team (HQ and branches; flights, land transport, etc.)",
        "uom": "Trips",
        "target": 6.0,
        "budget": 1059840.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-9",
        "name": "Hawassa branch project vehicle rental cost with fuel",
        "uom": "Months",
        "target": 12.0,
        "budget": 5549624.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-10",
        "name": "ERCS project staff equipment (laptop, printer, etc.)",
        "uom": "Laptop",
        "target": 3.0,
        "budget": 828000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-12",
        "name": "Office furniture set",
        "uom": "set",
        "target": 3.0,
        "budget": 542064.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-13",
        "name": "ERCS branch and HQ office costs support (maintenance, communication, water, electricity, stationery, \u2026..)",
        "uom": "Month",
        "target": 12.0,
        "budget": 736000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-14",
        "name": "ERCS partner's bank charges",
        "uom": "tranche",
        "target": 8.0,
        "budget": 29440.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-21",
        "name": "Facilitate and organize a capacity building training for cooperative members informal producer/marketing groups.",
        "uom": "persons",
        "target": 30.0,
        "budget": 1012368.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-27",
        "name": "Conduct SAA orientation for community power holders, religious leaders, and other key stakeholders",
        "uom": "Persons",
        "target": 50.0,
        "budget": 276000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-28",
        "name": "Support communities to develop, implement and evaluate inclusive, accessible community adaptation plans (CAPs)",
        "uom": "Kebele",
        "target": 5.0,
        "budget": 259440.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-30",
        "name": "Establish/revive and train inclusive watershed management committees (WMCs) and watershed users cooperative memebers.",
        "uom": "Persons",
        "target": 39.0,
        "budget": 1197602.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-31",
        "name": "Support and strengthen watershed user cooperatives and linking with potential livelhood options.",
        "uom": "Watershed Cooperative groups",
        "target": 3.0,
        "budget": 552000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-37",
        "name": "Develop small scale accessible irrigation infrastructure for agriculture designed and developed to withstand climate change (Hawassa Zuria only)",
        "uom": "Irrigation scheme",
        "target": 1.0,
        "budget": 1840000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-39",
        "name": "Establish/re-initiate and train school WASH and MHM clubs",
        "uom": "Persons",
        "target": 40.0,
        "budget": 257600.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-40",
        "name": "Strengthen capacities of Woreda and Kebele Administration  Offices around gender-responsive, disability-inclusive, climate-smart local development",
        "uom": "Woredas",
        "target": 1.0,
        "budget": 386400.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-42",
        "name": "Train Woreda-level government  staff inclusive, accessible DRM",
        "uom": "persons",
        "target": 25.0,
        "budget": 690000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-46",
        "name": "Procurment and distribution of soil testing kit to support the early warning system",
        "uom": "testing kit",
        "target": 2.0,
        "budget": 46000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-47",
        "name": "Organize a Participatory Scenario Planning (PSP) workshop",
        "uom": "Persons",
        "target": 15.0,
        "budget": 411240.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-48",
        "name": "Conduct a Gender, Diversity, and Social Norms analysis",
        "uom": "Analyisis",
        "target": 1.0,
        "budget": 736000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-50",
        "name": "Conduct project start-up workshops",
        "uom": "Participants",
        "target": 20.0,
        "budget": 184000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-51",
        "name": "Cross-learning and experience sharing exercise among consortium members",
        "uom": "Persons",
        "target": 32.0,
        "budget": 552000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-52",
        "name": "Document and disseminate innovative methodologies and tools to support gender-responsive, disability-inclusive practices for climate-smart livelihoods, NRM, resilience building, and DRM",
        "uom": "Year",
        "target": 1.0,
        "budget": 462463.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-53",
        "name": "Engage Red Cross volunteers",
        "uom": "Persons",
        "target": 30.0,
        "budget": 690000.0,
        "raw_code": "Not linked with AOP"
      },
      {
        "id": "l4r-nc-56",
        "name": "#REF!",
        "uom": "",
        "target": 0.0,
        "budget": 0.0,
        "raw_code": null
      },
      {
        "id": "l4r-nc-58",
        "name": "Evaluation",
        "uom": "",
        "target": 0.0,
        "budget": 0.0,
        "raw_code": null
      },
      {
        "id": "l4r-nc-59",
        "name": "External evaluation",
        "uom": "",
        "target": 0.0,
        "budget": 0.0,
        "raw_code": null
      },
      {
        "id": "l4r-nc-60",
        "name": "End-evaluation",
        "uom": "",
        "target": 0.0,
        "budget": 0.0,
        "raw_code": null
      },
      {
        "id": "l4r-nc-61",
        "name": "Sub total Evaluation",
        "uom": "",
        "target": 0.0,
        "budget": 0.0,
        "raw_code": null
      },
      {
        "id": "l4r-nc-63",
        "name": "Audit/expenditure verification",
        "uom": "amount up to",
        "target": 0.0,
        "budget": 0.0,
        "raw_code": null
      },
      {
        "id": "l4r-nc-65",
        "name": "Contingency",
        "uom": "",
        "target": 0.0,
        "budget": 0.0,
        "raw_code": null
      },
      {
        "id": "l4r-nc-67",
        "name": "DIRECT COSTS (Pos. 1.-10.)",
        "uom": "",
        "target": 0.0,
        "budget": 0.0,
        "raw_code": null
      },
      {
        "id": "l4r-nc-68",
        "name": "Indirect Costs (% of eligible direct costs, max. 10%  [please specify percentage in the left cell]",
        "uom": "",
        "target": 0.0,
        "budget": 0.0,
        "raw_code": null
      }
    ],
    "totalBeneficiaries": 16899
  },
  {
    "id": "ehppr",
    "name": "Ethiopian Health, Protection, Preparedness and Response in North Gondar and Central Tigray",
    "description": "Ethiopian Health, Protection, Preparedness and Response in North Gondar and Central Tigray",
    "currency": "ETB",
    "project_only_activities": [
      {
        "id": "ehppr-nc-1",
        "name": "Monthly Salary and Benefit_NS Project Coordinator Salary HQ",
        "uom": "Person",
        "target": 1.0,
        "budget": 2199194.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ehppr-nc-2",
        "name": "Monthly Salary and Benefit_NS Project Officer Salary Tigray",
        "uom": "Person",
        "target": 1.0,
        "budget": 916331.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ehppr-nc-3",
        "name": "Monthly Salary and Benefit_NS Project Officer Salary  N/Gonder",
        "uom": "Person",
        "target": 1.0,
        "budget": 916331.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ehppr-nc-4",
        "name": "Monthly Salary and Benefit_NS Finance Officer Salary HQ",
        "uom": "Person",
        "target": 1.0,
        "budget": 916331.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ehppr-nc-5",
        "name": "Office Supplies and stationary_NS Office Operation Cost for Central Tigray",
        "uom": "Lump sum",
        "target": 1.0,
        "budget": 91633.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ehppr-nc-6",
        "name": "Office Supplies and stationary_NS Office Operation Cost for North Gonder",
        "uom": "Lump sum",
        "target": 1.0,
        "budget": 91633.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ehppr-nc-7",
        "name": "Office Supplies and stationary_NS Office Operation Cost for HQ",
        "uom": "Lump sum",
        "target": 1.0,
        "budget": 91633.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ehppr-nc-10",
        "name": "Ambulance running Cost_Maintaince cost for Ten Ambulance for Central Tigray & North Gonder",
        "uom": "Ambulance",
        "target": 10.0,
        "budget": 6276210.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ehppr-nc-11",
        "name": "Ambulance running Cost_Allowance  for volenterrs  (40 persons X 16 USD/month X 12 months)",
        "uom": "Person",
        "target": 40.0,
        "budget": 879678.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ehppr-nc-13",
        "name": "Workshop - Ambulance 6 locations_6 Pilot Ambulance - SOP and Manual Workshop",
        "uom": "Lump sum",
        "target": 1.0,
        "budget": 916331.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ehppr-nc-14",
        "name": "Project Monitoring Field Visit _Perdiem for Staff 6 Pers. x 6 times at Central Tigray_Perdiem for Staff 6 Pers. x 6 days x 6 times",
        "uom": "Lump sum",
        "target": 6.0,
        "budget": 794153.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ehppr-nc-15",
        "name": "Project Monitoring Field Visit _Perdiem for Staff 6 Pers. x 6 times at _Perdiem for Staff 6 Pers. x 6 days x 6 times N/Gonder_Perdiem for Staff 2 Pers. x 5 days x 4 times",
        "uom": "Lump sum",
        "target": 6.0,
        "budget": 794153.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ehppr-nc-16",
        "name": "Project Monitoring Field Visit _Perdiem for Staff 6 Pers. x 6 times at  HEAD quarter _Transportation cost for Traveler CT _Transportation cost for Traveler NG_Transportation cost for Traveler HQ",
        "uom": "Lump sum",
        "target": 6.0,
        "budget": 1252319.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ehppr-nc-17",
        "name": "Bi- Annual review meetings with Branch Offices _Perdiem and acommodation for Staff 30 Pers. x 4 days _Transportation cost for Traveler (30 x 1)_Refresherment for (30 partic. X 2 days x 2)_Venue rental_stationary (30person  x 2 times)_",
        "uom": "Lump sum",
        "target": 1.0,
        "budget": 1555524.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ehppr-nc-22",
        "name": "admin cost",
        "uom": "",
        "target": 0.0,
        "budget": 0.0,
        "raw_code": null
      }
    ],
    "budget": 57621784.0,
    "donor": "NoRC",
    "location": "Amhara & Tigray",
    "totalBudget": "57,621,784 ETB",
    "startDate": "2025-01-01",
    "start_date": "2025-01-01",
    "endDate": "2029-12-31",
    "end_date": "2029-12-31",
    "target": "11,700",
    "totalBeneficiaries": 11700
  },
  {
    "id": "tesfa",
    "name": "TESFA (Transforming Emergency and Recovery Support for Future Advancement in Conflict-Affected Communities, North Wollo)",
    "description": "TESFA (Transforming Emergency and Recovery Support for Future Advancement in Conflict-Affected Communities, North Wollo)",
    "currency": "ETB",
    "project_only_activities": [
      {
        "id": "tesfa-nc-1",
        "name": "ERCS branch project coordinator (2 persons, 50%)",
        "uom": "month",
        "target": 24.0,
        "budget": 3058654.978034899,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-2",
        "name": "ERCS field officers (4 persons, 100%)",
        "uom": "month",
        "target": 96.0,
        "budget": 9299026.863359999,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-3",
        "name": "ERCS accountants (2 persons, 50%)",
        "uom": "month",
        "target": 24.0,
        "budget": 2065549.536,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-4",
        "name": "ERCS HQ project focal person (1 person 50%)",
        "uom": "month",
        "target": 12.0,
        "budget": 1811992.752,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-5",
        "name": "ERCS HQ accountant (1 person, 50%)",
        "uom": "month",
        "target": 12.0,
        "budget": 1175589.3599999999,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-6",
        "name": "ERCS operational vehicle driver for North Wollo and South Wollo (2 persons, 50%)",
        "uom": "month",
        "target": 24.0,
        "budget": 855191.52,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-7",
        "name": "ERCS HQ WASH Engineer (10%)",
        "uom": "month",
        "target": 2.4000000000000004,
        "budget": 362398.5504199319,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-8",
        "name": "ERCS HQ Health and WASH Manager (25%)",
        "uom": "month",
        "target": 6.0,
        "budget": 996603.6239999998,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-9",
        "name": "ERCS HQ EMS Coordinator (30%)",
        "uom": "month",
        "target": 7.199999999999999,
        "budget": 1195930.1471420159,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-10",
        "name": "ERCS HQ Procurement Manager (15%)",
        "uom": "month",
        "target": 3.5999999999999996,
        "budget": 412629.2270517599,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-11",
        "name": "ERCS HQ CVA Coordinator (18%)",
        "uom": "month",
        "target": 4.32,
        "budget": 619197.5232,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-12",
        "name": "ERCS HQ PGI (Protection, Gender, Inclusion) Coordinator (25%)",
        "uom": "month",
        "target": 6.0,
        "budget": 859996.56,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-13",
        "name": "ERCS HQ Mental Health and Psychosocial Support Coordinator (30%)",
        "uom": "month",
        "target": 7.199999999999999,
        "budget": 1049271.552,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-14",
        "name": "Cost recovery for 4 Emergency Medical Technicians (EMTs) or nurses for EMS advanced service to facilitate members fee collection in collaboration with Dissimination, Volunteers and Members (DVM) focal person - pilot for one ambulance per woreda",
        "uom": "month",
        "target": 96.0,
        "budget": 2476800.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-15",
        "name": "In-country travel ERCS project team (HQ and branches; land transport, etc.)",
        "uom": "travel",
        "target": 6.0,
        "budget": 990720.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-16",
        "name": "International flights",
        "uom": "flight",
        "target": 0.0,
        "budget": 0.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-17",
        "name": "South Wollo and North Wollo project vehicle operation costs",
        "uom": "month",
        "target": 24.0,
        "budget": 4128000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-18",
        "name": "Purchase of Laptops for ERCS project staff for North Wollo & South Wollo zonal branches",
        "uom": "Laptop",
        "target": 2.0,
        "budget": 516000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-19",
        "name": "ERCS  woreda branches offices support (basic furnitures and office running ) for four woredas",
        "uom": "branch",
        "target": 4.0,
        "budget": 412800.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-20",
        "name": "ERCS (zonal) branch office costs support (maintenance, communication, water, electricity,\u2026)",
        "uom": "branch",
        "target": 2.0,
        "budget": 533200.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-21",
        "name": "ERCS partner's bank charges",
        "uom": "tranche",
        "target": 8.0,
        "budget": 48160.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-22",
        "name": "Project kick-off and planning meeting in Dessie or Woldiya",
        "uom": "event",
        "target": 1.0,
        "budget": 860000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-23",
        "name": "Project kick-off meeting in the target area with community and IDP representatives (4 events; 1 per Woreda), ten persons per woreda.",
        "uom": "participant",
        "target": 40.0,
        "budget": 286689.60000000003,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-24",
        "name": "Baseline assessment including rapid gender analysis",
        "uom": "survey",
        "target": 1.0,
        "budget": 516000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-25",
        "name": "Final review of the project performance",
        "uom": "survey",
        "target": 1.0,
        "budget": 1720000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-26",
        "name": "Lessons learned / project review and closing workshop",
        "uom": "event",
        "target": 2.0,
        "budget": 860000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-27",
        "name": "Gender-specific and GBV survivor-supportive rapid market assessment & cash feasibility study",
        "uom": "survey",
        "target": 1.0,
        "budget": 172000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-29",
        "name": "Conditional Cash Assistance through Cash for Work (soil and conservation works including physical and biological interventions) for 480 households (3 monthly instalments)",
        "uom": "household",
        "target": 480.0,
        "budget": 15480000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-30",
        "name": "Post distribution Monitoring (PDM) for MPCA",
        "uom": "survey",
        "target": 3.0,
        "budget": 648441.7200000001,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-33",
        "name": "Provision of veterinary medicine to 4 veterinary clinics",
        "uom": "clinic",
        "target": 4.0,
        "budget": 2824900.48,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-34",
        "name": "Support to the resumption of livestock artificial insemination (AI) services in the Borana and Mekdela Woreda Livestock Development Agencies in S-Wollo",
        "uom": "woreda",
        "target": 2.0,
        "budget": 3096000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-37",
        "name": "Support to SHGs to advance to cooperative level",
        "uom": "Self Help Group",
        "target": 4.0,
        "budget": 2408000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-38",
        "name": "Service and partner mapping and strengthening of referral pathway",
        "uom": "mapping exercise",
        "target": 1.0,
        "budget": 158240.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-42",
        "name": "Community outreach campaigns to raise MHPSS and SGBV awareness and address stigma",
        "uom": "session/event",
        "target": 32.0,
        "budget": 1967680.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-43",
        "name": "Inclusive dialogues at the Woreda level with key stakeholders to promote gender equality, mental health, fight SGBV and reduce stigma against SGBV survivors. 15 participants per woreda for one day.",
        "uom": "participant",
        "target": 60.0,
        "budget": 217752.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-47",
        "name": "Establish/strengthen Zonal-level multi-agency SGBV cluster (AoR)",
        "uom": "meeting",
        "target": 8.0,
        "budget": 584800.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-49",
        "name": "Gender-sensitive and inclusive assessments of water supply systems",
        "uom": "survey",
        "target": 2.0,
        "budget": 550400.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-52",
        "name": "Stakeholder workshop on operation and maintenance of water points with water authorities, user committees, community leaders (approx. 40 participants)",
        "uom": "participant",
        "target": 40.0,
        "budget": 290336.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-53",
        "name": "Procurement & distribution of maintenance kits and tools to local water offices and 6 WASHCOs",
        "uom": "kit",
        "target": 6.0,
        "budget": 1032000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-55",
        "name": "Preference assessment on menstrual hygiene management",
        "uom": "survey",
        "target": 1.0,
        "budget": 258000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-57",
        "name": "Training on social behavioral change hygiene practices for 40 health workers, ERCS staff, and volunteers, 10 participants per woreda.",
        "uom": "training",
        "target": 40.0,
        "budget": 725840.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-62",
        "name": "Ambulance attendant allowances for 10 ERCS volunteers in Emergency Medical Service (EMS) sector",
        "uom": "month",
        "target": 240.0,
        "budget": 1548000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-63",
        "name": "Ambulance operation cost support (running and maintenance cost for 4 ambulances)",
        "uom": "month",
        "target": 24.0,
        "budget": 12185856.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-64",
        "name": "Crisis modifier/ Emergency fund (1.2% of the over all budget) - activation with ADA by grant recipient AutRC",
        "uom": "funds",
        "target": 1.0,
        "budget": 0.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-65",
        "name": "Project Visibility materials (t-shirt, cape, keyholder and billboard, video production)",
        "uom": "visibility",
        "target": 1.0,
        "budget": 904204.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "tesfa-nc-66",
        "name": "Audit/expenditure verification",
        "uom": "",
        "target": 0.0,
        "budget": 694192.0,
        "raw_code": null
      },
      {
        "id": "tesfa-nc-67",
        "name": "Total",
        "uom": "",
        "target": 0.0,
        "budget": 173078137.2388086,
        "raw_code": null
      },
      {
        "id": "tesfa-nc-68",
        "name": "Admin",
        "uom": "",
        "target": 0.0,
        "budget": 0.0,
        "raw_code": null
      }
    ],
    "budget": 189200058.61,
    "donor": "AustRC",
    "location": "North Wollo Zone, Amhara",
    "totalBudget": "189,200,058.61 ETB",
    "startDate": "2026-02-01",
    "start_date": "2026-02-01",
    "endDate": "2027-11-30",
    "end_date": "2027-11-30"
  },
  {
    "id": "cidca",
    "name": "CIDCA / GDSSCF-Funded Malaria Prevention & Control Project",
    "description": "CIDCA / GDSSCF-Funded Malaria Prevention & Control Project (Target: 125,000 households)",
    "currency": "ETB",
    "project_only_activities": [
      {
        "id": "cidca-nc-1",
        "name": "1.1.1  Conduct micro-planning and mapping of target communities and schools in high-risk malaria areas",
        "uom": "Workshops / communities mapped",
        "target": 1.0,
        "budget": 6615120.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "cidca-nc-5",
        "name": "1.1.5  Conduct post-distribution monitoring (PDM) of LLIN use at household level",
        "uom": "Households visited",
        "target": 0.0,
        "budget": 441008.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "cidca-nc-6",
        "name": "1.1.6  Document coverage, gaps and lessons learned from prevention campaigns (M&E)",
        "uom": "Reports",
        "target": 1.0,
        "budget": 18575440.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "cidca-nc-7",
        "name": "2.1.1  Map malaria hotspots and establish community-based surveillance (CBS) networks",
        "uom": "Networks / hotspots covered",
        "target": 0.0,
        "budget": 2625048.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "cidca-nc-8",
        "name": "2.1.2  Deploy digital reporting tools (mobile/tablet) for community volunteers and HEWs",
        "uom": "Smartphones (pcs)",
        "target": 250.0,
        "budget": 7875143.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "cidca-nc-10",
        "name": "2.1.4  Print and distribute simplified surveillance case-definition materials",
        "uom": "Materials (pcs)",
        "target": 0.0,
        "budget": 787514.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "cidca-nc-11",
        "name": "2.1.5  Capacitate malaria early warning and preparedness committees",
        "uom": "Committees",
        "target": 0.0,
        "budget": 6562619.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "cidca-nc-12",
        "name": "2.1.6  Train and equip HCWs on digital data entry and reporting",
        "uom": "Desktop computers (pcs)",
        "target": 50.0,
        "budget": 6037609.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "cidca-nc-13",
        "name": "2.1.7  Conduct joint supportive supervision on surveillance/early warning (M&E)",
        "uom": "Supervision visits",
        "target": 0.0,
        "budget": 20177771.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "cidca-nc-14",
        "name": "2.2.1  Revitalize and train malaria Rapid Response Teams (RRTs)",
        "uom": "Teams",
        "target": 0.0,
        "budget": 4158075.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "cidca-nc-15",
        "name": "2.2.2  Deploy RRTs; conduct outbreak investigation and after-action reviews",
        "uom": "Deployments / reviews",
        "target": 0.0,
        "budget": 6237113.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "cidca-nc-16",
        "name": "2.2.3  Pre-position emergency malaria and vector-control supplies",
        "uom": "Locations stocked",
        "target": 0.0,
        "budget": 787514.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "cidca-nc-18",
        "name": "2.2.5  Strengthen referral pathways/coordination (ambulance O&M support)",
        "uom": "Districts",
        "target": 0.0,
        "budget": 25956470.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "cidca-nc-22",
        "name": "3.1.3  Strengthen community-to-facility referral mechanisms",
        "uom": "Facilities / referral sites",
        "target": 0.0,
        "budget": 1312524.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "cidca-nc-23",
        "name": "3.1.4  Conduct on-the-job coaching and supportive supervision (M&E)",
        "uom": "Coaching/supervision visits",
        "target": 0.0,
        "budget": 35144870.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "cidca-nc-24",
        "name": "Maintenance / long-term technical support (cross-cutting)",
        "uom": "Lumpsum",
        "target": 0.0,
        "budget": 71973866.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "cidca-nc-25",
        "name": "Management fee (cross-cutting)",
        "uom": "Lumpsum",
        "target": 0.0,
        "budget": 36024694.0,
        "raw_code": "Not linked to AOP"
      }
    ],
    "budget": 516353942.0,
    "donor": "China Intl. Dev. Cooperation Agency (CIDCA), via GDSSCF",
    "location": "Ethiopia \u2014 high-burden malaria woredas/kebeles",
    "totalBudget": "516,353,942 ETB",
    "startDate": "2026-01-01",
    "start_date": "2026-01-01",
    "endDate": "2026-12-31",
    "end_date": "2026-12-31",
    "target": "125,000 households",
    "totalBeneficiaries": 125000
  },
  {
    "id": "seap",
    "name": "Ethiopian Cholera DREF sEAP",
    "description": "Ethiopian Cholera DREF sEAP",
    "currency": "ETB",
    "project_only_activities": [
      {
        "id": "seap-nc-1",
        "name": "Conduct training for NS and Govt staff on Surveillance and Case Notification (CBS) Implementation -",
        "uom": "Sessions",
        "target": 1.0,
        "budget": 1549158.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "seap-nc-2",
        "name": "Conduct training for NS and Govt staff on Surveillance and Case Notification (CBS) Implementation -",
        "uom": "Sessions",
        "target": 1.0,
        "budget": 1549158.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "seap-nc-3",
        "name": "Develop MoUs with EPHI for cholera specific response activities, data sharing and reporting.",
        "uom": "Sessions",
        "target": 1.0,
        "budget": 154915.80000000002,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "seap-nc-4",
        "name": "Conduct sEAP familiarization workshop with Woreda health office and branch ERCS team and integrate with existing woreda systems. (including developing activation plan, Mapping, WASH/Health resources, stakeholders, and plans to coordinate and Sensitize them using existing coordination mechanisms.)",
        "uom": "Sessions",
        "target": 1.0,
        "budget": 1161868.5,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "seap-nc-5",
        "name": "Conduct sEAP familiarization workshop with Woreda health office and branch ERCS team and integrate with existing woreda systems. (including developing activation plan, Mapping, WASH/Health resources, stakeholders, and plans to coordinate and Sensitize them using existing coordination mechanisms.)",
        "uom": "Sessions",
        "target": 1.0,
        "budget": 1161868.5,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "seap-nc-10",
        "name": "Conduct WASH assessment in specify cholera hotpots Woredas(including effectiveness, preference and availability of water treatment chemicals, costume NFI needs, key messages, and methods of communicating with beneficiaries",
        "uom": "people",
        "target": 30.0,
        "budget": 334618.128,
        "raw_code": null
      },
      {
        "id": "seap-nc-14",
        "name": "Preposition 5000 L water containers (Roto)",
        "uom": "tanker",
        "target": 3.0,
        "budget": 1161868.5,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "seap-nc-15",
        "name": "Procurement of handwashing devices",
        "uom": "facilities",
        "target": 10.0,
        "budget": 309831.60000000003,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "seap-nc-16",
        "name": "IFRC staff salary",
        "uom": "year",
        "target": 1.0,
        "budget": 1986101.9861,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "seap-nc-17",
        "name": "Technical  and operational support readiness (mission)",
        "uom": "year",
        "target": 1.0,
        "budget": 108441.06000000001,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "seap-nc-18",
        "name": "Technical  and operational support readiness (mission)",
        "uom": "year",
        "target": 1.0,
        "budget": 77457.90000000001,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "seap-nc-19",
        "name": "Transport & Vehicles Costs contribution(vehicle lease, running cost,..)",
        "uom": "months",
        "target": 3.0,
        "budget": 540618.4061000001,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "seap-nc-20",
        "name": "Transport & Vehicles Costs contribution(vehicle lease, running cost,..)",
        "uom": "months",
        "target": 3.0,
        "budget": 540618.4061000001,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "seap-nc-21",
        "name": "Salary For  healt expert",
        "uom": "months",
        "target": 12.0,
        "budget": 1459306.8360000001,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "seap-nc-22",
        "name": "Salary For  healt expert",
        "uom": "months",
        "target": 12.0,
        "budget": 1459306.8360000001,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "seap-nc-23",
        "name": "Admin support for the national society (5%)",
        "uom": "year",
        "target": 1.0,
        "budget": 723367.4115,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "seap-nc-24",
        "name": "Admin support for the national society (5%)",
        "uom": "year",
        "target": 1.0,
        "budget": 723367.4115,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "seap-nc-25",
        "name": "",
        "uom": "",
        "target": 0.0,
        "budget": 21390600.873299997,
        "raw_code": null
      }
    ],
    "donor": "IFAC"
  },
  {
    "id": "ec2r-health",
    "name": "EC2R (Health)",
    "description": "EC2R (Health)",
    "currency": "ETB",
    "project_only_activities": [
      {
        "id": "ec2r-health-nc-3",
        "name": "Broadcasting of key  messages  on epedmic  prone disease  health &WaSH through local medias on local languages  (1 local media in each region,  35% of total population will be reached)",
        "uom": "radio  spot",
        "target": 665000.0,
        "budget": 1400000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-6",
        "name": "Safeguarding trainings (induction and refreshers) for staff, volunteers, and leadership at the branch level including dissemination of PSEAH Policy, IEC materials, SoP and tools for case intake, referral, and management, and support reporting and commuity awareness session",
        "uom": "No of trainee",
        "target": 100.0,
        "budget": 4500000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-9",
        "name": "Refresher training for Health Professionals on  epidemics control with the support of the Woreda Health Bureau, targeting the new woreda's needs",
        "uom": "Partcipants",
        "target": 0.0,
        "budget": 6000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-15",
        "name": "Health centre outreach teams support for health service utilization and referral linkage including by HCWs in the catchment health facility to undertake routine outreach service",
        "uom": "Outreach team",
        "target": 0.0,
        "budget": 4000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-16",
        "name": "Train ERCS staff and Volunteers (25 pple per zone) on Incident Management System (IMS) and Emergency Response Framework - 5days training",
        "uom": "Staff & volunteers",
        "target": 0.0,
        "budget": 5000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-17",
        "name": "Operational support the of  EMS, and Health Guideline  program implementation guideline for ERCS /early action protocol",
        "uom": "Staff",
        "target": 0.0,
        "budget": 800000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-18",
        "name": "Volunteer support  costs (professional fee, allowance) to provide technical support to ERCS, 5 days per month for 10 months(40 for Ambulnce \u2026\u2026 2per 1 ambulance",
        "uom": "Volunteers",
        "target": 0.0,
        "budget": 9000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-19",
        "name": "Capacity building /experience sharing  for ERCS staffs, project staffs, and volunteers (local/abroad) on international public health, project management, grant management and related topics - Need based",
        "uom": "Trainings",
        "target": 0.0,
        "budget": 5000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-20",
        "name": "Support supervision and follow-up of health services provided in the previous 20 woredas including addressing gaps such as procurement of additional spare parts, maintenance of equipment/infrastructure, facilitation of exit workshops, and handover activities",
        "uom": "16 Woredas",
        "target": 0.0,
        "budget": 10000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-21",
        "name": "Establish and Train Emergency Response Team (ERT)",
        "uom": "Staff/Vols",
        "target": 0.0,
        "budget": 5000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-23",
        "name": "Office furniture  and equipments for new project staff - new woredas(e.g. computer, office desk, printer, chairs etc.)",
        "uom": "lampsum",
        "target": 0.0,
        "budget": 4000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-24",
        "name": "Salary contribution for ERCS program and support staff (2 HQ,  4 Regions, 10 Zones = # 13 (50% contribution) for 12months",
        "uom": "Month",
        "target": 0.0,
        "budget": 8498312.040000001,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-25",
        "name": "EC2R Programme coordinator  1 HQ (100%)",
        "uom": "Month",
        "target": 0.0,
        "budget": 2300000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-26",
        "name": "Public health officer",
        "uom": "Month",
        "target": 0.0,
        "budget": 1000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-27",
        "name": "Project field officers 10 zones  (100%)",
        "uom": "Month",
        "target": 0.0,
        "budget": 5750000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-28",
        "name": "Ambulance drivers (20 drivers)",
        "uom": "Month",
        "target": 0.0,
        "budget": 3000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-29",
        "name": "EC2R  coordinator  1 HQ (100%)",
        "uom": "Month",
        "target": 0.0,
        "budget": 1200000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-30",
        "name": "Office operation, stationaries, utilities (ERCS HQ, Region, Zone)",
        "uom": "Lumpsum",
        "target": 0.0,
        "budget": 3914640.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-31",
        "name": "Car rent / milage/ fuel/ maintenance (HQ,Region, Zone)",
        "uom": "Month",
        "target": 0.0,
        "budget": 3600000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-32",
        "name": "Communication cost( ,air time ,\u2026\u2026",
        "uom": "Lumpsum",
        "target": 0.0,
        "budget": 14400.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-33",
        "name": "Visibility (T-shirt, Cape, for volunteers/HEWs, banners, etc) for volunteers in 20 woredas",
        "uom": "Woredas",
        "target": 0.0,
        "budget": 1000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-34",
        "name": "Refreshement (Guest,coffee,water\u2026\u2026.",
        "uom": "Lumpsum",
        "target": 0.0,
        "budget": 360000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-35",
        "name": "Audit fee",
        "uom": "External Audit",
        "target": 0.0,
        "budget": 350000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-36",
        "name": "Kick off meeting",
        "uom": "Meeting",
        "target": 0.0,
        "budget": 2000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-37",
        "name": "Joint Monitoring for ERCS HQ every quarter",
        "uom": "Quarters",
        "target": 0.0,
        "budget": 1920000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-38",
        "name": "Joint Monitoring for Regional ERCS branches every quarter",
        "uom": "Quarters",
        "target": 0.0,
        "budget": 4000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-39",
        "name": "Joint Monitoring to Zonal branches every month",
        "uom": "Months",
        "target": 0.0,
        "budget": 6000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-40",
        "name": "Inception and Mid Term Review once/ year at zonal/regional level/HQ",
        "uom": "Quarters",
        "target": 0.0,
        "budget": 8000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-41",
        "name": "End of year review and lessons learned workshop HQ",
        "uom": "Annual",
        "target": 0.0,
        "budget": 3000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-42",
        "name": "Best practice documentation, sharing and lessons learnt/case studies compilation and dissemination at Zonal level",
        "uom": "quarterly",
        "target": 0.0,
        "budget": 520000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-43",
        "name": "Phase end  satisfaction assessment",
        "uom": "Annual",
        "target": 0.0,
        "budget": 1259000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-health-nc-44",
        "name": "",
        "uom": "",
        "target": 0.0,
        "budget": 384387272.73818177,
        "raw_code": null
      },
      {
        "id": "ec2r-health-nc-45",
        "name": "admin cost",
        "uom": "",
        "target": 0.0,
        "budget": 38438727.27381818,
        "raw_code": null
      },
      {
        "id": "ec2r-health-nc-46",
        "name": "",
        "uom": "",
        "target": 0.0,
        "budget": 422826000.01199996,
        "raw_code": null
      }
    ],
    "budget": 2283260700.52,
    "donor": "FCDO",
    "location": "Amhara, Oromia, Tigray",
    "totalBudget": "2,283,260,700.52 ETB",
    "startDate": "2025-04-01",
    "start_date": "2025-04-01",
    "endDate": "2026-03-31",
    "end_date": "2026-03-31"
  },
  {
    "id": "ec2r-cash",
    "name": "EC2R (CASH)",
    "description": "EC2R (CASH)",
    "currency": "ETB",
    "project_only_activities": [
      {
        "id": "ec2r-cash-nc-7",
        "name": "Assessments - (CFRM, Feasibility, delivery mechanism, risk, market (1 assessment per region)",
        "uom": "# of Assessments",
        "target": 6.0,
        "budget": 2280000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-8",
        "name": "Installation of identified CFRM and dissemination to community",
        "uom": "LS",
        "target": 1.0,
        "budget": 632000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-9",
        "name": "Targeting and registration training for volunteers (3 days training for 475 volunteers)",
        "uom": "# of volunteers",
        "target": 475.0,
        "budget": 2137500.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-10",
        "name": "Targeting and complaint handling training for community committees (560 committee mebers for 2 days)",
        "uom": "# of committee members",
        "target": 560.0,
        "budget": 2240000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-11",
        "name": "CVA and digital platform utilization refreshment training for regional and zonal focal persons (22 trainees for 5 days)",
        "uom": "Ls",
        "target": 1.0,
        "budget": 2325000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-12",
        "name": "Project Inception/planning workshop with branch offices and regional and zonal DRM office represenatives- Addis Ababa",
        "uom": "LS",
        "target": 1.0,
        "budget": 1620000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-13",
        "name": "ASsessments - (CFRM, Feasibility, delivery mechanism, risk, market (1 assessment per region)",
        "uom": "# of Assessments",
        "target": 1.0,
        "budget": 3000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-14",
        "name": "Perdiem and accomodation for volunteers (targeting, Registration and PDM) 300 volunteers*25 days)",
        "uom": "# of days",
        "target": 7500.0,
        "budget": 6000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-15",
        "name": "Perdiem and accomodation for HQ project team (Targeting, registration, verification and PDM)",
        "uom": "# of days",
        "target": 510.0,
        "budget": 1938000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-16",
        "name": "Perdiem and accomodation for branch coordinators and drivers (5 staff/region * 6 regions*30 days)",
        "uom": "# of days",
        "target": 900.0,
        "budget": 3420000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-17",
        "name": "Salary for senior CVA officer (HQ) - 100% - 10 months",
        "uom": "months",
        "target": 10.0,
        "budget": 800000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-18",
        "name": "Sallary for zonal branch office project coordinators - 14 coordinators (100%) - 10 months",
        "uom": "months",
        "target": 140.0,
        "budget": 8680000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-19",
        "name": "Sallary for Accountant (HQ) - 100% - 10 months",
        "uom": "months",
        "target": 10.0,
        "budget": 690000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-20",
        "name": "Sallary for Driver (HQ) - 100% - 10",
        "uom": "months",
        "target": 10.0,
        "budget": 368000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-21",
        "name": "sallary contributions for zonal branch office accountants \u2013 14 accountants (50%) - 10 months",
        "uom": "months",
        "target": 140.0,
        "budget": 3500000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-22",
        "name": "sallary contributions for regional branch office coordinators \u2013 6 coordinators (50%) - 10 months",
        "uom": "months",
        "target": 60.0,
        "budget": 2520000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-23",
        "name": "Flights for HQ team (Targeting, registration, verification and PDM)",
        "uom": "ls",
        "target": 1.0,
        "budget": 950000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-24",
        "name": "Flight, perdiem and accomodation costs for ECWG coordination team monitoring visits (4 persons*5 target locations*5 days for each visit)",
        "uom": "ls",
        "target": 1.0,
        "budget": 850000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-25",
        "name": "Mileage for vehicle (6 vehicles * 50 days each)",
        "uom": "# of Days",
        "target": 300.0,
        "budget": 2400000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-26",
        "name": "Fuel and maintenance for vehicles (16 vehicles - 10 vehicles based in zonal offices and 6 regional offices )",
        "uom": "# of vehicles",
        "target": 16.0,
        "budget": 13600000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-27",
        "name": "Distribution cost - Logistics and perdiem for bank tailors",
        "uom": "LS",
        "target": 1.0,
        "budget": 742000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-28",
        "name": "Office supplies at branches",
        "uom": "# of branches",
        "target": 19.0,
        "budget": 2128000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-29",
        "name": "Office supplies for HQ",
        "uom": "Ls",
        "target": 1.0,
        "budget": 425800.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-30",
        "name": "Laptop computers for branch office staff",
        "uom": "Pcs",
        "target": 9.0,
        "budget": 1800000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-cash-nc-31",
        "name": "",
        "uom": "",
        "target": 0.0,
        "budget": 865929400.0,
        "raw_code": null
      },
      {
        "id": "ec2r-cash-nc-32",
        "name": "",
        "uom": "",
        "target": 0.0,
        "budget": 86592940.0,
        "raw_code": null
      },
      {
        "id": "ec2r-cash-nc-33",
        "name": "",
        "uom": "",
        "target": 0.0,
        "budget": 952522340.0,
        "raw_code": null
      }
    ],
    "budget": 952522340.0,
    "donor": "FCDO",
    "location": "Amhara, Oromia, Tigray, BG, Afar, Somali",
    "totalBudget": "952,522,340 ETB",
    "startDate": "2025-04-01",
    "start_date": "2025-04-01",
    "endDate": "2026-03-31",
    "end_date": "2026-03-31"
  },
  {
    "id": "ec2r-wash",
    "name": "EC2R (WASH)",
    "description": "EC2R (WASH)",
    "currency": "ETB",
    "project_only_activities": [
      {
        "id": "ec2r-wash-nc-1",
        "name": "Feasibility study, design, drawings, and BOQ  preparation for water schemes by woreda/zonal/regional office government team.",
        "uom": "# of water schemes Designed",
        "target": 56.0,
        "budget": 896000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-2",
        "name": "Supply and installation of electromechnical system for existing/new spring and / boreholes with/without surface work",
        "uom": "# existing/new water schemes solarized",
        "target": 28.0,
        "budget": 274330421.0519017,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-3",
        "name": "Replacing hand pumps by solar system, constructing storages, distribution line and water points",
        "uom": "# existing hand pumps replaced by solar",
        "target": 14.0,
        "budget": 71400000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-10",
        "name": "HQ  Senior WASH Officer (WASH Engineer) (100%)",
        "uom": "Months",
        "target": 10.0,
        "budget": 1797203.2000000002,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-11",
        "name": "HQ WASH Coordinator",
        "uom": "Months",
        "target": 10.0,
        "budget": 1996892.4,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-12",
        "name": "HQ WASH officer",
        "uom": "Months",
        "target": 10.0,
        "budget": 1297980.0999999999,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-13",
        "name": "HQ PMER Officer 100%",
        "uom": "Months",
        "target": 10.0,
        "budget": 1797203.2000000002,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-14",
        "name": "Salary for contract admin engineer 100%",
        "uom": "Months",
        "target": 10.0,
        "budget": 1797203.2000000002,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-15",
        "name": "Salary support for Admin and operation staff in seven zones and four region  (25%)",
        "uom": "Months",
        "target": 10.0,
        "budget": 2059594.9,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-16",
        "name": "Salary contribution for WASH Engineer - Regional and zonal",
        "uom": "Months",
        "target": 10.0,
        "budget": 9585083.7,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-17",
        "name": "Project coordinator  4 (1 for  each regional branches: Benishangul, Tigray, Oromia and Amhara)",
        "uom": "Months",
        "target": 10.0,
        "budget": 3195027.9,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-18",
        "name": "Salary for HQ and zonal office aacountants",
        "uom": "Months",
        "target": 10.0,
        "budget": 5990677.3,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-19",
        "name": "Salary for HQ Finance manager",
        "uom": "Months",
        "target": 10.0,
        "budget": 1797203.2000000002,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-20",
        "name": "Salary for HQ accountant",
        "uom": "",
        "target": 10.0,
        "budget": 998446.2,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-21",
        "name": "25% Salary contribution for zonal office head",
        "uom": "months",
        "target": 10.0,
        "budget": 1497669.2999999998,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-22",
        "name": "Office consumptions including Stationary/Comms costs",
        "uom": "Lumpsum",
        "target": 10.0,
        "budget": 5000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-23",
        "name": "Vehicles  rent or millage",
        "uom": "Months",
        "target": 10.0,
        "budget": 10000000.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-24",
        "name": "Fuel",
        "uom": "Litter",
        "target": 87763.221,
        "budget": 18763776.649800003,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-25",
        "name": "Supervision and follow up of construction activities by ERCS HQ, region, and zonal team, and government offices",
        "uom": "Ls",
        "target": 1.0,
        "budget": 10423300.0,
        "raw_code": "Not linked to AOP"
      },
      {
        "id": "ec2r-wash-nc-26",
        "name": "",
        "uom": "",
        "target": 0.0,
        "budget": 826432873.1862328,
        "raw_code": null
      },
      {
        "id": "ec2r-wash-nc-27",
        "name": "",
        "uom": "",
        "target": 0.0,
        "budget": 82643287.31862329,
        "raw_code": null
      },
      {
        "id": "ec2r-wash-nc-28",
        "name": "",
        "uom": "",
        "target": 0.0,
        "budget": 909076160.5048561,
        "raw_code": null
      }
    ],
    "budget": 909076160.5,
    "donor": "FCDO",
    "location": "Project Locations:\n 1. Amhara region :East Gojam(Dejen, Awobel), South Wollo(Kalu& Bati), Central Gonder(West esa&East Belesa)\n2. Oromia region : Guji/East Borena(Girja, Gorodola, Arero), East Harage(Kurfa, Chale, &Kombolcha), East Bale(Rayitu, Sawena), West Arsi(Siraro)\n3. Tigray region: South Tigray(Raya Alamata) Easter (Atsbi,, Ceneral (Adet & Yichila Abaragale), \n4. B.Gumuz region:Metekel zone(Pawe, Guba, Bulen, Dibate)\n5. Central Ethiopia: Hadiya(Soro Woreda, and Silte (Luke faka)\n6. Afar: TBD",
    "totalBudget": "909,076,160.50 ETB",
    "startDate": "2026-06-01",
    "start_date": "2026-06-01",
    "endDate": "2027-03-31",
    "end_date": "2027-03-31"
  },
  {
    "id": "wash-localization",
    "name": "WASH Localization",
    "description": "WASH Localization",
    "currency": "ETB",
    "project_only_activities": [
      {
        "id": "wash-localization-nc-1",
        "name": "IT related equipments, furniture etc for WASH Unit\nGashaw not sure who is utilizing this budget",
        "target": 1.0,
        "budget": 178097.808,
        "raw_code": "Not linked to AOP",
        "uom": "Lumbsum"
      },
      {
        "id": "wash-localization-nc-2",
        "name": "Senior WASH Coordinators\nGashaw to deduct 1,5million birr and add to the Surge Training",
        "target": 2.0,
        "budget": 3430000.0,
        "raw_code": "Not linked to AOP",
        "uom": "Person"
      },
      {
        "id": "wash-localization-nc-3",
        "name": "WASH: Contribute to Pilot of Water and Sanitation Services  on a cost recovery basis as part of initial investment towards Developments ERCS Water and Utility Service Provider Unit\nrunning cost for rig and transport services (IGA unit)",
        "target": 12.0,
        "budget": 0.0,
        "raw_code": "Not linked to AOP",
        "uom": "Month"
      },
      {
        "id": "wash-localization-nc-4",
        "name": "WASH: Contribute to strengthening the technical exchange visits skills and knowledge sharing, dissemination, SOP development and validation workshop",
        "target": 2.0,
        "budget": 2279424.0,
        "raw_code": "Not linked to AOP",
        "uom": "number"
      },
      {
        "id": "wash-localization-nc-5",
        "name": "WASH: Create online Training Platforms for WASH Training (including licencing)\nOngoing",
        "target": 1.0,
        "budget": 2049971.48,
        "raw_code": "Not linked to AOP",
        "uom": "plateform"
      },
      {
        "id": "wash-localization-nc-6",
        "name": "WASH: Develop  WASH training equipments and tools  (training kits) for practicals\nOngoing",
        "target": 1.0,
        "budget": 2564352.0,
        "raw_code": "Not linked to AOP",
        "uom": "Lumbsum"
      },
      {
        "id": "wash-localization-nc-7",
        "name": "WASH: Development of SOPs to integrate climate smart WASH technology in all WASH programming (solarisation)\nThe budget will be used for a workshop with multiple stakeholders",
        "target": 1.0,
        "budget": 256435.2,
        "raw_code": "Not linked to AOP",
        "uom": "SOP"
      },
      {
        "id": "wash-localization-nc-8",
        "name": "WASH: Establish and training  of ERCS National Surge for WASH that is regionally represented\nDone in 2025 and plan to have additional training in 2026",
        "target": 25.0,
        "budget": 1575000.0,
        "raw_code": "Not linked to AOP",
        "uom": "partaiapants"
      },
      {
        "id": "wash-localization-nc-9",
        "name": "WASH: Training Modules to be incorporated as part of  courses offered by the  ERCS Training Institute\nConsultant revised the WASH modules and have been validated - these are to be part of what TC uses for WASH trainings",
        "target": 1.0,
        "budget": 997248.0000000001,
        "raw_code": "Not linked to AOP",
        "uom": "Module"
      },
      {
        "id": "wash-localization-nc-10",
        "name": "WASH: Update and orientation of Standard Operating Procedures (SOP) in WASH emergency\nTechnical working group to finalise the SOP\nInvitation to stakeholders for a validation workshop will be organized",
        "target": 1.0,
        "budget": 284928.0,
        "raw_code": "Not linked to AOP",
        "uom": "SOP"
      }
    ],
    "budget": 13007358.68,
    "donor": "Netherlands RC",
    "location": "National level",
    "totalBudget": "13,007,358.68 ETB",
    "startDate": "2024-06-01",
    "start_date": "2024-06-01",
    "endDate": "2026-12-31",
    "end_date": "2026-12-31"
  },
  {
    "id": "akobo",
    "name": "Emergency humanitarian response to the South Sudan population influx in Akobo border areas of Ethiopia and South Sudan",
    "description": "Emergency humanitarian response to the South Sudan population influx in Akobo border areas of Ethiopia and South Sudan (Option A: Seeded as separate project; pending client confirmation to verify potential double-counting with EC2R WASH)",
    "currency": "ETB",
    "project_only_activities": [
      {
        "id": "akobo-nc-1",
        "name": "Training of HEW , ERCS vols & VHLs  eCBHFA (Communty Based Health and First Aid), community-based disease and event surveillance including alert reporting, early warning,  SGBV, MHPSS, PGI and Hygiene promotion in emergency",
        "target": 50.0,
        "budget": 2008423.5,
        "raw_code": "Not linked to AOP",
        "uom": "#people"
      },
      {
        "id": "akobo-nc-5",
        "name": "Health centre outreach teams support for health service utilization and referral linkage including SGBV by HEWs in the catchment health facility to undertake routine outreach service",
        "target": 6.0,
        "budget": 19027170.0,
        "raw_code": "Not linked to AOP",
        "uom": "#months"
      },
      {
        "id": "akobo-nc-13",
        "name": "Joint Monitoring for ERCS HQ every quarter",
        "target": 3.0,
        "budget": 945174.66975,
        "raw_code": "Not linked to AOP",
        "uom": "#visit"
      },
      {
        "id": "akobo-nc-14",
        "name": "Joint Monitoring to Zonal branches every month",
        "target": 9.0,
        "budget": 951358.5,
        "raw_code": "Not linked to AOP",
        "uom": "#visit"
      },
      {
        "id": "akobo-nc-15",
        "name": "Best practice documentation, sharing and lessons learnt/case studies compilation and dissemination",
        "target": 1.0,
        "budget": 211413.0,
        "raw_code": "Not linked to AOP",
        "uom": "Lumpsum"
      },
      {
        "id": "akobo-nc-16",
        "name": "Scaleup community feedback and response mechanism (organize community meetings to provide updates and feedback establish call toll free/Hotline and Community conversation )",
        "target": 6.0,
        "budget": 2917499.4000000004,
        "raw_code": "Not linked to AOP",
        "uom": "#meeting"
      },
      {
        "id": "akobo-nc-17",
        "name": "Salary contribution for ERCS program and support staff (2 HQ & 2 Regional for 9 months)",
        "target": 9.0,
        "budget": 3780698.679,
        "raw_code": "Not linked to AOP",
        "uom": "#months"
      },
      {
        "id": "akobo-nc-18",
        "name": "Car rent / milage/ fuel/ maintenance (HQ,Region, Zone)",
        "target": 1.0,
        "budget": 1289619.3,
        "raw_code": "Not linked to AOP",
        "uom": "lUMPSUM"
      },
      {
        "id": "akobo-nc-19",
        "name": "Visibility (T-shirt, Cape, for volunteers/HEWs, banners, etc) for volunteers in 20 woredas",
        "target": 1.0,
        "budget": 843303.3937636336,
        "raw_code": "Not linked to AOP",
        "uom": "Lumpsum"
      }
    ],
    "budget": 212103859.73,
    "donor": "FCDO",
    "location": "Gambella",
    "totalBudget": "212,103,859.73 ETB",
    "startDate": "2026-06-01",
    "start_date": "2026-06-01",
    "endDate": "2027-03-31",
    "end_date": "2027-03-31"
  },
  {
    "id": "eccmp-malaria",
    "name": "Ethiopia Community Centered Malaria Prevention Initiative (ECCMPI)",
    "description": "Ethiopia Community Centered Malaria Prevention Initiative (ECCMPI)",
    "currency": "ETB",
    "project_only_activities": [
      {
        "id": "eccmp-malaria-nc-1",
        "name": "Conduct micro-planning and mapping of target communities and schools in high-risk malaria areas.",
        "target": 7.0,
        "budget": 6300000.0,
        "raw_code": "not linked with AOP",
        "uom": "#  of region"
      },
      {
        "id": "eccmp-malaria-nc-3",
        "name": "Implement community and school-based social mobilization/sensitisation on malaria prevention and control measures, such as LLINs utilization, environmental management, and early health-seeking behavior",
        "target": 600.0,
        "budget": 58440000.0,
        "raw_code": "not linked with AOP",
        "uom": "# of Persons"
      },
      {
        "id": "eccmp-malaria-nc-5",
        "name": "Conduct post-distribution monitoring on LLIN use at the household level",
        "target": 100.0,
        "budget": 420000.0,
        "raw_code": "not linked with AOP",
        "uom": "#  of region"
      },
      {
        "id": "eccmp-malaria-nc-6",
        "name": "Project technical support, Document coverage, gaps, and lessons learned from malaria prevention campaigns.",
        "target": 7.0,
        "budget": 13690575.0,
        "raw_code": "not linked with AOP",
        "uom": "#  of region"
      },
      {
        "id": "eccmp-malaria-nc-7",
        "name": "Advocacy with senior management and project close-out workshops malaria",
        "target": 80.0,
        "budget": 4000000.0,
        "raw_code": "not linked with AOP",
        "uom": "Number"
      },
      {
        "id": "eccmp-malaria-nc-17",
        "name": "Revitalize and train malaria rapid response teams (RRT) at regional, zone, and district levels.",
        "target": 198.0,
        "budget": 3960000.0,
        "raw_code": "not linked with AOP",
        "uom": "Sessions"
      },
      {
        "id": "eccmp-malaria-nc-18",
        "name": "Support deployment of rapid response teams and conduct outbreak investigation, post-response reviews during malaria alerts or outbreaks.",
        "target": 198.0,
        "budget": 5940000.0,
        "raw_code": "not linked with AOP",
        "uom": "Spots"
      },
      {
        "id": "eccmp-malaria-nc-19",
        "name": "Pre-position emergency malaria ( antimalarial drugs, PPE) and vector control supplies in high-risk and mobile population areas.",
        "target": 50.0,
        "budget": 750000.0,
        "raw_code": "not linked with AOP",
        "uom": "Person"
      },
      {
        "id": "eccmp-malaria-nc-23",
        "name": "Train or refresh healthcare workers (HCWs) and HEWs on iCCM malaria diagnosis, treatment, and referral protocols.",
        "target": 550.0,
        "budget": 11000000.0,
        "raw_code": "not linked with AOP",
        "uom": "Sessions"
      },
      {
        "id": "eccmp-malaria-nc-24",
        "name": "Supply health facilities with malaria commodities (RDTs, anti-malarial drugs, referral forms, job aids).",
        "target": 6550.0,
        "budget": 18750000.0,
        "raw_code": "not linked with AOP",
        "uom": "Number"
      },
      {
        "id": "eccmp-malaria-nc-25",
        "name": "Functionalize and strengthen community-to-facility referral mechanisms, including referral slips and feedback loops. (with engagement of VHLs, printing logbooks,)",
        "target": 250.0,
        "budget": 1250000.0,
        "raw_code": "not linked with AOP",
        "uom": "Lumpsum"
      },
      {
        "id": "eccmp-malaria-nc-28",
        "name": "Establish or strengthen community-led malaria action groups to support preparedness and response.",
        "target": 250.0,
        "budget": 2500000.0,
        "raw_code": "not linked with AOP",
        "uom": "# Groups"
      },
      {
        "id": "eccmp-malaria-nc-29",
        "name": "Conduct regular community dialogues, FGD, and feedback sessions on malaria risks and services with community leaders, religious leaders, women\u2019s groups, youth, and school clubs",
        "target": 1500.0,
        "budget": 3750000.0,
        "raw_code": "BLANK",
        "uom": "botles/1lt"
      },
      {
        "id": "eccmp-malaria-nc-30",
        "name": "Facilitate  community led  malaria prevention RCCE initiatives and serve as links between health services and the community  as well as provide project visibility items",
        "target": 16.0,
        "budget": 24332580.28833592,
        "raw_code": "not linked with AOP",
        "uom": "Number"
      },
      {
        "id": "eccmp-malaria-nc-31",
        "name": "Conduct high-level advocacy and sensitization on malaria prevention and control for leaders, media professionals, social influencers, etc.",
        "target": 400.0,
        "budget": 4560000.0,
        "raw_code": "not linked with AOP",
        "uom": "Person"
      },
      {
        "id": "eccmp-malaria-nc-32",
        "name": "Support malaria-related mass campaigns such as environmental management day, global malaria day, and others",
        "target": 250.0,
        "budget": 29352099.533437014,
        "raw_code": "not linked with AOP",
        "uom": "Person"
      },
      {
        "id": "eccmp-malaria-nc-33",
        "name": "Support the MOH/EPHI on the development/revision, validation and publication of malaria elimination strategic plan",
        "target": 100.0,
        "budget": 2500000.0,
        "raw_code": "not linked with AOP",
        "uom": "Person"
      },
      {
        "id": "eccmp-malaria-nc-34",
        "name": "Collaborate with MOH and EPHI to conduct operational research on the feasibility of innovative technologies such as next-generation photovoltaic lamps",
        "target": 1.0,
        "budget": 5000000.0,
        "raw_code": "not linked with AOP"
      },
      {
        "id": "eccmp-malaria-nc-35",
        "name": "Collaborate with MOH and EPHI to conduct operational research on the feasibility of innovative technologies on mRDTs",
        "target": 1.0,
        "budget": 5000000.0,
        "raw_code": "not linked with AOP"
      },
      {
        "id": "eccmp-malaria-nc-36",
        "name": "Procure and distribute next-generation photovoltaic mosquito control lumps for the targeted rural community",
        "target": 3750.0,
        "budget": 16875000.0,
        "raw_code": "not linked with AOP"
      },
      {
        "id": "eccmp-malaria-nc-37",
        "name": "Conduct project innovation oversights and  post-distribution household follow-up visits to monitor next-generation photovoltaic mosquito control lamps.",
        "target": 10.0,
        "budget": 1000000.0,
        "raw_code": "not linked with AOP"
      },
      {
        "id": "eccmp-malaria-nc-38",
        "name": "Participate in  different platforms in  international and national (experience sharing, training, workshop, conferences)",
        "target": 8.0,
        "budget": 4000000.0,
        "raw_code": "not linked with AOP"
      },
      {
        "id": "eccmp-malaria-nc-39",
        "name": "Conduct baseline and endline survey and routine monitoring in the project implementation areas",
        "target": 2.0,
        "budget": 16760000.0,
        "raw_code": "BLANK"
      },
      {
        "id": "eccmp-malaria-nc-40",
        "name": "NS Total",
        "target": 0.0,
        "budget": 0.0,
        "raw_code": "BLANK"
      },
      {
        "id": "eccmp-malaria-nc-41",
        "name": "TOTAL OPERATIONAL SUPPORT",
        "target": 0.0,
        "budget": 0.0,
        "raw_code": "BLANK"
      },
      {
        "id": "eccmp-malaria-nc-42",
        "name": "NS Effective project implemenation",
        "target": 0.0,
        "budget": 1680000.0,
        "raw_code": "BLANK"
      },
      {
        "id": "eccmp-malaria-nc-43",
        "name": "Project accountant at zonal offices (50%)",
        "target": 0.0,
        "budget": 0.0,
        "raw_code": "BLANK"
      },
      {
        "id": "eccmp-malaria-nc-44",
        "name": "ERCS HQ Health and WASH Manager (50%)",
        "target": 1.0,
        "budget": 1200000.0,
        "raw_code": "BLANK"
      },
      {
        "id": "eccmp-malaria-nc-45",
        "name": "ERCS HQ Procurement Officer (25%)",
        "target": 1.0,
        "budget": 480000.0,
        "raw_code": "BLANK"
      },
      {
        "id": "eccmp-malaria-nc-46",
        "name": "",
        "target": 4.0,
        "budget": 15552099.533437014,
        "raw_code": "BLANK"
      },
      {
        "id": "eccmp-malaria-nc-47",
        "name": "A/Regional  ofiice technical staff",
        "target": 24.0,
        "budget": 170820.0,
        "raw_code": "BLANK"
      }
    ],
    "budget": 63399363.0,
    "donor": "IFRC",
    "location": "\u2022 Afar region: Amibara, Assaita, Dubti\n\u2022 Amhara region: Abergele, Telemt, Wegera woredas\n\u2022 Oromia region: Berbere, Gelana, Goro Bale, Moyale woredas, Gursum\n\u2022 Somali region: Gursum, Erer, Hudet, Kelafo, Moyale (Somali), Dolo Ado woredas\n\u2022 South Ethiopia region: Dasenech woredas\n\u2022 Tigray region: Dega Temben, Tahtay Adiyabo woredas",
    "totalBudget": "63,399,363 ETB",
    "startDate": "2026-01-01",
    "start_date": "2026-01-01",
    "endDate": "2028-12-31",
    "end_date": "2028-12-31",
    "target": "5,000,000",
    "totalBeneficiaries": 5000000
  },
  {
    "id": "prepare",
    "name": "Regional Preparedness for Pandemic Response (PREPARE)",
    "description": "Regional Preparedness for Pandemic Response (PREPARE)",
    "currency": "ETB",
    "project_only_activities": [
      {
        "id": "prepare-nc-1",
        "name": "Establish and operationalize cross-border surveillance teams in targeted areas by engaging relevant One Health actors to strengthen multisectoral coordination, early warning systems, disease surveillance, and timely response to epidemic- and pandemic-prone diseases, with seven members assigned to each team.",
        "target": 8.0,
        "budget": 1912000.0,
        "raw_code": "BLANK",
        "uom": "Team"
      },
      {
        "id": "prepare-nc-2",
        "name": "Conduct Epidemic Preparedness and Response in Communities (EPiC) training for cross-border One Health actors to strengthen multisectoral collaboration in the prevention, early detection, reporting, and control of zoonotic diseases.",
        "target": 40.0,
        "budget": 2164000.0,
        "raw_code": "BLANK",
        "uom": "Persons"
      },
      {
        "id": "prepare-nc-3",
        "name": "Provide ToT on Cross-Border Community-Based Surveillance (CBS) and RCCE (One Health) for One Health Actors from Human Health, Animal Health, Environment Agency, Immigration and ERCS",
        "target": 40.0,
        "budget": 2164000.0,
        "raw_code": "BLANK",
        "uom": "Persons"
      },
      {
        "id": "prepare-nc-4",
        "name": "Conduct cascading training on CBS and RCCE for community volunteers at the seven targeted PoEs to strengthen community-level surveillance, early detection, awareness, and preparedness for epidemic and pandemic threats.",
        "target": 8.0,
        "budget": 10584000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "prepare-nc-5",
        "name": "Deploy trained community volunteers in targeted cross-border areas to conduct traveler screening, CBS, house-to-house visits, community sensitization, and awareness-raising sessions on epidemic- and pandemic-prone diseases to strengthen community preparedness, early detection, prevention, and response.",
        "target": 180.0,
        "budget": 10368000.0,
        "raw_code": "BLANK",
        "uom": "Persons"
      },
      {
        "id": "prepare-nc-6",
        "name": "Identifying, mapping, establishing, and orienting a one health stakeholders and partners committee working at/or with PoEs, regions, and the national level",
        "target": 8.0,
        "budget": 1656000.0,
        "raw_code": "BLANK",
        "uom": "Number"
      },
      {
        "id": "prepare-nc-7",
        "name": "Conduct bi-annual cross-border consultative/coordination  meeting with One Health actors (mapped stakeholders and partners) on cross-border engagement of active PHE",
        "target": 8.0,
        "budget": 6672000.0,
        "raw_code": "not linked with AOP",
        "uom": "Session"
      },
      {
        "id": "prepare-nc-8",
        "name": "Strengthen the linkage of PoEs Early Warning and action to the existing national system and protocol based on PoEs capacity assessment and analysis and community insights",
        "target": 8.0,
        "budget": 6600000.0,
        "raw_code": "not linked with AOP",
        "uom": "Number"
      },
      {
        "id": "prepare-nc-9",
        "name": "Support regular, timely, accurate, and trusted data collection in communities and targeted cross-border on active disease outbreaks",
        "target": 8.0,
        "budget": 0.0,
        "raw_code": "not linked with AOP",
        "uom": "Branches"
      },
      {
        "id": "prepare-nc-10",
        "name": "Procure a Montarbo for social and community mobilization at POEs and the surrounding community for awareness creation",
        "target": 9.0,
        "budget": 900000.0,
        "raw_code": "not linked with AOP",
        "uom": "Number"
      },
      {
        "id": "prepare-nc-11",
        "name": "Conduct Quarterly community-based awareness campaigns on epidemic/pandemic prevention, early warning signs, and protective behaviors through community dialogues, media, and outreach sessions.",
        "target": 8.0,
        "budget": 1000000.0,
        "raw_code": "not linked with AOP",
        "uom": "Session"
      },
      {
        "id": "prepare-nc-12",
        "name": "Establish and strengthen community feedback and rumor-tracking mechanisms to identify misinformation, community concerns, and behavioral barriers during public health emergencies.",
        "target": 8.0,
        "budget": 800000.0,
        "raw_code": "not linked with AOP",
        "uom": "Number"
      },
      {
        "id": "prepare-nc-13",
        "name": "Train community volunteers, health extension workers, and local leaders on Risk Communication and Community Engagement (RCCE) approaches, interpersonal communication, and emergency response messaging.",
        "target": 8.0,
        "budget": 4560000.0,
        "raw_code": "not linked with AOP",
        "uom": "Person"
      },
      {
        "id": "prepare-nc-14",
        "name": "Revise and disseminate culturally appropriate Information, Education, and Communication (IEC) materials on epidemic preparedness and response in local languages based on the context through multiple communication channels.",
        "target": 8.0,
        "budget": 4000000.0,
        "raw_code": "not linked with AOP",
        "uom": "Branches"
      },
      {
        "id": "prepare-nc-15",
        "name": "Conduct radio sessions on risk communication using local media (TV, radio) by a technical expert based on the context of the epidemic and pandemic",
        "target": 6.0,
        "budget": 3600000.0,
        "raw_code": "not linked with AOP",
        "uom": "Annually"
      },
      {
        "id": "prepare-nc-16",
        "name": "Facilitate regular/quarterly one-health actor and multi-stakeholder coordination meetings involving communities, health authorities, and partners to strengthen trust, preparedness, and community participation in outbreak response.",
        "target": 8.0,
        "budget": 2000000.0,
        "raw_code": "not linked with AOP",
        "uom": "Session"
      },
      {
        "id": "prepare-nc-17",
        "name": "Provide refresher training for RRT from cross-border areas on diseases outbreac detection and investigation within the 7-1-7 principles",
        "target": 8.0,
        "budget": 1752000.0,
        "raw_code": "not linked with AOP",
        "uom": "Persons"
      },
      {
        "id": "prepare-nc-18",
        "name": "Provide cascading training/orientation for one health managers and border officials on mobility and epidemic & pandemic preparedness  in cross-border areas",
        "target": 8.0,
        "budget": 7840000.0,
        "raw_code": "not linked with AOP",
        "uom": "Persons"
      },
      {
        "id": "prepare-nc-19",
        "name": "Conduct a comprehensive mapping and capacity assessment of cross-border community stakeholders, including workforce, border agents, and community systems (structures and actors), to enhance their engagement and strengthen existing systems, with a focus on addressing active outbreaks such as Mpox and Marburg.",
        "target": 4.0,
        "budget": 2196000.0,
        "raw_code": "not linked with AOP",
        "uom": "PoEs"
      },
      {
        "id": "prepare-nc-20",
        "name": "Support development and use of cross border two-way community feedback mechanisms to collect, analyze, visualize and act on community insights to inform effective cross border preparedness and response programming (with  focus on community concerns, questions, beliefs and rumors) with focus on active outbreaks including Mpox, Marburg, and othe diseaseoutbreaks",
        "target": 8.0,
        "budget": 4000000.0,
        "raw_code": "not linked with AOP",
        "uom": "Number"
      },
      {
        "id": "prepare-nc-21",
        "name": "Facilitate branding material (flyers/banners) are designed and printed, and media mobilization for the project launching, trainings, meetings and procurement milestones with focus on spotlighting Mpox, Marburg, and othe diseaseoutbreaks",
        "target": 1000.0,
        "budget": 1500000.0,
        "raw_code": "not linked with AOP",
        "uom": "Number"
      },
      {
        "id": "prepare-nc-22",
        "name": "Establish and operationalise TWG/Community of Practice across thematic areas covered by the PPR programme (namely surveillance, laboratory, IPC/WASH, workforce and community-led approaches/RCCE) in all targeted cross-border areas",
        "target": 8.0,
        "budget": 800000.0,
        "raw_code": "not linked with AOP",
        "uom": "Number"
      },
      {
        "id": "prepare-nc-23",
        "name": "Participate in international/national peer-to-peer learning events (and attend Scientific conferences) that incorporate one health for PPR and perception surveys to measure cross-learning adoption.",
        "target": 1.0,
        "budget": 1460000.0,
        "raw_code": "not linked with AOP",
        "uom": "Sessions"
      },
      {
        "id": "prepare-nc-24",
        "name": "Facilitate customization of national one health committees TOR and coordination action plans",
        "target": 8.0,
        "budget": 1660000.0,
        "raw_code": "not linked with AOP",
        "uom": "Number"
      },
      {
        "id": "prepare-nc-25",
        "name": "Conduct stakeholder analysis, Develop TOR and Organize validation workshop with stakeholders at regional level",
        "target": 3.0,
        "budget": 2313000.0,
        "raw_code": "not linked with AOP",
        "uom": "Sessions"
      },
      {
        "id": "prepare-nc-26",
        "name": "Disseminate key messages on pandemic and epidemic preparedness and response through TV and radio spots in the local languages of the target regions to raise community awareness and promote preventive actions",
        "target": 8.0,
        "budget": 6000000.0,
        "raw_code": "not linked with AOP",
        "uom": "Spots"
      },
      {
        "id": "prepare-nc-27",
        "name": "Conduct PHEM ToT at the national level for PHEM Officers to cascade the basic training for their respective region and cross-border OH actors",
        "target": 30.0,
        "budget": 1773000.0,
        "raw_code": "not linked with AOP",
        "uom": "Person"
      },
      {
        "id": "prepare-nc-28",
        "name": "Provide basic PHEM training for health facility PHEM officers actors from targeted cross-border areas",
        "target": 30.0,
        "budget": 8211000.0,
        "raw_code": "not linked with AOP",
        "uom": "Persons"
      },
      {
        "id": "prepare-nc-29",
        "name": "Conduct training to the project teams on the project management cycle, M&E tool customization, utilization,  and reporting system.",
        "target": 8.0,
        "budget": 1046400.0,
        "raw_code": "not linked with AOP",
        "uom": "Persons"
      },
      {
        "id": "prepare-nc-30",
        "name": "Conduct a kick-off meeting (launching) at the national level and the regional branch office level",
        "target": 1.0,
        "budget": 1056000.0,
        "raw_code": "not linked with AOP",
        "uom": "Session"
      },
      {
        "id": "prepare-nc-31",
        "name": "Conduct project close-out meeting (Phase out) and sustainability strategy at the national level",
        "target": 1.0,
        "budget": 1256000.0,
        "raw_code": "not linked with AOP",
        "uom": "Session"
      },
      {
        "id": "prepare-nc-32",
        "name": "Conduct a performance review meeting engaging stakeholders at the regional level for targated cross-border areas",
        "target": 8.0,
        "budget": 12816000.0,
        "raw_code": "not linked with AOP",
        "uom": "Sessions"
      },
      {
        "id": "prepare-nc-33",
        "name": "Conduct quarterly JSS in targeted cross-border areas on the cross-border workforce, including the community workforce, using a standard checklist by the OH actors lead by ERCS",
        "target": 6.0,
        "budget": 9120000.0,
        "raw_code": "not linked with AOP",
        "uom": "Sessions"
      },
      {
        "id": "prepare-nc-34",
        "name": "Vehicle mileage for project support in the targated branch office and cross-border areas",
        "target": 9.0,
        "budget": 10800000.0,
        "raw_code": "BLANK",
        "uom": "Number"
      },
      {
        "id": "prepare-nc-35",
        "name": "Fuel cost for the monitoring of project activities in the cross-border areas",
        "target": 9.0,
        "budget": 10854000.0,
        "raw_code": "BLANK",
        "uom": "Number"
      },
      {
        "id": "prepare-nc-36",
        "name": "Procurement of office stationery for project implementation",
        "target": 9.0,
        "budget": 3600000.0,
        "raw_code": "BLANK",
        "uom": "Assorted"
      },
      {
        "id": "prepare-nc-37",
        "name": "Procure PPE and emergency response materials for outbreak response teams.",
        "target": 8.0,
        "budget": 4000000.0,
        "raw_code": "BLANK",
        "uom": "Lumpsum"
      },
      {
        "id": "prepare-nc-38",
        "name": "Chairs -Swiver ergonimic",
        "target": 4.0,
        "budget": 100000.0,
        "raw_code": "BLANK",
        "uom": "Number"
      },
      {
        "id": "prepare-nc-39",
        "name": "Guest chairs",
        "target": 4.0,
        "budget": 208000.0,
        "raw_code": "BLANK",
        "uom": "Number"
      },
      {
        "id": "prepare-nc-40",
        "name": "File cabin",
        "target": 4.0,
        "budget": 200000.0,
        "raw_code": "BLANK",
        "uom": "Number"
      },
      {
        "id": "prepare-nc-41",
        "name": "Laptop",
        "target": 2.0,
        "budget": 350000.0,
        "raw_code": "BLANK",
        "uom": "Number"
      },
      {
        "id": "prepare-nc-42",
        "name": "Tablets (smart phones)",
        "target": 3.0,
        "budget": 300000.0,
        "raw_code": "BLANK",
        "uom": "Number"
      },
      {
        "id": "prepare-nc-43",
        "name": "Internet Router & Modem",
        "target": 3.0,
        "budget": 30000.0,
        "raw_code": "BLANK",
        "uom": "Number"
      },
      {
        "id": "prepare-nc-44",
        "name": "average internet package",
        "target": 8.0,
        "budget": 240000.0,
        "raw_code": "BLANK",
        "uom": "Annually"
      },
      {
        "id": "prepare-nc-45",
        "name": "Disinfectants - chlorine",
        "target": 8.0,
        "budget": 80000.0,
        "raw_code": "BLANK",
        "uom": "Gallons/5lt"
      },
      {
        "id": "prepare-nc-46",
        "name": "Water stations for handwashing",
        "target": 3.0,
        "budget": 90000.0,
        "raw_code": "BLANK",
        "uom": "Set"
      },
      {
        "id": "prepare-nc-47",
        "name": "Soap - liquide",
        "target": 8.0,
        "budget": 32000.0,
        "raw_code": "BLANK",
        "uom": "Gallon 5 lts"
      },
      {
        "id": "prepare-nc-48",
        "name": "Hand sanitizers (alcohol-based)",
        "target": 8.0,
        "budget": 32000.0,
        "raw_code": "BLANK",
        "uom": "botles/1lt"
      },
      {
        "id": "prepare-nc-49",
        "name": "Procure a Red Cross-branded vest for staff and volunteers to visibility",
        "target": 180.0,
        "budget": 360000.0,
        "raw_code": "BLANK",
        "uom": "Number"
      },
      {
        "id": "prepare-nc-50",
        "name": "Salary for project coordinator (HQ),PH 100%",
        "target": 1.0,
        "budget": 2880000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "prepare-nc-51",
        "name": "Salary for RCCE/CEA/ coordinator (HQ), 100%",
        "target": 1.0,
        "budget": 2160000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "prepare-nc-52",
        "name": "Salary for project accountant (HQ), 50%",
        "target": 1.0,
        "budget": 720000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "prepare-nc-53",
        "name": "Salary for PMER Officer (HQ), 100%",
        "target": 1.0,
        "budget": 1800000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "prepare-nc-54",
        "name": "Salary for Program head (HQ), 25%",
        "target": 1.0,
        "budget": 900000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "prepare-nc-55",
        "name": "Salary for project coordinator (6 branch offices), 100%",
        "target": 6.0,
        "budget": 8640000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "prepare-nc-56",
        "name": "Salary for project accountant (6 Branch offices), 50%",
        "target": 6.0,
        "budget": 3240000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "prepare-nc-57",
        "name": "Salary for Branch head (6 Branch offices), 25%",
        "target": 6.0,
        "budget": 1620000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      }
    ],
    "budget": 21907600.0,
    "donor": "IFRC",
    "location": "Amhara, Oromia, Gambela, Somali, Afar, Benishangul",
    "totalBudget": "21,907,600 ETB",
    "startDate": "2026-01-01",
    "start_date": "2026-01-01",
    "endDate": "2028-12-31",
    "end_date": "2028-12-31"
  },
  {
    "id": "dhis2",
    "name": "Transforming Emergency Medical Response in Ethiopia with an Integrated Ambulance Dispatch System",
    "description": "Transforming Emergency Medical Response in Ethiopia with an Integrated Ambulance Dispatch System",
    "currency": "ETB",
    "project_only_activities": [
      {
        "id": "dhis2-nc-1",
        "name": "Activity 1.1.1: Recruitment and salaries for DHIS2  officers",
        "target": 12.0,
        "budget": 831430.7999999999,
        "raw_code": "BLANK",
        "uom": "Person/month"
      },
      {
        "id": "dhis2-nc-2",
        "name": "Activity 1.1.2: Volunteers allowance for DHIS2 scale up at branch level working at call and Dispatch center",
        "target": 9.0,
        "budget": 609071.3999999999,
        "raw_code": "BLANK",
        "uom": "6 Person/month"
      },
      {
        "id": "dhis2-nc-3",
        "name": "Activity 1.1.3: Training for dispatch staff, ambulance drivers, and health workers on DHIS2 usage",
        "target": 50.0,
        "budget": 1646829.165,
        "raw_code": "BLANK",
        "uom": "Training"
      },
      {
        "id": "dhis2-nc-4",
        "name": "Activity 1.1.4: Capacity building workshops for branch offices (Woreda) on DHIS2 data entry and reporting (kickoff project)",
        "target": 50.0,
        "budget": 1611300.0,
        "raw_code": "BLANK",
        "uom": "Workshop"
      },
      {
        "id": "dhis2-nc-5",
        "name": "Activity 2.2.1: Procurement of IT equipment (3 Desk top computers,3 tablets, 3 Dongels, 12 Mobile Phones)",
        "target": 8.0,
        "budget": 1863642.4704,
        "raw_code": "BLANK",
        "uom": "lumpsem"
      },
      {
        "id": "dhis2-nc-7",
        "name": "Activity 2.2.3: Visibility and other materials related to promotion",
        "target": 1.0,
        "budget": 48339.0,
        "raw_code": "BLANK",
        "uom": "items"
      },
      {
        "id": "dhis2-nc-9",
        "name": "Activity 2.2.4: Development and printing of user manuals and training materials",
        "target": 1.0,
        "budget": 48339.0,
        "raw_code": "BLANK",
        "uom": "Batch"
      },
      {
        "id": "dhis2-nc-10",
        "name": "Activity 3.3.1: Ongoing technical support and mentorship for dispatch system users",
        "target": 6.0,
        "budget": 522061.19999999995,
        "raw_code": "BLANK",
        "uom": "lumpsum"
      }
    ],
    "budget": 14756325.2,
    "donor": "Norwegian RC",
    "location": "Oromia, Sidama, Harar, Tigray, Amhara",
    "totalBudget": "14,756,325.20 ETB",
    "startDate": "2026-08-01",
    "start_date": "2026-08-01",
    "endDate": "2027-08-31",
    "end_date": "2027-08-31"
  },
  {
    "id": "sky-bird-ii",
    "name": "RISE WASH / SKYBIRD II",
    "description": "RISE WASH / SKYBIRD II",
    "currency": "ETB",
    "project_only_activities": [
      {
        "id": "sky-bird-ii-nc-1",
        "name": "1.1  Community consultation for an inclusive site and site selection(Ilu Aba Bor)",
        "target": 3.0,
        "budget": 30000.0,
        "raw_code": "BLANK",
        "uom": "Session"
      },
      {
        "id": "sky-bird-ii-nc-2",
        "name": "1.2  Design and specification preparation, and community approval(Ilu Aba Bor)",
        "target": 5.0,
        "budget": 100001.0,
        "raw_code": "BLANK",
        "uom": "Number"
      },
      {
        "id": "sky-bird-ii-nc-3",
        "name": "1.3.1  Spring development",
        "target": 1.0,
        "budget": 150000.0,
        "raw_code": "BLANK",
        "uom": "Number"
      },
      {
        "id": "sky-bird-ii-nc-4",
        "name": "1.3.2  Shallow well rehabilitation and solar-powered pump integration (Halu- Ilu Aba Bor)",
        "target": 1.0,
        "budget": 3200000.0,
        "raw_code": "BLANK",
        "uom": "Number"
      },
      {
        "id": "sky-bird-ii-nc-5",
        "name": "1.3.3  Shallow well solar integration (Uka)",
        "target": 1.0,
        "budget": 3200000.0,
        "raw_code": "BLANK",
        "uom": "Number"
      },
      {
        "id": "sky-bird-ii-nc-6",
        "name": "1.3.4  Establishment of gender- and disability-inclusive WASH committees- Ilu Aba Bor",
        "target": 3.0,
        "budget": 30000.0,
        "raw_code": "BLANK",
        "uom": "Number"
      },
      {
        "id": "sky-bird-ii-nc-7",
        "name": "1.4  Training of gender- and disability-inclusive WASH committees with women's leadership integration- Ilu Aba Bor",
        "target": 2.0,
        "budget": 312500.0,
        "raw_code": "BLANK",
        "uom": "Session"
      },
      {
        "id": "sky-bird-ii-nc-8",
        "name": "1.7  Build gender and disability-friendly resource recovery-oriented compost latrine (extension of SKYBIRD I, Mettu town)- Ilu Aba Bor",
        "target": 1.0,
        "budget": 860000.0,
        "raw_code": "BLANK",
        "uom": "Number"
      },
      {
        "id": "sky-bird-ii-nc-9",
        "name": "1.8  Conduct gender- and disability-inclusive hygiene and sanitation promotion training for HEWs and volunteers- Ilu Aba Bor",
        "target": 1.0,
        "budget": 187500.0,
        "raw_code": "BLANK",
        "uom": "Session"
      },
      {
        "id": "sky-bird-ii-nc-10",
        "name": "2.1  Training on PGI, GBV and HTP through enhanced Community Awareness- Ilu Aba Bor",
        "target": 1.0,
        "budget": 225000.0,
        "raw_code": "BLANK",
        "uom": "Session"
      },
      {
        "id": "sky-bird-ii-nc-11",
        "name": "2.2  Training on EMS awareness creation- Ilu Aba Bor",
        "target": 1.0,
        "budget": 270000.0,
        "raw_code": "BLANK",
        "uom": "Session"
      },
      {
        "id": "sky-bird-ii-nc-12",
        "name": "2.3  Workshop on referral pathway for GBV prevention and response- Ilu Aba Bor",
        "target": 1.0,
        "budget": 250000.0,
        "raw_code": "BLANK",
        "uom": "Session"
      },
      {
        "id": "sky-bird-ii-nc-13",
        "name": "2.4  CCF training- Ilu Aba Bor",
        "target": 2.0,
        "budget": 450000.0,
        "raw_code": "BLANK",
        "uom": "Session"
      },
      {
        "id": "sky-bird-ii-nc-14",
        "name": "3.1  Seed grant / VSLA groups - Ilu Aba Bor",
        "target": 5.0,
        "budget": 7500000.0,
        "raw_code": "BLANK",
        "uom": "Number"
      },
      {
        "id": "sky-bird-ii-nc-15",
        "name": "3.2  Train women on entrepreneurship skills / gender inclusive- Ilu Aba Bor",
        "target": 2.0,
        "budget": 1312500.0,
        "raw_code": "BLANK",
        "uom": "Session"
      },
      {
        "id": "sky-bird-ii-nc-16",
        "name": "3.4  Workshop on women's leadership and local champion on entrepreneurship- Ilu Aba Bor",
        "target": 2.0,
        "budget": 218750.0,
        "raw_code": "BLANK",
        "uom": "Session"
      },
      {
        "id": "sky-bird-ii-nc-17",
        "name": "3.8  Community mobilization and sensitization (using media)- Ilu Aba Bor",
        "target": 2.0,
        "budget": 184946.0,
        "raw_code": "BLANK",
        "uom": "Session"
      },
      {
        "id": "sky-bird-ii-nc-18",
        "name": "3.9  Periodic project supervision- Ilu Aba Bor",
        "target": 3.0,
        "budget": 512244.375,
        "raw_code": "BLANK",
        "uom": "Quarter"
      },
      {
        "id": "sky-bird-ii-nc-19",
        "name": "1.1.1  Construction of two women-friendly and inclusive water points- West Arsi",
        "target": 2.0,
        "budget": 1300000.0,
        "raw_code": "BLANK",
        "uom": "Water point"
      },
      {
        "id": "sky-bird-ii-nc-20",
        "name": "1.1.2  Renovation of two women-friendly and inclusive non-functional water points- West Arsi",
        "target": 1.0,
        "budget": 300000.0,
        "raw_code": "BLANK",
        "uom": "Water point"
      },
      {
        "id": "sky-bird-ii-nc-21",
        "name": "1.1.4  Establish four gender-transformative and disability-inclusive Water Use and Management Committees- West Arsi",
        "target": 2.0,
        "budget": 20000.0,
        "raw_code": "BLANK",
        "uom": "Session"
      },
      {
        "id": "sky-bird-ii-nc-22",
        "name": "1.1.5  Provide technical (maintenance) training for 28 water management committee members (incl. PWDs)- West Arsi",
        "target": 28.0,
        "budget": 98728.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "sky-bird-ii-nc-23",
        "name": "1.2.3  Conduct inclusive training for 21 WASH Club Members in school- West Arsi",
        "target": 21.0,
        "budget": 147000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "sky-bird-ii-nc-24",
        "name": "1.3.1  Conduct trainings on hygiene and sanitation practices at woreda level (25 participants)- West Arsi",
        "target": 25.0,
        "budget": 200000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "sky-bird-ii-nc-25",
        "name": "1.4.1  Organize training for 25 stakeholders, ERCS staff and volunteers on PGI in WASH- West Arsi",
        "target": 25.0,
        "budget": 174988.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "sky-bird-ii-nc-26",
        "name": "2.1.1  Train 20 EMS attendants on the revised PGI EMS curriculum- West Arsi",
        "target": 20.0,
        "budget": 104960.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "sky-bird-ii-nc-27",
        "name": "2.2.1  Establish two inclusive EMS committees at kebele level- West Arsi",
        "target": 2.0,
        "budget": 20000.0,
        "raw_code": "BLANK",
        "uom": "Committee"
      },
      {
        "id": "sky-bird-ii-nc-28",
        "name": ".2.2  Conduct four gender-transformative and inclusive EMS campaign sessions- West Arsi",
        "target": 1.0,
        "budget": 25000.0,
        "raw_code": "BLANK",
        "uom": "Campaign"
      },
      {
        "id": "sky-bird-ii-nc-29",
        "name": "2.2.3  Establish two community feedback and response mechanisms- West Arsi",
        "target": 2.0,
        "budget": 10000.0,
        "raw_code": "BLANK",
        "uom": "Mechanism"
      },
      {
        "id": "sky-bird-ii-nc-30",
        "name": "2.3.4  Ambulance service vehicle maintenance, tyres and lubricants- West Arsi",
        "target": 12.0,
        "budget": 240000.0,
        "raw_code": "BLANK",
        "uom": "Month"
      },
      {
        "id": "sky-bird-ii-nc-31",
        "name": "3.1.1  Provide community conversation training for 30 community and religious leaders- West Arsi",
        "target": 30.0,
        "budget": 209999.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "sky-bird-ii-nc-32",
        "name": "3.1.2  Community mobilization, sensitization and campaign on HTP and gender norms- West Arsi",
        "target": 1.0,
        "budget": 55559.33,
        "raw_code": "BLANK",
        "uom": "Lump sum"
      },
      {
        "id": "sky-bird-ii-nc-33",
        "name": "3.1.3  PGI training for stakeholders and workshop on referral pathway- West Arsi",
        "target": 30.0,
        "budget": 299999.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "sky-bird-ii-nc-34",
        "name": "4.1.1  Establish ten gender-transformative and inclusive Village Saving & Loan Associations- West Arsi",
        "target": 10.0,
        "budget": 199999.0,
        "raw_code": "BLANK",
        "uom": "VSLA"
      },
      {
        "id": "sky-bird-ii-nc-35",
        "name": "4.1.2  Provide seed money to strengthen ten village-level saving and credit associations- West Arsi",
        "target": 10.0,
        "budget": 2999990.0,
        "raw_code": "BLANK",
        "uom": "Group"
      },
      {
        "id": "sky-bird-ii-nc-36",
        "name": "4.1.4  Provide five capacity-building trainings on business planning and financial literacy for 200 VSLA members- West Arsi",
        "target": 200.0,
        "budget": 1400000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "sky-bird-ii-nc-37",
        "name": "1.1.1  Construction of two inclusive water points (Labu-Koromo & Jara-Galalicha) with 5 km extension- Sidama",
        "target": 2.0,
        "budget": 4200012.0,
        "raw_code": "BLANK",
        "uom": "Water point"
      },
      {
        "id": "sky-bird-ii-nc-38",
        "name": "1.2.1  Training of front-line health sector experts and community leaders on hygiene and sanitation promotion\u2014Sidama",
        "target": 15.0,
        "budget": 227070.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "sky-bird-ii-nc-39",
        "name": "1.2.2  Promote sanitation and hygiene practices at household/community level through mass campaign\u2014Sidama",
        "target": 2.0,
        "budget": 105000.0,
        "raw_code": "BLANK",
        "uom": "Session"
      },
      {
        "id": "sky-bird-ii-nc-40",
        "name": "2.1.1  Establish 10 Women Self-Help Groups of 15 members each\u2014Sidama",
        "target": 10.0,
        "budget": 570000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "sky-bird-ii-nc-41",
        "name": "2.1.2  Provision of WSHGs financial literacy and business skill trainings\u2014Sidama",
        "target": 150.0,
        "budget": 3000000.0,
        "raw_code": "BLANK",
        "uom": "Group"
      },
      {
        "id": "sky-bird-ii-nc-42",
        "name": "2.1.6  Skills training on fuel-efficient stove manufacturing by enterprises\u2014Sidama",
        "target": 30.0,
        "budget": 600000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "sky-bird-ii-nc-43",
        "name": "2.2.1  EMS activities: ambulance vehicle operational cost support, including equipment\u2014Sidama",
        "target": 12.0,
        "budget": 720360.0,
        "raw_code": "BLANK",
        "uom": "Month"
      },
      {
        "id": "sky-bird-ii-nc-44",
        "name": "3.1.1  PGI-focused advanced first aid training for ambulance attendants\u2014Sidama",
        "target": 20.0,
        "budget": 258000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "sky-bird-ii-nc-45",
        "name": "3.1.4  Monitoring and supportive supervision of the enhanced ambulance service\u2014Sidama",
        "target": 0.0,
        "budget": 0.0,
        "raw_code": "BLANK",
        "uom": "Project period"
      },
      {
        "id": "sky-bird-ii-nc-46",
        "name": "4.1.1.2  Community-level CC facilitators training\u2014Sidama",
        "target": 20.0,
        "budget": 300000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "sky-bird-ii-nc-47",
        "name": "4.1.2  Provision of women's leadership capacity training for government officials and stakeholders\u2014Sidama",
        "target": 20.0,
        "budget": 296000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      },
      {
        "id": "sky-bird-ii-nc-48",
        "name": "4.1.3  Providing PGI training and basic principles of ERCS to government sector staff-- Sidama",
        "target": 20.0,
        "budget": 258000.0,
        "raw_code": "BLANK",
        "uom": "Person"
      }
    ],
    "budget": 51544912.0,
    "donor": "Austrian RC \u2013 ADA",
    "location": "Sidama, Illubabor, West Arsi",
    "totalBudget": "51,544,912 ETB",
    "startDate": "2025-08-01",
    "start_date": "2025-08-01",
    "endDate": "2027-07-31",
    "end_date": "2027-07-31"
  }
];

export const INITIAL_PLAN_ENTRIES: PlanEntry[] = [];

export const INITIAL_REGION_ACTIVITY_LINKS: RegionActivityLink[] = [];

export const INITIAL_QUARTERS: Quarter[] = [
  { id: 'Q1', label: 'Q1' },
  { id: 'Q2', label: 'Q2' },
  { id: 'Q3', label: 'Q3' },
  { id: 'Q4', label: 'Q4' },
];

export const INITIAL_QUARTERLY_PLANS: QuarterlyPlan[] = [];

export const INITIAL_QUARTERLY_ACTUALS: QuarterlyActual[] = [];

export const INITIAL_UOM_FACTORS: UomFactorConfig[] = [
  { uom: '# of HHs', factor: 5 },
  { uom: '# of HH', factor: 5 },
  { uom: '#HH', factor: 5 },
  { uom: '# of households', factor: 5 },
  { uom: '# of people', factor: 1 },
  { uom: '# of participants', factor: 1 },
  { uom: '# of trainees', factor: 1 },
  { uom: '# of beneficiaries', factor: 1 },
  { uom: '# of individuals reached', factor: 1 },
  { uom: '# of water points', factor: 250 },
  { uom: '# of developed/ maintained water schems', factor: 1000 },
  { uom: '# of health facilities supported', factor: 4500 },
];

export const INITIAL_MONITORING_RECORDS: MonitoringRecord[] = [];

export const INITIAL_STATUS_THRESHOLDS: StatusThresholdBand[] = [
  { id: 'st-off-track', label: 'Off track', lower_bound: 0, requires_narrative: true, color: 'rose' },
  { id: 'st-needs-improvement', label: 'Needs improvement', lower_bound: 60, requires_narrative: true, color: 'amber' },
  { id: 'st-on-track', label: 'On track', lower_bound: 80, requires_narrative: false, color: 'emerald' },
  { id: 'st-exceeding', label: 'Exceeding', lower_bound: 100, requires_narrative: false, color: 'blue' },
];

export const INITIAL_QUARTER_PERIOD_CONFIGS: QuarterPeriodConfig[] = [
  { id: 'Q1', label: 'Q1', date_range: 'Jul – Sep' },
  { id: 'Q2', label: 'Q2', date_range: 'Oct – Dec' },
  { id: 'Q3', label: 'Q3', date_range: 'Jan – Mar' },
  { id: 'Q4', label: 'Q4', date_range: 'Apr – Jun' },
];

export const INITIAL_STRATEGIC_KPIS: StrategicKpi[] = [
  {
    id: 'kpi-1-1-1',
    strategic_priority_id: 'sp-1',
    strategic_objective_id: 'so-1-1',
    kpi: '% of high-risk zones with pre-positioned emergency supplies',
    description: 'Assesses the geographic coverage and logistical readiness of ERCS to deliver timely emergency aid in identified high-risk regions.',
    baseline: 'TBD',
    target_2030: '50% of high-risk zones covered',
    means_of_verification: 'ERCS logistics and inventory reports',
    frequency: 'Mid of the strategic period and end of the strategic period',
  },
  {
    id: 'kpi-1-1-2',
    strategic_priority_id: 'sp-1',
    strategic_objective_id: 'so-1-1',
    kpi: '% of ERCS branches trained and equipped with updated Disaster Risk Management (DRM) policies, SOPs, and cash preparedness tools',
    description: 'Evaluates institutional preparedness at the branch level, including SOP dissemination, staff/volunteer training, and readiness for cash-based responses.',
    baseline: 'TBD',
    target_2030: '80% of ERCS branches nationwide',
    means_of_verification: 'Training report',
    frequency: 'Mid of the strategic period and end of the strategic period',
  },
  {
    id: 'kpi-1-2-1',
    strategic_priority_id: 'sp-1',
    strategic_objective_id: 'so-1-2',
    kpi: '% of pilot communities implementing anticipatory actions based on early warning systems (EWS)',
    description: 'Tracks the number of communities where early warning triggers activate pre-defined actions, for example, cash for work to implement range land, pre-positioned aid, evacuation drills, or infrastructure reinforcement.',
    baseline: 'TBD',
    target_2030: '60% of pilot communities',
    means_of_verification: 'anticipatory action performance monitoring and evaluation reports',
    frequency: 'Mid of the strategic period and end of the strategic period',
  },
  {
    id: 'kpi-1-2-2',
    strategic_priority_id: 'sp-1',
    strategic_objective_id: 'so-1-2',
    kpi: '# of people reached through anticipatory actions before hazard impact',
    description: 'Tracks early action outreach and preventive support',
    baseline: 'NA',
    target_2030: '220,000 HH',
    means_of_verification: 'Report',
    frequency: 'Annualy',
  },
  {
    id: 'kpi-1-3-1',
    strategic_priority_id: 'sp-1',
    strategic_objective_id: 'so-1-3',
    kpi: '# of affected individuals receiving multi-sectoral humanitarian assistance (cash, food, NFIs, shelter, WASH)',
    description: 'Measures the scale and comprehensiveness of humanitarian service delivery to crisis-affected populations. Includes both immediate and short-term assistance.',
    baseline: '375,878',
    target_2030: '3 million beneficiaries cumulatively',
    means_of_verification: 'Beneficiary registration databases',
    frequency: 'annually',
  },
  {
    id: 'kpi-1-3-2',
    strategic_priority_id: 'sp-1',
    strategic_objective_id: 'so-1-3',
    kpi: '% of beneficiaries satisfied with the timeliness and relevance of humanitarian assistance',
    description: 'Captures community perception and accountability',
    baseline: 'NA',
    target_2030: '90% satisfied',
    means_of_verification: 'satisifaction survey',
    frequency: 'Mid of the strategic period and end of the strategic period',
  },
  {
    id: 'kpi-1-4-1',
    strategic_priority_id: 'sp-1',
    strategic_objective_id: 'so-1-4',
    kpi: '# of households supported with early recovery assistance (e.g., livelihood restorining, farm inputs, cash for work)',
    description: 'Captures the scale of ERCS’s recovery outreach—especially for livelihood restoration, basic services, and household stability in the post-crisis phase.',
    baseline: 'NA',
    target_2030: '133,011 households',
    means_of_verification: 'Beneficiary databases',
    frequency: 'annually',
  },
  {
    id: 'kpi-1-4-2',
    strategic_priority_id: 'sp-1',
    strategic_objective_id: 'so-1-4',
    kpi: '% of targeted communities demonstrating improved resilience to future shocks',
    description: 'Captures longer-term outcome of early recovery efforts',
    baseline: 'NA',
    target_2030: '60%',
    means_of_verification: 'survey',
    frequency: 'Mid of the strategic period and end of the strategic period',
  },
];
export const INITIAL_KPI_PROGRESS_ENTRIES: KpiProgressEntry[] = [];

export const INITIAL_VAULT_REPORTS: VaultReportRecord[] = [
  {
    id: 'vr-1',
    title: 'Rapid Multi-Sector Needs Assessment: Borena Pastoralist Crisis',
    report_category: 'Assessments',
    file_format: 'PDF',
    file: { name: 'Borena_Rapid_Assessment_2025.pdf', dataUrl: 'data:application/pdf;base64,JVBERi0xLjQKJ...', sizeBytes: 2450000 },
    description: 'Comprehensive multi-sector rapid assessment evaluating livestock loss, water access deficits, and household food insecurity across 6 woredas in Borena zone.',
    program_project_name: 'Drought Emergency Relief Operation (DERO)',
    sector_cluster: ['WASH', 'Food Security & Livelihoods', 'Health'],
    region_location: 'Oromia / Borena',
    reporting_period: '2025-01-10 to 2025-02-15',
    author: 'ERCS Disaster Response & Assessment Team',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-02-20',
    language: 'English',
    keywords: ['Borena', 'Drought', 'Needs Assessment', 'Pastoralist', 'WASH'],
    access_level: 'Public',
    donor: 'IFRC & ICRC',
    version: 'v1.0',
    review_status: 'Approved',
  },
  {
    id: 'vr-2',
    title: 'Q2 Joint Field Monitoring Report: Tigray Rehabilitation Programme',
    report_category: 'Monitoring reports',
    file_format: 'Word',
    file: { name: 'Tigray_Q2_Joint_Monitoring_Report.docx', dataUrl: 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,UEsDBBQ...', sizeBytes: 1180000 },
    description: 'Joint monitoring review of primary healthcare clinic rehabilitations, ambulance deployment response times, and community volunteer mobilization in central Tigray.',
    program_project_name: 'Post-Conflict Community Recovery and Health Strengthening',
    sector_cluster: ['Health', 'Disaster Preparedness & Response'],
    region_location: 'Tigray / Central Tigray',
    reporting_period: '2025-04-01 to 2025-06-30',
    author: 'National PMER Department & Partner National Societies',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-07-08',
    language: 'English',
    keywords: ['Tigray', 'Monitoring', 'Health Facilities', 'Ambulance', 'Joint Mission'],
    access_level: 'Internal',
    review_status: 'Approved',
  },
  {
    id: 'vr-3',
    title: 'Mid-Term Evaluation: Building Resilient Communities in Afar & Somali',
    report_category: 'Evaluation reports',
    file_format: 'PDF',
    file: { name: 'Afar_Somali_MidTerm_Evaluation_2024.pdf', dataUrl: 'data:application/pdf;base64,JVBERi0xLjQKJ...', sizeBytes: 3820000 },
    description: 'External independent evaluation assessing early warning early action mechanism uptake, solar borehole sustainability, and local branch capacity building impact.',
    program_project_name: 'Strengthening Community Resilience (SCR)',
    sector_cluster: ['Disaster Risk Reduction', 'Climate Adaptation', 'WASH'],
    region_location: 'Somali / Sitti',
    reporting_period: '2023-01-01 to 2024-12-31',
    author: 'Horn Development Consultants & ERCS PMER',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-01-15',
    language: 'English',
    keywords: ['Evaluation', 'Mid-Term', 'Somali', 'Afar', 'Resilience', 'Boreholes'],
    access_level: 'Public',
    donor: 'Netherlands Red Cross',
    version: 'Final v2.0',
    review_status: 'Approved',
  },
  {
    id: 'vr-4',
    title: 'Post-Distribution Monitoring (PDM): Multi-Purpose Cash Assistance in Amhara',
    report_category: 'PDM reports',
    file_format: 'Excel',
    file: { name: 'Amhara_Cash_PDM_Round3_Dataset_Analysis.xlsx', dataUrl: 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,UEsDBBQ...', sizeBytes: 940000 },
    description: 'Quantitative PDM surveying 480 displaced beneficiary households measuring expenditure patterns, market prices, encashment safety, and complaints mechanism utilization.',
    program_project_name: 'Emergency Cash Assistance for IDP Households',
    sector_cluster: ['Food Security & Livelihoods', 'Cash & Voucher Assistance'],
    region_location: 'Amhara / North Wollo',
    reporting_period: '2025-03-01 to 2025-03-31',
    author: 'ERCS Cash & Voucher Assistance Technical Working Group',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-04-12',
    language: 'English',
    keywords: ['PDM', 'Cash Assistance', 'Amhara', 'Household Survey', 'Encashment'],
    access_level: 'Restricted',
    review_status: 'Approved',
  },
];

export const INITIAL_TOOLS: ToolRecord[] = [
  {
    id: 'tool-1',
    tool_name: 'Standard Multi-Purpose Cash Post-Distribution Monitoring Form',
    tool_sub_category: 'PDM tool',
    kobo_form_link: 'https://kobo.humanitarianresponse.info/#/forms/aB3xY9pQ7mK',
    xlsform_version: 'v2.4',
    associated_program: 'Emergency Cash and Voucher Assistance',
    target_sector: 'Cash & Voucher Assistance',
    data_collection_mode: 'Mobile (KoboCollect)',
    has_enumerator_guidance: true,
    enumerator_guidance: { name: 'Cash_PDM_Enumerator_Field_Guide_2025.pdf', dataUrl: 'data:application/pdf;base64,JVBERi0xLjQKJ...', sizeBytes: 850000 },
    languages: ['English', 'Amharic', 'Oromiffa', 'Tigrigna'],
    region_coverage: 'National Level (All Regions)',
    status: 'Active',
    owner: 'PMER & Cash Technical Team',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-01-20',
    keywords: ['KoBo', 'PDM', 'Mobile Survey', 'Cash Transfer', 'XLSForm'],
    access_level: 'Public',
  },
  {
    id: 'tool-2',
    tool_name: 'Emergency WASH Infrastructure Rapid Damage Assessment',
    tool_sub_category: 'Needs assessment tool',
    kobo_form_link: 'https://kobo.humanitarianresponse.info/#/forms/bW8zK4mP2vL',
    xlsform_version: 'v1.8',
    associated_program: 'WASH in Emergencies',
    target_sector: 'WASH',
    data_collection_mode: 'Mobile (KoboCollect)',
    has_enumerator_guidance: true,
    enumerator_guidance: { name: 'WASH_Rapid_Assessment_Instruction_Manual.pdf', dataUrl: 'data:application/pdf;base64,JVBERi0xLjQKJ...', sizeBytes: 620000 },
    languages: ['English', 'Amharic', 'Somali'],
    region_coverage: 'Somali, Afar, Oromia',
    status: 'Active',
    owner: 'National WASH Department',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-02-14',
    keywords: ['WASH', 'Damage Assessment', 'Water Points', 'Sanitation', 'Emergency'],
    access_level: 'Internal',
  },
  {
    id: 'tool-3',
    tool_name: 'Community Beneficiary Registration & Verification Form',
    tool_sub_category: 'Beneficiary registration tool',
    kobo_form_link: 'https://kobo.humanitarianresponse.info/#/forms/cV9qP1xL8mR',
    xlsform_version: 'v3.0',
    associated_program: 'General Food Distribution & Livelihoods',
    target_sector: 'Disaster Preparedness & Response',
    data_collection_mode: 'Mobile (KoboCollect)',
    has_enumerator_guidance: false,
    languages: ['English', 'Amharic'],
    region_coverage: 'National',
    status: 'Active',
    owner: 'Disaster Management & Branch Operations',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-03-01',
    keywords: ['Beneficiary Registration', 'KoboCollect', 'Verification', 'Vulnerability'],
    access_level: 'Public',
  },
];

export const INITIAL_LESSONS_LEARNED: LessonLearnedRecord[] = [
  {
    id: 'll-1',
    title: 'Overcoming Supply Bottlenecks: Regional Warehouse Pre-positioning',
    sub_category: 'Video link',
    resource: { type: 'url', value: 'https://vimeo.com/ercs-pmer/warehouse-logistics-lessons-2025' },
    thematic_area: 'Supply Chain & Logistics',
    key_takeaway: 'Decentralizing essential relief stockpiles to 4 regional hub warehouses cut mean emergency distribution dispatch times from 72 hours down to 18 hours during the seasonal flood response.',
    related_project: 'Humanitarian Supply Chain Department Operations',
    region_location: 'Afar / Awash Hub',
    event_date: '2025-02-18',
    submitted_by: 'Afar Branch Logistics Coordinator',
    video_duration: '14:25',
    language: 'English',
    keywords: ['Logistics', 'Pre-positioning', 'Warehousing', 'Response Time', 'Floods'],
    access_level: 'Public (all staff)',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-02-22',
  },
  {
    id: 'll-2',
    title: 'Community Feedback Loops in Displaced Contexts: Accountability Case Study',
    sub_category: 'Document',
    resource: { type: 'file', name: 'ERCS_CEA_Community_Feedback_Mechanisms_Study.pdf', dataUrl: 'data:application/pdf;base64,JVBERi0xLjQKJ...', sizeBytes: 1650000 },
    thematic_area: 'Community Engagement & Accountability (CEA)',
    key_takeaway: 'Establishing dedicated toll-free phone desks paired with on-site volunteer helpdesks doubled reporting rates for female-headed households and resolved 92% of distribution complaints within 7 days.',
    related_project: 'CIDCA Community Empowerment Initiative',
    region_location: 'Benishangul-Gumuz / Asosa',
    event_date: '2025-01-25',
    submitted_by: 'National CEA & PMER Officer',
    language: 'English',
    keywords: ['CEA', 'Accountability', 'Feedback Desk', 'Displaced Communities', 'Gender'],
    access_level: 'Internal',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-02-05',
  },
  {
    id: 'll-3',
    title: 'Integrated Ambulance Dispatch: Cross-Regional Border Protocols',
    sub_category: 'Other',
    resource: { type: 'url', value: 'https://ercs.org.et/pmer/ambulance-dispatch-findings-2025' },
    thematic_area: 'Emergency Health & First Aid',
    key_takeaway: 'Formalizing inter-zonal operational memorandums between Oromia and Somali border branches eliminated administrative dispatch delays for trauma transfers during boundary incidents.',
    related_project: 'DHIS2 Integrated Ambulance Dispatch System',
    region_location: 'Oromia / East Hararghe',
    event_date: '2025-03-10',
    submitted_by: 'DHIS2 Project Team',
    language: 'Amharic',
    keywords: ['Ambulance', 'Dispatch', 'Cross-Regional', 'Emergency Medical Services'],
    access_level: 'Public (all staff)',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-03-15',
  },
];

export const INITIAL_MEDIA_UPDATES: MediaUpdateRecord[] = [
  {
    id: 'mu-1',
    headline: 'National Rollout: ERCS PMER-MIS Knowledge Management & Digital M&E Portal',
    category: 'Announcement',
    publish_date: '2025-03-01',
    author: 'PMER Directorate',
    summary: 'The national rollout of the PMER-MIS 6-branch Knowledge Management module is now live across all 15 regional branches and headquarters divisions.',
    body: 'We are pleased to announce the formal launch of the PMER-MIS Knowledge Management and Digital M&E System. Designed to eliminate fragmented documentation and accelerate evidence-based decision-making, the system centralizes all assessments, KoBo data collection tools, lessons learned, and institutional templates.\n\nKey highlights include:\n• A secure digital Vault for assessments, monitoring reports, and PDM data\n• Active XLSForm repositories for KoBoToolbox field enumerators\n• Interactive lessons learned video links and CEA studies\n• Live chronological announcements and field storytelling\n• Standardized Logframe and ToR templates for planning\n\nBranch Heads, Project Coordinators, and M&E Officers are encouraged to review the updated guidance and submit recent evaluation reports directly into the Vault.',
    status: 'Published',
    pin_to_top: true,
    pin_until: '2025-12-31',
    access_level: 'Public',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-03-01',
  },
  {
    id: 'mu-2',
    headline: 'Adama Workshop: Annual Planning Review & Indicator Standardization Concluded',
    category: 'PMER update',
    publish_date: '2025-02-24',
    author: 'PMER Officer',
    summary: 'Representatives from 15 ERCS branches aligned on standardized SP1–SP8 indicator methodologies and data quality audit protocols during a 3-day workshop in Adama.',
    body: 'From February 21–23, 2025, the ERCS National PMER Directorate convened over 45 regional M&E focal persons, project managers, and branch coordinators in Adama for the Annual Planning and Indicator Alignment Workshop.\n\nThe workshop focused on resolving baseline variance across multi-year donor projects (including EC2R, GRC HACAP3, and STREAM), calibrating the 2019 AOP institutional targets, and validating the automated quarterly actual submission workflows.\n\nParticipants conducted hands-on simulations using the bottom-up quarterly breakdown interface and reviewed data verification standards for field monitoring visits.',
    status: 'Published',
    pin_to_top: false,
    access_level: 'Public',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-02-24',
  },
  {
    id: 'mu-3',
    headline: 'Solar Water Systems Bring Reliable Clean Water to Afar Pastoralists',
    category: 'Field story',
    publish_date: '2025-02-15',
    author: 'Communications & Field M&E Team',
    summary: 'In the arid plains of Awash Fentale, a hybrid solar borehole installation now serves over 3,200 villagers and livestock herds daily with zero diesel reliance.',
    body: 'For decades, communities in Awash Fentale woreda walked over four hours round-trip to collect water from muddy seasonal riverbeds. During severe dry seasons, water truckers were the only lifeline, costing millions of Birr in fuel and maintenance.\n\nUnder the Dutch Red Cross-supported Strengthening Community Resilience (SCR) initiative, ERCS engineered an automated hybrid solar pumping system equipped with 24 high-capacity photovoltaic panels, a 30,000-liter elevated storage tank, and eight distribution tap stands.\n\n"Our children can now attend morning classes instead of trekking before sunrise," explains Halima, a local water committee chair. "And our community water committee collects a modest tariff to fund preventive maintenance."',
    status: 'Published',
    pin_to_top: false,
    access_level: 'Public',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-02-15',
  },
  {
    id: 'mu-4',
    headline: 'Confidential: Internal Audit & Risk Assessment Briefing for Senior Management',
    category: 'Announcement',
    publish_date: '2025-02-10',
    author: 'Internal Audit & PMER Directorate',
    summary: 'Restricted executive briefing on institutional governance benchmarks, compliance risk matrices, and legal review timelines.',
    body: 'This executive briefing summarizes key findings from the internal audit and compliance assessment conducted across five zonal sub-branches. Access is restricted to senior management, Directorate leadership, and authorized PMER oversight personnel.\n\nFull risk mitigation matrix and follow-up action plan are available in the restricted documents repository.',
    status: 'Published',
    pin_to_top: false,
    access_level: 'Restricted',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-02-10',
  },
  {
    id: 'mu-5',
    headline: 'Draft: Upcoming Q3 Volunteer Mobilization Campaign Details',
    category: 'Announcement',
    publish_date: '2025-03-05',
    author: 'Volunteer Development Coordinator',
    summary: 'Internal draft outlining volunteer recruitment targets and logistics for the national disaster preparedness campaign.',
    body: 'Preliminary draft for leadership review. Outlines recruitment strategies across university branches and community Red Cross youth committees.',
    status: 'Draft',
    pin_to_top: false,
    access_level: 'Internal',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-03-05',
  },
];

export const INITIAL_TEMPLATES_GUIDELINES: TemplateGuidelineRecord[] = [
  {
    id: 'tg-1',
    template_name: 'Terms of Reference (ToR) Template for External Project Evaluations',
    template_type: 'ToR template',
    file: { name: 'ERCS_Evaluation_ToR_Standard_Template_2025.docx', dataUrl: 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,UEsDBBQ...', sizeBytes: 450000 },
    description: 'Mandatory standard template to be used whenever commissioning mid-term, endline, or thematic external evaluations for donor-funded initiatives.',
    applicable_module: 'M&E',
    owner: 'PMER Directorate',
    language: 'English',
    access_level: 'Public',
    version: 'v2.1',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-01-10',
  },
  {
    id: 'tg-2',
    template_name: 'Strategic Plan 2025-2030 Standard Logframe Matrix (8 Priorities)',
    template_type: 'Logframe template',
    file: { name: 'ERCS_Strategic_Logframe_Matrix_Template.xlsx', dataUrl: 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,UEsDBBQ...', sizeBytes: 520000 },
    description: 'Use when drafting new project concept notes or annual operational plans to align project indicators with national SP1–SP8 objectives.',
    applicable_module: 'Planning',
    owner: 'PMER Directorate',
    language: 'English',
    access_level: 'Public',
    version: 'v3.0',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-01-15',
  },
  {
    id: 'tg-3',
    template_name: 'Quarterly Progress Narrative & Indicator Tracking Report Template',
    template_type: 'Report template',
    file: { name: 'ERCS_Quarterly_Progress_Reporting_Template.docx', dataUrl: 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,UEsDBBQ...', sizeBytes: 380000 },
    description: 'Standard reporting template for Branch Heads and Project Coordinators to submit qualitative progress, challenges, and lessons learned.',
    applicable_module: 'Reporting',
    owner: 'PMER Directorate',
    language: 'English',
    access_level: 'Public',
    version: 'v2.0',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-01-20',
  },
  {
    id: 'tg-4',
    template_name: 'Field Data Quality Audit (DQA) Verification Checklist',
    template_type: 'Checklist',
    file: { name: 'ERCS_Field_Data_Quality_Audit_Checklist.pdf', dataUrl: 'data:application/pdf;base64,JVBERi0xLjQKJ...', sizeBytes: 310000 },
    description: 'Checklist for M&E focal persons conducting on-site data verification at branch warehouses, health posts, and distribution points.',
    applicable_module: 'M&E',
    owner: 'PMER Directorate',
    language: 'English',
    access_level: 'Public',
    version: 'v1.5',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-02-01',
  },
];

export const INITIAL_RESOURCE_CENTER: ResourceCenterRecord[] = [
  {
    id: 'rc-1',
    resource_title: 'Sphere Humanitarian Charter & Minimum Standards in Disaster Response',
    resource_type: 'External link',
    link_or_definition: 'https://www.spherestandards.org/handbook/',
    source_organization: 'The Sphere Project',
    relevant_sector: 'Disaster Preparedness & Response',
    description: 'Globally recognized humanitarian standards outlining minimum thresholds for water supply, sanitation, shelter, and health in disaster operations.',
    keywords: ['Sphere', 'Humanitarian Standards', 'Minimum Standards', 'Protection'],
    access_level: 'Public',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-01-05',
  },
  {
    id: 'rc-2',
    resource_title: 'Output vs. Outcome vs. Impact: PMER Definitions',
    resource_type: 'Glossary term',
    link_or_definition: 'Output: Immediate tangible products or deliverables of project activities (e.g. 50 community boreholes drilled). Outcome: Medium-term behavioral, institutional, or environmental changes among beneficiaries (e.g. 85% of households accessing clean water within 500m). Impact: Long-term sustainable contribution toward national or global wellbeing (e.g. 40% reduction in water-borne disease incidence in woreda).',
    source_organization: 'IFRC Planning, Monitoring, Evaluation and Reporting (PMER) Handbook',
    relevant_sector: 'Institutional & PMER',
    description: 'Core conceptual distinction defining results levels within the ERCS Five-Year Strategic Plan (2025-2030) results chain.',
    keywords: ['Glossary', 'Output', 'Outcome', 'Impact', 'Results Chain'],
    access_level: 'Public',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-01-08',
  },
  {
    id: 'rc-3',
    resource_title: 'IFRC Project/Programme Monitoring and Evaluation Guide',
    resource_type: 'Donor guideline',
    link_or_definition: 'https://www.ifrc.org/document/ifrc-projectprogramme-monitoring-and-evaluation-guide',
    source_organization: 'International Federation of Red Cross and Red Crescent Societies (IFRC)',
    relevant_sector: 'Institutional & PMER',
    description: 'Comprehensive guide covering baseline studies, indicator matrices, logical frameworks, participatory monitoring, and evaluation management.',
    keywords: ['IFRC', 'M&E Guide', 'Logframe', 'Evaluation', 'Guidelines'],
    access_level: 'Public',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-01-12',
  },
  {
    id: 'rc-4',
    resource_title: 'How to Submit Quarterly Actuals in the ERCS PMER-MIS',
    resource_type: 'FAQ',
    link_or_definition: 'Q: When can a Project Coordinator or Department Head submit Quarterly Actuals?\nA: Quarterly Actuals can be entered and submitted once the Quarterly Plan for that entry has been formally approved by the Program Director. Navigate to "Quarterly Actuals", select the relevant quarter, enter achieved physical reach and ETB expenditure, add narrative comments, and click "Submit for Approval".',
    source_organization: 'ERCS National PMER Directorate',
    relevant_sector: 'Institutional & PMER',
    description: 'Frequently asked operational question regarding bottom-up planning lifecycle and approval milestones.',
    keywords: ['FAQ', 'Quarterly Actuals', 'Submission Workflow', 'Approval'],
    access_level: 'Public',
    uploaded_by: 'PMER Officer',
    upload_date: '2025-02-01',
  },
];

export const FISCAL_QUARTERS = INITIAL_QUARTERS;
export const INITIAL_UOM_CONFIGS = INITIAL_UOM_FACTORS;

// ---------------------------------------------------------------------------
// Non-Programmatic Departments Plan (Source: rows 400-427 of ERCS_2019_AOP_final_for_PMER_MIS_settings.xlsx)
// Exactly 23 rows: 5 Legal (1,800,000 ETB) + 6 Humanitarian Supply Chain (8,906,000 ETB) + 12 SG Office (19,077,175 ETB)
// Sum = exactly 29,783,175 ETB matching the source stated total.
// ---------------------------------------------------------------------------
export const INITIAL_NON_PROGRAMMATIC_ACTIVITIES: NonProgrammaticActivity[] = [
  // Legal & Contract Administrator Department (5 rows)
  {
    id: 'npa-legal-1',
    department: 'Legal & Contract Administrator Department',
    name: 'Defend the Society from any legal claims',
    uom: 'Percentage',
    annual_target: 1,
    annual_budget: 800000,
  },
  {
    id: 'npa-legal-2',
    department: 'Legal & Contract Administrator Department',
    name: 'Follow-up court cases instituted against the society',
    uom: 'Percentage',
    annual_target: 1,
    annual_budget: 600000,
  },
  {
    id: 'npa-legal-3',
    department: 'Legal & Contract Administrator Department',
    name: 'Provide Legal Advisory Service For Regional Branches',
    uom: 'Percentage',
    annual_target: 1,
    annual_budget: 200000,
  },
  {
    id: 'npa-legal-4',
    department: 'Legal & Contract Administrator Department',
    name: 'Provide Legal Advisory Service to HQ Management',
    uom: 'Percentage',
    annual_target: 1,
    annual_budget: 0,
  },
  {
    id: 'npa-legal-5',
    department: 'Legal & Contract Administrator Department',
    name: 'Follow up proper & timely performance of contracts',
    uom: 'Percentage',
    annual_target: 1,
    annual_budget: 200000,
  },

  // Humanitarian Supply Chain Department (6 rows)
  {
    id: 'npa-sc-1',
    department: 'Humanitarian Supply Chain Department',
    name: 'Undertake bulk purchase',
    uom: 'No. of procurements',
    annual_target: 4,
    annual_budget: 120000,
  },
  {
    id: 'npa-sc-2',
    department: 'Humanitarian Supply Chain Department',
    name: 'Provide loading unloading services',
    uom: '% of the items',
    annual_target: 1,
    annual_budget: 400000,
  },
  {
    id: 'npa-sc-3',
    department: 'Humanitarian Supply Chain Department',
    name: 'Implementation of floor items location tag',
    uom: '# of location tags',
    annual_target: 28,
    annual_budget: 100000,
  },
  {
    id: 'npa-sc-4',
    department: 'Humanitarian Supply Chain Department',
    name: 'Implementation of shelf items location tag',
    uom: '# of shelves',
    annual_target: 150,
    annual_budget: 100000,
  },
  {
    id: 'npa-sc-5',
    department: 'Humanitarian Supply Chain Department',
    name: 'Kaizen implementation at ERCS main warehouse',
    uom: '# of warehouse',
    annual_target: 4,
    annual_budget: 200000,
  },
  {
    id: 'npa-sc-6',
    department: 'Humanitarian Supply Chain Department',
    name: 'Administrative budget',
    annual_budget: 7986000,
    is_admin_budget_line: true,
  },

  // SG Office (12 rows: 10 activities + 2 admin budget lines)
  {
    id: 'npa-sgo-1',
    department: 'SG Office',
    name: 'Draft General Assembly Meeting and Board Election Manual, Ready for General Assembly Adoption',
    uom: 'number',
    annual_target: 1,
    annual_budget: 300000,
  },
  {
    id: 'npa-sgo-2',
    department: 'SG Office',
    name: 'Facilitate the Travel and documentation for ERCS Delegation on the 2023 International Conference of RCRC',
    uom: 'percent',
    annual_target: 1,
    annual_budget: 500000,
  },
  {
    id: 'npa-sgo-3',
    department: 'SG Office',
    name: 'Drafting and Documentation of Board of Directors minutes',
    uom: 'Number',
    annual_target: 12,
    annual_budget: 50000,
  },
  {
    id: 'npa-sgo-4',
    department: 'SG Office',
    name: 'Prepare materials and logistics necessary for Board operational visits, communications and external and internal meetings',
    uom: 'Visit',
    annual_target: 4,
    annual_budget: 650000,
  },
  {
    id: 'npa-sgo-5',
    department: 'SG Office',
    name: 'Coordinates and timely delivery of the necessary documents and logistics for board meetings',
    uom: 'number',
    annual_target: 16,
    annual_budget: 100000,
  },
  {
    id: 'npa-sgo-6',
    department: 'SG Office',
    name: 'Facilitate and coordinate SG field visit and branch monitoring',
    uom: 'Number',
    annual_target: 6,
    annual_budget: 360000,
  },
  {
    id: 'npa-sgo-7',
    department: 'SG Office',
    name: 'Supervises and facilitates the services of SG Office and fulfills necessary utilities and reception facilities',
    uom: 'percentage',
    annual_target: 100,
    annual_budget: 300000,
  },
  {
    id: 'npa-sgo-8',
    department: 'SG Office',
    name: 'Coordinates external guest visits and reception farewell ceremonies',
    uom: 'Number',
    annual_target: 6,
    annual_budget: 300000,
  },
  {
    id: 'npa-sgo-9',
    department: 'SG Office',
    name: 'Facilitates National Board meeting with Regional Branch Board',
    uom: 'Number',
    annual_target: 2,
    annual_budget: 400000,
  },
  {
    id: 'npa-sgo-10',
    department: 'SG Office',
    name: 'Organizes, arranges and schedules regular and extraordinary meetings and discussions to be held with the Secretary General and different stakeholders of the Society; takes minutes of meetings and gets same duly signed by participants',
    uom: 'percentage',
    annual_target: 100,
    annual_budget: 100000,
  },
  {
    id: 'npa-sgo-11',
    department: 'SG Office',
    name: 'Administrative budget',
    annual_budget: 412175,
    is_admin_budget_line: true,
  },
  {
    id: 'npa-sgo-12',
    department: 'SG Office',
    name: 'Humanitarian Academy Budget',
    annual_budget: 15605000,
    is_admin_budget_line: true,
  },
];
