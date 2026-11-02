import React from 'react';
import { Activity, ArrowRight, Camera , Megaphone, FileText, Lightbulb, BookOpen } from 'lucide-react';
import styles from './RecentActivity.module.css';

const activities = [
  { icon: <Camera  size={16} />, title: 'Instagram Summer Post', type: 'Social Posts & Captions', date: 'Apr 30, 2025', time: '10:24 AM', status: 'Completed' },
  { icon: <Megaphone size={16} />, title: 'Summer Sale Campaign', type: 'Marketing Campaigns', date: 'Apr 29, 2025', time: '04:12 PM', status: 'Completed' },
  { icon: <FileText size={16} />, title: 'Product Description', type: 'Ad Copy & Descriptions', date: 'Apr 29, 2025', time: '11:03 AM', status: 'Completed' },
  { icon: <Lightbulb size={16} />, title: 'Customer Acquisition Recommendations', type: 'Growth Recommendations', date: 'Apr 28, 2025', time: '09:41 PM', status: 'Completed' },
  { icon: <BookOpen size={16} />, title: 'Blog Post Ideas', type: 'Content Generation', date: 'Apr 27, 2025', time: '02:18 PM', status: 'Completed' },
];

export default function RecentActivity() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <Activity size={18} className={styles.icon} />
          <h3 className={styles.title}>Recent Activity</h3>
        </div>
        <button className={styles.viewAll}>View All <ArrowRight size={12} /></button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {activities.map((act, i) => (
              <tr key={i}>
                <td>
                  <div className={styles.titleCell}>
                    <span className={styles.rowIcon}>{act.icon}</span>
                    {act.title}
                  </div>
                </td>
                <td className={styles.mutedCell}>{act.type}</td>
                <td className={styles.mutedCell}>
                  {act.date}<br/><span className={styles.time}>{act.time}</span>
                </td>
                <td>
                  <span className={styles.statusBadge}>{act.status}</span>
                </td>
                <td>
                  <button className={styles.actionBtn}>View <ArrowRight size={10} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
