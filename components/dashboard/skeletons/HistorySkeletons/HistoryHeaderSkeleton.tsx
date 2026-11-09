// components/dashboard/history/skeletons/HistoryHeaderSkeleton.tsx
'use client';

import React from 'react';
import styles from './HistorySkeletons.module.css';

export default function HistoryHeaderSkeleton() {
  return (
    <div className={styles.headerSkeleton}>
      
      {/* Page Title & Subtitle */}
      <div className={styles.headerTop}>
        <div className={`${styles.skeleton} ${styles.headerTitle}`} />
        <div className={`${styles.skeleton} ${styles.headerSubtitle}`} />
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={`${styles.skeleton} ${styles.statIcon}`} />
              <div className={`${styles.skeleton} ${styles.statTitle}`} />
            </div>
            <div className={`${styles.skeleton} ${styles.statValue}`} />
            <div className={`${styles.skeleton} ${styles.statSub}`} />
          </div>
        ))}
      </div>

    </div>
  );
}