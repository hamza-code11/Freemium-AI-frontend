import type { Metadata } from 'next';
import ProfileForm from '@/components/admin/profile/ProfileForm';
import styles from './AdminProfile.module.css';

export const metadata: Metadata = {
  title: 'My Profile | Admin',
  description: 'Manage your admin profile information and security settings.',
};

export default function AdminProfilePage() {
  return (
    <div className={styles.pageWrapper}>
      
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Account Settings</h1>
        <p className={styles.subtitle}>Manage your profile details, avatar, and account security from one place.</p>
      </div>

      {/* Main Content (Only Form) */}
      <div className={styles.contentWrapper}>
        <ProfileForm />
      </div>

    </div>
  );
}
