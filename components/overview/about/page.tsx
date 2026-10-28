'use client';

import React from 'react';
import Link from 'next/link';
import styles from './About.module.css';

export default function About() {
  return (
    <div className={styles.pageWrapper}>
      
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              Our Story
            </div>
            
            <h1 className={styles.heroTitle}>
              Democratizing AI for <br />
              <span className={styles.gradientText}>Every Business</span>
            </h1>
            
            <p className={styles.heroSubtitle}>
              Freemium AI was built to bridge the gap between advanced Artificial Intelligence and small businesses. We believe every entrepreneur deserves a world-class marketing team—without the big budget.
            </p>

            <div className={styles.heroCta}>
              <Link href="/#pricing" className={styles.btnPrimary}>
                Get Started Free
              </Link>
              <Link href="/#features" className={styles.btnSecondary}>
                Explore Features
              </Link>
            </div>

            <div className={styles.trustStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>10k+</span>
                <span className={styles.statLabel}>Businesses Helped</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>50k+</span>
                <span className={styles.statLabel}>Content Generated</span>
              </div>
              <div className={styles.statDivider}></div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>99%</span>
                <span className={styles.statLabel}>Satisfaction Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Freemium AI Exists</h2>
          <p className={styles.sectionSubtitle}>Small businesses deserve big-brand marketing power.</p>
        </div>

        <div className={styles.cardGrid}>
          <div className={styles.infoCard}>
            <h3 className={styles.cardTitle}>The Problem</h3>
            <p className={styles.cardText}>
              SMEs make up 90% of global businesses, yet they struggle with limited budgets, lack of marketing skills, and expensive software. AI was supposed to help—but it's too complex and costly for most.
            </p>
          </div>
          <div className={`${styles.infoCard} ${styles.accentCard}`}>
            <h3 className={styles.cardTitle}>Our Solution</h3>
            <p className={styles.cardText}>
              A freemium, AI-powered platform specifically designed for SMEs. We combine NLP and Machine Learning with an intuitive interface to give you a virtual marketing team—affordable and accessible.
            </p>
          </div>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Built for the Modern Entrepreneur</h2>
          <p className={styles.sectionSubtitle}>Who uses Freemium AI every day.</p>
        </div>

        <div className={styles.audienceGrid}>
          <div className={styles.audienceCard}>
            <h3 className={styles.audienceTitle}>Startups</h3>
            <p className={styles.audienceDesc}>Launch your brand fast without hiring a marketing team.</p>
          </div>
          <div className={styles.audienceCard}>
            <h3 className={styles.audienceTitle}>Freelancers</h3>
            <p className={styles.audienceDesc}>Scale your services and save hours on content creation.</p>
          </div>
          <div className={styles.audienceCard}>
            <h3 className={styles.audienceTitle}>Small Businesses</h3>
            <p className={styles.audienceDesc}>Compete with big brands without the big budget.</p>
          </div>
          <div className={styles.audienceCard}>
            <h3 className={styles.audienceTitle}>Entrepreneurs</h3>
            <p className={styles.audienceDesc}>Get AI-powered strategies to grow your business faster.</p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={styles.section}>
        <div className={styles.ctaBox}>
          <h2 className={styles.ctaTitle}>Ready to grow your business?</h2>
          <p className={styles.ctaSubtitle}>Join thousands of entrepreneurs growing smarter with Freemium AI.</p>
          <Link href="/#pricing" className={styles.ctaButton}>
            Start Your Free Trial
          </Link>
        </div>
      </section>

    </div>
  );
}
