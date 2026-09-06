import {
  VaultReportRecord,
  ToolRecord,
  LessonLearnedRecord,
  MediaUpdateRecord,
  TemplateGuidelineRecord,
  ResourceCenterRecord,
  UserRole,
} from '../types';

export interface FieldRule<T = any> {
  field: keyof T | string;
  label: string;
  required: boolean | ((record: T) => boolean);
  type?: 'string' | 'array' | 'file' | 'resource' | 'custom';
  customValidator?: (value: any, record: T) => string | null;
}

export interface ValidationResult {
  isValid: boolean;
  missingFields: string[];
  errors: Record<string, string>;
}

export const VAULT_SCHEMA: FieldRule<VaultReportRecord>[] = [
  { field: 'title', label: 'Report Title', required: true, type: 'string' },
  { field: 'report_category', label: 'Report Category', required: true, type: 'string' },
  { field: 'file_format', label: 'File Format', required: true, type: 'string' },
  { field: 'file', label: 'Report File', required: true, type: 'file' },
  { field: 'description', label: 'Description', required: true, type: 'string' },
  { field: 'program_project_name', label: 'Program / Project Name', required: true, type: 'string' },
  { field: 'sector_cluster', label: 'Sector / Cluster', required: true, type: 'array' },
  { field: 'region_location', label: 'Region / Location', required: true, type: 'string' },
  { field: 'reporting_period', label: 'Reporting Period', required: true, type: 'string' },
  { field: 'author', label: 'Author / Evaluator', required: true, type: 'string' },
  { field: 'language', label: 'Language', required: true, type: 'string' },
  { field: 'keywords', label: 'Keywords', required: true, type: 'array' },
  { field: 'access_level', label: 'Access Level', required: true, type: 'string' },
];

export const TOOL_SCHEMA: FieldRule<ToolRecord>[] = [
  { field: 'tool_name', label: 'Tool Name', required: true, type: 'string' },
  { field: 'tool_sub_category', label: 'Tool Sub-Category', required: true, type: 'string' },
  { field: 'kobo_form_link', label: 'KoBo Form Link', required: true, type: 'string' },
  { field: 'xlsform_version', label: 'XLSForm Version', required: true, type: 'string' },
  { field: 'associated_program', label: 'Associated Program', required: true, type: 'string' },
  { field: 'target_sector', label: 'Target Sector', required: true, type: 'string' },
  { field: 'data_collection_mode', label: 'Data Collection Mode', required: true, type: 'string' },
  { field: 'languages', label: 'Languages', required: true, type: 'array' },
  { field: 'region_coverage', label: 'Region Coverage', required: true, type: 'string' },
  { field: 'status', label: 'Status', required: true, type: 'string' },
  { field: 'owner', label: 'Owner', required: true, type: 'string' },
  { field: 'keywords', label: 'Keywords', required: true, type: 'array' },
  { field: 'access_level', label: 'Access Level', required: true, type: 'string' },
  {
    field: 'enumerator_guidance',
    label: 'Enumerator Guidance',
    required: (r: ToolRecord) => Boolean(r.has_enumerator_guidance),
    type: 'file',
  },
];

export const LESSON_SCHEMA: FieldRule<LessonLearnedRecord>[] = [
  { field: 'title', label: 'Lesson Title', required: true, type: 'string' },
  { field: 'sub_category', label: 'Sub-Category', required: true, type: 'string' },
  { field: 'resource', label: 'Resource (Link or Document)', required: true, type: 'resource' },
  { field: 'thematic_area', label: 'Thematic Area', required: true, type: 'string' },
  { field: 'key_takeaway', label: 'Key Takeaway', required: true, type: 'string' },
  { field: 'related_project', label: 'Related Project', required: true, type: 'string' },
  { field: 'region_location', label: 'Region Location', required: true, type: 'string' },
  { field: 'event_date', label: 'Event Date', required: true, type: 'string' },
  { field: 'submitted_by', label: 'Submitted By', required: true, type: 'string' },
  { field: 'language', label: 'Language', required: true, type: 'string' },
  { field: 'keywords', label: 'Keywords', required: true, type: 'array' },
  { field: 'access_level', label: 'Access Level', required: true, type: 'string' },
  {
    field: 'video_duration',
    label: 'Video Duration',
    required: (r: LessonLearnedRecord) => r.sub_category === 'Video link',
    type: 'string',
  },
];

export const MEDIA_SCHEMA: FieldRule<MediaUpdateRecord>[] = [
  { field: 'headline', label: 'Headline', required: true, type: 'string' },
  { field: 'category', label: 'Category', required: true, type: 'string' },
  { field: 'publish_date', label: 'Publish Date', required: true, type: 'string' },
  { field: 'author', label: 'Author', required: true, type: 'string' },
  { field: 'summary', label: 'Summary', required: true, type: 'string' },
  { field: 'body', label: 'Story Body', required: true, type: 'string' },
  { field: 'status', label: 'Status', required: true, type: 'string' },
  { field: 'access_level', label: 'Access Level', required: true, type: 'string' },
];

