'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, Zap, FileText, Megaphone, TrendingUp } from 'lucide-react';
import { adminUserService, AdminUserDetail } from '@/services/admin-user.service';
import { getUploadsBaseUrl } from '@/lib/imageUrl';
import styles from './UserUsagePanel.module.css';

interface Props {
  userId: number | null;
}

export default function UserUsagePanel({ userId }: Props) {
  const [user, setUser] = useState<AdminUserDetail | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) {
      setUser(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    adminUserService
      .getUserDetails(userId)
      .then((res) => {
        if (!cancelled) setUser(res);
      })
      .catch(console.error)
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (!userId) return null;

  if (loading || !user) {
    return (
      <div className={styles.card}>
        <div className={styles.loader}>
          <Loader2 size={22} className="animate-spin" />
        </div>
      </div>
    );
  }

  const avatarSrc = user.image
    ? `${getUploadsBaseUrl()}/users/${user.image}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random&color=fff`;

  const totalGenerations =
    (user.content_generated ?? 0) +
    (user.campaigns_generated ?? 0) +
    (user.recommendations_generated ?? 0);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>User Details</h3>
      </div>

      <div className={styles.profile}>
        <img src={avatarSrc} alt={user.name} className={styles.avatar} />
        <div>
          <h4 className={styles.name}>{user.name}</h4>
          <p className={styles.email}>{user.email}</p>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.section}>
        <h5 className={styles.sectionTitle}>Usage Summary</h5>
        <StatRow
          icon={<Zap size={16} />}
          bg="#EEF2FF"
          color="#6366F1"
          label="Total Generations"
          value={totalGenerations}
        />
        <StatRow
          icon={<FileText size={16} />}
          bg="#EFF6FF"
          color="#3B82F6"
          label="Content Generations"
          value={user.content_generated ?? 0}
        />
        <StatRow
          icon={<Megaphone size={16} />}
          bg="#F5F3FF"
          color="#8B5CF6"
          label="Campaign Generations"
          value={user.campaigns_generated ?? 0}
        />
        <StatRow
          icon={<TrendingUp size={16} />}
          bg="#ECFDF5"
          color="#10B981"
          label="Growth Generations"
          value={user.recommendations_generated ?? 0}
        />
      </div>
    </div>
  );
}

function StatRow({
  icon,
  bg,
  color,
  label,
  value,
}: {
  icon: React.ReactNode;
  bg: string;
  color: string;
  label: string;
  value: number;
}) {
  return (
    <div className={styles.statRow}>
      <div className={styles.statIcon} style={{ background: bg, color }}>
        {icon}
      </div>
      <div className={styles.statInfo}>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}