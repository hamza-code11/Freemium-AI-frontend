import React from 'react';
import { BarChart2 } from 'lucide-react';
import styles from './AIToolUsage.module.css';

const tools = [
  { name: 'AI Content Generator', count: '7,240', percent: '39%', color: '#3b82f6' },
  { name: 'Campaign Planner', count: '6,320', percent: '34%', color: '#8b5cf6' },
  { name: 'Growth Recommendations', count: '4,080', percent: '27%', color: '#10b981' },
];

export default function AIToolUsage() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <BarChart2 size={18} className={styles.icon} />
        <h3 className={styles.title}>AI Tool Usage</h3>
      </div>

      <div className={styles.list}>
        {tools.map((tool, i) => (
          <div key={i} className={styles.item}>
            <div className={styles.topRow}>
              <span className={styles.label}>{tool.name}</span>
              <span className={styles.count}>{tool.count}</span>
              <span className={styles.percent}>{tool.percent}</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.fill} style={{ width: tool.percent, backgroundColor: tool.color }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
