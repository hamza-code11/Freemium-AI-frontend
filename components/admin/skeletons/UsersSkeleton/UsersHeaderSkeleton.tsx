// components/admin/skeletons/UsersSkeleton/UsersHeaderSkeleton.tsx
'use client';

import React from 'react';
import styles from './UsersSkeletons.module.css';

export default function UsersHeaderSkeleton() {
  return (
    <div className={styles.headerRow}>
      <div className={styles.headerLeft}>
        <div className={`${styles.skeleton} ${styles.breadcrumb}`} />
        <div className={`${styles.skeleton} ${styles.title}`} />
        <div className={`${styles.skeleton} ${styles.subtitle}`} />
      </div>
      <div className={`${styles.skeleton} ${styles.headerBtn}`} />
    </div>
  );
}

