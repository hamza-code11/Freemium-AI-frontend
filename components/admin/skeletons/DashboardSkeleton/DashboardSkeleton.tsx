import React from 'react';
import base from '../SkeletonBase.module.css';
import styles from './DashboardSkeleton.module.css';

export default function DashboardSkeleton() {
  return (
    <div className={base.pageWrapper}>
      {/* Banner */}
      <div className={`${base.skeleton} ${styles.banner}`}></div>
      
      {/* Stats Row */}
      <div className={styles.statsGrid}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className={base.card}>
            <div className={`${base.skeleton} ${styles.statIcon}`}></div>
            <div className={`${base.skeleton} ${styles.statTitle}`}></div>
            <div className={`${base.skeleton} ${styles.statVal}`}></div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className={styles.chartsRow}>
        <div className={base.card}>
          <div className={`${base.skeleton} ${styles.chartHeader}`}></div>
          <div className={`${base.skeleton} ${styles.chartBody}`}></div>
        </div>
        <div className={base.card}>
          <div className={`${base.skeleton} ${styles.chartHeader}`}></div>
          <div className={`${base.skeleton} ${styles.chartBody}`}></div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.bottomRow}>
        <div className={base.card} style={{ height: '260px' }}></div>
        <div className={base.card} style={{ height: '260px' }}></div>
        <div className={base.card} style={{ height: '260px' }}></div>
      </div>
    </div>
  );
}
