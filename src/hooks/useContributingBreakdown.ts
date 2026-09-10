// src/hooks/useContributingBreakdown.ts
import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  sumPlannedTarget,
  sumPlannedBudget,
  sumActual,
  sumExpenditure,
  achievementPct,
} from '../utils/calculations';
import { QuarterFilterValue, QuarterId, PlanEntry, Region, Project, Zone } from '../types';

export interface ContributingZoneItem {
  zone: Zone;
  entries: PlanEntry[];
  target: number;
  budget: number;
  actual: number;
  spent: number;
  ach: number;
}

export interface ContributingRegionItem {
  region: Region;
  entries: PlanEntry[];
  target: number;
  budget: number;
  actual: number;
  spent: number;
  ach: number;
  targetPct: number;
  budgetPct: number;
  achievedPct: number;
  hasBaseline: boolean;
  zones: ContributingZoneItem[];
}

export interface ContributingProjectItem {
  project: Project;
  entries: PlanEntry[];
  target: number;
  budget: number;
  actual: number;
  spent: number;
  ach: number;
  targetPct: number;
  budgetPct: number;
  achievedPct: number;
  hasBaseline: boolean;
}

export interface UseContributingBreakdownProps {
  nationalActivityId: string;
  quarterId?: QuarterFilterValue;
  scopeFilter?: 'Regional' | 'Project';
  assignedRegionId?: string;
  assignedProjectId?: string;
  isBranchHead?: boolean;
}

