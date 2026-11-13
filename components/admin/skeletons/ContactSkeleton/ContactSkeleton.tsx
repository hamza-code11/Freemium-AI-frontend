import React from 'react';
import base from '../SkeletonBase.module.css';
import styles from './ContactSkeleton.module.css';

export default function ContactSkeleton() {
  return (
    <div className={base.pageWrapper}>
      <div>
        <div className={`${base.skeleton} ${styles.breadcrumb}`} />
        <div className={`${base.skeleton} ${styles.title}`} />
        <div className={`${base.skeleton} ${styles.subtitle}`} />
      </div>
      <div className={`${base.card} ${styles.filters}`} />
      <div className={`${base.card} ${styles.table}`} />
    </div>
  );
}
