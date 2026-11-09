// components/dashboard/history/skeletons/HistoryTableSkeleton.tsx
'use client';

import React from 'react';
import styles from './HistorySkeletons.module.css';

export default function HistoryTableSkeleton() {
  return (
    <div className={styles.tableCard}>
      
      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Preview</th>
              <th>Created</th>
              <th className={styles.centerText}>View</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className={styles.row}>
                {/* Title Cell */}
                <td>
                  <div className={styles.titleCell}>
                    <div className={`${styles.skeleton} ${styles.skeletonIcon}`} />
                    <div className={styles.titleCellContent}>
                      <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
                      <div className={`${styles.skeleton} ${styles.skeletonBadge}`} />
                    </div>
                  </div>
                </td>

                {/* Preview Cell */}
                <td>
                  <div className={`${styles.skeleton} ${styles.skeletonPreview}`} />
                </td>

                {/* Date Cell */}
                <td>
                  <div className={styles.skeletonDateCell}>
                    <div className={`${styles.skeleton} ${styles.skeletonDate}`} />
                    <div className={`${styles.skeleton} ${styles.skeletonTime}`} />
                  </div>
                </td>

                {/* View Button */}
                <td className={styles.centerText}>
                  <div className={`${styles.skeleton} ${styles.skeletonViewBtn}`} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Skeleton */}
      <div className={styles.paginationSkeleton}>
        <div className={`${styles.skeleton} ${styles.paginationInfoSkeleton}`} />
        <div className={styles.paginationControlsSkeleton}>
          <div className={`${styles.skeleton} ${styles.pageBtnSkeleton}`} />
          <div className={`${styles.skeleton} ${styles.pageBtnSkeleton}`} />
          <div className={`${styles.skeleton} ${styles.pageBtnSkeleton}`} />
          <div className={`${styles.skeleton} ${styles.pageBtnSkeleton}`} />
        </div>
      </div>

    </div>
  );
}
