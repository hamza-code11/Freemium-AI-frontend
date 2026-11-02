import type { Metadata } from 'next';
import StatsCards from '@/components/dashboard/analytics/StatsCards';
import UsageChart from '@/components/dashboard/analytics/UsageChart';
import BreakdownChart from '@/components/dashboard/analytics/BreakdownChart';
import PlanUsage from '@/components/dashboard/analytics/PlanUsage';
import RecentActivity from '@/components/dashboard/analytics/RecentActivity';
import Insights from '@/components/dashboard/analytics/Insights';
import styles from './Analytics.module.css';

export const metadata: Metadata = {
  title: 'Analytics & Insights | Freemium AI',
  description: 'Track your AI activity, understand your usage patterns, and discover which tools you use most.',
};

export default function AnalyticsPage() {
  return (
    <div className={styles.pageWrapper}>
      
      {/* Header Area */}
      <div className={styles.headerArea}>
        <div>
          <h1 className={styles.title}>Analytics & Insights</h1>
          <p className={styles.subtitle}>Track your AI activity, understand your usage patterns, and discover which tools you use most.</p>
        </div>
        
        <div className={styles.headerActions}>
          <div className={styles.dateFilter}>
            <button className={styles.activeFilter}>Last 7 Days</button>
            <button className={styles.filterBtn}>Last 30 Days</button>
            <button className={styles.filterBtn}>Last 90 Days</button>
          </div>
          <button className={styles.exportBtn}>Export Report</button>
        </div>
      </div>

      {/* 1. Top Stats Cards */}
      <StatsCards />

      {/* 2. Charts Row (Line Chart + Donut Chart) */}
      <div className={styles.chartsRow}>
        <UsageChart />
        <BreakdownChart />
      </div>

      {/* 3. Bottom Row (Plan Usage, Recent Activity, Insights) */}
      <div className={styles.bottomRow}>
        <PlanUsage />
        <RecentActivity />
        <Insights />
      </div>

    </div>
  );
}
