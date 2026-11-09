// components/dashboard/skeletons/CampaignPlannerSkeleton/CampaignFormSkeleton.tsx
'use client';

import React from 'react';
import styles from './CampaignSkeletons.module.css';

export default function CampaignFormSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.formHead}>
        <div className={`${styles.skeleton} ${styles.formTitle}`} />
        <div className={`${styles.skeleton} ${styles.formBtn}`} />
      </div>

      <div className={`${styles.skeleton} ${styles.formLabel}`} />
      <div className={`${styles.skeleton} ${styles.formInput}`} />

      <div className={`${styles.skeleton} ${styles.formLabel}`} />
      <div className={styles.objectives}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`${styles.skeleton} ${styles.objectiveCard}`} />
        ))}
      </div>

      <div className={styles.formRow}>
        <div className={`${styles.skeleton} ${styles.formInput}`} />
        <div className={`${styles.skeleton} ${styles.formInput}`} />
      </div>

      <div className={`${styles.skeleton} ${styles.formLabel}`} />
      <div className={styles.channels}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={`${styles.skeleton} ${styles.channelPill}`} />
        ))}
      </div>

      <div className={styles.formRow}>
        <div className={`${styles.skeleton} ${styles.formInput}`} />
        <div className={`${styles.skeleton} ${styles.formInput}`} />
      </div>

      <div className={`${styles.skeleton} ${styles.textarea}`} />
      <div className={`${styles.skeleton} ${styles.submitBtn}`} />
    </div>
  );
}