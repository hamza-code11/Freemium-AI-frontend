'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { DashboardDateRange } from '@/services/admin-dashboard.service';
import styles from './AdminDashboardFilters.module.css';

interface Props {
  dateRange: DashboardDateRange;
  onDateRangeChange: (r: DashboardDateRange) => void;
  customFrom: string;
  customTo: string;
  onCustomFromChange: (v: string) => void;
  onCustomToChange: (v: string) => void;
  onRefresh: () => void;
  refreshing?: boolean;
}

const OPTIONS: { value: DashboardDateRange; label: string }[] = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
];

export default function AdminDashboardFilters({
  dateRange,
  onDateRangeChange,
  customFrom,
  customTo,
  onCustomFromChange,
  onCustomToChange,
}: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.left}>
        <h2 className={styles.heading}>Overview</h2>
        <span className={styles.sub}>Filter all metrics by time period</span>
      </div>

      <div className={styles.right}>
        {dateRange === 'custom' && (
          <div className={styles.customRange}>
            <input
              type="date"
              value={customFrom}
              onChange={(e) => onCustomFromChange(e.target.value)}
              className={styles.dateInput}
            />
            <span className={styles.sep}>→</span>
            <input
              type="date"
              value={customTo}
              onChange={(e) => onCustomToChange(e.target.value)}
              className={styles.dateInput}
            />
          </div>
        )}

        <div className={styles.selectWrap}>
          <select
            value={dateRange}
            onChange={(e) => onDateRangeChange(e.target.value as DashboardDateRange)}
            className={styles.select}
            aria-label="Date range"
          >
            {OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className={styles.icon} />
        </div>
      </div>
    </div>
  );
}
