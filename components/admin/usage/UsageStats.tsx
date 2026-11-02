import React from 'react';
import { Zap, CheckCircle, AlertTriangle, Users, Target } from 'lucide-react';
import styles from './UsageStats.module.css';

// 🔥 Quota Exceeded removed, Trend removed
const stats = [
  { title: 'Total AI Generations', value: '18,640', icon: <Zap size={18} />, color: 'toneBlue' },
  { title: 'Successful Generations', value: '17,980', icon: <CheckCircle size={18} />, color: 'toneGreen' },
  { title: 'Failed Requests', value: '660', icon: <AlertTriangle size={18} />, color: 'toneRed' },
  { title: 'Active Users', value: '1,280', icon: <Users size={18} />, color: 'tonePurple' },
  { title: 'Success Rate', value: '96.5%', icon: <Target size={18} />, color: 'toneGreen' },
];

export default function UsageStats() {
  return (
    <div className={styles.grid}>
      {stats.map((stat, i) => (
        <div key={i} className={styles.card}>
          <div className={`${styles.iconBox} ${styles[stat.color]}`}>{stat.icon}</div>
          <div className={styles.content}>
            <span className={styles.title}>{stat.title}</span>
            <h2 className={styles.value}>{stat.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}
