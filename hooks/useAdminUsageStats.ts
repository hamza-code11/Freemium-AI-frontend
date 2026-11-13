import { useEffect, useState } from 'react';
import {
  adminUsageService,
  UsageStats,
  UsageDateRange,
  UsageFeature,
} from '@/services/admin-usage.service';

export const useAdminUsageStats = (
  dateRange: UsageDateRange,
  feature: UsageFeature | 'all',
  customFrom?: string,
  customTo?: string,
) => {
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    adminUsageService
      .stats({ dateRange, feature, customFrom, customTo })
      .then((r) => {
        if (!cancelled) setStats(r);
      })
      .catch(console.error)
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [dateRange, feature, customFrom, customTo]);

  return { stats, loading };
};