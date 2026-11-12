// components/admin/users/UserStats.tsx
'use client';

import React from 'react';
import { Users, UserCheck, UserX, Ban } from 'lucide-react';
import { useAdminUserStats } from '@/hooks/useAdminUserStats';
import styles from './UserStats.module.css';

interface Props {
  refreshKey?: number;
}

export default function UserStats({ refreshKey = 0 }: Props) {
  const { stats, loading } = useAdminUserStats(refreshKey);

  const statCards = [
    { title: 'Total Users', value: stats?.total_users ?? 0, icon: <Users size={20} />, color: 'toneBlue' },
    { title: 'Active Users', value: stats?.active_users ?? 0, subtitle: 'Last 30 days', icon: <UserCheck size={20} />, color: 'toneGreen' },
    { title: 'Inactive Users', value: stats?.inactive_users ?? 0, subtitle: 'No activity in 30 days', icon: <UserX size={20} />, color: 'toneAmber' },
    { title: 'Suspended Users', value: stats?.suspended_users ?? 0, icon: <Ban size={20} />, color: 'toneRed' },
  ];

  return (
    <div className={styles.grid}>
      {statCards.map((stat, i) => (
        <div key={i} className={styles.card}>
          <div className={`${styles.iconBox} ${styles[stat.color]}`}>{stat.icon}</div>
          <div className={styles.content}>
            <span className={styles.statTitle}>{stat.title}</span>
            <h2 className={styles.statValue}>{loading ? '...' : stat.value.toLocaleString()}</h2>
            {stat.subtitle && <span className={styles.subtitle}>{stat.subtitle}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}