// src/pages/PerformancePage.tsx
import React, { useState } from 'react';
import { DashboardTabs } from '../components/dashboard/DashboardTabs';
import { DashboardTabId, DASHBOARD_TABS } from '../components/dashboard/dashboardUtils';
import { ExecutiveOverviewTab } from '../components/dashboard/ExecutiveOverviewTab';
import { CommunityImpactTab } from '../components/dashboard/CommunityImpactTab';
import { DirectCommunityDrilldownTab } from '../components/dashboard/DirectCommunityDrilldownTab';
import { EnablingPrioritiesTab } from '../components/dashboard/EnablingPrioritiesTab';
import { DepartmentsAndFinanceTab } from '../components/dashboard/DepartmentsAndFinanceTab';
import { LayoutDashboard } from 'lucide-react';

export const PerformancePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTabId>('executive');

  const currentTabInfo = DASHBOARD_TABS.find(t => t.id === activeTab);

  return (
    <div className="space-y-4">
      {/* Page Title & Subtitle */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-ercs-red" />
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              Performance Dashboard
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {currentTabInfo?.description ||
              'National KPIs, programmatic trends, branch rankings, and financial performance'}
          </p>
        </div>
      </div>

      {/* 5-Tab Navigation Bar */}
      <DashboardTabs activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Tab Panels */}
      <div>
        {activeTab === 'executive' && <ExecutiveOverviewTab />}
        {activeTab === 'community' && <CommunityImpactTab />}
        {activeTab === 'direct' && <DirectCommunityDrilldownTab />}
        {activeTab === 'enabling' && <EnablingPrioritiesTab />}
        {activeTab === 'departments' && <DepartmentsAndFinanceTab />}
      </div>
    </div>
  );
};