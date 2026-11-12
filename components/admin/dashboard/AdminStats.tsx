// components/admin/dashboard/AdminStats.tsx
'use client';

import React from 'react';
import { Users, UserCheck, UserX, Sparkles, Megaphone, TrendingUp } from 'lucide-react';
import { DashboardStats } from '@/services/admin-dashboard.service';
import styles from './AdminStats.module.css';

interface Props {
  stats: DashboardStats | null;
  loading?: boolean;
}

export default function AdminStats({ stats, loading }: Props) {
  const statCards = [
    { title: 'Total Users', value: stats?.total_users ?? 0, icon: <Users size={20} />, color: 'toneBlue' },
    { title: 'Active Users', value: stats?.active_users ?? 0, icon: <UserCheck size={20} />, color: 'toneGreen' },
    { title: 'Inactive Users', value: stats?.inactive_users ?? 0, icon: <UserX size={20} />, color: 'toneAmber' },
    { title: 'Content Generations', value: stats?.content_generations ?? 0, icon: <Sparkles size={20} />, color: 'toneIndigo' },
    { title: 'Campaign Generations', value: stats?.campaign_generations ?? 0, icon: <Megaphone size={20} />, color: 'tonePurple' },
    { title: 'Growth Generations', value: stats?.growth_generations ?? 0, icon: <TrendingUp size={20} />, color: 'toneCyan' },
  ];

  return (
    <div className={styles.statsGrid}>
      {statCards.map((stat, i) => (
        <div key={i} className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles[stat.color]}`}>{stat.icon}</div>
          <div className={styles.content}>
            <span className={styles.statTitle}>{stat.title}</span>
            <h2 className={styles.statValue}>{loading ? '...' : stat.value.toLocaleString()}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}