'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Terms.module.css';

export default function TermsContent() {
  const lastUpdated = "October 26, 2026";

  return (
    <div className={styles.pageWrapper}>
      
      {/* HEADER SECTION */}
      <section className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.subtitle}>
            Please read these terms carefully before using Freemium AI. By accessing our platform, you agree to be bound by these terms.
          </p>
          <p className={styles.lastUpdated}>Last Updated: {lastUpdated}</p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className={styles.contentContainer}>
        
        <div className={styles.policyBlock}>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By creating an account or using the Freemium AI platform, you agree to these Terms of Service. If you do not agree with any part of these terms, you must not use our services.
          </p>
        </div>

        <div className={styles.policyBlock}>
          <h2>2. Description of Service</h2>
          <p>
            Freemium AI provides an AI-powered business growth platform designed for SMEs, startups, and freelancers. Our services include AI content generation, marketing campaign planning, and business growth recommendations.
          </p>
        </div>

        <div className={styles.policyBlock}>
          <h2>3. User Responsibilities</h2>
          <p>As a user of Freemium AI, you agree to:</p>
          <ul>
            <li>Provide accurate and complete business information.</li>
            <li>Maintain the security of your account credentials.</li>
            <li>Use the platform only for lawful business purposes.</li>
            <li>Not use the platform to generate harmful, illegal, or misleading content.</li>
            <li>Not attempt to reverse-engineer or exploit our AI systems.</li>
          </ul>
        </div>

        <div className={styles.policyBlock}>
          <h2>4. AI-Generated Content</h2>
          <p>
            Freemium AI uses advanced AI models to generate content. While we strive for accuracy, <strong>we do not guarantee that AI-generated content will be 100% error-free or suitable for your specific legal or business needs.</strong> You are responsible for reviewing and verifying any content before using it publicly.
          </p>
        </div>

        <div className={styles.policyBlock}>
          <h2>5. Freemium & Subscription Plans</h2>
          <p>
            We offer a free tier with basic features and a Premium tier with advanced capabilities. Premium subscriptions are billed on a recurring basis. You may cancel at any time, but refunds are subject to our refund policy.
          </p>
        </div>

        <div className={styles.policyBlock}>
          <h2>6. Intellectual Property</h2>
          <p>
            You retain ownership of the content you generate using our tools. However, you grant us a license to store and process your data to provide and improve our services. Our platform's code, design, and branding remain our exclusive property.
          </p>
        </div>

        <div className={styles.policyBlock}>
          <h2>7. Limitation of Liability</h2>
          <p>
            Freemium AI shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform, including but not limited to loss of profits or business opportunities.
          </p>
        </div>

        <div className={styles.policyBlock}>
          <h2>8. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of significant changes via email or platform notifications. Continued use of the service constitutes acceptance of the updated terms.
          </p>
        </div>

        <div className={styles.policyBlock}>
          <h2>9. Contact Us</h2>
          <p>
            For any questions regarding these Terms, please contact us at <strong>legal@freemiumai.com</strong>.
          </p>
        </div>

      </section>

      {/* FOOTER CTA */}
      <section className={styles.footerCta}>
        <h3>Need help understanding these terms?</h3>
        <Link href="/about" className={styles.contactBtn}>
          Contact Our Team
        </Link>
      </section>

    </div>
  );
}
