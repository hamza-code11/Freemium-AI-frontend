'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Privacy.module.css';

export default function PrivacyContent() {
  const lastUpdated = "October 26, 2026";

  return (
    <div className={styles.pageWrapper}>
      
      {/* HEADER SECTION */}
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>
            Your privacy is important to us. This policy explains how Freemium AI collects, uses, and protects your data.
          </p>
          <p className={styles.lastUpdated}>Last Updated: {lastUpdated}</p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className={styles.contentContainer}>
        
        <div className={styles.policyBlock}>
          <h2>1. Introduction</h2>
          <p>
            Welcome to Freemium AI ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy governs the privacy policies and practices of our website and AI-powered SaaS platform.
          </p>
        </div>

        <div className={styles.policyBlock}>
          <h2>2. Information We Collect</h2>
          <p>We collect personal information that you voluntarily provide to us when you register on the platform, express an interest in obtaining information about us, or use our AI tools.</p>
          <ul>
            <li><strong>Account Data:</strong> Name, email address, and password.</li>
            <li><strong>Business Profile:</strong> Industry, target audience, business goals, and services offered.</li>
            <li><strong>Usage Data:</strong> Prompts, generated content, and interaction history within the dashboard.</li>
            <li><strong>Payment Data:</strong> (For Premium users) We may use third-party payment processors (e.g., Stripe) to handle transactions securely.</li>
          </ul>
        </div>

        <div className={styles.policyBlock}>
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect or receive to:</p>
          <ul>
            <li>Provide, operate, and maintain our AI platform.</li>
            <li>Improve, personalize, and expand our services.</li>
            <li>Generate AI content tailored to your business profile.</li>
            <li>Communicate with you regarding updates, security alerts, and support.</li>
            <li>Ensure compliance with legal obligations.</li>
          </ul>
        </div>

        <div className={styles.policyBlock}>
          <h2>4. AI & Third-Party Processing</h2>
          <p>
            Freemium AI utilizes advanced third-party AI models (such as OpenAI API and Google Gemini) to generate text and recommendations. The prompts and data you submit may be processed by these providers strictly to fulfill your requests. We do not sell your personal data.
          </p>
        </div>

        <div className={styles.policyBlock}>
          <h2>5. Data Retention and Security</h2>
          <p>
            We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy. We implement industry-standard security measures (encryption, secure servers, and authentication protocols) to protect your data from unauthorized access.
          </p>
        </div>

        <div className={styles.policyBlock}>
          <h2>6. Your Privacy Rights</h2>
          <p>
            Depending on your location (e.g., under GDPR or CCPA), you may have the right to request access to, correction of, or deletion of your personal data. To exercise these rights, please contact our support team via your dashboard.
          </p>
        </div>

        <div className={styles.policyBlock}>
          <h2>7. Contact Us</h2>
          <p>
            If you have questions or comments about this policy, please contact us at <strong>privacy@freemiumai.com</strong>.
          </p>
        </div>

      </section>

      {/* FOOTER CTA */}
      <section className={styles.footerCta}>
        <h3>Have questions about your data?</h3>
        <Link href="/about" className={styles.contactBtn}>
          Learn More About Us
        </Link>
      </section>

    </div>
  );
}
