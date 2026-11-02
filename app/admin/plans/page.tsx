import type { Metadata } from 'next';
import PlanCards from '@/components/admin/plans/PlanCards';
import SubscriptionOverview from '@/components/admin/plans/SubscriptionOverview';
import PlanDistribution from '@/components/admin/plans/PlanDistribution';
import UserPlanAssignments from '@/components/admin/plans/UserPlanAssignments';
import EditPlanPanel from '@/components/admin/plans/EditPlanPanel';
import styles from './Plans.module.css';

export const metadata: Metadata = {
  title: 'Plan Management | Admin',
  description: 'Configure subscription plans, manage feature access, and control Premium availability.',
};

export default function AdminPlansPage() {
  return (
    <div className={styles.pageWrapper}>
      
      {/* Header (Edit button removed) */}
      <div className={styles.headerArea}>
        <div>
          <div className={styles.breadcrumb}>Admin / Plans</div>
          <h1 className={styles.title}>Plan Management</h1>
          <p className={styles.subtitle}>Configure subscription plans, manage feature access, and control Premium availability.</p>
        </div>
      </div>

      {/* Plan Cards */}
      <PlanCards />

      {/* Middle Row */}
      <div className={styles.middleRow}>
        <SubscriptionOverview />
        <PlanDistribution />
      </div>

      {/* Main Layout */}
      <div className={styles.mainLayout}>
        <div className={styles.tableArea}>
          <UserPlanAssignments />
        </div>
        <div className={styles.panelArea}>
          <EditPlanPanel />
        </div>
      </div>

    </div>
  );
}
