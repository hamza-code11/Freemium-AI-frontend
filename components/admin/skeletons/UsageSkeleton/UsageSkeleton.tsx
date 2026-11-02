import React from 'react';
import base from '../SkeletonBase.module.css';
import styles from './UsageSkeleton.module.css';

export default function UsageSkeleton() {
  return (
    <div className={base.pageWrapper}>
      <div>
        <div className={`${base.skeleton} ${styles.breadcrumb}`}></div>
        <div className={`${base.skeleton} ${styles.title}`}></div>
        <div className={`${base.skeleton} ${styles.subtitle}`}></div>
      </div>

      {/* Stats Row */}
      <div className={styles.statsGrid}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={base.card} style={{ height: '70px' }}></div>
        ))}
      </div>

      {/* Charts Row */}
      <div className={styles.chartsRow}>
        <div className={base.card} style={{ height: '280px' }}></div>
        <div className={base.card} style={{ height: '280px' }}></div>
      </div>

      {/* Table + Panel */}
      <div className={styles.mainLayout}>
        <div className={base.card} style={{ height: '450px' }}></div>
        <div className={base.card} style={{ height: '450px' }}></div>
      </div>
    </div>
  );
}
