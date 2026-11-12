// components/admin/skeletons/UsersSkeleton/UsersFilterSkeleton.tsx
'use client';

import React from 'react';
import styles from './UsersSkeletons.module.css';

export default function UsersFilterSkeleton() {
  return (
    <div className={styles.filterBar}>
      <div className={`${styles.skeleton} ${styles.filterSearch}`} />
      <div className={`${styles.skeleton} ${styles.filterDropdown}`} />
      <div className={`${styles.skeleton} ${styles.filterDropdown}`} />
      <div className={`${styles.skeleton} ${styles.filterDropdown}`} />
      <div className={`${styles.skeleton} ${styles.filterClear}`} />
    </div>
  );
}
