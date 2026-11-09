// app/dashboard/help/loading.tsx
import React from 'react';
import HelpBannerSkeleton from '@/components/dashboard/skeletons/help/HelpBannerSkeleton';
import HelpFAQSkeleton from '@/components/dashboard/skeletons/help/HelpFAQSkeleton';
import HelpFormSkeleton from '@/components/dashboard/skeletons/help/HelpFormSkeleton';
import HelpTicketsSkeleton from '@/components/dashboard/skeletons/help/HelpTicketsSkeleton';
import styles from '@/components/dashboard/skeletons/help/HelpSkeletons.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <HelpBannerSkeleton />

      <div className={styles.twoColumnGrid}>
    <HelpFAQSkeleton />
        <HelpFormSkeleton />
      </div>

      <HelpTicketsSkeleton />
    </div>
  );
}
