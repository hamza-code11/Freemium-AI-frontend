import React from 'react';
import { Calendar } from 'lucide-react';
import styles from './PlanHeader.module.css';

export default function PlanHeader() {
  return (
    <div className={styles.headerRow}>
      <div>
        <h1 className={styles.title}>Plans & Usage</h1>
        <p className={styles.subtitle}>Manage your plan, monitor your AI usage, and explore the features available to your business.</p>
      </div>
      <div className={styles.dateBox}>
        <Calendar size={16} className={styles.icon} />
        <div>
          <span className={styles.dateLabel}>Current Usage Period</span>
          <span className={styles.dateValue}>Apr 24, 2025 – May 24, 2025</span>
        </div>
      </div>
    </div>
  );
}
