// components/admin/users/UsersFilter.tsx
'use client';

import React from 'react';
import { Search, RotateCcw, ChevronDown, Calendar } from 'lucide-react';
import styles from './UsersFilter.module.css';

export interface UserFilters {
  search: string;
  status: string;
  sort: string;
  date_range: string;
  custom_from: string;
  custom_to: string;
}

interface Props {
  filters: UserFilters;
  onChange: (patch: Partial<UserFilters>) => void;
}

// 🔥 Inactive removed
const STATUS_OPTIONS = [
  { value: 'all', label: 'All Statuses' },
  { value: 'active', label: 'Active' },
  { value: 'suspended', label: 'Suspended' },
];

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest First' },
  { value: 'oldest', label: 'Oldest First' },
];

const DATE_RANGES = [
  { value: 'all', label: 'All Time' },
  { value: 'today', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'month', label: 'This Month' },
  { value: 'year', label: 'This Year' },
  { value: 'custom', label: 'Custom Range' },
];

export default function UsersFilter({ filters, onChange }: Props) {
  const showCustomRange = filters.date_range === 'custom';

  const handleClear = () => {
    onChange({
      search: '',
      status: 'all',
      sort: 'latest',
      date_range: 'all',
      custom_from: '',
      custom_to: '',
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterBar}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.icon} />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
          />
        </div>

        <div className={styles.selects}>
          <div className={styles.selectWrap}>
            <select
              value={filters.status}
              onChange={(e) => onChange({ status: e.target.value })}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className={styles.chevron} />
          </div>

          <div className={styles.selectWrap}>
            <select
              value={filters.sort}
              onChange={(e) => onChange({ sort: e.target.value })}
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className={styles.chevron} />
          </div>

          <div className={styles.selectWrap}>
            <Calendar size={14} className={styles.calIcon} />
            <select
              value={filters.date_range}
              onChange={(e) => onChange({ date_range: e.target.value })}
            >
              {DATE_RANGES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            <ChevronDown size={14} className={styles.chevron} />
          </div>
        </div>

        <button className={styles.clearBtn} onClick={handleClear}>
          <RotateCcw size={14} /> Clear Filters
        </button>
      </div>

      {showCustomRange && (
        <div className={styles.customRange}>
          <div className={styles.dateField}>
            <label>From</label>
            <input
              type="date"
              value={filters.custom_from}
              onChange={(e) => onChange({ custom_from: e.target.value })}
            />
          </div>
          <div className={styles.dateField}>
            <label>To</label>
            <input
              type="date"
              value={filters.custom_to}
              onChange={(e) => onChange({ custom_to: e.target.value })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
