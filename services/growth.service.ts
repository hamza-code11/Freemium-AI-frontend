// frontend/services/growth.service.ts
import axiosInstance from '@/lib/axios';

export interface GrowthRecommendationPayload {
  business_id?: number | null;
  business_goals?: string | null;
  challenges?: string | null;
  target_audience: string[];
  ai_instruction?: string | null;
}

export interface RecommendationItem {
  title: string;
  desc: string;
  bullets: string[];
  benefit: string;
  why: string;
  checklist: string[];
  tools: string[];
  metrics: string[];
}

export interface GrowthRecommendationResponse {
  id: number;
  recommendations: RecommendationItem[];
  created_at: string;
}

export const growthService = {
  generateRecommendations: async (
    payload: GrowthRecommendationPayload
  ): Promise<GrowthRecommendationResponse> => {
    const res = await axiosInstance.post<GrowthRecommendationResponse>(
      '/growth-recommendations/generate',
      payload
    );
    return res.data;
  },
};
