import React from 'react';
import { Users, Check, Crown, Infinity as InfinityIcon } from 'lucide-react';
import styles from './PlanCards.module.css';

export default function PlanCards() {
  return (
    <div className={styles.grid}>
      
      {/* Free Plan Card */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.titleWrap}>
            <div className={styles.iconBox} style={{ background: '#EFF6FF', color: '#3B82F6' }}><Users size={20} /></div>
            <h3 className={styles.planTitle}>Free Plan <span className={styles.activeBadge}>Active</span></h3>
          </div>
        </div>
        <p className={styles.desc}>Access core features with limited usage.</p>
        
        <div className={styles.contentRow}>
          <ul className={styles.features}>
            <li><Check size={14} className={styles.checkIcon} /> AI Content Generator</li>
            <li><Check size={14} className={styles.checkIcon} /> Campaign Planner</li>
            <li><Check size={14} className={styles.checkIcon} /> Basic Analytics</li>
          </ul>
          <div className={styles.divider} />
          <div className={styles.statsArea}>
            <div className={styles.userCount}>
              <Users size={18} className={styles.iconMuted} />
              <div>
                <strong>1,920</strong>
                <span>Users Subscribed</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <InfinityIcon size={14} /> Usage Limits: Limited
        </div>
      </div>

      {/* Premium Plan Card */}
      <div className={`${styles.card} ${styles.premiumCard}`}>
        <div className={styles.cardHeader}>
          <div className={styles.titleWrap}>
            <div className={styles.iconBox} style={{ background: '#F5F3FF', color: '#8B5CF6' }}><Crown size={20} /></div>
            <h3 className={styles.planTitle}>Premium Plan <span className={styles.activeBadge}>Active</span></h3>
          </div>
        </div>
        <p className={styles.desc}>Unlock the full power of Freemium AI.</p>
        
        <div className={styles.contentRow}>
          <ul className={styles.features}>
            <li><Check size={14} className={styles.checkIcon} /> All Features</li>
            <li><Check size={14} className={styles.checkIcon} /> Priority Support</li>
            <li><Check size={14} className={styles.checkIcon} /> Advanced Analytics</li>
          </ul>
          <div className={styles.divider} />
          <div className={styles.statsArea}>
            <div className={styles.userCount}>
              <Users size={18} className={styles.iconMuted} />
              <div>
                <strong>530</strong>
                <span>Users Subscribed</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <InfinityIcon size={14} /> Usage Limits: Higher Limits
        </div>
      </div>

    </div>
  );
}
