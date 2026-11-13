'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { UserGrowthChart as UserGrowthChartData } from '@/services/admin-dashboard.service';
import styles from './UserGrowthChart.module.css';

interface Props {
  data: UserGrowthChartData | null;
  loading?: boolean;
}

export default function UserGrowthChart({ data, loading }: Props) {
  const points = data?.points ?? [];
  const hasData = points.some((p) => p.value > 0);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <TrendingUp size={18} className={styles.icon} />
          <h3 className={styles.title}>User Registrations</h3>
        </div>
        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={styles.dot} style={{ background: '#3b82f6' }} />{' '}
            New Users
          </span>
          {data && (
            <span className={styles.totalBadge}>
              Total: {data.totals.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      <div className={styles.chartContainer}>
        {loading ? (
          <div className={styles.skeleton} />
        ) : !hasData ? (
          <div className={styles.empty}>No registrations in this period</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={points} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
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
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
