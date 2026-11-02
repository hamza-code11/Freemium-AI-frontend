'use client';

import { useEffect, useState } from 'react';
import { Users, CreditCard, BarChart3, Sparkles } from 'lucide-react';
import styles from './AdminWelcomeBanner.module.css';

const getGreeting = (h: number) => (h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening');

export default function AdminWelcomeBanner({ userName = 'Admin' }: { userName?: string }) {
  const [greeting, setGreeting] = useState('Good morning');
  
  useEffect(() => {
    setGreeting(getGreeting(new Date().getHours()));
  }, []);

  return (
    <section className={styles.banner} aria-label="Welcome Admin">
      <div className={styles.text}>
        <h1 className={styles.title}>
          <span className={styles.wave} aria-hidden="true">👋</span>
          {greeting}, {userName}!
        </h1>
        <p className={styles.desc}>
          Welcome to the Admin Panel. Monitor platform activity, manage users and subscriptions, 
          and keep track of your business growth from one central place.
        </p>
      </div>

      <div className={styles.art} aria-hidden="true">
        <div className={styles.glow} />
        <Sparkles size={14} className={styles.spark} style={{ left: 8, top: 52 }} />
        <Sparkles size={12} className={styles.spark} style={{ right: 34, top: 4 }} />
        <div className={styles.window}>
          <div className={styles.bar}><i /><i /><i /></div>
          <div className={styles.winBody}>
            <div className={styles.ai}>AD</div>
            <div className={styles.lines}><i /><i /><i /></div>
          </div>
        </div>
        <span className={`${styles.bubble} ${styles.b1}`}><Users size={18} /></span>
        <span className={`${styles.bubble} ${styles.b2}`}><CreditCard size={18} /></span>
        <span className={`${styles.bubble} ${styles.b3}`}><BarChart3 size={18} /></span>
      </div>
    </section>
  );
}
