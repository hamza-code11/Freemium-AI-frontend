// components/dashboard/campaign-planner/RecentCampaigns.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, Clock, Megaphone } from 'lucide-react';
import { useState } from 'react'; //  Import
import { useHistory } from '@/hooks/useHistory';
import { HistoryItem as HistoryItemType } from '@/services/history.service';
import HistoryViewModal from '@/components/dashboard/history/HistoryViewModal'; //  Import
import styles from './RecentCampaigns.module.css';

export default function RecentCampaigns() {
  const [selectedItem, setSelectedItem] = useState<HistoryItemType | null>(null); //  State

  const { items, loading } = useHistory({
    type_filter: 'campaign',
    date_range: 'all',
    custom_from: '',
    custom_to: '',
    sort: 'latest',
    search: '',
    page: 1,
  });

  const recentCampaigns = items.slice(0, 4);

  return (
    <>
      <section className={styles.card} aria-labelledby="cp-recent-title">
        
        <div className={styles.head}>
          <h2 id="cp-recent-title" className={styles.title}>
            <Clock size={18} className={styles.titleIcon} /> Recent Campaigns
          </h2>
          <Link 
            href="/dashboard/history?type=campaign" 
            className={styles.link}
          >
            View All <ArrowRight size={12} />
          </Link>
        </div>

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
        ) : recentCampaigns.length === 0 ? (
          <div className={styles.emptyState}>
            <Megaphone size={32} />
            <p>No campaigns yet. Generate your first one!</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {recentCampaigns.map((c) => {
              const date = new Date(c.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });
              const objective = c.metadata?.objective || 'Campaign';

              return (
                <button
                  key={`${c.type}-${c.id}`}
                  type="button"
                  onClick={() => setSelectedItem(c)} //  Modal open
                  className={styles.item}
                >
                  <div className={styles.thumb}>
                    <Megaphone size={16} />
                  </div>
                  
                  <div className={styles.info}>
                    <h3 className={styles.itemTitle}>{c.title}</h3>
                    <p className={styles.meta}>{date}</p>
                    <p className={styles.metaDark}>{objective}</p>
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