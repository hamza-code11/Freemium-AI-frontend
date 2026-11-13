// components/admin/users/BusinessProfileModal.tsx
'use client';

import React, { useEffect, useState } from 'react';
import {
  X, Building2, Globe, Phone, MapPin, Target, Users, Calendar, Loader2,
} from 'lucide-react';
import {
  adminUserService,
  UserBusinessProfileResponse,
  AdminBusinessProfile,
} from '@/services/admin-user.service';
import styles from './BusinessProfileModal.module.css';

interface Props {
  userId: number;
  userName: string;
  onClose: () => void;
}

const fmt = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';

export default function BusinessProfileModal({ userId, userName, onClose }: Props) {
  const [data, setData] = useState<UserBusinessProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await adminUserService.getBusinessProfile(userId);
        setData(res);
      } catch (err: any) {
        setError(err?.response?.data?.detail || 'Failed to load business profiles');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const profiles = data?.profiles ?? [];
  const totalProfiles = data?.total_profiles ?? profiles.length;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.iconWrap}>
              <Building2 size={20} />
            </div>
            <div>
              <h2 className={styles.title}>
                Business Profiles
                {!loading && totalProfiles > 0 && (
                  <span className={styles.countBadge}>{totalProfiles}</span>
                )}
              </h2>
              <p className={styles.subtitle}>
                {data?.user_name || userName}
                {data?.user_email && <span className={styles.email}> · {data.user_email}</span>}
              </p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className={styles.body}>
          {loading && (
            <div className={styles.center}>
              <Loader2 size={28} className="animate-spin" />
              <p>Loading business profiles…</p>
            </div>
          )}

          {!loading && error && <div className={styles.errorBox}>{error}</div>}

          {!loading && !error && profiles.length === 0 && (
            <div className={styles.emptyBox}>
              <Building2 size={36} />
              <p className={styles.emptyTitle}>No Business Profiles</p>
              <p className={styles.emptyDesc}>
                This user has not created any business profile yet.
              </p>
            </div>
          )}

          {!loading && !error && profiles.length > 0 && (
            <div className={styles.profileList}>
              {profiles.map((profile, idx) => (
                <ProfileCard key={profile.id} profile={profile} index={idx + 1} />
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className={styles.footer}>
          <button className={styles.closeFooterBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   Single card for one business profile
   ====================================================== */
function ProfileCard({ profile, index }: { profile: AdminBusinessProfile; index: number }) {
  return (
    <div className={styles.profileCard}>
      <div className={styles.heroCard}>
        <div className={styles.heroTop}>
          <span className={styles.profileIndex}>#{index}</span>
          <h3 className={styles.bizName}>{profile.business_name}</h3>
        </div>
        {profile.business_type && (
          <span className={styles.typeBadge}>{profile.business_type}</span>
        )}
        {profile.business_description && (
          <p className={styles.desc}>{profile.business_description}</p>
        )}
      </div>

      <div className={styles.grid}>
        {profile.services && (
          <InfoRow icon={<Building2 size={16} />} label="Services / Products" value={profile.services} />
        )}
        {profile.business_goals && (
          <InfoRow icon={<Target size={16} />} label="Business Goals" value={profile.business_goals} />
        )}
        {profile.target_audience && profile.target_audience.length > 0 && (
          <InfoRow
            icon={<Users size={16} />}
            label="Target Audience"
            value={profile.target_audience.join(', ')}
          />
        )}
        {profile.website && (
          <InfoRow
            icon={<Globe size={16} />}
            label="Website"
            value={
              <a
                href={profile.website}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
              >
                {profile.website}
              </a>
            }
          />
        )}
        {profile.phone && <InfoRow icon={<Phone size={16} />} label="Phone" value={profile.phone} />}
        {profile.address && (
          <InfoRow icon={<MapPin size={16} />} label="Address" value={profile.address} />
        )}
        <InfoRow icon={<Calendar size={16} />} label="Created" value={fmt(profile.created_at)} />
        <InfoRow icon={<Calendar size={16} />} label="Last Updated" value={fmt(profile.updated_at)} />
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className={styles.infoRow}>
      <div className={styles.infoIcon}>{icon}</div>
      <div>
        <div className={styles.infoLabel}>{label}</div>
        <div className={styles.infoValue}>{value}</div>
      </div>
    </div>
  );
}