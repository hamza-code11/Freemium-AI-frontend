'use client';

import React, { useState, useEffect } from 'react';
import {
  Search, ChevronDown, ChevronLeft, ChevronRight, Eye,
  FileText, Megaphone, TrendingUp,
} from 'lucide-react';
import { useAdminUsage } from '@/hooks/useAdminUsage';
import { UsageDateRange, UsageFeature } from '@/services/admin-usage.service';
import { getUploadsBaseUrl } from '@/lib/imageUrl';
import UsageDetailModal from './UsageDetailModal';
import UsageTableSkeleton from '@/components/admin/skeletons/UsageSkeleton/UsageTableSkeleton';
import styles from './UsageTable.module.css';

const PAGE_SIZE = 10;

const FEATURE_META: Record<UsageFeature, { label: string; icon: React.ReactNode; bg: string; color: string }> = {
  content: { label: 'Content', icon: <FileText size={12} />, bg: '#EFF6FF', color: '#3B82F6' },
  campaign: { label: 'Campaign', icon: <Megaphone size={12} />, bg: '#F5F3FF', color: '#8B5CF6' },
  growth: { label: 'Growth', icon: <TrendingUp size={12} />, bg: '#ECFDF5', color: '#10B981' },
};

interface Props {
  dateRange: UsageDateRange;
  feature: UsageFeature | 'all';
  customFrom?: string;
  customTo?: string;
  onSelectUser: (id: number) => void;
  onRecordsLoaded?: (records: { id: number; feature: UsageFeature }[]) => void;
}

export default function UsageTable({
  dateRange,
  feature,
  customFrom,
  customTo,
  onSelectUser,
  onRecordsLoaded,
}: Props) {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'latest' | 'oldest'>('latest');
  const [localFeature, setLocalFeature] = useState<UsageFeature | 'all'>('all');
  const [modal, setModal] = useState<{ feature: UsageFeature; id: number } | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput.trim()), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    setLocalFeature(feature);
  }, [feature]);

  const { records, loading, total, totalPages, currentPage, setCurrentPage } =
    useAdminUsage({
      search,
      sort,
      dateRange,
      feature: localFeature,
      pageSize: PAGE_SIZE,
      customFrom,
      customTo,
    });

  useEffect(() => {
    if (!loading && onRecordsLoaded) {
      onRecordsLoaded(records.map((r) => ({ id: r.user_id, feature: r.feature })));
    }
  }, [loading, records, onRecordsLoaded]);

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>User Usage Records</h3>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <Search size={14} />
          <input
            type="text"
            placeholder="Search by user or email..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <div className={styles.selectWrap}>
          <select
            value={localFeature}
            onChange={(e) => setLocalFeature(e.target.value as UsageFeature | 'all')}
            aria-label="Filter by feature"
          >
            <option value="all">All Features</option>
            <option value="content">Content Generator</option>
            <option value="campaign">Campaign Planner</option>
            <option value="growth">Growth Recommendations</option>
          </select>
          <ChevronDown size={12} />
        </div>

        <div className={styles.selectWrap}>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as 'latest' | 'oldest')}
            aria-label="Sort"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <ChevronDown size={12} />
        </div>
      </div>

      <div className={styles.tableWrapper}>
        {loading ? (
          <UsageTableSkeleton />
        ) : records.length === 0 ? (
          <div className={styles.empty}>No usage records found</div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Feature</th>
                <th>Date / Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => {
                const meta = FEATURE_META[r.feature];
                const avatar = r.user_image
                  ? `${getUploadsBaseUrl()}/users/${r.user_image}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(r.user_name)}&background=random&color=fff`;
                return (
                  <tr key={`${r.feature}-${r.id}`}>
                    <td>
                      <button
                        className={styles.userCell}
                        onClick={() => onSelectUser(r.user_id)}
                        title="View user details"
                      >
                        <img src={avatar} alt={r.user_name} className={styles.avatar} />
                        <div>
                          <span className={styles.name}>{r.user_name}</span>
                          <span className={styles.email}>{r.user_email}</span>
                        </div>
                      </button>
                    </td>
                    <td>
                      <span className={styles.featureBadge} style={{ background: meta.bg, color: meta.color }}>
                        {meta.icon} {meta.label}
                      </span>
                    </td>
                    <td className={styles.muted}>{fmtDate(r.created_at)}</td>
                    <td>
                      <button
                        className={styles.viewBtn}
                        onClick={() => setModal({ feature: r.feature, id: r.id })}
                      >
                        <Eye size={14} /> View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {records.length > 0 && (
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>
            Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, total)} of {total}
          </span>
          <div className={styles.pageControls}>
            <button className={styles.pageArrow} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
              <ChevronLeft size={14} />
            </button>
            <span className={`${styles.pageNum} ${styles.active}`}>{currentPage}</span>
            <span className={styles.pageSep}>/ {totalPages}</span>
            <button className={styles.pageArrow} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {modal && (
        <UsageDetailModal
          feature={modal.feature}
          recordId={modal.id}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}