// hooks/useDashboard.ts
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '@/lib/axios';
import { HistoryItem } from '@/services/history.service';

interface DashboardStats {
  total_generations: number;
  content_generated: number;
  campaigns_generated: number;
  recommendations_generated: number;
}
interface UsageChartData { labels: string[]; values: number[]; }
interface BreakdownItem { label: string; value: number; color: string; }

interface DashboardData {
  stats: DashboardStats;
  recent_content: HistoryItem[];
  recent_campaigns: HistoryItem[];
  recent_recommendations: HistoryItem[];
  usage_chart: UsageChartData;
  breakdown: BreakdownItem[];
}

interface RangeFilters {
  range: string;
  custom_from?: string;
  custom_to?: string;
}

export const useDashboard = (initialRange: string = 'week') => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [rangeFilters, setRangeFilters] = useState<RangeFilters>({ range: initialRange });

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('range', rangeFilters.range);
      if (rangeFilters.custom_from) params.append('custom_from', rangeFilters.custom_from);
      if (rangeFilters.custom_to) params.append('custom_to', rangeFilters.custom_to);

      const res = await axiosInstance.get<DashboardData>(`/dashboard?${params.toString()}`);
      setData(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.detail || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, [rangeFilters]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return {
    stats: data?.stats ?? null,
    recentContent: data?.recent_content ?? [],
    recentCampaigns: data?.recent_campaigns ?? [],
    recentRecommendations: data?.recent_recommendations ?? [],
    usageChart: data?.usage_chart ?? null,
    breakdown: data?.breakdown ?? [],
    loading,
    rangeFilters,
    setRangeFilters,
    refresh: fetchDashboard,
  };
};