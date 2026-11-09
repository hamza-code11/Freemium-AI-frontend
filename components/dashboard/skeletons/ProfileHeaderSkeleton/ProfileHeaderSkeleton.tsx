import React from 'react';
import styles from './Skeletons.module.css';

export default function ProfileHeaderSkeleton() {
  return (
    <div className={styles.headerRow}>
      <div className={styles.titleArea}>
        <div className={`${styles.iconBox} ${styles.skeletonPulse}`}></div>
        <div className={styles.textArea}>
          <div className={`${styles.skeletonText} ${styles.titleSkeleton} ${styles.skeletonPulse}`}></div>
          <div className={`${styles.skeletonText} ${styles.subtitleSkeleton} ${styles.skeletonPulse}`}></div>
          <div className={`${styles.skeletonText} ${styles.subtitleSkeleton} ${styles.skeletonPulse}`} style={{ width: '80%' }}></div>
        </div>
      </div>
    </div>
  );
}
