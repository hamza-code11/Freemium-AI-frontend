'use client';

import { useEffect, useState } from 'react';
import { Megaphone, FileText, BarChart3, Sparkles } from 'lucide-react';
import { useProfile } from '@/context/ProfileContext';
import styles from './WelcomeBanner.module.css';

// 🔥 Updated Logic (Sahi time brackets)
const getGreeting = (h: number) => {
  if (h >= 5 && h < 12) return 'Good morning';
  if (h >= 12 && h < 17) return 'Good afternoon';
  if (h >= 17 && h < 21) return 'Good evening';
  return 'Good night'; // 9 PM se 5 AM tak
};

export default function WelcomeBanner() {
  const { user } = useProfile();
  const [greeting, setGreeting] = useState<string>('');

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(getGreeting(hour));
  }, []);

  const userName = user?.name ? user.name.split(' ')[0] : 'User';

  return (
    <section className={styles.banner} aria-label="Welcome">
      <div className={styles.text}>
        <h1 className={styles.title}>
          <span className={styles.wave} aria-hidden="true">👋</span>
          {/* Agar greeting load nahi hui, to fallback text dikhayein */}
          {greeting ? `${greeting}, ${userName}!` : `Welcome, ${userName}!`}
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