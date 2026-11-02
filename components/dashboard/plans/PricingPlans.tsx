import React from 'react';
import { Check, Crown } from 'lucide-react';
import styles from './PricingPlans.module.css';

const freeFeatures = ['Basic AI content generation', 'Limited campaign planning', 'Basic growth recommendations', 'Usage tracking', 'Generation history'];
const premiumFeatures = ['Higher AI generation limits', 'Expanded campaign planning', 'Advanced growth recommendations', 'Additional premium features', 'Priority support'];

export default function PricingPlans() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Free vs Premium Plan</h3>
      
      <div className={styles.plansGrid}>
        
        {/* Free Plan */}
        <div className={styles.planBox}>
          <div className={styles.planHeader}>
            <Crown size={20} className={styles.icon} />
            <span className={styles.planName}>Free Plan</span>
            <span className={styles.currentBadge}>Current Plan</span>
          </div>
          <p className={styles.planDesc}>Perfect for getting started and exploring AI tools.</p>
          
          <ul className={styles.featureList}>
            {freeFeatures.map((feat, i) => (
              <li key={i}><Check size={14} className={styles.check} /> {feat}</li>
            ))}
          </ul>

          <button className={styles.currentBtn} disabled>Current Plan</button>
        </div>

        {/* Premium Plan */}
        <div className={`${styles.planBox} ${styles.premiumBox}`}>
          <div className={styles.planHeader}>
            <Crown size={20} className={styles.premiumIcon} />
            <span className={styles.planName}>Premium Plan</span>
            <span className={styles.recommendedBadge}>Recommended</span>
          </div>
          <p className={styles.planDesc}>Unlock the full potential of AI for your business growth.</p>
          
          <ul className={styles.featureList}>
            {premiumFeatures.map((feat, i) => (
              <li key={i}><Check size={14} className={styles.check} /> {feat}</li>
            ))}
          </ul>

          <button className={styles.premiumBtn}>Request Premium Access</button>
        </div>

      </div>
    </div>
  );
}
