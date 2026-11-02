import React from 'react';
import base from '../SkeletonBase.module.css';
import styles from './PlansSkeleton.module.css';

export default function PlansSkeleton() {
  return (
    <div className={base.pageWrapper}>
      <div>
        <div className={`${base.skeleton} ${styles.breadcrumb}`}></div>
        <div className={`${base.skeleton} ${styles.title}`}></div>
        <div className={`${base.skeleton} ${styles.subtitle}`}></div>
      </div>

      {/* Plan Cards */}
      <div className={styles.planGrid}>
        <div className={base.card} style={{ height: '220px' }}></div>
        <div className={base.card} style={{ height: '220px' }}></div>
      </div>

      {/* Middle Row */}
      <div className={styles.middleRow}>
        <div className={base.card} style={{ height: '180px' }}></div>
        <div className={base.card} style={{ height: '180px' }}></div>
      </div>

      {/* Main Layout */}
      <div className={styles.mainLayout}>
        <div className={base.card} style={{ height: '400px' }}></div>
        <div className={base.card} style={{ height: '400px' }}></div>
      </div>
    </div>
  );
}
