import React from 'react';
import { X, Crown, CheckCircle, AlertTriangle } from 'lucide-react';
import styles from './UserUsagePanel.module.css';

export default function UserUsagePanel() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>User Details</h3>
        <button className={styles.closeBtn}><X size={16} /></button>
      </div>

      <div className={styles.profile}>
        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Ahmed" className={styles.avatar} />
        <div>
          <h4 className={styles.name}>Ahmed Khan</h4>
          <p className={styles.email}>ahmed@example.com</p>
        </div>
        <div className={styles.badges}>
          <span className={styles.premiumBadge}><Crown size={10} /> Premium</span>
          <span className={styles.activeBadge}>Active</span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h5 className={styles.sectionTitle}>Usage Summary</h5>
        
        <div className={styles.statRow}>
          <div className={styles.statIcon} style={{ background: '#EFF6FF', color: '#3B82F6' }}>
            <CheckCircle size={16} />
          </div>
          <div className={styles.statInfo}>
            <span>Total Generations</span>
            <strong>245</strong>
          </div>
        </div>

        <div className={styles.statRow}>
          <div className={styles.statIcon} style={{ background: '#ECFDF5', color: '#10B981' }}>
            <CheckCircle size={16} />
          </div>
          <div className={styles.statInfo}>
            <span>Successful Generations</span>
            <strong>230</strong>
          </div>
        </div>

        <div className={styles.statRow}>
          <div className={styles.statIcon} style={{ background: '#FEF2F2', color: '#EF4444' }}>
            <AlertTriangle size={16} />
          </div>
          <div className={styles.statInfo}>
            <span>Failed Requests</span>
            <strong>15</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
