// components/dashboard/history/skeletons/HistoryFiltersSkeleton.tsx
'use client';

import React from 'react';
import styles from './HistorySkeletons.module.css';

export default function HistoryFiltersSkeleton() {
  return (
    <div className={styles.filtersSkeleton}>
      
      {/* Top Row: Search + 2 Dropdowns */}
      <div className={styles.filtersTopRow}>
        <div className={`${styles.skeleton} ${styles.searchSkeleton}`} />
        <div className={`${styles.skeleton} ${styles.dropdownSkeleton}`} />
        <div className={`${styles.skeleton} ${styles.dropdownSkeletonShort}`} />
      </div>

      {/* Bottom Row: Tabs + Clear Button */}
      <div className={styles.filtersBottomRow}>
        <div className={styles.tabsSkeleton}>
          <div className={`${styles.skeleton} ${styles.tabPill}`} />
          <div className={`${styles.skeleton} ${styles.tabPillShort}`} />
          <div className={`${styles.skeleton} ${styles.tabPillShort}`} />
          <div className={`${styles.skeleton} ${styles.tabPill}`} />
        </div>
        <div className={`${styles.skeleton} ${styles.clearBtnSkeleton}`} />
      </div>

    </div>
  );
}