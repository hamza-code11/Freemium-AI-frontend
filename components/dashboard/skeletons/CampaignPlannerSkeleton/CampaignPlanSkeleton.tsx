// components/dashboard/skeletons/CampaignPlannerSkeleton/CampaignPlanSkeleton.tsx
'use client';

import React from 'react';
import styles from './CampaignSkeletons.module.css';

export default function CampaignPlanSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.formHead}>
        <div className={`${styles.skeleton} ${styles.formTitle}`} />
        <div className={`${styles.skeleton} ${styles.formLabel}`} style={{ width: 150 }} />
      </div>

      <div className={styles.planOverview}>
        <div className={`${styles.skeleton} ${styles.planThumb}`} />
        <div className={styles.planInfo}>
          <div className={`${styles.skeleton} ${styles.planTitle}`} />
          <div className={`${styles.skeleton} ${styles.planDesc}`} />
        </div>
      </div>

      <div className={styles.block}>
        <div className={`${styles.skeleton} ${styles.blockTitle}`} />
        <div className={`${styles.skeleton} ${styles.blockText}`} />
        <div className={`${styles.skeleton} ${styles.blockText}`} />
        <div className={`${styles.skeleton} ${styles.blockTextShort}`} />
      </div>

      <div className={styles.block}>
        <div className={`${styles.skeleton} ${styles.blockTitle}`} />
        <div className={styles.channels}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`${styles.skeleton} ${styles.channelPill}`} style={{ width: 80 }} />
          ))}
        </div>
      </div>

      <div className={styles.block}>
        <div className={`${styles.skeleton} ${styles.blockTitle}`} />
        <div className={styles.weeks}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`${styles.skeleton} ${styles.weekCard}`} />
          ))}
        </div>
      </div>

      <div className={styles.triple}>
        <div className={styles.block}>
          <div className={`${styles.skeleton} ${styles.blockTitle}`} />
          <div className={`${styles.skeleton} ${styles.blockText}`} />
        </div>
        <div className={styles.block}>
          <div className={`${styles.skeleton} ${styles.blockTitle}`} />
          <div className={`${styles.skeleton} ${styles.blockText}`} />
        </div>
        <div className={styles.block}>
          <div className={`${styles.skeleton} ${styles.blockTitle}`} />
          <div className={`${styles.skeleton} ${styles.blockText}`} />
        </div>
      </div>
    </div>
  );
}