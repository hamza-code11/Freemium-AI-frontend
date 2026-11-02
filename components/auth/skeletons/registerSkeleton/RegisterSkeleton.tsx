import React from 'react';
import styles from './Registerskeleton.module.css';

export default function RegisterSkeleton() {
  return (
    <div className={styles.container}>
      
      {/* Header Skeleton */}
      <div className={styles.topBar}>
        <div className={styles.topLeft}>
          <div className={`${styles.skeleton} ${styles.backBtn}`}></div>
          <div className={`${styles.skeleton} ${styles.logo}`}></div>
        </div>
        <div className={`${styles.skeleton} ${styles.switchText}`}></div>
      </div>

      <div className={styles.formWrap}>
        {/* Heading Skeleton */}
        <div className={`${styles.skeleton} ${styles.title}`}></div>
        <div className={`${styles.skeleton} ${styles.subtitle}`}></div>

        <div className={styles.form}>
          
          {/* Account Details Section */}
          <div className={styles.group}>
            <div className={`${styles.skeleton} ${styles.legend}`}></div>
            <div className={styles.grid}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={styles.field}>
                  <div className={`${styles.skeleton} ${styles.label}`}></div>
                  <div className={`${styles.skeleton} ${styles.input}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Profile Section */}
          <div className={styles.group}>
            <div className={`${styles.skeleton} ${styles.legend}`}></div>
            <div className={styles.grid}>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={styles.field}>
                  <div className={`${styles.skeleton} ${styles.label}`}></div>
                  <div className={`${styles.skeleton} ${styles.input}`}></div>
                </div>
              ))}
              {/* Textarea full width */}
              <div className={`${styles.field} ${styles.full}`}>
                <div className={`${styles.skeleton} ${styles.label}`}></div>
                <div className={`${styles.skeleton} ${styles.textarea}`}></div>
              </div>
              <div className={`${styles.field} ${styles.full}`}>
                <div className={`${styles.skeleton} ${styles.label}`}></div>
                <div className={`${styles.skeleton} ${styles.textarea}`}></div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className={`${styles.skeleton} ${styles.submit}`}></div>
        </div>
      </div>
    </div>
  );
}
