import type React from 'react';
import { Sparkles, Wand2 } from 'lucide-react';
import styles from './ContentGeneratorHeader.module.css';

const BrandSvg = ({ size = 16, children }: { size?: number; children: React.ReactNode }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <BrandSvg size={size}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></BrandSvg>
);
const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <BrandSvg size={size}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></BrandSvg>
);
const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <BrandSvg size={size}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></BrandSvg>
);
const XLogo = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const FORMATS = ['Social Posts', 'Captions', 'Ad Copy', 'Product Descriptions'];

export default function ContentGeneratorHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.left}>
        <span className={styles.iconTile} aria-hidden="true"><Wand2 size={24} /></span>
        <div className={styles.text}>
          <h1 className={styles.title}>AI Content Generator</h1>
          <p className={styles.subtitle}>
            Create engaging marketing content for your business in seconds. From social media posts to
            ad copy, get AI-powered content that drives results.
          </p>
          <ul className={styles.chips} aria-label="Supported content types">
            {FORMATS.map((f) => <li key={f} className={styles.chip}>{f}</li>)}
          </ul>
        </div>
      </div>

      <div className={styles.promo} aria-hidden="true">
        <Sparkles size={16} className={`${styles.spark} ${styles.sparkA}`} />
        <Sparkles size={12} className={`${styles.spark} ${styles.sparkB}`} />
        <div className={styles.icons}>
          <span className={`${styles.brand} ${styles.insta}`}><InstagramIcon size={18} /></span>
          <span className={`${styles.brand} ${styles.fb}`}><FacebookIcon size={18} /></span>
          <span className={`${styles.brand} ${styles.li}`}><LinkedinIcon size={18} /></span>
          <span className={`${styles.brand} ${styles.x}`}><XLogo /></span>
        </div>
        <p className={styles.tagline}>
          <strong>Better content.</strong><br />More engagement.<br />Greater growth.
        </p>
      </div>
    </header>
  );
}
