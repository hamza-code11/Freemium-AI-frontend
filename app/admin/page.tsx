// app/admin/(dashboard)/page.tsx
'use client';

import React from 'react';
import AdminWelcomeBanner from '@/components/admin/dashboard/AdminWelcomeBanner';
import AdminStats from '@/components/admin/dashboard/AdminStats';
import UserGrowthChart from '@/components/admin/dashboard/charts/UserGrowthChart';
import AIGenerationChart from '@/components/admin/dashboard/charts/AIGenerationChart';
import AIToolUsage from '@/components/admin/dashboard/bottom/AIToolUsage';
import RecentGenerations from '@/components/admin/dashboard/bottom/RecentRegistrations';
import RecentLogins from '@/components/admin/dashboard/bottom/RecentActivity';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import styles from './AdminDashboard.module.css';

export default function AdminDashboardPage() {
  const { stats, toolUsage, recentGenerations, recentLogins, loading } = useAdminDashboard();

  return (
    <div className={styles.container}>
      <AdminWelcomeBanner />

      <AdminStats stats={stats} loading={loading} />

      <div className={styles.chartsRow}>
        <UserGrowthChart />
        <AIGenerationChart />
      </div>

      <div className={styles.bottomRow}>
        <AIToolUsage toolUsage={toolUsage} loading={loading} />
        <RecentGenerations items={recentGenerations} loading={loading} />
        <RecentLogins items={recentLogins} loading={loading} />
      </div>
    </div>
  );
}