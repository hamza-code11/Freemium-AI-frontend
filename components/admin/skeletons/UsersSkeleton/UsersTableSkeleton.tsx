// components/admin/skeletons/UsersSkeleton/UsersTableSkeleton.tsx
'use client';

import React from 'react';
import styles from './UsersSkeletons.module.css';

export default function UsersTableSkeleton() {
  return (
    <div className={styles.tableCard}>
      {/* Header */}
      <div className={styles.tableHeader}>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i} className={`${styles.skeleton} ${styles.tableHeaderCell}`} />
        ))}
      </div>

      {/* Rows */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <div key={i} className={styles.tableRow}>
          <div className={`${styles.skeleton} ${styles.checkbox}`} />
          <div className={styles.userCell}>
            <div className={`${styles.skeleton} ${styles.avatar}`} />
            <div className={styles.userInfo}>
              <div className={`${styles.skeleton} ${styles.userName}`} />
              <div className={`${styles.skeleton} ${styles.userEmail}`} />
            </div>
          </div>
          <div className={`${styles.skeleton} ${styles.badge}`} />
          <div className={`${styles.skeleton} ${styles.badge}`} />
          <div className={`${styles.skeleton} ${styles.mutedText}`} />
          <div className={`${styles.skeleton} ${styles.mutedText}`} />
          <div className={`${styles.skeleton} ${styles.actionBtn}`} />
        </div>
      ))}

      {/* Pagination */}
      <div className={styles.pagination}>
        <div className={`${styles.skeleton} ${styles.pageInfo}`} />
        <div className={styles.pageControls}>
          <div className={`${styles.skeleton} ${styles.pageBtn}`} />
          <div className={`${styles.skeleton} ${styles.pageBtn}`} />
          <div className={`${styles.skeleton} ${styles.pageBtn}`} />
        </div>
      </div>
    </div>
  );
}
