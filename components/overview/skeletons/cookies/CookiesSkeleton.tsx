import React from 'react';
import styles from './CookiesSkeleton.module.css';

export default function CookiesSkeleton() {
  return (
    <div className={styles.pageWrapper}>
      
      {/* HEADER SKELETON */}
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <div className={`${styles.skeleton} ${styles.title}`}></div>
          <div className={`${styles.skeleton} ${styles.subtitle}`}></div>
          <div className={`${styles.skeleton} ${styles.badge}`}></div>
        </div>
      </section>

      {/* CONTENT SKELETON */}
      <section className={styles.contentContainer}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className={styles.policyBlock}>
            <div className={`${styles.skeleton} ${styles.sectionTitle}`}></div>
            <div className={`${styles.skeleton} ${styles.textLine}`}></div>
            <div className={`${styles.skeleton} ${styles.textLine}`}></div>
            <div className={`${styles.skeleton} ${styles.textLineShort}`}></div>
          </div>
        ))}
      </section>

    </div>
  );
}
