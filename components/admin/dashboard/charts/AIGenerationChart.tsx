'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { AIGenerationChart as AIGenerationChartData } from '@/services/admin-dashboard.service';
import styles from './AIGenerationChart.module.css';

interface Props {
  data: AIGenerationChartData | null;
  loading?: boolean;
}

const COLORS = {
  content: '#3b82f6',
  campaign: '#8b5cf6',
  growth: '#10b981',
};

const LABEL_MAP = {
  content: 'Content',
  campaign: 'Campaign',
  growth: 'Growth',
};

export default function AIGenerationChart({ data, loading }: Props) {
  const chartData =
    data?.labels.map((label, i) => {
      const row: Record<string, number | string> = { label };
      for (const s of data.series) {
        row[s.name] = s.points[i]?.value ?? 0;
      }
      return row;
    }) ?? [];

  const hasData = (data?.combined_total ?? 0) > 0;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <Sparkles size={18} className={styles.icon} />
          <h3 className={styles.title}>AI Generation Activity</h3>
        </div>
        <div className={styles.legend}>
          {(['content', 'campaign', 'growth'] as const).map((k) => (
            <span key={k} className={styles.legendItem}>
              <span className={styles.dot} style={{ background: COLORS[k] }} />{' '}
              {LABEL_MAP[k]}
            </span>
          ))}
          {data && (
            <span className={styles.totalBadge}>
              Total: {data.combined_total.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      <div className={styles.chartContainer}>
        {loading ? (
          <div className={styles.skeleton} />
        ) : !hasData ? (
          <div className={styles.empty}>No AI generations in this period</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                {(['content', 'campaign', 'growth'] as const).map((k) => (
                  <linearGradient key={k} id={`grad-${k}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS[k]} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={COLORS[k]} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-primary)',
                  fontSize: '12px',
                }}
              />
              {(['content', 'campaign', 'growth'] as const).map((k) => (
                <Area
                  key={k}
                  type="monotone"
                  dataKey={k}
                  name={LABEL_MAP[k]}
                  stroke={COLORS[k]}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#grad-${k})`}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
