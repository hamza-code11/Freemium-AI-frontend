import React from 'react';
import styles from './Pricing.module.css';

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);

export default function Pricing() {
  return (
    <section id="pricing" className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Simple, Transparent Pricing</h2>
        <p className={styles.sectionSubtitle}>Start for free. Upgrade when you're ready to scale.</p>
      </div>

      <div className={styles.pricingGrid}>
        {/* Free Plan */}
        <div className={styles.pricingCard}>
          <div className={styles.planName}>Free Plan</div>
          <div className={styles.planPrice}>$0<span>/month</span></div>
          <p className={styles.planDesc}>Perfect for getting started and testing the waters.</p>
          <ul className={styles.planFeatures}>
            <li><CheckIcon /> Basic AI content generation</li>
            <li><CheckIcon /> Limited campaign ideas</li>
            <li><CheckIcon /> Basic business recommendations</li>
            <li><CheckIcon /> Basic analytics</li>
          </ul>
          <button className={styles.btnSecondary} style={{ width: '100%' }}>Get Started</button>
        </div>

        {/* Premium Plan */}
        <div className={`${styles.pricingCard} ${styles.premiumCard}`}>
          <div className={styles.planBadge}>Most Popular</div>
          <div className={styles.planName}>Premium Plan</div>
          <div className={styles.planPrice}>$19<span>/month</span></div>
          <p className={styles.planDesc}>For growing businesses that need advanced AI power.</p>
          <ul className={styles.planFeatures}>
            <li><CheckIcon /> Higher usage limits</li>
            <li><CheckIcon /> Advanced campaign tools</li>
            <li><CheckIcon /> Detailed growth recommendations</li>
            <li><CheckIcon /> Advanced analytics & reports</li>
            <li><CheckIcon /> Priority support</li>
          </ul>
          <button className={styles.btnPrimary} style={{ width: '100%' }}>Upgrade to Premium</button>
        </div>
      </div>
    </section>
  );
}
