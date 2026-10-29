import Link from 'next/link';
import { ArrowRight, Building2, Globe, Sprout, Users } from 'lucide-react';
import styles from './BusinessCard.module.css';

const details = [
  { icon: Building2, label: 'Industry', value: 'Fashion & Lifestyle' },
  { icon: Users, label: 'Target Audience', value: 'Young Adults (18–35)' },
  { icon: Globe, label: 'Language', value: 'English' },
];

export default function BusinessCard() {
  return (
    <section className={styles.card} aria-labelledby="biz-title">
      <div className={styles.cardHead}>
        <h2 id="biz-title" className={styles.cardTitle}>Your Business</h2>
        <Link href="/dashboard/profile" className={styles.link}>
          Manage Profile <ArrowRight size={12} />
        </Link>
      </div>

      <div className={styles.profileRow}>
        {/* Left: Identity + Bio */}
        <div className={styles.left}>
          <div className={styles.identity}>
            <div className={styles.avatar}><Sprout size={26} /></div>
            <div className={styles.identityText}>
              <div className={styles.name}>BrightStyle</div>
              <div className={styles.niche}>Fashion &amp; Lifestyle</div>
              <span className={`${styles.badge} ${styles.toneGreen} ${styles.active}`}>● Active</span>
            </div>
          </div>
          <p className={styles.bio}>
            Trendy clothing and accessories for modern and confident individuals.
          </p>
        </div>

        {/* Right: Details */}
        <div className={styles.details}>
          {details.map(({ icon: Icon, label, value }) => (
            <div key={label} className={styles.detail}>
              <Icon size={16} className={styles.detailIcon} />
              <div>
                <div className={styles.dLabel}>{label}</div>
                <div className={styles.dValue}>{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
