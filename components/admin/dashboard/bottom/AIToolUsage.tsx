// components/admin/AIToolUsage.tsx
import React, { useMemo } from 'react';
import { BarChart2 } from 'lucide-react';
import styles from './AIToolUsage.module.css';
import type { ToolUsageItem } from '@/services/admin-dashboard.service';

interface AIToolUsageProps {
  toolUsage?: ToolUsageItem[];
  loading?: boolean;
}

const COLORS: Record<ToolUsageItem['tool'], string> = {
  content: '#3b82f6',
  campaign: '#8b5cf6',
  growth: '#10b981',
};

export default function AIToolUsage({ toolUsage = [], loading = false }: AIToolUsageProps) {
  const items = useMemo(
    () =>
      toolUsage.map((t) => {
        const pct =
          t.daily_limit > 0
            ? Math.min(100, Math.round((t.used_today / t.daily_limit) * 100))
            : 0;
        return { ...t, pct, color: COLORS[t.tool] ?? '#6366f1' };
      }),
    [toolUsage],
  );

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <BarChart2 size={18} className={styles.icon} />
        <h3 className={styles.title}>AI Tool Usage (Today)</h3>
      </div>

      <div className={styles.list}>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className={styles.item}>
                <div className={`${styles.skeleton} ${styles.skeletonRow}`} />
                <div className={`${styles.skeleton} ${styles.skeletonBar}`} />
              </div>
            ))
          : items.map((tool) => (
              <div key={tool.tool} className={styles.item}>
                <div className={styles.topRow}>
                  <span className={styles.label}>{tool.label}</span>
                  <span className={styles.percent}>
                    {tool.used_today} / {tool.daily_limit}
                  </span>
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={styles.fill}
                    style={{ width: `${tool.pct}%`, backgroundColor: tool.color }}
                  />
                </div>
                <div className={styles.metaRow}>
                  <span>{tool.pct}% used</span>
                  <span>{tool.remaining} left today</span>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}