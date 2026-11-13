import axiosInstance from '@/lib/axios';

export type DashboardStats = {
  total_users: number;
  active_users: number;
  inactive_users: number;
  content_generations: number;
  campaign_generations: number;
  growth_generations: number;
};

export type ToolUsageItem = {
  tool: 'content' | 'campaign' | 'growth';
  label: string;
  used_today: number;
  daily_limit: number;
  remaining: number;
};

export type RecentGenerationItem = {
  id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  generation_type: 'content' | 'campaign' | 'growth';
  title: string;
  created_at: string;
};

export type RecentLoginItem = {
  id: number;
  name: string;
  email: string;
  image?: string | null;
  logged_in_at: string;
};

export type ChartPoint = { label: string; value: number };

export type UserGrowthChart = {
  points: ChartPoint[];
  totals: number;
};

export type AIGenerationSeries = {
  name: 'content' | 'campaign' | 'growth';
  points: ChartPoint[];
};

export type AIGenerationChart = {
  labels: string[];
  series: AIGenerationSeries[];
  totals: { content: number; campaign: number; growth: number };
  combined_total: number;
};

export type AdminDashboardResponse = {
  stats: DashboardStats;
  tool_usage: ToolUsageItem[];
  recent_generations: RecentGenerationItem[];
  recent_logins: RecentLoginItem[];
  user_growth_chart: UserGrowthChart;
  ai_generation_chart: AIGenerationChart;
};

export type DashboardDateRange = 'all' | 'today' | 'week' | 'month' | 'year' | 'custom';

export const adminDashboardService = {
  async getDashboard(params: {
    dateRange: DashboardDateRange;
    customFrom?: string;
    customTo?: string;
  }): Promise<AdminDashboardResponse> {
    const p = new URLSearchParams();
    p.append('date_range', params.dateRange);
    if (params.dateRange === 'custom') {
      if (params.customFrom) p.append('custom_from', params.customFrom);
      if (params.customTo) p.append('custom_to', params.customTo);
    }
    const { data } = await axiosInstance.get<AdminDashboardResponse>(
      `/admin/dashboard?${p.toString()}`,
    );
    return data;
  },
};