// components/dashboard/content-generator/skeletons/ContentHeaderSkeleton.tsx
'use client';

import React from 'react';
import styles from './Skeletons.module.css';

export default function ContentHeaderSkeleton() {
  return (
    <div className={styles.header}>
      <div className={`${styles.skeleton} ${styles.headerTitle}`} />
      <div className={`${styles.skeleton} ${styles.headerSubtitle}`} />
      <div className={`${styles.skeleton} ${styles.headerChips}`} />
    </div>
  );
}
