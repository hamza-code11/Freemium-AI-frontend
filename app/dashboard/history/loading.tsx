// app/dashboard/history/loading.tsx
import React from 'react';
import HistoryHeaderSkeleton from '@/components/dashboard/skeletons/HistorySkeletons/HistoryHeaderSkeleton';
import HistoryFiltersSkeleton from '@/components/dashboard/skeletons/HistorySkeletons/HistoryFiltersSkeleton';
import HistoryTableSkeleton from '@/components/dashboard/skeletons/HistorySkeletons/HistoryTableSkeleton';
import styles from '@/components/dashboard/skeletons/HistorySkeletons/HistorySkeletons.module.css';

export default function Loading() {
  return (
    <div className={styles.pageWrapper}>
      <HistoryHeaderSkeleton />
      <HistoryFiltersSkeleton />
      <HistoryTableSkeleton />
    </div>
  );
}
