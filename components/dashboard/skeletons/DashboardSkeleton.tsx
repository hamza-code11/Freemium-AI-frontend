// components/dashboard/skeletons/DashboardSkeleton.tsx
'use client';

import React from 'react';
import styles from './DashboardSkeleton.module.css';

export default function DashboardSkeleton() {
  return (
    <div className={styles.container}>

      {/* 1. Welcome Banner Skeleton */}
      <div className={styles.bannerSkeleton}>
        <div className={styles.bannerContent}>
          <div className={`${styles.skeleton} ${styles.bannerTitle}`} />
          <div className={`${styles.skeleton} ${styles.bannerSubtitle}`} />
          <div className={`${styles.skeleton} ${styles.bannerSubtitleShort}`} />
        </div>
        <div className={`${styles.skeleton} ${styles.bannerVisual}`} />
      </div>

      {/* 2. Stats Grid (BusinessCard + AIUsageCard) */}
      <div className={styles.statsGrid}>
        {/* BusinessCard */}
        <div className={styles.card}>
          <div className={`${styles.skeleton} ${styles.cardTitle}`} />
          <div className={styles.businessRow}>
            <div className={`${styles.skeleton} ${styles.avatar}`} />
            <div className={styles.businessInfo}>
              <div className={`${styles.skeleton} ${styles.lineShort}`} />
              <div className={`${styles.skeleton} ${styles.lineTiny}`} />
              <div className={`${styles.skeleton} ${styles.badge}`} />
            </div>
            <div className={styles.businessDetails}>
              <div className={`${styles.skeleton} ${styles.lineShort}`} />
              <div className={`${styles.skeleton} ${styles.lineMedium}`} />
            </div>
          </div>
        </div>

        {/* AIUsageCard */}
        <div className={styles.card}>
          <div className={`${styles.skeleton} ${styles.cardTitle}`} />
          <div className={styles.usageGrid}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.usageItem}>
                <div className={`${styles.skeleton} ${styles.usageIcon}`} />
                <div className={`${styles.skeleton} ${styles.usageValue}`} />
                <div className={`${styles.skeleton} ${styles.usageLabel}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Charts Row (UsageChart + BreakdownChart) */}
      <div className={styles.chartsRow}>
        {/* UsageChart */}
        <div className={styles.card}>
          <div className={styles.chartHeader}>
            <div className={`${styles.skeleton} ${styles.cardTitle}`} />
            <div className={`${styles.skeleton} ${styles.dropdown}`} />
          </div>
          <div className={styles.chartBody}>
            {[30, 45, 35, 60, 50, 70, 55].map((h, i) => (
              <div key={i} className={`${styles.skeleton} ${styles.chartBar}`} style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* BreakdownChart */}
        <div className={styles.card}>
          <div className={`${styles.skeleton} ${styles.cardTitle}`} />
          <div className={styles.breakdownBody}>
            <div className={`${styles.skeleton} ${styles.donut}`} />
            <div className={styles.legendList}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={styles.legendItem}>
                  <div className={`${styles.skeleton} ${styles.legendDot}`} />
                  <div className={`${styles.skeleton} ${styles.legendLabel}`} />
                  <div className={`${styles.skeleton} ${styles.legendValue}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. QuickActions + RecentCampaigns */}
      <div className={styles.rowGrid}>
        <div className={styles.card}>
          <div className={`${styles.skeleton} ${styles.cardTitle}`} />
          <div className={styles.quickActionsGrid}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.quickActionItem}>
                <div className={`${styles.skeleton} ${styles.quickIcon}`} />
                <div className={`${styles.skeleton} ${styles.quickLabel}`} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.card}>
          <div className={`${styles.skeleton} ${styles.cardTitle}`} />
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.listItem}>
              <div className={`${styles.skeleton} ${styles.listIcon}`} />
              <div className={styles.listInfo}>
                <div className={`${styles.skeleton} ${styles.lineShort}`} />
                <div className={`${styles.skeleton} ${styles.lineTiny}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. RecentContent + GrowthRecommendations */}
      <div className={styles.rowGrid}>
        <div className={styles.card}>
          <div className={`${styles.skeleton} ${styles.cardTitle}`} />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.listItem}>
              <div className={`${styles.skeleton} ${styles.listIcon}`} />
              <div className={styles.listInfo}>
                <div className={`${styles.skeleton} ${styles.lineMedium}`} />
                <div className={`${styles.skeleton} ${styles.lineTiny}`} />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.card}>
          <div className={`${styles.skeleton} ${styles.cardTitle}`} />
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.listItem}>
              <div className={`${styles.skeleton} ${styles.listIcon}`} />
              <div className={styles.listInfo}>
                <div className={`${styles.skeleton} ${styles.lineShort}`} />
                <div className={`${styles.skeleton} ${styles.lineTiny}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}