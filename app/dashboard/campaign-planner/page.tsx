import type { Metadata } from 'next';
import CampaignHeader from '@/components/dashboard/campaign-planner/CampaignHeader';
import CreateCampaignForm from '@/components/dashboard/campaign-planner/CreateCampaignForm';
import GeneratedCampaignPlan from '@/components/dashboard/campaign-planner/GeneratedCampaignPlan';
import RecentCampaigns from '@/components/dashboard/campaign-planner/RecentCampaigns';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'AI Campaign Planner | Freemium AI',
  description: 'Plan smarter marketing campaigns with AI-powered strategies tailored to your business goals.',
};

export default function CampaignPlannerPage() {
  return (
    <div className={styles.container}>
      <CampaignHeader />
      <div className={styles.grid}>
        <CreateCampaignForm />
        <GeneratedCampaignPlan />
      </div>
      <RecentCampaigns />
    </div>
  );
}