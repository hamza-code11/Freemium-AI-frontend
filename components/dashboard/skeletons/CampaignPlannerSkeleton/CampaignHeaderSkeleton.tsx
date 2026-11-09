// components/dashboard/skeletons/CampaignPlannerSkeleton/CampaignHeaderSkeleton.tsx
'use client';

import React from 'react';
import styles from './CampaignSkeletons.module.css';

export default function CampaignHeaderSkeleton() {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={`${styles.skeleton} ${styles.headerTitle}`} />
        <div className={`${styles.skeleton} ${styles.headerSubtitle}`} />
      </div>
      <div className={`${styles.skeleton} ${styles.headerVisual}`} />
    </div>
  );
}