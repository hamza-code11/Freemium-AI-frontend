// frontend/hooks/useGrowthRecommendations.ts
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  growthService,
  GrowthRecommendationPayload,
  RecommendationItem,
} from '@/services/growth.service';

export const useGrowthRecommendations = () => {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // 🔥 Helper: Backend error extract
  const getErrorMessage = (err: any) => {
    const detail = err?.response?.data?.detail;
    if (typeof detail === 'string') return detail;
    if (Array.isArray(detail)) return detail[0]?.msg || 'Validation error';
    return 'Failed to generate recommendations. Please try again.';
  };

  const generateRecommendations = async (payload: GrowthRecommendationPayload): Promise<boolean> => {
    setIsGenerating(true);
    try {
      const res = await growthService.generateRecommendations(payload);
      setRecommendations(res.recommendations);
      toast.success('Recommendations generated successfully!');
      return true;
    } catch (err: any) {
      toast.error(getErrorMessage(err));
      return false;
    } finally {
      setIsGenerating(false);
    }
  };

  return { recommendations, isGenerating, generateRecommendations };
};