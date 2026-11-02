import { ChevronDown, Sparkles, Store } from 'lucide-react';
import styles from './GrowthHeader.module.css';

export default function GrowthHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.titleArea}>
        <h1 className={styles.title}>Growth Recommendations</h1>
        <p className={styles.subtitle}>Discover actionable ways to attract customers, increase sales, and grow your business with AI-powered insights.</p>
      </div>
      
      <div className={styles.actions}>
        <button className={styles.businessSelector}>
          <div className={styles.bizIcon}><Store size={16} /></div>
          <div className={styles.bizInfo}>
            <strong>BrightStyle</strong>
            <span>Fashion & Lifestyle</span>
          </div>
          <ChevronDown size={14} className={styles.chevron} />
        </button>
        
        <button className={styles.switchBtn}>Switch Business</button>
        
        <button className={styles.generateBtn}>
          <Sparkles size={16} /> Generate New Recommendations
        </button>
      </div>
    </div>
  );
}
