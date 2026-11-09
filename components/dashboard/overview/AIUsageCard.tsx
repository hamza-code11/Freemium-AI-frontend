// components/dashboard/overview/AIUsageCard.tsx
'use client';

import { FileText, Megaphone, TrendingUp } from 'lucide-react';
import styles from './AIUsageCard.module.css';

interface Stats {
  total_generations: number;
  content_generated: number;
  campaigns_generated: number;
  recommendations_generated: number;
}

interface Props {
  stats: Stats | null;
  loading: boolean;
}

export default function AIUsageCard({ stats, loading }: Props) {
  const dynamicStats = [
    {
      icon: FileText,
      value: stats?.content_generated ?? 0,
      label: 'Content Created',
      tone: 'toneBlue',
    },
    {
      icon: Megaphone,
      value: stats?.campaigns_generated ?? 0,
      label: 'Campaigns',
      tone: 'tonePurple',
    },
    {
      icon: TrendingUp,
      value: stats?.recommendations_generated ?? 0,
      label: 'Recommendations',
      tone: 'toneGreen',
    },
  ];

  return (
    <section className={styles.card} aria-labelledby="usage-title">
      <div className={styles.cardHead}>
        <h2 id="usage-title" className={styles.cardTitle}>Your AI Usage</h2>
      </div>
      
      <div className={styles.stats}>
        {loading ? (
          [1, 2, 3].map((i) => (
            <div key={i} className={styles.stat}>
              <div className={`${styles.skeleton} ${styles.skeletonIcon}`} />
              <div className={`${styles.skeleton} ${styles.skeletonValue}`} />
              <div className={`${styles.skeleton} ${styles.skeletonLabel}`} />
            </div>
          ))
        ) : (
          dynamicStats.map(({ icon: Icon, value, label, tone }) => (
            <div key={label} className={styles.stat}>
              <span className={`${styles.tile} ${styles[tone]} ${styles.statIcon}`}>
                <Icon size={20} />
              </span>
              <span className={styles.value}>{value}</span>
              <span className={styles.label}>{label}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}