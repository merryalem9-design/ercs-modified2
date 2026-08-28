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
import { RegionDetailPage } from './pages/RegionDetailPage';
import { SubmissionsPage } from './pages/SubmissionsPage';
import { MonitoringRegisterPage } from './pages/MonitoringRegisterPage';
import { MonitoringDashboardPage } from './pages/MonitoringDashboardPage';
import { PerformancePage } from './pages/PerformancePage';

const RESTRICTED_FOR_AOP = new Set(['quarterly-plan', 'quarterly']);
// AOP is now allowed into 'monitoring-dashboard' (read-only) but still
// blocked from 'monitoring' (the Register) and 'performance' is AOP-only.
const MONITOR_ONLY_ROUTES = new Set(['monitoring']);
const AOP_ONLY_ROUTES = new Set(['performance']);

const MainLayout: React.FC = () => {
  const { activeRoute, setActiveRoute, currentRole, filters } = useApp();
  const isNationalAop = currentRole === 'National Activity AOP';
  const isMonitor = currentRole === 'Monitor';
  const isBranchHead = currentRole.startsWith('Branch Head — ');
  const isZoneCoordinator = currentRole.endsWith(' coordinators');

  const onRestrictedRoute = isNationalAop && RESTRICTED_FOR_AOP.has(activeRoute);
  const onMonitorOnlyRouteAsOther = !isMonitor && MONITOR_ONLY_ROUTES.has(activeRoute);
  const onAopOnlyRouteAsOther = !isNationalAop && AOP_ONLY_ROUTES.has(activeRoute);
  const monitorOffItsOwnRoutes = isMonitor && !['monitoring', 'monitoring-dashboard'].includes(activeRoute);

  React.useEffect(() => {
    if (onRestrictedRoute || onMonitorOnlyRouteAsOther || onAopOnlyRouteAsOther) setActiveRoute('plan');
    else if (monitorOffItsOwnRoutes) setActiveRoute('monitoring');
  }, [onRestrictedRoute, onMonitorOnlyRouteAsOther, onAopOnlyRouteAsOther, monitorOffItsOwnRoutes, setActiveRoute]);

  const renderContent = () => {
    if (onRestrictedRoute || onMonitorOnlyRouteAsOther || onAopOnlyRouteAsOther) return <PlanPage />;
    if (monitorOffItsOwnRoutes) return <MonitoringRegisterPage />;
    switch (activeRoute) {
      case 'plan': return <PlanPage />;
      case 'quarterly-plan': return <QuarterlyPlanPage />;
      case 'quarterly': return <QuarterlyEntryPage />;
      case 'report': return <ReportPage />;
      case 'national-detail': return <NationalActivityDetailPage />;
      case 'scope-detail': return <ScopeDetailPage />;
      case 'region-detail': return <RegionDetailPage />;
      case 'submissions': return <SubmissionsPage />;
      case 'monitoring': return <MonitoringRegisterPage />;
      case 'monitoring-dashboard': return <MonitoringDashboardPage />;
      case 'performance': return <PerformancePage />;
      default: return <PlanPage />;
    }
  };
  void isBranchHead; void isZoneCoordinator; void filters;

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