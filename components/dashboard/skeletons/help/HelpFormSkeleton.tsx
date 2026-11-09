// components/dashboard/help/skeletons/HelpFormSkeleton.tsx
'use client';

import React from 'react';
import styles from './HelpSkeletons.module.css';

export default function HelpFormSkeleton() {
  return (
    <div className={styles.card}>
      
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={`${styles.skeleton} ${styles.headerIcon}`} />
        <div className={styles.headerText}>
          <div className={`${styles.skeleton} ${styles.headerTitle}`} />
          <div className={`${styles.skeleton} ${styles.headerSubtitle}`} />
        </div>
      </div>

      {/* Form Fields */}
      <div className={styles.formBody}>
        {/* Name + Email */}
        <div className={styles.formRow}>
          <div className={styles.field}>
            <div className={`${styles.skeleton} ${styles.label}`} />
            <div className={`${styles.skeleton} ${styles.input}`} />
          </div>
          <div className={styles.field}>
            <div className={`${styles.skeleton} ${styles.label}`} />
            <div className={`${styles.skeleton} ${styles.input}`} />
          </div>
        </div>

        {/* Subject */}
        <div className={styles.field}>
          <div className={`${styles.skeleton} ${styles.label}`} />
          <div className={`${styles.skeleton} ${styles.input}`} />
        </div>

        {/* Description */}
        <div className={styles.field}>
          <div className={`${styles.skeleton} ${styles.label}`} />
          <div className={`${styles.skeleton} ${styles.textarea}`} />
        </div>

        {/* Attachment */}
        <div className={styles.field}>
          <div className={`${styles.skeleton} ${styles.label}`} />
          <div className={`${styles.skeleton} ${styles.input}`} />
        </div>

        {/* Button */}
        <div className={`${styles.skeleton} ${styles.button}`} />
      </div>
    </div>
  );
}
