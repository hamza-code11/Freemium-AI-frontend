// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useDashboard } from '@/hooks/useDashboard';
import WelcomeBanner from '@/components/dashboard/overview/WelcomeBanner';
import BusinessCard from '@/components/dashboard/overview/BusinessCard';
import AIUsageCard from '@/components/dashboard/overview/AIUsageCard';
import QuickActions from '@/components/dashboard/overview/QuickActions';
import RecentContent from '@/components/dashboard/overview/RecentContent';
import RecentCampaigns from '@/components/dashboard/overview/RecentCampaigns';
import GrowthRecommendations from '@/components/dashboard/overview/GrowthRecommendations';
import UsageChart from '@/components/dashboard/overview/UsageChart';
import BreakdownChart from '@/components/dashboard/overview/BreakdownChart';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  //  Range states
  const [range, setRange] = useState('week');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');

  //  useDashboard hook ko range pass karein
  const {
    stats,
    recentContent,
    recentCampaigns,
    recentRecommendations,
    usageChart,
    breakdown,
    loading,
    setRangeFilters,
  } = useDashboard(range);

  //  Jab range change ho, hook ko batao
  useEffect(() => {
    setRangeFilters({
      range,
      custom_from: range === 'custom' ? customFrom : undefined,
      custom_to: range === 'custom' ? customTo : undefined,
    });
  }, [range, customFrom, customTo, setRangeFilters]);

  const handleRangeChange = (newRange: string) => {
    setRange(newRange);
    // Custom range me dates reset karein (optional)
    if (newRange !== 'custom') {
      setCustomFrom('');
      setCustomTo('');
    }
  };

  return (
    <div className={styles.container}>
      <WelcomeBanner />

      <div className={styles.statsGrid}>
        <BusinessCard />
        <AIUsageCard stats={stats} loading={loading} />
      </div>

      {/* Charts */}
      <div className={styles.chartsRow}>
        <UsageChart 
          labels={usageChart?.labels ?? []}
          values={usageChart?.values ?? []}
          loading={loading}
          dateRange={range}
          onRangeChange={handleRangeChange}
          customFrom={customFrom}
          customTo={customTo}
          onCustomFromChange={setCustomFrom}
          onCustomToChange={setCustomTo}
        />
        <BreakdownChart data={breakdown} loading={loading} />
      </div>

      <div className={styles.rowGrid}>
        <div className={styles.colLeft}>
          <QuickActions />
        </div>
        <div className={styles.colRight}>
          <RecentCampaigns items={recentCampaigns} loading={loading} />
        </div>
      </div>

      <div className={styles.rowGrid}>
        <div className={styles.colLeft}>
          <RecentContent items={recentContent} loading={loading} />
        </div>
        <div className={styles.colRight}>
          <GrowthRecommendations items={recentRecommendations} loading={loading} />
        </div>
      </div>
    </div>
  );
}
