// components/dashboard/analytics/BreakdownChart.tsx
'use client';

import React from 'react';
import { PieChart } from 'lucide-react';
import styles from './BreakdownChart.module.css';

interface BreakdownItem {
  label: string;
  value: number;
  color: string;
}

interface Props {
  data: BreakdownItem[];
  loading?: boolean;
}

export default function BreakdownChart({ data, loading }: Props) {
  // 🔥 Loading
  if (loading) {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <PieChart size={18} className={styles.icon} />
          <h3 className={styles.title}>Generation Breakdown</h3>
        </div>
        <div className={styles.skeletonDonut}>
          <div className={styles.skeletonCircle} />
        </div>
      </div>
    );
  }

  // 🔥 Empty
  if (!data || data.length === 0) {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <PieChart size={18} className={styles.icon} />
          <h3 className={styles.title}>Generation Breakdown</h3>
        </div>
        <div className={styles.emptyState}>
          <PieChart size={32} />
          <p>No data yet</p>
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);

  let cumulativePercent = 0;
  const gradientSegments = data.map((item) => {
    const percent = total > 0 ? (item.value / total) * 100 : 0;
    const from = cumulativePercent;
    const to = cumulativePercent + percent;
    cumulativePercent = to;
    return `${item.color} ${from}% ${to}%`;
  }).join(', ');

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <PieChart size={18} className={styles.icon} />
        <h3 className={styles.title}>Generation Breakdown</h3>
      </div>

      <div className={styles.content}>
        <div className={styles.donutWrapper}>
          <div 
            className={styles.donutChart}
            style={{ background: total > 0 ? `conic-gradient(${gradientSegments})` : 'var(--color-bg-tertiary)' }}
          >
            <div className={styles.donutInner}>
              <span className={styles.totalNum}>{total}</span>
              <span className={styles.totalLabel}>Total</span>
            </div>
          </div>
        </div>

        <div className={styles.legendList}>
          {data.map((item, i) => {
            const percent = total > 0 ? Math.round((item.value / total) * 100) : 0;
            return (
              <div key={i} className={styles.legendItem}>
                <span className={styles.dot} style={{ background: item.color }}></span>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.value}>
                  {item.value} <span className={styles.percent}>({percent}%)</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}