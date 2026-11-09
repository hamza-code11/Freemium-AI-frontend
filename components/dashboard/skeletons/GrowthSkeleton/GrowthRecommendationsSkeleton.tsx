// components/dashboard/skeletons/GrowthSkeleton/GrowthRecommendationsSkeleton.tsx
'use client';

import React from 'react';
import styles from './GrowthSkeletons.module.css';

export default function GrowthRecommendationsSkeleton() {
  return (
    <div className={styles.bigBox}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className={`${styles.skeleton} ${styles.recTitle}`} />
          <div className={`${styles.skeleton} ${styles.recPara}`} />
          <div className={`${styles.skeleton} ${styles.recParaShort}`} />
          <div className={styles.recList}>
            <div className={`${styles.skeleton} ${styles.recListItem}`} />
            <div className={`${styles.skeleton} ${styles.recListItemShort}`} />
            <div className={`${styles.skeleton} ${styles.recListItem}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
