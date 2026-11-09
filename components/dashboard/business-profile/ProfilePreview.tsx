'use client';

import React, { useState } from 'react';
import { Briefcase, Users, Building2 } from 'lucide-react';
import styles from './ProfilePreview.module.css';
import { useProfile } from '@/context/ProfileContext';
import { getUploadsBaseUrl } from '@/lib/imageUrl';
import ProfilePreviewSkeleton from '@/components/dashboard/skeletons/ProfileHeaderSkeleton/ProfilePreviewSkeleton';

const AUDIENCE_LABELS: Record<string, string> = {
  kids_men: 'Kids (Men)', kids_women: 'Kids (Women)',
  teenagers_men: 'Teenagers (Men)', teenagers_women: 'Teenagers (Women)',
  young_adults_men: 'Young Adults (Men)', young_adults_women: 'Young Adults (Women)',
  young_men: 'Young Men', young_women: 'Young Women',
  middle_age_men: 'Middle Age (Men)', middle_age_women: 'Middle Age (Women)',
  seniors_men: 'Seniors (Men)', seniors_women: 'Seniors (Women)',
};

export default function ProfilePreview() {
  const { user, loading } = useProfile();
  const [activeTabId, setActiveTabId] = useState<number | null>(null);

  if (loading || !user) {
    return <ProfilePreviewSkeleton />;
  }

  const businesses = user.business_profiles || [];
  const activeBusiness = businesses.find(b => b.id === activeTabId) || businesses[0];

  const avatarSrc = user.image ? `${getUploadsBaseUrl()}/users/${user.image}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff`;

  return (
    <div className={styles.previewContainer}>
      <div className={styles.previewCard}>
        
        <div className={styles.cardHeader}>
          <div>
            <h2 className={styles.previewTitle}>Profile Preview</h2>
            <p className={styles.previewSubtitle}>This is how your information will be used in AI generation.</p>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.userHeader}>
          <div className={styles.userAvatar}>
            <img src={avatarSrc} alt={user.name} className={styles.avatarImg} />
          </div>
          <div>
            <h3 className={styles.userName}>{user.name}</h3>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
        </div>

        <div className={styles.divider} />

        {businesses.length > 1 && (
          <div className={styles.tabsContainer}>
            {businesses.map((biz) => (
              <button
                key={biz.id}
                className={`${styles.tab} ${activeBusiness?.id === biz.id ? styles.activeTab : ''}`}
                onClick={() => setActiveTabId(biz.id)}
              >
                <Briefcase size={14} />
                {biz.business_name}
              </button>
            ))}
          </div>
        )}

        {activeBusiness ? (
          <div className={styles.activeContent}>
            
            <div className={styles.identityRow}>
              <div className={styles.logoCircle}>
                <Briefcase size={20} className={styles.logoIcon} />
              </div>
              <div>
                <h3 className={styles.bizName}>{activeBusiness.business_name}</h3>
                <p className={styles.bizNiche}>{activeBusiness.business_type}</p>
              </div>
            </div>

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>About Business</h4>
              <p className={styles.aboutText}>{activeBusiness.business_description || 'No description provided yet.'}</p>
            </div>

                        {/* 🔥 Target Audience & Services (Stacked Row) */}
            <div className={styles.detailsGrid}>
              <div className={styles.detailItem}>
                <Users size={16} className={styles.detailIcon} />
                <div>
                  <span className={styles.dLabel}>Target Audience</span>
                  <span className={styles.dValue}>
                    {activeBusiness.target_audience?.map(a => AUDIENCE_LABELS[a] || a).join(', ') || 'Not specified'}
                  </span>
                </div>
              </div>

              {/* Services (Neeche wali row) */}
              <div className={styles.detailItem}>
                <Building2 size={16} className={styles.detailIcon} />
                <div>
                  <span className={styles.dLabel}>Services</span>
                  <span className={styles.dValue}>{activeBusiness.services}</span>
                </div>
              </div>
            </div>

            {/* 🔥 Business Goals (Text Style) */}
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Business Goals</h4>
              {activeBusiness.business_goals ? (
                <p className={styles.aboutText}>{activeBusiness.business_goals}</p>
              ) : (
                <p className={styles.aboutText}>No goals added yet.</p>
              )}
            </div>

          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', padding: '20px 0' }}>
            No business profile found.
          </p>
        )}

      </div>
    </div>
  );
}