// app/admin/users/loading.tsx
import React from 'react';
import UsersHeaderSkeleton from '@/components/admin/skeletons/UsersSkeleton/UsersHeaderSkeleton';
import UserStatsSkeleton from '@/components/admin/skeletons/UsersSkeleton/UserStatsSkeleton';
import UsersFilterSkeleton from '@/components/admin/skeletons/UsersSkeleton/UsersFilterSkeleton';
import UsersTableSkeleton from '@/components/admin/skeletons/UsersSkeleton/UsersTableSkeleton';
import UserDetailsSkeleton from '@/components/admin/skeletons/UsersSkeleton/UserDetailsSkeleton';
import styles from '@/components/admin/skeletons/UsersSkeleton/UsersSkeletons.module.css';

export default function Loading() {
  return (
    <div className={styles.pageWrapper}>
      <UsersHeaderSkeleton />
      <UserStatsSkeleton />
      <UsersFilterSkeleton />
      <div className={styles.mainLayout}>
        <UsersTableSkeleton />
        <UserDetailsSkeleton />
      </div>
    </div>
  );
}
