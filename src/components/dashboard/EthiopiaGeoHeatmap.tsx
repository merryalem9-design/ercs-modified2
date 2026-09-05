import React, { useState, useRef } from 'react';
import { Region, StrategicPriority } from '../../types';
import { ETHIOPIA_REGION_PATHS, BRANCH_PINS, BranchPin } from './ethiopiaMapPaths';
import { formatCompactNumber, formatETB, get3WayBadge, ThreeWayStatus } from './dashboardUtils';
import { ZoomIn, ZoomOut, RotateCcw, MapPin, Compass, Info, Crosshair, X } from 'lucide-react';

export interface GeoBranchData {
  region: Region;
  achievement: number;
  actual: number;
  target: number;
  spend?: number;
  budget?: number;
  status: ThreeWayStatus;
  byPriority?: Record<string, { achievement: number; actual: number; target: number }>;
}

interface EthiopiaGeoHeatmapProps {
  data: GeoBranchData[];
  mode?: 'achievement' | 'beneficiaries' | 'budget';
  title: string;
  subtitle?: string;
  onRegionClick?: (regionId: string) => void;
  selectedRegionId?: string | string[];
  priorities?: StrategicPriority[];
  showMatrixOption?: boolean;
}

// Biome regional themes reflecting Ethiopia's varied topography (mountains, deserts, river basins, savanna)
const REGION_BIOME_THEMES: Record<string, { base: string; border: string; label: string }> = {
  'reg-tigray': { base: '#1E293B', border: '#475569', label: 'Northern Highlands' },
  'reg-afar': { base: '#2A1F18', border: '#78350F', label: 'Danakil Depression' },
  'reg-amhara': { base: '#1A2930', border: '#334155', label: 'Simien Mountains' },
  'reg-benishangul-gumuz': { base: '#13281E', border: '#065F46', label: 'Western River Basin' },
  'reg-addis-ababa': { base: '#2A1B28', border: '#831843', label: 'Central Capital' },
  'reg-oromia': { base: '#1A2B20', border: '#166534', label: 'Plateau & Savanna' },
  'reg-dire-dawa': { base: '#2B201A', border: '#9A3412', label: 'Eastern Corridor' },
  'reg-harar': { base: '#281A22', border: '#9D174D', label: 'Harari Enclave' },
  'reg-somali': { base: '#2C1C14', border: '#9A3412', label: 'Ogaden Arid Basin' },
  'reg-gambella': { base: '#0F261C', border: '#047857', label: 'Baro-Akobo Basin' },
  'snnpr-base': { base: '#162A1F', border: '#115E59', label: 'Southern Highlands' },
};

