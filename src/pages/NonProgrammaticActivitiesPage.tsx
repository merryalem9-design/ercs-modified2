import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { NonProgrammaticDepartment } from '../types';
import { sumActual, sumExpenditure, achievementPct, budgetUtilizationPct } from '../utils/calculations';
import { Building2, Layers, DollarSign, Briefcase, FileSpreadsheet, ShieldCheck, Truck, Award, TrendingUp, Wallet, CheckCircle2 } from 'lucide-react';

const DEPARTMENTS: { id: 'ALL' | NonProgrammaticDepartment; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'ALL', label: 'All Non-Programmatic', icon: Layers },
  { id: 'Legal & Contract Administrator Department', label: 'Legal Service', icon: ShieldCheck },
  { id: 'Humanitarian Supply Chain Department', label: 'Humanitarian Supply Chain', icon: Truck },
  { id: 'SG Office', label: 'SG Office & Academy', icon: Award },
];

const QUARTERS = ['ALL', 'Q1', 'Q2', 'Q3', 'Q4'] as const;

export const NonProgrammaticActivitiesPage: React.FC = () => {
  const { nonProgrammaticActivities, planEntries, quarterlyActuals, quarterlyPlans } = useApp();
  const [selectedDept, setSelectedDept] = useState<'ALL' | NonProgrammaticDepartment>('ALL');
  const [selectedQuarter, setSelectedQuarter] = useState<'ALL' | 'Q1' | 'Q2' | 'Q3' | 'Q4'>('ALL');

  const activityRows = useMemo(() => {
    return nonProgrammaticActivities.map(a => {
      const entry = planEntries.find(
        pe => pe.scope_type === 'NonProgrammatic' && pe.non_programmatic_activity_id === a.id
      );
      const hasEntry = !!entry;
      const qps = entry ? quarterlyPlans.filter(p => p.plan_entry_id === entry.id) : [];
      const hasQp = qps.length > 0;
      const hasPending = qps.some(p => p.approval_status === 'Pending Approval');
      const hasApproved = qps.some(p => p.approval_status === 'Approved');
      const qpStatus = hasApproved ? 'Approved' : hasPending ? 'Pending' : hasQp ? 'Draft' : 'Planned';

      const actual = entry ? sumActual([entry], quarterlyActuals, selectedQuarter) : 0;
      const spent = entry ? sumExpenditure([entry], quarterlyActuals, selectedQuarter) : 0;
      const target = a.annual_target ?? 0;
      const budget = a.annual_budget ?? 0;
      const achPct = a.is_admin_budget_line ? null : achievementPct(actual, target);
      const utilPct = budgetUtilizationPct(spent, budget);

      return {
        ...a,
        entry,
        hasEntry,
        qpStatus,
        actual,
        spent,
        achPct,
        utilPct,
      };
    });
  }, [nonProgrammaticActivities, planEntries, quarterlyActuals, quarterlyPlans, selectedQuarter]);

  const filteredRows = useMemo(() => {
    if (selectedDept === 'ALL') return activityRows;
    return activityRows.filter(r => r.department === selectedDept);
  }, [activityRows, selectedDept]);

  const totalBudget = useMemo(() => {
    return filteredRows.reduce((sum, r) => sum + (r.annual_budget || 0), 0);
  }, [filteredRows]);

  const totalSpend = useMemo(() => {
    return filteredRows.reduce((sum, r) => sum + r.spent, 0);
  }, [filteredRows]);

  const totalUtil = totalBudget > 0 ? (totalSpend / totalBudget) * 100 : 0;

  const operationalRows = useMemo(() => {
    return filteredRows.filter(r => !r.is_admin_budget_line);
  }, [filteredRows]);

  const totalTarget = useMemo(() => {
    return operationalRows.reduce((sum, r) => sum + (r.annual_target || 0), 0);
  }, [operationalRows]);

  const totalActual = useMemo(() => {
    return operationalRows.reduce((sum, r) => sum + r.actual, 0);
  }, [operationalRows]);

  const overallAch = totalTarget > 0 ? (totalActual / totalTarget) * 100 : 0;

  const totalActivities = filteredRows.length;
  const plannedCount = filteredRows.filter(r => r.hasEntry).length;
  const adminCount = filteredRows.filter(r => r.is_admin_budget_line).length;
  const operationalCount = filteredRows.filter(r => !r.is_admin_budget_line).length;

  const departmentCounts = useMemo(() => {
    const counts: Record<NonProgrammaticDepartment, { count: number; budget: number; spent: number }> = {
      'Legal & Contract Administrator Department': { count: 0, budget: 0, spent: 0 },
      'Humanitarian Supply Chain Department': { count: 0, budget: 0, spent: 0 },
      'SG Office': { count: 0, budget: 0, spent: 0 },
    };
    activityRows.forEach(r => {
      if (counts[r.department]) {
        counts[r.department].count += 1;
        counts[r.department].budget += r.annual_budget || 0;
        counts[r.department].spent += r.spent || 0;
      }
    });
    return counts;
  }, [activityRows]);

  const formatETB = (val: number) => {
    return `ETB ${val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-ercs-red" />
            Non-Programmatic Activities & Budgets
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Independent institutional activities, legal operations, supply chain management, and Secretary General office budget lines outside the SP1–SP8 strategic priorities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
            Source: 2019 AOP Final
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Budget */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Budget</div>
            <div className="text-xl font-black text-slate-800 mt-0.5">{formatETB(totalBudget)}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {totalSpend > 0 ? `Spend: ${formatETB(totalSpend)} (${totalUtil.toFixed(1)}%)` : 'Allocated Institutional Budget'}
            </div>
          </div>
        </div>

        {/* Total Spend */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className={`p-3 rounded-lg ${totalUtil > 100 ? 'bg-rose-50 text-rose-600' : totalUtil >= 60 ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Actual Spend & Util</div>
            <div className="text-xl font-black text-slate-800 mt-0.5">{formatETB(totalSpend)}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {totalSpend > 0 ? `${totalUtil.toFixed(1)}% budget utilized` : 'No quarterly spend reported'}
            </div>
          </div>
        </div>

        {/* Operational Achievement */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className={`p-3 rounded-lg ${totalTarget > 0 ? (overallAch >= 80 ? 'bg-emerald-50 text-emerald-600' : overallAch >= 60 ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600') : 'bg-emerald-50 text-emerald-600'}`}>
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Target Achievement</div>
            <div className="text-xl font-black text-slate-800 mt-0.5">
              {totalTarget > 0 ? `${overallAch.toFixed(1)}%` : 'N/A'}
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {totalTarget > 0 ? `Actual: ${totalActual.toLocaleString()} / ${totalTarget.toLocaleString()}` : 'Admin-only lines selected'}
            </div>
          </div>
        </div>

        {/* Activities & Plans */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Activities & Plans</div>
            <div className="text-xl font-black text-slate-800 mt-0.5">{totalActivities} Items</div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {plannedCount > 0 ? `${plannedCount} with plan entries (${operationalCount} op, ${adminCount} admin)` : `${operationalCount} operational · ${adminCount} admin lines`}
            </div>
          </div>
        </div>
      </div>

      {/* Filters: Department Tabs + Quarter Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          {DEPARTMENTS.map(dept => {
            const Icon = dept.icon;
            const isActive = selectedDept === dept.id;
            const deptBudget = dept.id === 'ALL' ? 29783175 : departmentCounts[dept.id]?.budget || 0;
            const deptCount = dept.id === 'ALL' ? 23 : departmentCounts[dept.id]?.count || 0;

            return (
              <button
                key={dept.id}
                onClick={() => setSelectedDept(dept.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{dept.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${isActive ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'}`}>
                  {deptCount} · {formatETB(deptBudget)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quarter Filter Pills */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 self-start sm:self-auto">
          <span className="text-[10px] font-bold text-slate-500 uppercase px-2">Quarter:</span>
          {QUARTERS.map(q => (
            <button
              key={q}
              onClick={() => setSelectedQuarter(q)}
              className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                selectedQuarter === q
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {selectedDept === 'ALL' ? 'All Non-Programmatic Entities' : selectedDept} ({filteredRows.length})
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono font-bold text-slate-700">
            <span>
              Total Budget: <span className="text-slate-900">{formatETB(totalBudget)}</span>
            </span>
            <span>
              Actual Spend: <span className="text-emerald-600">{formatETB(totalSpend)}</span>
            </span>
            <span>
              Util: <span className={totalUtil > 100 ? 'text-rose-600' : 'text-blue-600'}>{totalUtil.toFixed(1)}%</span>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto max-h-[650px] relative">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-800 text-white sticky top-0 z-20 text-[11px] font-bold tracking-wider">
              <tr>
                <th className="p-3 border-r border-slate-700 min-w-[180px]">Department</th>
                <th className="p-3 border-r border-slate-700 min-w-[280px]">Activity / Budget Line</th>
                <th className="p-3 border-r border-slate-700 min-w-[100px] text-center">Unit of Measure</th>
                <th className="p-3 border-r border-slate-700 min-w-[100px] text-right">Annual Target</th>
                <th className="p-3 border-r border-slate-700 min-w-[100px] text-right">Actual Target</th>
                <th className="p-3 border-r border-slate-700 min-w-[90px] text-right">Achievement %</th>
                <th className="p-3 border-r border-slate-700 min-w-[120px] text-right">Annual Budget</th>
                <th className="p-3 border-r border-slate-700 min-w-[120px] text-right">Actual Spend</th>
                <th className="p-3 border-r border-slate-700 min-w-[90px] text-right">Budget Util %</th>
                <th className="p-3 min-w-[140px] text-center">Category & Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRows.map(r => {
                return (
                  <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 border-r border-slate-100 font-semibold text-slate-800">
                      <div className="flex items-center gap-1.5">
                        {r.department === 'Legal & Contract Administrator Department' && <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                        {r.department === 'Humanitarian Supply Chain Department' && <Truck className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                        {r.department === 'SG Office' && <Award className="w-3.5 h-3.5 text-purple-600 shrink-0" />}
                        <span>{r.department}</span>
                      </div>
                    </td>
                    <td className="p-3 border-r border-slate-100">
                      <div className="font-medium text-slate-900">{r.name}</div>
                    </td>
                    <td className="p-3 border-r border-slate-100 text-center text-slate-500 font-semibold">
                      {r.uom ? r.uom : '—'}
                    </td>
                    <td className="p-3 border-r border-slate-100 text-right font-mono text-slate-700 font-medium">
                      {r.is_admin_budget_line
                        ? <span className="text-slate-400 font-normal italic">N/A (Admin)</span>
                        : (r.annual_target != null && r.annual_target > 0 ? r.annual_target.toLocaleString() : '—')}
                    </td>
                    <td className="p-3 border-r border-slate-100 text-right font-mono text-slate-900 font-medium">
                      {r.is_admin_budget_line
                        ? <span className="text-slate-400 font-normal">—</span>
                        : r.actual > 0 ? r.actual.toLocaleString() : <span className="text-slate-400">0</span>}
                    </td>
                    <td className="p-3 border-r border-slate-100 text-right font-mono">
                      {r.is_admin_budget_line ? (
                        <span className="text-slate-400 font-normal">—</span>
                      ) : (
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[11px] font-bold ${
                          (r.achPct || 0) >= 100 ? 'bg-emerald-100 text-emerald-800' :
                          (r.achPct || 0) >= 70 ? 'bg-blue-100 text-blue-800' :
                          (r.achPct || 0) > 0 ? 'bg-amber-100 text-amber-800' :
                          'text-slate-400'
                        }`}>
                          {r.achPct != null ? `${r.achPct.toFixed(1)}%` : '0.0%'}
                        </span>
                      )}
                    </td>
                    <td className="p-3 border-r border-slate-100 text-right font-mono font-bold text-slate-900">
                      {formatETB(r.annual_budget)}
                    </td>
                    <td className="p-3 border-r border-slate-100 text-right font-mono font-medium text-slate-800">
                      {r.spent > 0 ? formatETB(r.spent) : <span className="text-slate-400">0</span>}
                    </td>
                    <td className="p-3 border-r border-slate-100 text-right font-mono">
                      <span className={`inline-flex px-1.5 py-0.5 rounded text-[11px] font-bold ${
                        r.utilPct > 100 ? 'bg-rose-100 text-rose-800' :
                        r.utilPct >= 80 ? 'bg-emerald-100 text-emerald-800' :
                        r.utilPct > 0 ? 'bg-blue-100 text-blue-800' :
                        'text-slate-400'
                      }`}>
                        {r.utilPct.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        <span
                          className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            r.is_admin_budget_line
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {r.is_admin_budget_line ? 'Admin Line' : 'Operational'}
                        </span>
                        {r.hasEntry && (
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              r.qpStatus === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              r.qpStatus === 'Pending' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                              'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            {r.qpStatus}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-900 text-white font-extrabold text-xs sticky bottom-0 z-20">
              <tr className="border-t-2 border-slate-700">
                <td className="p-3 border-r border-slate-700" colSpan={3}>
                  SUBTOTAL ({filteredRows.length} Items · {plannedCount} Planned)
                </td>
                <td className="p-3 border-r border-slate-700 text-right font-mono text-slate-300">
                  {totalTarget.toLocaleString()}
                </td>
                <td className="p-3 border-r border-slate-700 text-right font-mono text-slate-300">
                  {totalActual.toLocaleString()}
                </td>
                <td className="p-3 border-r border-slate-700 text-right font-mono text-amber-400">
                  {totalTarget > 0 ? `${overallAch.toFixed(1)}%` : '—'}
                </td>
                <td className="p-3 border-r border-slate-700 text-right font-mono text-emerald-400">
                  {formatETB(totalBudget)}
                </td>
                <td className="p-3 border-r border-slate-700 text-right font-mono text-emerald-300">
                  {formatETB(totalSpend)}
                </td>
                <td className="p-3 border-r border-slate-700 text-right font-mono text-amber-300">
                  {totalUtil.toFixed(1)}%
                </td>
                <td className="p-3 text-center text-slate-400 font-normal text-[10px]">
                  {selectedDept === 'ALL' ? '29.78M Exact Match' : ''}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
