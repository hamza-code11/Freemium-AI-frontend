import React from 'react';
import styles from './AboutSkeleton.module.css';

export default function AboutSkeleton() {
  return (
    <div className={styles.pageWrapper}>
      
      {/* HERO SKELETON */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={`${styles.skeleton} ${styles.badge}`}></div>
            <div className={`${styles.skeleton} ${styles.title}`}></div>
            <div className={`${styles.skeleton} ${styles.titleShort}`}></div>
            <div className={`${styles.skeleton} ${styles.subtitle}`}></div>
            <div className={`${styles.skeleton} ${styles.subtitleShort}`}></div>

            <div className={styles.ctaGroup}>
              <div className={`${styles.skeleton} ${styles.btn}`}></div>
              <div className={`${styles.skeleton} ${styles.btn}`}></div>
            </div>

            <div className={styles.statsGroup}>
              <div className={styles.statItem}>
                <div className={`${styles.skeleton} ${styles.statNum}`}></div>
                <div className={`${styles.skeleton} ${styles.statLabel}`}></div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <div className={`${styles.skeleton} ${styles.statNum}`}></div>
                <div className={`${styles.skeleton} ${styles.statLabel}`}></div>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <div className={`${styles.skeleton} ${styles.statNum}`}></div>
                <div className={`${styles.skeleton} ${styles.statLabel}`}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION SKELETON */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={`${styles.skeleton} ${styles.sectionTitle}`}></div>
          <div className={`${styles.skeleton} ${styles.sectionSubtitle}`}></div>
        </div>

        <div className={styles.cardGrid}>
          <div className={styles.skeletonCard}>
            <div className={`${styles.skeleton} ${styles.cardTitle}`}></div>
            <div className={`${styles.skeleton} ${styles.cardText}`}></div>
            <div className={`${styles.skeleton} ${styles.cardTextShort}`}></div>
          </div>
          <div className={styles.skeletonCard}>
            <div className={`${styles.skeleton} ${styles.cardTitle}`}></div>
            <div className={`${styles.skeleton} ${styles.cardText}`}></div>
            <div className={`${styles.skeleton} ${styles.cardTextShort}`}></div>
          </div>
        </div>
      </section>

      {/* AUDIENCE SKELETON */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={`${styles.skeleton} ${styles.sectionTitle}`}></div>
          <div className={`${styles.skeleton} ${styles.sectionSubtitle}`}></div>
        </div>

        <div className={styles.audienceGrid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.skeletonAudienceCard}>
              <div className={`${styles.skeleton} ${styles.audienceTitle}`}></div>
              <div className={`${styles.skeleton} ${styles.audienceDesc}`}></div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SKELETON */}
      <section className={styles.section}>
        <div className={`${styles.skeleton} ${styles.ctaBox}`}></div>
      </section>

    </div>
  );
}
