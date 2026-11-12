// services/admin-dashboard.service.ts
import axiosInstance from '@/lib/axios';

export type ToolUsageItem = {
  tool: 'content' | 'campaign' | 'growth';
  label: string;
  used_today: number;
  daily_limit: number;
  remaining: number;
};

export type AdminDashboardResponse = {
  stats: {
    total_users: number;
    active_users: number;
    inactive_users: number;
    content_generations: number;
    campaign_generations: number;
    growth_generations: number;
  };
  tool_usage: ToolUsageItem[];
  recent_generations: {
    id: number;
    user_id: number;
    user_name: string;
    user_email: string;
    generation_type: 'content' | 'campaign' | 'growth';
    title: string;
    created_at: string;
  }[];
  recent_logins: {
    id: number;
    name: string;
    email: string;
    image?: string | null;
    logged_in_at: string;
  }[];
};

export const adminDashboardService = {
  async getDashboard(): Promise<AdminDashboardResponse> {
    const { data } = await axiosInstance.get<AdminDashboardResponse>('/admin/dashboard');
    return data;
  },
};