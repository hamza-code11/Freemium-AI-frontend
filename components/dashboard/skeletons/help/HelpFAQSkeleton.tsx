// components/dashboard/help/skeletons/HelpFAQSkeleton.tsx
'use client';

import React from 'react';
import styles from './HelpSkeletons.module.css';

export default function HelpFAQSkeleton() {
  return (
    <div className={styles.card}>
      
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={`${styles.skeleton} ${styles.headerIcon}`} />
        <div className={styles.headerText}>
          <div className={`${styles.skeleton} ${styles.headerTitle}`} />
          <div className={`${styles.skeleton} ${styles.headerSubtitle}`} />
        </div>
      </div>

      {/* FAQ Items */}
      <div className={styles.faqList}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={`${styles.skeleton} ${styles.faqItem}`} />
        ))}
      </div>
    </div>
  );
}
