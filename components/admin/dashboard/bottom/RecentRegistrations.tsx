// components/admin/dashboard/bottom/RecentRegistrations.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, Sparkles, Megaphone, TrendingUp } from 'lucide-react';
import { RecentGeneration } from '@/services/admin-dashboard.service';
import styles from './RecentRegistrations.module.css';

const ACTIVITY_TYPES: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  content: { label: 'Content', icon: Sparkles, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
  campaign: { label: 'Campaign', icon: Megaphone, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)' },
  growth: { label: 'Growth', icon: TrendingUp, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
};

interface Props {
  items: RecentGeneration[];
  loading?: boolean;
}

export default function RecentGenerations({ items, loading }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <Activity size={18} className={styles.icon} />
          {/*  Title Changed */}
          <h3 className={styles.title}>Recent Generations</h3>
        </div>
        <Link href="/admin/usage" className={styles.link}>View All →</Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} style={{ textAlign: 'center', padding: '1rem' }}>Loading...</td></tr>
            ) : items.length === 0 ? (
              <tr><td colSpan={3} style={{ textAlign: 'center', padding: '1rem', color: 'var(--color-text-tertiary)' }}>No generations yet</td></tr>
            ) : (
              items.map((gen) => {
                const activity = ACTIVITY_TYPES[gen.generation_type] || ACTIVITY_TYPES.content;
                const ActivityIcon = activity.icon;
                const date = new Date(gen.created_at).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric',
                });

                return (
                  <tr key={`${gen.generation_type}-${gen.id}`}>
                    <td>
                      <div className={styles.userInfo}>
                        <span className={styles.userName}>{gen.user_name}</span>
                        <span className={styles.userEmail}>{gen.user_email}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.activityBadge} style={{ color: activity.color, background: activity.bg }}>
                        <ActivityIcon size={12} />
                        <span>{activity.label}</span>
                      </div>
                    </td>
                    <td className={styles.date}>{date}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}