import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusThresholdBand } from '../../types';
import { getStatusBadge } from '../../utils/calculations';

interface Props {
  achievementPct: number;
  hasActuals?: boolean;
  thresholds?: StatusThresholdBand[];
}

export const StatusBadge: React.FC<Props> = ({ achievementPct, hasActuals = true, thresholds }) => {
  const { statusThresholds } = useApp();
  const activeThresholds = thresholds ?? statusThresholds;
  const badge = getStatusBadge(achievementPct, hasActuals, activeThresholds);
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${badge.color}`}>
      {badge.label}
    </span>
  );
};
