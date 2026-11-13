'use client';

import React from 'react';
import { BarChart2, PieChart } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from 'recharts';
import { UsageChartResponse } from '@/services/admin-usage.service';
import styles from './UsageCharts.module.css';

interface Props {
  chart: UsageChartResponse | null;
  loading?: boolean;
}

const COLORS = {
  content: '#3b82f6',
  campaign: '#8b5cf6',
  growth: '#10b981',
  failed: '#ef4444',
};

export default function UsageCharts({ chart, loading }: Props) {
  const points = chart?.points ?? [];
  const totals = chart?.totals ?? {};
  const totalAll = (totals.content ?? 0) + (totals.campaign ?? 0) + (totals.growth ?? 0);

  const donut = [
    { name: 'Content Generator', value: totals.content ?? 0, color: COLORS.content },
    { name: 'Campaign Planner', value: totals.campaign ?? 0, color: COLORS.campaign },
    { name: 'Growth Recommendations', value: totals.growth ?? 0, color: COLORS.growth },
  ];

  return (
    <div className={styles.grid}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <BarChart2 size={18} className={styles.icon} />
            <h3 className={styles.title}>AI Generation Activity</h3>
          </div>
          <div className={styles.legend}>
            <span className={styles.legendItem}><span className={styles.dot} style={{ background: COLORS.content }} /> Content</span>
            <span className={styles.legendItem}><span className={styles.dot} style={{ background: COLORS.campaign }} /> Campaign</span>
            <span className={styles.legendItem}><span className={styles.dot} style={{ background: COLORS.growth }} /> Growth</span>
          </div>
        </div>
        <div className={styles.chartArea}>
          {loading ? (
            <div className={styles.chartSkeleton} />
          ) : points.length === 0 ? (
            <div className={styles.emptyChart}>No data for selected range</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={points} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gContent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.content} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={COLORS.content} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gCampaign" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.campaign} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={COLORS.campaign} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gGrowth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.growth} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={COLORS.growth} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--color-text-secondary)' }} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-primary)', fontSize: '12px' }} />
                <Area type="monotone" dataKey="content" stroke={COLORS.content} strokeWidth={2} fillOpacity={1} fill="url(#gContent)" />
                <Area type="monotone" dataKey="campaign" stroke={COLORS.campaign} strokeWidth={2} fillOpacity={1} fill="url(#gCampaign)" />
                <Area type="monotone" dataKey="growth" stroke={COLORS.growth} strokeWidth={2} fillOpacity={1} fill="url(#gGrowth)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleWrap}>
            <PieChart size={18} className={styles.icon} />
            <h3 className={styles.title}>Usage by AI Tool</h3>
          </div>
        </div>
        <div className={styles.donutWrap}>
          <div className={styles.donutChart}>
            {loading ? (
              <div className={styles.chartSkeleton} />
            ) : totalAll === 0 ? (
              <div className={styles.emptyChart}>No data</div>
            ) : (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <RePieChart>
                    <Pie data={donut} innerRadius={50} outerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
                      {donut.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </RePieChart>
                </ResponsiveContainer>
                <div className={styles.centerText}>
                  <span className={styles.centerVal}>{totalAll.toLocaleString()}</span>
                  <span className={styles.centerLabel}>Total</span>
                </div>
              </>
            )}
          </div>
          <div className={styles.customLegend}>
            {donut.map((tool) => (
              <div key={tool.name} className={styles.legendRow}>
                <span className={styles.dot} style={{ background: tool.color }} />
                <div className={styles.legendText}>
                  <span className={styles.lTitle}>{tool.name}</span>
                  <span className={styles.lVal}>{tool.value.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
