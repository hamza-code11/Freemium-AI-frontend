// app/dashboard/campaign-planner/page.tsx
import { CampaignProvider } from '@/context/CampaignContext';
import CampaignHeader from '@/components/dashboard/campaign-planner/CampaignHeader';
import CreateCampaignForm from '@/components/dashboard/campaign-planner/CreateCampaignForm';
import GeneratedCampaignPlan from '@/components/dashboard/campaign-planner/GeneratedCampaignPlan';
import RecentCampaigns from '@/components/dashboard/campaign-planner/RecentCampaigns';
import styles from './page.module.css';

export default function CampaignPlannerPage() {
  return (
    <CampaignProvider>
      <div className={styles.container}>
        <CampaignHeader />
        <div className={styles.grid}>
          <CreateCampaignForm />
          <GeneratedCampaignPlan />
        </div>
        <RecentCampaigns />
      </div>
    </CampaignProvider>
  );
}