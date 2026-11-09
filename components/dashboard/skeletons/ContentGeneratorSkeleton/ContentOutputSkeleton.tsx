// components/dashboard/content-generator/skeletons/ContentOutputSkeleton.tsx
'use client';

import React from 'react';
import styles from './Skeletons.module.css';

export default function ContentOutputSkeleton() {
  return (
    <div className={styles.panel}>
      {/* Head */}
      <div className={`${styles.skeleton} ${styles.outputHead}`} />

      {/* Output Box */}
      <div className={`${styles.skeleton} ${styles.outputBox}`} />

      {/* Pro Tip */}
      <div className={`${styles.skeleton} ${styles.outputTip}`} />
    </div>
  );
}