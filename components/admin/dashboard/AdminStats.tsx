import React from 'react';
import { Users, User, Crown, Sparkles, Calendar, Activity } from 'lucide-react';
import styles from './AdminStats.module.css';

const stats = [
  { title: 'Total Users', value: '2,450', icon: <Users size={20} />, color: 'toneBlue' },
  { title: 'Free Users', value: '1,920', icon: <User size={20} />, color: 'toneBlue' },
  { title: 'Premium Users', value: '530', icon: <Crown size={20} />, color: 'tonePurple' },
  { title: 'Total AI Generations', value: '18,640', icon: <Sparkles size={20} />, color: 'toneIndigo' },
  { title: "Today's Generations", value: '385', icon: <Calendar size={20} />, color: 'toneCyan' },
  { title: 'Active Users', value: '1,280', icon: <Activity size={20} />, color: 'toneBlue' },
];

export default function AdminStats() {
  return (
    <div className={styles.statsGrid}>
      {stats.map((stat, i) => (
        <div key={i} className={styles.statCard}>
          
          <div className={`${styles.iconWrap} ${styles[stat.color]}`}>
            {stat.icon}
          </div>
          
          <div className={styles.content}>
            <span className={styles.statTitle}>{stat.title}</span>
            <h2 className={styles.statValue}>{stat.value}</h2>
          </div>

        </div>
      ))}
    </div>
  );
}
