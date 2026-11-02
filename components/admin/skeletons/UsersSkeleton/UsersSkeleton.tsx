import React from 'react';
import base from '../SkeletonBase.module.css';
import styles from './UsersSkeleton.module.css';

export default function UsersSkeleton() {
  return (
    <div className={base.pageWrapper}>
      {/* Header */}
      <div>
        <div className={`${base.skeleton} ${styles.breadcrumb}`}></div>
        <div className={`${base.skeleton} ${styles.title}`}></div>
        <div className={`${base.skeleton} ${styles.subtitle}`}></div>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className={base.card}>
            <div className={`${base.skeleton} ${styles.icon}`}></div>
            <div className={`${base.skeleton} ${styles.sTitle}`}></div>
            <div className={`${base.skeleton} ${styles.sVal}`}></div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className={`${base.card} ${styles.filterBar}`}></div>

      {/* Main Layout */}
      <div className={styles.mainLayout}>
        <div className={base.card} style={{ height: '500px' }}></div>
        <div className={base.card} style={{ height: '500px' }}></div>
      </div>
    </div>
  );
}
