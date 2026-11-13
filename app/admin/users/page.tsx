// app/admin/users/page.tsx
'use client';

import React, { useState, useCallback } from 'react';
import UsersHeader from '@/components/admin/users/UsersHeader';
import UserStats from '@/components/admin/users/UserStats';
import UsersFilter, { UserFilters } from '@/components/admin/users/UsersFilter';
import UsersTable from '@/components/admin/users/UsersTable';
import UserDetailsPanel from '@/components/admin/users/UserDetailsPanel';
import BusinessProfileModal from '@/components/admin/users/BusinessProfileModal';
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
  const [refreshKey, setRefreshKey] = useState(0);
  const [businessModalUser, setBusinessModalUser] = useState<{
    id: number;
    name: string;
  } | null>(null);

  const updateFilters = (patch: Partial<UserFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const handleUserStatusChange = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Auto-select first user (or keep current if still present)
  const handleUsersLoaded = useCallback((users: { id: number }[]) => {
    setSelectedUserId((current) => {
      if (current && users.some((u) => u.id === current)) return current;
      return users.length > 0 ? users[0].id : null;
    });
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <UsersHeader />
      <UserStats refreshKey={refreshKey} />
      <UsersFilter filters={filters} onChange={updateFilters} />

      <div className={styles.mainLayout}>
        <div className={styles.tableArea}>
          <UsersTable
            filters={filters}
            onSelectUser={setSelectedUserId}
            onUserStatusChange={handleUserStatusChange}
            onViewBusinessProfile={(u) => setBusinessModalUser(u)}
            onUsersLoaded={handleUsersLoaded}
          />
        </div>

        {selectedUserId && (
          <div className={styles.sidePanelArea}>
            <UserDetailsPanel userId={selectedUserId} />
          </div>
        )}
      </div>

      {businessModalUser && (
        <BusinessProfileModal
          userId={businessModalUser.id}
          userName={businessModalUser.name}
          onClose={() => setBusinessModalUser(null)}
        />
      )}
    </div>
  );
}

