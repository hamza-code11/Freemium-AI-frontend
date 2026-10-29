import React from 'react';
import styles from './BlogSkeleton.module.css';

export default function BlogSkeleton() {
  return (
    <div className={styles.pageWrapper}>
      
      {/* HEADER SKELETON */}
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <div className={`${styles.skeleton} ${styles.badge}`}></div>
          <div className={`${styles.skeleton} ${styles.title}`}></div>
          <div className={`${styles.skeleton} ${styles.subtitle}`}></div>
        </div>
      </section>

      {/* BLOG GRID SKELETON */}
      <section className={styles.blogSection}>
        <div className={styles.grid}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className={styles.card}>
              
              {/* Image Skeleton */}
              <div className={styles.imageWrapper}>
                <div className={`${styles.skeleton} ${styles.image}`}></div>
              </div>

              {/* Content Skeleton */}
              <div className={styles.content}>
                <div className={`${styles.skeleton} ${styles.postTitle}`}></div>
                <div className={`${styles.skeleton} ${styles.postTitleShort}`}></div>
                
                <div className={`${styles.skeleton} ${styles.postExcerpt}`}></div>
                <div className={`${styles.skeleton} ${styles.postExcerptShort}`}></div>

                {/* Footer Skeleton */}
                <div className={styles.cardFooter}>
                  <div className={`${styles.skeleton} ${styles.author}`}></div>
                  <div className={`${styles.skeleton} ${styles.date}`}></div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* PAGINATION SKELETON */}
        <div className={styles.pagination}>
          <div className={`${styles.skeleton} ${styles.pageBtn}`}></div>
          <div className={`${styles.skeleton} ${styles.pageBtnSmall}`}></div>
          <div className={`${styles.skeleton} ${styles.pageBtnSmall}`}></div>
          <div className={`${styles.skeleton} ${styles.pageBtn}`}></div>
        </div>
      </section>

    </div>
  );
}
