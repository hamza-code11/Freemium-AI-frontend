import React from 'react';
import styles from './DashboardSkeleton.module.css';

export default function DashboardSkeleton() {
  return (
    <div className={styles.container}>
      
      {/* Page Header Skeleton */}
      <div className={styles.pageHeader}>
        <div className={`${styles.skeleton} ${styles.title}`}></div>
        <div className={`${styles.skeleton} ${styles.subtitle}`}></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className={styles.statsGrid}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.statCard}>
            <div className={`${styles.skeleton} ${styles.statLabel}`}></div>
            <div className={`${styles.skeleton} ${styles.statValue}`}></div>
          </div>
        ))}
      </div>

      {/* Main Content Skeleton */}
      <div className={styles.mainGrid}>
        <div className={styles.chartArea}>
          <div className={`${styles.skeleton} ${styles.chartHeader}`}></div>
          <div className={styles.chartBars}>
            {[40, 60, 45, 80, 65, 95, 75].map((h, i) => (
              <div key={i} className={styles.bar} style={{ height: `${h}%` }}></div>
            ))}
          </div>
        </div>
        <div className={styles.listArea}>
          <div className={`${styles.skeleton} ${styles.listHeader}`}></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className={`${styles.skeleton} ${styles.listItem}`}></div>
          ))}
        </div>
      </div>

    </div>
  );
}
