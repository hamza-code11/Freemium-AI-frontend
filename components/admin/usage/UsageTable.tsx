import React from 'react';
import { Search, ChevronDown, RotateCcw, Crown, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './UsageTable.module.css';

const records = [
  { name: 'Ahmed Khan', email: 'ahmed@example.com', plan: 'Premium', total: 245, success: 230, failed: 15, status: 'Active', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80' },
  { name: 'Sara Ali', email: 'sara@example.com', plan: 'Free', total: 38, success: 36, failed: 2, status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
  { name: 'Bilal Ahmed', email: 'bilal@example.com', plan: 'Premium', total: 180, success: 172, failed: 8, status: 'Expired', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
  { name: 'Ayesha Noor', email: 'ayesha@example.com', plan: 'Free', total: 120, success: 115, failed: 5, status: 'Active', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' },
  { name: 'Usman Malik', email: 'usman@example.com', plan: 'Premium', total: 310, success: 300, failed: 10, status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
];

export default function UsageTable() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>User Usage Records</h3>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <Search size={14} />
          <input type="text" placeholder="Search by user or email..." />
        </div>
        <div className={styles.selectWrap}>
          <select><option>All Plans</option></select>
          <ChevronDown size={12} />
        </div>
        <div className={styles.selectWrap}>
          <select><option>All Status</option></select>
          <ChevronDown size={12} />
        </div>
        <div className={styles.selectWrap}>
          <select><option>Last 30 Days</option></select>
          <ChevronDown size={12} />
        </div>
        <button className={styles.clearBtn}><RotateCcw size={14} /> Clear Filters</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Plan</th>
              <th>Total</th>
              <th>Successful</th>
              <th>Failed</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((user, i) => (
              <tr key={i}>
                <td>
                  <div className={styles.userCell}>
                    <img src={user.avatar} alt={user.name} className={styles.avatar} />
                    <div>
                      <span className={styles.name}>{user.name}</span>
                      <span className={styles.email}>{user.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`${styles.planBadge} ${user.plan === 'Premium' ? styles.premium : styles.free}`}>
                    {user.plan === 'Premium' ? <Crown size={10} /> : null} {user.plan}
                  </span>
                </td>
                <td className={styles.bold}>{user.total}</td>
                <td className={styles.muted}>{user.success}</td>
                <td className={styles.muted}>{user.failed}</td>
                <td>
                  <div className={styles.status}>
                    <span className={`${styles.dot} ${user.status === 'Active' ? styles.dotActive : styles.dotExpired}`}></span>
                    {user.status}
                  </div>
                </td>
                <td>
                  <button className={styles.viewBtn}><Eye size={14} /> View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <span className={styles.pageInfo}>Showing 1–5 of 50 results</span>
        <div className={styles.pageControls}>
          <button className={styles.pageArrow} disabled><ChevronLeft size={14} /></button>
          <button className={`${styles.pageNum} ${styles.active}`}>1</button>
          <button className={styles.pageNum}>2</button>
          <button className={styles.pageNum}>3</button>
          <button className={styles.pageArrow}><ChevronRight size={14} /></button>
        </div>
      </div>
    </div>
  );
}
