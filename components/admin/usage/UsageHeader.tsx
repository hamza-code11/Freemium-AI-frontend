'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { UsageDateRange, UsageFeature } from '@/services/admin-usage.service';
import styles from './UsageHeader.module.css';

interface Props {
  dateRange: UsageDateRange;
  onDateRangeChange: (r: UsageDateRange) => void;
  customFrom: string;
  customTo: string;
  onCustomFromChange: (v: string) => void;
  onCustomToChange: (v: string) => void;
}

const DATE_OPTIONS: { value: UsageDateRange; label: string }[] = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
];

export default function UsageHeader({
  dateRange,
  onDateRangeChange,
  customFrom,
  customTo,
  onCustomFromChange,
  onCustomToChange,
}: Props) {
  return (
    <div className={styles.header}>
      <div>
        <div className={styles.breadcrumb}>Admin / Usage</div>
        <h1 className={styles.title}>Usage Management</h1>
        <p className={styles.subtitle}>
          Monitor AI consumption, generation activity, and quota usage across your platform.
        </p>
      </div>

      <div className={styles.filters}>
        {dateRange === 'custom' && (
          <div className={styles.customRange}>
            <input
              type="date"
              value={customFrom}
              onChange={(e) => onCustomFromChange(e.target.value)}
              className={styles.dateInput}
            />
            <span className={styles.rangeSep}>→</span>
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
            onChange={(e) => onDateRangeChange(e.target.value as UsageDateRange)}
            className={styles.select}
            aria-label="Date range"
          >
            {DATE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className={styles.selectIcon} />
        </div>
      </div>
    </div>
  );
}

