import React from 'react';
import styles from './Skeletons.module.css';

export default function ProfilePreviewSkeleton() {
  return (
    <div className={styles.previewCard}>
      <div className={styles.previewHeader}>
        <div className={`${styles.skeletonText} ${styles.titleSkeleton} ${styles.skeletonPulse}`}></div>
        <div className={`${styles.skeletonText} ${styles.subtitleSkeleton} ${styles.skeletonPulse}`}></div>
      </div>

      <div className={styles.divider}></div>

      {/* User Identity Skeleton */}
      <div className={styles.userIdentity}>
        <div className={`${styles.avatarSkeleton} ${styles.skeletonPulse}`}></div>
        <div className={styles.identityText}>
          <div className={`${styles.skeletonText} ${styles.nameSkeleton} ${styles.skeletonPulse}`}></div>
          <div className={`${styles.skeletonText} ${styles.emailSkeleton} ${styles.skeletonPulse}`}></div>
        </div>
      </div>

      <div className={styles.divider}></div>

      {/* Business Content Skeleton */}
      <div className={styles.businessBlock}>
        <div className={styles.bizTitleRow}>
          <div className={`${styles.logoSkeleton} ${styles.skeletonPulse}`}></div>
          <div>
            <div className={`${styles.skeletonText} ${styles.bizNameSkeleton} ${styles.skeletonPulse}`}></div>
            <div className={`${styles.skeletonText} ${styles.bizTypeSkeleton} ${styles.skeletonPulse}`}></div>
          </div>
        </div>

        <div className={styles.paragraphBlock}>
          <div className={`${styles.skeletonText} ${styles.paragraphLine} ${styles.skeletonPulse}`}></div>
          <div className={`${styles.skeletonText} ${styles.paragraphLine} ${styles.skeletonPulse}`}></div>
          <div className={`${styles.skeletonText} ${styles.paragraphLine} ${styles.skeletonPulse}`} style={{ width: '60%' }}></div>
        </div>

        <div className={styles.detailsGridSkeleton}>
          <div className={`${styles.detailBoxSkeleton} ${styles.skeletonPulse}`}></div>
          <div className={`${styles.detailBoxSkeleton} ${styles.skeletonPulse}`}></div>
        </div>
      </div>
    </div>
  );
}
