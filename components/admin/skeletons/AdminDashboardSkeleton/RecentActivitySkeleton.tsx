// components/admin/skeletons/AdminDashboardSkeleton/RecentActivitySkeleton.tsx
'use client';

import React from 'react';
import styles from './AdminDashboardSkeletons.module.css';

export default function RecentActivitySkeleton() {
  return (
    <div className={styles.bottomCard}>
      <div className={styles.chartHeader}>
        <div className={`${styles.skeleton} ${styles.chartIcon}`} />
        <div className={`${styles.skeleton} ${styles.chartTitle}`} />
      </div>
      <div className={styles.listSkeleton}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.activityItem}>
            <div className={`${styles.skeleton} ${styles.activityIcon}`} />
            <div className={styles.activityContent}>
              <div className={`${styles.skeleton} ${styles.listLine}`} />
              <div className={`${styles.skeleton} ${styles.listLineShort}`} />
            </div>
            <div className={`${styles.skeleton} ${styles.activityTime}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
