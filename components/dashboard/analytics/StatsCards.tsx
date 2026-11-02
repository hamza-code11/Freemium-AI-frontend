import React from 'react';
import { Sparkles, FileText, Megaphone, Lightbulb } from 'lucide-react';
import styles from './StatsCards.module.css';

const stats = [
  { title: 'Total Generations', value: '142', trend: '+18%', icon: <Sparkles size={18} />, color: 'tonePurple' },
  { title: 'Content Generations', value: '87', trend: '+24%', icon: <FileText size={18} />, color: 'toneBlue' },
  { title: 'Campaigns Generated', value: '32', trend: '+14%', icon: <Megaphone size={18} />, color: 'toneCyan' },
  { title: 'Growth Recommendations', value: '23', trend: '+9%', icon: <Lightbulb size={18} />, color: 'toneGreen' },
];

export default function StatsCards() {
  return (
    <div className={styles.grid}>
      {stats.map((stat, i) => (
        <div key={i} className={styles.card}>
          <div className={styles.topRow}>
            <div className={`${styles.iconBox} ${styles[stat.color]}`}>{stat.icon}</div>
            <span className={styles.cardTitle}>{stat.title}</span>
          </div>
          <div className={styles.valueRow}>
            <h2 className={styles.value}>{stat.value}</h2>
            {/* Mock Mini Chart SVG */}
            <svg className={styles.miniChart} viewBox="0 0 100 30">
              <path d="M0,25 Q20,15 40,20 T80,5 L100,10" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          <div className={styles.footer}>
            <span className={styles.trend}>↑ {stat.trend}</span>
            <span className={styles.vs}>vs. previous 7 days</span>
          </div>
        </div>
      ))}
    </div>
  );
}
