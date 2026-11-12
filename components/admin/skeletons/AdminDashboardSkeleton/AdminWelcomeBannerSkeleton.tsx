// components/admin/skeletons/AdminDashboardSkeleton/AdminWelcomeBannerSkeleton.tsx
'use client';

import React from 'react';
import styles from './AdminDashboardSkeletons.module.css';

export default function AdminWelcomeBannerSkeleton() {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerText}>
        <div className={`${styles.skeleton} ${styles.bannerTitle}`} />
        <div className={`${styles.skeleton} ${styles.bannerDesc}`} />
        <div className={`${styles.skeleton} ${styles.bannerDescShort}`} />
      </div>
      <div className={`${styles.skeleton} ${styles.bannerArt}`} />
    </div>
  );
}
