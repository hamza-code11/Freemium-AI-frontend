// components/admin/skeletons/AdminDashboardSkeleton/AdminStatsSkeleton.tsx
'use client';

import React from 'react';
import styles from './AdminDashboardSkeletons.module.css';

export default function AdminStatsSkeleton() {
  return (
    <div className={styles.statsGrid}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className={styles.statCard}>
          <div className={`${styles.skeleton} ${styles.statIcon}`} />
          <div className={styles.statContent}>
            <div className={`${styles.skeleton} ${styles.statTitle}`} />
            <div className={`${styles.skeleton} ${styles.statValue}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
