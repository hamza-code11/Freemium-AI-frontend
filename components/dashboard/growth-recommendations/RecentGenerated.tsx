// components/dashboard/growth-recommendations/RecentGenerated.tsx
'use client';

import { Clock, ArrowRight, FileText, Megaphone, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react'; //  Import
import { useHistory } from '@/hooks/useHistory';
import { HistoryItem as HistoryItemType } from '@/services/history.service';
import HistoryViewModal from '@/components/dashboard/history/HistoryViewModal'; //  Import
import styles from './RecentGenerated.module.css';

const getIconForType = (type: string) => {
  if (type === 'content') return <FileText size={16} />;
  if (type === 'campaign') return <Megaphone size={16} />;
  return <TrendingUp size={16} />;
};

const getColorForType = (type: string) => {
  if (type === 'content') return '#3B82F6';
  if (type === 'campaign') return '#8B5CF6';
  return '#10B981';
};

export default function RecentGenerated() {
  const [selectedItem, setSelectedItem] = useState<HistoryItemType | null>(null); //  State

  const { items, loading } = useHistory({
    type_filter: 'recommendation',
    date_range: 'all',
    custom_from: '',
    custom_to: '',
    sort: 'latest',
    search: '',
    page: 1,
  });

  const recentRecs = items.slice(0, 4);

  return (
    <>
      <section className={styles.panel} aria-label="Recently generated">
        
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            <Clock size={14} /> Recently Generated
          </h2>
          <Link 
            href="/dashboard/history?type=recommendation" 
            className={styles.viewAllBtn}
          >
            View All <ArrowRight size={12} />
          </Link>
        </div>

        {/* Loading */}
        {loading ? (
          <div className={styles.grid}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.itemSkeleton}>
                <div className={styles.skeletonThumb} />
                <div className={styles.skeletonInfo}>
                  <div className={styles.skeletonLine} />
                  <div className={styles.skeletonLineShort} />
                </div>
              </div>
            ))}
          </div>
        ) : recentRecs.length === 0 ? (
          <div className={styles.emptyState}>
            <TrendingUp size={32} />
            <p>No recommendations yet. Generate your first one!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {recentRecs.map((r) => {
              const recCount = r.metadata?.count || 0;
              const date = new Date(r.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <button
                  key={`${r.type}-${r.id}`}
                  type="button"
                  onClick={() => setSelectedItem(r)} //  Modal open
                  className={styles.item}
                >
                  <div 
                    className={styles.thumb} 
                    style={{ color: getColorForType(r.type) }}
                  >
                    {getIconForType(r.type)}
                  </div>
                  
                  <div className={styles.info}>
                    <h3 className={styles.itemTitle}>{r.title}</h3>
                    <p className={styles.meta}>{date}</p>
                    <p className={styles.metaDark}>{recCount} recommendations</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

      </section>

      {/*  Modal */}
      <HistoryViewModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}