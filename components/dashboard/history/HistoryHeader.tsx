import React from 'react';
import { Sparkles, FileText, Megaphone, Bookmark } from 'lucide-react';
import styles from './HistoryHeader.module.css';

const stats = [
  { title: 'Total Generations', value: '48', sub: '+12 this month', icon: <Sparkles size={18} />, color: 'tonePurple' },
  { title: 'Content Created', value: '32', sub: '+8 this month', icon: <FileText size={18} />, color: 'toneBlue' },
  { title: 'Campaigns Generated', value: '10', sub: '+3 this month', icon: <Megaphone size={18} />, color: 'toneCyan' },
  { title: 'Saved Items', value: '15', sub: '+5 this month', icon: <Bookmark size={18} />, color: 'toneGreen' },
];

export default function HistoryHeader() {
  return (
    <div className={styles.container}>
      
      <div className={styles.header}>
        <h1 className={styles.title}>Generation History</h1>
        <p className={styles.subtitle}>Access, organize, and reuse your previously generated AI content and campaign plans.</p>
      </div>

      <div className={styles.statsGrid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={`${styles.iconBox} ${styles[stat.color]}`}>{stat.icon}</div>
              <span className={styles.statTitle}>{stat.title}</span>
            </div>
            <h2 className={styles.statValue}>{stat.value}</h2>
            <span className={styles.statSub}>{stat.sub}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
