// services/admin-stats.service.ts
import axiosInstance from '@/lib/axios';

export interface AdminUserStats {
  total_users: number;
  active_users: number;
  inactive_users: number;
  suspended_users: number;
}

export const adminStatsService = {
  getUserStats: async (): Promise<AdminUserStats> => {
    const res = await axiosInstance.get<AdminUserStats>('/admin/stats/users');
    return res.data;
  },
};
