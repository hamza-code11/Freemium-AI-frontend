// components/admin/users/UserDetailsPanel.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { adminUserService, AdminUserDetail } from '@/services/admin-user.service';
import { getUploadsBaseUrl } from '@/lib/imageUrl';
import styles from './UserDetailsPanel.module.css';

interface Props {
  userId: number | null;
}

export default function UserDetailsPanel({ userId }: Props) {
  const [user, setUser] = useState<AdminUserDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) {
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await adminUserService.getUserDetails(userId);
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (!userId) return null;

  if (loading || !user) {
    return (
      <div className={styles.panelCard}>
        <div
          style={{
            padding: '2rem',
            textAlign: 'center',
            color: 'var(--color-text-tertiary)',
          }}
        >
          <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto' }} />
        </div>
      </div>
    );
  }

  const avatarSrc = user.image
    ? `${getUploadsBaseUrl()}/users/${user.image}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.name,
    )}&background=random&color=fff`;

  const formatDate = (iso: string | null) => {
    if (!iso) return 'N/A';
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={styles.panelCard}>
      <div className={styles.header}>
        <h3 className={styles.title}>User Details</h3>
      </div>

      {/* Profile Info */}
      <div className={styles.profileHeader}>
        <img src={avatarSrc} alt={user.name} className={styles.avatar} />

        <div>
          <h4 className={styles.name}>{user.name}</h4>
          <p className={styles.email}>{user.email}</p>

          <span
            className={styles.activeBadge}
            style={{
              background: user.is_suspended
                ? '#FEF2F2'
                : user.is_active
                  ? '#ECFDF5'
                  : '#FEF3C7',
              color: user.is_suspended
                ? '#ef4444'
                : user.is_active
                  ? '#10b981'
                  : '#f59e0b',
            }}
          >
            {user.is_suspended ? 'Suspended' : user.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h5 className={styles.sectionTitle}>Profile Information</h5>
        <div className={styles.infoRow}>
          <span>User ID:</span>
          <strong>#{user.id}</strong>
        </div>
        <div className={styles.infoRow}>
          <span>Role:</span>
          <strong>{user.role}</strong>
        </div>
        <div className={styles.infoRow}>
          <span>Registered:</span>
          <strong>{formatDate(user.created_at)}</strong>
        </div>
        <div className={styles.infoRow}>
          <span>Last Active:</span>
          <strong>{formatDate(user.last_active_at)}</strong>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h5 className={styles.sectionTitle}>Usage Summary</h5>
        <div className={styles.infoRow}>
          <span>Total Generations:</span>
          <strong>{user.total_generations}</strong>
        </div>
        <div className={styles.infoRow}>
          <span>Content:</span>
          <strong>{user.content_generated}</strong>
        </div>
        <div className={styles.infoRow}>
          <span>Campaigns:</span>
          <strong>{user.campaigns_generated}</strong>
        </div>
        <div className={styles.infoRow}>
          <span>Recommendations:</span>
          <strong>{user.recommendations_generated}</strong>
        </div>
      </div>
    </div>
  );
}

