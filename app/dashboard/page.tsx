import WelcomeBanner from '@/components/dashboard/overview/WelcomeBanner';
import BusinessCard from '@/components/dashboard/overview/BusinessCard';
import AIUsageCard from '@/components/dashboard/overview/AIUsageCard';
import QuickActions from '@/components/dashboard/overview/QuickActions';
import RecentContent from '@/components/dashboard/overview/RecentContent';
import RecentCampaigns from '@/components/dashboard/overview/RecentCampaigns';
import GrowthRecommendations from '@/components/dashboard/overview/GrowthRecommendations';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      
      {/* Full-width rows */}
      <WelcomeBanner />

      {/* Row: Business Card + AI Usage (2 columns) */}
      <div className={styles.statsGrid}>
        <BusinessCard />
        <AIUsageCard />
      </div>

      {/* Row 1: Quick Actions & Recent Campaigns (70 / 30) */}
      <div className={styles.rowGrid}>
        <div className={styles.colLeft}>
          <QuickActions />
        </div>
        <div className={styles.colRight}>
          <RecentCampaigns />
        </div>
      </div>

      {/* Row 2: Recent Content & Growth Recommendations (70 / 30) */}
      <div className={styles.rowGrid}>
        <div className={styles.colLeft}>
          <RecentContent />
        </div>
        <div className={styles.colRight}>
          <GrowthRecommendations />
        </div>
      </div>

    </div>
  );
}
