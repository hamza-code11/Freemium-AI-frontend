// components/admin/skeletons/UsersSkeleton/UserDetailsSkeleton.tsx
'use client';

import React from 'react';
import styles from './UsersSkeletons.module.css';

export default function UserDetailsSkeleton() {
  return (
    <div className={styles.panelCard}>
      <div className={`${styles.skeleton} ${styles.panelTitle}`} />

      <div className={styles.panelProfile}>
        <div className={`${styles.skeleton} ${styles.panelAvatar}`} />
        <div className={styles.panelInfo}>
          <div className={`${styles.skeleton} ${styles.panelName}`} />
          <div className={`${styles.skeleton} ${styles.panelEmail}`} />
        </div>
      </div>

      <div className={styles.panelDivider} />

      <div className={styles.panelSection}>
        <div className={`${styles.skeleton} ${styles.panelSectionTitle}`} />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.panelRow}>
            <div className={`${styles.skeleton} ${styles.panelLabel}`} />
            <div className={`${styles.skeleton} ${styles.panelValue}`} />
          </div>
        ))}
      </div>

      <div className={styles.panelDivider} />

      <div className={styles.panelSection}>
        <div className={`${styles.skeleton} ${styles.panelSectionTitle}`} />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.panelRow}>
            <div className={`${styles.skeleton} ${styles.panelLabel}`} />
            <div className={`${styles.skeleton} ${styles.panelValue}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

