'use client';

import { useEffect, useState } from 'react';
import { Megaphone, FileText, BarChart3, Sparkles } from 'lucide-react';
import styles from './WelcomeBanner.module.css';

const getGreeting = (h: number) => (h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening');

export default function WelcomeBanner({ userName = 'Hamza' }: { userName?: string }) {
  const [greeting, setGreeting] = useState('Good morning');
  useEffect(() => setGreeting(getGreeting(new Date().getHours())), []);

  return (
    <section className={styles.banner} aria-label="Welcome">
      <div className={styles.text}>
        <h1 className={styles.title}>
          <span className={styles.wave} aria-hidden="true">👋</span>
          {greeting}, {userName}!
        </h1>
        <p className={styles.desc}>
          Let&apos;s grow your business with the power of AI. Create amazing content, plan effective
          campaigns and get smart growth recommendations all in one place.
        </p>
      </div>

      <div className={styles.art} aria-hidden="true">
        <div className={styles.glow} />
        <Sparkles size={14} className={styles.spark} style={{ left: 8, top: 52 }} />
        <Sparkles size={12} className={styles.spark} style={{ right: 34, top: 4 }} />
        <div className={styles.window}>
          <div className={styles.bar}><i /><i /><i /></div>
          <div className={styles.winBody}>
            <div className={styles.ai}>AI</div>
            <div className={styles.lines}><i /><i /><i /></div>
          </div>
        </div>
        <span className={`${styles.bubble} ${styles.b1}`}><Megaphone size={18} /></span>
        <span className={`${styles.bubble} ${styles.b2}`}><FileText size={18} /></span>
        <span className={`${styles.bubble} ${styles.b3}`}><BarChart3 size={18} /></span>
      </div>
    </section>
  );
}
