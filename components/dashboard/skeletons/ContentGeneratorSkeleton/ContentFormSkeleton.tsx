// components/dashboard/content-generator/skeletons/ContentFormSkeleton.tsx
'use client';

import React from 'react';
import styles from './Skeletons.module.css';

export default function ContentFormSkeleton() {
  return (
    <div className={styles.panel}>
      {/* Platform Dropdown */}
      <div className={`${styles.skeleton} ${styles.input}`} />

      {/* Content Type Grid */}
      <div className={`${styles.skeleton} ${styles.label}`} />
      <div className={styles.typeGrid}>
        {[1, 2, 3].map((i) => (
          <div key={i} className={`${styles.skeleton} ${styles.typeCard}`} />
        ))}
      </div>

      {/* Topic Input */}
      <div className={`${styles.skeleton} ${styles.label}`} />
      <div className={`${styles.skeleton} ${styles.input}`} />

      {/* Target Audience */}
      <div className={`${styles.skeleton} ${styles.label}`} />
      <div className={`${styles.skeleton} ${styles.input}`} />

      {/* Tone & Language (2 cols) */}
      <div className={styles.row}>
        <div className={`${styles.skeleton} ${styles.input}`} />
        <div className={`${styles.skeleton} ${styles.input}`} />
      </div>

      {/* Generate Button */}
      <div className={`${styles.skeleton} ${styles.button}`} />
    </div>
  );
}