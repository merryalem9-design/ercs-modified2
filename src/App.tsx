// src/App.tsx
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Toast } from './components/common/Toast';
import { PlanPage } from './pages/PlanPage';
import { QuarterlyPlanPage } from './pages/QuarterlyPlanPage';
import { QuarterlyEntryPage } from './pages/QuarterlyEntryPage';
import { ReportPage } from './pages/ReportPage';
import { NationalActivityDetailPage } from './pages/NationalActivityDetailPage';
import { ScopeDetailPage } from './pages/ScopeDetailPage';
import { SubmissionsPage } from './pages/SubmissionsPage';
import { MonitoringRegisterPage } from './pages/MonitoringRegisterPage';
import { MonitoringDashboardPage } from './pages/MonitoringDashboardPage';

// Quarterly Plan / Quarterly Actual Entry are not applicable to the
// National Activity AOP role — it never owns a Region/Project scope to
// submit them under (see AppContext's upsertQuarterlyPlan/upsertQuarterlyActual).
const RESTRICTED_FOR_AOP = new Set(['quarterly-plan', 'quarterly']);

// The Monitoring module (both the Register and the Dashboard) is
// exclusively the Monitor role's — see AppContext's upsertMonitoringRecord,
// which also refuses writes from any other role. Every other role is
// bounced back to Plan if it somehow ends up on either route (e.g. a stale
// persisted route from a previous session).
const MONITOR_ONLY_ROUTES = new Set(['monitoring', 'monitoring-dashboard']);

const MainLayout: React.FC = () => {
  const { activeRoute, setActiveRoute, currentRole } = useApp();
  const isNationalAop = currentRole === 'National Activity AOP';
  const isMonitor = currentRole === 'Monitor';
  const onRestrictedRoute = isNationalAop && RESTRICTED_FOR_AOP.has(activeRoute);
  const onMonitorOnlyRouteAsOther = !isMonitor && MONITOR_ONLY_ROUTES.has(activeRoute);
  // The Monitor role's entire job is the Monitoring module — it has
  // nothing to do on Plan/Quarterly/Report/Submissions/detail pages, so it
  // is always kept on one of its own routes regardless of what route it's
  // carrying over from a role switch or a previous session. Kept on
  // 'monitoring' (the Register) specifically — same fallback as before this
  // split, just the smaller behavioral change versus defaulting to the
  // Dashboard instead.
  const monitorOffItsOwnRoutes = isMonitor && !MONITOR_ONLY_ROUTES.has(activeRoute);

  // Covers a persisted activeRoute left over from a previous coordinator
  // session before the role was switched to AOP/Monitor directly in localStorage.
  React.useEffect(() => {
    if (onRestrictedRoute || onMonitorOnlyRouteAsOther) setActiveRoute('plan');
    else if (monitorOffItsOwnRoutes) setActiveRoute('monitoring');
  }, [onRestrictedRoute, onMonitorOnlyRouteAsOther, monitorOffItsOwnRoutes, setActiveRoute]);

  const renderContent = () => {
    if (onRestrictedRoute || onMonitorOnlyRouteAsOther) return <PlanPage />;
    if (monitorOffItsOwnRoutes) return <MonitoringRegisterPage />;
    switch (activeRoute) {
      case 'plan': return <PlanPage />;
      case 'quarterly-plan': return <QuarterlyPlanPage />;
      case 'quarterly': return <QuarterlyEntryPage />;
      case 'report': return <ReportPage />;
      case 'national-detail': return <NationalActivityDetailPage />;
      case 'scope-detail': return <ScopeDetailPage />;
      case 'submissions': return <SubmissionsPage />;
      case 'monitoring': return <MonitoringRegisterPage />;
      case 'monitoring-dashboard': return <MonitoringDashboardPage />;
      default: return <PlanPage />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{renderContent()}</main>
      </div>
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}