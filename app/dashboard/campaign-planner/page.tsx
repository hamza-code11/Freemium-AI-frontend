'use client';

import React from 'react';
import CampaignHeader from '@/components/dashboard/campaign-planner/CampaignHeader';
import CreateCampaignForm from '@/components/dashboard/campaign-planner/CreateCampaignForm';
import GeneratedCampaignPlan from '@/components/dashboard/campaign-planner/GeneratedCampaignPlan';
import RecentCampaigns from '@/components/dashboard/campaign-planner/RecentCampaigns';
import { CampaignProvider } from '@/context/CampaignContext';
import styles from './page.module.css';

export default function CampaignPlannerPage() {
  return (
    <CampaignProvider>
      <div className={styles.container}>
        
        {/* 1. Header */}
        <CampaignHeader />

        {/* 2. Main Grid (Form on Left, Generated Plan on Right) */}
        <div className={styles.grid}>
          <CreateCampaignForm />
          <GeneratedCampaignPlan />
        </div>

        {/* 3. Recent Campaigns */}
        <RecentCampaigns />

      </div>
    </CampaignProvider>
  );
}