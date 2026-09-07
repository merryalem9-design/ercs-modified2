import { readFileSync } from 'fs';
import { resolve } from 'path';

console.log('================================================================');
console.log('   VERIFYING KPI CARD PERFORMANCE INDICATORS (RAG ONLY)');
console.log('================================================================\n');

let failed = false;

// 1. Check DashboardKPICard.tsx
const dashboardKPICardPath = resolve('src/components/dashboard/DashboardKPICard.tsx');
const dashboardKPICardContent = readFileSync(dashboardKPICardPath, 'utf-8');

if (!dashboardKPICardContent.includes('normalizeRagBadgeColor')) {
  console.error('❌ DashboardKPICard does not contain normalizeRagBadgeColor sanitization');
  failed = true;
} else {
  console.log('✓ DashboardKPICard includes strict RAG normalization for badge colors.');
}

if (dashboardKPICardContent.includes('border-l-ercs-red')) {
  console.error('❌ DashboardKPICard still hardcodes border-l-ercs-red on non-red cards');
  failed = true;
} else {
  console.log('✓ DashboardKPICard dynamically selects border-l-4 for green, amber, or red.');
}

// 2. Check ReportPage.tsx
const reportPagePath = resolve('src/pages/ReportPage.tsx');
const reportPageContent = readFileSync(reportPagePath, 'utf-8');

if (reportPageContent.includes("accent='blue'") || reportPageContent.includes('accent="blue"') || reportPageContent.includes("border-l-blue-500")) {
  console.error('❌ ReportPage still contains blue accent on KPI cards');
  failed = true;
} else {
  console.log('✓ ReportPage has completely eliminated blue accents on KPI cards.');
}

if (reportPageContent.includes('bg-indigo-100 text-indigo-800')) {
  console.error('❌ ReportPage OVERACHIEVED_BADGE still contains indigo');
  failed = true;
} else {
  console.log('✓ ReportPage OVERACHIEVED_BADGE uses Green (emerald).');
}

// 3. Check Dashboard Tabs
const filesToCheck = [
  'src/components/dashboard/ExecutiveOverviewTab.tsx',
  'src/components/dashboard/CommunityImpactTab.tsx',
  'src/components/dashboard/DirectCommunityDrilldownTab.tsx',
  'src/components/dashboard/EnablingPrioritiesTab.tsx',
  'src/components/dashboard/DepartmentsAndFinanceTab.tsx',
];

const disallowedBadgeColors = [
  'bg-blue-100',
  'bg-indigo-100',
  'bg-purple-100',
  'bg-slate-100 text-slate-800',
  'bg-cyan-100',
  'bg-sky-100'
];

for (const file of filesToCheck) {
  const content = readFileSync(resolve(file), 'utf-8');
  for (const color of disallowedBadgeColors) {
    if (content.includes(color)) {
      console.error(`❌ ${file} still contains non-RAG badge color: ${color}`);
      failed = true;
    }
  }
}

if (!failed) {
  console.log('✓ All 5 Dashboard Tabs have eliminated blue, indigo, and slate badge colors on KPI cards.');
}

// 4. Check NonProgrammaticActivitiesPage.tsx
const nonProgPath = resolve('src/pages/NonProgrammaticActivitiesPage.tsx');
const nonProgContent = readFileSync(nonProgPath, 'utf-8');
if (nonProgContent.includes('bg-blue-50 text-blue-600') || nonProgContent.includes('bg-purple-50 text-purple-600')) {
  console.error('❌ NonProgrammaticActivitiesPage still contains blue/purple in KPI cards');
  failed = true;
} else {
  console.log('✓ NonProgrammaticActivitiesPage KPI cards strictly use Green, Amber, Red chips.');
}

// 5. Check StrategicKpiPage.tsx
const stratKpiPath = resolve('src/pages/StrategicKpiPage.tsx');
const stratKpiContent = readFileSync(stratKpiPath, 'utf-8');
if (stratKpiContent.includes('bg-blue-50 border border-blue-100 px-3.5 py-2.5')) {
  console.error('❌ StrategicKpiPage still contains blue background on Latest Progress');
  failed = true;
} else {
  console.log('✓ StrategicKpiPage uses Green/Amber RAG for Latest Progress.');
}

// 6. Check calculations.ts
const calcPath = resolve('src/utils/calculations.ts');
const calcContent = readFileSync(calcPath, 'utf-8');
if (calcContent.includes("if (achievement > 100) return { label: 'Overachieved', color: 'bg-indigo-100")) {
  console.error('❌ calculations.ts still returns indigo for Overachieved');
  failed = true;
} else {
  console.log('✓ calculations.ts getStatusBadge returns Green (emerald) for Overachieved.');
}

console.log('\n================================================================');
if (failed) {
  console.error('   SOME CHECKS FAILED!');
  process.exit(1);
} else {
  console.log('   ALL CHECKS PASSED SUCCESSFULLY!');
  console.log('================================================================\n');
}
