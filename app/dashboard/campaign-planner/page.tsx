// app/admin/users/page.tsx
'use client';

import React, { useState } from 'react';
import UsersHeader from '@/components/admin/users/UsersHeader';
import UserStats from '@/components/admin/users/UserStats';
import UsersFilter, { UserFilters } from '@/components/admin/users/UsersFilter';
import UsersTable from '@/components/admin/users/UsersTable';
import UserDetailsPanel from '@/components/admin/users/UserDetailsPanel';
import styles from './Users.module.css';

const INITIAL_FILTERS: UserFilters = {
  search: '',
  status: 'all',
  sort: 'latest',
  date_range: 'all',
  custom_from: '',
  custom_to: '',
};

export default function AdminUsersPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [filters, setFilters] = useState<UserFilters>(INITIAL_FILTERS);
  
  // 🔥 Global refresh key (Stats + Table dono refresh honge)
  const [refreshKey, setRefreshKey] = useState(0);

  const updateFilters = (patch: Partial<UserFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const handleUserStatusChange = () => {
    setRefreshKey((prev) => prev + 1); // Refresh both stats + table
  };

  return (
    <div className={styles.pageWrapper}>
      <UsersHeader />
      
      {/* 🔥 Stats ko refreshKey pass karein */}
      <UserStats refreshKey={refreshKey} />
      
      <UsersFilter filters={filters} onChange={updateFilters} />
      
      <div className={styles.mainLayout}>
        <div className={styles.tableArea}>
          <UsersTable
            filters={filters}
            onSelectUser={setSelectedUserId}
            onUserStatusChange={handleUserStatusChange}
          />
        </div>
        {selectedUserId && (
          <div className={styles.sidePanelArea}>
            <UserDetailsPanel
              userId={selectedUserId}
              onClose={() => setSelectedUserId(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}