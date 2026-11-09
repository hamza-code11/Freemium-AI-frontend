// components/dashboard/overview/RecentContent.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, FileText, Megaphone, Users } from 'lucide-react';
import { useState } from 'react';
import { HistoryItem as HistoryItemType } from '@/services/history.service';
import HistoryViewModal from '@/components/dashboard/history/HistoryViewModal';
import styles from './RecentContent.module.css';

interface Props {
  items: HistoryItemType[];
  loading: boolean;
}

const getIconForContent = (metadata: any) => {
  const type = metadata?.content_type || '';
  const platform = metadata?.platform || '';
  
  if (platform === 'instagram' || platform === 'facebook' || platform === 'tiktok') return FileText;
  if (type === 'adcopy') return Megaphone;
  if (type === 'video') return Users;
  return FileText;
};

const getToneClass = (index: number) => {
  const tones = ['tonePink', 'toneBlue', 'toneBlue', 'toneAmber'];
  return tones[index % tones.length];
};

const getTagTone = (contentType: string = '') => {
  const map: Record<string, string> = {
    social: 'tonePurple',
    caption: 'tonePurple',
    adcopy: 'toneBlue',
    product: 'toneBlue',
    video: 'toneCyan',
  };
  return map[contentType] || 'toneBlue';
};

const getContentTypeLabel = (type: string = '') => {
  const map: Record<string, string> = {
    social: 'Social Post',
    caption: 'Caption',
    adcopy: 'Ad Copy',
    product: 'Product Description',
    video: 'Video',
  };
  return map[type] || 'Content';
};

const timeAgo = (dateStr: string): string => {
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
};

export default function RecentContent({ items, loading }: Props) {
  const [selectedItem, setSelectedItem] = useState<HistoryItemType | null>(null);
  const recentItems = items.slice(0, 4);

  return (
    <>
      <section className={styles.card} aria-labelledby="rc-title">
        
        <div className={styles.cardHead}>
          <h2 id="rc-title" className={styles.cardTitle}>Recent Generated Content</h2>
          <Link href="/dashboard/history?type=content" className={styles.link}>
            View All <ArrowRight size={12} />
          </Link>
        </div>

        {loading ? (
          <div className={styles.list}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={styles.rowSkeleton}>
                <div className={styles.skeletonIcon} />
                <div className={styles.skeletonInfo}>
                  <div className={styles.skeletonLine} />
                  <div className={styles.skeletonLineShort} />
                </div>
              </div>
            ))}
          </div>
        ) : recentItems.length === 0 ? (
          <div className={styles.emptyState}>
            <FileText size={32} />
            <p>No content generated yet.</p>
            <Link href="/dashboard/content-generator" className={styles.emptyLink}>
              Generate your first content →
            </Link>
          </div>
        ) : (
          <div className={styles.list}>
            {recentItems.map((item, index) => {
              const metadata = item.metadata || {};
              const Icon = getIconForContent(metadata);
              const tone = getToneClass(index);
              const tagTone = getTagTone(metadata.content_type);
              const tagLabel = getContentTypeLabel(metadata.content_type);
              
              return (
                <button
                  key={`${item.type}-${item.id}`}
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className={styles.row}
                >
                  <span className={`${styles.tile} ${styles[tone]} ${styles.icon}`}>
                    <Icon size={20} />
                  </span>
                  <div className={styles.info}>
                    <div className={styles.titleLine}>
                      <span className={styles.title}>{item.title}</span>
                      <span className={`${styles.badge} ${styles[tagTone]}`}>
                        {tagLabel}
                      </span>
                    </div>
                    <div className={styles.desc}>{item.preview}</div>
                  </div>
                  <span className={styles.time}>{timeAgo(item.created_at)}</span>
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