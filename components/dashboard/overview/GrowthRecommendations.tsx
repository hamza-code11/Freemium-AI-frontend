// components/dashboard/overview/GrowthRecommendations.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight, FileText, TrendingUp, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { HistoryItem as HistoryItemType } from '@/services/history.service';
import HistoryViewModal from '@/components/dashboard/history/HistoryViewModal';
import styles from './GrowthRecommendations.module.css';

interface Props {
  items: HistoryItemType[];
  loading: boolean;
}

const getIconForRecommendation = (rec: any) => {
  const tools = rec?.tools || [];
  if (tools.includes('instagram') || tools.includes('facebook') || tools.includes('tiktok')) return TrendingUp;
  if (tools.includes('mailchimp')) return FileText;
  return Sparkles;
};

const getToneClass = (index: number) => {
  const tones = ['toneBlue', 'toneGreen', 'toneAmber'];
  return tones[index % tones.length];
};

export default function GrowthRecommendations({ items, loading }: Props) {
  const [selectedItem, setSelectedItem] = useState<HistoryItemType | null>(null);
  const recentRecs = items.slice(0, 3);

  return (
    <>
      <section className={styles.card} aria-labelledby="grow-title">
        
        <div className={styles.cardHead}>
          <h2 id="grow-title" className={styles.cardTitle}>Growth Recommendations</h2>
          <Link href="/dashboard/history?type=recommendation" className={styles.link}>
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
        ) : recentRecs.length === 0 ? (
          <div className={styles.emptyState}>
            <Sparkles size={32} />
            <p>No recommendations yet.</p>
            <Link href="/dashboard/growth-recommendations" className={styles.emptyLink}>
              Generate your first one →
            </Link>
          </div>
        ) : (
          <div className={styles.list}>
            {recentRecs.map((item, index) => {
              const firstRec = item.metadata?.recommendations?.[0];
              const Icon = getIconForRecommendation(firstRec);
              const tone = getToneClass(index);
              const title = firstRec?.title || item.title || 'Untitled Recommendation';
              const desc = firstRec?.desc || item.preview || 'View details';
              
              return (
                <button
                  key={`${item.type}-${item.id}`}
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className={styles.row}
                >
                  <span className={`${styles.tile} ${styles[tone]} ${styles.circle}`}>
                    <Icon size={20} />
                  </span>
                  <div className={styles.rInfo}>
                    <div className={styles.rTitle}>{title}</div>
                    <div className={styles.rMeta}>{desc}</div>
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