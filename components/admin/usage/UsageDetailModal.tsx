'use client';

import React, { useEffect, useState } from 'react';
import {
  X, Loader2, User as UserIcon, Calendar, FileText,
  Megaphone, TrendingUp, ArrowDown,
} from 'lucide-react';
import { adminUsageService, UsageRecordDetail, UsageFeature } from '@/services/admin-usage.service';
import { getUploadsBaseUrl } from '@/lib/imageUrl';
import styles from './UsageDetailModal.module.css';

interface Props {
  feature: UsageFeature;
  recordId: number;
  onClose: () => void;
}

const META: Record<UsageFeature, { label: string; icon: React.ReactNode; bg: string; color: string }> = {
  content: { label: 'Content Generation', icon: <FileText size={16} />, bg: '#EFF6FF', color: '#3B82F6' },
  campaign: { label: 'Campaign Planner', icon: <Megaphone size={16} />, bg: '#F5F3FF', color: '#8B5CF6' },
  growth: { label: 'Growth Recommendations', icon: <TrendingUp size={16} />, bg: '#ECFDF5', color: '#10B981' },
};

const pretty = (v: unknown) => {
  try {
    return JSON.stringify(v, null, 2);
  } catch {
    return String(v);
  }
};

export default function UsageDetailModal({ feature, recordId, onClose }: Props) {
  const [data, setData] = useState<UsageRecordDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    adminUsageService
      .getDetail(feature, recordId)
      .then((r) => {
        if (!cancelled) setData(r);
      })
      .catch((e) => {
        if (!cancelled) setError(e?.response?.data?.detail || 'Failed to load details');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [feature, recordId]);

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

  const meta = META[feature];

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });

  const avatar = data?.user_image
    ? `${getUploadsBaseUrl()}/users/${data.user_image}`
    : data
      ? `https://ui-avatars.com/api/?name=${encodeURIComponent(data.user_name)}&background=random&color=fff`
      : '';

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.iconWrap} style={{ background: meta.bg, color: meta.color }}>
              {meta.icon}
            </div>
            <div>
              <h2 className={styles.title}>{meta.label}</h2>
              <p className={styles.subtitle}>Record #{recordId}</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className={styles.body}>
          {loading && (
            <div className={styles.center}>
              <Loader2 size={28} className="animate-spin" />
              <p>Loading record…</p>
            </div>
          )}

          {!loading && error && <div className={styles.errorBox}>{error}</div>}

          {!loading && !error && data && (
            <>
              <div className={styles.metaGrid}>
                <div className={styles.metaRow}>
                  <img src={avatar} alt={data.user_name} className={styles.avatar} />
                  <div>
                    <div className={styles.metaLabel}>User</div>
                    <div className={styles.metaValue}>
                      <UserIcon size={12} /> {data.user_name}
                    </div>
                    <div className={styles.metaSub}>{data.user_email}</div>
                  </div>
                </div>
                <div className={styles.metaRow}>
                  <div>
                    <div className={styles.metaLabel}>Date / Time</div>
                    <div className={styles.metaValue}>
                      <Calendar size={12} /> {fmtDate(data.created_at)}
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.divider} />

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Input (User → AI)</h3>
                <pre className={styles.codeBlock}>{pretty(data.input_payload)}</pre>
              </section>

              <div className={styles.arrowDivider}>
                <ArrowDown size={16} />
              </div>

              <section className={styles.section}>
                <h3 className={styles.sectionTitle}>Output (AI → User)</h3>
                <pre className={styles.codeBlock}>
                  {typeof data.output_payload === 'string' ? data.output_payload : pretty(data.output_payload)}
                </pre>
              </section>
            </>
          )}
        </div>

        <div className={styles.footer}>
          <button className={styles.closeFooterBtn} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
