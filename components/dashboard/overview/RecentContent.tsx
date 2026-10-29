'use client';

import Link from 'next/link';
import { ArrowRight, FileText, Camera, Lightbulb, Megaphone } from 'lucide-react';
import styles from './RecentContent.module.css';

const items = [
  { id: 1, icon: Camera, tone: 'tonePink', title: 'Summer Collection Instagram Post', tag: 'Social Post', tagTone: 'tonePurple', desc: 'Step into summer with our latest collection! ☀️ Stylish, comfortable...', time: '2 hours ago' },
  { id: 2, icon: FileText, tone: 'toneBlue', title: 'Product Description – Women’s Dress', tag: 'Product Description', tagTone: 'toneBlue', desc: 'Elegant. Comfortable. Perfect for every occasion. Our women’s dress...', time: '5 hours ago' },
  { id: 3, icon: Megaphone, tone: 'toneBlue', title: 'Facebook Ad Copy', tag: 'Ad Copy', tagTone: 'toneBlue', desc: 'Upgrade your summer style with our exclusive collection. Shop now...', time: '8 hours ago' },
  { id: 4, icon: Lightbulb, tone: 'toneAmber', title: 'Campaign Idea', tag: 'Campaign', tagTone: 'toneCyan', desc: 'Summer Sale: 20% Off + Free Shipping. Target young women (18–35)....', time: '1 day ago' },
];

export default function RecentContent() {
  return (
    <section className={styles.card} aria-labelledby="rc-title">
      <div className={styles.cardHead}>
        <h2 id="rc-title" className={styles.cardTitle}>Recent Generated Content</h2>
        <Link href="/dashboard/content" className={styles.link}>View All <ArrowRight size={12} /></Link>
      </div>
      <div className={styles.list}>
        {items.map(({ id, icon: Icon, tone, title, tag, tagTone, desc, time }) => (
          <div key={id} className={styles.row}>
            <span className={`${styles.tile} ${styles[tone]} ${styles.icon}`}><Icon size={20} /></span>
            <div className={styles.info}>
              <div className={styles.titleLine}>
                <span className={styles.title}>{title}</span>
                <span className={`${styles.badge} ${styles[tagTone]}`}>{tag}</span>
              </div>
              <div className={styles.desc}>{desc}</div>
            </div>
            <span className={styles.time}>{time}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
