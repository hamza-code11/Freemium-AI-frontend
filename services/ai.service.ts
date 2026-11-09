// frontend/services/ai.service.ts
import axiosInstance from '@/lib/axios';

export interface GenerateAIPayload {
  platform: string;
  content_type: string;
  topic: string;
  target_audience: string[];
  tone: string;
  language: string;
  notes?: string | null;
}

export interface GenerateAIResponse {
  content: string;
}

export const aiService = {
  generateContent: async (payload: GenerateAIPayload): Promise<GenerateAIResponse> => {
    const res = await axiosInstance.post<GenerateAIResponse>('/ai/generate', payload);
    return res.data;
  },
};
