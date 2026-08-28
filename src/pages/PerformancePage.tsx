// src/pages/PerformancePage.tsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { FilterBar } from '../components/common/FilterBar';
import {
  sumPlannedTarget, sumActual, sumExpenditure, sumPlannedBudget, achievementPct, budgetUtilizationPct, convertToBeneficiaries, getStatusBadge,
} from '../utils/calculations';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { Target, Wallet, Users, MapPin, FolderGit2 } from 'lucide-react';

const OVER_BUDGET_BADGE = { label: 'Over Budget', color: 'bg-rose-100 text-rose-800 border-rose-300' };

export const PerformancePage: React.FC = () => {
  const { nationalActivities, regions, projects, quarterlyPlans, quarterlyActuals, uomConfigs, getFilteredPlanEntries } = useApp();
  const entries = getFilteredPlanEntries();

  const regionalEntries = entries.filter(e => e.scope_type === 'Regional');
  const projectEntries = entries.filter(e => e.scope_type === 'Project');

  const nationalTarget = sumPlannedTarget(entries, quarterlyPlans, 'ALL');
  const nationalActual = sumActual(entries, quarterlyActuals, 'ALL');
  const nationalAchievement = achievementPct(nationalActual, nationalTarget);

  const regionalTarget = sumPlannedTarget(regionalEntries, quarterlyPlans, 'ALL');
  const regionalActual = sumActual(regionalEntries, quarterlyActuals, 'ALL');
  const regionalAchievement = achievementPct(regionalActual, regionalTarget);

  const projectTarget = sumPlannedTarget(projectEntries, quarterlyPlans, 'ALL');
  const projectActual = sumActual(projectEntries, quarterlyActuals, 'ALL');
  const projectAchievement = achievementPct(projectActual, projectTarget);

  const budget = sumPlannedBudget(entries, quarterlyPlans, 'ALL');
  const spent = sumExpenditure(entries, quarterlyActuals, 'ALL');
  const utilization = budgetUtilizationPct(spent, budget);

  const beneficiariesFor = (es: typeof entries) => es.reduce((sum, e) => {
    const na = nationalActivities.find(n => n.id === e.national_activity_id);
    const a = sumActual([e], quarterlyActuals, 'ALL');
    return sum + convertToBeneficiaries(a, na?.uom || '', uomConfigs);
  }, 0);
  const totalBeneficiaries = beneficiariesFor(entries);

  const byRegionData = regions.map(r => {
    const es = regionalEntries.filter(e => e.region_id === r.id);
    return { name: r.name, achievement: Number(achievementPct(sumActual(es, quarterlyActuals, 'ALL'), sumPlannedTarget(es, quarterlyPlans, 'ALL')).toFixed(1)) };
  });
  const byProjectData = projects.map(p => {
    const es = projectEntries.filter(e => e.project_id === p.id);
    return { name: p.name, achievement: Number(achievementPct(sumActual(es, quarterlyActuals, 'ALL'), sumPlannedTarget(es, quarterlyPlans, 'ALL')).toFixed(1)) };
  });

  // A8: current reporting quarter = highest QuarterId with any QuarterlyActual row.
  const QUARTER_ORDER = ['Q1', 'Q2', 'Q3', 'Q4'] as const;
  const reportedQuarters = new Set(quarterlyActuals.map(a => a.quarter_id));
  let currentQuarterIdx = 0;
  QUARTER_ORDER.forEach((q, idx) => { if (reportedQuarters.has(q)) currentQuarterIdx = idx; });

  const lineData = QUARTER_ORDER.map((q, idx) => {
    const planned = sumPlannedTarget(entries, quarterlyPlans, q);
    const actual = idx <= currentQuarterIdx ? sumActual(entries, quarterlyActuals, q) : null;
    return { quarter: q, Planned: planned, Actual: actual };
  });

  const beneficiariesByRegion = regions.map(r => ({ name: r.name, value: beneficiariesFor(regionalEntries.filter(e => e.region_id === r.id)) }));
  const beneficiariesByProject = projects.map(p => ({ name: p.name, value: beneficiariesFor(projectEntries.filter(e => e.project_id === p.id)) }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Performance</h2>
        <p className="text-xs text-slate-500 mt-1">National-level KPIs, regional/project breakdowns, and planned vs. actual trend — computed live from the same bottom-up data as every other page.</p>
      </div>

      <FilterBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard icon={Target} title="National Achievement" val={`${nationalAchievement.toFixed(1)}%`} sub={`${nationalActual.toLocaleString()} / ${nationalTarget.toLocaleString()}`} badge={getStatusBadge(nationalAchievement, nationalActual > 0)} />
        <KPICard icon={MapPin} title="Regional Achievement" val={`${regionalAchievement.toFixed(1)}%`} sub={`${regionalActual.toLocaleString()} / ${regionalTarget.toLocaleString()}`} />
        <KPICard icon={FolderGit2} title="HQ/Project Achievement" val={`${projectAchievement.toFixed(1)}%`} sub={`${projectActual.toLocaleString()} / ${projectTarget.toLocaleString()}`} />
        <KPICard icon={Wallet} title="Budget Utilization" val={`${utilization.toFixed(1)}%`} sub={`ETB ${spent.toLocaleString()} / ${budget.toLocaleString()}`} badge={utilization > 100 ? OVER_BUDGET_BADGE : undefined} />
        <KPICard icon={Users} title="Total Beneficiaries" val={totalBeneficiaries.toLocaleString()} sub="Actual × UOM Conversion Factor" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Performance by Region">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byRegionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="achievement" fill="#C8102E" name="Achievement %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Performance by Project">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byProjectData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="achievement" fill="#1E293B" name="Achievement %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <ChartCard title="Quarterly Performance — Planned vs Actual">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 10 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Planned" stroke="#1E293B" strokeWidth={2} dot />
            <Line type="monotone" dataKey="Actual" stroke="#C8102E" strokeWidth={2} dot connectNulls={false} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="bg-white rounded-xl border shadow-sm p-5">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Beneficiaries Reached</div>
        <div className="text-2xl font-black text-slate-800 mb-4">{totalBeneficiaries.toLocaleString()}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] uppercase font-extrabold text-slate-400 mb-2">By Region</div>
            {beneficiariesByRegion.map(r => (
              <div key={r.name} className="flex justify-between text-xs py-1 border-b last:border-0"><span className="font-semibold">{r.name}</span><span className="font-bold">{r.value.toLocaleString()}</span></div>
            ))}
          </div>
          <div>
            <div className="text-[10px] uppercase font-extrabold text-slate-400 mb-2">By Project</div>
            {beneficiariesByProject.map(p => (
              <div key={p.name} className="flex justify-between text-xs py-1 border-b last:border-0"><span className="font-semibold">{p.name}</span><span className="font-bold">{p.value.toLocaleString()}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const KPICard: React.FC<{ icon: any; title: string; val: React.ReactNode; sub?: React.ReactNode; badge?: { label: string; color: string } }> = ({ icon: Icon, title, val, sub, badge }) => (
  <div className="bg-white p-4 rounded-xl border shadow-sm">
    <div className="flex justify-between mb-2 text-xs font-bold text-slate-500"><span>{title}</span><Icon className="w-4 h-4" /></div>
    <div className="flex items-center gap-2 flex-wrap">
      <div className="text-xl font-black text-slate-800">{val}</div>
      {badge && <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border ${badge.color}`}>{badge.label}</span>}
    </div>
    {sub && <div className="text-[10px] mt-1 text-slate-500">{sub}</div>}
  </div>
);

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white rounded-xl border shadow-sm p-4">
    <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">{title}</div>
    {children}
  </div>
);