// components/admin/dashboard/bottom/RecentActivity.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { RecentLogin } from '@/services/admin-dashboard.service';
import { getUploadsBaseUrl } from '@/lib/imageUrl';
import styles from './RecentActivity.module.css';

interface Props {
  items: RecentLogin[];
  loading?: boolean;
}

const timeAgo = (dateStr: string): string => {
  try {
    const date = new Date(dateStr);
    const diffMs = Date.now() - date.getTime();
    const mins = Math.floor(diffMs / 60000);
    const hours = Math.floor(diffMs / 3600000);
    const days = Math.floor(diffMs / 86400000);

    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    return date.toLocaleDateString();
  } catch {
    return '';
  }
};

export default function RecentLogins({ items, loading }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <LogIn size={18} className={styles.icon} />
          <h3 className={styles.title}>Recent Logins</h3>
        </div>
        <Link href="/admin/users" className={styles.link}>View All →</Link>
      </div>

      <div className={styles.list}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '1rem' }}>Loading...</div>
        ) : items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--color-text-tertiary)' }}>No recent logins</div>
        ) : (
          items.map((user) => {
            const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : '?';
            const avatarSrc = user.image ? `${getUploadsBaseUrl()}/users/${user.image}` : null;

            return (
              <div key={`${user.id}-${user.logged_in_at}`} className={styles.item}>
                
                <div className={styles.avatarWrapper}>
                  {avatarSrc ? (
                    <img src={avatarSrc} alt={user.name} className={styles.avatarImg} />
                  ) : (
                    <div className={styles.avatarFallback}>{firstLetter}</div>
                  )}
                </div>

                <div className={styles.content}>
                  <span className={styles.userName}>{user.name || 'Unknown'}</span>
                  <span className={styles.userEmail}>{user.email}</span>
                </div>

                <span className={styles.time}>{timeAgo(user.logged_in_at)}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}