import type { Metadata } from 'next';
import PlanHeader from '@/components/dashboard/plans/PlanHeader';
import CurrentPlan from '@/components/dashboard/plans/CurrentPlan';
import UsageStats from '@/components/dashboard/plans/UsageStats';
import PricingPlans from '@/components/dashboard/plans/PricingPlans';
import PlanLimits from '@/components/dashboard/plans/PlanLimits';
import styles from './Plans.module.css';

export const metadata: Metadata = {
  title: 'Plans & Usage | Freemium AI',
  description: 'Manage your plan, monitor your AI usage, and explore the features available to your business.',
};

export default function PlansPage() {
  return (
    <div className={styles.pageWrapper}>
      
      {/* Header */}
      <PlanHeader />

      {/* Top Row: Current Plan + Usage Overview */}
      <div className={styles.topRow}>
        <CurrentPlan />
        <UsageStats />
      </div>

      {/* Bottom Row: Pricing Plans + Plan Limits */}
      <div className={styles.bottomRow}>
        <PricingPlans />
        <PlanLimits />
      </div>

    </div>
  );
}