import Link from 'next/link';
import { ArrowRight, ChevronRight, Mail, Megaphone } from 'lucide-react';
import styles from './RecentCampaigns.module.css';

const campaigns = [
  { icon: Megaphone, tone: 'tonePurple', title: 'Summer Fashion Sale', meta: 'Oct 28, 2026 • Social Media' },
  { icon: Mail, tone: 'toneBlue', title: 'New Collection Launch', meta: 'Oct 26, 2026 • Email Campaign' },
  { icon: Megaphone, tone: 'toneRed', title: 'Winter Special Offer', meta: 'Oct 24, 2026 • Social Media' },
];

export default function RecentCampaigns() {
  return (
    <section className={styles.card} aria-labelledby="camp-title">
      <div className={styles.cardHead}>
        <h2 id="camp-title" className={styles.cardTitle}>Recent Campaigns</h2>
        <Link href="/dashboard/campaigns" className={styles.link}>View All <ArrowRight size={12} /></Link>
      </div>
      <div className={styles.list}>
        {campaigns.map(({ icon: Icon, tone, title, meta }) => (
          <Link key={title} href="/dashboard/campaigns" className={styles.row}>
            <span className={`${styles.tile} ${styles[tone]} ${styles.circle}`}><Icon size={20} /></span>
            <div className={styles.rInfo}>
              <div className={styles.rTitle}>{title}</div>
              <div className={styles.rMeta}>{meta}</div>
            </div>
            <ChevronRight size={16} className={styles.chev} />
          </Link>
        ))}
      </div>
    </section>
  );
}
