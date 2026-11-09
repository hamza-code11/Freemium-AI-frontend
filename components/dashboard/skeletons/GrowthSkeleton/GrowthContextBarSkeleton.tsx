// components/dashboard/skeletons/GrowthSkeleton/GrowthContextBarSkeleton.tsx
'use client';

import React from 'react';
import styles from './GrowthSkeletons.module.css';

export default function GrowthContextBarSkeleton() {
  return (
    <div className={styles.bar}>
      <div className={styles.col}>
        <div className={`${styles.skeleton} ${styles.head}`} />
        <div className={styles.chipGrid}>
          <div className={`${styles.skeleton} ${styles.chip}`} />
          <div className={`${styles.skeleton} ${styles.chipShort}`} />
          <div className={`${styles.skeleton} ${styles.chip}`} />
          <div className={`${styles.skeleton} ${styles.chipShort}`} />
        </div>
      </div>
      <div className={styles.col}>
        <div className={`${styles.skeleton} ${styles.head}`} />
        <div className={styles.chipGrid}>
          <div className={`${styles.skeleton} ${styles.chipShort}`} />
          <div className={`${styles.skeleton} ${styles.chip}`} />
          <div className={`${styles.skeleton} ${styles.chipShort}`} />
        </div>
      </div>
      <div className={styles.col}>
        <div className={`${styles.skeleton} ${styles.head}`} />
        <div className={`${styles.skeleton} ${styles.audienceLine}`} />
        <div className={`${styles.skeleton} ${styles.audienceLine}`} />
      </div>
      <div className={styles.col}>
        <div className={`${styles.skeleton} ${styles.head}`} />
        <div className={styles.chipGrid}>
          <div className={`${styles.skeleton} ${styles.chip}`} />
          <div className={`${styles.skeleton} ${styles.chipShort}`} />
        </div>
      </div>
    </div>
  );
}
