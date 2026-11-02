import React from 'react';
import Link from 'next/link';
import { Zap, User, Crown, Sparkles, Megaphone, AlertTriangle } from 'lucide-react';
import styles from './RecentActivity.module.css';

// 🔥 Sirf 3 Records
const activities = [
  { icon: <User size={16} />, color: 'blue', title: 'New user registered', desc: 'ahmed@email.com', time: '2m ago' },
  { icon: <Crown size={16} />, color: 'purple', title: 'User upgraded to Premium', desc: 'zara@email.com', time: '12m ago' },
  { icon: <Sparkles size={16} />, color: 'cyan', title: 'AI content generated', desc: 'by firdaus123', time: '18m ago' },
];

export default function RecentActivity() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <Zap size={18} className={styles.icon} />
          <h3 className={styles.title}>Recent Activity</h3>
        </div>
        <Link href="/admin/activity" className={styles.link}>View All →</Link>
      </div>

      <div className={styles.list}>
        {activities.map((act, i) => (
          <div key={i} className={styles.item}>
            <div className={`${styles.iconBox} ${styles[act.color]}`}>
              {act.icon}
            </div>
            <div className={styles.content}>
              <span className={styles.title}>{act.title}</span>
              <span className={styles.desc}>{act.desc}</span>
            </div>
            <span className={styles.time}>{act.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
