import React from 'react';
import { PieChart } from 'lucide-react';
import styles from './BreakdownChart.module.css';

const data = [
  { label: 'Social Posts & Captions', value: 56, percent: '39%', color: '#8B5CF6' },
  { label: 'Ad Copy & Product Descriptions', value: 42, percent: '30%', color: '#3B82F6' },
  { label: 'Marketing Campaigns', value: 28, percent: '20%', color: '#10B981' },
  { label: 'Growth Recommendations', value: 16, percent: '11%', color: '#C084FC' },
];

export default function BreakdownChart() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <PieChart size={18} className={styles.icon} />
        <h3 className={styles.title}>Generation Breakdown</h3>
      </div>

      <div className={styles.content}>
        {/* CSS Conic Gradient Donut */}
        <div className={styles.donutWrapper}>
          <div className={styles.donutChart}>
            <div className={styles.donutInner}>
              <span className={styles.totalNum}>142</span>
              <span className={styles.totalLabel}>Total</span>
            </div>
          </div>
        </div>

        <div className={styles.legendList}>
          {data.map((item, i) => (
            <div key={i} className={styles.legendItem}>
              <span className={styles.dot} style={{ background: item.color }}></span>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.value}>{item.value} <span className={styles.percent}>({item.percent})</span></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
