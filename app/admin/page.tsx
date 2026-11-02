import React from 'react';
import AdminWelcomeBanner from '@/components/admin/dashboard/AdminWelcomeBanner';
import AdminStats from '@/components/admin/dashboard/AdminStats';
import UserGrowthChart from '@/components/admin/dashboard/charts/UserGrowthChart';
import AIGenerationChart from '@/components/admin/dashboard/charts/AIGenerationChart';
import AIToolUsage from '@/components/admin/dashboard/bottom/AIToolUsage';
import RecentRegistrations from '@/components/admin/dashboard/bottom/RecentRegistrations';
import RecentActivity from '@/components/admin/dashboard/bottom/RecentActivity';
import styles from './AdminDashboard.module.css';

export default function AdminDashboardPage() {
  return (
    <div className={styles.container}>
      
      {/* 1. Welcome Banner */}
      <AdminWelcomeBanner userName="Hamza" />

      {/* 2. Stats Cards */}
      <AdminStats />

      {/* 3. Charts Row (Ab sirf 2 charts hain) */}
      <div className={styles.chartsRow}>
        <UserGrowthChart />
        <AIGenerationChart />
      </div>

      {/* 4. Bottom Row */}
      <div className={styles.bottomRow}>
        <AIToolUsage />
        <RecentRegistrations />
        <RecentActivity />
      </div>

    </div>
  );
}
