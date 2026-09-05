import React from 'react';
import { DASHBOARD_TABS, DashboardTabId } from './dashboardUtils';

interface DashboardTabsProps {
  activeTab: DashboardTabId;
  onSelectTab: (tab: DashboardTabId) => void;
}

export const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeTab, onSelectTab }) => {
  return (
    <div className="border-b border-slate-200 bg-white px-2 pt-2 rounded-t-xl shadow-xs">
      <nav className="flex space-x-1 sm:space-x-4 overflow-x-auto scrollbar-none" aria-label="Dashboard Tabs">
        {DASHBOARD_TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`whitespace-nowrap py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'border-ercs-red text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
