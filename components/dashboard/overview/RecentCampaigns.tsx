// components/dashboard/overview/RecentCampaigns.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight, Mail, Megaphone } from 'lucide-react';
import { useState } from 'react';
import { HistoryItem as HistoryItemType } from '@/services/history.service';
import HistoryViewModal from '@/components/dashboard/history/HistoryViewModal';
import styles from './RecentCampaigns.module.css';

interface Props {
  items: HistoryItemType[];
  loading: boolean;
}

const getToneClass = (index: number) => {
  const tones = ['tonePurple', 'toneBlue', 'toneRed'];
  return tones[index % tones.length];
};

const getIconForCampaign = (channels: string[] = []) => {
  if (channels.includes('email')) return Mail;
  return Megaphone;
};

export default function RecentCampaigns({ items, loading }: Props) {
  const [selectedItem, setSelectedItem] = useState<HistoryItemType | null>(null);
  
  const recentCampaigns = items.slice(0, 3);

  return (
    <>
      <section className={styles.card} aria-labelledby="camp-title">
        
        <div className={styles.cardHead}>
          <h2 id="camp-title" className={styles.cardTitle}>Recent Campaigns</h2>
          <Link href="/dashboard/history?type=campaign" className={styles.link}>
            View All <ArrowRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className={styles.list}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.rowSkeleton}>
                <div className={styles.skeletonCircle} />
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
            <p>No campaigns yet.</p>
            <Link href="/dashboard/campaign-planner" className={styles.emptyLink}>
              Create your first campaign →
            </Link>
          </div>
        ) : (
          <div className={styles.list}>
            {recentCampaigns.map((c, index) => {
              const Icon = getIconForCampaign(c.metadata?.channels || []);
              const tone = getToneClass(index);
              
              const date = new Date(c.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });
              
              const channels = c.metadata?.channels || [];
              const channelLabel = channels.length > 0 
                ? channels.slice(0, 2).map((ch: string) => ch.charAt(0).toUpperCase() + ch.slice(1)).join(' • ')
                : 'Multi-channel';
              
              return (
                <button
                  key={`${c.type}-${c.id}`}
                  type="button"
                  onClick={() => setSelectedItem(c)}
                  className={styles.row}
                >
                  <span className={`${styles.tile} ${styles[tone]} ${styles.circle}`}>
                    <Icon size={20} />
                  </span>
                  <div className={styles.rInfo}>
                    <div className={styles.rTitle}>{c.title}</div>
                    <div className={styles.rMeta}>{date} • {channelLabel}</div>
                  </div>
                  <ChevronRight size={16} className={styles.chev} />
                </button>
              );
            })}
          </div>
        )}
      </section>

      <HistoryViewModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}