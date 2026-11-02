import { Lightbulb, Target, Sparkles, TrendingUp, ArrowUp } from 'lucide-react';
import styles from './GrowthStats.module.css';

const STATS = [
  { label: 'Recommended Actions', value: '12', icon: Lightbulb, color: 'blue' },
  { label: 'High-Priority Opportunities', value: '5', icon: Target, color: 'green' },
  { label: 'Marketing Ideas', value: '8', icon: Sparkles, color: 'purple' },
  { label: 'Sales Improvement Opportunities', value: '6', icon: TrendingUp, color: 'orange' },
];

export default function GrowthStats() {
  return (
    <div className={styles.grid}>
      {STATS.map((s, i) => (
        <div key={i} className={styles.card}>
          <div className={`${styles.iconWrapper} ${styles[s.color]}`}>
            <s.icon size={20} />
          </div>
          <div className={styles.info}>
            <span className={styles.label}>{s.label}</span>
            <div className={styles.valueRow}>
              <span className={styles.value}>{s.value}</span>
              <span className={styles.trend}><ArrowUp size={12} /></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
