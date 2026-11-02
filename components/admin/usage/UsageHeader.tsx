import React from 'react';
import { RefreshCw } from 'lucide-react';
import styles from './UsageHeader.module.css';

const filters = ['Today', 'Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Custom Range'];

export default function UsageHeader() {
  return (
    <div className={styles.header}>
      <div>
        <div className={styles.breadcrumb}>Admin / Usage</div>
        <h1 className={styles.title}>Usage Management</h1>
        <p className={styles.subtitle}>Monitor AI consumption, generation activity, and quota usage across your platform.</p>
      </div>

      <div className={styles.filters}>
        <div className={styles.dateTabs}>
          {filters.map((filter, i) => (
            <button key={i} className={`${styles.tabBtn} ${i === 0 ? styles.activeTab : ''}`}>
              {filter}
            </button>
          ))}
        </div>
        <button className={styles.refreshBtn}><RefreshCw size={16} /></button>
      </div>
    </div>
  );
}
