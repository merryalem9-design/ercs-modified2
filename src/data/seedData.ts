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
  KnowledgeDocument,
  StatusThresholdBand,
  QuarterPeriodConfig,
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
      "grc-hacap3"
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
      "stream-ercs"
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
      "grc-hacap3"
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
      "grc-hacap3"
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
      "l4r"
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
      "sraps"
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
      "l4r"
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
      "l4r"
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
      "sraps"
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
      "sraps"
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
      "sraps"
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
      "sraps"
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
      "sraps"
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
      "sraps"
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
      "sraps"
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
      "stream-ercs"
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
      "sraps"
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
      "sraps"
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
    "eligible_project_ids": [],
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
    "project_targets": {}
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
      "sraps"
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

export const INITIAL_STRATEGIC_KPIS: StrategicKpi[] = [];
export const INITIAL_KPI_PROGRESS_ENTRIES: KpiProgressEntry[] = [];

export const INITIAL_KNOWLEDGE_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: 'kdoc-1',
    title: 'ERCS 2025-2030 Strategic Plan',
    category: 'Strategic Planning',
    summary: "The Ethiopian Red Cross Society's five-year strategic plan outlining eight strategic priorities, objectives, and key performance...",
    version: 'v1.0',
    published_date: '15 Jan 2025',
  },
  {
    id: 'kdoc-2',
    title: 'ERCS Disaster Response Operations Manual',
    category: 'Disaster Management',
    summary: 'Operational guidelines and procedures for ERCS disaster response including emergency activation protocols, resource...',
    version: 'v1.0',
    published_date: '10 Mar 2024',
  },
  {
    id: 'kdoc-3',
    title: 'Community-Based Health and First Aid (CBHFA)',
    category: 'Health',
    summary: 'Practical guide for ERCS volunteers and staff to deliver community-based health and first aid training across Ethiopian communities.',
    version: 'v1.0',
    published_date: '20 Jun 2024',
  },
  {
    id: 'kdoc-4',
    title: 'ERCS PMER Guidelines and Reporting Framework',
    category: 'PMER',
    summary: 'Framework for Planning, Monitoring, Evaluation, Accountability, and Learning across ERCS operations including template...',
    version: 'v1.0',
    published_date: '01 Feb 2025',
  },
  {
    id: 'kdoc-5',
    title: 'ERCS Institutional Governance Policy',
    category: 'Institutional',
    summary: 'Governance framework, leadership mandates, organizational integrity principles, and statutory accountability standards for ERCS operations.',
    version: 'v1.0',
    published_date: '12 Nov 2024',
  },
];

export const FISCAL_QUARTERS = INITIAL_QUARTERS;
export const INITIAL_UOM_CONFIGS = INITIAL_UOM_FACTORS;
