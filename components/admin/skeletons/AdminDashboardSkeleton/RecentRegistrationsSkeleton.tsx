// components/admin/skeletons/AdminDashboardSkeleton/RecentRegistrationsSkeleton.tsx
'use client';

import React from 'react';
import styles from './AdminDashboardSkeletons.module.css';

export default function RecentRegistrationsSkeleton() {
  return (
    <div className={styles.bottomCard}>
      <div className={styles.chartHeader}>
        <div className={`${styles.skeleton} ${styles.chartIcon}`} />
        <div className={`${styles.skeleton} ${styles.chartTitle}`} />
      </div>
      <div className={styles.tableSkeleton}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={styles.tableRow}>
            <div className={styles.tableUser}>
              <div className={`${styles.skeleton} ${styles.tableName}`} />
              <div className={`${styles.skeleton} ${styles.tableEmail}`} />
            </div>
            <div className={`${styles.skeleton} ${styles.tableBadge}`} />
            <div className={`${styles.skeleton} ${styles.tableDate}`} />
            <div className={`${styles.skeleton} ${styles.tableStatus}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
