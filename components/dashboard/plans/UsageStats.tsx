import React from 'react';
import { FileText, Megaphone, Lightbulb, Info } from 'lucide-react';
import styles from './UsageStats.module.css';

const usageData = [
  { title: 'AI Content Generations', icon: <FileText size={16} />, used: 12, total: 50, percent: 24 },
  { title: 'Campaign Generations', icon: <Megaphone size={16} />, used: 3, total: 10, percent: 30 },
  { title: 'Growth Recommendations', icon: <Lightbulb size={16} />, used: 4, total: 10, percent: 40 },
];

export default function UsageStats() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Usage Overview</h3>

      <div className={styles.grid}>
        {usageData.map((item, i) => (
          <div key={i} className={styles.statBox}>
            <div className={styles.statHeader}>
              <div className={styles.iconBox}>{item.icon}</div>
              <span className={styles.statTitle}>{item.title}</span>
            </div>
            
            <div className={styles.valueRow}>
              <div>
                <span className={styles.usedValue}>{item.used}</span>
                <span className={styles.totalValue}> / {item.total}</span>
              </div>
              <span className={styles.percentText}>{item.percent}% used</span>
            </div>

            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${item.percent}%` }}></div>
            </div>
            <span className={styles.remainingText}>{item.total - item.used} remaining</span>
          </div>
        ))}
      </div>

      <div className={styles.footerNote}>
        <Info size={14} />
        <span>Your usage limits reset on May 31, 2025.</span>
      </div>
    </div>
  );
}
