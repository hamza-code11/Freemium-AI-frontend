// components/admin/skeletons/AdminDashboardSkeleton/AIToolUsageSkeleton.tsx
'use client';

import React from 'react';
import styles from './AdminDashboardSkeletons.module.css';

export default function AIToolUsageSkeleton() {
  return (
    <div className={styles.bottomCard}>
      <div className={styles.chartHeader}>
        <div className={`${styles.skeleton} ${styles.chartIcon}`} />
        <div className={`${styles.skeleton} ${styles.chartTitle}`} />
      </div>
      <div className={styles.listSkeleton}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.progressItem}>
            <div className={styles.progressHeader}>
              <div className={`${styles.skeleton} ${styles.progressLabel}`} />
              <div className={`${styles.skeleton} ${styles.progressCount}`} />
            </div>
            <div className={`${styles.skeleton} ${styles.progressBar}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
