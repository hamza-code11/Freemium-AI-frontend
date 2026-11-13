import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  adminDashboardService,
  AdminDashboardResponse,
  DashboardDateRange,
} from '@/services/admin-dashboard.service';

interface Args {
  dateRange: DashboardDateRange;
  customFrom?: string;
  customTo?: string;
}

export const useAdminDashboard = ({ dateRange, customFrom, customTo }: Args) => {
  const [data, setData] = useState<AdminDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminDashboardService.getDashboard({
        dateRange,
        customFrom,
        customTo,
      });
      setData(res);
    } catch (err: any) {
      const msg = err?.response?.data?.detail;
      toast.error(typeof msg === 'string' ? msg : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, [dateRange, customFrom, customTo]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    stats: data?.stats ?? null,
    toolUsage: data?.tool_usage ?? [],
    recentGenerations: data?.recent_generations ?? [],
    recentLogins: data?.recent_logins ?? [],
    userGrowthChart: data?.user_growth_chart ?? null,
    aiGenerationChart: data?.ai_generation_chart ?? null,
    loading,
    refresh: fetchDashboard,
  };
};