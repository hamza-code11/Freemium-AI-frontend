// components/dashboard/help/skeletons/HelpTicketsSkeleton.tsx
'use client';

import React from 'react';
import styles from './HelpSkeletons.module.css';

export default function HelpTicketsSkeleton() {
  return (
    <div className={styles.tableCard}>
      
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={`${styles.skeleton} ${styles.headerIcon}`} />
        <div className={styles.headerText}>
          <div className={`${styles.skeleton} ${styles.headerTitle}`} />
          <div className={`${styles.skeleton} ${styles.headerSubtitle}`} />
        </div>
      </div>

      {/* Table */}
      <div className={styles.table}>
        
        {/* Header Row */}
        <div className={styles.tableHeader}>
          <div className={`${styles.skeleton} ${styles.tableCell}`} />
          <div className={`${styles.skeleton} ${styles.tableCell}`} />
          <div className={`${styles.skeleton} ${styles.tableCell}`} />
          <div className={`${styles.skeleton} ${styles.tableCell}`} />
          <div className={`${styles.skeleton} ${styles.tableCell}`} />
        </div>

        {/* Data Rows */}
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={styles.tableRow}>
            <div className={`${styles.skeleton} ${styles.tableCellShort}`} />
            <div className={`${styles.skeleton} ${styles.tableCell}`} />
            <div className={`${styles.skeleton} ${styles.tableCellShort}`} />
            <div className={`${styles.skeleton} ${styles.tableBadge}`} />
            <div className={`${styles.skeleton} ${styles.tableBtn}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
