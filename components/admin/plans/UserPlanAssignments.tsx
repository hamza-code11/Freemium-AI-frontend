'use client';

import React from 'react';
import { Search, ChevronDown, MoreHorizontal, Crown, User, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './UserPlanAssignments.module.css';

// 🔥 Total 8 Records
const users = [
  { name: 'Ahmed Khan', email: 'ahmed@example.com', plan: 'Premium', status: 'Active', start: 'Apr 15, 2025', expiry: 'Apr 15, 2026', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80' },
  { name: 'Sara Ali', email: 'sara@example.com', plan: 'Free', status: 'Active', start: 'Apr 16, 2025', expiry: '-', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' },
  { name: 'Bilal Ahmed', email: 'bilal@example.com', plan: 'Premium', status: 'Expired', start: 'Jan 10, 2025', expiry: 'Apr 10, 2025', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80' },
  { name: 'Ayesha Noor', email: 'ayesha@example.com', plan: 'Free', status: 'Active', start: 'Apr 08, 2025', expiry: '-', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80' },
  { name: 'Usman Malik', email: 'usman@example.com', plan: 'Premium', status: 'Active', start: 'Mar 22, 2025', expiry: 'Mar 22, 2026', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
  { name: 'Hira Shah', email: 'hira@example.com', plan: 'Free', status: 'Active', start: 'Feb 15, 2025', expiry: '-', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=100&q=80' },
  { name: 'Zainab Tariq', email: 'zainab@example.com', plan: 'Premium', status: 'Expired', start: 'Jan 05, 2025', expiry: 'Apr 05, 2025', avatar: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=100&q=80' },
  { name: 'Omar Farooq', email: 'omar@example.com', plan: 'Free', status: 'Active', start: 'Mar 01, 2025', expiry: '-', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=100&q=80' },
];

export default function UserPlanAssignments() {
  return (
    <div className={styles.card}>
      
      {/* Header & Filters */}
      <div className={styles.header}>
        <div className={styles.titleWrap}>
          <User size={18} className={styles.icon} />
          <h3 className={styles.title}>User Plan Assignments</h3>
        </div>
        
        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <Search size={14} />
            <input type="text" placeholder="Search users..." />
          </div>
          <div className={styles.selectWrap}>
            <select><option>All Plans</option></select>
            <ChevronDown size={12} />
          </div>
          <div className={styles.selectWrap}>
            <select><option>All Statuses</option></select>
            <ChevronDown size={12} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Current Plan</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={i}>
                <td>
                  <div className={styles.userCell}>
                    <img src={user.avatar} alt={user.name} className={styles.avatar} />
                    <span className={styles.name}>{user.name}</span>
                  </div>
                </td>
                <td className={styles.email}>{user.email}</td>
                <td>
                  <span className={`${styles.planBadge} ${user.plan === 'Premium' ? styles.premium : styles.free}`}>
                    {user.plan === 'Premium' ? <Crown size={10} /> : null} {user.plan}
                  </span>
                </td>
                <td>
                  <div className={styles.status}>
                    <span className={`${styles.dot} ${user.status === 'Active' ? styles.dotActive : styles.dotExpired}`}></span>
                    {user.status}
                  </div>
                </td>
                <td className={styles.date}>{user.start}</td>
                <td className={styles.date}>{user.expiry}</td>
                <td><button className={styles.actionBtn}><MoreHorizontal size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 Pagination */}
      <div className={styles.pagination}>
        <span className={styles.pageInfo}>Showing 1-8 of 48 results</span>
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
