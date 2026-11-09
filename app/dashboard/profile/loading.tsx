import React from 'react';
import ProfileHeaderSkeleton from '@/components/dashboard/skeletons/ProfileHeaderSkeleton/ProfileHeaderSkeleton';
import BusinessInfoFormSkeleton from '@/components/dashboard/skeletons/ProfileHeaderSkeleton/BusinessInfoFormSkeleton';
import ProfilePreviewSkeleton from '@/components/dashboard/skeletons/ProfileHeaderSkeleton/ProfilePreviewSkeleton';
import styles from './Profile.module.css'; // Main page ki CSS use karein

export default function Loading() {
  return (
    <div className={styles.pageWrapper}>

      {/* Header Skeleton */}
      <ProfileHeaderSkeleton />

      {/* Main Content Grid Skeleton */}
      <div className={styles.layoutGrid}>
        {/* Left: Form Box Skeleton */}
        <BusinessInfoFormSkeleton />

        {/* Right: Preview Box Skeleton */}
        <ProfilePreviewSkeleton />
      </div>

    </div>
  );
}