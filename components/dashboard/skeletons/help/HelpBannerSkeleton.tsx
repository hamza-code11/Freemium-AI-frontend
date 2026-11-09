// components/dashboard/help/skeletons/HelpBannerSkeleton.tsx
'use client';

import React from 'react';
import styles from './HelpSkeletons.module.css';

export default function HelpBannerSkeleton() {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerLeft}>
        <div className={`${styles.skeleton} ${styles.iconBadge}`} />
        <div className={styles.bannerText}>
          <div className={`${styles.skeleton} ${styles.bannerTitle}`} />
          <div className={`${styles.skeleton} ${styles.bannerSubtitle}`} />
        </div>
      </div>
      <div className={`${styles.skeleton} ${styles.bannerVisual}`} />
    </div>
  );
}
