// frontend/hooks/useAIGenerator.ts
import { useState } from 'react';
import toast from 'react-hot-toast';
import { aiService, GenerateAIPayload } from '@/services/ai.service';

export const useAIGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  // 🔥 Helper: Backend error message extract karein
  const getErrorMessage = (err: any) => {
    const detail = err?.response?.data?.detail;
    if (typeof detail === 'string') return detail;
    if (Array.isArray(detail)) return detail[0]?.msg || 'Validation error';
    return 'Failed to generate content. Please try again.';
  };

  const generateContent = async (payload: GenerateAIPayload): Promise<string | null> => {
    setIsGenerating(true);
    try {
      const res = await aiService.generateContent(payload);
      return res.content;
    } catch (err: any) {
      toast.error(getErrorMessage(err));
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return { isGenerating, generateContent };
};
