import React from 'react';
import base from '../SkeletonBase.module.css';
import styles from './UsageSkeleton.module.css';

export default function UsageSkeleton() {
  return (
    <div className={base.pageWrapper}>
      <div>
        <div className={`${base.skeleton} ${styles.breadcrumb}`} />
        <div className={`${base.skeleton} ${styles.title}`} />
        <div className={`${base.skeleton} ${styles.subtitle}`} />
      </div>
      <div className={styles.statsGrid}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className={base.card} style={{ height: 70 }} />
        ))}
      </div>
      <div className={styles.chartsRow}>
        <div className={base.card} style={{ height: 280 }} />
        <div className={base.card} style={{ height: 280 }} />
      </div>
      <div className={styles.mainLayout}>
        <div className={base.card} style={{ height: 450 }} />
        <div className={base.card} style={{ height: 450 }} />
      </div>
    </div>
  );
}
