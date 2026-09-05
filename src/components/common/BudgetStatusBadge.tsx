import React from 'react';
import { useApp } from '../../context/AppContext';
import { StatusThresholdBand } from '../../types';
import { getBudgetStatusBadge } from '../../utils/calculations';

interface Props {
  utilizationPct: number;
  hasSpend?: boolean;
  thresholds?: StatusThresholdBand[];
}

export const BudgetStatusBadge: React.FC<Props> = ({ utilizationPct, hasSpend = true, thresholds }) => {
  const { statusThresholds } = useApp();
  const activeThresholds = thresholds ?? statusThresholds;
  const badge = getBudgetStatusBadge(utilizationPct, hasSpend, activeThresholds);
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${badge.color}`}>
      {badge.label}
    </span>
  );
};
