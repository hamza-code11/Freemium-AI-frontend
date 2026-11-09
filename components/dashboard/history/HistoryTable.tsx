// components/dashboard/history/HistoryTable.tsx
'use client';

import React, { useState } from 'react';
import { Eye, FileText, Megaphone, TrendingUp } from 'lucide-react';
import Pagination from '@/components/ui/Pagination';
import HistoryViewModal from './HistoryViewModal';
import HistoryTableSkeleton from '@/components/dashboard/skeletons/HistorySkeletons/HistoryTableSkeleton';
import { useHistory } from '@/hooks/useHistory';
import { HistoryItem as HistoryItemType } from '@/services/history.service';
import styles from './HistoryTable.module.css';

interface Filters {
  type_filter: string;
  date_range: string;
  custom_from: string;
  custom_to: string;
  sort: string;
  search: string;
  page: number;
}

interface Props {
  filters: Filters;
  onPageChange: (page: number) => void;
}

const getIconForType = (type: string) => {
  if (type === 'content') return <FileText size={16} />;
  if (type === 'campaign') return <Megaphone size={16} />;
  return <TrendingUp size={16} />;
};

const getColorForType = (type: string) => {
  if (type === 'content') return '#3B82F6';
  if (type === 'campaign') return '#3B82F6';
  return '#10B981';
};

const getTypeLabel = (type: string) => {
  if (type === 'content') return 'Content';
  if (type === 'campaign') return 'Campaign';
  return 'Recommendation';
};

export default function HistoryTable({ filters, onPageChange }: Props) {
  const [selectedItem, setSelectedItem] = useState<HistoryItemType | null>(null);
  
  const { items, loading, total, totalPages } = useHistory({
    type_filter: filters.type_filter,
    date_range: filters.date_range,
    custom_from: filters.custom_from,
    custom_to: filters.custom_to,
    sort: filters.sort,
    search: filters.search,
    page: filters.page,
  });

  // 🔥 SKELETON
  if (loading) return <HistoryTableSkeleton />;

  // 🔥 EMPTY STATE
  if (!items || items.length === 0) {
    return (
      <div className={styles.tableCard}>
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
          No history found. Start generating content to see it here!
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tableCard}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Preview</th>
              <th>Created</th>
              <th className={styles.centerText}>View</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={`${row.type}-${row.id}`} className={styles.row}>
                <td>
                  <div className={styles.titleCell}>
                    <div className={styles.iconWrap} style={{ color: getColorForType(row.type) }}>
                      {getIconForType(row.type)}
                    </div>
                    <div>
                      <div className={styles.rowTitle}>{row.title}</div>
                      <span className={styles.typeBadge}>{getTypeLabel(row.type)}</span>
                    </div>
                  </div>
                </td>
                <td className={styles.previewCell}>{row.preview}</td>
                <td>
                  <div className={styles.dateCell}>
                    <span>{new Date(row.created_at).toLocaleDateString()}</span>
                    <span className={styles.timeText}>
                      {new Date(row.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                </td>
                <td className={styles.centerText}>
                  <button
                    className={styles.viewBtn}
                    onClick={() => setSelectedItem(row)}
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={filters.page}
        totalPages={totalPages}
        totalResults={total}
        pageSize={10}
        onPageChange={onPageChange}
      />

      <HistoryViewModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}