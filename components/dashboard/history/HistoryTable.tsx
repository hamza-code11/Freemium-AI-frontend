import React from 'react';
import { Layers, Bookmark, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './HistoryTable.module.css';

// 🔥 Custom SVG Icons (Kyunki lucide-react se brand icons remove ho gaye hain)
const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const data = [
  { 
    icon: <InstagramIcon size={16} />, 
    iconColor: '#E1306C', // Instagram color
    title: 'Summer Collection Instagram Post', 
    type: 'Social Post', 
    preview: 'Step into summer with our latest collection! ☀️ Light, breathable, and effortlessly stylish...', 
    date: 'Apr 28, 2025', 
    time: '10:24 AM', 
    platform: 'Instagram', 
    platformIcon: <InstagramIcon size={12} />, 
    saved: true 
  },
  { 
    icon: <div className={styles.txtIcon}>W</div>, 
    iconColor: 'transparent',
    title: "Women's Fashion Product Description", 
    type: 'Product Description', 
    preview: 'Discover elegance in every detail with our women’s summer collection. Crafted from...', 
    date: 'Apr 27, 2025', 
    time: '04:15 PM', 
    platform: '-', 
    saved: false 
  },
  { 
    icon: <FacebookIcon size={16} />, 
    iconColor: '#1877F2', // Facebook color
    title: 'Facebook Summer Sale Ad Copy', 
    type: 'Ad Copy', 
    preview: '🔥 Summer Sale is Here! Up to 40% OFF on selected styles. Shop now and refresh your...', 
    date: 'Apr 26, 2025', 
    time: '01:32 PM', 
    platform: 'Facebook', 
    platformIcon: <FacebookIcon size={12} />, 
    saved: false 
  },
  { 
    icon: <Layers size={16} />, 
    iconColor: '#8B5CF6',
    title: 'Summer Sale Marketing Campaign', 
    type: 'Campaign', 
    preview: 'Multi-channel campaign targeting fashion lovers with summer offers, influencer collabs...', 
    date: 'Apr 25, 2025', 
    time: '11:12 AM', 
    platform: 'Multiple', 
    platformIcon: <Layers size={12} />, 
    saved: false 
  },
  { 
    icon: <Layers size={16} />, 
    iconColor: '#10B981',
    title: 'Customer Acquisition Growth Strategy', 
    type: 'Growth Recommendation', 
    preview: 'Focus on social media ads, referral program, and influencer partnerships to attract new...', 
    date: 'Apr 24, 2025', 
    time: '03:45 PM', 
    platform: '-', 
    saved: true 
  },
];

export default function HistoryTable() {
  return (
    <div className={styles.tableCard}>
      
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Type & Title</th>
              <th>Preview</th>
              <th>Created</th>
              <th>Platform</th>
              <th className={styles.centerText}>Saved</th>
              <th className={styles.centerText}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className={styles.row}>
                <td>
                  <div className={styles.titleCell}>
                    {/* 🔥 Icon Box with custom color */}
                    <div className={styles.iconWrap} style={{ color: row.iconColor }}>
                      {row.icon}
                    </div>
                    <div>
                      <div className={styles.rowTitle}>{row.title}</div>
                      <span className={styles.typeBadge}>{row.type}</span>
                    </div>
                  </div>
                </td>
                <td className={styles.previewCell}>{row.preview}</td>
                <td>
                  <div className={styles.dateCell}>
                    <span>{row.date}</span>
                    <span className={styles.timeText}>{row.time}</span>
                  </div>
                </td>
                <td>
                  {row.platform !== '-' ? (
                    <span className={styles.platformBadge}>
                      {row.platformIcon} {row.platform}
                    </span>
                  ) : (
                    <span className={styles.mutedText}>-</span>
                  )}
                </td>
                <td className={styles.centerText}>
                  <button className={styles.iconBtn}>
                    <Bookmark size={16} fill={row.saved ? 'var(--color-accent-primary)' : 'none'} color={row.saved ? 'var(--color-accent-primary)' : 'var(--color-text-tertiary)'} />
                  </button>
                </td>
                <td className={styles.centerText}>
                  <button className={styles.iconBtn}>
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.paginationRow}>
        <span className={styles.pageInfo}>Showing 1–5 of 48 results</span>
        <div className={styles.pageControls}>
          <button className={styles.pageArrow} disabled><ChevronLeft size={16} /></button>
          <button className={`${styles.pageNum} ${styles.activePage}`}>1</button>
          <button className={styles.pageNum}>2</button>
          <button className={styles.pageNum}>3</button>
          <button className={styles.pageNum}>4</button>
          <button className={styles.pageNum}>5</button>
          <button className={styles.pageArrow}><ChevronRight size={16} /></button>
          <button className={styles.loadMoreBtn}>Load More</button>
        </div>
      </div>

    </div>
  );
}
