import React from 'react';
import styles from './ContactSkeleton.module.css';

export default function ContactSkeleton() {
  return (
    <div className={styles.pageWrapper}>
      
      {/* HERO SKELETON */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          
          {/* Left Text Skeleton */}
          <div className={styles.heroText}>
            <div className={`${styles.skeleton} ${styles.badge}`}></div>
            <div className={`${styles.skeleton} ${styles.title}`}></div>
            <div className={`${styles.skeleton} ${styles.titleShort}`}></div>
            <div className={`${styles.skeleton} ${styles.subtitle}`}></div>
            <div className={`${styles.skeleton} ${styles.subtitleShort}`}></div>

            <div className={styles.contactDetails}>
              <div className={styles.detailItem}>
                <div className={`${styles.skeleton} ${styles.detailIcon}`}></div>
                <div className={styles.detailTextGroup}>
                  <div className={`${styles.skeleton} ${styles.detailLabel}`}></div>
                  <div className={`${styles.skeleton} ${styles.detailLink}`}></div>
                </div>
              </div>
              <div className={styles.detailItem}>
                <div className={`${styles.skeleton} ${styles.detailIcon}`}></div>
                <div className={styles.detailTextGroup}>
                  <div className={`${styles.skeleton} ${styles.detailLabel}`}></div>
                  <div className={`${styles.skeleton} ${styles.detailLink}`}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Skeleton */}
          <div className={styles.formWrapper}>
            <div className={`${styles.skeleton} ${styles.formTitle}`}></div>
            <div className={`${styles.skeleton} ${styles.input}`}></div>
            <div className={`${styles.skeleton} ${styles.input}`}></div>
            <div className={`${styles.skeleton} ${styles.input}`}></div>
            <div className={`${styles.skeleton} ${styles.textarea}`}></div>
            <div className={`${styles.skeleton} ${styles.button}`}></div>
          </div>

        </div>
      </section>

      {/* INFO ROW SKELETON */}
      <section className={styles.infoRow}>
        <div className={styles.infoRowContainer}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.infoBlock}>
              <div className={`${styles.skeleton} ${styles.infoTitle}`}></div>
              <div className={`${styles.skeleton} ${styles.infoText}`}></div>
              <div className={`${styles.skeleton} ${styles.infoTextShort}`}></div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SKELETON */}
      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <div className={`${styles.skeleton} ${styles.faqTitle}`}></div>
          <div className={`${styles.skeleton} ${styles.faqSubtitle}`}></div>
        </div>

        <div className={styles.accordion}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.accordionItem}>
              <div className={`${styles.skeleton} ${styles.accordionHeader}`}></div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
