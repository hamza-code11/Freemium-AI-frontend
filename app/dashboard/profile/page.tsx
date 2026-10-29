import type { Metadata } from 'next';
import ProfileHeader from '@/components/dashboard/business-profile/ProfileHeader';
import BusinessInfoForm from '@/components/dashboard/business-profile/BusinessInfoForm';
import ProfilePreview from '@/components/dashboard/business-profile/ProfilePreview';
import styles from './Profile.module.css';

export const metadata: Metadata = {
  title: 'Profile | Freemium AI',
  description: 'Manage your profile information to get personalized AI content and growth recommendations.',
};

export default function ProfilePage() {
  return (
    <div className={styles.pageWrapper}>
      
      {/* Header Section */}
      <ProfileHeader />

      {/* Main Content Grid */}
      <div className={styles.layoutGrid}>
        {/* Left: Form Box */}
        <BusinessInfoForm />
        
        {/* Right: Preview Box */}
        <ProfilePreview />
      </div>

    </div>
  );
}
