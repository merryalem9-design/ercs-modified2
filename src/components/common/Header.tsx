import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const { currentRole, setCurrentRole, setActiveRoute, setFilters, regions, projects, zones } = useApp();

  const roles: UserRole[] = [
    'National Activity AOP',
    ...regions.map(region => `Branch Head — ${region.name}` as UserRole),
    ...projects.map(project => `Project Coordinator — ${project.name}` as UserRole),
    'Monitor',
  ];

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    setFilters(prev => ({
      ...prev,
      strategicPriorityId: 'ALL',
      nationalActivityId: 'ALL',
      regionId: 'ALL',
      projectId: 'ALL',
      zoneId: 'ALL',
    }));
    setActiveRoute('plan');
  };

  const branchHeadPrefix = 'Branch Head — ';
  const isBranchHead = currentRole.startsWith(branchHeadPrefix);
  const isZoneCoordinator = currentRole.endsWith(' coordinators');
  const showActingZone = isBranchHead || isZoneCoordinator;

  const activeRegionName = isBranchHead
    ? currentRole.slice(branchHeadPrefix.length)
    : isZoneCoordinator
      ? zones.find(z => z.name === currentRole.slice(0, -' coordinators'.length))?.region_id
        ? regions.find(r => r.id === zones.find(z => z.name === currentRole.slice(0, -' coordinators'.length))?.region_id)?.name
        : undefined
      : undefined;

  const activeRegion = regions.find(r => r.name === activeRegionName);
  const zonesInRegion = activeRegion ? zones.filter(z => z.region_id === activeRegion.id) : [];

  const handleActingZoneChange = (value: string) => {
    if (!activeRegion) return;
    if (value === 'REGION_WIDE') {
      handleRoleChange(`Branch Head — ${activeRegion.name}` as UserRole);
    } else {
      const zone = zones.find(z => z.id === value);
      if (zone) handleRoleChange(`${zone.name} coordinators` as UserRole);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 min-h-16 px-6 py-2 flex items-center justify-between gap-4 sticky top-0 z-20 shadow-sm">
      <h1 className="text-lg font-bold text-slate-800 tracking-tight whitespace-nowrap">
        ERCS AoP — Plan, Report &amp; Aggregation Prototype
      </h1>
      <div className="flex items-center gap-3">
        <div className="min-w-72">
          <label className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-0.5">Current User / Role</label>
          <select
            value={isZoneCoordinator ? `Branch Head — ${activeRegionName}` : currentRole}
            onChange={e => handleRoleChange(e.target.value as UserRole)}
            className="w-full text-[11px] font-bold border border-slate-200 rounded-lg bg-slate-50 px-2.5 py-1.5 text-slate-700"
          >
            {roles.map(role => <option key={role} value={role}>{role}</option>)}
          </select>
        </div>

        {showActingZone && activeRegion && (
          <div className="min-w-56">
            <label className="block text-[9px] font-extrabold uppercase tracking-wider text-slate-400 mb-0.5">Acting Zone</label>
            <select
              value={isZoneCoordinator ? (zones.find(z => z.name === currentRole.slice(0, -' coordinators'.length))?.id || '') : 'REGION_WIDE'}
              onChange={e => handleActingZoneChange(e.target.value)}
              className="w-full text-[11px] font-bold border border-slate-200 rounded-lg bg-slate-50 px-2.5 py-1.5 text-slate-700"
            >
              <option value="REGION_WIDE">— Region-wide (Branch Head) —</option>
              {zonesInRegion.map(z => <option key={z.id} value={z.id}>{z.name}</option>)}
            </select>
          </div>
        )}

        <div className="text-[10px] font-extrabold uppercase px-2.5 py-1.5 rounded-full border bg-blue-50 text-blue-700 border-blue-200">
          FY 2026
        </div>
      </div>
    </header>
  );
};