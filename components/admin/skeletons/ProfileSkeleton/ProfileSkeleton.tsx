import React from 'react';
import base from '../SkeletonBase.module.css';
import styles from './ProfileSkeleton.module.css';

export default function ProfileSkeleton() {
  return (
    <div className={base.pageWrapper}>
      <div>
        <div className={`${base.skeleton} ${styles.title}`}></div>
        <div className={`${base.skeleton} ${styles.subtitle}`}></div>
      </div>

      <div className={styles.formContainer}>
        {/* Card 1 */}
        <div className={base.card} style={{ height: '160px' }}></div>
        {/* Card 2 */}
        <div className={base.card} style={{ height: '200px' }}></div>
        {/* Card 3 */}
        <div className={base.card} style={{ height: '260px' }}></div>
      </div>
    </div>
  );
}
