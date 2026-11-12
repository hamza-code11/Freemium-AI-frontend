// components/admin/skeletons/UsersSkeleton/UserStatsSkeleton.tsx
'use client';

import React from 'react';
import styles from './UsersSkeletons.module.css';

export default function UserStatsSkeleton() {
  return (
    <div className={styles.statsGrid}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={styles.statCard}>
          <div className={`${styles.skeleton} ${styles.statIcon}`} />
          <div className={styles.statContent}>
            <div className={`${styles.skeleton} ${styles.statLabel}`} />
            <div className={`${styles.skeleton} ${styles.statValue}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
