// components/dashboard/skeletons/GrowthSkeleton/GrowthRecentSkeleton.tsx
'use client';

import React from 'react';
import styles from './GrowthSkeletons.module.css';

export default function GrowthRecentSkeleton() {
  return (
    <div className={styles.recentPanel}>
      <div className={`${styles.skeleton} ${styles.recentHead}`} />
      <div className={styles.recentGrid}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={`${styles.skeleton} ${styles.recentCard}`} />
        ))}
      </div>
    </div>
  );
}
