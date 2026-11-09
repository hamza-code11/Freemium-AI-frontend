// components/dashboard/analytics/UsageChart.tsx
'use client';

import React from 'react';
import { AreaChart as ChartIcon, ChevronDown } from 'lucide-react';
import styles from './UsageChart.module.css';

interface Props {
  labels: string[];
  values: number[];
  loading?: boolean;
  dateRange: string;
  onRangeChange: (range: string) => void;
  customFrom?: string;
  customTo?: string;
  onCustomFromChange?: (val: string) => void;
  onCustomToChange?: (val: string) => void;
}

const DATE_RANGES = [
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
  { value: 'all', label: 'All Time' },
  { value: 'custom', label: 'Custom Range' },
];

export default function UsageChart({
  labels, values, loading, dateRange, onRangeChange,
  customFrom, customTo, onCustomFromChange, onCustomToChange,
}: Props) {
  
  const showCustom = dateRange === 'custom';

  if (loading) {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <ChartIcon size={18} className={styles.icon} />
            <h3 className={styles.title}>AI Usage Over Time</h3>
          </div>
        </div>
        <div className={styles.skeletonChart}>
          <div className={`${styles.skeleton} ${styles.skeletonLine}`} />
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...(values.length ? values : [5]), 5);
  const chartHeight = 200;
  const chartWidth = 800;
  const pointCount = values.length || 1;

  const points = values.map((value, i) => {
    const x = pointCount > 1 ? (i / (pointCount - 1)) * chartWidth : chartWidth / 2;
    const y = chartHeight - (value / maxValue) * chartHeight;
    return { x, y, value, label: labels[i] };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaPath = linePath ? `${linePath} L${chartWidth},${chartHeight} L0,${chartHeight} Z` : '';

  const yLabels = [
    maxValue, Math.round(maxValue * 0.75),
    Math.round(maxValue * 0.5), Math.round(maxValue * 0.25), 0,
  ];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <ChartIcon size={18} className={styles.icon} />
          <h3 className={styles.title}>AI Usage Over Time</h3>
        </div>
        <div className={styles.selectWrapper}>
          <select 
            value={dateRange} 
            onChange={(e) => onRangeChange(e.target.value)}
            className={styles.select}
          >
            {DATE_RANGES.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className={styles.selectIcon} />
        </div>
      </div>

      {/* 🔥 Custom Range */}
      {showCustom && (
        <div className={styles.customRangeRow}>
          <div className={styles.dateField}>
            <label>From</label>
            <input
              type="date"
              value={customFrom || ''}
              onChange={(e) => onCustomFromChange?.(e.target.value)}
            />
          </div>
          <div className={styles.dateField}>
            <label>To</label>
            <input
              type="date"
              value={customTo || ''}
              onChange={(e) => onCustomToChange?.(e.target.value)}
            />
          </div>
        </div>
      )}

      {!values.length ? (
        <div className={styles.emptyState}>
          <ChartIcon size={32} />
          <p>No usage data yet</p>
        </div>
      ) : (
        <>
          <div className={styles.chartContainer}>
            <div className={styles.yAxis}>
              {yLabels.map((v, i) => <span key={i}>{v}</span>)}
            </div>
            <div className={styles.chartArea}>
              <svg className={styles.mainSvg} viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity="0.2"/>
                    <stop offset="100%" stopColor="var(--color-accent-primary)" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d={areaPath} fill="url(#areaGrad)" />
                <path d={linePath} fill="none" stroke="var(--color-accent-primary)" strokeWidth="2" />
                {points.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--color-bg-primary)" stroke="var(--color-accent-primary)" strokeWidth="2" />
                ))}
              </svg>
            </div>
          </div>
          <div className={styles.xAxis}>
            {labels.map((label, i) => <span key={i}>{label}</span>)}
          </div>
        </>
      )}
    </div>
  );
}