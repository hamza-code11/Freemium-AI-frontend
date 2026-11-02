import React from 'react';
import styles from './Loginskeleton.module.css';

export default function LoginSkeleton() {
  return (
    <div className={styles.container}>
      
      {/* Back Button Skeleton */}
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

          {/* Password Field Skeleton */}
          <div className={styles.field}>
            <div className={`${styles.skeleton} ${styles.label}`}></div>
            <div className={`${styles.skeleton} ${styles.input}`}></div>
          </div>

          {/* Options Row Skeleton */}
          <div className={styles.optionsRow}>
            <div className={`${styles.skeleton} ${styles.checkbox}`}></div>
            <div className={`${styles.skeleton} ${styles.textLink}`}></div>
          </div>

          {/* Submit Button Skeleton */}
          <div className={`${styles.skeleton} ${styles.submit}`}></div>
        </div>

        {/* Bottom Text Skeleton */}
        <div className={`${styles.skeleton} ${styles.bottomText}`}></div>
      </div>
    </div>
  );
}
