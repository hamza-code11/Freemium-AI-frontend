import type { Metadata } from 'next';
import UsersHeader from '@/components/admin/users/UsersHeader';
import UserStats from '@/components/admin/users/UserStats';
import UsersFilter from '@/components/admin/users/UsersFilter';
import UsersTable from '@/components/admin/users/UsersTable';
import UserDetailsPanel from '@/components/admin/users/UserDetailsPanel';
import styles from './Users.module.css';

export const metadata: Metadata = {
  title: 'User Management | Admin',
  description: 'View and manage registered accounts across your platform.',
};

export default function AdminUsersPage() {
  return (
    <div className={styles.pageWrapper}>
      
      {/* Header */}
      <UsersHeader />

      {/* Stats Cards */}
      <UserStats />

      {/* Filters */}
      <UsersFilter />

      {/* Main Layout: Table + Side Panel */}
      <div className={styles.mainLayout}>
        <div className={styles.tableArea}>
          <UsersTable />
        </div>
        <div className={styles.sidePanelArea}>
          <UserDetailsPanel />
        </div>
      </div>

    </div>
  );
}