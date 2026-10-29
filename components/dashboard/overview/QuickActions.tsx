import Link from 'next/link';
import { ArrowRight, Lightbulb, Megaphone, PenSquare, Store } from 'lucide-react';
import styles from './QuickActions.module.css';

const actions = [
  { icon: PenSquare, tone: 'tonePurple', title: 'Generate Content', desc: 'Create social posts, captions, and more.', href: '/dashboard/content' },
  { icon: Megaphone, tone: 'toneBlue', title: 'Plan Campaign', desc: 'Get marketing campaign ideas and strategies.', href: '/dashboard/campaigns' },
  { icon: Lightbulb, tone: 'toneGreen', title: 'Get Growth Tips', desc: 'Receive AI-powered business recommendations.', href: '/dashboard/growth' },
  { icon: Store, tone: 'toneOrange', title: 'Edit Business Profile', desc: 'Update your business information and goals.', href: '/dashboard/profile' },
];

export default function QuickActions() {
  return (
    <section className={styles.card} aria-labelledby="qa-title">
      <div className={styles.cardHead}>
        <div>
          <h2 id="qa-title" className={styles.cardTitle}>Quick Actions</h2>
          <p className={styles.cardSub}>Choose what you want to create today</p>
        </div>
        <Link href="/dashboard/tools" className={styles.link}>View All Tools <ArrowRight size={12} /></Link>
      </div>
      <div className={styles.grid}>
        {actions.map(({ icon: Icon, tone, title, desc, href }) => (
          <Link key={title} href={href} className={`${styles.item} ${styles[tone]}`}>
            <span className={`${styles.tile} ${styles.icon}`}><Icon size={20} /></span>
            <span className={styles.title}>{title}</span>
            <span className={styles.desc}>{desc}</span>
            <span className={styles.go}>
              <span className={`${styles.tile} ${styles.goBtn}`}><ArrowRight size={15} /></span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
