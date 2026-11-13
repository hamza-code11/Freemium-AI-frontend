'use client';

import React, { useState } from 'react';
import AdminWelcomeBanner from '@/components/admin/dashboard/AdminWelcomeBanner';
import AdminStats from '@/components/admin/dashboard/AdminStats';
import AdminDashboardFilters from '@/components/admin/dashboard/AdminDashboardFilters';
import UserGrowthChart from '@/components/admin/dashboard/charts/UserGrowthChart';
import AIGenerationChart from '@/components/admin/dashboard/charts/AIGenerationChart';
import AIToolUsage from '@/components/admin/dashboard/bottom/AIToolUsage';
import RecentGenerations from '@/components/admin/dashboard/bottom/RecentRegistrations';
import RecentLogins from '@/components/admin/dashboard/bottom/RecentActivity';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import { DashboardDateRange } from '@/services/admin-dashboard.service';
import styles from './AdminDashboard.module.css';

export default function AdminDashboardPage() {
  const [dateRange, setDateRange] = useState<DashboardDateRange>('all');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');

  const {
    stats,
    toolUsage,
    recentGenerations,
    recentLogins,
    userGrowthChart,
    aiGenerationChart,
    loading,
  } = useAdminDashboard({ dateRange, customFrom, customTo });

  const handleDateRangeChange = (r: DashboardDateRange) => {
    setDateRange(r);
    if (r !== 'custom') {
      setCustomFrom('');
      setCustomTo('');
    }
  };

  return (
    <div className={styles.container}>
      <AdminWelcomeBanner />

      <AdminDashboardFilters
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        customFrom={customFrom}
        customTo={customTo}
        onCustomFromChange={setCustomFrom}
        onCustomToChange={setCustomTo}
        onRefresh={() => {}}
      />

      <AdminStats stats={stats} loading={loading} />

      <div className={styles.chartsRow}>
        <UserGrowthChart data={userGrowthChart} loading={loading} />
        <AIGenerationChart data={aiGenerationChart} loading={loading} />
      </div>

      <div className={styles.bottomRow}>
        <AIToolUsage toolUsage={toolUsage} loading={loading} />
        <RecentGenerations items={recentGenerations} loading={loading} />
        <RecentLogins items={recentLogins} loading={loading} />
      </div>
    </div>
  );
}