import React from 'react';
import { MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './UsersTable.module.css';

const users = [
  { name: 'Ahmed Khan', email: 'ahmed@example.com', role: 'User', plan: 'Premium', status: 'Active', joined: 'Apr 15, 2025', active: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80' },
  { name: 'Sara Ali', email: 'sara@example.com', role: 'User', plan: 'Free', status: 'Active', joined: 'Apr 16, 2025', active: '5 hours ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
  { name: 'Usman Malik', email: 'usman@example.com', role: 'Admin', plan: 'Premium', status: 'Active', joined: 'Apr 10, 2025', active: '1 day ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
  { name: 'Ayesha Noor', email: 'ayesha@example.com', role: 'User', plan: 'Free', status: 'Suspended', joined: 'Apr 08, 2025', active: '3 days ago', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' },
  { name: 'Bilal Ahmed', email: 'bilal@example.com', role: 'User', plan: 'Premium', status: 'Active', joined: 'Apr 05, 2025', active: '1 day ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
];

export default function UsersTable() {
  return (
    <div className={styles.tableCard}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>User</th>
              <th>Role</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Joined Date</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <td><input type="checkbox" /></td>
                <td>
                  <div className={styles.userCell}>
                    <img src={user.avatar} alt={user.name} className={styles.avatar} />
                    <div>
                      <div className={styles.name}>{user.name}</div>
                      <div className={styles.email}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`${styles.roleBadge} ${user.role === 'Admin' ? styles.admin : ''}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <span className={`${styles.planBadge} ${user.plan === 'Premium' ? styles.premium : styles.free}`}>
                    {user.plan}
                  </span>
                </td>
                <td>
                  <div className={styles.status}>
                    <span className={`${styles.dot} ${user.status === 'Active' ? styles.dotActive : styles.dotSuspended}`}></span>
                    {user.status}
                  </div>
                </td>
                <td className={styles.muted}>{user.joined}</td>
                <td className={styles.muted}>{user.active}</td>
                <td><button className={styles.actionBtn}><MoreHorizontal size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <span className={styles.pageInfo}>Showing 1–5 of 2,450 results</span>
        <div className={styles.pageControls}>
          <span className={styles.rowsPerPage}>Rows per page: <select><option>5</option></select></span>
          <button className={styles.pageArrow} disabled><ChevronLeft size={14} /></button>
          <button className={`${styles.pageNum} ${styles.active}`}>1</button>
          <button className={styles.pageNum}>2</button>
          <button className={styles.pageNum}>3</button>
          <span>...</span>
          <button className={styles.pageNum}>490</button>
          <button className={styles.pageArrow}><ChevronRight size={14} /></button>
        </div>
      </div>
    </div>
  );
}
