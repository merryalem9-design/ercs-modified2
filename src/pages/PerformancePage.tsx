// src/pages/PerformancePage.tsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FilterBar } from '../components/common/FilterBar';
import {
  sumPlannedTarget, sumActual, sumExpenditure, sumPlannedBudget, achievementPct, budgetUtilizationPct, convertToBeneficiaries, getStatusBadge,
} from '../utils/calculations';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend,
  PieChart, Pie, Cell,
} from 'recharts';
import { Target, Wallet, Users, MapPin, FolderGit2 } from 'lucide-react';

const OVER_BUDGET_BADGE = { label: 'Over Budget', color: 'bg-rose-100 text-rose-800 border-rose-300' };

const PIE_COLORS = ['#C8102E', '#1E293B', '#0EA5E9', '#F59E0B', '#10B981', '#8B5CF6', '#EC4899', '#14B8A6'];
const TARGET_COLOR = '#1E293B';
const ACTUAL_COLOR = '#C8102E';
const ACHIEVEMENT_ACCENT = '#0D9488';

export const PerformancePage: React.FC = () => {
  const { nationalActivities, regions, projects, quarterlyPlans, quarterlyActuals, uomConfigs, getFilteredPlanEntries } = useApp();
  const entries = getFilteredPlanEntries();
  const [groupBy, setGroupBy] = useState<'region' | 'project'>('region');

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

  // Panel 1 — Target vs Actual, toggleable between Region and Project
  // grouping. Only includes a Region/Project that actually has entries
  // under the current filter scope — otherwise every filter combination
  // padded the chart with zero-value bars for everything else, which made
  // "filter to one Region" look identical to "no filter" on this chart.
  const targetActualByRegion = regions
    .map(r => {
      const es = regionalEntries.filter(e => e.region_id === r.id);
      return { name: r.name, count: es.length, Target: sumPlannedTarget(es, quarterlyPlans, 'ALL'), Actual: sumActual(es, quarterlyActuals, 'ALL') };
    })
    .filter(row => row.count > 0);
  const targetActualByProject = projects
    .map(p => {
      const es = projectEntries.filter(e => e.project_id === p.id);
      return { name: p.name, count: es.length, Target: sumPlannedTarget(es, quarterlyPlans, 'ALL'), Actual: sumActual(es, quarterlyActuals, 'ALL') };
    })
    .filter(row => row.count > 0);
  const targetActualData = groupBy === 'region' ? targetActualByRegion : targetActualByProject;

  // Panel 2 — Budget distribution by National Activity, top 8 by aggregated Budget.
  const budgetByActivity = nationalActivities
    .map(na => {
      const es = entries.filter(e => e.national_activity_id === na.id);
      return { code: na.code, name: na.description, value: sumPlannedBudget(es, quarterlyPlans, 'ALL') };
    })
    .filter(row => row.value > 0)
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  // Panel 3 — Quarterly trend, over the currently filtered entries.
  const QUARTER_ORDER = ['Q1', 'Q2', 'Q3', 'Q4'] as const;
  const entryIds = new Set(entries.map(e => e.id));
  const actualsInScope = quarterlyActuals.filter(a => entryIds.has(a.plan_entry_id));
  const reportedQuarters = new Set(actualsInScope.map(a => a.quarter_id));
  let currentQuarterIdx = 0;
  QUARTER_ORDER.forEach((q, idx) => { if (reportedQuarters.has(q)) currentQuarterIdx = idx; });

  const lineData = QUARTER_ORDER.map((q, idx) => {
    const planned = sumPlannedTarget(entries, quarterlyPlans, q);
    const actual = idx <= currentQuarterIdx ? sumActual(entries, quarterlyActuals, q) : null;
    return { quarter: q, Planned: planned, Actual: actual };
  });

  // Panel 4 — Achievement % across Regions and Projects that have entries
  // in scope, sorted descending. Same "only what's actually there" fix as
  // Panel 1.
  const achievementComparisonData = [
    ...regions
      .map(r => {
        const es = regionalEntries.filter(e => e.region_id === r.id);
        if (es.length === 0) return null;
        return {
          name: r.name,
          achievement: Number(achievementPct(sumActual(es, quarterlyActuals, 'ALL'), sumPlannedTarget(es, quarterlyPlans, 'ALL')).toFixed(1)),
        };
      })
      .filter((row): row is { name: string; achievement: number } => row !== null),
    ...projects
      .map(p => {
        const es = projectEntries.filter(e => e.project_id === p.id);
        if (es.length === 0) return null;
        return {
          name: p.name,
          achievement: Number(achievementPct(sumActual(es, quarterlyActuals, 'ALL'), sumPlannedTarget(es, quarterlyPlans, 'ALL')).toFixed(1)),
        };
      })
      .filter((row): row is { name: string; achievement: number } => row !== null),
  ].sort((a, b) => b.achievement - a.achievement);

  const beneficiariesByRegion = regions
    .map(r => ({ name: r.name, count: regionalEntries.filter(e => e.region_id === r.id).length, value: beneficiariesFor(regionalEntries.filter(e => e.region_id === r.id)) }))
    .filter(row => row.count > 0);
  const beneficiariesByProject = projects
    .map(p => ({ name: p.name, count: projectEntries.filter(e => e.project_id === p.id).length, value: beneficiariesFor(projectEntries.filter(e => e.project_id === p.id)) }))
    .filter(row => row.count > 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black text-slate-800">Dashboard</h2>
        <p className="text-xs text-slate-500 mt-1">National-level KPIs, regional/project breakdowns, and planned vs. actual trend — computed live from the same bottom-up data as every other page, and scoped to whatever's currently filtered.</p>
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
        {/* Panel 1 — Target vs Actual, toggleable */}
        <div className="bg-white rounded-xl border shadow-sm p-4">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">Target vs Actual by {groupBy === 'region' ? 'Region' : 'Project'}</div>
            <div className="bg-slate-50 p-1 rounded-lg border inline-flex gap-1">
              <button onClick={() => setGroupBy('region')} className={`px-3 py-1 rounded text-[10px] font-bold ${groupBy === 'region' ? 'bg-ercs-red text-white' : 'text-slate-600 hover:bg-white'}`}>Region</button>
              <button onClick={() => setGroupBy('project')} className={`px-3 py-1 rounded text-[10px] font-bold ${groupBy === 'project' ? 'bg-ercs-red text-white' : 'text-slate-600 hover:bg-white'}`}>Project</button>
            </div>
          </div>
          {targetActualData.length === 0 ? (
            <div className="h-[260px] flex items-center justify-center text-xs text-slate-400">No data for this filter yet.</div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={targetActualData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Target" fill={TARGET_COLOR} name="Target" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Actual" fill={ACTUAL_COLOR} name="Actual" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Panel 2 — Budget distribution donut */}
        <ChartCard title="Budget Distribution by National Activity (Top 8)">
          {budgetByActivity.length === 0 ? (
            <div className="h-[260px] flex items-center justify-center text-xs text-slate-400">No data for this filter yet.</div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={budgetByActivity}
                  dataKey="value"
                  nameKey="code"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {budgetByActivity.map((entry, idx) => (
                    <Cell key={entry.code} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number, _name, ctx: any) => [`ETB ${Number(value).toLocaleString()}`, ctx?.payload?.name || '']} />
                <Legend
                  formatter={(_value, entry: any) => `${entry?.payload?.code} — ETB ${Number(entry?.payload?.value).toLocaleString()}`}
                  wrapperStyle={{ fontSize: 10 }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        {/* Panel 3 — Quarterly trend */}
        <ChartCard title="Quarterly Trend — Planned vs Actual (Q1–Q4)">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Planned" stroke={TARGET_COLOR} strokeWidth={2} dot />
              <Line type="monotone" dataKey="Actual" stroke={ACTUAL_COLOR} strokeWidth={2} dot connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Panel 4 — Achievement % comparison, horizontal */}
        <ChartCard title="Achievement % — Regions & Projects Compared">
          {achievementComparisonData.length === 0 ? (
            <div className="h-[260px] flex items-center justify-center text-xs text-slate-400">No data for this filter yet.</div>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={achievementComparisonData} layout="vertical" margin={{ left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={(v: number) => `${v}%`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={110} />
                <Tooltip formatter={(value: number) => [`${value}%`, 'Achievement']} />
                <Bar dataKey="achievement" fill={ACHIEVEMENT_ACCENT} name="Achievement %" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      <div className="bg-white rounded-xl border shadow-sm p-5">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Beneficiaries Reached</div>
        <div className="text-2xl font-black text-slate-800 mb-4">{totalBeneficiaries.toLocaleString()}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-[10px] uppercase font-extrabold text-slate-400 mb-2">By Region</div>
            {beneficiariesByRegion.length === 0 && <div className="text-xs text-slate-400">No data for this filter yet.</div>}
            {beneficiariesByRegion.map(r => (
              <div key={r.name} className="flex justify-between text-xs py-1 border-b last:border-0"><span className="font-semibold">{r.name}</span><span className="font-bold">{r.value.toLocaleString()}</span></div>
            ))}
          </div>
          <div>
            <div className="text-[10px] uppercase font-extrabold text-slate-400 mb-2">By Project</div>
            {beneficiariesByProject.length === 0 && <div className="text-xs text-slate-400">No data for this filter yet.</div>}
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