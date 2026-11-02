import React from 'react';
import { Lightbulb, Star, Calendar, Clock, PieChart } from 'lucide-react';
import styles from './Insights.module.css';

const insights = [
  { icon: <Star size={16} />, title: 'Most frequently used AI tool', desc: 'Social Posts & Captions', sub: 'Used 56 times (39% of total generations)' },
  { icon: <Calendar size={16} />, title: 'Day with highest generation count', desc: 'April 24, 2025', sub: '18 generations' },
  { icon: <Clock size={16} />, title: 'Most recent generation', desc: 'Customer Acquisition Recommendations', sub: 'Apr 28, 2025 at 09:41 PM' },
];

export default function Insights() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Lightbulb size={18} className={styles.icon} />
        <h3 className={styles.title}>Your Activity Insights</h3>
      </div>

      <div className={styles.insightList}>
        {insights.map((item, i) => (
          <div key={i} className={styles.insightItem}>
            <div className={styles.insightIcon}>{item.icon}</div>
            <div className={styles.insightText}>
              <span className={styles.iTitle}>{item.title}</span>
              <strong className={styles.iDesc}>{item.desc}</strong>
              <span className={styles.iSub}>{item.sub}</span>
            </div>
          </div>
        ))}

        {/* Usage Distribution Bars */}
        <div className={styles.distributionBox}>
          <div className={styles.distHeader}>
            <PieChart size={14} />
            <span>Usage distribution across tools</span>
          </div>
          
          <div className={styles.distBarRow}>
            <span className={styles.distLabel}>Social Posts & Captions</span>
            <div className={styles.distBar}><div style={{ width: '39%' }}></div></div>
            <span className={styles.distPercent}>39%</span>
          </div>
          
          <div className={styles.distBarRow}>
            <span className={styles.distLabel}>Ad Copy & Descriptions</span>
            <div className={styles.distBar}><div style={{ width: '30%' }}></div></div>
            <span className={styles.distPercent}>30%</span>
          </div>
          
          <div className={styles.distBarRow}>
            <span className={styles.distLabel}>Marketing Campaigns</span>
            <div className={styles.distBar}><div style={{ width: '20%' }}></div></div>
            <span className={styles.distPercent}>20%</span>
          </div>
          
          <div className={styles.distBarRow}>
            <span className={styles.distLabel}>Growth Recommendations</span>
            <div className={styles.distBar}><div style={{ width: '11%' }}></div></div>
            <span className={styles.distPercent}>11%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
