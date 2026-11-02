import React from 'react';
import { Search, RotateCcw, ChevronDown, Calendar } from 'lucide-react';
import styles from './UsersFilter.module.css';

export default function UsersFilter() {
  return (
    <div className={styles.filterBar}>
      <div className={styles.searchBox}>
        <Search size={16} className={styles.icon} />
        <input type="text" placeholder="Search by name or email..." />
      </div>

      <div className={styles.selects}>
        <div className={styles.selectWrap}>
          <select><option>All Plans</option></select>
          <ChevronDown size={14} className={styles.chevron} />
        </div>
        <div className={styles.selectWrap}>
          <select><option>All Roles</option></select>
          <ChevronDown size={14} className={styles.chevron} />
        </div>
        <div className={styles.selectWrap}>
          <select><option>All Statuses</option></select>
          <ChevronDown size={14} className={styles.chevron} />
        </div>
        <div className={styles.selectWrap}>
          <Calendar size={14} className={styles.calIcon} />
          <select><option>Select Date Range</option></select>
          <ChevronDown size={14} className={styles.chevron} />
        </div>
      </div>

      <button className={styles.clearBtn}>
        <RotateCcw size={14} /> Clear Filters
      </button>
    </div>
  );
}
