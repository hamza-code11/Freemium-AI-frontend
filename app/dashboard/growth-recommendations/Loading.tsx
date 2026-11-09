// app/dashboard/growth-recommendations/loading.tsx
import React from 'react';
import GrowthHeaderSkeleton from '@/components/dashboard/skeletons/GrowthSkeleton/GrowthHeaderSkeleton';
import GrowthContextBarSkeleton from '@/components/dashboard/skeletons/GrowthSkeleton/GrowthContextBarSkeleton';
import GrowthRecommendationsSkeleton from '@/components/dashboard/skeletons/GrowthSkeleton/GrowthRecommendationsSkeleton';
import GrowthRecentSkeleton from '@/components/dashboard/skeletons/GrowthSkeleton/GrowthRecentSkeleton';
import styles from '@/components/dashboard/skeletons/GrowthSkeleton/GrowthSkeletons.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <GrowthHeaderSkeleton />
      <GrowthContextBarSkeleton />
      <GrowthRecommendationsSkeleton />
      <GrowthRecentSkeleton />
    </div>
  );
}