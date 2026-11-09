import React from 'react';
import styles from './Skeletons.module.css';

export default function BusinessInfoFormSkeleton() {
  return (
    <div className={styles.formContainer}>
      {/* Tabs Skeleton */}
      <div className={styles.tabs}>
        <div className={`${styles.tabSkeleton} ${styles.skeletonPulse}`}></div>
        <div className={`${styles.tabSkeleton} ${styles.skeletonPulse}`}></div>
      </div>

      <div className={styles.formBody}>
        {/* Title Skeleton */}
        <div className={`${styles.skeletonText} ${styles.sectionTitle} ${styles.skeletonPulse}`}></div>
        <div className={`${styles.skeletonText} ${styles.sectionSubtitle} ${styles.skeletonPulse}`}></div>

        {/* Form Fields Skeleton */}
        <div className={styles.formGrid}>
          <div className={styles.fieldGroup}>
            <div className={`${styles.skeletonText} ${styles.labelSkeleton} ${styles.skeletonPulse}`}></div>
            <div className={`${styles.inputSkeleton} ${styles.skeletonPulse}`}></div>
          </div>
          <div className={styles.fieldGroup}>
            <div className={`${styles.skeletonText} ${styles.labelSkeleton} ${styles.skeletonPulse}`}></div>
            <div className={`${styles.inputSkeleton} ${styles.skeletonPulse}`}></div>
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <div className={`${styles.skeletonText} ${styles.labelSkeleton} ${styles.skeletonPulse}`}></div>
          <div className={`${styles.textareaSkeleton} ${styles.skeletonPulse}`}></div>
        </div>

        <div className={styles.fieldGroup}>
          <div className={`${styles.skeletonText} ${styles.labelSkeleton} ${styles.skeletonPulse}`}></div>
          <div className={`${styles.inputSkeleton} ${styles.skeletonPulse}`}></div>
        </div>

        <div className={styles.fieldGroup}>
          <div className={`${styles.skeletonText} ${styles.labelSkeleton} ${styles.skeletonPulse}`}></div>
          <div className={`${styles.textareaSkeleton} ${styles.skeletonPulse}`}></div>
        </div>

        {/* Button Skeleton */}
        <div className={styles.actionRow}>
          <div className={`${styles.buttonSkeleton} ${styles.skeletonPulse}`}></div>
        </div>
      </div>
    </div>
  );
}
