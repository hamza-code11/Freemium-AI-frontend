'use client';
import { Clock } from 'lucide-react';
import styles from './RecentGenerated.module.css';

const RECENT = [
  { id: 'r1', title: 'Improve Social Media Engagement', date: 'Nov 01, 2025', count: 5 },
  { id: 'r2', title: 'Optimize Product Pages', date: 'Oct 28, 2025', count: 4 },
  { id: 'r3', title: 'Build a Customer Referral Program', date: 'Oct 22, 2025', count: 3 },
  { id: 'r4', title: 'Create Targeted Promotional Campaigns', date: 'Oct 15, 2025', count: 6 },
];

export default function RecentGenerated() {
  return (
    <section className={styles.panel} aria-label="Recently generated">
      <h2 className={styles.title}>
        <Clock size={16} /> Recently Generated
      </h2>

      <div className={styles.row}>
        {RECENT.map((r) => (
          <article key={r.id} className={styles.card}>
            <h3 className={styles.cardTitle}>{r.title}</h3>
            <p className={styles.cardMeta}>
              <span>{r.date}</span>
              <span className={styles.dot}>•</span>
              <span>{r.count} recommendations</span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}