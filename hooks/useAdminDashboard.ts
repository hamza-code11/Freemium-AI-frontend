// hooks/useAdminDashboard.ts
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import {
  adminDashboardService,
  AdminDashboardResponse,
} from '@/services/admin-dashboard.service';

export const useAdminDashboard = () => {
  const [data, setData] = useState<AdminDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminDashboardService.getDashboard();
      setData(res);
    } catch (err: any) {
      const msg = err.response?.data?.detail;
      toast.error(typeof msg === 'string' ? msg : 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    stats: data?.stats ?? null,
    toolUsage: data?.tool_usage ?? [],
    recentGenerations: data?.recent_generations ?? [],
    recentLogins: data?.recent_logins ?? [],
    loading,
    refresh: fetchDashboard,
  };
};