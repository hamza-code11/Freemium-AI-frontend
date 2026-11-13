import api from '@/lib/axios';

export type UsageFeature = 'content' | 'campaign' | 'growth';

export interface UsageRecordItem {
  id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  user_image?: string | null;
  feature: UsageFeature;
  title: string;
  status: 'success' | 'failed';
  created_at: string;
}

export interface UsageRecordListResponse {
  items: UsageRecordItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface UsageStats {
  total_generations: number;
  content_generations: number;
  campaign_generations: number;
  growth_generations: number;
}

export interface UsageChartPoint {
  date: string;
  content: number;
  campaign: number;
  growth: number;
  failed: number;
}

export interface UsageChartResponse {
  points: UsageChartPoint[];
  totals: Record<string, number>;
}

export interface UsageRecordDetail {
  id: number;
  user_id: number;
  user_name: string;
  user_email: string;
  user_image?: string | null;
  feature: UsageFeature;
  title: string;
  status: 'success' | 'failed';
  created_at: string;
  input_payload: Record<string, unknown>;
  output_payload: unknown;
}

export type UsageDateRange =
  | 'all'
  | 'today'
  | 'week'
  | 'month'
  | 'year'
  | 'custom';

interface RangeParams {
  dateRange: UsageDateRange;
  customFrom?: string;
  customTo?: string;
  feature?: UsageFeature | 'all';
}

const buildRange = ({ dateRange, customFrom, customTo, feature }: RangeParams) => {
  const p = new URLSearchParams();
  p.append('date_range', dateRange);
  if (dateRange === 'custom') {
    if (customFrom) p.append('custom_from', customFrom);
    if (customTo) p.append('custom_to', customTo);
  }
  if (feature && feature !== 'all') p.append('feature', feature);
  return p;
};

export const adminUsageService = {
  async list(
    params: RangeParams & {
      page: number;
      pageSize: number;
      search?: string;
      sort: 'latest' | 'oldest';
    },
  ): Promise<UsageRecordListResponse> {
    const p = buildRange(params);
    p.append('page', String(params.page));
    p.append('page_size', String(params.pageSize));
    p.append('sort', params.sort);
    if (params.search) p.append('search', params.search);
    const { data } = await api.get(`/admin/usage?${p.toString()}`);
    return data;
  },
  async stats(params: RangeParams): Promise<UsageStats> {
    const { data } = await api.get(`/admin/usage/stats?${buildRange(params)}`);
    return data;
  },
  async chart(params: RangeParams): Promise<UsageChartResponse> {
    const { data } = await api.get(`/admin/usage/chart?${buildRange(params)}`);
    return data;
  },
  async getDetail(feature: string, id: number): Promise<UsageRecordDetail> {
    const { data } = await api.get(`/admin/usage/detail/${feature}/${id}`);
    return data;
  },
};

