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
import { StrategicPlanPage } from './pages/StrategicPlanPage';
import { QuarterlyPlanSubmissionsPage } from './pages/QuarterlyPlanSubmissionsPage';
import { QuarterlyActualSubmissionsPage } from './pages/QuarterlyActualSubmissionsPage';
import { ProjectQuarterlyPlanSubmissionsPage } from './pages/ProjectQuarterlyPlanSubmissionsPage';
import { ProjectQuarterlyActualSubmissionsPage } from './pages/ProjectQuarterlyActualSubmissionsPage';
import { StrategicKpiPage } from './pages/StrategicKpiPage';
import { KnowledgeLibraryPage } from './pages/KnowledgeLibraryPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ProjectConfigurationPage } from './pages/ProjectConfigurationPage';

const RESTRICTED_FOR_AOP = new Set(['quarterly-plan', 'quarterly']);

// AOP creates activities; Zone/Project coordinators plan & enter. AOP is
// blocked from 'monitoring' (the Register). 'performance' (Dashboard) and
// 'strategic-plan' are AOP-only.
const MONITOR_ONLY_ROUTES = new Set(['monitoring']);
const AOP_ONLY_ROUTES = new Set(['performance', 'strategic-plan']);
// Branch Head no longer plans/enters quarterly figures or uses the generic
// Submissions list — they use 'quarterly-plan-submissions' and
// 'quarterly-actual-submissions' instead.
const RESTRICTED_FOR_BRANCH_HEAD = new Set(['quarterly-plan', 'quarterly', 'submissions']);
// Program Director is restricted away from direct-entry routes the same way.
const RESTRICTED_FOR_PD = new Set(['quarterly-plan', 'quarterly', 'submissions']);

const MainLayout: React.FC = () => {
  const { activeRoute, setActiveRoute, currentRole, filters } = useApp();
  const isNationalAop = currentRole === 'National Activity AOP';
  const isMonitor = currentRole === 'PMER Officer';
  const isBranchHead = currentRole.startsWith('Branch Head — ');
  const isZoneCoordinator = currentRole.endsWith(' coordinators');
  const isProgramDirector = currentRole === 'Program Director';
  const isSystemAdmin = currentRole === 'System Admin';

  const onRestrictedRoute = isNationalAop && RESTRICTED_FOR_AOP.has(activeRoute);
  const onMonitorOnlyRouteAsOther = !isMonitor && MONITOR_ONLY_ROUTES.has(activeRoute);
  const onAopOnlyRouteAsOther = !isNationalAop && AOP_ONLY_ROUTES.has(activeRoute);
  const onRestrictedRouteForBranchHead = isBranchHead && RESTRICTED_FOR_BRANCH_HEAD.has(activeRoute);
  const onRestrictedRouteForPd = isProgramDirector && RESTRICTED_FOR_PD.has(activeRoute);
  const monitorOffItsOwnRoutes = isMonitor && !['monitoring', 'monitoring-dashboard', 'strategic-kpi', 'knowledge-library'].includes(activeRoute);
  const adminOffItsOwnRoutes = isSystemAdmin && activeRoute !== 'admin-settings';

  React.useEffect(() => {
    if (
      onRestrictedRoute ||
      onMonitorOnlyRouteAsOther ||
      onAopOnlyRouteAsOther ||
      onRestrictedRouteForBranchHead ||
      onRestrictedRouteForPd
    ) {
      setActiveRoute('plan');
    } else if (monitorOffItsOwnRoutes) {
      setActiveRoute('monitoring');
    } else if (adminOffItsOwnRoutes) {
      setActiveRoute('admin-settings');
    }
  }, [
    onRestrictedRoute,
    onMonitorOnlyRouteAsOther,
    onAopOnlyRouteAsOther,
    onRestrictedRouteForBranchHead,
    onRestrictedRouteForPd,
    monitorOffItsOwnRoutes,
    adminOffItsOwnRoutes,
    setActiveRoute,
  ]);

  const renderContent = () => {
    if (
      onRestrictedRoute ||
      onMonitorOnlyRouteAsOther ||
      onAopOnlyRouteAsOther ||
      onRestrictedRouteForBranchHead ||
      onRestrictedRouteForPd
    ) {
      return <PlanPage />;
    }
    if (monitorOffItsOwnRoutes) return <MonitoringRegisterPage />;
    if (adminOffItsOwnRoutes) return <AdminSettingsPage />;

    switch (activeRoute) {
      case 'plan': return <PlanPage />;
      case 'project-configuration': return <ProjectConfigurationPage />;
      case 'quarterly-plan': return <QuarterlyPlanPage />;
      case 'quarterly-plan-submissions': return <QuarterlyPlanSubmissionsPage />;
      case 'quarterly-actual-submissions': return <QuarterlyActualSubmissionsPage />;
      case 'project-quarterly-plan-submissions': return <ProjectQuarterlyPlanSubmissionsPage />;
      case 'project-quarterly-actual-submissions': return <ProjectQuarterlyActualSubmissionsPage />;
      case 'quarterly': return <QuarterlyEntryPage />;
      case 'report': return <ReportPage />;
      case 'national-detail': return <NationalActivityDetailPage />;
      case 'scope-detail': return <ScopeDetailPage />;
      case 'region-detail': return <RegionDetailPage />;
      case 'submissions': return <SubmissionsPage />;
      case 'monitoring': return <MonitoringRegisterPage />;
      case 'monitoring-dashboard': return <MonitoringDashboardPage />;
      case 'performance': return <PerformancePage />;
      case 'strategic-plan': return <StrategicPlanPage />;
      case 'strategic-kpi': return <StrategicKpiPage />;
      case 'knowledge-library': return <KnowledgeLibraryPage />;
      case 'admin-settings': return <AdminSettingsPage />;
      case 'notifications': return <NotificationsPage />;
      default: return <PlanPage />;
    }
  };

  void isZoneCoordinator; void filters;

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