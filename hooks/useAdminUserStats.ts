// hooks/useAdminUserStats.ts
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { adminStatsService, AdminUserStats } from '@/services/admin-stats.service';

export const useAdminUserStats = (refreshKey: number = 0) => {
  const [stats, setStats] = useState<AdminUserStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminStatsService.getUserStats();
      setStats(data);
    } catch (err: any) {
      const msg = err.response?.data?.detail;
      toast.error(typeof msg === 'string' ? msg : 'Failed to load user stats');
    } finally {
      setLoading(false);
    }
  }, []);

  //  Re-fetch when refreshKey changes
  useEffect(() => {
    fetchStats();
  }, [fetchStats, refreshKey]);

  return {
    stats,
    loading,
    refresh: fetchStats,
  };
};