export const TEMPLATE_SCHEMA: FieldRule<TemplateGuidelineRecord>[] = [
  { field: 'template_name', label: 'Template Name', required: true, type: 'string' },
  { field: 'template_type', label: 'Template Type', required: true, type: 'string' },
  { field: 'file', label: 'Template File', required: true, type: 'file' },
  { field: 'description', label: 'When to Use Guidance', required: true, type: 'string' },
  { field: 'applicable_module', label: 'Applicable Module', required: true, type: 'string' },
  { field: 'owner', label: 'Owner', required: true, type: 'string' },
  { field: 'language', label: 'Language', required: true, type: 'string' },
  { field: 'access_level', label: 'Access Level', required: true, type: 'string' },
];

export const RESOURCE_SCHEMA: FieldRule<ResourceCenterRecord>[] = [
  { field: 'resource_title', label: 'Resource Title', required: true, type: 'string' },
  { field: 'resource_type', label: 'Resource Type', required: true, type: 'string' },
  { field: 'link_or_definition', label: 'Link or Definition', required: true, type: 'string' },
  { field: 'source_organization', label: 'Source Organization', required: true, type: 'string' },
  { field: 'relevant_sector', label: 'Relevant Sector', required: true, type: 'string' },
  { field: 'description', label: 'Description', required: true, type: 'string' },
  { field: 'keywords', label: 'Keywords', required: true, type: 'array' },
  { field: 'access_level', label: 'Access Level', required: true, type: 'string' },
];

/**
 * Generic validator for PMER-MIS Knowledge Management records.
 * Supports static and conditional mandatory fields, array validation,
 * file validation, and polymorphic resource types.
 */
export function validateMandatoryFields<T extends Record<string, any>>(
  record: T,
  schema: FieldRule<T>[]
): ValidationResult {
  const missingFields: string[] = [];
  const errors: Record<string, string> = {};

  for (const rule of schema) {
    const isRequired = typeof rule.required === 'function' ? rule.required(record) : rule.required;
    if (!isRequired) continue;

    const value = (record as any)[rule.field];
    const fieldKey = String(rule.field);

    if (rule.customValidator) {
      const customErr = rule.customValidator(value, record);
      if (customErr) {
        missingFields.push(rule.label);
        errors[fieldKey] = customErr;
        continue;
      }
    }

    if (rule.type === 'file') {
      if (!value || typeof value !== 'object' || !value.name || !value.dataUrl) {
        missingFields.push(rule.label);
        errors[fieldKey] = `${rule.label} file is required.`;
      }
      continue;
    }

    if (rule.type === 'array') {
      if (!Array.isArray(value) || value.length === 0) {
        missingFields.push(rule.label);
        errors[fieldKey] = `At least one ${rule.label.toLowerCase()} is required.`;
      }
      continue;
    }

    if (rule.type === 'resource') {
      // Polymorphic resource: URL or File
      if (!value || typeof value !== 'object') {
        missingFields.push(rule.label);
        errors[fieldKey] = `${rule.label} is required.`;
      } else if (value.type === 'url') {
        if (!value.value || typeof value.value !== 'string' || value.value.trim().length === 0) {
          missingFields.push(rule.label);
          errors[fieldKey] = 'A valid URL is required.';
        }
      } else if (value.type === 'file') {
        if (!value.name || !value.dataUrl) {
          missingFields.push(rule.label);
          errors[fieldKey] = 'A document file is required.';
        }
      }
      continue;
    }

    // Default string check
    if (value === undefined || value === null || (typeof value === 'string' && value.trim().length === 0)) {
      missingFields.push(rule.label);
      errors[fieldKey] = `${rule.label} is required.`;
    }
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
    errors,
  };
}

/**
 * Access Control Allow-list for Restricted Knowledge Management assets.
 * Only System Admin, PMER Officer, and Program Director are permitted to view
 * records marked with access_level: 'Restricted'.
 */
export const RESTRICTED_ALLOWED_ROLES: UserRole[] = [
  'System Admin',
  'PMER Officer',
  'Program Director',
];

export function canRoleAccessRestricted(role: UserRole): boolean {
  return RESTRICTED_ALLOWED_ROLES.includes(role);
}

/**
 * Centralized data-read filter for knowledge management records.
 * Enforces that records with access_level === 'Restricted' are completely
 * omitted for unauthorized roles across all 6 branches.
 */
export function getVisibleKnowledgeRecords<T extends { access_level?: string }>(
  records: T[],
  currentRole: UserRole
): T[] {
  const isAllowed = canRoleAccessRestricted(currentRole);
  if (isAllowed) return records;
  return records.filter(r => r.access_level !== 'Restricted');
}

/**
 * Authoring and Content Management Rights for Media & Updates.
 * PMER Officer is the primary M&E knowledge custodian, and System Admin
 * has full administrative authority.
 */
export function canManageMediaContent(role: UserRole): boolean {
  return role === 'PMER Officer' || role === 'System Admin';
}

/**
 * Formats a byte size into a human-readable string (KB or MB).
 */
export function formatFileSize(bytes: number): string {
  if (!bytes || bytes === 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
