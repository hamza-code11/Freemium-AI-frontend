// frontend/services/history.service.ts
import axiosInstance from '@/lib/axios';

export interface HistoryItem {
  id: number;
  type: 'content' | 'campaign' | 'recommendation';
  title: string;
  preview: string;
  content?: string;
  created_at: string;
  metadata: Record<string, any>;
}

export interface HistoryResponse {
  items: HistoryItem[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface HistoryStats {
  total_generations: number;
  content_generated: number;
  campaigns_generated: number;
  recommendations_generated: number;
}

export interface HistoryFilters {
  type_filter?: string;
  date_range?: string;
  custom_from?: string;
  custom_to?: string;
  sort?: string;
  search?: string;
  page?: number;
  page_size?: number;
}

export const historyService = {
  getStats: async (): Promise<HistoryStats> => {
    const res = await axiosInstance.get<HistoryStats>('/history/stats');
    return res.data;
  },

  getHistory: async (filters: HistoryFilters = {}): Promise<HistoryResponse> => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });
    const res = await axiosInstance.get<HistoryResponse>(`/history?${params.toString()}`);
    return res.data;
  },
};