export const EthiopiaGeoHeatmap: React.FC<EthiopiaGeoHeatmapProps> = ({
  data,
  mode = 'achievement',
  title,
  subtitle,
  onRegionClick,
  selectedRegionId,
  priorities = [],
  showMatrixOption = false,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<'map' | 'matrix'>('map');
  const [hoveredBranch, setHoveredBranch] = useState<{
    branch: BranchPin;
    data?: GeoBranchData;
    screenX: number;
    screenY: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Map data lookup by regionId
  const dataMap = new Map<string, GeoBranchData>();
  data.forEach(d => dataMap.set(d.region.id, d));

  const maxBeneficiaries = Math.max(...data.map(d => d.actual), 1);
  const totalActualBeneficiaries = data.reduce((s, d) => s + (d.actual || 0), 0);
  const avgAchievement =
    data.length > 0 ? data.reduce((s, d) => s + (d.achievement || 0), 0) / data.length : 0;

  const isRegionSelected = (regId: string) => {
    if (!selectedRegionId) return false;
    if (Array.isArray(selectedRegionId)) {
      return selectedRegionId.includes(regId) && !selectedRegionId.includes('ALL');
    }
    return selectedRegionId === regId && selectedRegionId !== 'ALL';
  };

  const hasAnyFilter = Array.isArray(selectedRegionId)
    ? selectedRegionId.length > 0 && !selectedRegionId.includes('ALL')
    : !!selectedRegionId && selectedRegionId !== 'ALL';

  // Color determination based on mode
  const getBranchColor = (d?: GeoBranchData) => {
    if (!d)
      return {
        hex: '#94A3B8',
        glow: 'rgba(148, 163, 184, 0.4)',
        bg: 'bg-slate-100',
        text: 'text-slate-700',
        border: '#CBD5E1',
        label: 'No Data',
      };

    if (mode === 'beneficiaries') {
      const ratio = d.actual / maxBeneficiaries;
      if (ratio === 0)
        return {
          hex: '#64748B',
          glow: 'rgba(100, 116, 139, 0.4)',
          bg: 'bg-slate-100',
          text: 'text-slate-600',
          border: '#CBD5E1',
          label: '0 Reached',
        };
      if (ratio < 0.25)
        return {
          hex: '#0EA5E9',
          glow: 'rgba(14, 165, 233, 0.5)',
          bg: 'bg-sky-100',
          text: 'text-sky-900',
          border: '#38BDF8',
          label: 'Low Reach',
        };
      if (ratio < 0.55)
        return {
          hex: '#2563EB',
          glow: 'rgba(37, 99, 235, 0.5)',
          bg: 'bg-blue-100',
          text: 'text-blue-900',
          border: '#60A5FA',
          label: 'Moderate Reach',
        };
      if (ratio < 0.85)
        return {
          hex: '#4F46E5',
          glow: 'rgba(79, 70, 229, 0.5)',
          bg: 'bg-indigo-100',
          text: 'text-indigo-900',
          border: '#818CF8',
          label: 'High Reach',
        };
      return {
        hex: '#9333EA',
        glow: 'rgba(147, 51, 234, 0.6)',
        bg: 'bg-purple-100',
        text: 'text-purple-950',
        border: '#C084FC',
        label: 'Peak Reach',
      };
    }

    // Achievement % mode
    const ach = d.achievement;
    if (ach === 0)
      return {
        hex: '#64748B',
        glow: 'rgba(100, 116, 139, 0.4)',
        bg: 'bg-slate-100',
        text: 'text-slate-600',
        border: '#94A3B8',
        label: '0% Planned',
      };
    if (ach < 50)
      return {
        hex: '#EF4444',
        glow: 'rgba(239, 68, 68, 0.6)',
        bg: 'bg-rose-100',
        text: 'text-rose-900',
        border: '#F87171',
        label: '<50% Critical',
      };
    if (ach < 70)
      return {
        hex: '#F59E0B',
        glow: 'rgba(245, 158, 11, 0.6)',
        bg: 'bg-amber-100',
        text: 'text-amber-900',
        border: '#FBBF24',
        label: '50-69% At Risk',
      };
    if (ach < 85)
      return {
        hex: '#10B981',
        glow: 'rgba(16, 185, 129, 0.6)',
        bg: 'bg-emerald-100',
        text: 'text-emerald-900',
        border: '#34D399',
        label: '70-84% Progressing',
      };
    if (ach <= 100)
      return {
        hex: '#059669',
        glow: 'rgba(5, 150, 105, 0.6)',
        bg: 'bg-emerald-200',
        text: 'text-emerald-950',
        border: '#10B981',
        label: '85-100% On Track',
      };
    return {
      hex: '#6366F1',
      glow: 'rgba(99, 102, 241, 0.6)',
      bg: 'bg-indigo-100',
      text: 'text-indigo-900',
      border: '#818CF8',
      label: '>100% Exceeded',
    };
  };

  const getPolygonFill = (pathKey: string) => {
    const branch = BRANCH_PINS.find(b => b.pathKey === pathKey);
    const biome = REGION_BIOME_THEMES[pathKey] || { base: '#1E293B', border: '#334155' };
    if (!branch) return biome.base;
    const bData = dataMap.get(branch.regionId);
    if (!bData) return biome.base;
    // Blend biome base with branch metric tone
    return biome.base;
  };

  const handleZoomIn = () => setZoomLevel(z => Math.min(z + 0.3, 2.6));
  const handleZoomOut = () => setZoomLevel(z => Math.max(z - 0.3, 0.75));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="bg-slate-950 text-white rounded-2xl border border-slate-800 shadow-2xl p-4 sm:p-5 relative overflow-hidden">
      {/* Header & Controls Toolbar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-ercs-red animate-ping" />
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white flex items-center gap-2">
              {title}
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
              Tactical Map
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            {subtitle || 'Real-time geographic spatial heatmap across all 15 Ethiopian operational branches'}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {hasAnyFilter && (
            <button
              onClick={() => onRegionClick?.('ALL')}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 cursor-pointer transition-colors"
              title="Reset branch filter"
            >
              <X className="w-3 h-3 text-rose-400" />
              <span>Clear Filter</span>
            </button>
          )}

          {showMatrixOption && (
            <div className="bg-slate-900 p-1 rounded-lg border border-slate-800 flex items-center gap-1">
              <button
                onClick={() => setViewMode('map')}
                className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'map' ? 'bg-ercs-red text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Tactical Map
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'matrix' ? 'bg-ercs-red text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                Matrix Table
              </button>
            </div>
          )}

          {viewMode === 'map' && (
            <div className="bg-slate-900/90 backdrop-blur p-1 rounded-lg border border-slate-800 flex items-center gap-1 shadow-md">
              <button
                onClick={handleZoomIn}
                title="Zoom In"
                className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded cursor-pointer transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={handleZoomOut}
                title="Zoom Out"
                className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded cursor-pointer transition-colors"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                title="Reset View"
                className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {viewMode === 'map' ? (
        /* Actual Geographic Spatial Map Canvas */
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`relative w-full h-[560px] bg-gradient-to-b from-[#060D1A] via-[#0A1629] to-[#081122] rounded-xl border border-slate-800/80 overflow-hidden select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {/* Tactical Coordinate Grid Overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 1px 1px, #38BDF8 1px, transparent 0),
                linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '32px 32px, 96px 96px, 96px 96px',
            }}
          />

          {/* Surrounding Geographic Labels */}
          <div className="absolute top-3 right-5 text-[10px] font-black text-sky-400/50 uppercase tracking-widest pointer-events-none flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400/60 animate-pulse" />
            Red Sea / Gulf of Aden
          </div>
          <div className="absolute bottom-4 left-6 text-[10px] font-black text-sky-400/50 uppercase tracking-widest pointer-events-none">
            Lake Turkana Basin (South)
          </div>
          <div className="absolute top-4 left-6 text-[10px] font-bold text-slate-500/40 uppercase tracking-widest pointer-events-none">
            Sudan Border (West)
          </div>
          <div className="absolute bottom-16 right-6 text-[10px] font-bold text-slate-500/40 uppercase tracking-widest pointer-events-none">
            Somalia (East)
          </div>

          {/* SVG Map Projection */}
          <svg
            viewBox="0 0 900 700"
            className="w-full h-full transition-transform duration-75"
            style={{
              transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`,
              transformOrigin: 'center center',
            }}
          >
            <defs>
              {/* Radial gradient for realistic elevation halo */}
              <radialGradient id="ethiopiaHighlandHalo" cx="42%" cy="46%" r="50%">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.08" />
                <stop offset="60%" stopColor="#0284C7" stopOpacity="0.02" />
                <stop offset="100%" stopColor="#081122" stopOpacity="0" />
              </radialGradient>

              {/* Pin glow filter */}
              <filter id="tacticalGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Target lock filter */}
              <filter id="lockGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Central Highland Elevation Aura */}
            <circle cx="370" cy="340" r="280" fill="url(#ethiopiaHighlandHalo)" pointerEvents="none" />

            {/* 1. Regional Polygons (Real Official Admin-1 Boundaries) */}
            <g className="regions-polygons-layer">
              {Object.entries(ETHIOPIA_REGION_PATHS).map(([key, pathD]) => {
                const biome = REGION_BIOME_THEMES[key] || { base: '#1E293B', border: '#475569' };
                const isSelected = isRegionSelected(key);
                const fillColor = getPolygonFill(key);

                return (
                  <path
                    key={key}
                    d={pathD}
                    fill={fillColor}
                    fillOpacity={isSelected ? 0.75 : 0.45}
                    stroke={isSelected ? '#38BDF8' : biome.border}
                    strokeWidth={isSelected ? '2.5' : '1.2'}
                    className="transition-all duration-200 hover:fill-opacity-65 cursor-pointer"
                    onClick={() => {
                      const b = BRANCH_PINS.find(p => p.pathKey === key);
                      if (b) onRegionClick?.(b.regionId);
                    }}
                  />
                );
              })}
            </g>

            {/* 2. Topographic Elevation Contour Lines (Military / Tactical feel) */}
            <g className="topographic-contours pointer-events-none opacity-25" stroke="#38BDF8" strokeWidth="0.8" fill="none">
              {/* Simien & Northern Highlands Contour */}
              <path d="M300,160 Q340,140 380,170 T400,230 Q370,260 320,240 Z" strokeDasharray="3 3" />
              {/* Central Shewa / Entoto Plateau Contour */}
              <path d="M330,330 Q380,310 410,340 T390,390 Q340,400 325,360 Z" strokeDasharray="4 2" />
              {/* Bale Mountains Contour */}
              <path d="M390,440 Q430,420 460,450 T440,490 Q390,500 380,460 Z" strokeDasharray="3 3" />
              {/* Danakil Rift Edge */}
              <path d="M440,110 L480,160 L500,220 L480,260" stroke="#F59E0B" strokeWidth="1" strokeDasharray="2 3" />
            </g>

            {/* 3. Major River Systems */}
            <g className="rivers-layer pointer-events-none">
              {/* Abay / Blue Nile River (Loops out of Lake Tana into Sudan) */}
              <path
                d="M315,245 C325,270 345,300 330,320 C315,335 285,335 255,325 C225,315 195,305 160,285"
                fill="none"
                stroke="#0284C7"
                strokeWidth="2"
                strokeOpacity="0.8"
                strokeLinecap="round"
              />
              <text x="240" y="318" fill="#38BDF8" fontSize="7" fontWeight="bold" opacity="0.6">
                Abay (Blue Nile)
              </text>

              {/* Awash River (Flows northeast into Afar) */}
              <path
                d="M360,358 C380,365 405,375 430,360 C455,340 480,300 500,275 C510,265 520,250 525,240"
                fill="none"
                stroke="#0284C7"
                strokeWidth="1.6"
                strokeOpacity="0.75"
                strokeLinecap="round"
              />
              <text x="445" y="340" fill="#38BDF8" fontSize="6.5" fontWeight="bold" opacity="0.6">
                Awash River
              </text>

              {/* Omo River (Flows south to Lake Turkana) */}
              <path
                d="M330,395 C320,430 310,470 290,510 C280,530 265,550 255,570 C250,580 248,590 245,600"
                fill="none"
                stroke="#0284C7"
                strokeWidth="1.6"
                strokeOpacity="0.7"
                strokeLinecap="round"
              />
              <text x="278" y="525" fill="#38BDF8" fontSize="6.5" fontWeight="bold" opacity="0.6">
                Omo River
              </text>

              {/* Wabe Shebelle River (Flows southeast into Somali region) */}
              <path
                d="M410,430 C435,445 460,465 500,490 C530,510 570,530 620,555 C660,575 700,590 730,600"
                fill="none"
                stroke="#0284C7"
                strokeWidth="1.5"
                strokeOpacity="0.65"
                strokeLinecap="round"
              />
              <text x="540" y="515" fill="#38BDF8" fontSize="6.5" fontWeight="bold" opacity="0.6">
                Wabe Shebelle
              </text>
            </g>

            {/* 4. Lakes & Water Bodies */}
            <g className="lakes-layer pointer-events-none">
              {/* Lake Tana (Bahir Dar) */}
              <ellipse
                cx="320"
                cy="235"
                rx="18"
                ry="14"
                fill="#0284C7"
                fillOpacity="0.75"
                stroke="#38BDF8"
                strokeWidth="1.5"
              />
              <text x="320" y="238" textAnchor="middle" fill="#FFFFFF" fontSize="7.5" fontWeight="900">
                L. Tana
              </text>

              {/* Great Rift Valley Lakes Chain */}
              {/* Lake Ziway */}
              <ellipse cx="362" cy="422" rx="7" ry="10" fill="#0284C7" fillOpacity="0.7" stroke="#38BDF8" strokeWidth="1" />
              {/* Lake Langano */}
              <ellipse cx="365" cy="438" rx="6" ry="9" fill="#0284C7" fillOpacity="0.7" stroke="#38BDF8" strokeWidth="1" />
              {/* Lake Hawassa */}
              <ellipse cx="358" cy="465" rx="6" ry="6" fill="#0284C7" fillOpacity="0.8" stroke="#38BDF8" strokeWidth="1" />
              {/* Lake Abaya */}
              <ellipse cx="333" cy="502" rx="9" ry="17" fill="#0284C7" fillOpacity="0.7" stroke="#38BDF8" strokeWidth="1" />
              {/* Lake Chamo */}
              <ellipse cx="328" cy="525" rx="6" ry="11" fill="#0284C7" fillOpacity="0.7" stroke="#38BDF8" strokeWidth="1" />
            </g>

            {/* 5. Branch Pins & Glowing Tactical Markers (All 15 Branches) */}
            <g className="pins-layer">
              {BRANCH_PINS.map(pin => {
                const bData = dataMap.get(pin.regionId);
                const colors = getBranchColor(bData);
                const isSelected = isRegionSelected(pin.regionId);
                const isHovered = hoveredBranch?.branch.regionId === pin.regionId;

                const displayValue =
                  mode === 'beneficiaries'
                    ? formatCompactNumber(bData?.actual || 0)
                    : `${(bData?.achievement || 0).toFixed(0)}%`;

                return (
                  <g
                    key={pin.regionId}
                    transform={`translate(${pin.x}, ${pin.y})`}
                    className="cursor-pointer transition-transform duration-200"
                    style={{ transform: isHovered || isSelected ? `translate(${pin.x}px, ${pin.y}px) scale(1.18)` : `translate(${pin.x}px, ${pin.y}px)` }}
                    onClick={() => onRegionClick?.(pin.regionId)}
                    onMouseEnter={e => {
                      setHoveredBranch({
                        branch: pin,
                        data: bData,
                        screenX: e.clientX,
                        screenY: e.clientY - 16,
                      });
                    }}
                    onMouseLeave={() => setHoveredBranch(null)}
                  >
                    {/* Concentric Animated Glowing Radar Rings (Directly inspired by reference images) */}
                    {/* Outer sonar ping */}
                    <circle
                      r={isSelected ? '28' : '22'}
                      fill="none"
                      stroke={colors.hex}
                      strokeWidth={isSelected ? '2' : '1.2'}
                      strokeOpacity={isHovered || isSelected ? '0.85' : '0.25'}
                      className={isHovered || isSelected ? 'animate-ping' : ''}
                    />

                    {/* Mid radar ring with tactical dash */}
                    <circle
                      r="15"
                      fill={colors.hex}
                      fillOpacity={isHovered || isSelected ? '0.35' : '0.12'}
                      stroke={colors.border}
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />

                    {/* Central location beacon */}
                    <circle
                      r="8"
                      fill={colors.hex}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      filter="url(#tacticalGlow)"
                    />
                    <circle r="3" fill="#FFFFFF" />

                    {/* Tactical Target Lock Reticle (When Selected) */}
                    {isSelected && (
                      <g stroke="#38BDF8" strokeWidth="2" fill="none" filter="url(#lockGlow)">
                        {/* Top-left corner bracket */}
                        <path d="M-18,-12 L-18,-18 L-12,-18" />
                        {/* Top-right corner bracket */}
                        <path d="M12,-18 L18,-18 L18,-12" />
                        {/* Bottom-left corner bracket */}
                        <path d="M-18,12 L-18,18 L-12,18" />
                        {/* Bottom-right corner bracket */}
                        <path d="M12,18 L18,18 L18,12" />
                        {/* Crosshairs */}
                        <line x1="0" y1="-22" x2="0" y2="-15" />
                        <line x1="0" y1="15" x2="0" y2="22" />
                        <line x1="-22" y1="0" x2="-15" y2="0" />
                        <line x1="15" y1="0" x2="22" y2="0" />
                      </g>
                    )}

                    {/* Prominent High-Contrast Tactical Metric Badge (Top) */}
                    <g transform="translate(0, -22)">
                      <rect
                        x="-24"
                        y="-10"
                        width="48"
                        height="20"
                        rx="10"
                        fill="#0B132B"
                        stroke={isSelected ? '#38BDF8' : colors.hex}
                        strokeWidth={isSelected ? '2.5' : '1.8'}
                        filter="drop-shadow(0 2px 5px rgba(0,0,0,0.85))"
                      />
                      <text
                        x="0"
                        y="4.5"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="10"
                        fontWeight="900"
                        letterSpacing="-0.3px"
                      >
                        {displayValue}
                      </text>
                    </g>

                    {/* Branch POI Label (Bottom) */}
                    <g transform="translate(0, 19)">
                      <rect
                        x={-pin.shortName.length * 3.8 - 6}
                        y="-7.5"
                        width={pin.shortName.length * 7.6 + 12}
                        height="15"
                        rx="3.5"
                        fill="#070D1B"
                        fillOpacity="0.92"
                        stroke={isSelected ? '#38BDF8' : '#334155'}
                        strokeWidth={isSelected ? '1.2' : '0.8'}
                        filter="drop-shadow(0 1px 3px rgba(0,0,0,0.7))"
                      />
                      <text
                        x="0"
                        y="3.5"
                        textAnchor="middle"
                        fill={isSelected ? '#38BDF8' : '#E2E8F0'}
                        fontSize="8.5"
                        fontWeight="800"
                        letterSpacing="0.2px"
                      >
                        {pin.shortName.toUpperCase()}
                      </text>
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Tactical HUD Overlay — Top-Left: Compass & Grid */}
          <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur border border-slate-800 p-2.5 rounded-xl pointer-events-none flex items-center gap-3 shadow-xl">
            <div className="flex flex-col items-center">
              <span className="text-[9px] font-black text-rose-500">N</span>
              <Compass className="w-4 h-4 text-slate-400" />
              <span className="text-[8px] font-bold text-slate-500">S</span>
            </div>
            <div className="border-l border-slate-800 pl-2.5 text-[10px]">
              <div className="font-extrabold text-white tracking-wider">GRID: ETH-AOP</div>
              <div className="text-[9px] text-slate-400">15 ERCS Branches Active</div>
            </div>
          </div>

          {/* Tactical HUD Overlay — Bottom-Left: Quick Stats Ticker */}
          <div className="absolute bottom-4 left-4 bg-slate-900/85 backdrop-blur border border-slate-800 px-3 py-2 rounded-xl pointer-events-none flex items-center gap-4 text-[10px] shadow-xl">
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">
                {mode === 'beneficiaries' ? 'Total Reach' : 'Avg Achievement'}
              </span>
              <span className="font-black text-emerald-400 text-xs">
                {mode === 'beneficiaries'
                  ? formatCompactNumber(totalActualBeneficiaries)
                  : `${avgAchievement.toFixed(1)}%`}
              </span>
            </div>
            <div className="w-px h-6 bg-slate-800" />
            <div>
              <span className="text-slate-400 block text-[9px] uppercase">Coverage</span>
              <span className="font-black text-sky-400 text-xs">15 / 15 Regions</span>
            </div>
          </div>

          {/* Floating Branch Detail Tooltip (Rich Floating Inspection Card) */}
          {hoveredBranch && (
            <div
              className="fixed z-50 pointer-events-none transform -translate-x-1/2 -translate-y-full bg-slate-900/95 backdrop-blur text-white text-xs rounded-xl shadow-2xl p-4 w-72 border border-slate-700"
              style={{ left: hoveredBranch.screenX, top: hoveredBranch.screenY }}
            >
              <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2.5">
                <div>
                  <div className="font-black text-sm text-white flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-ercs-red animate-pulse" />
                    <span>{hoveredBranch.branch.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    HQ / Branch Capital: <span className="text-slate-200">{hoveredBranch.branch.capital}</span>
                  </div>
                </div>
                {hoveredBranch.data && (
                  <span
                    className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border ${
                      get3WayBadge(hoveredBranch.data.status).color
                    }`}
                  >
                    {get3WayBadge(hoveredBranch.data.status).label}
                  </span>
                )}
              </div>

              {hoveredBranch.data ? (
                <div className="space-y-2 text-[11px]">
                  <div className="flex justify-between items-center bg-slate-800/60 px-2 py-1 rounded">
                    <span className="text-slate-400">
                      {mode === 'beneficiaries' ? 'Beneficiaries Reached:' : 'Achievement Rate:'}
                    </span>
                    <span className="font-black text-emerald-400 text-sm">
                      {mode === 'beneficiaries'
                        ? formatCompactNumber(hoveredBranch.data.actual)
                        : `${hoveredBranch.data.achievement.toFixed(1)}%`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span className="text-slate-400">Target vs Actual:</span>
                    <span className="font-semibold">
                      {Math.round(hoveredBranch.data.actual).toLocaleString()} /{' '}
                      {Math.round(hoveredBranch.data.target).toLocaleString()}
                    </span>
                  </div>
                  {hoveredBranch.data.budget !== undefined && (
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="text-slate-400">Planned Budget:</span>
                      <span className="font-semibold">{formatETB(hoveredBranch.data.budget)}</span>
                    </div>
                  )}
                  {hoveredBranch.data.spend !== undefined && (
                    <div className="flex justify-between items-center text-slate-300">
                      <span className="text-slate-400">Expenditure:</span>
                      <span className="font-semibold text-sky-400">
                        {formatETB(hoveredBranch.data.spend)}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic">No entry data recorded yet.</div>
              )}

              <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-sky-400 font-bold flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Crosshair className="w-3 h-3 text-sky-400" />
                  Click to lock on & filter
                </span>
                {isRegionSelected(hoveredBranch.branch.regionId) && (
                  <span className="text-rose-400 font-black">LOCKED</span>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Matrix / Scorecard View Option */
        <div className="overflow-x-auto scrollbar-thin bg-slate-950 p-4 rounded-xl border border-slate-800">
          <table className="w-full border-collapse text-xs text-slate-300">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[10px] font-bold">
                <th className="py-2.5 px-3 text-left">Branch Name</th>
                <th className="py-2.5 px-3 text-left">Capital</th>
                <th className="py-2.5 px-3 text-right">Achievement %</th>
                <th className="py-2.5 px-3 text-right">Actual</th>
                <th className="py-2.5 px-3 text-right">Target</th>
                <th className="py-2.5 px-3 text-right">Budget (ETB)</th>
                <th className="py-2.5 px-3 text-right">Spend (ETB)</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {BRANCH_PINS.map(pin => {
                const bData = dataMap.get(pin.regionId);
                const badge = bData ? get3WayBadge(bData.status) : undefined;
                const isSelected = isRegionSelected(pin.regionId);

                return (
                  <tr
                    key={pin.regionId}
                    onClick={() => onRegionClick?.(pin.regionId)}
                    className={`border-b border-slate-900 hover:bg-slate-900/80 cursor-pointer transition-colors ${
                      isSelected ? 'bg-sky-950/40 border-sky-800/60' : ''
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-white flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-sky-400' : 'bg-ercs-red'}`} />
                      <span>{pin.name}</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">{pin.capital}</td>
                    <td className="py-2.5 px-3 text-right font-black text-emerald-400 text-sm">
                      {(bData?.achievement || 0).toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-200 font-semibold">
                      {Math.round(bData?.actual || 0).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-400">
                      {Math.round(bData?.target || 0).toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-400">
                      {formatETB(bData?.budget || 0)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold text-white">
                      {formatETB(bData?.spend || 0)}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      {badge && (
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border ${badge.color}`}>
                          {badge.label}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Color Scale Legend */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-[10px] text-slate-400">
        <div className="flex items-center gap-1.5 font-bold text-slate-300">
          <Info className="w-3.5 h-3.5 text-sky-400" />
          <span>
            {mode === 'beneficiaries' ? 'Beneficiaries Reach Scale:' : 'Achievement Heatmap Scale:'}
          </span>
        </div>

        {mode === 'beneficiaries' ? (
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500 inline-block shadow-sm" /> 0 Reached
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block shadow-sm" /> Low Reach
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block shadow-sm" /> Moderate
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block shadow-sm" /> High Reach
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block shadow-sm" /> Peak Reach
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block shadow-sm" /> &lt;50% Critical
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shadow-sm" /> 50–69% Needs Imp.
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-sm" /> 70–84% Progressing
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block shadow-sm" /> 85–100% Target Met
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block shadow-sm" /> &gt;100% Exceeded
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
