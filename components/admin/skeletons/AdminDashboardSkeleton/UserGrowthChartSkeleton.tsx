// components/admin/skeletons/AdminDashboardSkeleton/UserGrowthChartSkeleton.tsx
'use client';

import React from 'react';
import styles from './AdminDashboardSkeletons.module.css';

export default function UserGrowthChartSkeleton() {
  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <div className={`${styles.skeleton} ${styles.chartIcon}`} />
        <div className={`${styles.skeleton} ${styles.chartTitle}`} />
        <div className={`${styles.skeleton} ${styles.chartLegend}`} />
      </div>
      <div className={`${styles.skeleton} ${styles.chartBody}`} />
    </div>
  );
}
