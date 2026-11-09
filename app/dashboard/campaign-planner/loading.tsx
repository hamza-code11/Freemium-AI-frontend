// app/dashboard/campaign-planner/loading.tsx
import React from 'react';
import CampaignHeaderSkeleton from '@/components/dashboard/skeletons/CampaignPlannerSkeleton/CampaignHeaderSkeleton';
import CampaignFormSkeleton from '@/components/dashboard/skeletons/CampaignPlannerSkeleton/CampaignFormSkeleton';
import CampaignPlanSkeleton from '@/components/dashboard/skeletons/CampaignPlannerSkeleton/CampaignPlanSkeleton';
import RecentCampaignsSkeleton from '@/components/dashboard/skeletons/CampaignPlannerSkeleton/RecentCampaignsSkeleton';
import styles from '@/components/dashboard/skeletons/CampaignPlannerSkeleton/CampaignSkeletons.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      {/* Header Skeleton */}
      <CampaignHeaderSkeleton />

      {/* Grid: Form + Plan */}
      <div className={styles.grid}>
        <CampaignFormSkeleton />
        <CampaignPlanSkeleton />
      </div>

      {/* Recent Campaigns Skeleton */}
      <RecentCampaignsSkeleton />
    </div>
  );
}