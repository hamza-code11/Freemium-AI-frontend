import React from 'react';
import { Users, User, Crown, XCircle } from 'lucide-react';
import styles from './UserStats.module.css';

const stats = [
  { title: 'Total Users', value: '2,450', trend: '+12%', icon: <Users size={20} />, color: 'toneBlue' },
  { title: 'Free Users', value: '1,920', trend: '+10%', icon: <User size={20} />, color: 'toneBlue' },
  { title: 'Premium Users', value: '530', trend: '+18%', icon: <Crown size={20} />, color: 'tonePurple' },
  { title: 'Suspended Accounts', value: '24', trend: '-5%', icon: <XCircle size={20} />, color: 'toneRed', isNegative: true },
];

export default function UserStats() {
  return (
    <div className={styles.grid}>
      {stats.map((stat, i) => (
        <div key={i} className={styles.card}>
          <div className={`${styles.iconBox} ${styles[stat.color]}`}>{stat.icon}</div>
          <div className={styles.content}>
            <span className={styles.statTitle}>{stat.title}</span>
            <h2 className={styles.statValue}>{stat.value}</h2>
            <div className={styles.trend}>
              <span className={stat.isNegative ? styles.trendDown : styles.trendUp}>
                {stat.isNegative ? '↓' : '↑'} {stat.trend}
              </span>
              <span className={styles.vs}>vs previous period</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
