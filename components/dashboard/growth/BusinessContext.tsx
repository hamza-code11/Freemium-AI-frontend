import { Target, AlertTriangle, Users, Megaphone, Edit2 } from 'lucide-react';
import styles from './BusinessContext.module.css';

export default function BusinessContext() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topRow}>
        <div className={styles.col}>
          <h3 className={styles.colTitle}><Target size={16} /> Business Goals</h3>
          <div className={styles.tags}>
            <span className={styles.tagActive}>Increase Sales</span>
            <span className={styles.tag}>Build Brand Awareness</span>
            <span className={styles.tag}>Acquire New Customers</span>
            <span className={styles.tag}>Improve Customer Retention</span>
          </div>
        </div>
        <div className={styles.col}>
          <h3 className={styles.colTitle}><AlertTriangle size={16} /> Current Challenges</h3>
          <div className={styles.tags}>
            <span className={`${styles.tag} ${styles.tagDanger}`}>Low Engagement</span>
            <span className={`${styles.tag} ${styles.tagWarning}`}>Limited Budget</span>
            <span className={`${styles.tag} ${styles.tagDanger}`}>Low Website Traffic</span>
            <span className={`${styles.tag} ${styles.tagWarning}`}>Low Conversions</span>
          </div>
        </div>
        <div className={styles.col}>
          <h3 className={styles.colTitle}><Users size={16} /> Target Audience</h3>
          <p className={styles.audienceText}>Women aged 18–35, fashion conscious, urban</p>
        </div>
        <div className={styles.col}>
          <h3 className={styles.colTitle}><Megaphone size={16} /> Marketing Channels</h3>
          <div className={styles.tags}>
            <span className={styles.tag}>Instagram</span>
            <span className={styles.tag}>Facebook</span>
            <span className={styles.tag}>Website</span>
            <span className={styles.tag}>+2 more</span>
          </div>
        </div>
      </div>
      <button className={styles.editBtn}><Edit2 size={14} /> Update Business Context</button>
    </div>
  );
}
