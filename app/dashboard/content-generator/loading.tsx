// app/dashboard/content-generator/loading.tsx
import React from 'react';
import ContentHeaderSkeleton from '@/components/dashboard/skeletons/ContentGeneratorSkeleton/ContentHeaderSkeleton';
import ContentFormSkeleton from '@/components/dashboard/skeletons/ContentGeneratorSkeleton/ContentFormSkeleton';
import ContentOutputSkeleton from '@/components/dashboard/skeletons/ContentGeneratorSkeleton/ContentOutputSkeleton';
import styles from '@/components/dashboard/skeletons/ContentGeneratorSkeleton/Skeletons.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      {/* Header Skeleton */}
      <ContentHeaderSkeleton />

      {/* Grid: Form + Output */}
      <div className={styles.grid}>
        <ContentFormSkeleton />
        <ContentOutputSkeleton />
      </div>
    </div>
  );
}