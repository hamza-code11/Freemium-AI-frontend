import React from 'react';
import styles from './ForgotPasswordSkeleton.module.css';

export default function ForgotPasswordSkeleton() {
  return (
    <div className={styles.container}>
      
      {/* Top Bar Skeleton */}
      <div className={styles.topBar}>
        <div className={`${styles.skeleton} ${styles.backBtn}`}></div>
      </div>

      <div className={styles.formWrap}>
        {/* Heading Skeleton */}
        <div className={`${styles.skeleton} ${styles.title}`}></div>
        <div className={`${styles.skeleton} ${styles.subtitle}`}></div>

        <div className={styles.form}>
          {/* Email Field Skeleton */}
          <div className={styles.field}>
            <div className={`${styles.skeleton} ${styles.label}`}></div>
            <div className={`${styles.skeleton} ${styles.input}`}></div>
          </div>

          {/* Submit Button Skeleton */}
          <div className={`${styles.skeleton} ${styles.submit}`}></div>
        </div>
      </div>
    </div>
  );
}
