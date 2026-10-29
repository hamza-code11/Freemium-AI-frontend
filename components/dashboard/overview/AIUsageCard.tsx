import { ArrowUp, FileText, Megaphone, Sparkles } from 'lucide-react';
import styles from './AIUsageCard.module.css';

const stats = [
  { icon: Sparkles, value: 12, label: 'Total Generations', trend: 20, tone: 'tonePurple' },
  { icon: FileText, value: 8, label: 'Content Created', trend: 33, tone: 'toneBlue' },
  { icon: Megaphone, value: 4, label: 'Campaigns & Ideas', trend: 0, tone: 'toneCyan' },
];

export default function AIUsageCard() {
  return (
    <section className={styles.card} aria-labelledby="usage-title">
      <div className={styles.cardHead}>
        <h2 id="usage-title" className={styles.cardTitle}>Your AI Usage</h2>
      </div>
      <div className={styles.stats}>
        {stats.map(({ icon: Icon, value, label, trend, tone }) => (
          <div key={label} className={styles.stat}>
            <span className={`${styles.tile} ${styles[tone]} ${styles.statIcon}`}>
              <Icon size={20} />
            </span>
            <span className={styles.value}>{value}</span>
            <span className={styles.label}>{label}</span>
            <span className={`${styles.trend} ${trend > 0 ? styles.up : ''}`}>
              <ArrowUp size={11} />{trend}% from last week
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
