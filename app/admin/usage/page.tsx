import type { Metadata } from 'next';
import UsageHeader from '@/components/admin/usage/UsageHeader';
import UsageStats from '@/components/admin/usage/UsageStats';
import UsageCharts from '@/components/admin/usage/UsageCharts';
import UsageTable from '@/components/admin/usage/UsageTable';
import UserUsagePanel from '@/components/admin/usage/UserUsagePanel';
import styles from './Usage.module.css';

export const metadata: Metadata = {
  title: 'Usage Management | Admin',
  description: 'Monitor AI consumption, generation activity, and quota usage across your platform.',
};

export default function AdminUsagePage() {
  return (
    <div className={styles.pageWrapper}>
      <UsageHeader />
      <UsageStats />
      <UsageCharts />
      
      <div className={styles.mainLayout}>
        <div className={styles.tableArea}>
          <UsageTable />
        </div>
        <div className={styles.panelArea}>
          <UserUsagePanel />
        </div>
      </div>
    </div>
  );
}
