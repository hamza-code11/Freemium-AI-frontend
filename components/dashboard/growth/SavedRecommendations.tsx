// SavedRecommendations.tsx
import { ChevronDown, Bookmark, Target } from 'lucide-react';
import styles from './SavedRecommendations.module.css';

export default function SavedRecommendations() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.tabs}>
          <button className={styles.activeTab}>Saved Recommendations</button>
          <button className={styles.inactiveTab}>Recent Viewed</button>
        </div>
        <div className={styles.filters}>
          <select className={styles.select}><option>All Categories</option></select>
          <select className={styles.select}><option>All</option></select>
        </div>
      </div>
      
      <div className={styles.list}>
        {/* Sample Saved Items */}
        <div className={styles.savedItem}>
          <div className={styles.itemHeader}>
            <span className={styles.itemTitle}>Optimize Product Pages</span>
            <Bookmark size={14} className={styles.icon} />
          </div>
          <div className={styles.metaTags}>
            <span className={styles.metaTag}>Sales</span>
            <span className={styles.metaTag}>★ Medium</span>
          </div>
          <span className={styles.date}>Saved on Apr 20, 2025</span>
        </div>
        <div className={styles.savedItem}>
          <div className={styles.itemHeader}>
            <span className={styles.itemTitle}>Create Targeted Promotional Campaigns</span>
            <Bookmark size={14} className={styles.icon} />
          </div>
          <div className={styles.metaTags}>
            <span className={styles.metaTag}>Brand Awareness</span>
            <span className={styles.metaTag}>★ Medium</span>
          </div>
          <span className={styles.date}>Saved on Apr 18, 2025</span>
        </div>
        <div className={styles.savedItem}>
          <div className={styles.itemHeader}>
            <span className={styles.itemTitle}>Build a Customer Referral Program</span>
            <Bookmark size={14} className={styles.icon} />
          </div>
          <div className={styles.metaTags}>
            <span className={styles.metaTag}>Customer Acquisition</span>
            <span className={styles.metaTag}>★ Low</span>
          </div>
          <span className={styles.date}>Saved on Apr 16, 2025</span>
        </div>
      </div>
    </div>
  );
}
