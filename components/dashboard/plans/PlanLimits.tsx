import React from 'react';
import { Wrench, Database, Lock, Calendar, AlertTriangle, Crown, Clock } from 'lucide-react';
import styles from './PlanLimits.module.css';

const limits = [
  { icon: <Wrench size={16} />, title: 'Available Tools', desc: 'Content, Campaigns, Recommendations', badge: 'Full Access', tone: 'success' },
  { icon: <Database size={16} />, title: 'Usage Quotas', desc: 'Content: 12/50 | Campaigns: 3/10 | Recommendations: 4/10', badge: 'Limited', tone: 'info' },
  { icon: <Lock size={16} />, title: 'Restricted Features', desc: 'Advanced analytics, priority support, team collaboration', badge: 'Unavailable', tone: 'default' },
  { icon: <Calendar size={16} />, title: 'Usage Reset Period', desc: 'Resets on May 31, 2025', badge: 'Monthly', tone: 'info' },
  { icon: <AlertTriangle size={16} />, title: 'When Limit Is Reached', desc: 'Access to tools will be restricted until the next reset.', badge: 'Limited Access', tone: 'warning' },
];

export default function PlanLimits() {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Your Plan Limits</h3>

      <div className={styles.list}>
        {limits.map((item, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.iconBox}>{item.icon}</div>
            <div className={styles.content}>
              <span className={styles.itemTitle}>{item.title}</span>
              <span className={styles.itemDesc}>{item.desc}</span>
            </div>
            <span className={`${styles.badge} ${styles[item.tone]}`}>{item.badge}</span>
          </div>
        ))}
      </div>

      <div className={styles.footerBox}>
        <div className={styles.footerLeft}>
          <Crown size={18} className={styles.crownIcon} />
          <div>
            <strong className={styles.footerTitle}>Get Premium Access</strong>
            <p className={styles.footerDesc}>Request Premium access to unlock advanced features and higher limits. Your request will be reviewed by our admin team.</p>
          </div>
        </div>
        <div className={styles.footerRight}>
          <button className={styles.requestBtn}>Request Premium Access</button>
          <span className={styles.status}><Clock size={12} /> Status: Not Requested</span>
        </div>
      </div>
    </div>
  );
}