export function useContributingBreakdown({
  nationalActivityId,
  quarterId: propQuarterId,
  scopeFilter: propScopeFilter,
  assignedRegionId: propAssignedRegionId,
  assignedProjectId: propAssignedProjectId,
  isBranchHead: propIsBranchHead,
}: UseContributingBreakdownProps) {
  const {
    nationalActivities,
    projects,
    regions,
    zones,
    planEntries,
    quarterlyPlans,
    quarterlyActuals,
    regionActivityLinks,
    filters,
    currentRole,
  } = useApp();

  const q = propQuarterId || filters.quarterId || 'ALL';
  const na = nationalActivities.find(n => n.id === nationalActivityId);

  // Helper to sum quarterly target/budget across entries for a given quarter
  const getQuarterPlan = (entries: PlanEntry[], qId: QuarterId) => ({
    target: entries.reduce(
      (s, e) => s + (quarterlyPlans.find(qp => qp.plan_entry_id === e.id && qp.quarter_id === qId)?.target ?? 0),
      0
    ),
    budget: entries.reduce(
      (s, e) => s + (quarterlyPlans.find(qp => qp.plan_entry_id === e.id && qp.quarter_id === qId)?.budget ?? 0),
      0
    ),
  });

  // Helper to sum quarterly actual/spent across entries for a given quarter
  const getQuarterActual = (entries: PlanEntry[], qId: QuarterId) => ({
    actual: entries.reduce(
      (s, e) => s + (quarterlyActuals.find(qa => qa.plan_entry_id === e.id && qa.quarter_id === qId)?.actual ?? 0),
      0
    ),
    spent: entries.reduce(
      (s, e) => s + (quarterlyActuals.find(qa => qa.plan_entry_id === e.id && qa.quarter_id === qId)?.expenditure ?? 0),
      0
    ),
  });

  // In-scope plan entries for this national activity
  const naEntries = useMemo(() => {
    return planEntries.filter(pe => pe.national_activity_id === nationalActivityId && pe.is_contributing !== false);
  }, [planEntries, nationalActivityId]);

  // Contributing Projects: linked via eligible_project_ids OR project_targets OR existing PlanEntries
  const contributingProjects = useMemo(() => {
    if (!na) return [];
    const eligibleSet = new Set(na.eligible_project_ids || []);
    if (na.project_targets) {
      Object.keys(na.project_targets).forEach(k => eligibleSet.add(k));
    }
    naEntries
      .filter(pe => pe.scope_type === 'Project' && pe.project_id)
      .forEach(pe => eligibleSet.add(pe.project_id as string));

    const activeProjects = projects.filter(p => eligibleSet.has(p.id));

    return activeProjects.map(proj => {
      const projEntries = naEntries.filter(pe => pe.scope_type === 'Project' && pe.project_id === proj.id);

      const seeded = na.project_targets?.[proj.id];
      const seededTarget = seeded?.target ?? 0;
      const seededBudget = seeded?.budget ?? 0;

      const planTarget = sumPlannedTarget(projEntries, quarterlyPlans, q);
      const planBudget = sumPlannedBudget(projEntries, quarterlyPlans, q);

      const target = q === 'ALL'
        ? (seededTarget > 0 ? seededTarget : planTarget)
        : (planTarget > 0 ? planTarget : seededTarget);

      const budget = q === 'ALL'
        ? (seededBudget > 0 ? seededBudget : planBudget)
        : (planBudget > 0 ? planBudget : seededBudget);

      const hasBaseline = seededTarget > 0 || seededBudget > 0 || planTarget > 0 || planBudget > 0;

      const actual = sumActual(projEntries, quarterlyActuals, q);
      const spent = sumExpenditure(projEntries, quarterlyActuals, q);
      const ach = achievementPct(actual, target);

      return {
        project: proj,
        entries: projEntries,
        target,
        budget,
        actual,
        spent,
        ach,
        hasBaseline,
        targetPct: 0,
        budgetPct: 0,
        achievedPct: 0,
      };
    });
  }, [na, naEntries, projects, quarterlyPlans, quarterlyActuals, q]);

  // Contributing Regions: linked via eligible_region_ids OR regional_targets OR RegionActivityLinks OR PlanEntries
  const contributingRegions = useMemo(() => {
    if (!na) return [];
    const eligibleSet = new Set(na.eligible_region_ids || []);
    if (na.regional_targets) {
      Object.entries(na.regional_targets).forEach(([rId, t]) => {
        if ((t?.target ?? 0) > 0 || (t?.budget ?? 0) > 0) {
          eligibleSet.add(rId);
        }
      });
    }
    naEntries
      .filter(pe => pe.scope_type === 'Regional' && pe.region_id)
      .forEach(pe => eligibleSet.add(pe.region_id as string));
    regionActivityLinks
      .filter(l => l.national_activity_id === na.id)
      .forEach(l => eligibleSet.add(l.region_id));

    const activeRegions = regions.filter(r => eligibleSet.has(r.id));

    return activeRegions.map(reg => {
      const regEntries = naEntries.filter(pe => pe.scope_type === 'Regional' && pe.region_id === reg.id);

      const seeded = na.regional_targets?.[reg.id];
      const seededTarget = seeded?.target ?? 0;
      const seededBudget = seeded?.budget ?? 0;

      const planTarget = sumPlannedTarget(regEntries, quarterlyPlans, q);
      const planBudget = sumPlannedBudget(regEntries, quarterlyPlans, q);

      const target = q === 'ALL'
        ? (seededTarget > 0 ? seededTarget : planTarget)
        : (planTarget > 0 ? planTarget : seededTarget);

      const budget = q === 'ALL'
        ? (seededBudget > 0 ? seededBudget : planBudget)
        : (planBudget > 0 ? planBudget : seededBudget);

      const hasBaseline = seededTarget > 0 || seededBudget > 0 || planTarget > 0 || planBudget > 0;

      const actual = sumActual(regEntries, quarterlyActuals, q);
      const spent = sumExpenditure(regEntries, quarterlyActuals, q);
      const ach = achievementPct(actual, target);

      // Zone-level breakdown for this region
      const regionZones = zones.filter(z => z.region_id === reg.id);
      const relLinks = regionActivityLinks.filter(l => l.region_id === reg.id && l.national_activity_id === na.id);
      const linkedZoneIds = new Set<string>();
      relLinks.forEach(l => l.eligible_zone_ids?.forEach(zid => linkedZoneIds.add(zid)));

      const contributingZones: ContributingZoneItem[] = regionZones
        .map(z => {
          const zEntries = regEntries.filter(pe => pe.zone_id === z.id);
          const zTarget = sumPlannedTarget(zEntries, quarterlyPlans, q);
          const zBudget = sumPlannedBudget(zEntries, quarterlyPlans, q);
          const zActual = sumActual(zEntries, quarterlyActuals, q);
          const zSpent = sumExpenditure(zEntries, quarterlyActuals, q);
          const zAch = achievementPct(zActual, zTarget);
          return {
            zone: z,
            entries: zEntries,
            target: zTarget,
            budget: zBudget,
            actual: zActual,
            spent: zSpent,
            ach: zAch,
          };
        })
        .filter((item): item is ContributingZoneItem => item.entries.length > 0 || linkedZoneIds.has(item.zone.id));

      return {
        region: reg,
        entries: regEntries,
        target,
        budget,
        actual,
        spent,
        ach,
        hasBaseline,
        targetPct: 0,
        budgetPct: 0,
        achievedPct: 0,
        zones: contributingZones,
      };
    });
  }, [na, naEntries, regionActivityLinks, regions, zones, quarterlyPlans, quarterlyActuals, q]);

  // Total Activity Target & Budget across all contributors (denominator for percentages)
  const totalActivityTarget = useMemo(() => {
    const regSum = contributingRegions.reduce((sum, r) => sum + (r.target || 0), 0);
    const projSum = contributingProjects.reduce((sum, p) => sum + (p.target || 0), 0);
    return regSum + projSum;
  }, [contributingRegions, contributingProjects]);

  const totalActivityBudget = useMemo(() => {
    const regSum = contributingRegions.reduce((sum, r) => sum + (r.budget || 0), 0);
    const projSum = contributingProjects.reduce((sum, p) => sum + (p.budget || 0), 0);
    return regSum + projSum;
  }, [contributingRegions, contributingProjects]);

  // Compute percentages
  contributingRegions.forEach(r => {
    r.targetPct = totalActivityTarget > 0 ? (r.target / totalActivityTarget) * 100 : 0;
    r.budgetPct = totalActivityBudget > 0 ? (r.budget / totalActivityBudget) * 100 : 0;
    r.achievedPct = totalActivityTarget > 0 ? (r.actual / totalActivityTarget) * 100 : 0;
  });

  contributingProjects.forEach(p => {
    p.targetPct = totalActivityTarget > 0 ? (p.target / totalActivityTarget) * 100 : 0;
    p.budgetPct = totalActivityBudget > 0 ? (p.budget / totalActivityBudget) * 100 : 0;
    p.achievedPct = totalActivityTarget > 0 ? (p.actual / totalActivityTarget) * 100 : 0;
  });

  const isRegionalRole = Boolean(
    propIsBranchHead ||
    currentRole.startsWith('Branch Head — ') ||
    currentRole.endsWith(' coordinators')
  );
  const isProjectRole = currentRole.startsWith('Project Coordinator');
  const effectiveScopeFilter = propScopeFilter || (isRegionalRole ? 'Regional' : isProjectRole ? 'Project' : undefined);

  const effectiveRegionId = propAssignedRegionId || (
    currentRole.startsWith('Branch Head — ')
      ? regions.find(r => `Branch Head — ${r.name}` === currentRole)?.id
      : currentRole.endsWith(' coordinators')
        ? zones.find(z => `${z.name} coordinators` === currentRole)?.region_id
        : undefined
  );

  const effectiveProjectId = propAssignedProjectId || (
    currentRole.startsWith('Project Coordinator — ') && currentRole !== 'Project Coordinator — HQ'
      ? projects.find(p => `Project Coordinator — ${p.name}` === currentRole)?.id
      : undefined
  );

  const displayedRegions: ContributingRegionItem[] = useMemo(() => {
    if (effectiveScopeFilter === 'Project') return [];
    if (effectiveRegionId) {
      return contributingRegions.filter(r => r.region.id === effectiveRegionId);
    }
    return contributingRegions;
  }, [contributingRegions, effectiveScopeFilter, effectiveRegionId]);

  const displayedProjects: ContributingProjectItem[] = useMemo(() => {
    if (effectiveScopeFilter === 'Regional') return [];
    if (effectiveProjectId) {
      return contributingProjects.filter(p => p.project.id === effectiveProjectId);
    }
    return contributingProjects;
  }, [contributingProjects, effectiveScopeFilter, effectiveProjectId]);

  return {
    na,
    q,
    contributingRegions,
    contributingProjects,
    displayedRegions,
    displayedProjects,
    totalActivityTarget,
    totalActivityBudget,
    getQuarterPlan,
    getQuarterActual,
    isRegionalRole,
    isProjectRole,
    effectiveScopeFilter,
    effectiveRegionId,
    effectiveProjectId,
    quarterlyPlans,
    quarterlyActuals,
  };
}
