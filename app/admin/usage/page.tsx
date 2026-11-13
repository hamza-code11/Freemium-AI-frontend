'use client';

import React, { useCallback, useState } from 'react';
import UsageHeader from '@/components/admin/usage/UsageHeader';
import UsageStats from '@/components/admin/usage/UsageStats';
import UsageCharts from '@/components/admin/usage/UsageCharts';
import UsageTable from '@/components/admin/usage/UsageTable';
import UserUsagePanel from '@/components/admin/usage/UserUsagePanel';
import { useAdminUsageStats } from '@/hooks/useAdminUsageStats';
import { useAdminUsageChart } from '@/hooks/useAdminUsageChart';
import { UsageDateRange, UsageFeature } from '@/services/admin-usage.service';
import styles from './Usage.module.css';

export default function AdminUsagePage() {
  const [dateRange, setDateRange] = useState<UsageDateRange>('all');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');
  const [feature, setFeature] = useState<UsageFeature | 'all'>('all');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { stats, loading: statsLoading } = useAdminUsageStats(dateRange, feature, customFrom, customTo);
  const { chart, loading: chartLoading } = useAdminUsageChart(dateRange, feature, customFrom, customTo);

  const handleDateRangeChange = (r: UsageDateRange) => {
    setDateRange(r);
    if (r !== 'custom') {
      setCustomFrom('');
      setCustomTo('');
    }
  };

  const handleRecordsLoaded = useCallback((records: { id: number; feature: UsageFeature }[]) => {
    setSelectedUserId((current) => {
      if (current && records.some((r) => r.id === current)) return current;
      return records.length > 0 ? records[0].id : null;
    });
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <UsageHeader
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        customFrom={customFrom}
        customTo={customTo}
        onCustomFromChange={setCustomFrom}
        onCustomToChange={setCustomTo}
      />
      <UsageStats stats={stats} loading={statsLoading} />
      <UsageCharts chart={chart} loading={chartLoading} />

      <div className={styles.mainLayout}>
        <div className={styles.tableArea}>
          <UsageTable
            dateRange={dateRange}
            feature={feature}
            customFrom={customFrom}
            customTo={customTo}
            onSelectUser={setSelectedUserId}
            onRecordsLoaded={handleRecordsLoaded}
          />
        </div>
        <div className={styles.panelArea}>
          <UserUsagePanel userId={selectedUserId} />
        </div>
      </div>
    </div>
  );
}
