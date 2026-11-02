import { Mail, Megaphone, Sparkles } from 'lucide-react';
import styles from './CampaignHeader.module.css';

const BrandIcon = ({ name, size = 16 }: { name: 'instagram' | 'facebook' | 'linkedin'; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'instagram' && (<><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>)}
    {name === 'facebook' && <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />}
    {name === 'linkedin' && (<><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>)}
  </svg>
);

export default function CampaignHeader() {
  return (
    <header className={styles.header}>
      {/* soft background glow like content header */}
      <div className={styles.bgGlow} aria-hidden="true" />

      <div className={styles.content}>
        <h1 className={styles.title}>AI Campaign Planner</h1>
        <p className={styles.subtitle}>
          Plan smarter marketing campaigns with AI-powered strategies tailored to your business goals.
        </p>
      </div>

      <div className={styles.visual} aria-hidden="true">
        <div className={styles.glow} />
        <Sparkles size={14} className={`${styles.spark} ${styles.sparkA}`} />
        <Sparkles size={12} className={`${styles.spark} ${styles.sparkB}`} />
        <div className={styles.chartCard}>
          <i className={styles.bar} /><i className={styles.bar} /><i className={styles.bar} /><i className={styles.bar} />
        </div>
        <div className={styles.megaphone}><Megaphone size={34} /></div>
        <span className={`${styles.float} ${styles.f1}`}><BrandIcon name="instagram" size={18} /></span>
        <span className={`${styles.float} ${styles.f2}`}><BrandIcon name="facebook" size={18} /></span>
        <span className={`${styles.float} ${styles.f3}`}><BrandIcon name="linkedin" size={18} /></span>
        <span className={`${styles.float} ${styles.f4}`}><Mail size={18} /></span>
      </div>
    </header>
  );
}