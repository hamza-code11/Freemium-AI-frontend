import React from 'react';
import { Zap, FileText, Megaphone, TrendingUp } from 'lucide-react';
import { UsageStats as Stats } from '@/services/admin-usage.service';
import styles from './UsageStats.module.css';

interface Props {
  stats: Stats | null;
  loading?: boolean;
}

const fmt = (n: number) => n.toLocaleString('en-US');

export default function UsageStats({ stats, loading }: Props) {
  const tiles = [
    {
      title: 'Total AI Generations',
      value: stats?.total_generations ?? 0,
      icon: <Zap size={18} />,
      color: 'toneBlue',
    },
    {
      title: 'Content Generations',
      value: stats?.content_generations ?? 0,
      icon: <FileText size={18} />,
      color: 'toneIndigo',
    },
    {
      title: 'Campaign Generations',
      value: stats?.campaign_generations ?? 0,
      icon: <Megaphone size={18} />,
      color: 'tonePurple',
    },
    {
      title: 'Growth Recommendations',
      value: stats?.growth_generations ?? 0,
      icon: <TrendingUp size={18} />,
      color: 'toneGreen',
    },
  ];

  return (
    <div className={styles.grid}>
      {tiles.map((t, i) => (
        <div key={i} className={styles.card}>
          <div className={`${styles.iconBox} ${styles[t.color]}`}>{t.icon}</div>
          <div className={styles.content}>
            <span className={styles.title}>{t.title}</span>
            <h2 className={styles.value}>{loading ? '—' : fmt(t.value)}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
