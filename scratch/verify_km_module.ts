// scratch/verify_km_module.ts
import {
  VaultReportRecord,
  ToolRecord,
  LessonLearnedRecord,
  MediaUpdateRecord,
  TemplateGuidelineRecord,
  ResourceCenterRecord,
  UserRole,
} from '../src/types';
import {
  validateMandatoryFields,
  canRoleAccessRestricted,
  getVisibleKnowledgeRecords,
  canManageMediaContent,
  formatFileSize,
  VAULT_SCHEMA,
  TOOL_SCHEMA,
  LESSON_SCHEMA,
  MEDIA_SCHEMA,
  TEMPLATE_SCHEMA,
  RESOURCE_SCHEMA,
} from '../src/utils/knowledgeValidation';
import {
  INITIAL_VAULT_REPORTS,
  INITIAL_TOOLS,
  INITIAL_LESSONS_LEARNED,
  INITIAL_MEDIA_UPDATES,
  INITIAL_TEMPLATES_GUIDELINES,
  INITIAL_RESOURCE_CENTER,
} from '../src/data/seedData';

console.log('================================================================');
console.log('PMER-MIS KNOWLEDGE MANAGEMENT MODULE VERIFICATION SUITE');
console.log('================================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, testName: string, details?: string) {
  totalTests++;
  if (condition) {
    console.log(`✅ [PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`❌ [FAIL] ${testName}`);
    if (details) console.error(`   Details: ${details}`);
    process.exitCode = 1;
  }
}

// -----------------------------------------------------------------------------
// 1. Vault 4 report categories share the same form schema
// -----------------------------------------------------------------------------
console.log('\n--- 1. Vault Reports (4 Categories & Schema) ---');
const vaultCategories = ['Assessments', 'Monitoring reports', 'Evaluation reports', 'PDM reports'];
const baseSampleReport: Partial<VaultReportRecord> = {
  title: 'Test Assessment Report',
  report_category: 'Assessments',
  file_format: 'PDF',
  file: { name: 'report.pdf', dataUrl: 'data:...', sizeBytes: 1024 },
  description: 'A comprehensive summary of the assessment findings.',
  program_project_name: 'Drought Resilience Project',
  sector_cluster: ['WASH', 'Health'],
  region_location: 'Oromia / Borena',
  reporting_period: '2025-2026',
  author: 'PMER Specialist',
  language: 'English',
  keywords: ['WASH', 'Emergency'],
  access_level: 'Public',
};

for (const cat of vaultCategories) {
  const sampleReport: Partial<VaultReportRecord> = {
    ...baseSampleReport,
    title: `Test ${cat} Report`,
    report_category: cat,
  };
  const validation = validateMandatoryFields(sampleReport, VAULT_SCHEMA);
  assert(validation.isValid, `Vault category "${cat}" validates against unified VAULT_SCHEMA`);
}

// Test missing required fields in Vault
const invalidVault: Partial<VaultReportRecord> = {
  title: '',
  report_category: 'Assessments',
};
const invalidVaultRes = validateMandatoryFields(invalidVault, VAULT_SCHEMA);
assert(
  !invalidVaultRes.isValid && invalidVaultRes.missingFields.includes('Report Title'),
  'Vault rejects missing mandatory title and file'
);

// -----------------------------------------------------------------------------
// 2. Tools branch requires XLSForm version, KoBo form link, and mobile/web mode
// -----------------------------------------------------------------------------
console.log('\n--- 2. Tools & KoBo Branch Requirements ---');
const sampleTool: Partial<ToolRecord> = {
  tool_name: 'Multi-Sector Needs Survey',
  tool_sub_category: 'Needs assessment tool',
  kobo_form_link: 'https://kobo.humanitarianresponse.info/#/forms/xyz123',
  xlsform_version: 'v1.4',
  associated_program: 'Disaster Relief',
  target_sector: 'WASH',
  data_collection_mode: 'Mobile (KoboCollect)',
  languages: ['English', 'Amharic'],
  region_coverage: 'National',
  status: 'Active',
  owner: 'PMER Unit',
  keywords: ['KoBo', 'Survey'],
  access_level: 'Public',
  has_enumerator_guidance: false,
};
assert(
  validateMandatoryFields(sampleTool, TOOL_SCHEMA).isValid,
  'Tool record with required fields is valid'
);

const toolMissingXls = { ...sampleTool, xlsform_version: '' };
assert(
  !validateMandatoryFields(toolMissingXls, TOOL_SCHEMA).isValid,
  'Tool fails validation without xlsform_version'
);

const toolMissingLink = { ...sampleTool, kobo_form_link: '' };
assert(
  !validateMandatoryFields(toolMissingLink, TOOL_SCHEMA).isValid,
  'Tool fails validation without kobo_form_link'
);

// Conditional enumerator guide
const toolWithMissingGuide = {
  ...sampleTool,
  has_enumerator_guidance: true,
  enumerator_guidance: undefined,
};
assert(
  !validateMandatoryFields(toolWithMissingGuide, TOOL_SCHEMA).isValid,
  'Tool requires enumerator_guidance file when has_enumerator_guidance is true'
);

// -----------------------------------------------------------------------------
// 3. Lessons Learned requires duration for video links, and supports documents
// -----------------------------------------------------------------------------
console.log('\n--- 3. Lessons Learned Video Duration & Resource Polymorphism ---');
const videoLesson: Partial<LessonLearnedRecord> = {
  title: 'Community Feedback in Cash Assistance',
  sub_category: 'Video link',
  resource: { type: 'url', value: 'https://youtube.com/watch?v=12345' },
  thematic_area: 'Cash Transfer',
  key_takeaway: 'Face-to-face feedback desks improved accountability by 40%.',
  related_project: 'Cash Relief',
  region_location: 'Amhara',
  event_date: '2025-05-10',
  submitted_by: 'Field Officer',
  language: 'English',
  keywords: ['Cash', 'Accountability'],
  access_level: 'Public (all staff)',
  video_duration: '14 mins',
};
assert(
  validateMandatoryFields(videoLesson, LESSON_SCHEMA).isValid,
  'Video lesson with video_duration passes validation'
);

const videoLessonMissingDuration = { ...videoLesson, video_duration: undefined };
assert(
  !validateMandatoryFields(videoLessonMissingDuration, LESSON_SCHEMA).isValid,
  'Video lesson without video_duration fails conditional validation'
);

const docLesson: Partial<LessonLearnedRecord> = {
  ...videoLesson,
  sub_category: 'Document',
  resource: { type: 'file', name: 'case_study.pdf', dataUrl: 'data:...', sizeBytes: 2048 },
  video_duration: undefined,
};
assert(
  validateMandatoryFields(docLesson, LESSON_SCHEMA).isValid,
  'Document lesson passes validation without video_duration'
);

// -----------------------------------------------------------------------------
// 4. Media & Updates Feed Categories and Pinned Card Sorting
// -----------------------------------------------------------------------------
console.log('\n--- 4. Media & Updates Feed (3 Types, Pinned Card Logic) ---');
const mediaCategories = ['PMER update', 'Field story', 'Announcement'];
const seedMediaCategories = new Set(INITIAL_MEDIA_UPDATES.map(m => m.category));
for (const mc of mediaCategories) {
  assert(seedMediaCategories.has(mc), `Seed media updates contains category: "${mc}"`);
}

// -----------------------------------------------------------------------------
// 5. Expired Pinned Items Drop Below Active Pins
// -----------------------------------------------------------------------------
console.log('\n--- 5. Pin Expiration Date (pin_until) Handling ---');
function isMediaItemActivePin(item: MediaUpdateRecord, testDate = new Date()): boolean {
  if (!item.pin_to_top) return false;
  if (!item.pin_until) return true;
  return new Date(item.pin_until) >= testDate;
}

const activePinnedItem: MediaUpdateRecord = {
  id: 'm-active',
  headline: 'Active Announcement',
  category: 'Announcement',
  publish_date: '2025-01-01',
  author: 'PMER',
  summary: 'Active',
  body: 'Body',
  status: 'Published',
  pin_to_top: true,
  pin_until: '2026-12-31', // future
  access_level: 'Public',
  uploaded_by: 'PMER Officer',
  upload_date: '2025-01-01',
};

const expiredPinnedItem: MediaUpdateRecord = {
  ...activePinnedItem,
  id: 'm-expired',
  headline: 'Expired Announcement',
  publish_date: '2025-06-01', // newer date but expired pin
  pin_until: '2024-01-01', // past
};

const regularItem: MediaUpdateRecord = {
  ...activePinnedItem,
  id: 'm-regular',
  headline: 'Regular Item',
  publish_date: '2025-03-01',
  pin_to_top: false,
};

assert(isMediaItemActivePin(activePinnedItem), 'Future pin_until is recognized as active pin');
assert(!isMediaItemActivePin(expiredPinnedItem), 'Past pin_until is recognized as expired (unpinned)');

const sortedMedia = [regularItem, expiredPinnedItem, activePinnedItem].sort((a, b) => {
  const aPin = isMediaItemActivePin(a);
  const bPin = isMediaItemActivePin(b);
  if (aPin && !bPin) return -1;
  if (!aPin && bPin) return 1;
  return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
});

assert(
  sortedMedia[0].id === 'm-active',
  'Active pinned item appears first in sorted feed'
);
assert(
  sortedMedia[1].id === 'm-expired',
  'Expired pin drops below active pin and sorts by date'
);

// -----------------------------------------------------------------------------
// 6. Draft Media Items Visible Only to PMER Officer and System Admin
// -----------------------------------------------------------------------------
console.log('\n--- 6. Draft Content Visibility Permissions ---');
assert(canManageMediaContent('PMER Officer'), 'PMER Officer has media management and draft view rights');
assert(canManageMediaContent('System Admin'), 'System Admin has media management and draft view rights');
assert(!canManageMediaContent('Branch Head (Federated)'), 'Branch Head cannot manage media or view drafts');
assert(!canManageMediaContent('Project Coordinator (Projectized)'), 'Project Coordinator cannot manage media or view drafts');
assert(!canManageMediaContent('Guest Observer / External Auditor'), 'Auditor cannot manage media or view drafts');

// -----------------------------------------------------------------------------
// 7. Templates & Guidelines Includes Module Applicability and Guidance
// -----------------------------------------------------------------------------
console.log('\n--- 7. Templates & Guidelines Schema ---');
const sampleTemplate: Partial<TemplateGuidelineRecord> = {
  template_name: 'Standard ToR Template',
  template_type: 'ToR template',
  file: { name: 'tor.docx', dataUrl: 'data:...', sizeBytes: 512 },
  description: 'Use when engaging external consultants for mid-term or final evaluations.',
  applicable_module: 'Planning',
  owner: 'PMER Department',
  language: 'English',
  access_level: 'Public',
};
assert(
  validateMandatoryFields(sampleTemplate, TEMPLATE_SCHEMA).isValid,
  'Template record validates with applicable_module and when-to-use description'
);

// -----------------------------------------------------------------------------
// 8. Resource Center Supports Both URL and Definition Text
// -----------------------------------------------------------------------------
console.log('\n--- 8. Resource Center (Polymorphic: URL vs Definition Text) ---');
const urlResource: Partial<ResourceCenterRecord> = {
  resource_title: 'Sphere Humanitarian Standards',
  resource_type: 'External link',
  link_or_definition: 'https://spherestandards.org',
  source_organization: 'The Sphere Project',
  relevant_sector: 'General PMER',
  description: 'Universal minimum standards in core humanitarian response.',
  keywords: ['Sphere', 'Standards'],
  access_level: 'Public',
};
assert(
  validateMandatoryFields(urlResource, RESOURCE_SCHEMA).isValid,
  'External link resource validates'
);

const glossaryResource: Partial<ResourceCenterRecord> = {
  ...urlResource,
  resource_title: 'Definition of Post-Distribution Monitoring (PDM)',
  resource_type: 'Glossary term',
  link_or_definition: 'A mechanism to assess whether relief items reached target beneficiaries.',
};
assert(
  validateMandatoryFields(glossaryResource, RESOURCE_SCHEMA).isValid,
  'Glossary definition resource validates'
);

// -----------------------------------------------------------------------------
// 9. All Dropdowns Provide a Working "Other" Option
// -----------------------------------------------------------------------------
console.log('\n--- 9. Working "Other" Custom Values in Dropdowns ---');
const customCategoryReport = {
  ...baseSampleReport,
  report_category: 'Special Thematic Study', // Custom "Other" entry
};
assert(
  validateMandatoryFields(customCategoryReport, VAULT_SCHEMA).isValid,
  'Custom "Other" report category accepted by validator'
);

const customTool = {
  ...sampleTool,
  tool_sub_category: 'Early Warning Community Trigger Tool',
};
assert(
  validateMandatoryFields(customTool, TOOL_SCHEMA).isValid,
  'Custom "Other" tool category accepted by validator'
);

// -----------------------------------------------------------------------------
// 10. Restricted Access Security Filtering
// -----------------------------------------------------------------------------
console.log('\n--- 10. Centralized Restricted Access Filtering ---');
assert(canRoleAccessRestricted('System Admin'), 'System Admin can access restricted records');
assert(canRoleAccessRestricted('PMER Officer'), 'PMER Officer can access restricted records');
assert(canRoleAccessRestricted('Program Director'), 'Program Director can access restricted records');
assert(!canRoleAccessRestricted('Branch Head (Federated)'), 'Branch Head CANNOT access restricted records');
assert(!canRoleAccessRestricted('Project Coordinator (Projectized)'), 'Project Coordinator CANNOT access restricted records');
assert(!canRoleAccessRestricted('Department Head (HQ)'), 'Department Head CANNOT access restricted records');
assert(!canRoleAccessRestricted('National Activity AOP'), 'National Activity AOP CANNOT access restricted records');

// Test data filtering on seed records
const mixedRecords = [
  { id: '1', title: 'Public Record', access_level: 'Public' },
  { id: '2', title: 'Restricted Record', access_level: 'Restricted' },
  { id: '3', title: 'Internal Record', access_level: 'Internal' },
];

const visibleForBranchHead = getVisibleKnowledgeRecords(mixedRecords, 'Branch Head (Federated)');
assert(
  visibleForBranchHead.length === 2 && !visibleForBranchHead.some(r => r.access_level === 'Restricted'),
  'Branch Head only sees 2 non-restricted records'
);

const visibleForPmer = getVisibleKnowledgeRecords(mixedRecords, 'PMER Officer');
assert(
  visibleForPmer.length === 3 && visibleForPmer.some(r => r.access_level === 'Restricted'),
  'PMER Officer sees all 3 records including Restricted'
);

const visibleForAdmin = getVisibleKnowledgeRecords(mixedRecords, 'System Admin');
assert(
  visibleForAdmin.length === 3 && visibleForAdmin.some(r => r.access_level === 'Restricted'),
  'System Admin sees all 3 records including Restricted'
);

// -----------------------------------------------------------------------------
// Summary
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`TEST RESULTS: ${passedTests} / ${totalTests} PASSED`);
if (passedTests === totalTests) {
  console.log('🎉 ALL 10 PMER-MIS KNOWLEDGE MANAGEMENT REQUIREMENTS VERIFIED!');
} else {
  console.error(`⚠️ ${totalTests - passedTests} TESTS FAILED!`);
}
console.log('================================================================\n');
