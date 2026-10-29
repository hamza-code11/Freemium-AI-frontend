'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Cookies.module.css';

export default function CookiesContent() {
  const lastUpdated = "October 26, 2026";

  return (
    <div className={styles.pageWrapper}>
      
      {/* HEADER SECTION */}
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Cookie Policy</h1>
          <p className={styles.subtitle}>
            This policy explains how Freemium AI uses cookies and similar technologies to recognize you when you visit our platform.
          </p>
          <p className={styles.lastUpdated}>Last Updated: {lastUpdated}</p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className={styles.contentContainer}>
        
        <div className={styles.policyBlock}>
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.
          </p>
        </div>

        <div className={styles.policyBlock}>
          <h2>2. How We Use Cookies</h2>
          <p>Freemium AI uses cookies for the following purposes:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> Required for the platform to function, such as keeping you logged in and securing your account.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our platform so we can improve the experience.</li>
            <li><strong>Functional Cookies:</strong> Remember your preferences, such as theme (Dark/Light mode) and language.</li>
            <li><strong>Third-Party Cookies:</strong> Used by our AI providers and payment processors to ensure secure and seamless operations.</li>
          </ul>
        </div>

        <div className={styles.policyBlock}>
          <h2>3. Types of Cookies We Use</h2>
          <p>
            We use both <strong>Session Cookies</strong> (which expire when you close your browser) and <strong>Persistent Cookies</strong> (which remain on your device for a set period). These cookies do not contain any personally identifiable information on their own.
          </p>
        </div>

        <div className={styles.policyBlock}>
          <h2>4. Third-Party Cookies</h2>
          <p>
            In some special cases, we also use cookies provided by trusted third parties. For example, our platform integrates with AI services (like OpenAI and Gemini) and payment gateways (like Stripe). These providers may set their own cookies to ensure secure transactions and content generation.
          </p>
        </div>

        <div className={styles.policyBlock}>
          <h2>5. Managing Your Cookie Preferences</h2>
          <p>
            You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our platform, but some functionality (such as staying logged in) may be restricted.
          </p>
        </div>

        <div className={styles.policyBlock}>
          <h2>6. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in technology or legal requirements. We encourage you to review this page periodically for the latest information.
          </p>
        </div>

        <div className={styles.policyBlock}>
          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies, please contact us at <strong>privacy@freemiumai.com</strong>.
          </p>
        </div>

      </section>

      {/* FOOTER CTA */}
      <section className={styles.footerCta}>
        <h3>Want to learn more about your data?</h3>
        <Link href="/privacy" className={styles.contactBtn}>
          Read Our Privacy Policy
        </Link>
      </section>

    </div>
  );
}
