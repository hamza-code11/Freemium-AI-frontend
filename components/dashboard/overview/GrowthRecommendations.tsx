import Link from 'next/link';
import { ArrowRight, ChevronRight, Image as ImageIcon, Share2, TrendingUp } from 'lucide-react';
import styles from './GrowthRecommendations.module.css';

const tips = [
  { icon: TrendingUp, tone: 'toneBlue', title: 'Increase social media presence', desc: 'Post 3–4 times per week to improve brand visibility.' },
  { icon: ImageIcon, tone: 'toneGreen', title: 'Optimize product photography', desc: 'Use high-quality, well-lit images to boost conversions.' },
  { icon: Share2, tone: 'toneBlue', title: 'Expand to new platforms', desc: 'Consider TikTok and Pinterest to reach a wider audience.' },
];

export default function GrowthRecommendations() {
  return (
    <section className={styles.card} aria-labelledby="grow-title">
      <div className={styles.cardHead}>
        <h2 id="grow-title" className={styles.cardTitle}>Growth Recommendations</h2>
        <Link href="/dashboard/growth" className={styles.link}>View All <ArrowRight size={12} /></Link>
      </div>
      <div className={styles.list}>
        {tips.map(({ icon: Icon, tone, title, desc }) => (
          <Link key={title} href="/dashboard/growth" className={styles.row}>
            <span className={`${styles.tile} ${styles[tone]} ${styles.circle}`}><Icon size={20} /></span>
            <div className={styles.rInfo}>
              <div className={styles.rTitle}>{title}</div>
              <div className={styles.rMeta}>{desc}</div>
            </div>
            <ChevronRight size={16} className={styles.chev} />
          </Link>
        ))}
      </div>
    </section>
  );
}
