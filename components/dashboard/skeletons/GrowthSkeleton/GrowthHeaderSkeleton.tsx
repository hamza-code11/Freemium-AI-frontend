// components/dashboard/skeletons/GrowthSkeleton/GrowthHeaderSkeleton.tsx
'use client';

import React from 'react';
import styles from './GrowthSkeletons.module.css';

export default function GrowthHeaderSkeleton() {
  return (
    <div className={styles.header}>
      <div className={styles.headerText}>
        <div className={`${styles.skeleton} ${styles.title}`} />
        <div className={`${styles.skeleton} ${styles.subtitle}`} />
      </div>
      <div className={styles.headerActions}>
        <div className={`${styles.skeleton} ${styles.businessBtn}`} />
        <div className={`${styles.skeleton} ${styles.generateBtn}`} />
      </div>
    </div>
  );
}
