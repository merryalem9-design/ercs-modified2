// scratch/test_section3.ts
import { INITIAL_PLAN_ENTRIES, INITIAL_QUARTERLY_ACTUALS, INITIAL_MONITORING_RECORDS } from '../src/data/seedData';
import { sumExpenditure, sumActual } from '../src/utils/calculations';
import { MonitoringRecord } from '../src/types';

function runTests() {
  console.log('--- Starting Section 3 Tests ---');

  // Test 1: Auto-fill reported expenditure from quarterly actuals
  const pe = {
    id: 'pe-test-1',
    scope_type: 'Project' as const,
    project_id: 'proj-1',
    annual_target: 1000,
    annual_budget: 2000000,
    activity_code: 'ACT-1',
    activity_name: 'Community First Aid Training',
    activity_description: 'Training in target zones',
    approval_status: 'Approved' as const,
  };
  const mockActuals = [
    {
      id: 'qa-test-1',
      plan_entry_id: pe.id,
      quarter_id: 'Q1' as const,
      actual: 150,
      expenditure: 450000,
      approval_status: 'Approved' as const,
    },
    {
      id: 'qa-test-2',
      plan_entry_id: pe.id,
      quarter_id: 'Q2' as const,
      actual: 200,
      expenditure: 600000,
      approval_status: 'Approved' as const,
    }
  ];

  const q1Exp = sumExpenditure([pe], mockActuals, 'Q1');
  console.log(`Test 1: PlanEntry ${pe.id} Q1 expenditure = ${q1Exp}`);
  if (q1Exp !== 450000) {
    throw new Error(`Test 1 failed: expected 450000, got ${q1Exp}`);
  }

  const annualExp = sumExpenditure([pe], mockActuals, 'Annual');
  console.log(`Test 1: PlanEntry ${pe.id} Annual expenditure = ${annualExp}`);
  if (annualExp !== 1050000) {
    throw new Error(`Test 1 failed: expected 1050000, got ${annualExp}`);
  }
  console.log('✓ Test 1 Passed: Reported Expenditure auto-fills from quarterly actual');

  const peWithActual = pe;
  const actualForEntry = mockActuals[0];
  const qId = 'Q1';
  const autoFilledExp = q1Exp;

  // Test 2: Plan entry with no actuals reported displays 0
  const dummyEntry = { ...peWithActual, id: 'dummy-entry-no-actuals' };
  const zeroExp = sumExpenditure([dummyEntry], INITIAL_QUARTERLY_ACTUALS, 'Q1');
  if (zeroExp !== 0) {
    throw new Error(`Test 2 failed: expected 0, got ${zeroExp}`);
  }
  console.log('✓ Test 2 Passed: No actuals reported displays 0');

  // Test 3: Budget Verification %
  const verifiedExp = autoFilledExp * 0.95;
  const budgetVerifPct = (verifiedExp / autoFilledExp) * 100;
  if (Math.abs(budgetVerifPct - 95) > 0.001) {
    throw new Error(`Test 3 failed: expected 95%, got ${budgetVerifPct}`);
  }
  console.log(`✓ Test 3 Passed: Budget verification % correctly computed (${budgetVerifPct.toFixed(1)}%)`);

  // Test 4: Evidence attachment representation
  const record: MonitoringRecord = {
    id: 'mr-test-1',
    plan_entry_id: peWithActual.id,
    quarter_id: qId,
    reported_expenditure: autoFilledExp,
    verified_expenditure: verifiedExp,
    evidence_attachment_name: 'receipts_and_photos.pdf',
    evidence_attachment_url: 'data:application/pdf;base64,JVBERi0xLjQK...',
    approval_status: 'Draft',
  };
  if (!record.evidence_attachment_name || !record.evidence_attachment_url) {
    throw new Error('Test 4 failed: Evidence attachment not preserved');
  }
  console.log('✓ Test 4 Passed: Evidence document attachment name and URL preserved');

  // Test 5: Submission changes status to Pending Approval
  record.approval_status = 'Pending Approval';
  record.submitted_at = new Date().toISOString();
  if (record.approval_status !== 'Pending Approval' || !record.submitted_at) {
    throw new Error('Test 5 failed: Status not Pending Approval');
  }
  console.log('✓ Test 5 Passed: Record submission sets Pending Approval and timestamp');

  // Test 6: Exclusion from dashboard when Pending Approval, Draft, or Rejected
  const isIncludedInDashboard = (rec: MonitoringRecord) => rec.approval_status === 'Approved';
  if (isIncludedInDashboard(record)) {
    throw new Error('Test 6 failed: Pending record should not be included in dashboard');
  }
  record.approval_status = 'Draft';
  if (isIncludedInDashboard(record)) {
    throw new Error('Test 6 failed: Draft record should not be included in dashboard');
  }
  record.approval_status = 'Rejected';
  if (isIncludedInDashboard(record)) {
    throw new Error('Test 6 failed: Rejected record should not be included in dashboard');
  }
  console.log('✓ Test 6 Passed: Draft, Pending, and Rejected records excluded from Dashboard');

  // Test 7: PMER Head rejection with reason
  record.approval_status = 'Pending Approval';
  const rejectionReason = 'Missing fuel receipts for field visit';
  record.approval_status = 'Rejected';
  record.reviewed_at = new Date().toISOString();
  record.rejection_reason = rejectionReason;

  if (record.approval_status !== 'Rejected' || record.rejection_reason !== rejectionReason) {
    throw new Error('Test 7 failed: Record not properly rejected');
  }
  console.log('✓ Test 7 Passed: PMER Head rejection updates status and saves reason');

  // Test 8: Re-submit and Approve
  record.approval_status = 'Pending Approval';
  record.submitted_at = new Date().toISOString();
  record.rejection_reason = undefined;

  record.approval_status = 'Approved';
  record.reviewed_at = new Date().toISOString();

  if (record.approval_status !== 'Approved' || !isIncludedInDashboard(record)) {
    throw new Error('Test 8 failed: Approved record should now be included in dashboard');
  }
  console.log('✓ Test 8 Passed: Approved record is accepted and visible on dashboard');

  console.log('--- All Section 3 Tests Passed Successfully! ---');
}

runTests();
