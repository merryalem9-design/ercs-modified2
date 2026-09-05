import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { NonProgrammaticDepartment } from '../types';
import { Building2, Layers, DollarSign, Briefcase, FileSpreadsheet, ShieldCheck, Truck, Award } from 'lucide-react';

const DEPARTMENTS: { id: 'ALL' | NonProgrammaticDepartment; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'ALL', label: 'All Non-Programmatic', icon: Layers },
  { id: 'Legal & Contract Administrator Department', label: 'Legal Service', icon: ShieldCheck },
  { id: 'Humanitarian Supply Chain Department', label: 'Humanitarian Supply Chain', icon: Truck },
  { id: 'SG Office', label: 'SG Office & Academy', icon: Award },
];

export const NonProgrammaticActivitiesPage: React.FC = () => {
  const { nonProgrammaticActivities } = useApp();
  const [selectedDept, setSelectedDept] = useState<'ALL' | NonProgrammaticDepartment>('ALL');

  const filteredActivities = useMemo(() => {
    if (selectedDept === 'ALL') return nonProgrammaticActivities;
    return nonProgrammaticActivities.filter(a => a.department === selectedDept);
  }, [nonProgrammaticActivities, selectedDept]);

  const totalBudget = useMemo(() => {
    return filteredActivities.reduce((sum, a) => sum + (a.annual_budget || 0), 0);
  }, [filteredActivities]);

  const totalActivities = filteredActivities.length;

  const departmentCounts = useMemo(() => {
    const counts: Record<NonProgrammaticDepartment, { count: number; budget: number }> = {
      'Legal & Contract Administrator Department': { count: 0, budget: 0 },
      'Humanitarian Supply Chain Department': { count: 0, budget: 0 },
      'SG Office': { count: 0, budget: 0 },
    };
    nonProgrammaticActivities.forEach(a => {
      if (counts[a.department]) {
        counts[a.department].count += 1;
        counts[a.department].budget += a.annual_budget || 0;
      }
    });
    return counts;
  }, [nonProgrammaticActivities]);

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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Budget ({selectedDept === 'ALL' ? 'All Depts' : selectedDept})</div>
            <div className="text-xl font-black text-slate-800 mt-0.5">{formatETB(totalBudget)}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {selectedDept === 'ALL' ? 'Total non-programmatic allocation' : `${((totalBudget / 29783175) * 100).toFixed(1)}% of non-programmatic total`}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Activities & Budget Lines</div>
            <div className="text-xl font-black text-slate-800 mt-0.5">{totalActivities}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              {filteredActivities.filter(a => a.is_admin_budget_line).length > 0
                ? `${filteredActivities.filter(a => !a.is_admin_budget_line).length} operational · ${filteredActivities.filter(a => a.is_admin_budget_line).length} admin line`
                : 'Operational activities'}
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Departments Included</div>
            <div className="text-xl font-black text-slate-800 mt-0.5">3 Entities</div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Legal (1.8M) · Supply Chain (8.91M) · SG & Academy (19.08M)
            </div>
          </div>
        </div>
      </div>

      {/* Department Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
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

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {selectedDept === 'ALL' ? 'All Non-Programmatic Entities' : selectedDept} ({filteredActivities.length})
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-slate-700">
            Total Budget: <span className="text-emerald-600">{formatETB(totalBudget)}</span>
          </span>
        </div>

        <div className="overflow-x-auto max-h-[650px] relative">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-800 text-white sticky top-0 z-20 text-[11px] font-bold tracking-wider">
              <tr>
                <th className="p-3 border-r border-slate-700 min-w-[200px]">Department</th>
                <th className="p-3 border-r border-slate-700 min-w-[360px]">Activity / Budget Line</th>
                <th className="p-3 border-r border-slate-700 min-w-[120px] text-center">Unit of Measure</th>
                <th className="p-3 border-r border-slate-700 min-w-[110px] text-right">Annual Target</th>
                <th className="p-3 border-r border-slate-700 min-w-[140px] text-right">Annual Budget</th>
                <th className="p-3 min-w-[100px] text-center">Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredActivities.map(a => {
                return (
                  <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 border-r border-slate-100 font-semibold text-slate-800">
                      <div className="flex items-center gap-1.5">
                        {a.department === 'Legal & Contract Administrator Department' && <ShieldCheck className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                        {a.department === 'Humanitarian Supply Chain Department' && <Truck className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                        {a.department === 'SG Office' && <Award className="w-3.5 h-3.5 text-purple-600 shrink-0" />}
                        <span>{a.department}</span>
                      </div>
                    </td>
                    <td className="p-3 border-r border-slate-100">
                      <div className="font-medium text-slate-900">{a.name}</div>
                    </td>
                    <td className="p-3 border-r border-slate-100 text-center text-slate-500 font-semibold">
                      {a.uom ? a.uom : '—'}
                    </td>
                    <td className="p-3 border-r border-slate-100 text-right font-mono text-slate-700 font-medium">
                      {a.annual_target != null && a.annual_target > 0
                        ? a.annual_target.toLocaleString()
                        : '—'}
                    </td>
                    <td className="p-3 border-r border-slate-100 text-right font-mono font-bold text-slate-900">
                      {formatETB(a.annual_budget)}
                    </td>
                    <td className="p-3 text-center">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          a.is_admin_budget_line
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {a.is_admin_budget_line ? 'Admin Line' : 'Operational'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-900 text-white font-extrabold text-xs sticky bottom-0 z-20">
              <tr className="border-t-2 border-slate-700">
                <td className="p-3 border-r border-slate-700" colSpan={3}>
                  SUBTOTAL ({filteredActivities.length} Items)
                </td>
                <td className="p-3 border-r border-slate-700 text-right font-mono text-slate-300">
                  —
                </td>
                <td className="p-3 border-r border-slate-700 text-right font-mono text-emerald-400">
                  {formatETB(totalBudget)}
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
