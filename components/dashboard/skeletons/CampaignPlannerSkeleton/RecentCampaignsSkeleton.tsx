// components/dashboard/skeletons/CampaignPlannerSkeleton/RecentCampaignsSkeleton.tsx
'use client';

import React from 'react';
import styles from './CampaignSkeletons.module.css';

export default function RecentCampaignsSkeleton() {
  return (
    <div className={styles.card} style={{ minHeight: 'auto' }}>
      <div className={styles.formHead} style={{ marginBottom: '1rem' }}>
        <div className={`${styles.skeleton} ${styles.formTitle}`} style={{ width: 180 }} />
        <div className={`${styles.skeleton} ${styles.formLabel}`} style={{ width: 60 }} />
      </div>

      <div className={styles.triple} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.recentItem}>
            <div className={`${styles.skeleton} ${styles.recentThumb}`} />
            <div className={styles.recentInfo}>
              <div className={`${styles.skeleton} ${styles.recentTitle}`} />
              <div className={`${styles.skeleton} ${styles.recentMeta}`} />
              <div className={`${styles.skeleton} ${styles.recentMeta}`} style={{ width: '40%' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}