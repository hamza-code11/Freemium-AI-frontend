// components/dashboard/history/HistoryHeader.tsx
'use client';

import React from 'react';
import { Sparkles, FileText, Megaphone, TrendingUp } from 'lucide-react';
import { useHistory } from '@/hooks/useHistory';
import styles from './HistoryHeader.module.css';

export default function HistoryHeader() {
  const { stats, loading } = useHistory();

  const statCards = [
    { title: 'Total Generations', value: stats?.total_generations ?? 0, icon: <Sparkles size={18} />, color: 'tonePurple' },
    { title: 'Content Generated', value: stats?.content_generated ?? 0, icon: <FileText size={18} />, color: 'toneBlue' },
    { title: 'Campaigns Generated', value: stats?.campaigns_generated ?? 0, icon: <Megaphone size={18} />, color: 'toneCyan' },
    { title: 'Growth Recommendations', value: stats?.recommendations_generated ?? 0, icon: <TrendingUp size={18} />, color: 'toneGreen' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Generation History</h1>
        <p className={styles.subtitle}>Access, organize, and reuse your previously generated AI content and campaign plans.</p>
      </div>

      <div className={styles.statsGrid}>
        {statCards.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={`${styles.iconBox} ${styles[stat.color]}`}>{stat.icon}</div>
              <span className={styles.statTitle}>{stat.title}</span>
            </div>
            <h2 className={styles.statValue}>
              {loading ? '...' : stat.value}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}