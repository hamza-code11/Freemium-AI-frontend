import React from 'react';
import { BarChart2, Users, Crown, CheckCircle, XCircle } from 'lucide-react';
import styles from './SubscriptionOverview.module.css';

const stats = [
  { title: 'Total Free Subscribers', value: '1,920', trend: '+12%', icon: <Users size={16} />, color: 'blue' },
  { title: 'Total Premium Subscribers', value: '530', trend: '+18%', icon: <Crown size={16} />, color: 'purple' },
  { title: 'Active Subscriptions', value: '2,450', trend: '+14%', icon: <CheckCircle size={16} />, color: 'green' },
  { title: 'Expired Subscriptions', value: '120', trend: '-6%', icon: <XCircle size={16} />, color: 'red', isNegative: true },
];

export default function SubscriptionOverview() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <BarChart2 size={18} className={styles.icon} />
        <h3 className={styles.title}>Subscription Overview</h3>
      </div>
      <div className={styles.grid}>
        {stats.map((stat, i) => (
          <div key={i} className={styles.statItem}>
            <div className={`${styles.iconWrap} ${styles[stat.color]}`}>{stat.icon}</div>
            <span className={styles.statTitle}>{stat.title}</span>
            <h4 className={styles.statValue}>{stat.value}</h4>
            <span className={`${styles.trend} ${stat.isNegative ? styles.trendDown : ''}`}>
              {stat.isNegative ? '↓' : '↑'} {stat.trend}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
