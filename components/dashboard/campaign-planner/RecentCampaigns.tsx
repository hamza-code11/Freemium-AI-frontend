import Link from 'next/link';
import { ArrowRight, Clock, Gift, Shirt, Tag, UserRound } from 'lucide-react';
import styles from './RecentCampaigns.module.css';

const CAMPAIGNS = [
  { title: 'Spring Collection Launch', date: 'Apr 12, 2025', type: 'Brand Awareness', status: 'Active', icon: Shirt, image: '' },
  { title: 'Summer Sale Campaign', date: 'Apr 5, 2025', type: 'Increase Sales', status: 'Completed', icon: Tag, image: '' },
  { title: 'New Collection - Women', date: 'Mar 28, 2025', type: 'Generate Leads', status: 'Draft', icon: UserRound, image: '' },
  { title: 'Holiday Special Campaign', date: 'Mar 20, 2025', type: 'Customer Engagement', status: 'Active', icon: Gift, image: '' },
];

const statusClass: Record<string, string> = {
  Active: styles.active,
  Completed: styles.completed,
  Draft: styles.draft,
};

export default function RecentCampaigns() {
  return (
    <section className={styles.card} aria-labelledby="cp-recent-title">
      <div className={styles.head}>
        <h2 id="cp-recent-title" className={styles.title}>
          <Clock size={18} className={styles.titleIcon} /> Recent Campaigns
        </h2>
        <Link href="/dashboard/campaigns" className={styles.link}>
          View All <ArrowRight size={12} />
        </Link>
      </div>

      <div className={styles.grid}>
        {CAMPAIGNS.map(({ title, date, type, status, icon: Icon, image }) => (
          <article key={title} className={styles.item}>
            <div className={styles.thumb}>
              {image ? <img src={image} alt="" className={styles.img} /> : <Icon size={24} aria-hidden="true" />}
            </div>
            <div className={styles.info}>
              <h3 className={styles.itemTitle}>{title}</h3>
              <p className={styles.meta}>{date}</p>
              <p className={styles.metaDark}>{type}</p>
              <span className={`${styles.status} ${statusClass[status]}`}>
                <span className={styles.dot} /> {status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
