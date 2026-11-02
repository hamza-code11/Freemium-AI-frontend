import React from 'react';
import { Check, Zap, ArrowRight } from 'lucide-react';
import styles from './CurrentPlan.module.css';

export default function CurrentPlan() {
  return (
    <div className={styles.card}>
      <div className={styles.topSection}>
        <div className={styles.badgeRow}>
          <span className={styles.freeTag}>Free Plan</span>
          <span className={styles.currentTag}>Current Plan</span>
        </div>
        <h2 className={styles.planName}>Free</h2>
        <span className={styles.activeTag}><span className={styles.dot}></span> Active</span>
        
        <p className={styles.desc}>
          Get started with essential AI tools to create content, plan campaigns and get growth recommendations.
        </p>

        <div className={styles.resetRow}>
          <Zap size={14} />
          <span>Usage resets on May 31, 2025</span>
        </div>

        <button className={styles.viewBtn}>View Plan Details <ArrowRight size={14} /></button>
      </div>

      {/* Graphic */}
      <div className={styles.graphicContainer}>
        <div className={styles.graphicIcon}>
          <Zap size={32} />
        </div>
      </div>
    </div>
  );
}
