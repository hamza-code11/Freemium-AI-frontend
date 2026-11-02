import React from 'react';
import { Calendar, Zap } from 'lucide-react';
import styles from './PlanUsage.module.css';

export default function PlanUsage() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Zap size={18} className={styles.icon} />
        <h3 className={styles.title}>Current Plan Consumption</h3>
      </div>

      <div className={styles.planBox}>
        <div className={styles.planInfo}>
          <div>
            <h4 className={styles.planName}>Free Plan</h4>
            <p className={styles.planSub}>Your current plan</p>
          </div>
          <div className={styles.statsGrid}>
            <div><span>Monthly limit</span><strong>50</strong></div>
            <div><span>Used</span><strong>12</strong></div>
            <div><span>Remaining</span><strong>38</strong></div>
          </div>
        </div>

        <div className={styles.progressWrapper}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: '24%' }}></div>
          </div>
          <span className={styles.progressText}>24% used</span>
        </div>

        <div className={styles.resetRow}>
          <Calendar size={14} className={styles.icon} />
          <span>Usage resets on May 31, 2025</span>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.secondaryBtn}>View Plans</button>
        <button className={styles.primaryBtn}>Explore Premium</button>
      </div>
    </div>
  );
}
