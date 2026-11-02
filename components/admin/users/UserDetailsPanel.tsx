import React from 'react';
import { X, Crown } from 'lucide-react';
import styles from './UserDetailsPanel.module.css';

export default function UserDetailsPanel() {
  return (
    <div className={styles.panelCard}>
      
      <div className={styles.header}>
        <h3 className={styles.title}>User Details</h3>
        <button className={styles.closeBtn}><X size={16} /></button>
      </div>

      {/* Profile Info */}
      <div className={styles.profileHeader}>
        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80" alt="Ahmed" className={styles.avatar} />
        <div>
          <h4 className={styles.name}>Ahmed Khan</h4>
          <p className={styles.email}>ahmed@example.com</p>
        </div>
        <span className={styles.activeBadge}>Active</span>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h5 className={styles.sectionTitle}>Profile Information</h5>
        <div className={styles.infoRow}><span>User ID:</span><strong>#USR-1024</strong></div>
        <div className={styles.infoRow}><span>Role:</span><strong>User</strong></div>
        <div className={styles.infoRow}><span>Registration Date:</span><strong>Apr 15, 2025</strong></div>
        <div className={styles.infoRow}><span>Last Active:</span><strong>2 hours ago</strong></div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h5 className={styles.sectionTitle}>Subscription Information</h5>
        <div className={styles.infoRow}><span>Current Plan:</span><span className={styles.premiumBadge}><Crown size={10} /> Premium</span></div>
        <div className={styles.infoRow}><span>Status:</span><div className={styles.activeText}><span className={styles.dot}></span> Active</div></div>
        <div className={styles.infoRow}><span>Plan Start Date:</span><strong>Apr 15, 2025</strong></div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h5 className={styles.sectionTitle}>Usage Summary</h5>
        <div className={styles.infoRow}><span>Total AI Generations:</span><strong>124</strong></div>
        <div className={styles.infoRow}><span>Content Generations:</span><strong>68</strong></div>
        <div className={styles.infoRow}><span>Campaign Plans:</span><strong>32</strong></div>
        <div className={styles.infoRow}><span>Growth Recommendations:</span><strong>24</strong></div>
      </div>

      <button className={styles.closePanelBtn}>Close</button>

    </div>
  );
}
