// app/admin/(dashboard)/loading.tsx

import React from 'react';
import AdminWelcomeBannerSkeleton from '@/components/admin/skeletons/AdminDashboardSkeleton/AdminWelcomeBannerSkeleton';
import AdminStatsSkeleton from '@/components/admin/skeletons/AdminDashboardSkeleton/AdminStatsSkeleton';
import UserGrowthChartSkeleton from '@/components/admin/skeletons/AdminDashboardSkeleton/UserGrowthChartSkeleton';
import AIGenerationChartSkeleton from '@/components/admin/skeletons/AdminDashboardSkeleton/AIGenerationChartSkeleton';
import AIToolUsageSkeleton from '@/components/admin/skeletons/AdminDashboardSkeleton/AIToolUsageSkeleton';
import RecentRegistrationsSkeleton from '@/components/admin/skeletons/AdminDashboardSkeleton/RecentRegistrationsSkeleton';
import RecentActivitySkeleton from '@/components/admin/skeletons/AdminDashboardSkeleton/RecentActivitySkeleton';
import styles from '@/components/admin/skeletons/AdminDashboardSkeleton/AdminDashboardSkeletons.module.css';

export default function Loading() {
  return (
    <div className={styles.pageWrapper}>
      
      {/* 1. Welcome Banner */}
      <AdminWelcomeBannerSkeleton />

      {/* 2. Stats Cards */}
      <AdminStatsSkeleton />

      {/* 3. Charts Row */}
      <div className={styles.chartsRow}>
        <UserGrowthChartSkeleton />
        <AIGenerationChartSkeleton />
      </div>

      {/* 4. Bottom Row */}
      <div className={styles.bottomRow}>
        <AIToolUsageSkeleton />
        <RecentRegistrationsSkeleton />
        <RecentActivitySkeleton />
      </div>

    </div>
  );
}
