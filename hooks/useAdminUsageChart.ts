import { useEffect, useState } from 'react';
import {
  adminUsageService,
  UsageChartResponse,
  UsageDateRange,
  UsageFeature,
} from '@/services/admin-usage.service';

export const useAdminUsageChart = (
  dateRange: UsageDateRange,
  feature: UsageFeature | 'all',
  customFrom?: string,
  customTo?: string,
) => {
  const [chart, setChart] = useState<UsageChartResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    adminUsageService
      .chart({ dateRange, feature, customFrom, customTo })
      .then((r) => {
        if (!cancelled) setChart(r);
      })
      .catch(console.error)
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [dateRange, feature, customFrom, customTo]);

  return { chart, loading };
};

