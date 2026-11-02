import React from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import styles from './RecentRegistrations.module.css';

// 🔥 Sirf 3 Records
const users = [
  { name: 'Ayesha Khan', email: 'ayesha@email.com', plan: 'Free', date: 'Apr 24, 10:24 AM', status: 'Active' },
  { name: 'Usman Tariq', email: 'usman@email.com', plan: 'Premium', date: 'Apr 24, 09:50 AM', status: 'Active' },
  { name: 'Sara Ahmed', email: 'sara@email.com', plan: 'Free', date: 'Apr 24, 08:37 AM', status: 'Pending' },
];

export default function RecentRegistrations() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <User size={18} className={styles.icon} />
          <h3 className={styles.title}>Recent Registrations</h3>
        </div>
        <Link href="/admin/users" className={styles.link}>View All Users →</Link>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Plan</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <td>
                  <div className={styles.userInfo}>
                    <span className={styles.userName}>{user.name}</span>
                    <span className={styles.userEmail}>{user.email}</span>
                  </div>
                </td>
                <td>
                  <span className={`${styles.planBadge} ${user.plan === 'Premium' ? styles.premium : styles.free}`}>
                    {user.plan}
                  </span>
                </td>
                <td className={styles.date}>{user.date}</td>
                <td>
                  <div className={styles.statusCell}>
                    <span className={`${styles.dot} ${user.status === 'Active' ? styles.dotActive : styles.dotPending}`}></span>
                    {user.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
