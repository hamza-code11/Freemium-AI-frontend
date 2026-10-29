'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Blog.module.css';
import { blogPosts } from '@/data/blog';

export default function BlogContent() {
  return (
    <div className={styles.pageWrapper}>
      
      {/* HEADER (Updated to match About Page Hero) */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              Our Blog
            </div>
            
            <h1 className={styles.heroTitle}>
              Insights to Grow <br />
              <span className={styles.gradientText}>Your Business</span>
            </h1>
            
            <p className={styles.heroSubtitle}>
              Discover the latest trends, AI strategies, and actionable tutorials designed to help startups, freelancers, and SMEs scale faster.
            </p>

            {/* Trust Stats (Same as About page) */}
            <div className={styles.trustStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>100+</span>
                <span className={styles.statLabel}>Articles Published</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>10k+</span>
                <span className={styles.statLabel}>Monthly Readers</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>Weekly</span>
                <span className={styles.statLabel}>New Content</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className={styles.blogSection}>
        <div className={styles.grid}>
          {blogPosts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className={styles.card}>
              
              {/* Image */}
              <div className={styles.imageWrapper}>
                <Image 
                  src={post.image} 
                  alt={post.title} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.image}
                />
                <span className={styles.categoryBadge}>{post.category}</span>
              </div>

              {/* Content */}
              <div className={styles.content}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                
                {/* Footer */}
                <div className={styles.cardFooter}>
                  <div className={styles.author}>
                    <span className={styles.playIcon}>▶</span>
                    {post.author}
                  </div>
                  <span className={styles.date}>{post.date}</span>
                </div>
              </div>

            </Link>
          ))}
        </div>

        {/* PAGINATION */}
        <nav className={styles.pagination} aria-label="Blog pagination">
          <button className={styles.pageBtn} disabled aria-label="Previous page">
            Previous
          </button>
          <button className={`${styles.pageBtn} ${styles.active}`} aria-label="Page 1" aria-current="page">
            1
          </button>
          <button className={styles.pageBtn} aria-label="Page 2">
            2
          </button>
          <button className={styles.pageBtn} aria-label="Next page">
            Next
          </button>
        </nav>
      </section>

    </div>
  );
}
